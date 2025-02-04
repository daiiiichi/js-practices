export class FileName {
  constructor(date = new Date()) {
    this.date = date;
  }

  create() {
    const dateTimeComponents = [
      this.date.getFullYear(),
      this.date.getMonth() + 1,
      this.date.getDate(),
      this.date.getHours(),
      this.date.getMinutes(),
      this.date.getSeconds(),
    ];

    return dateTimeComponents
      .map((component) => String(component).padStart(2, "0"))
      .join("");
  }
}
