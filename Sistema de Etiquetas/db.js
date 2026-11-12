const Database=require('better-sqlite3');
const path=require('path');const fs=require('fs');
const dir=path.join(__dirname,'data');fs.mkdirSync(dir,{recursive:true});
const db=new Database(path.join(dir,'validafacil.sqlite'));
db.pragma('journal_mode = WAL');db.pragma('foreign_keys = ON');
db.exec(`
CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY,email TEXT UNIQUE NOT NULL,password_hash TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS sessions(token_hash TEXT PRIMARY KEY,user_id INTEGER NOT NULL,expires_at TEXT NOT NULL,FOREIGN KEY(user_id) REFERENCES users(id));
CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY,name TEXT NOT NULL,brand TEXT NOT NULL DEFAULT '',unit TEXT NOT NULL DEFAULT 'un',days_after_open INTEGER,storage TEXT NOT NULL DEFAULT '',source TEXT NOT NULL DEFAULT '',verified_by TEXT NOT NULL DEFAULT '',verified_at TEXT,alert_days INTEGER NOT NULL DEFAULT 3,discount_pct REAL NOT NULL DEFAULT 20,price REAL NOT NULL DEFAULT 0,active INTEGER NOT NULL DEFAULT 1,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS batches(id INTEGER PRIMARY KEY,product_id INTEGER NOT NULL,company TEXT NOT NULL,lot_code TEXT NOT NULL,quantity REAL NOT NULL,manufactured_at TEXT NOT NULL,opened_at TEXT NOT NULL,original_expiry TEXT NOT NULL,expiry TEXT NOT NULL,handler TEXT NOT NULL,remaining REAL NOT NULL,status TEXT NOT NULL DEFAULT 'active',created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY(product_id) REFERENCES products(id));
CREATE TABLE IF NOT EXISTS promotions(id INTEGER PRIMARY KEY,batch_id INTEGER NOT NULL UNIQUE,discount_pct REAL NOT NULL,approved INTEGER NOT NULL DEFAULT 0,approved_at TEXT,FOREIGN KEY(batch_id) REFERENCES batches(id) ON DELETE CASCADE);
`);
module.exports=db;
