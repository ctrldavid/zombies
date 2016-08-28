/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _classCallCheck2 = __webpack_require__(1);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var ws = __webpack_require__(2);

	var WebSocketServer = ws.Server,
	    wss = new WebSocketServer({ port: 8080 });

	wss.on('connection', function connection(ws) {
	  ws.on('message', function incoming(message) {
	    console.log('received: %s', message);
	  });

	  ws.send('something');
	});

	var games = ["first game", "second game", "third game"];

	console.log(games);

	/*
	  Server -> Client communication will be push based, with the server deciding when
	  and what to send to the client. Each 'sender' module will need its own 
	  heuristic for determining what is important to send.
	  It would be nice to have some way of pulling pending frames from each sender
	  so that the overall framework can grab frames from all senders until 
	  the websocket message is 'full' (which i guess would depend on the client's 
	  bandwidth? And time if it's taking ages to fill the message.)
	*/

	var PrioritySender = function PrioritySender() {
	  (0, _classCallCheck3.default)(this, PrioritySender);

	  console.log('hehehe');
	};

	var x = new PrioritySender();

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("ws");

/***/ }
/******/ ]);