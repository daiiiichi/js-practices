import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

function createTable(callback) {
  db.run(
    "CREATE TABLE IF NOT EXISTS books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    function () {
      console.log("booksテーブルの作成に成功しました。");
      callback();
    },
  );
}

function addRecord(callback) {
  db.run("INSERT INTO books (title) VALUES 1", function (err) {
    // Error: title(文字列型)に数値型を追加
    if (err) {
      console.log("レコードの追加に失敗しました。", err);
    } else {
      console.log("レコードの追加に成功しました。");
      callback();
    }
  });
}

function getRecord(callback) {
  db.get("SELECT * FROM books", function (err, row) {
    console.log("レコードの取得に成功しました。", row);
    callback();
  });
}

function deleteTable(callback) {
  db.run("DELETE FROM books", function () {
    console.log("テーブルの削除に成功しました。");
    callback();
  });
}

createTable(() => {
  addRecord(() => {
    getRecord(() => {
      deleteTable(() => {});
    });
  });
});
