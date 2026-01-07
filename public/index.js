
(function() {
  const source = new EventSource('http://localhost:35729/esbuild');
  source.addEventListener('change', () => {
    location.reload();
  });
  source.addEventListener('error', (e) => {
    if (e.target.readyState === EventSource.CLOSED) {
      console.log('[Live Reload] Connection closed');
    }
  });
  console.log('[Live Reload] Listening for changes...');
})();

(() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // src/utils/logger.js
  var windowOverride, isDev, logger;
  var init_logger = __esm({
    "src/utils/logger.js"() {
      windowOverride = typeof window !== "undefined" && typeof window.__APP_DEBUG_LOGS__ !== "undefined" ? Boolean(window.__APP_DEBUG_LOGS__) : void 0;
      isDev = windowOverride ?? (typeof process === "undefined" || true);
      logger = {
        /**
         * Log message (only in development)
         * @param {...any} args - Arguments to log
         */
        log: (...args) => {
          if (isDev) {
            console.log(...args);
          }
        },
        /**
         * Log warning (only in development)
         * @param {...any} args - Arguments to log
         */
        warn: (...args) => {
          if (isDev) {
            console.warn(...args);
          }
        },
        /**
         * Log error (always logged, even in production)
         * @param {...any} args - Arguments to log
         */
        error: (...args) => {
          console.error(...args);
        },
        /**
         * Log info (only in development)
         * @param {...any} args - Arguments to log
         */
        info: (...args) => {
          if (isDev) {
            console.info(...args);
          }
        }
      };
    }
  });

  // node_modules/.pnpm/@studio-freight+lenis@1.0.42/node_modules/@studio-freight/lenis/dist/lenis.mjs
  var lenis_exports = {};
  __export(lenis_exports, {
    default: () => Lenis
  });
  function t(t2, e2, i) {
    return Math.max(t2, Math.min(e2, i));
  }
  var Animate, Dimensions, Emitter, e, VirtualScroll, Lenis;
  var init_lenis = __esm({
    "node_modules/.pnpm/@studio-freight+lenis@1.0.42/node_modules/@studio-freight/lenis/dist/lenis.mjs"() {
      Animate = class {
        advance(e2) {
          if (!this.isRunning)
            return;
          let i = false;
          if (this.lerp)
            this.value = (s = this.value, o = this.to, n = 60 * this.lerp, r = e2, function(t2, e3, i2) {
              return (1 - i2) * t2 + i2 * e3;
            }(s, o, 1 - Math.exp(-n * r))), Math.round(this.value) === this.to && (this.value = this.to, i = true);
          else {
            this.currentTime += e2;
            const s2 = t(0, this.currentTime / this.duration, 1);
            i = s2 >= 1;
            const o2 = i ? 1 : this.easing(s2);
            this.value = this.from + (this.to - this.from) * o2;
          }
          var s, o, n, r;
          this.onUpdate?.(this.value, i), i && this.stop();
        }
        stop() {
          this.isRunning = false;
        }
        fromTo(t2, e2, { lerp: i = 0.1, duration: s = 1, easing: o = (t3) => t3, onStart: n, onUpdate: r }) {
          this.from = this.value = t2, this.to = e2, this.lerp = i, this.duration = s, this.easing = o, this.currentTime = 0, this.isRunning = true, n?.(), this.onUpdate = r;
        }
      };
      Dimensions = class {
        constructor({ wrapper: t2, content: e2, autoResize: i = true, debounce: s = 250 } = {}) {
          __publicField(this, "resize", () => {
            this.onWrapperResize(), this.onContentResize();
          });
          __publicField(this, "onWrapperResize", () => {
            this.wrapper === window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
          });
          __publicField(this, "onContentResize", () => {
            this.wrapper === window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth);
          });
          this.wrapper = t2, this.content = e2, i && (this.debouncedResize = /* @__PURE__ */ function(t3, e3) {
            let i2;
            return function() {
              let s2 = arguments, o = this;
              clearTimeout(i2), i2 = setTimeout(function() {
                t3.apply(o, s2);
              }, e3);
            };
          }(this.resize, s), this.wrapper === window ? window.addEventListener("resize", this.debouncedResize, false) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize();
        }
        destroy() {
          this.wrapperResizeObserver?.disconnect(), this.contentResizeObserver?.disconnect(), window.removeEventListener("resize", this.debouncedResize, false);
        }
        get limit() {
          return { x: this.scrollWidth - this.width, y: this.scrollHeight - this.height };
        }
      };
      Emitter = class {
        constructor() {
          this.events = {};
        }
        emit(t2, ...e2) {
          let i = this.events[t2] || [];
          for (let t3 = 0, s = i.length; t3 < s; t3++)
            i[t3](...e2);
        }
        on(t2, e2) {
          return this.events[t2]?.push(e2) || (this.events[t2] = [e2]), () => {
            this.events[t2] = this.events[t2]?.filter((t3) => e2 !== t3);
          };
        }
        off(t2, e2) {
          this.events[t2] = this.events[t2]?.filter((t3) => e2 !== t3);
        }
        destroy() {
          this.events = {};
        }
      };
      e = 100 / 6;
      VirtualScroll = class {
        constructor(t2, { wheelMultiplier: e2 = 1, touchMultiplier: i = 1 }) {
          __publicField(this, "onTouchStart", (t2) => {
            const { clientX: e2, clientY: i } = t2.targetTouches ? t2.targetTouches[0] : t2;
            this.touchStart.x = e2, this.touchStart.y = i, this.lastDelta = { x: 0, y: 0 }, this.emitter.emit("scroll", { deltaX: 0, deltaY: 0, event: t2 });
          });
          __publicField(this, "onTouchMove", (t2) => {
            const { clientX: e2, clientY: i } = t2.targetTouches ? t2.targetTouches[0] : t2, s = -(e2 - this.touchStart.x) * this.touchMultiplier, o = -(i - this.touchStart.y) * this.touchMultiplier;
            this.touchStart.x = e2, this.touchStart.y = i, this.lastDelta = { x: s, y: o }, this.emitter.emit("scroll", { deltaX: s, deltaY: o, event: t2 });
          });
          __publicField(this, "onTouchEnd", (t2) => {
            this.emitter.emit("scroll", { deltaX: this.lastDelta.x, deltaY: this.lastDelta.y, event: t2 });
          });
          __publicField(this, "onWheel", (t2) => {
            let { deltaX: i, deltaY: s, deltaMode: o } = t2;
            i *= 1 === o ? e : 2 === o ? this.windowWidth : 1, s *= 1 === o ? e : 2 === o ? this.windowHeight : 1, i *= this.wheelMultiplier, s *= this.wheelMultiplier, this.emitter.emit("scroll", { deltaX: i, deltaY: s, event: t2 });
          });
          __publicField(this, "onWindowResize", () => {
            this.windowWidth = window.innerWidth, this.windowHeight = window.innerHeight;
          });
          this.element = t2, this.wheelMultiplier = e2, this.touchMultiplier = i, this.touchStart = { x: null, y: null }, this.emitter = new Emitter(), window.addEventListener("resize", this.onWindowResize, false), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, { passive: false }), this.element.addEventListener("touchstart", this.onTouchStart, { passive: false }), this.element.addEventListener("touchmove", this.onTouchMove, { passive: false }), this.element.addEventListener("touchend", this.onTouchEnd, { passive: false });
        }
        on(t2, e2) {
          return this.emitter.on(t2, e2);
        }
        destroy() {
          this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize, false), this.element.removeEventListener("wheel", this.onWheel, { passive: false }), this.element.removeEventListener("touchstart", this.onTouchStart, { passive: false }), this.element.removeEventListener("touchmove", this.onTouchMove, { passive: false }), this.element.removeEventListener("touchend", this.onTouchEnd, { passive: false });
        }
      };
      Lenis = class {
        constructor({ wrapper: t2 = window, content: e2 = document.documentElement, wheelEventsTarget: i = t2, eventsTarget: s = i, smoothWheel: o = true, syncTouch: n = false, syncTouchLerp: r = 0.075, touchInertiaMultiplier: l = 35, duration: h, easing: a = (t3) => Math.min(1, 1.001 - Math.pow(2, -10 * t3)), lerp: c = !h && 0.1, infinite: d = false, orientation: p = "vertical", gestureOrientation: u = "vertical", touchMultiplier: m = 1, wheelMultiplier: v = 1, autoResize: g = true, __experimental__naiveDimensions: S = false } = {}) {
          this.__isSmooth = false, this.__isScrolling = false, this.__isStopped = false, this.__isLocked = false, this.onVirtualScroll = ({ deltaX: t3, deltaY: e3, event: i2 }) => {
            if (i2.ctrlKey)
              return;
            const s2 = i2.type.includes("touch"), o2 = i2.type.includes("wheel");
            if (this.options.syncTouch && s2 && "touchstart" === i2.type && !this.isStopped && !this.isLocked)
              return void this.reset();
            const n2 = 0 === t3 && 0 === e3, r2 = "vertical" === this.options.gestureOrientation && 0 === e3 || "horizontal" === this.options.gestureOrientation && 0 === t3;
            if (n2 || r2)
              return;
            let l2 = i2.composedPath();
            if (l2 = l2.slice(0, l2.indexOf(this.rootElement)), l2.find((t4) => {
              var e4, i3, n3, r3, l3;
              return (null === (e4 = t4.hasAttribute) || void 0 === e4 ? void 0 : e4.call(t4, "data-lenis-prevent")) || s2 && (null === (i3 = t4.hasAttribute) || void 0 === i3 ? void 0 : i3.call(t4, "data-lenis-prevent-touch")) || o2 && (null === (n3 = t4.hasAttribute) || void 0 === n3 ? void 0 : n3.call(t4, "data-lenis-prevent-wheel")) || (null === (r3 = t4.classList) || void 0 === r3 ? void 0 : r3.contains("lenis")) && !(null === (l3 = t4.classList) || void 0 === l3 ? void 0 : l3.contains("lenis-stopped"));
            }))
              return;
            if (this.isStopped || this.isLocked)
              return void i2.preventDefault();
            if (this.isSmooth = this.options.syncTouch && s2 || this.options.smoothWheel && o2, !this.isSmooth)
              return this.isScrolling = false, void this.animate.stop();
            i2.preventDefault();
            let h2 = e3;
            "both" === this.options.gestureOrientation ? h2 = Math.abs(e3) > Math.abs(t3) ? e3 : t3 : "horizontal" === this.options.gestureOrientation && (h2 = t3);
            const a2 = s2 && this.options.syncTouch, c2 = s2 && "touchend" === i2.type && Math.abs(h2) > 5;
            c2 && (h2 = this.velocity * this.options.touchInertiaMultiplier), this.scrollTo(this.targetScroll + h2, Object.assign({ programmatic: false }, a2 ? { lerp: c2 ? this.options.syncTouchLerp : 1 } : { lerp: this.options.lerp, duration: this.options.duration, easing: this.options.easing }));
          }, this.onNativeScroll = () => {
            if (!this.__preventNextScrollEvent && !this.isScrolling) {
              const t3 = this.animatedScroll;
              this.animatedScroll = this.targetScroll = this.actualScroll, this.velocity = 0, this.direction = Math.sign(this.animatedScroll - t3), this.emit();
            }
          }, window.lenisVersion = "1.0.42", t2 !== document.documentElement && t2 !== document.body || (t2 = window), this.options = { wrapper: t2, content: e2, wheelEventsTarget: i, eventsTarget: s, smoothWheel: o, syncTouch: n, syncTouchLerp: r, touchInertiaMultiplier: l, duration: h, easing: a, lerp: c, infinite: d, gestureOrientation: u, orientation: p, touchMultiplier: m, wheelMultiplier: v, autoResize: g, __experimental__naiveDimensions: S }, this.animate = new Animate(), this.emitter = new Emitter(), this.dimensions = new Dimensions({ wrapper: t2, content: e2, autoResize: g }), this.toggleClassName("lenis", true), this.velocity = 0, this.isLocked = false, this.isStopped = false, this.isSmooth = n || o, this.isScrolling = false, this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll, false), this.virtualScroll = new VirtualScroll(s, { touchMultiplier: m, wheelMultiplier: v }), this.virtualScroll.on("scroll", this.onVirtualScroll);
        }
        destroy() {
          this.emitter.destroy(), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll, false), this.virtualScroll.destroy(), this.dimensions.destroy(), this.toggleClassName("lenis", false), this.toggleClassName("lenis-smooth", false), this.toggleClassName("lenis-scrolling", false), this.toggleClassName("lenis-stopped", false), this.toggleClassName("lenis-locked", false);
        }
        on(t2, e2) {
          return this.emitter.on(t2, e2);
        }
        off(t2, e2) {
          return this.emitter.off(t2, e2);
        }
        setScroll(t2) {
          this.isHorizontal ? this.rootElement.scrollLeft = t2 : this.rootElement.scrollTop = t2;
        }
        resize() {
          this.dimensions.resize();
        }
        emit() {
          this.emitter.emit("scroll", this);
        }
        reset() {
          this.isLocked = false, this.isScrolling = false, this.animatedScroll = this.targetScroll = this.actualScroll, this.velocity = 0, this.animate.stop();
        }
        start() {
          this.isStopped && (this.isStopped = false, this.reset());
        }
        stop() {
          this.isStopped || (this.isStopped = true, this.animate.stop(), this.reset());
        }
        raf(t2) {
          const e2 = t2 - (this.time || t2);
          this.time = t2, this.animate.advance(1e-3 * e2);
        }
        scrollTo(e2, { offset: i = 0, immediate: s = false, lock: o = false, duration: n = this.options.duration, easing: r = this.options.easing, lerp: l = !n && this.options.lerp, onComplete: h, force: a = false, programmatic: c = true } = {}) {
          if (!this.isStopped && !this.isLocked || a) {
            if (["top", "left", "start"].includes(e2))
              e2 = 0;
            else if (["bottom", "right", "end"].includes(e2))
              e2 = this.limit;
            else {
              let t2;
              if ("string" == typeof e2 ? t2 = document.querySelector(e2) : (null == e2 ? void 0 : e2.nodeType) && (t2 = e2), t2) {
                if (this.options.wrapper !== window) {
                  const t3 = this.options.wrapper.getBoundingClientRect();
                  i -= this.isHorizontal ? t3.left : t3.top;
                }
                const s2 = t2.getBoundingClientRect();
                e2 = (this.isHorizontal ? s2.left : s2.top) + this.animatedScroll;
              }
            }
            if ("number" == typeof e2) {
              if (e2 += i, e2 = Math.round(e2), this.options.infinite ? c && (this.targetScroll = this.animatedScroll = this.scroll) : e2 = t(0, e2, this.limit), s)
                return this.animatedScroll = this.targetScroll = e2, this.setScroll(this.scroll), this.reset(), void (null == h || h(this));
              if (!c) {
                if (e2 === this.targetScroll)
                  return;
                this.targetScroll = e2;
              }
              this.animate.fromTo(this.animatedScroll, e2, { duration: n, easing: r, lerp: l, onStart: () => {
                o && (this.isLocked = true), this.isScrolling = true;
              }, onUpdate: (t2, e3) => {
                this.isScrolling = true, this.velocity = t2 - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = t2, this.setScroll(this.scroll), c && (this.targetScroll = t2), e3 || this.emit(), e3 && (this.reset(), this.emit(), null == h || h(this), this.__preventNextScrollEvent = true, requestAnimationFrame(() => {
                  delete this.__preventNextScrollEvent;
                }));
              } });
            }
          }
        }
        get rootElement() {
          return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
        }
        get limit() {
          return this.options.__experimental__naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"];
        }
        get isHorizontal() {
          return "horizontal" === this.options.orientation;
        }
        get actualScroll() {
          return this.isHorizontal ? this.rootElement.scrollLeft : this.rootElement.scrollTop;
        }
        get scroll() {
          return this.options.infinite ? (t2 = this.animatedScroll, e2 = this.limit, (t2 % e2 + e2) % e2) : this.animatedScroll;
          var t2, e2;
        }
        get progress() {
          return 0 === this.limit ? 1 : this.scroll / this.limit;
        }
        get isSmooth() {
          return this.__isSmooth;
        }
        set isSmooth(t2) {
          this.__isSmooth !== t2 && (this.__isSmooth = t2, this.toggleClassName("lenis-smooth", t2));
        }
        get isScrolling() {
          return this.__isScrolling;
        }
        set isScrolling(t2) {
          this.__isScrolling !== t2 && (this.__isScrolling = t2, this.toggleClassName("lenis-scrolling", t2));
        }
        get isStopped() {
          return this.__isStopped;
        }
        set isStopped(t2) {
          this.__isStopped !== t2 && (this.__isStopped = t2, this.toggleClassName("lenis-stopped", t2));
        }
        get isLocked() {
          return this.__isLocked;
        }
        set isLocked(t2) {
          this.__isLocked !== t2 && (this.__isLocked = t2, this.toggleClassName("lenis-locked", t2));
        }
        get className() {
          let t2 = "lenis";
          return this.isStopped && (t2 += " lenis-stopped"), this.isLocked && (t2 += " lenis-locked"), this.isScrolling && (t2 += " lenis-scrolling"), this.isSmooth && (t2 += " lenis-smooth"), t2;
        }
        toggleClassName(t2, e2) {
          this.rootElement.classList.toggle(t2, e2), this.emitter.emit("className change", this);
        }
      };
    }
  });

  // src/global/lenis.js
  async function actuallyInitLenis() {
    if (lenisLoaded)
      return;
    lenisLoaded = true;
    try {
      let raf = function(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };
      const { default: Lenis2 } = await Promise.resolve().then(() => (init_lenis(), lenis_exports));
      logger.log("\u{1F3AF} Lenis smooth scroll loading...");
      lenis = new Lenis2({
        duration: 1.2,
        // Animation duration in seconds
        easing: (t2) => Math.min(1, 1.001 - Math.pow(2, -10 * t2)),
        // Easing function
        orientation: "vertical",
        // 'vertical' or 'horizontal'
        gestureOrientation: "vertical",
        // 'vertical', 'horizontal', or 'both'
        smoothWheel: true,
        // Enable smooth scrolling for mouse wheel
        wheelMultiplier: 1,
        // Mouse wheel sensitivity
        smoothTouch: false,
        // Disabled for better mobile performance
        touchMultiplier: 2,
        // Touch sensitivity
        infinite: false,
        // Infinite scrolling
        autoResize: true,
        // Auto resize on window resize
        lerp: 0.1
        // Lower = smoother but slower, higher = faster but less smooth
      });
      requestAnimationFrame(raf);
      logger.log("\u2705 Lenis smooth scroll ready");
      document.addEventListener(
        "click",
        (e2) => {
          if (!lenis)
            return;
          const anchor = e2.target.closest('a[href^="#"]');
          if (!anchor)
            return;
          const href = anchor.getAttribute("href");
          if (href === "#" || href === "#!")
            return;
          const target = document.querySelector(href);
          if (target) {
            e2.preventDefault();
            const navbar = document.querySelector("[data-navbar]");
            const offset = navbar ? navbar.offsetHeight : 0;
            lenis.scrollTo(target, {
              offset: -offset,
              duration: 1.2
            });
          }
        },
        { passive: false }
        // Can't be passive because we preventDefault
      );
      document.addEventListener(
        "click",
        (e2) => {
          if (!lenis)
            return;
          const button = e2.target.closest("[data-scroll-to]");
          if (!button)
            return;
          e2.preventDefault();
          const target = button.getAttribute("data-scroll-to");
          if (target === "top") {
            lenis.scrollTo(0, { duration: 1.2 });
          } else if (target === "bottom") {
            lenis.scrollTo(document.body.scrollHeight, { duration: 1.5 });
          } else if (target.startsWith("#")) {
            const element = document.querySelector(target);
            if (element) {
              const navbar = document.querySelector("[data-navbar]");
              const offset = navbar ? navbar.offsetHeight : 0;
              lenis.scrollTo(element, {
                offset: -offset,
                duration: 1.2
              });
            }
          }
        },
        { passive: false }
        // Can't be passive because we preventDefault
      );
    } catch (error) {
      logger.error("Error loading Lenis:", error);
    }
  }
  function initLenis() {
    if (lenisImport)
      return;
    logger.log("\u23F3 Lenis will load on first interaction...");
    const interactionEvents = ["scroll", "wheel", "touchstart", "click", "mousemove"];
    let hasInteracted = false;
    const loadOnInteraction = () => {
      if (hasInteracted)
        return;
      hasInteracted = true;
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, loadOnInteraction, { passive: true });
      });
      actuallyInitLenis();
    };
    interactionEvents.forEach((event) => {
      window.addEventListener(event, loadOnInteraction, { passive: true, once: true });
    });
    lenisImport = true;
  }
  function getLenis() {
    return lenis;
  }
  var lenis, lenisLoaded, lenisImport;
  var init_lenis2 = __esm({
    "src/global/lenis.js"() {
      init_logger();
      lenis = null;
      lenisLoaded = false;
      lenisImport = null;
    }
  });

  // src/utils/helpers.js
  function rafThrottle(func) {
    let ticking = false;
    return function executedFunction(...args) {
      if (!ticking) {
        requestAnimationFrame(() => {
          func(...args);
          ticking = false;
        });
        ticking = true;
      }
    };
  }
  function backToTop(options = {}) {
    if (typeof window === "undefined") {
      return;
    }
    const { behavior: nativeBehavior = "smooth", ...lenisOptions } = options;
    const lenis2 = typeof getLenis === "function" ? getLenis() : null;
    if (lenis2) {
      lenis2.scrollTo(0, {
        duration: 1.2,
        ...lenisOptions
      });
      return;
    }
    window.scrollTo({
      top: 0,
      behavior: nativeBehavior
    });
  }
  function handleError(error, context = "Application", silent = true) {
    const errorMessage = `[${context}] ${error.message || "Unknown error"}`;
    logger.error(errorMessage, error);
    if (!silent && typeof window !== "undefined") {
      logger.warn("Error occurred:", errorMessage);
    }
    return error;
  }
  function loadScript(src, options = {}) {
    return new Promise((resolve, reject) => {
      const existingScript = document.querySelector(`script[src="${src}"]`);
      if (existingScript) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.async = options.async !== false;
      script.defer = options.defer || false;
      if (options.id) {
        script.id = options.id;
      }
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
      document.head.appendChild(script);
    });
  }
  var init_helpers = __esm({
    "src/utils/helpers.js"() {
      init_logger();
      init_lenis2();
    }
  });

  // src/utils/jsdelivr.js
  function loadCSS(cssUrl, id = null) {
    return new Promise((resolve, reject) => {
      const existingLink = id ? document.querySelector(`link#${id}`) : document.querySelector(`link[href="${cssUrl}"]`);
      if (existingLink) {
        resolve();
        return;
      }
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = cssUrl;
      if (id) {
        link.id = id;
      }
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to load CSS: ${cssUrl}`));
      document.head.appendChild(link);
    });
  }
  async function loadLibrary(libraryName, options = {}) {
    const { loadCSS: shouldLoadCSS = true, forceReload = false } = options;
    const library = jsDelivrLibraries[libraryName];
    if (!library) {
      throw new Error(`Library "${libraryName}" not found in jsDelivrLibraries configuration`);
    }
    if (!forceReload && loadedLibraries.has(libraryName)) {
      return;
    }
    try {
      if (library.dependsOn && Array.isArray(library.dependsOn)) {
        for (const dep of library.dependsOn) {
          await loadLibrary(dep, { loadCSS: shouldLoadCSS, forceReload });
        }
      }
      if (shouldLoadCSS && library.css) {
        await loadCSS(library.css, `jsdelivr-${libraryName}-css`);
      }
      if (library.js) {
        await loadScript(library.js, { id: `jsdelivr-${libraryName}-js` });
      }
      loadedLibraries.add(libraryName);
      logger.log(`\u2705 ${libraryName}@${library.version} loaded from jsDelivr`);
    } catch (error) {
      handleError(error, `jsDelivr Loader (${libraryName})`);
      throw error;
    }
  }
  function isLibraryLoaded(libraryName) {
    return loadedLibraries.has(libraryName);
  }
  var jsDelivrLibraries, loadedLibraries;
  var init_jsdelivr = __esm({
    "src/utils/jsdelivr.js"() {
      init_helpers();
      init_logger();
      jsDelivrLibraries = {
        // Animation Libraries
        gsap: {
          version: "3.12.5",
          js: "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js",
          css: null
        },
        scrollTrigger: {
          version: "3.12.5",
          js: "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js",
          css: null,
          dependsOn: ["gsap"]
        },
        splitText: {
          version: "3.12.5",
          js: "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/SplitText.min.js",
          css: null,
          dependsOn: ["gsap"]
        },
        // Carousel/Slider Libraries
        swiper: {
          version: "11",
          js: "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"
          // css: 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
        }
        // Add more libraries as needed
        // Example:
        // lodash: {
        //   version: '4.17.21',
        //   js: 'https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js',
        //   css: null,
        // },
      };
      loadedLibraries = /* @__PURE__ */ new Set();
    }
  });

  // src/components/gsap.js
  function waitForGlobal(name, timeout = 5e3) {
    return new Promise((resolve, reject) => {
      if (window[name]) {
        resolve(window[name]);
        return;
      }
      const startTime = Date.now();
      const checkInterval = setInterval(() => {
        if (window[name]) {
          clearInterval(checkInterval);
          resolve(window[name]);
        } else if (Date.now() - startTime > timeout) {
          clearInterval(checkInterval);
          reject(new Error(`Timeout waiting for ${name} to load`));
        }
      }, 50);
    });
  }
  async function loadGSAP() {
    if (gsapLoaded || isLibraryLoaded("gsap")) {
      if (typeof window.gsap === "undefined") {
        await waitForGlobal("gsap");
      }
      return;
    }
    try {
      await loadLibrary("gsap", { loadCSS: false });
      await waitForGlobal("gsap");
      gsapLoaded = true;
    } catch (error) {
      handleError(error, "GSAP Loader");
      throw error;
    }
  }
  async function loadScrollTrigger() {
    if (scrollTriggerLoaded || isLibraryLoaded("scrollTrigger")) {
      if (typeof window.ScrollTrigger === "undefined") {
        await waitForGlobal("ScrollTrigger");
      }
      return;
    }
    try {
      await loadLibrary("scrollTrigger", { loadCSS: false });
      await waitForGlobal("gsap");
      await waitForGlobal("ScrollTrigger");
      if (typeof window.gsap !== "undefined" && window.gsap.registerPlugin) {
        window.gsap.registerPlugin(window.ScrollTrigger);
        scrollTriggerLoaded = true;
      } else {
        throw new Error("GSAP registerPlugin not available");
      }
    } catch (error) {
      handleError(error, "ScrollTrigger Loader");
      throw error;
    }
  }
  async function loadSplitText() {
    if (splitTextLoaded || isLibraryLoaded("splitText")) {
      if (typeof window.SplitText === "undefined") {
        await waitForGlobal("SplitText");
      }
      splitTextLoaded = true;
      logger.log("[SplitText] SplitText already loaded.");
      return true;
    }
    try {
      const customUrl = typeof window !== "undefined" ? window.GSAP_SPLIT_TEXT_URL : null;
      const urlToLoad = customUrl || SPLIT_TEXT_FALLBACK_URL;
      if (!customUrl) {
        logger.warn(
          `[SplitText] Using fallback SplitText URL. For control, set window.GSAP_SPLIT_TEXT_URL to your hosted SplitText.min.js path.`
        );
      }
      await loadScript(urlToLoad, { id: "split-text-custom" });
      await waitForGlobal("SplitText");
      splitTextLoaded = true;
      logger.log("[SplitText] SplitText loaded.");
      return true;
    } catch (error) {
      handleError(error, "SplitText Loader");
      return false;
    }
  }
  async function ensureGSAPLoaded() {
    if (typeof window.gsap !== "undefined" && !gsapLoaded) {
      gsapLoaded = true;
    }
    if (typeof window.ScrollTrigger !== "undefined" && !scrollTriggerLoaded) {
      scrollTriggerLoaded = true;
    }
    if (!gsapLoaded) {
      await loadGSAP();
    }
    if (!scrollTriggerLoaded) {
      await loadScrollTrigger();
    }
    if (typeof window.gsap === "undefined") {
      try {
        await waitForGlobal("gsap", 2e3);
      } catch (error) {
        throw new Error("GSAP failed to load: Script loaded but gsap object not available");
      }
    }
    if (typeof window.ScrollTrigger === "undefined") {
      try {
        await waitForGlobal("ScrollTrigger", 2e3);
      } catch (error) {
        throw new Error(
          "ScrollTrigger failed to load: Script loaded but ScrollTrigger object not available"
        );
      }
    }
    if (window.gsap && window.gsap.registerPlugin && !window.gsap.plugins.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
    }
  }
  async function initGSAP() {
    try {
      await ensureGSAPLoaded();
      await handleGlobalAnimation();
    } catch (error) {
      handleError(error, "GSAP Initialization");
    }
  }
  async function handleGlobalAnimation() {
    if (animationsInitialized) {
      return;
    }
    try {
      await ensureGSAPLoaded();
    } catch (error) {
      handleError(error, "GSAP Global Animation");
      return;
    }
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const defaultConfig = {
      duration: 1,
      ease: "customBezier"
    };
    function setupScrollTrigger(elements, animationSettings, triggerSettings) {
      elements.forEach((element) => {
        gsap.fromTo(element, animationSettings.from, {
          ...animationSettings.to,
          scrollTrigger: {
            trigger: element,
            ...triggerSettings
          }
        });
      });
    }
    function applyScaleAnimation() {
      const elements = document.querySelectorAll("[anim-scale]");
      if (elements.length === 0)
        return;
      setupScrollTrigger(
        elements,
        { from: { scale: 1.1 }, to: { scale: 1, duration: 1.5 } },
        { start: "top 95%" }
      );
    }
    function applyStaggerAnimation() {
      const staggerElements = document.querySelectorAll("[anim-stagger]:not([modal] [anim-stagger])");
      if (staggerElements.length === 0)
        return;
      staggerElements.forEach((element) => {
        const childrenSelector = element.getAttribute("anim-stagger");
        const children = element.querySelectorAll(childrenSelector);
        if (children.length === 0)
          return;
        gsap.set(children, {
          y: element.getAttribute("from-y") || "0.75rem",
          opacity: 0
        });
        ScrollTrigger.batch(children, {
          onEnter: (target) => {
            gsap.to(target, {
              autoAlpha: 1,
              duration: element.getAttribute("data-duration") || defaultConfig.duration,
              y: "0rem",
              opacity: 1,
              stagger: {
                from: element.getAttribute("stagger-from") || "start",
                each: element.getAttribute("stagger-amount") || 0.1
              },
              ease: element.getAttribute("data-easing") || defaultConfig.ease,
              scrollTrigger: {
                trigger: element,
                start: element.getAttribute("scrollTrigger-start") || "top 95%",
                markers: element.getAttribute("anim-markers") || false
              },
              delay: element.getAttribute("data-delay") || 0.25,
              clearProps: "all"
            });
          }
        });
      });
    }
    function applyElementAnimation() {
      const elements = document.querySelectorAll(
        "[anim-element]:not([modal] [anim-element]), .anim-element:not([modal] .anim-element), .w-pagination-next:not([modal] .w-pagination-next)"
      );
      if (elements.length === 0)
        return;
      elements.forEach((element) => {
        const fromConfig = {
          y: element.getAttribute("from-y") || "0.75rem",
          x: element.getAttribute("from-x") || 0,
          opacity: 0
        };
        const toConfig = {
          y: "0%",
          x: "0%",
          opacity: 1,
          duration: element.getAttribute("data-duration") || defaultConfig.duration,
          ease: element.getAttribute("data-easing") || defaultConfig.ease,
          delay: element.getAttribute("data-delay") || 0.25,
          clearProps: "all"
        };
        setupScrollTrigger([element], { from: fromConfig, to: toConfig }, { start: "top 97%" });
      });
    }
    function applyParallaxAnimation() {
      if (window.innerWidth <= 768)
        return;
      const elements = document.querySelectorAll("[parallax-element]");
      if (elements.length === 0)
        return;
      setupScrollTrigger(
        elements,
        { from: { y: "-10%", scale: 1.1 }, to: { y: "10%", scale: 1.1 } },
        { start: "top bottom", end: "bottom -50%", scrub: 0.2 }
      );
    }
    function applyBackgroundLinesAnimation() {
      const lines = document.querySelectorAll(".bg-lines .bg-line");
      if (lines.length === 0)
        return;
      setupScrollTrigger(
        lines,
        { from: { y: 400 }, to: { y: -100, duration: 2 } },
        { start: "top bottom", end: "bottom top", scrub: 1 }
      );
    }
    async function applySplitTextAnimation() {
      const elements = document.querySelectorAll("[data-split-text]");
      if (elements.length === 0)
        return;
      const loaded = await loadSplitText();
      if (!loaded || typeof window.SplitText === "undefined") {
        return;
      }
      const splitTypeMap = {
        char: "chars",
        chars: "chars",
        word: "words",
        words: "words",
        line: "lines",
        lines: "lines"
      };
      let initialWindowWidth = window.innerWidth;
      let activeSplits = [];
      const cleanup = () => {
        document.querySelectorAll(".line-wrap").forEach((wrap) => {
          while (wrap.firstChild) {
            wrap.parentNode.insertBefore(wrap.firstChild, wrap);
          }
          wrap.remove();
        });
        activeSplits.forEach((split) => split?.revert?.());
        activeSplits = [];
      };
      const splitText = () => {
        cleanup();
        document.querySelectorAll("[data-split-text]").forEach((element) => {
          const attrValue = (element.getAttribute("data-split-text") || "").trim().toLowerCase();
          const splitKey = splitTypeMap[attrValue];
          if (!splitKey) {
            logger.warn(
              `[SplitText] Invalid data-split-text value "${attrValue}". Use "char", "word", or "line".`,
              element
            );
            return;
          }
          const split = new window.SplitText(element, { type: splitKey });
          activeSplits.push(split);
          if (split.chars && Array.isArray(split.chars) && splitKey === "chars") {
            split.chars.forEach((node) => node.classList?.add("char"));
          }
          if (split.words && Array.isArray(split.words) && splitKey === "words") {
            split.words.forEach((node) => node.classList?.add("word"));
          }
          if (splitKey === "lines" && Array.isArray(split.lines)) {
            split.lines.forEach((lineNode) => {
              lineNode.classList?.add("line");
              const wrap = document.createElement("div");
              wrap.classList.add("line-wrap");
              lineNode.parentNode.insertBefore(wrap, lineNode);
              wrap.appendChild(lineNode);
            });
          }
        });
      };
      splitText();
      window.addEventListener("resize", () => {
        if (window.innerWidth !== initialWindowWidth) {
          splitText();
          initialWindowWidth = window.innerWidth;
        }
      });
    }
    applyScaleAnimation();
    applyStaggerAnimation();
    applyElementAnimation();
    applyParallaxAnimation();
    applyBackgroundLinesAnimation();
    await applySplitTextAnimation();
    animationsInitialized = true;
  }
  var gsapLoaded, scrollTriggerLoaded, splitTextLoaded, animationsInitialized, SPLIT_TEXT_FALLBACK_URL;
  var init_gsap = __esm({
    "src/components/gsap.js"() {
      init_helpers();
      init_logger();
      init_jsdelivr();
      gsapLoaded = false;
      scrollTriggerLoaded = false;
      splitTextLoaded = false;
      animationsInitialized = false;
      SPLIT_TEXT_FALLBACK_URL = "https://cdn.prod.website-files.com/gsap/3.13.0/SplitText.min.js";
    }
  });

  // src/components/swiper.js
  var init_swiper = __esm({
    "src/components/swiper.js"() {
      init_helpers();
      init_jsdelivr();
      init_logger();
    }
  });

  // src/components/videoPlayer.js
  function syncWindowInitFlag(value) {
    if (typeof window !== "undefined") {
      window.videoScriptInitialized = value;
    }
  }
  var videoScriptInitialized;
  var init_videoPlayer = __esm({
    "src/components/videoPlayer.js"() {
      init_helpers();
      init_logger();
      videoScriptInitialized = false;
      syncWindowInitFlag(videoScriptInitialized);
    }
  });

  // src/components/modal-basic.js
  var FOCUSABLE_SELECTOR;
  var init_modal_basic = __esm({
    "src/components/modal-basic.js"() {
      init_helpers();
      init_logger();
      FOCUSABLE_SELECTOR = [
        "a[href]",
        "button:not([disabled])",
        "textarea:not([disabled])",
        'input:not([disabled]):not([type="hidden"])',
        "select:not([disabled])",
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable="true"]'
      ].join(", ");
    }
  });

  // src/pages/home.js
  var home_exports = {};
  __export(home_exports, {
    cleanupHomePage: () => cleanupHomePage,
    initHomePage: () => initHomePage
  });
  async function initHomePage() {
    logger.log("\u{1F3E0} Home page initialized");
    try {
      await initGSAP();
    } catch (error) {
      handleError(error, "Home Page Initialization");
    }
  }
  function cleanupHomePage() {
    cleanupFunctions3.forEach((cleanup) => {
      try {
        cleanup();
      } catch (error) {
        handleError(error, "Home Page Cleanup");
      }
    });
    cleanupFunctions3.length = 0;
  }
  var cleanupFunctions3;
  var init_home = __esm({
    "src/pages/home.js"() {
      init_swiper();
      init_gsap();
      init_videoPlayer();
      init_helpers();
      init_logger();
      init_modal_basic();
      cleanupFunctions3 = [];
    }
  });

  // src/global/index.js
  init_lenis2();

  // src/global/navbar.js
  init_helpers();
  init_logger();
  var cleanupFunctions = [];
  function initNavbar() {
    logger.log("\u{1F4F1} Navbar initialized");
    try {
      const menuButton = document.querySelector("[data-menu-toggle]");
      const mobileMenu = document.querySelector("[data-mobile-menu]");
      const navbar = document.querySelector("[data-navbar]");
      const navLinks = document.querySelectorAll("[data-nav-link]");
      if (menuButton && mobileMenu) {
        const handleMenuToggle = () => {
          const isOpen = mobileMenu.classList.toggle("is-open");
          menuButton.classList.toggle("is-active");
          menuButton.setAttribute("aria-expanded", isOpen);
          document.body.style.overflow = isOpen ? "hidden" : "";
        };
        menuButton.addEventListener("click", handleMenuToggle, { passive: true });
        cleanupFunctions.push(() => {
          menuButton.removeEventListener("click", handleMenuToggle);
          document.body.style.overflow = "";
        });
      }
      const currentPage = document.body.getAttribute("data-page") || document.documentElement.getAttribute("data-page");
      if (currentPage && navLinks.length) {
        navLinks.forEach((link) => {
          if (link.getAttribute("data-nav-link") === currentPage) {
            link.classList.add("is-active", "current-page");
          }
        });
      }
      if (navbar) {
        let lastScroll = 0;
        let ticking = false;
        const threshold = 100;
        const updateNavbar = () => {
          const currentScroll = window.pageYOffset;
          navbar.classList.toggle("is-scrolled", currentScroll > 10);
          if (currentScroll > lastScroll && currentScroll > threshold) {
            navbar.classList.add("is-hidden");
          } else {
            navbar.classList.remove("is-hidden");
          }
          lastScroll = currentScroll;
          ticking = false;
        };
        const requestTick = () => {
          if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
          }
        };
        window.addEventListener("scroll", requestTick, { passive: true });
        cleanupFunctions.push(() => {
          window.removeEventListener("scroll", requestTick);
        });
      }
      if (navLinks.length && mobileMenu) {
        const handleLinkClick = () => {
          if (mobileMenu.classList.contains("is-open")) {
            mobileMenu.classList.remove("is-open");
            if (menuButton)
              menuButton.classList.remove("is-active");
            document.body.style.overflow = "";
          }
        };
        navLinks.forEach((link) => {
          link.addEventListener("click", handleLinkClick, { passive: true });
          cleanupFunctions.push(() => {
            link.removeEventListener("click", handleLinkClick);
          });
        });
      }
    } catch (error) {
      handleError(error, "Navbar Initialization");
    }
  }
  function cleanupNavbar() {
    cleanupFunctions.forEach((cleanup) => {
      try {
        cleanup();
      } catch (error) {
        handleError(error, "Navbar Cleanup");
      }
    });
    cleanupFunctions.length = 0;
  }

  // src/global/footer.js
  init_helpers();
  init_logger();
  var cleanupFunctions2 = [];
  function initFooter() {
    logger.log("\u{1F9B6} Footer initialized");
    const copyrightYear = document.querySelector("[data-copyright-year]");
    if (copyrightYear) {
      copyrightYear.textContent = (/* @__PURE__ */ new Date()).getFullYear();
    }
    const backToTopButton = document.querySelector("[data-back-to-top]");
    if (backToTopButton) {
      const scrollHandler = rafThrottle(() => {
        if (window.pageYOffset > 300) {
          backToTopButton.classList.add("is-visible");
        } else {
          backToTopButton.classList.remove("is-visible");
        }
      });
      window.addEventListener("scroll", scrollHandler, { passive: true });
      const handleClick = () => {
        backToTop();
      };
      backToTopButton.addEventListener("click", handleClick, { passive: true });
      cleanupFunctions2.push(() => {
        window.removeEventListener("scroll", scrollHandler);
        backToTopButton.removeEventListener("click", handleClick);
      });
    }
  }
  function cleanupFooter() {
    cleanupFunctions2.forEach((cleanup) => {
      try {
        cleanup();
      } catch (error) {
        handleError(error, "Footer Cleanup");
      }
    });
    cleanupFunctions2.length = 0;
  }

  // src/global/index.js
  init_gsap();
  init_logger();
  async function initGlobal() {
    logger.log("\u{1F310} Initializing global components...");
    cleanupNavbar();
    cleanupFooter();
    initLenis();
    initNavbar();
    initFooter();
    loadGSAPLazy();
  }
  function loadGSAPLazy() {
    if (typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined") {
      handleGlobalAnimation().catch((error) => {
        logger.error("Error initializing GSAP animations:", error);
      });
      gsapGlobalAnimations();
      return;
    }
    let isLoaded = false;
    const loadGSAP2 = async () => {
      if (isLoaded)
        return;
      isLoaded = true;
      try {
        await ensureGSAPLoaded();
        logger.log("\u2705 GSAP and ScrollTrigger loaded globally");
        await new Promise((resolve) => setTimeout(resolve, 100));
        await handleGlobalAnimation();
        gsapGlobalAnimations();
      } catch (error) {
        logger.error("Error loading GSAP:", error);
        isLoaded = false;
      }
    };
    const interactionEvents = ["scroll", "wheel", "touchstart", "click", "mousemove", "keydown"];
    let hasInteracted = false;
    const loadOnInteraction = () => {
      if (hasInteracted)
        return;
      hasInteracted = true;
      interactionEvents.forEach((event) => {
        window.removeEventListener(event, loadOnInteraction, { passive: true });
      });
      loadGSAP2();
    };
    interactionEvents.forEach((event) => {
      window.addEventListener(event, loadOnInteraction, { passive: true, once: true });
    });
    if (window.requestIdleCallback) {
      requestIdleCallback(
        () => {
          if (!hasInteracted) {
            loadGSAP2();
          }
        },
        { timeout: 3e3 }
        // Max 3 seconds wait
      );
    } else {
      setTimeout(() => {
        if (!hasInteracted) {
          loadGSAP2();
        }
      }, 2e3);
    }
  }
  function gsapGlobalAnimations() {
    const { gsap, ScrollTrigger } = window;
    if (!gsap || !ScrollTrigger)
      return;
    footerScroll(gsap, ScrollTrigger);
  }
  function footerScroll(gsap, ScrollTrigger) {
    const footer2row = document.querySelector(".footer-row-2");
    if (!footer2row || window.innerWidth <= 991)
      return;
    const footerAnimation = gsap.fromTo(
      footer2row,
      { y: "-100%" },
      {
        y: "0%",
        ease: "linear"
      }
    );
    ScrollTrigger.create({
      trigger: ".footer-row-2",
      start: `70% ${window.innerHeight - footer2row.scrollHeight + 200}`,
      end: `10% ${window.innerHeight - footer2row.scrollHeight - footer2row.scrollHeight}`,
      animation: footerAnimation,
      scrub: 2,
      onStart: () => {
        ScrollTrigger.refresh();
      }
    });
  }

  // src/index.js
  init_logger();
  var pageRegistry = {
    home: () => Promise.resolve().then(() => (init_home(), home_exports)).then((m) => m.initHomePage)
  };
  var cachedPageName = null;
  function getCurrentPage() {
    if (cachedPageName !== null)
      return cachedPageName;
    const bodyPage = document.body.getAttribute("data-page");
    const htmlPage = document.documentElement.getAttribute("data-page");
    cachedPageName = bodyPage || htmlPage || null;
    return cachedPageName;
  }
  async function initPage() {
    try {
      await initGlobal();
    } catch (error) {
      logger.error("[Webflow Router] Error initializing global components:", error);
    }
    const pageName = getCurrentPage();
    if (!pageName) {
      logger.warn("[Webflow Router] No data-page attribute found on <html> or <body> tag");
      logger.log("[Webflow Router] Global components loaded, but no page-specific code will run");
      return;
    }
    const pageInit = pageRegistry[pageName];
    if (pageInit && typeof pageInit === "function") {
      try {
        const initFn = await pageInit();
        if (initFn && typeof initFn === "function") {
          initFn();
        }
      } catch (error) {
        logger.error(`[Webflow Router] Error initializing page "${pageName}":`, error);
      }
    } else {
      logger.warn(`[Webflow Router] No initialization function found for page: ${pageName}`);
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPage);
  } else {
    initPage();
  }
})();
//# sourceMappingURL=index.js.map
