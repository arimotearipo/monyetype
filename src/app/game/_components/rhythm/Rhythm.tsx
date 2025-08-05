"use client"

import React, { memo, useEffect } from "react"
import { Button } from "../../../../components/ui/button"
import { useRhythmTimer } from "@/hooks/use-rhythm-timer"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import SettingModal from "./SettingModal"
import { useRhythmSettingsStore } from "@/hooks/zustand/use-rhythm-settings"
import { useRandomLetter } from "@/hooks/use-random-letter"
// import useSWRMutation from "swr/mutation";
import { mutater } from "@/lib/swr"
import { useGameStatus } from "@/hooks/use-game-status"

const ScoreBox = memo(function ScoreBox({ score }: { score: number }) {
  return (
    <div className="flex flex-row justify-between w-[135px]">
      <span className="text-2xl">Score: </span>
      <motion.span
        key={score}
        initial={{ x: 5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          ease: "easeInOut",
          duration: 1,
        }}
        className="text-2xl"
      >
        {score}
      </motion.span>
    </div>
  )
})

const ResultBox = memo(function ResultBox({
  win,
  durationPlayed,
  score,
}: {
  win: boolean
  durationPlayed: number
  score: number
}) {
  const resultMessage = win ? "YOU WIN" : "YOU LOSE"
  const speed = (score / (durationPlayed / 1000)).toFixed(2)

  return (
    <div className="flex flex-col items-center space-y-4">
      <span className="text-5xl">{resultMessage}</span>
      <span>{`Your speed: ${speed} character(s) per second`}</span>
    </div>
  )
})

const LetterDisplayBox = memo(function LetterDisplayBox({
  letters,
  enableNextLetter = false,
}: {
  letters?: [string, string]
  enableNextLetter?: boolean
}) {
  if (!letters) return null

  return (
    <div className="grid grid-cols-3 space-x-6">
      <span>{/*just empty span */}</span>
      <motion.span
        key={`${letters[0]}-0`}
        initial={{ x: 20, opacity: 0 }}
        animate={{
          x: -10,
          opacity: 1,
        }}
        transition={{
          ease: "anticipate",
          duration: 0.3,
        }}
        className="text-7xl"
      >
        {letters[0]}
      </motion.span>
      {enableNextLetter && (
        <motion.span
          key={`${letters[1]}-1`}
          initial={{ x: 0, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 0.5,
          }}
          transition={{
            ease: "anticipate",
            duration: 0.3,
          }}
          className={`text-4xl text-gray-500`}
        >
          {letters[1]}
        </motion.span>
      )}
    </div>
  )
})

const TimerBox = memo(function TimerBox({
  label,
  remainingTime,
  duration,
}: {
  label?: string
  remainingTime: number
  duration: number
}) {
  const formattedTime = `${(remainingTime / 1000).toFixed(2)} s`
  const danger = remainingTime < 0.4 * duration

  return (
    <span>
      {!!label && <span>{label}: </span>}
      <span
        className={cn("text-base", danger && "text-red-500 animate-pulse-fast")}
      >
        {formattedTime}
      </span>
    </span>
  )
})

export function Rhythm() {
  const rhythmSettings = useRhythmSettingsStore((state) => state.rhythmSettings)
  const gameDuration = useRhythmSettingsStore(
    (state) => state.rhythmSettings.gameDuration,
  )
  const letterDuration = useRhythmSettingsStore(
    (state) => state.rhythmSettings.letterDuration,
  )

  // For duration per letter
  const { round, remainingTime, gameOver, start, skip, stop, resetGame } =
    useRhythmTimer(letterDuration)

  // For duration of entire game
  const {
    remainingTime: gRemainingTime,
    start: gStart,
    stop: gStop,
    gameOver: gGameOver,
    resetGame: gResetGame,
  } = useRhythmTimer(gameDuration)

  const [
    { gameEnded, gameStarted, gameWon, score },
    { addScore, endGame, retry, startStop, winGame },
  ] = useGameStatus()

  const { letters, get } = useRandomLetter(rhythmSettings)

  // const { trigger } = useSWRMutation("/api/score", mutater);

  const handleStartStopGame = () => {
    startStop()
    if (gameStarted) {
      stop()
      gStop()
    } else {
      start()
      gStart()
    }
  }

  const handleRetry = () => {
    resetGame()
    gResetGame()
    retry()
  }

  useEffect(() => {
    if (gGameOver || gameOver) {
      endGame()
    }
  }, [gGameOver, gameOver, endGame])

  // To trigger render next letter
  useEffect(() => {
    get()
  }, [round])

  // handle gameover
  useEffect(() => {
    if (gameEnded) {
      stop()
      gStop()

      const durationPlayed = gameDuration - gRemainingTime
      // trigger({ score, durationPlayed });
    }
  }, [gameEnded])

  // to trigger button press and score
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!gameStarted && letters[0] === event.key) {
        start()
        gStart()
        startStop()
      }

      // if correct letter pressed
      if (event.key === letters[0] && !gGameOver && !gameOver) {
        addScore()
        skip()
      }

      if (score >= gameDuration / 1000) {
        winGame()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [
    addScore,
    startStop,
    winGame,
    gameStarted,
    score,
    letters,
    skip,
    start,
    gStart,
    gGameOver,
    gameOver,
    gameDuration,
  ])

  return (
    <div className="flex flex-col space-y-8 items-center justify-evenly">
      <div className="flex flex-col items-center justify-center h-40">
        {gameEnded ? (
          <ResultBox
            win={gameWon}
            durationPlayed={gameDuration - gRemainingTime}
            score={score}
          />
        ) : (
          <motion.div
            initial={{ x: 10, y: -10, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ ease: "easeIn", delay: 0.1 }}
          >
            <LetterDisplayBox
              letters={letters}
              enableNextLetter={!!rhythmSettings.enableNextLetter}
            />
            {!!letters[0] && (
              <TimerBox
                remainingTime={remainingTime}
                duration={letterDuration}
              />
            )}
          </motion.div>
        )}
      </div>
      <motion.div
        initial={{ x: 10, y: 10, opacity: 0 }}
        animate={{ x: 0, y: 0, opacity: 1 }}
        transition={{ ease: "easeIn", delay: 0.1 }}
      >
        <ScoreBox score={score} />
        <TimerBox remainingTime={gRemainingTime} duration={gameDuration} />
        <SettingModal onOpen={handleRetry} />
      </motion.div>
      {gameEnded ? (
        <Button
          onClick={handleRetry}
          variant="akmalmohtar"
          className="w-[150px] fade-in-10"
        >
          Retry
        </Button>
      ) : (
        <Button
          onClick={handleStartStopGame}
          variant="akmalmohtar"
          className="w-[150px]"
        >
          {gameStarted ? "Stop" : "Start"}
        </Button>
      )}
    </div>
  )
}
