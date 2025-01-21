import path from "path";
import pkg from "enquirer";
import fs from "fs";
import { Memo } from "./memo.js";

export class Files {
  constructor(folder = "./memo_folder") {
    this.folder = folder;
  }

  async getFirstLines() {
    const fileList = [];
    try {
      const files = await fs.promises.readdir(this.folder);
      const memo = new Memo();
      for (const file of files) {
        const filePath = path.join(this.folder, file);
        const firstLine = await memo.getFirstLine(filePath); // スペル修正
        fileList.push({ filePath, firstLine });
      }
    } catch (err) {
      console.error("Error retrieving file list:", err);
    }
    return fileList;
  }

  async selectList(fileList) {
    const choices = fileList.map((file) => file.firstLine);
    const { Select } = pkg;
    const selectPrompt = new Select({
      name: "file",
      message: "Choose a note:",
      choices,
    });
    return selectPrompt.run();
  }

  async findFile(fileList, selectedFirstLine) {
    return fileList.find((file) => file.firstLine === selectedFirstLine);
  }

  async displayList() {
    try {
      const file_list = await this.getFirstLines();
      for (const file of file_list) {
        console.log(file.firstLine);
      }
    } catch (err) {
      console.error("Error reading directory:", err);
    }
  }
}
