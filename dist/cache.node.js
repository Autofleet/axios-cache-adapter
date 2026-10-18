(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("axios"));
	else if(typeof define === 'function' && define.amd)
		define(["axios"], factory);
	else if(typeof exports === 'object')
		exports["axiosCacheAdapter"] = factory(require("axios"));
	else
		root["axiosCacheAdapter"] = factory(root[undefined]);
})(global, function(__WEBPACK_EXTERNAL_MODULE_axios__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.node.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/cache-control-esm/index.js":
/*!*************************************************!*\
  !*** ./node_modules/cache-control-esm/index.js ***!
  \*************************************************/
/*! exports provided: CacheControl, parse, format, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CacheControl", function() { return CacheControl; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parse", function() { return parse; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "format", function() { return format; });
const HEADER_REGEXP = /([a-zA-Z][a-zA-Z_-]*)\s*(?:=(?:"([^"]*)"|([^ \t",;]*)))?/g;
const STRINGS = {
  maxAge: 'max-age',
  sharedMaxAge: 's-maxage',
  maxStale: 'max-stale',
  minFresh: 'min-fresh',
  immutable: 'immutable',
  mustRevalidate: 'must-revalidate',
  noCache: 'no-cache',
  noStore: 'no-store',
  noTransform: 'no-transform',
  onlyIfCached: 'only-if-cached',
  private: 'private',
  proxyRevalidate: 'proxy-revalidate',
  public: 'public'
};
function parseBooleanOnly(value) {
  return value === null;
}
function parseDuration(value) {
  if (!value) {
    return null;
  }
  const duration = parseInt(value, 10);
  if (!Number.isFinite(duration) || duration < 0) {
    return null;
  }
  return duration;
}
class CacheControl {
  constructor() {
    this.maxAge = null;
    this.sharedMaxAge = null;
    this.maxStale = null;
    this.maxStaleDuration = null;
    this.minFresh = null;
    this.immutable = null;
    this.mustRevalidate = null;
    this.noCache = null;
    this.noStore = null;
    this.noTransform = null;
    this.onlyIfCached = null;
    this.private = null;
    this.proxyRevalidate = null;
    this.public = null;
  }
  parse(header) {
    if (!header || header.length === 0) {
      return this;
    }
    const values = {};
    const matches = header.match(HEADER_REGEXP) || [];
    Array.prototype.forEach.call(matches, match => {
      const tokens = match.split('=', 2);
      const [key] = tokens;
      let value = null;
      if (tokens.length > 1) {
        value = tokens[1].trim();
      }
      values[key.toLowerCase()] = value;
    });
    this.maxAge = parseDuration(values[STRINGS.maxAge]);
    this.sharedMaxAge = parseDuration(values[STRINGS.sharedMaxAge]);
    this.maxStale = parseBooleanOnly(values[STRINGS.maxStale]);
    this.maxStaleDuration = parseDuration(values[STRINGS.maxStale]);
    if (this.maxStaleDuration) {
      this.maxStale = true;
    }
    this.minFresh = parseDuration(values[STRINGS.minFresh]);
    this.immutable = parseBooleanOnly(values[STRINGS.immutable]);
    this.mustRevalidate = parseBooleanOnly(values[STRINGS.mustRevalidate]);
    this.noCache = parseBooleanOnly(values[STRINGS.noCache]);
    this.noStore = parseBooleanOnly(values[STRINGS.noStore]);
    this.noTransform = parseBooleanOnly(values[STRINGS.noTransform]);
    this.onlyIfCached = parseBooleanOnly(values[STRINGS.onlyIfCached]);
    this.private = parseBooleanOnly(values[STRINGS.private]);
    this.proxyRevalidate = parseBooleanOnly(values[STRINGS.proxyRevalidate]);
    this.public = parseBooleanOnly(values[STRINGS.public]);
    return this;
  }
  format() {
    const tokens = [];
    if (this.maxAge) {
      tokens.push(`${STRINGS.maxAge}=${this.maxAge}`);
    }
    if (this.sharedMaxAge) {
      tokens.push(`${STRINGS.sharedMaxAge}=${this.sharedMaxAge}`);
    }
    if (this.maxStale) {
      if (this.maxStaleDuration) {
        tokens.push(`${STRINGS.maxStale}=${this.maxStaleDuration}`);
      } else {
        tokens.push(STRINGS.maxStale);
      }
    }
    if (this.minFresh) {
      tokens.push(`${STRINGS.minFresh}=${this.minFresh}`);
    }
    if (this.immutable) {
      tokens.push(STRINGS.immutable);
    }
    if (this.mustRevalidate) {
      tokens.push(STRINGS.mustRevalidate);
    }
    if (this.noCache) {
      tokens.push(STRINGS.noCache);
    }
    if (this.noStore) {
      tokens.push(STRINGS.noStore);
    }
    if (this.noTransform) {
      tokens.push(STRINGS.noTransform);
    }
    if (this.onlyIfCached) {
      tokens.push(STRINGS.onlyIfCached);
    }
    if (this.private) {
      tokens.push(STRINGS.private);
    }
    if (this.proxyRevalidate) {
      tokens.push(STRINGS.proxyRevalidate);
    }
    if (this.public) {
      tokens.push(STRINGS.public);
    }
    return tokens.join(', ');
  }
}
function parse(header) {
  const cc = new CacheControl();
  return cc.parse(header);
}
function format(cc) {
  if (!(cc instanceof CacheControl)) {
    return CacheControl.prototype.format.call(cc);
  }
  return cc.format();
}

/* harmony default export */ __webpack_exports__["default"] = ({
  CacheControl,
  parse,
  format
});

/***/ }),

