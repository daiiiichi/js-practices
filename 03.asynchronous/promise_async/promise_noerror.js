import sqlite3 from "sqlite3";
import { runPromise, getPromise } from "./function.js";

const db = new sqlite3.Database(":memory:");

runPromise(
  db,
  "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    console.log("booksテーブルの作成に成功しました。");
    return getPromise(db, "INSERT INTO books (title) VALUES ('Fight!')");
  })
  .then(() => {
    console.log("レコードの追加に成功しました。");
    return runPromise(db, "SELECT * FROM books");
  })
  .then(() => {
    console.log("レコードの取得に成功しました。");
    return runPromise(db, "DELETE FROM books");
  })
  .then(() => {
    console.log("テーブルの削除に成功しました。");
  })
  .catch((err) => {
    console.error("エラーが発生しました。", err);
  });
