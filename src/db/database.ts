import { drizzle } from "drizzle-orm/node-postgres"
import { Client } from "pg"

const client = new Client(process.env.DB_URI || "")

await client.connect()

export const db = drizzle(client)
