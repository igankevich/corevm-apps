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
/**
 * @vue/shared v3.5.18
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ /*! #__NO_SIDE_EFFECTS__ */ function Fs(e) {
    const t = Object.create(null);
    for (const n of e.split(',')) t[n] = 1;
    return (n) => n in t;
}
const te = {},
    At = [],
    Ue = () => {},
    tl = () => !1,
    zn = (e) =>
        e.charCodeAt(0) === 111 &&
        e.charCodeAt(1) === 110 &&
        (e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97),
    Hs = (e) => e.startsWith('onUpdate:'),
    be = Object.assign,
    js = (e, t) => {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
    },
    nl = Object.prototype.hasOwnProperty,
    Q = (e, t) => nl.call(e, t),
    j = Array.isArray,
    Tt = (e) => bn(e) === '[object Map]',
    Gn = (e) => bn(e) === '[object Set]',
    dr = (e) => bn(e) === '[object Date]',
    W = (e) => typeof e == 'function',
    de = (e) => typeof e == 'string',
    Je = (e) => typeof e == 'symbol',
    oe = (e) => e !== null && typeof e == 'object',
    Ci = (e) => (oe(e) || W(e)) && W(e.then) && W(e.catch),
    _i = Object.prototype.toString,
    bn = (e) => _i.call(e),
    sl = (e) => bn(e).slice(8, -1),
    Pi = (e) => bn(e) === '[object Object]',
    Ds = (e) => de(e) && e !== 'NaN' && e[0] !== '-' && '' + parseInt(e, 10) === e,
    Qt = Fs(
        ',key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted',
    ),
    qn = (e) => {
        const t = Object.create(null);
        return (n) => t[n] || (t[n] = e(n));
    },
    rl = /-(\w)/g,
    Oe = qn((e) => e.replace(rl, (t, n) => (n ? n.toUpperCase() : ''))),
    il = /\B([A-Z])/g,
    Et = qn((e) => e.replace(il, '-$1').toLowerCase()),
    Jn = qn((e) => e.charAt(0).toUpperCase() + e.slice(1)),
    cs = qn((e) => (e ? `on${Jn(e)}` : '')),
    pt = (e, t) => !Object.is(e, t),
    In = (e, ...t) => {
        for (let n = 0; n < e.length; n++) e[n](...t);
    },
    ws = (e, t, n, s = !1) => {
        Object.defineProperty(e, t, { configurable: !0, enumerable: !1, writable: s, value: n });
    },
    Ss = (e) => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t;
    };
let hr;
const Xn = () =>
    hr ||
    (hr =
        typeof globalThis < 'u'
            ? globalThis
            : typeof self < 'u'
              ? self
              : typeof window < 'u'
                ? window
                : typeof global < 'u'
                  ? global
                  : {});
function Yn(e) {
    if (j(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) {
            const s = e[n],
                r = de(s) ? cl(s) : Yn(s);
            if (r) for (const i in r) t[i] = r[i];
        }
        return t;
    } else if (de(e) || oe(e)) return e;
}
const ol = /;(?![^(]*\))/g,
    ll = /:([^]+)/,
    al = /\/\*[^]*?\*\//g;
function cl(e) {
    const t = {};
    return (
        e
            .replace(al, '')
            .split(ol)
            .forEach((n) => {
                if (n) {
                    const s = n.split(ll);
                    s.length > 1 && (t[s[0].trim()] = s[1].trim());
                }
            }),
        t
    );
}
function Qn(e) {
    let t = '';
    if (de(e)) t = e;
    else if (j(e))
        for (let n = 0; n < e.length; n++) {
            const s = Qn(e[n]);
            s && (t += s + ' ');
        }
    else if (oe(e)) for (const n in e) e[n] && (t += n + ' ');
    return t.trim();
}
const ul = 'itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly',
    fl = Fs(ul);
function wi(e) {
    return !!e || e === '';
}
function dl(e, t) {
    if (e.length !== t.length) return !1;
    let n = !0;
    for (let s = 0; n && s < e.length; s++) n = Zn(e[s], t[s]);
    return n;
}
function Zn(e, t) {
    if (e === t) return !0;
    let n = dr(e),
        s = dr(t);
    if (n || s) return n && s ? e.getTime() === t.getTime() : !1;
    if (((n = Je(e)), (s = Je(t)), n || s)) return e === t;
    if (((n = j(e)), (s = j(t)), n || s)) return n && s ? dl(e, t) : !1;
    if (((n = oe(e)), (s = oe(t)), n || s)) {
        if (!n || !s) return !1;
        const r = Object.keys(e).length,
            i = Object.keys(t).length;
        if (r !== i) return !1;
        for (const o in e) {
            const l = e.hasOwnProperty(o),
                a = t.hasOwnProperty(o);
            if ((l && !a) || (!l && a) || !Zn(e[o], t[o])) return !1;
        }
    }
    return String(e) === String(t);
}
function Si(e, t) {
    return e.findIndex((n) => Zn(n, t));
}
const Ei = (e) => !!(e && e.__v_isRef === !0),
    K = (e) =>
        de(e)
            ? e
            : e == null
              ? ''
              : j(e) || (oe(e) && (e.toString === _i || !W(e.toString)))
                ? Ei(e)
                    ? K(e.value)
                    : JSON.stringify(e, xi, 2)
                : String(e),
    xi = (e, t) =>
        Ei(t)
            ? xi(e, t.value)
            : Tt(t)
              ? {
                    [`Map(${t.size})`]: [...t.entries()].reduce(
                        (n, [s, r], i) => ((n[us(s, i) + ' =>'] = r), n),
                        {},
                    ),
                }
              : Gn(t)
                ? { [`Set(${t.size})`]: [...t.values()].map((n) => us(n)) }
                : Je(t)
                  ? us(t)
                  : oe(t) && !j(t) && !Pi(t)
                    ? String(t)
                    : t,
    us = (e, t = '') => {
        var n;
        return Je(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e;
    };
function hl(e) {
    return e == null ? 'initial' : typeof e == 'string' ? (e === '' ? ' ' : e) : String(e);
}
/**
 * @vue/reactivity v3.5.18
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let xe;
class ml {
    constructor(t = !1) {
        ((this.detached = t),
            (this._active = !0),
            (this._on = 0),
            (this.effects = []),
            (this.cleanups = []),
            (this._isPaused = !1),
            (this.parent = xe),
            !t && xe && (this.index = (xe.scopes || (xe.scopes = [])).push(this) - 1));
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
            const n = xe;
            try {
                return ((xe = this), t());
            } finally {
                xe = n;
            }
        }
    }
    on() {
        ++this._on === 1 && ((this.prevScope = xe), (xe = this));
    }
    off() {
        this._on > 0 && --this._on === 0 && ((xe = this.prevScope), (this.prevScope = void 0));
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
function pl() {
    return xe;
}
let ie;
const fs = new WeakSet();
class Li {
    constructor(t) {
        ((this.fn = t),
            (this.deps = void 0),
            (this.depsTail = void 0),
            (this.flags = 5),
            (this.next = void 0),
            (this.cleanup = void 0),
            (this.scheduler = void 0),
            xe && xe.active && xe.effects.push(this));
    }
    pause() {
        this.flags |= 64;
    }
    resume() {
        this.flags & 64 && ((this.flags &= -65), fs.has(this) && (fs.delete(this), this.trigger()));
    }
    notify() {
        (this.flags & 2 && !(this.flags & 32)) || this.flags & 8 || ki(this);
    }
    run() {
        if (!(this.flags & 1)) return this.fn();
        ((this.flags |= 2), mr(this), Ii(this));
        const t = ie,
            n = Ne;
        ((ie = this), (Ne = !0));
        try {
            return this.fn();
        } finally {
            (Ri(this), (ie = t), (Ne = n), (this.flags &= -3));
        }
    }
    stop() {
        if (this.flags & 1) {
            for (let t = this.deps; t; t = t.nextDep) Ws(t);
            ((this.deps = this.depsTail = void 0),
                mr(this),
                this.onStop && this.onStop(),
                (this.flags &= -2));
        }
    }
    trigger() {
        this.flags & 64 ? fs.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
    }
    runIfDirty() {
        Es(this) && this.run();
    }
    get dirty() {
        return Es(this);
    }
}
let Mi = 0,
    Zt,
    en;
function ki(e, t = !1) {
    if (((e.flags |= 8), t)) {
        ((e.next = en), (en = e));
        return;
    }
    ((e.next = Zt), (Zt = e));
}
function Bs() {
    Mi++;
}
function Ks() {
    if (--Mi > 0) return;
    if (en) {
        let t = en;
        for (en = void 0; t;) {
            const n = t.next;
            ((t.next = void 0), (t.flags &= -9), (t = n));
        }
    }
    let e;
    for (; Zt;) {
        let t = Zt;
        for (Zt = void 0; t;) {
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
function Ii(e) {
    for (let t = e.deps; t; t = t.nextDep)
        ((t.version = -1), (t.prevActiveLink = t.dep.activeLink), (t.dep.activeLink = t));
}
function Ri(e) {
    let t,
        n = e.depsTail,
        s = n;
    for (; s;) {
        const r = s.prevDep;
        (s.version === -1 ? (s === n && (n = r), Ws(s), gl(s)) : (t = s),
            (s.dep.activeLink = s.prevActiveLink),
            (s.prevActiveLink = void 0),
            (s = r));
    }
    ((e.deps = t), (e.depsTail = n));
}
function Es(e) {
    for (let t = e.deps; t; t = t.nextDep)
        if (
            t.dep.version !== t.version ||
            (t.dep.computed && (Ai(t.dep.computed) || t.dep.version !== t.version))
        )
            return !0;
    return !!e._dirty;
}
function Ai(e) {
    if (
        (e.flags & 4 && !(e.flags & 16)) ||
        ((e.flags &= -17), e.globalVersion === cn) ||
        ((e.globalVersion = cn), !e.isSSR && e.flags & 128 && ((!e.deps && !e._dirty) || !Es(e)))
    )
        return;
    e.flags |= 2;
    const t = e.dep,
        n = ie,
        s = Ne;
    ((ie = e), (Ne = !0));
    try {
        Ii(e);
        const r = e.fn(e._value);
        (t.version === 0 || pt(r, e._value)) && ((e.flags |= 128), (e._value = r), t.version++);
    } catch (r) {
        throw (t.version++, r);
    } finally {
        ((ie = n), (Ne = s), Ri(e), (e.flags &= -3));
    }
}
function Ws(e, t = !1) {
    const { dep: n, prevSub: s, nextSub: r } = e;
    if (
        (s && ((s.nextSub = r), (e.prevSub = void 0)),
        r && ((r.prevSub = s), (e.nextSub = void 0)),
        n.subs === e && ((n.subs = s), !s && n.computed))
    ) {
        n.computed.flags &= -5;
        for (let i = n.computed.deps; i; i = i.nextDep) Ws(i, !0);
    }
    !t && !--n.sc && n.map && n.map.delete(n.key);
}
function gl(e) {
    const { prevDep: t, nextDep: n } = e;
    (t && ((t.nextDep = n), (e.prevDep = void 0)), n && ((n.prevDep = t), (e.nextDep = void 0)));
}
let Ne = !0;
const Ti = [];
function rt() {
    (Ti.push(Ne), (Ne = !1));
}
function it() {
    const e = Ti.pop();
    Ne = e === void 0 ? !0 : e;
}
function mr(e) {
    const { cleanup: t } = e;
    if (((e.cleanup = void 0), t)) {
        const n = ie;
        ie = void 0;
        try {
            t();
        } finally {
            ie = n;
        }
    }
}
let cn = 0;
class vl {
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
class zs {
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
        if (!ie || !Ne || ie === this.computed) return;
        let n = this.activeLink;
        if (n === void 0 || n.sub !== ie)
            ((n = this.activeLink = new vl(ie, this)),
                ie.deps
                    ? ((n.prevDep = ie.depsTail), (ie.depsTail.nextDep = n), (ie.depsTail = n))
                    : (ie.deps = ie.depsTail = n),
                Oi(n));
        else if (n.version === -1 && ((n.version = this.version), n.nextDep)) {
            const s = n.nextDep;
            ((s.prevDep = n.prevDep),
                n.prevDep && (n.prevDep.nextDep = s),
                (n.prevDep = ie.depsTail),
                (n.nextDep = void 0),
                (ie.depsTail.nextDep = n),
                (ie.depsTail = n),
                ie.deps === n && (ie.deps = s));
        }
        return n;
    }
    trigger(t) {
        (this.version++, cn++, this.notify(t));
    }
    notify(t) {
        Bs();
        try {
            for (let n = this.subs; n; n = n.prevSub) n.sub.notify() && n.sub.dep.notify();
        } finally {
            Ks();
        }
    }
}
function Oi(e) {
    if ((e.dep.sc++, e.sub.flags & 4)) {
        const t = e.dep.computed;
        if (t && !e.dep.subs) {
            t.flags |= 20;
            for (let s = t.deps; s; s = s.nextDep) Oi(s);
        }
        const n = e.dep.subs;
        (n !== e && ((e.prevSub = n), n && (n.nextSub = e)), (e.dep.subs = e));
    }
}
const xs = new WeakMap(),
    St = Symbol(''),
    Ls = Symbol(''),
    un = Symbol('');
function ge(e, t, n) {
    if (Ne && ie) {
        let s = xs.get(e);
        s || xs.set(e, (s = new Map()));
        let r = s.get(n);
        (r || (s.set(n, (r = new zs())), (r.map = s), (r.key = n)), r.track());
    }
}
function tt(e, t, n, s, r, i) {
    const o = xs.get(e);
    if (!o) {
        cn++;
        return;
    }
    const l = (a) => {
        a && a.trigger();
    };
    if ((Bs(), t === 'clear')) o.forEach(l);
    else {
        const a = j(e),
            f = a && Ds(n);
        if (a && n === 'length') {
            const c = Number(s);
            o.forEach((h, p) => {
                (p === 'length' || p === un || (!Je(p) && p >= c)) && l(h);
            });
        } else
            switch (((n !== void 0 || o.has(void 0)) && l(o.get(n)), f && l(o.get(un)), t)) {
                case 'add':
                    a ? f && l(o.get('length')) : (l(o.get(St)), Tt(e) && l(o.get(Ls)));
                    break;
                case 'delete':
                    a || (l(o.get(St)), Tt(e) && l(o.get(Ls)));
                    break;
                case 'set':
                    Tt(e) && l(o.get(St));
                    break;
            }
    }
    Ks();
}
function kt(e) {
    const t = Y(e);
    return t === e ? t : (ge(t, 'iterate', un), Ae(e) ? t : t.map(pe));
}
function es(e) {
    return (ge((e = Y(e)), 'iterate', un), e);
}
const yl = {
    __proto__: null,
    [Symbol.iterator]() {
        return ds(this, Symbol.iterator, pe);
    },
    concat(...e) {
        return kt(this).concat(...e.map((t) => (j(t) ? kt(t) : t)));
    },
    entries() {
        return ds(this, 'entries', (e) => ((e[1] = pe(e[1])), e));
    },
    every(e, t) {
        return Qe(this, 'every', e, t, void 0, arguments);
    },
    filter(e, t) {
        return Qe(this, 'filter', e, t, (n) => n.map(pe), arguments);
    },
    find(e, t) {
        return Qe(this, 'find', e, t, pe, arguments);
    },
    findIndex(e, t) {
        return Qe(this, 'findIndex', e, t, void 0, arguments);
    },
    findLast(e, t) {
        return Qe(this, 'findLast', e, t, pe, arguments);
    },
    findLastIndex(e, t) {
        return Qe(this, 'findLastIndex', e, t, void 0, arguments);
    },
    forEach(e, t) {
        return Qe(this, 'forEach', e, t, void 0, arguments);
    },
    includes(...e) {
        return hs(this, 'includes', e);
    },
    indexOf(...e) {
        return hs(this, 'indexOf', e);
    },
    join(e) {
        return kt(this).join(e);
    },
    lastIndexOf(...e) {
        return hs(this, 'lastIndexOf', e);
    },
    map(e, t) {
        return Qe(this, 'map', e, t, void 0, arguments);
    },
    pop() {
        return qt(this, 'pop');
    },
    push(...e) {
        return qt(this, 'push', e);
    },
    reduce(e, ...t) {
        return pr(this, 'reduce', e, t);
    },
    reduceRight(e, ...t) {
        return pr(this, 'reduceRight', e, t);
    },
    shift() {
        return qt(this, 'shift');
    },
    some(e, t) {
        return Qe(this, 'some', e, t, void 0, arguments);
    },
    splice(...e) {
        return qt(this, 'splice', e);
    },
    toReversed() {
        return kt(this).toReversed();
    },
    toSorted(e) {
        return kt(this).toSorted(e);
    },
    toSpliced(...e) {
        return kt(this).toSpliced(...e);
    },
    unshift(...e) {
        return qt(this, 'unshift', e);
    },
    values() {
        return ds(this, 'values', pe);
    },
};
function ds(e, t, n) {
    const s = es(e),
        r = s[t]();
    return (
        s !== e &&
            !Ae(e) &&
            ((r._next = r.next),
            (r.next = () => {
                const i = r._next();
                return (i.value && (i.value = n(i.value)), i);
            })),
        r
    );
}
const bl = Array.prototype;
function Qe(e, t, n, s, r, i) {
    const o = es(e),
        l = o !== e && !Ae(e),
        a = o[t];
    if (a !== bl[t]) {
        const h = a.apply(e, i);
        return l ? pe(h) : h;
    }
    let f = n;
    o !== e &&
        (l
            ? (f = function (h, p) {
                  return n.call(this, pe(h), p, e);
              })
            : n.length > 2 &&
              (f = function (h, p) {
                  return n.call(this, h, p, e);
              }));
    const c = a.call(o, f, s);
    return l && r ? r(c) : c;
}
function pr(e, t, n, s) {
    const r = es(e);
    let i = n;
    return (
        r !== e &&
            (Ae(e)
                ? n.length > 3 &&
                  (i = function (o, l, a) {
                      return n.call(this, o, l, a, e);
                  })
                : (i = function (o, l, a) {
                      return n.call(this, o, pe(l), a, e);
                  })),
        r[t](i, ...s)
    );
}
function hs(e, t, n) {
    const s = Y(e);
    ge(s, 'iterate', un);
    const r = s[t](...n);
    return (r === -1 || r === !1) && Js(n[0]) ? ((n[0] = Y(n[0])), s[t](...n)) : r;
}
function qt(e, t, n = []) {
    (rt(), Bs());
    const s = Y(e)[t].apply(e, n);
    return (Ks(), it(), s);
}
const Cl = Fs('__proto__,__v_isRef,__isVue'),
    Vi = new Set(
        Object.getOwnPropertyNames(Symbol)
            .filter((e) => e !== 'arguments' && e !== 'caller')
            .map((e) => Symbol[e])
            .filter(Je),
    );
function _l(e) {
    Je(e) || (e = String(e));
    const t = Y(this);
    return (ge(t, 'has', e), t.hasOwnProperty(e));
}
class Ui {
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
            return s === (r ? (i ? Rl : Hi) : i ? Fi : $i).get(t) ||
                Object.getPrototypeOf(t) === Object.getPrototypeOf(s)
                ? t
                : void 0;
        const o = j(t);
        if (!r) {
            let a;
            if (o && (a = yl[n])) return a;
            if (n === 'hasOwnProperty') return _l;
        }
        const l = Reflect.get(t, n, ye(t) ? t : s);
        return (Je(n) ? Vi.has(n) : Cl(n)) || (r || ge(t, 'get', n), i)
            ? l
            : ye(l)
              ? o && Ds(n)
                  ? l
                  : l.value
              : oe(l)
                ? r
                    ? Di(l)
                    : ts(l)
                : l;
    }
}
class Ni extends Ui {
    constructor(t = !1) {
        super(!1, t);
    }
    set(t, n, s, r) {
        let i = t[n];
        if (!this._isShallow) {
            const a = gt(i);
            if ((!Ae(s) && !gt(s) && ((i = Y(i)), (s = Y(s))), !j(t) && ye(i) && !ye(s)))
                return a ? !1 : ((i.value = s), !0);
        }
        const o = j(t) && Ds(n) ? Number(n) < t.length : Q(t, n),
            l = Reflect.set(t, n, s, ye(t) ? t : r);
        return (t === Y(r) && (o ? pt(s, i) && tt(t, 'set', n, s) : tt(t, 'add', n, s)), l);
    }
    deleteProperty(t, n) {
        const s = Q(t, n);
        t[n];
        const r = Reflect.deleteProperty(t, n);
        return (r && s && tt(t, 'delete', n, void 0), r);
    }
    has(t, n) {
        const s = Reflect.has(t, n);
        return ((!Je(n) || !Vi.has(n)) && ge(t, 'has', n), s);
    }
    ownKeys(t) {
        return (ge(t, 'iterate', j(t) ? 'length' : St), Reflect.ownKeys(t));
    }
}
class Pl extends Ui {
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
const wl = new Ni(),
    Sl = new Pl(),
    El = new Ni(!0);
const Ms = (e) => e,
    xn = (e) => Reflect.getPrototypeOf(e);
function xl(e, t, n) {
    return function (...s) {
        const r = this.__v_raw,
            i = Y(r),
            o = Tt(i),
            l = e === 'entries' || (e === Symbol.iterator && o),
            a = e === 'keys' && o,
            f = r[e](...s),
            c = n ? Ms : t ? On : pe;
        return (
            !t && ge(i, 'iterate', a ? Ls : St),
            {
                next() {
                    const { value: h, done: p } = f.next();
                    return p
                        ? { value: h, done: p }
                        : { value: l ? [c(h[0]), c(h[1])] : c(h), done: p };
                },
                [Symbol.iterator]() {
                    return this;
                },
            }
        );
    };
}
function Ln(e) {
    return function (...t) {
        return e === 'delete' ? !1 : e === 'clear' ? void 0 : this;
    };
}
function Ll(e, t) {
    const n = {
        get(r) {
            const i = this.__v_raw,
                o = Y(i),
                l = Y(r);
            e || (pt(r, l) && ge(o, 'get', r), ge(o, 'get', l));
            const { has: a } = xn(o),
                f = t ? Ms : e ? On : pe;
            if (a.call(o, r)) return f(i.get(r));
            if (a.call(o, l)) return f(i.get(l));
            i !== o && i.get(r);
        },
        get size() {
            const r = this.__v_raw;
            return (!e && ge(Y(r), 'iterate', St), Reflect.get(r, 'size', r));
        },
        has(r) {
            const i = this.__v_raw,
                o = Y(i),
                l = Y(r);
            return (
                e || (pt(r, l) && ge(o, 'has', r), ge(o, 'has', l)),
                r === l ? i.has(r) : i.has(r) || i.has(l)
            );
        },
        forEach(r, i) {
            const o = this,
                l = o.__v_raw,
                a = Y(l),
                f = t ? Ms : e ? On : pe;
            return (!e && ge(a, 'iterate', St), l.forEach((c, h) => r.call(i, f(c), f(h), o)));
        },
    };
    return (
        be(
            n,
            e
                ? { add: Ln('add'), set: Ln('set'), delete: Ln('delete'), clear: Ln('clear') }
                : {
                      add(r) {
                          !t && !Ae(r) && !gt(r) && (r = Y(r));
                          const i = Y(this);
                          return (xn(i).has.call(i, r) || (i.add(r), tt(i, 'add', r, r)), this);
                      },
                      set(r, i) {
                          !t && !Ae(i) && !gt(i) && (i = Y(i));
                          const o = Y(this),
                              { has: l, get: a } = xn(o);
                          let f = l.call(o, r);
                          f || ((r = Y(r)), (f = l.call(o, r)));
                          const c = a.call(o, r);
                          return (
                              o.set(r, i),
                              f ? pt(i, c) && tt(o, 'set', r, i) : tt(o, 'add', r, i),
                              this
                          );
                      },
                      delete(r) {
                          const i = Y(this),
                              { has: o, get: l } = xn(i);
                          let a = o.call(i, r);
                          (a || ((r = Y(r)), (a = o.call(i, r))), l && l.call(i, r));
                          const f = i.delete(r);
                          return (a && tt(i, 'delete', r, void 0), f);
                      },
                      clear() {
                          const r = Y(this),
                              i = r.size !== 0,
                              o = r.clear();
                          return (i && tt(r, 'clear', void 0, void 0), o);
                      },
                  },
        ),
        ['keys', 'values', 'entries', Symbol.iterator].forEach((r) => {
            n[r] = xl(r, e, t);
        }),
        n
    );
}
function Gs(e, t) {
    const n = Ll(e, t);
    return (s, r, i) =>
        r === '__v_isReactive'
            ? !e
            : r === '__v_isReadonly'
              ? e
              : r === '__v_raw'
                ? s
                : Reflect.get(Q(n, r) && r in s ? n : s, r, i);
}
const Ml = { get: Gs(!1, !1) },
    kl = { get: Gs(!1, !0) },
    Il = { get: Gs(!0, !1) };
const $i = new WeakMap(),
    Fi = new WeakMap(),
    Hi = new WeakMap(),
    Rl = new WeakMap();
function Al(e) {
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
function Tl(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : Al(sl(e));
}
function ts(e) {
    return gt(e) ? e : qs(e, !1, wl, Ml, $i);
}
function ji(e) {
    return qs(e, !1, El, kl, Fi);
}
function Di(e) {
    return qs(e, !0, Sl, Il, Hi);
}
function qs(e, t, n, s, r) {
    if (!oe(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
    const i = Tl(e);
    if (i === 0) return e;
    const o = r.get(e);
    if (o) return o;
    const l = new Proxy(e, i === 2 ? s : n);
    return (r.set(e, l), l);
}
function Ot(e) {
    return gt(e) ? Ot(e.__v_raw) : !!(e && e.__v_isReactive);
}
function gt(e) {
    return !!(e && e.__v_isReadonly);
}
function Ae(e) {
    return !!(e && e.__v_isShallow);
}
function Js(e) {
    return e ? !!e.__v_raw : !1;
}
function Y(e) {
    const t = e && e.__v_raw;
    return t ? Y(t) : e;
}
function Ol(e) {
    return (!Q(e, '__v_skip') && Object.isExtensible(e) && ws(e, '__v_skip', !0), e);
}
const pe = (e) => (oe(e) ? ts(e) : e),
    On = (e) => (oe(e) ? Di(e) : e);
function ye(e) {
    return e ? e.__v_isRef === !0 : !1;
}
function Vl(e) {
    return Bi(e, !1);
}
function Vn(e) {
    return Bi(e, !0);
}
function Bi(e, t) {
    return ye(e) ? e : new Ul(e, t);
}
class Ul {
    constructor(t, n) {
        ((this.dep = new zs()),
            (this.__v_isRef = !0),
            (this.__v_isShallow = !1),
            (this._rawValue = n ? t : Y(t)),
            (this._value = n ? t : pe(t)),
            (this.__v_isShallow = n));
    }
    get value() {
        return (this.dep.track(), this._value);
    }
    set value(t) {
        const n = this._rawValue,
            s = this.__v_isShallow || Ae(t) || gt(t);
        ((t = s ? t : Y(t)),
            pt(t, n) && ((this._rawValue = t), (this._value = s ? t : pe(t)), this.dep.trigger()));
    }
}
function Vt(e) {
    return ye(e) ? e.value : e;
}
const Nl = {
    get: (e, t, n) => (t === '__v_raw' ? e : Vt(Reflect.get(e, t, n))),
    set: (e, t, n, s) => {
        const r = e[t];
        return ye(r) && !ye(n) ? ((r.value = n), !0) : Reflect.set(e, t, n, s);
    },
};
function Ki(e) {
    return Ot(e) ? e : new Proxy(e, Nl);
}
class $l {
    constructor(t, n, s) {
        ((this.fn = t),
            (this.setter = n),
            (this._value = void 0),
            (this.dep = new zs(this)),
            (this.__v_isRef = !0),
            (this.deps = void 0),
            (this.depsTail = void 0),
            (this.flags = 16),
            (this.globalVersion = cn - 1),
            (this.next = void 0),
            (this.effect = this),
            (this.__v_isReadonly = !n),
            (this.isSSR = s));
    }
    notify() {
        if (((this.flags |= 16), !(this.flags & 8) && ie !== this)) return (ki(this, !0), !0);
    }
    get value() {
        const t = this.dep.track();
        return (Ai(this), t && (t.version = this.dep.version), this._value);
    }
    set value(t) {
        this.setter && this.setter(t);
    }
}
function Fl(e, t, n = !1) {
    let s, r;
    return (W(e) ? (s = e) : ((s = e.get), (r = e.set)), new $l(s, r, n));
}
const Mn = {},
    Un = new WeakMap();
let _t;
function Hl(e, t = !1, n = _t) {
    if (n) {
        let s = Un.get(n);
        (s || Un.set(n, (s = [])), s.push(e));
    }
}
function jl(e, t, n = te) {
    const { immediate: s, deep: r, once: i, scheduler: o, augmentJob: l, call: a } = n,
        f = (T) => (r ? T : Ae(T) || r === !1 || r === 0 ? nt(T, 1) : nt(T));
    let c,
        h,
        p,
        g,
        R = !1,
        A = !1;
    if (
        (ye(e)
            ? ((h = () => e.value), (R = Ae(e)))
            : Ot(e)
              ? ((h = () => f(e)), (R = !0))
              : j(e)
                ? ((A = !0),
                  (R = e.some((T) => Ot(T) || Ae(T))),
                  (h = () =>
                      e.map((T) => {
                          if (ye(T)) return T.value;
                          if (Ot(T)) return f(T);
                          if (W(T)) return a ? a(T, 2) : T();
                      })))
                : W(e)
                  ? t
                      ? (h = a ? () => a(e, 2) : e)
                      : (h = () => {
                            if (p) {
                                rt();
                                try {
                                    p();
                                } finally {
                                    it();
                                }
                            }
                            const T = _t;
                            _t = c;
                            try {
                                return a ? a(e, 3, [g]) : e(g);
                            } finally {
                                _t = T;
                            }
                        })
                  : (h = Ue),
        t && r)
    ) {
        const T = h,
            ne = r === !0 ? 1 / 0 : r;
        h = () => nt(T(), ne);
    }
    const z = pl(),
        F = () => {
            (c.stop(), z && z.active && js(z.effects, c));
        };
    if (i && t) {
        const T = t;
        t = (...ne) => {
            (T(...ne), F());
        };
    }
    let V = A ? new Array(e.length).fill(Mn) : Mn;
    const H = (T) => {
        if (!(!(c.flags & 1) || (!c.dirty && !T)))
            if (t) {
                const ne = c.run();
                if (r || R || (A ? ne.some((me, ae) => pt(me, V[ae])) : pt(ne, V))) {
                    p && p();
                    const me = _t;
                    _t = c;
                    try {
                        const ae = [ne, V === Mn ? void 0 : A && V[0] === Mn ? [] : V, g];
                        ((V = ne), a ? a(t, 3, ae) : t(...ae));
                    } finally {
                        _t = me;
                    }
                }
            } else c.run();
    };
    return (
        l && l(H),
        (c = new Li(h)),
        (c.scheduler = o ? () => o(H, !1) : H),
        (g = (T) => Hl(T, !1, c)),
        (p = c.onStop =
            () => {
                const T = Un.get(c);
                if (T) {
                    if (a) a(T, 4);
                    else for (const ne of T) ne();
                    Un.delete(c);
                }
            }),
        t ? (s ? H(!0) : (V = c.run())) : o ? o(H.bind(null, !0), !0) : c.run(),
        (F.pause = c.pause.bind(c)),
        (F.resume = c.resume.bind(c)),
        (F.stop = F),
        F
    );
}
function nt(e, t = 1 / 0, n) {
    if (t <= 0 || !oe(e) || e.__v_skip || ((n = n || new Set()), n.has(e))) return e;
    if ((n.add(e), t--, ye(e))) nt(e.value, t, n);
    else if (j(e)) for (let s = 0; s < e.length; s++) nt(e[s], t, n);
    else if (Gn(e) || Tt(e))
        e.forEach((s) => {
            nt(s, t, n);
        });
    else if (Pi(e)) {
        for (const s in e) nt(e[s], t, n);
        for (const s of Object.getOwnPropertySymbols(e))
            Object.prototype.propertyIsEnumerable.call(e, s) && nt(e[s], t, n);
    }
    return e;
}
/**
 * @vue/runtime-core v3.5.18
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ function Cn(e, t, n, s) {
    try {
        return s ? e(...s) : e();
    } catch (r) {
        ns(r, t, n);
    }
}
function Xe(e, t, n, s) {
    if (W(e)) {
        const r = Cn(e, t, n, s);
        return (
            r &&
                Ci(r) &&
                r.catch((i) => {
                    ns(i, t, n);
                }),
            r
        );
    }
    if (j(e)) {
        const r = [];
        for (let i = 0; i < e.length; i++) r.push(Xe(e[i], t, n, s));
        return r;
    }
}
function ns(e, t, n, s = !0) {
    const r = t ? t.vnode : null,
        { errorHandler: i, throwUnhandledErrorInProduction: o } = (t && t.appContext.config) || te;
    if (t) {
        let l = t.parent;
        const a = t.proxy,
            f = `https://vuejs.org/error-reference/#runtime-${n}`;
        for (; l;) {
            const c = l.ec;
            if (c) {
                for (let h = 0; h < c.length; h++) if (c[h](e, a, f) === !1) return;
            }
            l = l.parent;
        }
        if (i) {
            (rt(), Cn(i, null, 10, [e, a, f]), it());
            return;
        }
    }
    Dl(e, n, r, s, o);
}
function Dl(e, t, n, s = !0, r = !1) {
    if (r) throw e;
    console.error(e);
}
const Pe = [];
let Ge = -1;
const Ut = [];
let dt = null,
    It = 0;
const Wi = Promise.resolve();
let Nn = null;
function zi(e) {
    const t = Nn || Wi;
    return e ? t.then(this ? e.bind(this) : e) : t;
}
function Bl(e) {
    let t = Ge + 1,
        n = Pe.length;
    for (; t < n;) {
        const s = (t + n) >>> 1,
            r = Pe[s],
            i = fn(r);
        i < e || (i === e && r.flags & 2) ? (t = s + 1) : (n = s);
    }
    return t;
}
function Xs(e) {
    if (!(e.flags & 1)) {
        const t = fn(e),
            n = Pe[Pe.length - 1];
        (!n || (!(e.flags & 2) && t >= fn(n)) ? Pe.push(e) : Pe.splice(Bl(t), 0, e),
            (e.flags |= 1),
            Gi());
    }
}
function Gi() {
    Nn || (Nn = Wi.then(Xi));
}
function qi(e) {
    (j(e)
        ? Ut.push(...e)
        : dt && e.id === -1
          ? dt.splice(It + 1, 0, e)
          : e.flags & 1 || (Ut.push(e), (e.flags |= 1)),
        Gi());
}
function gr(e, t, n = Ge + 1) {
    for (; n < Pe.length; n++) {
        const s = Pe[n];
        if (s && s.flags & 2) {
            if (e && s.id !== e.uid) continue;
            (Pe.splice(n, 1),
                n--,
                s.flags & 4 && (s.flags &= -2),
                s(),
                s.flags & 4 || (s.flags &= -2));
        }
    }
}
function Ji(e) {
    if (Ut.length) {
        const t = [...new Set(Ut)].sort((n, s) => fn(n) - fn(s));
        if (((Ut.length = 0), dt)) {
            dt.push(...t);
            return;
        }
        for (dt = t, It = 0; It < dt.length; It++) {
            const n = dt[It];
            (n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), (n.flags &= -2));
        }
        ((dt = null), (It = 0));
    }
}
const fn = (e) => (e.id == null ? (e.flags & 2 ? -1 : 1 / 0) : e.id);
function Xi(e) {
    try {
        for (Ge = 0; Ge < Pe.length; Ge++) {
            const t = Pe[Ge];
            t &&
                !(t.flags & 8) &&
                (t.flags & 4 && (t.flags &= -2),
                Cn(t, t.i, t.i ? 15 : 14),
                t.flags & 4 || (t.flags &= -2));
        }
    } finally {
        for (; Ge < Pe.length; Ge++) {
            const t = Pe[Ge];
            t && (t.flags &= -2);
        }
        ((Ge = -1), (Pe.length = 0), Ji(), (Nn = null), (Pe.length || Ut.length) && Xi());
    }
}
let ke = null,
    Yi = null;
function $n(e) {
    const t = ke;
    return ((ke = e), (Yi = (e && e.type.__scopeId) || null), t);
}
function ft(e, t = ke, n) {
    if (!t || e._n) return e;
    const s = (...r) => {
        s._d && xr(-1);
        const i = $n(t);
        let o;
        try {
            o = e(...r);
        } finally {
            ($n(i), s._d && xr(1));
        }
        return o;
    };
    return ((s._n = !0), (s._c = !0), (s._d = !0), s);
}
function Dt(e, t) {
    if (ke === null) return e;
    const n = os(ke),
        s = e.dirs || (e.dirs = []);
    for (let r = 0; r < t.length; r++) {
        let [i, o, l, a = te] = t[r];
        i &&
            (W(i) && (i = { mounted: i, updated: i }),
            i.deep && nt(o),
            s.push({ dir: i, instance: n, value: o, oldValue: void 0, arg: l, modifiers: a }));
    }
    return e;
}
function bt(e, t, n, s) {
    const r = e.dirs,
        i = t && t.dirs;
    for (let o = 0; o < r.length; o++) {
        const l = r[o];
        i && (l.oldValue = i[o].value);
        let a = l.dir[s];
        a && (rt(), Xe(a, n, 8, [e.el, l, e, t]), it());
    }
}
const Kl = Symbol('_vte'),
    Wl = (e) => e.__isTeleport;
function Ys(e, t) {
    e.shapeFlag & 6 && e.component
        ? ((e.transition = t), Ys(e.component.subTree, t))
        : e.shapeFlag & 128
          ? ((e.ssContent.transition = t.clone(e.ssContent)),
            (e.ssFallback.transition = t.clone(e.ssFallback)))
          : (e.transition = t);
}
/*! #__NO_SIDE_EFFECTS__ */ function Qi(e, t) {
    return W(e) ? be({ name: e.name }, t, { setup: e }) : e;
}
function Zi(e) {
    e.ids = [e.ids[0] + e.ids[2]++ + '-', 0, 0];
}
function zl(e) {
    const t = sr(),
        n = Vn(null);
    if (t) {
        const r = t.refs === te ? (t.refs = {}) : t.refs;
        Object.defineProperty(r, e, {
            enumerable: !0,
            get: () => n.value,
            set: (i) => (n.value = i),
        });
    }
    return n;
}
function tn(e, t, n, s, r = !1) {
    if (j(e)) {
        e.forEach((R, A) => tn(R, t && (j(t) ? t[A] : t), n, s, r));
        return;
    }
    if (nn(s) && !r) {
        s.shapeFlag & 512 &&
            s.type.__asyncResolved &&
            s.component.subTree.component &&
            tn(e, t, n, s.component.subTree);
        return;
    }
    const i = s.shapeFlag & 4 ? os(s.component) : s.el,
        o = r ? null : i,
        { i: l, r: a } = e,
        f = t && t.r,
        c = l.refs === te ? (l.refs = {}) : l.refs,
        h = l.setupState,
        p = Y(h),
        g = h === te ? () => !1 : (R) => Q(p, R);
    if (
        (f != null &&
            f !== a &&
            (de(f) ? ((c[f] = null), g(f) && (h[f] = null)) : ye(f) && (f.value = null)),
        W(a))
    )
        Cn(a, l, 12, [o, c]);
    else {
        const R = de(a),
            A = ye(a);
        if (R || A) {
            const z = () => {
                if (e.f) {
                    const F = R ? (g(a) ? h[a] : c[a]) : a.value;
                    r
                        ? j(F) && js(F, i)
                        : j(F)
                          ? F.includes(i) || F.push(i)
                          : R
                            ? ((c[a] = [i]), g(a) && (h[a] = c[a]))
                            : ((a.value = [i]), e.k && (c[e.k] = a.value));
                } else
                    R
                        ? ((c[a] = o), g(a) && (h[a] = o))
                        : A && ((a.value = o), e.k && (c[e.k] = o));
            };
            o ? ((z.id = -1), Me(z, n)) : z();
        }
    }
}
Xn().requestIdleCallback;
Xn().cancelIdleCallback;
const nn = (e) => !!e.type.__asyncLoader,
    eo = (e) => e.type.__isKeepAlive;
function Gl(e, t) {
    to(e, 'a', t);
}
function ql(e, t) {
    to(e, 'da', t);
}
function to(e, t, n = ve) {
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
    if ((ss(t, s, n), n)) {
        let r = n.parent;
        for (; r && r.parent;) (eo(r.parent.vnode) && Jl(s, t, n, r), (r = r.parent));
    }
}
function Jl(e, t, n, s) {
    const r = ss(t, e, s, !0);
    Qs(() => {
        js(s[t], r);
    }, n);
}
function ss(e, t, n = ve, s = !1) {
    if (n) {
        const r = n[e] || (n[e] = []),
            i =
                t.__weh ||
                (t.__weh = (...o) => {
                    rt();
                    const l = _n(n),
                        a = Xe(t, n, e, o);
                    return (l(), it(), a);
                });
        return (s ? r.unshift(i) : r.push(i), i);
    }
}
const ot =
        (e) =>
        (t, n = ve) => {
            (!hn || e === 'sp') && ss(e, (...s) => t(...s), n);
        },
    Xl = ot('bm'),
    no = ot('m'),
    so = ot('bu'),
    Yl = ot('u'),
    Ql = ot('bum'),
    Qs = ot('um'),
    Zl = ot('sp'),
    ea = ot('rtg'),
    ta = ot('rtc');
function na(e, t = ve) {
    ss('ec', e, t);
}
const sa = 'components';
function fe(e, t) {
    return ia(sa, e, !0, t) || e;
}
const ra = Symbol.for('v-ndc');
function ia(e, t, n = !0, s = !1) {
    const r = ke || ve;
    if (r) {
        const i = r.type;
        {
            const l = Wa(i, !1);
            if (l && (l === t || l === Oe(t) || l === Jn(Oe(t)))) return i;
        }
        const o = vr(r[e] || i[e], t) || vr(r.appContext[e], t);
        return !o && s ? i : o;
    }
}
function vr(e, t) {
    return e && (e[t] || e[Oe(t)] || e[Jn(Oe(t))]);
}
function st(e, t, n, s) {
    let r;
    const i = n,
        o = j(e);
    if (o || de(e)) {
        const l = o && Ot(e);
        let a = !1,
            f = !1;
        (l && ((a = !Ae(e)), (f = gt(e)), (e = es(e))), (r = new Array(e.length)));
        for (let c = 0, h = e.length; c < h; c++)
            r[c] = t(a ? (f ? On(pe(e[c])) : pe(e[c])) : e[c], c, void 0, i);
    } else if (typeof e == 'number') {
        r = new Array(e);
        for (let l = 0; l < e; l++) r[l] = t(l + 1, l, void 0, i);
    } else if (oe(e))
        if (e[Symbol.iterator]) r = Array.from(e, (l, a) => t(l, a, void 0, i));
        else {
            const l = Object.keys(e);
            r = new Array(l.length);
            for (let a = 0, f = l.length; a < f; a++) {
                const c = l[a];
                r[a] = t(e[c], c, a, i);
            }
        }
    else r = [];
    return r;
}
const ks = (e) => (e ? (So(e) ? os(e) : ks(e.parent)) : null),
    sn = be(Object.create(null), {
        $: (e) => e,
        $el: (e) => e.vnode.el,
        $data: (e) => e.data,
        $props: (e) => e.props,
        $attrs: (e) => e.attrs,
        $slots: (e) => e.slots,
        $refs: (e) => e.refs,
        $parent: (e) => ks(e.parent),
        $root: (e) => ks(e.root),
        $host: (e) => e.ce,
        $emit: (e) => e.emit,
        $options: (e) => io(e),
        $forceUpdate: (e) =>
            e.f ||
            (e.f = () => {
                Xs(e.update);
            }),
        $nextTick: (e) => e.n || (e.n = zi.bind(e.proxy)),
        $watch: (e) => xa.bind(e),
    }),
    ms = (e, t) => e !== te && !e.__isScriptSetup && Q(e, t),
    oa = {
        get({ _: e }, t) {
            if (t === '__v_skip') return !0;
            const {
                ctx: n,
                setupState: s,
                data: r,
                props: i,
                accessCache: o,
                type: l,
                appContext: a,
            } = e;
            let f;
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
                    if (ms(s, t)) return ((o[t] = 1), s[t]);
                    if (r !== te && Q(r, t)) return ((o[t] = 2), r[t]);
                    if ((f = e.propsOptions[0]) && Q(f, t)) return ((o[t] = 3), i[t]);
                    if (n !== te && Q(n, t)) return ((o[t] = 4), n[t]);
                    Is && (o[t] = 0);
                }
            }
            const c = sn[t];
            let h, p;
            if (c) return (t === '$attrs' && ge(e.attrs, 'get', ''), c(e));
            if ((h = l.__cssModules) && (h = h[t])) return h;
            if (n !== te && Q(n, t)) return ((o[t] = 4), n[t]);
            if (((p = a.config.globalProperties), Q(p, t))) return p[t];
        },
        set({ _: e }, t, n) {
            const { data: s, setupState: r, ctx: i } = e;
            return ms(r, t)
                ? ((r[t] = n), !0)
                : s !== te && Q(s, t)
                  ? ((s[t] = n), !0)
                  : Q(e.props, t) || (t[0] === '$' && t.slice(1) in e)
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
                (e !== te && Q(e, o)) ||
                ms(t, o) ||
                ((l = i[0]) && Q(l, o)) ||
                Q(s, o) ||
                Q(sn, o) ||
                Q(r.config.globalProperties, o)
            );
        },
        defineProperty(e, t, n) {
            return (
                n.get != null
                    ? (e._.accessCache[t] = 0)
                    : Q(n, 'value') && this.set(e, t, n.value, null),
                Reflect.defineProperty(e, t, n)
            );
        },
    };
