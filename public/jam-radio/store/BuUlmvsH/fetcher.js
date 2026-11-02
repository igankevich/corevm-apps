(function () {
    'use strict';
    class Z {
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
                ((e = Number(e)), this.encodeUint8(((e >> 24) & 255) | 224), this.#i(e & 16777215));
                return;
            }
            if (e < 2 ** 35) {
                (this.encodeUint8((Number(BigInt(e) >> 32n) & 255) | 240),
                    this.encodeUint32(Number(e) & 4294967295));
                return;
            }
            if (e < 2 ** 42) {
                (this.encodeUint8((Number(BigInt(e) >> 40n) & 255) | 248),
                    this.#r(BigInt(e) & 0xffffffffffn));
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
        #i(e) {
            (this.encodeUint16(e & 65535), this.encodeUint8((e >> 16) & 255));
        }
        #r(e) {
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
            this.#s(this.#t.setUint8, 1, e);
        }
        encodeUint16(e) {
            this.#s(this.#t.setUint16, 2, e);
        }
        encodeUint32(e) {
            this.#s(this.#t.setUint32, 4, e);
        }
        encodeUint64(e) {
            this.#s(this.#t.setBigUint64, 8, e);
        }
        encodeBool(e) {
            this.encodeUint8(e ? 1 : 0);
        }
        encodeArray(e, t) {
            (this.encodeCompactUint(e), this.encodeFixedArray(e, t));
        }
        encodeFixedArray(e, t) {
            for (let n = 0; n < e; ++n) t(n);
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
        #s(e, t, n) {
            if (this.remaining() < t) throw new Error('Buffer overflow');
            (e.call(this.#t, this.#n, n, !0), (this.#n += t));
        }
    }
    class U {
        #e;
        #t = 0;
        constructor(e) {
            this.#e = new DataView(new Uint8Array(e).buffer);
        }
        remaining() {
            return this.#e.byteLength - this.#t;
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
                const t = this.#i();
                return ((e - 224) << 24) | t;
            }
            if (e < 248) {
                const t = this.decodeUint32();
                return Number(BigInt(e - 240) << 32n) + t;
            }
            if (e < 252) {
                const t = this.#r();
                return Number(BigInt(e - 248) << 40n) + t;
            }
            if (e < 254) {
                const t = this.#c();
                return Number(BigInt(e - 252) << 48n) + t;
            }
            if (e < 255) {
                const t = this.#o();
                return (BigInt(e - 254) << 56n) | BigInt(t);
            }
            return this.decodeUint64();
        }
        #i() {
            if (this.remaining() < 3) throw new w('Unexpected EOF');
            const e = this.#e.getUint16(this.#t, !0);
            this.#t += 2;
            const t = this.#e.getUint8(this.#t);
            return ((this.#t += 1), (t << 16) | e);
        }
        #r() {
            if (this.remaining() < 5) throw new w('Unexpected EOF');
            const e = this.#e.getUint32(this.#t, !0);
            this.#t += 4;
            const t = this.#e.getUint8(this.#t);
            return ((this.#t += 1), Number(BigInt(t) << 32n) + e);
        }
        #c() {
            if (this.remaining() < 6) throw new w('Unexpected EOF');
            const e = this.#e.getUint32(this.#t, !0);
            this.#t += 4;
            const t = this.#e.getUint16(this.#t, !0);
            return ((this.#t += 2), Number(BigInt(t) << 32n) + e);
        }
        #o() {
            if (this.remaining() < 7) throw new w('Unexpected EOF');
            const e = this.#e.getUint32(this.#t, !0);
            this.#t += 4;
            const t = this.#e.getUint16(this.#t, !0);
            this.#t += 2;
            const n = this.#e.getUint8(this.#t);
            return ((this.#t += 1), (BigInt(n) << 48n) | (BigInt(t) << 32n) | BigInt(e));
        }
        decodeBool() {
            switch (this.#s(this.#e.getUint8, 1)) {
                case 0:
                    return !1;
                case 1:
                    return !0;
                default:
                    throw new w('Invalid bool');
            }
        }
        decodeUint8() {
            return this.#s(this.#e.getUint8, 1);
        }
        decodeUint16() {
            return this.#s(this.#e.getUint16, 2);
        }
        decodeUint32() {
            return this.#s(this.#e.getUint32, 4);
        }
        decodeUint64() {
            return this.#s(this.#e.getBigUint64, 8);
        }
        decodeInt64() {
            return this.#s(this.#e.getBigInt64, 8);
        }
        decodeUint8Array() {
            const e = this.decodeCompactUint();
            return this.decodeFixedUint8Array(e);
        }
        decodeFixedUint8Array(e) {
            if (this.remaining() < e) throw new w('Unexpected EOF');
            const t = new Uint8Array(this.#e.buffer, this.#t, e);
            return ((this.#t += e), t);
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
            const n = new Array(e);
            for (let r = 0; r < e; ++r) n[r] = t(r);
            return n;
        }
        #s(e, t) {
            if (this.remaining() < t) throw new w('Unexpected EOF');
            const n = e.call(this.#e, this.#t, !0);
            return ((this.#t += t), n);
        }
        decodeOption(e) {
            switch (this.decodeUint8()) {
                case 0:
                    return null;
                case 1:
                    return e();
                default:
                    throw new w('Invalid option');
            }
        }
        decodeCString() {
            const e = this.decodeCompactUint();
            if (this.remaining() < e) throw new w('Unexpected EOF');
            const t = new Uint8Array(e + 1);
            for (let n = 0; n < e; ++n) t[n] = this.#e.getUint8(this.#t + n);
            return ((this.#t += e), t);
        }
    }
    class w extends Error {
        constructor(...e) {
            super(...e);
        }
    }
    class k {
        static decode(e) {
            const t = e.decodeCompactUint();
            if (t === 0) return $.decode(e);
            throw new w(`Invalid ConventionalMetadata: ${t}`);
        }
        static decodeWrapped(e) {
            const t = e.decodeCompactUint();
            if (t === 0) return null;
            const n = e.decodeFixedUint8Array(t),
                r = new U(n);
            return k.decode(r);
        }
    }
    class $ extends k {
        name;
        version;
        license;
        authors;
        static decode(e) {
            const t = new $();
            return (
                (t.name = e.decodeString()),
                (t.version = e.decodeString()),
                (t.license = e.decodeString()),
                (t.authors = e.decodeArray(() => e.decodeString())),
                t
            );
        }
    }
    const re = 1735732800,
        j = 4104,
        z = 32,
        Q = 0;
    class D {
        codeHash;
        balance;
        minItemGas;
        minMemoGas;
        bytes;
        depositOffset;
        items;
        creationSlot;
        lastAccumulationSlot;
        parentService;
        isZombie() {
            return this.codeHash.subarray(4).every((e) => e === 0);
        }
        static decode(e) {
            const t = e.decodeUint8();
            if (t !== Q) throw new w(`Invalid service version ${t}, expected ${Q}`);
            const n = new D();
            return (
                (n.codeHash = e.decodeFixedUint8Array(z)),
                (n.balance = e.decodeUint64()),
                (n.minItemGas = e.decodeUint64()),
                (n.minMemoGas = e.decodeUint64()),
                (n.bytes = e.decodeUint64()),
                (n.depositOffset = e.decodeUint64()),
                (n.items = e.decodeUint32()),
                (n.creationSlot = e.decodeUint32()),
                (n.lastAccumulationSlot = e.decodeUint32()),
                (n.parentService = e.decodeUint32()),
                n
            );
        }
    }
    class Y {
        #e = new Map();
        addEventListener(e, t) {
            const n = this.#e.get(e);
            n === void 0 ? this.#e.set(e, [t]) : n.push(t);
        }
        removeEventListener(e, t) {
            const n = this.#e.get(e);
            if (n === void 0) return;
            const r = n.indexOf(t);
            r !== -1 && n.splice(r, 1);
        }
        async fireEvent(e, t) {
            const n = this.#e.get(e) || [];
            await Promise.all(n.map((r) => r(t)));
        }
    }
    class oe {
        url;
        #e = 0;
        constructor(e) {
            this.url = e;
        }
        nextId() {
            const e = this.#e;
            return (
                this.#e === Number.MAX_SAFE_INTEGER
                    ? (console.debug('JSON RPC id wrapped'), (this.#e = 0))
                    : this.#e++,
                e
            );
        }
    }
    class ce {
        #e;
        #t = new Map();
        #n = new Y();
        #i;
        #r = 3e4;
        #c = 3e4;
        #o;
        constructor(e, t) {
            ((this.#e = new oe(ae(e))),
                t &&
                    ('requestTimeout' in t && (this.#r = t.requestTimeout),
                    'connectTimeout' in t && (this.#c = t.connectTimeout)));
        }
        open() {
            (this.#i && this.close(),
                (this.#i = new WebSocket(this.#e.url)),
                (this.#o = setTimeout(() => {
                    this.socket && this.socket.readyState === WebSocket.CONNECTING && this.close();
                }, this.#c)),
                this.#i.addEventListener('open', async (e) => {
                    (clearTimeout(this.#o), await this.#n.fireEvent('open', e));
                }),
                this.#i.addEventListener('message', async (e) => await this.#a(JSON.parse(e.data))),
                this.#i.addEventListener('close', async (e) => {
                    (this.#s('WebSocket closed'), await this.#n.fireEvent('close', e));
                }),
                this.#i.addEventListener('error', async (e) => {
                    (this.#s(e.reason), await this.#n.fireEvent('error', e));
                }));
        }
        close() {
            this.#i && this.#i.close();
        }
        #s(e) {
            for (const t of this.#t.values()) {
                const n = t.reject;
                n !== void 0 && n(e);
            }
        }
        request(e, t) {
            const n = this.#e.nextId(),
                r = { jsonrpc: '2.0', id: n, method: e, params: t };
            return (
                this.#i.send(JSON.stringify(r)),
                new Promise((d, f) => {
                    const u = setTimeout(() => f('Timed out'), this.#r),
                        h = (o) => {
                            (clearTimeout(u), d(o));
                        },
                        c = (o) => {
                            (clearTimeout(u), f(o));
                        },
                        i = this.#t.get(n);
                    i === void 0
                        ? this.#t.set(n, { resolve: h, reject: c })
                        : ((i.resolve = h), (i.reject = c), this.#d(i), this.#t.delete(n));
                })
            );
        }
        async #a(e) {
            const t = e.id;
            if (t === void 0) {
                await this.#n.fireEvent('notification', e);
                return;
            }
            const n = this.#t.get(t);
            if (n === void 0) {
                this.#t.set(t, { response: e });
                return;
            }
            ((n.response = e), this.#d(n), this.#t.delete(t));
        }
        #d(e) {
            let t = !1;
            const n = e.response.error;
            n !== void 0 && (e.reject(n), (t = !0));
            const r = e.response.result;
            !t && r !== void 0 && e.resolve(r);
        }
        addEventListener(e, t) {
            this.#n.addEventListener(e, t);
        }
        removeEventListener(e, t) {
            this.#n.removeEventListener(e, t);
        }
    }
    function ae(s) {
        return s.startsWith('http://')
            ? 'ws://' + s.slice(7)
            : s.startsWith('https://')
              ? 'wss://' + s.slice(8)
              : s;
    }
    function x(s) {
        return s === null
            ? null
            : 'fromBase64' in Uint8Array
              ? Uint8Array.fromBase64(s)
              : Uint8Array.from(atob(s), (e) => e.codePointAt(0));
    }
    function S(s) {
        return typeof s == 'string'
            ? s
            : 'toBase64' in Uint8Array
              ? s instanceof Uint8Array
                  ? s.toBase64()
                  : Uint8Array.from(s).toBase64()
              : btoa(Array.from(s, (e) => String.fromCodePoint(e)).join(''));
    }
    class de {
        #e;
        #t = null;
        #n = {};
        #i = new Y();
        #r = null;
        #c;
        #o;
        constructor(e) {
            this.#e = e;
        }
        async connect() {
            (console.debug(`Connecting to ${this.#e}...`),
                this.#s('state', 'connecting'),
                (this.#n = {}),
                (this.#t = new ce(this.#e)),
                this.#t.addEventListener('notification', (e) => {
                    const t = e.params?.subscription;
                    if (t in this.#n) return this.#n[t](e.params.result);
                    console.debug(`Unknown subscription id: ${t}`);
                }),
                this.#t.addEventListener('open', (e) => {
                    (this.#s('open', e), this.#s('state', 'connected'));
                }),
                (this.#c = (e) => {
                    (this.#s('close', e), this.#s('state', 'connecting'), this.reconnect());
                }),
                this.#t.addEventListener('close', this.#c),
                (this.#o = (e) => {
                    (this.#s('error', e), this.#s('state', 'connecting'), this.reconnect());
                }),
                this.#t.addEventListener('error', this.#o),
                this.#t.open());
        }
        reconnect() {
            (clearTimeout(this.#r), (this.#r = setTimeout(() => this.connect(), he)));
        }
        close() {
            (clearTimeout(this.#r),
                this.#t !== null &&
                    (this.#t.removeEventListener('close', this.#c),
                    this.#t.removeEventListener('error', this.#o),
                    this.#t.close()));
        }
        addEventListener(e, t) {
            this.#i.addEventListener(e, t);
        }
        removeEventListener(e, t) {
            this.#i.removeEventListener(e, t);
        }
        #s(e, t) {
            this.#i.fireEvent(e, t);
        }
        async parameters() {
            return await this.#t.request('parameters');
        }
        async bestBlock() {
            const e = await this.#t.request('bestBlock');
            return ((e.header_hash = x(e.header_hash)), e);
        }
        async subscribeBestBlock(e) {
            const t = await this.#t.request('subscribeBestBlock');
            this.#n[t] = (n) => {
                ((n.header_hash = x(n.header_hash)), e(n));
            };
        }
        async listServices(e) {
            return await this.#t.request('listServices', [S(e)]);
        }
        async serviceValue(e, t, n) {
            return x(await this.#t.request('serviceValue', [S(e), t, S(n)]));
        }
        async typedServiceValue(e, t, n, r) {
            const a = await this.serviceValue(e, t, n);
            return a === null ? null : r.decode(new U(a));
        }
        async fetchSegments(e, t) {
            return (await this.#t.request('fetchSegments', [S(e), t])).map((n) => x(n));
        }
        async serviceData(e, t) {
            const n = x(await this.#t.request('serviceData', [S(e), t]));
            return D.decode(new U(n));
        }
        async servicePreimage(e, t, n) {
            return x(await this.#t.request('servicePreimage', [S(e), t, S(n)]));
        }
    }
    const he = 3e4;
    class I {
        serviceId;
        hash;
        constructor(e, t) {
            ((this.serviceId = e), (this.hash = t));
        }
        encode(e) {
            (e.encodeUint32(this.serviceId), e.encodeFixedUint8Array(this.hash));
        }
        static decode(e) {
            const t = new I();
            return ((t.serviceId = e.decodeUint32()), (t.hash = e.decodeFixedUint8Array(z)), t);
        }
    }
    const H = Object.freeze({
        File: 0,
        Dir: 1,
        decode(s) {
            const e = s.decodeCompactUint();
            switch (e) {
                case 0:
                    return H.File;
                case 1:
                    return H.Dir;
                default:
                    throw new Error(`Invalid NodeKind: ${e}`);
            }
        },
    });
    class W {
        kind;
        fileSize;
        blockSize;
        blockRefs;
        firstBlock;
        static decode(e) {
            const t = new W();
            return (
                (t.kind = H.decode(e)),
                (t.fileSize = e.decodeCompactUint64()),
                (t.blockSize = e.decodeCompactUint64()),
                (t.blockRefs = e.decodeArray(() => I.decode(e))),
                (t.firstBlock = e.decodeFixedUint8Array(e.remaining())),
                t
            );
        }
    }
    const y = Object.freeze({
            Shared: class {
                key;
                encode(e) {
                    (e.encodeCompactUint(0), this.key.encode(e));
                }
                encoded() {
                    const e = new Z(new Uint8Array(5));
                    return (this.encode(e), e.getFilledBuffer());
                }
            },
            Inner: class {
                innerVmId;
                key;
                encode(e) {
                    (e.encodeCompactUint(1), e.encodeUint32(this.innerVmId), this.key.encode(e));
                }
                encoded() {
                    const e = new Z(new Uint8Array(6));
                    return (this.encode(e), e.getFilledBuffer());
                }
            },
            fromShared(s) {
                const e = new y.Shared();
                return ((e.key = s), e);
            },
            fromInner(s, e) {
                const t = new y.Inner();
                return ((t.innerVmId = s), (t.key = e), t);
            },
        }),
        fe = Object.freeze({
            Owner: class {
                encode(e) {
                    e.encodeCompactUint(0);
                }
            },
            Vms: class P {
                key;
                constructor(e) {
                    this.key = e;
                }
                static level0() {
                    return new P(new Uint8Array());
                }
                static level1(e) {
                    return new P(new Uint8Array([e]));
                }
                static level2(e, t) {
                    return new P(new Uint8Array([e, t]));
                }
                static level3(e, t, n) {
                    return new P(new Uint8Array([e, t, n]));
                }
                encode(e) {
                    (e.encodeCompactUint(1), e.encodeFixedUint8Array(this.key));
                }
            },
        }),
        b = Object.freeze({
            StateHash: class {
                encode(e) {
                    e.encodeCompactUint(0);
                }
            },
            VmSpec: class {
                encode(e) {
                    e.encodeCompactUint(2);
                }
            },
            VideoMode: class {
                encode(e) {
                    e.encodeCompactUint(3);
                }
            },
            AudioMode: class {
                encode(e) {
                    e.encodeCompactUint(4);
                }
            },
            ExecEnvRef: class {
                encode(e) {
                    e.encodeCompactUint(5);
                }
            },
            ResetCounter: class {
                encode(e) {
                    e.encodeCompactUint(12);
                }
            },
        });
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
                throw new w('Invalid VideoMode');
            return t;
        }
        static fromPlain(e) {
            return e == null ? e : Object.assign(new L(), e);
        }
    }
    const q = Object.freeze({
        S16LE: 1,
        decode(s) {
            const e = s.decodeCompactUint();
            if (e === 1) return q.S16LE;
            throw new Error(`Invalid AudioSampleFormat: ${e}`);
        },
    });
    class B {
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
            const t = new B();
            if (
                ((t.sampleRate = e.decodeUint32()),
                (t.channels = e.decodeUint8()),
                (t.sampleFormat = q.decode(e)),
                t.sampleRate === 0 || t.channels === 0)
            )
                throw new w('Invalid AudioMode');
            return t;
        }
        static fromPlain(e) {
            return e == null ? e : Object.assign(new B(), e);
        }
        sampleLen() {
            return this.sampleFormat === q.S16LE ? 2 : 0;
        }
        frameLen() {
            return this.sampleLen() * this.channels;
        }
        bytesPerSecond() {
            return this.sampleRate * this.channels * this.sampleLen();
        }
    }
    const g = Object.freeze({
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
        decode(s) {
            const e = s.decodeCompactUint();
            switch (e) {
                case 0:
                    return new g.Halt();
                case 1:
                    return new g.Panic();
                case 2: {
                    const t = s.decodeUint32(),
                        n = s.decodeUint32();
                    return new g.PageFault(t, n);
                }
                case 3:
                    return new g.OutOfGas();
                case 4:
                    return new g.ExportsLimitReached();
                case 5:
                    return new g.TimeLimitReached();
                case 6: {
                    const t = s.decodeUint32();
                    return new g.WaitingForInput(t);
                }
                case 7:
                    return new g.ExtrinsicsSizeLimitReached();
                case 8:
                    return new g.WorkOutputSizeLimitReached();
                case 9:
                    return new g.PackingLimitReached();
                case 10:
                    return new g.DependenciesLimitReached();
                default:
                    throw new w(`Invalid Outcome discriminator: ${e}`);
            }
        },
    });
    class T {
        exportsRoot;
        output;
        state;
        static decode(e) {
            const t = new T();
            return (
                (t.exportsRoot = e.decodeFixedUint8Array(z)),
                (t.output = R.decode(e)),
                (t.state = C.decode(e)),
                t
            );
        }
        static fromPlain(e) {
            return e == null
                ? e
                : ((e.output = R.fromPlain(e.output)),
                  (e.state = C.fromPlain(e.state)),
                  Object.assign(new T(), e));
        }
    }
    class R {
        gasUsed;
        outcome;
        numRegularPages;
        numHashPages;
        streamLen;
        firstSegmentIndex;
        static decode(e) {
            const t = new R();
            return (
                (t.gasUsed = e.decodeUint64()),
                (t.outcome = g.decode(e)),
                (t.numRegularPages = e.decodeUint16()),
                (t.numHashPages = e.decodeUint16()),
                (t.streamLen = e.decodeFixedArray(4, () => e.decodeUint32())),
                (t.firstSegmentIndex = e.decodeUint16()),
                t
            );
        }
        static fromPlain(e) {
            return e == null ? e : Object.assign(new R(), e);
        }
        allStreamsLen() {
            return this.streamLen.reduce((e, t) => e + t, 0);
        }
    }
    class C {
        regs;
        programCounter;
        step;
        static decode(e) {
            const t = new C();
            return (
                (t.regs = e.decodeFixedArray(13, () => e.decodeUint64())),
                (t.programCounter = e.decodeUint64()),
                (t.step = e.decodeUint32()),
                t
            );
        }
        static fromPlain(e) {
            return e == null ? e : Object.assign(new C(), e);
        }
    }
    class V {
        program;
        rootDir;
        args;
        env;
        videoInput;
        audioInput;
        inputKey;
        encode(e) {
            (this.program.encode(e),
                this.rootDir.encode(e),
                e.encodeArray(this.args.length, (t) => e.encodeCString(this.args[t])),
                e.encodeArray(this.env.length, (t) => e.encodeCString(this.env[t])),
                e.encodeOption(this.videoInput, () => this.videoInput.encode(e)),
                e.encodeOption(this.audioInput, () => this.audioInput.encode(e)),
                e.encodeOption(this.inputKey, () => e.encodeFixedUint8Array(this.inputKey)));
        }
        static decode(e) {
            const t = new V();
            return (
                (t.program = I.decode(e)),
                (t.rootDir = I.decode(e)),
                (t.args = e.decodeArray(() => e.decodeCString())),
                (t.env = e.decodeArray(() => e.decodeCString())),
                (t.videoInput = e.decodeOption(() => L.decode(e))),
                (t.audioInput = e.decodeOption(() => B.decode(e))),
                (t.inputKey = e.decodeOption(() => e.decodeFixedUint8Array(32))),
                t
            );
        }
    }
    class F {
        #e;
        constructor(e) {
            this.#e = e || new Uint8Array(32);
        }
        contains(e) {
            const t = e >> 3,
                n = e & 7;
            return (this.#e[t] & (1 << n)) !== 0;
        }
        ones() {
            let e = this;
            return {
                *[Symbol.iterator]() {
                    for (let t = 0; t < 256; ++t) e.contains(t) && (yield t);
                },
            };
        }
        static decode(e) {
            const t = new F();
            return ((t.#e = e.decodeFixedUint8Array(32)), t);
        }
    }
    class ue {
        static loadIndicesSync(e) {
            const t = [],
                n = new ArrayBuffer(4),
                r = new Uint8Array(n),
                a = new DataView(n),
                d = e([]) || new F();
            for (const f of d.ones()) {
                const u = e([f]);
                if (u)
                    for (const h of u.ones()) {
                        const c = e([f, h]);
                        if (c)
                            for (const i of c.ones()) {
                                const o = e([f, h, i]);
                                if (o)
                                    for (const l of o.ones()) {
                                        r.set([f, h, i, l], 0);
                                        const v = a.getUint32(0, !1);
                                        t.push(v);
                                    }
                            }
                    }
            }
            return t;
        }
        static async loadIndices(e) {
            const t = [],
                n = new ArrayBuffer(4),
                r = new Uint8Array(n),
                a = new DataView(n),
                d = (await e([])) || new F();
            for (const f of d.ones()) {
                const u = await e([f]);
                if (u)
                    for (const h of u.ones()) {
                        const c = await e([f, h]);
                        if (c)
                            for (const i of c.ones()) {
                                const o = await e([f, h, i]);
                                if (o)
                                    for (const l of o.ones()) {
                                        r.set([f, h, i, l], 0);
                                        const v = a.getUint32(0, !1);
                                        t.push(v);
                                    }
                            }
                    }
            }
            return t;
        }
    }
    function le(s) {
        if ('toHex' in Uint8Array) {
            let t;
            return (s.constructor === Uint8Array ? (t = s) : (t = new Uint8Array(s)), t.toHex());
        }
        let e = '';
        for (const t of s) e += (t & 255).toString(16).padStart(2, '0');
        return e;
    }
    function _(s) {
        return s.toString(16);
    }
    function me(s) {
        return s.toString();
    }
    function G(s) {
        return le(s);
    }
    function ee(s) {
        return `${_(s.serviceId)}:${G(s.hash)}`;
    }
    var N = { exports: {} },
        we = N.exports,
        te;
    function ge() {
        return (
            te ||
                ((te = 1),
                (function (s, e) {
                    (function (t, n) {
                        n(e);
                    })(we, function (t) {
                        const n = Symbol('newer'),
                            r = Symbol('older');
                        class a {
                            constructor(i, o) {
                                (typeof i != 'number' && ((o = i), (i = 0)),
                                    (this.size = 0),
                                    (this.limit = i),
                                    (this.oldest = this.newest = void 0),
                                    (this._keymap = new Map()),
                                    o && (this.assign(o), i < 1 && (this.limit = this.size)));
                            }
                            _markEntryAsUsed(i) {
                                i !== this.newest &&
                                    (i[n] &&
                                        (i === this.oldest && (this.oldest = i[n]),
                                        (i[n][r] = i[r])),
                                    i[r] && (i[r][n] = i[n]),
                                    (i[n] = void 0),
                                    (i[r] = this.newest),
                                    this.newest && (this.newest[n] = i),
                                    (this.newest = i));
                            }
                            assign(i) {
                                let o,
                                    l = this.limit || Number.MAX_VALUE;
                                this._keymap.clear();
                                let v = i[Symbol.iterator]();
                                for (let E = v.next(); !E.done; E = v.next()) {
                                    let A = new d(E.value[0], E.value[1]);
                                    if (
                                        (this._keymap.set(A.key, A),
                                        o ? ((o[n] = A), (A[r] = o)) : (this.oldest = A),
                                        (o = A),
                                        l-- == 0)
                                    )
                                        throw new Error('overflow');
                                }
                                ((this.newest = o), (this.size = this._keymap.size));
                            }
                            get(i) {
                                var o = this._keymap.get(i);
                                return o ? (this._markEntryAsUsed(o), o.value) : void 0;
                            }
                            set(i, o) {
                                var l = this._keymap.get(i);
                                return l
                                    ? ((l.value = o), this._markEntryAsUsed(l), this)
                                    : (this._keymap.set(i, (l = new d(i, o))),
                                      this.newest
                                          ? ((this.newest[n] = l), (l[r] = this.newest))
                                          : (this.oldest = l),
                                      (this.newest = l),
                                      ++this.size,
                                      this.size > this.limit && this.shift(),
                                      this);
                            }
                            shift() {
                                var i = this.oldest;
                                if (i)
                                    return (
                                        this.oldest[n]
                                            ? ((this.oldest = this.oldest[n]),
                                              (this.oldest[r] = void 0))
                                            : ((this.oldest = void 0), (this.newest = void 0)),
                                        (i[n] = i[r] = void 0),
                                        this._keymap.delete(i.key),
                                        --this.size,
                                        [i.key, i.value]
                                    );
                            }
                            find(i) {
                                let o = this._keymap.get(i);
                                return o ? o.value : void 0;
                            }
                            has(i) {
                                return this._keymap.has(i);
                            }
                            delete(i) {
                                var o = this._keymap.get(i);
                                return o
                                    ? (this._keymap.delete(o.key),
                                      o[n] && o[r]
                                          ? ((o[r][n] = o[n]), (o[n][r] = o[r]))
                                          : o[n]
                                            ? ((o[n][r] = void 0), (this.oldest = o[n]))
                                            : o[r]
                                              ? ((o[r][n] = void 0), (this.newest = o[r]))
                                              : (this.oldest = this.newest = void 0),
                                      this.size--,
                                      o.value)
                                    : void 0;
                            }
                            clear() {
                                ((this.oldest = this.newest = void 0),
                                    (this.size = 0),
                                    this._keymap.clear());
                            }
                            keys() {
                                return new u(this.oldest);
                            }
                            values() {
                                return new h(this.oldest);
                            }
                            entries() {
                                return this;
                            }
                            [Symbol.iterator]() {
                                return new f(this.oldest);
                            }
                            forEach(i, o) {
                                typeof o != 'object' && (o = this);
                                let l = this.oldest;
                                for (; l;) (i.call(o, l.value, l.key, this), (l = l[n]));
                            }
                            toJSON() {
                                for (var i = new Array(this.size), o = 0, l = this.oldest; l;)
                                    ((i[o++] = { key: l.key, value: l.value }), (l = l[n]));
                                return i;
                            }
                            toString() {
                                for (var i = '', o = this.oldest; o;)
                                    ((i += String(o.key) + ':' + o.value),
                                        (o = o[n]),
                                        o && (i += ' < '));
                                return i;
                            }
                        }
                        t.LRUMap = a;
                        function d(c, i) {
                            ((this.key = c),
                                (this.value = i),
                                (this[n] = void 0),
                                (this[r] = void 0));
                        }
                        function f(c) {
                            this.entry = c;
                        }
                        ((f.prototype[Symbol.iterator] = function () {
                            return this;
                        }),
                            (f.prototype.next = function () {
                                let c = this.entry;
                                return c
                                    ? ((this.entry = c[n]), { done: !1, value: [c.key, c.value] })
                                    : { done: !0, value: void 0 };
                            }));
                        function u(c) {
                            this.entry = c;
                        }
                        ((u.prototype[Symbol.iterator] = function () {
                            return this;
                        }),
                            (u.prototype.next = function () {
                                let c = this.entry;
                                return c
                                    ? ((this.entry = c[n]), { done: !1, value: c.key })
                                    : { done: !0, value: void 0 };
                            }));
                        function h(c) {
                            this.entry = c;
                        }
                        ((h.prototype[Symbol.iterator] = function () {
                            return this;
                        }),
                            (h.prototype.next = function () {
                                let c = this.entry;
                                return c
                                    ? ((this.entry = c[n]), { done: !1, value: c.value })
                                    : { done: !0, value: void 0 };
                            }));
                    });
                })(N, N.exports)),
            N.exports
        );
    }
    var ye = ge();
    const Ue = 100;
    class pe extends de {
        #e = new ye.LRUMap(Ue);
        constructor(e) {
            super(e);
        }
        async servicePreimageCached(e, t, n) {
            const r = G(n);
            let a = this.#e.get(r);
            return (
                a === void 0 && ((a = await this.servicePreimage(e, t, n)), a && this.#e.set(r, a)),
                a
            );
        }
        async fetchServices(e, t) {
            const n = new Map();
            for (const d of t) n.set(ne(d), d);
            const r = await this.listServices(e);
            let a = await Promise.all(
                r.map(async (d) => {
                    const f = await this.serviceData(e, d);
                    if (f.isZombie()) return [];
                    f.id = d;
                    const u = n.get(ne(f));
                    if (u !== void 0) return [u];
                    const h = await this.servicePreimageCached(e, f.id, f.codeHash);
                    if (h === null)
                        return (
                            console.debug(`Failed to fetch preimage of JAM service ${_(f.id)}`), []
                        );
                    try {
                        const c = k.decodeWrapped(new U(h));
                        f.meta = c;
                    } catch (c) {
                        return (
                            console.debug(`Failed to decode metadata of JAM service ${_(f.id)}`, c),
                            []
                        );
                    }
                    return [f];
                }),
            );
            return (
                (a = a.flat().filter((d) => d.meta.name === 'corevm')),
                (a = await Promise.all(
                    a.map(async (d) => {
                        const f = async (h) => {
                                const c = y.fromShared(new fe.Vms(new Uint8Array(h))).encoded(),
                                    i = await this.serviceValue(e, d.id, c);
                                return i === null ? null : new F(i);
                            },
                            u = await ue.loadIndices(f);
                        d.vms || (d.vms = new Map());
                        for (const h of d.vms.keys()) u.includes(h) || d.vms.delete(h);
                        for (const h of u) {
                            const c = await this.typedServiceValue(
                                e,
                                d.id,
                                y.fromInner(h, new b.ExecEnvRef()).encoded(),
                                I,
                            );
                            if (c === null) continue;
                            d.vms.has(h) || d.vms.set(h, {});
                            const i = d.vms.get(h);
                            if (
                                !(
                                    'execEnvHash' in i &&
                                    i.execEnvHash.every((o, l) => o === c.hash[l])
                                )
                            ) {
                                i.execEnvHash = c.hash;
                                try {
                                    const o = await this.readFile(e, c),
                                        l = V.decode(new U(o)),
                                        v = await this.readFile(e, l.program, { firstBlock: !0 }),
                                        E = k.decodeWrapped(new U(v));
                                    i.corevmMeta = E;
                                } catch (o) {
                                    (console.debug(
                                        `Failed to retrieve CoreVM guest metadata of ${_(d.id)}/${me(h)}: ${o}`,
                                    ),
                                        d.vms.delete(h));
                                    continue;
                                }
                            }
                        }
                        return [d];
                    }),
                )),
                a.flat().sort((d, f) => f.creationSlot - d.creationSlot)
            );
        }
        async readFile(e, t, n) {
            const r = await this.servicePreimageCached(e, t.serviceId, t.hash);
            if (!r) throw new Error(`Failed to read file ${ee(t)}: Preimage not found`);
            const a = W.decode(new U(r));
            if (n && n.firstBlock) return a.firstBlock;
            const d = new Uint8Array(Number(a.fileSize));
            d.set(a.firstBlock, 0);
            let f = a.firstBlock.length;
            for (const u of a.blockRefs) {
                const h = await this.servicePreimageCached(e, u.serviceId, u.hash);
                if (!h) throw new Error(`Preimage ${ee(u)} not found`);
                (d.set(h, f), (f += h.length));
            }
            return d;
        }
    }
    function ne(s) {
        return s.id + ':' + G(s.codeHash);
    }
    class ve {
        #e;
        #t;
        #n = new Map();
        constructor(e) {
            ((this.#e = performance.now()), (this.#t = e));
        }
        add(e) {
            const t = performance.now();
            let n = this.#n.get(e);
            (n === void 0 && (n = 0), this.#n.set(e, n + (t - this.#e)), (this.#e = t));
        }
        total() {
            return Array.from(this.#n.values()).reduce((e, t) => e + t, 0);
        }
        print(e) {
            const n = [['total', this.total()]]
                    .concat(Array.from(this.#n.entries()))
                    .map(([a, d]) => `${a} ${Math.round(d)}ms`)
                    .join(', '),
                r = e || '';
            console.debug(`${this.#t}: ${n}${r}`);
        }
    }
    function Se(s = 0, e = se) {
        const t = new Uint32Array(1);
        return (crypto.getRandomValues(t), Math.floor(s + (t[0] / se) * (e - s)));
    }
    const se = 4294967295;
    function O(s, e) {
        return BigInt(s) + BigInt(e) * 2n ** 32n;
    }
    function Ie(s) {
        return Number(s % 2n ** 32n);
    }
    function xe(s) {
        return Math.floor(Number(s / 2n ** 32n));
    }
    class be {
        #e = new Map();
        #t;
        #n;
        constructor(e) {
            ((this.#t = e?.create), (this.#n = e?.destroy));
        }
        set(e, t, n) {
            const r = O(e, t);
            this.#e.set(r, n);
        }
        get(e, t) {
            const n = O(e, t);
            return this.#e.get(n);
        }
        ensurePresent(e, t, n) {
            const r = O(e, t);
            let a = this.#e.get(r);
            return (a === void 0 && ((a = (n || this.#t)(e, t)), this.#e.set(r, a)), a);
        }
        ensureAbsent(e, t) {
            const n = O(e, t),
                r = this.#e.get(n);
            return r !== void 0 ? (this.#n(r), this.#e.delete(n), !0) : !1;
        }
        ensureIntersectionPresent(e, t) {
            const n = t?.create || this.#t,
                r = t?.destroy || this.#n,
                a = t?.added,
                d = t?.removed,
                f = new Set();
            for (const [u, h] of e) {
                const c = O(u, h);
                (f.add(c), this.#e.get(c) === void 0 && (this.#e.set(c, n(u, h)), a && a(u, h)));
            }
            for (const [u, h] of this.#e.entries())
                if (!f.has(u) && (r(h), this.#e.delete(u), d)) {
                    const c = Ie(u),
                        i = xe(u);
                    d(c, i);
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
    const K = Object.freeze({ INITIAL: 0, RUNNING: 1 });
    class Ee {
        #e;
        #t;
        #n = null;
        #i = 0n;
        #r = null;
        #c = null;
        #o = 0;
        #s = 0;
        #a = K.INITIAL;
        constructor(e, t) {
            ((this.#e = e), (this.#t = t), p !== null && this.start(p));
        }
        start(e) {
            const t = (e.slot_period_sec * 1e3) / 10;
            ((this.#o = Se(0, t)), (this.#a = K.RUNNING));
        }
        async step(e) {
            if (this.#a !== K.RUNNING) {
                if (p === null) return;
                this.start(p);
            }
            const t = this.#s + 1 !== e.slot,
                r = (re + e.slot * p.slot_period_sec) * 1e3 + this.#o,
                a = Math.max(0, r - Date.now());
            (clearTimeout(this.#r),
                (this.#r = setTimeout(async () => {
                    try {
                        await this.#d(e, t);
                    } catch (d) {
                        console.debug(`Failed to fetch guest output: ${d}`);
                    }
                }, a)));
        }
        close() {
            (clearTimeout(this.#r), clearTimeout(this.#c));
        }
        async #d(e, t) {
            if (this.#e === null) return;
            const n = Date.now(),
                r = new ve('Fetch'),
                a = await m.typedServiceValue(
                    e.header_hash,
                    this.#e,
                    y.fromInner(this.#t, new b.VideoMode()).encoded(),
                    L,
                ),
                d = await m.typedServiceValue(
                    e.header_hash,
                    this.#e,
                    y.fromInner(this.#t, new b.AudioMode()).encoded(),
                    B,
                );
            postMessage({
                type: 'output-mode',
                serviceId: this.#e,
                vmId: this.#t,
                audio: d,
                video: a,
            });
            const f =
                    (await m.typedServiceValue(
                        e.header_hash,
                        this.#e,
                        y.fromInner(this.#t, new b.ResetCounter()).encoded(),
                        Ae,
                    )) || 0n,
                u = await m.typedServiceValue(
                    e.header_hash,
                    this.#e,
                    y.fromInner(this.#t, new b.ExecEnvRef()).encoded(),
                    I,
                );
            if (u === null) return;
            const h = this.#i !== f;
            if (h) {
                ((this.#i = f), console.debug(`The guest was reset; reset counter = ${f}`));
                const o = await m.readFile(e.header_hash, u),
                    l = V.decode(new U(o));
                postMessage({
                    type: 'input-mode',
                    serviceId: this.#e,
                    vmId: this.#t,
                    audio: l.audioInput,
                    video: l.videoInput,
                });
            }
            const c = await m.typedServiceValue(
                e.header_hash,
                this.#e,
                y.fromInner(this.#t, new b.VmSpec()).encoded(),
                T,
            );
            if (c === null) return;
            if (this.#n === c.state.step && !h) {
                console.debug(`No new output; step ${this.#n}, slot ${e.slot}`);
                return;
            }
            ((this.#n = c.state.step), r.add('other'));
            const i = await this.#h(c);
            ((this.#s = e.slot),
                r.add('segments'),
                r.print(`, size ${(i.length / 1024 / 1024).toFixed(2)} MiB, first slot = ${t}`),
                X.postMessage(
                    {
                        type: 'segments',
                        serviceId: this.#e,
                        vmId: this.#t,
                        slot: e.slot,
                        segments: i.buffer,
                        vmSpec: c,
                        video: a,
                        audio: d,
                        firstSlot: t,
                        reset: h,
                    },
                    [i.buffer],
                ),
                postMessage({
                    type: 'fetch-event',
                    serviceId: this.#e,
                    vmId: this.#t,
                    startTime: n,
                    endTime: Date.now(),
                }));
        }
        async #h(e) {
            const t = e.output.allStreamsLen(),
                n = Math.ceil(t / j);
            if (n === 0) return new Uint8Array();
            const r = e.output.firstSegmentIndex + e.output.numRegularPages + e.output.numHashPages,
                a = Array(n)
                    .fill()
                    .map((f, u) => r + u),
                d = await m.fetchSegments(e.exportsRoot, a);
            return ke(d);
        }
    }
    class Ae {
        static decode(e) {
            return e.decodeUint64();
        }
    }
    function ke(s) {
        const e = new Uint8Array(s.length * j);
        let t = 0;
        for (const n of s) (e.set(n, t), (t += j));
        return e;
    }
    async function Le(s) {
        (ie(),
            (m = new pe(s)),
            m.addEventListener('open', async (e) => {
                ((p = (await m.parameters()).V1),
                    postMessage({ type: 'parameters', parameters: p }));
                for (const n of M.values()) n.start(p);
                let t = !0;
                await m.subscribeBestBlock(async (n) => {
                    if ((postMessage({ type: 'best-block', block: n }), t)) {
                        t = !1;
                        return;
                    }
                    const r = [m.fetchServices(n.header_hash, J)];
                    r.push(...M.values().map((a) => a.step(n)));
                    try {
                        let [a, ...d] = await Promise.all(r);
                        ((J = a), postMessage({ type: 'services', services: J }));
                    } catch (a) {
                        console.debug(`Failed process block ${n.slot}: ${a}`);
                    }
                });
            }),
            m.addEventListener('state', (e) => {
                postMessage({ type: 'connection-state', state: e });
            }),
            await m.connect());
    }
    function ie() {
        m && (m.close(), (m = void 0));
    }
    const M = new be({ create: (s, e) => new Ee(s, e), destroy: (s) => s.close() });
    let m,
        J = [],
        p = null,
        X = null;
    (addEventListener('message', async (s) => {
        switch (s.data.type) {
            case 'open':
                await Le(s.data.url);
                break;
            case 'close':
                ie();
                break;
            case 'add-vm':
                M.ensurePresent(s.data.serviceId, s.data.vmId);
                break;
            case 'remove-vm':
                M.ensureAbsent(s.data.serviceId, s.data.vmId);
                break;
            case 'set-vms':
                M.ensureIntersectionPresent(s.data.vms);
                break;
            case 'transcoder-port':
                ((X = s.ports[0]), X.start());
                break;
            default:
                throw new Error(`Invalid message type: ${s.data.type}`);
        }
    }),
        addEventListener('error', (s) =>
            postMessage({ type: 'error', error: { message: s.message, filename: 'fetcher.js' } }),
        ),
        addEventListener('unhandledrejection', (s) =>
            postMessage({ type: 'error', error: { message: s.reason, filename: 'fetcher.js' } }),
        ));
})();