/***/ "./node_modules/charenc/charenc.js":
/*!*****************************************!*\
  !*** ./node_modules/charenc/charenc.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var charenc = {
  // UTF-8 encoding
  utf8: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      return charenc.bin.stringToBytes(unescape(encodeURIComponent(str)));
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      return decodeURIComponent(escape(charenc.bin.bytesToString(bytes)));
    }
  },

  // Binary encoding
  bin: {
    // Convert a string to a byte array
    stringToBytes: function(str) {
      for (var bytes = [], i = 0; i < str.length; i++)
        bytes.push(str.charCodeAt(i) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a string
    bytesToString: function(bytes) {
      for (var str = [], i = 0; i < bytes.length; i++)
        str.push(String.fromCharCode(bytes[i]));
      return str.join('');
    }
  }
};

module.exports = charenc;


/***/ }),

/***/ "./node_modules/crypt/crypt.js":
/*!*************************************!*\
  !*** ./node_modules/crypt/crypt.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() {
  var base64map
      = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',

  crypt = {
    // Bit-wise rotation left
    rotl: function(n, b) {
      return (n << b) | (n >>> (32 - b));
    },

    // Bit-wise rotation right
    rotr: function(n, b) {
      return (n << (32 - b)) | (n >>> b);
    },

    // Swap big-endian to little-endian and vice versa
    endian: function(n) {
      // If number given, swap endian
      if (n.constructor == Number) {
        return crypt.rotl(n, 8) & 0x00FF00FF | crypt.rotl(n, 24) & 0xFF00FF00;
      }

      // Else, assume array and swap all items
      for (var i = 0; i < n.length; i++)
        n[i] = crypt.endian(n[i]);
      return n;
    },

    // Generate an array of any length of random bytes
    randomBytes: function(n) {
      for (var bytes = []; n > 0; n--)
        bytes.push(Math.floor(Math.random() * 256));
      return bytes;
    },

    // Convert a byte array to big-endian 32-bit words
    bytesToWords: function(bytes) {
      for (var words = [], i = 0, b = 0; i < bytes.length; i++, b += 8)
        words[b >>> 5] |= bytes[i] << (24 - b % 32);
      return words;
    },

    // Convert big-endian 32-bit words to a byte array
    wordsToBytes: function(words) {
      for (var bytes = [], b = 0; b < words.length * 32; b += 8)
        bytes.push((words[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bytes;
    },

    // Convert a byte array to a hex string
    bytesToHex: function(bytes) {
      for (var hex = [], i = 0; i < bytes.length; i++) {
        hex.push((bytes[i] >>> 4).toString(16));
        hex.push((bytes[i] & 0xF).toString(16));
      }
      return hex.join('');
    },

    // Convert a hex string to a byte array
    hexToBytes: function(hex) {
      for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
      return bytes;
    },

    // Convert a byte array to a base-64 string
    bytesToBase64: function(bytes) {
      for (var base64 = [], i = 0; i < bytes.length; i += 3) {
        var triplet = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
        for (var j = 0; j < 4; j++)
          if (i * 8 + j * 6 <= bytes.length * 8)
            base64.push(base64map.charAt((triplet >>> 6 * (3 - j)) & 0x3F));
          else
            base64.push('=');
      }
      return base64.join('');
    },

    // Convert a base-64 string to a byte array
    base64ToBytes: function(base64) {
      // Remove non-base-64 characters
      base64 = base64.replace(/[^A-Z0-9+\/]/ig, '');

      for (var bytes = [], i = 0, imod4 = 0; i < base64.length;
          imod4 = ++i % 4) {
        if (imod4 == 0) continue;
        bytes.push(((base64map.indexOf(base64.charAt(i - 1))
            & (Math.pow(2, -2 * imod4 + 8) - 1)) << (imod4 * 2))
            | (base64map.indexOf(base64.charAt(i)) >>> (6 - imod4 * 2)));
      }
      return bytes;
    }
  };

  module.exports = crypt;
})();


/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "./node_modules/md5/md5.js":
/*!*********************************!*\
  !*** ./node_modules/md5/md5.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

(function(){
  var crypt = __webpack_require__(/*! crypt */ "./node_modules/crypt/crypt.js"),
      utf8 = __webpack_require__(/*! charenc */ "./node_modules/charenc/charenc.js").utf8,
      isBuffer = __webpack_require__(/*! is-buffer */ "./node_modules/is-buffer/index.js"),
      bin = __webpack_require__(/*! charenc */ "./node_modules/charenc/charenc.js").bin,

  // The core
  md5 = function (message, options) {
    // Convert to byte array
    if (message.constructor == String)
      if (options && options.encoding === 'binary')
        message = bin.stringToBytes(message);
      else
        message = utf8.stringToBytes(message);
    else if (isBuffer(message))
      message = Array.prototype.slice.call(message, 0);
    else if (!Array.isArray(message) && message.constructor !== Uint8Array)
      message = message.toString();
    // else, assume byte array already

    var m = crypt.bytesToWords(message),
        l = message.length * 8,
        a =  1732584193,
        b = -271733879,
        c = -1732584194,
        d =  271733878;

    // Swap endian
    for (var i = 0; i < m.length; i++) {
      m[i] = ((m[i] <<  8) | (m[i] >>> 24)) & 0x00FF00FF |
             ((m[i] << 24) | (m[i] >>>  8)) & 0xFF00FF00;
    }

    // Padding
    m[l >>> 5] |= 0x80 << (l % 32);
    m[(((l + 64) >>> 9) << 4) + 14] = l;

    // Method shortcuts
    var FF = md5._ff,
        GG = md5._gg,
        HH = md5._hh,
        II = md5._ii;

    for (var i = 0; i < m.length; i += 16) {

      var aa = a,
          bb = b,
          cc = c,
          dd = d;

      a = FF(a, b, c, d, m[i+ 0],  7, -680876936);
      d = FF(d, a, b, c, m[i+ 1], 12, -389564586);
      c = FF(c, d, a, b, m[i+ 2], 17,  606105819);
      b = FF(b, c, d, a, m[i+ 3], 22, -1044525330);
      a = FF(a, b, c, d, m[i+ 4],  7, -176418897);
      d = FF(d, a, b, c, m[i+ 5], 12,  1200080426);
      c = FF(c, d, a, b, m[i+ 6], 17, -1473231341);
      b = FF(b, c, d, a, m[i+ 7], 22, -45705983);
      a = FF(a, b, c, d, m[i+ 8],  7,  1770035416);
      d = FF(d, a, b, c, m[i+ 9], 12, -1958414417);
      c = FF(c, d, a, b, m[i+10], 17, -42063);
      b = FF(b, c, d, a, m[i+11], 22, -1990404162);
      a = FF(a, b, c, d, m[i+12],  7,  1804603682);
      d = FF(d, a, b, c, m[i+13], 12, -40341101);
      c = FF(c, d, a, b, m[i+14], 17, -1502002290);
      b = FF(b, c, d, a, m[i+15], 22,  1236535329);

      a = GG(a, b, c, d, m[i+ 1],  5, -165796510);
      d = GG(d, a, b, c, m[i+ 6],  9, -1069501632);
      c = GG(c, d, a, b, m[i+11], 14,  643717713);
      b = GG(b, c, d, a, m[i+ 0], 20, -373897302);
      a = GG(a, b, c, d, m[i+ 5],  5, -701558691);
      d = GG(d, a, b, c, m[i+10],  9,  38016083);
      c = GG(c, d, a, b, m[i+15], 14, -660478335);
      b = GG(b, c, d, a, m[i+ 4], 20, -405537848);
      a = GG(a, b, c, d, m[i+ 9],  5,  568446438);
      d = GG(d, a, b, c, m[i+14],  9, -1019803690);
      c = GG(c, d, a, b, m[i+ 3], 14, -187363961);
      b = GG(b, c, d, a, m[i+ 8], 20,  1163531501);
      a = GG(a, b, c, d, m[i+13],  5, -1444681467);
      d = GG(d, a, b, c, m[i+ 2],  9, -51403784);
      c = GG(c, d, a, b, m[i+ 7], 14,  1735328473);
      b = GG(b, c, d, a, m[i+12], 20, -1926607734);

      a = HH(a, b, c, d, m[i+ 5],  4, -378558);
      d = HH(d, a, b, c, m[i+ 8], 11, -2022574463);
      c = HH(c, d, a, b, m[i+11], 16,  1839030562);
      b = HH(b, c, d, a, m[i+14], 23, -35309556);
      a = HH(a, b, c, d, m[i+ 1],  4, -1530992060);
      d = HH(d, a, b, c, m[i+ 4], 11,  1272893353);
      c = HH(c, d, a, b, m[i+ 7], 16, -155497632);
      b = HH(b, c, d, a, m[i+10], 23, -1094730640);
      a = HH(a, b, c, d, m[i+13],  4,  681279174);
      d = HH(d, a, b, c, m[i+ 0], 11, -358537222);
      c = HH(c, d, a, b, m[i+ 3], 16, -722521979);
      b = HH(b, c, d, a, m[i+ 6], 23,  76029189);
      a = HH(a, b, c, d, m[i+ 9],  4, -640364487);
      d = HH(d, a, b, c, m[i+12], 11, -421815835);
      c = HH(c, d, a, b, m[i+15], 16,  530742520);
      b = HH(b, c, d, a, m[i+ 2], 23, -995338651);

      a = II(a, b, c, d, m[i+ 0],  6, -198630844);
      d = II(d, a, b, c, m[i+ 7], 10,  1126891415);
      c = II(c, d, a, b, m[i+14], 15, -1416354905);
      b = II(b, c, d, a, m[i+ 5], 21, -57434055);
      a = II(a, b, c, d, m[i+12],  6,  1700485571);
      d = II(d, a, b, c, m[i+ 3], 10, -1894986606);
      c = II(c, d, a, b, m[i+10], 15, -1051523);
      b = II(b, c, d, a, m[i+ 1], 21, -2054922799);
      a = II(a, b, c, d, m[i+ 8],  6,  1873313359);
      d = II(d, a, b, c, m[i+15], 10, -30611744);
      c = II(c, d, a, b, m[i+ 6], 15, -1560198380);
      b = II(b, c, d, a, m[i+13], 21,  1309151649);
      a = II(a, b, c, d, m[i+ 4],  6, -145523070);
      d = II(d, a, b, c, m[i+11], 10, -1120210379);
      c = II(c, d, a, b, m[i+ 2], 15,  718787259);
      b = II(b, c, d, a, m[i+ 9], 21, -343485551);

      a = (a + aa) >>> 0;
      b = (b + bb) >>> 0;
      c = (c + cc) >>> 0;
      d = (d + dd) >>> 0;
    }

    return crypt.endian([a, b, c, d]);
  };

  // Auxiliary functions
  md5._ff  = function (a, b, c, d, x, s, t) {
    var n = a + (b & c | ~b & d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._gg  = function (a, b, c, d, x, s, t) {
    var n = a + (b & d | c & ~d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._hh  = function (a, b, c, d, x, s, t) {
    var n = a + (b ^ c ^ d) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };
  md5._ii  = function (a, b, c, d, x, s, t) {
    var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
    return ((n << s) | (n >>> (32 - s))) + b;
  };

  // Package private blocksize
  md5._blocksize = 16;
  md5._digestsize = 16;

  module.exports = function (message, options) {
    if (message === undefined || message === null)
      throw new Error('Illegal argument ' + message);

    var digestbytes = crypt.wordsToBytes(md5(message, options));
    return options && options.asBytes ? digestbytes :
        options && options.asString ? bin.bytesToString(digestbytes) :
        crypt.bytesToHex(digestbytes);
  };

})();


/***/ }),