function yr(e) {
    return j(e) ? e.reduce((t, n) => ((t[n] = null), t), {}) : e;
}
let Is = !0;
function la(e) {
    const t = io(e),
        n = e.proxy,
        s = e.ctx;
    ((Is = !1), t.beforeCreate && br(t.beforeCreate, e, 'bc'));
    const {
        data: r,
        computed: i,
        methods: o,
        watch: l,
        provide: a,
        inject: f,
        created: c,
        beforeMount: h,
        mounted: p,
        beforeUpdate: g,
        updated: R,
        activated: A,
        deactivated: z,
        beforeDestroy: F,
        beforeUnmount: V,
        destroyed: H,
        unmounted: T,
        render: ne,
        renderTracked: me,
        renderTriggered: ae,
        errorCaptured: Fe,
        serverPrefetch: lt,
        expose: He,
        inheritAttrs: at,
        components: yt,
        directives: je,
        filters: zt,
    } = t;
    if ((f && aa(f, s, null), o))
        for (const ee in o) {
            const J = o[ee];
            W(J) && (s[ee] = J.bind(n));
        }
    if (r) {
        const ee = r.call(n, n);
        oe(ee) && (e.data = ts(ee));
    }
    if (((Is = !0), i))
        for (const ee in i) {
            const J = i[ee],
                Ye = W(J) ? J.bind(n, n) : W(J.get) ? J.get.bind(n, n) : Ue,
                ct = !W(J) && W(J.set) ? J.set.bind(n) : Ue,
                De = Ve({ get: Ye, set: ct });
            Object.defineProperty(s, ee, {
                enumerable: !0,
                configurable: !0,
                get: () => De.value,
                set: (we) => (De.value = we),
            });
        }
    if (l) for (const ee in l) ro(l[ee], s, n, ee);
    if (a) {
        const ee = W(a) ? a.call(n) : a;
        Reflect.ownKeys(ee).forEach((J) => {
            $t(J, ee[J]);
        });
    }
    c && br(c, e, 'c');
    function he(ee, J) {
        j(J) ? J.forEach((Ye) => ee(Ye.bind(n))) : J && ee(J.bind(n));
    }
    if (
        (he(Xl, h),
        he(no, p),
        he(so, g),
        he(Yl, R),
        he(Gl, A),
        he(ql, z),
        he(na, Fe),
        he(ta, me),
        he(ea, ae),
        he(Ql, V),
        he(Qs, T),
        he(Zl, lt),
        j(He))
    )
        if (He.length) {
            const ee = e.exposed || (e.exposed = {});
            He.forEach((J) => {
                Object.defineProperty(ee, J, {
                    get: () => n[J],
                    set: (Ye) => (n[J] = Ye),
                    enumerable: !0,
                });
            });
        } else e.exposed || (e.exposed = {});
    (ne && e.render === Ue && (e.render = ne),
        at != null && (e.inheritAttrs = at),
        yt && (e.components = yt),
        je && (e.directives = je),
        lt && Zi(e));
}
function aa(e, t, n = Ue) {
    j(e) && (e = Rs(e));
    for (const s in e) {
        const r = e[s];
        let i;
        (oe(r)
            ? 'default' in r
                ? (i = ce(r.from || s, r.default, !0))
                : (i = ce(r.from || s))
            : (i = ce(r)),
            ye(i)
                ? Object.defineProperty(t, s, {
                      enumerable: !0,
                      configurable: !0,
                      get: () => i.value,
                      set: (o) => (i.value = o),
                  })
                : (t[s] = i));
    }
}
function br(e, t, n) {
    Xe(j(e) ? e.map((s) => s.bind(t.proxy)) : e.bind(t.proxy), t, n);
}
function ro(e, t, n, s) {
    let r = s.includes('.') ? bo(n, s) : () => n[s];
    if (de(e)) {
        const i = t[e];
        W(i) && rn(r, i);
    } else if (W(e)) rn(r, e.bind(n));
    else if (oe(e))
        if (j(e)) e.forEach((i) => ro(i, t, n, s));
        else {
            const i = W(e.handler) ? e.handler.bind(n) : t[e.handler];
            W(i) && rn(r, i, e);
        }
}
function io(e) {
    const t = e.type,
        { mixins: n, extends: s } = t,
        {
            mixins: r,
            optionsCache: i,
            config: { optionMergeStrategies: o },
        } = e.appContext,
        l = i.get(t);
    let a;
    return (
        l
            ? (a = l)
            : !r.length && !n && !s
              ? (a = t)
              : ((a = {}), r.length && r.forEach((f) => Fn(a, f, o, !0)), Fn(a, t, o)),
        oe(t) && i.set(t, a),
        a
    );
}
function Fn(e, t, n, s = !1) {
    const { mixins: r, extends: i } = t;
    (i && Fn(e, i, n, !0), r && r.forEach((o) => Fn(e, o, n, !0)));
    for (const o in t)
        if (!(s && o === 'expose')) {
            const l = ca[o] || (n && n[o]);
            e[o] = l ? l(e[o], t[o]) : t[o];
        }
    return e;
}
const ca = {
    data: Cr,
    props: _r,
    emits: _r,
    methods: Yt,
    computed: Yt,
    beforeCreate: _e,
    created: _e,
    beforeMount: _e,
    mounted: _e,
    beforeUpdate: _e,
    updated: _e,
    beforeDestroy: _e,
    beforeUnmount: _e,
    destroyed: _e,
    unmounted: _e,
    activated: _e,
    deactivated: _e,
    errorCaptured: _e,
    serverPrefetch: _e,
    components: Yt,
    directives: Yt,
    watch: fa,
    provide: Cr,
    inject: ua,
};
function Cr(e, t) {
    return t
        ? e
            ? function () {
                  return be(W(e) ? e.call(this, this) : e, W(t) ? t.call(this, this) : t);
              }
            : t
        : e;
}
function ua(e, t) {
    return Yt(Rs(e), Rs(t));
}
function Rs(e) {
    if (j(e)) {
        const t = {};
        for (let n = 0; n < e.length; n++) t[e[n]] = e[n];
        return t;
    }
    return e;
}
function _e(e, t) {
    return e ? [...new Set([].concat(e, t))] : t;
}
function Yt(e, t) {
    return e ? be(Object.create(null), e, t) : t;
}
function _r(e, t) {
    return e
        ? j(e) && j(t)
            ? [...new Set([...e, ...t])]
            : be(Object.create(null), yr(e), yr(t ?? {}))
        : t;
}
function fa(e, t) {
    if (!e) return t;
    if (!t) return e;
    const n = be(Object.create(null), e);
    for (const s in t) n[s] = _e(e[s], t[s]);
    return n;
}
function oo() {
    return {
        app: null,
        config: {
            isNativeTag: tl,
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
let da = 0;
function ha(e, t) {
    return function (s, r = null) {
        (W(s) || (s = be({}, s)), r != null && !oe(r) && (r = null));
        const i = oo(),
            o = new WeakSet(),
            l = [];
        let a = !1;
        const f = (i.app = {
            _uid: da++,
            _component: s,
            _props: r,
            _container: null,
            _context: i,
            _instance: null,
            version: Ga,
            get config() {
                return i.config;
            },
            set config(c) {},
            use(c, ...h) {
                return (
                    o.has(c) ||
                        (c && W(c.install)
                            ? (o.add(c), c.install(f, ...h))
                            : W(c) && (o.add(c), c(f, ...h))),
                    f
                );
            },
            mixin(c) {
                return (i.mixins.includes(c) || i.mixins.push(c), f);
            },
            component(c, h) {
                return h ? ((i.components[c] = h), f) : i.components[c];
            },
            directive(c, h) {
                return h ? ((i.directives[c] = h), f) : i.directives[c];
            },
            mount(c, h, p) {
                if (!a) {
                    const g = f._ceVNode || G(s, r);
                    return (
                        (g.appContext = i),
                        p === !0 ? (p = 'svg') : p === !1 && (p = void 0),
                        e(g, c, p),
                        (a = !0),
                        (f._container = c),
                        (c.__vue_app__ = f),
                        os(g.component)
                    );
                }
            },
            onUnmount(c) {
                l.push(c);
            },
            unmount() {
                a &&
                    (Xe(l, f._instance, 16),
                    e(null, f._container),
                    delete f._container.__vue_app__);
            },
            provide(c, h) {
                return ((i.provides[c] = h), f);
            },
            runWithContext(c) {
                const h = Nt;
                Nt = f;
                try {
                    return c();
                } finally {
                    Nt = h;
                }
            },
        });
        return f;
    };
}
let Nt = null;
function $t(e, t) {
    if (ve) {
        let n = ve.provides;
        const s = ve.parent && ve.parent.provides;
        (s === n && (n = ve.provides = Object.create(s)), (n[e] = t));
    }
}
function ce(e, t, n = !1) {
    const s = sr();
    if (s || Nt) {
        let r = Nt
            ? Nt._context.provides
            : s
              ? s.parent == null || s.ce
                  ? s.vnode.appContext && s.vnode.appContext.provides
                  : s.parent.provides
              : void 0;
        if (r && e in r) return r[e];
        if (arguments.length > 1) return n && W(t) ? t.call(s && s.proxy) : t;
    }
}
const lo = {},
    ao = () => Object.create(lo),
    co = (e) => Object.getPrototypeOf(e) === lo;
function ma(e, t, n, s = !1) {
    const r = {},
        i = ao();
    ((e.propsDefaults = Object.create(null)), uo(e, t, r, i));
    for (const o in e.propsOptions[0]) o in r || (r[o] = void 0);
    (n ? (e.props = s ? r : ji(r)) : e.type.props ? (e.props = r) : (e.props = i), (e.attrs = i));
}
function pa(e, t, n, s) {
    const {
            props: r,
            attrs: i,
            vnode: { patchFlag: o },
        } = e,
        l = Y(r),
        [a] = e.propsOptions;
    let f = !1;
    if ((s || o > 0) && !(o & 16)) {
        if (o & 8) {
            const c = e.vnode.dynamicProps;
            for (let h = 0; h < c.length; h++) {
                let p = c[h];
                if (rs(e.emitsOptions, p)) continue;
                const g = t[p];
                if (a)
                    if (Q(i, p)) g !== i[p] && ((i[p] = g), (f = !0));
                    else {
                        const R = Oe(p);
                        r[R] = As(a, l, R, g, e, !1);
                    }
                else g !== i[p] && ((i[p] = g), (f = !0));
            }
        }
    } else {
        uo(e, t, r, i) && (f = !0);
        let c;
        for (const h in l)
            (!t || (!Q(t, h) && ((c = Et(h)) === h || !Q(t, c)))) &&
                (a
                    ? n &&
                      (n[h] !== void 0 || n[c] !== void 0) &&
                      (r[h] = As(a, l, h, void 0, e, !0))
                    : delete r[h]);
        if (i !== l) for (const h in i) (!t || !Q(t, h)) && (delete i[h], (f = !0));
    }
    f && tt(e.attrs, 'set', '');
}
function uo(e, t, n, s) {
    const [r, i] = e.propsOptions;
    let o = !1,
        l;
    if (t)
        for (let a in t) {
            if (Qt(a)) continue;
            const f = t[a];
            let c;
            r && Q(r, (c = Oe(a)))
                ? !i || !i.includes(c)
                    ? (n[c] = f)
                    : ((l || (l = {}))[c] = f)
                : rs(e.emitsOptions, a) || ((!(a in s) || f !== s[a]) && ((s[a] = f), (o = !0)));
        }
    if (i) {
        const a = Y(n),
            f = l || te;
        for (let c = 0; c < i.length; c++) {
            const h = i[c];
            n[h] = As(r, a, h, f[h], e, !Q(f, h));
        }
    }
    return o;
}
function As(e, t, n, s, r, i) {
    const o = e[n];
    if (o != null) {
        const l = Q(o, 'default');
        if (l && s === void 0) {
            const a = o.default;
            if (o.type !== Function && !o.skipFactory && W(a)) {
                const { propsDefaults: f } = r;
                if (n in f) s = f[n];
                else {
                    const c = _n(r);
                    ((s = f[n] = a.call(null, t)), c());
                }
            } else s = a;
            r.ce && r.ce._setProp(n, s);
        }
        o[0] && (i && !l ? (s = !1) : o[1] && (s === '' || s === Et(n)) && (s = !0));
    }
    return s;
}
const ga = new WeakMap();
function fo(e, t, n = !1) {
    const s = n ? ga : t.propsCache,
        r = s.get(e);
    if (r) return r;
    const i = e.props,
        o = {},
        l = [];
    let a = !1;
    if (!W(e)) {
        const c = (h) => {
            a = !0;
            const [p, g] = fo(h, t, !0);
            (be(o, p), g && l.push(...g));
        };
        (!n && t.mixins.length && t.mixins.forEach(c),
            e.extends && c(e.extends),
            e.mixins && e.mixins.forEach(c));
    }
    if (!i && !a) return (oe(e) && s.set(e, At), At);
    if (j(i))
        for (let c = 0; c < i.length; c++) {
            const h = Oe(i[c]);
            Pr(h) && (o[h] = te);
        }
    else if (i)
        for (const c in i) {
            const h = Oe(c);
            if (Pr(h)) {
                const p = i[c],
                    g = (o[h] = j(p) || W(p) ? { type: p } : be({}, p)),
                    R = g.type;
                let A = !1,
                    z = !0;
                if (j(R))
                    for (let F = 0; F < R.length; ++F) {
                        const V = R[F],
                            H = W(V) && V.name;
                        if (H === 'Boolean') {
                            A = !0;
                            break;
                        } else H === 'String' && (z = !1);
                    }
                else A = W(R) && R.name === 'Boolean';
                ((g[0] = A), (g[1] = z), (A || Q(g, 'default')) && l.push(h));
            }
        }
    const f = [o, l];
    return (oe(e) && s.set(e, f), f);
}
function Pr(e) {
    return e[0] !== '$' && !Qt(e);
}
const Zs = (e) => e === '_' || e === '__' || e === '_ctx' || e === '$stable',
    er = (e) => (j(e) ? e.map(qe) : [qe(e)]),
    va = (e, t, n) => {
        if (t._n) return t;
        const s = ft((...r) => er(t(...r)), n);
        return ((s._c = !1), s);
    },
    ho = (e, t, n) => {
        const s = e._ctx;
        for (const r in e) {
            if (Zs(r)) continue;
            const i = e[r];
            if (W(i)) t[r] = va(r, i, s);
            else if (i != null) {
                const o = er(i);
                t[r] = () => o;
            }
        }
    },
    mo = (e, t) => {
        const n = er(t);
        e.slots.default = () => n;
    },
    po = (e, t, n) => {
        for (const s in t) (n || !Zs(s)) && (e[s] = t[s]);
    },
    ya = (e, t, n) => {
        const s = (e.slots = ao());
        if (e.vnode.shapeFlag & 32) {
            const r = t.__;
            r && ws(s, '__', r, !0);
            const i = t._;
            i ? (po(s, t, n), n && ws(s, '_', i, !0)) : ho(t, s);
        } else t && mo(e, t);
    },
    ba = (e, t, n) => {
        const { vnode: s, slots: r } = e;
        let i = !0,
            o = te;
        if (s.shapeFlag & 32) {
            const l = t._;
            (l ? (n && l === 1 ? (i = !1) : po(r, t, n)) : ((i = !t.$stable), ho(t, r)), (o = t));
        } else t && (mo(e, t), (o = { default: 1 }));
        if (i) for (const l in r) !Zs(l) && o[l] == null && delete r[l];
    },
    Me = Ta;
function Ca(e) {
    return _a(e);
}
function _a(e, t) {
    const n = Xn();
    n.__VUE__ = !0;
    const {
            insert: s,
            remove: r,
            patchProp: i,
            createElement: o,
            createText: l,
            createComment: a,
            setText: f,
            setElementText: c,
            parentNode: h,
            nextSibling: p,
            setScopeId: g = Ue,
            insertStaticContent: R,
        } = e,
        A = (
            u,
            d,
            m,
            v = null,
            C = null,
            b = null,
            L = void 0,
            x = null,
            E = !!d.dynamicChildren,
        ) => {
            if (u === d) return;
            (u && !Jt(u, d) && ((v = y(u)), we(u, C, b, !0), (u = null)),
                d.patchFlag === -2 && ((E = !1), (d.dynamicChildren = null)));
            const { type: S, ref: N, shapeFlag: k } = d;
            switch (S) {
                case is:
                    z(u, d, m, v);
                    break;
                case vt:
                    F(u, d, m, v);
                    break;
                case Rn:
                    u == null && V(d, m, v, L);
                    break;
                case $:
                    yt(u, d, m, v, C, b, L, x, E);
                    break;
                default:
                    k & 1
                        ? ne(u, d, m, v, C, b, L, x, E)
                        : k & 6
                          ? je(u, d, m, v, C, b, L, x, E)
                          : (k & 64 || k & 128) && S.process(u, d, m, v, C, b, L, x, E, O);
            }
            N != null && C
                ? tn(N, u && u.ref, b, d || u, !d)
                : N == null && u && u.ref != null && tn(u.ref, null, b, u, !0);
        },
        z = (u, d, m, v) => {
            if (u == null) s((d.el = l(d.children)), m, v);
            else {
                const C = (d.el = u.el);
                d.children !== u.children && f(C, d.children);
            }
        },
        F = (u, d, m, v) => {
            u == null ? s((d.el = a(d.children || '')), m, v) : (d.el = u.el);
        },
        V = (u, d, m, v) => {
            [u.el, u.anchor] = R(u.children, d, m, v, u.el, u.anchor);
        },
        H = ({ el: u, anchor: d }, m, v) => {
            let C;
            for (; u && u !== d;) ((C = p(u)), s(u, m, v), (u = C));
            s(d, m, v);
        },
        T = ({ el: u, anchor: d }) => {
            let m;
            for (; u && u !== d;) ((m = p(u)), r(u), (u = m));
            r(d);
        },
        ne = (u, d, m, v, C, b, L, x, E) => {
            (d.type === 'svg' ? (L = 'svg') : d.type === 'math' && (L = 'mathml'),
                u == null ? me(d, m, v, C, b, L, x, E) : lt(u, d, C, b, L, x, E));
        },
        me = (u, d, m, v, C, b, L, x) => {
            let E, S;
            const { props: N, shapeFlag: k, transition: U, dirs: B } = u;
            if (
                ((E = u.el = o(u.type, b, N && N.is, N)),
                k & 8 ? c(E, u.children) : k & 16 && Fe(u.children, E, null, v, C, ps(u, b), L, x),
                B && bt(u, null, v, 'created'),
                ae(E, u, u.scopeId, L, v),
                N)
            ) {
                for (const re in N) re !== 'value' && !Qt(re) && i(E, re, null, N[re], b, v);
                ('value' in N && i(E, 'value', null, N.value, b),
                    (S = N.onVnodeBeforeMount) && ze(S, v, u));
            }
            B && bt(u, null, v, 'beforeMount');
            const q = Pa(C, U);
            (q && U.beforeEnter(E),
                s(E, d, m),
                ((S = N && N.onVnodeMounted) || q || B) &&
                    Me(() => {
                        (S && ze(S, v, u), q && U.enter(E), B && bt(u, null, v, 'mounted'));
                    }, C));
        },
        ae = (u, d, m, v, C) => {
            if ((m && g(u, m), v)) for (let b = 0; b < v.length; b++) g(u, v[b]);
            if (C) {
                let b = C.subTree;
                if (d === b || (_o(b.type) && (b.ssContent === d || b.ssFallback === d))) {
                    const L = C.vnode;
                    ae(u, L, L.scopeId, L.slotScopeIds, C.parent);
                }
            }
        },
        Fe = (u, d, m, v, C, b, L, x, E = 0) => {
            for (let S = E; S < u.length; S++) {
                const N = (u[S] = x ? ht(u[S]) : qe(u[S]));
                A(null, N, d, m, v, C, b, L, x);
            }
        },
        lt = (u, d, m, v, C, b, L) => {
            const x = (d.el = u.el);
            let { patchFlag: E, dynamicChildren: S, dirs: N } = d;
            E |= u.patchFlag & 16;
            const k = u.props || te,
                U = d.props || te;
            let B;
            if (
                (m && Ct(m, !1),
                (B = U.onVnodeBeforeUpdate) && ze(B, m, d, u),
                N && bt(d, u, m, 'beforeUpdate'),
                m && Ct(m, !0),
                ((k.innerHTML && U.innerHTML == null) ||
                    (k.textContent && U.textContent == null)) &&
                    c(x, ''),
                S
                    ? He(u.dynamicChildren, S, x, m, v, ps(d, C), b)
                    : L || J(u, d, x, null, m, v, ps(d, C), b, !1),
                E > 0)
            ) {
                if (E & 16) at(x, k, U, m, C);
                else if (
                    (E & 2 && k.class !== U.class && i(x, 'class', null, U.class, C),
                    E & 4 && i(x, 'style', k.style, U.style, C),
                    E & 8)
                ) {
                    const q = d.dynamicProps;
                    for (let re = 0; re < q.length; re++) {
                        const Z = q[re],
                            Se = k[Z],
                            Ee = U[Z];
                        (Ee !== Se || Z === 'value') && i(x, Z, Se, Ee, C, m);
                    }
                }
                E & 1 && u.children !== d.children && c(x, d.children);
            } else !L && S == null && at(x, k, U, m, C);
            ((B = U.onVnodeUpdated) || N) &&
                Me(() => {
                    (B && ze(B, m, d, u), N && bt(d, u, m, 'updated'));
                }, v);
        },
        He = (u, d, m, v, C, b, L) => {
            for (let x = 0; x < d.length; x++) {
                const E = u[x],
                    S = d[x],
                    N = E.el && (E.type === $ || !Jt(E, S) || E.shapeFlag & 198) ? h(E.el) : m;
                A(E, S, N, null, v, C, b, L, !0);
            }
        },
        at = (u, d, m, v, C) => {
            if (d !== m) {
                if (d !== te) for (const b in d) !Qt(b) && !(b in m) && i(u, b, d[b], null, C, v);
                for (const b in m) {
                    if (Qt(b)) continue;
                    const L = m[b],
                        x = d[b];
                    L !== x && b !== 'value' && i(u, b, x, L, C, v);
                }
                'value' in m && i(u, 'value', d.value, m.value, C);
            }
        },
        yt = (u, d, m, v, C, b, L, x, E) => {
            const S = (d.el = u ? u.el : l('')),
                N = (d.anchor = u ? u.anchor : l(''));
            let { patchFlag: k, dynamicChildren: U, slotScopeIds: B } = d;
            (B && (x = x ? x.concat(B) : B),
                u == null
                    ? (s(S, m, v), s(N, m, v), Fe(d.children || [], m, N, C, b, L, x, E))
                    : k > 0 && k & 64 && U && u.dynamicChildren
                      ? (He(u.dynamicChildren, U, m, C, b, L, x),
                        (d.key != null || (C && d === C.subTree)) && go(u, d, !0))
                      : J(u, d, m, N, C, b, L, x, E));
        },
        je = (u, d, m, v, C, b, L, x, E) => {
            ((d.slotScopeIds = x),
                u == null
                    ? d.shapeFlag & 512
                        ? C.ctx.activate(d, m, v, L, E)
                        : zt(d, m, v, C, b, L, E)
                    : xt(u, d, E));
        },
        zt = (u, d, m, v, C, b, L) => {
            const x = (u.component = Ha(u, v, C));
            if ((eo(u) && (x.ctx.renderer = O), ja(x, !1, L), x.asyncDep)) {
                if ((C && C.registerDep(x, he, L), !u.el)) {
                    const E = (x.subTree = G(vt));
                    (F(null, E, d, m), (u.placeholder = E.el));
                }
            } else he(x, u, d, m, C, b, L);
        },
        xt = (u, d, m) => {
            const v = (d.component = u.component);
            if (Ra(u, d, m))
                if (v.asyncDep && !v.asyncResolved) {
                    ee(v, d, m);
                    return;
                } else ((v.next = d), v.update());
            else ((d.el = u.el), (v.vnode = d));
        },
        he = (u, d, m, v, C, b, L) => {
            const x = () => {
                if (u.isMounted) {
                    let { next: k, bu: U, u: B, parent: q, vnode: re } = u;
                    {
                        const Ke = vo(u);
                        if (Ke) {
                            (k && ((k.el = re.el), ee(u, k, L)),
                                Ke.asyncDep.then(() => {
                                    u.isUnmounted || x();
                                }));
                            return;
                        }
                    }
                    let Z = k,
                        Se;
                    (Ct(u, !1),
                        k ? ((k.el = re.el), ee(u, k, L)) : (k = re),
                        U && In(U),
                        (Se = k.props && k.props.onVnodeBeforeUpdate) && ze(Se, q, k, re),
                        Ct(u, !0));
                    const Ee = Sr(u),
                        Be = u.subTree;
                    ((u.subTree = Ee),
                        A(Be, Ee, h(Be.el), y(Be), u, C, b),
                        (k.el = Ee.el),
                        Z === null && Aa(u, Ee.el),
                        B && Me(B, C),
                        (Se = k.props && k.props.onVnodeUpdated) && Me(() => ze(Se, q, k, re), C));
                } else {
                    let k;
                    const { el: U, props: B } = d,
                        { bm: q, m: re, parent: Z, root: Se, type: Ee } = u,
                        Be = nn(d);
                    (Ct(u, !1),
                        q && In(q),
                        !Be && (k = B && B.onVnodeBeforeMount) && ze(k, Z, d),
                        Ct(u, !0));
                    {
                        Se.ce && Se.ce._def.shadowRoot !== !1 && Se.ce._injectChildStyle(Ee);
                        const Ke = (u.subTree = Sr(u));
                        (A(null, Ke, m, v, u, C, b), (d.el = Ke.el));
                    }
                    if ((re && Me(re, C), !Be && (k = B && B.onVnodeMounted))) {
                        const Ke = d;
                        Me(() => ze(k, Z, Ke), C);
                    }
                    ((d.shapeFlag & 256 || (Z && nn(Z.vnode) && Z.vnode.shapeFlag & 256)) &&
                        u.a &&
                        Me(u.a, C),
                        (u.isMounted = !0),
                        (d = m = v = null));
                }
            };
            u.scope.on();
            const E = (u.effect = new Li(x));
            u.scope.off();
            const S = (u.update = E.run.bind(E)),
                N = (u.job = E.runIfDirty.bind(E));
            ((N.i = u), (N.id = u.uid), (E.scheduler = () => Xs(N)), Ct(u, !0), S());
        },
        ee = (u, d, m) => {
            d.component = u;
            const v = u.vnode.props;
            ((u.vnode = d),
                (u.next = null),
                pa(u, d.props, v, m),
                ba(u, d.children, m),
                rt(),
                gr(u),
                it());
        },
        J = (u, d, m, v, C, b, L, x, E = !1) => {
            const S = u && u.children,
                N = u ? u.shapeFlag : 0,
                k = d.children,
                { patchFlag: U, shapeFlag: B } = d;
            if (U > 0) {
                if (U & 128) {
                    ct(S, k, m, v, C, b, L, x, E);
                    return;
                } else if (U & 256) {
                    Ye(S, k, m, v, C, b, L, x, E);
                    return;
                }
            }
            B & 8
                ? (N & 16 && Re(S, C, b), k !== S && c(m, k))
                : N & 16
                  ? B & 16
                      ? ct(S, k, m, v, C, b, L, x, E)
                      : Re(S, C, b, !0)
                  : (N & 8 && c(m, ''), B & 16 && Fe(k, m, v, C, b, L, x, E));
        },
        Ye = (u, d, m, v, C, b, L, x, E) => {
            ((u = u || At), (d = d || At));
            const S = u.length,
                N = d.length,
                k = Math.min(S, N);
            let U;
            for (U = 0; U < k; U++) {
                const B = (d[U] = E ? ht(d[U]) : qe(d[U]));
                A(u[U], B, m, null, C, b, L, x, E);
            }
            S > N ? Re(u, C, b, !0, !1, k) : Fe(d, m, v, C, b, L, x, E, k);
        },
        ct = (u, d, m, v, C, b, L, x, E) => {
            let S = 0;
            const N = d.length;
            let k = u.length - 1,
                U = N - 1;
            for (; S <= k && S <= U;) {
                const B = u[S],
                    q = (d[S] = E ? ht(d[S]) : qe(d[S]));
                if (Jt(B, q)) A(B, q, m, null, C, b, L, x, E);
                else break;
                S++;
            }
            for (; S <= k && S <= U;) {
                const B = u[k],
                    q = (d[U] = E ? ht(d[U]) : qe(d[U]));
                if (Jt(B, q)) A(B, q, m, null, C, b, L, x, E);
                else break;
                (k--, U--);
            }
            if (S > k) {
                if (S <= U) {
                    const B = U + 1,
                        q = B < N ? d[B].el : v;
                    for (; S <= U;)
                        (A(null, (d[S] = E ? ht(d[S]) : qe(d[S])), m, q, C, b, L, x, E), S++);
                }
            } else if (S > U) for (; S <= k;) (we(u[S], C, b, !0), S++);
            else {
                const B = S,
                    q = S,
                    re = new Map();
                for (S = q; S <= U; S++) {
                    const Le = (d[S] = E ? ht(d[S]) : qe(d[S]));
                    Le.key != null && re.set(Le.key, S);
                }
                let Z,
                    Se = 0;
                const Ee = U - q + 1;
                let Be = !1,
                    Ke = 0;
                const Gt = new Array(Ee);
                for (S = 0; S < Ee; S++) Gt[S] = 0;
                for (S = B; S <= k; S++) {
                    const Le = u[S];
                    if (Se >= Ee) {
                        we(Le, C, b, !0);
                        continue;
                    }
                    let We;
                    if (Le.key != null) We = re.get(Le.key);
                    else
                        for (Z = q; Z <= U; Z++)
                            if (Gt[Z - q] === 0 && Jt(Le, d[Z])) {
                                We = Z;
                                break;
                            }
                    We === void 0
                        ? we(Le, C, b, !0)
                        : ((Gt[We - q] = S + 1),
                          We >= Ke ? (Ke = We) : (Be = !0),
                          A(Le, d[We], m, null, C, b, L, x, E),
                          Se++);
                }
                const cr = Be ? wa(Gt) : At;
                for (Z = cr.length - 1, S = Ee - 1; S >= 0; S--) {
                    const Le = q + S,
                        We = d[Le],
                        ur = d[Le + 1],
                        fr = Le + 1 < N ? ur.el || ur.placeholder : v;
                    Gt[S] === 0
                        ? A(null, We, m, fr, C, b, L, x, E)
                        : Be && (Z < 0 || S !== cr[Z] ? De(We, m, fr, 2) : Z--);
                }
            }
        },
        De = (u, d, m, v, C = null) => {
            const { el: b, type: L, transition: x, children: E, shapeFlag: S } = u;
            if (S & 6) {
                De(u.component.subTree, d, m, v);
                return;
            }
            if (S & 128) {
                u.suspense.move(d, m, v);
                return;
            }
            if (S & 64) {
                L.move(u, d, m, O);
                return;
            }
            if (L === $) {
                s(b, d, m);
                for (let k = 0; k < E.length; k++) De(E[k], d, m, v);
                s(u.anchor, d, m);
                return;
            }
            if (L === Rn) {
                H(u, d, m);
                return;
            }
            if (v !== 2 && S & 1 && x)
                if (v === 0) (x.beforeEnter(b), s(b, d, m), Me(() => x.enter(b), C));
                else {
                    const { leave: k, delayLeave: U, afterLeave: B } = x,
                        q = () => {
                            u.ctx.isUnmounted ? r(b) : s(b, d, m);
                        },
                        re = () => {
                            k(b, () => {
                                (q(), B && B());
                            });
                        };
                    U ? U(b, q, re) : re();
                }
            else s(b, d, m);
        },
        we = (u, d, m, v = !1, C = !1) => {
            const {
                type: b,
                props: L,
                ref: x,
                children: E,
                dynamicChildren: S,
                shapeFlag: N,
                patchFlag: k,
                dirs: U,
                cacheIndex: B,
            } = u;
            if (
                (k === -2 && (C = !1),
                x != null && (rt(), tn(x, null, m, u, !0), it()),
                B != null && (d.renderCache[B] = void 0),
                N & 256)
            ) {
                d.ctx.deactivate(u);
                return;
            }
            const q = N & 1 && U,
                re = !nn(u);
            let Z;
            if ((re && (Z = L && L.onVnodeBeforeUnmount) && ze(Z, d, u), N & 6))
                En(u.component, m, v);
            else {
                if (N & 128) {
                    u.suspense.unmount(m, v);
                    return;
                }
                (q && bt(u, null, d, 'beforeUnmount'),
                    N & 64
                        ? u.type.remove(u, d, m, O, v)
                        : S && !S.hasOnce && (b !== $ || (k > 0 && k & 64))
                          ? Re(S, d, m, !1, !0)
                          : ((b === $ && k & 384) || (!C && N & 16)) && Re(E, d, m),
                    v && Lt(u));
            }
            ((re && (Z = L && L.onVnodeUnmounted)) || q) &&
                Me(() => {
                    (Z && ze(Z, d, u), q && bt(u, null, d, 'unmounted'));
                }, m);
        },
        Lt = (u) => {
            const { type: d, el: m, anchor: v, transition: C } = u;
            if (d === $) {
                Mt(m, v);
                return;
            }
            if (d === Rn) {
                T(u);
                return;
            }
            const b = () => {
                (r(m), C && !C.persisted && C.afterLeave && C.afterLeave());
            };
            if (u.shapeFlag & 1 && C && !C.persisted) {
                const { leave: L, delayLeave: x } = C,
                    E = () => L(m, b);
                x ? x(u.el, b, E) : E();
            } else b();
        },
        Mt = (u, d) => {
            let m;
            for (; u !== d;) ((m = p(u)), r(u), (u = m));
            r(d);
        },
        En = (u, d, m) => {
            const {
                bum: v,
                scope: C,
                job: b,
                subTree: L,
                um: x,
                m: E,
                a: S,
                parent: N,
                slots: { __: k },
            } = u;
            (wr(E),
                wr(S),
                v && In(v),
                N &&
                    j(k) &&
                    k.forEach((U) => {
                        N.renderCache[U] = void 0;
                    }),
                C.stop(),
                b && ((b.flags |= 8), we(L, u, d, m)),
                x && Me(x, d),
                Me(() => {
                    u.isUnmounted = !0;
                }, d),
                d &&
                    d.pendingBranch &&
                    !d.isUnmounted &&
                    u.asyncDep &&
                    !u.asyncResolved &&
                    u.suspenseId === d.pendingId &&
                    (d.deps--, d.deps === 0 && d.resolve()));
        },
        Re = (u, d, m, v = !1, C = !1, b = 0) => {
            for (let L = b; L < u.length; L++) we(u[L], d, m, v, C);
        },
        y = (u) => {
            if (u.shapeFlag & 6) return y(u.component.subTree);
            if (u.shapeFlag & 128) return u.suspense.next();
            const d = p(u.anchor || u.el),
                m = d && d[Kl];
            return m ? p(m) : d;
        };
    let I = !1;
    const M = (u, d, m) => {
            (u == null
                ? d._vnode && we(d._vnode, null, null, !0)
                : A(d._vnode || null, u, d, null, null, null, m),
                (d._vnode = u),
                I || ((I = !0), gr(), Ji(), (I = !1)));
        },
        O = { p: A, um: we, m: De, r: Lt, mt: zt, mc: Fe, pc: J, pbc: He, n: y, o: e };
    return { render: M, hydrate: void 0, createApp: ha(M) };
}
function ps({ type: e, props: t }, n) {
    return (n === 'svg' && e === 'foreignObject') ||
        (n === 'mathml' && e === 'annotation-xml' && t && t.encoding && t.encoding.includes('html'))
        ? void 0
        : n;
}
function Ct({ effect: e, job: t }, n) {
    n ? ((e.flags |= 32), (t.flags |= 4)) : ((e.flags &= -33), (t.flags &= -5));
}
function Pa(e, t) {
    return (!e || (e && !e.pendingBranch)) && t && !t.persisted;
}
function go(e, t, n = !1) {
    const s = e.children,
        r = t.children;
    if (j(s) && j(r))
        for (let i = 0; i < s.length; i++) {
            const o = s[i];
            let l = r[i];
            (l.shapeFlag & 1 &&
                !l.dynamicChildren &&
                ((l.patchFlag <= 0 || l.patchFlag === 32) && ((l = r[i] = ht(r[i])), (l.el = o.el)),
                !n && l.patchFlag !== -2 && go(o, l)),
                l.type === is && (l.el = o.el),
                l.type === vt && !l.el && (l.el = o.el));
        }
}
function wa(e) {
    const t = e.slice(),
        n = [0];
    let s, r, i, o, l;
    const a = e.length;
    for (s = 0; s < a; s++) {
        const f = e[s];
        if (f !== 0) {
            if (((r = n[n.length - 1]), e[r] < f)) {
                ((t[s] = r), n.push(s));
                continue;
            }
            for (i = 0, o = n.length - 1; i < o;)
                ((l = (i + o) >> 1), e[n[l]] < f ? (i = l + 1) : (o = l));
            f < e[n[i]] && (i > 0 && (t[s] = n[i - 1]), (n[i] = s));
        }
    }
    for (i = n.length, o = n[i - 1]; i-- > 0;) ((n[i] = o), (o = t[o]));
    return n;
}
function vo(e) {
    const t = e.subTree.component;
    if (t) return t.asyncDep && !t.asyncResolved ? t : vo(t);
}
function wr(e) {
    if (e) for (let t = 0; t < e.length; t++) e[t].flags |= 8;
}
const Sa = Symbol.for('v-scx'),
    Ea = () => ce(Sa);
function rn(e, t, n) {
    return yo(e, t, n);
}
function yo(e, t, n = te) {
    const { immediate: s, deep: r, flush: i, once: o } = n,
        l = be({}, n),
        a = (t && s) || (!t && i !== 'post');
    let f;
    if (hn) {
        if (i === 'sync') {
            const g = Ea();
            f = g.__watcherHandles || (g.__watcherHandles = []);
        } else if (!a) {
            const g = () => {};
            return ((g.stop = Ue), (g.resume = Ue), (g.pause = Ue), g);
        }
    }
    const c = ve;
    l.call = (g, R, A) => Xe(g, c, R, A);
    let h = !1;
    (i === 'post'
        ? (l.scheduler = (g) => {
              Me(g, c && c.suspense);
          })
        : i !== 'sync' &&
          ((h = !0),
          (l.scheduler = (g, R) => {
              R ? g() : Xs(g);
          })),
        (l.augmentJob = (g) => {
            (t && (g.flags |= 4), h && ((g.flags |= 2), c && ((g.id = c.uid), (g.i = c))));
        }));
    const p = jl(e, t, l);
    return (hn && (f ? f.push(p) : a && p()), p);
}
function xa(e, t, n) {
    const s = this.proxy,
        r = de(e) ? (e.includes('.') ? bo(s, e) : () => s[e]) : e.bind(s, s);
    let i;
    W(t) ? (i = t) : ((i = t.handler), (n = t));
    const o = _n(this),
        l = yo(r, i.bind(s), n);
    return (o(), l);
}
function bo(e, t) {
    const n = t.split('.');
    return () => {
        let s = e;
        for (let r = 0; r < n.length && s; r++) s = s[n[r]];
        return s;
    };
}
const La = (e, t) =>
    t === 'modelValue' || t === 'model-value'
        ? e.modelModifiers
        : e[`${t}Modifiers`] || e[`${Oe(t)}Modifiers`] || e[`${Et(t)}Modifiers`];
function Ma(e, t, ...n) {
    if (e.isUnmounted) return;
    const s = e.vnode.props || te;
    let r = n;
    const i = t.startsWith('update:'),
        o = i && La(s, t.slice(7));
    o && (o.trim && (r = n.map((c) => (de(c) ? c.trim() : c))), o.number && (r = n.map(Ss)));
    let l,
        a = s[(l = cs(t))] || s[(l = cs(Oe(t)))];
    (!a && i && (a = s[(l = cs(Et(t)))]), a && Xe(a, e, 6, r));
    const f = s[l + 'Once'];
    if (f) {
        if (!e.emitted) e.emitted = {};
        else if (e.emitted[l]) return;
        ((e.emitted[l] = !0), Xe(f, e, 6, r));
    }
}
function Co(e, t, n = !1) {
    const s = t.emitsCache,
        r = s.get(e);
    if (r !== void 0) return r;
    const i = e.emits;
    let o = {},
        l = !1;
    if (!W(e)) {
        const a = (f) => {
            const c = Co(f, t, !0);
            c && ((l = !0), be(o, c));
        };
        (!n && t.mixins.length && t.mixins.forEach(a),
            e.extends && a(e.extends),
            e.mixins && e.mixins.forEach(a));
    }
    return !i && !l
        ? (oe(e) && s.set(e, null), null)
        : (j(i) ? i.forEach((a) => (o[a] = null)) : be(o, i), oe(e) && s.set(e, o), o);
}
function rs(e, t) {
    return !e || !zn(t)
        ? !1
        : ((t = t.slice(2).replace(/Once$/, '')),
          Q(e, t[0].toLowerCase() + t.slice(1)) || Q(e, Et(t)) || Q(e, t));
}
function Sr(e) {
    const {
            type: t,
            vnode: n,
            proxy: s,
            withProxy: r,
            propsOptions: [i],
            slots: o,
            attrs: l,
            emit: a,
            render: f,
            renderCache: c,
            props: h,
            data: p,
            setupState: g,
            ctx: R,
            inheritAttrs: A,
        } = e,
        z = $n(e);
    let F, V;
    try {
        if (n.shapeFlag & 4) {
            const T = r || s,
                ne = T;
            ((F = qe(f.call(ne, T, c, h, g, p, R))), (V = l));
        } else {
            const T = t;
            ((F = qe(T.length > 1 ? T(h, { attrs: l, slots: o, emit: a }) : T(h, null))),
                (V = t.props ? l : ka(l)));
        }
    } catch (T) {
        ((on.length = 0), ns(T, e, 1), (F = G(vt)));
    }
    let H = F;
    if (V && A !== !1) {
        const T = Object.keys(V),
            { shapeFlag: ne } = H;
        T.length && ne & 7 && (i && T.some(Hs) && (V = Ia(V, i)), (H = Bt(H, V, !1, !0)));
    }
    return (
        n.dirs && ((H = Bt(H, null, !1, !0)), (H.dirs = H.dirs ? H.dirs.concat(n.dirs) : n.dirs)),
        n.transition && Ys(H, n.transition),
        (F = H),
        $n(z),
        F
    );
}
const ka = (e) => {
        let t;
        for (const n in e) (n === 'class' || n === 'style' || zn(n)) && ((t || (t = {}))[n] = e[n]);
        return t;
    },
    Ia = (e, t) => {
        const n = {};
        for (const s in e) (!Hs(s) || !(s.slice(9) in t)) && (n[s] = e[s]);
        return n;
    };
function Ra(e, t, n) {
    const { props: s, children: r, component: i } = e,
        { props: o, children: l, patchFlag: a } = t,
        f = i.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (n && a >= 0) {
        if (a & 1024) return !0;
        if (a & 16) return s ? Er(s, o, f) : !!o;
        if (a & 8) {
            const c = t.dynamicProps;
            for (let h = 0; h < c.length; h++) {
                const p = c[h];
                if (o[p] !== s[p] && !rs(f, p)) return !0;
            }
        }
    } else
        return (r || l) && (!l || !l.$stable)
            ? !0
            : s === o
              ? !1
              : s
                ? o
                    ? Er(s, o, f)
                    : !0
                : !!o;
    return !1;
}
function Er(e, t, n) {
    const s = Object.keys(t);
    if (s.length !== Object.keys(e).length) return !0;
    for (let r = 0; r < s.length; r++) {
        const i = s[r];
        if (t[i] !== e[i] && !rs(n, i)) return !0;
    }
    return !1;
}
function Aa({ vnode: e, parent: t }, n) {
    for (; t;) {
        const s = t.subTree;
        if ((s.suspense && s.suspense.activeBranch === e && (s.el = e.el), s === e))
            (((e = t.vnode).el = n), (t = t.parent));
        else break;
    }
}
const _o = (e) => e.__isSuspense;
function Ta(e, t) {
    t && t.pendingBranch ? (j(e) ? t.effects.push(...e) : t.effects.push(e)) : qi(e);
}
const $ = Symbol.for('v-fgt'),
    is = Symbol.for('v-txt'),
    vt = Symbol.for('v-cmt'),
    Rn = Symbol.for('v-stc'),
    on = [];
let Ie = null;
function P(e = !1) {
    on.push((Ie = e ? null : []));
}
function Oa() {
    (on.pop(), (Ie = on[on.length - 1] || null));
}
let dn = 1;
function xr(e, t = !1) {
    ((dn += e), e < 0 && Ie && t && (Ie.hasOnce = !0));
}
function Po(e) {
    return ((e.dynamicChildren = dn > 0 ? Ie || At : null), Oa(), dn > 0 && Ie && Ie.push(e), e);
}
function w(e, t, n, s, r, i) {
    return Po(_(e, t, n, s, r, i, !0));
}
function tr(e, t, n, s, r) {
    return Po(G(e, t, n, s, r, !0));
}
function Hn(e) {
    return e ? e.__v_isVNode === !0 : !1;
}
function Jt(e, t) {
    return e.type === t.type && e.key === t.key;
}
const wo = ({ key: e }) => e ?? null,
    An = ({ ref: e, ref_key: t, ref_for: n }) => (
        typeof e == 'number' && (e = '' + e),
        e != null ? (de(e) || ye(e) || W(e) ? { i: ke, r: e, k: t, f: !!n } : e) : null
    );
function _(e, t = null, n = null, s = 0, r = null, i = e === $ ? 0 : 1, o = !1, l = !1) {
    const a = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && wo(t),
        ref: t && An(t),
        scopeId: Yi,
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
        ctx: ke,
    };
    return (
        l ? (nr(a, n), i & 128 && e.normalize(a)) : n && (a.shapeFlag |= de(n) ? 8 : 16),
        dn > 0 && !o && Ie && (a.patchFlag > 0 || i & 6) && a.patchFlag !== 32 && Ie.push(a),
        a
    );
}
const G = Va;
function Va(e, t = null, n = null, s = 0, r = null, i = !1) {
    if (((!e || e === ra) && (e = vt), Hn(e))) {
        const l = Bt(e, t, !0);
        return (
            n && nr(l, n),
            dn > 0 && !i && Ie && (l.shapeFlag & 6 ? (Ie[Ie.indexOf(e)] = l) : Ie.push(l)),
            (l.patchFlag = -2),
            l
        );
    }
    if ((za(e) && (e = e.__vccOpts), t)) {
        t = Ua(t);
        let { class: l, style: a } = t;
        (l && !de(l) && (t.class = Qn(l)),
            oe(a) && (Js(a) && !j(a) && (a = be({}, a)), (t.style = Yn(a))));
    }
    const o = de(e) ? 1 : _o(e) ? 128 : Wl(e) ? 64 : oe(e) ? 4 : W(e) ? 2 : 0;
    return _(e, t, n, s, r, o, i, !0);
}
function Ua(e) {
    return e ? (Js(e) || co(e) ? be({}, e) : e) : null;
}
function Bt(e, t, n = !1, s = !1) {
    const { props: r, ref: i, patchFlag: o, children: l, transition: a } = e,
        f = t ? Na(r || {}, t) : r,
        c = {
            __v_isVNode: !0,
            __v_skip: !0,
            type: e.type,
            props: f,
            key: f && wo(f),
            ref: t && t.ref ? (n && i ? (j(i) ? i.concat(An(t)) : [i, An(t)]) : An(t)) : i,
            scopeId: e.scopeId,
            slotScopeIds: e.slotScopeIds,
            children: l,
            target: e.target,
            targetStart: e.targetStart,
            targetAnchor: e.targetAnchor,
            staticCount: e.staticCount,
            shapeFlag: e.shapeFlag,
            patchFlag: t && e.type !== $ ? (o === -1 ? 16 : o | 16) : o,
            dynamicProps: e.dynamicProps,
            dynamicChildren: e.dynamicChildren,
            appContext: e.appContext,
            dirs: e.dirs,
            transition: a,
            component: e.component,
            suspense: e.suspense,
            ssContent: e.ssContent && Bt(e.ssContent),
            ssFallback: e.ssFallback && Bt(e.ssFallback),
            placeholder: e.placeholder,
            el: e.el,
            anchor: e.anchor,
            ctx: e.ctx,
            ce: e.ce,
        };
    return (a && s && Ys(c, a.clone(c)), c);
}
function le(e = ' ', t = 0) {
    return G(is, null, e, t);
}
function D(e = '', t = !1) {
    return t ? (P(), tr(vt, null, e)) : G(vt, null, e);
}
function qe(e) {
    return e == null || typeof e == 'boolean'
        ? G(vt)
        : j(e)
          ? G($, null, e.slice())
          : Hn(e)
            ? ht(e)
            : G(is, null, String(e));
}
function ht(e) {
    return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Bt(e);
}
function nr(e, t) {
    let n = 0;
    const { shapeFlag: s } = e;
    if (t == null) t = null;
    else if (j(t)) n = 16;
    else if (typeof t == 'object')
        if (s & 65) {
            const r = t.default;
            r && (r._c && (r._d = !1), nr(e, r()), r._c && (r._d = !0));
            return;
        } else {
            n = 32;
            const r = t._;
            !r && !co(t)
                ? (t._ctx = ke)
                : r === 3 &&
                  ke &&
                  (ke.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
        }
    else
        W(t)
            ? ((t = { default: t, _ctx: ke }), (n = 32))
            : ((t = String(t)), s & 64 ? ((n = 16), (t = [le(t)])) : (n = 8));
    ((e.children = t), (e.shapeFlag |= n));
}
function Na(...e) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
        const s = e[n];
        for (const r in s)
            if (r === 'class') t.class !== s.class && (t.class = Qn([t.class, s.class]));
            else if (r === 'style') t.style = Yn([t.style, s.style]);
            else if (zn(r)) {
                const i = t[r],
                    o = s[r];
                o && i !== o && !(j(i) && i.includes(o)) && (t[r] = i ? [].concat(i, o) : o);
            } else r !== '' && (t[r] = s[r]);
    }
    return t;
}
function ze(e, t, n, s = null) {
    Xe(e, t, 7, [n, s]);
}
const $a = oo();
let Fa = 0;
function Ha(e, t, n) {
    const s = e.type,
        r = (t ? t.appContext : e.appContext) || $a,
        i = {
            uid: Fa++,
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
            scope: new ml(!0),
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
            propsOptions: fo(s, r),
            emitsOptions: Co(s, r),
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
        (i.emit = Ma.bind(null, i)),
        e.ce && e.ce(i),
        i
    );
}
let ve = null;
const sr = () => ve || ke;
let jn, Ts;
{
    const e = Xn(),
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
    ((jn = t('__VUE_INSTANCE_SETTERS__', (n) => (ve = n))),
        (Ts = t('__VUE_SSR_SETTERS__', (n) => (hn = n))));
}
const _n = (e) => {
        const t = ve;
        return (
            jn(e),
            e.scope.on(),
            () => {
                (e.scope.off(), jn(t));
            }
        );
    },
    Lr = () => {
        (ve && ve.scope.off(), jn(null));
    };
function So(e) {
    return e.vnode.shapeFlag & 4;
}
let hn = !1;
function ja(e, t = !1, n = !1) {
    t && Ts(t);
    const { props: s, children: r } = e.vnode,
        i = So(e);
    (ma(e, s, i, t), ya(e, r, n || t));
    const o = i ? Da(e, t) : void 0;
    return (t && Ts(!1), o);
}
function Da(e, t) {
    const n = e.type;
    ((e.accessCache = Object.create(null)), (e.proxy = new Proxy(e.ctx, oa)));
    const { setup: s } = n;
    if (s) {
        rt();
        const r = (e.setupContext = s.length > 1 ? Ka(e) : null),
            i = _n(e),
            o = Cn(s, e, 0, [e.props, r]),
            l = Ci(o);
        if ((it(), i(), (l || e.sp) && !nn(e) && Zi(e), l)) {
            if ((o.then(Lr, Lr), t))
                return o
                    .then((a) => {
                        Mr(e, a);
                    })
                    .catch((a) => {
                        ns(a, e, 0);
                    });
            e.asyncDep = o;
        } else Mr(e, o);
    } else Eo(e);
}
function Mr(e, t, n) {
    (W(t)
        ? e.type.__ssrInlineRender
            ? (e.ssrRender = t)
            : (e.render = t)
        : oe(t) && (e.setupState = Ki(t)),
        Eo(e));
}
function Eo(e, t, n) {
    const s = e.type;
    e.render || (e.render = s.render || Ue);
    {
        const r = _n(e);
        rt();
        try {
            la(e);
        } finally {
            (it(), r());
        }
    }
}
const Ba = {
    get(e, t) {
        return (ge(e, 'get', ''), e[t]);
    },
};
function Ka(e) {
    const t = (n) => {
        e.exposed = n || {};
    };
    return { attrs: new Proxy(e.attrs, Ba), slots: e.slots, emit: e.emit, expose: t };
}
function os(e) {
    return e.exposed
        ? e.exposeProxy ||
              (e.exposeProxy = new Proxy(Ki(Ol(e.exposed)), {
                  get(t, n) {
                      if (n in t) return t[n];
                      if (n in sn) return sn[n](e);
                  },
                  has(t, n) {
                      return n in t || n in sn;
                  },
              }))
        : e.proxy;
}
function Wa(e, t = !0) {
    return W(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function za(e) {
    return W(e) && '__vccOpts' in e;
}
const Ve = (e, t) => Fl(e, t, hn);
function xo(e, t, n) {
    const s = arguments.length;
    return s === 2
        ? oe(t) && !j(t)
            ? Hn(t)
                ? G(e, null, [t])
                : G(e, t)
            : G(e, null, t)
        : (s > 3 ? (n = Array.prototype.slice.call(arguments, 2)) : s === 3 && Hn(n) && (n = [n]),
          G(e, t, n));
}
const Ga = '3.5.18';
/**
 * @vue/runtime-dom v3.5.18
 * (c) 2018-present Yuxi (Evan) You and Vue contributors
 * @license MIT
 **/ let Os;
const kr = typeof window < 'u' && window.trustedTypes;
if (kr)
    try {
        Os = kr.createPolicy('vue', { createHTML: (e) => e });
    } catch {}
const Lo = Os ? (e) => Os.createHTML(e) : (e) => e,
    qa = 'http://www.w3.org/2000/svg',
    Ja = 'http://www.w3.org/1998/Math/MathML',
    et = typeof document < 'u' ? document : null,
    Ir = et && et.createElement('template'),
    Xa = {
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
                    ? et.createElementNS(qa, e)
                    : t === 'mathml'
                      ? et.createElementNS(Ja, e)
                      : n
                        ? et.createElement(e, { is: n })
                        : et.createElement(e);
            return (
                e === 'select' && s && s.multiple != null && r.setAttribute('multiple', s.multiple),
                r
            );
        },
        createText: (e) => et.createTextNode(e),
        createComment: (e) => et.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t;
        },
        setElementText: (e, t) => {
            e.textContent = t;
        },
        parentNode: (e) => e.parentNode,
        nextSibling: (e) => e.nextSibling,
        querySelector: (e) => et.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, '');
        },
        insertStaticContent(e, t, n, s, r, i) {
            const o = n ? n.previousSibling : t.lastChild;
            if (r && (r === i || r.nextSibling))
                for (; t.insertBefore(r.cloneNode(!0), n), !(r === i || !(r = r.nextSibling)););
            else {
                Ir.innerHTML = Lo(
                    s === 'svg' ? `<svg>${e}</svg>` : s === 'mathml' ? `<math>${e}</math>` : e,
                );
                const l = Ir.content;
                if (s === 'svg' || s === 'mathml') {
                    const a = l.firstChild;
                    for (; a.firstChild;) l.appendChild(a.firstChild);
                    l.removeChild(a);
                }
                t.insertBefore(l, n);
            }
            return [o ? o.nextSibling : t.firstChild, n ? n.previousSibling : t.lastChild];
        },
    },
    Ya = Symbol('_vtc');
