#!/usr/bin/env node

import minimist from "minimist";
import { Memo } from "./memo_manager/memo.js";
import { Files } from "./memo_manager/files.js";

const memo = new Memo();
const files = new Files();

const input = minimist(process.argv.slice(2));
const propertyNumber = Object.keys(input).length;

if (propertyNumber === 1) {
  memo.add();
} else if (propertyNumber === 2) {
  if (input.l === true) {
    files.displayList();
  } else if (input.r === true) {
    memo.read();
  } else if (input.d === true) {
    memo.delete();
  } else {
    console.error("Error: Invalid option. Use -l, -r, or -d");
  }
} else {
  console.error(
    "Error: Too many options. Please use only one option at a time",
  );
}
