import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run("INSERT INTO books (title) VALUES ('Fight!')", function (err) {
      if (err) {
        console.error("レコードの追加に失敗しました。ERROR:", err);
      } else {
        console.log("レコードの追加に成功しました。id:", this.lastID);
      }

      db.get("SELECT * FROM books", (err, row) => {
        if (err) {
          console.error("レコードの取得に失敗しました。ERROR:", err);
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
