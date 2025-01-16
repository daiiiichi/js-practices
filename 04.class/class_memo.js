import fs from "fs";
import path from "path";
import readline from "readline";
import pkg from "enquirer";

export class Memo {
  constructor(folder = "./memo_folder") {
    this.folder = folder;
    this.files = new Files(folder);
  }

  async getFirstLine(filePath) {
    const text = await fs.promises.readFile(filePath, "utf-8");
    return text.split("\n")[0];
  }

  add() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const now = new Date();
    const dateTimeComponents = [
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
    ];

    const fileName_dateTime = dateTimeComponents
      .map((component) => String(component).padStart(2, "0"))
      .join("");

    let inputMemo = [];

    console.log("Fill in your notes. If you want to exit, type “end”.");

    rl.on("line", (input) => {
      if (input === "end") {
        rl.close();
      } else {
        inputMemo.push(input);
        fs.writeFileSync(
          `${this.folder}/${fileName_dateTime}.txt`,
          inputMemo.join("\n"),
        );
      }
    });
  }

  async read() {
    try {
      const file_list = await this.files.getFirstLines();
      const selectedFirstLine = await this.files.SelectList(file_list);
      const userSelectedFile = await this.files.findFile(
        file_list,
        selectedFirstLine,
      );

      const text = await fs.promises.readFile(
        userSelectedFile.filePath,
        "utf-8",
      );
      console.log("\n" + text);
    } catch (err) {
      console.error("Error reading directory:", err);
    }
  }

  async delete() {
    try {
      const file_list = await this.files.getFirstLines();
      const selectedFirstLine = await this.files.SelectList(file_list);
      const userSelectedFile = await this.files.findFile(
        file_list,
        selectedFirstLine,
      );

      await fs.promises.unlink(userSelectedFile.filePath);
      console.log(`deleted: ${userSelectedFile.firstLine}`);
    } catch (err) {
      console.error("Error reading directory:", err);
    }
  }
}

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

  async SelectList(fileList) {
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
