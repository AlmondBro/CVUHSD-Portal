/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/logic.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/logic.js":
/*!*********************!*\
  !*** ./js/logic.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//import { headers } from \"./headers.js\";\nconsole.log(\"logic.js loaded\");\nvar url = \"https://www.site24x7.com/api/current_status?apm_required=true&group_required=false&locations_required=false&suspended_required=false\";\n/*\r\nvar request = new Request(url, {\r\n    method: 'POST', \r\n\tmode: 'cors', \r\n\tredirect: 'follow',\r\n    headers: headers\r\n}); */\n\nwindow.onload = function () {\n  /* window.fetch(request)\r\n    .then(function(response) {\r\n        return response.json();\r\n    })\r\n    .then(function(myJson) {\r\n        console.log(JSON.stringify(myJson));\r\n    }).catch(error => console.error('Error:', error)); */\n  var data = null;\n  var xhr = new XMLHttpRequest();\n  xhr.withCredentials = true;\n  xhr.addEventListener(\"readystatechange\", function () {\n    if (this.readyState === 4) {\n      console.log(this.responseText);\n    }\n  });\n  xhr.open(\"GET\", \"https://www.site24x7.com/api/current_status?apm_required=true&group_required=false&locations_required=false&suspended_required=false\");\n  xhr.setRequestHeader(\"Authorization\", \"Zoho-authtoken 400ff2f59afedd60b29e0ecec31f7c26\");\n  xhr.setRequestHeader(\"Cache-Control\", \"no-cache\");\n  xhr.setRequestHeader(\"Postman-Token\", \"708164c7-a97d-4b00-a186-5c8b4a2beffb\");\n  xhr.send(data);\n  console.log(\"Data:\\t\" + data);\n};\n\n//# sourceURL=webpack:///./js/logic.js?");

/***/ })

/******/ });