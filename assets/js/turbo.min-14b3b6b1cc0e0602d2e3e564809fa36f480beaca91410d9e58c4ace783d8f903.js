!(function () {
  if (
    void 0 === window.Reflect ||
    void 0 === window.customElements ||
    window.customElements.polyfillWrapFlushCallback
  )
    return;
  const e = HTMLElement,
    t = function () {
      return Reflect.construct(e, [], this.constructor);
    };
  (window.HTMLElement = t),
    (HTMLElement.prototype = e.prototype),
    (HTMLElement.prototype.constructor = HTMLElement),
    Object.setPrototypeOf(HTMLElement, e);
})(),
  (function (e) {
    function t(e, t, s) {
      throw new e(
        "Failed to execute 'requestSubmit' on 'HTMLFormElement': " + t + ".",
        s
      );
    }
    "function" != typeof e.requestSubmit &&
      (e.requestSubmit = function (e) {
        e
          ? (!(function (e, s) {
              e instanceof HTMLElement ||
                t(TypeError, "parameter 1 is not of type 'HTMLElement'"),
                "submit" == e.type ||
                  t(TypeError, "The specified element is not a submit button"),
                e.form == s ||
                  t(
                    DOMException,
                    "The specified element is not owned by this form element",
                    "NotFoundError"
                  );
            })(e, this),
            e.click())
          : (((e = document.createElement("input")).type = "submit"),
            (e.hidden = !0),
            this.appendChild(e),
            e.click(),
            this.removeChild(e));
      });
  })(HTMLFormElement.prototype);
const e = new WeakMap();
function t(t) {
  const s = (function (e) {
    const t =
        e instanceof Element ? e : e instanceof Node ? e.parentElement : null,
      s = t ? t.closest("input, button") : null;
    return "submit" == (null == s ? void 0 : s.type) ? s : null;
  })(t.target);
  s && s.form && e.set(s.form, s);
}
var s, i, r, n, o, a;
!(function () {
  if ("submitter" in Event.prototype) return;
  let s;
  if ("SubmitEvent" in window && /Apple Computer/.test(navigator.vendor))
    s = window.SubmitEvent.prototype;
  else {
    if ("SubmitEvent" in window) return;
    s = window.Event.prototype;
  }
  addEventListener("click", t, !0),
    Object.defineProperty(s, "submitter", {
      get() {
        if ("submit" == this.type && this.target instanceof HTMLFormElement)
          return e.get(this.target);
      },
    });
})(),
  (function (e) {
    (e.eager = "eager"), (e.lazy = "lazy");
  })(s || (s = {}));