/***/ "./src/api.js":
/*!********************!*\
  !*** ./src/api.js ***!
  \********************/
/*! exports provided: setup, setupCache, serializeQuery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return setup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setupCache", function() { return setupCache; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request */ "./src/request.js");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cache */ "./src/cache.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "serializeQuery", function() { return _cache__WEBPACK_IMPORTED_MODULE_2__["serializeQuery"]; });

/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config */ "./src/config.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utilities */ "./src/utilities.js");






/**
 * Configure cache adapter
 *
 * @param   {object} [config={}] Cache adapter options
 * @returns {object} Object containing cache `adapter` and `store`
 */
function setupCache(config = {}) {
  // Extend default configuration
  config = Object(_config__WEBPACK_IMPORTED_MODULE_3__["makeConfig"])(config);

  // Axios adapter. Receives the axios request configuration as only parameter
  async function adapter(req) {
    // Merge the per-request config with the instance config.
    const reqConfig = Object(_config__WEBPACK_IMPORTED_MODULE_3__["mergeRequestConfig"])(config, req);

    // Execute request against local cache
    let res = await Object(_request__WEBPACK_IMPORTED_MODULE_1__["default"])(reqConfig, req);
    const next = res.next;

    // Response is not function, something was in cache, return it
    if (!Object(_utilities__WEBPACK_IMPORTED_MODULE_4__["isFunction"])(next)) return next;

    // Nothing in cache so we execute the default adapter or any given adapter
    // Will throw if the request has a status different than 2xx
    let networkError;
    try {
      res = await reqConfig.adapter(req);
    } catch (err) {
      networkError = err;
    }
    if (networkError) {
      // Check if we should attempt reading stale cache data
      const readOnError = Object(_utilities__WEBPACK_IMPORTED_MODULE_4__["isFunction"])(reqConfig.readOnError) ? reqConfig.readOnError(networkError, req) : reqConfig.readOnError;
      if (readOnError) {
        try {
          // Force cache tu return stale data
          reqConfig.acceptStale = true;

          // Try to read from cache again
          res = await Object(_request__WEBPACK_IMPORTED_MODULE_1__["default"])(reqConfig, req);

          // Signal that data is from stale cache
          res.next.request.stale = true;

          // No need to check if `next` is a function just return cache data
          return res.next;
        } catch (cacheReadError) {
          // Failed to read stale cache, do nothing here, just let the network error be thrown
        }
      }

      // Re-throw error so that it can be caught in userland if we didn't find any stale cache to read
      throw networkError;
    }

    // Process response to store in cache
    return next(res);
  }

  // Return adapter and store instance
  return {
    adapter,
    config,
    store: config.store
  };
}

