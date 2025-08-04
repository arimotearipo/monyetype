"use client"
import React, { useState, useEffect } from "react"
import { getRandomWords } from "@/lib/getRandomWords"
import ResultPage from "./Result"
import { DifficultyBar } from "./DifficultyBar"
import { TDifficulty } from "@/types"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import TypingSettingModal from "./TypingSettingModal"

const TIMER: number = 10
const MAX_WORDS: number = 10

interface WPMEntry {
  time: number
  wpm: number
}

const TypingTest: React.FC = () => {
  const [words, setWords] = useState<string[]>([])
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(0)
  const [currentLetterIndex, setCurrentLetterIndex] = useState<number>(0)
  const [correctWords, setCorrectWords] = useState<number>(0)
  const [totalTypedChars, setTotalTypedChars] = useState<number>(0)
  const [errors, setErrors] = useState<number>(0)
  const [timer, setTimer] = useState<number>(TIMER)
  const [started, setStarted] = useState<boolean>(false)
  const [testEnded, setTestEnded] = useState<boolean>(false)
  const [wpmHistory, setWpmHistory] = useState<WPMEntry[]>([])
  const [lastUpdate, setLastUpdate] = useState<number>(0)
  const [difficulty, setDifficulty] = useState<TDifficulty>("medium")
  const [maxWords, setMaxWords] = useState<number>(MAX_WORDS)

  useEffect(() => {
    setWords(getRandomWords(maxWords, difficulty).split(" "))
  }, [difficulty, maxWords])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (testEnded) return
      if (!started) {
        setStarted(true) // Start the timer on the first key press
      }

      const currentWord = words[currentWordIndex]
      const currentLetter = currentWord?.[currentLetterIndex]

      if (event.key === currentLetter) {
        setCurrentLetterIndex(currentLetterIndex + 1)
        setTotalTypedChars(totalTypedChars + 1)
      } else if (event.key === " ") {
        if (currentLetterIndex === currentWord.length) {
          setCurrentWordIndex(currentWordIndex + 1)
          setCurrentLetterIndex(0)
          setCorrectWords(correctWords + 1)
        }
        setTotalTypedChars(totalTypedChars + 1)
      } else {
        setErrors(errors + 1)
        setTotalTypedChars(totalTypedChars + 1)
      }

      if (started) {
        const elapsedTime = TIMER - timer

        // Update only if 1 second has passed
        if (elapsedTime >= lastUpdate + 1) {
          const wpm = ((correctWords / elapsedTime) * 60).toFixed(2)
          setWpmHistory((prevHistory) => [
            ...prevHistory.filter((entry) => entry.time !== elapsedTime),
            { time: elapsedTime, wpm: parseFloat(wpm) },
          ])
          setLastUpdate(elapsedTime) // Update lastUpdate time
        }
      }
    }

    // Attach keydown listener
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      // Cleanup listener on unmount and when test ends
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [
    words,
    currentWordIndex,
    currentLetterIndex,
    correctWords,
    started,
    totalTypedChars,
    errors,
    testEnded,
    timer,
    lastUpdate,
  ])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (started && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1)
      }, 1000)
    }

    // Check the end of the test
    if (words.length > 0) {
      if (timer === 0) {
        setTimer(0)
        setTestEnded(true)
        clearInterval(interval!)
      }
      if (currentWordIndex >= words.length) {
        setTimer(lastUpdate)
        setTestEnded(true)
        clearInterval(interval!)
      }
    }

    return () => clearInterval(interval!)
  }, [started, timer, currentWordIndex, words.length, words, lastUpdate])

  const handleReset = () => {
    setWords(getRandomWords(MAX_WORDS, difficulty).split(" "))
    setCurrentWordIndex(0)
    setCurrentLetterIndex(0)
    setCorrectWords(0)
    setTotalTypedChars(0)
    setErrors(0)
    setTimer(timer)
    setStarted(false)
    setTestEnded(false)
    setWpmHistory([]) // Reset WPM history
  }

  const handleDifficultyChange = (tabValue: string) => {
    setDifficulty(tabValue as TDifficulty)
    handleReset()
  }

  // const handleTimerChange = (value: number) => {
  //   setTimer(value);
  //   handleReset();
  // };

  const handleMaxWordsChange = (value: number) => {
    setMaxWords(value)
    handleReset()
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-12">
      {testEnded ? (
        <ResultPage
          correctWords={correctWords}
          totalTypedChars={totalTypedChars}
          errors={errors}
          timer={timer}
          defaultTimer={TIMER}
          wpmHistory={wpmHistory}
        />
      ) : (
        <>
          <DifficultyBar
            difficulty={difficulty}
            onDifficultyChange={handleDifficultyChange}
          />
          <div>
            {words.length > 0 && (
              <div className="mb-10 text-black text-4xl w-3/4 lg:w-11/12 mx-auto ">
                {words.map((word, wordIndex) => (
                  <motion.span
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.1,
                      delay: wordIndex / 10,
                    }}
                    key={`${wordIndex || difficulty}-${difficulty}`}
                    className="mr-2"
                  >
                    {word.split("").map((letter, letterIndex) => (
                      <span
                        key={letterIndex}
                        className={`${
                          wordIndex === currentWordIndex &&
                          letterIndex === currentLetterIndex
                            ? "bg-gray-300" // Highlight current letter
                            : wordIndex === currentWordIndex &&
                                letterIndex < currentLetterIndex
                              ? "text-orange-600" // Correctly typed letters in the current word
                              : wordIndex < currentWordIndex
                                ? "text-orange-600" // Correctly typed words
                                : ""
                        }`}
                      >
                        {letter}
                      </span>
                    ))}
                    {wordIndex < words.length - 1 ? " " : ""}
                  </motion.span>
                ))}
              </div>
            )}
          </div>
          <>
            {words.length > 0 && (
              <>
                <div className="relative mt-10 w-1/2">
                  <motion.div
                    key={difficulty}
                    initial={{ x: -40, y: 40, opacity: 0, scale: 0.5 }}
                    animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      ease: [0, 0.71, 0.2, 1.01],
                      scale: {
                        type: "spring",
                        damping: 5,
                        stiffness: 100,
                        restDelta: 0.001,
                      },
                    }}
                    className={`w-40 h-40 rounded-full absolute -bottom-16 -left-16 border-8 border-white ${
                      started
                        ? "border-r-orange-600 animate-spin"
                        : "bg-orange-600"
                    }`}
                  ></motion.div>
                  <motion.div
                    initial={{ x: 20, y: -20, opacity: 0 }}
                    animate={{ x: 0, y: 0, opacity: 1 }}
                    transition={{
                      ease: "anticipate",
                      duration: 2,
                    }}
                    className="bg-white/40 backdrop-blur-xs p-6 rounded-sm shadow-lg w-full mx-auto border border-white/40"
                  >
                    <div className="flex justify-between items-center text-black">
                      <div>
                        <p>Time Left: {timer}s</p>
                        <p>Correct Words: {correctWords}</p>
                      </div>
                      <span className="flex gap-2">
                        <TypingSettingModal
                          // onTimerChange={handleTimerChange}
                          onMaxWordsChange={handleMaxWordsChange}
                        />
                        <Button onClick={handleReset} variant="akmalmohtar">
                          Reset
                        </Button>
                      </span>
                    </div>
                  </motion.div>
                </div>
              </>
            )}
          </>
        </>
      )}
    </div>
  )
}

export default TypingTest
