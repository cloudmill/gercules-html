import "jquery";

class SlideDown {
  constructor({
    el,
    item,
    time,
    boxContent,
    minHeight,
    breakpoint
  }) {
    this.item = item;
    this.time = time || 400;
    this.minHeight = minHeight || "0";
    this.el = el;
    this.boxContent = boxContent;
    this.opened = false;
    this.breakpoint = breakpoint
    this.init();
  }
  init() {
    this.el.css("transition-duration", `${this.time}ms`);
    this.el.css("box-sizing", `content-box`);
    this.item.click((e) => {
      if (!this.breakpoint || parseFloat($(window).width()) <= this.breakpoint) {
        if (
          e.target === e.currentTarget ||
          $(e.target).hasClass("tabs-menu_title") ||
          $(e.target).hasClass("documentation-files_title")
        ) {
          this.toggle();
        }
      }
    });
    $(window).on("resize", this.update.bind(this));
  }
  get heightBox() {
    const boxContentElement = this.boxContent[0];
    const boxContentStyle = getComputedStyle(boxContentElement);
    const boxContentPaddingTop = +boxContentStyle.paddingTop.slice(0, boxContentStyle.paddingTop.length - 2);
    const boxContentPaddingBottom = +boxContentStyle.paddingBottom.slice(0, boxContentStyle.paddingBottom.length - 2);

    // test
    console.log(this.boxContent.height() + boxContentPaddingTop + boxContentPaddingBottom)

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
      if (
        this.el.css("display") === "none" ||
        this.item.css("display") === "none"
      ) {
        this.toggle()
      } else {
        this.open();
      }
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
    this.sidebarDropdown();
    this.documentationFilesBlock();

    // тест
    this.test()
  }

  // тест
  test() {
    const slide = new SlideDown({
      item: $(".dev-test"),
      el: $(".dev-drop"),
      boxContent: $(".dev-content"),
      speed: 300,
      minHeight: 40
    })
  }

  tabsInit() {
    const tabsComponents = $(".tabs")

    tabsComponents.each((index, tabsComponent) => {
      const isMobileComponent = $(tabsComponent).hasClass("content-mobile")

      // init mobile menu (title + dropdown)
      if (isMobileComponent) {
        updateTitle()

        new SlideDown({
          item: $(tabsComponent).find(".tabs-menu_mobile"),
          el: $(tabsComponent).find(".tabs-menu_dropdown"),
          boxContent: $(tabsComponent).find(".tabs-menu_content"),
          speed: 500
        })
      }

      // desktop & mobile menu handler
      const tabsMenuItemsAll = $(tabsComponent).find(".tabs-menu_item")
      const tabsItems = $(tabsComponent).find(".tabs-item")

      tabsMenuItemsAll.click(event => {
        const clickedMenuItem = $(event.target)

        if (!clickedMenuItem.hasClass("active")) {
          tabsMenuItemsAll.removeClass("active")
          tabsItems.removeClass("active")

          const clickedMenuItemIndex = clickedMenuItem.index()
          const tabsDesktopMenuItems = $(tabsComponent).find(".tabs-menu .tabs-menu_item")
          const tabsMobileMenuItems = $(tabsComponent).find(".tabs-menu_mobile .tabs-menu_item")
          tabsDesktopMenuItems.eq(clickedMenuItemIndex).addClass("active")
          tabsMobileMenuItems.eq(clickedMenuItemIndex).addClass("active")
          tabsItems.eq(clickedMenuItemIndex).addClass("active")

          if (isMobileComponent) {
            updateTitle()
          }
        }
      })

      // update mobile menu title
      function updateTitle() {
        const title = $(tabsComponent).find(".tabs-menu_mobile .tabs-menu_item.active").text()

        $(tabsComponent).find(".tabs-menu_title").text(title)
      }
    })
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
          item.find(list).slideUp({
            duration: duration
          });
        } else {
          $(dropdown + ".open:not(.active) " + list).slideUp({
            duration: duration,
          });
          $(dropdown + ".open").removeClass("open");
          item.addClass("open");
          item.find(list).slideDown({
            duration: duration
          });
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
  sidebarDropdown() {
    new SlideDown({
      item: $(".page-title"),
      el: $(".sidebar-dropdown"),
      boxContent: $(".sidebar-dropdown_content"),
      time: 500,
    })
  }
  cardQuestionsDropdowns() {
    const ITEM_CLASS = 'tabs-item_question';
  
    $('.' + ITEM_CLASS).each(function () {
      const drop = $(this).find('[class*="drop"]');

      $(this).on('click', event => {
        if (event.target.classList.contains(ITEM_CLASS)) {
          if (this.classList.contains('open')) {
            this.classList.remove('open');
            drop.css('max-height', '');
          } else {
            this.classList.add('open');
            drop.css('max-height', getContentHeight(drop));
          }
        }
      });

      $(window).on('resize', () => {
        if (this.classList.contains('open')) {
          drop.css('max-height', getContentHeight(drop));
        }
      });
    });

    function getContentHeight(element) {
      element.css('max-height', 'none');
      const contentHeight = getComputedStyle(element[0]).height;
      element.css('max-height', '');
      getComputedStyle(element[0]).height;
      return contentHeight;
    }
  }

  documentationFilesBlock() {
    const filesBlocks = $(".documentation-files")
    let filesSlides = []

    filesBlocks.each((index, filesBlock) => {
      filesSlides.push(new SlideDown({
        item: $(filesBlock),
        el: $(filesBlock).find(".documentation-files_dropdown"),
        boxContent: $(filesBlock).find(".documentation-files_content"),
        time: 500,
        breakpoint: 830
      }))
    })
  }
}