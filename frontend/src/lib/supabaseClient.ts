

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://modahliovxvoujelunyn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1vZGFobGlvdnh2b3VqZWx1bnluIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2Njc5MTYsImV4cCI6MjA2ODI0MzkxNn0.Yi9IC7dpwGicYqAJRNSsvKlCpg__RJli8g77YVQ7vF8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export default supabase;