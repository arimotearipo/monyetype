import { BaseServerActionResponse } from "@/types"

type ScoreData = {
  userId: string
  score: number
}

export async function saveScoreAction(
  scoreData: ScoreData,
): Promise<BaseServerActionResponse> {
  const res = await fetch(process.env.BASE_URI + "/api/score", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(scoreData),
  })

  return await res.json()
}
