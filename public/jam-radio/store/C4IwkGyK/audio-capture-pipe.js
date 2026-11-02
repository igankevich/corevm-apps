(function () {
    'use strict';
    globalThis.TextDecoder = class {
        decode() {
            return '';
        }
    };
    class M extends Error {
        constructor(...e) {
            super(...e);
        }
    }
    const m = Object.freeze({
        S16LE: 1,
        decode(t) {
            const e = t.decodeCompactUint();
            if (e === 1) return m.S16LE;
            throw new Error(`Invalid AudioSampleFormat: ${e}`);
        },
    });
    class h {
        sampleRate;
        channels;
        sampleFormat;
        encodedSize() {
            return 6;
        }
        encode(e) {
            (e.encodeUint32(this.sampleRate),
                e.encodeUint8(this.channels),
                e.encodeCompactUint(this.sampleFormat));
        }
        static decode(e) {
            const r = new h();
            if (
                ((r.sampleRate = e.decodeUint32()),
                (r.channels = e.decodeUint8()),
                (r.sampleFormat = m.decode(e)),
                r.sampleRate === 0 || r.channels === 0)
            )
                throw new M('Invalid AudioMode');
            return r;
        }
        static fromPlain(e) {
            return e == null ? e : Object.assign(new h(), e);
        }
        sampleLen() {
            return this.sampleFormat === m.S16LE ? 2 : 0;
        }
        frameLen() {
            return this.sampleLen() * this.channels;
        }
        bytesPerSecond() {
            return this.sampleRate * this.channels * this.sampleLen();
        }
    }
    function j(t) {
        return Math.trunc(((t + 1) / 2) * 65535 - 32768);
    }
    function U(t, e, r, s, a) {
        for (let c = 0; c < t.length; ++c) (e.setInt16(r, j(t[c]), a), (r += s));
    }
    let n;
    function W(t) {
        n = t;
    }
    function x(t) {
        R === o.length && o.push(o.length + 1);
        const e = R;
        return ((R = o[e]), (o[e] = t), e);
    }
    function l(t) {
        if (i == 1) throw new Error('out of js stack');
        return ((o[--i] = t), i);
    }
    function P(t, e) {
        return ((t = t >>> 0), T().subarray(t / 4, t / 4 + e));
    }
    let g = null;
    function T() {
        return ((g === null || g.byteLength === 0) && (g = new Float32Array(n.memory.buffer)), g);
    }
    function D(t, e) {
        return ((t = t >>> 0), $(t, e));
    }
    let f = null;
    function I() {
        return ((f === null || f.byteLength === 0) && (f = new Uint8Array(n.memory.buffer)), f);
    }
    function y(t) {
        return o[t];
    }
    let o = new Array(128).fill(void 0);
    o.push(void 0, null, !0, !1);
    let R = o.length,
        i = 128,
        w = new TextDecoder('utf-8', { ignoreBOM: !0, fatal: !0 });
    w.decode();
    const B = 2146435072;
    let F = 0;
    function $(t, e) {
        return (
            (F += e),
            F >= B &&
                ((w = new TextDecoder('utf-8', { ignoreBOM: !0, fatal: !0 })), w.decode(), (F = e)),
            w.decode(I().subarray(t, t + e))
        );
    }
    const A =
            typeof FinalizationRegistry > 'u'
                ? { register: () => {}, unregister: () => {} }
                : new FinalizationRegistry((t) =>
                      n.__wbg_chunkedinterleavedresampler_free(t >>> 0, 1),
                  ),
        z =
            typeof FinalizationRegistry > 'u'
                ? { register: () => {}, unregister: () => {} }
                : new FinalizationRegistry((t) => n.__wbg_chunkedresampler_free(t >>> 0, 1)),
        E =
            typeof FinalizationRegistry > 'u'
                ? { register: () => {}, unregister: () => {} }
                : new FinalizationRegistry((t) => n.__wbg_resampleoutcome_free(t >>> 0, 1));
    typeof FinalizationRegistry > 'u' ||
        new FinalizationRegistry((t) => n.__wbg_wholeresampler_free(t >>> 0, 1));
    class O {
        __destroy_into_raw() {
            const e = this.__wbg_ptr;
            return ((this.__wbg_ptr = 0), A.unregister(this), e);
        }
        free() {
            const e = this.__destroy_into_raw();
            n.__wbg_chunkedinterleavedresampler_free(e, 0);
        }
        get numChannels() {
            return n.chunkedinterleavedresampler_numChannels(this.__wbg_ptr) >>> 0;
        }
        resampleExact(e, r) {
            try {
                const s = n.chunkedinterleavedresampler_resampleExact(this.__wbg_ptr, l(e), l(r));
                return u.__wrap(s);
            } finally {
                ((o[i++] = void 0), (o[i++] = void 0));
            }
        }
        get inputSampleRate() {
            return n.chunkedinterleavedresampler_inputSampleRate(this.__wbg_ptr) >>> 0;
        }
        get outputSampleRate() {
            return n.chunkedinterleavedresampler_outputSampleRate(this.__wbg_ptr) >>> 0;
        }
        maxNumOutputFrames(e) {
            return n.chunkedinterleavedresampler_maxNumOutputFrames(this.__wbg_ptr, e) >>> 0;
        }
        set outputSampleRate(e) {
            n.chunkedinterleavedresampler_set_outputSampleRate(this.__wbg_ptr, e);
        }
        constructor(e, r, s) {
            const a = n.chunkedinterleavedresampler_new(e, r, s);
            return ((this.__wbg_ptr = a >>> 0), A.register(this, this.__wbg_ptr, this), this);
        }
        reset() {
            n.chunkedinterleavedresampler_reset(this.__wbg_ptr);
        }
        resample(e, r) {
            try {
                const s = n.chunkedinterleavedresampler_resample(this.__wbg_ptr, l(e), l(r));
                return u.__wrap(s);
            } finally {
                ((o[i++] = void 0), (o[i++] = void 0));
            }
        }
    }
    Symbol.dispose && (O.prototype[Symbol.dispose] = O.prototype.free);
    class k {
        __destroy_into_raw() {
            const e = this.__wbg_ptr;
            return ((this.__wbg_ptr = 0), z.unregister(this), e);
        }
        free() {
            const e = this.__destroy_into_raw();
            n.__wbg_chunkedresampler_free(e, 0);
        }
        resampleExact(e, r) {
            try {
                const s = n.chunkedresampler_resampleExact(this.__wbg_ptr, l(e), l(r));
                return u.__wrap(s);
            } finally {
                ((o[i++] = void 0), (o[i++] = void 0));
            }
        }
        get inputSampleRate() {
            return n.chunkedresampler_inputSampleRate(this.__wbg_ptr) >>> 0;
        }
        get outputSampleRate() {
            return n.chunkedresampler_outputSampleRate(this.__wbg_ptr) >>> 0;
        }
        maxNumOutputFrames(e) {
            return n.chunkedresampler_maxNumOutputFrames(this.__wbg_ptr, e) >>> 0;
        }
        set outputSampleRate(e) {
            n.chunkedresampler_set_outputSampleRate(this.__wbg_ptr, e);
        }
        constructor(e, r) {
            const s = n.chunkedresampler_new(e, r);
            return ((this.__wbg_ptr = s >>> 0), z.register(this, this.__wbg_ptr, this), this);
        }
        reset() {
            n.chunkedresampler_reset(this.__wbg_ptr);
        }
        resample(e, r) {
            try {
                const s = n.chunkedresampler_resample(this.__wbg_ptr, l(e), l(r));
                return u.__wrap(s);
            } finally {
                ((o[i++] = void 0), (o[i++] = void 0));
            }
        }
    }
    Symbol.dispose && (k.prototype[Symbol.dispose] = k.prototype.free);
    class u {
        static __wrap(e) {
            e = e >>> 0;
            const r = Object.create(u.prototype);
            return ((r.__wbg_ptr = e), E.register(r, r.__wbg_ptr, r), r);
        }
        __destroy_into_raw() {
            const e = this.__wbg_ptr;
            return ((this.__wbg_ptr = 0), E.unregister(this), e);
        }
        free() {
            const e = this.__destroy_into_raw();
            n.__wbg_resampleoutcome_free(e, 0);
        }
        get numRead() {
            return n.__wbg_get_resampleoutcome_numRead(this.__wbg_ptr) >>> 0;
        }
        set numRead(e) {
            n.__wbg_set_resampleoutcome_numRead(this.__wbg_ptr, e);
        }
        get numWritten() {
            return n.__wbg_get_resampleoutcome_numWritten(this.__wbg_ptr) >>> 0;
        }
        set numWritten(e) {
            n.__wbg_set_resampleoutcome_numWritten(this.__wbg_ptr, e);
        }
    }
    Symbol.dispose && (u.prototype[Symbol.dispose] = u.prototype.free);
    function N(t, e) {
        throw new Error(D(t, e));
    }
    function H(t) {
        return y(t).length;
    }
    function J(t) {
        const e = new Float32Array(t >>> 0);
        return x(e);
    }
    function V(t, e, r) {
        Float32Array.prototype.set.call(P(t, e), y(r));
    }
    function X(t, e, r) {
        y(t)[e >>> 0] = r;
    }
    function Y(t) {
        return x(t);
    }
    function q(t) {
        W(t);
    }
    const G = Object.freeze({
        './lanczos_resampler_bg.js': {
            __wbg___wbindgen_throw_dd24417ed36fc46e: N,
            __wbg_length_86ce4877baf913bb: H,
            __wbg_new_with_length_95ba657dfb7d3dfb: J,
            __wbg_prototypesetcall_96cc7097487b926d: V,
            __wbg_set_index_165b46b0114d368c: X,
            __wbindgen_cast_d6cd19b81560fd6e: Y,
        },
    });
    class K extends AudioWorkletProcessor {
        #t = null;
        #e = null;
        #r = 1;
        #n = [];
        constructor(e) {
            super();
            const r = e.processorOptions.lanczos;
            this.port.onmessage = async (s) => {
                switch (s.data.type) {
                    case 'init': {
                        const a = await WebAssembly.instantiate(r, G);
                        q(a.exports);
                        break;
                    }
                    case 'start':
                        this.#a(s);
                        break;
                    case 'stop':
                        this.#s();
                        break;
                    case 'gain':
                        this.#r = s.data.gain;
                        break;
                    default:
                        console.error(`Invalid message type ${s.data.type}`);
                        break;
                }
            };
        }
        process(e, r, s) {
            if (this.#t === null || this.#e === null) return;
            let a = e[0];
            if (((a = a.slice(0, Math.min(a.length, this.#t.channels))), a.length === 0)) return;
            a = a.map((_, p) => {
                const b = this.#n[p],
                    d = b.maxNumOutputFrames(_.length),
                    L = new Float32Array(d),
                    { numRead: C, numWritten: ee } = b.resample(_, L);
                if (C !== _.length)
                    throw new Error(
                        `Programming error: consumed ${C} out of ${_.length} of input samples`,
                    );
                return L.subarray(0, ee);
            });
            const c = a[0].length,
                v = this.#t.frameLen(),
                S = new Uint8Array(c * v),
                Q = new DataView(S.buffer),
                Z = this.#t.sampleLen();
            for (let _ = 0; _ < a.length; ++_) {
                const p = a[_];
                for (let d = 0; d < p.length; ++d) p[d] *= this.#r;
                const b = Z * _;
                this.#t.sampleFormat === m.S16LE && U(p, Q, b, v, !0);
            }
            return (this.#e.postMessage(S, [S.buffer]), !0);
        }
        #a(e) {
            (this.#s(),
                (this.#t = h.fromPlain(e.data.mode)),
                (this.#e = e.ports[0]),
                this.#e.start(),
                (this.#r = e.data.gain),
                (this.#n = []));
            for (let r = 0; r < e.data.mode.channels; ++r) {
                const s = e.data.sourceSampleRate,
                    a = e.data.mode.sampleRate;
                (console.debug(`Resampling from ${s} Hz to ${a} Hz`), this.#n.push(new k(s, a)));
            }
        }
        #s() {
            this.#e !== null && (this.#e.close(), (this.#e = null));
        }
    }
    registerProcessor('audio-capture-pipe', K);
})();
