import sqlite3 from "sqlite3";
import { runAsync, getAsync } from "../utils/sqlFunctions.js";

const db = new sqlite3.Database(":memory:");

runAsync(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    return runAsync(db, "INSERT INTO books (title) VALUES (NULL)"); // Error: title(文字列型)にNULLを追加
  })
  .then((result) => {
    if (result) {
      console.log("レコードの追加に成功しました。id:", result.lastID);
    }

    return getAsync(db, "SELECT * FROM refs"); // Error: 存在しないテーブルの参照
  })
  .then((row) => {
    if (row) {
      console.log("レコードの取得に成功しました。", row);
    }

    return runAsync(db, "DROP TABLE books");
  })
  .then(() => console.log("テーブルの削除に成功しました。"))
  .catch((err) => {
    console.error(err.message);
  });
