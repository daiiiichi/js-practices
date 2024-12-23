import calendarize from "calendarize";
import minimist from "minimist";

// コマンドラインの入力内容を取得し、その年月の情報を取得
const input = minimist(process.argv.slice(2));
const inputYear = input.y || new Date().getFullYear();
const inputMonth = input.m || new Date().getMonth() + 1;
const month = calendarize(new Date(inputYear, inputMonth - 1));

// カレンダーの見出し
const monthName = `     ${inputMonth}月 ${inputYear}`;
const weekName = "日 月 火 水 木 金 土";

// カレンダーの整形/出力
console.log(monthName);
console.log(weekName);
month.forEach((week) => {
  week.forEach((day) => {
    if (day === 0) {
      process.stdout.write("   ");
    } else if (day < 10) {
      process.stdout.write(` ${day} `);
    } else {
      process.stdout.write(`${day} `);
    }
  });
  process.stdout.write("\n");
});