// ---------------------
// Easy API Setup
// ---------------------

/**
 * Setup an axios instance with the cache adapter pre-configured
 *
 * @param {object} [options={}] Axios and cache adapter options
 * @returns {object} Instance of Axios
 */
function setup(config = {}) {
  const instanceConfig = {
    ..._config__WEBPACK_IMPORTED_MODULE_3__["defaults"].axios,
    ...config,
    cache: {
      ..._config__WEBPACK_IMPORTED_MODULE_3__["defaults"].axios.cache,
      ...config.cache
    }
  };
  const cache = setupCache(instanceConfig.cache);
  const {
    cache: _,
    ...axiosConfig
  } = instanceConfig;
  const api = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
    ...axiosConfig,
    adapter: cache.adapter
  });
  api.cache = cache.store;
  return api;
}

/* harmony default export */ __webpack_exports__["default"] = ({
  setup,
  setupCache,
  serializeQuery: _cache__WEBPACK_IMPORTED_MODULE_2__["serializeQuery"]
});

/***/ }),

/***/ "./src/cache.js":
/*!**********************!*\
  !*** ./src/cache.js ***!
  \**********************/
/*! exports provided: read, write, key, invalidate, serializeQuery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "read", function() { return read; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "write", function() { return write; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "key", function() { return key; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "invalidate", function() { return invalidate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "serializeQuery", function() { return serializeQuery; });
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ "./src/utilities.js");
/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! md5 */ "./node_modules/md5/md5.js");
/* harmony import */ var md5__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(md5__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _serialize__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./serialize */ "./src/serialize.js");



