import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';

// This creates a local file named 'sqlite.db' in your project folder
const sqlite = new Database('sqlite.db');
export const db = drizzle(sqlite);