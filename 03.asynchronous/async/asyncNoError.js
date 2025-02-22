import sqlite3 from "sqlite3";
import { runAsync, getAsync } from "../utils/sqlFunctions.js";

const db = new sqlite3.Database(":memory:");

await runAsync(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
);

const result = await runAsync(
  db,
  "INSERT INTO books (title) VALUES ('Fight!')",
);
console.log("レコードの追加に成功しました。id:", result.lastID);

const row = await getAsync(db, "SELECT * FROM books");
console.log("レコードの取得に成功しました。", row);

await runAsync(db, "DROP TABLE books");
console.log("テーブルの削除に成功しました。");
