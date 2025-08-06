import { faker } from "@faker-js/faker"

export const getRandomWords = (
  num: number,
  difficulty: "easy" | "medium" | "hard",
) => {
  let max
  let min
  switch (difficulty) {
    case "easy":
      max = 4
      min = 0
      break
    case "medium":
      min = 5
      max = 8
      break
    case "hard":
      min = 9
      max = undefined
    default:
      min = 5
      max = 8
  }

  const randomWords = []

  for (let i = 0; i < num; i++) {
    const randomWord = faker.word.sample({ length: { min, max } })

    randomWords.push(randomWord)
  }

  return randomWords.join(" ")
}
