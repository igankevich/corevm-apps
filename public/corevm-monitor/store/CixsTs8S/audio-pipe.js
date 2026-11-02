(function () {
    'use strict';
    globalThis.TextDecoder = class {
        decode() {
            return '';
        }
    };
    let n;
    function U(s) {
        n = s;
    }
    function v(s) {
        E === i.length && i.push(i.length + 1);
        const t = E;
        return ((E = i[t]), (i[t] = s), t);
    }
    function u(s) {
        if (h == 1) throw new Error('out of js stack');
        return ((i[--h] = s), h);
    }
    function W(s, t) {
        return ((s = s >>> 0), j().subarray(s / 4, s / 4 + t));
    }
    let w = null;
    function j() {
        return ((w === null || w.byteLength === 0) && (w = new Float32Array(n.memory.buffer)), w);
    }
    function B(s, t) {
        return ((s = s >>> 0), V(s, t));
    }
    let b = null;
    function G() {
        return ((b === null || b.byteLength === 0) && (b = new Uint8Array(n.memory.buffer)), b);
    }
    function F(s) {
        return i[s];
    }
    let i = new Array(128).fill(void 0);
    i.push(void 0, null, !0, !1);
    let E = i.length,
        h = 128,
        y = new TextDecoder('utf-8', { ignoreBOM: !0, fatal: !0 });
    y.decode();
    const H = 2146435072;
    let N = 0;
    function V(s, t) {
        return (
            (N += t),
            N >= H &&
                ((y = new TextDecoder('utf-8', { ignoreBOM: !0, fatal: !0 })), y.decode(), (N = t)),
            y.decode(G().subarray(s, s + t))
        );
    }
    const O =
            typeof FinalizationRegistry > 'u'
                ? { register: () => {}, unregister: () => {} }
                : new FinalizationRegistry((s) =>
                      n.__wbg_chunkedinterleavedresampler_free(s >>> 0, 1),
                  ),
        z =
            typeof FinalizationRegistry > 'u'
                ? { register: () => {}, unregister: () => {} }
                : new FinalizationRegistry((s) => n.__wbg_chunkedresampler_free(s >>> 0, 1)),
        M =
            typeof FinalizationRegistry > 'u'
                ? { register: () => {}, unregister: () => {} }
                : new FinalizationRegistry((s) => n.__wbg_resampleoutcome_free(s >>> 0, 1));
    typeof FinalizationRegistry > 'u' ||
        new FinalizationRegistry((s) => n.__wbg_wholeresampler_free(s >>> 0, 1));
    class P {
        __destroy_into_raw() {
            const t = this.__wbg_ptr;
            return ((this.__wbg_ptr = 0), O.unregister(this), t);
        }
        free() {
            const t = this.__destroy_into_raw();
            n.__wbg_chunkedinterleavedresampler_free(t, 0);
        }
        get numChannels() {
            return n.chunkedinterleavedresampler_numChannels(this.__wbg_ptr) >>> 0;
        }
        resampleExact(t, e) {
            try {
                const r = n.chunkedinterleavedresampler_resampleExact(this.__wbg_ptr, u(t), u(e));
                return c.__wrap(r);
            } finally {
                ((i[h++] = void 0), (i[h++] = void 0));
            }
        }
        get inputSampleRate() {
            return n.chunkedinterleavedresampler_inputSampleRate(this.__wbg_ptr) >>> 0;
        }
        get outputSampleRate() {
            return n.chunkedinterleavedresampler_outputSampleRate(this.__wbg_ptr) >>> 0;
        }
        maxNumOutputFrames(t) {
            return n.chunkedinterleavedresampler_maxNumOutputFrames(this.__wbg_ptr, t) >>> 0;
        }
        set outputSampleRate(t) {
            n.chunkedinterleavedresampler_set_outputSampleRate(this.__wbg_ptr, t);
        }
        constructor(t, e, r) {
            const a = n.chunkedinterleavedresampler_new(t, e, r);
            return ((this.__wbg_ptr = a >>> 0), O.register(this, this.__wbg_ptr, this), this);
        }
        reset() {
            n.chunkedinterleavedresampler_reset(this.__wbg_ptr);
        }
        resample(t, e) {
            try {
                const r = n.chunkedinterleavedresampler_resample(this.__wbg_ptr, u(t), u(e));
                return c.__wrap(r);
            } finally {
                ((i[h++] = void 0), (i[h++] = void 0));
            }
        }
    }
    Symbol.dispose && (P.prototype[Symbol.dispose] = P.prototype.free);
    class T {
        __destroy_into_raw() {
            const t = this.__wbg_ptr;
            return ((this.__wbg_ptr = 0), z.unregister(this), t);
        }
        free() {
            const t = this.__destroy_into_raw();
            n.__wbg_chunkedresampler_free(t, 0);
        }
        resampleExact(t, e) {
            try {
                const r = n.chunkedresampler_resampleExact(this.__wbg_ptr, u(t), u(e));
                return c.__wrap(r);
            } finally {
                ((i[h++] = void 0), (i[h++] = void 0));
            }
        }
        get inputSampleRate() {
            return n.chunkedresampler_inputSampleRate(this.__wbg_ptr) >>> 0;
        }
        get outputSampleRate() {
            return n.chunkedresampler_outputSampleRate(this.__wbg_ptr) >>> 0;
        }
        maxNumOutputFrames(t) {
            return n.chunkedresampler_maxNumOutputFrames(this.__wbg_ptr, t) >>> 0;
        }
        set outputSampleRate(t) {
            n.chunkedresampler_set_outputSampleRate(this.__wbg_ptr, t);
        }
        constructor(t, e) {
            const r = n.chunkedresampler_new(t, e);
            return ((this.__wbg_ptr = r >>> 0), z.register(this, this.__wbg_ptr, this), this);
        }
        reset() {
            n.chunkedresampler_reset(this.__wbg_ptr);
        }
        resample(t, e) {
            try {
                const r = n.chunkedresampler_resample(this.__wbg_ptr, u(t), u(e));
                return c.__wrap(r);
            } finally {
                ((i[h++] = void 0), (i[h++] = void 0));
            }
        }
    }
    Symbol.dispose && (T.prototype[Symbol.dispose] = T.prototype.free);
    class c {
        static __wrap(t) {
            t = t >>> 0;
            const e = Object.create(c.prototype);
            return ((e.__wbg_ptr = t), M.register(e, e.__wbg_ptr, e), e);
        }
        __destroy_into_raw() {
            const t = this.__wbg_ptr;
            return ((this.__wbg_ptr = 0), M.unregister(this), t);
        }
        free() {
            const t = this.__destroy_into_raw();
            n.__wbg_resampleoutcome_free(t, 0);
        }
        get numRead() {
            return n.__wbg_get_resampleoutcome_numRead(this.__wbg_ptr) >>> 0;
        }
        set numRead(t) {
            n.__wbg_set_resampleoutcome_numRead(this.__wbg_ptr, t);
        }
        get numWritten() {
            return n.__wbg_get_resampleoutcome_numWritten(this.__wbg_ptr) >>> 0;
        }
        set numWritten(t) {
            n.__wbg_set_resampleoutcome_numWritten(this.__wbg_ptr, t);
        }
    }
    Symbol.dispose && (c.prototype[Symbol.dispose] = c.prototype.free);
    function X(s, t) {
        throw new Error(B(s, t));
    }
    function Y(s) {
        return F(s).length;
    }
    function J(s) {
        const t = new Float32Array(s >>> 0);
        return v(t);
    }
    function q(s, t, e) {
        Float32Array.prototype.set.call(W(s, t), F(e));
    }
    function K(s, t, e) {
        F(s)[t >>> 0] = e;
    }
    function Q(s) {
        return v(s);
    }
    function Z(s) {
        U(s);
    }
    const tt = Object.freeze({
        './lanczos_resampler_bg.js': {
            __wbg___wbindgen_throw_dd24417ed36fc46e: X,
            __wbg_length_86ce4877baf913bb: Y,
            __wbg_new_with_length_95ba657dfb7d3dfb: J,
            __wbg_prototypesetcall_96cc7097487b926d: q,
            __wbg_set_index_165b46b0114d368c: K,
            __wbindgen_cast_d6cd19b81560fd6e: Q,
        },
    });
    class et {
        #r;
        #t;
        #e = 0;
        #s = 0;
        #n = 0;
        constructor(t) {
            if (t === 0) throw new TypeError('Invalid max. length');
            ((this.#r = new Float32Array(t)), (this.#t = t));
        }
        push(t) {
            if (this.#e !== this.#t)
                ((this.#r[this.#e++] = t), (this.#n += (t - this.#n) / this.#e));
            else {
                const e = this.#r[this.#s];
                ((this.#r[this.#s++] = t),
                    this.#s === this.#t && (this.#s = 0),
                    (this.#n += (t - e) / this.#t));
            }
        }
        get value() {
            return this.#n;
        }
    }
    const p = Object.freeze({ SUSPENDED: 0, RUNNING: 1 }),
        A = 0.01 * sampleRate,
        C = 2 * A,
        st = 100,
        rt = 100,
        nt = 0.2;
    let I = !1;
    async function it(s) {
        if (I) return;
        const t = await WebAssembly.instantiate(s, tt);
        (Z(t.exports), (I = !0));
    }
    class at extends AudioWorkletProcessor {
        #r = [];
        #t = [];
        #e = 0;
        #s = 0;
        #n = 0;
        #o = 0;
        #i = 0;
        #h = p.SUSPENDED;
        #u = 0;
        #l = new et(rt);
        #c = 0;
        #a = 0;
        static get parameterDescriptors() {
            return [
                {
                    name: 'outputLatency',
                    defaultValue: 0,
                    minValue: 0,
                    maxValue: 1,
                    automationRate: 'k-rate',
                },
            ];
        }
        constructor(t) {
            super();
            const e = t.processorOptions.lanczos;
            this.port.onmessage = async (r) => {
                switch (r.data.type) {
                    case 'init': {
                        await it(e);
                        break;
                    }
                    case 'chunk': {
                        const a = r.data;
                        ((a.channels = a.channels.map((l) => new Float32Array(l))),
                            this.#t.push(a));
                        break;
                    }
                    case 'start':
                        await this.#g(r);
                        break;
                    case 'stop':
                        this.#p();
                        break;
                    case 'status':
                        this.#s !== this.#u &&
                            ((this.#u = this.#s),
                            this.port.postMessage({ type: 'status', framesPlayed: this.#s }));
                        break;
                    default:
                        throw new Error(`Invalid message type: ${r.data.type}`);
                }
            };
        }
        process(t, e, r) {
            const a = Date.now(),
                l = a * 0.001,
                o = e[0],
                _ = Math.min(this.#r.length, o.length);
            if (_ === 0) return !0;
            const f = o[0].length;
            this.#l.push(f);
            const $ = r.outputLatency[0],
                ht = (0.1 * this.#l.value) / sampleRate;
            if ((this.#w(l - $ - 2 * ht), !this.#d(l, $))) return !0;
            ((this.#o = a), (this.#s = this.#n));
            let d = 0;
            for (; this.#t.length !== 0 && d !== f;) {
                this.#m();
                const g = this.#t[0];
                let R, L;
                for (let m = 0; m < _; ++m) {
                    const k = this.#r[m],
                        lt = Math.ceil(((o[m].length - d) * this.#a) / k.outputSampleRate),
                        ut = Math.min(g.channels[m].length, this.#e + lt),
                        D = g.channels[m].subarray(this.#e, ut),
                        x = o[m].subarray(d),
                        ct = k.maxNumOutputFrames(D.length) - 1;
                    let S;
                    (2 * ct < x.length ? (S = k.resampleExact(D, x)) : (S = k.resample(D, x)),
                        (R = S.numRead),
                        (L = S.numWritten));
                }
                if (R === 0) {
                    console.debug(
                        `Not enough input samples: ${g.channels[0].length}, offset = ${this.#e}, input sample rate ${this.#a} Hz, output sample rate ${this.#r[0].outputSampleRate} Hz, dst offset ${d}`,
                    );
                    break;
                }
                if (((this.#e += R), (this.#n += R), (d += L), this.#e > g.channels[0].length))
                    throw new Error(`Bad offset: ${this.#e}`);
                this.#e === g.channels[0].length && (this.#t.shift(), (this.#e = 0));
            }
            return ((this.state = d !== f ? p.SUSPENDED : p.RUNNING), !0);
        }
        #m() {
            for (
                ;
                this.#t.length >= 2 &&
                this.#t[0].channels.length !== 0 &&
                this.#t[1].channels.length !== 0 &&
                this.#t[0].channels[0].length - this.#e < this.#a;
            ) {
                const t = this.#t[0],
                    e = this.#t[1],
                    r = t.channels[0].length - this.#e,
                    a = r + e.channels[0].length,
                    l = t.endTime - (t.startTime + this.#e / this.#a);
                for (let o = 0; o < e.channels.length; ++o) {
                    const _ = new Float32Array(a);
                    (_.set(t.channels[o].subarray(this.#e), 0),
                        _.set(e.channels[o], r),
                        (e.channels[o] = _));
                }
                ((e.startTime -= l),
                    this.#t.shift(),
                    (this.#e = 0),
                    console.debug(`Merged chunks; no. of new frames ${r}`));
            }
        }
        #d(t, e) {
            if (this.#t.length === 0 || t - this.#c > nt) return !0;
            this.#c = t;
            const r = this.#l.value,
                a = this.#t[0].startTime + this.#e / this.#a + e,
                l = t - a,
                o = (-l * sampleRate) / (l + (r * st) / sampleRate);
            if (o < -C) return (this.#f(t, l), !0);
            if (o > C) return !1;
            const _ = Math.round(sampleRate + ot(o, -A, A));
            for (const f of this.#r) f.outputSampleRate = _;
            return !0;
        }
        #f(t, e) {
            let r;
            for (; this.#t.length !== 0;) {
                if (((r = this.#t[0]), t < r.startTime)) return;
                if (t < r.endTime) break;
                const a = r.channels[0].length;
                (this.#t.shift(), (this.#s += a));
            }
            if (this.#t.length === 0) {
                ((this.#n = this.#s), (this.#e = 0));
                return;
            }
            ((this.#e = Math.min(r.channels[0].length, Math.round((t - r.startTime) * this.#a))),
                (this.#s += this.#e),
                (this.#n = this.#s));
            for (const a of this.#r) a.reset();
            console.debug(`Fast forward by ${-e} s`);
        }
        set state(t) {
            if (this.#h === t) {
                if (t === p.RUNNING && this.#i !== 0 && this.#o - this.#i > 1e3) {
                    const e = this.#_();
                    this.#i = e.endTime;
                }
                return;
            }
            switch (((this.#h = t), t)) {
                case p.SUSPENDED:
                    this.#i !== 0 && (this.#_(), (this.#i = 0));
                    break;
                case p.RUNNING:
                    this.#i === 0 && (this.#i = this.#o);
                    break;
            }
        }
        #_() {
            const t = sampleRate,
                e = t === 0 ? 0 : (this.#n - this.#s) / t,
                r = { type: 'audio-event', startTime: this.#i, endTime: this.#o + e * 1e3 };
            return (this.port.postMessage(r), r);
        }
        async #g(t) {
            (this.#p(),
                (this.#e = 0),
                (this.#t = []),
                (this.#s = 0),
                (this.#n = 0),
                (this.#i = 0),
                (this.#h = p.SUSPENDED),
                (this.#r = []),
                (this.#a = t.data.mode.sampleRate));
            for (let e = 0; e < t.data.mode.channels; ++e)
                (console.debug(`Resampling from ${t.data.mode.sampleRate} Hz to ${sampleRate} Hz`),
                    this.#r.push(new T(t.data.mode.sampleRate, sampleRate)));
        }
        #p() {
            ((this.#t = []), (this.#e = 0), (this.#s = 0), (this.#n = 0), (this.#o = Date.now()));
        }
        #w(t) {
            const e = this.#t.length;
            for (; this.#t.length !== 0 && this.#t[0].endTime < t;) this.#t.shift();
            if (e !== this.#t.length) {
                const r = e - this.#t.length;
                (console.debug(`Removed ${r} outdated audio chunk(s), offset ${this.#e}`),
                    (this.#e = 0));
            }
        }
    }
    function ot(s, t, e) {
        return s < t ? t : s > e ? e : s;
    }
    registerProcessor('audio-pipe', at);
})();
