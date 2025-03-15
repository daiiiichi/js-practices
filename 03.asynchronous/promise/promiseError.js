import sqlite3 from "sqlite3";
import { runAsync, getAsync } from "../utils/sqlFunctions.js";

const db = new sqlite3.Database(":memory:");

runAsync(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => runAsync(db, "INSERT INTO books (title) VALUES (NULL)")) // Error: title(文字列型)にNULLを追加
  .catch((err) => {
    console.error(err.message);
  })
  .then(() => getAsync(db, "SELECT * FROM refs")) // Error: 存在しないテーブルの参照
  .catch((err) => {
    console.error(err.message);
  })
  .then(() => runAsync(db, "DROP TABLE books"))
  .then(() => {
    console.log("テーブルの削除に成功しました。");
  });
