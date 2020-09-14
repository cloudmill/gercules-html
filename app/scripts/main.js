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
    this.modals = new Manager_modals();
    this.styles = new Manager_styles();
    this.maps = new Manager_maps();
    this.tabs = new Manager_tabs();
  }
}

