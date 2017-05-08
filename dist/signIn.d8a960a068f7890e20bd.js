webpackJsonp([2],{

/***/ 164:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _comHeader = __webpack_require__(34);

var _comHeader2 = _interopRequireDefault(_comHeader);

var _comFooter = __webpack_require__(33);

var _comFooter2 = _interopRequireDefault(_comFooter);

var _index = __webpack_require__(345);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'App',
  data: function data() {
    return {
      bgImg: 'bgImg-1'
    };
  },
  created: function created() {
    this.bgChange();
  },

  methods: {
    bgChange: function bgChange() {
      var _this = this;

      var imgNum = 1;
      setInterval(function () {
        if (imgNum === 10) {
          imgNum = 1;
        } else {
          ++imgNum;
        }
        _this.bgImg = 'bgImg-' + imgNum;
      }, 10000);
    }
  },
  components: {
    comHeader: _comHeader2.default,
    comFooter: _comFooter2.default,
    index: _index2.default
  }
}; //
//
//
//
//
//
//
//

/***/ }),

/***/ 165:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//

exports.default = {
  name: 'index'
};

/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(6);

var _vue2 = _interopRequireDefault(_vue);

var _App = __webpack_require__(66);

var _App2 = _interopRequireDefault(_App);

var _loadScript = __webpack_require__(62);

var _loadScript2 = _interopRequireDefault(_loadScript);

__webpack_require__(18);

__webpack_require__(22);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.config.productionTip = true;

var app = new _vue2.default({
    render: function render(h) {
        return h(_App2.default);
    }
}).$mount('#app');

//下载微信登录代码
(0, _loadScript2.default)('http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js', function () {
    var obj = new WxLogin({
        id: 'wechatLogin',
        appid: 'wx81ca4ef030385fac',
        scope: 'snsapi_login',
        redirect_uri: '/wechat',
        state: Math.random(),
        style: 'black'
    });
});

/***/ }),

/***/ 203:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"App.vue","sourceRoot":""}]);

// exports


/***/ }),

/***/ 214:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.section[data-v-5027fcac] {\n  order: 1;\n  display: flex;\n  flex-direction: column;\n  flex-wrap: nowrap;\n  justify-content: center;\n  align-items: center;\n  background: rgba(255, 255, 255, 0.9);\n}\n.section #wechatLogin[data-v-5027fcac] {\n    color: #f0f0f0;\n}\n", "", {"version":3,"sources":["C:/Users/Administrator/Documents/Liulu-dev/tzucpa/src/signIn/component/index.vue"],"names":[],"mappings":";AAAA;EACE,SAAS;EACT,cAAc;EACd,uBAAuB;EACvB,kBAAkB;EAClB,wBAAwB;EACxB,oBAAoB;EACpB,qCAAqC;CAAE;AACvC;IACE,eAAe;CAAE","file":"index.vue","sourcesContent":[".section {\n  order: 1;\n  display: flex;\n  flex-direction: column;\n  flex-wrap: nowrap;\n  justify-content: center;\n  align-items: center;\n  background: rgba(255, 255, 255, 0.9); }\n  .section #wechatLogin {\n    color: #f0f0f0; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 22:
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 25:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//

exports.default = {
  name: 'comFooter'
};

/***/ }),

/***/ 26:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

exports.default = {
  name: 'comHeader'
};

/***/ }),

