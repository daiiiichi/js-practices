import fs from "fs";
import { Files } from "./files.js";
import { FileName } from "./filename.js";
import { TerminalInput } from "./terminalinput.js";

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

    const inputMemo = [];

    console.log("Fill in your notes. If you want to exit, type “end”.");

    const terminalInput = new TerminalInput();
    terminalInput.online((input) => {
      if (input === "end") {
        terminalInput.close();
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
