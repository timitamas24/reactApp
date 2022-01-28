require('source-map-support/register');
module.exports =
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/auth/index.js":
/*!***************************!*\
  !*** ./src/auth/index.js ***!
  \***************************/
/*! exports provided: router */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router */ "./src/auth/router.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "router", function() { return _router__WEBPACK_IMPORTED_MODULE_0__["router"]; });



/***/ }),

/***/ "./src/auth/router.js":
/*!****************************!*\
  !*** ./src/auth/router.js ***!
  \****************************/
/*! exports provided: router */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "router", function() { return router; });
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ "./src/auth/store.js");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");




const router = new koa_router__WEBPACK_IMPORTED_MODULE_0___default.a();

const createToken = user => {
  return jsonwebtoken__WEBPACK_IMPORTED_MODULE_2___default.a.sign({
    username: user.username,
    _id: user._id
  }, _utils__WEBPACK_IMPORTED_MODULE_3__["jwtConfig"].secret, {
    expiresIn: 60 * 60 * 60
  });
};

const createUser = async (user, response) => {
  try {
    console.log(user);
    await _store__WEBPACK_IMPORTED_MODULE_1__["default"].insert(user);
    response.body = {
      token: createToken(user)
    };
    response.status = 201;
  } catch (e) {
    response.body = {
      issue: [{
        error: e.message
      }]
    };
    response.status = 400;
  }
};

router.post('/register', async ctx => await createUser(ctx.request.body, ctx.response));
router.post('/login', async ctx => {
  console.log('1');
  const credentials = ctx.request.body;
  console.log('2');
  const response = ctx.response;
  console.log('myUser: ', credentials, '  the user: ');
  const user = await _store__WEBPACK_IMPORTED_MODULE_1__["default"].findOne({
    username: credentials.username
  });
  console.log('myUser: ', credentials, '  the user: ', user);

  if (user && credentials.password === user.password) {
    response.body = {
      token: createToken(user)
    };
    response.status = 201;
  } else {
    response.body = {
      issue: [{
        error: 'Invalid credentials'
      }]
    };
    response.status = 400;
  }
});

/***/ }),

/***/ "./src/auth/store.js":
/*!***************************!*\
  !*** ./src/auth/store.js ***!
  \***************************/
/*! exports provided: UserStore, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UserStore", function() { return UserStore; });
/* harmony import */ var nedb_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nedb-promise */ "nedb-promise");
/* harmony import */ var nedb_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nedb_promise__WEBPACK_IMPORTED_MODULE_0__);

class UserStore {
  constructor({
    filename,
    autoload
  }) {
    this.store = nedb_promise__WEBPACK_IMPORTED_MODULE_0___default()({
      filename,
      autoload
    });
  }

  async findOne(props) {
    return this.store.findOne(props);
  }

  async insert(user) {
    return this.store.insert(user);
  }

}
/* harmony default export */ __webpack_exports__["default"] = (new UserStore({
  filename: './db/users.json',
  autoload: true
}));

/***/ }),

/***/ "./src/contract/index.js":
/*!*******************************!*\
  !*** ./src/contract/index.js ***!
  \*******************************/
/*! exports provided: router */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./router */ "./src/contract/router.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "router", function() { return _router__WEBPACK_IMPORTED_MODULE_0__["router"]; });



/***/ }),

/***/ "./src/contract/router.js":
/*!********************************!*\
  !*** ./src/contract/router.js ***!
  \********************************/
/*! exports provided: router */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "router", function() { return router; });
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./store */ "./src/contract/store.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./src/utils/index.js");



const router = new koa_router__WEBPACK_IMPORTED_MODULE_0___default.a();
router.get('/', async ctx => {
  const response = ctx.response;
  const userId = ctx.state.user._id;
  response.body = await _store__WEBPACK_IMPORTED_MODULE_1__["default"].find({
    userId
  });
  response.status = 200;
});
router.get('/:page', async ctx => {
  const response = ctx.response;
  const userId = ctx.state.user._id;
  const tasks = await _store__WEBPACK_IMPORTED_MODULE_1__["default"].find({
    userId
  });
  response.body = tasks.splice(ctx.params.page * 5, ctx.params.page * 5 + 5);
  response.status = 200;
});
router.get('/:id', async ctx => {
  const userId = ctx.state.user._id;
  const task = await _store__WEBPACK_IMPORTED_MODULE_1__["default"].findOne({
    _id: ctx.params.id
  });
  const response = ctx.response;

  if (task) {
    if (task.userId === userId) {
      response.body = task;
      response.status = 200;
    } else {
      response.status = 403;
    }
  } else {
    response.status = 404;
  }
});

const createContract = async (ctx, contract, response) => {
  try {
    const userId = ctx.state.user._id;
    contract.userId = userId;
    console.log('ma');
    response.body = await _store__WEBPACK_IMPORTED_MODULE_1__["default"].insert(contract);
    console.log('am');
    response.status = 201;
    console.log('created and works');
    Object(_utils__WEBPACK_IMPORTED_MODULE_2__["broadcast"])(userId, {
      type: 'created',
      payload: contract
    });
  } catch (e) {
    response.body = {
      message: e.message
    };
    response.status = 400;
  }
};

