import { Client } from 'pg';

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  port: 5432,
  password: 'postgres',
});

const databaseName = 'db';

const createDatabaseIfNotExists = async () => {
  await client.connect();
  try {
    // Check if the database exists
    const result = await client.query(
      `SELECT 1 FROM pg_database WHERE datname='${databaseName}'`,
    );

    if (result.rowCount === 0) {
      // If not, create the database
      console.log(`Database "${databaseName}" does not exist. Creating it...`);
      await client.query(`CREATE DATABASE ${databaseName}`);
      console.log(`Database "${databaseName}" created successfully.`);
    } else {
      console.log(`Database "${databaseName}" already exists.`);
    }
  } catch (error) {
    console.error('Error checking or creating the database:', error);
  } finally {
    await client.end();
  }
};

createDatabaseIfNotExists();
