(function () {
    'use strict';
    class N extends Error {
        constructor(...e) {
            super(...e);
        }
    }
    class l {
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
            const t = new l();
            if (
                ((t.width = e.decodeUint16()),
                (t.height = e.decodeUint16()),
                (t.refreshRate = e.decodeUint16()),
                (t.options = e.decodeUint64()),
                t.width === 0 || t.height === 0 || t.refreshRate === 0)
            )
                throw new N('Invalid VideoMode');
            return t;
        }
        static fromPlain(e) {
            return e == null ? e : Object.assign(new l(), e);
        }
    }
    const v = Object.freeze({
        S16LE: 1,
        decode(i) {
            const e = i.decodeCompactUint();
            if (e === 1) return v.S16LE;
            throw new Error(`Invalid AudioSampleFormat: ${e}`);
        },
    });
    class m {
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
            const t = new m();
            if (
                ((t.sampleRate = e.decodeUint32()),
                (t.channels = e.decodeUint8()),
                (t.sampleFormat = v.decode(e)),
                t.sampleRate === 0 || t.channels === 0)
            )
                throw new N('Invalid AudioMode');
            return t;
        }
        static fromPlain(e) {
            return e == null ? e : Object.assign(new m(), e);
        }
        sampleLen() {
            return this.sampleFormat === v.S16LE ? 2 : 0;
        }
        frameLen() {
            return this.sampleLen() * this.channels;
        }
        bytesPerSecond() {
            return this.sampleRate * this.channels * this.sampleLen();
        }
    }
    const M = 30;
    function A(i, e) {
        return 1735732800 + Math.floor(i) * e;
    }
    function S(i, e) {
        return Math.floor((i - 1735732800) / e);
    }
    const r = Object.freeze({ IDLE: 0, PENDING: 1, RUNNING: 2, CLOSED: 3 });
    class p {
        #e = 0;
        #s = r.IDLE;
        #i = 0;
        #t = null;
        #a = 0;
        runAt(e, t) {
            switch (this.#s) {
                case r.IDLE:
                    ((this.#s = r.PENDING),
                        (this.#i = t),
                        (this.#e = setTimeout(
                            () => {
                                if (
                                    ((this.#e = 0),
                                    this.#s !== r.CLOSED &&
                                        ((this.#s = r.RUNNING),
                                        e(),
                                        this.#s === r.RUNNING &&
                                            ((this.#s = r.IDLE), this.#t !== null)))
                                ) {
                                    const s = this.#t;
                                    this.#t = null;
                                    const n = this.#a;
                                    this.runAt(s, n);
                                }
                            },
                            Math.max(0, t - Date.now()),
                        )));
                    break;
                case r.PENDING:
                    if (this.#i <= t) return;
                    ((this.#s = r.IDLE), this.runAt(e, t));
                    break;
                case r.RUNNING:
                    ((this.#t = e), (this.#a = t));
                    break;
                case r.CLOSED:
                    break;
            }
        }
        close() {
            ((this.#s = r.CLOSED), clearTimeout(this.#e), (this.#e = 0), (this.#t = null));
        }
    }
    function u(i, e) {
        return BigInt(i) + BigInt(e) * 2n ** 32n;
    }
    function F(i) {
        return Number(i % 2n ** 32n);
    }
    function R(i) {
        return Math.floor(Number(i / 2n ** 32n));
    }
    class U {
        #e = new Map();
        #s;
        #i;
        constructor(e) {
            ((this.#s = e?.create), (this.#i = e?.destroy));
        }
        set(e, t, s) {
            const n = u(e, t);
            this.#e.set(n, s);
        }
        get(e, t) {
            const s = u(e, t);
            return this.#e.get(s);
        }
        ensurePresent(e, t, s) {
            const n = u(e, t);
            let o = this.#e.get(n);
            return (o === void 0 && ((o = (s || this.#s)(e, t)), this.#e.set(n, o)), o);
        }
        ensureAbsent(e, t) {
            const s = u(e, t),
                n = this.#e.get(s);
            return n !== void 0 ? (this.#i(n), this.#e.delete(s), !0) : !1;
        }
        ensureIntersectionPresent(e, t) {
            const s = t?.create || this.#s,
                n = t?.destroy || this.#i,
                o = t?.added,
                w = t?.removed,
                E = new Set();
            for (const [d, f] of e) {
                const g = u(d, f);
                (E.add(g), this.#e.get(g) === void 0 && (this.#e.set(g, s(d, f)), o && o(d, f)));
            }
            for (const [d, f] of this.#e.entries())
                if (!E.has(d) && (n(f), this.#e.delete(d), w)) {
                    const g = F(d),
                        b = R(d);
                    w(g, b);
                }
        }
        clear() {
            for (const e of this.#e.values()) this.#i(e);
            this.#e.clear();
        }
        values() {
            return this.#e.values();
        }
    }
    const a = Object.freeze({ INITIAL: 0, BUFFERING: 1, RUNNING: 2 });
    class k {
        #e;
        #s;
        #i = a.INITIAL;
        #t = [];
        #a = [];
        #o = [];
        #m = new p();
        #u = new p();
        #f = 0;
        #c = null;
        #I = 0;
        #l = null;
        #n = [];
        #w = 0;
        #N = !1;
        #y = 0;
        #E = 0;
        #h = 0;
        #b = new p();
        #d = 0;
        #r = null;
        constructor(e, t) {
            ((this.#e = e), (this.#s = t));
        }
        appendChunks(e) {
            if (
                (e.firstSlot && (this.state = a.BUFFERING),
                'video' in e && ((this.#t = this.#t.concat(e.video)), this.#t.length !== 0))
            ) {
                this.#c = l.fromPlain(this.#t[0].mode);
                const s = this.#t[0].timestamp,
                    n = s * 1e3;
                this.#m.runAt(() => this.#v(s), n);
            }
            ('audio' in e &&
                (this.#l === null &&
                    e.audio.length !== 0 &&
                    (this.#l = m.fromPlain(e.audio[0].mode)),
                (this.#n = this.#n.concat(e.audio)),
                this.forwardBufferedAudio()),
                'stdout' in e && (this.#a = this.#a.concat(e.stdout)),
                'stderr' in e && (this.#o = this.#o.concat(e.stderr)));
            const t = this.#p();
            if (t !== void 0) {
                const s = t[0].timestamp,
                    n = s * 1e3;
                this.#u.runAt(() => this.#g(s), n);
            }
        }
        get state() {
            return this.#i;
        }
        set state(e) {
            if (this.#i === e) return;
            (this.#i === a.INITIAL &&
                (this.#f = setInterval(() => {
                    this.#r !== null && this.#r.postMessage({ type: 'status' });
                }, 1 / M)),
                (this.#i = e));
            const t = Date.now();
            switch (e) {
                case a.INITIAL:
                    throw new Error('Illegal state transition');
                case a.BUFFERING:
                    if (c === null) throw new Error('Parameters are not set');
                    (this.#d !== 0 && (this.#F(), (this.#d = 0)),
                        (this.#h = t),
                        postMessage({
                            type: 'buffering',
                            serviceId: this.#e,
                            vmId: this.#s,
                            audioFrames: this.remainingAudioFrames(),
                            videoFrames: this.remainingVideoFrames(),
                        }),
                        this.#M(t * 0.001));
                    break;
                case a.RUNNING:
                    if (c === null) throw new Error('Parameters are not set');
                    (this.#h !== 0 && (this.#R(), (this.#h = 0)),
                        this.#c !== null && this.#t.length !== 0 && (this.#d = t),
                        this.forwardBufferedAudio(),
                        postMessage({ type: 'started', serviceId: this.#e, vmId: this.#s }));
                    break;
            }
        }
        #U(e) {
            if (this.#i !== a.RUNNING) {
                if (
                    (this.#A(this.#a, e),
                    this.#A(this.#o, e),
                    this.#k(e),
                    this.#P(e),
                    this.#a.length === 0 &&
                        this.#o.length === 0 &&
                        this.#t.length === 0 &&
                        this.#n.length === 0)
                ) {
                    this.#M(e);
                    return;
                }
                ((this.state = a.RUNNING), this.#g(e), this.#v(e));
            }
        }
        #M(e) {
            const t = I(e),
                s = t * 1e3;
            this.#b.runAt(() => this.#U(t), s);
        }
        forwardBufferedAudio() {
            if (this.#n.length === 0 || this.#r === null || this.#i !== a.RUNNING) return;
            const e = this.#n;
            ((this.#n = []), this.#T(e));
        }
        #k(e) {
            const t = this.#t.length;
            for (; this.#t.length !== 0 && this.#t[0].timestamp < e;) this.#t.shift();
            if (t !== this.#t.length) {
                const s = t - this.#t.length;
                console.debug(`Removed ${s} outdated video frame(s)`);
            }
        }
        #P(e) {
            const t = this.#n.length;
            for (; this.#n.length !== 0 && this.#n[0].endTime < e;) this.#n.shift();
            if (t !== this.#n.length) {
                const s = t - this.#n.length;
                console.debug(`Removed ${s} outdated audio chunk(s)`);
            }
        }
        #A(e, t) {
            const s = e.length;
            for (; e.length !== 0 && e[0].timestamp < t;) e.shift();
            e.length !== s && console.debug(`Removed ${s - e.length} outdated console chunk(s)`);
        }
        set audioPort(e) {
            (this.#S(),
                (this.#r = e),
                (this.#r.onmessage = (t) => {
                    switch (t.data.type) {
                        case 'audio-event':
                            postMessage({ serviceId: this.#e, vmId: this.#s, ...t.data });
                            break;
                        case 'status':
                            (this.onStatus(t.data.framesPlayed),
                                this.checkStarving(),
                                postMessage({
                                    type: 'audio-remaining',
                                    serviceId: this.#e,
                                    vmId: this.#s,
                                    remaining: this.remainingAudioFrames(),
                                }));
                            break;
                        default:
                            throw new Error(`Invalid message type: ${t.data.type}`);
                    }
                }),
                this.#r.start(),
                this.forwardBufferedAudio());
        }
        close() {
            (clearInterval(this.#f),
                this.#S(),
                (this.#f = 0),
                this.#b.close(),
                this.#u.close(),
                this.#m.close());
        }
        #S() {
            this.#r !== null && (this.#r.postMessage({ type: 'stop' }), this.#r.close());
        }
        #g(e) {
            this.#x(e);
            const t = this.#p();
            let s;
            t === void 0 ? (s = I(e)) : (s = t[0].timestamp);
            const n = s * 1e3;
            this.#u.runAt(() => this.#g(s), n);
        }
        #v(e) {
            this.#L(e);
            let t;
            this.#t.length === 0
                ? (this.#c !== null && (this.state = a.BUFFERING), (t = I(e)))
                : (t = this.#t[0].timestamp);
            const s = t * 1e3;
            this.#m.runAt(() => this.#v(t), s);
            const n = new Date((e - c.slot_period_sec) * 1e3),
                o = n.getHours() * 3600 + n.getMinutes() * 60 + n.getSeconds();
            postMessage({
                type: 'timestamp',
                serviceId: this.#e,
                vmId: this.#s,
                timestamp: o,
                slot: Math.max(this.#I, this.#w),
            });
        }
        #L(e) {
            for (; this.#t.length !== 0;) {
                const t = this.#t[0];
                if (t.timestamp > e) break;
                ((t.mode = l.fromPlain(t.mode)),
                    (this.#c = t.mode),
                    (this.#I = t.slot),
                    postMessage(
                        {
                            type: 'video',
                            serviceId: this.#e,
                            vmId: this.#s,
                            image: t.image,
                            remaining: this.#t.length,
                        },
                        [t.image],
                    ),
                    this.#t.shift());
            }
        }
        #T(e) {
            for (const t of e) {
                if (
                    ((t.mode = m.fromPlain(t.mode)),
                    (this.#l = t.mode),
                    (this.#w = t.slot),
                    t.channels.length === 0)
                )
                    throw new Error('No audio channels');
                ((this.#y += t.channels[0].byteLength / 4),
                    this.#N ||
                        (this.#r.postMessage({ type: 'start', mode: t.mode }),
                        (this.#N = !0),
                        postMessage({
                            type: 'start-audio-playback',
                            serviceId: this.#e,
                            vmId: this.#s,
                        })),
                    this.#r.postMessage(
                        {
                            type: 'chunk',
                            channels: t.channels,
                            startTime: t.startTime,
                            endTime: t.endTime,
                        },
                        t.channels,
                    ));
            }
        }
        #x(e) {
            for (;;) {
                const t = this.#p();
                if (t === void 0 || t[0].timestamp > e) break;
                const s = t.shift();
                postMessage({
                    type: 'console',
                    serviceId: this.#e,
                    vmId: this.#s,
                    text: s.text,
                    timestamp: s.timestamp,
                });
            }
        }
        #p() {
            const e = this.#a.length === 0,
                t = this.#o.length === 0;
            if (e && t) return;
            let s;
            return (
                !e && !t
                    ? (s = this.#a[0].timestamp < this.#o[0].timestamp ? this.#a : this.#o)
                    : e
                      ? (s = this.#o)
                      : (s = this.#a),
                s
            );
        }
        remainingAudioFrames() {
            return this.#y - Math.floor(this.#E);
        }
        remainingVideoFrames() {
            return this.#t.length;
        }
        checkStarving() {
            if (this.#i !== a.RUNNING) return;
            const e = this.remainingAudioFrames(),
                t = this.remainingVideoFrames();
            (this.#c !== null && t === 0 && e !== 0 && console.warn('Video playback is starving'),
                this.#l !== null &&
                    t !== 0 &&
                    e === 0 &&
                    console.warn('Audio playback is starving'));
        }
        firePeriodicEvent() {
            switch (this.#i) {
                case a.RUNNING:
                    if (this.#d !== 0) {
                        const e = this.#F();
                        this.#d = e.endTime;
                    }
                    break;
                case a.BUFFERING:
                    if (this.#h !== 0) {
                        const e = this.#R();
                        this.#h = e.endTime;
                    }
                    break;
            }
        }
        #F() {
            const e = {
                type: 'video-event',
                serviceId: this.#e,
                vmId: this.#s,
                startTime: this.#d,
                endTime: Date.now(),
            };
            return (postMessage(e), e);
        }
        #R() {
            const e = {
                type: 'buffering-event',
                serviceId: this.#e,
                vmId: this.#s,
                startTime: this.#h,
                endTime: Date.now(),
            };
            return (postMessage(e), e);
        }
        onStatus(e) {
            this.#E = e;
        }
    }
    function I(i) {
        const e = S(i, c.slot_period_sec);
        return A(e + 1, c.slot_period_sec);
    }
    const h = new U({ create: (i, e) => new k(i, e), destroy: (i) => i.close() });
    let y = null,
        c = null;
    (addEventListener('message', async (i) => {
        switch (i.data.type) {
            case 'transcoder-port':
                ((y = i.ports[0]),
                    (y.onmessage = (e) => {
                        const t = e.data.serviceId,
                            s = e.data.vmId;
                        switch (e.data.type) {
                            case 'chunks':
                                h.ensurePresent(t, s).appendChunks(e.data);
                                break;
                            case 'reset':
                                (h.ensureAbsent(t, s),
                                    h.ensurePresent(t, s),
                                    postMessage({
                                        type: 'reset',
                                        serviceId: t,
                                        vmId: s,
                                        video: e.data.video,
                                        audio: e.data.audio,
                                    }));
                                break;
                        }
                    }));
                break;
            case 'audio-port':
                h.ensurePresent(i.data.serviceId, i.data.vmId).audioPort = i.ports[0];
                break;
            case 'parameters':
                c = i.data.parameters;
                break;
            case 'best-block':
                for (const e of h.values()) e.firePeriodicEvent();
                break;
            case 'add-vm':
                h.ensurePresent(i.data.serviceId, i.data.vmId);
                break;
            case 'remove-vm':
                h.ensureAbsent(i.data.serviceId, i.data.vmId);
                break;
            case 'set-vms':
                h.ensureIntersectionPresent(i.data.vms);
                break;
            default:
                throw new Error(`Invalid message type: ${i.data.type}`);
        }
    }),
        addEventListener('error', (i) =>
            postMessage({ type: 'error', error: { message: i.message, filename: 'engine.js' } }),
        ),
        addEventListener('unhandledrejection', (i) =>
            postMessage({ type: 'error', error: { message: i.reason, filename: 'engine.js' } }),
        ));
})();