router.post('/', async ctx => await createContract(ctx, ctx.request.body, ctx.response));
router.put('/:id', async ctx => {
  const contract = ctx.request.body;
  const id = ctx.params.id;
  const contractId = contract._id;
  const response = ctx.response;

  if (contractId && contractId !== id) {
    response.body = {
      message: 'Parameter id and body _id should be the same'
    };
    response.status = 400;
    return;
  }

  if (!contractId) {
    console.log("test");
    await createTask(ctx, contract, response);
  } else {
    const userId = ctx.state.user._id;
    contract.userId = userId;
    const updatedCount = await _store__WEBPACK_IMPORTED_MODULE_1__["default"].update({
      _id: id
    }, contract);

    if (updatedCount === 1) {
      response.body = contract;
      response.status = 200;
      Object(_utils__WEBPACK_IMPORTED_MODULE_2__["broadcast"])(userId, {
        type: 'updated',
        payload: contract
      });
    } else {
      response.body = {
        message: 'Resource no longer exists'
      };
      response.status = 405;
    }
  }
});
router.del('/:id', async ctx => {
  const userId = ctx.state.user._id;
  const contract = await _store__WEBPACK_IMPORTED_MODULE_1__["default"].findOne({
    _id: ctx.params.id
  });

  if (contract && userId !== contract.userId) {
    ctx.response.status = 403;
  } else {
    await _store__WEBPACK_IMPORTED_MODULE_1__["default"].remove({
      _id: ctx.params.id
    });
    ctx.response.status = 204;
  }
});

/***/ }),

/***/ "./src/contract/store.js":
/*!*******************************!*\
  !*** ./src/contract/store.js ***!
  \*******************************/
/*! exports provided: ContractStore, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ContractStore", function() { return ContractStore; });
/* harmony import */ var nedb_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nedb-promise */ "nedb-promise");
/* harmony import */ var nedb_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nedb_promise__WEBPACK_IMPORTED_MODULE_0__);

class ContractStore {
  constructor({
    filename,
    autoload
  }) {
    this.store = nedb_promise__WEBPACK_IMPORTED_MODULE_0___default()({
      filename,
      autoload
    });
  }

  async find(props) {
    return this.store.find(props);
  }

  async findOne(props) {
    return this.store.findOne(props);
  }

  async insert(contract) {
    if (!contract.team) {
      throw new Error('Missing contract team');
    }

    if (!contract.salary) {
      throw new Error('Missing contract salary');
    }

    if (!contract.dateFrom) {
      throw new Error('Missing contract start date');
    }

    if (!contract.dateTo) {
      throw new Error('Missing contract stop date');
    }

    console.log('store.insert passed');
    return this.store.insert(contract);
  }

  async update(props, task) {
    console.log(props, task);
    return this.store.update(props, task);
  }

  async remove(props) {
    return this.store.remove(props);
  }

}
/* harmony default export */ __webpack_exports__["default"] = (new ContractStore({
  filename: './db/contracts.json',
  autoload: true
}));

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! koa */ "koa");
/* harmony import */ var koa__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(koa__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ws */ "ws");
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ws__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! koa-router */ "koa-router");
/* harmony import */ var koa_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(koa_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var koa_bodyparser__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! koa-bodyparser */ "koa-bodyparser");
/* harmony import */ var koa_bodyparser__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(koa_bodyparser__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils */ "./src/utils/index.js");
/* harmony import */ var _contract__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./contract */ "./src/contract/index.js");
/* harmony import */ var _auth__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./auth */ "./src/auth/index.js");
/* harmony import */ var koa_jwt__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! koa-jwt */ "koa-jwt");
/* harmony import */ var koa_jwt__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(koa_jwt__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _koa_cors__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @koa/cors */ "@koa/cors");
/* harmony import */ var _koa_cors__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_koa_cors__WEBPACK_IMPORTED_MODULE_9__);










const app = new koa__WEBPACK_IMPORTED_MODULE_0___default.a();
const server = http__WEBPACK_IMPORTED_MODULE_2___default.a.createServer(app.callback());
const wss = new ws__WEBPACK_IMPORTED_MODULE_1___default.a.Server({
  server
});
Object(_utils__WEBPACK_IMPORTED_MODULE_5__["initWss"])(wss);
app.use(_koa_cors__WEBPACK_IMPORTED_MODULE_9___default()());
app.use(_utils__WEBPACK_IMPORTED_MODULE_5__["timingLogger"]);
app.use(_utils__WEBPACK_IMPORTED_MODULE_5__["exceptionHandler"]);
app.use(koa_bodyparser__WEBPACK_IMPORTED_MODULE_4___default()());
const prefix = '/api';
const publicApiRouter = new koa_router__WEBPACK_IMPORTED_MODULE_3___default.a({
  prefix
});
publicApiRouter.use('/auth', _auth__WEBPACK_IMPORTED_MODULE_7__["router"].routes());
app.use(publicApiRouter.routes()).use(publicApiRouter.allowedMethods());
app.use(koa_jwt__WEBPACK_IMPORTED_MODULE_8___default()(_utils__WEBPACK_IMPORTED_MODULE_5__["jwtConfig"]));
const protectedApiRouter = new koa_router__WEBPACK_IMPORTED_MODULE_3___default.a({
  prefix
});
protectedApiRouter.use('/item', _contract__WEBPACK_IMPORTED_MODULE_6__["router"].routes());
app.use(protectedApiRouter.routes()).use(protectedApiRouter.allowedMethods());
server.listen(8080);
console.log('Server started on port 8080');

