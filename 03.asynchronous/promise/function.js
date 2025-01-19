export function runPromise(db, sql) {
  return new Promise((resolve, reject) => {
    db.run(sql, function (err) {
      if (err) return reject(err);
      resolve(this);
    });
  });
}

export function getPromise(db, sql) {
  return new Promise((resolve, reject) => {
    db.get(sql, (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
}
