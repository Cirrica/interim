(() => {
  var e = {};
  (e.id = 974),
    (e.ids = [974]),
    (e.modules = {
      362: (e, t, i) => {
        'use strict';
        let n, r, s;
        i.r(t), i.d(t, { default: () => os });
        var o,
          a,
          l = i(687),
          u = i(1261),
          h = i.n(u),
          c = i(3210);
        function d(e, t) {
          -1 === e.indexOf(t) && e.push(t);
        }
        function p(e, t) {
          let i = e.indexOf(t);
          i > -1 && e.splice(i, 1);
        }
        class f {
          constructor() {
            this.subscriptions = [];
          }
          add(e) {
            return d(this.subscriptions, e), () => p(this.subscriptions, e);
          }
          notify(e, t, i) {
            let n = this.subscriptions.length;
            if (n)
              if (1 === n) this.subscriptions[0](e, t, i);
              else
                for (let r = 0; r < n; r++) {
                  let n = this.subscriptions[r];
                  n && n(e, t, i);
                }
          }
          getSize() {
            return this.subscriptions.length;
          }
          clear() {
            this.subscriptions.length = 0;
          }
        }
        function m(e, t) {
          return t ? (1e3 / t) * e : 0;
        }
        let g = {},
          y = (e) => e,
          v = [
            'setup',
            'read',
            'resolveKeyframes',
            'preUpdate',
            'update',
            'preRender',
            'render',
            'postRender',
          ],
          x = { value: null, addProjectionMetrics: null };
        function b(e, t) {
          let i = !1,
            n = !0,
            r = { delta: 0, timestamp: 0, isProcessing: !1 },
            s = () => (i = !0),
            o = v.reduce(
              (e, i) => (
                (e[i] = (function (e, t) {
                  let i = new Set(),
                    n = new Set(),
                    r = !1,
                    s = !1,
                    o = new WeakSet(),
                    a = { delta: 0, timestamp: 0, isProcessing: !1 },
                    l = 0;
                  function u(t) {
                    o.has(t) && (h.schedule(t), e()), l++, t(a);
                  }
                  let h = {
                    schedule: (e, t = !1, s = !1) => {
                      let a = s && r ? i : n;
                      return t && o.add(e), a.has(e) || a.add(e), e;
                    },
                    cancel: (e) => {
                      n.delete(e), o.delete(e);
                    },
                    process: (e) => {
                      if (((a = e), r)) {
                        s = !0;
                        return;
                      }
                      (r = !0),
                        ([i, n] = [n, i]),
                        i.forEach(u),
                        t && x.value && x.value.frameloop[t].push(l),
                        (l = 0),
                        i.clear(),
                        (r = !1),
                        s && ((s = !1), h.process(e));
                    },
                  };
                  return h;
                })(s, t ? i : void 0)),
                e
              ),
              {}
            ),
            {
              setup: a,
              read: l,
              resolveKeyframes: u,
              preUpdate: h,
              update: c,
              preRender: d,
              render: p,
              postRender: f,
            } = o,
            m = () => {
              let s = g.useManualTiming ? r.timestamp : performance.now();
              (i = !1),
                g.useManualTiming ||
                  (r.delta = n
                    ? 1e3 / 60
                    : Math.max(Math.min(s - r.timestamp, 40), 1)),
                (r.timestamp = s),
                (r.isProcessing = !0),
                a.process(r),
                l.process(r),
                u.process(r),
                h.process(r),
                c.process(r),
                d.process(r),
                p.process(r),
                f.process(r),
                (r.isProcessing = !1),
                i && t && ((n = !1), e(m));
            },
            y = () => {
              (i = !0), (n = !0), r.isProcessing || e(m);
            };
          return {
            schedule: v.reduce((e, t) => {
              let n = o[t];
              return (
                (e[t] = (e, t = !1, r = !1) => (i || y(), n.schedule(e, t, r))),
                e
              );
            }, {}),
            cancel: (e) => {
              for (let t = 0; t < v.length; t++) o[v[t]].cancel(e);
            },
            state: r,
            steps: o,
          };
        }
        let {
          schedule: P,
          cancel: w,
          state: E,
          steps: T,
        } = b(
          'undefined' != typeof requestAnimationFrame
            ? requestAnimationFrame
            : y,
          !0
        );
        function S() {
          n = void 0;
        }
        let A = {
            now: () => (
              void 0 === n &&
                A.set(
                  E.isProcessing || g.useManualTiming
                    ? E.timestamp
                    : performance.now()
                ),
              n
            ),
            set: (e) => {
              (n = e), queueMicrotask(S);
            },
          },
          R = (e) => !isNaN(parseFloat(e)),
          M = { current: void 0 };
        class j {
          constructor(e, t = {}) {
            (this.canTrackVelocity = null),
              (this.events = {}),
              (this.updateAndNotify = (e, t = !0) => {
                let i = A.now();
                if (
                  (this.updatedAt !== i && this.setPrevFrameValue(),
                  (this.prev = this.current),
                  this.setCurrent(e),
                  this.current !== this.prev &&
                    (this.events.change?.notify(this.current), this.dependents))
                )
                  for (let e of this.dependents) e.dirty();
                t && this.events.renderRequest?.notify(this.current);
              }),
              (this.hasAnimated = !1),
              this.setCurrent(e),
              (this.owner = t.owner);
          }
          setCurrent(e) {
            (this.current = e),
              (this.updatedAt = A.now()),
              null === this.canTrackVelocity &&
                void 0 !== e &&
                (this.canTrackVelocity = R(this.current));
          }
          setPrevFrameValue(e = this.current) {
            (this.prevFrameValue = e), (this.prevUpdatedAt = this.updatedAt);
          }
          onChange(e) {
            return this.on('change', e);
          }
          on(e, t) {
            this.events[e] || (this.events[e] = new f());
            let i = this.events[e].add(t);
            return 'change' === e
              ? () => {
                  i(),
                    P.read(() => {
                      this.events.change.getSize() || this.stop();
                    });
                }
              : i;
          }
          clearListeners() {
            for (let e in this.events) this.events[e].clear();
          }
          attach(e, t) {
            (this.passiveEffect = e), (this.stopPassiveEffect = t);
          }
          set(e, t = !0) {
            t && this.passiveEffect
              ? this.passiveEffect(e, this.updateAndNotify)
              : this.updateAndNotify(e, t);
          }
          setWithVelocity(e, t, i) {
            this.set(t),
              (this.prev = void 0),
              (this.prevFrameValue = e),
              (this.prevUpdatedAt = this.updatedAt - i);
          }
          jump(e, t = !0) {
            this.updateAndNotify(e),
              (this.prev = e),
              (this.prevUpdatedAt = this.prevFrameValue = void 0),
              t && this.stop(),
              this.stopPassiveEffect && this.stopPassiveEffect();
          }
          dirty() {
            this.events.change?.notify(this.current);
          }
          addDependent(e) {
            this.dependents || (this.dependents = new Set()),
              this.dependents.add(e);
          }
          removeDependent(e) {
            this.dependents && this.dependents.delete(e);
          }
          get() {
            return M.current && M.current.push(this), this.current;
          }
          getPrevious() {
            return this.prev;
          }
          getVelocity() {
            let e = A.now();
            if (
              !this.canTrackVelocity ||
              void 0 === this.prevFrameValue ||
              e - this.updatedAt > 30
            )
              return 0;
            let t = Math.min(this.updatedAt - this.prevUpdatedAt, 30);
            return m(
              parseFloat(this.current) - parseFloat(this.prevFrameValue),
              t
            );
          }
          start(e) {
            return (
              this.stop(),
              new Promise((t) => {
                (this.hasAnimated = !0),
                  (this.animation = e(t)),
                  this.events.animationStart &&
                    this.events.animationStart.notify();
              }).then(() => {
                this.events.animationComplete &&
                  this.events.animationComplete.notify(),
                  this.clearAnimation();
              })
            );
          }
          stop() {
            this.animation &&
              (this.animation.stop(),
              this.events.animationCancel &&
                this.events.animationCancel.notify()),
              this.clearAnimation();
          }
          isAnimating() {
            return !!this.animation;
          }
          clearAnimation() {
            delete this.animation;
          }
          destroy() {
            this.dependents?.clear(),
              this.events.destroy?.notify(),
              this.clearListeners(),
              this.stop(),
              this.stopPassiveEffect && this.stopPassiveEffect();
          }
        }
        function C(e, t) {
          return new j(e, t);
        }
        let _ = () => {},
          O = () => {};
        function k(e, t) {
          let i,
            n = () => {
              let { currentTime: n } = t,
                r = (null === n ? 0 : n.value) / 100;
              i !== r && e(r), (i = r);
            };
          return P.preUpdate(n, !0), () => w(n);
        }
        function D(e) {
          let t;
          return () => (void 0 === t && (t = e()), t);
        }
        let V = D(() => void 0 !== window.ScrollTimeline);
        function L(e) {
          return 'object' == typeof e && null !== e;
        }
        function I(e) {
          return L(e) && 'ownerSVGElement' in e;
        }
        function N(e, t, i) {
          if (e instanceof EventTarget) return [e];
          if ('string' == typeof e) {
            let n = document;
            t && (n = t.current);
            let r = i?.[e] ?? n.querySelectorAll(e);
            return r ? Array.from(r) : [];
          }
          return Array.from(e);
        }
        let F = new WeakMap();
        function U({ target: e, contentRect: t, borderBoxSize: i }) {
          F.get(e)?.forEach((n) => {
            n({
              target: e,
              contentSize: t,
              get size() {
                if (i) {
                  let { inlineSize: e, blockSize: t } = i[0];
                  return { width: e, height: t };
                }
                if (I(e) && 'getBBox' in e) return e.getBBox();
                return { width: e.offsetWidth, height: e.offsetHeight };
              },
            });
          });
        }
        function B(e) {
          e.forEach(U);
        }
        let $ = new Set(),
          z = (e, t, i) => {
            let n = t - e;
            return 0 === n ? 1 : (i - e) / n;
          },
          W = () => ({
            current: 0,
            offset: [],
            progress: 0,
            scrollLength: 0,
            targetOffset: 0,
            targetLength: 0,
            containerLength: 0,
            velocity: 0,
          }),
          X = () => ({ time: 0, x: W(), y: W() }),
          H = {
            x: { length: 'Width', position: 'Left' },
            y: { length: 'Height', position: 'Top' },
          };
        function q(e, t, i, n) {
          let r = i[t],
            { length: s, position: o } = H[t],
            a = r.current,
            l = i.time;
          (r.current = e[`scroll${o}`]),
            (r.scrollLength = e[`scroll${s}`] - e[`client${s}`]),
            (r.offset.length = 0),
            (r.offset[0] = 0),
            (r.offset[1] = r.scrollLength),
            (r.progress = z(0, r.scrollLength, r.current));
          let u = n - l;
          r.velocity = u > 50 ? 0 : m(r.current - a, u);
        }
        let Y = (e, t) => (i) => t(e(i)),
          G = (...e) => e.reduce(Y),
          K = (e, t, i) => (i > t ? t : i < e ? e : i),
          Z = (e) => (t) => 'string' == typeof t && t.startsWith(e),
          Q = Z('--'),
          J = Z('var(--'),
          ee = (e) => !!J(e) && et.test(e.split('/*')[0].trim()),
          et =
            /var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,
          ei = {
            test: (e) => 'number' == typeof e,
            parse: parseFloat,
            transform: (e) => e,
          },
          en = { ...ei, transform: (e) => K(0, 1, e) },
          er = { ...ei, default: 1 },
          es = (e) => Math.round(1e5 * e) / 1e5,
          eo = /-?(?:\d+(?:\.\d+)?|\.\d+)/gu,
          ea =
            /^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,
          el = (e, t) => (i) =>
            !!(
              ('string' == typeof i && ea.test(i) && i.startsWith(e)) ||
              (t && null != i && Object.prototype.hasOwnProperty.call(i, t))
            ),
          eu = (e, t, i) => (n) => {
            if ('string' != typeof n) return n;
            let [r, s, o, a] = n.match(eo);
            return {
              [e]: parseFloat(r),
              [t]: parseFloat(s),
              [i]: parseFloat(o),
              alpha: void 0 !== a ? parseFloat(a) : 1,
            };
          },
          eh = (e) => K(0, 255, e),
          ec = { ...ei, transform: (e) => Math.round(eh(e)) },
          ed = {
            test: el('rgb', 'red'),
            parse: eu('red', 'green', 'blue'),
            transform: ({ red: e, green: t, blue: i, alpha: n = 1 }) =>
              'rgba(' +
              ec.transform(e) +
              ', ' +
              ec.transform(t) +
              ', ' +
              ec.transform(i) +
              ', ' +
              es(en.transform(n)) +
              ')',
          },
          ep = {
            test: el('#'),
            parse: function (e) {
              let t = '',
                i = '',
                n = '',
                r = '';
              return (
                e.length > 5
                  ? ((t = e.substring(1, 3)),
                    (i = e.substring(3, 5)),
                    (n = e.substring(5, 7)),
                    (r = e.substring(7, 9)))
                  : ((t = e.substring(1, 2)),
                    (i = e.substring(2, 3)),
                    (n = e.substring(3, 4)),
                    (r = e.substring(4, 5)),
                    (t += t),
                    (i += i),
                    (n += n),
                    (r += r)),
                {
                  red: parseInt(t, 16),
                  green: parseInt(i, 16),
                  blue: parseInt(n, 16),
                  alpha: r ? parseInt(r, 16) / 255 : 1,
                }
              );
            },
            transform: ed.transform,
          },
          ef = (e) => ({
            test: (t) =>
              'string' == typeof t &&
              t.endsWith(e) &&
              1 === t.split(' ').length,
            parse: parseFloat,
            transform: (t) => `${t}${e}`,
          }),
          em = ef('deg'),
          eg = ef('%'),
          ey = ef('px'),
          ev = ef('vh'),
          ex = ef('vw'),
          eb = {
            ...eg,
            parse: (e) => eg.parse(e) / 100,
            transform: (e) => eg.transform(100 * e),
          },
          eP = {
            test: el('hsl', 'hue'),
            parse: eu('hue', 'saturation', 'lightness'),
            transform: ({
              hue: e,
              saturation: t,
              lightness: i,
              alpha: n = 1,
            }) =>
              'hsla(' +
              Math.round(e) +
              ', ' +
              eg.transform(es(t)) +
              ', ' +
              eg.transform(es(i)) +
              ', ' +
              es(en.transform(n)) +
              ')',
          },
          ew = {
            test: (e) => ed.test(e) || ep.test(e) || eP.test(e),
            parse: (e) =>
              ed.test(e) ? ed.parse(e) : eP.test(e) ? eP.parse(e) : ep.parse(e),
            transform: (e) =>
              'string' == typeof e
                ? e
                : e.hasOwnProperty('red')
                ? ed.transform(e)
                : eP.transform(e),
          },
          eE =
            /(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu,
          eT = 'number',
          eS = 'color',
          eA =
            /var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;
        function eR(e) {
          let t = e.toString(),
            i = [],
            n = { color: [], number: [], var: [] },
            r = [],
            s = 0,
            o = t
              .replace(
                eA,
                (e) => (
                  ew.test(e)
                    ? (n.color.push(s), r.push(eS), i.push(ew.parse(e)))
                    : e.startsWith('var(')
                    ? (n.var.push(s), r.push('var'), i.push(e))
                    : (n.number.push(s), r.push(eT), i.push(parseFloat(e))),
                  ++s,
                  '${}'
                )
              )
              .split('${}');
          return { values: i, split: o, indexes: n, types: r };
        }
        function eM(e) {
          return eR(e).values;
        }
        function ej(e) {
          let { split: t, types: i } = eR(e),
            n = t.length;
          return (e) => {
            let r = '';
            for (let s = 0; s < n; s++)
              if (((r += t[s]), void 0 !== e[s])) {
                let t = i[s];
                t === eT
                  ? (r += es(e[s]))
                  : t === eS
                  ? (r += ew.transform(e[s]))
                  : (r += e[s]);
              }
            return r;
          };
        }
        let eC = (e) => ('number' == typeof e ? 0 : e),
          e_ = {
            test: function (e) {
              return (
                isNaN(e) &&
                'string' == typeof e &&
                (e.match(eo)?.length || 0) + (e.match(eE)?.length || 0) > 0
              );
            },
            parse: eM,
            createTransformer: ej,
            getAnimatableNone: function (e) {
              let t = eM(e);
              return ej(e)(t.map(eC));
            },
          };
        function eO(e, t, i) {
          return (i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6)
            ? e + (t - e) * 6 * i
            : i < 0.5
            ? t
            : i < 2 / 3
            ? e + (t - e) * (2 / 3 - i) * 6
            : e;
        }
        function ek(e, t) {
          return (i) => (i > 0 ? t : e);
        }
        let eD = (e, t, i) => e + (t - e) * i,
          eV = (e, t, i) => {
            let n = e * e,
              r = i * (t * t - n) + n;
            return r < 0 ? 0 : Math.sqrt(r);
          },
          eL = [ep, ed, eP],
          eI = (e) => eL.find((t) => t.test(e));
        function eN(e) {
          let t = eI(e);
          if (
            (_(
              !!t,
              `'${e}' is not an animatable color. Use the equivalent color code instead.`
            ),
            !t)
          )
            return !1;
          let i = t.parse(e);
          return (
            t === eP &&
              (i = (function ({
                hue: e,
                saturation: t,
                lightness: i,
                alpha: n,
              }) {
                (e /= 360), (i /= 100);
                let r = 0,
                  s = 0,
                  o = 0;
                if ((t /= 100)) {
                  let n = i < 0.5 ? i * (1 + t) : i + t - i * t,
                    a = 2 * i - n;
                  (r = eO(a, n, e + 1 / 3)),
                    (s = eO(a, n, e)),
                    (o = eO(a, n, e - 1 / 3));
                } else r = s = o = i;
                return {
                  red: Math.round(255 * r),
                  green: Math.round(255 * s),
                  blue: Math.round(255 * o),
                  alpha: n,
                };
              })(i)),
            i
          );
        }
        let eF = (e, t) => {
            let i = eN(e),
              n = eN(t);
            if (!i || !n) return ek(e, t);
            let r = { ...i };
            return (e) => (
              (r.red = eV(i.red, n.red, e)),
              (r.green = eV(i.green, n.green, e)),
              (r.blue = eV(i.blue, n.blue, e)),
              (r.alpha = eD(i.alpha, n.alpha, e)),
              ed.transform(r)
            );
          },
          eU = new Set(['none', 'hidden']);
        function eB(e, t) {
          return (i) => eD(e, t, i);
        }
        function e$(e) {
          return 'number' == typeof e
            ? eB
            : 'string' == typeof e
            ? ee(e)
              ? ek
              : ew.test(e)
              ? eF
              : eX
            : Array.isArray(e)
            ? ez
            : 'object' == typeof e
            ? ew.test(e)
              ? eF
              : eW
            : ek;
        }
        function ez(e, t) {
          let i = [...e],
            n = i.length,
            r = e.map((e, i) => e$(e)(e, t[i]));
          return (e) => {
            for (let t = 0; t < n; t++) i[t] = r[t](e);
            return i;
          };
        }
        function eW(e, t) {
          let i = { ...e, ...t },
            n = {};
          for (let r in i)
            void 0 !== e[r] && void 0 !== t[r] && (n[r] = e$(e[r])(e[r], t[r]));
          return (e) => {
            for (let t in n) i[t] = n[t](e);
            return i;
          };
        }
        let eX = (e, t) => {
          let i = e_.createTransformer(t),
            n = eR(e),
            r = eR(t);
          return n.indexes.var.length === r.indexes.var.length &&
            n.indexes.color.length === r.indexes.color.length &&
            n.indexes.number.length >= r.indexes.number.length
            ? (eU.has(e) && !r.values.length) || (eU.has(t) && !n.values.length)
              ? (function (e, t) {
                  return eU.has(e)
                    ? (i) => (i <= 0 ? e : t)
                    : (i) => (i >= 1 ? t : e);
                })(e, t)
              : G(
                  ez(
                    (function (e, t) {
                      let i = [],
                        n = { color: 0, var: 0, number: 0 };
                      for (let r = 0; r < t.values.length; r++) {
                        let s = t.types[r],
                          o = e.indexes[s][n[s]],
                          a = e.values[o] ?? 0;
                        (i[r] = a), n[s]++;
                      }
                      return i;
                    })(n, r),
                    r.values
                  ),
                  i
                )
            : (_(
                !0,
                `Complex values '${e}' and '${t}' too different to mix. Ensure all colors are of the same type, and that each contains the same quantity of number and color values. Falling back to instant transition.`
              ),
              ek(e, t));
        };
        function eH(e, t, i) {
          return 'number' == typeof e &&
            'number' == typeof t &&
            'number' == typeof i
            ? eD(e, t, i)
            : e$(e)(e, t);
        }
        function eq(e, t, { clamp: i = !0, ease: n, mixer: r } = {}) {
          let s = e.length;
          if (
            (O(
              s === t.length,
              'Both input and output ranges must be the same length'
            ),
            1 === s)
          )
            return () => t[0];
          if (2 === s && t[0] === t[1]) return () => t[1];
          let o = e[0] === e[1];
          e[0] > e[s - 1] && ((e = [...e].reverse()), (t = [...t].reverse()));
          let a = (function (e, t, i) {
              let n = [],
                r = i || g.mix || eH,
                s = e.length - 1;
              for (let i = 0; i < s; i++) {
                let s = r(e[i], e[i + 1]);
                t && (s = G(Array.isArray(t) ? t[i] || y : t, s)), n.push(s);
              }
              return n;
            })(t, n, r),
            l = a.length,
            u = (i) => {
              if (o && i < e[0]) return t[0];
              let n = 0;
              if (l > 1) for (; n < e.length - 2 && !(i < e[n + 1]); n++);
              let r = z(e[n], e[n + 1], i);
              return a[n](r);
            };
          return i ? (t) => u(K(e[0], e[s - 1], t)) : u;
        }
        function eY(e) {
          let t = [0];
          return (
            !(function (e, t) {
              let i = e[e.length - 1];
              for (let n = 1; n <= t; n++) {
                let r = z(0, t, n);
                e.push(eD(i, 1, r));
              }
            })(t, e.length - 1),
            t
          );
        }
        function eG(e) {
          return L(e) && 'offsetHeight' in e;
        }
        let eK = { start: 0, center: 0.5, end: 1 };
        function eZ(e, t, i = 0) {
          let n = 0;
          if ((e in eK && (e = eK[e]), 'string' == typeof e)) {
            let t = parseFloat(e);
            e.endsWith('px')
              ? (n = t)
              : e.endsWith('%')
              ? (e = t / 100)
              : e.endsWith('vw')
              ? (n = (t / 100) * document.documentElement.clientWidth)
              : e.endsWith('vh')
              ? (n = (t / 100) * document.documentElement.clientHeight)
              : (e = t);
          }
          return 'number' == typeof e && (n = t * e), i + n;
        }
        let eQ = [0, 0],
          eJ = {
            All: [
              [0, 0],
              [1, 1],
            ],
          },
          e0 = { x: 0, y: 0 },
          e1 = new WeakMap(),
          e2 = new WeakMap(),
          e3 = new WeakMap(),
          e5 = (e) => (e === document.scrollingElement ? window : e);
        function e4(
          e,
          { container: t = document.scrollingElement, ...i } = {}
        ) {
          if (!t) return y;
          let n = e3.get(t);
          n || ((n = new Set()), e3.set(t, n));
          let o = (function (e, t, i, n = {}) {
            return {
              measure: (t) => {
                !(function (e, t = e, i) {
                  if (
                    ((i.x.targetOffset = 0), (i.y.targetOffset = 0), t !== e)
                  ) {
                    let n = t;
                    for (; n && n !== e; )
                      (i.x.targetOffset += n.offsetLeft),
                        (i.y.targetOffset += n.offsetTop),
                        (n = n.offsetParent);
                  }
                  (i.x.targetLength = t === e ? t.scrollWidth : t.clientWidth),
                    (i.y.targetLength =
                      t === e ? t.scrollHeight : t.clientHeight),
                    (i.x.containerLength = e.clientWidth),
                    (i.y.containerLength = e.clientHeight);
                })(e, n.target, i),
                  q(e, 'x', i, t),
                  q(e, 'y', i, t),
                  (i.time = t),
                  (n.offset || n.target) &&
                    (function (e, t, i) {
                      let { offset: n = eJ.All } = i,
                        { target: r = e, axis: s = 'y' } = i,
                        o = 'y' === s ? 'height' : 'width',
                        a =
                          r !== e
                            ? (function (e, t) {
                                let i = { x: 0, y: 0 },
                                  n = e;
                                for (; n && n !== t; )
                                  if (eG(n))
                                    (i.x += n.offsetLeft),
                                      (i.y += n.offsetTop),
                                      (n = n.offsetParent);
                                  else if ('svg' === n.tagName) {
                                    let e = n.getBoundingClientRect(),
                                      t = (n =
                                        n.parentElement).getBoundingClientRect();
                                    (i.x += e.left - t.left),
                                      (i.y += e.top - t.top);
                                  } else if (n instanceof SVGGraphicsElement) {
                                    let { x: e, y: t } = n.getBBox();
                                    (i.x += e), (i.y += t);
                                    let r = null,
                                      s = n.parentNode;
                                    for (; !r; )
                                      'svg' === s.tagName && (r = s),
                                        (s = n.parentNode);
                                    n = r;
                                  } else break;
                                return i;
                              })(r, e)
                            : e0,
                        l =
                          r === e
                            ? { width: e.scrollWidth, height: e.scrollHeight }
                            : 'getBBox' in r && 'svg' !== r.tagName
                            ? r.getBBox()
                            : { width: r.clientWidth, height: r.clientHeight },
                        u = { width: e.clientWidth, height: e.clientHeight };
                      t[s].offset.length = 0;
                      let h = !t[s].interpolate,
                        c = n.length;
                      for (let e = 0; e < c; e++) {
                        let i = (function (e, t, i, n) {
                          let r = Array.isArray(e) ? e : eQ,
                            s = 0,
                            o = 0;
                          return (
                            'number' == typeof e
                              ? (r = [e, e])
                              : 'string' == typeof e &&
                                (r = (e = e.trim()).includes(' ')
                                  ? e.split(' ')
                                  : [e, eK[e] ? e : '0']),
                            (s = eZ(r[0], i, n)) - eZ(r[1], t)
                          );
                        })(n[e], u[o], l[o], a[s]);
                        h || i === t[s].interpolatorOffsets[e] || (h = !0),
                          (t[s].offset[e] = i);
                      }
                      h &&
                        ((t[s].interpolate = eq(t[s].offset, eY(n), {
                          clamp: !1,
                        })),
                        (t[s].interpolatorOffsets = [...t[s].offset])),
                        (t[s].progress = K(
                          0,
                          1,
                          t[s].interpolate(t[s].current)
                        ));
                    })(e, i, n);
              },
              notify: () => t(i),
            };
          })(t, e, X(), i);
          if ((n.add(o), !e1.has(t))) {
            let e = () => {
                for (let e of n) e.measure(E.timestamp);
                P.preUpdate(i);
              },
              i = () => {
                for (let e of n) e.notify();
              },
              o = () => P.read(e);
            e1.set(t, o);
            let a = e5(t);
            window.addEventListener('resize', o, { passive: !0 }),
              t !== document.documentElement &&
                e2.set(
                  t,
                  'function' == typeof t
                    ? ($.add(t),
                      s ||
                        ((s = () => {
                          let e = {
                              width: window.innerWidth,
                              height: window.innerHeight,
                            },
                            t = { target: window, size: e, contentSize: e };
                          $.forEach((e) => e(t));
                        }),
                        window.addEventListener('resize', s)),
                      () => {
                        $.delete(t), !$.size && s && (s = void 0);
                      })
                    : (function (e, t) {
                        r ||
                          ('undefined' != typeof ResizeObserver &&
                            (r = new ResizeObserver(B)));
                        let i = N(e);
                        return (
                          i.forEach((e) => {
                            let i = F.get(e);
                            i || ((i = new Set()), F.set(e, i)),
                              i.add(t),
                              r?.observe(e);
                          }),
                          () => {
                            i.forEach((e) => {
                              let i = F.get(e);
                              i?.delete(t), i?.size || r?.unobserve(e);
                            });
                          }
                        );
                      })(t, o)
                ),
              a.addEventListener('scroll', o, { passive: !0 }),
              o();
          }
          let a = e1.get(t);
          return (
            P.read(a, !1, !0),
            () => {
              w(a);
              let e = e3.get(t);
              if (!e || (e.delete(o), e.size)) return;
              let i = e1.get(t);
              e1.delete(t),
                i &&
                  (e5(t).removeEventListener('scroll', i),
                  e2.get(t)?.(),
                  window.removeEventListener('resize', i));
            }
          );
        }
        let e9 = new Map();
        function e6({ source: e, container: t, ...i }) {
          let { axis: n } = i;
          e && (t = e);
          let r = e9.get(t) ?? new Map();
          e9.set(t, r);
          let s = i.target ?? 'self',
            o = r.get(s) ?? {},
            a = n + (i.offset ?? []).join(',');
          return (
            o[a] ||
              (o[a] =
                !i.target && V()
                  ? new ScrollTimeline({ source: t, axis: n })
                  : (function (e) {
                      let t = { value: 0 },
                        i = e4((i) => {
                          t.value = 100 * i[e.axis].progress;
                        }, e);
                      return { currentTime: t, cancel: i };
                    })({ container: t, ...i })),
            o[a]
          );
        }
        function e8(e) {
          let t = (0, c.useRef)(null);
          return null === t.current && (t.current = e()), t.current;
        }
        let e7 = 'undefined' != typeof window,
          te = e7 ? c.useLayoutEffect : c.useEffect;
        function tt(e, t) {
          _(
            !!(!t || t.current),
            `You have defined a ${e} options but the provided ref is not yet hydrated, probably because it's defined higher up the tree. Try calling useScroll() in the same component as the ref, or setting its \`layoutEffect: false\` option.`
          );
        }
        let ti = () => ({
            scrollX: C(0),
            scrollY: C(0),
            scrollXProgress: C(0),
            scrollYProgress: C(0),
          }),
          tn = (0, c.createContext)({
            transformPagePoint: (e) => e,
            isStatic: !1,
            reducedMotion: 'never',
          });
        function tr(e, t) {
          let i = (function (e) {
              let t = e8(() => C(e)),
                { isStatic: i } = (0, c.useContext)(tn);
              if (i) {
                let [, i] = (0, c.useState)(e);
                (0, c.useEffect)(() => t.on('change', i), []);
              }
              return t;
            })(t()),
            n = () => i.set(t());
          return (
            n(),
            te(() => {
              let t = () => P.preRender(n, !1, !0),
                i = e.map((e) => e.on('change', t));
              return () => {
                i.forEach((e) => e()), w(n);
              };
            }),
            i
          );
        }
        function ts(e, t, i, n) {
          if ('function' == typeof e) {
            (M.current = []), e();
            let t = tr(M.current, e);
            return (M.current = void 0), t;
          }
          let r =
            'function' == typeof t
              ? t
              : (function (...e) {
                  let t = !Array.isArray(e[0]),
                    i = t ? 0 : -1,
                    n = e[0 + i],
                    r = e[1 + i],
                    s = eq(r, e[2 + i], e[3 + i]);
                  return t ? s(n) : s;
                })(t, i, n);
          return Array.isArray(e) ? to(e, r) : to([e], ([e]) => r(e));
        }
        function to(e, t) {
          let i = e8(() => []);
          return tr(e, () => {
            i.length = 0;
            let n = e.length;
            for (let t = 0; t < n; t++) i[t] = e[t].get();
            return t(i);
          });
        }
        function ta(e) {
          return (
            null !== e && 'object' == typeof e && 'function' == typeof e.start
          );
        }
        function tl(e) {
          let t = [{}, {}];
          return (
            e?.values.forEach((e, i) => {
              (t[0][i] = e.get()), (t[1][i] = e.getVelocity());
            }),
            t
          );
        }
        function tu(e, t, i, n) {
          if ('function' == typeof t) {
            let [r, s] = tl(n);
            t = t(void 0 !== i ? i : e.custom, r, s);
          }
          if (
            ('string' == typeof t && (t = e.variants && e.variants[t]),
            'function' == typeof t)
          ) {
            let [r, s] = tl(n);
            t = t(void 0 !== i ? i : e.custom, r, s);
          }
          return t;
        }
        function th(e, t, i) {
          let n = e.getProps();
          return tu(n, t, void 0 !== i ? i : n.custom, e);
        }
        function tc(e, t) {
          return e?.[t] ?? e?.default ?? e;
        }
        let td = [
            'transformPerspective',
            'x',
            'y',
            'z',
            'translateX',
            'translateY',
            'translateZ',
            'scale',
            'scaleX',
            'scaleY',
            'rotate',
            'rotateX',
            'rotateY',
            'rotateZ',
            'skew',
            'skewX',
            'skewY',
          ],
          tp = new Set(td),
          tf = new Set([
            'width',
            'height',
            'top',
            'left',
            'right',
            'bottom',
            ...td,
          ]),
          tm = (e) => Array.isArray(e);
        function tg(e, t) {
          let {
            transitionEnd: i = {},
            transition: n = {},
            ...r
          } = th(e, t) || {};
          for (let t in (r = { ...r, ...i })) {
            var s;
            let i = tm((s = r[t])) ? s[s.length - 1] || 0 : s;
            e.hasValue(t) ? e.getValue(t).set(i) : e.addValue(t, C(i));
          }
        }
        let ty = (e) => !!(e && e.getVelocity);
        function tv(e, t) {
          let i = e.getValue('willChange');
          if (ty(i) && i.add) return i.add(t);
          if (!i && g.WillChange) {
            let i = new g.WillChange('auto');
            e.addValue('willChange', i), i.add(t);
          }
        }
        let tx = (e) => e.replace(/([a-z])([A-Z])/gu, '$1-$2').toLowerCase(),
          tb = 'data-' + tx('framerAppearId'),
          tP = (e) => 1e3 * e,
          tw = (e) => e / 1e3,
          tE = { layout: 0, mainThread: 0, waapi: 0 },
          tT = (e) => {
            let t = ({ timestamp: t }) => e(t);
            return {
              start: (e = !0) => P.update(t, e),
              stop: () => w(t),
              now: () => (E.isProcessing ? E.timestamp : A.now()),
            };
          },
          tS = (e, t, i = 10) => {
            let n = '',
              r = Math.max(Math.round(t / i), 2);
            for (let t = 0; t < r; t++) n += e(t / (r - 1)) + ', ';
            return `linear(${n.substring(0, n.length - 2)})`;
          };
        function tA(e) {
          let t = 0,
            i = e.next(t);
          for (; !i.done && t < 2e4; ) (t += 50), (i = e.next(t));
          return t >= 2e4 ? 1 / 0 : t;
        }
        function tR(e, t, i) {
          let n = Math.max(t - 5, 0);
          return m(i - e(n), t - n);
        }
        let tM = {
          stiffness: 100,
          damping: 10,
          mass: 1,
          velocity: 0,
          duration: 800,
          bounce: 0.3,
          visualDuration: 0.3,
          restSpeed: { granular: 0.01, default: 2 },
          restDelta: { granular: 0.005, default: 0.5 },
          minDuration: 0.01,
          maxDuration: 10,
          minDamping: 0.05,
          maxDamping: 1,
        };
        function tj(e, t) {
          return e * Math.sqrt(1 - t * t);
        }
        let tC = ['duration', 'bounce'],
          t_ = ['stiffness', 'damping', 'mass'];
        function tO(e, t) {
          return t.some((t) => void 0 !== e[t]);
        }
        function tk(e = tM.visualDuration, t = tM.bounce) {
          let i,
            n =
              'object' != typeof e
                ? { visualDuration: e, keyframes: [0, 1], bounce: t }
                : e,
            { restSpeed: r, restDelta: s } = n,
            o = n.keyframes[0],
            a = n.keyframes[n.keyframes.length - 1],
            l = { done: !1, value: o },
            {
              stiffness: u,
              damping: h,
              mass: c,
              duration: d,
              velocity: p,
              isResolvedFromDuration: f,
            } = (function (e) {
              let t = {
                velocity: tM.velocity,
                stiffness: tM.stiffness,
                damping: tM.damping,
                mass: tM.mass,
                isResolvedFromDuration: !1,
                ...e,
              };
              if (!tO(e, t_) && tO(e, tC))
                if (e.visualDuration) {
                  let i = (2 * Math.PI) / (1.2 * e.visualDuration),
                    n = i * i,
                    r = 2 * K(0.05, 1, 1 - (e.bounce || 0)) * Math.sqrt(n);
                  t = { ...t, mass: tM.mass, stiffness: n, damping: r };
                } else {
                  let i = (function ({
                    duration: e = tM.duration,
                    bounce: t = tM.bounce,
                    velocity: i = tM.velocity,
                    mass: n = tM.mass,
                  }) {
                    let r, s;
                    _(
                      e <= tP(tM.maxDuration),
                      'Spring duration must be 10 seconds or less'
                    );
                    let o = 1 - t;
                    (o = K(tM.minDamping, tM.maxDamping, o)),
                      (e = K(tM.minDuration, tM.maxDuration, tw(e))),
                      o < 1
                        ? ((r = (t) => {
                            let n = t * o,
                              r = n * e;
                            return 0.001 - ((n - i) / tj(t, o)) * Math.exp(-r);
                          }),
                          (s = (t) => {
                            let n = t * o * e,
                              s = Math.pow(o, 2) * Math.pow(t, 2) * e,
                              a = Math.exp(-n),
                              l = tj(Math.pow(t, 2), o);
                            return (
                              ((n * i + i - s) *
                                a *
                                (-r(t) + 0.001 > 0 ? -1 : 1)) /
                              l
                            );
                          }))
                        : ((r = (t) =>
                            -0.001 + Math.exp(-t * e) * ((t - i) * e + 1)),
                          (s = (t) => e * e * (i - t) * Math.exp(-t * e)));
                    let a = (function (e, t, i) {
                      let n = i;
                      for (let i = 1; i < 12; i++) n -= e(n) / t(n);
                      return n;
                    })(r, s, 5 / e);
                    if (((e = tP(e)), isNaN(a)))
                      return {
                        stiffness: tM.stiffness,
                        damping: tM.damping,
                        duration: e,
                      };
                    {
                      let t = Math.pow(a, 2) * n;
                      return {
                        stiffness: t,
                        damping: 2 * o * Math.sqrt(n * t),
                        duration: e,
                      };
                    }
                  })(e);
                  (t = { ...t, ...i, mass: tM.mass }).isResolvedFromDuration =
                    !0;
                }
              return t;
            })({ ...n, velocity: -tw(n.velocity || 0) }),
            m = p || 0,
            g = h / (2 * Math.sqrt(u * c)),
            y = a - o,
            v = tw(Math.sqrt(u / c)),
            x = 5 > Math.abs(y);
          if (
            (r || (r = x ? tM.restSpeed.granular : tM.restSpeed.default),
            s || (s = x ? tM.restDelta.granular : tM.restDelta.default),
            g < 1)
          ) {
            let e = tj(v, g);
            i = (t) =>
              a -
              Math.exp(-g * v * t) *
                (((m + g * v * y) / e) * Math.sin(e * t) + y * Math.cos(e * t));
          } else if (1 === g)
            i = (e) => a - Math.exp(-v * e) * (y + (m + v * y) * e);
          else {
            let e = v * Math.sqrt(g * g - 1);
            i = (t) => {
              let i = Math.exp(-g * v * t),
                n = Math.min(e * t, 300);
              return (
                a -
                (i * ((m + g * v * y) * Math.sinh(n) + e * y * Math.cosh(n))) /
                  e
              );
            };
          }
          let b = {
            calculatedDuration: (f && d) || null,
            next: (e) => {
              let t = i(e);
              if (f) l.done = e >= d;
              else {
                let n = 0 === e ? m : 0;
                g < 1 && (n = 0 === e ? tP(m) : tR(i, e, t));
                let o = Math.abs(a - t) <= s;
                l.done = Math.abs(n) <= r && o;
              }
              return (l.value = l.done ? a : t), l;
            },
            toString: () => {
              let e = Math.min(tA(b), 2e4),
                t = tS((t) => b.next(e * t).value, e, 30);
              return e + 'ms ' + t;
            },
            toTransition: () => {},
          };
          return b;
        }
        function tD({
          keyframes: e,
          velocity: t = 0,
          power: i = 0.8,
          timeConstant: n = 325,
          bounceDamping: r = 10,
          bounceStiffness: s = 500,
          modifyTarget: o,
          min: a,
          max: l,
          restDelta: u = 0.5,
          restSpeed: h,
        }) {
          let c,
            d,
            p = e[0],
            f = { done: !1, value: p },
            m = (e) => (void 0 !== a && e < a) || (void 0 !== l && e > l),
            g = (e) =>
              void 0 === a
                ? l
                : void 0 === l || Math.abs(a - e) < Math.abs(l - e)
                ? a
                : l,
            y = i * t,
            v = p + y,
            x = void 0 === o ? v : o(v);
          x !== v && (y = x - p);
          let b = (e) => -y * Math.exp(-e / n),
            P = (e) => x + b(e),
            w = (e) => {
              let t = b(e),
                i = P(e);
              (f.done = Math.abs(t) <= u), (f.value = f.done ? x : i);
            },
            E = (e) => {
              m(f.value) &&
                ((c = e),
                (d = tk({
                  keyframes: [f.value, g(f.value)],
                  velocity: tR(P, e, f.value),
                  damping: r,
                  stiffness: s,
                  restDelta: u,
                  restSpeed: h,
                })));
            };
          return (
            E(0),
            {
              calculatedDuration: null,
              next: (e) => {
                let t = !1;
                return (d || void 0 !== c || ((t = !0), w(e), E(e)),
                void 0 !== c && e >= c)
                  ? d.next(e - c)
                  : (t || w(e), f);
              },
            }
          );
        }
        tk.applyToOptions = (e) => {
          let t = (function (e, t = 100, i) {
            let n = i({ ...e, keyframes: [0, t] }),
              r = Math.min(tA(n), 2e4);
            return {
              type: 'keyframes',
              ease: (e) => n.next(r * e).value / t,
              duration: tw(r),
            };
          })(e, 100, tk);
          return (
            (e.ease = t.ease),
            (e.duration = tP(t.duration)),
            (e.type = 'keyframes'),
            e
          );
        };
        let tV = (e, t, i) =>
          (((1 - 3 * i + 3 * t) * e + (3 * i - 6 * t)) * e + 3 * t) * e;
        function tL(e, t, i, n) {
          if (e === t && i === n) return y;
          let r = (t) =>
            (function (e, t, i, n, r) {
              let s,
                o,
                a = 0;
              do
                (s = tV((o = t + (i - t) / 2), n, r) - e) > 0
                  ? (i = o)
                  : (t = o);
              while (Math.abs(s) > 1e-7 && ++a < 12);
              return o;
            })(t, 0, 1, e, i);
          return (e) => (0 === e || 1 === e ? e : tV(r(e), t, n));
        }
        let tI = tL(0.42, 0, 1, 1),
          tN = tL(0, 0, 0.58, 1),
          tF = tL(0.42, 0, 0.58, 1),
          tU = (e) => Array.isArray(e) && 'number' != typeof e[0],
          tB = (e) => (t) => t <= 0.5 ? e(2 * t) / 2 : (2 - e(2 * (1 - t))) / 2,
          t$ = (e) => (t) => 1 - e(1 - t),
          tz = tL(0.33, 1.53, 0.69, 0.99),
          tW = t$(tz),
          tX = tB(tW),
          tH = (e) =>
            (e *= 2) < 1 ? 0.5 * tW(e) : 0.5 * (2 - Math.pow(2, -10 * (e - 1))),
          tq = (e) => 1 - Math.sin(Math.acos(e)),
          tY = t$(tq),
          tG = tB(tq),
          tK = (e) => Array.isArray(e) && 'number' == typeof e[0],
          tZ = {
            linear: y,
            easeIn: tI,
            easeInOut: tF,
            easeOut: tN,
            circIn: tq,
            circInOut: tG,
            circOut: tY,
            backIn: tW,
            backInOut: tX,
            backOut: tz,
            anticipate: tH,
          },
          tQ = (e) => 'string' == typeof e,
          tJ = (e) => {
            if (tK(e)) {
              O(
                4 === e.length,
                'Cubic bezier arrays must contain four numerical values.'
              );
              let [t, i, n, r] = e;
              return tL(t, i, n, r);
            }
            return tQ(e)
              ? (O(void 0 !== tZ[e], `Invalid easing type '${e}'`), tZ[e])
              : e;
          };
        function t0({
          duration: e = 300,
          keyframes: t,
          times: i,
          ease: n = 'easeInOut',
        }) {
          var r;
          let s = tU(n) ? n.map(tJ) : tJ(n),
            o = { done: !1, value: t[0] },
            a = eq(
              ((r = i && i.length === t.length ? i : eY(t)),
              r.map((t) => t * e)),
              t,
              {
                ease: Array.isArray(s)
                  ? s
                  : t.map(() => s || tF).splice(0, t.length - 1),
              }
            );
          return {
            calculatedDuration: e,
            next: (t) => ((o.value = a(t)), (o.done = t >= e), o),
          };
        }
        let t1 = (e) => null !== e;
        function t2(e, { repeat: t, repeatType: i = 'loop' }, n, r = 1) {
          let s = e.filter(t1),
            o = r < 0 || (t && 'loop' !== i && t % 2 == 1) ? 0 : s.length - 1;
          return o && void 0 !== n ? n : s[o];
        }
        let t3 = {
          decay: tD,
          inertia: tD,
          tween: t0,
          keyframes: t0,
          spring: tk,
        };
        function t5(e) {
          'string' == typeof e.type && (e.type = t3[e.type]);
        }
        class t4 {
          constructor() {
            this.updateFinished();
          }
          get finished() {
            return this._finished;
          }
          updateFinished() {
            this._finished = new Promise((e) => {
              this.resolve = e;
            });
          }
          notifyFinished() {
            this.resolve();
          }
          then(e, t) {
            return this.finished.then(e, t);
          }
        }
        let t9 = (e) => e / 100;
        class t6 extends t4 {
          constructor(e) {
            super(),
              (this.state = 'idle'),
              (this.startTime = null),
              (this.isStopped = !1),
              (this.currentTime = 0),
              (this.holdTime = null),
              (this.playbackSpeed = 1),
              (this.stop = () => {
                let { motionValue: e } = this.options;
                e && e.updatedAt !== A.now() && this.tick(A.now()),
                  (this.isStopped = !0),
                  'idle' !== this.state &&
                    (this.teardown(), this.options.onStop?.());
              }),
              tE.mainThread++,
              (this.options = e),
              this.initAnimation(),
              this.play(),
              !1 === e.autoplay && this.pause();
          }
          initAnimation() {
            let { options: e } = this;
            t5(e);
            let {
                type: t = t0,
                repeat: i = 0,
                repeatDelay: n = 0,
                repeatType: r,
                velocity: s = 0,
              } = e,
              { keyframes: o } = e,
              a = t || t0;
            a !== t0 &&
              'number' != typeof o[0] &&
              ((this.mixKeyframes = G(t9, eH(o[0], o[1]))), (o = [0, 100]));
            let l = a({ ...e, keyframes: o });
            'mirror' === r &&
              (this.mirroredGenerator = a({
                ...e,
                keyframes: [...o].reverse(),
                velocity: -s,
              })),
              null === l.calculatedDuration && (l.calculatedDuration = tA(l));
            let { calculatedDuration: u } = l;
            (this.calculatedDuration = u),
              (this.resolvedDuration = u + n),
              (this.totalDuration = this.resolvedDuration * (i + 1) - n),
              (this.generator = l);
          }
          updateTime(e) {
            let t = Math.round(e - this.startTime) * this.playbackSpeed;
            null !== this.holdTime
              ? (this.currentTime = this.holdTime)
              : (this.currentTime = t);
          }
          tick(e, t = !1) {
            let {
              generator: i,
              totalDuration: n,
              mixKeyframes: r,
              mirroredGenerator: s,
              resolvedDuration: o,
              calculatedDuration: a,
            } = this;
            if (null === this.startTime) return i.next(0);
            let {
              delay: l = 0,
              keyframes: u,
              repeat: h,
              repeatType: c,
              repeatDelay: d,
              type: p,
              onUpdate: f,
              finalKeyframe: m,
            } = this.options;
            this.speed > 0
              ? (this.startTime = Math.min(this.startTime, e))
              : this.speed < 0 &&
                (this.startTime = Math.min(e - n / this.speed, this.startTime)),
              t ? (this.currentTime = e) : this.updateTime(e);
            let g = this.currentTime - l * (this.playbackSpeed >= 0 ? 1 : -1),
              y = this.playbackSpeed >= 0 ? g < 0 : g > n;
            (this.currentTime = Math.max(g, 0)),
              'finished' === this.state &&
                null === this.holdTime &&
                (this.currentTime = n);
            let v = this.currentTime,
              x = i;
            if (h) {
              let e = Math.min(this.currentTime, n) / o,
                t = Math.floor(e),
                i = e % 1;
              !i && e >= 1 && (i = 1),
                1 === i && t--,
                (t = Math.min(t, h + 1)) % 2 &&
                  ('reverse' === c
                    ? ((i = 1 - i), d && (i -= d / o))
                    : 'mirror' === c && (x = s)),
                (v = K(0, 1, i) * o);
            }
            let b = y ? { done: !1, value: u[0] } : x.next(v);
            r && (b.value = r(b.value));
            let { done: P } = b;
            y ||
              null === a ||
              (P =
                this.playbackSpeed >= 0
                  ? this.currentTime >= n
                  : this.currentTime <= 0);
            let w =
              null === this.holdTime &&
              ('finished' === this.state || ('running' === this.state && P));
            return (
              w && p !== tD && (b.value = t2(u, this.options, m, this.speed)),
              f && f(b.value),
              w && this.finish(),
              b
            );
          }
          then(e, t) {
            return this.finished.then(e, t);
          }
          get duration() {
            return tw(this.calculatedDuration);
          }
          get time() {
            return tw(this.currentTime);
          }
          set time(e) {
            (e = tP(e)),
              (this.currentTime = e),
              null === this.startTime ||
              null !== this.holdTime ||
              0 === this.playbackSpeed
                ? (this.holdTime = e)
                : this.driver &&
                  (this.startTime = this.driver.now() - e / this.playbackSpeed),
              this.driver?.start(!1);
          }
          get speed() {
            return this.playbackSpeed;
          }
          set speed(e) {
            this.updateTime(A.now());
            let t = this.playbackSpeed !== e;
            (this.playbackSpeed = e), t && (this.time = tw(this.currentTime));
          }
          play() {
            if (this.isStopped) return;
            let { driver: e = tT, startTime: t } = this.options;
            this.driver || (this.driver = e((e) => this.tick(e))),
              this.options.onPlay?.();
            let i = this.driver.now();
            'finished' === this.state
              ? (this.updateFinished(), (this.startTime = i))
              : null !== this.holdTime
              ? (this.startTime = i - this.holdTime)
              : this.startTime || (this.startTime = t ?? i),
              'finished' === this.state &&
                this.speed < 0 &&
                (this.startTime += this.calculatedDuration),
              (this.holdTime = null),
              (this.state = 'running'),
              this.driver.start();
          }
          pause() {
            (this.state = 'paused'),
              this.updateTime(A.now()),
              (this.holdTime = this.currentTime);
          }
          complete() {
            'running' !== this.state && this.play(),
              (this.state = 'finished'),
              (this.holdTime = null);
          }
          finish() {
            this.notifyFinished(),
              this.teardown(),
              (this.state = 'finished'),
              this.options.onComplete?.();
          }
          cancel() {
            (this.holdTime = null),
              (this.startTime = 0),
              this.tick(0),
              this.teardown(),
              this.options.onCancel?.();
          }
          teardown() {
            (this.state = 'idle'),
              this.stopDriver(),
              (this.startTime = this.holdTime = null),
              tE.mainThread--;
          }
          stopDriver() {
            this.driver && (this.driver.stop(), (this.driver = void 0));
          }
          sample(e) {
            return (this.startTime = 0), this.tick(e, !0);
          }
          attachTimeline(e) {
            return (
              this.options.allowFlatten &&
                ((this.options.type = 'keyframes'),
                (this.options.ease = 'linear'),
                this.initAnimation()),
              this.driver?.stop(),
              e.observe(this)
            );
          }
        }
        let t8 = (e) => (180 * e) / Math.PI,
          t7 = (e) => it(t8(Math.atan2(e[1], e[0]))),
          ie = {
            x: 4,
            y: 5,
            translateX: 4,
            translateY: 5,
            scaleX: 0,
            scaleY: 3,
            scale: (e) => (Math.abs(e[0]) + Math.abs(e[3])) / 2,
            rotate: t7,
            rotateZ: t7,
            skewX: (e) => t8(Math.atan(e[1])),
            skewY: (e) => t8(Math.atan(e[2])),
            skew: (e) => (Math.abs(e[1]) + Math.abs(e[2])) / 2,
          },
          it = (e) => ((e %= 360) < 0 && (e += 360), e),
          ii = (e) => Math.sqrt(e[0] * e[0] + e[1] * e[1]),
          ir = (e) => Math.sqrt(e[4] * e[4] + e[5] * e[5]),
          is = {
            x: 12,
            y: 13,
            z: 14,
            translateX: 12,
            translateY: 13,
            translateZ: 14,
            scaleX: ii,
            scaleY: ir,
            scale: (e) => (ii(e) + ir(e)) / 2,
            rotateX: (e) => it(t8(Math.atan2(e[6], e[5]))),
            rotateY: (e) => it(t8(Math.atan2(-e[2], e[0]))),
            rotateZ: t7,
            rotate: t7,
            skewX: (e) => t8(Math.atan(e[4])),
            skewY: (e) => t8(Math.atan(e[1])),
            skew: (e) => (Math.abs(e[1]) + Math.abs(e[4])) / 2,
          };
        function io(e) {
          return +!!e.includes('scale');
        }
        function ia(e, t) {
          let i, n;
          if (!e || 'none' === e) return io(t);
          let r = e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);
          if (r) (i = is), (n = r);
          else {
            let t = e.match(/^matrix\(([-\d.e\s,]+)\)$/u);
            (i = ie), (n = t);
          }
          if (!n) return io(t);
          let s = i[t],
            o = n[1].split(',').map(iu);
          return 'function' == typeof s ? s(o) : o[s];
        }
        let il = (e, t) => {
          let { transform: i = 'none' } = getComputedStyle(e);
          return ia(i, t);
        };
        function iu(e) {
          return parseFloat(e.trim());
        }
        let ih = (e) => e === ei || e === ey,
          ic = new Set(['x', 'y', 'z']),
          id = td.filter((e) => !ic.has(e)),
          ip = {
            width: (
              { x: e },
              { paddingLeft: t = '0', paddingRight: i = '0' }
            ) => e.max - e.min - parseFloat(t) - parseFloat(i),
            height: (
              { y: e },
              { paddingTop: t = '0', paddingBottom: i = '0' }
            ) => e.max - e.min - parseFloat(t) - parseFloat(i),
            top: (e, { top: t }) => parseFloat(t),
            left: (e, { left: t }) => parseFloat(t),
            bottom: ({ y: e }, { top: t }) => parseFloat(t) + (e.max - e.min),
            right: ({ x: e }, { left: t }) => parseFloat(t) + (e.max - e.min),
            x: (e, { transform: t }) => ia(t, 'x'),
            y: (e, { transform: t }) => ia(t, 'y'),
          };
        (ip.translateX = ip.x), (ip.translateY = ip.y);
        let im = new Set(),
          ig = !1,
          iy = !1,
          iv = !1;
        function ix() {
          if (iy) {
            let e = Array.from(im).filter((e) => e.needsMeasurement),
              t = new Set(e.map((e) => e.element)),
              i = new Map();
            t.forEach((e) => {
              let t = (function (e) {
                let t = [];
                return (
                  id.forEach((i) => {
                    let n = e.getValue(i);
                    void 0 !== n &&
                      (t.push([i, n.get()]), n.set(+!!i.startsWith('scale')));
                  }),
                  t
                );
              })(e);
              t.length && (i.set(e, t), e.render());
            }),
              e.forEach((e) => e.measureInitialState()),
              t.forEach((e) => {
                e.render();
                let t = i.get(e);
                t &&
                  t.forEach(([t, i]) => {
                    e.getValue(t)?.set(i);
                  });
              }),
              e.forEach((e) => e.measureEndState()),
              e.forEach((e) => {
                void 0 !== e.suspendedScrollY &&
                  window.scrollTo(0, e.suspendedScrollY);
              });
          }
          (iy = !1), (ig = !1), im.forEach((e) => e.complete(iv)), im.clear();
        }
        function ib() {
          im.forEach((e) => {
            e.readKeyframes(), e.needsMeasurement && (iy = !0);
          });
        }
        class iP {
          constructor(e, t, i, n, r, s = !1) {
            (this.state = 'pending'),
              (this.isAsync = !1),
              (this.needsMeasurement = !1),
              (this.unresolvedKeyframes = [...e]),
              (this.onComplete = t),
              (this.name = i),
              (this.motionValue = n),
              (this.element = r),
              (this.isAsync = s);
          }
          scheduleResolve() {
            (this.state = 'scheduled'),
              this.isAsync
                ? (im.add(this),
                  ig || ((ig = !0), P.read(ib), P.resolveKeyframes(ix)))
                : (this.readKeyframes(), this.complete());
          }
          readKeyframes() {
            let {
              unresolvedKeyframes: e,
              name: t,
              element: i,
              motionValue: n,
            } = this;
            if (null === e[0]) {
              let r = n?.get(),
                s = e[e.length - 1];
              if (void 0 !== r) e[0] = r;
              else if (i && t) {
                let n = i.readValue(t, s);
                null != n && (e[0] = n);
              }
              void 0 === e[0] && (e[0] = s), n && void 0 === r && n.set(e[0]);
            }
            for (let t = 1; t < e.length; t++) e[t] ?? (e[t] = e[t - 1]);
          }
          setFinalKeyframe() {}
          measureInitialState() {}
          renderEndStyles() {}
          measureEndState() {}
          complete(e = !1) {
            (this.state = 'complete'),
              this.onComplete(this.unresolvedKeyframes, this.finalKeyframe, e),
              im.delete(this);
          }
          cancel() {
            'scheduled' === this.state &&
              (im.delete(this), (this.state = 'pending'));
          }
          resume() {
            'pending' === this.state && this.scheduleResolve();
          }
        }
        let iw = (e) => e.startsWith('--'),
          iE = {},
          iT = (function (e, t) {
            let i = D(e);
            return () => iE[t] ?? i();
          })(() => {
            try {
              document
                .createElement('div')
                .animate({ opacity: 0 }, { easing: 'linear(0, 1)' });
            } catch (e) {
              return !1;
            }
            return !0;
          }, 'linearEasing'),
          iS = ([e, t, i, n]) => `cubic-bezier(${e}, ${t}, ${i}, ${n})`,
          iA = {
            linear: 'linear',
            ease: 'ease',
            easeIn: 'ease-in',
            easeOut: 'ease-out',
            easeInOut: 'ease-in-out',
            circIn: iS([0, 0.65, 0.55, 1]),
            circOut: iS([0.55, 0, 1, 0.45]),
            backIn: iS([0.31, 0.01, 0.66, -0.59]),
            backOut: iS([0.33, 1.53, 0.69, 0.99]),
          };
        function iR(e) {
          return 'function' == typeof e && 'applyToOptions' in e;
        }
        class iM extends t4 {
          constructor(e) {
            if (
              (super(), (this.finishedTime = null), (this.isStopped = !1), !e)
            )
              return;
            let {
              element: t,
              name: i,
              keyframes: n,
              pseudoElement: r,
              allowFlatten: s = !1,
              finalKeyframe: o,
              onComplete: a,
            } = e;
            (this.isPseudoElement = !!r),
              (this.allowFlatten = s),
              (this.options = e),
              O(
                'string' != typeof e.type,
                'animateMini doesn\'t support "type" as a string. Did you mean to import { spring } from "motion"?'
              );
            let l = (function ({ type: e, ...t }) {
              return iR(e) && iT()
                ? e.applyToOptions(t)
                : (t.duration ?? (t.duration = 300),
                  t.ease ?? (t.ease = 'easeOut'),
                  t);
            })(e);
            (this.animation = (function (
              e,
              t,
              i,
              {
                delay: n = 0,
                duration: r = 300,
                repeat: s = 0,
                repeatType: o = 'loop',
                ease: a = 'easeOut',
                times: l,
              } = {},
              u
            ) {
              let h = { [t]: i };
              l && (h.offset = l);
              let c = (function e(t, i) {
                if (t)
                  return 'function' == typeof t
                    ? iT()
                      ? tS(t, i)
                      : 'ease-out'
                    : tK(t)
                    ? iS(t)
                    : Array.isArray(t)
                    ? t.map((t) => e(t, i) || iA.easeOut)
                    : iA[t];
              })(a, r);
              Array.isArray(c) && (h.easing = c), x.value && tE.waapi++;
              let d = {
                delay: n,
                duration: r,
                easing: Array.isArray(c) ? 'linear' : c,
                fill: 'both',
                iterations: s + 1,
                direction: 'reverse' === o ? 'alternate' : 'normal',
              };
              u && (d.pseudoElement = u);
              let p = e.animate(h, d);
              return (
                x.value &&
                  p.finished.finally(() => {
                    tE.waapi--;
                  }),
                p
              );
            })(t, i, n, l, r)),
              !1 === l.autoplay && this.animation.pause(),
              (this.animation.onfinish = () => {
                if (((this.finishedTime = this.time), !r)) {
                  let e = t2(n, this.options, o, this.speed);
                  this.updateMotionValue
                    ? this.updateMotionValue(e)
                    : (function (e, t, i) {
                        iw(t) ? e.style.setProperty(t, i) : (e.style[t] = i);
                      })(t, i, e),
                    this.animation.cancel();
                }
                a?.(), this.notifyFinished();
              });
          }
          play() {
            this.isStopped ||
              (this.animation.play(),
              'finished' === this.state && this.updateFinished());
          }
          pause() {
            this.animation.pause();
          }
          complete() {
            this.animation.finish?.();
          }
          cancel() {
            try {
              this.animation.cancel();
            } catch (e) {}
          }
          stop() {
            if (this.isStopped) return;
            this.isStopped = !0;
            let { state: e } = this;
            'idle' !== e &&
              'finished' !== e &&
              (this.updateMotionValue
                ? this.updateMotionValue()
                : this.commitStyles(),
              this.isPseudoElement || this.cancel());
          }
          commitStyles() {
            this.isPseudoElement || this.animation.commitStyles?.();
          }
          get duration() {
            return tw(
              Number(this.animation.effect?.getComputedTiming?.().duration || 0)
            );
          }
          get time() {
            return tw(Number(this.animation.currentTime) || 0);
          }
          set time(e) {
            (this.finishedTime = null), (this.animation.currentTime = tP(e));
          }
          get speed() {
            return this.animation.playbackRate;
          }
          set speed(e) {
            e < 0 && (this.finishedTime = null),
              (this.animation.playbackRate = e);
          }
          get state() {
            return null !== this.finishedTime
              ? 'finished'
              : this.animation.playState;
          }
          get startTime() {
            return Number(this.animation.startTime);
          }
          set startTime(e) {
            this.animation.startTime = e;
          }
          attachTimeline({ timeline: e, observe: t }) {
            return (this.allowFlatten &&
              this.animation.effect?.updateTiming({ easing: 'linear' }),
            (this.animation.onfinish = null),
            e && V())
              ? ((this.animation.timeline = e), y)
              : t(this);
          }
        }
        let ij = { anticipate: tH, backInOut: tX, circInOut: tG };
        class iC extends iM {
          constructor(e) {
            !(function (e) {
              'string' == typeof e.ease &&
                e.ease in ij &&
                (e.ease = ij[e.ease]);
            })(e),
              t5(e),
              super(e),
              e.startTime && (this.startTime = e.startTime),
              (this.options = e);
          }
          updateMotionValue(e) {
            let {
              motionValue: t,
              onUpdate: i,
              onComplete: n,
              element: r,
              ...s
            } = this.options;
            if (!t) return;
            if (void 0 !== e) return void t.set(e);
            let o = new t6({ ...s, autoplay: !1 }),
              a = tP(this.finishedTime ?? this.time);
            t.setWithVelocity(o.sample(a - 10).value, o.sample(a).value, 10),
              o.stop();
          }
        }
        let i_ = (e, t) =>
            'zIndex' !== t &&
            !!(
              'number' == typeof e ||
              Array.isArray(e) ||
              ('string' == typeof e &&
                (e_.test(e) || '0' === e) &&
                !e.startsWith('url('))
            ),
          iO = new Set(['opacity', 'clipPath', 'filter', 'transform']),
          ik = D(() =>
            Object.hasOwnProperty.call(Element.prototype, 'animate')
          );
        class iD extends t4 {
          constructor({
            autoplay: e = !0,
            delay: t = 0,
            type: i = 'keyframes',
            repeat: n = 0,
            repeatDelay: r = 0,
            repeatType: s = 'loop',
            keyframes: o,
            name: a,
            motionValue: l,
            element: u,
            ...h
          }) {
            super(),
              (this.stop = () => {
                this._animation &&
                  (this._animation.stop(), this.stopTimeline?.()),
                  this.keyframeResolver?.cancel();
              }),
              (this.createdAt = A.now());
            let c = {
                autoplay: e,
                delay: t,
                type: i,
                repeat: n,
                repeatDelay: r,
                repeatType: s,
                name: a,
                motionValue: l,
                element: u,
                ...h,
              },
              d = u?.KeyframeResolver || iP;
            (this.keyframeResolver = new d(
              o,
              (e, t, i) => this.onKeyframesResolved(e, t, c, !i),
              a,
              l,
              u
            )),
              this.keyframeResolver?.scheduleResolve();
          }
          onKeyframesResolved(e, t, i, n) {
            this.keyframeResolver = void 0;
            let {
              name: r,
              type: s,
              velocity: o,
              delay: a,
              isHandoff: l,
              onUpdate: u,
            } = i;
            (this.resolvedAt = A.now()),
              !(function (e, t, i, n) {
                let r = e[0];
                if (null === r) return !1;
                if ('display' === t || 'visibility' === t) return !0;
                let s = e[e.length - 1],
                  o = i_(r, t),
                  a = i_(s, t);
                return (
                  _(
                    o === a,
                    `You are trying to animate ${t} from "${r}" to "${s}". ${r} is not an animatable value - to enable this animation set ${r} to a value animatable to ${s} via the \`style\` property.`
                  ),
                  !!o &&
                    !!a &&
                    ((function (e) {
                      let t = e[0];
                      if (1 === e.length) return !0;
                      for (let i = 0; i < e.length; i++)
                        if (e[i] !== t) return !0;
                    })(e) ||
                      (('spring' === i || iR(i)) && n))
                );
              })(e, r, s, o) &&
                ((g.instantAnimations || !a) && u?.(t2(e, i, t)),
                (e[0] = e[e.length - 1]),
                (i.duration = 0),
                (i.repeat = 0));
            let h = {
                startTime: n
                  ? this.resolvedAt && this.resolvedAt - this.createdAt > 40
                    ? this.resolvedAt
                    : this.createdAt
                  : void 0,
                finalKeyframe: t,
                ...i,
                keyframes: e,
              },
              c =
                !l &&
                (function (e) {
                  let {
                    motionValue: t,
                    name: i,
                    repeatDelay: n,
                    repeatType: r,
                    damping: s,
                    type: o,
                  } = e;
                  if (!eG(t?.owner?.current)) return !1;
                  let { onUpdate: a, transformTemplate: l } =
                    t.owner.getProps();
                  return (
                    ik() &&
                    i &&
                    iO.has(i) &&
                    ('transform' !== i || !l) &&
                    !a &&
                    !n &&
                    'mirror' !== r &&
                    0 !== s &&
                    'inertia' !== o
                  );
                })(h)
                  ? new iC({ ...h, element: h.motionValue.owner.current })
                  : new t6(h);
            c.finished.then(() => this.notifyFinished()).catch(y),
              this.pendingTimeline &&
                ((this.stopTimeline = c.attachTimeline(this.pendingTimeline)),
                (this.pendingTimeline = void 0)),
              (this._animation = c);
          }
          get finished() {
            return this._animation ? this.animation.finished : this._finished;
          }
          then(e, t) {
            return this.finished.finally(e).then(() => {});
          }
          get animation() {
            return (
              this._animation ||
                (this.keyframeResolver?.resume(),
                (iv = !0),
                ib(),
                ix(),
                (iv = !1)),
              this._animation
            );
          }
          get duration() {
            return this.animation.duration;
          }
          get time() {
            return this.animation.time;
          }
          set time(e) {
            this.animation.time = e;
          }
          get speed() {
            return this.animation.speed;
          }
          get state() {
            return this.animation.state;
          }
          set speed(e) {
            this.animation.speed = e;
          }
          get startTime() {
            return this.animation.startTime;
          }
          attachTimeline(e) {
            return (
              this._animation
                ? (this.stopTimeline = this.animation.attachTimeline(e))
                : (this.pendingTimeline = e),
              () => this.stop()
            );
          }
          play() {
            this.animation.play();
          }
          pause() {
            this.animation.pause();
          }
          complete() {
            this.animation.complete();
          }
          cancel() {
            this._animation && this.animation.cancel(),
              this.keyframeResolver?.cancel();
          }
        }
        let iV = (e) => null !== e,
          iL = { type: 'spring', stiffness: 500, damping: 25, restSpeed: 10 },
          iI = (e) => ({
            type: 'spring',
            stiffness: 550,
            damping: 0 === e ? 2 * Math.sqrt(550) : 30,
            restSpeed: 10,
          }),
          iN = { type: 'keyframes', duration: 0.8 },
          iF = { type: 'keyframes', ease: [0.25, 0.1, 0.35, 1], duration: 0.3 },
          iU = (e, { keyframes: t }) =>
            t.length > 2
              ? iN
              : tp.has(e)
              ? e.startsWith('scale')
                ? iI(t[1])
                : iL
              : iF,
          iB =
            (e, t, i, n = {}, r, s) =>
            (o) => {
              let a = tc(n, e) || {},
                l = a.delay || n.delay || 0,
                { elapsed: u = 0 } = n;
              u -= tP(l);
              let h = {
                keyframes: Array.isArray(i) ? i : [null, i],
                ease: 'easeOut',
                velocity: t.getVelocity(),
                ...a,
                delay: -u,
                onUpdate: (e) => {
                  t.set(e), a.onUpdate && a.onUpdate(e);
                },
                onComplete: () => {
                  o(), a.onComplete && a.onComplete();
                },
                name: e,
                motionValue: t,
                element: s ? void 0 : r,
              };
              !(function ({
                when: e,
                delay: t,
                delayChildren: i,
                staggerChildren: n,
                staggerDirection: r,
                repeat: s,
                repeatType: o,
                repeatDelay: a,
                from: l,
                elapsed: u,
                ...h
              }) {
                return !!Object.keys(h).length;
              })(a) && Object.assign(h, iU(e, h)),
                h.duration && (h.duration = tP(h.duration)),
                h.repeatDelay && (h.repeatDelay = tP(h.repeatDelay)),
                void 0 !== h.from && (h.keyframes[0] = h.from);
              let c = !1;
              if (
                ((!1 !== h.type && (0 !== h.duration || h.repeatDelay)) ||
                  ((h.duration = 0), 0 === h.delay && (c = !0)),
                (g.instantAnimations || g.skipAnimations) &&
                  ((c = !0), (h.duration = 0), (h.delay = 0)),
                (h.allowFlatten = !a.type && !a.ease),
                c && !s && void 0 !== t.get())
              ) {
                let e = (function (
                  e,
                  { repeat: t, repeatType: i = 'loop' },
                  n
                ) {
                  let r = e.filter(iV),
                    s = t && 'loop' !== i && t % 2 == 1 ? 0 : r.length - 1;
                  return r[s];
                })(h.keyframes, a);
                if (void 0 !== e)
                  return void P.update(() => {
                    h.onUpdate(e), h.onComplete();
                  });
              }
              return a.isSync ? new t6(h) : new iD(h);
            };
        function i$(
          e,
          t,
          { delay: i = 0, transitionOverride: n, type: r } = {}
        ) {
          let {
            transition: s = e.getDefaultTransition(),
            transitionEnd: o,
            ...a
          } = t;
          n && (s = n);
          let l = [],
            u = r && e.animationState && e.animationState.getState()[r];
          for (let t in a) {
            let n = e.getValue(t, e.latestValues[t] ?? null),
              r = a[t];
            if (
              void 0 === r ||
              (u &&
                (function ({ protectedKeys: e, needsAnimating: t }, i) {
                  let n = e.hasOwnProperty(i) && !0 !== t[i];
                  return (t[i] = !1), n;
                })(u, t))
            )
              continue;
            let o = { delay: i, ...tc(s || {}, t) },
              h = n.get();
            if (
              void 0 !== h &&
              !n.isAnimating &&
              !Array.isArray(r) &&
              r === h &&
              !o.velocity
            )
              continue;
            let c = !1;
            if (window.MotionHandoffAnimation) {
              let i = e.props[tb];
              if (i) {
                let e = window.MotionHandoffAnimation(i, t, P);
                null !== e && ((o.startTime = e), (c = !0));
              }
            }
            tv(e, t),
              n.start(
                iB(
                  t,
                  n,
                  r,
                  e.shouldReduceMotion && tf.has(t) ? { type: !1 } : o,
                  e,
                  c
                )
              );
            let d = n.animation;
            d && l.push(d);
          }
          return (
            o &&
              Promise.all(l).then(() => {
                P.update(() => {
                  o && tg(e, o);
                });
              }),
            l
          );
        }
        function iz(e, t, i = {}) {
          let n = th(
              e,
              t,
              'exit' === i.type ? e.presenceContext?.custom : void 0
            ),
            { transition: r = e.getDefaultTransition() || {} } = n || {};
          i.transitionOverride && (r = i.transitionOverride);
          let s = n ? () => Promise.all(i$(e, n, i)) : () => Promise.resolve(),
            o =
              e.variantChildren && e.variantChildren.size
                ? (n = 0) => {
                    let {
                      delayChildren: s = 0,
                      staggerChildren: o,
                      staggerDirection: a,
                    } = r;
                    return (function (e, t, i = 0, n = 0, r = 1, s) {
                      let o = [],
                        a = (e.variantChildren.size - 1) * n,
                        l = 1 === r ? (e = 0) => e * n : (e = 0) => a - e * n;
                      return (
                        Array.from(e.variantChildren)
                          .sort(iW)
                          .forEach((e, n) => {
                            e.notify('AnimationStart', t),
                              o.push(
                                iz(e, t, { ...s, delay: i + l(n) }).then(() =>
                                  e.notify('AnimationComplete', t)
                                )
                              );
                          }),
                        Promise.all(o)
                      );
                    })(e, t, s + n, o, a, i);
                  }
                : () => Promise.resolve(),
            { when: a } = r;
          if (!a) return Promise.all([s(), o(i.delay)]);
          {
            let [e, t] = 'beforeChildren' === a ? [s, o] : [o, s];
            return e().then(() => t());
          }
        }
        function iW(e, t) {
          return e.sortNodePosition(t);
        }
        function iX(e, t, i = {}) {
          let n;
          if ((e.notify('AnimationStart', t), Array.isArray(t)))
            n = Promise.all(t.map((t) => iz(e, t, i)));
          else if ('string' == typeof t) n = iz(e, t, i);
          else {
            let r = 'function' == typeof t ? th(e, t, i.custom) : t;
            n = Promise.all(i$(e, r, i));
          }
          return n.then(() => {
            e.notify('AnimationComplete', t);
          });
        }
        function iH(e, t) {
          if (!Array.isArray(t)) return !1;
          let i = t.length;
          if (i !== e.length) return !1;
          for (let n = 0; n < i; n++) if (t[n] !== e[n]) return !1;
          return !0;
        }
        function iq(e) {
          return 'string' == typeof e || Array.isArray(e);
        }
        let iY = [
            'animate',
            'whileInView',
            'whileFocus',
            'whileHover',
            'whileTap',
            'whileDrag',
            'exit',
          ],
          iG = ['initial', ...iY],
          iK = iG.length,
          iZ = [...iY].reverse(),
          iQ = iY.length;
        function iJ(e = !1) {
          return {
            isActive: e,
            protectedKeys: {},
            needsAnimating: {},
            prevResolvedValues: {},
          };
        }
        function i0() {
          return {
            animate: iJ(!0),
            whileInView: iJ(),
            whileHover: iJ(),
            whileTap: iJ(),
            whileDrag: iJ(),
            whileFocus: iJ(),
            exit: iJ(),
          };
        }
        class i1 {
          constructor(e) {
            (this.isMounted = !1), (this.node = e);
          }
          update() {}
        }
        class i2 extends i1 {
          constructor(e) {
            super(e),
              e.animationState ||
                (e.animationState = (function (e) {
                  let t = (t) =>
                      Promise.all(
                        t.map(({ animation: t, options: i }) => iX(e, t, i))
                      ),
                    i = i0(),
                    n = !0,
                    r = (t) => (i, n) => {
                      let r = th(
                        e,
                        n,
                        'exit' === t ? e.presenceContext?.custom : void 0
                      );
                      if (r) {
                        let { transition: e, transitionEnd: t, ...n } = r;
                        i = { ...i, ...n, ...t };
                      }
                      return i;
                    };
                  function s(s) {
                    let { props: o } = e,
                      a =
                        (function e(t) {
                          if (!t) return;
                          if (!t.isControllingVariants) {
                            let i = (t.parent && e(t.parent)) || {};
                            return (
                              void 0 !== t.props.initial &&
                                (i.initial = t.props.initial),
                              i
                            );
                          }
                          let i = {};
                          for (let e = 0; e < iK; e++) {
                            let n = iG[e],
                              r = t.props[n];
                            (iq(r) || !1 === r) && (i[n] = r);
                          }
                          return i;
                        })(e.parent) || {},
                      l = [],
                      u = new Set(),
                      h = {},
                      c = 1 / 0;
                    for (let t = 0; t < iQ; t++) {
                      var d, p;
                      let f = iZ[t],
                        m = i[f],
                        g = void 0 !== o[f] ? o[f] : a[f],
                        y = iq(g),
                        v = f === s ? m.isActive : null;
                      !1 === v && (c = t);
                      let x = g === a[f] && g !== o[f] && y;
                      if (
                        (x && n && e.manuallyAnimateOnMount && (x = !1),
                        (m.protectedKeys = { ...h }),
                        (!m.isActive && null === v) ||
                          (!g && !m.prevProp) ||
                          ta(g) ||
                          'boolean' == typeof g)
                      )
                        continue;
                      let b =
                          ((d = m.prevProp),
                          'string' == typeof (p = g)
                            ? p !== d
                            : !!Array.isArray(p) && !iH(p, d)),
                        P =
                          b ||
                          (f === s && m.isActive && !x && y) ||
                          (t > c && y),
                        w = !1,
                        E = Array.isArray(g) ? g : [g],
                        T = E.reduce(r(f), {});
                      !1 === v && (T = {});
                      let { prevResolvedValues: S = {} } = m,
                        A = { ...S, ...T },
                        R = (t) => {
                          (P = !0),
                            u.has(t) && ((w = !0), u.delete(t)),
                            (m.needsAnimating[t] = !0);
                          let i = e.getValue(t);
                          i && (i.liveStyle = !1);
                        };
                      for (let e in A) {
                        let t = T[e],
                          i = S[e];
                        if (h.hasOwnProperty(e)) continue;
                        let n = !1;
                        (tm(t) && tm(i) ? iH(t, i) : t === i)
                          ? void 0 !== t && u.has(e)
                            ? R(e)
                            : (m.protectedKeys[e] = !0)
                          : null != t
                          ? R(e)
                          : u.add(e);
                      }
                      (m.prevProp = g),
                        (m.prevResolvedValues = T),
                        m.isActive && (h = { ...h, ...T }),
                        n && e.blockInitialAnimation && (P = !1);
                      let M = !(x && b) || w;
                      P &&
                        M &&
                        l.push(
                          ...E.map((e) => ({
                            animation: e,
                            options: { type: f },
                          }))
                        );
                    }
                    if (u.size) {
                      let t = {};
                      if ('boolean' != typeof o.initial) {
                        let i = th(
                          e,
                          Array.isArray(o.initial) ? o.initial[0] : o.initial
                        );
                        i && i.transition && (t.transition = i.transition);
                      }
                      u.forEach((i) => {
                        let n = e.getBaseTarget(i),
                          r = e.getValue(i);
                        r && (r.liveStyle = !0), (t[i] = n ?? null);
                      }),
                        l.push({ animation: t });
                    }
                    let f = !!l.length;
                    return (
                      n &&
                        (!1 === o.initial || o.initial === o.animate) &&
                        !e.manuallyAnimateOnMount &&
                        (f = !1),
                      (n = !1),
                      f ? t(l) : Promise.resolve()
                    );
                  }
                  return {
                    animateChanges: s,
                    setActive: function (t, n) {
                      if (i[t].isActive === n) return Promise.resolve();
                      e.variantChildren?.forEach((e) =>
                        e.animationState?.setActive(t, n)
                      ),
                        (i[t].isActive = n);
                      let r = s(t);
                      for (let e in i) i[e].protectedKeys = {};
                      return r;
                    },
                    setAnimateFunction: function (i) {
                      t = i(e);
                    },
                    getState: () => i,
                    reset: () => {
                      (i = i0()), (n = !0);
                    },
                  };
                })(e));
          }
          updateAnimationControlsSubscription() {
            let { animate: e } = this.node.getProps();
            ta(e) && (this.unmountControls = e.subscribe(this.node));
          }
          mount() {
            this.updateAnimationControlsSubscription();
          }
          update() {
            let { animate: e } = this.node.getProps(),
              { animate: t } = this.node.prevProps || {};
            e !== t && this.updateAnimationControlsSubscription();
          }
          unmount() {
            this.node.animationState.reset(), this.unmountControls?.();
          }
        }
        let i3 = 0;
        class i5 extends i1 {
          constructor() {
            super(...arguments), (this.id = i3++);
          }
          update() {
            if (!this.node.presenceContext) return;
            let { isPresent: e, onExitComplete: t } = this.node.presenceContext,
              { isPresent: i } = this.node.prevPresenceContext || {};
            if (!this.node.animationState || e === i) return;
            let n = this.node.animationState.setActive('exit', !e);
            t &&
              !e &&
              n.then(() => {
                t(this.id);
              });
          }
          mount() {
            let { register: e, onExitComplete: t } =
              this.node.presenceContext || {};
            t && t(this.id), e && (this.unmount = e(this.id));
          }
          unmount() {}
        }
        let i4 = { x: !1, y: !1 };
        function i9(e, t, i, n = { passive: !0 }) {
          return e.addEventListener(t, i, n), () => e.removeEventListener(t, i);
        }
        let i6 = (e) =>
          'mouse' === e.pointerType
            ? 'number' != typeof e.button || e.button <= 0
            : !1 !== e.isPrimary;
        function i8(e) {
          return { point: { x: e.pageX, y: e.pageY } };
        }
        let i7 = (e) => (t) => i6(t) && e(t, i8(t));
        function ne(e, t, i, n) {
          return i9(e, t, i7(i), n);
        }
        function nt({ top: e, left: t, right: i, bottom: n }) {
          return { x: { min: t, max: i }, y: { min: e, max: n } };
        }
        function ni(e) {
          return e.max - e.min;
        }
        function nn(e, t, i, n = 0.5) {
          (e.origin = n),
            (e.originPoint = eD(t.min, t.max, e.origin)),
            (e.scale = ni(i) / ni(t)),
            (e.translate = eD(i.min, i.max, e.origin) - e.originPoint),
            ((e.scale >= 0.9999 && e.scale <= 1.0001) || isNaN(e.scale)) &&
              (e.scale = 1),
            ((e.translate >= -0.01 && e.translate <= 0.01) ||
              isNaN(e.translate)) &&
              (e.translate = 0);
        }
        function nr(e, t, i, n) {
          nn(e.x, t.x, i.x, n ? n.originX : void 0),
            nn(e.y, t.y, i.y, n ? n.originY : void 0);
        }
        function ns(e, t, i) {
          (e.min = i.min + t.min), (e.max = e.min + ni(t));
        }
        function no(e, t, i) {
          (e.min = t.min - i.min), (e.max = e.min + ni(t));
        }
        function na(e, t, i) {
          no(e.x, t.x, i.x), no(e.y, t.y, i.y);
        }
        let nl = () => ({ translate: 0, scale: 1, origin: 0, originPoint: 0 }),
          nu = () => ({ x: nl(), y: nl() }),
          nh = () => ({ min: 0, max: 0 }),
          nc = () => ({ x: nh(), y: nh() });
        function nd(e) {
          return [e('x'), e('y')];
        }
        function np(e) {
          return void 0 === e || 1 === e;
        }
        function nf({ scale: e, scaleX: t, scaleY: i }) {
          return !np(e) || !np(t) || !np(i);
        }
        function nm(e) {
          return (
            nf(e) ||
            ng(e) ||
            e.z ||
            e.rotate ||
            e.rotateX ||
            e.rotateY ||
            e.skewX ||
            e.skewY
          );
        }
        function ng(e) {
          var t, i;
          return ((t = e.x) && '0%' !== t) || ((i = e.y) && '0%' !== i);
        }
        function ny(e, t, i, n, r) {
          return void 0 !== r && (e = n + r * (e - n)), n + i * (e - n) + t;
        }
        function nv(e, t = 0, i = 1, n, r) {
          (e.min = ny(e.min, t, i, n, r)), (e.max = ny(e.max, t, i, n, r));
        }
        function nx(e, { x: t, y: i }) {
          nv(e.x, t.translate, t.scale, t.originPoint),
            nv(e.y, i.translate, i.scale, i.originPoint);
        }
        function nb(e, t) {
          (e.min = e.min + t), (e.max = e.max + t);
        }
        function nP(e, t, i, n, r = 0.5) {
          let s = eD(e.min, e.max, r);
          nv(e, t, i, s, n);
        }
        function nw(e, t) {
          nP(e.x, t.x, t.scaleX, t.scale, t.originX),
            nP(e.y, t.y, t.scaleY, t.scale, t.originY);
        }
        function nE(e, t) {
          return nt(
            (function (e, t) {
              if (!t) return e;
              let i = t({ x: e.left, y: e.top }),
                n = t({ x: e.right, y: e.bottom });
              return { top: i.y, left: i.x, bottom: n.y, right: n.x };
            })(e.getBoundingClientRect(), t)
          );
        }
        let nT = ({ current: e }) => (e ? e.ownerDocument.defaultView : null);
        function nS(e) {
          return (
            e &&
            'object' == typeof e &&
            Object.prototype.hasOwnProperty.call(e, 'current')
          );
        }
        let nA = (e, t) => Math.abs(e - t);
        class nR {
          constructor(
            e,
            t,
            {
              transformPagePoint: i,
              contextWindow: n,
              dragSnapToOrigin: r = !1,
            } = {}
          ) {
            if (
              ((this.startEvent = null),
              (this.lastMoveEvent = null),
              (this.lastMoveEventInfo = null),
              (this.handlers = {}),
              (this.contextWindow = window),
              (this.updatePoint = () => {
                if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
                let e = nC(this.lastMoveEventInfo, this.history),
                  t = null !== this.startEvent,
                  i =
                    (function (e, t) {
                      return Math.sqrt(nA(e.x, t.x) ** 2 + nA(e.y, t.y) ** 2);
                    })(e.offset, { x: 0, y: 0 }) >= 3;
                if (!t && !i) return;
                let { point: n } = e,
                  { timestamp: r } = E;
                this.history.push({ ...n, timestamp: r });
                let { onStart: s, onMove: o } = this.handlers;
                t ||
                  (s && s(this.lastMoveEvent, e),
                  (this.startEvent = this.lastMoveEvent)),
                  o && o(this.lastMoveEvent, e);
              }),
              (this.handlePointerMove = (e, t) => {
                (this.lastMoveEvent = e),
                  (this.lastMoveEventInfo = nM(t, this.transformPagePoint)),
                  P.update(this.updatePoint, !0);
              }),
              (this.handlePointerUp = (e, t) => {
                this.end();
                let {
                  onEnd: i,
                  onSessionEnd: n,
                  resumeAnimation: r,
                } = this.handlers;
                if (
                  (this.dragSnapToOrigin && r && r(),
                  !(this.lastMoveEvent && this.lastMoveEventInfo))
                )
                  return;
                let s = nC(
                  'pointercancel' === e.type
                    ? this.lastMoveEventInfo
                    : nM(t, this.transformPagePoint),
                  this.history
                );
                this.startEvent && i && i(e, s), n && n(e, s);
              }),
              !i6(e))
            )
              return;
            (this.dragSnapToOrigin = r),
              (this.handlers = t),
              (this.transformPagePoint = i),
              (this.contextWindow = n || window);
            let s = nM(i8(e), this.transformPagePoint),
              { point: o } = s,
              { timestamp: a } = E;
            this.history = [{ ...o, timestamp: a }];
            let { onSessionStart: l } = t;
            l && l(e, nC(s, this.history)),
              (this.removeListeners = G(
                ne(this.contextWindow, 'pointermove', this.handlePointerMove),
                ne(this.contextWindow, 'pointerup', this.handlePointerUp),
                ne(this.contextWindow, 'pointercancel', this.handlePointerUp)
              ));
          }
          updateHandlers(e) {
            this.handlers = e;
          }
          end() {
            this.removeListeners && this.removeListeners(), w(this.updatePoint);
          }
        }
        function nM(e, t) {
          return t ? { point: t(e.point) } : e;
        }
        function nj(e, t) {
          return { x: e.x - t.x, y: e.y - t.y };
        }
        function nC({ point: e }, t) {
          return {
            point: e,
            delta: nj(e, n_(t)),
            offset: nj(e, t[0]),
            velocity: (function (e, t) {
              if (e.length < 2) return { x: 0, y: 0 };
              let i = e.length - 1,
                n = null,
                r = n_(e);
              for (
                ;
                i >= 0 && ((n = e[i]), !(r.timestamp - n.timestamp > tP(0.1)));

              )
                i--;
              if (!n) return { x: 0, y: 0 };
              let s = tw(r.timestamp - n.timestamp);
              if (0 === s) return { x: 0, y: 0 };
              let o = { x: (r.x - n.x) / s, y: (r.y - n.y) / s };
              return o.x === 1 / 0 && (o.x = 0), o.y === 1 / 0 && (o.y = 0), o;
            })(t, 0.1),
          };
        }
        function n_(e) {
          return e[e.length - 1];
        }
        function nO(e, t, i) {
          return {
            min: void 0 !== t ? e.min + t : void 0,
            max: void 0 !== i ? e.max + i - (e.max - e.min) : void 0,
          };
        }
        function nk(e, t) {
          let i = t.min - e.min,
            n = t.max - e.max;
          return (
            t.max - t.min < e.max - e.min && ([i, n] = [n, i]),
            { min: i, max: n }
          );
        }
        function nD(e, t, i) {
          return { min: nV(e, t), max: nV(e, i) };
        }
        function nV(e, t) {
          return 'number' == typeof e ? e : e[t] || 0;
        }
        let nL = new WeakMap();
        class nI {
          constructor(e) {
            (this.openDragLock = null),
              (this.isDragging = !1),
              (this.currentDirection = null),
              (this.originPoint = { x: 0, y: 0 }),
              (this.constraints = !1),
              (this.hasMutatedConstraints = !1),
              (this.elastic = nc()),
              (this.visualElement = e);
          }
          start(e, { snapToCursor: t = !1 } = {}) {
            let { presenceContext: i } = this.visualElement;
            if (i && !1 === i.isPresent) return;
            let { dragSnapToOrigin: n } = this.getProps();
            this.panSession = new nR(
              e,
              {
                onSessionStart: (e) => {
                  let { dragSnapToOrigin: i } = this.getProps();
                  i ? this.pauseAnimation() : this.stopAnimation(),
                    t && this.snapToCursor(i8(e).point);
                },
                onStart: (e, t) => {
                  let {
                    drag: i,
                    dragPropagation: n,
                    onDragStart: r,
                  } = this.getProps();
                  if (
                    i &&
                    !n &&
                    (this.openDragLock && this.openDragLock(),
                    (this.openDragLock = (function (e) {
                      if ('x' === e || 'y' === e)
                        if (i4[e]) return null;
                        else
                          return (
                            (i4[e] = !0),
                            () => {
                              i4[e] = !1;
                            }
                          );
                      return i4.x || i4.y
                        ? null
                        : ((i4.x = i4.y = !0),
                          () => {
                            i4.x = i4.y = !1;
                          });
                    })(i)),
                    !this.openDragLock)
                  )
                    return;
                  (this.isDragging = !0),
                    (this.currentDirection = null),
                    this.resolveConstraints(),
                    this.visualElement.projection &&
                      ((this.visualElement.projection.isAnimationBlocked = !0),
                      (this.visualElement.projection.target = void 0)),
                    nd((e) => {
                      let t = this.getAxisMotionValue(e).get() || 0;
                      if (eg.test(t)) {
                        let { projection: i } = this.visualElement;
                        if (i && i.layout) {
                          let n = i.layout.layoutBox[e];
                          n && (t = ni(n) * (parseFloat(t) / 100));
                        }
                      }
                      this.originPoint[e] = t;
                    }),
                    r && P.postRender(() => r(e, t)),
                    tv(this.visualElement, 'transform');
                  let { animationState: s } = this.visualElement;
                  s && s.setActive('whileDrag', !0);
                },
                onMove: (e, t) => {
                  let {
                    dragPropagation: i,
                    dragDirectionLock: n,
                    onDirectionLock: r,
                    onDrag: s,
                  } = this.getProps();
                  if (!i && !this.openDragLock) return;
                  let { offset: o } = t;
                  if (n && null === this.currentDirection) {
                    (this.currentDirection = (function (e, t = 10) {
                      let i = null;
                      return (
                        Math.abs(e.y) > t
                          ? (i = 'y')
                          : Math.abs(e.x) > t && (i = 'x'),
                        i
                      );
                    })(o)),
                      null !== this.currentDirection &&
                        r &&
                        r(this.currentDirection);
                    return;
                  }
                  this.updateAxis('x', t.point, o),
                    this.updateAxis('y', t.point, o),
                    this.visualElement.render(),
                    s && s(e, t);
                },
                onSessionEnd: (e, t) => this.stop(e, t),
                resumeAnimation: () =>
                  nd(
                    (e) =>
                      'paused' === this.getAnimationState(e) &&
                      this.getAxisMotionValue(e).animation?.play()
                  ),
              },
              {
                transformPagePoint: this.visualElement.getTransformPagePoint(),
                dragSnapToOrigin: n,
                contextWindow: nT(this.visualElement),
              }
            );
          }
          stop(e, t) {
            let i = this.isDragging;
            if ((this.cancel(), !i)) return;
            let { velocity: n } = t;
            this.startAnimation(n);
            let { onDragEnd: r } = this.getProps();
            r && P.postRender(() => r(e, t));
          }
          cancel() {
            this.isDragging = !1;
            let { projection: e, animationState: t } = this.visualElement;
            e && (e.isAnimationBlocked = !1),
              this.panSession && this.panSession.end(),
              (this.panSession = void 0);
            let { dragPropagation: i } = this.getProps();
            !i &&
              this.openDragLock &&
              (this.openDragLock(), (this.openDragLock = null)),
              t && t.setActive('whileDrag', !1);
          }
          updateAxis(e, t, i) {
            let { drag: n } = this.getProps();
            if (!i || !nN(e, n, this.currentDirection)) return;
            let r = this.getAxisMotionValue(e),
              s = this.originPoint[e] + i[e];
            this.constraints &&
              this.constraints[e] &&
              (s = (function (e, { min: t, max: i }, n) {
                return (
                  void 0 !== t && e < t
                    ? (e = n ? eD(t, e, n.min) : Math.max(e, t))
                    : void 0 !== i &&
                      e > i &&
                      (e = n ? eD(i, e, n.max) : Math.min(e, i)),
                  e
                );
              })(s, this.constraints[e], this.elastic[e])),
              r.set(s);
          }
          resolveConstraints() {
            let { dragConstraints: e, dragElastic: t } = this.getProps(),
              i =
                this.visualElement.projection &&
                !this.visualElement.projection.layout
                  ? this.visualElement.projection.measure(!1)
                  : this.visualElement.projection?.layout,
              n = this.constraints;
            e && nS(e)
              ? this.constraints ||
                (this.constraints = this.resolveRefConstraints())
              : e && i
              ? (this.constraints = (function (
                  e,
                  { top: t, left: i, bottom: n, right: r }
                ) {
                  return { x: nO(e.x, i, r), y: nO(e.y, t, n) };
                })(i.layoutBox, e))
              : (this.constraints = !1),
              (this.elastic = (function (e = 0.35) {
                return (
                  !1 === e ? (e = 0) : !0 === e && (e = 0.35),
                  { x: nD(e, 'left', 'right'), y: nD(e, 'top', 'bottom') }
                );
              })(t)),
              n !== this.constraints &&
                i &&
                this.constraints &&
                !this.hasMutatedConstraints &&
                nd((e) => {
                  !1 !== this.constraints &&
                    this.getAxisMotionValue(e) &&
                    (this.constraints[e] = (function (e, t) {
                      let i = {};
                      return (
                        void 0 !== t.min && (i.min = t.min - e.min),
                        void 0 !== t.max && (i.max = t.max - e.min),
                        i
                      );
                    })(i.layoutBox[e], this.constraints[e]));
                });
          }
          resolveRefConstraints() {
            var e;
            let { dragConstraints: t, onMeasureDragConstraints: i } =
              this.getProps();
            if (!t || !nS(t)) return !1;
            let n = t.current;
            O(
              null !== n,
              "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop."
            );
            let { projection: r } = this.visualElement;
            if (!r || !r.layout) return !1;
            let s = (function (e, t, i) {
                let n = nE(e, i),
                  { scroll: r } = t;
                return r && (nb(n.x, r.offset.x), nb(n.y, r.offset.y)), n;
              })(n, r.root, this.visualElement.getTransformPagePoint()),
              o =
                ((e = r.layout.layoutBox),
                { x: nk(e.x, s.x), y: nk(e.y, s.y) });
            if (i) {
              let e = i(
                (function ({ x: e, y: t }) {
                  return {
                    top: t.min,
                    right: e.max,
                    bottom: t.max,
                    left: e.min,
                  };
                })(o)
              );
              (this.hasMutatedConstraints = !!e), e && (o = nt(e));
            }
            return o;
          }
          startAnimation(e) {
            let {
                drag: t,
                dragMomentum: i,
                dragElastic: n,
                dragTransition: r,
                dragSnapToOrigin: s,
                onDragTransitionEnd: o,
              } = this.getProps(),
              a = this.constraints || {};
            return Promise.all(
              nd((o) => {
                if (!nN(o, t, this.currentDirection)) return;
                let l = (a && a[o]) || {};
                s && (l = { min: 0, max: 0 });
                let u = {
                  type: 'inertia',
                  velocity: i ? e[o] : 0,
                  bounceStiffness: n ? 200 : 1e6,
                  bounceDamping: n ? 40 : 1e7,
                  timeConstant: 750,
                  restDelta: 1,
                  restSpeed: 10,
                  ...r,
                  ...l,
                };
                return this.startAxisValueAnimation(o, u);
              })
            ).then(o);
          }
          startAxisValueAnimation(e, t) {
            let i = this.getAxisMotionValue(e);
            return (
              tv(this.visualElement, e),
              i.start(iB(e, i, 0, t, this.visualElement, !1))
            );
          }
          stopAnimation() {
            nd((e) => this.getAxisMotionValue(e).stop());
          }
          pauseAnimation() {
            nd((e) => this.getAxisMotionValue(e).animation?.pause());
          }
          getAnimationState(e) {
            return this.getAxisMotionValue(e).animation?.state;
          }
          getAxisMotionValue(e) {
            let t = `_drag${e.toUpperCase()}`,
              i = this.visualElement.getProps();
            return (
              i[t] ||
              this.visualElement.getValue(
                e,
                (i.initial ? i.initial[e] : void 0) || 0
              )
            );
          }
          snapToCursor(e) {
            nd((t) => {
              let { drag: i } = this.getProps();
              if (!nN(t, i, this.currentDirection)) return;
              let { projection: n } = this.visualElement,
                r = this.getAxisMotionValue(t);
              if (n && n.layout) {
                let { min: i, max: s } = n.layout.layoutBox[t];
                r.set(e[t] - eD(i, s, 0.5));
              }
            });
          }
          scalePositionWithinConstraints() {
            if (!this.visualElement.current) return;
            let { drag: e, dragConstraints: t } = this.getProps(),
              { projection: i } = this.visualElement;
            if (!nS(t) || !i || !this.constraints) return;
            this.stopAnimation();
            let n = { x: 0, y: 0 };
            nd((e) => {
              let t = this.getAxisMotionValue(e);
              if (t && !1 !== this.constraints) {
                let i = t.get();
                n[e] = (function (e, t) {
                  let i = 0.5,
                    n = ni(e),
                    r = ni(t);
                  return (
                    r > n
                      ? (i = z(t.min, t.max - n, e.min))
                      : n > r && (i = z(e.min, e.max - r, t.min)),
                    K(0, 1, i)
                  );
                })({ min: i, max: i }, this.constraints[e]);
              }
            });
            let { transformTemplate: r } = this.visualElement.getProps();
            (this.visualElement.current.style.transform = r
              ? r({}, '')
              : 'none'),
              i.root && i.root.updateScroll(),
              i.updateLayout(),
              this.resolveConstraints(),
              nd((t) => {
                if (!nN(t, e, null)) return;
                let i = this.getAxisMotionValue(t),
                  { min: r, max: s } = this.constraints[t];
                i.set(eD(r, s, n[t]));
              });
          }
          addListeners() {
            if (!this.visualElement.current) return;
            nL.set(this.visualElement, this);
            let e = ne(this.visualElement.current, 'pointerdown', (e) => {
                let { drag: t, dragListener: i = !0 } = this.getProps();
                t && i && this.start(e);
              }),
              t = () => {
                let { dragConstraints: e } = this.getProps();
                nS(e) &&
                  e.current &&
                  (this.constraints = this.resolveRefConstraints());
              },
              { projection: i } = this.visualElement,
              n = i.addEventListener('measure', t);
            i &&
              !i.layout &&
              (i.root && i.root.updateScroll(), i.updateLayout()),
              P.read(t);
            let r = i9(window, 'resize', () =>
                this.scalePositionWithinConstraints()
              ),
              s = i.addEventListener(
                'didUpdate',
                ({ delta: e, hasLayoutChanged: t }) => {
                  this.isDragging &&
                    t &&
                    (nd((t) => {
                      let i = this.getAxisMotionValue(t);
                      i &&
                        ((this.originPoint[t] += e[t].translate),
                        i.set(i.get() + e[t].translate));
                    }),
                    this.visualElement.render());
                }
              );
            return () => {
              r(), e(), n(), s && s();
            };
          }
          getProps() {
            let e = this.visualElement.getProps(),
              {
                drag: t = !1,
                dragDirectionLock: i = !1,
                dragPropagation: n = !1,
                dragConstraints: r = !1,
                dragElastic: s = 0.35,
                dragMomentum: o = !0,
              } = e;
            return {
              ...e,
              drag: t,
              dragDirectionLock: i,
              dragPropagation: n,
              dragConstraints: r,
              dragElastic: s,
              dragMomentum: o,
            };
          }
        }
        function nN(e, t, i) {
          return (!0 === t || t === e) && (null === i || i === e);
        }
        class nF extends i1 {
          constructor(e) {
            super(e),
              (this.removeGroupControls = y),
              (this.removeListeners = y),
              (this.controls = new nI(e));
          }
          mount() {
            let { dragControls: e } = this.node.getProps();
            e && (this.removeGroupControls = e.subscribe(this.controls)),
              (this.removeListeners = this.controls.addListeners() || y);
          }
          unmount() {
            this.removeGroupControls(), this.removeListeners();
          }
        }
        let nU = (e) => (t, i) => {
          e && P.postRender(() => e(t, i));
        };
        class nB extends i1 {
          constructor() {
            super(...arguments), (this.removePointerDownListener = y);
          }
          onPointerDown(e) {
            this.session = new nR(e, this.createPanHandlers(), {
              transformPagePoint: this.node.getTransformPagePoint(),
              contextWindow: nT(this.node),
            });
          }
          createPanHandlers() {
            let {
              onPanSessionStart: e,
              onPanStart: t,
              onPan: i,
              onPanEnd: n,
            } = this.node.getProps();
            return {
              onSessionStart: nU(e),
              onStart: nU(t),
              onMove: i,
              onEnd: (e, t) => {
                delete this.session, n && P.postRender(() => n(e, t));
              },
            };
          }
          mount() {
            this.removePointerDownListener = ne(
              this.node.current,
              'pointerdown',
              (e) => this.onPointerDown(e)
            );
          }
          update() {
            this.session &&
              this.session.updateHandlers(this.createPanHandlers());
          }
          unmount() {
            this.removePointerDownListener(),
              this.session && this.session.end();
          }
        }
        let { schedule: n$ } = b(queueMicrotask, !1),
          nz = (0, c.createContext)(null),
          nW = (0, c.createContext)({}),
          nX = (0, c.createContext)({}),
          nH = { hasAnimatedSinceResize: !0, hasEverUpdated: !1 };
        function nq(e, t) {
          return t.max === t.min ? 0 : (e / (t.max - t.min)) * 100;
        }
        let nY = {
            correct: (e, t) => {
              if (!t.target) return e;
              if ('string' == typeof e)
                if (!ey.test(e)) return e;
                else e = parseFloat(e);
              let i = nq(e, t.target.x),
                n = nq(e, t.target.y);
              return `${i}% ${n}%`;
            },
          },
          nG = {};
        class nK extends c.Component {
          componentDidMount() {
            let {
                visualElement: e,
                layoutGroup: t,
                switchLayoutGroup: i,
                layoutId: n,
              } = this.props,
              { projection: r } = e;
            for (let e in nQ)
              (nG[e] = nQ[e]), Q(e) && (nG[e].isCSSVariable = !0);
            r &&
              (t.group && t.group.add(r),
              i && i.register && n && i.register(r),
              r.root.didUpdate(),
              r.addEventListener('animationComplete', () => {
                this.safeToRemove();
              }),
              r.setOptions({
                ...r.options,
                onExitComplete: () => this.safeToRemove(),
              })),
              (nH.hasEverUpdated = !0);
          }
          getSnapshotBeforeUpdate(e) {
            let {
                layoutDependency: t,
                visualElement: i,
                drag: n,
                isPresent: r,
              } = this.props,
              { projection: s } = i;
            return (
              s &&
                ((s.isPresent = r),
                n ||
                e.layoutDependency !== t ||
                void 0 === t ||
                e.isPresent !== r
                  ? s.willUpdate()
                  : this.safeToRemove(),
                e.isPresent !== r &&
                  (r
                    ? s.promote()
                    : s.relegate() ||
                      P.postRender(() => {
                        let e = s.getStack();
                        (e && e.members.length) || this.safeToRemove();
                      }))),
              null
            );
          }
          componentDidUpdate() {
            let { projection: e } = this.props.visualElement;
            e &&
              (e.root.didUpdate(),
              n$.postRender(() => {
                !e.currentAnimation && e.isLead() && this.safeToRemove();
              }));
          }
          componentWillUnmount() {
            let {
                visualElement: e,
                layoutGroup: t,
                switchLayoutGroup: i,
              } = this.props,
              { projection: n } = e;
            n &&
              (n.scheduleCheckAfterUnmount(),
              t && t.group && t.group.remove(n),
              i && i.deregister && i.deregister(n));
          }
          safeToRemove() {
            let { safeToRemove: e } = this.props;
            e && e();
          }
          render() {
            return null;
          }
        }
        function nZ(e) {
          let [t, i] = (function (e = !0) {
              let t = (0, c.useContext)(nz);
              if (null === t) return [!0, null];
              let { isPresent: i, onExitComplete: n, register: r } = t,
                s = (0, c.useId)();
              (0, c.useEffect)(() => {
                if (e) return r(s);
              }, [e]);
              let o = (0, c.useCallback)(() => e && n && n(s), [s, n, e]);
              return !i && n ? [!1, o] : [!0];
            })(),
            n = (0, c.useContext)(nW);
          return (0, l.jsx)(nK, {
            ...e,
            layoutGroup: n,
            switchLayoutGroup: (0, c.useContext)(nX),
            isPresent: t,
            safeToRemove: i,
          });
        }
        let nQ = {
            borderRadius: {
              ...nY,
              applyTo: [
                'borderTopLeftRadius',
                'borderTopRightRadius',
                'borderBottomLeftRadius',
                'borderBottomRightRadius',
              ],
            },
            borderTopLeftRadius: nY,
            borderTopRightRadius: nY,
            borderBottomLeftRadius: nY,
            borderBottomRightRadius: nY,
            boxShadow: {
              correct: (e, { treeScale: t, projectionDelta: i }) => {
                let n = e_.parse(e);
                if (n.length > 5) return e;
                let r = e_.createTransformer(e),
                  s = +('number' != typeof n[0]),
                  o = i.x.scale * t.x,
                  a = i.y.scale * t.y;
                (n[0 + s] /= o), (n[1 + s] /= a);
                let l = eD(o, a, 0.5);
                return (
                  'number' == typeof n[2 + s] && (n[2 + s] /= l),
                  'number' == typeof n[3 + s] && (n[3 + s] /= l),
                  r(n)
                );
              },
            },
          },
          nJ = (e, t) => e.depth - t.depth;
        class n0 {
          constructor() {
            (this.children = []), (this.isDirty = !1);
          }
          add(e) {
            d(this.children, e), (this.isDirty = !0);
          }
          remove(e) {
            p(this.children, e), (this.isDirty = !0);
          }
          forEach(e) {
            this.isDirty && this.children.sort(nJ),
              (this.isDirty = !1),
              this.children.forEach(e);
          }
        }
        function n1(e) {
          return ty(e) ? e.get() : e;
        }
        let n2 = ['TopLeft', 'TopRight', 'BottomLeft', 'BottomRight'],
          n3 = n2.length,
          n5 = (e) => ('string' == typeof e ? parseFloat(e) : e),
          n4 = (e) => 'number' == typeof e || ey.test(e);
        function n9(e, t) {
          return void 0 !== e[t] ? e[t] : e.borderRadius;
        }
        let n6 = n7(0, 0.5, tY),
          n8 = n7(0.5, 0.95, y);
        function n7(e, t, i) {
          return (n) => (n < e ? 0 : n > t ? 1 : i(z(e, t, n)));
        }
        function re(e, t) {
          (e.min = t.min), (e.max = t.max);
        }
        function rt(e, t) {
          re(e.x, t.x), re(e.y, t.y);
        }
        function ri(e, t) {
          (e.translate = t.translate),
            (e.scale = t.scale),
            (e.originPoint = t.originPoint),
            (e.origin = t.origin);
        }
        function rn(e, t, i, n, r) {
          return (
            (e -= t),
            (e = n + (1 / i) * (e - n)),
            void 0 !== r && (e = n + (1 / r) * (e - n)),
            e
          );
        }
        function rr(e, t, [i, n, r], s, o) {
          !(function (e, t = 0, i = 1, n = 0.5, r, s = e, o = e) {
            if (
              (eg.test(t) &&
                ((t = parseFloat(t)), (t = eD(o.min, o.max, t / 100) - o.min)),
              'number' != typeof t)
            )
              return;
            let a = eD(s.min, s.max, n);
            e === s && (a -= t),
              (e.min = rn(e.min, t, i, a, r)),
              (e.max = rn(e.max, t, i, a, r));
          })(e, t[i], t[n], t[r], t.scale, s, o);
        }
        let rs = ['x', 'scaleX', 'originX'],
          ro = ['y', 'scaleY', 'originY'];
        function ra(e, t, i, n) {
          rr(e.x, t, rs, i ? i.x : void 0, n ? n.x : void 0),
            rr(e.y, t, ro, i ? i.y : void 0, n ? n.y : void 0);
        }
        function rl(e) {
          return 0 === e.translate && 1 === e.scale;
        }
        function ru(e) {
          return rl(e.x) && rl(e.y);
        }
        function rh(e, t) {
          return e.min === t.min && e.max === t.max;
        }
        function rc(e, t) {
          return (
            Math.round(e.min) === Math.round(t.min) &&
            Math.round(e.max) === Math.round(t.max)
          );
        }
        function rd(e, t) {
          return rc(e.x, t.x) && rc(e.y, t.y);
        }
        function rp(e) {
          return ni(e.x) / ni(e.y);
        }
        function rf(e, t) {
          return (
            e.translate === t.translate &&
            e.scale === t.scale &&
            e.originPoint === t.originPoint
          );
        }
        class rm {
          constructor() {
            this.members = [];
          }
          add(e) {
            d(this.members, e), e.scheduleRender();
          }
          remove(e) {
            if (
              (p(this.members, e),
              e === this.prevLead && (this.prevLead = void 0),
              e === this.lead)
            ) {
              let e = this.members[this.members.length - 1];
              e && this.promote(e);
            }
          }
          relegate(e) {
            let t,
              i = this.members.findIndex((t) => e === t);
            if (0 === i) return !1;
            for (let e = i; e >= 0; e--) {
              let i = this.members[e];
              if (!1 !== i.isPresent) {
                t = i;
                break;
              }
            }
            return !!t && (this.promote(t), !0);
          }
          promote(e, t) {
            let i = this.lead;
            if (
              e !== i &&
              ((this.prevLead = i), (this.lead = e), e.show(), i)
            ) {
              i.instance && i.scheduleRender(),
                e.scheduleRender(),
                (e.resumeFrom = i),
                t && (e.resumeFrom.preserveOpacity = !0),
                i.snapshot &&
                  ((e.snapshot = i.snapshot),
                  (e.snapshot.latestValues =
                    i.animationValues || i.latestValues)),
                e.root && e.root.isUpdating && (e.isLayoutDirty = !0);
              let { crossfade: n } = e.options;
              !1 === n && i.hide();
            }
          }
          exitAnimationComplete() {
            this.members.forEach((e) => {
              let { options: t, resumingFrom: i } = e;
              t.onExitComplete && t.onExitComplete(),
                i && i.options.onExitComplete && i.options.onExitComplete();
            });
          }
          scheduleRender() {
            this.members.forEach((e) => {
              e.instance && e.scheduleRender(!1);
            });
          }
          removeLeadSnapshot() {
            this.lead && this.lead.snapshot && (this.lead.snapshot = void 0);
          }
        }
        let rg = {
            nodes: 0,
            calculatedTargetDeltas: 0,
            calculatedProjections: 0,
          },
          ry = ['', 'X', 'Y', 'Z'],
          rv = { visibility: 'hidden' },
          rx = 0;
        function rb(e, t, i, n) {
          let { latestValues: r } = t;
          r[e] && ((i[e] = r[e]), t.setStaticValue(e, 0), n && (n[e] = 0));
        }
        function rP({
          attachResizeListener: e,
          defaultParent: t,
          measureScroll: i,
          checkIsScrollRoot: n,
          resetTransform: r,
        }) {
          return class {
            constructor(e = {}, i = t?.()) {
              (this.id = rx++),
                (this.animationId = 0),
                (this.children = new Set()),
                (this.options = {}),
                (this.isTreeAnimating = !1),
                (this.isAnimationBlocked = !1),
                (this.isLayoutDirty = !1),
                (this.isProjectionDirty = !1),
                (this.isSharedProjectionDirty = !1),
                (this.isTransformDirty = !1),
                (this.updateManuallyBlocked = !1),
                (this.updateBlockedByResize = !1),
                (this.isUpdating = !1),
                (this.isSVG = !1),
                (this.needsReset = !1),
                (this.shouldResetTransform = !1),
                (this.hasCheckedOptimisedAppear = !1),
                (this.treeScale = { x: 1, y: 1 }),
                (this.eventHandlers = new Map()),
                (this.hasTreeAnimated = !1),
                (this.updateScheduled = !1),
                (this.scheduleUpdate = () => this.update()),
                (this.projectionUpdateScheduled = !1),
                (this.checkUpdateFailed = () => {
                  this.isUpdating &&
                    ((this.isUpdating = !1), this.clearAllSnapshots());
                }),
                (this.updateProjection = () => {
                  (this.projectionUpdateScheduled = !1),
                    x.value &&
                      (rg.nodes =
                        rg.calculatedTargetDeltas =
                        rg.calculatedProjections =
                          0),
                    this.nodes.forEach(rT),
                    this.nodes.forEach(r_),
                    this.nodes.forEach(rO),
                    this.nodes.forEach(rS),
                    x.addProjectionMetrics && x.addProjectionMetrics(rg);
                }),
                (this.resolvedRelativeTargetAt = 0),
                (this.hasProjected = !1),
                (this.isVisible = !0),
                (this.animationProgress = 0),
                (this.sharedNodes = new Map()),
                (this.latestValues = e),
                (this.root = i ? i.root || i : this),
                (this.path = i ? [...i.path, i] : []),
                (this.parent = i),
                (this.depth = i ? i.depth + 1 : 0);
              for (let e = 0; e < this.path.length; e++)
                this.path[e].shouldResetTransform = !0;
              this.root === this && (this.nodes = new n0());
            }
            addEventListener(e, t) {
              return (
                this.eventHandlers.has(e) || this.eventHandlers.set(e, new f()),
                this.eventHandlers.get(e).add(t)
              );
            }
            notifyListeners(e, ...t) {
              let i = this.eventHandlers.get(e);
              i && i.notify(...t);
            }
            hasListeners(e) {
              return this.eventHandlers.has(e);
            }
            mount(t) {
              if (this.instance) return;
              (this.isSVG = I(t) && !(I(t) && 'svg' === t.tagName)),
                (this.instance = t);
              let { layoutId: i, layout: n, visualElement: r } = this.options;
              if (
                (r && !r.current && r.mount(t),
                this.root.nodes.add(this),
                this.parent && this.parent.children.add(this),
                this.root.hasTreeAnimated &&
                  (n || i) &&
                  (this.isLayoutDirty = !0),
                e)
              ) {
                let i,
                  n = () => (this.root.updateBlockedByResize = !1);
                e(t, () => {
                  (this.root.updateBlockedByResize = !0),
                    i && i(),
                    (i = (function (e, t) {
                      let i = A.now(),
                        n = ({ timestamp: r }) => {
                          let s = r - i;
                          s >= 250 && (w(n), e(s - t));
                        };
                      return P.setup(n, !0), () => w(n);
                    })(n, 250)),
                    nH.hasAnimatedSinceResize &&
                      ((nH.hasAnimatedSinceResize = !1),
                      this.nodes.forEach(rC));
                });
              }
              i && this.root.registerSharedNode(i, this),
                !1 !== this.options.animate &&
                  r &&
                  (i || n) &&
                  this.addEventListener(
                    'didUpdate',
                    ({
                      delta: e,
                      hasLayoutChanged: t,
                      hasRelativeLayoutChanged: i,
                      layout: n,
                    }) => {
                      if (this.isTreeAnimationBlocked()) {
                        (this.target = void 0), (this.relativeTarget = void 0);
                        return;
                      }
                      let s =
                          this.options.transition ||
                          r.getDefaultTransition() ||
                          rN,
                        {
                          onLayoutAnimationStart: o,
                          onLayoutAnimationComplete: a,
                        } = r.getProps(),
                        l = !this.targetLayout || !rd(this.targetLayout, n),
                        u = !t && i;
                      if (
                        this.options.layoutRoot ||
                        this.resumeFrom ||
                        u ||
                        (t && (l || !this.currentAnimation))
                      ) {
                        this.resumeFrom &&
                          ((this.resumingFrom = this.resumeFrom),
                          (this.resumingFrom.resumingFrom = void 0));
                        let t = {
                          ...tc(s, 'layout'),
                          onPlay: o,
                          onComplete: a,
                        };
                        (r.shouldReduceMotion || this.options.layoutRoot) &&
                          ((t.delay = 0), (t.type = !1)),
                          this.startAnimation(t),
                          this.setAnimationOrigin(e, u);
                      } else
                        t || rC(this),
                          this.isLead() &&
                            this.options.onExitComplete &&
                            this.options.onExitComplete();
                      this.targetLayout = n;
                    }
                  );
            }
            unmount() {
              this.options.layoutId && this.willUpdate(),
                this.root.nodes.remove(this);
              let e = this.getStack();
              e && e.remove(this),
                this.parent && this.parent.children.delete(this),
                (this.instance = void 0),
                this.eventHandlers.clear(),
                w(this.updateProjection);
            }
            blockUpdate() {
              this.updateManuallyBlocked = !0;
            }
            unblockUpdate() {
              this.updateManuallyBlocked = !1;
            }
            isUpdateBlocked() {
              return this.updateManuallyBlocked || this.updateBlockedByResize;
            }
            isTreeAnimationBlocked() {
              return (
                this.isAnimationBlocked ||
                (this.parent && this.parent.isTreeAnimationBlocked()) ||
                !1
              );
            }
            startUpdate() {
              !this.isUpdateBlocked() &&
                ((this.isUpdating = !0),
                this.nodes && this.nodes.forEach(rk),
                this.animationId++);
            }
            getTransformTemplate() {
              let { visualElement: e } = this.options;
              return e && e.getProps().transformTemplate;
            }
            willUpdate(e = !0) {
              if (
                ((this.root.hasTreeAnimated = !0), this.root.isUpdateBlocked())
              ) {
                this.options.onExitComplete && this.options.onExitComplete();
                return;
              }
              if (
                (window.MotionCancelOptimisedAnimation &&
                  !this.hasCheckedOptimisedAppear &&
                  (function e(t) {
                    if (((t.hasCheckedOptimisedAppear = !0), t.root === t))
                      return;
                    let { visualElement: i } = t.options;
                    if (!i) return;
                    let n = i.props[tb];
                    if (window.MotionHasOptimisedAnimation(n, 'transform')) {
                      let { layout: e, layoutId: i } = t.options;
                      window.MotionCancelOptimisedAnimation(
                        n,
                        'transform',
                        P,
                        !(e || i)
                      );
                    }
                    let { parent: r } = t;
                    r && !r.hasCheckedOptimisedAppear && e(r);
                  })(this),
                this.root.isUpdating || this.root.startUpdate(),
                this.isLayoutDirty)
              )
                return;
              this.isLayoutDirty = !0;
              for (let e = 0; e < this.path.length; e++) {
                let t = this.path[e];
                (t.shouldResetTransform = !0),
                  t.updateScroll('snapshot'),
                  t.options.layoutRoot && t.willUpdate(!1);
              }
              let { layoutId: t, layout: i } = this.options;
              if (void 0 === t && !i) return;
              let n = this.getTransformTemplate();
              (this.prevTransformTemplateValue = n
                ? n(this.latestValues, '')
                : void 0),
                this.updateSnapshot(),
                e && this.notifyListeners('willUpdate');
            }
            update() {
              if (((this.updateScheduled = !1), this.isUpdateBlocked())) {
                this.unblockUpdate(),
                  this.clearAllSnapshots(),
                  this.nodes.forEach(rR);
                return;
              }
              this.isUpdating || this.nodes.forEach(rM),
                (this.isUpdating = !1),
                this.nodes.forEach(rj),
                this.nodes.forEach(rw),
                this.nodes.forEach(rE),
                this.clearAllSnapshots();
              let e = A.now();
              (E.delta = K(0, 1e3 / 60, e - E.timestamp)),
                (E.timestamp = e),
                (E.isProcessing = !0),
                T.update.process(E),
                T.preRender.process(E),
                T.render.process(E),
                (E.isProcessing = !1);
            }
            didUpdate() {
              this.updateScheduled ||
                ((this.updateScheduled = !0), n$.read(this.scheduleUpdate));
            }
            clearAllSnapshots() {
              this.nodes.forEach(rA), this.sharedNodes.forEach(rD);
            }
            scheduleUpdateProjection() {
              this.projectionUpdateScheduled ||
                ((this.projectionUpdateScheduled = !0),
                P.preRender(this.updateProjection, !1, !0));
            }
            scheduleCheckAfterUnmount() {
              P.postRender(() => {
                this.isLayoutDirty
                  ? this.root.didUpdate()
                  : this.root.checkUpdateFailed();
              });
            }
            updateSnapshot() {
              !this.snapshot &&
                this.instance &&
                ((this.snapshot = this.measure()),
                !this.snapshot ||
                  ni(this.snapshot.measuredBox.x) ||
                  ni(this.snapshot.measuredBox.y) ||
                  (this.snapshot = void 0));
            }
            updateLayout() {
              if (
                !this.instance ||
                (this.updateScroll(),
                !(this.options.alwaysMeasureLayout && this.isLead()) &&
                  !this.isLayoutDirty)
              )
                return;
              if (this.resumeFrom && !this.resumeFrom.instance)
                for (let e = 0; e < this.path.length; e++)
                  this.path[e].updateScroll();
              let e = this.layout;
              (this.layout = this.measure(!1)),
                (this.layoutCorrected = nc()),
                (this.isLayoutDirty = !1),
                (this.projectionDelta = void 0),
                this.notifyListeners('measure', this.layout.layoutBox);
              let { visualElement: t } = this.options;
              t &&
                t.notify(
                  'LayoutMeasure',
                  this.layout.layoutBox,
                  e ? e.layoutBox : void 0
                );
            }
            updateScroll(e = 'measure') {
              let t = !!(this.options.layoutScroll && this.instance);
              if (
                (this.scroll &&
                  this.scroll.animationId === this.root.animationId &&
                  this.scroll.phase === e &&
                  (t = !1),
                t && this.instance)
              ) {
                let t = n(this.instance);
                this.scroll = {
                  animationId: this.root.animationId,
                  phase: e,
                  isRoot: t,
                  offset: i(this.instance),
                  wasRoot: this.scroll ? this.scroll.isRoot : t,
                };
              }
            }
            resetTransform() {
              if (!r) return;
              let e =
                  this.isLayoutDirty ||
                  this.shouldResetTransform ||
                  this.options.alwaysMeasureLayout,
                t = this.projectionDelta && !ru(this.projectionDelta),
                i = this.getTransformTemplate(),
                n = i ? i(this.latestValues, '') : void 0,
                s = n !== this.prevTransformTemplateValue;
              e &&
                this.instance &&
                (t || nm(this.latestValues) || s) &&
                (r(this.instance, n),
                (this.shouldResetTransform = !1),
                this.scheduleRender());
            }
            measure(e = !0) {
              var t;
              let i = this.measurePageBox(),
                n = this.removeElementScroll(i);
              return (
                e && (n = this.removeTransform(n)),
                rB((t = n).x),
                rB(t.y),
                {
                  animationId: this.root.animationId,
                  measuredBox: i,
                  layoutBox: n,
                  latestValues: {},
                  source: this.id,
                }
              );
            }
            measurePageBox() {
              let { visualElement: e } = this.options;
              if (!e) return nc();
              let t = e.measureViewportBox();
              if (!(this.scroll?.wasRoot || this.path.some(rz))) {
                let { scroll: e } = this.root;
                e && (nb(t.x, e.offset.x), nb(t.y, e.offset.y));
              }
              return t;
            }
            removeElementScroll(e) {
              let t = nc();
              if ((rt(t, e), this.scroll?.wasRoot)) return t;
              for (let i = 0; i < this.path.length; i++) {
                let n = this.path[i],
                  { scroll: r, options: s } = n;
                n !== this.root &&
                  r &&
                  s.layoutScroll &&
                  (r.wasRoot && rt(t, e),
                  nb(t.x, r.offset.x),
                  nb(t.y, r.offset.y));
              }
              return t;
            }
            applyTransform(e, t = !1) {
              let i = nc();
              rt(i, e);
              for (let e = 0; e < this.path.length; e++) {
                let n = this.path[e];
                !t &&
                  n.options.layoutScroll &&
                  n.scroll &&
                  n !== n.root &&
                  nw(i, { x: -n.scroll.offset.x, y: -n.scroll.offset.y }),
                  nm(n.latestValues) && nw(i, n.latestValues);
              }
              return nm(this.latestValues) && nw(i, this.latestValues), i;
            }
            removeTransform(e) {
              let t = nc();
              rt(t, e);
              for (let e = 0; e < this.path.length; e++) {
                let i = this.path[e];
                if (!i.instance || !nm(i.latestValues)) continue;
                nf(i.latestValues) && i.updateSnapshot();
                let n = nc();
                rt(n, i.measurePageBox()),
                  ra(
                    t,
                    i.latestValues,
                    i.snapshot ? i.snapshot.layoutBox : void 0,
                    n
                  );
              }
              return nm(this.latestValues) && ra(t, this.latestValues), t;
            }
            setTargetDelta(e) {
              (this.targetDelta = e),
                this.root.scheduleUpdateProjection(),
                (this.isProjectionDirty = !0);
            }
            setOptions(e) {
              this.options = {
                ...this.options,
                ...e,
                crossfade: void 0 === e.crossfade || e.crossfade,
              };
            }
            clearMeasurements() {
              (this.scroll = void 0),
                (this.layout = void 0),
                (this.snapshot = void 0),
                (this.prevTransformTemplateValue = void 0),
                (this.targetDelta = void 0),
                (this.target = void 0),
                (this.isLayoutDirty = !1);
            }
            forceRelativeParentToResolveTarget() {
              this.relativeParent &&
                this.relativeParent.resolvedRelativeTargetAt !== E.timestamp &&
                this.relativeParent.resolveTargetDelta(!0);
            }
            resolveTargetDelta(e = !1) {
              let t = this.getLead();
              this.isProjectionDirty ||
                (this.isProjectionDirty = t.isProjectionDirty),
                this.isTransformDirty ||
                  (this.isTransformDirty = t.isTransformDirty),
                this.isSharedProjectionDirty ||
                  (this.isSharedProjectionDirty = t.isSharedProjectionDirty);
              let i = !!this.resumingFrom || this !== t;
              if (
                !(
                  e ||
                  (i && this.isSharedProjectionDirty) ||
                  this.isProjectionDirty ||
                  this.parent?.isProjectionDirty ||
                  this.attemptToResolveRelativeTarget ||
                  this.root.updateBlockedByResize
                )
              )
                return;
              let { layout: n, layoutId: r } = this.options;
              if (this.layout && (n || r)) {
                if (
                  ((this.resolvedRelativeTargetAt = E.timestamp),
                  !this.targetDelta && !this.relativeTarget)
                ) {
                  let e = this.getClosestProjectingParent();
                  e && e.layout && 1 !== this.animationProgress
                    ? ((this.relativeParent = e),
                      this.forceRelativeParentToResolveTarget(),
                      (this.relativeTarget = nc()),
                      (this.relativeTargetOrigin = nc()),
                      na(
                        this.relativeTargetOrigin,
                        this.layout.layoutBox,
                        e.layout.layoutBox
                      ),
                      rt(this.relativeTarget, this.relativeTargetOrigin))
                    : (this.relativeParent = this.relativeTarget = void 0);
                }
                if (this.relativeTarget || this.targetDelta) {
                  if (
                    (this.target ||
                      ((this.target = nc()),
                      (this.targetWithTransforms = nc())),
                    this.relativeTarget &&
                      this.relativeTargetOrigin &&
                      this.relativeParent &&
                      this.relativeParent.target)
                  ) {
                    var s, o, a;
                    this.forceRelativeParentToResolveTarget(),
                      (s = this.target),
                      (o = this.relativeTarget),
                      (a = this.relativeParent.target),
                      ns(s.x, o.x, a.x),
                      ns(s.y, o.y, a.y);
                  } else
                    this.targetDelta
                      ? (this.resumingFrom
                          ? (this.target = this.applyTransform(
                              this.layout.layoutBox
                            ))
                          : rt(this.target, this.layout.layoutBox),
                        nx(this.target, this.targetDelta))
                      : rt(this.target, this.layout.layoutBox);
                  if (this.attemptToResolveRelativeTarget) {
                    this.attemptToResolveRelativeTarget = !1;
                    let e = this.getClosestProjectingParent();
                    e &&
                    !!e.resumingFrom == !!this.resumingFrom &&
                    !e.options.layoutScroll &&
                    e.target &&
                    1 !== this.animationProgress
                      ? ((this.relativeParent = e),
                        this.forceRelativeParentToResolveTarget(),
                        (this.relativeTarget = nc()),
                        (this.relativeTargetOrigin = nc()),
                        na(this.relativeTargetOrigin, this.target, e.target),
                        rt(this.relativeTarget, this.relativeTargetOrigin))
                      : (this.relativeParent = this.relativeTarget = void 0);
                  }
                  x.value && rg.calculatedTargetDeltas++;
                }
              }
            }
            getClosestProjectingParent() {
              if (
                !(
                  !this.parent ||
                  nf(this.parent.latestValues) ||
                  ng(this.parent.latestValues)
                )
              )
                if (this.parent.isProjecting()) return this.parent;
                else return this.parent.getClosestProjectingParent();
            }
            isProjecting() {
              return !!(
                (this.relativeTarget ||
                  this.targetDelta ||
                  this.options.layoutRoot) &&
                this.layout
              );
            }
            calcProjection() {
              let e = this.getLead(),
                t = !!this.resumingFrom || this !== e,
                i = !0;
              if (
                ((this.isProjectionDirty || this.parent?.isProjectionDirty) &&
                  (i = !1),
                t &&
                  (this.isSharedProjectionDirty || this.isTransformDirty) &&
                  (i = !1),
                this.resolvedRelativeTargetAt === E.timestamp && (i = !1),
                i)
              )
                return;
              let { layout: n, layoutId: r } = this.options;
              if (
                ((this.isTreeAnimating = !!(
                  (this.parent && this.parent.isTreeAnimating) ||
                  this.currentAnimation ||
                  this.pendingAnimation
                )),
                this.isTreeAnimating ||
                  (this.targetDelta = this.relativeTarget = void 0),
                !this.layout || !(n || r))
              )
                return;
              rt(this.layoutCorrected, this.layout.layoutBox);
              let s = this.treeScale.x,
                o = this.treeScale.y;
              !(function (e, t, i, n = !1) {
                let r,
                  s,
                  o = i.length;
                if (o) {
                  t.x = t.y = 1;
                  for (let a = 0; a < o; a++) {
                    s = (r = i[a]).projectionDelta;
                    let { visualElement: o } = r.options;
                    (!o ||
                      !o.props.style ||
                      'contents' !== o.props.style.display) &&
                      (n &&
                        r.options.layoutScroll &&
                        r.scroll &&
                        r !== r.root &&
                        nw(e, { x: -r.scroll.offset.x, y: -r.scroll.offset.y }),
                      s && ((t.x *= s.x.scale), (t.y *= s.y.scale), nx(e, s)),
                      n && nm(r.latestValues) && nw(e, r.latestValues));
                  }
                  t.x < 1.0000000000001 && t.x > 0.999999999999 && (t.x = 1),
                    t.y < 1.0000000000001 && t.y > 0.999999999999 && (t.y = 1);
                }
              })(this.layoutCorrected, this.treeScale, this.path, t),
                e.layout &&
                  !e.target &&
                  (1 !== this.treeScale.x || 1 !== this.treeScale.y) &&
                  ((e.target = e.layout.layoutBox),
                  (e.targetWithTransforms = nc()));
              let { target: a } = e;
              if (!a) {
                this.prevProjectionDelta &&
                  (this.createProjectionDeltas(), this.scheduleRender());
                return;
              }
              this.projectionDelta && this.prevProjectionDelta
                ? (ri(this.prevProjectionDelta.x, this.projectionDelta.x),
                  ri(this.prevProjectionDelta.y, this.projectionDelta.y))
                : this.createProjectionDeltas(),
                nr(
                  this.projectionDelta,
                  this.layoutCorrected,
                  a,
                  this.latestValues
                ),
                (this.treeScale.x === s &&
                  this.treeScale.y === o &&
                  rf(this.projectionDelta.x, this.prevProjectionDelta.x) &&
                  rf(this.projectionDelta.y, this.prevProjectionDelta.y)) ||
                  ((this.hasProjected = !0),
                  this.scheduleRender(),
                  this.notifyListeners('projectionUpdate', a)),
                x.value && rg.calculatedProjections++;
            }
            hide() {
              this.isVisible = !1;
            }
            show() {
              this.isVisible = !0;
            }
            scheduleRender(e = !0) {
              if ((this.options.visualElement?.scheduleRender(), e)) {
                let e = this.getStack();
                e && e.scheduleRender();
              }
              this.resumingFrom &&
                !this.resumingFrom.instance &&
                (this.resumingFrom = void 0);
            }
            createProjectionDeltas() {
              (this.prevProjectionDelta = nu()),
                (this.projectionDelta = nu()),
                (this.projectionDeltaWithTransform = nu());
            }
            setAnimationOrigin(e, t = !1) {
              let i,
                n = this.snapshot,
                r = n ? n.latestValues : {},
                s = { ...this.latestValues },
                o = nu();
              (this.relativeParent && this.relativeParent.options.layoutRoot) ||
                (this.relativeTarget = this.relativeTargetOrigin = void 0),
                (this.attemptToResolveRelativeTarget = !t);
              let a = nc(),
                l =
                  (n ? n.source : void 0) !==
                  (this.layout ? this.layout.source : void 0),
                u = this.getStack(),
                h = !u || u.members.length <= 1,
                c = !!(
                  l &&
                  !h &&
                  !0 === this.options.crossfade &&
                  !this.path.some(rI)
                );
              (this.animationProgress = 0),
                (this.mixTargetDelta = (t) => {
                  let n = t / 1e3;
                  if (
                    (rV(o.x, e.x, n),
                    rV(o.y, e.y, n),
                    this.setTargetDelta(o),
                    this.relativeTarget &&
                      this.relativeTargetOrigin &&
                      this.layout &&
                      this.relativeParent &&
                      this.relativeParent.layout)
                  ) {
                    var u, d, p, f, m, g;
                    na(
                      a,
                      this.layout.layoutBox,
                      this.relativeParent.layout.layoutBox
                    ),
                      (p = this.relativeTarget),
                      (f = this.relativeTargetOrigin),
                      (m = a),
                      (g = n),
                      rL(p.x, f.x, m.x, g),
                      rL(p.y, f.y, m.y, g),
                      i &&
                        ((u = this.relativeTarget),
                        (d = i),
                        rh(u.x, d.x) && rh(u.y, d.y)) &&
                        (this.isProjectionDirty = !1),
                      i || (i = nc()),
                      rt(i, this.relativeTarget);
                  }
                  l &&
                    ((this.animationValues = s),
                    (function (e, t, i, n, r, s) {
                      r
                        ? ((e.opacity = eD(0, i.opacity ?? 1, n6(n))),
                          (e.opacityExit = eD(t.opacity ?? 1, 0, n8(n))))
                        : s &&
                          (e.opacity = eD(t.opacity ?? 1, i.opacity ?? 1, n));
                      for (let r = 0; r < n3; r++) {
                        let s = `border${n2[r]}Radius`,
                          o = n9(t, s),
                          a = n9(i, s);
                        (void 0 !== o || void 0 !== a) &&
                          (o || (o = 0),
                          a || (a = 0),
                          0 === o || 0 === a || n4(o) === n4(a)
                            ? ((e[s] = Math.max(eD(n5(o), n5(a), n), 0)),
                              (eg.test(a) || eg.test(o)) && (e[s] += '%'))
                            : (e[s] = a));
                      }
                      (t.rotate || i.rotate) &&
                        (e.rotate = eD(t.rotate || 0, i.rotate || 0, n));
                    })(s, r, this.latestValues, n, c, h)),
                    this.root.scheduleUpdateProjection(),
                    this.scheduleRender(),
                    (this.animationProgress = n);
                }),
                this.mixTargetDelta(1e3 * !!this.options.layoutRoot);
            }
            startAnimation(e) {
              this.notifyListeners('animationStart'),
                this.currentAnimation?.stop(),
                this.resumingFrom?.currentAnimation?.stop(),
                this.pendingAnimation &&
                  (w(this.pendingAnimation), (this.pendingAnimation = void 0)),
                (this.pendingAnimation = P.update(() => {
                  (nH.hasAnimatedSinceResize = !0),
                    tE.layout++,
                    this.motionValue || (this.motionValue = C(0)),
                    (this.currentAnimation = (function (e, t, i) {
                      let n = ty(e) ? e : C(e);
                      return n.start(iB('', n, t, i)), n.animation;
                    })(this.motionValue, [0, 1e3], {
                      ...e,
                      isSync: !0,
                      onUpdate: (t) => {
                        this.mixTargetDelta(t), e.onUpdate && e.onUpdate(t);
                      },
                      onStop: () => {
                        tE.layout--;
                      },
                      onComplete: () => {
                        tE.layout--,
                          e.onComplete && e.onComplete(),
                          this.completeAnimation();
                      },
                    })),
                    this.resumingFrom &&
                      (this.resumingFrom.currentAnimation =
                        this.currentAnimation),
                    (this.pendingAnimation = void 0);
                }));
            }
            completeAnimation() {
              this.resumingFrom &&
                ((this.resumingFrom.currentAnimation = void 0),
                (this.resumingFrom.preserveOpacity = void 0));
              let e = this.getStack();
              e && e.exitAnimationComplete(),
                (this.resumingFrom =
                  this.currentAnimation =
                  this.animationValues =
                    void 0),
                this.notifyListeners('animationComplete');
            }
            finishAnimation() {
              this.currentAnimation &&
                (this.mixTargetDelta && this.mixTargetDelta(1e3),
                this.currentAnimation.stop()),
                this.completeAnimation();
            }
            applyTransformsToTarget() {
              let e = this.getLead(),
                {
                  targetWithTransforms: t,
                  target: i,
                  layout: n,
                  latestValues: r,
                } = e;
              if (t && i && n) {
                if (
                  this !== e &&
                  this.layout &&
                  n &&
                  r$(
                    this.options.animationType,
                    this.layout.layoutBox,
                    n.layoutBox
                  )
                ) {
                  i = this.target || nc();
                  let t = ni(this.layout.layoutBox.x);
                  (i.x.min = e.target.x.min), (i.x.max = i.x.min + t);
                  let n = ni(this.layout.layoutBox.y);
                  (i.y.min = e.target.y.min), (i.y.max = i.y.min + n);
                }
                rt(t, i),
                  nw(t, r),
                  nr(
                    this.projectionDeltaWithTransform,
                    this.layoutCorrected,
                    t,
                    r
                  );
              }
            }
            registerSharedNode(e, t) {
              this.sharedNodes.has(e) || this.sharedNodes.set(e, new rm()),
                this.sharedNodes.get(e).add(t);
              let i = t.options.initialPromotionConfig;
              t.promote({
                transition: i ? i.transition : void 0,
                preserveFollowOpacity:
                  i && i.shouldPreserveFollowOpacity
                    ? i.shouldPreserveFollowOpacity(t)
                    : void 0,
              });
            }
            isLead() {
              let e = this.getStack();
              return !e || e.lead === this;
            }
            getLead() {
              let { layoutId: e } = this.options;
              return (e && this.getStack()?.lead) || this;
            }
            getPrevLead() {
              let { layoutId: e } = this.options;
              return e ? this.getStack()?.prevLead : void 0;
            }
            getStack() {
              let { layoutId: e } = this.options;
              if (e) return this.root.sharedNodes.get(e);
            }
            promote({
              needsReset: e,
              transition: t,
              preserveFollowOpacity: i,
            } = {}) {
              let n = this.getStack();
              n && n.promote(this, i),
                e && ((this.projectionDelta = void 0), (this.needsReset = !0)),
                t && this.setOptions({ transition: t });
            }
            relegate() {
              let e = this.getStack();
              return !!e && e.relegate(this);
            }
            resetSkewAndRotation() {
              let { visualElement: e } = this.options;
              if (!e) return;
              let t = !1,
                { latestValues: i } = e;
              if (
                ((i.z ||
                  i.rotate ||
                  i.rotateX ||
                  i.rotateY ||
                  i.rotateZ ||
                  i.skewX ||
                  i.skewY) &&
                  (t = !0),
                !t)
              )
                return;
              let n = {};
              i.z && rb('z', e, n, this.animationValues);
              for (let t = 0; t < ry.length; t++)
                rb(`rotate${ry[t]}`, e, n, this.animationValues),
                  rb(`skew${ry[t]}`, e, n, this.animationValues);
              for (let t in (e.render(), n))
                e.setStaticValue(t, n[t]),
                  this.animationValues && (this.animationValues[t] = n[t]);
              e.scheduleRender();
            }
            getProjectionStyles(e) {
              if (!this.instance || this.isSVG) return;
              if (!this.isVisible) return rv;
              let t = { visibility: '' },
                i = this.getTransformTemplate();
              if (this.needsReset)
                return (
                  (this.needsReset = !1),
                  (t.opacity = ''),
                  (t.pointerEvents = n1(e?.pointerEvents) || ''),
                  (t.transform = i ? i(this.latestValues, '') : 'none'),
                  t
                );
              let n = this.getLead();
              if (!this.projectionDelta || !this.layout || !n.target) {
                let t = {};
                return (
                  this.options.layoutId &&
                    ((t.opacity =
                      void 0 !== this.latestValues.opacity
                        ? this.latestValues.opacity
                        : 1),
                    (t.pointerEvents = n1(e?.pointerEvents) || '')),
                  this.hasProjected &&
                    !nm(this.latestValues) &&
                    ((t.transform = i ? i({}, '') : 'none'),
                    (this.hasProjected = !1)),
                  t
                );
              }
              let r = n.animationValues || n.latestValues;
              this.applyTransformsToTarget(),
                (t.transform = (function (e, t, i) {
                  let n = '',
                    r = e.x.translate / t.x,
                    s = e.y.translate / t.y,
                    o = i?.z || 0;
                  if (
                    ((r || s || o) &&
                      (n = `translate3d(${r}px, ${s}px, ${o}px) `),
                    (1 !== t.x || 1 !== t.y) &&
                      (n += `scale(${1 / t.x}, ${1 / t.y}) `),
                    i)
                  ) {
                    let {
                      transformPerspective: e,
                      rotate: t,
                      rotateX: r,
                      rotateY: s,
                      skewX: o,
                      skewY: a,
                    } = i;
                    e && (n = `perspective(${e}px) ${n}`),
                      t && (n += `rotate(${t}deg) `),
                      r && (n += `rotateX(${r}deg) `),
                      s && (n += `rotateY(${s}deg) `),
                      o && (n += `skewX(${o}deg) `),
                      a && (n += `skewY(${a}deg) `);
                  }
                  let a = e.x.scale * t.x,
                    l = e.y.scale * t.y;
                  return (
                    (1 !== a || 1 !== l) && (n += `scale(${a}, ${l})`),
                    n || 'none'
                  );
                })(this.projectionDeltaWithTransform, this.treeScale, r)),
                i && (t.transform = i(r, t.transform));
              let { x: s, y: o } = this.projectionDelta;
              for (let e in ((t.transformOrigin = `${100 * s.origin}% ${
                100 * o.origin
              }% 0`),
              n.animationValues
                ? (t.opacity =
                    n === this
                      ? r.opacity ?? this.latestValues.opacity ?? 1
                      : this.preserveOpacity
                      ? this.latestValues.opacity
                      : r.opacityExit)
                : (t.opacity =
                    n === this
                      ? void 0 !== r.opacity
                        ? r.opacity
                        : ''
                      : void 0 !== r.opacityExit
                      ? r.opacityExit
                      : 0),
              nG)) {
                if (void 0 === r[e]) continue;
                let { correct: i, applyTo: s, isCSSVariable: o } = nG[e],
                  a = 'none' === t.transform ? r[e] : i(r[e], n);
                if (s) {
                  let e = s.length;
                  for (let i = 0; i < e; i++) t[s[i]] = a;
                } else
                  o
                    ? (this.options.visualElement.renderState.vars[e] = a)
                    : (t[e] = a);
              }
              return (
                this.options.layoutId &&
                  (t.pointerEvents =
                    n === this ? n1(e?.pointerEvents) || '' : 'none'),
                t
              );
            }
            clearSnapshot() {
              this.resumeFrom = this.snapshot = void 0;
            }
            resetTree() {
              this.root.nodes.forEach((e) => e.currentAnimation?.stop()),
                this.root.nodes.forEach(rR),
                this.root.sharedNodes.clear();
            }
          };
        }
        function rw(e) {
          e.updateLayout();
        }
        function rE(e) {
          let t = e.resumeFrom?.snapshot || e.snapshot;
          if (e.isLead() && e.layout && t && e.hasListeners('didUpdate')) {
            let { layoutBox: i, measuredBox: n } = e.layout,
              { animationType: r } = e.options,
              s = t.source !== e.layout.source;
            'size' === r
              ? nd((e) => {
                  let n = s ? t.measuredBox[e] : t.layoutBox[e],
                    r = ni(n);
                  (n.min = i[e].min), (n.max = n.min + r);
                })
              : r$(r, t.layoutBox, i) &&
                nd((n) => {
                  let r = s ? t.measuredBox[n] : t.layoutBox[n],
                    o = ni(i[n]);
                  (r.max = r.min + o),
                    e.relativeTarget &&
                      !e.currentAnimation &&
                      ((e.isProjectionDirty = !0),
                      (e.relativeTarget[n].max = e.relativeTarget[n].min + o));
                });
            let o = nu();
            nr(o, i, t.layoutBox);
            let a = nu();
            s
              ? nr(a, e.applyTransform(n, !0), t.measuredBox)
              : nr(a, i, t.layoutBox);
            let l = !ru(o),
              u = !1;
            if (!e.resumeFrom) {
              let n = e.getClosestProjectingParent();
              if (n && !n.resumeFrom) {
                let { snapshot: r, layout: s } = n;
                if (r && s) {
                  let o = nc();
                  na(o, t.layoutBox, r.layoutBox);
                  let a = nc();
                  na(a, i, s.layoutBox),
                    rd(o, a) || (u = !0),
                    n.options.layoutRoot &&
                      ((e.relativeTarget = a),
                      (e.relativeTargetOrigin = o),
                      (e.relativeParent = n));
                }
              }
            }
            e.notifyListeners('didUpdate', {
              layout: i,
              snapshot: t,
              delta: a,
              layoutDelta: o,
              hasLayoutChanged: l,
              hasRelativeLayoutChanged: u,
            });
          } else if (e.isLead()) {
            let { onExitComplete: t } = e.options;
            t && t();
          }
          e.options.transition = void 0;
        }
        function rT(e) {
          x.value && rg.nodes++,
            e.parent &&
              (e.isProjecting() ||
                (e.isProjectionDirty = e.parent.isProjectionDirty),
              e.isSharedProjectionDirty ||
                (e.isSharedProjectionDirty = !!(
                  e.isProjectionDirty ||
                  e.parent.isProjectionDirty ||
                  e.parent.isSharedProjectionDirty
                )),
              e.isTransformDirty ||
                (e.isTransformDirty = e.parent.isTransformDirty));
        }
        function rS(e) {
          e.isProjectionDirty =
            e.isSharedProjectionDirty =
            e.isTransformDirty =
              !1;
        }
        function rA(e) {
          e.clearSnapshot();
        }
        function rR(e) {
          e.clearMeasurements();
        }
        function rM(e) {
          e.isLayoutDirty = !1;
        }
        function rj(e) {
          let { visualElement: t } = e.options;
          t &&
            t.getProps().onBeforeLayoutMeasure &&
            t.notify('BeforeLayoutMeasure'),
            e.resetTransform();
        }
        function rC(e) {
          e.finishAnimation(),
            (e.targetDelta = e.relativeTarget = e.target = void 0),
            (e.isProjectionDirty = !0);
        }
        function r_(e) {
          e.resolveTargetDelta();
        }
        function rO(e) {
          e.calcProjection();
        }
        function rk(e) {
          e.resetSkewAndRotation();
        }
        function rD(e) {
          e.removeLeadSnapshot();
        }
        function rV(e, t, i) {
          (e.translate = eD(t.translate, 0, i)),
            (e.scale = eD(t.scale, 1, i)),
            (e.origin = t.origin),
            (e.originPoint = t.originPoint);
        }
        function rL(e, t, i, n) {
          (e.min = eD(t.min, i.min, n)), (e.max = eD(t.max, i.max, n));
        }
        function rI(e) {
          return e.animationValues && void 0 !== e.animationValues.opacityExit;
        }
        let rN = { duration: 0.45, ease: [0.4, 0, 0.1, 1] },
          rF = (e) =>
            'undefined' != typeof navigator &&
            navigator.userAgent &&
            navigator.userAgent.toLowerCase().includes(e),
          rU = rF('applewebkit/') && !rF('chrome/') ? Math.round : y;
        function rB(e) {
          (e.min = rU(e.min)), (e.max = rU(e.max));
        }
        function r$(e, t, i) {
          return (
            'position' === e ||
            ('preserve-aspect' === e && !(0.2 >= Math.abs(rp(t) - rp(i))))
          );
        }
        function rz(e) {
          return e !== e.root && e.scroll?.wasRoot;
        }
        let rW = rP({
            attachResizeListener: (e, t) => i9(e, 'resize', t),
            measureScroll: () => ({
              x:
                document.documentElement.scrollLeft || document.body.scrollLeft,
              y: document.documentElement.scrollTop || document.body.scrollTop,
            }),
            checkIsScrollRoot: () => !0,
          }),
          rX = { current: void 0 },
          rH = rP({
            measureScroll: (e) => ({ x: e.scrollLeft, y: e.scrollTop }),
            defaultParent: () => {
              if (!rX.current) {
                let e = new rW({});
                e.mount(window),
                  e.setOptions({ layoutScroll: !0 }),
                  (rX.current = e);
              }
              return rX.current;
            },
            resetTransform: (e, t) => {
              e.style.transform = void 0 !== t ? t : 'none';
            },
            checkIsScrollRoot: (e) =>
              'fixed' === window.getComputedStyle(e).position,
          });
        function rq(e, t) {
          let i = N(e),
            n = new AbortController();
          return [i, { passive: !0, ...t, signal: n.signal }, () => n.abort()];
        }
        function rY(e) {
          return !('touch' === e.pointerType || i4.x || i4.y);
        }
        function rG(e, t, i) {
          let { props: n } = e;
          e.animationState &&
            n.whileHover &&
            e.animationState.setActive('whileHover', 'Start' === i);
          let r = n['onHover' + i];
          r && P.postRender(() => r(t, i8(t)));
        }
        class rK extends i1 {
          mount() {
            let { current: e } = this.node;
            e &&
              (this.unmount = (function (e, t, i = {}) {
                let [n, r, s] = rq(e, i),
                  o = (e) => {
                    if (!rY(e)) return;
                    let { target: i } = e,
                      n = t(i, e);
                    if ('function' != typeof n || !i) return;
                    let s = (e) => {
                      rY(e) && (n(e), i.removeEventListener('pointerleave', s));
                    };
                    i.addEventListener('pointerleave', s, r);
                  };
                return (
                  n.forEach((e) => {
                    e.addEventListener('pointerenter', o, r);
                  }),
                  s
                );
              })(
                e,
                (e, t) => (
                  rG(this.node, t, 'Start'), (e) => rG(this.node, e, 'End')
                )
              ));
          }
          unmount() {}
        }
        class rZ extends i1 {
          constructor() {
            super(...arguments), (this.isActive = !1);
          }
          onFocus() {
            let e = !1;
            try {
              e = this.node.current.matches(':focus-visible');
            } catch (t) {
              e = !0;
            }
            e &&
              this.node.animationState &&
              (this.node.animationState.setActive('whileFocus', !0),
              (this.isActive = !0));
          }
          onBlur() {
            this.isActive &&
              this.node.animationState &&
              (this.node.animationState.setActive('whileFocus', !1),
              (this.isActive = !1));
          }
          mount() {
            this.unmount = G(
              i9(this.node.current, 'focus', () => this.onFocus()),
              i9(this.node.current, 'blur', () => this.onBlur())
            );
          }
          unmount() {}
        }
        let rQ = (e, t) => !!t && (e === t || rQ(e, t.parentElement)),
          rJ = new Set(['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA', 'A']),
          r0 = new WeakSet();
        function r1(e) {
          return (t) => {
            'Enter' === t.key && e(t);
          };
        }
        function r2(e, t) {
          e.dispatchEvent(
            new PointerEvent('pointer' + t, { isPrimary: !0, bubbles: !0 })
          );
        }
        let r3 = (e, t) => {
          let i = e.currentTarget;
          if (!i) return;
          let n = r1(() => {
            if (r0.has(i)) return;
            r2(i, 'down');
            let e = r1(() => {
              r2(i, 'up');
            });
            i.addEventListener('keyup', e, t),
              i.addEventListener('blur', () => r2(i, 'cancel'), t);
          });
          i.addEventListener('keydown', n, t),
            i.addEventListener(
              'blur',
              () => i.removeEventListener('keydown', n),
              t
            );
        };
        function r5(e) {
          return i6(e) && !(i4.x || i4.y);
        }
        function r4(e, t, i) {
          let { props: n } = e;
          if (e.current instanceof HTMLButtonElement && e.current.disabled)
            return;
          e.animationState &&
            n.whileTap &&
            e.animationState.setActive('whileTap', 'Start' === i);
          let r = n['onTap' + ('End' === i ? '' : i)];
          r && P.postRender(() => r(t, i8(t)));
        }
        class r9 extends i1 {
          mount() {
            let { current: e } = this.node;
            e &&
              (this.unmount = (function (e, t, i = {}) {
                let [n, r, s] = rq(e, i),
                  o = (e) => {
                    let n = e.currentTarget;
                    if (!r5(e)) return;
                    r0.add(n);
                    let s = t(n, e),
                      o = (e, t) => {
                        window.removeEventListener('pointerup', a),
                          window.removeEventListener('pointercancel', l),
                          r0.has(n) && r0.delete(n),
                          r5(e) &&
                            'function' == typeof s &&
                            s(e, { success: t });
                      },
                      a = (e) => {
                        o(
                          e,
                          n === window ||
                            n === document ||
                            i.useGlobalTarget ||
                            rQ(n, e.target)
                        );
                      },
                      l = (e) => {
                        o(e, !1);
                      };
                    window.addEventListener('pointerup', a, r),
                      window.addEventListener('pointercancel', l, r);
                  };
                return (
                  n.forEach((e) => {
                    ((i.useGlobalTarget ? window : e).addEventListener(
                      'pointerdown',
                      o,
                      r
                    ),
                    eG(e)) &&
                      (e.addEventListener('focus', (e) => r3(e, r)),
                      rJ.has(e.tagName) ||
                        -1 !== e.tabIndex ||
                        e.hasAttribute('tabindex') ||
                        (e.tabIndex = 0));
                  }),
                  s
                );
              })(
                e,
                (e, t) => (
                  r4(this.node, t, 'Start'),
                  (e, { success: t }) => r4(this.node, e, t ? 'End' : 'Cancel')
                ),
                { useGlobalTarget: this.node.props.globalTapTarget }
              ));
          }
          unmount() {}
        }
        let r6 = new WeakMap(),
          r8 = new WeakMap(),
          r7 = (e) => {
            let t = r6.get(e.target);
            t && t(e);
          },
          se = (e) => {
            e.forEach(r7);
          },
          st = { some: 0, all: 1 };
        class si extends i1 {
          constructor() {
            super(...arguments),
              (this.hasEnteredView = !1),
              (this.isInView = !1);
          }
          startObserver() {
            this.unmount();
            let { viewport: e = {} } = this.node.getProps(),
              { root: t, margin: i, amount: n = 'some', once: r } = e,
              s = {
                root: t ? t.current : void 0,
                rootMargin: i,
                threshold: 'number' == typeof n ? n : st[n],
              };
            return (function (e, t, i) {
              let n = (function ({ root: e, ...t }) {
                let i = e || document;
                r8.has(i) || r8.set(i, {});
                let n = r8.get(i),
                  r = JSON.stringify(t);
                return (
                  n[r] ||
                    (n[r] = new IntersectionObserver(se, { root: e, ...t })),
                  n[r]
                );
              })(t);
              return (
                r6.set(e, i),
                n.observe(e),
                () => {
                  r6.delete(e), n.unobserve(e);
                }
              );
            })(this.node.current, s, (e) => {
              let { isIntersecting: t } = e;
              if (
                this.isInView === t ||
                ((this.isInView = t), r && !t && this.hasEnteredView)
              )
                return;
              t && (this.hasEnteredView = !0),
                this.node.animationState &&
                  this.node.animationState.setActive('whileInView', t);
              let { onViewportEnter: i, onViewportLeave: n } =
                  this.node.getProps(),
                s = t ? i : n;
              s && s(e);
            });
          }
          mount() {
            this.startObserver();
          }
          update() {
            if ('undefined' == typeof IntersectionObserver) return;
            let { props: e, prevProps: t } = this.node;
            ['amount', 'margin', 'root'].some(
              (function ({ viewport: e = {} }, { viewport: t = {} } = {}) {
                return (i) => e[i] !== t[i];
              })(e, t)
            ) && this.startObserver();
          }
          unmount() {}
        }
        let sn = (0, c.createContext)({ strict: !1 }),
          sr = (0, c.createContext)({});
        function ss(e) {
          return ta(e.animate) || iG.some((t) => iq(e[t]));
        }
        function so(e) {
          return !!(ss(e) || e.variants);
        }
        function sa(e) {
          return Array.isArray(e) ? e.join(' ') : e;
        }
        let sl = {
            animation: [
              'animate',
              'variants',
              'whileHover',
              'whileTap',
              'exit',
              'whileInView',
              'whileFocus',
              'whileDrag',
            ],
            exit: ['exit'],
            drag: ['drag', 'dragControls'],
            focus: ['whileFocus'],
            hover: ['whileHover', 'onHoverStart', 'onHoverEnd'],
            tap: ['whileTap', 'onTap', 'onTapStart', 'onTapCancel'],
            pan: ['onPan', 'onPanStart', 'onPanSessionStart', 'onPanEnd'],
            inView: ['whileInView', 'onViewportEnter', 'onViewportLeave'],
            layout: ['layout', 'layoutId'],
          },
          su = {};
        for (let e in sl)
          su[e] = { isEnabled: (t) => sl[e].some((e) => !!t[e]) };
        let sh = Symbol.for('motionComponentSymbol');
        function sc(e, { layout: t, layoutId: i }) {
          return (
            tp.has(e) ||
            e.startsWith('origin') ||
            ((t || void 0 !== i) && (!!nG[e] || 'opacity' === e))
          );
        }
        let sd = (e, t) => (t && 'number' == typeof e ? t.transform(e) : e),
          sp = { ...ei, transform: Math.round },
          sf = {
            borderWidth: ey,
            borderTopWidth: ey,
            borderRightWidth: ey,
            borderBottomWidth: ey,
            borderLeftWidth: ey,
            borderRadius: ey,
            radius: ey,
            borderTopLeftRadius: ey,
            borderTopRightRadius: ey,
            borderBottomRightRadius: ey,
            borderBottomLeftRadius: ey,
            width: ey,
            maxWidth: ey,
            height: ey,
            maxHeight: ey,
            top: ey,
            right: ey,
            bottom: ey,
            left: ey,
            padding: ey,
            paddingTop: ey,
            paddingRight: ey,
            paddingBottom: ey,
            paddingLeft: ey,
            margin: ey,
            marginTop: ey,
            marginRight: ey,
            marginBottom: ey,
            marginLeft: ey,
            backgroundPositionX: ey,
            backgroundPositionY: ey,
            rotate: em,
            rotateX: em,
            rotateY: em,
            rotateZ: em,
            scale: er,
            scaleX: er,
            scaleY: er,
            scaleZ: er,
            skew: em,
            skewX: em,
            skewY: em,
            distance: ey,
            translateX: ey,
            translateY: ey,
            translateZ: ey,
            x: ey,
            y: ey,
            z: ey,
            perspective: ey,
            transformPerspective: ey,
            opacity: en,
            originX: eb,
            originY: eb,
            originZ: ey,
            zIndex: sp,
            fillOpacity: en,
            strokeOpacity: en,
            numOctaves: sp,
          },
          sm = {
            x: 'translateX',
            y: 'translateY',
            z: 'translateZ',
            transformPerspective: 'perspective',
          },
          sg = td.length;
        function sy(e, t, i) {
          let { style: n, vars: r, transformOrigin: s } = e,
            o = !1,
            a = !1;
          for (let e in t) {
            let i = t[e];
            if (tp.has(e)) {
              o = !0;
              continue;
            }
            if (Q(e)) {
              r[e] = i;
              continue;
            }
            {
              let t = sd(i, sf[e]);
              e.startsWith('origin') ? ((a = !0), (s[e] = t)) : (n[e] = t);
            }
          }
          if (
            (!t.transform &&
              (o || i
                ? (n.transform = (function (e, t, i) {
                    let n = '',
                      r = !0;
                    for (let s = 0; s < sg; s++) {
                      let o = td[s],
                        a = e[o];
                      if (void 0 === a) continue;
                      let l = !0;
                      if (
                        !(l =
                          'number' == typeof a
                            ? a === +!!o.startsWith('scale')
                            : 0 === parseFloat(a)) ||
                        i
                      ) {
                        let e = sd(a, sf[o]);
                        if (!l) {
                          r = !1;
                          let t = sm[o] || o;
                          n += `${t}(${e}) `;
                        }
                        i && (t[o] = e);
                      }
                    }
                    return (
                      (n = n.trim()),
                      i ? (n = i(t, r ? '' : n)) : r && (n = 'none'),
                      n
                    );
                  })(t, e.transform, i))
                : n.transform && (n.transform = 'none')),
            a)
          ) {
            let { originX: e = '50%', originY: t = '50%', originZ: i = 0 } = s;
            n.transformOrigin = `${e} ${t} ${i}`;
          }
        }
        let sv = () => ({
          style: {},
          transform: {},
          transformOrigin: {},
          vars: {},
        });
        function sx(e, t, i) {
          for (let n in t) ty(t[n]) || sc(n, i) || (e[n] = t[n]);
        }
        let sb = { offset: 'stroke-dashoffset', array: 'stroke-dasharray' },
          sP = { offset: 'strokeDashoffset', array: 'strokeDasharray' };
        function sw(
          e,
          {
            attrX: t,
            attrY: i,
            attrScale: n,
            pathLength: r,
            pathSpacing: s = 1,
            pathOffset: o = 0,
            ...a
          },
          l,
          u,
          h
        ) {
          if ((sy(e, a, u), l)) {
            e.style.viewBox && (e.attrs.viewBox = e.style.viewBox);
            return;
          }
          (e.attrs = e.style), (e.style = {});
          let { attrs: c, style: d } = e;
          c.transform && ((d.transform = c.transform), delete c.transform),
            (d.transform || c.transformOrigin) &&
              ((d.transformOrigin = c.transformOrigin ?? '50% 50%'),
              delete c.transformOrigin),
            d.transform &&
              ((d.transformBox = h?.transformBox ?? 'fill-box'),
              delete c.transformBox),
            void 0 !== t && (c.x = t),
            void 0 !== i && (c.y = i),
            void 0 !== n && (c.scale = n),
            void 0 !== r &&
              (function (e, t, i = 1, n = 0, r = !0) {
                e.pathLength = 1;
                let s = r ? sb : sP;
                e[s.offset] = ey.transform(-n);
                let o = ey.transform(t),
                  a = ey.transform(i);
                e[s.array] = `${o} ${a}`;
              })(c, r, s, o, !1);
        }
        let sE = () => ({ ...sv(), attrs: {} }),
          sT = (e) => 'string' == typeof e && 'svg' === e.toLowerCase(),
          sS = new Set([
            'animate',
            'exit',
            'variants',
            'initial',
            'style',
            'values',
            'variants',
            'transition',
            'transformTemplate',
            'custom',
            'inherit',
            'onBeforeLayoutMeasure',
            'onAnimationStart',
            'onAnimationComplete',
            'onUpdate',
            'onDragStart',
            'onDrag',
            'onDragEnd',
            'onMeasureDragConstraints',
            'onDirectionLock',
            'onDragTransitionEnd',
            '_dragX',
            '_dragY',
            'onHoverStart',
            'onHoverEnd',
            'onViewportEnter',
            'onViewportLeave',
            'globalTapTarget',
            'ignoreStrict',
            'viewport',
          ]);
        function sA(e) {
          return (
            e.startsWith('while') ||
            (e.startsWith('drag') && 'draggable' !== e) ||
            e.startsWith('layout') ||
            e.startsWith('onTap') ||
            e.startsWith('onPan') ||
            e.startsWith('onLayout') ||
            sS.has(e)
          );
        }
        let sR = (e) => !sA(e);
        try {
          !(function (e) {
            e && (sR = (t) => (t.startsWith('on') ? !sA(t) : e(t)));
          })(require('@emotion/is-prop-valid').default);
        } catch {}
        let sM = [
          'animate',
          'circle',
          'defs',
          'desc',
          'ellipse',
          'g',
          'image',
          'line',
          'filter',
          'marker',
          'mask',
          'metadata',
          'path',
          'pattern',
          'polygon',
          'polyline',
          'rect',
          'stop',
          'switch',
          'symbol',
          'svg',
          'text',
          'tspan',
          'use',
          'view',
        ];
        function sj(e) {
          if ('string' != typeof e || e.includes('-'));
          else if (sM.indexOf(e) > -1 || /[A-Z]/u.test(e)) return !0;
          return !1;
        }
        let sC = (e) => (t, i) => {
          let n = (0, c.useContext)(sr),
            r = (0, c.useContext)(nz),
            s = () =>
              (function (
                { scrapeMotionValuesFromProps: e, createRenderState: t },
                i,
                n,
                r
              ) {
                return {
                  latestValues: (function (e, t, i, n) {
                    let r = {},
                      s = n(e, {});
                    for (let e in s) r[e] = n1(s[e]);
                    let { initial: o, animate: a } = e,
                      l = ss(e),
                      u = so(e);
                    t &&
                      u &&
                      !l &&
                      !1 !== e.inherit &&
                      (void 0 === o && (o = t.initial),
                      void 0 === a && (a = t.animate));
                    let h = !!i && !1 === i.initial,
                      c = (h = h || !1 === o) ? a : o;
                    if (c && 'boolean' != typeof c && !ta(c)) {
                      let t = Array.isArray(c) ? c : [c];
                      for (let i = 0; i < t.length; i++) {
                        let n = tu(e, t[i]);
                        if (n) {
                          let { transitionEnd: e, transition: t, ...i } = n;
                          for (let e in i) {
                            let t = i[e];
                            if (Array.isArray(t)) {
                              let e = h ? t.length - 1 : 0;
                              t = t[e];
                            }
                            null !== t && (r[e] = t);
                          }
                          for (let t in e) r[t] = e[t];
                        }
                      }
                    }
                    return r;
                  })(i, n, r, e),
                  renderState: t(),
                };
              })(e, t, n, r);
          return i ? s() : e8(s);
        };
        function s_(e, t, i) {
          let { style: n } = e,
            r = {};
          for (let s in n)
            (ty(n[s]) ||
              (t.style && ty(t.style[s])) ||
              sc(s, e) ||
              i?.getValue(s)?.liveStyle !== void 0) &&
              (r[s] = n[s]);
          return r;
        }
        let sO = {
          useVisualState: sC({
            scrapeMotionValuesFromProps: s_,
            createRenderState: sv,
          }),
        };
        function sk(e, t, i) {
          let n = s_(e, t, i);
          for (let i in e)
            (ty(e[i]) || ty(t[i])) &&
              (n[
                -1 !== td.indexOf(i)
                  ? 'attr' + i.charAt(0).toUpperCase() + i.substring(1)
                  : i
              ] = e[i]);
          return n;
        }
        let sD = {
            useVisualState: sC({
              scrapeMotionValuesFromProps: sk,
              createRenderState: sE,
            }),
          },
          sV = (e) => (t) => t.test(e),
          sL = [
            ei,
            ey,
            eg,
            em,
            ex,
            ev,
            { test: (e) => 'auto' === e, parse: (e) => e },
          ],
          sI = (e) => sL.find(sV(e)),
          sN = (e) => /^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e),
          sF = /^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u,
          sU = (e) => /^0[^.\s]+$/u.test(e),
          sB = new Set(['brightness', 'contrast', 'saturate', 'opacity']);
        function s$(e) {
          let [t, i] = e.slice(0, -1).split('(');
          if ('drop-shadow' === t) return e;
          let [n] = i.match(eo) || [];
          if (!n) return e;
          let r = i.replace(n, ''),
            s = +!!sB.has(t);
          return n !== i && (s *= 100), t + '(' + s + r + ')';
        }
        let sz = /\b([a-z-]*)\(.*?\)/gu,
          sW = {
            ...e_,
            getAnimatableNone: (e) => {
              let t = e.match(sz);
              return t ? t.map(s$).join(' ') : e;
            },
          },
          sX = {
            ...sf,
            color: ew,
            backgroundColor: ew,
            outlineColor: ew,
            fill: ew,
            stroke: ew,
            borderColor: ew,
            borderTopColor: ew,
            borderRightColor: ew,
            borderBottomColor: ew,
            borderLeftColor: ew,
            filter: sW,
            WebkitFilter: sW,
          },
          sH = (e) => sX[e];
        function sq(e, t) {
          let i = sH(e);
          return (
            i !== sW && (i = e_),
            i.getAnimatableNone ? i.getAnimatableNone(t) : void 0
          );
        }
        let sY = new Set(['auto', 'none', '0']);
        class sG extends iP {
          constructor(e, t, i, n, r) {
            super(e, t, i, n, r, !0);
          }
          readKeyframes() {
            let { unresolvedKeyframes: e, element: t, name: i } = this;
            if (!t || !t.current) return;
            super.readKeyframes();
            for (let i = 0; i < e.length; i++) {
              let n = e[i];
              if ('string' == typeof n && ee((n = n.trim()))) {
                let r = (function e(t, i, n = 1) {
                  O(
                    n <= 4,
                    `Max CSS variable fallback depth detected in property "${t}". This may indicate a circular fallback dependency.`
                  );
                  let [r, s] = (function (e) {
                    let t = sF.exec(e);
                    if (!t) return [,];
                    let [, i, n, r] = t;
                    return [`--${i ?? n}`, r];
                  })(t);
                  if (!r) return;
                  let o = window.getComputedStyle(i).getPropertyValue(r);
                  if (o) {
                    let e = o.trim();
                    return sN(e) ? parseFloat(e) : e;
                  }
                  return ee(s) ? e(s, i, n + 1) : s;
                })(n, t.current);
                void 0 !== r && (e[i] = r),
                  i === e.length - 1 && (this.finalKeyframe = n);
              }
            }
            if ((this.resolveNoneKeyframes(), !tf.has(i) || 2 !== e.length))
              return;
            let [n, r] = e,
              s = sI(n),
              o = sI(r);
            if (s !== o)
              if (ih(s) && ih(o))
                for (let t = 0; t < e.length; t++) {
                  let i = e[t];
                  'string' == typeof i && (e[t] = parseFloat(i));
                }
              else ip[i] && (this.needsMeasurement = !0);
          }
          resolveNoneKeyframes() {
            let { unresolvedKeyframes: e, name: t } = this,
              i = [];
            for (let t = 0; t < e.length; t++) {
              var n;
              (null === e[t] ||
                ('number' == typeof (n = e[t])
                  ? 0 === n
                  : null === n || 'none' === n || '0' === n || sU(n))) &&
                i.push(t);
            }
            i.length &&
              (function (e, t, i) {
                let n,
                  r = 0;
                for (; r < e.length && !n; ) {
                  let t = e[r];
                  'string' == typeof t &&
                    !sY.has(t) &&
                    eR(t).values.length &&
                    (n = e[r]),
                    r++;
                }
                if (n && i) for (let r of t) e[r] = sq(i, n);
              })(e, i, t);
          }
          measureInitialState() {
            let { element: e, unresolvedKeyframes: t, name: i } = this;
            if (!e || !e.current) return;
            'height' === i && (this.suspendedScrollY = window.pageYOffset),
              (this.measuredOrigin = ip[i](
                e.measureViewportBox(),
                window.getComputedStyle(e.current)
              )),
              (t[0] = this.measuredOrigin);
            let n = t[t.length - 1];
            void 0 !== n && e.getValue(i, n).jump(n, !1);
          }
          measureEndState() {
            let { element: e, name: t, unresolvedKeyframes: i } = this;
            if (!e || !e.current) return;
            let n = e.getValue(t);
            n && n.jump(this.measuredOrigin, !1);
            let r = i.length - 1,
              s = i[r];
            (i[r] = ip[t](
              e.measureViewportBox(),
              window.getComputedStyle(e.current)
            )),
              null !== s &&
                void 0 === this.finalKeyframe &&
                (this.finalKeyframe = s),
              this.removedTransforms?.length &&
                this.removedTransforms.forEach(([t, i]) => {
                  e.getValue(t).set(i);
                }),
              this.resolveNoneKeyframes();
          }
        }
        let sK = [...sL, ew, e_],
          sZ = (e) => sK.find(sV(e)),
          sQ = { current: null },
          sJ = { current: !1 },
          s0 = new WeakMap(),
          s1 = [
            'AnimationStart',
            'AnimationComplete',
            'Update',
            'BeforeLayoutMeasure',
            'LayoutMeasure',
            'LayoutAnimationStart',
            'LayoutAnimationComplete',
          ];
        class s2 {
          scrapeMotionValuesFromProps(e, t, i) {
            return {};
          }
          constructor(
            {
              parent: e,
              props: t,
              presenceContext: i,
              reducedMotionConfig: n,
              blockInitialAnimation: r,
              visualState: s,
            },
            o = {}
          ) {
            (this.current = null),
              (this.children = new Set()),
              (this.isVariantNode = !1),
              (this.isControllingVariants = !1),
              (this.shouldReduceMotion = null),
              (this.values = new Map()),
              (this.KeyframeResolver = iP),
              (this.features = {}),
              (this.valueSubscriptions = new Map()),
              (this.prevMotionValues = {}),
              (this.events = {}),
              (this.propEventSubscriptions = {}),
              (this.notifyUpdate = () =>
                this.notify('Update', this.latestValues)),
              (this.render = () => {
                this.current &&
                  (this.triggerBuild(),
                  this.renderInstance(
                    this.current,
                    this.renderState,
                    this.props.style,
                    this.projection
                  ));
              }),
              (this.renderScheduledAt = 0),
              (this.scheduleRender = () => {
                let e = A.now();
                this.renderScheduledAt < e &&
                  ((this.renderScheduledAt = e), P.render(this.render, !1, !0));
              });
            let { latestValues: a, renderState: l } = s;
            (this.latestValues = a),
              (this.baseTarget = { ...a }),
              (this.initialValues = t.initial ? { ...a } : {}),
              (this.renderState = l),
              (this.parent = e),
              (this.props = t),
              (this.presenceContext = i),
              (this.depth = e ? e.depth + 1 : 0),
              (this.reducedMotionConfig = n),
              (this.options = o),
              (this.blockInitialAnimation = !!r),
              (this.isControllingVariants = ss(t)),
              (this.isVariantNode = so(t)),
              this.isVariantNode && (this.variantChildren = new Set()),
              (this.manuallyAnimateOnMount = !!(e && e.current));
            let { willChange: u, ...h } = this.scrapeMotionValuesFromProps(
              t,
              {},
              this
            );
            for (let e in h) {
              let t = h[e];
              void 0 !== a[e] && ty(t) && t.set(a[e], !1);
            }
          }
          mount(e) {
            (this.current = e),
              s0.set(e, this),
              this.projection &&
                !this.projection.instance &&
                this.projection.mount(e),
              this.parent &&
                this.isVariantNode &&
                !this.isControllingVariants &&
                (this.removeFromVariantTree =
                  this.parent.addVariantChild(this)),
              this.values.forEach((e, t) => this.bindToMotionValue(t, e)),
              sJ.current ||
                (function () {
                  if (((sJ.current = !0), e7))
                    if (window.matchMedia) {
                      let e = window.matchMedia('(prefers-reduced-motion)'),
                        t = () => (sQ.current = e.matches);
                      e.addListener(t), t();
                    } else sQ.current = !1;
                })(),
              (this.shouldReduceMotion =
                'never' !== this.reducedMotionConfig &&
                ('always' === this.reducedMotionConfig || sQ.current)),
              this.parent && this.parent.children.add(this),
              this.update(this.props, this.presenceContext);
          }
          unmount() {
            for (let e in (this.projection && this.projection.unmount(),
            w(this.notifyUpdate),
            w(this.render),
            this.valueSubscriptions.forEach((e) => e()),
            this.valueSubscriptions.clear(),
            this.removeFromVariantTree && this.removeFromVariantTree(),
            this.parent && this.parent.children.delete(this),
            this.events))
              this.events[e].clear();
            for (let e in this.features) {
              let t = this.features[e];
              t && (t.unmount(), (t.isMounted = !1));
            }
            this.current = null;
          }
          bindToMotionValue(e, t) {
            let i;
            this.valueSubscriptions.has(e) && this.valueSubscriptions.get(e)();
            let n = tp.has(e);
            n && this.onBindTransform && this.onBindTransform();
            let r = t.on('change', (t) => {
                (this.latestValues[e] = t),
                  this.props.onUpdate && P.preRender(this.notifyUpdate),
                  n &&
                    this.projection &&
                    (this.projection.isTransformDirty = !0);
              }),
              s = t.on('renderRequest', this.scheduleRender);
            window.MotionCheckAppearSync &&
              (i = window.MotionCheckAppearSync(this, e, t)),
              this.valueSubscriptions.set(e, () => {
                r(), s(), i && i(), t.owner && t.stop();
              });
          }
          sortNodePosition(e) {
            return this.current &&
              this.sortInstanceNodePosition &&
              this.type === e.type
              ? this.sortInstanceNodePosition(this.current, e.current)
              : 0;
          }
          updateFeatures() {
            let e = 'animation';
            for (e in su) {
              let t = su[e];
              if (!t) continue;
              let { isEnabled: i, Feature: n } = t;
              if (
                (!this.features[e] &&
                  n &&
                  i(this.props) &&
                  (this.features[e] = new n(this)),
                this.features[e])
              ) {
                let t = this.features[e];
                t.isMounted ? t.update() : (t.mount(), (t.isMounted = !0));
              }
            }
          }
          triggerBuild() {
            this.build(this.renderState, this.latestValues, this.props);
          }
          measureViewportBox() {
            return this.current
              ? this.measureInstanceViewportBox(this.current, this.props)
              : nc();
          }
          getStaticValue(e) {
            return this.latestValues[e];
          }
          setStaticValue(e, t) {
            this.latestValues[e] = t;
          }
          update(e, t) {
            (e.transformTemplate || this.props.transformTemplate) &&
              this.scheduleRender(),
              (this.prevProps = this.props),
              (this.props = e),
              (this.prevPresenceContext = this.presenceContext),
              (this.presenceContext = t);
            for (let t = 0; t < s1.length; t++) {
              let i = s1[t];
              this.propEventSubscriptions[i] &&
                (this.propEventSubscriptions[i](),
                delete this.propEventSubscriptions[i]);
              let n = e['on' + i];
              n && (this.propEventSubscriptions[i] = this.on(i, n));
            }
            (this.prevMotionValues = (function (e, t, i) {
              for (let n in t) {
                let r = t[n],
                  s = i[n];
                if (ty(r)) e.addValue(n, r);
                else if (ty(s)) e.addValue(n, C(r, { owner: e }));
                else if (s !== r)
                  if (e.hasValue(n)) {
                    let t = e.getValue(n);
                    !0 === t.liveStyle ? t.jump(r) : t.hasAnimated || t.set(r);
                  } else {
                    let t = e.getStaticValue(n);
                    e.addValue(n, C(void 0 !== t ? t : r, { owner: e }));
                  }
              }
              for (let n in i) void 0 === t[n] && e.removeValue(n);
              return t;
            })(
              this,
              this.scrapeMotionValuesFromProps(e, this.prevProps, this),
              this.prevMotionValues
            )),
              this.handleChildMotionValue && this.handleChildMotionValue();
          }
          getProps() {
            return this.props;
          }
          getVariant(e) {
            return this.props.variants ? this.props.variants[e] : void 0;
          }
          getDefaultTransition() {
            return this.props.transition;
          }
          getTransformPagePoint() {
            return this.props.transformPagePoint;
          }
          getClosestVariantNode() {
            return this.isVariantNode
              ? this
              : this.parent
              ? this.parent.getClosestVariantNode()
              : void 0;
          }
          addVariantChild(e) {
            let t = this.getClosestVariantNode();
            if (t)
              return (
                t.variantChildren && t.variantChildren.add(e),
                () => t.variantChildren.delete(e)
              );
          }
          addValue(e, t) {
            let i = this.values.get(e);
            t !== i &&
              (i && this.removeValue(e),
              this.bindToMotionValue(e, t),
              this.values.set(e, t),
              (this.latestValues[e] = t.get()));
          }
          removeValue(e) {
            this.values.delete(e);
            let t = this.valueSubscriptions.get(e);
            t && (t(), this.valueSubscriptions.delete(e)),
              delete this.latestValues[e],
              this.removeValueFromRenderState(e, this.renderState);
          }
          hasValue(e) {
            return this.values.has(e);
          }
          getValue(e, t) {
            if (this.props.values && this.props.values[e])
              return this.props.values[e];
            let i = this.values.get(e);
            return (
              void 0 === i &&
                void 0 !== t &&
                ((i = C(null === t ? void 0 : t, { owner: this })),
                this.addValue(e, i)),
              i
            );
          }
          readValue(e, t) {
            let i =
              void 0 === this.latestValues[e] && this.current
                ? this.getBaseTargetFromProps(this.props, e) ??
                  this.readValueFromInstance(this.current, e, this.options)
                : this.latestValues[e];
            return (
              null != i &&
                ('string' == typeof i && (sN(i) || sU(i))
                  ? (i = parseFloat(i))
                  : !sZ(i) && e_.test(t) && (i = sq(e, t)),
                this.setBaseTarget(e, ty(i) ? i.get() : i)),
              ty(i) ? i.get() : i
            );
          }
          setBaseTarget(e, t) {
            this.baseTarget[e] = t;
          }
          getBaseTarget(e) {
            let t,
              { initial: i } = this.props;
            if ('string' == typeof i || 'object' == typeof i) {
              let n = tu(this.props, i, this.presenceContext?.custom);
              n && (t = n[e]);
            }
            if (i && void 0 !== t) return t;
            let n = this.getBaseTargetFromProps(this.props, e);
            return void 0 === n || ty(n)
              ? void 0 !== this.initialValues[e] && void 0 === t
                ? void 0
                : this.baseTarget[e]
              : n;
          }
          on(e, t) {
            return (
              this.events[e] || (this.events[e] = new f()),
              this.events[e].add(t)
            );
          }
          notify(e, ...t) {
            this.events[e] && this.events[e].notify(...t);
          }
        }
        class s3 extends s2 {
          constructor() {
            super(...arguments), (this.KeyframeResolver = sG);
          }
          sortInstanceNodePosition(e, t) {
            return 2 & e.compareDocumentPosition(t) ? 1 : -1;
          }
          getBaseTargetFromProps(e, t) {
            return e.style ? e.style[t] : void 0;
          }
          removeValueFromRenderState(e, { vars: t, style: i }) {
            delete t[e], delete i[e];
          }
          handleChildMotionValue() {
            this.childSubscription &&
              (this.childSubscription(), delete this.childSubscription);
            let { children: e } = this.props;
            ty(e) &&
              (this.childSubscription = e.on('change', (e) => {
                this.current && (this.current.textContent = `${e}`);
              }));
          }
        }
        function s5(e, { style: t, vars: i }, n, r) {
          for (let s in (Object.assign(
            e.style,
            t,
            r && r.getProjectionStyles(n)
          ),
          i))
            e.style.setProperty(s, i[s]);
        }
        class s4 extends s3 {
          constructor() {
            super(...arguments),
              (this.type = 'html'),
              (this.renderInstance = s5);
          }
          readValueFromInstance(e, t) {
            if (tp.has(t))
              return this.projection?.isProjecting ? io(t) : il(e, t);
            {
              let i = window.getComputedStyle(e),
                n = (Q(t) ? i.getPropertyValue(t) : i[t]) || 0;
              return 'string' == typeof n ? n.trim() : n;
            }
          }
          measureInstanceViewportBox(e, { transformPagePoint: t }) {
            return nE(e, t);
          }
          build(e, t, i) {
            sy(e, t, i.transformTemplate);
          }
          scrapeMotionValuesFromProps(e, t, i) {
            return s_(e, t, i);
          }
        }
        let s9 = new Set([
          'baseFrequency',
          'diffuseConstant',
          'kernelMatrix',
          'kernelUnitLength',
          'keySplines',
          'keyTimes',
          'limitingConeAngle',
          'markerHeight',
          'markerWidth',
          'numOctaves',
          'targetX',
          'targetY',
          'surfaceScale',
          'specularConstant',
          'specularExponent',
          'stdDeviation',
          'tableValues',
          'viewBox',
          'gradientTransform',
          'pathLength',
          'startOffset',
          'textLength',
          'lengthAdjust',
        ]);
        class s6 extends s3 {
          constructor() {
            super(...arguments),
              (this.type = 'svg'),
              (this.isSVGTag = !1),
              (this.measureInstanceViewportBox = nc);
          }
          getBaseTargetFromProps(e, t) {
            return e[t];
          }
          readValueFromInstance(e, t) {
            if (tp.has(t)) {
              let e = sH(t);
              return (e && e.default) || 0;
            }
            return (t = s9.has(t) ? t : tx(t)), e.getAttribute(t);
          }
          scrapeMotionValuesFromProps(e, t, i) {
            return sk(e, t, i);
          }
          build(e, t, i) {
            sw(e, t, this.isSVGTag, i.transformTemplate, i.style);
          }
          renderInstance(e, t, i, n) {
            for (let i in (s5(e, t, void 0, n), t.attrs))
              e.setAttribute(s9.has(i) ? i : tx(i), t.attrs[i]);
          }
          mount(e) {
            (this.isSVGTag = sT(e.tagName)), super.mount(e);
          }
        }
        let s8 = (function (e) {
            if ('undefined' == typeof Proxy) return e;
            let t = new Map();
            return new Proxy((...t) => e(...t), {
              get: (i, n) =>
                'create' === n ? e : (t.has(n) || t.set(n, e(n)), t.get(n)),
            });
          })(
            ((o = {
              animation: { Feature: i2 },
              exit: { Feature: i5 },
              inView: { Feature: si },
              tap: { Feature: r9 },
              focus: { Feature: rZ },
              hover: { Feature: rK },
              pan: { Feature: nB },
              drag: { Feature: nF, ProjectionNode: rH, MeasureLayout: nZ },
              layout: { ProjectionNode: rH, MeasureLayout: nZ },
            }),
            (a = (e, t) =>
              sj(e)
                ? new s6(t)
                : new s4(t, { allowProjection: e !== c.Fragment })),
            function (
              e,
              { forwardMotionProps: t } = { forwardMotionProps: !1 }
            ) {
              return (function ({
                preloadedFeatures: e,
                createVisualElement: t,
                useRender: i,
                useVisualState: n,
                Component: r,
              }) {
                function s(e, s) {
                  var o, a, u;
                  let h,
                    d = {
                      ...(0, c.useContext)(tn),
                      ...e,
                      layoutId: (function ({ layoutId: e }) {
                        let t = (0, c.useContext)(nW).id;
                        return t && void 0 !== e ? t + '-' + e : e;
                      })(e),
                    },
                    { isStatic: p } = d,
                    f = (function (e) {
                      let { initial: t, animate: i } = (function (e, t) {
                        if (ss(e)) {
                          let { initial: t, animate: i } = e;
                          return {
                            initial: !1 === t || iq(t) ? t : void 0,
                            animate: iq(i) ? i : void 0,
                          };
                        }
                        return !1 !== e.inherit ? t : {};
                      })(e, (0, c.useContext)(sr));
                      return (0, c.useMemo)(
                        () => ({ initial: t, animate: i }),
                        [sa(t), sa(i)]
                      );
                    })(e),
                    m = n(e, p);
                  if (!p && e7) {
                    (a = 0), (u = 0), (0, c.useContext)(sn).strict;
                    let e = (function (e) {
                      let { drag: t, layout: i } = su;
                      if (!t && !i) return {};
                      let n = { ...t, ...i };
                      return {
                        MeasureLayout:
                          t?.isEnabled(e) || i?.isEnabled(e)
                            ? n.MeasureLayout
                            : void 0,
                        ProjectionNode: n.ProjectionNode,
                      };
                    })(d);
                    (h = e.MeasureLayout),
                      (f.visualElement = (function (e, t, i, n, r) {
                        let { visualElement: s } = (0, c.useContext)(sr),
                          o = (0, c.useContext)(sn),
                          a = (0, c.useContext)(nz),
                          l = (0, c.useContext)(tn).reducedMotion,
                          u = (0, c.useRef)(null);
                        (n = n || o.renderer),
                          !u.current &&
                            n &&
                            (u.current = n(e, {
                              visualState: t,
                              parent: s,
                              props: i,
                              presenceContext: a,
                              blockInitialAnimation: !!a && !1 === a.initial,
                              reducedMotionConfig: l,
                            }));
                        let h = u.current,
                          d = (0, c.useContext)(nX);
                        h &&
                          !h.projection &&
                          r &&
                          ('html' === h.type || 'svg' === h.type) &&
                          (function (e, t, i, n) {
                            let {
                              layoutId: r,
                              layout: s,
                              drag: o,
                              dragConstraints: a,
                              layoutScroll: l,
                              layoutRoot: u,
                              layoutCrossfade: h,
                            } = t;
                            (e.projection = new i(
                              e.latestValues,
                              t['data-framer-portal-id']
                                ? void 0
                                : (function e(t) {
                                    if (t)
                                      return !1 !== t.options.allowProjection
                                        ? t.projection
                                        : e(t.parent);
                                  })(e.parent)
                            )),
                              e.projection.setOptions({
                                layoutId: r,
                                layout: s,
                                alwaysMeasureLayout: !!o || (a && nS(a)),
                                visualElement: e,
                                animationType:
                                  'string' == typeof s ? s : 'both',
                                initialPromotionConfig: n,
                                crossfade: h,
                                layoutScroll: l,
                                layoutRoot: u,
                              });
                          })(u.current, i, r, d);
                        let p = (0, c.useRef)(!1);
                        (0, c.useInsertionEffect)(() => {
                          h && p.current && h.update(i, a);
                        });
                        let f = i[tb],
                          m = (0, c.useRef)(
                            !!f &&
                              !window.MotionHandoffIsComplete?.(f) &&
                              window.MotionHasOptimisedAnimation?.(f)
                          );
                        return (
                          te(() => {
                            h &&
                              ((p.current = !0),
                              (window.MotionIsMounted = !0),
                              h.updateFeatures(),
                              n$.render(h.render),
                              m.current &&
                                h.animationState &&
                                h.animationState.animateChanges());
                          }),
                          (0, c.useEffect)(() => {
                            h &&
                              (!m.current &&
                                h.animationState &&
                                h.animationState.animateChanges(),
                              m.current &&
                                (queueMicrotask(() => {
                                  window.MotionHandoffMarkAsComplete?.(f);
                                }),
                                (m.current = !1)));
                          }),
                          h
                        );
                      })(r, m, d, t, e.ProjectionNode));
                  }
                  return (0, l.jsxs)(sr.Provider, {
                    value: f,
                    children: [
                      h && f.visualElement
                        ? (0, l.jsx)(h, {
                            visualElement: f.visualElement,
                            ...d,
                          })
                        : null,
                      i(
                        r,
                        e,
                        ((o = f.visualElement),
                        (0, c.useCallback)(
                          (e) => {
                            e && m.onMount && m.onMount(e),
                              o && (e ? o.mount(e) : o.unmount()),
                              s &&
                                ('function' == typeof s
                                  ? s(e)
                                  : nS(s) && (s.current = e));
                          },
                          [o]
                        )),
                        m,
                        p,
                        f.visualElement
                      ),
                    ],
                  });
                }
                e &&
                  (function (e) {
                    for (let t in e) su[t] = { ...su[t], ...e[t] };
                  })(e),
                  (s.displayName = `motion.${
                    'string' == typeof r
                      ? r
                      : `create(${r.displayName ?? r.name ?? ''})`
                  }`);
                let o = (0, c.forwardRef)(s);
                return (o[sh] = r), o;
              })({
                ...(sj(e) ? sD : sO),
                preloadedFeatures: o,
                useRender: (function (e = !1) {
                  return (t, i, n, { latestValues: r }, s) => {
                    let o = (
                        sj(t)
                          ? function (e, t, i, n) {
                              let r = (0, c.useMemo)(() => {
                                let i = sE();
                                return (
                                  sw(i, t, sT(n), e.transformTemplate, e.style),
                                  { ...i.attrs, style: { ...i.style } }
                                );
                              }, [t]);
                              if (e.style) {
                                let t = {};
                                sx(t, e.style, e),
                                  (r.style = { ...t, ...r.style });
                              }
                              return r;
                            }
                          : function (e, t) {
                              let i = {},
                                n = (function (e, t) {
                                  let i = e.style || {},
                                    n = {};
                                  return (
                                    sx(n, i, e),
                                    Object.assign(
                                      n,
                                      (function ({ transformTemplate: e }, t) {
                                        return (0, c.useMemo)(() => {
                                          let i = sv();
                                          return (
                                            sy(i, t, e),
                                            Object.assign({}, i.vars, i.style)
                                          );
                                        }, [t]);
                                      })(e, t)
                                    ),
                                    n
                                  );
                                })(e, t);
                              return (
                                e.drag &&
                                  !1 !== e.dragListener &&
                                  ((i.draggable = !1),
                                  (n.userSelect =
                                    n.WebkitUserSelect =
                                    n.WebkitTouchCallout =
                                      'none'),
                                  (n.touchAction =
                                    !0 === e.drag
                                      ? 'none'
                                      : `pan-${'x' === e.drag ? 'y' : 'x'}`)),
                                void 0 === e.tabIndex &&
                                  (e.onTap || e.onTapStart || e.whileTap) &&
                                  (i.tabIndex = 0),
                                (i.style = n),
                                i
                              );
                            }
                      )(i, r, s, t),
                      a = (function (e, t, i) {
                        let n = {};
                        for (let r in e)
                          ('values' !== r || 'object' != typeof e.values) &&
                            (sR(r) ||
                              (!0 === i && sA(r)) ||
                              (!t && !sA(r)) ||
                              (e.draggable && r.startsWith('onDrag'))) &&
                            (n[r] = e[r]);
                        return n;
                      })(i, 'string' == typeof t, e),
                      l = t !== c.Fragment ? { ...a, ...o, ref: n } : {},
                      { children: u } = i,
                      h = (0, c.useMemo)(() => (ty(u) ? u.get() : u), [u]);
                    return (0, c.createElement)(t, { ...l, children: h });
                  };
                })(t),
                createVisualElement: a,
                Component: e,
              });
            })
          ),
          s7 = { some: 0, all: 1 };
        function oe(e, t) {
          [...t].reverse().forEach((i) => {
            let n = e.getVariant(i);
            n && tg(e, n),
              e.variantChildren &&
                e.variantChildren.forEach((e) => {
                  oe(e, t);
                });
          });
        }
        function ot() {
          let e = !1,
            t = new Set(),
            i = {
              subscribe: (e) => (t.add(e), () => void t.delete(e)),
              start(i, n) {
                O(
                  e,
                  'controls.start() should only be called after a component has mounted. Consider calling within a useEffect hook.'
                );
                let r = [];
                return (
                  t.forEach((e) => {
                    r.push(iX(e, i, { transitionOverride: n }));
                  }),
                  Promise.all(r)
                );
              },
              set: (i) => (
                O(
                  e,
                  'controls.set() should only be called after a component has mounted. Consider calling within a useEffect hook.'
                ),
                t.forEach((e) => {
                  var t, n;
                  (t = e),
                    Array.isArray((n = i))
                      ? oe(t, n)
                      : 'string' == typeof n
                      ? oe(t, [n])
                      : tg(t, n);
                })
              ),
              stop() {
                t.forEach((e) => {
                  e.values.forEach((e) => e.stop());
                });
              },
              mount: () => (
                (e = !0),
                () => {
                  (e = !1), i.stop();
                }
              ),
            };
          return i;
        }
        let oi = function () {
          let e = e8(ot);
          return te(e.mount, []), e;
        };
        function on({ children: e, id: t, className: i = '' }) {
          let n = (0, c.useRef)(null);
          !(function (
            e,
            {
              root: t,
              margin: i,
              amount: n,
              once: r = !1,
              initial: s = !1,
            } = {}
          ) {
            let [o, a] = (0, c.useState)(s);
            (0, c.useEffect)(() => {
              if (!e.current || (r && o)) return;
              let s = {
                root: (t && t.current) || void 0,
                margin: i,
                amount: n,
              };
              return (function (
                e,
                t,
                { root: i, margin: n, amount: r = 'some' } = {}
              ) {
                let s = N(e),
                  o = new WeakMap(),
                  a = new IntersectionObserver(
                    (e) => {
                      e.forEach((e) => {
                        let i = o.get(e.target);
                        if (!!i !== e.isIntersecting)
                          if (e.isIntersecting) {
                            let i = t(e.target, e);
                            'function' == typeof i
                              ? o.set(e.target, i)
                              : a.unobserve(e.target);
                          } else
                            'function' == typeof i &&
                              (i(e), o.delete(e.target));
                      });
                    },
                    {
                      root: i,
                      rootMargin: n,
                      threshold: 'number' == typeof r ? r : s7[r],
                    }
                  );
                return s.forEach((e) => a.observe(e)), () => a.disconnect();
              })(e.current, () => (a(!0), r ? void 0 : () => a(!1)), s);
            }, [t, e, i, r, n]);
          })(n, { once: !0 });
          let r = oi();
          return (0, l.jsx)(s8.section, {
            id: t,
            ref: n,
            initial: { opacity: 0, y: 40 },
            animate: r,
            transition: { duration: 0.8, ease: 'easeOut' },
            className: `min-h-screen flex flex-col justify-center items-center px-8 sm:px-20 py-16 gap-6 ${i}`,
            children: e,
          });
        }
        function or({ name: e, role: t, linkedin: i, email: n }) {
          return (0, l.jsxs)('li', {
            className:
              'flex flex-col items-center bg-[#181818] rounded-xl p-6 gap-2 shadow-md w-full',
            children: [
              (0, l.jsx)('div', {
                className:
                  'w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-2xl font-bold text-white mb-2',
                children: e[0],
              }),
              (0, l.jsx)('div', {
                className:
                  'text-xl font-semibold max-w-full whitespace-nowrap overflow-x-auto',
                children: e,
              }),
              (0, l.jsx)('div', {
                className: 'text-gray-400 text-sm',
                children: t,
              }),
              (0, l.jsxs)('div', {
                className: 'flex gap-3 mt-2',
                children: [
                  i &&
                    (0, l.jsx)('a', {
                      href: i,
                      target: '_blank',
                      rel: 'noopener noreferrer',
                      className: 'text-blue-400 hover:text-blue-600 underline',
                      children: 'LinkedIn',
                    }),
                  n &&
                    (0, l.jsx)('a', {
                      href: `mailto:${n}`,
                      className: 'text-blue-300 hover:text-blue-500 underline',
                      children: 'Email',
                    }),
                ],
              }),
            ],
          });
        }
        function os() {
          let e = (0, c.useRef)(null),
            { scrollY: t } = (function ({
              container: e,
              target: t,
              layoutEffect: i = !0,
              ...n
            } = {}) {
              let r = e8(ti);
              return (
                (i ? te : c.useEffect)(
                  () => (
                    tt('target', t),
                    tt('container', e),
                    (function (
                      e,
                      {
                        axis: t = 'y',
                        container: i = document.scrollingElement,
                        ...n
                      } = {}
                    ) {
                      var r, s;
                      if (!i) return y;
                      let o = { axis: t, container: i, ...n };
                      return 'function' == typeof e
                        ? ((r = e),
                          (s = o),
                          2 === r.length
                            ? e4((e) => {
                                r(e[s.axis].progress, e);
                              }, s)
                            : k(r, e6(s)))
                        : (function (e, t) {
                            let i = e6(t);
                            return e.attachTimeline({
                              timeline: t.target ? void 0 : i,
                              observe: (e) => (
                                e.pause(),
                                k((t) => {
                                  e.time = e.duration * t;
                                }, i)
                              ),
                            });
                          })(e, o);
                    })(
                      (e, { x: t, y: i }) => {
                        r.scrollX.set(t.current),
                          r.scrollXProgress.set(t.progress),
                          r.scrollY.set(i.current),
                          r.scrollYProgress.set(i.progress);
                      },
                      {
                        ...n,
                        container: e?.current || void 0,
                        target: t?.current || void 0,
                      }
                    )
                  ),
                  [e, t, JSON.stringify(n.offset)]
                ),
                r
              );
            })(),
            i = ts(t, [0, 300], [1, 0.6]),
            n = ts(t, [0, 300], [1, 0.3]);
          return (0, l.jsxs)('div', {
            className:
              'scroll-smooth font-[family-name:var(--font-geist-sans)]   text-white',
            children: [
              (0, l.jsxs)('section', {
                ref: e,
                className:
                  'min-h-screen flex flex-col justify-center items-center gap-12 transition-colors duration-700',
                children: [
                  (0, l.jsx)(s8.div, {
                    style: { scale: i, opacity: n },
                    children: (0, l.jsx)(h(), {
                      className: 'invert transition duration-700',
                      src: '/clearMainLogoCirrica.png',
                      alt: 'Cirrica Logo',
                      width: 720,
                      height: 152,
                      priority: !0,
                    }),
                  }),
                  (0, l.jsx)('div', {
                    className: 'animate-bounce mt-10',
                    children: (0, l.jsx)('a', {
                      href: '#about',
                      'aria-label': 'Scroll to About',
                      children: (0, l.jsx)('svg', {
                        className: 'w-8 h-8',
                        fill: 'none',
                        stroke: 'currentColor',
                        strokeWidth: 2,
                        viewBox: '0 0 24 24',
                        children: (0, l.jsx)('path', {
                          strokeLinecap: 'round',
                          strokeLinejoin: 'round',
                          d: 'M19 9l-7 7-7-7',
                        }),
                      }),
                    }),
                  }),
                ],
              }),
              (0, l.jsxs)(on, {
                id: 'about',
                className: '  text-white',
                children: [
                  (0, l.jsx)('h2', {
                    className: 'text-4xl font-semibold mb-4',
                    children: 'About Us',
                  }),
                  (0, l.jsx)('p', { children: 'we are very cool guys' }),
                ],
              }),
              (0, l.jsxs)(on, {
                id: 'founders',
                className: '  text-white',
                children: [
                  (0, l.jsx)('h2', {
                    className: 'text-4xl font-semibold mb-4',
                    children: 'Meet the Founders',
                  }),
                  (0, l.jsx)('ul', {
                    className:
                      'flex flex-col sm:flex-row gap-8 justify-center items-stretch w-full max-w-4xl',
                    children: [
                      {
                        name: 'Simeon Maman',
                        role: 'CEO & Founder',
                        linkedin:
                          'https://www.linkedin.com/in/simeon-maman-8349b62a9/',
                        email: 'simeon@cirrica.com',
                      },
                      {
                        name: 'Anthony Kercher',
                        role: 'CTO & Co-founder',
                        linkedin: 'https://linkedin.com/in/anthonykercher/',
                        email: 'anthony@cirrica.com',
                      },
                      {
                        name: 'George Paraskuvopoulus',
                        role: 'COO & Co-founder',
                        linkedin:
                          'https://www.linkedin.com/in/george-paraskevopoulos-00b233369/',
                        email: 'george@cirrica.com',
                      },
                    ].map((e) => (0, l.jsx)(or, { ...e }, e.email)),
                  }),
                ],
              }),
              'Contact Section',
            ],
          });
        }
      },
      440: (e, t, i) => {
        'use strict';
        i.r(t), i.d(t, { default: () => r });
        var n = i(1658);
        let r = async (e) => [
          {
            type: 'image/x-icon',
            sizes: '16x16',
            url:
              (0, n.fillMetadataSegment)('.', await e.params, 'favicon.ico') +
              '',
          },
        ];
      },
      512: (e, t, i) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          !(function (e, t) {
            for (var i in t)
              Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
          })(t, {
            default: function () {
              return m;
            },
            defaultHead: function () {
              return c;
            },
          });
        let n = i(4985),
          r = i(740),
          s = i(687),
          o = r._(i(3210)),
          a = n._(i(7755)),
          l = i(4959),
          u = i(9513),
          h = i(4604);
        function c(e) {
          void 0 === e && (e = !1);
          let t = [(0, s.jsx)('meta', { charSet: 'utf-8' }, 'charset')];
          return (
            e ||
              t.push(
                (0, s.jsx)(
                  'meta',
                  { name: 'viewport', content: 'width=device-width' },
                  'viewport'
                )
              ),
            t
          );
        }
        function d(e, t) {
          return 'string' == typeof t || 'number' == typeof t
            ? e
            : t.type === o.default.Fragment
            ? e.concat(
                o.default.Children.toArray(t.props.children).reduce(
                  (e, t) =>
                    'string' == typeof t || 'number' == typeof t
                      ? e
                      : e.concat(t),
                  []
                )
              )
            : e.concat(t);
        }
        i(148);
        let p = ['name', 'httpEquiv', 'charSet', 'itemProp'];
        function f(e, t) {
          let { inAmpMode: i } = t;
          return e
            .reduce(d, [])
            .reverse()
            .concat(c(i).reverse())
            .filter(
              (function () {
                let e = new Set(),
                  t = new Set(),
                  i = new Set(),
                  n = {};
                return (r) => {
                  let s = !0,
                    o = !1;
                  if (
                    r.key &&
                    'number' != typeof r.key &&
                    r.key.indexOf('$') > 0
                  ) {
                    o = !0;
                    let t = r.key.slice(r.key.indexOf('$') + 1);
                    e.has(t) ? (s = !1) : e.add(t);
                  }
                  switch (r.type) {
                    case 'title':
                    case 'base':
                      t.has(r.type) ? (s = !1) : t.add(r.type);
                      break;
                    case 'meta':
                      for (let e = 0, t = p.length; e < t; e++) {
                        let t = p[e];
                        if (r.props.hasOwnProperty(t))
                          if ('charSet' === t) i.has(t) ? (s = !1) : i.add(t);
                          else {
                            let e = r.props[t],
                              i = n[t] || new Set();
                            ('name' !== t || !o) && i.has(e)
                              ? (s = !1)
                              : (i.add(e), (n[t] = i));
                          }
                      }
                  }
                  return s;
                };
              })()
            )
            .reverse()
            .map((e, t) => {
              let n = e.key || t;
              if (
                process.env.__NEXT_OPTIMIZE_FONTS &&
                !i &&
                'link' === e.type &&
                e.props.href &&
                [
                  'https://fonts.googleapis.com/css',
                  'https://use.typekit.net/',
                ].some((t) => e.props.href.startsWith(t))
              ) {
                let t = { ...(e.props || {}) };
                return (
                  (t['data-href'] = t.href),
                  (t.href = void 0),
                  (t['data-optimized-fonts'] = !0),
                  o.default.cloneElement(e, t)
                );
              }
              return o.default.cloneElement(e, { key: n });
            });
        }
        let m = function (e) {
          let { children: t } = e,
            i = (0, o.useContext)(l.AmpStateContext),
            n = (0, o.useContext)(u.HeadManagerContext);
          return (0, s.jsx)(a.default, {
            reduceComponentsToState: f,
            headManager: n,
            inAmpMode: (0, h.isInAmpMode)(i),
            children: t,
          });
        };
        ('function' == typeof t.default ||
          ('object' == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, '__esModule', { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      554: (e, t) => {
        'use strict';
        function i(e) {
          return e.endsWith('/route');
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          Object.defineProperty(t, 'isAppRouteRoute', {
            enumerable: !0,
            get: function () {
              return i;
            },
          });
      },
      660: (e, t) => {
        'use strict';
        function i(e) {
          let t = 5381;
          for (let i = 0; i < e.length; i++)
            t = ((t << 5) + t + e.charCodeAt(i)) | 0;
          return t >>> 0;
        }
        function n(e) {
          return i(e).toString(36).slice(0, 5);
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          !(function (e, t) {
            for (var i in t)
              Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
          })(t, {
            djb2Hash: function () {
              return i;
            },
            hexHash: function () {
              return n;
            },
          });
      },
      846: (e) => {
        'use strict';
        e.exports = require('next/dist/compiled/next-server/app-page.runtime.prod.js');
      },
      1135: () => {},
      1261: (e, t, i) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          !(function (e, t) {
            for (var i in t)
              Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
          })(t, {
            default: function () {
              return l;
            },
            getImageProps: function () {
              return a;
            },
          });
        let n = i(4985),
          r = i(4953),
          s = i(6533),
          o = n._(i(1933));
        function a(e) {
          let { props: t } = (0, r.getImgProps)(e, {
            defaultLoader: o.default,
            imgConf: {
              deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
              imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
              path: '/_next/image',
              loader: 'default',
              dangerouslyAllowSVG: !1,
              unoptimized: !1,
            },
          });
          for (let [e, i] of Object.entries(t)) void 0 === i && delete t[e];
          return { props: t };
        }
        let l = s.Image;
      },
      1437: (e, t, i) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          !(function (e, t) {
            for (var i in t)
              Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
          })(t, {
            INTERCEPTION_ROUTE_MARKERS: function () {
              return r;
            },
            extractInterceptionRouteInformation: function () {
              return o;
            },
            isInterceptionRouteAppPath: function () {
              return s;
            },
          });
        let n = i(4722),
          r = ['(..)(..)', '(.)', '(..)', '(...)'];
        function s(e) {
          return (
            void 0 !== e.split('/').find((e) => r.find((t) => e.startsWith(t)))
          );
        }
        function o(e) {
          let t, i, s;
          for (let n of e.split('/'))
            if ((i = r.find((e) => n.startsWith(e)))) {
              [t, s] = e.split(i, 2);
              break;
            }
          if (!t || !i || !s)
            throw Object.defineProperty(
              Error(
                'Invalid interception route: ' +
                  e +
                  '. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>'
              ),
              '__NEXT_ERROR_CODE',
              { value: 'E269', enumerable: !1, configurable: !0 }
            );
          switch (((t = (0, n.normalizeAppPath)(t)), i)) {
            case '(.)':
              s = '/' === t ? '/' + s : t + '/' + s;
              break;
            case '(..)':
              if ('/' === t)
                throw Object.defineProperty(
                  Error(
                    'Invalid interception route: ' +
                      e +
                      '. Cannot use (..) marker at the root level, use (.) instead.'
                  ),
                  '__NEXT_ERROR_CODE',
                  { value: 'E207', enumerable: !1, configurable: !0 }
                );
              s = t.split('/').slice(0, -1).concat(s).join('/');
              break;
            case '(...)':
              s = '/' + s;
              break;
            case '(..)(..)':
              let o = t.split('/');
              if (o.length <= 2)
                throw Object.defineProperty(
                  Error(
                    'Invalid interception route: ' +
                      e +
                      '. Cannot use (..)(..) marker at the root level or one level up.'
                  ),
                  '__NEXT_ERROR_CODE',
                  { value: 'E486', enumerable: !1, configurable: !0 }
                );
              s = o.slice(0, -2).concat(s).join('/');
              break;
            default:
              throw Object.defineProperty(
                Error('Invariant: unexpected marker'),
                '__NEXT_ERROR_CODE',
                { value: 'E112', enumerable: !1, configurable: !0 }
              );
          }
          return { interceptingRoute: t, interceptedRoute: s };
        }
      },
      1480: (e, t) => {
        'use strict';
        function i(e) {
          let {
              widthInt: t,
              heightInt: i,
              blurWidth: n,
              blurHeight: r,
              blurDataURL: s,
              objectFit: o,
            } = e,
            a = n ? 40 * n : t,
            l = r ? 40 * r : i,
            u = a && l ? "viewBox='0 0 " + a + ' ' + l + "'" : '';
          return (
            "%3Csvg xmlns='http://www.w3.org/2000/svg' " +
            u +
            "%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='" +
            (u
              ? 'none'
              : 'contain' === o
              ? 'xMidYMid'
              : 'cover' === o
              ? 'xMidYMid slice'
              : 'none') +
            "' style='filter: url(%23b);' href='" +
            s +
            "'/%3E%3C/svg%3E"
          );
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          Object.defineProperty(t, 'getImageBlurSvg', {
            enumerable: !0,
            get: function () {
              return i;
            },
          });
      },
      1658: (e, t, i) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          !(function (e, t) {
            for (var i in t)
              Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
          })(t, {
            fillMetadataSegment: function () {
              return d;
            },
            normalizeMetadataPageToRoute: function () {
              return f;
            },
            normalizeMetadataRoute: function () {
              return p;
            },
          });
        let n = i(8304),
          r = (function (e) {
            return e && e.__esModule ? e : { default: e };
          })(i(8671)),
          s = i(6341),
          o = i(4396),
          a = i(660),
          l = i(4722),
          u = i(2958),
          h = i(5499);
        function c(e) {
          let t = r.default.dirname(e);
          if (e.endsWith('/sitemap')) return '';
          let i = '';
          return (
            t
              .split('/')
              .some(
                (e) =>
                  (0, h.isGroupSegment)(e) || (0, h.isParallelRouteSegment)(e)
              ) && (i = (0, a.djb2Hash)(t).toString(36).slice(0, 6)),
            i
          );
        }
        function d(e, t, i) {
          let n = (0, l.normalizeAppPath)(e),
            a = (0, o.getNamedRouteRegex)(n, { prefixRouteKeys: !1 }),
            h = (0, s.interpolateDynamicPath)(n, t, a),
            { name: d, ext: p } = r.default.parse(i),
            f = c(r.default.posix.join(e, d)),
            m = f ? `-${f}` : '';
          return (0, u.normalizePathSep)(r.default.join(h, `${d}${m}${p}`));
        }
        function p(e) {
          if (!(0, n.isMetadataPage)(e)) return e;
          let t = e,
            i = '';
          if (
            ('/robots' === e
              ? (t += '.txt')
              : '/manifest' === e
              ? (t += '.webmanifest')
              : (i = c(e)),
            !t.endsWith('/route'))
          ) {
            let { dir: e, name: n, ext: s } = r.default.parse(t);
            t = r.default.posix.join(e, `${n}${i ? `-${i}` : ''}${s}`, 'route');
          }
          return t;
        }
        function f(e, t) {
          let i = e.endsWith('/route'),
            n = i ? e.slice(0, -6) : e,
            r = n.endsWith('/sitemap') ? '.xml' : '';
          return (
            (t ? `${n}/[__metadata_id__]` : `${n}${r}`) + (i ? '/route' : '')
          );
        }
      },
      1933: (e, t) => {
        'use strict';
        function i(e) {
          var t;
          let { config: i, src: n, width: r, quality: s } = e,
            o =
              s ||
              (null == (t = i.qualities)
                ? void 0
                : t.reduce((e, t) =>
                    Math.abs(t - 75) < Math.abs(e - 75) ? t : e
                  )) ||
              75;
          return (
            i.path +
            '?url=' +
            encodeURIComponent(n) +
            '&w=' +
            r +
            '&q=' +
            o +
            (n.startsWith('/_next/static/media/'), '')
          );
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          Object.defineProperty(t, 'default', {
            enumerable: !0,
            get: function () {
              return n;
            },
          }),
          (i.__next_img_default = !0);
        let n = i;
      },
      2312: (e, t, i) => {
        Promise.resolve().then(i.t.bind(i, 6346, 23)),
          Promise.resolve().then(i.t.bind(i, 7924, 23)),
          Promise.resolve().then(i.t.bind(i, 5656, 23)),
          Promise.resolve().then(i.t.bind(i, 99, 23)),
          Promise.resolve().then(i.t.bind(i, 8243, 23)),
          Promise.resolve().then(i.t.bind(i, 8827, 23)),
          Promise.resolve().then(i.t.bind(i, 2763, 23)),
          Promise.resolve().then(i.t.bind(i, 7173, 23));
      },
      2437: (e, t, i) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          Object.defineProperty(t, 'getPathMatch', {
            enumerable: !0,
            get: function () {
              return r;
            },
          });
        let n = i(5362);
        function r(e, t) {
          let i = [],
            r = (0, n.pathToRegexp)(e, i, {
              delimiter: '/',
              sensitive:
                'boolean' == typeof (null == t ? void 0 : t.sensitive) &&
                t.sensitive,
              strict: null == t ? void 0 : t.strict,
            }),
            s = (0, n.regexpToFunction)(
              (null == t ? void 0 : t.regexModifier)
                ? new RegExp(t.regexModifier(r.source), r.flags)
                : r,
              i
            );
          return (e, n) => {
            if ('string' != typeof e) return !1;
            let r = s(e);
            if (!r) return !1;
            if (null == t ? void 0 : t.removeUnnamedParams)
              for (let e of i)
                'number' == typeof e.name && delete r.params[e.name];
            return { ...n, ...r.params };
          };
        }
      },
      2584: (e, t, i) => {
        Promise.resolve().then(i.t.bind(i, 6444, 23)),
          Promise.resolve().then(i.t.bind(i, 6042, 23)),
          Promise.resolve().then(i.t.bind(i, 8170, 23)),
          Promise.resolve().then(i.t.bind(i, 9477, 23)),
          Promise.resolve().then(i.t.bind(i, 9345, 23)),
          Promise.resolve().then(i.t.bind(i, 2089, 23)),
          Promise.resolve().then(i.t.bind(i, 6577, 23)),
          Promise.resolve().then(i.t.bind(i, 1307, 23));
      },
      2756: (e, t) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          !(function (e, t) {
            for (var i in t)
              Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
          })(t, {
            VALID_LOADERS: function () {
              return i;
            },
            imageConfigDefault: function () {
              return n;
            },
          });
        let i = ['default', 'imgix', 'cloudinary', 'akamai', 'custom'],
          n = {
            deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
            imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
            path: '/_next/image',
            loader: 'default',
            loaderFile: '',
            domains: [],
            disableStaticImages: !1,
            minimumCacheTTL: 60,
            formats: ['image/webp'],
            dangerouslyAllowSVG: !1,
            contentSecurityPolicy:
              "script-src 'none'; frame-src 'none'; sandbox;",
            contentDispositionType: 'attachment',
            localPatterns: void 0,
            remotePatterns: [],
            qualities: void 0,
            unoptimized: !1,
          };
      },
      2785: (e, t) => {
        'use strict';
        function i(e) {
          let t = {};
          for (let [i, n] of e.entries()) {
            let e = t[i];
            void 0 === e
              ? (t[i] = n)
              : Array.isArray(e)
              ? e.push(n)
              : (t[i] = [e, n]);
          }
          return t;
        }
        function n(e) {
          return 'string' == typeof e
            ? e
            : ('number' != typeof e || isNaN(e)) && 'boolean' != typeof e
            ? ''
            : String(e);
        }
        function r(e) {
          let t = new URLSearchParams();
          for (let [i, r] of Object.entries(e))
            if (Array.isArray(r)) for (let e of r) t.append(i, n(e));
            else t.set(i, n(r));
          return t;
        }
        function s(e) {
          for (
            var t = arguments.length, i = Array(t > 1 ? t - 1 : 0), n = 1;
            n < t;
            n++
          )
            i[n - 1] = arguments[n];
          for (let t of i) {
            for (let i of t.keys()) e.delete(i);
            for (let [i, n] of t.entries()) e.append(i, n);
          }
          return e;
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          !(function (e, t) {
            for (var i in t)
              Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
          })(t, {
            assign: function () {
              return s;
            },
            searchParamsToUrlQuery: function () {
              return i;
            },
            urlQueryToSearchParams: function () {
              return r;
            },
          });
      },
      2958: (e, t) => {
        'use strict';
        function i(e) {
          return e.replace(/\\/g, '/');
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          Object.defineProperty(t, 'normalizePathSep', {
            enumerable: !0,
            get: function () {
              return i;
            },
          });
      },
      3033: (e) => {
        'use strict';
        e.exports = require('next/dist/server/app-render/work-unit-async-storage.external.js');
      },
      3038: (e, t, i) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          Object.defineProperty(t, 'useMergedRef', {
            enumerable: !0,
            get: function () {
              return r;
            },
          });
        let n = i(3210);
        function r(e, t) {
          let i = (0, n.useRef)(null),
            r = (0, n.useRef)(null);
          return (0, n.useCallback)(
            (n) => {
              if (null === n) {
                let e = i.current;
                e && ((i.current = null), e());
                let t = r.current;
                t && ((r.current = null), t());
              } else e && (i.current = s(e, n)), t && (r.current = s(t, n));
            },
            [e, t]
          );
        }
        function s(e, t) {
          if ('function' != typeof e)
            return (
              (e.current = t),
              () => {
                e.current = null;
              }
            );
          {
            let i = e(t);
            return 'function' == typeof i ? i : () => e(null);
          }
        }
        ('function' == typeof t.default ||
          ('object' == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, '__esModule', { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      3293: (e, t) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          Object.defineProperty(t, 'escapeStringRegexp', {
            enumerable: !0,
            get: function () {
              return r;
            },
          });
        let i = /[|\\{}()[\]^$+*?.-]/,
          n = /[|\\{}()[\]^$+*?.-]/g;
        function r(e) {
          return i.test(e) ? e.replace(n, '\\$&') : e;
        }
      },
      3295: (e) => {
        'use strict';
        e.exports = require('next/dist/server/app-render/after-task-async-storage.external.js');
      },
      3736: (e, t, i) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          Object.defineProperty(t, 'parseRelativeUrl', {
            enumerable: !0,
            get: function () {
              return r;
            },
          }),
          i(4827);
        let n = i(2785);
        function r(e, t, i) {
          void 0 === i && (i = !0);
          let r = new URL('http://n'),
            s = t ? new URL(t, r) : e.startsWith('.') ? new URL('http://n') : r,
            {
              pathname: o,
              searchParams: a,
              search: l,
              hash: u,
              href: h,
              origin: c,
            } = new URL(e, s);
          if (c !== r.origin)
            throw Object.defineProperty(
              Error('invariant: invalid relative URL, router received ' + e),
              '__NEXT_ERROR_CODE',
              { value: 'E159', enumerable: !1, configurable: !0 }
            );
          return {
            pathname: o,
            query: i ? (0, n.searchParamsToUrlQuery)(a) : void 0,
            search: l,
            hash: u,
            href: h.slice(c.length),
          };
        }
      },
      3873: (e) => {
        'use strict';
        e.exports = require('path');
      },
      4232: () => {},
      4359: (e, t, i) => {
        Promise.resolve().then(i.bind(i, 362));
      },
      4396: (e, t, i) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          !(function (e, t) {
            for (var i in t)
              Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
          })(t, {
            getNamedMiddlewareRegex: function () {
              return m;
            },
            getNamedRouteRegex: function () {
              return f;
            },
            getRouteRegex: function () {
              return c;
            },
            parseParameter: function () {
              return l;
            },
          });
        let n = i(6143),
          r = i(1437),
          s = i(3293),
          o = i(2887),
          a = /^([^[]*)\[((?:\[[^\]]*\])|[^\]]+)\](.*)$/;
        function l(e) {
          let t = e.match(a);
          return t ? u(t[2]) : u(e);
        }
        function u(e) {
          let t = e.startsWith('[') && e.endsWith(']');
          t && (e = e.slice(1, -1));
          let i = e.startsWith('...');
          return i && (e = e.slice(3)), { key: e, repeat: i, optional: t };
        }
        function h(e, t, i) {
          let n = {},
            l = 1,
            h = [];
          for (let c of (0, o.removeTrailingSlash)(e).slice(1).split('/')) {
            let e = r.INTERCEPTION_ROUTE_MARKERS.find((e) => c.startsWith(e)),
              o = c.match(a);
            if (e && o && o[2]) {
              let { key: t, optional: i, repeat: r } = u(o[2]);
              (n[t] = { pos: l++, repeat: r, optional: i }),
                h.push('/' + (0, s.escapeStringRegexp)(e) + '([^/]+?)');
            } else if (o && o[2]) {
              let { key: e, repeat: t, optional: r } = u(o[2]);
              (n[e] = { pos: l++, repeat: t, optional: r }),
                i && o[1] && h.push('/' + (0, s.escapeStringRegexp)(o[1]));
              let a = t ? (r ? '(?:/(.+?))?' : '/(.+?)') : '/([^/]+?)';
              i && o[1] && (a = a.substring(1)), h.push(a);
            } else h.push('/' + (0, s.escapeStringRegexp)(c));
            t && o && o[3] && h.push((0, s.escapeStringRegexp)(o[3]));
          }
          return { parameterizedRoute: h.join(''), groups: n };
        }
        function c(e, t) {
          let {
              includeSuffix: i = !1,
              includePrefix: n = !1,
              excludeOptionalTrailingSlash: r = !1,
            } = void 0 === t ? {} : t,
            { parameterizedRoute: s, groups: o } = h(e, i, n),
            a = s;
          return r || (a += '(?:/)?'), { re: RegExp('^' + a + '$'), groups: o };
        }
        function d(e) {
          let t,
            {
              interceptionMarker: i,
              getSafeRouteKey: n,
              segment: r,
              routeKeys: o,
              keyPrefix: a,
              backreferenceDuplicateKeys: l,
            } = e,
            { key: h, optional: c, repeat: d } = u(r),
            p = h.replace(/\W/g, '');
          a && (p = '' + a + p);
          let f = !1;
          (0 === p.length || p.length > 30) && (f = !0),
            isNaN(parseInt(p.slice(0, 1))) || (f = !0),
            f && (p = n());
          let m = p in o;
          a ? (o[p] = '' + a + h) : (o[p] = h);
          let g = i ? (0, s.escapeStringRegexp)(i) : '';
          return (
            (t =
              m && l
                ? '\\k<' + p + '>'
                : d
                ? '(?<' + p + '>.+?)'
                : '(?<' + p + '>[^/]+?)'),
            c ? '(?:/' + g + t + ')?' : '/' + g + t
          );
        }
        function p(e, t, i, l, u) {
          let h,
            c =
              ((h = 0),
              () => {
                let e = '',
                  t = ++h;
                for (; t > 0; )
                  (e += String.fromCharCode(97 + ((t - 1) % 26))),
                    (t = Math.floor((t - 1) / 26));
                return e;
              }),
            p = {},
            f = [];
          for (let h of (0, o.removeTrailingSlash)(e).slice(1).split('/')) {
            let e = r.INTERCEPTION_ROUTE_MARKERS.some((e) => h.startsWith(e)),
              o = h.match(a);
            if (e && o && o[2])
              f.push(
                d({
                  getSafeRouteKey: c,
                  interceptionMarker: o[1],
                  segment: o[2],
                  routeKeys: p,
                  keyPrefix: t ? n.NEXT_INTERCEPTION_MARKER_PREFIX : void 0,
                  backreferenceDuplicateKeys: u,
                })
              );
            else if (o && o[2]) {
              l && o[1] && f.push('/' + (0, s.escapeStringRegexp)(o[1]));
              let e = d({
                getSafeRouteKey: c,
                segment: o[2],
                routeKeys: p,
                keyPrefix: t ? n.NEXT_QUERY_PARAM_PREFIX : void 0,
                backreferenceDuplicateKeys: u,
              });
              l && o[1] && (e = e.substring(1)), f.push(e);
            } else f.push('/' + (0, s.escapeStringRegexp)(h));
            i && o && o[3] && f.push((0, s.escapeStringRegexp)(o[3]));
          }
          return { namedParameterizedRoute: f.join(''), routeKeys: p };
        }
        function f(e, t) {
          var i, n, r;
          let s = p(
              e,
              t.prefixRouteKeys,
              null != (i = t.includeSuffix) && i,
              null != (n = t.includePrefix) && n,
              null != (r = t.backreferenceDuplicateKeys) && r
            ),
            o = s.namedParameterizedRoute;
          return (
            t.excludeOptionalTrailingSlash || (o += '(?:/)?'),
            { ...c(e, t), namedRegex: '^' + o + '$', routeKeys: s.routeKeys }
          );
        }
        function m(e, t) {
          let { parameterizedRoute: i } = h(e, !1, !1),
            { catchAll: n = !0 } = t;
          if ('/' === i) return { namedRegex: '^/' + (n ? '.*' : '') + '$' };
          let { namedParameterizedRoute: r } = p(e, !1, !1, !1, !1);
          return { namedRegex: '^' + r + (n ? '(?:(/.*)?)' : '') + '$' };
        }
      },
      4504: () => {},
      4604: (e, t) => {
        'use strict';
        function i(e) {
          let {
            ampFirst: t = !1,
            hybrid: i = !1,
            hasQuery: n = !1,
          } = void 0 === e ? {} : e;
          return t || (i && n);
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          Object.defineProperty(t, 'isInAmpMode', {
            enumerable: !0,
            get: function () {
              return i;
            },
          });
      },
      4722: (e, t, i) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          !(function (e, t) {
            for (var i in t)
              Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
          })(t, {
            normalizeAppPath: function () {
              return s;
            },
            normalizeRscURL: function () {
              return o;
            },
          });
        let n = i(5531),
          r = i(5499);
        function s(e) {
          return (0, n.ensureLeadingSlash)(
            e
              .split('/')
              .reduce(
                (e, t, i, n) =>
                  !t ||
                  (0, r.isGroupSegment)(t) ||
                  '@' === t[0] ||
                  (('page' === t || 'route' === t) && i === n.length - 1)
                    ? e
                    : e + '/' + t,
                ''
              )
          );
        }
        function o(e) {
          return e.replace(/\.rsc($|\?)/, '$1');
        }
      },
      4827: (e, t) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          !(function (e, t) {
            for (var i in t)
              Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
          })(t, {
            DecodeError: function () {
              return f;
            },
            MiddlewareNotFoundError: function () {
              return v;
            },
            MissingStaticPage: function () {
              return y;
            },
            NormalizeError: function () {
              return m;
            },
            PageNotFoundError: function () {
              return g;
            },
            SP: function () {
              return d;
            },
            ST: function () {
              return p;
            },
            WEB_VITALS: function () {
              return i;
            },
            execOnce: function () {
              return n;
            },
            getDisplayName: function () {
              return l;
            },
            getLocationOrigin: function () {
              return o;
            },
            getURL: function () {
              return a;
            },
            isAbsoluteUrl: function () {
              return s;
            },
            isResSent: function () {
              return u;
            },
            loadGetInitialProps: function () {
              return c;
            },
            normalizeRepeatedSlashes: function () {
              return h;
            },
            stringifyError: function () {
              return x;
            },
          });
        let i = ['CLS', 'FCP', 'FID', 'INP', 'LCP', 'TTFB'];
        function n(e) {
          let t,
            i = !1;
          return function () {
            for (var n = arguments.length, r = Array(n), s = 0; s < n; s++)
              r[s] = arguments[s];
            return i || ((i = !0), (t = e(...r))), t;
          };
        }
        let r = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/,
          s = (e) => r.test(e);
        function o() {
          let { protocol: e, hostname: t, port: i } = window.location;
          return e + '//' + t + (i ? ':' + i : '');
        }
        function a() {
          let { href: e } = window.location,
            t = o();
          return e.substring(t.length);
        }
        function l(e) {
          return 'string' == typeof e
            ? e
            : e.displayName || e.name || 'Unknown';
        }
        function u(e) {
          return e.finished || e.headersSent;
        }
        function h(e) {
          let t = e.split('?');
          return (
            t[0].replace(/\\/g, '/').replace(/\/\/+/g, '/') +
            (t[1] ? '?' + t.slice(1).join('?') : '')
          );
        }
        async function c(e, t) {
          let i = t.res || (t.ctx && t.ctx.res);
          if (!e.getInitialProps)
            return t.ctx && t.Component
              ? { pageProps: await c(t.Component, t.ctx) }
              : {};
          let n = await e.getInitialProps(t);
          if (i && u(i)) return n;
          if (!n)
            throw Object.defineProperty(
              Error(
                '"' +
                  l(e) +
                  '.getInitialProps()" should resolve to an object. But found "' +
                  n +
                  '" instead.'
              ),
              '__NEXT_ERROR_CODE',
              { value: 'E394', enumerable: !1, configurable: !0 }
            );
          return n;
        }
        let d = 'undefined' != typeof performance,
          p =
            d &&
            ['mark', 'measure', 'getEntriesByName'].every(
              (e) => 'function' == typeof performance[e]
            );
        class f extends Error {}
        class m extends Error {}
        class g extends Error {
          constructor(e) {
            super(),
              (this.code = 'ENOENT'),
              (this.name = 'PageNotFoundError'),
              (this.message = 'Cannot find module for page: ' + e);
          }
        }
        class y extends Error {
          constructor(e, t) {
            super(),
              (this.message =
                'Failed to load static file for page: ' + e + ' ' + t);
          }
        }
        class v extends Error {
          constructor() {
            super(),
              (this.code = 'ENOENT'),
              (this.message = 'Cannot find the middleware module');
          }
        }
        function x(e) {
          return JSON.stringify({ message: e.message, stack: e.stack });
        }
      },
      4953: (e, t, i) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          Object.defineProperty(t, 'getImgProps', {
            enumerable: !0,
            get: function () {
              return l;
            },
          }),
          i(148);
        let n = i(1480),
          r = i(2756),
          s = ['-moz-initial', 'fill', 'none', 'scale-down', void 0];
        function o(e) {
          return void 0 !== e.default;
        }
        function a(e) {
          return void 0 === e
            ? e
            : 'number' == typeof e
            ? Number.isFinite(e)
              ? e
              : NaN
            : 'string' == typeof e && /^[0-9]+$/.test(e)
            ? parseInt(e, 10)
            : NaN;
        }
        function l(e, t) {
          var i, l;
          let u,
            h,
            c,
            {
              src: d,
              sizes: p,
              unoptimized: f = !1,
              priority: m = !1,
              loading: g,
              className: y,
              quality: v,
              width: x,
              height: b,
              fill: P = !1,
              style: w,
              overrideSrc: E,
              onLoad: T,
              onLoadingComplete: S,
              placeholder: A = 'empty',
              blurDataURL: R,
              fetchPriority: M,
              decoding: j = 'async',
              layout: C,
              objectFit: _,
              objectPosition: O,
              lazyBoundary: k,
              lazyRoot: D,
              ...V
            } = e,
            {
              imgConf: L,
              showAltText: I,
              blurComplete: N,
              defaultLoader: F,
            } = t,
            U = L || r.imageConfigDefault;
          if ('allSizes' in U) u = U;
          else {
            let e = [...U.deviceSizes, ...U.imageSizes].sort((e, t) => e - t),
              t = U.deviceSizes.sort((e, t) => e - t),
              n = null == (i = U.qualities) ? void 0 : i.sort((e, t) => e - t);
            u = { ...U, allSizes: e, deviceSizes: t, qualities: n };
          }
          if (void 0 === F)
            throw Object.defineProperty(
              Error(
                'images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config'
              ),
              '__NEXT_ERROR_CODE',
              { value: 'E163', enumerable: !1, configurable: !0 }
            );
          let B = V.loader || F;
          delete V.loader, delete V.srcSet;
          let $ = '__next_img_default' in B;
          if ($) {
            if ('custom' === u.loader)
              throw Object.defineProperty(
                Error(
                  'Image with src "' +
                    d +
                    '" is missing "loader" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader'
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E252', enumerable: !1, configurable: !0 }
              );
          } else {
            let e = B;
            B = (t) => {
              let { config: i, ...n } = t;
              return e(n);
            };
          }
          if (C) {
            'fill' === C && (P = !0);
            let e = {
              intrinsic: { maxWidth: '100%', height: 'auto' },
              responsive: { width: '100%', height: 'auto' },
            }[C];
            e && (w = { ...w, ...e });
            let t = { responsive: '100vw', fill: '100vw' }[C];
            t && !p && (p = t);
          }
          let z = '',
            W = a(x),
            X = a(b);
          if ((l = d) && 'object' == typeof l && (o(l) || void 0 !== l.src)) {
            let e = o(d) ? d.default : d;
            if (!e.src)
              throw Object.defineProperty(
                Error(
                  'An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received ' +
                    JSON.stringify(e)
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E460', enumerable: !1, configurable: !0 }
              );
            if (!e.height || !e.width)
              throw Object.defineProperty(
                Error(
                  'An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received ' +
                    JSON.stringify(e)
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E48', enumerable: !1, configurable: !0 }
              );
            if (
              ((h = e.blurWidth),
              (c = e.blurHeight),
              (R = R || e.blurDataURL),
              (z = e.src),
              !P)
            )
              if (W || X) {
                if (W && !X) {
                  let t = W / e.width;
                  X = Math.round(e.height * t);
                } else if (!W && X) {
                  let t = X / e.height;
                  W = Math.round(e.width * t);
                }
              } else (W = e.width), (X = e.height);
          }
          let H = !m && ('lazy' === g || void 0 === g);
          (!(d = 'string' == typeof d ? d : z) ||
            d.startsWith('data:') ||
            d.startsWith('blob:')) &&
            ((f = !0), (H = !1)),
            u.unoptimized && (f = !0),
            $ &&
              !u.dangerouslyAllowSVG &&
              d.split('?', 1)[0].endsWith('.svg') &&
              (f = !0);
          let q = a(v),
            Y = Object.assign(
              P
                ? {
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    objectFit: _,
                    objectPosition: O,
                  }
                : {},
              I ? {} : { color: 'transparent' },
              w
            ),
            G =
              N || 'empty' === A
                ? null
                : 'blur' === A
                ? 'url("data:image/svg+xml;charset=utf-8,' +
                  (0, n.getImageBlurSvg)({
                    widthInt: W,
                    heightInt: X,
                    blurWidth: h,
                    blurHeight: c,
                    blurDataURL: R || '',
                    objectFit: Y.objectFit,
                  }) +
                  '")'
                : 'url("' + A + '")',
            K = s.includes(Y.objectFit)
              ? 'fill' === Y.objectFit
                ? '100% 100%'
                : 'cover'
              : Y.objectFit,
            Z = G
              ? {
                  backgroundSize: K,
                  backgroundPosition: Y.objectPosition || '50% 50%',
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: G,
                }
              : {},
            Q = (function (e) {
              let {
                config: t,
                src: i,
                unoptimized: n,
                width: r,
                quality: s,
                sizes: o,
                loader: a,
              } = e;
              if (n) return { src: i, srcSet: void 0, sizes: void 0 };
              let { widths: l, kind: u } = (function (e, t, i) {
                  let { deviceSizes: n, allSizes: r } = e;
                  if (i) {
                    let e = /(^|\s)(1?\d?\d)vw/g,
                      t = [];
                    for (let n; (n = e.exec(i)); ) t.push(parseInt(n[2]));
                    if (t.length) {
                      let e = 0.01 * Math.min(...t);
                      return {
                        widths: r.filter((t) => t >= n[0] * e),
                        kind: 'w',
                      };
                    }
                    return { widths: r, kind: 'w' };
                  }
                  return 'number' != typeof t
                    ? { widths: n, kind: 'w' }
                    : {
                        widths: [
                          ...new Set(
                            [t, 2 * t].map(
                              (e) => r.find((t) => t >= e) || r[r.length - 1]
                            )
                          ),
                        ],
                        kind: 'x',
                      };
                })(t, r, o),
                h = l.length - 1;
              return {
                sizes: o || 'w' !== u ? o : '100vw',
                srcSet: l
                  .map(
                    (e, n) =>
                      a({ config: t, src: i, quality: s, width: e }) +
                      ' ' +
                      ('w' === u ? e : n + 1) +
                      u
                  )
                  .join(', '),
                src: a({ config: t, src: i, quality: s, width: l[h] }),
              };
            })({
              config: u,
              src: d,
              unoptimized: f,
              width: W,
              quality: q,
              sizes: p,
              loader: B,
            });
          return {
            props: {
              ...V,
              loading: H ? 'lazy' : g,
              fetchPriority: M,
              width: W,
              height: X,
              decoding: j,
              className: y,
              style: { ...Y, ...Z },
              sizes: Q.sizes,
              srcSet: Q.srcSet,
              src: E || Q.src,
            },
            meta: { unoptimized: f, priority: m, placeholder: A, fill: P },
          };
        }
      },
      4959: (e, t, i) => {
        'use strict';
        e.exports = i(4041).vendored.contexts.AmpContext;
      },
      5362: (e) => {
        (() => {
          'use strict';
          'undefined' != typeof __nccwpck_require__ &&
            (__nccwpck_require__.ab = __dirname + '/');
          var t = {};
          (() => {
            function e(e, t) {
              void 0 === t && (t = {});
              for (
                var i = (function (e) {
                    for (var t = [], i = 0; i < e.length; ) {
                      var n = e[i];
                      if ('*' === n || '+' === n || '?' === n) {
                        t.push({ type: 'MODIFIER', index: i, value: e[i++] });
                        continue;
                      }
                      if ('\\' === n) {
                        t.push({
                          type: 'ESCAPED_CHAR',
                          index: i++,
                          value: e[i++],
                        });
                        continue;
                      }
                      if ('{' === n) {
                        t.push({ type: 'OPEN', index: i, value: e[i++] });
                        continue;
                      }
                      if ('}' === n) {
                        t.push({ type: 'CLOSE', index: i, value: e[i++] });
                        continue;
                      }
                      if (':' === n) {
                        for (var r = '', s = i + 1; s < e.length; ) {
                          var o = e.charCodeAt(s);
                          if (
                            (o >= 48 && o <= 57) ||
                            (o >= 65 && o <= 90) ||
                            (o >= 97 && o <= 122) ||
                            95 === o
                          ) {
                            r += e[s++];
                            continue;
                          }
                          break;
                        }
                        if (!r)
                          throw TypeError('Missing parameter name at ' + i);
                        t.push({ type: 'NAME', index: i, value: r }), (i = s);
                        continue;
                      }
                      if ('(' === n) {
                        var a = 1,
                          l = '',
                          s = i + 1;
                        if ('?' === e[s])
                          throw TypeError(
                            'Pattern cannot start with "?" at ' + s
                          );
                        for (; s < e.length; ) {
                          if ('\\' === e[s]) {
                            l += e[s++] + e[s++];
                            continue;
                          }
                          if (')' === e[s]) {
                            if (0 == --a) {
                              s++;
                              break;
                            }
                          } else if ('(' === e[s] && (a++, '?' !== e[s + 1]))
                            throw TypeError(
                              'Capturing groups are not allowed at ' + s
                            );
                          l += e[s++];
                        }
                        if (a) throw TypeError('Unbalanced pattern at ' + i);
                        if (!l) throw TypeError('Missing pattern at ' + i);
                        t.push({ type: 'PATTERN', index: i, value: l }),
                          (i = s);
                        continue;
                      }
                      t.push({ type: 'CHAR', index: i, value: e[i++] });
                    }
                    return t.push({ type: 'END', index: i, value: '' }), t;
                  })(e),
                  n = t.prefixes,
                  s = void 0 === n ? './' : n,
                  o = '[^' + r(t.delimiter || '/#?') + ']+?',
                  a = [],
                  l = 0,
                  u = 0,
                  h = '',
                  c = function (e) {
                    if (u < i.length && i[u].type === e) return i[u++].value;
                  },
                  d = function (e) {
                    var t = c(e);
                    if (void 0 !== t) return t;
                    var n = i[u];
                    throw TypeError(
                      'Unexpected ' +
                        n.type +
                        ' at ' +
                        n.index +
                        ', expected ' +
                        e
                    );
                  },
                  p = function () {
                    for (var e, t = ''; (e = c('CHAR') || c('ESCAPED_CHAR')); )
                      t += e;
                    return t;
                  };
                u < i.length;

              ) {
                var f = c('CHAR'),
                  m = c('NAME'),
                  g = c('PATTERN');
                if (m || g) {
                  var y = f || '';
                  -1 === s.indexOf(y) && ((h += y), (y = '')),
                    h && (a.push(h), (h = '')),
                    a.push({
                      name: m || l++,
                      prefix: y,
                      suffix: '',
                      pattern: g || o,
                      modifier: c('MODIFIER') || '',
                    });
                  continue;
                }
                var v = f || c('ESCAPED_CHAR');
                if (v) {
                  h += v;
                  continue;
                }
                if ((h && (a.push(h), (h = '')), c('OPEN'))) {
                  var y = p(),
                    x = c('NAME') || '',
                    b = c('PATTERN') || '',
                    P = p();
                  d('CLOSE'),
                    a.push({
                      name: x || (b ? l++ : ''),
                      pattern: x && !b ? o : b,
                      prefix: y,
                      suffix: P,
                      modifier: c('MODIFIER') || '',
                    });
                  continue;
                }
                d('END');
              }
              return a;
            }
            function i(e, t) {
              void 0 === t && (t = {});
              var i = s(t),
                n = t.encode,
                r =
                  void 0 === n
                    ? function (e) {
                        return e;
                      }
                    : n,
                o = t.validate,
                a = void 0 === o || o,
                l = e.map(function (e) {
                  if ('object' == typeof e)
                    return RegExp('^(?:' + e.pattern + ')$', i);
                });
              return function (t) {
                for (var i = '', n = 0; n < e.length; n++) {
                  var s = e[n];
                  if ('string' == typeof s) {
                    i += s;
                    continue;
                  }
                  var o = t ? t[s.name] : void 0,
                    u = '?' === s.modifier || '*' === s.modifier,
                    h = '*' === s.modifier || '+' === s.modifier;
                  if (Array.isArray(o)) {
                    if (!h)
                      throw TypeError(
                        'Expected "' +
                          s.name +
                          '" to not repeat, but got an array'
                      );
                    if (0 === o.length) {
                      if (u) continue;
                      throw TypeError(
                        'Expected "' + s.name + '" to not be empty'
                      );
                    }
                    for (var c = 0; c < o.length; c++) {
                      var d = r(o[c], s);
                      if (a && !l[n].test(d))
                        throw TypeError(
                          'Expected all "' +
                            s.name +
                            '" to match "' +
                            s.pattern +
                            '", but got "' +
                            d +
                            '"'
                        );
                      i += s.prefix + d + s.suffix;
                    }
                    continue;
                  }
                  if ('string' == typeof o || 'number' == typeof o) {
                    var d = r(String(o), s);
                    if (a && !l[n].test(d))
                      throw TypeError(
                        'Expected "' +
                          s.name +
                          '" to match "' +
                          s.pattern +
                          '", but got "' +
                          d +
                          '"'
                      );
                    i += s.prefix + d + s.suffix;
                    continue;
                  }
                  if (!u) {
                    var p = h ? 'an array' : 'a string';
                    throw TypeError('Expected "' + s.name + '" to be ' + p);
                  }
                }
                return i;
              };
            }
            function n(e, t, i) {
              void 0 === i && (i = {});
              var n = i.decode,
                r =
                  void 0 === n
                    ? function (e) {
                        return e;
                      }
                    : n;
              return function (i) {
                var n = e.exec(i);
                if (!n) return !1;
                for (
                  var s = n[0], o = n.index, a = Object.create(null), l = 1;
                  l < n.length;
                  l++
                )
                  !(function (e) {
                    if (void 0 !== n[e]) {
                      var i = t[e - 1];
                      '*' === i.modifier || '+' === i.modifier
                        ? (a[i.name] = n[e]
                            .split(i.prefix + i.suffix)
                            .map(function (e) {
                              return r(e, i);
                            }))
                        : (a[i.name] = r(n[e], i));
                    }
                  })(l);
                return { path: s, index: o, params: a };
              };
            }
            function r(e) {
              return e.replace(/([.+*?=^!:${}()[\]|/\\])/g, '\\$1');
            }
            function s(e) {
              return e && e.sensitive ? '' : 'i';
            }
            function o(e, t, i) {
              void 0 === i && (i = {});
              for (
                var n = i.strict,
                  o = void 0 !== n && n,
                  a = i.start,
                  l = i.end,
                  u = i.encode,
                  h =
                    void 0 === u
                      ? function (e) {
                          return e;
                        }
                      : u,
                  c = '[' + r(i.endsWith || '') + ']|$',
                  d = '[' + r(i.delimiter || '/#?') + ']',
                  p = void 0 === a || a ? '^' : '',
                  f = 0;
                f < e.length;
                f++
              ) {
                var m = e[f];
                if ('string' == typeof m) p += r(h(m));
                else {
                  var g = r(h(m.prefix)),
                    y = r(h(m.suffix));
                  if (m.pattern)
                    if ((t && t.push(m), g || y))
                      if ('+' === m.modifier || '*' === m.modifier) {
                        var v = '*' === m.modifier ? '?' : '';
                        p +=
                          '(?:' +
                          g +
                          '((?:' +
                          m.pattern +
                          ')(?:' +
                          y +
                          g +
                          '(?:' +
                          m.pattern +
                          '))*)' +
                          y +
                          ')' +
                          v;
                      } else
                        p +=
                          '(?:' +
                          g +
                          '(' +
                          m.pattern +
                          ')' +
                          y +
                          ')' +
                          m.modifier;
                    else p += '(' + m.pattern + ')' + m.modifier;
                  else p += '(?:' + g + y + ')' + m.modifier;
                }
              }
              if (void 0 === l || l)
                o || (p += d + '?'), (p += i.endsWith ? '(?=' + c + ')' : '$');
              else {
                var x = e[e.length - 1],
                  b =
                    'string' == typeof x
                      ? d.indexOf(x[x.length - 1]) > -1
                      : void 0 === x;
                o || (p += '(?:' + d + '(?=' + c + '))?'),
                  b || (p += '(?=' + d + '|' + c + ')');
              }
              return new RegExp(p, s(i));
            }
            function a(t, i, n) {
              if (t instanceof RegExp) {
                if (!i) return t;
                var r = t.source.match(/\((?!\?)/g);
                if (r)
                  for (var l = 0; l < r.length; l++)
                    i.push({
                      name: l,
                      prefix: '',
                      suffix: '',
                      modifier: '',
                      pattern: '',
                    });
                return t;
              }
              return Array.isArray(t)
                ? RegExp(
                    '(?:' +
                      t
                        .map(function (e) {
                          return a(e, i, n).source;
                        })
                        .join('|') +
                      ')',
                    s(n)
                  )
                : o(e(t, n), i, n);
            }
            Object.defineProperty(t, '__esModule', { value: !0 }),
              (t.parse = e),
              (t.compile = function (t, n) {
                return i(e(t, n), n);
              }),
              (t.tokensToFunction = i),
              (t.match = function (e, t) {
                var i = [];
                return n(a(e, i, t), i, t);
              }),
              (t.regexpToFunction = n),
              (t.tokensToRegexp = o),
              (t.pathToRegexp = a);
          })(),
            (e.exports = t);
        })();
      },
      5526: (e, t, i) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          !(function (e, t) {
            for (var i in t)
              Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
          })(t, {
            compileNonPath: function () {
              return h;
            },
            matchHas: function () {
              return u;
            },
            parseDestination: function () {
              return c;
            },
            prepareDestination: function () {
              return d;
            },
          });
        let n = i(5362),
          r = i(3293),
          s = i(6759),
          o = i(1437),
          a = i(8212);
        function l(e) {
          return e.replace(/__ESC_COLON_/gi, ':');
        }
        function u(e, t, i, n) {
          void 0 === i && (i = []), void 0 === n && (n = []);
          let r = {},
            s = (i) => {
              let n,
                s = i.key;
              switch (i.type) {
                case 'header':
                  (s = s.toLowerCase()), (n = e.headers[s]);
                  break;
                case 'cookie':
                  n =
                    'cookies' in e
                      ? e.cookies[i.key]
                      : (0, a.getCookieParser)(e.headers)()[i.key];
                  break;
                case 'query':
                  n = t[s];
                  break;
                case 'host': {
                  let { host: t } = (null == e ? void 0 : e.headers) || {};
                  n = null == t ? void 0 : t.split(':', 1)[0].toLowerCase();
                }
              }
              if (!i.value && n)
                return (
                  (r[
                    (function (e) {
                      let t = '';
                      for (let i = 0; i < e.length; i++) {
                        let n = e.charCodeAt(i);
                        ((n > 64 && n < 91) || (n > 96 && n < 123)) &&
                          (t += e[i]);
                      }
                      return t;
                    })(s)
                  ] = n),
                  !0
                );
              if (n) {
                let e = RegExp('^' + i.value + '$'),
                  t = Array.isArray(n) ? n.slice(-1)[0].match(e) : n.match(e);
                if (t)
                  return (
                    Array.isArray(t) &&
                      (t.groups
                        ? Object.keys(t.groups).forEach((e) => {
                            r[e] = t.groups[e];
                          })
                        : 'host' === i.type && t[0] && (r.host = t[0])),
                    !0
                  );
              }
              return !1;
            };
          return !(!i.every((e) => s(e)) || n.some((e) => s(e))) && r;
        }
        function h(e, t) {
          if (!e.includes(':')) return e;
          for (let i of Object.keys(t))
            e.includes(':' + i) &&
              (e = e
                .replace(
                  RegExp(':' + i + '\\*', 'g'),
                  ':' + i + '--ESCAPED_PARAM_ASTERISKS'
                )
                .replace(
                  RegExp(':' + i + '\\?', 'g'),
                  ':' + i + '--ESCAPED_PARAM_QUESTION'
                )
                .replace(
                  RegExp(':' + i + '\\+', 'g'),
                  ':' + i + '--ESCAPED_PARAM_PLUS'
                )
                .replace(
                  RegExp(':' + i + '(?!\\w)', 'g'),
                  '--ESCAPED_PARAM_COLON' + i
                ));
          return (
            (e = e
              .replace(/(:|\*|\?|\+|\(|\)|\{|\})/g, '\\$1')
              .replace(/--ESCAPED_PARAM_PLUS/g, '+')
              .replace(/--ESCAPED_PARAM_COLON/g, ':')
              .replace(/--ESCAPED_PARAM_QUESTION/g, '?')
              .replace(/--ESCAPED_PARAM_ASTERISKS/g, '*')),
            (0, n.compile)('/' + e, { validate: !1 })(t).slice(1)
          );
        }
        function c(e) {
          let t = e.destination;
          for (let i of Object.keys({ ...e.params, ...e.query }))
            i &&
              (t = t.replace(
                RegExp(':' + (0, r.escapeStringRegexp)(i), 'g'),
                '__ESC_COLON_' + i
              ));
          let i = (0, s.parseUrl)(t),
            n = i.pathname;
          n && (n = l(n));
          let o = i.href;
          o && (o = l(o));
          let a = i.hostname;
          a && (a = l(a));
          let u = i.hash;
          return (
            u && (u = l(u)),
            { ...i, pathname: n, hostname: a, href: o, hash: u }
          );
        }
        function d(e) {
          let t,
            i,
            r = Object.assign({}, e.query),
            s = c(e),
            { hostname: a, query: u } = s,
            d = s.pathname;
          s.hash && (d = '' + d + s.hash);
          let p = [],
            f = [];
          for (let e of ((0, n.pathToRegexp)(d, f), f)) p.push(e.name);
          if (a) {
            let e = [];
            for (let t of ((0, n.pathToRegexp)(a, e), e)) p.push(t.name);
          }
          let m = (0, n.compile)(d, { validate: !1 });
          for (let [i, r] of (a && (t = (0, n.compile)(a, { validate: !1 })),
          Object.entries(u)))
            Array.isArray(r)
              ? (u[i] = r.map((t) => h(l(t), e.params)))
              : 'string' == typeof r && (u[i] = h(l(r), e.params));
          let g = Object.keys(e.params).filter(
            (e) => 'nextInternalLocale' !== e
          );
          if (e.appendParamsToQuery && !g.some((e) => p.includes(e)))
            for (let t of g) t in u || (u[t] = e.params[t]);
          if ((0, o.isInterceptionRouteAppPath)(d))
            for (let t of d.split('/')) {
              let i = o.INTERCEPTION_ROUTE_MARKERS.find((e) => t.startsWith(e));
              if (i) {
                '(..)(..)' === i
                  ? ((e.params['0'] = '(..)'), (e.params['1'] = '(..)'))
                  : (e.params['0'] = i);
                break;
              }
            }
          try {
            let [n, r] = (i = m(e.params)).split('#', 2);
            t && (s.hostname = t(e.params)),
              (s.pathname = n),
              (s.hash = (r ? '#' : '') + (r || '')),
              delete s.search;
          } catch (e) {
            if (e.message.match(/Expected .*? to not repeat, but got an array/))
              throw Object.defineProperty(
                Error(
                  'To use a multi-match in the destination you must add `*` at the end of the param name to signify it should repeat. https://nextjs.org/docs/messages/invalid-multi-match'
                ),
                '__NEXT_ERROR_CODE',
                { value: 'E329', enumerable: !1, configurable: !0 }
              );
            throw e;
          }
          return (
            (s.query = { ...r, ...s.query }),
            { newUrl: i, destQuery: u, parsedDestination: s }
          );
        }
      },
      5531: (e, t) => {
        'use strict';
        function i(e) {
          return e.startsWith('/') ? e : '/' + e;
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          Object.defineProperty(t, 'ensureLeadingSlash', {
            enumerable: !0,
            get: function () {
              return i;
            },
          });
      },
      5535: (e, t, i) => {
        'use strict';
        i.r(t), i.d(t, { default: () => u, metadata: () => l });
        var n = i(7413),
          r = i(6922),
          s = i.n(r),
          o = i(1980),
          a = i.n(o);
        i(1135);
        let l = {
          title: 'Create Next App',
          description: 'Generated by create next app',
        };
        function u({ children: e }) {
          return (0, n.jsx)('html', {
            lang: 'en',
            children: (0, n.jsx)('body', {
              className: `${s().variable} ${a().variable} antialiased`,
              children: e,
            }),
          });
        }
      },
      6111: (e, t, i) => {
        Promise.resolve().then(i.bind(i, 9878));
      },
      6341: (e, t, i) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          !(function (e, t) {
            for (var i in t)
              Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
          })(t, {
            getPreviouslyRevalidatedTags: function () {
              return y;
            },
            getUtils: function () {
              return g;
            },
            interpolateDynamicPath: function () {
              return f;
            },
            normalizeDynamicRouteParams: function () {
              return m;
            },
            normalizeVercelUrl: function () {
              return p;
            },
          });
        let n = i(9551),
          r = i(1959),
          s = i(2437),
          o = i(4396),
          a = i(8034),
          l = i(5526),
          u = i(2887),
          h = i(4722),
          c = i(6143),
          d = i(7912);
        function p(e, t, i) {
          let r = (0, n.parse)(e.url, !0);
          for (let e of (delete r.search, Object.keys(r.query))) {
            let n =
                e !== c.NEXT_QUERY_PARAM_PREFIX &&
                e.startsWith(c.NEXT_QUERY_PARAM_PREFIX),
              s =
                e !== c.NEXT_INTERCEPTION_MARKER_PREFIX &&
                e.startsWith(c.NEXT_INTERCEPTION_MARKER_PREFIX);
            (n ||
              s ||
              t.includes(e) ||
              (i && Object.keys(i.groups).includes(e))) &&
              delete r.query[e];
          }
          e.url = (0, n.format)(r);
        }
        function f(e, t, i) {
          if (!i) return e;
          for (let n of Object.keys(i.groups)) {
            let r,
              { optional: s, repeat: o } = i.groups[n],
              a = `[${o ? '...' : ''}${n}]`;
            s && (a = `[${a}]`);
            let l = t[n];
            (r = Array.isArray(l)
              ? l.map((e) => e && encodeURIComponent(e)).join('/')
              : l
              ? encodeURIComponent(l)
              : ''),
              (e = e.replaceAll(a, r));
          }
          return e;
        }
        function m(e, t, i, n) {
          let r = {};
          for (let s of Object.keys(t.groups)) {
            let o = e[s];
            'string' == typeof o
              ? (o = (0, h.normalizeRscURL)(o))
              : Array.isArray(o) && (o = o.map(h.normalizeRscURL));
            let a = i[s],
              l = t.groups[s].optional;
            if (
              (Array.isArray(a)
                ? a.some((e) =>
                    Array.isArray(o)
                      ? o.some((t) => t.includes(e))
                      : null == o
                      ? void 0
                      : o.includes(e)
                  )
                : null == o
                ? void 0
                : o.includes(a)) ||
              (void 0 === o && !(l && n))
            )
              return { params: {}, hasValidParams: !1 };
            l &&
              (!o ||
                (Array.isArray(o) &&
                  1 === o.length &&
                  ('index' === o[0] || o[0] === `[[...${s}]]`))) &&
              ((o = void 0), delete e[s]),
              o &&
                'string' == typeof o &&
                t.groups[s].repeat &&
                (o = o.split('/')),
              o && (r[s] = o);
          }
          return { params: r, hasValidParams: !0 };
        }
        function g({
          page: e,
          i18n: t,
          basePath: i,
          rewrites: n,
          pageIsDynamic: h,
          trailingSlash: c,
          caseSensitive: g,
        }) {
          let y, v, x;
          return (
            h &&
              ((y = (0, o.getNamedRouteRegex)(e, { prefixRouteKeys: !1 })),
              (x = (v = (0, a.getRouteMatcher)(y))(e))),
            {
              handleRewrites: function (o, a) {
                let d = {},
                  p = a.pathname,
                  f = (n) => {
                    let u = (0, s.getPathMatch)(n.source + (c ? '(/)?' : ''), {
                      removeUnnamedParams: !0,
                      strict: !0,
                      sensitive: !!g,
                    });
                    if (!a.pathname) return !1;
                    let f = u(a.pathname);
                    if ((n.has || n.missing) && f) {
                      let e = (0, l.matchHas)(o, a.query, n.has, n.missing);
                      e ? Object.assign(f, e) : (f = !1);
                    }
                    if (f) {
                      let { parsedDestination: s, destQuery: o } = (0,
                      l.prepareDestination)({
                        appendParamsToQuery: !0,
                        destination: n.destination,
                        params: f,
                        query: a.query,
                      });
                      if (s.protocol) return !0;
                      if (
                        (Object.assign(d, o, f),
                        Object.assign(a.query, s.query),
                        delete s.query,
                        Object.assign(a, s),
                        !(p = a.pathname))
                      )
                        return !1;
                      if (
                        (i && (p = p.replace(RegExp(`^${i}`), '') || '/'), t)
                      ) {
                        let e = (0, r.normalizeLocalePath)(p, t.locales);
                        (p = e.pathname),
                          (a.query.nextInternalLocale =
                            e.detectedLocale || f.nextInternalLocale);
                      }
                      if (p === e) return !0;
                      if (h && v) {
                        let e = v(p);
                        if (e) return (a.query = { ...a.query, ...e }), !0;
                      }
                    }
                    return !1;
                  };
                for (let e of n.beforeFiles || []) f(e);
                if (p !== e) {
                  let t = !1;
                  for (let e of n.afterFiles || []) if ((t = f(e))) break;
                  if (
                    !t &&
                    !(() => {
                      let t = (0, u.removeTrailingSlash)(p || '');
                      return (
                        t === (0, u.removeTrailingSlash)(e) ||
                        (null == v ? void 0 : v(t))
                      );
                    })()
                  ) {
                    for (let e of n.fallback || []) if ((t = f(e))) break;
                  }
                }
                return d;
              },
              defaultRouteRegex: y,
              dynamicRouteMatcher: v,
              defaultRouteMatches: x,
              getParamsFromRouteMatches: function (e) {
                if (!y) return null;
                let { groups: t, routeKeys: i } = y,
                  n = (0, a.getRouteMatcher)({
                    re: {
                      exec: (e) => {
                        let n = Object.fromEntries(new URLSearchParams(e));
                        for (let [e, t] of Object.entries(n)) {
                          let i = (0, d.normalizeNextQueryParam)(e);
                          i && ((n[i] = t), delete n[e]);
                        }
                        let r = {};
                        for (let e of Object.keys(i)) {
                          let s = i[e];
                          if (!s) continue;
                          let o = t[s],
                            a = n[e];
                          if (!o.optional && !a) return null;
                          r[o.pos] = a;
                        }
                        return r;
                      },
                    },
                    groups: t,
                  })(e);
                return n || null;
              },
              normalizeDynamicRouteParams: (e, t) =>
                y && x ? m(e, y, x, t) : { params: {}, hasValidParams: !1 },
              normalizeVercelUrl: (e, t) => p(e, t, y),
              interpolateDynamicPath: (e, t) => f(e, t, y),
            }
          );
        }
        function y(e, t) {
          return 'string' == typeof e[c.NEXT_CACHE_REVALIDATED_TAGS_HEADER] &&
            e[c.NEXT_CACHE_REVALIDATE_TAG_TOKEN_HEADER] === t
            ? e[c.NEXT_CACHE_REVALIDATED_TAGS_HEADER].split(',')
            : [];
        }
      },
      6415: (e) => {
        (() => {
          'use strict';
          'undefined' != typeof __nccwpck_require__ &&
            (__nccwpck_require__.ab = __dirname + '/');
          var t = {};
          (() => {
            (t.parse = function (t, i) {
              if ('string' != typeof t)
                throw TypeError('argument str must be a string');
              for (
                var r = {}, s = t.split(n), o = (i || {}).decode || e, a = 0;
                a < s.length;
                a++
              ) {
                var l = s[a],
                  u = l.indexOf('=');
                if (!(u < 0)) {
                  var h = l.substr(0, u).trim(),
                    c = l.substr(++u, l.length).trim();
                  '"' == c[0] && (c = c.slice(1, -1)),
                    void 0 == r[h] &&
                      (r[h] = (function (e, t) {
                        try {
                          return t(e);
                        } catch (t) {
                          return e;
                        }
                      })(c, o));
                }
              }
              return r;
            }),
              (t.serialize = function (e, t, n) {
                var s = n || {},
                  o = s.encode || i;
                if ('function' != typeof o)
                  throw TypeError('option encode is invalid');
                if (!r.test(e)) throw TypeError('argument name is invalid');
                var a = o(t);
                if (a && !r.test(a)) throw TypeError('argument val is invalid');
                var l = e + '=' + a;
                if (null != s.maxAge) {
                  var u = s.maxAge - 0;
                  if (isNaN(u) || !isFinite(u))
                    throw TypeError('option maxAge is invalid');
                  l += '; Max-Age=' + Math.floor(u);
                }
                if (s.domain) {
                  if (!r.test(s.domain))
                    throw TypeError('option domain is invalid');
                  l += '; Domain=' + s.domain;
                }
                if (s.path) {
                  if (!r.test(s.path))
                    throw TypeError('option path is invalid');
                  l += '; Path=' + s.path;
                }
                if (s.expires) {
                  if ('function' != typeof s.expires.toUTCString)
                    throw TypeError('option expires is invalid');
                  l += '; Expires=' + s.expires.toUTCString();
                }
                if (
                  (s.httpOnly && (l += '; HttpOnly'),
                  s.secure && (l += '; Secure'),
                  s.sameSite)
                )
                  switch (
                    'string' == typeof s.sameSite
                      ? s.sameSite.toLowerCase()
                      : s.sameSite
                  ) {
                    case !0:
                    case 'strict':
                      l += '; SameSite=Strict';
                      break;
                    case 'lax':
                      l += '; SameSite=Lax';
                      break;
                    case 'none':
                      l += '; SameSite=None';
                      break;
                    default:
                      throw TypeError('option sameSite is invalid');
                  }
                return l;
              });
            var e = decodeURIComponent,
              i = encodeURIComponent,
              n = /; */,
              r = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
          })(),
            (e.exports = t);
        })();
      },
      6533: (e, t, i) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          Object.defineProperty(t, 'Image', {
            enumerable: !0,
            get: function () {
              return b;
            },
          });
        let n = i(4985),
          r = i(740),
          s = i(687),
          o = r._(i(3210)),
          a = n._(i(1215)),
          l = n._(i(512)),
          u = i(4953),
          h = i(2756),
          c = i(7903);
        i(148);
        let d = i(9148),
          p = n._(i(1933)),
          f = i(3038),
          m = {
            deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
            imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
            path: '/_next/image',
            loader: 'default',
            dangerouslyAllowSVG: !1,
            unoptimized: !1,
          };
        function g(e, t, i, n, r, s, o) {
          let a = null == e ? void 0 : e.src;
          e &&
            e['data-loaded-src'] !== a &&
            ((e['data-loaded-src'] = a),
            ('decode' in e ? e.decode() : Promise.resolve())
              .catch(() => {})
              .then(() => {
                if (e.parentElement && e.isConnected) {
                  if (
                    ('empty' !== t && r(!0), null == i ? void 0 : i.current)
                  ) {
                    let t = new Event('load');
                    Object.defineProperty(t, 'target', {
                      writable: !1,
                      value: e,
                    });
                    let n = !1,
                      r = !1;
                    i.current({
                      ...t,
                      nativeEvent: t,
                      currentTarget: e,
                      target: e,
                      isDefaultPrevented: () => n,
                      isPropagationStopped: () => r,
                      persist: () => {},
                      preventDefault: () => {
                        (n = !0), t.preventDefault();
                      },
                      stopPropagation: () => {
                        (r = !0), t.stopPropagation();
                      },
                    });
                  }
                  (null == n ? void 0 : n.current) && n.current(e);
                }
              }));
        }
        function y(e) {
          return o.use ? { fetchPriority: e } : { fetchpriority: e };
        }
        globalThis.__NEXT_IMAGE_IMPORTED = !0;
        let v = (0, o.forwardRef)((e, t) => {
          let {
              src: i,
              srcSet: n,
              sizes: r,
              height: a,
              width: l,
              decoding: u,
              className: h,
              style: c,
              fetchPriority: d,
              placeholder: p,
              loading: m,
              unoptimized: v,
              fill: x,
              onLoadRef: b,
              onLoadingCompleteRef: P,
              setBlurComplete: w,
              setShowAltText: E,
              sizesInput: T,
              onLoad: S,
              onError: A,
              ...R
            } = e,
            M = (0, o.useCallback)(
              (e) => {
                e &&
                  (A && (e.src = e.src), e.complete && g(e, p, b, P, w, v, T));
              },
              [i, p, b, P, w, A, v, T]
            ),
            j = (0, f.useMergedRef)(t, M);
          return (0, s.jsx)('img', {
            ...R,
            ...y(d),
            loading: m,
            width: l,
            height: a,
            decoding: u,
            'data-nimg': x ? 'fill' : '1',
            className: h,
            style: c,
            sizes: r,
            srcSet: n,
            src: i,
            ref: j,
            onLoad: (e) => {
              g(e.currentTarget, p, b, P, w, v, T);
            },
            onError: (e) => {
              E(!0), 'empty' !== p && w(!0), A && A(e);
            },
          });
        });
        function x(e) {
          let { isAppRouter: t, imgAttributes: i } = e,
            n = {
              as: 'image',
              imageSrcSet: i.srcSet,
              imageSizes: i.sizes,
              crossOrigin: i.crossOrigin,
              referrerPolicy: i.referrerPolicy,
              ...y(i.fetchPriority),
            };
          return t && a.default.preload
            ? (a.default.preload(i.src, n), null)
            : (0, s.jsx)(l.default, {
                children: (0, s.jsx)(
                  'link',
                  { rel: 'preload', href: i.srcSet ? void 0 : i.src, ...n },
                  '__nimg-' + i.src + i.srcSet + i.sizes
                ),
              });
        }
        let b = (0, o.forwardRef)((e, t) => {
          let i = (0, o.useContext)(d.RouterContext),
            n = (0, o.useContext)(c.ImageConfigContext),
            r = (0, o.useMemo)(() => {
              var e;
              let t = m || n || h.imageConfigDefault,
                i = [...t.deviceSizes, ...t.imageSizes].sort((e, t) => e - t),
                r = t.deviceSizes.sort((e, t) => e - t),
                s =
                  null == (e = t.qualities) ? void 0 : e.sort((e, t) => e - t);
              return { ...t, allSizes: i, deviceSizes: r, qualities: s };
            }, [n]),
            { onLoad: a, onLoadingComplete: l } = e,
            f = (0, o.useRef)(a);
          (0, o.useEffect)(() => {
            f.current = a;
          }, [a]);
          let g = (0, o.useRef)(l);
          (0, o.useEffect)(() => {
            g.current = l;
          }, [l]);
          let [y, b] = (0, o.useState)(!1),
            [P, w] = (0, o.useState)(!1),
            { props: E, meta: T } = (0, u.getImgProps)(e, {
              defaultLoader: p.default,
              imgConf: r,
              blurComplete: y,
              showAltText: P,
            });
          return (0, s.jsxs)(s.Fragment, {
            children: [
              (0, s.jsx)(v, {
                ...E,
                unoptimized: T.unoptimized,
                placeholder: T.placeholder,
                fill: T.fill,
                onLoadRef: f,
                onLoadingCompleteRef: g,
                setBlurComplete: b,
                setShowAltText: w,
                sizesInput: e.sizes,
                ref: t,
              }),
              T.priority
                ? (0, s.jsx)(x, { isAppRouter: !i, imgAttributes: E })
                : null,
            ],
          });
        });
        ('function' == typeof t.default ||
          ('object' == typeof t.default && null !== t.default)) &&
          void 0 === t.default.__esModule &&
          (Object.defineProperty(t.default, '__esModule', { value: !0 }),
          Object.assign(t.default, t),
          (e.exports = t.default));
      },
      6759: (e, t, i) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          Object.defineProperty(t, 'parseUrl', {
            enumerable: !0,
            get: function () {
              return s;
            },
          });
        let n = i(2785),
          r = i(3736);
        function s(e) {
          if (e.startsWith('/')) return (0, r.parseRelativeUrl)(e);
          let t = new URL(e);
          return {
            hash: t.hash,
            hostname: t.hostname,
            href: t.href,
            pathname: t.pathname,
            port: t.port,
            protocol: t.protocol,
            query: (0, n.searchParamsToUrlQuery)(t.searchParams),
            search: t.search,
          };
        }
      },
      7755: (e, t, i) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          Object.defineProperty(t, 'default', {
            enumerable: !0,
            get: function () {
              return o;
            },
          });
        let n = i(3210),
          r = () => {},
          s = () => {};
        function o(e) {
          var t;
          let { headManager: i, reduceComponentsToState: o } = e;
          function a() {
            if (i && i.mountedInstances) {
              let t = n.Children.toArray(
                Array.from(i.mountedInstances).filter(Boolean)
              );
              i.updateHead(o(t, e));
            }
          }
          return (
            null == i || null == (t = i.mountedInstances) || t.add(e.children),
            a(),
            r(() => {
              var t;
              return (
                null == i ||
                  null == (t = i.mountedInstances) ||
                  t.add(e.children),
                () => {
                  var t;
                  null == i ||
                    null == (t = i.mountedInstances) ||
                    t.delete(e.children);
                }
              );
            }),
            r(
              () => (
                i && (i._pendingUpdate = a),
                () => {
                  i && (i._pendingUpdate = a);
                }
              )
            ),
            s(
              () => (
                i &&
                  i._pendingUpdate &&
                  (i._pendingUpdate(), (i._pendingUpdate = null)),
                () => {
                  i &&
                    i._pendingUpdate &&
                    (i._pendingUpdate(), (i._pendingUpdate = null));
                }
              )
            ),
            null
          );
        }
      },
      7903: (e, t, i) => {
        'use strict';
        e.exports = i(4041).vendored.contexts.ImageConfigContext;
      },
      8034: (e, t, i) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          Object.defineProperty(t, 'getRouteMatcher', {
            enumerable: !0,
            get: function () {
              return r;
            },
          });
        let n = i(4827);
        function r(e) {
          let { re: t, groups: i } = e;
          return (e) => {
            let r = t.exec(e);
            if (!r) return !1;
            let s = (e) => {
                try {
                  return decodeURIComponent(e);
                } catch (e) {
                  throw Object.defineProperty(
                    new n.DecodeError('failed to decode param'),
                    '__NEXT_ERROR_CODE',
                    { value: 'E528', enumerable: !1, configurable: !0 }
                  );
                }
              },
              o = {};
            for (let [e, t] of Object.entries(i)) {
              let i = r[t.pos];
              void 0 !== i &&
                (t.repeat
                  ? (o[e] = i.split('/').map((e) => s(e)))
                  : (o[e] = s(i)));
            }
            return o;
          };
        }
      },
      8212: (e, t, i) => {
        'use strict';
        function n(e) {
          return function () {
            let { cookie: t } = e;
            if (!t) return {};
            let { parse: n } = i(6415);
            return n(Array.isArray(t) ? t.join('; ') : t);
          };
        }
        Object.defineProperty(t, '__esModule', { value: !0 }),
          Object.defineProperty(t, 'getCookieParser', {
            enumerable: !0,
            get: function () {
              return n;
            },
          });
      },
      8304: (e, t, i) => {
        'use strict';
        Object.defineProperty(t, '__esModule', { value: !0 }),
          !(function (e, t) {
            for (var i in t)
              Object.defineProperty(e, i, { enumerable: !0, get: t[i] });
          })(t, {
            DEFAULT_METADATA_ROUTE_EXTENSIONS: function () {
              return a;
            },
            STATIC_METADATA_IMAGES: function () {
              return o;
            },
            getExtensionRegexString: function () {
              return l;
            },
            isMetadataPage: function () {
              return c;
            },
            isMetadataRoute: function () {
              return d;
            },
            isMetadataRouteFile: function () {
              return u;
            },
            isStaticMetadataRoute: function () {
              return h;
            },
          });
        let n = i(2958),
          r = i(4722),
          s = i(554),
          o = {
            icon: {
              filename: 'icon',
              extensions: ['ico', 'jpg', 'jpeg', 'png', 'svg'],
            },
            apple: {
              filename: 'apple-icon',
              extensions: ['jpg', 'jpeg', 'png'],
            },
            favicon: { filename: 'favicon', extensions: ['ico'] },
            openGraph: {
              filename: 'opengraph-image',
              extensions: ['jpg', 'jpeg', 'png', 'gif'],
            },
            twitter: {
              filename: 'twitter-image',
              extensions: ['jpg', 'jpeg', 'png', 'gif'],
            },
          },
          a = ['js', 'jsx', 'ts', 'tsx'],
          l = (e, t) =>
            t && 0 !== t.length
              ? `(?:\\.(${e.join('|')})|(\\.(${t.join('|')})))`
              : `(\\.(?:${e.join('|')}))`;
        function u(e, t, i) {
          let r = (i ? '' : '?') + '$',
            s = `\\d?${i ? '' : '(-\\w{6})?'}`,
            a = [
              RegExp(`^[\\\\/]robots${l(t.concat('txt'), null)}${r}`),
              RegExp(
                `^[\\\\/]manifest${l(
                  t.concat('webmanifest', 'json'),
                  null
                )}${r}`
              ),
              RegExp('^[\\\\/]favicon\\.ico$'),
              RegExp(`[\\\\/]sitemap${l(['xml'], t)}${r}`),
              RegExp(
                `[\\\\/]${o.icon.filename}${s}${l(o.icon.extensions, t)}${r}`
              ),
              RegExp(
                `[\\\\/]${o.apple.filename}${s}${l(o.apple.extensions, t)}${r}`
              ),
              RegExp(
                `[\\\\/]${o.openGraph.filename}${s}${l(
                  o.openGraph.extensions,
                  t
                )}${r}`
              ),
              RegExp(
                `[\\\\/]${o.twitter.filename}${s}${l(
                  o.twitter.extensions,
                  t
                )}${r}`
              ),
            ],
            u = (0, n.normalizePathSep)(e);
          return a.some((e) => e.test(u));
        }
        function h(e) {
          let t = e.replace(/\/route$/, '');
          return (
            (0, s.isAppRouteRoute)(e) &&
            u(t, [], !0) &&
            '/robots.txt' !== t &&
            '/manifest.webmanifest' !== t &&
            !t.endsWith('/sitemap.xml')
          );
        }
        function c(e) {
          return !(0, s.isAppRouteRoute)(e) && u(e, [], !1);
        }
        function d(e) {
          let t = (0, r.normalizeAppPath)(e)
            .replace(/^\/?app\//, '')
            .replace('/[__metadata_id__]', '')
            .replace(/\/route$/, '');
          return (
            '/' !== t[0] && (t = '/' + t),
            (0, s.isAppRouteRoute)(e) && u(t, [], !1)
          );
        }
      },
      9121: (e) => {
        'use strict';
        e.exports = require('next/dist/server/app-render/action-async-storage.external.js');
      },
      9148: (e, t, i) => {
        'use strict';
        e.exports = i(4041).vendored.contexts.RouterContext;
      },
      9167: (e, t, i) => {
        'use strict';
        i.r(t),
          i.d(t, {
            GlobalError: () => o.a,
            __next_app__: () => c,
            pages: () => h,
            routeModule: () => d,
            tree: () => u,
          });
        var n = i(5239),
          r = i(8088),
          s = i(8170),
          o = i.n(s),
          a = i(893),
          l = {};
        for (let e in a)
          0 >
            [
              'default',
              'tree',
              'pages',
              'GlobalError',
              '__next_app__',
              'routeModule',
            ].indexOf(e) && (l[e] = () => a[e]);
        i.d(t, l);
        let u = {
            children: [
              '',
              {
                children: [
                  '__PAGE__',
                  {},
                  {
                    page: [
                      () => Promise.resolve().then(i.bind(i, 9878)),
                      '/Users/anthony/Programming/Projects/cirrica/interim/src/app/page.js',
                    ],
                    metadata: {
                      icon: [
                        async (e) =>
                          (
                            await Promise.resolve().then(i.bind(i, 440))
                          ).default(e),
                      ],
                      apple: [],
                      openGraph: [],
                      twitter: [],
                      manifest: void 0,
                    },
                  },
                ],
              },
              {
                layout: [
                  () => Promise.resolve().then(i.bind(i, 5535)),
                  '/Users/anthony/Programming/Projects/cirrica/interim/src/app/layout.js',
                ],
                'not-found': [
                  () => Promise.resolve().then(i.t.bind(i, 7398, 23)),
                  'next/dist/client/components/not-found-error',
                ],
                forbidden: [
                  () => Promise.resolve().then(i.t.bind(i, 9999, 23)),
                  'next/dist/client/components/forbidden-error',
                ],
                unauthorized: [
                  () => Promise.resolve().then(i.t.bind(i, 5284, 23)),
                  'next/dist/client/components/unauthorized-error',
                ],
                metadata: {
                  icon: [
                    async (e) =>
                      (await Promise.resolve().then(i.bind(i, 440))).default(e),
                  ],
                  apple: [],
                  openGraph: [],
                  twitter: [],
                  manifest: void 0,
                },
              },
            ],
          }.children,
          h = [
            '/Users/anthony/Programming/Projects/cirrica/interim/src/app/page.js',
          ],
          c = { require: i, loadChunk: () => Promise.resolve() },
          d = new n.AppPageRouteModule({
            definition: {
              kind: r.RouteKind.APP_PAGE,
              page: '/page',
              pathname: '/',
              bundlePath: '',
              filename: '',
              appPaths: [],
            },
            userland: { loaderTree: u },
          });
      },
      9294: (e) => {
        'use strict';
        e.exports = require('next/dist/server/app-render/work-async-storage.external.js');
      },
      9513: (e, t, i) => {
        'use strict';
        e.exports = i(4041).vendored.contexts.HeadManagerContext;
      },
      9551: (e) => {
        'use strict';
        e.exports = require('url');
      },
      9878: (e, t, i) => {
        'use strict';
        i.r(t), i.d(t, { default: () => n });
        let n = (0, i(2907).registerClientReference)(
          function () {
            throw Error(
              'Attempted to call the default export of "/Users/anthony/Programming/Projects/cirrica/interim/src/app/page.js" from the server, but it\'s on the client. It\'s not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.'
            );
          },
          '/Users/anthony/Programming/Projects/cirrica/interim/src/app/page.js',
          'default'
        );
      },
    });
  var t = require('../webpack-runtime.js');
  t.C(e);
  var i = (e) => t((t.s = e)),
    n = t.X(0, [447, 651], () => i(9167));
  module.exports = n;
})();
