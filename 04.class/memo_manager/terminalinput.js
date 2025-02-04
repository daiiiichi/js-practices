import readline from "readline";

export class TerminalInput {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  get() {
    return new Promise((resolve) => {
      const inputMemo = [];
      console.log("Fill in your notes. If you want to exit, type “end”.");

      this.rl.on("line", (input) => {
        if (input === "end") {
          this.rl.close();
          resolve(inputMemo);
        } else {
          inputMemo.push(input);
        }
      });
    });
  }
}
