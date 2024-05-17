export * from './lib/db';
import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'ls-20fdba53e4f887f2494ee5a00924534e10bcd0a4.cslpz2qipalq.ap-northeast-2.rds.amazonaws.com',
  user: 'dbmasteruser',
  password: '05H~+aJRaKtXVs=dZ0``a<H~kg)Bhel%',
  database: 'xp-app',
  port: 3306,
  timezone: '-09:00' // 한국 시간대로 설정
});
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

export { db };
