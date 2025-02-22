export function runAsync(db, sql) {
  return new Promise((resolve, reject) => {
    db.run(sql, function (err) {
      if (err) {
        return reject(err);
      } else {
        resolve(this);
      }
    });
  });
}

export function getAsync(db, sql) {
  return new Promise((resolve, reject) => {
    db.get(sql, (err, row) => {
      if (err) {
        return reject(err);
      } else {
        resolve(row);
      }
    });
  });
}