/***/ 27:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\nfooter[data-v-032a2e43] {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  padding-top: 20px;\n}\nspan[data-v-032a2e43] {\n  display: inline-block;\n  padding: 0 15px;\n  color: #f0f0f0;\n  line-height: 0.8em;\n}\nfooter span[data-v-032a2e43]:first-child {\n  border-right: 1px solid #f0f0f0;\n}\nfooter span[data-v-032a2e43]:last-child {\n  border-left: 1px solid #f0f0f0;\n}\n", "", {"version":3,"sources":["C:/Users/Administrator/Documents/Liulu-dev/tzucpa/src/component/comFooter.vue"],"names":[],"mappings":";AAAA;EACE,cAAc;EACd,oBAAoB;EACpB,kBAAkB;EAClB,wBAAwB;EACxB,oBAAoB;EACpB,YAAY;EACZ,kBAAkB;CAAE;AAEtB;EACE,sBAAsB;EACtB,gBAAgB;EAChB,eAAe;EACf,mBAAmB;CAAE;AAEvB;EACE,gCAAgC;CAAE;AAEpC;EACE,+BAA+B;CAAE","file":"comFooter.vue","sourcesContent":["footer {\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  padding-top: 20px; }\n\nspan {\n  display: inline-block;\n  padding: 0 15px;\n  color: #f0f0f0;\n  line-height: 0.8em; }\n\nfooter span:first-child {\n  border-right: 1px solid #f0f0f0; }\n\nfooter span:last-child {\n  border-left: 1px solid #f0f0f0; }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 28:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)(true);
// imports


// module
exports.push([module.i, "\n.navbar[data-v-245c9235] {\n  background-color: rgba(255, 255, 255, 0);\n  border-color: rgba(255, 255, 255, 0);\n}\n.navbar .navbar-brand[data-v-245c9235] {\n    padding: 8px 15px;\n}\n.navbar .navbar-brand img[data-v-245c9235] {\n      height: 100%;\n}\n.navbar h4.brand-name[data-v-245c9235] {\n    margin-left: 0;\n    color: rgba(240, 240, 240, 0.9);\n}\n", "", {"version":3,"sources":["C:/Users/Administrator/Documents/Liulu-dev/tzucpa/src/component/comHeader.vue"],"names":[],"mappings":";AAAA;EACE,yCAAyC;EACzC,qCAAqC;CAAE;AACvC;IACE,kBAAkB;CAAE;AACpB;MACE,aAAa;CAAE;AACnB;IACE,eAAe;IACf,gCAAgC;CAAE","file":"comHeader.vue","sourcesContent":[".navbar {\n  background-color: rgba(255, 255, 255, 0);\n  border-color: rgba(255, 255, 255, 0); }\n  .navbar .navbar-brand {\n    padding: 8px 15px; }\n    .navbar .navbar-brand img {\n      height: 100%; }\n  .navbar h4.brand-name {\n    margin-left: 0;\n    color: rgba(240, 240, 240, 0.9); }\n"],"sourceRoot":""}]);

// exports


/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(39)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(25),
  /* template */
  __webpack_require__(37),
  /* scopeId */
  "data-v-032a2e43",
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Administrator\\Documents\\Liulu-dev\\tzucpa\\src\\component\\comFooter.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] comFooter.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-032a2e43", Component.options)
  } else {
    hotAPI.reload("data-v-032a2e43", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(40)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(26),
  /* template */
  __webpack_require__(38),
  /* scopeId */
  "data-v-245c9235",
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Administrator\\Documents\\Liulu-dev\\tzucpa\\src\\component\\comHeader.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] comHeader.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-245c9235", Component.options)
  } else {
    hotAPI.reload("data-v-245c9235", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 345:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(471)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(165),
  /* template */
  __webpack_require__(387),
  /* scopeId */
  "data-v-5027fcac",
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Administrator\\Documents\\Liulu-dev\\tzucpa\\src\\signIn\\component\\index.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] index.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5027fcac", Component.options)
  } else {
    hotAPI.reload("data-v-5027fcac", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('footer', [_c('span', [_vm._v("©2016")]), _vm._v(" "), _c('span', [_vm._v("天津中审联有限责任会计师事务所版权所有")]), _vm._v(" "), _c('span', [_vm._v("津ICP备12000891号-1")])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-032a2e43", module.exports)
  }
}

/***/ }),

/***/ 376:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    class: _vm.bgImg,
    attrs: {
      "id": "app"
    }
  }, [_c('com-header'), _vm._v(" "), _c('index'), _vm._v(" "), _c('com-footer')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-3e1bcceb", module.exports)
  }
}

