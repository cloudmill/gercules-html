import $ from 'jquery';

class SlideDown {
  constructor({ el, item, time, boxContent, minHeight }) {
    this.item = item;
    this.time = time || 400;
    this.minHeight = minHeight || "0";
    this.el = el;
    this.boxContent = boxContent;
    this.opened = false;
    this.init();
  }
  init() {
    this.el.css("transition-duration", `${this.time}ms`);
    this.el.css("box-sizing", `content-box`);
    this.item.click((e) => {
      if (e.currentTarget === e.target) this.toggle();
    });
    this.item.find('>*:not([class$="dropdown"])').click((e) => {
      this.toggle();
    });
    $(window).on("resize", this.update.bind(this));
  }
  get heightBox() {
    const boxContentElement = this.boxContent[0];
    const boxContentStyle = getComputedStyle(boxContentElement);
    const boxContentPaddingTop = +boxContentStyle.paddingTop.slice(0, boxContentStyle.paddingTop.length - 2);
    const boxContentPaddingBottom = +boxContentStyle.paddingBottom.slice(0, boxContentStyle.paddingBottom.length - 2);

    return this.boxContent.height() + boxContentPaddingTop + boxContentPaddingBottom;
  }
  set height(newHeight) {
    this.el.css("max-height", newHeight);
  }
  open() {
    this.height = this.heightBox;
  }
  close() {
    this.height = this.minHeight;
  }
  toggle() {
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
    this.item.toggleClass("open");
    this.opened = !this.opened;
  }
  update() {
    if (this.opened) {
      this.open();
    }
  }
}

export default class Manager_tabs {
  constructor() {
    this.init();
  }
  init() {
    this.tabsInit();
    this.sidebarInit();
    this.vacancyDropdowns();
    this.cardQuestionsDropdowns();
  }
  tabsInit() {
    $(".tabs-menu_item").click((e) => {
      let item = $(e.target);
      if (!item.is(".active")) {
        let menu = item.closest(".tabs-menu");
        let tabs = menu.parent().find(".tabs-item");
        menu.find(".tabs-menu_item").removeClass("active");
        tabs.removeClass("active");
        item.addClass("active");
        tabs.eq(item.index()).addClass("active");
      }
    });
  }
  sidebarInit() {
    const duration = 500;
    const list = ".sidebar-menu_dropdown-list";
    const dropdown = ".sidebar-menu_dropdown";
    $(dropdown + ".open " + list).slideDown({
      duration: 0,
    });
    $(".sidebar-menu_dropdown span").click((e) => {
      let item = $(e.target).closest(dropdown);

      if (!item.is(".active")) {
        if (item.is(".open")) {
          item.removeClass("open");
          item.find(list).slideUp({ duration: duration });
        } else {
          $(dropdown + ".open:not(.active) " + list).slideUp({
            duration: duration,
          });
          $(dropdown + ".open").removeClass("open");
          item.addClass("open");
          item.find(list).slideDown({ duration: duration });
        }
      }
    });
  }
  vacancyDropdowns() {
    $(".vacancy-item").each((key, element) => {
      new SlideDown({
        item: $(element),
        el: $(element).find(".vacancy-item_dropdown"),
        boxContent: $(element).find(".vacancy-item_dropdown-content"),
        time: 500,
      });
    });
  }
  cardQuestionsDropdowns() {
    $(".card .tabs-item_question").each((key, element) => {
      new SlideDown({
        item: $(element),
        el: $(element).find(".tabs-item_dropdown"),
        boxContent: $(element).find(".tabs-item_dropdown .box-content"),
        time: 400,
        minHeight: 65,
      });
    });
  }
}