/***/ }),

/***/ "./src/utils/constants.js":
/*!********************************!*\
  !*** ./src/utils/constants.js ***!
  \********************************/
/*! exports provided: jwtConfig */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jwtConfig", function() { return jwtConfig; });
const jwtConfig = {
  secret: 'my-secret'
};

/***/ }),

/***/ "./src/utils/index.js":
/*!****************************!*\
  !*** ./src/utils/index.js ***!
  \****************************/
/*! exports provided: jwtConfig, exceptionHandler, timingLogger, initWss, broadcast */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ "./src/utils/constants.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "jwtConfig", function() { return _constants__WEBPACK_IMPORTED_MODULE_0__["jwtConfig"]; });

/* harmony import */ var _middlewares__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./middlewares */ "./src/utils/middlewares.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "exceptionHandler", function() { return _middlewares__WEBPACK_IMPORTED_MODULE_1__["exceptionHandler"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "timingLogger", function() { return _middlewares__WEBPACK_IMPORTED_MODULE_1__["timingLogger"]; });

/* harmony import */ var _wss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./wss */ "./src/utils/wss.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "initWss", function() { return _wss__WEBPACK_IMPORTED_MODULE_2__["initWss"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "broadcast", function() { return _wss__WEBPACK_IMPORTED_MODULE_2__["broadcast"]; });





/***/ }),

/***/ "./src/utils/middlewares.js":
/*!**********************************!*\
  !*** ./src/utils/middlewares.js ***!
  \**********************************/
/*! exports provided: exceptionHandler, timingLogger */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "exceptionHandler", function() { return exceptionHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "timingLogger", function() { return timingLogger; });
const exceptionHandler = async (ctx, next) => {
  try {
    return await next();
  } catch (err) {
    ctx.body = {
      message: err.message || 'Unexpected error.'
    };
    ctx.status = err.status || 500;
  }
};
const timingLogger = async (ctx, next) => {
  const start = Date.now();
  await next();
  console.log(`${ctx.method} ${ctx.url} => ${ctx.response.status}, ${Date.now() - start}ms`);
};

/***/ }),

/***/ "./src/utils/wss.js":
/*!**************************!*\
  !*** ./src/utils/wss.js ***!
  \**************************/
/*! exports provided: initWss, broadcast */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initWss", function() { return initWss; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "broadcast", function() { return broadcast; });
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ws */ "ws");
/* harmony import */ var ws__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ws__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constants */ "./src/utils/constants.js");



let wss;
const initWss = value => {
  wss = value;
  wss.on('connection', ws => {
    ws.on('message', message => {
      const {
        type,
        payload: {
          token
        }
      } = JSON.parse(message);

      if (type !== 'authorization') {
        ws.close();
        return;
      }

      try {
        ws.user = jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default.a.verify(token, _constants__WEBPACK_IMPORTED_MODULE_2__["jwtConfig"].secret);
      } catch (err) {
        ws.close();
      }
    });
  });
};
const broadcast = (userId, data) => {
  if (!wss) {
    return;
  }

  wss.clients.forEach(client => {
    if (client.readyState === ws__WEBPACK_IMPORTED_MODULE_0___default.a.OPEN && userId === client.user._id) {
      console.log(`broadcast sent to ${client.user.username}`);
      client.send(JSON.stringify(data));
    }
  });
};

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./src/index.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Faculta5\MA\ma-ionic-2\tasksServer\src/index.js */"./src/index.js");


/***/ }),

/***/ "@koa/cors":
/*!****************************!*\
  !*** external "@koa/cors" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@koa/cors");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "koa":
/*!**********************!*\
  !*** external "koa" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),

/***/ "koa-bodyparser":
/*!*********************************!*\
  !*** external "koa-bodyparser" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-bodyparser");

/***/ }),

/***/ "koa-jwt":
/*!**************************!*\
  !*** external "koa-jwt" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-jwt");

/***/ }),

/***/ "koa-router":
/*!*****************************!*\
  !*** external "koa-router" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),

/***/ "nedb-promise":
/*!*******************************!*\
  !*** external "nedb-promise" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("nedb-promise");

/***/ }),

/***/ "ws":
/*!*********************!*\
  !*** external "ws" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("ws");

/***/ })

/******/ });
//# sourceMappingURL=main.map