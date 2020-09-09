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
  path: './',
  debug: true,
}
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

  $(".sidemenu-list").click(function (e) {
    if (!$(this).hasClass("active")) {
      if ($(this).hasClass("open")) {
        console.log("OPEN");
        $(this).removeClass("open");
        $(this).find(".sidemenu-dropdown").slideUp({ duration: duration });
      } else {
        $(".sidemenu-list.open").find(".sidemenu-dropdown").slideUp({ duration: duration });
        $(".sidemenu-list.open").removeClass("open");
        $(this).addClass("open");
        $(this).find(".sidemenu-dropdown").slideDown({ duration: duration });
      }
    }
  });
}
