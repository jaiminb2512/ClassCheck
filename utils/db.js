import { int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

// Define the GRADES table
export const GRADES = mysqlTable('grades', {
  id: int('id').primaryKey(),
  grade: varchar('grade', { length: 10 }).notNull(),
});

// Define the STUDENT table
export const STUDENT = mysqlTable('student', {
  id: int('id').autoincrement().primaryKey(),
  name: varchar('name', { length: 20 }).notNull(),
  grade: varchar('grade', { length: 10 }).notNull(),
  address: varchar('address', { length: 50 }).notNull(),
  number: varchar('contact', { length: 11 }),
});

// Function to get a database connection and drizzle instance
export async function getDBConnection() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Jaimin@2512',
    database: 'student',
    port: 3306,
  });

  return drizzle(connection);
}
