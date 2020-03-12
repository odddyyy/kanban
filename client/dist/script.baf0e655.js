// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/script.js":[function(require,module,exports) {
var dev_url = 'http://localhost:3000';
var heroku_url = 'https://protected-crag-71554.herokuapp.com';
new Vue({
  el: '#app',
  data: {
    contoh: [],
    backlog: null,
    onProcess: null,
    onReviewed: null,
    completed: null,
    isLogin: false,
    email_login: "",
    pass_login: "",
    name_reg: "",
    email_reg: "",
    pass_reg: "",
    err: false,
    error_msg: "",
    isAdd: false,
    add_desc: "",
    add_title: ""
  },
  created: function created() {
    this.doLog();
    this.getData();
  },
  methods: {
    getData: function getData() {
      var _this = this;

      // console.log(`masuk get data`)
      axios({
        method: 'GET',
        url: "".concat(heroku_url, "/tasks"),
        headers: {
          access_token: localStorage.access_token
        }
      }).then(function (data) {
        _this.contoh = data.data;

        _this.filter();
      }).catch(function (err) {
        console.log(err);
      });
    },
    filter: function filter() {
      this.contoh.sort(function (a, b) {
        return a.id - b.id;
      });
      this.backlog = this.contoh.filter(function (i) {
        return i.status == "Backlog";
      });
      this.onProcess = this.contoh.filter(function (i) {
        return i.status == "On Process";
      });
      this.onReviewed = this.contoh.filter(function (i) {
        return i.status == "On Reviewed";
      });
      this.completed = this.contoh.filter(function (i) {
        return i.status == "Completed";
      });
    },
    doLog: function doLog() {
      if (localStorage.access_token) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    postLogin: function postLogin() {
      var _this2 = this;

      axios.post("".concat(heroku_url, "/users/login"), {
        email: this.email_login,
        password: this.pass_login
      }).then(function (data) {
        var token = data.data.access_token;
        localStorage.setItem('access_token', token);

        _this2.getData();

        _this2.doLog();
      }).catch(function (err) {
        console.log(err.response.data);
        _this2.err = true;
        _this2.error_msg = err.response.data;
      });
    },
    logout: function logout() {
      localStorage.removeItem('access_token');
      this.empty();
      this.doLog();
    },
    empty: function empty() {
      this.contoh = [];
      this.backlog = [];
      this.onProcess = [];
      this.onReviewed = [];
      this.completed = [];
      this.email_login = "";
      this.pass_login = "";
      this.error_msg = "";
      this.add_title = "";
      this.add_desc = "";
    },
    register: function register() {
      var _this3 = this;

      axios.post("".concat(heroku_url, "/users/register"), {
        name: this.name_reg,
        email: this.email_reg,
        password: this.pass_reg
      }).then(function (data) {
        var token = data.data.access_token;
        localStorage.setItem('access_token', token);

        _this3.doLog();

        _this3.getData();
      }).catch(function (err) {});
    },
    addForm: function addForm() {
      this.isAdd = true;
    },
    addNewTask: function addNewTask() {
      var _this4 = this;

      axios({
        method: 'POST',
        url: "".concat(heroku_url, "/tasks/add"),
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          title: this.add_title,
          description: this.add_desc
        }
      }).then(function (data) {
        _this4.isAdd = false;

        _this4.getData();
      }).catch(function (err) {
        console.log(err);
      });
    },
    deleteTask: function deleteTask(id) {
      var _this5 = this;

      axios({
        method: 'DELETE',
        url: "".concat(heroku_url, "/tasks/delete/").concat(id),
        headers: {
          access_token: localStorage.access_token
        }
      }).then(function (data) {
        _this5.getData();
      }).catch(function (err) {
        console.log(err);
      });
    },
    changeStatsNext: function changeStatsNext(id, status) {
      var _this6 = this;

      var changed = "";

      if (status == "Backlog") {
        changed = "On Process";
      } else if (status == "On Process") {
        changed = "On Reviewed";
      } else if (status == "On Reviewed") {
        changed = "Completed";
      }

      axios({
        method: 'PUT',
        url: "".concat(heroku_url, "/tasks/edit/").concat(id),
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          status: changed
        }
      }).then(function (data) {
        _this6.getData();
      }).catch(function (err) {
        console.log(err);
      });
    },
    changeStatsBack: function changeStatsBack(id, status) {
      var _this7 = this;

      var back = "";

      if (status == "Completed") {
        back = "On Reviewed";
      } else if (status == "On Reviewed") {
        back = "On Process";
      } else if (status == "On Process") {
        back = "Backlog";
      }

      axios({
        method: 'PUT',
        url: "".concat(heroku_url, "/tasks/edit/").concat(id),
        headers: {
          access_token: localStorage.access_token
        },
        data: {
          status: back
        }
      }).then(function (data) {
        _this7.getData();
      }).catch(function (err) {
        console.log(err);
      });
    }
  }
});
},{}],"../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56134" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/script.js"], null)
//# sourceMappingURL=/script.baf0e655.js.map