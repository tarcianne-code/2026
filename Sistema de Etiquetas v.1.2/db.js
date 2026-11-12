
const fs=require('fs'),path=require('path'),Database=require('better-sqlite3');
const dir=process.env.CR_DATA_DIR||path.join(__dirname,'data');fs.mkdirSync(dir,{recursive:true});
const db=new Database(path.join(dir,'checkrapido.sqlite'));db.pragma('journal_mode=WAL');db.pragma('foreign_keys=ON');
db.exec(`
CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY,email TEXT UNIQUE NOT NULL,password_hash TEXT NOT NULL);
CREATE TABLE IF NOT EXISTS sessions(token_hash TEXT PRIMARY KEY,user_id INTEGER NOT NULL,expires_at INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS products(id INTEGER PRIMARY KEY,name TEXT NOT NULL,conservation TEXT NOT NULL,location TEXT NOT NULL,shelf_life_hours INTEGER NOT NULL);
CREATE TABLE IF NOT EXISTS batches(id INTEGER PRIMARY KEY,product_id INTEGER NOT NULL REFERENCES products(id),lot TEXT NOT NULL,prepared_at TEXT NOT NULL,expires_at TEXT NOT NULL,quantity TEXT NOT NULL,responsible TEXT NOT NULL,token TEXT UNIQUE NOT NULL);
`);
module.exports=db;