async function write(config, req, res) {
  try {
    const entry = {
      expires: config.expires,
      data: Object(_serialize__WEBPACK_IMPORTED_MODULE_2__["default"])(config, req, res)
    };
    await config.store.setItem(config.uuid, entry);
  } catch (err) {
    config.debug('Could not store response', err);
    if (config.clearOnError) {
      try {
        await config.store.clear();
      } catch (err) {
        config.debug('Could not clear store', err);
      }
    }
    return false;
  }
  return true;
}
async function read(config, req) {
  const {
    uuid,
    ignoreCache
  } = config;
  const entry = await config.store.getItem(uuid);
  if (ignoreCache || !entry || !entry.data) {
    config.debug('cache-miss', req.url);
    const error = new Error();
    error.reason = 'cache-miss';
    error.message = 'Entry not found from cache';
    throw error;
  }
  const {
    expires,
    data
  } = entry;

  // Do not check for stale cache if offline on client-side
  const offline = typeof navigator !== 'undefined' && 'onLine' in navigator && !navigator.onLine;
  if (!offline && !config.acceptStale && expires !== 0 && expires < Date.now()) {
    config.debug('cache-stale', req.url);
    const error = new Error();
    error.reason = 'cache-stale';
    error.message = 'Entry is stale';
    throw error;
  }
  config.debug(config.acceptStale ? 'cache-hit-stale' : 'cache-hit', req.url);
  return data;
}
function key(config) {
  if (Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(config.key)) return config.key;
  let cacheKey;
  if (Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["isString"])(config.key)) {
    cacheKey = req => {
      const url = `${req.baseURL ? req.baseURL : ''}${req.url}`;
      const key = `${config.key}/${url}${serializeQuery(req)}`;
      return req.data ? key + md5__WEBPACK_IMPORTED_MODULE_1___default()(req.data) : key;
    };
  } else {
    cacheKey = req => {
      const url = `${req.baseURL ? req.baseURL : ''}${req.url}`;
      const key = url + serializeQuery(req);
      return req.data ? key + md5__WEBPACK_IMPORTED_MODULE_1___default()(req.data) : key;
    };
  }
  return cacheKey;
}
async function defaultInvalidate(config, req) {
  const method = req.method.toLowerCase();
  if (config.exclude.methods.includes(method)) {
    await config.store.removeItem(config.uuid);
  }
}
function invalidate(config = {}) {
  if (Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["isFunction"])(config.invalidate)) return config.invalidate;
  return defaultInvalidate;
}
function serializeQuery(req) {
  if (!req.params) return '';

  // Probably server-side, just stringify the object
  if (typeof URLSearchParams === 'undefined') return JSON.stringify(req.params);
  let params = req.params;
  const isInstanceOfURLSearchParams = req.params instanceof URLSearchParams;

  // Convert to an instance of URLSearchParams so it get serialized the same way
  if (!isInstanceOfURLSearchParams) {
    params = new URLSearchParams();
    Object.keys(req.params).forEach(key => params.append(key, req.params[key]));
  }
  return `?${params.toString()}`;
}

/* harmony default export */ __webpack_exports__["default"] = ({
  read,
  write,
  key,
  invalidate,
  serializeQuery
});

/***/ }),

/***/ "./src/config.js":
/*!***********************!*\
  !*** ./src/config.js ***!
  \***********************/
/*! exports provided: defaults, makeConfig, mergeRequestConfig, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaults", function() { return defaults; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "makeConfig", function() { return makeConfig; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mergeRequestConfig", function() { return mergeRequestConfig; });
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "axios");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _memory__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./memory */ "./src/memory.js");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cache */ "./src/cache.js");



const noop = () => {};
const debug = (...args) => console.log('[axios-cache-adapter]', ...args);
const defaults = {
  // Default settings when solely creating the cache adapter with setupCache.
  cache: {
    maxAge: 0,
    limit: false,
    store: null,
    key: null,
    invalidate: null,
    exclude: {
      paths: [],
      query: true,
      filter: null,
      methods: ['post', 'patch', 'put', 'delete']
    },
    adapter: typeof axios__WEBPACK_IMPORTED_MODULE_0___default.a.getAdapter === 'function' ? axios__WEBPACK_IMPORTED_MODULE_0___default.a.getAdapter(axios__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.adapter) : axios__WEBPACK_IMPORTED_MODULE_0___default.a.defaults.adapter,
    clearOnStale: true,
    clearOnError: true,
    readOnError: false,
    readHeaders: false,
    debug: false,
    ignoreCache: false
  },
  // Additional defaults when creating the axios instance with the cache adapter.
  axios: {
    cache: {
      maxAge: 15 * 60 * 1000
    }
  }
};

// List of disallowed in the per-request config.
const disallowedPerRequestKeys = ['limit', 'store', 'adapter', 'uuid', 'acceptStale'];

/**
 * Make a global config object.
 *
 * @param {Object} [override={}] Optional config override.
 * @return {Object}
 */
const makeConfig = function (override = {}) {
  const config = {
    ...defaults.cache,
    ...override,
    exclude: {
      ...defaults.cache.exclude,
      ...override.exclude
    }
  };

  // Create a cache key method
  config.key = Object(_cache__WEBPACK_IMPORTED_MODULE_2__["key"])(config);
  config.invalidate = Object(_cache__WEBPACK_IMPORTED_MODULE_2__["invalidate"])(config);
  // If debug mode is on, create a simple logger method
  if (config.debug !== false) {
    config.debug = typeof config.debug === 'function' ? config.debug : debug;
  } else {
    config.debug = noop;
  }

  // Create an in memory store if none was given
  if (!config.store) config.store = new _memory__WEBPACK_IMPORTED_MODULE_1__["default"]();
  config.debug('Global cache config', config);
  return config;
};