/***/ }),

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('header', [_c('nav', {
    staticClass: "navbar navbar-default navbar-fixed-top"
  }, [_c('div', {
    staticClass: "container-fluid"
  }, [_c('div', {
    staticClass: "navbar-header"
  }, [_c('a', {
    staticClass: "navbar-brand",
    attrs: {
      "href": "#"
    }
  }, [_c('img', {
    attrs: {
      "alt": "Brand",
      "src": __webpack_require__(32)
    }
  })])]), _vm._v(" "), _c('h4', {
    staticClass: "navbar-text brand-name"
  }, [_vm._v("\n        天津中审联会计师管理系统\n      ")])])])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-245c9235", module.exports)
  }
}

/***/ }),

/***/ 387:
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _vm._m(0)
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('main', [_c('section', {
    staticClass: "section"
  }, [_c('div', {
    attrs: {
      "id": "wechatLogin"
    }
  })])])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-loader/node_modules/vue-hot-reload-api").rerender("data-v-5027fcac", module.exports)
  }
}

/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(27);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("a95cac7a", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/._css-loader@0.27.3@css-loader/index.js?sourceMap!../../node_modules/._vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-032a2e43\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/._sass-loader@6.0.3@sass-loader/lib/loader.js!../../node_modules/._vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./comFooter.vue", function() {
     var newContent = require("!!../../node_modules/._css-loader@0.27.3@css-loader/index.js?sourceMap!../../node_modules/._vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-032a2e43\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/._sass-loader@6.0.3@sass-loader/lib/loader.js!../../node_modules/._vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./comFooter.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(28);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("1173d4ec", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/._css-loader@0.27.3@css-loader/index.js?sourceMap!../../node_modules/._vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-245c9235\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/._sass-loader@6.0.3@sass-loader/lib/loader.js!../../node_modules/._vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./comHeader.vue", function() {
     var newContent = require("!!../../node_modules/._css-loader@0.27.3@css-loader/index.js?sourceMap!../../node_modules/._vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-245c9235\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/._sass-loader@6.0.3@sass-loader/lib/loader.js!../../node_modules/._vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./comHeader.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 460:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(203);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("728a48a2", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../node_modules/._css-loader@0.27.3@css-loader/index.js?sourceMap!../../node_modules/._vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3e1bcceb\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/._sass-loader@6.0.3@sass-loader/lib/loader.js!../../node_modules/._vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./App.vue", function() {
     var newContent = require("!!../../node_modules/._css-loader@0.27.3@css-loader/index.js?sourceMap!../../node_modules/._vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-3e1bcceb\",\"scoped\":true,\"hasInlineConfig\":false}!../../node_modules/._sass-loader@6.0.3@sass-loader/lib/loader.js!../../node_modules/._vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./App.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 471:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(214);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("565c181c", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/._css-loader@0.27.3@css-loader/index.js?sourceMap!../../../node_modules/._vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-5027fcac\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/._sass-loader@6.0.3@sass-loader/lib/loader.js!../../../node_modules/._vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./index.vue", function() {
     var newContent = require("!!../../../node_modules/._css-loader@0.27.3@css-loader/index.js?sourceMap!../../../node_modules/._vue-loader@11.3.4@vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-5027fcac\",\"scoped\":true,\"hasInlineConfig\":false}!../../../node_modules/._sass-loader@6.0.3@sass-loader/lib/loader.js!../../../node_modules/._vue-loader@11.3.4@vue-loader/lib/selector.js?type=styles&index=0!./index.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (urlString, callBack) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = urlString;

    if (callBack) {
        script.addEventListener('load', function (e) {
            callBack();
        }, false);
    }
    document.body.appendChild(script);
};

;

/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(460)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(164),
  /* template */
  __webpack_require__(376),
  /* scopeId */
  "data-v-3e1bcceb",
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Administrator\\Documents\\Liulu-dev\\tzucpa\\src\\signIn\\App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] App.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3e1bcceb", Component.options)
  } else {
    hotAPI.reload("data-v-3e1bcceb", Component.options)
  }
})()}

module.exports = Component.exports


/***/ })

},[170]);
//# sourceMappingURL=signIn.d8a960a068f7890e20bd.js.map