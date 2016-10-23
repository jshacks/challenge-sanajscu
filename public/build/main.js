webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueRouter = __webpack_require__(2);

	var _vueRouter2 = _interopRequireDefault(_vueRouter);

	var _vueResource = __webpack_require__(3);

	var _vueResource2 = _interopRequireDefault(_vueResource);

	var _App = __webpack_require__(4);

	var _App2 = _interopRequireDefault(_App);

	var _About = __webpack_require__(83);

	var _About2 = _interopRequireDefault(_About);

	var _Achizitii = __webpack_require__(85);

	var _Achizitii2 = _interopRequireDefault(_Achizitii);

	var _Header = __webpack_require__(87);

	var _Header2 = _interopRequireDefault(_Header);

	var _Sidebar = __webpack_require__(90);

	var _Sidebar2 = _interopRequireDefault(_Sidebar);

	var _MainContent = __webpack_require__(93);

	var _MainContent2 = _interopRequireDefault(_MainContent);

	var _Footer = __webpack_require__(96);

	var _Footer2 = _interopRequireDefault(_Footer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Styles
	__webpack_require__(99);
	// Le Imports 

	// Config 
	_vue2.default.use(_vueRouter2.default);
	_vue2.default.use(_vueResource2.default);

	_vue2.default.http.interceptors.push(function (request, next) {
	  request.headers.set('X-CSRF-TOKEN', JsHacks.token_);

	  next();
	});

	/**
	 * Next, we will create a fresh Vue application instance and attach it to
	 * the body of the page. From here, you may begin adding components to
	 * the application, or feel free to tweak this setup for your needs.
	 */


	var routes = [{ path: '/', component: _App2.default }, { path: '/about', component: _About2.default }, { path: '/achizitii', component: _Achizitii2.default }];

	var router = new _vueRouter2.default({
	  routes: routes // short for routes: routes
	});

	new _vue2.default({
	  el: '#app',
	  router: router,
	  components: {
	    mainHeader: _Header2.default,
	    mainSidebar: _Sidebar2.default,
	    mainContent: _MainContent2.default,
	    mainFooter: _Footer2.default
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Vue.js v2.0.3
	 * (c) 2014-2016 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  (global.Vue = factory());
	}(this, (function () { 'use strict';

	/*  */

	/**
	 * Convert a value to a string that is actually rendered.
	 */
	function _toString (val) {
	  return val == null
	    ? ''
	    : typeof val === 'object'
	      ? JSON.stringify(val, null, 2)
	      : String(val)
	}

	/**
	 * Convert a input value to a number for persistence.
	 * If the conversion fails, return original string.
	 */
	function toNumber (val) {
	  var n = parseFloat(val, 10);
	  return (n || n === 0) ? n : val
	}

	/**
	 * Make a map and return a function for checking if a key
	 * is in that map.
	 */
	function makeMap (
	  str,
	  expectsLowerCase
	) {
	  var map = Object.create(null);
	  var list = str.split(',');
	  for (var i = 0; i < list.length; i++) {
	    map[list[i]] = true;
	  }
	  return expectsLowerCase
	    ? function (val) { return map[val.toLowerCase()]; }
	    : function (val) { return map[val]; }
	}

	/**
	 * Check if a tag is a built-in tag.
	 */
	var isBuiltInTag = makeMap('slot,component', true);

	/**
	 * Remove an item from an array
	 */
	function remove$1 (arr, item) {
	  if (arr.length) {
	    var index = arr.indexOf(item);
	    if (index > -1) {
	      return arr.splice(index, 1)
	    }
	  }
	}

	/**
	 * Check whether the object has the property.
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn (obj, key) {
	  return hasOwnProperty.call(obj, key)
	}

	/**
	 * Check if value is primitive
	 */
	function isPrimitive (value) {
	  return typeof value === 'string' || typeof value === 'number'
	}

	/**
	 * Create a cached version of a pure function.
	 */
	function cached (fn) {
	  var cache = Object.create(null);
	  return function cachedFn (str) {
	    var hit = cache[str];
	    return hit || (cache[str] = fn(str))
	  }
	}

	/**
	 * Camelize a hyphen-delmited string.
	 */
	var camelizeRE = /-(\w)/g;
	var camelize = cached(function (str) {
	  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
	});

	/**
	 * Capitalize a string.
	 */
	var capitalize = cached(function (str) {
	  return str.charAt(0).toUpperCase() + str.slice(1)
	});

	/**
	 * Hyphenate a camelCase string.
	 */
	var hyphenateRE = /([^-])([A-Z])/g;
	var hyphenate = cached(function (str) {
	  return str
	    .replace(hyphenateRE, '$1-$2')
	    .replace(hyphenateRE, '$1-$2')
	    .toLowerCase()
	});

	/**
	 * Simple bind, faster than native
	 */
	function bind$1 (fn, ctx) {
	  function boundFn (a) {
	    var l = arguments.length;
	    return l
	      ? l > 1
	        ? fn.apply(ctx, arguments)
	        : fn.call(ctx, a)
	      : fn.call(ctx)
	  }
	  // record original fn length
	  boundFn._length = fn.length;
	  return boundFn
	}

	/**
	 * Convert an Array-like object to a real Array.
	 */
	function toArray (list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret
	}

	/**
	 * Mix properties into target object.
	 */
	function extend (to, _from) {
	  for (var key in _from) {
	    to[key] = _from[key];
	  }
	  return to
	}

	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 */
	function isObject (obj) {
	  return obj !== null && typeof obj === 'object'
	}

	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 */
	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';
	function isPlainObject (obj) {
	  return toString.call(obj) === OBJECT_STRING
	}

	/**
	 * Merge an Array of Objects into a single Object.
	 */
	function toObject (arr) {
	  var res = {};
	  for (var i = 0; i < arr.length; i++) {
	    if (arr[i]) {
	      extend(res, arr[i]);
	    }
	  }
	  return res
	}

	/**
	 * Perform no operation.
	 */
	function noop () {}

	/**
	 * Always return false.
	 */
	var no = function () { return false; };

	/**
	 * Generate a static keys string from compiler modules.
	 */
	function genStaticKeys (modules) {
	  return modules.reduce(function (keys, m) {
	    return keys.concat(m.staticKeys || [])
	  }, []).join(',')
	}

	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 */
	function looseEqual (a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (
	    isObject(a) && isObject(b)
	      ? JSON.stringify(a) === JSON.stringify(b)
	      : false
	  )
	  /* eslint-enable eqeqeq */
	}

	function looseIndexOf (arr, val) {
	  for (var i = 0; i < arr.length; i++) {
	    if (looseEqual(arr[i], val)) { return i }
	  }
	  return -1
	}

	/*  */

	var config = {
	  /**
	   * Option merge strategies (used in core/util/options)
	   */
	  optionMergeStrategies: Object.create(null),

	  /**
	   * Whether to suppress warnings.
	   */
	  silent: false,

	  /**
	   * Whether to enable devtools
	   */
	  devtools: "development" !== 'production',

	  /**
	   * Error handler for watcher errors
	   */
	  errorHandler: null,

	  /**
	   * Ignore certain custom elements
	   */
	  ignoredElements: null,

	  /**
	   * Custom user key aliases for v-on
	   */
	  keyCodes: Object.create(null),

	  /**
	   * Check if a tag is reserved so that it cannot be registered as a
	   * component. This is platform-dependent and may be overwritten.
	   */
	  isReservedTag: no,

	  /**
	   * Check if a tag is an unknown element.
	   * Platform-dependent.
	   */
	  isUnknownElement: no,

	  /**
	   * Get the namespace of an element
	   */
	  getTagNamespace: noop,

	  /**
	   * Check if an attribute must be bound using property, e.g. value
	   * Platform-dependent.
	   */
	  mustUseProp: no,

	  /**
	   * List of asset types that a component can own.
	   */
	  _assetTypes: [
	    'component',
	    'directive',
	    'filter'
	  ],

	  /**
	   * List of lifecycle hooks.
	   */
	  _lifecycleHooks: [
	    'beforeCreate',
	    'created',
	    'beforeMount',
	    'mounted',
	    'beforeUpdate',
	    'updated',
	    'beforeDestroy',
	    'destroyed',
	    'activated',
	    'deactivated'
	  ],

	  /**
	   * Max circular updates allowed in a scheduler flush cycle.
	   */
	  _maxUpdateCount: 100,

	  /**
	   * Server rendering?
	   */
	  _isServer: "client" === 'server'
	};

	/*  */

	/**
	 * Check if a string starts with $ or _
	 */
	function isReserved (str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F
	}

	/**
	 * Define a property.
	 */
	function def (obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}

	/**
	 * Parse simple path.
	 */
	var bailRE = /[^\w\.\$]/;
	function parsePath (path) {
	  if (bailRE.test(path)) {
	    return
	  } else {
	    var segments = path.split('.');
	    return function (obj) {
	      for (var i = 0; i < segments.length; i++) {
	        if (!obj) { return }
	        obj = obj[segments[i]];
	      }
	      return obj
	    }
	  }
	}

	/*  */
	/* globals MutationObserver */

	// can we use __proto__?
	var hasProto = '__proto__' in {};

	// Browser environment sniffing
	var inBrowser =
	  typeof window !== 'undefined' &&
	  Object.prototype.toString.call(window) !== '[object Object]';

	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && /msie|trident/.test(UA);
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isEdge = UA && UA.indexOf('edge/') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

	/* istanbul ignore next */
	function isNative (Ctor) {
	  return /native code/.test(Ctor.toString())
	}

	/**
	 * Defer a task to execute it asynchronously.
	 */
	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;

	  function nextTickHandler () {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks.length = 0;
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }

	  // the nextTick behavior leverages the microtask queue, which can be accessed
	  // via either native Promise.then or MutationObserver.
	  // MutationObserver has wider support, however it is seriously bugged in
	  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
	  // completely stops working after triggering a few times... so, if native
	  // Promise is available, we will use it:
	  /* istanbul ignore if */
	  if (typeof Promise !== 'undefined' && isNative(Promise)) {
	    var p = Promise.resolve();
	    timerFunc = function () {
	      p.then(nextTickHandler);
	      // in problematic UIWebViews, Promise.then doesn't completely break, but
	      // it can get stuck in a weird state where callbacks are pushed into the
	      // microtask queue but the queue isn't being flushed, until the browser
	      // needs to do some other work, e.g. handle a timer. Therefore we can
	      // "force" the microtask queue to be flushed by adding an empty timer.
	      if (isIOS) { setTimeout(noop); }
	    };
	  } else if (typeof MutationObserver !== 'undefined' && (
	    isNative(MutationObserver) ||
	    // PhantomJS and iOS 7.x
	    MutationObserver.toString() === '[object MutationObserverConstructor]'
	  )) {
	    // use MutationObserver where native Promise is not available,
	    // e.g. PhantomJS IE11, iOS7, Android 4.4
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(String(counter));
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = String(counter);
	    };
	  } else {
	    // fallback to setTimeout
	    /* istanbul ignore next */
	    timerFunc = function () {
	      setTimeout(nextTickHandler, 0);
	    };
	  }

	  return function queueNextTick (cb, ctx) {
	    var func = ctx
	      ? function () { cb.call(ctx); }
	      : cb;
	    callbacks.push(func);
	    if (!pending) {
	      pending = true;
	      timerFunc();
	    }
	  }
	})();

	var _Set;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && isNative(Set)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = (function () {
	    function Set () {
	      this.set = Object.create(null);
	    }
	    Set.prototype.has = function has (key) {
	      return this.set[key] !== undefined
	    };
	    Set.prototype.add = function add (key) {
	      this.set[key] = 1;
	    };
	    Set.prototype.clear = function clear () {
	      this.set = Object.create(null);
	    };

	    return Set;
	  }());
	}

	/* not type checking this file because flow doesn't play well with Proxy */

	var hasProxy;
	var proxyHandlers;
	var initProxy;

	{
	  var allowedGlobals = makeMap(
	    'Infinity,undefined,NaN,isFinite,isNaN,' +
	    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
	    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
	    'require' // for Webpack/Browserify
	  );

	  hasProxy =
	    typeof Proxy !== 'undefined' &&
	    Proxy.toString().match(/native code/);

	  proxyHandlers = {
	    has: function has (target, key) {
	      var has = key in target;
	      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
	      if (!has && !isAllowed) {
	        warn(
	          "Property or method \"" + key + "\" is not defined on the instance but " +
	          "referenced during render. Make sure to declare reactive data " +
	          "properties in the data option.",
	          target
	        );
	      }
	      return has || !isAllowed
	    }
	  };

	  initProxy = function initProxy (vm) {
	    if (hasProxy) {
	      vm._renderProxy = new Proxy(vm, proxyHandlers);
	    } else {
	      vm._renderProxy = vm;
	    }
	  };
	}

	/*  */


	var uid$2 = 0;

	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 */
	var Dep = function Dep () {
	  this.id = uid$2++;
	  this.subs = [];
	};

	Dep.prototype.addSub = function addSub (sub) {
	  this.subs.push(sub);
	};

	Dep.prototype.removeSub = function removeSub (sub) {
	  remove$1(this.subs, sub);
	};

	Dep.prototype.depend = function depend () {
	  if (Dep.target) {
	    Dep.target.addDep(this);
	  }
	};

	Dep.prototype.notify = function notify () {
	  // stablize the subscriber list first
	  var subs = this.subs.slice();
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};

	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	var targetStack = [];

	function pushTarget (_target) {
	  if (Dep.target) { targetStack.push(Dep.target); }
	  Dep.target = _target;
	}

	function popTarget () {
	  Dep.target = targetStack.pop();
	}

	/*  */


	var queue = [];
	var has$1 = {};
	var circular = {};
	var waiting = false;
	var flushing = false;
	var index = 0;

	/**
	 * Reset the scheduler's state.
	 */
	function resetSchedulerState () {
	  queue.length = 0;
	  has$1 = {};
	  {
	    circular = {};
	  }
	  waiting = flushing = false;
	}

	/**
	 * Flush both queues and run the watchers.
	 */
	function flushSchedulerQueue () {
	  flushing = true;

	  // Sort queue before flush.
	  // This ensures that:
	  // 1. Components are updated from parent to child. (because parent is always
	  //    created before the child)
	  // 2. A component's user watchers are run before its render watcher (because
	  //    user watchers are created before the render watcher)
	  // 3. If a component is destroyed during a parent component's watcher run,
	  //    its watchers can be skipped.
	  queue.sort(function (a, b) { return a.id - b.id; });

	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (index = 0; index < queue.length; index++) {
	    var watcher = queue[index];
	    var id = watcher.id;
	    has$1[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if ("development" !== 'production' && has$1[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        warn(
	          'You may have an infinite update loop ' + (
	            watcher.user
	              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
	              : "in a component render function."
	          ),
	          watcher.vm
	        );
	        break
	      }
	    }
	  }

	  // devtool hook
	  /* istanbul ignore if */
	  if (devtools && config.devtools) {
	    devtools.emit('flush');
	  }

	  resetSchedulerState();
	}

	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 */
	function queueWatcher (watcher) {
	  var id = watcher.id;
	  if (has$1[id] == null) {
	    has$1[id] = true;
	    if (!flushing) {
	      queue.push(watcher);
	    } else {
	      // if already flushing, splice the watcher based on its id
	      // if already past its id, it will be run next immediately.
	      var i = queue.length - 1;
	      while (i >= 0 && queue[i].id > watcher.id) {
	        i--;
	      }
	      queue.splice(Math.max(i, index) + 1, 0, watcher);
	    }
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushSchedulerQueue);
	    }
	  }
	}

	/*  */

	var uid$1 = 0;

	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 */
	var Watcher = function Watcher (
	  vm,
	  expOrFn,
	  cb,
	  options
	) {
	  if ( options === void 0 ) options = {};

	  this.vm = vm;
	  vm._watchers.push(this);
	  // options
	  this.deep = !!options.deep;
	  this.user = !!options.user;
	  this.lazy = !!options.lazy;
	  this.sync = !!options.sync;
	  this.expression = expOrFn.toString();
	  this.cb = cb;
	  this.id = ++uid$1; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  // parse expression for getter
	  if (typeof expOrFn === 'function') {
	    this.getter = expOrFn;
	  } else {
	    this.getter = parsePath(expOrFn);
	    if (!this.getter) {
	      this.getter = function () {};
	      "development" !== 'production' && warn(
	        "Failed watching path: \"" + expOrFn + "\" " +
	        'Watcher only accepts simple dot-delimited paths. ' +
	        'For full control, use a function instead.',
	        vm
	      );
	    }
	  }
	  this.value = this.lazy
	    ? undefined
	    : this.get();
	};

	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	Watcher.prototype.get = function get () {
	  pushTarget(this);
	  var value = this.getter.call(this.vm, this.vm);
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  popTarget();
	  this.cleanupDeps();
	  return value
	};

	/**
	 * Add a dependency to this directive.
	 */
	Watcher.prototype.addDep = function addDep (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};

	/**
	 * Clean up for dependency collection.
	 */
	Watcher.prototype.cleanupDeps = function cleanupDeps () {
	    var this$1 = this;

	  var i = this.deps.length;
	  while (i--) {
	    var dep = this$1.deps[i];
	    if (!this$1.newDepIds.has(dep.id)) {
	      dep.removeSub(this$1);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};

	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 */
	Watcher.prototype.update = function update () {
	  /* istanbul ignore else */
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync) {
	    this.run();
	  } else {
	    queueWatcher(this);
	  }
	};

	/**
	 * Scheduler job interface.
	 * Will be called by the scheduler.
	 */
	Watcher.prototype.run = function run () {
	  if (this.active) {
	    var value = this.get();
	      if (
	        value !== this.value ||
	      // Deep watchers and watchers on Object/Arrays should fire even
	      // when the value is the same, because the value may
	      // have mutated.
	      isObject(value) ||
	      this.deep
	    ) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      if (this.user) {
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          "development" !== 'production' && warn(
	            ("Error in watcher \"" + (this.expression) + "\""),
	            this.vm
	          );
	          /* istanbul ignore else */
	          if (config.errorHandler) {
	            config.errorHandler.call(null, e, this.vm);
	          } else {
	            throw e
	          }
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	  }
	};

	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	Watcher.prototype.evaluate = function evaluate () {
	  this.value = this.get();
	  this.dirty = false;
	};

	/**
	 * Depend on all deps collected by this watcher.
	 */
	Watcher.prototype.depend = function depend () {
	    var this$1 = this;

	  var i = this.deps.length;
	  while (i--) {
	    this$1.deps[i].depend();
	  }
	};

	/**
	 * Remove self from all dependencies' subcriber list.
	 */
	Watcher.prototype.teardown = function teardown () {
	    var this$1 = this;

	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed or is performing a v-for
	    // re-render (the watcher list is then filtered by v-for).
	    if (!this.vm._isBeingDestroyed && !this.vm._vForRemoving) {
	      remove$1(this.vm._watchers, this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this$1.deps[i].removeSub(this$1);
	    }
	    this.active = false;
	  }
	};

	/**
	 * Recursively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 */
	var seenObjects = new _Set();
	function traverse (val, seen) {
	  var i, keys;
	  if (!seen) {
	    seen = seenObjects;
	    seen.clear();
	  }
	  var isA = Array.isArray(val);
	  var isO = isObject(val);
	  if ((isA || isO) && Object.isExtensible(val)) {
	    if (val.__ob__) {
	      var depId = val.__ob__.dep.id;
	      if (seen.has(depId)) {
	        return
	      } else {
	        seen.add(depId);
	      }
	    }
	    if (isA) {
	      i = val.length;
	      while (i--) { traverse(val[i], seen); }
	    } else if (isO) {
	      keys = Object.keys(val);
	      i = keys.length;
	      while (i--) { traverse(val[keys[i]], seen); }
	    }
	  }
	}

	/*
	 * not type checking this file because flow doesn't play well with
	 * dynamically accessing methods on Array prototype
	 */

	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto);[
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	]
	.forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator () {
	    var arguments$1 = arguments;

	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments$1[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break
	      case 'unshift':
	        inserted = args;
	        break
	      case 'splice':
	        inserted = args.slice(2);
	        break
	    }
	    if (inserted) { ob.observeArray(inserted); }
	    // notify change
	    ob.dep.notify();
	    return result
	  });
	});

	/*  */

	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However when passing down props,
	 * we don't want to force conversion because the value may be a nested value
	 * under a frozen data structure. Converting it would defeat the optimization.
	 */
	var observerState = {
	  shouldConvert: true,
	  isSettingProps: false
	};

	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 */
	var Observer = function Observer (value) {
	  this.value = value;
	  this.dep = new Dep();
	  this.vmCount = 0;
	  def(value, '__ob__', this);
	  if (Array.isArray(value)) {
	    var augment = hasProto
	      ? protoAugment
	      : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	};

	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 */
	Observer.prototype.walk = function walk (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0; i < keys.length; i++) {
	    defineReactive$$1(obj, keys[i], obj[keys[i]]);
	  }
	};

	/**
	 * Observe a list of Array items.
	 */
	Observer.prototype.observeArray = function observeArray (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};

	// helpers

	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 */
	function protoAugment (target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}

	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * istanbul ignore next
	 */
	function copyAugment (target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}

	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 */
	function observe (value) {
	  if (!isObject(value)) {
	    return
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (
	    observerState.shouldConvert &&
	    !config._isServer &&
	    (Array.isArray(value) || isPlainObject(value)) &&
	    Object.isExtensible(value) &&
	    !value._isVue
	  ) {
	    ob = new Observer(value);
	  }
	  return ob
	}

	/**
	 * Define a reactive property on an Object.
	 */
	function defineReactive$$1 (
	  obj,
	  key,
	  val,
	  customSetter
	) {
	  var dep = new Dep();

	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return
	  }

	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;

	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter () {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (Array.isArray(value)) {
	          dependArray(value);
	        }
	      }
	      return value
	    },
	    set: function reactiveSetter (newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return
	      }
	      if ("development" !== 'production' && customSetter) {
	        customSetter();
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}

	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 */
	function set (obj, key, val) {
	  if (Array.isArray(obj)) {
	    obj.splice(key, 1, val);
	    return val
	  }
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return
	  }
	  var ob = obj.__ob__;
	  if (obj._isVue || (ob && ob.vmCount)) {
	    "development" !== 'production' && warn(
	      'Avoid adding reactive properties to a Vue instance or its root $data ' +
	      'at runtime - declare it upfront in the data option.'
	    );
	    return
	  }
	  if (!ob) {
	    obj[key] = val;
	    return
	  }
	  defineReactive$$1(ob.value, key, val);
	  ob.dep.notify();
	  return val
	}

	/**
	 * Delete a property and trigger change if necessary.
	 */
	function del (obj, key) {
	  var ob = obj.__ob__;
	  if (obj._isVue || (ob && ob.vmCount)) {
	    "development" !== 'production' && warn(
	      'Avoid deleting properties on a Vue instance or its root $data ' +
	      '- just set it to null.'
	    );
	    return
	  }
	  if (!hasOwn(obj, key)) {
	    return
	  }
	  delete obj[key];
	  if (!ob) {
	    return
	  }
	  ob.dep.notify();
	}

	/**
	 * Collect dependencies on array elements when the array is touched, since
	 * we cannot intercept array element access like property getters.
	 */
	function dependArray (value) {
	  for (var e = void 0, i = 0, l = value.length; i < l; i++) {
	    e = value[i];
	    e && e.__ob__ && e.__ob__.dep.depend();
	    if (Array.isArray(e)) {
	      dependArray(e);
	    }
	  }
	}

	/*  */

	function initState (vm) {
	  vm._watchers = [];
	  initProps(vm);
	  initData(vm);
	  initComputed(vm);
	  initMethods(vm);
	  initWatch(vm);
	}

	function initProps (vm) {
	  var props = vm.$options.props;
	  if (props) {
	    var propsData = vm.$options.propsData || {};
	    var keys = vm.$options._propKeys = Object.keys(props);
	    var isRoot = !vm.$parent;
	    // root instance props should be converted
	    observerState.shouldConvert = isRoot;
	    var loop = function ( i ) {
	      var key = keys[i];
	      /* istanbul ignore else */
	      {
	        defineReactive$$1(vm, key, validateProp(key, props, propsData, vm), function () {
	          if (vm.$parent && !observerState.isSettingProps) {
	            warn(
	              "Avoid mutating a prop directly since the value will be " +
	              "overwritten whenever the parent component re-renders. " +
	              "Instead, use a data or computed property based on the prop's " +
	              "value. Prop being mutated: \"" + key + "\"",
	              vm
	            );
	          }
	        });
	      }
	    };

	    for (var i = 0; i < keys.length; i++) loop( i );
	    observerState.shouldConvert = true;
	  }
	}

	function initData (vm) {
	  var data = vm.$options.data;
	  data = vm._data = typeof data === 'function'
	    ? data.call(vm)
	    : data || {};
	  if (!isPlainObject(data)) {
	    data = {};
	    "development" !== 'production' && warn(
	      'data functions should return an object.',
	      vm
	    );
	  }
	  // proxy data on instance
	  var keys = Object.keys(data);
	  var props = vm.$options.props;
	  var i = keys.length;
	  while (i--) {
	    if (props && hasOwn(props, keys[i])) {
	      "development" !== 'production' && warn(
	        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
	        "Use prop default value instead.",
	        vm
	      );
	    } else {
	      proxy(vm, keys[i]);
	    }
	  }
	  // observe data
	  observe(data);
	  data.__ob__ && data.__ob__.vmCount++;
	}

	var computedSharedDefinition = {
	  enumerable: true,
	  configurable: true,
	  get: noop,
	  set: noop
	};

	function initComputed (vm) {
	  var computed = vm.$options.computed;
	  if (computed) {
	    for (var key in computed) {
	      var userDef = computed[key];
	      if (typeof userDef === 'function') {
	        computedSharedDefinition.get = makeComputedGetter(userDef, vm);
	        computedSharedDefinition.set = noop;
	      } else {
	        computedSharedDefinition.get = userDef.get
	          ? userDef.cache !== false
	            ? makeComputedGetter(userDef.get, vm)
	            : bind$1(userDef.get, vm)
	          : noop;
	        computedSharedDefinition.set = userDef.set
	          ? bind$1(userDef.set, vm)
	          : noop;
	      }
	      Object.defineProperty(vm, key, computedSharedDefinition);
	    }
	  }
	}

	function makeComputedGetter (getter, owner) {
	  var watcher = new Watcher(owner, getter, noop, {
	    lazy: true
	  });
	  return function computedGetter () {
	    if (watcher.dirty) {
	      watcher.evaluate();
	    }
	    if (Dep.target) {
	      watcher.depend();
	    }
	    return watcher.value
	  }
	}

	function initMethods (vm) {
	  var methods = vm.$options.methods;
	  if (methods) {
	    for (var key in methods) {
	      vm[key] = methods[key] == null ? noop : bind$1(methods[key], vm);
	      if ("development" !== 'production' && methods[key] == null) {
	        warn(
	          "method \"" + key + "\" has an undefined value in the component definition. " +
	          "Did you reference the function correctly?",
	          vm
	        );
	      }
	    }
	  }
	}

	function initWatch (vm) {
	  var watch = vm.$options.watch;
	  if (watch) {
	    for (var key in watch) {
	      var handler = watch[key];
	      if (Array.isArray(handler)) {
	        for (var i = 0; i < handler.length; i++) {
	          createWatcher(vm, key, handler[i]);
	        }
	      } else {
	        createWatcher(vm, key, handler);
	      }
	    }
	  }
	}

	function createWatcher (vm, key, handler) {
	  var options;
	  if (isPlainObject(handler)) {
	    options = handler;
	    handler = handler.handler;
	  }
	  if (typeof handler === 'string') {
	    handler = vm[handler];
	  }
	  vm.$watch(key, handler, options);
	}

	function stateMixin (Vue) {
	  // flow somehow has problems with directly declared definition object
	  // when using Object.defineProperty, so we have to procedurally build up
	  // the object here.
	  var dataDef = {};
	  dataDef.get = function () {
	    return this._data
	  };
	  {
	    dataDef.set = function (newData) {
	      warn(
	        'Avoid replacing instance root $data. ' +
	        'Use nested data properties instead.',
	        this
	      );
	    };
	  }
	  Object.defineProperty(Vue.prototype, '$data', dataDef);

	  Vue.prototype.$set = set;
	  Vue.prototype.$delete = del;

	  Vue.prototype.$watch = function (
	    expOrFn,
	    cb,
	    options
	  ) {
	    var vm = this;
	    options = options || {};
	    options.user = true;
	    var watcher = new Watcher(vm, expOrFn, cb, options);
	    if (options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn () {
	      watcher.teardown();
	    }
	  };
	}

	function proxy (vm, key) {
	  if (!isReserved(key)) {
	    Object.defineProperty(vm, key, {
	      configurable: true,
	      enumerable: true,
	      get: function proxyGetter () {
	        return vm._data[key]
	      },
	      set: function proxySetter (val) {
	        vm._data[key] = val;
	      }
	    });
	  }
	}

	/*  */

	var VNode = function VNode (
	  tag,
	  data,
	  children,
	  text,
	  elm,
	  ns,
	  context,
	  componentOptions
	) {
	  this.tag = tag;
	  this.data = data;
	  this.children = children;
	  this.text = text;
	  this.elm = elm;
	  this.ns = ns;
	  this.context = context;
	  this.functionalContext = undefined;
	  this.key = data && data.key;
	  this.componentOptions = componentOptions;
	  this.child = undefined;
	  this.parent = undefined;
	  this.raw = false;
	  this.isStatic = false;
	  this.isRootInsert = true;
	  this.isComment = false;
	  this.isCloned = false;
	};

	var emptyVNode = function () {
	  var node = new VNode();
	  node.text = '';
	  node.isComment = true;
	  return node
	};

	// optimized shallow clone
	// used for static nodes and slot nodes because they may be reused across
	// multiple renders, cloning them avoids errors when DOM manipulations rely
	// on their elm reference.
	function cloneVNode (vnode) {
	  var cloned = new VNode(
	    vnode.tag,
	    vnode.data,
	    vnode.children,
	    vnode.text,
	    vnode.elm,
	    vnode.ns,
	    vnode.context,
	    vnode.componentOptions
	  );
	  cloned.isStatic = vnode.isStatic;
	  cloned.key = vnode.key;
	  cloned.isCloned = true;
	  return cloned
	}

	function cloneVNodes (vnodes) {
	  var res = new Array(vnodes.length);
	  for (var i = 0; i < vnodes.length; i++) {
	    res[i] = cloneVNode(vnodes[i]);
	  }
	  return res
	}

	/*  */

	function mergeVNodeHook (def, hookKey, hook, key) {
	  key = key + hookKey;
	  var injectedHash = def.__injected || (def.__injected = {});
	  if (!injectedHash[key]) {
	    injectedHash[key] = true;
	    var oldHook = def[hookKey];
	    if (oldHook) {
	      def[hookKey] = function () {
	        oldHook.apply(this, arguments);
	        hook.apply(this, arguments);
	      };
	    } else {
	      def[hookKey] = hook;
	    }
	  }
	}

	/*  */

	function updateListeners (
	  on,
	  oldOn,
	  add,
	  remove$$1,
	  vm
	) {
	  var name, cur, old, fn, event, capture;
	  for (name in on) {
	    cur = on[name];
	    old = oldOn[name];
	    if (!cur) {
	      "development" !== 'production' && warn(
	        "Invalid handler for event \"" + name + "\": got " + String(cur),
	        vm
	      );
	    } else if (!old) {
	      capture = name.charAt(0) === '!';
	      event = capture ? name.slice(1) : name;
	      if (Array.isArray(cur)) {
	        add(event, (cur.invoker = arrInvoker(cur)), capture);
	      } else {
	        if (!cur.invoker) {
	          fn = cur;
	          cur = on[name] = {};
	          cur.fn = fn;
	          cur.invoker = fnInvoker(cur);
	        }
	        add(event, cur.invoker, capture);
	      }
	    } else if (cur !== old) {
	      if (Array.isArray(old)) {
	        old.length = cur.length;
	        for (var i = 0; i < old.length; i++) { old[i] = cur[i]; }
	        on[name] = old;
	      } else {
	        old.fn = cur;
	        on[name] = old;
	      }
	    }
	  }
	  for (name in oldOn) {
	    if (!on[name]) {
	      event = name.charAt(0) === '!' ? name.slice(1) : name;
	      remove$$1(event, oldOn[name].invoker);
	    }
	  }
	}

	function arrInvoker (arr) {
	  return function (ev) {
	    var arguments$1 = arguments;

	    var single = arguments.length === 1;
	    for (var i = 0; i < arr.length; i++) {
	      single ? arr[i](ev) : arr[i].apply(null, arguments$1);
	    }
	  }
	}

	function fnInvoker (o) {
	  return function (ev) {
	    var single = arguments.length === 1;
	    single ? o.fn(ev) : o.fn.apply(null, arguments);
	  }
	}

	/*  */

	function normalizeChildren (
	  children,
	  ns,
	  nestedIndex
	) {
	  if (isPrimitive(children)) {
	    return [createTextVNode(children)]
	  }
	  if (Array.isArray(children)) {
	    var res = [];
	    for (var i = 0, l = children.length; i < l; i++) {
	      var c = children[i];
	      var last = res[res.length - 1];
	      //  nested
	      if (Array.isArray(c)) {
	        res.push.apply(res, normalizeChildren(c, ns, ((nestedIndex || '') + "_" + i)));
	      } else if (isPrimitive(c)) {
	        if (last && last.text) {
	          last.text += String(c);
	        } else if (c !== '') {
	          // convert primitive to vnode
	          res.push(createTextVNode(c));
	        }
	      } else if (c instanceof VNode) {
	        if (c.text && last && last.text) {
	          last.text += c.text;
	        } else {
	          // inherit parent namespace
	          if (ns) {
	            applyNS(c, ns);
	          }
	          // default key for nested array children (likely generated by v-for)
	          if (c.tag && c.key == null && nestedIndex != null) {
	            c.key = "__vlist" + nestedIndex + "_" + i + "__";
	          }
	          res.push(c);
	        }
	      }
	    }
	    return res
	  }
	}

	function createTextVNode (val) {
	  return new VNode(undefined, undefined, undefined, String(val))
	}

	function applyNS (vnode, ns) {
	  if (vnode.tag && !vnode.ns) {
	    vnode.ns = ns;
	    if (vnode.children) {
	      for (var i = 0, l = vnode.children.length; i < l; i++) {
	        applyNS(vnode.children[i], ns);
	      }
	    }
	  }
	}

	/*  */

	function getFirstComponentChild (children) {
	  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
	}

	/*  */

	var activeInstance = null;

	function initLifecycle (vm) {
	  var options = vm.$options;

	  // locate first non-abstract parent
	  var parent = options.parent;
	  if (parent && !options.abstract) {
	    while (parent.$options.abstract && parent.$parent) {
	      parent = parent.$parent;
	    }
	    parent.$children.push(vm);
	  }

	  vm.$parent = parent;
	  vm.$root = parent ? parent.$root : vm;

	  vm.$children = [];
	  vm.$refs = {};

	  vm._watcher = null;
	  vm._inactive = false;
	  vm._isMounted = false;
	  vm._isDestroyed = false;
	  vm._isBeingDestroyed = false;
	}

	function lifecycleMixin (Vue) {
	  Vue.prototype._mount = function (
	    el,
	    hydrating
	  ) {
	    var vm = this;
	    vm.$el = el;
	    if (!vm.$options.render) {
	      vm.$options.render = emptyVNode;
	      {
	        /* istanbul ignore if */
	        if (vm.$options.template) {
	          warn(
	            'You are using the runtime-only build of Vue where the template ' +
	            'option is not available. Either pre-compile the templates into ' +
	            'render functions, or use the compiler-included build.',
	            vm
	          );
	        } else {
	          warn(
	            'Failed to mount component: template or render function not defined.',
	            vm
	          );
	        }
	      }
	    }
	    callHook(vm, 'beforeMount');
	    vm._watcher = new Watcher(vm, function () {
	      vm._update(vm._render(), hydrating);
	    }, noop);
	    hydrating = false;
	    // manually mounted instance, call mounted on self
	    // mounted is called for render-created child components in its inserted hook
	    if (vm.$vnode == null) {
	      vm._isMounted = true;
	      callHook(vm, 'mounted');
	    }
	    return vm
	  };

	  Vue.prototype._update = function (vnode, hydrating) {
	    var vm = this;
	    if (vm._isMounted) {
	      callHook(vm, 'beforeUpdate');
	    }
	    var prevEl = vm.$el;
	    var prevActiveInstance = activeInstance;
	    activeInstance = vm;
	    var prevVnode = vm._vnode;
	    vm._vnode = vnode;
	    if (!prevVnode) {
	      // Vue.prototype.__patch__ is injected in entry points
	      // based on the rendering backend used.
	      vm.$el = vm.__patch__(vm.$el, vnode, hydrating);
	    } else {
	      vm.$el = vm.__patch__(prevVnode, vnode);
	    }
	    activeInstance = prevActiveInstance;
	    // update __vue__ reference
	    if (prevEl) {
	      prevEl.__vue__ = null;
	    }
	    if (vm.$el) {
	      vm.$el.__vue__ = vm;
	    }
	    // if parent is an HOC, update its $el as well
	    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
	      vm.$parent.$el = vm.$el;
	    }
	    if (vm._isMounted) {
	      callHook(vm, 'updated');
	    }
	  };

	  Vue.prototype._updateFromParent = function (
	    propsData,
	    listeners,
	    parentVnode,
	    renderChildren
	  ) {
	    var vm = this;
	    var hasChildren = !!(vm.$options._renderChildren || renderChildren);
	    vm.$options._parentVnode = parentVnode;
	    vm.$options._renderChildren = renderChildren;
	    // update props
	    if (propsData && vm.$options.props) {
	      observerState.shouldConvert = false;
	      {
	        observerState.isSettingProps = true;
	      }
	      var propKeys = vm.$options._propKeys || [];
	      for (var i = 0; i < propKeys.length; i++) {
	        var key = propKeys[i];
	        vm[key] = validateProp(key, vm.$options.props, propsData, vm);
	      }
	      observerState.shouldConvert = true;
	      {
	        observerState.isSettingProps = false;
	      }
	    }
	    // update listeners
	    if (listeners) {
	      var oldListeners = vm.$options._parentListeners;
	      vm.$options._parentListeners = listeners;
	      vm._updateListeners(listeners, oldListeners);
	    }
	    // resolve slots + force update if has children
	    if (hasChildren) {
	      vm.$slots = resolveSlots(renderChildren, vm._renderContext);
	      vm.$forceUpdate();
	    }
	  };

	  Vue.prototype.$forceUpdate = function () {
	    var vm = this;
	    if (vm._watcher) {
	      vm._watcher.update();
	    }
	  };

	  Vue.prototype.$destroy = function () {
	    var vm = this;
	    if (vm._isBeingDestroyed) {
	      return
	    }
	    callHook(vm, 'beforeDestroy');
	    vm._isBeingDestroyed = true;
	    // remove self from parent
	    var parent = vm.$parent;
	    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
	      remove$1(parent.$children, vm);
	    }
	    // teardown watchers
	    if (vm._watcher) {
	      vm._watcher.teardown();
	    }
	    var i = vm._watchers.length;
	    while (i--) {
	      vm._watchers[i].teardown();
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (vm._data.__ob__) {
	      vm._data.__ob__.vmCount--;
	    }
	    // call the last hook...
	    vm._isDestroyed = true;
	    callHook(vm, 'destroyed');
	    // turn off all instance listeners.
	    vm.$off();
	    // remove __vue__ reference
	    if (vm.$el) {
	      vm.$el.__vue__ = null;
	    }
	    // invoke destroy hooks on current rendered tree
	    vm.__patch__(vm._vnode, null);
	  };
	}

	function callHook (vm, hook) {
	  var handlers = vm.$options[hook];
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      handlers[i].call(vm);
	    }
	  }
	  vm.$emit('hook:' + hook);
	}

	/*  */

	var hooks = { init: init, prepatch: prepatch, insert: insert, destroy: destroy$1 };
	var hooksToMerge = Object.keys(hooks);

	function createComponent (
	  Ctor,
	  data,
	  context,
	  children,
	  tag
	) {
	  if (!Ctor) {
	    return
	  }

	  if (isObject(Ctor)) {
	    Ctor = Vue$3.extend(Ctor);
	  }

	  if (typeof Ctor !== 'function') {
	    {
	      warn(("Invalid Component definition: " + (String(Ctor))), context);
	    }
	    return
	  }

	  // async component
	  if (!Ctor.cid) {
	    if (Ctor.resolved) {
	      Ctor = Ctor.resolved;
	    } else {
	      Ctor = resolveAsyncComponent(Ctor, function () {
	        // it's ok to queue this on every render because
	        // $forceUpdate is buffered by the scheduler.
	        context.$forceUpdate();
	      });
	      if (!Ctor) {
	        // return nothing if this is indeed an async component
	        // wait for the callback to trigger parent update.
	        return
	      }
	    }
	  }

	  data = data || {};

	  // extract props
	  var propsData = extractProps(data, Ctor);

	  // functional component
	  if (Ctor.options.functional) {
	    return createFunctionalComponent(Ctor, propsData, data, context, children)
	  }

	  // extract listeners, since these needs to be treated as
	  // child component listeners instead of DOM listeners
	  var listeners = data.on;
	  // replace with listeners with .native modifier
	  data.on = data.nativeOn;

	  if (Ctor.options.abstract) {
	    // abstract components do not keep anything
	    // other than props & listeners
	    data = {};
	  }

	  // merge component management hooks onto the placeholder node
	  mergeHooks(data);

	  // return a placeholder vnode
	  var name = Ctor.options.name || tag;
	  var vnode = new VNode(
	    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
	    data, undefined, undefined, undefined, undefined, context,
	    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
	  );
	  return vnode
	}

	function createFunctionalComponent (
	  Ctor,
	  propsData,
	  data,
	  context,
	  children
	) {
	  var props = {};
	  var propOptions = Ctor.options.props;
	  if (propOptions) {
	    for (var key in propOptions) {
	      props[key] = validateProp(key, propOptions, propsData);
	    }
	  }
	  var vnode = Ctor.options.render.call(
	    null,
	    // ensure the createElement function in functional components
	    // gets a unique context - this is necessary for correct named slot check
	    bind$1(createElement, { _self: Object.create(context) }),
	    {
	      props: props,
	      data: data,
	      parent: context,
	      children: normalizeChildren(children),
	      slots: function () { return resolveSlots(children, context); }
	    }
	  );
	  if (vnode instanceof VNode) {
	    vnode.functionalContext = context;
	    if (data.slot) {
	      (vnode.data || (vnode.data = {})).slot = data.slot;
	    }
	  }
	  return vnode
	}

	function createComponentInstanceForVnode (
	  vnode, // we know it's MountedComponentVNode but flow doesn't
	  parent // activeInstance in lifecycle state
	) {
	  var vnodeComponentOptions = vnode.componentOptions;
	  var options = {
	    _isComponent: true,
	    parent: parent,
	    propsData: vnodeComponentOptions.propsData,
	    _componentTag: vnodeComponentOptions.tag,
	    _parentVnode: vnode,
	    _parentListeners: vnodeComponentOptions.listeners,
	    _renderChildren: vnodeComponentOptions.children
	  };
	  // check inline-template render functions
	  var inlineTemplate = vnode.data.inlineTemplate;
	  if (inlineTemplate) {
	    options.render = inlineTemplate.render;
	    options.staticRenderFns = inlineTemplate.staticRenderFns;
	  }
	  return new vnodeComponentOptions.Ctor(options)
	}

	function init (vnode, hydrating) {
	  if (!vnode.child || vnode.child._isDestroyed) {
	    var child = vnode.child = createComponentInstanceForVnode(vnode, activeInstance);
	    child.$mount(hydrating ? vnode.elm : undefined, hydrating);
	  }
	}

	function prepatch (
	  oldVnode,
	  vnode
	) {
	  var options = vnode.componentOptions;
	  var child = vnode.child = oldVnode.child;
	  child._updateFromParent(
	    options.propsData, // updated props
	    options.listeners, // updated listeners
	    vnode, // new parent vnode
	    options.children // new children
	  );
	}

	function insert (vnode) {
	  if (!vnode.child._isMounted) {
	    vnode.child._isMounted = true;
	    callHook(vnode.child, 'mounted');
	  }
	  if (vnode.data.keepAlive) {
	    vnode.child._inactive = false;
	    callHook(vnode.child, 'activated');
	  }
	}

	function destroy$1 (vnode) {
	  if (!vnode.child._isDestroyed) {
	    if (!vnode.data.keepAlive) {
	      vnode.child.$destroy();
	    } else {
	      vnode.child._inactive = true;
	      callHook(vnode.child, 'deactivated');
	    }
	  }
	}

	function resolveAsyncComponent (
	  factory,
	  cb
	) {
	  if (factory.requested) {
	    // pool callbacks
	    factory.pendingCallbacks.push(cb);
	  } else {
	    factory.requested = true;
	    var cbs = factory.pendingCallbacks = [cb];
	    var sync = true;

	    var resolve = function (res) {
	      if (isObject(res)) {
	        res = Vue$3.extend(res);
	      }
	      // cache resolved
	      factory.resolved = res;
	      // invoke callbacks only if this is not a synchronous resolve
	      // (async resolves are shimmed as synchronous during SSR)
	      if (!sync) {
	        for (var i = 0, l = cbs.length; i < l; i++) {
	          cbs[i](res);
	        }
	      }
	    };

	    var reject = function (reason) {
	      "development" !== 'production' && warn(
	        "Failed to resolve async component: " + (String(factory)) +
	        (reason ? ("\nReason: " + reason) : '')
	      );
	    };

	    var res = factory(resolve, reject);

	    // handle promise
	    if (res && typeof res.then === 'function' && !factory.resolved) {
	      res.then(resolve, reject);
	    }

	    sync = false;
	    // return in case resolved synchronously
	    return factory.resolved
	  }
	}

	function extractProps (data, Ctor) {
	  // we are only extrating raw values here.
	  // validation and default values are handled in the child
	  // component itself.
	  var propOptions = Ctor.options.props;
	  if (!propOptions) {
	    return
	  }
	  var res = {};
	  var attrs = data.attrs;
	  var props = data.props;
	  var domProps = data.domProps;
	  if (attrs || props || domProps) {
	    for (var key in propOptions) {
	      var altKey = hyphenate(key);
	      checkProp(res, props, key, altKey, true) ||
	      checkProp(res, attrs, key, altKey) ||
	      checkProp(res, domProps, key, altKey);
	    }
	  }
	  return res
	}

	function checkProp (
	  res,
	  hash,
	  key,
	  altKey,
	  preserve
	) {
	  if (hash) {
	    if (hasOwn(hash, key)) {
	      res[key] = hash[key];
	      if (!preserve) {
	        delete hash[key];
	      }
	      return true
	    } else if (hasOwn(hash, altKey)) {
	      res[key] = hash[altKey];
	      if (!preserve) {
	        delete hash[altKey];
	      }
	      return true
	    }
	  }
	  return false
	}

	function mergeHooks (data) {
	  if (!data.hook) {
	    data.hook = {};
	  }
	  for (var i = 0; i < hooksToMerge.length; i++) {
	    var key = hooksToMerge[i];
	    var fromParent = data.hook[key];
	    var ours = hooks[key];
	    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
	  }
	}

	function mergeHook$1 (a, b) {
	  // since all hooks have at most two args, use fixed args
	  // to avoid having to use fn.apply().
	  return function (_, __) {
	    a(_, __);
	    b(_, __);
	  }
	}

	/*  */

	// wrapper function for providing a more flexible interface
	// without getting yelled at by flow
	function createElement (
	  tag,
	  data,
	  children
	) {
	  if (data && (Array.isArray(data) || typeof data !== 'object')) {
	    children = data;
	    data = undefined;
	  }
	  // make sure to use real instance instead of proxy as context
	  return _createElement(this._self, tag, data, children)
	}

	function _createElement (
	  context,
	  tag,
	  data,
	  children
	) {
	  if (data && data.__ob__) {
	    "development" !== 'production' && warn(
	      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
	      'Always create fresh vnode data objects in each render!',
	      context
	    );
	    return
	  }
	  if (!tag) {
	    // in case of component :is set to falsy value
	    return emptyVNode()
	  }
	  if (typeof tag === 'string') {
	    var Ctor;
	    var ns = config.getTagNamespace(tag);
	    if (config.isReservedTag(tag)) {
	      // platform built-in elements
	      return new VNode(
	        tag, data, normalizeChildren(children, ns),
	        undefined, undefined, ns, context
	      )
	    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
	      // component
	      return createComponent(Ctor, data, context, children, tag)
	    } else {
	      // unknown or unlisted namespaced elements
	      // check at runtime because it may get assigned a namespace when its
	      // parent normalizes children
	      return new VNode(
	        tag, data, normalizeChildren(children, ns),
	        undefined, undefined, ns, context
	      )
	    }
	  } else {
	    // direct component options / constructor
	    return createComponent(tag, data, context, children)
	  }
	}

	/*  */

	function initRender (vm) {
	  vm.$vnode = null; // the placeholder node in parent tree
	  vm._vnode = null; // the root of the child tree
	  vm._staticTrees = null;
	  vm._renderContext = vm.$options._parentVnode && vm.$options._parentVnode.context;
	  vm.$slots = resolveSlots(vm.$options._renderChildren, vm._renderContext);
	  // bind the public createElement fn to this instance
	  // so that we get proper render context inside it.
	  vm.$createElement = bind$1(createElement, vm);
	  if (vm.$options.el) {
	    vm.$mount(vm.$options.el);
	  }
	}

	function renderMixin (Vue) {
	  Vue.prototype.$nextTick = function (fn) {
	    nextTick(fn, this);
	  };

	  Vue.prototype._render = function () {
	    var vm = this;
	    var ref = vm.$options;
	    var render = ref.render;
	    var staticRenderFns = ref.staticRenderFns;
	    var _parentVnode = ref._parentVnode;

	    if (vm._isMounted) {
	      // clone slot nodes on re-renders
	      for (var key in vm.$slots) {
	        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
	      }
	    }

	    if (staticRenderFns && !vm._staticTrees) {
	      vm._staticTrees = [];
	    }
	    // set parent vnode. this allows render functions to have access
	    // to the data on the placeholder node.
	    vm.$vnode = _parentVnode;
	    // render self
	    var vnode;
	    try {
	      vnode = render.call(vm._renderProxy, vm.$createElement);
	    } catch (e) {
	      {
	        warn(("Error when rendering " + (formatComponentName(vm)) + ":"));
	      }
	      /* istanbul ignore else */
	      if (config.errorHandler) {
	        config.errorHandler.call(null, e, vm);
	      } else {
	        if (config._isServer) {
	          throw e
	        } else {
	          setTimeout(function () { throw e }, 0);
	        }
	      }
	      // return previous vnode to prevent render error causing blank component
	      vnode = vm._vnode;
	    }
	    // return empty vnode in case the render function errored out
	    if (!(vnode instanceof VNode)) {
	      if ("development" !== 'production' && Array.isArray(vnode)) {
	        warn(
	          'Multiple root nodes returned from render function. Render function ' +
	          'should return a single root node.',
	          vm
	        );
	      }
	      vnode = emptyVNode();
	    }
	    // set parent
	    vnode.parent = _parentVnode;
	    return vnode
	  };

	  // shorthands used in render functions
	  Vue.prototype._h = createElement;
	  // toString for mustaches
	  Vue.prototype._s = _toString;
	  // number conversion
	  Vue.prototype._n = toNumber;
	  // empty vnode
	  Vue.prototype._e = emptyVNode;
	  // loose equal
	  Vue.prototype._q = looseEqual;
	  // loose indexOf
	  Vue.prototype._i = looseIndexOf;

	  // render static tree by index
	  Vue.prototype._m = function renderStatic (
	    index,
	    isInFor
	  ) {
	    var tree = this._staticTrees[index];
	    // if has already-rendered static tree and not inside v-for,
	    // we can reuse the same tree by doing a shallow clone.
	    if (tree && !isInFor) {
	      return Array.isArray(tree)
	        ? cloneVNodes(tree)
	        : cloneVNode(tree)
	    }
	    // otherwise, render a fresh tree.
	    tree = this._staticTrees[index] = this.$options.staticRenderFns[index].call(this._renderProxy);
	    if (Array.isArray(tree)) {
	      for (var i = 0; i < tree.length; i++) {
	        if (typeof tree[i] !== 'string') {
	          tree[i].isStatic = true;
	          tree[i].key = "__static__" + index + "_" + i;
	        }
	      }
	    } else {
	      tree.isStatic = true;
	      tree.key = "__static__" + index;
	    }
	    return tree
	  };

	  // filter resolution helper
	  var identity = function (_) { return _; };
	  Vue.prototype._f = function resolveFilter (id) {
	    return resolveAsset(this.$options, 'filters', id, true) || identity
	  };

	  // render v-for
	  Vue.prototype._l = function renderList (
	    val,
	    render
	  ) {
	    var ret, i, l, keys, key;
	    if (Array.isArray(val)) {
	      ret = new Array(val.length);
	      for (i = 0, l = val.length; i < l; i++) {
	        ret[i] = render(val[i], i);
	      }
	    } else if (typeof val === 'number') {
	      ret = new Array(val);
	      for (i = 0; i < val; i++) {
	        ret[i] = render(i + 1, i);
	      }
	    } else if (isObject(val)) {
	      keys = Object.keys(val);
	      ret = new Array(keys.length);
	      for (i = 0, l = keys.length; i < l; i++) {
	        key = keys[i];
	        ret[i] = render(val[key], key, i);
	      }
	    }
	    return ret
	  };

	  // renderSlot
	  Vue.prototype._t = function (
	    name,
	    fallback
	  ) {
	    var slotNodes = this.$slots[name];
	    // warn duplicate slot usage
	    if (slotNodes && "development" !== 'production') {
	      slotNodes._rendered && warn(
	        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
	        "- this will likely cause render errors.",
	        this
	      );
	      slotNodes._rendered = true;
	    }
	    return slotNodes || fallback
	  };

	  // apply v-bind object
	  Vue.prototype._b = function bindProps (
	    data,
	    value,
	    asProp
	  ) {
	    if (value) {
	      if (!isObject(value)) {
	        "development" !== 'production' && warn(
	          'v-bind without argument expects an Object or Array value',
	          this
	        );
	      } else {
	        if (Array.isArray(value)) {
	          value = toObject(value);
	        }
	        for (var key in value) {
	          if (key === 'class' || key === 'style') {
	            data[key] = value[key];
	          } else {
	            var hash = asProp || config.mustUseProp(key)
	              ? data.domProps || (data.domProps = {})
	              : data.attrs || (data.attrs = {});
	            hash[key] = value[key];
	          }
	        }
	      }
	    }
	    return data
	  };

	  // expose v-on keyCodes
	  Vue.prototype._k = function getKeyCodes (key) {
	    return config.keyCodes[key]
	  };
	}

	function resolveSlots (
	  renderChildren,
	  context
	) {
	  var slots = {};
	  if (!renderChildren) {
	    return slots
	  }
	  var children = normalizeChildren(renderChildren) || [];
	  var defaultSlot = [];
	  var name, child;
	  for (var i = 0, l = children.length; i < l; i++) {
	    child = children[i];
	    // named slots should only be respected if the vnode was rendered in the
	    // same context.
	    if ((child.context === context || child.functionalContext === context) &&
	        child.data && (name = child.data.slot)) {
	      var slot = (slots[name] || (slots[name] = []));
	      if (child.tag === 'template') {
	        slot.push.apply(slot, child.children);
	      } else {
	        slot.push(child);
	      }
	    } else {
	      defaultSlot.push(child);
	    }
	  }
	  // ignore single whitespace
	  if (defaultSlot.length && !(
	    defaultSlot.length === 1 &&
	    (defaultSlot[0].text === ' ' || defaultSlot[0].isComment)
	  )) {
	    slots.default = defaultSlot;
	  }
	  return slots
	}

	/*  */

	function initEvents (vm) {
	  vm._events = Object.create(null);
	  // init parent attached events
	  var listeners = vm.$options._parentListeners;
	  var on = bind$1(vm.$on, vm);
	  var off = bind$1(vm.$off, vm);
	  vm._updateListeners = function (listeners, oldListeners) {
	    updateListeners(listeners, oldListeners || {}, on, off, vm);
	  };
	  if (listeners) {
	    vm._updateListeners(listeners);
	  }
	}

	function eventsMixin (Vue) {
	  Vue.prototype.$on = function (event, fn) {
	    var vm = this;(vm._events[event] || (vm._events[event] = [])).push(fn);
	    return vm
	  };

	  Vue.prototype.$once = function (event, fn) {
	    var vm = this;
	    function on () {
	      vm.$off(event, on);
	      fn.apply(vm, arguments);
	    }
	    on.fn = fn;
	    vm.$on(event, on);
	    return vm
	  };

	  Vue.prototype.$off = function (event, fn) {
	    var vm = this;
	    // all
	    if (!arguments.length) {
	      vm._events = Object.create(null);
	      return vm
	    }
	    // specific event
	    var cbs = vm._events[event];
	    if (!cbs) {
	      return vm
	    }
	    if (arguments.length === 1) {
	      vm._events[event] = null;
	      return vm
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        cbs.splice(i, 1);
	        break
	      }
	    }
	    return vm
	  };

	  Vue.prototype.$emit = function (event) {
	    var vm = this;
	    var cbs = vm._events[event];
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        cbs[i].apply(vm, args);
	      }
	    }
	    return vm
	  };
	}

	/*  */

	var uid = 0;

	function initMixin (Vue) {
	  Vue.prototype._init = function (options) {
	    var vm = this;
	    // a uid
	    vm._uid = uid++;
	    // a flag to avoid this being observed
	    vm._isVue = true;
	    // merge options
	    if (options && options._isComponent) {
	      // optimize internal component instantiation
	      // since dynamic options merging is pretty slow, and none of the
	      // internal component options needs special treatment.
	      initInternalComponent(vm, options);
	    } else {
	      vm.$options = mergeOptions(
	        resolveConstructorOptions(vm),
	        options || {},
	        vm
	      );
	    }
	    /* istanbul ignore else */
	    {
	      initProxy(vm);
	    }
	    // expose real self
	    vm._self = vm;
	    initLifecycle(vm);
	    initEvents(vm);
	    callHook(vm, 'beforeCreate');
	    initState(vm);
	    callHook(vm, 'created');
	    initRender(vm);
	  };

	  function initInternalComponent (vm, options) {
	    var opts = vm.$options = Object.create(resolveConstructorOptions(vm));
	    // doing this because it's faster than dynamic enumeration.
	    opts.parent = options.parent;
	    opts.propsData = options.propsData;
	    opts._parentVnode = options._parentVnode;
	    opts._parentListeners = options._parentListeners;
	    opts._renderChildren = options._renderChildren;
	    opts._componentTag = options._componentTag;
	    if (options.render) {
	      opts.render = options.render;
	      opts.staticRenderFns = options.staticRenderFns;
	    }
	  }

	  function resolveConstructorOptions (vm) {
	    var Ctor = vm.constructor;
	    var options = Ctor.options;
	    if (Ctor.super) {
	      var superOptions = Ctor.super.options;
	      var cachedSuperOptions = Ctor.superOptions;
	      if (superOptions !== cachedSuperOptions) {
	        // super option changed
	        Ctor.superOptions = superOptions;
	        options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
	        if (options.name) {
	          options.components[options.name] = Ctor;
	        }
	      }
	    }
	    return options
	  }
	}

	function Vue$3 (options) {
	  if ("development" !== 'production' &&
	    !(this instanceof Vue$3)) {
	    warn('Vue is a constructor and should be called with the `new` keyword');
	  }
	  this._init(options);
	}

	initMixin(Vue$3);
	stateMixin(Vue$3);
	eventsMixin(Vue$3);
	lifecycleMixin(Vue$3);
	renderMixin(Vue$3);

	var warn = noop;
	var formatComponentName;

	{
	  var hasConsole = typeof console !== 'undefined';

	  warn = function (msg, vm) {
	    if (hasConsole && (!config.silent)) {
	      console.error("[Vue warn]: " + msg + " " + (
	        vm ? formatLocation(formatComponentName(vm)) : ''
	      ));
	    }
	  };

	  formatComponentName = function (vm) {
	    if (vm.$root === vm) {
	      return 'root instance'
	    }
	    var name = vm._isVue
	      ? vm.$options.name || vm.$options._componentTag
	      : vm.name;
	    return (
	      (name ? ("component <" + name + ">") : "anonymous component") +
	      (vm._isVue && vm.$options.__file ? (" at " + (vm.$options.__file)) : '')
	    )
	  };

	  var formatLocation = function (str) {
	    if (str === 'anonymous component') {
	      str += " - use the \"name\" option for better debugging messages.";
	    }
	    return ("\n(found in " + str + ")")
	  };
	}

	/*  */

	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 */
	var strats = config.optionMergeStrategies;

	/**
	 * Options with restrictions
	 */
	{
	  strats.el = strats.propsData = function (parent, child, vm, key) {
	    if (!vm) {
	      warn(
	        "option \"" + key + "\" can only be used during instance " +
	        'creation with the `new` keyword.'
	      );
	    }
	    return defaultStrat(parent, child)
	  };
	}

	/**
	 * Helper that recursively merges two data objects together.
	 */
	function mergeData (to, from) {
	  var key, toVal, fromVal;
	  for (key in from) {
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isObject(toVal) && isObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to
	}

	/**
	 * Data
	 */
	strats.data = function (
	  parentVal,
	  childVal,
	  vm
	) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal
	    }
	    if (typeof childVal !== 'function') {
	      "development" !== 'production' && warn(
	        'The "data" option should be a function ' +
	        'that returns a per-instance value in component ' +
	        'definitions.',
	        vm
	      );
	      return parentVal
	    }
	    if (!parentVal) {
	      return childVal
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn () {
	      return mergeData(
	        childVal.call(this),
	        parentVal.call(this)
	      )
	    }
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn () {
	      // instance merge
	      var instanceData = typeof childVal === 'function'
	        ? childVal.call(vm)
	        : childVal;
	      var defaultData = typeof parentVal === 'function'
	        ? parentVal.call(vm)
	        : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData)
	      } else {
	        return defaultData
	      }
	    }
	  }
	};

	/**
	 * Hooks and param attributes are merged as arrays.
	 */
	function mergeHook (
	  parentVal,
	  childVal
	) {
	  return childVal
	    ? parentVal
	      ? parentVal.concat(childVal)
	      : Array.isArray(childVal)
	        ? childVal
	        : [childVal]
	    : parentVal
	}

	config._lifecycleHooks.forEach(function (hook) {
	  strats[hook] = mergeHook;
	});

	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	function mergeAssets (parentVal, childVal) {
	  var res = Object.create(parentVal || null);
	  return childVal
	    ? extend(res, childVal)
	    : res
	}

	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});

	/**
	 * Watchers.
	 *
	 * Watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	strats.watch = function (parentVal, childVal) {
	  /* istanbul ignore if */
	  if (!childVal) { return parentVal }
	  if (!parentVal) { return childVal }
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !Array.isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent
	      ? parent.concat(child)
	      : [child];
	  }
	  return ret
	};

	/**
	 * Other object hashes.
	 */
	strats.props =
	strats.methods =
	strats.computed = function (parentVal, childVal) {
	  if (!childVal) { return parentVal }
	  if (!parentVal) { return childVal }
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret
	};

	/**
	 * Default strategy.
	 */
	var defaultStrat = function (parentVal, childVal) {
	  return childVal === undefined
	    ? parentVal
	    : childVal
	};

	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 */
	function normalizeComponents (options) {
	  if (options.components) {
	    var components = options.components;
	    var def;
	    for (var key in components) {
	      var lower = key.toLowerCase();
	      if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
	        "development" !== 'production' && warn(
	          'Do not use built-in or reserved HTML elements as component ' +
	          'id: ' + key
	        );
	        continue
	      }
	      def = components[key];
	      if (isPlainObject(def)) {
	        components[key] = Vue$3.extend(def);
	      }
	    }
	  }
	}

	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 */
	function normalizeProps (options) {
	  var props = options.props;
	  if (!props) { return }
	  var res = {};
	  var i, val, name;
	  if (Array.isArray(props)) {
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        name = camelize(val);
	        res[name] = { type: null };
	      } else {
	        warn('props must be strings when using array syntax.');
	      }
	    }
	  } else if (isPlainObject(props)) {
	    for (var key in props) {
	      val = props[key];
	      name = camelize(key);
	      res[name] = isPlainObject(val)
	        ? val
	        : { type: val };
	    }
	  }
	  options.props = res;
	}

	/**
	 * Normalize raw function directives into object format.
	 */
	function normalizeDirectives (options) {
	  var dirs = options.directives;
	  if (dirs) {
	    for (var key in dirs) {
	      var def = dirs[key];
	      if (typeof def === 'function') {
	        dirs[key] = { bind: def, update: def };
	      }
	    }
	  }
	}

	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 */
	function mergeOptions (
	  parent,
	  child,
	  vm
	) {
	  normalizeComponents(child);
	  normalizeProps(child);
	  normalizeDirectives(child);
	  var extendsFrom = child.extends;
	  if (extendsFrom) {
	    parent = typeof extendsFrom === 'function'
	      ? mergeOptions(parent, extendsFrom.options, vm)
	      : mergeOptions(parent, extendsFrom, vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      var mixin = child.mixins[i];
	      if (mixin.prototype instanceof Vue$3) {
	        mixin = mixin.options;
	      }
	      parent = mergeOptions(parent, mixin, vm);
	    }
	  }
	  var options = {};
	  var key;
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField (key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options
	}

	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 */
	function resolveAsset (
	  options,
	  type,
	  id,
	  warnMissing
	) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return
	  }
	  var assets = options[type];
	  var res = assets[id] ||
	    // camelCase ID
	    assets[camelize(id)] ||
	    // Pascal Case ID
	    assets[capitalize(camelize(id))];
	  if ("development" !== 'production' && warnMissing && !res) {
	    warn(
	      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
	      options
	    );
	  }
	  return res
	}

	/*  */

	function validateProp (
	  key,
	  propOptions,
	  propsData,
	  vm
	) {
	  var prop = propOptions[key];
	  var absent = !hasOwn(propsData, key);
	  var value = propsData[key];
	  // handle boolean props
	  if (isBooleanType(prop.type)) {
	    if (absent && !hasOwn(prop, 'default')) {
	      value = false;
	    } else if (value === '' || value === hyphenate(key)) {
	      value = true;
	    }
	  }
	  // check default value
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop, key);
	    // since the default value is a fresh copy,
	    // make sure to observe it.
	    var prevShouldConvert = observerState.shouldConvert;
	    observerState.shouldConvert = true;
	    observe(value);
	    observerState.shouldConvert = prevShouldConvert;
	  }
	  {
	    assertProp(prop, key, value, vm, absent);
	  }
	  return value
	}

	/**
	 * Get the default value of a prop.
	 */
	function getPropDefaultValue (vm, prop, name) {
	  // no default, return undefined
	  if (!hasOwn(prop, 'default')) {
	    return undefined
	  }
	  var def = prop.default;
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    "development" !== 'production' && warn(
	      'Invalid default value for prop "' + name + '": ' +
	      'Props with type Object/Array must use a factory function ' +
	      'to return the default value.',
	      vm
	    );
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && prop.type !== Function
	    ? def.call(vm)
	    : def
	}

	/**
	 * Assert whether a prop is valid.
	 */
	function assertProp (
	  prop,
	  name,
	  value,
	  vm,
	  absent
	) {
	  if (prop.required && absent) {
	    warn(
	      'Missing required prop: "' + name + '"',
	      vm
	    );
	    return
	  }
	  if (value == null && !prop.required) {
	    return
	  }
	  var type = prop.type;
	  var valid = !type || type === true;
	  var expectedTypes = [];
	  if (type) {
	    if (!Array.isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType);
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    warn(
	      'Invalid prop: type check failed for prop "' + name + '".' +
	      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
	      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
	      vm
	    );
	    return
	  }
	  var validator = prop.validator;
	  if (validator) {
	    if (!validator(value)) {
	      warn(
	        'Invalid prop: custom validator check failed for prop "' + name + '".',
	        vm
	      );
	    }
	  }
	}

	/**
	 * Assert the type of a value
	 */
	function assertType (value, type) {
	  var valid;
	  var expectedType = getType(type);
	  if (expectedType === 'String') {
	    valid = typeof value === (expectedType = 'string');
	  } else if (expectedType === 'Number') {
	    valid = typeof value === (expectedType = 'number');
	  } else if (expectedType === 'Boolean') {
	    valid = typeof value === (expectedType = 'boolean');
	  } else if (expectedType === 'Function') {
	    valid = typeof value === (expectedType = 'function');
	  } else if (expectedType === 'Object') {
	    valid = isPlainObject(value);
	  } else if (expectedType === 'Array') {
	    valid = Array.isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  }
	}

	/**
	 * Use function string name to check built-in types,
	 * because a simple equality check will fail when running
	 * across different vms / iframes.
	 */
	function getType (fn) {
	  var match = fn && fn.toString().match(/^\s*function (\w+)/);
	  return match && match[1]
	}

	function isBooleanType (fn) {
	  if (!Array.isArray(fn)) {
	    return getType(fn) === 'Boolean'
	  }
	  for (var i = 0, len = fn.length; i < len; i++) {
	    if (getType(fn[i]) === 'Boolean') {
	      return true
	    }
	  }
	  /* istanbul ignore next */
	  return false
	}



	var util = Object.freeze({
		defineReactive: defineReactive$$1,
		_toString: _toString,
		toNumber: toNumber,
		makeMap: makeMap,
		isBuiltInTag: isBuiltInTag,
		remove: remove$1,
		hasOwn: hasOwn,
		isPrimitive: isPrimitive,
		cached: cached,
		camelize: camelize,
		capitalize: capitalize,
		hyphenate: hyphenate,
		bind: bind$1,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		toObject: toObject,
		noop: noop,
		no: no,
		genStaticKeys: genStaticKeys,
		looseEqual: looseEqual,
		looseIndexOf: looseIndexOf,
		isReserved: isReserved,
		def: def,
		parsePath: parsePath,
		hasProto: hasProto,
		inBrowser: inBrowser,
		UA: UA,
		isIE: isIE,
		isIE9: isIE9,
		isEdge: isEdge,
		isAndroid: isAndroid,
		isIOS: isIOS,
		devtools: devtools,
		nextTick: nextTick,
		get _Set () { return _Set; },
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		get warn () { return warn; },
		get formatComponentName () { return formatComponentName; },
		validateProp: validateProp
	});

	/*  */

	function initUse (Vue) {
	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this
	  };
	}

	/*  */

	function initMixin$1 (Vue) {
	  Vue.mixin = function (mixin) {
	    Vue.options = mergeOptions(Vue.options, mixin);
	  };
	}

	/*  */

	function initExtend (Vue) {
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	  Vue.cid = 0;
	  var cid = 1;

	  /**
	   * Class inheritance
	   */
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var isFirstExtend = Super.cid === 0;
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor
	    }
	    var name = extendOptions.name || Super.options.name;
	    {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn(
	          'Invalid component name: "' + name + '". Component names ' +
	          'can only contain alphanumeric characaters and the hyphen.'
	        );
	        name = null;
	      }
	    }
	    var Sub = function VueComponent (options) {
	      this._init(options);
	    };
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(
	      Super.options,
	      extendOptions
	    );
	    Sub['super'] = Super;
	    // allow further extension
	    Sub.extend = Super.extend;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // keep a reference to the super options at extension time.
	    // later at instantiation we can check if Super's options have
	    // been updated.
	    Sub.superOptions = Super.options;
	    Sub.extendOptions = extendOptions;
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub;
	    }
	    return Sub
	  };
	}

	/*  */

	function initAssetRegisters (Vue) {
	  /**
	   * Create asset registration methods.
	   */
	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (
	      id,
	      definition
	    ) {
	      if (!definition) {
	        return this.options[type + 's'][id]
	      } else {
	        /* istanbul ignore if */
	        {
	          if (type === 'component' && config.isReservedTag(id)) {
	            warn(
	              'Do not use built-in or reserved HTML elements as component ' +
	              'id: ' + id
	            );
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = definition.name || id;
	          definition = Vue.extend(definition);
	        }
	        if (type === 'directive' && typeof definition === 'function') {
	          definition = { bind: definition, update: definition };
	        }
	        this.options[type + 's'][id] = definition;
	        return definition
	      }
	    };
	  });
	}

	var KeepAlive = {
	  name: 'keep-alive',
	  abstract: true,
	  created: function created () {
	    this.cache = Object.create(null);
	  },
	  render: function render () {
	    var vnode = getFirstComponentChild(this.$slots.default);
	    if (vnode && vnode.componentOptions) {
	      var opts = vnode.componentOptions;
	      var key = vnode.key == null
	        // same constructor may get registered as different local components
	        // so cid alone is not enough (#3269)
	        ? opts.Ctor.cid + '::' + opts.tag
	        : vnode.key;
	      if (this.cache[key]) {
	        vnode.child = this.cache[key].child;
	      } else {
	        this.cache[key] = vnode;
	      }
	      vnode.data.keepAlive = true;
	    }
	    return vnode
	  },
	  destroyed: function destroyed () {
	    var this$1 = this;

	    for (var key in this.cache) {
	      var vnode = this$1.cache[key];
	      callHook(vnode.child, 'deactivated');
	      vnode.child.$destroy();
	    }
	  }
	};

	var builtInComponents = {
	  KeepAlive: KeepAlive
	};

	/*  */

	function initGlobalAPI (Vue) {
	  // config
	  var configDef = {};
	  configDef.get = function () { return config; };
	  {
	    configDef.set = function () {
	      warn(
	        'Do not replace the Vue.config object, set individual fields instead.'
	      );
	    };
	  }
	  Object.defineProperty(Vue, 'config', configDef);
	  Vue.util = util;
	  Vue.set = set;
	  Vue.delete = del;
	  Vue.nextTick = nextTick;

	  Vue.options = Object.create(null);
	  config._assetTypes.forEach(function (type) {
	    Vue.options[type + 's'] = Object.create(null);
	  });

	  extend(Vue.options.components, builtInComponents);

	  initUse(Vue);
	  initMixin$1(Vue);
	  initExtend(Vue);
	  initAssetRegisters(Vue);
	}

	initGlobalAPI(Vue$3);

	Object.defineProperty(Vue$3.prototype, '$isServer', {
	  get: function () { return config._isServer; }
	});

	Vue$3.version = '2.0.3';

	/*  */

	// attributes that should be using props for binding
	var mustUseProp = makeMap('value,selected,checked,muted');

	var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

	var isBooleanAttr = makeMap(
	  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
	  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
	  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
	  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
	  'required,reversed,scoped,seamless,selected,sortable,translate,' +
	  'truespeed,typemustmatch,visible'
	);

	var isAttr = makeMap(
	  'accept,accept-charset,accesskey,action,align,alt,async,autocomplete,' +
	  'autofocus,autoplay,autosave,bgcolor,border,buffered,challenge,charset,' +
	  'checked,cite,class,code,codebase,color,cols,colspan,content,http-equiv,' +
	  'name,contenteditable,contextmenu,controls,coords,data,datetime,default,' +
	  'defer,dir,dirname,disabled,download,draggable,dropzone,enctype,method,for,' +
	  'form,formaction,headers,<th>,height,hidden,high,href,hreflang,http-equiv,' +
	  'icon,id,ismap,itemprop,keytype,kind,label,lang,language,list,loop,low,' +
	  'manifest,max,maxlength,media,method,GET,POST,min,multiple,email,file,' +
	  'muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,' +
	  'preload,radiogroup,readonly,rel,required,reversed,rows,rowspan,sandbox,' +
	  'scope,scoped,seamless,selected,shape,size,type,text,password,sizes,span,' +
	  'spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,' +
	  'target,title,type,usemap,value,width,wrap'
	);



	var xlinkNS = 'http://www.w3.org/1999/xlink';

	var isXlink = function (name) {
	  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
	};

	var getXlinkProp = function (name) {
	  return isXlink(name) ? name.slice(6, name.length) : ''
	};

	var isFalsyAttrValue = function (val) {
	  return val == null || val === false
	};

	/*  */

	function genClassForVnode (vnode) {
	  var data = vnode.data;
	  var parentNode = vnode;
	  var childNode = vnode;
	  while (childNode.child) {
	    childNode = childNode.child._vnode;
	    if (childNode.data) {
	      data = mergeClassData(childNode.data, data);
	    }
	  }
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data) {
	      data = mergeClassData(data, parentNode.data);
	    }
	  }
	  return genClassFromData(data)
	}

	function mergeClassData (child, parent) {
	  return {
	    staticClass: concat(child.staticClass, parent.staticClass),
	    class: child.class
	      ? [child.class, parent.class]
	      : parent.class
	  }
	}

	function genClassFromData (data) {
	  var dynamicClass = data.class;
	  var staticClass = data.staticClass;
	  if (staticClass || dynamicClass) {
	    return concat(staticClass, stringifyClass(dynamicClass))
	  }
	  /* istanbul ignore next */
	  return ''
	}

	function concat (a, b) {
	  return a ? b ? (a + ' ' + b) : a : (b || '')
	}

	function stringifyClass (value) {
	  var res = '';
	  if (!value) {
	    return res
	  }
	  if (typeof value === 'string') {
	    return value
	  }
	  if (Array.isArray(value)) {
	    var stringified;
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (value[i]) {
	        if ((stringified = stringifyClass(value[i]))) {
	          res += stringified + ' ';
	        }
	      }
	    }
	    return res.slice(0, -1)
	  }
	  if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) { res += key + ' '; }
	    }
	    return res.slice(0, -1)
	  }
	  /* istanbul ignore next */
	  return res
	}

	/*  */

	var namespaceMap = {
	  svg: 'http://www.w3.org/2000/svg',
	  math: 'http://www.w3.org/1998/Math/MathML'
	};

	var isHTMLTag = makeMap(
	  'html,body,base,head,link,meta,style,title,' +
	  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
	  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
	  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
	  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
	  'embed,object,param,source,canvas,script,noscript,del,ins,' +
	  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
	  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
	  'output,progress,select,textarea,' +
	  'details,dialog,menu,menuitem,summary,' +
	  'content,element,shadow,template'
	);

	var isUnaryTag = makeMap(
	  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
	  'link,meta,param,source,track,wbr',
	  true
	);

	// Elements that you can, intentionally, leave open
	// (and which close themselves)
	var canBeLeftOpenTag = makeMap(
	  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source',
	  true
	);

	// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
	// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
	var isNonPhrasingTag = makeMap(
	  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
	  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
	  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
	  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
	  'title,tr,track',
	  true
	);

	// this map is intentionally selective, only covering SVG elements that may
	// contain child elements.
	var isSVG = makeMap(
	  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font,' +
	  'font-face,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
	  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
	  true
	);

	var isPreTag = function (tag) { return tag === 'pre'; };

	var isReservedTag = function (tag) {
	  return isHTMLTag(tag) || isSVG(tag)
	};

	function getTagNamespace (tag) {
	  if (isSVG(tag)) {
	    return 'svg'
	  }
	  // basic support for MathML
	  // note it doesn't support other MathML elements being component roots
	  if (tag === 'math') {
	    return 'math'
	  }
	}

	var unknownElementCache = Object.create(null);
	function isUnknownElement (tag) {
	  /* istanbul ignore if */
	  if (!inBrowser) {
	    return true
	  }
	  if (isReservedTag(tag)) {
	    return false
	  }
	  tag = tag.toLowerCase();
	  /* istanbul ignore if */
	  if (unknownElementCache[tag] != null) {
	    return unknownElementCache[tag]
	  }
	  var el = document.createElement(tag);
	  if (tag.indexOf('-') > -1) {
	    // http://stackoverflow.com/a/28210364/1070244
	    return (unknownElementCache[tag] = (
	      el.constructor === window.HTMLUnknownElement ||
	      el.constructor === window.HTMLElement
	    ))
	  } else {
	    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
	  }
	}

	/*  */

	/**
	 * Query an element selector if it's not an element already.
	 */
	function query (el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      "development" !== 'production' && warn(
	        'Cannot find element: ' + selector
	      );
	      return document.createElement('div')
	    }
	  }
	  return el
	}

	/*  */

	function createElement$1 (tagName, vnode) {
	  var elm = document.createElement(tagName);
	  if (tagName !== 'select') {
	    return elm
	  }
	  if (vnode.data && vnode.data.attrs && 'multiple' in vnode.data.attrs) {
	    elm.setAttribute('multiple', 'multiple');
	  }
	  return elm
	}

	function createElementNS (namespace, tagName) {
	  return document.createElementNS(namespaceMap[namespace], tagName)
	}

	function createTextNode (text) {
	  return document.createTextNode(text)
	}

	function createComment (text) {
	  return document.createComment(text)
	}

	function insertBefore (parentNode, newNode, referenceNode) {
	  parentNode.insertBefore(newNode, referenceNode);
	}

	function removeChild (node, child) {
	  node.removeChild(child);
	}

	function appendChild (node, child) {
	  node.appendChild(child);
	}

	function parentNode (node) {
	  return node.parentNode
	}

	function nextSibling (node) {
	  return node.nextSibling
	}

	function tagName (node) {
	  return node.tagName
	}

	function setTextContent (node, text) {
	  node.textContent = text;
	}

	function childNodes (node) {
	  return node.childNodes
	}

	function setAttribute (node, key, val) {
	  node.setAttribute(key, val);
	}


	var nodeOps = Object.freeze({
		createElement: createElement$1,
		createElementNS: createElementNS,
		createTextNode: createTextNode,
		createComment: createComment,
		insertBefore: insertBefore,
		removeChild: removeChild,
		appendChild: appendChild,
		parentNode: parentNode,
		nextSibling: nextSibling,
		tagName: tagName,
		setTextContent: setTextContent,
		childNodes: childNodes,
		setAttribute: setAttribute
	});

	/*  */

	var ref = {
	  create: function create (_, vnode) {
	    registerRef(vnode);
	  },
	  update: function update (oldVnode, vnode) {
	    if (oldVnode.data.ref !== vnode.data.ref) {
	      registerRef(oldVnode, true);
	      registerRef(vnode);
	    }
	  },
	  destroy: function destroy (vnode) {
	    registerRef(vnode, true);
	  }
	};

	function registerRef (vnode, isRemoval) {
	  var key = vnode.data.ref;
	  if (!key) { return }

	  var vm = vnode.context;
	  var ref = vnode.child || vnode.elm;
	  var refs = vm.$refs;
	  if (isRemoval) {
	    if (Array.isArray(refs[key])) {
	      remove$1(refs[key], ref);
	    } else if (refs[key] === ref) {
	      refs[key] = undefined;
	    }
	  } else {
	    if (vnode.data.refInFor) {
	      if (Array.isArray(refs[key])) {
	        refs[key].push(ref);
	      } else {
	        refs[key] = [ref];
	      }
	    } else {
	      refs[key] = ref;
	    }
	  }
	}

	/**
	 * Virtual DOM patching algorithm based on Snabbdom by
	 * Simon Friis Vindum (@paldepind)
	 * Licensed under the MIT License
	 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
	 *
	 * modified by Evan You (@yyx990803)
	 *

	/*
	 * Not type-checking this because this file is perf-critical and the cost
	 * of making flow understand it is not worth it.
	 */

	var emptyNode = new VNode('', {}, []);

	var hooks$1 = ['create', 'update', 'remove', 'destroy'];

	function isUndef (s) {
	  return s == null
	}

	function isDef (s) {
	  return s != null
	}

	function sameVnode (vnode1, vnode2) {
	  return (
	    vnode1.key === vnode2.key &&
	    vnode1.tag === vnode2.tag &&
	    vnode1.isComment === vnode2.isComment &&
	    !vnode1.data === !vnode2.data
	  )
	}

	function createKeyToOldIdx (children, beginIdx, endIdx) {
	  var i, key;
	  var map = {};
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) { map[key] = i; }
	  }
	  return map
	}

	function createPatchFunction (backend) {
	  var i, j;
	  var cbs = {};

	  var modules = backend.modules;
	  var nodeOps = backend.nodeOps;

	  for (i = 0; i < hooks$1.length; ++i) {
	    cbs[hooks$1[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (modules[j][hooks$1[i]] !== undefined) { cbs[hooks$1[i]].push(modules[j][hooks$1[i]]); }
	    }
	  }

	  function emptyNodeAt (elm) {
	    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
	  }

	  function createRmCb (childElm, listeners) {
	    function remove$$1 () {
	      if (--remove$$1.listeners === 0) {
	        removeElement(childElm);
	      }
	    }
	    remove$$1.listeners = listeners;
	    return remove$$1
	  }

	  function removeElement (el) {
	    var parent = nodeOps.parentNode(el);
	    nodeOps.removeChild(parent, el);
	  }

	  function createElm (vnode, insertedVnodeQueue, nested) {
	    var i;
	    var data = vnode.data;
	    vnode.isRootInsert = !nested;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode); }
	      // after calling the init hook, if the vnode is a child component
	      // it should've created a child instance and mounted it. the child
	      // component also has set the placeholder vnode's elm.
	      // in that case we can just return the element and be done.
	      if (isDef(i = vnode.child)) {
	        initComponent(vnode, insertedVnodeQueue);
	        return vnode.elm
	      }
	    }
	    var children = vnode.children;
	    var tag = vnode.tag;
	    if (isDef(tag)) {
	      {
	        if (
	          !vnode.ns &&
	          !(config.ignoredElements && config.ignoredElements.indexOf(tag) > -1) &&
	          config.isUnknownElement(tag)
	        ) {
	          warn(
	            'Unknown custom element: <' + tag + '> - did you ' +
	            'register the component correctly? For recursive components, ' +
	            'make sure to provide the "name" option.',
	            vnode.context
	          );
	        }
	      }
	      vnode.elm = vnode.ns
	        ? nodeOps.createElementNS(vnode.ns, tag)
	        : nodeOps.createElement(tag, vnode);
	      setScope(vnode);
	      createChildren(vnode, children, insertedVnodeQueue);
	      if (isDef(data)) {
	        invokeCreateHooks(vnode, insertedVnodeQueue);
	      }
	    } else if (vnode.isComment) {
	      vnode.elm = nodeOps.createComment(vnode.text);
	    } else {
	      vnode.elm = nodeOps.createTextNode(vnode.text);
	    }
	    return vnode.elm
	  }

	  function createChildren (vnode, children, insertedVnodeQueue) {
	    if (Array.isArray(children)) {
	      for (var i = 0; i < children.length; ++i) {
	        nodeOps.appendChild(vnode.elm, createElm(children[i], insertedVnodeQueue, true));
	      }
	    } else if (isPrimitive(vnode.text)) {
	      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
	    }
	  }

	  function isPatchable (vnode) {
	    while (vnode.child) {
	      vnode = vnode.child._vnode;
	    }
	    return isDef(vnode.tag)
	  }

	  function invokeCreateHooks (vnode, insertedVnodeQueue) {
	    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	      cbs.create[i$1](emptyNode, vnode);
	    }
	    i = vnode.data.hook; // Reuse variable
	    if (isDef(i)) {
	      if (i.create) { i.create(emptyNode, vnode); }
	      if (i.insert) { insertedVnodeQueue.push(vnode); }
	    }
	  }

	  function initComponent (vnode, insertedVnodeQueue) {
	    if (vnode.data.pendingInsert) {
	      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
	    }
	    vnode.elm = vnode.child.$el;
	    if (isPatchable(vnode)) {
	      invokeCreateHooks(vnode, insertedVnodeQueue);
	      setScope(vnode);
	    } else {
	      // empty component root.
	      // skip all element-related modules except for ref (#3455)
	      registerRef(vnode);
	      // make sure to invoke the insert hook
	      insertedVnodeQueue.push(vnode);
	    }
	  }

	  // set scope id attribute for scoped CSS.
	  // this is implemented as a special case to avoid the overhead
	  // of going through the normal attribute patching process.
	  function setScope (vnode) {
	    var i;
	    if (isDef(i = vnode.context) && isDef(i = i.$options._scopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '');
	    }
	    if (isDef(i = activeInstance) &&
	        i !== vnode.context &&
	        isDef(i = i.$options._scopeId)) {
	      nodeOps.setAttribute(vnode.elm, i, '');
	    }
	  }

	  function addVnodes (parentElm, before, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      nodeOps.insertBefore(parentElm, createElm(vnodes[startIdx], insertedVnodeQueue), before);
	    }
	  }

	  function invokeDestroyHook (vnode) {
	    var i, j;
	    var data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
	      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
	    }
	    if (isDef(i = vnode.children)) {
	      for (j = 0; j < vnode.children.length; ++j) {
	        invokeDestroyHook(vnode.children[j]);
	      }
	    }
	  }

	  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.tag)) {
	          removeAndInvokeRemoveHook(ch);
	          invokeDestroyHook(ch);
	        } else { // Text node
	          nodeOps.removeChild(parentElm, ch.elm);
	        }
	      }
	    }
	  }

	  function removeAndInvokeRemoveHook (vnode, rm) {
	    if (rm || isDef(vnode.data)) {
	      var listeners = cbs.remove.length + 1;
	      if (!rm) {
	        // directly removing
	        rm = createRmCb(vnode.elm, listeners);
	      } else {
	        // we have a recursively passed down rm callback
	        // increase the listeners count
	        rm.listeners += listeners;
	      }
	      // recursively invoke hooks on child component root node
	      if (isDef(i = vnode.child) && isDef(i = i._vnode) && isDef(i.data)) {
	        removeAndInvokeRemoveHook(i, rm);
	      }
	      for (i = 0; i < cbs.remove.length; ++i) {
	        cbs.remove[i](vnode, rm);
	      }
	      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
	        i(vnode, rm);
	      } else {
	        rm();
	      }
	    } else {
	      removeElement(vnode.elm);
	    }
	  }

	  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
	    var oldStartIdx = 0;
	    var newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, elmToMove, before;

	    // removeOnly is a special flag used only by <transition-group>
	    // to ensure removed elements stay in correct relative positions
	    // during leaving transitions
	    var canMove = !removeOnly;

	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx];
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
	        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
	        if (isUndef(idxInOld)) { // New element
	          nodeOps.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          elmToMove = oldCh[idxInOld];
	          /* istanbul ignore if */
	          if ("development" !== 'production' && !elmToMove) {
	            warn(
	              'It seems there are duplicate keys that is causing an update error. ' +
	              'Make sure each v-for item has a unique key.'
	            );
	          }
	          if (elmToMove.tag !== newStartVnode.tag) {
	            // same key but different element. treat as new element
	            nodeOps.insertBefore(parentElm, createElm(newStartVnode, insertedVnodeQueue), oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          } else {
	            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	            oldCh[idxInOld] = undefined;
	            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          }
	        }
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      before = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
	      addVnodes(parentElm, before, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }

	  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
	    if (oldVnode === vnode) {
	      return
	    }
	    // reuse element for static trees.
	    // note we only do this if the vnode is cloned -
	    // if the new node is not cloned it means the render functions have been
	    // reset by the hot-reload-api and we need to do a proper re-render.
	    if (vnode.isStatic &&
	        oldVnode.isStatic &&
	        vnode.key === oldVnode.key &&
	        vnode.isCloned) {
	      vnode.elm = oldVnode.elm;
	      return
	    }
	    var i;
	    var data = vnode.data;
	    var hasData = isDef(data);
	    if (hasData && isDef(i = data.hook) && isDef(i = i.prepatch)) {
	      i(oldVnode, vnode);
	    }
	    var elm = vnode.elm = oldVnode.elm;
	    var oldCh = oldVnode.children;
	    var ch = vnode.children;
	    if (hasData && isPatchable(vnode)) {
	      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
	      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        nodeOps.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      nodeOps.setTextContent(elm, vnode.text);
	    }
	    if (hasData) {
	      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
	    }
	  }

	  function invokeInsertHook (vnode, queue, initial) {
	    // delay insert hooks for component root nodes, invoke them after the
	    // element is really inserted
	    if (initial && vnode.parent) {
	      vnode.parent.data.pendingInsert = queue;
	    } else {
	      for (var i = 0; i < queue.length; ++i) {
	        queue[i].data.hook.insert(queue[i]);
	      }
	    }
	  }

	  var bailed = false;
	  function hydrate (elm, vnode, insertedVnodeQueue) {
	    {
	      if (!assertNodeMatch(elm, vnode)) {
	        return false
	      }
	    }
	    vnode.elm = elm;
	    var tag = vnode.tag;
	    var data = vnode.data;
	    var children = vnode.children;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
	      if (isDef(i = vnode.child)) {
	        // child component. it should have hydrated its own tree.
	        initComponent(vnode, insertedVnodeQueue);
	        return true
	      }
	    }
	    if (isDef(tag)) {
	      if (isDef(children)) {
	        var childNodes = nodeOps.childNodes(elm);
	        // empty element, allow client to pick up and populate children
	        if (!childNodes.length) {
	          createChildren(vnode, children, insertedVnodeQueue);
	        } else {
	          var childrenMatch = true;
	          if (childNodes.length !== children.length) {
	            childrenMatch = false;
	          } else {
	            for (var i$1 = 0; i$1 < children.length; i$1++) {
	              if (!hydrate(childNodes[i$1], children[i$1], insertedVnodeQueue)) {
	                childrenMatch = false;
	                break
	              }
	            }
	          }
	          if (!childrenMatch) {
	            if ("development" !== 'production' &&
	                typeof console !== 'undefined' &&
	                !bailed) {
	              bailed = true;
	              console.warn('Parent: ', elm);
	              console.warn('Mismatching childNodes vs. VNodes: ', childNodes, children);
	            }
	            return false
	          }
	        }
	      }
	      if (isDef(data)) {
	        invokeCreateHooks(vnode, insertedVnodeQueue);
	      }
	    }
	    return true
	  }

	  function assertNodeMatch (node, vnode) {
	    if (vnode.tag) {
	      return (
	        vnode.tag.indexOf('vue-component') === 0 ||
	        vnode.tag === nodeOps.tagName(node).toLowerCase()
	      )
	    } else {
	      return _toString(vnode.text) === node.data
	    }
	  }

	  return function patch (oldVnode, vnode, hydrating, removeOnly) {
	    if (!vnode) {
	      if (oldVnode) { invokeDestroyHook(oldVnode); }
	      return
	    }

	    var elm, parent;
	    var isInitialPatch = false;
	    var insertedVnodeQueue = [];

	    if (!oldVnode) {
	      // empty mount, create new root element
	      isInitialPatch = true;
	      createElm(vnode, insertedVnodeQueue);
	    } else {
	      var isRealElement = isDef(oldVnode.nodeType);
	      if (!isRealElement && sameVnode(oldVnode, vnode)) {
	        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
	      } else {
	        if (isRealElement) {
	          // mounting to a real element
	          // check if this is server-rendered content and if we can perform
	          // a successful hydration.
	          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
	            oldVnode.removeAttribute('server-rendered');
	            hydrating = true;
	          }
	          if (hydrating) {
	            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
	              invokeInsertHook(vnode, insertedVnodeQueue, true);
	              return oldVnode
	            } else {
	              warn(
	                'The client-side rendered virtual DOM tree is not matching ' +
	                'server-rendered content. This is likely caused by incorrect ' +
	                'HTML markup, for example nesting block-level elements inside ' +
	                '<p>, or missing <tbody>. Bailing hydration and performing ' +
	                'full client-side render.'
	              );
	            }
	          }
	          // either not server-rendered, or hydration failed.
	          // create an empty node and replace it
	          oldVnode = emptyNodeAt(oldVnode);
	        }
	        elm = oldVnode.elm;
	        parent = nodeOps.parentNode(elm);

	        createElm(vnode, insertedVnodeQueue);

	        // component root element replaced.
	        // update parent placeholder node element.
	        if (vnode.parent) {
	          vnode.parent.elm = vnode.elm;
	          if (isPatchable(vnode)) {
	            for (var i = 0; i < cbs.create.length; ++i) {
	              cbs.create[i](emptyNode, vnode.parent);
	            }
	          }
	        }

	        if (parent !== null) {
	          nodeOps.insertBefore(parent, vnode.elm, nodeOps.nextSibling(elm));
	          removeVnodes(parent, [oldVnode], 0, 0);
	        } else if (isDef(oldVnode.tag)) {
	          invokeDestroyHook(oldVnode);
	        }
	      }
	    }

	    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
	    return vnode.elm
	  }
	}

	/*  */

	var directives = {
	  create: updateDirectives,
	  update: updateDirectives,
	  destroy: function unbindDirectives (vnode) {
	    updateDirectives(vnode, emptyNode);
	  }
	};

	function updateDirectives (
	  oldVnode,
	  vnode
	) {
	  if (!oldVnode.data.directives && !vnode.data.directives) {
	    return
	  }
	  var isCreate = oldVnode === emptyNode;
	  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
	  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

	  var dirsWithInsert = [];
	  var dirsWithPostpatch = [];

	  var key, oldDir, dir;
	  for (key in newDirs) {
	    oldDir = oldDirs[key];
	    dir = newDirs[key];
	    if (!oldDir) {
	      // new directive, bind
	      callHook$1(dir, 'bind', vnode, oldVnode);
	      if (dir.def && dir.def.inserted) {
	        dirsWithInsert.push(dir);
	      }
	    } else {
	      // existing directive, update
	      dir.oldValue = oldDir.value;
	      callHook$1(dir, 'update', vnode, oldVnode);
	      if (dir.def && dir.def.componentUpdated) {
	        dirsWithPostpatch.push(dir);
	      }
	    }
	  }

	  if (dirsWithInsert.length) {
	    var callInsert = function () {
	      dirsWithInsert.forEach(function (dir) {
	        callHook$1(dir, 'inserted', vnode, oldVnode);
	      });
	    };
	    if (isCreate) {
	      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert, 'dir-insert');
	    } else {
	      callInsert();
	    }
	  }

	  if (dirsWithPostpatch.length) {
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
	      dirsWithPostpatch.forEach(function (dir) {
	        callHook$1(dir, 'componentUpdated', vnode, oldVnode);
	      });
	    }, 'dir-postpatch');
	  }

	  if (!isCreate) {
	    for (key in oldDirs) {
	      if (!newDirs[key]) {
	        // no longer present, unbind
	        callHook$1(oldDirs[key], 'unbind', oldVnode);
	      }
	    }
	  }
	}

	var emptyModifiers = Object.create(null);

	function normalizeDirectives$1 (
	  dirs,
	  vm
	) {
	  var res = Object.create(null);
	  if (!dirs) {
	    return res
	  }
	  var i, dir;
	  for (i = 0; i < dirs.length; i++) {
	    dir = dirs[i];
	    if (!dir.modifiers) {
	      dir.modifiers = emptyModifiers;
	    }
	    res[getRawDirName(dir)] = dir;
	    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
	  }
	  return res
	}

	function getRawDirName (dir) {
	  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
	}

	function callHook$1 (dir, hook, vnode, oldVnode) {
	  var fn = dir.def && dir.def[hook];
	  if (fn) {
	    fn(vnode.elm, dir, vnode, oldVnode);
	  }
	}

	var baseModules = [
	  ref,
	  directives
	];

	/*  */

	function updateAttrs (oldVnode, vnode) {
	  if (!oldVnode.data.attrs && !vnode.data.attrs) {
	    return
	  }
	  var key, cur, old;
	  var elm = vnode.elm;
	  var oldAttrs = oldVnode.data.attrs || {};
	  var attrs = vnode.data.attrs || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (attrs.__ob__) {
	    attrs = vnode.data.attrs = extend({}, attrs);
	  }

	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      setAttr(elm, key, cur);
	    }
	  }
	  for (key in oldAttrs) {
	    if (attrs[key] == null) {
	      if (isXlink(key)) {
	        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
	      } else if (!isEnumeratedAttr(key)) {
	        elm.removeAttribute(key);
	      }
	    }
	  }
	}

	function setAttr (el, key, value) {
	  if (isBooleanAttr(key)) {
	    // set attribute for blank value
	    // e.g. <option disabled>Select one</option>
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, key);
	    }
	  } else if (isEnumeratedAttr(key)) {
	    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
	  } else if (isXlink(key)) {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
	    } else {
	      el.setAttributeNS(xlinkNS, key, value);
	    }
	  } else {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, value);
	    }
	  }
	}

	var attrs = {
	  create: updateAttrs,
	  update: updateAttrs
	};

	/*  */

	function updateClass (oldVnode, vnode) {
	  var el = vnode.elm;
	  var data = vnode.data;
	  var oldData = oldVnode.data;
	  if (!data.staticClass && !data.class &&
	      (!oldData || (!oldData.staticClass && !oldData.class))) {
	    return
	  }

	  var cls = genClassForVnode(vnode);

	  // handle transition classes
	  var transitionClass = el._transitionClasses;
	  if (transitionClass) {
	    cls = concat(cls, stringifyClass(transitionClass));
	  }

	  // set the class
	  if (cls !== el._prevClass) {
	    el.setAttribute('class', cls);
	    el._prevClass = cls;
	  }
	}

	var klass = {
	  create: updateClass,
	  update: updateClass
	};

	// skip type checking this file because we need to attach private properties
	// to elements

	function updateDOMListeners (oldVnode, vnode) {
	  if (!oldVnode.data.on && !vnode.data.on) {
	    return
	  }
	  var on = vnode.data.on || {};
	  var oldOn = oldVnode.data.on || {};
	  var add = vnode.elm._v_add || (vnode.elm._v_add = function (event, handler, capture) {
	    vnode.elm.addEventListener(event, handler, capture);
	  });
	  var remove = vnode.elm._v_remove || (vnode.elm._v_remove = function (event, handler) {
	    vnode.elm.removeEventListener(event, handler);
	  });
	  updateListeners(on, oldOn, add, remove, vnode.context);
	}

	var events = {
	  create: updateDOMListeners,
	  update: updateDOMListeners
	};

	/*  */

	function updateDOMProps (oldVnode, vnode) {
	  if (!oldVnode.data.domProps && !vnode.data.domProps) {
	    return
	  }
	  var key, cur;
	  var elm = vnode.elm;
	  var oldProps = oldVnode.data.domProps || {};
	  var props = vnode.data.domProps || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (props.__ob__) {
	    props = vnode.data.domProps = extend({}, props);
	  }

	  for (key in oldProps) {
	    if (props[key] == null) {
	      elm[key] = undefined;
	    }
	  }
	  for (key in props) {
	    // ignore children if the node has textContent or innerHTML,
	    // as these will throw away existing DOM nodes and cause removal errors
	    // on subsequent patches (#3360)
	    if ((key === 'textContent' || key === 'innerHTML') && vnode.children) {
	      vnode.children.length = 0;
	    }
	    cur = props[key];
	    if (key === 'value') {
	      // store value as _value as well since
	      // non-string values will be stringified
	      elm._value = cur;
	      // avoid resetting cursor position when value is the same
	      var strCur = cur == null ? '' : String(cur);
	      if (elm.value !== strCur && !elm.composing) {
	        elm.value = strCur;
	      }
	    } else {
	      elm[key] = cur;
	    }
	  }
	}

	var domProps = {
	  create: updateDOMProps,
	  update: updateDOMProps
	};

	/*  */

	var prefixes = ['Webkit', 'Moz', 'ms'];

	var testEl;
	var normalize = cached(function (prop) {
	  testEl = testEl || document.createElement('div');
	  prop = camelize(prop);
	  if (prop !== 'filter' && (prop in testEl.style)) {
	    return prop
	  }
	  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
	  for (var i = 0; i < prefixes.length; i++) {
	    var prefixed = prefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return prefixed
	    }
	  }
	});

	function updateStyle (oldVnode, vnode) {
	  if ((!oldVnode.data || !oldVnode.data.style) && !vnode.data.style) {
	    return
	  }
	  var cur, name;
	  var el = vnode.elm;
	  var oldStyle = oldVnode.data.style || {};
	  var style = vnode.data.style || {};

	  // handle string
	  if (typeof style === 'string') {
	    el.style.cssText = style;
	    return
	  }

	  var needClone = style.__ob__;

	  // handle array syntax
	  if (Array.isArray(style)) {
	    style = vnode.data.style = toObject(style);
	  }

	  // clone the style for future updates,
	  // in case the user mutates the style object in-place.
	  if (needClone) {
	    style = vnode.data.style = extend({}, style);
	  }

	  for (name in oldStyle) {
	    if (style[name] == null) {
	      el.style[normalize(name)] = '';
	    }
	  }
	  for (name in style) {
	    cur = style[name];
	    if (cur !== oldStyle[name]) {
	      // ie9 setting to null has no effect, must use empty string
	      el.style[normalize(name)] = cur == null ? '' : cur;
	    }
	  }
	}

	var style = {
	  create: updateStyle,
	  update: updateStyle
	};

	/*  */

	/**
	 * Add class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function addClass (el, cls) {
	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
	    } else {
	      el.classList.add(cls);
	    }
	  } else {
	    var cur = ' ' + el.getAttribute('class') + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim());
	    }
	  }
	}

	/**
	 * Remove class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function removeClass (el, cls) {
	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
	    } else {
	      el.classList.remove(cls);
	    }
	  } else {
	    var cur = ' ' + el.getAttribute('class') + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    el.setAttribute('class', cur.trim());
	  }
	}

	/*  */

	var hasTransition = inBrowser && !isIE9;
	var TRANSITION = 'transition';
	var ANIMATION = 'animation';

	// Transition property/event sniffing
	var transitionProp = 'transition';
	var transitionEndEvent = 'transitionend';
	var animationProp = 'animation';
	var animationEndEvent = 'animationend';
	if (hasTransition) {
	  /* istanbul ignore if */
	  if (window.ontransitionend === undefined &&
	    window.onwebkittransitionend !== undefined) {
	    transitionProp = 'WebkitTransition';
	    transitionEndEvent = 'webkitTransitionEnd';
	  }
	  if (window.onanimationend === undefined &&
	    window.onwebkitanimationend !== undefined) {
	    animationProp = 'WebkitAnimation';
	    animationEndEvent = 'webkitAnimationEnd';
	  }
	}

	var raf = (inBrowser && window.requestAnimationFrame) || setTimeout;
	function nextFrame (fn) {
	  raf(function () {
	    raf(fn);
	  });
	}

	function addTransitionClass (el, cls) {
	  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
	  addClass(el, cls);
	}

	function removeTransitionClass (el, cls) {
	  if (el._transitionClasses) {
	    remove$1(el._transitionClasses, cls);
	  }
	  removeClass(el, cls);
	}

	function whenTransitionEnds (
	  el,
	  expectedType,
	  cb
	) {
	  var ref = getTransitionInfo(el, expectedType);
	  var type = ref.type;
	  var timeout = ref.timeout;
	  var propCount = ref.propCount;
	  if (!type) { return cb() }
	  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
	  var ended = 0;
	  var end = function () {
	    el.removeEventListener(event, onEnd);
	    cb();
	  };
	  var onEnd = function (e) {
	    if (e.target === el) {
	      if (++ended >= propCount) {
	        end();
	      }
	    }
	  };
	  setTimeout(function () {
	    if (ended < propCount) {
	      end();
	    }
	  }, timeout + 1);
	  el.addEventListener(event, onEnd);
	}

	var transformRE = /\b(transform|all)(,|$)/;

	function getTransitionInfo (el, expectedType) {
	  var styles = window.getComputedStyle(el);
	  var transitioneDelays = styles[transitionProp + 'Delay'].split(', ');
	  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
	  var transitionTimeout = getTimeout(transitioneDelays, transitionDurations);
	  var animationDelays = styles[animationProp + 'Delay'].split(', ');
	  var animationDurations = styles[animationProp + 'Duration'].split(', ');
	  var animationTimeout = getTimeout(animationDelays, animationDurations);

	  var type;
	  var timeout = 0;
	  var propCount = 0;
	  /* istanbul ignore if */
	  if (expectedType === TRANSITION) {
	    if (transitionTimeout > 0) {
	      type = TRANSITION;
	      timeout = transitionTimeout;
	      propCount = transitionDurations.length;
	    }
	  } else if (expectedType === ANIMATION) {
	    if (animationTimeout > 0) {
	      type = ANIMATION;
	      timeout = animationTimeout;
	      propCount = animationDurations.length;
	    }
	  } else {
	    timeout = Math.max(transitionTimeout, animationTimeout);
	    type = timeout > 0
	      ? transitionTimeout > animationTimeout
	        ? TRANSITION
	        : ANIMATION
	      : null;
	    propCount = type
	      ? type === TRANSITION
	        ? transitionDurations.length
	        : animationDurations.length
	      : 0;
	  }
	  var hasTransform =
	    type === TRANSITION &&
	    transformRE.test(styles[transitionProp + 'Property']);
	  return {
	    type: type,
	    timeout: timeout,
	    propCount: propCount,
	    hasTransform: hasTransform
	  }
	}

	function getTimeout (delays, durations) {
	  return Math.max.apply(null, durations.map(function (d, i) {
	    return toMs(d) + toMs(delays[i])
	  }))
	}

	function toMs (s) {
	  return Number(s.slice(0, -1)) * 1000
	}

	/*  */

	function enter (vnode) {
	  var el = vnode.elm;

	  // call leave callback now
	  if (el._leaveCb) {
	    el._leaveCb.cancelled = true;
	    el._leaveCb();
	  }

	  var data = resolveTransition(vnode.data.transition);
	  if (!data) {
	    return
	  }

	  /* istanbul ignore if */
	  if (el._enterCb || el.nodeType !== 1) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var enterClass = data.enterClass;
	  var enterActiveClass = data.enterActiveClass;
	  var appearClass = data.appearClass;
	  var appearActiveClass = data.appearActiveClass;
	  var beforeEnter = data.beforeEnter;
	  var enter = data.enter;
	  var afterEnter = data.afterEnter;
	  var enterCancelled = data.enterCancelled;
	  var beforeAppear = data.beforeAppear;
	  var appear = data.appear;
	  var afterAppear = data.afterAppear;
	  var appearCancelled = data.appearCancelled;

	  // activeInstance will always be the <transition> component managing this
	  // transition. One edge case to check is when the <transition> is placed
	  // as the root node of a child component. In that case we need to check
	  // <transition>'s parent for appear check.
	  var transitionNode = activeInstance.$vnode;
	  var context = transitionNode && transitionNode.parent
	    ? transitionNode.parent.context
	    : activeInstance;

	  var isAppear = !context._isMounted || !vnode.isRootInsert;

	  if (isAppear && !appear && appear !== '') {
	    return
	  }

	  var startClass = isAppear ? appearClass : enterClass;
	  var activeClass = isAppear ? appearActiveClass : enterActiveClass;
	  var beforeEnterHook = isAppear ? (beforeAppear || beforeEnter) : beforeEnter;
	  var enterHook = isAppear ? (typeof appear === 'function' ? appear : enter) : enter;
	  var afterEnterHook = isAppear ? (afterAppear || afterEnter) : afterEnter;
	  var enterCancelledHook = isAppear ? (appearCancelled || enterCancelled) : enterCancelled;

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl =
	    enterHook &&
	    // enterHook may be a bound method which exposes
	    // the length of original fn as _length
	    (enterHook._length || enterHook.length) > 1;

	  var cb = el._enterCb = once(function () {
	    if (expectsCSS) {
	      removeTransitionClass(el, activeClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, startClass);
	      }
	      enterCancelledHook && enterCancelledHook(el);
	    } else {
	      afterEnterHook && afterEnterHook(el);
	    }
	    el._enterCb = null;
	  });

	  if (!vnode.data.show) {
	    // remove pending leave element on enter by injecting an insert hook
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
	      var parent = el.parentNode;
	      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
	      if (pendingNode && pendingNode.tag === vnode.tag && pendingNode.elm._leaveCb) {
	        pendingNode.elm._leaveCb();
	      }
	      enterHook && enterHook(el, cb);
	    }, 'transition-insert');
	  }

	  // start enter transition
	  beforeEnterHook && beforeEnterHook(el);
	  if (expectsCSS) {
	    addTransitionClass(el, startClass);
	    addTransitionClass(el, activeClass);
	    nextFrame(function () {
	      removeTransitionClass(el, startClass);
	      if (!cb.cancelled && !userWantsControl) {
	        whenTransitionEnds(el, type, cb);
	      }
	    });
	  }

	  if (vnode.data.show) {
	    enterHook && enterHook(el, cb);
	  }

	  if (!expectsCSS && !userWantsControl) {
	    cb();
	  }
	}

	function leave (vnode, rm) {
	  var el = vnode.elm;

	  // call enter callback now
	  if (el._enterCb) {
	    el._enterCb.cancelled = true;
	    el._enterCb();
	  }

	  var data = resolveTransition(vnode.data.transition);
	  if (!data) {
	    return rm()
	  }

	  /* istanbul ignore if */
	  if (el._leaveCb || el.nodeType !== 1) {
	    return
	  }

	  var css = data.css;
	  var type = data.type;
	  var leaveClass = data.leaveClass;
	  var leaveActiveClass = data.leaveActiveClass;
	  var beforeLeave = data.beforeLeave;
	  var leave = data.leave;
	  var afterLeave = data.afterLeave;
	  var leaveCancelled = data.leaveCancelled;
	  var delayLeave = data.delayLeave;

	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl =
	    leave &&
	    // leave hook may be a bound method which exposes
	    // the length of original fn as _length
	    (leave._length || leave.length) > 1;

	  var cb = el._leaveCb = once(function () {
	    if (el.parentNode && el.parentNode._pending) {
	      el.parentNode._pending[vnode.key] = null;
	    }
	    if (expectsCSS) {
	      removeTransitionClass(el, leaveActiveClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, leaveClass);
	      }
	      leaveCancelled && leaveCancelled(el);
	    } else {
	      rm();
	      afterLeave && afterLeave(el);
	    }
	    el._leaveCb = null;
	  });

	  if (delayLeave) {
	    delayLeave(performLeave);
	  } else {
	    performLeave();
	  }

	  function performLeave () {
	    // the delayed leave may have already been cancelled
	    if (cb.cancelled) {
	      return
	    }
	    // record leaving element
	    if (!vnode.data.show) {
	      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
	    }
	    beforeLeave && beforeLeave(el);
	    if (expectsCSS) {
	      addTransitionClass(el, leaveClass);
	      addTransitionClass(el, leaveActiveClass);
	      nextFrame(function () {
	        removeTransitionClass(el, leaveClass);
	        if (!cb.cancelled && !userWantsControl) {
	          whenTransitionEnds(el, type, cb);
	        }
	      });
	    }
	    leave && leave(el, cb);
	    if (!expectsCSS && !userWantsControl) {
	      cb();
	    }
	  }
	}

	function resolveTransition (def$$1) {
	  if (!def$$1) {
	    return
	  }
	  /* istanbul ignore else */
	  if (typeof def$$1 === 'object') {
	    var res = {};
	    if (def$$1.css !== false) {
	      extend(res, autoCssTransition(def$$1.name || 'v'));
	    }
	    extend(res, def$$1);
	    return res
	  } else if (typeof def$$1 === 'string') {
	    return autoCssTransition(def$$1)
	  }
	}

	var autoCssTransition = cached(function (name) {
	  return {
	    enterClass: (name + "-enter"),
	    leaveClass: (name + "-leave"),
	    appearClass: (name + "-enter"),
	    enterActiveClass: (name + "-enter-active"),
	    leaveActiveClass: (name + "-leave-active"),
	    appearActiveClass: (name + "-enter-active")
	  }
	});

	function once (fn) {
	  var called = false;
	  return function () {
	    if (!called) {
	      called = true;
	      fn();
	    }
	  }
	}

	var transition = inBrowser ? {
	  create: function create (_, vnode) {
	    if (!vnode.data.show) {
	      enter(vnode);
	    }
	  },
	  remove: function remove (vnode, rm) {
	    /* istanbul ignore else */
	    if (!vnode.data.show) {
	      leave(vnode, rm);
	    } else {
	      rm();
	    }
	  }
	} : {};

	var platformModules = [
	  attrs,
	  klass,
	  events,
	  domProps,
	  style,
	  transition
	];

	/*  */

	// the directive module should be applied last, after all
	// built-in modules have been applied.
	var modules = platformModules.concat(baseModules);

	var patch$1 = createPatchFunction({ nodeOps: nodeOps, modules: modules });

	/**
	 * Not type checking this file because flow doesn't like attaching
	 * properties to Elements.
	 */

	var modelableTagRE = /^input|select|textarea|vue-component-[0-9]+(-[0-9a-zA-Z_\-]*)?$/;

	/* istanbul ignore if */
	if (isIE9) {
	  // http://www.matts411.com/post/internet-explorer-9-oninput/
	  document.addEventListener('selectionchange', function () {
	    var el = document.activeElement;
	    if (el && el.vmodel) {
	      trigger(el, 'input');
	    }
	  });
	}

	var model = {
	  inserted: function inserted (el, binding, vnode) {
	    {
	      if (!modelableTagRE.test(vnode.tag)) {
	        warn(
	          "v-model is not supported on element type: <" + (vnode.tag) + ">. " +
	          'If you are working with contenteditable, it\'s recommended to ' +
	          'wrap a library dedicated for that purpose inside a custom component.',
	          vnode.context
	        );
	      }
	    }
	    if (vnode.tag === 'select') {
	      var cb = function () {
	        setSelected(el, binding, vnode.context);
	      };
	      cb();
	      /* istanbul ignore if */
	      if (isIE || isEdge) {
	        setTimeout(cb, 0);
	      }
	    } else if (
	      (vnode.tag === 'textarea' || el.type === 'text') &&
	      !binding.modifiers.lazy
	    ) {
	      if (!isAndroid) {
	        el.addEventListener('compositionstart', onCompositionStart);
	        el.addEventListener('compositionend', onCompositionEnd);
	      }
	      /* istanbul ignore if */
	      if (isIE9) {
	        el.vmodel = true;
	      }
	    }
	  },
	  componentUpdated: function componentUpdated (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      setSelected(el, binding, vnode.context);
	      // in case the options rendered by v-for have changed,
	      // it's possible that the value is out-of-sync with the rendered options.
	      // detect such cases and filter out values that no longer has a matchig
	      // option in the DOM.
	      var needReset = el.multiple
	        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
	        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
	      if (needReset) {
	        trigger(el, 'change');
	      }
	    }
	  }
	};

	function setSelected (el, binding, vm) {
	  var value = binding.value;
	  var isMultiple = el.multiple;
	  if (isMultiple && !Array.isArray(value)) {
	    "development" !== 'production' && warn(
	      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
	      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
	      vm
	    );
	    return
	  }
	  var selected, option;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    option = el.options[i];
	    if (isMultiple) {
	      selected = looseIndexOf(value, getValue(option)) > -1;
	      if (option.selected !== selected) {
	        option.selected = selected;
	      }
	    } else {
	      if (looseEqual(getValue(option), value)) {
	        if (el.selectedIndex !== i) {
	          el.selectedIndex = i;
	        }
	        return
	      }
	    }
	  }
	  if (!isMultiple) {
	    el.selectedIndex = -1;
	  }
	}

	function hasNoMatchingOption (value, options) {
	  for (var i = 0, l = options.length; i < l; i++) {
	    if (looseEqual(getValue(options[i]), value)) {
	      return false
	    }
	  }
	  return true
	}

	function getValue (option) {
	  return '_value' in option
	    ? option._value
	    : option.value
	}

	function onCompositionStart (e) {
	  e.target.composing = true;
	}

	function onCompositionEnd (e) {
	  e.target.composing = false;
	  trigger(e.target, 'input');
	}

	function trigger (el, type) {
	  var e = document.createEvent('HTMLEvents');
	  e.initEvent(type, true, true);
	  el.dispatchEvent(e);
	}

	/*  */

	// recursively search for possible transition defined inside the component root
	function locateNode (vnode) {
	  return vnode.child && (!vnode.data || !vnode.data.transition)
	    ? locateNode(vnode.child._vnode)
	    : vnode
	}

	var show = {
	  bind: function bind (el, ref, vnode) {
	    var value = ref.value;

	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    if (value && transition && !isIE9) {
	      enter(vnode);
	    }
	    var originalDisplay = el.style.display === 'none' ? '' : el.style.display;
	    el.style.display = value ? originalDisplay : 'none';
	    el.__vOriginalDisplay = originalDisplay;
	  },
	  update: function update (el, ref, vnode) {
	    var value = ref.value;
	    var oldValue = ref.oldValue;

	    /* istanbul ignore if */
	    if (value === oldValue) { return }
	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    if (transition && !isIE9) {
	      if (value) {
	        enter(vnode);
	        el.style.display = el.__vOriginalDisplay;
	      } else {
	        leave(vnode, function () {
	          el.style.display = 'none';
	        });
	      }
	    } else {
	      el.style.display = value ? el.__vOriginalDisplay : 'none';
	    }
	  }
	};

	var platformDirectives = {
	  model: model,
	  show: show
	};

	/*  */

	// Provides transition support for a single element/component.
	// supports transition mode (out-in / in-out)

	var transitionProps = {
	  name: String,
	  appear: Boolean,
	  css: Boolean,
	  mode: String,
	  type: String,
	  enterClass: String,
	  leaveClass: String,
	  enterActiveClass: String,
	  leaveActiveClass: String,
	  appearClass: String,
	  appearActiveClass: String
	};

	// in case the child is also an abstract component, e.g. <keep-alive>
	// we want to recrusively retrieve the real component to be rendered
	function getRealChild (vnode) {
	  var compOptions = vnode && vnode.componentOptions;
	  if (compOptions && compOptions.Ctor.options.abstract) {
	    return getRealChild(getFirstComponentChild(compOptions.children))
	  } else {
	    return vnode
	  }
	}

	function extractTransitionData (comp) {
	  var data = {};
	  var options = comp.$options;
	  // props
	  for (var key in options.propsData) {
	    data[key] = comp[key];
	  }
	  // events.
	  // extract listeners and pass them directly to the transition methods
	  var listeners = options._parentListeners;
	  for (var key$1 in listeners) {
	    data[camelize(key$1)] = listeners[key$1].fn;
	  }
	  return data
	}

	function placeholder (h, rawChild) {
	  return /\d-keep-alive$/.test(rawChild.tag)
	    ? h('keep-alive')
	    : null
	}

	function hasParentTransition (vnode) {
	  while ((vnode = vnode.parent)) {
	    if (vnode.data.transition) {
	      return true
	    }
	  }
	}

	var Transition = {
	  name: 'transition',
	  props: transitionProps,
	  abstract: true,
	  render: function render (h) {
	    var this$1 = this;

	    var children = this.$slots.default;
	    if (!children) {
	      return
	    }

	    // filter out text nodes (possible whitespaces)
	    children = children.filter(function (c) { return c.tag; });
	    /* istanbul ignore if */
	    if (!children.length) {
	      return
	    }

	    // warn multiple elements
	    if ("development" !== 'production' && children.length > 1) {
	      warn(
	        '<transition> can only be used on a single element. Use ' +
	        '<transition-group> for lists.',
	        this.$parent
	      );
	    }

	    var mode = this.mode;

	    // warn invalid mode
	    if ("development" !== 'production' &&
	        mode && mode !== 'in-out' && mode !== 'out-in') {
	      warn(
	        'invalid <transition> mode: ' + mode,
	        this.$parent
	      );
	    }

	    var rawChild = children[0];

	    // if this is a component root node and the component's
	    // parent container node also has transition, skip.
	    if (hasParentTransition(this.$vnode)) {
	      return rawChild
	    }

	    // apply transition data to child
	    // use getRealChild() to ignore abstract components e.g. keep-alive
	    var child = getRealChild(rawChild);
	    /* istanbul ignore if */
	    if (!child) {
	      return rawChild
	    }

	    if (this._leaving) {
	      return placeholder(h, rawChild)
	    }

	    var key = child.key = child.key == null || child.isStatic
	      ? ("__v" + (child.tag + this._uid) + "__")
	      : child.key;
	    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
	    var oldRawChild = this._vnode;
	    var oldChild = getRealChild(oldRawChild);

	    // mark v-show
	    // so that the transition module can hand over the control to the directive
	    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
	      child.data.show = true;
	    }

	    if (oldChild && oldChild.data && oldChild.key !== key) {
	      // replace old child transition data with fresh one
	      // important for dynamic transitions!
	      var oldData = oldChild.data.transition = extend({}, data);

	      // handle transition mode
	      if (mode === 'out-in') {
	        // return placeholder node and queue update when leave finishes
	        this._leaving = true;
	        mergeVNodeHook(oldData, 'afterLeave', function () {
	          this$1._leaving = false;
	          this$1.$forceUpdate();
	        }, key);
	        return placeholder(h, rawChild)
	      } else if (mode === 'in-out') {
	        var delayedLeave;
	        var performLeave = function () { delayedLeave(); };
	        mergeVNodeHook(data, 'afterEnter', performLeave, key);
	        mergeVNodeHook(data, 'enterCancelled', performLeave, key);
	        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
	          delayedLeave = leave;
	        }, key);
	      }
	    }

	    return rawChild
	  }
	};

	/*  */

	// Provides transition support for list items.
	// supports move transitions using the FLIP technique.

	// Because the vdom's children update algorithm is "unstable" - i.e.
	// it doesn't guarantee the relative positioning of removed elements,
	// we force transition-group to update its children into two passes:
	// in the first pass, we remove all nodes that need to be removed,
	// triggering their leaving transition; in the second pass, we insert/move
	// into the final disired state. This way in the second pass removed
	// nodes will remain where they should be.

	var props = extend({
	  tag: String,
	  moveClass: String
	}, transitionProps);

	delete props.mode;

	var TransitionGroup = {
	  props: props,

	  render: function render (h) {
	    var tag = this.tag || this.$vnode.data.tag || 'span';
	    var map = Object.create(null);
	    var prevChildren = this.prevChildren = this.children;
	    var rawChildren = this.$slots.default || [];
	    var children = this.children = [];
	    var transitionData = extractTransitionData(this);

	    for (var i = 0; i < rawChildren.length; i++) {
	      var c = rawChildren[i];
	      if (c.tag) {
	        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
	          children.push(c);
	          map[c.key] = c
	          ;(c.data || (c.data = {})).transition = transitionData;
	        } else {
	          var opts = c.componentOptions;
	          var name = opts
	            ? (opts.Ctor.options.name || opts.tag)
	            : c.tag;
	          warn(("<transition-group> children must be keyed: <" + name + ">"));
	        }
	      }
	    }

	    if (prevChildren) {
	      var kept = [];
	      var removed = [];
	      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
	        var c$1 = prevChildren[i$1];
	        c$1.data.transition = transitionData;
	        c$1.data.pos = c$1.elm.getBoundingClientRect();
	        if (map[c$1.key]) {
	          kept.push(c$1);
	        } else {
	          removed.push(c$1);
	        }
	      }
	      this.kept = h(tag, null, kept);
	      this.removed = removed;
	    }

	    return h(tag, null, children)
	  },

	  beforeUpdate: function beforeUpdate () {
	    // force removing pass
	    this.__patch__(
	      this._vnode,
	      this.kept,
	      false, // hydrating
	      true // removeOnly (!important, avoids unnecessary moves)
	    );
	    this._vnode = this.kept;
	  },

	  updated: function updated () {
	    var children = this.prevChildren;
	    var moveClass = this.moveClass || (this.name + '-move');
	    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
	      return
	    }

	    // we divide the work into three loops to avoid mixing DOM reads and writes
	    // in each iteration - which helps prevent layout thrashing.
	    children.forEach(callPendingCbs);
	    children.forEach(recordPosition);
	    children.forEach(applyTranslation);

	    // force reflow to put everything in position
	    var f = document.body.offsetHeight; // eslint-disable-line

	    children.forEach(function (c) {
	      if (c.data.moved) {
	        var el = c.elm;
	        var s = el.style;
	        addTransitionClass(el, moveClass);
	        s.transform = s.WebkitTransform = s.transitionDuration = '';
	        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
	          if (!e || /transform$/.test(e.propertyName)) {
	            el.removeEventListener(transitionEndEvent, cb);
	            el._moveCb = null;
	            removeTransitionClass(el, moveClass);
	          }
	        });
	      }
	    });
	  },

	  methods: {
	    hasMove: function hasMove (el, moveClass) {
	      /* istanbul ignore if */
	      if (!hasTransition) {
	        return false
	      }
	      if (this._hasMove != null) {
	        return this._hasMove
	      }
	      addTransitionClass(el, moveClass);
	      var info = getTransitionInfo(el);
	      removeTransitionClass(el, moveClass);
	      return (this._hasMove = info.hasTransform)
	    }
	  }
	};

	function callPendingCbs (c) {
	  /* istanbul ignore if */
	  if (c.elm._moveCb) {
	    c.elm._moveCb();
	  }
	  /* istanbul ignore if */
	  if (c.elm._enterCb) {
	    c.elm._enterCb();
	  }
	}

	function recordPosition (c) {
	  c.data.newPos = c.elm.getBoundingClientRect();
	}

	function applyTranslation (c) {
	  var oldPos = c.data.pos;
	  var newPos = c.data.newPos;
	  var dx = oldPos.left - newPos.left;
	  var dy = oldPos.top - newPos.top;
	  if (dx || dy) {
	    c.data.moved = true;
	    var s = c.elm.style;
	    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
	    s.transitionDuration = '0s';
	  }
	}

	var platformComponents = {
	  Transition: Transition,
	  TransitionGroup: TransitionGroup
	};

	/*  */

	// install platform specific utils
	Vue$3.config.isUnknownElement = isUnknownElement;
	Vue$3.config.isReservedTag = isReservedTag;
	Vue$3.config.getTagNamespace = getTagNamespace;
	Vue$3.config.mustUseProp = mustUseProp;

	// install platform runtime directives & components
	extend(Vue$3.options.directives, platformDirectives);
	extend(Vue$3.options.components, platformComponents);

	// install platform patch function
	Vue$3.prototype.__patch__ = config._isServer ? noop : patch$1;

	// wrap mount
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && !config._isServer ? query(el) : undefined;
	  return this._mount(el, hydrating)
	};

	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue$3);
	    } else if (
	      "development" !== 'production' &&
	      inBrowser && /Chrome\/\d+/.test(window.navigator.userAgent)
	    ) {
	      console.log(
	        'Download the Vue Devtools for a better development experience:\n' +
	        'https://github.com/vuejs/vue-devtools'
	      );
	    }
	  }
	}, 0);

	/*  */

	// check whether current browser encodes a char inside attribute values
	function shouldDecode (content, encoded) {
	  var div = document.createElement('div');
	  div.innerHTML = "<div a=\"" + content + "\">";
	  return div.innerHTML.indexOf(encoded) > 0
	}

	// #3663
	// IE encodes newlines inside attribute values while other browsers don't
	var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;

	/*  */

	var decoder = document.createElement('div');

	function decode (html) {
	  decoder.innerHTML = html;
	  return decoder.textContent
	}

	/**
	 * Not type-checking this file because it's mostly vendor code.
	 */

	/*!
	 * HTML Parser By John Resig (ejohn.org)
	 * Modified by Juriy "kangax" Zaytsev
	 * Original code by Erik Arvidsson, Mozilla Public License
	 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
	 */

	// Regular Expressions for parsing tags and attributes
	var singleAttrIdentifier = /([^\s"'<>\/=]+)/;
	var singleAttrAssign = /(?:=)/;
	var singleAttrValues = [
	  // attr value double quotes
	  /"([^"]*)"+/.source,
	  // attr value, single quotes
	  /'([^']*)'+/.source,
	  // attr value, no quotes
	  /([^\s"'=<>`]+)/.source
	];
	var attribute = new RegExp(
	  '^\\s*' + singleAttrIdentifier.source +
	  '(?:\\s*(' + singleAttrAssign.source + ')' +
	  '\\s*(?:' + singleAttrValues.join('|') + '))?'
	);

	// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
	// but for Vue templates we can enforce a simple charset
	var ncname = '[a-zA-Z_][\\w\\-\\.]*';
	var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
	var startTagOpen = new RegExp('^<' + qnameCapture);
	var startTagClose = /^\s*(\/?)>/;
	var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
	var doctype = /^<!DOCTYPE [^>]+>/i;

	var IS_REGEX_CAPTURING_BROKEN = false;
	'x'.replace(/x(.)?/g, function (m, g) {
	  IS_REGEX_CAPTURING_BROKEN = g === '';
	});

	// Special Elements (can contain anything)
	var isSpecialTag = makeMap('script,style', true);

	var reCache = {};

	var ltRE = /&lt;/g;
	var gtRE = /&gt;/g;
	var nlRE = /&#10;/g;
	var ampRE = /&amp;/g;
	var quoteRE = /&quot;/g;

	function decodeAttr (value, shouldDecodeNewlines) {
	  if (shouldDecodeNewlines) {
	    value = value.replace(nlRE, '\n');
	  }
	  return value
	    .replace(ltRE, '<')
	    .replace(gtRE, '>')
	    .replace(ampRE, '&')
	    .replace(quoteRE, '"')
	}

	function parseHTML (html, options) {
	  var stack = [];
	  var expectHTML = options.expectHTML;
	  var isUnaryTag$$1 = options.isUnaryTag || no;
	  var index = 0;
	  var last, lastTag;
	  while (html) {
	    last = html;
	    // Make sure we're not in a script or style element
	    if (!lastTag || !isSpecialTag(lastTag)) {
	      var textEnd = html.indexOf('<');
	      if (textEnd === 0) {
	        // Comment:
	        if (/^<!--/.test(html)) {
	          var commentEnd = html.indexOf('-->');

	          if (commentEnd >= 0) {
	            advance(commentEnd + 3);
	            continue
	          }
	        }

	        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
	        if (/^<!\[/.test(html)) {
	          var conditionalEnd = html.indexOf(']>');

	          if (conditionalEnd >= 0) {
	            advance(conditionalEnd + 2);
	            continue
	          }
	        }

	        // Doctype:
	        var doctypeMatch = html.match(doctype);
	        if (doctypeMatch) {
	          advance(doctypeMatch[0].length);
	          continue
	        }

	        // End tag:
	        var endTagMatch = html.match(endTag);
	        if (endTagMatch) {
	          var curIndex = index;
	          advance(endTagMatch[0].length);
	          parseEndTag(endTagMatch[0], endTagMatch[1], curIndex, index);
	          continue
	        }

	        // Start tag:
	        var startTagMatch = parseStartTag();
	        if (startTagMatch) {
	          handleStartTag(startTagMatch);
	          continue
	        }
	      }

	      var text = void 0;
	      if (textEnd >= 0) {
	        text = html.substring(0, textEnd);
	        advance(textEnd);
	      } else {
	        text = html;
	        html = '';
	      }

	      if (options.chars) {
	        options.chars(text);
	      }
	    } else {
	      var stackedTag = lastTag.toLowerCase();
	      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
	      var endTagLength = 0;
	      var rest = html.replace(reStackedTag, function (all, text, endTag) {
	        endTagLength = endTag.length;
	        if (stackedTag !== 'script' && stackedTag !== 'style' && stackedTag !== 'noscript') {
	          text = text
	            .replace(/<!--([\s\S]*?)-->/g, '$1')
	            .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1');
	        }
	        if (options.chars) {
	          options.chars(text);
	        }
	        return ''
	      });
	      index += html.length - rest.length;
	      html = rest;
	      parseEndTag('</' + stackedTag + '>', stackedTag, index - endTagLength, index);
	    }

	    if (html === last) {
	      throw new Error('Error parsing template:\n\n' + html)
	    }
	  }

	  // Clean up any remaining tags
	  parseEndTag();

	  function advance (n) {
	    index += n;
	    html = html.substring(n);
	  }

	  function parseStartTag () {
	    var start = html.match(startTagOpen);
	    if (start) {
	      var match = {
	        tagName: start[1],
	        attrs: [],
	        start: index
	      };
	      advance(start[0].length);
	      var end, attr;
	      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
	        advance(attr[0].length);
	        match.attrs.push(attr);
	      }
	      if (end) {
	        match.unarySlash = end[1];
	        advance(end[0].length);
	        match.end = index;
	        return match
	      }
	    }
	  }

	  function handleStartTag (match) {
	    var tagName = match.tagName;
	    var unarySlash = match.unarySlash;

	    if (expectHTML) {
	      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
	        parseEndTag('', lastTag);
	      }
	      if (canBeLeftOpenTag(tagName) && lastTag === tagName) {
	        parseEndTag('', tagName);
	      }
	    }

	    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;

	    var l = match.attrs.length;
	    var attrs = new Array(l);
	    for (var i = 0; i < l; i++) {
	      var args = match.attrs[i];
	      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
	      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
	        if (args[3] === '') { delete args[3]; }
	        if (args[4] === '') { delete args[4]; }
	        if (args[5] === '') { delete args[5]; }
	      }
	      var value = args[3] || args[4] || args[5] || '';
	      attrs[i] = {
	        name: args[1],
	        value: decodeAttr(
	          value,
	          options.shouldDecodeNewlines
	        )
	      };
	    }

	    if (!unary) {
	      stack.push({ tag: tagName, attrs: attrs });
	      lastTag = tagName;
	      unarySlash = '';
	    }

	    if (options.start) {
	      options.start(tagName, attrs, unary, match.start, match.end);
	    }
	  }

	  function parseEndTag (tag, tagName, start, end) {
	    var pos;
	    if (start == null) { start = index; }
	    if (end == null) { end = index; }

	    // Find the closest opened tag of the same type
	    if (tagName) {
	      var needle = tagName.toLowerCase();
	      for (pos = stack.length - 1; pos >= 0; pos--) {
	        if (stack[pos].tag.toLowerCase() === needle) {
	          break
	        }
	      }
	    } else {
	      // If no tag name is provided, clean shop
	      pos = 0;
	    }

	    if (pos >= 0) {
	      // Close all the open elements, up the stack
	      for (var i = stack.length - 1; i >= pos; i--) {
	        if (options.end) {
	          options.end(stack[i].tag, start, end);
	        }
	      }

	      // Remove the open elements from the stack
	      stack.length = pos;
	      lastTag = pos && stack[pos - 1].tag;
	    } else if (tagName.toLowerCase() === 'br') {
	      if (options.start) {
	        options.start(tagName, [], true, start, end);
	      }
	    } else if (tagName.toLowerCase() === 'p') {
	      if (options.start) {
	        options.start(tagName, [], false, start, end);
	      }
	      if (options.end) {
	        options.end(tagName, start, end);
	      }
	    }
	  }
	}

	/*  */

	function parseFilters (exp) {
	  var inSingle = false;
	  var inDouble = false;
	  var curly = 0;
	  var square = 0;
	  var paren = 0;
	  var lastFilterIndex = 0;
	  var c, prev, i, expression, filters;

	  for (i = 0; i < exp.length; i++) {
	    prev = c;
	    c = exp.charCodeAt(i);
	    if (inSingle) {
	      // check single quote
	      if (c === 0x27 && prev !== 0x5C) { inSingle = !inSingle; }
	    } else if (inDouble) {
	      // check double quote
	      if (c === 0x22 && prev !== 0x5C) { inDouble = !inDouble; }
	    } else if (
	      c === 0x7C && // pipe
	      exp.charCodeAt(i + 1) !== 0x7C &&
	      exp.charCodeAt(i - 1) !== 0x7C &&
	      !curly && !square && !paren
	    ) {
	      if (expression === undefined) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        expression = exp.slice(0, i).trim();
	      } else {
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22: inDouble = true; break // "
	        case 0x27: inSingle = true; break // '
	        case 0x28: paren++; break         // (
	        case 0x29: paren--; break         // )
	        case 0x5B: square++; break        // [
	        case 0x5D: square--; break        // ]
	        case 0x7B: curly++; break         // {
	        case 0x7D: curly--; break         // }
	      }
	    }
	  }

	  if (expression === undefined) {
	    expression = exp.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }

	  function pushFilter () {
	    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
	    lastFilterIndex = i + 1;
	  }

	  if (filters) {
	    for (i = 0; i < filters.length; i++) {
	      expression = wrapFilter(expression, filters[i]);
	    }
	  }

	  return expression
	}

	function wrapFilter (exp, filter) {
	  var i = filter.indexOf('(');
	  if (i < 0) {
	    // _f: resolveFilter
	    return ("_f(\"" + filter + "\")(" + exp + ")")
	  } else {
	    var name = filter.slice(0, i);
	    var args = filter.slice(i + 1);
	    return ("_f(\"" + name + "\")(" + exp + "," + args)
	  }
	}

	/*  */

	var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;

	var buildRegex = cached(function (delimiters) {
	  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
	  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
	  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
	});

	function parseText (
	  text,
	  delimiters
	) {
	  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
	  if (!tagRE.test(text)) {
	    return
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index;
	  while ((match = tagRE.exec(text))) {
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
	    }
	    // tag token
	    var exp = parseFilters(match[1].trim());
	    tokens.push(("_s(" + exp + ")"));
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push(JSON.stringify(text.slice(lastIndex)));
	  }
	  return tokens.join('+')
	}

	/*  */

	function baseWarn (msg) {
	  console.error(("[Vue parser]: " + msg));
	}

	function pluckModuleFunction (
	  modules,
	  key
	) {
	  return modules
	    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
	    : []
	}

	function addProp (el, name, value) {
	  (el.props || (el.props = [])).push({ name: name, value: value });
	}

	function addAttr (el, name, value) {
	  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
	}

	function addDirective (
	  el,
	  name,
	  rawName,
	  value,
	  arg,
	  modifiers
	) {
	  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
	}

	function addHandler (
	  el,
	  name,
	  value,
	  modifiers,
	  important
	) {
	  // check capture modifier
	  if (modifiers && modifiers.capture) {
	    delete modifiers.capture;
	    name = '!' + name; // mark the event as captured
	  }
	  var events;
	  if (modifiers && modifiers.native) {
	    delete modifiers.native;
	    events = el.nativeEvents || (el.nativeEvents = {});
	  } else {
	    events = el.events || (el.events = {});
	  }
	  var newHandler = { value: value, modifiers: modifiers };
	  var handlers = events[name];
	  /* istanbul ignore if */
	  if (Array.isArray(handlers)) {
	    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
	  } else if (handlers) {
	    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
	  } else {
	    events[name] = newHandler;
	  }
	}

	function getBindingAttr (
	  el,
	  name,
	  getStatic
	) {
	  var dynamicValue =
	    getAndRemoveAttr(el, ':' + name) ||
	    getAndRemoveAttr(el, 'v-bind:' + name);
	  if (dynamicValue != null) {
	    return dynamicValue
	  } else if (getStatic !== false) {
	    var staticValue = getAndRemoveAttr(el, name);
	    if (staticValue != null) {
	      return JSON.stringify(staticValue)
	    }
	  }
	}

	function getAndRemoveAttr (el, name) {
	  var val;
	  if ((val = el.attrsMap[name]) != null) {
	    var list = el.attrsList;
	    for (var i = 0, l = list.length; i < l; i++) {
	      if (list[i].name === name) {
	        list.splice(i, 1);
	        break
	      }
	    }
	  }
	  return val
	}

	/*  */

	var dirRE = /^v-|^@|^:/;
	var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
	var forIteratorRE = /\(([^,]*),([^,]*)(?:,([^,]*))?\)/;
	var bindRE = /^:|^v-bind:/;
	var onRE = /^@|^v-on:/;
	var argRE = /:(.*)$/;
	var modifierRE = /\.[^\.]+/g;
	var specialNewlineRE = /\u2028|\u2029/g;

	var decodeHTMLCached = cached(decode);

	// configurable state
	var warn$1;
	var platformGetTagNamespace;
	var platformMustUseProp;
	var platformIsPreTag;
	var preTransforms;
	var transforms;
	var postTransforms;
	var delimiters;

	/**
	 * Convert HTML string to AST.
	 */
	function parse (
	  template,
	  options
	) {
	  warn$1 = options.warn || baseWarn;
	  platformGetTagNamespace = options.getTagNamespace || no;
	  platformMustUseProp = options.mustUseProp || no;
	  platformIsPreTag = options.isPreTag || no;
	  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
	  transforms = pluckModuleFunction(options.modules, 'transformNode');
	  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
	  delimiters = options.delimiters;
	  var stack = [];
	  var preserveWhitespace = options.preserveWhitespace !== false;
	  var root;
	  var currentParent;
	  var inVPre = false;
	  var inPre = false;
	  var warned = false;
	  parseHTML(template, {
	    expectHTML: options.expectHTML,
	    isUnaryTag: options.isUnaryTag,
	    shouldDecodeNewlines: options.shouldDecodeNewlines,
	    start: function start (tag, attrs, unary) {
	      // check namespace.
	      // inherit parent ns if there is one
	      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);

	      // handle IE svg bug
	      /* istanbul ignore if */
	      if (options.isIE && ns === 'svg') {
	        attrs = guardIESVGBug(attrs);
	      }

	      var element = {
	        type: 1,
	        tag: tag,
	        attrsList: attrs,
	        attrsMap: makeAttrsMap(attrs, options.isIE),
	        parent: currentParent,
	        children: []
	      };
	      if (ns) {
	        element.ns = ns;
	      }

	      if ("client" !== 'server' && isForbiddenTag(element)) {
	        element.forbidden = true;
	        "development" !== 'production' && warn$1(
	          'Templates should only be responsible for mapping the state to the ' +
	          'UI. Avoid placing tags with side-effects in your templates, such as ' +
	          "<" + tag + ">."
	        );
	      }

	      // apply pre-transforms
	      for (var i = 0; i < preTransforms.length; i++) {
	        preTransforms[i](element, options);
	      }

	      if (!inVPre) {
	        processPre(element);
	        if (element.pre) {
	          inVPre = true;
	        }
	      }
	      if (platformIsPreTag(element.tag)) {
	        inPre = true;
	      }
	      if (inVPre) {
	        processRawAttrs(element);
	      } else {
	        processFor(element);
	        processIf(element);
	        processOnce(element);
	        processKey(element);

	        // determine whether this is a plain element after
	        // removing structural attributes
	        element.plain = !element.key && !attrs.length;

	        processRef(element);
	        processSlot(element);
	        processComponent(element);
	        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
	          transforms[i$1](element, options);
	        }
	        processAttrs(element);
	      }

	      function checkRootConstraints (el) {
	        {
	          if (el.tag === 'slot' || el.tag === 'template') {
	            warn$1(
	              "Cannot use <" + (el.tag) + "> as component root element because it may " +
	              'contain multiple nodes:\n' + template
	            );
	          }
	          if (el.attrsMap.hasOwnProperty('v-for')) {
	            warn$1(
	              'Cannot use v-for on stateful component root element because ' +
	              'it renders multiple elements:\n' + template
	            );
	          }
	        }
	      }

	      // tree management
	      if (!root) {
	        root = element;
	        checkRootConstraints(root);
	      } else if ("development" !== 'production' && !stack.length && !warned) {
	        // allow 2 root elements with v-if and v-else
	        if (root.if && element.else) {
	          checkRootConstraints(element);
	          root.elseBlock = element;
	        } else {
	          warned = true;
	          warn$1(
	            ("Component template should contain exactly one root element:\n\n" + template)
	          );
	        }
	      }
	      if (currentParent && !element.forbidden) {
	        if (element.else) {
	          processElse(element, currentParent);
	        } else {
	          currentParent.children.push(element);
	          element.parent = currentParent;
	        }
	      }
	      if (!unary) {
	        currentParent = element;
	        stack.push(element);
	      }
	      // apply post-transforms
	      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
	        postTransforms[i$2](element, options);
	      }
	    },

	    end: function end () {
	      // remove trailing whitespace
	      var element = stack[stack.length - 1];
	      var lastNode = element.children[element.children.length - 1];
	      if (lastNode && lastNode.type === 3 && lastNode.text === ' ') {
	        element.children.pop();
	      }
	      // pop stack
	      stack.length -= 1;
	      currentParent = stack[stack.length - 1];
	      // check pre state
	      if (element.pre) {
	        inVPre = false;
	      }
	      if (platformIsPreTag(element.tag)) {
	        inPre = false;
	      }
	    },

	    chars: function chars (text) {
	      if (!currentParent) {
	        if ("development" !== 'production' && !warned && text === template) {
	          warned = true;
	          warn$1(
	            'Component template requires a root element, rather than just text:\n\n' + template
	          );
	        }
	        return
	      }
	      text = inPre || text.trim()
	        ? decodeHTMLCached(text)
	        // only preserve whitespace if its not right after a starting tag
	        : preserveWhitespace && currentParent.children.length ? ' ' : '';
	      if (text) {
	        var expression;
	        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
	          currentParent.children.push({
	            type: 2,
	            expression: expression,
	            text: text
	          });
	        } else {
	          // #3895 special character
	          text = text.replace(specialNewlineRE, '');
	          currentParent.children.push({
	            type: 3,
	            text: text
	          });
	        }
	      }
	    }
	  });
	  return root
	}

	function processPre (el) {
	  if (getAndRemoveAttr(el, 'v-pre') != null) {
	    el.pre = true;
	  }
	}

	function processRawAttrs (el) {
	  var l = el.attrsList.length;
	  if (l) {
	    var attrs = el.attrs = new Array(l);
	    for (var i = 0; i < l; i++) {
	      attrs[i] = {
	        name: el.attrsList[i].name,
	        value: JSON.stringify(el.attrsList[i].value)
	      };
	    }
	  } else if (!el.pre) {
	    // non root node in pre blocks with no attributes
	    el.plain = true;
	  }
	}

	function processKey (el) {
	  var exp = getBindingAttr(el, 'key');
	  if (exp) {
	    if ("development" !== 'production' && el.tag === 'template') {
	      warn$1("<template> cannot be keyed. Place the key on real elements instead.");
	    }
	    el.key = exp;
	  }
	}

	function processRef (el) {
	  var ref = getBindingAttr(el, 'ref');
	  if (ref) {
	    el.ref = ref;
	    el.refInFor = checkInFor(el);
	  }
	}

	function processFor (el) {
	  var exp;
	  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
	    var inMatch = exp.match(forAliasRE);
	    if (!inMatch) {
	      "development" !== 'production' && warn$1(
	        ("Invalid v-for expression: " + exp)
	      );
	      return
	    }
	    el.for = inMatch[2].trim();
	    var alias = inMatch[1].trim();
	    var iteratorMatch = alias.match(forIteratorRE);
	    if (iteratorMatch) {
	      el.alias = iteratorMatch[1].trim();
	      el.iterator1 = iteratorMatch[2].trim();
	      if (iteratorMatch[3]) {
	        el.iterator2 = iteratorMatch[3].trim();
	      }
	    } else {
	      el.alias = alias;
	    }
	  }
	}

	function processIf (el) {
	  var exp = getAndRemoveAttr(el, 'v-if');
	  if (exp) {
	    el.if = exp;
	  }
	  if (getAndRemoveAttr(el, 'v-else') != null) {
	    el.else = true;
	  }
	}

	function processElse (el, parent) {
	  var prev = findPrevElement(parent.children);
	  if (prev && prev.if) {
	    prev.elseBlock = el;
	  } else {
	    warn$1(
	      ("v-else used on element <" + (el.tag) + "> without corresponding v-if.")
	    );
	  }
	}

	function processOnce (el) {
	  var once = getAndRemoveAttr(el, 'v-once');
	  if (once != null) {
	    el.once = true;
	  }
	}

	function processSlot (el) {
	  if (el.tag === 'slot') {
	    el.slotName = getBindingAttr(el, 'name');
	  } else {
	    var slotTarget = getBindingAttr(el, 'slot');
	    if (slotTarget) {
	      el.slotTarget = slotTarget;
	    }
	  }
	}

	function processComponent (el) {
	  var binding;
	  if ((binding = getBindingAttr(el, 'is'))) {
	    el.component = binding;
	  }
	  if (getAndRemoveAttr(el, 'inline-template') != null) {
	    el.inlineTemplate = true;
	  }
	}

	function processAttrs (el) {
	  var list = el.attrsList;
	  var i, l, name, rawName, value, arg, modifiers, isProp;
	  for (i = 0, l = list.length; i < l; i++) {
	    name = rawName = list[i].name;
	    value = list[i].value;
	    if (dirRE.test(name)) {
	      // mark element as dynamic
	      el.hasBindings = true;
	      // modifiers
	      modifiers = parseModifiers(name);
	      if (modifiers) {
	        name = name.replace(modifierRE, '');
	      }
	      if (bindRE.test(name)) { // v-bind
	        name = name.replace(bindRE, '');
	        if (modifiers && modifiers.prop) {
	          isProp = true;
	          name = camelize(name);
	          if (name === 'innerHtml') { name = 'innerHTML'; }
	        }
	        if (isProp || platformMustUseProp(name)) {
	          addProp(el, name, value);
	        } else {
	          addAttr(el, name, value);
	        }
	      } else if (onRE.test(name)) { // v-on
	        name = name.replace(onRE, '');
	        addHandler(el, name, value, modifiers);
	      } else { // normal directives
	        name = name.replace(dirRE, '');
	        // parse arg
	        var argMatch = name.match(argRE);
	        if (argMatch && (arg = argMatch[1])) {
	          name = name.slice(0, -(arg.length + 1));
	        }
	        addDirective(el, name, rawName, value, arg, modifiers);
	        if ("development" !== 'production' && name === 'model') {
	          checkForAliasModel(el, value);
	        }
	      }
	    } else {
	      // literal attribute
	      {
	        var expression = parseText(value, delimiters);
	        if (expression) {
	          warn$1(
	            name + "=\"" + value + "\": " +
	            'Interpolation inside attributes has been deprecated. ' +
	            'Use v-bind or the colon shorthand instead.'
	          );
	        }
	      }
	      addAttr(el, name, JSON.stringify(value));
	    }
	  }
	}

	function checkInFor (el) {
	  var parent = el;
	  while (parent) {
	    if (parent.for !== undefined) {
	      return true
	    }
	    parent = parent.parent;
	  }
	  return false
	}

	function parseModifiers (name) {
	  var match = name.match(modifierRE);
	  if (match) {
	    var ret = {};
	    match.forEach(function (m) { ret[m.slice(1)] = true; });
	    return ret
	  }
	}

	function makeAttrsMap (attrs, isIE) {
	  var map = {};
	  for (var i = 0, l = attrs.length; i < l; i++) {
	    if ("development" !== 'production' && map[attrs[i].name] && !isIE) {
	      warn$1('duplicate attribute: ' + attrs[i].name);
	    }
	    map[attrs[i].name] = attrs[i].value;
	  }
	  return map
	}

	function findPrevElement (children) {
	  var i = children.length;
	  while (i--) {
	    if (children[i].tag) { return children[i] }
	  }
	}

	function isForbiddenTag (el) {
	  return (
	    el.tag === 'style' ||
	    (el.tag === 'script' && (
	      !el.attrsMap.type ||
	      el.attrsMap.type === 'text/javascript'
	    ))
	  )
	}

	var ieNSBug = /^xmlns:NS\d+/;
	var ieNSPrefix = /^NS\d+:/;

	/* istanbul ignore next */
	function guardIESVGBug (attrs) {
	  var res = [];
	  for (var i = 0; i < attrs.length; i++) {
	    var attr = attrs[i];
	    if (!ieNSBug.test(attr.name)) {
	      attr.name = attr.name.replace(ieNSPrefix, '');
	      res.push(attr);
	    }
	  }
	  return res
	}

	function checkForAliasModel (el, value) {
	  var _el = el;
	  while (_el) {
	    if (_el.for && _el.alias === value) {
	      warn$1(
	        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
	        "You are binding v-model directly to a v-for iteration alias. " +
	        "This will not be able to modify the v-for source array because " +
	        "writing to the alias is like modifying a function local variable. " +
	        "Consider using an array of objects and use v-model on an object property instead."
	      );
	    }
	    _el = _el.parent;
	  }
	}

	/*  */

	var isStaticKey;
	var isPlatformReservedTag;

	var genStaticKeysCached = cached(genStaticKeys$1);

	/**
	 * Goal of the optimizier: walk the generated template AST tree
	 * and detect sub-trees that are purely static, i.e. parts of
	 * the DOM that never needs to change.
	 *
	 * Once we detect these sub-trees, we can:
	 *
	 * 1. Hoist them into constants, so that we no longer need to
	 *    create fresh nodes for them on each re-render;
	 * 2. Completely skip them in the patching process.
	 */
	function optimize (root, options) {
	  if (!root) { return }
	  isStaticKey = genStaticKeysCached(options.staticKeys || '');
	  isPlatformReservedTag = options.isReservedTag || (function () { return false; });
	  // first pass: mark all non-static nodes.
	  markStatic(root);
	  // second pass: mark static roots.
	  markStaticRoots(root, false);
	}

	function genStaticKeys$1 (keys) {
	  return makeMap(
	    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
	    (keys ? ',' + keys : '')
	  )
	}

	function markStatic (node) {
	  node.static = isStatic(node);
	  if (node.type === 1) {
	    for (var i = 0, l = node.children.length; i < l; i++) {
	      var child = node.children[i];
	      markStatic(child);
	      if (!child.static) {
	        node.static = false;
	      }
	    }
	  }
	}

	function markStaticRoots (node, isInFor) {
	  if (node.type === 1) {
	    if (node.once || node.static) {
	      node.staticRoot = true;
	      node.staticInFor = isInFor;
	      return
	    }
	    if (node.children) {
	      for (var i = 0, l = node.children.length; i < l; i++) {
	        markStaticRoots(node.children[i], isInFor || !!node.for);
	      }
	    }
	  }
	}

	function isStatic (node) {
	  if (node.type === 2) { // expression
	    return false
	  }
	  if (node.type === 3) { // text
	    return true
	  }
	  return !!(node.pre || (
	    !node.hasBindings && // no dynamic bindings
	    !node.if && !node.for && // not v-if or v-for or v-else
	    !isBuiltInTag(node.tag) && // not a built-in
	    isPlatformReservedTag(node.tag) && // not a component
	    !isDirectChildOfTemplateFor(node) &&
	    Object.keys(node).every(isStaticKey)
	  ))
	}

	function isDirectChildOfTemplateFor (node) {
	  while (node.parent) {
	    node = node.parent;
	    if (node.tag !== 'template') {
	      return false
	    }
	    if (node.for) {
	      return true
	    }
	  }
	  return false
	}

	/*  */

	var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*\s*$/;

	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40,
	  'delete': [8, 46]
	};

	var modifierCode = {
	  stop: '$event.stopPropagation();',
	  prevent: '$event.preventDefault();',
	  self: 'if($event.target !== $event.currentTarget)return;'
	};

	function genHandlers (events, native) {
	  var res = native ? 'nativeOn:{' : 'on:{';
	  for (var name in events) {
	    res += "\"" + name + "\":" + (genHandler(events[name])) + ",";
	  }
	  return res.slice(0, -1) + '}'
	}

	function genHandler (
	  handler
	) {
	  if (!handler) {
	    return 'function(){}'
	  } else if (Array.isArray(handler)) {
	    return ("[" + (handler.map(genHandler).join(',')) + "]")
	  } else if (!handler.modifiers) {
	    return simplePathRE.test(handler.value)
	      ? handler.value
	      : ("function($event){" + (handler.value) + "}")
	  } else {
	    var code = '';
	    var keys = [];
	    for (var key in handler.modifiers) {
	      if (modifierCode[key]) {
	        code += modifierCode[key];
	      } else {
	        keys.push(key);
	      }
	    }
	    if (keys.length) {
	      code = genKeyFilter(keys) + code;
	    }
	    var handlerCode = simplePathRE.test(handler.value)
	      ? handler.value + '($event)'
	      : handler.value;
	    return 'function($event){' + code + handlerCode + '}'
	  }
	}

	function genKeyFilter (keys) {
	  var code = keys.length === 1
	    ? normalizeKeyCode(keys[0])
	    : Array.prototype.concat.apply([], keys.map(normalizeKeyCode));
	  if (Array.isArray(code)) {
	    return ("if(" + (code.map(function (c) { return ("$event.keyCode!==" + c); }).join('&&')) + ")return;")
	  } else {
	    return ("if($event.keyCode!==" + code + ")return;")
	  }
	}

	function normalizeKeyCode (key) {
	  return (
	    parseInt(key, 10) || // number keyCode
	    keyCodes[key] || // built-in alias
	    ("_k(" + (JSON.stringify(key)) + ")") // custom alias
	  )
	}

	/*  */

	function bind$2 (el, dir) {
	  el.wrapData = function (code) {
	    return ("_b(" + code + "," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
	  };
	}

	var baseDirectives = {
	  bind: bind$2,
	  cloak: noop
	};

	/*  */

	// configurable state
	var warn$2;
	var transforms$1;
	var dataGenFns;
	var platformDirectives$1;
	var staticRenderFns;
	var currentOptions;

	function generate (
	  ast,
	  options
	) {
	  // save previous staticRenderFns so generate calls can be nested
	  var prevStaticRenderFns = staticRenderFns;
	  var currentStaticRenderFns = staticRenderFns = [];
	  currentOptions = options;
	  warn$2 = options.warn || baseWarn;
	  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
	  dataGenFns = pluckModuleFunction(options.modules, 'genData');
	  platformDirectives$1 = options.directives || {};
	  var code = ast ? genElement(ast) : '_h("div")';
	  staticRenderFns = prevStaticRenderFns;
	  return {
	    render: ("with(this){return " + code + "}"),
	    staticRenderFns: currentStaticRenderFns
	  }
	}

	function genElement (el) {
	  if (el.staticRoot && !el.staticProcessed) {
	    // hoist static sub-trees out
	    el.staticProcessed = true;
	    staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
	    return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
	  } else if (el.for && !el.forProcessed) {
	    return genFor(el)
	  } else if (el.if && !el.ifProcessed) {
	    return genIf(el)
	  } else if (el.tag === 'template' && !el.slotTarget) {
	    return genChildren(el) || 'void 0'
	  } else if (el.tag === 'slot') {
	    return genSlot(el)
	  } else {
	    // component or element
	    var code;
	    if (el.component) {
	      code = genComponent(el);
	    } else {
	      var data = genData(el);
	      var children = el.inlineTemplate ? null : genChildren(el);
	      code = "_h('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
	    }
	    // module transforms
	    for (var i = 0; i < transforms$1.length; i++) {
	      code = transforms$1[i](el, code);
	    }
	    return code
	  }
	}

	function genIf (el) {
	  var exp = el.if;
	  el.ifProcessed = true; // avoid recursion
	  return ("(" + exp + ")?" + (genElement(el)) + ":" + (genElse(el)))
	}

	function genElse (el) {
	  return el.elseBlock
	    ? genElement(el.elseBlock)
	    : '_e()'
	}

	function genFor (el) {
	  var exp = el.for;
	  var alias = el.alias;
	  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
	  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
	  el.forProcessed = true; // avoid recursion
	  return "_l((" + exp + ")," +
	    "function(" + alias + iterator1 + iterator2 + "){" +
	      "return " + (genElement(el)) +
	    '})'
	}

	function genData (el) {
	  if (el.plain) {
	    return
	  }

	  var data = '{';

	  // directives first.
	  // directives may mutate the el's other properties before they are generated.
	  var dirs = genDirectives(el);
	  if (dirs) { data += dirs + ','; }

	  // key
	  if (el.key) {
	    data += "key:" + (el.key) + ",";
	  }
	  // ref
	  if (el.ref) {
	    data += "ref:" + (el.ref) + ",";
	  }
	  if (el.refInFor) {
	    data += "refInFor:true,";
	  }
	  // record original tag name for components using "is" attribute
	  if (el.component) {
	    data += "tag:\"" + (el.tag) + "\",";
	  }
	  // slot target
	  if (el.slotTarget) {
	    data += "slot:" + (el.slotTarget) + ",";
	  }
	  // module data generation functions
	  for (var i = 0; i < dataGenFns.length; i++) {
	    data += dataGenFns[i](el);
	  }
	  // attributes
	  if (el.attrs) {
	    data += "attrs:{" + (genProps(el.attrs)) + "},";
	  }
	  // DOM props
	  if (el.props) {
	    data += "domProps:{" + (genProps(el.props)) + "},";
	  }
	  // event handlers
	  if (el.events) {
	    data += (genHandlers(el.events)) + ",";
	  }
	  if (el.nativeEvents) {
	    data += (genHandlers(el.nativeEvents, true)) + ",";
	  }
	  // inline-template
	  if (el.inlineTemplate) {
	    var ast = el.children[0];
	    if ("development" !== 'production' && (
	      el.children.length > 1 || ast.type !== 1
	    )) {
	      warn$2('Inline-template components must have exactly one child element.');
	    }
	    if (ast.type === 1) {
	      var inlineRenderFns = generate(ast, currentOptions);
	      data += "inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}";
	    }
	  }
	  data = data.replace(/,$/, '') + '}';
	  // v-bind data wrap
	  if (el.wrapData) {
	    data = el.wrapData(data);
	  }
	  return data
	}

	function genDirectives (el) {
	  var dirs = el.directives;
	  if (!dirs) { return }
	  var res = 'directives:[';
	  var hasRuntime = false;
	  var i, l, dir, needRuntime;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    dir = dirs[i];
	    needRuntime = true;
	    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
	    if (gen) {
	      // compile-time directive that manipulates AST.
	      // returns true if it also needs a runtime counterpart.
	      needRuntime = !!gen(el, dir, warn$2);
	    }
	    if (needRuntime) {
	      hasRuntime = true;
	      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
	    }
	  }
	  if (hasRuntime) {
	    return res.slice(0, -1) + ']'
	  }
	}

	function genChildren (el) {
	  if (el.children.length) {
	    return '[' + el.children.map(genNode).join(',') + ']'
	  }
	}

	function genNode (node) {
	  if (node.type === 1) {
	    return genElement(node)
	  } else {
	    return genText(node)
	  }
	}

	function genText (text) {
	  return text.type === 2
	    ? text.expression // no need for () because already wrapped in _s()
	    : JSON.stringify(text.text)
	}

	function genSlot (el) {
	  var slotName = el.slotName || '"default"';
	  var children = genChildren(el);
	  return children
	    ? ("_t(" + slotName + "," + children + ")")
	    : ("_t(" + slotName + ")")
	}

	function genComponent (el) {
	  var children = el.inlineTemplate ? null : genChildren(el);
	  return ("_h(" + (el.component) + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
	}

	function genProps (props) {
	  var res = '';
	  for (var i = 0; i < props.length; i++) {
	    var prop = props[i];
	    res += "\"" + (prop.name) + "\":" + (prop.value) + ",";
	  }
	  return res.slice(0, -1)
	}

	/*  */

	/**
	 * Compile a template.
	 */
	function compile$1 (
	  template,
	  options
	) {
	  var ast = parse(template.trim(), options);
	  optimize(ast, options);
	  var code = generate(ast, options);
	  return {
	    ast: ast,
	    render: code.render,
	    staticRenderFns: code.staticRenderFns
	  }
	}

	/*  */

	// operators like typeof, instanceof and in are allowed
	var prohibitedKeywordRE = new RegExp('\\b' + (
	  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
	  'super,throw,while,yield,delete,export,import,return,switch,default,' +
	  'extends,finally,continue,debugger,function,arguments'
	).split(',').join('\\b|\\b') + '\\b');
	// check valid identifier for v-for
	var identRE = /[A-Za-z_$][\w$]*/;
	// strip strings in expressions
	var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;

	// detect problematic expressions in a template
	function detectErrors (ast) {
	  var errors = [];
	  if (ast) {
	    checkNode(ast, errors);
	  }
	  return errors
	}

	function checkNode (node, errors) {
	  if (node.type === 1) {
	    for (var name in node.attrsMap) {
	      if (dirRE.test(name)) {
	        var value = node.attrsMap[name];
	        if (value) {
	          if (name === 'v-for') {
	            checkFor(node, ("v-for=\"" + value + "\""), errors);
	          } else {
	            checkExpression(value, (name + "=\"" + value + "\""), errors);
	          }
	        }
	      }
	    }
	    if (node.children) {
	      for (var i = 0; i < node.children.length; i++) {
	        checkNode(node.children[i], errors);
	      }
	    }
	  } else if (node.type === 2) {
	    checkExpression(node.expression, node.text, errors);
	  }
	}

	function checkFor (node, text, errors) {
	  checkExpression(node.for || '', text, errors);
	  checkIdentifier(node.alias, 'v-for alias', text, errors);
	  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
	  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
	}

	function checkIdentifier (ident, type, text, errors) {
	  if (typeof ident === 'string' && !identRE.test(ident)) {
	    errors.push(("- invalid " + type + " \"" + ident + "\" in expression: " + text));
	  }
	}

	function checkExpression (exp, text, errors) {
	  try {
	    new Function(("return " + exp));
	  } catch (e) {
	    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
	    if (keywordMatch) {
	      errors.push(
	        "- avoid using JavaScript keyword as property name: " +
	        "\"" + (keywordMatch[0]) + "\" in expression " + text
	      );
	    } else {
	      errors.push(("- invalid expression: " + text));
	    }
	  }
	}

	/*  */

	function transformNode (el, options) {
	  var warn = options.warn || baseWarn;
	  var staticClass = getAndRemoveAttr(el, 'class');
	  if ("development" !== 'production' && staticClass) {
	    var expression = parseText(staticClass, options.delimiters);
	    if (expression) {
	      warn(
	        "class=\"" + staticClass + "\": " +
	        'Interpolation inside attributes has been deprecated. ' +
	        'Use v-bind or the colon shorthand instead.'
	      );
	    }
	  }
	  if (staticClass) {
	    el.staticClass = JSON.stringify(staticClass);
	  }
	  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
	  if (classBinding) {
	    el.classBinding = classBinding;
	  }
	}

	function genData$1 (el) {
	  var data = '';
	  if (el.staticClass) {
	    data += "staticClass:" + (el.staticClass) + ",";
	  }
	  if (el.classBinding) {
	    data += "class:" + (el.classBinding) + ",";
	  }
	  return data
	}

	var klass$1 = {
	  staticKeys: ['staticClass'],
	  transformNode: transformNode,
	  genData: genData$1
	};

	/*  */

	function transformNode$1 (el) {
	  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
	  if (styleBinding) {
	    el.styleBinding = styleBinding;
	  }
	}

	function genData$2 (el) {
	  return el.styleBinding
	    ? ("style:(" + (el.styleBinding) + "),")
	    : ''
	}

	var style$1 = {
	  transformNode: transformNode$1,
	  genData: genData$2
	};

	var modules$1 = [
	  klass$1,
	  style$1
	];

	/*  */

	var warn$3;

	function model$1 (
	  el,
	  dir,
	  _warn
	) {
	  warn$3 = _warn;
	  var value = dir.value;
	  var modifiers = dir.modifiers;
	  var tag = el.tag;
	  var type = el.attrsMap.type;
	  {
	    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
	    if (tag === 'input' && dynamicType) {
	      warn$3(
	        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
	        "v-model does not support dynamic input types. Use v-if branches instead."
	      );
	    }
	  }
	  if (tag === 'select') {
	    genSelect(el, value);
	  } else if (tag === 'input' && type === 'checkbox') {
	    genCheckboxModel(el, value);
	  } else if (tag === 'input' && type === 'radio') {
	    genRadioModel(el, value);
	  } else {
	    genDefaultModel(el, value, modifiers);
	  }
	  // ensure runtime directive metadata
	  return true
	}

	function genCheckboxModel (el, value) {
	  if ("development" !== 'production' &&
	    el.attrsMap.checked != null) {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" checked>:\n" +
	      "inline checked attributes will be ignored when using v-model. " +
	      'Declare initial values in the component\'s data option instead.'
	    );
	  }
	  var valueBinding = getBindingAttr(el, 'value') || 'null';
	  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
	  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
	  addProp(el, 'checked',
	    "Array.isArray(" + value + ")" +
	      "?_i(" + value + "," + valueBinding + ")>-1" +
	      ":_q(" + value + "," + trueValueBinding + ")"
	  );
	  addHandler(el, 'change',
	    "var $$a=" + value + "," +
	        '$$el=$event.target,' +
	        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
	    'if(Array.isArray($$a)){' +
	      "var $$v=" + valueBinding + "," +
	          '$$i=_i($$a,$$v);' +
	      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
	      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
	    "}else{" + value + "=$$c}",
	    null, true
	  );
	}

	function genRadioModel (el, value) {
	  if ("development" !== 'production' &&
	    el.attrsMap.checked != null) {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" checked>:\n" +
	      "inline checked attributes will be ignored when using v-model. " +
	      'Declare initial values in the component\'s data option instead.'
	    );
	  }
	  var valueBinding = getBindingAttr(el, 'value') || 'null';
	  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
	  addHandler(el, 'change', (value + "=" + valueBinding), null, true);
	}

	function genDefaultModel (
	  el,
	  value,
	  modifiers
	) {
	  {
	    if (el.tag === 'input' && el.attrsMap.value) {
	      warn$3(
	        "<" + (el.tag) + " v-model=\"" + value + "\" value=\"" + (el.attrsMap.value) + "\">:\n" +
	        'inline value attributes will be ignored when using v-model. ' +
	        'Declare initial values in the component\'s data option instead.'
	      );
	    }
	    if (el.tag === 'textarea' && el.children.length) {
	      warn$3(
	        "<textarea v-model=\"" + value + "\">:\n" +
	        'inline content inside <textarea> will be ignored when using v-model. ' +
	        'Declare initial values in the component\'s data option instead.'
	      );
	    }
	  }

	  var type = el.attrsMap.type;
	  var ref = modifiers || {};
	  var lazy = ref.lazy;
	  var number = ref.number;
	  var trim = ref.trim;
	  var event = lazy || (isIE && type === 'range') ? 'change' : 'input';
	  var needCompositionGuard = !lazy && type !== 'range';
	  var isNative = el.tag === 'input' || el.tag === 'textarea';

	  var valueExpression = isNative
	    ? ("$event.target.value" + (trim ? '.trim()' : ''))
	    : "$event";
	  var code = number || type === 'number'
	    ? (value + "=_n(" + valueExpression + ")")
	    : (value + "=" + valueExpression);
	  if (isNative && needCompositionGuard) {
	    code = "if($event.target.composing)return;" + code;
	  }
	  // inputs with type="file" are read only and setting the input's
	  // value will throw an error.
	  if ("development" !== 'production' &&
	      type === 'file') {
	    warn$3(
	      "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
	      "File inputs are read only. Use a v-on:change listener instead."
	    );
	  }
	  addProp(el, 'value', isNative ? ("_s(" + value + ")") : ("(" + value + ")"));
	  addHandler(el, event, code, null, true);
	}

	function genSelect (el, value) {
	  {
	    el.children.some(checkOptionWarning);
	  }
	  var code = value + "=Array.prototype.filter" +
	    ".call($event.target.options,function(o){return o.selected})" +
	    ".map(function(o){return \"_value\" in o ? o._value : o.value})" +
	    (el.attrsMap.multiple == null ? '[0]' : '');
	  addHandler(el, 'change', code, null, true);
	}

	function checkOptionWarning (option) {
	  if (option.type === 1 &&
	    option.tag === 'option' &&
	    option.attrsMap.selected != null) {
	    warn$3(
	      "<select v-model=\"" + (option.parent.attrsMap['v-model']) + "\">:\n" +
	      'inline selected attributes on <option> will be ignored when using v-model. ' +
	      'Declare initial values in the component\'s data option instead.'
	    );
	    return true
	  }
	  return false
	}

	/*  */

	function text (el, dir) {
	  if (dir.value) {
	    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
	  }
	}

	/*  */

	function html (el, dir) {
	  if (dir.value) {
	    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
	  }
	}

	var directives$1 = {
	  model: model$1,
	  text: text,
	  html: html
	};

	/*  */

	var cache = Object.create(null);

	var baseOptions = {
	  isIE: isIE,
	  expectHTML: true,
	  modules: modules$1,
	  staticKeys: genStaticKeys(modules$1),
	  directives: directives$1,
	  isReservedTag: isReservedTag,
	  isUnaryTag: isUnaryTag,
	  mustUseProp: mustUseProp,
	  getTagNamespace: getTagNamespace,
	  isPreTag: isPreTag
	};

	function compile$$1 (
	  template,
	  options
	) {
	  options = options
	    ? extend(extend({}, baseOptions), options)
	    : baseOptions;
	  return compile$1(template, options)
	}

	function compileToFunctions (
	  template,
	  options,
	  vm
	) {
	  var _warn = (options && options.warn) || warn;
	  // detect possible CSP restriction
	  /* istanbul ignore if */
	  {
	    try {
	      new Function('return 1');
	    } catch (e) {
	      if (e.toString().match(/unsafe-eval|CSP/)) {
	        _warn(
	          'It seems you are using the standalone build of Vue.js in an ' +
	          'environment with Content Security Policy that prohibits unsafe-eval. ' +
	          'The template compiler cannot work in this environment. Consider ' +
	          'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
	          'templates into render functions.'
	        );
	      }
	    }
	  }
	  var key = options && options.delimiters
	    ? String(options.delimiters) + template
	    : template;
	  if (cache[key]) {
	    return cache[key]
	  }
	  var res = {};
	  var compiled = compile$$1(template, options);
	  res.render = makeFunction(compiled.render);
	  var l = compiled.staticRenderFns.length;
	  res.staticRenderFns = new Array(l);
	  for (var i = 0; i < l; i++) {
	    res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i]);
	  }
	  {
	    if (res.render === noop || res.staticRenderFns.some(function (fn) { return fn === noop; })) {
	      _warn(
	        "failed to compile template:\n\n" + template + "\n\n" +
	        detectErrors(compiled.ast).join('\n') +
	        '\n\n',
	        vm
	      );
	    }
	  }
	  return (cache[key] = res)
	}

	function makeFunction (code) {
	  try {
	    return new Function(code)
	  } catch (e) {
	    return noop
	  }
	}

	/*  */

	var idToTemplate = cached(function (id) {
	  var el = query(id);
	  return el && el.innerHTML
	});

	var mount = Vue$3.prototype.$mount;
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && query(el);

	  /* istanbul ignore if */
	  if (el === document.body || el === document.documentElement) {
	    "development" !== 'production' && warn(
	      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
	    );
	    return this
	  }

	  var options = this.$options;
	  // resolve template/el and convert to render function
	  if (!options.render) {
	    var template = options.template;
	    if (template) {
	      if (typeof template === 'string') {
	        if (template.charAt(0) === '#') {
	          template = idToTemplate(template);
	        }
	      } else if (template.nodeType) {
	        template = template.innerHTML;
	      } else {
	        {
	          warn('invalid template option:' + template, this);
	        }
	        return this
	      }
	    } else if (el) {
	      template = getOuterHTML(el);
	    }
	    if (template) {
	      var ref = compileToFunctions(template, {
	        warn: warn,
	        shouldDecodeNewlines: shouldDecodeNewlines,
	        delimiters: options.delimiters
	      }, this);
	      var render = ref.render;
	      var staticRenderFns = ref.staticRenderFns;
	      options.render = render;
	      options.staticRenderFns = staticRenderFns;
	    }
	  }
	  return mount.call(this, el, hydrating)
	};

	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 */
	function getOuterHTML (el) {
	  if (el.outerHTML) {
	    return el.outerHTML
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML
	  }
	}

	Vue$3.compile = compileToFunctions;

	return Vue$3;

	})));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * vue-router v2.0.1
	 * (c) 2016 Evan You
	 * @license MIT
	 */
	(function (global, factory) {
	   true ? module.exports = factory() :
	  typeof define === 'function' && define.amd ? define(factory) :
	  (global.VueRouter = factory());
	}(this, (function () { 'use strict';

	var View = {
	  name: 'router-view',
	  functional: true,
	  props: {
	    name: {
	      type: String,
	      default: 'default'
	    }
	  },
	  render: function render (h, ref) {
	    var props = ref.props;
	    var children = ref.children;
	    var parent = ref.parent;
	    var data = ref.data;

	    data.routerView = true

	    var route = parent.$route
	    var cache = parent._routerViewCache || (parent._routerViewCache = {})
	    var depth = 0
	    var inactive = false

	    while (parent) {
	      if (parent.$vnode && parent.$vnode.data.routerView) {
	        depth++
	      }
	      if (parent._inactive) {
	        inactive = true
	      }
	      parent = parent.$parent
	    }

	    data.routerViewDepth = depth
	    var matched = route.matched[depth]
	    if (!matched) {
	      return h()
	    }

	    var name = props.name
	    var component = inactive
	      ? cache[name]
	      : (cache[name] = matched.components[name])

	    if (!inactive) {
	      var hooks = data.hook || (data.hook = {})
	      hooks.init = function (vnode) {
	        matched.instances[name] = vnode.child
	      }
	      hooks.destroy = function (vnode) {
	        if (matched.instances[name] === vnode.child) {
	          matched.instances[name] = undefined
	        }
	      }
	    }

	    return h(component, data, children)
	  }
	}

	/*  */

	function resolvePath (
	  relative,
	  base,
	  append
	) {
	  if (relative.charAt(0) === '/') {
	    return relative
	  }

	  if (relative.charAt(0) === '?' || relative.charAt(0) === '#') {
	    return base + relative
	  }

	  var stack = base.split('/')

	  // remove trailing segment if:
	  // - not appending
	  // - appending to trailing slash (last segment is empty)
	  if (!append || !stack[stack.length - 1]) {
	    stack.pop()
	  }

	  // resolve relative path
	  var segments = relative.replace(/^\//, '').split('/')
	  for (var i = 0; i < segments.length; i++) {
	    var segment = segments[i]
	    if (segment === '.') {
	      continue
	    } else if (segment === '..') {
	      stack.pop()
	    } else {
	      stack.push(segment)
	    }
	  }

	  // ensure leading slash
	  if (stack[0] !== '') {
	    stack.unshift('')
	  }

	  return stack.join('/')
	}

	function parsePath (path) {
	  var hash = ''
	  var query = ''

	  var hashIndex = path.indexOf('#')
	  if (hashIndex >= 0) {
	    hash = path.slice(hashIndex)
	    path = path.slice(0, hashIndex)
	  }

	  var queryIndex = path.indexOf('?')
	  if (queryIndex >= 0) {
	    query = path.slice(queryIndex + 1)
	    path = path.slice(0, queryIndex)
	  }

	  return {
	    path: path,
	    query: query,
	    hash: hash
	  }
	}

	function cleanPath (path) {
	  return path.replace(/\/\//g, '/')
	}

	/*  */

	function assert (condition, message) {
	  if (!condition) {
	    throw new Error(("[vue-router] " + message))
	  }
	}

	function warn (condition, message) {
	  if (!condition) {
	    typeof console !== 'undefined' && console.warn(("[vue-router] " + message))
	  }
	}

	/*  */

	var encode = encodeURIComponent
	var decode = decodeURIComponent

	function resolveQuery (
	  query,
	  extraQuery
	) {
	  if ( extraQuery === void 0 ) extraQuery = {};

	  if (query) {
	    var parsedQuery
	    try {
	      parsedQuery = parseQuery(query)
	    } catch (e) {
	      warn(false, e.message)
	      parsedQuery = {}
	    }
	    for (var key in extraQuery) {
	      parsedQuery[key] = extraQuery[key]
	    }
	    return parsedQuery
	  } else {
	    return extraQuery
	  }
	}

	function parseQuery (query) {
	  var res = Object.create(null)

	  query = query.trim().replace(/^(\?|#|&)/, '')

	  if (!query) {
	    return res
	  }

	  query.split('&').forEach(function (param) {
	    var parts = param.replace(/\+/g, ' ').split('=')
	    var key = decode(parts.shift())
	    var val = parts.length > 0
	      ? decode(parts.join('='))
	      : null

	    if (res[key] === undefined) {
	      res[key] = val
	    } else if (Array.isArray(res[key])) {
	      res[key].push(val)
	    } else {
	      res[key] = [res[key], val]
	    }
	  })

	  return res
	}

	function stringifyQuery (obj) {
	  var res = obj ? Object.keys(obj).sort().map(function (key) {
	    var val = obj[key]

	    if (val === undefined) {
	      return ''
	    }

	    if (val === null) {
	      return encode(key)
	    }

	    if (Array.isArray(val)) {
	      var result = []
	      val.slice().forEach(function (val2) {
	        if (val2 === undefined) {
	          return
	        }
	        if (val2 === null) {
	          result.push(encode(key))
	        } else {
	          result.push(encode(key) + '=' + encode(val2))
	        }
	      })
	      return result.join('&')
	    }

	    return encode(key) + '=' + encode(val)
	  }).filter(function (x) { return x.length > 0; }).join('&') : null
	  return res ? ("?" + res) : ''
	}

	/*  */

	function createRoute (
	  record,
	  location,
	  redirectedFrom
	) {
	  var route = {
	    name: location.name || (record && record.name),
	    meta: (record && record.meta) || {},
	    path: location.path || '/',
	    hash: location.hash || '',
	    query: location.query || {},
	    params: location.params || {},
	    fullPath: getFullPath(location),
	    matched: record ? formatMatch(record) : []
	  }
	  if (redirectedFrom) {
	    route.redirectedFrom = getFullPath(redirectedFrom)
	  }
	  return Object.freeze(route)
	}

	// the starting route that represents the initial state
	var START = createRoute(null, {
	  path: '/'
	})

	function formatMatch (record) {
	  var res = []
	  while (record) {
	    res.unshift(record)
	    record = record.parent
	  }
	  return res
	}

	function getFullPath (ref) {
	  var path = ref.path;
	  var query = ref.query; if ( query === void 0 ) query = {};
	  var hash = ref.hash; if ( hash === void 0 ) hash = '';

	  return (path || '/') + stringifyQuery(query) + hash
	}

	var trailingSlashRE = /\/$/
	function isSameRoute (a, b) {
	  if (b === START) {
	    return a === b
	  } else if (!b) {
	    return false
	  } else if (a.path && b.path) {
	    return (
	      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
	      a.hash === b.hash &&
	      isObjectEqual(a.query, b.query)
	    )
	  } else if (a.name && b.name) {
	    return (
	      a.name === b.name &&
	      a.hash === b.hash &&
	      isObjectEqual(a.query, b.query) &&
	      isObjectEqual(a.params, b.params)
	    )
	  } else {
	    return false
	  }
	}

	function isObjectEqual (a, b) {
	  if ( a === void 0 ) a = {};
	  if ( b === void 0 ) b = {};

	  var aKeys = Object.keys(a)
	  var bKeys = Object.keys(b)
	  if (aKeys.length !== bKeys.length) {
	    return false
	  }
	  return aKeys.every(function (key) { return String(a[key]) === String(b[key]); })
	}

	function isIncludedRoute (current, target) {
	  return (
	    current.path.indexOf(target.path) === 0 &&
	    (!target.hash || current.hash === target.hash) &&
	    queryIncludes(current.query, target.query)
	  )
	}

	function queryIncludes (current, target) {
	  for (var key in target) {
	    if (!(key in current)) {
	      return false
	    }
	  }
	  return true
	}

	/*  */

	function normalizeLocation (
	  raw,
	  current,
	  append
	) {
	  var next = typeof raw === 'string' ? { path: raw } : raw
	  if (next.name || next._normalized) {
	    return next
	  }

	  var parsedPath = parsePath(next.path || '')
	  var basePath = (current && current.path) || '/'
	  var path = parsedPath.path
	    ? resolvePath(parsedPath.path, basePath, append)
	    : (current && current.path) || '/'
	  var query = resolveQuery(parsedPath.query, next.query)
	  var hash = next.hash || parsedPath.hash
	  if (hash && hash.charAt(0) !== '#') {
	    hash = "#" + hash
	  }

	  return {
	    _normalized: true,
	    path: path,
	    query: query,
	    hash: hash
	  }
	}

	/*  */

	// work around weird flow bug
	var toTypes = [String, Object]

	var Link = {
	  name: 'router-link',
	  props: {
	    to: {
	      type: toTypes,
	      required: true
	    },
	    tag: {
	      type: String,
	      default: 'a'
	    },
	    exact: Boolean,
	    append: Boolean,
	    replace: Boolean,
	    activeClass: String
	  },
	  render: function render (h) {
	    var this$1 = this;

	    var router = this.$router
	    var current = this.$route
	    var to = normalizeLocation(this.to, current, this.append)
	    var resolved = router.match(to)
	    var fullPath = resolved.redirectedFrom || resolved.fullPath
	    var base = router.history.base
	    var href = base ? cleanPath(base + fullPath) : fullPath
	    var classes = {}
	    var activeClass = this.activeClass || router.options.linkActiveClass || 'router-link-active'
	    var compareTarget = to.path ? createRoute(null, to) : resolved
	    classes[activeClass] = this.exact
	      ? isSameRoute(current, compareTarget)
	      : isIncludedRoute(current, compareTarget)

	    var on = {
	      click: function (e) {
	        // don't redirect with control keys
	        /* istanbul ignore if */
	        if (e.metaKey || e.ctrlKey || e.shiftKey) { return }
	        // don't redirect when preventDefault called
	        /* istanbul ignore if */
	        if (e.defaultPrevented) { return }
	        // don't redirect on right click
	        /* istanbul ignore if */
	        if (e.button !== 0) { return }
	        e.preventDefault()
	        if (this$1.replace) {
	          router.replace(to)
	        } else {
	          router.push(to)
	        }
	      }
	    }

	    var data = {
	      class: classes
	    }

	    if (this.tag === 'a') {
	      data.on = on
	      data.attrs = { href: href }
	    } else {
	      // find the first <a> child and apply listener and href
	      var a = findAnchor(this.$slots.default)
	      if (a) {
	        var aData = a.data || (a.data = {})
	        aData.on = on
	        var aAttrs = aData.attrs || (aData.attrs = {})
	        aAttrs.href = href
	      } else {
	        // doesn't have <a> child, apply listener to self
	        data.on = on
	      }
	    }

	    return h(this.tag, data, this.$slots.default)
	  }
	}

	function findAnchor (children) {
	  if (children) {
	    var child
	    for (var i = 0; i < children.length; i++) {
	      child = children[i]
	      if (child.tag === 'a') {
	        return child
	      }
	      if (child.children && (child = findAnchor(child.children))) {
	        return child
	      }
	    }
	  }
	}

	function install (Vue) {
	  if (install.installed) { return }
	  install.installed = true

	  Object.defineProperty(Vue.prototype, '$router', {
	    get: function get () { return this.$root._router }
	  })

	  Object.defineProperty(Vue.prototype, '$route', {
	    get: function get$1 () { return this.$root._route }
	  })

	  Vue.mixin({
	    beforeCreate: function beforeCreate () {
	      if (this.$options.router) {
	        this._router = this.$options.router
	        this._router.init(this)
	        Vue.util.defineReactive(this, '_route', this._router.history.current)
	      }
	    }
	  })

	  Vue.component('router-view', View)
	  Vue.component('router-link', Link)
	}

	var __moduleExports = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};

	var isarray = __moduleExports

	/**
	 * Expose `pathToRegexp`.
	 */
	var index = pathToRegexp
	var parse_1 = parse
	var compile_1 = compile
	var tokensToFunction_1 = tokensToFunction
	var tokensToRegExp_1 = tokensToRegExp

	/**
	 * The main path matching regexp utility.
	 *
	 * @type {RegExp}
	 */
	var PATH_REGEXP = new RegExp([
	  // Match escaped characters that would otherwise appear in future matches.
	  // This allows the user to escape special characters that won't transform.
	  '(\\\\.)',
	  // Match Express-style parameters and un-named parameters with a prefix
	  // and optional suffixes. Matches appear as:
	  //
	  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
	  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
	  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
	  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
	].join('|'), 'g')

	/**
	 * Parse a string for the raw tokens.
	 *
	 * @param  {string} str
	 * @return {!Array}
	 */
	function parse (str) {
	  var tokens = []
	  var key = 0
	  var index = 0
	  var path = ''
	  var res

	  while ((res = PATH_REGEXP.exec(str)) != null) {
	    var m = res[0]
	    var escaped = res[1]
	    var offset = res.index
	    path += str.slice(index, offset)
	    index = offset + m.length

	    // Ignore already escaped sequences.
	    if (escaped) {
	      path += escaped[1]
	      continue
	    }

	    var next = str[index]
	    var prefix = res[2]
	    var name = res[3]
	    var capture = res[4]
	    var group = res[5]
	    var modifier = res[6]
	    var asterisk = res[7]

	    // Push the current path onto the tokens.
	    if (path) {
	      tokens.push(path)
	      path = ''
	    }

	    var partial = prefix != null && next != null && next !== prefix
	    var repeat = modifier === '+' || modifier === '*'
	    var optional = modifier === '?' || modifier === '*'
	    var delimiter = res[2] || '/'
	    var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')

	    tokens.push({
	      name: name || key++,
	      prefix: prefix || '',
	      delimiter: delimiter,
	      optional: optional,
	      repeat: repeat,
	      partial: partial,
	      asterisk: !!asterisk,
	      pattern: escapeGroup(pattern)
	    })
	  }

	  // Match any characters still remaining.
	  if (index < str.length) {
	    path += str.substr(index)
	  }

	  // If the path exists, push it onto the end.
	  if (path) {
	    tokens.push(path)
	  }

	  return tokens
	}

	/**
	 * Compile a string to a template function for the path.
	 *
	 * @param  {string}             str
	 * @return {!function(Object=, Object=)}
	 */
	function compile (str) {
	  return tokensToFunction(parse(str))
	}

	/**
	 * Prettier encoding of URI path segments.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeURIComponentPretty (str) {
	  return encodeURI(str).replace(/[\/?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}

	/**
	 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeAsterisk (str) {
	  return encodeURI(str).replace(/[?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}

	/**
	 * Expose a method for transforming tokens into the path function.
	 */
	function tokensToFunction (tokens) {
	  // Compile all the tokens into regexps.
	  var matches = new Array(tokens.length)

	  // Compile all the patterns before compilation.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] === 'object') {
	      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$')
	    }
	  }

	  return function (obj, opts) {
	    var path = ''
	    var data = obj || {}
	    var options = opts || {}
	    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent

	    for (var i = 0; i < tokens.length; i++) {
	      var token = tokens[i]

	      if (typeof token === 'string') {
	        path += token

	        continue
	      }

	      var value = data[token.name]
	      var segment

	      if (value == null) {
	        if (token.optional) {
	          // Prepend partial segment prefixes.
	          if (token.partial) {
	            path += token.prefix
	          }

	          continue
	        } else {
	          throw new TypeError('Expected "' + token.name + '" to be defined')
	        }
	      }

	      if (isarray(value)) {
	        if (!token.repeat) {
	          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
	        }

	        if (value.length === 0) {
	          if (token.optional) {
	            continue
	          } else {
	            throw new TypeError('Expected "' + token.name + '" to not be empty')
	          }
	        }

	        for (var j = 0; j < value.length; j++) {
	          segment = encode(value[j])

	          if (!matches[i].test(segment)) {
	            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
	          }

	          path += (j === 0 ? token.prefix : token.delimiter) + segment
	        }

	        continue
	      }

	      segment = token.asterisk ? encodeAsterisk(value) : encode(value)

	      if (!matches[i].test(segment)) {
	        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
	      }

	      path += token.prefix + segment
	    }

	    return path
	  }
	}

	/**
	 * Escape a regular expression string.
	 *
	 * @param  {string} str
	 * @return {string}
	 */
	function escapeString (str) {
	  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
	}

	/**
	 * Escape the capturing group by escaping special characters and meaning.
	 *
	 * @param  {string} group
	 * @return {string}
	 */
	function escapeGroup (group) {
	  return group.replace(/([=!:$\/()])/g, '\\$1')
	}

	/**
	 * Attach the keys as a property of the regexp.
	 *
	 * @param  {!RegExp} re
	 * @param  {Array}   keys
	 * @return {!RegExp}
	 */
	function attachKeys (re, keys) {
	  re.keys = keys
	  return re
	}

	/**
	 * Get the flags for a regexp from the options.
	 *
	 * @param  {Object} options
	 * @return {string}
	 */
	function flags (options) {
	  return options.sensitive ? '' : 'i'
	}

	/**
	 * Pull out keys from a regexp.
	 *
	 * @param  {!RegExp} path
	 * @param  {!Array}  keys
	 * @return {!RegExp}
	 */
	function regexpToRegexp (path, keys) {
	  // Use a negative lookahead to match only capturing groups.
	  var groups = path.source.match(/\((?!\?)/g)

	  if (groups) {
	    for (var i = 0; i < groups.length; i++) {
	      keys.push({
	        name: i,
	        prefix: null,
	        delimiter: null,
	        optional: false,
	        repeat: false,
	        partial: false,
	        asterisk: false,
	        pattern: null
	      })
	    }
	  }

	  return attachKeys(path, keys)
	}

	/**
	 * Transform an array into a regexp.
	 *
	 * @param  {!Array}  path
	 * @param  {Array}   keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function arrayToRegexp (path, keys, options) {
	  var parts = []

	  for (var i = 0; i < path.length; i++) {
	    parts.push(pathToRegexp(path[i], keys, options).source)
	  }

	  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

	  return attachKeys(regexp, keys)
	}

	/**
	 * Create a path regexp from string input.
	 *
	 * @param  {string}  path
	 * @param  {!Array}  keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function stringToRegexp (path, keys, options) {
	  var tokens = parse(path)
	  var re = tokensToRegExp(tokens, options)

	  // Attach keys back to the regexp.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] !== 'string') {
	      keys.push(tokens[i])
	    }
	  }

	  return attachKeys(re, keys)
	}

	/**
	 * Expose a function for taking tokens and returning a RegExp.
	 *
	 * @param  {!Array}  tokens
	 * @param  {Object=} options
	 * @return {!RegExp}
	 */
	function tokensToRegExp (tokens, options) {
	  options = options || {}

	  var strict = options.strict
	  var end = options.end !== false
	  var route = ''
	  var lastToken = tokens[tokens.length - 1]
	  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)

	  // Iterate over the tokens and create our regexp string.
	  for (var i = 0; i < tokens.length; i++) {
	    var token = tokens[i]

	    if (typeof token === 'string') {
	      route += escapeString(token)
	    } else {
	      var prefix = escapeString(token.prefix)
	      var capture = '(?:' + token.pattern + ')'

	      if (token.repeat) {
	        capture += '(?:' + prefix + capture + ')*'
	      }

	      if (token.optional) {
	        if (!token.partial) {
	          capture = '(?:' + prefix + '(' + capture + '))?'
	        } else {
	          capture = prefix + '(' + capture + ')?'
	        }
	      } else {
	        capture = prefix + '(' + capture + ')'
	      }

	      route += capture
	    }
	  }

	  // In non-strict mode we allow a slash at the end of match. If the path to
	  // match already ends with a slash, we remove it for consistency. The slash
	  // is valid at the end of a path match, not in the middle. This is important
	  // in non-ending mode, where "/test/" shouldn't match "/test//route".
	  if (!strict) {
	    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
	  }

	  if (end) {
	    route += '$'
	  } else {
	    // In non-ending mode, we need the capturing groups to match as much as
	    // possible by using a positive lookahead to the end or next path segment.
	    route += strict && endsWithSlash ? '' : '(?=\\/|$)'
	  }

	  return new RegExp('^' + route, flags(options))
	}

	/**
	 * Normalize the given path string, returning a regular expression.
	 *
	 * An empty array can be passed in for the keys, which will hold the
	 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
	 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
	 *
	 * @param  {(string|RegExp|Array)} path
	 * @param  {(Array|Object)=}       keys
	 * @param  {Object=}               options
	 * @return {!RegExp}
	 */
	function pathToRegexp (path, keys, options) {
	  keys = keys || []

	  if (!isarray(keys)) {
	    options = /** @type {!Object} */ (keys)
	    keys = []
	  } else if (!options) {
	    options = {}
	  }

	  if (path instanceof RegExp) {
	    return regexpToRegexp(path, /** @type {!Array} */ (keys))
	  }

	  if (isarray(path)) {
	    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
	  }

	  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
	}

	index.parse = parse_1;
	index.compile = compile_1;
	index.tokensToFunction = tokensToFunction_1;
	index.tokensToRegExp = tokensToRegExp_1;

	/*  */

	function createRouteMap (routes) {
	  var pathMap = Object.create(null)
	  var nameMap = Object.create(null)

	  routes.forEach(function (route) {
	    addRouteRecord(pathMap, nameMap, route)
	  })

	  return {
	    pathMap: pathMap,
	    nameMap: nameMap
	  }
	}

	function addRouteRecord (
	  pathMap,
	  nameMap,
	  route,
	  parent,
	  matchAs
	) {
	  var path = route.path;
	  var name = route.name;
	  assert(path != null, "\"path\" is required in a route configuration.")

	  var record = {
	    path: normalizePath(path, parent),
	    components: route.components || { default: route.component },
	    instances: {},
	    name: name,
	    parent: parent,
	    matchAs: matchAs,
	    redirect: route.redirect,
	    beforeEnter: route.beforeEnter,
	    meta: route.meta || {}
	  }

	  if (route.children) {
	    // Warn if route is named and has a default child route.
	    // If users navigate to this route by name, the default child will
	    // not be rendered (GH Issue #629)
	    if (false) {}
	    route.children.forEach(function (child) {
	      addRouteRecord(pathMap, nameMap, child, record)
	    })
	  }

	  if (route.alias) {
	    if (Array.isArray(route.alias)) {
	      route.alias.forEach(function (alias) {
	        addRouteRecord(pathMap, nameMap, { path: alias }, parent, record.path)
	      })
	    } else {
	      addRouteRecord(pathMap, nameMap, { path: route.alias }, parent, record.path)
	    }
	  }

	  pathMap[record.path] = record
	  if (name) { nameMap[name] = record }
	}

	function normalizePath (path, parent) {
	  path = path.replace(/\/$/, '')
	  if (path[0] === '/') { return path }
	  if (parent == null) { return path }
	  return cleanPath(((parent.path) + "/" + path))
	}

	/*  */

	var regexpCache = Object.create(null)

	var regexpCompileCache = Object.create(null)

	function createMatcher (routes) {
	  var ref = createRouteMap(routes);
	  var pathMap = ref.pathMap;
	  var nameMap = ref.nameMap;

	  function match (
	    raw,
	    currentRoute,
	    redirectedFrom
	  ) {
	    var location = normalizeLocation(raw, currentRoute)
	    var name = location.name;

	    if (name) {
	      var record = nameMap[name]
	      if (record) {
	        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""))
	        return _createRoute(record, location, redirectedFrom)
	      }
	    } else if (location.path) {
	      location.params = {}
	      for (var path in pathMap) {
	        if (matchRoute(path, location.params, location.path)) {
	          return _createRoute(pathMap[path], location, redirectedFrom)
	        }
	      }
	    }
	    // no match
	    return _createRoute(null, location)
	  }

	  function redirect (
	    record,
	    location
	  ) {
	    var originalRedirect = record.redirect
	    var redirect = typeof originalRedirect === 'function'
	        ? originalRedirect(createRoute(record, location))
	        : originalRedirect

	    if (typeof redirect === 'string') {
	      redirect = { path: redirect }
	    }

	    if (!redirect || typeof redirect !== 'object') {
	      warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))))
	      return _createRoute(null, location)
	    }

	    var re = redirect
	    var name = re.name;
	    var path = re.path;
	    var query = location.query;
	    var hash = location.hash;
	    var params = location.params;
	    query = re.hasOwnProperty('query') ? re.query : query
	    hash = re.hasOwnProperty('hash') ? re.hash : hash
	    params = re.hasOwnProperty('params') ? re.params : params

	    if (name) {
	      // resolved named direct
	      var targetRecord = nameMap[name]
	      assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."))
	      return match({
	        _normalized: true,
	        name: name,
	        query: query,
	        hash: hash,
	        params: params
	      }, undefined, location)
	    } else if (path) {
	      // 1. resolve relative redirect
	      var rawPath = resolveRecordPath(path, record)
	      // 2. resolve params
	      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""))
	      // 3. rematch with existing query and hash
	      return match({
	        _normalized: true,
	        path: resolvedPath,
	        query: query,
	        hash: hash
	      }, undefined, location)
	    } else {
	      warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))))
	      return _createRoute(null, location)
	    }
	  }

	  function alias (
	    record,
	    location,
	    matchAs
	  ) {
	    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""))
	    var aliasedMatch = match({
	      _normalized: true,
	      path: aliasedPath
	    })
	    if (aliasedMatch) {
	      var matched = aliasedMatch.matched
	      var aliasedRecord = matched[matched.length - 1]
	      location.params = aliasedMatch.params
	      return _createRoute(aliasedRecord, location)
	    }
	    return _createRoute(null, location)
	  }

	  function _createRoute (
	    record,
	    location,
	    redirectedFrom
	  ) {
	    if (record && record.redirect) {
	      return redirect(record, redirectedFrom || location)
	    }
	    if (record && record.matchAs) {
	      return alias(record, location, record.matchAs)
	    }
	    return createRoute(record, location, redirectedFrom)
	  }

	  return match
	}

	function matchRoute (
	  path,
	  params,
	  pathname
	) {
	  var keys, regexp
	  var hit = regexpCache[path]
	  if (hit) {
	    keys = hit.keys
	    regexp = hit.regexp
	  } else {
	    keys = []
	    regexp = index(path, keys)
	    regexpCache[path] = { keys: keys, regexp: regexp }
	  }
	  var m = pathname.match(regexp)

	  if (!m) {
	    return false
	  } else if (!params) {
	    return true
	  }

	  for (var i = 1, len = m.length; i < len; ++i) {
	    var key = keys[i - 1]
	    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i]
	    if (key) { params[key.name] = val }
	  }

	  return true
	}

	function fillParams (
	  path,
	  params,
	  routeMsg
	) {
	  try {
	    var filler =
	      regexpCompileCache[path] ||
	      (regexpCompileCache[path] = index.compile(path))
	    return filler(params || {}, { pretty: true })
	  } catch (e) {
	    assert(false, ("missing param for " + routeMsg + ": " + (e.message)))
	    return ''
	  }
	}

	function resolveRecordPath (path, record) {
	  return resolvePath(path, record.parent ? record.parent.path : '/', true)
	}

	/*  */

	var inBrowser = typeof window !== 'undefined'

	var supportsHistory = inBrowser && (function () {
	  var ua = window.navigator.userAgent

	  if (
	    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
	    ua.indexOf('Mobile Safari') !== -1 &&
	    ua.indexOf('Chrome') === -1 &&
	    ua.indexOf('Windows Phone') === -1
	  ) {
	    return false
	  }

	  return window.history && 'pushState' in window.history
	})()

	/*  */

	function runQueue (queue, fn, cb) {
	  var step = function (index) {
	    if (index >= queue.length) {
	      cb()
	    } else {
	      if (queue[index]) {
	        fn(queue[index], function () {
	          step(index + 1)
	        })
	      } else {
	        step(index + 1)
	      }
	    }
	  }
	  step(0)
	}

	/*  */


	var History = function History (router, base) {
	  this.router = router
	  this.base = normalizeBase(base)
	  // start with a route object that stands for "nowhere"
	  this.current = START
	  this.pending = null
	};

	History.prototype.listen = function listen (cb) {
	  this.cb = cb
	};

	History.prototype.transitionTo = function transitionTo (location, cb) {
	    var this$1 = this;

	  var route = this.router.match(location, this.current)
	  this.confirmTransition(route, function () {
	    this$1.updateRoute(route)
	    cb && cb(route)
	    this$1.ensureURL()
	  })
	};

	History.prototype.confirmTransition = function confirmTransition (route, cb) {
	    var this$1 = this;

	  var current = this.current
	  if (isSameRoute(route, current)) {
	    this.ensureURL()
	    return
	  }

	  var ref = resolveQueue(this.current.matched, route.matched);
	    var deactivated = ref.deactivated;
	    var activated = ref.activated;

	  var queue = [].concat(
	    // in-component leave guards
	    extractLeaveGuards(deactivated),
	    // global before hooks
	    this.router.beforeHooks,
	    // enter guards
	    activated.map(function (m) { return m.beforeEnter; }),
	    // async components
	    resolveAsyncComponents(activated)
	  )

	  this.pending = route
	  var iterator = function (hook, next) {
	    if (this$1.pending !== route) { return }
	    hook(route, current, function (to) {
	      if (to === false) {
	        // next(false) -> abort navigation, ensure current URL
	        this$1.ensureURL()
	      } else if (typeof to === 'string' || typeof to === 'object') {
	        // next('/') or next({ path: '/' }) -> redirect
	        this$1.push(to)
	      } else {
	        // confirm transition and pass on the value
	        next(to)
	      }
	    })
	  }

	  runQueue(queue, iterator, function () {
	    var postEnterCbs = []
	    var enterGuards = extractEnterGuards(activated, postEnterCbs, function () {
	      return this$1.current === route
	    })
	    // wait until async components are resolved before
	    // extracting in-component enter guards
	    runQueue(enterGuards, iterator, function () {
	      if (this$1.pending === route) {
	        this$1.pending = null
	        cb(route)
	        this$1.router.app.$nextTick(function () {
	          postEnterCbs.forEach(function (cb) { return cb(); })
	        })
	      }
	    })
	  })
	};

	History.prototype.updateRoute = function updateRoute (route) {
	  var prev = this.current
	  this.current = route
	  this.cb && this.cb(route)
	  this.router.afterHooks.forEach(function (hook) {
	    hook && hook(route, prev)
	  })
	};

	function normalizeBase (base) {
	  if (!base) {
	    if (inBrowser) {
	      // respect <base> tag
	      var baseEl = document.querySelector('base')
	      base = baseEl ? baseEl.getAttribute('href') : '/'
	    } else {
	      base = '/'
	    }
	  }
	  // make sure there's the starting slash
	  if (base.charAt(0) !== '/') {
	    base = '/' + base
	  }
	  // remove trailing slash
	  return base.replace(/\/$/, '')
	}

	function resolveQueue (
	  current,
	  next
	) {
	  var i
	  var max = Math.max(current.length, next.length)
	  for (i = 0; i < max; i++) {
	    if (current[i] !== next[i]) {
	      break
	    }
	  }
	  return {
	    activated: next.slice(i),
	    deactivated: current.slice(i)
	  }
	}

	function extractLeaveGuards (matched) {
	  return flatMapComponents(matched, function (def, instance) {
	    var guard = def && def.beforeRouteLeave
	    if (guard) {
	      return function routeLeaveGuard () {
	        return guard.apply(instance, arguments)
	      }
	    }
	  }).reverse()
	}

	function extractEnterGuards (
	  matched,
	  cbs,
	  isValid
	) {
	  return flatMapComponents(matched, function (def, _, match, key) {
	    var guard = def && def.beforeRouteEnter
	    if (guard) {
	      return function routeEnterGuard (to, from, next) {
	        return guard(to, from, function (cb) {
	          next(cb)
	          if (typeof cb === 'function') {
	            cbs.push(function () {
	              // #750
	              // if a router-view is wrapped with an out-in transition,
	              // the instance may not have been registered at this time.
	              // we will need to poll for registration until current route
	              // is no longer valid.
	              poll(cb, match.instances, key, isValid)
	            })
	          }
	        })
	      }
	    }
	  })
	}

	function poll (cb, instances, key, isValid) {
	  if (instances[key]) {
	    cb(instances[key])
	  } else if (isValid()) {
	    setTimeout(function () {
	      poll(cb, instances, key, isValid)
	    }, 16)
	  }
	}

	function resolveAsyncComponents (matched) {
	  return flatMapComponents(matched, function (def, _, match, key) {
	    // if it's a function and doesn't have Vue options attached,
	    // assume it's an async component resolve function.
	    // we are not using Vue's default async resolving mechanism because
	    // we want to halt the navigation until the incoming component has been
	    // resolved.
	    if (typeof def === 'function' && !def.options) {
	      return function (to, from, next) {
	        var resolve = function (resolvedDef) {
	          match.components[key] = resolvedDef
	          next()
	        }

	        var reject = function (reason) {
	          warn(false, ("Failed to resolve async component " + key + ": " + reason))
	          next(false)
	        }

	        var res = def(resolve, reject)
	        if (res && typeof res.then === 'function') {
	          res.then(resolve, reject)
	        }
	      }
	    }
	  })
	}

	function flatMapComponents (
	  matched,
	  fn
	) {
	  return Array.prototype.concat.apply([], matched.map(function (m) {
	    return Object.keys(m.components).map(function (key) { return fn(
	      m.components[key],
	      m.instances[key],
	      m, key
	    ); })
	  }))
	}

	/*  */

	function saveScrollPosition (key) {
	  if (!key) { return }
	  window.sessionStorage.setItem(key, JSON.stringify({
	    x: window.pageXOffset,
	    y: window.pageYOffset
	  }))
	}

	function getScrollPosition (key) {
	  if (!key) { return }
	  return JSON.parse(window.sessionStorage.getItem(key))
	}

	function getElementPosition (el) {
	  var docRect = document.documentElement.getBoundingClientRect()
	  var elRect = el.getBoundingClientRect()
	  return {
	    x: elRect.left - docRect.left,
	    y: elRect.top - docRect.top
	  }
	}

	function isValidPosition (obj) {
	  return isNumber(obj.x) || isNumber(obj.y)
	}

	function normalizePosition (obj) {
	  return {
	    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
	    y: isNumber(obj.y) ? obj.y : window.pageYOffset
	  }
	}

	function isNumber (v) {
	  return typeof v === 'number'
	}

	/*  */


	var genKey = function () { return String(Date.now()); }
	var _key = genKey()

	var HTML5History = (function (History) {
	  function HTML5History (router, base) {
	    var this$1 = this;

	    History.call(this, router, base)

	    this.transitionTo(getLocation(this.base))

	    var expectScroll = router.options.scrollBehavior
	    window.addEventListener('popstate', function (e) {
	      _key = e.state && e.state.key
	      var current = this$1.current
	      this$1.transitionTo(getLocation(this$1.base), function (next) {
	        if (expectScroll) {
	          this$1.handleScroll(next, current, true)
	        }
	      })
	    })

	    if (expectScroll) {
	      window.addEventListener('scroll', function () {
	        saveScrollPosition(_key)
	      })
	    }
	  }

	  if ( History ) HTML5History.__proto__ = History;
	  HTML5History.prototype = Object.create( History && History.prototype );
	  HTML5History.prototype.constructor = HTML5History;

	  HTML5History.prototype.go = function go (n) {
	    window.history.go(n)
	  };

	  HTML5History.prototype.push = function push (location) {
	    var this$1 = this;

	    var current = this.current
	    this.transitionTo(location, function (route) {
	      pushState(cleanPath(this$1.base + route.fullPath))
	      this$1.handleScroll(route, current, false)
	    })
	  };

	  HTML5History.prototype.replace = function replace (location) {
	    var this$1 = this;

	    var current = this.current
	    this.transitionTo(location, function (route) {
	      replaceState(cleanPath(this$1.base + route.fullPath))
	      this$1.handleScroll(route, current, false)
	    })
	  };

	  HTML5History.prototype.ensureURL = function ensureURL () {
	    if (getLocation(this.base) !== this.current.fullPath) {
	      replaceState(cleanPath(this.base + this.current.fullPath))
	    }
	  };

	  HTML5History.prototype.handleScroll = function handleScroll (to, from, isPop) {
	    var router = this.router
	    if (!router.app) {
	      return
	    }

	    var behavior = router.options.scrollBehavior
	    if (!behavior) {
	      return
	    }
	    assert(typeof behavior === 'function', "scrollBehavior must be a function")

	    // wait until re-render finishes before scrolling
	    router.app.$nextTick(function () {
	      var position = getScrollPosition(_key)
	      var shouldScroll = behavior(to, from, isPop ? position : null)
	      if (!shouldScroll) {
	        return
	      }
	      var isObject = typeof shouldScroll === 'object'
	      if (isObject && typeof shouldScroll.selector === 'string') {
	        var el = document.querySelector(shouldScroll.selector)
	        if (el) {
	          position = getElementPosition(el)
	        } else if (isValidPosition(shouldScroll)) {
	          position = normalizePosition(shouldScroll)
	        }
	      } else if (isObject && isValidPosition(shouldScroll)) {
	        position = normalizePosition(shouldScroll)
	      }

	      if (position) {
	        window.scrollTo(position.x, position.y)
	      }
	    })
	  };

	  return HTML5History;
	}(History));

	function getLocation (base) {
	  var path = window.location.pathname
	  if (base && path.indexOf(base) === 0) {
	    path = path.slice(base.length)
	  }
	  return (path || '/') + window.location.search + window.location.hash
	}

	function pushState (url, replace) {
	  // try...catch the pushState call to get around Safari
	  // DOM Exception 18 where it limits to 100 pushState calls
	  var history = window.history
	  try {
	    if (replace) {
	      history.replaceState({ key: _key }, '', url)
	    } else {
	      _key = genKey()
	      history.pushState({ key: _key }, '', url)
	    }
	    saveScrollPosition(_key)
	  } catch (e) {
	    window.location[replace ? 'assign' : 'replace'](url)
	  }
	}

	function replaceState (url) {
	  pushState(url, true)
	}

	/*  */


	var HashHistory = (function (History) {
	  function HashHistory (router, base, fallback) {
	    var this$1 = this;

	    History.call(this, router, base)

	    // check history fallback deeplinking
	    if (fallback && this.checkFallback()) {
	      return
	    }

	    ensureSlash()
	    this.transitionTo(getHash(), function () {
	      window.addEventListener('hashchange', function () {
	        this$1.onHashChange()
	      })
	    })
	  }

	  if ( History ) HashHistory.__proto__ = History;
	  HashHistory.prototype = Object.create( History && History.prototype );
	  HashHistory.prototype.constructor = HashHistory;

	  HashHistory.prototype.checkFallback = function checkFallback () {
	    var location = getLocation(this.base)
	    if (!/^\/#/.test(location)) {
	      window.location.replace(
	        cleanPath(this.base + '/#' + location)
	      )
	      return true
	    }
	  };

	  HashHistory.prototype.onHashChange = function onHashChange () {
	    if (!ensureSlash()) {
	      return
	    }
	    this.transitionTo(getHash(), function (route) {
	      replaceHash(route.fullPath)
	    })
	  };

	  HashHistory.prototype.push = function push (location) {
	    this.transitionTo(location, function (route) {
	      pushHash(route.fullPath)
	    })
	  };

	  HashHistory.prototype.replace = function replace (location) {
	    this.transitionTo(location, function (route) {
	      replaceHash(route.fullPath)
	    })
	  };

	  HashHistory.prototype.go = function go (n) {
	    window.history.go(n)
	  };

	  HashHistory.prototype.ensureURL = function ensureURL () {
	    if (getHash() !== this.current.fullPath) {
	      replaceHash(this.current.fullPath)
	    }
	  };

	  return HashHistory;
	}(History));

	function ensureSlash () {
	  var path = getHash()
	  if (path.charAt(0) === '/') {
	    return true
	  }
	  replaceHash('/' + path)
	  return false
	}

	function getHash () {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  var href = window.location.href
	  var index = href.indexOf('#')
	  return index === -1 ? '' : href.slice(index + 1)
	}

	function pushHash (path) {
	  window.location.hash = path
	}

	function replaceHash (path) {
	  var i = window.location.href.indexOf('#')
	  window.location.replace(
	    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
	  )
	}

	/*  */


	var AbstractHistory = (function (History) {
	  function AbstractHistory (router) {
	    History.call(this, router)
	    this.stack = []
	    this.index = -1
	  }

	  if ( History ) AbstractHistory.__proto__ = History;
	  AbstractHistory.prototype = Object.create( History && History.prototype );
	  AbstractHistory.prototype.constructor = AbstractHistory;

	  AbstractHistory.prototype.push = function push (location) {
	    var this$1 = this;

	    this.transitionTo(location, function (route) {
	      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route)
	      this$1.index++
	    })
	  };

	  AbstractHistory.prototype.replace = function replace (location) {
	    var this$1 = this;

	    this.transitionTo(location, function (route) {
	      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route)
	    })
	  };

	  AbstractHistory.prototype.go = function go (n) {
	    var this$1 = this;

	    var targetIndex = this.index + n
	    if (targetIndex < 0 || targetIndex >= this.stack.length) {
	      return
	    }
	    var route = this.stack[targetIndex]
	    this.confirmTransition(route, function () {
	      this$1.index = targetIndex
	      this$1.updateRoute(route)
	    })
	  };

	  AbstractHistory.prototype.ensureURL = function ensureURL () {
	    // noop
	  };

	  return AbstractHistory;
	}(History));

	/*  */

	var VueRouter = function VueRouter (options) {
	  if ( options === void 0 ) options = {};

	  this.app = null
	  this.options = options
	  this.beforeHooks = []
	  this.afterHooks = []
	  this.match = createMatcher(options.routes || [])

	  var mode = options.mode || 'hash'
	  this.fallback = mode === 'history' && !supportsHistory
	  if (this.fallback) {
	    mode = 'hash'
	  }
	  if (!inBrowser) {
	    mode = 'abstract'
	  }
	  this.mode = mode
	};

	var prototypeAccessors = { currentRoute: {} };

	prototypeAccessors.currentRoute.get = function () {
	  return this.history && this.history.current
	};

	VueRouter.prototype.init = function init (app /* Vue component instance */) {
	    var this$1 = this;

	  assert(
	    install.installed,
	    "not installed. Make sure to call `Vue.use(VueRouter)` " +
	    "before creating root instance."
	  )

	  this.app = app

	  var ref = this;
	    var mode = ref.mode;
	    var options = ref.options;
	    var fallback = ref.fallback;
	  switch (mode) {
	    case 'history':
	      this.history = new HTML5History(this, options.base)
	      break
	    case 'hash':
	      this.history = new HashHistory(this, options.base, fallback)
	      break
	    case 'abstract':
	      this.history = new AbstractHistory(this)
	      break
	    default:
	      assert(false, ("invalid mode: " + mode))
	  }

	  this.history.listen(function (route) {
	    this$1.app._route = route
	  })
	};

	VueRouter.prototype.beforeEach = function beforeEach (fn) {
	  this.beforeHooks.push(fn)
	};

	VueRouter.prototype.afterEach = function afterEach (fn) {
	  this.afterHooks.push(fn)
	};

	VueRouter.prototype.push = function push (location) {
	  this.history.push(location)
	};

	VueRouter.prototype.replace = function replace (location) {
	  this.history.replace(location)
	};

	VueRouter.prototype.go = function go (n) {
	  this.history.go(n)
	};

	VueRouter.prototype.back = function back () {
	  this.go(-1)
	};

	VueRouter.prototype.forward = function forward () {
	  this.go(1)
	};

	VueRouter.prototype.getMatchedComponents = function getMatchedComponents () {
	  if (!this.currentRoute) {
	    return []
	  }
	  return [].concat.apply([], this.currentRoute.matched.map(function (m) {
	    return Object.keys(m.components).map(function (key) {
	      return m.components[key]
	    })
	  }))
	};

	Object.defineProperties( VueRouter.prototype, prototypeAccessors );

	VueRouter.install = install

	if (inBrowser && window.Vue) {
	  window.Vue.use(VueRouter)
	}

	return VueRouter;

	})));

/***/ },
/* 3 */
/***/ function(module, exports) {

	/*!
	 * vue-resource v1.0.3
	 * https://github.com/vuejs/vue-resource
	 * Released under the MIT License.
	 */

	'use strict';

	/**
	 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
	 */

	var RESOLVED = 0;
	var REJECTED = 1;
	var PENDING = 2;

	function Promise$1(executor) {

	    this.state = PENDING;
	    this.value = undefined;
	    this.deferred = [];

	    var promise = this;

	    try {
	        executor(function (x) {
	            promise.resolve(x);
	        }, function (r) {
	            promise.reject(r);
	        });
	    } catch (e) {
	        promise.reject(e);
	    }
	}

	Promise$1.reject = function (r) {
	    return new Promise$1(function (resolve, reject) {
	        reject(r);
	    });
	};

	Promise$1.resolve = function (x) {
	    return new Promise$1(function (resolve, reject) {
	        resolve(x);
	    });
	};

	Promise$1.all = function all(iterable) {
	    return new Promise$1(function (resolve, reject) {
	        var count = 0,
	            result = [];

	        if (iterable.length === 0) {
	            resolve(result);
	        }

	        function resolver(i) {
	            return function (x) {
	                result[i] = x;
	                count += 1;

	                if (count === iterable.length) {
	                    resolve(result);
	                }
	            };
	        }

	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise$1.resolve(iterable[i]).then(resolver(i), reject);
	        }
	    });
	};

	Promise$1.race = function race(iterable) {
	    return new Promise$1(function (resolve, reject) {
	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise$1.resolve(iterable[i]).then(resolve, reject);
	        }
	    });
	};

	var p$1 = Promise$1.prototype;

	p$1.resolve = function resolve(x) {
	    var promise = this;

	    if (promise.state === PENDING) {
	        if (x === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }

	        var called = false;

	        try {
	            var then = x && x['then'];

	            if (x !== null && typeof x === 'object' && typeof then === 'function') {
	                then.call(x, function (x) {
	                    if (!called) {
	                        promise.resolve(x);
	                    }
	                    called = true;
	                }, function (r) {
	                    if (!called) {
	                        promise.reject(r);
	                    }
	                    called = true;
	                });
	                return;
	            }
	        } catch (e) {
	            if (!called) {
	                promise.reject(e);
	            }
	            return;
	        }

	        promise.state = RESOLVED;
	        promise.value = x;
	        promise.notify();
	    }
	};

	p$1.reject = function reject(reason) {
	    var promise = this;

	    if (promise.state === PENDING) {
	        if (reason === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }

	        promise.state = REJECTED;
	        promise.value = reason;
	        promise.notify();
	    }
	};

	p$1.notify = function notify() {
	    var promise = this;

	    nextTick(function () {
	        if (promise.state !== PENDING) {
	            while (promise.deferred.length) {
	                var deferred = promise.deferred.shift(),
	                    onResolved = deferred[0],
	                    onRejected = deferred[1],
	                    resolve = deferred[2],
	                    reject = deferred[3];

	                try {
	                    if (promise.state === RESOLVED) {
	                        if (typeof onResolved === 'function') {
	                            resolve(onResolved.call(undefined, promise.value));
	                        } else {
	                            resolve(promise.value);
	                        }
	                    } else if (promise.state === REJECTED) {
	                        if (typeof onRejected === 'function') {
	                            resolve(onRejected.call(undefined, promise.value));
	                        } else {
	                            reject(promise.value);
	                        }
	                    }
	                } catch (e) {
	                    reject(e);
	                }
	            }
	        }
	    });
	};

	p$1.then = function then(onResolved, onRejected) {
	    var promise = this;

	    return new Promise$1(function (resolve, reject) {
	        promise.deferred.push([onResolved, onRejected, resolve, reject]);
	        promise.notify();
	    });
	};

	p$1.catch = function (onRejected) {
	    return this.then(undefined, onRejected);
	};

	/**
	 * Promise adapter.
	 */

	if (typeof Promise === 'undefined') {
	    window.Promise = Promise$1;
	}

	function PromiseObj(executor, context) {

	    if (executor instanceof Promise) {
	        this.promise = executor;
	    } else {
	        this.promise = new Promise(executor.bind(context));
	    }

	    this.context = context;
	}

	PromiseObj.all = function (iterable, context) {
	    return new PromiseObj(Promise.all(iterable), context);
	};

	PromiseObj.resolve = function (value, context) {
	    return new PromiseObj(Promise.resolve(value), context);
	};

	PromiseObj.reject = function (reason, context) {
	    return new PromiseObj(Promise.reject(reason), context);
	};

	PromiseObj.race = function (iterable, context) {
	    return new PromiseObj(Promise.race(iterable), context);
	};

	var p = PromiseObj.prototype;

	p.bind = function (context) {
	    this.context = context;
	    return this;
	};

	p.then = function (fulfilled, rejected) {

	    if (fulfilled && fulfilled.bind && this.context) {
	        fulfilled = fulfilled.bind(this.context);
	    }

	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }

	    return new PromiseObj(this.promise.then(fulfilled, rejected), this.context);
	};

	p.catch = function (rejected) {

	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }

	    return new PromiseObj(this.promise.catch(rejected), this.context);
	};

	p.finally = function (callback) {

	    return this.then(function (value) {
	        callback.call(this);
	        return value;
	    }, function (reason) {
	        callback.call(this);
	        return Promise.reject(reason);
	    });
	};

	/**
	 * Utility functions.
	 */

	var debug = false;var util = {};var slice = [].slice;


	function Util (Vue) {
	    util = Vue.util;
	    debug = Vue.config.debug || !Vue.config.silent;
	}

	function warn(msg) {
	    if (typeof console !== 'undefined' && debug) {
	        console.warn('[VueResource warn]: ' + msg);
	    }
	}

	function error(msg) {
	    if (typeof console !== 'undefined') {
	        console.error(msg);
	    }
	}

	function nextTick(cb, ctx) {
	    return util.nextTick(cb, ctx);
	}

	function trim(str) {
	    return str.replace(/^\s*|\s*$/g, '');
	}

	function toLower(str) {
	    return str ? str.toLowerCase() : '';
	}

	function toUpper(str) {
	    return str ? str.toUpperCase() : '';
	}

	var isArray = Array.isArray;

	function isString(val) {
	    return typeof val === 'string';
	}

	function isBoolean(val) {
	    return val === true || val === false;
	}

	function isFunction(val) {
	    return typeof val === 'function';
	}

	function isObject(obj) {
	    return obj !== null && typeof obj === 'object';
	}

	function isPlainObject(obj) {
	    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
	}

	function isBlob(obj) {
	    return typeof Blob !== 'undefined' && obj instanceof Blob;
	}

	function isFormData(obj) {
	    return typeof FormData !== 'undefined' && obj instanceof FormData;
	}

	function when(value, fulfilled, rejected) {

	    var promise = PromiseObj.resolve(value);

	    if (arguments.length < 2) {
	        return promise;
	    }

	    return promise.then(fulfilled, rejected);
	}

	function options(fn, obj, opts) {

	    opts = opts || {};

	    if (isFunction(opts)) {
	        opts = opts.call(obj);
	    }

	    return merge(fn.bind({ $vm: obj, $options: opts }), fn, { $options: opts });
	}

	function each(obj, iterator) {

	    var i, key;

	    if (obj && typeof obj.length == 'number') {
	        for (i = 0; i < obj.length; i++) {
	            iterator.call(obj[i], obj[i], i);
	        }
	    } else if (isObject(obj)) {
	        for (key in obj) {
	            if (obj.hasOwnProperty(key)) {
	                iterator.call(obj[key], obj[key], key);
	            }
	        }
	    }

	    return obj;
	}

	var assign = Object.assign || _assign;

	function merge(target) {

	    var args = slice.call(arguments, 1);

	    args.forEach(function (source) {
	        _merge(target, source, true);
	    });

	    return target;
	}

	function defaults(target) {

	    var args = slice.call(arguments, 1);

	    args.forEach(function (source) {

	        for (var key in source) {
	            if (target[key] === undefined) {
	                target[key] = source[key];
	            }
	        }
	    });

	    return target;
	}

	function _assign(target) {

	    var args = slice.call(arguments, 1);

	    args.forEach(function (source) {
	        _merge(target, source);
	    });

	    return target;
	}

	function _merge(target, source, deep) {
	    for (var key in source) {
	        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
	                target[key] = {};
	            }
	            if (isArray(source[key]) && !isArray(target[key])) {
	                target[key] = [];
	            }
	            _merge(target[key], source[key], deep);
	        } else if (source[key] !== undefined) {
	            target[key] = source[key];
	        }
	    }
	}

	/**
	 * Root Prefix Transform.
	 */

	function root (options, next) {

	    var url = next(options);

	    if (isString(options.root) && !url.match(/^(https?:)?\//)) {
	        url = options.root + '/' + url;
	    }

	    return url;
	}

	/**
	 * Query Parameter Transform.
	 */

	function query (options, next) {

	    var urlParams = Object.keys(Url.options.params),
	        query = {},
	        url = next(options);

	    each(options.params, function (value, key) {
	        if (urlParams.indexOf(key) === -1) {
	            query[key] = value;
	        }
	    });

	    query = Url.params(query);

	    if (query) {
	        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
	    }

	    return url;
	}

	/**
	 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
	 */

	function expand(url, params, variables) {

	    var tmpl = parse(url),
	        expanded = tmpl.expand(params);

	    if (variables) {
	        variables.push.apply(variables, tmpl.vars);
	    }

	    return expanded;
	}

	function parse(template) {

	    var operators = ['+', '#', '.', '/', ';', '?', '&'],
	        variables = [];

	    return {
	        vars: variables,
	        expand: function (context) {
	            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
	                if (expression) {

	                    var operator = null,
	                        values = [];

	                    if (operators.indexOf(expression.charAt(0)) !== -1) {
	                        operator = expression.charAt(0);
	                        expression = expression.substr(1);
	                    }

	                    expression.split(/,/g).forEach(function (variable) {
	                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
	                        values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
	                        variables.push(tmp[1]);
	                    });

	                    if (operator && operator !== '+') {

	                        var separator = ',';

	                        if (operator === '?') {
	                            separator = '&';
	                        } else if (operator !== '#') {
	                            separator = operator;
	                        }

	                        return (values.length !== 0 ? operator : '') + values.join(separator);
	                    } else {
	                        return values.join(',');
	                    }
	                } else {
	                    return encodeReserved(literal);
	                }
	            });
	        }
	    };
	}

	function getValues(context, operator, key, modifier) {

	    var value = context[key],
	        result = [];

	    if (isDefined(value) && value !== '') {
	        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
	            value = value.toString();

	            if (modifier && modifier !== '*') {
	                value = value.substring(0, parseInt(modifier, 10));
	            }

	            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
	        } else {
	            if (modifier === '*') {
	                if (Array.isArray(value)) {
	                    value.filter(isDefined).forEach(function (value) {
	                        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
	                    });
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (isDefined(value[k])) {
	                            result.push(encodeValue(operator, value[k], k));
	                        }
	                    });
	                }
	            } else {
	                var tmp = [];

	                if (Array.isArray(value)) {
	                    value.filter(isDefined).forEach(function (value) {
	                        tmp.push(encodeValue(operator, value));
	                    });
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (isDefined(value[k])) {
	                            tmp.push(encodeURIComponent(k));
	                            tmp.push(encodeValue(operator, value[k].toString()));
	                        }
	                    });
	                }

	                if (isKeyOperator(operator)) {
	                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
	                } else if (tmp.length !== 0) {
	                    result.push(tmp.join(','));
	                }
	            }
	        }
	    } else {
	        if (operator === ';') {
	            result.push(encodeURIComponent(key));
	        } else if (value === '' && (operator === '&' || operator === '?')) {
	            result.push(encodeURIComponent(key) + '=');
	        } else if (value === '') {
	            result.push('');
	        }
	    }

	    return result;
	}

	function isDefined(value) {
	    return value !== undefined && value !== null;
	}

	function isKeyOperator(operator) {
	    return operator === ';' || operator === '&' || operator === '?';
	}

	function encodeValue(operator, value, key) {

	    value = operator === '+' || operator === '#' ? encodeReserved(value) : encodeURIComponent(value);

	    if (key) {
	        return encodeURIComponent(key) + '=' + value;
	    } else {
	        return value;
	    }
	}

	function encodeReserved(str) {
	    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
	        if (!/%[0-9A-Fa-f]/.test(part)) {
	            part = encodeURI(part);
	        }
	        return part;
	    }).join('');
	}

	/**
	 * URL Template (RFC 6570) Transform.
	 */

	function template (options) {

	    var variables = [],
	        url = expand(options.url, options.params, variables);

	    variables.forEach(function (key) {
	        delete options.params[key];
	    });

	    return url;
	}

	/**
	 * Service for URL templating.
	 */

	var ie = document.documentMode;
	var el = document.createElement('a');

	function Url(url, params) {

	    var self = this || {},
	        options = url,
	        transform;

	    if (isString(url)) {
	        options = { url: url, params: params };
	    }

	    options = merge({}, Url.options, self.$options, options);

	    Url.transforms.forEach(function (handler) {
	        transform = factory(handler, transform, self.$vm);
	    });

	    return transform(options);
	}

	/**
	 * Url options.
	 */

	Url.options = {
	    url: '',
	    root: null,
	    params: {}
	};

	/**
	 * Url transforms.
	 */

	Url.transforms = [template, query, root];

	/**
	 * Encodes a Url parameter string.
	 *
	 * @param {Object} obj
	 */

	Url.params = function (obj) {

	    var params = [],
	        escape = encodeURIComponent;

	    params.add = function (key, value) {

	        if (isFunction(value)) {
	            value = value();
	        }

	        if (value === null) {
	            value = '';
	        }

	        this.push(escape(key) + '=' + escape(value));
	    };

	    serialize(params, obj);

	    return params.join('&').replace(/%20/g, '+');
	};

	/**
	 * Parse a URL and return its components.
	 *
	 * @param {String} url
	 */

	Url.parse = function (url) {

	    if (ie) {
	        el.href = url;
	        url = el.href;
	    }

	    el.href = url;

	    return {
	        href: el.href,
	        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
	        port: el.port,
	        host: el.host,
	        hostname: el.hostname,
	        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
	        search: el.search ? el.search.replace(/^\?/, '') : '',
	        hash: el.hash ? el.hash.replace(/^#/, '') : ''
	    };
	};

	function factory(handler, next, vm) {
	    return function (options) {
	        return handler.call(vm, options, next);
	    };
	}

	function serialize(params, obj, scope) {

	    var array = isArray(obj),
	        plain = isPlainObject(obj),
	        hash;

	    each(obj, function (value, key) {

	        hash = isObject(value) || isArray(value);

	        if (scope) {
	            key = scope + '[' + (plain || hash ? key : '') + ']';
	        }

	        if (!scope && array) {
	            params.add(value.name, value.value);
	        } else if (hash) {
	            serialize(params, value, key);
	        } else {
	            params.add(key, value);
	        }
	    });
	}

	/**
	 * XDomain client (Internet Explorer).
	 */

	function xdrClient (request) {
	    return new PromiseObj(function (resolve) {

	        var xdr = new XDomainRequest(),
	            handler = function (_ref) {
	            var type = _ref.type;


	            var status = 0;

	            if (type === 'load') {
	                status = 200;
	            } else if (type === 'error') {
	                status = 500;
	            }

	            resolve(request.respondWith(xdr.responseText, { status: status }));
	        };

	        request.abort = function () {
	            return xdr.abort();
	        };

	        xdr.open(request.method, request.getUrl());
	        xdr.timeout = 0;
	        xdr.onload = handler;
	        xdr.onerror = handler;
	        xdr.ontimeout = handler;
	        xdr.onprogress = function () {};
	        xdr.send(request.getBody());
	    });
	}

	/**
	 * CORS Interceptor.
	 */

	var ORIGIN_URL = Url.parse(location.href);
	var SUPPORTS_CORS = 'withCredentials' in new XMLHttpRequest();

	function cors (request, next) {

	    if (!isBoolean(request.crossOrigin) && crossOrigin(request)) {
	        request.crossOrigin = true;
	    }

	    if (request.crossOrigin) {

	        if (!SUPPORTS_CORS) {
	            request.client = xdrClient;
	        }

	        delete request.emulateHTTP;
	    }

	    next();
	}

	function crossOrigin(request) {

	    var requestUrl = Url.parse(Url(request));

	    return requestUrl.protocol !== ORIGIN_URL.protocol || requestUrl.host !== ORIGIN_URL.host;
	}

	/**
	 * Body Interceptor.
	 */

	function body (request, next) {

	    if (isFormData(request.body)) {

	        request.headers.delete('Content-Type');
	    } else if (isObject(request.body) || isArray(request.body)) {

	        if (request.emulateJSON) {
	            request.body = Url.params(request.body);
	            request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
	        } else {
	            request.body = JSON.stringify(request.body);
	        }
	    }

	    next(function (response) {

	        Object.defineProperty(response, 'data', {
	            get: function () {
	                return this.body;
	            },
	            set: function (body) {
	                this.body = body;
	            }
	        });

	        return response.bodyText ? when(response.text(), function (text) {

	            var type = response.headers.get('Content-Type');

	            if (isString(type) && type.indexOf('application/json') === 0) {

	                try {
	                    response.body = JSON.parse(text);
	                } catch (e) {
	                    response.body = null;
	                }
	            } else {
	                response.body = text;
	            }

	            return response;
	        }) : response;
	    });
	}

	/**
	 * JSONP client.
	 */

	function jsonpClient (request) {
	    return new PromiseObj(function (resolve) {

	        var name = request.jsonp || 'callback',
	            callback = '_jsonp' + Math.random().toString(36).substr(2),
	            body = null,
	            handler,
	            script;

	        handler = function (_ref) {
	            var type = _ref.type;


	            var status = 0;

	            if (type === 'load' && body !== null) {
	                status = 200;
	            } else if (type === 'error') {
	                status = 500;
	            }

	            resolve(request.respondWith(body, { status: status }));

	            delete window[callback];
	            document.body.removeChild(script);
	        };

	        request.params[name] = callback;

	        window[callback] = function (result) {
	            body = JSON.stringify(result);
	        };

	        script = document.createElement('script');
	        script.src = request.getUrl();
	        script.type = 'text/javascript';
	        script.async = true;
	        script.onload = handler;
	        script.onerror = handler;

	        document.body.appendChild(script);
	    });
	}

	/**
	 * JSONP Interceptor.
	 */

	function jsonp (request, next) {

	    if (request.method == 'JSONP') {
	        request.client = jsonpClient;
	    }

	    next(function (response) {

	        if (request.method == 'JSONP') {

	            return when(response.json(), function (json) {

	                response.body = json;

	                return response;
	            });
	        }
	    });
	}

	/**
	 * Before Interceptor.
	 */

	function before (request, next) {

	    if (isFunction(request.before)) {
	        request.before.call(this, request);
	    }

	    next();
	}

	/**
	 * HTTP method override Interceptor.
	 */

	function method (request, next) {

	    if (request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
	        request.headers.set('X-HTTP-Method-Override', request.method);
	        request.method = 'POST';
	    }

	    next();
	}

	/**
	 * Header Interceptor.
	 */

	function header (request, next) {

	    var headers = assign({}, Http.headers.common, !request.crossOrigin ? Http.headers.custom : {}, Http.headers[toLower(request.method)]);

	    each(headers, function (value, name) {
	        if (!request.headers.has(name)) {
	            request.headers.set(name, value);
	        }
	    });

	    next();
	}

	/**
	 * Timeout Interceptor.
	 */

	function timeout (request, next) {

	    var timeout;

	    if (request.timeout) {
	        timeout = setTimeout(function () {
	            request.abort();
	        }, request.timeout);
	    }

	    next(function (response) {

	        clearTimeout(timeout);
	    });
	}

	/**
	 * XMLHttp client.
	 */

	function xhrClient (request) {
	    return new PromiseObj(function (resolve) {

	        var xhr = new XMLHttpRequest(),
	            handler = function (event) {

	            var response = request.respondWith('response' in xhr ? xhr.response : xhr.responseText, {
	                status: xhr.status === 1223 ? 204 : xhr.status, // IE9 status bug
	                statusText: xhr.status === 1223 ? 'No Content' : trim(xhr.statusText)
	            });

	            each(trim(xhr.getAllResponseHeaders()).split('\n'), function (row) {
	                response.headers.append(row.slice(0, row.indexOf(':')), row.slice(row.indexOf(':') + 1));
	            });

	            resolve(response);
	        };

	        request.abort = function () {
	            return xhr.abort();
	        };

	        if (request.progress) {
	            if (request.method === 'GET') {
	                xhr.addEventListener('progress', request.progress);
	            } else if (/^(POST|PUT)$/i.test(request.method)) {
	                xhr.upload.addEventListener('progress', request.progress);
	            }
	        }

	        xhr.open(request.method, request.getUrl(), true);

	        if ('responseType' in xhr) {
	            xhr.responseType = 'blob';
	        }

	        if (request.credentials === true) {
	            xhr.withCredentials = true;
	        }

	        request.headers.forEach(function (value, name) {
	            xhr.setRequestHeader(name, value);
	        });

	        xhr.timeout = 0;
	        xhr.onload = handler;
	        xhr.onerror = handler;
	        xhr.send(request.getBody());
	    });
	}

	/**
	 * Base client.
	 */

	function Client (context) {

	    var reqHandlers = [sendRequest],
	        resHandlers = [],
	        handler;

	    if (!isObject(context)) {
	        context = null;
	    }

	    function Client(request) {
	        return new PromiseObj(function (resolve) {

	            function exec() {

	                handler = reqHandlers.pop();

	                if (isFunction(handler)) {
	                    handler.call(context, request, next);
	                } else {
	                    warn('Invalid interceptor of type ' + typeof handler + ', must be a function');
	                    next();
	                }
	            }

	            function next(response) {

	                if (isFunction(response)) {

	                    resHandlers.unshift(response);
	                } else if (isObject(response)) {

	                    resHandlers.forEach(function (handler) {
	                        response = when(response, function (response) {
	                            return handler.call(context, response) || response;
	                        });
	                    });

	                    when(response, resolve);

	                    return;
	                }

	                exec();
	            }

	            exec();
	        }, context);
	    }

	    Client.use = function (handler) {
	        reqHandlers.push(handler);
	    };

	    return Client;
	}

	function sendRequest(request, resolve) {

	    var client = request.client || xhrClient;

	    resolve(client(request));
	}

	var classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

	/**
	 * HTTP Headers.
	 */

	var Headers = function () {
	    function Headers(headers) {
	        var _this = this;

	        classCallCheck(this, Headers);


	        this.map = {};

	        each(headers, function (value, name) {
	            return _this.append(name, value);
	        });
	    }

	    Headers.prototype.has = function has(name) {
	        return getName(this.map, name) !== null;
	    };

	    Headers.prototype.get = function get(name) {

	        var list = this.map[getName(this.map, name)];

	        return list ? list[0] : null;
	    };

	    Headers.prototype.getAll = function getAll(name) {
	        return this.map[getName(this.map, name)] || [];
	    };

	    Headers.prototype.set = function set(name, value) {
	        this.map[normalizeName(getName(this.map, name) || name)] = [trim(value)];
	    };

	    Headers.prototype.append = function append(name, value) {

	        var list = this.getAll(name);

	        if (list.length) {
	            list.push(trim(value));
	        } else {
	            this.set(name, value);
	        }
	    };

	    Headers.prototype.delete = function _delete(name) {
	        delete this.map[getName(this.map, name)];
	    };

	    Headers.prototype.forEach = function forEach(callback, thisArg) {
	        var _this2 = this;

	        each(this.map, function (list, name) {
	            each(list, function (value) {
	                return callback.call(thisArg, value, name, _this2);
	            });
	        });
	    };

	    return Headers;
	}();

	function getName(map, name) {
	    return Object.keys(map).reduce(function (prev, curr) {
	        return toLower(name) === toLower(curr) ? curr : prev;
	    }, null);
	}

	function normalizeName(name) {

	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	        throw new TypeError('Invalid character in header field name');
	    }

	    return trim(name);
	}

	/**
	 * HTTP Response.
	 */

	var Response = function () {
	    function Response(body, _ref) {
	        var url = _ref.url;
	        var headers = _ref.headers;
	        var status = _ref.status;
	        var statusText = _ref.statusText;
	        classCallCheck(this, Response);


	        this.url = url;
	        this.ok = status >= 200 && status < 300;
	        this.status = status || 0;
	        this.statusText = statusText || '';
	        this.headers = new Headers(headers);
	        this.body = body;

	        if (isString(body)) {

	            this.bodyText = body;
	        } else if (isBlob(body)) {

	            this.bodyBlob = body;

	            if (isBlobText(body)) {
	                this.bodyText = blobText(body);
	            }
	        }
	    }

	    Response.prototype.blob = function blob() {
	        return when(this.bodyBlob);
	    };

	    Response.prototype.text = function text() {
	        return when(this.bodyText);
	    };

	    Response.prototype.json = function json() {
	        return when(this.text(), function (text) {
	            return JSON.parse(text);
	        });
	    };

	    return Response;
	}();

	function blobText(body) {
	    return new PromiseObj(function (resolve) {

	        var reader = new FileReader();

	        reader.readAsText(body);
	        reader.onload = function () {
	            resolve(reader.result);
	        };
	    });
	}

	function isBlobText(body) {
	    return body.type.indexOf('text') === 0 || body.type.indexOf('json') !== -1;
	}

	/**
	 * HTTP Request.
	 */

	var Request = function () {
	    function Request(options) {
	        classCallCheck(this, Request);


	        this.body = null;
	        this.params = {};

	        assign(this, options, {
	            method: toUpper(options.method || 'GET')
	        });

	        if (!(this.headers instanceof Headers)) {
	            this.headers = new Headers(this.headers);
	        }
	    }

	    Request.prototype.getUrl = function getUrl() {
	        return Url(this);
	    };

	    Request.prototype.getBody = function getBody() {
	        return this.body;
	    };

	    Request.prototype.respondWith = function respondWith(body, options) {
	        return new Response(body, assign(options || {}, { url: this.getUrl() }));
	    };

	    return Request;
	}();

	/**
	 * Service for sending network requests.
	 */

	var CUSTOM_HEADERS = { 'X-Requested-With': 'XMLHttpRequest' };
	var COMMON_HEADERS = { 'Accept': 'application/json, text/plain, */*' };
	var JSON_CONTENT_TYPE = { 'Content-Type': 'application/json;charset=utf-8' };

	function Http(options) {

	    var self = this || {},
	        client = Client(self.$vm);

	    defaults(options || {}, self.$options, Http.options);

	    Http.interceptors.forEach(function (handler) {
	        client.use(handler);
	    });

	    return client(new Request(options)).then(function (response) {

	        return response.ok ? response : PromiseObj.reject(response);
	    }, function (response) {

	        if (response instanceof Error) {
	            error(response);
	        }

	        return PromiseObj.reject(response);
	    });
	}

	Http.options = {};

	Http.headers = {
	    put: JSON_CONTENT_TYPE,
	    post: JSON_CONTENT_TYPE,
	    patch: JSON_CONTENT_TYPE,
	    delete: JSON_CONTENT_TYPE,
	    custom: CUSTOM_HEADERS,
	    common: COMMON_HEADERS
	};

	Http.interceptors = [before, timeout, method, body, jsonp, header, cors];

	['get', 'delete', 'head', 'jsonp'].forEach(function (method) {

	    Http[method] = function (url, options) {
	        return this(assign(options || {}, { url: url, method: method }));
	    };
	});

	['post', 'put', 'patch'].forEach(function (method) {

	    Http[method] = function (url, body, options) {
	        return this(assign(options || {}, { url: url, method: method, body: body }));
	    };
	});

	/**
	 * Service for interacting with RESTful services.
	 */

	function Resource(url, params, actions, options) {

	    var self = this || {},
	        resource = {};

	    actions = assign({}, Resource.actions, actions);

	    each(actions, function (action, name) {

	        action = merge({ url: url, params: assign({}, params) }, options, action);

	        resource[name] = function () {
	            return (self.$http || Http)(opts(action, arguments));
	        };
	    });

	    return resource;
	}

	function opts(action, args) {

	    var options = assign({}, action),
	        params = {},
	        body;

	    switch (args.length) {

	        case 2:

	            params = args[0];
	            body = args[1];

	            break;

	        case 1:

	            if (/^(POST|PUT|PATCH)$/i.test(options.method)) {
	                body = args[0];
	            } else {
	                params = args[0];
	            }

	            break;

	        case 0:

	            break;

	        default:

	            throw 'Expected up to 4 arguments [params, body], got ' + args.length + ' arguments';
	    }

	    options.body = body;
	    options.params = assign({}, options.params, params);

	    return options;
	}

	Resource.actions = {

	    get: { method: 'GET' },
	    save: { method: 'POST' },
	    query: { method: 'GET' },
	    update: { method: 'PUT' },
	    remove: { method: 'DELETE' },
	    delete: { method: 'DELETE' }

	};

	/**
	 * Install plugin.
	 */

	function plugin(Vue) {

	    if (plugin.installed) {
	        return;
	    }

	    Util(Vue);

	    Vue.url = Url;
	    Vue.http = Http;
	    Vue.resource = Resource;
	    Vue.Promise = PromiseObj;

	    Object.defineProperties(Vue.prototype, {

	        $url: {
	            get: function () {
	                return options(Vue.url, this, this.$options.url);
	            }
	        },

	        $http: {
	            get: function () {
	                return options(Vue.http, this, this.$options.http);
	            }
	        },

	        $resource: {
	            get: function () {
	                return Vue.resource.bind(this);
	            }
	        },

	        $promise: {
	            get: function () {
	                var _this = this;

	                return function (executor) {
	                    return new Vue.Promise(executor, _this);
	                };
	            }
	        }

	    });
	}

	if (typeof window !== 'undefined' && window.Vue) {
	    window.Vue.use(plugin);
	}

	module.exports = plugin;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(5)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources/assets/js/App.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(82)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-8e58034a/App.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _vueMultiselect = __webpack_require__(6);

	var _vueMultiselect2 = _interopRequireDefault(_vueMultiselect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// <template>
	// <div>
	// 	<div class="columns">
	// 		<div class="column">
	// 			<multiselect
	// 		      placeholder="Boala"
	// 		      :selected="selected"
	// 		      :options="options"
	// 		      @update="updateSelected">
	// 		    </multiselect>
	// 		</div>
	// 		<div class="column">
	// 			<multiselect
	// 		      placeholder="An"
	// 		      :selected="selectedYear"
	// 		      :options="years"
	// 		      @update="updateSelectedYear">
	// 		    </multiselect>
	// 		</div>
	// 	</div>
	// 	<div id="map" class="map"></div>
	// </div>
	// </template>
	//
	//
	// <script>

	__webpack_require__(7);
	var judete = __webpack_require__(81);

	function initmap() {

		var map = L.map('map').setView([45.94, 24.97], 7);

		L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' + 'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id: 'mapbox.light'
		}).addTo(map);

		// control that shows state info on hover
		var info = L.control();

		info.onAdd = function (map) {
			this._div = L.DomUtil.create('div', 'info');
			this.update();
			return this._div;
		};

		info.update = function (props) {
			this._div.innerHTML = '<h4>Data info</h4>' + (props ? '<b>' + props.name + '</b><br />' + props.density + ' loc / km<sup>2</sup>' : 'Pune mouse-ul pe un judet');
		};

		info.addTo(map);

		// get color depending on population density value
		function getColor(d) {
			return d > 1000 ? '#800026' : d > 500 ? '#BD0026' : d > 200 ? '#E31A1C' : d > 100 ? '#FC4E2A' : d > 50 ? '#FD8D3C' : d > 20 ? '#FEB24C' : d > 10 ? '#FED976' : '#FFEDA0';
		}

		function style(feature) {
			return {
				weight: 2,
				opacity: 1,
				color: 'white',
				dashArray: '3',
				fillOpacity: 0.7,
				fillColor: getColor(feature.properties.density)
			};
		}

		function highlightFeature(e) {
			var layer = e.target;

			layer.setStyle({
				weight: 2,
				color: '#666',
				dashArray: '',
				fillOpacity: 0.7
			});

			if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
				layer.bringToFront();
			}

			info.update(layer.feature.properties);
		}

		var geojson;

		function resetHighlight(e) {
			geojson.resetStyle(e.target);
			info.update();
		}

		function zoomToFeature(e) {
			map.fitBounds(e.target.getBounds());
		}

		function onEachFeature(feature, layer) {
			layer.on({
				mouseover: highlightFeature,
				mouseout: resetHighlight,
				click: zoomToFeature
			});
		}

		geojson = L.geoJson(judete, {
			style: style,
			onEachFeature: onEachFeature
		}).addTo(map);

		map.attributionControl.addAttribution('Data &copy; <a href="http://data.gov.ro">Data Gov</a>');

		var legend = L.control({ position: 'bottomright' });

		legend.onAdd = function (map) {

			var div = L.DomUtil.create('div', 'info legend'),
			    grades = [0, 10, 20, 50, 100, 200, 500, 1000],
			    labels = [],
			    from,
			    to;

			for (var i = 0; i < grades.length; i++) {
				from = grades[i];
				to = grades[i + 1];

				labels.push('<i style="background:' + getColor(from + 1) + '"></i> ' + from + (to ? '&ndash;' + to : '+'));
			}

			div.innerHTML = labels.join('<br>');
			return div;
		};

		legend.addTo(map);
	}

	exports.default = {
		components: { Multiselect: _vueMultiselect2.default },
		name: 'app',
		data: function data() {
			return {
				selected: null,
				selectedYear: null,
				options: ['Test', 'test2'],
				years: ['2015', '2016']
			};
		},
		mounted: function mounted() {
			initmap();
		},

		methods: {
			updateSelected: function updateSelected(newSelected) {
				this.selected = newSelected;
			},
			updateSelectedYear: function updateSelectedYear(newSelected) {
				this.selectedYear = newSelected;
			}
		}
	};
	// </script>

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.VueMultiselect=e():t.VueMultiselect=e()}(this,function(){return function(t){function e(i){if(n[i])return n[i].exports;var r=n[i]={exports:{},id:i,loaded:!1};return t[i].call(r.exports,r,r.exports,e),r.loaded=!0,r.exports}var n={};return e.m=t,e.c=n,e.p="/",e(0)}([function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0}),e.deepClone=e.pointerMixin=e.multiselectMixin=e.Multiselect=void 0;var r=n(80),o=i(r),s=n(28),l=i(s),a=n(29),u=i(a),c=n(30),f=i(c);e["default"]=o["default"],e.Multiselect=o["default"],e.multiselectMixin=l["default"],e.pointerMixin=u["default"],e.deepClone=f["default"]},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){var i=n(56),r=n(15);t.exports=function(t){return i(r(t))}},function(t,e,n){t.exports=!n(9)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e,n){var i=n(6),r=n(13);t.exports=n(4)?function(t,e,n){return i.f(t,e,r(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var i=n(11),r=n(34),o=n(25),s=Object.defineProperty;e.f=n(4)?Object.defineProperty:function(t,e,n){if(i(t),e=o(e,!0),i(n),r)try{return s(t,e,n)}catch(l){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var i=n(23)("wks"),r=n(14),o=n(1).Symbol,s="function"==typeof o,l=t.exports=function(t){return i[t]||(i[t]=s&&o[t]||(s?o:r)("Symbol."+t))};l.store=i},function(t,e){var n=t.exports={version:"2.4.0"};"number"==typeof __e&&(__e=n)},function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},function(t,e,n){var i=n(39),r=n(16);t.exports=Object.keys||function(t){return i(t,r)}},function(t,e,n){var i=n(12);t.exports=function(t){if(!i(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n=0,i=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+i).toString(36))}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var i=n(1),r=n(8),o=n(53),s=n(5),l="prototype",a=function(t,e,n){var u,c,f,p=t&a.F,d=t&a.G,h=t&a.S,m=t&a.P,g=t&a.B,v=t&a.W,b=d?r:r[e]||(r[e]={}),y=b[l],_=d?i:h?i[e]:(i[e]||{})[l];d&&(n=e);for(u in n)c=!p&&_&&void 0!==_[u],c&&u in b||(f=c?_[u]:n[u],b[u]=d&&"function"!=typeof _[u]?n[u]:g&&c?o(f,i):v&&_[u]==f?function(t){var e=function(e,n,i){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,i)}return t.apply(this,arguments)};return e[l]=t[l],e}(f):m&&"function"==typeof f?o(Function.call,f):f,m&&((b.virtual||(b.virtual={}))[u]=f,t&a.R&&y&&!y[u]&&s(y,u,f)))};a.F=1,a.G=2,a.S=4,a.P=8,a.B=16,a.W=32,a.U=64,a.R=128,t.exports=a},function(t,e){t.exports={}},function(t,e){t.exports=!0},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){var i=n(6).f,r=n(2),o=n(7)("toStringTag");t.exports=function(t,e,n){t&&!r(t=n?t:t.prototype,o)&&i(t,o,{configurable:!0,value:e})}},function(t,e,n){var i=n(23)("keys"),r=n(14);t.exports=function(t){return i[t]||(i[t]=r(t))}},function(t,e,n){var i=n(1),r="__core-js_shared__",o=i[r]||(i[r]={});t.exports=function(t){return o[t]||(o[t]={})}},function(t,e){var n=Math.ceil,i=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?i:n)(t)}},function(t,e,n){var i=n(12);t.exports=function(t,e){if(!i(t))return t;var n,r;if(e&&"function"==typeof(n=t.toString)&&!i(r=n.call(t)))return r;if("function"==typeof(n=t.valueOf)&&!i(r=n.call(t)))return r;if(!e&&"function"==typeof(n=t.toString)&&!i(r=n.call(t)))return r;throw TypeError("Can't convert object to primitive value")}},function(t,e,n){var i=n(1),r=n(8),o=n(19),s=n(27),l=n(6).f;t.exports=function(t){var e=r.Symbol||(r.Symbol=o?{}:i.Symbol||{});"_"==t.charAt(0)||t in e||l(e,t,{value:s.f(t)})}},function(t,e,n){e.f=n(7)},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function r(t,e){if(!t)return!1;var n=t.toString().toLowerCase();return-1!==n.indexOf(e)}var o=n(31),s=i(o),l=n(30),a=i(l);t.exports={data:function(){return{search:"",isOpen:!1,internalValue:this.value||0===this.value?(0,a["default"])(this.value):this.multiple?[]:null}},props:{localSearch:{type:Boolean,"default":!0},options:{type:Array,required:!0},multiple:{type:Boolean,"default":!1},value:{type:null,"default":null},trackBy:{type:String},label:{type:String},searchable:{type:Boolean,"default":!0},clearOnSelect:{type:Boolean,"default":!0},hideSelected:{type:Boolean,"default":!1},placeholder:{type:String,"default":"Select option"},maxHeight:{type:Number,"default":300},allowEmpty:{type:Boolean,"default":!0},resetAfter:{type:Boolean,"default":!1},closeOnSelect:{type:Boolean,"default":!0},customLabel:{type:Function,"default":function(t,e){return e?t[e]:t}},taggable:{type:Boolean,"default":!1},tagPlaceholder:{type:String,"default":"Press enter to create a tag"},max:{type:Number},id:{"default":null},optionsLimit:{type:Number,"default":1e3}},created:function(){this.searchable&&this.adjustSearch()},computed:{filteredOptions:function(){var t=this,e=this.search||"",n=this.hideSelected?this.options.filter(this.isNotSelected):this.options;return this.localSearch&&(n=this.label?n.filter(function(e){return r(e[t.label],t.search)}):n.filter(function(e){return r(e,t.search)})),this.taggable&&e.length&&!this.isExistingOption(e)&&n.unshift({isTag:!0,label:e}),n.slice(0,this.optionsLimit)},valueKeys:function(){var t=this;return this.trackBy?this.multiple?this.internalValue.map(function(e){return e[t.trackBy]}):this.internalValue[this.trackBy]:this.internalValue},optionKeys:function(){var t=this;return this.label?this.options.map(function(e){return e[t.label].toString().toLowerCase()}):this.options.map(function(t){return t.toString().toLowerCase()})},currentOptionLabel:function(){return this.getOptionLabel(this.internalValue)}},watch:{internalValue:function(){this.resetAfter&&(this.internalValue=null,this.search=""),this.adjustSearch()},search:function(){this.search!==this.currentOptionLabel&&this.$emit("search-change",this.search,this.id)},value:function(){this.internalValue=(0,a["default"])(this.value)}},methods:{updateSearch:function(t){this.search=t.trim().toLowerCase()},isExistingOption:function(t){return this.options?this.optionKeys.indexOf(t)>-1:!1},isSelected:function(t){if(!this.internalValue)return!1;var e=this.trackBy?t[this.trackBy]:t;return this.multiple?this.valueKeys.indexOf(e)>-1:this.valueKeys===e},isNotSelected:function(t){return!this.isSelected(t)},getOptionLabel:function(t){return t||0===t?t.isTag?t.label:this.customLabel(t,this.label)+"":""},select:function(t){if(!this.max||!this.multiple||this.internalValue.length!==this.max)if(t.isTag)this.$emit("tag",t.label,this.id),this.search="";else{if(this.multiple){if(this.isSelected(t))return void this.removeElement(t);this.internalValue.push(t)}else{var e=this.isSelected(t);if(e&&!this.allowEmpty)return;this.internalValue=e?null:t}this.$emit("select",(0,a["default"])(t),this.id),this.$emit("input",(0,a["default"])(this.internalValue),this.id),this.closeOnSelect&&this.deactivate()}},removeElement:function(t){if(this.allowEmpty||!(this.internalValue.length<=1)){var e=this.multiple&&"object"===("undefined"==typeof t?"undefined":(0,s["default"])(t))?this.valueKeys.indexOf(t[this.trackBy]):this.valueKeys.indexOf(t);this.internalValue.splice(e,1),this.$emit("remove",(0,a["default"])(t),this.id),this.$emit("input",(0,a["default"])(this.internalValue),this.id)}},removeLastElement:function(){0===this.search.length&&Array.isArray(this.internalValue)&&this.removeElement(this.internalValue[this.internalValue.length-1])},activate:function(){this.isOpen||(this.isOpen=!0,this.searchable?(this.search="",this.$refs.search.focus()):this.$el.focus(),this.$emit("open",this.id))},deactivate:function(){this.isOpen&&(this.isOpen=!1,this.searchable?(this.$refs.search.blur(),this.adjustSearch()):this.$el.blur(),this.$emit("close",(0,a["default"])(this.internalValue),this.id))},adjustSearch:function(){this.searchable&&this.clearOnSelect&&(this.search=this.multiple?"":this.currentOptionLabel)},toggle:function(){this.isOpen?this.deactivate():this.activate()}}}},function(t,e){"use strict";t.exports={data:function(){return{pointer:0,visibleElements:this.maxHeight/40}},props:{showPointer:{type:Boolean,"default":!0}},computed:{pointerPosition:function(){return 40*this.pointer}},watch:{filteredOptions:function(){this.pointerAdjust()}},methods:{optionHighlight:function(t,e){return{"multiselect__option--highlight":t===this.pointer&&this.showPointer,"multiselect__option--selected":this.isSelected(e)}},addPointerElement:function(){this.filteredOptions.length>0&&this.select(this.filteredOptions[this.pointer]),this.pointerReset()},pointerForward:function(){this.pointer<this.filteredOptions.length-1&&(this.pointer++,this.$refs.list.scrollTop<=this.pointerPosition-40*this.visibleElements&&(this.$refs.list.scrollTop=this.pointerPosition-40*(this.visibleElements-1)))},pointerBackward:function(){this.pointer>0&&(this.pointer--,this.$refs.list.scrollTop>=this.pointerPosition&&(this.$refs.list.scrollTop=this.pointerPosition))},pointerReset:function(){this.closeOnSelect&&(this.pointer=0,this.$refs.list&&(this.$refs.list.scrollTop=0))},pointerAdjust:function(){this.pointer>=this.filteredOptions.length-1&&(this.pointer=this.filteredOptions.length?this.filteredOptions.length-1:0)},pointerSet:function(t){this.pointer=t}}}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}var r=n(44),o=i(r),s=n(31),l=i(s),a=function u(t){if(Array.isArray(t))return t.map(u);if(t&&"object"===("undefined"==typeof t?"undefined":(0,l["default"])(t))){for(var e={},n=(0,o["default"])(t),i=0,r=n.length;r>i;i++){var s=n[i];e[s]=u(t[s])}return e}return t};t.exports=a},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var r=n(46),o=i(r),s=n(45),l=i(s),a="function"==typeof l["default"]&&"symbol"==typeof o["default"]?function(t){return typeof t}:function(t){return t&&"function"==typeof l["default"]&&t.constructor===l["default"]?"symbol":typeof t};e["default"]="function"==typeof l["default"]&&"symbol"===a(o["default"])?function(t){return"undefined"==typeof t?"undefined":a(t)}:function(t){return t&&"function"==typeof l["default"]&&t.constructor===l["default"]?"symbol":"undefined"==typeof t?"undefined":a(t)}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var i=n(12),r=n(1).document,o=i(r)&&i(r.createElement);t.exports=function(t){return o?r.createElement(t):{}}},function(t,e,n){t.exports=!n(4)&&!n(9)(function(){return 7!=Object.defineProperty(n(33)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){"use strict";var i=n(19),r=n(17),o=n(40),s=n(5),l=n(2),a=n(18),u=n(58),c=n(21),f=n(65),p=n(7)("iterator"),d=!([].keys&&"next"in[].keys()),h="@@iterator",m="keys",g="values",v=function(){return this};t.exports=function(t,e,n,b,y,_,x){u(n,e,b);var w,O,S,k=function(t){if(!d&&t in E)return E[t];switch(t){case m:return function(){return new n(this,t)};case g:return function(){return new n(this,t)}}return function(){return new n(this,t)}},j=e+" Iterator",P=y==g,C=!1,E=t.prototype,L=E[p]||E[h]||y&&E[y],M=L||k(y),T=y?P?k("entries"):M:void 0,A="Array"==e?E.entries||L:L;if(A&&(S=f(A.call(new t)),S!==Object.prototype&&(c(S,j,!0),i||l(S,p)||s(S,p,v))),P&&L&&L.name!==g&&(C=!0,M=function(){return L.call(this)}),i&&!x||!d&&!C&&E[p]||s(E,p,M),a[e]=M,a[j]=v,y)if(w={values:P?M:k(g),keys:_?M:k(m),entries:T},x)for(O in w)O in E||o(E,O,w[O]);else r(r.P+r.F*(d||C),e,w);return w}},function(t,e,n){var i=n(11),r=n(62),o=n(16),s=n(22)("IE_PROTO"),l=function(){},a="prototype",u=function(){var t,e=n(33)("iframe"),i=o.length,r=">";for(e.style.display="none",n(55).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write("<script>document.F=Object</script"+r),t.close(),u=t.F;i--;)delete u[a][o[i]];return u()};t.exports=Object.create||function(t,e){var n;return null!==t?(l[a]=i(t),n=new l,l[a]=null,n[s]=t):n=u(),void 0===e?n:r(n,e)}},function(t,e,n){var i=n(39),r=n(16).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return i(t,r)}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e,n){var i=n(2),r=n(3),o=n(52)(!1),s=n(22)("IE_PROTO");t.exports=function(t,e){var n,l=r(t),a=0,u=[];for(n in l)n!=s&&i(l,n)&&u.push(n);for(;e.length>a;)i(l,n=e[a++])&&(~o(u,n)||u.push(n));return u}},function(t,e,n){t.exports=n(5)},function(t,e,n){var i=n(15);t.exports=function(t){return Object(i(t))}},function(t,e){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e["default"]={functional:!0,render:function(t,e){return e.props.optionFunction(t,e.props.option,e.props.label)},props:{optionFunction:{type:Function,required:!0},label:{required:!0},option:{}}}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0});var r=n(28),o=i(r),s=n(29),l=i(s),a=n(42),u=i(a);e["default"]={name:"vue-multiselect",components:{MultiselectOption:u["default"]},mixins:[o["default"],l["default"]],props:{selectLabel:{type:String,"default":"Press enter to select"},selectedLabel:{type:String,"default":"Selected"},deselectLabel:{type:String,"default":"Press enter to remove"},showLabels:{type:Boolean,"default":!0},limit:{type:Number,"default":99999},limitText:{type:Function,"default":function(t){return"and "+t+" more"}},loading:{type:Boolean,"default":!1},disabled:{type:Boolean,"default":!1},optionFunction:{type:Function,"default":function(t,e,n){return t("span",{},n)}}},computed:{visibleValue:function(){return this.multiple?this.internalValue.slice(0,this.limit):[]},deselectLabelText:function(){return this.showLabels?this.deselectLabel:""},selectLabelText:function(){return this.showLabels?this.selectLabel:""},selectedLabelText:function(){return this.showLabels?this.selectedLabel:""}}}},function(t,e,n){t.exports={"default":n(47),__esModule:!0}},function(t,e,n){t.exports={"default":n(48),__esModule:!0}},function(t,e,n){t.exports={"default":n(49),__esModule:!0}},function(t,e,n){n(71),t.exports=n(8).Object.keys},function(t,e,n){n(74),n(72),n(75),n(76),t.exports=n(8).Symbol},function(t,e,n){n(73),n(77),t.exports=n(27).f("iterator")},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e){t.exports=function(){}},function(t,e,n){var i=n(3),r=n(69),o=n(68);t.exports=function(t){return function(e,n,s){var l,a=i(e),u=r(a.length),c=o(s,u);if(t&&n!=n){for(;u>c;)if(l=a[c++],l!=l)return!0}else for(;u>c;c++)if((t||c in a)&&a[c]===n)return t||c||0;return!t&&-1}}},function(t,e,n){var i=n(50);t.exports=function(t,e,n){if(i(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,i){return t.call(e,n,i)};case 3:return function(n,i,r){return t.call(e,n,i,r)}}return function(){return t.apply(e,arguments)}}},function(t,e,n){var i=n(10),r=n(38),o=n(20);t.exports=function(t){var e=i(t),n=r.f;if(n)for(var s,l=n(t),a=o.f,u=0;l.length>u;)a.call(t,s=l[u++])&&e.push(s);return e}},function(t,e,n){t.exports=n(1).document&&document.documentElement},function(t,e,n){var i=n(32);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==i(t)?t.split(""):Object(t)}},function(t,e,n){var i=n(32);t.exports=Array.isArray||function(t){return"Array"==i(t)}},function(t,e,n){"use strict";var i=n(36),r=n(13),o=n(21),s={};n(5)(s,n(7)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=i(s,{next:r(1,n)}),o(t,e+" Iterator")}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){var i=n(10),r=n(3);t.exports=function(t,e){for(var n,o=r(t),s=i(o),l=s.length,a=0;l>a;)if(o[n=s[a++]]===e)return n}},function(t,e,n){var i=n(14)("meta"),r=n(12),o=n(2),s=n(6).f,l=0,a=Object.isExtensible||function(){return!0},u=!n(9)(function(){return a(Object.preventExtensions({}))}),c=function(t){s(t,i,{value:{i:"O"+ ++l,w:{}}})},f=function(t,e){if(!r(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!o(t,i)){if(!a(t))return"F";if(!e)return"E";c(t)}return t[i].i},p=function(t,e){if(!o(t,i)){if(!a(t))return!0;if(!e)return!1;c(t)}return t[i].w},d=function(t){return u&&h.NEED&&a(t)&&!o(t,i)&&c(t),t},h=t.exports={KEY:i,NEED:!1,fastKey:f,getWeak:p,onFreeze:d}},function(t,e,n){var i=n(6),r=n(11),o=n(10);t.exports=n(4)?Object.defineProperties:function(t,e){r(t);for(var n,s=o(e),l=s.length,a=0;l>a;)i.f(t,n=s[a++],e[n]);return t}},function(t,e,n){var i=n(20),r=n(13),o=n(3),s=n(25),l=n(2),a=n(34),u=Object.getOwnPropertyDescriptor;e.f=n(4)?u:function(t,e){if(t=o(t),e=s(e,!0),a)try{return u(t,e)}catch(n){}return l(t,e)?r(!i.f.call(t,e),t[e]):void 0}},function(t,e,n){var i=n(3),r=n(37).f,o={}.toString,s="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],l=function(t){try{return r(t)}catch(e){return s.slice()}};t.exports.f=function(t){return s&&"[object Window]"==o.call(t)?l(t):r(i(t))}},function(t,e,n){var i=n(2),r=n(41),o=n(22)("IE_PROTO"),s=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=r(t),i(t,o)?t[o]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?s:null}},function(t,e,n){var i=n(17),r=n(8),o=n(9);t.exports=function(t,e){var n=(r.Object||{})[t]||Object[t],s={};s[t]=e(n),i(i.S+i.F*o(function(){n(1)}),"Object",s)}},function(t,e,n){var i=n(24),r=n(15);t.exports=function(t){return function(e,n){var o,s,l=String(r(e)),a=i(n),u=l.length;return 0>a||a>=u?t?"":void 0:(o=l.charCodeAt(a),55296>o||o>56319||a+1===u||(s=l.charCodeAt(a+1))<56320||s>57343?t?l.charAt(a):o:t?l.slice(a,a+2):(o-55296<<10)+(s-56320)+65536)}}},function(t,e,n){var i=n(24),r=Math.max,o=Math.min;t.exports=function(t,e){return t=i(t),0>t?r(t+e,0):o(t,e)}},function(t,e,n){var i=n(24),r=Math.min;t.exports=function(t){return t>0?r(i(t),9007199254740991):0}},function(t,e,n){"use strict";var i=n(51),r=n(59),o=n(18),s=n(3);t.exports=n(35)(Array,"Array",function(t,e){this._t=s(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,r(1)):"keys"==e?r(0,n):"values"==e?r(0,t[n]):r(0,[n,t[n]])},"values"),o.Arguments=o.Array,i("keys"),i("values"),i("entries")},function(t,e,n){var i=n(41),r=n(10);n(66)("keys",function(){return function(t){return r(i(t))}})},function(t,e){},function(t,e,n){"use strict";var i=n(67)(!0);n(35)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=i(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){"use strict";var i=n(1),r=n(2),o=n(4),s=n(17),l=n(40),a=n(61).KEY,u=n(9),c=n(23),f=n(21),p=n(14),d=n(7),h=n(27),m=n(26),g=n(60),v=n(54),b=n(57),y=n(11),_=n(3),x=n(25),w=n(13),O=n(36),S=n(64),k=n(63),j=n(6),P=n(10),C=k.f,E=j.f,L=S.f,M=i.Symbol,T=i.JSON,A=T&&T.stringify,B="prototype",F=d("_hidden"),V=d("toPrimitive"),N={}.propertyIsEnumerable,D=c("symbol-registry"),$=c("symbols"),R=c("op-symbols"),I=Object[B],z="function"==typeof M,K=i.QObject,H=!K||!K[B]||!K[B].findChild,W=o&&u(function(){return 7!=O(E({},"a",{get:function(){return E(this,"a",{value:7}).a}})).a})?function(t,e,n){var i=C(I,e);i&&delete I[e],E(t,e,n),i&&t!==I&&E(I,e,i)}:E,J=function(t){var e=$[t]=O(M[B]);return e._k=t,e},q=z&&"symbol"==typeof M.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof M},U=function(t,e,n){return t===I&&U(R,e,n),y(t),e=x(e,!0),y(n),r($,e)?(n.enumerable?(r(t,F)&&t[F][e]&&(t[F][e]=!1),n=O(n,{enumerable:w(0,!1)})):(r(t,F)||E(t,F,w(1,{})),t[F][e]=!0),W(t,e,n)):E(t,e,n)},G=function(t,e){y(t);for(var n,i=v(e=_(e)),r=0,o=i.length;o>r;)U(t,n=i[r++],e[n]);return t},Y=function(t,e){return void 0===e?O(t):G(O(t),e)},Q=function(t){var e=N.call(this,t=x(t,!0));return this===I&&r($,t)&&!r(R,t)?!1:e||!r(this,t)||!r($,t)||r(this,F)&&this[F][t]?e:!0},X=function(t,e){if(t=_(t),e=x(e,!0),t!==I||!r($,e)||r(R,e)){var n=C(t,e);return!n||!r($,e)||r(t,F)&&t[F][e]||(n.enumerable=!0),n}},Z=function(t){for(var e,n=L(_(t)),i=[],o=0;n.length>o;)r($,e=n[o++])||e==F||e==a||i.push(e);return i},tt=function(t){for(var e,n=t===I,i=L(n?R:_(t)),o=[],s=0;i.length>s;)r($,e=i[s++])&&(n?r(I,e):!0)&&o.push($[e]);return o};z||(M=function(){if(this instanceof M)throw TypeError("Symbol is not a constructor!");var t=p(arguments.length>0?arguments[0]:void 0),e=function(n){this===I&&e.call(R,n),r(this,F)&&r(this[F],t)&&(this[F][t]=!1),W(this,t,w(1,n))};return o&&H&&W(I,t,{configurable:!0,set:e}),J(t)},l(M[B],"toString",function(){return this._k}),k.f=X,j.f=U,n(37).f=S.f=Z,n(20).f=Q,n(38).f=tt,o&&!n(19)&&l(I,"propertyIsEnumerable",Q,!0),h.f=function(t){return J(d(t))}),s(s.G+s.W+s.F*!z,{Symbol:M});for(var et="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),nt=0;et.length>nt;)d(et[nt++]);for(var et=P(d.store),nt=0;et.length>nt;)m(et[nt++]);s(s.S+s.F*!z,"Symbol",{"for":function(t){return r(D,t+="")?D[t]:D[t]=M(t)},keyFor:function(t){if(q(t))return g(D,t);throw TypeError(t+" is not a symbol!")},useSetter:function(){H=!0},useSimple:function(){H=!1}}),s(s.S+s.F*!z,"Object",{create:Y,defineProperty:U,defineProperties:G,getOwnPropertyDescriptor:X,getOwnPropertyNames:Z,getOwnPropertySymbols:tt}),T&&s(s.S+s.F*(!z||u(function(){var t=M();return"[null]"!=A([t])||"{}"!=A({a:t})||"{}"!=A(Object(t))})),"JSON",{stringify:function(t){if(void 0!==t&&!q(t)){for(var e,n,i=[t],r=1;arguments.length>r;)i.push(arguments[r++]);return e=i[1],"function"==typeof e&&(n=e),!n&&b(e)||(e=function(t,e){return n&&(e=n.call(this,t,e)),q(e)?void 0:e}),i[1]=e,A.apply(T,i)}}}),M[B][V]||n(5)(M[B],V,M[B].valueOf),f(M,"Symbol"),f(Math,"Math",!0),f(i.JSON,"JSON",!0)},function(t,e,n){n(26)("asyncIterator")},function(t,e,n){n(26)("observable")},function(t,e,n){n(70);for(var i=n(1),r=n(5),o=n(18),s=n(7)("toStringTag"),l=["NodeList","DOMTokenList","MediaList","StyleSheetList","CSSRuleList"],a=0;5>a;a++){var u=l[a],c=i[u],f=c&&c.prototype;f&&!f[s]&&r(f,s,u),o[u]=o.Array}},function(t,e,n){e=t.exports=n(79)(),e.push([t.id,'fieldset[disabled] .multiselect{pointer-events:none}.multiselect__spinner{position:absolute;right:1px;top:1px;width:48px;height:35px;background:#fff;display:block}.multiselect__spinner:after,.multiselect__spinner:before{position:absolute;content:"";top:50%;left:50%;margin:-8px 0 0 -8px;width:16px;height:16px;border-radius:100%;border-color:#41b883 transparent transparent;border-style:solid;border-width:2px;box-shadow:0 0 0 1px transparent}.multiselect__spinner:before{animation:spinning 2.4s cubic-bezier(.41,.26,.2,.62);animation-iteration-count:infinite}.multiselect__spinner:after{animation:spinning 2.4s cubic-bezier(.51,.09,.21,.8);animation-iteration-count:infinite},.multiselect__loading-enter-active,.multiselect__loading-leave-active{transition:opacity .4s ease-in-out;opacity:1}.multiselect__loading-enter,.multiselect__loading-leave-active{opacity:0}.multiselect,.multiselect__input,.multiselect__single{font-family:inherit;font-size:14px}.multiselect{box-sizing:content-box;display:block;position:relative;width:100%;min-height:40px;text-align:left;color:#35495e}.multiselect *{box-sizing:border-box}.multiselect:focus{outline:none}.multiselect--disabled{pointer-events:none;opacity:.6}.multiselect--active{z-index:50}.multiselect--active .multiselect__current,.multiselect--active .multiselect__input,.multiselect--active .multiselect__tags{border-bottom-left-radius:0;border-bottom-right-radius:0}.multiselect--active .multiselect__select{transform:rotate(180deg)}.multiselect__input,.multiselect__single{position:relative;display:inline-block;min-height:20px;line-height:20px;border:none;border-radius:5px;background:#fff;padding:1px 0 0 5px;width:100%;transition:border .1s ease;box-sizing:border-box;margin-bottom:8px}.multiselect__tag~.multiselect__input{width:auto}.multiselect__input:hover,.multiselect__single:hover{border-color:#cfcfcf}.multiselect__input:focus,.multiselect__single:focus{border-color:#a8a8a8;outline:none}.multiselect__single{padding-left:6px;margin-bottom:8px}.multiselect__tags{min-height:40px;display:block;padding:8px 40px 0 8px;border-radius:5px;border:1px solid #e8e8e8;background:#fff}.multiselect__tag{position:relative;display:inline-block;padding:4px 26px 4px 10px;border-radius:5px;margin-right:10px;color:#fff;line-height:1;background:#41b883;margin-bottom:8px;white-space:nowrap}.multiselect__tag-icon{cursor:pointer;margin-left:7px;position:absolute;right:0;top:0;bottom:0;font-weight:700;font-style:initial;width:22px;text-align:center;line-height:22px;transition:all .2s ease;border-radius:5px}.multiselect__tag-icon:after{content:"\\D7";color:#266d4d;font-size:14px}.multiselect__tag-icon:focus,.multiselect__tag-icon:hover{background:#369a6e}.multiselect__tag-icon:focus:after,.multiselect__tag-icon:hover:after{color:#fff}.multiselect__current{min-height:40px;overflow:hidden;padding:8px 12px 0;padding-right:30px;white-space:nowrap;border-radius:5px;border:1px solid #e8e8e8}.multiselect__current,.multiselect__select{line-height:16px;box-sizing:border-box;display:block;margin:0;text-decoration:none;cursor:pointer}.multiselect__select{position:absolute;width:40px;height:38px;right:1px;top:1px;padding:4px 8px;text-align:center;transition:transform .2s ease}.multiselect__select:before{position:relative;right:0;top:65%;color:#999;margin-top:4px;border-style:solid;border-width:5px 5px 0;border-color:#999 transparent transparent;content:""}.multiselect__placeholder{color:#adadad;display:inline-block;margin-bottom:10px;padding-top:2px}.multiselect--active .multiselect__placeholder{display:none}.multiselect__content{position:absolute;list-style:none;display:block;background:#fff;width:100%;max-height:240px;overflow:auto;padding:0;margin:0;border:1px solid #e8e8e8;border-top:none;border-bottom-left-radius:5px;border-bottom-right-radius:5px;z-index:50}.multiselect__content::webkit-scrollbar{display:none}.multiselect__option{display:block;padding:12px;min-height:40px;line-height:16px;text-decoration:none;text-transform:none;vertical-align:middle;position:relative;cursor:pointer;white-space:nowrap}.multiselect__option:after{top:0;right:0;position:absolute;line-height:40px;padding-right:12px;padding-left:20px}.multiselect__option--highlight{background:#41b883;outline:none;color:#fff}.multiselect__option--highlight:after{content:attr(data-select);background:#41b883;color:#fff}.multiselect__option--selected{background:#f3f3f3;color:#35495e;font-weight:700}.multiselect__option--selected:after{content:attr(data-selected);color:silver}.multiselect__option--selected.multiselect__option--highlight{background:#ff6a6a;color:#fff}.multiselect__option--selected.multiselect__option--highlight:after{background:#ff6a6a;content:attr(data-deselect);color:#fff}.multiselect--disabled{background:#ededed;pointer-events:none}.multiselect--disabled .multiselect__current,.multiselect--disabled .multiselect__select,.multiselect__option--disabled{background:#ededed;color:#a6a6a6}.multiselect__option--disabled{cursor:text;pointer-events:none}.multiselect__option--disabled:visited{color:#a6a6a6}.multiselect__option--disabled:focus,.multiselect__option--disabled:hover{background:#3dad7b}.multiselect-enter-active,.multiselect-leave-active{transition:all .3s ease}.multiselect-enter,.multiselect-leave-active{opacity:0;max-height:0!important}@keyframes spinning{0%{transform:rotate(0)}to{transform:rotate(2turn)}}',""])},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var n=this[e];n[2]?t.push("@media "+n[2]+"{"+n[1]+"}"):t.push(n[1])}return t.join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var i={},r=0;r<this.length;r++){var o=this[r][0];"number"==typeof o&&(i[o]=!0)}for(r=0;r<e.length;r++){var s=e[r];"number"==typeof s[0]&&i[s[0]]||(n&&!s[2]?s[2]=n:n&&(s[2]="("+s[2]+") and ("+n+")"),t.push(s))}},t}},function(t,e,n){var i,r;n(83),i=n(43);var o=n(81);r=i=i||{},"object"!=typeof i["default"]&&"function"!=typeof i["default"]||(r=i=i["default"]),"function"==typeof r&&(r=r.options),r.render=o.render,r.staticRenderFns=o.staticRenderFns,t.exports=i},function(module,exports){module.exports={render:function(){with(this)return _h("div",{staticClass:"multiselect","class":{"multiselect--active":isOpen,"multiselect--disabled":disabled},attrs:{tabindex:"0"},on:{focus:function(t){activate()},blur:function(t){searchable?!1:deactivate()},keydown:[function(t){40===t.keyCode&&t.target===t.currentTarget&&(t.preventDefault(),pointerForward())},function(t){38===t.keyCode&&t.target===t.currentTarget&&(t.preventDefault(),pointerBackward())},function(t){13===t.keyCode&&(t.stopPropagation(),t.preventDefault(),t.target===t.currentTarget&&addPointerElement())},function(t){9===t.keyCode&&(t.stopPropagation(),t.preventDefault(),t.target===t.currentTarget&&addPointerElement())}],keyup:function(t){27===t.keyCode&&deactivate()}}},[_h("div",{staticClass:"multiselect__select",on:{mousedown:function(t){t.preventDefault(),toggle()}}})," ",_h("div",{ref:"tags",staticClass:"multiselect__tags"},[_l(visibleValue,function(t){return _h("span",{staticClass:"multiselect__tag",attrs:{onmousedown:"event.preventDefault()"}},[_h("span",{domProps:{textContent:_s(getOptionLabel(t))}})," ",_h("i",{staticClass:"multiselect__tag-icon",attrs:{"aria-hidden":"true",tabindex:"1"},on:{keydown:function(e){13===e.keyCode&&(e.preventDefault(),removeElement(t))},mousedown:function(e){e.preventDefault(),removeElement(t)}}})])})," ",internalValue&&internalValue.length>limit?[_h("strong",{domProps:{textContent:_s(limitText(internalValue.length-limit))}})]:_e()," ",_h("transition",{attrs:{name:"multiselect__loading"}},[_h("div",{directives:[{name:"show",value:loading,expression:"loading"}],staticClass:"multiselect__spinner"})])," ",searchable?_h("input",{ref:"search",staticClass:"multiselect__input",attrs:{name:"search",type:"text",autocomplete:"off",placeholder:placeholder,disabled:disabled},domProps:{value:search},on:{input:function(t){updateSearch(t.target.value)},focus:function(t){t.preventDefault(),activate()},blur:function(t){t.preventDefault(),deactivate()},keyup:[function(t){27===t.keyCode&&deactivate()},function(t){40===t.keyCode&&pointerForward()},function(t){38===t.keyCode&&pointerBackward()}],keydown:[function(t){13===t.keyCode&&(t.stopPropagation(),t.preventDefault(),t.target===t.currentTarget&&addPointerElement())},function(t){9===t.keyCode&&(t.stopPropagation(),t.preventDefault(),t.target===t.currentTarget&&addPointerElement())},function(t){8!==t.keyCode&&46!==t.keyCode||removeLastElement()}]}}):_e()," ",searchable||multiple?_e():_h("span",{staticClass:"multiselect__single",domProps:{textContent:_s(currentOptionLabel||placeholder)}})])," ",_h("transition",{attrs:{name:"multiselect"}},[_h("ul",{directives:[{name:"show",value:isOpen,expression:"isOpen"}],ref:"list",staticClass:"multiselect__content",style:{maxHeight:maxHeight+"px"}},[_t("beforeList")," ",multiple&&max===internalValue.length?_h("li",[_h("span",{staticClass:"multiselect__option"},[_t("maxElements",["Maximum of "+_s(max)+" options selected. First remove a selected option to select another."])])]):_e()," ",!max||internalValue.length<max?[_l(filteredOptions,function(t,e){
	return _h("li",{key:e},[_h("span",{staticClass:"multiselect__option","class":optionHighlight(e,t),attrs:{tabindex:"0","data-select":t.isTag?tagPlaceholder:selectLabelText,"data-selected":selectedLabelText,"data-deselect":deselectLabelText},on:{mousedown:function(e){e.preventDefault(),select(t)},mouseenter:function(t){pointerSet(e)}}},[_h("multiselect-option",{attrs:{"option-function":optionFunction,label:getOptionLabel(t),option:t}})])])})]:_e()," ",_h("li",{directives:[{name:"show",value:0===filteredOptions.length&&search,expression:"filteredOptions.length === 0 && search"}]},[_h("span",{staticClass:"multiselect__option"},[_t("noResult",["No elements found. Consider changing the search query."])])])," ",_t("afterList")])])])},staticRenderFns:[]}},function(t,e,n){function i(t,e){for(var n=0;n<t.length;n++){var i=t[n],r=f[i.id];if(r){r.refs++;for(var o=0;o<r.parts.length;o++)r.parts[o](i.parts[o]);for(;o<i.parts.length;o++)r.parts.push(a(i.parts[o],e))}else{for(var s=[],o=0;o<i.parts.length;o++)s.push(a(i.parts[o],e));f[i.id]={id:i.id,refs:1,parts:s}}}}function r(t){for(var e=[],n={},i=0;i<t.length;i++){var r=t[i],o=r[0],s=r[1],l=r[2],a=r[3],u={css:s,media:l,sourceMap:a};n[o]?n[o].parts.push(u):e.push(n[o]={id:o,parts:[u]})}return e}function o(t,e){var n=h(),i=v[v.length-1];if("top"===t.insertAt)i?i.nextSibling?n.insertBefore(e,i.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),v.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function s(t){t.parentNode.removeChild(t);var e=v.indexOf(t);e>=0&&v.splice(e,1)}function l(t){var e=document.createElement("style");return e.type="text/css",o(t,e),e}function a(t,e){var n,i,r;if(e.singleton){var o=g++;n=m||(m=l(e)),i=u.bind(null,n,o,!1),r=u.bind(null,n,o,!0)}else n=l(e),i=c.bind(null,n),r=function(){s(n)};return i(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;i(t=e)}else r()}}function u(t,e,n,i){var r=n?"":i.css;if(t.styleSheet)t.styleSheet.cssText=b(e,r);else{var o=document.createTextNode(r),s=t.childNodes;s[e]&&t.removeChild(s[e]),s.length?t.insertBefore(o,s[e]):t.appendChild(o)}}function c(t,e){var n=e.css,i=e.media,r=e.sourceMap;if(i&&t.setAttribute("media",i),r&&(n+="\n/*# sourceURL="+r.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */"),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}var f={},p=function(t){var e;return function(){return"undefined"==typeof e&&(e=t.apply(this,arguments)),e}},d=p(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),h=p(function(){return document.head||document.getElementsByTagName("head")[0]}),m=null,g=0,v=[];t.exports=function(t,e){e=e||{},"undefined"==typeof e.singleton&&(e.singleton=d()),"undefined"==typeof e.insertAt&&(e.insertAt="bottom");var n=r(t);return i(n,e),function(t){for(var o=[],s=0;s<n.length;s++){var l=n[s],a=f[l.id];a.refs--,o.push(a)}if(t){var u=r(t);i(u,e)}for(var s=0;s<o.length;s++){var a=o[s];if(0===a.refs){for(var c=0;c<a.parts.length;c++)a.parts[c]();delete f[a.id]}}}};var b=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e,n){var i=n(78);"string"==typeof i&&(i=[[t.id,i,""]]);n(82)(i,{});i.locals&&(t.exports=i.locals)}])});

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module) {"use strict";var _create=__webpack_require__(9);var _create2=_interopRequireDefault(_create);var _typeof2=__webpack_require__(45);var _typeof3=_interopRequireDefault(_typeof2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/*
	 Leaflet 1.0.1+ffcfcc1, a JS library for interactive maps. http://leafletjs.com
	 (c) 2010-2016 Vladimir Agafonkin, (c) 2010-2011 CloudMade
	*/!function(t,e,i){function n(){var e=t.L;o.noConflict=function(){return t.L=e,this;},t.L=o;}var o={version:"1.0.1+ffcfcc1"};"object"==( false?"undefined":(0,_typeof3.default)(module))&&"object"==(0,_typeof3.default)(module.exports)?module.exports=o:"function"=="function"&&__webpack_require__(80)&&!(__WEBPACK_AMD_DEFINE_FACTORY__ = (o), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)),"undefined"!=typeof t&&n(),o.Util={extend:function extend(t){var e,i,n,o;for(i=1,n=arguments.length;i<n;i++){o=arguments[i];for(e in o){t[e]=o[e];}}return t;},create:_create2.default||function(){function t(){}return function(e){return t.prototype=e,new t();};}(),bind:function bind(t,e){var i=Array.prototype.slice;if(t.bind)return t.bind.apply(t,i.call(arguments,1));var n=i.call(arguments,2);return function(){return t.apply(e,n.length?n.concat(i.call(arguments)):arguments);};},stamp:function stamp(t){return t._leaflet_id=t._leaflet_id||++o.Util.lastId,t._leaflet_id;},lastId:0,throttle:function throttle(t,e,i){var n,o,s,r;return r=function r(){n=!1,o&&(s.apply(i,o),o=!1);},s=function s(){n?o=arguments:(t.apply(i,arguments),setTimeout(r,e),n=!0);};},wrapNum:function wrapNum(t,e,i){var n=e[1],o=e[0],s=n-o;return t===n&&i?t:((t-o)%s+s)%s+o;},falseFn:function falseFn(){return!1;},formatNum:function formatNum(t,e){var i=Math.pow(10,e||5);return Math.round(t*i)/i;},trim:function trim(t){return t.trim?t.trim():t.replace(/^\s+|\s+$/g,"");},splitWords:function splitWords(t){return o.Util.trim(t).split(/\s+/);},setOptions:function setOptions(t,e){t.hasOwnProperty("options")||(t.options=t.options?o.Util.create(t.options):{});for(var i in e){t.options[i]=e[i];}return t.options;},getParamString:function getParamString(t,e,i){var n=[];for(var o in t){n.push(encodeURIComponent(i?o.toUpperCase():o)+"="+encodeURIComponent(t[o]));}return(e&&e.indexOf("?")!==-1?"&":"?")+n.join("&");},template:function template(t,e){return t.replace(o.Util.templateRe,function(t,n){var o=e[n];if(o===i)throw new Error("No value provided for variable "+t);return"function"==typeof o&&(o=o(e)),o;});},templateRe:/\{ *([\w_\-]+) *\}/g,isArray:Array.isArray||function(t){return"[object Array]"===Object.prototype.toString.call(t);},indexOf:function indexOf(t,e){for(var i=0;i<t.length;i++){if(t[i]===e)return i;}return-1;},emptyImageUrl:"data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="},function(){function e(e){return t["webkit"+e]||t["moz"+e]||t["ms"+e];}function i(e){var i=+new Date(),o=Math.max(0,16-(i-n));return n=i+o,t.setTimeout(e,o);}var n=0,s=t.requestAnimationFrame||e("RequestAnimationFrame")||i,r=t.cancelAnimationFrame||e("CancelAnimationFrame")||e("CancelRequestAnimationFrame")||function(e){t.clearTimeout(e);};o.Util.requestAnimFrame=function(e,n,r){return r&&s===i?void e.call(n):s.call(t,o.bind(e,n));},o.Util.cancelAnimFrame=function(e){e&&r.call(t,e);};}(),o.extend=o.Util.extend,o.bind=o.Util.bind,o.stamp=o.Util.stamp,o.setOptions=o.Util.setOptions,o.Class=function(){},o.Class.extend=function(t){var e=function e(){this.initialize&&this.initialize.apply(this,arguments),this.callInitHooks();},i=e.__super__=this.prototype,n=o.Util.create(i);n.constructor=e,e.prototype=n;for(var s in this){this.hasOwnProperty(s)&&"prototype"!==s&&(e[s]=this[s]);}return t.statics&&(o.extend(e,t.statics),delete t.statics),t.includes&&(o.Util.extend.apply(null,[n].concat(t.includes)),delete t.includes),n.options&&(t.options=o.Util.extend(o.Util.create(n.options),t.options)),o.extend(n,t),n._initHooks=[],n.callInitHooks=function(){if(!this._initHooksCalled){i.callInitHooks&&i.callInitHooks.call(this),this._initHooksCalled=!0;for(var t=0,e=n._initHooks.length;t<e;t++){n._initHooks[t].call(this);}}},e;},o.Class.include=function(t){return o.extend(this.prototype,t),this;},o.Class.mergeOptions=function(t){return o.extend(this.prototype.options,t),this;},o.Class.addInitHook=function(t){var e=Array.prototype.slice.call(arguments,1),i="function"==typeof t?t:function(){this[t].apply(this,e);};return this.prototype._initHooks=this.prototype._initHooks||[],this.prototype._initHooks.push(i),this;},o.Evented=o.Class.extend({on:function on(t,e,i){if("object"==(typeof t==="undefined"?"undefined":(0,_typeof3.default)(t)))for(var n in t){this._on(n,t[n],e);}else{t=o.Util.splitWords(t);for(var s=0,r=t.length;s<r;s++){this._on(t[s],e,i);}}return this;},off:function off(t,e,i){if(t){if("object"==(typeof t==="undefined"?"undefined":(0,_typeof3.default)(t)))for(var n in t){this._off(n,t[n],e);}else{t=o.Util.splitWords(t);for(var s=0,r=t.length;s<r;s++){this._off(t[s],e,i);}}}else delete this._events;return this;},_on:function _on(t,e,n){this._events=this._events||{};var o=this._events[t];o||(o=[],this._events[t]=o),n===this&&(n=i);for(var s={fn:e,ctx:n},r=o,a=0,h=r.length;a<h;a++){if(r[a].fn===e&&r[a].ctx===n)return;}r.push(s),o.count++;},_off:function _off(t,e,n){var s,r,a;if(this._events&&(s=this._events[t])){if(!e){for(r=0,a=s.length;r<a;r++){s[r].fn=o.Util.falseFn;}return void delete this._events[t];}if(n===this&&(n=i),s)for(r=0,a=s.length;r<a;r++){var h=s[r];if(h.ctx===n&&h.fn===e)return h.fn=o.Util.falseFn,this._firingCount&&(this._events[t]=s=s.slice()),void s.splice(r,1);}}},fire:function fire(t,e,i){if(!this.listens(t,i))return this;var n=o.Util.extend({},e,{type:t,target:this});if(this._events){var s=this._events[t];if(s){this._firingCount=this._firingCount+1||1;for(var r=0,a=s.length;r<a;r++){var h=s[r];h.fn.call(h.ctx||this,n);}this._firingCount--;}}return i&&this._propagateEvent(n),this;},listens:function listens(t,e){var i=this._events&&this._events[t];if(i&&i.length)return!0;if(e)for(var n in this._eventParents){if(this._eventParents[n].listens(t,e))return!0;}return!1;},once:function once(t,e,i){if("object"==(typeof t==="undefined"?"undefined":(0,_typeof3.default)(t))){for(var n in t){this.once(n,t[n],e);}return this;}var s=o.bind(function(){this.off(t,e,i).off(t,s,i);},this);return this.on(t,e,i).on(t,s,i);},addEventParent:function addEventParent(t){return this._eventParents=this._eventParents||{},this._eventParents[o.stamp(t)]=t,this;},removeEventParent:function removeEventParent(t){return this._eventParents&&delete this._eventParents[o.stamp(t)],this;},_propagateEvent:function _propagateEvent(t){for(var e in this._eventParents){this._eventParents[e].fire(t.type,o.extend({layer:t.target},t),!0);}}});var s=o.Evented.prototype;s.addEventListener=s.on,s.removeEventListener=s.clearAllEventListeners=s.off,s.addOneTimeEventListener=s.once,s.fireEvent=s.fire,s.hasEventListeners=s.listens,o.Mixin={Events:s},function(){var i=navigator.userAgent.toLowerCase(),n=e.documentElement,s="ActiveXObject"in t,r=i.indexOf("webkit")!==-1,a=i.indexOf("phantom")!==-1,h=i.search("android [23]")!==-1,l=i.indexOf("chrome")!==-1,u=i.indexOf("gecko")!==-1&&!r&&!t.opera&&!s,c=0===navigator.platform.indexOf("Win"),d="undefined"!=typeof orientation||i.indexOf("mobile")!==-1,_=!t.PointerEvent&&t.MSPointerEvent,m=t.PointerEvent||_,p=s&&"transition"in n.style,f="WebKitCSSMatrix"in t&&"m11"in new t.WebKitCSSMatrix()&&!h,g="MozPerspective"in n.style,v="OTransition"in n.style,y=!t.L_NO_TOUCH&&(m||"ontouchstart"in t||t.DocumentTouch&&e instanceof t.DocumentTouch);o.Browser={ie:s,ielt9:s&&!e.addEventListener,edge:"msLaunchUri"in navigator&&!("documentMode"in e),webkit:r,gecko:u,android:i.indexOf("android")!==-1,android23:h,chrome:l,safari:!l&&i.indexOf("safari")!==-1,win:c,ie3d:p,webkit3d:f,gecko3d:g,opera12:v,any3d:!t.L_DISABLE_3D&&(p||f||g)&&!v&&!a,mobile:d,mobileWebkit:d&&r,mobileWebkit3d:d&&f,mobileOpera:d&&t.opera,mobileGecko:d&&u,touch:!!y,msPointer:!!_,pointer:!!m,retina:(t.devicePixelRatio||t.screen.deviceXDPI/t.screen.logicalXDPI)>1};}(),o.Point=function(t,e,i){this.x=i?Math.round(t):t,this.y=i?Math.round(e):e;},o.Point.prototype={clone:function clone(){return new o.Point(this.x,this.y);},add:function add(t){return this.clone()._add(o.point(t));},_add:function _add(t){return this.x+=t.x,this.y+=t.y,this;},subtract:function subtract(t){return this.clone()._subtract(o.point(t));},_subtract:function _subtract(t){return this.x-=t.x,this.y-=t.y,this;},divideBy:function divideBy(t){return this.clone()._divideBy(t);},_divideBy:function _divideBy(t){return this.x/=t,this.y/=t,this;},multiplyBy:function multiplyBy(t){return this.clone()._multiplyBy(t);},_multiplyBy:function _multiplyBy(t){return this.x*=t,this.y*=t,this;},scaleBy:function scaleBy(t){return new o.Point(this.x*t.x,this.y*t.y);},unscaleBy:function unscaleBy(t){return new o.Point(this.x/t.x,this.y/t.y);},round:function round(){return this.clone()._round();},_round:function _round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this;},floor:function floor(){return this.clone()._floor();},_floor:function _floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this;},ceil:function ceil(){return this.clone()._ceil();},_ceil:function _ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this;},distanceTo:function distanceTo(t){t=o.point(t);var e=t.x-this.x,i=t.y-this.y;return Math.sqrt(e*e+i*i);},equals:function equals(t){return t=o.point(t),t.x===this.x&&t.y===this.y;},contains:function contains(t){return t=o.point(t),Math.abs(t.x)<=Math.abs(this.x)&&Math.abs(t.y)<=Math.abs(this.y);},toString:function toString(){return"Point("+o.Util.formatNum(this.x)+", "+o.Util.formatNum(this.y)+")";}},o.point=function(t,e,n){return t instanceof o.Point?t:o.Util.isArray(t)?new o.Point(t[0],t[1]):t===i||null===t?t:"object"==(typeof t==="undefined"?"undefined":(0,_typeof3.default)(t))&&"x"in t&&"y"in t?new o.Point(t.x,t.y):new o.Point(t,e,n);},o.Bounds=function(t,e){if(t)for(var i=e?[t,e]:t,n=0,o=i.length;n<o;n++){this.extend(i[n]);}},o.Bounds.prototype={extend:function extend(t){return t=o.point(t),this.min||this.max?(this.min.x=Math.min(t.x,this.min.x),this.max.x=Math.max(t.x,this.max.x),this.min.y=Math.min(t.y,this.min.y),this.max.y=Math.max(t.y,this.max.y)):(this.min=t.clone(),this.max=t.clone()),this;},getCenter:function getCenter(t){return new o.Point((this.min.x+this.max.x)/2,(this.min.y+this.max.y)/2,t);},getBottomLeft:function getBottomLeft(){return new o.Point(this.min.x,this.max.y);},getTopRight:function getTopRight(){return new o.Point(this.max.x,this.min.y);},getSize:function getSize(){return this.max.subtract(this.min);},contains:function contains(t){var e,i;return t="number"==typeof t[0]||t instanceof o.Point?o.point(t):o.bounds(t),t instanceof o.Bounds?(e=t.min,i=t.max):e=i=t,e.x>=this.min.x&&i.x<=this.max.x&&e.y>=this.min.y&&i.y<=this.max.y;},intersects:function intersects(t){t=o.bounds(t);var e=this.min,i=this.max,n=t.min,s=t.max,r=s.x>=e.x&&n.x<=i.x,a=s.y>=e.y&&n.y<=i.y;return r&&a;},overlaps:function overlaps(t){t=o.bounds(t);var e=this.min,i=this.max,n=t.min,s=t.max,r=s.x>e.x&&n.x<i.x,a=s.y>e.y&&n.y<i.y;return r&&a;},isValid:function isValid(){return!(!this.min||!this.max);}},o.bounds=function(t,e){return!t||t instanceof o.Bounds?t:new o.Bounds(t,e);},o.Transformation=function(t,e,i,n){this._a=t,this._b=e,this._c=i,this._d=n;},o.Transformation.prototype={transform:function transform(t,e){return this._transform(t.clone(),e);},_transform:function _transform(t,e){return e=e||1,t.x=e*(this._a*t.x+this._b),t.y=e*(this._c*t.y+this._d),t;},untransform:function untransform(t,e){return e=e||1,new o.Point((t.x/e-this._b)/this._a,(t.y/e-this._d)/this._c);}},o.DomUtil={get:function get(t){return"string"==typeof t?e.getElementById(t):t;},getStyle:function getStyle(t,i){var n=t.style[i]||t.currentStyle&&t.currentStyle[i];if((!n||"auto"===n)&&e.defaultView){var o=e.defaultView.getComputedStyle(t,null);n=o?o[i]:null;}return"auto"===n?null:n;},create:function create(t,i,n){var o=e.createElement(t);return o.className=i||"",n&&n.appendChild(o),o;},remove:function remove(t){var e=t.parentNode;e&&e.removeChild(t);},empty:function empty(t){for(;t.firstChild;){t.removeChild(t.firstChild);}},toFront:function toFront(t){t.parentNode.appendChild(t);},toBack:function toBack(t){var e=t.parentNode;e.insertBefore(t,e.firstChild);},hasClass:function hasClass(t,e){if(t.classList!==i)return t.classList.contains(e);var n=o.DomUtil.getClass(t);return n.length>0&&new RegExp("(^|\\s)"+e+"(\\s|$)").test(n);},addClass:function addClass(t,e){if(t.classList!==i)for(var n=o.Util.splitWords(e),s=0,r=n.length;s<r;s++){t.classList.add(n[s]);}else if(!o.DomUtil.hasClass(t,e)){var a=o.DomUtil.getClass(t);o.DomUtil.setClass(t,(a?a+" ":"")+e);}},removeClass:function removeClass(t,e){t.classList!==i?t.classList.remove(e):o.DomUtil.setClass(t,o.Util.trim((" "+o.DomUtil.getClass(t)+" ").replace(" "+e+" "," ")));},setClass:function setClass(t,e){t.className.baseVal===i?t.className=e:t.className.baseVal=e;},getClass:function getClass(t){return t.className.baseVal===i?t.className:t.className.baseVal;},setOpacity:function setOpacity(t,e){"opacity"in t.style?t.style.opacity=e:"filter"in t.style&&o.DomUtil._setOpacityIE(t,e);},_setOpacityIE:function _setOpacityIE(t,e){var i=!1,n="DXImageTransform.Microsoft.Alpha";try{i=t.filters.item(n);}catch(t){if(1===e)return;}e=Math.round(100*e),i?(i.Enabled=100!==e,i.Opacity=e):t.style.filter+=" progid:"+n+"(opacity="+e+")";},testProp:function testProp(t){for(var i=e.documentElement.style,n=0;n<t.length;n++){if(t[n]in i)return t[n];}return!1;},setTransform:function setTransform(t,e,i){var n=e||new o.Point(0,0);t.style[o.DomUtil.TRANSFORM]=(o.Browser.ie3d?"translate("+n.x+"px,"+n.y+"px)":"translate3d("+n.x+"px,"+n.y+"px,0)")+(i?" scale("+i+")":"");},setPosition:function setPosition(t,e){t._leaflet_pos=e,o.Browser.any3d?o.DomUtil.setTransform(t,e):(t.style.left=e.x+"px",t.style.top=e.y+"px");},getPosition:function getPosition(t){return t._leaflet_pos||new o.Point(0,0);}},function(){o.DomUtil.TRANSFORM=o.DomUtil.testProp(["transform","WebkitTransform","OTransform","MozTransform","msTransform"]);var i=o.DomUtil.TRANSITION=o.DomUtil.testProp(["webkitTransition","transition","OTransition","MozTransition","msTransition"]);if(o.DomUtil.TRANSITION_END="webkitTransition"===i||"OTransition"===i?i+"End":"transitionend","onselectstart"in e)o.DomUtil.disableTextSelection=function(){o.DomEvent.on(t,"selectstart",o.DomEvent.preventDefault);},o.DomUtil.enableTextSelection=function(){o.DomEvent.off(t,"selectstart",o.DomEvent.preventDefault);};else{var n=o.DomUtil.testProp(["userSelect","WebkitUserSelect","OUserSelect","MozUserSelect","msUserSelect"]);o.DomUtil.disableTextSelection=function(){if(n){var t=e.documentElement.style;this._userSelect=t[n],t[n]="none";}},o.DomUtil.enableTextSelection=function(){n&&(e.documentElement.style[n]=this._userSelect,delete this._userSelect);};}o.DomUtil.disableImageDrag=function(){o.DomEvent.on(t,"dragstart",o.DomEvent.preventDefault);},o.DomUtil.enableImageDrag=function(){o.DomEvent.off(t,"dragstart",o.DomEvent.preventDefault);},o.DomUtil.preventOutline=function(e){for(;e.tabIndex===-1;){e=e.parentNode;}e&&e.style&&(o.DomUtil.restoreOutline(),this._outlineElement=e,this._outlineStyle=e.style.outline,e.style.outline="none",o.DomEvent.on(t,"keydown",o.DomUtil.restoreOutline,this));},o.DomUtil.restoreOutline=function(){this._outlineElement&&(this._outlineElement.style.outline=this._outlineStyle,delete this._outlineElement,delete this._outlineStyle,o.DomEvent.off(t,"keydown",o.DomUtil.restoreOutline,this));};}(),o.LatLng=function(t,e,n){if(isNaN(t)||isNaN(e))throw new Error("Invalid LatLng object: ("+t+", "+e+")");this.lat=+t,this.lng=+e,n!==i&&(this.alt=+n);},o.LatLng.prototype={equals:function equals(t,e){if(!t)return!1;t=o.latLng(t);var n=Math.max(Math.abs(this.lat-t.lat),Math.abs(this.lng-t.lng));return n<=(e===i?1e-9:e);},toString:function toString(t){return"LatLng("+o.Util.formatNum(this.lat,t)+", "+o.Util.formatNum(this.lng,t)+")";},distanceTo:function distanceTo(t){return o.CRS.Earth.distance(this,o.latLng(t));},wrap:function wrap(){return o.CRS.Earth.wrapLatLng(this);},toBounds:function toBounds(t){var e=180*t/40075017,i=e/Math.cos(Math.PI/180*this.lat);return o.latLngBounds([this.lat-e,this.lng-i],[this.lat+e,this.lng+i]);},clone:function clone(){return new o.LatLng(this.lat,this.lng,this.alt);}},o.latLng=function(t,e,n){return t instanceof o.LatLng?t:o.Util.isArray(t)&&"object"!=(0,_typeof3.default)(t[0])?3===t.length?new o.LatLng(t[0],t[1],t[2]):2===t.length?new o.LatLng(t[0],t[1]):null:t===i||null===t?t:"object"==(typeof t==="undefined"?"undefined":(0,_typeof3.default)(t))&&"lat"in t?new o.LatLng(t.lat,"lng"in t?t.lng:t.lon,t.alt):e===i?null:new o.LatLng(t,e,n);},o.LatLngBounds=function(t,e){if(t)for(var i=e?[t,e]:t,n=0,o=i.length;n<o;n++){this.extend(i[n]);}},o.LatLngBounds.prototype={extend:function extend(t){var e,i,n=this._southWest,s=this._northEast;if(t instanceof o.LatLng)e=t,i=t;else{if(!(t instanceof o.LatLngBounds))return t?this.extend(o.latLng(t)||o.latLngBounds(t)):this;if(e=t._southWest,i=t._northEast,!e||!i)return this;}return n||s?(n.lat=Math.min(e.lat,n.lat),n.lng=Math.min(e.lng,n.lng),s.lat=Math.max(i.lat,s.lat),s.lng=Math.max(i.lng,s.lng)):(this._southWest=new o.LatLng(e.lat,e.lng),this._northEast=new o.LatLng(i.lat,i.lng)),this;},pad:function pad(t){var e=this._southWest,i=this._northEast,n=Math.abs(e.lat-i.lat)*t,s=Math.abs(e.lng-i.lng)*t;return new o.LatLngBounds(new o.LatLng(e.lat-n,e.lng-s),new o.LatLng(i.lat+n,i.lng+s));},getCenter:function getCenter(){return new o.LatLng((this._southWest.lat+this._northEast.lat)/2,(this._southWest.lng+this._northEast.lng)/2);},getSouthWest:function getSouthWest(){return this._southWest;},getNorthEast:function getNorthEast(){return this._northEast;},getNorthWest:function getNorthWest(){return new o.LatLng(this.getNorth(),this.getWest());},getSouthEast:function getSouthEast(){return new o.LatLng(this.getSouth(),this.getEast());},getWest:function getWest(){return this._southWest.lng;},getSouth:function getSouth(){return this._southWest.lat;},getEast:function getEast(){return this._northEast.lng;},getNorth:function getNorth(){return this._northEast.lat;},contains:function contains(t){t="number"==typeof t[0]||t instanceof o.LatLng?o.latLng(t):o.latLngBounds(t);var e,i,n=this._southWest,s=this._northEast;return t instanceof o.LatLngBounds?(e=t.getSouthWest(),i=t.getNorthEast()):e=i=t,e.lat>=n.lat&&i.lat<=s.lat&&e.lng>=n.lng&&i.lng<=s.lng;},intersects:function intersects(t){t=o.latLngBounds(t);var e=this._southWest,i=this._northEast,n=t.getSouthWest(),s=t.getNorthEast(),r=s.lat>=e.lat&&n.lat<=i.lat,a=s.lng>=e.lng&&n.lng<=i.lng;return r&&a;},overlaps:function overlaps(t){t=o.latLngBounds(t);var e=this._southWest,i=this._northEast,n=t.getSouthWest(),s=t.getNorthEast(),r=s.lat>e.lat&&n.lat<i.lat,a=s.lng>e.lng&&n.lng<i.lng;return r&&a;},toBBoxString:function toBBoxString(){return[this.getWest(),this.getSouth(),this.getEast(),this.getNorth()].join(",");},equals:function equals(t){return!!t&&(t=o.latLngBounds(t),this._southWest.equals(t.getSouthWest())&&this._northEast.equals(t.getNorthEast()));},isValid:function isValid(){return!(!this._southWest||!this._northEast);}},o.latLngBounds=function(t,e){return t instanceof o.LatLngBounds?t:new o.LatLngBounds(t,e);},o.Projection={},o.Projection.LonLat={project:function project(t){return new o.Point(t.lng,t.lat);},unproject:function unproject(t){return new o.LatLng(t.y,t.x);},bounds:o.bounds([-180,-90],[180,90])},o.Projection.SphericalMercator={R:6378137,MAX_LATITUDE:85.0511287798,project:function project(t){var e=Math.PI/180,i=this.MAX_LATITUDE,n=Math.max(Math.min(i,t.lat),-i),s=Math.sin(n*e);return new o.Point(this.R*t.lng*e,this.R*Math.log((1+s)/(1-s))/2);},unproject:function unproject(t){var e=180/Math.PI;return new o.LatLng((2*Math.atan(Math.exp(t.y/this.R))-Math.PI/2)*e,t.x*e/this.R);},bounds:function(){var t=6378137*Math.PI;return o.bounds([-t,-t],[t,t]);}()},o.CRS={latLngToPoint:function latLngToPoint(t,e){var i=this.projection.project(t),n=this.scale(e);return this.transformation._transform(i,n);},pointToLatLng:function pointToLatLng(t,e){var i=this.scale(e),n=this.transformation.untransform(t,i);return this.projection.unproject(n);},project:function project(t){return this.projection.project(t);},unproject:function unproject(t){return this.projection.unproject(t);},scale:function scale(t){return 256*Math.pow(2,t);},zoom:function zoom(t){return Math.log(t/256)/Math.LN2;},getProjectedBounds:function getProjectedBounds(t){if(this.infinite)return null;var e=this.projection.bounds,i=this.scale(t),n=this.transformation.transform(e.min,i),s=this.transformation.transform(e.max,i);return o.bounds(n,s);},infinite:!1,wrapLatLng:function wrapLatLng(t){var e=this.wrapLng?o.Util.wrapNum(t.lng,this.wrapLng,!0):t.lng,i=this.wrapLat?o.Util.wrapNum(t.lat,this.wrapLat,!0):t.lat,n=t.alt;return o.latLng(i,e,n);}},o.CRS.Simple=o.extend({},o.CRS,{projection:o.Projection.LonLat,transformation:new o.Transformation(1,0,-1,0),scale:function scale(t){return Math.pow(2,t);},zoom:function zoom(t){return Math.log(t)/Math.LN2;},distance:function distance(t,e){var i=e.lng-t.lng,n=e.lat-t.lat;return Math.sqrt(i*i+n*n);},infinite:!0}),o.CRS.Earth=o.extend({},o.CRS,{wrapLng:[-180,180],R:6371e3,distance:function distance(t,e){var i=Math.PI/180,n=t.lat*i,o=e.lat*i,s=Math.sin(n)*Math.sin(o)+Math.cos(n)*Math.cos(o)*Math.cos((e.lng-t.lng)*i);return this.R*Math.acos(Math.min(s,1));}}),o.CRS.EPSG3857=o.extend({},o.CRS.Earth,{code:"EPSG:3857",projection:o.Projection.SphericalMercator,transformation:function(){var t=.5/(Math.PI*o.Projection.SphericalMercator.R);return new o.Transformation(t,.5,-t,.5);}()}),o.CRS.EPSG900913=o.extend({},o.CRS.EPSG3857,{code:"EPSG:900913"}),o.CRS.EPSG4326=o.extend({},o.CRS.Earth,{code:"EPSG:4326",projection:o.Projection.LonLat,transformation:new o.Transformation(1/180,1,-1/180,.5)}),o.Map=o.Evented.extend({options:{crs:o.CRS.EPSG3857,center:i,zoom:i,minZoom:i,maxZoom:i,layers:[],maxBounds:i,renderer:i,fadeAnimation:!0,markerZoomAnimation:!0,transform3DLimit:8388608,zoomSnap:1,zoomDelta:1,trackResize:!0},initialize:function initialize(t,e){e=o.setOptions(this,e),this._initContainer(t),this._initLayout(),this._onResize=o.bind(this._onResize,this),this._initEvents(),e.maxBounds&&this.setMaxBounds(e.maxBounds),e.zoom!==i&&(this._zoom=this._limitZoom(e.zoom)),e.center&&e.zoom!==i&&this.setView(o.latLng(e.center),e.zoom,{reset:!0}),this._handlers=[],this._layers={},this._zoomBoundLayers={},this._sizeChanged=!0,this.callInitHooks(),this._addLayers(this.options.layers);},setView:function setView(t,e){return e=e===i?this.getZoom():e,this._resetView(o.latLng(t),e),this;},setZoom:function setZoom(t,e){return this._loaded?this.setView(this.getCenter(),t,{zoom:e}):(this._zoom=t,this);},zoomIn:function zoomIn(t,e){return t=t||(o.Browser.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom+t,e);},zoomOut:function zoomOut(t,e){return t=t||(o.Browser.any3d?this.options.zoomDelta:1),this.setZoom(this._zoom-t,e);},setZoomAround:function setZoomAround(t,e,i){var n=this.getZoomScale(e),s=this.getSize().divideBy(2),r=t instanceof o.Point?t:this.latLngToContainerPoint(t),a=r.subtract(s).multiplyBy(1-1/n),h=this.containerPointToLatLng(s.add(a));return this.setView(h,e,{zoom:i});},_getBoundsCenterZoom:function _getBoundsCenterZoom(t,e){e=e||{},t=t.getBounds?t.getBounds():o.latLngBounds(t);var i=o.point(e.paddingTopLeft||e.padding||[0,0]),n=o.point(e.paddingBottomRight||e.padding||[0,0]),s=this.getBoundsZoom(t,!1,i.add(n));s="number"==typeof e.maxZoom?Math.min(e.maxZoom,s):s;var r=n.subtract(i).divideBy(2),a=this.project(t.getSouthWest(),s),h=this.project(t.getNorthEast(),s),l=this.unproject(a.add(h).divideBy(2).add(r),s);return{center:l,zoom:s};},fitBounds:function fitBounds(t,e){if(t=o.latLngBounds(t),!t.isValid())throw new Error("Bounds are not valid.");var i=this._getBoundsCenterZoom(t,e);return this.setView(i.center,i.zoom,e);},fitWorld:function fitWorld(t){return this.fitBounds([[-90,-180],[90,180]],t);},panTo:function panTo(t,e){return this.setView(t,this._zoom,{pan:e});},panBy:function panBy(t){return this.fire("movestart"),this._rawPanBy(o.point(t)),this.fire("move"),this.fire("moveend");},setMaxBounds:function setMaxBounds(t){return t=o.latLngBounds(t),t.isValid()?(this.options.maxBounds&&this.off("moveend",this._panInsideMaxBounds),this.options.maxBounds=t,this._loaded&&this._panInsideMaxBounds(),this.on("moveend",this._panInsideMaxBounds)):(this.options.maxBounds=null,this.off("moveend",this._panInsideMaxBounds));},setMinZoom:function setMinZoom(t){return this.options.minZoom=t,this._loaded&&this.getZoom()<this.options.minZoom?this.setZoom(t):this;},setMaxZoom:function setMaxZoom(t){return this.options.maxZoom=t,this._loaded&&this.getZoom()>this.options.maxZoom?this.setZoom(t):this;},panInsideBounds:function panInsideBounds(t,e){this._enforcingBounds=!0;var i=this.getCenter(),n=this._limitCenter(i,this._zoom,o.latLngBounds(t));return i.equals(n)||this.panTo(n,e),this._enforcingBounds=!1,this;},invalidateSize:function invalidateSize(t){if(!this._loaded)return this;t=o.extend({animate:!1,pan:!0},t===!0?{animate:!0}:t);var e=this.getSize();this._sizeChanged=!0,this._lastCenter=null;var i=this.getSize(),n=e.divideBy(2).round(),s=i.divideBy(2).round(),r=n.subtract(s);return r.x||r.y?(t.animate&&t.pan?this.panBy(r):(t.pan&&this._rawPanBy(r),this.fire("move"),t.debounceMoveend?(clearTimeout(this._sizeTimer),this._sizeTimer=setTimeout(o.bind(this.fire,this,"moveend"),200)):this.fire("moveend")),this.fire("resize",{oldSize:e,newSize:i})):this;},stop:function stop(){return this.setZoom(this._limitZoom(this._zoom)),this.options.zoomSnap||this.fire("viewreset"),this._stop();},addHandler:function addHandler(t,e){if(!e)return this;var i=this[t]=new e(this);return this._handlers.push(i),this.options[t]&&i.enable(),this;},remove:function remove(){if(this._initEvents(!0),this._containerId!==this._container._leaflet_id)throw new Error("Map container is being reused by another instance");try{delete this._container._leaflet_id,delete this._containerId;}catch(t){this._container._leaflet_id=i,this._containerId=i;}o.DomUtil.remove(this._mapPane),this._clearControlPos&&this._clearControlPos(),this._clearHandlers(),this._loaded&&this.fire("unload");for(var t in this._layers){this._layers[t].remove();}return this;},createPane:function createPane(t,e){var i="leaflet-pane"+(t?" leaflet-"+t.replace("Pane","")+"-pane":""),n=o.DomUtil.create("div",i,e||this._mapPane);return t&&(this._panes[t]=n),n;},getCenter:function getCenter(){return this._checkIfLoaded(),this._lastCenter&&!this._moved()?this._lastCenter:this.layerPointToLatLng(this._getCenterLayerPoint());},getZoom:function getZoom(){return this._zoom;},getBounds:function getBounds(){var t=this.getPixelBounds(),e=this.unproject(t.getBottomLeft()),i=this.unproject(t.getTopRight());return new o.LatLngBounds(e,i);},getMinZoom:function getMinZoom(){return this.options.minZoom===i?this._layersMinZoom||0:this.options.minZoom;},getMaxZoom:function getMaxZoom(){return this.options.maxZoom===i?this._layersMaxZoom===i?1/0:this._layersMaxZoom:this.options.maxZoom;},getBoundsZoom:function getBoundsZoom(t,e,i){t=o.latLngBounds(t),i=o.point(i||[0,0]);var n=this.getZoom()||0,s=this.getMinZoom(),r=this.getMaxZoom(),a=t.getNorthWest(),h=t.getSouthEast(),l=this.getSize().subtract(i),u=this.project(h,n).subtract(this.project(a,n)),c=o.Browser.any3d?this.options.zoomSnap:1,d=Math.min(l.x/u.x,l.y/u.y);return n=this.getScaleZoom(d,n),c&&(n=Math.round(n/(c/100))*(c/100),n=e?Math.ceil(n/c)*c:Math.floor(n/c)*c),Math.max(s,Math.min(r,n));},getSize:function getSize(){return this._size&&!this._sizeChanged||(this._size=new o.Point(this._container.clientWidth,this._container.clientHeight),this._sizeChanged=!1),this._size.clone();},getPixelBounds:function getPixelBounds(t,e){var i=this._getTopLeftPoint(t,e);return new o.Bounds(i,i.add(this.getSize()));},getPixelOrigin:function getPixelOrigin(){return this._checkIfLoaded(),this._pixelOrigin;},getPixelWorldBounds:function getPixelWorldBounds(t){return this.options.crs.getProjectedBounds(t===i?this.getZoom():t);},getPane:function getPane(t){return"string"==typeof t?this._panes[t]:t;},getPanes:function getPanes(){return this._panes;},getContainer:function getContainer(){return this._container;},getZoomScale:function getZoomScale(t,e){var n=this.options.crs;return e=e===i?this._zoom:e,n.scale(t)/n.scale(e);},getScaleZoom:function getScaleZoom(t,e){var n=this.options.crs;e=e===i?this._zoom:e;var o=n.zoom(t*n.scale(e));return isNaN(o)?1/0:o;},project:function project(t,e){return e=e===i?this._zoom:e,this.options.crs.latLngToPoint(o.latLng(t),e);},unproject:function unproject(t,e){return e=e===i?this._zoom:e,this.options.crs.pointToLatLng(o.point(t),e);},layerPointToLatLng:function layerPointToLatLng(t){var e=o.point(t).add(this.getPixelOrigin());return this.unproject(e);},latLngToLayerPoint:function latLngToLayerPoint(t){var e=this.project(o.latLng(t))._round();return e._subtract(this.getPixelOrigin());},wrapLatLng:function wrapLatLng(t){return this.options.crs.wrapLatLng(o.latLng(t));},distance:function distance(t,e){return this.options.crs.distance(o.latLng(t),o.latLng(e));},containerPointToLayerPoint:function containerPointToLayerPoint(t){return o.point(t).subtract(this._getMapPanePos());},layerPointToContainerPoint:function layerPointToContainerPoint(t){return o.point(t).add(this._getMapPanePos());},containerPointToLatLng:function containerPointToLatLng(t){var e=this.containerPointToLayerPoint(o.point(t));return this.layerPointToLatLng(e);},latLngToContainerPoint:function latLngToContainerPoint(t){return this.layerPointToContainerPoint(this.latLngToLayerPoint(o.latLng(t)));},mouseEventToContainerPoint:function mouseEventToContainerPoint(t){return o.DomEvent.getMousePosition(t,this._container);},mouseEventToLayerPoint:function mouseEventToLayerPoint(t){return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t));},mouseEventToLatLng:function mouseEventToLatLng(t){return this.layerPointToLatLng(this.mouseEventToLayerPoint(t));},_initContainer:function _initContainer(t){var e=this._container=o.DomUtil.get(t);if(!e)throw new Error("Map container not found.");if(e._leaflet_id)throw new Error("Map container is already initialized.");o.DomEvent.addListener(e,"scroll",this._onScroll,this),this._containerId=o.Util.stamp(e);},_initLayout:function _initLayout(){var t=this._container;this._fadeAnimated=this.options.fadeAnimation&&o.Browser.any3d,o.DomUtil.addClass(t,"leaflet-container"+(o.Browser.touch?" leaflet-touch":"")+(o.Browser.retina?" leaflet-retina":"")+(o.Browser.ielt9?" leaflet-oldie":"")+(o.Browser.safari?" leaflet-safari":"")+(this._fadeAnimated?" leaflet-fade-anim":""));var e=o.DomUtil.getStyle(t,"position");"absolute"!==e&&"relative"!==e&&"fixed"!==e&&(t.style.position="relative"),this._initPanes(),this._initControlPos&&this._initControlPos();},_initPanes:function _initPanes(){var t=this._panes={};this._paneRenderers={},this._mapPane=this.createPane("mapPane",this._container),o.DomUtil.setPosition(this._mapPane,new o.Point(0,0)),this.createPane("tilePane"),this.createPane("shadowPane"),this.createPane("overlayPane"),this.createPane("markerPane"),this.createPane("tooltipPane"),this.createPane("popupPane"),this.options.markerZoomAnimation||(o.DomUtil.addClass(t.markerPane,"leaflet-zoom-hide"),o.DomUtil.addClass(t.shadowPane,"leaflet-zoom-hide"));},_resetView:function _resetView(t,e){o.DomUtil.setPosition(this._mapPane,new o.Point(0,0));var i=!this._loaded;this._loaded=!0,e=this._limitZoom(e),this.fire("viewprereset");var n=this._zoom!==e;this._moveStart(n)._move(t,e)._moveEnd(n),this.fire("viewreset"),i&&this.fire("load");},_moveStart:function _moveStart(t){return t&&this.fire("zoomstart"),this.fire("movestart");},_move:function _move(t,e,n){e===i&&(e=this._zoom);var o=this._zoom!==e;return this._zoom=e,this._lastCenter=t,this._pixelOrigin=this._getNewPixelOrigin(t),(o||n&&n.pinch)&&this.fire("zoom",n),this.fire("move",n);},_moveEnd:function _moveEnd(t){return t&&this.fire("zoomend"),this.fire("moveend");},_stop:function _stop(){return o.Util.cancelAnimFrame(this._flyToFrame),this._panAnim&&this._panAnim.stop(),this;},_rawPanBy:function _rawPanBy(t){o.DomUtil.setPosition(this._mapPane,this._getMapPanePos().subtract(t));},_getZoomSpan:function _getZoomSpan(){return this.getMaxZoom()-this.getMinZoom();},_panInsideMaxBounds:function _panInsideMaxBounds(){this._enforcingBounds||this.panInsideBounds(this.options.maxBounds);},_checkIfLoaded:function _checkIfLoaded(){if(!this._loaded)throw new Error("Set map center and zoom first.");},_initEvents:function _initEvents(e){if(o.DomEvent){this._targets={},this._targets[o.stamp(this._container)]=this;var i=e?"off":"on";o.DomEvent[i](this._container,"click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu keypress",this._handleDOMEvent,this),this.options.trackResize&&o.DomEvent[i](t,"resize",this._onResize,this),o.Browser.any3d&&this.options.transform3DLimit&&this[i]("moveend",this._onMoveEnd);}},_onResize:function _onResize(){o.Util.cancelAnimFrame(this._resizeRequest),this._resizeRequest=o.Util.requestAnimFrame(function(){this.invalidateSize({debounceMoveend:!0});},this);},_onScroll:function _onScroll(){this._container.scrollTop=0,this._container.scrollLeft=0;},_onMoveEnd:function _onMoveEnd(){var t=this._getMapPanePos();Math.max(Math.abs(t.x),Math.abs(t.y))>=this.options.transform3DLimit&&this._resetView(this.getCenter(),this.getZoom());},_findEventTargets:function _findEventTargets(t,e){for(var i,n=[],s="mouseout"===e||"mouseover"===e,r=t.target||t.srcElement,a=!1;r;){if(i=this._targets[o.stamp(r)],i&&("click"===e||"preclick"===e)&&!t._simulated&&this._draggableMoved(i)){a=!0;break;}if(i&&i.listens(e,!0)){if(s&&!o.DomEvent._isExternalTarget(r,t))break;if(n.push(i),s)break;}if(r===this._container)break;r=r.parentNode;}return n.length||a||s||!o.DomEvent._isExternalTarget(r,t)||(n=[this]),n;},_handleDOMEvent:function _handleDOMEvent(t){if(this._loaded&&!o.DomEvent._skipped(t)){var e="keypress"===t.type&&13===t.keyCode?"click":t.type;"mousedown"===e&&o.DomUtil.preventOutline(t.target||t.srcElement),this._fireDOMEvent(t,e);}},_fireDOMEvent:function _fireDOMEvent(t,e,i){if("click"===t.type){var n=o.Util.extend({},t);n.type="preclick",this._fireDOMEvent(n,n.type,i);}if(!t._stopped&&(i=(i||[]).concat(this._findEventTargets(t,e)),i.length)){var s=i[0];"contextmenu"===e&&s.listens(e,!0)&&o.DomEvent.preventDefault(t);var r={originalEvent:t};if("keypress"!==t.type){var a=s instanceof o.Marker;r.containerPoint=a?this.latLngToContainerPoint(s.getLatLng()):this.mouseEventToContainerPoint(t),r.layerPoint=this.containerPointToLayerPoint(r.containerPoint),r.latlng=a?s.getLatLng():this.layerPointToLatLng(r.layerPoint);}for(var h=0;h<i.length;h++){if(i[h].fire(e,r,!0),r.originalEvent._stopped||i[h].options.nonBubblingEvents&&o.Util.indexOf(i[h].options.nonBubblingEvents,e)!==-1)return;}}},_draggableMoved:function _draggableMoved(t){return t=t.dragging&&t.dragging.enabled()?t:this,t.dragging&&t.dragging.moved()||this.boxZoom&&this.boxZoom.moved();},_clearHandlers:function _clearHandlers(){for(var t=0,e=this._handlers.length;t<e;t++){this._handlers[t].disable();}},whenReady:function whenReady(t,e){return this._loaded?t.call(e||this,{target:this}):this.on("load",t,e),this;},_getMapPanePos:function _getMapPanePos(){return o.DomUtil.getPosition(this._mapPane)||new o.Point(0,0);},_moved:function _moved(){var t=this._getMapPanePos();return t&&!t.equals([0,0]);},_getTopLeftPoint:function _getTopLeftPoint(t,e){var n=t&&e!==i?this._getNewPixelOrigin(t,e):this.getPixelOrigin();return n.subtract(this._getMapPanePos());},_getNewPixelOrigin:function _getNewPixelOrigin(t,e){var i=this.getSize()._divideBy(2);return this.project(t,e)._subtract(i)._add(this._getMapPanePos())._round();},_latLngToNewLayerPoint:function _latLngToNewLayerPoint(t,e,i){var n=this._getNewPixelOrigin(i,e);return this.project(t,e)._subtract(n);},_getCenterLayerPoint:function _getCenterLayerPoint(){return this.containerPointToLayerPoint(this.getSize()._divideBy(2));},_getCenterOffset:function _getCenterOffset(t){return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint());},_limitCenter:function _limitCenter(t,e,i){if(!i)return t;var n=this.project(t,e),s=this.getSize().divideBy(2),r=new o.Bounds(n.subtract(s),n.add(s)),a=this._getBoundsOffset(r,i,e);return a.round().equals([0,0])?t:this.unproject(n.add(a),e);},_limitOffset:function _limitOffset(t,e){if(!e)return t;var i=this.getPixelBounds(),n=new o.Bounds(i.min.add(t),i.max.add(t));return t.add(this._getBoundsOffset(n,e));},_getBoundsOffset:function _getBoundsOffset(t,e,i){var n=o.bounds(this.project(e.getNorthEast(),i),this.project(e.getSouthWest(),i)),s=n.min.subtract(t.min),r=n.max.subtract(t.max),a=this._rebound(s.x,-r.x),h=this._rebound(s.y,-r.y);return new o.Point(a,h);},_rebound:function _rebound(t,e){return t+e>0?Math.round(t-e)/2:Math.max(0,Math.ceil(t))-Math.max(0,Math.floor(e));},_limitZoom:function _limitZoom(t){var e=this.getMinZoom(),i=this.getMaxZoom(),n=o.Browser.any3d?this.options.zoomSnap:1;return n&&(t=Math.round(t/n)*n),Math.max(e,Math.min(i,t));}}),o.map=function(t,e){return new o.Map(t,e);},o.Layer=o.Evented.extend({options:{pane:"overlayPane",nonBubblingEvents:[]},addTo:function addTo(t){return t.addLayer(this),this;},remove:function remove(){return this.removeFrom(this._map||this._mapToAdd);},removeFrom:function removeFrom(t){return t&&t.removeLayer(this),this;},getPane:function getPane(t){return this._map.getPane(t?this.options[t]||t:this.options.pane);},addInteractiveTarget:function addInteractiveTarget(t){return this._map._targets[o.stamp(t)]=this,this;},removeInteractiveTarget:function removeInteractiveTarget(t){return delete this._map._targets[o.stamp(t)],this;},_layerAdd:function _layerAdd(t){var e=t.target;if(e.hasLayer(this)){if(this._map=e,this._zoomAnimated=e._zoomAnimated,this.getEvents){var i=this.getEvents();e.on(i,this),this.once("remove",function(){e.off(i,this);},this);}this.onAdd(e),this.getAttribution&&this._map.attributionControl&&this._map.attributionControl.addAttribution(this.getAttribution()),this.fire("add"),e.fire("layeradd",{layer:this});}}}),o.Map.include({addLayer:function addLayer(t){var e=o.stamp(t);return this._layers[e]?this:(this._layers[e]=t,t._mapToAdd=this,t.beforeAdd&&t.beforeAdd(this),this.whenReady(t._layerAdd,t),this);},removeLayer:function removeLayer(t){var e=o.stamp(t);return this._layers[e]?(this._loaded&&t.onRemove(this),t.getAttribution&&this.attributionControl&&this.attributionControl.removeAttribution(t.getAttribution()),delete this._layers[e],this._loaded&&(this.fire("layerremove",{layer:t}),t.fire("remove")),t._map=t._mapToAdd=null,this):this;},hasLayer:function hasLayer(t){return!!t&&o.stamp(t)in this._layers;},eachLayer:function eachLayer(t,e){for(var i in this._layers){t.call(e,this._layers[i]);}return this;},_addLayers:function _addLayers(t){t=t?o.Util.isArray(t)?t:[t]:[];for(var e=0,i=t.length;e<i;e++){this.addLayer(t[e]);}},_addZoomLimit:function _addZoomLimit(t){!isNaN(t.options.maxZoom)&&isNaN(t.options.minZoom)||(this._zoomBoundLayers[o.stamp(t)]=t,this._updateZoomLevels());},_removeZoomLimit:function _removeZoomLimit(t){var e=o.stamp(t);this._zoomBoundLayers[e]&&(delete this._zoomBoundLayers[e],this._updateZoomLevels());},_updateZoomLevels:function _updateZoomLevels(){var t=1/0,e=-(1/0),n=this._getZoomSpan();for(var o in this._zoomBoundLayers){var s=this._zoomBoundLayers[o].options;t=s.minZoom===i?t:Math.min(t,s.minZoom),e=s.maxZoom===i?e:Math.max(e,s.maxZoom);}this._layersMaxZoom=e===-(1/0)?i:e,this._layersMinZoom=t===1/0?i:t,n!==this._getZoomSpan()&&this.fire("zoomlevelschange");}}),o.Projection.Mercator={R:6378137,R_MINOR:6356752.314245179,bounds:o.bounds([-20037508.34279,-15496570.73972],[20037508.34279,18764656.23138]),project:function project(t){var e=Math.PI/180,i=this.R,n=t.lat*e,s=this.R_MINOR/i,r=Math.sqrt(1-s*s),a=r*Math.sin(n),h=Math.tan(Math.PI/4-n/2)/Math.pow((1-a)/(1+a),r/2);return n=-i*Math.log(Math.max(h,1e-10)),new o.Point(t.lng*e*i,n);},unproject:function unproject(t){for(var e,i=180/Math.PI,n=this.R,s=this.R_MINOR/n,r=Math.sqrt(1-s*s),a=Math.exp(-t.y/n),h=Math.PI/2-2*Math.atan(a),l=0,u=.1;l<15&&Math.abs(u)>1e-7;l++){e=r*Math.sin(h),e=Math.pow((1-e)/(1+e),r/2),u=Math.PI/2-2*Math.atan(a*e)-h,h+=u;}return new o.LatLng(h*i,t.x*i/n);}},o.CRS.EPSG3395=o.extend({},o.CRS.Earth,{code:"EPSG:3395",projection:o.Projection.Mercator,transformation:function(){var t=.5/(Math.PI*o.Projection.Mercator.R);return new o.Transformation(t,.5,-t,.5);}()}),o.GridLayer=o.Layer.extend({options:{tileSize:256,opacity:1,updateWhenIdle:o.Browser.mobile,updateWhenZooming:!0,updateInterval:200,attribution:null,zIndex:1,bounds:null,minZoom:0,maxZoom:i,noWrap:!1,pane:"tilePane",className:"",keepBuffer:2},initialize:function initialize(t){o.setOptions(this,t);},onAdd:function onAdd(){this._initContainer(),this._levels={},this._tiles={},this._resetView(),this._update();},beforeAdd:function beforeAdd(t){t._addZoomLimit(this);},onRemove:function onRemove(t){this._removeAllTiles(),o.DomUtil.remove(this._container),t._removeZoomLimit(this),this._container=null,this._tileZoom=null;},bringToFront:function bringToFront(){return this._map&&(o.DomUtil.toFront(this._container),this._setAutoZIndex(Math.max)),this;},bringToBack:function bringToBack(){return this._map&&(o.DomUtil.toBack(this._container),this._setAutoZIndex(Math.min)),this;},getAttribution:function getAttribution(){return this.options.attribution;},getContainer:function getContainer(){return this._container;},setOpacity:function setOpacity(t){return this.options.opacity=t,this._updateOpacity(),this;},setZIndex:function setZIndex(t){return this.options.zIndex=t,this._updateZIndex(),this;},isLoading:function isLoading(){return this._loading;},redraw:function redraw(){return this._map&&(this._removeAllTiles(),this._update()),this;},getEvents:function getEvents(){var t={viewprereset:this._invalidateAll,viewreset:this._resetView,zoom:this._resetView,moveend:this._onMoveEnd};return this.options.updateWhenIdle||(this._onMove||(this._onMove=o.Util.throttle(this._onMoveEnd,this.options.updateInterval,this)),t.move=this._onMove),this._zoomAnimated&&(t.zoomanim=this._animateZoom),t;},createTile:function createTile(){return e.createElement("div");},getTileSize:function getTileSize(){var t=this.options.tileSize;return t instanceof o.Point?t:new o.Point(t,t);},_updateZIndex:function _updateZIndex(){this._container&&this.options.zIndex!==i&&null!==this.options.zIndex&&(this._container.style.zIndex=this.options.zIndex);},_setAutoZIndex:function _setAutoZIndex(t){for(var e,i=this.getPane().children,n=-t(-(1/0),1/0),o=0,s=i.length;o<s;o++){e=i[o].style.zIndex,i[o]!==this._container&&e&&(n=t(n,+e));}isFinite(n)&&(this.options.zIndex=n+t(-1,1),this._updateZIndex());},_updateOpacity:function _updateOpacity(){if(this._map&&!o.Browser.ielt9){o.DomUtil.setOpacity(this._container,this.options.opacity);var t=+new Date(),e=!1,i=!1;for(var n in this._tiles){var s=this._tiles[n];if(s.current&&s.loaded){var r=Math.min(1,(t-s.loaded)/200);o.DomUtil.setOpacity(s.el,r),r<1?e=!0:(s.active&&(i=!0),s.active=!0);}}i&&!this._noPrune&&this._pruneTiles(),e&&(o.Util.cancelAnimFrame(this._fadeFrame),this._fadeFrame=o.Util.requestAnimFrame(this._updateOpacity,this));}},_initContainer:function _initContainer(){this._container||(this._container=o.DomUtil.create("div","leaflet-layer "+(this.options.className||"")),this._updateZIndex(),this.options.opacity<1&&this._updateOpacity(),this.getPane().appendChild(this._container));},_updateLevels:function _updateLevels(){var t=this._tileZoom,e=this.options.maxZoom;if(t===i)return i;for(var n in this._levels){this._levels[n].el.children.length||n===t?this._levels[n].el.style.zIndex=e-Math.abs(t-n):(o.DomUtil.remove(this._levels[n].el),this._removeTilesAtZoom(n),delete this._levels[n]);}var s=this._levels[t],r=this._map;return s||(s=this._levels[t]={},s.el=o.DomUtil.create("div","leaflet-tile-container leaflet-zoom-animated",this._container),s.el.style.zIndex=e,s.origin=r.project(r.unproject(r.getPixelOrigin()),t).round(),s.zoom=t,this._setZoomTransform(s,r.getCenter(),r.getZoom()),o.Util.falseFn(s.el.offsetWidth)),this._level=s,s;},_pruneTiles:function _pruneTiles(){if(this._map){var t,e,i=this._map.getZoom();if(i>this.options.maxZoom||i<this.options.minZoom)return void this._removeAllTiles();for(t in this._tiles){e=this._tiles[t],e.retain=e.current;}for(t in this._tiles){if(e=this._tiles[t],e.current&&!e.active){var n=e.coords;this._retainParent(n.x,n.y,n.z,n.z-5)||this._retainChildren(n.x,n.y,n.z,n.z+2);}}for(t in this._tiles){this._tiles[t].retain||this._removeTile(t);}}},_removeTilesAtZoom:function _removeTilesAtZoom(t){for(var e in this._tiles){this._tiles[e].coords.z===t&&this._removeTile(e);}},_removeAllTiles:function _removeAllTiles(){for(var t in this._tiles){this._removeTile(t);}},_invalidateAll:function _invalidateAll(){for(var t in this._levels){o.DomUtil.remove(this._levels[t].el),delete this._levels[t];}this._removeAllTiles(),this._tileZoom=null;},_retainParent:function _retainParent(t,e,i,n){var s=Math.floor(t/2),r=Math.floor(e/2),a=i-1,h=new o.Point(+s,+r);h.z=+a;var l=this._tileCoordsToKey(h),u=this._tiles[l];return u&&u.active?(u.retain=!0,!0):(u&&u.loaded&&(u.retain=!0),a>n&&this._retainParent(s,r,a,n));},_retainChildren:function _retainChildren(t,e,i,n){for(var s=2*t;s<2*t+2;s++){for(var r=2*e;r<2*e+2;r++){var a=new o.Point(s,r);a.z=i+1;var h=this._tileCoordsToKey(a),l=this._tiles[h];l&&l.active?l.retain=!0:(l&&l.loaded&&(l.retain=!0),i+1<n&&this._retainChildren(s,r,i+1,n));}}},_resetView:function _resetView(t){var e=t&&(t.pinch||t.flyTo);this._setView(this._map.getCenter(),this._map.getZoom(),e,e);},_animateZoom:function _animateZoom(t){this._setView(t.center,t.zoom,!0,t.noUpdate);},_setView:function _setView(t,e,n,o){var s=Math.round(e);(this.options.maxZoom!==i&&s>this.options.maxZoom||this.options.minZoom!==i&&s<this.options.minZoom)&&(s=i);var r=this.options.updateWhenZooming&&s!==this._tileZoom;o&&!r||(this._tileZoom=s,this._abortLoading&&this._abortLoading(),this._updateLevels(),this._resetGrid(),s!==i&&this._update(t),n||this._pruneTiles(),this._noPrune=!!n),this._setZoomTransforms(t,e);},_setZoomTransforms:function _setZoomTransforms(t,e){for(var i in this._levels){this._setZoomTransform(this._levels[i],t,e);}},_setZoomTransform:function _setZoomTransform(t,e,i){var n=this._map.getZoomScale(i,t.zoom),s=t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(e,i)).round();o.Browser.any3d?o.DomUtil.setTransform(t.el,s,n):o.DomUtil.setPosition(t.el,s);},_resetGrid:function _resetGrid(){var t=this._map,e=t.options.crs,i=this._tileSize=this.getTileSize(),n=this._tileZoom,o=this._map.getPixelWorldBounds(this._tileZoom);o&&(this._globalTileRange=this._pxBoundsToTileRange(o)),this._wrapX=e.wrapLng&&!this.options.noWrap&&[Math.floor(t.project([0,e.wrapLng[0]],n).x/i.x),Math.ceil(t.project([0,e.wrapLng[1]],n).x/i.y)],this._wrapY=e.wrapLat&&!this.options.noWrap&&[Math.floor(t.project([e.wrapLat[0],0],n).y/i.x),Math.ceil(t.project([e.wrapLat[1],0],n).y/i.y)];},_onMoveEnd:function _onMoveEnd(){this._map&&!this._map._animatingZoom&&this._update();},_getTiledPixelBounds:function _getTiledPixelBounds(t){var e=this._map,i=e._animatingZoom?Math.max(e._animateToZoom,e.getZoom()):e.getZoom(),n=e.getZoomScale(i,this._tileZoom),s=e.project(t,this._tileZoom).floor(),r=e.getSize().divideBy(2*n);return new o.Bounds(s.subtract(r),s.add(r));},_update:function _update(t){var n=this._map;if(n){var s=n.getZoom();if(t===i&&(t=n.getCenter()),this._tileZoom!==i){var r=this._getTiledPixelBounds(t),a=this._pxBoundsToTileRange(r),h=a.getCenter(),l=[],u=this.options.keepBuffer,c=new o.Bounds(a.getBottomLeft().subtract([u,-u]),a.getTopRight().add([u,-u]));for(var d in this._tiles){var _=this._tiles[d].coords;_.z===this._tileZoom&&c.contains(o.point(_.x,_.y))||(this._tiles[d].current=!1);}if(Math.abs(s-this._tileZoom)>1)return void this._setView(t,s);for(var m=a.min.y;m<=a.max.y;m++){for(var p=a.min.x;p<=a.max.x;p++){var f=new o.Point(p,m);if(f.z=this._tileZoom,this._isValidTile(f)){var g=this._tiles[this._tileCoordsToKey(f)];g?g.current=!0:l.push(f);}}}if(l.sort(function(t,e){return t.distanceTo(h)-e.distanceTo(h);}),0!==l.length){this._loading||(this._loading=!0,this.fire("loading"));var v=e.createDocumentFragment();for(p=0;p<l.length;p++){this._addTile(l[p],v);}this._level.el.appendChild(v);}}}},_isValidTile:function _isValidTile(t){var e=this._map.options.crs;if(!e.infinite){var i=this._globalTileRange;if(!e.wrapLng&&(t.x<i.min.x||t.x>i.max.x)||!e.wrapLat&&(t.y<i.min.y||t.y>i.max.y))return!1;}if(!this.options.bounds)return!0;var n=this._tileCoordsToBounds(t);return o.latLngBounds(this.options.bounds).overlaps(n);},_keyToBounds:function _keyToBounds(t){return this._tileCoordsToBounds(this._keyToTileCoords(t));},_tileCoordsToBounds:function _tileCoordsToBounds(t){var e=this._map,i=this.getTileSize(),n=t.scaleBy(i),s=n.add(i),r=e.unproject(n,t.z),a=e.unproject(s,t.z);return this.options.noWrap||(r=e.wrapLatLng(r),a=e.wrapLatLng(a)),new o.LatLngBounds(r,a);},_tileCoordsToKey:function _tileCoordsToKey(t){return t.x+":"+t.y+":"+t.z;},_keyToTileCoords:function _keyToTileCoords(t){var e=t.split(":"),i=new o.Point(+e[0],+e[1]);return i.z=+e[2],i;},_removeTile:function _removeTile(t){var e=this._tiles[t];e&&(o.DomUtil.remove(e.el),delete this._tiles[t],this.fire("tileunload",{tile:e.el,coords:this._keyToTileCoords(t)}));},_initTile:function _initTile(t){o.DomUtil.addClass(t,"leaflet-tile");var e=this.getTileSize();t.style.width=e.x+"px",t.style.height=e.y+"px",t.onselectstart=o.Util.falseFn,t.onmousemove=o.Util.falseFn,o.Browser.ielt9&&this.options.opacity<1&&o.DomUtil.setOpacity(t,this.options.opacity),o.Browser.android&&!o.Browser.android23&&(t.style.WebkitBackfaceVisibility="hidden");},_addTile:function _addTile(t,e){var i=this._getTilePos(t),n=this._tileCoordsToKey(t),s=this.createTile(this._wrapCoords(t),o.bind(this._tileReady,this,t));this._initTile(s),this.createTile.length<2&&o.Util.requestAnimFrame(o.bind(this._tileReady,this,t,null,s)),o.DomUtil.setPosition(s,i),this._tiles[n]={el:s,coords:t,current:!0},e.appendChild(s),this.fire("tileloadstart",{tile:s,coords:t});},_tileReady:function _tileReady(t,e,i){if(this._map){e&&this.fire("tileerror",{error:e,tile:i,coords:t});var n=this._tileCoordsToKey(t);i=this._tiles[n],i&&(i.loaded=+new Date(),this._map._fadeAnimated?(o.DomUtil.setOpacity(i.el,0),o.Util.cancelAnimFrame(this._fadeFrame),this._fadeFrame=o.Util.requestAnimFrame(this._updateOpacity,this)):(i.active=!0,this._pruneTiles()),e||(o.DomUtil.addClass(i.el,"leaflet-tile-loaded"),this.fire("tileload",{tile:i.el,coords:t})),this._noTilesToLoad()&&(this._loading=!1,this.fire("load"),o.Browser.ielt9||!this._map._fadeAnimated?o.Util.requestAnimFrame(this._pruneTiles,this):setTimeout(o.bind(this._pruneTiles,this),250)));}},_getTilePos:function _getTilePos(t){return t.scaleBy(this.getTileSize()).subtract(this._level.origin);},_wrapCoords:function _wrapCoords(t){var e=new o.Point(this._wrapX?o.Util.wrapNum(t.x,this._wrapX):t.x,this._wrapY?o.Util.wrapNum(t.y,this._wrapY):t.y);return e.z=t.z,e;},_pxBoundsToTileRange:function _pxBoundsToTileRange(t){var e=this.getTileSize();return new o.Bounds(t.min.unscaleBy(e).floor(),t.max.unscaleBy(e).ceil().subtract([1,1]));},_noTilesToLoad:function _noTilesToLoad(){for(var t in this._tiles){if(!this._tiles[t].loaded)return!1;}return!0;}}),o.gridLayer=function(t){return new o.GridLayer(t);},o.TileLayer=o.GridLayer.extend({options:{minZoom:0,maxZoom:18,maxNativeZoom:null,subdomains:"abc",errorTileUrl:"",zoomOffset:0,tms:!1,zoomReverse:!1,detectRetina:!1,crossOrigin:!1},initialize:function initialize(t,e){this._url=t,e=o.setOptions(this,e),e.detectRetina&&o.Browser.retina&&e.maxZoom>0&&(e.tileSize=Math.floor(e.tileSize/2),e.zoomReverse?(e.zoomOffset--,e.minZoom++):(e.zoomOffset++,e.maxZoom--),e.minZoom=Math.max(0,e.minZoom)),"string"==typeof e.subdomains&&(e.subdomains=e.subdomains.split("")),o.Browser.android||this.on("tileunload",this._onTileRemove);},setUrl:function setUrl(t,e){return this._url=t,e||this.redraw(),this;},createTile:function createTile(t,i){var n=e.createElement("img");return o.DomEvent.on(n,"load",o.bind(this._tileOnLoad,this,i,n)),o.DomEvent.on(n,"error",o.bind(this._tileOnError,this,i,n)),this.options.crossOrigin&&(n.crossOrigin=""),n.alt="",n.src=this.getTileUrl(t),n;},getTileUrl:function getTileUrl(t){var e={r:o.Browser.retina?"@2x":"",s:this._getSubdomain(t),x:t.x,y:t.y,z:this._getZoomForUrl()};if(this._map&&!this._map.options.crs.infinite){var i=this._globalTileRange.max.y-t.y;this.options.tms&&(e.y=i),e["-y"]=i;}return o.Util.template(this._url,o.extend(e,this.options));},_tileOnLoad:function _tileOnLoad(t,e){o.Browser.ielt9?setTimeout(o.bind(t,this,null,e),0):t(null,e);},_tileOnError:function _tileOnError(t,e,i){var n=this.options.errorTileUrl;n&&(e.src=n),t(i,e);},getTileSize:function getTileSize(){var t=this._map,e=o.GridLayer.prototype.getTileSize.call(this),i=this._tileZoom+this.options.zoomOffset,n=this.options.maxNativeZoom;return null!==n&&i>n?e.divideBy(t.getZoomScale(n,i)).round():e;},_onTileRemove:function _onTileRemove(t){t.tile.onload=null;},_getZoomForUrl:function _getZoomForUrl(){var t=this.options,e=this._tileZoom;return t.zoomReverse&&(e=t.maxZoom-e),e+=t.zoomOffset,null!==t.maxNativeZoom?Math.min(e,t.maxNativeZoom):e;},_getSubdomain:function _getSubdomain(t){var e=Math.abs(t.x+t.y)%this.options.subdomains.length;return this.options.subdomains[e];},_abortLoading:function _abortLoading(){var t,e;for(t in this._tiles){this._tiles[t].coords.z!==this._tileZoom&&(e=this._tiles[t].el,e.onload=o.Util.falseFn,e.onerror=o.Util.falseFn,e.complete||(e.src=o.Util.emptyImageUrl,o.DomUtil.remove(e)));}}}),o.tileLayer=function(t,e){return new o.TileLayer(t,e);},o.TileLayer.WMS=o.TileLayer.extend({defaultWmsParams:{service:"WMS",request:"GetMap",layers:"",styles:"",format:"image/jpeg",transparent:!1,version:"1.1.1"},options:{crs:null,uppercase:!1},initialize:function initialize(t,e){this._url=t;var i=o.extend({},this.defaultWmsParams);for(var n in e){n in this.options||(i[n]=e[n]);}e=o.setOptions(this,e),i.width=i.height=e.tileSize*(e.detectRetina&&o.Browser.retina?2:1),this.wmsParams=i;},onAdd:function onAdd(t){this._crs=this.options.crs||t.options.crs,this._wmsVersion=parseFloat(this.wmsParams.version);var e=this._wmsVersion>=1.3?"crs":"srs";this.wmsParams[e]=this._crs.code,o.TileLayer.prototype.onAdd.call(this,t);},getTileUrl:function getTileUrl(t){var e=this._tileCoordsToBounds(t),i=this._crs.project(e.getNorthWest()),n=this._crs.project(e.getSouthEast()),s=(this._wmsVersion>=1.3&&this._crs===o.CRS.EPSG4326?[n.y,i.x,i.y,n.x]:[i.x,n.y,n.x,i.y]).join(","),r=o.TileLayer.prototype.getTileUrl.call(this,t);return r+o.Util.getParamString(this.wmsParams,r,this.options.uppercase)+(this.options.uppercase?"&BBOX=":"&bbox=")+s;},setParams:function setParams(t,e){return o.extend(this.wmsParams,t),e||this.redraw(),this;}}),o.tileLayer.wms=function(t,e){return new o.TileLayer.WMS(t,e);},o.ImageOverlay=o.Layer.extend({options:{opacity:1,alt:"",interactive:!1,attribution:null,crossOrigin:!1},initialize:function initialize(t,e,i){this._url=t,this._bounds=o.latLngBounds(e),o.setOptions(this,i);},onAdd:function onAdd(){this._image||(this._initImage(),this.options.opacity<1&&this._updateOpacity()),this.options.interactive&&(o.DomUtil.addClass(this._image,"leaflet-interactive"),this.addInteractiveTarget(this._image)),this.getPane().appendChild(this._image),this._reset();},onRemove:function onRemove(){o.DomUtil.remove(this._image),this.options.interactive&&this.removeInteractiveTarget(this._image);},setOpacity:function setOpacity(t){return this.options.opacity=t,this._image&&this._updateOpacity(),this;},setStyle:function setStyle(t){return t.opacity&&this.setOpacity(t.opacity),this;},bringToFront:function bringToFront(){return this._map&&o.DomUtil.toFront(this._image),this;},bringToBack:function bringToBack(){return this._map&&o.DomUtil.toBack(this._image),this;},setUrl:function setUrl(t){return this._url=t,this._image&&(this._image.src=t),this;},setBounds:function setBounds(t){return this._bounds=t,this._map&&this._reset(),this;},getAttribution:function getAttribution(){return this.options.attribution;},getEvents:function getEvents(){var t={zoom:this._reset,viewreset:this._reset};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t;},getBounds:function getBounds(){return this._bounds;},getElement:function getElement(){return this._image;},_initImage:function _initImage(){var t=this._image=o.DomUtil.create("img","leaflet-image-layer "+(this._zoomAnimated?"leaflet-zoom-animated":""));t.onselectstart=o.Util.falseFn,t.onmousemove=o.Util.falseFn,t.onload=o.bind(this.fire,this,"load"),this.options.crossOrigin&&(t.crossOrigin=""),t.src=this._url,t.alt=this.options.alt;},_animateZoom:function _animateZoom(t){var e=this._map.getZoomScale(t.zoom),i=this._map._latLngToNewLayerPoint(this._bounds.getNorthWest(),t.zoom,t.center);o.DomUtil.setTransform(this._image,i,e);},_reset:function _reset(){var t=this._image,e=new o.Bounds(this._map.latLngToLayerPoint(this._bounds.getNorthWest()),this._map.latLngToLayerPoint(this._bounds.getSouthEast())),i=e.getSize();o.DomUtil.setPosition(t,e.min),t.style.width=i.x+"px",t.style.height=i.y+"px";},_updateOpacity:function _updateOpacity(){o.DomUtil.setOpacity(this._image,this.options.opacity);}}),o.imageOverlay=function(t,e,i){return new o.ImageOverlay(t,e,i);},o.Icon=o.Class.extend({initialize:function initialize(t){o.setOptions(this,t);},createIcon:function createIcon(t){return this._createIcon("icon",t);},createShadow:function createShadow(t){return this._createIcon("shadow",t);},_createIcon:function _createIcon(t,e){var i=this._getIconUrl(t);if(!i){if("icon"===t)throw new Error("iconUrl not set in Icon options (see the docs).");return null;}var n=this._createImg(i,e&&"IMG"===e.tagName?e:null);return this._setIconStyles(n,t),n;},_setIconStyles:function _setIconStyles(t,e){var i=this.options,n=i[e+"Size"];"number"==typeof n&&(n=[n,n]);var s=o.point(n),r=o.point("shadow"===e&&i.shadowAnchor||i.iconAnchor||s&&s.divideBy(2,!0));t.className="leaflet-marker-"+e+" "+(i.className||""),r&&(t.style.marginLeft=-r.x+"px",t.style.marginTop=-r.y+"px"),s&&(t.style.width=s.x+"px",t.style.height=s.y+"px");},_createImg:function _createImg(t,i){return i=i||e.createElement("img"),i.src=t,i;},_getIconUrl:function _getIconUrl(t){return o.Browser.retina&&this.options[t+"RetinaUrl"]||this.options[t+"Url"];}}),o.icon=function(t){return new o.Icon(t);},o.Icon.Default=o.Icon.extend({options:{iconUrl:"marker-icon.png",iconRetinaUrl:"marker-icon-2x.png",shadowUrl:"marker-shadow.png",iconSize:[25,41],iconAnchor:[12,41],popupAnchor:[1,-34],tooltipAnchor:[16,-28],shadowSize:[41,41]},_getIconUrl:function _getIconUrl(t){return o.Icon.Default.imagePath||(o.Icon.Default.imagePath=this._detectIconPath()),(this.options.imagePath||o.Icon.Default.imagePath)+o.Icon.prototype._getIconUrl.call(this,t);},_detectIconPath:function _detectIconPath(){var t=o.DomUtil.create("div","leaflet-default-icon-path",e.body),i=o.DomUtil.getStyle(t,"background-image")||o.DomUtil.getStyle(t,"backgroundImage");return e.body.removeChild(t),0===i.indexOf("url")?i.replace(/^url\([\"\']?/,"").replace(/marker-icon\.png[\"\']?\)$/,""):"";}}),o.Marker=o.Layer.extend({options:{icon:new o.Icon.Default(),interactive:!0,draggable:!1,keyboard:!0,title:"",alt:"",zIndexOffset:0,opacity:1,riseOnHover:!1,riseOffset:250,pane:"markerPane",nonBubblingEvents:["click","dblclick","mouseover","mouseout","contextmenu"]},initialize:function initialize(t,e){o.setOptions(this,e),this._latlng=o.latLng(t);},onAdd:function onAdd(t){this._zoomAnimated=this._zoomAnimated&&t.options.markerZoomAnimation,this._zoomAnimated&&t.on("zoomanim",this._animateZoom,this),this._initIcon(),this.update();},onRemove:function onRemove(t){this.dragging&&this.dragging.enabled()&&(this.options.draggable=!0,this.dragging.removeHooks()),this._zoomAnimated&&t.off("zoomanim",this._animateZoom,this),this._removeIcon(),this._removeShadow();},getEvents:function getEvents(){return{zoom:this.update,viewreset:this.update};},getLatLng:function getLatLng(){return this._latlng;},setLatLng:function setLatLng(t){var e=this._latlng;return this._latlng=o.latLng(t),this.update(),this.fire("move",{oldLatLng:e,latlng:this._latlng});},setZIndexOffset:function setZIndexOffset(t){return this.options.zIndexOffset=t,this.update();},setIcon:function setIcon(t){return this.options.icon=t,this._map&&(this._initIcon(),this.update()),this._popup&&this.bindPopup(this._popup,this._popup.options),this;},getElement:function getElement(){return this._icon;},update:function update(){if(this._icon){var t=this._map.latLngToLayerPoint(this._latlng).round();this._setPos(t);}return this;},_initIcon:function _initIcon(){var t=this.options,e="leaflet-zoom-"+(this._zoomAnimated?"animated":"hide"),i=t.icon.createIcon(this._icon),n=!1;i!==this._icon&&(this._icon&&this._removeIcon(),n=!0,t.title&&(i.title=t.title),t.alt&&(i.alt=t.alt)),o.DomUtil.addClass(i,e),t.keyboard&&(i.tabIndex="0"),this._icon=i,t.riseOnHover&&this.on({mouseover:this._bringToFront,mouseout:this._resetZIndex});var s=t.icon.createShadow(this._shadow),r=!1;s!==this._shadow&&(this._removeShadow(),r=!0),s&&o.DomUtil.addClass(s,e),this._shadow=s,t.opacity<1&&this._updateOpacity(),n&&this.getPane().appendChild(this._icon),this._initInteraction(),s&&r&&this.getPane("shadowPane").appendChild(this._shadow);},_removeIcon:function _removeIcon(){this.options.riseOnHover&&this.off({mouseover:this._bringToFront,mouseout:this._resetZIndex}),o.DomUtil.remove(this._icon),this.removeInteractiveTarget(this._icon),this._icon=null;},_removeShadow:function _removeShadow(){this._shadow&&o.DomUtil.remove(this._shadow),this._shadow=null;},_setPos:function _setPos(t){o.DomUtil.setPosition(this._icon,t),this._shadow&&o.DomUtil.setPosition(this._shadow,t),this._zIndex=t.y+this.options.zIndexOffset,this._resetZIndex();},_updateZIndex:function _updateZIndex(t){this._icon.style.zIndex=this._zIndex+t;},_animateZoom:function _animateZoom(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center).round();this._setPos(e);},_initInteraction:function _initInteraction(){if(this.options.interactive&&(o.DomUtil.addClass(this._icon,"leaflet-interactive"),this.addInteractiveTarget(this._icon),o.Handler.MarkerDrag)){var t=this.options.draggable;this.dragging&&(t=this.dragging.enabled(),this.dragging.disable()),this.dragging=new o.Handler.MarkerDrag(this),t&&this.dragging.enable();}},setOpacity:function setOpacity(t){return this.options.opacity=t,this._map&&this._updateOpacity(),this;},_updateOpacity:function _updateOpacity(){var t=this.options.opacity;o.DomUtil.setOpacity(this._icon,t),this._shadow&&o.DomUtil.setOpacity(this._shadow,t);},_bringToFront:function _bringToFront(){this._updateZIndex(this.options.riseOffset);},_resetZIndex:function _resetZIndex(){this._updateZIndex(0);}}),o.marker=function(t,e){return new o.Marker(t,e);},o.DivIcon=o.Icon.extend({options:{iconSize:[12,12],html:!1,bgPos:null,className:"leaflet-div-icon"},createIcon:function createIcon(t){var i=t&&"DIV"===t.tagName?t:e.createElement("div"),n=this.options;if(i.innerHTML=n.html!==!1?n.html:"",n.bgPos){var s=o.point(n.bgPos);i.style.backgroundPosition=-s.x+"px "+-s.y+"px";}return this._setIconStyles(i,"icon"),i;},createShadow:function createShadow(){return null;}}),o.divIcon=function(t){return new o.DivIcon(t);},o.DivOverlay=o.Layer.extend({options:{offset:[0,7],className:"",pane:"popupPane"},initialize:function initialize(t,e){o.setOptions(this,t),this._source=e;},onAdd:function onAdd(t){this._zoomAnimated=t._zoomAnimated,this._container||this._initLayout(),t._fadeAnimated&&o.DomUtil.setOpacity(this._container,0),clearTimeout(this._removeTimeout),this.getPane().appendChild(this._container),this.update(),t._fadeAnimated&&o.DomUtil.setOpacity(this._container,1),this.bringToFront();},onRemove:function onRemove(t){t._fadeAnimated?(o.DomUtil.setOpacity(this._container,0),this._removeTimeout=setTimeout(o.bind(o.DomUtil.remove,o.DomUtil,this._container),200)):o.DomUtil.remove(this._container);},getLatLng:function getLatLng(){return this._latlng;},setLatLng:function setLatLng(t){return this._latlng=o.latLng(t),this._map&&(this._updatePosition(),this._adjustPan()),this;},getContent:function getContent(){return this._content;},setContent:function setContent(t){return this._content=t,this.update(),this;},getElement:function getElement(){return this._container;},update:function update(){this._map&&(this._container.style.visibility="hidden",this._updateContent(),this._updateLayout(),this._updatePosition(),this._container.style.visibility="",this._adjustPan());},getEvents:function getEvents(){var t={zoom:this._updatePosition,viewreset:this._updatePosition};return this._zoomAnimated&&(t.zoomanim=this._animateZoom),t;},isOpen:function isOpen(){return!!this._map&&this._map.hasLayer(this);},bringToFront:function bringToFront(){return this._map&&o.DomUtil.toFront(this._container),this;},bringToBack:function bringToBack(){return this._map&&o.DomUtil.toBack(this._container),this;},_updateContent:function _updateContent(){if(this._content){var t=this._contentNode,e="function"==typeof this._content?this._content(this._source||this):this._content;if("string"==typeof e)t.innerHTML=e;else{for(;t.hasChildNodes();){t.removeChild(t.firstChild);}t.appendChild(e);}this.fire("contentupdate");}},_updatePosition:function _updatePosition(){if(this._map){var t=this._map.latLngToLayerPoint(this._latlng),e=o.point(this.options.offset),i=this._getAnchor();this._zoomAnimated?o.DomUtil.setPosition(this._container,t.add(i)):e=e.add(t).add(i);var n=this._containerBottom=-e.y,s=this._containerLeft=-Math.round(this._containerWidth/2)+e.x;this._container.style.bottom=n+"px",this._container.style.left=s+"px";}},_getAnchor:function _getAnchor(){return[0,0];}}),o.Popup=o.DivOverlay.extend({options:{maxWidth:300,minWidth:50,maxHeight:null,autoPan:!0,autoPanPaddingTopLeft:null,autoPanPaddingBottomRight:null,autoPanPadding:[5,5],keepInView:!1,closeButton:!0,autoClose:!0,className:""},openOn:function openOn(t){return t.openPopup(this),this;},onAdd:function onAdd(t){o.DivOverlay.prototype.onAdd.call(this,t),t.fire("popupopen",{popup:this}),this._source&&(this._source.fire("popupopen",{popup:this},!0),this._source instanceof o.Path||this._source.on("preclick",o.DomEvent.stopPropagation));},onRemove:function onRemove(t){o.DivOverlay.prototype.onRemove.call(this,t),t.fire("popupclose",{popup:this}),this._source&&(this._source.fire("popupclose",{popup:this},!0),this._source instanceof o.Path||this._source.off("preclick",o.DomEvent.stopPropagation));},getEvents:function getEvents(){var t=o.DivOverlay.prototype.getEvents.call(this);return("closeOnClick"in this.options?this.options.closeOnClick:this._map.options.closePopupOnClick)&&(t.preclick=this._close),this.options.keepInView&&(t.moveend=this._adjustPan),t;},_close:function _close(){this._map&&this._map.closePopup(this);},_initLayout:function _initLayout(){var t="leaflet-popup",e=this._container=o.DomUtil.create("div",t+" "+(this.options.className||"")+" leaflet-zoom-animated");if(this.options.closeButton){var i=this._closeButton=o.DomUtil.create("a",t+"-close-button",e);i.href="#close",i.innerHTML="&#215;",o.DomEvent.on(i,"click",this._onCloseButtonClick,this);}var n=this._wrapper=o.DomUtil.create("div",t+"-content-wrapper",e);this._contentNode=o.DomUtil.create("div",t+"-content",n),o.DomEvent.disableClickPropagation(n).disableScrollPropagation(this._contentNode).on(n,"contextmenu",o.DomEvent.stopPropagation),this._tipContainer=o.DomUtil.create("div",t+"-tip-container",e),this._tip=o.DomUtil.create("div",t+"-tip",this._tipContainer);},_updateLayout:function _updateLayout(){var t=this._contentNode,e=t.style;e.width="",e.whiteSpace="nowrap";var i=t.offsetWidth;i=Math.min(i,this.options.maxWidth),i=Math.max(i,this.options.minWidth),e.width=i+1+"px",e.whiteSpace="",e.height="";var n=t.offsetHeight,s=this.options.maxHeight,r="leaflet-popup-scrolled";s&&n>s?(e.height=s+"px",o.DomUtil.addClass(t,r)):o.DomUtil.removeClass(t,r),this._containerWidth=this._container.offsetWidth;},_animateZoom:function _animateZoom(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center),i=this._getAnchor();o.DomUtil.setPosition(this._container,e.add(i));},_adjustPan:function _adjustPan(){if(!(!this.options.autoPan||this._map._panAnim&&this._map._panAnim._inProgress)){var t=this._map,e=parseInt(o.DomUtil.getStyle(this._container,"marginBottom"),10)||0,i=this._container.offsetHeight+e,n=this._containerWidth,s=new o.Point(this._containerLeft,-i-this._containerBottom);s._add(o.DomUtil.getPosition(this._container));var r=t.layerPointToContainerPoint(s),a=o.point(this.options.autoPanPadding),h=o.point(this.options.autoPanPaddingTopLeft||a),l=o.point(this.options.autoPanPaddingBottomRight||a),u=t.getSize(),c=0,d=0;r.x+n+l.x>u.x&&(c=r.x+n-u.x+l.x),r.x-c-h.x<0&&(c=r.x-h.x),r.y+i+l.y>u.y&&(d=r.y+i-u.y+l.y),r.y-d-h.y<0&&(d=r.y-h.y),(c||d)&&t.fire("autopanstart").panBy([c,d]);}},_onCloseButtonClick:function _onCloseButtonClick(t){this._close(),o.DomEvent.stop(t);},_getAnchor:function _getAnchor(){return o.point(this._source&&this._source._getPopupAnchor?this._source._getPopupAnchor():[0,0]);}}),o.popup=function(t,e){return new o.Popup(t,e);},o.Map.mergeOptions({closePopupOnClick:!0}),o.Map.include({openPopup:function openPopup(t,e,i){return t instanceof o.Popup||(t=new o.Popup(i).setContent(t)),e&&t.setLatLng(e),this.hasLayer(t)?this:(this._popup&&this._popup.options.autoClose&&this.closePopup(),this._popup=t,this.addLayer(t));},closePopup:function closePopup(t){return t&&t!==this._popup||(t=this._popup,this._popup=null),t&&this.removeLayer(t),this;}}),o.Layer.include({bindPopup:function bindPopup(t,e){return t instanceof o.Popup?(o.setOptions(t,e),this._popup=t,t._source=this):(this._popup&&!e||(this._popup=new o.Popup(e,this)),this._popup.setContent(t)),this._popupHandlersAdded||(this.on({click:this._openPopup,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!0),this;},unbindPopup:function unbindPopup(){return this._popup&&(this.off({click:this._openPopup,remove:this.closePopup,move:this._movePopup}),this._popupHandlersAdded=!1,this._popup=null),this;},openPopup:function openPopup(t,e){if(t instanceof o.Layer||(e=t,t=this),t instanceof o.FeatureGroup)for(var i in this._layers){t=this._layers[i];break;}return e||(e=t.getCenter?t.getCenter():t.getLatLng()),this._popup&&this._map&&(this._popup._source=t,this._popup.update(),this._map.openPopup(this._popup,e)),this;},closePopup:function closePopup(){return this._popup&&this._popup._close(),this;},togglePopup:function togglePopup(t){return this._popup&&(this._popup._map?this.closePopup():this.openPopup(t)),this;},isPopupOpen:function isPopupOpen(){return this._popup.isOpen();},setPopupContent:function setPopupContent(t){return this._popup&&this._popup.setContent(t),this;},getPopup:function getPopup(){return this._popup;},_openPopup:function _openPopup(t){var e=t.layer||t.target;if(this._popup&&this._map)return o.DomEvent.stop(t),e instanceof o.Path?void this.openPopup(t.layer||t.target,t.latlng):void(this._map.hasLayer(this._popup)&&this._popup._source===e?this.closePopup():this.openPopup(e,t.latlng));},_movePopup:function _movePopup(t){this._popup.setLatLng(t.latlng);}}),o.Marker.include({_getPopupAnchor:function _getPopupAnchor(){return this.options.icon.options.popupAnchor||[0,0];}}),o.Tooltip=o.DivOverlay.extend({options:{pane:"tooltipPane",offset:[0,0],direction:"auto",permanent:!1,sticky:!1,interactive:!1,opacity:.9},onAdd:function onAdd(t){o.DivOverlay.prototype.onAdd.call(this,t),this.setOpacity(this.options.opacity),t.fire("tooltipopen",{tooltip:this}),this._source&&this._source.fire("tooltipopen",{tooltip:this},!0);},onRemove:function onRemove(t){o.DivOverlay.prototype.onRemove.call(this,t),t.fire("tooltipclose",{tooltip:this}),this._source&&this._source.fire("tooltipclose",{tooltip:this},!0);},getEvents:function getEvents(){var t=o.DivOverlay.prototype.getEvents.call(this);return o.Browser.touch&&!this.options.permanent&&(t.preclick=this._close),t;},_close:function _close(){this._map&&this._map.closeTooltip(this);},_initLayout:function _initLayout(){var t="leaflet-tooltip",e=t+" "+(this.options.className||"")+" leaflet-zoom-"+(this._zoomAnimated?"animated":"hide");this._contentNode=this._container=o.DomUtil.create("div",e);},_updateLayout:function _updateLayout(){},_adjustPan:function _adjustPan(){},_setPosition:function _setPosition(t){var e=this._map,i=this._container,n=e.latLngToContainerPoint(e.getCenter()),s=e.layerPointToContainerPoint(t),r=this.options.direction,a=i.offsetWidth,h=i.offsetHeight,l=o.point(this.options.offset),u=this._getAnchor();"top"===r?t=t.add(o.point(-a/2+l.x,-h+l.y+u.y)):"bottom"===r?t=t.subtract(o.point(a/2-l.x,-l.y)):"center"===r?t=t.subtract(o.point(a/2+l.x,h/2-u.y+l.y)):"right"===r||"auto"===r&&s.x<n.x?(r="right",t=t.add([l.x+u.x,u.y-h/2+l.y])):(r="left",t=t.subtract(o.point(a+u.x-l.x,h/2-u.y-l.y))),o.DomUtil.removeClass(i,"leaflet-tooltip-right"),o.DomUtil.removeClass(i,"leaflet-tooltip-left"),o.DomUtil.removeClass(i,"leaflet-tooltip-top"),o.DomUtil.removeClass(i,"leaflet-tooltip-bottom"),o.DomUtil.addClass(i,"leaflet-tooltip-"+r),o.DomUtil.setPosition(i,t);},_updatePosition:function _updatePosition(){var t=this._map.latLngToLayerPoint(this._latlng);this._setPosition(t);},setOpacity:function setOpacity(t){this.options.opacity=t,this._container&&o.DomUtil.setOpacity(this._container,t);},_animateZoom:function _animateZoom(t){var e=this._map._latLngToNewLayerPoint(this._latlng,t.zoom,t.center);this._setPosition(e);},_getAnchor:function _getAnchor(){return o.point(this._source&&this._source._getTooltipAnchor&&!this.options.sticky?this._source._getTooltipAnchor():[0,0]);}}),o.tooltip=function(t,e){return new o.Tooltip(t,e);},o.Map.include({openTooltip:function openTooltip(t,e,i){return t instanceof o.Tooltip||(t=new o.Tooltip(i).setContent(t)),e&&t.setLatLng(e),this.hasLayer(t)?this:this.addLayer(t);},closeTooltip:function closeTooltip(t){return t&&this.removeLayer(t),this;}}),o.Layer.include({bindTooltip:function bindTooltip(t,e){return t instanceof o.Tooltip?(o.setOptions(t,e),this._tooltip=t,t._source=this):(this._tooltip&&!e||(this._tooltip=o.tooltip(e,this)),this._tooltip.setContent(t)),this._initTooltipInteractions(),this._tooltip.options.permanent&&this._map&&this._map.hasLayer(this)&&this.openTooltip(),this;},unbindTooltip:function unbindTooltip(){return this._tooltip&&(this._initTooltipInteractions(!0),this.closeTooltip(),this._tooltip=null),this;},_initTooltipInteractions:function _initTooltipInteractions(t){if(t||!this._tooltipHandlersAdded){var e=t?"off":"on",i={remove:this.closeTooltip,move:this._moveTooltip};this._tooltip.options.permanent?i.add=this._openTooltip:(i.mouseover=this._openTooltip,i.mouseout=this.closeTooltip,this._tooltip.options.sticky&&(i.mousemove=this._moveTooltip),o.Browser.touch&&(i.click=this._openTooltip)),this[e](i),this._tooltipHandlersAdded=!t;}},openTooltip:function openTooltip(t,e){if(t instanceof o.Layer||(e=t,t=this),t instanceof o.FeatureGroup)for(var i in this._layers){t=this._layers[i];break;}return e||(e=t.getCenter?t.getCenter():t.getLatLng()),this._tooltip&&this._map&&(this._tooltip._source=t,this._tooltip.update(),this._map.openTooltip(this._tooltip,e),this._tooltip.options.interactive&&this._tooltip._container&&(o.DomUtil.addClass(this._tooltip._container,"leaflet-clickable"),this.addInteractiveTarget(this._tooltip._container))),this;},closeTooltip:function closeTooltip(){return this._tooltip&&(this._tooltip._close(),this._tooltip.options.interactive&&this._tooltip._container&&(o.DomUtil.removeClass(this._tooltip._container,"leaflet-clickable"),this.removeInteractiveTarget(this._tooltip._container))),this;},toggleTooltip:function toggleTooltip(t){return this._tooltip&&(this._tooltip._map?this.closeTooltip():this.openTooltip(t)),this;},isTooltipOpen:function isTooltipOpen(){return this._tooltip.isOpen();},setTooltipContent:function setTooltipContent(t){return this._tooltip&&this._tooltip.setContent(t),this;},getTooltip:function getTooltip(){return this._tooltip;},_openTooltip:function _openTooltip(t){var e=t.layer||t.target;this._tooltip&&this._map&&this.openTooltip(e,this._tooltip.options.sticky?t.latlng:i);},_moveTooltip:function _moveTooltip(t){var e,i,n=t.latlng;this._tooltip.options.sticky&&t.originalEvent&&(e=this._map.mouseEventToContainerPoint(t.originalEvent),i=this._map.containerPointToLayerPoint(e),n=this._map.layerPointToLatLng(i)),this._tooltip.setLatLng(n);}}),o.Marker.include({_getTooltipAnchor:function _getTooltipAnchor(){return this.options.icon.options.tooltipAnchor||[0,0];}}),o.LayerGroup=o.Layer.extend({initialize:function initialize(t){this._layers={};var e,i;if(t)for(e=0,i=t.length;e<i;e++){this.addLayer(t[e]);}},addLayer:function addLayer(t){var e=this.getLayerId(t);return this._layers[e]=t,this._map&&this._map.addLayer(t),this;},removeLayer:function removeLayer(t){var e=t in this._layers?t:this.getLayerId(t);return this._map&&this._layers[e]&&this._map.removeLayer(this._layers[e]),delete this._layers[e],this;},hasLayer:function hasLayer(t){return!!t&&(t in this._layers||this.getLayerId(t)in this._layers);},clearLayers:function clearLayers(){for(var t in this._layers){this.removeLayer(this._layers[t]);}return this;},invoke:function invoke(t){var e,i,n=Array.prototype.slice.call(arguments,1);for(e in this._layers){i=this._layers[e],i[t]&&i[t].apply(i,n);}return this;},onAdd:function onAdd(t){for(var e in this._layers){t.addLayer(this._layers[e]);}},onRemove:function onRemove(t){for(var e in this._layers){t.removeLayer(this._layers[e]);}},eachLayer:function eachLayer(t,e){for(var i in this._layers){t.call(e,this._layers[i]);}return this;},getLayer:function getLayer(t){return this._layers[t];},getLayers:function getLayers(){var t=[];for(var e in this._layers){t.push(this._layers[e]);}return t;},setZIndex:function setZIndex(t){return this.invoke("setZIndex",t);},getLayerId:function getLayerId(t){return o.stamp(t);}}),o.layerGroup=function(t){return new o.LayerGroup(t);},o.FeatureGroup=o.LayerGroup.extend({addLayer:function addLayer(t){return this.hasLayer(t)?this:(t.addEventParent(this),o.LayerGroup.prototype.addLayer.call(this,t),this.fire("layeradd",{layer:t}));},removeLayer:function removeLayer(t){return this.hasLayer(t)?(t in this._layers&&(t=this._layers[t]),t.removeEventParent(this),o.LayerGroup.prototype.removeLayer.call(this,t),this.fire("layerremove",{layer:t})):this;},setStyle:function setStyle(t){return this.invoke("setStyle",t);},bringToFront:function bringToFront(){return this.invoke("bringToFront");},bringToBack:function bringToBack(){return this.invoke("bringToBack");},getBounds:function getBounds(){var t=new o.LatLngBounds();for(var e in this._layers){var i=this._layers[e];t.extend(i.getBounds?i.getBounds():i.getLatLng());}return t;}}),o.featureGroup=function(t){return new o.FeatureGroup(t);},o.Renderer=o.Layer.extend({options:{padding:.1},initialize:function initialize(t){o.setOptions(this,t),o.stamp(this);},onAdd:function onAdd(){this._container||(this._initContainer(),this._zoomAnimated&&o.DomUtil.addClass(this._container,"leaflet-zoom-animated")),this.getPane().appendChild(this._container),this._update();},onRemove:function onRemove(){o.DomUtil.remove(this._container);},getEvents:function getEvents(){var t={viewreset:this._reset,zoom:this._onZoom,moveend:this._update};return this._zoomAnimated&&(t.zoomanim=this._onAnimZoom),t;},_onAnimZoom:function _onAnimZoom(t){this._updateTransform(t.center,t.zoom);},_onZoom:function _onZoom(){this._updateTransform(this._map.getCenter(),this._map.getZoom());},_updateTransform:function _updateTransform(t,e){var i=this._map.getZoomScale(e,this._zoom),n=o.DomUtil.getPosition(this._container),s=this._map.getSize().multiplyBy(.5+this.options.padding),r=this._map.project(this._center,e),a=this._map.project(t,e),h=a.subtract(r),l=s.multiplyBy(-i).add(n).add(s).subtract(h);o.Browser.any3d?o.DomUtil.setTransform(this._container,l,i):o.DomUtil.setPosition(this._container,l);},_reset:function _reset(){this._update(),this._updateTransform(this._center,this._zoom);},_update:function _update(){var t=this.options.padding,e=this._map.getSize(),i=this._map.containerPointToLayerPoint(e.multiplyBy(-t)).round();this._bounds=new o.Bounds(i,i.add(e.multiplyBy(1+2*t)).round()),this._center=this._map.getCenter(),this._zoom=this._map.getZoom();}}),o.Map.include({getRenderer:function getRenderer(t){var e=t.options.renderer||this._getPaneRenderer(t.options.pane)||this.options.renderer||this._renderer;return e||(e=this._renderer=this.options.preferCanvas&&o.canvas()||o.svg()),this.hasLayer(e)||this.addLayer(e),e;},_getPaneRenderer:function _getPaneRenderer(t){if("overlayPane"===t||t===i)return!1;var e=this._paneRenderers[t];return e===i&&(e=o.SVG&&o.svg({pane:t})||o.Canvas&&o.canvas({pane:t}),this._paneRenderers[t]=e),e;}}),o.Path=o.Layer.extend({options:{stroke:!0,color:"#3388ff",weight:3,opacity:1,lineCap:"round",lineJoin:"round",dashArray:null,dashOffset:null,fill:!1,fillColor:null,fillOpacity:.2,fillRule:"evenodd",interactive:!0},beforeAdd:function beforeAdd(t){this._renderer=t.getRenderer(this);},onAdd:function onAdd(){this._renderer._initPath(this),this._reset(),this._renderer._addPath(this),this._renderer.on("update",this._update,this);},onRemove:function onRemove(){this._renderer._removePath(this),this._renderer.off("update",this._update,this);},getEvents:function getEvents(){return{zoomend:this._project,viewreset:this._reset};},redraw:function redraw(){return this._map&&this._renderer._updatePath(this),this;},setStyle:function setStyle(t){return o.setOptions(this,t),this._renderer&&this._renderer._updateStyle(this),this;},bringToFront:function bringToFront(){return this._renderer&&this._renderer._bringToFront(this),this;},bringToBack:function bringToBack(){return this._renderer&&this._renderer._bringToBack(this),this;},getElement:function getElement(){return this._path;},_reset:function _reset(){this._project(),this._update();},_clickTolerance:function _clickTolerance(){return(this.options.stroke?this.options.weight/2:0)+(o.Browser.touch?10:0);}}),o.LineUtil={simplify:function simplify(t,e){if(!e||!t.length)return t.slice();var i=e*e;return t=this._reducePoints(t,i),t=this._simplifyDP(t,i);},pointToSegmentDistance:function pointToSegmentDistance(t,e,i){return Math.sqrt(this._sqClosestPointOnSegment(t,e,i,!0));},closestPointOnSegment:function closestPointOnSegment(t,e,i){return this._sqClosestPointOnSegment(t,e,i);},_simplifyDP:function _simplifyDP(t,e){var n=t.length,o=(typeof Uint8Array==="undefined"?"undefined":(0,_typeof3.default)(Uint8Array))!=i+""?Uint8Array:Array,s=new o(n);s[0]=s[n-1]=1,this._simplifyDPStep(t,s,e,0,n-1);var r,a=[];for(r=0;r<n;r++){s[r]&&a.push(t[r]);}return a;},_simplifyDPStep:function _simplifyDPStep(t,e,i,n,o){var s,r,a,h=0;for(r=n+1;r<=o-1;r++){a=this._sqClosestPointOnSegment(t[r],t[n],t[o],!0),a>h&&(s=r,h=a);}h>i&&(e[s]=1,this._simplifyDPStep(t,e,i,n,s),this._simplifyDPStep(t,e,i,s,o));},_reducePoints:function _reducePoints(t,e){for(var i=[t[0]],n=1,o=0,s=t.length;n<s;n++){this._sqDist(t[n],t[o])>e&&(i.push(t[n]),o=n);}return o<s-1&&i.push(t[s-1]),i;},clipSegment:function clipSegment(t,e,i,n,o){var s,r,a,h=n?this._lastCode:this._getBitCode(t,i),l=this._getBitCode(e,i);for(this._lastCode=l;;){if(!(h|l))return[t,e];if(h&l)return!1;s=h||l,r=this._getEdgeIntersection(t,e,s,i,o),a=this._getBitCode(r,i),s===h?(t=r,h=a):(e=r,l=a);}},_getEdgeIntersection:function _getEdgeIntersection(t,e,i,n,s){var r,a,h=e.x-t.x,l=e.y-t.y,u=n.min,c=n.max;return 8&i?(r=t.x+h*(c.y-t.y)/l,a=c.y):4&i?(r=t.x+h*(u.y-t.y)/l,a=u.y):2&i?(r=c.x,a=t.y+l*(c.x-t.x)/h):1&i&&(r=u.x,a=t.y+l*(u.x-t.x)/h),new o.Point(r,a,s);},_getBitCode:function _getBitCode(t,e){var i=0;return t.x<e.min.x?i|=1:t.x>e.max.x&&(i|=2),t.y<e.min.y?i|=4:t.y>e.max.y&&(i|=8),i;},_sqDist:function _sqDist(t,e){var i=e.x-t.x,n=e.y-t.y;return i*i+n*n;},_sqClosestPointOnSegment:function _sqClosestPointOnSegment(t,e,i,n){var s,r=e.x,a=e.y,h=i.x-r,l=i.y-a,u=h*h+l*l;return u>0&&(s=((t.x-r)*h+(t.y-a)*l)/u,s>1?(r=i.x,a=i.y):s>0&&(r+=h*s,a+=l*s)),h=t.x-r,l=t.y-a,n?h*h+l*l:new o.Point(r,a);}},o.Polyline=o.Path.extend({options:{smoothFactor:1,noClip:!1},initialize:function initialize(t,e){o.setOptions(this,e),this._setLatLngs(t);},getLatLngs:function getLatLngs(){return this._latlngs;},setLatLngs:function setLatLngs(t){return this._setLatLngs(t),this.redraw();},isEmpty:function isEmpty(){return!this._latlngs.length;},closestLayerPoint:function closestLayerPoint(t){for(var e,i,n=1/0,s=null,r=o.LineUtil._sqClosestPointOnSegment,a=0,h=this._parts.length;a<h;a++){for(var l=this._parts[a],u=1,c=l.length;u<c;u++){e=l[u-1],i=l[u];var d=r(t,e,i,!0);d<n&&(n=d,s=r(t,e,i));}}return s&&(s.distance=Math.sqrt(n)),s;},getCenter:function getCenter(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");var t,e,i,n,o,s,r,a=this._rings[0],h=a.length;if(!h)return null;for(t=0,e=0;t<h-1;t++){e+=a[t].distanceTo(a[t+1])/2;}if(0===e)return this._map.layerPointToLatLng(a[0]);for(t=0,n=0;t<h-1;t++){if(o=a[t],s=a[t+1],i=o.distanceTo(s),n+=i,n>e)return r=(n-e)/i,this._map.layerPointToLatLng([s.x-r*(s.x-o.x),s.y-r*(s.y-o.y)]);}},getBounds:function getBounds(){return this._bounds;},addLatLng:function addLatLng(t,e){return e=e||this._defaultShape(),t=o.latLng(t),e.push(t),this._bounds.extend(t),this.redraw();},_setLatLngs:function _setLatLngs(t){this._bounds=new o.LatLngBounds(),this._latlngs=this._convertLatLngs(t);},_defaultShape:function _defaultShape(){return o.Polyline._flat(this._latlngs)?this._latlngs:this._latlngs[0];},_convertLatLngs:function _convertLatLngs(t){for(var e=[],i=o.Polyline._flat(t),n=0,s=t.length;n<s;n++){i?(e[n]=o.latLng(t[n]),this._bounds.extend(e[n])):e[n]=this._convertLatLngs(t[n]);}return e;},_project:function _project(){var t=new o.Bounds();this._rings=[],this._projectLatlngs(this._latlngs,this._rings,t);var e=this._clickTolerance(),i=new o.Point(e,e);this._bounds.isValid()&&t.isValid()&&(t.min._subtract(i),t.max._add(i),this._pxBounds=t);},_projectLatlngs:function _projectLatlngs(t,e,i){var n,s,r=t[0]instanceof o.LatLng,a=t.length;if(r){for(s=[],n=0;n<a;n++){s[n]=this._map.latLngToLayerPoint(t[n]),i.extend(s[n]);}e.push(s);}else for(n=0;n<a;n++){this._projectLatlngs(t[n],e,i);}},_clipPoints:function _clipPoints(){var t=this._renderer._bounds;if(this._parts=[],this._pxBounds&&this._pxBounds.intersects(t)){if(this.options.noClip)return void(this._parts=this._rings);var e,i,n,s,r,a,h,l=this._parts;for(e=0,n=0,s=this._rings.length;e<s;e++){for(h=this._rings[e],i=0,r=h.length;i<r-1;i++){a=o.LineUtil.clipSegment(h[i],h[i+1],t,i,!0),a&&(l[n]=l[n]||[],l[n].push(a[0]),a[1]===h[i+1]&&i!==r-2||(l[n].push(a[1]),n++));}}}},_simplifyPoints:function _simplifyPoints(){for(var t=this._parts,e=this.options.smoothFactor,i=0,n=t.length;i<n;i++){t[i]=o.LineUtil.simplify(t[i],e);}},_update:function _update(){this._map&&(this._clipPoints(),this._simplifyPoints(),this._updatePath());},_updatePath:function _updatePath(){this._renderer._updatePoly(this);}}),o.polyline=function(t,e){return new o.Polyline(t,e);},o.Polyline._flat=function(t){return!o.Util.isArray(t[0])||"object"!=(0,_typeof3.default)(t[0][0])&&"undefined"!=typeof t[0][0];},o.PolyUtil={},o.PolyUtil.clipPolygon=function(t,e,i){var n,s,r,a,h,l,u,c,d,_=[1,4,2,8],m=o.LineUtil;for(s=0,u=t.length;s<u;s++){t[s]._code=m._getBitCode(t[s],e);}for(a=0;a<4;a++){for(c=_[a],n=[],s=0,u=t.length,r=u-1;s<u;r=s++){h=t[s],l=t[r],h._code&c?l._code&c||(d=m._getEdgeIntersection(l,h,c,e,i),d._code=m._getBitCode(d,e),n.push(d)):(l._code&c&&(d=m._getEdgeIntersection(l,h,c,e,i),d._code=m._getBitCode(d,e),n.push(d)),n.push(h));}t=n;}return t;},o.Polygon=o.Polyline.extend({options:{fill:!0},isEmpty:function isEmpty(){return!this._latlngs.length||!this._latlngs[0].length;},getCenter:function getCenter(){if(!this._map)throw new Error("Must add layer to map before using getCenter()");var t,e,i,n,o,s,r,a,h,l=this._rings[0],u=l.length;if(!u)return null;for(s=r=a=0,t=0,e=u-1;t<u;e=t++){i=l[t],n=l[e],o=i.y*n.x-n.y*i.x,r+=(i.x+n.x)*o,a+=(i.y+n.y)*o,s+=3*o;}return h=0===s?l[0]:[r/s,a/s],this._map.layerPointToLatLng(h);},_convertLatLngs:function _convertLatLngs(t){var e=o.Polyline.prototype._convertLatLngs.call(this,t),i=e.length;return i>=2&&e[0]instanceof o.LatLng&&e[0].equals(e[i-1])&&e.pop(),e;},_setLatLngs:function _setLatLngs(t){o.Polyline.prototype._setLatLngs.call(this,t),o.Polyline._flat(this._latlngs)&&(this._latlngs=[this._latlngs]);},_defaultShape:function _defaultShape(){return o.Polyline._flat(this._latlngs[0])?this._latlngs[0]:this._latlngs[0][0];},_clipPoints:function _clipPoints(){var t=this._renderer._bounds,e=this.options.weight,i=new o.Point(e,e);if(t=new o.Bounds(t.min.subtract(i),t.max.add(i)),this._parts=[],this._pxBounds&&this._pxBounds.intersects(t)){if(this.options.noClip)return void(this._parts=this._rings);for(var n,s=0,r=this._rings.length;s<r;s++){n=o.PolyUtil.clipPolygon(this._rings[s],t,!0),n.length&&this._parts.push(n);}}},_updatePath:function _updatePath(){this._renderer._updatePoly(this,!0);}}),o.polygon=function(t,e){return new o.Polygon(t,e);},o.Rectangle=o.Polygon.extend({initialize:function initialize(t,e){o.Polygon.prototype.initialize.call(this,this._boundsToLatLngs(t),e);},setBounds:function setBounds(t){return this.setLatLngs(this._boundsToLatLngs(t));},_boundsToLatLngs:function _boundsToLatLngs(t){return t=o.latLngBounds(t),[t.getSouthWest(),t.getNorthWest(),t.getNorthEast(),t.getSouthEast()];}}),o.rectangle=function(t,e){return new o.Rectangle(t,e);},o.CircleMarker=o.Path.extend({options:{fill:!0,radius:10},initialize:function initialize(t,e){o.setOptions(this,e),this._latlng=o.latLng(t),this._radius=this.options.radius;},setLatLng:function setLatLng(t){return this._latlng=o.latLng(t),this.redraw(),this.fire("move",{latlng:this._latlng});},getLatLng:function getLatLng(){return this._latlng;},setRadius:function setRadius(t){return this.options.radius=this._radius=t,this.redraw();},getRadius:function getRadius(){return this._radius;},setStyle:function setStyle(t){var e=t&&t.radius||this._radius;return o.Path.prototype.setStyle.call(this,t),this.setRadius(e),this;},_project:function _project(){this._point=this._map.latLngToLayerPoint(this._latlng),this._updateBounds();},_updateBounds:function _updateBounds(){var t=this._radius,e=this._radiusY||t,i=this._clickTolerance(),n=[t+i,e+i];this._pxBounds=new o.Bounds(this._point.subtract(n),this._point.add(n));},_update:function _update(){this._map&&this._updatePath();},_updatePath:function _updatePath(){this._renderer._updateCircle(this);},_empty:function _empty(){return this._radius&&!this._renderer._bounds.intersects(this._pxBounds);}}),o.circleMarker=function(t,e){return new o.CircleMarker(t,e);},o.Circle=o.CircleMarker.extend({initialize:function initialize(t,e,i){if("number"==typeof e&&(e=o.extend({},i,{radius:e})),o.setOptions(this,e),this._latlng=o.latLng(t),isNaN(this.options.radius))throw new Error("Circle radius cannot be NaN");this._mRadius=this.options.radius;},setRadius:function setRadius(t){return this._mRadius=t,this.redraw();},getRadius:function getRadius(){return this._mRadius;},getBounds:function getBounds(){var t=[this._radius,this._radiusY||this._radius];return new o.LatLngBounds(this._map.layerPointToLatLng(this._point.subtract(t)),this._map.layerPointToLatLng(this._point.add(t)));},setStyle:o.Path.prototype.setStyle,_project:function _project(){var t=this._latlng.lng,e=this._latlng.lat,i=this._map,n=i.options.crs;if(n.distance===o.CRS.Earth.distance){var s=Math.PI/180,r=this._mRadius/o.CRS.Earth.R/s,a=i.project([e+r,t]),h=i.project([e-r,t]),l=a.add(h).divideBy(2),u=i.unproject(l).lat,c=Math.acos((Math.cos(r*s)-Math.sin(e*s)*Math.sin(u*s))/(Math.cos(e*s)*Math.cos(u*s)))/s;(isNaN(c)||0===c)&&(c=r/Math.cos(Math.PI/180*e)),this._point=l.subtract(i.getPixelOrigin()),this._radius=isNaN(c)?0:Math.max(Math.round(l.x-i.project([u,t-c]).x),1),this._radiusY=Math.max(Math.round(l.y-a.y),1);}else{var d=n.unproject(n.project(this._latlng).subtract([this._mRadius,0]));this._point=i.latLngToLayerPoint(this._latlng),this._radius=this._point.x-i.latLngToLayerPoint(d).x;}this._updateBounds();}}),o.circle=function(t,e,i){return new o.Circle(t,e,i);},o.SVG=o.Renderer.extend({getEvents:function getEvents(){var t=o.Renderer.prototype.getEvents.call(this);return t.zoomstart=this._onZoomStart,t;},_initContainer:function _initContainer(){this._container=o.SVG.create("svg"),this._container.setAttribute("pointer-events","none"),this._rootGroup=o.SVG.create("g"),this._container.appendChild(this._rootGroup);},_onZoomStart:function _onZoomStart(){this._update();},_update:function _update(){if(!this._map._animatingZoom||!this._bounds){o.Renderer.prototype._update.call(this);var t=this._bounds,e=t.getSize(),i=this._container;this._svgSize&&this._svgSize.equals(e)||(this._svgSize=e,i.setAttribute("width",e.x),i.setAttribute("height",e.y)),o.DomUtil.setPosition(i,t.min),i.setAttribute("viewBox",[t.min.x,t.min.y,e.x,e.y].join(" ")),this.fire("update");}},_initPath:function _initPath(t){var e=t._path=o.SVG.create("path");t.options.className&&o.DomUtil.addClass(e,t.options.className),t.options.interactive&&o.DomUtil.addClass(e,"leaflet-interactive"),this._updateStyle(t);},_addPath:function _addPath(t){this._rootGroup.appendChild(t._path),t.addInteractiveTarget(t._path);},_removePath:function _removePath(t){o.DomUtil.remove(t._path),t.removeInteractiveTarget(t._path);},_updatePath:function _updatePath(t){t._project(),t._update();},_updateStyle:function _updateStyle(t){var e=t._path,i=t.options;e&&(i.stroke?(e.setAttribute("stroke",i.color),e.setAttribute("stroke-opacity",i.opacity),e.setAttribute("stroke-width",i.weight),e.setAttribute("stroke-linecap",i.lineCap),e.setAttribute("stroke-linejoin",i.lineJoin),i.dashArray?e.setAttribute("stroke-dasharray",i.dashArray):e.removeAttribute("stroke-dasharray"),i.dashOffset?e.setAttribute("stroke-dashoffset",i.dashOffset):e.removeAttribute("stroke-dashoffset")):e.setAttribute("stroke","none"),i.fill?(e.setAttribute("fill",i.fillColor||i.color),e.setAttribute("fill-opacity",i.fillOpacity),e.setAttribute("fill-rule",i.fillRule||"evenodd")):e.setAttribute("fill","none"));},_updatePoly:function _updatePoly(t,e){this._setPath(t,o.SVG.pointsToPath(t._parts,e));},_updateCircle:function _updateCircle(t){var e=t._point,i=t._radius,n=t._radiusY||i,o="a"+i+","+n+" 0 1,0 ",s=t._empty()?"M0 0":"M"+(e.x-i)+","+e.y+o+2*i+",0 "+o+2*-i+",0 ";this._setPath(t,s);},_setPath:function _setPath(t,e){t._path.setAttribute("d",e);},_bringToFront:function _bringToFront(t){o.DomUtil.toFront(t._path);},_bringToBack:function _bringToBack(t){o.DomUtil.toBack(t._path);}}),o.extend(o.SVG,{create:function create(t){return e.createElementNS("http://www.w3.org/2000/svg",t);},pointsToPath:function pointsToPath(t,e){var i,n,s,r,a,h,l="";for(i=0,s=t.length;i<s;i++){for(a=t[i],n=0,r=a.length;n<r;n++){h=a[n],l+=(n?"L":"M")+h.x+" "+h.y;}l+=e?o.Browser.svg?"z":"x":"";}return l||"M0 0";}}),o.Browser.svg=!(!e.createElementNS||!o.SVG.create("svg").createSVGRect),o.svg=function(t){return o.Browser.svg||o.Browser.vml?new o.SVG(t):null;},o.Browser.vml=!o.Browser.svg&&function(){try{var t=e.createElement("div");t.innerHTML='<v:shape adj="1"/>';var i=t.firstChild;return i.style.behavior="url(#default#VML)",i&&"object"==(0,_typeof3.default)(i.adj);}catch(t){return!1;}}(),o.SVG.include(o.Browser.vml?{_initContainer:function _initContainer(){this._container=o.DomUtil.create("div","leaflet-vml-container");},_update:function _update(){this._map._animatingZoom||(o.Renderer.prototype._update.call(this),this.fire("update"));},_initPath:function _initPath(t){var e=t._container=o.SVG.create("shape");o.DomUtil.addClass(e,"leaflet-vml-shape "+(this.options.className||"")),e.coordsize="1 1",t._path=o.SVG.create("path"),e.appendChild(t._path),this._updateStyle(t);},_addPath:function _addPath(t){var e=t._container;this._container.appendChild(e),t.options.interactive&&t.addInteractiveTarget(e);},_removePath:function _removePath(t){var e=t._container;o.DomUtil.remove(e),t.removeInteractiveTarget(e);},_updateStyle:function _updateStyle(t){var e=t._stroke,i=t._fill,n=t.options,s=t._container;s.stroked=!!n.stroke,s.filled=!!n.fill,n.stroke?(e||(e=t._stroke=o.SVG.create("stroke")),s.appendChild(e),e.weight=n.weight+"px",e.color=n.color,e.opacity=n.opacity,n.dashArray?e.dashStyle=o.Util.isArray(n.dashArray)?n.dashArray.join(" "):n.dashArray.replace(/( *, *)/g," "):e.dashStyle="",e.endcap=n.lineCap.replace("butt","flat"),e.joinstyle=n.lineJoin):e&&(s.removeChild(e),t._stroke=null),n.fill?(i||(i=t._fill=o.SVG.create("fill")),s.appendChild(i),i.color=n.fillColor||n.color,i.opacity=n.fillOpacity):i&&(s.removeChild(i),t._fill=null);},_updateCircle:function _updateCircle(t){var e=t._point.round(),i=Math.round(t._radius),n=Math.round(t._radiusY||i);this._setPath(t,t._empty()?"M0 0":"AL "+e.x+","+e.y+" "+i+","+n+" 0,23592600");},_setPath:function _setPath(t,e){t._path.v=e;},_bringToFront:function _bringToFront(t){o.DomUtil.toFront(t._container);},_bringToBack:function _bringToBack(t){o.DomUtil.toBack(t._container);}}:{}),o.Browser.vml&&(o.SVG.create=function(){try{return e.namespaces.add("lvml","urn:schemas-microsoft-com:vml"),function(t){return e.createElement("<lvml:"+t+' class="lvml">');};}catch(t){return function(t){return e.createElement("<"+t+' xmlns="urn:schemas-microsoft.com:vml" class="lvml">');};}}()),o.Canvas=o.Renderer.extend({onAdd:function onAdd(){o.Renderer.prototype.onAdd.call(this),this._layers=this._layers||{},this._draw();},_initContainer:function _initContainer(){var t=this._container=e.createElement("canvas");o.DomEvent.on(t,"mousemove",o.Util.throttle(this._onMouseMove,32,this),this).on(t,"click dblclick mousedown mouseup contextmenu",this._onClick,this).on(t,"mouseout",this._handleMouseOut,this),this._ctx=t.getContext("2d");},_update:function _update(){if(!this._map._animatingZoom||!this._bounds){this._drawnLayers={},o.Renderer.prototype._update.call(this);var t=this._bounds,e=this._container,i=t.getSize(),n=o.Browser.retina?2:1;o.DomUtil.setPosition(e,t.min),e.width=n*i.x,e.height=n*i.y,e.style.width=i.x+"px",e.style.height=i.y+"px",o.Browser.retina&&this._ctx.scale(2,2),this._ctx.translate(-t.min.x,-t.min.y),this.fire("update");}},_initPath:function _initPath(t){this._updateDashArray(t),this._layers[o.stamp(t)]=t;},_addPath:o.Util.falseFn,_removePath:function _removePath(t){t._removed=!0,this._requestRedraw(t);},_updatePath:function _updatePath(t){this._redrawBounds=t._pxBounds,this._draw(!0),t._project(),t._update(),this._draw(),this._redrawBounds=null;},_updateStyle:function _updateStyle(t){this._updateDashArray(t),this._requestRedraw(t);},_updateDashArray:function _updateDashArray(t){if(t.options.dashArray){var e,i=t.options.dashArray.split(","),n=[];for(e=0;e<i.length;e++){n.push(Number(i[e]));}t.options._dashArray=n;}},_requestRedraw:function _requestRedraw(t){if(this._map){var e=(t.options.weight||0)+1;this._redrawBounds=this._redrawBounds||new o.Bounds(),this._redrawBounds.extend(t._pxBounds.min.subtract([e,e])),this._redrawBounds.extend(t._pxBounds.max.add([e,e])),this._redrawRequest=this._redrawRequest||o.Util.requestAnimFrame(this._redraw,this);}},_redraw:function _redraw(){this._redrawRequest=null,this._draw(!0),this._draw(),this._redrawBounds=null;},_draw:function _draw(t){this._clear=t;var e,i=this._redrawBounds;this._ctx.save(),i&&(this._ctx.beginPath(),this._ctx.rect(i.min.x,i.min.y,i.max.x-i.min.x,i.max.y-i.min.y),this._ctx.clip());for(var n in this._layers){e=this._layers[n],(!i||e._pxBounds&&e._pxBounds.intersects(i))&&e._updatePath(),t&&e._removed&&(delete e._removed,delete this._layers[n]);}this._ctx.restore();},_updatePoly:function _updatePoly(t,e){var i,n,o,s,r=t._parts,a=r.length,h=this._ctx;if(a){for(this._drawnLayers[t._leaflet_id]=t,h.beginPath(),h.setLineDash&&h.setLineDash(t.options&&t.options._dashArray||[]),i=0;i<a;i++){for(n=0,o=r[i].length;n<o;n++){s=r[i][n],h[n?"lineTo":"moveTo"](s.x,s.y);}e&&h.closePath();}this._fillStroke(h,t);}},_updateCircle:function _updateCircle(t){if(!t._empty()){var e=t._point,i=this._ctx,n=t._radius,o=(t._radiusY||n)/n;this._drawnLayers[t._leaflet_id]=t,1!==o&&(i.save(),i.scale(1,o)),i.beginPath(),i.arc(e.x,e.y/o,n,0,2*Math.PI,!1),1!==o&&i.restore(),this._fillStroke(i,t);}},_fillStroke:function _fillStroke(t,e){var i=this._clear,n=e.options;t.globalCompositeOperation=i?"destination-out":"source-over",n.fill&&(t.globalAlpha=i?1:n.fillOpacity,t.fillStyle=n.fillColor||n.color,t.fill(n.fillRule||"evenodd")),n.stroke&&0!==n.weight&&(t.globalAlpha=i?1:n.opacity,e._prevWeight=t.lineWidth=i?e._prevWeight+1:n.weight,t.strokeStyle=n.color,t.lineCap=n.lineCap,t.lineJoin=n.lineJoin,t.stroke());},_onClick:function _onClick(t){var e,i=this._map.mouseEventToLayerPoint(t),n=[];for(var s in this._layers){e=this._layers[s],e.options.interactive&&e._containsPoint(i)&&!this._map._draggableMoved(e)&&(o.DomEvent._fakeStop(t),n.push(e));}n.length&&this._fireEvent(n,t);},_onMouseMove:function _onMouseMove(t){if(this._map&&!this._map.dragging.moving()&&!this._map._animatingZoom){var e=this._map.mouseEventToLayerPoint(t);this._handleMouseOut(t,e),this._handleMouseHover(t,e);}},_handleMouseOut:function _handleMouseOut(t,e){var i=this._hoveredLayer;!i||"mouseout"!==t.type&&i._containsPoint(e)||(o.DomUtil.removeClass(this._container,"leaflet-interactive"),this._fireEvent([i],t,"mouseout"),this._hoveredLayer=null);},_handleMouseHover:function _handleMouseHover(t,e){var i,n;for(i in this._drawnLayers){n=this._drawnLayers[i],n.options.interactive&&n._containsPoint(e)&&(o.DomUtil.addClass(this._container,"leaflet-interactive"),this._fireEvent([n],t,"mouseover"),this._hoveredLayer=n);}this._hoveredLayer&&this._fireEvent([this._hoveredLayer],t);},_fireEvent:function _fireEvent(t,e,i){this._map._fireDOMEvent(e,i||e.type,t);},_bringToFront:o.Util.falseFn,_bringToBack:o.Util.falseFn}),o.Browser.canvas=function(){return!!e.createElement("canvas").getContext;}(),o.canvas=function(t){return o.Browser.canvas?new o.Canvas(t):null;},o.Polyline.prototype._containsPoint=function(t,e){var i,n,s,r,a,h,l=this._clickTolerance();if(!this._pxBounds.contains(t))return!1;for(i=0,r=this._parts.length;i<r;i++){for(h=this._parts[i],n=0,a=h.length,s=a-1;n<a;s=n++){if((e||0!==n)&&o.LineUtil.pointToSegmentDistance(t,h[s],h[n])<=l)return!0;}}return!1;},o.Polygon.prototype._containsPoint=function(t){var e,i,n,s,r,a,h,l,u=!1;if(!this._pxBounds.contains(t))return!1;for(s=0,h=this._parts.length;s<h;s++){for(e=this._parts[s],r=0,l=e.length,a=l-1;r<l;a=r++){i=e[r],n=e[a],i.y>t.y!=n.y>t.y&&t.x<(n.x-i.x)*(t.y-i.y)/(n.y-i.y)+i.x&&(u=!u);}}return u||o.Polyline.prototype._containsPoint.call(this,t,!0);},o.CircleMarker.prototype._containsPoint=function(t){return t.distanceTo(this._point)<=this._radius+this._clickTolerance();},o.GeoJSON=o.FeatureGroup.extend({initialize:function initialize(t,e){o.setOptions(this,e),this._layers={},t&&this.addData(t);},addData:function addData(t){var e,i,n,s=o.Util.isArray(t)?t:t.features;if(s){for(e=0,i=s.length;e<i;e++){n=s[e],(n.geometries||n.geometry||n.features||n.coordinates)&&this.addData(n);}return this;}var r=this.options;if(r.filter&&!r.filter(t))return this;var a=o.GeoJSON.geometryToLayer(t,r);return a?(a.feature=o.GeoJSON.asFeature(t),a.defaultOptions=a.options,this.resetStyle(a),r.onEachFeature&&r.onEachFeature(t,a),this.addLayer(a)):this;},resetStyle:function resetStyle(t){return t.options=o.Util.extend({},t.defaultOptions),this._setLayerStyle(t,this.options.style),this;},setStyle:function setStyle(t){return this.eachLayer(function(e){this._setLayerStyle(e,t);},this);},_setLayerStyle:function _setLayerStyle(t,e){"function"==typeof e&&(e=e(t.feature)),t.setStyle&&t.setStyle(e);}}),o.extend(o.GeoJSON,{geometryToLayer:function geometryToLayer(t,e){var i,n,s,r,a="Feature"===t.type?t.geometry:t,h=a?a.coordinates:null,l=[],u=e&&e.pointToLayer,c=e&&e.coordsToLatLng||this.coordsToLatLng;if(!h&&!a)return null;switch(a.type){case"Point":return i=c(h),u?u(t,i):new o.Marker(i);case"MultiPoint":for(s=0,r=h.length;s<r;s++){i=c(h[s]),l.push(u?u(t,i):new o.Marker(i));}return new o.FeatureGroup(l);case"LineString":case"MultiLineString":return n=this.coordsToLatLngs(h,"LineString"===a.type?0:1,c),new o.Polyline(n,e);case"Polygon":case"MultiPolygon":return n=this.coordsToLatLngs(h,"Polygon"===a.type?1:2,c),new o.Polygon(n,e);case"GeometryCollection":for(s=0,r=a.geometries.length;s<r;s++){var d=this.geometryToLayer({geometry:a.geometries[s],type:"Feature",properties:t.properties},e);d&&l.push(d);}return new o.FeatureGroup(l);default:throw new Error("Invalid GeoJSON object.");}},coordsToLatLng:function coordsToLatLng(t){return new o.LatLng(t[1],t[0],t[2]);},coordsToLatLngs:function coordsToLatLngs(t,e,i){for(var n,o=[],s=0,r=t.length;s<r;s++){n=e?this.coordsToLatLngs(t[s],e-1,i):(i||this.coordsToLatLng)(t[s]),o.push(n);}return o;},latLngToCoords:function latLngToCoords(t){return t.alt!==i?[t.lng,t.lat,t.alt]:[t.lng,t.lat];},latLngsToCoords:function latLngsToCoords(t,e,i){for(var n=[],s=0,r=t.length;s<r;s++){n.push(e?o.GeoJSON.latLngsToCoords(t[s],e-1,i):o.GeoJSON.latLngToCoords(t[s]));}return!e&&i&&n.push(n[0]),n;},getFeature:function getFeature(t,e){return t.feature?o.extend({},t.feature,{geometry:e}):o.GeoJSON.asFeature(e);},asFeature:function asFeature(t){return"Feature"===t.type?t:{type:"Feature",properties:{},geometry:t};}});var r={toGeoJSON:function toGeoJSON(){return o.GeoJSON.getFeature(this,{type:"Point",coordinates:o.GeoJSON.latLngToCoords(this.getLatLng())});}};o.Marker.include(r),o.Circle.include(r),o.CircleMarker.include(r),o.Polyline.prototype.toGeoJSON=function(){var t=!o.Polyline._flat(this._latlngs),e=o.GeoJSON.latLngsToCoords(this._latlngs,t?1:0);return o.GeoJSON.getFeature(this,{type:(t?"Multi":"")+"LineString",coordinates:e});},o.Polygon.prototype.toGeoJSON=function(){var t=!o.Polyline._flat(this._latlngs),e=t&&!o.Polyline._flat(this._latlngs[0]),i=o.GeoJSON.latLngsToCoords(this._latlngs,e?2:t?1:0,!0);return t||(i=[i]),o.GeoJSON.getFeature(this,{type:(e?"Multi":"")+"Polygon",coordinates:i});},o.LayerGroup.include({toMultiPoint:function toMultiPoint(){var t=[];return this.eachLayer(function(e){t.push(e.toGeoJSON().geometry.coordinates);}),o.GeoJSON.getFeature(this,{type:"MultiPoint",coordinates:t});},toGeoJSON:function toGeoJSON(){var t=this.feature&&this.feature.geometry&&this.feature.geometry.type;if("MultiPoint"===t)return this.toMultiPoint();var e="GeometryCollection"===t,i=[];return this.eachLayer(function(t){if(t.toGeoJSON){var n=t.toGeoJSON();i.push(e?n.geometry:o.GeoJSON.asFeature(n));}}),e?o.GeoJSON.getFeature(this,{geometries:i,type:"GeometryCollection"}):{type:"FeatureCollection",features:i};}}),o.geoJSON=function(t,e){return new o.GeoJSON(t,e);},o.geoJson=o.geoJSON;var a="_leaflet_events";o.DomEvent={on:function on(t,e,i,n){if("object"==(typeof e==="undefined"?"undefined":(0,_typeof3.default)(e)))for(var s in e){this._on(t,s,e[s],i);}else{e=o.Util.splitWords(e);for(var r=0,a=e.length;r<a;r++){this._on(t,e[r],i,n);}}return this;},off:function off(t,e,i,n){if("object"==(typeof e==="undefined"?"undefined":(0,_typeof3.default)(e)))for(var s in e){this._off(t,s,e[s],i);}else{e=o.Util.splitWords(e);for(var r=0,a=e.length;r<a;r++){this._off(t,e[r],i,n);}}return this;},_on:function _on(e,i,n,s){var r=i+o.stamp(n)+(s?"_"+o.stamp(s):"");if(e[a]&&e[a][r])return this;var h=function h(i){return n.call(s||e,i||t.event);},l=h;return o.Browser.pointer&&0===i.indexOf("touch")?this.addPointerListener(e,i,h,r):o.Browser.touch&&"dblclick"===i&&this.addDoubleTapListener?this.addDoubleTapListener(e,h,r):"addEventListener"in e?"mousewheel"===i?e.addEventListener("onwheel"in e?"wheel":"mousewheel",h,!1):"mouseenter"===i||"mouseleave"===i?(h=function h(i){i=i||t.event,o.DomEvent._isExternalTarget(e,i)&&l(i);},e.addEventListener("mouseenter"===i?"mouseover":"mouseout",h,!1)):("click"===i&&o.Browser.android&&(h=function h(t){return o.DomEvent._filterClick(t,l);}),e.addEventListener(i,h,!1)):"attachEvent"in e&&e.attachEvent("on"+i,h),e[a]=e[a]||{},e[a][r]=h,this;},_off:function _off(t,e,i,n){var s=e+o.stamp(i)+(n?"_"+o.stamp(n):""),r=t[a]&&t[a][s];return r?(o.Browser.pointer&&0===e.indexOf("touch")?this.removePointerListener(t,e,s):o.Browser.touch&&"dblclick"===e&&this.removeDoubleTapListener?this.removeDoubleTapListener(t,s):"removeEventListener"in t?"mousewheel"===e?t.removeEventListener("onwheel"in t?"wheel":"mousewheel",r,!1):t.removeEventListener("mouseenter"===e?"mouseover":"mouseleave"===e?"mouseout":e,r,!1):"detachEvent"in t&&t.detachEvent("on"+e,r),t[a][s]=null,this):this;},stopPropagation:function stopPropagation(t){return t.stopPropagation?t.stopPropagation():t.originalEvent?t.originalEvent._stopped=!0:t.cancelBubble=!0,o.DomEvent._skipped(t),this;},disableScrollPropagation:function disableScrollPropagation(t){return o.DomEvent.on(t,"mousewheel",o.DomEvent.stopPropagation);},disableClickPropagation:function disableClickPropagation(t){var e=o.DomEvent.stopPropagation;return o.DomEvent.on(t,o.Draggable.START.join(" "),e),o.DomEvent.on(t,{click:o.DomEvent._fakeStop,dblclick:e});},preventDefault:function preventDefault(t){return t.preventDefault?t.preventDefault():t.returnValue=!1,this;},stop:function stop(t){return o.DomEvent.preventDefault(t).stopPropagation(t);},getMousePosition:function getMousePosition(t,e){if(!e)return new o.Point(t.clientX,t.clientY);var i=e.getBoundingClientRect();return new o.Point(t.clientX-i.left-e.clientLeft,t.clientY-i.top-e.clientTop);},_wheelPxFactor:o.Browser.win&&o.Browser.chrome?2:o.Browser.gecko?t.devicePixelRatio:1,getWheelDelta:function getWheelDelta(t){return o.Browser.edge?t.wheelDeltaY/2:t.deltaY&&0===t.deltaMode?-t.deltaY/o.DomEvent._wheelPxFactor:t.deltaY&&1===t.deltaMode?20*-t.deltaY:t.deltaY&&2===t.deltaMode?60*-t.deltaY:t.deltaX||t.deltaZ?0:t.wheelDelta?(t.wheelDeltaY||t.wheelDelta)/2:t.detail&&Math.abs(t.detail)<32765?20*-t.detail:t.detail?t.detail/-32765*60:0;},_skipEvents:{},_fakeStop:function _fakeStop(t){o.DomEvent._skipEvents[t.type]=!0;},_skipped:function _skipped(t){var e=this._skipEvents[t.type];return this._skipEvents[t.type]=!1,e;},_isExternalTarget:function _isExternalTarget(t,e){var i=e.relatedTarget;if(!i)return!0;try{for(;i&&i!==t;){i=i.parentNode;}}catch(t){return!1;}return i!==t;},_filterClick:function _filterClick(t,e){var i=t.timeStamp||t.originalEvent&&t.originalEvent.timeStamp,n=o.DomEvent._lastClick&&i-o.DomEvent._lastClick;return n&&n>100&&n<500||t.target._simulatedClick&&!t._simulated?void o.DomEvent.stop(t):(o.DomEvent._lastClick=i,void e(t));}},o.DomEvent.addListener=o.DomEvent.on,o.DomEvent.removeListener=o.DomEvent.off,o.Draggable=o.Evented.extend({options:{clickTolerance:3},statics:{START:o.Browser.touch?["touchstart","mousedown"]:["mousedown"],END:{mousedown:"mouseup",touchstart:"touchend",pointerdown:"touchend",MSPointerDown:"touchend"},MOVE:{mousedown:"mousemove",touchstart:"touchmove",pointerdown:"touchmove",MSPointerDown:"touchmove"}},initialize:function initialize(t,e,i){this._element=t,this._dragStartTarget=e||t,this._preventOutline=i;},enable:function enable(){this._enabled||(o.DomEvent.on(this._dragStartTarget,o.Draggable.START.join(" "),this._onDown,this),this._enabled=!0);},disable:function disable(){this._enabled&&(o.DomEvent.off(this._dragStartTarget,o.Draggable.START.join(" "),this._onDown,this),this._enabled=!1,this._moved=!1);},_onDown:function _onDown(t){if(!t._simulated&&this._enabled&&(this._moved=!1,!o.DomUtil.hasClass(this._element,"leaflet-zoom-anim")&&!(o.Draggable._dragging||t.shiftKey||1!==t.which&&1!==t.button&&!t.touches)&&this._enabled&&(o.Draggable._dragging=!0,this._preventOutline&&o.DomUtil.preventOutline(this._element),o.DomUtil.disableImageDrag(),o.DomUtil.disableTextSelection(),!this._moving))){this.fire("down");var i=t.touches?t.touches[0]:t;this._startPoint=new o.Point(i.clientX,i.clientY),o.DomEvent.on(e,o.Draggable.MOVE[t.type],this._onMove,this).on(e,o.Draggable.END[t.type],this._onUp,this);}},_onMove:function _onMove(i){if(!i._simulated&&this._enabled){if(i.touches&&i.touches.length>1)return void(this._moved=!0);var n=i.touches&&1===i.touches.length?i.touches[0]:i,s=new o.Point(n.clientX,n.clientY),r=s.subtract(this._startPoint);(r.x||r.y)&&(Math.abs(r.x)+Math.abs(r.y)<this.options.clickTolerance||(o.DomEvent.preventDefault(i),this._moved||(this.fire("dragstart"),this._moved=!0,this._startPos=o.DomUtil.getPosition(this._element).subtract(r),o.DomUtil.addClass(e.body,"leaflet-dragging"),this._lastTarget=i.target||i.srcElement,t.SVGElementInstance&&this._lastTarget instanceof SVGElementInstance&&(this._lastTarget=this._lastTarget.correspondingUseElement),o.DomUtil.addClass(this._lastTarget,"leaflet-drag-target")),this._newPos=this._startPos.add(r),this._moving=!0,o.Util.cancelAnimFrame(this._animRequest),this._lastEvent=i,this._animRequest=o.Util.requestAnimFrame(this._updatePosition,this,!0)));}},_updatePosition:function _updatePosition(){var t={originalEvent:this._lastEvent};this.fire("predrag",t),o.DomUtil.setPosition(this._element,this._newPos),this.fire("drag",t);},_onUp:function _onUp(t){if(!t._simulated&&this._enabled){o.DomUtil.removeClass(e.body,"leaflet-dragging"),this._lastTarget&&(o.DomUtil.removeClass(this._lastTarget,"leaflet-drag-target"),this._lastTarget=null);for(var i in o.Draggable.MOVE){o.DomEvent.off(e,o.Draggable.MOVE[i],this._onMove,this).off(e,o.Draggable.END[i],this._onUp,this);}o.DomUtil.enableImageDrag(),o.DomUtil.enableTextSelection(),this._moved&&this._moving&&(o.Util.cancelAnimFrame(this._animRequest),this.fire("dragend",{distance:this._newPos.distanceTo(this._startPos)})),this._moving=!1,o.Draggable._dragging=!1;}}}),o.Handler=o.Class.extend({initialize:function initialize(t){this._map=t;},enable:function enable(){return this._enabled?this:(this._enabled=!0,this.addHooks(),this);},disable:function disable(){return this._enabled?(this._enabled=!1,this.removeHooks(),this):this;},enabled:function enabled(){return!!this._enabled;}}),o.Map.mergeOptions({dragging:!0,inertia:!o.Browser.android23,inertiaDeceleration:3400,inertiaMaxSpeed:1/0,easeLinearity:.2,worldCopyJump:!1,maxBoundsViscosity:0}),o.Map.Drag=o.Handler.extend({addHooks:function addHooks(){if(!this._draggable){var t=this._map;this._draggable=new o.Draggable(t._mapPane,t._container),this._draggable.on({down:this._onDown,dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this),this._draggable.on("predrag",this._onPreDragLimit,this),t.options.worldCopyJump&&(this._draggable.on("predrag",this._onPreDragWrap,this),t.on("zoomend",this._onZoomEnd,this),t.whenReady(this._onZoomEnd,this));}o.DomUtil.addClass(this._map._container,"leaflet-grab leaflet-touch-drag"),this._draggable.enable(),this._positions=[],this._times=[];},removeHooks:function removeHooks(){o.DomUtil.removeClass(this._map._container,"leaflet-grab"),o.DomUtil.removeClass(this._map._container,"leaflet-touch-drag"),this._draggable.disable();},moved:function moved(){return this._draggable&&this._draggable._moved;},moving:function moving(){return this._draggable&&this._draggable._moving;},_onDown:function _onDown(){this._map._stop();},_onDragStart:function _onDragStart(){var t=this._map;if(this._map.options.maxBounds&&this._map.options.maxBoundsViscosity){var e=o.latLngBounds(this._map.options.maxBounds);this._offsetLimit=o.bounds(this._map.latLngToContainerPoint(e.getNorthWest()).multiplyBy(-1),this._map.latLngToContainerPoint(e.getSouthEast()).multiplyBy(-1).add(this._map.getSize())),this._viscosity=Math.min(1,Math.max(0,this._map.options.maxBoundsViscosity));}else this._offsetLimit=null;t.fire("movestart").fire("dragstart"),t.options.inertia&&(this._positions=[],this._times=[]);},_onDrag:function _onDrag(t){if(this._map.options.inertia){var e=this._lastTime=+new Date(),i=this._lastPos=this._draggable._absPos||this._draggable._newPos;this._positions.push(i),this._times.push(e),e-this._times[0]>50&&(this._positions.shift(),this._times.shift());}this._map.fire("move",t).fire("drag",t);},_onZoomEnd:function _onZoomEnd(){var t=this._map.getSize().divideBy(2),e=this._map.latLngToLayerPoint([0,0]);this._initialWorldOffset=e.subtract(t).x,this._worldWidth=this._map.getPixelWorldBounds().getSize().x;},_viscousLimit:function _viscousLimit(t,e){return t-(t-e)*this._viscosity;},_onPreDragLimit:function _onPreDragLimit(){if(this._viscosity&&this._offsetLimit){var t=this._draggable._newPos.subtract(this._draggable._startPos),e=this._offsetLimit;t.x<e.min.x&&(t.x=this._viscousLimit(t.x,e.min.x)),t.y<e.min.y&&(t.y=this._viscousLimit(t.y,e.min.y)),t.x>e.max.x&&(t.x=this._viscousLimit(t.x,e.max.x)),t.y>e.max.y&&(t.y=this._viscousLimit(t.y,e.max.y)),this._draggable._newPos=this._draggable._startPos.add(t);}},_onPreDragWrap:function _onPreDragWrap(){var t=this._worldWidth,e=Math.round(t/2),i=this._initialWorldOffset,n=this._draggable._newPos.x,o=(n-e+i)%t+e-i,s=(n+e+i)%t-e-i,r=Math.abs(o+i)<Math.abs(s+i)?o:s;this._draggable._absPos=this._draggable._newPos.clone(),this._draggable._newPos.x=r;},_onDragEnd:function _onDragEnd(t){var e=this._map,i=e.options,n=!i.inertia||this._times.length<2;if(e.fire("dragend",t),n)e.fire("moveend");else{var s=this._lastPos.subtract(this._positions[0]),r=(this._lastTime-this._times[0])/1e3,a=i.easeLinearity,h=s.multiplyBy(a/r),l=h.distanceTo([0,0]),u=Math.min(i.inertiaMaxSpeed,l),c=h.multiplyBy(u/l),d=u/(i.inertiaDeceleration*a),_=c.multiplyBy(-d/2).round();_.x||_.y?(_=e._limitOffset(_,e.options.maxBounds),o.Util.requestAnimFrame(function(){e.panBy(_,{duration:d,easeLinearity:a,noMoveStart:!0,animate:!0});})):e.fire("moveend");}}}),o.Map.addInitHook("addHandler","dragging",o.Map.Drag),o.Map.mergeOptions({doubleClickZoom:!0}),o.Map.DoubleClickZoom=o.Handler.extend({addHooks:function addHooks(){this._map.on("dblclick",this._onDoubleClick,this);},removeHooks:function removeHooks(){this._map.off("dblclick",this._onDoubleClick,this);},_onDoubleClick:function _onDoubleClick(t){var e=this._map,i=e.getZoom(),n=e.options.zoomDelta,o=t.originalEvent.shiftKey?i-n:i+n;"center"===e.options.doubleClickZoom?e.setZoom(o):e.setZoomAround(t.containerPoint,o);}}),o.Map.addInitHook("addHandler","doubleClickZoom",o.Map.DoubleClickZoom),o.Map.mergeOptions({scrollWheelZoom:!0,wheelDebounceTime:40,wheelPxPerZoomLevel:60}),o.Map.ScrollWheelZoom=o.Handler.extend({addHooks:function addHooks(){o.DomEvent.on(this._map._container,"mousewheel",this._onWheelScroll,this),this._delta=0;},removeHooks:function removeHooks(){o.DomEvent.off(this._map._container,"mousewheel",this._onWheelScroll,this);},_onWheelScroll:function _onWheelScroll(t){var e=o.DomEvent.getWheelDelta(t),i=this._map.options.wheelDebounceTime;this._delta+=e,this._lastMousePos=this._map.mouseEventToContainerPoint(t),this._startTime||(this._startTime=+new Date());var n=Math.max(i-(+new Date()-this._startTime),0);clearTimeout(this._timer),this._timer=setTimeout(o.bind(this._performZoom,this),n),o.DomEvent.stop(t);},_performZoom:function _performZoom(){var t=this._map,e=t.getZoom(),i=this._map.options.zoomSnap||0;t._stop();var n=this._delta/(4*this._map.options.wheelPxPerZoomLevel),o=4*Math.log(2/(1+Math.exp(-Math.abs(n))))/Math.LN2,s=i?Math.ceil(o/i)*i:o,r=t._limitZoom(e+(this._delta>0?s:-s))-e;this._delta=0,this._startTime=null,r&&("center"===t.options.scrollWheelZoom?t.setZoom(e+r):t.setZoomAround(this._lastMousePos,e+r));}}),o.Map.addInitHook("addHandler","scrollWheelZoom",o.Map.ScrollWheelZoom),o.extend(o.DomEvent,{_touchstart:o.Browser.msPointer?"MSPointerDown":o.Browser.pointer?"pointerdown":"touchstart",_touchend:o.Browser.msPointer?"MSPointerUp":o.Browser.pointer?"pointerup":"touchend",addDoubleTapListener:function addDoubleTapListener(t,e,i){function n(t){var e;if(e=o.Browser.pointer?o.DomEvent._pointersCount:t.touches.length,!(e>1)){var i=Date.now(),n=i-(r||i);a=t.touches?t.touches[0]:t,h=n>0&&n<=l,r=i;}}function s(){if(h&&!a.cancelBubble){if(o.Browser.pointer){var t,i,n={};for(i in a){t=a[i],n[i]=t&&t.bind?t.bind(a):t;}a=n;}a.type="dblclick",e(a),r=null;}}var r,a,h=!1,l=250,u="_leaflet_",c=this._touchstart,d=this._touchend;return t[u+c+i]=n,t[u+d+i]=s,t[u+"dblclick"+i]=e,t.addEventListener(c,n,!1),t.addEventListener(d,s,!1),o.Browser.edge||t.addEventListener("dblclick",e,!1),this;},removeDoubleTapListener:function removeDoubleTapListener(t,e){var i="_leaflet_",n=t[i+this._touchstart+e],s=t[i+this._touchend+e],r=t[i+"dblclick"+e];return t.removeEventListener(this._touchstart,n,!1),t.removeEventListener(this._touchend,s,!1),o.Browser.edge||t.removeEventListener("dblclick",r,!1),this;}}),o.extend(o.DomEvent,{POINTER_DOWN:o.Browser.msPointer?"MSPointerDown":"pointerdown",POINTER_MOVE:o.Browser.msPointer?"MSPointerMove":"pointermove",POINTER_UP:o.Browser.msPointer?"MSPointerUp":"pointerup",POINTER_CANCEL:o.Browser.msPointer?"MSPointerCancel":"pointercancel",TAG_WHITE_LIST:["INPUT","SELECT","OPTION"],_pointers:{},_pointersCount:0,addPointerListener:function addPointerListener(t,e,i,n){return"touchstart"===e?this._addPointerStart(t,i,n):"touchmove"===e?this._addPointerMove(t,i,n):"touchend"===e&&this._addPointerEnd(t,i,n),this;},removePointerListener:function removePointerListener(t,e,i){var n=t["_leaflet_"+e+i];return"touchstart"===e?t.removeEventListener(this.POINTER_DOWN,n,!1):"touchmove"===e?t.removeEventListener(this.POINTER_MOVE,n,!1):"touchend"===e&&(t.removeEventListener(this.POINTER_UP,n,!1),t.removeEventListener(this.POINTER_CANCEL,n,!1)),this;},_addPointerStart:function _addPointerStart(t,i,n){var s=o.bind(function(t){if("mouse"!==t.pointerType&&t.pointerType!==t.MSPOINTER_TYPE_MOUSE){if(!(this.TAG_WHITE_LIST.indexOf(t.target.tagName)<0))return;o.DomEvent.preventDefault(t);}this._handlePointer(t,i);},this);if(t["_leaflet_touchstart"+n]=s,t.addEventListener(this.POINTER_DOWN,s,!1),!this._pointerDocListener){var r=o.bind(this._globalPointerUp,this);e.documentElement.addEventListener(this.POINTER_DOWN,o.bind(this._globalPointerDown,this),!0),e.documentElement.addEventListener(this.POINTER_MOVE,o.bind(this._globalPointerMove,this),!0),e.documentElement.addEventListener(this.POINTER_UP,r,!0),e.documentElement.addEventListener(this.POINTER_CANCEL,r,!0),this._pointerDocListener=!0;}},_globalPointerDown:function _globalPointerDown(t){this._pointers[t.pointerId]=t,this._pointersCount++;},_globalPointerMove:function _globalPointerMove(t){this._pointers[t.pointerId]&&(this._pointers[t.pointerId]=t);},_globalPointerUp:function _globalPointerUp(t){delete this._pointers[t.pointerId],this._pointersCount--;},_handlePointer:function _handlePointer(t,e){t.touches=[];for(var i in this._pointers){t.touches.push(this._pointers[i]);}t.changedTouches=[t],e(t);},_addPointerMove:function _addPointerMove(t,e,i){var n=o.bind(function(t){(t.pointerType!==t.MSPOINTER_TYPE_MOUSE&&"mouse"!==t.pointerType||0!==t.buttons)&&this._handlePointer(t,e);},this);t["_leaflet_touchmove"+i]=n,t.addEventListener(this.POINTER_MOVE,n,!1);},_addPointerEnd:function _addPointerEnd(t,e,i){var n=o.bind(function(t){this._handlePointer(t,e);},this);t["_leaflet_touchend"+i]=n,t.addEventListener(this.POINTER_UP,n,!1),t.addEventListener(this.POINTER_CANCEL,n,!1);}}),o.Map.mergeOptions({touchZoom:o.Browser.touch&&!o.Browser.android23,bounceAtZoomLimits:!0}),o.Map.TouchZoom=o.Handler.extend({addHooks:function addHooks(){o.DomUtil.addClass(this._map._container,"leaflet-touch-zoom"),o.DomEvent.on(this._map._container,"touchstart",this._onTouchStart,this);},removeHooks:function removeHooks(){o.DomUtil.removeClass(this._map._container,"leaflet-touch-zoom"),o.DomEvent.off(this._map._container,"touchstart",this._onTouchStart,this);},_onTouchStart:function _onTouchStart(t){var i=this._map;if(t.touches&&2===t.touches.length&&!i._animatingZoom&&!this._zooming){var n=i.mouseEventToContainerPoint(t.touches[0]),s=i.mouseEventToContainerPoint(t.touches[1]);this._centerPoint=i.getSize()._divideBy(2),this._startLatLng=i.containerPointToLatLng(this._centerPoint),"center"!==i.options.touchZoom&&(this._pinchStartLatLng=i.containerPointToLatLng(n.add(s)._divideBy(2))),this._startDist=n.distanceTo(s),this._startZoom=i.getZoom(),this._moved=!1,this._zooming=!0,i._stop(),o.DomEvent.on(e,"touchmove",this._onTouchMove,this).on(e,"touchend",this._onTouchEnd,this),o.DomEvent.preventDefault(t);}},_onTouchMove:function _onTouchMove(t){if(t.touches&&2===t.touches.length&&this._zooming){var e=this._map,i=e.mouseEventToContainerPoint(t.touches[0]),n=e.mouseEventToContainerPoint(t.touches[1]),s=i.distanceTo(n)/this._startDist;if(this._zoom=e.getScaleZoom(s,this._startZoom),!e.options.bounceAtZoomLimits&&(this._zoom<e.getMinZoom()&&s<1||this._zoom>e.getMaxZoom()&&s>1)&&(this._zoom=e._limitZoom(this._zoom)),"center"===e.options.touchZoom){if(this._center=this._startLatLng,1===s)return;}else{var r=i._add(n)._divideBy(2)._subtract(this._centerPoint);if(1===s&&0===r.x&&0===r.y)return;this._center=e.unproject(e.project(this._pinchStartLatLng,this._zoom).subtract(r),this._zoom);}this._moved||(e._moveStart(!0),this._moved=!0),o.Util.cancelAnimFrame(this._animRequest);var a=o.bind(e._move,e,this._center,this._zoom,{pinch:!0,round:!1});this._animRequest=o.Util.requestAnimFrame(a,this,!0),o.DomEvent.preventDefault(t);}},_onTouchEnd:function _onTouchEnd(){return this._moved&&this._zooming?(this._zooming=!1,o.Util.cancelAnimFrame(this._animRequest),o.DomEvent.off(e,"touchmove",this._onTouchMove).off(e,"touchend",this._onTouchEnd),void(this._map.options.zoomAnimation?this._map._animateZoom(this._center,this._map._limitZoom(this._zoom),!0,this._map.options.zoomSnap):this._map._resetView(this._center,this._map._limitZoom(this._zoom)))):void(this._zooming=!1);}}),o.Map.addInitHook("addHandler","touchZoom",o.Map.TouchZoom),o.Map.mergeOptions({tap:!0,tapTolerance:15}),o.Map.Tap=o.Handler.extend({addHooks:function addHooks(){o.DomEvent.on(this._map._container,"touchstart",this._onDown,this);},removeHooks:function removeHooks(){o.DomEvent.off(this._map._container,"touchstart",this._onDown,this);},_onDown:function _onDown(t){if(t.touches){if(o.DomEvent.preventDefault(t),this._fireClick=!0,t.touches.length>1)return this._fireClick=!1,void clearTimeout(this._holdTimeout);var i=t.touches[0],n=i.target;this._startPos=this._newPos=new o.Point(i.clientX,i.clientY),n.tagName&&"a"===n.tagName.toLowerCase()&&o.DomUtil.addClass(n,"leaflet-active"),this._holdTimeout=setTimeout(o.bind(function(){this._isTapValid()&&(this._fireClick=!1,this._onUp(),this._simulateEvent("contextmenu",i));},this),1e3),this._simulateEvent("mousedown",i),o.DomEvent.on(e,{touchmove:this._onMove,touchend:this._onUp},this);}},_onUp:function _onUp(t){if(clearTimeout(this._holdTimeout),o.DomEvent.off(e,{touchmove:this._onMove,touchend:this._onUp},this),this._fireClick&&t&&t.changedTouches){var i=t.changedTouches[0],n=i.target;n&&n.tagName&&"a"===n.tagName.toLowerCase()&&o.DomUtil.removeClass(n,"leaflet-active"),this._simulateEvent("mouseup",i),this._isTapValid()&&this._simulateEvent("click",i);}},_isTapValid:function _isTapValid(){return this._newPos.distanceTo(this._startPos)<=this._map.options.tapTolerance;},_onMove:function _onMove(t){var e=t.touches[0];this._newPos=new o.Point(e.clientX,e.clientY),this._simulateEvent("mousemove",e);},_simulateEvent:function _simulateEvent(i,n){var o=e.createEvent("MouseEvents");o._simulated=!0,n.target._simulatedClick=!0,o.initMouseEvent(i,!0,!0,t,1,n.screenX,n.screenY,n.clientX,n.clientY,!1,!1,!1,!1,0,null),n.target.dispatchEvent(o);}}),o.Browser.touch&&!o.Browser.pointer&&o.Map.addInitHook("addHandler","tap",o.Map.Tap),o.Map.mergeOptions({boxZoom:!0}),o.Map.BoxZoom=o.Handler.extend({initialize:function initialize(t){this._map=t,this._container=t._container,this._pane=t._panes.overlayPane;},addHooks:function addHooks(){o.DomEvent.on(this._container,"mousedown",this._onMouseDown,this);},removeHooks:function removeHooks(){o.DomEvent.off(this._container,"mousedown",this._onMouseDown,this);},moved:function moved(){return this._moved;},_resetState:function _resetState(){this._moved=!1;},_onMouseDown:function _onMouseDown(t){return!(!t.shiftKey||1!==t.which&&1!==t.button)&&(this._resetState(),o.DomUtil.disableTextSelection(),o.DomUtil.disableImageDrag(),this._startPoint=this._map.mouseEventToContainerPoint(t),void o.DomEvent.on(e,{contextmenu:o.DomEvent.stop,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this));},_onMouseMove:function _onMouseMove(t){this._moved||(this._moved=!0,this._box=o.DomUtil.create("div","leaflet-zoom-box",this._container),o.DomUtil.addClass(this._container,"leaflet-crosshair"),this._map.fire("boxzoomstart")),this._point=this._map.mouseEventToContainerPoint(t);var e=new o.Bounds(this._point,this._startPoint),i=e.getSize();o.DomUtil.setPosition(this._box,e.min),this._box.style.width=i.x+"px",this._box.style.height=i.y+"px";},_finish:function _finish(){this._moved&&(o.DomUtil.remove(this._box),o.DomUtil.removeClass(this._container,"leaflet-crosshair")),o.DomUtil.enableTextSelection(),o.DomUtil.enableImageDrag(),o.DomEvent.off(e,{contextmenu:o.DomEvent.stop,mousemove:this._onMouseMove,mouseup:this._onMouseUp,keydown:this._onKeyDown},this);},_onMouseUp:function _onMouseUp(t){if((1===t.which||1===t.button)&&(this._finish(),this._moved)){setTimeout(o.bind(this._resetState,this),0);var e=new o.LatLngBounds(this._map.containerPointToLatLng(this._startPoint),this._map.containerPointToLatLng(this._point));this._map.fitBounds(e).fire("boxzoomend",{boxZoomBounds:e});}},_onKeyDown:function _onKeyDown(t){27===t.keyCode&&this._finish();}}),o.Map.addInitHook("addHandler","boxZoom",o.Map.BoxZoom),o.Map.mergeOptions({keyboard:!0,keyboardPanDelta:80}),o.Map.Keyboard=o.Handler.extend({keyCodes:{left:[37],right:[39],down:[40],up:[38],zoomIn:[187,107,61,171],zoomOut:[189,109,54,173]},initialize:function initialize(t){this._map=t,this._setPanDelta(t.options.keyboardPanDelta),this._setZoomDelta(t.options.zoomDelta);},addHooks:function addHooks(){var t=this._map._container;t.tabIndex<=0&&(t.tabIndex="0"),o.DomEvent.on(t,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.on({focus:this._addHooks,blur:this._removeHooks},this);},removeHooks:function removeHooks(){this._removeHooks(),o.DomEvent.off(this._map._container,{focus:this._onFocus,blur:this._onBlur,mousedown:this._onMouseDown},this),this._map.off({focus:this._addHooks,blur:this._removeHooks},this);},_onMouseDown:function _onMouseDown(){if(!this._focused){var i=e.body,n=e.documentElement,o=i.scrollTop||n.scrollTop,s=i.scrollLeft||n.scrollLeft;this._map._container.focus(),t.scrollTo(s,o);}},_onFocus:function _onFocus(){this._focused=!0,this._map.fire("focus");},_onBlur:function _onBlur(){this._focused=!1,this._map.fire("blur");},_setPanDelta:function _setPanDelta(t){var e,i,n=this._panKeys={},o=this.keyCodes;for(e=0,i=o.left.length;e<i;e++){n[o.left[e]]=[-1*t,0];}for(e=0,i=o.right.length;e<i;e++){n[o.right[e]]=[t,0];}for(e=0,i=o.down.length;e<i;e++){n[o.down[e]]=[0,t];}for(e=0,i=o.up.length;e<i;e++){n[o.up[e]]=[0,-1*t];}},_setZoomDelta:function _setZoomDelta(t){var e,i,n=this._zoomKeys={},o=this.keyCodes;for(e=0,i=o.zoomIn.length;e<i;e++){n[o.zoomIn[e]]=t;}for(e=0,i=o.zoomOut.length;e<i;e++){n[o.zoomOut[e]]=-t;}},_addHooks:function _addHooks(){o.DomEvent.on(e,"keydown",this._onKeyDown,this);},_removeHooks:function _removeHooks(){o.DomEvent.off(e,"keydown",this._onKeyDown,this);},_onKeyDown:function _onKeyDown(t){if(!(t.altKey||t.ctrlKey||t.metaKey)){var e,i=t.keyCode,n=this._map;if(i in this._panKeys){if(n._panAnim&&n._panAnim._inProgress)return;e=this._panKeys[i],t.shiftKey&&(e=o.point(e).multiplyBy(3)),n.panBy(e),n.options.maxBounds&&n.panInsideBounds(n.options.maxBounds);}else if(i in this._zoomKeys)n.setZoom(n.getZoom()+(t.shiftKey?3:1)*this._zoomKeys[i]);else{if(27!==i)return;n.closePopup();}o.DomEvent.stop(t);}}}),o.Map.addInitHook("addHandler","keyboard",o.Map.Keyboard),o.Handler.MarkerDrag=o.Handler.extend({initialize:function initialize(t){this._marker=t;},addHooks:function addHooks(){var t=this._marker._icon;this._draggable||(this._draggable=new o.Draggable(t,t,!0)),this._draggable.on({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this).enable(),o.DomUtil.addClass(t,"leaflet-marker-draggable");},removeHooks:function removeHooks(){this._draggable.off({dragstart:this._onDragStart,drag:this._onDrag,dragend:this._onDragEnd},this).disable(),this._marker._icon&&o.DomUtil.removeClass(this._marker._icon,"leaflet-marker-draggable");},moved:function moved(){return this._draggable&&this._draggable._moved;},_onDragStart:function _onDragStart(){this._oldLatLng=this._marker.getLatLng(),this._marker.closePopup().fire("movestart").fire("dragstart");},_onDrag:function _onDrag(t){var e=this._marker,i=e._shadow,n=o.DomUtil.getPosition(e._icon),s=e._map.layerPointToLatLng(n);i&&o.DomUtil.setPosition(i,n),e._latlng=s,t.latlng=s,t.oldLatLng=this._oldLatLng,e.fire("move",t).fire("drag",t);},_onDragEnd:function _onDragEnd(t){delete this._oldLatLng,this._marker.fire("moveend").fire("dragend",t);}}),o.Control=o.Class.extend({options:{position:"topright"},initialize:function initialize(t){o.setOptions(this,t);},getPosition:function getPosition(){return this.options.position;},setPosition:function setPosition(t){var e=this._map;return e&&e.removeControl(this),this.options.position=t,e&&e.addControl(this),this;},getContainer:function getContainer(){return this._container;},addTo:function addTo(t){this.remove(),this._map=t;var e=this._container=this.onAdd(t),i=this.getPosition(),n=t._controlCorners[i];return o.DomUtil.addClass(e,"leaflet-control"),i.indexOf("bottom")!==-1?n.insertBefore(e,n.firstChild):n.appendChild(e),this;},remove:function remove(){return this._map?(o.DomUtil.remove(this._container),this.onRemove&&this.onRemove(this._map),this._map=null,this):this;},_refocusOnMap:function _refocusOnMap(t){this._map&&t&&t.screenX>0&&t.screenY>0&&this._map.getContainer().focus();}}),o.control=function(t){return new o.Control(t);},o.Map.include({addControl:function addControl(t){return t.addTo(this),this;},removeControl:function removeControl(t){return t.remove(),this;},_initControlPos:function _initControlPos(){function t(t,s){var r=i+t+" "+i+s;e[t+s]=o.DomUtil.create("div",r,n);}var e=this._controlCorners={},i="leaflet-",n=this._controlContainer=o.DomUtil.create("div",i+"control-container",this._container);t("top","left"),t("top","right"),t("bottom","left"),t("bottom","right");},_clearControlPos:function _clearControlPos(){o.DomUtil.remove(this._controlContainer);}}),o.Control.Zoom=o.Control.extend({options:{position:"topleft",zoomInText:"+",zoomInTitle:"Zoom in",zoomOutText:"-",zoomOutTitle:"Zoom out"},onAdd:function onAdd(t){var e="leaflet-control-zoom",i=o.DomUtil.create("div",e+" leaflet-bar"),n=this.options;return this._zoomInButton=this._createButton(n.zoomInText,n.zoomInTitle,e+"-in",i,this._zoomIn),this._zoomOutButton=this._createButton(n.zoomOutText,n.zoomOutTitle,e+"-out",i,this._zoomOut),this._updateDisabled(),t.on("zoomend zoomlevelschange",this._updateDisabled,this),i;},onRemove:function onRemove(t){t.off("zoomend zoomlevelschange",this._updateDisabled,this);},disable:function disable(){return this._disabled=!0,this._updateDisabled(),this;},enable:function enable(){return this._disabled=!1,this._updateDisabled(),this;},_zoomIn:function _zoomIn(t){!this._disabled&&this._map._zoom<this._map.getMaxZoom()&&this._map.zoomIn(this._map.options.zoomDelta*(t.shiftKey?3:1));},_zoomOut:function _zoomOut(t){!this._disabled&&this._map._zoom>this._map.getMinZoom()&&this._map.zoomOut(this._map.options.zoomDelta*(t.shiftKey?3:1));},_createButton:function _createButton(t,e,i,n,s){var r=o.DomUtil.create("a",i,n);return r.innerHTML=t,r.href="#",r.title=e,o.DomEvent.on(r,"mousedown dblclick",o.DomEvent.stopPropagation).on(r,"click",o.DomEvent.stop).on(r,"click",s,this).on(r,"click",this._refocusOnMap,this),r;},_updateDisabled:function _updateDisabled(){var t=this._map,e="leaflet-disabled";o.DomUtil.removeClass(this._zoomInButton,e),o.DomUtil.removeClass(this._zoomOutButton,e),(this._disabled||t._zoom===t.getMinZoom())&&o.DomUtil.addClass(this._zoomOutButton,e),(this._disabled||t._zoom===t.getMaxZoom())&&o.DomUtil.addClass(this._zoomInButton,e);}}),o.Map.mergeOptions({zoomControl:!0}),o.Map.addInitHook(function(){this.options.zoomControl&&(this.zoomControl=new o.Control.Zoom(),this.addControl(this.zoomControl));}),o.control.zoom=function(t){return new o.Control.Zoom(t);},o.Control.Attribution=o.Control.extend({options:{position:"bottomright",prefix:'<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'},initialize:function initialize(t){o.setOptions(this,t),this._attributions={};},onAdd:function onAdd(t){t.attributionControl=this,this._container=o.DomUtil.create("div","leaflet-control-attribution"),o.DomEvent&&o.DomEvent.disableClickPropagation(this._container);for(var e in t._layers){t._layers[e].getAttribution&&this.addAttribution(t._layers[e].getAttribution());}return this._update(),this._container;},setPrefix:function setPrefix(t){return this.options.prefix=t,this._update(),this;},addAttribution:function addAttribution(t){return t?(this._attributions[t]||(this._attributions[t]=0),this._attributions[t]++,this._update(),this):this;},removeAttribution:function removeAttribution(t){return t?(this._attributions[t]&&(this._attributions[t]--,this._update()),this):this;},_update:function _update(){if(this._map){var t=[];for(var e in this._attributions){this._attributions[e]&&t.push(e);}var i=[];this.options.prefix&&i.push(this.options.prefix),t.length&&i.push(t.join(", ")),this._container.innerHTML=i.join(" | ");}}}),o.Map.mergeOptions({attributionControl:!0}),o.Map.addInitHook(function(){this.options.attributionControl&&new o.Control.Attribution().addTo(this);}),o.control.attribution=function(t){return new o.Control.Attribution(t);},o.Control.Scale=o.Control.extend({options:{position:"bottomleft",maxWidth:100,metric:!0,imperial:!0},onAdd:function onAdd(t){var e="leaflet-control-scale",i=o.DomUtil.create("div",e),n=this.options;return this._addScales(n,e+"-line",i),t.on(n.updateWhenIdle?"moveend":"move",this._update,this),t.whenReady(this._update,this),i;},onRemove:function onRemove(t){t.off(this.options.updateWhenIdle?"moveend":"move",this._update,this);},_addScales:function _addScales(t,e,i){t.metric&&(this._mScale=o.DomUtil.create("div",e,i)),t.imperial&&(this._iScale=o.DomUtil.create("div",e,i));},_update:function _update(){var t=this._map,e=t.getSize().y/2,i=t.distance(t.containerPointToLatLng([0,e]),t.containerPointToLatLng([this.options.maxWidth,e]));this._updateScales(i);},_updateScales:function _updateScales(t){this.options.metric&&t&&this._updateMetric(t),this.options.imperial&&t&&this._updateImperial(t);},_updateMetric:function _updateMetric(t){var e=this._getRoundNum(t),i=e<1e3?e+" m":e/1e3+" km";this._updateScale(this._mScale,i,e/t);},_updateImperial:function _updateImperial(t){var e,i,n,o=3.2808399*t;o>5280?(e=o/5280,i=this._getRoundNum(e),this._updateScale(this._iScale,i+" mi",i/e)):(n=this._getRoundNum(o),this._updateScale(this._iScale,n+" ft",n/o));},_updateScale:function _updateScale(t,e,i){t.style.width=Math.round(this.options.maxWidth*i)+"px",t.innerHTML=e;},_getRoundNum:function _getRoundNum(t){var e=Math.pow(10,(Math.floor(t)+"").length-1),i=t/e;return i=i>=10?10:i>=5?5:i>=3?3:i>=2?2:1,e*i;}}),o.control.scale=function(t){return new o.Control.Scale(t);},o.Control.Layers=o.Control.extend({options:{collapsed:!0,position:"topright",autoZIndex:!0,hideSingleBase:!1},initialize:function initialize(t,e,i){o.setOptions(this,i),this._layers=[],this._lastZIndex=0,this._handlingClick=!1;for(var n in t){this._addLayer(t[n],n);}for(n in e){this._addLayer(e[n],n,!0);}},onAdd:function onAdd(t){return this._initLayout(),this._update(),this._map=t,t.on("zoomend",this._checkDisabledLayers,this),this._container;},onRemove:function onRemove(){this._map.off("zoomend",this._checkDisabledLayers,this);for(var t=0;t<this._layers.length;t++){this._layers[t].layer.off("add remove",this._onLayerChange,this);}},addBaseLayer:function addBaseLayer(t,e){return this._addLayer(t,e),this._map?this._update():this;},addOverlay:function addOverlay(t,e){return this._addLayer(t,e,!0),this._map?this._update():this;},removeLayer:function removeLayer(t){t.off("add remove",this._onLayerChange,this);var e=this._getLayer(o.stamp(t));return e&&this._layers.splice(this._layers.indexOf(e),1),this._map?this._update():this;},expand:function expand(){o.DomUtil.addClass(this._container,"leaflet-control-layers-expanded"),this._form.style.height=null;var t=this._map.getSize().y-(this._container.offsetTop+50);return t<this._form.clientHeight?(o.DomUtil.addClass(this._form,"leaflet-control-layers-scrollbar"),this._form.style.height=t+"px"):o.DomUtil.removeClass(this._form,"leaflet-control-layers-scrollbar"),this._checkDisabledLayers(),this;},collapse:function collapse(){return o.DomUtil.removeClass(this._container,"leaflet-control-layers-expanded"),this;},_initLayout:function _initLayout(){var t="leaflet-control-layers",e=this._container=o.DomUtil.create("div",t);e.setAttribute("aria-haspopup",!0),o.DomEvent.disableClickPropagation(e),o.Browser.touch||o.DomEvent.disableScrollPropagation(e);var i=this._form=o.DomUtil.create("form",t+"-list");if(this.options.collapsed){o.Browser.android||o.DomEvent.on(e,{mouseenter:this.expand,mouseleave:this.collapse},this);var n=this._layersLink=o.DomUtil.create("a",t+"-toggle",e);n.href="#",n.title="Layers",o.Browser.touch?o.DomEvent.on(n,"click",o.DomEvent.stop).on(n,"click",this.expand,this):o.DomEvent.on(n,"focus",this.expand,this),o.DomEvent.on(i,"click",function(){setTimeout(o.bind(this._onInputClick,this),0);},this),this._map.on("click",this.collapse,this);}else this.expand();this._baseLayersList=o.DomUtil.create("div",t+"-base",i),this._separator=o.DomUtil.create("div",t+"-separator",i),this._overlaysList=o.DomUtil.create("div",t+"-overlays",i),e.appendChild(i);},_getLayer:function _getLayer(t){for(var e=0;e<this._layers.length;e++){if(this._layers[e]&&o.stamp(this._layers[e].layer)===t)return this._layers[e];}},_addLayer:function _addLayer(t,e,i){t.on("add remove",this._onLayerChange,this),this._layers.push({layer:t,name:e,overlay:i}),this.options.autoZIndex&&t.setZIndex&&(this._lastZIndex++,t.setZIndex(this._lastZIndex));},_update:function _update(){if(!this._container)return this;o.DomUtil.empty(this._baseLayersList),o.DomUtil.empty(this._overlaysList);var t,e,i,n,s=0;for(i=0;i<this._layers.length;i++){n=this._layers[i],this._addItem(n),e=e||n.overlay,t=t||!n.overlay,s+=n.overlay?0:1;}return this.options.hideSingleBase&&(t=t&&s>1,this._baseLayersList.style.display=t?"":"none"),this._separator.style.display=e&&t?"":"none",this;},_onLayerChange:function _onLayerChange(t){this._handlingClick||this._update();var e=this._getLayer(o.stamp(t.target)),i=e.overlay?"add"===t.type?"overlayadd":"overlayremove":"add"===t.type?"baselayerchange":null;i&&this._map.fire(i,e);},_createRadioElement:function _createRadioElement(t,i){var n='<input type="radio" class="leaflet-control-layers-selector" name="'+t+'"'+(i?' checked="checked"':"")+"/>",o=e.createElement("div");return o.innerHTML=n,o.firstChild;},_addItem:function _addItem(t){var i,n=e.createElement("label"),s=this._map.hasLayer(t.layer);t.overlay?(i=e.createElement("input"),i.type="checkbox",i.className="leaflet-control-layers-selector",i.defaultChecked=s):i=this._createRadioElement("leaflet-base-layers",s),i.layerId=o.stamp(t.layer),o.DomEvent.on(i,"click",this._onInputClick,this);var r=e.createElement("span");r.innerHTML=" "+t.name;var a=e.createElement("div");n.appendChild(a),a.appendChild(i),a.appendChild(r);var h=t.overlay?this._overlaysList:this._baseLayersList;return h.appendChild(n),this._checkDisabledLayers(),n;},_onInputClick:function _onInputClick(){var t,e,i,n=this._form.getElementsByTagName("input"),o=[],s=[];this._handlingClick=!0;for(var r=n.length-1;r>=0;r--){t=n[r],e=this._getLayer(t.layerId).layer,i=this._map.hasLayer(e),t.checked&&!i?o.push(e):!t.checked&&i&&s.push(e);}for(r=0;r<s.length;r++){this._map.removeLayer(s[r]);}for(r=0;r<o.length;r++){this._map.addLayer(o[r]);}this._handlingClick=!1,this._refocusOnMap();},_checkDisabledLayers:function _checkDisabledLayers(){for(var t,e,n=this._form.getElementsByTagName("input"),o=this._map.getZoom(),s=n.length-1;s>=0;s--){t=n[s],e=this._getLayer(t.layerId).layer,t.disabled=e.options.minZoom!==i&&o<e.options.minZoom||e.options.maxZoom!==i&&o>e.options.maxZoom;}},_expand:function _expand(){return this.expand();},_collapse:function _collapse(){return this.collapse();}}),o.control.layers=function(t,e,i){return new o.Control.Layers(t,e,i);},o.PosAnimation=o.Evented.extend({run:function run(t,e,i,n){this.stop(),this._el=t,this._inProgress=!0,this._duration=i||.25,this._easeOutPower=1/Math.max(n||.5,.2),this._startPos=o.DomUtil.getPosition(t),this._offset=e.subtract(this._startPos),this._startTime=+new Date(),this.fire("start"),this._animate();},stop:function stop(){this._inProgress&&(this._step(!0),this._complete());},_animate:function _animate(){this._animId=o.Util.requestAnimFrame(this._animate,this),this._step();},_step:function _step(t){var e=+new Date()-this._startTime,i=1e3*this._duration;e<i?this._runFrame(this._easeOut(e/i),t):(this._runFrame(1),this._complete());},_runFrame:function _runFrame(t,e){var i=this._startPos.add(this._offset.multiplyBy(t));e&&i._round(),o.DomUtil.setPosition(this._el,i),this.fire("step");},_complete:function _complete(){o.Util.cancelAnimFrame(this._animId),this._inProgress=!1,this.fire("end");},_easeOut:function _easeOut(t){return 1-Math.pow(1-t,this._easeOutPower);}}),o.Map.include({setView:function setView(t,e,n){if(e=e===i?this._zoom:this._limitZoom(e),t=this._limitCenter(o.latLng(t),e,this.options.maxBounds),n=n||{},this._stop(),this._loaded&&!n.reset&&n!==!0){n.animate!==i&&(n.zoom=o.extend({animate:n.animate},n.zoom),n.pan=o.extend({animate:n.animate,duration:n.duration},n.pan));var s=this._zoom!==e?this._tryAnimatedZoom&&this._tryAnimatedZoom(t,e,n.zoom):this._tryAnimatedPan(t,n.pan);if(s)return clearTimeout(this._sizeTimer),this;}return this._resetView(t,e),this;},panBy:function panBy(t,e){if(t=o.point(t).round(),e=e||{},!t.x&&!t.y)return this.fire("moveend");if(e.animate!==!0&&!this.getSize().contains(t))return this._resetView(this.unproject(this.project(this.getCenter()).add(t)),this.getZoom()),this;if(this._panAnim||(this._panAnim=new o.PosAnimation(),this._panAnim.on({step:this._onPanTransitionStep,end:this._onPanTransitionEnd},this)),e.noMoveStart||this.fire("movestart"),e.animate!==!1){o.DomUtil.addClass(this._mapPane,"leaflet-pan-anim");var i=this._getMapPanePos().subtract(t).round();this._panAnim.run(this._mapPane,i,e.duration||.25,e.easeLinearity);}else this._rawPanBy(t),this.fire("move").fire("moveend");return this;},_onPanTransitionStep:function _onPanTransitionStep(){this.fire("move");},_onPanTransitionEnd:function _onPanTransitionEnd(){o.DomUtil.removeClass(this._mapPane,"leaflet-pan-anim"),this.fire("moveend");},_tryAnimatedPan:function _tryAnimatedPan(t,e){var i=this._getCenterOffset(t)._floor();return!((e&&e.animate)!==!0&&!this.getSize().contains(i))&&(this.panBy(i,e),!0);}}),o.Map.mergeOptions({zoomAnimation:!0,zoomAnimationThreshold:4});var h=o.DomUtil.TRANSITION&&o.Browser.any3d&&!o.Browser.mobileOpera;h&&o.Map.addInitHook(function(){this._zoomAnimated=this.options.zoomAnimation,this._zoomAnimated&&(this._createAnimProxy(),o.DomEvent.on(this._proxy,o.DomUtil.TRANSITION_END,this._catchTransitionEnd,this));}),o.Map.include(h?{_createAnimProxy:function _createAnimProxy(){var t=this._proxy=o.DomUtil.create("div","leaflet-proxy leaflet-zoom-animated");this._panes.mapPane.appendChild(t),this.on("zoomanim",function(e){var i=o.DomUtil.TRANSFORM,n=t.style[i];o.DomUtil.setTransform(t,this.project(e.center,e.zoom),this.getZoomScale(e.zoom,1)),n===t.style[i]&&this._animatingZoom&&this._onZoomTransitionEnd();},this),this.on("load moveend",function(){var e=this.getCenter(),i=this.getZoom();o.DomUtil.setTransform(t,this.project(e,i),this.getZoomScale(i,1));},this);},_catchTransitionEnd:function _catchTransitionEnd(t){this._animatingZoom&&t.propertyName.indexOf("transform")>=0&&this._onZoomTransitionEnd();},_nothingToAnimate:function _nothingToAnimate(){return!this._container.getElementsByClassName("leaflet-zoom-animated").length;},_tryAnimatedZoom:function _tryAnimatedZoom(t,e,i){if(this._animatingZoom)return!0;if(i=i||{},!this._zoomAnimated||i.animate===!1||this._nothingToAnimate()||Math.abs(e-this._zoom)>this.options.zoomAnimationThreshold)return!1;var n=this.getZoomScale(e),s=this._getCenterOffset(t)._divideBy(1-1/n);return!(i.animate!==!0&&!this.getSize().contains(s))&&(o.Util.requestAnimFrame(function(){this._moveStart(!0)._animateZoom(t,e,!0);},this),!0);},_animateZoom:function _animateZoom(t,e,i,n){i&&(this._animatingZoom=!0,this._animateToCenter=t,this._animateToZoom=e,o.DomUtil.addClass(this._mapPane,"leaflet-zoom-anim")),this.fire("zoomanim",{center:t,zoom:e,noUpdate:n}),setTimeout(o.bind(this._onZoomTransitionEnd,this),250);},_onZoomTransitionEnd:function _onZoomTransitionEnd(){this._animatingZoom&&(o.DomUtil.removeClass(this._mapPane,"leaflet-zoom-anim"),this._animatingZoom=!1,this._move(this._animateToCenter,this._animateToZoom),o.Util.requestAnimFrame(function(){this._moveEnd(!0);},this));}}:{}),o.Map.include({flyTo:function flyTo(t,e,n){function s(t){var e=t?-1:1,i=t?v:g,n=v*v-g*g+e*L*L*y*y,o=2*i*L*y,s=n/o,r=Math.sqrt(s*s+1)-s,a=r<1e-9?-18:Math.log(r);return a;}function r(t){return(Math.exp(t)-Math.exp(-t))/2;}function a(t){return(Math.exp(t)+Math.exp(-t))/2;}function h(t){return r(t)/a(t);}function l(t){return g*(a(x)/a(x+P*t));}function u(t){return g*(a(x)*h(x+P*t)-r(x))/L;}function c(t){return 1-Math.pow(1-t,1.5);}function d(){var i=(Date.now()-b)/T,n=c(i)*w;i<=1?(this._flyToFrame=o.Util.requestAnimFrame(d,this),this._move(this.unproject(_.add(m.subtract(_).multiplyBy(u(n)/y)),f),this.getScaleZoom(g/l(n),f),{flyTo:!0})):this._move(t,e)._moveEnd(!0);}if(n=n||{},n.animate===!1||!o.Browser.any3d)return this.setView(t,e,n);this._stop();var _=this.project(this.getCenter()),m=this.project(t),p=this.getSize(),f=this._zoom;t=o.latLng(t),e=e===i?f:e;var g=Math.max(p.x,p.y),v=g*this.getZoomScale(f,e),y=m.distanceTo(_)||1,P=1.42,L=P*P,x=s(0),b=Date.now(),w=(s(1)-x)/P,T=n.duration?1e3*n.duration:1e3*w*.8;return this._moveStart(!0),d.call(this),this;},flyToBounds:function flyToBounds(t,e){var i=this._getBoundsCenterZoom(t,e);return this.flyTo(i.center,i.zoom,e);}}),o.Map.include({_defaultLocateOptions:{timeout:1e4,watch:!1},locate:function locate(t){if(t=this._locateOptions=o.extend({},this._defaultLocateOptions,t),!("geolocation"in navigator))return this._handleGeolocationError({code:0,message:"Geolocation not supported."}),this;var e=o.bind(this._handleGeolocationResponse,this),i=o.bind(this._handleGeolocationError,this);return t.watch?this._locationWatchId=navigator.geolocation.watchPosition(e,i,t):navigator.geolocation.getCurrentPosition(e,i,t),this;},stopLocate:function stopLocate(){return navigator.geolocation&&navigator.geolocation.clearWatch&&navigator.geolocation.clearWatch(this._locationWatchId),this._locateOptions&&(this._locateOptions.setView=!1),this;},_handleGeolocationError:function _handleGeolocationError(t){var e=t.code,i=t.message||(1===e?"permission denied":2===e?"position unavailable":"timeout");this._locateOptions.setView&&!this._loaded&&this.fitWorld(),this.fire("locationerror",{code:e,message:"Geolocation error: "+i+"."});},_handleGeolocationResponse:function _handleGeolocationResponse(t){var e=t.coords.latitude,i=t.coords.longitude,n=new o.LatLng(e,i),s=n.toBounds(t.coords.accuracy),r=this._locateOptions;if(r.setView){var a=this.getBoundsZoom(s);this.setView(n,r.maxZoom?Math.min(a,r.maxZoom):a);}var h={latlng:n,bounds:s,timestamp:t.timestamp};for(var l in t.coords){"number"==typeof t.coords[l]&&(h[l]=t.coords[l]);}this.fire("locationfound",h);}});}(window,document);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8)(module)))

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(10), __esModule: true };

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(11);
	var $Object = __webpack_require__(14).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(12)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(27)});

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(13)
	  , core      = __webpack_require__(14)
	  , ctx       = __webpack_require__(15)
	  , hide      = __webpack_require__(17)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 13 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 14 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(16);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 16 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(18)
	  , createDesc = __webpack_require__(26);
	module.exports = __webpack_require__(22) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(19)
	  , IE8_DOM_DEFINE = __webpack_require__(21)
	  , toPrimitive    = __webpack_require__(25)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(22) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(20);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(22) && !__webpack_require__(23)(function(){
	  return Object.defineProperty(__webpack_require__(24)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(23)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 23 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(20)
	  , document = __webpack_require__(13).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(20);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(19)
	  , dPs         = __webpack_require__(28)
	  , enumBugKeys = __webpack_require__(43)
	  , IE_PROTO    = __webpack_require__(40)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(24)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(44).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(18)
	  , anObject = __webpack_require__(19)
	  , getKeys  = __webpack_require__(29);

	module.exports = __webpack_require__(22) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(30)
	  , enumBugKeys = __webpack_require__(43);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(31)
	  , toIObject    = __webpack_require__(32)
	  , arrayIndexOf = __webpack_require__(36)(false)
	  , IE_PROTO     = __webpack_require__(40)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(33)
	  , defined = __webpack_require__(35);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(34);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(32)
	  , toLength  = __webpack_require__(37)
	  , toIndex   = __webpack_require__(39);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(38)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(38)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(41)('keys')
	  , uid    = __webpack_require__(42);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(13)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(13).document && document.documentElement;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(46);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(64);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(47), __esModule: true };

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(48);
	__webpack_require__(59);
	module.exports = __webpack_require__(63).f('iterator');

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(49)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(50)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(38)
	  , defined   = __webpack_require__(35);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(51)
	  , $export        = __webpack_require__(12)
	  , redefine       = __webpack_require__(52)
	  , hide           = __webpack_require__(17)
	  , has            = __webpack_require__(31)
	  , Iterators      = __webpack_require__(53)
	  , $iterCreate    = __webpack_require__(54)
	  , setToStringTag = __webpack_require__(55)
	  , getPrototypeOf = __webpack_require__(57)
	  , ITERATOR       = __webpack_require__(56)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';

	var returnThis = function(){ return this; };

	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 51 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(17);

/***/ },
/* 53 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(27)
	  , descriptor     = __webpack_require__(26)
	  , setToStringTag = __webpack_require__(55)
	  , IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(17)(IteratorPrototype, __webpack_require__(56)('iterator'), function(){ return this; });

	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(18).f
	  , has = __webpack_require__(31)
	  , TAG = __webpack_require__(56)('toStringTag');

	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(41)('wks')
	  , uid        = __webpack_require__(42)
	  , Symbol     = __webpack_require__(13).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(31)
	  , toObject    = __webpack_require__(58)
	  , IE_PROTO    = __webpack_require__(40)('IE_PROTO')
	  , ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(35);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(60);
	var global        = __webpack_require__(13)
	  , hide          = __webpack_require__(17)
	  , Iterators     = __webpack_require__(53)
	  , TO_STRING_TAG = __webpack_require__(56)('toStringTag');

	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(61)
	  , step             = __webpack_require__(62)
	  , Iterators        = __webpack_require__(53)
	  , toIObject        = __webpack_require__(32);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(50)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 61 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 62 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(56);

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(65), __esModule: true };

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(66);
	__webpack_require__(77);
	__webpack_require__(78);
	__webpack_require__(79);
	module.exports = __webpack_require__(14).Symbol;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(13)
	  , has            = __webpack_require__(31)
	  , DESCRIPTORS    = __webpack_require__(22)
	  , $export        = __webpack_require__(12)
	  , redefine       = __webpack_require__(52)
	  , META           = __webpack_require__(67).KEY
	  , $fails         = __webpack_require__(23)
	  , shared         = __webpack_require__(41)
	  , setToStringTag = __webpack_require__(55)
	  , uid            = __webpack_require__(42)
	  , wks            = __webpack_require__(56)
	  , wksExt         = __webpack_require__(63)
	  , wksDefine      = __webpack_require__(68)
	  , keyOf          = __webpack_require__(69)
	  , enumKeys       = __webpack_require__(70)
	  , isArray        = __webpack_require__(73)
	  , anObject       = __webpack_require__(19)
	  , toIObject      = __webpack_require__(32)
	  , toPrimitive    = __webpack_require__(25)
	  , createDesc     = __webpack_require__(26)
	  , _create        = __webpack_require__(27)
	  , gOPNExt        = __webpack_require__(74)
	  , $GOPD          = __webpack_require__(76)
	  , $DP            = __webpack_require__(18)
	  , $keys          = __webpack_require__(29)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(75).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(72).f  = $propertyIsEnumerable;
	  __webpack_require__(71).f = $getOwnPropertySymbols;

	  if(DESCRIPTORS && !__webpack_require__(51)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(17)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(42)('meta')
	  , isObject = __webpack_require__(20)
	  , has      = __webpack_require__(31)
	  , setDesc  = __webpack_require__(18).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(23)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(13)
	  , core           = __webpack_require__(14)
	  , LIBRARY        = __webpack_require__(51)
	  , wksExt         = __webpack_require__(63)
	  , defineProperty = __webpack_require__(18).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(29)
	  , toIObject = __webpack_require__(32);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(29)
	  , gOPS    = __webpack_require__(71)
	  , pIE     = __webpack_require__(72);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 71 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 72 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(34);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(32)
	  , gOPN      = __webpack_require__(75).f
	  , toString  = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(30)
	  , hiddenKeys = __webpack_require__(43).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(72)
	  , createDesc     = __webpack_require__(26)
	  , toIObject      = __webpack_require__(32)
	  , toPrimitive    = __webpack_require__(25)
	  , has            = __webpack_require__(31)
	  , IE8_DOM_DEFINE = __webpack_require__(21)
	  , gOPD           = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(22) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 77 */
/***/ function(module, exports) {

	

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(68)('asyncIterator');

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(68)('observable');

/***/ },
/* 80 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 81 */
/***/ function(module, exports) {

	module.exports = {
		"type": "FeatureCollection",
		"crs": {
			"type": "name",
			"properties": {
				"name": "urn:ogc:def:crs:OGC:1.3:CRS84"
			}
		},
		"features": [
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								22.676577642938735,
								46.40583710251024
							],
							[
								22.699314458676728,
								46.365554727499664
							],
							[
								22.7278157033263,
								46.363633383653024
							],
							[
								22.74871836946989,
								46.351218992815376
							],
							[
								22.72851044297043,
								46.33586552279635
							],
							[
								22.676634619523508,
								46.318415135777094
							],
							[
								22.68263660439918,
								46.309660952454195
							],
							[
								22.6554120104461,
								46.257598870317246
							],
							[
								22.656889924137335,
								46.23543707438338
							],
							[
								22.61104041299876,
								46.21919647624527
							],
							[
								22.583773320678336,
								46.23349089686364
							],
							[
								22.548547788994185,
								46.225477546548
							],
							[
								22.505117934637287,
								46.22776491442765
							],
							[
								22.4914050739383,
								46.24215093096499
							],
							[
								22.436799956262572,
								46.20795691809218
							],
							[
								22.448618275399085,
								46.192764695098646
							],
							[
								22.453115060226942,
								46.163058607153836
							],
							[
								22.467168085722374,
								46.14571607547109
							],
							[
								22.445433766301747,
								46.115920341471146
							],
							[
								22.405165401164876,
								46.09511328397118
							],
							[
								22.428492362903455,
								46.07891844954893
							],
							[
								22.435244456362096,
								46.01664075924641
							],
							[
								22.384822411884826,
								45.995992261475685
							],
							[
								22.350195612429538,
								45.99841937819173
							],
							[
								22.352797332227695,
								45.972697507016996
							],
							[
								22.322646098485226,
								45.971812022874005
							],
							[
								22.30233911565059,
								45.93203837510986
							],
							[
								22.26485160446387,
								45.93490192075303
							],
							[
								22.24531669710978,
								45.924893717749754
							],
							[
								22.24849391125975,
								45.905433875532175
							],
							[
								22.221455338480745,
								45.90317084314223
							],
							[
								22.202667978720275,
								45.92174053121637
							],
							[
								22.17388349288685,
								45.92848148484564
							],
							[
								22.13525304449748,
								45.92289042084352
							],
							[
								22.128348423036662,
								45.933470110682734
							],
							[
								22.069927515281368,
								45.959134502187226
							],
							[
								22.009181172858163,
								45.970902045901674
							],
							[
								21.9674736004434,
								45.99435587465287
							],
							[
								21.93735623704182,
								45.98785073559753
							],
							[
								21.901080578466047,
								45.95506217461908
							],
							[
								21.87243995599814,
								45.95867334999015
							],
							[
								21.85137033131324,
								45.94720582177451
							],
							[
								21.817913561685238,
								45.95289838437471
							],
							[
								21.801124666703796,
								45.94344680055992
							],
							[
								21.799440293346922,
								45.92528023470072
							],
							[
								21.76971878985381,
								45.916895400911095
							],
							[
								21.76257308191647,
								45.95645538910455
							],
							[
								21.742500958342312,
								45.97827459275078
							],
							[
								21.70365541534735,
								45.94468238991256
							],
							[
								21.69242935913294,
								45.91634305012079
							],
							[
								21.667685160437898,
								45.925857216774006
							],
							[
								21.64838533258308,
								45.94752155114594
							],
							[
								21.64193410382502,
								45.9740146759078
							],
							[
								21.591843917401835,
								45.99460783444352
							],
							[
								21.52424023850637,
								46.010334047436785
							],
							[
								21.536307550967834,
								46.03302687732754
							],
							[
								21.516024912200876,
								46.06751394217232
							],
							[
								21.47720582735608,
								46.063142289436264
							],
							[
								21.433702234566802,
								46.04421627881596
							],
							[
								21.449605879093795,
								46.029256641058375
							],
							[
								21.421342728345415,
								46.01154801006239
							],
							[
								21.360660982284408,
								45.99544400259466
							],
							[
								21.33637040551396,
								46.007451487065005
							],
							[
								21.284620339930015,
								46.020137611741156
							],
							[
								21.26215884395179,
								45.99495354019418
							],
							[
								21.238275208257335,
								45.98641032840168
							],
							[
								21.23812453492064,
								45.97153309699959
							],
							[
								21.19239162994044,
								45.98458848929426
							],
							[
								21.172047770030105,
								45.998745740543036
							],
							[
								21.1255255779182,
								45.97704161902921
							],
							[
								21.110211893504985,
								45.97707728472605
							],
							[
								21.074453561533783,
								46.012558923022404
							],
							[
								21.06874445113609,
								46.03977370410718
							],
							[
								21.049982705957557,
								46.036394939915425
							],
							[
								20.940656444603587,
								46.037490782149234
							],
							[
								20.911176288111538,
								46.072759818194996
							],
							[
								20.889072566996777,
								46.084199714025274
							],
							[
								20.83298856880399,
								46.09056464297134
							],
							[
								20.781731401761142,
								46.125641438407136
							],
							[
								20.77274517377006,
								46.14454024362428
							],
							[
								20.71862344855249,
								46.148636816101664
							],
							[
								20.705315587804588,
								46.16134859942518
							],
							[
								20.713954781055374,
								46.16593378815207
							],
							[
								20.727366846615315,
								46.207414088501416
							],
							[
								20.76185517468496,
								46.204445126722426
							],
							[
								20.74884097468919,
								46.250623683084314
							],
							[
								20.775590644097743,
								46.2759105307038
							],
							[
								20.789233434379724,
								46.27308361539366
							],
							[
								20.873404877838702,
								46.287419280242965
							],
							[
								20.89054976758777,
								46.27137681112473
							],
							[
								20.922223103210708,
								46.261763941107304
							],
							[
								20.952498080702675,
								46.26484236249873
							],
							[
								20.990353508565693,
								46.25953251101689
							],
							[
								21.02496128207849,
								46.266495050312756
							],
							[
								21.036671852294816,
								46.247884587947524
							],
							[
								21.06600961950352,
								46.24275765105638
							],
							[
								21.103161386052886,
								46.262591526675465
							],
							[
								21.11553668964118,
								46.30163279821207
							],
							[
								21.145373129320895,
								46.304694378976166
							],
							[
								21.170044051017925,
								46.298040855030344
							],
							[
								21.1761626167322,
								46.33556261989556
							],
							[
								21.199464022094443,
								46.347907654397744
							],
							[
								21.196489724636198,
								46.370837018676546
							],
							[
								21.20629459507669,
								46.40323183575286
							],
							[
								21.225355082034344,
								46.41352800540299
							],
							[
								21.27539874758602,
								46.406686149913504
							],
							[
								21.28953803534502,
								46.41350992872952
							],
							[
								21.317385695801292,
								46.45093991300234
							],
							[
								21.29632521250172,
								46.476115745085714
							],
							[
								21.274335262412723,
								46.476477825516675
							],
							[
								21.260391748140997,
								46.50194670526391
							],
							[
								21.280386148984963,
								46.54495315358434
							],
							[
								21.32072153128249,
								46.58278978870355
							],
							[
								21.301164160611215,
								46.5907722349799
							],
							[
								21.3298822310713,
								46.6315684807522
							],
							[
								21.409313029089912,
								46.6220988834256
							],
							[
								21.41642105344409,
								46.64251045391189
							],
							[
								21.44148168466745,
								46.651444971768434
							],
							[
								21.51016974584499,
								46.65384801487607
							],
							[
								21.511531610724962,
								46.63661818001945
							],
							[
								21.560413609155717,
								46.619541986490496
							],
							[
								21.571712685619556,
								46.650191888611104
							],
							[
								21.609748125873377,
								46.64490343732257
							],
							[
								21.652027609922186,
								46.66272383579283
							],
							[
								21.688712106421836,
								46.66512350440425
							],
							[
								21.706751040933277,
								46.65857844576361
							],
							[
								21.755247262599365,
								46.66329420509594
							],
							[
								21.783740452403503,
								46.65413985888778
							],
							[
								21.80961938532603,
								46.65594793514948
							],
							[
								21.869332092018624,
								46.68087594981906
							],
							[
								21.91048501800997,
								46.66295277953854
							],
							[
								21.88134917628729,
								46.631153851994284
							],
							[
								21.910807340623236,
								46.630470047470844
							],
							[
								21.95223132832461,
								46.617081689403115
							],
							[
								21.998913129360325,
								46.62410609146038
							],
							[
								22.02835877935145,
								46.64475657523628
							],
							[
								22.08897351830031,
								46.629513703249614
							],
							[
								22.094119199070352,
								46.61427959312319
							],
							[
								22.116681536281817,
								46.602724038396275
							],
							[
								22.168399366331936,
								46.60387425555084
							],
							[
								22.16445456360098,
								46.57119908920931
							],
							[
								22.17550148315702,
								46.53640515263726
							],
							[
								22.203294480546866,
								46.51196842093934
							],
							[
								22.218039168910593,
								46.521171875558395
							],
							[
								22.24639973905152,
								46.502368705904736
							],
							[
								22.272402203352314,
								46.500806752861216
							],
							[
								22.3148584218311,
								46.51509217809023
							],
							[
								22.346685278013098,
								46.45325903047291
							],
							[
								22.37725268397137,
								46.42436986844528
							],
							[
								22.42413976884695,
								46.393331717645594
							],
							[
								22.452442075967927,
								46.385048894759436
							],
							[
								22.518483055260873,
								46.38700485086227
							],
							[
								22.573839780437307,
								46.39778159367601
							],
							[
								22.63457420491506,
								46.38970879547293
							],
							[
								22.676577642938735,
								46.40583710251024
							]
						]
					]
				},
				"properties": {
					"countyId": 2,
					"countyCode": 29,
					"name": "Arad",
					"mnemonic": "AR",
					"regionId": 5,
					"region": "Vest",
					"pop1948": 476207,
					"pop1956": 475620,
					"pop1966": 481248,
					"pop1977": 512020,
					"pop1992": 487617,
					"pop2002": 461791,
					"pop2011": 430629,
					"sortCode": 2,
					"version": "2016/03/10",
					"density": "56"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								25.321583850308116,
								45.381103324187976
							],
							[
								25.32432046398042,
								45.34495853279793
							],
							[
								25.305382058560568,
								45.29249012997998
							],
							[
								25.280980326645082,
								45.27127282627158
							],
							[
								25.293713522005913,
								45.232095425845515
							],
							[
								25.269960361596397,
								45.21365560201059
							],
							[
								25.24772734082353,
								45.210929242738516
							],
							[
								25.251670447481086,
								45.18091539651568
							],
							[
								25.20711685531367,
								45.16338323051579
							],
							[
								25.170664896752058,
								45.20116556876139
							],
							[
								25.154605386863363,
								45.203535245143776
							],
							[
								25.153313822544046,
								45.156581220669224
							],
							[
								25.146642636859525,
								45.12914431108109
							],
							[
								25.176171550599797,
								45.1074330612488
							],
							[
								25.169219942498106,
								45.08049725098508
							],
							[
								25.142215424153715,
								45.08420248700836
							],
							[
								25.128194188781336,
								45.06192096549821
							],
							[
								25.172028393970518,
								45.04051149429087
							],
							[
								25.196872946866893,
								45.018573337792496
							],
							[
								25.195599157795844,
								44.99030302245688
							],
							[
								25.16905035235547,
								44.97246005397464
							],
							[
								25.167401750808665,
								44.92227204762632
							],
							[
								25.197555714150955,
								44.90329238939889
							],
							[
								25.190753677963954,
								44.881743413919125
							],
							[
								25.203757954515744,
								44.85753186277204
							],
							[
								25.189109161291917,
								44.828270074477906
							],
							[
								25.211145552471827,
								44.765238054591684
							],
							[
								25.184641538775384,
								44.71582160544896
							],
							[
								25.237274433159595,
								44.69476728805891
							],
							[
								25.196615290527376,
								44.66614955848416
							],
							[
								25.16843738144514,
								44.66171953792483
							],
							[
								25.204949551854572,
								44.63271925194746
							],
							[
								25.2112112104226,
								44.61593505968001
							],
							[
								25.241498141924758,
								44.578003852182114
							],
							[
								25.292588194416204,
								44.55145880949351
							],
							[
								25.26564198287573,
								44.507137982891145
							],
							[
								25.28002782691232,
								44.47486495548656
							],
							[
								25.258231521211407,
								44.44128172286461
							],
							[
								25.234758371174074,
								44.424265681954054
							],
							[
								25.20293863605529,
								44.456463050119126
							],
							[
								25.11119409041631,
								44.41589481296344
							],
							[
								25.094542366370217,
								44.414864143348915
							],
							[
								25.065126334536384,
								44.39733256426932
							],
							[
								25.04625781716486,
								44.397325967752856
							],
							[
								25.010536103118927,
								44.410858069150635
							],
							[
								24.97642523822657,
								44.38274464624789
							],
							[
								24.96103627864244,
								44.379204592644776
							],
							[
								24.884028050230718,
								44.382649752126696
							],
							[
								24.880793022633892,
								44.394193867050134
							],
							[
								24.75455927949334,
								44.391371334646976
							],
							[
								24.751996576776925,
								44.42471944490305
							],
							[
								24.7560230384962,
								44.46505408364608
							],
							[
								24.7340058802424,
								44.46521933371284
							],
							[
								24.727405211206392,
								44.492389066000776
							],
							[
								24.731546297138927,
								44.52226659564864
							],
							[
								24.742583543142345,
								44.537848900576506
							],
							[
								24.72865748123594,
								44.57207319827669
							],
							[
								24.710647412123276,
								44.58240620028567
							],
							[
								24.712358052345664,
								44.62288960356647
							],
							[
								24.691150817876217,
								44.69554072119833
							],
							[
								24.715933339602294,
								44.71826278953619
							],
							[
								24.683399235961033,
								44.73763784558163
							],
							[
								24.631357343621968,
								44.73289391324044
							],
							[
								24.606940949777297,
								44.75382743021994
							],
							[
								24.594637409127962,
								44.75100494389761
							],
							[
								24.588569847906975,
								44.798166075150355
							],
							[
								24.555076663574265,
								44.83411249286347
							],
							[
								24.54253824440775,
								44.861392641463354
							],
							[
								24.54072933905728,
								44.8910527018616
							],
							[
								24.513517670469298,
								44.87756633359079
							],
							[
								24.509409599792143,
								44.845508943178814
							],
							[
								24.480190393469965,
								44.821753904263126
							],
							[
								24.44711112005804,
								44.81404962036992
							],
							[
								24.42150753390198,
								44.82708248294049
							],
							[
								24.438128302078375,
								44.845388317670995
							],
							[
								24.463123323563117,
								44.8623535979631
							],
							[
								24.479865798687314,
								44.89921524039527
							],
							[
								24.470323039926345,
								44.924437884969166
							],
							[
								24.499750007223888,
								44.94543994762379
							],
							[
								24.479224311355168,
								44.963662226425456
							],
							[
								24.48108645401829,
								44.975906303015286
							],
							[
								24.508548855055235,
								44.99848257011702
							],
							[
								24.485185826200212,
								45.016529896366556
							],
							[
								24.51828208550215,
								45.040985671009004
							],
							[
								24.51200684216088,
								45.05503101344484
							],
							[
								24.48255733784753,
								45.06084185371922
							],
							[
								24.506917816476985,
								45.08452626308009
							],
							[
								24.518655948908815,
								45.135834138719574
							],
							[
								24.513300483204645,
								45.188937371673504
							],
							[
								24.48747732505253,
								45.196026904675975
							],
							[
								24.467876604146763,
								45.2318160464792
							],
							[
								24.491942595006602,
								45.277819102317935
							],
							[
								24.48124115278879,
								45.30266293757681
							],
							[
								24.491634823391674,
								45.32446456794492
							],
							[
								24.47346769553638,
								45.32996452179931
							],
							[
								24.472783616743758,
								45.35768786621907
							],
							[
								24.500456400013388,
								45.36314644476485
							],
							[
								24.4790349691125,
								45.437796906568025
							],
							[
								24.4855891278594,
								45.46260449038333
							],
							[
								24.511090780021245,
								45.46348227729785
							],
							[
								24.524848311966757,
								45.47503131835119
							],
							[
								24.527083570620185,
								45.4978901500792
							],
							[
								24.51621846489215,
								45.52248889039682
							],
							[
								24.540492594907665,
								45.535633780249455
							],
							[
								24.523137459570204,
								45.58057707199745
							],
							[
								24.5535115763557,
								45.587753618165046
							],
							[
								24.56589634060682,
								45.57915178896412
							],
							[
								24.596570055152597,
								45.59619983579335
							],
							[
								24.6423912746209,
								45.604078139282954
							],
							[
								24.671062204388846,
								45.59459156423673
							],
							[
								24.684930956153956,
								45.60412439036928
							],
							[
								24.77226000197983,
								45.611197742197156
							],
							[
								24.795789003039005,
								45.603187056210565
							],
							[
								24.829805426996792,
								45.606543585688954
							],
							[
								24.835956051657,
								45.592301401193545
							],
							[
								24.916600138313473,
								45.59457390599838
							],
							[
								24.94123925248487,
								45.58213316790295
							],
							[
								24.958121667173877,
								45.59271954631694
							],
							[
								25.013422916294015,
								45.58602127826969
							],
							[
								25.036099178792696,
								45.59265169135448
							],
							[
								25.081605884283093,
								45.58172507064718
							],
							[
								25.10321985628884,
								45.58520799148644
							],
							[
								25.14554141765704,
								45.55862557542553
							],
							[
								25.151658361446025,
								45.5457903015346
							],
							[
								25.188958088393385,
								45.52278556274022
							],
							[
								25.211633182579064,
								45.52688116032819
							],
							[
								25.24161487756123,
								45.499749034152735
							],
							[
								25.238347520413196,
								45.475531969297265
							],
							[
								25.275842877908552,
								45.44207147421438
							],
							[
								25.253436174378376,
								45.42883113022785
							],
							[
								25.272998828228463,
								45.40750785257158
							],
							[
								25.30161158140954,
								45.42239282821521
							],
							[
								25.321583850308116,
								45.381103324187976
							]
						]
					]
				},
				"properties": {
					"countyId": 3,
					"countyCode": 38,
					"name": "Argeș",
					"mnemonic": "AG",
					"regionId": 3,
					"region": "Sud",
					"pop1948": 448964,
					"pop1956": 483741,
					"pop1966": 529833,
					"pop1977": 631918,
					"pop1992": 681206,
					"pop2002": 652625,
					"pop2011": 612431,
					"sortCode": 3,
					"version": "2016/03/10",
					"density": "90"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								27.20622371456061,
								46.769865479435744
							],
							[
								27.2368937407952,
								46.74751156624954
							],
							[
								27.239330769995597,
								46.73534950314862
							],
							[
								27.326551448164874,
								46.69797819498487
							],
							[
								27.29435119741843,
								46.674265028557734
							],
							[
								27.31607846233723,
								46.6521329464575
							],
							[
								27.276384414748524,
								46.625477884698135
							],
							[
								27.3280104036034,
								46.58564126894054
							],
							[
								27.35221635807981,
								46.55103783486289
							],
							[
								27.419509407512468,
								46.43251561592549
							],
							[
								27.449698593387062,
								46.39841286994509
							],
							[
								27.458973804591192,
								46.360486952666754
							],
							[
								27.47609857136533,
								46.32994432010194
							],
							[
								27.45708000136216,
								46.32032060042307
							],
							[
								27.478896486402586,
								46.22068473931863
							],
							[
								27.506474939233655,
								46.219390274870314
							],
							[
								27.508654929126703,
								46.19326135955512
							],
							[
								27.49282516348875,
								46.159230086682385
							],
							[
								27.459147952987603,
								46.15743765948094
							],
							[
								27.44801367293355,
								46.18421944424078
							],
							[
								27.419758725723472,
								46.19383302817615
							],
							[
								27.387838962159837,
								46.193835777977235
							],
							[
								27.37440135747423,
								46.15739049041521
							],
							[
								27.35001227001537,
								46.15272234911914
							],
							[
								27.309387078578126,
								46.20542821471479
							],
							[
								27.2627101150883,
								46.20042655000087
							],
							[
								27.2698653951646,
								46.18322509500818
							],
							[
								27.23934671738975,
								46.17833258606819
							],
							[
								27.221662112024013,
								46.19136950077785
							],
							[
								27.130821364542797,
								46.14977292561068
							],
							[
								27.140093862862066,
								46.13419982933154
							],
							[
								27.122948257312405,
								46.10409680835856
							],
							[
								27.105174194003926,
								46.10502642196055
							],
							[
								27.073950275371132,
								46.087562366072866
							],
							[
								26.989989888444747,
								46.112974786526294
							],
							[
								26.96119286334433,
								46.108722133893075
							],
							[
								26.95287294208827,
								46.087268529232674
							],
							[
								26.92336782476473,
								46.06552052147228
							],
							[
								26.870118416938528,
								46.08514597375955
							],
							[
								26.805873656052462,
								46.06627381178035
							],
							[
								26.781004289805765,
								46.093734729799486
							],
							[
								26.762996552380734,
								46.08687446378085
							],
							[
								26.733400163783053,
								46.095415575383775
							],
							[
								26.704592964343515,
								46.093890475703574
							],
							[
								26.67085135655091,
								46.07710316016547
							],
							[
								26.65249225901883,
								46.079198076859306
							],
							[
								26.633958072092746,
								46.05748632340372
							],
							[
								26.586656519991248,
								46.04057465851679
							],
							[
								26.572465265510512,
								46.01686418820928
							],
							[
								26.535556884910182,
								46.0279207773596
							],
							[
								26.515631540192064,
								46.02692570083133
							],
							[
								26.49170577992081,
								46.04522554399214
							],
							[
								26.456062326992704,
								46.035187168734595
							],
							[
								26.439990584599737,
								46.03889233816706
							],
							[
								26.427572873725932,
								46.07564127982386
							],
							[
								26.36752688456143,
								46.11815273827246
							],
							[
								26.385746979171262,
								46.12874364673527
							],
							[
								26.386056480403603,
								46.145091207267946
							],
							[
								26.343011496972657,
								46.13771391567573
							],
							[
								26.347459643088314,
								46.16157534400196
							],
							[
								26.330559244658243,
								46.18314734794576
							],
							[
								26.341450853443934,
								46.20097911924801
							],
							[
								26.325782880811154,
								46.23073758324824
							],
							[
								26.284853862245665,
								46.24568662103763
							],
							[
								26.263444450566528,
								46.24635400864673
							],
							[
								26.253339652245977,
								46.27713745289876
							],
							[
								26.274351371249203,
								46.287356360374424
							],
							[
								26.292836135791205,
								46.334247114134996
							],
							[
								26.270895629587645,
								46.3449027669106
							],
							[
								26.23546643635725,
								46.33489198254802
							],
							[
								26.224419080339104,
								46.316642147395086
							],
							[
								26.200906954234284,
								46.310918495201534
							],
							[
								26.156619539381175,
								46.31505884645528
							],
							[
								26.149249206707488,
								46.32904368458065
							],
							[
								26.163520079424547,
								46.346348532039045
							],
							[
								26.16553681582069,
								46.38475571983866
							],
							[
								26.126595808863073,
								46.39759999073383
							],
							[
								26.061904805115514,
								46.40070636061689
							],
							[
								26.046891175561516,
								46.416585979592654
							],
							[
								26.01963936664192,
								46.409170742039635
							],
							[
								25.997142652553904,
								46.42007828326359
							],
							[
								25.987178714731908,
								46.4391205338298
							],
							[
								26.01694300167644,
								46.46193951245809
							],
							[
								26.00663829887974,
								46.48165388360459
							],
							[
								26.018017673683257,
								46.491874819154496
							],
							[
								26.05838935929734,
								46.49417246366973
							],
							[
								26.083211405045116,
								46.51247758770243
							],
							[
								26.07377946831125,
								46.5257378887643
							],
							[
								26.035058078479796,
								46.544655597411214
							],
							[
								26.03356448840838,
								46.57036315878899
							],
							[
								25.990463160850297,
								46.616114259151466
							],
							[
								26.007440450370822,
								46.63527731714176
							],
							[
								26.006455560613094,
								46.6597230689948
							],
							[
								25.981037215910153,
								46.68017270101333
							],
							[
								25.97516329372174,
								46.69732829496775
							],
							[
								26.01864427513662,
								46.70126133934678
							],
							[
								26.052821077308298,
								46.71681200849052
							],
							[
								26.067262339431938,
								46.71235481411501
							],
							[
								26.081513746230605,
								46.673309217257255
							],
							[
								26.079203614504856,
								46.65846838115379
							],
							[
								26.10073574065779,
								46.646934254695225
							],
							[
								26.127191871642378,
								46.65904004465235
							],
							[
								26.15945099712587,
								46.64172167972454
							],
							[
								26.216181575573213,
								46.65603159568074
							],
							[
								26.218353322761725,
								46.68013594211165
							],
							[
								26.265726146951522,
								46.70320644280246
							],
							[
								26.300993170563753,
								46.653435217886745
							],
							[
								26.390472157331356,
								46.651020682368916
							],
							[
								26.41047959830148,
								46.67858162893704
							],
							[
								26.43789015705052,
								46.685099383050115
							],
							[
								26.47110702844634,
								46.67728342329033
							],
							[
								26.506371512571427,
								46.694323560537555
							],
							[
								26.52996751850715,
								46.69235854261728
							],
							[
								26.54637807476307,
								46.6785185120036
							],
							[
								26.56993331209121,
								46.67870330866118
							],
							[
								26.60830922294417,
								46.711896587167224
							],
							[
								26.6473875747246,
								46.72291280435381
							],
							[
								26.66486259598439,
								46.73635810008082
							],
							[
								26.675952109303488,
								46.76770654414239
							],
							[
								26.707627689148048,
								46.77186427518906
							],
							[
								26.754279255132268,
								46.756216596028814
							],
							[
								26.758739272685734,
								46.736840931815294
							],
							[
								26.7863496444225,
								46.71691580311891
							],
							[
								26.84187843629865,
								46.751334334944744
							],
							[
								26.821577835977152,
								46.77318624259169
							],
							[
								26.849500451422507,
								46.77992771014393
							],
							[
								26.84950802349723,
								46.80468996396261
							],
							[
								26.909397159751588,
								46.82726034304867
							],
							[
								26.909332963791833,
								46.78528075983771
							],
							[
								26.94610150245589,
								46.77301057403828
							],
							[
								26.946493123147807,
								46.758305098011604
							],
							[
								27.045382513808082,
								46.77237299718898
							],
							[
								27.10209885463364,
								46.76882204011156
							],
							[
								27.11529532037496,
								46.74871997290464
							],
							[
								27.160521731802344,
								46.73435317678658
							],
							[
								27.16319826478078,
								46.749506849211734
							],
							[
								27.20622371456061,
								46.769865479435744
							]
						]
					]
				},
				"properties": {
					"countyId": 4,
					"countyCode": 47,
					"name": "Bacău",
					"mnemonic": "BC",
					"regionId": 1,
					"region": "Nord-Est",
					"pop1948": 414996,
					"pop1956": 507937,
					"pop1966": 598321,
					"pop1977": 667791,
					"pop1992": 737512,
					"pop2002": 706623,
					"pop2011": 616168,
					"sortCode": 4,
					"version": "2016/03/10",
					"density": "93"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								22.61267904880081,
								47.33475337688767
							],
							[
								22.549468156061856,
								47.29616387092826
							],
							[
								22.556628824557787,
								47.251186333218975
							],
							[
								22.539875565143728,
								47.23385400670403
							],
							[
								22.51679711380893,
								47.23269803727389
							],
							[
								22.511698514321534,
								47.19653262488682
							],
							[
								22.493553180004238,
								47.18525562754483
							],
							[
								22.508204921343864,
								47.16563356977282
							],
							[
								22.53306997867344,
								47.16626268069341
							],
							[
								22.548609276309342,
								47.149614428316845
							],
							[
								22.55357913936736,
								47.127396747675746
							],
							[
								22.520747545577365,
								47.10681413491406
							],
							[
								22.54522270158912,
								47.087942219465816
							],
							[
								22.568579779258055,
								47.08244613713108
							],
							[
								22.593292381968865,
								47.063833778846394
							],
							[
								22.667297227842365,
								47.05001621954821
							],
							[
								22.686779740281597,
								47.05134848452072
							],
							[
								22.708826289387208,
								47.011160649788316
							],
							[
								22.728178898734473,
								47.00750297820381
							],
							[
								22.675083220164428,
								46.970603248144016
							],
							[
								22.68083650510644,
								46.942058543165196
							],
							[
								22.717243918312295,
								46.93335380204336
							],
							[
								22.74860601840485,
								46.91198579564228
							],
							[
								22.77537245313539,
								46.91073921932678
							],
							[
								22.778899172807282,
								46.89691206046054
							],
							[
								22.75475683320044,
								46.87655778743301
							],
							[
								22.727188218921185,
								46.816597955376835
							],
							[
								22.704150828131898,
								46.80552813407665
							],
							[
								22.65795990660905,
								46.80513264229919
							],
							[
								22.63729440824054,
								46.799413113988585
							],
							[
								22.712500409624564,
								46.76329874873202
							],
							[
								22.715006974000495,
								46.73331212836452
							],
							[
								22.732661041446754,
								46.72398070070998
							],
							[
								22.745972076580397,
								46.694802273642345
							],
							[
								22.77099801095674,
								46.66636885509717
							],
							[
								22.773959876641182,
								46.65109011093077
							],
							[
								22.81466276875646,
								46.63300578401341
							],
							[
								22.801561667488183,
								46.61762643434053
							],
							[
								22.811952439692647,
								46.56887102413852
							],
							[
								22.752174401132446,
								46.5690508165278
							],
							[
								22.75129884383501,
								46.54915155830219
							],
							[
								22.726097108883145,
								46.54691586515918
							],
							[
								22.674717090600232,
								46.506572802784085
							],
							[
								22.677431811885953,
								46.468576933285945
							],
							[
								22.688214742348645,
								46.44160324249262
							],
							[
								22.71991372673011,
								46.43092219654449
							],
							[
								22.676577642938735,
								46.40583710251024
							],
							[
								22.63457420491506,
								46.38970879547293
							],
							[
								22.573839780437307,
								46.39778159367601
							],
							[
								22.518483055260873,
								46.38700485086227
							],
							[
								22.452442075967927,
								46.385048894759436
							],
							[
								22.42413976884695,
								46.393331717645594
							],
							[
								22.37725268397137,
								46.42436986844528
							],
							[
								22.346685278013098,
								46.45325903047291
							],
							[
								22.3148584218311,
								46.51509217809023
							],
							[
								22.272402203352314,
								46.500806752861216
							],
							[
								22.24639973905152,
								46.502368705904736
							],
							[
								22.218039168910593,
								46.521171875558395
							],
							[
								22.203294480546866,
								46.51196842093934
							],
							[
								22.17550148315702,
								46.53640515263726
							],
							[
								22.16445456360098,
								46.57119908920931
							],
							[
								22.168399366331936,
								46.60387425555084
							],
							[
								22.116681536281817,
								46.602724038396275
							],
							[
								22.094119199070352,
								46.61427959312319
							],
							[
								22.08897351830031,
								46.629513703249614
							],
							[
								22.02835877935145,
								46.64475657523628
							],
							[
								21.998913129360325,
								46.62410609146038
							],
							[
								21.95223132832461,
								46.617081689403115
							],
							[
								21.910807340623236,
								46.630470047470844
							],
							[
								21.88134917628729,
								46.631153851994284
							],
							[
								21.91048501800997,
								46.66295277953854
							],
							[
								21.869332092018624,
								46.68087594981906
							],
							[
								21.80961938532603,
								46.65594793514948
							],
							[
								21.783740452403503,
								46.65413985888778
							],
							[
								21.755247262599365,
								46.66329420509594
							],
							[
								21.706751040933277,
								46.65857844576361
							],
							[
								21.688712106421836,
								46.66512350440425
							],
							[
								21.652027609922186,
								46.66272383579283
							],
							[
								21.609748125873377,
								46.64490343732257
							],
							[
								21.571712685619556,
								46.650191888611104
							],
							[
								21.560413609155717,
								46.619541986490496
							],
							[
								21.511531610724962,
								46.63661818001945
							],
							[
								21.51016974584499,
								46.65384801487607
							],
							[
								21.44148168466745,
								46.651444971768434
							],
							[
								21.45471301744707,
								46.66082605313177
							],
							[
								21.431410507823394,
								46.67756334527003
							],
							[
								21.469632165178886,
								46.6954376654226
							],
							[
								21.490330749417012,
								46.685782332195
							],
							[
								21.511388345597595,
								46.711826841669904
							],
							[
								21.529338887706825,
								46.720767720593024
							],
							[
								21.526617243164104,
								46.73924603441036
							],
							[
								21.484097478278205,
								46.764879898733305
							],
							[
								21.509370579263727,
								46.783381878348074
							],
							[
								21.52171776369439,
								46.807914114746524
							],
							[
								21.51908298503529,
								46.83591763269286
							],
							[
								21.537937030241025,
								46.84741540647179
							],
							[
								21.595220398137595,
								46.86051106790952
							],
							[
								21.614209991729144,
								46.88651304972087
							],
							[
								21.59905875155521,
								46.90918289231641
							],
							[
								21.60619178476,
								46.93249739056408
							],
							[
								21.638360056662933,
								46.93292532640707
							],
							[
								21.660168470770216,
								46.955874053042145
							],
							[
								21.679354065039057,
								46.99797240730985
							],
							[
								21.648671535142068,
								47.0403365148682
							],
							[
								21.682766014096803,
								47.0457154143329
							],
							[
								21.726137035875176,
								47.098469963927606
							],
							[
								21.77237397083261,
								47.10898511707575
							],
							[
								21.7914184852999,
								47.12400609374264
							],
							[
								21.81737240043098,
								47.17274600299826
							],
							[
								21.85805594218845,
								47.187024869579034
							],
							[
								21.851633090768914,
								47.23912888048495
							],
							[
								21.888191406848076,
								47.27787352714152
							],
							[
								21.895288638606647,
								47.314801990618236
							],
							[
								21.923360880860518,
								47.344197209092044
							],
							[
								21.93851287949451,
								47.37295335931694
							],
							[
								21.96152666552254,
								47.381233402500186
							],
							[
								22.011978491194927,
								47.37579785038219
							],
							[
								22.034733677629678,
								47.411620371989976
							],
							[
								22.035405230558343,
								47.427438186431644
							],
							[
								22.00743309245358,
								47.47586932910674
							],
							[
								22.024062409187152,
								47.519867204425196
							],
							[
								22.079195438549014,
								47.56235147348205
							],
							[
								22.0906753404597,
								47.5574355437333
							],
							[
								22.11895195360235,
								47.57904465784643
							],
							[
								22.12920316235671,
								47.597219048205034
							],
							[
								22.171001937683137,
								47.59170103509163
							],
							[
								22.180824111089834,
								47.60009608292603
							],
							[
								22.207314926391028,
								47.59642727625675
							],
							[
								22.261638790250956,
								47.554904426867886
							],
							[
								22.255697434609814,
								47.53981174745989
							],
							[
								22.28538534848244,
								47.53492492428478
							],
							[
								22.28836875856848,
								47.50646836679367
							],
							[
								22.340560315840676,
								47.49005334550441
							],
							[
								22.341039597000453,
								47.4556343546361
							],
							[
								22.36262010996909,
								47.4275683573183
							],
							[
								22.45932760188517,
								47.431928807760144
							],
							[
								22.52938450691172,
								47.4186110547771
							],
							[
								22.533752640195445,
								47.39905755226644
							],
							[
								22.566004743317365,
								47.391856250187715
							],
							[
								22.575409667199228,
								47.36180262516684
							],
							[
								22.61267904880081,
								47.33475337688767
							]
						]
					]
				},
				"properties": {
					"countyId": 5,
					"countyCode": 56,
					"name": "Bihor",
					"mnemonic": "BH",
					"regionId": 6,
					"region": "Nord-Vest",
					"pop1948": 536323,
					"pop1956": 574488,
					"pop1966": 586460,
					"pop1977": 633094,
					"pop1992": 638863,
					"pop2002": 600246,
					"pop2011": 575398,
					"sortCode": 5,
					"version": "2016/03/10",
					"density": "76"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								24.960837896040648,
								47.59686576371186
							],
							[
								24.990190415696542,
								47.58567522931841
							],
							[
								25.00777239412253,
								47.5688391873301
							],
							[
								25.05195091689917,
								47.56045534299169
							],
							[
								25.060995129549603,
								47.53695187168258
							],
							[
								25.095034870005684,
								47.51585493877392
							],
							[
								25.093785286634862,
								47.50397608785955
							],
							[
								25.05209651588981,
								47.48079663844403
							],
							[
								25.077943436425887,
								47.43845302878071
							],
							[
								25.052370305320082,
								47.431018940108856
							],
							[
								25.014640787501406,
								47.43343296972819
							],
							[
								25.003398592133767,
								47.413134087727755
							],
							[
								25.050601286718504,
								47.37749811910603
							],
							[
								25.07321892911262,
								47.34151721247958
							],
							[
								25.078663307238887,
								47.31496498295744
							],
							[
								25.047633262522833,
								47.30373695981437
							],
							[
								25.02806330484703,
								47.28679816105269
							],
							[
								25.07958846777046,
								47.25864017344663
							],
							[
								25.044263296181377,
								47.21609116532881
							],
							[
								25.059079118083126,
								47.19912674267301
							],
							[
								25.06668636727913,
								47.16501452278014
							],
							[
								25.063384744406402,
								47.1365532575269
							],
							[
								25.018862812439842,
								47.112366003034104
							],
							[
								24.949396257458577,
								47.117570739229855
							],
							[
								24.93244533713674,
								47.09619680839667
							],
							[
								24.89864560741659,
								47.10854425937971
							],
							[
								24.870211374147196,
								47.10485591955543
							],
							[
								24.79465104995303,
								47.05096644196248
							],
							[
								24.776946217119953,
								47.01346281415124
							],
							[
								24.74300450029316,
								46.98594643954009
							],
							[
								24.74112212942085,
								46.953472708085336
							],
							[
								24.72171021392454,
								46.93238822470713
							],
							[
								24.754297536084895,
								46.90972796353313
							],
							[
								24.70907459735482,
								46.90205880757614
							],
							[
								24.662155608404312,
								46.910133156491156
							],
							[
								24.63995444332575,
								46.92545692513445
							],
							[
								24.638671465580384,
								46.94522448870572
							],
							[
								24.593906349409153,
								46.94489588010497
							],
							[
								24.58545833559933,
								46.92881822173734
							],
							[
								24.540202441074772,
								46.89160100076372
							],
							[
								24.524368290402748,
								46.852591283159775
							],
							[
								24.50987953997326,
								46.85038158067542
							],
							[
								24.458330325487935,
								46.820150391802066
							],
							[
								24.449372742995838,
								46.789965101058556
							],
							[
								24.472250909891105,
								46.78304530849962
							],
							[
								24.450326919068537,
								46.7657393159899
							],
							[
								24.40924729894434,
								46.772121164968254
							],
							[
								24.397432542017306,
								46.75188959572784
							],
							[
								24.36208768006033,
								46.746351761923265
							],
							[
								24.339563037495193,
								46.75767175390674
							],
							[
								24.301146758165178,
								46.75315266254003
							],
							[
								24.21478166799211,
								46.782147611501614
							],
							[
								24.179577719104305,
								46.804709993658285
							],
							[
								24.20953942239326,
								46.83737502617964
							],
							[
								24.200293356056147,
								46.85282781769256
							],
							[
								24.21912870344794,
								46.87395204260682
							],
							[
								24.21403566376123,
								46.9077911325761
							],
							[
								24.185340178405884,
								46.92893227887549
							],
							[
								24.16044683271485,
								46.935670490855074
							],
							[
								24.17036048315208,
								46.95815177293706
							],
							[
								24.132636180158826,
								46.96597297766243
							],
							[
								24.10806815020663,
								46.9852700219081
							],
							[
								24.10576553122791,
								47.02509131623686
							],
							[
								24.118354811737365,
								47.0577100007525
							],
							[
								24.134242352979562,
								47.074071261865086
							],
							[
								24.119473623329586,
								47.10699978092485
							],
							[
								24.096514753111602,
								47.12700540758123
							],
							[
								24.064675323890462,
								47.13118654727067
							],
							[
								24.014881893773136,
								47.147811070670166
							],
							[
								24.028357333010177,
								47.1643338804744
							],
							[
								24.015568241208904,
								47.178636384388284
							],
							[
								23.97238613661913,
								47.166951378847
							],
							[
								23.950360999963742,
								47.178592774257524
							],
							[
								23.936031050479883,
								47.19929257740959
							],
							[
								23.919494374870798,
								47.252466190069654
							],
							[
								23.92736265954752,
								47.29635414439538
							],
							[
								23.95344993291493,
								47.315751238348604
							],
							[
								23.98209993770047,
								47.321297816811686
							],
							[
								24.00624683595254,
								47.310913762220764
							],
							[
								24.027537171777272,
								47.32185919056877
							],
							[
								24.01779937794963,
								47.34454312297166
							],
							[
								24.022715220964812,
								47.361961802632024
							],
							[
								24.059469535227446,
								47.37765481543882
							],
							[
								24.08570186720465,
								47.417521729813714
							],
							[
								24.119220754731934,
								47.43765910726095
							],
							[
								24.12881624210514,
								47.46566767458086
							],
							[
								24.11855944429664,
								47.47956858458913
							],
							[
								24.15360563708509,
								47.50285975897782
							],
							[
								24.182014621548415,
								47.50718837209538
							],
							[
								24.235491198401466,
								47.49990203121407
							],
							[
								24.27781846081517,
								47.54098002285943
							],
							[
								24.301943606589713,
								47.55822406211067
							],
							[
								24.306580158354475,
								47.57893206625084
							],
							[
								24.34270178445098,
								47.5653727311879
							],
							[
								24.391372464671093,
								47.604461797500406
							],
							[
								24.438208829177917,
								47.59064322275105
							],
							[
								24.46048292664628,
								47.59214574217034
							],
							[
								24.55704210821182,
								47.5713756895417
							],
							[
								24.60452235886127,
								47.568624554178825
							],
							[
								24.63188551050486,
								47.57581780087462
							],
							[
								24.65204937074773,
								47.558198900030156
							],
							[
								24.691230309843515,
								47.55854678735935
							],
							[
								24.715288141217787,
								47.57253962598978
							],
							[
								24.771143939094465,
								47.57204635540275
							],
							[
								24.807242651796557,
								47.56666778225728
							],
							[
								24.82273822399185,
								47.5945065946365
							],
							[
								24.855863137716792,
								47.59244202364908
							],
							[
								24.903532535719997,
								47.6027363534942
							],
							[
								24.960837896040648,
								47.59686576371186
							]
						]
					]
				},
				"properties": {
					"countyId": 6,
					"countyCode": 65,
					"name": "Bistrița-Năsăud",
					"mnemonic": "BN",
					"regionId": 6,
					"region": "Nord-Vest",
					"pop1948": 233650,
					"pop1956": 255789,
					"pop1966": 269954,
					"pop1977": 286628,
					"pop1992": 326820,
					"pop2002": 311657,
					"pop2011": 286225,
					"sortCode": 6,
					"version": "2016/03/10",
					"density": "53"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								27.39136585958241,
								47.58948461395424
							],
							[
								27.34623841368871,
								47.575110712778184
							],
							[
								27.311866090677086,
								47.577184379097375
							],
							[
								27.294932206628435,
								47.56695699984235
							],
							[
								27.263567987835135,
								47.57119862681997
							],
							[
								27.246403177384472,
								47.54250423560588
							],
							[
								27.25907749166169,
								47.52906913731958
							],
							[
								27.203744595099934,
								47.51902055741152
							],
							[
								27.168868268806204,
								47.52379944451406
							],
							[
								27.144460821300875,
								47.541734270977464
							],
							[
								27.100019285736728,
								47.547919247397296
							],
							[
								27.075438352256402,
								47.51402715656045
							],
							[
								27.0822338123854,
								47.464383993729065
							],
							[
								27.064705527206893,
								47.46189800996078
							],
							[
								27.041882326966636,
								47.43825701620767
							],
							[
								27.009549872823165,
								47.478269384911506
							],
							[
								26.990515232333994,
								47.49256223756926
							],
							[
								26.940881652620053,
								47.49699164379279
							],
							[
								26.929912007514275,
								47.4922874403326
							],
							[
								26.8472984204592,
								47.49523851617178
							],
							[
								26.81778109988524,
								47.50801176330444
							],
							[
								26.787888880712117,
								47.49986299947287
							],
							[
								26.753578084757212,
								47.50302803446295
							],
							[
								26.718767205809776,
								47.515279488577235
							],
							[
								26.698668735290422,
								47.50914893593186
							],
							[
								26.726826018345108,
								47.47288396567185
							],
							[
								26.700574445623594,
								47.47172917421831
							],
							[
								26.62250323377593,
								47.467405814575066
							],
							[
								26.59893061977364,
								47.459718003236475
							],
							[
								26.59011149927847,
								47.48756219488485
							],
							[
								26.554450978316954,
								47.50975284914362
							],
							[
								26.60482127875741,
								47.52062177869803
							],
							[
								26.563089547824635,
								47.55617909397634
							],
							[
								26.536096655005544,
								47.61941707953789
							],
							[
								26.536138736651594,
								47.64862817194948
							],
							[
								26.508990800461927,
								47.65216387915149
							],
							[
								26.446049029543786,
								47.73357916202503
							],
							[
								26.405851170952214,
								47.753361255298316
							],
							[
								26.40463238482868,
								47.777909076308376
							],
							[
								26.37557462417055,
								47.77367382885187
							],
							[
								26.354324376964744,
								47.78441776388933
							],
							[
								26.3184260343563,
								47.81461292634589
							],
							[
								26.302570415105794,
								47.855567396608805
							],
							[
								26.28249064348287,
								47.85631134895617
							],
							[
								26.26075566651464,
								47.884721353060506
							],
							[
								26.232793498643826,
								47.896474126334816
							],
							[
								26.183424946733826,
								47.89333583620348
							],
							[
								26.18276065768491,
								47.92074433766527
							],
							[
								26.147785978591305,
								47.92431194558421
							],
							[
								26.123844065834867,
								47.93596402667218
							],
							[
								26.11951259461689,
								47.97229622087467
							],
							[
								26.098815609394112,
								47.97881575642891
							],
							[
								26.18804162208586,
								47.99548113326442
							],
							[
								26.199178700640626,
								48.008020397509334
							],
							[
								26.212093951455522,
								48.05078206646583
							],
							[
								26.26685179898776,
								48.076507181640366
							],
							[
								26.29798771691695,
								48.133686345877734
							],
							[
								26.334221707263776,
								48.15940268572987
							],
							[
								26.327837954513434,
								48.1762159302756
							],
							[
								26.377816581560836,
								48.198724384226416
							],
							[
								26.400870067580076,
								48.18878018785107
							],
							[
								26.456731587585338,
								48.213706201955574
							],
							[
								26.4944728108943,
								48.21836545695589
							],
							[
								26.5300599791198,
								48.209977149569
							],
							[
								26.569899486819995,
								48.219443269093404
							],
							[
								26.571308733085623,
								48.23831151095855
							],
							[
								26.620985011360638,
								48.241133128904956
							],
							[
								26.630498974577957,
								48.260135199859874
							],
							[
								26.683965429291646,
								48.24958008721838
							],
							[
								26.695779838682387,
								48.26322867572698
							],
							[
								26.72121607510187,
								48.24634954483955
							],
							[
								26.74051314524044,
								48.24512163548391
							],
							[
								26.806477260287085,
								48.25448266620374
							],
							[
								26.851731702473696,
								48.23410751513279
							],
							[
								26.89330193104148,
								48.1885397720619
							],
							[
								26.9303585965264,
								48.19987144686441
							],
							[
								26.950091322489747,
								48.18728132557283
							],
							[
								26.933126057082735,
								48.17109522446038
							],
							[
								26.95908873570969,
								48.15205674586553
							],
							[
								26.954331818525358,
								48.137258562261685
							],
							[
								27.004288337385944,
								48.12276223562981
							],
							[
								27.01678247524453,
								48.13675645335804
							],
							[
								27.03954767353391,
								48.12823043234682
							],
							[
								27.04032229432742,
								48.10679415462519
							],
							[
								27.027936979404544,
								48.08720307999407
							],
							[
								27.046000663094308,
								48.06871438889385
							],
							[
								27.07539475801502,
								48.05434294982546
							],
							[
								27.098723568098027,
								48.00560466089509
							],
							[
								27.13503546816536,
								47.99134780991444
							],
							[
								27.16612421512333,
								47.99488378211972
							],
							[
								27.153181484508533,
								47.97156449738366
							],
							[
								27.178144143772478,
								47.946858169634694
							],
							[
								27.150815781367317,
								47.92131714595964
							],
							[
								27.19992137880865,
								47.90184163643635
							],
							[
								27.208967399461095,
								47.84941737919096
							],
							[
								27.245737888042925,
								47.82953520776935
							],
							[
								27.21461825058237,
								47.82099599120371
							],
							[
								27.265046522113433,
								47.7809789743045
							],
							[
								27.267951528388934,
								47.76034260994736
							],
							[
								27.285285950885047,
								47.757592856726774
							],
							[
								27.279647711431398,
								47.728070339767584
							],
							[
								27.259935696142975,
								47.73056791456382
							],
							[
								27.275292092891252,
								47.68727976611734
							],
							[
								27.29661984125825,
								47.679808815937065
							],
							[
								27.31446822744943,
								47.64362419801203
							],
							[
								27.358646384312248,
								47.62088045549243
							],
							[
								27.370901735530392,
								47.59974565023122
							],
							[
								27.39136585958241,
								47.58948461395424
							]
						]
					]
				},
				"properties": {
					"countyId": 7,
					"countyCode": 74,
					"name": "Botoșani",
					"mnemonic": "BT",
					"regionId": 1,
					"region": "Nord-Est",
					"pop1948": 385236,
					"pop1956": 428050,
					"pop1966": 452406,
					"pop1977": 451217,
					"pop1992": 461305,
					"pop2002": 452834,
					"pop2011": 412626,
					"sortCode": 7,
					"version": "2016/03/10",
					"density": "83"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								25.451246304475774,
								46.10410936311214
							],
							[
								25.450813038399133,
								46.07338023991507
							],
							[
								25.504651215822207,
								46.045320767266396
							],
							[
								25.55079079830224,
								46.05252613881587
							],
							[
								25.582050423906868,
								46.02142416766484
							],
							[
								25.568628401673777,
								46.0026817163684
							],
							[
								25.54113804366497,
								45.98369251216003
							],
							[
								25.540352671088236,
								45.93914595511497
							],
							[
								25.57079153255717,
								45.89721240829782
							],
							[
								25.605438797013168,
								45.89127965378671
							],
							[
								25.58746459201211,
								45.872152061863936
							],
							[
								25.557757218793,
								45.87647090219491
							],
							[
								25.561527299367473,
								45.84913609820845
							],
							[
								25.5767860735116,
								45.83076061328146
							],
							[
								25.61172700942305,
								45.82876323815569
							],
							[
								25.660298233905557,
								45.7901912181188
							],
							[
								25.676095045035627,
								45.76782630980035
							],
							[
								25.743550633017477,
								45.770050557988945
							],
							[
								25.766365782575477,
								45.75675917990745
							],
							[
								25.83322096531542,
								45.74755702547338
							],
							[
								25.821584080988455,
								45.725806638252635
							],
							[
								25.85453790134451,
								45.72250772843009
							],
							[
								25.859564346722706,
								45.70870429203151
							],
							[
								25.913439691472522,
								45.709863580851255
							],
							[
								25.93953902612551,
								45.692492623141824
							],
							[
								25.97358104059574,
								45.68465184227168
							],
							[
								25.96376754039914,
								45.64725564911247
							],
							[
								26.001247837043024,
								45.64689221301091
							],
							[
								26.020194451210727,
								45.637414519200355
							],
							[
								26.01298570943951,
								45.62059079252307
							],
							[
								26.052125365891868,
								45.61826259964576
							],
							[
								26.053392149601418,
								45.5971395192769
							],
							[
								26.071745506231775,
								45.57785809009045
							],
							[
								26.08968265755352,
								45.574126520748834
							],
							[
								26.1046587371844,
								45.54995650691343
							],
							[
								26.09334161017022,
								45.51632129967391
							],
							[
								26.072725670281145,
								45.5058029345768
							],
							[
								26.065482274029204,
								45.48531140070002
							],
							[
								26.04110976361709,
								45.47839648392795
							],
							[
								26.013691655286234,
								45.49012211700558
							],
							[
								25.995643961018825,
								45.514258596176354
							],
							[
								25.937817552512207,
								45.51254468727928
							],
							[
								25.919358713405867,
								45.5195583900894
							],
							[
								25.89097716282983,
								45.4879141677113
							],
							[
								25.888611311984224,
								45.44581176427896
							],
							[
								25.8675988818198,
								45.42308673984132
							],
							[
								25.829488544330307,
								45.42944340173134
							],
							[
								25.807820302449393,
								45.468955835483236
							],
							[
								25.790240261408844,
								45.47862665336394
							],
							[
								25.765921145579654,
								45.465575130192136
							],
							[
								25.72669109511595,
								45.46539905884802
							],
							[
								25.681001358576506,
								45.5006339958725
							],
							[
								25.64407816657295,
								45.49257335196784
							],
							[
								25.60703677811107,
								45.47605167240185
							],
							[
								25.531319271956335,
								45.45920057278391
							],
							[
								25.511550970378718,
								45.47040531150057
							],
							[
								25.461716901161815,
								45.45392997476359
							],
							[
								25.45254545655895,
								45.44135605190133
							],
							[
								25.41027717634861,
								45.42646696075859
							],
							[
								25.403073933897375,
								45.38742146566489
							],
							[
								25.361711925181723,
								45.39148720213712
							],
							[
								25.321583850308116,
								45.381103324187976
							],
							[
								25.30161158140954,
								45.42239282821521
							],
							[
								25.272998828228463,
								45.40750785257158
							],
							[
								25.253436174378376,
								45.42883113022785
							],
							[
								25.275842877908552,
								45.44207147421438
							],
							[
								25.238347520413196,
								45.475531969297265
							],
							[
								25.24161487756123,
								45.499749034152735
							],
							[
								25.211633182579064,
								45.52688116032819
							],
							[
								25.188958088393385,
								45.52278556274022
							],
							[
								25.151658361446025,
								45.5457903015346
							],
							[
								25.14554141765704,
								45.55862557542553
							],
							[
								25.10321985628884,
								45.58520799148644
							],
							[
								25.081605884283093,
								45.58172507064718
							],
							[
								25.036099178792696,
								45.59265169135448
							],
							[
								25.013422916294015,
								45.58602127826969
							],
							[
								24.958121667173877,
								45.59271954631694
							],
							[
								24.94123925248487,
								45.58213316790295
							],
							[
								24.916600138313473,
								45.59457390599838
							],
							[
								24.835956051657,
								45.592301401193545
							],
							[
								24.829805426996792,
								45.606543585688954
							],
							[
								24.795789003039005,
								45.603187056210565
							],
							[
								24.77226000197983,
								45.611197742197156
							],
							[
								24.684930956153956,
								45.60412439036928
							],
							[
								24.669542630648262,
								45.640510857021795
							],
							[
								24.682902822475818,
								45.670544734463085
							],
							[
								24.680948156198607,
								45.71135231700562
							],
							[
								24.646237728945643,
								45.76466616056581
							],
							[
								24.639236187624103,
								45.795123106652426
							],
							[
								24.66100009568799,
								45.81758240467668
							],
							[
								24.726858420232993,
								45.83724048960768
							],
							[
								24.77307216511459,
								45.84004579736182
							],
							[
								24.770751243874436,
								45.86830631979304
							],
							[
								24.715195340393574,
								45.89572495733469
							],
							[
								24.702901692463268,
								45.9401302460964
							],
							[
								24.72097534239207,
								45.94586919378312
							],
							[
								24.748885865708296,
								45.9350441391842
							],
							[
								24.771225150466417,
								45.9618250162275
							],
							[
								24.792458077261614,
								45.973088709745596
							],
							[
								24.835497300480135,
								45.97781428366653
							],
							[
								24.819490654059152,
								46.005542032565444
							],
							[
								24.865453431994286,
								46.00965397468231
							],
							[
								24.875033353934317,
								46.02912332042642
							],
							[
								24.945123528127446,
								46.05131102597141
							],
							[
								24.962099599987543,
								46.06590885525968
							],
							[
								24.94655309501842,
								46.079122988700206
							],
							[
								24.958021618781775,
								46.11218655744039
							],
							[
								25.019550495012748,
								46.14197353295611
							],
							[
								25.046774243420007,
								46.13320929572475
							],
							[
								25.07913890636589,
								46.1494383489005
							],
							[
								25.12583318919789,
								46.14238584131825
							],
							[
								25.173255375007443,
								46.16553389301424
							],
							[
								25.188749190103337,
								46.17097436482136
							],
							[
								25.249521272162497,
								46.141415186067775
							],
							[
								25.27312189768133,
								46.18728362296526
							],
							[
								25.293579520330468,
								46.17709615763282
							],
							[
								25.329678222416966,
								46.17828653328351
							],
							[
								25.375611200756232,
								46.13474708452293
							],
							[
								25.454399428419762,
								46.11999954923995
							],
							[
								25.451246304475774,
								46.10410936311214
							]
						]
					]
				},
				"properties": {
					"countyId": 8,
					"countyCode": 83,
					"name": "Brașov",
					"mnemonic": "BV",
					"regionId": 7,
					"region": "Centru",
					"pop1948": 300836,
					"pop1956": 373941,
					"pop1966": 442692,
					"pop1977": 582863,
					"pop1992": 643261,
					"pop2002": 589028,
					"pop2011": 549217,
					"sortCode": 8,
					"version": "2016/03/10",
					"density": "102"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								28.030526496060197,
								45.40434503451004
							],
							[
								28.027001730427116,
								45.36838046216294
							],
							[
								27.994819535814663,
								45.2867589414649
							],
							[
								28.046006011370334,
								45.25800953305159
							],
							[
								28.084725163612003,
								45.2496029666149
							],
							[
								28.116055745723276,
								45.258017066522434
							],
							[
								28.129796262117225,
								45.23229742632127
							],
							[
								28.093602054034367,
								45.188311278234906
							],
							[
								28.140884093090065,
								45.168475864447316
							],
							[
								28.172076360578192,
								45.14811115465578
							],
							[
								28.16863854570158,
								45.09999035540887
							],
							[
								28.13483447756727,
								45.098727327343475
							],
							[
								28.13863604450194,
								45.06438601379734
							],
							[
								28.152346695890685,
								45.038218160571475
							],
							[
								28.12846194056202,
								45.01364216004518
							],
							[
								28.150760794820684,
								44.97056321854305
							],
							[
								28.12960381100019,
								44.94175390445258
							],
							[
								28.127306538581507,
								44.90411493313944
							],
							[
								28.136463750413263,
								44.881936468169876
							],
							[
								28.10865792453339,
								44.86989441584704
							],
							[
								28.076396266721865,
								44.81993248915361
							],
							[
								28.074119178036025,
								44.8039037070081
							],
							[
								28.0625497639834,
								44.78140249849892
							],
							[
								28.03692614032417,
								44.76097506399844
							],
							[
								28.0014094443957,
								44.758377239669024
							],
							[
								27.945398923618168,
								44.78048578083045
							],
							[
								27.89715696124788,
								44.77248498047091
							],
							[
								27.881017521888477,
								44.76309299108194
							],
							[
								27.86938086928693,
								44.77539603736364
							],
							[
								27.831401094141153,
								44.77910718860151
							],
							[
								27.820819026650753,
								44.79983692174228
							],
							[
								27.82646664505042,
								44.82002973608233
							],
							[
								27.788532660117678,
								44.81878474708892
							],
							[
								27.775568376817002,
								44.80497455625847
							],
							[
								27.728268522958825,
								44.80173574224008
							],
							[
								27.720469374206854,
								44.7669109869925
							],
							[
								27.649046759796,
								44.77031722862227
							],
							[
								27.540451211086413,
								44.78352658022663
							],
							[
								27.526812874224902,
								44.774031036634405
							],
							[
								27.47799231877945,
								44.77522014705062
							],
							[
								27.436774451452965,
								44.798971209391155
							],
							[
								27.40773921737116,
								44.77302987488261
							],
							[
								27.38194133747511,
								44.77469636141769
							],
							[
								27.34110099726259,
								44.80262509036343
							],
							[
								27.30958069950912,
								44.77470984394662
							],
							[
								27.288603875780062,
								44.78582995384871
							],
							[
								27.25760574044071,
								44.749697665523655
							],
							[
								27.20346813163149,
								44.78708974399881
							],
							[
								27.266267677991827,
								44.94774255652541
							],
							[
								27.280843971647457,
								44.995113067178146
							],
							[
								27.24925449137738,
								44.994934549120764
							],
							[
								27.247705720313764,
								45.027144367778455
							],
							[
								27.197630925058334,
								45.02799905933851
							],
							[
								27.205402218325037,
								45.092598590819165
							],
							[
								27.188632845224152,
								45.09209116819294
							],
							[
								27.166998215322575,
								45.10982371640426
							],
							[
								27.149926237573112,
								45.17060427206635
							],
							[
								27.11193246267101,
								45.15640687354801
							],
							[
								27.114473180007163,
								45.137439735827996
							],
							[
								27.097637614977458,
								45.13047361417977
							],
							[
								27.0662809993349,
								45.15849100691754
							],
							[
								27.08435596248163,
								45.179874310718276
							],
							[
								27.125320039329967,
								45.2149452959672
							],
							[
								27.175070507753837,
								45.24934630376453
							],
							[
								27.21096448581899,
								45.22401931898957
							],
							[
								27.243190362453745,
								45.22008468374153
							],
							[
								27.28366761117701,
								45.200105944699835
							],
							[
								27.292372674919402,
								45.21349085719879
							],
							[
								27.33535229711112,
								45.210848958138904
							],
							[
								27.351209218956935,
								45.23165067062161
							],
							[
								27.339807496457475,
								45.252746174830136
							],
							[
								27.31935209037786,
								45.261510169504945
							],
							[
								27.335170344599046,
								45.2842092428326
							],
							[
								27.360652471248716,
								45.27404192741743
							],
							[
								27.387153826351593,
								45.28984581772269
							],
							[
								27.38051302286733,
								45.33003408550867
							],
							[
								27.407857397462564,
								45.34037632616854
							],
							[
								27.399552101406226,
								45.35827370304724
							],
							[
								27.44171630378889,
								45.37575080228072
							],
							[
								27.434734877661175,
								45.39471862913219
							],
							[
								27.440382337595164,
								45.41481063384788
							],
							[
								27.48659644212007,
								45.43999613498428
							],
							[
								27.55852405586422,
								45.48839240074006
							],
							[
								27.600749289790674,
								45.48420547123344
							],
							[
								27.62881105880095,
								45.4546583549751
							],
							[
								27.66160792937211,
								45.47197138578909
							],
							[
								27.6923017264304,
								45.470989534313055
							],
							[
								27.673245432748296,
								45.44619417003127
							],
							[
								27.71675871769496,
								45.43348037207831
							],
							[
								27.74340004653565,
								45.43624015174577
							],
							[
								27.7412159664166,
								45.41422070375746
							],
							[
								27.782996712990737,
								45.42231912504558
							],
							[
								27.786339829018534,
								45.40689968599572
							],
							[
								27.82356106266894,
								45.39651625333625
							],
							[
								27.86561107213013,
								45.39699074638553
							],
							[
								27.874005857248214,
								45.41789717775484
							],
							[
								27.91678263892666,
								45.407039742925754
							],
							[
								27.956203772885583,
								45.40275366727955
							],
							[
								27.982984218512254,
								45.39064305517559
							],
							[
								28.030526496060197,
								45.40434503451004
							]
						]
					]
				},
				"properties": {
					"countyId": 9,
					"countyCode": 92,
					"name": "Brăila",
					"mnemonic": "BR",
					"regionId": 2,
					"region": "Sud-Est",
					"pop1948": 271251,
					"pop1956": 297276,
					"pop1966": 339954,
					"pop1977": 377954,
					"pop1992": 392031,
					"pop2002": 373174,
					"pop2011": 321212,
					"sortCode": 9,
					"version": "2016/03/10",
					"density": "67"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								27.434734877661175,
								45.39471862913219
							],
							[
								27.44171630378889,
								45.37575080228072
							],
							[
								27.399552101406226,
								45.35827370304724
							],
							[
								27.407857397462564,
								45.34037632616854
							],
							[
								27.38051302286733,
								45.33003408550867
							],
							[
								27.387153826351593,
								45.28984581772269
							],
							[
								27.360652471248716,
								45.27404192741743
							],
							[
								27.335170344599046,
								45.2842092428326
							],
							[
								27.31935209037786,
								45.261510169504945
							],
							[
								27.339807496457475,
								45.252746174830136
							],
							[
								27.351209218956935,
								45.23165067062161
							],
							[
								27.33535229711112,
								45.210848958138904
							],
							[
								27.292372674919402,
								45.21349085719879
							],
							[
								27.28366761117701,
								45.200105944699835
							],
							[
								27.243190362453745,
								45.22008468374153
							],
							[
								27.21096448581899,
								45.22401931898957
							],
							[
								27.175070507753837,
								45.24934630376453
							],
							[
								27.125320039329967,
								45.2149452959672
							],
							[
								27.08435596248163,
								45.179874310718276
							],
							[
								27.0662809993349,
								45.15849100691754
							],
							[
								27.097637614977458,
								45.13047361417977
							],
							[
								27.114473180007163,
								45.137439735827996
							],
							[
								27.11193246267101,
								45.15640687354801
							],
							[
								27.149926237573112,
								45.17060427206635
							],
							[
								27.166998215322575,
								45.10982371640426
							],
							[
								27.188632845224152,
								45.09209116819294
							],
							[
								27.205402218325037,
								45.092598590819165
							],
							[
								27.197630925058334,
								45.02799905933851
							],
							[
								27.247705720313764,
								45.027144367778455
							],
							[
								27.24925449137738,
								44.994934549120764
							],
							[
								27.280843971647457,
								44.995113067178146
							],
							[
								27.266267677991827,
								44.94774255652541
							],
							[
								27.20346813163149,
								44.78708974399881
							],
							[
								27.15562307661955,
								44.788787795085724
							],
							[
								27.148160374407347,
								44.767917429004825
							],
							[
								27.187445731822756,
								44.75130466327453
							],
							[
								27.179178902618787,
								44.73524186554727
							],
							[
								27.134066507832475,
								44.73555014540453
							],
							[
								27.0979018169543,
								44.744862508044925
							],
							[
								27.110874074684844,
								44.78200469529898
							],
							[
								27.05622305898831,
								44.79693702370018
							],
							[
								27.00793575607187,
								44.82447315130393
							],
							[
								26.973321715655043,
								44.78828289712257
							],
							[
								26.878290029138373,
								44.820143993209115
							],
							[
								26.846444651359796,
								44.81496165349102
							],
							[
								26.830412710571558,
								44.79769089907036
							],
							[
								26.81018987665581,
								44.79535678968528
							],
							[
								26.776580461023,
								44.81512705022592
							],
							[
								26.718729065709713,
								44.809198419980326
							],
							[
								26.68114321107929,
								44.810727601156565
							],
							[
								26.644817204996983,
								44.82299088109409
							],
							[
								26.630938460340865,
								44.81360804763643
							],
							[
								26.605560284759033,
								44.85700920744339
							],
							[
								26.60835628919473,
								44.87217383766264
							],
							[
								26.58497530114449,
								44.88234535538798
							],
							[
								26.553745835176198,
								44.9152434749379
							],
							[
								26.536254213800596,
								44.91641176729377
							],
							[
								26.531560217272848,
								44.939170861639944
							],
							[
								26.599919123078084,
								44.95585990231308
							],
							[
								26.57722382749115,
								44.971552907951065
							],
							[
								26.554912281888473,
								44.999430695191016
							],
							[
								26.52955038567052,
								45.01488764027392
							],
							[
								26.491984738632844,
								45.00537592821273
							],
							[
								26.462991156171196,
								45.07002989554083
							],
							[
								26.44946752541709,
								45.12611813236187
							],
							[
								26.469388862955917,
								45.1390142468514
							],
							[
								26.4604501315774,
								45.16726562561205
							],
							[
								26.460358142978908,
								45.19810715918488
							],
							[
								26.42202671782228,
								45.17547345459722
							],
							[
								26.397171822006765,
								45.178555474732285
							],
							[
								26.375658513304543,
								45.15830883300345
							],
							[
								26.352688346862784,
								45.16439365575735
							],
							[
								26.34586548556743,
								45.1955835356135
							],
							[
								26.35675058504112,
								45.21327589761429
							],
							[
								26.333311740813567,
								45.2177896805776
							],
							[
								26.30296591628203,
								45.2022592913768
							],
							[
								26.255945615729402,
								45.20849733784701
							],
							[
								26.226127826517267,
								45.24438267240489
							],
							[
								26.22337193681714,
								45.273729695469086
							],
							[
								26.18747874236645,
								45.27959907092715
							],
							[
								26.233613440193555,
								45.314639111475984
							],
							[
								26.211509537140586,
								45.326690650008224
							],
							[
								26.18597427659704,
								45.357343014155
							],
							[
								26.15343946125548,
								45.37702262653631
							],
							[
								26.16495352446568,
								45.401350483597824
							],
							[
								26.144681070838516,
								45.4084141374262
							],
							[
								26.14836728876212,
								45.45732514045892
							],
							[
								26.117236502175718,
								45.476836289903375
							],
							[
								26.09054770321635,
								45.485671655631556
							],
							[
								26.072725670281145,
								45.5058029345768
							],
							[
								26.09334161017022,
								45.51632129967391
							],
							[
								26.147703749552562,
								45.58493407068069
							],
							[
								26.16765929108692,
								45.56832223163726
							],
							[
								26.185434598038444,
								45.608316948261276
							],
							[
								26.212825913498925,
								45.62184618294601
							],
							[
								26.247324888338834,
								45.62141041799349
							],
							[
								26.253032753643733,
								45.600742468989964
							],
							[
								26.282711099088772,
								45.586962509670954
							],
							[
								26.326180152231085,
								45.62471392886659
							],
							[
								26.32418153711047,
								45.64914213168837
							],
							[
								26.332135951617207,
								45.684212975998705
							],
							[
								26.350319435429522,
								45.703621953490305
							],
							[
								26.389367825239546,
								45.766775943004106
							],
							[
								26.38331555062706,
								45.78270039131295
							],
							[
								26.392100780208878,
								45.80240527550695
							],
							[
								26.440426871230365,
								45.77688818936911
							],
							[
								26.435724518852744,
								45.73968063023645
							],
							[
								26.466825082234404,
								45.719207282921175
							],
							[
								26.492816169229698,
								45.67690485362035
							],
							[
								26.530065916925206,
								45.640851375832455
							],
							[
								26.551383359278987,
								45.629391378533995
							],
							[
								26.57412730078324,
								45.63439652700629
							],
							[
								26.593534171540917,
								45.620358358971814
							],
							[
								26.615258889522696,
								45.62805126979643
							],
							[
								26.64776003941882,
								45.609047167556255
							],
							[
								26.6789534810617,
								45.60959271557798
							],
							[
								26.720632425028178,
								45.57091770532775
							],
							[
								26.76634766151106,
								45.551349690950346
							],
							[
								26.807520122517413,
								45.54677782933513
							],
							[
								26.833899674349333,
								45.51784614324267
							],
							[
								26.853028926434664,
								45.52536686747513
							],
							[
								26.885096585233867,
								45.516396820818954
							],
							[
								26.90605853399784,
								45.5328448813161
							],
							[
								26.95521678549994,
								45.528850776304466
							],
							[
								26.971939258007858,
								45.53515092253629
							],
							[
								27.002900348615942,
								45.48443074985663
							],
							[
								27.043739999498655,
								45.45405429608604
							],
							[
								27.089916801243273,
								45.445907016123854
							],
							[
								27.109261325615822,
								45.47490185768635
							],
							[
								27.13533693069023,
								45.465576784246366
							],
							[
								27.10475796792393,
								45.426100326527205
							],
							[
								27.11482316634798,
								45.40930895631739
							],
							[
								27.14341404981348,
								45.41037968205178
							],
							[
								27.174810681533422,
								45.42765967018979
							],
							[
								27.194384242610905,
								45.45338136643379
							],
							[
								27.22341561040551,
								45.427594297858846
							],
							[
								27.256707921796302,
								45.44942704312078
							],
							[
								27.28100837320854,
								45.43346272353137
							],
							[
								27.264785828652595,
								45.418561986961976
							],
							[
								27.2700103915585,
								45.39021930261605
							],
							[
								27.339656494646018,
								45.383401879001845
							],
							[
								27.336600828607924,
								45.371344503076266
							],
							[
								27.40144428560014,
								45.377029175518324
							],
							[
								27.434734877661175,
								45.39471862913219
							]
						]
					]
				},
				"properties": {
					"countyId": 10,
					"countyCode": 109,
					"name": "Buzău",
					"mnemonic": "BZ",
					"regionId": 2,
					"region": "Sud-Est",
					"pop1948": 430225,
					"pop1956": 465829,
					"pop1966": 480951,
					"pop1977": 508424,
					"pop1992": 516961,
					"pop2002": 496214,
					"pop2011": 451069,
					"sortCode": 10,
					"version": "2016/03/10",
					"density": "1174"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								22.426482800553742,
								45.66889503842559
							],
							[
								22.453993004778997,
								45.660276971856675
							],
							[
								22.467145554589752,
								45.63367094516639
							],
							[
								22.497574371227348,
								45.615658152913255
							],
							[
								22.51474760987057,
								45.59469884969508
							],
							[
								22.54455652888052,
								45.59520419146233
							],
							[
								22.594636046895744,
								45.576266125128264
							],
							[
								22.63300532518068,
								45.57123267379069
							],
							[
								22.638651436676277,
								45.55035644523769
							],
							[
								22.690725562131643,
								45.49085749049983
							],
							[
								22.712716326349508,
								45.41564670840099
							],
							[
								22.69054602808917,
								45.39149318283337
							],
							[
								22.656598544147183,
								45.371349729628534
							],
							[
								22.691115779057505,
								45.32740595560631
							],
							[
								22.696473576368607,
								45.30292374302943
							],
							[
								22.67736962077866,
								45.282551337477
							],
							[
								22.686251180897337,
								45.257972051419344
							],
							[
								22.67398322712649,
								45.24112467875253
							],
							[
								22.649047990294076,
								45.23368857730768
							],
							[
								22.626604881422605,
								45.20877851268205
							],
							[
								22.60075026489162,
								45.20554885444779
							],
							[
								22.57557844913788,
								45.18339956586043
							],
							[
								22.55897081025881,
								45.15706332165275
							],
							[
								22.58086094937864,
								45.13755106342432
							],
							[
								22.62835915389093,
								45.13493942461441
							],
							[
								22.64946388208115,
								45.12778055518984
							],
							[
								22.656637356302816,
								45.10817772970089
							],
							[
								22.585015495698745,
								45.04353248851344
							],
							[
								22.563646804094788,
								45.03452087174773
							],
							[
								22.536630358815366,
								45.002043608831386
							],
							[
								22.503642642781067,
								44.984010322010214
							],
							[
								22.50934940129168,
								44.96719434584803
							],
							[
								22.486609910979833,
								44.94929997937807
							],
							[
								22.495545019291566,
								44.924409304214244
							],
							[
								22.482190234770346,
								44.90691740055039
							],
							[
								22.488765436027972,
								44.89408668280306
							],
							[
								22.446414022698644,
								44.82314587130389
							],
							[
								22.424047955448355,
								44.79915423186792
							],
							[
								22.42037338263876,
								44.75846835233264
							],
							[
								22.388948568812715,
								44.76137085884575
							],
							[
								22.35395178999023,
								44.753070204380705
							],
							[
								22.341647746184165,
								44.77406936786058
							],
							[
								22.310863152122494,
								44.77501757783232
							],
							[
								22.263161195985738,
								44.78475332296913
							],
							[
								22.24350109017159,
								44.80748651287208
							],
							[
								22.207309174927925,
								44.81665350334533
							],
							[
								22.195176051875578,
								44.77903741376149
							],
							[
								22.204164215839562,
								44.76141552887263
							],
							[
								22.183966105996788,
								44.74071574075412
							],
							[
								22.157443181370052,
								44.730238057211565
							],
							[
								22.139170080479868,
								44.660214535976166
							],
							[
								22.171376648350012,
								44.64857967814829
							],
							[
								22.176298855646824,
								44.62450606252843
							],
							[
								22.147839894028028,
								44.587161887491625
							],
							[
								22.117403421272794,
								44.591823438996634
							],
							[
								22.091709882646057,
								44.619415098551364
							],
							[
								22.016154579123118,
								44.59921511952656
							],
							[
								21.989615341221185,
								44.63371424295363
							],
							[
								21.950772191453815,
								44.635127020321946
							],
							[
								21.920268733337956,
								44.64679187422926
							],
							[
								21.88847038583462,
								44.64549641007587
							],
							[
								21.84220837419155,
								44.65434859234288
							],
							[
								21.809803692098136,
								44.6519262936566
							],
							[
								21.79655693191781,
								44.66302593592499
							],
							[
								21.728792277864493,
								44.653510167570595
							],
							[
								21.69651983369956,
								44.663719075831416
							],
							[
								21.64115982895601,
								44.65931569852523
							],
							[
								21.622724028929607,
								44.66632527246608
							],
							[
								21.61161757452023,
								44.68628716881367
							],
							[
								21.615340293511405,
								44.713365900491915
							],
							[
								21.59152243445609,
								44.75556617013555
							],
							[
								21.531035616061203,
								44.772966084955435
							],
							[
								21.459849229201364,
								44.776944731717684
							],
							[
								21.424779807874888,
								44.77337570882596
							],
							[
								21.392231143207635,
								44.782921746125766
							],
							[
								21.37648019477501,
								44.81528316524205
							],
							[
								21.35405962879524,
								44.838287694638055
							],
							[
								21.366932916417003,
								44.8645758843189
							],
							[
								21.415841488606446,
								44.872657678032944
							],
							[
								21.484922933443983,
								44.86840461186413
							],
							[
								21.51077384014729,
								44.88005188452138
							],
							[
								21.560134542362558,
								44.88901410398913
							],
							[
								21.54668930935693,
								44.93053441835746
							],
							[
								21.46926362574617,
								44.95846837876032
							],
							[
								21.438183179490153,
								44.96056831896741
							],
							[
								21.406765928046664,
								44.97852324579072
							],
							[
								21.360249709914093,
								45.020386532779234
							],
							[
								21.412280142124583,
								45.03634371470923
							],
							[
								21.456128446653242,
								45.040440778952565
							],
							[
								21.447110915827466,
								45.05566799358433
							],
							[
								21.48329262378808,
								45.091311092362844
							],
							[
								21.469761655788524,
								45.1046867795059
							],
							[
								21.478424636604142,
								45.121257020767494
							],
							[
								21.527485403365315,
								45.13793354093465
							],
							[
								21.51643695868222,
								45.168867753658944
							],
							[
								21.493031043972977,
								45.17358479409283
							],
							[
								21.47922187722323,
								45.1930858542119
							],
							[
								21.497357386280036,
								45.195769478250426
							],
							[
								21.52699603730699,
								45.23243731704511
							],
							[
								21.534824067741877,
								45.262803289830465
							],
							[
								21.556107616467585,
								45.272439831079964
							],
							[
								21.53132230822594,
								45.29137313360701
							],
							[
								21.54279953805554,
								45.2994658976778
							],
							[
								21.525839745557754,
								45.33158194396608
							],
							[
								21.488609040907356,
								45.353151684770104
							],
							[
								21.445093443157045,
								45.39038844483739
							],
							[
								21.44054287281616,
								45.40711003964714
							],
							[
								21.488749998582453,
								45.418627673939895
							],
							[
								21.465165016427783,
								45.44488399803501
							],
							[
								21.45870989051308,
								45.47677610544644
							],
							[
								21.51155623813876,
								45.49359423859205
							],
							[
								21.546613411598468,
								45.48835288553776
							],
							[
								21.57912696701898,
								45.50509750923628
							],
							[
								21.577766991564424,
								45.54435563391019
							],
							[
								21.597759956335572,
								45.556620515998134
							],
							[
								21.674131154645796,
								45.5858946389553
							],
							[
								21.69993632967208,
								45.56387078660916
							],
							[
								21.72466364409072,
								45.56249951750907
							],
							[
								21.747286198437813,
								45.54463843085035
							],
							[
								21.787257046244104,
								45.53294804785089
							],
							[
								21.831895413687448,
								45.52943884645859
							],
							[
								21.875670300161197,
								45.536700571899225
							],
							[
								21.880028474130462,
								45.561474646806936
							],
							[
								21.9235250341687,
								45.566883403699045
							],
							[
								21.92046301646224,
								45.55307287446634
							],
							[
								21.940124331181842,
								45.53151215351403
							],
							[
								21.945322641743374,
								45.506294809961084
							],
							[
								21.974866088479835,
								45.512443830361846
							],
							[
								22.03053589843391,
								45.497425167987295
							],
							[
								22.06580774257708,
								45.51446722654
							],
							[
								22.067201784634353,
								45.535242914506334
							],
							[
								22.04526230461066,
								45.591523169060174
							],
							[
								22.07404723137784,
								45.57194399859429
							],
							[
								22.103482731833154,
								45.59196629130265
							],
							[
								22.167526767045732,
								45.60419678217789
							],
							[
								22.186736637898818,
								45.61728706099579
							],
							[
								22.207745467048685,
								45.60567497200151
							],
							[
								22.237389076102012,
								45.603958629544834
							],
							[
								22.27069191179097,
								45.585306290295435
							],
							[
								22.290995941558656,
								45.6053234668337
							],
							[
								22.297905289782744,
								45.636870742753366
							],
							[
								22.31648596060198,
								45.65985690887088
							],
							[
								22.357551727773846,
								45.667224138727995
							],
							[
								22.389722174964962,
								45.66264620882442
							],
							[
								22.426482800553742,
								45.66889503842559
							]
						]
					]
				},
				"properties": {
					"countyId": 11,
					"countyCode": 118,
					"name": "Caraș-Severin",
					"mnemonic": "CS",
					"regionId": 5,
					"region": "Vest",
					"pop1948": 302254,
					"pop1956": 327787,
					"pop1966": 358726,
					"pop1977": 385577,
					"pop1992": 376347,
					"pop2002": 333219,
					"pop2011": 295579,
					"sortCode": 11,
					"version": "2016/03/10",
					"density": "35"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								28.995053002337844,
								44.6790342115533
							],
							[
								28.95030104403072,
								44.63690216005444
							],
							[
								28.93093298607789,
								44.604006369822855
							],
							[
								28.87006453560667,
								44.520177757222974
							],
							[
								28.83761648894471,
								44.48700761925484
							],
							[
								28.762000339011017,
								44.42572154796217
							],
							[
								28.711157317993234,
								44.37658732241376
							],
							[
								28.692484954105932,
								44.34570150473427
							],
							[
								28.66612118770001,
								44.34116989523224
							],
							[
								28.639513170630995,
								44.32424028708876
							],
							[
								28.625994624023683,
								44.29704908689676
							],
							[
								28.622777125028314,
								44.25049687305936
							],
							[
								28.63649001825255,
								44.219855440233225
							],
							[
								28.651938856585545,
								44.211814384470316
							],
							[
								28.660439292864087,
								44.174307714703616
							],
							[
								28.643723243181366,
								44.15842569108176
							],
							[
								28.647877182484194,
								44.11003920191742
							],
							[
								28.69490887819319,
								44.10288396238305
							],
							[
								28.689416413869992,
								44.08786097180794
							],
							[
								28.643865089324564,
								44.08419331317909
							],
							[
								28.645815777486664,
								44.04504483562503
							],
							[
								28.658206981388197,
								44.02707076791854
							],
							[
								28.66681096303466,
								43.98545272979183
							],
							[
								28.641627973847328,
								43.95662284173774
							],
							[
								28.63620520348307,
								43.92393857360306
							],
							[
								28.61464998411982,
								43.89966345609668
							],
							[
								28.60635343594535,
								43.878025670514475
							],
							[
								28.60876006614784,
								43.85072179247349
							],
							[
								28.591117247027302,
								43.83884657625312
							],
							[
								28.574679581581286,
								43.75555973738217
							],
							[
								28.579007183141528,
								43.73873645014687
							],
							[
								28.446160474883293,
								43.7337273351668
							],
							[
								28.3484590978701,
								43.75216480795056
							],
							[
								28.236408992627226,
								43.75850651585241
							],
							[
								28.115931039185043,
								43.79719990773806
							],
							[
								28.01577158224412,
								43.83690381369161
							],
							[
								27.99419634418951,
								43.842900741375246
							],
							[
								27.976249444566797,
								43.90095971871605
							],
							[
								27.95405066055255,
								43.9401660664693
							],
							[
								27.944246940714432,
								43.984810233581314
							],
							[
								27.91680126951333,
								44.0082420815216
							],
							[
								27.84346434603573,
								43.96640802734992
							],
							[
								27.75422487943097,
								43.95833362975546
							],
							[
								27.710016847978668,
								43.95940846913144
							],
							[
								27.67362984607912,
								44.02981588192666
							],
							[
								27.643503193960786,
								44.04794875695257
							],
							[
								27.61192517164158,
								44.01222253934836
							],
							[
								27.468745319641325,
								44.02251761473316
							],
							[
								27.3994091087729,
								44.0123854776331
							],
							[
								27.35614777020369,
								44.05872496504069
							],
							[
								27.291166031187846,
								44.075190011061814
							],
							[
								27.27135599915703,
								44.126352188045644
							],
							[
								27.305325923622014,
								44.14047220778016
							],
							[
								27.34577372657904,
								44.13126768928264
							],
							[
								27.392738674887546,
								44.13196058969572
							],
							[
								27.453439692869413,
								44.125090526369995
							],
							[
								27.50750614702761,
								44.15357643686681
							],
							[
								27.5283345790964,
								44.17008663860527
							],
							[
								27.577793535540117,
								44.190747252076946
							],
							[
								27.62939208596647,
								44.20533859193975
							],
							[
								27.712209056093013,
								44.19581931719831
							],
							[
								27.73294162669752,
								44.19944076701468
							],
							[
								27.778627348507623,
								44.232567068756886
							],
							[
								27.828639473911114,
								44.24659144036967
							],
							[
								27.884921223241,
								44.2510606200938
							],
							[
								27.936132623577333,
								44.25063868354907
							],
							[
								27.967484729612117,
								44.274151232770166
							],
							[
								28.011857128419816,
								44.322095637620805
							],
							[
								28.017385629757317,
								44.34026564616973
							],
							[
								28.043232442050588,
								44.38463257191078
							],
							[
								28.075974635907478,
								44.41601751129062
							],
							[
								28.110471414961854,
								44.43724704945264
							],
							[
								28.089989568647844,
								44.48784849624884
							],
							[
								28.053216724223137,
								44.50871408773152
							],
							[
								28.034596833667358,
								44.54742051483296
							],
							[
								28.01652508947935,
								44.56483443585153
							],
							[
								28.013715800220943,
								44.584436357333196
							],
							[
								28.03259011593593,
								44.60727328887684
							],
							[
								28.03174831786953,
								44.62530802686166
							],
							[
								27.967956811937203,
								44.66983702288775
							],
							[
								27.931212789651024,
								44.67971685977214
							],
							[
								27.91141806795864,
								44.696945142228586
							],
							[
								27.880316058216017,
								44.709396724835216
							],
							[
								27.87148186591777,
								44.72618933018186
							],
							[
								27.881017521888477,
								44.76309299108194
							],
							[
								27.89715696124788,
								44.77248498047091
							],
							[
								27.945398923618168,
								44.78048578083045
							],
							[
								28.0014094443957,
								44.758377239669024
							],
							[
								28.03692614032417,
								44.76097506399844
							],
							[
								28.0625497639834,
								44.78140249849892
							],
							[
								28.074119178036025,
								44.8039037070081
							],
							[
								28.110051129816917,
								44.79351714348737
							],
							[
								28.153483107317047,
								44.800313022350295
							],
							[
								28.181607625037138,
								44.78537666229441
							],
							[
								28.18150184957519,
								44.76106788126908
							],
							[
								28.215805084598994,
								44.75415186483313
							],
							[
								28.221206928459086,
								44.764136126860876
							],
							[
								28.258793128534176,
								44.747973038252965
							],
							[
								28.261793898373114,
								44.726846023048004
							],
							[
								28.279199959371724,
								44.71203829938607
							],
							[
								28.312703783979195,
								44.711497046583624
							],
							[
								28.314543555234753,
								44.69610319782218
							],
							[
								28.365513653708607,
								44.69161419851685
							],
							[
								28.385056311252928,
								44.67998805654352
							],
							[
								28.37728935369064,
								44.66373908381431
							],
							[
								28.386890997970077,
								44.639527244833566
							],
							[
								28.435689591529783,
								44.625053722754245
							],
							[
								28.448774416023273,
								44.64326257280889
							],
							[
								28.427743584219893,
								44.65804692123113
							],
							[
								28.4347729265011,
								44.6738141465939
							],
							[
								28.466768871232397,
								44.64897326664298
							],
							[
								28.52079864650148,
								44.634195455728005
							],
							[
								28.536025686560162,
								44.66252857115122
							],
							[
								28.5810192209534,
								44.65810078184144
							],
							[
								28.677662032922424,
								44.662617619874105
							],
							[
								28.738992720637313,
								44.647106819026654
							],
							[
								28.778620358638268,
								44.65499835427003
							],
							[
								28.789408801310152,
								44.635741299563996
							],
							[
								28.824324525652916,
								44.6323504197018
							],
							[
								28.862821414013286,
								44.66246031531208
							],
							[
								28.914785842097597,
								44.686288306294124
							],
							[
								28.92950021415577,
								44.69769384698203
							],
							[
								28.963059196449066,
								44.692842293386676
							],
							[
								28.995053002337844,
								44.6790342115533
							]
						]
					]
				},
				"properties": {
					"countyId": 13,
					"countyCode": 136,
					"name": "Constanța",
					"mnemonic": "CT",
					"regionId": 2,
					"region": "Sud-Est",
					"pop1948": 311062,
					"pop1956": 369940,
					"pop1966": 465752,
					"pop1977": 608817,
					"pop1992": 748769,
					"pop2002": 715151,
					"pop2011": 684082,
					"sortCode": 14,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								26.263444450566528,
								46.24635400864673
							],
							[
								26.284853862245665,
								46.24568662103763
							],
							[
								26.325782880811154,
								46.23073758324824
							],
							[
								26.341450853443934,
								46.20097911924801
							],
							[
								26.330559244658243,
								46.18314734794576
							],
							[
								26.347459643088314,
								46.16157534400196
							],
							[
								26.343011496972657,
								46.13771391567573
							],
							[
								26.386056480403603,
								46.145091207267946
							],
							[
								26.385746979171262,
								46.12874364673527
							],
							[
								26.36752688456143,
								46.11815273827246
							],
							[
								26.427572873725932,
								46.07564127982386
							],
							[
								26.439990584599737,
								46.03889233816706
							],
							[
								26.44529617079779,
								46.01669799600384
							],
							[
								26.43774596938066,
								45.9893560208855
							],
							[
								26.397267898172633,
								45.96528859829715
							],
							[
								26.387477639236145,
								45.93929642129082
							],
							[
								26.394310615700864,
								45.920706227227946
							],
							[
								26.375681017683995,
								45.90708571506024
							],
							[
								26.387973548630054,
								45.873600652105026
							],
							[
								26.373322990132134,
								45.855627568935134
							],
							[
								26.374995744597896,
								45.82073499245699
							],
							[
								26.392100780208878,
								45.80240527550695
							],
							[
								26.38331555062706,
								45.78270039131295
							],
							[
								26.389367825239546,
								45.766775943004106
							],
							[
								26.350319435429522,
								45.703621953490305
							],
							[
								26.332135951617207,
								45.684212975998705
							],
							[
								26.32418153711047,
								45.64914213168837
							],
							[
								26.326180152231085,
								45.62471392886659
							],
							[
								26.282711099088772,
								45.586962509670954
							],
							[
								26.253032753643733,
								45.600742468989964
							],
							[
								26.247324888338834,
								45.62141041799349
							],
							[
								26.212825913498925,
								45.62184618294601
							],
							[
								26.185434598038444,
								45.608316948261276
							],
							[
								26.16765929108692,
								45.56832223163726
							],
							[
								26.147703749552562,
								45.58493407068069
							],
							[
								26.09334161017022,
								45.51632129967391
							],
							[
								26.1046587371844,
								45.54995650691343
							],
							[
								26.08968265755352,
								45.574126520748834
							],
							[
								26.071745506231775,
								45.57785809009045
							],
							[
								26.053392149601418,
								45.5971395192769
							],
							[
								26.052125365891868,
								45.61826259964576
							],
							[
								26.01298570943951,
								45.62059079252307
							],
							[
								26.020194451210727,
								45.637414519200355
							],
							[
								26.001247837043024,
								45.64689221301091
							],
							[
								25.96376754039914,
								45.64725564911247
							],
							[
								25.97358104059574,
								45.68465184227168
							],
							[
								25.93953902612551,
								45.692492623141824
							],
							[
								25.913439691472522,
								45.709863580851255
							],
							[
								25.859564346722706,
								45.70870429203151
							],
							[
								25.85453790134451,
								45.72250772843009
							],
							[
								25.821584080988455,
								45.725806638252635
							],
							[
								25.83322096531542,
								45.74755702547338
							],
							[
								25.766365782575477,
								45.75675917990745
							],
							[
								25.743550633017477,
								45.770050557988945
							],
							[
								25.676095045035627,
								45.76782630980035
							],
							[
								25.660298233905557,
								45.7901912181188
							],
							[
								25.61172700942305,
								45.82876323815569
							],
							[
								25.5767860735116,
								45.83076061328146
							],
							[
								25.561527299367473,
								45.84913609820845
							],
							[
								25.557757218793,
								45.87647090219491
							],
							[
								25.58746459201211,
								45.872152061863936
							],
							[
								25.605438797013168,
								45.89127965378671
							],
							[
								25.57079153255717,
								45.89721240829782
							],
							[
								25.540352671088236,
								45.93914595511497
							],
							[
								25.54113804366497,
								45.98369251216003
							],
							[
								25.568628401673777,
								46.0026817163684
							],
							[
								25.582050423906868,
								46.02142416766484
							],
							[
								25.55079079830224,
								46.05252613881587
							],
							[
								25.504651215822207,
								46.045320767266396
							],
							[
								25.450813038399133,
								46.07338023991507
							],
							[
								25.451246304475774,
								46.10410936311214
							],
							[
								25.478259856240957,
								46.124111926592505
							],
							[
								25.48038004192543,
								46.14666969653284
							],
							[
								25.508204713201263,
								46.16128209921881
							],
							[
								25.50565957367762,
								46.18534833508497
							],
							[
								25.560567924788213,
								46.21704888891076
							],
							[
								25.583761120281846,
								46.2212981331252
							],
							[
								25.602935532486224,
								46.241652474987376
							],
							[
								25.63081861452833,
								46.24429636640274
							],
							[
								25.698752127392485,
								46.276346435931025
							],
							[
								25.72598556870449,
								46.274580815529134
							],
							[
								25.72413641442528,
								46.25685453942073
							],
							[
								25.790675136746675,
								46.19244569972055
							],
							[
								25.78863974176765,
								46.179743676628455
							],
							[
								25.83659959613855,
								46.142668824639074
							],
							[
								25.847050695283436,
								46.12430995626248
							],
							[
								25.903300166065428,
								46.12208762650682
							],
							[
								25.982656774819752,
								46.1340568017732
							],
							[
								26.01952024688718,
								46.12802118822071
							],
							[
								26.038222514666867,
								46.151179993894736
							],
							[
								26.06242284628936,
								46.16067653256951
							],
							[
								26.117457000721323,
								46.16168007975593
							],
							[
								26.138173222870822,
								46.171265640146444
							],
							[
								26.164584852557095,
								46.160713790527666
							],
							[
								26.187190949299108,
								46.18427035128752
							],
							[
								26.206616202810654,
								46.17908655351109
							],
							[
								26.221327494729877,
								46.206603288423224
							],
							[
								26.26088667974746,
								46.215432094834924
							],
							[
								26.263444450566528,
								46.24635400864673
							]
						]
					]
				},
				"properties": {
					"countyId": 14,
					"countyCode": 145,
					"name": "Covasna",
					"mnemonic": "CV",
					"regionId": 7,
					"region": "Centru",
					"pop1948": 157166,
					"pop1956": 172509,
					"pop1966": 176858,
					"pop1977": 199017,
					"pop1992": 233256,
					"pop2002": 222449,
					"pop2011": 210177,
					"sortCode": 15,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								23.78050656926567,
								44.71399854477414
							],
							[
								23.790980302802545,
								44.680838382979154
							],
							[
								23.786668750304877,
								44.64213583845845
							],
							[
								23.816572306974003,
								44.64757291136564
							],
							[
								23.882034382038412,
								44.6149740996234
							],
							[
								23.898049141932656,
								44.57468824536183
							],
							[
								23.91089844091891,
								44.578509379172544
							],
							[
								23.92820448329873,
								44.530237493303915
							],
							[
								23.897498915063448,
								44.50797848710894
							],
							[
								23.88307270920499,
								44.480594566832174
							],
							[
								23.90427051686147,
								44.47019136533305
							],
							[
								23.882295325482417,
								44.43329928881521
							],
							[
								23.89952785676665,
								44.42497098953171
							],
							[
								23.9682550161503,
								44.410377094213764
							],
							[
								23.95795565865708,
								44.38176317430444
							],
							[
								23.98418769354464,
								44.37312489791918
							],
							[
								24.015100903559542,
								44.37715162493928
							],
							[
								24.045300687384604,
								44.36821769149446
							],
							[
								24.044858218596783,
								44.34890221976678
							],
							[
								24.0696258267733,
								44.33277004426026
							],
							[
								24.0912850284826,
								44.299192883855945
							],
							[
								24.108978594103263,
								44.300774261424564
							],
							[
								24.111949700266553,
								44.26682708777871
							],
							[
								24.147589794447384,
								44.26347503375607
							],
							[
								24.141618784222484,
								44.248691222509905
							],
							[
								24.22689507038921,
								44.229929616448366
							],
							[
								24.22953668504224,
								44.214801341689174
							],
							[
								24.2163951281804,
								44.18020907430944
							],
							[
								24.229362066617995,
								44.16997060373488
							],
							[
								24.215356912751353,
								44.12193458110955
							],
							[
								24.227307514665416,
								44.10969590803871
							],
							[
								24.222616209598403,
								44.06928000174023
							],
							[
								24.17959790202867,
								44.06847520153162
							],
							[
								24.18447291911509,
								44.04900556869285
							],
							[
								24.17354706601894,
								44.006308937484114
							],
							[
								24.263785248887245,
								43.99825498245411
							],
							[
								24.251166916141116,
								43.957201407495326
							],
							[
								24.232427687759397,
								43.961396342287436
							],
							[
								24.223302630916304,
								43.941266319133874
							],
							[
								24.24825515723831,
								43.93022635265951
							],
							[
								24.22669162117199,
								43.885209029300775
							],
							[
								24.22680601038412,
								43.8517608756535
							],
							[
								24.20162586113443,
								43.84686938510753
							],
							[
								24.192308206465608,
								43.810407366287514
							],
							[
								24.155547470874062,
								43.813722843996594
							],
							[
								24.138167832793616,
								43.77545150356358
							],
							[
								24.12937240061115,
								43.774707399616304
							],
							[
								24.112728080136023,
								43.699578199867354
							],
							[
								24.086430818777032,
								43.70220333545381
							],
							[
								24.0607909962836,
								43.718898276161376
							],
							[
								23.966816240390973,
								43.74457218596872
							],
							[
								23.926437070240244,
								43.74505268086771
							],
							[
								23.87349464162448,
								43.752997043237905
							],
							[
								23.810412475723705,
								43.77558872509615
							],
							[
								23.765149813590476,
								43.78587227937364
							],
							[
								23.749848785196654,
								43.80123422178545
							],
							[
								23.70077925271994,
								43.80412151399335
							],
							[
								23.61874815375672,
								43.791345422001825
							],
							[
								23.58102319140156,
								43.79710282555509
							],
							[
								23.543814116735714,
								43.81182416248217
							],
							[
								23.515224317748952,
								43.831084980522405
							],
							[
								23.415230295892613,
								43.85280708524174
							],
							[
								23.3734892541676,
								43.84754431164101
							],
							[
								23.33621761006594,
								43.85004324408594
							],
							[
								23.267785412141848,
								43.846822831588
							],
							[
								23.22896441891134,
								43.837399655317526
							],
							[
								23.130755548790262,
								43.80532365958007
							],
							[
								23.05378549304684,
								43.79560861656126
							],
							[
								23.028987302586092,
								43.803649258962515
							],
							[
								22.97520052737197,
								43.80853584524322
							],
							[
								22.93395601474233,
								43.823565445649834
							],
							[
								22.86651832528919,
								43.83832184019751
							],
							[
								22.842695865149,
								43.86381122304727
							],
							[
								22.83828749343904,
								43.88670210124009
							],
							[
								22.862063107484964,
								43.92390997565546
							],
							[
								22.878732617854357,
								43.9815779685841
							],
							[
								22.891742786248372,
								43.9918072808562
							],
							[
								22.96975686555271,
								44.008528528091766
							],
							[
								23.004051212536005,
								44.01112261207418
							],
							[
								23.04565991825773,
								44.0579089318357
							],
							[
								23.02435278383777,
								44.0893712369256
							],
							[
								22.96386318765463,
								44.098543069927004
							],
							[
								22.983190744159607,
								44.12416939025124
							],
							[
								23.004684510531202,
								44.13977499222896
							],
							[
								23.00601279588037,
								44.158027757383266
							],
							[
								23.085535292736026,
								44.15682191549345
							],
							[
								23.109882668795944,
								44.15015892352758
							],
							[
								23.117854032434284,
								44.18951535104608
							],
							[
								23.095124034446375,
								44.199235221102775
							],
							[
								23.09391429226241,
								44.26245672670936
							],
							[
								23.10906408259488,
								44.27171279954353
							],
							[
								23.131138568598892,
								44.316291686127904
							],
							[
								23.176175067103948,
								44.32448008809787
							],
							[
								23.19329206169756,
								44.3526659821289
							],
							[
								23.218201427140638,
								44.37570029100818
							],
							[
								23.16717144755019,
								44.41200384741321
							],
							[
								23.19719391017635,
								44.41377987803647
							],
							[
								23.205186693068498,
								44.436065665275486
							],
							[
								23.19982952113734,
								44.468022912151824
							],
							[
								23.235947010796004,
								44.47443270826949
							],
							[
								23.24418611916795,
								44.49533479988665
							],
							[
								23.279474475148415,
								44.501539722530374
							],
							[
								23.287418299678052,
								44.53835874427138
							],
							[
								23.31805105528848,
								44.539460288051735
							],
							[
								23.336802702381462,
								44.52367439308745
							],
							[
								23.356640988959125,
								44.54018689817035
							],
							[
								23.380435654099536,
								44.54212896562427
							],
							[
								23.41561648333142,
								44.52708825155769
							],
							[
								23.45216591596614,
								44.552623533924766
							],
							[
								23.45504252902824,
								44.56957307871759
							],
							[
								23.46563823078311,
								44.57858889738351
							],
							[
								23.501540788924757,
								44.58023613340572
							],
							[
								23.514504943344487,
								44.60147915956807
							],
							[
								23.58879332175117,
								44.61512026178272
							],
							[
								23.604773886367045,
								44.59422047396596
							],
							[
								23.71641863290762,
								44.598043448323665
							],
							[
								23.719902035866056,
								44.6273957180935
							],
							[
								23.708359001518474,
								44.657582085735065
							],
							[
								23.726017687216203,
								44.68550314007084
							],
							[
								23.712521878372037,
								44.71483347282428
							],
							[
								23.72169619055935,
								44.72968394150419
							],
							[
								23.747600306084145,
								44.71615502538274
							],
							[
								23.78050656926567,
								44.71399854477414
							]
						]
					]
				},
				"properties": {
					"countyId": 16,
					"countyCode": 163,
					"name": "Dolj",
					"mnemonic": "DJ",
					"regionId": 4,
					"region": "Sud-Vest",
					"pop1948": 615301,
					"pop1956": 642028,
					"pop1966": 691116,
					"pop1977": 750328,
					"pop1992": 762142,
					"pop2002": 734231,
					"pop2011": 660544,
					"sortCode": 17,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								28.116051514336444,
								46.10764168817714
							],
							[
								28.088868947864025,
								46.06922757584121
							],
							[
								28.104950836152767,
								46.05254070073521
							],
							[
								28.09092001513735,
								46.03609915353057
							],
							[
								28.08587784166406,
								46.00913110471328
							],
							[
								28.096209188781934,
								45.997933683096946
							],
							[
								28.12537317087619,
								45.92138600652324
							],
							[
								28.112961520041825,
								45.89958639622568
							],
							[
								28.13217134880979,
								45.875890651107596
							],
							[
								28.10886092226995,
								45.831089158011025
							],
							[
								28.120463692808347,
								45.791108920404845
							],
							[
								28.135251589542992,
								45.77832086561766
							],
							[
								28.15107707224896,
								45.74430747763891
							],
							[
								28.166996992805437,
								45.73591800062495
							],
							[
								28.160486657778712,
								45.70261142993563
							],
							[
								28.171402715402508,
								45.67934679008897
							],
							[
								28.162089053437274,
								45.66045554458623
							],
							[
								28.174150474906504,
								45.6459368562462
							],
							[
								28.14512744495105,
								45.62243710466407
							],
							[
								28.11946782616351,
								45.626812344406304
							],
							[
								28.08950269988231,
								45.6101294923599
							],
							[
								28.120873158201803,
								45.572376444974175
							],
							[
								28.14063552431481,
								45.57599244594172
							],
							[
								28.165082522503962,
								45.54588694010806
							],
							[
								28.166284590475087,
								45.518698423642164
							],
							[
								28.178698296440825,
								45.48440779043995
							],
							[
								28.210776179169912,
								45.46718791479092
							],
							[
								28.193793063093775,
								45.45810723824491
							],
							[
								28.192172857578694,
								45.41533837731356
							],
							[
								28.181999210873627,
								45.41335998509277
							],
							[
								28.130761554090377,
								45.437291667562846
							],
							[
								28.10729227266143,
								45.44127247731447
							],
							[
								28.074912255379623,
								45.4348045554212
							],
							[
								28.03895626681975,
								45.415879928295226
							],
							[
								28.030526496060197,
								45.40434503451004
							],
							[
								27.982984218512254,
								45.39064305517559
							],
							[
								27.956203772885583,
								45.40275366727955
							],
							[
								27.91678263892666,
								45.407039742925754
							],
							[
								27.874005857248214,
								45.41789717775484
							],
							[
								27.86561107213013,
								45.39699074638553
							],
							[
								27.82356106266894,
								45.39651625333625
							],
							[
								27.786339829018534,
								45.40689968599572
							],
							[
								27.782996712990737,
								45.42231912504558
							],
							[
								27.7412159664166,
								45.41422070375746
							],
							[
								27.74340004653565,
								45.43624015174577
							],
							[
								27.71675871769496,
								45.43348037207831
							],
							[
								27.673245432748296,
								45.44619417003127
							],
							[
								27.6923017264304,
								45.470989534313055
							],
							[
								27.66160792937211,
								45.47197138578909
							],
							[
								27.62881105880095,
								45.4546583549751
							],
							[
								27.600749289790674,
								45.48420547123344
							],
							[
								27.55852405586422,
								45.48839240074006
							],
							[
								27.524520218770824,
								45.51959225633739
							],
							[
								27.524037684365965,
								45.55337263656881
							],
							[
								27.504227712211758,
								45.56317244383571
							],
							[
								27.518759616322328,
								45.59025266924984
							],
							[
								27.508823013696446,
								45.624503571
							],
							[
								27.470053154032787,
								45.63656530348656
							],
							[
								27.4522677998874,
								45.65234453938009
							],
							[
								27.4380337652809,
								45.679318346565225
							],
							[
								27.403597789897397,
								45.68231375437755
							],
							[
								27.362359162716352,
								45.72938665287839
							],
							[
								27.35501191751605,
								45.75812679262568
							],
							[
								27.31972590909407,
								45.806135056110335
							],
							[
								27.303236164556264,
								45.845110236332665
							],
							[
								27.282094160666073,
								45.85607487640236
							],
							[
								27.270974924619868,
								45.87402061758416
							],
							[
								27.28277951300361,
								45.886325842217744
							],
							[
								27.2422836516518,
								45.94634997221159
							],
							[
								27.227025987815423,
								46.00914346153912
							],
							[
								27.24070440032699,
								46.04311179998776
							],
							[
								27.275514331166864,
								46.04780326175717
							],
							[
								27.285119061438888,
								46.079350957539596
							],
							[
								27.36829008212308,
								46.07866697024773
							],
							[
								27.429567684779734,
								46.093882663501546
							],
							[
								27.418706509572583,
								46.13145934291431
							],
							[
								27.480963257832677,
								46.12586923414627
							],
							[
								27.50305987611173,
								46.13963805680096
							],
							[
								27.53543282792965,
								46.09456531728122
							],
							[
								27.517169732852125,
								46.08536656409151
							],
							[
								27.531914237138118,
								46.067133520430055
							],
							[
								27.515479566318657,
								46.056209335509614
							],
							[
								27.541335817332776,
								46.02024310972729
							],
							[
								27.56209835505738,
								46.00669377539873
							],
							[
								27.586894624036432,
								46.00762946276375
							],
							[
								27.604459443697404,
								46.01938177856762
							],
							[
								27.599864803613094,
								46.0559327279209
							],
							[
								27.627494877717368,
								46.06149263809977
							],
							[
								27.588056656472727,
								46.11140807135006
							],
							[
								27.597849250565947,
								46.13918764995029
							],
							[
								27.62666828917488,
								46.13431508847197
							],
							[
								27.65045626014898,
								46.14035967413533
							],
							[
								27.671599828183762,
								46.13281352434317
							],
							[
								27.7624255037951,
								46.12813680971668
							],
							[
								27.763518604549255,
								46.11568398633927
							],
							[
								27.795052477722145,
								46.09794507143671
							],
							[
								27.830145967215863,
								46.12718353507687
							],
							[
								27.84525120645077,
								46.126339971715566
							],
							[
								27.846862892843028,
								46.15777340603594
							],
							[
								27.871869979685872,
								46.145576756198444
							],
							[
								27.92619201005845,
								46.15248252660646
							],
							[
								27.939538484687358,
								46.13512884583672
							],
							[
								27.96468721502154,
								46.13969619963549
							],
							[
								27.98423260035746,
								46.11050212126233
							],
							[
								28.04126349664678,
								46.10645352556109
							],
							[
								28.075770035797458,
								46.11754166440205
							],
							[
								28.116051514336444,
								46.10764168817714
							]
						]
					]
				},
				"properties": {
					"countyId": 17,
					"countyCode": 172,
					"name": "Galați",
					"mnemonic": "GL",
					"regionId": 2,
					"region": "Sud-Est",
					"pop1948": 341797,
					"pop1956": 396138,
					"pop1966": 474279,
					"pop1977": 581561,
					"pop1992": 641011,
					"pop2002": 619556,
					"pop2011": 536167,
					"sortCode": 18,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								25.661585098162625,
								47.091662223967106
							],
							[
								25.73435690923222,
								47.073849098788166
							],
							[
								25.74832241451693,
								47.04718681924687
							],
							[
								25.769421428150196,
								47.035261187979145
							],
							[
								25.76965598170596,
								47.01628493886392
							],
							[
								25.789755153770358,
								46.996427476956455
							],
							[
								25.79312567760104,
								46.97879994680528
							],
							[
								25.820117922411928,
								46.976489446431735
							],
							[
								25.838390853639137,
								46.96228500221581
							],
							[
								25.855830746580022,
								46.92079467489238
							],
							[
								25.803705223359806,
								46.929006141956705
							],
							[
								25.80146786864276,
								46.91526665968339
							],
							[
								25.765384611576952,
								46.88446874265804
							],
							[
								25.792846216113066,
								46.848294822760394
							],
							[
								25.779898428792688,
								46.82487816558595
							],
							[
								25.80695946971878,
								46.80519058150248
							],
							[
								25.800200862039375,
								46.76810281074822
							],
							[
								25.807193585820702,
								46.73739624450321
							],
							[
								25.795283705222474,
								46.719902851896094
							],
							[
								25.80433941924269,
								46.706779338407934
							],
							[
								25.867376767131415,
								46.64943459273013
							],
							[
								25.908822435692883,
								46.65561292943352
							],
							[
								25.883851979271142,
								46.688696963341066
							],
							[
								25.9040203378049,
								46.70402995522598
							],
							[
								25.95495360966265,
								46.69523147406861
							],
							[
								25.97516329372174,
								46.69732829496775
							],
							[
								25.981037215910153,
								46.68017270101333
							],
							[
								26.006455560613094,
								46.6597230689948
							],
							[
								26.007440450370822,
								46.63527731714176
							],
							[
								25.990463160850297,
								46.616114259151466
							],
							[
								26.03356448840838,
								46.57036315878899
							],
							[
								26.035058078479796,
								46.544655597411214
							],
							[
								26.07377946831125,
								46.5257378887643
							],
							[
								26.083211405045116,
								46.51247758770243
							],
							[
								26.05838935929734,
								46.49417246366973
							],
							[
								26.018017673683257,
								46.491874819154496
							],
							[
								26.00663829887974,
								46.48165388360459
							],
							[
								26.01694300167644,
								46.46193951245809
							],
							[
								25.987178714731908,
								46.4391205338298
							],
							[
								25.997142652553904,
								46.42007828326359
							],
							[
								26.01963936664192,
								46.409170742039635
							],
							[
								26.046891175561516,
								46.416585979592654
							],
							[
								26.061904805115514,
								46.40070636061689
							],
							[
								26.126595808863073,
								46.39759999073383
							],
							[
								26.16553681582069,
								46.38475571983866
							],
							[
								26.163520079424547,
								46.346348532039045
							],
							[
								26.149249206707488,
								46.32904368458065
							],
							[
								26.156619539381175,
								46.31505884645528
							],
							[
								26.200906954234284,
								46.310918495201534
							],
							[
								26.224419080339104,
								46.316642147395086
							],
							[
								26.23546643635725,
								46.33489198254802
							],
							[
								26.270895629587645,
								46.3449027669106
							],
							[
								26.292836135791205,
								46.334247114134996
							],
							[
								26.274351371249203,
								46.287356360374424
							],
							[
								26.253339652245977,
								46.27713745289876
							],
							[
								26.263444450566528,
								46.24635400864673
							],
							[
								26.26088667974746,
								46.215432094834924
							],
							[
								26.221327494729877,
								46.206603288423224
							],
							[
								26.206616202810654,
								46.17908655351109
							],
							[
								26.187190949299108,
								46.18427035128752
							],
							[
								26.164584852557095,
								46.160713790527666
							],
							[
								26.138173222870822,
								46.171265640146444
							],
							[
								26.117457000721323,
								46.16168007975593
							],
							[
								26.06242284628936,
								46.16067653256951
							],
							[
								26.038222514666867,
								46.151179993894736
							],
							[
								26.01952024688718,
								46.12802118822071
							],
							[
								25.982656774819752,
								46.1340568017732
							],
							[
								25.903300166065428,
								46.12208762650682
							],
							[
								25.847050695283436,
								46.12430995626248
							],
							[
								25.83659959613855,
								46.142668824639074
							],
							[
								25.78863974176765,
								46.179743676628455
							],
							[
								25.790675136746675,
								46.19244569972055
							],
							[
								25.72413641442528,
								46.25685453942073
							],
							[
								25.72598556870449,
								46.274580815529134
							],
							[
								25.698752127392485,
								46.276346435931025
							],
							[
								25.63081861452833,
								46.24429636640274
							],
							[
								25.602935532486224,
								46.241652474987376
							],
							[
								25.583761120281846,
								46.2212981331252
							],
							[
								25.560567924788213,
								46.21704888891076
							],
							[
								25.50565957367762,
								46.18534833508497
							],
							[
								25.508204713201263,
								46.16128209921881
							],
							[
								25.48038004192543,
								46.14666969653284
							],
							[
								25.478259856240957,
								46.124111926592505
							],
							[
								25.451246304475774,
								46.10410936311214
							],
							[
								25.454399428419762,
								46.11999954923995
							],
							[
								25.375611200756232,
								46.13474708452293
							],
							[
								25.329678222416966,
								46.17828653328351
							],
							[
								25.293579520330468,
								46.17709615763282
							],
							[
								25.27312189768133,
								46.18728362296526
							],
							[
								25.249521272162497,
								46.141415186067775
							],
							[
								25.188749190103337,
								46.17097436482136
							],
							[
								25.173255375007443,
								46.16553389301424
							],
							[
								25.13045615626128,
								46.18755590711904
							],
							[
								25.102275302078578,
								46.232573096784655
							],
							[
								25.06920054148874,
								46.2450124589029
							],
							[
								25.037647371944843,
								46.24012401538881
							],
							[
								25.00488379539187,
								46.24832914745745
							],
							[
								24.985871030669582,
								46.23709663214621
							],
							[
								24.93759077654512,
								46.248986777649016
							],
							[
								24.931498338091668,
								46.27053215165043
							],
							[
								24.88896474667407,
								46.29897602846712
							],
							[
								24.869199627667637,
								46.299158670675894
							],
							[
								24.869791978869703,
								46.33959032628808
							],
							[
								24.854336232938287,
								46.349665051529826
							],
							[
								24.884861348646915,
								46.36359974660006
							],
							[
								24.876132894613182,
								46.382174769240976
							],
							[
								24.91990290366762,
								46.388839948437244
							],
							[
								24.931139660071164,
								46.37707431445764
							],
							[
								24.968116320481155,
								46.37934088069574
							],
							[
								24.959929208099474,
								46.403773342537995
							],
							[
								24.935684736432673,
								46.42089257208763
							],
							[
								24.962732385056228,
								46.446939508549214
							],
							[
								24.980689786664087,
								46.44400499478505
							],
							[
								24.995726186289737,
								46.46310662603716
							],
							[
								25.02501008008531,
								46.478418435850166
							],
							[
								25.004342625979074,
								46.51011614445171
							],
							[
								25.022453271065828,
								46.54048728772177
							],
							[
								25.06823862041377,
								46.55525621554853
							],
							[
								25.08727942818937,
								46.57667836380137
							],
							[
								25.13176443530814,
								46.57743549320653
							],
							[
								25.17921581390462,
								46.59915611116704
							],
							[
								25.195029905597384,
								46.625120006519445
							],
							[
								25.220944529495544,
								46.625038260090555
							],
							[
								25.238140426067826,
								46.64910750305497
							],
							[
								25.23683029393839,
								46.669396987663745
							],
							[
								25.280605407245986,
								46.671618645937905
							],
							[
								25.294432921018064,
								46.68732063145778
							],
							[
								25.259490575082552,
								46.727094071544435
							],
							[
								25.2610864088296,
								46.74981438902064
							],
							[
								25.28863012287538,
								46.75213614361221
							],
							[
								25.3179104942687,
								46.769513917480865
							],
							[
								25.313429716481792,
								46.785613931494176
							],
							[
								25.28551727441768,
								46.79749449035901
							],
							[
								25.287549893111535,
								46.830095588777155
							],
							[
								25.261870324842555,
								46.84188925157815
							],
							[
								25.256871736906792,
								46.85773468625601
							],
							[
								25.273138080459212,
								46.8939427313299
							],
							[
								25.262338006343853,
								46.91127611530636
							],
							[
								25.270644138200588,
								46.94575300946183
							],
							[
								25.289073930807838,
								46.97091020566296
							],
							[
								25.28826519463081,
								46.991948121653586
							],
							[
								25.26549190151304,
								47.010655048618055
							],
							[
								25.2703652130194,
								47.03005366878006
							],
							[
								25.23134906654658,
								47.061049591651134
							],
							[
								25.2467125802614,
								47.09793421486988
							],
							[
								25.279353806064655,
								47.10368910659596
							],
							[
								25.296233827694056,
								47.115728707893844
							],
							[
								25.287218388933674,
								47.13323430903255
							],
							[
								25.294395822824285,
								47.155873846941745
							],
							[
								25.35209184482516,
								47.174648637570115
							],
							[
								25.425131982258517,
								47.183857414417346
							],
							[
								25.42539118994698,
								47.17128797775799
							],
							[
								25.456663738539106,
								47.1454814093944
							],
							[
								25.49629037783566,
								47.12816542437239
							],
							[
								25.52680468306915,
								47.10530461697977
							],
							[
								25.53195860151854,
								47.0867482983875
							],
							[
								25.57440229321619,
								47.0846987355698
							],
							[
								25.6015822280221,
								47.077339607948936
							],
							[
								25.621247116149878,
								47.093727300227435
							],
							[
								25.661585098162625,
								47.091662223967106
							]
						]
					]
				},
				"properties": {
					"countyId": 19,
					"countyCode": 190,
					"name": "Harghita",
					"mnemonic": "HR",
					"regionId": 7,
					"region": "Centru",
					"pop1948": 258495,
					"pop1956": 273964,
					"pop1966": 282392,
					"pop1977": 326310,
					"pop1992": 348335,
					"pop2002": 326222,
					"pop2011": 310867,
					"sortCode": 21,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								26.605560284759033,
								44.85700920744339
							],
							[
								26.630938460340865,
								44.81360804763643
							],
							[
								26.644817204996983,
								44.82299088109409
							],
							[
								26.68114321107929,
								44.810727601156565
							],
							[
								26.718729065709713,
								44.809198419980326
							],
							[
								26.776580461023,
								44.81512705022592
							],
							[
								26.81018987665581,
								44.79535678968528
							],
							[
								26.830412710571558,
								44.79769089907036
							],
							[
								26.846444651359796,
								44.81496165349102
							],
							[
								26.878290029138373,
								44.820143993209115
							],
							[
								26.973321715655043,
								44.78828289712257
							],
							[
								27.00793575607187,
								44.82447315130393
							],
							[
								27.05622305898831,
								44.79693702370018
							],
							[
								27.110874074684844,
								44.78200469529898
							],
							[
								27.0979018169543,
								44.744862508044925
							],
							[
								27.134066507832475,
								44.73555014540453
							],
							[
								27.179178902618787,
								44.73524186554727
							],
							[
								27.187445731822756,
								44.75130466327453
							],
							[
								27.148160374407347,
								44.767917429004825
							],
							[
								27.15562307661955,
								44.788787795085724
							],
							[
								27.20346813163149,
								44.78708974399881
							],
							[
								27.25760574044071,
								44.749697665523655
							],
							[
								27.288603875780062,
								44.78582995384871
							],
							[
								27.30958069950912,
								44.77470984394662
							],
							[
								27.34110099726259,
								44.80262509036343
							],
							[
								27.38194133747511,
								44.77469636141769
							],
							[
								27.40773921737116,
								44.77302987488261
							],
							[
								27.436774451452965,
								44.798971209391155
							],
							[
								27.47799231877945,
								44.77522014705062
							],
							[
								27.526812874224902,
								44.774031036634405
							],
							[
								27.540451211086413,
								44.78352658022663
							],
							[
								27.649046759796,
								44.77031722862227
							],
							[
								27.720469374206854,
								44.7669109869925
							],
							[
								27.728268522958825,
								44.80173574224008
							],
							[
								27.775568376817002,
								44.80497455625847
							],
							[
								27.788532660117678,
								44.81878474708892
							],
							[
								27.82646664505042,
								44.82002973608233
							],
							[
								27.820819026650753,
								44.79983692174228
							],
							[
								27.831401094141153,
								44.77910718860151
							],
							[
								27.86938086928693,
								44.77539603736364
							],
							[
								27.881017521888477,
								44.76309299108194
							],
							[
								27.87148186591777,
								44.72618933018186
							],
							[
								27.880316058216017,
								44.709396724835216
							],
							[
								27.91141806795864,
								44.696945142228586
							],
							[
								27.931212789651024,
								44.67971685977214
							],
							[
								27.967956811937203,
								44.66983702288775
							],
							[
								28.03174831786953,
								44.62530802686166
							],
							[
								28.03259011593593,
								44.60727328887684
							],
							[
								28.013715800220943,
								44.584436357333196
							],
							[
								28.01652508947935,
								44.56483443585153
							],
							[
								28.034596833667358,
								44.54742051483296
							],
							[
								28.053216724223137,
								44.50871408773152
							],
							[
								28.089989568647844,
								44.48784849624884
							],
							[
								28.110471414961854,
								44.43724704945264
							],
							[
								28.075974635907478,
								44.41601751129062
							],
							[
								28.043232442050588,
								44.38463257191078
							],
							[
								28.017385629757317,
								44.34026564616973
							],
							[
								27.85505570473026,
								44.38012620084891
							],
							[
								27.834731367263288,
								44.34731976282403
							],
							[
								27.81335357116038,
								44.334150325914365
							],
							[
								27.789099945309847,
								44.35514280828253
							],
							[
								27.771880903376644,
								44.34435922513084
							],
							[
								27.748581594091558,
								44.36186927508337
							],
							[
								27.748003240328483,
								44.39741577679874
							],
							[
								27.731310001308593,
								44.419189422197896
							],
							[
								27.654287693713623,
								44.42094016914022
							],
							[
								27.65939746704789,
								44.44614735286345
							],
							[
								27.639095708330576,
								44.47072251708824
							],
							[
								27.570202389577926,
								44.46782328022412
							],
							[
								27.57195799619663,
								44.55909007965917
							],
							[
								27.54637545954307,
								44.56203034800475
							],
							[
								27.525245158746934,
								44.543824034241766
							],
							[
								27.518514573971515,
								44.49716189977422
							],
							[
								27.50242033822408,
								44.493566766018496
							],
							[
								27.388468323376376,
								44.49624682057784
							],
							[
								27.35216881184896,
								44.51730725983285
							],
							[
								27.345596114519584,
								44.48595722188895
							],
							[
								27.26291045506036,
								44.489192041525804
							],
							[
								27.227880767482457,
								44.493483076263864
							],
							[
								27.206178043051533,
								44.483853983333866
							],
							[
								27.13985736896501,
								44.500938948989045
							],
							[
								27.135500190195227,
								44.48303630098784
							],
							[
								27.091543836510436,
								44.48509564473028
							],
							[
								27.091681125557717,
								44.50860429234053
							],
							[
								27.003478763156306,
								44.50870152452935
							],
							[
								27.00359057392003,
								44.52900481210991
							],
							[
								26.9717340797558,
								44.52895998559925
							],
							[
								26.89270677078631,
								44.51593732959095
							],
							[
								26.82990190958005,
								44.52757034643193
							],
							[
								26.796291273046972,
								44.51103539426753
							],
							[
								26.779272985969097,
								44.521422341333604
							],
							[
								26.786944804176752,
								44.54181495184123
							],
							[
								26.760257441504,
								44.54993473930632
							],
							[
								26.75417304185699,
								44.52807633101777
							],
							[
								26.722703245891466,
								44.53769746055904
							],
							[
								26.725967479838566,
								44.55902761801135
							],
							[
								26.680852455166907,
								44.56242284622416
							],
							[
								26.683818594479394,
								44.59106627108309
							],
							[
								26.664983468033707,
								44.59555305499116
							],
							[
								26.635553160329163,
								44.54087798348657
							],
							[
								26.599353049058013,
								44.523082992861475
							],
							[
								26.56288666131952,
								44.52661540766989
							],
							[
								26.525138238763752,
								44.55622625935836
							],
							[
								26.47984505602787,
								44.57651843749847
							],
							[
								26.450135405032714,
								44.56616374298587
							],
							[
								26.439006994425004,
								44.5486695616004
							],
							[
								26.462576057500435,
								44.54339423043879
							],
							[
								26.428473868673937,
								44.52158847674502
							],
							[
								26.416070104324678,
								44.52169759700258
							],
							[
								26.3886327668879,
								44.53874870151801
							],
							[
								26.36710879919079,
								44.52693461252377
							],
							[
								26.34311292243354,
								44.549323327670585
							],
							[
								26.381574817493693,
								44.585004571061255
							],
							[
								26.401274256236487,
								44.61080782578868
							],
							[
								26.37571749728358,
								44.62086164206213
							],
							[
								26.347136353669875,
								44.669521596458694
							],
							[
								26.374175031913577,
								44.72049102195561
							],
							[
								26.348587455266177,
								44.73179602273273
							],
							[
								26.301827103308554,
								44.768889606989454
							],
							[
								26.341053012522227,
								44.790600159678725
							],
							[
								26.373606170470698,
								44.76114802160729
							],
							[
								26.394168650839568,
								44.76643891567302
							],
							[
								26.45314396026014,
								44.81092360066602
							],
							[
								26.493518892088716,
								44.790847519628734
							],
							[
								26.533720223701447,
								44.82134102589337
							],
							[
								26.525321074224628,
								44.826936670178306
							],
							[
								26.605560284759033,
								44.85700920744339
							]
						]
					]
				},
				"properties": {
					"countyId": 21,
					"countyCode": 216,
					"name": "Ialomița",
					"mnemonic": "IL",
					"regionId": 3,
					"region": "Sud",
					"pop1948": 244750,
					"pop1956": 274655,
					"pop1966": 291373,
					"pop1977": 295965,
					"pop1992": 306145,
					"pop2002": 296572,
					"pop2011": 274148,
					"sortCode": 23,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								28.114685555227553,
								46.83761817566169
							],
							[
								28.07028160652462,
								46.85219733465
							],
							[
								28.014935365698868,
								46.83375991028735
							],
							[
								27.990202912521667,
								46.83841289922897
							],
							[
								27.979548944613313,
								46.85765650050844
							],
							[
								27.941988250722588,
								46.8551793454508
							],
							[
								27.90882091654645,
								46.805832268718966
							],
							[
								27.869636198252568,
								46.8396823855742
							],
							[
								27.866862975923954,
								46.855969488948574
							],
							[
								27.83621303926321,
								46.864764734226235
							],
							[
								27.82126613280675,
								46.853995439104914
							],
							[
								27.797018882468556,
								46.86016275623211
							],
							[
								27.814102750639183,
								46.884184414227825
							],
							[
								27.810461039506514,
								46.9181115867815
							],
							[
								27.770620317573492,
								46.94717086237813
							],
							[
								27.790511519567918,
								46.88596745484226
							],
							[
								27.768519302155802,
								46.876265298705604
							],
							[
								27.705358194038176,
								46.94008978825816
							],
							[
								27.656239137014214,
								46.9760378671781
							],
							[
								27.62111197759399,
								46.991656257956144
							],
							[
								27.606321805753446,
								46.95724265266249
							],
							[
								27.616533268507034,
								46.924612446606496
							],
							[
								27.638124161707374,
								46.91255767331723
							],
							[
								27.631787616172762,
								46.896726074104
							],
							[
								27.584684840916278,
								46.87767692718
							],
							[
								27.547280397732642,
								46.91432150263766
							],
							[
								27.519944635046773,
								46.914536827610235
							],
							[
								27.516532538021536,
								46.87533313340453
							],
							[
								27.49262456862379,
								46.87678338111892
							],
							[
								27.42456804006391,
								46.86251428088834
							],
							[
								27.40205301101337,
								46.87590263991887
							],
							[
								27.398094492297194,
								46.89363205241335
							],
							[
								27.35116290536149,
								46.88140002684147
							],
							[
								27.336403116358568,
								46.86771633934101
							],
							[
								27.278103337006105,
								46.87149169927989
							],
							[
								27.22629790579888,
								46.86805844747403
							],
							[
								27.202395369339992,
								46.88242729361383
							],
							[
								27.195385701827153,
								46.903378034561655
							],
							[
								27.17509385174535,
								46.92264028972678
							],
							[
								27.121953376650353,
								46.95074404375718
							],
							[
								27.15120145859193,
								46.96291544213478
							],
							[
								27.18898661935231,
								46.98819041251006
							],
							[
								27.198119494457902,
								46.978053631739726
							],
							[
								27.22991337121947,
								46.977638232799336
							],
							[
								27.239996518066945,
								47.011436858257646
							],
							[
								27.17699048903685,
								47.04046268803765
							],
							[
								27.183256950202825,
								47.060914107062
							],
							[
								27.155870904321517,
								47.082518511645844
							],
							[
								27.098157598772247,
								47.09196148077693
							],
							[
								27.060381696277915,
								47.08494386094615
							],
							[
								27.052212954589745,
								47.06351955799078
							],
							[
								27.033389159603345,
								47.05657864099375
							],
							[
								27.030664237231264,
								47.03755171908863
							],
							[
								27.002643368605053,
								47.039587493078685
							],
							[
								26.983360587464382,
								47.079316797209685
							],
							[
								26.959811805526225,
								47.044932933761075
							],
							[
								26.90134116272783,
								47.02860319377069
							],
							[
								26.878121742172393,
								47.0576626115836
							],
							[
								26.833838895928064,
								47.04303263996244
							],
							[
								26.81225831029659,
								47.067435605994866
							],
							[
								26.7595671348566,
								47.097839023886
							],
							[
								26.72541359612481,
								47.085137014248865
							],
							[
								26.682796482228312,
								47.11245507980455
							],
							[
								26.636332625079962,
								47.09244274095441
							],
							[
								26.614583761700157,
								47.10955966286275
							],
							[
								26.613673872676056,
								47.146507157586434
							],
							[
								26.602064580479624,
								47.17177445375285
							],
							[
								26.615869110176675,
								47.18378714589685
							],
							[
								26.60617922395334,
								47.199770239543966
							],
							[
								26.574152841844054,
								47.21853737498847
							],
							[
								26.56649665523041,
								47.233586067310895
							],
							[
								26.50779262220526,
								47.27171015604915
							],
							[
								26.548448881229685,
								47.3015241672584
							],
							[
								26.498785746371777,
								47.361849268018986
							],
							[
								26.506773223316742,
								47.372431433584225
							],
							[
								26.492968204357496,
								47.39234073833669
							],
							[
								26.527445210207297,
								47.404639454196946
							],
							[
								26.53291161196756,
								47.38979469973018
							],
							[
								26.570878064273423,
								47.38942512554019
							],
							[
								26.570483190250947,
								47.37654103392071
							],
							[
								26.608802731262212,
								47.35594998288775
							],
							[
								26.680095640519855,
								47.36097813226691
							],
							[
								26.676618230188858,
								47.378981515087474
							],
							[
								26.643956533630234,
								47.398790370350184
							],
							[
								26.685366424558826,
								47.413825337068715
							],
							[
								26.680256212347057,
								47.45707462808302
							],
							[
								26.700574445623594,
								47.47172917421831
							],
							[
								26.726826018345108,
								47.47288396567185
							],
							[
								26.698668735290422,
								47.50914893593186
							],
							[
								26.718767205809776,
								47.515279488577235
							],
							[
								26.753578084757212,
								47.50302803446295
							],
							[
								26.787888880712117,
								47.49986299947287
							],
							[
								26.81778109988524,
								47.50801176330444
							],
							[
								26.8472984204592,
								47.49523851617178
							],
							[
								26.929912007514275,
								47.4922874403326
							],
							[
								26.940881652620053,
								47.49699164379279
							],
							[
								26.990515232333994,
								47.49256223756926
							],
							[
								27.009549872823165,
								47.478269384911506
							],
							[
								27.041882326966636,
								47.43825701620767
							],
							[
								27.064705527206893,
								47.46189800996078
							],
							[
								27.0822338123854,
								47.464383993729065
							],
							[
								27.075438352256402,
								47.51402715656045
							],
							[
								27.100019285736728,
								47.547919247397296
							],
							[
								27.144460821300875,
								47.541734270977464
							],
							[
								27.168868268806204,
								47.52379944451406
							],
							[
								27.203744595099934,
								47.51902055741152
							],
							[
								27.25907749166169,
								47.52906913731958
							],
							[
								27.246403177384472,
								47.54250423560588
							],
							[
								27.263567987835135,
								47.57119862681997
							],
							[
								27.294932206628435,
								47.56695699984235
							],
							[
								27.311866090677086,
								47.577184379097375
							],
							[
								27.34623841368871,
								47.575110712778184
							],
							[
								27.39136585958241,
								47.58948461395424
							],
							[
								27.416624799876377,
								47.57137766053869
							],
							[
								27.44428430741029,
								47.53565854145102
							],
							[
								27.47644868233134,
								47.48497840459155
							],
							[
								27.512249185460387,
								47.47662595728134
							],
							[
								27.54078408001664,
								47.487250011508365
							],
							[
								27.557520940911417,
								47.465569233218105
							],
							[
								27.57331389070823,
								47.46262528683397
							],
							[
								27.55565290254893,
								47.4261192284668
							],
							[
								27.584416296454613,
								47.40804016934063
							],
							[
								27.570387778159198,
								47.39556120143874
							],
							[
								27.573983659891095,
								47.367947792694174
							],
							[
								27.601302463739444,
								47.366784342440916
							],
							[
								27.59467782089647,
								47.348484679121576
							],
							[
								27.63425799407449,
								47.30234789762041
							],
							[
								27.665223338224752,
								47.30725377665132
							],
							[
								27.69238889372751,
								47.291925134579756
							],
							[
								27.70852286048184,
								47.300065067678744
							],
							[
								27.738033408631235,
								47.2849450675397
							],
							[
								27.745127424724707,
								47.24273714411232
							],
							[
								27.787609982406465,
								47.20218075509057
							],
							[
								27.795546775912094,
								47.14934950962013
							],
							[
								27.842147887089673,
								47.12897765689702
							],
							[
								27.832907322797922,
								47.11570988357388
							],
							[
								27.87472562675854,
								47.107930265463395
							],
							[
								27.916042762136925,
								47.067240623323286
							],
							[
								27.944020324695234,
								47.05060581690552
							],
							[
								28.015424808005363,
								47.02351554959384
							],
							[
								28.028749222999217,
								47.030483599884064
							],
							[
								28.049449687584943,
								47.00168817746304
							],
							[
								28.095499886943,
								46.97934819506272
							],
							[
								28.078306840276245,
								46.963343612980175
							],
							[
								28.09839503485306,
								46.94881014588116
							],
							[
								28.102598542278777,
								46.89603307781261
							],
							[
								28.118244524830928,
								46.87915641022153
							],
							[
								28.123114210413203,
								46.85714532326842
							],
							[
								28.114685555227553,
								46.83761817566169
							]
						]
					]
				},
				"properties": {
					"countyId": 22,
					"countyCode": 225,
					"name": "Iași",
					"mnemonic": "IS",
					"regionId": 1,
					"region": "Nord-Est",
					"pop1948": 431586,
					"pop1956": 516635,
					"pop1966": 619027,
					"pop1977": 729243,
					"pop1992": 811342,
					"pop2002": 816910,
					"pop2011": 772348,
					"sortCode": 24,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								24.947100902720734,
								47.72913874739964
							],
							[
								24.94791401007637,
								47.717187350784606
							],
							[
								25.022151738423982,
								47.666392938533484
							],
							[
								25.055483393279577,
								47.65444676891506
							],
							[
								25.05306290473303,
								47.64141172746149
							],
							[
								25.009741477218935,
								47.632944488458236
							],
							[
								24.974228579572987,
								47.61367657410081
							],
							[
								24.960837896040648,
								47.59686576371186
							],
							[
								24.903532535719997,
								47.6027363534942
							],
							[
								24.855863137716792,
								47.59244202364908
							],
							[
								24.82273822399185,
								47.5945065946365
							],
							[
								24.807242651796557,
								47.56666778225728
							],
							[
								24.771143939094465,
								47.57204635540275
							],
							[
								24.715288141217787,
								47.57253962598978
							],
							[
								24.691230309843515,
								47.55854678735935
							],
							[
								24.65204937074773,
								47.558198900030156
							],
							[
								24.63188551050486,
								47.57581780087462
							],
							[
								24.60452235886127,
								47.568624554178825
							],
							[
								24.55704210821182,
								47.5713756895417
							],
							[
								24.46048292664628,
								47.59214574217034
							],
							[
								24.438208829177917,
								47.59064322275105
							],
							[
								24.391372464671093,
								47.604461797500406
							],
							[
								24.34270178445098,
								47.5653727311879
							],
							[
								24.306580158354475,
								47.57893206625084
							],
							[
								24.301943606589713,
								47.55822406211067
							],
							[
								24.27781846081517,
								47.54098002285943
							],
							[
								24.235491198401466,
								47.49990203121407
							],
							[
								24.182014621548415,
								47.50718837209538
							],
							[
								24.15360563708509,
								47.50285975897782
							],
							[
								24.11855944429664,
								47.47956858458913
							],
							[
								24.12881624210514,
								47.46566767458086
							],
							[
								24.119220754731934,
								47.43765910726095
							],
							[
								24.08570186720465,
								47.417521729813714
							],
							[
								24.059469535227446,
								47.37765481543882
							],
							[
								24.022715220964812,
								47.361961802632024
							],
							[
								23.969369330388545,
								47.36562325193287
							],
							[
								23.92264687245647,
								47.3521264337427
							],
							[
								23.897719619410736,
								47.35453985081965
							],
							[
								23.8718346721985,
								47.37170297322302
							],
							[
								23.852443686235418,
								47.368214531228745
							],
							[
								23.841384302482105,
								47.34002074056324
							],
							[
								23.824932558302642,
								47.34474281341534
							],
							[
								23.760069073711247,
								47.32587723409263
							],
							[
								23.72745296508913,
								47.32103872228569
							],
							[
								23.667991084849376,
								47.36519295686321
							],
							[
								23.645357945108568,
								47.39296553975226
							],
							[
								23.578506065746677,
								47.36459959328172
							],
							[
								23.538709726277027,
								47.369611780663334
							],
							[
								23.49277086077756,
								47.36602121070293
							],
							[
								23.479694356436443,
								47.37770928192977
							],
							[
								23.43760095737332,
								47.38095283712461
							],
							[
								23.397219200627305,
								47.39179901397881
							],
							[
								23.377185021381443,
								47.388029681346424
							],
							[
								23.357586334933327,
								47.41592003730681
							],
							[
								23.33623591778623,
								47.41190353487207
							],
							[
								23.3112916221627,
								47.42389163089238
							],
							[
								23.287949043310373,
								47.42276497141669
							],
							[
								23.25430459915437,
								47.4332373983609
							],
							[
								23.22058682662217,
								47.43314715473828
							],
							[
								23.184967026701436,
								47.4548552274409
							],
							[
								23.15664084839445,
								47.44149438443456
							],
							[
								23.106106873372813,
								47.44237055121649
							],
							[
								23.07916100003772,
								47.44490947595224
							],
							[
								23.047939988175543,
								47.43654236773236
							],
							[
								23.0399624230269,
								47.421521428876424
							],
							[
								23.009932714833244,
								47.43387862908017
							],
							[
								22.964214982289878,
								47.439443952844684
							],
							[
								22.983410224360448,
								47.460627714870995
							],
							[
								22.963247685508495,
								47.486462404948035
							],
							[
								22.9995299874088,
								47.4906674807488
							],
							[
								23.04577669453659,
								47.487408646593046
							],
							[
								23.04209411835652,
								47.50755022162549
							],
							[
								23.05311696388674,
								47.555364839715324
							],
							[
								23.06532249489133,
								47.57130560713795
							],
							[
								23.10062470364973,
								47.59181662232286
							],
							[
								23.138850290968726,
								47.62357049669355
							],
							[
								23.166948520686198,
								47.593587035557526
							],
							[
								23.211658455006386,
								47.57058873852051
							],
							[
								23.22951196396987,
								47.5541546131382
							],
							[
								23.258154024357978,
								47.550869505997134
							],
							[
								23.260717128690914,
								47.58086460780857
							],
							[
								23.288976091595774,
								47.588715280031025
							],
							[
								23.284549367012065,
								47.614140567136204
							],
							[
								23.334335296569297,
								47.65240665824729
							],
							[
								23.3633410415266,
								47.66540572513951
							],
							[
								23.362744715993102,
								47.69984945954319
							],
							[
								23.27212653576995,
								47.721988024721874
							],
							[
								23.23009852786775,
								47.73916269823162
							],
							[
								23.22482486900214,
								47.76640569511752
							],
							[
								23.261753759915152,
								47.797288889035386
							],
							[
								23.308679814155045,
								47.78604431926807
							],
							[
								23.311200811038113,
								47.7749119280488
							],
							[
								23.388214262671674,
								47.77919268591168
							],
							[
								23.45087319147311,
								47.7618139964751
							],
							[
								23.472290442668232,
								47.779296315431246
							],
							[
								23.53646091782922,
								47.80155956104454
							],
							[
								23.559146971737846,
								47.80380410697946
							],
							[
								23.594091406254098,
								47.84913666300172
							],
							[
								23.612937962718046,
								47.84606844189762
							],
							[
								23.639805491261335,
								47.86415847811005
							],
							[
								23.62812685076931,
								47.88497382116958
							],
							[
								23.590373782503395,
								47.89874383495107
							],
							[
								23.563269988315156,
								47.9439267139237
							],
							[
								23.54280246474651,
								47.9413193158165
							],
							[
								23.493603569789414,
								47.96782488723651
							],
							[
								23.52569041348433,
								48.00478386228525
							],
							[
								23.566331800951275,
								48.00306690066193
							],
							[
								23.61031814248695,
								48.00805505447104
							],
							[
								23.642189617114592,
								47.999730642787675
							],
							[
								23.664662555237243,
								47.983727892808716
							],
							[
								23.707627398353278,
								47.994288510068856
							],
							[
								23.771807068302152,
								47.99494075209411
							],
							[
								23.815759474340304,
								47.982591278167966
							],
							[
								23.85098727447346,
								47.93690487739807
							],
							[
								23.88438376474775,
								47.944241053385674
							],
							[
								23.94196910290226,
								47.948461510494184
							],
							[
								23.957258686898477,
								47.965010108361234
							],
							[
								23.980319391936405,
								47.95971365960798
							],
							[
								24.009048119381987,
								47.96725637804581
							],
							[
								24.0318434138241,
								47.94927349946506
							],
							[
								24.062187441672616,
								47.95340033715999
							],
							[
								24.098592039564952,
								47.936509932557506
							],
							[
								24.11267678699771,
								47.91480230877812
							],
							[
								24.138532504711307,
								47.91200934515345
							],
							[
								24.16507768348489,
								47.920265987076924
							],
							[
								24.196672564928836,
								47.91606373367388
							],
							[
								24.228263953639903,
								47.89647968239675
							],
							[
								24.27961413363479,
								47.90600436376035
							],
							[
								24.32489060885716,
								47.92589612358702
							],
							[
								24.350137347734027,
								47.91553492568166
							],
							[
								24.381588318084802,
								47.926583725277176
							],
							[
								24.3921829670925,
								47.95279821028462
							],
							[
								24.43586866594632,
								47.970508191317606
							],
							[
								24.50200531426168,
								47.952282272410145
							],
							[
								24.52699082794444,
								47.961538911153035
							],
							[
								24.583292733105413,
								47.964866361609104
							],
							[
								24.601686188706836,
								47.94533321042676
							],
							[
								24.623370550696748,
								47.95176815658351
							],
							[
								24.635031016911466,
								47.924570862611944
							],
							[
								24.673772717939098,
								47.896376229345215
							],
							[
								24.665779748888024,
								47.87650320023611
							],
							[
								24.70578564311101,
								47.84012092198927
							],
							[
								24.734396262728026,
								47.843852409831165
							],
							[
								24.752960701228066,
								47.829735287786924
							],
							[
								24.827740062084533,
								47.82047307675198
							],
							[
								24.821524757840105,
								47.80621088122866
							],
							[
								24.83651424902683,
								47.77951678866956
							],
							[
								24.878188170490734,
								47.752656584740215
							],
							[
								24.883139981034866,
								47.72436833849112
							],
							[
								24.947100902720734,
								47.72913874739964
							]
						]
					]
				},
				"properties": {
					"countyId": 24,
					"countyCode": 243,
					"name": "Maramureș",
					"mnemonic": "MM",
					"regionId": 6,
					"region": "Nord-Vest",
					"pop1948": 321287,
					"pop1956": 367114,
					"pop1966": 427645,
					"pop1977": 492860,
					"pop1992": 540099,
					"pop2002": 510110,
					"pop2011": 478659,
					"sortCode": 26,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								23.45504252902824,
								44.56957307871759
							],
							[
								23.45216591596614,
								44.552623533924766
							],
							[
								23.41561648333142,
								44.52708825155769
							],
							[
								23.380435654099536,
								44.54212896562427
							],
							[
								23.356640988959125,
								44.54018689817035
							],
							[
								23.336802702381462,
								44.52367439308745
							],
							[
								23.31805105528848,
								44.539460288051735
							],
							[
								23.287418299678052,
								44.53835874427138
							],
							[
								23.279474475148415,
								44.501539722530374
							],
							[
								23.24418611916795,
								44.49533479988665
							],
							[
								23.235947010796004,
								44.47443270826949
							],
							[
								23.19982952113734,
								44.468022912151824
							],
							[
								23.205186693068498,
								44.436065665275486
							],
							[
								23.19719391017635,
								44.41377987803647
							],
							[
								23.16717144755019,
								44.41200384741321
							],
							[
								23.218201427140638,
								44.37570029100818
							],
							[
								23.19329206169756,
								44.3526659821289
							],
							[
								23.176175067103948,
								44.32448008809787
							],
							[
								23.131138568598892,
								44.316291686127904
							],
							[
								23.10906408259488,
								44.27171279954353
							],
							[
								23.09391429226241,
								44.26245672670936
							],
							[
								23.095124034446375,
								44.199235221102775
							],
							[
								23.117854032434284,
								44.18951535104608
							],
							[
								23.109882668795944,
								44.15015892352758
							],
							[
								23.085535292736026,
								44.15682191549345
							],
							[
								23.00601279588037,
								44.158027757383266
							],
							[
								23.004684510531202,
								44.13977499222896
							],
							[
								22.983190744159607,
								44.12416939025124
							],
							[
								22.96386318765463,
								44.098543069927004
							],
							[
								22.925482237444623,
								44.10214970420162
							],
							[
								22.871017452159254,
								44.13314086902767
							],
							[
								22.813217138733673,
								44.153834237815815
							],
							[
								22.74942420702626,
								44.197864310448146
							],
							[
								22.69449051072066,
								44.204492049033135
							],
							[
								22.673409466480987,
								44.216834999530974
							],
							[
								22.685223270889573,
								44.265179765203456
							],
							[
								22.671879509905732,
								44.283607538673074
							],
							[
								22.563645373943853,
								44.30553141286881
							],
							[
								22.523911057257806,
								44.33931268084954
							],
							[
								22.503768058163242,
								44.380471022445064
							],
							[
								22.501699132305145,
								44.4172705651403
							],
							[
								22.464297205764126,
								44.444877375437635
							],
							[
								22.45600192090643,
								44.47004502636657
							],
							[
								22.473929935922936,
								44.480637628344546
							],
							[
								22.516827519532583,
								44.471677960736805
							],
							[
								22.54822001317922,
								44.48168771370231
							],
							[
								22.560378999920257,
								44.505175884045066
							],
							[
								22.56290635907624,
								44.53315337090814
							],
							[
								22.582178028392722,
								44.549326070921104
							],
							[
								22.614698241978804,
								44.552408443242456
							],
							[
								22.642756596704356,
								44.544521349847
							],
							[
								22.68430969941521,
								44.519803409473035
							],
							[
								22.711429672855225,
								44.5194925858735
							],
							[
								22.758967493968832,
								44.53672496393222
							],
							[
								22.756361904638677,
								44.56217464434263
							],
							[
								22.709212299616322,
								44.601996551725165
							],
							[
								22.668145182139956,
								44.61924361080727
							],
							[
								22.618218868983643,
								44.61551453133712
							],
							[
								22.568823544716857,
								44.63709137894432
							],
							[
								22.50906244415331,
								44.68976373781499
							],
							[
								22.46390310628381,
								44.71477407186187
							],
							[
								22.420932943916668,
								44.706213920006896
							],
							[
								22.398429409357767,
								44.68462542131547
							],
							[
								22.3679281414975,
								44.67227131835016
							],
							[
								22.3316541785928,
								44.67527312154245
							],
							[
								22.303445850765815,
								44.653210516394566
							],
							[
								22.299923807653908,
								44.638669478552266
							],
							[
								22.274397357246976,
								44.625439316969775
							],
							[
								22.264512140665634,
								44.59622068709853
							],
							[
								22.2302408075041,
								44.56139032670159
							],
							[
								22.187270654662484,
								44.48496099618016
							],
							[
								22.173082248813287,
								44.47593149712202
							],
							[
								22.137121055736262,
								44.47297043910737
							],
							[
								22.076255968244052,
								44.50528531991322
							],
							[
								22.06811776272728,
								44.52871353225362
							],
							[
								22.035275755072917,
								44.54924269145078
							],
							[
								22.016154579123118,
								44.59921511952656
							],
							[
								22.091709882646057,
								44.619415098551364
							],
							[
								22.117403421272794,
								44.591823438996634
							],
							[
								22.147839894028028,
								44.587161887491625
							],
							[
								22.176298855646824,
								44.62450606252843
							],
							[
								22.171376648350012,
								44.64857967814829
							],
							[
								22.139170080479868,
								44.660214535976166
							],
							[
								22.157443181370052,
								44.730238057211565
							],
							[
								22.183966105996788,
								44.74071574075412
							],
							[
								22.204164215839562,
								44.76141552887263
							],
							[
								22.195176051875578,
								44.77903741376149
							],
							[
								22.207309174927925,
								44.81665350334533
							],
							[
								22.24350109017159,
								44.80748651287208
							],
							[
								22.263161195985738,
								44.78475332296913
							],
							[
								22.310863152122494,
								44.77501757783232
							],
							[
								22.341647746184165,
								44.77406936786058
							],
							[
								22.35395178999023,
								44.753070204380705
							],
							[
								22.388948568812715,
								44.76137085884575
							],
							[
								22.42037338263876,
								44.75846835233264
							],
							[
								22.424047955448355,
								44.79915423186792
							],
							[
								22.446414022698644,
								44.82314587130389
							],
							[
								22.488765436027972,
								44.89408668280306
							],
							[
								22.482190234770346,
								44.90691740055039
							],
							[
								22.495545019291566,
								44.924409304214244
							],
							[
								22.486609910979833,
								44.94929997937807
							],
							[
								22.50934940129168,
								44.96719434584803
							],
							[
								22.503642642781067,
								44.984010322010214
							],
							[
								22.536630358815366,
								45.002043608831386
							],
							[
								22.563646804094788,
								45.03452087174773
							],
							[
								22.585015495698745,
								45.04353248851344
							],
							[
								22.656637356302816,
								45.10817772970089
							],
							[
								22.68255228429201,
								45.106186407437164
							],
							[
								22.703134016722547,
								45.06892986693058
							],
							[
								22.733291540658133,
								45.074945907287386
							],
							[
								22.73837074377802,
								45.05895587461741
							],
							[
								22.76811012642639,
								45.06112800894881
							],
							[
								22.78746721687116,
								45.04440881771442
							],
							[
								22.813882655061807,
								45.03654089175362
							],
							[
								22.856847632071982,
								44.98995330078827
							],
							[
								22.880083260807663,
								44.99627362578361
							],
							[
								22.890116315356227,
								44.97357051937468
							],
							[
								22.869909519383967,
								44.961516109813296
							],
							[
								22.87771938113047,
								44.92590687467894
							],
							[
								22.895813006326527,
								44.88456825148225
							],
							[
								22.889484629981546,
								44.8531036238271
							],
							[
								22.90837451831631,
								44.82640770633789
							],
							[
								22.94305765093998,
								44.81151584944179
							],
							[
								22.961169593662838,
								44.79471920256187
							],
							[
								22.99582922512879,
								44.776548794570225
							],
							[
								23.003415795478446,
								44.747647839783525
							],
							[
								23.020768744378998,
								44.736062049958726
							],
							[
								23.047462310566356,
								44.73397785066902
							],
							[
								23.062187284963994,
								44.712061984467944
							],
							[
								23.110702066403547,
								44.689155753327796
							],
							[
								23.131710440618615,
								44.68647903292345
							],
							[
								23.193574623365866,
								44.69398302745601
							],
							[
								23.206528154179317,
								44.67901520873888
							],
							[
								23.236353519541066,
								44.67160845168135
							],
							[
								23.293487192587236,
								44.67083098951802
							],
							[
								23.31964642279619,
								44.647845248531404
							],
							[
								23.40687205363921,
								44.610922701376126
							],
							[
								23.403623588058466,
								44.591177754950536
							],
							[
								23.45504252902824,
								44.56957307871759
							]
						]
					]
				},
				"properties": {
					"countyId": 25,
					"countyCode": 252,
					"name": "Mehedinți",
					"mnemonic": "MH",
					"regionId": 4,
					"region": "Sud-Vest",
					"pop1948": 304788,
					"pop1956": 304091,
					"pop1966": 310021,
					"pop1977": 322371,
					"pop1992": 332673,
					"pop2002": 306732,
					"pop2011": 265390,
					"sortCode": 27,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								25.2467125802614,
								47.09793421486988
							],
							[
								25.23134906654658,
								47.061049591651134
							],
							[
								25.2703652130194,
								47.03005366878006
							],
							[
								25.26549190151304,
								47.010655048618055
							],
							[
								25.28826519463081,
								46.991948121653586
							],
							[
								25.289073930807838,
								46.97091020566296
							],
							[
								25.270644138200588,
								46.94575300946183
							],
							[
								25.262338006343853,
								46.91127611530636
							],
							[
								25.273138080459212,
								46.8939427313299
							],
							[
								25.256871736906792,
								46.85773468625601
							],
							[
								25.261870324842555,
								46.84188925157815
							],
							[
								25.287549893111535,
								46.830095588777155
							],
							[
								25.28551727441768,
								46.79749449035901
							],
							[
								25.313429716481792,
								46.785613931494176
							],
							[
								25.3179104942687,
								46.769513917480865
							],
							[
								25.28863012287538,
								46.75213614361221
							],
							[
								25.2610864088296,
								46.74981438902064
							],
							[
								25.259490575082552,
								46.727094071544435
							],
							[
								25.294432921018064,
								46.68732063145778
							],
							[
								25.280605407245986,
								46.671618645937905
							],
							[
								25.23683029393839,
								46.669396987663745
							],
							[
								25.238140426067826,
								46.64910750305497
							],
							[
								25.220944529495544,
								46.625038260090555
							],
							[
								25.195029905597384,
								46.625120006519445
							],
							[
								25.17921581390462,
								46.59915611116704
							],
							[
								25.13176443530814,
								46.57743549320653
							],
							[
								25.08727942818937,
								46.57667836380137
							],
							[
								25.06823862041377,
								46.55525621554853
							],
							[
								25.022453271065828,
								46.54048728772177
							],
							[
								25.004342625979074,
								46.51011614445171
							],
							[
								25.02501008008531,
								46.478418435850166
							],
							[
								24.995726186289737,
								46.46310662603716
							],
							[
								24.980689786664087,
								46.44400499478505
							],
							[
								24.962732385056228,
								46.446939508549214
							],
							[
								24.935684736432673,
								46.42089257208763
							],
							[
								24.959929208099474,
								46.403773342537995
							],
							[
								24.968116320481155,
								46.37934088069574
							],
							[
								24.931139660071164,
								46.37707431445764
							],
							[
								24.91990290366762,
								46.388839948437244
							],
							[
								24.876132894613182,
								46.382174769240976
							],
							[
								24.884861348646915,
								46.36359974660006
							],
							[
								24.854336232938287,
								46.349665051529826
							],
							[
								24.869791978869703,
								46.33959032628808
							],
							[
								24.869199627667637,
								46.299158670675894
							],
							[
								24.88896474667407,
								46.29897602846712
							],
							[
								24.931498338091668,
								46.27053215165043
							],
							[
								24.93759077654512,
								46.248986777649016
							],
							[
								24.985871030669582,
								46.23709663214621
							],
							[
								25.00488379539187,
								46.24832914745745
							],
							[
								25.037647371944843,
								46.24012401538881
							],
							[
								25.06920054148874,
								46.2450124589029
							],
							[
								25.102275302078578,
								46.232573096784655
							],
							[
								25.13045615626128,
								46.18755590711904
							],
							[
								25.173255375007443,
								46.16553389301424
							],
							[
								25.12583318919789,
								46.14238584131825
							],
							[
								25.07913890636589,
								46.1494383489005
							],
							[
								25.046774243420007,
								46.13320929572475
							],
							[
								25.019550495012748,
								46.14197353295611
							],
							[
								24.958021618781775,
								46.11218655744039
							],
							[
								24.94655309501842,
								46.079122988700206
							],
							[
								24.918190547060934,
								46.07952660927336
							],
							[
								24.900377143044032,
								46.10615727316567
							],
							[
								24.863174069770725,
								46.11092871638337
							],
							[
								24.81815429081137,
								46.09425329583608
							],
							[
								24.77648483782257,
								46.09347102977336
							],
							[
								24.697167045888722,
								46.08320543352104
							],
							[
								24.672499610056445,
								46.105087480106555
							],
							[
								24.682510449493805,
								46.183201409712126
							],
							[
								24.67724877232178,
								46.21480037406478
							],
							[
								24.66680778891386,
								46.2251652044649
							],
							[
								24.676558017594907,
								46.25016483606034
							],
							[
								24.66634966387246,
								46.274458121310005
							],
							[
								24.644842748972685,
								46.27871571152241
							],
							[
								24.604291660826885,
								46.251898636802814
							],
							[
								24.591842369136142,
								46.27221731749412
							],
							[
								24.56271555646749,
								46.257691093005924
							],
							[
								24.53846748007377,
								46.25978692832482
							],
							[
								24.504825541181642,
								46.24538446612527
							],
							[
								24.489253737737624,
								46.25840131715043
							],
							[
								24.409310671556614,
								46.26136158098126
							],
							[
								24.37889230835835,
								46.24365475935361
							],
							[
								24.29906676737429,
								46.25512142338073
							],
							[
								24.27287232964932,
								46.276371636955474
							],
							[
								24.264280022682286,
								46.253440141086735
							],
							[
								24.231314937452936,
								46.25965334789622
							],
							[
								24.192161653409325,
								46.28243594811986
							],
							[
								24.169193472334022,
								46.26887706049084
							],
							[
								24.1591963487894,
								46.29146709690279
							],
							[
								24.14236224538368,
								46.300987714497175
							],
							[
								24.148449503835227,
								46.32620685601894
							],
							[
								24.1341425011133,
								46.335802867792594
							],
							[
								24.082611963805522,
								46.334469138737596
							],
							[
								23.995782887274235,
								46.371820438874195
							],
							[
								23.989538444340273,
								46.38105096524699
							],
							[
								24.024555428899195,
								46.40335956959978
							],
							[
								24.035713696200116,
								46.43239672401443
							],
							[
								24.022860994157092,
								46.44964072194847
							],
							[
								23.99830649747367,
								46.42774895779318
							],
							[
								23.98527786280564,
								46.43093092289744
							],
							[
								24.00485633550328,
								46.44222030660962
							],
							[
								23.972381100690754,
								46.458466911943525
							],
							[
								23.973704732541307,
								46.48197037684924
							],
							[
								23.959036645069943,
								46.51447240756582
							],
							[
								23.98511217352136,
								46.540913987767574
							],
							[
								24.029306209110185,
								46.53337797195021
							],
							[
								24.045374332607906,
								46.5450634100191
							],
							[
								24.06440803456719,
								46.60923181314651
							],
							[
								24.02616798954742,
								46.61762916210022
							],
							[
								24.033580548352226,
								46.64511342358784
							],
							[
								24.102390921699854,
								46.66162521924639
							],
							[
								24.124362803209284,
								46.70010834086772
							],
							[
								24.09004423972588,
								46.71073473305899
							],
							[
								24.067638994198244,
								46.7341936610386
							],
							[
								24.087889930725517,
								46.75358205350967
							],
							[
								24.1261242395802,
								46.74646866560588
							],
							[
								24.118360024524183,
								46.77434637410828
							],
							[
								24.16754011780126,
								46.781211709140365
							],
							[
								24.179577719104305,
								46.804709993658285
							],
							[
								24.21478166799211,
								46.782147611501614
							],
							[
								24.301146758165178,
								46.75315266254003
							],
							[
								24.339563037495193,
								46.75767175390674
							],
							[
								24.36208768006033,
								46.746351761923265
							],
							[
								24.397432542017306,
								46.75188959572784
							],
							[
								24.40924729894434,
								46.772121164968254
							],
							[
								24.450326919068537,
								46.7657393159899
							],
							[
								24.472250909891105,
								46.78304530849962
							],
							[
								24.449372742995838,
								46.789965101058556
							],
							[
								24.458330325487935,
								46.820150391802066
							],
							[
								24.50987953997326,
								46.85038158067542
							],
							[
								24.524368290402748,
								46.852591283159775
							],
							[
								24.540202441074772,
								46.89160100076372
							],
							[
								24.58545833559933,
								46.92881822173734
							],
							[
								24.593906349409153,
								46.94489588010497
							],
							[
								24.638671465580384,
								46.94522448870572
							],
							[
								24.63995444332575,
								46.92545692513445
							],
							[
								24.662155608404312,
								46.910133156491156
							],
							[
								24.70907459735482,
								46.90205880757614
							],
							[
								24.754297536084895,
								46.90972796353313
							],
							[
								24.72171021392454,
								46.93238822470713
							],
							[
								24.74112212942085,
								46.953472708085336
							],
							[
								24.74300450029316,
								46.98594643954009
							],
							[
								24.776946217119953,
								47.01346281415124
							],
							[
								24.79465104995303,
								47.05096644196248
							],
							[
								24.870211374147196,
								47.10485591955543
							],
							[
								24.89864560741659,
								47.10854425937971
							],
							[
								24.93244533713674,
								47.09619680839667
							],
							[
								24.949396257458577,
								47.117570739229855
							],
							[
								25.018862812439842,
								47.112366003034104
							],
							[
								25.063384744406402,
								47.1365532575269
							],
							[
								25.09382754456983,
								47.12065257659764
							],
							[
								25.122220864979937,
								47.12188835464243
							],
							[
								25.14389542698689,
								47.113248815105
							],
							[
								25.16429856370546,
								47.12965541554469
							],
							[
								25.2467125802614,
								47.09793421486988
							]
						]
					]
				},
				"properties": {
					"countyId": 26,
					"countyCode": 261,
					"name": "Mureș",
					"mnemonic": "MS",
					"regionId": 7,
					"region": "Centru",
					"pop1948": 461403,
					"pop1956": 513261,
					"pop1966": 561598,
					"pop1977": 605345,
					"pop1992": 610053,
					"pop2002": 580851,
					"pop2011": 550846,
					"sortCode": 28,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								26.50779262220526,
								47.27171015604915
							],
							[
								26.56649665523041,
								47.233586067310895
							],
							[
								26.574152841844054,
								47.21853737498847
							],
							[
								26.60617922395334,
								47.199770239543966
							],
							[
								26.615869110176675,
								47.18378714589685
							],
							[
								26.602064580479624,
								47.17177445375285
							],
							[
								26.613673872676056,
								47.146507157586434
							],
							[
								26.614583761700157,
								47.10955966286275
							],
							[
								26.636332625079962,
								47.09244274095441
							],
							[
								26.682796482228312,
								47.11245507980455
							],
							[
								26.72541359612481,
								47.085137014248865
							],
							[
								26.7595671348566,
								47.097839023886
							],
							[
								26.81225831029659,
								47.067435605994866
							],
							[
								26.833838895928064,
								47.04303263996244
							],
							[
								26.878121742172393,
								47.0576626115836
							],
							[
								26.90134116272783,
								47.02860319377069
							],
							[
								26.959811805526225,
								47.044932933761075
							],
							[
								26.983360587464382,
								47.079316797209685
							],
							[
								27.002643368605053,
								47.039587493078685
							],
							[
								27.030664237231264,
								47.03755171908863
							],
							[
								27.033389159603345,
								47.05657864099375
							],
							[
								27.052212954589745,
								47.06351955799078
							],
							[
								27.060381696277915,
								47.08494386094615
							],
							[
								27.098157598772247,
								47.09196148077693
							],
							[
								27.155870904321517,
								47.082518511645844
							],
							[
								27.183256950202825,
								47.060914107062
							],
							[
								27.17699048903685,
								47.04046268803765
							],
							[
								27.239996518066945,
								47.011436858257646
							],
							[
								27.22991337121947,
								46.977638232799336
							],
							[
								27.198119494457902,
								46.978053631739726
							],
							[
								27.18898661935231,
								46.98819041251006
							],
							[
								27.15120145859193,
								46.96291544213478
							],
							[
								27.121953376650353,
								46.95074404375718
							],
							[
								27.17509385174535,
								46.92264028972678
							],
							[
								27.195385701827153,
								46.903378034561655
							],
							[
								27.202395369339992,
								46.88242729361383
							],
							[
								27.188323060712104,
								46.871488016574524
							],
							[
								27.21940606696834,
								46.848588927593816
							],
							[
								27.215082292931456,
								46.78863112861158
							],
							[
								27.20622371456061,
								46.769865479435744
							],
							[
								27.16319826478078,
								46.749506849211734
							],
							[
								27.160521731802344,
								46.73435317678658
							],
							[
								27.11529532037496,
								46.74871997290464
							],
							[
								27.10209885463364,
								46.76882204011156
							],
							[
								27.045382513808082,
								46.77237299718898
							],
							[
								26.946493123147807,
								46.758305098011604
							],
							[
								26.94610150245589,
								46.77301057403828
							],
							[
								26.909332963791833,
								46.78528075983771
							],
							[
								26.909397159751588,
								46.82726034304867
							],
							[
								26.84950802349723,
								46.80468996396261
							],
							[
								26.849500451422507,
								46.77992771014393
							],
							[
								26.821577835977152,
								46.77318624259169
							],
							[
								26.84187843629865,
								46.751334334944744
							],
							[
								26.7863496444225,
								46.71691580311891
							],
							[
								26.758739272685734,
								46.736840931815294
							],
							[
								26.754279255132268,
								46.756216596028814
							],
							[
								26.707627689148048,
								46.77186427518906
							],
							[
								26.675952109303488,
								46.76770654414239
							],
							[
								26.66486259598439,
								46.73635810008082
							],
							[
								26.6473875747246,
								46.72291280435381
							],
							[
								26.60830922294417,
								46.711896587167224
							],
							[
								26.56993331209121,
								46.67870330866118
							],
							[
								26.54637807476307,
								46.6785185120036
							],
							[
								26.52996751850715,
								46.69235854261728
							],
							[
								26.506371512571427,
								46.694323560537555
							],
							[
								26.47110702844634,
								46.67728342329033
							],
							[
								26.43789015705052,
								46.685099383050115
							],
							[
								26.41047959830148,
								46.67858162893704
							],
							[
								26.390472157331356,
								46.651020682368916
							],
							[
								26.300993170563753,
								46.653435217886745
							],
							[
								26.265726146951522,
								46.70320644280246
							],
							[
								26.218353322761725,
								46.68013594211165
							],
							[
								26.216181575573213,
								46.65603159568074
							],
							[
								26.15945099712587,
								46.64172167972454
							],
							[
								26.127191871642378,
								46.65904004465235
							],
							[
								26.10073574065779,
								46.646934254695225
							],
							[
								26.079203614504856,
								46.65846838115379
							],
							[
								26.081513746230605,
								46.673309217257255
							],
							[
								26.067262339431938,
								46.71235481411501
							],
							[
								26.052821077308298,
								46.71681200849052
							],
							[
								26.01864427513662,
								46.70126133934678
							],
							[
								25.97516329372174,
								46.69732829496775
							],
							[
								25.95495360966265,
								46.69523147406861
							],
							[
								25.9040203378049,
								46.70402995522598
							],
							[
								25.883851979271142,
								46.688696963341066
							],
							[
								25.908822435692883,
								46.65561292943352
							],
							[
								25.867376767131415,
								46.64943459273013
							],
							[
								25.80433941924269,
								46.706779338407934
							],
							[
								25.795283705222474,
								46.719902851896094
							],
							[
								25.807193585820702,
								46.73739624450321
							],
							[
								25.800200862039375,
								46.76810281074822
							],
							[
								25.80695946971878,
								46.80519058150248
							],
							[
								25.779898428792688,
								46.82487816558595
							],
							[
								25.792846216113066,
								46.848294822760394
							],
							[
								25.765384611576952,
								46.88446874265804
							],
							[
								25.80146786864276,
								46.91526665968339
							],
							[
								25.803705223359806,
								46.929006141956705
							],
							[
								25.855830746580022,
								46.92079467489238
							],
							[
								25.838390853639137,
								46.96228500221581
							],
							[
								25.820117922411928,
								46.976489446431735
							],
							[
								25.79312567760104,
								46.97879994680528
							],
							[
								25.789755153770358,
								46.996427476956455
							],
							[
								25.76965598170596,
								47.01628493886392
							],
							[
								25.769421428150196,
								47.035261187979145
							],
							[
								25.74832241451693,
								47.04718681924687
							],
							[
								25.73435690923222,
								47.073849098788166
							],
							[
								25.661585098162625,
								47.091662223967106
							],
							[
								25.664652795047147,
								47.119997020998404
							],
							[
								25.697749072678764,
								47.143423799562456
							],
							[
								25.700173604809077,
								47.17053236358799
							],
							[
								25.721105522232993,
								47.174956234950386
							],
							[
								25.71599622310305,
								47.19706574676782
							],
							[
								25.743595028132546,
								47.22633452209203
							],
							[
								25.785700472874368,
								47.23764698985706
							],
							[
								25.812947078390426,
								47.26020589864104
							],
							[
								25.78941123669289,
								47.28783599767506
							],
							[
								25.77341822849091,
								47.321020571127065
							],
							[
								25.83593051788245,
								47.31165803117005
							],
							[
								25.868920713170134,
								47.29437513465288
							],
							[
								25.900484705684093,
								47.26199372563961
							],
							[
								25.923615977254133,
								47.2591572768134
							],
							[
								25.9324885843931,
								47.27715315588895
							],
							[
								25.97854652341205,
								47.288721833975536
							],
							[
								26.01841132193157,
								47.28904525256
							],
							[
								26.05577334429495,
								47.27458990444032
							],
							[
								26.125657865588835,
								47.29733806931647
							],
							[
								26.13683535070782,
								47.28865181424068
							],
							[
								26.18801263184547,
								47.306723973629744
							],
							[
								26.25213158606683,
								47.279637781010926
							],
							[
								26.277136584269947,
								47.29505268669972
							],
							[
								26.38993877710758,
								47.332406393816626
							],
							[
								26.40551080528617,
								47.34032191005822
							],
							[
								26.500758772686833,
								47.2827173720644
							],
							[
								26.50779262220526,
								47.27171015604915
							]
						]
					]
				},
				"properties": {
					"countyId": 27,
					"countyCode": 270,
					"name": "Neamț",
					"mnemonic": "NT",
					"regionId": 1,
					"region": "Nord-Est",
					"pop1948": 357348,
					"pop1956": 419949,
					"pop1966": 470206,
					"pop1977": 532096,
					"pop1992": 578420,
					"pop2002": 554516,
					"pop2011": 470766,
					"sortCode": 29,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								24.438128302078375,
								44.845388317670995
							],
							[
								24.42150753390198,
								44.82708248294049
							],
							[
								24.44711112005804,
								44.81404962036992
							],
							[
								24.480190393469965,
								44.821753904263126
							],
							[
								24.509409599792143,
								44.845508943178814
							],
							[
								24.513517670469298,
								44.87756633359079
							],
							[
								24.54072933905728,
								44.8910527018616
							],
							[
								24.54253824440775,
								44.861392641463354
							],
							[
								24.555076663574265,
								44.83411249286347
							],
							[
								24.588569847906975,
								44.798166075150355
							],
							[
								24.594637409127962,
								44.75100494389761
							],
							[
								24.606940949777297,
								44.75382743021994
							],
							[
								24.631357343621968,
								44.73289391324044
							],
							[
								24.683399235961033,
								44.73763784558163
							],
							[
								24.715933339602294,
								44.71826278953619
							],
							[
								24.691150817876217,
								44.69554072119833
							],
							[
								24.712358052345664,
								44.62288960356647
							],
							[
								24.710647412123276,
								44.58240620028567
							],
							[
								24.72865748123594,
								44.57207319827669
							],
							[
								24.742583543142345,
								44.537848900576506
							],
							[
								24.731546297138927,
								44.52226659564864
							],
							[
								24.727405211206392,
								44.492389066000776
							],
							[
								24.7340058802424,
								44.46521933371284
							],
							[
								24.7560230384962,
								44.46505408364608
							],
							[
								24.751996576776925,
								44.42471944490305
							],
							[
								24.75455927949334,
								44.391371334646976
							],
							[
								24.880793022633892,
								44.394193867050134
							],
							[
								24.884028050230718,
								44.382649752126696
							],
							[
								24.88021761613482,
								44.3688393791739
							],
							[
								24.817347798629473,
								44.3612789535232
							],
							[
								24.831016587616922,
								44.309503895921615
							],
							[
								24.824464635166965,
								44.24411110063315
							],
							[
								24.83717120521774,
								44.226292052655324
							],
							[
								24.79357457922304,
								44.191267428918714
							],
							[
								24.817214360231798,
								44.14886532979632
							],
							[
								24.844177577602988,
								44.13318342034508
							],
							[
								24.854429244049882,
								44.09516842229243
							],
							[
								24.80318364461974,
								44.07848518953336
							],
							[
								24.710909502878216,
								44.05913833786055
							],
							[
								24.720188137780006,
								44.0380890022472
							],
							[
								24.659618349356343,
								44.0283299806264
							],
							[
								24.613101584783916,
								44.01416828452137
							],
							[
								24.602278117586536,
								43.96212557444601
							],
							[
								24.632216034080862,
								43.961637617230814
							],
							[
								24.627581537686172,
								43.93588595798657
							],
							[
								24.656821145052934,
								43.90040384937489
							],
							[
								24.668340586386716,
								43.86669519906414
							],
							[
								24.69354314325895,
								43.870753264245685
							],
							[
								24.70308846367859,
								43.85082844572711
							],
							[
								24.745755773356972,
								43.81936683934529
							],
							[
								24.746721641679574,
								43.79203833603799
							],
							[
								24.694375726977068,
								43.781834273860504
							],
							[
								24.686723292744794,
								43.75974550699527
							],
							[
								24.66522144208357,
								43.74260643629387
							],
							[
								24.657073773633762,
								43.72365224881463
							],
							[
								24.623084158373207,
								43.7423998001509
							],
							[
								24.589226760976135,
								43.75121329924431
							],
							[
								24.512653273886343,
								43.762520768105865
							],
							[
								24.467248144006117,
								43.74910546637144
							],
							[
								24.40860411981563,
								43.73691790705899
							],
							[
								24.381566682842376,
								43.71274836378828
							],
							[
								24.348605545189205,
								43.69737117153717
							],
							[
								24.31775209829102,
								43.70062980200828
							],
							[
								24.173354124897767,
								43.682629108870486
							],
							[
								24.112728080136023,
								43.699578199867354
							],
							[
								24.12937240061115,
								43.774707399616304
							],
							[
								24.138167832793616,
								43.77545150356358
							],
							[
								24.155547470874062,
								43.813722843996594
							],
							[
								24.192308206465608,
								43.810407366287514
							],
							[
								24.20162586113443,
								43.84686938510753
							],
							[
								24.22680601038412,
								43.8517608756535
							],
							[
								24.22669162117199,
								43.885209029300775
							],
							[
								24.24825515723831,
								43.93022635265951
							],
							[
								24.223302630916304,
								43.941266319133874
							],
							[
								24.232427687759397,
								43.961396342287436
							],
							[
								24.251166916141116,
								43.957201407495326
							],
							[
								24.263785248887245,
								43.99825498245411
							],
							[
								24.17354706601894,
								44.006308937484114
							],
							[
								24.18447291911509,
								44.04900556869285
							],
							[
								24.17959790202867,
								44.06847520153162
							],
							[
								24.222616209598403,
								44.06928000174023
							],
							[
								24.227307514665416,
								44.10969590803871
							],
							[
								24.215356912751353,
								44.12193458110955
							],
							[
								24.229362066617995,
								44.16997060373488
							],
							[
								24.2163951281804,
								44.18020907430944
							],
							[
								24.22953668504224,
								44.214801341689174
							],
							[
								24.22689507038921,
								44.229929616448366
							],
							[
								24.141618784222484,
								44.248691222509905
							],
							[
								24.147589794447384,
								44.26347503375607
							],
							[
								24.111949700266553,
								44.26682708777871
							],
							[
								24.108978594103263,
								44.300774261424564
							],
							[
								24.0912850284826,
								44.299192883855945
							],
							[
								24.0696258267733,
								44.33277004426026
							],
							[
								24.044858218596783,
								44.34890221976678
							],
							[
								24.045300687384604,
								44.36821769149446
							],
							[
								24.015100903559542,
								44.37715162493928
							],
							[
								23.98418769354464,
								44.37312489791918
							],
							[
								23.95795565865708,
								44.38176317430444
							],
							[
								23.9682550161503,
								44.410377094213764
							],
							[
								23.89952785676665,
								44.42497098953171
							],
							[
								23.882295325482417,
								44.43329928881521
							],
							[
								23.90427051686147,
								44.47019136533305
							],
							[
								23.88307270920499,
								44.480594566832174
							],
							[
								23.897498915063448,
								44.50797848710894
							],
							[
								23.92820448329873,
								44.530237493303915
							],
							[
								23.990225328211793,
								44.53831162472572
							],
							[
								24.039291295761497,
								44.523469798397564
							],
							[
								24.062613383645704,
								44.495616517124745
							],
							[
								24.08090538451375,
								44.497545822047755
							],
							[
								24.117469208471256,
								44.538064511974916
							],
							[
								24.143091389010586,
								44.555448384927416
							],
							[
								24.24707541091427,
								44.55278417798169
							],
							[
								24.259209926850573,
								44.565880722235754
							],
							[
								24.259577910329572,
								44.60016039864446
							],
							[
								24.28198565567545,
								44.60000223710646
							],
							[
								24.287839059545117,
								44.56630007186307
							],
							[
								24.324904234983922,
								44.56086466429681
							],
							[
								24.324727635947436,
								44.61290616778107
							],
							[
								24.301230668101073,
								44.641775323630085
							],
							[
								24.29881928973008,
								44.67528405477035
							],
							[
								24.27974240245054,
								44.70767661452989
							],
							[
								24.274625031265764,
								44.76879274246652
							],
							[
								24.29636700253524,
								44.77039288853763
							],
							[
								24.317431214981802,
								44.79695851896639
							],
							[
								24.34195099184375,
								44.85348189313007
							],
							[
								24.33319363333428,
								44.869857425921545
							],
							[
								24.36787394042416,
								44.87154145428634
							],
							[
								24.39662247756885,
								44.90011564637155
							],
							[
								24.42369096024667,
								44.8907863294498
							],
							[
								24.41654694404038,
								44.85498222436397
							],
							[
								24.438128302078375,
								44.845388317670995
							]
						]
					]
				},
				"properties": {
					"countyId": 28,
					"countyCode": 289,
					"name": "Olt",
					"mnemonic": "OT",
					"regionId": 4,
					"region": "Sud-Vest",
					"pop1948": 442442,
					"pop1956": 458982,
					"pop1966": 476513,
					"pop1977": 518804,
					"pop1992": 523291,
					"pop2002": 489274,
					"pop2011": 436400,
					"sortCode": 30,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								26.072725670281145,
								45.5058029345768
							],
							[
								26.09054770321635,
								45.485671655631556
							],
							[
								26.117236502175718,
								45.476836289903375
							],
							[
								26.14836728876212,
								45.45732514045892
							],
							[
								26.144681070838516,
								45.4084141374262
							],
							[
								26.16495352446568,
								45.401350483597824
							],
							[
								26.15343946125548,
								45.37702262653631
							],
							[
								26.18597427659704,
								45.357343014155
							],
							[
								26.211509537140586,
								45.326690650008224
							],
							[
								26.233613440193555,
								45.314639111475984
							],
							[
								26.18747874236645,
								45.27959907092715
							],
							[
								26.22337193681714,
								45.273729695469086
							],
							[
								26.226127826517267,
								45.24438267240489
							],
							[
								26.255945615729402,
								45.20849733784701
							],
							[
								26.30296591628203,
								45.2022592913768
							],
							[
								26.333311740813567,
								45.2177896805776
							],
							[
								26.35675058504112,
								45.21327589761429
							],
							[
								26.34586548556743,
								45.1955835356135
							],
							[
								26.352688346862784,
								45.16439365575735
							],
							[
								26.375658513304543,
								45.15830883300345
							],
							[
								26.397171822006765,
								45.178555474732285
							],
							[
								26.42202671782228,
								45.17547345459722
							],
							[
								26.460358142978908,
								45.19810715918488
							],
							[
								26.4604501315774,
								45.16726562561205
							],
							[
								26.469388862955917,
								45.1390142468514
							],
							[
								26.44946752541709,
								45.12611813236187
							],
							[
								26.462991156171196,
								45.07002989554083
							],
							[
								26.491984738632844,
								45.00537592821273
							],
							[
								26.52955038567052,
								45.01488764027392
							],
							[
								26.554912281888473,
								44.999430695191016
							],
							[
								26.57722382749115,
								44.971552907951065
							],
							[
								26.599919123078084,
								44.95585990231308
							],
							[
								26.531560217272848,
								44.939170861639944
							],
							[
								26.536254213800596,
								44.91641176729377
							],
							[
								26.553745835176198,
								44.9152434749379
							],
							[
								26.58497530114449,
								44.88234535538798
							],
							[
								26.60835628919473,
								44.87217383766264
							],
							[
								26.605560284759033,
								44.85700920744339
							],
							[
								26.525321074224628,
								44.826936670178306
							],
							[
								26.533720223701447,
								44.82134102589337
							],
							[
								26.493518892088716,
								44.790847519628734
							],
							[
								26.45314396026014,
								44.81092360066602
							],
							[
								26.394168650839568,
								44.76643891567302
							],
							[
								26.373606170470698,
								44.76114802160729
							],
							[
								26.341053012522227,
								44.790600159678725
							],
							[
								26.301827103308554,
								44.768889606989454
							],
							[
								26.27382335946857,
								44.768914501620756
							],
							[
								26.2488683255213,
								44.7382781620217
							],
							[
								26.219340476273622,
								44.749574204657314
							],
							[
								26.17445350872948,
								44.74920220539125
							],
							[
								26.15295412016633,
								44.75865216190968
							],
							[
								26.13251880842705,
								44.74986113022351
							],
							[
								26.101920356337203,
								44.766945058652496
							],
							[
								26.05194206791557,
								44.73521090896025
							],
							[
								26.024126908218264,
								44.7447529917374
							],
							[
								25.9660469796607,
								44.73797694232155
							],
							[
								25.97075245954317,
								44.71042269386555
							],
							[
								25.93315628942396,
								44.69485726674308
							],
							[
								25.908393911187947,
								44.73342768086964
							],
							[
								25.940836025590755,
								44.75324064814516
							],
							[
								25.92490016229228,
								44.76315756984449
							],
							[
								25.900691365231594,
								44.800638975777595
							],
							[
								25.86820323940797,
								44.83185465199747
							],
							[
								25.841820490313594,
								44.809983547288994
							],
							[
								25.777628971805466,
								44.82465707877095
							],
							[
								25.774264267608842,
								44.83696738461871
							],
							[
								25.80211037935706,
								44.85230067708302
							],
							[
								25.825320888715034,
								44.897152269523666
							],
							[
								25.802218203582786,
								44.92108303967146
							],
							[
								25.791389290766798,
								44.94470351662655
							],
							[
								25.769411417582816,
								44.94702263320571
							],
							[
								25.709227861732984,
								44.9415716044256
							],
							[
								25.687947476096923,
								44.94738206983112
							],
							[
								25.675497345473865,
								45.009568058256626
							],
							[
								25.701350738147617,
								45.0453567874162
							],
							[
								25.67139463749154,
								45.083545806606686
							],
							[
								25.639751921086745,
								45.091988042533956
							],
							[
								25.605090318503713,
								45.128984500595585
							],
							[
								25.598045178005908,
								45.14748893838149
							],
							[
								25.565017027729734,
								45.171698433919644
							],
							[
								25.55788236318893,
								45.19228844629905
							],
							[
								25.534149912443084,
								45.2160476614913
							],
							[
								25.511414223005463,
								45.2216363108428
							],
							[
								25.530679834872135,
								45.249520629914436
							],
							[
								25.554838452683413,
								45.27056503638833
							],
							[
								25.533606182219234,
								45.30108656205538
							],
							[
								25.5032076559744,
								45.317972229113465
							],
							[
								25.487518303310644,
								45.314602455886174
							],
							[
								25.467748068419645,
								45.34642591483443
							],
							[
								25.47060408242591,
								45.37087791340977
							],
							[
								25.484414879327755,
								45.395049636551846
							],
							[
								25.471781286001356,
								45.426652990839024
							],
							[
								25.45254545655895,
								45.44135605190133
							],
							[
								25.461716901161815,
								45.45392997476359
							],
							[
								25.511550970378718,
								45.47040531150057
							],
							[
								25.531319271956335,
								45.45920057278391
							],
							[
								25.60703677811107,
								45.47605167240185
							],
							[
								25.64407816657295,
								45.49257335196784
							],
							[
								25.681001358576506,
								45.5006339958725
							],
							[
								25.72669109511595,
								45.46539905884802
							],
							[
								25.765921145579654,
								45.465575130192136
							],
							[
								25.790240261408844,
								45.47862665336394
							],
							[
								25.807820302449393,
								45.468955835483236
							],
							[
								25.829488544330307,
								45.42944340173134
							],
							[
								25.8675988818198,
								45.42308673984132
							],
							[
								25.888611311984224,
								45.44581176427896
							],
							[
								25.89097716282983,
								45.4879141677113
							],
							[
								25.919358713405867,
								45.5195583900894
							],
							[
								25.937817552512207,
								45.51254468727928
							],
							[
								25.995643961018825,
								45.514258596176354
							],
							[
								26.013691655286234,
								45.49012211700558
							],
							[
								26.04110976361709,
								45.47839648392795
							],
							[
								26.065482274029204,
								45.48531140070002
							],
							[
								26.072725670281145,
								45.5058029345768
							]
						]
					]
				},
				"properties": {
					"countyId": 29,
					"countyCode": 298,
					"name": "Prahova",
					"mnemonic": "PH",
					"regionId": 3,
					"region": "Sud",
					"pop1948": 557776,
					"pop1956": 623817,
					"pop1966": 701057,
					"pop1977": 817168,
					"pop1992": 874349,
					"pop2002": 829945,
					"pop2011": 762886,
					"sortCode": 31,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								23.493603569789414,
								47.96782488723651
							],
							[
								23.54280246474651,
								47.9413193158165
							],
							[
								23.563269988315156,
								47.9439267139237
							],
							[
								23.590373782503395,
								47.89874383495107
							],
							[
								23.62812685076931,
								47.88497382116958
							],
							[
								23.639805491261335,
								47.86415847811005
							],
							[
								23.612937962718046,
								47.84606844189762
							],
							[
								23.594091406254098,
								47.84913666300172
							],
							[
								23.559146971737846,
								47.80380410697946
							],
							[
								23.53646091782922,
								47.80155956104454
							],
							[
								23.472290442668232,
								47.779296315431246
							],
							[
								23.45087319147311,
								47.7618139964751
							],
							[
								23.388214262671674,
								47.77919268591168
							],
							[
								23.311200811038113,
								47.7749119280488
							],
							[
								23.308679814155045,
								47.78604431926807
							],
							[
								23.261753759915152,
								47.797288889035386
							],
							[
								23.22482486900214,
								47.76640569511752
							],
							[
								23.23009852786775,
								47.73916269823162
							],
							[
								23.27212653576995,
								47.721988024721874
							],
							[
								23.362744715993102,
								47.69984945954319
							],
							[
								23.3633410415266,
								47.66540572513951
							],
							[
								23.334335296569297,
								47.65240665824729
							],
							[
								23.284549367012065,
								47.614140567136204
							],
							[
								23.288976091595774,
								47.588715280031025
							],
							[
								23.260717128690914,
								47.58086460780857
							],
							[
								23.258154024357978,
								47.550869505997134
							],
							[
								23.22951196396987,
								47.5541546131382
							],
							[
								23.211658455006386,
								47.57058873852051
							],
							[
								23.166948520686198,
								47.593587035557526
							],
							[
								23.138850290968726,
								47.62357049669355
							],
							[
								23.10062470364973,
								47.59181662232286
							],
							[
								23.06532249489133,
								47.57130560713795
							],
							[
								23.05311696388674,
								47.555364839715324
							],
							[
								23.04209411835652,
								47.50755022162549
							],
							[
								23.04577669453659,
								47.487408646593046
							],
							[
								22.9995299874088,
								47.4906674807488
							],
							[
								22.963247685508495,
								47.486462404948035
							],
							[
								22.983410224360448,
								47.460627714870995
							],
							[
								22.964214982289878,
								47.439443952844684
							],
							[
								23.009932714833244,
								47.43387862908017
							],
							[
								23.0399624230269,
								47.421521428876424
							],
							[
								23.047939988175543,
								47.43654236773236
							],
							[
								23.07916100003772,
								47.44490947595224
							],
							[
								23.106106873372813,
								47.44237055121649
							],
							[
								23.115949885892334,
								47.43147952275518
							],
							[
								23.119117893352414,
								47.39564682745074
							],
							[
								23.089787951970283,
								47.38424089437885
							],
							[
								23.08714155304239,
								47.36341589745323
							],
							[
								23.0375823936412,
								47.359424767920046
							],
							[
								23.002855818178812,
								47.3689559779155
							],
							[
								22.97663627085287,
								47.352047021846445
							],
							[
								22.955374333247136,
								47.3608729154673
							],
							[
								22.920650669728936,
								47.394611382251504
							],
							[
								22.916167298040726,
								47.4135354962915
							],
							[
								22.832986722705122,
								47.418105478018305
							],
							[
								22.801904354101477,
								47.41151924074609
							],
							[
								22.768223662274725,
								47.41863124609526
							],
							[
								22.733485403911697,
								47.40499024793335
							],
							[
								22.722593842786132,
								47.39266081641519
							],
							[
								22.675339199861366,
								47.37722077439509
							],
							[
								22.645086940960166,
								47.37388066569085
							],
							[
								22.61267904880081,
								47.33475337688767
							],
							[
								22.575409667199228,
								47.36180262516684
							],
							[
								22.566004743317365,
								47.391856250187715
							],
							[
								22.533752640195445,
								47.39905755226644
							],
							[
								22.52938450691172,
								47.4186110547771
							],
							[
								22.45932760188517,
								47.431928807760144
							],
							[
								22.36262010996909,
								47.4275683573183
							],
							[
								22.341039597000453,
								47.4556343546361
							],
							[
								22.340560315840676,
								47.49005334550441
							],
							[
								22.28836875856848,
								47.50646836679367
							],
							[
								22.28538534848244,
								47.53492492428478
							],
							[
								22.255697434609814,
								47.53981174745989
							],
							[
								22.261638790250956,
								47.554904426867886
							],
							[
								22.207314926391028,
								47.59642727625675
							],
							[
								22.180824111089834,
								47.60009608292603
							],
							[
								22.203326927565396,
								47.65487745602693
							],
							[
								22.22081979966814,
								47.66048859238342
							],
							[
								22.230980971797955,
								47.69330456069622
							],
							[
								22.259096010561823,
								47.698772571625526
							],
							[
								22.264539637354858,
								47.731153717230505
							],
							[
								22.285366842639593,
								47.72935113922381
							],
							[
								22.317451799889547,
								47.74326135826366
							],
							[
								22.330373053368202,
								47.76511534268558
							],
							[
								22.357023422483124,
								47.748973790502106
							],
							[
								22.388967902138933,
								47.74540602553362
							],
							[
								22.425808585580146,
								47.75008740542616
							],
							[
								22.447948928809012,
								47.803116498243426
							],
							[
								22.48849012834065,
								47.805896388325486
							],
							[
								22.549527084159365,
								47.77266115045548
							],
							[
								22.611550039449234,
								47.77199171573562
							],
							[
								22.660075522376175,
								47.78186823052567
							],
							[
								22.687950551003144,
								47.79556636007264
							],
							[
								22.7109022774756,
								47.83447188797031
							],
							[
								22.75623838383516,
								47.83489812502748
							],
							[
								22.774120683820538,
								47.84284587812884
							],
							[
								22.763225414919415,
								47.892738722249
							],
							[
								22.793007795436196,
								47.890961620739795
							],
							[
								22.83251573945703,
								47.909308544182764
							],
							[
								22.84699360861144,
								47.90808507658106
							],
							[
								22.88668962064151,
								47.95147969714245
							],
							[
								22.930316327272504,
								47.959435507364105
							],
							[
								22.94446963193375,
								47.969218787423564
							],
							[
								22.92697561420923,
								48.01916163388899
							],
							[
								22.977754461663753,
								48.00990548337115
							],
							[
								23.01342315215818,
								47.99065020728228
							],
							[
								23.030499904607687,
								48.000301966188125
							],
							[
								23.07454118777978,
								48.00863131313599
							],
							[
								23.109206634231356,
								48.0382960117142
							],
							[
								23.106625510434196,
								48.06353757451181
							],
							[
								23.130264083584112,
								48.09566898776973
							],
							[
								23.17707091778389,
								48.11975373374314
							],
							[
								23.189169787298322,
								48.09773718722666
							],
							[
								23.268740153575404,
								48.08696813216901
							],
							[
								23.287310674167088,
								48.0754617947463
							],
							[
								23.28415895020904,
								48.050417224596835
							],
							[
								23.312760383801333,
								48.04495712739379
							],
							[
								23.338452809066595,
								48.01821646031218
							],
							[
								23.433564140660046,
								47.99050966845768
							],
							[
								23.449885613073292,
								47.97659907389971
							],
							[
								23.493603569789414,
								47.96782488723651
							]
						]
					]
				},
				"properties": {
					"countyId": 30,
					"countyCode": 305,
					"name": "Satu Mare",
					"mnemonic": "SM",
					"regionId": 6,
					"region": "Nord-Vest",
					"pop1948": 312672,
					"pop1956": 337351,
					"pop1966": 359393,
					"pop1977": 393840,
					"pop1992": 400789,
					"pop2002": 367281,
					"pop2011": 344360,
					"sortCode": 32,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								24.94655309501842,
								46.079122988700206
							],
							[
								24.962099599987543,
								46.06590885525968
							],
							[
								24.945123528127446,
								46.05131102597141
							],
							[
								24.875033353934317,
								46.02912332042642
							],
							[
								24.865453431994286,
								46.00965397468231
							],
							[
								24.819490654059152,
								46.005542032565444
							],
							[
								24.835497300480135,
								45.97781428366653
							],
							[
								24.792458077261614,
								45.973088709745596
							],
							[
								24.771225150466417,
								45.9618250162275
							],
							[
								24.748885865708296,
								45.9350441391842
							],
							[
								24.72097534239207,
								45.94586919378312
							],
							[
								24.702901692463268,
								45.9401302460964
							],
							[
								24.715195340393574,
								45.89572495733469
							],
							[
								24.770751243874436,
								45.86830631979304
							],
							[
								24.77307216511459,
								45.84004579736182
							],
							[
								24.726858420232993,
								45.83724048960768
							],
							[
								24.66100009568799,
								45.81758240467668
							],
							[
								24.639236187624103,
								45.795123106652426
							],
							[
								24.646237728945643,
								45.76466616056581
							],
							[
								24.680948156198607,
								45.71135231700562
							],
							[
								24.682902822475818,
								45.670544734463085
							],
							[
								24.669542630648262,
								45.640510857021795
							],
							[
								24.684930956153956,
								45.60412439036928
							],
							[
								24.671062204388846,
								45.59459156423673
							],
							[
								24.6423912746209,
								45.604078139282954
							],
							[
								24.596570055152597,
								45.59619983579335
							],
							[
								24.56589634060682,
								45.57915178896412
							],
							[
								24.5535115763557,
								45.587753618165046
							],
							[
								24.523137459570204,
								45.58057707199745
							],
							[
								24.47482696702961,
								45.58278616144255
							],
							[
								24.373018576163574,
								45.58225703059873
							],
							[
								24.324325898444886,
								45.57644905319156
							],
							[
								24.28415168613985,
								45.56126565072523
							],
							[
								24.257453460422475,
								45.543218582549194
							],
							[
								24.228382847391764,
								45.5472935237276
							],
							[
								24.20413288476966,
								45.52341838001322
							],
							[
								24.172211902604033,
								45.51441493357847
							],
							[
								24.082251887688415,
								45.5122362081911
							],
							[
								24.011438457056524,
								45.53192781843717
							],
							[
								23.966532253671645,
								45.53034044553184
							],
							[
								23.922276017471933,
								45.53598709554949
							],
							[
								23.867235985097942,
								45.52565420934854
							],
							[
								23.85784524969967,
								45.53503012578485
							],
							[
								23.790871713687515,
								45.52808769140344
							],
							[
								23.77116507691741,
								45.51070772615414
							],
							[
								23.703618079745887,
								45.496784356179674
							],
							[
								23.66466241182499,
								45.49440221869915
							],
							[
								23.647881956077025,
								45.52682342855792
							],
							[
								23.610625704738528,
								45.56365106911935
							],
							[
								23.61797635466451,
								45.58093859967704
							],
							[
								23.64836751925653,
								45.59808350460919
							],
							[
								23.633222738965696,
								45.62849442713131
							],
							[
								23.644893701572325,
								45.640065159389934
							],
							[
								23.62535184951643,
								45.65891990232163
							],
							[
								23.591036582821204,
								45.67686270752146
							],
							[
								23.610312049961095,
								45.69058038727574
							],
							[
								23.588701672641267,
								45.701140587868196
							],
							[
								23.619422952054432,
								45.73531324768425
							],
							[
								23.627666757093248,
								45.75279578710495
							],
							[
								23.659329801620046,
								45.761198383176854
							],
							[
								23.6219794527172,
								45.78331929703806
							],
							[
								23.626575710704547,
								45.80757080732902
							],
							[
								23.695569322868785,
								45.80870947150347
							],
							[
								23.747650186149727,
								45.86179783041424
							],
							[
								23.7733337014596,
								45.88079817232544
							],
							[
								23.730426538578822,
								45.89720234371594
							],
							[
								23.735422329421763,
								45.91162257246709
							],
							[
								23.792028250477916,
								45.92784518660095
							],
							[
								23.816354346425854,
								45.92323845664921
							],
							[
								23.846610604893257,
								45.95748562785946
							],
							[
								23.870070945527655,
								45.948702175760026
							],
							[
								23.85003251352034,
								46.01167073404121
							],
							[
								23.890804810620743,
								46.044199882012336
							],
							[
								23.967808478303173,
								46.03395430671867
							],
							[
								24.00736085424475,
								46.01659350934592
							],
							[
								24.03236420144088,
								46.04074614404086
							],
							[
								24.026935889629538,
								46.06284309776716
							],
							[
								24.0584729493098,
								46.08482131447575
							],
							[
								24.091161020793436,
								46.11711866560524
							],
							[
								24.12364718690636,
								46.13652369356636
							],
							[
								24.15047105561895,
								46.13484745883648
							],
							[
								24.216773706039156,
								46.161686055175245
							],
							[
								24.189862529527215,
								46.18050675164103
							],
							[
								24.20876851137588,
								46.23291148977181
							],
							[
								24.22949481423209,
								46.23148971800707
							],
							[
								24.231314937452936,
								46.25965334789622
							],
							[
								24.264280022682286,
								46.253440141086735
							],
							[
								24.27287232964932,
								46.276371636955474
							],
							[
								24.29906676737429,
								46.25512142338073
							],
							[
								24.37889230835835,
								46.24365475935361
							],
							[
								24.409310671556614,
								46.26136158098126
							],
							[
								24.489253737737624,
								46.25840131715043
							],
							[
								24.504825541181642,
								46.24538446612527
							],
							[
								24.53846748007377,
								46.25978692832482
							],
							[
								24.56271555646749,
								46.257691093005924
							],
							[
								24.591842369136142,
								46.27221731749412
							],
							[
								24.604291660826885,
								46.251898636802814
							],
							[
								24.644842748972685,
								46.27871571152241
							],
							[
								24.66634966387246,
								46.274458121310005
							],
							[
								24.676558017594907,
								46.25016483606034
							],
							[
								24.66680778891386,
								46.2251652044649
							],
							[
								24.67724877232178,
								46.21480037406478
							],
							[
								24.682510449493805,
								46.183201409712126
							],
							[
								24.672499610056445,
								46.105087480106555
							],
							[
								24.697167045888722,
								46.08320543352104
							],
							[
								24.77648483782257,
								46.09347102977336
							],
							[
								24.81815429081137,
								46.09425329583608
							],
							[
								24.863174069770725,
								46.11092871638337
							],
							[
								24.900377143044032,
								46.10615727316567
							],
							[
								24.918190547060934,
								46.07952660927336
							],
							[
								24.94655309501842,
								46.079122988700206
							]
						]
					]
				},
				"properties": {
					"countyId": 32,
					"countyCode": 323,
					"name": "Sibiu",
					"mnemonic": "SB",
					"regionId": 7,
					"region": "Centru",
					"pop1948": 335116,
					"pop1956": 372687,
					"pop1966": 414756,
					"pop1977": 481645,
					"pop1992": 452873,
					"pop2002": 421724,
					"pop2011": 397322,
					"sortCode": 34,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								26.098815609394112,
								47.97881575642891
							],
							[
								26.11951259461689,
								47.97229622087467
							],
							[
								26.123844065834867,
								47.93596402667218
							],
							[
								26.147785978591305,
								47.92431194558421
							],
							[
								26.18276065768491,
								47.92074433766527
							],
							[
								26.183424946733826,
								47.89333583620348
							],
							[
								26.232793498643826,
								47.896474126334816
							],
							[
								26.26075566651464,
								47.884721353060506
							],
							[
								26.28249064348287,
								47.85631134895617
							],
							[
								26.302570415105794,
								47.855567396608805
							],
							[
								26.3184260343563,
								47.81461292634589
							],
							[
								26.354324376964744,
								47.78441776388933
							],
							[
								26.37557462417055,
								47.77367382885187
							],
							[
								26.40463238482868,
								47.777909076308376
							],
							[
								26.405851170952214,
								47.753361255298316
							],
							[
								26.446049029543786,
								47.73357916202503
							],
							[
								26.508990800461927,
								47.65216387915149
							],
							[
								26.536138736651594,
								47.64862817194948
							],
							[
								26.536096655005544,
								47.61941707953789
							],
							[
								26.563089547824635,
								47.55617909397634
							],
							[
								26.60482127875741,
								47.52062177869803
							],
							[
								26.554450978316954,
								47.50975284914362
							],
							[
								26.59011149927847,
								47.48756219488485
							],
							[
								26.59893061977364,
								47.459718003236475
							],
							[
								26.62250323377593,
								47.467405814575066
							],
							[
								26.700574445623594,
								47.47172917421831
							],
							[
								26.680256212347057,
								47.45707462808302
							],
							[
								26.685366424558826,
								47.413825337068715
							],
							[
								26.643956533630234,
								47.398790370350184
							],
							[
								26.676618230188858,
								47.378981515087474
							],
							[
								26.680095640519855,
								47.36097813226691
							],
							[
								26.608802731262212,
								47.35594998288775
							],
							[
								26.570483190250947,
								47.37654103392071
							],
							[
								26.570878064273423,
								47.38942512554019
							],
							[
								26.53291161196756,
								47.38979469973018
							],
							[
								26.527445210207297,
								47.404639454196946
							],
							[
								26.492968204357496,
								47.39234073833669
							],
							[
								26.506773223316742,
								47.372431433584225
							],
							[
								26.498785746371777,
								47.361849268018986
							],
							[
								26.548448881229685,
								47.3015241672584
							],
							[
								26.50779262220526,
								47.27171015604915
							],
							[
								26.500758772686833,
								47.2827173720644
							],
							[
								26.40551080528617,
								47.34032191005822
							],
							[
								26.38993877710758,
								47.332406393816626
							],
							[
								26.277136584269947,
								47.29505268669972
							],
							[
								26.25213158606683,
								47.279637781010926
							],
							[
								26.18801263184547,
								47.306723973629744
							],
							[
								26.13683535070782,
								47.28865181424068
							],
							[
								26.125657865588835,
								47.29733806931647
							],
							[
								26.05577334429495,
								47.27458990444032
							],
							[
								26.01841132193157,
								47.28904525256
							],
							[
								25.97854652341205,
								47.288721833975536
							],
							[
								25.9324885843931,
								47.27715315588895
							],
							[
								25.923615977254133,
								47.2591572768134
							],
							[
								25.900484705684093,
								47.26199372563961
							],
							[
								25.868920713170134,
								47.29437513465288
							],
							[
								25.83593051788245,
								47.31165803117005
							],
							[
								25.77341822849091,
								47.321020571127065
							],
							[
								25.78941123669289,
								47.28783599767506
							],
							[
								25.812947078390426,
								47.26020589864104
							],
							[
								25.785700472874368,
								47.23764698985706
							],
							[
								25.743595028132546,
								47.22633452209203
							],
							[
								25.71599622310305,
								47.19706574676782
							],
							[
								25.721105522232993,
								47.174956234950386
							],
							[
								25.700173604809077,
								47.17053236358799
							],
							[
								25.697749072678764,
								47.143423799562456
							],
							[
								25.664652795047147,
								47.119997020998404
							],
							[
								25.661585098162625,
								47.091662223967106
							],
							[
								25.621247116149878,
								47.093727300227435
							],
							[
								25.6015822280221,
								47.077339607948936
							],
							[
								25.57440229321619,
								47.0846987355698
							],
							[
								25.53195860151854,
								47.0867482983875
							],
							[
								25.52680468306915,
								47.10530461697977
							],
							[
								25.49629037783566,
								47.12816542437239
							],
							[
								25.456663738539106,
								47.1454814093944
							],
							[
								25.42539118994698,
								47.17128797775799
							],
							[
								25.425131982258517,
								47.183857414417346
							],
							[
								25.35209184482516,
								47.174648637570115
							],
							[
								25.294395822824285,
								47.155873846941745
							],
							[
								25.287218388933674,
								47.13323430903255
							],
							[
								25.296233827694056,
								47.115728707893844
							],
							[
								25.279353806064655,
								47.10368910659596
							],
							[
								25.2467125802614,
								47.09793421486988
							],
							[
								25.16429856370546,
								47.12965541554469
							],
							[
								25.14389542698689,
								47.113248815105
							],
							[
								25.122220864979937,
								47.12188835464243
							],
							[
								25.09382754456983,
								47.12065257659764
							],
							[
								25.063384744406402,
								47.1365532575269
							],
							[
								25.06668636727913,
								47.16501452278014
							],
							[
								25.059079118083126,
								47.19912674267301
							],
							[
								25.044263296181377,
								47.21609116532881
							],
							[
								25.07958846777046,
								47.25864017344663
							],
							[
								25.02806330484703,
								47.28679816105269
							],
							[
								25.047633262522833,
								47.30373695981437
							],
							[
								25.078663307238887,
								47.31496498295744
							],
							[
								25.07321892911262,
								47.34151721247958
							],
							[
								25.050601286718504,
								47.37749811910603
							],
							[
								25.003398592133767,
								47.413134087727755
							],
							[
								25.014640787501406,
								47.43343296972819
							],
							[
								25.052370305320082,
								47.431018940108856
							],
							[
								25.077943436425887,
								47.43845302878071
							],
							[
								25.05209651588981,
								47.48079663844403
							],
							[
								25.093785286634862,
								47.50397608785955
							],
							[
								25.095034870005684,
								47.51585493877392
							],
							[
								25.060995129549603,
								47.53695187168258
							],
							[
								25.05195091689917,
								47.56045534299169
							],
							[
								25.00777239412253,
								47.5688391873301
							],
							[
								24.990190415696542,
								47.58567522931841
							],
							[
								24.960837896040648,
								47.59686576371186
							],
							[
								24.974228579572987,
								47.61367657410081
							],
							[
								25.009741477218935,
								47.632944488458236
							],
							[
								25.05306290473303,
								47.64141172746149
							],
							[
								25.055483393279577,
								47.65444676891506
							],
							[
								25.022151738423982,
								47.666392938533484
							],
							[
								24.94791401007637,
								47.717187350784606
							],
							[
								24.947100902720734,
								47.72913874739964
							],
							[
								25.006942437047496,
								47.73436681878748
							],
							[
								25.04009833325419,
								47.72541671852466
							],
							[
								25.065136334634765,
								47.74059963371682
							],
							[
								25.115599441990536,
								47.75483849027451
							],
							[
								25.116085165017598,
								47.76767792190643
							],
							[
								25.148826094731362,
								47.79204400389924
							],
							[
								25.179970829722226,
								47.82534800924224
							],
							[
								25.221945952876833,
								47.85867315184907
							],
							[
								25.2225037565958,
								47.879486234380614
							],
							[
								25.237825442568155,
								47.895328240652425
							],
							[
								25.269808336057714,
								47.89237542118072
							],
							[
								25.31092384130763,
								47.91435956404283
							],
							[
								25.3259303582085,
								47.9136233185563
							],
							[
								25.50135288110651,
								47.93281577594274
							],
							[
								25.592309410379745,
								47.93844433095286
							],
							[
								25.625528367875134,
								47.948791766895944
							],
							[
								25.65616338691516,
								47.949400169178936
							],
							[
								25.717116912871717,
								47.94085194910745
							],
							[
								25.774630341644283,
								47.93938619360715
							],
							[
								25.818669490344966,
								47.95408589573742
							],
							[
								25.825939706698755,
								47.963891819701445
							],
							[
								25.86126356061899,
								47.9702120350122
							],
							[
								25.891866124770775,
								47.961214797708436
							],
							[
								25.914656569201533,
								47.97739140504545
							],
							[
								25.95196799417219,
								47.970852999576266
							],
							[
								26.061120653711384,
								47.988016300111696
							],
							[
								26.098815609394112,
								47.97881575642891
							]
						]
					]
				},
				"properties": {
					"countyId": 33,
					"countyCode": 332,
					"name": "Suceava",
					"mnemonic": "SV",
					"regionId": 1,
					"region": "Nord-Est",
					"pop1948": 439751,
					"pop1956": 507674,
					"pop1966": 572781,
					"pop1977": 633899,
					"pop1992": 701830,
					"pop2002": 688435,
					"pop2011": 634810,
					"sortCode": 35,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								25.48049785093266,
								44.45201187375983
							],
							[
								25.455947087242556,
								44.418573582176656
							],
							[
								25.42569028643059,
								44.39674902819404
							],
							[
								25.473116862713958,
								44.37363103215972
							],
							[
								25.47797524464704,
								44.35408957488936
							],
							[
								25.46812420593921,
								44.32525957075516
							],
							[
								25.509656849954414,
								44.314199608033476
							],
							[
								25.551444589525094,
								44.31863615531592
							],
							[
								25.571080147819472,
								44.308223888705086
							],
							[
								25.60420328791986,
								44.319273379611296
							],
							[
								25.63152312349314,
								44.30686720742559
							],
							[
								25.617436817318826,
								44.290621246129824
							],
							[
								25.699696482343633,
								44.257174732810036
							],
							[
								25.667340297308613,
								44.21287204778752
							],
							[
								25.655335079810254,
								44.16880029584598
							],
							[
								25.676797931532096,
								44.15720772025626
							],
							[
								25.676191132305185,
								44.1130010703675
							],
							[
								25.66283945516058,
								44.09934815991685
							],
							[
								25.624717793160624,
								44.08582357318732
							],
							[
								25.59873138236851,
								44.03770311073561
							],
							[
								25.59397228747015,
								44.01362609552579
							],
							[
								25.603881692576362,
								43.99066662062527
							],
							[
								25.59134284957447,
								43.98452189599636
							],
							[
								25.617809444551867,
								43.955873617611196
							],
							[
								25.61804570937198,
								43.937509137915576
							],
							[
								25.58480696025403,
								43.93760230670323
							],
							[
								25.58435064927669,
								43.90705866060302
							],
							[
								25.614633878402966,
								43.903812673012446
							],
							[
								25.606894522365863,
								43.87780762030755
							],
							[
								25.606899993085495,
								43.84448399045677
							],
							[
								25.62968481657153,
								43.844669859872845
							],
							[
								25.629820243427183,
								43.820550203403805
							],
							[
								25.65994831039404,
								43.82050549340131
							],
							[
								25.660128732375515,
								43.778673731239884
							],
							[
								25.651037182741575,
								43.749823389402785
							],
							[
								25.681321896667352,
								43.697922609461344
							],
							[
								25.671873298356417,
								43.691353298305586
							],
							[
								25.610012697319593,
								43.66723572872526
							],
							[
								25.57100380192794,
								43.647105894004966
							],
							[
								25.54465114680671,
								43.64299493577322
							],
							[
								25.5083156240287,
								43.64686551697277
							],
							[
								25.450988562015947,
								43.628413208420554
							],
							[
								25.390144982633334,
								43.61903676288353
							],
							[
								25.339506584010763,
								43.631733070147845
							],
							[
								25.28769710093095,
								43.65591056542564
							],
							[
								25.252266674493004,
								43.682689715967484
							],
							[
								25.167251602939064,
								43.699782519705394
							],
							[
								25.111252574928017,
								43.68458537073781
							],
							[
								25.05353243204146,
								43.692230571087954
							],
							[
								24.99850204678318,
								43.727306875717055
							],
							[
								24.947511666441045,
								43.72930455813299
							],
							[
								24.923546500059782,
								43.71608118337615
							],
							[
								24.879056346713902,
								43.706834606564776
							],
							[
								24.823949408015537,
								43.7132866390156
							],
							[
								24.799165840228127,
								43.7078815920228
							],
							[
								24.752512348706286,
								43.687100277328476
							],
							[
								24.70480925338377,
								43.693793059258574
							],
							[
								24.657073773633762,
								43.72365224881463
							],
							[
								24.66522144208357,
								43.74260643629387
							],
							[
								24.686723292744794,
								43.75974550699527
							],
							[
								24.694375726977068,
								43.781834273860504
							],
							[
								24.746721641679574,
								43.79203833603799
							],
							[
								24.745755773356972,
								43.81936683934529
							],
							[
								24.70308846367859,
								43.85082844572711
							],
							[
								24.69354314325895,
								43.870753264245685
							],
							[
								24.668340586386716,
								43.86669519906414
							],
							[
								24.656821145052934,
								43.90040384937489
							],
							[
								24.627581537686172,
								43.93588595798657
							],
							[
								24.632216034080862,
								43.961637617230814
							],
							[
								24.602278117586536,
								43.96212557444601
							],
							[
								24.613101584783916,
								44.01416828452137
							],
							[
								24.659618349356343,
								44.0283299806264
							],
							[
								24.720188137780006,
								44.0380890022472
							],
							[
								24.710909502878216,
								44.05913833786055
							],
							[
								24.80318364461974,
								44.07848518953336
							],
							[
								24.854429244049882,
								44.09516842229243
							],
							[
								24.844177577602988,
								44.13318342034508
							],
							[
								24.817214360231798,
								44.14886532979632
							],
							[
								24.79357457922304,
								44.191267428918714
							],
							[
								24.83717120521774,
								44.226292052655324
							],
							[
								24.824464635166965,
								44.24411110063315
							],
							[
								24.831016587616922,
								44.309503895921615
							],
							[
								24.817347798629473,
								44.3612789535232
							],
							[
								24.88021761613482,
								44.3688393791739
							],
							[
								24.884028050230718,
								44.382649752126696
							],
							[
								24.96103627864244,
								44.379204592644776
							],
							[
								24.97642523822657,
								44.38274464624789
							],
							[
								25.010536103118927,
								44.410858069150635
							],
							[
								25.04625781716486,
								44.397325967752856
							],
							[
								25.065126334536384,
								44.39733256426932
							],
							[
								25.094542366370217,
								44.414864143348915
							],
							[
								25.11119409041631,
								44.41589481296344
							],
							[
								25.20293863605529,
								44.456463050119126
							],
							[
								25.234758371174074,
								44.424265681954054
							],
							[
								25.25073789150242,
								44.403368805052196
							],
							[
								25.301745083925297,
								44.42336169503818
							],
							[
								25.395058296590104,
								44.51816267162692
							],
							[
								25.44182049189445,
								44.501503611615945
							],
							[
								25.449148312626807,
								44.49118126714525
							],
							[
								25.428798963950026,
								44.47342541855471
							],
							[
								25.48049785093266,
								44.45201187375983
							]
						]
					]
				},
				"properties": {
					"countyId": 34,
					"countyCode": 341,
					"name": "Teleorman",
					"mnemonic": "TR",
					"regionId": 3,
					"region": "Sud",
					"pop1948": 487394,
					"pop1956": 510488,
					"pop1966": 516222,
					"pop1977": 518943,
					"pop1992": 483840,
					"pop2002": 436025,
					"pop2011": 380123,
					"sortCode": 36,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								20.705315587804588,
								46.16134859942518
							],
							[
								20.71862344855249,
								46.148636816101664
							],
							[
								20.77274517377006,
								46.14454024362428
							],
							[
								20.781731401761142,
								46.125641438407136
							],
							[
								20.83298856880399,
								46.09056464297134
							],
							[
								20.889072566996777,
								46.084199714025274
							],
							[
								20.911176288111538,
								46.072759818194996
							],
							[
								20.940656444603587,
								46.037490782149234
							],
							[
								21.049982705957557,
								46.036394939915425
							],
							[
								21.06874445113609,
								46.03977370410718
							],
							[
								21.074453561533783,
								46.012558923022404
							],
							[
								21.110211893504985,
								45.97707728472605
							],
							[
								21.1255255779182,
								45.97704161902921
							],
							[
								21.172047770030105,
								45.998745740543036
							],
							[
								21.19239162994044,
								45.98458848929426
							],
							[
								21.23812453492064,
								45.97153309699959
							],
							[
								21.238275208257335,
								45.98641032840168
							],
							[
								21.26215884395179,
								45.99495354019418
							],
							[
								21.284620339930015,
								46.020137611741156
							],
							[
								21.33637040551396,
								46.007451487065005
							],
							[
								21.360660982284408,
								45.99544400259466
							],
							[
								21.421342728345415,
								46.01154801006239
							],
							[
								21.449605879093795,
								46.029256641058375
							],
							[
								21.433702234566802,
								46.04421627881596
							],
							[
								21.47720582735608,
								46.063142289436264
							],
							[
								21.516024912200876,
								46.06751394217232
							],
							[
								21.536307550967834,
								46.03302687732754
							],
							[
								21.52424023850637,
								46.010334047436785
							],
							[
								21.591843917401835,
								45.99460783444352
							],
							[
								21.64193410382502,
								45.9740146759078
							],
							[
								21.64838533258308,
								45.94752155114594
							],
							[
								21.667685160437898,
								45.925857216774006
							],
							[
								21.69242935913294,
								45.91634305012079
							],
							[
								21.70365541534735,
								45.94468238991256
							],
							[
								21.742500958342312,
								45.97827459275078
							],
							[
								21.76257308191647,
								45.95645538910455
							],
							[
								21.76971878985381,
								45.916895400911095
							],
							[
								21.799440293346922,
								45.92528023470072
							],
							[
								21.801124666703796,
								45.94344680055992
							],
							[
								21.817913561685238,
								45.95289838437471
							],
							[
								21.85137033131324,
								45.94720582177451
							],
							[
								21.87243995599814,
								45.95867334999015
							],
							[
								21.901080578466047,
								45.95506217461908
							],
							[
								21.93735623704182,
								45.98785073559753
							],
							[
								21.9674736004434,
								45.99435587465287
							],
							[
								22.009181172858163,
								45.970902045901674
							],
							[
								22.069927515281368,
								45.959134502187226
							],
							[
								22.128348423036662,
								45.933470110682734
							],
							[
								22.13525304449748,
								45.92289042084352
							],
							[
								22.17388349288685,
								45.92848148484564
							],
							[
								22.202667978720275,
								45.92174053121637
							],
							[
								22.221455338480745,
								45.90317084314223
							],
							[
								22.24849391125975,
								45.905433875532175
							],
							[
								22.24531669710978,
								45.924893717749754
							],
							[
								22.26485160446387,
								45.93490192075303
							],
							[
								22.30233911565059,
								45.93203837510986
							],
							[
								22.322646098485226,
								45.971812022874005
							],
							[
								22.352797332227695,
								45.972697507016996
							],
							[
								22.380428665001894,
								45.96230687761453
							],
							[
								22.418955660229187,
								45.93689803733102
							],
							[
								22.410441784371468,
								45.90717365183875
							],
							[
								22.38312643069941,
								45.885615251000964
							],
							[
								22.41061463915601,
								45.85457480128238
							],
							[
								22.435757495242978,
								45.855776535309296
							],
							[
								22.47543315387296,
								45.82731058279683
							],
							[
								22.480777788112842,
								45.79453523770841
							],
							[
								22.5002504270586,
								45.78514175342148
							],
							[
								22.534249214224577,
								45.80144150288562
							],
							[
								22.551457640599523,
								45.7786450651243
							],
							[
								22.506282653412217,
								45.743254640277094
							],
							[
								22.469218030489113,
								45.730964666530994
							],
							[
								22.468580744015878,
								45.693723932629204
							],
							[
								22.431317329126628,
								45.679281602788436
							],
							[
								22.426482800553742,
								45.66889503842559
							],
							[
								22.389722174964962,
								45.66264620882442
							],
							[
								22.357551727773846,
								45.667224138727995
							],
							[
								22.31648596060198,
								45.65985690887088
							],
							[
								22.297905289782744,
								45.636870742753366
							],
							[
								22.290995941558656,
								45.6053234668337
							],
							[
								22.27069191179097,
								45.585306290295435
							],
							[
								22.237389076102012,
								45.603958629544834
							],
							[
								22.207745467048685,
								45.60567497200151
							],
							[
								22.186736637898818,
								45.61728706099579
							],
							[
								22.167526767045732,
								45.60419678217789
							],
							[
								22.103482731833154,
								45.59196629130265
							],
							[
								22.07404723137784,
								45.57194399859429
							],
							[
								22.04526230461066,
								45.591523169060174
							],
							[
								22.067201784634353,
								45.535242914506334
							],
							[
								22.06580774257708,
								45.51446722654
							],
							[
								22.03053589843391,
								45.497425167987295
							],
							[
								21.974866088479835,
								45.512443830361846
							],
							[
								21.945322641743374,
								45.506294809961084
							],
							[
								21.940124331181842,
								45.53151215351403
							],
							[
								21.92046301646224,
								45.55307287446634
							],
							[
								21.9235250341687,
								45.566883403699045
							],
							[
								21.880028474130462,
								45.561474646806936
							],
							[
								21.875670300161197,
								45.536700571899225
							],
							[
								21.831895413687448,
								45.52943884645859
							],
							[
								21.787257046244104,
								45.53294804785089
							],
							[
								21.747286198437813,
								45.54463843085035
							],
							[
								21.72466364409072,
								45.56249951750907
							],
							[
								21.69993632967208,
								45.56387078660916
							],
							[
								21.674131154645796,
								45.5858946389553
							],
							[
								21.597759956335572,
								45.556620515998134
							],
							[
								21.577766991564424,
								45.54435563391019
							],
							[
								21.57912696701898,
								45.50509750923628
							],
							[
								21.546613411598468,
								45.48835288553776
							],
							[
								21.51155623813876,
								45.49359423859205
							],
							[
								21.45870989051308,
								45.47677610544644
							],
							[
								21.465165016427783,
								45.44488399803501
							],
							[
								21.488749998582453,
								45.418627673939895
							],
							[
								21.44054287281616,
								45.40711003964714
							],
							[
								21.445093443157045,
								45.39038844483739
							],
							[
								21.488609040907356,
								45.353151684770104
							],
							[
								21.525839745557754,
								45.33158194396608
							],
							[
								21.54279953805554,
								45.2994658976778
							],
							[
								21.53132230822594,
								45.29137313360701
							],
							[
								21.556107616467585,
								45.272439831079964
							],
							[
								21.534824067741877,
								45.262803289830465
							],
							[
								21.52699603730699,
								45.23243731704511
							],
							[
								21.497357386280036,
								45.195769478250426
							],
							[
								21.47922187722323,
								45.1930858542119
							],
							[
								21.43880655225004,
								45.20281175648108
							],
							[
								21.41155688357932,
								45.22155094680807
							],
							[
								21.395368136094575,
								45.2187942837526
							],
							[
								21.292338462031346,
								45.24227814735583
							],
							[
								21.27521180003501,
								45.22945292931428
							],
							[
								21.20250658603314,
								45.2652011049281
							],
							[
								21.175312158135384,
								45.32525877822728
							],
							[
								21.144517379509193,
								45.30480186146506
							],
							[
								21.09660435795326,
								45.29586872462259
							],
							[
								21.063457193417655,
								45.331944667098405
							],
							[
								21.016551100966648,
								45.324619474141215
							],
							[
								20.981673240030958,
								45.35727322420078
							],
							[
								20.960330156388043,
								45.3667740909353
							],
							[
								20.920278091429314,
								45.41722244922154
							],
							[
								20.900508245786487,
								45.416876488756046
							],
							[
								20.87538097828052,
								45.4390860258568
							],
							[
								20.86613755211781,
								45.465248671799465
							],
							[
								20.832986407963148,
								45.479962656628295
							],
							[
								20.77109136114718,
								45.47991711362304
							],
							[
								20.768767432118675,
								45.50010935596112
							],
							[
								20.807103804870017,
								45.51580072695787
							],
							[
								20.832760169667146,
								45.53585007017032
							],
							[
								20.795312887247736,
								45.58762676960076
							],
							[
								20.77202974487613,
								45.58282721269505
							],
							[
								20.765764525538312,
								45.612605122584256
							],
							[
								20.788838810721085,
								45.64554448891771
							],
							[
								20.804989027768126,
								45.65721309406941
							],
							[
								20.79615867427148,
								45.68704660956934
							],
							[
								20.802605269669996,
								45.73779548511312
							],
							[
								20.817515409024317,
								45.7520779312454
							],
							[
								20.823074085034598,
								45.77508827690084
							],
							[
								20.78356931904658,
								45.785874403918186
							],
							[
								20.774114145123303,
								45.754519912263866
							],
							[
								20.732722199992224,
								45.755811146180434
							],
							[
								20.700275643414827,
								45.75068575759297
							],
							[
								20.681387506142595,
								45.79730881588807
							],
							[
								20.662846786104303,
								45.79415473664089
							],
							[
								20.650621798710414,
								45.8116329924274
							],
							[
								20.660379301933347,
								45.82915002938812
							],
							[
								20.61175728027238,
								45.863915479974395
							],
							[
								20.581513661617148,
								45.869403442495056
							],
							[
								20.569342063522214,
								45.9101062193483
							],
							[
								20.51582080784136,
								45.892100384726696
							],
							[
								20.50177848979109,
								45.9106559330584
							],
							[
								20.48293196801632,
								45.953419666812614
							],
							[
								20.44729482970208,
								45.97022433117013
							],
							[
								20.405479717553522,
								45.965241103925166
							],
							[
								20.34833361558066,
								45.999629315669246
							],
							[
								20.357637797961868,
								46.00587488332133
							],
							[
								20.340636026429458,
								46.03626533981937
							],
							[
								20.345882143018244,
								46.04742100877587
							],
							[
								20.309291400129204,
								46.07209079291354
							],
							[
								20.302218644710262,
								46.08660236348831
							],
							[
								20.273229089025598,
								46.09830597583591
							],
							[
								20.26309461243497,
								46.11881942131493
							],
							[
								20.296863740642014,
								46.152225835647045
							],
							[
								20.3126565924583,
								46.150158543209024
							],
							[
								20.355646532180874,
								46.16966267904737
							],
							[
								20.368485307366516,
								46.15291612599369
							],
							[
								20.39751823165396,
								46.15737698385576
							],
							[
								20.42633537266916,
								46.14519242212523
							],
							[
								20.459225009249455,
								46.14287647293024
							],
							[
								20.493268969409097,
								46.169262409227905
							],
							[
								20.501263401034546,
								46.189973098948826
							],
							[
								20.541452323532248,
								46.179602819774516
							],
							[
								20.635074683436237,
								46.126856355987805
							],
							[
								20.654165400070248,
								46.14878354597968
							],
							[
								20.68009932194399,
								46.1451454936878
							],
							[
								20.705315587804588,
								46.16134859942518
							]
						]
					]
				},
				"properties": {
					"countyId": 35,
					"countyCode": 350,
					"name": "Timiș",
					"mnemonic": "TM",
					"regionId": 5,
					"region": "Vest",
					"pop1948": 588936,
					"pop1956": 568881,
					"pop1966": 607596,
					"pop1977": 696884,
					"pop1992": 700033,
					"pop2002": 677926,
					"pop2011": 683540,
					"sortCode": 37,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								28.995053002337844,
								44.6790342115533
							],
							[
								28.963059196449066,
								44.692842293386676
							],
							[
								28.92950021415577,
								44.69769384698203
							],
							[
								28.914785842097597,
								44.686288306294124
							],
							[
								28.862821414013286,
								44.66246031531208
							],
							[
								28.824324525652916,
								44.6323504197018
							],
							[
								28.789408801310152,
								44.635741299563996
							],
							[
								28.778620358638268,
								44.65499835427003
							],
							[
								28.738992720637313,
								44.647106819026654
							],
							[
								28.677662032922424,
								44.662617619874105
							],
							[
								28.5810192209534,
								44.65810078184144
							],
							[
								28.536025686560162,
								44.66252857115122
							],
							[
								28.52079864650148,
								44.634195455728005
							],
							[
								28.466768871232397,
								44.64897326664298
							],
							[
								28.4347729265011,
								44.6738141465939
							],
							[
								28.427743584219893,
								44.65804692123113
							],
							[
								28.448774416023273,
								44.64326257280889
							],
							[
								28.435689591529783,
								44.625053722754245
							],
							[
								28.386890997970077,
								44.639527244833566
							],
							[
								28.37728935369064,
								44.66373908381431
							],
							[
								28.385056311252928,
								44.67998805654352
							],
							[
								28.365513653708607,
								44.69161419851685
							],
							[
								28.314543555234753,
								44.69610319782218
							],
							[
								28.312703783979195,
								44.711497046583624
							],
							[
								28.279199959371724,
								44.71203829938607
							],
							[
								28.261793898373114,
								44.726846023048004
							],
							[
								28.258793128534176,
								44.747973038252965
							],
							[
								28.221206928459086,
								44.764136126860876
							],
							[
								28.215805084598994,
								44.75415186483313
							],
							[
								28.18150184957519,
								44.76106788126908
							],
							[
								28.181607625037138,
								44.78537666229441
							],
							[
								28.153483107317047,
								44.800313022350295
							],
							[
								28.110051129816917,
								44.79351714348737
							],
							[
								28.074119178036025,
								44.8039037070081
							],
							[
								28.076396266721865,
								44.81993248915361
							],
							[
								28.10865792453339,
								44.86989441584704
							],
							[
								28.136463750413263,
								44.881936468169876
							],
							[
								28.127306538581507,
								44.90411493313944
							],
							[
								28.12960381100019,
								44.94175390445258
							],
							[
								28.150760794820684,
								44.97056321854305
							],
							[
								28.12846194056202,
								45.01364216004518
							],
							[
								28.152346695890685,
								45.038218160571475
							],
							[
								28.13863604450194,
								45.06438601379734
							],
							[
								28.13483447756727,
								45.098727327343475
							],
							[
								28.16863854570158,
								45.09999035540887
							],
							[
								28.172076360578192,
								45.14811115465578
							],
							[
								28.140884093090065,
								45.168475864447316
							],
							[
								28.093602054034367,
								45.188311278234906
							],
							[
								28.129796262117225,
								45.23229742632127
							],
							[
								28.116055745723276,
								45.258017066522434
							],
							[
								28.084725163612003,
								45.2496029666149
							],
							[
								28.046006011370334,
								45.25800953305159
							],
							[
								27.994819535814663,
								45.2867589414649
							],
							[
								28.027001730427116,
								45.36838046216294
							],
							[
								28.030526496060197,
								45.40434503451004
							],
							[
								28.03895626681975,
								45.415879928295226
							],
							[
								28.074912255379623,
								45.4348045554212
							],
							[
								28.10729227266143,
								45.44127247731447
							],
							[
								28.130761554090377,
								45.437291667562846
							],
							[
								28.181999210873627,
								45.41335998509277
							],
							[
								28.192172857578694,
								45.41533837731356
							],
							[
								28.193793063093775,
								45.45810723824491
							],
							[
								28.210776179169912,
								45.46718791479092
							],
							[
								28.258204426687,
								45.456962887523865
							],
							[
								28.286735636738495,
								45.43316883857102
							],
							[
								28.285435006567408,
								45.39985987915354
							],
							[
								28.334019704394304,
								45.33310207391077
							],
							[
								28.34993329093615,
								45.319922496700386
							],
							[
								28.53235047813186,
								45.26247087388995
							],
							[
								28.560985904567545,
								45.24960821315536
							],
							[
								28.632820406299583,
								45.244529908851526
							],
							[
								28.718899052890222,
								45.22436611131151
							],
							[
								28.780652060736582,
								45.237471424901
							],
							[
								28.79215461022987,
								45.249607069228446
							],
							[
								28.762145827636267,
								45.265609803550596
							],
							[
								28.756894492948394,
								45.28935872299983
							],
							[
								28.793428421848112,
								45.29321050859097
							],
							[
								28.805629189567625,
								45.309004794902705
							],
							[
								28.780410172140897,
								45.32322731225746
							],
							[
								28.81730543083143,
								45.33607948604821
							],
							[
								28.84510155601858,
								45.318088742148575
							],
							[
								28.873486539470797,
								45.31621186434517
							],
							[
								28.925419677141054,
								45.28256741665952
							],
							[
								28.94881149792928,
								45.28300930012156
							],
							[
								28.948325394296198,
								45.30912729016361
							],
							[
								28.964946288851863,
								45.33206448949555
							],
							[
								28.98259341374849,
								45.33180543114843
							],
							[
								29.04391414454166,
								45.36076374360234
							],
							[
								29.150844600638237,
								45.388610047102475
							],
							[
								29.250326202965784,
								45.43511005646022
							],
							[
								29.298945138010257,
								45.43020980802087
							],
							[
								29.329516587735654,
								45.4476842509941
							],
							[
								29.35807083335516,
								45.43696503212473
							],
							[
								29.39800229605913,
								45.436475001567125
							],
							[
								29.429972511563594,
								45.442679929918505
							],
							[
								29.479137423378614,
								45.42184337316885
							],
							[
								29.538226479857947,
								45.411656126211554
							],
							[
								29.589632267136484,
								45.39003809370087
							],
							[
								29.651102134175648,
								45.339776798622765
							],
							[
								29.669937963778832,
								45.30474380154686
							],
							[
								29.677755744717345,
								45.26926216057588
							],
							[
								29.65995518281273,
								45.25170990898405
							],
							[
								29.6725460175384,
								45.20888972044503
							],
							[
								29.629907201791298,
								45.216929263837905
							],
							[
								29.6366936939099,
								45.18087951016373
							],
							[
								29.64934629971433,
								45.161037827467744
							],
							[
								29.686968276989838,
								45.1524966232854
							],
							[
								29.6585311569385,
								45.101982332791586
							],
							[
								29.642438024242434,
								44.98810495868232
							],
							[
								29.62673920267534,
								44.924331294491125
							],
							[
								29.625122918694707,
								44.88538200590544
							],
							[
								29.606478097167034,
								44.877555944900855
							],
							[
								29.61319135404556,
								44.85728782134733
							],
							[
								29.594309915712685,
								44.832131899570236
							],
							[
								29.574826177603327,
								44.838346687824064
							],
							[
								29.55351809663862,
								44.8229019931764
							],
							[
								29.52431111517976,
								44.82447295781054
							],
							[
								29.389867377834463,
								44.805732011627605
							],
							[
								29.325955235491417,
								44.80416263415434
							],
							[
								29.245384792532857,
								44.79679428471494
							],
							[
								29.189308395102117,
								44.781820742602065
							],
							[
								29.15911855069618,
								44.780042656793135
							],
							[
								29.12182927265064,
								44.76803527204196
							],
							[
								29.0850609623352,
								44.74904280933251
							],
							[
								29.029290229866987,
								44.70929327800944
							],
							[
								28.995053002337844,
								44.6790342115533
							]
						]
					]
				},
				"properties": {
					"countyId": 36,
					"countyCode": 369,
					"name": "Tulcea",
					"mnemonic": "TL",
					"regionId": 2,
					"region": "Sud-Est",
					"pop1948": 192228,
					"pop1956": 223719,
					"pop1966": 236709,
					"pop1977": 254531,
					"pop1992": 270997,
					"pop2002": 256492,
					"pop2011": 213083,
					"sortCode": 38,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								28.114685555227553,
								46.83761817566169
							],
							[
								28.11401295580241,
								46.82225690204521
							],
							[
								28.144575517861774,
								46.80219614066531
							],
							[
								28.16718545741119,
								46.770378309814724
							],
							[
								28.188280271191623,
								46.728167966490545
							],
							[
								28.20894709440386,
								46.71270339639082
							],
							[
								28.205178067852273,
								46.69855375209831
							],
							[
								28.231449360982275,
								46.67824329040574
							],
							[
								28.252310127770283,
								46.61248886453548
							],
							[
								28.238259165735723,
								46.59686132354744
							],
							[
								28.232992572332634,
								46.563411284662216
							],
							[
								28.216348255814584,
								46.539070460712615
							],
							[
								28.228615980112746,
								46.52344522329598
							],
							[
								28.222505648040045,
								46.50218401977609
							],
							[
								28.257531732534787,
								46.459768432857345
							],
							[
								28.25862400187442,
								46.427149580499666
							],
							[
								28.232292647821275,
								46.416599212862664
							],
							[
								28.22371042130889,
								46.388344367307496
							],
							[
								28.190823154353065,
								46.35720554549075
							],
							[
								28.187097172668693,
								46.32614734754767
							],
							[
								28.207031853980215,
								46.31771844578287
							],
							[
								28.172993577963236,
								46.290201123288526
							],
							[
								28.137531317410126,
								46.28258955680155
							],
							[
								28.13224657961721,
								46.256097850284206
							],
							[
								28.111775337280424,
								46.23377690911546
							],
							[
								28.10784340762558,
								46.21461772216656
							],
							[
								28.125906027658782,
								46.207560032684626
							],
							[
								28.143877834465815,
								46.179479693777715
							],
							[
								28.14271530843136,
								46.1641029015985
							],
							[
								28.123532434959017,
								46.14771254676885
							],
							[
								28.124245315854804,
								46.11162504444903
							],
							[
								28.116051514336444,
								46.10764168817714
							],
							[
								28.075770035797458,
								46.11754166440205
							],
							[
								28.04126349664678,
								46.10645352556109
							],
							[
								27.98423260035746,
								46.11050212126233
							],
							[
								27.96468721502154,
								46.13969619963549
							],
							[
								27.939538484687358,
								46.13512884583672
							],
							[
								27.92619201005845,
								46.15248252660646
							],
							[
								27.871869979685872,
								46.145576756198444
							],
							[
								27.846862892843028,
								46.15777340603594
							],
							[
								27.84525120645077,
								46.126339971715566
							],
							[
								27.830145967215863,
								46.12718353507687
							],
							[
								27.795052477722145,
								46.09794507143671
							],
							[
								27.763518604549255,
								46.11568398633927
							],
							[
								27.7624255037951,
								46.12813680971668
							],
							[
								27.671599828183762,
								46.13281352434317
							],
							[
								27.65045626014898,
								46.14035967413533
							],
							[
								27.62666828917488,
								46.13431508847197
							],
							[
								27.597849250565947,
								46.13918764995029
							],
							[
								27.588056656472727,
								46.11140807135006
							],
							[
								27.627494877717368,
								46.06149263809977
							],
							[
								27.599864803613094,
								46.0559327279209
							],
							[
								27.604459443697404,
								46.01938177856762
							],
							[
								27.586894624036432,
								46.00762946276375
							],
							[
								27.56209835505738,
								46.00669377539873
							],
							[
								27.541335817332776,
								46.02024310972729
							],
							[
								27.515479566318657,
								46.056209335509614
							],
							[
								27.531914237138118,
								46.067133520430055
							],
							[
								27.517169732852125,
								46.08536656409151
							],
							[
								27.53543282792965,
								46.09456531728122
							],
							[
								27.50305987611173,
								46.13963805680096
							],
							[
								27.49282516348875,
								46.159230086682385
							],
							[
								27.508654929126703,
								46.19326135955512
							],
							[
								27.506474939233655,
								46.219390274870314
							],
							[
								27.478896486402586,
								46.22068473931863
							],
							[
								27.45708000136216,
								46.32032060042307
							],
							[
								27.47609857136533,
								46.32994432010194
							],
							[
								27.458973804591192,
								46.360486952666754
							],
							[
								27.449698593387062,
								46.39841286994509
							],
							[
								27.419509407512468,
								46.43251561592549
							],
							[
								27.35221635807981,
								46.55103783486289
							],
							[
								27.3280104036034,
								46.58564126894054
							],
							[
								27.276384414748524,
								46.625477884698135
							],
							[
								27.31607846233723,
								46.6521329464575
							],
							[
								27.29435119741843,
								46.674265028557734
							],
							[
								27.326551448164874,
								46.69797819498487
							],
							[
								27.239330769995597,
								46.73534950314862
							],
							[
								27.2368937407952,
								46.74751156624954
							],
							[
								27.20622371456061,
								46.769865479435744
							],
							[
								27.215082292931456,
								46.78863112861158
							],
							[
								27.21940606696834,
								46.848588927593816
							],
							[
								27.188323060712104,
								46.871488016574524
							],
							[
								27.202395369339992,
								46.88242729361383
							],
							[
								27.22629790579888,
								46.86805844747403
							],
							[
								27.278103337006105,
								46.87149169927989
							],
							[
								27.336403116358568,
								46.86771633934101
							],
							[
								27.35116290536149,
								46.88140002684147
							],
							[
								27.398094492297194,
								46.89363205241335
							],
							[
								27.40205301101337,
								46.87590263991887
							],
							[
								27.42456804006391,
								46.86251428088834
							],
							[
								27.49262456862379,
								46.87678338111892
							],
							[
								27.516532538021536,
								46.87533313340453
							],
							[
								27.519944635046773,
								46.914536827610235
							],
							[
								27.547280397732642,
								46.91432150263766
							],
							[
								27.584684840916278,
								46.87767692718
							],
							[
								27.631787616172762,
								46.896726074104
							],
							[
								27.638124161707374,
								46.91255767331723
							],
							[
								27.616533268507034,
								46.924612446606496
							],
							[
								27.606321805753446,
								46.95724265266249
							],
							[
								27.62111197759399,
								46.991656257956144
							],
							[
								27.656239137014214,
								46.9760378671781
							],
							[
								27.705358194038176,
								46.94008978825816
							],
							[
								27.768519302155802,
								46.876265298705604
							],
							[
								27.790511519567918,
								46.88596745484226
							],
							[
								27.770620317573492,
								46.94717086237813
							],
							[
								27.810461039506514,
								46.9181115867815
							],
							[
								27.814102750639183,
								46.884184414227825
							],
							[
								27.797018882468556,
								46.86016275623211
							],
							[
								27.82126613280675,
								46.853995439104914
							],
							[
								27.83621303926321,
								46.864764734226235
							],
							[
								27.866862975923954,
								46.855969488948574
							],
							[
								27.869636198252568,
								46.8396823855742
							],
							[
								27.90882091654645,
								46.805832268718966
							],
							[
								27.941988250722588,
								46.8551793454508
							],
							[
								27.979548944613313,
								46.85765650050844
							],
							[
								27.990202912521667,
								46.83841289922897
							],
							[
								28.014935365698868,
								46.83375991028735
							],
							[
								28.07028160652462,
								46.85219733465
							],
							[
								28.114685555227553,
								46.83761817566169
							]
						]
					]
				},
				"properties": {
					"countyId": 37,
					"countyCode": 378,
					"name": "Vaslui",
					"mnemonic": "VS",
					"regionId": 1,
					"region": "Nord-Est",
					"pop1948": 344917,
					"pop1956": 401626,
					"pop1966": 431555,
					"pop1977": 437251,
					"pop1992": 461374,
					"pop2002": 455049,
					"pop2011": 395499,
					"sortCode": 39,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								24.523137459570204,
								45.58057707199745
							],
							[
								24.540492594907665,
								45.535633780249455
							],
							[
								24.51621846489215,
								45.52248889039682
							],
							[
								24.527083570620185,
								45.4978901500792
							],
							[
								24.524848311966757,
								45.47503131835119
							],
							[
								24.511090780021245,
								45.46348227729785
							],
							[
								24.4855891278594,
								45.46260449038333
							],
							[
								24.4790349691125,
								45.437796906568025
							],
							[
								24.500456400013388,
								45.36314644476485
							],
							[
								24.472783616743758,
								45.35768786621907
							],
							[
								24.47346769553638,
								45.32996452179931
							],
							[
								24.491634823391674,
								45.32446456794492
							],
							[
								24.48124115278879,
								45.30266293757681
							],
							[
								24.491942595006602,
								45.277819102317935
							],
							[
								24.467876604146763,
								45.2318160464792
							],
							[
								24.48747732505253,
								45.196026904675975
							],
							[
								24.513300483204645,
								45.188937371673504
							],
							[
								24.518655948908815,
								45.135834138719574
							],
							[
								24.506917816476985,
								45.08452626308009
							],
							[
								24.48255733784753,
								45.06084185371922
							],
							[
								24.51200684216088,
								45.05503101344484
							],
							[
								24.51828208550215,
								45.040985671009004
							],
							[
								24.485185826200212,
								45.016529896366556
							],
							[
								24.508548855055235,
								44.99848257011702
							],
							[
								24.48108645401829,
								44.975906303015286
							],
							[
								24.479224311355168,
								44.963662226425456
							],
							[
								24.499750007223888,
								44.94543994762379
							],
							[
								24.470323039926345,
								44.924437884969166
							],
							[
								24.479865798687314,
								44.89921524039527
							],
							[
								24.463123323563117,
								44.8623535979631
							],
							[
								24.438128302078375,
								44.845388317670995
							],
							[
								24.41654694404038,
								44.85498222436397
							],
							[
								24.42369096024667,
								44.8907863294498
							],
							[
								24.39662247756885,
								44.90011564637155
							],
							[
								24.36787394042416,
								44.87154145428634
							],
							[
								24.33319363333428,
								44.869857425921545
							],
							[
								24.34195099184375,
								44.85348189313007
							],
							[
								24.317431214981802,
								44.79695851896639
							],
							[
								24.29636700253524,
								44.77039288853763
							],
							[
								24.274625031265764,
								44.76879274246652
							],
							[
								24.27974240245054,
								44.70767661452989
							],
							[
								24.29881928973008,
								44.67528405477035
							],
							[
								24.301230668101073,
								44.641775323630085
							],
							[
								24.324727635947436,
								44.61290616778107
							],
							[
								24.324904234983922,
								44.56086466429681
							],
							[
								24.287839059545117,
								44.56630007186307
							],
							[
								24.28198565567545,
								44.60000223710646
							],
							[
								24.259577910329572,
								44.60016039864446
							],
							[
								24.259209926850573,
								44.565880722235754
							],
							[
								24.24707541091427,
								44.55278417798169
							],
							[
								24.143091389010586,
								44.555448384927416
							],
							[
								24.117469208471256,
								44.538064511974916
							],
							[
								24.08090538451375,
								44.497545822047755
							],
							[
								24.062613383645704,
								44.495616517124745
							],
							[
								24.039291295761497,
								44.523469798397564
							],
							[
								23.990225328211793,
								44.53831162472572
							],
							[
								23.92820448329873,
								44.530237493303915
							],
							[
								23.91089844091891,
								44.578509379172544
							],
							[
								23.898049141932656,
								44.57468824536183
							],
							[
								23.882034382038412,
								44.6149740996234
							],
							[
								23.816572306974003,
								44.64757291136564
							],
							[
								23.786668750304877,
								44.64213583845845
							],
							[
								23.790980302802545,
								44.680838382979154
							],
							[
								23.78050656926567,
								44.71399854477414
							],
							[
								23.78083617704652,
								44.75937206237416
							],
							[
								23.77061371168096,
								44.77875219072555
							],
							[
								23.795915421195648,
								44.816707089552594
							],
							[
								23.785113549263016,
								44.84995232238768
							],
							[
								23.76703412033451,
								44.872109713426184
							],
							[
								23.760362867404243,
								44.89846602278104
							],
							[
								23.772283148982975,
								44.9492478645316
							],
							[
								23.76129137381122,
								44.9713650899545
							],
							[
								23.758087993015852,
								45.00567287676011
							],
							[
								23.79641878951692,
								45.02766611247623
							],
							[
								23.782581227412326,
								45.06336048804333
							],
							[
								23.82850522025277,
								45.0746711426112
							],
							[
								23.812155241211755,
								45.125236782023705
							],
							[
								23.85554301843141,
								45.15076432586423
							],
							[
								23.83769184251153,
								45.194758828199035
							],
							[
								23.823269320170816,
								45.20205068046631
							],
							[
								23.796264852712564,
								45.26102196727257
							],
							[
								23.83434203686043,
								45.309232613452814
							],
							[
								23.84161174944859,
								45.33210679782041
							],
							[
								23.796872431735117,
								45.3537662986631
							],
							[
								23.759496094025806,
								45.336914549182545
							],
							[
								23.685578171735916,
								45.32807366157994
							],
							[
								23.651384955740966,
								45.34932801510239
							],
							[
								23.62916072832481,
								45.33513705653309
							],
							[
								23.59064546569963,
								45.35308468957997
							],
							[
								23.600340404898244,
								45.37694631668067
							],
							[
								23.59169418113082,
								45.42159469509189
							],
							[
								23.576120398472924,
								45.424441112612335
							],
							[
								23.5959831793719,
								45.454544541967884
							],
							[
								23.597275526606143,
								45.47348388859443
							],
							[
								23.64076837872237,
								45.45563072976867
							],
							[
								23.674752494495852,
								45.46682699978724
							],
							[
								23.703618079745887,
								45.496784356179674
							],
							[
								23.77116507691741,
								45.51070772615414
							],
							[
								23.790871713687515,
								45.52808769140344
							],
							[
								23.85784524969967,
								45.53503012578485
							],
							[
								23.867235985097942,
								45.52565420934854
							],
							[
								23.922276017471933,
								45.53598709554949
							],
							[
								23.966532253671645,
								45.53034044553184
							],
							[
								24.011438457056524,
								45.53192781843717
							],
							[
								24.082251887688415,
								45.5122362081911
							],
							[
								24.172211902604033,
								45.51441493357847
							],
							[
								24.20413288476966,
								45.52341838001322
							],
							[
								24.228382847391764,
								45.5472935237276
							],
							[
								24.257453460422475,
								45.543218582549194
							],
							[
								24.28415168613985,
								45.56126565072523
							],
							[
								24.324325898444886,
								45.57644905319156
							],
							[
								24.373018576163574,
								45.58225703059873
							],
							[
								24.47482696702961,
								45.58278616144255
							],
							[
								24.523137459570204,
								45.58057707199745
							]
						]
					]
				},
				"properties": {
					"countyId": 38,
					"countyCode": 387,
					"name": "Vâlcea",
					"mnemonic": "VL",
					"regionId": 4,
					"region": "Sud-Vest",
					"pop1948": 341590,
					"pop1956": 362356,
					"pop1966": 368779,
					"pop1977": 414241,
					"pop1992": 438388,
					"pop2002": 413247,
					"pop2011": 371714,
					"sortCode": 40,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								27.49282516348875,
								46.159230086682385
							],
							[
								27.50305987611173,
								46.13963805680096
							],
							[
								27.480963257832677,
								46.12586923414627
							],
							[
								27.418706509572583,
								46.13145934291431
							],
							[
								27.429567684779734,
								46.093882663501546
							],
							[
								27.36829008212308,
								46.07866697024773
							],
							[
								27.285119061438888,
								46.079350957539596
							],
							[
								27.275514331166864,
								46.04780326175717
							],
							[
								27.24070440032699,
								46.04311179998776
							],
							[
								27.227025987815423,
								46.00914346153912
							],
							[
								27.2422836516518,
								45.94634997221159
							],
							[
								27.28277951300361,
								45.886325842217744
							],
							[
								27.270974924619868,
								45.87402061758416
							],
							[
								27.282094160666073,
								45.85607487640236
							],
							[
								27.303236164556264,
								45.845110236332665
							],
							[
								27.31972590909407,
								45.806135056110335
							],
							[
								27.35501191751605,
								45.75812679262568
							],
							[
								27.362359162716352,
								45.72938665287839
							],
							[
								27.403597789897397,
								45.68231375437755
							],
							[
								27.4380337652809,
								45.679318346565225
							],
							[
								27.4522677998874,
								45.65234453938009
							],
							[
								27.470053154032787,
								45.63656530348656
							],
							[
								27.508823013696446,
								45.624503571
							],
							[
								27.518759616322328,
								45.59025266924984
							],
							[
								27.504227712211758,
								45.56317244383571
							],
							[
								27.524037684365965,
								45.55337263656881
							],
							[
								27.524520218770824,
								45.51959225633739
							],
							[
								27.55852405586422,
								45.48839240074006
							],
							[
								27.48659644212007,
								45.43999613498428
							],
							[
								27.440382337595164,
								45.41481063384788
							],
							[
								27.434734877661175,
								45.39471862913219
							],
							[
								27.40144428560014,
								45.377029175518324
							],
							[
								27.336600828607924,
								45.371344503076266
							],
							[
								27.339656494646018,
								45.383401879001845
							],
							[
								27.2700103915585,
								45.39021930261605
							],
							[
								27.264785828652595,
								45.418561986961976
							],
							[
								27.28100837320854,
								45.43346272353137
							],
							[
								27.256707921796302,
								45.44942704312078
							],
							[
								27.22341561040551,
								45.427594297858846
							],
							[
								27.194384242610905,
								45.45338136643379
							],
							[
								27.174810681533422,
								45.42765967018979
							],
							[
								27.14341404981348,
								45.41037968205178
							],
							[
								27.11482316634798,
								45.40930895631739
							],
							[
								27.10475796792393,
								45.426100326527205
							],
							[
								27.13533693069023,
								45.465576784246366
							],
							[
								27.109261325615822,
								45.47490185768635
							],
							[
								27.089916801243273,
								45.445907016123854
							],
							[
								27.043739999498655,
								45.45405429608604
							],
							[
								27.002900348615942,
								45.48443074985663
							],
							[
								26.971939258007858,
								45.53515092253629
							],
							[
								26.95521678549994,
								45.528850776304466
							],
							[
								26.90605853399784,
								45.5328448813161
							],
							[
								26.885096585233867,
								45.516396820818954
							],
							[
								26.853028926434664,
								45.52536686747513
							],
							[
								26.833899674349333,
								45.51784614324267
							],
							[
								26.807520122517413,
								45.54677782933513
							],
							[
								26.76634766151106,
								45.551349690950346
							],
							[
								26.720632425028178,
								45.57091770532775
							],
							[
								26.6789534810617,
								45.60959271557798
							],
							[
								26.64776003941882,
								45.609047167556255
							],
							[
								26.615258889522696,
								45.62805126979643
							],
							[
								26.593534171540917,
								45.620358358971814
							],
							[
								26.57412730078324,
								45.63439652700629
							],
							[
								26.551383359278987,
								45.629391378533995
							],
							[
								26.530065916925206,
								45.640851375832455
							],
							[
								26.492816169229698,
								45.67690485362035
							],
							[
								26.466825082234404,
								45.719207282921175
							],
							[
								26.435724518852744,
								45.73968063023645
							],
							[
								26.440426871230365,
								45.77688818936911
							],
							[
								26.392100780208878,
								45.80240527550695
							],
							[
								26.374995744597896,
								45.82073499245699
							],
							[
								26.373322990132134,
								45.855627568935134
							],
							[
								26.387973548630054,
								45.873600652105026
							],
							[
								26.375681017683995,
								45.90708571506024
							],
							[
								26.394310615700864,
								45.920706227227946
							],
							[
								26.387477639236145,
								45.93929642129082
							],
							[
								26.397267898172633,
								45.96528859829715
							],
							[
								26.43774596938066,
								45.9893560208855
							],
							[
								26.44529617079779,
								46.01669799600384
							],
							[
								26.439990584599737,
								46.03889233816706
							],
							[
								26.456062326992704,
								46.035187168734595
							],
							[
								26.49170577992081,
								46.04522554399214
							],
							[
								26.515631540192064,
								46.02692570083133
							],
							[
								26.535556884910182,
								46.0279207773596
							],
							[
								26.572465265510512,
								46.01686418820928
							],
							[
								26.586656519991248,
								46.04057465851679
							],
							[
								26.633958072092746,
								46.05748632340372
							],
							[
								26.65249225901883,
								46.079198076859306
							],
							[
								26.67085135655091,
								46.07710316016547
							],
							[
								26.704592964343515,
								46.093890475703574
							],
							[
								26.733400163783053,
								46.095415575383775
							],
							[
								26.762996552380734,
								46.08687446378085
							],
							[
								26.781004289805765,
								46.093734729799486
							],
							[
								26.805873656052462,
								46.06627381178035
							],
							[
								26.870118416938528,
								46.08514597375955
							],
							[
								26.92336782476473,
								46.06552052147228
							],
							[
								26.95287294208827,
								46.087268529232674
							],
							[
								26.96119286334433,
								46.108722133893075
							],
							[
								26.989989888444747,
								46.112974786526294
							],
							[
								27.073950275371132,
								46.087562366072866
							],
							[
								27.105174194003926,
								46.10502642196055
							],
							[
								27.122948257312405,
								46.10409680835856
							],
							[
								27.140093862862066,
								46.13419982933154
							],
							[
								27.130821364542797,
								46.14977292561068
							],
							[
								27.221662112024013,
								46.19136950077785
							],
							[
								27.23934671738975,
								46.17833258606819
							],
							[
								27.2698653951646,
								46.18322509500818
							],
							[
								27.2627101150883,
								46.20042655000087
							],
							[
								27.309387078578126,
								46.20542821471479
							],
							[
								27.35001227001537,
								46.15272234911914
							],
							[
								27.37440135747423,
								46.15739049041521
							],
							[
								27.387838962159837,
								46.193835777977235
							],
							[
								27.419758725723472,
								46.19383302817615
							],
							[
								27.44801367293355,
								46.18421944424078
							],
							[
								27.459147952987603,
								46.15743765948094
							],
							[
								27.49282516348875,
								46.159230086682385
							]
						]
					]
				},
				"properties": {
					"countyId": 39,
					"countyCode": 396,
					"name": "Vrancea",
					"mnemonic": "VN",
					"regionId": 2,
					"region": "Sud-Est",
					"pop1948": 290183,
					"pop1956": 326532,
					"pop1966": 351292,
					"pop1977": 369740,
					"pop1992": 393408,
					"pop2002": 387632,
					"pop2011": 340310,
					"sortCode": 41,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								26.100823979989933,
								44.54080650375648
							],
							[
								26.102917008636492,
								44.50859463080391
							],
							[
								26.114879008261116,
								44.48732190879728
							],
							[
								26.180745869567755,
								44.47960226514324
							],
							[
								26.164120189144047,
								44.465237546034054
							],
							[
								26.174522835374876,
								44.44688168319205
							],
							[
								26.222735009820713,
								44.426359609518194
							],
							[
								26.2121153765553,
								44.395085538352426
							],
							[
								26.16191475891726,
								44.39832576027709
							],
							[
								26.143404293306315,
								44.37261886736827
							],
							[
								26.163957630285843,
								44.34178300465353
							],
							[
								26.15193268790431,
								44.33426179655553
							],
							[
								26.1117681640258,
								44.3612169553401
							],
							[
								26.033029100366754,
								44.383193577381824
							],
							[
								26.01086092993534,
								44.40578072216013
							],
							[
								25.975976057894208,
								44.40638616652398
							],
							[
								25.966661120595372,
								44.440739723153285
							],
							[
								26.0123183973388,
								44.44296189866247
							],
							[
								26.008499692580237,
								44.45792396073991
							],
							[
								25.982085506332357,
								44.46705511875597
							],
							[
								25.9878295595832,
								44.492119962681365
							],
							[
								26.00915096088449,
								44.51166786222891
							],
							[
								26.04824594418435,
								44.52954692665263
							],
							[
								26.100823979989933,
								44.54080650375648
							]
						]
					]
				},
				"properties": {
					"countyId": 40,
					"countyCode": 403,
					"name": "București",
					"mnemonic": "B",
					"regionId": 8,
					"region": "București-Ilfov",
					"pop1948": 1025180,
					"pop1956": 1177661,
					"pop1966": 1366684,
					"pop1977": 1807239,
					"pop1992": 2067545,
					"pop2002": 1926334,
					"pop2011": 1883425,
					"sortCode": 42,
					"version": "2016/03/10",
					"density": "8261"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								25.890748500747197,
								44.540967065683475
							],
							[
								25.920607887530938,
								44.51634585266127
							],
							[
								25.89560424876508,
								44.485345567775134
							],
							[
								25.91145292887428,
								44.471525862093706
							],
							[
								25.899951312197167,
								44.4525806608006
							],
							[
								25.867118324536246,
								44.464855696900514
							],
							[
								25.8481042772606,
								44.43036401362076
							],
							[
								25.859180023051255,
								44.41443078470982
							],
							[
								25.82371880680833,
								44.39809812293826
							],
							[
								25.858175881524193,
								44.38611448321746
							],
							[
								25.8700277949799,
								44.35741477135438
							],
							[
								25.89233165369434,
								44.35508697548479
							],
							[
								25.91075615851262,
								44.33144540853777
							],
							[
								25.93266605389736,
								44.33601762926261
							],
							[
								25.992734956694587,
								44.31703021731728
							],
							[
								26.0017485046897,
								44.29923969492862
							],
							[
								26.03122514799783,
								44.291035221205284
							],
							[
								26.048378722407392,
								44.27398665160659
							],
							[
								26.086426279291405,
								44.26587674152575
							],
							[
								26.090226266855304,
								44.25558872608959
							],
							[
								26.138172193115114,
								44.236512294046626
							],
							[
								26.162190643205776,
								44.23629656623679
							],
							[
								26.17295818319111,
								44.25040847355177
							],
							[
								26.213854388671226,
								44.263256376844254
							],
							[
								26.249528471126595,
								44.29504986186273
							],
							[
								26.259966563429458,
								44.29500039802542
							],
							[
								26.28343046323431,
								44.281343448343755
							],
							[
								26.30358423504779,
								44.25586923687838
							],
							[
								26.345839369822496,
								44.24182541310547
							],
							[
								26.36130312240502,
								44.22308739825705
							],
							[
								26.400433412054237,
								44.2242222956827
							],
							[
								26.399829696377857,
								44.1853893581426
							],
							[
								26.427079951696975,
								44.15750871219118
							],
							[
								26.418980112138065,
								44.12475344877007
							],
							[
								26.401853592032914,
								44.12581002909371
							],
							[
								26.35877011309144,
								44.10740954239
							],
							[
								26.379951045829248,
								44.042965084340814
							],
							[
								26.30481521930268,
								44.02660315782737
							],
							[
								26.279698630534174,
								44.01151297282659
							],
							[
								26.191810361678026,
								43.98320573759168
							],
							[
								26.147017466535253,
								43.98421466811427
							],
							[
								26.1116602497652,
								43.97222126306441
							],
							[
								26.042843824219815,
								43.901002046823564
							],
							[
								25.99970873082691,
								43.88526850292759
							],
							[
								25.93990499253022,
								43.851844502482706
							],
							[
								25.884343684984334,
								43.783481131617265
							],
							[
								25.85497594160905,
								43.76077816162728
							],
							[
								25.80133828886229,
								43.73665539767062
							],
							[
								25.779984688448483,
								43.71031029765355
							],
							[
								25.734168282590705,
								43.692648478938246
							],
							[
								25.671873298356417,
								43.691353298305586
							],
							[
								25.681321896667352,
								43.697922609461344
							],
							[
								25.651037182741575,
								43.749823389402785
							],
							[
								25.660128732375515,
								43.778673731239884
							],
							[
								25.65994831039404,
								43.82050549340131
							],
							[
								25.629820243427183,
								43.820550203403805
							],
							[
								25.62968481657153,
								43.844669859872845
							],
							[
								25.606899993085495,
								43.84448399045677
							],
							[
								25.606894522365863,
								43.87780762030755
							],
							[
								25.614633878402966,
								43.903812673012446
							],
							[
								25.58435064927669,
								43.90705866060302
							],
							[
								25.58480696025403,
								43.93760230670323
							],
							[
								25.61804570937198,
								43.937509137915576
							],
							[
								25.617809444551867,
								43.955873617611196
							],
							[
								25.59134284957447,
								43.98452189599636
							],
							[
								25.603881692576362,
								43.99066662062527
							],
							[
								25.59397228747015,
								44.01362609552579
							],
							[
								25.59873138236851,
								44.03770311073561
							],
							[
								25.624717793160624,
								44.08582357318732
							],
							[
								25.66283945516058,
								44.09934815991685
							],
							[
								25.676191132305185,
								44.1130010703675
							],
							[
								25.676797931532096,
								44.15720772025626
							],
							[
								25.655335079810254,
								44.16880029584598
							],
							[
								25.667340297308613,
								44.21287204778752
							],
							[
								25.699696482343633,
								44.257174732810036
							],
							[
								25.617436817318826,
								44.290621246129824
							],
							[
								25.63152312349314,
								44.30686720742559
							],
							[
								25.60420328791986,
								44.319273379611296
							],
							[
								25.571080147819472,
								44.308223888705086
							],
							[
								25.551444589525094,
								44.31863615531592
							],
							[
								25.509656849954414,
								44.314199608033476
							],
							[
								25.46812420593921,
								44.32525957075516
							],
							[
								25.47797524464704,
								44.35408957488936
							],
							[
								25.473116862713958,
								44.37363103215972
							],
							[
								25.42569028643059,
								44.39674902819404
							],
							[
								25.455947087242556,
								44.418573582176656
							],
							[
								25.48049785093266,
								44.45201187375983
							],
							[
								25.497615439927262,
								44.46549142671689
							],
							[
								25.500098724568264,
								44.48771439155109
							],
							[
								25.48103144759007,
								44.49901489048833
							],
							[
								25.500370692146728,
								44.51942381352747
							],
							[
								25.515544033941666,
								44.518911311177796
							],
							[
								25.53924569798056,
								44.53908156445418
							],
							[
								25.552690010127478,
								44.532474933494136
							],
							[
								25.60106794155065,
								44.52895318955161
							],
							[
								25.61657237205258,
								44.550080131459566
							],
							[
								25.635524615245533,
								44.54905385090574
							],
							[
								25.68295880281382,
								44.523465340370116
							],
							[
								25.70810687211033,
								44.54439747876298
							],
							[
								25.728834629420977,
								44.536394695455435
							],
							[
								25.789223641626776,
								44.53028669673839
							],
							[
								25.810146491817736,
								44.54875019935256
							],
							[
								25.87498454671844,
								44.53392748846079
							],
							[
								25.890748500747197,
								44.540967065683475
							]
						]
					]
				},
				"properties": {
					"countyId": 52,
					"countyCode": 528,
					"name": "Giurgiu",
					"mnemonic": "GR",
					"regionId": 3,
					"region": "Sud",
					"pop1948": 313793,
					"pop1956": 325045,
					"pop1966": 320120,
					"pop1977": 327494,
					"pop1992": 313352,
					"pop2002": 297859,
					"pop2011": 281422,
					"sortCode": 19,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								25.45254545655895,
								45.44135605190133
							],
							[
								25.471781286001356,
								45.426652990839024
							],
							[
								25.484414879327755,
								45.395049636551846
							],
							[
								25.47060408242591,
								45.37087791340977
							],
							[
								25.467748068419645,
								45.34642591483443
							],
							[
								25.487518303310644,
								45.314602455886174
							],
							[
								25.5032076559744,
								45.317972229113465
							],
							[
								25.533606182219234,
								45.30108656205538
							],
							[
								25.554838452683413,
								45.27056503638833
							],
							[
								25.530679834872135,
								45.249520629914436
							],
							[
								25.511414223005463,
								45.2216363108428
							],
							[
								25.534149912443084,
								45.2160476614913
							],
							[
								25.55788236318893,
								45.19228844629905
							],
							[
								25.565017027729734,
								45.171698433919644
							],
							[
								25.598045178005908,
								45.14748893838149
							],
							[
								25.605090318503713,
								45.128984500595585
							],
							[
								25.639751921086745,
								45.091988042533956
							],
							[
								25.67139463749154,
								45.083545806606686
							],
							[
								25.701350738147617,
								45.0453567874162
							],
							[
								25.675497345473865,
								45.009568058256626
							],
							[
								25.687947476096923,
								44.94738206983112
							],
							[
								25.709227861732984,
								44.9415716044256
							],
							[
								25.769411417582816,
								44.94702263320571
							],
							[
								25.791389290766798,
								44.94470351662655
							],
							[
								25.802218203582786,
								44.92108303967146
							],
							[
								25.825320888715034,
								44.897152269523666
							],
							[
								25.80211037935706,
								44.85230067708302
							],
							[
								25.774264267608842,
								44.83696738461871
							],
							[
								25.777628971805466,
								44.82465707877095
							],
							[
								25.841820490313594,
								44.809983547288994
							],
							[
								25.86820323940797,
								44.83185465199747
							],
							[
								25.900691365231594,
								44.800638975777595
							],
							[
								25.92490016229228,
								44.76315756984449
							],
							[
								25.940836025590755,
								44.75324064814516
							],
							[
								25.908393911187947,
								44.73342768086964
							],
							[
								25.93315628942396,
								44.69485726674308
							],
							[
								25.97075245954317,
								44.71042269386555
							],
							[
								25.991540171289575,
								44.70119570152753
							],
							[
								25.966003945261505,
								44.658470344958324
							],
							[
								25.939330730476385,
								44.6457248810231
							],
							[
								25.98650262475131,
								44.624740244314324
							],
							[
								25.991920720105846,
								44.61216818308543
							],
							[
								25.957029331540724,
								44.58785209782839
							],
							[
								25.87979857440907,
								44.553555387058765
							],
							[
								25.890748500747197,
								44.540967065683475
							],
							[
								25.87498454671844,
								44.53392748846079
							],
							[
								25.810146491817736,
								44.54875019935256
							],
							[
								25.789223641626776,
								44.53028669673839
							],
							[
								25.728834629420977,
								44.536394695455435
							],
							[
								25.70810687211033,
								44.54439747876298
							],
							[
								25.68295880281382,
								44.523465340370116
							],
							[
								25.635524615245533,
								44.54905385090574
							],
							[
								25.61657237205258,
								44.550080131459566
							],
							[
								25.60106794155065,
								44.52895318955161
							],
							[
								25.552690010127478,
								44.532474933494136
							],
							[
								25.53924569798056,
								44.53908156445418
							],
							[
								25.515544033941666,
								44.518911311177796
							],
							[
								25.500370692146728,
								44.51942381352747
							],
							[
								25.48103144759007,
								44.49901489048833
							],
							[
								25.500098724568264,
								44.48771439155109
							],
							[
								25.497615439927262,
								44.46549142671689
							],
							[
								25.48049785093266,
								44.45201187375983
							],
							[
								25.428798963950026,
								44.47342541855471
							],
							[
								25.449148312626807,
								44.49118126714525
							],
							[
								25.44182049189445,
								44.501503611615945
							],
							[
								25.395058296590104,
								44.51816267162692
							],
							[
								25.301745083925297,
								44.42336169503818
							],
							[
								25.25073789150242,
								44.403368805052196
							],
							[
								25.234758371174074,
								44.424265681954054
							],
							[
								25.258231521211407,
								44.44128172286461
							],
							[
								25.28002782691232,
								44.47486495548656
							],
							[
								25.26564198287573,
								44.507137982891145
							],
							[
								25.292588194416204,
								44.55145880949351
							],
							[
								25.241498141924758,
								44.578003852182114
							],
							[
								25.2112112104226,
								44.61593505968001
							],
							[
								25.204949551854572,
								44.63271925194746
							],
							[
								25.16843738144514,
								44.66171953792483
							],
							[
								25.196615290527376,
								44.66614955848416
							],
							[
								25.237274433159595,
								44.69476728805891
							],
							[
								25.184641538775384,
								44.71582160544896
							],
							[
								25.211145552471827,
								44.765238054591684
							],
							[
								25.189109161291917,
								44.828270074477906
							],
							[
								25.203757954515744,
								44.85753186277204
							],
							[
								25.190753677963954,
								44.881743413919125
							],
							[
								25.197555714150955,
								44.90329238939889
							],
							[
								25.167401750808665,
								44.92227204762632
							],
							[
								25.16905035235547,
								44.97246005397464
							],
							[
								25.195599157795844,
								44.99030302245688
							],
							[
								25.196872946866893,
								45.018573337792496
							],
							[
								25.172028393970518,
								45.04051149429087
							],
							[
								25.128194188781336,
								45.06192096549821
							],
							[
								25.142215424153715,
								45.08420248700836
							],
							[
								25.169219942498106,
								45.08049725098508
							],
							[
								25.176171550599797,
								45.1074330612488
							],
							[
								25.146642636859525,
								45.12914431108109
							],
							[
								25.153313822544046,
								45.156581220669224
							],
							[
								25.154605386863363,
								45.203535245143776
							],
							[
								25.170664896752058,
								45.20116556876139
							],
							[
								25.20711685531367,
								45.16338323051579
							],
							[
								25.251670447481086,
								45.18091539651568
							],
							[
								25.24772734082353,
								45.210929242738516
							],
							[
								25.269960361596397,
								45.21365560201059
							],
							[
								25.293713522005913,
								45.232095425845515
							],
							[
								25.280980326645082,
								45.27127282627158
							],
							[
								25.305382058560568,
								45.29249012997998
							],
							[
								25.32432046398042,
								45.34495853279793
							],
							[
								25.321583850308116,
								45.381103324187976
							],
							[
								25.361711925181723,
								45.39148720213712
							],
							[
								25.403073933897375,
								45.38742146566489
							],
							[
								25.41027717634861,
								45.42646696075859
							],
							[
								25.45254545655895,
								45.44135605190133
							]
						]
					]
				},
				"properties": {
					"countyId": 15,
					"countyCode": 154,
					"name": "Dâmbovița",
					"mnemonic": "DB",
					"regionId": 3,
					"region": "Sud",
					"pop1948": 409272,
					"pop1956": 438985,
					"pop1966": 453241,
					"pop1977": 527620,
					"pop1992": 562041,
					"pop2002": 541763,
					"pop2011": 518745,
					"sortCode": 16,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								23.59064546569963,
								45.35308468957997
							],
							[
								23.62916072832481,
								45.33513705653309
							],
							[
								23.651384955740966,
								45.34932801510239
							],
							[
								23.685578171735916,
								45.32807366157994
							],
							[
								23.759496094025806,
								45.336914549182545
							],
							[
								23.796872431735117,
								45.3537662986631
							],
							[
								23.84161174944859,
								45.33210679782041
							],
							[
								23.83434203686043,
								45.309232613452814
							],
							[
								23.796264852712564,
								45.26102196727257
							],
							[
								23.823269320170816,
								45.20205068046631
							],
							[
								23.83769184251153,
								45.194758828199035
							],
							[
								23.85554301843141,
								45.15076432586423
							],
							[
								23.812155241211755,
								45.125236782023705
							],
							[
								23.82850522025277,
								45.0746711426112
							],
							[
								23.782581227412326,
								45.06336048804333
							],
							[
								23.79641878951692,
								45.02766611247623
							],
							[
								23.758087993015852,
								45.00567287676011
							],
							[
								23.76129137381122,
								44.9713650899545
							],
							[
								23.772283148982975,
								44.9492478645316
							],
							[
								23.760362867404243,
								44.89846602278104
							],
							[
								23.76703412033451,
								44.872109713426184
							],
							[
								23.785113549263016,
								44.84995232238768
							],
							[
								23.795915421195648,
								44.816707089552594
							],
							[
								23.77061371168096,
								44.77875219072555
							],
							[
								23.78083617704652,
								44.75937206237416
							],
							[
								23.78050656926567,
								44.71399854477414
							],
							[
								23.747600306084145,
								44.71615502538274
							],
							[
								23.72169619055935,
								44.72968394150419
							],
							[
								23.712521878372037,
								44.71483347282428
							],
							[
								23.726017687216203,
								44.68550314007084
							],
							[
								23.708359001518474,
								44.657582085735065
							],
							[
								23.719902035866056,
								44.6273957180935
							],
							[
								23.71641863290762,
								44.598043448323665
							],
							[
								23.604773886367045,
								44.59422047396596
							],
							[
								23.58879332175117,
								44.61512026178272
							],
							[
								23.514504943344487,
								44.60147915956807
							],
							[
								23.501540788924757,
								44.58023613340572
							],
							[
								23.46563823078311,
								44.57858889738351
							],
							[
								23.45504252902824,
								44.56957307871759
							],
							[
								23.403623588058466,
								44.591177754950536
							],
							[
								23.40687205363921,
								44.610922701376126
							],
							[
								23.31964642279619,
								44.647845248531404
							],
							[
								23.293487192587236,
								44.67083098951802
							],
							[
								23.236353519541066,
								44.67160845168135
							],
							[
								23.206528154179317,
								44.67901520873888
							],
							[
								23.193574623365866,
								44.69398302745601
							],
							[
								23.131710440618615,
								44.68647903292345
							],
							[
								23.110702066403547,
								44.689155753327796
							],
							[
								23.062187284963994,
								44.712061984467944
							],
							[
								23.047462310566356,
								44.73397785066902
							],
							[
								23.020768744378998,
								44.736062049958726
							],
							[
								23.003415795478446,
								44.747647839783525
							],
							[
								22.99582922512879,
								44.776548794570225
							],
							[
								22.961169593662838,
								44.79471920256187
							],
							[
								22.94305765093998,
								44.81151584944179
							],
							[
								22.90837451831631,
								44.82640770633789
							],
							[
								22.889484629981546,
								44.8531036238271
							],
							[
								22.895813006326527,
								44.88456825148225
							],
							[
								22.87771938113047,
								44.92590687467894
							],
							[
								22.869909519383967,
								44.961516109813296
							],
							[
								22.890116315356227,
								44.97357051937468
							],
							[
								22.880083260807663,
								44.99627362578361
							],
							[
								22.856847632071982,
								44.98995330078827
							],
							[
								22.813882655061807,
								45.03654089175362
							],
							[
								22.78746721687116,
								45.04440881771442
							],
							[
								22.76811012642639,
								45.06112800894881
							],
							[
								22.73837074377802,
								45.05895587461741
							],
							[
								22.733291540658133,
								45.074945907287386
							],
							[
								22.703134016722547,
								45.06892986693058
							],
							[
								22.68255228429201,
								45.106186407437164
							],
							[
								22.656637356302816,
								45.10817772970089
							],
							[
								22.64946388208115,
								45.12778055518984
							],
							[
								22.62835915389093,
								45.13493942461441
							],
							[
								22.58086094937864,
								45.13755106342432
							],
							[
								22.55897081025881,
								45.15706332165275
							],
							[
								22.57557844913788,
								45.18339956586043
							],
							[
								22.60075026489162,
								45.20554885444779
							],
							[
								22.626604881422605,
								45.20877851268205
							],
							[
								22.649047990294076,
								45.23368857730768
							],
							[
								22.67398322712649,
								45.24112467875253
							],
							[
								22.686251180897337,
								45.257972051419344
							],
							[
								22.735197347432607,
								45.25342673251556
							],
							[
								22.74464950253065,
								45.26506994527458
							],
							[
								22.78481416903169,
								45.262395769822234
							],
							[
								22.835974120590492,
								45.28282821912104
							],
							[
								22.864365349486917,
								45.26107150394509
							],
							[
								22.896796355708645,
								45.274453292527355
							],
							[
								22.93332722737397,
								45.27856393824348
							],
							[
								22.96375433607053,
								45.271302573479176
							],
							[
								22.97507465917875,
								45.254133195754164
							],
							[
								23.007619579108425,
								45.253401087748685
							],
							[
								23.06605715211086,
								45.26659511294473
							],
							[
								23.09332395382957,
								45.291254107657835
							],
							[
								23.13234710538832,
								45.28079610601969
							],
							[
								23.149488824746786,
								45.28692136744502
							],
							[
								23.186873659096907,
								45.2854143759224
							],
							[
								23.20681732422911,
								45.27734354845563
							],
							[
								23.2247333612883,
								45.29955364713245
							],
							[
								23.246574004750705,
								45.307247746036026
							],
							[
								23.289441201017514,
								45.30981406535357
							],
							[
								23.309963124504947,
								45.2999298151128
							],
							[
								23.334794603703102,
								45.32825476684675
							],
							[
								23.402178245924567,
								45.33484053877672
							],
							[
								23.400361391429023,
								45.31591808099556
							],
							[
								23.452470127678456,
								45.29845966571303
							],
							[
								23.51303095371012,
								45.32709052591714
							],
							[
								23.531310247525592,
								45.328994760641365
							],
							[
								23.56702066229359,
								45.3499960230304
							],
							[
								23.59064546569963,
								45.35308468957997
							]
						]
					]
				},
				"properties": {
					"countyId": 18,
					"countyCode": 181,
					"name": "Gorj",
					"mnemonic": "GJ",
					"regionId": 4,
					"region": "Sud-Vest",
					"pop1948": 280524,
					"pop1956": 293031,
					"pop1966": 298382,
					"pop1977": 348521,
					"pop1992": 401021,
					"pop2002": 387308,
					"pop2011": 341594,
					"sortCode": 20,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								23.597275526606143,
								45.47348388859443
							],
							[
								23.5959831793719,
								45.454544541967884
							],
							[
								23.576120398472924,
								45.424441112612335
							],
							[
								23.59169418113082,
								45.42159469509189
							],
							[
								23.600340404898244,
								45.37694631668067
							],
							[
								23.59064546569963,
								45.35308468957997
							],
							[
								23.56702066229359,
								45.3499960230304
							],
							[
								23.531310247525592,
								45.328994760641365
							],
							[
								23.51303095371012,
								45.32709052591714
							],
							[
								23.452470127678456,
								45.29845966571303
							],
							[
								23.400361391429023,
								45.31591808099556
							],
							[
								23.402178245924567,
								45.33484053877672
							],
							[
								23.334794603703102,
								45.32825476684675
							],
							[
								23.309963124504947,
								45.2999298151128
							],
							[
								23.289441201017514,
								45.30981406535357
							],
							[
								23.246574004750705,
								45.307247746036026
							],
							[
								23.2247333612883,
								45.29955364713245
							],
							[
								23.20681732422911,
								45.27734354845563
							],
							[
								23.186873659096907,
								45.2854143759224
							],
							[
								23.149488824746786,
								45.28692136744502
							],
							[
								23.13234710538832,
								45.28079610601969
							],
							[
								23.09332395382957,
								45.291254107657835
							],
							[
								23.06605715211086,
								45.26659511294473
							],
							[
								23.007619579108425,
								45.253401087748685
							],
							[
								22.97507465917875,
								45.254133195754164
							],
							[
								22.96375433607053,
								45.271302573479176
							],
							[
								22.93332722737397,
								45.27856393824348
							],
							[
								22.896796355708645,
								45.274453292527355
							],
							[
								22.864365349486917,
								45.26107150394509
							],
							[
								22.835974120590492,
								45.28282821912104
							],
							[
								22.78481416903169,
								45.262395769822234
							],
							[
								22.74464950253065,
								45.26506994527458
							],
							[
								22.735197347432607,
								45.25342673251556
							],
							[
								22.686251180897337,
								45.257972051419344
							],
							[
								22.67736962077866,
								45.282551337477
							],
							[
								22.696473576368607,
								45.30292374302943
							],
							[
								22.691115779057505,
								45.32740595560631
							],
							[
								22.656598544147183,
								45.371349729628534
							],
							[
								22.69054602808917,
								45.39149318283337
							],
							[
								22.712716326349508,
								45.41564670840099
							],
							[
								22.690725562131643,
								45.49085749049983
							],
							[
								22.638651436676277,
								45.55035644523769
							],
							[
								22.63300532518068,
								45.57123267379069
							],
							[
								22.594636046895744,
								45.576266125128264
							],
							[
								22.54455652888052,
								45.59520419146233
							],
							[
								22.51474760987057,
								45.59469884969508
							],
							[
								22.497574371227348,
								45.615658152913255
							],
							[
								22.467145554589752,
								45.63367094516639
							],
							[
								22.453993004778997,
								45.660276971856675
							],
							[
								22.426482800553742,
								45.66889503842559
							],
							[
								22.431317329126628,
								45.679281602788436
							],
							[
								22.468580744015878,
								45.693723932629204
							],
							[
								22.469218030489113,
								45.730964666530994
							],
							[
								22.506282653412217,
								45.743254640277094
							],
							[
								22.551457640599523,
								45.7786450651243
							],
							[
								22.534249214224577,
								45.80144150288562
							],
							[
								22.5002504270586,
								45.78514175342148
							],
							[
								22.480777788112842,
								45.79453523770841
							],
							[
								22.47543315387296,
								45.82731058279683
							],
							[
								22.435757495242978,
								45.855776535309296
							],
							[
								22.41061463915601,
								45.85457480128238
							],
							[
								22.38312643069941,
								45.885615251000964
							],
							[
								22.410441784371468,
								45.90717365183875
							],
							[
								22.418955660229187,
								45.93689803733102
							],
							[
								22.380428665001894,
								45.96230687761453
							],
							[
								22.352797332227695,
								45.972697507016996
							],
							[
								22.350195612429538,
								45.99841937819173
							],
							[
								22.384822411884826,
								45.995992261475685
							],
							[
								22.435244456362096,
								46.01664075924641
							],
							[
								22.428492362903455,
								46.07891844954893
							],
							[
								22.405165401164876,
								46.09511328397118
							],
							[
								22.445433766301747,
								46.115920341471146
							],
							[
								22.467168085722374,
								46.14571607547109
							],
							[
								22.453115060226942,
								46.163058607153836
							],
							[
								22.448618275399085,
								46.192764695098646
							],
							[
								22.436799956262572,
								46.20795691809218
							],
							[
								22.4914050739383,
								46.24215093096499
							],
							[
								22.505117934637287,
								46.22776491442765
							],
							[
								22.548547788994185,
								46.225477546548
							],
							[
								22.583773320678336,
								46.23349089686364
							],
							[
								22.61104041299876,
								46.21919647624527
							],
							[
								22.656889924137335,
								46.23543707438338
							],
							[
								22.6554120104461,
								46.257598870317246
							],
							[
								22.68263660439918,
								46.309660952454195
							],
							[
								22.676634619523508,
								46.318415135777094
							],
							[
								22.72851044297043,
								46.33586552279635
							],
							[
								22.74871836946989,
								46.351218992815376
							],
							[
								22.77391774181203,
								46.35039690238359
							],
							[
								22.804696374809087,
								46.32978666806773
							],
							[
								22.85180534251421,
								46.32959243575384
							],
							[
								22.86896261419428,
								46.33797795054565
							],
							[
								22.935615058277016,
								46.324701403761026
							],
							[
								22.943440403095707,
								46.29830464467715
							],
							[
								22.964798339946952,
								46.2822383979948
							],
							[
								22.94771684290722,
								46.26702665549723
							],
							[
								22.964797357980665,
								46.233071593830275
							],
							[
								22.982249267428344,
								46.217378080400444
							],
							[
								23.039446418700543,
								46.20809197857305
							],
							[
								23.050514406087675,
								46.213798357805075
							],
							[
								23.095535637115184,
								46.182312243764365
							],
							[
								23.090526263548906,
								46.165939263046184
							],
							[
								23.09899797591377,
								46.14102865596461
							],
							[
								23.058822929102046,
								46.14282595910176
							],
							[
								23.06479334291678,
								46.11004905613943
							],
							[
								23.089470257117856,
								46.10021573331681
							],
							[
								23.081086300618367,
								46.08146447592972
							],
							[
								23.118812480115572,
								46.04225867909357
							],
							[
								23.184243889689597,
								46.02712921474924
							],
							[
								23.223555700181237,
								46.03292367678714
							],
							[
								23.240420127806722,
								46.00881973622059
							],
							[
								23.23359213261951,
								45.98644342248089
							],
							[
								23.269545137470985,
								45.92906853810116
							],
							[
								23.314726475204914,
								45.90456080109789
							],
							[
								23.33270565483605,
								45.87100715095179
							],
							[
								23.32371452180434,
								45.83806131966032
							],
							[
								23.34776683642458,
								45.78788878327081
							],
							[
								23.380996172382527,
								45.75918835114589
							],
							[
								23.360166016282562,
								45.71788135142001
							],
							[
								23.38213745951533,
								45.69477766531735
							],
							[
								23.418296323998003,
								45.6840186551245
							],
							[
								23.422090460399758,
								45.67007678980881
							],
							[
								23.36876644154837,
								45.64264726537248
							],
							[
								23.376894384819945,
								45.62193896809743
							],
							[
								23.409060529977484,
								45.63381535131439
							],
							[
								23.426657900790364,
								45.623069558939804
							],
							[
								23.419373268847377,
								45.591858560493435
							],
							[
								23.48899983233644,
								45.57736181520237
							],
							[
								23.518223703121198,
								45.5506979748339
							],
							[
								23.536593742182394,
								45.54981754789619
							],
							[
								23.5720735985778,
								45.52059263974919
							],
							[
								23.597275526606143,
								45.47348388859443
							]
						]
					]
				},
				"properties": {
					"countyId": 20,
					"countyCode": 207,
					"name": "Hunedoara",
					"mnemonic": "HD",
					"regionId": 5,
					"region": "Vest",
					"pop1948": 306955,
					"pop1956": 381902,
					"pop1966": 474602,
					"pop1977": 514436,
					"pop1992": 547950,
					"pop2002": 485712,
					"pop2011": 418565,
					"sortCode": 22,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								22.811952439692647,
								46.56887102413852
							],
							[
								22.835962046480628,
								46.546445710592494
							],
							[
								22.883001674921076,
								46.535907251306696
							],
							[
								22.92238800731061,
								46.553220945113694
							],
							[
								22.968255272655913,
								46.54852412045627
							],
							[
								22.9900841565675,
								46.55456197635869
							],
							[
								23.011664104730073,
								46.50350681185765
							],
							[
								23.0555533847663,
								46.49246823612038
							],
							[
								23.047185156909965,
								46.4682359838639
							],
							[
								23.09758720749842,
								46.47102546420986
							],
							[
								23.107977998890934,
								46.49194830711891
							],
							[
								23.185127579865974,
								46.50960899416948
							],
							[
								23.192009925905737,
								46.4943075186955
							],
							[
								23.236875763146635,
								46.49092094287374
							],
							[
								23.269602675855072,
								46.49776972014097
							],
							[
								23.326460745870143,
								46.519551199898984
							],
							[
								23.343150289363265,
								46.53296661354572
							],
							[
								23.391728780633635,
								46.5396297920554
							],
							[
								23.40050025293668,
								46.53059525637311
							],
							[
								23.439359914447373,
								46.52323608883759
							],
							[
								23.462233736759035,
								46.50450444884018
							],
							[
								23.514649517325534,
								46.4931199215824
							],
							[
								23.57446609239374,
								46.49716573841322
							],
							[
								23.595827480564264,
								46.48709323035081
							],
							[
								23.603064425311977,
								46.469387485927285
							],
							[
								23.588972388604247,
								46.449672796133484
							],
							[
								23.604209096432818,
								46.41755869335819
							],
							[
								23.661088809773933,
								46.3967690882977
							],
							[
								23.678557269977833,
								46.41207147445787
							],
							[
								23.677230451052203,
								46.44949523885996
							],
							[
								23.70089754349239,
								46.45741108325483
							],
							[
								23.73028651342673,
								46.45153189146752
							],
							[
								23.745387746228,
								46.458560922231975
							],
							[
								23.81404651008259,
								46.46644881110974
							],
							[
								23.84315831654925,
								46.46340686165723
							],
							[
								23.864248523956704,
								46.45112797355832
							],
							[
								23.909881639187027,
								46.46333132185968
							],
							[
								23.92328907410726,
								46.44934410052598
							],
							[
								23.94643153088591,
								46.44899021472406
							],
							[
								23.98527786280564,
								46.43093092289744
							],
							[
								23.99830649747367,
								46.42774895779318
							],
							[
								24.022860994157092,
								46.44964072194847
							],
							[
								24.035713696200116,
								46.43239672401443
							],
							[
								24.024555428899195,
								46.40335956959978
							],
							[
								23.989538444340273,
								46.38105096524699
							],
							[
								23.995782887274235,
								46.371820438874195
							],
							[
								24.082611963805522,
								46.334469138737596
							],
							[
								24.1341425011133,
								46.335802867792594
							],
							[
								24.148449503835227,
								46.32620685601894
							],
							[
								24.14236224538368,
								46.300987714497175
							],
							[
								24.1591963487894,
								46.29146709690279
							],
							[
								24.169193472334022,
								46.26887706049084
							],
							[
								24.192161653409325,
								46.28243594811986
							],
							[
								24.231314937452936,
								46.25965334789622
							],
							[
								24.22949481423209,
								46.23148971800707
							],
							[
								24.20876851137588,
								46.23291148977181
							],
							[
								24.189862529527215,
								46.18050675164103
							],
							[
								24.216773706039156,
								46.161686055175245
							],
							[
								24.15047105561895,
								46.13484745883648
							],
							[
								24.12364718690636,
								46.13652369356636
							],
							[
								24.091161020793436,
								46.11711866560524
							],
							[
								24.0584729493098,
								46.08482131447575
							],
							[
								24.026935889629538,
								46.06284309776716
							],
							[
								24.03236420144088,
								46.04074614404086
							],
							[
								24.00736085424475,
								46.01659350934592
							],
							[
								23.967808478303173,
								46.03395430671867
							],
							[
								23.890804810620743,
								46.044199882012336
							],
							[
								23.85003251352034,
								46.01167073404121
							],
							[
								23.870070945527655,
								45.948702175760026
							],
							[
								23.846610604893257,
								45.95748562785946
							],
							[
								23.816354346425854,
								45.92323845664921
							],
							[
								23.792028250477916,
								45.92784518660095
							],
							[
								23.735422329421763,
								45.91162257246709
							],
							[
								23.730426538578822,
								45.89720234371594
							],
							[
								23.7733337014596,
								45.88079817232544
							],
							[
								23.747650186149727,
								45.86179783041424
							],
							[
								23.695569322868785,
								45.80870947150347
							],
							[
								23.626575710704547,
								45.80757080732902
							],
							[
								23.6219794527172,
								45.78331929703806
							],
							[
								23.659329801620046,
								45.761198383176854
							],
							[
								23.627666757093248,
								45.75279578710495
							],
							[
								23.619422952054432,
								45.73531324768425
							],
							[
								23.588701672641267,
								45.701140587868196
							],
							[
								23.610312049961095,
								45.69058038727574
							],
							[
								23.591036582821204,
								45.67686270752146
							],
							[
								23.62535184951643,
								45.65891990232163
							],
							[
								23.644893701572325,
								45.640065159389934
							],
							[
								23.633222738965696,
								45.62849442713131
							],
							[
								23.64836751925653,
								45.59808350460919
							],
							[
								23.61797635466451,
								45.58093859967704
							],
							[
								23.610625704738528,
								45.56365106911935
							],
							[
								23.647881956077025,
								45.52682342855792
							],
							[
								23.66466241182499,
								45.49440221869915
							],
							[
								23.703618079745887,
								45.496784356179674
							],
							[
								23.674752494495852,
								45.46682699978724
							],
							[
								23.64076837872237,
								45.45563072976867
							],
							[
								23.597275526606143,
								45.47348388859443
							],
							[
								23.5720735985778,
								45.52059263974919
							],
							[
								23.536593742182394,
								45.54981754789619
							],
							[
								23.518223703121198,
								45.5506979748339
							],
							[
								23.48899983233644,
								45.57736181520237
							],
							[
								23.419373268847377,
								45.591858560493435
							],
							[
								23.426657900790364,
								45.623069558939804
							],
							[
								23.409060529977484,
								45.63381535131439
							],
							[
								23.376894384819945,
								45.62193896809743
							],
							[
								23.36876644154837,
								45.64264726537248
							],
							[
								23.422090460399758,
								45.67007678980881
							],
							[
								23.418296323998003,
								45.6840186551245
							],
							[
								23.38213745951533,
								45.69477766531735
							],
							[
								23.360166016282562,
								45.71788135142001
							],
							[
								23.380996172382527,
								45.75918835114589
							],
							[
								23.34776683642458,
								45.78788878327081
							],
							[
								23.32371452180434,
								45.83806131966032
							],
							[
								23.33270565483605,
								45.87100715095179
							],
							[
								23.314726475204914,
								45.90456080109789
							],
							[
								23.269545137470985,
								45.92906853810116
							],
							[
								23.23359213261951,
								45.98644342248089
							],
							[
								23.240420127806722,
								46.00881973622059
							],
							[
								23.223555700181237,
								46.03292367678714
							],
							[
								23.184243889689597,
								46.02712921474924
							],
							[
								23.118812480115572,
								46.04225867909357
							],
							[
								23.081086300618367,
								46.08146447592972
							],
							[
								23.089470257117856,
								46.10021573331681
							],
							[
								23.06479334291678,
								46.11004905613943
							],
							[
								23.058822929102046,
								46.14282595910176
							],
							[
								23.09899797591377,
								46.14102865596461
							],
							[
								23.090526263548906,
								46.165939263046184
							],
							[
								23.095535637115184,
								46.182312243764365
							],
							[
								23.050514406087675,
								46.213798357805075
							],
							[
								23.039446418700543,
								46.20809197857305
							],
							[
								22.982249267428344,
								46.217378080400444
							],
							[
								22.964797357980665,
								46.233071593830275
							],
							[
								22.94771684290722,
								46.26702665549723
							],
							[
								22.964798339946952,
								46.2822383979948
							],
							[
								22.943440403095707,
								46.29830464467715
							],
							[
								22.935615058277016,
								46.324701403761026
							],
							[
								22.86896261419428,
								46.33797795054565
							],
							[
								22.85180534251421,
								46.32959243575384
							],
							[
								22.804696374809087,
								46.32978666806773
							],
							[
								22.77391774181203,
								46.35039690238359
							],
							[
								22.74871836946989,
								46.351218992815376
							],
							[
								22.7278157033263,
								46.363633383653024
							],
							[
								22.699314458676728,
								46.365554727499664
							],
							[
								22.676577642938735,
								46.40583710251024
							],
							[
								22.71991372673011,
								46.43092219654449
							],
							[
								22.688214742348645,
								46.44160324249262
							],
							[
								22.677431811885953,
								46.468576933285945
							],
							[
								22.674717090600232,
								46.506572802784085
							],
							[
								22.726097108883145,
								46.54691586515918
							],
							[
								22.75129884383501,
								46.54915155830219
							],
							[
								22.752174401132446,
								46.5690508165278
							],
							[
								22.811952439692647,
								46.56887102413852
							]
						]
					]
				},
				"properties": {
					"countyId": 1,
					"countyCode": 10,
					"name": "Alba",
					"mnemonic": "AB",
					"regionId": 7,
					"region": "Centru",
					"pop1948": 361062,
					"pop1956": 370800,
					"pop1966": 382786,
					"pop1977": 409634,
					"pop1992": 413919,
					"pop2002": 382747,
					"pop2011": 342376,
					"sortCode": 1,
					"version": "2016/03/10",
					"density": "55"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								24.022715220964812,
								47.361961802632024
							],
							[
								24.01779937794963,
								47.34454312297166
							],
							[
								24.027537171777272,
								47.32185919056877
							],
							[
								24.00624683595254,
								47.310913762220764
							],
							[
								23.98209993770047,
								47.321297816811686
							],
							[
								23.95344993291493,
								47.315751238348604
							],
							[
								23.92736265954752,
								47.29635414439538
							],
							[
								23.919494374870798,
								47.252466190069654
							],
							[
								23.936031050479883,
								47.19929257740959
							],
							[
								23.950360999963742,
								47.178592774257524
							],
							[
								23.97238613661913,
								47.166951378847
							],
							[
								24.015568241208904,
								47.178636384388284
							],
							[
								24.028357333010177,
								47.1643338804744
							],
							[
								24.014881893773136,
								47.147811070670166
							],
							[
								24.064675323890462,
								47.13118654727067
							],
							[
								24.096514753111602,
								47.12700540758123
							],
							[
								24.119473623329586,
								47.10699978092485
							],
							[
								24.134242352979562,
								47.074071261865086
							],
							[
								24.118354811737365,
								47.0577100007525
							],
							[
								24.10576553122791,
								47.02509131623686
							],
							[
								24.10806815020663,
								46.9852700219081
							],
							[
								24.132636180158826,
								46.96597297766243
							],
							[
								24.17036048315208,
								46.95815177293706
							],
							[
								24.16044683271485,
								46.935670490855074
							],
							[
								24.185340178405884,
								46.92893227887549
							],
							[
								24.21403566376123,
								46.9077911325761
							],
							[
								24.21912870344794,
								46.87395204260682
							],
							[
								24.200293356056147,
								46.85282781769256
							],
							[
								24.20953942239326,
								46.83737502617964
							],
							[
								24.179577719104305,
								46.804709993658285
							],
							[
								24.16754011780126,
								46.781211709140365
							],
							[
								24.118360024524183,
								46.77434637410828
							],
							[
								24.1261242395802,
								46.74646866560588
							],
							[
								24.087889930725517,
								46.75358205350967
							],
							[
								24.067638994198244,
								46.7341936610386
							],
							[
								24.09004423972588,
								46.71073473305899
							],
							[
								24.124362803209284,
								46.70010834086772
							],
							[
								24.102390921699854,
								46.66162521924639
							],
							[
								24.033580548352226,
								46.64511342358784
							],
							[
								24.02616798954742,
								46.61762916210022
							],
							[
								24.06440803456719,
								46.60923181314651
							],
							[
								24.045374332607906,
								46.5450634100191
							],
							[
								24.029306209110185,
								46.53337797195021
							],
							[
								23.98511217352136,
								46.540913987767574
							],
							[
								23.959036645069943,
								46.51447240756582
							],
							[
								23.973704732541307,
								46.48197037684924
							],
							[
								23.972381100690754,
								46.458466911943525
							],
							[
								24.00485633550328,
								46.44222030660962
							],
							[
								23.98527786280564,
								46.43093092289744
							],
							[
								23.94643153088591,
								46.44899021472406
							],
							[
								23.92328907410726,
								46.44934410052598
							],
							[
								23.909881639187027,
								46.46333132185968
							],
							[
								23.864248523956704,
								46.45112797355832
							],
							[
								23.84315831654925,
								46.46340686165723
							],
							[
								23.81404651008259,
								46.46644881110974
							],
							[
								23.745387746228,
								46.458560922231975
							],
							[
								23.73028651342673,
								46.45153189146752
							],
							[
								23.70089754349239,
								46.45741108325483
							],
							[
								23.677230451052203,
								46.44949523885996
							],
							[
								23.678557269977833,
								46.41207147445787
							],
							[
								23.661088809773933,
								46.3967690882977
							],
							[
								23.604209096432818,
								46.41755869335819
							],
							[
								23.588972388604247,
								46.449672796133484
							],
							[
								23.603064425311977,
								46.469387485927285
							],
							[
								23.595827480564264,
								46.48709323035081
							],
							[
								23.57446609239374,
								46.49716573841322
							],
							[
								23.514649517325534,
								46.4931199215824
							],
							[
								23.462233736759035,
								46.50450444884018
							],
							[
								23.439359914447373,
								46.52323608883759
							],
							[
								23.40050025293668,
								46.53059525637311
							],
							[
								23.391728780633635,
								46.5396297920554
							],
							[
								23.343150289363265,
								46.53296661354572
							],
							[
								23.326460745870143,
								46.519551199898984
							],
							[
								23.269602675855072,
								46.49776972014097
							],
							[
								23.236875763146635,
								46.49092094287374
							],
							[
								23.192009925905737,
								46.4943075186955
							],
							[
								23.185127579865974,
								46.50960899416948
							],
							[
								23.107977998890934,
								46.49194830711891
							],
							[
								23.09758720749842,
								46.47102546420986
							],
							[
								23.047185156909965,
								46.4682359838639
							],
							[
								23.0555533847663,
								46.49246823612038
							],
							[
								23.011664104730073,
								46.50350681185765
							],
							[
								22.9900841565675,
								46.55456197635869
							],
							[
								22.968255272655913,
								46.54852412045627
							],
							[
								22.92238800731061,
								46.553220945113694
							],
							[
								22.883001674921076,
								46.535907251306696
							],
							[
								22.835962046480628,
								46.546445710592494
							],
							[
								22.811952439692647,
								46.56887102413852
							],
							[
								22.801561667488183,
								46.61762643434053
							],
							[
								22.81466276875646,
								46.63300578401341
							],
							[
								22.773959876641182,
								46.65109011093077
							],
							[
								22.77099801095674,
								46.66636885509717
							],
							[
								22.745972076580397,
								46.694802273642345
							],
							[
								22.732661041446754,
								46.72398070070998
							],
							[
								22.715006974000495,
								46.73331212836452
							],
							[
								22.712500409624564,
								46.76329874873202
							],
							[
								22.63729440824054,
								46.799413113988585
							],
							[
								22.65795990660905,
								46.80513264229919
							],
							[
								22.704150828131898,
								46.80552813407665
							],
							[
								22.727188218921185,
								46.816597955376835
							],
							[
								22.75475683320044,
								46.87655778743301
							],
							[
								22.778899172807282,
								46.89691206046054
							],
							[
								22.77537245313539,
								46.91073921932678
							],
							[
								22.74860601840485,
								46.91198579564228
							],
							[
								22.717243918312295,
								46.93335380204336
							],
							[
								22.68083650510644,
								46.942058543165196
							],
							[
								22.675083220164428,
								46.970603248144016
							],
							[
								22.728178898734473,
								47.00750297820381
							],
							[
								22.753234157895555,
								47.00271410860815
							],
							[
								22.795002093987303,
								46.977128750833884
							],
							[
								22.831306991321778,
								46.994036081370666
							],
							[
								22.891692516751657,
								46.975502570944926
							],
							[
								22.89660523193504,
								46.94426586536687
							],
							[
								22.93805174161415,
								46.91603778976408
							],
							[
								23.00422190951542,
								46.904332277892856
							],
							[
								23.041821244881366,
								46.881520953601424
							],
							[
								23.06096539176052,
								46.901329601645976
							],
							[
								23.092257108258107,
								46.890296661175405
							],
							[
								23.083434910115948,
								46.867448800225404
							],
							[
								23.10343266479225,
								46.85381178167311
							],
							[
								23.133008602298705,
								46.858772818153014
							],
							[
								23.160555818753306,
								46.87624227809718
							],
							[
								23.198221586734146,
								46.87173244454596
							],
							[
								23.220847800312917,
								46.89371088037736
							],
							[
								23.20444854561614,
								46.923921630482454
							],
							[
								23.221961733174666,
								46.95245332987729
							],
							[
								23.255698624364996,
								46.93928775712797
							],
							[
								23.256342431159037,
								46.91765978818534
							],
							[
								23.291326107490324,
								46.898128571124374
							],
							[
								23.378646831060966,
								46.9419182169778
							],
							[
								23.38494631984596,
								46.9771761165643
							],
							[
								23.4052295458287,
								46.990089958168355
							],
							[
								23.463416057202597,
								47.00115498406606
							],
							[
								23.46791656261282,
								47.020648771470356
							],
							[
								23.48759004449453,
								47.03454623939548
							],
							[
								23.451573624277316,
								47.06066157737372
							],
							[
								23.453192441404685,
								47.092256332077554
							],
							[
								23.485149129558803,
								47.09095119063568
							],
							[
								23.49790989685245,
								47.15494219641917
							],
							[
								23.53645426788957,
								47.16104037664568
							],
							[
								23.57432062561427,
								47.18037034174119
							],
							[
								23.602100275342313,
								47.16440991268941
							],
							[
								23.633865506233455,
								47.182626478410235
							],
							[
								23.645144233594117,
								47.22386648655301
							],
							[
								23.66189469116744,
								47.2368790050739
							],
							[
								23.73529285411903,
								47.24656791613398
							],
							[
								23.756613611363278,
								47.268410251688394
							],
							[
								23.798927232256347,
								47.28154844083437
							],
							[
								23.813886681363382,
								47.30719303179208
							],
							[
								23.841650789631025,
								47.327480052274225
							],
							[
								23.841384302482105,
								47.34002074056324
							],
							[
								23.852443686235418,
								47.368214531228745
							],
							[
								23.8718346721985,
								47.37170297322302
							],
							[
								23.897719619410736,
								47.35453985081965
							],
							[
								23.92264687245647,
								47.3521264337427
							],
							[
								23.969369330388545,
								47.36562325193287
							],
							[
								24.022715220964812,
								47.361961802632024
							]
						]
					]
				},
				"properties": {
					"countyId": 12,
					"countyCode": 127,
					"name": "Cluj",
					"mnemonic": "CJ",
					"regionId": 6,
					"region": "Nord-Vest",
					"pop1948": 520073,
					"pop1956": 580344,
					"pop1966": 629746,
					"pop1977": 715507,
					"pop1992": 736301,
					"pop2002": 702755,
					"pop2011": 691106,
					"sortCode": 13,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								23.841384302482105,
								47.34002074056324
							],
							[
								23.841650789631025,
								47.327480052274225
							],
							[
								23.813886681363382,
								47.30719303179208
							],
							[
								23.798927232256347,
								47.28154844083437
							],
							[
								23.756613611363278,
								47.268410251688394
							],
							[
								23.73529285411903,
								47.24656791613398
							],
							[
								23.66189469116744,
								47.2368790050739
							],
							[
								23.645144233594117,
								47.22386648655301
							],
							[
								23.633865506233455,
								47.182626478410235
							],
							[
								23.602100275342313,
								47.16440991268941
							],
							[
								23.57432062561427,
								47.18037034174119
							],
							[
								23.53645426788957,
								47.16104037664568
							],
							[
								23.49790989685245,
								47.15494219641917
							],
							[
								23.485149129558803,
								47.09095119063568
							],
							[
								23.453192441404685,
								47.092256332077554
							],
							[
								23.451573624277316,
								47.06066157737372
							],
							[
								23.48759004449453,
								47.03454623939548
							],
							[
								23.46791656261282,
								47.020648771470356
							],
							[
								23.463416057202597,
								47.00115498406606
							],
							[
								23.4052295458287,
								46.990089958168355
							],
							[
								23.38494631984596,
								46.9771761165643
							],
							[
								23.378646831060966,
								46.9419182169778
							],
							[
								23.291326107490324,
								46.898128571124374
							],
							[
								23.256342431159037,
								46.91765978818534
							],
							[
								23.255698624364996,
								46.93928775712797
							],
							[
								23.221961733174666,
								46.95245332987729
							],
							[
								23.20444854561614,
								46.923921630482454
							],
							[
								23.220847800312917,
								46.89371088037736
							],
							[
								23.198221586734146,
								46.87173244454596
							],
							[
								23.160555818753306,
								46.87624227809718
							],
							[
								23.133008602298705,
								46.858772818153014
							],
							[
								23.10343266479225,
								46.85381178167311
							],
							[
								23.083434910115948,
								46.867448800225404
							],
							[
								23.092257108258107,
								46.890296661175405
							],
							[
								23.06096539176052,
								46.901329601645976
							],
							[
								23.041821244881366,
								46.881520953601424
							],
							[
								23.00422190951542,
								46.904332277892856
							],
							[
								22.93805174161415,
								46.91603778976408
							],
							[
								22.89660523193504,
								46.94426586536687
							],
							[
								22.891692516751657,
								46.975502570944926
							],
							[
								22.831306991321778,
								46.994036081370666
							],
							[
								22.795002093987303,
								46.977128750833884
							],
							[
								22.753234157895555,
								47.00271410860815
							],
							[
								22.728178898734473,
								47.00750297820381
							],
							[
								22.708826289387208,
								47.011160649788316
							],
							[
								22.686779740281597,
								47.05134848452072
							],
							[
								22.667297227842365,
								47.05001621954821
							],
							[
								22.593292381968865,
								47.063833778846394
							],
							[
								22.568579779258055,
								47.08244613713108
							],
							[
								22.54522270158912,
								47.087942219465816
							],
							[
								22.520747545577365,
								47.10681413491406
							],
							[
								22.55357913936736,
								47.127396747675746
							],
							[
								22.548609276309342,
								47.149614428316845
							],
							[
								22.53306997867344,
								47.16626268069341
							],
							[
								22.508204921343864,
								47.16563356977282
							],
							[
								22.493553180004238,
								47.18525562754483
							],
							[
								22.511698514321534,
								47.19653262488682
							],
							[
								22.51679711380893,
								47.23269803727389
							],
							[
								22.539875565143728,
								47.23385400670403
							],
							[
								22.556628824557787,
								47.251186333218975
							],
							[
								22.549468156061856,
								47.29616387092826
							],
							[
								22.61267904880081,
								47.33475337688767
							],
							[
								22.645086940960166,
								47.37388066569085
							],
							[
								22.675339199861366,
								47.37722077439509
							],
							[
								22.722593842786132,
								47.39266081641519
							],
							[
								22.733485403911697,
								47.40499024793335
							],
							[
								22.768223662274725,
								47.41863124609526
							],
							[
								22.801904354101477,
								47.41151924074609
							],
							[
								22.832986722705122,
								47.418105478018305
							],
							[
								22.916167298040726,
								47.4135354962915
							],
							[
								22.920650669728936,
								47.394611382251504
							],
							[
								22.955374333247136,
								47.3608729154673
							],
							[
								22.97663627085287,
								47.352047021846445
							],
							[
								23.002855818178812,
								47.3689559779155
							],
							[
								23.0375823936412,
								47.359424767920046
							],
							[
								23.08714155304239,
								47.36341589745323
							],
							[
								23.089787951970283,
								47.38424089437885
							],
							[
								23.119117893352414,
								47.39564682745074
							],
							[
								23.115949885892334,
								47.43147952275518
							],
							[
								23.106106873372813,
								47.44237055121649
							],
							[
								23.15664084839445,
								47.44149438443456
							],
							[
								23.184967026701436,
								47.4548552274409
							],
							[
								23.22058682662217,
								47.43314715473828
							],
							[
								23.25430459915437,
								47.4332373983609
							],
							[
								23.287949043310373,
								47.42276497141669
							],
							[
								23.3112916221627,
								47.42389163089238
							],
							[
								23.33623591778623,
								47.41190353487207
							],
							[
								23.357586334933327,
								47.41592003730681
							],
							[
								23.377185021381443,
								47.388029681346424
							],
							[
								23.397219200627305,
								47.39179901397881
							],
							[
								23.43760095737332,
								47.38095283712461
							],
							[
								23.479694356436443,
								47.37770928192977
							],
							[
								23.49277086077756,
								47.36602121070293
							],
							[
								23.538709726277027,
								47.369611780663334
							],
							[
								23.578506065746677,
								47.36459959328172
							],
							[
								23.645357945108568,
								47.39296553975226
							],
							[
								23.667991084849376,
								47.36519295686321
							],
							[
								23.72745296508913,
								47.32103872228569
							],
							[
								23.760069073711247,
								47.32587723409263
							],
							[
								23.824932558302642,
								47.34474281341534
							],
							[
								23.841384302482105,
								47.34002074056324
							]
						]
					]
				},
				"properties": {
					"countyId": 31,
					"countyCode": 314,
					"name": "Sălaj",
					"mnemonic": "SJ",
					"regionId": 6,
					"region": "Nord-Vest",
					"pop1948": 262580,
					"pop1956": 271989,
					"pop1966": 263103,
					"pop1977": 264569,
					"pop1992": 266797,
					"pop2002": 248015,
					"pop2011": 224384,
					"sortCode": 33,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								28.017385629757317,
								44.34026564616973
							],
							[
								28.011857128419816,
								44.322095637620805
							],
							[
								27.967484729612117,
								44.274151232770166
							],
							[
								27.936132623577333,
								44.25063868354907
							],
							[
								27.884921223241,
								44.2510606200938
							],
							[
								27.828639473911114,
								44.24659144036967
							],
							[
								27.778627348507623,
								44.232567068756886
							],
							[
								27.73294162669752,
								44.19944076701468
							],
							[
								27.712209056093013,
								44.19581931719831
							],
							[
								27.62939208596647,
								44.20533859193975
							],
							[
								27.577793535540117,
								44.190747252076946
							],
							[
								27.5283345790964,
								44.17008663860527
							],
							[
								27.50750614702761,
								44.15357643686681
							],
							[
								27.453439692869413,
								44.125090526369995
							],
							[
								27.392738674887546,
								44.13196058969572
							],
							[
								27.34577372657904,
								44.13126768928264
							],
							[
								27.305325923622014,
								44.14047220778016
							],
							[
								27.27135599915703,
								44.126352188045644
							],
							[
								27.23347393171874,
								44.11648040570579
							],
							[
								27.18517355772585,
								44.12051214360673
							],
							[
								27.14568891589858,
								44.1384897859923
							],
							[
								27.09000476334428,
								44.13311480264611
							],
							[
								27.041933652692258,
								44.14463153988886
							],
							[
								26.994495267077212,
								44.13392791120578
							],
							[
								26.961891819261787,
								44.13620400193372
							],
							[
								26.89844531825504,
								44.131272204256405
							],
							[
								26.84084779348761,
								44.11147189173657
							],
							[
								26.777907184941327,
								44.082473186328045
							],
							[
								26.723723649085237,
								44.07268343183795
							],
							[
								26.690277786553782,
								44.0744426602088
							],
							[
								26.662789958081916,
								44.06486791919528
							],
							[
								26.592804576836766,
								44.050051399172
							],
							[
								26.537719348008263,
								44.054387622624766
							],
							[
								26.43461298345955,
								44.03311380515786
							],
							[
								26.379951045829248,
								44.042965084340814
							],
							[
								26.35877011309144,
								44.10740954239
							],
							[
								26.401853592032914,
								44.12581002909371
							],
							[
								26.418980112138065,
								44.12475344877007
							],
							[
								26.427079951696975,
								44.15750871219118
							],
							[
								26.399829696377857,
								44.1853893581426
							],
							[
								26.400433412054237,
								44.2242222956827
							],
							[
								26.36130312240502,
								44.22308739825705
							],
							[
								26.345839369822496,
								44.24182541310547
							],
							[
								26.30358423504779,
								44.25586923687838
							],
							[
								26.28343046323431,
								44.281343448343755
							],
							[
								26.259966563429458,
								44.29500039802542
							],
							[
								26.275840681632168,
								44.31723791375291
							],
							[
								26.252500728421037,
								44.33025274523611
							],
							[
								26.28034043798506,
								44.34895767210691
							],
							[
								26.305888885978998,
								44.35084925311535
							],
							[
								26.314772655873078,
								44.371822121195926
							],
							[
								26.2868091465814,
								44.4051609304827
							],
							[
								26.32321001497683,
								44.39612272916398
							],
							[
								26.375580702092194,
								44.42187278707853
							],
							[
								26.398792400405647,
								44.42116502958374
							],
							[
								26.401443029870908,
								44.438425299396094
							],
							[
								26.441442565357466,
								44.437722062890266
							],
							[
								26.45194833990392,
								44.4559775743014
							],
							[
								26.39536968173862,
								44.45720845122354
							],
							[
								26.360552179618935,
								44.4861147684111
							],
							[
								26.416070104324678,
								44.52169759700258
							],
							[
								26.428473868673937,
								44.52158847674502
							],
							[
								26.462576057500435,
								44.54339423043879
							],
							[
								26.439006994425004,
								44.5486695616004
							],
							[
								26.450135405032714,
								44.56616374298587
							],
							[
								26.47984505602787,
								44.57651843749847
							],
							[
								26.525138238763752,
								44.55622625935836
							],
							[
								26.56288666131952,
								44.52661540766989
							],
							[
								26.599353049058013,
								44.523082992861475
							],
							[
								26.635553160329163,
								44.54087798348657
							],
							[
								26.664983468033707,
								44.59555305499116
							],
							[
								26.683818594479394,
								44.59106627108309
							],
							[
								26.680852455166907,
								44.56242284622416
							],
							[
								26.725967479838566,
								44.55902761801135
							],
							[
								26.722703245891466,
								44.53769746055904
							],
							[
								26.75417304185699,
								44.52807633101777
							],
							[
								26.760257441504,
								44.54993473930632
							],
							[
								26.786944804176752,
								44.54181495184123
							],
							[
								26.779272985969097,
								44.521422341333604
							],
							[
								26.796291273046972,
								44.51103539426753
							],
							[
								26.82990190958005,
								44.52757034643193
							],
							[
								26.89270677078631,
								44.51593732959095
							],
							[
								26.9717340797558,
								44.52895998559925
							],
							[
								27.00359057392003,
								44.52900481210991
							],
							[
								27.003478763156306,
								44.50870152452935
							],
							[
								27.091681125557717,
								44.50860429234053
							],
							[
								27.091543836510436,
								44.48509564473028
							],
							[
								27.135500190195227,
								44.48303630098784
							],
							[
								27.13985736896501,
								44.500938948989045
							],
							[
								27.206178043051533,
								44.483853983333866
							],
							[
								27.227880767482457,
								44.493483076263864
							],
							[
								27.26291045506036,
								44.489192041525804
							],
							[
								27.345596114519584,
								44.48595722188895
							],
							[
								27.35216881184896,
								44.51730725983285
							],
							[
								27.388468323376376,
								44.49624682057784
							],
							[
								27.50242033822408,
								44.493566766018496
							],
							[
								27.518514573971515,
								44.49716189977422
							],
							[
								27.525245158746934,
								44.543824034241766
							],
							[
								27.54637545954307,
								44.56203034800475
							],
							[
								27.57195799619663,
								44.55909007965917
							],
							[
								27.570202389577926,
								44.46782328022412
							],
							[
								27.639095708330576,
								44.47072251708824
							],
							[
								27.65939746704789,
								44.44614735286345
							],
							[
								27.654287693713623,
								44.42094016914022
							],
							[
								27.731310001308593,
								44.419189422197896
							],
							[
								27.748003240328483,
								44.39741577679874
							],
							[
								27.748581594091558,
								44.36186927508337
							],
							[
								27.771880903376644,
								44.34435922513084
							],
							[
								27.789099945309847,
								44.35514280828253
							],
							[
								27.81335357116038,
								44.334150325914365
							],
							[
								27.834731367263288,
								44.34731976282403
							],
							[
								27.85505570473026,
								44.38012620084891
							],
							[
								28.017385629757317,
								44.34026564616973
							]
						]
					]
				},
				"properties": {
					"countyId": 51,
					"countyCode": 519,
					"name": "Călărași",
					"mnemonic": "CL",
					"regionId": 3,
					"region": "Sud",
					"pop1948": 287722,
					"pop1956": 318573,
					"pop1966": 337261,
					"pop1977": 338807,
					"pop1992": 338804,
					"pop2002": 324617,
					"pop2011": 306691,
					"sortCode": 12,
					"version": "2016/03/10"
				}
			},
			{
				"type": "Feature",
				"geometry": {
					"type": "Polygon",
					"coordinates": [
						[
							[
								26.301827103308554,
								44.768889606989454
							],
							[
								26.348587455266177,
								44.73179602273273
							],
							[
								26.374175031913577,
								44.72049102195561
							],
							[
								26.347136353669875,
								44.669521596458694
							],
							[
								26.37571749728358,
								44.62086164206213
							],
							[
								26.401274256236487,
								44.61080782578868
							],
							[
								26.381574817493693,
								44.585004571061255
							],
							[
								26.34311292243354,
								44.549323327670585
							],
							[
								26.36710879919079,
								44.52693461252377
							],
							[
								26.3886327668879,
								44.53874870151801
							],
							[
								26.416070104324678,
								44.52169759700258
							],
							[
								26.360552179618935,
								44.4861147684111
							],
							[
								26.39536968173862,
								44.45720845122354
							],
							[
								26.45194833990392,
								44.4559775743014
							],
							[
								26.441442565357466,
								44.437722062890266
							],
							[
								26.401443029870908,
								44.438425299396094
							],
							[
								26.398792400405647,
								44.42116502958374
							],
							[
								26.375580702092194,
								44.42187278707853
							],
							[
								26.32321001497683,
								44.39612272916398
							],
							[
								26.2868091465814,
								44.4051609304827
							],
							[
								26.314772655873078,
								44.371822121195926
							],
							[
								26.305888885978998,
								44.35084925311535
							],
							[
								26.28034043798506,
								44.34895767210691
							],
							[
								26.252500728421037,
								44.33025274523611
							],
							[
								26.275840681632168,
								44.31723791375291
							],
							[
								26.259966563429458,
								44.29500039802542
							],
							[
								26.249528471126595,
								44.29504986186273
							],
							[
								26.213854388671226,
								44.263256376844254
							],
							[
								26.17295818319111,
								44.25040847355177
							],
							[
								26.162190643205776,
								44.23629656623679
							],
							[
								26.138172193115114,
								44.236512294046626
							],
							[
								26.090226266855304,
								44.25558872608959
							],
							[
								26.086426279291405,
								44.26587674152575
							],
							[
								26.048378722407392,
								44.27398665160659
							],
							[
								26.03122514799783,
								44.291035221205284
							],
							[
								26.0017485046897,
								44.29923969492862
							],
							[
								25.992734956694587,
								44.31703021731728
							],
							[
								25.93266605389736,
								44.33601762926261
							],
							[
								25.91075615851262,
								44.33144540853777
							],
							[
								25.89233165369434,
								44.35508697548479
							],
							[
								25.8700277949799,
								44.35741477135438
							],
							[
								25.858175881524193,
								44.38611448321746
							],
							[
								25.82371880680833,
								44.39809812293826
							],
							[
								25.859180023051255,
								44.41443078470982
							],
							[
								25.8481042772606,
								44.43036401362076
							],
							[
								25.867118324536246,
								44.464855696900514
							],
							[
								25.899951312197167,
								44.4525806608006
							],
							[
								25.91145292887428,
								44.471525862093706
							],
							[
								25.89560424876508,
								44.485345567775134
							],
							[
								25.920607887530938,
								44.51634585266127
							],
							[
								25.890748500747197,
								44.540967065683475
							],
							[
								25.87979857440907,
								44.553555387058765
							],
							[
								25.957029331540724,
								44.58785209782839
							],
							[
								25.991920720105846,
								44.61216818308543
							],
							[
								25.98650262475131,
								44.624740244314324
							],
							[
								25.939330730476385,
								44.6457248810231
							],
							[
								25.966003945261505,
								44.658470344958324
							],
							[
								25.991540171289575,
								44.70119570152753
							],
							[
								25.97075245954317,
								44.71042269386555
							],
							[
								25.9660469796607,
								44.73797694232155
							],
							[
								26.024126908218264,
								44.7447529917374
							],
							[
								26.05194206791557,
								44.73521090896025
							],
							[
								26.101920356337203,
								44.766945058652496
							],
							[
								26.13251880842705,
								44.74986113022351
							],
							[
								26.15295412016633,
								44.75865216190968
							],
							[
								26.17445350872948,
								44.74920220539125
							],
							[
								26.219340476273622,
								44.749574204657314
							],
							[
								26.2488683255213,
								44.7382781620217
							],
							[
								26.27382335946857,
								44.768914501620756
							],
							[
								26.301827103308554,
								44.768889606989454
							]
						],
						[
							[
								26.100823979989933,
								44.54080650375648
							],
							[
								26.04824594418435,
								44.52954692665263
							],
							[
								26.00915096088449,
								44.51166786222891
							],
							[
								25.9878295595832,
								44.492119962681365
							],
							[
								25.982085506332357,
								44.46705511875597
							],
							[
								26.008499692580237,
								44.45792396073991
							],
							[
								26.0123183973388,
								44.44296189866247
							],
							[
								25.966661120595372,
								44.440739723153285
							],
							[
								25.975976057894208,
								44.40638616652398
							],
							[
								26.01086092993534,
								44.40578072216013
							],
							[
								26.033029100366754,
								44.383193577381824
							],
							[
								26.1117681640258,
								44.3612169553401
							],
							[
								26.15193268790431,
								44.33426179655553
							],
							[
								26.163957630285843,
								44.34178300465353
							],
							[
								26.143404293306315,
								44.37261886736827
							],
							[
								26.16191475891726,
								44.39832576027709
							],
							[
								26.2121153765553,
								44.395085538352426
							],
							[
								26.222735009820713,
								44.426359609518194
							],
							[
								26.174522835374876,
								44.44688168319205
							],
							[
								26.164120189144047,
								44.465237546034054
							],
							[
								26.180745869567755,
								44.47960226514324
							],
							[
								26.114879008261116,
								44.48732190879728
							],
							[
								26.102917008636492,
								44.50859463080391
							],
							[
								26.100823979989933,
								44.54080650375648
							]
						]
					]
				},
				"properties": {
					"countyId": 23,
					"countyCode": 234,
					"name": "Ilfov",
					"mnemonic": "IF",
					"regionId": 8,
					"region": "București-Ilfov",
					"pop1948": 167533,
					"pop1956": 196265,
					"pop1966": 229773,
					"pop1977": 287738,
					"pop1992": 286965,
					"pop2002": 300123,
					"pop2011": 388738,
					"sortCode": 25,
					"version": "2016/03/10",
					"density": "246"
				}
			}
		]
	};

/***/ },
/* 82 */
/***/ function(module, exports) {

	module.exports = "\n<div>\n\t<div class=\"columns\">\n\t\t<div class=\"column\">\n\t\t\t<multiselect\n\t\t      placeholder=\"Boala\"\n\t\t      :selected=\"selected\"\n\t\t      :options=\"options\"\n\t\t      @update=\"updateSelected\">\n\t\t    </multiselect>\n\t\t</div>\n\t\t<div class=\"column\">\n\t\t\t<multiselect\n\t\t      placeholder=\"An\"\n\t\t      :selected=\"selectedYear\"\n\t\t      :options=\"years\"\n\t\t      @update=\"updateSelectedYear\">\n\t\t    </multiselect>\n\t\t</div>\n\t</div>\n\t<div id=\"map\" class=\"map\"></div>\n</div>\n";

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_template__ = __webpack_require__(84)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-75e7073c/About.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 84 */
/***/ function(module, exports) {

	module.exports = "\n<div>\n\t<h1>About the project</h1>\n\t<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus voluptatibus molestias ducimus maxime facere blanditiis perspiciatis, quia beatae ex laborum, adipisci dignissimos voluptatum nihil, ullam incidunt debitis delectus a ad corporis quas aliquam necessitatibus non soluta iure. Tempora qui magni ea velit iure laudantium voluptatibus rerum aliquam dolor, deserunt, voluptatem incidunt nulla quasi officia quia dolores optio vitae eos ex quo ducimus ratione debitis repellendus consectetur rem! Et assumenda, est!</p>\n</div>\n";

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_template__ = __webpack_require__(86)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-023e3c1e/Achizitii.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 86 */
/***/ function(module, exports) {

	module.exports = "\n<h1>Pagina achizitii</h1>\n";

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(88)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources/assets/js/components/Header.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(89)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-71bd1e20/Header.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 88 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	// <template>
	// 	<header>
	// 		<nav class="nav has-shadow">
	// 			<div class="container is-fluid">
	// 				<div class="nav-left">
	// 				  <router-link to="/" class="nav-item is-brand">
	// 				      <h1>SANAJSCU</h1>
	// 			      </router-link>
	// 			    </div>
	//
	// 				<span class="nav-toggle">
	// 					<span></span>
	// 					<span></span>
	// 					<span></span>
	// 				</span>
	//
	// 				<div class="nav-right nav-menu">
	// 					<router-link to="/" exact class="nav-item is-tab" active-class="is-active">Acasa</router-link>
	// 					<router-link to="/about" class="nav-item is-tab" active-class="is-active">Despre</router-link>
	// 				</div>
	// 			</div>
	// 		</nav>
	// 	</header>
	// </template>
	//
	// <script type="text/javascript">
	exports.default = {
		name: 'main-header',
		data: function data() {
			return {};
		}
	};
	// </script>

/***/ },
/* 89 */
/***/ function(module, exports) {

	module.exports = "\n<header>\n\t<nav class=\"nav has-shadow\">\n\t\t<div class=\"container is-fluid\">\n\t\t\t<div class=\"nav-left\">\n\t\t\t  <router-link to=\"/\" class=\"nav-item is-brand\">\n\t\t\t      <h1>SANAJSCU</h1>\n\t\t      </router-link>\n\t\t    </div>\n\n\t\t\t<span class=\"nav-toggle\">\n\t\t\t\t<span></span>\n\t\t\t\t<span></span>\n\t\t\t\t<span></span>\n\t\t\t</span>\n\n\t\t\t<div class=\"nav-right nav-menu\">\n\t\t\t\t<router-link to=\"/\" exact class=\"nav-item is-tab\" active-class=\"is-active\">Acasa</router-link>\n\t\t\t\t<router-link to=\"/about\" class=\"nav-item is-tab\" active-class=\"is-active\">Despre</router-link>\n\t\t\t</div>\n\t\t</div>\n\t</nav>\n</header>\n";

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(91)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources/assets/js/components/Sidebar.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(92)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-697707d9/Sidebar.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 91 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <aside class="menu">
	//       <p class="menu-label">
	//         Statistici
	//       </p>
	//       <ul class="menu-list">
	//         <li><a href="#">Achizitii</a></li>
	//         <li><a href="#">Epidemii</a></li>
	//         <li><a href="#">Spitale</a></li>
	//       </ul>
	//       <p class="menu-label">
	//         Alerte
	//       </p>
	//       <ul class="menu-list">
	//         <li><a href="#">Team Settings</a></li>
	//         <li>
	//           <a class="is-active" href="#">Manage Your Team</a>
	//           <ul>
	//             <li><a href="#">Members</a></li>
	//             <li><a href="#">Plugins</a></li>
	//             <li><a href="#">Add a member</a></li>
	//           </ul>
	//         </li>
	//       </ul>
	// </template>
	//
	// <script>
	exports.default = {
	    mounted: function mounted() {
	        console.log('Component ready.');
	    }
	};
	// </script>

/***/ },
/* 92 */
/***/ function(module, exports) {

	module.exports = "\n<aside class=\"menu\">\n  <p class=\"menu-label\">\n    Statistici\n  </p>\n  <ul class=\"menu-list\">\n    <li><a href=\"#\">Achizitii</a></li>\n    <li><a href=\"#\">Epidemii</a></li>\n    <li><a href=\"#\">Spitale</a></li>\n  </ul>\n  <p class=\"menu-label\">\n    Alerte\n  </p>\n  <ul class=\"menu-list\">\n    <li><a href=\"#\">Team Settings</a></li>\n    <li>\n      <a class=\"is-active\" href=\"#\">Manage Your Team</a>\n      <ul>\n        <li><a href=\"#\">Members</a></li>\n        <li><a href=\"#\">Plugins</a></li>\n        <li><a href=\"#\">Add a member</a></li>\n      </ul>\n    </li>\n  </ul>\n";

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(94)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources/assets/js/components/MainContent.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(95)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-366c3706/MainContent.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 94 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <div class="column">
	// 		<slot></slot>
	// 	</div>
	// </template>
	//
	// <script>
	exports.default = {
	    mounted: function mounted() {
	        console.log('Component ready.');
	    }
	};
	// </script>

/***/ },
/* 95 */
/***/ function(module, exports) {

	module.exports = "\n    <div class=\"column\">\n\t\t<slot></slot>\n\t</div>\n";

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	var __vue_styles__ = {}
	__vue_script__ = __webpack_require__(97)
	if (__vue_script__ &&
	    __vue_script__.__esModule &&
	    Object.keys(__vue_script__).length > 1) {
	  console.warn("[vue-loader] resources/assets/js/components/Footer.vue: named exports in *.vue files are ignored.")}
	__vue_template__ = __webpack_require__(98)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	var __vue_options__ = typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports
	if (__vue_template__) {
	__vue_options__.template = __vue_template__
	}
	if (!__vue_options__.computed) __vue_options__.computed = {}
	Object.keys(__vue_styles__).forEach(function (key) {
	var module = __vue_styles__[key]
	__vue_options__.computed[key] = function () { return module }
	})
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-508aba2e/Footer.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 97 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	// <template>
	//     <footer class="footer">
	// 	  <div class="container">
	// 	    <div class="content has-text-centered">
	// 	      <p>
	// 	        <strong>SANAJSCU</strong> The source code is licensed
	// 	        <a href="http://opensource.org/licenses/mit-license.php">MIT</a>.
	// 	      </p>
	// 	      <p>
	// 	        <a class="icon" href="https://github.com/jshacks/challenge-sanajscu">
	// 	          <i class="fa fa-github"></i>
	// 	        </a>
	// 	      </p>
	// 	    </div>
	// 	  </div>
	// 	</footer>
	// </template>
	//
	// <script>
	exports.default = {
	    mounted: function mounted() {
	        console.log('Component ready.');
	    }
	};
	// </script>

/***/ },
/* 98 */
/***/ function(module, exports) {

	module.exports = "\n    <footer class=\"footer\">\n\t  <div class=\"container\">\n\t    <div class=\"content has-text-centered\">\n\t      <p>\n\t        <strong>SANAJSCU</strong> The source code is licensed\n\t        <a href=\"http://opensource.org/licenses/mit-license.php\">MIT</a>.\n\t      </p>\n\t      <p>\n\t        <a class=\"icon\" href=\"https://github.com/jshacks/challenge-sanajscu\">\n\t          <i class=\"fa fa-github\"></i>\n\t        </a>\n\t      </p>\n\t    </div>\n\t  </div>\n\t</footer>\n";

/***/ },
/* 99 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }
]);