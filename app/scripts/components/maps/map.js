export default class Map {
  constructor(opts) {
    this.opts = {
      center: [55.751574, 37.573856],
      balloon: false,
      placemarkBut: false,
      geo: false,
      search: false,
      ...opts,
    };
    ymaps.ready(() => {
      this.init();
    });
  }
  init() {
    this.map = new ymaps.Map(
      "map",
      {
        center: this.opts.center,
        zoom: 9,
        controls: ["geolocationControl"],
      },
      {
        searchControlProvider: "yandex#search",
      }
    );
    this.clustererInit();
    this.placemarkInit();
    this.setOptions();
  }
  clustererInit() {
    var clusterIcons = [
        {
          href: `${CONFIG.path}images/map-pin-cluster.svg`,
          size: [50, 50],
          offset: [-25, -25],
        },
        {
          href: `${CONFIG.path}images/map-pin-cluster.svg`,
          size: [50, 50],
          offset: [-25, -25],
        },
      ],
      MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div style="color: #FFFFFF; font-weight: bold;">{{ properties.geoObjects.length }}</div>'
      );
    this.clusterer = new ymaps.Clusterer({
      clusterIcons: clusterIcons,
      clusterIconContentLayout: MyIconContentLayout,
    });
  }
  placemarkInit() {
    $(".map-data input").each((key, item) => {
      let dataCords = $(item).attr("data-cords");
      let coords = dataCords.replace(" ", "").split(",");
      let dataName = $(item).attr("data-name");
      let dataContent = $(item).attr("data-content");
      let ballonContent = {};
      let iconSettings = {
        iconImageSize: [37, 40],
        iconImageOffset: [-18, -40],
      };
      if (this.opts.balloon) {
        ballonContent = {
          balloonContentHeader: `<span class='placemark-name' >${dataName}</span>`,
          balloonContentBody: `<span class='placemark-content' >${dataContent}</span>`,
        };
        iconSettings = {
          iconImageSize: [37, 40],
          iconImageOffset: [-18, -40],
        };
      }
      let placeMark = new ymaps.Placemark(coords, ballonContent, {
        iconLayout: "default#image",
        iconImageHref: `${CONFIG.path}images/map-pin.svg`,
        ...iconSettings,
      });
      placeMark.id = key;
      if (this.opts.placemarkBut) this.setPlacemarkBut(placeMark);
      this.clusterer.add(placeMark);
    });
    this.map.geoObjects.add(this.clusterer);
  }
  setPlacemarkBut(placeMark) {
    let pointTarget = $(".markets-item[data-id=" + placeMark.id + "]");
    pointTarget.click(() => {
      placeMark.events.fire("click", {
        coordPosition: placeMark.geometry.getCoordinates(),
        target: placeMark,
      });
      this.map.panTo([placeMark.geometry.getCoordinates()], {
        flying: true,
      });
    });
    placeMark.events.add("click", (e) => {
      $(".markets-item").removeClass("active");
      pointTarget.addClass("active");
    });
  }
  setOptions() {
    this.map.behaviors.disable("scrollZoom");
    this.map.events.add("click", () => {
      this.map.balloon.close();
    });
    this.map.controls.add(
      new ymaps.control.ZoomControl({
        options: {
          size: "auto",
          float: "none",
          position: { right: 10, bottom: 40 },
        },
      })
    );
    if ($(window).width() <= 768) {
      this.map.behaviors.disable("drag");
    }
    if (this.opts.geo) this.setGeo();
    if (this.opts.search) this.setSearch();
  }
  async setGeo() {
    try {
      let geo = ymaps.geolocation;
      let result = await geo.get({
        provider: "yandex",
        mapStateAutoApply: true,
      });
      result.geoObjects.options.set("preset", "islands#geolocationIcon");
      result.geoObjects.get(0).properties.set({
        balloonContentBody: "Мое местоположение",
      });
      this.map.geoObjects.add(result.geoObjects);
      $(".whereBuy-geo").click(() => {
        let btnGeo = $("[class*=-float-button-icon_icon_geolocation]");
        if (btnGeo.length > 0) btnGeo.click();
      });
    } catch (e) {
      console.log(e);
    }
  }
  setSearch() {
    this.searchControl = new ymaps.control.SearchControl({
      options: {
        provider: "yandex#search",
      },
    });
    this.map.controls.add(this.searchControl);
    $(".show-in-map").click((e) => {
      e.preventDefault();
      $("html, body").animate({ scrollTop: $("#map").offset().top - 90 }, 500); // анимируем скроолинг к элементу scroll_el
      let search = $(e.target).attr("data-search");
      // if ($("#map-block #map").length > 0) {
      //   $("[href='#map-block']").click();
      //   that.search(search);
      // } else {
      this.search(search);
      //}
    });
  }
  search(str) {
    this.searchControl.search(str);
  }
  remove() {
    $("#map *").remove();
  }
  update() {
    this.remove();
    this.init();
  }
}
