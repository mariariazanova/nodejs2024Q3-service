require('dotenv').config();

const { Client } = require('pg');

async function createDatabase() {
  const client = new Client({
    host: process.env.DATABASE_HOST || 'postgres',
      // 'localhost',
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'postgres', //initial database that already exists
  });

  console.log(process.env.DATABASE_NAME);

  try {
    await client.connect();
    await client.query(`CREATE DATABASE ${process.env.DATABASE_NAME}`);

    console.log(`Database ${process.env.DATABASE_NAME} created successfully`);
  } catch (error) {
    if (error.code === '42P04') {
      console.log(`Database ${process.env.DATABASE_NAME} already exists`);
    } else {
      console.error(`Error creating database: ${error}`);
    }
  } finally {
    await client.end();
  }
}

createDatabase();
