database: https://gist.github.com/Anu-suresh99/6e79c91b9d2f1a585349bce378078582

authentication setup: https://supabase.com/docs/guides/auth/auth-helpers/nextjs

before authentication generate the types of table:
- pnpm supabase login
- pnpm supabase gen types typescript --project-id "$PROJECT_REF" --schema public > types/supabase.ts