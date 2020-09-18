export default class Log {
  constructor() {
    this.defStyle = "font-size:11px;font-weight: medium;";
    this.styles = {
      log: "color: #333;",
      warn: "color: #a59524;",
      error: "color: #E41D2C;",
      good: "color: #19BB4F;",
      br: 'font-size: 20px; color: "#000; ',
    };
  }
  getStyle(type, style) {
    return this.defStyle + this.styles[type] + style;
  }
  log(text, style) {
    console.log("%c" + text, this.getStyle("log", style));
  }
  warn(text, style) {
    console.warn("%c" + text, this.getStyle("warn", style));
  }
  error(text, style) {
    console.error("%c" + text, this.getStyle("error", style));
  }
  good(text, style) {
    console.log("%c" + text, this.getStyle("good", style));
  }
  br(style) {
    console.log("%c" + "===============", this.getStyle("br", style));
  }
}
