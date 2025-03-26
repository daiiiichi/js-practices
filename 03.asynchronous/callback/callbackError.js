import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  () => {
    // Error: title(文字列型)にNULLを追加
    db.run("INSERT INTO books (title) VALUES (NULL)", function (err) {
      if (err && typeof err === "object" && "message" in err) {
        console.error(err.message);
      } else if (err) {
        console.error(err);
      } else {
        console.log("レコードの追加に成功しました。id:", this.lastID);
      }

      // Error: 存在しないテーブルの参照
      db.get("SELECT * FROM refs", (err, row) => {
        if (err && typeof err === "object" && "message" in err) {
          console.error(err.message);
        } else if (err) {
          console.error(err);
        } else {
          console.log("レコードの取得に成功しました。", row);
        }

        db.run("DROP TABLE books", () => {
          console.log("テーブルの削除に成功しました。");
        });
      });
    });
  },
);
