import { words } from "./data"

export const getRandomWords = (
  num: number,
  difficulty: "easy" | "medium" | "hard",
) => {
  const filteredWords = words.filter((word) => {
    switch (difficulty) {
      case "easy":
        return word.length <= 4
      case "medium":
        return word.length >= 5 && word.length <= 8
      case "hard":
        return word.length >= 9
      default:
        return word.length >= 5 && word.length <= 8
    }
  })

  const randomWords = []
  for (let i = 0; i < num; i++) {
    const randomIndex = Math.floor(Math.random() * filteredWords.length)
    randomWords.push(filteredWords[randomIndex])
  }
  return randomWords.join(" ")
}
