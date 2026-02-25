import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Credentials missing');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function checkSchema() {
    const { data, error } = await supabase.rpc('get_table_columns', { table_name: 'perfis' });

    if (error) {
        // If RPC fails, try a direct query to information_schema via a trick or just assume based on common patterns
        console.log('RPC failed, trying raw query...');
        const { data: cols, error: colError } = await supabase
            .from('perfis')
            .select('*')
            .limit(1);

        if (colError) {
            console.error('Error fetching perfis:', colError);
        } else if (cols && cols.length > 0) {
            console.log('Sample record columns:', Object.keys(cols[0]));
        } else {
            console.log('No records in perfis to guess columns.');
        }
    } else {
        console.log('Columns:', data);
    }
}

checkSchema();
