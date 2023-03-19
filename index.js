"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthWidget = void 0;
var _react = _interopRequireWildcard(require("react"));
var _awsAmplify = require("aws-amplify");
var _formik = require("formik");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var AuthWidget = /*#__PURE__*/function (_Component) {
  _inherits(AuthWidget, _Component);
  var _super = _createSuper(AuthWidget);
  function AuthWidget(props) {
    var _this;
    _classCallCheck(this, AuthWidget);
    _this = _super.call(this, props);
    _awsAmplify.Amplify.configure({
      Auth: {
        region: _this.props.region,
        userPoolId: _this.props.userPoolId,
        userPoolWebClientId: _this.props.userPoolWebClientId,
        mandatorySignIn: true
      }
    });
    _this.state = {
      isSignedIn: false,
      state: "home",
      username: "",
      email: "",
      errorMessage: undefined
    };
    _awsAmplify.Hub.listen("auth", function (_ref) {
      var payload = _ref.payload;
      var event = payload.event;
      if (event === "autoSignIn") {
        console.log("auto signed in", payload.data);
        _this.state.username = payload.data.username;
        _this.state.email = payload.data.attributes.email;
        _this.state.isSignedIn = true;
        _this.state.state = "signedIn";
        _this.setState(_this.state);
        if (_this.props.signInCallback !== undefined) {
          _this.props.signInCallback(_this.state.username);
        }
      } else if (event === "autoSignIn_failure") {
        alert("Auto Sign in Failure");
      } else if (payload.event === "signIn") {
        console.log("signed in", payload.data);
        _this.state.username = payload.data.username;
        _this.state.email = payload.data.attributes.email;
        _this.state.isSignedIn = true;
        _this.state.state = "signedIn";
        _this.setState(_this.state);
        if (_this.props.signInCallback !== undefined) {
          _this.props.signInCallback(_this.state.username);
        }
      } else if (payload.event === "signOut") {
        console.log("signed out", payload.data);
        _this.state.username = payload.data.username;
        _this.state.email = "";
        _this.state.isSignedIn = false;
        _this.state.state = "home";
        _this.setState(_this.state);
        if (_this.props.signOutCallback !== undefined) {
          _this.props.signOutCallback();
        }
      }
    });
    _awsAmplify.Auth.currentAuthenticatedUser().then(function (data) {
      console.log("Auto Sign In", data);
      _this.state.username = data.username;
      _this.state.email = data.attributes.email;
      _this.state.isSignedIn = true;
      _this.state.state = "signedIn";
      _this.setState(_this.state);
      if (_this.props.signInCallback !== undefined) {
        _this.props.signInCallback(_this.state.username);
      }
    })["catch"](function () {
      _this.state.isSignedIn = false;
      _this.state.state = "home";
      _this.setState(_this.state);
    });
    return _this;
  }
  _createClass(AuthWidget, [{
    key: "signUp",
    value: function () {
      var _signUp = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(email, password) {
        var _yield$Auth$signUp, user;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _awsAmplify.Auth.signUp({
                username: email,
                password: password,
                attributes: {
                  email: email
                },
                autoSignIn: {
                  enabled: true
                }
              });
            case 3:
              _yield$Auth$signUp = _context.sent;
              user = _yield$Auth$signUp.user;
              this.state.state = "confirm";
              this.state.username = user.username;
              this.setState(this.state);
              _context.next = 13;
              break;
            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              console.log("error signing up:", _context.t0);
            case 13:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[0, 10]]);
      }));
      function signUp(_x, _x2) {
        return _signUp.apply(this, arguments);
      }
      return signUp;
    }()
  }, {
    key: "resendConfirmationCode",
    value: function () {
      var _resendConfirmationCode = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _awsAmplify.Auth.resendSignUp(this.state.username);
            case 3:
              console.log("code resent successfully");
              _context2.next = 9;
              break;
            case 6:
              _context2.prev = 6;
              _context2.t0 = _context2["catch"](0);
              console.log("error resending code: ", _context2.t0);
            case 9:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[0, 6]]);
      }));
      function resendConfirmationCode() {
        return _resendConfirmationCode.apply(this, arguments);
      }
      return resendConfirmationCode;
    }()
  }, {
    key: "confirmSignUp",
    value: function () {
      var _confirmSignUp = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(code) {
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _awsAmplify.Auth.confirmSignUp(this.state.username, code);
            case 3:
              _context3.next = 8;
              break;
            case 5:
              _context3.prev = 5;
              _context3.t0 = _context3["catch"](0);
              console.log("error confirming sign up", _context3.t0);
            case 8:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this, [[0, 5]]);
      }));
      function confirmSignUp(_x3) {
        return _confirmSignUp.apply(this, arguments);
      }
      return confirmSignUp;
    }()
  }, {
    key: "signIn",
    value: function () {
      var _signIn = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4(username, password) {
        var user;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return _awsAmplify.Auth.signIn(username, password);
            case 3:
              user = _context4.sent;
              this.state.username = user.username;
              this.state.isSignedIn = true;
              this.state.errorMessage = undefined;
              this.setState(this.state);
              _context4.next = 15;
              break;
            case 10:
              _context4.prev = 10;
              _context4.t0 = _context4["catch"](0);
              console.log("error signing in", _context4.t0.message);
              this.state.errorMessage = _context4.t0.message;
              this.setState(this.state);
            case 15:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this, [[0, 10]]);
      }));
      function signIn(_x4, _x5) {
        return _signIn.apply(this, arguments);
      }
      return signIn;
    }()
  }, {
    key: "signOut",
    value: function () {
      var _signOut = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _awsAmplify.Auth.signOut();
            case 3:
              _context5.next = 8;
              break;
            case 5:
              _context5.prev = 5;
              _context5.t0 = _context5["catch"](0);
              console.log("error signing out: ", _context5.t0);
            case 8:
            case "end":
              return _context5.stop();
          }
        }, _callee5, null, [[0, 5]]);
      }));
      function signOut() {
        return _signOut.apply(this, arguments);
      }
      return signOut;
    }()
  }, {
    key: "onSignInClicked",
    value: function onSignInClicked() {
      this.state.state = "signIn";
      this.setState(this.state);
    }
  }, {
    key: "onSignUpClicked",
    value: function onSignUpClicked() {
      this.state.state = "signUp";
      this.setState(this.state);
    }
  }, {
    key: "onForgotPasswordClicked",
    value: function onForgotPasswordClicked() {
      this.state.state = "forgotPassword";
      this.setState(this.state);
    }
  }, {
    key: "sendForForgotPasswordCode",
    value: function sendForForgotPasswordCode(username) {
      var _this2 = this;
      _awsAmplify.Auth.forgotPassword(username).then(function (data) {
        console.log("sent forgot pass code", data);
        _this2.state.username = username;
        _this2.state.state = "submitForgotPasswordCode";
        _this2.setState(_this2.state);
      })["catch"](function (err) {
        return console.log(err);
      });
    }
  }, {
    key: "sendForgotPasswordCode",
    value: function sendForgotPasswordCode(verificationCode, newPassword) {
      var _this3 = this;
      _awsAmplify.Auth.forgotPasswordSubmit(this.state.username, verificationCode, newPassword).then(function (data) {
        console.log("New password", data);
        if (data === "SUCCESS") {
          _this3.state.state = "signIn";
          _this3.setState(_this3.state);
        }
      })["catch"](function (err) {
        return console.log(err);
      });
    }
  }, {
    key: "onSignOutClicked",
    value: function () {
      var _onSignOutClicked = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee6() {
        return _regeneratorRuntime().wrap(function _callee6$(_context6) {
          while (1) switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.signOut();
            case 2:
            case "end":
              return _context6.stop();
          }
        }, _callee6, this);
      }));
      function onSignOutClicked() {
        return _onSignOutClicked.apply(this, arguments);
      }
      return onSignOutClicked;
    }()
  }, {
    key: "getErrorMessageWidget",
    value: function getErrorMessageWidget() {
      if (this.state.errorMessage === undefined) {
        return null;
      }
      return /*#__PURE__*/_react["default"].createElement("div", null, this.state.errorMessage);
    }
  }, {
    key: "getConfirmWidget",
    value: function getConfirmWidget() {
      var _this4 = this;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: this.props.style
      }, /*#__PURE__*/_react["default"].createElement("h1", null, "Confirm Email"), /*#__PURE__*/_react["default"].createElement(_formik.Formik, {
        initialValues: {
          verificationCode: ""
        },
        validate: function validate(values) {
          var errors = {};
          if (values.verificationCode.length === 0) {
            errors.verificationCode = "Required";
          }
          return errors;
        },
        onSubmit: function onSubmit(values, _ref2) {
          var setSubmitting = _ref2.setSubmitting;
          setTimeout( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
            return _regeneratorRuntime().wrap(function _callee7$(_context7) {
              while (1) switch (_context7.prev = _context7.next) {
                case 0:
                  _context7.next = 2;
                  return _this4.confirmSignUp(values.verificationCode);
                case 2:
                  setSubmitting(false);
                case 3:
                case "end":
                  return _context7.stop();
              }
            }, _callee7);
          })), 1);
        }
      }, function (_ref4) {
        var isSubmitting = _ref4.isSubmitting;
        return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_formik.Form, null, /*#__PURE__*/_react["default"].createElement("label", {
          htmlFor: "verificationCode"
        }, "Code: "), /*#__PURE__*/_react["default"].createElement(_formik.Field, {
          name: "verificationCode"
        }), /*#__PURE__*/_react["default"].createElement(_formik.ErrorMessage, {
          name: "verificationCode",
          component: "div"
        }), /*#__PURE__*/_react["default"].createElement("button", {
          type: "submit",
          disabled: isSubmitting
        }, "Submit")), /*#__PURE__*/_react["default"].createElement("button", {
          onClick: function onClick() {
            return _this4.resendConfirmationCode();
          }
        }, "Resend Confirmation Code"));
      }));
    }
  }, {
    key: "getSignUpWidget",
    value: function getSignUpWidget() {
      var _this5 = this;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: this.props.style
      }, /*#__PURE__*/_react["default"].createElement(_formik.Formik, {
        initialValues: {
          email: "",
          password: ""
        },
        validate: function validate(values) {
          var errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
          }
          if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length < 8) {
            errors.password = "Password needs to be at least 8 charactesr";
          }
          return errors;
        },
        onSubmit: /*#__PURE__*/function () {
          var _ref6 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee8(values, _ref5) {
            var setSubmitting;
            return _regeneratorRuntime().wrap(function _callee8$(_context8) {
              while (1) switch (_context8.prev = _context8.next) {
                case 0:
                  setSubmitting = _ref5.setSubmitting;
                  _context8.next = 3;
                  return _this5.signUp(values.email, values.password);
                case 3:
                  setSubmitting(false);
                case 4:
                case "end":
                  return _context8.stop();
              }
            }, _callee8);
          }));
          return function (_x6, _x7) {
            return _ref6.apply(this, arguments);
          };
        }()
      }, function (_ref7) {
        var isSubmitting = _ref7.isSubmitting;
        return /*#__PURE__*/_react["default"].createElement(_formik.Form, null, /*#__PURE__*/_react["default"].createElement("label", {
          htmlFor: "email"
        }, "Email: "), /*#__PURE__*/_react["default"].createElement(_formik.Field, {
          type: "email",
          name: "email"
        }), /*#__PURE__*/_react["default"].createElement(_formik.ErrorMessage, {
          name: "email",
          component: "div"
        }), /*#__PURE__*/_react["default"].createElement("label", {
          htmlFor: "password"
        }, "Password: "), /*#__PURE__*/_react["default"].createElement(_formik.Field, {
          type: "password",
          name: "password"
        }), /*#__PURE__*/_react["default"].createElement(_formik.ErrorMessage, {
          name: "password",
          component: "div"
        }), /*#__PURE__*/_react["default"].createElement("button", {
          type: "submit",
          disabled: isSubmitting
        }, "Submit"));
      }), /*#__PURE__*/_react["default"].createElement("button", {
        onClick: function onClick() {
          return _this5.onSignInClicked();
        }
      }, "Already have an Account?"));
    }
  }, {
    key: "getHomeWidget",
    value: function getHomeWidget() {
      var _this6 = this;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: this.props.style
      }, /*#__PURE__*/_react["default"].createElement("button", {
        onClick: function onClick() {
          return _this6.onSignInClicked();
        }
      }, "Sign In"), /*#__PURE__*/_react["default"].createElement("button", {
        onClick: function onClick() {
          return _this6.onSignUpClicked();
        }
      }, "Create Account"));
    }
  }, {
    key: "getSignInWidget",
    value: function getSignInWidget() {
      var _this7 = this;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: this.props.style
      }, /*#__PURE__*/_react["default"].createElement(_formik.Formik, {
        initialValues: {
          email: "",
          password: ""
        },
        validate: function validate(values) {
          var errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
          }
          return errors;
        },
        onSubmit: /*#__PURE__*/function () {
          var _ref9 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee9(values, _ref8) {
            var setSubmitting;
            return _regeneratorRuntime().wrap(function _callee9$(_context9) {
              while (1) switch (_context9.prev = _context9.next) {
                case 0:
                  setSubmitting = _ref8.setSubmitting;
                  _context9.next = 3;
                  return _this7.signIn(values.email, values.password);
                case 3:
                  setSubmitting(false);
                case 4:
                case "end":
                  return _context9.stop();
              }
            }, _callee9);
          }));
          return function (_x8, _x9) {
            return _ref9.apply(this, arguments);
          };
        }()
      }, function (_ref10) {
        var isSubmitting = _ref10.isSubmitting;
        return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_formik.Form, null, /*#__PURE__*/_react["default"].createElement("label", {
          htmlFor: "email"
        }, "Email: "), /*#__PURE__*/_react["default"].createElement(_formik.Field, {
          type: "email",
          name: "email"
        }), /*#__PURE__*/_react["default"].createElement(_formik.ErrorMessage, {
          name: "email",
          component: "div"
        }), /*#__PURE__*/_react["default"].createElement("label", {
          htmlFor: "password"
        }, "Password: "), /*#__PURE__*/_react["default"].createElement(_formik.Field, {
          type: "password",
          name: "password"
        }), /*#__PURE__*/_react["default"].createElement(_formik.ErrorMessage, {
          name: "password",
          component: "div"
        }), /*#__PURE__*/_react["default"].createElement("button", {
          type: "submit",
          disabled: isSubmitting
        }, "Sign In")), /*#__PURE__*/_react["default"].createElement("button", {
          onClick: function onClick() {
            return _this7.onForgotPasswordClicked();
          }
        }, "Forgot Password?"));
      }), this.getErrorMessageWidget());
    }
  }, {
    key: "getForgotPasswordWidget",
    value: function getForgotPasswordWidget() {
      var _this8 = this;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: this.props.style
      }, /*#__PURE__*/_react["default"].createElement(_formik.Formik, {
        initialValues: {
          email: ""
        },
        validate: function validate(values) {
          var errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = "Invalid email address";
          }
          return errors;
        },
        onSubmit: function onSubmit(values, _ref11) {
          var setSubmitting = _ref11.setSubmitting;
          _this8.sendForForgotPasswordCode(values.email);
          setSubmitting(false);
        }
      }, function (_ref12) {
        var isSubmitting = _ref12.isSubmitting;
        return /*#__PURE__*/_react["default"].createElement(_formik.Form, null, /*#__PURE__*/_react["default"].createElement("label", {
          htmlFor: "email"
        }, "Email: "), /*#__PURE__*/_react["default"].createElement(_formik.Field, {
          type: "email",
          name: "email"
        }), /*#__PURE__*/_react["default"].createElement(_formik.ErrorMessage, {
          name: "email",
          component: "div"
        }), /*#__PURE__*/_react["default"].createElement("button", {
          type: "submit",
          disabled: isSubmitting
        }, "Submit"));
      }));
    }
  }, {
    key: "getSubmitForgotPasswordCodeWidget",
    value: function getSubmitForgotPasswordCodeWidget() {
      var _this9 = this;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: this.props.style
      }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("h1", null, "Confirm Code"), /*#__PURE__*/_react["default"].createElement(_formik.Formik, {
        initialValues: {
          verificationCode: ""
        },
        validate: function validate(values) {
          var errors = {};
          if (values.verificationCode.length === 0) {
            errors.verificationCode = "Required";
          }
          if (!values.password) {
            errors.password = "Required";
          } else if (values.password.length < 8) {
            errors.password = "Password needs to be at least 8 charactesr";
          }
          return errors;
        },
        onSubmit: function onSubmit(values, _ref13) {
          var setSubmitting = _ref13.setSubmitting;
          _this9.sendForgotPasswordCode(values.verificationCode, values.password);
          setSubmitting(false);
        }
      }, function (_ref14) {
        var isSubmitting = _ref14.isSubmitting;
        return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_formik.Form, null, /*#__PURE__*/_react["default"].createElement("label", {
          htmlFor: "verificationCode"
        }, "Code: "), /*#__PURE__*/_react["default"].createElement(_formik.Field, {
          name: "verificationCode"
        }), /*#__PURE__*/_react["default"].createElement(_formik.ErrorMessage, {
          name: "verificationCode",
          component: "div"
        }), /*#__PURE__*/_react["default"].createElement("label", {
          htmlFor: "password"
        }, "New Password: "), /*#__PURE__*/_react["default"].createElement(_formik.Field, {
          type: "password",
          name: "password"
        }), /*#__PURE__*/_react["default"].createElement(_formik.ErrorMessage, {
          name: "password",
          component: "div"
        }), /*#__PURE__*/_react["default"].createElement("button", {
          type: "submit",
          disabled: isSubmitting
        }, "Submit")));
      })));
    }
  }, {
    key: "getSignOutWidget",
    value: function getSignOutWidget() {
      var _this10 = this;
      return /*#__PURE__*/_react["default"].createElement("div", {
        style: this.props.style
      }, this.state.email, /*#__PURE__*/_react["default"].createElement("button", {
        onClick: function onClick() {
          return _this10.onSignOutClicked();
        }
      }, "SignOut"));
    }
  }, {
    key: "render",
    value: function render() {
      if (!this.state.isSignedIn) {
        switch (this.state.state) {
          case "confirm":
            return this.getConfirmWidget();
          case "signUp":
            return this.getSignUpWidget();
          case "home":
            return this.getHomeWidget();
          case "signIn":
            return this.getSignInWidget();
          case "forgotPassword":
            return this.getForgotPasswordWidget();
          case "submitForgotPasswordCode":
            return this.getSubmitForgotPasswordCodeWidget();
        }
      } else {
        return this.getSignOutWidget();
      }
      return /*#__PURE__*/_react["default"].createElement("h1", null, "Error");
    }
  }]);
  return AuthWidget;
}(_react.Component);
exports.AuthWidget = AuthWidget;
