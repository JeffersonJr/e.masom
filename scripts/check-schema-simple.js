import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = fs.readFileSync('.env.local', 'utf8');
const urlMatch = env.match(/VITE_SUPABASE_URL="(.+)"/);
const keyMatch = env.match(/VITE_SUPABASE_ANON_KEY="(.+)"/);

const supabaseUrl = urlMatch ? urlMatch[1] : null;
const supabaseAnonKey = keyMatch ? keyMatch[1] : null;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Credentials missing');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkSchema() {
    const { data, error } = await supabase
        .from('perfis')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error fetching perfis:', error);
    } else if (data && data.length > 0) {
        console.log('Columns:', Object.keys(data[0]));
    } else {
        // Try to get columns via RPC or assume 'id'
        console.log('No data, likely RLS is blocking select but we can try to guess or use RPC if exists.');
    }
}

checkSchema();
