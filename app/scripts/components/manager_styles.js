export default class Manager_styles {
  constructor() {
    this.init();
  }
  init() {
    this.setTouchType();
  }
  setTouchType() {
    let div = document.createElement('div');
    div.style.overflowY = 'scroll';
    div.style.width = '50px';
    div.style.height = '50px';
    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove()
    document.documentElement.style.setProperty('--scrollBar-width', scrollWidth)
    if ($(window).width() < $(window).outerWidth()) {
      $("html").removeClass("touch");
      $("html").addClass("no-touch");
    } else {
      $("html").removeClass("no-touch");
      $("html").addClass("touch");
    }
  }
}
