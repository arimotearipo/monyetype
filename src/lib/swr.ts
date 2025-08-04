export async function fetcher(url: string) {
  return fetch(process.env.BASE_URL + url)
    .then((res) => res.json)
    .catch((err) => console.error(err))
}

export async function mutater(url: string, { arg }: { arg?: unknown }) {
  const body = JSON.stringify(arg)

  return fetch(url, {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json)
    .catch((err) => console.error(err))
}
