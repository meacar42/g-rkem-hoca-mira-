/* import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
 */
// db.ts
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'mertacar',         // PostgreSQL kullanıcı adı
  host: 'localhost',         // Local host
  database: 'miradb',        // Veritabanı adı
  password: '',              // Şifren varsa buraya ekle
  port: 5432,                // PostgreSQL default port
});

export default pool;

// Örnek query
export async function query(text: string, params?: any[]) {
  const res = await pool.query(text, params);
  return res;
}