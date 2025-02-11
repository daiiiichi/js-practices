import sqlite3 from "sqlite3";
import { runAsync, getAsync } from "./function.js";

const db = new sqlite3.Database(":memory:");

runAsync(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    return runAsync(db, "INSERT INTO books (title) VALUES ('Fight!')").catch(
      (err) => {
        console.error("レコードの追加に失敗しました。ERROR:", err);
      },
    );
  })
  .then((insertResult) => {
    if (insertResult) {
      console.log("レコードの追加に成功しました。id:", insertResult.lastID);
    }

    return getAsync(db, "SELECT * FROM books").catch((err) => {
      console.error("レコードの取得に失敗しました。ERROR:", err);
    });
  })
  .then((row) => {
    if (row) {
      console.log("レコードの取得に成功しました。", row);
    }

    return runAsync(db, "DELETE FROM books");
  })
  .then(() => {
    console.log("テーブルの削除に成功しました。");
  });
