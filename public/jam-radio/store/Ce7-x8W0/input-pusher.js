(function () {
    'use strict';
    class O {
        #e = new Map();
        addEventListener(e, t) {
            const s = this.#e.get(e);
            s === void 0 ? this.#e.set(e, [t]) : s.push(t);
        }
        removeEventListener(e, t) {
            const s = this.#e.get(e);
            if (s === void 0) return;
            const i = s.indexOf(t);
            i !== -1 && s.splice(i, 1);
        }
        async fireEvent(e, t) {
            const s = this.#e.get(e) || [];
            await Promise.all(s.map((i) => i(t)));
        }
    }
    class F {
        #e;
        #t = new O();
        #n;
        #s = 3e4;
        #i;
        constructor(e, t) {
            ((this.#e = e), t && 'connectTimeout' in t && (this.#s = t.connectTimeout));
        }
        open() {
            (this.#n && this.close(),
                (this.#n = new WebSocket(this.#e)),
                (this.#i = setTimeout(() => {
                    this.socket && this.socket.readyState === WebSocket.CONNECTING && this.close();
                }, this.#s)),
                this.#n.addEventListener('open', async (e) => {
                    (clearTimeout(this.#i), await this.#t.fireEvent('open', e));
                }),
                this.#n.addEventListener('close', async (e) => {
                    await this.#t.fireEvent('close', e);
                }),
                this.#n.addEventListener('error', async (e) => {
                    await this.#t.fireEvent('error', e);
                }));
        }
        close() {
            this.#n && this.#n.close();
        }
        sendInputChunk(e) {
            this.#n.send(e);
        }
        sendHostMessage(e) {
            this.#n.send(e);
        }
        addEventListener(e, t) {
            this.#t.addEventListener(e, t);
        }
        removeEventListener(e, t) {
            this.#t.removeEventListener(e, t);
        }
        get url() {
            return this.#e;
        }
    }
    const A = 1735732800,
        K = 13791360;
    class x {
        #e;
        #t;
        #n = 0;
        constructor(e) {
            ((this.#e = new Uint8Array(e)), (this.#t = new DataView(this.#e.buffer)));
        }
        get offset() {
            return this.#n;
        }
        remaining() {
            return this.#t.byteLength - this.#n;
        }
        getFilledBuffer() {
            return this.#e.subarray(0, this.#n);
        }
        encodeCompactUint(e) {
            if (e < 2 ** 7) {
                this.encodeUint8(Number(e));
                return;
            }
            if (e < 2 ** 14) {
                ((e = Number(e)),
                    this.encodeUint8(((e >> 8) & 255) | 128),
                    this.encodeUint8(e & 255));
                return;
            }
            if (e < 2 ** 21) {
                ((e = Number(e)),
                    this.encodeUint8(((e >> 16) & 255) | 192),
                    this.encodeUint16(e & 65535));
                return;
            }
            if (e < 2 ** 28) {
                ((e = Number(e)), this.encodeUint8(((e >> 24) & 255) | 224), this.#s(e & 16777215));
                return;
            }
            if (e < 2 ** 35) {
                (this.encodeUint8((Number(BigInt(e) >> 32n) & 255) | 240),
                    this.encodeUint32(Number(e) & 4294967295));
                return;
            }
            if (e < 2 ** 42) {
                (this.encodeUint8((Number(BigInt(e) >> 40n) & 255) | 248),
                    this.#i(BigInt(e) & 0xffffffffffn));
                return;
            }
            if (e < 2 ** 49) {
                (this.encodeUint8((Number(BigInt(e) >> 48n) & 255) | 252),
                    this.#c(BigInt(e) & 0xffffffffffffn));
                return;
            }
            if (e < 2 ** 56) {
                (this.encodeUint8((Number(BigInt(e) >> 56n) & 255) | 254),
                    this.#o(BigInt(e) & 0xffffffffffffffn));
                return;
            }
            (this.encodeUint8(255), this.encodeUint64(BigInt(e)));
        }
        #s(e) {
            (this.encodeUint16(e & 65535), this.encodeUint8((e >> 16) & 255));
        }
        #i(e) {
            (this.encodeUint32(Number(e) & 4294967295), this.encodeUint8(Number(e >> 32n) & 255));
        }
        #c(e) {
            (this.encodeUint32(Number(e) & 4294967295),
                this.encodeUint16(Number(e >> 32n) & 65535));
        }
        #o(e) {
            (this.encodeUint32(Number(e) & 4294967295),
                this.encodeUint16(Number(e >> 32n) & 65535),
                this.encodeUint8(Number(e >> 48n) & 255));
        }
        encodeUint8(e) {
            this.#r(this.#t.setUint8, 1, e);
        }
        encodeUint16(e) {
            this.#r(this.#t.setUint16, 2, e);
        }
        encodeUint32(e) {
            this.#r(this.#t.setUint32, 4, e);
        }
        encodeUint64(e) {
            this.#r(this.#t.setBigUint64, 8, e);
        }
        encodeBool(e) {
            this.encodeUint8(e ? 1 : 0);
        }
        encodeArray(e, t) {
            (this.encodeCompactUint(e), this.encodeFixedArray(e, t));
        }
        encodeFixedArray(e, t) {
            for (let s = 0; s < e; ++s) t(s);
        }
        encodeUint8Array(e) {
            (this.encodeCompactUint(e.length), this.encodeFixedUint8Array(e));
        }
        encodeFixedUint8Array(e) {
            if (this.remaining() < e.length) throw new Error('Buffer overflow');
            (this.#e.set(e, this.#n), (this.#n += e.length));
        }
        encodeCString(e) {
            if (e.length === 0)
                throw new TypeError('Empty byte array instead of NUL-terminated C-string');
            const t = e.length - 1;
            (this.encodeCompactUint(t), this.encodeFixedUint8Array(e.subarray(0, t)));
        }
        encodeOption(e, t) {
            if (e === null) {
                this.encodeUint8(0);
                return;
            }
            (this.encodeUint8(1), t());
        }
        #r(e, t, s) {
            if (this.remaining() < t) throw new Error('Buffer overflow');
            (e.call(this.#t, this.#n, s, !0), (this.#n += t));
        }
    }
    class P extends Error {
        constructor(...e) {
            super(...e);
        }
    }
    const N = Object.freeze({
        S16LE: 1,
        decode(n) {
            const e = n.decodeCompactUint();
            if (e === 1) return N.S16LE;
            throw new Error(`Invalid AudioSampleFormat: ${e}`);
        },
    });
    class g {
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
            const t = new g();
            if (
                ((t.sampleRate = e.decodeUint32()),
                (t.channels = e.decodeUint8()),
                (t.sampleFormat = N.decode(e)),
                t.sampleRate === 0 || t.channels === 0)
            )
                throw new P('Invalid AudioMode');
            return t;
        }
        static fromPlain(e) {
            return e == null ? e : Object.assign(new g(), e);
        }
        sampleLen() {
            return this.sampleFormat === N.S16LE ? 2 : 0;
        }
        frameLen() {
            return this.sampleLen() * this.channels;
        }
        bytesPerSecond() {
            return this.sampleRate * this.channels * this.sampleLen();
        }
    }
    class k {
        video;
        audio;
        console;
        static createEmpty() {
            const e = new k();
            return (
                (e.video = new Uint8Array()),
                (e.audio = new Uint8Array()),
                (e.console = new Uint8Array()),
                e
            );
        }
        encode(e) {
            (e.encodeUint8Array(this.video),
                e.encodeUint8Array(this.audio),
                e.encodeUint8Array(this.console));
        }
    }
    const S = 8;
    class R {
        targetService;
        targetVm;
        index;
        body;
        encodeHeader(e) {
            (e.encodeUint32(this.targetService),
                e.encodeUint32(this.targetVm),
                e.encodeUint32(this.index));
        }
    }
    class B {
        targetService;
        targetVm;
        body;
        maxEncodedSize() {
            return 8 + this.body.length;
        }
        encode(e) {
            (e.encodeUint32(this.targetService),
                e.encodeUint32(this.targetVm),
                e.encodeFixedUint8Array(this.body));
        }
    }
    const y = Object.freeze({
            InputChunk: 0,
            HostMessage: 1,
            decode(n) {
                const e = n.decodeCompactUint();
                switch (e) {
                    case 0:
                        return y.InputChunk;
                    case 1:
                        return y.HostMessage;
                    default:
                        throw new Error(`Invalid MessageKind: ${e}`);
                }
            },
        }),
        c = Object.freeze({ IDLE: 0, PENDING: 1, RUNNING: 2, CLOSED: 3 });
    class D {
        #e = 0;
        #t = c.IDLE;
        #n = 0;
        #s = null;
        #i = 0;
        runAt(e, t) {
            switch (this.#t) {
                case c.IDLE:
                    ((this.#t = c.PENDING),
                        (this.#n = t),
                        (this.#e = setTimeout(
                            () => {
                                if (
                                    ((this.#e = 0),
                                    this.#t !== c.CLOSED &&
                                        ((this.#t = c.RUNNING),
                                        e(),
                                        this.#t === c.RUNNING &&
                                            ((this.#t = c.IDLE), this.#s !== null)))
                                ) {
                                    const s = this.#s;
                                    this.#s = null;
                                    const i = this.#i;
                                    this.runAt(s, i);
                                }
                            },
                            Math.max(0, t - Date.now()),
                        )));
                    break;
                case c.PENDING:
                    if (this.#n <= t) return;
                    ((this.#t = c.IDLE), this.runAt(e, t));
                    break;
                case c.RUNNING:
                    ((this.#s = e), (this.#i = t));
                    break;
                case c.CLOSED:
                    break;
            }
        }
        close() {
            ((this.#t = c.CLOSED), clearTimeout(this.#e), (this.#e = 0), (this.#s = null));
        }
    }
    const U = { name: 'Ed25519' };
    class b {
        #e;
        constructor(e) {
            this.#e = e;
        }
        static async generate() {
            const e = await crypto.subtle.generateKey(U, !0, ['sign', 'verify']);
            return new b(e);
        }
        static async fromJSON(e) {
            const t = await crypto.subtle.importKey('jwk', e.privateKey, U, !0, ['sign']),
                s = await crypto.subtle.importKey('jwk', e.publicKey, U, !0, ['verify']);
            return new b({ privateKey: t, publicKey: s });
        }
        async toJSON() {
            return {
                privateKey: await crypto.subtle.exportKey('jwk', this.#e.privateKey),
                publicKey: await crypto.subtle.exportKey('jwk', this.#e.publicKey),
            };
        }
        async sign(e) {
            return new Uint8Array(await crypto.subtle.sign(U, this.#e.privateKey, e));
        }
        async getRawPublicKey() {
            const e = await crypto.subtle.exportKey('raw', this.#e.publicKey);
            return new Uint8Array(e);
        }
    }
    function u(n, e) {
        return BigInt(n) + BigInt(e) * 2n ** 32n;
    }
    function T(n) {
        return Number(n % 2n ** 32n);
    }
    function G(n) {
        return Math.floor(Number(n / 2n ** 32n));
    }
    class H {
        #e = new Map();
        #t;
        #n;
        constructor(e) {
            ((this.#t = e?.create), (this.#n = e?.destroy));
        }
        set(e, t, s) {
            const i = u(e, t);
            this.#e.set(i, s);
        }
        get(e, t) {
            const s = u(e, t);
            return this.#e.get(s);
        }
        ensurePresent(e, t, s) {
            const i = u(e, t);
            let r = this.#e.get(i);
            return (r === void 0 && ((r = (s || this.#t)(e, t)), this.#e.set(i, r)), r);
        }
        ensureAbsent(e, t) {
            const s = u(e, t),
                i = this.#e.get(s);
            return i !== void 0 ? (this.#n(i), this.#e.delete(s), !0) : !1;
        }
        ensureIntersectionPresent(e, t) {
            const s = t?.create || this.#t,
                i = t?.destroy || this.#n,
                r = t?.added,
                l = t?.removed,
                I = new Set();
            for (const [a, m] of e) {
                const p = u(a, m);
                (I.add(p), this.#e.get(p) === void 0 && (this.#e.set(p, s(a, m)), r && r(a, m)));
            }
            for (const [a, m] of this.#e.entries())
                if (!I.has(a) && (i(m), this.#e.delete(a), l)) {
                    const p = T(a),
                        M = G(a);
                    l(p, M);
                }
        }
        clear() {
            for (const e of this.#e.values()) this.#n(e);
            this.#e.clear();
        }
        values() {
            return this.#e.values();
        }
    }
    const z = 64;
    function E() {
        if (!w) throw new TypeError('Parameters are not set');
        return w.slot_period_sec / S;
    }
    function j(n) {
        return Math.floor((n - A) / E());
    }
    function C(n) {
        return A + Math.floor(n) * E();
    }
    const h = Object.freeze({ INITIAL: 0, RUNNING: 1 });
    class V {
        #e = [];
        #t;
        #n;
        #s = null;
        #i = !1;
        #c = new D();
        #o = h.INITIAL;
        constructor(e, t) {
            ((this.#t = e), (this.#n = t));
        }
        start() {
            if (this.#o !== h.INITIAL || !w) return;
            const e = Math.floor(Date.now() / 1e3),
                t = j(e);
            (this.#c.runAt(async () => await this.#a(t + 1), C(t + 1) * 1e3),
                this.#e.push(this.#r(t)),
                (this.#o = h.RUNNING));
        }
        close() {
            this.#c.close();
        }
        pushAudio(e) {
            if ((this.start(), this.#o !== h.RUNNING)) {
                console.debug('Dropping audio chunk: not initialized');
                return;
            }
            let t = this.#e.findIndex((s) => s.audioOffset !== s.chunk.length);
            for (t === -1 && (t = this.#e.length); e.length !== 0;) {
                if (t === this.#e.length) {
                    const r = this.#e[this.#e.length - 1].index;
                    this.#e.push(this.#r(r + 1));
                }
                const s = this.#e[t],
                    i = Math.min(e.length, s.chunk.audio.length - s.audioOffset);
                (s.chunk.audio.set(e.subarray(0, i), s.audioOffset),
                    (s.audioOffset += i),
                    (e = e.subarray(i)),
                    t++);
            }
        }
        pushConsole(e) {
            if ((this.start(), this.#o !== h.RUNNING)) {
                console.debug('Dropping console chunk: not initialized');
                return;
            }
            const t = this.#e[0];
            t.chunk.console = _(t.chunk.console, e);
        }
        pushHostMessage(e) {
            if ((this.start(), this.#o !== h.RUNNING)) {
                console.debug('Dropping host message: not initialized');
                return;
            }
            const t = new B();
            ((t.targetService = this.#t), (t.targetVm = this.#n), (t.body = e));
            const s = new x(new Uint8Array(1 + t.maxEncodedSize()));
            (s.encodeCompactUint(y.HostMessage), t.encode(s));
            try {
                (console.debug(`Sending host message (${e.length} B)`),
                    o.sendHostMessage(s.getFilledBuffer()));
            } catch (i) {
                console.debug('Failed to send host message:', i);
            }
        }
        set audioMode(e) {
            this.#s = e;
        }
        set isCapturingAudio(e) {
            this.#i = e;
        }
        #r(e) {
            const t = k.createEmpty();
            return ((t.audio = new Uint8Array(this.#u())), { chunk: t, index: e, audioOffset: 0 });
        }
        #d() {
            const e = this.#e.shift().index;
            this.#e.length === 0 && this.#e.push(this.#r(e + 1));
        }
        #h(e) {
            for (; this.#e.length !== 0;) {
                const t = this.#e[0].index;
                if (t >= e) break;
                (console.debug(`Dropping input chunk ${t}`), this.#e.shift());
            }
            this.#e.length === 0 && this.#e.push(this.#r(e + 1));
        }
        #u() {
            return this.#s !== null ? this.#s.bytesPerSecond() * E() : 0;
        }
        #f() {
            return Math.ceil(K / S) + 8 + z;
        }
        async sendFinishedChunk() {
            if (this.#e.length === 0) return;
            const { chunk: e, index: t, audioOffset: s } = this.#e[0];
            if (
                (this.#s !== null && this.#i && s !== e.audio.length) ||
                (this.#d(), e.console.length === 0 && s === 0)
            )
                return;
            const i = new x(new Uint8Array(1 + this.#f()));
            i.encodeCompactUint(y.InputChunk);
            const r = new R();
            ((r.targetService = this.#t), (r.targetVm = this.#n), (r.index = t), r.encodeHeader(i));
            const l = i.offset;
            e.encode(i);
            const I = await L.sign(i.getFilledBuffer().subarray(l));
            i.encodeFixedUint8Array(I);
            try {
                (console.debug(`Sending input chunk ${t}`), o.sendInputChunk(i.getFilledBuffer()));
            } catch (a) {
                console.debug('Failed to send input chunk:', a);
            }
        }
        async #a(e) {
            (this.#h(e - 1),
                await this.sendFinishedChunk(),
                this.#c.runAt(async () => await this.#a(e + 1), C(e + 1) * 1e3));
        }
        startAudioCapture(e) {
            ((this.#s = e), (this.#i = !0));
        }
        stopAudioCapture() {
            ((this.#s = null), (this.#i = !1));
        }
    }
    function _(n, e) {
        const t = new Uint8Array(n.length + e.length);
        return (t.set(n), t.set(e, n.length), t);
    }
    function $(n) {
        if (o !== void 0) {
            if (o.url === n) return;
            o.close();
        }
        ((o = new F(n)),
            o.addEventListener('open', (e) => {
                (console.debug(`Connected to ${n}`),
                    postMessage({ type: 'builder-connection-state', state: 'connected' }));
            }),
            o.addEventListener('close', (e) => {
                (console.debug(`Closed ${n}`),
                    postMessage({ type: 'builder-connection-state', state: 'disconnected' }));
            }),
            o.addEventListener('error', (e) => {
                postMessage({
                    type: 'builder-connection-state',
                    state: 'disconnected',
                    error: 'Connection failed',
                });
            }),
            o.open());
    }
    function J() {
        o !== void 0 && (o.close(), (o = void 0));
    }
    function W(n, e, t, s) {
        v();
        const i = d.ensurePresent(n, e);
        (i.startAudioCapture(t),
            f !== void 0 && f.close(),
            (f = s),
            (f.onmessage = async (r) => {
                (i.pushAudio(r.data), await i.sendFinishedChunk());
            }),
            f.start());
    }
    function v() {
        for (const n of d.values()) n.stopAudioCapture();
    }
    let o,
        L,
        d = new H({ create: (n, e) => new V(n, e), destroy: (n) => n.close() }),
        w,
        f;
    (addEventListener('message', async (n) => {
        switch (n.data.type) {
            case 'open': {
                ($(n.data.url), (L = await b.fromJSON(n.data.inputPrivateKeyJSON)));
                break;
            }
            case 'close':
                (J(), d.clear());
                break;
            case 'add-vm':
                d.ensurePresent(n.data.serviceId, n.data.vmId);
                break;
            case 'remove-vm':
                d.ensureAbsent(n.data.serviceId, n.data.vmId);
                break;
            case 'set-vms':
                d.ensureIntersectionPresent(n.data.vms);
                break;
            case 'start-audio-capture': {
                W(n.data.serviceId, n.data.vmId, g.fromPlain(n.data.audio), n.ports[0]);
                break;
            }
            case 'stop-audio-capture':
                v();
                break;
            case 'parameters':
                w = n.data.parameters;
                for (const e of d.values()) e.start();
                break;
            case 'host-message':
                d.ensurePresent(n.data.serviceId, n.data.vmId).pushHostMessage(n.data.message);
                break;
            case 'console-chunk':
                d.ensurePresent(n.data.serviceId, n.data.vmId).pushConsole(n.data.chunk);
                break;
            default:
                throw new Error(`Invalid message type: ${n.data.type}`);
        }
    }),
        addEventListener('error', (n) =>
            postMessage({
                type: 'error',
                error: { message: n.message, filename: 'input-pusher.js' },
            }),
        ),
        addEventListener('unhandledrejection', (n) =>
            postMessage({
                type: 'error',
                error: { message: n.reason, filename: 'input-pusher.js' },
            }),
        ));
})();
