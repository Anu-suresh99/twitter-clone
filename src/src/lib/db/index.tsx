
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from "./schema";
import { Sql } from 'postgres';

const sql = postgres( process.env.DATABASE_CONNECTION_STRING as string,{
max:1
});

export const db = drizzle ( sql,{schema,});