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
    const dropdown = ".vacancy-item";
    const duration = 500;
    const list = ".vacancy-item_dropdown-content";
    $(".vacancy-item_head").click((e) => {
      let item = $(e.target).closest(dropdown);
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
    });
  }
  cardQuestionsDropdowns() {
    const questions = $('.card .tabs-item_question')

    if (questions.length > 0) {
      questions.click(function (event) {
        if (event.currentTarget === event.target) {
          const question = $(this)
          const drop = question.find('[class$="dropdown"]')

          if (question.hasClass('open')) {
            drop.css('max-height', '')
          } else {
            const dropClone = drop.clone()
            dropClone.css('max-height', 'none')
            dropClone.appendTo(question)
            const contentFitHeight = dropClone.css('height')
            dropClone.remove()
            drop.css('max-height', contentFitHeight)
          }

          question.toggleClass('open')
        }
      })

      $(window).resize(function () {
        const openQuestions = $('.tabs-item_question.open')

        openQuestions.each(function (index, openQuestion) {
          const openDrop = $(openQuestion).find('[class$="dropdown"]')
          const openDropClone = openDrop.clone()
          openDropClone.css('max-height', 'none')
          openDropClone.appendTo(openQuestion)
          const contentFitHeight = openDropClone.css('height')
          openDropClone.remove()
          openDrop.css('max-height', contentFitHeight)
        })
      })
    }
  }
}
