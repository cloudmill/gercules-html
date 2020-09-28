import $ from "jquery";
window.$ = $;



//Tools
import Listener from "./tools/listener";
import Log from "./tools/log";

//managers
import Managers_sliders from "./components/manager_sliders";
import Manager_forms from "./components/manager_forms";
import Manager_modals from "./components/manager_modals";
import Manager_styles from "./components/manager_styles";
import Manager_maps from "./components/manager_maps";
import Manager_tabs from "./components/manager_tabs";

const CONFIG = {
  path: "./",
  debug: true,
};
window.CONFIG = CONFIG;
export default class App {
  constructor() {
    window.globalListener = new Listener();
    window.write = new Log();

    this.sliders = new Managers_sliders();
    this.forms = new Manager_forms();
    window.modals = this.modals = new Manager_modals();
    this.styles = new Manager_styles();
    this.maps = new Manager_maps();
    this.tabs = new Manager_tabs();

    // Карточка: dropdown через css transition (без js-анимации)
    test();
  }
}

function test() {
  $(".card .tabs-item_question").on("click", function (e) {
    const question = $(this)
    const drop = question.find('.tabs-item_dropdown')

    if (question.hasClass('open')) {
      drop.css('max-height', '') // max-height возвращается к значению из css
    } else {
      // считаем высоту drop'a без ограничений
      const dropClone = drop.clone()
      dropClone.appendTo(question)
      dropClone.css('max-height', 'unset') // max-height "выключается"
      const realHeight = dropClone.css('height')
      dropClone.remove()
      drop.css('max-height', realHeight)
    }

    question.toggleClass('open')
  })
}
