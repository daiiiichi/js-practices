import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  (err) => {
    if (err) return console.error("booksテーブルの作成に失敗しました。");
    console.log("booksテーブルの作成に成功しました。");

    // Error: title(文字列型)に数値型を追加
    db.run("INSERT INTO books (title) VALUES 1", (err) => {
      if (err) return console.error("レコードの追加に失敗しました。");
      console.log("レコードの追加に成功しました。");

      db.get("SELECT * FROM books", (err, row) => {
        if (err) return console.error("レコードの追加に失敗しました。");
        console.log("レコードの取得に成功しました。", row);

        db.run("DELETE FROM books", (err) => {
          if (err) return console.error("テーブルの削除に失敗しました。");
          console.log("テーブルの削除に成功しました。");
        });
      });
    });
  },
);
