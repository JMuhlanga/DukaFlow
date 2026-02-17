import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Initialize dotenv to pull variables from your .env file
dotenv.config();

/*
Initializing SQL DB Connection
*/

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10, // Adjust based on your expected traffic
  queueLimit: 0
});

/*
 Connection test
*/
const testConnection = async () => {
  try {
    const connection = await db.getConnection();
    console.log('✅ DukaFlow connected to MySQL successfully.');
    connection.release();
  } catch (err) {
    console.error('❌ Database connection failed:', err.message);
  }
};

testConnection();

export default db;