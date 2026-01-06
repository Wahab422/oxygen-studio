
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
  function safeParseInt(value, defaultValue = 0) {
    const parsed = parseInt(value, 10);
    return Number.isFinite(parsed) ? parsed : defaultValue;
  }
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
  function smoothScrollTo(element, target, offset = 0, options = {}) {
    if (typeof document === "undefined") {
      return () => {
      };
    }
    const triggers = resolveElementList(element);
    if (!triggers.length) {
      logger.warn("[smoothScrollTo] Trigger element(s) not found:", element);
      return () => {
      };
    }
    const handler = (event) => {
      if (event?.preventDefault) {
        event.preventDefault();
      }
      const resolvedTarget = typeof target === "function" ? target(event, event?.currentTarget) : target;
      lenisSmoothScrollTo(resolvedTarget, offset, options);
    };
    triggers.forEach((trigger) => {
      const existingHandler = smoothScrollHandlers.get(trigger);
      if (existingHandler) {
        trigger.removeEventListener("click", existingHandler);
      }
      trigger.addEventListener("click", handler);
      smoothScrollHandlers.set(trigger, handler);
    });
    return () => {
      triggers.forEach((trigger) => {
        const savedHandler = smoothScrollHandlers.get(trigger);
        if (savedHandler) {
          trigger.removeEventListener("click", savedHandler);
          smoothScrollHandlers.delete(trigger);
        }
      });
    };
  }
  function lenisSmoothScrollTo(target, offset = 0, options = {}) {
    if (typeof document === "undefined") {
      return;
    }
    const element = resolveElement(target);
    if (!element) {
      logger.warn("[lenisSmoothScrollTo] Target not found:", target);
      return;
    }
    const lenis2 = getLenis();
    if (!lenis2) {
      nativeScrollToElement(element, offset);
      return;
    }
    const navbar = document.querySelector("[data-navbar]");
    const navbarOffset = navbar ? navbar.offsetHeight : 0;
    const lenisOptions = {
      duration: 1.2,
      ...options
    };
    if (typeof lenisOptions.offset !== "number") {
      lenisOptions.offset = -(offset + navbarOffset);
    }
    lenis2.scrollTo(element, lenisOptions);
  }
  function resolveElement(ref) {
    if (!ref || typeof document === "undefined")
      return null;
    if (typeof ref === "string") {
      return document.querySelector(ref);
    }
    if (ref === window || ref === document || ref === document.documentElement) {
      return document.documentElement;
    }
    if (isDomElement(ref)) {
      return ref;
    }
    return null;
  }
  function resolveElementList(ref) {
    if (!ref || typeof document === "undefined")
      return [];
    if (typeof ref === "string") {
      return Array.from(document.querySelectorAll(ref));
    }
    if (isDomElement(ref)) {
      return [ref];
    }
    if (typeof NodeList !== "undefined" && ref instanceof NodeList) {
      return Array.from(ref).filter(isDomElement);
    }
    if (Array.isArray(ref)) {
      return ref.filter(isDomElement);
    }
    return [];
  }
  function nativeScrollToElement(target, offset = 0) {
    if (typeof window === "undefined" || !target) {
      return;
    }
    const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
    const destination = elementPosition - offset;
    window.scrollTo({
      top: destination,
      behavior: "smooth"
    });
  }
  function isDomElement(node) {
    return typeof Element !== "undefined" && node instanceof Element;
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
  var smoothScrollHandlers;
  var init_helpers = __esm({
    "src/utils/helpers.js"() {
      init_logger();
      init_lenis2();
      smoothScrollHandlers = /* @__PURE__ */ new WeakMap();
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
    const gsap2 = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const defaultConfig = {
      duration: 1,
      ease: "customBezier"
    };
    function setupScrollTrigger(elements, animationSettings, triggerSettings) {
      elements.forEach((element) => {
        gsap2.fromTo(element, animationSettings.from, {
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
        gsap2.set(children, {
          y: element.getAttribute("from-y") || "0.75rem",
          opacity: 0
        });
        ScrollTrigger.batch(children, {
          onEnter: (target) => {
            gsap2.to(target, {
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
  async function loadSwiperLibrary() {
    if (swiperLibraryLoaded || isLibraryLoaded("swiper")) {
      return Promise.resolve();
    }
    if (loadPromise) {
      return loadPromise;
    }
    loadPromise = (async () => {
      try {
        await loadLibrary("swiper");
        if (typeof Swiper === "undefined") {
          throw new Error("Swiper library failed to load");
        }
        swiperLibraryLoaded = true;
        if (pendingSliders.length > 0) {
          logger.log(`Initializing ${pendingSliders.length} pending slider(s)...`);
          initializeSwipers(pendingSliders);
          pendingSliders = [];
        }
        return true;
      } catch (error) {
        handleError(error, "Swiper Library Loader");
        loadPromise = null;
        throw error;
      }
    })();
    return loadPromise;
  }
  async function loadAndInitSlider(slider) {
    if (!swiperLibraryLoaded && !pendingSliders.includes(slider)) {
      pendingSliders.push(slider);
    }
    if (!swiperLibraryLoaded) {
      await loadSwiperLibrary();
    }
    if (swiperLibraryLoaded && !slider._swiperInitialized) {
      initializeSwipers([slider]);
    }
  }
  function initSwiper() {
    const sliders = document.querySelectorAll("[swiper-slider]");
    if (!sliders.length)
      return;
    logger.log(`\u23F3 Found ${sliders.length} slider(s) - will load when visible...`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const slider = entry.target;
            observer.unobserve(slider);
            slider.setAttribute("data-swiper-observed", "true");
            loadAndInitSlider(slider);
          }
        });
      },
      {
        root: null,
        rootMargin: "200px",
        // Start loading 200px before slider enters viewport
        threshold: 0
      }
    );
    sliders.forEach((slider) => {
      observer.observe(slider);
    });
  }
  function initializeSwipers(sliderList) {
    if (!sliderList || !sliderList.length)
      return;
    sliderList.forEach((slider) => {
      if (slider._swiperInitialized)
        return;
      slider._swiperInitialized = true;
      const swiperContainer = slider.querySelector(".swiper");
      if (!swiperContainer) {
        logger.warn("Swiper container not found in slider:", slider);
        return;
      }
      const nextBtn = slider.querySelector("[swiper-next-btn]");
      const prevBtn = slider.querySelector("[swiper-prev-btn]");
      const paginationEl = swiperContainer.querySelector(".swiper-pagination");
      const customProgressBar = slider.querySelector(".swiper-progress-bar");
      const syncId = slider.getAttribute("data-sync");
      const spaceDesktop = safeParseInt(slider.getAttribute("data-space"), 24);
      const spaceMobile = safeParseInt(slider.getAttribute("data-space-mobile"), 10);
      const centerMode = slider.hasAttribute("data-center");
      const centerBounds = slider.hasAttribute("data-center-bounds");
      const clickToCenter = slider.hasAttribute("data-click-center");
      function updateButtonStates(swiper) {
        const bothDisabled = swiper.isBeginning && swiper.isEnd;
        if (prevBtn) {
          prevBtn.style.pointerEvents = swiper.isBeginning ? "none" : "auto";
          prevBtn.style.opacity = swiper.isBeginning ? "0.5" : "1";
          prevBtn.style.display = bothDisabled ? "none" : "";
          prevBtn.setAttribute("aria-disabled", String(swiper.isBeginning));
        }
        if (nextBtn) {
          nextBtn.style.pointerEvents = swiper.isEnd ? "none" : "auto";
          nextBtn.style.opacity = swiper.isEnd ? "0.5" : "1";
          nextBtn.style.display = bothDisabled ? "none" : "";
          nextBtn.setAttribute("aria-disabled", String(swiper.isEnd));
        }
      }
      function updateCustomProgressBar(swiper) {
        if (!customProgressBar)
          return;
        const slides = swiper.slides;
        let totalSlides = slides.length;
        let currentIndex = swiper.activeIndex;
        if (swiper.params.loop) {
          const realSlides = swiper.slides.filter(
            (slide) => !slide.classList.contains("swiper-slide-duplicate")
          );
          totalSlides = realSlides.length;
          currentIndex = swiper.realIndex;
        }
        let progress = 0;
        if (swiper.params.slidesPerView === "auto") {
          const maxTranslate = swiper.maxTranslate();
          const currentTranslate = swiper.translate;
          progress = totalSlides > 1 ? Math.abs(currentTranslate / maxTranslate) * 100 : 0;
        } else {
          progress = totalSlides > 1 ? currentIndex / (totalSlides - 1) * 100 : 0;
        }
        updateProgressBarUI(progress, currentIndex, totalSlides);
        function updateProgressBarUI(prog, currentIdx, totalCount) {
          const progressFill = customProgressBar.querySelector(".swiper-progress-fill");
          if (progressFill) {
            progressFill.style.width = `${Math.max(0, Math.min(100, prog))}%`;
            customProgressBar.setAttribute("data-progress", prog.toFixed(1));
            customProgressBar.setAttribute("data-current-slide", currentIdx + 1);
            customProgressBar.setAttribute("data-total-slides", totalCount);
          }
        }
      }
      const swiperConfig = {
        slidesPerView: "auto",
        spaceBetween: spaceDesktop,
        grabCursor: true,
        speed: 700,
        watchOverflow: true,
        // Center mode (opt-in)
        centeredSlides: centerMode,
        centeredSlidesBounds: centerBounds,
        slideToClickedSlide: centerMode || clickToCenter,
        // Navigation
        navigation: nextBtn || prevBtn ? {
          nextEl: nextBtn,
          prevEl: prevBtn
        } : false,
        // Pagination (only if element exists)
        pagination: paginationEl ? {
          el: paginationEl,
          type: "progressbar",
          progressbarFillClass: "swiper-pagination-progressbar-fill"
        } : false,
        // Responsive breakpoints
        breakpoints: {
          0: { spaceBetween: spaceMobile },
          768: { spaceBetween: spaceDesktop }
        },
        // Event callbacks
        on: {
          init() {
            updateButtonStates(this);
            updateCustomProgressBar(this);
            if (paginationEl) {
              paginationEl.style.display = "block";
            }
          },
          slideChange() {
            updateButtonStates(this);
            updateCustomProgressBar(this);
          },
          slideChangeTransitionEnd() {
            updateButtonStates(this);
            updateCustomProgressBar(this);
          },
          reachBeginning() {
            updateButtonStates(this);
          },
          reachEnd() {
            updateButtonStates(this);
          },
          resize() {
            updateButtonStates(this);
            updateCustomProgressBar(this);
          },
          update() {
            updateButtonStates(this);
            updateCustomProgressBar(this);
          },
          progress(swiper, progress) {
            if (customProgressBar) {
              const progressPercentage = progress * 100;
              const progressFill = customProgressBar.querySelector(".swiper-progress-fill");
              if (progressFill) {
                progressFill.style.width = `${progressPercentage}%`;
                customProgressBar.setAttribute("data-progress", progressPercentage.toFixed(1));
              }
            }
          }
        }
      };
      try {
        const swiperInstance = new Swiper(swiperContainer, swiperConfig);
        swiperContainer._swiper = swiperInstance;
        registerSyncedSlider(syncId, swiperInstance);
        if (nextBtn) {
          nextBtn.setAttribute("aria-label", "Next slide");
          nextBtn.setAttribute("role", "button");
        }
        if (prevBtn) {
          prevBtn.setAttribute("aria-label", "Previous slide");
          prevBtn.setAttribute("role", "button");
        }
        swiperContainer.setAttribute("aria-live", "polite");
        swiperContainer.setAttribute("aria-atomic", "false");
        if (!slider._keyboardSetup) {
          const keyboardHandler = (e2) => {
            if (e2.key === "ArrowRight") {
              e2.preventDefault();
              swiperInstance.slideNext();
            } else if (e2.key === "ArrowLeft") {
              e2.preventDefault();
              swiperInstance.slidePrev();
            }
          };
          slider.addEventListener("keydown", keyboardHandler);
          slider.tabIndex = 0;
          slider.setAttribute("role", "region");
          slider.setAttribute("aria-label", "Carousel");
          slider._keyboardSetup = true;
        }
      } catch (error) {
        handleError(error, "Swiper Initialization");
      }
    });
    logger.log(`\u2705 ${sliderList.length} Swiper carousel(s) initialized`);
  }
  function registerSyncedSlider(syncId, swiperInstance) {
    if (!syncId || !swiperInstance)
      return;
    if (!syncedSliderGroups.has(syncId)) {
      syncedSliderGroups.set(syncId, /* @__PURE__ */ new Set());
    }
    const group = syncedSliderGroups.get(syncId);
    group.add(swiperInstance);
    const syncHandler = function() {
      const targetIndex = this.params.loop ? this.realIndex : this.activeIndex;
      group.forEach((otherSwiper) => {
        if (otherSwiper === this || otherSwiper.destroyed)
          return;
        const goTo = otherSwiper.params.loop && typeof otherSwiper.slideToLoop === "function" ? otherSwiper.slideToLoop : otherSwiper.slideTo;
        goTo.call(otherSwiper, targetIndex);
      });
    };
    swiperInstance.on("slideChange", syncHandler);
    swiperInstance.on("destroy", () => {
      swiperInstance.off("slideChange", syncHandler);
      group.delete(swiperInstance);
      if (group.size === 0) {
        syncedSliderGroups.delete(syncId);
      }
    });
  }
  var swiperLibraryLoaded, loadPromise, pendingSliders, syncedSliderGroups;
  var init_swiper = __esm({
    "src/components/swiper.js"() {
      init_helpers();
      init_jsdelivr();
      init_logger();
      swiperLibraryLoaded = false;
      loadPromise = null;
      pendingSliders = [];
      syncedSliderGroups = /* @__PURE__ */ new Map();
    }
  });

  // src/components/videoPlayer.js
  function initVideoPlayer(options = {}) {
    if (!canUseDOM()) {
      return;
    }
    const { eager = false } = options;
    if (!bootstrapAttached) {
      addBootstrapListeners();
    }
    if (eager) {
      initVideoScript();
    }
  }
  function initVideoScript() {
    if (!canUseDOM()) {
      return;
    }
    if (videoScriptInitialized) {
      logger.log("\u267B\uFE0F Video player script already initialized \u2013 refreshing listeners.");
      cleanupVideoListeners();
      return;
    }
    setVideoScriptInitialized(true);
    cleanupVideoListeners();
    logger.log("\u{1F3AC} Video player script initializing...");
    const videoPlayers = document.querySelectorAll("video-source-player");
    if (!videoPlayers.length) {
      logger.warn("\u{1F3AC} Video player script initialized but no <video-source-player> elements found.");
      return;
    }
    logger.log(`\u{1F3AC} Found ${videoPlayers.length} <video-source-player> element(s).`);
    const playerMap = /* @__PURE__ */ new Map();
    const ctrlMap = /* @__PURE__ */ new WeakMap();
    const remoteMap = /* @__PURE__ */ new WeakMap();
    let vidstackReady = null;
    let stylesLoaded = false;
    let readyIO = null;
    let posterIO = null;
    let posterFetchIO = null;
    let posterStartIO = null;
    const posterCache = /* @__PURE__ */ new Map();
    const isMobileUA = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent || "");
    const subtitleTrackCache = /* @__PURE__ */ new WeakMap();
    const DEFAULT_LOAD_STRATEGY = "play";
    const DEFAULT_POSTER_LOAD_STRATEGY = "visible";
    const getAttr = (el, n) => (el.getAttribute(n) || "").trim() || void 0;
    const isVideoUrl = (u = "") => /\.(mp4|webm|ogg)(?:[?#]|$)/i.test(u);
    function detectProvider(url) {
      if (!url)
        return null;
      const u = url.toLowerCase();
      if (u.includes("youtu.be/") || u.includes("youtube.com/"))
        return "youtube";
      if (u.includes("vimeo.com/"))
        return "vimeo";
      if (/\.(mp4|webm|ogg)(?:[?#]|$)/i.test(u))
        return "file";
      return null;
    }
    const SUBTITLE_DEFAULTS = Object.freeze({
      label: "English CC",
      lang: "en",
      kind: "subtitles",
      defaultEnabled: true
    });
    const SUBTITLE_DISABLED_VALUES = /* @__PURE__ */ new Set(["false", "0", "off", "no", "none", "disabled"]);
    const parseBooleanAttr = (value, fallback = true) => {
      if (value === void 0)
        return fallback;
      return !SUBTITLE_DISABLED_VALUES.has(String(value).toLowerCase());
    };
    const getLoadStrategy = (el) => getAttr(el, "data-load") || DEFAULT_LOAD_STRATEGY;
    const getPosterLoadStrategy = (el) => getAttr(el, "data-poster-load") || DEFAULT_POSTER_LOAD_STRATEGY;
    function normalizeAspectRatio(value) {
      if (!value)
        return null;
      if (value.includes("/"))
        return value;
      if (value.includes(":"))
        return value.replace(":", " / ");
      const num = Number(value);
      return Number.isFinite(num) && num > 0 ? `${num} / 1` : null;
    }
    async function ensureRemote(el) {
      if (remoteMap.has(el))
        return remoteMap.get(el);
      const { MediaRemoteControl } = await preloadVidstack();
      const remote = new MediaRemoteControl(el);
      remoteMap.set(el, remote);
      return remote;
    }
    function dispatchRemote(el, action, ...args) {
      ensureRemote(el).then((remote) => {
        if (typeof remote[action] === "function") {
          remote[action](...args);
        }
      }).catch(() => {
      });
    }
    function parseNumberAttr(value) {
      if (value === void 0)
        return void 0;
      const num = Number(value);
      return Number.isFinite(num) ? num : void 0;
    }
    function parseArtworkAttr(value, fallbackPoster) {
      if (!value && !fallbackPoster)
        return void 0;
      if (!value && fallbackPoster) {
        return [
          {
            src: fallbackPoster,
            sizes: "512x512",
            type: "image/jpeg"
          }
        ];
      }
      try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : void 0;
      } catch {
        return value.split(",").map((entry) => entry.trim()).filter(Boolean).map((src) => ({
          src,
          sizes: "512x512"
        }));
      }
    }
    function buildMediaSessionMetadata(el, title, poster) {
      const json = getAttr(el, "data-media-session");
      if (json) {
        try {
          const parsed = JSON.parse(json);
          return parsed;
        } catch {
        }
      }
      const artist = getAttr(el, "data-artist");
      const album = getAttr(el, "data-album");
      const artwork = parseArtworkAttr(getAttr(el, "data-artwork"), poster);
      const metadata = {
        title,
        artist,
        album,
        artwork
      };
      Object.keys(metadata).forEach((key) => {
        if (metadata[key] === void 0 || metadata[key] === "") {
          delete metadata[key];
        }
      });
      return Object.keys(metadata).length ? metadata : void 0;
    }
    const preloadVidstack = () => vidstackReady ?? (vidstackReady = import(
      /* webpackIgnore: true */
      /* @vite-ignore */
      VIDSTACK_MODULE_URL
    ));
    function scheduleModuleWarm() {
      const rIC = window.requestIdleCallback || ((cb) => setTimeout(cb, 300));
      rIC(() => {
        preloadVidstack();
      });
    }
    const ensureVideoBrandCSS = /* @__PURE__ */ (() => {
      let injected = false;
      const CSS_TEXT = `
:where(.vds-video-layout) {
    --media-brand: var(--video-brand, var(--secondary--lime)) !important;
}`;
      return () => {
        if (injected)
          return;
        injected = true;
        const style = document.createElement("style");
        style.setAttribute("data-video-brand-style", "true");
        style.textContent = CSS_TEXT;
        document.head.appendChild(style);
      };
    })();
    function loadVidstackStylesOnce() {
      if (stylesLoaded)
        return;
      stylesLoaded = true;
      for (const href of VIDSTACK_STYLE_URLS) {
        const link = document.createElement("link");
        link.rel = "preload";
        link.as = "style";
        link.href = href;
        link.onload = () => {
          link.rel = "stylesheet";
        };
        document.head.appendChild(link);
      }
    }
    const primePlayerNode = /* @__PURE__ */ (() => {
      const primedPlayers = /* @__PURE__ */ new WeakSet();
      let hoverPreloaded = false;
      const handleFirstHover = () => {
        if (hoverPreloaded)
          return;
        hoverPreloaded = true;
        preloadVidstack();
      };
      return (playerEl) => {
        if (!playerEl || primedPlayers.has(playerEl))
          return;
        primedPlayers.add(playerEl);
        playerEl.style.cursor = "pointer";
        const onHover = () => {
          handleFirstHover();
          playerEl.removeEventListener("mouseenter", onHover);
        };
        playerEl.addEventListener("mouseenter", onHover, { passive: true });
      };
    })();
    function loadImageOK(url, minW = 1) {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img.naturalWidth >= minW);
        img.onerror = () => resolve(false);
        img.referrerPolicy = "no-referrer";
        img.src = url;
      });
    }
    async function resolveYouTubePoster(src) {
      const m = src.match(
        /(?:youtu\.be\/|youtube\.com\/(?:embed\/|shorts\/|watch\?.*?v=))([A-Za-z0-9_-]{11})/
      );
      const id = m && m[1];
      if (!id)
        return;
      const candidates = [
        `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
        `https://img.youtube.com/vi/${id}/mqdefault.jpg`,
        `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
        `https://img.youtube.com/vi/${id}/sddefault.jpg`
      ];
      for (const u of candidates)
        if (await loadImageOK(u, 320))
          return u;
    }
    async function resolveVimeoPoster(src) {
      try {
        const res = await fetch(`https://vimeo.com/api/oembed.json?url=${encodeURIComponent(src)}`, {
          mode: "cors",
          credentials: "omit"
        });
        if (!res.ok)
          return;
        const j = await res.json();
        return j?.thumbnail_url;
      } catch {
        return;
      }
    }
    async function resolvePosterURL(el) {
      const exist = getAttr(el, "data-poster");
      if (exist)
        return exist;
      const src = getAttr(el, "data-src");
      if (!src)
        return;
      if (posterCache.has(src))
        return posterCache.get(src);
      const provider = getAttr(el, "data-provider") || detectProvider(src);
      const p = async () => {
        if (provider === "youtube")
          return await resolveYouTubePoster(src);
        if (provider === "vimeo")
          return await resolveVimeoPoster(src);
      };
      const pendingPoster = p();
      posterCache.set(src, pendingPoster);
      return pendingPoster;
    }
    function ensurePlayerWrapperStyles(el) {
      const styles = getComputedStyle(el);
      if (styles.position === "static") {
        el.style.position = "relative";
      }
      if (styles.overflow === "visible") {
        el.style.overflow = "hidden";
      }
      const ratio = normalizeAspectRatio(getAttr(el, "data-aspect-ratio"));
      if (ratio && !el.style.aspectRatio) {
        el.style.aspectRatio = ratio;
      }
      if (!el.style.display || el.style.display === "inline") {
        el.style.display = "block";
      }
    }
    function mountPlayOverlay(el) {
      let o = el.querySelector(":scope > .vposter-overlay");
      if (!o) {
        o = document.createElement("div");
        o.className = "vposter-overlay";
        el.appendChild(o);
      }
      Object.assign(o.style, {
        position: "absolute",
        inset: "0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Allow clicks on any interactive elements placed in the overlay.
        pointerEvents: "auto",
        zIndex: "2",
        background: "linear-gradient(transparent, rgba(0,0,0,0.15))"
      });
      const customIconEl = el.querySelector(":scope > [data-play-icon]");
      if (customIconEl && !o.contains(customIconEl)) {
        while (o.firstChild)
          o.removeChild(o.firstChild);
        o.appendChild(customIconEl);
      }
      if (!o.hasChildNodes()) {
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("viewBox", "0 0 64 64");
        svg.setAttribute("width", "64");
        svg.setAttribute("height", "64");
        const gbg = document.createElementNS(svgNS, "circle");
        gbg.setAttribute("cx", "32");
        gbg.setAttribute("cy", "32");
        gbg.setAttribute("r", "30");
        gbg.setAttribute("fill", "rgba(0,0,0,0.5)");
        const tri = document.createElementNS(svgNS, "polygon");
        tri.setAttribute("points", "26,20 48,32 26,44");
        tri.setAttribute("fill", "#fff");
        svg.appendChild(gbg);
        svg.appendChild(tri);
        o.appendChild(svg);
      }
    }
    function ensurePosterStartIO() {
      if (posterStartIO)
        return posterStartIO;
      posterStartIO = new IntersectionObserver(
        async (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting)
              continue;
            const el = entry.target;
            posterStartIO.unobserve(el);
            const v = el.querySelector(":scope > video.vposter-video");
            if (v) {
              try {
                v.preload = "auto";
                await v.play();
              } catch {
              }
            }
          }
        },
        { root: null, rootMargin: "150px 0px", threshold: 0.01 }
      );
      return posterStartIO;
    }
    async function mountPosterVideo(el, url, { force = false } = {}) {
      if (el.querySelector(":scope > video.vposter-video"))
        return;
      ensurePlayerWrapperStyles(el);
      const v = document.createElement("video");
      v.className = "vposter-video";
      v.muted = true;
      v.loop = true;
      v.playsInline = true;
      v.autoplay = force;
      v.preload = force ? "auto" : "none";
      v.src = url;
      Object.assign(v.style, {
        position: "absolute",
        inset: "0",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        pointerEvents: "none",
        display: "block",
        zIndex: "1"
      });
      el.appendChild(v);
      mountPlayOverlay(el);
      if (force) {
        try {
          await v.play();
        } catch {
        }
      } else {
        ensurePosterStartIO().observe(el);
      }
    }
    async function mountPoster(el, { force = false } = {}) {
      const videoThumb = getAttr(el, "data-video-poster");
      if (videoThumb && isVideoUrl(videoThumb)) {
        await mountPosterVideo(el, videoThumb, { force });
        return;
      }
      if (el.querySelector(":scope > img.vposter"))
        return;
      let url = getAttr(el, "data-poster");
      if (!url) {
        if (!force)
          return queuePosterFetch(el);
        url = await resolvePosterURL(el);
        if (!url)
          return;
        el.setAttribute("data-poster", url);
      }
      ensurePlayerWrapperStyles(el);
      const img = document.createElement("img");
      img.className = "vposter";
      img.src = url;
      img.alt = getAttr(el, "data-title") || "Video poster";
      img.decoding = "async";
      img.loading = force ? "eager" : "lazy";
      img.setAttribute("fetchpriority", force ? "high" : "low");
      Object.assign(img.style, {
        position: "absolute",
        inset: "0",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        pointerEvents: "none",
        display: "block"
      });
      el.appendChild(img);
      if (!posterIO) {
        posterIO = new IntersectionObserver(
          (entries) => {
            for (const { isIntersecting, target } of entries) {
              if (!isIntersecting)
                continue;
              const p = target.querySelector(":scope > img.vposter");
              if (p) {
                p.loading = "eager";
                p.setAttribute("fetchpriority", "high");
              }
              posterIO.unobserve(target);
            }
          },
          { root: null, rootMargin: "300px 0px", threshold: 0.01 }
        );
      }
      posterIO.observe(el);
      mountPlayOverlay(el);
    }
    function queuePosterFetch(el) {
      if (!posterFetchIO) {
        posterFetchIO = new IntersectionObserver(async (entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting)
              continue;
            const node = entry.target;
            posterFetchIO.unobserve(node);
            await mountPoster(node, { force: true });
          }
        });
      }
      posterFetchIO.observe(el);
    }
    function hidePoster(el) {
      const poster = el.querySelector(":scope > img.vposter");
      if (poster)
        poster.style.display = "none";
      const vp = el.querySelector(":scope > video.vposter-video");
      if (vp) {
        try {
          vp.pause();
        } catch {
        }
        vp.style.display = "none";
      }
      const overlay = el.querySelector(":scope > .vposter-overlay");
      if (overlay)
        overlay.style.display = "none";
      el.style.backgroundImage = "";
    }
    function hideOverlay(el) {
      const overlay = el.querySelector(":scope > .vposter-overlay");
      if (overlay)
        overlay.style.display = "none";
    }
    function showPoster(el) {
      const poster = el.querySelector(":scope > img.vposter");
      if (poster)
        poster.style.display = "block";
      const vp = el.querySelector(":scope > video.vposter-video");
      if (vp)
        vp.style.display = "block";
      const overlay = el.querySelector(":scope > .vposter-overlay");
      if (overlay)
        overlay.style.display = "flex";
    }
    function ctrl(el) {
      let c = ctrlMap.get(el);
      if (!c) {
        c = { intent: "paused", playSeq: 0 };
        ctrlMap.set(el, c);
      }
      return c;
    }
    async function ensureAttrs(el) {
      const src = getAttr(el, "data-src");
      if (!src)
        throw new Error("[Video] data-src is required.");
      const providerAttr = getAttr(el, "data-provider");
      if (!providerAttr) {
        const provider = detectProvider(src);
        if (!provider)
          throw new Error("[Video] Could not detect provider.");
        el.setAttribute("data-provider", provider);
      }
    }
    function getVideoMimeType(url) {
      const ext = url.toLowerCase().match(/\.([^.?#]+)(?:[?#]|$)/)?.[1];
      const mimeTypes = {
        mp4: "video/mp4",
        webm: "video/webm",
        ogg: "video/ogg",
        ogv: "video/ogg",
        m3u8: "application/x-mpegURL",
        mpd: "application/dash+xml"
      };
      return mimeTypes[ext] || "video/mp4";
    }
    function buildSubtitleTrack(el) {
      if (subtitleTrackCache.has(el)) {
        return subtitleTrackCache.get(el);
      }
      const toggleAttr = getAttr(el, "data-subtitles");
      if (!parseBooleanAttr(toggleAttr, true)) {
        subtitleTrackCache.set(el, null);
        return null;
      }
      const rawSubtitleAttr = getAttr(el, "data-subtitle-src") || getAttr(el, "data-subtitle");
      if (!rawSubtitleAttr) {
        subtitleTrackCache.set(el, null);
        return null;
      }
      const normalizedSubtitle = rawSubtitleAttr.trim();
      if (!normalizedSubtitle) {
        subtitleTrackCache.set(el, null);
        return null;
      }
      if (SUBTITLE_DISABLED_VALUES.has(normalizedSubtitle.toLowerCase())) {
        subtitleTrackCache.set(el, null);
        return null;
      }
      const src = normalizedSubtitle;
      const label = getAttr(el, "data-subtitle-label") || SUBTITLE_DEFAULTS.label;
      const lang = (getAttr(el, "data-subtitle-lang") || SUBTITLE_DEFAULTS.lang).toLowerCase();
      const kind = getAttr(el, "data-subtitle-kind") || SUBTITLE_DEFAULTS.kind;
      const defaultFlag = parseBooleanAttr(
        getAttr(el, "data-subtitle-default"),
        SUBTITLE_DEFAULTS.defaultEnabled
      );
      const id = getAttr(el, "data-subtitle-id") || `${el.id || "video-player"}-cc-track`;
      const trackConfig = {
        id,
        src,
        kind,
        label,
        language: lang,
        lang,
        srclang: lang,
        default: defaultFlag
      };
      subtitleTrackCache.set(el, trackConfig);
      return trackConfig;
    }
    function hasExistingTextTracks(tracks) {
      if (!tracks)
        return false;
      if (typeof tracks.length === "number")
        return tracks.length > 0;
      if (typeof tracks.size === "number")
        return tracks.size > 0;
      if (typeof tracks.toArray === "function") {
        try {
          return tracks.toArray().length > 0;
        } catch {
          return false;
        }
      }
      return false;
    }
    function ensureSubtitleTrack(player, el, presetTrack) {
      const trackConfig = presetTrack || buildSubtitleTrack(el);
      if (!trackConfig)
        return;
      const tracksAPI = player?.textTracks;
      if (tracksAPI && typeof tracksAPI.add === "function") {
        if (typeof tracksAPI.getById === "function" && trackConfig.id && tracksAPI.getById(trackConfig.id))
          return;
        try {
          tracksAPI.add(trackConfig);
        } catch (error) {
          handleError(error, "Video Subtitle Track");
        }
      }
    }
    function pauseOtherPlayers(activeEl) {
      playerMap.forEach((player, el) => {
        if (el === activeEl)
          return;
        const state = ctrl(el);
        state.intent = "paused";
        state.playSeq++;
        dispatchRemote(el, "pause");
        try {
          player.pause?.();
        } catch {
        }
        el.classList.remove("playing");
      });
    }
    function pauseActivePlayers() {
      playerMap.forEach((player, el) => {
        const state = ctrl(el);
        const isPlaying = state.intent === "playing" || el.classList.contains("playing");
        if (!isPlaying)
          return;
        requestPause(el);
      });
    }
    async function initPlayer(el, { autoplay = false } = {}) {
      if (playerMap.has(el))
        return playerMap.get(el);
      loadVidstackStylesOnce();
      const { VidstackPlayer, VidstackPlayerLayout } = await preloadVidstack();
      if (!el.id)
        el.id = `video-player-${Math.random().toString(36).slice(2)}`;
      const srcUrl = getAttr(el, "data-src");
      const provider = getAttr(el, "data-provider") || detectProvider(srcUrl);
      const subtitleTrack = buildSubtitleTrack(el);
      let playerSrc = srcUrl;
      if (provider === "file") {
        playerSrc = {
          src: srcUrl,
          type: getVideoMimeType(srcUrl)
        };
      }
      const title = getAttr(el, "data-title") || "";
      const poster = getAttr(el, "data-poster") || "";
      const loadStrategy = getLoadStrategy(el);
      const posterLoadStrategy = getPosterLoadStrategy(el);
      const viewType = getAttr(el, "data-view-type");
      const streamType = getAttr(el, "data-stream-type");
      const duration = parseNumberAttr(getAttr(el, "data-duration"));
      const mediaSession = buildMediaSessionMetadata(el, title, poster);
      const playerOptions = {
        target: `#${el.id}`,
        src: playerSrc,
        title,
        poster,
        playsinline: true,
        autoplay,
        load: loadStrategy,
        posterLoad: posterLoadStrategy,
        layout: new VidstackPlayerLayout({
          captions: {
            visible: false
          }
        }),
        crossOrigin: true
      };
      if (viewType) {
        playerOptions.viewType = viewType;
      }
      if (streamType) {
        playerOptions.streamType = streamType;
      }
      if (typeof duration === "number") {
        playerOptions.duration = duration;
      }
      if (mediaSession) {
        playerOptions.mediaSession = mediaSession;
      }
      if (subtitleTrack) {
        playerOptions.tracks = [subtitleTrack];
      }
      if (provider === "youtube" || provider === "vimeo") {
        playerOptions.iframeAttrs = {
          allow: "autoplay; fullscreen; picture-in-picture; encrypted-media",
          cc_load_policy: 1
        };
      }
      const player = await VidstackPlayer.create(playerOptions);
      if (subtitleTrack && !hasExistingTextTracks(player?.textTracks)) {
        ensureSubtitleTrack(player, el, subtitleTrack);
      }
      player.addEventListener("play", () => {
        pauseOtherPlayers(el);
        el.classList.add("playing");
        hidePoster(el);
      });
      player.addEventListener("pause", () => {
        el.classList.remove("playing");
        showPoster(el);
      });
      playerMap.set(el, player);
      logger.log(`\u{1F3A5} Video player ready: ${el.id} (${provider})`);
      return player;
    }
    function playAfterLoaded(player, el, seq, timeoutMs = 1e4) {
      return new Promise((resolve) => {
        const s = ctrl(el);
        if (s.intent !== "playing" || s.playSeq !== seq)
          return resolve();
        let done = false;
        const finish = async () => {
          if (done)
            return;
          done = true;
          cleanup();
          const s2 = ctrl(el);
          if (s2.intent !== "playing" || s2.playSeq !== seq)
            return resolve();
          try {
            if (isMobileUA)
              player.muted = true;
            await player.play();
          } catch {
            try {
              player.muted = true;
              await player.play();
            } catch {
            }
          }
          resolve();
        };
        const cleanup = () => {
          events.forEach((evt) => player.removeEventListener(evt, finish));
          clearTimeout(tid);
        };
        const events = [
          "can-play",
          "can-play-through",
          "ready",
          "loaded-data",
          "loaded-metadata",
          "canplay",
          "canplaythrough",
          "loadeddata",
          "loadedmetadata"
        ];
        events.forEach((evt) => player.addEventListener(evt, finish, { once: true }));
        try {
          if (typeof player.startLoading === "function")
            player.startLoading();
          else if (typeof player.load === "function")
            player.load();
        } catch {
        }
        const tid = setTimeout(finish, timeoutMs);
      });
    }
    function requestPause(el) {
      const state = ctrl(el);
      state.intent = "paused";
      state.playSeq++;
      logger.log(`\u23F8\uFE0F Requesting pause for ${el.id || "(unnamed video player)"}`);
      dispatchRemote(el, "pause");
      try {
        playerMap.get(el)?.pause?.();
      } catch {
      }
    }
    function requestPlay(el, { autoplayOnInit = false, logInitError = false } = {}) {
      pauseOtherPlayers(el);
      hideOverlay(el);
      const state = ctrl(el);
      state.intent = "playing";
      state.playSeq++;
      logger.log(`\u25B6\uFE0F Requesting play for ${el.id || "(unnamed video player)"}`);
      dispatchRemote(el, "play");
      const existingPlayer = playerMap.get(el);
      if (existingPlayer) {
        playExisting(existingPlayer, el, state.playSeq);
        return;
      }
      initNewPlayer(el, state.playSeq, autoplayOnInit, logInitError);
    }
    function playExisting(player, el, seq) {
      try {
        if (isMobileUA)
          player.muted = true;
        player.play().catch(() => {
        });
      } catch {
      }
      playAfterLoaded(player, el, seq);
    }
    function initNewPlayer(el, seq, autoplayOnInit, logInitError) {
      (async () => {
        try {
          await ensureAttrs(el);
          const player = await initPlayer(el, { autoplay: autoplayOnInit });
          if (isMobileUA)
            player.muted = true;
          if (!autoplayOnInit) {
            player.play().catch(() => {
            });
            playAfterLoaded(player, el, seq);
          }
        } catch (error) {
          if (logInitError) {
            handleError(error, "Video Player Init");
          }
        }
      })();
    }
    function idTarget(node, attr) {
      const id = (node?.getAttribute?.(attr) || "").trim();
      return id ? document.getElementById(id[0] === "#" ? id.slice(1) : id) : null;
    }
    async function eagerInitPlayTargets(root = document) {
      const btns = Array.from(root.querySelectorAll("[data-video-play]"));
      if (!btns.length)
        return;
      const targets = /* @__PURE__ */ new Set();
      for (const b of btns) {
        const el = idTarget(b, "data-video-play");
        if (el)
          targets.add(el);
      }
      for (const el of targets) {
        try {
          await ensureAttrs(el);
          await mountPoster(el, { force: true });
          await initPlayer(el, { autoplay: false });
          el.setAttribute("data-video-state", "loaded");
        } catch {
        }
      }
    }
    function setupViewportLoader() {
      const nodes = document.querySelectorAll('video-source-player[data-video-state="ready"]');
      if (!nodes.length)
        return;
      if (!readyIO) {
        readyIO = new IntersectionObserver(
          async (entries) => {
            for (const entry of entries) {
              if (!entry.isIntersecting)
                continue;
              const el = entry.target;
              readyIO.unobserve(el);
              if (playerMap.has(el))
                continue;
              try {
                await ensureAttrs(el);
                await mountPoster(el, { force: true });
                await initPlayer(el, { autoplay: false });
                el.setAttribute("data-video-state", "loaded");
              } catch {
              }
            }
          },
          { root: null, rootMargin: "300px 0px", threshold: 0.01 }
        );
      }
      for (let i = 0; i < nodes.length; i++) {
        mountPoster(nodes[i], { force: false });
        readyIO.observe(nodes[i]);
      }
    }
    loadVidstackStylesOnce();
    ensureVideoBrandCSS();
    videoPlayers.forEach((el) => {
      primePlayerNode(el);
      if (getAttr(el, "data-poster") || getAttr(el, "data-video-poster")) {
        mountPoster(el, { force: false });
      } else {
        queuePosterFetch(el);
      }
    });
    setupViewportLoader();
    scheduleModuleWarm();
    document.addEventListener(
      "pointerdown",
      (e2) => {
        if (e2.target.closest("[data-video-play]"))
          preloadVidstack();
      },
      { capture: true }
    );
    if (!escKeydownHandler) {
      escKeydownHandler = (event) => {
        const key = event.key || event.code || "";
        if (key !== "Escape" && key !== "Esc")
          return;
        pauseActivePlayers();
      };
      document.addEventListener("keydown", escKeydownHandler);
    }
    document.addEventListener("click", (e2) => {
      const target = e2.target;
      const playBtn = target.closest("[data-video-play]");
      if (playBtn) {
        e2.preventDefault();
        const el = idTarget(playBtn, "data-video-play");
        if (el)
          requestPlay(el);
        return;
      }
      const playIconBtn = target.closest("[data-play-icon]");
      if (playIconBtn) {
        e2.preventDefault();
        const el = playIconBtn.closest("video-source-player");
        if (el)
          requestPlay(el);
        return;
      }
      const pauseBtn = target.closest("[data-video-pause]");
      if (pauseBtn) {
        e2.preventDefault();
        const el = idTarget(pauseBtn, "data-video-pause");
        if (el)
          requestPause(el);
        return;
      }
      const toggleBtn = target.closest("[data-video-toggle]");
      if (toggleBtn) {
        e2.preventDefault();
        const el = idTarget(toggleBtn, "data-video-toggle");
        if (!el)
          return;
        if (ctrl(el).intent === "playing")
          requestPause(el);
        else
          requestPlay(el);
        return;
      }
      const videoPlayer = target.closest("video-source-player");
      if (!videoPlayer)
        return;
      if (target.closest("media-player, .vds-player, [data-media-player]"))
        return;
      requestPlay(videoPlayer, { logInitError: true });
    });
    window.__applyVideoPostersAndObserve = async function(root = document) {
      root.querySelectorAll("video-source-player").forEach((el) => {
        primePlayerNode(el);
        if (getAttr(el, "data-poster") || getAttr(el, "data-video-poster")) {
          mountPoster(el, { force: false });
        } else {
          queuePosterFetch(el);
        }
      });
      await eagerInitPlayTargets(root);
      const added = root.querySelectorAll('video-source-player[data-video-state="ready"]');
      if (added.length)
        setupViewportLoader();
    };
  }
  function addBootstrapListeners() {
    if (!canUseDOM() || bootstrapAttached) {
      return;
    }
    bootstrapAttached = true;
    VIDEO_EVENTS.forEach((event) => {
      window.addEventListener(event, initVideoScript, { once: true, passive: true });
      document.addEventListener(event, initVideoScript, { once: true, passive: true });
    });
  }
  function cleanupVideoListeners() {
    if (!canUseDOM()) {
      return;
    }
    VIDEO_EVENTS.forEach((event) => {
      window.removeEventListener(event, initVideoScript, { passive: true });
      document.removeEventListener(event, initVideoScript, { passive: true });
    });
  }
  function canUseDOM() {
    return typeof window !== "undefined" && typeof document !== "undefined";
  }
  function syncWindowInitFlag(value) {
    if (typeof window !== "undefined") {
      window.videoScriptInitialized = value;
    }
  }
  function setVideoScriptInitialized(value) {
    videoScriptInitialized = value;
    syncWindowInitFlag(value);
  }
  var VIDEO_EVENTS, VIDSTACK_MODULE_URL, VIDSTACK_STYLE_URLS, bootstrapAttached, videoScriptInitialized, escKeydownHandler;
  var init_videoPlayer = __esm({
    "src/components/videoPlayer.js"() {
      init_helpers();
      init_logger();
      VIDEO_EVENTS = ["scroll", "mousemove", "touchstart", "pointerdown"];
      VIDSTACK_MODULE_URL = "https://cdn.vidstack.io/player";
      VIDSTACK_STYLE_URLS = [
        "https://cdn.vidstack.io/player/theme.css",
        "https://cdn.vidstack.io/player/video.css"
      ];
      bootstrapAttached = false;
      videoScriptInitialized = false;
      escKeydownHandler = null;
      syncWindowInitFlag(videoScriptInitialized);
    }
  });

  // src/components/modal-basic.js
  function initModalBasic() {
    if (typeof document === "undefined") {
      logger.warn("[ModalBasic] document is undefined (SSR) - skipping init.");
      return;
    }
    try {
      const modals = document.querySelectorAll(SELECTORS.modal);
      if (!modals.length) {
        if (!listenersAttached) {
          logger.info("[ModalBasic] No modals found on the page - nothing to initialize.");
        }
        return;
      }
      modals.forEach(enhanceModalAccessibility);
      enhanceTargetAccessibility();
      if (listenersAttached) {
        return;
      }
      const clickHandler = (event) => {
        const trigger = event.target.closest(SELECTORS.trigger);
        if (trigger) {
          const modalName = trigger.getAttribute("data-modal-target");
          if (!modalName) {
            return;
          }
          event.preventDefault();
          const currentActiveName = activeModal?.getAttribute("data-modal-name");
          if (currentActiveName === modalName) {
            closeAllModals("toggle");
            return;
          }
          try {
            openModal(modalName, trigger);
          } catch (error) {
            handleError(error, "Modal Basic Open");
          }
          return;
        }
        const closeBtn = event.target.closest(SELECTORS.close);
        if (closeBtn) {
          event.preventDefault();
          closeAllModals("button");
          return;
        }
        const modalRoot = activeModal && document.body.contains(activeModal) ? activeModal : null;
        if (modalRoot && allowOutsideClose(modalRoot) && shouldCloseOnOutsideClick(event, modalRoot)) {
          closeAllModals("overlay");
        }
      };
      const keydownHandler = (event) => {
        if (!activeModal || activeModal && !document.body.contains(activeModal)) {
          activeModal = null;
        }
        if (event.key === "Escape") {
          if (activeModal && allowEscapeClose(activeModal)) {
            event.preventDefault();
            closeAllModals("escape");
          }
          return;
        }
        if (event.key === "Tab" && activeModal) {
          trapFocus(event);
        }
      };
      document.addEventListener("click", clickHandler);
      document.addEventListener("keydown", keydownHandler);
      cleanupCallbacks.push(() => document.removeEventListener("click", clickHandler));
      cleanupCallbacks.push(() => document.removeEventListener("keydown", keydownHandler));
      listenersAttached = true;
      logger.log(`\u{1FA9F} ModalBasic ready (${modals.length} modal${modals.length > 1 ? "s" : ""})`);
    } catch (error) {
      handleError(error, "Modal Basic Initialization");
    }
  }
  function openModal(modalName, trigger) {
    const modalSelector = getSafeSelector("data-modal-name", modalName);
    if (!modalSelector) {
      logger.warn("[ModalBasic] Invalid modal name provided.");
      return;
    }
    const modal = document.querySelector(modalSelector);
    if (!modal) {
      logger.warn(`[ModalBasic] Modal "${modalName}" not found in the DOM.`);
      return;
    }
    if (activeModal === modal) {
      return;
    }
    closeAllModals("switch", { skipFocusRestore: true });
    previouslyFocusedElement = trigger && typeof trigger.focus === "function" && trigger || (document.activeElement instanceof HTMLElement ? document.activeElement : null);
    modal.setAttribute("data-modal-status", STATUS_ACTIVE);
    modal.setAttribute("aria-hidden", "false");
    updateTriggerState(modalName, STATUS_ACTIVE);
    const group = findModalGroup(modal, trigger);
    if (group) {
      group.setAttribute("data-modal-group-status", STATUS_ACTIVE);
    }
    activeModal = modal;
    modal.dispatchEvent(
      new CustomEvent("modal:open", {
        detail: {
          name: modalName,
          trigger
        },
        bubbles: true
      })
    );
    focusModal(modal);
  }
  function closeAllModals(reason = "manual", options = {}) {
    if (typeof document === "undefined")
      return;
    const { skipFocusRestore = false } = options;
    resetAllTriggers();
    document.querySelectorAll(SELECTORS.modal).forEach((modal) => {
      const wasActive = modal.getAttribute("data-modal-status") === STATUS_ACTIVE;
      modal.setAttribute("data-modal-status", STATUS_INACTIVE);
      modal.setAttribute("aria-hidden", "true");
      if (modal.getAttribute("data-modal-temp-tabindex") === "true") {
        modal.removeAttribute("tabindex");
        modal.removeAttribute("data-modal-temp-tabindex");
      }
      if (wasActive) {
        modal.dispatchEvent(
          new CustomEvent("modal:close", {
            detail: {
              name: modal.getAttribute("data-modal-name"),
              reason
            },
            bubbles: true
          })
        );
      }
    });
    document.querySelectorAll(SELECTORS.group).forEach((group) => {
      group.setAttribute("data-modal-group-status", STATUS_INACTIVE);
    });
    if (!skipFocusRestore && previouslyFocusedElement && typeof previouslyFocusedElement.focus === "function" && document.contains(previouslyFocusedElement)) {
      try {
        previouslyFocusedElement.focus({ preventScroll: true });
      } catch (error) {
        previouslyFocusedElement.focus();
      }
    }
    previouslyFocusedElement = null;
    activeModal = null;
  }
  function enhanceModalAccessibility(modal) {
    ensureModalId(modal);
    if (!modal.hasAttribute("role")) {
      modal.setAttribute("role", "dialog");
    }
    modal.setAttribute("aria-modal", "true");
    if (!modal.hasAttribute("data-modal-status")) {
      modal.setAttribute("data-modal-status", STATUS_INACTIVE);
    }
    const isActive = modal.getAttribute("data-modal-status") === STATUS_ACTIVE;
    modal.setAttribute("aria-hidden", isActive ? "false" : "true");
    if (!modal.hasAttribute("aria-labelledby")) {
      const heading = modal.querySelector("[data-modal-heading]");
      if (heading) {
        if (!heading.id) {
          headingIdCounter += 1;
          heading.id = `modal-heading-${headingIdCounter}`;
        }
        modal.setAttribute("aria-labelledby", heading.id);
      }
    }
    if (!modal.hasAttribute("aria-label") && !modal.hasAttribute("aria-labelledby")) {
      modal.setAttribute("aria-label", modal.getAttribute("data-modal-label") || "Modal dialog");
    }
  }
  function enhanceTargetAccessibility() {
    const triggers = document.querySelectorAll(SELECTORS.trigger);
    if (!triggers.length)
      return;
    triggers.forEach((trigger) => {
      const modalName = trigger.getAttribute("data-modal-target");
      if (!modalName)
        return;
      const modalSelector = getSafeSelector("data-modal-name", modalName);
      if (!modalSelector)
        return;
      const modal = document.querySelector(modalSelector);
      if (!modal) {
        logger.warn(`[ModalBasic] Trigger found for unknown modal "${modalName}"`);
        return;
      }
      const modalId = ensureModalId(modal);
      trigger.setAttribute("aria-controls", modalId);
      trigger.setAttribute("aria-haspopup", "dialog");
      if (!trigger.hasAttribute("data-modal-status")) {
        trigger.setAttribute("data-modal-status", STATUS_INACTIVE);
      }
      const isActive = modal.getAttribute("data-modal-status") === STATUS_ACTIVE;
      trigger.setAttribute("aria-expanded", isActive ? "true" : "false");
      trigger.setAttribute("aria-pressed", isActive ? "true" : "false");
    });
  }
  function focusModal(modal) {
    const focusable = getFocusableElements(modal);
    const target = focusable[0] || modal;
    requestAnimationFrame(() => {
      if (target === modal && !modal.hasAttribute("tabindex")) {
        modal.setAttribute("tabindex", "-1");
        modal.setAttribute("data-modal-temp-tabindex", "true");
      }
      if (typeof target.focus === "function") {
        try {
          target.focus({ preventScroll: true });
        } catch (error) {
          target.focus();
        }
      }
    });
  }
  function trapFocus(event) {
    if (!activeModal)
      return;
    const focusableElements = getFocusableElements(activeModal);
    if (!focusableElements.length) {
      event.preventDefault();
      focusModal(activeModal);
      return;
    }
    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];
    const isShiftPressed = event.shiftKey;
    const activeElement = document.activeElement;
    if (isShiftPressed && activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }
    if (!isShiftPressed && activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
  function getFocusableElements(container) {
    if (!container)
      return [];
    return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter((element) => {
      const isHidden = element.getAttribute("aria-hidden") === "true";
      const isDisabled = element.hasAttribute("disabled");
      return !isHidden && !isDisabled;
    });
  }
  function shouldCloseOnOutsideClick(event, modal) {
    if (!modal.contains(event.target))
      return false;
    const content = modal.querySelector(SELECTORS.content);
    if (!content) {
      return event.target === modal;
    }
    return !content.contains(event.target);
  }
  function allowOutsideClose(modal) {
    if (!modal)
      return false;
    if (!modal.hasAttribute("data-modal-close-outside"))
      return false;
    return modal.getAttribute("data-modal-close-outside") !== "false";
  }
  function allowEscapeClose(modal) {
    return modal.getAttribute("data-modal-escape") !== "false";
  }
  function findModalGroup(modal, trigger) {
    return modal.closest(SELECTORS.group) || trigger?.closest(SELECTORS.group) || null;
  }
  function resetAllTriggers() {
    document.querySelectorAll(SELECTORS.trigger).forEach((trigger) => {
      trigger.setAttribute("data-modal-status", STATUS_INACTIVE);
      trigger.setAttribute("aria-pressed", "false");
      trigger.setAttribute("aria-expanded", "false");
    });
  }
  function updateTriggerState(modalName, status) {
    const selector = getSafeSelector("data-modal-target", modalName);
    if (!selector)
      return;
    document.querySelectorAll(selector).forEach((trigger) => {
      trigger.setAttribute("data-modal-status", status);
      const isActive = status === STATUS_ACTIVE;
      trigger.setAttribute("aria-pressed", isActive ? "true" : "false");
      trigger.setAttribute("aria-expanded", isActive ? "true" : "false");
    });
  }
  function ensureModalId(modal) {
    if (modal.id)
      return modal.id;
    modalIdCounter += 1;
    const newId = `modal-${modalIdCounter}`;
    modal.id = newId;
    return newId;
  }
  function getSafeSelector(attribute, value) {
    if (!attribute || value === null || typeof value === "undefined") {
      return "";
    }
    const valueAsString = String(value);
    const escaped = typeof CSS !== "undefined" && typeof CSS.escape === "function" ? CSS.escape(valueAsString) : valueAsString.replace(/"/g, '\\"');
    return `[${attribute}="${escaped}"]`;
  }
  var SELECTORS, STATUS_ACTIVE, STATUS_INACTIVE, FOCUSABLE_SELECTOR, listenersAttached, activeModal, previouslyFocusedElement, headingIdCounter, modalIdCounter, cleanupCallbacks;
  var init_modal_basic = __esm({
    "src/components/modal-basic.js"() {
      init_helpers();
      init_logger();
      SELECTORS = {
        modal: "[data-modal-name]",
        trigger: "[data-modal-target]",
        close: "[data-modal-close]",
        group: "[data-modal-group-status]",
        content: "[data-modal-content]"
      };
      STATUS_ACTIVE = "active";
      STATUS_INACTIVE = "not-active";
      FOCUSABLE_SELECTOR = [
        "a[href]",
        "button:not([disabled])",
        "textarea:not([disabled])",
        'input:not([disabled]):not([type="hidden"])',
        "select:not([disabled])",
        '[tabindex]:not([tabindex="-1"])',
        '[contenteditable="true"]'
      ].join(", ");
      listenersAttached = false;
      activeModal = null;
      previouslyFocusedElement = null;
      headingIdCounter = 0;
      modalIdCounter = 0;
      cleanupCallbacks = [];
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
      let handleAnimations = function() {
        const splitLines = document.querySelectorAll('[data-split-text="line"]');
        if (!splitLines.length < 1) {
          splitLines.forEach((splitLine) => {
            const lines = splitLine.querySelectorAll(".line");
            gsap.from(lines, {
              opacity: 0,
              y: 100,
              duration: 1.2,
              ease: "power3.out",
              stagger: 0.15,
              scrollTrigger: splitLine
            });
          });
        }
      };
      if (document.querySelector("video-source-player")) {
        initVideoPlayer();
      }
      initSwiper();
      await initGSAP();
      initModalBasic();
      smoothScrollTo("[data-hero-scroll]", "#hero-section");
      handleAnimations();
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

  // src/pages/about.js
  var about_exports = {};
  __export(about_exports, {
    cleanupAboutPage: () => cleanupAboutPage,
    initAboutPage: () => initAboutPage
  });
  function initAboutPage() {
    logger.log("\u2139\uFE0F About page initialized");
    try {
      const teamCards = document.querySelectorAll("[data-team-card]");
      teamCards.forEach((card) => {
        const handleMouseEnter = () => {
          card.classList.add("is-hovered");
        };
        const handleMouseLeave = () => {
          card.classList.remove("is-hovered");
        };
        card.addEventListener("mouseenter", handleMouseEnter, { passive: true });
        card.addEventListener("mouseleave", handleMouseLeave, { passive: true });
        eventHandlers.set(card, { handleMouseEnter, handleMouseLeave });
        cleanupFunctions4.push(() => {
          const handlers = eventHandlers.get(card);
          if (handlers) {
            card.removeEventListener("mouseenter", handlers.handleMouseEnter);
            card.removeEventListener("mouseleave", handlers.handleMouseLeave);
          }
        });
      });
      const animateCounter = (element, target, duration = 2e3) => {
        const startTime = performance.now();
        const startValue = 0;
        let animationFrameId = null;
        let isCancelled = false;
        const animate = (currentTime) => {
          if (isCancelled)
            return;
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          const current = Math.floor(startValue + (target - startValue) * easeOutQuart);
          element.textContent = current;
          if (progress < 1) {
            animationFrameId = requestAnimationFrame(animate);
          } else {
            element.textContent = target;
          }
        };
        animationFrameId = requestAnimationFrame(animate);
        return () => {
          isCancelled = true;
          if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
          }
        };
      };
      const statsElements = document.querySelectorAll("[data-stat]");
      const observers = [];
      const cancelFunctions = [];
      statsElements.forEach((stat) => {
        const target = safeParseInt(stat.getAttribute("data-stat"), 0);
        if (target > 0) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  const cancelFn = animateCounter(stat, target);
                  cancelFunctions.push(cancelFn);
                  observer.unobserve(entry.target);
                }
              });
            },
            { threshold: 0.5 }
          );
          observer.observe(stat);
          observers.push(observer);
        }
      });
      cleanupFunctions4.push(() => {
        observers.forEach((observer) => observer.disconnect());
        cancelFunctions.forEach((cancelFn) => {
          try {
            cancelFn();
          } catch (error) {
          }
        });
      });
    } catch (error) {
      handleError(error, "About Page Initialization");
    }
  }
  function cleanupAboutPage() {
    cleanupFunctions4.forEach((cleanup) => {
      try {
        cleanup();
      } catch (error) {
        handleError(error, "About Page Cleanup");
      }
    });
    cleanupFunctions4.length = 0;
  }
  var cleanupFunctions4, eventHandlers;
  var init_about = __esm({
    "src/pages/about.js"() {
      init_helpers();
      init_logger();
      cleanupFunctions4 = [];
      eventHandlers = /* @__PURE__ */ new WeakMap();
    }
  });

  // src/pages/contact.js
  var contact_exports = {};
  __export(contact_exports, {
    cleanupContactPage: () => cleanupContactPage,
    initContactPage: () => initContactPage
  });
  function initContactPage() {
    logger.log("\u{1F4E7} Contact page initialized");
    try {
    } catch (error) {
      handleError(error, "Contact Page Initialization");
    }
  }
  function cleanupContactPage() {
    cleanupFunctions5.forEach((cleanup) => {
      try {
        cleanup();
      } catch (error) {
        handleError(error, "Contact Page Cleanup");
      }
    });
    cleanupFunctions5.length = 0;
  }
  var cleanupFunctions5;
  var init_contact = __esm({
    "src/pages/contact.js"() {
      init_helpers();
      init_logger();
      cleanupFunctions5 = [];
    }
  });

  // src/components/accordion.js
  function actuallyInitAccordion(accordion) {
    if (accordionInitialized.has(accordion))
      return;
    accordionInitialized.add(accordion);
    logger.log("\u{1F3B5} Accordion initializing...");
    try {
      let toggleItem = function(item, open) {
        if (!open && !collapsible) {
          const activeCount = accordion.querySelectorAll('[data-accordion="active"]').length;
          if (activeCount <= 1)
            return;
        }
        item.setAttribute("data-accordion", open ? "active" : "not-active");
        const toggle = item.querySelector("[data-accordion-toggle]");
        if (toggle) {
          toggle.setAttribute("aria-expanded", open ? "true" : "false");
        }
        item.dispatchEvent(
          new CustomEvent("accordion:toggle", {
            detail: { open },
            bubbles: true
          })
        );
        if (closeSiblings && open) {
          accordion.querySelectorAll('[data-accordion="active"]').forEach((sib) => {
            if (sib !== item) {
              sib.setAttribute("data-accordion", "not-active");
              const sibToggle = sib.querySelector("[data-accordion-toggle]");
              if (sibToggle) {
                sibToggle.setAttribute("aria-expanded", "false");
              }
              sib.dispatchEvent(
                new CustomEvent("accordion:toggle", {
                  detail: { open: false },
                  bubbles: true
                })
              );
            }
          });
        }
      };
      const closeSiblings = accordion.getAttribute("data-accordion-close-siblings") === "true";
      const firstActive = accordion.getAttribute("data-accordion-first-active") === "true";
      const collapsible = accordion.getAttribute("data-accordion-collapsible") === "true";
      const eventType = accordion.getAttribute("data-accordion-event") || "click";
      accordion.setAttribute("role", "region");
      if (!accordion.hasAttribute("aria-label")) {
        accordion.setAttribute("aria-label", "Accordion");
      }
      const items = accordion.querySelectorAll("[data-accordion]");
      items.forEach((item, index) => {
        const toggle = item.querySelector("[data-accordion-toggle]");
        const content = item.querySelector("[data-accordion-content]");
        if (toggle && content) {
          const contentId = content.id || `accordion-content-${Date.now()}-${index}`;
          const toggleId = toggle.id || `accordion-toggle-${Date.now()}-${index}`;
          content.id = contentId;
          toggle.id = toggleId;
          toggle.setAttribute("role", "button");
          toggle.setAttribute("aria-controls", contentId);
          toggle.setAttribute("aria-expanded", item.getAttribute("data-accordion") === "active");
          toggle.setAttribute("tabindex", "0");
          content.setAttribute("role", "region");
          content.setAttribute("aria-labelledby", toggleId);
        }
      });
      if (firstActive) {
        const first = accordion.querySelector("[data-accordion]");
        if (first) {
          first.setAttribute("data-accordion", "active");
          const toggle = first.querySelector("[data-accordion-toggle]");
          if (toggle) {
            toggle.setAttribute("aria-expanded", "true");
          }
          first.dispatchEvent(
            new CustomEvent("accordion:toggle", {
              detail: { open: true },
              bubbles: true
            })
          );
        }
      }
      if (eventType === "hover") {
        accordion.querySelectorAll("[data-accordion-toggle]").forEach((toggle) => {
          const item = toggle.closest("[data-accordion]");
          if (!item)
            return;
          toggle.addEventListener("mouseenter", () => {
            toggleItem(item, true);
          });
        });
      } else {
        accordion.addEventListener("click", (e2) => {
          const toggle = e2.target.closest("[data-accordion-toggle]");
          if (!toggle)
            return;
          const item = toggle.closest("[data-accordion]");
          if (!item)
            return;
          const isActive = item.getAttribute("data-accordion") === "active";
          toggleItem(item, !isActive);
        });
        accordion.addEventListener("keydown", (e2) => {
          const toggle = e2.target.closest("[data-accordion-toggle]");
          if (!toggle)
            return;
          if (e2.key === "Enter" || e2.key === " ") {
            e2.preventDefault();
            const item = toggle.closest("[data-accordion]");
            if (!item)
              return;
            const isActive = item.getAttribute("data-accordion") === "active";
            toggleItem(item, !isActive);
          }
        });
      }
    } catch (error) {
      handleError(error, "Accordion Initialization");
    }
  }
  function initAccordionCSS() {
    const accordions = document.querySelectorAll('[data-accordion-list="css"]');
    if (!accordions.length)
      return;
    logger.log(`\u23F3 Found ${accordions.length} accordion(s) - will initialize when visible...`);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const accordion = entry.target;
            observer.unobserve(accordion);
            accordion.setAttribute("data-accordion-observed", "true");
            actuallyInitAccordion(accordion);
          }
        });
      },
      {
        root: null,
        rootMargin: "100px",
        // Initialize 100px before accordion enters viewport
        threshold: 0
      }
    );
    accordions.forEach((accordion) => {
      observer.observe(accordion);
    });
  }
  var accordionInitialized;
  var init_accordion = __esm({
    "src/components/accordion.js"() {
      init_helpers();
      init_logger();
      accordionInitialized = /* @__PURE__ */ new Set();
    }
  });

  // src/pages/faq.js
  var faq_exports = {};
  __export(faq_exports, {
    cleanupFaqPage: () => cleanupFaqPage,
    initFaqPage: () => initFaqPage
  });
  function initFaqPage() {
    logger.log("\u2753 FAQ page initialized");
    try {
      initAccordionCSS();
    } catch (error) {
      handleError(error, "FAQ Page Initialization");
    }
  }
  function cleanupFaqPage() {
    cleanupFunctions6.forEach((cleanup) => {
      try {
        cleanup();
      } catch (error) {
        handleError(error, "FAQ Page Cleanup");
      }
    });
    cleanupFunctions6.length = 0;
  }
  var cleanupFunctions6;
  var init_faq = __esm({
    "src/pages/faq.js"() {
      init_accordion();
      init_helpers();
      init_logger();
      cleanupFunctions6 = [];
    }
  });

  // src/pages/news.js
  var news_exports = {};
  __export(news_exports, {
    cleanupNewsPage: () => cleanupNewsPage,
    initNewsPage: () => initNewsPage
  });
  function initNewsPage() {
    logger.log("\u{1F50D} News page initialized");
    try {
      initAccordionCSS();
    } catch (error) {
      handleError(error, "News Page Initialization");
    }
  }
  function cleanupNewsPage() {
    cleanupFunctions7.forEach((cleanup) => {
      try {
        cleanup();
      } catch (error) {
        handleError(error, "News Page Cleanup");
      }
    });
    cleanupFunctions7.length = 0;
  }
  var cleanupFunctions7;
  var init_news = __esm({
    "src/pages/news.js"() {
      init_accordion();
      init_helpers();
      init_logger();
      cleanupFunctions7 = [];
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
    const { gsap: gsap2, ScrollTrigger } = window;
    if (!gsap2 || !ScrollTrigger)
      return;
    footerScroll(gsap2, ScrollTrigger);
  }
  function footerScroll(gsap2, ScrollTrigger) {
    const footer2row = document.querySelector(".footer-row-2");
    if (!footer2row || window.innerWidth <= 991)
      return;
    const footerAnimation = gsap2.fromTo(
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
    home: () => Promise.resolve().then(() => (init_home(), home_exports)).then((m) => m.initHomePage),
    about: () => Promise.resolve().then(() => (init_about(), about_exports)).then((m) => m.initAboutPage),
    contact: () => Promise.resolve().then(() => (init_contact(), contact_exports)).then((m) => m.initContactPage),
    faq: () => Promise.resolve().then(() => (init_faq(), faq_exports)).then((m) => m.initFaqPage),
    news: () => Promise.resolve().then(() => (init_news(), news_exports)).then((m) => m.initNewsPage)
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