/**
 * Merge the per-request config in another config.
 *
 * This method exists because not all keys should be allowed as it
 * may lead to unexpected behaviours. For instance, setting another
 * store or adapter per request is wrong, instead another instance
 * axios, or the adapter, should be used.
 *
 * @param {Object} config Config object.
 * @param {Object} req    The current axios request
 * @return {Object}
 */
const mergeRequestConfig = function (config, req) {
  const requestConfig = req.cache || {};
  if (requestConfig) {
    disallowedPerRequestKeys.forEach(key => requestConfig[key] ? delete requestConfig[key] : undefined);
  }
  const mergedConfig = {
    ...config,
    ...requestConfig,
    exclude: {
      ...config.exclude,
      ...requestConfig.exclude
    }
  };
  if (mergedConfig.debug === true) {
    mergedConfig.debug = debug;
  }

  // Create a cache key method
  if (requestConfig.key) {
    mergedConfig.key = Object(_cache__WEBPACK_IMPORTED_MODULE_2__["key"])(requestConfig);
  }

  // Generate request UUID
  mergedConfig.uuid = mergedConfig.key(req);
  config.debug(`Request config for ${req.url}`, mergedConfig);
  return mergedConfig;
};

/* harmony default export */ __webpack_exports__["default"] = ({
  defaults,
  makeConfig,
  mergeRequestConfig
});

/***/ }),

/***/ "./src/exclude.js":
/*!************************!*\
  !*** ./src/exclude.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ "./src/utilities.js");

function exclude(config = {}, req) {
  const {
    exclude = {},
    debug
  } = config;
  const method = req.method.toLowerCase();
  if (method === 'head' || exclude.methods.includes(method)) {
    debug(`Excluding request by HTTP method ${req.url}`);
    return true;
  }
  if (typeof exclude.filter === 'function' && exclude.filter(req)) {
    debug(`Excluding request by filter ${req.url}`);
    return true;
  }

  // do not cache request with query
  const hasQueryParams = /\?.*$/.test(req.url) || Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["isObject"])(req.params) && Object.keys(req.params).length !== 0 || typeof URLSearchParams !== 'undefined' && req.params instanceof URLSearchParams;
  if (exclude.query && hasQueryParams) {
    debug(`Excluding request by query ${req.url}`);
    return true;
  }
  const paths = exclude.paths || [];
  const found = paths.some(regexp => req.url.match(regexp));
  if (found) {
    debug(`Excluding request by url match ${req.url}`);
    return true;
  }
  return false;
}
/* harmony default export */ __webpack_exports__["default"] = (exclude);

/***/ }),

/***/ "./src/index.node.js":
/*!***************************!*\
  !*** ./src/index.node.js ***!
  \***************************/
/*! exports provided: setup, setupCache, serializeQuery, RedisStore, RedisDefaultStore, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./api */ "./src/api.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setup", function() { return _api__WEBPACK_IMPORTED_MODULE_0__["setup"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "setupCache", function() { return _api__WEBPACK_IMPORTED_MODULE_0__["setupCache"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "serializeQuery", function() { return _api__WEBPACK_IMPORTED_MODULE_0__["serializeQuery"]; });

/* harmony import */ var _redis__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./redis */ "./src/redis.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RedisStore", function() { return _redis__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _redis_default__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./redis-default */ "./src/redis-default.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "RedisDefaultStore", function() { return _redis_default__WEBPACK_IMPORTED_MODULE_2__["default"]; });





/* harmony default export */ __webpack_exports__["default"] = ({
  setup: _api__WEBPACK_IMPORTED_MODULE_0__["setup"],
  setupCache: _api__WEBPACK_IMPORTED_MODULE_0__["setupCache"],
  serializeQuery: _api__WEBPACK_IMPORTED_MODULE_0__["serializeQuery"],
  RedisStore: _redis__WEBPACK_IMPORTED_MODULE_1__["default"],
  RedisDefaultStore: _redis_default__WEBPACK_IMPORTED_MODULE_2__["default"]
});

/***/ }),

/***/ "./src/limit.js":
/*!**********************!*\
  !*** ./src/limit.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
async function limit(config) {
  const length = await config.store.length();
  if (length < config.limit) return;
  config.debug(`Current store size: ${length}`);
  let firstItem;
  await config.store.iterate((value, key) => {
    if (!firstItem) firstItem = {
      value,
      key
    };
    if (value.expires < firstItem.value.expires) firstItem = {
      value,
      key
    };
  });
  if (firstItem) {
    config.debug(`Removing item: ${firstItem.key}`);
    await config.store.removeItem(firstItem.key);
  }
}
/* harmony default export */ __webpack_exports__["default"] = (limit);

/***/ }),

/***/ "./src/memory.js":
/*!***********************!*\
  !*** ./src/memory.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utilities */ "./src/utilities.js");

class MemoryStore {
  constructor() {
    this.store = {};
  }
  async getItem(key) {
    const item = this.store[key] || null;
    return JSON.parse(item);
  }
  async setItem(key, value) {
    this.store[key] = JSON.stringify(value);
    return value;
  }
  async removeItem(key) {
    delete this.store[key];
  }
  async clear() {
    this.store = {};
  }
  async length() {
    return Object.keys(this.store).length;
  }
  iterate(fn) {
    return Promise.all(Object(_utilities__WEBPACK_IMPORTED_MODULE_0__["mapObject"])(this.store, fn));
  }
}
/* harmony default export */ __webpack_exports__["default"] = (MemoryStore);

