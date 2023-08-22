import Pool from 'pg-pool'
import { drizzle } from 'drizzle-orm/node-postgres';
import postgres from 'postgres';
import * as schema from "./schema";

 const sql = postgres( process.env.DATABASE_CONNECTION_STRING as string,{
    max:1
});

export const db = drizzle ( sql, {
    schema,
});
