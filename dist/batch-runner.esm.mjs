function h() {
  const s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ Symbol("missing");
  function c(t) {
    let { name: n, source: f, job: o, final: r } = t;
    return f == null && (f = () => i), r == null && (r = () => i), typeof n != "string" || typeof f != "function" || typeof o != "function" || typeof r != "function" ? !1 : (s.set(n, {
      name: n,
      source: f,
      job: o,
      final: r
    }), !0);
  }
  function d(t, ...n) {
    if (typeof t != "string") {
      const { name: l } = t;
      c(t), t = l;
    }
    const f = s.get(t);
    if (f == null) return [];
    const { source: o, job: r, final: b } = f, a = /* @__PURE__ */ Symbol("end___"), u = [];
    let e = o(...n || []);
    e === i && (e = [void 0]), (typeof e > "u" || !e.hasOwnProperty("length") || typeof e == "string") && (e = [e]);
    for (let [l, g] of e.entries()) {
      let y = r({
        item: g,
        i: l,
        END: a
      }, ...n);
      if (y === a) break;
      u.push(y);
    }
    const p = b(u, ...n);
    return p !== i ? p : u;
  }
  return {
    define: c,
    run: d
  };
}
export {
  h as default
};
