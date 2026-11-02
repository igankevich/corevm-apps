(function () {
    'use strict';
    class Y {
        #t;
        #e = 0;
        constructor(e) {
            this.#t = new DataView(new Uint8Array(e).buffer);
        }
        remaining() {
            return this.#t.byteLength - this.#e;
        }
        decodeCompactUint() {
            return Number(this.#n());
        }
        decodeCompactUint64() {
            return BigInt(this.#n());
        }
        #n() {
            const e = this.decodeUint8();
            if (e < 128) return e;
            if (e < 192) {
                const t = this.decodeUint8();
                return ((e - 128) << 8) | t;
            }
            if (e < 224) {
                const t = this.decodeUint16();
                return ((e - 192) << 16) | t;
            }
            if (e < 240) {
                const t = this.#r();
                return ((e - 224) << 24) | t;
            }
            if (e < 248) {
                const t = this.decodeUint32();
                return Number(BigInt(e - 240) << 32n) + t;
            }
            if (e < 252) {
                const t = this.#i();
                return Number(BigInt(e - 248) << 40n) + t;
            }
            if (e < 254) {
                const t = this.#o();
                return Number(BigInt(e - 252) << 48n) + t;
            }
            if (e < 255) {
                const t = this.#a();
                return (BigInt(e - 254) << 56n) | BigInt(t);
            }
            return this.decodeUint64();
        }
        #r() {
            if (this.remaining() < 3) throw new u('Unexpected EOF');
            const e = this.#t.getUint16(this.#e, !0);
            this.#e += 2;
            const t = this.#t.getUint8(this.#e);
            return ((this.#e += 1), (t << 16) | e);
        }
        #i() {
            if (this.remaining() < 5) throw new u('Unexpected EOF');
            const e = this.#t.getUint32(this.#e, !0);
            this.#e += 4;
            const t = this.#t.getUint8(this.#e);
            return ((this.#e += 1), Number(BigInt(t) << 32n) + e);
        }
        #o() {
            if (this.remaining() < 6) throw new u('Unexpected EOF');
            const e = this.#t.getUint32(this.#e, !0);
            this.#e += 4;
            const t = this.#t.getUint16(this.#e, !0);
            return ((this.#e += 2), Number(BigInt(t) << 32n) + e);
        }
        #a() {
            if (this.remaining() < 7) throw new u('Unexpected EOF');
            const e = this.#t.getUint32(this.#e, !0);
            this.#e += 4;
            const t = this.#t.getUint16(this.#e, !0);
            this.#e += 2;
            const s = this.#t.getUint8(this.#e);
            return ((this.#e += 1), (BigInt(s) << 48n) | (BigInt(t) << 32n) | BigInt(e));
        }
        decodeBool() {
            switch (this.#s(this.#t.getUint8, 1)) {
                case 0:
                    return !1;
                case 1:
                    return !0;
                default:
                    throw new u('Invalid bool');
            }
        }
        decodeUint8() {
            return this.#s(this.#t.getUint8, 1);
        }
        decodeUint16() {
            return this.#s(this.#t.getUint16, 2);
        }
        decodeUint32() {
            return this.#s(this.#t.getUint32, 4);
        }
        decodeUint64() {
            return this.#s(this.#t.getBigUint64, 8);
        }
        decodeInt64() {
            return this.#s(this.#t.getBigInt64, 8);
        }
        decodeUint8Array() {
            const e = this.decodeCompactUint();
            return this.decodeFixedUint8Array(e);
        }
        decodeFixedUint8Array(e) {
            if (this.remaining() < e) throw new u('Unexpected EOF');
            const t = new Uint8Array(this.#t.buffer, this.#e, e);
            return ((this.#e += e), t);
        }
        decodeString() {
            const e = this.decodeCompactUint(),
                t = this.decodeFixedUint8Array(e);
            return new TextDecoder().decode(t);
        }
        decodeArray(e) {
            const t = this.decodeCompactUint();
            return this.decodeFixedArray(t, e);
        }
        decodeFixedArray(e, t) {
            const s = new Array(e);
            for (let r = 0; r < e; ++r) s[r] = t(r);
            return s;
        }
        #s(e, t) {
            if (this.remaining() < t) throw new u('Unexpected EOF');
            const s = e.call(this.#t, this.#e, !0);
            return ((this.#e += t), s);
        }
        decodeOption(e) {
            switch (this.decodeUint8()) {
                case 0:
                    return null;
                case 1:
                    return e();
                default:
                    throw new u('Invalid option');
            }
        }
        decodeCString() {
            const e = this.decodeCompactUint();
            if (this.remaining() < e) throw new u('Unexpected EOF');
            const t = new Uint8Array(e + 1);
            for (let s = 0; s < e; ++s) t[s] = this.#t.getUint8(this.#e + s);
            return ((this.#e += e), t);
        }
    }
    class u extends Error {
        constructor(...e) {
            super(...e);
        }
    }
    class L {
        width;
        height;
        refreshRate;
        options;
        encode(e) {
            (e.encodeUint16(this.width),
                e.encodeUint16(this.height),
                e.encodeUint16(this.refreshRate),
                e.encodeUint64(this.options));
        }
        static decode(e) {
            const t = new L();
            if (
                ((t.width = e.decodeUint16()),
                (t.height = e.decodeUint16()),
                (t.refreshRate = e.decodeUint16()),
                (t.options = e.decodeUint64()),
                t.width === 0 || t.height === 0 || t.refreshRate === 0)
            )
                throw new u('Invalid VideoMode');
            return t;
        }
        static fromPlain(e) {
            return e == null ? e : Object.assign(new L(), e);
        }
    }
    const A = Object.freeze({
        S16LE: 1,
        decode(n) {
            const e = n.decodeCompactUint();
            switch (e) {
                case 1:
                    return A.S16LE;
                default:
                    throw new Error(`Invalid AudioSampleFormat: ${e}`);
            }
        },
    });
    class R {
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
            const t = new R();
            if (
                ((t.sampleRate = e.decodeUint32()),
                (t.channels = e.decodeUint8()),
                (t.sampleFormat = A.decode(e)),
                t.sampleRate === 0 || t.channels === 0)
            )
                throw new u('Invalid AudioMode');
            return t;
        }
        static fromPlain(e) {
            return e == null ? e : Object.assign(new R(), e);
        }
        sampleLen() {
            switch (this.sampleFormat) {
                case A.S16LE:
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
    const h = Object.freeze({
        Halt: class {},
        Panic: class {},
        PageFault: class {
            page;
            numPages;
            constructor(e, t) {
                ((this.page = e), (this.numPages = t));
            }
        },
        OutOfGas: class {},
        ExportsLimitReached: class {},
        TimeLimitReached: class {},
        WaitingForInput: class {
            streams;
            constructor(e) {
                this.streams = e;
            }
        },
        ExtrinsicsSizeLimitReached: class {},
        WorkOutputSizeLimitReached: class {},
        PackingLimitReached: class {},
        DependenciesLimitReached: class {},
        decode(n) {
            const e = n.decodeCompactUint();
            switch (e) {
                case 0:
                    return new h.Halt();
                case 1:
                    return new h.Panic();
                case 2: {
                    const t = n.decodeUint32(),
                        s = n.decodeUint32();
                    return new h.PageFault(t, s);
                }
                case 3:
                    return new h.OutOfGas();
                case 4:
                    return new h.ExportsLimitReached();
                case 5:
                    return new h.TimeLimitReached();
                case 6: {
                    const t = n.decodeUint32();
                    return new h.WaitingForInput(t);
                }
                case 7:
                    return new h.ExtrinsicsSizeLimitReached();
                case 8:
                    return new h.WorkOutputSizeLimitReached();
                case 9:
                    return new h.PackingLimitReached();
                case 10:
                    return new h.DependenciesLimitReached();
                default:
                    throw new u(`Invalid Outcome discriminator: ${e}`);
            }
        },
    });
    class x {
        exportsRoot;
        output;
        state;
        static decode(e) {
            const t = new x();
            return (
                (t.exportsRoot = e.decodeFixedUint8Array(32)),
                (t.output = b.decode(e)),
                (t.state = y.decode(e)),
                t
            );
        }
        static fromPlain(e) {
            return e == null
                ? e
                : ((e.output = b.fromPlain(e.output)),
                  (e.state = y.fromPlain(e.state)),
                  Object.assign(new x(), e));
        }
    }
    class b {
        gasUsed;
        outcome;
        numRegularPages;
        numHashPages;
        streamLen;
        firstSegmentIndex;
        static decode(e) {
            const t = new b();
            return (
                (t.gasUsed = e.decodeUint64()),
                (t.outcome = h.decode(e)),
                (t.numRegularPages = e.decodeUint16()),
                (t.numHashPages = e.decodeUint16()),
                (t.streamLen = e.decodeFixedArray(4, () => e.decodeUint32())),
                (t.firstSegmentIndex = e.decodeUint16()),
                t
            );
        }
        static fromPlain(e) {
            return e == null ? e : Object.assign(new b(), e);
        }
        allStreamsLen() {
            return this.streamLen.reduce((e, t) => e + t, 0);
        }
    }
    class y {
        regs;
        programCounter;
        step;
        static decode(e) {
            const t = new y();
            return (
                (t.regs = e.decodeFixedArray(13, () => e.decodeUint64())),
                (t.programCounter = e.decodeUint64()),
                (t.step = e.decodeUint32()),
                t
            );
        }
        static fromPlain(e) {
            return e == null ? e : Object.assign(new y(), e);
        }
    }
    const O = Object.freeze({ Stdout: 0, Stderr: 1, Video: 2, Audio: 3 });
    class M {
        chunks;
        static decode(e) {
            const t = e.decodeCompactUint(),
                s = new M();
            s.chunks = [];
            let r = 0n;
            for (let i = 0; i < t; ++i) {
                const o = q(e.decodeCompactUint64(), r),
                    a = e.decodeCompactUint(),
                    c = e.decodeFixedUint8Array(a);
                (s.chunks.push({ timeOffset: o, buf: c }), (r = o));
            }
            return s;
        }
    }
    function q(n, e) {
        let t = n + e;
        for (; t >= B;) t -= B;
        return t;
    }
    const B = 18446744073709551616n;
    class K {
        #t;
        #e;
        #n = new Map();
        constructor(e) {
            ((this.#t = performance.now()), (this.#e = e));
        }
        add(e) {
            const t = performance.now();
            let s = this.#n.get(e);
            (s === void 0 && (s = 0), this.#n.set(e, s + (t - this.#t)), (this.#t = t));
        }
        total() {
            return Array.from(this.#n.values()).reduce((e, t) => e + t, 0);
        }
        print(e) {
            const s = [['total', this.total()]]
                    .concat(Array.from(this.#n.entries()))
                    .map(([i, o]) => `${i} ${Math.round(o)}ms`)
                    .join(', '),
                r = e || '';
            console.debug(`${this.#e}: ${s}${r}`);
        }
    }
    function Q(n) {
        return (2 * n + 1) / 65535;
    }
    function Z(n, e, t, s, r) {
        for (let i = 0; i < e.length; ++i) ((e[i] = Q(n.getInt16(t, r))), (t += s));
    }
    function ee(n, e) {
        return 1735732800 + Math.floor(n) * e;
    }
    class k {
        __destroy_into_raw() {
            const e = this.__wbg_ptr;
            return ((this.__wbg_ptr = 0), j.unregister(this), e);
        }
        free() {
            const e = this.__destroy_into_raw();
            l.__wbg_videodecoder_free(e, 0);
        }
        hasMoreFrames() {
            return l.videodecoder_hasMoreFrames(this.__wbg_ptr) !== 0;
        }
        get height() {
            return l.videodecoder_height(this.__wbg_ptr);
        }
        constructor(e) {
            const t = l.videodecoder_new(e);
            if (t[2]) throw D(t[1]);
            return ((this.__wbg_ptr = t[0] >>> 0), j.register(this, this.__wbg_ptr, this), this);
        }
        readFrame() {
            const e = l.videodecoder_readFrame(this.__wbg_ptr);
            if (e[2]) throw D(e[1]);
            return D(e[0]);
        }
        get width() {
            return l.videodecoder_width(this.__wbg_ptr);
        }
    }
    Symbol.dispose && (k.prototype[Symbol.dispose] = k.prototype.free);
    function te(n, e) {
        throw new Error(W(n, e));
    }
    function ne(n) {
        return n.length;
    }
    function se(n, e) {
        return new Error(W(n, e));
    }
    function re(n, e) {
        return new Uint8Array(z(n, e));
    }
    function ie(n, e, t) {
        Uint8Array.prototype.set.call(z(n, e), t);
    }
    function oe() {
        const n = l.__wbindgen_externrefs,
            e = n.grow(4);
        (n.set(0, void 0),
            n.set(e + 0, void 0),
            n.set(e + 1, null),
            n.set(e + 2, !0),
            n.set(e + 3, !1));
    }
    const j =
        typeof FinalizationRegistry > 'u'
            ? { register: () => {}, unregister: () => {} }
            : new FinalizationRegistry((n) => l.__wbg_videodecoder_free(n >>> 0, 1));
    function z(n, e) {
        return ((n = n >>> 0), $().subarray(n / 1, n / 1 + e));
    }
    function W(n, e) {
        return ((n = n >>> 0), ce(n, e));
    }
    let E = null;
    function $() {
        return ((E === null || E.byteLength === 0) && (E = new Uint8Array(l.memory.buffer)), E);
    }
    function D(n) {
        const e = l.__wbindgen_externrefs.get(n);
        return (l.__externref_table_dealloc(n), e);
    }
    let S = new TextDecoder('utf-8', { ignoreBOM: !0, fatal: !0 });
    S.decode();
    const ae = 2146435072;
    let T = 0;
    function ce(n, e) {
        return (
            (T += e),
            T >= ae &&
                ((S = new TextDecoder('utf-8', { ignoreBOM: !0, fatal: !0 })), S.decode(), (T = e)),
            S.decode($().subarray(n, n + e))
        );
    }
    let l;
    function de(n) {
        l = n;
    }
    function ue(n) {
        de(n);
    }
    const he = Object.freeze({
        './corevm_codec_bg.js': {
            __wbg___wbindgen_throw_6ddd609b62940d55: te,
            __wbg_length_ea16607d7b61445b: ne,
            __wbg_new_d15cb560a6a0e5f0: se,
            __wbg_new_from_slice_22da9388ac046e50: re,
            __wbg_prototypesetcall_d62e5099504357e6: ie,
            __wbindgen_init_externref_table: oe,
        },
    });
    var le = '' + new URL('../CDtNsIWD/code.wasm', self.location.href).href;
    let N = !1;
    async function me() {
        if (N) return;
        const n = await WebAssembly.compileStreaming(fetch(le)),
            e = await WebAssembly.instantiate(n, he);
        (ue(e.exports), (N = !0));
    }
    class H {
        async transcode(e, t, s, r, i, o, a, c) {
            const d = ee(s + 1, F.slot_period_sec),
                p = Date.now(),
                m = new Uint8Array(r),
                f = [];
            let _ = 0;
            for (const g of i.output.streamLen) (f.push(m.slice(_, _ + g)), (_ += g));
            const v = [],
                w = new K('Transcode');
            let U = [];
            if (a !== null)
                try {
                    ((U = this.#e(s, d, f[O.Audio], a)), w.add('audio'));
                } catch (g) {
                    console.debug('Failed to transcode audio', g);
                }
            let C = [];
            if (o !== null)
                try {
                    ((C = await this.#t(s, d, f[O.Video], o, v)), w.add('video'));
                } catch (g) {
                    console.debug('Failed to transcode video', g);
                }
            let P = [];
            try {
                ((P = this.#n(s, d, f[O.Stdout])), w.add('console'));
            } catch (g) {
                console.debug('Failed to parse stdout', g);
            }
            let J = [];
            try {
                ((J = this.#n(s, d, f[O.Stderr])), w.add('console'));
            } catch (g) {
                console.debug('Failed to parse stderr', g);
            }
            const X = {
                type: 'chunks',
                serviceId: e,
                vmId: t,
                video: C,
                stdout: P,
                stderr: J,
                firstSlot: c,
                slot: s,
            };
            if (a !== null) {
                X.audio = U;
                for (const g of U) v.push(...g.channels);
            }
            (I.postMessage(X, v),
                w.add('post'),
                w.print(),
                postMessage({
                    type: 'transcode-event',
                    serviceId: e,
                    vmId: t,
                    startTime: p,
                    endTime: Date.now(),
                }));
        }
        async #t(e, t, s, r, i) {
            const o = F.slot_period_sec * r.refreshRate,
                a = [];
            let c = 0;
            if (((s = new Uint8Array(s)), s.length === 0))
                return (console.warn(`Guest produced ${c} video frame(s) instead of ${o}`), a);
            const d = new k(s);
            if (d.width !== r.width || d.height !== r.height)
                throw new Error('Invalid video stream');
            for (; d.hasMoreFrames();) {
                const p = d.readFrame(),
                    m = new VideoFrame(p, {
                        timestamp: 0,
                        codedWidth: r.width,
                        codedHeight: r.height,
                        format: 'RGBX',
                    }),
                    f = t + c / r.refreshRate;
                (a.push({ slot: e, timestamp: f, mode: r, image: m }), i.push(m), c++);
            }
            if (
                (c !== o && console.warn(`Guest produced ${c} video frame(s) instead of ${o}`),
                c !== 0)
            ) {
                const p = a[a.length - 1];
                for (let m = c; m < o; m++) {
                    const f = t + m / r.refreshRate,
                        _ = p.image.clone();
                    a.push({ slot: e, timestamp: f, mode: r, image: _ });
                }
            }
            return a;
        }
        #e(e, t, s, r) {
            const i = r.frameLen(),
                o = F.slot_period_sec * r.sampleRate,
                a = Math.min(Math.floor(s.byteLength / i), o);
            a !== o && console.warn(`Guest produced ${a} audio frame(s) instead of ${o}`);
            const c = new DataView(s.buffer, 0, a * i),
                d = [],
                p = r.sampleLen(),
                m = r.frameLen();
            for (let w = 0; w < r.channels; ++w) {
                const U = new Float32Array(o),
                    C = p * w,
                    P = U.subarray(0, a);
                switch (r.sampleFormat) {
                    case A.S16LE:
                        Z(c, P, C, m, !0);
                        break;
                }
                d.push(U.buffer);
            }
            const f = t,
                _ = f + F.slot_period_sec;
            return [{ slot: e, startTime: f, endTime: _, mode: r, channels: d }];
        }
        #n(e, t, s) {
            const r = new TextDecoder(),
                i = new Y(s),
                o = [];
            for (; i.remaining() !== 0;) {
                const a = M.decode(i);
                for (const c of a.chunks) {
                    let d;
                    try {
                        d = r.decode(new Uint8Array(c.buf));
                    } catch (m) {
                        console.debug('Failed to decode console output as UTF-8:', m);
                        continue;
                    }
                    const p = t + Number(c.timeOffset) / 1e3;
                    o.push({ slot: e, timestamp: p, text: d });
                }
            }
            return o;
        }
    }
    let G = new H(),
        V = null,
        I = null,
        F = null;
    (addEventListener('message', async (n) => {
        switch (n.data.type) {
            case 'fetcher-port':
                ((V = n.ports[0]),
                    (V.onmessage = async (e) => {
                        await me();
                        const t = e.data.serviceId,
                            s = e.data.vmId,
                            r = L.fromPlain(e.data.video),
                            i = R.fromPlain(e.data.audio);
                        (e.data.reset &&
                            ((G = new H()),
                            I.postMessage({
                                type: 'reset',
                                serviceId: t,
                                vmId: s,
                                video: r,
                                audio: i,
                            })),
                            await G.transcode(
                                t,
                                s,
                                e.data.slot,
                                e.data.segments,
                                x.fromPlain(e.data.vmSpec),
                                r,
                                i,
                                e.data.firstSlot,
                            ));
                    }));
                break;
            case 'engine-port':
                ((I = n.ports[0]), I.start());
                break;
            case 'parameters':
                F = n.data.parameters;
                break;
            default:
                throw new Error(`Invalid message type: ${n.data.type}`);
        }
    }),
        addEventListener('error', (n) =>
            postMessage({
                type: 'error',
                error: { message: n.message, filename: 'transcoder.js' },
            }),
        ),
        addEventListener('unhandledrejection', (n) =>
            postMessage({ type: 'error', error: { message: n.reason, filename: 'transcoder.js' } }),
        ));
})();