function Qa(e, t, n) {
    const s = e[Ya];
    (s && (t = (t ? [t, ...s] : [...s]).join(' ')),
        t == null
            ? e.removeAttribute('class')
            : n
              ? e.setAttribute('class', t)
              : (e.className = t));
}
const Rr = Symbol('_vod'),
    Za = Symbol('_vsh'),
    Mo = Symbol('');
function ko(e) {
    const t = sr();
    if (!t) return;
    const n = (t.ut = (r = e(t.proxy)) => {
            Array.from(document.querySelectorAll(`[data-v-owner="${t.uid}"]`)).forEach((i) =>
                Dn(i, r),
            );
        }),
        s = () => {
            const r = e(t.proxy);
            (t.ce ? Dn(t.ce, r) : Vs(t.subTree, r), n(r));
        };
    (so(() => {
        qi(s);
    }),
        no(() => {
            rn(s, Ue, { flush: 'post' });
            const r = new MutationObserver(s);
            (r.observe(t.subTree.el.parentNode, { childList: !0 }), Qs(() => r.disconnect()));
        }));
}
function Vs(e, t) {
    if (e.shapeFlag & 128) {
        const n = e.suspense;
        ((e = n.activeBranch),
            n.pendingBranch &&
                !n.isHydrating &&
                n.effects.push(() => {
                    Vs(n.activeBranch, t);
                }));
    }
    for (; e.component;) e = e.component.subTree;
    if (e.shapeFlag & 1 && e.el) Dn(e.el, t);
    else if (e.type === $) e.children.forEach((n) => Vs(n, t));
    else if (e.type === Rn) {
        let { el: n, anchor: s } = e;
        for (; n && (Dn(n, t), n !== s);) n = n.nextSibling;
    }
}
function Dn(e, t) {
    if (e.nodeType === 1) {
        const n = e.style;
        let s = '';
        for (const r in t) {
            const i = hl(t[r]);
            (n.setProperty(`--${r}`, i), (s += `--${r}: ${i};`));
        }
        n[Mo] = s;
    }
}
const ec = /(^|;)\s*display\s*:/;
function tc(e, t, n) {
    const s = e.style,
        r = de(n);
    let i = !1;
    if (n && !r) {
        if (t)
            if (de(t))
                for (const o of t.split(';')) {
                    const l = o.slice(0, o.indexOf(':')).trim();
                    n[l] == null && Tn(s, l, '');
                }
            else for (const o in t) n[o] == null && Tn(s, o, '');
        for (const o in n) (o === 'display' && (i = !0), Tn(s, o, n[o]));
    } else if (r) {
        if (t !== n) {
            const o = s[Mo];
            (o && (n += ';' + o), (s.cssText = n), (i = ec.test(n)));
        }
    } else t && e.removeAttribute('style');
    Rr in e && ((e[Rr] = i ? s.display : ''), e[Za] && (s.display = 'none'));
}
const Ar = /\s*!important$/;
function Tn(e, t, n) {
    if (j(n)) n.forEach((s) => Tn(e, t, s));
    else if ((n == null && (n = ''), t.startsWith('--'))) e.setProperty(t, n);
    else {
        const s = nc(e, t);
        Ar.test(n) ? e.setProperty(Et(s), n.replace(Ar, ''), 'important') : (e[s] = n);
    }
}
const Tr = ['Webkit', 'Moz', 'ms'],
    gs = {};
