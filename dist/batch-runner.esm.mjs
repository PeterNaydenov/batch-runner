var o = /* @__PURE__ */ Symbol("missing"), y = /* @__PURE__ */ Symbol("end___");
function S() {
  const l = /* @__PURE__ */ new Map();
  function s(e) {
    if (e == null || typeof e != "object") return !1;
    let { name: n, source: t, job: i, final: r } = e;
    return t == null && (t = () => o), r == null && (r = () => o), typeof n != "string" || typeof t != "function" || typeof i != "function" || typeof r != "function" ? !1 : (l.set(n, {
      name: n,
      source: t,
      job: i,
      final: r
    }), !0);
  }
  function p(e, ...n) {
    if (typeof e != "string") {
      if (!s(e)) throw new Error("batch-runner: invalid batch definition");
      e = e.name;
    }
    const t = l.get(e);
    if (t == null) return [];
    const { source: i, job: r, final: d } = t, u = [];
    let f = i(...n);
    f === o && (f = [void 0]), Array.isArray(f) || (f = [f]);
    for (let [b, v] of f.entries()) {
      let c = r({
        item: v,
        i: b,
        END: y
      }, ...n);
      if (c === y) break;
      u.push(c);
    }
    const a = d(u, ...n);
    return a !== o ? a : u;
  }
  return {
    define: s,
    run: p
  };
}
export {
  S as default
};
