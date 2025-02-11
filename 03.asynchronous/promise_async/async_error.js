import sqlite3 from "sqlite3";
import { runAsync, getAsync } from "./function.js";

const db = new sqlite3.Database(":memory:");

async function main() {
  try {
    await runAsync(
      db,
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    );
    console.log("booksテーブルの作成に成功しました。");

    const insertRecord = await runAsync(
      db,
      "INSERT INTO books (title) VALUES 1",
    );
    console.log("レコードの追加に成功しました。id:", insertRecord.lastID);

    const rows = await getAsync(db, "SELECT * FROM books");
    console.log("レコードの取得に成功しました。", rows);

    await runAsync(db, "DELETE FROM books");
    console.log("テーブルの削除に成功しました。");
  } catch (err) {
    console.error("エラーが発生しました。", err);
  }
}

main();
