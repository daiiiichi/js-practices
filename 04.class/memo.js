#!/usr/bin/env node

import minimist from "minimist";
import { MemoApp } from "./class_memo.js";

const memo = new MemoApp();

const input = minimist(process.argv.slice(2));
const propertyNumber = Object.keys(input).length;

if (propertyNumber === 1) {
  memo.add_file();
} else if (propertyNumber === 2) {
  if (input.l === true) {
    memo.display_list();
  } else if (input.r === true) {
    memo.read_file();
  } else if (input.d === true) {
    memo.delete_file();
  } else {
    console.error("Error: Invalid option. Use -l, -r, or -d");
  }
} else {
  console.error(
    "Error: Too many options. Please use only one option at a time",
  );
}
