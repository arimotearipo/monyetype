"use client"

import { useCallback, useReducer } from "react"

const initialState = {
  score: 0,
  gameStarted: false,
  gameWon: false,
  gameEnded: false,
}

type GameStatus = typeof initialState

type ReducerAction = {
  type:
    | "addScore"
    | "startStopGame"
    | "stopGame"
    | "winGame"
    | "endGame"
    | "resetGame"
}

type GameStatusAction = {
  addScore: () => void
  startStop: () => void
  winGame: () => void
  endGame: () => void
  retry: () => void
}

function reducer(state: GameStatus, action: ReducerAction): GameStatus {
  switch (action.type) {
    case "addScore":
      return {
        ...state,
        score: state.score + 1,
      }
    case "endGame":
      return {
        ...state,
        gameEnded: true,
        gameStarted: false,
      }
    case "startStopGame":
      return {
        ...state,
        gameStarted: !state.gameStarted,
      }
    case "winGame":
      return {
        ...state,
        gameWon: true,
      }
    case "resetGame":
      return initialState
    default:
      return state
  }
}

export function useGameStatus(): [GameStatus, GameStatusAction] {
  const [state, dispatch] = useReducer(reducer, initialState)

  const addScore = useCallback(() => {
    dispatch({ type: "addScore" })
  }, [])

  // do i need to memoize this??
  const startStop = useCallback(() => {
    dispatch({ type: "startStopGame" })
  }, [])

  const winGame = useCallback(() => {
    dispatch({ type: "winGame" })
  }, [])

  const endGame = useCallback(() => {
    dispatch({ type: "endGame" })
  }, [])

  const retry = useCallback(() => {
    dispatch({ type: "resetGame" })
  }, [])

  const action = {
    addScore,
    startStop,
    winGame,
    endGame,
    retry,
  }

  return [state, action]
}
