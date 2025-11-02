function S(r, t) {
  let e = r;
  for (const s of t.split("."))
    e = e[s];
  return e;
}
function N(r, t, e) {
  const s = t.split("."), o = s.length - 1;
  let i = r;
  s.forEach((n, a) => {
    a === o ? i[n] = e : i = i[n];
  });
}
class p extends Error {
}
const H = /([a-zA-Z-]+)\s*:\s*([^;}]+)/g, R = "a-zA-Z_$", k = R + "0-9", d = `[${R}][${k}]*`, O = /<!--\s*(.*?)\s*-->/, F = /<(\w+)(?:\s[^>]*)?>((?:[^<]|<(?!\w))*?)<\/\1>/g, j = new RegExp(`^this\\.${d}$`), b = new RegExp(`this\\.${d}(\\.${d})*`, "g"), P = new RegExp(`this\\.${d}(\\.${d})*`), v = 5;
function I(r) {
  return r instanceof HTMLButtonElement || r instanceof HTMLFieldSetElement || r instanceof HTMLInputElement || r instanceof HTMLSelectElement || r instanceof HTMLTextAreaElement || r instanceof l;
}
function D(r, t, e) {
  const s = document.createElement(r);
  if (t)
    for (const [o, i] of Object.entries(t))
      s.setAttribute(o, i);
  return e && (s.innerHTML = e), s;
}
const B = (r) => r === String ? "" : r === Number ? 0 : r === Boolean ? !1 : r === Array ? [] : r === Object ? {} : void 0;
function A(r) {
  const t = [];
  let e = r.firstElementChild;
  for (; e; )
    t.push(e), e.shadowRoot && t.push(...A(e.shadowRoot)), e.firstElementChild && t.push(...A(e)), e = e.nextElementSibling;
  return t;
}
function C(r, t) {
  if (r.id === t) return r;
  const { shadowRoot: e } = r;
  if (e)
    for (const s of Array.from(e.children)) {
      const o = C(s, t);
      if (o) return o;
    }
  for (const s of Array.from(r.children)) {
    const o = C(s, t);
    if (o) return o;
  }
  return null;
}
const g = (r) => r.substring(v).split(".")[0];
function x(r, t) {
  let e = r[0];
  return t.forEach((s, o) => {
    e += s + r[o + 1];
  }), e;
}
function T(r) {
  const t = typeof r;
  return t === "string" || t === "number" || t === "boolean";
}
const V = (r) => r.replace(/<!--[\s\S]*?-->/g, "");
function $(r, t, e, s) {
  return r.slice(0, t) + s + r.slice(t + e);
}
function y(r) {
  const t = Number(r);
  if (isNaN(t)) throw new p(`can't convert "${r}" to a number`);
  return t;
}
function L(r, t, e) {
  if (T(e))
    if (typeof e == "boolean") {
      e ? r.setAttribute(t, t) : r.removeAttribute(t);
      const s = l.getPropName(t);
      r[s] = e;
    } else
      r.getAttribute(t) !== e && r.setAttribute(t, String(e));
  else {
    const s = l.getPropName(t);
    r[s] = e;
  }
}
function E(r, t, e) {
  r instanceof CSSRule ? r.style.setProperty(t, e) : L(r, t, e);
}
class l extends HTMLElement {
  static #p = /* @__PURE__ */ new Map();
  static #d = /* @__PURE__ */ new Map();
  static #m = /* @__PURE__ */ new Map();
  static css = "";
  static formAssociated = !1;
  static html = "";
  static properties = {};
  static propToComputedMap = null;
  static propToExprsMap = null;
  static template = null;
  #t = this.constructor;
  #s = /* @__PURE__ */ new Map();
  #c = {};
  #o;
  #b = {};
  #a = null;
  #f = /* @__PURE__ */ new Map();
  // This must be an instance property and cannot be private because
  // child components need to access the property in their parent component.
  #h = /* @__PURE__ */ new Map();
  constructor() {
    super(), this.attachShadow({ mode: "open" });
    const t = this.#t;
    t.properties || (t.properties = {}), t.propToComputedMap || (t.propToComputedMap = /* @__PURE__ */ new Map()), t.propToExprsMap || (t.propToExprsMap = /* @__PURE__ */ new Map());
  }
  attributeChangedCallback(t, e, s) {
    t === "disabled" && this.#y();
    const o = l.getPropName(t);
    if (this.#n(o)) {
      const i = this.#T(o, String(s));
      this[o] = i;
      const n = this.#c[o];
      n && this.setFormValue(n, String(i)), this.propertyChangedCallback(o, e, s);
    }
  }
  // attrName must be "value" OR undefined!
  #g(t, e, s, o) {
    t.addEventListener(o, (n) => {
      const a = n.target, { value: c } = a, { type: h } = this.#t.properties[e];
      this[e] = h === Number ? y(c) : c;
    });
    let i = this.#f.get(e);
    i || (i = [], this.#f.set(e, i)), i.push(s ? { element: t, attrName: s } : t);
  }
  #S() {
    const t = this.#t;
    let e = t.template;
    if (!e) {
      e = t.template = document.createElement("template");
      let s = t.css ? `<style>${t.css}</style>` : "";
      s += t.html, e.innerHTML = s;
    }
    this.shadowRoot?.replaceChildren(e.content.cloneNode(!0));
  }
  changed(t, e, s) {
    this[e] = s;
  }
  connectedCallback() {
    this.#I(), this.#P(), this.#S(), this.hasAttribute("disabled") && this.#y(), requestAnimationFrame(() => {
      this.shadowRoot && (this.#M(this.shadowRoot), this.#E(this.shadowRoot), l.#H()), this.#R();
    });
  }
  #R() {
    const t = this.#t, { properties: e } = t;
    for (const [s, { computed: o }] of Object.entries(e))
      o && (this[s] = this.#i(o));
  }
  static dataForId(t) {
    const e = crypto.randomUUID();
    return l.#d.set(e, t), e;
  }
  #P() {
    const t = this.#t, { observedAttributes: e, properties: s } = t;
    for (const [o, i] of Object.entries(s))
      this.#v(o, i, e);
  }
  #v(t, e, s) {
    const o = l.getAttrName(t), i = this.hasAttribute(o);
    e.required && !i && this.#e(this, t, "is a required attribute");
    const { type: n, value: a } = e, c = n === Boolean ? a || i : s.includes(o) && i ? this.#C(t, o) : a || B(n), h = "#" + t;
    this[h] = c, e.computed && this.#N(t, e), Object.defineProperty(this, t, {
      enumerable: !0,
      get() {
        return this[h];
      },
      set(f) {
        n === Number && typeof f == "string" && (f = y(f));
        const u = this[h];
        if (f === u) return;
        this.#V(t, n, f), this[h] = f;
        const { state: m, stateProp: w } = this.#t.properties[t];
        w && N(m, w, f), this.#F(t), this.#k(t, n, f, o), this.#L(t), this.#j(t, f);
        const M = this.#c[t];
        M && this.setFormValue(M, String(f)), this.propertyChangedCallback(t, u, f), e.dispatch && this.dispatch("change", { [t]: f });
      }
    });
  }
  #y() {
    const t = this.hasAttribute("disabled"), e = A(this.shadowRoot);
    for (const s of e)
      I(s) && (s.disabled = t);
  }
  disconnectedCallback() {
    this.#s.clear(), this.#h.clear();
  }
  dispatch(t, e) {
    this.dispatchEvent(
      new CustomEvent(t, {
        bubbles: !0,
        // up DOM tree
        composed: !0,
        // can pass through shadow DOM
        detail: e
      })
    );
  }
  displayIfSet(t, e = "block") {
    return `display: ${t ? e : "none"}`;
  }
  // This inserts a dash before each uppercase letter
  // that is preceded by a lowercase letter or digit.
  static elementName() {
    return this.name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
  }
  #x(t) {
    const e = t instanceof l;
    for (const s of t.getAttributeNames()) {
      const o = t.getAttribute(s), i = this.#A(t, o);
      if (i) {
        const n = this[i];
        n === void 0 && this.#r(t, s, i), t[i] = n;
        let [a, c] = s.split(":");
        a === "value" && (c ? (t["on" + c] === void 0 && this.#e(t, s, "refers to an unsupported event name"), t.setAttribute(a, this[i])) : c = "change", this.#g(t, i, a, c)), e && t.#h.set(
          l.getPropName(a),
          i
        );
      }
      this.#l(o, t, s);
    }
  }
  #i(t) {
    const e = new Function("return " + t).call(this);
    return Array.isArray(e) ? e.join("") : e;
  }
  #$(t) {
    const { localName: e } = t;
    if (e === "style") {
      const { sheet: s } = t, o = s?.cssRules ?? [], i = Array.from(o);
      for (const n of i)
        if (n.constructor === CSSStyleRule) {
          const a = Array.from(n.style);
          for (const c of a)
            if (c.startsWith("--")) {
              const h = n.style.getPropertyValue(c);
              this.#l(h, n, c);
            }
        }
    } else {
      let s = "";
      if (e === "textarea") {
        const o = t.textContent?.match(O);
        o && (s = o[1]);
      } else {
        const o = Array.from(t.childNodes).find(
          (i) => i.nodeType === Node.COMMENT_NODE
        );
        o && (s = o.textContent?.trim() ?? "");
      }
      if (s) {
        const o = this.#A(t, s);
        e === "textarea" && o ? (this.#g(t, o, null, "change"), t.textContent = this[o]) : this.#l(s, t);
      }
    }
  }
  // This method is called automatically if
  // the component is nested in form element AND
  // the static property formAssociated is true.
  // It does things that are only necessary in that situation.
  formAssociatedCallback() {
    let t = this.getAttribute("form-assoc");
    if (!t) {
      const n = this.getAttribute("name");
      if (n)
        if (this.#n("value"))
          t = `value:${n}`;
        else
          throw new p(
            "can't submit by name because component has no value property"
          );
      else
        return;
    }
    const e = {}, s = t.split(",");
    for (const n of s) {
      const [a, c] = n.split(":");
      e[a.trim()] = c.trim();
    }
    this.#c = e, this.#o = new FormData(), this.#a = this.attachInternals(), this.#a.setFormValue(this.#o);
    const o = Object.keys(this.#t.properties), i = this.#b;
    for (const n of o)
      i[n] = this[n];
  }
  formResetCallback() {
    const t = this.#b;
    for (const e of Object.keys(t))
      this[e] = t[e];
  }
  static getAttrName(t) {
    let e = l.#m.get(t);
    return e || (e = t.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase(), l.#m.set(t, e)), e;
  }
  static getPropName(t) {
    let e = l.#p.get(t);
    return e || (e = t.replace(/-([a-z])/g, (s, o) => o.toUpperCase()), l.#p.set(t, e)), e;
  }
  #n(t) {
    return !!this.#t.properties[t];
  }
  #E(t) {
    const e = Array.from(t.querySelectorAll("*"));
    for (const s of e)
      this.#x(s), s.firstElementChild || this.#$(s);
  }
  static get observedAttributes() {
    const t = Object.keys(this.properties || {}).map(l.getAttrName);
    return t.includes("disabled") || t.push("disabled"), t;
  }
  // Subclasses can override this to add functionality.
  propertyChangedCallback(t, e, s) {
  }
  #A(t, e) {
    if (!e || !j.test(e)) return;
    const s = g(e);
    return this[s] === void 0 && this.#r(t, "", s), s;
  }
  #L(t) {
    const o = this.#t.propToExprsMap.get(t) || [];
    for (const i of o) {
      const n = this.#i(i), a = this.#s.get(i) ?? [];
      for (const c of a)
        c instanceof HTMLElement ? this.#w(c, n) : c instanceof CSSStyleRule || E(c.element, c.attrName, n);
    }
    requestAnimationFrame(() => {
      this.#O(t);
    });
  }
  static register() {
    const t = this.elementName();
    customElements.get(t) || customElements.define(t, this);
  }
  #N(t, e) {
    const { computed: s, uses: o } = e, i = this.#t.propToComputedMap;
    function n(c, h) {
      let f = i.get(c);
      f || (f = [], i.set(c, f)), f.push([t, h]);
    }
    const a = s.match(b) || [];
    for (const c of a) {
      const h = c.substring(v);
      this[h] === void 0 && this.#r(null, t, h), typeof this[h] != "function" && n(h, s);
    }
    if (o)
      for (const c of o.split(","))
        n(c, s);
  }
  // WARNING: Do not place untrusted JavaScript expressions
  // in attribute values or the text content of elements!
  #l(t, e, s = void 0) {
    if (!t) return;
    const o = this.#u(e, s, t);
    if (!o) {
      const c = t.replaceAll("this..", "this.");
      s ? E(e, s, c) : "textContent" in e && (e.textContent = c);
      return;
    }
    const i = this.#t;
    o.forEach((c) => {
      const h = g(c);
      if (typeof this[h] == "function") return;
      const f = i.propToExprsMap;
      let u = f.get(h);
      u || (u = [], f.set(h, u)), u.includes(t) || u.push(t);
    });
    for (const [c, h] of this.#s.entries())
      for (const f of h) {
        const u = f instanceof HTMLElement || f instanceof CSSStyleRule ? f : f.element;
        u instanceof CSSStyleRule || u.isConnected || this.#s.set(
          c,
          h.filter((m) => m !== f)
        );
      }
    let n = this.#s.get(t);
    n || (n = [], this.#s.set(t, n)), n.push(s ? { element: e, attrName: s } : e);
    const a = this.#i(t);
    s ? E(e, s, a) : this.#w(e, a);
  }
  setFormValue(t, e) {
    !this.#o || !T(e) || (this.#o.set(t, e), this.#a?.setFormValue(this.#o));
  }
  static #H() {
    for (const [t, e] of l.#d.entries()) {
      const s = C(document.body, t);
      if (s)
        for (const [o, i] of Object.entries(e))
          s[o] = i;
    }
  }
  #e(t, e, s) {
    const o = this.#t, i = t instanceof HTMLElement ? t.localName : "CSS rule";
    throw new p(
      `component ${o.elementName()}` + (t ? `, element "${i}"` : "") + (e ? `, attribute "${e}"` : "") + ` ${s}`
    );
  }
  #r(t, e, s) {
    this.#e(t, e, `refers to missing property "${s}"`);
  }
  #C(t, e) {
    return this.#T(t, this.getAttribute(e));
  }
  #T(t, e) {
    if (e?.match(b)) return e;
    const s = this.#t, { type: o } = s.properties[t];
    if (o || this.#e(null, t, "does not specify its type"), o === String) return e;
    if (o === Number) return y(e);
    if (o === Boolean)
      return e === "true" ? !0 : e === "false" || e === "null" ? !1 : (e && e !== t && this.#e(
        null,
        t,
        "is a Boolean attribute, so its value must match attribute name or be missing"
      ), e === t);
  }
  // Updates the matching attribute for a property if there is one.
  #k(t, e, s, o) {
    if (T(s) && this.hasAttribute(o)) {
      const i = e === Boolean ? this.hasAttribute(o) : this.#C(t, o);
      s !== i && L(this, t, s);
    }
  }
  #O(t) {
    const e = this[t], s = this.#f.get(t) || [];
    for (const o of s)
      if (o instanceof HTMLElement)
        o.localName === "textarea" ? o.value = e : o.textContent = e;
      else if (!(o instanceof CSSStyleRule)) {
        const { element: i, attrName: n } = o;
        if (i instanceof HTMLElement) {
          const a = l.getPropName(n);
          i[a] = e;
        } else i instanceof CSSStyleRule && i.style.setProperty(n, e);
      }
  }
  // Updates all computed properties that reference this property.
  #F(t) {
    const s = this.#t.propToComputedMap.get(t) || [];
    for (const [o, i] of s)
      this[o] = this.#i(i);
  }
  #w(t, e) {
    if (e === void 0) return;
    const s = t instanceof HTMLElement, o = s ? t.localName : "", i = typeof e;
    i !== "string" && i !== "number" && this.#e(
      t,
      void 0,
      " computed content is not a string or number"
    ), o === "textarea" ? t.value = e : s && i === "string" && e.trim().startsWith("<") ? (t.innerHTML = e, this.#M(t), this.#E(t)) : s && (t.textContent = e);
  }
  // Update corresponding parent web component property if bound to one.
  #j(t, e) {
    const s = this.#h.get(t);
    if (!s) return;
    const o = this.getRootNode();
    if (!(o instanceof ShadowRoot)) return;
    const { host: i } = o;
    if (!i) return;
    const n = i;
    n[s] = e;
  }
  /**
   * @param state - State object
   * @param map - object whose keys are state properties and
   *   whose values are component properties
   */
  useState(t, e) {
    if (!e) {
      e = {};
      for (const s of Object.keys(t))
        e[s] = s;
    }
    this.#B(t, e);
    for (const [s, o] of Object.entries(e))
      if (this.#n(o)) {
        const i = S(t, s);
        i !== void 0 && (this[o] = i);
        const n = this.#t.properties[o];
        n.state = t, n.stateProp = s;
      }
    t.addListener(this, e);
  }
  #I() {
    const t = this.#t, e = this.#t.name, s = new Set(Object.keys(t.properties));
    for (const o of this.getAttributeNames())
      if (o !== "class" && o !== "id" && o !== "disabled" && !o.startsWith("on")) {
        if (o === "form-assoc") {
          if (!this.#t.formAssociated)
            throw new p(
              `add "static formAssociated = true;" to class ${e}`
            );
          continue;
        }
        if (!s.has(l.getPropName(o))) {
          if (o === "name") {
            if (t.formAssociated) continue;
            throw new p(
              `name attribute requires "static formAssociated = true;" in class ${e}`
            );
          }
          this.#e(null, o, "is not a supported attribute");
        }
      }
  }
  #u(t, e, s) {
    const o = s.match(b);
    if (o)
      return o.forEach((i) => {
        const n = g(i);
        this[n] === void 0 && this.#r(t, e, n);
      }), o;
  }
  #B(t, e) {
    for (const [s, o] of Object.entries(e)) {
      let i = S(t, s);
      if (i === void 0)
        throw new p(`invalid state path "${s}"`);
      i = this[o], this.#n(o) || this.#e(
        null,
        o,
        "refers to missing property in useState map"
      );
    }
  }
  // When type is an array, this can't validate the type of the array elements.
  #V(t, e, s) {
    if (s instanceof e) return;
    let o = typeof s;
    if (o === "object") {
      const { constructor: i } = s;
      o = i.name, i !== e && this.#e(
        null,
        t,
        `was set to a ${o}, but must be a ${e.name}`
      );
    }
    o !== e.name.toLowerCase() && this.#e(
      null,
      t,
      `was set to a ${o}, but must be a ${e.name}`
    );
  }
  #M(t) {
    const e = Array.from(t.querySelectorAll("*"));
    for (const s of e) {
      const o = [];
      for (const i of Array.from(s.attributes)) {
        const n = i.name;
        if (n.startsWith("on")) {
          let a = n.slice(2);
          a = a[0].toLowerCase() + a.slice(1).toLowerCase();
          const c = i.value;
          this.#u(s, n, c);
          let h;
          typeof this[c] == "function" ? h = (f) => this[c](f) : (this.#u(s, n, c), h = () => this.#i(c)), s.addEventListener(a, h), o.push(n);
        }
      }
      for (const i of o)
        s.removeAttribute(i);
    }
  }
}
function q(r, ...t) {
  let e = x(r, t);
  for (; ; ) {
    const s = H.exec(e);
    if (!s) break;
    const o = s[2];
    if (P.test(o)) {
      const i = s[1];
      if (!i.startsWith("--")) {
        const n = `--${i}: ${o};
        ${i}: var(--${i});`;
        e = $(e, s.index, s[0].length, n);
      }
    }
  }
  return e;
}
function _(r, ...t) {
  let e = x(r, t);
  for (; ; ) {
    const s = F.exec(e);
    if (!s) break;
    const o = V(s[2]);
    if (P.test(o)) {
      const i = `<!-- ${o.trim()} -->`, n = s.index + s[0].indexOf(">") + 1;
      e = $(e, n, o.length, i);
    }
  }
  return e;
}
export {
  l as Wrec,
  D as createElement,
  q as css,
  _ as html
};