/***/ }),

/***/ "./src/redis-default.js":
/*!******************************!*\
  !*** ./src/redis-default.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! util */ "util");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_0__);

class RedisDefaultStore {
  constructor(client, options = {}) {
    const invalidClientError = new TypeError('First parameter must be a valid RedisClient instance.');
    try {
      if (client.constructor.name !== 'RedisClient') {
        throw invalidClientError;
      }
    } catch (err) {
      throw invalidClientError;
    }
    this.client = client;
    this.prefix = options.prefix || 'axios-cache';
    this.maxScanCount = options.maxScanCount || 1000;
    this.getAsync = Object(util__WEBPACK_IMPORTED_MODULE_0__["promisify"])(client.get).bind(client);
    this.psetexAsync = Object(util__WEBPACK_IMPORTED_MODULE_0__["promisify"])(client.psetex).bind(client);
    this.delAsync = Object(util__WEBPACK_IMPORTED_MODULE_0__["promisify"])(client.del).bind(client);
    this.scanAsync = Object(util__WEBPACK_IMPORTED_MODULE_0__["promisify"])(client.scan).bind(client);
  }
  calculateTTL(value) {
    const now = Date.now();
    if (value.expires && value.expires > now) {
      return value.expires - now;
    }

    // If there is no expires in value or the provided expire is before the current time

    return -1;
  }
  transformKey(key) {
    return this.prefix + '_' + key;
  }
  async getItem(key) {
    const item = (await this.getAsync(this.transformKey(key))) || null;
    return JSON.parse(item);
  }
  async setItem(key, value) {
    const computedKey = this.transformKey(key);
    const ttl = this.calculateTTL(value);
    if (ttl > 0) {
      await this.psetexAsync(computedKey, ttl, JSON.stringify(value));
    }
    return value;
  }
  async removeItem(key) {
    await this.delAsync(this.transformKey(key));
  }
  async scan(operation) {
    let cursor = '0';
    do {
      const reply = await this.scanAsync(cursor, 'MATCH', this.transformKey('*'), 'COUNT', this.maxScanCount);
      cursor = reply[0];
      await operation(reply[1]);
    } while (cursor !== '0');
  }
  async clear() {
    await this.scan(keys => this.delAsync(keys));
  }
  async length() {
    let length = 0;
    await this.scan(keys => {
      length += keys.length;
    });
    return length;
  }
  async iterate(fn) {
    async function runFunction(key) {
      const item = (await this.getAsync(key)) || null;
      const value = JSON.parse(item);
      return await fn(value, key);
    }
    await this.scan(keys => Promise.all(keys.map(runFunction.bind(this))));
    return Promise.resolve([]);
  }
}
/* harmony default export */ __webpack_exports__["default"] = (RedisDefaultStore);

/***/ }),

/***/ "./src/redis.js":
/*!**********************!*\
  !*** ./src/redis.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! util */ "util");
/* harmony import */ var util__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(util__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities */ "./src/utilities.js");


class RedisStore {
  constructor(client, HASH_KEY = 'axios-cache') {
    const invalidClientError = new TypeError('First parameter must be a valid RedisClient instance.');
    try {
      if (client.constructor.name !== 'RedisClient') {
        throw invalidClientError;
      }
    } catch (err) {
      throw invalidClientError;
    }
    this.client = client;
    this.HASH_KEY = HASH_KEY;
    this.hgetAsync = Object(util__WEBPACK_IMPORTED_MODULE_0__["promisify"])(client.hget).bind(client);
    this.hsetAsync = Object(util__WEBPACK_IMPORTED_MODULE_0__["promisify"])(client.hset).bind(client);
    this.hdelAsync = Object(util__WEBPACK_IMPORTED_MODULE_0__["promisify"])(client.hdel).bind(client);
    this.delAsync = Object(util__WEBPACK_IMPORTED_MODULE_0__["promisify"])(client.del).bind(client);
    this.hlenAsync = Object(util__WEBPACK_IMPORTED_MODULE_0__["promisify"])(client.hlen).bind(client);
    this.hgetallAsync = Object(util__WEBPACK_IMPORTED_MODULE_0__["promisify"])(client.hgetall).bind(client);
  }
  async getItem(key) {
    const item = (await this.hgetAsync(this.HASH_KEY, key)) || null;
    return JSON.parse(item);
  }
  async setItem(key, value) {
    await this.hsetAsync(this.HASH_KEY, key, JSON.stringify(value));
    return value;
  }
  async removeItem(key) {
    await this.hdelAsync(this.HASH_KEY, key);
  }
  async clear() {
    await this.delAsync(this.HASH_KEY);
  }
  async length() {
    return this.hlenAsync(this.HASH_KEY);
  }
  async iterate(fn) {
    const hashData = await this.hgetallAsync(this.HASH_KEY);
    return Promise.all(Object(_utilities__WEBPACK_IMPORTED_MODULE_1__["mapObject"])(hashData, fn));
  }
}
/* harmony default export */ __webpack_exports__["default"] = (RedisStore);

/***/ }),

/***/ "./src/request.js":
/*!************************!*\
  !*** ./src/request.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./response */ "./src/response.js");
/* harmony import */ var _exclude__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./exclude */ "./src/exclude.js");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cache */ "./src/cache.js");



