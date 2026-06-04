import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Dedicated Supabase client for LEADS only.
//
// The main client (client.ts) points to the BLOG project (unpqekghcpjclzvpeyse)
// so the site renders autoblog articles. Lead capture must NOT follow it there:
// the leads table in the blog project has a different schema (no kontak/sumber),
// so inserts fail with "column leads.kontak does not exist" and are lost
// silently. This client pins leads to the shared leads project
// (wfthvovlhphnrodrqxqt), whose leads table has nama/kontak/sumber.
//
// Hardcoded fallback on purpose: the anon key is public (already in the client
// bundle) and pinning it makes lead routing immune to env misconfiguration.
// Accepts either env naming: NEXT_PUBLIC_LEADS_SUPABASE_PUBLISHABLE_KEY (used by
// the sibling sites) or NEXT_PUBLIC_LEADS_SUPABASE_ANON_KEY.
const LEADS_SUPABASE_URL =
  process.env.NEXT_PUBLIC_LEADS_SUPABASE_URL ?? 'https://wfthvovlhphnrodrqxqt.supabase.co';
const LEADS_SUPABASE_KEY =
  process.env.NEXT_PUBLIC_LEADS_SUPABASE_PUBLISHABLE_KEY ??
  process.env.NEXT_PUBLIC_LEADS_SUPABASE_ANON_KEY ??
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmdGh2b3ZsaHBobnJvZHJxeHF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyNTU1NjYsImV4cCI6MjA3MzgzMTU2Nn0.cXHWZbabCY93LbzgCgle9lVOW407MPV4jrtw1BuPkHo';

// persistSession: false so this client never touches the main client's auth
// session in localStorage (it never authenticates a user).
export const leadsSupabase = createClient<Database>(
  LEADS_SUPABASE_URL,
  LEADS_SUPABASE_KEY,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  }
);