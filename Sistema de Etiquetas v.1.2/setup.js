
const db=require('./db'),bcrypt=require('bcryptjs'),readline=require('readline');
const rl=readline.createInterface({input:process.stdin,output:process.stdout}),ask=q=>new Promise(r=>rl.question(q,r));
(async()=>{if(db.prepare('SELECT count(*) n FROM users').get().n){console.log('Administrador já cadastrado.');rl.close();return}
const email=(await ask('E-mail: ')).trim().toLowerCase(),password=await ask('Senha (8+ caracteres): ');
if(!/^[^@ ]+@[^@ ]+\.[^@ ]+$/.test(email)||password.length<8)throw Error('E-mail ou senha inválidos');
db.prepare('INSERT INTO users(email,password_hash) VALUES(?,?)').run(email,bcrypt.hashSync(password,12));console.log('Administrador criado.');rl.close()})().catch(e=>{console.error(e.message);rl.close();process.exitCode=1});
