(function () {
    const t = document.createElement('link').relList;
    if (t && t.supports && t.supports('modulepreload')) return;
    for (const r of document.querySelectorAll('link[rel="modulepreload"]')) s(r);
    new MutationObserver((r) => {
        for (const i of r)
            if (i.type === 'childList')
                for (const o of i.addedNodes)
                    o.tagName === 'LINK' && o.rel === 'modulepreload' && s(o);
    }).observe(document, { childList: !0, subtree: !0 });
    function n(r) {
        const i = {};
        return (
            r.integrity && (i.integrity = r.integrity),
            r.referrerPolicy && (i.referrerPolicy = r.referrerPolicy),
            r.crossOrigin === 'use-credentials'
                ? (i.credentials = 'include')
                : r.crossOrigin === 'anonymous'
                  ? (i.credentials = 'omit')
                  : (i.credentials = 'same-origin'),
            i
        );
    }
    function s(r) {
        if (r.ep) return;
        r.ep = !0;
        const i = n(r);
        fetch(r.href, i);
    }
})();
function _s(e) {
    const t = Object.create(null);
    for (const n of e.split(',')) t[n] = 1;
    return (n) => n in t;
}
const te = {},
    Rt = [],
    Ae = () => {},
    xo = () => !1,
    Tn = (e) =>
        e.charCodeAt(0) === 111 &&
        e.charCodeAt(1) === 110 &&
        (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
    ws = (e) => e.startsWith('onUpdate:'),
    de = Object.assign,
    Ss = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
    },
    Po = Object.prototype.hasOwnProperty,
    z = (e, t) => Po.call(e, t),
    V = Array.isArray,
    Mt = (e) => In(e) === '[object Map]',
    Gr = (e) => In(e) === '[object Set]',
    F = (e) => typeof e == 'function',
    re = (e) => typeof e == 'string',
    et = (e) => typeof e == 'symbol',
    ne = (e) => e !== null && typeof e == 'object',
    qr = (e) => (ne(e) || F(e)) && F(e.then) && F(e.catch),
    Jr = Object.prototype.toString,
    In = (e) => Jr.call(e),
    Ro = (e) => In(e).slice(8, -1),
    Yr = (e) => In(e) === '[object Object]',
    Es = (e) => re(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
    zt = _s(
        ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted',
    ),
    kn = (e) => {
        const t = Object.create(null);
        return (n) => t[n] || (t[n] = e(n));
    },
    Mo = /-(\w)/g,
    Pe = kn((e) => e.replace(Mo, (t, n) => (n ? n.toUpperCase() : ''))),
    Ao = /\B([A-Z])/g,
    bt = kn((e) => e.replace(Ao, '-$1').toLowerCase()),
    On = kn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
    Bn = kn((e) => (e ? `on${On(e)}` : '')),
    ut = (e, t) => !Object.is(e, t),
    Kn = (e, ...t) => {
        for (let n = 0; n < e.length; n++) e[n](...t);
    },
    rs = (e, t, n, s = !1) => {
        Object.defineProperty(e, t, { configurable: !0, enumerable: !1, writable: s, value: n });
    },
    To = (e) => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t;
    };
let Gs;
const Ln = () =>
    Gs ||
    (Gs =
        typeof globalThis < 'u'
            ? globalThis
            : typeof self < 'u'
              ? self
              : typeof window < 'u'
                ? window
                : typeof global < 'u'
                  ? global
                  : {});
function Cs(e) {
    if (V(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const s = e[n],
                r = re(s) ? Lo(s) : Cs(s);
            if (r) for (const i in r) t[i] = r[i];
        }
        return t;
    } else if (re(e) || ne(e)) return e;
}
const Io = /;(?![^(]*\))/g,
    ko = /:([^]+)/,
    Oo = /\/\*[^]*?\*\//g;
function Lo(e) {
    const t = {};
    return (
        e
            .replace(Oo, '')
            .split(Io)
            .forEach((n) => {
                if (n) {
                    const s = n.split(ko);
                    s.length > 1 && (t[s[0].trim()] = s[1].trim());
                }
            }),
        t
    );
}
function Un(e) {
    let t = '';
    if (re(e)) t = e;
    else if (V(e))
        for (let n = 0; n < e.length; n++) {
            const s = Un(e[n]);
            s && (t += s + ' ');
        }
    else if (ne(e)) for (const n in e) e[n] && (t += n + ' ');
    return t.trim();
}
const Uo = 'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
    $o = _s(Uo);
function Qr(e) {
    return !!e || e === '';
}
const Xr = (e) => !!(e && e.__v_isRef === !0),
    $t = (e) =>
        re(e)
            ? e
            : e == null
              ? ''
              : V(e) || (ne(e) && (e.toString === Jr || !F(e.toString)))
                ? Xr(e)
                    ? $t(e.value)
                    : JSON.stringify(e, Zr, 2)
                : String(e),
    Zr = (e, t) =>
        Xr(t)
            ? Zr(e, t.value)
            : Mt(t)
              ? {
                    [`Map(${t.size})`]: [...t.entries()].reduce(
                        (n, [s, r], i) => ((n[Wn(s, i) + ' =>'] = r), n),
                        {},
                    ),
                }
              : Gr(t)
                ? { [`Set(${t.size})`]: [...t.values()].map((n) => Wn(n)) }
                : et(t)
                  ? Wn(t)
                  : ne(t) && !V(t) && !Yr(t)
                    ? String(t)
                    : t,
    Wn = (e, t = '') => {
        var n;
        return et(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
    };
function No(e) {
    return e == null ? 'initial' : typeof e == 'string' ? (e === '' ? ' ' : e) : String(e);
}
let be;
class Vo {
    constructor(t = !1) {
        ((this.detached = t),
            (this._active = !0),
            (this._on = 0),
            (this.effects = []),
            (this.cleanups = []),
            (this._isPaused = !1),
            (this.parent = be),
            !t && be && (this.index = (be.scopes || (be.scopes = [])).push(this) - 1));
    }
    get active() {
        return this._active;
    }
    pause() {
        if (this._active) {
            this._isPaused = !0;
            let t, n;
            if (this.scopes) for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].pause();
            for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].pause();
        }
    }
    resume() {
        if (this._active && this._isPaused) {
            this._isPaused = !1;
            let t, n;
            if (this.scopes)
                for (t = 0, n = this.scopes.length; t < n; t++) this.scopes[t].resume();
            for (t = 0, n = this.effects.length; t < n; t++) this.effects[t].resume();
        }
    }
    run(t) {
        if (this._active) {
            const n = be;
            try {
                return ((be = this), t());
            } finally {
                be = n;
            }
        }
    }
    on() {
        ++this._on === 1 && ((this.prevScope = be), (be = this));
    }
    off() {
        this._on > 0 && --this._on === 0 && ((be = this.prevScope), (this.prevScope = void 0));
    }
    stop(t) {
        if (this._active) {
            this._active = !1;
            let n, s;
            for (n = 0, s = this.effects.length; n < s; n++) this.effects[n].stop();
            for (this.effects.length = 0, n = 0, s = this.cleanups.length; n < s; n++)
                this.cleanups[n]();
            if (((this.cleanups.length = 0), this.scopes)) {
                for (n = 0, s = this.scopes.length; n < s; n++) this.scopes[n].stop(!0);
                this.scopes.length = 0;
            }
            if (!this.detached && this.parent && !t) {
                const r = this.parent.scopes.pop();
                r && r !== this && ((this.parent.scopes[this.index] = r), (r.index = this.index));
            }
            this.parent = void 0;
        }
    }
}
function Fo() {
    return be;
}
let ee;
const zn = new WeakSet();
class ei {
    constructor(t) {
        ((this.fn = t),
            (this.deps = void 0),
            (this.depsTail = void 0),
            (this.flags = 5),
            (this.next = void 0),
            (this.cleanup = void 0),
            (this.scheduler = void 0),
            be && be.active && be.effects.push(this));
    }
    pause() {
        this.flags |= 64;
    }
    resume() {
        this.flags & 64 && ((this.flags &= -65), zn.has(this) && (zn.delete(this), this.trigger()));
    }
    notify() {
        (this.flags & 2 && !(this.flags & 32)) || this.flags & 8 || ni(this);
    }
    run() {
        if (!(this.flags & 1)) return this.fn();
        ((this.flags |= 2), qs(this), si(this));
        const t = ee,
            n = Te;
        ((ee = this), (Te = !0));
        try {
            return this.fn();
        } finally {
            (ri(this), (ee = t), (Te = n), (this.flags &= -3));
        }
    }
    stop() {
        if (this.flags & 1) {
            for (let t = this.deps; t; t = t.nextDep) Rs(t);
            ((this.deps = this.depsTail = void 0),
                qs(this),
                this.onStop && this.onStop(),
                (this.flags &= -2));
        }
    }
    trigger() {
        this.flags & 64 ? zn.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
    }
    runIfDirty() {
        is(this) && this.run();
    }
    get dirty() {
        return is(this);
    }
}
let ti = 0,
    Gt,
    qt;
