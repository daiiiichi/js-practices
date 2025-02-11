import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    // Error: title(文字列型)にNULLを追加
    db.run("INSERT INTO books (title) VALUES (NULL)", function (err) {
      if (err) {
        console.error("レコードの追加に失敗しました。");
      } else {
        console.log("レコードの追加に成功しました。id:", this.lastID);
      }

      db.get("SELECT * FROM books", (err, row) => {
        if (err) {
          console.error("レコードの取得に失敗しました。");
        } else {
          console.log("レコードの取得に成功しました。", row);
        }

        db.run("DELETE FROM books", () => {
          console.log("テーブルの削除に成功しました。");
        });
      });
    });
  },
);
