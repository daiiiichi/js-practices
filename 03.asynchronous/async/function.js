export function createTable(db, sql) {
  return new Promise((resolve, reject) => {
    db.run(sql, function (err) {
      if (err) {
        reject(err);
      } else {
        console.log("booksテーブルの作成に成功しました。");
        resolve();
      }
    });
  });
}

export function addRecord(db, sql) {
  return new Promise((resolve, reject) => {
    db.run(sql, function (err) {
      if (err) {
        reject(err);
      } else {
        console.log("レコードの追加に成功しました。");
        resolve();
      }
    });
  });
}

export function getRecord(db, sql) {
  return new Promise((resolve, reject) => {
    db.get(sql, function (err, row) {
      if (err) {
        reject(err);
      } else {
        console.log("レコードの取得に成功しました。", row);
        resolve();
      }
    });
  });
}

export function deleteTable(db, sql) {
  return new Promise((resolve, reject) => {
    db.run(sql, function (err) {
      if (err) {
        reject(err);
      } else {
        console.log("テーブルの削除に成功しました。");
        resolve();
      }
    });
  });
}
