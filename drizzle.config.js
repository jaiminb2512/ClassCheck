// drizzle.config.js
const { defineConfig } = require('drizzle-kit');

module.exports = defineConfig({
  dialect: 'mysql',
  dbCredentials: {
    host: 'localhost',
    user: 'root',
    password: 'Jaimin@2512',
    database: 'student',
    port: 3306
  },
  schema: './utils/schema.js',
  migrations: {
    table: 'migrations'
  }
});