function ni(e, t = !1) {
    if (((e.flags |= 8), t)) {
        ((e.next = qt), (qt = e));
        return;
    }
    ((e.next = Gt), (Gt = e));
}
function xs() {
    ti++;
}
function Ps() {
    if (--ti > 0) return;
    if (qt) {
        let t = qt;
        for (qt = void 0; t;) {
            const n = t.next;
            ((t.next = void 0), (t.flags &= -9), (t = n));
        }
    }
    let e;
    for (; Gt;) {
        let t = Gt;
        for (Gt = void 0; t;) {
            const n = t.next;
            if (((t.next = void 0), (t.flags &= -9), t.flags & 1))
                try {
                    t.trigger();
                } catch (s) {
                    e || (e = s);
                }
            t = n;
        }
    }
    if (e) throw e;
}
function si(e) {
    for (let t = e.deps; t; t = t.nextDep)
        ((t.version = -1), (t.prevActiveLink = t.dep.activeLink), (t.dep.activeLink = t));
}
function ri(e) {
    let t,
        n = e.depsTail,
        s = n;
    for (; s;) {
        const r = s.prevDep;
        (s.version === -1 ? (s === n && (n = r), Rs(s), Ho(s)) : (t = s),
            (s.dep.activeLink = s.prevActiveLink),
            (s.prevActiveLink = void 0),
            (s = r));
    }
    ((e.deps = t), (e.depsTail = n));
}
function is(e) {
    for (let t = e.deps; t; t = t.nextDep)
        if (
            t.dep.version !== t.version ||
            (t.dep.computed && (ii(t.dep.computed) || t.dep.version !== t.version))
        )
            return !0;
    return !!e._dirty;
}
function ii(e) {
    if (
        (e.flags & 4 && !(e.flags & 16)) ||
        ((e.flags &= -17), e.globalVersion === tn) ||
        ((e.globalVersion = tn), !e.isSSR && e.flags & 128 && ((!e.deps && !e._dirty) || !is(e)))
    )
        return;
    e.flags |= 2;
    const t = e.dep,
        n = ee,
        s = Te;
    ((ee = e), (Te = !0));
    try {
        si(e);
        const r = e.fn(e._value);
        (t.version === 0 || ut(r, e._value)) && ((e.flags |= 128), (e._value = r), t.version++);
    } catch (r) {
        throw (t.version++, r);
    } finally {
        ((ee = n), (Te = s), ri(e), (e.flags &= -3));
    }
}
function Rs(e, t = !1) {
    const { dep: n, prevSub: s, nextSub: r } = e;
    if (
        (s && ((s.nextSub = r), (e.prevSub = void 0)),
        r && ((r.prevSub = s), (e.nextSub = void 0)),
        n.subs === e && ((n.subs = s), !s && n.computed))
    ) {
        n.computed.flags &= -5;
        for (let i = n.computed.deps; i; i = i.nextDep) Rs(i, !0);
    }
    !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Ho(e) {
    const { prevDep: t, nextDep: n } = e;
    (t && ((t.nextDep = n), (e.prevDep = void 0)), n && ((n.prevDep = t), (e.nextDep = void 0)));
}
let Te = !0;
const oi = [];
function Qe() {
    (oi.push(Te), (Te = !1));
}
function Xe() {
    const e = oi.pop();
    Te = e === void 0 ? !0 : e;
}
function qs(e) {
    const { cleanup: t } = e;
    if (((e.cleanup = void 0), t)) {
        const n = ee;
        ee = void 0;
        try {
            t();
        } finally {
            ee = n;
        }
    }
}
let tn = 0;
class jo {
    constructor(t, n) {
        ((this.sub = t),
            (this.dep = n),
            (this.version = n.version),
            (this.nextDep =
                this.prevDep =
                this.nextSub =
                this.prevSub =
                this.prevActiveLink =
                    void 0));
    }
}
class Ms {
    constructor(t) {
        ((this.computed = t),
            (this.version = 0),
            (this.activeLink = void 0),
            (this.subs = void 0),
            (this.map = void 0),
            (this.key = void 0),
            (this.sc = 0),
            (this.__v_skip = !0));
    }
    track(t) {
        if (!ee || !Te || ee === this.computed) return;
        let n = this.activeLink;
        if (n === void 0 || n.sub !== ee)
            ((n = this.activeLink = new jo(ee, this)),
                ee.deps
                    ? ((n.prevDep = ee.depsTail), (ee.depsTail.nextDep = n), (ee.depsTail = n))
                    : (ee.deps = ee.depsTail = n),
                li(n));
        else if (n.version === -1 && ((n.version = this.version), n.nextDep)) {
            const s = n.nextDep;
            ((s.prevDep = n.prevDep),
                n.prevDep && (n.prevDep.nextDep = s),
                (n.prevDep = ee.depsTail),
                (n.nextDep = void 0),
                (ee.depsTail.nextDep = n),
                (ee.depsTail = n),
                ee.deps === n && (ee.deps = s));
        }
        return n;
    }
    trigger(t) {
        (this.version++, tn++, this.notify(t));
    }
    notify(t) {
        xs();
        try {
            for (let n = this.subs; n; n = n.prevSub) n.sub.notify() && n.sub.dep.notify();
        } finally {
            Ps();
        }
    }
}
function li(e) {
    if ((e.dep.sc++, e.sub.flags & 4)) {
        const t = e.dep.computed;
        if (t && !e.dep.subs) {
            t.flags |= 20;
            for (let s = t.deps; s; s = s.nextDep) li(s);
        }
        const n = e.dep.subs;
        (n !== e && ((e.prevSub = n), n && (n.nextSub = e)), (e.dep.subs = e));
    }
}
const os = new WeakMap(),
    vt = Symbol(''),
    ls = Symbol(''),
    nn = Symbol('');
function ae(e, t, n) {
    if (Te && ee) {
        let s = os.get(e);
        s || os.set(e, (s = new Map()));
        let r = s.get(n);
        (r || (s.set(n, (r = new Ms())), (r.map = s), (r.key = n)), r.track());
    }
}
function Ye(e, t, n, s, r, i) {
    const o = os.get(e);
    if (!o) {
        tn++;
        return;
    }
    const l = (c) => {
        c && c.trigger();
    };
    if ((xs(), t === 'clear')) o.forEach(l);
    else {
        const c = V(e),
            d = c && Es(n);
        if (c && n === 'length') {
            const u = Number(s);
            o.forEach((h, m) => {
                (m === 'length' || m === nn || (!et(m) && m >= u)) && l(h);
            });
        } else
            switch (((n !== void 0 || o.has(void 0)) && l(o.get(n)), d && l(o.get(nn)), t)) {
                case 'add':
                    c ? d && l(o.get('length')) : (l(o.get(vt)), Mt(e) && l(o.get(ls)));
                    break;
                case 'delete':
                    c || (l(o.get(vt)), Mt(e) && l(o.get(ls)));
                    break;
                case 'set':
                    Mt(e) && l(o.get(vt));
                    break;
            }
    }
    Ps();
}
function Ct(e) {
    const t = W(e);
    return t === e ? t : (ae(t, 'iterate', nn), xe(e) ? t : t.map(ce));
}
function $n(e) {
    return (ae((e = W(e)), 'iterate', nn), e);
}
const Do = {
    __proto__: null,
    [Symbol.iterator]() {
        return Gn(this, Symbol.iterator, ce);
    },
    concat(...e) {
        return Ct(this).concat(...e.map((t) => (V(t) ? Ct(t) : t)));
    },
    entries() {
        return Gn(this, 'entries', (e) => ((e[1] = ce(e[1])), e));
    },
    every(e, t) {
        return Ge(this, 'every', e, t, void 0, arguments);
    },
    filter(e, t) {
        return Ge(this, 'filter', e, t, (n) => n.map(ce), arguments);
    },
    find(e, t) {
        return Ge(this, 'find', e, t, ce, arguments);
    },
    findIndex(e, t) {
        return Ge(this, 'findIndex', e, t, void 0, arguments);
    },
    findLast(e, t) {
        return Ge(this, 'findLast', e, t, ce, arguments);
    },
    findLastIndex(e, t) {
        return Ge(this, 'findLastIndex', e, t, void 0, arguments);
    },
    forEach(e, t) {
        return Ge(this, 'forEach', e, t, void 0, arguments);
    },
    includes(...e) {
        return qn(this, 'includes', e);
    },
    indexOf(...e) {
        return qn(this, 'indexOf', e);
    },
    join(e) {
        return Ct(this).join(e);
    },
    lastIndexOf(...e) {
        return qn(this, 'lastIndexOf', e);
    },
    map(e, t) {
        return Ge(this, 'map', e, t, void 0, arguments);
    },
    pop() {
        return Dt(this, 'pop');
    },
    push(...e) {
        return Dt(this, 'push', e);
    },
    reduce(e, ...t) {
        return Js(this, 'reduce', e, t);
    },
    reduceRight(e, ...t) {
        return Js(this, 'reduceRight', e, t);
    },
    shift() {
        return Dt(this, 'shift');
    },
    some(e, t) {
        return Ge(this, 'some', e, t, void 0, arguments);
    },
    splice(...e) {
        return Dt(this, 'splice', e);
    },
    toReversed() {
        return Ct(this).toReversed();
    },
    toSorted(e) {
        return Ct(this).toSorted(e);
    },
    toSpliced(...e) {
        return Ct(this).toSpliced(...e);
    },
    unshift(...e) {
        return Dt(this, 'unshift', e);
    },
    values() {
        return Gn(this, 'values', ce);
    },
};
function Gn(e, t, n) {
    const s = $n(e),
        r = s[t]();
    return (
        s !== e &&
            !xe(e) &&
            ((r._next = r.next),
            (r.next = () => {
                const i = r._next();
                return (i.value && (i.value = n(i.value)), i);
            })),
        r
    );
}
const Bo = Array.prototype;
function Ge(e, t, n, s, r, i) {
    const o = $n(e),
        l = o !== e && !xe(e),
        c = o[t];
    if (c !== Bo[t]) {
        const h = c.apply(e, i);
        return l ? ce(h) : h;
    }
    let d = n;
    o !== e &&
        (l
            ? (d = function (h, m) {
                  return n.call(this, ce(h), m, e);
              })
            : n.length > 2 &&
              (d = function (h, m) {
                  return n.call(this, h, m, e);
              }));
    const u = c.call(o, d, s);
    return l && r ? r(u) : u;
}
function Js(e, t, n, s) {
    const r = $n(e);
    let i = n;
    return (
        r !== e &&
            (xe(e)
                ? n.length > 3 &&
                  (i = function (o, l, c) {
                      return n.call(this, o, l, c, e);
                  })
                : (i = function (o, l, c) {
                      return n.call(this, o, ce(l), c, e);
                  })),
        r[t](i, ...s)
    );
}
function qn(e, t, n) {
    const s = W(e);
    ae(s, 'iterate', nn);
    const r = s[t](...n);
    return (r === -1 || r === !1) && Is(n[0]) ? ((n[0] = W(n[0])), s[t](...n)) : r;
}
function Dt(e, t, n = []) {
    (Qe(), xs());
    const s = W(e)[t].apply(e, n);
    return (Ps(), Xe(), s);
}
const Ko = _s('__proto__,__v_isRef,__isVue'),
    ci = new Set(
        Object.getOwnPropertyNames(Symbol)
            .filter((e) => e !== 'arguments' && e !== 'caller')
            .map((e) => Symbol[e])
            .filter(et),
    );
function Wo(e) {
    et(e) || (e = String(e));
    const t = W(this);
    return (ae(t, 'has', e), t.hasOwnProperty(e));
}
class ai {
    constructor(t = !1, n = !1) {
        ((this._isReadonly = t), (this._isShallow = n));
    }
    get(t, n, s) {
        if (n === '__v_skip') return t.__v_skip;
        const r = this._isReadonly,
            i = this._isShallow;
        if (n === '__v_isReactive') return !r;
        if (n === '__v_isReadonly') return r;
        if (n === '__v_isShallow') return i;
        if (n === '__v_raw')
            return s === (r ? (i ? tl : hi) : i ? di : fi).get(t) ||
                Object.getPrototypeOf(t) === Object.getPrototypeOf(s)
                ? t
                : void 0;
        const o = V(t);
        if (!r) {
            let c;
            if (o && (c = Do[n])) return c;
            if (n === 'hasOwnProperty') return Wo;
        }
        const l = Reflect.get(t, n, fe(t) ? t : s);
        return (et(n) ? ci.has(n) : Ko(n)) || (r || ae(t, 'get', n), i)
            ? l
            : fe(l)
              ? o && Es(n)
                  ? l
                  : l.value
              : ne(l)
                ? r
                    ? mi(l)
                    : Nn(l)
                : l;
    }
}
class ui extends ai {
    constructor(t = !1) {
        super(!1, t);
    }
    set(t, n, s, r) {
        let i = t[n];
        if (!this._isShallow) {
            const c = ft(i);
            if ((!xe(s) && !ft(s) && ((i = W(i)), (s = W(s))), !V(t) && fe(i) && !fe(s)))
                return c ? !1 : ((i.value = s), !0);
        }
        const o = V(t) && Es(n) ? Number(n) < t.length : z(t, n),
            l = Reflect.set(t, n, s, fe(t) ? t : r);
        return (t === W(r) && (o ? ut(s, i) && Ye(t, 'set', n, s) : Ye(t, 'add', n, s)), l);
    }
    deleteProperty(t, n) {
        const s = z(t, n);
        t[n];
        const r = Reflect.deleteProperty(t, n);
        return (r && s && Ye(t, 'delete', n, void 0), r);
    }
    has(t, n) {
        const s = Reflect.has(t, n);
        return ((!et(n) || !ci.has(n)) && ae(t, 'has', n), s);
    }
    ownKeys(t) {
        return (ae(t, 'iterate', V(t) ? 'length' : vt), Reflect.ownKeys(t));
    }
}
class zo extends ai {
    constructor(t = !1) {
        super(!0, t);
    }
    set(t, n) {
        return !0;
    }
    deleteProperty(t, n) {
        return !0;
    }
}
const Go = new ui(),
    qo = new zo(),
    Jo = new ui(!0);
const cs = (e) => e,
    pn = (e) => Reflect.getPrototypeOf(e);
function Yo(e, t, n) {
    return function (...s) {
        const r = this.__v_raw,
            i = W(r),
            o = Mt(i),
            l = e === 'entries' || (e === Symbol.iterator && o),
            c = e === 'keys' && o,
            d = r[e](...s),
            u = n ? cs : t ? wn : ce;
        return (
            !t && ae(i, 'iterate', c ? ls : vt),
            {
                next() {
                    const { value: h, done: m } = d.next();
                    return m
                        ? { value: h, done: m }
                        : { value: l ? [u(h[0]), u(h[1])] : u(h), done: m };
                },
                [Symbol.iterator]() {
                    return this;
                },
            }
        );
    };
}
function mn(e) {
    return function (...t) {
        return e === 'delete' ? !1 : e === 'clear' ? void 0 : this;
    };
}
function Qo(e, t) {
    const n = {
        get(r) {
            const i = this.__v_raw,
                o = W(i),
                l = W(r);
            e || (ut(r, l) && ae(o, 'get', r), ae(o, 'get', l));
            const { has: c } = pn(o),
                d = t ? cs : e ? wn : ce;
            if (c.call(o, r)) return d(i.get(r));
            if (c.call(o, l)) return d(i.get(l));
            i !== o && i.get(r);
        },
        get size() {
            const r = this.__v_raw;
            return (!e && ae(W(r), 'iterate', vt), Reflect.get(r, 'size', r));
        },
        has(r) {
            const i = this.__v_raw,
                o = W(i),
                l = W(r);
            return (
                e || (ut(r, l) && ae(o, 'has', r), ae(o, 'has', l)),
                r === l ? i.has(r) : i.has(r) || i.has(l)
            );
        },
        forEach(r, i) {
            const o = this,
                l = o.__v_raw,
                c = W(l),
                d = t ? cs : e ? wn : ce;
            return (!e && ae(c, 'iterate', vt), l.forEach((u, h) => r.call(i, d(u), d(h), o)));
        },
    };
    return (
        de(
            n,
            e
                ? { add: mn('add'), set: mn('set'), delete: mn('delete'), clear: mn('clear') }
                : {
                      add(r) {
                          !t && !xe(r) && !ft(r) && (r = W(r));
                          const i = W(this);
                          return (pn(i).has.call(i, r) || (i.add(r), Ye(i, 'add', r, r)), this);
                      },
                      set(r, i) {
                          !t && !xe(i) && !ft(i) && (i = W(i));
                          const o = W(this),
                              { has: l, get: c } = pn(o);
                          let d = l.call(o, r);
                          d || ((r = W(r)), (d = l.call(o, r)));
                          const u = c.call(o, r);
                          return (
                              o.set(r, i),
                              d ? ut(i, u) && Ye(o, 'set', r, i) : Ye(o, 'add', r, i),
                              this
                          );
                      },
                      delete(r) {
                          const i = W(this),
                              { has: o, get: l } = pn(i);
                          let c = o.call(i, r);
                          (c || ((r = W(r)), (c = o.call(i, r))), l && l.call(i, r));
                          const d = i.delete(r);
                          return (c && Ye(i, 'delete', r, void 0), d);
                      },
                      clear() {
                          const r = W(this),
                              i = r.size !== 0,
                              o = r.clear();
                          return (i && Ye(r, 'clear', void 0, void 0), o);
                      },
                  },
        ),
        ['keys', 'values', 'entries', Symbol.iterator].forEach((r) => {
            n[r] = Yo(r, e, t);
        }),
        n
    );
}
function As(e, t) {
    const n = Qo(e, t);
    return (s, r, i) =>
        r === '__v_isReactive'
            ? !e
            : r === '__v_isReadonly'
              ? e
              : r === '__v_raw'
                ? s
                : Reflect.get(z(n, r) && r in s ? n : s, r, i);
}
const Xo = { get: As(!1, !1) },
    Zo = { get: As(!1, !0) },
    el = { get: As(!0, !1) };
const fi = new WeakMap(),
    di = new WeakMap(),
    hi = new WeakMap(),
    tl = new WeakMap();
function nl(e) {
    switch (e) {
        case 'Object':
        case 'Array':
            return 1;
        case 'Map':
        case 'Set':
        case 'WeakMap':
        case 'WeakSet':
            return 2;
        default:
            return 0;
    }
}
function sl(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : nl(Ro(e));
}
function Nn(e) {
    return ft(e) ? e : Ts(e, !1, Go, Xo, fi);
}
function pi(e) {
    return Ts(e, !1, Jo, Zo, di);
}
function mi(e) {
    return Ts(e, !0, qo, el, hi);
}
function Ts(e, t, n, s, r) {
    if (!ne(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
    const i = sl(e);
    if (i === 0) return e;
    const o = r.get(e);
    if (o) return o;
    const l = new Proxy(e, i === 2 ? s : n);
    return (r.set(e, l), l);
}
function At(e) {
    return ft(e) ? At(e.__v_raw) : !!(e && e.__v_isReactive);
}
function ft(e) {
    return !!(e && e.__v_isReadonly);
}
function xe(e) {
    return !!(e && e.__v_isShallow);
}
function Is(e) {
    return e ? !!e.__v_raw : !1;
}
function W(e) {
    const t = e && e.__v_raw;
    return t ? W(t) : e;
}
function rl(e) {
    return (!z(e, '__v_skip') && Object.isExtensible(e) && rs(e, '__v_skip', !0), e);
}
const ce = (e) => (ne(e) ? Nn(e) : e),
    wn = (e) => (ne(e) ? mi(e) : e);
function fe(e) {
    return e ? e.__v_isRef === !0 : !1;
}
function il(e) {
    return gi(e, !1);
}
function Sn(e) {
    return gi(e, !0);
}
function gi(e, t) {
    return fe(e) ? e : new ol(e, t);
}
class ol {
    constructor(t, n) {
        ((this.dep = new Ms()),
            (this.__v_isRef = !0),
            (this.__v_isShallow = !1),
            (this._rawValue = n ? t : W(t)),
            (this._value = n ? t : ce(t)),
            (this.__v_isShallow = n));
    }
    get value() {
        return (this.dep.track(), this._value);
    }
    set value(t) {
        const n = this._rawValue,
            s = this.__v_isShallow || xe(t) || ft(t);
        ((t = s ? t : W(t)),
            ut(t, n) && ((this._rawValue = t), (this._value = s ? t : ce(t)), this.dep.trigger()));
    }
}
function Me(e) {
    return fe(e) ? e.value : e;
}
const ll = {
    get: (e, t, n) => (t === '__v_raw' ? e : Me(Reflect.get(e, t, n))),
    set: (e, t, n, s) => {
        const r = e[t];
        return fe(r) && !fe(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
    },
};
function yi(e) {
    return At(e) ? e : new Proxy(e, ll);
}
class cl {
    constructor(t, n, s) {
        ((this.fn = t),
            (this.setter = n),
            (this._value = void 0),
            (this.dep = new Ms(this)),
            (this.__v_isRef = !0),
            (this.deps = void 0),
            (this.depsTail = void 0),
            (this.flags = 16),
            (this.globalVersion = tn - 1),
            (this.next = void 0),
            (this.effect = this),
            (this.__v_isReadonly = !n),
            (this.isSSR = s));
    }
    notify() {
        if (((this.flags |= 16), !(this.flags & 8) && ee !== this)) return (ni(this, !0), !0);
    }
    get value() {
        const t = this.dep.track();
        return (ii(this), t && (t.version = this.dep.version), this._value);
    }
    set value(t) {
        this.setter && this.setter(t);
    }
}
function al(e, t, n = !1) {
    let s, r;
    return (F(e) ? (s = e) : ((s = e.get), (r = e.set)), new cl(s, r, n));
}
const gn = {},
    En = new WeakMap();
let mt;
function ul(e, t = !1, n = mt) {
    if (n) {
        let s = En.get(n);
        (s || En.set(n, (s = [])), s.push(e));
    }
}
function fl(e, t, n = te) {
    const { immediate: s, deep: r, once: i, scheduler: o, augmentJob: l, call: c } = n,
        d = (T) => (r ? T : xe(T) || r === !1 || r === 0 ? at(T, 1) : at(T));
    let u,
        h,
        m,
        g,
        M = !1,
        A = !1;
    if (
        (fe(e)
            ? ((h = () => e.value), (M = xe(e)))
            : At(e)
              ? ((h = () => d(e)), (M = !0))
              : V(e)
                ? ((A = !0),
                  (M = e.some((T) => At(T) || xe(T))),
                  (h = () =>
                      e.map((T) => {
                          if (fe(T)) return T.value;
                          if (At(T)) return d(T);
                          if (F(T)) return c ? c(T, 2) : T();
                      })))
                : F(e)
                  ? t
                      ? (h = c ? () => c(e, 2) : e)
                      : (h = () => {
                            if (m) {
                                Qe();
                                try {
                                    m();
                                } finally {
                                    Xe();
                                }
                            }
                            const T = mt;
                            mt = u;
                            try {
                                return c ? c(e, 3, [g]) : e(g);
                            } finally {
                                mt = T;
                            }
                        })
                  : (h = Ae),
        t && r)
    ) {
        const T = h,
            J = r === !0 ? 1 / 0 : r;
        h = () => at(T(), J);
    }
    const H = Fo(),
        U = () => {
            (u.stop(), H && H.active && Ss(H.effects, u));
        };
    if (i && t) {
        const T = t;
        t = (...J) => {
            (T(...J), U());
        };
    }
    let k = A ? new Array(e.length).fill(gn) : gn;
    const $ = (T) => {
        if (!(!(u.flags & 1) || (!u.dirty && !T)))
            if (t) {
                const J = u.run();
                if (r || M || (A ? J.some((le, se) => ut(le, k[se])) : ut(J, k))) {
                    m && m();
                    const le = mt;
                    mt = u;
                    try {
                        const se = [J, k === gn ? void 0 : A && k[0] === gn ? [] : k, g];
                        ((k = J), c ? c(t, 3, se) : t(...se));
                    } finally {
                        mt = le;
                    }
                }
            } else u.run();
    };
    return (
        l && l($),
        (u = new ei(h)),
        (u.scheduler = o ? () => o($, !1) : $),
        (g = (T) => ul(T, !1, u)),
        (m = u.onStop =
            () => {
                const T = En.get(u);
                if (T) {
                    if (c) c(T, 4);
                    else for (const J of T) J();
                    En.delete(u);
                }
            }),
        t ? (s ? $(!0) : (k = u.run())) : o ? o($.bind(null, !0), !0) : u.run(),
        (U.pause = u.pause.bind(u)),
        (U.resume = u.resume.bind(u)),
        (U.stop = U),
        U
    );
}
function at(e, t = 1 / 0, n) {
    if (t <= 0 || !ne(e) || e.__v_skip || ((n = n || new Set()), n.has(e))) return e;
    if ((n.add(e), t--, fe(e))) at(e.value, t, n);
    else if (V(e)) for (let s = 0; s < e.length; s++) at(e[s], t, n);
    else if (Gr(e) || Mt(e))
        e.forEach((s) => {
            at(s, t, n);
        });
    else if (Yr(e)) {
        for (const s in e) at(e[s], t, n);
        for (const s of Object.getOwnPropertySymbols(e))
            Object.prototype.propertyIsEnumerable.call(e, s) && at(e[s], t, n);
    }
    return e;
}
function fn(e, t, n, s) {
    try {
        return s ? e(...s) : e();
    } catch (r) {
        Vn(r, t, n);
    }
}
function We(e, t, n, s) {
    if (F(e)) {
        const r = fn(e, t, n, s);
        return (
            r &&
                qr(r) &&
                r.catch((i) => {
                    Vn(i, t, n);
                }),
            r
        );
    }
    if (V(e)) {
        const r = [];
        for (let i = 0; i < e.length; i++) r.push(We(e[i], t, n, s));
        return r;
    }
}
function Vn(e, t, n, s = !0) {
    const r = t ? t.vnode : null,
        { errorHandler: i, throwUnhandledErrorInProduction: o } = (t && t.appContext.config) || te;
    if (t) {
        let l = t.parent;
        const c = t.proxy,
            d = `https://vuejs.org/error-reference/#runtime-${n}`;
        for (; l;) {
            const u = l.ec;
            if (u) {
                for (let h = 0; h < u.length; h++) if (u[h](e, c, d) === !1) return;
            }
            l = l.parent;
        }
        if (i) {
            (Qe(), fn(i, null, 10, [e, c, d]), Xe());
            return;
        }
    }
    dl(e, n, r, s, o);
}
function dl(e, t, n, s = !0, r = !1) {
    if (r) throw e;
    console.error(e);
}
const pe = [];
let He = -1;
const Tt = [];
let ot = null,
    xt = 0;
const vi = Promise.resolve();
let Cn = null;
function bi(e) {
    const t = Cn || vi;
    return e ? t.then(this ? e.bind(this) : e) : t;
}
function hl(e) {
    let t = He + 1,
        n = pe.length;
    for (; t < n;) {
        const s = (t + n) >>> 1,
            r = pe[s],
            i = sn(r);
        i < e || (i === e && r.flags & 2) ? (t = s + 1) : (n = s);
    }
    return t;
}
function ks(e) {
    if (!(e.flags & 1)) {
        const t = sn(e),
            n = pe[pe.length - 1];
        (!n || (!(e.flags & 2) && t >= sn(n)) ? pe.push(e) : pe.splice(hl(t), 0, e),
            (e.flags |= 1),
            _i());
    }
}
function _i() {
    Cn || (Cn = vi.then(Ei));
}
function wi(e) {
    (V(e)
        ? Tt.push(...e)
        : ot && e.id === -1
          ? ot.splice(xt + 1, 0, e)
          : e.flags & 1 || (Tt.push(e), (e.flags |= 1)),
        _i());
}
function Ys(e, t, n = He + 1) {
    for (; n < pe.length; n++) {
        const s = pe[n];
        if (s && s.flags & 2) {
            if (e && s.id !== e.uid) continue;
            (pe.splice(n, 1),
                n--,
                s.flags & 4 && (s.flags &= -2),
                s(),
                s.flags & 4 || (s.flags &= -2));
        }
    }
}
function Si(e) {
    if (Tt.length) {
        const t = [...new Set(Tt)].sort((n, s) => sn(n) - sn(s));
        if (((Tt.length = 0), ot)) {
            ot.push(...t);
            return;
        }
        for (ot = t, xt = 0; xt < ot.length; xt++) {
            const n = ot[xt];
            (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), (n.flags &= -2));
        }
        ((ot = null), (xt = 0));
    }
}
const sn = (e) => (e.id == null ? (e.flags & 2 ? -1 : 1 / 0) : e.id);
function Ei(e) {
    try {
        for (He = 0; He < pe.length; He++) {
            const t = pe[He];
            t &&
                !(t.flags & 8) &&
                (t.flags & 4 && (t.flags &= -2),
                fn(t, t.i, t.i ? 15 : 14),
                t.flags & 4 || (t.flags &= -2));
        }
    } finally {
        for (; He < pe.length; He++) {
            const t = pe[He];
            t && (t.flags &= -2);
        }
        ((He = -1), (pe.length = 0), Si(), (Cn = null), (pe.length || Tt.length) && Ei());
    }
}
let me = null,
    Ci = null;
function xn(e) {
    const t = me;
    return ((me = e), (Ci = (e && e.type.__scopeId) || null), t);
}
function xi(e, t = me, n) {
    if (!t || e._n) return e;
    const s = (...r) => {
        s._d && lr(-1);
        const i = xn(t);
        let o;
        try {
            o = e(...r);
        } finally {
            (xn(i), s._d && lr(1));
        }
        return o;
    };
    return ((s._n = !0), (s._c = !0), (s._d = !0), s);
}
function ht(e, t, n, s) {
    const r = e.dirs,
        i = t && t.dirs;
    for (let o = 0; o < r.length; o++) {
        const l = r[o];
        i && (l.oldValue = i[o].value);
        let c = l.dir[s];
        c && (Qe(), We(c, n, 8, [e.el, l, e, t]), Xe());
    }
}
const pl = Symbol('_vte'),
    ml = (e) => e.__isTeleport;
function Os(e, t) {
    e.shapeFlag & 6 && e.component
        ? ((e.transition = t), Os(e.component.subTree, t))
        : e.shapeFlag & 128
          ? ((e.ssContent.transition = t.clone(e.ssContent)),
            (e.ssFallback.transition = t.clone(e.ssFallback)))
          : (e.transition = t);
}
function Pi(e, t) {
    return F(e) ? de({ name: e.name }, t, { setup: e }) : e;
}
function Ri(e) {
    e.ids = [e.ids[0] + e.ids[2]++ + '-', 0, 0];
}
function Jt(e, t, n, s, r = !1) {
    if (V(e)) {
        e.forEach((M, A) => Jt(M, t && (V(t) ? t[A] : t), n, s, r));
        return;
    }
    if (It(s) && !r) {
        s.shapeFlag & 512 &&
            s.type.__asyncResolved &&
            s.component.subTree.component &&
            Jt(e, t, n, s.component.subTree);
        return;
    }
    const i = s.shapeFlag & 4 ? Vs(s.component) : s.el,
        o = r ? null : i,
        { i: l, r: c } = e,
        d = t && t.r,
        u = l.refs === te ? (l.refs = {}) : l.refs,
        h = l.setupState,
        m = W(h),
        g = h === te ? () => !1 : (M) => z(m, M);
    if (
        (d != null &&
            d !== c &&
            (re(d) ? ((u[d] = null), g(d) && (h[d] = null)) : fe(d) && (d.value = null)),
        F(c))
    )
        fn(c, l, 12, [o, u]);
    else {
        const M = re(c),
            A = fe(c);
        if (M || A) {
            const H = () => {
                if (e.f) {
                    const U = M ? (g(c) ? h[c] : u[c]) : c.value;
                    r
                        ? V(U) && Ss(U, i)
                        : V(U)
                          ? U.includes(i) || U.push(i)
                          : M
                            ? ((u[c] = [i]), g(c) && (h[c] = u[c]))
                            : ((c.value = [i]), e.k && (u[e.k] = c.value));
                } else
                    M
                        ? ((u[c] = o), g(c) && (h[c] = o))
                        : A && ((c.value = o), e.k && (u[e.k] = o));
            };
            o ? ((H.id = -1), we(H, n)) : H();
        }
    }
}
Ln().requestIdleCallback;
Ln().cancelIdleCallback;
const It = (e) => !!e.type.__asyncLoader,
    Mi = (e) => e.type.__isKeepAlive;
function gl(e, t) {
    Ai(e, 'a', t);
}
function yl(e, t) {
    Ai(e, 'da', t);
}
function Ai(e, t, n = ue) {
    const s =
        e.__wdc ||
        (e.__wdc = () => {
            let r = n;
            for (; r;) {
                if (r.isDeactivated) return;
                r = r.parent;
            }
            return e();
        });
    if ((Fn(t, s, n), n)) {
        let r = n.parent;
        for (; r && r.parent;) (Mi(r.parent.vnode) && vl(s, t, n, r), (r = r.parent));
    }
}
function vl(e, t, n, s) {
    const r = Fn(t, e, s, !0);
    Ls(() => {
        Ss(s[t], r);
    }, n);
}
function Fn(e, t, n = ue, s = !1) {
    if (n) {
        const r = n[e] || (n[e] = []),
            i =
                t.__weh ||
                (t.__weh = (...o) => {
                    Qe();
                    const l = dn(n),
                        c = We(t, n, e, o);
                    return (l(), Xe(), c);
                });
        return (s ? r.unshift(i) : r.push(i), i);
    }
}
const tt =
        (e) =>
        (t, n = ue) => {
            (!ln || e === 'sp') && Fn(e, (...s) => t(...s), n);
        },
    bl = tt('bm'),
    Ti = tt('m'),
    Ii = tt('bu'),
    _l = tt('u'),
    wl = tt('bum'),
    Ls = tt('um'),
    Sl = tt('sp'),
    El = tt('rtg'),
    Cl = tt('rtc');
function xl(e, t = ue) {
    Fn('ec', e, t);
}
const Pl = 'components';
function Rl(e, t) {
    return Al(Pl, e, !0, t) || e;
}
const Ml = Symbol.for('v-ndc');
function Al(e, t, n = !0, s = !1) {
    const r = me || ue;
    if (r) {
        const i = r.type;
        {
            const l = gc(i, !1);
            if (l && (l === t || l === Pe(t) || l === On(Pe(t)))) return i;
        }
        const o = Qs(r[e] || i[e], t) || Qs(r.appContext[e], t);
        return !o && s ? i : o;
    }
}
function Qs(e, t) {
    return e && (e[t] || e[Pe(t)] || e[On(Pe(t))]);
}
function Xs(e, t, n, s) {
    let r;
    const i = n,
        o = V(e);
    if (o || re(e)) {
        const l = o && At(e);
        let c = !1,
            d = !1;
        (l && ((c = !xe(e)), (d = ft(e)), (e = $n(e))), (r = new Array(e.length)));
        for (let u = 0, h = e.length; u < h; u++)
            r[u] = t(c ? (d ? wn(ce(e[u])) : ce(e[u])) : e[u], u, void 0, i);
    } else if (typeof e == 'number') {
        r = new Array(e);
        for (let l = 0; l < e; l++) r[l] = t(l + 1, l, void 0, i);
    } else if (ne(e))
        if (e[Symbol.iterator]) r = Array.from(e, (l, c) => t(l, c, void 0, i));
        else {
            const l = Object.keys(e);
            r = new Array(l.length);
            for (let c = 0, d = l.length; c < d; c++) {
                const u = l[c];
                r[c] = t(e[u], u, c, i);
            }
        }
    else r = [];
    return r;
}
function Tl(e, t, n = {}, s, r) {
    if (me.ce || (me.parent && It(me.parent) && me.parent.ce))
        return (D(), Rn(X, null, [oe('slot', n, s)], 64));
    let i = e[t];
    (i && i._c && (i._d = !1), D());
    const o = i && ki(i(n)),
        l = n.key || (o && o.key),
        c = Rn(
            X,
            { key: (l && !et(l) ? l : `_${t}`) + (!o && s ? '_fb' : '') },
            o || [],
            o && e._ === 1 ? 64 : -2,
        );
    return (i && i._c && (i._d = !0), c);
}
function ki(e) {
    return e.some((t) => (on(t) ? !(t.type === Ze || (t.type === X && !ki(t.children))) : !0))
        ? e
        : null;
}
const as = (e) => (e ? (Zi(e) ? Vs(e) : as(e.parent)) : null),
    Yt = de(Object.create(null), {
        $: (e) => e,
        $el: (e) => e.vnode.el,
        $data: (e) => e.data,
        $props: (e) => e.props,
        $attrs: (e) => e.attrs,
        $slots: (e) => e.slots,
        $refs: (e) => e.refs,
        $parent: (e) => as(e.parent),
        $root: (e) => as(e.root),
        $host: (e) => e.ce,
        $emit: (e) => e.emit,
        $options: (e) => Li(e),
        $forceUpdate: (e) =>
            e.f ||
            (e.f = () => {
                ks(e.update);
            }),
        $nextTick: (e) => e.n || (e.n = bi.bind(e.proxy)),
        $watch: (e) => Ql.bind(e),
    }),
    Jn = (e, t) => e !== te && !e.__isScriptSetup && z(e, t),
    Il = {
        get({ _: e }, t) {
            if (t === '__v_skip') return !0;
            const {
                ctx: n,
                setupState: s,
                data: r,
                props: i,
                accessCache: o,
                type: l,
                appContext: c,
            } = e;
            let d;
            if (t[0] !== '$') {
                const g = o[t];
                if (g !== void 0)
                    switch (g) {
                        case 1:
                            return s[t];
                        case 2:
                            return r[t];
                        case 4:
                            return n[t];
                        case 3:
                            return i[t];
                    }
                else {
                    if (Jn(s, t)) return ((o[t] = 1), s[t]);
                    if (r !== te && z(r, t)) return ((o[t] = 2), r[t]);
                    if ((d = e.propsOptions[0]) && z(d, t)) return ((o[t] = 3), i[t]);
                    if (n !== te && z(n, t)) return ((o[t] = 4), n[t]);
                    us && (o[t] = 0);
                }
            }
            const u = Yt[t];
            let h, m;
            if (u) return (t === '$attrs' && ae(e.attrs, 'get', ''), u(e));
            if ((h = l.__cssModules) && (h = h[t])) return h;
            if (n !== te && z(n, t)) return ((o[t] = 4), n[t]);
            if (((m = c.config.globalProperties), z(m, t))) return m[t];
        },
        set({ _: e }, t, n) {
            const { data: s, setupState: r, ctx: i } = e;
            return Jn(r, t)
                ? ((r[t] = n), !0)
                : s !== te && z(s, t)
                  ? ((s[t] = n), !0)
                  : z(e.props, t) || (t[0] === '$' && t.slice(1) in e)
                    ? !1
                    : ((i[t] = n), !0);
        },
        has(
            {
                _: {
                    data: e,
                    setupState: t,
                    accessCache: n,
                    ctx: s,
                    appContext: r,
                    propsOptions: i,
                },
            },
            o,
        ) {
            let l;
            return (
                !!n[o] ||
                (e !== te && z(e, o)) ||
                Jn(t, o) ||
                ((l = i[0]) && z(l, o)) ||
                z(s, o) ||
                z(Yt, o) ||
                z(r.config.globalProperties, o)
            );
        },
        defineProperty(e, t, n) {
            return (
                n.get != null
                    ? (e._.accessCache[t] = 0)
                    : z(n, 'value') && this.set(e, t, n.value, null),
                Reflect.defineProperty(e, t, n)
            );
        },
    };
function Zs(e) {
    return V(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let us = !0;
function kl(e) {
    const t = Li(e),
        n = e.proxy,
        s = e.ctx;
    ((us = !1), t.beforeCreate && er(t.beforeCreate, e, 'bc'));
    const {
        data: r,
        computed: i,
        methods: o,
        watch: l,
        provide: c,
        inject: d,
        created: u,
        beforeMount: h,
        mounted: m,
        beforeUpdate: g,
        updated: M,
        activated: A,
        deactivated: H,
        beforeDestroy: U,
        beforeUnmount: k,
        destroyed: $,
        unmounted: T,
        render: J,
        renderTracked: le,
        renderTriggered: se,
        errorCaptured: ke,
        serverPrefetch: nt,
        expose: Oe,
        inheritAttrs: st,
        components: dt,
        directives: Le,
        filters: Ht,
    } = t;
    if ((d && Ol(d, s, null), o))
        for (const q in o) {
            const B = o[q];
            F(B) && (s[q] = B.bind(n));
        }
    if (r) {
        const q = r.call(n, n);
        ne(q) && (e.data = Nn(q));
    }
    if (((us = !0), i))
        for (const q in i) {
            const B = i[q],
                ze = F(B) ? B.bind(n, n) : F(B.get) ? B.get.bind(n, n) : Ae,
                rt = !F(B) && F(B.set) ? B.set.bind(n) : Ae,
                Ue = Re({ get: ze, set: rt });
            Object.defineProperty(s, q, {
                enumerable: !0,
                configurable: !0,
                get: () => Ue.value,
                set: (ge) => (Ue.value = ge),
            });
        }
    if (l) for (const q in l) Oi(l[q], s, n, q);
    if (c) {
        const q = F(c) ? c.call(n) : c;
        Reflect.ownKeys(q).forEach((B) => {
            Ot(B, q[B]);
        });
    }
    u && er(u, e, 'c');
    function ie(q, B) {
        V(B) ? B.forEach((ze) => q(ze.bind(n))) : B && q(B.bind(n));
    }
    if (
        (ie(bl, h),
        ie(Ti, m),
        ie(Ii, g),
        ie(_l, M),
        ie(gl, A),
        ie(yl, H),
        ie(xl, ke),
        ie(Cl, le),
        ie(El, se),
        ie(wl, k),
        ie(Ls, T),
        ie(Sl, nt),
        V(Oe))
    )
        if (Oe.length) {
            const q = e.exposed || (e.exposed = {});
            Oe.forEach((B) => {
                Object.defineProperty(q, B, {
                    get: () => n[B],
                    set: (ze) => (n[B] = ze),
                    enumerable: !0,
                });
            });
        } else e.exposed || (e.exposed = {});
    (J && e.render === Ae && (e.render = J),
        st != null && (e.inheritAttrs = st),
        dt && (e.components = dt),
        Le && (e.directives = Le),
        nt && Ri(e));
}
function Ol(e, t, n = Ae) {
    V(e) && (e = fs(e));
    for (const s in e) {
        const r = e[s];
        let i;
        (ne(r)
            ? 'default' in r
                ? (i = Ke(r.from || s, r.default, !0))
                : (i = Ke(r.from || s))
            : (i = Ke(r)),
            fe(i)
                ? Object.defineProperty(t, s, {
                      enumerable: !0,
                      configurable: !0,
                      get: () => i.value,
                      set: (o) => (i.value = o),
                  })
                : (t[s] = i));
    }
}
function er(e, t, n) {
    We(V(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function Oi(e, t, n, s) {
    let r = s.includes('.') ? Gi(n, s) : () => n[s];
    if (re(e)) {
        const i = t[e];
        F(i) && Qt(r, i);
    } else if (F(e)) Qt(r, e.bind(n));
    else if (ne(e))
        if (V(e)) e.forEach((i) => Oi(i, t, n, s));
        else {
            const i = F(e.handler) ? e.handler.bind(n) : t[e.handler];
            F(i) && Qt(r, i, e);
        }
}
function Li(e) {
    const t = e.type,
        { mixins: n, extends: s } = t,
        {
            mixins: r,
            optionsCache: i,
            config: { optionMergeStrategies: o },
        } = e.appContext,
        l = i.get(t);
    let c;
    return (
        l
            ? (c = l)
            : !r.length && !n && !s
              ? (c = t)
              : ((c = {}), r.length && r.forEach((d) => Pn(c, d, o, !0)), Pn(c, t, o)),
        ne(t) && i.set(t, c),
        c
    );
}
function Pn(e, t, n, s = !1) {
    const { mixins: r, extends: i } = t;
    (i && Pn(e, i, n, !0), r && r.forEach((o) => Pn(e, o, n, !0)));
    for (const o in t)
        if (!(s && o === 'expose')) {
            const l = Ll[o] || (n && n[o]);
            e[o] = l ? l(e[o], t[o]) : t[o];
        }
    return e;
}
const Ll = {
    data: tr,
    props: nr,
    emits: nr,
    methods: Wt,
    computed: Wt,
    beforeCreate: he,
    created: he,
    beforeMount: he,
    mounted: he,
    beforeUpdate: he,
    updated: he,
    beforeDestroy: he,
    beforeUnmount: he,
    destroyed: he,
    unmounted: he,
    activated: he,
    deactivated: he,
    errorCaptured: he,
    serverPrefetch: he,
    components: Wt,
    directives: Wt,
    watch: $l,
    provide: tr,
    inject: Ul,
};
function tr(e, t) {
    return t
        ? e
            ? function () {
                  return de(F(e) ? e.call(this, this) : e, F(t) ? t.call(this, this) : t);
              }
            : t
        : e;
}
function Ul(e, t) {
    return Wt(fs(e), fs(t));
}
function fs(e) {
    if (V(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
        return t;
    }
    return e;
}
function he(e, t) {
    return e ? [...new Set([].concat(e, t))] : t;
}
function Wt(e, t) {
    return e ? de(Object.create(null), e, t) : t;
}
function nr(e, t) {
    return e
        ? V(e) && V(t)
            ? [...new Set([...e, ...t])]
            : de(Object.create(null), Zs(e), Zs(t ?? {}))
        : t;
}
function $l(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = de(Object.create(null), e);
    for (const s in t) n[s] = he(e[s], t[s]);
    return n;
}
function Ui() {
    return {
        app: null,
        config: {
            isNativeTag: xo,
            performance: !1,
            globalProperties: {},
            optionMergeStrategies: {},
            errorHandler: void 0,
            warnHandler: void 0,
            compilerOptions: {},
        },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap(),
        propsCache: new WeakMap(),
        emitsCache: new WeakMap(),
    };
}
let Nl = 0;
function Vl(e, t) {
    return function (s, r = null) {
        (F(s) || (s = de({}, s)), r != null && !ne(r) && (r = null));
        const i = Ui(),
            o = new WeakSet(),
            l = [];
        let c = !1;
        const d = (i.app = {
            _uid: Nl++,
            _component: s,
            _props: r,
            _container: null,
            _context: i,
            _instance: null,
            version: vc,
            get config() {
                return i.config;
            },
            set config(u) {},
            use(u, ...h) {
                return (
                    o.has(u) ||
                        (u && F(u.install)
                            ? (o.add(u), u.install(d, ...h))
                            : F(u) && (o.add(u), u(d, ...h))),
                    d
                );
            },
            mixin(u) {
                return (i.mixins.includes(u) || i.mixins.push(u), d);
            },
            component(u, h) {
                return h ? ((i.components[u] = h), d) : i.components[u];
            },
            directive(u, h) {
                return h ? ((i.directives[u] = h), d) : i.directives[u];
            },
            mount(u, h, m) {
                if (!c) {
                    const g = d._ceVNode || oe(s, r);
                    return (
                        (g.appContext = i),
                        m === !0 ? (m = 'svg') : m === !1 && (m = void 0),
                        e(g, u, m),
                        (c = !0),
                        (d._container = u),
                        (u.__vue_app__ = d),
                        Vs(g.component)
                    );
                }
            },
            onUnmount(u) {
                l.push(u);
            },
            unmount() {
                c &&
                    (We(l, d._instance, 16),
                    e(null, d._container),
                    delete d._container.__vue_app__);
            },
            provide(u, h) {
                return ((i.provides[u] = h), d);
            },
            runWithContext(u) {
                const h = kt;
                kt = d;
                try {
                    return u();
                } finally {
                    kt = h;
                }
            },
        });
        return d;
    };
}
let kt = null;
function Ot(e, t) {
    if (ue) {
        let n = ue.provides;
        const s = ue.parent && ue.parent.provides;
        (s === n && (n = ue.provides = Object.create(s)), (n[e] = t));
    }
}
function Ke(e, t, n = !1) {
    const s = Xi();
    if (s || kt) {
        let r = kt
            ? kt._context.provides
            : s
              ? s.parent == null || s.ce
                  ? s.vnode.appContext && s.vnode.appContext.provides
                  : s.parent.provides
              : void 0;
        if (r && e in r) return r[e];
        if (arguments.length > 1) return n && F(t) ? t.call(s && s.proxy) : t;
    }
}
const $i = {},
    Ni = () => Object.create($i),
    Vi = (e) => Object.getPrototypeOf(e) === $i;
function Fl(e, t, n, s = !1) {
    const r = {},
        i = Ni();
    ((e.propsDefaults = Object.create(null)), Fi(e, t, r, i));
    for (const o in e.propsOptions[0]) o in r || (r[o] = void 0);
    (n ? (e.props = s ? r : pi(r)) : e.type.props ? (e.props = r) : (e.props = i), (e.attrs = i));
}
function Hl(e, t, n, s) {
    const {
            props: r,
            attrs: i,
            vnode: { patchFlag: o },
        } = e,
        l = W(r),
        [c] = e.propsOptions;
    let d = !1;
    if ((s || o > 0) && !(o & 16)) {
        if (o & 8) {
            const u = e.vnode.dynamicProps;
            for (let h = 0; h < u.length; h++) {
                let m = u[h];
                if (Hn(e.emitsOptions, m)) continue;
                const g = t[m];
                if (c)
                    if (z(i, m)) g !== i[m] && ((i[m] = g), (d = !0));
                    else {
                        const M = Pe(m);
                        r[M] = ds(c, l, M, g, e, !1);
                    }
                else g !== i[m] && ((i[m] = g), (d = !0));
            }
        }
    } else {
        Fi(e, t, r, i) && (d = !0);
        let u;
        for (const h in l)
            (!t || (!z(t, h) && ((u = bt(h)) === h || !z(t, u)))) &&
                (c
                    ? n &&
                      (n[h] !== void 0 || n[u] !== void 0) &&
                      (r[h] = ds(c, l, h, void 0, e, !0))
                    : delete r[h]);
        if (i !== l) for (const h in i) (!t || !z(t, h)) && (delete i[h], (d = !0));
    }
    d && Ye(e.attrs, 'set', '');
}
function Fi(e, t, n, s) {
    const [r, i] = e.propsOptions;
    let o = !1,
        l;
    if (t)
        for (let c in t) {
            if (zt(c)) continue;
            const d = t[c];
            let u;
            r && z(r, (u = Pe(c)))
                ? !i || !i.includes(u)
                    ? (n[u] = d)
                    : ((l || (l = {}))[u] = d)
                : Hn(e.emitsOptions, c) || ((!(c in s) || d !== s[c]) && ((s[c] = d), (o = !0)));
        }
    if (i) {
        const c = W(n),
            d = l || te;
        for (let u = 0; u < i.length; u++) {
            const h = i[u];
            n[h] = ds(r, c, h, d[h], e, !z(d, h));
        }
    }
    return o;
}
function ds(e, t, n, s, r, i) {
    const o = e[n];
    if (o != null) {
        const l = z(o, 'default');
        if (l && s === void 0) {
            const c = o.default;
            if (o.type !== Function && !o.skipFactory && F(c)) {
                const { propsDefaults: d } = r;
                if (n in d) s = d[n];
                else {
                    const u = dn(r);
                    ((s = d[n] = c.call(null, t)), u());
                }
            } else s = c;
            r.ce && r.ce._setProp(n, s);
        }
        o[0] && (i && !l ? (s = !1) : o[1] && (s === '' || s === bt(n)) && (s = !0));
    }
    return s;
}
const jl = new WeakMap();
function Hi(e, t, n = !1) {
    const s = n ? jl : t.propsCache,
        r = s.get(e);
    if (r) return r;
    const i = e.props,
        o = {},
        l = [];
    let c = !1;
    if (!F(e)) {
        const u = (h) => {
            c = !0;
            const [m, g] = Hi(h, t, !0);
            (de(o, m), g && l.push(...g));
        };
        (!n && t.mixins.length && t.mixins.forEach(u),
            e.extends && u(e.extends),
            e.mixins && e.mixins.forEach(u));
    }
    if (!i && !c) return (ne(e) && s.set(e, Rt), Rt);
    if (V(i))
        for (let u = 0; u < i.length; u++) {
            const h = Pe(i[u]);
            sr(h) && (o[h] = te);
        }
    else if (i)
        for (const u in i) {
            const h = Pe(u);
            if (sr(h)) {
                const m = i[u],
                    g = (o[h] = V(m) || F(m) ? { type: m } : de({}, m)),
                    M = g.type;
                let A = !1,
                    H = !0;
                if (V(M))
                    for (let U = 0; U < M.length; ++U) {
                        const k = M[U],
                            $ = F(k) && k.name;
                        if ($ === 'Boolean') {
                            A = !0;
                            break;
                        } else $ === 'String' && (H = !1);
                    }
                else A = F(M) && M.name === 'Boolean';
                ((g[0] = A), (g[1] = H), (A || z(g, 'default')) && l.push(h));
            }
        }
    const d = [o, l];
    return (ne(e) && s.set(e, d), d);
}
function sr(e) {
    return e[0] !== '$' && !zt(e);
}
const Us = (e) => e === '_' || e === '__' || e === '_ctx' || e === '$stable',
    $s = (e) => (V(e) ? e.map(je) : [je(e)]),
    Dl = (e, t, n) => {
        if (t._n) return t;
        const s = xi((...r) => $s(t(...r)), n);
        return ((s._c = !1), s);
    },
    ji = (e, t, n) => {
        const s = e._ctx;
        for (const r in e) {
            if (Us(r)) continue;
            const i = e[r];
            if (F(i)) t[r] = Dl(r, i, s);
            else if (i != null) {
                const o = $s(i);
                t[r] = () => o;
            }
        }
    },
    Di = (e, t) => {
        const n = $s(t);
        e.slots.default = () => n;
    },
    Bi = (e, t, n) => {
        for (const s in t) (n || !Us(s)) && (e[s] = t[s]);
    },
    Bl = (e, t, n) => {
        const s = (e.slots = Ni());
        if (e.vnode.shapeFlag & 32) {
            const r = t.__;
            r && rs(s, '__', r, !0);
            const i = t._;
            i ? (Bi(s, t, n), n && rs(s, '_', i, !0)) : ji(t, s);
        } else t && Di(e, t);
    },
    Kl = (e, t, n) => {
        const { vnode: s, slots: r } = e;
        let i = !0,
            o = te;
        if (s.shapeFlag & 32) {
            const l = t._;
            (l ? (n && l === 1 ? (i = !1) : Bi(r, t, n)) : ((i = !t.$stable), ji(t, r)), (o = t));
        } else t && (Di(e, t), (o = { default: 1 }));
        if (i) for (const l in r) !Us(l) && o[l] == null && delete r[l];
    },
    we = rc;
function Wl(e) {
    return zl(e);
}
function zl(e, t) {
    const n = Ln();
    n.__VUE__ = !0;
    const {
            insert: s,
            remove: r,
            patchProp: i,
            createElement: o,
            createText: l,
            createComment: c,
            setText: d,
            setElementText: u,
            parentNode: h,
            nextSibling: m,
            setScopeId: g = Ae,
            insertStaticContent: M,
        } = e,
        A = (
            a,
            f,
            p,
            y = null,
            _ = null,
            b = null,
            C = void 0,
            E = null,
            S = !!f.dynamicChildren,
        ) => {
            if (a === f) return;
            (a && !Bt(a, f) && ((y = v(a)), ge(a, _, b, !0), (a = null)),
                f.patchFlag === -2 && ((S = !1), (f.dynamicChildren = null)));
            const { type: w, ref: L, shapeFlag: P } = f;
            switch (w) {
                case jn:
                    H(a, f, p, y);
                    break;
                case Ze:
                    U(a, f, p, y);
                    break;
                case vn:
                    a == null && k(f, p, y, C);
                    break;
                case X:
                    dt(a, f, p, y, _, b, C, E, S);
                    break;
                default:
                    P & 1
                        ? J(a, f, p, y, _, b, C, E, S)
                        : P & 6
                          ? Le(a, f, p, y, _, b, C, E, S)
                          : (P & 64 || P & 128) && w.process(a, f, p, y, _, b, C, E, S, I);
            }
            L != null && _
                ? Jt(L, a && a.ref, b, f || a, !f)
                : L == null && a && a.ref != null && Jt(a.ref, null, b, a, !0);
        },
        H = (a, f, p, y) => {
            if (a == null) s((f.el = l(f.children)), p, y);
            else {
                const _ = (f.el = a.el);
                f.children !== a.children && d(_, f.children);
            }
        },
        U = (a, f, p, y) => {
            a == null ? s((f.el = c(f.children || '')), p, y) : (f.el = a.el);
        },
        k = (a, f, p, y) => {
            [a.el, a.anchor] = M(a.children, f, p, y, a.el, a.anchor);
        },
        $ = ({ el: a, anchor: f }, p, y) => {
            let _;
            for (; a && a !== f;) ((_ = m(a)), s(a, p, y), (a = _));
            s(f, p, y);
        },
        T = ({ el: a, anchor: f }) => {
            let p;
            for (; a && a !== f;) ((p = m(a)), r(a), (a = p));
            r(f);
        },
        J = (a, f, p, y, _, b, C, E, S) => {
            (f.type === 'svg' ? (C = 'svg') : f.type === 'math' && (C = 'mathml'),
                a == null ? le(f, p, y, _, b, C, E, S) : nt(a, f, _, b, C, E, S));
        },
        le = (a, f, p, y, _, b, C, E) => {
            let S, w;
            const { props: L, shapeFlag: P, transition: O, dirs: N } = a;
            if (
                ((S = a.el = o(a.type, b, L && L.is, L)),
                P & 8 ? u(S, a.children) : P & 16 && ke(a.children, S, null, y, _, Yn(a, b), C, E),
                N && ht(a, null, y, 'created'),
                se(S, a, a.scopeId, C, y),
                L)
            ) {
                for (const Z in L) Z !== 'value' && !zt(Z) && i(S, Z, null, L[Z], b, y);
                ('value' in L && i(S, 'value', null, L.value, b),
                    (w = L.onVnodeBeforeMount) && Fe(w, y, a));
            }
            N && ht(a, null, y, 'beforeMount');
            const j = Gl(_, O);
            (j && O.beforeEnter(S),
                s(S, f, p),
                ((w = L && L.onVnodeMounted) || j || N) &&
                    we(() => {
                        (w && Fe(w, y, a), j && O.enter(S), N && ht(a, null, y, 'mounted'));
                    }, _));
        },
        se = (a, f, p, y, _) => {
            if ((p && g(a, p), y)) for (let b = 0; b < y.length; b++) g(a, y[b]);
            if (_) {
                let b = _.subTree;
                if (f === b || (Ji(b.type) && (b.ssContent === f || b.ssFallback === f))) {
                    const C = _.vnode;
                    se(a, C, C.scopeId, C.slotScopeIds, _.parent);
                }
            }
        },
        ke = (a, f, p, y, _, b, C, E, S = 0) => {
            for (let w = S; w < a.length; w++) {
                const L = (a[w] = E ? lt(a[w]) : je(a[w]));
                A(null, L, f, p, y, _, b, C, E);
            }
        },
        nt = (a, f, p, y, _, b, C) => {
            const E = (f.el = a.el);
            let { patchFlag: S, dynamicChildren: w, dirs: L } = f;
            S |= a.patchFlag & 16;
            const P = a.props || te,
                O = f.props || te;
            let N;
            if (
                (p && pt(p, !1),
                (N = O.onVnodeBeforeUpdate) && Fe(N, p, f, a),
                L && ht(f, a, p, 'beforeUpdate'),
                p && pt(p, !0),
                ((P.innerHTML && O.innerHTML == null) ||
                    (P.textContent && O.textContent == null)) &&
                    u(E, ''),
                w
                    ? Oe(a.dynamicChildren, w, E, p, y, Yn(f, _), b)
                    : C || B(a, f, E, null, p, y, Yn(f, _), b, !1),
                S > 0)
            ) {
                if (S & 16) st(E, P, O, p, _);
                else if (
                    (S & 2 && P.class !== O.class && i(E, 'class', null, O.class, _),
                    S & 4 && i(E, 'style', P.style, O.style, _),
                    S & 8)
                ) {
                    const j = f.dynamicProps;
                    for (let Z = 0; Z < j.length; Z++) {
                        const G = j[Z],
                            ye = P[G],
                            ve = O[G];
                        (ve !== ye || G === 'value') && i(E, G, ye, ve, _, p);
                    }
                }
                S & 1 && a.children !== f.children && u(E, f.children);
            } else !C && w == null && st(E, P, O, p, _);
            ((N = O.onVnodeUpdated) || L) &&
                we(() => {
                    (N && Fe(N, p, f, a), L && ht(f, a, p, 'updated'));
                }, y);
        },
        Oe = (a, f, p, y, _, b, C) => {
            for (let E = 0; E < f.length; E++) {
                const S = a[E],
                    w = f[E],
                    L = S.el && (S.type === X || !Bt(S, w) || S.shapeFlag & 198) ? h(S.el) : p;
                A(S, w, L, null, y, _, b, C, !0);
            }
        },
        st = (a, f, p, y, _) => {
            if (f !== p) {
                if (f !== te) for (const b in f) !zt(b) && !(b in p) && i(a, b, f[b], null, _, y);
                for (const b in p) {
                    if (zt(b)) continue;
                    const C = p[b],
                        E = f[b];
                    C !== E && b !== 'value' && i(a, b, E, C, _, y);
                }
                'value' in p && i(a, 'value', f.value, p.value, _);
            }
        },
        dt = (a, f, p, y, _, b, C, E, S) => {
            const w = (f.el = a ? a.el : l('')),
                L = (f.anchor = a ? a.anchor : l(''));
            let { patchFlag: P, dynamicChildren: O, slotScopeIds: N } = f;
            (N && (E = E ? E.concat(N) : N),
                a == null
                    ? (s(w, p, y), s(L, p, y), ke(f.children || [], p, L, _, b, C, E, S))
                    : P > 0 && P & 64 && O && a.dynamicChildren
                      ? (Oe(a.dynamicChildren, O, p, _, b, C, E),
                        (f.key != null || (_ && f === _.subTree)) && Ki(a, f, !0))
                      : B(a, f, p, L, _, b, C, E, S));
        },
        Le = (a, f, p, y, _, b, C, E, S) => {
            ((f.slotScopeIds = E),
                a == null
                    ? f.shapeFlag & 512
                        ? _.ctx.activate(f, p, y, C, S)
                        : Ht(f, p, y, _, b, C, S)
                    : wt(a, f, S));
        },
        Ht = (a, f, p, y, _, b, C) => {
            const E = (a.component = fc(a, y, _));
            if ((Mi(a) && (E.ctx.renderer = I), dc(E, !1, C), E.asyncDep)) {
                if ((_ && _.registerDep(E, ie, C), !a.el)) {
                    const S = (E.subTree = oe(Ze));
                    (U(null, S, f, p), (a.placeholder = S.el));
                }
            } else ie(E, a, f, p, _, b, C);
        },
        wt = (a, f, p) => {
            const y = (f.component = a.component);
            if (nc(a, f, p))
                if (y.asyncDep && !y.asyncResolved) {
                    q(y, f, p);
                    return;
                } else ((y.next = f), y.update());
            else ((f.el = a.el), (y.vnode = f));
        },
        ie = (a, f, p, y, _, b, C) => {
            const E = () => {
                if (a.isMounted) {
                    let { next: P, bu: O, u: N, parent: j, vnode: Z } = a;
                    {
                        const Ne = Wi(a);
                        if (Ne) {
                            (P && ((P.el = Z.el), q(a, P, C)),
                                Ne.asyncDep.then(() => {
                                    a.isUnmounted || E();
                                }));
                            return;
                        }
                    }
                    let G = P,
                        ye;
                    (pt(a, !1),
                        P ? ((P.el = Z.el), q(a, P, C)) : (P = Z),
                        O && Kn(O),
                        (ye = P.props && P.props.onVnodeBeforeUpdate) && Fe(ye, j, P, Z),
                        pt(a, !0));
                    const ve = ir(a),
                        $e = a.subTree;
                    ((a.subTree = ve),
                        A($e, ve, h($e.el), v($e), a, _, b),
                        (P.el = ve.el),
                        G === null && sc(a, ve.el),
                        N && we(N, _),
                        (ye = P.props && P.props.onVnodeUpdated) && we(() => Fe(ye, j, P, Z), _));
                } else {
                    let P;
                    const { el: O, props: N } = f,
                        { bm: j, m: Z, parent: G, root: ye, type: ve } = a,
                        $e = It(f);
                    (pt(a, !1),
                        j && Kn(j),
                        !$e && (P = N && N.onVnodeBeforeMount) && Fe(P, G, f),
                        pt(a, !0));
                    {
                        ye.ce && ye.ce._def.shadowRoot !== !1 && ye.ce._injectChildStyle(ve);
                        const Ne = (a.subTree = ir(a));
                        (A(null, Ne, p, y, a, _, b), (f.el = Ne.el));
                    }
                    if ((Z && we(Z, _), !$e && (P = N && N.onVnodeMounted))) {
                        const Ne = f;
                        we(() => Fe(P, G, Ne), _);
                    }
                    ((f.shapeFlag & 256 || (G && It(G.vnode) && G.vnode.shapeFlag & 256)) &&
                        a.a &&
                        we(a.a, _),
                        (a.isMounted = !0),
                        (f = p = y = null));
                }
            };
            a.scope.on();
            const S = (a.effect = new ei(E));
            a.scope.off();
            const w = (a.update = S.run.bind(S)),
                L = (a.job = S.runIfDirty.bind(S));
            ((L.i = a), (L.id = a.uid), (S.scheduler = () => ks(L)), pt(a, !0), w());
        },
        q = (a, f, p) => {
            f.component = a;
            const y = a.vnode.props;
            ((a.vnode = f),
                (a.next = null),
                Hl(a, f.props, y, p),
                Kl(a, f.children, p),
                Qe(),
                Ys(a),
                Xe());
        },
        B = (a, f, p, y, _, b, C, E, S = !1) => {
            const w = a && a.children,
                L = a ? a.shapeFlag : 0,
                P = f.children,
                { patchFlag: O, shapeFlag: N } = f;
            if (O > 0) {
                if (O & 128) {
                    rt(w, P, p, y, _, b, C, E, S);
                    return;
                } else if (O & 256) {
                    ze(w, P, p, y, _, b, C, E, S);
                    return;
                }
            }
            N & 8
                ? (L & 16 && Ce(w, _, b), P !== w && u(p, P))
                : L & 16
                  ? N & 16
                      ? rt(w, P, p, y, _, b, C, E, S)
                      : Ce(w, _, b, !0)
                  : (L & 8 && u(p, ''), N & 16 && ke(P, p, y, _, b, C, E, S));
        },
        ze = (a, f, p, y, _, b, C, E, S) => {
            ((a = a || Rt), (f = f || Rt));
            const w = a.length,
                L = f.length,
                P = Math.min(w, L);
            let O;
            for (O = 0; O < P; O++) {
                const N = (f[O] = S ? lt(f[O]) : je(f[O]));
                A(a[O], N, p, null, _, b, C, E, S);
            }
            w > L ? Ce(a, _, b, !0, !1, P) : ke(f, p, y, _, b, C, E, S, P);
        },
        rt = (a, f, p, y, _, b, C, E, S) => {
            let w = 0;
            const L = f.length;
            let P = a.length - 1,
                O = L - 1;
            for (; w <= P && w <= O;) {
                const N = a[w],
                    j = (f[w] = S ? lt(f[w]) : je(f[w]));
                if (Bt(N, j)) A(N, j, p, null, _, b, C, E, S);
                else break;
                w++;
            }
            for (; w <= P && w <= O;) {
                const N = a[P],
                    j = (f[O] = S ? lt(f[O]) : je(f[O]));
                if (Bt(N, j)) A(N, j, p, null, _, b, C, E, S);
                else break;
                (P--, O--);
            }
            if (w > P) {
                if (w <= O) {
                    const N = O + 1,
                        j = N < L ? f[N].el : y;
                    for (; w <= O;)
                        (A(null, (f[w] = S ? lt(f[w]) : je(f[w])), p, j, _, b, C, E, S), w++);
                }
            } else if (w > O) for (; w <= P;) (ge(a[w], _, b, !0), w++);
            else {
                const N = w,
                    j = w,
                    Z = new Map();
                for (w = j; w <= O; w++) {
                    const _e = (f[w] = S ? lt(f[w]) : je(f[w]));
                    _e.key != null && Z.set(_e.key, w);
                }
                let G,
                    ye = 0;
                const ve = O - j + 1;
                let $e = !1,
                    Ne = 0;
                const jt = new Array(ve);
                for (w = 0; w < ve; w++) jt[w] = 0;
                for (w = N; w <= P; w++) {
                    const _e = a[w];
                    if (ye >= ve) {
                        ge(_e, _, b, !0);
                        continue;
                    }
                    let Ve;
                    if (_e.key != null) Ve = Z.get(_e.key);
                    else
                        for (G = j; G <= O; G++)
                            if (jt[G - j] === 0 && Bt(_e, f[G])) {
                                Ve = G;
                                break;
                            }
                    Ve === void 0
                        ? ge(_e, _, b, !0)
                        : ((jt[Ve - j] = w + 1),
                          Ve >= Ne ? (Ne = Ve) : ($e = !0),
                          A(_e, f[Ve], p, null, _, b, C, E, S),
                          ye++);
                }
                const Ks = $e ? ql(jt) : Rt;
                for (G = Ks.length - 1, w = ve - 1; w >= 0; w--) {
                    const _e = j + w,
                        Ve = f[_e],
                        Ws = f[_e + 1],
                        zs = _e + 1 < L ? Ws.el || Ws.placeholder : y;
                    jt[w] === 0
                        ? A(null, Ve, p, zs, _, b, C, E, S)
                        : $e && (G < 0 || w !== Ks[G] ? Ue(Ve, p, zs, 2) : G--);
                }
            }
        },
        Ue = (a, f, p, y, _ = null) => {
            const { el: b, type: C, transition: E, children: S, shapeFlag: w } = a;
            if (w & 6) {
                Ue(a.component.subTree, f, p, y);
                return;
            }
            if (w & 128) {
                a.suspense.move(f, p, y);
                return;
            }
            if (w & 64) {
                C.move(a, f, p, I);
                return;
            }
            if (C === X) {
                s(b, f, p);
                for (let P = 0; P < S.length; P++) Ue(S[P], f, p, y);
                s(a.anchor, f, p);
                return;
            }
            if (C === vn) {
                $(a, f, p);
                return;
            }
            if (y !== 2 && w & 1 && E)
                if (y === 0) (E.beforeEnter(b), s(b, f, p), we(() => E.enter(b), _));
                else {
                    const { leave: P, delayLeave: O, afterLeave: N } = E,
                        j = () => {
                            a.ctx.isUnmounted ? r(b) : s(b, f, p);
                        },
                        Z = () => {
                            P(b, () => {
                                (j(), N && N());
                            });
                        };
                    O ? O(b, j, Z) : Z();
                }
            else s(b, f, p);
        },
        ge = (a, f, p, y = !1, _ = !1) => {
            const {
                type: b,
                props: C,
                ref: E,
                children: S,
                dynamicChildren: w,
                shapeFlag: L,
                patchFlag: P,
                dirs: O,
                cacheIndex: N,
            } = a;
            if (
                (P === -2 && (_ = !1),
                E != null && (Qe(), Jt(E, null, p, a, !0), Xe()),
                N != null && (f.renderCache[N] = void 0),
                L & 256)
            ) {
                f.ctx.deactivate(a);
                return;
            }
            const j = L & 1 && O,
                Z = !It(a);
            let G;
            if ((Z && (G = C && C.onVnodeBeforeUnmount) && Fe(G, f, a), L & 6))
                hn(a.component, p, y);
            else {
                if (L & 128) {
                    a.suspense.unmount(p, y);
                    return;
                }
                (j && ht(a, null, f, 'beforeUnmount'),
                    L & 64
                        ? a.type.remove(a, f, p, I, y)
                        : w && !w.hasOnce && (b !== X || (P > 0 && P & 64))
                          ? Ce(w, f, p, !1, !0)
                          : ((b === X && P & 384) || (!_ && L & 16)) && Ce(S, f, p),
                    y && St(a));
            }
            ((Z && (G = C && C.onVnodeUnmounted)) || j) &&
                we(() => {
                    (G && Fe(G, f, a), j && ht(a, null, f, 'unmounted'));
                }, p);
        },
        St = (a) => {
            const { type: f, el: p, anchor: y, transition: _ } = a;
            if (f === X) {
                Et(p, y);
                return;
            }
            if (f === vn) {
                T(a);
                return;
            }
            const b = () => {
                (r(p), _ && !_.persisted && _.afterLeave && _.afterLeave());
            };
            if (a.shapeFlag & 1 && _ && !_.persisted) {
                const { leave: C, delayLeave: E } = _,
                    S = () => C(p, b);
                E ? E(a.el, b, S) : S();
            } else b();
        },
        Et = (a, f) => {
            let p;
            for (; a !== f;) ((p = m(a)), r(a), (a = p));
            r(f);
        },
        hn = (a, f, p) => {
            const {
                bum: y,
                scope: _,
                job: b,
                subTree: C,
                um: E,
                m: S,
                a: w,
                parent: L,
                slots: { __: P },
            } = a;
            (rr(S),
                rr(w),
                y && Kn(y),
                L &&
                    V(P) &&
                    P.forEach((O) => {
                        L.renderCache[O] = void 0;
                    }),
                _.stop(),
                b && ((b.flags |= 8), ge(C, a, f, p)),
                E && we(E, f),
                we(() => {
                    a.isUnmounted = !0;
                }, f),
                f &&
                    f.pendingBranch &&
                    !f.isUnmounted &&
                    a.asyncDep &&
                    !a.asyncResolved &&
                    a.suspenseId === f.pendingId &&
                    (f.deps--, f.deps === 0 && f.resolve()));
        },
        Ce = (a, f, p, y = !1, _ = !1, b = 0) => {
            for (let C = b; C < a.length; C++) ge(a[C], f, p, y, _);
        },
        v = (a) => {
            if (a.shapeFlag & 6) return v(a.component.subTree);
            if (a.shapeFlag & 128) return a.suspense.next();
            const f = m(a.anchor || a.el),
                p = f && f[pl];
            return p ? m(p) : f;
        };
    let R = !1;
    const x = (a, f, p) => {
            (a == null
                ? f._vnode && ge(f._vnode, null, null, !0)
                : A(f._vnode || null, a, f, null, null, null, p),
                (f._vnode = a),
                R || ((R = !0), Ys(), Si(), (R = !1)));
        },
        I = { p: A, um: ge, m: Ue, r: St, mt: Ht, mc: ke, pc: B, pbc: Oe, n: v, o: e };
    return { render: x, hydrate: void 0, createApp: Vl(x) };
}
function Yn({ type: e, props: t }, n) {
    return (n === 'svg' && e === 'foreignObject') ||
        (n === 'mathml' && e === 'annotation-xml' && t && t.encoding && t.encoding.includes('html'))
        ? void 0
        : n;
}
function pt({ effect: e, job: t }, n) {
    n ? ((e.flags |= 32), (t.flags |= 4)) : ((e.flags &= -33), (t.flags &= -5));
}
function Gl(e, t) {
    return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function Ki(e, t, n = !1) {
    const s = e.children,
        r = t.children;
    if (V(s) && V(r))
        for (let i = 0; i < s.length; i++) {
            const o = s[i];
            let l = r[i];
            (l.shapeFlag & 1 &&
                !l.dynamicChildren &&
                ((l.patchFlag <= 0 || l.patchFlag === 32) && ((l = r[i] = lt(r[i])), (l.el = o.el)),
                !n && l.patchFlag !== -2 && Ki(o, l)),
                l.type === jn && (l.el = o.el),
                l.type === Ze && !l.el && (l.el = o.el));
        }
}
function ql(e) {
    const t = e.slice(),
        n = [0];
    let s, r, i, o, l;
    const c = e.length;
    for (s = 0; s < c; s++) {
        const d = e[s];
        if (d !== 0) {
            if (((r = n[n.length - 1]), e[r] < d)) {
                ((t[s] = r), n.push(s));
                continue;
            }
            for (i = 0, o = n.length - 1; i < o;)
                ((l = (i + o) >> 1), e[n[l]] < d ? (i = l + 1) : (o = l));
            d < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), (n[i] = s));
        }
    }
    for (i = n.length, o = n[i - 1]; i-- > 0;) ((n[i] = o), (o = t[o]));
    return n;
}
function Wi(e) {
    const t = e.subTree.component;
    if (t) return t.asyncDep && !t.asyncResolved ? t : Wi(t);
}
function rr(e) {
    if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
const Jl = Symbol.for('v-scx'),
    Yl = () => Ke(Jl);
function Qt(e, t, n) {
    return zi(e, t, n);
}
function zi(e, t, n = te) {
    const { immediate: s, deep: r, flush: i, once: o } = n,
        l = de({}, n),
        c = (t && s) || (!t && i !== 'post');
    let d;
    if (ln) {
        if (i === 'sync') {
            const g = Yl();
            d = g.__watcherHandles || (g.__watcherHandles = []);
        } else if (!c) {
            const g = () => {};
            return ((g.stop = Ae), (g.resume = Ae), (g.pause = Ae), g);
        }
    }
    const u = ue;
    l.call = (g, M, A) => We(g, u, M, A);
    let h = !1;
    (i === 'post'
        ? (l.scheduler = (g) => {
              we(g, u && u.suspense);
          })
        : i !== 'sync' &&
          ((h = !0),
          (l.scheduler = (g, M) => {
              M ? g() : ks(g);
          })),
        (l.augmentJob = (g) => {
            (t && (g.flags |= 4), h && ((g.flags |= 2), u && ((g.id = u.uid), (g.i = u))));
        }));
    const m = fl(e, t, l);
    return (ln && (d ? d.push(m) : c && m()), m);
}
function Ql(e, t, n) {
    const s = this.proxy,
        r = re(e) ? (e.includes('.') ? Gi(s, e) : () => s[e]) : e.bind(s, s);
    let i;
    F(t) ? (i = t) : ((i = t.handler), (n = t));
    const o = dn(this),
        l = zi(r, i.bind(s), n);
    return (o(), l);
}
function Gi(e, t) {
    const n = t.split('.');
    return () => {
        let s = e;
        for (let r = 0; r < n.length && s; r++) s = s[n[r]];
        return s;
    };
}
const Xl = (e, t) =>
    t === 'modelValue' || t === 'model-value'
        ? e.modelModifiers
        : e[`${t}Modifiers`] || e[`${Pe(t)}Modifiers`] || e[`${bt(t)}Modifiers`];
function Zl(e, t, ...n) {
    if (e.isUnmounted) return;
    const s = e.vnode.props || te;
    let r = n;
    const i = t.startsWith('update:'),
        o = i && Xl(s, t.slice(7));
    o && (o.trim && (r = n.map((u) => (re(u) ? u.trim() : u))), o.number && (r = n.map(To)));
    let l,
        c = s[(l = Bn(t))] || s[(l = Bn(Pe(t)))];
    (!c && i && (c = s[(l = Bn(bt(t)))]), c && We(c, e, 6, r));
    const d = s[l + 'Once'];
    if (d) {
        if (!e.emitted) e.emitted = {};
        else if (e.emitted[l]) return;
        ((e.emitted[l] = !0), We(d, e, 6, r));
    }
}
function qi(e, t, n = !1) {
    const s = t.emitsCache,
        r = s.get(e);
    if (r !== void 0) return r;
    const i = e.emits;
    let o = {},
        l = !1;
    if (!F(e)) {
        const c = (d) => {
            const u = qi(d, t, !0);
            u && ((l = !0), de(o, u));
        };
        (!n && t.mixins.length && t.mixins.forEach(c),
            e.extends && c(e.extends),
            e.mixins && e.mixins.forEach(c));
    }
    return !i && !l
        ? (ne(e) && s.set(e, null), null)
        : (V(i) ? i.forEach((c) => (o[c] = null)) : de(o, i), ne(e) && s.set(e, o), o);
}
function Hn(e, t) {
    return !e || !Tn(t)
        ? !1
        : ((t = t.slice(2).replace(/Once$/, '')),
          z(e, t[0].toLowerCase() + t.slice(1)) || z(e, bt(t)) || z(e, t));
}
function ir(e) {
    const {
            type: t,
            vnode: n,
            proxy: s,
            withProxy: r,
            propsOptions: [i],
            slots: o,
            attrs: l,
            emit: c,
            render: d,
            renderCache: u,
            props: h,
            data: m,
            setupState: g,
            ctx: M,
            inheritAttrs: A,
        } = e,
        H = xn(e);
    let U, k;
    try {
        if (n.shapeFlag & 4) {
            const T = r || s,
                J = T;
            ((U = je(d.call(J, T, u, h, g, m, M))), (k = l));
        } else {
            const T = t;
            ((U = je(T.length > 1 ? T(h, { attrs: l, slots: o, emit: c }) : T(h, null))),
                (k = t.props ? l : ec(l)));
        }
    } catch (T) {
        ((Xt.length = 0), Vn(T, e, 1), (U = oe(Ze)));
    }
    let $ = U;
    if (k && A !== !1) {
        const T = Object.keys(k),
            { shapeFlag: J } = $;
        T.length && J & 7 && (i && T.some(ws) && (k = tc(k, i)), ($ = Nt($, k, !1, !0)));
    }
    return (
        n.dirs && (($ = Nt($, null, !1, !0)), ($.dirs = $.dirs ? $.dirs.concat(n.dirs) : n.dirs)),
        n.transition && Os($, n.transition),
        (U = $),
        xn(H),
        U
    );
}
const ec = (e) => {
        let t;
        for (const n in e) (n === 'class' || n === 'style' || Tn(n)) && ((t || (t = {}))[n] = e[n]);
        return t;
    },
    tc = (e, t) => {
        const n = {};
        for (const s in e) (!ws(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
        return n;
    };
function nc(e, t, n) {
    const { props: s, children: r, component: i } = e,
        { props: o, children: l, patchFlag: c } = t,
        d = i.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && c >= 0) {
        if (c & 1024) return !0;
        if (c & 16) return s ? or(s, o, d) : !!o;
        if (c & 8) {
            const u = t.dynamicProps;
            for (let h = 0; h < u.length; h++) {
                const m = u[h];
                if (o[m] !== s[m] && !Hn(d, m)) return !0;
            }
        }
    } else
        return (r || l) && (!l || !l.$stable)
            ? !0
            : s === o
              ? !1
              : s
                ? o
                    ? or(s, o, d)
                    : !0
                : !!o;
    return !1;
}
function or(e, t, n) {
    const s = Object.keys(t);
    if (s.length !== Object.keys(e).length) return !0;
    for (let r = 0; r < s.length; r++) {
        const i = s[r];
        if (t[i] !== e[i] && !Hn(n, i)) return !0;
    }
    return !1;
}
function sc({ vnode: e, parent: t }, n) {
    for (; t;) {
        const s = t.subTree;
        if ((s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e))
            (((e = t.vnode).el = n), (t = t.parent));
        else break;
    }
}
const Ji = (e) => e.__isSuspense;
function rc(e, t) {
    t && t.pendingBranch ? (V(e) ? t.effects.push(...e) : t.effects.push(e)) : wi(e);
}
const X = Symbol.for('v-fgt'),
    jn = Symbol.for('v-txt'),
    Ze = Symbol.for('v-cmt'),
    vn = Symbol.for('v-stc'),
    Xt = [];
let Se = null;
function D(e = !1) {
    Xt.push((Se = e ? null : []));
}
function ic() {
    (Xt.pop(), (Se = Xt[Xt.length - 1] || null));
}
let rn = 1;
function lr(e, t = !1) {
    ((rn += e), e < 0 && Se && t && (Se.hasOnce = !0));
}
function Yi(e) {
    return ((e.dynamicChildren = rn > 0 ? Se || Rt : null), ic(), rn > 0 && Se && Se.push(e), e);
}
function Q(e, t, n, s, r, i) {
    return Yi(Ee(e, t, n, s, r, i, !0));
}
function Rn(e, t, n, s, r) {
    return Yi(oe(e, t, n, s, r, !0));
}
function on(e) {
    return e ? e.__v_isVNode === !0 : !1;
}
function Bt(e, t) {
    return e.type === t.type && e.key === t.key;
}
const Qi = ({ key: e }) => e ?? null,
    bn = ({ ref: e, ref_key: t, ref_for: n }) => (
        typeof e == 'number' && (e = '' + e),
        e != null ? (re(e) || fe(e) || F(e) ? { i: me, r: e, k: t, f: !!n } : e) : null
    );
function Ee(e, t = null, n = null, s = 0, r = null, i = e === X ? 0 : 1, o = !1, l = !1) {
    const c = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && Qi(t),
        ref: t && bn(t),
        scopeId: Ci,
        slotScopeIds: null,
        children: n,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetStart: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: i,
        patchFlag: s,
        dynamicProps: r,
        dynamicChildren: null,
        appContext: null,
        ctx: me,
    };
    return (
        l ? (Ns(c, n), i & 128 && e.normalize(c)) : n && (c.shapeFlag |= re(n) ? 8 : 16),
        rn > 0 && !o && Se && (c.patchFlag > 0 || i & 6) && c.patchFlag !== 32 && Se.push(c),
        c
    );
}
const oe = oc;
function oc(e, t = null, n = null, s = 0, r = null, i = !1) {
    if (((!e || e === Ml) && (e = Ze), on(e))) {
        const l = Nt(e, t, !0);
        return (
            n && Ns(l, n),
            rn > 0 && !i && Se && (l.shapeFlag & 6 ? (Se[Se.indexOf(e)] = l) : Se.push(l)),
            (l.patchFlag = -2),
            l
        );
    }
    if ((yc(e) && (e = e.__vccOpts), t)) {
        t = lc(t);
        let { class: l, style: c } = t;
        (l && !re(l) && (t.class = Un(l)),
            ne(c) && (Is(c) && !V(c) && (c = de({}, c)), (t.style = Cs(c))));
    }
    const o = re(e) ? 1 : Ji(e) ? 128 : ml(e) ? 64 : ne(e) ? 4 : F(e) ? 2 : 0;
    return Ee(e, t, n, s, r, o, i, !0);
}
function lc(e) {
    return e ? (Is(e) || Vi(e) ? de({}, e) : e) : null;
}
function Nt(e, t, n = !1, s = !1) {
    const { props: r, ref: i, patchFlag: o, children: l, transition: c } = e,
        d = t ? cc(r || {}, t) : r,
        u = {
            __v_isVNode: !0,
            __v_skip: !0,
            type: e.type,
            props: d,
            key: d && Qi(d),
            ref: t && t.ref ? (n && i ? (V(i) ? i.concat(bn(t)) : [i, bn(t)]) : bn(t)) : i,
            scopeId: e.scopeId,
            slotScopeIds: e.slotScopeIds,
            children: l,
            target: e.target,
            targetStart: e.targetStart,
            targetAnchor: e.targetAnchor,
            staticCount: e.staticCount,
            shapeFlag: e.shapeFlag,
            patchFlag: t && e.type !== X ? (o === -1 ? 16 : o | 16) : o,
            dynamicProps: e.dynamicProps,
            dynamicChildren: e.dynamicChildren,
            appContext: e.appContext,
            dirs: e.dirs,
            transition: c,
            component: e.component,
            suspense: e.suspense,
            ssContent: e.ssContent && Nt(e.ssContent),
            ssFallback: e.ssFallback && Nt(e.ssFallback),
            placeholder: e.placeholder,
            el: e.el,
            anchor: e.anchor,
            ctx: e.ctx,
            ce: e.ce,
        };
    return (c && s && Os(u, c.clone(u)), u);
}
function yt(e = ' ', t = 0) {
    return oe(jn, null, e, t);
}
function Be(e = '', t = !1) {
    return t ? (D(), Rn(Ze, null, e)) : oe(Ze, null, e);
}
function je(e) {
    return e == null || typeof e == 'boolean'
        ? oe(Ze)
        : V(e)
          ? oe(X, null, e.slice())
          : on(e)
            ? lt(e)
            : oe(jn, null, String(e));
}
function lt(e) {
    return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Nt(e);
}
function Ns(e, t) {
    let n = 0;
    const { shapeFlag: s } = e;
    if (t == null) t = null;
    else if (V(t)) n = 16;
    else if (typeof t == 'object')
        if (s & 65) {
            const r = t.default;
            r && (r._c && (r._d = !1), Ns(e, r()), r._c && (r._d = !0));
            return;
        } else {
            n = 32;
            const r = t._;
            !r && !Vi(t)
                ? (t._ctx = me)
                : r === 3 &&
                  me &&
                  (me.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
        }
    else
        F(t)
            ? ((t = { default: t, _ctx: me }), (n = 32))
            : ((t = String(t)), s & 64 ? ((n = 16), (t = [yt(t)])) : (n = 8));
    ((e.children = t), (e.shapeFlag |= n));
}
function cc(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const s = e[n];
        for (const r in s)
            if (r === 'class') t.class !== s.class && (t.class = Un([t.class, s.class]));
            else if (r === 'style') t.style = Cs([t.style, s.style]);
            else if (Tn(r)) {
                const i = t[r],
                    o = s[r];
                o && i !== o && !(V(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o);
            } else r !== '' && (t[r] = s[r]);
    }
    return t;
}
function Fe(e, t, n, s = null) {
    We(e, t, 7, [n, s]);
}
const ac = Ui();
let uc = 0;
function fc(e, t, n) {
    const s = e.type,
        r = (t ? t.appContext : e.appContext) || ac,
        i = {
            uid: uc++,
            vnode: e,
            type: s,
            parent: t,
            appContext: r,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            job: null,
            scope: new Vo(!0),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: t ? t.provides : Object.create(r.provides),
            ids: t ? t.ids : ['', 0, 0],
            accessCache: null,
            renderCache: [],
            components: null,
            directives: null,
            propsOptions: Hi(s, r),
            emitsOptions: qi(s, r),
            emit: null,
            emitted: null,
            propsDefaults: te,
            inheritAttrs: s.inheritAttrs,
            ctx: te,
            data: te,
            props: te,
            attrs: te,
            slots: te,
            refs: te,
            setupState: te,
            setupContext: null,
            suspense: n,
            suspenseId: n ? n.pendingId : 0,
            asyncDep: null,
            asyncResolved: !1,
            isMounted: !1,
            isUnmounted: !1,
            isDeactivated: !1,
            bc: null,
            c: null,
            bm: null,
            m: null,
            bu: null,
            u: null,
            um: null,
            bum: null,
            da: null,
            a: null,
            rtg: null,
            rtc: null,
            ec: null,
            sp: null,
        };
    return (
        (i.ctx = { _: i }),
        (i.root = t ? t.root : i),
        (i.emit = Zl.bind(null, i)),
        e.ce && e.ce(i),
        i
    );
}
let ue = null;
const Xi = () => ue || me;
let Mn, hs;
{
    const e = Ln(),
        t = (n, s) => {
            let r;
            return (
                (r = e[n]) || (r = e[n] = []),
                r.push(s),
                (i) => {
                    r.length > 1 ? r.forEach((o) => o(i)) : r[0](i);
                }
            );
        };
    ((Mn = t('__VUE_INSTANCE_SETTERS__', (n) => (ue = n))),
        (hs = t('__VUE_SSR_SETTERS__', (n) => (ln = n))));
}
const dn = (e) => {
        const t = ue;
        return (
            Mn(e),
            e.scope.on(),
            () => {
                (e.scope.off(), Mn(t));
            }
        );
    },
    cr = () => {
        (ue && ue.scope.off(), Mn(null));
    };
function Zi(e) {
    return e.vnode.shapeFlag & 4;
}
let ln = !1;
function dc(e, t = !1, n = !1) {
    t && hs(t);
    const { props: s, children: r } = e.vnode,
        i = Zi(e);
    (Fl(e, s, i, t), Bl(e, r, n || t));
    const o = i ? hc(e, t) : void 0;
    return (t && hs(!1), o);
}
function hc(e, t) {
    const n = e.type;
    ((e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, Il)));
    const { setup: s } = n;
    if (s) {
        Qe();
        const r = (e.setupContext = s.length > 1 ? mc(e) : null),
            i = dn(e),
            o = fn(s, e, 0, [e.props, r]),
            l = qr(o);
        if ((Xe(), i(), (l || e.sp) && !It(e) && Ri(e), l)) {
            if ((o.then(cr, cr), t))
                return o
                    .then((c) => {
                        ar(e, c);
                    })
                    .catch((c) => {
                        Vn(c, e, 0);
                    });
            e.asyncDep = o;
        } else ar(e, o);
    } else eo(e);
}
function ar(e, t, n) {
    (F(t)
        ? e.type.__ssrInlineRender
            ? (e.ssrRender = t)
            : (e.render = t)
        : ne(t) && (e.setupState = yi(t)),
        eo(e));
}
function eo(e, t, n) {
    const s = e.type;
    e.render || (e.render = s.render || Ae);
    {
        const r = dn(e);
        Qe();
        try {
            kl(e);
        } finally {
            (Xe(), r());
        }
    }
}
const pc = {
    get(e, t) {
        return (ae(e, 'get', ''), e[t]);
    },
};
function mc(e) {
    const t = (n) => {
        e.exposed = n || {};
    };
    return { attrs: new Proxy(e.attrs, pc), slots: e.slots, emit: e.emit, expose: t };
}
function Vs(e) {
    return e.exposed
        ? e.exposeProxy ||
              (e.exposeProxy = new Proxy(yi(rl(e.exposed)), {
                  get(t, n) {
                      if (n in t) return t[n];
                      if (n in Yt) return Yt[n](e);
                  },
                  has(t, n) {
                      return n in t || n in Yt;
                  },
              }))
        : e.proxy;
}
function gc(e, t = !0) {
    return F(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function yc(e) {
    return F(e) && '__vccOpts' in e;
}
const Re = (e, t) => al(e, t, ln);
function to(e, t, n) {
    const s = arguments.length;
    return s === 2
        ? ne(t) && !V(t)
            ? on(t)
                ? oe(e, null, [t])
                : oe(e, t)
            : oe(e, null, t)
        : (s > 3 ? (n = Array.prototype.slice.call(arguments, 2)) : s === 3 && on(n) && (n = [n]),
          oe(e, t, n));
}
const vc = '3.5.18';
let ps;
const ur = typeof window < 'u' && window.trustedTypes;
if (ur)
    try {
        ps = ur.createPolicy('vue', { createHTML: (e) => e });
    } catch {}
const no = ps ? (e) => ps.createHTML(e) : (e) => e,
    bc = 'http://www.w3.org/2000/svg',
    _c = 'http://www.w3.org/1998/Math/MathML',
    Je = typeof document < 'u' ? document : null,
    fr = Je && Je.createElement('template'),
    wc = {
        insert: (e, t, n) => {
            t.insertBefore(e, n || null);
        },
        remove: (e) => {
            const t = e.parentNode;
            t && t.removeChild(e);
        },
        createElement: (e, t, n, s) => {
            const r =
                t === 'svg'
                    ? Je.createElementNS(bc, e)
                    : t === 'mathml'
                      ? Je.createElementNS(_c, e)
                      : n
                        ? Je.createElement(e, { is: n })
                        : Je.createElement(e);
            return (
                e === 'select' && s && s.multiple != null && r.setAttribute('multiple', s.multiple),
                r
            );
        },
        createText: (e) => Je.createTextNode(e),
        createComment: (e) => Je.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t;
        },
        setElementText: (e, t) => {
            e.textContent = t;
        },
        parentNode: (e) => e.parentNode,
        nextSibling: (e) => e.nextSibling,
        querySelector: (e) => Je.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, '');
        },
        insertStaticContent(e, t, n, s, r, i) {
            const o = n ? n.previousSibling : t.lastChild;
            if (r && (r === i || r.nextSibling))
                for (; t.insertBefore(r.cloneNode(!0), n), !(r === i || !(r = r.nextSibling)););
            else {
                fr.innerHTML = no(
                    s === 'svg' ? `<svg>${e}</svg>` : s === 'mathml' ? `<math>${e}</math>` : e,
                );
                const l = fr.content;
                if (s === 'svg' || s === 'mathml') {
                    const c = l.firstChild;
                    for (; c.firstChild;) l.appendChild(c.firstChild);
                    l.removeChild(c);
                }
                t.insertBefore(l, n);
            }
            return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
        },
    },
    Sc = Symbol('_vtc');
function Ec(e, t, n) {
    const s = e[Sc];
    (s && (t = (t ? [t, ...s] : [...s]).join(' ')),
        t == null
            ? e.removeAttribute('class')
            : n
              ? e.setAttribute('class', t)
              : (e.className = t));
}
const dr = Symbol('_vod'),
    Cc = Symbol('_vsh'),
    so = Symbol('');
function xc(e) {
    const t = Xi();
    if (!t) return;
    const n = (t.ut = (r = e(t.proxy)) => {
            Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach((i) =>
                An(i, r),
            );
        }),
        s = () => {
            const r = e(t.proxy);
            (t.ce ? An(t.ce, r) : ms(t.subTree, r), n(r));
        };
    (Ii(() => {
        wi(s);
    }),
        Ti(() => {
            Qt(s, Ae, { flush: 'post' });
            const r = new MutationObserver(s);
            (r.observe(t.subTree.el.parentNode, { childList: !0 }), Ls(() => r.disconnect()));
        }));
}
function ms(e, t) {
    if (e.shapeFlag & 128) {
        const n = e.suspense;
        ((e = n.activeBranch),
            n.pendingBranch &&
                !n.isHydrating &&
                n.effects.push(() => {
                    ms(n.activeBranch, t);
                }));
    }
    for (; e.component;) e = e.component.subTree;
    if (e.shapeFlag & 1 && e.el) An(e.el, t);
    else if (e.type === X) e.children.forEach((n) => ms(n, t));
    else if (e.type === vn) {
        let { el: n, anchor: s } = e;
        for (; n && (An(n, t), n !== s);) n = n.nextSibling;
    }
}
function An(e, t) {
    if (e.nodeType === 1) {
        const n = e.style;
        let s = '';
        for (const r in t) {
            const i = No(t[r]);
            (n.setProperty(`--${r}`, i), (s += `--${r}: ${i};`));
        }
        n[so] = s;
    }
}
const Pc = /(^|;)\s*display\s*:/;
function Rc(e, t, n) {
    const s = e.style,
        r = re(n);
    let i = !1;
    if (n && !r) {
        if (t)
            if (re(t))
                for (const o of t.split(';')) {
                    const l = o.slice(0, o.indexOf(':')).trim();
                    n[l] == null && _n(s, l, '');
                }
            else for (const o in t) n[o] == null && _n(s, o, '');
        for (const o in n) (o === 'display' && (i = !0), _n(s, o, n[o]));
    } else if (r) {
        if (t !== n) {
            const o = s[so];
            (o && (n += ';' + o), (s.cssText = n), (i = Pc.test(n)));
        }
    } else t && e.removeAttribute('style');
    dr in e && ((e[dr] = i ? s.display : ''), e[Cc] && (s.display = 'none'));
}
const hr = /\s*!important$/;
function _n(e, t, n) {
    if (V(n)) n.forEach((s) => _n(e, t, s));
    else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n);
    else {
        const s = Mc(e, t);
        hr.test(n) ? e.setProperty(bt(s), n.replace(hr, ''), 'important') : (e[s] = n);
    }
}
const pr = ['Webkit', 'Moz', 'ms'],
    Qn = {};
function Mc(e, t) {
    const n = Qn[t];
    if (n) return n;
    let s = Pe(t);
    if (s !== 'filter' && s in e) return (Qn[t] = s);
    s = On(s);
    for (let r = 0; r < pr.length; r++) {
        const i = pr[r] + s;
        if (i in e) return (Qn[t] = i);
    }
    return t;
}
const mr = 'http://www.w3.org/1999/xlink';
function gr(e, t, n, s, r, i = $o(t)) {
    s && t.startsWith('xlink:')
        ? n == null
            ? e.removeAttributeNS(mr, t.slice(6, t.length))
            : e.setAttributeNS(mr, t, n)
        : n == null || (i && !Qr(n))
          ? e.removeAttribute(t)
          : e.setAttribute(t, i ? '' : et(n) ? String(n) : n);
}
function yr(e, t, n, s, r) {
    if (t === 'innerHTML' || t === 'textContent') {
        n != null && (e[t] = t === 'innerHTML' ? no(n) : n);
        return;
    }
    const i = e.tagName;
    if (t === 'value' && i !== 'PROGRESS' && !i.includes('-')) {
        const l = i === 'OPTION' ? e.getAttribute('value') || '' : e.value,
            c = n == null ? (e.type === 'checkbox' ? 'on' : '') : String(n);
        ((l !== c || !('_value' in e)) && (e.value = c),
            n == null && e.removeAttribute(t),
            (e._value = n));
        return;
    }
    let o = !1;
    if (n === '' || n == null) {
        const l = typeof e[t];
        l === 'boolean'
            ? (n = Qr(n))
            : n == null && l === 'string'
              ? ((n = ''), (o = !0))
              : l === 'number' && ((n = 0), (o = !0));
    }
    try {
        e[t] = n;
    } catch {}
    o && e.removeAttribute(r || t);
}
function Ac(e, t, n, s) {
    e.addEventListener(t, n, s);
}
function Tc(e, t, n, s) {
    e.removeEventListener(t, n, s);
}
const vr = Symbol('_vei');
function Ic(e, t, n, s, r = null) {
    const i = e[vr] || (e[vr] = {}),
        o = i[t];
    if (s && o) o.value = s;
    else {
        const [l, c] = kc(t);
        if (s) {
            const d = (i[t] = Uc(s, r));
            Ac(e, l, d, c);
        } else o && (Tc(e, l, o, c), (i[t] = void 0));
    }
}
const br = /(?:Once|Passive|Capture)$/;
function kc(e) {
    let t;
    if (br.test(e)) {
        t = {};
        let s;
        for (; (s = e.match(br));)
            ((e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0));
    }
    return [e[2] === ':' ? e.slice(3) : bt(e.slice(2)), t];
}
let Xn = 0;
const Oc = Promise.resolve(),
    Lc = () => Xn || (Oc.then(() => (Xn = 0)), (Xn = Date.now()));
function Uc(e, t) {
    const n = (s) => {
        if (!s._vts) s._vts = Date.now();
        else if (s._vts <= n.attached) return;
        We($c(s, n.value), t, 5, [s]);
    };
    return ((n.value = e), (n.attached = Lc()), n);
}
function $c(e, t) {
    if (V(t)) {
        const n = e.stopImmediatePropagation;
        return (
            (e.stopImmediatePropagation = () => {
                (n.call(e), (e._stopped = !0));
            }),
            t.map((s) => (r) => !r._stopped && s && s(r))
        );
    } else return t;
}
const _r = (e) =>
        e.charCodeAt(0) === 111 &&
        e.charCodeAt(1) === 110 &&
        e.charCodeAt(2) > 96 &&
        e.charCodeAt(2) < 123,
    Nc = (e, t, n, s, r, i) => {
        const o = r === 'svg';
        t === 'class'
            ? Ec(e, s, o)
            : t === 'style'
              ? Rc(e, n, s)
              : Tn(t)
                ? ws(t) || Ic(e, t, n, s, i)
                : (
                        t[0] === '.'
                            ? ((t = t.slice(1)), !0)
                            : t[0] === '^'
                              ? ((t = t.slice(1)), !1)
                              : Vc(e, t, s, o)
                    )
                  ? (yr(e, t, s),
                    !e.tagName.includes('-') &&
                        (t === 'value' || t === 'checked' || t === 'selected') &&
                        gr(e, t, s, o, i, t !== 'value'))
                  : e._isVueCE && (/[A-Z]/.test(t) || !re(s))
                    ? yr(e, Pe(t), s, i, t)
                    : (t === 'true-value'
                          ? (e._trueValue = s)
                          : t === 'false-value' && (e._falseValue = s),
                      gr(e, t, s, o));
    };
function Vc(e, t, n, s) {
    if (s) return !!(t === 'innerHTML' || t === 'textContent' || (t in e && _r(t) && F(n)));
    if (
        t === 'spellcheck' ||
        t === 'draggable' ||
        t === 'translate' ||
        t === 'autocorrect' ||
        t === 'form' ||
        (t === 'list' && e.tagName === 'INPUT') ||
        (t === 'type' && e.tagName === 'TEXTAREA')
    )
        return !1;
    if (t === 'width' || t === 'height') {
        const r = e.tagName;
        if (r === 'IMG' || r === 'VIDEO' || r === 'CANVAS' || r === 'SOURCE') return !1;
    }
    return _r(t) && re(n) ? !1 : t in e;
}
const Fc = ['ctrl', 'shift', 'alt', 'meta'],
    Hc = {
        stop: (e) => e.stopPropagation(),
        prevent: (e) => e.preventDefault(),
        self: (e) => e.target !== e.currentTarget,
        ctrl: (e) => !e.ctrlKey,
        shift: (e) => !e.shiftKey,
        alt: (e) => !e.altKey,
        meta: (e) => !e.metaKey,
        left: (e) => 'button' in e && e.button !== 0,
        middle: (e) => 'button' in e && e.button !== 1,
        right: (e) => 'button' in e && e.button !== 2,
        exact: (e, t) => Fc.some((n) => e[`${n}Key`] && !t.includes(n)),
    },
    jc = (e, t) => {
        const n = e._withMods || (e._withMods = {}),
            s = t.join('.');
        return (
            n[s] ||
            (n[s] = (r, ...i) => {
                for (let o = 0; o < t.length; o++) {
                    const l = Hc[t[o]];
                    if (l && l(r, t)) return;
                }
                return e(r, ...i);
            })
        );
    },
    Dc = de({ patchProp: Nc }, wc);
let wr;
function Bc() {
    return wr || (wr = Wl(Dc));
}
const Kc = (...e) => {
    const t = Bc().createApp(...e),
        { mount: n } = t;
    return (
        (t.mount = (s) => {
            const r = zc(s);
            if (!r) return;
            const i = t._component;
            (!F(i) && !i.render && !i.template && (i.template = r.innerHTML),
                r.nodeType === 1 && (r.textContent = ''));
            const o = n(r, !1, Wc(r));
            return (
                r instanceof Element &&
                    (r.removeAttribute('v-cloak'), r.setAttribute('data-v-app', '')),
                o
            );
        }),
        t
    );
};
function Wc(e) {
    if (e instanceof SVGElement) return 'svg';
    if (typeof MathMLElement == 'function' && e instanceof MathMLElement) return 'mathml';
}
function zc(e) {
    return re(e) ? document.querySelector(e) : e;
}
const ro = 1735732800;
class Gc {
    #e;
    #n;
    #t = 0;
    constructor(t) {
        ((this.#e = new Uint8Array(t)), (this.#n = new DataView(this.#e.buffer)));
    }
    get offset() {
        return this.#t;
    }
    remaining() {
        return this.#n.byteLength - this.#t;
    }
    getFilledBuffer() {
        return this.#e.subarray(0, this.#t);
    }
    encodeCompactUint(t) {
        if (t < 2 ** 7) {
            this.encodeUint8(Number(t));
            return;
        }
        if (t < 2 ** 14) {
            ((t = Number(t)), this.encodeUint8(((t >> 8) & 255) | 128), this.encodeUint8(t & 255));
            return;
        }
        if (t < 2 ** 21) {
            ((t = Number(t)),
                this.encodeUint8(((t >> 16) & 255) | 192),
                this.encodeUint16(t & 65535));
            return;
        }
        if (t < 2 ** 28) {
            ((t = Number(t)), this.encodeUint8(((t >> 24) & 255) | 224), this.#r(t & 16777215));
            return;
        }
        if (t < 2 ** 35) {
            (this.encodeUint8((Number(BigInt(t) >> 32n) & 255) | 240),
                this.encodeUint32(Number(t) & 4294967295));
            return;
        }
        if (t < 2 ** 42) {
            (this.encodeUint8((Number(BigInt(t) >> 40n) & 255) | 248),
                this.#s(BigInt(t) & 0xffffffffffn));
            return;
        }
        if (t < 2 ** 49) {
            (this.encodeUint8((Number(BigInt(t) >> 48n) & 255) | 252),
                this.#i(BigInt(t) & 0xffffffffffffn));
            return;
        }
        if (t < 2 ** 56) {
            (this.encodeUint8((Number(BigInt(t) >> 56n) & 255) | 254),
                this.#c(BigInt(t) & 0xffffffffffffffn));
            return;
        }
        (this.encodeUint8(255), this.encodeUint64(BigInt(t)));
    }
    #r(t) {
        (this.encodeUint16(t & 65535), this.encodeUint8((t >> 16) & 255));
    }
    #s(t) {
        (this.encodeUint32(Number(t) & 4294967295), this.encodeUint8(Number(t >> 32n) & 255));
    }
    #i(t) {
        (this.encodeUint32(Number(t) & 4294967295), this.encodeUint16(Number(t >> 32n) & 65535));
    }
    #c(t) {
        (this.encodeUint32(Number(t) & 4294967295),
            this.encodeUint16(Number(t >> 32n) & 65535),
            this.encodeUint8(Number(t >> 48n) & 255));
    }
    encodeUint8(t) {
        this.#o(this.#n.setUint8, 1, t);
    }
    encodeUint16(t) {
        this.#o(this.#n.setUint16, 2, t);
    }
    encodeUint32(t) {
        this.#o(this.#n.setUint32, 4, t);
    }
    encodeUint64(t) {
        this.#o(this.#n.setBigUint64, 8, t);
    }
    encodeBool(t) {
        this.encodeUint8(t ? 1 : 0);
    }
    encodeArray(t, n) {
        (this.encodeCompactUint(t), this.encodeFixedArray(t, n));
    }
    encodeFixedArray(t, n) {
        for (let s = 0; s < t; ++s) n(s);
    }
    encodeUint8Array(t) {
        (this.encodeCompactUint(t.length), this.encodeFixedUint8Array(t));
    }
    encodeFixedUint8Array(t) {
        if (this.remaining() < t.length) throw new Error('Buffer overflow');
        (this.#e.set(t, this.#t), (this.#t += t.length));
    }
    encodeCString(t) {
        if (t.length === 0)
            throw new TypeError('Empty byte array instead of NUL-terminated C-string');
        const n = t.length - 1;
        (this.encodeCompactUint(n), this.encodeFixedUint8Array(t.subarray(0, n)));
    }
    encodeOption(t, n) {
        if (t === null) {
            this.encodeUint8(0);
            return;
        }
        (this.encodeUint8(1), n());
    }
    #o(t, n, s) {
        if (this.remaining() < n) throw new Error('Buffer overflow');
        (t.call(this.#n, this.#t, s, !0), (this.#t += n));
    }
}
class io extends Error {
    constructor(...t) {
        super(...t);
    }
}
class Lt {
    width;
    height;
    refreshRate;
    options;
    encode(t) {
        (t.encodeUint16(this.width),
            t.encodeUint16(this.height),
            t.encodeUint16(this.refreshRate),
            t.encodeUint64(this.options));
    }
    static decode(t) {
        const n = new Lt();
        if (
            ((n.width = t.decodeUint16()),
            (n.height = t.decodeUint16()),
            (n.refreshRate = t.decodeUint16()),
            (n.options = t.decodeUint64()),
            n.width === 0 || n.height === 0 || n.refreshRate === 0)
        )
            throw new io('Invalid VideoMode');
        return n;
    }
    static fromPlain(t) {
        return t == null ? t : Object.assign(new Lt(), t);
    }
}
const gs = Object.freeze({
    S16LE: 1,
    decode(e) {
        const t = e.decodeCompactUint();
        if (t === 1) return gs.S16LE;
        throw new Error(`Invalid AudioSampleFormat: ${t}`);
    },
});
class Ut {
    sampleRate;
    channels;
    sampleFormat;
    encodedSize() {
        return 6;
    }
    encode(t) {
        (t.encodeUint32(this.sampleRate),
            t.encodeUint8(this.channels),
            t.encodeCompactUint(this.sampleFormat));
    }
    static decode(t) {
        const n = new Ut();
        if (
            ((n.sampleRate = t.decodeUint32()),
            (n.channels = t.decodeUint8()),
            (n.sampleFormat = gs.decode(t)),
            n.sampleRate === 0 || n.channels === 0)
        )
            throw new io('Invalid AudioMode');
        return n;
    }
    static fromPlain(t) {
        return t == null ? t : Object.assign(new Ut(), t);
    }
    sampleLen() {
        return this.sampleFormat === gs.S16LE ? 2 : 0;
    }
    frameLen() {
        return this.sampleLen() * this.channels;
    }
    bytesPerSecond() {
        return this.sampleRate * this.channels * this.sampleLen();
    }
}
const qc = '' + new URL('../CixsTs8S/audio-pipe.js', import.meta.url).href,
    Jc = '' + new URL('../C4IwkGyK/audio-capture-pipe.js', import.meta.url).href,
    oo = '' + new URL('../BlGiU7JV/code.wasm', import.meta.url).href;
async function Yc() {
    return await WebAssembly.compileStreaming(fetch(oo));
}
async function Qc() {
    const e = new AudioContext();
    return (await e.suspend(), await e.audioWorklet.addModule(qc), e);
}
async function Xc() {
    const e = new AudioContext();
    return (await e.suspend(), await e.audioWorklet.addModule(Jc), e);
}
class Fs {
    #e;
    #n;
    #t;
    constructor(t, n, s) {
        ((this.#e = t), (this.#n = n), (this.#t = s));
    }
    static async createInteractively() {
        'audioSession' in navigator &&
            ((window.navigator.audioSession.type = 'play-and-record'),
            console.debug(`Set audio session type to "${window.navigator.audioSession.type}"`));
        const [t, n, s] = await Promise.all([Yc(), Qc(), Xc()]);
        return new Fs(t, n, s);
    }
    async close() {
        (this.#n !== null &&
            (this.#n.state !== 'closed' && (await this.#n.close()), (this.#n = null)),
            this.#t !== null &&
                (this.#t.state !== 'closed' && (await this.#t.close()), (this.#t = null)));
    }
    async resumePlayback() {
        this.#n !== null && (await this.#n.resume());
    }
    async suspendPlayback() {
        this.#n !== null && (await this.#n.suspend());
    }
    async resumeCapture() {
        this.#t !== null && (await this.#t.resume());
    }
    async suspendCapture() {
        this.#t !== null && (await this.#t.suspend());
    }
    get lanczos() {
        return this.#e;
    }
    get playback() {
        return this.#n;
    }
    get capture() {
        return this.#t;
    }
}
let Zc = class {
    #e;
    #n = null;
    #t = null;
    #r = null;
    #s = 1;
    #i = null;
    #c = 1;
    #o = null;
    constructor(t) {
        this.#e = t;
    }
    reset() {
        this.#u();
    }
    close() {
        this.#u();
    }
    #u() {
        (this.suspendPlayback(), this.suspendCapture());
    }
    resumePlayback() {
        if (this.#n !== null || this.#e.playback.state === 'closed') return;
        const t = this.#e.playback,
            n = this.#e.lanczos;
        ((this.#t = new AudioWorkletNode(t, 'audio-pipe', {
            numberOfInputs: 0,
            numberOfOutputs: 1,
            outputChannelCount: [t.destination.channelCount],
            processorOptions: { lanczos: n },
        })),
            this.#o !== null && this.#t.addEventListener('processorerror', this.#o),
            this.#t.port.postMessage({ type: 'init' }),
            (this.#n = new GainNode(t)),
            this.#t.connect(this.#n),
            this.#n.connect(t.destination),
            this.#n.gain.setValueAtTime(this.#s, t.currentTime),
            (this.#r = this.#t.port),
            (this.#t.parameters.get('outputLatency').value =
                t.baseLatency + (t.outputLatency || 0)));
    }
    suspendPlayback() {
        (this.#n !== null && (this.#n.disconnect(), (this.#n = null)),
            this.#t !== null && (this.#t.disconnect(), (this.#t = null)),
            (this.#r = null));
    }
    #d() {
        if (this.#i !== null || this.#e.capture.state === 'closed') return;
        const t = this.#e.capture,
            n = this.#e.lanczos;
        ((this.#i = new AudioWorkletNode(t, 'audio-capture-pipe', {
            numberOfInputs: 1,
            numberOfOutputs: 1,
            outputChannelCount: [1],
            processorOptions: { lanczos: n },
        })),
            this.#o !== null && this.#i.addEventListener('processorerror', this.#o),
            this.#i.port.postMessage({ type: 'init' }),
            this.#i.connect(t.destination));
    }
    async resumeCapture(t, n, s) {
        (this.#d(),
            this.#i.port.postMessage(
                {
                    type: 'start',
                    mode: n,
                    sourceSampleRate: this.#e.capture.sampleRate,
                    gain: this.#c,
                },
                [s],
            ));
        let r;
        if (
            (t instanceof MediaStream && (r = this.#e.capture.createMediaStreamSource(t)),
            t instanceof Blob)
        ) {
            const i = await t.arrayBuffer(),
                o = await this.#e.capture.decodeAudioData(i);
            ((r = this.#e.capture.createBufferSource()), (r.buffer = o), (r.loop = !0));
        }
        if (!r) throw new Error(`Invalid audio capture source: ${typeof t}`);
        return (r.connect(this.#i), r.start(), !0);
    }
    suspendCapture() {
        this.#i !== null &&
            (this.#i.port.postMessage({ type: 'stop' }), this.#i.disconnect(), (this.#i = null));
    }
    isCaptureEnabled() {
        return this.#i !== null && this.#e.capture.state === 'running';
    }
    set playbackVolume(t) {
        if ((t > 1 && (t = 1), t < 0 && (t = 0), this.#n === null)) {
            this.#s = t;
            return;
        }
        this.#n.gain.setValueAtTime(t, this.#e.playback.currentTime);
    }
    get playbackVolume() {
        return this.#n === null ? 0 : this.#n.gain.value;
    }
    get playbackSampleRate() {
        return this.#e.playback.sampleRate;
    }
    set captureVolume(t) {
        (t > 1 && (t = 1),
            t < 0 && (t = 0),
            (this.#c = t),
            this.#i !== null && this.#i.port.postMessage({ type: 'gain', gain: t }));
    }
    get captureVolume() {
        return this.#i === null ? 0 : this.#c;
    }
    takePlaybackPipePort() {
        const t = this.#r;
        return ((this.#r = null), t);
    }
    isPlaybackEnabled() {
        return this.#n !== null && this.#e.playback.state === 'running';
    }
    set onerror(t) {
        const n = (r) => {
                r !== null && r.removeEventListener('processorerror', this.#o);
            },
            s = (r) => {
                r !== null && r.addEventListener('processorerror', this.#o);
            };
        (this.#o !== null && (n(this.#t), n(this.#i)),
            (this.#o = t),
            this.#o !== null && (s(this.#t), s(this.#i)));
    }
};
const Zn = 640,
    es = 400;
class ea {
    #e;
    #n = null;
    #t = null;
    constructor(t) {
        this.#e = t;
    }
    reset() {
        this.close();
    }
    close() {
        if (this.#t !== null) {
            const t = document.getElementById(this.#e);
            (t !== null && t.removeEventListener('resize', this.#t), (this.#t = null));
        }
        this.#n !== null && (this.#n.close(), (this.#n = null));
    }
    pushVideo(t) {
        (this.#n !== null && this.#n.close(), (this.#n = t.image));
        let n = this.#n.codedWidth,
            s = this.#n.codedHeight;
        return (
            n < Zn && ((s = Math.round((s / n) * Zn)), (n = Zn)),
            s < es && ((n = Math.round((n / s) * es)), (s = es)),
            this.#r(),
            [n, s]
        );
    }
    updateElements() {
        this.#r();
    }
    #r() {
        requestAnimationFrame(() => this.#s());
    }
    #s() {
        const t = document.getElementById(this.#e);
        if (t === null) return;
        const n = t.getBoundingClientRect();
        if (
            ((t.width = Math.max(0, n.width)), (t.height = Math.max(0, n.height)), this.#n === null)
        )
            return;
        this.#t === null &&
            ((this.#t = (d) => {
                this.#s();
            }),
            t.addEventListener('resize', this.#t));
        const s = Math.min(t.width / this.#n.codedWidth, t.height / this.#n.codedHeight),
            r = this.#n.codedWidth * s,
            i = this.#n.codedHeight * s,
            o = (t.width - r) / 2,
            l = (t.height - i) / 2,
            c = t.getContext('2d');
        (c.clearRect(0, 0, t.width, t.height),
            c.drawImage(this.#n, 0, 0, this.#n.codedWidth, this.#n.codedHeight, o, l, r, i));
    }
}
class ta {
    #e = new Map();
    #n;
    #t;
    constructor(t, n) {
        ((this.#n = t || 50), (this.#t = n));
    }
    addEvent(t, n) {
        (delete n.serviceId, delete n.vmId, (n.startTime /= 1e3), (n.endTime /= 1e3));
        const s = na(n.startTime, this.#t),
            r = Sr(s, this.#t);
        ((n.startTime -= r), (n.endTime -= r));
        const i = this.#e.get(s);
        if (i === void 0) {
            const o = new Map();
            (o.set(t, [n]), this.#e.set(s, o));
        } else {
            const o = i.get(t);
            if (o === void 0) i.set(t, [n]);
            else {
                const l = o[o.length - 1];
                l.endTime >= n.startTime ? (l.endTime = n.endTime) : o.push(n);
            }
        }
    }
    removeOldEvents() {
        if (this.#e.size === 0) return;
        const t = Array.from(this.#e.keys()),
            n = t[t.length - 1] - this.#n;
        for (const s of t) {
            if (s >= n) break;
            this.#e.delete(s);
        }
    }
    toJSON() {
        const t = [];
        for (const [n, s] of this.#e.entries()) {
            const r = Sr(n, this.#t);
            for (const [i, o] of s.entries())
                for (const l of o)
                    t.push({ name: i, startTime: r + l.startTime, endTime: r + l.endTime });
        }
        return (t.sort((n, s) => n.startTime - s.startTime), t);
    }
    toCSV() {
        const t = this.toJSON();
        let n = '';
        for (const s of t)
            ((n += s.name),
                (n += ','),
                (n += s.startTime),
                (n += ','),
                (n += s.endTime),
                (n += `
`));
        return n;
    }
    get slices() {
        return this.#e;
    }
    get slots() {
        return this.#e.keys();
    }
    get slotCount() {
        if (this.#e.size === 0) return 0;
        const t = Array.from(this.#e.keys());
        return t[t.length - 1] - t[0] + 1;
    }
    get maxSlotCount() {
        return this.#n;
    }
    get minSlot() {
        return this.#e.size === 0 ? 0 : this.#e.keys().next().value;
    }
    get maxSlot() {
        if (this.#e.size === 0) return 0;
        const t = Array.from(this.#e.keys());
        return t[t.length - 1];
    }
}
function Sr(e, t) {
    return ro + Math.floor(e) * t;
}
function na(e, t) {
    return Math.floor((e - ro) / t);
}
class lo {
    #e = new Map();
    addEventListener(t, n) {
        const s = this.#e.get(t);
        s === void 0 ? this.#e.set(t, [n]) : s.push(n);
    }
    removeEventListener(t, n) {
        const s = this.#e.get(t);
        if (s === void 0) return;
        const r = s.indexOf(n);
        r !== -1 && s.splice(r, 1);
    }
    async fireEvent(t, n) {
        const s = this.#e.get(t) || [];
        await Promise.all(s.map((r) => r(n)));
    }
}
const sa = 64 * 1024;
class ra {
    #e = [];
    #n = 0;
    getText() {
        return this.#e.map((t) => t.text).join('');
    }
    push(t) {
        let n = this.#e.length;
        for (
            let s = this.#e.length - 1;
            s >= 0 && ((n = s + 1), !(this.#e[s].timestamp <= t.timestamp));
            --s
        );
        (this.#e.splice(n, 0, t), (this.#n += t.text.length), this.#t());
    }
    #t() {
        for (; this.#n > sa && this.#e.length !== 0;)
            ((this.#n -= this.#e[0].text.length), this.#e.shift());
    }
}
const yn = { name: 'Ed25519' };
class cn {
    #e;
    constructor(t) {
        this.#e = t;
    }
    static async generate() {
        const t = await crypto.subtle.generateKey(yn, !0, ['sign', 'verify']);
        return new cn(t);
    }
    static async fromJSON(t) {
        const n = await crypto.subtle.importKey('jwk', t.privateKey, yn, !0, ['sign']),
            s = await crypto.subtle.importKey('jwk', t.publicKey, yn, !0, ['verify']);
        return new cn({ privateKey: n, publicKey: s });
    }
    async toJSON() {
        return {
            privateKey: await crypto.subtle.exportKey('jwk', this.#e.privateKey),
            publicKey: await crypto.subtle.exportKey('jwk', this.#e.publicKey),
        };
    }
    async sign(t) {
        return new Uint8Array(await crypto.subtle.sign(yn, this.#e.privateKey, t));
    }
    async getRawPublicKey() {
        const t = await crypto.subtle.exportKey('raw', this.#e.publicKey);
        return new Uint8Array(t);
    }
}
function gt(e, t) {
    return BigInt(e) + BigInt(t) * 2n ** 32n;
}
function ia(e) {
    return Number(e % 2n ** 32n);
}
function oa(e) {
    return Math.floor(Number(e / 2n ** 32n));
}
class la {
    #e = new Map();
    #n;
    #t;
    constructor(t) {
        ((this.#n = t?.create), (this.#t = t?.destroy));
    }
    set(t, n, s) {
        const r = gt(t, n);
        this.#e.set(r, s);
    }
    get(t, n) {
        const s = gt(t, n);
        return this.#e.get(s);
    }
    ensurePresent(t, n, s) {
        const r = gt(t, n);
        let i = this.#e.get(r);
        return (i === void 0 && ((i = (s || this.#n)(t, n)), this.#e.set(r, i)), i);
    }
    ensureAbsent(t, n) {
        const s = gt(t, n),
            r = this.#e.get(s);
        return r !== void 0 ? (this.#t(r), this.#e.delete(s), !0) : !1;
    }
    ensureIntersectionPresent(t, n) {
        const s = n?.create || this.#n,
            r = n?.destroy || this.#t,
            i = n?.added,
            o = n?.removed,
            l = new Set();
        for (const [c, d] of t) {
            const u = gt(c, d);
            (l.add(u), this.#e.get(u) === void 0 && (this.#e.set(u, s(c, d)), i && i(c, d)));
        }
        for (const [c, d] of this.#e.entries())
            if (!l.has(c) && (r(d), this.#e.delete(c), o)) {
                const u = ia(c),
                    h = oa(c);
                o(u, h);
            }
    }
    clear() {
        for (const t of this.#e.values()) this.#t(t);
        this.#e.clear();
    }
    values() {
        return this.#e.values();
    }
}
class ca {
    #e = new Set();
    add(t, n) {
        const s = gt(t, n);
        this.#e.add(s);
    }
    has(t, n) {
        const s = gt(t, n);
        return this.#e.has(s);
    }
}
class aa {
    #e = new lo();
    #n = new Worker(
        new URL('' + new URL('../BuUlmvsH/fetcher.js', import.meta.url).href, import.meta.url),
        { type: 'module' },
    );
    #t = new Worker(
        new URL('' + new URL('../DV53xqJa/transcoder.js', import.meta.url).href, import.meta.url),
        { type: 'module' },
    );
    #r = new Worker(
        new URL('' + new URL('../BuA6gov-/engine.js', import.meta.url).href, import.meta.url),
        { type: 'module' },
    );
    #s = new Worker(
        new URL('' + new URL('../Ce7-x8W0/input-pusher.js', import.meta.url).href, import.meta.url),
        { type: 'module' },
    );
    #i = null;
    #c = 'disconnected';
    #o = 'disconnected';
    #u = null;
    #d = [];
    #l = new la({ destroy: (t) => t.close() });
    #h = null;
    #p = null;
    #y = null;
    #v = null;
    #a = null;
    constructor() {
        (this.#n.addEventListener('message', (s) => this.#_(s)),
            this.#t.addEventListener('message', (s) => this.#f(s)),
            this.#r.addEventListener('message', (s) => this.#w(s)),
            this.#s.addEventListener('message', (s) => this.#g(s)));
        const t = new MessageChannel();
        (this.#n.postMessage({ type: 'transcoder-port' }, [t.port2]),
            this.#t.postMessage({ type: 'fetcher-port' }, [t.port1]));
        const n = new MessageChannel();
        (this.#t.postMessage({ type: 'engine-port' }, [n.port2]),
            this.#r.postMessage({ type: 'transcoder-port' }, [n.port1]));
    }
    connectToJamNode(t) {
        this.#n.postMessage({ type: 'open', url: t });
    }
    disconnectFromJamNode() {
        this.#n.postMessage({ type: 'close' });
    }
    close() {
        (this.#m(),
            this.#n.terminate(),
            this.#r.terminate(),
            this.#t.terminate(),
            this.#s.terminate());
    }
    #m() {
        this.#l.clear();
    }
    async connectToCoreVmBuilder(t) {
        (await this.#b(),
            this.#s.postMessage({
                type: 'open',
                url: t,
                inputPrivateKeyJSON: await this.#p.toJSON(),
            }));
    }
    disconnectFromCoreVmBuilder() {
        this.#s.postMessage({ type: 'close' });
    }
    async #b() {
        (this.#p === null && (this.#p = await ua()), (this.#y = await this.#p.getRawPublicKey()));
    }
    #_(t) {
        switch (t.data.type) {
            case 'parameters':
                ((this.#i = t.data.parameters),
                    this.#e.fireEvent('parameters', t.data.parameters),
                    this.#r.postMessage(t.data),
                    this.#t.postMessage(t.data),
                    this.#s.postMessage(t.data));
                break;
            case 'connection-state':
                ((this.#c = t.data.state),
                    this.#e.fireEvent('node-connection-state', t.data.state));
                break;
            case 'best-block':
                ((this.#u = t.data.block),
                    this.#e.fireEvent('best-block', t.data.block),
                    this.#r.postMessage(t.data));
                for (const n of this.#l.values()) n.onFetcherMessage(t);
                break;
            case 'services':
                (this.#E(t.data.services), this.#e.fireEvent('services', t.data.services));
                break;
            case 'fetch-event':
            case 'output-mode':
            case 'input-mode': {
                this.#S(t, (n) => n.onFetcherMessage(t));
                break;
            }
            case 'error':
                this.addUnhandledError(t.data.error);
                break;
            default:
                throw new Error(`Invalid message type: ${t.data.type}`);
        }
    }
    #w(t) {
        this.#S(t, (n) => n.onEngineMessage(t));
    }
    #f(t) {
        switch (t.data.type) {
            case 'transcode-event':
                this.#S(t, (n) => n.onTranscoderMessage(t));
                break;
            case 'error':
                this.addUnhandledError(t.data.error);
                break;
            default:
                throw new Error(`Invalid message type: ${t.data.type}`);
        }
    }
    #g(t) {
        switch (t.data.type) {
            case 'builder-connection-state':
                ((this.#o = t.data.state), this.#e.fireEvent('builder-connection-state', t.data));
                break;
            case 'error':
                this.addUnhandledError(t.data.error);
                break;
            default:
                throw new Error(`Invalid message type: ${t.data.type}`);
        }
    }
    #S(t, n) {
        const s = this.#l.get(t.data.serviceId, t.data.vmId);
        if (s === void 0) {
            console.debug(
                `Dropping message ${t.data.type} to ${t.data.serviceId.toString(16)}/${t.data.vmId}`,
            );
            return;
        }
        n(s);
    }
    #E(t) {
        this.#v = t;
        const n = new ca();
        for (const s of t) for (const r of s.vms.keys()) n.add(s.id, r);
        this.#a = n;
        for (const s of this.#l.values())
            n.has(s.serviceId, s.vmId) || this.removeVm(s.serviceId, s.vmId);
    }
    get parameters() {
        return this.#i;
    }
    get bestBlock() {
        return this.#u;
    }
    addUnhandledError(t) {
        (this.#d.push(t), this.#e.fireEvent('state', {}));
    }
    get unhandledErrors() {
        return this.#d;
    }
    get nodeConnectionState() {
        return this.#c;
    }
    get builderConnectionState() {
        return this.#o;
    }
    get services() {
        return this.#v;
    }
    addVm(t, n, s) {
        if (this.#a && !this.#a.has(t, n)) return null;
        const r = this.#l.ensurePresent(t, n, (i, o) => new Er(i, o, s(i, o), this));
        return (
            this.#n.postMessage({ type: 'add-vm', serviceId: t, vmId: n }),
            this.#r.postMessage({ type: 'add-vm', serviceId: t, vmId: n }),
            this.#s.postMessage({ type: 'add-vm', serviceId: t, vmId: n }),
            this.#e.fireEvent('vm', { action: 'added', serviceId: t, vmId: n }),
            r
        );
    }
    removeVm(t, n) {
        this.#l.ensureAbsent(t, n) &&
            (this.#n.postMessage({ type: 'remove-vm', serviceId: t, vmId: n }),
            this.#r.postMessage({ type: 'remove-vm', serviceId: t, vmId: n }),
            this.#s.postMessage({ type: 'remove-vm', serviceId: t, vmId: n }),
            this.#e.fireEvent('vm', { action: 'removed', serviceId: t, vmId: n }));
    }
    setVms(t, n) {
        (this.#a && (t = t.filter(([s, r]) => this.#a.has(s, r))),
            this.#l.ensureIntersectionPresent(t, {
                create: (s, r) => new Er(s, r, n(s, r), this),
                added: (s, r) =>
                    this.#e.fireEvent('vm', { action: 'added', serviceId: s, vmId: r }),
                removed: (s, r) =>
                    this.#e.fireEvent('vm', { action: 'removed', serviceId: s, vmId: r }),
            }),
            this.#n.postMessage({ type: 'set-vms', vms: t }),
            this.#r.postMessage({ type: 'set-vms', vms: t }),
            this.#s.postMessage({ type: 'set-vms', vms: t }));
    }
    removeAllVms() {
        (this.#l.clear(),
            this.#n.postMessage({ type: 'set-vms', vms: [] }),
            this.#r.postMessage({ type: 'set-vms', vms: [] }),
            this.#s.postMessage({ type: 'set-vms', vms: [] }));
    }
    getVm(t, n) {
        return this.#l.get(t, n);
    }
    getVms() {
        return Array.from(this.#l.values().map((t) => [t.serviceId, t.vmId]));
    }
    get players() {
        return Array.from(this.#l.values());
    }
    async initInteractively(t) {
        (this.#h === null && (this.#h = await Fs.createInteractively()),
            t?.playback && (await this.#h.resumePlayback()),
            t?.capture && (await this.#h.resumeCapture()));
    }
    get audio() {
        return this.#h;
    }
    addEventListener(t, n) {
        this.#e.addEventListener(t, n);
    }
    removeEventListener(t, n) {
        this.#e.removeEventListener(t, n);
    }
    pushHostMessage(t, n, s) {
        this.#s.postMessage({ type: 'host-message', serviceId: t, vmId: n, message: s }, [
            s.buffer,
        ]);
    }
    pushConsoleChunk(t, n, s) {
        this.#s.postMessage({ type: 'console-chunk', serviceId: t, vmId: n, chunk: s }, [s.buffer]);
    }
    get rawInputPublicKey() {
        return this.#y;
    }
    async startAudioCapture(t, n, s, r) {
        this.#s.postMessage({ type: 'start-audio-capture', serviceId: t, vmId: n, audio: s }, [r]);
    }
    stopAudioCapture(t, n) {
        this.#s.postMessage({ type: 'stop-audio-capture', serviceId: t, vmId: n });
    }
    updateAudioPort(t, n, s) {
        this.#r.postMessage({ type: 'audio-port', serviceId: t, vmId: n }, [s]);
    }
}
class Er {
    #e;
    #n;
    #t;
    #r = new lo();
    #s = null;
    #i;
    #c = null;
    #o = null;
    #u = 0;
    #d = 0;
    #l = null;
    #h = null;
    #p = 0;
    #y = 0;
    #v = new ra();
    #a = 'buffering';
    #m = null;
    constructor(t, n, s, r) {
        ((this.#e = t), (this.#n = n), (this.#t = r), (this.#i = new ea(s)));
    }
    close() {
        (this.#i !== null && (this.#i.close(), (this.#i = null)),
            this.#s !== null && (this.#s.close(), (this.#s = null)));
    }
    async enableAudioPlayback() {
        this.#o !== null &&
            (await this.#b(),
            this.#s.resumePlayback(),
            this.#_(),
            this.#a !== 'buffering' && this.#f('running'));
    }
    async startAudioCapture(t) {
        await this.#b();
        const n = new MessageChannel();
        (await this.#t.startAudioCapture(this.#e, this.#n, this.#l, n.port1),
            await this.#s.resumeCapture(t, this.#l, n.port2));
    }
    stopAudioCapture() {
        (this.#t.stopAudioCapture(this.#e, this.#n), this.#s !== null && this.#s.suspendCapture());
    }
    isAudioPlaybackEnabled() {
        return this.#s === null ? !1 : this.#s.isPlaybackEnabled();
    }
    isAudioCaptureEnabled() {
        return this.#s === null ? !1 : this.#s.isCaptureEnabled();
    }
    async #b() {
        if (this.#s === null) {
            const t = this.#t.audio;
            ((this.#s = new Zc(t)), (this.#s.onerror = (n) => this.#t.addUnhandledError(n)));
        }
    }
    #_() {
        const t = this.#s.takePlaybackPipePort();
        t !== null && this.#t.updateAudioPort(this.#e, this.#n, t);
    }
    #w(t, n) {
        (this.#i.reset(),
            this.#s && this.#s.reset(),
            (this.#u = 0),
            (this.#d = 0),
            (this.#c = Lt.fromPlain(t)),
            (this.#o = Ut.fromPlain(n)),
            (this.#p = 0),
            (this.#y = 0));
    }
    addEventListener(t, n) {
        this.#r.addEventListener(t, n);
    }
    removeEventListener(t, n) {
        this.#r.removeEventListener(t, n);
    }
    get inputAudioMode() {
        return this.#l;
    }
    get inputVideoMode() {
        return this.#h;
    }
    get remainingVideoFrames() {
        return this.#u;
    }
    get remainingAudioFrames() {
        return this.#d;
    }
    get timestamp() {
        return this.#p;
    }
    get slot() {
        return this.#y;
    }
    getConsoleText() {
        return this.#v.getText();
    }
    pushHostMessage(t) {
        this.#t.pushHostMessage(this.#e, this.#n, t);
    }
    pushConsoleChunk(t) {
        this.#t.pushConsoleChunk(this.#e, this.#n, t);
    }
    get serviceId() {
        return this.#e;
    }
    get vmId() {
        return this.#n;
    }
    get outputVideoMode() {
        return this.#c;
    }
    get videoPlayer() {
        return this.#i;
    }
    get outputAudioMode() {
        return this.#o;
    }
    get audioPlayer() {
        return this.#s;
    }
    onFetcherMessage(t) {
        switch (t.data.type) {
            case 'best-block':
                this.#m !== null && this.#m.removeOldEvents();
                break;
            case 'output-mode':
                ((this.#c = Lt.fromPlain(t.data.video)),
                    (this.#o = Ut.fromPlain(t.data.audio)),
                    this.#a !== 'running' && this.#f('buffering'),
                    this.#r.fireEvent('output-mode', t.data));
                break;
            case 'input-mode':
                ((this.#l = Ut.fromPlain(t.data.audio)),
                    (this.#h = Lt.fromPlain(t.data.video)),
                    this.#r.fireEvent('input-mode', t.data));
                break;
            case 'fetch-event':
                this.#g('fetch', t.data);
                break;
            default:
                throw new Error(`Invalid message type: ${t.data.type}`);
        }
    }
    onTranscoderMessage(t) {
        if (t.data.type === 'transcode-event') this.#g('transcode', t.data);
        else throw new Error(`Invalid message type: ${t.data.type}`);
    }
    onEngineMessage(t) {
        switch (t.data.type) {
            case 'buffering-event':
                this.#g('buffering', t.data);
                break;
            case 'video-event':
                this.#g('video', t.data);
                break;
            case 'audio-event':
                this.#g('audio', t.data);
                break;
            case 'buffering':
                (this.#f('buffering'),
                    (this.#d = t.data.audioFrames),
                    (this.#u = t.data.videoFrames));
                break;
            case 'started':
                this.#f('running');
                break;
            case 'timestamp':
                ((this.#p = t.data.timestamp), (this.#y = t.data.slot));
                break;
            case 'video': {
                const [n, s] = this.#i.pushVideo(t.data);
                ((this.#u = t.data.remaining),
                    this.#f('running'),
                    this.#r.fireEvent('video', {
                        type: 'video',
                        remaining: t.data.remaining,
                        monitorWidth: n,
                        monitorHeight: s,
                    }));
                break;
            }
            case 'start-audio-playback': {
                (this.#s.resumePlayback(), this.#f('running'));
                break;
            }
            case 'console':
                (this.#v.push({ timestamp: t.data.timestamp, text: t.data.text }),
                    this.#f('running'),
                    this.#r.fireEvent('console'));
                break;
            case 'reset':
                (this.#w(t.data.video, t.data.audio),
                    this.#f('buffering'),
                    this.#r.fireEvent('reset'));
                break;
            case 'audio-remaining':
                ((this.#d = t.data.remaining),
                    this.#r.fireEvent('audio-remaining', t.data.remaining));
                break;
            case 'error':
                this.#t.addUnhandledError(t.data.error);
                break;
            default:
                throw new Error(`Invalid message type: ${t.data.type}`);
        }
    }
    #f(t) {
        this.#a !== t && ((this.#a = t), this.#r.fireEvent('engine-state', this.#a));
    }
    get engineState() {
        return this.#a;
    }
    get timeline() {
        return this.#m;
    }
    #g(t, n) {
        if (this.#m === null) {
            if (!this.#t.parameters) return;
            this.#m = new ta(fa, this.#t.parameters.slot_period_sec);
        }
        (this.#m.addEvent(t, n), this.#r.fireEvent('timeline', {}));
    }
    remove() {
        this.#t.removeVm(this.#e, this.#n);
    }
}
async function ua() {
    let e;
    const t = localStorage.getItem(Cr);
    if (t !== null)
        try {
            e = await cn.fromJSON(JSON.parse(t));
        } catch (n) {
            (console.debug('Failed to load input private key from local storage', n), (e = void 0));
        }
    if (!e) {
        e = await cn.generate();
        const n = await e.toJSON();
        localStorage.setItem(Cr, JSON.stringify(n));
    }
    return e;
}
const fa = 50,
    Cr = 'corevm-input-key';
function da(e) {
    return e.toString(16);
}
function ha(e) {
    return e.toString();
}
const _t = (e, t) => {
        const n = e.__vccOpts || e;
        for (const [s, r] of t) n[s] = r;
        return n;
    },
    pa = 'wss://builder.jamtoaster.network/wss',
    ma = 'wss://builder.jamtoaster.network',
    ga = {
        setup() {
            const e = Sn(new aa());
            Ot('vmPlayerContext', e);
            const t = Sn(null);
            return (Ot('builder', t), { builder: t, vmPlayerContext: e });
        },
        data() {
            return { state: 'initial', builderState: 'initial', onError: null };
        },
        computed: {
            nodeStateString() {
                switch (this.state) {
                    case 'connecting-to-node':
                        return 'Connecting…';
                    case 'connected-to-node':
                        return 'Connected';
                    default:
                        return 'Disconnected';
                }
            },
            builderStateString() {
                switch (this.state) {
                    case 'connecting':
                        return 'Connecting…';
                    case 'connected':
                        return 'Connected';
                    default:
                        return 'Disconnected';
                }
            },
        },
        async beforeMount() {
            ((this.onError = (e) => {
                this.vmPlayerContext.addUnhandledError(e);
            }),
                window.addEventListener('error', this.onError),
                window.addEventListener('unhandledrejection', this.onError),
                (this.onState = async (e) => {
                    if (this.state !== 'initial')
                        switch (e) {
                            case 'connecting':
                                this.state = 'connecting-to-node';
                                break;
                            case 'connected':
                                ((this.state = 'connected-to-node'),
                                    this.$router.push({ name: 'stations' }));
                                break;
                        }
                }),
                this.vmPlayerContext.addEventListener('node-connection-state', this.onState),
                (this.onBuilderState = async (e) => {
                    switch (e.state) {
                        case 'disconnected':
                            (await this.connectToCoreVmBuilder(), (this.builderState = e.state));
                            break;
                        case 'connecting':
                            this.builderState = e.state;
                            break;
                        case 'connected':
                            this.builderState = e.state;
                            break;
                        default:
                            throw new Error(`Invalid state: ${e.state}`);
                    }
                }),
                this.vmPlayerContext.addEventListener(
                    'builder-connection-state',
                    this.onBuilderState,
                ),
                await this.connectToJamNode(),
                await this.connectToCoreVmBuilder());
        },
        unmounted() {
            (window.removeEventListener('error', this.onError),
                window.removeEventListener('unhandledrejection', this.onError),
                this.vmPlayerContext.removeEventListener('node-connection-state', this.onState),
                this.vmPlayerContext.removeEventListener(
                    'builder-connection-state',
                    this.onBuilderState,
                ));
        },
        methods: {
            async connectToJamNode() {
                ((this.state = 'connecting-to-node'), this.vmPlayerContext.connectToJamNode(pa));
            },
            async connectToCoreVmBuilder() {
                await this.vmPlayerContext.connectToCoreVmBuilder(ma);
            },
            async stopPlayers() {
                (await this.vmPlayerContext.stopAudioCapture(),
                    this.vmPlayerContext.removeAllVms(),
                    this.builder !== null && (this.builder.close(), (this.builder = null)),
                    (this.state = 'connected-to-node'));
            },
        },
    },
    ya = { key: 1, class: 'content' };
function va(e, t, n, s, r, i) {
    const o = Rl('RouterView');
    return r.state === 'connected-to-node' && r.builderState === 'connected'
        ? (D(), Rn(o, { key: 0 }))
        : (D(),
          Q('main', ya, [
              Ee('div', null, 'Node: ' + $t(i.nodeStateString), 1),
              Ee('div', null, 'Builder: ' + $t(i.builderStateString), 1),
          ]));
}
const ba = _t(ga, [
    ['render', va],
    ['__scopeId', 'data-v-3d28dd35'],
]);
const Pt = typeof document < 'u';
function co(e) {
    return typeof e == 'object' || 'displayName' in e || 'props' in e || '__vccOpts' in e;
}
function _a(e) {
    return e.__esModule || e[Symbol.toStringTag] === 'Module' || (e.default && co(e.default));
}
const K = Object.assign;
function ts(e, t) {
    const n = {};
    for (const s in t) {
        const r = t[s];
        n[s] = Ie(r) ? r.map(e) : e(r);
    }
    return n;
}
const Zt = () => {},
    Ie = Array.isArray,
    ao = /#/g,
    wa = /&/g,
    Sa = /\//g,
    Ea = /=/g,
    Ca = /\?/g,
    uo = /\+/g,
    xa = /%5B/g,
    Pa = /%5D/g,
    fo = /%5E/g,
    Ra = /%60/g,
    ho = /%7B/g,
    Ma = /%7C/g,
    po = /%7D/g,
    Aa = /%20/g;
function Hs(e) {
    return encodeURI('' + e)
        .replace(Ma, '|')
        .replace(xa, '[')
        .replace(Pa, ']');
}
function Ta(e) {
    return Hs(e).replace(ho, '{').replace(po, '}').replace(fo, '^');
}
function ys(e) {
    return Hs(e)
        .replace(uo, '%2B')
        .replace(Aa, '+')
        .replace(ao, '%23')
        .replace(wa, '%26')
        .replace(Ra, '`')
        .replace(ho, '{')
        .replace(po, '}')
        .replace(fo, '^');
}
function Ia(e) {
    return ys(e).replace(Ea, '%3D');
}
function ka(e) {
    return Hs(e).replace(ao, '%23').replace(Ca, '%3F');
}
function Oa(e) {
    return e == null ? '' : ka(e).replace(Sa, '%2F');
}
function an(e) {
    try {
        return decodeURIComponent('' + e);
    } catch {}
    return '' + e;
}
const La = /\/$/,
    Ua = (e) => e.replace(La, '');
function ns(e, t, n = '/') {
    let s,
        r = {},
        i = '',
        o = '';
    const l = t.indexOf('#');
    let c = t.indexOf('?');
    return (
        l < c && l >= 0 && (c = -1),
        c > -1 && ((s = t.slice(0, c)), (i = t.slice(c + 1, l > -1 ? l : t.length)), (r = e(i))),
        l > -1 && ((s = s || t.slice(0, l)), (o = t.slice(l, t.length))),
        (s = Fa(s ?? t, n)),
        { fullPath: s + (i && '?') + i + o, path: s, query: r, hash: an(o) }
    );
}
function $a(e, t) {
    const n = t.query ? e(t.query) : '';
    return t.path + (n && '?') + n + (t.hash || '');
}
function xr(e, t) {
    return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || '/';
}
function Na(e, t, n) {
    const s = t.matched.length - 1,
        r = n.matched.length - 1;
    return (
        s > -1 &&
        s === r &&
        Vt(t.matched[s], n.matched[r]) &&
        mo(t.params, n.params) &&
        e(t.query) === e(n.query) &&
        t.hash === n.hash
    );
}
function Vt(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t);
}
function mo(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const n in e) if (!Va(e[n], t[n])) return !1;
    return !0;
}
function Va(e, t) {
    return Ie(e) ? Pr(e, t) : Ie(t) ? Pr(t, e) : e === t;
}
function Pr(e, t) {
    return Ie(t)
        ? e.length === t.length && e.every((n, s) => n === t[s])
        : e.length === 1 && e[0] === t;
}
function Fa(e, t) {
    if (e.startsWith('/')) return e;
    if (!e) return t;
    const n = t.split('/'),
        s = e.split('/'),
        r = s[s.length - 1];
    (r === '..' || r === '.') && s.push('');
    let i = n.length - 1,
        o,
        l;
    for (o = 0; o < s.length; o++)
        if (((l = s[o]), l !== '.'))
            if (l === '..') i > 1 && i--;
            else break;
    return n.slice(0, i).join('/') + '/' + s.slice(o).join('/');
}
const it = {
    path: '/',
    name: void 0,
    params: {},
    query: {},
    hash: '',
    fullPath: '/',
    matched: [],
    meta: {},
    redirectedFrom: void 0,
};
var un;
(function (e) {
    ((e.pop = 'pop'), (e.push = 'push'));
})(un || (un = {}));
var en;
(function (e) {
    ((e.back = 'back'), (e.forward = 'forward'), (e.unknown = ''));
})(en || (en = {}));
function Ha(e) {
    if (!e)
        if (Pt) {
            const t = document.querySelector('base');
            ((e = (t && t.getAttribute('href')) || '/'), (e = e.replace(/^\w+:\/\/[^\/]+/, '')));
        } else e = '/';
    return (e[0] !== '/' && e[0] !== '#' && (e = '/' + e), Ua(e));
}
const ja = /^[^#]+#/;
function Da(e, t) {
    return e.replace(ja, '#') + t;
}
function Ba(e, t) {
    const n = document.documentElement.getBoundingClientRect(),
        s = e.getBoundingClientRect();
    return {
        behavior: t.behavior,
        left: s.left - n.left - (t.left || 0),
        top: s.top - n.top - (t.top || 0),
    };
}
const Dn = () => ({ left: window.scrollX, top: window.scrollY });
function Ka(e) {
    let t;
    if ('el' in e) {
        const n = e.el,
            s = typeof n == 'string' && n.startsWith('#'),
            r =
                typeof n == 'string'
                    ? s
                        ? document.getElementById(n.slice(1))
                        : document.querySelector(n)
                    : n;
        if (!r) return;
        t = Ba(r, e);
    } else t = e;
    'scrollBehavior' in document.documentElement.style
        ? window.scrollTo(t)
        : window.scrollTo(
              t.left != null ? t.left : window.scrollX,
              t.top != null ? t.top : window.scrollY,
          );
}
function Rr(e, t) {
    return (history.state ? history.state.position - t : -1) + e;
}
const vs = new Map();
function Wa(e, t) {
    vs.set(e, t);
}
function za(e) {
    const t = vs.get(e);
    return (vs.delete(e), t);
}
let Ga = () => location.protocol + '//' + location.host;
function go(e, t) {
    const { pathname: n, search: s, hash: r } = t,
        i = e.indexOf('#');
    if (i > -1) {
        let l = r.includes(e.slice(i)) ? e.slice(i).length : 1,
            c = r.slice(l);
        return (c[0] !== '/' && (c = '/' + c), xr(c, ''));
    }
    return xr(n, e) + s + r;
}
function qa(e, t, n, s) {
    let r = [],
        i = [],
        o = null;
    const l = ({ state: m }) => {
        const g = go(e, location),
            M = n.value,
            A = t.value;
        let H = 0;
        if (m) {
            if (((n.value = g), (t.value = m), o && o === M)) {
                o = null;
                return;
            }
            H = A ? m.position - A.position : 0;
        } else s(g);
        r.forEach((U) => {
            U(n.value, M, {
                delta: H,
                type: un.pop,
                direction: H ? (H > 0 ? en.forward : en.back) : en.unknown,
            });
        });
    };
    function c() {
        o = n.value;
    }
    function d(m) {
        r.push(m);
        const g = () => {
            const M = r.indexOf(m);
            M > -1 && r.splice(M, 1);
        };
        return (i.push(g), g);
    }
    function u() {
        const { history: m } = window;
        m.state && m.replaceState(K({}, m.state, { scroll: Dn() }), '');
    }
    function h() {
        for (const m of i) m();
        ((i = []),
            window.removeEventListener('popstate', l),
            window.removeEventListener('beforeunload', u));
    }
    return (
        window.addEventListener('popstate', l),
        window.addEventListener('beforeunload', u, { passive: !0 }),
        { pauseListeners: c, listen: d, destroy: h }
    );
}
function Mr(e, t, n, s = !1, r = !1) {
    return {
        back: e,
        current: t,
        forward: n,
        replaced: s,
        position: window.history.length,
        scroll: r ? Dn() : null,
    };
}
function Ja(e) {
    const { history: t, location: n } = window,
        s = { value: go(e, n) },
        r = { value: t.state };
    r.value ||
        i(
            s.value,
            {
                back: null,
                current: s.value,
                forward: null,
                position: t.length - 1,
                replaced: !0,
                scroll: null,
            },
            !0,
        );
    function i(c, d, u) {
        const h = e.indexOf('#'),
            m =
                h > -1
                    ? (n.host && document.querySelector('base') ? e : e.slice(h)) + c
                    : Ga() + e + c;
        try {
            (t[u ? 'replaceState' : 'pushState'](d, '', m), (r.value = d));
        } catch (g) {
            (console.error(g), n[u ? 'replace' : 'assign'](m));
        }
    }
    function o(c, d) {
        const u = K({}, t.state, Mr(r.value.back, c, r.value.forward, !0), d, {
            position: r.value.position,
        });
        (i(c, u, !0), (s.value = c));
    }
    function l(c, d) {
        const u = K({}, r.value, t.state, { forward: c, scroll: Dn() });
        i(u.current, u, !0);
        const h = K({}, Mr(s.value, c, null), { position: u.position + 1 }, d);
        (i(c, h, !1), (s.value = c));
    }
    return { location: s, state: r, push: l, replace: o };
}
function Ya(e) {
    e = Ha(e);
    const t = Ja(e),
        n = qa(e, t.state, t.location, t.replace);
    function s(i, o = !0) {
        (o || n.pauseListeners(), history.go(i));
    }
    const r = K({ location: '', base: e, go: s, createHref: Da.bind(null, e) }, t, n);
    return (
        Object.defineProperty(r, 'location', { enumerable: !0, get: () => t.location.value }),
        Object.defineProperty(r, 'state', { enumerable: !0, get: () => t.state.value }),
        r
    );
}
function Qa(e) {
    return typeof e == 'string' || (e && typeof e == 'object');
}
function yo(e) {
    return typeof e == 'string' || typeof e == 'symbol';
}
const vo = Symbol('');
var Ar;
(function (e) {
    ((e[(e.aborted = 4)] = 'aborted'),
        (e[(e.cancelled = 8)] = 'cancelled'),
        (e[(e.duplicated = 16)] = 'duplicated'));
})(Ar || (Ar = {}));
function Ft(e, t) {
    return K(new Error(), { type: e, [vo]: !0 }, t);
}
function qe(e, t) {
    return e instanceof Error && vo in e && (t == null || !!(e.type & t));
}
const Tr = '[^/]+?',
    Xa = { sensitive: !1, strict: !1, start: !0, end: !0 },
    Za = /[.+*?^${}()[\]/\\]/g;
function eu(e, t) {
    const n = K({}, Xa, t),
        s = [];
    let r = n.start ? '^' : '';
    const i = [];
    for (const d of e) {
        const u = d.length ? [] : [90];
        n.strict && !d.length && (r += '/');
        for (let h = 0; h < d.length; h++) {
            const m = d[h];
            let g = 40 + (n.sensitive ? 0.25 : 0);
            if (m.type === 0) (h || (r += '/'), (r += m.value.replace(Za, '\\$&')), (g += 40));
            else if (m.type === 1) {
                const { value: M, repeatable: A, optional: H, regexp: U } = m;
                i.push({ name: M, repeatable: A, optional: H });
                const k = U || Tr;
                if (k !== Tr) {
                    g += 10;
                    try {
                        new RegExp(`(${k})`);
                    } catch (T) {
                        throw new Error(
                            `Invalid custom RegExp for param "${M}" (${k}): ` + T.message,
                        );
                    }
                }
                let $ = A ? `((?:${k})(?:/(?:${k}))*)` : `(${k})`;
                (h || ($ = H && d.length < 2 ? `(?:/${$})` : '/' + $),
                    H && ($ += '?'),
                    (r += $),
                    (g += 20),
                    H && (g += -8),
                    A && (g += -20),
                    k === '.*' && (g += -50));
            }
            u.push(g);
        }
        s.push(u);
    }
    if (n.strict && n.end) {
        const d = s.length - 1;
        s[d][s[d].length - 1] += 0.7000000000000001;
    }
    (n.strict || (r += '/?'),
        n.end ? (r += '$') : n.strict && !r.endsWith('/') && (r += '(?:/|$)'));
    const o = new RegExp(r, n.sensitive ? '' : 'i');
    function l(d) {
        const u = d.match(o),
            h = {};
        if (!u) return null;
        for (let m = 1; m < u.length; m++) {
            const g = u[m] || '',
                M = i[m - 1];
            h[M.name] = g && M.repeatable ? g.split('/') : g;
        }
        return h;
    }
    function c(d) {
        let u = '',
            h = !1;
        for (const m of e) {
            ((!h || !u.endsWith('/')) && (u += '/'), (h = !1));
            for (const g of m)
                if (g.type === 0) u += g.value;
                else if (g.type === 1) {
                    const { value: M, repeatable: A, optional: H } = g,
                        U = M in d ? d[M] : '';
                    if (Ie(U) && !A)
                        throw new Error(
                            `Provided param "${M}" is an array but it is not repeatable (* or + modifiers)`,
                        );
                    const k = Ie(U) ? U.join('/') : U;
                    if (!k)
                        if (H) m.length < 2 && (u.endsWith('/') ? (u = u.slice(0, -1)) : (h = !0));
                        else throw new Error(`Missing required param "${M}"`);
                    u += k;
                }
        }
        return u || '/';
    }
    return { re: o, score: s, keys: i, parse: l, stringify: c };
}
function tu(e, t) {
    let n = 0;
    for (; n < e.length && n < t.length;) {
        const s = t[n] - e[n];
        if (s) return s;
        n++;
    }
    return e.length < t.length
        ? e.length === 1 && e[0] === 80
            ? -1
            : 1
        : e.length > t.length
          ? t.length === 1 && t[0] === 80
              ? 1
              : -1
          : 0;
}
function bo(e, t) {
    let n = 0;
    const s = e.score,
        r = t.score;
    for (; n < s.length && n < r.length;) {
        const i = tu(s[n], r[n]);
        if (i) return i;
        n++;
    }
    if (Math.abs(r.length - s.length) === 1) {
        if (Ir(s)) return 1;
        if (Ir(r)) return -1;
    }
    return r.length - s.length;
}
function Ir(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0;
}
const nu = { type: 0, value: '' },
    su = /[a-zA-Z0-9_]/;
function ru(e) {
    if (!e) return [[]];
    if (e === '/') return [[nu]];
    if (!e.startsWith('/')) throw new Error(`Invalid path "${e}"`);
    function t(g) {
        throw new Error(`ERR (${n})/"${d}": ${g}`);
    }
    let n = 0,
        s = n;
    const r = [];
    let i;
    function o() {
        (i && r.push(i), (i = []));
    }
    let l = 0,
        c,
        d = '',
        u = '';
    function h() {
        d &&
            (n === 0
                ? i.push({ type: 0, value: d })
                : n === 1 || n === 2 || n === 3
                  ? (i.length > 1 &&
                        (c === '*' || c === '+') &&
                        t(`A repeatable param (${d}) must be alone in its segment. eg: '/:ids+.`),
                    i.push({
                        type: 1,
                        value: d,
                        regexp: u,
                        repeatable: c === '*' || c === '+',
                        optional: c === '*' || c === '?',
                    }))
                  : t('Invalid state to consume buffer'),
            (d = ''));
    }
    function m() {
        d += c;
    }
    for (; l < e.length;) {
        if (((c = e[l++]), c === '\\' && n !== 2)) {
            ((s = n), (n = 4));
            continue;
        }
        switch (n) {
            case 0:
                c === '/' ? (d && h(), o()) : c === ':' ? (h(), (n = 1)) : m();
                break;
            case 4:
                (m(), (n = s));
                break;
            case 1:
                c === '('
                    ? (n = 2)
                    : su.test(c)
                      ? m()
                      : (h(), (n = 0), c !== '*' && c !== '?' && c !== '+' && l--);
                break;
            case 2:
                c === ')'
                    ? u[u.length - 1] == '\\'
                        ? (u = u.slice(0, -1) + c)
                        : (n = 3)
                    : (u += c);
                break;
            case 3:
                (h(), (n = 0), c !== '*' && c !== '?' && c !== '+' && l--, (u = ''));
                break;
            default:
                t('Unknown state');
                break;
        }
    }
    return (n === 2 && t(`Unfinished custom RegExp for param "${d}"`), h(), o(), r);
}
function iu(e, t, n) {
    const s = eu(ru(e.path), n),
        r = K(s, { record: e, parent: t, children: [], alias: [] });
    return (t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r);
}
function ou(e, t) {
    const n = [],
        s = new Map();
    t = Ur({ strict: !1, end: !0, sensitive: !1 }, t);
    function r(h) {
        return s.get(h);
    }
    function i(h, m, g) {
        const M = !g,
            A = Or(h);
        A.aliasOf = g && g.record;
        const H = Ur(t, h),
            U = [A];
        if ('alias' in h) {
            const T = typeof h.alias == 'string' ? [h.alias] : h.alias;
            for (const J of T)
                U.push(
                    Or(
                        K({}, A, {
                            components: g ? g.record.components : A.components,
                            path: J,
                            aliasOf: g ? g.record : A,
                        }),
                    ),
                );
        }
        let k, $;
        for (const T of U) {
            const { path: J } = T;
            if (m && J[0] !== '/') {
                const le = m.record.path,
                    se = le[le.length - 1] === '/' ? '' : '/';
                T.path = m.record.path + (J && se + J);
            }
            if (
                ((k = iu(T, m, H)),
                g
                    ? g.alias.push(k)
                    : (($ = $ || k),
                      $ !== k && $.alias.push(k),
                      M && h.name && !Lr(k) && o(h.name)),
                _o(k) && c(k),
                A.children)
            ) {
                const le = A.children;
                for (let se = 0; se < le.length; se++) i(le[se], k, g && g.children[se]);
            }
            g = g || k;
        }
        return $
            ? () => {
                  o($);
              }
            : Zt;
    }
    function o(h) {
        if (yo(h)) {
            const m = s.get(h);
            m &&
                (s.delete(h), n.splice(n.indexOf(m), 1), m.children.forEach(o), m.alias.forEach(o));
        } else {
            const m = n.indexOf(h);
            m > -1 &&
                (n.splice(m, 1),
                h.record.name && s.delete(h.record.name),
                h.children.forEach(o),
                h.alias.forEach(o));
        }
    }
    function l() {
        return n;
    }
    function c(h) {
        const m = au(h, n);
        (n.splice(m, 0, h), h.record.name && !Lr(h) && s.set(h.record.name, h));
    }
    function d(h, m) {
        let g,
            M = {},
            A,
            H;
        if ('name' in h && h.name) {
            if (((g = s.get(h.name)), !g)) throw Ft(1, { location: h });
            ((H = g.record.name),
                (M = K(
                    kr(
                        m.params,
                        g.keys
                            .filter(($) => !$.optional)
                            .concat(g.parent ? g.parent.keys.filter(($) => $.optional) : [])
                            .map(($) => $.name),
                    ),
                    h.params &&
                        kr(
                            h.params,
                            g.keys.map(($) => $.name),
                        ),
                )),
                (A = g.stringify(M)));
        } else if (h.path != null)
            ((A = h.path),
                (g = n.find(($) => $.re.test(A))),
                g && ((M = g.parse(A)), (H = g.record.name)));
        else {
            if (((g = m.name ? s.get(m.name) : n.find(($) => $.re.test(m.path))), !g))
                throw Ft(1, { location: h, currentLocation: m });
            ((H = g.record.name), (M = K({}, m.params, h.params)), (A = g.stringify(M)));
        }
        const U = [];
        let k = g;
        for (; k;) (U.unshift(k.record), (k = k.parent));
        return { name: H, path: A, params: M, matched: U, meta: cu(U) };
    }
    e.forEach((h) => i(h));
    function u() {
        ((n.length = 0), s.clear());
    }
    return {
        addRoute: i,
        resolve: d,
        removeRoute: o,
        clearRoutes: u,
        getRoutes: l,
        getRecordMatcher: r,
    };
}
function kr(e, t) {
    const n = {};
    for (const s of t) s in e && (n[s] = e[s]);
    return n;
}
function Or(e) {
    const t = {
        path: e.path,
        redirect: e.redirect,
        name: e.name,
        meta: e.meta || {},
        aliasOf: e.aliasOf,
        beforeEnter: e.beforeEnter,
        props: lu(e),
        children: e.children || [],
        instances: {},
        leaveGuards: new Set(),
        updateGuards: new Set(),
        enterCallbacks: {},
        components:
            'components' in e ? e.components || null : e.component && { default: e.component },
    };
    return (Object.defineProperty(t, 'mods', { value: {} }), t);
}
function lu(e) {
    const t = {},
        n = e.props || !1;
    if ('component' in e) t.default = n;
    else for (const s in e.components) t[s] = typeof n == 'object' ? n[s] : n;
    return t;
}
function Lr(e) {
    for (; e;) {
        if (e.record.aliasOf) return !0;
        e = e.parent;
    }
    return !1;
}
function cu(e) {
    return e.reduce((t, n) => K(t, n.meta), {});
}
function Ur(e, t) {
    const n = {};
    for (const s in e) n[s] = s in t ? t[s] : e[s];
    return n;
}
function au(e, t) {
    let n = 0,
        s = t.length;
    for (; n !== s;) {
        const i = (n + s) >> 1;
        bo(e, t[i]) < 0 ? (s = i) : (n = i + 1);
    }
    const r = uu(e);
    return (r && (s = t.lastIndexOf(r, s - 1)), s);
}
function uu(e) {
    let t = e;
    for (; (t = t.parent);) if (_o(t) && bo(e, t) === 0) return t;
}
function _o({ record: e }) {
    return !!(e.name || (e.components && Object.keys(e.components).length) || e.redirect);
}
function fu(e) {
    const t = {};
    if (e === '' || e === '?') return t;
    const s = (e[0] === '?' ? e.slice(1) : e).split('&');
    for (let r = 0; r < s.length; ++r) {
        const i = s[r].replace(uo, ' '),
            o = i.indexOf('='),
            l = an(o < 0 ? i : i.slice(0, o)),
            c = o < 0 ? null : an(i.slice(o + 1));
        if (l in t) {
            let d = t[l];
            (Ie(d) || (d = t[l] = [d]), d.push(c));
        } else t[l] = c;
    }
    return t;
}
function $r(e) {
    let t = '';
    for (let n in e) {
        const s = e[n];
        if (((n = Ia(n)), s == null)) {
            s !== void 0 && (t += (t.length ? '&' : '') + n);
            continue;
        }
        (Ie(s) ? s.map((i) => i && ys(i)) : [s && ys(s)]).forEach((i) => {
            i !== void 0 && ((t += (t.length ? '&' : '') + n), i != null && (t += '=' + i));
        });
    }
    return t;
}
function du(e) {
    const t = {};
    for (const n in e) {
        const s = e[n];
        s !== void 0 &&
            (t[n] = Ie(s) ? s.map((r) => (r == null ? null : '' + r)) : s == null ? s : '' + s);
    }
    return t;
}
const hu = Symbol(''),
    Nr = Symbol(''),
    js = Symbol(''),
    wo = Symbol(''),
    bs = Symbol('');
function Kt() {
    let e = [];
    function t(s) {
        return (
            e.push(s),
            () => {
                const r = e.indexOf(s);
                r > -1 && e.splice(r, 1);
            }
        );
    }
    function n() {
        e = [];
    }
    return { add: t, list: () => e.slice(), reset: n };
}
function ct(e, t, n, s, r, i = (o) => o()) {
    const o = s && (s.enterCallbacks[r] = s.enterCallbacks[r] || []);
    return () =>
        new Promise((l, c) => {
            const d = (m) => {
                    m === !1
                        ? c(Ft(4, { from: n, to: t }))
                        : m instanceof Error
                          ? c(m)
                          : Qa(m)
                            ? c(Ft(2, { from: t, to: m }))
                            : (o &&
                                  s.enterCallbacks[r] === o &&
                                  typeof m == 'function' &&
                                  o.push(m),
                              l());
                },
                u = i(() => e.call(s && s.instances[r], t, n, d));
            let h = Promise.resolve(u);
            (e.length < 3 && (h = h.then(d)), h.catch((m) => c(m)));
        });
}
function ss(e, t, n, s, r = (i) => i()) {
    const i = [];
    for (const o of e)
        for (const l in o.components) {
            let c = o.components[l];
            if (!(t !== 'beforeRouteEnter' && !o.instances[l]))
                if (co(c)) {
                    const u = (c.__vccOpts || c)[t];
                    u && i.push(ct(u, n, s, o, l, r));
                } else {
                    let d = c();
                    i.push(() =>
                        d.then((u) => {
                            if (!u)
                                throw new Error(`Couldn't resolve component "${l}" at "${o.path}"`);
                            const h = _a(u) ? u.default : u;
                            ((o.mods[l] = u), (o.components[l] = h));
                            const g = (h.__vccOpts || h)[t];
                            return g && ct(g, n, s, o, l, r)();
                        }),
                    );
                }
        }
    return i;
}
function Vr(e) {
    const t = Ke(js),
        n = Ke(wo),
        s = Re(() => {
            const c = Me(e.to);
            return t.resolve(c);
        }),
        r = Re(() => {
            const { matched: c } = s.value,
                { length: d } = c,
                u = c[d - 1],
                h = n.matched;
            if (!u || !h.length) return -1;
            const m = h.findIndex(Vt.bind(null, u));
            if (m > -1) return m;
            const g = Fr(c[d - 2]);
            return d > 1 && Fr(u) === g && h[h.length - 1].path !== g
                ? h.findIndex(Vt.bind(null, c[d - 2]))
                : m;
        }),
        i = Re(() => r.value > -1 && vu(n.params, s.value.params)),
        o = Re(
            () => r.value > -1 && r.value === n.matched.length - 1 && mo(n.params, s.value.params),
        );
    function l(c = {}) {
        if (yu(c)) {
            const d = t[Me(e.replace) ? 'replace' : 'push'](Me(e.to)).catch(Zt);
            return (
                e.viewTransition &&
                    typeof document < 'u' &&
                    'startViewTransition' in document &&
                    document.startViewTransition(() => d),
                d
            );
        }
        return Promise.resolve();
    }
    return { route: s, href: Re(() => s.value.href), isActive: i, isExactActive: o, navigate: l };
}
function pu(e) {
    return e.length === 1 ? e[0] : e;
}
const mu = Pi({
        name: 'RouterLink',
        compatConfig: { MODE: 3 },
        props: {
            to: { type: [String, Object], required: !0 },
            replace: Boolean,
            activeClass: String,
            exactActiveClass: String,
            custom: Boolean,
            ariaCurrentValue: { type: String, default: 'page' },
            viewTransition: Boolean,
        },
        useLink: Vr,
        setup(e, { slots: t }) {
            const n = Nn(Vr(e)),
                { options: s } = Ke(js),
                r = Re(() => ({
                    [Hr(e.activeClass, s.linkActiveClass, 'router-link-active')]: n.isActive,
                    [Hr(e.exactActiveClass, s.linkExactActiveClass, 'router-link-exact-active')]:
                        n.isExactActive,
                }));
            return () => {
                const i = t.default && pu(t.default(n));
                return e.custom
                    ? i
                    : to(
                          'a',
                          {
                              'aria-current': n.isExactActive ? e.ariaCurrentValue : null,
                              href: n.href,
                              onClick: n.navigate,
                              class: r.value,
                          },
                          i,
                      );
            };
        },
    }),
    gu = mu;
function yu(e) {
    if (
        !(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) &&
        !e.defaultPrevented &&
        !(e.button !== void 0 && e.button !== 0)
    ) {
        if (e.currentTarget && e.currentTarget.getAttribute) {
            const t = e.currentTarget.getAttribute('target');
            if (/\b_blank\b/i.test(t)) return;
        }
        return (e.preventDefault && e.preventDefault(), !0);
    }
}
function vu(e, t) {
    for (const n in t) {
        const s = t[n],
            r = e[n];
        if (typeof s == 'string') {
            if (s !== r) return !1;
        } else if (!Ie(r) || r.length !== s.length || s.some((i, o) => i !== r[o])) return !1;
    }
    return !0;
}
function Fr(e) {
    return e ? (e.aliasOf ? e.aliasOf.path : e.path) : '';
}
const Hr = (e, t, n) => e ?? t ?? n,
    bu = Pi({
        name: 'RouterView',
        inheritAttrs: !1,
        props: { name: { type: String, default: 'default' }, route: Object },
        compatConfig: { MODE: 3 },
        setup(e, { attrs: t, slots: n }) {
            const s = Ke(bs),
                r = Re(() => e.route || s.value),
                i = Ke(Nr, 0),
                o = Re(() => {
                    let d = Me(i);
                    const { matched: u } = r.value;
                    let h;
                    for (; (h = u[d]) && !h.components;) d++;
                    return d;
                }),
                l = Re(() => r.value.matched[o.value]);
            (Ot(
                Nr,
                Re(() => o.value + 1),
            ),
                Ot(hu, l),
                Ot(bs, r));
            const c = il();
            return (
                Qt(
                    () => [c.value, l.value, e.name],
                    ([d, u, h], [m, g, M]) => {
                        (u &&
                            ((u.instances[h] = d),
                            g &&
                                g !== u &&
                                d &&
                                d === m &&
                                (u.leaveGuards.size || (u.leaveGuards = g.leaveGuards),
                                u.updateGuards.size || (u.updateGuards = g.updateGuards))),
                            d &&
                                u &&
                                (!g || !Vt(u, g) || !m) &&
                                (u.enterCallbacks[h] || []).forEach((A) => A(d)));
                    },
                    { flush: 'post' },
                ),
                () => {
                    const d = r.value,
                        u = e.name,
                        h = l.value,
                        m = h && h.components[u];
                    if (!m) return jr(n.default, { Component: m, route: d });
                    const g = h.props[u],
                        M = g ? (g === !0 ? d.params : typeof g == 'function' ? g(d) : g) : null,
                        H = to(
                            m,
                            K({}, M, t, {
                                onVnodeUnmounted: (U) => {
                                    U.component.isUnmounted && (h.instances[u] = null);
                                },
                                ref: c,
                            }),
                        );
                    return jr(n.default, { Component: H, route: d }) || H;
                }
            );
        },
    });
function jr(e, t) {
    if (!e) return null;
    const n = e(t);
    return n.length === 1 ? n[0] : n;
}
const _u = bu;
function wu(e) {
    const t = ou(e.routes, e),
        n = e.parseQuery || fu,
        s = e.stringifyQuery || $r,
        r = e.history,
        i = Kt(),
        o = Kt(),
        l = Kt(),
        c = Sn(it);
    let d = it;
    Pt &&
        e.scrollBehavior &&
        'scrollRestoration' in history &&
        (history.scrollRestoration = 'manual');
    const u = ts.bind(null, (v) => '' + v),
        h = ts.bind(null, Oa),
        m = ts.bind(null, an);
    function g(v, R) {
        let x, I;
        return (yo(v) ? ((x = t.getRecordMatcher(v)), (I = R)) : (I = v), t.addRoute(I, x));
    }
    function M(v) {
        const R = t.getRecordMatcher(v);
        R && t.removeRoute(R);
    }
    function A() {
        return t.getRoutes().map((v) => v.record);
    }
    function H(v) {
        return !!t.getRecordMatcher(v);
    }
    function U(v, R) {
        if (((R = K({}, R || c.value)), typeof v == 'string')) {
            const p = ns(n, v, R.path),
                y = t.resolve({ path: p.path }, R),
                _ = r.createHref(p.fullPath);
            return K(p, y, {
                params: m(y.params),
                hash: an(p.hash),
                redirectedFrom: void 0,
                href: _,
            });
        }
        let x;
        if (v.path != null) x = K({}, v, { path: ns(n, v.path, R.path).path });
        else {
            const p = K({}, v.params);
            for (const y in p) p[y] == null && delete p[y];
            ((x = K({}, v, { params: h(p) })), (R.params = h(R.params)));
        }
        const I = t.resolve(x, R),
            Y = v.hash || '';
        I.params = u(m(I.params));
        const a = $a(s, K({}, v, { hash: Ta(Y), path: I.path })),
            f = r.createHref(a);
        return K({ fullPath: a, hash: Y, query: s === $r ? du(v.query) : v.query || {} }, I, {
            redirectedFrom: void 0,
            href: f,
        });
    }
    function k(v) {
        return typeof v == 'string' ? ns(n, v, c.value.path) : K({}, v);
    }
    function $(v, R) {
        if (d !== v) return Ft(8, { from: R, to: v });
    }
    function T(v) {
        return se(v);
    }
    function J(v) {
        return T(K(k(v), { replace: !0 }));
    }
    function le(v) {
        const R = v.matched[v.matched.length - 1];
        if (R && R.redirect) {
            const { redirect: x } = R;
            let I = typeof x == 'function' ? x(v) : x;
            return (
                typeof I == 'string' &&
                    ((I = I.includes('?') || I.includes('#') ? (I = k(I)) : { path: I }),
                    (I.params = {})),
                K({ query: v.query, hash: v.hash, params: I.path != null ? {} : v.params }, I)
            );
        }
    }
    function se(v, R) {
        const x = (d = U(v)),
            I = c.value,
            Y = v.state,
            a = v.force,
            f = v.replace === !0,
            p = le(x);
        if (p)
            return se(
                K(k(p), {
                    state: typeof p == 'object' ? K({}, Y, p.state) : Y,
                    force: a,
                    replace: f,
                }),
                R || x,
            );
        const y = x;
        y.redirectedFrom = R;
        let _;
        return (
            !a && Na(s, I, x) && ((_ = Ft(16, { to: y, from: I })), Ue(I, I, !0, !1)),
            (_ ? Promise.resolve(_) : Oe(y, I))
                .catch((b) => (qe(b) ? (qe(b, 2) ? b : rt(b)) : B(b, y, I)))
                .then((b) => {
                    if (b) {
                        if (qe(b, 2))
                            return se(
                                K({ replace: f }, k(b.to), {
                                    state: typeof b.to == 'object' ? K({}, Y, b.to.state) : Y,
                                    force: a,
                                }),
                                R || y,
                            );
                    } else b = dt(y, I, !0, f, Y);
                    return (st(y, I, b), b);
                })
        );
    }
    function ke(v, R) {
        const x = $(v, R);
        return x ? Promise.reject(x) : Promise.resolve();
    }
    function nt(v) {
        const R = Et.values().next().value;
        return R && typeof R.runWithContext == 'function' ? R.runWithContext(v) : v();
    }
    function Oe(v, R) {
        let x;
        const [I, Y, a] = Su(v, R);
        x = ss(I.reverse(), 'beforeRouteLeave', v, R);
        for (const p of I)
            p.leaveGuards.forEach((y) => {
                x.push(ct(y, v, R));
            });
        const f = ke.bind(null, v, R);
        return (
            x.push(f),
            Ce(x)
                .then(() => {
                    x = [];
                    for (const p of i.list()) x.push(ct(p, v, R));
                    return (x.push(f), Ce(x));
                })
                .then(() => {
                    x = ss(Y, 'beforeRouteUpdate', v, R);
                    for (const p of Y)
                        p.updateGuards.forEach((y) => {
                            x.push(ct(y, v, R));
                        });
                    return (x.push(f), Ce(x));
                })
                .then(() => {
                    x = [];
                    for (const p of a)
                        if (p.beforeEnter)
                            if (Ie(p.beforeEnter))
                                for (const y of p.beforeEnter) x.push(ct(y, v, R));
                            else x.push(ct(p.beforeEnter, v, R));
                    return (x.push(f), Ce(x));
                })
                .then(
                    () => (
                        v.matched.forEach((p) => (p.enterCallbacks = {})),
                        (x = ss(a, 'beforeRouteEnter', v, R, nt)),
                        x.push(f),
                        Ce(x)
                    ),
                )
                .then(() => {
                    x = [];
                    for (const p of o.list()) x.push(ct(p, v, R));
                    return (x.push(f), Ce(x));
                })
                .catch((p) => (qe(p, 8) ? p : Promise.reject(p)))
        );
    }
    function st(v, R, x) {
        l.list().forEach((I) => nt(() => I(v, R, x)));
    }
    function dt(v, R, x, I, Y) {
        const a = $(v, R);
        if (a) return a;
        const f = R === it,
            p = Pt ? history.state : {};
        (x &&
            (I || f
                ? r.replace(v.fullPath, K({ scroll: f && p && p.scroll }, Y))
                : r.push(v.fullPath, Y)),
            (c.value = v),
            Ue(v, R, x, f),
            rt());
    }
    let Le;
    function Ht() {
        Le ||
            (Le = r.listen((v, R, x) => {
                if (!hn.listening) return;
                const I = U(v),
                    Y = le(I);
                if (Y) {
                    se(K(Y, { replace: !0, force: !0 }), I).catch(Zt);
                    return;
                }
                d = I;
                const a = c.value;
                (Pt && Wa(Rr(a.fullPath, x.delta), Dn()),
                    Oe(I, a)
                        .catch((f) =>
                            qe(f, 12)
                                ? f
                                : qe(f, 2)
                                  ? (se(K(k(f.to), { force: !0 }), I)
                                        .then((p) => {
                                            qe(p, 20) &&
                                                !x.delta &&
                                                x.type === un.pop &&
                                                r.go(-1, !1);
                                        })
                                        .catch(Zt),
                                    Promise.reject())
                                  : (x.delta && r.go(-x.delta, !1), B(f, I, a)),
                        )
                        .then((f) => {
                            ((f = f || dt(I, a, !1)),
                                f &&
                                    (x.delta && !qe(f, 8)
                                        ? r.go(-x.delta, !1)
                                        : x.type === un.pop && qe(f, 20) && r.go(-1, !1)),
                                st(I, a, f));
                        })
                        .catch(Zt));
            }));
    }
    let wt = Kt(),
        ie = Kt(),
        q;
    function B(v, R, x) {
        rt(v);
        const I = ie.list();
        return (I.length ? I.forEach((Y) => Y(v, R, x)) : console.error(v), Promise.reject(v));
    }
    function ze() {
        return q && c.value !== it
            ? Promise.resolve()
            : new Promise((v, R) => {
                  wt.add([v, R]);
              });
    }
    function rt(v) {
        return (
            q || ((q = !v), Ht(), wt.list().forEach(([R, x]) => (v ? x(v) : R())), wt.reset()), v
        );
    }
    function Ue(v, R, x, I) {
        const { scrollBehavior: Y } = e;
        if (!Pt || !Y) return Promise.resolve();
        const a =
            (!x && za(Rr(v.fullPath, 0))) ||
            ((I || !x) && history.state && history.state.scroll) ||
            null;
        return bi()
            .then(() => Y(v, R, a))
            .then((f) => f && Ka(f))
            .catch((f) => B(f, v, R));
    }
    const ge = (v) => r.go(v);
    let St;
    const Et = new Set(),
        hn = {
            currentRoute: c,
            listening: !0,
            addRoute: g,
            removeRoute: M,
            clearRoutes: t.clearRoutes,
            hasRoute: H,
            getRoutes: A,
            resolve: U,
            options: e,
            push: T,
            replace: J,
            go: ge,
            back: () => ge(-1),
            forward: () => ge(1),
            beforeEach: i.add,
            beforeResolve: o.add,
            afterEach: l.add,
            onError: ie.add,
            isReady: ze,
            install(v) {
                const R = this;
                (v.component('RouterLink', gu),
                    v.component('RouterView', _u),
                    (v.config.globalProperties.$router = R),
                    Object.defineProperty(v.config.globalProperties, '$route', {
                        enumerable: !0,
                        get: () => Me(c),
                    }),
                    Pt && !St && c.value === it && ((St = !0), T(r.location).catch((Y) => {})));
                const x = {};
                for (const Y in it)
                    Object.defineProperty(x, Y, { get: () => c.value[Y], enumerable: !0 });
                (v.provide(js, R), v.provide(wo, pi(x)), v.provide(bs, c));
                const I = v.unmount;
                (Et.add(v),
                    (v.unmount = function () {
                        (Et.delete(v),
                            Et.size < 1 &&
                                ((d = it),
                                Le && Le(),
                                (Le = null),
                                (c.value = it),
                                (St = !1),
                                (q = !1)),
                            I());
                    }));
            },
        };
    function Ce(v) {
        return v.reduce((R, x) => R.then(() => nt(x)), Promise.resolve());
    }
    return hn;
}
function Su(e, t) {
    const n = [],
        s = [],
        r = [],
        i = Math.max(t.matched.length, e.matched.length);
    for (let o = 0; o < i; o++) {
        const l = t.matched[o];
        l && (e.matched.find((d) => Vt(d, l)) ? s.push(l) : n.push(l));
        const c = e.matched[o];
        c && (t.matched.find((d) => Vt(d, c)) || r.push(c));
    }
    return [n, s, r];
}
const Dr = 'jam-radio-station';
class Eu {
    static getStation() {
        return localStorage.getItem(Dr);
    }
    static setStation(t) {
        localStorage.setItem(Dr, t);
    }
}
function So(e) {
    const t = Math.floor(e / Br);
    e %= Br;
    const n = Math.floor(e / Kr);
    e %= Kr;
    const s = Math.floor(e),
        r = t.toString().padStart(2, '0'),
        i = n.toString().padStart(2, '0'),
        o = s.toString().padStart(2, '0');
    return `${r}:${i}:${o}`;
}
const Br = 3600,
    Kr = 60;
function Eo(e, t) {
    return `monitor-${e.toString(16)}-${t}`;
}
const Cu = {
        setup() {
            return { vmPlayerContext: Ke('vmPlayerContext') };
        },
        data() {
            return { services: null };
        },
        beforeMount() {
            (this.setServices(this.vmPlayerContext.services),
                (this.onServices = (e) => {
                    (this.setServices(e), this.$forceUpdate());
                }),
                this.vmPlayerContext.addEventListener('services', this.onServices));
        },
        unmounted() {
            this.vmPlayerContext.removeEventListener('services', this.onServices);
        },
        methods: {
            setServices(e) {
                e && (this.services = e);
            },
            formatVm(e, t, n) {
                let s = 'Unknown';
                return (
                    'corevmMeta' in t && (s = `${t.corevmMeta.name}-${t.corevmMeta.version}`),
                    `${s} (${da(e.id)}/${ha(n)}@${e.creationSlot})`
                );
            },
            async selectStation(e, t) {
                (this.vmPlayerContext.setVms([[e, t]], Eo),
                    await this.vmPlayerContext.initInteractively(),
                    Eu.setStation(`${e}/${t}`),
                    this.$router.push({
                        name: 'player',
                        params: { serviceId: e.toString(16), vmId: t },
                    }));
            },
        },
    },
    xu = { key: 1, class: 'services' },
    Pu = ['onClick'];
function Ru(e, t, n, s, r, i) {
    return r.services
        ? (D(),
          Q(
              X,
              { key: 1 },
              [
                  r.services.length === 0
                      ? (D(), Q(X, { key: 0 }, [yt('No radio stations found.')], 64))
                      : (D(),
                        Q('ul', xu, [
                            (D(!0),
                            Q(
                                X,
                                null,
                                Xs(
                                    r.services,
                                    (o) => (
                                        D(),
                                        Q(
                                            X,
                                            { key: o.id },
                                            [
                                                (D(!0),
                                                Q(
                                                    X,
                                                    null,
                                                    Xs(
                                                        Array.from(o.vms.entries()).filter(
                                                            ([l, c]) =>
                                                                c.corevmMeta?.name?.includes(
                                                                    'corevm-jam-radio',
                                                                ),
                                                        ),
                                                        ([l, c]) => (
                                                            D(),
                                                            Q('li', { key: l }, [
                                                                Ee(
                                                                    'button',
                                                                    {
                                                                        onClick: (d) =>
                                                                            i.selectStation(
                                                                                o.id,
                                                                                l,
                                                                            ),
                                                                    },
                                                                    $t(i.formatVm(o, c, l)),
                                                                    9,
                                                                    Pu,
                                                                ),
                                                            ])
                                                        ),
                                                    ),
                                                    128,
                                                )),
                                            ],
                                            64,
                                        )
                                    ),
                                ),
                                128,
                            )),
                        ])),
              ],
              64,
          ))
        : (D(), Q(X, { key: 0 }, [yt('Fetching...')], 64));
}
const Mu = _t(Cu, [
        ['render', Ru],
        ['__scopeId', 'data-v-de2a470d'],
    ]),
    Au = {};
function Tu(e, t) {
    return (D(), Q('div'));
}
const Iu = _t(Au, [['render', Tu]]),
    ku = {},
    Ou = { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 640 640', class: 'icon' };
function Lu(e, t) {
    return (
        D(),
        Q(
            'svg',
            Ou,
            t[0] ||
                (t[0] = [
                    Ee(
                        'path',
                        {
                            d: 'M533.6 96.5C523.3 88.1 508.2 89.7 499.8 100C491.4 110.3 493 125.4 503.3 133.8C557.5 177.8 592 244.8 592 320C592 395.2 557.5 462.2 503.3 506.3C493 514.7 491.5 529.8 499.8 540.1C508.1 550.4 523.3 551.9 533.6 543.6C598.5 490.7 640 410.2 640 320C640 229.8 598.5 149.2 533.6 96.5zM473.1 171C462.8 162.6 447.7 164.2 439.3 174.5C430.9 184.8 432.5 199.9 442.8 208.3C475.3 234.7 496 274.9 496 320C496 365.1 475.3 405.3 442.8 431.8C432.5 440.2 431 455.3 439.3 465.6C447.6 475.9 462.8 477.4 473.1 469.1C516.3 433.9 544 380.2 544 320.1C544 260 516.3 206.3 473.1 171.1zM412.6 245.5C402.3 237.1 387.2 238.7 378.8 249C370.4 259.3 372 274.4 382.3 282.8C393.1 291.6 400 305 400 320C400 335 393.1 348.4 382.3 357.3C372 365.7 370.5 380.8 378.8 391.1C387.1 401.4 402.3 402.9 412.6 394.6C434.1 376.9 448 350.1 448 320C448 289.9 434.1 263.1 412.6 245.5zM80 416L128 416L262.1 535.2C268.5 540.9 276.7 544 285.2 544C304.4 544 320 528.4 320 509.2L320 130.8C320 111.6 304.4 96 285.2 96C276.7 96 268.5 99.1 262.1 104.8L128 224L80 224C53.5 224 32 245.5 32 272L32 368C32 394.5 53.5 416 80 416z',
                        },
                        null,
                        -1,
                    ),
                ]),
        )
    );
}
const Uu = _t(ku, [['render', Lu]]),
    $u = {},
    Nu = { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 640 640', class: 'icon' };
function Vu(e, t) {
    return (
        D(),
        Q(
            'svg',
            Nu,
            t[0] ||
                (t[0] = [
                    Ee(
                        'path',
                        {
                            d: 'M80 416L128 416L262.1 535.2C268.5 540.9 276.7 544 285.2 544C304.4 544 320 528.4 320 509.2L320 130.8C320 111.6 304.4 96 285.2 96C276.7 96 268.5 99.1 262.1 104.8L128 224L80 224C53.5 224 32 245.5 32 272L32 368C32 394.5 53.5 416 80 416zM399 239C389.6 248.4 389.6 263.6 399 272.9L446 319.9L399 366.9C389.6 376.3 389.6 391.5 399 400.8C408.4 410.1 423.6 410.2 432.9 400.8L479.9 353.8L526.9 400.8C536.3 410.2 551.5 410.2 560.8 400.8C570.1 391.4 570.2 376.2 560.8 366.9L513.8 319.9L560.8 272.9C570.2 263.5 570.2 248.3 560.8 239C551.4 229.7 536.2 229.6 526.9 239L479.9 286L432.9 239C423.5 229.6 408.3 229.6 399 239z',
                        },
                        null,
                        -1,
                    ),
                ]),
        )
    );
}
const Fu = _t($u, [['render', Vu]]),
    Hu = { class: 'time' },
    ju = { key: 0, class: 'button-container' },
    Du = ['value'],
    Bu = { key: 2, class: 'button-container' },
    Ku = {
        inject: ['vmPlayerContext'],
        props: { vmPlayer: { type: Object, required: !0 } },
        data() {
            return { oldPlaybackVolume: 1, oldCaptureVolume: 1 };
        },
        beforeMount() {
            (this.vmPlayer.addEventListener('output-mode', this.$forceUpdate),
                this.vmPlayer.addEventListener('input-mode', this.$forceUpdate));
        },
        unmounted() {
            (this.vmPlayer.removeEventListener('output-mode', this.$forceUpdate),
                this.vmPlayer.removeEventListener('input-mode', this.$forceUpdate));
        },
        methods: {
            async enableAudio() {
                (await this.vmPlayerContext.initInteractively({
                    playback: !!this.vmPlayer.outputAudioMode,
                    capture: !!this.vmPlayer.inputAudioMode,
                }),
                    await this.vmPlayer.enableAudioPlayback(),
                    this.$forceUpdate());
            },
            mutePlayback() {
                const e = this.vmPlayer.audioPlayer;
                e &&
                    (e.playbackVolume !== 0 && (this.oldPlaybackVolume = e.playbackVolume),
                    (e.playbackVolume = 0),
                    this.$forceUpdate());
            },
            unmutePlayback() {
                const e = this.vmPlayer.audioPlayer;
                e && ((e.playbackVolume = this.oldPlaybackVolume), this.$forceUpdate());
            },
            setPlaybackVolume(e) {
                const t = this.vmPlayer.audioPlayer;
                t && ((t.playbackVolume = e), t.resumePlayback(), this.$forceUpdate());
            },
            muteCapture() {
                const e = this.vmPlayer.audioPlayer;
                e &&
                    (e.captureVolume !== 0 && (this.oldCaptureVolume = e.captureVolume),
                    (e.captureVolume = 0),
                    this.$forceUpdate());
            },
            unmuteCapture() {
                const e = this.vmPlayer.audioPlayer;
                e && ((e.captureVolume = this.oldCaptureVolume), this.$forceUpdate());
            },
            setCaptureVolume(e) {
                const t = this.vmPlayer.audioPlayer;
                t && ((t.captureVolume = e), this.$forceUpdate());
            },
            formatTime: So,
        },
    },
    Wu = Object.assign(Ku, {
        __name: 'AudioPlayer',
        setup(e) {
            return (t, n) => (
                D(),
                Q(
                    X,
                    null,
                    [
                        Ee('div', Hu, $t(Me(So)(e.vmPlayer.timestamp)), 1),
                        e.vmPlayer.outputAudioMode && e.vmPlayer.audioPlayer
                            ? (D(),
                              Q('div', ju, [
                                  e.vmPlayer.audioPlayer.playbackVolume === 0
                                      ? (D(),
                                        Q(
                                            'button',
                                            {
                                                key: 0,
                                                class: 'icon-button',
                                                title: 'Unmute',
                                                onClick:
                                                    n[0] ||
                                                    (n[0] = (...s) =>
                                                        t.unmutePlayback && t.unmutePlayback(...s)),
                                            },
                                            [oe(Fu)],
                                        ))
                                      : Be('', !0),
                                  e.vmPlayer.audioPlayer.playbackVolume !== 0
                                      ? (D(),
                                        Q(
                                            'button',
                                            {
                                                key: 1,
                                                class: 'icon-button',
                                                title: 'Mute',
                                                onClick:
                                                    n[1] ||
                                                    (n[1] = (...s) =>
                                                        t.mutePlayback && t.mutePlayback(...s)),
                                            },
                                            [oe(Uu)],
                                        ))
                                      : Be('', !0),
                                  Ee(
                                      'input',
                                      {
                                          value: e.vmPlayer.audioPlayer.playbackVolume,
                                          type: 'range',
                                          min: '0',
                                          max: '1',
                                          step: '0.01',
                                          onInput:
                                              n[2] ||
                                              (n[2] = (s) => t.setPlaybackVolume(s.target.value)),
                                      },
                                      null,
                                      40,
                                      Du,
                                  ),
                              ]))
                            : Be('', !0),
                        (e.vmPlayer.outputAudioMode || e.vmPlayer.inputAudioMode) &&
                        !e.vmPlayer.audioPlayer
                            ? (D(),
                              Q(
                                  'button',
                                  {
                                      key: 1,
                                      onClick:
                                          n[3] ||
                                          (n[3] = (...s) => t.enableAudio && t.enableAudio(...s)),
                                  },
                                  'Click to enable audio',
                              ))
                            : Be('', !0),
                        t.vmPlayerContext.connectionState === 'buffering'
                            ? (D(), Q('div', Bu, 'Buffering...'))
                            : Be('', !0),
                    ],
                    64,
                )
            );
        },
    }),
    zu = _t(Wu, [['__scopeId', 'data-v-7b6706b4']]),
    Ds = {
        props: {
            holdDuration: { type: Number, default: 6 },
            disabled: { type: Boolean, default: !1 },
        },
        emits: ['start', 'finish', 'cancel'],
        data() {
            return { isHolding: !1, holdTimeMs: 0, timer: null, intervalStepMs: 50 };
        },
        computed: {
            targetDurationMs() {
                return this.holdDuration * 1e3;
            },
            progressPercentage() {
                if (this.targetDurationMs === 0) return 100;
                const e = Math.floor((this.holdTimeMs / this.targetDurationMs) * 100);
                return Math.min(e, 100);
            },
        },
        beforeUnmount() {
            this.clearTimer();
        },
        methods: {
            startHold() {
                this.isHolding ||
                    ((this.isHolding = !0),
                    (this.holdTimeMs = 0),
                    this.$emit('start'),
                    (this.timer = setInterval(() => {
                        ((this.holdTimeMs += this.intervalStepMs),
                            this.holdTimeMs >= this.targetDurationMs && this.triggerAction());
                    }, this.intervalStepMs)));
            },
            stopHold() {
                this.isHolding &&
                    (this.clearTimer(),
                    (this.isHolding = !1),
                    (this.holdTimeMs = 0),
                    this.$emit('cancel'));
            },
            triggerAction() {
                (this.clearTimer(),
                    this.$emit('finish'),
                    (this.isHolding = !1),
                    (this.holdTimeMs = 0));
            },
            clearTimer() {
                this.timer && (clearInterval(this.timer), (this.timer = null));
            },
        },
    },
    Wr = () => {
        xc((e) => ({ '5b590b42': e.progressPercentage }));
    },
    zr = Ds.setup;
Ds.setup = zr ? (e, t) => (Wr(), zr(e, t)) : Wr;
const Gu = ['disabled'],
    qu = { class: 'button-text' };
function Ju(e, t, n, s, r, i) {
    return (
        D(),
        Q(
            'button',
            {
                class: Un(['hold-button', { 'is-holding': r.isHolding }]),
                disabled: n.disabled,
                onMousedown: t[0] || (t[0] = (...o) => i.startHold && i.startHold(...o)),
                onMouseup: t[1] || (t[1] = (...o) => i.stopHold && i.stopHold(...o)),
                onMouseleave: t[2] || (t[2] = (...o) => i.stopHold && i.stopHold(...o)),
                onTouchstart:
                    t[3] || (t[3] = jc((...o) => i.startHold && i.startHold(...o), ['prevent'])),
                onTouchend: t[4] || (t[4] = (...o) => i.stopHold && i.stopHold(...o)),
            },
            [
                t[5] || (t[5] = Ee('div', { class: 'progress-bar' }, null, -1)),
                Ee('span', qu, [Tl(e.$slots, 'default', {}, void 0)]),
            ],
            42,
            Gu,
        )
    );
}
const Yu = _t(Ds, [
    ['render', Ju],
    ['__scopeId', 'data-v-b01e0e3a'],
]);
class Qu {
    mode;
    chunks;
    constructor(t, n) {
        ((this.mode = t), (this.chunks = n));
    }
    encode() {
        const t = this.chunks.reduce((r, i) => r + i.length, this.mode.encodedSize()),
            n = new Uint8Array(t),
            s = new Gc(n);
        this.mode.encode(s);
        for (const r of this.chunks) s.encodeFixedUint8Array(r);
        return s.getFilledBuffer();
    }
}
const Xu = '' + new URL('../DoI8y0Av/audio-recorder-worklet.js', import.meta.url).href;
async function Zu() {
    return await WebAssembly.compileStreaming(fetch(oo));
}
async function ef() {
    const e = new AudioContext();
    return (await e.suspend(), await e.audioWorklet.addModule(Xu), e);
}
class Bs {
    #e;
    #n;
    #t = null;
    #r = null;
    constructor(t, n) {
        ((this.#e = t), (this.#n = n));
    }
    static async createInteractively() {
        'audioSession' in navigator &&
            ((window.navigator.audioSession.type = 'play-and-record'),
            console.debug(`Set audio session type to "${window.navigator.audioSession.type}"`));
        const [t, n] = await Promise.all([ef(), Zu()]);
        return new Bs(t, n);
    }
    #s() {
        if (this.#t !== null || this.#e.state === 'closed') return;
        const t = this.#e,
            n = this.#n;
        ((this.#t = new AudioWorkletNode(t, 'audio-recorder', {
            numberOfInputs: 1,
            numberOfOutputs: 1,
            outputChannelCount: [1],
            processorOptions: { lanczos: n },
        })),
            this.#t.addEventListener('processorerror', (s) =>
                console.debug(`Processor error: ${s.message}`),
            ),
            this.#t.port.postMessage({ type: 'init' }),
            this.#t.connect(t.destination));
    }
    async start(t, n) {
        return (
            this.#s(),
            this.#t.port.postMessage({ type: 'start', mode: n }),
            (this.#t.port.onmessage = (r) => {
                if (r.data.type === 'chunks') this.#r && this.#r(r.data.chunks);
                else throw new Error(`Invalid message type ${r.data.type}`);
            }),
            this.#e.createMediaStreamSource(t).connect(this.#t),
            await this.#e.resume(),
            !0
        );
    }
    async finish() {
        this.#t &&
            (this.#t.port.postMessage({ type: 'finish' }),
            this.#t.disconnect(),
            (this.#t = null),
            await this.#e.suspend());
    }
    async cancel() {
        this.#t &&
            (this.#t.port.postMessage({ type: 'cancel' }),
            this.#t.disconnect(),
            (this.#t = null),
            await this.#e.suspend());
    }
    async close() {
        this.#e.state !== 'closed' && (await this.#e.close());
    }
    set onChunks(t) {
        this.#r = t;
    }
}
function tf(e) {
    return e.match(/[0-9a-fA-F]{1,8}/) ? parseInt(e, 16) : null;
}
function nf(e) {
    return tf(e);
}
function sf(e) {
    return e.match(/[0-9]{1,10}/) ? parseInt(e) : null;
}
function rf(e) {
    return sf(e);
}
const of = { key: 0, class: 'error-box' },
    De = Object.freeze({ Idle: 0, Recording: 1, Sending: 2 }),
    lf = {
        inject: ['vmPlayerContext'],
        data() {
            return {
                serviceId: 0,
                vmId: 0,
                recorder: null,
                error: null,
                recordingState: De.Idle,
                sentSuccessfully: !1,
                sentTimer: 0,
            };
        },
        beforeMount() {
            ((this.serviceId = nf(this.$route.params.serviceId)),
                (this.vmId = rf(this.$route.params.vmId)),
                (this.vmPlayer = this.vmPlayerContext.getVm(this.serviceId, this.vmId, Eo)),
                this.vmPlayer && this.vmPlayer.addEventListener('input-mode', this.$forceUpdate));
        },
        methods: {
            async startRecording() {
                try {
                    this.error = null;
                    const e = this.vmPlayer.inputAudioMode;
                    if (!e) throw new Error('Audio input is not set');
                    if (((this.recorder = Sn(await Bs.createInteractively())), !this.recorder))
                        return;
                    const t = await navigator.mediaDevices.getUserMedia({
                        audio: {
                            sampleRate: e.sampleRate,
                            channelCount: e.channels,
                            autoGainControl: !1,
                        },
                    });
                    if (!this.recorder) return;
                    ((this.recorder.onChunks = (n) => {
                        console.debug(`Sending ${n.length} audio chunk(s)`);
                        const r = new Qu(e, n).encode();
                        (this.vmPlayerContext.pushHostMessage(this.serviceId, this.vmId, r),
                            (this.recordingState = De.Idle),
                            (this.sentSuccessfully = !0),
                            clearTimeout(this.sentTimer),
                            (this.sentTimer = setTimeout(() => (this.sentSuccessfully = !1), 3e3)));
                    }),
                        await this.recorder.start(t, e),
                        (this.recordingState = De.Recording),
                        console.debug('Started recording'));
                } catch (e) {
                    ((this.error = e.message),
                        (this.recordingState = De.Idle),
                        console.debug(`Failed to start recording: ${e.message}`),
                        this.recorder && (await this.recorder.close(), (this.recorder = null)));
                }
            },
            async finishRecording() {
                this.recorder &&
                    ((this.recordingState = De.Sending),
                    await this.recorder.finish(),
                    await this.recorder.close(),
                    (this.recorder = null));
            },
            async cancelRecording() {
                this.recorder &&
                    (await this.recorder.cancel(),
                    await this.recorder.close(),
                    (this.recorder = null),
                    (this.recordingState = De.Idle));
            },
        },
    },
    cf = Object.assign(lf, {
        __name: 'Player',
        setup(e) {
            return (t, n) => (
                D(),
                Q(
                    X,
                    null,
                    [
                        n[0] || (n[0] = Ee('h1', null, 'Station', -1)),
                        t.vmPlayer
                            ? (D(),
                              Q(
                                  X,
                                  { key: 0 },
                                  [
                                      oe(zu, { 'vm-player': t.vmPlayer }, null, 8, ['vm-player']),
                                      Ee('div', null, [
                                          oe(
                                              Yu,
                                              {
                                                  disabled:
                                                      !t.vmPlayer?.inputAudioMode ||
                                                      t.recordingState === Me(De).Sending,
                                                  onStart: t.startRecording,
                                                  onFinish: t.finishRecording,
                                                  onCancel: t.cancelRecording,
                                              },
                                              {
                                                  default: xi(() => [
                                                      t.recordingState === Me(De).Idle
                                                          ? (D(),
                                                            Q(
                                                                X,
                                                                { key: 0 },
                                                                [
                                                                    t.sentSuccessfully
                                                                        ? (D(),
                                                                          Q(
                                                                              X,
                                                                              { key: 0 },
                                                                              [yt('🎉 Sent!')],
                                                                              64,
                                                                          ))
                                                                        : (D(),
                                                                          Q(
                                                                              X,
                                                                              { key: 1 },
                                                                              [
                                                                                  yt(
                                                                                      'Hold to record audio',
                                                                                  ),
                                                                              ],
                                                                              64,
                                                                          )),
                                                                ],
                                                                64,
                                                            ))
                                                          : Be('', !0),
                                                      t.recordingState === Me(De).Recording
                                                          ? (D(),
                                                            Q(
                                                                X,
                                                                { key: 1 },
                                                                [yt('Recording…')],
                                                                64,
                                                            ))
                                                          : Be('', !0),
                                                      t.recordingState === Me(De).Sending
                                                          ? (D(),
                                                            Q(X, { key: 2 }, [yt('Sending…')], 64))
                                                          : Be('', !0),
                                                  ]),
                                                  _: 1,
                                              },
                                              8,
                                              ['disabled', 'onStart', 'onFinish', 'onCancel'],
                                          ),
                                      ]),
                                      t.error ? (D(), Q('div', of, $t(t.error), 1)) : Be('', !0),
                                  ],
                                  64,
                              ))
                            : Be('', !0),
                    ],
                    64,
                )
            );
        },
    }),
    af = wu({
        history: Ya('./'),
        routes: [
            { path: '/', name: 'home', component: Iu },
            { path: '/stations', name: 'stations', component: Mu },
            {
                path: '/station/:serviceId/:vmId/monitor',
                name: 'player',
                component: cf,
                meta: { isVmRoute: !0 },
            },
        ],
    }),
    Co = Kc(ba);
Co.use(af);
Co.mount('#app');
