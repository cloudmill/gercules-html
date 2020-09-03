export default class Modal {
  constructor(el) {
    this.el = el;
    this.state = "close";
    this.id = this.el.id;
    this.animate = false;
  }
  open(handler = () => {}) {
    if (!this.animate) {
      this.animate = true;
      this.el.classList.add("active");
      setTimeout(() => {
        this.state = "open";
        this.animate = false;
        handler();
      }, 800);
    }
  }
  close(handler = () => {}) {
    if (!this.animate) {
      this.animate = true;
      this.el.classList.remove("active");
      this.state = "close";
      this.animate = false;
      handler();
    }
  }
}