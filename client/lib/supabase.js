// client/lib/supabase.js
"use client";

import { createClient } from "@supabase/supabase-js";

// --- Security Check ---
if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  console.warn("⚠️ Missing NEXT_PUBLIC_SUPABASE_URL in .env");
  }
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn("⚠️ Missing NEXT_PUBLIC_SUPABASE_ANON_KEY in .env");
    }

    // --- Create Supabase Client ---
    export const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
          {
              auth: {
                    persistSession: true,  // keeps user logged in
                          autoRefreshToken: true,
                                detectSessionInUrl: true, 
                                    },
                                      }
                                      );