import fs from "fs";
import path from "path";
import readline from "readline";
import pkg from "enquirer";

class TerminalInput {
  rl() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    return rl;
  }
}

class FileName {
  create() {
    const now = new Date();
    const dateTimeComponents = [
      now.getFullYear(),
      now.getMonth() + 1,
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      now.getSeconds(),
    ];

    return dateTimeComponents
      .map((component) => String(component).padStart(2, "0"))
      .join("");
  }
}

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
    const fileNameDateTime = new FileName();
    const fileName = fileNameDateTime.create();

    let inputMemo = [];

    console.log("Fill in your notes. If you want to exit, type “end”.");

    const terminalInput = new TerminalInput();
    const rl = terminalInput.rl();
    rl.on("line", (input) => {
      if (input === "end") {
        rl.close();
      } else {
        inputMemo.push(input);
        fs.writeFileSync(
          `${this.folder}/${fileName}.txt`,
          inputMemo.join("\n"),
        );
      }
    });
  }

  async read() {
    try {
      const file_list = await this.files.getFirstLines();
      const selectedFirstLine = await this.files.selectList(file_list);
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
      const selectedFirstLine = await this.files.selectList(file_list);
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
