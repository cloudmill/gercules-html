import $ from "jquery";
window.$ = $;

//Tools
import Listener from "./tools/listener";

//managers
import Managers_sliders from "./components/manager_sliders";
import Manager_forms from "./components/manager_forms";
import Manager_modals from "./components/manager_modals";
import Manager_styles from "./components/manager_styles";


export default class App {
  constructor() {
    window.globalListener = new Listener();

    this.sliders = new Managers_sliders();
    this.forms = new Manager_forms();
    this.modals = new Manager_modals();
    this.styles = new Manager_styles();
  }
}
