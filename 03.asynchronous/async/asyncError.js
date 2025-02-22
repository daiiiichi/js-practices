import sqlite3 from "sqlite3";
import { runAsync, getAsync } from "../utils/asyncUtil.js";

const db = new sqlite3.Database(":memory:");

async function main() {
  await runAsync(
    db,
    "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  );

  try {
    const insertResult = await runAsync(
      db,
      "INSERT INTO books (title) VALUES (NULL)",
    ); // Error: title(文字列型)にNULLを追加
    console.log("レコードの追加に成功しました。id:", insertResult.lastID);
  } catch (err) {
    console.error("レコードの追加に失敗しました。ERROR:", err);
  }

  try {
    const row = await getAsync(db, "SELECT * FROM refs"); // Error: 存在しないテーブルの参照
    console.log("レコードの取得に成功しました。", row);
  } catch (err) {
    console.error("レコードの取得に失敗しました。ERROR:", err);
  }

  await runAsync(db, "DELETE FROM books");
  console.log("テーブルの削除に成功しました。");
}

main();
