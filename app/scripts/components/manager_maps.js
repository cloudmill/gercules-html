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
      let city = $(".whereBuy-location select").val();
      
      $.ajax({
        url: "/local/templates/s1/include/ajax/wherebuy/getLocationList.php",
        type: "POST", //метод отправки
        dataType: "html", //формат данных
        data: {"city": city},
        success: function (data) {
          var location = $(data).find(".map-data");
          var markets = $(data).find('.markets-wrapper');
          $(".map-data").remove();
          $(".whereBuy-map").append(location);
          $(".markets-wrapper").remove();
          $(".buy-markets-list").append(markets);
          $('.buy-markets-type button').removeClass('active');
          $('#all-button').addClass('active');
          map.update();
          console.log(city);
        },
        error: function (response) {
          console.log("Ошибка обновления города!");
        }
      });
    })
    $('.buy-markets-type button').click((e)=>{
      if(!$(e.target).is('.active')){
        $('.buy-markets-type button').removeClass('active')
        $(e.target).addClass('active');
        let type = $(e.target).attr("data-key");
        let city = $(".whereBuy-location select").val();

        $.ajax({
          url: "/local/templates/s1/include/ajax/wherebuy/getLocationList.php",
          type: "POST", //метод отправки
          dataType: "html", //формат данных
          data: {"city": city, "type": type},
          success: function (data) {
            var location = $(data).find(".map-data");
            var markets = $(data).find('.markets-wrapper');
            $(".map-data").remove();
            $(".whereBuy-map").append(location);
            $(".markets-wrapper").remove();
            $(".buy-markets-list").append(markets);
            map.update();
            console.log(type);
          },
          error: function (response) {
            console.log("Ошибка обновления города!");
          }
        });
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
