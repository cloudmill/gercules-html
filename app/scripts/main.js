import $ from "jquery";
window.$ = $;

//Tools
import Listener from "./tools/listener";

//managers
import Managers_sliders from "./components/manager_sliders";
import Manager_forms from "./components/manager_forms";
import Manager_modals from "./components/manager_modals";
import Manager_styles from "./components/manager_styles";
import Manager_maps from "./components/manager_maps";

const CONFIG = {
  path: "./",
  debug: true,
};
window.CONFIG = CONFIG;
export default class App {
  constructor() {
    window.globalListener = new Listener();

    this.sliders = new Managers_sliders();
    this.forms = new Manager_forms();
    this.modals = new Manager_modals();
    this.styles = new Manager_styles();
    this.maps = new Manager_maps();

    sidemenu();
  }
}

function sidemenu() {
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
