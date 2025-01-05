import sqlite3 from "sqlite3";
import { createTable, addRecord, getRecord, deleteTable } from "./function.js";

const db = new sqlite3.Database(":memory:");

async function main() {
  await createTable(
    db,
    "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );
  await addRecord(db, "INSERT INTO books (title) VALUES ('Fight!')");
  await getRecord(db, "SELECT * FROM books");
  await deleteTable(db, "DELETE FROM books");
}

main();
