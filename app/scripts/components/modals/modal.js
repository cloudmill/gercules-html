export default class Modal {
  constructor(el) {
    this.el = el;
    this.opened = false;
    this.id = this.el.id;
    this.animate = false;
    let t = window.getComputedStyle(this.el).transitionDuration;
    if (t.indexOf("s") != -1) {
      this.timeAnimate = parseFloat(t.replace("s", "")) * 1000;
    } else {
      this.timeAnimate = parseFloat(t.replace("ms", ""));
    }
  }
  update(fn) {
    return new Promise((resolve, reject) => {
      if (this.animate) reject();
      this.animate = true;
      fn(resolve, reject);
    });
  }
  open() {
    return this.update((resolve, reject) => {
      this.el.classList.add("active");
      setTimeout(() => {
        this.animate = false;
        this.opened = true;
        resolve();
      }, this.timeAnimate);
    });
  }
  close() {
    return this.update((resolve, reject) => {
      this.el.classList.remove("active");
      setTimeout(() => {
        this.animate = false;
        this.opened = false;
        resolve();
      }, 50);
    });
  }
}
