export default class Manager_tabs {
  constructor() {
    this.init();
  }
  init() {
    this.tabsInit();
    this.sidebarInit();
  }
  tabsInit() {
    $(".tabs-menu_item").click((e) => {
      let item = $(e.target);
      if (!item.is(".active")) {
        let menu = item.closest('.tabs-menu')
        let tabs = menu.parent().find('.tabs-item');
        menu.find('.tabs-menu_item').removeClass('active')
        tabs.removeClass('active')
        item.addClass('active')
        tabs.eq(item.index()).addClass('active')
      }
    });
  }
  sidebarInit() {
    const duration = 500;
    let list = ".sidebar-menu_dropdown-list";
    let dropdown = ".sidebar-menu_dropdown";
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
}
