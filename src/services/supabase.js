import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ofqpharlzwhuqmmyglqx.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9mcXBoYXJsendodXFtbXlnbHF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwNzI4NDMsImV4cCI6MjA5NjY0ODg0M30.uBN1dicL3YV0UsXoT29gMWExzrgzz5-Dpn-Mw6KiwMY'

export const supabase = createClient(supabaseUrl, supabaseKey)