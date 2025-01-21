export class FileName {
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
