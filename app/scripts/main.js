import $ from "jquery";
window.$ = $;

//Tools
import Listener from "./tools/listener";

//managers
import Managers_sliders from "./components/manager_sliders";
import Manager_forms from "./components/manager_forms";
import Manager_modals from "./components/manager_modals";

export default class App {
  constructor() {
    window.globalListener = new Listener();

    this.sliders = new Managers_sliders();
    this.forms = new Manager_forms();
    this.modals = new Manager_modals();

    // $(".markets-item").click(function () {
    //   if ($(this).hasClass("open")) {
    //     $(".markets-item.open .market-dropdown").slideUp();
    //     $(this).removeClass("open");
    //   } else {
    //     $(".markets-item.open .market-dropdown").slideUp();
    //     $(".markets-item.open").removeClass("open");
    //     $(this).addClass("open");
    //     $(".markets-item.open .market-dropdown").slideDown();
    //   }
    // });
  }
}
