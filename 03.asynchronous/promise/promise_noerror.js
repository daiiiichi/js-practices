import sqlite3 from "sqlite3";
import { createTable, addRecord, getRecord, deleteTable } from "./function.js";

const db = new sqlite3.Database(":memory:");

createTable(
  db,
  "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => addRecord(db, "INSERT INTO books (title) VALUES ('Fight!')"))
  .then(() => getRecord(db, "SELECT * FROM books"))
  .then(() => deleteTable(db, "DELETE FROM books"));
