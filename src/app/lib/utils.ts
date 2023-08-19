import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { cookies,headers } from "next/headers"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "lucide-react"

export function cn(...inputs: ClassValue[]) {
return twMerge(clsx(inputs));
}

