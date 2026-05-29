// Connects to SQLite

const sqlite3 = require('sqlite3').verbose();

// Opens the database if it exists, or creates one if a db does not exist
const db = new sqlite3.Database('./server/database/vocab.db', (err) => {

    if (err) {
        console.log('Database connection error:', err.message);
    } else {
        console.log('Connected to SQLite database.');
    }

});

db.run(`
    CREATE TABLE IF NOT EXISTS vocabulary (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        word TEXT NOT NULL,
        definition TEXT NOT NULL,
        pronunciation TEXT NOT NULL
    )
`);




module.exports = db;