function nc(e, t) {
    const n = gs[t];
    if (n) return n;
    let s = Oe(t);
    if (s !== 'filter' && s in e) return (gs[t] = s);
    s = Jn(s);
    for (let r = 0; r < Tr.length; r++) {
        const i = Tr[r] + s;
        if (i in e) return (gs[t] = i);
    }
    return t;
}
const Or = 'http://www.w3.org/1999/xlink';
function Vr(e, t, n, s, r, i = fl(t)) {
    s && t.startsWith('xlink:')
        ? n == null
            ? e.removeAttributeNS(Or, t.slice(6, t.length))
            : e.setAttributeNS(Or, t, n)
        : n == null || (i && !wi(n))
          ? e.removeAttribute(t)
          : e.setAttribute(t, i ? '' : Je(n) ? String(n) : n);
}
function Ur(e, t, n, s, r) {
    if (t === 'innerHTML' || t === 'textContent') {
        n != null && (e[t] = t === 'innerHTML' ? Lo(n) : n);
        return;
    }
    const i = e.tagName;
    if (t === 'value' && i !== 'PROGRESS' && !i.includes('-')) {
        const l = i === 'OPTION' ? e.getAttribute('value') || '' : e.value,
            a = n == null ? (e.type === 'checkbox' ? 'on' : '') : String(n);
        ((l !== a || !('_value' in e)) && (e.value = a),
            n == null && e.removeAttribute(t),
            (e._value = n));
        return;
    }
    let o = !1;
    if (n === '' || n == null) {
        const l = typeof e[t];
        l === 'boolean'
            ? (n = wi(n))
            : n == null && l === 'string'
              ? ((n = ''), (o = !0))
              : l === 'number' && ((n = 0), (o = !0));
    }
    try {
        e[t] = n;
    } catch {}
    o && e.removeAttribute(r || t);
}
function Pt(e, t, n, s) {
    e.addEventListener(t, n, s);
}
function sc(e, t, n, s) {
    e.removeEventListener(t, n, s);
}
const Nr = Symbol('_vei');
function rc(e, t, n, s, r = null) {
    const i = e[Nr] || (e[Nr] = {}),
        o = i[t];
    if (s && o) o.value = s;
    else {
        const [l, a] = ic(t);
        if (s) {
            const f = (i[t] = ac(s, r));
            Pt(e, l, f, a);
        } else o && (sc(e, l, o, a), (i[t] = void 0));
    }
}
const $r = /(?:Once|Passive|Capture)$/;
function ic(e) {
    let t;
    if ($r.test(e)) {
        t = {};
        let s;
        for (; (s = e.match($r));)
            ((e = e.slice(0, e.length - s[0].length)), (t[s[0].toLowerCase()] = !0));
    }
    return [e[2] === ':' ? e.slice(3) : Et(e.slice(2)), t];
}
let vs = 0;
const oc = Promise.resolve(),
    lc = () => vs || (oc.then(() => (vs = 0)), (vs = Date.now()));
function ac(e, t) {
    const n = (s) => {
        if (!s._vts) s._vts = Date.now();
        else if (s._vts <= n.attached) return;
        Xe(cc(s, n.value), t, 5, [s]);
    };
    return ((n.value = e), (n.attached = lc()), n);
}
function cc(e, t) {
    if (j(t)) {
        const n = e.stopImmediatePropagation;
        return (
            (e.stopImmediatePropagation = () => {
                (n.call(e), (e._stopped = !0));
            }),
            t.map((s) => (r) => !r._stopped && s && s(r))
        );
    } else return t;
}
const Fr = (e) =>
        e.charCodeAt(0) === 111 &&
        e.charCodeAt(1) === 110 &&
        e.charCodeAt(2) > 96 &&
        e.charCodeAt(2) < 123,
    uc = (e, t, n, s, r, i) => {
        const o = r === 'svg';
        t === 'class'
            ? Qa(e, s, o)
            : t === 'style'
              ? tc(e, n, s)
              : zn(t)
                ? Hs(t) || rc(e, t, n, s, i)
                : (
                        t[0] === '.'
                            ? ((t = t.slice(1)), !0)
                            : t[0] === '^'
                              ? ((t = t.slice(1)), !1)
                              : fc(e, t, s, o)
                    )
                  ? (Ur(e, t, s),
                    !e.tagName.includes('-') &&
                        (t === 'value' || t === 'checked' || t === 'selected') &&
                        Vr(e, t, s, o, i, t !== 'value'))
                  : e._isVueCE && (/[A-Z]/.test(t) || !de(s))
                    ? Ur(e, Oe(t), s, i, t)
                    : (t === 'true-value'
                          ? (e._trueValue = s)
                          : t === 'false-value' && (e._falseValue = s),
                      Vr(e, t, s, o));
    };
function fc(e, t, n, s) {
    if (s) return !!(t === 'innerHTML' || t === 'textContent' || (t in e && Fr(t) && W(n)));
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
    return Fr(t) && de(n) ? !1 : t in e;
}
const Bn = (e) => {
    const t = e.props['onUpdate:modelValue'] || !1;
    return j(t) ? (n) => In(t, n) : t;
};
function dc(e) {
    e.target.composing = !0;
}
function Hr(e) {
    const t = e.target;
    t.composing && ((t.composing = !1), t.dispatchEvent(new Event('input')));
}
const Ft = Symbol('_assign'),
    mn = {
        created(e, { modifiers: { lazy: t, trim: n, number: s } }, r) {
            e[Ft] = Bn(r);
            const i = s || (r.props && r.props.type === 'number');
            (Pt(e, t ? 'change' : 'input', (o) => {
                if (o.target.composing) return;
                let l = e.value;
                (n && (l = l.trim()), i && (l = Ss(l)), e[Ft](l));
            }),
                n &&
                    Pt(e, 'change', () => {
                        e.value = e.value.trim();
                    }),
                t ||
                    (Pt(e, 'compositionstart', dc),
                    Pt(e, 'compositionend', Hr),
                    Pt(e, 'change', Hr)));
        },
        mounted(e, { value: t }) {
            e.value = t ?? '';
        },
        beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: s, trim: r, number: i } }, o) {
            if (((e[Ft] = Bn(o)), e.composing)) return;
            const l = (i || e.type === 'number') && !/^0\d/.test(e.value) ? Ss(e.value) : e.value,
                a = t ?? '';
            l !== a &&
                ((document.activeElement === e &&
                    e.type !== 'range' &&
                    ((s && t === n) || (r && e.value.trim() === a))) ||
                    (e.value = a));
        },
    },
    hc = {
        deep: !0,
        created(e, t, n) {
            ((e[Ft] = Bn(n)),
                Pt(e, 'change', () => {
                    const s = e._modelValue,
                        r = mc(e),
                        i = e.checked,
                        o = e[Ft];
                    if (j(s)) {
                        const l = Si(s, r),
                            a = l !== -1;
                        if (i && !a) o(s.concat(r));
                        else if (!i && a) {
                            const f = [...s];
                            (f.splice(l, 1), o(f));
                        }
                    } else if (Gn(s)) {
                        const l = new Set(s);
                        (i ? l.add(r) : l.delete(r), o(l));
                    } else o(Io(e, i));
                }));
        },
        mounted: jr,
        beforeUpdate(e, t, n) {
            ((e[Ft] = Bn(n)), jr(e, t, n));
        },
    };
function jr(e, { value: t, oldValue: n }, s) {
    e._modelValue = t;
    let r;
    if (j(t)) r = Si(t, s.props.value) > -1;
    else if (Gn(t)) r = t.has(s.props.value);
    else {
        if (t === n) return;
        r = Zn(t, Io(e, !0));
    }
    e.checked !== r && (e.checked = r);
}
function mc(e) {
    return '_value' in e ? e._value : e.value;
}
function Io(e, t) {
    const n = t ? '_trueValue' : '_falseValue';
    return n in e ? e[n] : t;
}
const pc = ['ctrl', 'shift', 'alt', 'meta'],
    gc = {
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
        exact: (e, t) => pc.some((n) => e[`${n}Key`] && !t.includes(n)),
    },
    Dr = (e, t) => {
        const n = e._withMods || (e._withMods = {}),
            s = t.join('.');
        return (
            n[s] ||
            (n[s] = (r, ...i) => {
                for (let o = 0; o < t.length; o++) {
                    const l = gc[t[o]];
                    if (l && l(r, t)) return;
                }
                return e(r, ...i);
            })
        );
    },
    vc = be({ patchProp: uc }, Xa);
let Br;
function yc() {
    return Br || (Br = Ca(vc));
}
const bc = (...e) => {
    const t = yc().createApp(...e),
        { mount: n } = t;
    return (
        (t.mount = (s) => {
            const r = _c(s);
            if (!r) return;
            const i = t._component;
            (!W(i) && !i.render && !i.template && (i.template = r.innerHTML),
                r.nodeType === 1 && (r.textContent = ''));
            const o = n(r, !1, Cc(r));
            return (
                r instanceof Element &&
                    (r.removeAttribute('v-cloak'), r.setAttribute('data-v-app', '')),
                o
            );
        }),
        t
    );
};
function Cc(e) {
    if (e instanceof SVGElement) return 'svg';
    if (typeof MathMLElement == 'function' && e instanceof MathMLElement) return 'mathml';
}
function _c(e) {
    return de(e) ? document.querySelector(e) : e;
}
const Ro = 1735732800;
class Ao extends Error {
    constructor(...t) {
        super(...t);
    }
}
class Ht {
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
        const n = new Ht();
        if (
            ((n.width = t.decodeUint16()),
            (n.height = t.decodeUint16()),
            (n.refreshRate = t.decodeUint16()),
            (n.options = t.decodeUint64()),
            n.width === 0 || n.height === 0 || n.refreshRate === 0)
        )
            throw new Ao('Invalid VideoMode');
        return n;
    }
    static fromPlain(t) {
        return t == null ? t : Object.assign(new Ht(), t);
    }
}
const Kn = Object.freeze({
    S16LE: 1,
    decode(e) {
        const t = e.decodeCompactUint();
        switch (t) {
            case 1:
                return Kn.S16LE;
            default:
                throw new Error(`Invalid AudioSampleFormat: ${t}`);
        }
    },
});
class jt {
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
        const n = new jt();
        if (
            ((n.sampleRate = t.decodeUint32()),
            (n.channels = t.decodeUint8()),
            (n.sampleFormat = Kn.decode(t)),
            n.sampleRate === 0 || n.channels === 0)
        )
            throw new Ao('Invalid AudioMode');
        return n;
    }
    static fromPlain(t) {
        return t == null ? t : Object.assign(new jt(), t);
    }
    sampleLen() {
        switch (this.sampleFormat) {
            case Kn.S16LE:
                return 2;
            default:
                return 0;
        }
    }
    frameLen() {
        return this.sampleLen() * this.channels;
    }
    bytesPerSecond() {
        return this.sampleRate * this.channels * this.sampleLen();
    }
}
const Pc = '' + new URL('../CixsTs8S/audio-pipe.js', import.meta.url).href,
    wc = '' + new URL('../CLkC4qFN/audio-capture-pipe.js', import.meta.url).href,
    Sc = '' + new URL('../BlGiU7JV/code.wasm', import.meta.url).href;
