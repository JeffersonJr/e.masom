
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase credentials missing in .env.local');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testSignupAndLogin() {
    const testEmail = `test_${Date.now()}@evolves.com.br`;
    const testPassword = 'Password123!';

    console.log(`Attempting signup for ${testEmail}...`);

    try {
        // 1. Test Signup
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: testEmail,
            password: testPassword,
            options: {
                data: {
                    full_name: 'Test Runner',
                }
            }
        });

        if (authError) {
            console.error('Signup Error:', authError.message, authError.status);
            return;
        }

        console.log('Signup Successful. User ID:', authData.user?.id);
        console.log('Identities:', authData.user?.identities);

        // Check if user is confirmed (Supabase might require email confirmation by default)
        if (authData.user && authData.user.identities && authData.user.identities.length === 0) {
            console.warn('WARNING: User created but no identities found. This usually means email confirmation is required.');
        }

        // 2. Test Login immediately
        console.log('Attempting Login...');
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
            email: testEmail,
            password: testPassword,
        });

        if (loginError) {
            console.error('Login Error:', loginError.message, loginError.status);
            if (loginError.message.includes('Email not confirmed')) {
                console.log('Confirmed: Login failed because email confirmation is required.');
            }
        } else {
            console.log('Login Successful! Session created.');
        }

    } catch (err) {
        console.error('Unexpected Error:', err);
    }
}

testSignupAndLogin();
