const { int, mysqlTable, varchar, boolean } = require('drizzle-orm/mysql-core');

export const GRADES = mysqlTable('grades', {
  id: int('id', { length: 11 }).primaryKey(),
  grade: varchar('grade', { length: 10 }).notNull()
});

export const STUDENT = mysqlTable('student', {
  id: int('id', { length: 11 }).autoincrement().primaryKey(),
  name: varchar('name', { length: 20 }).notNull(),
  grade: varchar('grade', { length: 10 }).notNull(),
  address: varchar('address', { length: 50 }).notNull(),
  contact: varchar('contact', { length: 15 })
});

export const ATTENDANCE = mysqlTable('attendance', {
  id: int('id', { length: 11 }).autoincrement().primaryKey(),
  studentId: int('studentId', { length: 11 }).notNull(),
  present: boolean('present').default(false),
  day: int('day', { length: 11 }).notNull(),
  date: varchar('date', { length: 20 }).notNull()
});
