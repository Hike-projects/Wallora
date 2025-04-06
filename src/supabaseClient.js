// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qqmsvvynsvdkpnnshfoc.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFxbXN2dnluc3Zka3BubnNoZm9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5MTUyOTYsImV4cCI6MjA1OTQ5MTI5Nn0.MdabKAIUPF1XDW8UWFw0SBR8tF9YlwyaPJ7LIfwQt9k'

export const supabase = createClient(supabaseUrl, supabaseKey)