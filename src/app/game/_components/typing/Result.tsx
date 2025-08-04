import React from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"

interface ResultPageProps {
  correctWords: number
  totalTypedChars: number
  errors: number
  timer: number
  wpmHistory: Array<{ time: number; wpm: number }> // Array to store WPM history
  defaultTimer: number
}

const ResultPage: React.FC<ResultPageProps> = ({
  correctWords,
  totalTypedChars,
  errors,
  timer,
  wpmHistory,
  defaultTimer,
}) => {
  let wpm = 0
  if (timer == 0) {
    // complete when timer ends
    wpm = correctWords > 0 ? (correctWords / defaultTimer) * 60 : 0
  } else {
    //complete before timer ends
    wpm = (correctWords / timer) * 60
  }

  const accuracy =
    totalTypedChars > 0
      ? ((totalTypedChars - errors) / totalTypedChars) * 100
      : 0

  return (
    <div className="bg-white p-6 rounded-sm shadow-md w-11/12 max-w-(--breakpoint-2xl) ">
      <div className="flex flex-col items-center justify-center ">
        <h1 className="text-2xl font-bold mb-4 text-black">Results</h1>
        <p className="text-black">Words Per Minute (WPM): {wpm.toFixed(2)}</p>
        <p className="text-black">Accuracy: {accuracy.toFixed(2)}%</p>
        <p className="text-black">Total Words Typed: {correctWords}</p>
        <p className="text-black">Errors: {errors}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-orange-600 text-white p-2 rounded-sm mt-4"
        >
          Try Again
        </button>

        <h2 className="mt-6 text-xl font-bold mb-4 text-black">
          WPM Over Time
        </h2>
        <LineChart
          width={1300}
          height={300}
          data={wpmHistory}
          margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="time"
            label={{
              value: "Time (s)",
              offset: -5,
              position: "insideBottom",
            }}
          />
          <YAxis label={{ value: "WPM", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Line type="monotone" dataKey="wpm" stroke="#ea580c" />
        </LineChart>
      </div>
    </div>
  )
}

export default ResultPage
