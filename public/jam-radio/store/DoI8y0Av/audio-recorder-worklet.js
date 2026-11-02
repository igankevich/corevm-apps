(function () {
    'use strict';
    globalThis.TextDecoder = class {
        decode() {
            return '';
        }
    };
    class C extends Error {
        constructor(...e) {
            super(...e);
        }
    }
    const p = Object.freeze({
        S16LE: 1,
        decode(t) {
            const e = t.decodeCompactUint();
            if (e === 1) return p.S16LE;
            throw new Error(`Invalid AudioSampleFormat: ${e}`);
        },
    });
    class d {
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
            const r = new d();
            if (
                ((r.sampleRate = e.decodeUint32()),
                (r.channels = e.decodeUint8()),
                (r.sampleFormat = p.decode(e)),
                r.sampleRate === 0 || r.channels === 0)
            )
                throw new C('Invalid AudioMode');
            return r;
        }
        static fromPlain(e) {
            return e == null ? e : Object.assign(new d(), e);
        }
        sampleLen() {
            return this.sampleFormat === p.S16LE ? 2 : 0;
        }
        frameLen() {
            return this.sampleLen() * this.channels;
        }
        bytesPerSecond() {
            return this.sampleRate * this.channels * this.sampleLen();
        }
    }
    let n;
    function M(t) {
        n = t;
    }
    function F(t) {
        b === o.length && o.push(o.length + 1);
        const e = b;
        return ((b = o[e]), (o[e] = t), e);
    }
    function u(t) {
        if (i == 1) throw new Error('out of js stack');
        return ((o[--i] = t), i);
    }
    function j(t, e) {
        return ((t = t >>> 0), U().subarray(t / 4, t / 4 + e));
    }
    let m = null;
    function U() {
        return ((m === null || m.byteLength === 0) && (m = new Float32Array(n.memory.buffer)), m);
    }
    function W(t, e) {
        return ((t = t >>> 0), I(t, e));
    }
    let h = null;
    function T() {
        return ((h === null || h.byteLength === 0) && (h = new Uint8Array(n.memory.buffer)), h);
    }
    function w(t) {
        return o[t];
    }
    let o = new Array(128).fill(void 0);
    o.push(void 0, null, !0, !1);
    let b = o.length,
        i = 128,
        g = new TextDecoder('utf-8', { ignoreBOM: !0, fatal: !0 });
    g.decode();
    const D = 2146435072;
    let y = 0;
    function I(t, e) {
        return (
            (y += e),
            y >= D &&
                ((g = new TextDecoder('utf-8', { ignoreBOM: !0, fatal: !0 })), g.decode(), (y = e)),
            g.decode(T().subarray(t, t + e))
        );
    }
    const S =
            typeof FinalizationRegistry > 'u'
                ? { register: () => {}, unregister: () => {} }
                : new FinalizationRegistry((t) =>
                      n.__wbg_chunkedinterleavedresampler_free(t >>> 0, 1),
                  ),
        x =
            typeof FinalizationRegistry > 'u'
                ? { register: () => {}, unregister: () => {} }
                : new FinalizationRegistry((t) => n.__wbg_chunkedresampler_free(t >>> 0, 1)),
        A =
            typeof FinalizationRegistry > 'u'
                ? { register: () => {}, unregister: () => {} }
                : new FinalizationRegistry((t) => n.__wbg_resampleoutcome_free(t >>> 0, 1));
    typeof FinalizationRegistry > 'u' ||
        new FinalizationRegistry((t) => n.__wbg_wholeresampler_free(t >>> 0, 1));
    class z {
        __destroy_into_raw() {
            const e = this.__wbg_ptr;
            return ((this.__wbg_ptr = 0), S.unregister(this), e);
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
                const s = n.chunkedinterleavedresampler_resampleExact(this.__wbg_ptr, u(e), u(r));
                return l.__wrap(s);
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
            return ((this.__wbg_ptr = a >>> 0), S.register(this, this.__wbg_ptr, this), this);
        }
        reset() {
            n.chunkedinterleavedresampler_reset(this.__wbg_ptr);
        }
        resample(e, r) {
            try {
                const s = n.chunkedinterleavedresampler_resample(this.__wbg_ptr, u(e), u(r));
                return l.__wrap(s);
            } finally {
                ((o[i++] = void 0), (o[i++] = void 0));
            }
        }
    }
    Symbol.dispose && (z.prototype[Symbol.dispose] = z.prototype.free);
    class R {
        __destroy_into_raw() {
            const e = this.__wbg_ptr;
            return ((this.__wbg_ptr = 0), x.unregister(this), e);
        }
        free() {
            const e = this.__destroy_into_raw();
            n.__wbg_chunkedresampler_free(e, 0);
        }
        resampleExact(e, r) {
            try {
                const s = n.chunkedresampler_resampleExact(this.__wbg_ptr, u(e), u(r));
                return l.__wrap(s);
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
            return ((this.__wbg_ptr = s >>> 0), x.register(this, this.__wbg_ptr, this), this);
        }
        reset() {
            n.chunkedresampler_reset(this.__wbg_ptr);
        }
        resample(e, r) {
            try {
                const s = n.chunkedresampler_resample(this.__wbg_ptr, u(e), u(r));
                return l.__wrap(s);
            } finally {
                ((o[i++] = void 0), (o[i++] = void 0));
            }
        }
    }
    Symbol.dispose && (R.prototype[Symbol.dispose] = R.prototype.free);
    class l {
        static __wrap(e) {
            e = e >>> 0;
            const r = Object.create(l.prototype);
            return ((r.__wbg_ptr = e), A.register(r, r.__wbg_ptr, r), r);
        }
        __destroy_into_raw() {
            const e = this.__wbg_ptr;
            return ((this.__wbg_ptr = 0), A.unregister(this), e);
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
    Symbol.dispose && (l.prototype[Symbol.dispose] = l.prototype.free);
    function P(t, e) {
        throw new Error(W(t, e));
    }
    function B(t) {
        return w(t).length;
    }
    function $(t) {
        const e = new Float32Array(t >>> 0);
        return F(e);
    }
    function N(t, e, r) {
        Float32Array.prototype.set.call(j(t, e), w(r));
    }
    function H(t, e, r) {
        w(t)[e >>> 0] = r;
    }
    function J(t) {
        return F(t);
    }
    function V(t) {
        M(t);
    }
    const X = Object.freeze({
        './lanczos_resampler_bg.js': {
            __wbg___wbindgen_throw_dd24417ed36fc46e: P,
            __wbg_length_86ce4877baf913bb: B,
            __wbg_new_with_length_95ba657dfb7d3dfb: $,
            __wbg_prototypesetcall_96cc7097487b926d: N,
            __wbg_set_index_165b46b0114d368c: H,
            __wbindgen_cast_d6cd19b81560fd6e: J,
        },
    });
    function Y(t) {
        return Math.trunc(((t + 1) / 2) * 65535 - 32768);
    }
    function q(t, e, r, s, a) {
        for (let c = 0; c < t.length; ++c) (e.setInt16(r, Y(t[c]), a), (r += s));
    }
    class G extends AudioWorkletProcessor {
        #e = null;
        #r = [];
        #t = [];
        constructor(e) {
            super();
            const r = e.processorOptions.lanczos;
            this.port.onmessage = async (s) => {
                switch (s.data.type) {
                    case 'init': {
                        const a = await WebAssembly.instantiate(r, X);
                        V(a.exports);
                        break;
                    }
                    case 'start':
                        this.#s(s);
                        break;
                    case 'finish':
                        this.#a();
                        break;
                    case 'cancel':
                        this.#n();
                        break;
                    default:
                        console.error(`Invalid message type ${s.data.type}`);
                        break;
                }
            };
        }
        process(e, r, s) {
            if (this.#e === null) return;
            let a = e[0];
            if (((a = a.slice(0, Math.min(a.length, this.#e.channels))), a.length === 0)) return;
            a = a.map((_, k) => {
                const f = this.#r[k],
                    Z = f.maxNumOutputFrames(_.length),
                    v = new Float32Array(Z),
                    { numRead: L, numWritten: ee } = f.resample(_, v);
                if (L !== _.length)
                    throw new Error(
                        `Programming error: consumed ${L} out of ${_.length} of input samples`,
                    );
                return v.subarray(0, ee);
            });
            const c = a[0].length,
                E = this.#e.frameLen(),
                O = new Uint8Array(c * E),
                K = new DataView(O.buffer),
                Q = this.#e.sampleLen();
            for (let _ = 0; _ < a.length; ++_) {
                const k = a[_],
                    f = Q * _;
                this.#e.sampleFormat === p.S16LE && q(k, K, f, E, !0);
            }
            return (this.#t.push(O), !0);
        }
        #s(e) {
            (this.#n(), (this.#e = d.fromPlain(e.data.mode)), (this.#r = []));
            for (let r = 0; r < e.data.mode.channels; ++r) {
                const s = sampleRate,
                    a = e.data.mode.sampleRate;
                (console.debug(`Resampling from ${s} Hz to ${a} Hz`), this.#r.push(new R(s, a)));
            }
        }
        #a() {
            const e = this.#t;
            ((this.#t = []),
                this.port.postMessage(
                    { type: 'chunks', chunks: e },
                    e.map((r) => r.buffer),
                ));
        }
        #n() {
            ((this.#t = []), (this.#e = null));
        }
    }
    registerProcessor('audio-recorder', G);
})();
