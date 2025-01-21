import readline from "readline";

export class TerminalInput {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  online(callback) {
    this.rl.on("line", callback);
  }

  close() {
    this.rl.close();
  }
}
