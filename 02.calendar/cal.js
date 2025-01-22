#!/usr/bin/env node

import calendarize from "calendarize";
import minimist from "minimist";

const input = minimist(process.argv.slice(2));
const timeStamp = new Date();
const year = input.y ? input.y : timeStamp.getFullYear();
const month = input.m ? input.m : timeStamp.getMonth() + 1;
const calendar = calendarize(new Date(year, month - 1));

const calendarName = `      ${month}月 ${year}`;
const weekdayName = "日 月 火 水 木 金 土";

console.log(calendarName);
console.log(weekdayName);
calendar.forEach((week) => {
  let weekStr = week
    .map((day) => {
      if (day === 0) {
        return "   ";
      } else if (day < 10) {
        return ` ${day} `;
      } else {
        return `${day} `;
      }
    })
    .join("");
  process.stdout.write(weekStr.trimEnd() + "\n");
});