async function Ec() {
    return await WebAssembly.compileStreaming(fetch(Sc));
}
async function xc() {
    const e = new AudioContext();
    return (await e.suspend(), await e.audioWorklet.addModule(Pc), e);
}
async function Lc() {
    const e = new AudioContext();
    return (await e.suspend(), await e.audioWorklet.addModule(wc), e);
}
class rr {
    #e;
    #t;
    #n;
    constructor(t, n, s) {
        ((this.#e = t), (this.#t = n), (this.#n = s));
    }
    static async createInteractively() {
        'audioSession' in navigator &&
            ((window.navigator.audioSession.type = 'play-and-record'),
            console.debug(`Set audio session type to "${window.navigator.audioSession.type}"`));
        const [t, n, s] = await Promise.all([Ec(), xc(), Lc()]);
        return new rr(t, n, s);
    }
    async close() {
        (this.#t !== null &&
            (this.#t.state !== 'closed' && (await this.#t.close()), (this.#t = null)),
            this.#n !== null &&
                (this.#n.state !== 'closed' && (await this.#n.close()), (this.#n = null)));
    }
    async resumePlayback() {
        this.#t !== null && (await this.#t.resume());
    }
    async suspendPlayback() {
        this.#t !== null && (await this.#t.suspend());
    }
    async resumeCapture() {
        this.#n !== null && (await this.#n.resume());
    }
    async suspendCapture() {
        this.#n !== null && (await this.#n.suspend());
    }
    get lanczos() {
        return this.#e;
    }
    get playback() {
        return this.#t;
    }
    get capture() {
        return this.#n;
    }
}
let Mc = class {
    #e;
    #t = null;
    #n = null;
    #r = null;
    #s = 1;
    #i = null;
    #l = 1;
    #o = null;
    constructor(t) {
        this.#e = t;
    }
    reset() {
        this.#a();
    }
    close() {
        this.#a();
    }
    #a() {
        (this.suspendPlayback(), this.suspendCapture());
    }
    resumePlayback() {
        if (this.#t !== null || this.#e.playback.state === 'closed') return;
        const t = this.#e.playback,
            n = this.#e.lanczos;
        ((this.#n = new AudioWorkletNode(t, 'audio-pipe', {
            numberOfInputs: 0,
            numberOfOutputs: 1,
            outputChannelCount: [t.destination.channelCount],
            processorOptions: { lanczos: n },
        })),
            this.#o !== null && this.#n.addEventListener('processorerror', this.#o),
            this.#n.port.postMessage({ type: 'init' }),
            (this.#t = new GainNode(t)),
            this.#n.connect(this.#t),
            this.#t.connect(t.destination),
            this.#t.gain.setValueAtTime(this.#s, t.currentTime),
            (this.#r = this.#n.port),
            (this.#n.parameters.get('outputLatency').value =
                t.baseLatency + (t.outputLatency || 0)));
    }
    suspendPlayback() {
        (this.#t !== null && (this.#t.disconnect(), (this.#t = null)),
            this.#n !== null && (this.#n.disconnect(), (this.#n = null)),
            (this.#r = null));
    }
    #c() {
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
        (this.#c(),
            this.#i.port.postMessage(
                {
                    type: 'start',
                    mode: n,
                    sourceSampleRate: this.#e.capture.sampleRate,
                    gain: this.#l,
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
        if ((t > 1 && (t = 1), t < 0 && (t = 0), this.#t === null)) {
            this.#s = t;
            return;
        }
        this.#t.gain.setValueAtTime(t, this.#e.playback.currentTime);
    }
    get playbackVolume() {
        return this.#t === null ? 0 : this.#t.gain.value;
    }
    get playbackSampleRate() {
        return this.#e.playback.sampleRate;
    }
    set captureVolume(t) {
        (t > 1 && (t = 1),
            t < 0 && (t = 0),
            (this.#l = t),
            this.#i !== null && this.#i.port.postMessage({ type: 'gain', gain: t }));
    }
    get captureVolume() {
        return this.#i === null ? 0 : this.#l;
    }
    takePlaybackPipePort() {
        const t = this.#r;
        return ((this.#r = null), t);
    }
    isPlaybackEnabled() {
        return this.#t !== null && this.#e.playback.state === 'running';
    }
    set onerror(t) {
        const n = (r) => {
                r !== null && r.removeEventListener('processorerror', this.#o);
            },
            s = (r) => {
                r !== null && r.addEventListener('processorerror', this.#o);
            };
        (this.#o !== null && (n(this.#n), n(this.#i)),
            (this.#o = t),
            this.#o !== null && (s(this.#n), s(this.#i)));
    }
};
const ys = 640,
    bs = 400;
class kc {
    #e;
    #t = null;
    #n = null;
    constructor(t) {
        this.#e = t;
    }
    reset() {
        this.close();
    }
    close() {
        if (this.#n !== null) {
            const t = document.getElementById(this.#e);
            (t !== null && t.removeEventListener('resize', this.#n), (this.#n = null));
        }
        this.#t !== null && (this.#t.close(), (this.#t = null));
    }
    pushVideo(t) {
        (this.#t !== null && this.#t.close(), (this.#t = t.image));
        let n = this.#t.codedWidth,
            s = this.#t.codedHeight;
        return (
            n < ys && ((s = Math.round((s / n) * ys)), (n = ys)),
            s < bs && ((n = Math.round((n / s) * bs)), (s = bs)),
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
            ((t.width = Math.max(0, n.width)), (t.height = Math.max(0, n.height)), this.#t === null)
        )
            return;
        this.#n === null &&
            ((this.#n = (f) => {
                this.#s();
            }),
            t.addEventListener('resize', this.#n));
        const s = Math.min(t.width / this.#t.codedWidth, t.height / this.#t.codedHeight),
            r = this.#t.codedWidth * s,
            i = this.#t.codedHeight * s,
            o = (t.width - r) / 2,
            l = (t.height - i) / 2,
            a = t.getContext('2d');
        (a.clearRect(0, 0, t.width, t.height),
            a.drawImage(this.#t, 0, 0, this.#t.codedWidth, this.#t.codedHeight, o, l, r, i));
    }
}
class Ic {
    #e = new Map();
    #t;
    #n;
    constructor(t, n) {
        ((this.#t = t || 50), (this.#n = n));
    }
    addEvent(t, n) {
        (delete n.serviceId, delete n.vmId, (n.startTime /= 1e3), (n.endTime /= 1e3));
        const s = Rc(n.startTime, this.#n),
            r = Kr(s, this.#n);
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
            n = t[t.length - 1] - this.#t;
        for (const s of t) {
            if (s >= n) break;
            this.#e.delete(s);
        }
    }
    toJSON() {
        const t = [];
        for (const [n, s] of this.#e.entries()) {
            const r = Kr(n, this.#n);
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
        return this.#t;
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
function Kr(e, t) {
    return Ro + Math.floor(e) * t;
}
function Rc(e, t) {
    return Math.floor((e - Ro) / t);
}
class ls {
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
const Ac = 64 * 1024;
class Tc {
    #e = [];
    #t = 0;
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
        (this.#e.splice(n, 0, t), (this.#t += t.text.length), this.#n());
    }
    #n() {
        for (; this.#t > Ac && this.#e.length !== 0;)
            ((this.#t -= this.#e[0].text.length), this.#e.shift());
    }
}
const kn = { name: 'Ed25519' };
class pn {
    #e;
    constructor(t) {
        this.#e = t;
    }
    static async generate() {
        const t = await crypto.subtle.generateKey(kn, !0, ['sign', 'verify']);
        return new pn(t);
    }
    static async fromJSON(t) {
        const n = await crypto.subtle.importKey('jwk', t.privateKey, kn, !0, ['sign']),
            s = await crypto.subtle.importKey('jwk', t.publicKey, kn, !0, ['verify']);
        return new pn({ privateKey: n, publicKey: s });
    }
    async toJSON() {
        return {
            privateKey: await crypto.subtle.exportKey('jwk', this.#e.privateKey),
            publicKey: await crypto.subtle.exportKey('jwk', this.#e.publicKey),
        };
    }
    async sign(t) {
        return new Uint8Array(await crypto.subtle.sign(kn, this.#e.privateKey, t));
    }
    async getRawPublicKey() {
        const t = await crypto.subtle.exportKey('raw', this.#e.publicKey);
        return new Uint8Array(t);
    }
}
function wt(e, t) {
    return BigInt(e) + BigInt(t) * 2n ** 32n;
}
function Oc(e) {
    return Number(e % 2n ** 32n);
}
function Vc(e) {
    return Math.floor(Number(e / 2n ** 32n));
}
class Uc {
    #e = new Map();
    #t;
    #n;
    constructor(t) {
        ((this.#t = t?.create), (this.#n = t?.destroy));
    }
    set(t, n, s) {
        const r = wt(t, n);
        this.#e.set(r, s);
    }
    get(t, n) {
        const s = wt(t, n);
        return this.#e.get(s);
    }
    ensurePresent(t, n, s) {
        const r = wt(t, n);
        let i = this.#e.get(r);
        return (i === void 0 && ((i = (s || this.#t)(t, n)), this.#e.set(r, i)), i);
    }
    ensureAbsent(t, n) {
        const s = wt(t, n),
            r = this.#e.get(s);
        return r !== void 0 ? (this.#n(r), this.#e.delete(s), !0) : !1;
    }
    ensureIntersectionPresent(t, n) {
        const s = n?.create || this.#t,
            r = n?.destroy || this.#n,
            i = n?.added,
            o = n?.removed,
            l = new Set();
        for (const [a, f] of t) {
            const c = wt(a, f);
            (l.add(c), this.#e.get(c) === void 0 && (this.#e.set(c, s(a, f)), i && i(a, f)));
        }
        for (const [a, f] of this.#e.entries())
            if (!l.has(a) && (r(f), this.#e.delete(a), o)) {
                const c = Oc(a),
                    h = Vc(a);
                o(c, h);
            }
    }
    clear() {
        for (const t of this.#e.values()) this.#n(t);
        this.#e.clear();
    }
    values() {
        return this.#e.values();
    }
}
class Nc {
    #e = new Set();
    add(t, n) {
        const s = wt(t, n);
        this.#e.add(s);
    }
    has(t, n) {
        const s = wt(t, n);
        return this.#e.has(s);
    }
}
class $c {
    #e = new ls();
    #t = new Worker(
        new URL('' + new URL('../sSWd6LjU/fetcher.js', import.meta.url).href, import.meta.url),
        { type: 'module' },
    );
    #n = new Worker(
        new URL('' + new URL('../DLV64ZYj/transcoder.js', import.meta.url).href, import.meta.url),
        { type: 'module' },
    );
    #r = new Worker(
        new URL('' + new URL('../DRRJ6SXm/engine.js', import.meta.url).href, import.meta.url),
        { type: 'module' },
    );
    #s = new Worker(
        new URL('' + new URL('../CevXZ_tc/input-pusher.js', import.meta.url).href, import.meta.url),
        { type: 'module' },
    );
    #i = null;
    #l = 'disconnected';
    #o = 'disconnected';
    #a = null;
    #c = [];
    #u = new Uc({ destroy: (t) => t.close() });
    #h = null;
    #m = null;
    #v = null;
    #y = null;
    #f = null;
    constructor() {
        (this.#t.addEventListener('message', (s) => this.#C(s)),
            this.#n.addEventListener('message', (s) => this.#d(s)),
            this.#r.addEventListener('message', (s) => this.#_(s)),
            this.#s.addEventListener('message', (s) => this.#g(s)));
        const t = new MessageChannel();
        (this.#t.postMessage({ type: 'transcoder-port' }, [t.port2]),
            this.#n.postMessage({ type: 'fetcher-port' }, [t.port1]));
        const n = new MessageChannel();
        (this.#n.postMessage({ type: 'engine-port' }, [n.port2]),
            this.#r.postMessage({ type: 'transcoder-port' }, [n.port1]));
    }
    connectToJamNode(t) {
        this.#t.postMessage({ type: 'open', url: t });
    }
    disconnectFromJamNode() {
        this.#t.postMessage({ type: 'close' });
    }
    close() {
        (this.#p(),
            this.#t.terminate(),
            this.#r.terminate(),
            this.#n.terminate(),
            this.#s.terminate());
    }
    #p() {
        this.#u.clear();
    }
    async connectToCoreVmBuilder(t) {
        (await this.#b(),
            this.#s.postMessage({
                type: 'open',
                url: t,
                inputPrivateKeyJSON: await this.#m.toJSON(),
            }));
    }
    disconnectFromCoreVmBuilder() {
        this.#s.postMessage({ type: 'close' });
    }
    async #b() {
        (this.#m === null && (this.#m = await To()), (this.#v = await this.#m.getRawPublicKey()));
    }
    #C(t) {
        switch (t.data.type) {
            case 'parameters':
                ((this.#i = t.data.parameters),
                    this.#e.fireEvent('parameters', t.data.parameters),
                    this.#r.postMessage(t.data),
                    this.#n.postMessage(t.data),
                    this.#s.postMessage(t.data));
                break;
            case 'connection-state':
                ((this.#l = t.data.state),
                    this.#e.fireEvent('node-connection-state', t.data.state));
                break;
            case 'best-block':
                ((this.#a = t.data.block),
                    this.#e.fireEvent('best-block', t.data.block),
                    this.#r.postMessage(t.data));
                for (const n of this.#u.values()) n.onFetcherMessage(t);
                break;
            case 'services':
                (this.#w(t.data.services), this.#e.fireEvent('services', t.data.services));
                break;
            case 'fetch-event':
            case 'output-mode':
            case 'input-mode': {
                this.#P(t, (n) => n.onFetcherMessage(t));
                break;
            }
            case 'error':
                this.addUnhandledError(t.data.error);
                break;
            default:
                throw new Error(`Invalid message type: ${t.data.type}`);
        }
    }
    #_(t) {
        this.#P(t, (n) => n.onEngineMessage(t));
    }
    #d(t) {
        switch (t.data.type) {
            case 'transcode-event':
                this.#P(t, (n) => n.onTranscoderMessage(t));
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
    #P(t, n) {
        const s = this.#u.get(t.data.serviceId, t.data.vmId);
        if (s === void 0) {
            console.debug(
                `Dropping message ${t.data.type} to ${t.data.serviceId.toString(16)}/${t.data.vmId}`,
            );
            return;
        }
        n(s);
    }
    #w(t) {
        this.#y = t;
        const n = new Nc();
        for (const s of t) for (const r of s.vms.keys()) n.add(s.id, r);
        this.#f = n;
        for (const s of this.#u.values())
            n.has(s.serviceId, s.vmId) || this.removeVm(s.serviceId, s.vmId);
    }
    get parameters() {
        return this.#i;
    }
    get bestBlock() {
        return this.#a;
    }
    addUnhandledError(t) {
        (this.#c.push(t), this.#e.fireEvent('state', {}));
    }
    get unhandledErrors() {
        return this.#c;
    }
    get nodeConnectionState() {
        return this.#l;
    }
    get builderConnectionState() {
        return this.#o;
    }
    get services() {
        return this.#y;
    }
    addVm(t, n, s) {
        if (this.#f && !this.#f.has(t, n)) return null;
        const r = this.#u.ensurePresent(t, n, (i, o) => new Wr(i, o, s(i, o), this));
        return (
            this.#t.postMessage({ type: 'add-vm', serviceId: t, vmId: n }),
            this.#r.postMessage({ type: 'add-vm', serviceId: t, vmId: n }),
            this.#s.postMessage({ type: 'add-vm', serviceId: t, vmId: n }),
            this.#e.fireEvent('vm', { action: 'added', serviceId: t, vmId: n }),
            r
        );
    }
    removeVm(t, n) {
        this.#u.ensureAbsent(t, n) &&
            (this.#t.postMessage({ type: 'remove-vm', serviceId: t, vmId: n }),
            this.#r.postMessage({ type: 'remove-vm', serviceId: t, vmId: n }),
            this.#s.postMessage({ type: 'remove-vm', serviceId: t, vmId: n }),
            this.#e.fireEvent('vm', { action: 'removed', serviceId: t, vmId: n }));
    }
    setVms(t, n) {
        (this.#f && (t = t.filter(([s, r]) => this.#f.has(s, r))),
            this.#u.ensureIntersectionPresent(t, {
                create: (s, r) => new Wr(s, r, n(s, r), this),
                added: (s, r) =>
                    this.#e.fireEvent('vm', { action: 'added', serviceId: s, vmId: r }),
                removed: (s, r) =>
                    this.#e.fireEvent('vm', { action: 'removed', serviceId: s, vmId: r }),
            }),
            this.#t.postMessage({ type: 'set-vms', vms: t }),
            this.#r.postMessage({ type: 'set-vms', vms: t }),
            this.#s.postMessage({ type: 'set-vms', vms: t }));
    }
    removeAllVms() {
        (this.#u.clear(),
            this.#t.postMessage({ type: 'set-vms', vms: [] }),
            this.#r.postMessage({ type: 'set-vms', vms: [] }),
            this.#s.postMessage({ type: 'set-vms', vms: [] }));
    }
    getVm(t, n) {
        return this.#u.get(t, n);
    }
    getVms() {
        return Array.from(this.#u.values().map((t) => [t.serviceId, t.vmId]));
    }
    get players() {
        return Array.from(this.#u.values());
    }
    async initInteractively(t) {
        (this.#h === null && (this.#h = await rr.createInteractively()),
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
        return this.#v;
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
class Wr {
    #e;
    #t;
    #n;
    #r = new ls();
    #s = null;
    #i;
    #l = null;
    #o = null;
    #a = 0;
    #c = 0;
    #u = null;
    #h = null;
    #m = 0;
    #v = 0;
    #y = new Tc();
    #f = 'buffering';
    #p = null;
    constructor(t, n, s, r) {
        ((this.#e = t), (this.#t = n), (this.#n = r), (this.#i = new kc(s)));
    }
    close() {
        (this.#i !== null && (this.#i.close(), (this.#i = null)),
            this.#s !== null && (this.#s.close(), (this.#s = null)));
    }
    async enableAudioPlayback() {
        this.#o !== null &&
            (await this.#b(),
            this.#s.resumePlayback(),
            this.#C(),
            this.#f !== 'buffering' && this.#d('running'));
    }
    async startAudioCapture(t) {
        await this.#b();
        const n = new MessageChannel();
        (await this.#n.startAudioCapture(this.#e, this.#t, this.#u, n.port1),
            await this.#s.resumeCapture(t, this.#u, n.port2));
    }
    stopAudioCapture() {
        (this.#n.stopAudioCapture(this.#e, this.#t), this.#s !== null && this.#s.suspendCapture());
    }
    isAudioPlaybackEnabled() {
        return this.#s === null ? !1 : this.#s.isPlaybackEnabled();
    }
    isAudioCaptureEnabled() {
        return this.#s === null ? !1 : this.#s.isCaptureEnabled();
    }
    async #b() {
        if (this.#s === null) {
            const t = this.#n.audio;
            ((this.#s = new Mc(t)), (this.#s.onerror = (n) => this.#n.addUnhandledError(n)));
        }
    }
    #C() {
        const t = this.#s.takePlaybackPipePort();
        t !== null && this.#n.updateAudioPort(this.#e, this.#t, t);
    }
    #_(t, n) {
        (this.#i.reset(),
            this.#s && this.#s.reset(),
            (this.#a = 0),
            (this.#c = 0),
            (this.#l = Ht.fromPlain(t)),
            (this.#o = jt.fromPlain(n)),
            (this.#m = 0),
            (this.#v = 0));
    }
    addEventListener(t, n) {
        this.#r.addEventListener(t, n);
    }
    removeEventListener(t, n) {
        this.#r.removeEventListener(t, n);
    }
    get inputAudioMode() {
        return this.#u;
    }
    get inputVideoMode() {
        return this.#h;
    }
    get remainingVideoFrames() {
        return this.#a;
    }
    get remainingAudioFrames() {
        return this.#c;
    }
    get timestamp() {
        return this.#m;
    }
    get slot() {
        return this.#v;
    }
    getConsoleText() {
        return this.#y.getText();
    }
    pushHostMessage(t) {
        this.#n.pushHostMessage(this.#e, this.#t, t);
    }
    pushConsoleChunk(t) {
        this.#n.pushConsoleChunk(this.#e, this.#t, t);
    }
    get serviceId() {
        return this.#e;
    }
    get vmId() {
        return this.#t;
    }
    get outputVideoMode() {
        return this.#l;
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
                this.#p !== null && this.#p.removeOldEvents();
                break;
            case 'output-mode':
                ((this.#l = Ht.fromPlain(t.data.video)),
                    (this.#o = jt.fromPlain(t.data.audio)),
                    this.#f !== 'running' && this.#d('buffering'),
                    this.#r.fireEvent('output-mode', t.data));
                break;
            case 'input-mode':
                ((this.#u = jt.fromPlain(t.data.audio)),
                    (this.#h = Ht.fromPlain(t.data.video)),
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
        switch (t.data.type) {
            case 'transcode-event':
                this.#g('transcode', t.data);
                break;
            default:
                throw new Error(`Invalid message type: ${t.data.type}`);
        }
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
                (this.#d('buffering'),
                    (this.#c = t.data.audioFrames),
                    (this.#a = t.data.videoFrames));
                break;
            case 'started':
                this.#d('running');
                break;
            case 'timestamp':
                ((this.#m = t.data.timestamp), (this.#v = t.data.slot));
                break;
            case 'video': {
                const [n, s] = this.#i.pushVideo(t.data);
                ((this.#a = t.data.remaining),
                    this.#d('running'),
                    this.#r.fireEvent('video', {
                        type: 'video',
                        remaining: t.data.remaining,
                        monitorWidth: n,
                        monitorHeight: s,
                    }));
                break;
            }
            case 'start-audio-playback': {
                (this.#s.resumePlayback(), this.#d('running'));
                break;
            }
            case 'console':
                (this.#y.push({ timestamp: t.data.timestamp, text: t.data.text }),
                    this.#d('running'),
                    this.#r.fireEvent('console'));
                break;
            case 'reset':
                (this.#_(t.data.video, t.data.audio),
                    this.#d('buffering'),
                    this.#r.fireEvent('reset'));
                break;
            case 'audio-remaining':
                ((this.#c = t.data.remaining),
                    this.#r.fireEvent('audio-remaining', t.data.remaining));
                break;
            case 'error':
                this.#n.addUnhandledError(t.data.error);
                break;
            default:
                throw new Error(`Invalid message type: ${t.data.type}`);
        }
    }
    #d(t) {
        this.#f !== t && ((this.#f = t), this.#r.fireEvent('engine-state', this.#f));
    }
    get engineState() {
        return this.#f;
    }
    get timeline() {
        return this.#p;
    }
    #g(t, n) {
        if (this.#p === null) {
            if (!this.#n.parameters) return;
            this.#p = new Ic(Fc, this.#n.parameters.slot_period_sec);
        }
        (this.#p.addEvent(t, n), this.#r.fireEvent('timeline', {}));
    }
    remove() {
        this.#n.removeVm(this.#e, this.#t);
    }
}
async function To() {
    let e;
    const t = localStorage.getItem(zr);
    if (t !== null)
        try {
            e = await pn.fromJSON(JSON.parse(t));
        } catch (n) {
            (console.debug('Failed to load input private key from local storage', n), (e = void 0));
        }
    if (!e) {
        e = await pn.generate();
        const n = await e.toJSON();
        localStorage.setItem(zr, JSON.stringify(n));
    }
    return e;
}
const Fc = 50,
    zr = 'corevm-input-key';
function Oo(e) {
    if ('toHex' in Uint8Array) {
        let n;
        switch (e.constructor) {
            case Uint8Array:
                n = e;
                break;
            default:
                n = new Uint8Array(e);
                break;
        }
        return n.toHex();
    }
    let t = '';
    for (const n of e) t += (n & 255).toString(16).padStart(2, '0');
    return t;
}
function gn(e) {
    return e.toString(16);
}
function Wn(e) {
    return e.toString();
}
function Hc(e) {
    return Oo(e);
}
function Vo(e) {
    return Oo(e);
}
function Uo(e, t) {
    if (t === null) return e;
    const n = Math.floor(e / t.epoch_period);
    e %= t.epoch_period;
    const s = Math.floor(e / t.rotation_period);
    return ((e %= t.rotation_period), `${n}:${s}:${e}`);
}
function No(e) {
    return e ? `${e.width}×${e.height}, ${e.refreshRate} FPS` : 'none';
}
function jc(e) {
    switch (e) {
        case Kn.S16LE:
            return 's16le';
        default:
            return '<unknown>';
    }
}
function $o(e) {
    if (!e) return 'none';
    const t = jc(e.sampleFormat),
        n = Bc(e.bytesPerSecond());
    return `${Kc(e.sampleRate)}Hz, ${e.channels} ${Dc('channel', 'channels', e.channels)}, ${t}, ${n}B/s`;
}
function Dc(e, t, n) {
    return n === 1 ? e : t;
}
function Bc(e, t = 1) {
    return Fo(e, { prefixes: ['', 'Ki', 'Mi', 'Gi', 'Ti'], scale: 1024, precision: t });
}
function Kc(e, t = 1) {
    return Fo(e, { prefixes: ['', 'K', 'M', 'G', 'T'], scale: 1e3, precision: t });
}
function Fo(e, t) {
    let n = 0;
    for (; n < t.prefixes.length && !(e < t.scale); ++n) e /= t.scale;
    return (n === t.prefixes.length && --n, `${e.toFixed(t.precision)} ${t.prefixes[n]}`);
}
function Ho(e) {
    const t = Math.floor(e / Gr);
    e %= Gr;
    const n = Math.floor(e / qr);
    e %= qr;
    const s = Math.floor(e),
        r = t.toString().padStart(2, '0'),
        i = n.toString().padStart(2, '0'),
        o = s.toString().padStart(2, '0');
    return `${r}:${i}:${o}`;
}
const Gr = 3600,
    qr = 60;
function Wc(e) {
    let t = e.message;
    return (
        'filename' in e && ((t += ', file '), (t += e.filename)),
        'lineno' in e && (t += `, line ${e.lineno}`),
        'colno' in e && (t += `, column ${e.colno}`),
        t
    );
}
function Pn(e, t) {
    return `monitor-${e.toString(16)}-${t}`;
}
const Jr = 'corevm-vms',
    Xr = 'corevm-node-rpc-url',
    Yr = 'corevm-builder-rpc-url',
    Qr = 'corevm-builder-json-rpc-url';
class Te {
    static getVms() {
        let t;
        try {
            const n = localStorage.getItem(Jr);
            t = JSON.parse(n);
        } catch (n) {
            return (console.debug('Failed to load VMs from local storage', n), []);
        }
        return !Array.isArray(t) ||
            !t.every(
                (n) =>
                    Array.isArray(n) &&
                    n.length === 2 &&
                    Number.isInteger(n[0]) &&
                    Number.isInteger(n[1]),
            )
            ? []
            : t;
    }
    static setVms(t) {
        localStorage.setItem(Jr, JSON.stringify(t));
    }
    static getNodeRpcUrl() {
        return localStorage.getItem(Xr);
    }
    static setNodeRpcUrl(t) {
        localStorage.setItem(Xr, t);
    }
    static getBuilderRpcUrl() {
        return localStorage.getItem(Yr);
    }
    static setBuilderRpcUrl(t) {
        localStorage.setItem(Yr, t);
    }
    static getBuilderJsonRpcUrl() {
        return localStorage.getItem(Qr);
    }
    static setBuilderJsonRpcUrl(t) {
        localStorage.setItem(Qr, t);
    }
}
async function zc(e, t) {
    const n = Te.getVms();
    (e.setVms(n, Pn), Te.setVms(e.getVms()));
}
const ue = (e, t) => {
        const n = e.__vccOpts || e;
        for (const [s, r] of t) n[s] = r;
        return n;
    },
    Gc = 'wss://builder.jamtoaster.network/wss',
    qc = !1,
    Jc = {
        setup() {
            const e = Vn(new $c());
            $t('vmPlayerContext', e);
            const t = Vn(null);
            return ($t('builder', t), { builder: t, vmPlayerContext: e });
        },
        data() {
            return {
                nodeRpcUrl: Gc,
                NODE_RPC_URL_ENFORCED: qc,
                state: 'initial',
                onError: null,
                rawInputPublicKey: null,
            };
        },
        async beforeMount() {
            const e = await To();
            ((this.rawInputPublicKey = await e.getRawPublicKey()),
                (this.onError = (n) => {
                    this.vmPlayerContext.addUnhandledError(n);
                }),
                window.addEventListener('error', this.onError),
                window.addEventListener('unhandledrejection', this.onError),
                (this.onState = async (n) => {
                    if (this.state !== 'initial')
                        switch (n) {
                            case 'connecting':
                                this.state = 'connecting-to-node';
                                break;
                            case 'connected':
                                (await zc(this.vmPlayerContext),
                                    (this.state = 'connected-to-node'));
                                break;
                        }
                }),
                this.vmPlayerContext.addEventListener('node-connection-state', this.onState));
            const t = Te.getNodeRpcUrl();
            t !== null && ((this.nodeRpcUrl = t), await this.connectToJamNode());
        },
        unmounted() {
            (window.removeEventListener('error', this.onError),
                window.removeEventListener('unhandledrejection', this.onError),
                this.vmPlayerContext.removeEventListener('node-connection-state', this.onState));
        },
        methods: {
            async connectToJamNode() {
                (await this.disconnectFromJamNode(),
                    (this.nodeRpcUrl = this.nodeRpcUrl.trim()),
                    Te.setNodeRpcUrl(this.nodeRpcUrl),
                    (this.state = 'connecting-to-node'),
                    this.vmPlayerContext.connectToJamNode(this.nodeRpcUrl));
            },
            async disconnectFromJamNode() {
                (await this.stopPlayers(),
                    this.vmPlayerContext.disconnectFromJamNode(),
                    this.vmPlayerContext.removeAllVms(),
                    (this.state = 'initial'));
            },
            async stopPlayers() {
                (await this.vmPlayerContext.stopAudioCapture(),
                    this.vmPlayerContext.removeAllVms(),
                    this.builder !== null && (this.builder.close(), (this.builder = null)),
                    (this.state = 'connected-to-node'));
            },
            formatPublicKey: Vo,
        },
    },
    Xc = { key: 0, class: 'input-key' },
    Yc = { key: 2, class: 'content' },
    Qc = { class: 'disconnect' },
    Zc = { key: 3, class: 'rpc-container' };
function eu(e, t, n, s, r, i) {
    const o = fe('SecurityWarning'),
        l = fe('TopPanel'),
        a = fe('RouterView');
    return (
        P(),
        w(
            $,
            null,
            [
                G(o),
                r.state !== 'connected-to-node' && r.rawInputPublicKey !== null
                    ? (P(),
                      w('div', Xc, 'Input key: ' + K(i.formatPublicKey(r.rawInputPublicKey)), 1))
                    : D('', !0),
                r.state === 'connected-to-node'
                    ? (P(),
                      w(
                          $,
                          { key: 1 },
                          [
                              G(l, { onDisconnectFromJamNode: i.disconnectFromJamNode }, null, 8, [
                                  'onDisconnectFromJamNode',
                              ]),
                              _('main', null, [G(a)]),
                          ],
                          64,
                      ))
                    : D('', !0),
                r.state === 'connecting-to-node'
                    ? (P(),
                      w('main', Yc, [
                          t[3] || (t[3] = _('div', null, 'Connecting...', -1)),
                          _('div', Qc, [
                              _(
                                  'button',
                                  {
                                      onClick:
                                          t[0] ||
                                          (t[0] = (...f) =>
                                              i.disconnectFromJamNode &&
                                              i.disconnectFromJamNode(...f)),
                                  },
                                  'Cancel',
                              ),
                          ]),
                      ]))
                    : D('', !0),
                r.state === 'initial'
                    ? (P(),
                      w('div', Zc, [
                          _('div', null, [
                              t[4] || (t[4] = _('h2', null, 'Node', -1)),
                              r.NODE_RPC_URL_ENFORCED
                                  ? D('', !0)
                                  : Dt(
                                        (P(),
                                        w(
                                            'input',
                                            {
                                                key: 0,
                                                'onUpdate:modelValue':
                                                    t[1] || (t[1] = (f) => (r.nodeRpcUrl = f)),
                                                class: 'rpc-url',
                                                type: 'text',
                                                placeholder: 'RPC URL',
                                            },
                                            null,
                                            512,
                                        )),
                                        [[mn, r.nodeRpcUrl]],
                                    ),
                              _(
                                  'button',
                                  {
                                      class: 'connect',
                                      onClick:
                                          t[2] ||
                                          (t[2] = (...f) =>
                                              i.connectToJamNode && i.connectToJamNode(...f)),
                                  },
                                  'Connect',
                              ),
                          ]),
                      ]))
                    : D('', !0),
            ],
            64,
        )
    );
}
const tu = ue(Jc, [
    ['render', eu],
    ['__scopeId', 'data-v-c3211d5e'],
]);
/*!
 * vue-router v4.5.1
 * (c) 2025 Eduardo San Martin Morote
 * @license MIT
 */ const Rt = typeof document < 'u';
function jo(e) {
    return typeof e == 'object' || 'displayName' in e || 'props' in e || '__vccOpts' in e;
}
function nu(e) {
    return e.__esModule || e[Symbol.toStringTag] === 'Module' || (e.default && jo(e.default));
}
const X = Object.assign;
function Cs(e, t) {
    const n = {};
    for (const s in t) {
        const r = t[s];
        n[s] = $e(r) ? r.map(e) : e(r);
    }
    return n;
}
const ln = () => {},
    $e = Array.isArray,
    Do = /#/g,
    su = /&/g,
    ru = /\//g,
    iu = /=/g,
    ou = /\?/g,
    Bo = /\+/g,
    lu = /%5B/g,
    au = /%5D/g,
    Ko = /%5E/g,
    cu = /%60/g,
    Wo = /%7B/g,
    uu = /%7C/g,
    zo = /%7D/g,
    fu = /%20/g;
function ir(e) {
    return encodeURI('' + e)
        .replace(uu, '|')
        .replace(lu, '[')
        .replace(au, ']');
}
function du(e) {
    return ir(e).replace(Wo, '{').replace(zo, '}').replace(Ko, '^');
}
function Us(e) {
    return ir(e)
        .replace(Bo, '%2B')
        .replace(fu, '+')
        .replace(Do, '%23')
        .replace(su, '%26')
        .replace(cu, '`')
        .replace(Wo, '{')
        .replace(zo, '}')
        .replace(Ko, '^');
}
function hu(e) {
    return Us(e).replace(iu, '%3D');
}
function mu(e) {
    return ir(e).replace(Do, '%23').replace(ou, '%3F');
}
function pu(e) {
    return e == null ? '' : mu(e).replace(ru, '%2F');
}
function vn(e) {
    try {
        return decodeURIComponent('' + e);
    } catch {}
    return '' + e;
}
const gu = /\/$/,
    vu = (e) => e.replace(gu, '');
function _s(e, t, n = '/') {
    let s,
        r = {},
        i = '',
        o = '';
    const l = t.indexOf('#');
    let a = t.indexOf('?');
    return (
        l < a && l >= 0 && (a = -1),
        a > -1 && ((s = t.slice(0, a)), (i = t.slice(a + 1, l > -1 ? l : t.length)), (r = e(i))),
        l > -1 && ((s = s || t.slice(0, l)), (o = t.slice(l, t.length))),
        (s = _u(s ?? t, n)),
        { fullPath: s + (i && '?') + i + o, path: s, query: r, hash: vn(o) }
    );
}
function yu(e, t) {
    const n = t.query ? e(t.query) : '';
    return t.path + (n && '?') + n + (t.hash || '');
}
function Zr(e, t) {
    return !t || !e.toLowerCase().startsWith(t.toLowerCase()) ? e : e.slice(t.length) || '/';
}
function bu(e, t, n) {
    const s = t.matched.length - 1,
        r = n.matched.length - 1;
    return (
        s > -1 &&
        s === r &&
        Kt(t.matched[s], n.matched[r]) &&
        Go(t.params, n.params) &&
        e(t.query) === e(n.query) &&
        t.hash === n.hash
    );
}
function Kt(e, t) {
    return (e.aliasOf || e) === (t.aliasOf || t);
}
function Go(e, t) {
    if (Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const n in e) if (!Cu(e[n], t[n])) return !1;
    return !0;
}
function Cu(e, t) {
    return $e(e) ? ei(e, t) : $e(t) ? ei(t, e) : e === t;
}
function ei(e, t) {
    return $e(t)
        ? e.length === t.length && e.every((n, s) => n === t[s])
        : e.length === 1 && e[0] === t;
}
function _u(e, t) {
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
const ut = {
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
var yn;
(function (e) {
    ((e.pop = 'pop'), (e.push = 'push'));
})(yn || (yn = {}));
var an;
(function (e) {
    ((e.back = 'back'), (e.forward = 'forward'), (e.unknown = ''));
})(an || (an = {}));
function Pu(e) {
    if (!e)
        if (Rt) {
            const t = document.querySelector('base');
            ((e = (t && t.getAttribute('href')) || '/'), (e = e.replace(/^\w+:\/\/[^\/]+/, '')));
        } else e = '/';
    return (e[0] !== '/' && e[0] !== '#' && (e = '/' + e), vu(e));
}
const wu = /^[^#]+#/;
function Su(e, t) {
    return e.replace(wu, '#') + t;
}
function Eu(e, t) {
    const n = document.documentElement.getBoundingClientRect(),
        s = e.getBoundingClientRect();
    return {
        behavior: t.behavior,
        left: s.left - n.left - (t.left || 0),
        top: s.top - n.top - (t.top || 0),
    };
}
const as = () => ({ left: window.scrollX, top: window.scrollY });
function xu(e) {
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
        t = Eu(r, e);
    } else t = e;
    'scrollBehavior' in document.documentElement.style
        ? window.scrollTo(t)
        : window.scrollTo(
              t.left != null ? t.left : window.scrollX,
              t.top != null ? t.top : window.scrollY,
          );
}
function ti(e, t) {
    return (history.state ? history.state.position - t : -1) + e;
}
const Ns = new Map();
function Lu(e, t) {
    Ns.set(e, t);
}
function Mu(e) {
    const t = Ns.get(e);
    return (Ns.delete(e), t);
}
let ku = () => location.protocol + '//' + location.host;
function qo(e, t) {
    const { pathname: n, search: s, hash: r } = t,
        i = e.indexOf('#');
    if (i > -1) {
        let l = r.includes(e.slice(i)) ? e.slice(i).length : 1,
            a = r.slice(l);
        return (a[0] !== '/' && (a = '/' + a), Zr(a, ''));
    }
    return Zr(n, e) + s + r;
}
function Iu(e, t, n, s) {
    let r = [],
        i = [],
        o = null;
    const l = ({ state: p }) => {
        const g = qo(e, location),
            R = n.value,
            A = t.value;
        let z = 0;
        if (p) {
            if (((n.value = g), (t.value = p), o && o === R)) {
                o = null;
                return;
            }
            z = A ? p.position - A.position : 0;
        } else s(g);
        r.forEach((F) => {
            F(n.value, R, {
                delta: z,
                type: yn.pop,
                direction: z ? (z > 0 ? an.forward : an.back) : an.unknown,
            });
        });
    };
    function a() {
        o = n.value;
    }
    function f(p) {
        r.push(p);
        const g = () => {
            const R = r.indexOf(p);
            R > -1 && r.splice(R, 1);
        };
        return (i.push(g), g);
    }
    function c() {
        const { history: p } = window;
        p.state && p.replaceState(X({}, p.state, { scroll: as() }), '');
    }
    function h() {
        for (const p of i) p();
        ((i = []),
            window.removeEventListener('popstate', l),
            window.removeEventListener('beforeunload', c));
    }
    return (
        window.addEventListener('popstate', l),
        window.addEventListener('beforeunload', c, { passive: !0 }),
        { pauseListeners: a, listen: f, destroy: h }
    );
}
function ni(e, t, n, s = !1, r = !1) {
    return {
        back: e,
        current: t,
        forward: n,
        replaced: s,
        position: window.history.length,
        scroll: r ? as() : null,
    };
}
function Ru(e) {
    const { history: t, location: n } = window,
        s = { value: qo(e, n) },
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
    function i(a, f, c) {
        const h = e.indexOf('#'),
            p =
                h > -1
                    ? (n.host && document.querySelector('base') ? e : e.slice(h)) + a
                    : ku() + e + a;
        try {
            (t[c ? 'replaceState' : 'pushState'](f, '', p), (r.value = f));
        } catch (g) {
            (console.error(g), n[c ? 'replace' : 'assign'](p));
        }
    }
    function o(a, f) {
        const c = X({}, t.state, ni(r.value.back, a, r.value.forward, !0), f, {
            position: r.value.position,
        });
        (i(a, c, !0), (s.value = a));
    }
    function l(a, f) {
        const c = X({}, r.value, t.state, { forward: a, scroll: as() });
        i(c.current, c, !0);
        const h = X({}, ni(s.value, a, null), { position: c.position + 1 }, f);
        (i(a, h, !1), (s.value = a));
    }
    return { location: s, state: r, push: l, replace: o };
}
function Au(e) {
    e = Pu(e);
    const t = Ru(e),
        n = Iu(e, t.state, t.location, t.replace);
    function s(i, o = !0) {
        (o || n.pauseListeners(), history.go(i));
    }
    const r = X({ location: '', base: e, go: s, createHref: Su.bind(null, e) }, t, n);
    return (
        Object.defineProperty(r, 'location', { enumerable: !0, get: () => t.location.value }),
        Object.defineProperty(r, 'state', { enumerable: !0, get: () => t.state.value }),
        r
    );
}
function Tu(e) {
    return typeof e == 'string' || (e && typeof e == 'object');
}
function Jo(e) {
    return typeof e == 'string' || typeof e == 'symbol';
}
const Xo = Symbol('');
var si;
(function (e) {
    ((e[(e.aborted = 4)] = 'aborted'),
        (e[(e.cancelled = 8)] = 'cancelled'),
        (e[(e.duplicated = 16)] = 'duplicated'));
})(si || (si = {}));
function Wt(e, t) {
    return X(new Error(), { type: e, [Xo]: !0 }, t);
}
function Ze(e, t) {
    return e instanceof Error && Xo in e && (t == null || !!(e.type & t));
}
const ri = '[^/]+?',
    Ou = { sensitive: !1, strict: !1, start: !0, end: !0 },
    Vu = /[.+*?^${}()[\]/\\]/g;
function Uu(e, t) {
    const n = X({}, Ou, t),
        s = [];
    let r = n.start ? '^' : '';
    const i = [];
    for (const f of e) {
        const c = f.length ? [] : [90];
        n.strict && !f.length && (r += '/');
        for (let h = 0; h < f.length; h++) {
            const p = f[h];
            let g = 40 + (n.sensitive ? 0.25 : 0);
            if (p.type === 0) (h || (r += '/'), (r += p.value.replace(Vu, '\\$&')), (g += 40));
            else if (p.type === 1) {
                const { value: R, repeatable: A, optional: z, regexp: F } = p;
                i.push({ name: R, repeatable: A, optional: z });
                const V = F || ri;
                if (V !== ri) {
                    g += 10;
                    try {
                        new RegExp(`(${V})`);
                    } catch (T) {
                        throw new Error(
                            `Invalid custom RegExp for param "${R}" (${V}): ` + T.message,
                        );
                    }
                }
                let H = A ? `((?:${V})(?:/(?:${V}))*)` : `(${V})`;
                (h || (H = z && f.length < 2 ? `(?:/${H})` : '/' + H),
                    z && (H += '?'),
                    (r += H),
                    (g += 20),
                    z && (g += -8),
                    A && (g += -20),
                    V === '.*' && (g += -50));
            }
            c.push(g);
        }
        s.push(c);
    }
    if (n.strict && n.end) {
        const f = s.length - 1;
        s[f][s[f].length - 1] += 0.7000000000000001;
    }
    (n.strict || (r += '/?'),
        n.end ? (r += '$') : n.strict && !r.endsWith('/') && (r += '(?:/|$)'));
    const o = new RegExp(r, n.sensitive ? '' : 'i');
    function l(f) {
        const c = f.match(o),
            h = {};
        if (!c) return null;
        for (let p = 1; p < c.length; p++) {
            const g = c[p] || '',
                R = i[p - 1];
            h[R.name] = g && R.repeatable ? g.split('/') : g;
        }
        return h;
    }
    function a(f) {
        let c = '',
            h = !1;
        for (const p of e) {
            ((!h || !c.endsWith('/')) && (c += '/'), (h = !1));
            for (const g of p)
                if (g.type === 0) c += g.value;
                else if (g.type === 1) {
                    const { value: R, repeatable: A, optional: z } = g,
                        F = R in f ? f[R] : '';
                    if ($e(F) && !A)
                        throw new Error(
                            `Provided param "${R}" is an array but it is not repeatable (* or + modifiers)`,
                        );
                    const V = $e(F) ? F.join('/') : F;
                    if (!V)
                        if (z) p.length < 2 && (c.endsWith('/') ? (c = c.slice(0, -1)) : (h = !0));
                        else throw new Error(`Missing required param "${R}"`);
                    c += V;
                }
        }
        return c || '/';
    }
    return { re: o, score: s, keys: i, parse: l, stringify: a };
}
function Nu(e, t) {
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
function Yo(e, t) {
    let n = 0;
    const s = e.score,
        r = t.score;
    for (; n < s.length && n < r.length;) {
        const i = Nu(s[n], r[n]);
        if (i) return i;
        n++;
    }
    if (Math.abs(r.length - s.length) === 1) {
        if (ii(s)) return 1;
        if (ii(r)) return -1;
    }
    return r.length - s.length;
}
function ii(e) {
    const t = e[e.length - 1];
    return e.length > 0 && t[t.length - 1] < 0;
}
const $u = { type: 0, value: '' },
    Fu = /[a-zA-Z0-9_]/;
function Hu(e) {
    if (!e) return [[]];
    if (e === '/') return [[$u]];
    if (!e.startsWith('/')) throw new Error(`Invalid path "${e}"`);
    function t(g) {
        throw new Error(`ERR (${n})/"${f}": ${g}`);
    }
    let n = 0,
        s = n;
    const r = [];
    let i;
    function o() {
        (i && r.push(i), (i = []));
    }
    let l = 0,
        a,
        f = '',
        c = '';
    function h() {
        f &&
            (n === 0
                ? i.push({ type: 0, value: f })
                : n === 1 || n === 2 || n === 3
                  ? (i.length > 1 &&
                        (a === '*' || a === '+') &&
                        t(`A repeatable param (${f}) must be alone in its segment. eg: '/:ids+.`),
                    i.push({
                        type: 1,
                        value: f,
                        regexp: c,
                        repeatable: a === '*' || a === '+',
                        optional: a === '*' || a === '?',
                    }))
                  : t('Invalid state to consume buffer'),
            (f = ''));
    }
    function p() {
        f += a;
    }
    for (; l < e.length;) {
        if (((a = e[l++]), a === '\\' && n !== 2)) {
            ((s = n), (n = 4));
            continue;
        }
        switch (n) {
            case 0:
                a === '/' ? (f && h(), o()) : a === ':' ? (h(), (n = 1)) : p();
                break;
            case 4:
                (p(), (n = s));
                break;
            case 1:
                a === '('
                    ? (n = 2)
                    : Fu.test(a)
                      ? p()
                      : (h(), (n = 0), a !== '*' && a !== '?' && a !== '+' && l--);
                break;
            case 2:
                a === ')'
                    ? c[c.length - 1] == '\\'
                        ? (c = c.slice(0, -1) + a)
                        : (n = 3)
                    : (c += a);
                break;
            case 3:
                (h(), (n = 0), a !== '*' && a !== '?' && a !== '+' && l--, (c = ''));
                break;
            default:
                t('Unknown state');
                break;
        }
    }
    return (n === 2 && t(`Unfinished custom RegExp for param "${f}"`), h(), o(), r);
}
function ju(e, t, n) {
    const s = Uu(Hu(e.path), n),
        r = X(s, { record: e, parent: t, children: [], alias: [] });
    return (t && !r.record.aliasOf == !t.record.aliasOf && t.children.push(r), r);
}
function Du(e, t) {
    const n = [],
        s = new Map();
    t = ci({ strict: !1, end: !0, sensitive: !1 }, t);
    function r(h) {
        return s.get(h);
    }
    function i(h, p, g) {
        const R = !g,
            A = li(h);
        A.aliasOf = g && g.record;
        const z = ci(t, h),
            F = [A];
        if ('alias' in h) {
            const T = typeof h.alias == 'string' ? [h.alias] : h.alias;
            for (const ne of T)
                F.push(
                    li(
                        X({}, A, {
                            components: g ? g.record.components : A.components,
                            path: ne,
                            aliasOf: g ? g.record : A,
                        }),
                    ),
                );
        }
        let V, H;
        for (const T of F) {
            const { path: ne } = T;
            if (p && ne[0] !== '/') {
                const me = p.record.path,
                    ae = me[me.length - 1] === '/' ? '' : '/';
                T.path = p.record.path + (ne && ae + ne);
            }
            if (
                ((V = ju(T, p, z)),
                g
                    ? g.alias.push(V)
                    : ((H = H || V),
                      H !== V && H.alias.push(V),
                      R && h.name && !ai(V) && o(h.name)),
                Qo(V) && a(V),
                A.children)
            ) {
                const me = A.children;
                for (let ae = 0; ae < me.length; ae++) i(me[ae], V, g && g.children[ae]);
            }
            g = g || V;
        }
        return H
            ? () => {
                  o(H);
              }
            : ln;
    }
    function o(h) {
        if (Jo(h)) {
            const p = s.get(h);
            p &&
                (s.delete(h), n.splice(n.indexOf(p), 1), p.children.forEach(o), p.alias.forEach(o));
        } else {
            const p = n.indexOf(h);
            p > -1 &&
                (n.splice(p, 1),
                h.record.name && s.delete(h.record.name),
                h.children.forEach(o),
                h.alias.forEach(o));
        }
    }
    function l() {
        return n;
    }
    function a(h) {
        const p = Wu(h, n);
        (n.splice(p, 0, h), h.record.name && !ai(h) && s.set(h.record.name, h));
    }
    function f(h, p) {
        let g,
            R = {},
            A,
            z;
        if ('name' in h && h.name) {
            if (((g = s.get(h.name)), !g)) throw Wt(1, { location: h });
            ((z = g.record.name),
                (R = X(
                    oi(
                        p.params,
                        g.keys
                            .filter((H) => !H.optional)
                            .concat(g.parent ? g.parent.keys.filter((H) => H.optional) : [])
                            .map((H) => H.name),
                    ),
                    h.params &&
                        oi(
                            h.params,
                            g.keys.map((H) => H.name),
                        ),
                )),
                (A = g.stringify(R)));
        } else if (h.path != null)
            ((A = h.path),
                (g = n.find((H) => H.re.test(A))),
                g && ((R = g.parse(A)), (z = g.record.name)));
        else {
            if (((g = p.name ? s.get(p.name) : n.find((H) => H.re.test(p.path))), !g))
                throw Wt(1, { location: h, currentLocation: p });
            ((z = g.record.name), (R = X({}, p.params, h.params)), (A = g.stringify(R)));
        }
        const F = [];
        let V = g;
        for (; V;) (F.unshift(V.record), (V = V.parent));
        return { name: z, path: A, params: R, matched: F, meta: Ku(F) };
    }
    e.forEach((h) => i(h));
    function c() {
        ((n.length = 0), s.clear());
    }
    return {
        addRoute: i,
        resolve: f,
        removeRoute: o,
        clearRoutes: c,
        getRoutes: l,
        getRecordMatcher: r,
    };
}
function oi(e, t) {
    const n = {};
    for (const s of t) s in e && (n[s] = e[s]);
    return n;
}
function li(e) {
    const t = {
        path: e.path,
        redirect: e.redirect,
        name: e.name,
        meta: e.meta || {},
        aliasOf: e.aliasOf,
        beforeEnter: e.beforeEnter,
        props: Bu(e),
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
function Bu(e) {
    const t = {},
        n = e.props || !1;
    if ('component' in e) t.default = n;
    else for (const s in e.components) t[s] = typeof n == 'object' ? n[s] : n;
    return t;
}
function ai(e) {
    for (; e;) {
        if (e.record.aliasOf) return !0;
        e = e.parent;
    }
    return !1;
}
function Ku(e) {
    return e.reduce((t, n) => X(t, n.meta), {});
}
function ci(e, t) {
    const n = {};
    for (const s in e) n[s] = s in t ? t[s] : e[s];
    return n;
}
function Wu(e, t) {
    let n = 0,
        s = t.length;
    for (; n !== s;) {
        const i = (n + s) >> 1;
        Yo(e, t[i]) < 0 ? (s = i) : (n = i + 1);
    }
    const r = zu(e);
    return (r && (s = t.lastIndexOf(r, s - 1)), s);
}
function zu(e) {
    let t = e;
    for (; (t = t.parent);) if (Qo(t) && Yo(e, t) === 0) return t;
}
function Qo({ record: e }) {
    return !!(e.name || (e.components && Object.keys(e.components).length) || e.redirect);
}
function Gu(e) {
    const t = {};
    if (e === '' || e === '?') return t;
    const s = (e[0] === '?' ? e.slice(1) : e).split('&');
    for (let r = 0; r < s.length; ++r) {
        const i = s[r].replace(Bo, ' '),
            o = i.indexOf('='),
            l = vn(o < 0 ? i : i.slice(0, o)),
            a = o < 0 ? null : vn(i.slice(o + 1));
        if (l in t) {
            let f = t[l];
            ($e(f) || (f = t[l] = [f]), f.push(a));
        } else t[l] = a;
    }
    return t;
}
function ui(e) {
    let t = '';
    for (let n in e) {
        const s = e[n];
        if (((n = hu(n)), s == null)) {
            s !== void 0 && (t += (t.length ? '&' : '') + n);
            continue;
        }
        ($e(s) ? s.map((i) => i && Us(i)) : [s && Us(s)]).forEach((i) => {
            i !== void 0 && ((t += (t.length ? '&' : '') + n), i != null && (t += '=' + i));
        });
    }
    return t;
}
function qu(e) {
    const t = {};
    for (const n in e) {
        const s = e[n];
        s !== void 0 &&
            (t[n] = $e(s) ? s.map((r) => (r == null ? null : '' + r)) : s == null ? s : '' + s);
    }
    return t;
}
const Ju = Symbol(''),
    fi = Symbol(''),
    or = Symbol(''),
    Zo = Symbol(''),
    $s = Symbol('');
function Xt() {
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
function mt(e, t, n, s, r, i = (o) => o()) {
    const o = s && (s.enterCallbacks[r] = s.enterCallbacks[r] || []);
    return () =>
        new Promise((l, a) => {
            const f = (p) => {
                    p === !1
                        ? a(Wt(4, { from: n, to: t }))
                        : p instanceof Error
                          ? a(p)
                          : Tu(p)
                            ? a(Wt(2, { from: t, to: p }))
                            : (o &&
                                  s.enterCallbacks[r] === o &&
                                  typeof p == 'function' &&
                                  o.push(p),
                              l());
                },
                c = i(() => e.call(s && s.instances[r], t, n, f));
            let h = Promise.resolve(c);
            (e.length < 3 && (h = h.then(f)), h.catch((p) => a(p)));
        });
}
function Ps(e, t, n, s, r = (i) => i()) {
    const i = [];
    for (const o of e)
        for (const l in o.components) {
            let a = o.components[l];
            if (!(t !== 'beforeRouteEnter' && !o.instances[l]))
                if (jo(a)) {
                    const c = (a.__vccOpts || a)[t];
                    c && i.push(mt(c, n, s, o, l, r));
                } else {
                    let f = a();
                    i.push(() =>
                        f.then((c) => {
                            if (!c)
                                throw new Error(`Couldn't resolve component "${l}" at "${o.path}"`);
                            const h = nu(c) ? c.default : c;
                            ((o.mods[l] = c), (o.components[l] = h));
                            const g = (h.__vccOpts || h)[t];
                            return g && mt(g, n, s, o, l, r)();
                        }),
                    );
                }
        }
    return i;
}
function di(e) {
    const t = ce(or),
        n = ce(Zo),
        s = Ve(() => {
            const a = Vt(e.to);
            return t.resolve(a);
        }),
        r = Ve(() => {
            const { matched: a } = s.value,
                { length: f } = a,
                c = a[f - 1],
                h = n.matched;
            if (!c || !h.length) return -1;
            const p = h.findIndex(Kt.bind(null, c));
            if (p > -1) return p;
            const g = hi(a[f - 2]);
            return f > 1 && hi(c) === g && h[h.length - 1].path !== g
                ? h.findIndex(Kt.bind(null, a[f - 2]))
                : p;
        }),
        i = Ve(() => r.value > -1 && ef(n.params, s.value.params)),
        o = Ve(
            () => r.value > -1 && r.value === n.matched.length - 1 && Go(n.params, s.value.params),
        );
    function l(a = {}) {
        if (Zu(a)) {
            const f = t[Vt(e.replace) ? 'replace' : 'push'](Vt(e.to)).catch(ln);
            return (
                e.viewTransition &&
                    typeof document < 'u' &&
                    'startViewTransition' in document &&
                    document.startViewTransition(() => f),
                f
            );
        }
        return Promise.resolve();
    }
    return { route: s, href: Ve(() => s.value.href), isActive: i, isExactActive: o, navigate: l };
}
function Xu(e) {
    return e.length === 1 ? e[0] : e;
}
const Yu = Qi({
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
        useLink: di,
        setup(e, { slots: t }) {
            const n = ts(di(e)),
                { options: s } = ce(or),
                r = Ve(() => ({
                    [mi(e.activeClass, s.linkActiveClass, 'router-link-active')]: n.isActive,
                    [mi(e.exactActiveClass, s.linkExactActiveClass, 'router-link-exact-active')]:
                        n.isExactActive,
                }));
            return () => {
                const i = t.default && Xu(t.default(n));
                return e.custom
                    ? i
                    : xo(
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
    Qu = Yu;
function Zu(e) {
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
function ef(e, t) {
    for (const n in t) {
        const s = t[n],
            r = e[n];
        if (typeof s == 'string') {
            if (s !== r) return !1;
        } else if (!$e(r) || r.length !== s.length || s.some((i, o) => i !== r[o])) return !1;
    }
    return !0;
}
function hi(e) {
    return e ? (e.aliasOf ? e.aliasOf.path : e.path) : '';
}
const mi = (e, t, n) => e ?? t ?? n,
    tf = Qi({
        name: 'RouterView',
        inheritAttrs: !1,
        props: { name: { type: String, default: 'default' }, route: Object },
        compatConfig: { MODE: 3 },
        setup(e, { attrs: t, slots: n }) {
            const s = ce($s),
                r = Ve(() => e.route || s.value),
                i = ce(fi, 0),
                o = Ve(() => {
                    let f = Vt(i);
                    const { matched: c } = r.value;
                    let h;
                    for (; (h = c[f]) && !h.components;) f++;
                    return f;
                }),
                l = Ve(() => r.value.matched[o.value]);
            ($t(
                fi,
                Ve(() => o.value + 1),
            ),
                $t(Ju, l),
                $t($s, r));
            const a = Vl();
            return (
                rn(
                    () => [a.value, l.value, e.name],
                    ([f, c, h], [p, g, R]) => {
                        (c &&
                            ((c.instances[h] = f),
                            g &&
                                g !== c &&
                                f &&
                                f === p &&
                                (c.leaveGuards.size || (c.leaveGuards = g.leaveGuards),
                                c.updateGuards.size || (c.updateGuards = g.updateGuards))),
                            f &&
                                c &&
                                (!g || !Kt(c, g) || !p) &&
                                (c.enterCallbacks[h] || []).forEach((A) => A(f)));
                    },
                    { flush: 'post' },
                ),
                () => {
                    const f = r.value,
                        c = e.name,
                        h = l.value,
                        p = h && h.components[c];
                    if (!p) return pi(n.default, { Component: p, route: f });
                    const g = h.props[c],
                        R = g ? (g === !0 ? f.params : typeof g == 'function' ? g(f) : g) : null,
                        z = xo(
                            p,
                            X({}, R, t, {
                                onVnodeUnmounted: (F) => {
                                    F.component.isUnmounted && (h.instances[c] = null);
                                },
                                ref: a,
                            }),
                        );
                    return pi(n.default, { Component: z, route: f }) || z;
                }
            );
        },
    });
function pi(e, t) {
    if (!e) return null;
    const n = e(t);
    return n.length === 1 ? n[0] : n;
}
const nf = tf;
function sf(e) {
    const t = Du(e.routes, e),
        n = e.parseQuery || Gu,
        s = e.stringifyQuery || ui,
        r = e.history,
        i = Xt(),
        o = Xt(),
        l = Xt(),
        a = Vn(ut);
    let f = ut;
    Rt &&
        e.scrollBehavior &&
        'scrollRestoration' in history &&
        (history.scrollRestoration = 'manual');
    const c = Cs.bind(null, (y) => '' + y),
        h = Cs.bind(null, pu),
        p = Cs.bind(null, vn);
    function g(y, I) {
        let M, O;
        return (Jo(y) ? ((M = t.getRecordMatcher(y)), (O = I)) : (O = y), t.addRoute(O, M));
    }
    function R(y) {
        const I = t.getRecordMatcher(y);
        I && t.removeRoute(I);
    }
    function A() {
        return t.getRoutes().map((y) => y.record);
    }
    function z(y) {
        return !!t.getRecordMatcher(y);
    }
    function F(y, I) {
        if (((I = X({}, I || a.value)), typeof y == 'string')) {
            const m = _s(n, y, I.path),
                v = t.resolve({ path: m.path }, I),
                C = r.createHref(m.fullPath);
            return X(m, v, {
                params: p(v.params),
                hash: vn(m.hash),
                redirectedFrom: void 0,
                href: C,
            });
        }
        let M;
        if (y.path != null) M = X({}, y, { path: _s(n, y.path, I.path).path });
        else {
            const m = X({}, y.params);
            for (const v in m) m[v] == null && delete m[v];
            ((M = X({}, y, { params: h(m) })), (I.params = h(I.params)));
        }
        const O = t.resolve(M, I),
            se = y.hash || '';
        O.params = c(p(O.params));
        const u = yu(s, X({}, y, { hash: du(se), path: O.path })),
            d = r.createHref(u);
        return X({ fullPath: u, hash: se, query: s === ui ? qu(y.query) : y.query || {} }, O, {
            redirectedFrom: void 0,
            href: d,
        });
    }
    function V(y) {
        return typeof y == 'string' ? _s(n, y, a.value.path) : X({}, y);
    }
    function H(y, I) {
        if (f !== y) return Wt(8, { from: I, to: y });
    }
    function T(y) {
        return ae(y);
    }
    function ne(y) {
        return T(X(V(y), { replace: !0 }));
    }
    function me(y) {
        const I = y.matched[y.matched.length - 1];
        if (I && I.redirect) {
            const { redirect: M } = I;
            let O = typeof M == 'function' ? M(y) : M;
            return (
                typeof O == 'string' &&
                    ((O = O.includes('?') || O.includes('#') ? (O = V(O)) : { path: O }),
                    (O.params = {})),
                X({ query: y.query, hash: y.hash, params: O.path != null ? {} : y.params }, O)
            );
        }
    }
    function ae(y, I) {
        const M = (f = F(y)),
            O = a.value,
            se = y.state,
            u = y.force,
            d = y.replace === !0,
            m = me(M);
        if (m)
            return ae(
                X(V(m), {
                    state: typeof m == 'object' ? X({}, se, m.state) : se,
                    force: u,
                    replace: d,
                }),
                I || M,
            );
        const v = M;
        v.redirectedFrom = I;
        let C;
        return (
            !u && bu(s, O, M) && ((C = Wt(16, { to: v, from: O })), De(O, O, !0, !1)),
            (C ? Promise.resolve(C) : He(v, O))
                .catch((b) => (Ze(b) ? (Ze(b, 2) ? b : ct(b)) : J(b, v, O)))
                .then((b) => {
                    if (b) {
                        if (Ze(b, 2))
                            return ae(
                                X({ replace: d }, V(b.to), {
                                    state: typeof b.to == 'object' ? X({}, se, b.to.state) : se,
                                    force: u,
                                }),
                                I || v,
                            );
                    } else b = yt(v, O, !0, d, se);
                    return (at(v, O, b), b);
                })
        );
    }
    function Fe(y, I) {
        const M = H(y, I);
        return M ? Promise.reject(M) : Promise.resolve();
    }
    function lt(y) {
        const I = Mt.values().next().value;
        return I && typeof I.runWithContext == 'function' ? I.runWithContext(y) : y();
    }
    function He(y, I) {
        let M;
        const [O, se, u] = rf(y, I);
        M = Ps(O.reverse(), 'beforeRouteLeave', y, I);
        for (const m of O)
            m.leaveGuards.forEach((v) => {
                M.push(mt(v, y, I));
            });
        const d = Fe.bind(null, y, I);
        return (
            M.push(d),
            Re(M)
                .then(() => {
                    M = [];
                    for (const m of i.list()) M.push(mt(m, y, I));
                    return (M.push(d), Re(M));
                })
                .then(() => {
                    M = Ps(se, 'beforeRouteUpdate', y, I);
                    for (const m of se)
                        m.updateGuards.forEach((v) => {
                            M.push(mt(v, y, I));
                        });
                    return (M.push(d), Re(M));
                })
                .then(() => {
                    M = [];
                    for (const m of u)
                        if (m.beforeEnter)
                            if ($e(m.beforeEnter))
                                for (const v of m.beforeEnter) M.push(mt(v, y, I));
                            else M.push(mt(m.beforeEnter, y, I));
                    return (M.push(d), Re(M));
                })
                .then(
                    () => (
                        y.matched.forEach((m) => (m.enterCallbacks = {})),
                        (M = Ps(u, 'beforeRouteEnter', y, I, lt)),
                        M.push(d),
                        Re(M)
                    ),
                )
                .then(() => {
                    M = [];
                    for (const m of o.list()) M.push(mt(m, y, I));
                    return (M.push(d), Re(M));
                })
                .catch((m) => (Ze(m, 8) ? m : Promise.reject(m)))
        );
    }
    function at(y, I, M) {
        l.list().forEach((O) => lt(() => O(y, I, M)));
    }
    function yt(y, I, M, O, se) {
        const u = H(y, I);
        if (u) return u;
        const d = I === ut,
            m = Rt ? history.state : {};
        (M &&
            (O || d
                ? r.replace(y.fullPath, X({ scroll: d && m && m.scroll }, se))
                : r.push(y.fullPath, se)),
            (a.value = y),
            De(y, I, M, d),
            ct());
    }
    let je;
    function zt() {
        je ||
            (je = r.listen((y, I, M) => {
                if (!En.listening) return;
                const O = F(y),
                    se = me(O);
                if (se) {
                    ae(X(se, { replace: !0, force: !0 }), O).catch(ln);
                    return;
                }
                f = O;
                const u = a.value;
                (Rt && Lu(ti(u.fullPath, M.delta), as()),
                    He(O, u)
                        .catch((d) =>
                            Ze(d, 12)
                                ? d
                                : Ze(d, 2)
                                  ? (ae(X(V(d.to), { force: !0 }), O)
                                        .then((m) => {
                                            Ze(m, 20) &&
                                                !M.delta &&
                                                M.type === yn.pop &&
                                                r.go(-1, !1);
                                        })
                                        .catch(ln),
                                    Promise.reject())
                                  : (M.delta && r.go(-M.delta, !1), J(d, O, u)),
                        )
                        .then((d) => {
                            ((d = d || yt(O, u, !1)),
                                d &&
                                    (M.delta && !Ze(d, 8)
                                        ? r.go(-M.delta, !1)
                                        : M.type === yn.pop && Ze(d, 20) && r.go(-1, !1)),
                                at(O, u, d));
                        })
                        .catch(ln));
            }));
    }
    let xt = Xt(),
        he = Xt(),
        ee;
    function J(y, I, M) {
        ct(y);
        const O = he.list();
        return (O.length ? O.forEach((se) => se(y, I, M)) : console.error(y), Promise.reject(y));
    }
    function Ye() {
        return ee && a.value !== ut
            ? Promise.resolve()
            : new Promise((y, I) => {
                  xt.add([y, I]);
              });
    }
    function ct(y) {
        return (
            ee || ((ee = !y), zt(), xt.list().forEach(([I, M]) => (y ? M(y) : I())), xt.reset()), y
        );
    }
    function De(y, I, M, O) {
        const { scrollBehavior: se } = e;
        if (!Rt || !se) return Promise.resolve();
        const u =
            (!M && Mu(ti(y.fullPath, 0))) ||
            ((O || !M) && history.state && history.state.scroll) ||
            null;
        return zi()
            .then(() => se(y, I, u))
            .then((d) => d && xu(d))
            .catch((d) => J(d, y, I));
    }
    const we = (y) => r.go(y);
    let Lt;
    const Mt = new Set(),
        En = {
            currentRoute: a,
            listening: !0,
            addRoute: g,
            removeRoute: R,
            clearRoutes: t.clearRoutes,
            hasRoute: z,
            getRoutes: A,
            resolve: F,
            options: e,
            push: T,
            replace: ne,
            go: we,
            back: () => we(-1),
            forward: () => we(1),
            beforeEach: i.add,
            beforeResolve: o.add,
            afterEach: l.add,
            onError: he.add,
            isReady: Ye,
            install(y) {
                const I = this;
                (y.component('RouterLink', Qu),
                    y.component('RouterView', nf),
                    (y.config.globalProperties.$router = I),
                    Object.defineProperty(y.config.globalProperties, '$route', {
                        enumerable: !0,
                        get: () => Vt(a),
                    }),
                    Rt && !Lt && a.value === ut && ((Lt = !0), T(r.location).catch((se) => {})));
                const M = {};
                for (const se in ut)
                    Object.defineProperty(M, se, { get: () => a.value[se], enumerable: !0 });
                (y.provide(or, I), y.provide(Zo, ji(M)), y.provide($s, a));
                const O = y.unmount;
                (Mt.add(y),
                    (y.unmount = function () {
                        (Mt.delete(y),
                            Mt.size < 1 &&
                                ((f = ut),
                                je && je(),
                                (je = null),
                                (a.value = ut),
                                (Lt = !1),
                                (ee = !1)),
                            O());
                    }));
            },
        };
    function Re(y) {
        return y.reduce((I, M) => I.then(() => lt(M)), Promise.resolve());
    }
    return En;
}
function rf(e, t) {
    const n = [],
        s = [],
        r = [],
        i = Math.max(t.matched.length, e.matched.length);
    for (let o = 0; o < i; o++) {
        const l = t.matched[o];
        l && (e.matched.find((f) => Kt(f, l)) ? s.push(l) : n.push(l));
        const a = e.matched[o];
        a && (t.matched.find((f) => Kt(f, a)) || r.push(a));
    }
    return [n, s, r];
}
const of = {
        setup() {
            return { vmPlayerContext: ce('vmPlayerContext') };
        },
        data() {
            return {};
        },
        async beforeMount() {
            await this.setVmsIfNeeded();
        },
        mounted() {
            ((this.onState = async (e) => {
                switch (e) {
                    case 'connected':
                        await this.setVmsIfNeeded();
                        break;
                }
            }),
                this.vmPlayerContext.addEventListener('node-connection-state', this.onState),
                this.vmPlayerContext.addEventListener('vm', this.$forceUpdate));
        },
        unmounted() {
            (this.vmPlayerContext.removeEventListener('node-connection-state', this.onState),
                this.vmPlayerContext.removeEventListener('vm', this.$forceUpdate));
        },
        methods: {
            async setVmsIfNeeded() {
                const e = Te.getVms();
                await this.setVms(e, !1);
            },
            async setVms(e, t) {
                (this.vmPlayerContext.setVms(e, Pn),
                    t && (await this.vmPlayerContext.initInteractively()),
                    Te.setVms(this.vmPlayerContext.getVms()),
                    this.$forceUpdate());
            },
            openMonitor(e) {
                this.$router.push({
                    name: 'vm-monitor',
                    params: { serviceId: gn(e.serviceId), vmId: Wn(e.vmId) },
                });
            },
            closeMonitor(e) {
                e.remove();
                const t = this.vmPlayerContext.getVms();
                (Te.setVms(t), this.$forceUpdate());
            },
            formatServiceId: gn,
            formatVmId: Wn,
        },
    },
    lf = { key: 0, class: 'monitors' },
    af = { class: 'monitor-controls' },
    cf = ['onClick'],
    uf = ['onClick'],
    ff = { class: 'monitor-view' };
function df(e, t, n, s, r, i) {
    const o = fe('Maximize'),
        l = fe('XMark'),
        a = fe('Monitor');
    return (
        P(),
        w(
            $,
            null,
            [
                le(K(void (e.players = s.vmPlayerContext.players)) + ' ', 1),
                e.players.length !== 0
                    ? (P(),
                      w('ul', lf, [
                          (P(!0),
                          w(
                              $,
                              null,
                              st(
                                  e.players,
                                  (f) => (
                                      P(),
                                      w(
                                          'li',
                                          {
                                              key: f.serviceId + '/' + f.vmId,
                                              class: 'monitor-card',
                                          },
                                          [
                                              _('ul', af, [
                                                  _(
                                                      'li',
                                                      null,
                                                      K(
                                                          i.formatServiceId(f.serviceId) +
                                                              '/' +
                                                              i.formatVmId(f.vmId),
                                                      ),
                                                      1,
                                                  ),
                                                  _('li', null, [
                                                      _(
                                                          'button',
                                                          {
                                                              title: 'Maximize',
                                                              onClick: (c) => i.openMonitor(f),
                                                          },
                                                          [G(o)],
                                                          8,
                                                          cf,
                                                      ),
                                                  ]),
                                                  _('li', null, [
                                                      _(
                                                          'button',
                                                          {
                                                              title: 'Remove from the dashboard',
                                                              onClick: (c) => i.closeMonitor(f),
                                                          },
                                                          [G(l)],
                                                          8,
                                                          uf,
                                                      ),
                                                  ]),
                                              ]),
                                              _('div', ff, [
                                                  G(
                                                      a,
                                                      {
                                                          'vm-player': f,
                                                          'max-width': 320,
                                                          'max-height': 200,
                                                      },
                                                      null,
                                                      8,
                                                      ['vm-player'],
                                                  ),
                                              ]),
                                          ],
                                      )
                                  ),
                              ),
                              128,
                          )),
                      ]))
                    : (P(),
                      w(
                          'button',
                          {
                              key: 1,
                              onClick: t[0] || (t[0] = (f) => e.$router.push({ name: 'vms' })),
                          },
                          'Select VMs',
                      )),
            ],
            64,
        )
    );
}
const hf = ue(of, [
        ['render', df],
        ['__scopeId', 'data-v-f06c9f74'],
    ]),
    mf = {
        setup() {
            return { vmPlayerContext: ce('vmPlayerContext') };
        },
        data() {
            return { services: null, selectedVms: new Set(), vmCount: 0 };
        },
        beforeMount() {
            (this.setServices(this.vmPlayerContext.services),
                (this.onServices = (t) => {
                    (this.setServices(t), this.$forceUpdate());
                }),
                this.vmPlayerContext.addEventListener('services', this.onServices),
                this.selectedVms.clear());
            const e = this.vmPlayerContext.getVms();
            for (const [t, n] of e) this.selectedVms.add(t + '/' + n);
        },
        unmounted() {
            this.vmPlayerContext.removeEventListener('services', this.onServices);
        },
        methods: {
            setServices(e) {
                e &&
                    ((this.services = e),
                    (this.vmCount = e.reduce((t, n) => t + n.vms.size, 0)),
                    this.updateSelectedVms());
            },
            updateSelectedVms() {
                const e = new Set();
                for (const t of this.services) for (const n of t.vms.keys()) e.add(t.id + '/' + n);
                for (const t of this.selectedVms.keys()) e.has(t) || this.selectedVms.delete(t);
            },
            formatVm(e, t, n) {
                let s = 'Unknown';
                return (
                    'corevmMeta' in t && (s = `${t.corevmMeta.name}-${t.corevmMeta.version}`),
                    `${s} (${gn(e.id)}/${Wn(n)}@${e.creationSlot})`
                );
            },
            selectionIsEmpty() {
                return this.selectedVms.size === 0;
            },
            allSelected() {
                return this.selectedVms.size === this.vmCount;
            },
            selectAll() {
                this.selectedVms.clear();
                for (const e of this.services)
                    for (const t of e.vms.keys()) this.selectedVms.add(e.id + '/' + t);
            },
            clearSelection() {
                this.selectedVms.clear();
            },
            getSelectedVms() {
                const e = Array.from(this.selectedVms.values()).map((t) =>
                    t.split('/').map((n) => parseInt(n)),
                );
                return (e.sort(), e);
            },
            getAllVms() {
                return this.services.flatMap((e) => Array.from(e.vms.keys()).map((t) => [e.id, t]));
            },
            async apply() {
                const e = this.getSelectedVms();
                (this.vmPlayerContext.setVms(e, Pn),
                    await this.vmPlayerContext.initInteractively(),
                    Te.setVms(this.vmPlayerContext.getVms()),
                    this.$router.push({ name: 'dashboard' }));
            },
        },
    },
    pf = { class: 'services' },
    gf = ['id', 'value'],
    vf = ['for'],
    yf = { class: 'buttons' },
    bf = ['disabled'],
    Cf = ['disabled'],
    _f = ['disabled'];
function Pf(e, t, n, s, r, i) {
    return r.services
        ? (P(),
          w(
              $,
              { key: 1 },
              [
                  r.services.length === 0
                      ? (P(), w($, { key: 0 }, [le('No VMs found.')], 64))
                      : (P(),
                        w(
                            $,
                            { key: 1 },
                            [
                                _('ul', pf, [
                                    (P(!0),
                                    w(
                                        $,
                                        null,
                                        st(
                                            r.services,
                                            (o) => (
                                                P(),
                                                w(
                                                    $,
                                                    { key: o.id },
                                                    [
                                                        (P(!0),
                                                        w(
                                                            $,
                                                            null,
                                                            st(
                                                                o.vms,
                                                                ([l, a]) => (
                                                                    P(),
                                                                    w('li', { key: l }, [
                                                                        le(
                                                                            K(
                                                                                void (e.id =
                                                                                    o.id + '/' + l),
                                                                            ) + ' ',
                                                                            1,
                                                                        ),
                                                                        Dt(
                                                                            _(
                                                                                'input',
                                                                                {
                                                                                    id: e.id,
                                                                                    'onUpdate:modelValue':
                                                                                        t[0] ||
                                                                                        (t[0] = (
                                                                                            f,
                                                                                        ) =>
                                                                                            (r.selectedVms =
                                                                                                f)),
                                                                                    type: 'checkbox',
                                                                                    value: e.id,
                                                                                },
                                                                                null,
                                                                                8,
                                                                                gf,
                                                                            ),
                                                                            [[hc, r.selectedVms]],
                                                                        ),
                                                                        _(
                                                                            'label',
                                                                            { for: e.id },
                                                                            K(i.formatVm(o, a, l)),
                                                                            9,
                                                                            vf,
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
                                ]),
                                _('div', yf, [
                                    _(
                                        'button',
                                        {
                                            disabled: i.selectionIsEmpty(),
                                            onClick:
                                                t[1] || (t[1] = (...o) => i.apply && i.apply(...o)),
                                        },
                                        'Apply',
                                        8,
                                        bf,
                                    ),
                                    _(
                                        'button',
                                        {
                                            disabled: i.allSelected(),
                                            onClick:
                                                t[2] ||
                                                (t[2] = (...o) => i.selectAll && i.selectAll(...o)),
                                        },
                                        'Select all',
                                        8,
                                        Cf,
                                    ),
                                    _(
                                        'button',
                                        {
                                            disabled: i.selectionIsEmpty(),
                                            onClick:
                                                t[3] ||
                                                (t[3] = (...o) =>
                                                    i.clearSelection && i.clearSelection(...o)),
                                        },
                                        'Clear selection',
                                        8,
                                        _f,
                                    ),
                                ]),
                            ],
                            64,
                        )),
              ],
              64,
          ))
        : (P(), w($, { key: 0 }, [le('Fetching...')], 64));
}
const wf = ue(mf, [
    ['render', Pf],
    ['__scopeId', 'data-v-15f89acf'],
]);
function Sf(e) {
    return e.match(/[0-9a-fA-F]{1,8}/) ? parseInt(e, 16) : null;
}
function wn(e) {
    return Sf(e);
}
function Ef(e) {
    return e.match(/[0-9]{1,10}/) ? parseInt(e) : null;
}
function Sn(e) {
    return Ef(e);
}
const xf = {
        setup() {
            return { vmPlayerContext: ce('vmPlayerContext') };
        },
        data() {
            return { onStateChange: null };
        },
        beforeMount() {
            ((this.serviceId = wn(this.$route.params.serviceId)),
                (this.vmId = Sn(this.$route.params.vmId)),
                (this.vmPlayer = this.vmPlayerContext.getVm(this.serviceId, this.vmId)));
        },
        mounted() {
            ((this.onStateChange = () => {
                this.$forceUpdate();
            }),
                this.vmPlayerContext.addEventListener('node-connection-state', this.onStateChange),
                this.vmPlayerContext.addEventListener('best-block', this.onStateChange),
                (this.onVm = () => {
                    this.vmPlayer = this.vmPlayerContext.getVm(this.serviceId, this.vmId);
                }),
                this.vmPlayerContext.addEventListener('vm', this.onVm));
        },
        unmounted() {
            (this.vmPlayerContext.removeEventListener('node-connection-state', this.onStateChange),
                this.vmPlayerContext.removeEventListener('best-block', this.onStateChange),
                this.vmPlayerContext.removeEventListener('vm', this.onVm));
        },
        methods: {
            formatAudioMode: $o,
            formatHash: Hc,
            formatSlot: Uo,
            formatVideoMode: No,
            formatError: Wc,
        },
    },
    Lf = { class: 'content' },
    Mf = { key: 0, class: 'hash' },
    kf = { class: 'error-console' };
function If(e, t, n, s, r, i) {
    const o = fe('PerformanceGraph');
    return (
        P(),
        w('div', Lf, [
            t[5] || (t[5] = _('h2', null, 'Chain', -1)),
            _('ul', null, [
                _('li', null, [
                    t[0] || (t[0] = le(' Head hash: ', -1)),
                    s.vmPlayerContext.bestBlock !== null
                        ? (P(),
                          w(
                              'span',
                              Mf,
                              K(i.formatHash(s.vmPlayerContext.bestBlock.header_hash)),
                              1,
                          ))
                        : D('', !0),
                ]),
                _('li', null, [
                    t[1] || (t[1] = le(' Head slot: ', -1)),
                    s.vmPlayerContext.bestBlock !== null
                        ? (P(),
                          w(
                              $,
                              { key: 0 },
                              [
                                  le(
                                      K(
                                          i.formatSlot(
                                              s.vmPlayerContext.bestBlock.slot,
                                              s.vmPlayerContext.parameters,
                                          ),
                                      ) +
                                          ' (' +
                                          K(s.vmPlayerContext.bestBlock.slot) +
                                          ')',
                                      1,
                                  ),
                              ],
                              64,
                          ))
                        : D('', !0),
                ]),
            ]),
            e.vmPlayer
                ? (P(),
                  w(
                      $,
                      { key: 0 },
                      [
                          t[3] || (t[3] = _('h2', null, 'Output streams', -1)),
                          _('ul', null, [
                              _(
                                  'li',
                                  null,
                                  'Video: ' +
                                      K(
                                          i.formatVideoMode(
                                              e.vmPlayer.outputVideoMode,
                                              s.vmPlayerContext.parameters,
                                          ),
                                      ),
                                  1,
                              ),
                              _(
                                  'li',
                                  null,
                                  'Audio: ' +
                                      K(
                                          i.formatAudioMode(
                                              e.vmPlayer.outputAudioMode,
                                              s.vmPlayerContext.parameters,
                                          ),
                                      ),
                                  1,
                              ),
                          ]),
                          t[4] || (t[4] = _('h2', null, 'Input streams', -1)),
                          _('ul', null, [
                              _(
                                  'li',
                                  null,
                                  'Video: ' +
                                      K(
                                          i.formatVideoMode(
                                              e.vmPlayer.inputVideoMode,
                                              s.vmPlayerContext.parameters,
                                          ),
                                      ),
                                  1,
                              ),
                              _(
                                  'li',
                                  null,
                                  'Audio: ' +
                                      K(
                                          i.formatAudioMode(
                                              e.vmPlayer.inputAudioMode,
                                              s.vmPlayerContext.parameters,
                                          ),
                                      ),
                                  1,
                              ),
                          ]),
                          G(o, { class: 'output-graph', 'vm-player': e.vmPlayer }, null, 8, [
                              'vm-player',
                          ]),
                          s.vmPlayerContext.unhandledErrors.length !== 0
                              ? (P(),
                                w(
                                    $,
                                    { key: 0 },
                                    [
                                        t[2] || (t[2] = _('h2', null, 'Browser errors', -1)),
                                        _('ul', kf, [
                                            (P(!0),
                                            w(
                                                $,
                                                null,
                                                st(
                                                    s.vmPlayerContext.unhandledErrors,
                                                    (l) => (
                                                        P(),
                                                        w(
                                                            'li',
                                                            { key: l, class: 'error' },
                                                            K(i.formatError(l)),
                                                            1,
                                                        )
                                                    ),
                                                ),
                                                128,
                                            )),
                                        ]),
                                    ],
                                    64,
                                ))
                              : D('', !0),
                      ],
                      64,
                  ))
                : D('', !0),
        ])
    );
}
const Rf = ue(xf, [
        ['render', If],
        ['__scopeId', 'data-v-8cf29dce'],
    ]),
    Af = {
        setup() {
            return { vmPlayerContext: ce('vmPlayerContext') };
        },
        data() {
            return {
                onStateChange: null,
                state: 'disconnected',
                error: '',
                serviceId: 0,
                vmId: 0,
                playingFile: null,
            };
        },
        beforeMount() {
            ((this.serviceId = wn(this.$route.params.serviceId)),
                (this.vmId = Sn(this.$route.params.vmId)),
                (this.vmPlayer = this.vmPlayerContext.getVm(this.serviceId, this.vmId)));
        },
        async mounted() {
            (this.state === 'disconnected' &&
                (this.state = this.vmPlayerContext.builderConnectionState),
                (this.onStateChange = async (e) => {
                    ('error' in e && (this.error = e.error), await this.setState(e.state));
                }),
                this.vmPlayerContext.addEventListener(
                    'builder-connection-state',
                    this.onStateChange,
                ),
                this.vmPlayerContext.addEventListener('node-connection-state', this.$forceUpdate),
                this.vmPlayerContext.addEventListener('input-mode', this.$forceUpdate));
        },
        unmounted() {
            (this.vmPlayerContext.removeEventListener(
                'builder-connection-state',
                this.onStateChange,
            ),
                this.vmPlayerContext.removeEventListener(
                    'node-connection-state',
                    this.$forceUpdate,
                ),
                this.vmPlayerContext.removeEventListener('input-mode', this.$forceUpdate));
        },
        methods: {
            async setState(e) {
                if (this.state !== e) {
                    switch (
                        (console.debug(`State transition: ${this.state} => ${e}`),
                        (this.state = e),
                        e)
                    ) {
                        case 'disconnected':
                            this.vmPlayer && this.vmPlayer.stopAudioCapture();
                            break;
                        case 'connected':
                            break;
                        case 'stopped':
                            this.vmPlayer && this.vmPlayer.stopAudioCapture();
                            break;
                        case 'starting':
                            break;
                        case 'running':
                            break;
                        default:
                            throw new Error(`Invalid state: ${e}`);
                    }
                    this.$forceUpdate();
                }
            },
            async startCapturingAudio() {
                if (!this.vmPlayer) return;
                ((this.error = ''), await this.setState('starting'));
                const e = this.vmPlayer.inputAudioMode;
                let t;
                try {
                    if (!('mediaDevices' in navigator))
                        throw new Error("Browser doesn't support audio capture.");
                    ((t = await navigator.mediaDevices.getUserMedia({
                        audio: {
                            sampleRate: e.sampleRate,
                            channelCount: e.channels,
                            autoGainControl: !1,
                        },
                    })),
                        await this.vmPlayerContext.initInteractively({ capture: !0 }),
                        await this.vmPlayer.startAudioCapture(t),
                        await this.setState('running'));
                } catch (n) {
                    ((this.error = n.toString()), await this.setState('stopped'));
                }
            },
            openFileDialog() {
                ((this.$refs.fileInput.onchange = (e) => {
                    this.startPlayingAudioFile(e.target.files);
                }),
                    this.$refs.fileInput.click());
            },
            async startPlayingAudioFile(e) {
                if (e.length !== 0) {
                    ((this.error = ''), (this.playingFile = null), await this.setState('starting'));
                    try {
                        (await this.vmPlayerContext.initInteractively({ capture: !0 }),
                            await this.vmPlayer.startAudioCapture(e[0]),
                            await this.setState('running'),
                            (this.playingFile = e[0].name));
                    } catch (t) {
                        ((this.error = t.toString()),
                            await this.setState('stopped'),
                            this.vmPlayer.stopAudioCapture());
                    }
                }
            },
            formatAudioMode: $o,
            formatVideoMode: No,
            formatPublicKey: Vo,
        },
    },
    Tf = { key: 0, class: 'buttons' },
    Of = ['title', 'disabled'],
    Vf = ['title', 'disabled'],
    Uf = { ref: 'fileInput', type: 'file', class: 'file-input' },
    Nf = { key: 1 },
    $f = { key: 2, class: 'buttons' },
    Ff = { key: 0 },
    Hf = { key: 1, class: 'error-box' };
function jf(e, t, n, s, r, i) {
    const o = fe('BuilderConnectForm');
    return e.vmPlayer
        ? (P(),
          w(
              $,
              { key: 0 },
              [
                  G(o),
                  r.state === 'connected' ||
                  r.state === 'stopped' ||
                  r.state === 'starting' ||
                  r.state === 'running'
                      ? (P(),
                        w(
                            $,
                            { key: 0 },
                            [
                                t[3] || (t[3] = _('h2', null, 'Input streams', -1)),
                                _('ul', null, [
                                    _(
                                        'li',
                                        null,
                                        'Audio: ' +
                                            K(
                                                i.formatAudioMode(
                                                    e.vmPlayer.inputAudioMode,
                                                    s.vmPlayerContext.parameters,
                                                ),
                                            ),
                                        1,
                                    ),
                                    _(
                                        'li',
                                        null,
                                        'Video: ' +
                                            K(
                                                i.formatVideoMode(
                                                    e.vmPlayer.inputVideoMode,
                                                    s.vmPlayerContext.parameters,
                                                ),
                                            ),
                                        1,
                                    ),
                                    _(
                                        'li',
                                        null,
                                        'Input key: ' +
                                            K(
                                                i.formatPublicKey(
                                                    s.vmPlayerContext.rawInputPublicKey,
                                                ),
                                            ),
                                        1,
                                    ),
                                ]),
                                (r.state === 'connected' || r.state === 'stopped') &&
                                !e.vmPlayer.isAudioCaptureEnabled()
                                    ? (P(),
                                      w('div', Tf, [
                                          _(
                                              'button',
                                              {
                                                  title:
                                                      e.vmPlayer.inputAudioMode === null
                                                          ? 'Audio input is disabled in the VM'
                                                          : '',
                                                  disabled: e.vmPlayer.inputAudioMode === null,
                                                  onClick:
                                                      t[0] ||
                                                      (t[0] = (...l) =>
                                                          i.startCapturingAudio &&
                                                          i.startCapturingAudio(...l)),
                                              },
                                              'Capture audio',
                                              8,
                                              Of,
                                          ),
                                          _(
                                              'button',
                                              {
                                                  title:
                                                      e.vmPlayer.inputAudioMode === null
                                                          ? 'Audio input is disabled in the VM'
                                                          : '',
                                                  disabled: e.vmPlayer.inputAudioMode === null,
                                                  onClick:
                                                      t[1] ||
                                                      (t[1] = (...l) =>
                                                          i.openFileDialog &&
                                                          i.openFileDialog(...l)),
                                              },
                                              'Play audio file',
                                              8,
                                              Vf,
                                          ),
                                          _('input', Uf, null, 512),
                                      ]))
                                    : D('', !0),
                                r.state === 'starting'
                                    ? (P(), w('div', Nf, 'Starting audio capture...'))
                                    : D('', !0),
                                r.state === 'running' && e.vmPlayer.isAudioCaptureEnabled()
                                    ? (P(),
                                      w('div', $f, [
                                          _(
                                              'button',
                                              {
                                                  onClick:
                                                      t[2] || (t[2] = (l) => i.setState('stopped')),
                                              },
                                              'Stop',
                                          ),
                                          r.playingFile
                                              ? (P(),
                                                w('div', Ff, 'Playing ' + K(r.playingFile), 1))
                                              : D('', !0),
                                      ]))
                                    : D('', !0),
                            ],
                            64,
                        ))
                      : D('', !0),
                  t[4] || (t[4] = _('br', null, null, -1)),
                  r.error !== '' ? (P(), w('div', Hf, K(r.error), 1)) : D('', !0),
              ],
              64,
          ))
        : D('', !0);
}
const Df = ue(Af, [
    ['render', jf],
    ['__scopeId', 'data-v-f761b2c1'],
]);
class Bf {
    url;
    #e = 0;
    constructor(t) {
        this.url = t;
    }
    nextId() {
        const t = this.#e;
        return (
            this.#e === Number.MAX_SAFE_INTEGER
                ? (console.debug('JSON RPC id wrapped'), (this.#e = 0))
                : this.#e++,
            t
        );
    }
}
class Kf {
    #e;
    #t = new Map();
    #n = new ls();
    #r;
    #s = 3e4;
    #i = 3e4;
    #l;
    constructor(t, n) {
        ((this.#e = new Bf(Wf(t))),
            n &&
                ('requestTimeout' in n && (this.#s = n.requestTimeout),
                'connectTimeout' in n && (this.#i = n.connectTimeout)));
    }
    open() {
        (this.#r && this.close(),
            (this.#r = new WebSocket(this.#e.url)),
            (this.#l = setTimeout(() => {
                this.socket && this.socket.readyState === WebSocket.CONNECTING && this.close();
            }, this.#i)),
            this.#r.addEventListener('open', async (t) => {
                (clearTimeout(this.#l), await this.#n.fireEvent('open', t));
            }),
            this.#r.addEventListener('message', async (t) => await this.#a(JSON.parse(t.data))),
            this.#r.addEventListener('close', async (t) => {
                (this.#o('WebSocket closed'), await this.#n.fireEvent('close', t));
            }),
            this.#r.addEventListener('error', async (t) => {
                (this.#o(t.reason), await this.#n.fireEvent('error', t));
            }));
    }
    close() {
        this.#r && this.#r.close();
    }
    #o(t) {
        for (const n of this.#t.values()) {
            const s = n.reject;
            s !== void 0 && s(t);
        }
    }
    request(t, n) {
        const s = this.#e.nextId(),
            r = { jsonrpc: '2.0', id: s, method: t, params: n };
        return (
            this.#r.send(JSON.stringify(r)),
            new Promise((o, l) => {
                const a = setTimeout(() => l('Timed out'), this.#s),
                    f = (p) => {
                        (clearTimeout(a), o(p));
                    },
                    c = (p) => {
                        (clearTimeout(a), l(p));
                    },
                    h = this.#t.get(s);
                h === void 0
                    ? this.#t.set(s, { resolve: f, reject: c })
                    : ((h.resolve = f), (h.reject = c), this.#c(h), this.#t.delete(s));
            })
        );
    }
    async #a(t) {
        const n = t.id;
        if (n === void 0) {
            await this.#n.fireEvent('notification', t);
            return;
        }
        const s = this.#t.get(n);
        if (s === void 0) {
            this.#t.set(n, { response: t });
            return;
        }
        ((s.response = t), this.#c(s), this.#t.delete(n));
    }
    #c(t) {
        let n = !1;
        const s = t.response.error;
        s !== void 0 && (t.reject(s), (n = !0));
        const r = t.response.result;
        !n && r !== void 0 && t.resolve(r);
    }
    addEventListener(t, n) {
        this.#n.addEventListener(t, n);
    }
    removeEventListener(t, n) {
        this.#n.removeEventListener(t, n);
    }
}
function Wf(e) {
    return e.startsWith('http://')
        ? 'ws://' + e.slice(7)
        : e.startsWith('https://')
          ? 'wss://' + e.slice(8)
          : e;
}
class zf {
    #e;
    #t = null;
    #n = {};
    #r = new ls();
    #s = null;
    #i;
    #l;
    #o = 'disconnected';
    constructor(t) {
        this.#e = t;
    }
    async connect() {
        (console.debug(`Connecting to ${this.#e}...`),
            this.#c('connecting'),
            (this.#n = {}),
            (this.#t = new Kf(this.#e)),
            this.#t.addEventListener('notification', (t) => {
                const n = t.params?.subscription;
                if (n in this.#n) return this.#n[n](t.params);
                console.debug(`Unknown subscription id: ${n}`);
            }),
            this.#t.addEventListener('open', (t) => {
                (this.#a('open', t), this.#c('connected'));
            }),
            (this.#i = (t) => {
                (this.#a('close', t), this.#c('connecting'), this.reconnect());
            }),
            this.#t.addEventListener('close', this.#i),
            (this.#l = (t) => {
                (this.#a('error', t), this.#c('connecting'), this.reconnect());
            }),
            this.#t.addEventListener('error', this.#l),
            this.#t.open());
    }
    reconnect() {
        (clearTimeout(this.#s), (this.#s = setTimeout(() => this.connect(), Gf)));
    }
    close() {
        (clearTimeout(this.#s),
            this.#t !== null &&
                (this.#t.removeEventListener('close', this.#i),
                this.#t.removeEventListener('error', this.#l),
                this.#t.close()));
    }
    addEventListener(t, n) {
        this.#r.addEventListener(t, n);
    }
    removeEventListener(t, n) {
        this.#r.removeEventListener(t, n);
    }
    #a(t, n) {
        this.#r.fireEvent(t, n);
    }
    #c(t) {
        ((this.#o = t), this.#a('state', t));
    }
    get state() {
        return this.#o;
    }
    async logs(t, n, s) {
        return await this.#t.request('logs', [t, n, s]);
    }
    async subscribeLogs(t, n, s, r) {
        const i = await this.#t.request('subscribeLogs', [t, n, s]);
        return ((this.#n[i] = r), i);
    }
    async unsubscribeLogs(t) {
        (await this.#t.request('unsubscribeLogs', [t]), delete this.#n[t]);
    }
}
const Gf = 3e4,
    qf = 'ws://127.0.0.1:18801',
    Jf = 100,
    Xf = 1e3,
    Yf = {
        setup() {
            const e = ce('vmPlayerContext'),
                t = ce('builder');
            return { vmPlayerContext: e, builder: t };
        },
        data() {
            const e = document.createElement('pre');
            return (
                e.classList.add('log-console'),
                { jsonRpcUrl: qf, serviceId: 0, vmId: 0, logElem: e, subId: null }
            );
        },
        async beforeMount() {
            const e = Te.getBuilderJsonRpcUrl();
            (e !== null && (this.jsonRpcUrl = e),
                (this.serviceId = wn(this.$route.params.serviceId)),
                (this.vmId = Sn(this.$route.params.vmId)),
                this.addEventListeners(),
                this.builder && this.builder.state === 'connected' && (await this.subscribeLogs()));
        },
        mounted() {
            this.updateLogElement();
        },
        async beforeUnmount() {
            (this.logElem.remove(), await this.unsubscribeLogs());
        },
        unmounted() {
            this.builder && this.builder.removeEventListener('state', this.onState);
        },
        methods: {
            updateLogElement() {
                const e = this.$refs.logContainer;
                if (!(!e || e.firstChild === this.logElem)) {
                    for (const t of e.childNodes) t.remove();
                    (e.appendChild(this.logElem), this.$forceUpdate());
                }
            },
            addEventListeners() {
                this.builder &&
                    ((this.onState = async (e) => {
                        switch (e) {
                            case 'disconnected':
                                this.disconnect();
                                break;
                            case 'connecting':
                                await this.connect();
                                break;
                            case 'connected':
                                (await this.subscribeLogs(),
                                    this.updateLogElement(),
                                    this.$forceUpdate());
                                break;
                            default:
                                throw new Error(`Invalid state: ${e}`);
                        }
                    }),
                    this.builder.addEventListener('state', this.onState));
            },
            async connect() {
                ((this.error = ''),
                    (this.jsonRpcUrl = this.jsonRpcUrl.trim()),
                    Te.setBuilderJsonRpcUrl(this.jsonRpcUrl),
                    this.disconnect(),
                    (this.builder = new zf(this.jsonRpcUrl)),
                    await this.builder.connect(),
                    this.addEventListeners());
            },
            disconnect() {
                (this.clearConsole(),
                    this.builder !== null && (this.builder.close(), (this.builder = null)));
            },
            clearConsole() {
                for (const e of this.logElem.childNodes) e.remove();
            },
            trimConsole(e) {
                const t = this.logElem;
                for (; t.childNodes.length !== 0 && t.childNodes.length + e > Xf;)
                    t.childNodes[0].remove();
            },
            async subscribeLogs() {
                this.builder !== null &&
                    (await this.unsubscribeLogs(),
                    (this.subId = await this.builder.subscribeLogs(
                        this.serviceId,
                        this.vmId,
                        Jf,
                        (e) => {
                            if (e.error) {
                                console.debug(`Error in builder.subscribeLogs: ${e.error}`);
                                return;
                            }
                            const t = e.result,
                                s = `${new Date(t.timestamp * 1e3).toLocaleString()} ${t.level} ${t.target} ${t.message}
`;
                            (this.trimConsole(1), this.logElem.append(s), this.updateLogElement());
                        },
                    )));
            },
            async unsubscribeLogs() {
                this.subId &&
                    this.builder &&
                    this.builder.state === 'connected' &&
                    (await this.builder.unsubscribeLogs(this.subId), (this.subId = null));
            },
        },
    },
    Qf = { key: 2, ref: 'logContainer' };
function Zf(e, t, n, s, r, i) {
    return (
        P(),
        w(
            $,
            null,
            [
                !s.builder || s.builder.state === 'disconnected'
                    ? (P(),
                      w(
                          $,
                          { key: 0 },
                          [
                              Dt(
                                  _(
                                      'input',
                                      {
                                          id: 'jsonRpcUrl',
                                          'onUpdate:modelValue':
                                              t[0] || (t[0] = (o) => (r.jsonRpcUrl = o)),
                                          type: 'text',
                                          placeholder: 'Builder JSON-RPC URL',
                                      },
                                      null,
                                      512,
                                  ),
                                  [[mn, r.jsonRpcUrl]],
                              ),
                              _(
                                  'button',
                                  {
                                      id: 'connect',
                                      onClick:
                                          t[1] || (t[1] = (...o) => i.connect && i.connect(...o)),
                                  },
                                  'Connect',
                              ),
                          ],
                          64,
                      ))
                    : D('', !0),
                s.builder?.state === 'connecting'
                    ? (P(),
                      w(
                          $,
                          { key: 1 },
                          [
                              _('div', null, 'Connecting to ' + K(r.jsonRpcUrl) + '...', 1),
                              _(
                                  'button',
                                  {
                                      onClick:
                                          t[2] ||
                                          (t[2] = (...o) => i.disconnect && i.disconnect(...o)),
                                  },
                                  'Cancel',
                              ),
                          ],
                          64,
                      ))
                    : D('', !0),
                s.builder?.state === 'connected' ? (P(), w('div', Qf, null, 512)) : D('', !0),
            ],
            64,
        )
    );
}
const ed = ue(Yf, [
        ['render', Zf],
        ['__scopeId', 'data-v-e48607db'],
    ]),
    td = {
        setup() {
            return { vmPlayerContext: ce('vmPlayerContext') };
        },
        data() {
            return { hostMessage: '', consoleMessage: '', serviceId: 0, vmId: 0 };
        },
        beforeMount() {
            ((this.serviceId = wn(this.$route.params.serviceId)),
                (this.vmId = Sn(this.$route.params.vmId)),
                (this.vmPlayer = this.vmPlayerContext.getVm(this.serviceId, this.vmId)));
        },
        mounted() {
            (this.vmPlayerContext.addEventListener('node-connection-state', this.$forceUpdate),
                this.vmPlayerContext.addEventListener(
                    'builder-connection-state',
                    this.$forceUpdate,
                ));
        },
        unmounted() {
            (this.vmPlayerContext.removeEventListener('node-connection-state', this.$forceUpdate),
                this.vmPlayerContext.removeEventListener(
                    'builder-connection-state',
                    this.$forceUpdate,
                ));
        },
        methods: {
            sendHostMessage() {
                const e = new TextEncoder();
                this.vmPlayerContext.getVm(this.serviceId, this.vmId) &&
                    (this.vmPlayerContext.pushHostMessage(
                        this.serviceId,
                        this.vmId,
                        e.encode(this.hostMessage),
                    ),
                    (this.hostMessage = ''));
            },
            sendConsoleChunk() {
                const e = new TextEncoder();
                this.vmPlayerContext.getVm(this.serviceId, this.vmId) &&
                    (this.vmPlayerContext.pushConsoleChunk(
                        this.serviceId,
                        this.vmId,
                        e.encode(this.consoleMessage),
                    ),
                    (this.consoleMessage = ''));
            },
        },
    },
    nd = { key: 0 },
    sd = { key: 1 };
function rd(e, t, n, s, r, i) {
    const o = fe('ConsoleOutput'),
        l = fe('BuilderConnectForm');
    return (
        P(),
        w(
            $,
            null,
            [
                s.vmPlayerContext.nodeConnectionState === 'disconnected'
                    ? (P(), w('div', nd, 'Disconnected'))
                    : D('', !0),
                s.vmPlayerContext.nodeConnectionState === 'connecting'
                    ? (P(), w('div', sd, 'Connecting...'))
                    : D('', !0),
                s.vmPlayerContext.nodeConnectionState === 'connected'
                    ? (P(),
                      w(
                          $,
                          { key: 2 },
                          [
                              t[8] || (t[8] = _('h2', null, 'Output', -1)),
                              e.vmPlayer
                                  ? (P(),
                                    tr(o, { key: 0, 'vm-player': e.vmPlayer }, null, 8, [
                                        'vm-player',
                                    ]))
                                  : D('', !0),
                              t[9] || (t[9] = _('h2', null, 'Input', -1)),
                              G(l),
                              s.vmPlayerContext.builderConnectionState === 'connected'
                                  ? (P(),
                                    w(
                                        $,
                                        { key: 1 },
                                        [
                                            t[6] ||
                                                (t[6] = _('h3', null, 'Send console message', -1)),
                                            _(
                                                'form',
                                                {
                                                    onSubmit:
                                                        t[1] ||
                                                        (t[1] = Dr(
                                                            (...a) =>
                                                                i.sendConsoleChunk &&
                                                                i.sendConsoleChunk(...a),
                                                            ['prevent'],
                                                        )),
                                                },
                                                [
                                                    Dt(
                                                        _(
                                                            'input',
                                                            {
                                                                'onUpdate:modelValue':
                                                                    t[0] ||
                                                                    (t[0] = (a) =>
                                                                        (r.consoleMessage = a)),
                                                                type: 'text',
                                                                placeholder: 'Console message',
                                                                autocomplete: 'off',
                                                            },
                                                            null,
                                                            512,
                                                        ),
                                                        [[mn, r.consoleMessage]],
                                                    ),
                                                    t[4] || (t[4] = _('button', null, 'Send', -1)),
                                                ],
                                                32,
                                            ),
                                            t[7] || (t[7] = _('h3', null, 'Send host message', -1)),
                                            _(
                                                'form',
                                                {
                                                    onSubmit:
                                                        t[3] ||
                                                        (t[3] = Dr(
                                                            (...a) =>
                                                                i.sendHostMessage &&
                                                                i.sendHostMessage(...a),
                                                            ['prevent'],
                                                        )),
                                                },
                                                [
                                                    Dt(
                                                        _(
                                                            'input',
                                                            {
                                                                'onUpdate:modelValue':
                                                                    t[2] ||
                                                                    (t[2] = (a) =>
                                                                        (r.hostMessage = a)),
                                                                type: 'text',
                                                                placeholder: 'Host message',
                                                                autocomplete: 'off',
                                                            },
                                                            null,
                                                            512,
                                                        ),
                                                        [[mn, r.hostMessage]],
                                                    ),
                                                    t[5] || (t[5] = _('button', null, 'Send', -1)),
                                                ],
                                                32,
                                            ),
                                        ],
                                        64,
                                    ))
                                  : D('', !0),
                          ],
                          64,
                      ))
                    : D('', !0),
            ],
            64,
        )
    );
}
const id = ue(td, [
        ['render', rd],
        ['__scopeId', 'data-v-dae0b3a3'],
    ]),
    od = {
        setup() {
            return { vmPlayerContext: ce('vmPlayerContext') };
        },
        data() {
            return { serviceId: 0, vmId: 0 };
        },
        beforeMount() {
            ((this.serviceId = wn(this.$route.params.serviceId)),
                (this.vmId = Sn(this.$route.params.vmId)),
                (this.vmPlayer = this.vmPlayerContext.addVm(this.serviceId, this.vmId, Pn)));
        },
    };
function ld(e, t, n, s, r, i) {
    const o = fe('Monitor', !0);
    return e.vmPlayer
        ? (P(), tr(o, { key: 0, 'vm-player': e.vmPlayer }, null, 8, ['vm-player']))
        : D('', !0);
}
const ad = ue(od, [['render', ld]]),
    el = sf({
        history: Au('./'),
        routes: [
            { path: '/', name: 'dashboard', component: hf },
            { path: '/vms', name: 'vms', component: wf },
            {
                path: '/vm/:serviceId/:vmId/monitor',
                name: 'vm-monitor',
                component: ad,
                meta: { isVmRoute: !0 },
            },
            {
                path: '/vm/:serviceId/:vmId/console',
                name: 'vm-console',
                component: id,
                meta: { isVmRoute: !0 },
            },
            {
                path: '/vm/:serviceId/:vmId/logs',
                name: 'vm-logs',
                component: ed,
                meta: { isVmRoute: !0 },
            },
            {
                path: '/vm/:serviceId/:vmId/input',
                name: 'vm-input',
                component: Df,
                meta: { isVmRoute: !0 },
            },
            {
                path: '/vm/:serviceId/:vmId/stats',
                name: 'vm-stats',
                component: Rf,
                meta: { isVmRoute: !0 },
            },
        ],
    });
el.beforeEach((e, t, n) => {
    if (Object.keys(e.query).length !== 0) {
        n();
        return;
    }
    const s = new URLSearchParams(window.location.search),
        r = {};
    for (const [i, o] of s.entries()) r[i] = o;
    if (Object.keys(r).length === 0) {
        n();
        return;
    }
    ((e.query = r), n(e));
});
const cd = {},
    ud = { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 640 640', class: 'icon' };
function fd(e, t) {
    return (
        P(),
        w(
            'svg',
            ud,
            t[0] ||
                (t[0] = [
                    _(
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
const dd = ue(cd, [['render', fd]]),
    hd = {},
    md = { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 640 640', class: 'icon' };
function pd(e, t) {
    return (
        P(),
        w(
            'svg',
            md,
            t[0] ||
                (t[0] = [
                    _(
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
const gd = ue(hd, [['render', pd]]),
    vd = {},
    yd = { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 640 640', class: 'icon' };
function bd(e, t) {
    return (
        P(),
        w(
            'svg',
            yd,
            t[0] ||
                (t[0] = [
                    _(
                        'path',
                        {
                            d: 'M320 64C267 64 224 107 224 160L224 288C224 341 267 384 320 384C373 384 416 341 416 288L416 160C416 107 373 64 320 64zM176 248C176 234.7 165.3 224 152 224C138.7 224 128 234.7 128 248L128 288C128 385.9 201.3 466.7 296 478.5L296 528L248 528C234.7 528 224 538.7 224 552C224 565.3 234.7 576 248 576L392 576C405.3 576 416 565.3 416 552C416 538.7 405.3 528 392 528L344 528L344 478.5C438.7 466.7 512 385.9 512 288L512 248C512 234.7 501.3 224 488 224C474.7 224 464 234.7 464 248L464 288C464 367.5 399.5 432 320 432C240.5 432 176 367.5 176 288L176 248z',
                        },
                        null,
                        -1,
                    ),
                ]),
        )
    );
}
const Cd = ue(vd, [['render', bd]]),
    _d = {},
    Pd = { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 640 640', class: 'icon' };
function wd(e, t) {
    return (
        P(),
        w(
            'svg',
            Pd,
            t[0] ||
                (t[0] = [
                    _(
                        'path',
                        {
                            d: 'M73 39.1C63.6 29.7 48.4 29.7 39.1 39.1C29.8 48.5 29.7 63.7 39 73.1L567 601.1C576.4 610.5 591.6 610.5 600.9 601.1C610.2 591.7 610.3 576.5 600.9 567.2L456.7 422.8C490.9 388.2 512 340.6 512 288L512 248C512 234.7 501.3 224 488 224C474.7 224 464 234.7 464 248L464 288C464 327.3 448.3 362.9 422.7 388.9L388.8 355C405.6 337.7 416 314 416 288L416 160C416 107 373 64 320 64C267 64 224 107 224 160L224 190.2L73 39.2zM371.3 473.1L329.9 431.7C326.6 431.9 323.4 432 320.1 432C240.6 432 176.1 367.5 176.1 288L176.1 277.8L132.5 234.2C129.7 238.1 128.1 242.9 128.1 248L128.1 288C128.1 385.9 201.4 466.7 296.1 478.5L296.1 528L248.1 528C234.8 528 224.1 538.7 224.1 552C224.1 565.3 234.8 576 248.1 576L392.1 576C405.4 576 416.1 565.3 416.1 552C416.1 538.7 405.4 528 392.1 528L344.1 528L344.1 478.5C353.4 477.3 362.5 475.5 371.4 473.1z',
                        },
                        null,
                        -1,
                    ),
                ]),
        )
    );
}
const Sd = ue(_d, [['render', wd]]),
    Ed = {},
    xd = { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 640 640', class: 'icon' };
function Ld(e, t) {
    return (
        P(),
        w(
            'svg',
            xd,
            t[0] ||
                (t[0] = [
                    _(
                        'path',
                        {
                            d: 'M352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 96L288 306.7L246.6 265.3C234.1 252.8 213.8 252.8 201.3 265.3C188.8 277.8 188.8 298.1 201.3 310.6L297.3 406.6C309.8 419.1 330.1 419.1 342.6 406.6L438.6 310.6C451.1 298.1 451.1 277.8 438.6 265.3C426.1 252.8 405.8 252.8 393.3 265.3L352 306.7L352 96zM160 384C124.7 384 96 412.7 96 448L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 448C544 412.7 515.3 384 480 384L433.1 384L376.5 440.6C345.3 471.8 294.6 471.8 263.4 440.6L206.9 384L160 384zM464 440C477.3 440 488 450.7 488 464C488 477.3 477.3 488 464 488C450.7 488 440 477.3 440 464C440 450.7 450.7 440 464 440z',
                        },
                        null,
                        -1,
                    ),
                ]),
        )
    );
}
const Md = ue(Ed, [['render', Ld]]),
    kd = {},
    Id = { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 640 640', class: 'icon' };
function Rd(e, t) {
    return (
        P(),
        w(
            'svg',
            Id,
            t[0] ||
                (t[0] = [
                    _(
                        'path',
                        {
                            d: 'M183.1 137.4C170.6 124.9 150.3 124.9 137.8 137.4C125.3 149.9 125.3 170.2 137.8 182.7L275.2 320L137.9 457.4C125.4 469.9 125.4 490.2 137.9 502.7C150.4 515.2 170.7 515.2 183.2 502.7L320.5 365.3L457.9 502.6C470.4 515.1 490.7 515.1 503.2 502.6C515.7 490.1 515.7 469.8 503.2 457.3L365.8 320L503.1 182.6C515.6 170.1 515.6 149.8 503.1 137.3C490.6 124.8 470.3 124.8 457.8 137.3L320.5 274.7L183.1 137.4z',
                        },
                        null,
                        -1,
                    ),
                ]),
        )
    );
}
const Ad = ue(kd, [['render', Rd]]),
    Td = {},
    Od = { xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 640 640', class: 'icon' };
function Vd(e, t) {
    return (
        P(),
        w(
            'svg',
            Od,
            t[0] ||
                (t[0] = [
                    _(
                        'path',
                        {
                            d: 'M264 96L120 96C106.7 96 96 106.7 96 120L96 264C96 273.7 101.8 282.5 110.8 286.2C119.8 289.9 130.1 287.8 137 281L177 241L256 320L177 399L137 359C130.1 352.1 119.8 350.1 110.8 353.8C101.8 357.5 96 366.3 96 376L96 520C96 533.3 106.7 544 120 544L264 544C273.7 544 282.5 538.2 286.2 529.2C289.9 520.2 287.9 509.9 281 503L241 463L320 384L399 463L359 503C352.1 509.9 350.1 520.2 353.8 529.2C357.5 538.2 366.3 544 376 544L520 544C533.3 544 544 533.3 544 520L544 376C544 366.3 538.2 357.5 529.2 353.8C520.2 350.1 509.9 352.1 503 359L463 399L384 320L463 241L503 281C509.9 287.9 520.2 289.9 529.2 286.2C538.2 282.5 544 273.7 544 264L544 120C544 106.7 533.3 96 520 96L376 96C366.3 96 357.5 101.8 353.8 110.8C350.1 119.8 352.2 130.1 359 137L399 177L320 256L241 177L281 137C287.9 130.1 289.9 119.8 286.2 110.8C282.5 101.8 273.7 96 264 96z',
                        },
                        null,
                        -1,
                    ),
                ]),
        )
    );
}
const Ud = ue(Td, [['render', Vd]]),
    Nd = 40,
    $d = 60,
    Fd = 100,
    Hd = 8,
    jd = ['fetch', 'transcode', 'buffering', 'video', 'audio'],
    Dd = {
        props: { vmPlayer: { type: Object, required: !0 } },
        setup() {
            const e = ce('vmPlayerContext'),
                t = zl('timeline');
            return { vmPlayerContext: e, timeline: t };
        },
        data() {
            return {
                onBestBlock: null,
                onUpdate: null,
                onScroll: null,
                onScrollEnd: null,
                isScrolling: !1,
                currentSlot: 0,
                SLOT_WIDTH: $d,
                STAGE_HEIGHT: Nd,
                LABEL_WIDTH: Fd,
                LABEL_GAP: Hd,
                NAMES: jd,
            };
        },
        mounted() {
            ((this.onBestBlock = (e) => {
                ((this.currentSlot = e.slot), this.onUpdate());
            }),
                (this.onUpdate = () => {
                    (!this.isScrolling &&
                        document.activeElement !== this.timeline &&
                        this.timeline.scrollTo({
                            top: 0,
                            left: this.timeline.scrollWidth,
                            behavior: 'smooth',
                        }),
                        this.$forceUpdate());
                }),
                this.vmPlayerContext.addEventListener('parameters', this.onUpdate),
                this.vmPlayerContext.addEventListener('best-block', this.onBestBlock),
                this.vmPlayer.addEventListener('timeline', this.onUpdate),
                (this.onScroll = () => {
                    this.isScrolling = !0;
                }),
                (this.onScrollEnd = () => {
                    this.isScrolling = !1;
                }),
                this.timeline.addEventListener('scroll', this.onScroll),
                this.timeline.addEventListener('scrollend', this.onScrollEnd));
        },
        beforeUnmount() {
            (this.timeline.removeEventListener('scroll', this.onScroll),
                this.timeline.removeEventListener('scrollend', this.onScrollEnd));
        },
        unmounted() {
            (this.vmPlayer.removeEventListener('timeline', this.onUpdate),
                this.vmPlayerContext.removeEventListener('parameters', this.onUpdate),
                this.vmPlayerContext.removeEventListener('best-block', this.onBestBlock));
        },
        methods: {
            downloadAsCSV() {
                if (!this.vmPlayer.timeline) return;
                const e = this.vmPlayer.timeline.toCSV(),
                    t = new Blob([e], { type: 'text/csv' }),
                    n = document.createElement('a');
                n.style.display = 'none';
                try {
                    ((n.href = URL.createObjectURL(t)),
                        (n.download = `corevm-monitor-${new Date().toISOString()}.csv`),
                        document.body.appendChild(n),
                        n.click());
                } finally {
                    (URL.revokeObjectURL(n.href), n.remove());
                }
            },
        },
    },
    Bd = { ref: 'timeline', class: 'timeline' },
    Kd = { key: 0, class: 'graph-container' },
    Wd = ['viewBox', 'width', 'height'],
    zd = ['x1', 'x2', 'y2'],
    Gd = ['x1', 'x2', 'y2'],
    qd = ['x', 'y', 'width', 'height'],
    Jd = ['x', 'y'];
function Xd(e, t, n, s, r, i) {
    const o = fe('Download');
    return (
        P(),
        w(
            'div',
            Bd,
            [
                n.vmPlayer.timeline
                    ? (P(),
                      w('div', Kd, [
                          le(
                              K(void (e.slotCount = n.vmPlayer.timeline.slotCount)) +
                                  ' ' +
                                  K(
                                      void (e.maxSlot = Math.max(
                                          r.currentSlot,
                                          n.vmPlayer.timeline.maxSlot,
                                      )),
                                  ) +
                                  ' ' +
                                  K(
                                      void (e.minSlot =
                                          e.slotCount === 0
                                              ? r.currentSlot
                                              : Math.max(
                                                    n.vmPlayer.timeline.minSlot,
                                                    e.maxSlot - n.vmPlayer.timeline.maxSlotCount,
                                                )),
                                  ) +
                                  ' ' +
                                  K(
                                      void (e.width =
                                          r.LABEL_WIDTH +
                                          r.LABEL_GAP +
                                          r.SLOT_WIDTH * (e.maxSlot - e.minSlot + 1)),
                                  ) +
                                  ' ' +
                                  K(void (e.height = r.STAGE_HEIGHT * r.NAMES.length)) +
                                  ' ',
                              1,
                          ),
                          s.vmPlayerContext.parameters !== null && r.NAMES.length !== 0
                              ? (P(),
                                w(
                                    'svg',
                                    {
                                        key: 0,
                                        viewBox: `0 0 ${e.width + 1} ${e.height}`,
                                        width: e.width,
                                        height: e.height,
                                        xmlns: 'http://www.w3.org/2000/svg',
                                    },
                                    [
                                        (P(!0),
                                        w(
                                            $,
                                            null,
                                            st(
                                                e.maxSlot - e.minSlot,
                                                (l) => (
                                                    P(),
                                                    w(
                                                        $,
                                                        { key: 'tick' + l },
                                                        [
                                                            le(
                                                                K(void (e.x = l * r.SLOT_WIDTH)) +
                                                                    ' ',
                                                                1,
                                                            ),
                                                            _(
                                                                'line',
                                                                {
                                                                    x1: e.x,
                                                                    y1: 0,
                                                                    x2: e.x,
                                                                    y2: e.height,
                                                                    class: 'grid',
                                                                },
                                                                null,
                                                                8,
                                                                zd,
                                                            ),
                                                        ],
                                                        64,
                                                    )
                                                ),
                                            ),
                                            128,
                                        )),
                                        le(
                                            ' ' +
                                                K(
                                                    void (e.x =
                                                        (r.currentSlot - e.minSlot) * r.SLOT_WIDTH),
                                                ) +
                                                ' ',
                                            1,
                                        ),
                                        _(
                                            'line',
                                            {
                                                x1: e.x,
                                                y1: 0,
                                                x2: e.x,
                                                y2: e.height,
                                                class: 'grid current-slot',
                                            },
                                            null,
                                            8,
                                            Gd,
                                        ),
                                        le(
                                            ' ' +
                                                K(
                                                    void (e.slotPeriod =
                                                        s.vmPlayerContext.parameters.slot_period_sec),
                                                ) +
                                                ' ',
                                            1,
                                        ),
                                        (P(!0),
                                        w(
                                            $,
                                            null,
                                            st(
                                                n.vmPlayer.timeline.slices.entries(),
                                                ([l, a]) => (
                                                    P(),
                                                    w(
                                                        $,
                                                        { key: l },
                                                        [
                                                            (P(!0),
                                                            w(
                                                                $,
                                                                null,
                                                                st(
                                                                    r.NAMES,
                                                                    (f, c) => (
                                                                        P(),
                                                                        w(
                                                                            $,
                                                                            { key: l + f },
                                                                            [
                                                                                le(
                                                                                    K(
                                                                                        void (e.events =
                                                                                            a.get(
                                                                                                f,
                                                                                            )),
                                                                                    ) + ' ',
                                                                                    1,
                                                                                ),
                                                                                e.events !== void 0
                                                                                    ? (P(!0),
                                                                                      w(
                                                                                          $,
                                                                                          {
                                                                                              key: 0,
                                                                                          },
                                                                                          st(
                                                                                              e.events,
                                                                                              (
                                                                                                  h,
                                                                                                  p,
                                                                                              ) => (
                                                                                                  P(),
                                                                                                  w(
                                                                                                      $,
                                                                                                      {
                                                                                                          key:
                                                                                                              l +
                                                                                                              f +
                                                                                                              p,
                                                                                                      },
                                                                                                      [
                                                                                                          le(
                                                                                                              K(
                                                                                                                  void (e.offsetInSlots =
                                                                                                                      l -
                                                                                                                      e.minSlot),
                                                                                                              ) +
                                                                                                                  ' ' +
                                                                                                                  K(
                                                                                                                      void (e.startTimeInSlots =
                                                                                                                          h.startTime /
                                                                                                                          e.slotPeriod),
                                                                                                                  ) +
                                                                                                                  ' ' +
                                                                                                                  K(
                                                                                                                      void (e.durationInSlots =
                                                                                                                          (h.endTime -
                                                                                                                              h.startTime) /
                                                                                                                          e.slotPeriod),
                                                                                                                  ) +
                                                                                                                  ' ',
                                                                                                              1,
                                                                                                          ),
                                                                                                          _(
                                                                                                              'rect',
                                                                                                              {
                                                                                                                  x:
                                                                                                                      r.SLOT_WIDTH *
                                                                                                                      (e.offsetInSlots +
                                                                                                                          e.startTimeInSlots),
                                                                                                                  y:
                                                                                                                      r.STAGE_HEIGHT *
                                                                                                                      c,
                                                                                                                  width:
                                                                                                                      r.SLOT_WIDTH *
                                                                                                                      e.durationInSlots,
                                                                                                                  height: r.STAGE_HEIGHT,
                                                                                                                  class: 'graph',
                                                                                                              },
                                                                                                              [
                                                                                                                  _(
                                                                                                                      'title',
                                                                                                                      null,
                                                                                                                      K(
                                                                                                                          f,
                                                                                                                      ) +
                                                                                                                          ': ' +
                                                                                                                          K(
                                                                                                                              (
                                                                                                                                  h.endTime -
                                                                                                                                  h.startTime
                                                                                                                              ).toFixed(
                                                                                                                                  2,
                                                                                                                              ),
                                                                                                                          ) +
                                                                                                                          ' s ',
                                                                                                                      1,
                                                                                                                  ),
                                                                                                              ],
                                                                                                              8,
                                                                                                              qd,
                                                                                                          ),
                                                                                                      ],
                                                                                                      64,
                                                                                                  )
                                                                                              ),
                                                                                          ),
                                                                                          128,
                                                                                      ))
                                                                                    : D('', !0),
                                                                            ],
                                                                            64,
                                                                        )
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
                                        (P(!0),
                                        w(
                                            $,
                                            null,
                                            st(
                                                r.NAMES,
                                                (l, a) => (
                                                    P(),
                                                    w(
                                                        'text',
                                                        {
                                                            key: l,
                                                            x:
                                                                r.SLOT_WIDTH *
                                                                    (e.maxSlot - e.minSlot + 1) +
                                                                r.LABEL_GAP,
                                                            y: r.STAGE_HEIGHT * (a + 0.5),
                                                            class: 'name',
                                                        },
                                                        K(l),
                                                        9,
                                                        Jd,
                                                    )
                                                ),
                                            ),
                                            128,
                                        )),
                                    ],
                                    8,
                                    Wd,
                                ))
                              : D('', !0),
                          _(
                              'div',
                              { class: 'button-panel', style: Yn('width: ' + e.width + 'px') },
                              [
                                  _(
                                      'button',
                                      {
                                          title: 'Download as CSV',
                                          class: 'button',
                                          onClick:
                                              t[0] ||
                                              (t[0] = (...l) =>
                                                  i.downloadAsCSV && i.downloadAsCSV(...l)),
                                      },
                                      [G(o)],
                                  ),
                              ],
                              4,
                          ),
                      ]))
                    : D('', !0),
            ],
            512,
        )
    );
}
const Yd = ue(Dd, [
        ['render', Xd],
        ['__scopeId', 'data-v-83b0b6de'],
    ]),
    lr = {
        props: {
            vmPlayer: { type: Object, required: !0 },
            maxWidth: { type: Number, default: 99999 },
            maxHeight: { type: Number, default: 99999 },
            center: { type: Boolean, default: !1 },
        },
        setup() {
            return { vmPlayerContext: ce('vmPlayerContext') };
        },
        data() {
            return {};
        },
        mounted() {
            ((this.redraw = () => this.$forceUpdate()),
                this.vmPlayer.addEventListener('console', this.redraw));
        },
        unmounted() {
            this.vmPlayer.removeEventListener('console', this.redraw);
        },
        updated() {
            this.scrollToBottom();
        },
        methods: {
            scrollToBottom() {
                const e = this.$refs.console;
                e !== null &&
                    document.activeElement !== e &&
                    e.scrollTo({ top: e.scrollHeight, left: 0, behavior: 'smooth' });
            },
        },
    },
    gi = () => {
        ko((e) => ({ daa05832: e.maxWidth, ad08a1b4: e.maxHeight }));
    },
    vi = lr.setup;
lr.setup = vi ? (e, t) => (gi(), vi(e, t)) : gi;
function Qd(e, t, n, s, r, i) {
    return (
        P(),
        w(
            $,
            null,
            [
                le(K(void (e.consoleText = n.vmPlayer?.getConsoleText())) + ' ', 1),
                e.consoleText
                    ? (P(),
                      w('pre', { key: 0, ref: 'console', class: 'console' }, K(e.consoleText), 513))
                    : (P(),
                      w('div', { key: 1, class: Qn(n.center ? 'center' : '') }, 'No output', 2)),
            ],
            64,
        )
    );
}
const Zd = ue(lr, [
        ['render', Qd],
        ['__scopeId', 'data-v-efc9a5ae'],
    ]),
    eh = 'wss://builder.jamtoaster.network',
    th = {
        setup() {
            return { vmPlayerContext: ce('vmPlayerContext') };
        },
        data() {
            return { onStateChange: null, builderUrl: eh, state: 'disconnected', error: '' };
        },
        beforeMount() {
            const e = Te.getBuilderRpcUrl();
            e !== null && (this.builderUrl = e);
        },
        async mounted() {
            (this.state === 'disconnected' &&
                (this.state = this.vmPlayerContext.builderConnectionState),
                (this.onStateChange = async (e) => {
                    ('error' in e && (this.error = e.error), await this.setState(e.state));
                }),
                this.vmPlayerContext.addEventListener(
                    'builder-connection-state',
                    this.onStateChange,
                ));
        },
        unmounted() {
            this.vmPlayerContext.removeEventListener(
                'builder-connection-state',
                this.onStateChange,
            );
        },
        methods: {
            async setState(e) {
                if (this.state !== e) {
                    switch (
                        (console.debug(`State transition: ${this.state} => ${e}`),
                        (this.state = e),
                        e)
                    ) {
                        case 'disconnected':
                            this.vmPlayerContext.disconnectFromCoreVmBuilder();
                            break;
                        case 'connecting':
                            await this.connect();
                            break;
                        case 'connected':
                            break;
                        default:
                            throw new Error(`Invalid state: ${e}`);
                    }
                    this.$forceUpdate();
                }
            },
            async connect() {
                ((this.error = ''),
                    (this.builderUrl = this.builderUrl.trim()),
                    Te.setBuilderRpcUrl(this.builderUrl),
                    await this.vmPlayerContext.connectToCoreVmBuilder(this.builderUrl));
            },
        },
    },
    nh = { key: 0, class: 'error-box' },
    sh = { key: 2 };
function rh(e, t, n, s, r, i) {
    return (
        P(),
        w(
            $,
            null,
            [
                r.error !== '' ? (P(), w('div', nh, K(r.error), 1)) : D('', !0),
                r.state === 'disconnected'
                    ? (P(),
                      w(
                          $,
                          { key: 1 },
                          [
                              Dt(
                                  _(
                                      'input',
                                      {
                                          'onUpdate:modelValue':
                                              t[0] || (t[0] = (o) => (r.builderUrl = o)),
                                          class: 'url-input',
                                          type: 'text',
                                          placeholder: 'Builder URL',
                                      },
                                      null,
                                      512,
                                  ),
                                  [[mn, r.builderUrl]],
                              ),
                              _(
                                  'button',
                                  {
                                      class: 'connect-button',
                                      onClick: t[1] || (t[1] = (o) => i.setState('connecting')),
                                  },
                                  'Connect',
                              ),
                          ],
                          64,
                      ))
                    : D('', !0),
                r.state === 'connecting'
                    ? (P(), w('div', sh, 'Connecting to ' + K(r.builderUrl) + '...', 1))
                    : D('', !0),
                r.state === 'connected'
                    ? (P(),
                      w(
                          $,
                          { key: 3 },
                          [
                              _('div', null, 'Connected to ' + K(r.builderUrl), 1),
                              _(
                                  'button',
                                  { onClick: t[2] || (t[2] = (o) => i.setState('disconnected')) },
                                  'Disconnect',
                              ),
                          ],
                          64,
                      ))
                    : D('', !0),
            ],
            64,
        )
    );
}
const ih = ue(th, [
        ['render', rh],
        ['__scopeId', 'data-v-df6f9098'],
    ]),
    oh = {
        props: { vmPlayer: { type: Object, required: !0 }, video: { type: Boolean, required: !0 } },
        setup() {
            return { vmPlayerContext: ce('vmPlayerContext') };
        },
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
            formatTime: Ho,
        },
    },
    lh = { class: 'time' },
    ah = { key: 0, class: 'button-container' },
    ch = ['value'],
    uh = { key: 1, class: 'button-container' },
    fh = ['value'],
    dh = { key: 1, class: 'button-container' };
function hh(e, t, n, s, r, i) {
    const o = fe('SpeakerMuted'),
        l = fe('Speaker'),
        a = fe('MicrophoneMuted'),
        f = fe('Microphone');
    return (
        P(),
        w(
            $,
            null,
            [
                _('div', lh, K(i.formatTime(n.vmPlayer.timestamp)), 1),
                n.vmPlayer.outputAudioMode && n.vmPlayer.audioPlayer
                    ? (P(),
                      w('div', ah, [
                          n.vmPlayer.audioPlayer.playbackVolume === 0
                              ? (P(),
                                w(
                                    'button',
                                    {
                                        key: 0,
                                        class: 'icon-button',
                                        title: 'Unmute',
                                        onClick:
                                            t[0] ||
                                            (t[0] = (...c) =>
                                                i.unmutePlayback && i.unmutePlayback(...c)),
                                    },
                                    [G(o)],
                                ))
                              : D('', !0),
                          n.vmPlayer.audioPlayer.playbackVolume !== 0
                              ? (P(),
                                w(
                                    'button',
                                    {
                                        key: 1,
                                        class: 'icon-button',
                                        title: 'Mute',
                                        onClick:
                                            t[1] ||
                                            (t[1] = (...c) =>
                                                i.mutePlayback && i.mutePlayback(...c)),
                                    },
                                    [G(l)],
                                ))
                              : D('', !0),
                          _(
                              'input',
                              {
                                  value: n.vmPlayer.audioPlayer.playbackVolume,
                                  type: 'range',
                                  min: '0',
                                  max: '1',
                                  step: '0.01',
                                  onInput:
                                      t[2] || (t[2] = (c) => i.setPlaybackVolume(c.target.value)),
                              },
                              null,
                              40,
                              ch,
                          ),
                      ]))
                    : D('', !0),
                n.vmPlayer.inputAudioMode && n.vmPlayer.audioPlayer
                    ? (P(),
                      w('div', uh, [
                          n.vmPlayer.audioPlayer.captureVolume === 0
                              ? (P(),
                                w(
                                    'button',
                                    {
                                        key: 0,
                                        class: 'icon-button',
                                        title: 'Unmute capture',
                                        onClick:
                                            t[3] ||
                                            (t[3] = (...c) =>
                                                i.unmuteCapture && i.unmuteCapture(...c)),
                                    },
                                    [G(a)],
                                ))
                              : D('', !0),
                          n.vmPlayer.audioPlayer.captureVolume !== 0
                              ? (P(),
                                w(
                                    'button',
                                    {
                                        key: 1,
                                        class: 'icon-button',
                                        title: 'Mute capture',
                                        onClick:
                                            t[4] ||
                                            (t[4] = (...c) => i.muteCapture && i.muteCapture(...c)),
                                    },
                                    [G(f)],
                                ))
                              : D('', !0),
                          _(
                              'input',
                              {
                                  value: n.vmPlayer.audioPlayer.captureVolume,
                                  type: 'range',
                                  min: '0',
                                  max: '1',
                                  step: '0.01',
                                  onInput:
                                      t[5] || (t[5] = (c) => i.setCaptureVolume(c.target.value)),
                              },
                              null,
                              40,
                              fh,
                          ),
                      ]))
                    : D('', !0),
                n.video
                    ? D('', !0)
                    : (P(),
                      w(
                          $,
                          { key: 2 },
                          [
                              (n.vmPlayer.outputAudioMode || n.vmPlayer.inputAudioMode) &&
                              !n.vmPlayer.audioPlayer
                                  ? (P(),
                                    w(
                                        'button',
                                        {
                                            key: 0,
                                            onClick:
                                                t[6] ||
                                                (t[6] = (...c) =>
                                                    i.enableAudio && i.enableAudio(...c)),
                                        },
                                        'Click to enable audio',
                                    ))
                                  : D('', !0),
                              s.vmPlayerContext.connectionState === 'buffering'
                                  ? (P(), w('div', dh, 'Buffering...'))
                                  : D('', !0),
                          ],
                          64,
                      )),
            ],
            64,
        )
    );
}
const mh = ue(oh, [
        ['render', hh],
        ['__scopeId', 'data-v-46ae42de'],
    ]),
    ar = {
        props: {
            vmPlayer: { type: Object, required: !0 },
            maxWidth: { type: Number, default: 99999 },
            maxHeight: { type: Number, default: 99999 },
        },
        setup() {
            return { vmPlayerContext: ce('vmPlayerContext') };
        },
        data() {
            return { monitorWidth: 640, monitorHeight: 480 };
        },
        mounted() {
            (this.vmPlayerContext.addEventListener('node-connection-state', this.$forceUpdate),
                this.vmPlayer.addEventListener('engine-state', this.$forceUpdate),
                (this.onVideo = (e) => {
                    ((this.monitorWidth = e.monitorWidth), (this.monitorHeight = e.monitorHeight));
                }),
                this.vmPlayer.addEventListener('video', this.onVideo),
                this.vmPlayer.videoPlayer.updateElements());
        },
        unmounted() {
            (this.vmPlayerContext.removeEventListener('node-connection-state', this.$forceUpdate),
                this.vmPlayer.removeEventListener('engine-state', this.$forceUpdate),
                this.vmPlayer.removeEventListener('video', this.onVideo));
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
            formatServiceId: gn,
            formatSlot(e) {
                return Uo(e, this.vmPlayerContext.parameters);
            },
            formatTime: Ho,
            generateCanvasId: Pn,
        },
    },
    yi = () => {
        ko((e) => ({
            '9c1b4c38': e.monitorWidth,
            '7289e8c9': e.monitorHeight,
            '1b1d57cc': e.maxWidth,
            '41ea3553': e.maxHeight,
        }));
    },
    bi = ar.setup;
ar.setup = bi ? (e, t) => (yi(), bi(e, t)) : yi;
const ph = { class: 'connecting' },
    gh = { key: 0 },
    vh = { key: 0, class: 'monitor-container' },
    yh = { key: 0, class: 'buffering' },
    bh = ['id'],
    Ch = { class: 'video-panel' },
    _h = { key: 1, class: 'audio-panel' },
    Ph = { key: 2, class: 'monitor' };
function wh(e, t, n, s, r, i) {
    const o = fe('AudioPlayer'),
        l = fe('ConsoleOutput');
    return (
        P(),
        w('div', ph, [
            s.vmPlayerContext.nodeConnectionState === 'connecting'
                ? (P(), w('div', gh, 'Connecting...'))
                : (P(),
                  w(
                      $,
                      { key: 1 },
                      [
                          n.vmPlayer.outputVideoMode
                              ? (P(),
                                w('div', vh, [
                                    n.vmPlayer.outputAudioMode &&
                                    !n.vmPlayer.isAudioPlaybackEnabled()
                                        ? (P(),
                                          w(
                                              'button',
                                              {
                                                  key: 0,
                                                  class: 'enable-audio-button',
                                                  onClick:
                                                      t[0] ||
                                                      (t[0] = (...a) =>
                                                          i.enableAudio && i.enableAudio(...a)),
                                              },
                                              'Click to enable audio',
                                          ))
                                        : (P(),
                                          w(
                                              $,
                                              { key: 1 },
                                              [
                                                  n.vmPlayer.engineState === 'buffering'
                                                      ? (P(), w('div', yh, 'Buffering...'))
                                                      : D('', !0),
                                              ],
                                              64,
                                          )),
                                    _(
                                        'canvas',
                                        {
                                            id: i.generateCanvasId(
                                                n.vmPlayer.serviceId,
                                                n.vmPlayer.vmId,
                                            ),
                                            class: 'monitor monitor-on-grid',
                                            onClick:
                                                t[1] ||
                                                (t[1] = (a) => n.vmPlayer.enableAudioPlayback()),
                                        },
                                        null,
                                        8,
                                        bh,
                                    ),
                                    _('div', Ch, [
                                        G(o, { 'vm-player': n.vmPlayer, video: !0 }, null, 8, [
                                            'vm-player',
                                        ]),
                                    ]),
                                ]))
                              : D('', !0),
                          !n.vmPlayer.outputVideoMode && n.vmPlayer.outputAudioMode
                              ? (P(),
                                w('div', _h, [
                                    G(o, { 'vm-player': n.vmPlayer, video: !1 }, null, 8, [
                                        'vm-player',
                                    ]),
                                ]))
                              : D('', !0),
                          !n.vmPlayer.outputVideoMode && !n.vmPlayer.outputAudioMode
                              ? (P(),
                                w('div', Ph, [
                                    G(
                                        l,
                                        {
                                            'vm-player': n.vmPlayer,
                                            'max-width': n.maxWidth,
                                            'max-height': n.maxHeight,
                                            center: !0,
                                        },
                                        null,
                                        8,
                                        ['vm-player', 'max-width', 'max-height'],
                                    ),
                                ]))
                              : D('', !0),
                      ],
                      64,
                  )),
        ])
    );
}
const Sh = ue(ar, [
        ['render', wh],
        ['__scopeId', 'data-v-ad9b8460'],
    ]),
    Eh = {
        data() {
            return { isSecureContext: window.isSecureContext, warningClosed: !1 };
        },
        methods: {
            closeWarning() {
                this.warningClosed = !0;
            },
        },
    },
    xh = { key: 0, class: 'warning' };
function Lh(e, t, n, s, r, i) {
    const o = fe('XMark');
    return !r.isSecureContext && !r.warningClosed
        ? (P(),
          w('div', xh, [
              t[1] || (t[1] = le(' ❗ CoreVM monitor needs ', -1)),
              t[2] ||
                  (t[2] = _(
                      'a',
                      {
                          href: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/isSecureContext',
                      },
                      'secure context',
                      -1,
                  )),
              t[3] || (t[3] = le(' to work properly. ', -1)),
              _(
                  'button',
                  { onClick: t[0] || (t[0] = (...l) => i.closeWarning && i.closeWarning(...l)) },
                  [G(o)],
              ),
          ]))
        : D('', !0);
}
const Mh = ue(Eh, [
        ['render', Lh],
        ['__scopeId', 'data-v-580e2c7f'],
    ]),
    kh = {
        emits: ['disconnect-from-jam-node'],
        setup() {
            return { vmPlayerContext: ce('vmPlayerContext') };
        },
        data() {
            return { isVmRoute: !1 };
        },
        watch: {
            $route(e) {
                this.isVmRoute = e.meta.isVmRoute;
            },
        },
        mounted() {
            ((this.onState = (e) => {
                this.$forceUpdate();
            }),
                this.vmPlayerContext.addEventListener('node-connection-state', this.onState),
                (this.isVmRoute = this.$route.meta.isVmRoute));
        },
        unmounted() {
            this.vmPlayerContext.removeEventListener('node-connection-state', this.onState);
        },
        methods: {
            vmMinimize() {
                this.$router.push({ name: 'dashboard' });
            },
            vmLink(e) {
                const t = this.$route.params.serviceId,
                    n = this.$route.params.vmId;
                return { name: e, params: { serviceId: t, vmId: n } };
            },
            formatServiceId: gn,
            formatVmId: Wn,
        },
    },
    Ih = { class: 'menu' },
    Rh = { key: 0 },
    Ah = { key: 1 };
function Th(e, t, n, s, r, i) {
    const o = fe('RouterLink');
    return (
        P(),
        w('nav', Ih, [
            s.vmPlayerContext.nodeConnectionState === 'connected'
                ? (P(),
                  w(
                      $,
                      { key: 0 },
                      [
                          r.isVmRoute
                              ? (P(),
                                w('ul', Rh, [
                                    _(
                                        'li',
                                        null,
                                        'VM ' +
                                            K(e.$route.params.serviceId) +
                                            '/' +
                                            K(e.$route.params.vmId),
                                        1,
                                    ),
                                    _('li', null, [
                                        G(
                                            o,
                                            { to: i.vmLink('vm-monitor') },
                                            {
                                                default: ft(
                                                    () => t[2] || (t[2] = [le('Monitor', -1)]),
                                                ),
                                                _: 1,
                                                __: [2],
                                            },
                                            8,
                                            ['to'],
                                        ),
                                    ]),
                                    _('li', null, [
                                        G(
                                            o,
                                            { to: i.vmLink('vm-console') },
                                            {
                                                default: ft(
                                                    () => t[3] || (t[3] = [le('Console', -1)]),
                                                ),
                                                _: 1,
                                                __: [3],
                                            },
                                            8,
                                            ['to'],
                                        ),
                                    ]),
                                    _('li', null, [
                                        G(
                                            o,
                                            { to: i.vmLink('vm-logs') },
                                            {
                                                default: ft(
                                                    () => t[4] || (t[4] = [le('Logs', -1)]),
                                                ),
                                                _: 1,
                                                __: [4],
                                            },
                                            8,
                                            ['to'],
                                        ),
                                    ]),
                                    _('li', null, [
                                        G(
                                            o,
                                            { to: i.vmLink('vm-input') },
                                            {
                                                default: ft(
                                                    () => t[5] || (t[5] = [le('Input', -1)]),
                                                ),
                                                _: 1,
                                                __: [5],
                                            },
                                            8,
                                            ['to'],
                                        ),
                                    ]),
                                    _('li', null, [
                                        G(
                                            o,
                                            { to: i.vmLink('vm-stats') },
                                            {
                                                default: ft(
                                                    () => t[6] || (t[6] = [le('Stats', -1)]),
                                                ),
                                                _: 1,
                                                __: [6],
                                            },
                                            8,
                                            ['to'],
                                        ),
                                    ]),
                                    _('li', null, [
                                        _(
                                            'button',
                                            {
                                                onClick:
                                                    t[0] ||
                                                    (t[0] = (...l) =>
                                                        i.vmMinimize && i.vmMinimize(...l)),
                                            },
                                            'Minimize',
                                        ),
                                    ]),
                                ]))
                              : (P(),
                                w('ul', Ah, [
                                    _('li', null, [
                                        G(
                                            o,
                                            { to: { name: 'dashboard' } },
                                            {
                                                default: ft(
                                                    () => t[7] || (t[7] = [le('Dashboard', -1)]),
                                                ),
                                                _: 1,
                                                __: [7],
                                            },
                                        ),
                                    ]),
                                    _('li', null, [
                                        G(
                                            o,
                                            { to: { name: 'vms' } },
                                            {
                                                default: ft(() => t[8] || (t[8] = [le('VMs', -1)])),
                                                _: 1,
                                                __: [8],
                                            },
                                        ),
                                    ]),
                                    _('li', null, [
                                        _(
                                            'button',
                                            {
                                                onClick:
                                                    t[1] ||
                                                    (t[1] = (l) =>
                                                        e.$emit('disconnect-from-jam-node')),
                                            },
                                            'Close',
                                        ),
                                    ]),
                                ])),
                      ],
                      64,
                  ))
                : D('', !0),
        ])
    );
}
const Oh = ue(kh, [
        ['render', Th],
        ['__scopeId', 'data-v-633200e4'],
    ]),
    Ce = bc(tu);
Ce.component('Speaker', dd);
Ce.component('SpeakerMuted', gd);
Ce.component('Microphone', Cd);
Ce.component('MicrophoneMuted', Sd);
Ce.component('Download', Md);
Ce.component('XMark', Ad);
Ce.component('Maximize', Ud);
Ce.component('PerformanceGraph', Yd);
Ce.component('ConsoleOutput', Zd);
Ce.component('BuilderConnectForm', ih);
Ce.component('AudioPlayer', mh);
Ce.component('Monitor', Sh);
Ce.component('SecurityWarning', Mh);
Ce.component('TopPanel', Oh);
Ce.use(el);
Ce.mount('#app');
