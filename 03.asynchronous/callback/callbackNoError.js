import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    db.run("INSERT INTO books (title) VALUES ('Fight!')", function () {
      console.log("レコードの追加に成功しました。id:", this.lastID);

      db.get("SELECT * FROM books", (_, row) => {
        console.log("レコードの取得に成功しました。", row);

        db.run("DROP TABLE books", () => {
          console.log("テーブルの削除に成功しました。");
        });
      });
    });
  },
);
