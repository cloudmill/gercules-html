"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

var _swiper = _interopRequireDefault(require("swiper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var App = function App() {
  var mySwiper = new _swiper["default"](".slider", {
    speed: 400,
    spaceBetween: 100,
    slidesPerView: 3
  });
};

var _default = App;
exports["default"] = _default;