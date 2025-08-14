import { z } from "zod"
import type { CheckedState } from "@radix-ui/react-checkbox"

export type TDifficulty = "easy" | "medium" | "hard"

export type TRhythmSettings = {
  gameDuration: number
  letterDuration: number
  enableNextLetter: CheckedState
  enableNumbers: CheckedState
  enableSpecialCharacters: CheckedState
  enableUppercaseLetters: CheckedState
  enableUppercaseSpecialCharacters: CheckedState
}

export type SignupInfo = {
  username: string
  email: string
  password: string
  confirmPassword: string
}

export type LoginInfo = {
  email: string
  password: string
}

export type BaseServerActionResponse = {
  success: boolean
  message: string
}

export const SignupSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters long "),
    confirmPassword: z
      .string()
      .min(6, "Password must be at least 6 characters long "),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords do not match!",
    path: ["password", "confirmPassword"],
  })

export const LoginSchema = z.object({
  email: z.email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

export const RhythmScoreSchema = z.object({
  userId: z.number(),
  timestamp: z.date(),
  score: z.number(),
  durationPlayed: z.number(),
  speed: z.number(),
})