class c extends HTMLElement {
  constructor() {
    super(),
      (this.loaded = Promise.resolve()),
      (this.delegate = new c.delegateConstructor(this));
  }
  static get observedAttributes() {
    return ["disabled", "complete", "loading", "src"];
  }
  connectedCallback() {
    this.delegate.connect();
  }
  disconnectedCallback() {
    this.delegate.disconnect();
  }
  reload() {
    return this.delegate.sourceURLReloaded();
  }
  attributeChangedCallback(e) {
    "loading" == e
      ? this.delegate.loadingStyleChanged()
      : "complete" == e
      ? this.delegate.completeChanged()
      : "src" == e
      ? this.delegate.sourceURLChanged()
      : this.delegate.disabledChanged();
  }
  get src() {
    return this.getAttribute("src");
  }
  set src(e) {
    e ? this.setAttribute("src", e) : this.removeAttribute("src");
  }
  get loading() {
    return (function (e) {
      switch (e.toLowerCase()) {
        case "lazy":
          return s.lazy;
        default:
          return s.eager;
      }
    })(this.getAttribute("loading") || "");
  }
  set loading(e) {
    e ? this.setAttribute("loading", e) : this.removeAttribute("loading");
  }
  get disabled() {
    return this.hasAttribute("disabled");
  }
  set disabled(e) {
    e ? this.setAttribute("disabled", "") : this.removeAttribute("disabled");
  }
  get autoscroll() {
    return this.hasAttribute("autoscroll");
  }
  set autoscroll(e) {
    e
      ? this.setAttribute("autoscroll", "")
      : this.removeAttribute("autoscroll");
  }
  get complete() {
    return !this.delegate.isLoading;
  }
  get isActive() {
    return this.ownerDocument === document && !this.isPreview;
  }
  get isPreview() {
    var e, t;
    return null ===
      (t =
        null === (e = this.ownerDocument) || void 0 === e
          ? void 0
          : e.documentElement) || void 0 === t
      ? void 0
      : t.hasAttribute("data-turbo-preview");
  }
}
function l(e) {
  return new URL(e.toString(), document.baseURI);
}
function h(e) {
  let t;
  return e.hash
    ? e.hash.slice(1)
    : (t = e.href.match(/#(.*)$/))
    ? t[1]
    : void 0;
}
function d(e, t) {
  return l(
    (null == t ? void 0 : t.getAttribute("formaction")) ||
      e.getAttribute("action") ||
      e.action
  );
}
function u(e) {
  return (
    ((function (e) {
      return (function (e) {
        return e.pathname.split("/").slice(1);
      })(e).slice(-1)[0];
    })(e).match(/\.[^.]*$/) || [])[0] || ""
  );
}
function m(e, t) {
  const s = (function (e) {
    return (t = e.origin + e.pathname), t.endsWith("/") ? t : t + "/";
    var t;
  })(t);
  return e.href === l(s).href || e.href.startsWith(s);
}
function p(e, t) {
  return m(e, t) && !!u(e).match(/^(?:|\.(?:htm|html|xhtml|php))$/);
}
function g(e) {
  const t = h(e);
  return null != t ? e.href.slice(0, -(t.length + 1)) : e.href;
}
function f(e) {
  return g(e);
}
class b {
  constructor(e) {
    this.response = e;
  }
  get succeeded() {
    return this.response.ok;
  }
  get failed() {
    return !this.succeeded;
  }
  get clientError() {
    return this.statusCode >= 400 && this.statusCode <= 499;
  }
  get serverError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
  get redirected() {
    return this.response.redirected;
  }
  get location() {
    return l(this.response.url);
  }
  get isHTML() {
    return (
      this.contentType &&
      this.contentType.match(
        /^(?:text\/([^\s;,]+\b)?html|application\/xhtml\+xml)\b/
      )
    );
  }
  get statusCode() {
    return this.response.status;
  }
  get contentType() {
    return this.header("Content-Type");
  }
  get responseText() {
    return this.response.clone().text();
  }
  get responseHTML() {
    return this.isHTML ? this.response.clone().text() : Promise.resolve(void 0);
  }
  header(e) {
    return this.response.headers.get(e);
  }
}
function v(e) {
  if ("false" == e.getAttribute("data-turbo-eval")) return e;
  {
    const t = document.createElement("script"),
      s = M("csp-nonce");
    return (
      s && (t.nonce = s),
      (t.textContent = e.textContent),
      (t.async = !1),
      (function (e, t) {
        for (const { name: s, value: i } of t.attributes) e.setAttribute(s, i);
      })(t, e),
      t
    );
  }
}
function S(e, { target: t, cancelable: s, detail: i } = {}) {
  const r = new CustomEvent(e, {
    cancelable: s,
    bubbles: !0,
    composed: !0,
    detail: i,
  });
  return (
    t && t.isConnected
      ? t.dispatchEvent(r)
      : document.documentElement.dispatchEvent(r),
    r
  );
}
function w() {
  return new Promise((e) => requestAnimationFrame(() => e()));
}
function E(e = "") {
  return new DOMParser().parseFromString(e, "text/html");
}
function y(e, ...t) {
  const s = (function (e, t) {
      return e.reduce((e, s, i) => e + s + (null == t[i] ? "" : t[i]), "");
    })(e, t)
      .replace(/^\n/, "")
      .split("\n"),
    i = s[0].match(/^\s+/),
    r = i ? i[0].length : 0;
  return s.map((e) => e.slice(r)).join("\n");
}
function L() {
  return Array.from({ length: 36 })
    .map((e, t) =>
      8 == t || 13 == t || 18 == t || 23 == t
        ? "-"
        : 14 == t
        ? "4"
        : 19 == t
        ? (Math.floor(4 * Math.random()) + 8).toString(16)
        : Math.floor(15 * Math.random()).toString(16)
    )
    .join("");
}
function R(e, ...t) {
  for (const s of t.map((t) => (null == t ? void 0 : t.getAttribute(e))))
    if ("string" == typeof s) return s;
  return null;
}
function C(...e) {
  for (const t of e)
    "turbo-frame" == t.localName && t.setAttribute("busy", ""),
      t.setAttribute("aria-busy", "true");
}
function A(...e) {
  for (const t of e)
    "turbo-frame" == t.localName && t.removeAttribute("busy"),
      t.removeAttribute("aria-busy");
}
function T(e, t = 2e3) {
  return new Promise((s) => {
    const i = () => {
      e.removeEventListener("error", i), e.removeEventListener("load", i), s();
    };
    e.addEventListener("load", i, { once: !0 }),
      e.addEventListener("error", i, { once: !0 }),
      setTimeout(s, t);
  });
}
function P(e) {
  switch (e) {
    case "replace":
      return history.replaceState;
    case "advance":
    case "restore":
      return history.pushState;
  }
}
function k(...e) {
  const t = R("data-turbo-action", ...e);
  return (function (e) {
    return "advance" == e || "replace" == e || "restore" == e;
  })(t)
    ? t
    : null;
}
function F(e) {
  return document.querySelector(`meta[name="${e}"]`);
}
function M(e) {
  const t = F(e);
  return t && t.content;
}
function I(e, t) {
  var s;
  if (e instanceof Element)
    return (
      e.closest(t) ||
      I(
        e.assignedSlot ||
          (null === (s = e.getRootNode()) || void 0 === s ? void 0 : s.host),
        t
      )
    );
}
!(function (e) {
  (e[(e.get = 0)] = "get"),
    (e[(e.post = 1)] = "post"),
    (e[(e.put = 2)] = "put"),
    (e[(e.patch = 3)] = "patch"),
    (e[(e.delete = 4)] = "delete");
})(i || (i = {}));
class H {
  constructor(e, t, s, i = new URLSearchParams(), r = null) {
    (this.abortController = new AbortController()),
      (this.resolveRequestPromise = (e) => {}),
      (this.delegate = e),
      (this.method = t),
      (this.headers = this.defaultHeaders),
      (this.body = i),
      (this.url = s),
      (this.target = r);
  }
  get location() {
    return this.url;
  }
  get params() {
    return this.url.searchParams;
  }
  get entries() {
    return this.body ? Array.from(this.body.entries()) : [];
  }
  cancel() {
    this.abortController.abort();
  }
  async perform() {
    const { fetchOptions: e } = this;
    this.delegate.prepareRequest(this),
      await this.allowRequestToBeIntercepted(e);
    try {
      this.delegate.requestStarted(this);
      const t = await fetch(this.url.href, e);
      return await this.receive(t);
    } catch (e) {
      if ("AbortError" !== e.name)
        throw (
          (this.willDelegateErrorHandling(e) &&
            this.delegate.requestErrored(this, e),
          e)
        );
    } finally {
      this.delegate.requestFinished(this);
    }
  }
  async receive(e) {
    const t = new b(e);
    return (
      S("turbo:before-fetch-response", {
        cancelable: !0,
        detail: { fetchResponse: t },
        target: this.target,
      }).defaultPrevented
        ? this.delegate.requestPreventedHandlingResponse(this, t)
        : t.succeeded
        ? this.delegate.requestSucceededWithResponse(this, t)
        : this.delegate.requestFailedWithResponse(this, t),
      t
    );
  }
  get fetchOptions() {
    var e;
    return {
      method: i[this.method].toUpperCase(),
      credentials: "same-origin",
      headers: this.headers,
      redirect: "follow",
      body: this.isIdempotent ? null : this.body,
      signal: this.abortSignal,
      referrer:
        null === (e = this.delegate.referrer) || void 0 === e ? void 0 : e.href,
    };
  }
  get defaultHeaders() {
    return { Accept: "text/html, application/xhtml+xml" };
  }
  get isIdempotent() {
    return this.method == i.get;
  }
  get abortSignal() {
    return this.abortController.signal;
  }
  acceptResponseType(e) {
    this.headers.Accept = [e, this.headers.Accept].join(", ");
  }
  async allowRequestToBeIntercepted(e) {
    const t = new Promise((e) => (this.resolveRequestPromise = e));
    S("turbo:before-fetch-request", {
      cancelable: !0,
      detail: {
        fetchOptions: e,
        url: this.url,
        resume: this.resolveRequestPromise,
      },
      target: this.target,
    }).defaultPrevented && (await t);
  }
  willDelegateErrorHandling(e) {
    return !S("turbo:fetch-request-error", {
      target: this.target,
      cancelable: !0,
      detail: { request: this, error: e },
    }).defaultPrevented;
  }
}
class q {
  constructor(e, t) {
    (this.started = !1),
      (this.intersect = (e) => {
        const t = e.slice(-1)[0];
        (null == t ? void 0 : t.isIntersecting) &&
          this.delegate.elementAppearedInViewport(this.element);
      }),
      (this.delegate = e),
      (this.element = t),
      (this.intersectionObserver = new IntersectionObserver(this.intersect));
  }
  start() {
    this.started ||
      ((this.started = !0), this.intersectionObserver.observe(this.element));
  }
  stop() {
    this.started &&
      ((this.started = !1), this.intersectionObserver.unobserve(this.element));
  }
}
class O {
  constructor(e) {
    this.fragment = (function (e) {
      for (const t of e.querySelectorAll("turbo-stream")) {
        const e = document.importNode(t, !0);
        for (const t of e.templateElement.content.querySelectorAll("script"))
          t.replaceWith(v(t));
        t.replaceWith(e);
      }
      return e;
    })(e);
  }
  static wrap(e) {
    return "string" == typeof e
      ? new this(
          (function (e) {
            const t = document.createElement("template");
            return (t.innerHTML = e), t.content;
          })(e)
        )
      : e;
  }
}
(O.contentType = "text/vnd.turbo-stream.html"),
  (function (e) {
    (e[(e.initialized = 0)] = "initialized"),
      (e[(e.requesting = 1)] = "requesting"),
      (e[(e.waiting = 2)] = "waiting"),
      (e[(e.receiving = 3)] = "receiving"),
      (e[(e.stopping = 4)] = "stopping"),
      (e[(e.stopped = 5)] = "stopped");
  })(r || (r = {})),
  (function (e) {
    (e.urlEncoded = "application/x-www-form-urlencoded"),
      (e.multipart = "multipart/form-data"),
      (e.plain = "text/plain");
  })(n || (n = {}));
class B {
  constructor(e, t, s, n = !1) {
    (this.state = r.initialized),
      (this.delegate = e),
      (this.formElement = t),
      (this.submitter = s),
      (this.formData = (function (e, t) {
        const s = new FormData(e),
          i = null == t ? void 0 : t.getAttribute("name"),
          r = null == t ? void 0 : t.getAttribute("value");
        i && s.append(i, r || "");
        return s;
      })(t, s)),
      (this.location = l(this.action)),
      this.method == i.get &&
        (function (e, t) {
          const s = new URLSearchParams();
          for (const [e, i] of t) i instanceof File || s.append(e, i);
          e.search = s.toString();
        })(this.location, [...this.body.entries()]),
      (this.fetchRequest = new H(
        this,
        this.method,
        this.location,
        this.body,
        this.formElement
      )),
      (this.mustRedirect = n);
  }
  static confirmMethod(e, t, s) {
    return Promise.resolve(confirm(e));
  }
  get method() {
    var e;
    return (
      (function (e) {
        switch (e.toLowerCase()) {
          case "get":
            return i.get;
          case "post":
            return i.post;
          case "put":
            return i.put;
          case "patch":
            return i.patch;
          case "delete":
            return i.delete;
        }
      })(
        (
          (null === (e = this.submitter) || void 0 === e
            ? void 0
            : e.getAttribute("formmethod")) ||
          this.formElement.getAttribute("method") ||
          ""
        ).toLowerCase()
      ) || i.get
    );
  }
  get action() {
    var e;
    const t =
      "string" == typeof this.formElement.action
        ? this.formElement.action
        : null;
    return (
      null === (e = this.submitter) || void 0 === e
        ? void 0
        : e.hasAttribute("formaction")
    )
      ? this.submitter.getAttribute("formaction") || ""
      : this.formElement.getAttribute("action") || t || "";
  }
  get body() {
    return this.enctype == n.urlEncoded || this.method == i.get
      ? new URLSearchParams(this.stringFormData)
      : this.formData;
  }
  get enctype() {
    var e;
    return (function (e) {
      switch (e.toLowerCase()) {
        case n.multipart:
          return n.multipart;
        case n.plain:
          return n.plain;
        default:
          return n.urlEncoded;
      }
    })(
      (null === (e = this.submitter) || void 0 === e
        ? void 0
        : e.getAttribute("formenctype")) || this.formElement.enctype
    );
  }
  get isIdempotent() {
    return this.fetchRequest.isIdempotent;
  }
  get stringFormData() {
    return [...this.formData].reduce(
      (e, [t, s]) => e.concat("string" == typeof s ? [[t, s]] : []),
      []
    );
  }
  async start() {
    const { initialized: e, requesting: t } = r,
      s = R("data-turbo-confirm", this.submitter, this.formElement);
    if ("string" == typeof s) {
      if (!(await B.confirmMethod(s, this.formElement, this.submitter))) return;
    }
    if (this.state == e) return (this.state = t), this.fetchRequest.perform();
  }
  stop() {
    const { stopping: e, stopped: t } = r;
    if (this.state != e && this.state != t)
      return (this.state = e), this.fetchRequest.cancel(), !0;
  }
  prepareRequest(e) {
    if (!e.isIdempotent) {
      const t =
        (function (e) {
          if (null != e) {
            const t = (document.cookie ? document.cookie.split("; ") : []).find(
              (t) => t.startsWith(e)
            );
            if (t) {
              const e = t.split("=").slice(1).join("=");
              return e ? decodeURIComponent(e) : void 0;
            }
          }
        })(M("csrf-param")) || M("csrf-token");
      t && (e.headers["X-CSRF-Token"] = t);
    }
    this.requestAcceptsTurboStreamResponse(e) &&
      e.acceptResponseType(O.contentType);
  }
  requestStarted(e) {
    var t;
    (this.state = r.waiting),
      null === (t = this.submitter) ||
        void 0 === t ||
        t.setAttribute("disabled", ""),
      S("turbo:submit-start", {
        target: this.formElement,
        detail: { formSubmission: this },
      }),
      this.delegate.formSubmissionStarted(this);
  }
  requestPreventedHandlingResponse(e, t) {
    this.result = { success: t.succeeded, fetchResponse: t };
  }
  requestSucceededWithResponse(e, t) {
    if (t.clientError || t.serverError)
      this.delegate.formSubmissionFailedWithResponse(this, t);
    else if (
      this.requestMustRedirect(e) &&
      (function (e) {
        return 200 == e.statusCode && !e.redirected;
      })(t)
    ) {
      const e = new Error("Form responses must redirect to another location");
      this.delegate.formSubmissionErrored(this, e);
    } else
      (this.state = r.receiving),
        (this.result = { success: !0, fetchResponse: t }),
        this.delegate.formSubmissionSucceededWithResponse(this, t);
  }
  requestFailedWithResponse(e, t) {
    (this.result = { success: !1, fetchResponse: t }),
      this.delegate.formSubmissionFailedWithResponse(this, t);
  }
  requestErrored(e, t) {
    (this.result = { success: !1, error: t }),
      this.delegate.formSubmissionErrored(this, t);
  }
  requestFinished(e) {
    var t;
    (this.state = r.stopped),
      null === (t = this.submitter) ||
        void 0 === t ||
        t.removeAttribute("disabled"),
      S("turbo:submit-end", {
        target: this.formElement,
        detail: Object.assign({ formSubmission: this }, this.result),
      }),
      this.delegate.formSubmissionFinished(this);
  }
  requestMustRedirect(e) {
    return !e.isIdempotent && this.mustRedirect;
  }
  requestAcceptsTurboStreamResponse(e) {
    return (
      !e.isIdempotent ||
      (function (e, ...t) {
        return t.some((t) => t && t.hasAttribute(e));
      })("data-turbo-stream", this.submitter, this.formElement)
    );
  }
}
class N {
  constructor(e) {
    this.element = e;
  }
  get activeElement() {
    return this.element.ownerDocument.activeElement;
  }
  get children() {
    return [...this.element.children];
  }
  hasAnchor(e) {
    return null != this.getElementForAnchor(e);
  }
  getElementForAnchor(e) {
    return e ? this.element.querySelector(`[id='${e}'], a[name='${e}']`) : null;
  }
  get isConnected() {
    return this.element.isConnected;
  }
  get firstAutofocusableElement() {
    for (const e of this.element.querySelectorAll("[autofocus]"))
      if (
        null ==
        e.closest(
          "[inert], :disabled, [hidden], details:not([open]), dialog:not([open])"
        )
      )
        return e;
    return null;
  }
  get permanentElements() {
    return V(this.element);
  }
  getPermanentElementById(e) {
    return D(this.element, e);
  }
  getPermanentElementMapForSnapshot(e) {
    const t = {};
    for (const s of this.permanentElements) {
      const { id: i } = s,
        r = e.getPermanentElementById(i);
      r && (t[i] = [s, r]);
    }
    return t;
  }
}
function D(e, t) {
  return e.querySelector(`#${t}[data-turbo-permanent]`);
}
function V(e) {
  return e.querySelectorAll("[id][data-turbo-permanent]");
}
class W {
  constructor(e, t) {
    (this.started = !1),
      (this.submitCaptured = () => {
        this.eventTarget.removeEventListener("submit", this.submitBubbled, !1),
          this.eventTarget.addEventListener("submit", this.submitBubbled, !1);
      }),
      (this.submitBubbled = (e) => {
        if (!e.defaultPrevented) {
          const t = e.target instanceof HTMLFormElement ? e.target : void 0,
            s = e.submitter || void 0;
          t &&
            (function (e, t) {
              return (
                "dialog" !=
                ((null == t ? void 0 : t.getAttribute("formmethod")) ||
                  e.getAttribute("method"))
              );
            })(t, s) &&
            (function (e, t) {
              if (
                (null == t ? void 0 : t.hasAttribute("formtarget")) ||
                e.hasAttribute("target")
              ) {
                const s =
                  (null == t ? void 0 : t.getAttribute("formtarget")) ||
                  e.target;
                for (const e of document.getElementsByName(s))
                  if (e instanceof HTMLIFrameElement) return !1;
                return !0;
              }
              return !0;
            })(t, s) &&
            this.delegate.willSubmitForm(t, s) &&
            (e.preventDefault(),
            e.stopImmediatePropagation(),
            this.delegate.formSubmitted(t, s));
        }
      }),
      (this.delegate = e),
      (this.eventTarget = t);
  }
  start() {
    this.started ||
      (this.eventTarget.addEventListener("submit", this.submitCaptured, !0),
      (this.started = !0));
  }
  stop() {
    this.started &&
      (this.eventTarget.removeEventListener("submit", this.submitCaptured, !0),
      (this.started = !1));
  }
}
class x {
  constructor(e, t) {
    (this.resolveRenderPromise = (e) => {}),
      (this.resolveInterceptionPromise = (e) => {}),
      (this.delegate = e),
      (this.element = t);
  }
  scrollToAnchor(e) {
    const t = this.snapshot.getElementForAnchor(e);
    t
      ? (this.scrollToElement(t), this.focusElement(t))
      : this.scrollToPosition({ x: 0, y: 0 });
  }
  scrollToAnchorFromLocation(e) {
    this.scrollToAnchor(h(e));
  }
  scrollToElement(e) {
    e.scrollIntoView();
  }
  focusElement(e) {
    e instanceof HTMLElement &&
      (e.hasAttribute("tabindex")
        ? e.focus()
        : (e.setAttribute("tabindex", "-1"),
          e.focus(),
          e.removeAttribute("tabindex")));
  }
  scrollToPosition({ x: e, y: t }) {
    this.scrollRoot.scrollTo(e, t);
  }
  scrollToTop() {
    this.scrollToPosition({ x: 0, y: 0 });
  }
  get scrollRoot() {
    return window;
  }
  async render(e) {
    const { isPreview: t, shouldRender: s, newSnapshot: i } = e;
    if (s)
      try {
        (this.renderPromise = new Promise(
          (e) => (this.resolveRenderPromise = e)
        )),
          (this.renderer = e),
          await this.prepareToRenderSnapshot(e);
        const s = new Promise((e) => (this.resolveInterceptionPromise = e)),
          r = {
            resume: this.resolveInterceptionPromise,
            render: this.renderer.renderElement,
          };
        this.delegate.allowsImmediateRender(i, r) || (await s),
          await this.renderSnapshot(e),
          this.delegate.viewRenderedSnapshot(i, t),
          this.delegate.preloadOnLoadLinksForView(this.element),
          this.finishRenderingSnapshot(e);
      } finally {
        delete this.renderer,
          this.resolveRenderPromise(void 0),
          delete this.renderPromise;
      }
    else this.invalidate(e.reloadReason);
  }
  invalidate(e) {
    this.delegate.viewInvalidated(e);
  }
  async prepareToRenderSnapshot(e) {
    this.markAsPreview(e.isPreview), await e.prepareToRender();
  }
  markAsPreview(e) {
    e
      ? this.element.setAttribute("data-turbo-preview", "")
      : this.element.removeAttribute("data-turbo-preview");
  }
  async renderSnapshot(e) {
    await e.render();
  }
  finishRenderingSnapshot(e) {
    e.finishRendering();
  }
}
class _ extends x {
  invalidate() {
    this.element.innerHTML = "";
  }
  get snapshot() {
    return new N(this.element);
  }
}
class U {
  constructor(e, t) {
    (this.clickBubbled = (e) => {
      this.respondsToEventTarget(e.target)
        ? (this.clickEvent = e)
        : delete this.clickEvent;
    }),
      (this.linkClicked = (e) => {
        this.clickEvent &&
          this.respondsToEventTarget(e.target) &&
          e.target instanceof Element &&
          this.delegate.shouldInterceptLinkClick(
            e.target,
            e.detail.url,
            e.detail.originalEvent
          ) &&
          (this.clickEvent.preventDefault(),
          e.preventDefault(),
          this.delegate.linkClickIntercepted(
            e.target,
            e.detail.url,
            e.detail.originalEvent
          )),
          delete this.clickEvent;
      }),
      (this.willVisit = (e) => {
        delete this.clickEvent;
      }),
      (this.delegate = e),
      (this.element = t);
  }
  start() {
    this.element.addEventListener("click", this.clickBubbled),
      document.addEventListener("turbo:click", this.linkClicked),
      document.addEventListener("turbo:before-visit", this.willVisit);
  }
  stop() {
    this.element.removeEventListener("click", this.clickBubbled),
      document.removeEventListener("turbo:click", this.linkClicked),
      document.removeEventListener("turbo:before-visit", this.willVisit);
  }
  respondsToEventTarget(e) {
    const t =
      e instanceof Element ? e : e instanceof Node ? e.parentElement : null;
    return t && t.closest("turbo-frame, html") == this.element;
  }
}
class j {
  constructor(e, t) {
    (this.started = !1),
      (this.clickCaptured = () => {
        this.eventTarget.removeEventListener("click", this.clickBubbled, !1),
          this.eventTarget.addEventListener("click", this.clickBubbled, !1);
      }),
      (this.clickBubbled = (e) => {
        if (e instanceof MouseEvent && this.clickEventIsSignificant(e)) {
          const t = (e.composedPath && e.composedPath()[0]) || e.target,
            s = this.findLinkFromClickTarget(t);
          if (
            s &&
            (function (e) {
              if (e.hasAttribute("target")) {
                for (const t of document.getElementsByName(e.target))
                  if (t instanceof HTMLIFrameElement) return !1;
                return !0;
              }
              return !0;
            })(s)
          ) {
            const t = this.getLocationForLink(s);
            this.delegate.willFollowLinkToLocation(s, t, e) &&
              (e.preventDefault(), this.delegate.followedLinkToLocation(s, t));
          }
        }
      }),
      (this.delegate = e),
      (this.eventTarget = t);
  }
  start() {
    this.started ||
      (this.eventTarget.addEventListener("click", this.clickCaptured, !0),
      (this.started = !0));
  }
  stop() {
    this.started &&
      (this.eventTarget.removeEventListener("click", this.clickCaptured, !0),
      (this.started = !1));
  }
  clickEventIsSignificant(e) {
    return !(
      (e.target && e.target.isContentEditable) ||
      e.defaultPrevented ||
      e.which > 1 ||
      e.altKey ||
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey
    );
  }
  findLinkFromClickTarget(e) {
    return I(e, "a[href]:not([target^=_]):not([download])");
  }
  getLocationForLink(e) {
    return l(e.getAttribute("href") || "");
  }
}
class $ {
  constructor(e, t) {
    (this.delegate = e), (this.linkInterceptor = new j(this, t));
  }
  start() {
    this.linkInterceptor.start();
  }
  stop() {
    this.linkInterceptor.stop();
  }
  willFollowLinkToLocation(e, t, s) {
    return (
      this.delegate.willSubmitFormLinkToLocation(e, t, s) &&
      e.hasAttribute("data-turbo-method")
    );
  }
  followedLinkToLocation(e, t) {
    const s = document.createElement("form");
    for (const [e, i] of t.searchParams)
      s.append(
        Object.assign(document.createElement("input"), {
          type: "hidden",
          name: e,
          value: i,
        })
      );
    const i = Object.assign(t, { search: "" });
    s.setAttribute("data-turbo", "true"),
      s.setAttribute("action", i.href),
      s.setAttribute("hidden", "");
    const r = e.getAttribute("data-turbo-method");
    r && s.setAttribute("method", r);
    const n = e.getAttribute("data-turbo-frame");
    n && s.setAttribute("data-turbo-frame", n);
    const o = k(e);
    o && s.setAttribute("data-turbo-action", o);
    const a = e.getAttribute("data-turbo-confirm");
    a && s.setAttribute("data-turbo-confirm", a);
    e.hasAttribute("data-turbo-stream") &&
      s.setAttribute("data-turbo-stream", ""),
      this.delegate.submittedFormLinkToLocation(e, t, s),
      document.body.appendChild(s),
      s.addEventListener("turbo:submit-end", () => s.remove(), { once: !0 }),
      requestAnimationFrame(() => s.requestSubmit());
  }
}
class z {
  constructor(e, t) {
    (this.delegate = e), (this.permanentElementMap = t);
  }
  static async preservingPermanentElements(e, t, s) {
    const i = new this(e, t);
    i.enter(), await s(), i.leave();
  }
  enter() {
    for (const e in this.permanentElementMap) {
      const [t, s] = this.permanentElementMap[e];
      this.delegate.enteringBardo(t, s),
        this.replaceNewPermanentElementWithPlaceholder(s);
    }
  }
  leave() {
    for (const e in this.permanentElementMap) {
      const [t] = this.permanentElementMap[e];
      this.replaceCurrentPermanentElementWithClone(t),
        this.replacePlaceholderWithPermanentElement(t),
        this.delegate.leavingBardo(t);
    }
  }
  replaceNewPermanentElementWithPlaceholder(e) {
    const t = (function (e) {
      const t = document.createElement("meta");
      return (
        t.setAttribute("name", "turbo-permanent-placeholder"),
        t.setAttribute("content", e.id),
        t
      );
    })(e);
    e.replaceWith(t);
  }
  replaceCurrentPermanentElementWithClone(e) {
    const t = e.cloneNode(!0);
    e.replaceWith(t);
  }
  replacePlaceholderWithPermanentElement(e) {
    const t = this.getPlaceholderById(e.id);
    null == t || t.replaceWith(e);
  }
  getPlaceholderById(e) {
    return this.placeholders.find((t) => t.content == e);
  }
  get placeholders() {
    return [
      ...document.querySelectorAll(
        "meta[name=turbo-permanent-placeholder][content]"
      ),
    ];
  }
}
class G {
  constructor(e, t, s, i, r = !0) {
    (this.activeElement = null),
      (this.currentSnapshot = e),
      (this.newSnapshot = t),
      (this.isPreview = i),
      (this.willRender = r),
      (this.renderElement = s),
      (this.promise = new Promise(
        (e, t) => (this.resolvingFunctions = { resolve: e, reject: t })
      ));
  }
  get shouldRender() {
    return !0;
  }
  get reloadReason() {}
  prepareToRender() {}
  finishRendering() {
    this.resolvingFunctions &&
      (this.resolvingFunctions.resolve(), delete this.resolvingFunctions);
  }
  async preservingPermanentElements(e) {
    await z.preservingPermanentElements(this, this.permanentElementMap, e);
  }
  focusFirstAutofocusableElement() {
    const e = this.connectedSnapshot.firstAutofocusableElement;
    (function (e) {
      return e && "function" == typeof e.focus;
    })(e) && e.focus();
  }
  enteringBardo(e) {
    this.activeElement ||
      (e.contains(this.currentSnapshot.activeElement) &&
        (this.activeElement = this.currentSnapshot.activeElement));
  }
  leavingBardo(e) {
    e.contains(this.activeElement) &&
      this.activeElement instanceof HTMLElement &&
      (this.activeElement.focus(), (this.activeElement = null));
  }
  get connectedSnapshot() {
    return this.newSnapshot.isConnected
      ? this.newSnapshot
      : this.currentSnapshot;
  }
  get currentElement() {
    return this.currentSnapshot.element;
  }
  get newElement() {
    return this.newSnapshot.element;
  }
  get permanentElementMap() {
    return this.currentSnapshot.getPermanentElementMapForSnapshot(
      this.newSnapshot
    );
  }
}
class J extends G {
  constructor(e, t, s, i, r, n = !0) {
    super(t, s, i, r, n), (this.delegate = e);
  }
  static renderElement(e, t) {
    var s;
    const i = document.createRange();
    i.selectNodeContents(e), i.deleteContents();
    const r = t,
      n =
        null === (s = r.ownerDocument) || void 0 === s
          ? void 0
          : s.createRange();
    n && (n.selectNodeContents(r), e.appendChild(n.extractContents()));
  }
  get shouldRender() {
    return !0;
  }
  async render() {
    await w(),
      this.preservingPermanentElements(() => {
        this.loadFrameElement();
      }),
      this.scrollFrameIntoView(),
      await w(),
      this.focusFirstAutofocusableElement(),
      await w(),
      this.activateScriptElements();
  }
  loadFrameElement() {
    this.delegate.willRenderFrame(this.currentElement, this.newElement),
      this.renderElement(this.currentElement, this.newElement);
  }
  scrollFrameIntoView() {
    if (this.currentElement.autoscroll || this.newElement.autoscroll) {
      const s = this.currentElement.firstElementChild,
        i =
          ((e = this.currentElement.getAttribute("data-autoscroll-block")),
          (t = "end"),
          "end" == e || "start" == e || "center" == e || "nearest" == e
            ? e
            : t),
        r = (function (e, t) {
          return "auto" == e || "smooth" == e ? e : t;
        })(
          this.currentElement.getAttribute("data-autoscroll-behavior"),
          "auto"
        );
      if (s) return s.scrollIntoView({ block: i, behavior: r }), !0;
    }
    var e, t;
    return !1;
  }
  activateScriptElements() {
    for (const e of this.newScriptElements) {
      const t = v(e);
      e.replaceWith(t);
    }
  }
  get newScriptElements() {
    return this.currentElement.querySelectorAll("script");
  }
}
class K {
  constructor() {
    (this.hiding = !1),
      (this.value = 0),
      (this.visible = !1),
      (this.trickle = () => {
        this.setValue(this.value + Math.random() / 100);
      }),
      (this.stylesheetElement = this.createStylesheetElement()),
      (this.progressElement = this.createProgressElement()),
      this.installStylesheetElement(),
      this.setValue(0);
  }
  static get defaultCSS() {
    return y`
      .turbo-progress-bar {
        position: fixed;
        display: block;
        top: 0;
        left: 0;
        height: 3px;
        background: #0076ff;
        z-index: 2147483647;
        transition:
          width ${K.animationDuration}ms ease-out,
          opacity ${K.animationDuration / 2}ms ${
      K.animationDuration / 2
    }ms ease-in;
        transform: translate3d(0, 0, 0);
      }
    `;
  }
  show() {
    this.visible ||
      ((this.visible = !0),
      this.installProgressElement(),
      this.startTrickling());
  }
  hide() {
    this.visible &&
      !this.hiding &&
      ((this.hiding = !0),
      this.fadeProgressElement(() => {
        this.uninstallProgressElement(),
          this.stopTrickling(),
          (this.visible = !1),
          (this.hiding = !1);
      }));
  }
  setValue(e) {
    (this.value = e), this.refresh();
  }
  installStylesheetElement() {
    document.head.insertBefore(
      this.stylesheetElement,
      document.head.firstChild
    );
  }
  installProgressElement() {
    (this.progressElement.style.width = "0"),
      (this.progressElement.style.opacity = "1"),
      document.documentElement.insertBefore(
        this.progressElement,
        document.body
      ),
      this.refresh();
  }
  fadeProgressElement(e) {
    (this.progressElement.style.opacity = "0"),
      setTimeout(e, 1.5 * K.animationDuration);
  }
  uninstallProgressElement() {
    this.progressElement.parentNode &&
      document.documentElement.removeChild(this.progressElement);
  }
  startTrickling() {
    this.trickleInterval ||
      (this.trickleInterval = window.setInterval(
        this.trickle,
        K.animationDuration
      ));
  }
  stopTrickling() {
    window.clearInterval(this.trickleInterval), delete this.trickleInterval;
  }
  refresh() {
    requestAnimationFrame(() => {
      this.progressElement.style.width = 10 + 90 * this.value + "%";
    });
  }
  createStylesheetElement() {
    const e = document.createElement("style");
    return (
      (e.type = "text/css"),
      (e.textContent = K.defaultCSS),
      this.cspNonce && (e.nonce = this.cspNonce),
      e
    );
  }
  createProgressElement() {
    const e = document.createElement("div");
    return (e.className = "turbo-progress-bar"), e;
  }
  get cspNonce() {
    return M("csp-nonce");
  }
}
K.animationDuration = 300;
class Q extends N {
  constructor() {
    super(...arguments),
      (this.detailsByOuterHTML = this.children
        .filter(
          (e) =>
            !(function (e) {
              return "noscript" == e.localName;
            })(e)
        )
        .map((e) =>
          (function (e) {
            e.hasAttribute("nonce") && e.setAttribute("nonce", "");
            return e;
          })(e)
        )
        .reduce((e, t) => {
          const { outerHTML: s } = t,
            i = s in e ? e[s] : { type: X(t), tracked: Y(t), elements: [] };
          return Object.assign(Object.assign({}, e), {
            [s]: Object.assign(Object.assign({}, i), {
              elements: [...i.elements, t],
            }),
          });
        }, {}));
  }
  get trackedElementSignature() {
    return Object.keys(this.detailsByOuterHTML)
      .filter((e) => this.detailsByOuterHTML[e].tracked)
      .join("");
  }
  getScriptElementsNotInSnapshot(e) {
    return this.getElementsMatchingTypeNotInSnapshot("script", e);
  }
  getStylesheetElementsNotInSnapshot(e) {
    return this.getElementsMatchingTypeNotInSnapshot("stylesheet", e);
  }
  getElementsMatchingTypeNotInSnapshot(e, t) {
    return Object.keys(this.detailsByOuterHTML)
      .filter((e) => !(e in t.detailsByOuterHTML))
      .map((e) => this.detailsByOuterHTML[e])
      .filter(({ type: t }) => t == e)
      .map(({ elements: [e] }) => e);
  }
  get provisionalElements() {
    return Object.keys(this.detailsByOuterHTML).reduce((e, t) => {
      const { type: s, tracked: i, elements: r } = this.detailsByOuterHTML[t];
      return null != s || i
        ? r.length > 1
          ? [...e, ...r.slice(1)]
          : e
        : [...e, ...r];
    }, []);
  }
  getMetaValue(e) {
    const t = this.findMetaElementByName(e);
    return t ? t.getAttribute("content") : null;
  }
  findMetaElementByName(e) {
    return Object.keys(this.detailsByOuterHTML).reduce((t, s) => {
      const {
        elements: [i],
      } = this.detailsByOuterHTML[s];
      return (function (e, t) {
        return "meta" == e.localName && e.getAttribute("name") == t;
      })(i, e)
        ? i
        : t;
    }, void 0);
  }
}
function X(e) {
  return (function (e) {
    return "script" == e.localName;
  })(e)
    ? "script"
    : (function (e) {
        const t = e.localName;
        return (
          "style" == t || ("link" == t && "stylesheet" == e.getAttribute("rel"))
        );
      })(e)
    ? "stylesheet"
    : void 0;
}
function Y(e) {
  return "reload" == e.getAttribute("data-turbo-track");
}
class Z extends N {
  constructor(e, t) {
    super(e), (this.headSnapshot = t);
  }
  static fromHTMLString(e = "") {
    return this.fromDocument(E(e));
  }
  static fromElement(e) {
    return this.fromDocument(e.ownerDocument);
  }
  static fromDocument({ head: e, body: t }) {
    return new this(t, new Q(e));
  }
  clone() {
    const e = this.element.cloneNode(!0),
      t = this.element.querySelectorAll("select"),
      s = e.querySelectorAll("select");
    for (const [e, i] of t.entries()) {
      const t = s[e];
      for (const e of t.selectedOptions) e.selected = !1;
      for (const e of i.selectedOptions) t.options[e.index].selected = !0;
    }
    for (const t of e.querySelectorAll('input[type="password"]')) t.value = "";
    return new Z(e, this.headSnapshot);
  }
  get headElement() {
    return this.headSnapshot.element;
  }
  get rootLocation() {
    var e;
    return l(null !== (e = this.getSetting("root")) && void 0 !== e ? e : "/");
  }
  get cacheControlValue() {
    return this.getSetting("cache-control");
  }
  get isPreviewable() {
    return "no-preview" != this.cacheControlValue;
  }
  get isCacheable() {
    return "no-cache" != this.cacheControlValue;
  }
  get isVisitable() {
    return "reload" != this.getSetting("visit-control");
  }
  getSetting(e) {
    return this.headSnapshot.getMetaValue(`turbo-${e}`);
  }
}
!(function (e) {
  (e.visitStart = "visitStart"),
    (e.requestStart = "requestStart"),
    (e.requestEnd = "requestEnd"),
    (e.visitEnd = "visitEnd");
})(o || (o = {})),
  (function (e) {
    (e.initialized = "initialized"),
      (e.started = "started"),
      (e.canceled = "canceled"),
      (e.failed = "failed"),
      (e.completed = "completed");
  })(a || (a = {}));
const ee = {
  action: "advance",
  historyChanged: !1,
  visitCachedSnapshot: () => {},
  willRender: !0,
  updateHistory: !0,
  shouldCacheSnapshot: !0,
  acceptsStreamResponse: !1,
};
var te, se;
!(function (e) {
  (e[(e.networkFailure = 0)] = "networkFailure"),
    (e[(e.timeoutFailure = -1)] = "timeoutFailure"),
    (e[(e.contentTypeMismatch = -2)] = "contentTypeMismatch");
})(te || (te = {}));
class ie {
  constructor(e, t, s, i = {}) {
    (this.identifier = L()),
      (this.timingMetrics = {}),
      (this.followedRedirect = !1),
      (this.historyChanged = !1),
      (this.scrolled = !1),
      (this.shouldCacheSnapshot = !0),
      (this.acceptsStreamResponse = !1),
      (this.snapshotCached = !1),
      (this.state = a.initialized),
      (this.delegate = e),
      (this.location = t),
      (this.restorationIdentifier = s || L());
    const {
      action: r,
      historyChanged: n,
      referrer: o,
      snapshot: c,
      snapshotHTML: l,
      response: h,
      visitCachedSnapshot: d,
      willRender: u,
      updateHistory: m,
      shouldCacheSnapshot: p,
      acceptsStreamResponse: g,
    } = Object.assign(Object.assign({}, ee), i);
    (this.action = r),
      (this.historyChanged = n),
      (this.referrer = o),
      (this.snapshot = c),
      (this.snapshotHTML = l),
      (this.response = h),
      (this.isSamePage = this.delegate.locationWithActionIsSamePage(
        this.location,
        this.action
      )),
      (this.visitCachedSnapshot = d),
      (this.willRender = u),
      (this.updateHistory = m),
      (this.scrolled = !u),
      (this.shouldCacheSnapshot = p),
      (this.acceptsStreamResponse = g);
  }
  get adapter() {
    return this.delegate.adapter;
  }
  get view() {
    return this.delegate.view;
  }
  get history() {
    return this.delegate.history;
  }
  get restorationData() {
    return this.history.getRestorationDataForIdentifier(
      this.restorationIdentifier
    );
  }
  get silent() {
    return this.isSamePage;
  }
  start() {
    this.state == a.initialized &&
      (this.recordTimingMetric(o.visitStart),
      (this.state = a.started),
      this.adapter.visitStarted(this),
      this.delegate.visitStarted(this));
  }
  cancel() {
    this.state == a.started &&
      (this.request && this.request.cancel(),
      this.cancelRender(),
      (this.state = a.canceled));
  }
  complete() {
    this.state == a.started &&
      (this.recordTimingMetric(o.visitEnd),
      (this.state = a.completed),
      this.followRedirect(),
      this.followedRedirect ||
        (this.adapter.visitCompleted(this),
        this.delegate.visitCompleted(this)));
  }
  fail() {
    this.state == a.started &&
      ((this.state = a.failed), this.adapter.visitFailed(this));
  }
  changeHistory() {
    var e;
    if (!this.historyChanged && this.updateHistory) {
      const t = P(
        this.location.href ===
          (null === (e = this.referrer) || void 0 === e ? void 0 : e.href)
          ? "replace"
          : this.action
      );
      this.history.update(t, this.location, this.restorationIdentifier),
        (this.historyChanged = !0);
    }
  }
  issueRequest() {
    this.hasPreloadedResponse()
      ? this.simulateRequest()
      : this.shouldIssueRequest() &&
        !this.request &&
        ((this.request = new H(this, i.get, this.location)),
        this.request.perform());
  }
  simulateRequest() {
    this.response &&
      (this.startRequest(), this.recordResponse(), this.finishRequest());
  }
  startRequest() {
    this.recordTimingMetric(o.requestStart),
      this.adapter.visitRequestStarted(this);
  }
  recordResponse(e = this.response) {
    if (((this.response = e), e)) {
      const { statusCode: t } = e;
      re(t)
        ? this.adapter.visitRequestCompleted(this)
        : this.adapter.visitRequestFailedWithStatusCode(this, t);
    }
  }
  finishRequest() {
    this.recordTimingMetric(o.requestEnd),
      this.adapter.visitRequestFinished(this);
  }
  loadResponse() {
    if (this.response) {
      const { statusCode: e, responseHTML: t } = this.response;
      this.render(async () => {
        this.shouldCacheSnapshot && this.cacheSnapshot(),
          this.view.renderPromise && (await this.view.renderPromise),
          re(e) && null != t
            ? (await this.view.renderPage(
                Z.fromHTMLString(t),
                !1,
                this.willRender,
                this
              ),
              this.performScroll(),
              this.adapter.visitRendered(this),
              this.complete())
            : (await this.view.renderError(Z.fromHTMLString(t), this),
              this.adapter.visitRendered(this),
              this.fail());
      });
    }
  }
  getCachedSnapshot() {
    const e =
      this.view.getCachedSnapshotForLocation(this.location) ||
      this.getPreloadedSnapshot();
    if (
      e &&
      (!h(this.location) || e.hasAnchor(h(this.location))) &&
      ("restore" == this.action || e.isPreviewable)
    )
      return e;
  }
  getPreloadedSnapshot() {
    if (this.snapshotHTML) return Z.fromHTMLString(this.snapshotHTML);
  }
  hasCachedSnapshot() {
    return null != this.getCachedSnapshot();
  }
  loadCachedSnapshot() {
    const e = this.getCachedSnapshot();
    if (e) {
      const t = this.shouldIssueRequest();
      this.render(async () => {
        this.cacheSnapshot(),
          this.isSamePage
            ? this.adapter.visitRendered(this)
            : (this.view.renderPromise && (await this.view.renderPromise),
              await this.view.renderPage(e, t, this.willRender, this),
              this.performScroll(),
              this.adapter.visitRendered(this),
              t || this.complete());
      });
    }
  }
  followRedirect() {
    var e;
    this.redirectedToLocation &&
      !this.followedRedirect &&
      (null === (e = this.response) || void 0 === e ? void 0 : e.redirected) &&
      (this.adapter.visitProposedToLocation(this.redirectedToLocation, {
        action: "replace",
        response: this.response,
        shouldCacheSnapshot: !1,
        willRender: !1,
      }),
      (this.followedRedirect = !0));
  }
  goToSamePageAnchor() {
    this.isSamePage &&
      this.render(async () => {
        this.cacheSnapshot(),
          this.performScroll(),
          this.changeHistory(),
          this.adapter.visitRendered(this);
      });
  }
  prepareRequest(e) {
    this.acceptsStreamResponse && e.acceptResponseType(O.contentType);
  }
  requestStarted() {
    this.startRequest();
  }
  requestPreventedHandlingResponse(e, t) {}
  async requestSucceededWithResponse(e, t) {
    const s = await t.responseHTML,
      { redirected: i, statusCode: r } = t;
    null == s
      ? this.recordResponse({
          statusCode: te.contentTypeMismatch,
          redirected: i,
        })
      : ((this.redirectedToLocation = t.redirected ? t.location : void 0),
        this.recordResponse({ statusCode: r, responseHTML: s, redirected: i }));
  }
  async requestFailedWithResponse(e, t) {
    const s = await t.responseHTML,
      { redirected: i, statusCode: r } = t;
    null == s
      ? this.recordResponse({
          statusCode: te.contentTypeMismatch,
          redirected: i,
        })
      : this.recordResponse({ statusCode: r, responseHTML: s, redirected: i });
  }
  requestErrored(e, t) {
    this.recordResponse({ statusCode: te.networkFailure, redirected: !1 });
  }
  requestFinished() {
    this.finishRequest();
  }
  performScroll() {
    this.scrolled ||
      this.view.forceReloaded ||
      ("restore" == this.action
        ? this.scrollToRestoredPosition() ||
          this.scrollToAnchor() ||
          this.view.scrollToTop()
        : this.scrollToAnchor() || this.view.scrollToTop(),
      this.isSamePage &&
        this.delegate.visitScrolledToSamePageLocation(
          this.view.lastRenderedLocation,
          this.location
        ),
      (this.scrolled = !0));
  }
  scrollToRestoredPosition() {
    const { scrollPosition: e } = this.restorationData;
    if (e) return this.view.scrollToPosition(e), !0;
  }
  scrollToAnchor() {
    const e = h(this.location);
    if (null != e) return this.view.scrollToAnchor(e), !0;
  }
  recordTimingMetric(e) {
    this.timingMetrics[e] = new Date().getTime();
  }
  getTimingMetrics() {
    return Object.assign({}, this.timingMetrics);
  }
  getHistoryMethodForAction(e) {
    switch (e) {
      case "replace":
        return history.replaceState;
      case "advance":
      case "restore":
        return history.pushState;
    }
  }
  hasPreloadedResponse() {
    return "object" == typeof this.response;
  }
  shouldIssueRequest() {
    return (
      !this.isSamePage &&
      ("restore" == this.action ? !this.hasCachedSnapshot() : this.willRender)
    );
  }
  cacheSnapshot() {
    this.snapshotCached ||
      (this.view
        .cacheSnapshot(this.snapshot)
        .then((e) => e && this.visitCachedSnapshot(e)),
      (this.snapshotCached = !0));
  }
  async render(e) {
    this.cancelRender(),
      await new Promise((e) => {
        this.frame = requestAnimationFrame(() => e());
      }),
      await e(),
      delete this.frame;
  }
  cancelRender() {
    this.frame && (cancelAnimationFrame(this.frame), delete this.frame);
  }
}
function re(e) {
  return e >= 200 && e < 300;
}
class ne {
  constructor(e) {
    (this.progressBar = new K()),
      (this.showProgressBar = () => {
        this.progressBar.show();
      }),
      (this.session = e);
  }
  visitProposedToLocation(e, t) {
    this.navigator.startVisit(
      e,
      (null == t ? void 0 : t.restorationIdentifier) || L(),
      t
    );
  }
  visitStarted(e) {
    (this.location = e.location),
      e.loadCachedSnapshot(),
      e.issueRequest(),
      e.goToSamePageAnchor();
  }
  visitRequestStarted(e) {
    this.progressBar.setValue(0),
      e.hasCachedSnapshot() || "restore" != e.action
        ? this.showVisitProgressBarAfterDelay()
        : this.showProgressBar();
  }
  visitRequestCompleted(e) {
    e.loadResponse();
  }
  visitRequestFailedWithStatusCode(e, t) {
    switch (t) {
      case te.networkFailure:
      case te.timeoutFailure:
      case te.contentTypeMismatch:
        return this.reload({
          reason: "request_failed",
          context: { statusCode: t },
        });
      default:
        return e.loadResponse();
    }
  }
  visitRequestFinished(e) {
    this.progressBar.setValue(1), this.hideVisitProgressBar();
  }
  visitCompleted(e) {}
  pageInvalidated(e) {
    this.reload(e);
  }
  visitFailed(e) {}
  visitRendered(e) {}
  formSubmissionStarted(e) {
    this.progressBar.setValue(0), this.showFormProgressBarAfterDelay();
  }
  formSubmissionFinished(e) {
    this.progressBar.setValue(1), this.hideFormProgressBar();
  }
  showVisitProgressBarAfterDelay() {
    this.visitProgressBarTimeout = window.setTimeout(
      this.showProgressBar,
      this.session.progressBarDelay
    );
  }
  hideVisitProgressBar() {
    this.progressBar.hide(),
      null != this.visitProgressBarTimeout &&
        (window.clearTimeout(this.visitProgressBarTimeout),
        delete this.visitProgressBarTimeout);
  }
  showFormProgressBarAfterDelay() {
    null == this.formProgressBarTimeout &&
      (this.formProgressBarTimeout = window.setTimeout(
        this.showProgressBar,
        this.session.progressBarDelay
      ));
  }
  hideFormProgressBar() {
    this.progressBar.hide(),
      null != this.formProgressBarTimeout &&
        (window.clearTimeout(this.formProgressBarTimeout),
        delete this.formProgressBarTimeout);
  }
  reload(e) {
    var t;
    S("turbo:reload", { detail: e }),
      (window.location.href =
        (null === (t = this.location) || void 0 === t
          ? void 0
          : t.toString()) || window.location.href);
  }
  get navigator() {
    return this.session.navigator;
  }
}
class oe {
  constructor() {
    (this.started = !1),
      (this.removeStaleElements = (e) => {
        const t = [...document.querySelectorAll('[data-turbo-cache="false"]')];
        for (const e of t) e.remove();
      });
  }
  start() {
    this.started ||
      ((this.started = !0),
      addEventListener("turbo:before-cache", this.removeStaleElements, !1));
  }
  stop() {
    this.started &&
      ((this.started = !1),
      removeEventListener("turbo:before-cache", this.removeStaleElements, !1));
  }
}
class ae {
  constructor(e, t) {
    (this.session = e),
      (this.element = t),
      (this.linkInterceptor = new U(this, t)),
      (this.formSubmitObserver = new W(this, t));
  }
  start() {
    this.linkInterceptor.start(), this.formSubmitObserver.start();
  }
  stop() {
    this.linkInterceptor.stop(), this.formSubmitObserver.stop();
  }
  shouldInterceptLinkClick(e, t, s) {
    return this.shouldRedirect(e);
  }
  linkClickIntercepted(e, t, s) {
    const i = this.findFrameElement(e);
    i && i.delegate.linkClickIntercepted(e, t, s);
  }
  willSubmitForm(e, t) {
    return (
      null == e.closest("turbo-frame") &&
      this.shouldSubmit(e, t) &&
      this.shouldRedirect(e, t)
    );
  }
  formSubmitted(e, t) {
    const s = this.findFrameElement(e, t);
    s && s.delegate.formSubmitted(e, t);
  }
  shouldSubmit(e, t) {
    var s;
    const i = d(e, t),
      r = this.element.ownerDocument.querySelector('meta[name="turbo-root"]'),
      n = l(
        null !== (s = null == r ? void 0 : r.content) && void 0 !== s ? s : "/"
      );
    return this.shouldRedirect(e, t) && p(i, n);
  }
  shouldRedirect(e, t) {
    if (
      e instanceof HTMLFormElement
        ? this.session.submissionIsNavigatable(e, t)
        : this.session.elementIsNavigatable(e)
    ) {
      const s = this.findFrameElement(e, t);
      return !!s && s != e.closest("turbo-frame");
    }
    return !1;
  }
  findFrameElement(e, t) {
    const s =
      (null == t ? void 0 : t.getAttribute("data-turbo-frame")) ||
      e.getAttribute("data-turbo-frame");
    if (s && "_top" != s) {
      const e = this.element.querySelector(`#${s}:not([disabled])`);
      if (e instanceof c) return e;
    }
  }
}
class ce {
  constructor(e) {
    (this.restorationIdentifier = L()),
      (this.restorationData = {}),
      (this.started = !1),
      (this.pageLoaded = !1),
      (this.onPopState = (e) => {
        if (this.shouldHandlePopState()) {
          const { turbo: t } = e.state || {};
          if (t) {
            this.location = new URL(window.location.href);
            const { restorationIdentifier: e } = t;
            (this.restorationIdentifier = e),
              this.delegate.historyPoppedToLocationWithRestorationIdentifier(
                this.location,
                e
              );
          }
        }
      }),
      (this.onPageLoad = async (e) => {
        await Promise.resolve(), (this.pageLoaded = !0);
      }),
      (this.delegate = e);
  }
  start() {
    this.started ||
      (addEventListener("popstate", this.onPopState, !1),
      addEventListener("load", this.onPageLoad, !1),
      (this.started = !0),
      this.replace(new URL(window.location.href)));
  }
  stop() {
    this.started &&
      (removeEventListener("popstate", this.onPopState, !1),
      removeEventListener("load", this.onPageLoad, !1),
      (this.started = !1));
  }
  push(e, t) {
    this.update(history.pushState, e, t);
  }
  replace(e, t) {
    this.update(history.replaceState, e, t);
  }
  update(e, t, s = L()) {
    const i = { turbo: { restorationIdentifier: s } };
    e.call(history, i, "", t.href),
      (this.location = t),
      (this.restorationIdentifier = s);
  }
  getRestorationDataForIdentifier(e) {
    return this.restorationData[e] || {};
  }
  updateRestorationData(e) {
    const { restorationIdentifier: t } = this,
      s = this.restorationData[t];
    this.restorationData[t] = Object.assign(Object.assign({}, s), e);
  }
  assumeControlOfScrollRestoration() {
    var e;
    this.previousScrollRestoration ||
      ((this.previousScrollRestoration =
        null !== (e = history.scrollRestoration) && void 0 !== e ? e : "auto"),
      (history.scrollRestoration = "manual"));
  }
  relinquishControlOfScrollRestoration() {
    this.previousScrollRestoration &&
      ((history.scrollRestoration = this.previousScrollRestoration),
      delete this.previousScrollRestoration);
  }
  shouldHandlePopState() {
    return this.pageIsLoaded();
  }
  pageIsLoaded() {
    return this.pageLoaded || "complete" == document.readyState;
  }
}
class le {
  constructor(e) {
    this.delegate = e;
  }
  proposeVisit(e, t = {}) {
    this.delegate.allowsVisitingLocationWithAction(e, t.action) &&
      (p(e, this.view.snapshot.rootLocation)
        ? this.delegate.visitProposedToLocation(e, t)
        : (window.location.href = e.toString()));
  }
  startVisit(e, t, s = {}) {
    this.stop(),
      (this.currentVisit = new ie(
        this,
        l(e),
        t,
        Object.assign({ referrer: this.location }, s)
      )),
      this.currentVisit.start();
  }
  submitForm(e, t) {
    this.stop(),
      (this.formSubmission = new B(this, e, t, !0)),
      this.formSubmission.start();
  }
  stop() {
    this.formSubmission &&
      (this.formSubmission.stop(), delete this.formSubmission),
      this.currentVisit &&
        (this.currentVisit.cancel(), delete this.currentVisit);
  }
  get adapter() {
    return this.delegate.adapter;
  }
  get view() {
    return this.delegate.view;
  }
  get history() {
    return this.delegate.history;
  }
  formSubmissionStarted(e) {
    "function" == typeof this.adapter.formSubmissionStarted &&
      this.adapter.formSubmissionStarted(e);
  }
  async formSubmissionSucceededWithResponse(e, t) {
    if (e == this.formSubmission) {
      const s = await t.responseHTML;
      if (s) {
        const r = e.method == i.get;
        r || this.view.clearSnapshotCache();
        const { statusCode: n, redirected: o } = t,
          a = {
            action: this.getActionForFormSubmission(e),
            shouldCacheSnapshot: r,
            response: { statusCode: n, responseHTML: s, redirected: o },
          };
        this.proposeVisit(t.location, a);
      }
    }
  }
  async formSubmissionFailedWithResponse(e, t) {
    const s = await t.responseHTML;
    if (s) {
      const e = Z.fromHTMLString(s);
      t.serverError
        ? await this.view.renderError(e, this.currentVisit)
        : await this.view.renderPage(e, !1, !0, this.currentVisit),
        this.view.scrollToTop(),
        this.view.clearSnapshotCache();
    }
  }
  formSubmissionErrored(e, t) {
    console.error(t);
  }
  formSubmissionFinished(e) {
    "function" == typeof this.adapter.formSubmissionFinished &&
      this.adapter.formSubmissionFinished(e);
  }
  visitStarted(e) {
    this.delegate.visitStarted(e);
  }
  visitCompleted(e) {
    this.delegate.visitCompleted(e);
  }
  locationWithActionIsSamePage(e, t) {
    const s = h(e),
      i = h(this.view.lastRenderedLocation),
      r = "restore" === t && void 0 === s;
    return (
      "replace" !== t &&
      g(e) === g(this.view.lastRenderedLocation) &&
      (r || (null != s && s !== i))
    );
  }
  visitScrolledToSamePageLocation(e, t) {
    this.delegate.visitScrolledToSamePageLocation(e, t);
  }
  get location() {
    return this.history.location;
  }
  get restorationIdentifier() {
    return this.history.restorationIdentifier;
  }
  getActionForFormSubmission({ submitter: e, formElement: t }) {
    return k(e, t) || "advance";
  }
}
!(function (e) {
  (e[(e.initial = 0)] = "initial"),
    (e[(e.loading = 1)] = "loading"),
    (e[(e.interactive = 2)] = "interactive"),
    (e[(e.complete = 3)] = "complete");
})(se || (se = {}));
class he {
  constructor(e) {
    (this.stage = se.initial),
      (this.started = !1),
      (this.interpretReadyState = () => {
        const { readyState: e } = this;
        "interactive" == e
          ? this.pageIsInteractive()
          : "complete" == e && this.pageIsComplete();
      }),
      (this.pageWillUnload = () => {
        this.delegate.pageWillUnload();
      }),
      (this.delegate = e);
  }
  start() {
    this.started ||
      (this.stage == se.initial && (this.stage = se.loading),
      document.addEventListener(
        "readystatechange",
        this.interpretReadyState,
        !1
      ),
      addEventListener("pagehide", this.pageWillUnload, !1),
      (this.started = !0));
  }
  stop() {
    this.started &&
      (document.removeEventListener(
        "readystatechange",
        this.interpretReadyState,
        !1
      ),
      removeEventListener("pagehide", this.pageWillUnload, !1),
      (this.started = !1));
  }
  pageIsInteractive() {
    this.stage == se.loading &&
      ((this.stage = se.interactive), this.delegate.pageBecameInteractive());
  }
  pageIsComplete() {
    this.pageIsInteractive(),
      this.stage == se.interactive &&
        ((this.stage = se.complete), this.delegate.pageLoaded());
  }
  get readyState() {
    return document.readyState;
  }
}
class de {
  constructor(e) {
    (this.started = !1),
      (this.onScroll = () => {
        this.updatePosition({ x: window.pageXOffset, y: window.pageYOffset });
      }),
      (this.delegate = e);
  }
  start() {
    this.started ||
      (addEventListener("scroll", this.onScroll, !1),
      this.onScroll(),
      (this.started = !0));
  }
  stop() {
    this.started &&
      (removeEventListener("scroll", this.onScroll, !1), (this.started = !1));
  }
  updatePosition(e) {
    this.delegate.scrollPositionChanged(e);
  }
}
class ue {
  render({ fragment: e }) {
    z.preservingPermanentElements(
      this,
      (function (e) {
        const t = V(document.documentElement),
          s = {};
        for (const i of t) {
          const { id: t } = i;
          for (const r of e.querySelectorAll("turbo-stream")) {
            const e = D(r.templateElement.content, t);
            e && (s[t] = [i, e]);
          }
        }
        return s;
      })(e),
      () => document.documentElement.appendChild(e)
    );
  }
  enteringBardo(e, t) {
    t.replaceWith(e.cloneNode(!0));
  }
  leavingBardo() {}
}
class me {
  constructor(e) {
    (this.sources = new Set()),
      (this.started = !1),
      (this.inspectFetchResponse = (e) => {
        const t = (function (e) {
          var t;
          const s =
            null === (t = e.detail) || void 0 === t ? void 0 : t.fetchResponse;
          if (s instanceof b) return s;
        })(e);
        t &&
          (function (e) {
            var t;
            return (
              null !== (t = e.contentType) && void 0 !== t ? t : ""
            ).startsWith(O.contentType);
          })(t) &&
          (e.preventDefault(), this.receiveMessageResponse(t));
      }),
      (this.receiveMessageEvent = (e) => {
        this.started &&
          "string" == typeof e.data &&
          this.receiveMessageHTML(e.data);
      }),
      (this.delegate = e);
  }
  start() {
    this.started ||
      ((this.started = !0),
      addEventListener(
        "turbo:before-fetch-response",
        this.inspectFetchResponse,
        !1
      ));
  }
  stop() {
    this.started &&
      ((this.started = !1),
      removeEventListener(
        "turbo:before-fetch-response",
        this.inspectFetchResponse,
        !1
      ));
  }
  connectStreamSource(e) {
    this.streamSourceIsConnected(e) ||
      (this.sources.add(e),
      e.addEventListener("message", this.receiveMessageEvent, !1));
  }
  disconnectStreamSource(e) {
    this.streamSourceIsConnected(e) &&
      (this.sources.delete(e),
      e.removeEventListener("message", this.receiveMessageEvent, !1));
  }
  streamSourceIsConnected(e) {
    return this.sources.has(e);
  }
  async receiveMessageResponse(e) {
    const t = await e.responseHTML;
    t && this.receiveMessageHTML(t);
  }
  receiveMessageHTML(e) {
    this.delegate.receivedMessageFromStream(O.wrap(e));
  }
}
class pe extends G {
  static renderElement(e, t) {
    const { documentElement: s, body: i } = document;
    s.replaceChild(t, i);
  }
  async render() {
    this.replaceHeadAndBody(), this.activateScriptElements();
  }
  replaceHeadAndBody() {
    const { documentElement: e, head: t } = document;
    e.replaceChild(this.newHead, t),
      this.renderElement(this.currentElement, this.newElement);
  }
  activateScriptElements() {
    for (const e of this.scriptElements) {
      const t = e.parentNode;
      if (t) {
        const s = v(e);
        t.replaceChild(s, e);
      }
    }
  }
  get newHead() {
    return this.newSnapshot.headSnapshot.element;
  }
  get scriptElements() {
    return document.documentElement.querySelectorAll("script");
  }
}
class ge extends G {
  static renderElement(e, t) {
    document.body && t instanceof HTMLBodyElement
      ? document.body.replaceWith(t)
      : document.documentElement.appendChild(t);
  }
  get shouldRender() {
    return this.newSnapshot.isVisitable && this.trackedElementsAreIdentical;
  }
  get reloadReason() {
    return this.newSnapshot.isVisitable
      ? this.trackedElementsAreIdentical
        ? void 0
        : { reason: "tracked_element_mismatch" }
      : { reason: "turbo_visit_control_is_reload" };
  }
  async prepareToRender() {
    await this.mergeHead();
  }
  async render() {
    this.willRender && (await this.replaceBody());
  }
  finishRendering() {
    super.finishRendering(),
      this.isPreview || this.focusFirstAutofocusableElement();
  }
  get currentHeadSnapshot() {
    return this.currentSnapshot.headSnapshot;
  }
  get newHeadSnapshot() {
    return this.newSnapshot.headSnapshot;
  }
  get newElement() {
    return this.newSnapshot.element;
  }
  async mergeHead() {
    const e = this.mergeProvisionalElements(),
      t = this.copyNewHeadStylesheetElements();
    this.copyNewHeadScriptElements(), await e, await t;
  }
  async replaceBody() {
    await this.preservingPermanentElements(async () => {
      this.activateNewBody(), await this.assignNewBody();
    });
  }
  get trackedElementsAreIdentical() {
    return (
      this.currentHeadSnapshot.trackedElementSignature ==
      this.newHeadSnapshot.trackedElementSignature
    );
  }
  async copyNewHeadStylesheetElements() {
    const e = [];
    for (const t of this.newHeadStylesheetElements)
      e.push(T(t)), document.head.appendChild(t);
    await Promise.all(e);
  }
  copyNewHeadScriptElements() {
    for (const e of this.newHeadScriptElements) document.head.appendChild(v(e));
  }
  async mergeProvisionalElements() {
    const e = [...this.newHeadProvisionalElements];
    for (const t of this.currentHeadProvisionalElements)
      this.isCurrentElementInElementList(t, e) || document.head.removeChild(t);
    for (const t of e) document.head.appendChild(t);
  }
  isCurrentElementInElementList(e, t) {
    for (const [s, i] of t.entries()) {
      if ("TITLE" == e.tagName) {
        if ("TITLE" != i.tagName) continue;
        if (e.innerHTML == i.innerHTML) return t.splice(s, 1), !0;
      }
      if (i.isEqualNode(e)) return t.splice(s, 1), !0;
    }
    return !1;
  }
  removeCurrentHeadProvisionalElements() {
    for (const e of this.currentHeadProvisionalElements)
      document.head.removeChild(e);
  }
  copyNewHeadProvisionalElements() {
    for (const e of this.newHeadProvisionalElements)
      document.head.appendChild(e);
  }
  activateNewBody() {
    document.adoptNode(this.newElement), this.activateNewBodyScriptElements();
  }
  activateNewBodyScriptElements() {
    for (const e of this.newBodyScriptElements) {
      const t = v(e);
      e.replaceWith(t);
    }
  }
  async assignNewBody() {
    await this.renderElement(this.currentElement, this.newElement);
  }
  get newHeadStylesheetElements() {
    return this.newHeadSnapshot.getStylesheetElementsNotInSnapshot(
      this.currentHeadSnapshot
    );
  }
  get newHeadScriptElements() {
    return this.newHeadSnapshot.getScriptElementsNotInSnapshot(
      this.currentHeadSnapshot
    );
  }
  get currentHeadProvisionalElements() {
    return this.currentHeadSnapshot.provisionalElements;
  }
  get newHeadProvisionalElements() {
    return this.newHeadSnapshot.provisionalElements;
  }
  get newBodyScriptElements() {
    return this.newElement.querySelectorAll("script");
  }
}
class fe {
  constructor(e) {
    (this.keys = []), (this.snapshots = {}), (this.size = e);
  }
  has(e) {
    return f(e) in this.snapshots;
  }
  get(e) {
    if (this.has(e)) {
      const t = this.read(e);
      return this.touch(e), t;
    }
  }
  put(e, t) {
    return this.write(e, t), this.touch(e), t;
  }
  clear() {
    this.snapshots = {};
  }
  read(e) {
    return this.snapshots[f(e)];
  }
  write(e, t) {
    this.snapshots[f(e)] = t;
  }
  touch(e) {
    const t = f(e),
      s = this.keys.indexOf(t);
    s > -1 && this.keys.splice(s, 1), this.keys.unshift(t), this.trim();
  }
  trim() {
    for (const e of this.keys.splice(this.size)) delete this.snapshots[e];
  }
}
class be extends x {
  constructor() {
    super(...arguments),
      (this.snapshotCache = new fe(10)),
      (this.lastRenderedLocation = new URL(location.href)),
      (this.forceReloaded = !1);
  }
  renderPage(e, t = !1, s = !0, i) {
    const r = new ge(this.snapshot, e, ge.renderElement, t, s);
    return (
      r.shouldRender
        ? null == i || i.changeHistory()
        : (this.forceReloaded = !0),
      this.render(r)
    );
  }
  renderError(e, t) {
    null == t || t.changeHistory();
    const s = new pe(this.snapshot, e, pe.renderElement, !1);
    return this.render(s);
  }
  clearSnapshotCache() {
    this.snapshotCache.clear();
  }
  async cacheSnapshot(e = this.snapshot) {
    if (e.isCacheable) {
      this.delegate.viewWillCacheSnapshot();
      const { lastRenderedLocation: t } = this;
      await new Promise((e) => setTimeout(() => e(), 0));
      const s = e.clone();
      return this.snapshotCache.put(t, s), s;
    }
  }
  getCachedSnapshotForLocation(e) {
    return this.snapshotCache.get(e);
  }
  get snapshot() {
    return Z.fromElement(this.element);
  }
}
class ve {
  constructor(e) {
    (this.selector = "a[data-turbo-preload]"), (this.delegate = e);
  }
  get snapshotCache() {
    return this.delegate.navigator.view.snapshotCache;
  }
  start() {
    if ("loading" === document.readyState)
      return document.addEventListener("DOMContentLoaded", () => {
        this.preloadOnLoadLinksForView(document.body);
      });
    this.preloadOnLoadLinksForView(document.body);
  }
  preloadOnLoadLinksForView(e) {
    for (const t of e.querySelectorAll(this.selector)) this.preloadURL(t);
  }
  async preloadURL(e) {
    const t = new URL(e.href);
    if (!this.snapshotCache.has(t))
      try {
        const e = await fetch(t.toString(), {
            headers: { "VND.PREFETCH": "true", Accept: "text/html" },
          }),
          s = await e.text(),
          i = Z.fromHTMLString(s);
        this.snapshotCache.put(t, i);
      } catch (e) {}
  }
}
function Se(e) {
  Object.defineProperties(e, we);
}
const we = {
  absoluteURL: {
    get() {
      return this.toString();
    },
  },
};
const Ee = {
    after() {
      this.targetElements.forEach((e) => {
        var t;
        return null === (t = e.parentElement) || void 0 === t
          ? void 0
          : t.insertBefore(this.templateContent, e.nextSibling);
      });
    },
    append() {
      this.removeDuplicateTargetChildren(),
        this.targetElements.forEach((e) => e.append(this.templateContent));
    },
    before() {
      this.targetElements.forEach((e) => {
        var t;
        return null === (t = e.parentElement) || void 0 === t
          ? void 0
          : t.insertBefore(this.templateContent, e);
      });
    },
    prepend() {
      this.removeDuplicateTargetChildren(),
        this.targetElements.forEach((e) => e.prepend(this.templateContent));
    },
    remove() {
      this.targetElements.forEach((e) => e.remove());
    },
    replace() {
      this.targetElements.forEach((e) => e.replaceWith(this.templateContent));
    },
    update() {
      this.targetElements.forEach((e) => {
        (e.innerHTML = ""), e.append(this.templateContent);
      });
    },
  },
  ye = new (class {
    constructor() {
      (this.navigator = new le(this)),
        (this.history = new ce(this)),
        (this.preloader = new ve(this)),
        (this.view = new be(this, document.documentElement)),
        (this.adapter = new ne(this)),
        (this.pageObserver = new he(this)),
        (this.cacheObserver = new oe()),
        (this.linkClickObserver = new j(this, window)),
        (this.formSubmitObserver = new W(this, document)),
        (this.scrollObserver = new de(this)),
        (this.streamObserver = new me(this)),
        (this.formLinkClickObserver = new $(this, document.documentElement)),
        (this.frameRedirector = new ae(this, document.documentElement)),
        (this.streamMessageRenderer = new ue()),
        (this.drive = !0),
        (this.enabled = !0),
        (this.progressBarDelay = 500),
        (this.started = !1),
        (this.formMode = "on");
    }
    start() {
      this.started ||
        (this.pageObserver.start(),
        this.cacheObserver.start(),
        this.formLinkClickObserver.start(),
        this.linkClickObserver.start(),
        this.formSubmitObserver.start(),
        this.scrollObserver.start(),
        this.streamObserver.start(),
        this.frameRedirector.start(),
        this.history.start(),
        this.preloader.start(),
        (this.started = !0),
        (this.enabled = !0));
    }
    disable() {
      this.enabled = !1;
    }
    stop() {
      this.started &&
        (this.pageObserver.stop(),
        this.cacheObserver.stop(),
        this.formLinkClickObserver.stop(),
        this.linkClickObserver.stop(),
        this.formSubmitObserver.stop(),
        this.scrollObserver.stop(),
        this.streamObserver.stop(),
        this.frameRedirector.stop(),
        this.history.stop(),
        (this.started = !1));
    }
    registerAdapter(e) {
      this.adapter = e;
    }
    visit(e, t = {}) {
      const s = t.frame ? document.getElementById(t.frame) : null;
      s instanceof c
        ? ((s.src = e.toString()), s.loaded)
        : this.navigator.proposeVisit(l(e), t);
    }
    connectStreamSource(e) {
      this.streamObserver.connectStreamSource(e);
    }
    disconnectStreamSource(e) {
      this.streamObserver.disconnectStreamSource(e);
    }
    renderStreamMessage(e) {
      this.streamMessageRenderer.render(O.wrap(e));
    }
    clearCache() {
      this.view.clearSnapshotCache();
    }
    setProgressBarDelay(e) {
      this.progressBarDelay = e;
    }
    setFormMode(e) {
      this.formMode = e;
    }
    get location() {
      return this.history.location;
    }
    get restorationIdentifier() {
      return this.history.restorationIdentifier;
    }
    historyPoppedToLocationWithRestorationIdentifier(e, t) {
      this.enabled
        ? this.navigator.startVisit(e, t, {
            action: "restore",
            historyChanged: !0,
          })
        : this.adapter.pageInvalidated({ reason: "turbo_disabled" });
    }
    scrollPositionChanged(e) {
      this.history.updateRestorationData({ scrollPosition: e });
    }
    willSubmitFormLinkToLocation(e, t) {
      return this.elementIsNavigatable(e) && p(t, this.snapshot.rootLocation);
    }
    submittedFormLinkToLocation() {}
    willFollowLinkToLocation(e, t, s) {
      return (
        this.elementIsNavigatable(e) &&
        p(t, this.snapshot.rootLocation) &&
        this.applicationAllowsFollowingLinkToLocation(e, t, s)
      );
    }
    followedLinkToLocation(e, t) {
      const s = this.getActionForLink(e),
        i = e.hasAttribute("data-turbo-stream");
      this.visit(t.href, { action: s, acceptsStreamResponse: i });
    }
    allowsVisitingLocationWithAction(e, t) {
      return (
        this.locationWithActionIsSamePage(e, t) ||
        this.applicationAllowsVisitingLocation(e)
      );
    }
    visitProposedToLocation(e, t) {
      Se(e), this.adapter.visitProposedToLocation(e, t);
    }
    visitStarted(e) {
      e.acceptsStreamResponse || C(document.documentElement),
        Se(e.location),
        e.silent ||
          this.notifyApplicationAfterVisitingLocation(e.location, e.action);
    }
    visitCompleted(e) {
      A(document.documentElement),
        this.notifyApplicationAfterPageLoad(e.getTimingMetrics());
    }
    locationWithActionIsSamePage(e, t) {
      return this.navigator.locationWithActionIsSamePage(e, t);
    }
    visitScrolledToSamePageLocation(e, t) {
      this.notifyApplicationAfterVisitingSamePageLocation(e, t);
    }
    willSubmitForm(e, t) {
      const s = d(e, t);
      return (
        this.submissionIsNavigatable(e, t) &&
        p(l(s), this.snapshot.rootLocation)
      );
    }
    formSubmitted(e, t) {
      this.navigator.submitForm(e, t);
    }
    pageBecameInteractive() {
      (this.view.lastRenderedLocation = this.location),
        this.notifyApplicationAfterPageLoad();
    }
    pageLoaded() {
      this.history.assumeControlOfScrollRestoration();
    }
    pageWillUnload() {
      this.history.relinquishControlOfScrollRestoration();
    }
    receivedMessageFromStream(e) {
      this.renderStreamMessage(e);
    }
    viewWillCacheSnapshot() {
      var e;
      (null === (e = this.navigator.currentVisit) || void 0 === e
        ? void 0
        : e.silent) || this.notifyApplicationBeforeCachingSnapshot();
    }
    allowsImmediateRender({ element: e }, t) {
      const s = this.notifyApplicationBeforeRender(e, t),
        {
          defaultPrevented: i,
          detail: { render: r },
        } = s;
      return (
        this.view.renderer && r && (this.view.renderer.renderElement = r), !i
      );
    }
    viewRenderedSnapshot(e, t) {
      (this.view.lastRenderedLocation = this.history.location),
        this.notifyApplicationAfterRender();
    }
    preloadOnLoadLinksForView(e) {
      this.preloader.preloadOnLoadLinksForView(e);
    }
    viewInvalidated(e) {
      this.adapter.pageInvalidated(e);
    }
    frameLoaded(e) {
      this.notifyApplicationAfterFrameLoad(e);
    }
    frameRendered(e, t) {
      this.notifyApplicationAfterFrameRender(e, t);
    }
    applicationAllowsFollowingLinkToLocation(e, t, s) {
      return !this.notifyApplicationAfterClickingLinkToLocation(e, t, s)
        .defaultPrevented;
    }
    applicationAllowsVisitingLocation(e) {
      return !this.notifyApplicationBeforeVisitingLocation(e).defaultPrevented;
    }
    notifyApplicationAfterClickingLinkToLocation(e, t, s) {
      return S("turbo:click", {
        target: e,
        detail: { url: t.href, originalEvent: s },
        cancelable: !0,
      });
    }
    notifyApplicationBeforeVisitingLocation(e) {
      return S("turbo:before-visit", {
        detail: { url: e.href },
        cancelable: !0,
      });
    }
    notifyApplicationAfterVisitingLocation(e, t) {
      return S("turbo:visit", { detail: { url: e.href, action: t } });
    }
    notifyApplicationBeforeCachingSnapshot() {
      return S("turbo:before-cache");
    }
    notifyApplicationBeforeRender(e, t) {
      return S("turbo:before-render", {
        detail: Object.assign({ newBody: e }, t),
        cancelable: !0,
      });
    }
    notifyApplicationAfterRender() {
      return S("turbo:render");
    }
    notifyApplicationAfterPageLoad(e = {}) {
      return S("turbo:load", {
        detail: { url: this.location.href, timing: e },
      });
    }
    notifyApplicationAfterVisitingSamePageLocation(e, t) {
      dispatchEvent(
        new HashChangeEvent("hashchange", {
          oldURL: e.toString(),
          newURL: t.toString(),
        })
      );
    }
    notifyApplicationAfterFrameLoad(e) {
      return S("turbo:frame-load", { target: e });
    }
    notifyApplicationAfterFrameRender(e, t) {
      return S("turbo:frame-render", {
        detail: { fetchResponse: e },
        target: t,
        cancelable: !0,
      });
    }
    submissionIsNavigatable(e, t) {
      if ("off" == this.formMode) return !1;
      {
        const s = !t || this.elementIsNavigatable(t);
        return "optin" == this.formMode
          ? s && null != e.closest('[data-turbo="true"]')
          : s && this.elementIsNavigatable(e);
      }
    }
    elementIsNavigatable(e) {
      const t = I(e, "[data-turbo]"),
        s = I(e, "turbo-frame");
      return this.drive || s
        ? !t || "false" != t.getAttribute("data-turbo")
        : !!t && "true" == t.getAttribute("data-turbo");
    }
    getActionForLink(e) {
      return k(e) || "advance";
    }
    get snapshot() {
      return this.view.snapshot;
    }
  })(),
  Le = new (class {
    constructor(e) {
      this.session = e;
    }
    clear() {
      this.session.clearCache();
    }
    resetCacheControl() {
      this.setCacheControl("");
    }
    exemptPageFromCache() {
      this.setCacheControl("no-cache");
    }
    exemptPageFromPreview() {
      this.setCacheControl("no-preview");
    }
    setCacheControl(e) {
      !(function (e, t) {
        let s = F(e);
        s ||
          ((s = document.createElement("meta")),
          s.setAttribute("name", e),
          document.head.appendChild(s)),
          s.setAttribute("content", t);
      })("turbo-cache-control", e);
    }
  })(ye),
  { navigator: Re } = ye;
function Ce() {
  ye.start();
}
function Ae(e) {
  ye.registerAdapter(e);
}
function Te(e, t) {
  ye.visit(e, t);
}
function Pe(e) {
  ye.connectStreamSource(e);
}
function ke(e) {
  ye.disconnectStreamSource(e);
}
function Fe(e) {
  ye.renderStreamMessage(e);
}
function Me() {
  console.warn(
    "Please replace `Turbo.clearCache()` with `Turbo.cache.clear()`. The top-level function is deprecated and will be removed in a future version of Turbo.`"
  ),
    ye.clearCache();
}
function Ie(e) {
  ye.setProgressBarDelay(e);
}
function He(e) {
  B.confirmMethod = e;
}
function qe(e) {
  ye.setFormMode(e);
}
var Oe = Object.freeze({
  __proto__: null,
  navigator: Re,
  session: ye,
  cache: Le,
  PageRenderer: ge,
  PageSnapshot: Z,
  FrameRenderer: J,
  start: Ce,
  registerAdapter: Ae,
  visit: Te,
  connectStreamSource: Pe,
  disconnectStreamSource: ke,
  renderStreamMessage: Fe,
  clearCache: Me,
  setProgressBarDelay: Ie,
  setConfirmMethod: He,
  setFormMode: qe,
  StreamActions: Ee,
});
function Be(e) {
  if (null != e) {
    const t = document.getElementById(e);
    if (t instanceof c) return t;
  }
}
function Ne(e, t) {
  if (e) {
    const i = e.getAttribute("src");
    if (null != i && null != t && ((s = t), l(i).href == l(s).href))
      throw new Error(
        `Matching <turbo-frame id="${e.id}"> element has a source URL which references itself`
      );
    if (
      (e.ownerDocument !== document && (e = document.importNode(e, !0)),
      e instanceof c)
    )
      return e.connectedCallback(), e.disconnectedCallback(), e;
  }
  var s;
}
class De extends HTMLElement {
  static async renderElement(e) {
    await e.performAction();
  }
  async connectedCallback() {
    try {
      await this.render();
    } catch (e) {
      console.error(e);
    } finally {
      this.disconnect();
    }
  }
  async render() {
    var e;
    return null !== (e = this.renderPromise) && void 0 !== e
      ? e
      : (this.renderPromise = (async () => {
          const e = this.beforeRenderEvent;
          this.dispatchEvent(e) && (await w(), await e.detail.render(this));
        })());
  }
  disconnect() {
    try {
      this.remove();
    } catch (e) {}
  }
  removeDuplicateTargetChildren() {
    this.duplicateChildren.forEach((e) => e.remove());
  }
  get duplicateChildren() {
    var e;
    const t = this.targetElements
        .flatMap((e) => [...e.children])
        .filter((e) => !!e.id),
      s = [
        ...((null === (e = this.templateContent) || void 0 === e
          ? void 0
          : e.children) || []),
      ]
        .filter((e) => !!e.id)
        .map((e) => e.id);
    return t.filter((e) => s.includes(e.id));
  }
  get performAction() {
    if (this.action) {
      const e = Ee[this.action];
      if (e) return e;
      this.raise("unknown action");
    }
    this.raise("action attribute is missing");
  }
  get targetElements() {
    return this.target
      ? this.targetElementsById
      : this.targets
      ? this.targetElementsByQuery
      : void this.raise("target or targets attribute is missing");
  }
  get templateContent() {
    return this.templateElement.content.cloneNode(!0);
  }
  get templateElement() {
    if (null === this.firstElementChild) {
      const e = this.ownerDocument.createElement("template");
      return this.appendChild(e), e;
    }
    if (this.firstElementChild instanceof HTMLTemplateElement)
      return this.firstElementChild;
    this.raise("first child element must be a <template> element");
  }
  get action() {
    return this.getAttribute("action");
  }
  get target() {
    return this.getAttribute("target");
  }
  get targets() {
    return this.getAttribute("targets");
  }
  raise(e) {
    throw new Error(`${this.description}: ${e}`);
  }
  get description() {
    var e, t;
    return null !==
      (t = (
        null !== (e = this.outerHTML.match(/<[^>]+>/)) && void 0 !== e ? e : []
      )[0]) && void 0 !== t
      ? t
      : "<turbo-stream>";
  }
  get beforeRenderEvent() {
    return new CustomEvent("turbo:before-stream-render", {
      bubbles: !0,
      cancelable: !0,
      detail: { newStream: this, render: De.renderElement },
    });
  }
  get targetElementsById() {
    var e;
    const t =
      null === (e = this.ownerDocument) || void 0 === e
        ? void 0
        : e.getElementById(this.target);
    return null !== t ? [t] : [];
  }
  get targetElementsByQuery() {
    var e;
    const t =
      null === (e = this.ownerDocument) || void 0 === e
        ? void 0
        : e.querySelectorAll(this.targets);
    return 0 !== t.length ? Array.prototype.slice.call(t) : [];
  }
}
class Ve extends HTMLElement {
  constructor() {
    super(...arguments), (this.streamSource = null);
  }
  connectedCallback() {
    (this.streamSource = this.src.match(/^ws{1,2}:/)
      ? new WebSocket(this.src)
      : new EventSource(this.src)),
      Pe(this.streamSource);
  }
  disconnectedCallback() {
    this.streamSource && ke(this.streamSource);
  }
  get src() {
    return this.getAttribute("src") || "";
  }
}
(c.delegateConstructor = class {
  constructor(e) {
    (this.fetchResponseLoaded = (e) => {}),
      (this.currentFetchRequest = null),
      (this.resolveVisitPromise = () => {}),
      (this.connected = !1),
      (this.hasBeenLoaded = !1),
      (this.ignoredAttributes = new Set()),
      (this.action = null),
      (this.visitCachedSnapshot = ({ element: e }) => {
        const t = e.querySelector("#" + this.element.id);
        t &&
          this.previousFrameElement &&
          t.replaceChildren(...this.previousFrameElement.children),
          delete this.previousFrameElement;
      }),
      (this.element = e),
      (this.view = new _(this, this.element)),
      (this.appearanceObserver = new q(this, this.element)),
      (this.formLinkClickObserver = new $(this, this.element)),
      (this.linkInterceptor = new U(this, this.element)),
      (this.restorationIdentifier = L()),
      (this.formSubmitObserver = new W(this, this.element));
  }
  connect() {
    this.connected ||
      ((this.connected = !0),
      this.loadingStyle == s.lazy
        ? this.appearanceObserver.start()
        : this.loadSourceURL(),
      this.formLinkClickObserver.start(),
      this.linkInterceptor.start(),
      this.formSubmitObserver.start());
  }
  disconnect() {
    this.connected &&
      ((this.connected = !1),
      this.appearanceObserver.stop(),
      this.formLinkClickObserver.stop(),
      this.linkInterceptor.stop(),
      this.formSubmitObserver.stop());
  }
  disabledChanged() {
    this.loadingStyle == s.eager && this.loadSourceURL();
  }
  sourceURLChanged() {
    this.isIgnoringChangesTo("src") ||
      (this.element.isConnected && (this.complete = !1),
      (this.loadingStyle == s.eager || this.hasBeenLoaded) &&
        this.loadSourceURL());
  }
  sourceURLReloaded() {
    const { src: e } = this.element;
    return (
      this.ignoringChangesToAttribute("complete", () => {
        this.element.removeAttribute("complete");
      }),
      (this.element.src = null),
      (this.element.src = e),
      this.element.loaded
    );
  }
  completeChanged() {
    this.isIgnoringChangesTo("complete") || this.loadSourceURL();
  }
  loadingStyleChanged() {
    this.loadingStyle == s.lazy
      ? this.appearanceObserver.start()
      : (this.appearanceObserver.stop(), this.loadSourceURL());
  }
  async loadSourceURL() {
    this.enabled &&
      this.isActive &&
      !this.complete &&
      this.sourceURL &&
      ((this.element.loaded = this.visit(l(this.sourceURL))),
      this.appearanceObserver.stop(),
      await this.element.loaded,
      (this.hasBeenLoaded = !0));
  }
  async loadResponse(e) {
    (e.redirected || (e.succeeded && e.isHTML)) &&
      (this.sourceURL = e.response.url);
    try {
      const t = await e.responseHTML;
      if (t) {
        const { body: s } = E(t),
          i = await this.extractForeignFrameElement(s);
        if (i) {
          const t = new N(i),
            s = new J(this, this.view.snapshot, t, J.renderElement, !1, !1);
          this.view.renderPromise && (await this.view.renderPromise),
            this.changeHistory(),
            await this.view.render(s),
            (this.complete = !0),
            ye.frameRendered(e, this.element),
            ye.frameLoaded(this.element),
            this.fetchResponseLoaded(e);
        } else
          this.willHandleFrameMissingFromResponse(e) &&
            (console.warn(
              `A matching frame for #${this.element.id} was missing from the response, transforming into full-page Visit.`
            ),
            this.visitResponse(e.response));
      }
    } catch (e) {
      console.error(e), this.view.invalidate();
    } finally {
      this.fetchResponseLoaded = () => {};
    }
  }
  elementAppearedInViewport(e) {
    this.proposeVisitIfNavigatedWithAction(e, e), this.loadSourceURL();
  }
  willSubmitFormLinkToLocation(e) {
    return this.shouldInterceptNavigation(e);
  }
  submittedFormLinkToLocation(e, t, s) {
    const i = this.findFrameElement(e);
    i && s.setAttribute("data-turbo-frame", i.id);
  }
  shouldInterceptLinkClick(e, t, s) {
    return this.shouldInterceptNavigation(e);
  }
  linkClickIntercepted(e, t) {
    this.navigateFrame(e, t);
  }
  willSubmitForm(e, t) {
    return (
      e.closest("turbo-frame") == this.element &&
      this.shouldInterceptNavigation(e, t)
    );
  }
  formSubmitted(e, t) {
    this.formSubmission && this.formSubmission.stop(),
      (this.formSubmission = new B(this, e, t));
    const { fetchRequest: s } = this.formSubmission;
    this.prepareRequest(s), this.formSubmission.start();
  }
  prepareRequest(e) {
    var t;
    (e.headers["Turbo-Frame"] = this.id),
      (null === (t = this.currentNavigationElement) || void 0 === t
        ? void 0
        : t.hasAttribute("data-turbo-stream")) &&
        e.acceptResponseType(O.contentType);
  }
  requestStarted(e) {
    C(this.element);
  }
  requestPreventedHandlingResponse(e, t) {
    this.resolveVisitPromise();
  }
  async requestSucceededWithResponse(e, t) {
    await this.loadResponse(t), this.resolveVisitPromise();
  }
  async requestFailedWithResponse(e, t) {
    console.error(t), await this.loadResponse(t), this.resolveVisitPromise();
  }
  requestErrored(e, t) {
    console.error(t), this.resolveVisitPromise();
  }
  requestFinished(e) {
    A(this.element);
  }
  formSubmissionStarted({ formElement: e }) {
    C(e, this.findFrameElement(e));
  }
  formSubmissionSucceededWithResponse(e, t) {
    const s = this.findFrameElement(e.formElement, e.submitter);
    s.delegate.proposeVisitIfNavigatedWithAction(s, e.formElement, e.submitter),
      s.delegate.loadResponse(t);
  }
  formSubmissionFailedWithResponse(e, t) {
    this.element.delegate.loadResponse(t);
  }
  formSubmissionErrored(e, t) {
    console.error(t);
  }
  formSubmissionFinished({ formElement: e }) {
    A(e, this.findFrameElement(e));
  }
  allowsImmediateRender({ element: e }, t) {
    const s = S("turbo:before-frame-render", {
        target: this.element,
        detail: Object.assign({ newFrame: e }, t),
        cancelable: !0,
      }),
      {
        defaultPrevented: i,
        detail: { render: r },
      } = s;
    return (
      this.view.renderer && r && (this.view.renderer.renderElement = r), !i
    );
  }
  viewRenderedSnapshot(e, t) {}
  preloadOnLoadLinksForView(e) {
    ye.preloadOnLoadLinksForView(e);
  }
  viewInvalidated() {}
  willRenderFrame(e, t) {
    this.previousFrameElement = e.cloneNode(!0);
  }
  async visit(e) {
    var t;
    const s = new H(this, i.get, e, new URLSearchParams(), this.element);
    return (
      null === (t = this.currentFetchRequest) || void 0 === t || t.cancel(),
      (this.currentFetchRequest = s),
      new Promise((e) => {
        (this.resolveVisitPromise = () => {
          (this.resolveVisitPromise = () => {}),
            (this.currentFetchRequest = null),
            e();
        }),
          s.perform();
      })
    );
  }
  navigateFrame(e, t, s) {
    const i = this.findFrameElement(e, s);
    i.delegate.proposeVisitIfNavigatedWithAction(i, e, s),
      this.withCurrentNavigationElement(e, () => {
        i.src = t;
      });
  }
  proposeVisitIfNavigatedWithAction(e, t, s) {
    if (((this.action = k(s, t, e)), this.action)) {
      const t = Z.fromElement(e).clone(),
        { visitCachedSnapshot: s } = e.delegate;
      e.delegate.fetchResponseLoaded = (i) => {
        if (e.src) {
          const { statusCode: r, redirected: n } = i,
            o = {
              response: {
                statusCode: r,
                redirected: n,
                responseHTML: e.ownerDocument.documentElement.outerHTML,
              },
              visitCachedSnapshot: s,
              willRender: !1,
              updateHistory: !1,
              restorationIdentifier: this.restorationIdentifier,
              snapshot: t,
            };
          this.action && (o.action = this.action), ye.visit(e.src, o);
        }
      };
    }
  }
  changeHistory() {
    if (this.action) {
      const e = P(this.action);
      ye.history.update(
        e,
        l(this.element.src || ""),
        this.restorationIdentifier
      );
    }
  }
  willHandleFrameMissingFromResponse(e) {
    this.element.setAttribute("complete", "");
    const t = e.response;
    return !S("turbo:frame-missing", {
      target: this.element,
      detail: {
        response: t,
        visit: async (e, t = {}) => {
          e instanceof Response ? this.visitResponse(e) : ye.visit(e, t);
        },
      },
      cancelable: !0,
    }).defaultPrevented;
  }
  async visitResponse(e) {
    const t = new b(e),
      s = await t.responseHTML,
      { location: i, redirected: r, statusCode: n } = t;
    return ye.visit(i, {
      response: { redirected: r, statusCode: n, responseHTML: s },
    });
  }
  findFrameElement(e, t) {
    var s;
    return null !==
      (s = Be(
        R("data-turbo-frame", t, e) || this.element.getAttribute("target")
      )) && void 0 !== s
      ? s
      : this.element;
  }
  async extractForeignFrameElement(e) {
    let t;
    const s = CSS.escape(this.id);
    try {
      if (((t = Ne(e.querySelector(`turbo-frame#${s}`), this.sourceURL)), t))
        return t;
      if (
        ((t = Ne(
          e.querySelector(`turbo-frame[src][recurse~=${s}]`),
          this.sourceURL
        )),
        t)
      )
        return await t.loaded, await this.extractForeignFrameElement(t);
    } catch (e) {
      return console.error(e), new c();
    }
    return null;
  }
  formActionIsVisitable(e, t) {
    return p(l(d(e, t)), this.rootLocation);
  }
  shouldInterceptNavigation(e, t) {
    const s =
      R("data-turbo-frame", t, e) || this.element.getAttribute("target");
    if (e instanceof HTMLFormElement && !this.formActionIsVisitable(e, t))
      return !1;
    if (!this.enabled || "_top" == s) return !1;
    if (s) {
      const e = Be(s);
      if (e) return !e.disabled;
    }
    return !!ye.elementIsNavigatable(e) && !(t && !ye.elementIsNavigatable(t));
  }
  get id() {
    return this.element.id;
  }
  get enabled() {
    return !this.element.disabled;
  }
  get sourceURL() {
    if (this.element.src) return this.element.src;
  }
  set sourceURL(e) {
    this.ignoringChangesToAttribute("src", () => {
      this.element.src = null != e ? e : null;
    });
  }
  get loadingStyle() {
    return this.element.loading;
  }
  get isLoading() {
    return (
      void 0 !== this.formSubmission || void 0 !== this.resolveVisitPromise()
    );
  }
  get complete() {
    return this.element.hasAttribute("complete");
  }
  set complete(e) {
    this.ignoringChangesToAttribute("complete", () => {
      e
        ? this.element.setAttribute("complete", "")
        : this.element.removeAttribute("complete");
    });
  }
  get isActive() {
    return this.element.isActive && this.connected;
  }
  get rootLocation() {
    var e;
    const t = this.element.ownerDocument.querySelector(
      'meta[name="turbo-root"]'
    );
    return l(
      null !== (e = null == t ? void 0 : t.content) && void 0 !== e ? e : "/"
    );
  }
  isIgnoringChangesTo(e) {
    return this.ignoredAttributes.has(e);
  }
  ignoringChangesToAttribute(e, t) {
    this.ignoredAttributes.add(e), t(), this.ignoredAttributes.delete(e);
  }
  withCurrentNavigationElement(e, t) {
    (this.currentNavigationElement = e),
      t(),
      delete this.currentNavigationElement;
  }
}),
  void 0 === customElements.get("turbo-frame") &&
    customElements.define("turbo-frame", c),
  void 0 === customElements.get("turbo-stream") &&
    customElements.define("turbo-stream", De),
  void 0 === customElements.get("turbo-stream-source") &&
    customElements.define("turbo-stream-source", Ve),
  (() => {
    let e = document.currentScript;
    if (e && !e.hasAttribute("data-turbo-suppress-warning"))
      for (e = e.parentElement; e; ) {
        if (e == document.body)
          return console.warn(
            y`
        You are loading Turbo from a <script> element inside the <body> element. This is probably not what you meant to do!

        Load your applicationâ€™s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.

        For more information, see: https://turbo.hotwired.dev/handbook/building#working-with-script-elements

        â€”â€”
        Suppress this warning by adding a "data-turbo-suppress-warning" attribute to: %s
      `,
            e.outerHTML
          );
        e = e.parentElement;
      }
  })(),
  (window.Turbo = Oe),
  Ce();
var We = Object.freeze({
  __proto__: null,
  FrameElement: c,
  get FrameLoadingStyle() {
    return s;
  },
  FrameRenderer: J,
  PageRenderer: ge,
  PageSnapshot: Z,
  StreamActions: Ee,
  StreamElement: De,
  StreamSourceElement: Ve,
  cache: Le,
  clearCache: Me,
  connectStreamSource: Pe,
  disconnectStreamSource: ke,
  navigator: Re,
  registerAdapter: Ae,
  renderStreamMessage: Fe,
  session: ye,
  setConfirmMethod: He,
  setFormMode: qe,
  setProgressBarDelay: Ie,
  start: Ce,
  visit: Te,
});
let xe;
async function _e() {
  return xe || Ue(je().then(Ue));
}
function Ue(e) {
  return (xe = e);
}
async function je() {
  const { createConsumer: e } = await Promise.resolve().then(function () {
    return ut;
  });
  return e();
}
async function $e(e, t) {
  const { subscriptions: s } = await _e();
  return s.create(e, t);
}
var ze = Object.freeze({
  __proto__: null,
  getConsumer: _e,
  setConsumer: Ue,
  createConsumer: je,
  subscribeTo: $e,
});
function Ge(e) {
  return e && "object" == typeof e
    ? e instanceof Date || e instanceof RegExp
      ? e
      : Array.isArray(e)
      ? e.map(Ge)
      : Object.keys(e).reduce(function (t, s) {
          return (
            (t[
              s[0].toLowerCase() +
                s.slice(1).replace(/([A-Z]+)/g, function (e, t) {
                  return "_" + t.toLowerCase();
                })
            ] = Ge(e[s])),
            t
          );
        }, {})
    : e;
}
class Je extends HTMLElement {
  async connectedCallback() {
    Pe(this),
      (this.subscription = await $e(this.channel, {
        received: this.dispatchMessageEvent.bind(this),
      }));
  }
  disconnectedCallback() {
    ke(this), this.subscription && this.subscription.unsubscribe();
  }
  dispatchMessageEvent(e) {
    const t = new MessageEvent("message", { data: e });
    return this.dispatchEvent(t);
  }
  get channel() {
    return {
      channel: this.getAttribute("channel"),
      signed_stream_name: this.getAttribute("signed-stream-name"),
      ...Ge({ ...this.dataset }),
    };
  }
}
void 0 === customElements.get("turbo-cable-stream-source") &&
  customElements.define("turbo-cable-stream-source", Je),
  addEventListener("turbo:before-fetch-request", function (e) {
    if (e.target instanceof HTMLFormElement) {
      const {
        target: t,
        detail: { fetchOptions: s },
      } = e;
      t.addEventListener(
        "turbo:submit-start",
        ({
          detail: {
            formSubmission: { submitter: e },
          },
        }) => {
          const i = (function (e) {
              return e instanceof FormData || e instanceof URLSearchParams;
            })(s.body)
              ? s.body
              : new URLSearchParams(),
            r = (function (e, t, s) {
              const i = (function (e) {
                  return (e instanceof HTMLButtonElement ||
                    e instanceof HTMLInputElement) &&
                    e.hasAttribute("formmethod")
                    ? e.formMethod
                    : null;
                })(e),
                r = t.get("_method"),
                n = s.getAttribute("method") || "get";
              return "string" == typeof i ? i : "string" == typeof r ? r : n;
            })(e, i, t);
          /get/i.test(r) ||
            (/post/i.test(r) ? i.delete("_method") : i.set("_method", r),
            (s.method = "post"));
        },
        { once: !0 }
      );
    }
  });
var Ke = { logger: self.console, WebSocket: self.WebSocket },
  Qe = {
    log(...e) {
      this.enabled &&
        (e.push(Date.now()), Ke.logger.log("[ActionCable]", ...e));
    },
  };
const Xe = () => new Date().getTime(),
  Ye = (e) => (Xe() - e) / 1e3;
class Ze {
  constructor(e) {
    (this.visibilityDidChange = this.visibilityDidChange.bind(this)),
      (this.connection = e),
      (this.reconnectAttempts = 0);
  }
  start() {
    this.isRunning() ||
      ((this.startedAt = Xe()),
      delete this.stoppedAt,
      this.startPolling(),
      addEventListener("visibilitychange", this.visibilityDidChange),
      Qe.log(
        `ConnectionMonitor started. stale threshold = ${this.constructor.staleThreshold} s`
      ));
  }
  stop() {
    this.isRunning() &&
      ((this.stoppedAt = Xe()),
      this.stopPolling(),
      removeEventListener("visibilitychange", this.visibilityDidChange),
      Qe.log("ConnectionMonitor stopped"));
  }
  isRunning() {
    return this.startedAt && !this.stoppedAt;
  }
  recordPing() {
    this.pingedAt = Xe();
  }
  recordConnect() {
    (this.reconnectAttempts = 0),
      this.recordPing(),
      delete this.disconnectedAt,
      Qe.log("ConnectionMonitor recorded connect");
  }
  recordDisconnect() {
    (this.disconnectedAt = Xe()),
      Qe.log("ConnectionMonitor recorded disconnect");
  }
  startPolling() {
    this.stopPolling(), this.poll();
  }
  stopPolling() {
    clearTimeout(this.pollTimeout);
  }
  poll() {
    this.pollTimeout = setTimeout(() => {
      this.reconnectIfStale(), this.poll();
    }, this.getPollInterval());
  }
  getPollInterval() {
    const { staleThreshold: e, reconnectionBackoffRate: t } = this.constructor;
    return (
      1e3 *
      e *
      Math.pow(1 + t, Math.min(this.reconnectAttempts, 10)) *
      (1 + (0 === this.reconnectAttempts ? 1 : t) * Math.random())
    );
  }
  reconnectIfStale() {
    this.connectionIsStale() &&
      (Qe.log(
        `ConnectionMonitor detected stale connection. reconnectAttempts = ${
          this.reconnectAttempts
        }, time stale = ${Ye(this.refreshedAt)} s, stale threshold = ${
          this.constructor.staleThreshold
        } s`
      ),
      this.reconnectAttempts++,
      this.disconnectedRecently()
        ? Qe.log(
            `ConnectionMonitor skipping reopening recent disconnect. time disconnected = ${Ye(
              this.disconnectedAt
            )} s`
          )
        : (Qe.log("ConnectionMonitor reopening"), this.connection.reopen()));
  }
  get refreshedAt() {
    return this.pingedAt ? this.pingedAt : this.startedAt;
  }
  connectionIsStale() {
    return Ye(this.refreshedAt) > this.constructor.staleThreshold;
  }
  disconnectedRecently() {
    return (
      this.disconnectedAt &&
      Ye(this.disconnectedAt) < this.constructor.staleThreshold
    );
  }
  visibilityDidChange() {
    "visible" === document.visibilityState &&
      setTimeout(() => {
        (!this.connectionIsStale() && this.connection.isOpen()) ||
          (Qe.log(
            `ConnectionMonitor reopening stale connection on visibilitychange. visibilityState = ${document.visibilityState}`
          ),
          this.connection.reopen());
      }, 200);
  }
}
(Ze.staleThreshold = 6), (Ze.reconnectionBackoffRate = 0.15);
var et = {
  message_types: {
    welcome: "welcome",
    disconnect: "disconnect",
    ping: "ping",
    confirmation: "confirm_subscription",
    rejection: "reject_subscription",
  },
  disconnect_reasons: {
    unauthorized: "unauthorized",
    invalid_request: "invalid_request",
    server_restart: "server_restart",
  },
  default_mount_path: "/cable",
  protocols: ["actioncable-v1-json", "actioncable-unsupported"],
};
const { message_types: tt, protocols: st } = et,
  it = st.slice(0, st.length - 1),
  rt = [].indexOf;
class nt {
  constructor(e) {
    (this.open = this.open.bind(this)),
      (this.consumer = e),
      (this.subscriptions = this.consumer.subscriptions),
      (this.monitor = new Ze(this)),
      (this.disconnected = !0);
  }
  send(e) {
    return !!this.isOpen() && (this.webSocket.send(JSON.stringify(e)), !0);
  }
  open() {
    return this.isActive()
      ? (Qe.log(
          `Attempted to open WebSocket, but existing socket is ${this.getState()}`
        ),
        !1)
      : (Qe.log(
          `Opening WebSocket, current state is ${this.getState()}, subprotocols: ${st}`
        ),
        this.webSocket && this.uninstallEventHandlers(),
        (this.webSocket = new Ke.WebSocket(this.consumer.url, st)),
        this.installEventHandlers(),
        this.monitor.start(),
        !0);
  }
  close({ allowReconnect: e } = { allowReconnect: !0 }) {
    if ((e || this.monitor.stop(), this.isActive()))
      return this.webSocket.close();
  }
  reopen() {
    if (
      (Qe.log(`Reopening WebSocket, current state is ${this.getState()}`),
      !this.isActive())
    )
      return this.open();
    try {
      return this.close();
    } catch (e) {
      Qe.log("Failed to reopen WebSocket", e);
    } finally {
      Qe.log(`Reopening WebSocket in ${this.constructor.reopenDelay}ms`),
        setTimeout(this.open, this.constructor.reopenDelay);
    }
  }
  getProtocol() {
    if (this.webSocket) return this.webSocket.protocol;
  }
  isOpen() {
    return this.isState("open");
  }
  isActive() {
    return this.isState("open", "connecting");
  }
  isProtocolSupported() {
    return rt.call(it, this.getProtocol()) >= 0;
  }
  isState(...e) {
    return rt.call(e, this.getState()) >= 0;
  }
  getState() {
    if (this.webSocket)
      for (let e in Ke.WebSocket)
        if (Ke.WebSocket[e] === this.webSocket.readyState)
          return e.toLowerCase();
    return null;
  }
  installEventHandlers() {
    for (let e in this.events) {
      const t = this.events[e].bind(this);
      this.webSocket[`on${e}`] = t;
    }
  }
  uninstallEventHandlers() {
    for (let e in this.events) this.webSocket[`on${e}`] = function () {};
  }
}
(nt.reopenDelay = 500),
  (nt.prototype.events = {
    message(e) {
      if (!this.isProtocolSupported()) return;
      const {
        identifier: t,
        message: s,
        reason: i,
        reconnect: r,
        type: n,
      } = JSON.parse(e.data);
      switch (n) {
        case tt.welcome:
          return this.monitor.recordConnect(), this.subscriptions.reload();
        case tt.disconnect:
          return (
            Qe.log(`Disconnecting. Reason: ${i}`),
            this.close({ allowReconnect: r })
          );
        case tt.ping:
          return this.monitor.recordPing();
        case tt.confirmation:
          return (
            this.subscriptions.confirmSubscription(t),
            this.subscriptions.notify(t, "connected")
          );
        case tt.rejection:
          return this.subscriptions.reject(t);
        default:
          return this.subscriptions.notify(t, "received", s);
      }
    },
    open() {
      if (
        (Qe.log(
          `WebSocket onopen event, using '${this.getProtocol()}' subprotocol`
        ),
        (this.disconnected = !1),
        !this.isProtocolSupported())
      )
        return (
          Qe.log(
            "Protocol is unsupported. Stopping monitor and disconnecting."
          ),
          this.close({ allowReconnect: !1 })
        );
    },
    close(e) {
      if ((Qe.log("WebSocket onclose event"), !this.disconnected))
        return (
          (this.disconnected = !0),
          this.monitor.recordDisconnect(),
          this.subscriptions.notifyAll("disconnected", {
            willAttemptReconnect: this.monitor.isRunning(),
          })
        );
    },
    error() {
      Qe.log("WebSocket onerror event");
    },
  });
class ot {
  constructor(e, t = {}, s) {
    (this.consumer = e),
      (this.identifier = JSON.stringify(t)),
      (function (e, t) {
        if (null != t)
          for (let s in t) {
            const i = t[s];
            e[s] = i;
          }
      })(this, s);
  }
  perform(e, t = {}) {
    return (t.action = e), this.send(t);
  }
  send(e) {
    return this.consumer.send({
      command: "message",
      identifier: this.identifier,
      data: JSON.stringify(e),
    });
  }
  unsubscribe() {
    return this.consumer.subscriptions.remove(this);
  }
}
class at {
  constructor(e) {
    (this.subscriptions = e), (this.pendingSubscriptions = []);
  }
  guarantee(e) {
    -1 == this.pendingSubscriptions.indexOf(e)
      ? (Qe.log(`SubscriptionGuarantor guaranteeing ${e.identifier}`),
        this.pendingSubscriptions.push(e))
      : Qe.log(`SubscriptionGuarantor already guaranteeing ${e.identifier}`),
      this.startGuaranteeing();
  }
  forget(e) {
    Qe.log(`SubscriptionGuarantor forgetting ${e.identifier}`),
      (this.pendingSubscriptions = this.pendingSubscriptions.filter(
        (t) => t !== e
      ));
  }
  startGuaranteeing() {
    this.stopGuaranteeing(), this.retrySubscribing();
  }
  stopGuaranteeing() {
    clearTimeout(this.retryTimeout);
  }
  retrySubscribing() {
    this.retryTimeout = setTimeout(() => {
      this.subscriptions &&
        "function" == typeof this.subscriptions.subscribe &&
        this.pendingSubscriptions.map((e) => {
          Qe.log(`SubscriptionGuarantor resubscribing ${e.identifier}`),
            this.subscriptions.subscribe(e);
        });
    }, 500);
  }
}
class ct {
  constructor(e) {
    (this.consumer = e),
      (this.guarantor = new at(this)),
      (this.subscriptions = []);
  }
  create(e, t) {
    const s = "object" == typeof e ? e : { channel: e },
      i = new ot(this.consumer, s, t);
    return this.add(i);
  }
  add(e) {
    return (
      this.subscriptions.push(e),
      this.consumer.ensureActiveConnection(),
      this.notify(e, "initialized"),
      this.subscribe(e),
      e
    );
  }
  remove(e) {
    return (
      this.forget(e),
      this.findAll(e.identifier).length || this.sendCommand(e, "unsubscribe"),
      e
    );
  }
  reject(e) {
    return this.findAll(e).map(
      (e) => (this.forget(e), this.notify(e, "rejected"), e)
    );
  }
  forget(e) {
    return (
      this.guarantor.forget(e),
      (this.subscriptions = this.subscriptions.filter((t) => t !== e)),
      e
    );
  }
  findAll(e) {
    return this.subscriptions.filter((t) => t.identifier === e);
  }
  reload() {
    return this.subscriptions.map((e) => this.subscribe(e));
  }
  notifyAll(e, ...t) {
    return this.subscriptions.map((s) => this.notify(s, e, ...t));
  }
  notify(e, t, ...s) {
    let i;
    return (
      (i = "string" == typeof e ? this.findAll(e) : [e]),
      i.map((e) => ("function" == typeof e[t] ? e[t](...s) : void 0))
    );
  }
  subscribe(e) {
    this.sendCommand(e, "subscribe") && this.guarantor.guarantee(e);
  }
  confirmSubscription(e) {
    Qe.log(`Subscription confirmed ${e}`),
      this.findAll(e).map((e) => this.guarantor.forget(e));
  }
  sendCommand(e, t) {
    const { identifier: s } = e;
    return this.consumer.send({ command: t, identifier: s });
  }
}
class lt {
  constructor(e) {
    (this._url = e),
      (this.subscriptions = new ct(this)),
      (this.connection = new nt(this));
  }
  get url() {
    return ht(this._url);
  }
  send(e) {
    return this.connection.send(e);
  }
  connect() {
    return this.connection.open();
  }
  disconnect() {
    return this.connection.close({ allowReconnect: !1 });
  }
  ensureActiveConnection() {
    if (!this.connection.isActive()) return this.connection.open();
  }
}
function ht(e) {
  if (("function" == typeof e && (e = e()), e && !/^wss?:/i.test(e))) {
    const t = document.createElement("a");
    return (
      (t.href = e),
      (t.href = t.href),
      (t.protocol = t.protocol.replace("http", "ws")),
      t.href
    );
  }
  return e;
}
function dt(e) {
  const t = document.head.querySelector(`meta[name='action-cable-${e}']`);
  if (t) return t.getAttribute("content");
}
var ut = Object.freeze({
  __proto__: null,
  Connection: nt,
  ConnectionMonitor: Ze,
  Consumer: lt,
  INTERNAL: et,
  Subscription: ot,
  Subscriptions: ct,
  SubscriptionGuarantor: at,
  adapters: Ke,
  createWebSocketURL: ht,
  logger: Qe,
  createConsumer: function (e = dt("url") || et.default_mount_path) {
    return new lt(e);
  },
  getConfig: dt,
});
export { We as Turbo, ze as cable };
