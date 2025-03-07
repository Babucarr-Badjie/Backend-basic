import { DatabaseSync } from "node:sqlite";
const db = new DatabaseSync(":memory:");

// set up the database -->Execute SQL statements from strings
// Table 1 ---> user table
db.exec(`
    CREATE TABLE users (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       username TEXT UNIQUE,
       password TEXT
    )
`);

// Table 2 ---> todos table
db.exec(`
    CREATE TABLE todos (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       user_id INTEGER,
       task TEXT,
       completed BOOLEAN DEFAULT 0,
       FOREIGN KEY(user_id) REFERENCES users(id)

    )
`);

export default db;
