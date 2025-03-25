import sqlite3 from "sqlite3";
import { runAsync, getAsync } from "../utils/sqlFunctions.js";

const db = new sqlite3.Database(":memory:");

runAsync(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => runAsync(db, "INSERT INTO books (title) VALUES ('Fight!')"))
  .then((result) => {
    console.log("レコードの追加に成功しました。id:", result.lastID);
  })
  .then(() => getAsync(db, "SELECT * FROM books"))
  .then((row) => {
    console.log("レコードの取得に成功しました。", row);
  })
  .then(() => runAsync(db, "DROP TABLE books"))
  .then(() => {
    console.log("テーブルの削除に成功しました。");
  });
