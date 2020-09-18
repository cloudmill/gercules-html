import $ from "jquery";
import Map from "./maps/map";

export default class Manager_maps {
  constructor() {
    this.init();
  }
  init() {
    if ($(".contacts-map").length > 0) {
      this.contactsMap();
    } else if ($(".whereBuy-map").length > 0) {
      this.whereBuyMap();
    } else if ($(".modal-map").length > 0) {
      this.modalMap();
    }
  }
  contactsMap() {
    var map = new Map({
      coords: [55.751574, 37.573856],
      geo: true,
    });
  }
  whereBuyMap() {
    var map = new Map({
      coords: [55.751574, 37.573856],
      geo: false,
      placemarkBut: true,
      //search: true,
    });
    $('.whereBuy-location select').change((e)=>{
      map.update();
    })
    $('.buy-markets-type button').click((e)=>{
      if(!$(e.target).is('.active')){
        $('.buy-markets-type button').removeClass('active')
        $(e.target).addClass('active');
        map.update();
      }
    })
  }
  modalMap() {
    $(".map-content").append('<div id="map"></div>');
    var map = new Map({
      coords: [55.751574, 37.573856],
      geo: false,
    });
  }
}