async function request(config, req) {
  config.debug('uuid', config.uuid);
  const next = (...args) => Object(_response__WEBPACK_IMPORTED_MODULE_0__["default"])(config, req, ...args);

  // run invalidate function to check if any cache items need to be invalidated.
  await config.invalidate(config, req);
  if (Object(_exclude__WEBPACK_IMPORTED_MODULE_1__["default"])(config, req)) {
    return excludeFromCache();
  }
  try {
    const res = await Object(_cache__WEBPACK_IMPORTED_MODULE_2__["read"])(config, req);
    res.config = req;
    res.request = {
      fromCache: true
    };
    return {
      config,
      next: res
    };
  } catch (err) {
    // clean up cache if stale
    if (config.clearOnStale && err.reason === 'cache-stale') {
      await config.store.removeItem(config.uuid);
    }
    return {
      config,
      next
    };
  }

  // Helpers

  function excludeFromCache() {
    config.excludeFromCache = true;
    return {
      config,
      next
    };
  }
}
/* harmony default export */ __webpack_exports__["default"] = (request);

/***/ }),

/***/ "./src/response.js":
/*!*************************!*\
  !*** ./src/response.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _limit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./limit */ "./src/limit.js");
/* harmony import */ var _cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cache */ "./src/cache.js");
/* harmony import */ var cache_control_esm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cache-control-esm */ "./node_modules/cache-control-esm/index.js");



async function response(config, req, res) {
  const {
    request = {},
    headers = {}
  } = res;

  // exclude binary response from cache
  if (['arraybuffer', 'blob'].indexOf(request.responseType) > -1) {
    return res;
  }
  let cacheControl = {};

  // Should we try to determine request cache expiration from headers or not
  if (config.readHeaders) {
    if (headers['cache-control']) {
      // Try parsing `cache-control` header from response
      cacheControl = Object(cache_control_esm__WEBPACK_IMPORTED_MODULE_2__["parse"])(headers['cache-control']);

      // Force cache exlcusion for `cache-control: no-cache` and `cache-control: no-store`
      if (cacheControl.noCache || cacheControl.noStore) {
        config.excludeFromCache = true;
      }
    } else if (headers.expires) {
      // Else try reading `expires` header
      config.expires = new Date(headers.expires).getTime();
    } else {
      config.expires = new Date().getTime();
    }
  }
  if (!config.excludeFromCache) {
    if (cacheControl.maxAge || cacheControl.maxAge === 0) {
      // Use `cache-control` header `max-age` value and convert to milliseconds
      config.expires = Date.now() + cacheControl.maxAge * 1000;
    } else if (!config.readHeaders) {
      // Use fixed `maxAge` defined in the global or per-request config
      config.expires = config.maxAge === 0 ? Date.now() : Date.now() + config.maxAge;
    }

    // Check if a cache limit has been configured
    if (config.limit) {
      config.debug(`Detected limit: ${config.limit}`);
      await Object(_limit__WEBPACK_IMPORTED_MODULE_0__["default"])(config);
    }

    // Write response to cache
    await Object(_cache__WEBPACK_IMPORTED_MODULE_1__["write"])(config, req, res);
  } else {
    // Mark request as excluded from cache
    res.request.excludedFromCache = true;
  }
  return res;
}
/* harmony default export */ __webpack_exports__["default"] = (response);

/***/ }),

/***/ "./src/serialize.js":
/*!**************************!*\
  !*** ./src/serialize.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function serialize(config, req, res) {
  if (res.data) {
    // FIXME: May be useless as localForage and axios already parse automatically
    try {
      res.data = JSON.parse(res.data);
    } catch (err) {
      config.debug('Could not parse data as JSON', err);
    }
  }
  const {
    request,
    config: _,
    ...serialized
  } = res;
  return serialized;
}
/* harmony default export */ __webpack_exports__["default"] = (serialize);

/***/ }),

/***/ "./src/utilities.js":
/*!**************************!*\
  !*** ./src/utilities.js ***!
  \**************************/
/*! exports provided: isObject, getTag, isFunction, isString, mapObject */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isObject", function() { return isObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTag", function() { return getTag; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isFunction", function() { return isFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isString", function() { return isString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapObject", function() { return mapObject; });
// https://github.com/lodash/lodash/blob/master/isObject.js
function isObject(value) {
  const type = typeof value;
  return value != null && (type === 'object' || type === 'function');
}

// https://github.com/lodash/lodash/blob/master/.internal/getTag.js
function getTag(value) {
  if (value === null) {
    return value === undefined ? '[object Undefined]' : '[object Null]';
  }
  return Object.prototype.toString.call(value);
}

// https://github.com/lodash/lodash/blob/master/isFunction.js
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  const tag = getTag(value);
  return tag === '[object Function]' || tag === '[object AsyncFunction]' || tag === '[object GeneratorFunction]' || tag === '[object Proxy]';
}

// https://github.com/lodash/lodash/blob/master/isString.js
function isString(value) {
  const type = typeof value;
  return type === 'string' || type === 'object' && value != null && !Array.isArray(value) && getTag(value) === '[object String]';
}
function mapObject(value, fn) {
  if (!isObject(value)) {
    return [];
  }
  return Object.keys(value).map(key => fn(value[key], key));
}

/***/ }),

/***/ "axios":
/*!*************************************************************************************!*\
  !*** external {"umd":"axios","amd":"axios","commonjs":"axios","commonjs2":"axios"} ***!
  \*************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_axios__;

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ })

/******/ });
});
//# sourceMappingURL=cache.node.js.map