import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run("INSERT INTO books (title) VALUES ('Fight!')", (err) => {
      if (err) return console.error("レコードの追加に失敗しました。");
      console.log("レコードの追加に成功しました。");

      db.get("SELECT * FROM books", (err, row) => {
        if (err) return console.error("レコードの取得に失敗しました。");
        console.log("レコードの取得に成功しました。", row);

        db.run("DELETE FROM books", () => {
          console.log("テーブルの削除に成功しました。");
        });
      });
    });
  },
);
