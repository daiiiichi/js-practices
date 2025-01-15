import fs from "fs";
import path from "path";
import readline from "readline";
import pkg from "enquirer";

export class MemoApp {
  constructor(folder = "./memo_folder") {
    this.folder = folder;
  }

  async #getFileList() {
    const fileList = [];
    try {
      const files = await fs.promises.readdir(this.folder);
      for (const file of files) {
        const filePath = path.join(this.folder, file);
        const text = await fs.promises.readFile(filePath, "utf-8");
        const firstLine = text.split("\n")[0];
        fileList.push({ filePath, firstLine });
      }
    } catch (err) {
      console.error("Error retrieving file list:", err);
    }
    return fileList;
  }

  async #promptSelect(fileList) {
    const choices = fileList.map((file) => file.firstLine);
    const { Select } = pkg;
    const selectPrompt = new Select({
      name: "file",
      message: "Choose a note:",
      choices,
    });
    return selectPrompt.run();
  }

  async #findFile(fileList, selectedFirstLine) {
    const selectedFile = fileList.find(
      (file) => file.firstLine === selectedFirstLine,
    );
    return selectedFile;
  }

  add_file() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const now = new Date();
    const fileName_dateTime =
      now.getFullYear() +
      String(now.getMonth() + 1).padStart(2, "0") +
      String(now.getDate()).padStart(2, "0") +
      String(now.getHours()).padStart(2, "0") +
      String(now.getMinutes()).padStart(2, "0") +
      String(now.getSeconds()).padStart(2, "0");

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

  async display_list() {
    try {
      const file_list = await this.#getFileList();
      for (const file of file_list) {
        console.log(file.firstLine);
      }
    } catch (err) {
      console.error("Error reading directory:", err);
    }
  }

  async read_file() {
    try {
      const file_list = await this.#getFileList();
      const selectedFirstLine = await this.#promptSelect(file_list);
      const userSelectedFile = await this.#findFile(
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

  async delete_file() {
    try {
      const file_list = await this.#getFileList();
      const selectedFirstLine = await this.#promptSelect(file_list);
      const userSelectedFile = await this.#findFile(
        file_list,
        selectedFirstLine,
      );

      await fs.promises.unlink(userSelectedFile.filePath);
      console.log(`deteted:${userSelectedFile.firstLine}`);
    } catch (err) {
      console.error("Error reading directory:", err);
    }
  }
}
