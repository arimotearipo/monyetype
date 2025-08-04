import { TRhythmSettings } from "@/types"
import { useCallback, useEffect, useMemo, useState } from "react"
import {
  LOWER_CASE,
  UPPER_CASE,
  NUMBERS,
  SPECIAL_CHARS_NO_SHIFT,
  SPECIAL_CHARS_SHIFT,
} from "@/constants/letters"

type Config = Omit<TRhythmSettings, "gameDuration" | "letterDuration">

export function useRandomLetter(config: Config) {
  const [letters, setLetters] = useState<[string, string]>(["", ""])

  const charactersPool = useMemo(() => {
    let charactersPool = [...LOWER_CASE]
    if (config.enableNumbers) {
      charactersPool = [...charactersPool, ...NUMBERS]
    }

    if (config.enableSpecialCharacters) {
      charactersPool = [...charactersPool, ...SPECIAL_CHARS_NO_SHIFT]
    }

    if (config.enableUppercaseLetters) {
      charactersPool = [...charactersPool, ...UPPER_CASE]
    }

    if (config.enableUppercaseSpecialCharacters) {
      charactersPool = [...charactersPool, ...SPECIAL_CHARS_SHIFT]
    }

    return charactersPool
  }, [config])

  const get = useCallback(() => {
    setLetters((prev) => {
      const i = Math.floor(Math.random() * (charactersPool.length - 1))
      const _charactersPool = charactersPool.filter((c) => c !== prev[1]) // prevent repeating same letter back to back
      const next = _charactersPool[i]
      return [prev[1], next]
    })
  }, [charactersPool])

  return { letters, get }
}
