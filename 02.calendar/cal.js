#!/usr/bin/env node

import calendarize from "calendarize";
import minimist from "minimist";

const input = minimist(process.argv.slice(2));
const now = new Date();
const year = input.y ?? now.getFullYear();
const month = input.m ?? now.getMonth() + 1;
const calendar = calendarize(new Date(year, month - 1));

const calendarName = `      ${month}月 ${year}`;
const dayOfWeekLabel = "日 月 火 水 木 金 土";

console.log(calendarName);
console.log(dayOfWeekLabel);
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
