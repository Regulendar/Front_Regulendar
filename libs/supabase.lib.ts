import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabasePublicKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLIC_KEY;

if (!supabaseUrl || !supabasePublicKey) {
  throw new Error('Supabase URL or Public Key is not defined');
}

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Public Key:', supabasePublicKey);

export const supabase = createClient(supabaseUrl, supabasePublicKey, {
  auth: {
    ...(Platform.OS !== 'web' ? { storage: AsyncStorage } : {}),
  },
});
