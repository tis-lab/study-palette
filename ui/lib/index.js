var fI = Object.defineProperty;
var dI = (e, t, r) => t in e ? fI(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var Eo = (e, t, r) => dI(e, typeof t != "symbol" ? t + "" : t, r);
import { jsxs as Y, jsx as $, Fragment as Hn } from "react/jsx-runtime";
import * as S from "react";
import Ri, { isValidElement as Kr, forwardRef as Ke, useContext as at, createContext as et, useMemo as ue, useState as be, useRef as J, useCallback as re, useEffect as pe, useImperativeHandle as hI, useLayoutEffect as yt, cloneElement as ls, createElement as ur, Children as vI, memo as tt, Component as pI, Fragment as ig } from "react";
import { createPortal as Ap, unstable_batchedUpdates as cs } from "react-dom";
function hA(e) {
  var t, r, n = "";
  if (typeof e == "string" || typeof e == "number") n += e;
  else if (typeof e == "object") if (Array.isArray(e)) {
    var i = e.length;
    for (t = 0; t < i; t++) e[t] && (r = hA(e[t])) && (n && (n += " "), n += r);
  } else for (r in e) e[r] && (n && (n += " "), n += r);
  return n;
}
function ze() {
  for (var e, t, r = 0, n = "", i = arguments.length; r < i; r++) (e = arguments[r]) && (t = hA(e)) && (n && (n += " "), n += t);
  return n;
}
var mI = ["dangerouslySetInnerHTML", "onCopy", "onCopyCapture", "onCut", "onCutCapture", "onPaste", "onPasteCapture", "onCompositionEnd", "onCompositionEndCapture", "onCompositionStart", "onCompositionStartCapture", "onCompositionUpdate", "onCompositionUpdateCapture", "onFocus", "onFocusCapture", "onBlur", "onBlurCapture", "onChange", "onChangeCapture", "onBeforeInput", "onBeforeInputCapture", "onInput", "onInputCapture", "onReset", "onResetCapture", "onSubmit", "onSubmitCapture", "onInvalid", "onInvalidCapture", "onLoad", "onLoadCapture", "onError", "onErrorCapture", "onKeyDown", "onKeyDownCapture", "onKeyPress", "onKeyPressCapture", "onKeyUp", "onKeyUpCapture", "onAbort", "onAbortCapture", "onCanPlay", "onCanPlayCapture", "onCanPlayThrough", "onCanPlayThroughCapture", "onDurationChange", "onDurationChangeCapture", "onEmptied", "onEmptiedCapture", "onEncrypted", "onEncryptedCapture", "onEnded", "onEndedCapture", "onLoadedData", "onLoadedDataCapture", "onLoadedMetadata", "onLoadedMetadataCapture", "onLoadStart", "onLoadStartCapture", "onPause", "onPauseCapture", "onPlay", "onPlayCapture", "onPlaying", "onPlayingCapture", "onProgress", "onProgressCapture", "onRateChange", "onRateChangeCapture", "onSeeked", "onSeekedCapture", "onSeeking", "onSeekingCapture", "onStalled", "onStalledCapture", "onSuspend", "onSuspendCapture", "onTimeUpdate", "onTimeUpdateCapture", "onVolumeChange", "onVolumeChangeCapture", "onWaiting", "onWaitingCapture", "onAuxClick", "onAuxClickCapture", "onClick", "onClickCapture", "onContextMenu", "onContextMenuCapture", "onDoubleClick", "onDoubleClickCapture", "onDrag", "onDragCapture", "onDragEnd", "onDragEndCapture", "onDragEnter", "onDragEnterCapture", "onDragExit", "onDragExitCapture", "onDragLeave", "onDragLeaveCapture", "onDragOver", "onDragOverCapture", "onDragStart", "onDragStartCapture", "onDrop", "onDropCapture", "onMouseDown", "onMouseDownCapture", "onMouseEnter", "onMouseLeave", "onMouseMove", "onMouseMoveCapture", "onMouseOut", "onMouseOutCapture", "onMouseOver", "onMouseOverCapture", "onMouseUp", "onMouseUpCapture", "onSelect", "onSelectCapture", "onTouchCancel", "onTouchCancelCapture", "onTouchEnd", "onTouchEndCapture", "onTouchMove", "onTouchMoveCapture", "onTouchStart", "onTouchStartCapture", "onPointerDown", "onPointerDownCapture", "onPointerMove", "onPointerMoveCapture", "onPointerUp", "onPointerUpCapture", "onPointerCancel", "onPointerCancelCapture", "onPointerEnter", "onPointerEnterCapture", "onPointerLeave", "onPointerLeaveCapture", "onPointerOver", "onPointerOverCapture", "onPointerOut", "onPointerOutCapture", "onGotPointerCapture", "onGotPointerCaptureCapture", "onLostPointerCapture", "onLostPointerCaptureCapture", "onScroll", "onScrollCapture", "onWheel", "onWheelCapture", "onAnimationStart", "onAnimationStartCapture", "onAnimationEnd", "onAnimationEndCapture", "onAnimationIteration", "onAnimationIterationCapture", "onTransitionEnd", "onTransitionEndCapture"];
function Op(e) {
  if (typeof e != "string")
    return !1;
  var t = mI;
  return t.includes(e);
}
var yI = [
  "aria-activedescendant",
  "aria-atomic",
  "aria-autocomplete",
  "aria-busy",
  "aria-checked",
  "aria-colcount",
  "aria-colindex",
  "aria-colspan",
  "aria-controls",
  "aria-current",
  "aria-describedby",
  "aria-details",
  "aria-disabled",
  "aria-errormessage",
  "aria-expanded",
  "aria-flowto",
  "aria-haspopup",
  "aria-hidden",
  "aria-invalid",
  "aria-keyshortcuts",
  "aria-label",
  "aria-labelledby",
  "aria-level",
  "aria-live",
  "aria-modal",
  "aria-multiline",
  "aria-multiselectable",
  "aria-orientation",
  "aria-owns",
  "aria-placeholder",
  "aria-posinset",
  "aria-pressed",
  "aria-readonly",
  "aria-relevant",
  "aria-required",
  "aria-roledescription",
  "aria-rowcount",
  "aria-rowindex",
  "aria-rowspan",
  "aria-selected",
  "aria-setsize",
  "aria-sort",
  "aria-valuemax",
  "aria-valuemin",
  "aria-valuenow",
  "aria-valuetext",
  "className",
  "color",
  "height",
  "id",
  "lang",
  "max",
  "media",
  "method",
  "min",
  "name",
  "style",
  /*
   * removed 'type' SVGElementPropKey because we do not currently use any SVG elements
   * that can use it, and it conflicts with the recharts prop 'type'
   * https://github.com/recharts/recharts/pull/3327
   * https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/type
   */
  // 'type',
  "target",
  "width",
  "role",
  "tabIndex",
  "accentHeight",
  "accumulate",
  "additive",
  "alignmentBaseline",
  "allowReorder",
  "alphabetic",
  "amplitude",
  "arabicForm",
  "ascent",
  "attributeName",
  "attributeType",
  "autoReverse",
  "azimuth",
  "baseFrequency",
  "baselineShift",
  "baseProfile",
  "bbox",
  "begin",
  "bias",
  "by",
  "calcMode",
  "capHeight",
  "clip",
  "clipPath",
  "clipPathUnits",
  "clipRule",
  "colorInterpolation",
  "colorInterpolationFilters",
  "colorProfile",
  "colorRendering",
  "contentScriptType",
  "contentStyleType",
  "cursor",
  "cx",
  "cy",
  "d",
  "decelerate",
  "descent",
  "diffuseConstant",
  "direction",
  "display",
  "divisor",
  "dominantBaseline",
  "dur",
  "dx",
  "dy",
  "edgeMode",
  "elevation",
  "enableBackground",
  "end",
  "exponent",
  "externalResourcesRequired",
  "fill",
  "fillOpacity",
  "fillRule",
  "filter",
  "filterRes",
  "filterUnits",
  "floodColor",
  "floodOpacity",
  "focusable",
  "fontFamily",
  "fontSize",
  "fontSizeAdjust",
  "fontStretch",
  "fontStyle",
  "fontVariant",
  "fontWeight",
  "format",
  "from",
  "fx",
  "fy",
  "g1",
  "g2",
  "glyphName",
  "glyphOrientationHorizontal",
  "glyphOrientationVertical",
  "glyphRef",
  "gradientTransform",
  "gradientUnits",
  "hanging",
  "horizAdvX",
  "horizOriginX",
  "href",
  "ideographic",
  "imageRendering",
  "in2",
  "in",
  "intercept",
  "k1",
  "k2",
  "k3",
  "k4",
  "k",
  "kernelMatrix",
  "kernelUnitLength",
  "kerning",
  "keyPoints",
  "keySplines",
  "keyTimes",
  "lengthAdjust",
  "letterSpacing",
  "lightingColor",
  "limitingConeAngle",
  "local",
  "markerEnd",
  "markerHeight",
  "markerMid",
  "markerStart",
  "markerUnits",
  "markerWidth",
  "mask",
  "maskContentUnits",
  "maskUnits",
  "mathematical",
  "mode",
  "numOctaves",
  "offset",
  "opacity",
  "operator",
  "order",
  "orient",
  "orientation",
  "origin",
  "overflow",
  "overlinePosition",
  "overlineThickness",
  "paintOrder",
  "panose1",
  "pathLength",
  "patternContentUnits",
  "patternTransform",
  "patternUnits",
  "pointerEvents",
  "pointsAtX",
  "pointsAtY",
  "pointsAtZ",
  "preserveAlpha",
  "preserveAspectRatio",
  "primitiveUnits",
  "r",
  "radius",
  "refX",
  "refY",
  "renderingIntent",
  "repeatCount",
  "repeatDur",
  "requiredExtensions",
  "requiredFeatures",
  "restart",
  "result",
  "rotate",
  "rx",
  "ry",
  "seed",
  "shapeRendering",
  "slope",
  "spacing",
  "specularConstant",
  "specularExponent",
  "speed",
  "spreadMethod",
  "startOffset",
  "stdDeviation",
  "stemh",
  "stemv",
  "stitchTiles",
  "stopColor",
  "stopOpacity",
  "strikethroughPosition",
  "strikethroughThickness",
  "string",
  "stroke",
  "strokeDasharray",
  "strokeDashoffset",
  "strokeLinecap",
  "strokeLinejoin",
  "strokeMiterlimit",
  "strokeOpacity",
  "strokeWidth",
  "surfaceScale",
  "systemLanguage",
  "tableValues",
  "targetX",
  "targetY",
  "textAnchor",
  "textDecoration",
  "textLength",
  "textRendering",
  "to",
  "transform",
  "u1",
  "u2",
  "underlinePosition",
  "underlineThickness",
  "unicode",
  "unicodeBidi",
  "unicodeRange",
  "unitsPerEm",
  "vAlphabetic",
  "values",
  "vectorEffect",
  "version",
  "vertAdvY",
  "vertOriginX",
  "vertOriginY",
  "vHanging",
  "vIdeographic",
  "viewTarget",
  "visibility",
  "vMathematical",
  "widths",
  "wordSpacing",
  "writingMode",
  "x1",
  "x2",
  "x",
  "xChannelSelector",
  "xHeight",
  "xlinkActuate",
  "xlinkArcrole",
  "xlinkHref",
  "xlinkRole",
  "xlinkShow",
  "xlinkTitle",
  "xlinkType",
  "xmlBase",
  "xmlLang",
  "xmlns",
  "xmlnsXlink",
  "xmlSpace",
  "y1",
  "y2",
  "y",
  "yChannelSelector",
  "z",
  "zoomAndPan",
  "ref",
  "key",
  "angle"
], gI = new Set(yI);
function vA(e) {
  return typeof e != "string" ? !1 : gI.has(e);
}
function pA(e) {
  return typeof e == "string" && e.startsWith("data-");
}
function xi(e) {
  if (typeof e != "object" || e === null)
    return {};
  var t = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (vA(r) || pA(r)) && (t[r] = e[r]);
  return t;
}
function _v(e) {
  if (e == null)
    return null;
  if (/* @__PURE__ */ Kr(e) && typeof e.props == "object" && e.props !== null) {
    var t = e.props;
    return xi(t);
  }
  return typeof e == "object" && !Array.isArray(e) ? xi(e) : null;
}
function sr(e) {
  var t = {};
  for (var r in e)
    Object.prototype.hasOwnProperty.call(e, r) && (vA(r) || pA(r) || Op(r)) && (t[r] = e[r]);
  return t;
}
var bI = ["children", "width", "height", "viewBox", "className", "style", "title", "desc"];
function wv() {
  return wv = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, wv.apply(null, arguments);
}
function _I(e, t) {
  if (e == null) return {};
  var r, n, i = wI(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function wI(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var Sp = /* @__PURE__ */ Ke((e, t) => {
  var r = e.children, n = e.width, i = e.height, a = e.viewBox, o = e.className, u = e.style, s = e.title, l = e.desc, c = _I(e, bI), f = a || {
    width: n,
    height: i,
    x: 0,
    y: 0
  }, d = ze("recharts-surface", o);
  return /* @__PURE__ */ S.createElement("svg", wv({}, sr(c), {
    className: d,
    width: n,
    height: i,
    style: u,
    viewBox: "".concat(f.x, " ").concat(f.y, " ").concat(f.width, " ").concat(f.height),
    ref: t
  }), /* @__PURE__ */ S.createElement("title", null, s), /* @__PURE__ */ S.createElement("desc", null, l), r);
}), xI = ["children", "className"];
function xv() {
  return xv = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, xv.apply(null, arguments);
}
function AI(e, t) {
  if (e == null) return {};
  var r, n, i = OI(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function OI(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var Pr = /* @__PURE__ */ S.forwardRef((e, t) => {
  var r = e.children, n = e.className, i = AI(e, xI), a = ze("recharts-layer", n);
  return /* @__PURE__ */ S.createElement("g", xv({
    className: a
  }, sr(i), {
    ref: t
  }), r);
});
function Av(e) {
  return e === "__proto__";
}
const SI = /\.|(\[(?:[^[\]]*|(["'])(?:(?!\2)[^\\]|\\.)*?\2)\])/;
function mA(e) {
  switch (typeof e) {
    case "number":
    case "symbol":
      return !1;
    case "string":
      return e === "" || e.startsWith(".") || e.endsWith(".") ? !1 : SI.test(e);
    default:
      return !1;
  }
}
function fs(e) {
  var t;
  return typeof e == "string" || typeof e == "symbol" ? e : Object.is((t = e == null ? void 0 : e.valueOf) == null ? void 0 : t.call(e), -0) ? "-0" : String(e);
}
function Ep(e) {
  return typeof e == "symbol" || e instanceof Symbol;
}
function EI(e) {
  return e == null ? "" : yA(e);
}
function yA(e) {
  if (typeof e == "string") return e;
  if (Array.isArray(e)) return e.map(yA).join(",");
  if (Ep(e)) return e.toString();
  const t = e + "";
  return t === "0" && Object.is(Number(e), -0) ? "-0" : t;
}
function Pp(e) {
  if (Array.isArray(e)) return e.map(fs);
  if (typeof e == "symbol") return [e];
  e = EI(e);
  const t = [], r = e.length;
  if (r === 0) return t;
  let n = 0, i = "", a = "", o = !1, u = !1;
  const s = /^-?\d+(?:\.\d+)?$/;
  for (e.charCodeAt(0) === 46 && t.push(""); n < r; ) {
    const l = e[n];
    if (a) l === "\\" && n + 1 < r ? (n++, i += e[n]) : l === a ? a = "" : i += l;
    else if (o) if (l === '"' || l === "'")
      a = l, u = !0;
    else if (l === "]") {
      if (o = !1, !u && i.includes(".") && !s.test(i)) {
        const c = i.split(".");
        for (let f = 0; f < c.length; f++) c[f] !== "" && t.push(c[f]);
      } else t.push(i);
      i = "";
    } else i += l;
    else if (l === "[")
      o = !0, u = !1, i && (t.push(i), i = "");
    else if (l === ".") {
      i && (t.push(i), i = "");
      const c = e[n + 1];
      (c === void 0 || c === ".") && t.push("");
    } else i += l;
    n++;
  }
  return i && t.push(i), t;
}
function Zr(e, t, r) {
  if (e == null) return r;
  switch (typeof t) {
    case "string": {
      if (Av(t)) return r;
      const n = e[t];
      return n === void 0 ? mA(t) && !Object.hasOwn(e, t) ? Zr(e, Pp(t), r) : r : n;
    }
    case "number":
    case "symbol": {
      typeof t == "number" && (t = fs(t));
      const n = e[t];
      return n === void 0 ? r : n;
    }
    default: {
      if (Array.isArray(t)) return PI(e, t, r);
      if (Object.is(t == null ? void 0 : t.valueOf(), -0) ? t = "-0" : t = String(t), Av(t)) return r;
      const n = e[t];
      return n === void 0 ? r : n;
    }
  }
}
function PI(e, t, r) {
  if (t.length === 0) return r;
  let n = e;
  for (let i = 0; i < t.length; i++) {
    if (n == null || Av(t[i])) return r;
    n = n[t[i]];
  }
  return n === void 0 ? r : n;
}
var TI = 4;
function Ur(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : TI, r = 10 ** t, n = Math.round(e * r) / r;
  return Object.is(n, -0) ? 0 : n;
}
function Qe(e) {
  for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
    r[n - 1] = arguments[n];
  return e.reduce((i, a, o) => {
    var u = r[o - 1];
    return typeof u == "string" ? i + u + a : u !== void 0 ? i + Ur(u) + a : i + a;
  }, "");
}
var ft = (e) => e === 0 ? 0 : e > 0 ? 1 : -1, Tr = (e) => typeof e == "number" && e != +e, Nn = (e) => typeof e == "string" && e.length > 1 && e.indexOf("%") === e.length - 1, G = (e) => (typeof e == "number" || e instanceof Number) && !Tr(e), Cr = (e) => G(e) || typeof e == "string", CI = 0, ka = (e) => {
  var t = ++CI;
  return "".concat(e || "").concat(t);
}, mt = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0, i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : !1;
  if (!G(t) && typeof t != "string")
    return n;
  var a;
  if (Nn(t)) {
    if (r == null)
      return n;
    var o = t.indexOf("%");
    a = r * parseFloat(t.slice(0, o)) / 100;
  } else
    a = +t;
  return Tr(a) && (a = n), i && r != null && a > r && (a = r), a;
}, gA = (e) => {
  if (!Array.isArray(e))
    return !1;
  for (var t = e.length, r = {}, n = 0; n < t; n++)
    if (!r[String(e[n])])
      r[String(e[n])] = !0;
    else
      return !0;
  return !1;
};
function xn(e, t, r) {
  return G(e) && G(t) ? Ur(e + r * (t - e)) : t;
}
function II(e, t, r) {
  if (!(!e || !e.length))
    return e.find((n) => n && (typeof t == "function" ? t(n) : Zr(n, t)) === r);
}
var dt = (e) => e === null || typeof e > "u", Ga = (e) => dt(e) ? e : "".concat(e.charAt(0).toUpperCase()).concat(e.slice(1));
function tr(e) {
  return e != null;
}
function ds() {
}
function Tp(e) {
  if (e)
    return {
      x: e.x,
      y: e.y,
      upperWidth: "upperWidth" in e ? e.upperWidth : e.width,
      lowerWidth: "lowerWidth" in e ? e.lowerWidth : e.width,
      width: e.width,
      height: e.height
    };
}
function ag(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Zt(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ag(Object(r), !0).forEach(function(n) {
      kI(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ag(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function kI(e, t, r) {
  return (t = MI(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function MI(e) {
  var t = NI(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function NI(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var bA = (e) => {
  var t = e.viewBox, r = e.position, n = e.offset, i = n === void 0 ? 0 : n, a = e.parentViewBox, o = e.clamp, u = Tp(t), s = u.x, l = u.y, c = u.height, f = u.upperWidth, d = u.lowerWidth, h = s, p = s + (f - d) / 2, v = (h + p) / 2, m = (f + d) / 2, y = h + f / 2, b = c >= 0 ? 1 : -1, g = b * i, _ = b > 0 ? "end" : "start", x = b > 0 ? "start" : "end", w = f >= 0 ? 1 : -1, A = w * i, P = w > 0 ? "end" : "start", T = w > 0 ? "start" : "end", C = a;
  if (r === "top") {
    var O = {
      x: h + f / 2,
      y: l - g,
      horizontalAnchor: "middle",
      verticalAnchor: _
    };
    return o && C && (O.height = Math.max(l - C.y, 0), O.width = f), O;
  }
  if (r === "bottom") {
    var D = {
      x: p + d / 2,
      y: l + c + g,
      horizontalAnchor: "middle",
      verticalAnchor: x
    };
    return o && C && (D.height = Math.max(C.y + C.height - (l + c), 0), D.width = d), D;
  }
  if (r === "left") {
    var j = {
      x: v - A,
      y: l + c / 2,
      horizontalAnchor: P,
      verticalAnchor: "middle"
    };
    return o && C && (j.width = Math.max(j.x - C.x, 0), j.height = c), j;
  }
  if (r === "right") {
    var z = {
      x: v + m + A,
      y: l + c / 2,
      horizontalAnchor: T,
      verticalAnchor: "middle"
    };
    return o && C && (z.width = Math.max(C.x + C.width - z.x, 0), z.height = c), z;
  }
  var E = o && C ? {
    width: m,
    height: c
  } : {};
  return r === "insideLeft" ? Zt({
    x: v + A,
    y: l + c / 2,
    horizontalAnchor: T,
    verticalAnchor: "middle"
  }, E) : r === "insideRight" ? Zt({
    x: v + m - A,
    y: l + c / 2,
    horizontalAnchor: P,
    verticalAnchor: "middle"
  }, E) : r === "insideTop" ? Zt({
    x: h + f / 2,
    y: l + g,
    horizontalAnchor: "middle",
    verticalAnchor: x
  }, E) : r === "insideBottom" ? Zt({
    x: p + d / 2,
    y: l + c - g,
    horizontalAnchor: "middle",
    verticalAnchor: _
  }, E) : r === "insideTopLeft" ? Zt({
    x: h + A,
    y: l + g,
    horizontalAnchor: T,
    verticalAnchor: x
  }, E) : r === "insideTopRight" ? Zt({
    x: h + f - A,
    y: l + g,
    horizontalAnchor: P,
    verticalAnchor: x
  }, E) : r === "insideBottomLeft" ? Zt({
    x: p + A,
    y: l + c - g,
    horizontalAnchor: T,
    verticalAnchor: _
  }, E) : r === "insideBottomRight" ? Zt({
    x: p + d - A,
    y: l + c - g,
    horizontalAnchor: P,
    verticalAnchor: _
  }, E) : r && typeof r == "object" && (G(r.x) || Nn(r.x)) && (G(r.y) || Nn(r.y)) ? Zt({
    x: s + mt(r.x, m),
    y: l + mt(r.y, c),
    horizontalAnchor: "end",
    verticalAnchor: "end"
  }, E) : Zt({
    x: y,
    y: l + c / 2,
    horizontalAnchor: "middle",
    verticalAnchor: "middle"
  }, E);
}, RI = ["top", "left", "right", "bottom"];
function Cp(e) {
  return e == null ? !1 : typeof e == "object" ? !0 : RI.includes(e);
}
var _A = /* @__PURE__ */ et(null), $I = () => at(_A);
function Se(e) {
  return function() {
    return e;
  };
}
const wA = Math.cos, lu = Math.sin, Ut = Math.sqrt, og = 1e-12, cu = Math.PI, hs = 2 * cu, Ov = Math.PI, Sv = 2 * Ov, gn = 1e-6, DI = Sv - gn;
function xA(e) {
  this._ += e[0];
  for (let t = 1, r = e.length; t < r; ++t)
    this._ += arguments[t] + e[t];
}
function jI(e) {
  let t = Math.floor(e);
  if (!(t >= 0)) throw new Error(`invalid digits: ${e}`);
  if (t > 15) return xA;
  const r = 10 ** t;
  return function(n) {
    this._ += n[0];
    for (let i = 1, a = n.length; i < a; ++i)
      this._ += Math.round(arguments[i] * r) / r + n[i];
  };
}
class LI {
  constructor(t) {
    this._x0 = this._y0 = // start of current subpath
    this._x1 = this._y1 = null, this._ = "", this._append = t == null ? xA : jI(t);
  }
  moveTo(t, r) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(t, r) {
    this._append`L${this._x1 = +t},${this._y1 = +r}`;
  }
  quadraticCurveTo(t, r, n, i) {
    this._append`Q${+t},${+r},${this._x1 = +n},${this._y1 = +i}`;
  }
  bezierCurveTo(t, r, n, i, a, o) {
    this._append`C${+t},${+r},${+n},${+i},${this._x1 = +a},${this._y1 = +o}`;
  }
  arcTo(t, r, n, i, a) {
    if (t = +t, r = +r, n = +n, i = +i, a = +a, a < 0) throw new Error(`negative radius: ${a}`);
    let o = this._x1, u = this._y1, s = n - t, l = i - r, c = o - t, f = u - r, d = c * c + f * f;
    if (this._x1 === null)
      this._append`M${this._x1 = t},${this._y1 = r}`;
    else if (d > gn) if (!(Math.abs(f * s - l * c) > gn) || !a)
      this._append`L${this._x1 = t},${this._y1 = r}`;
    else {
      let h = n - o, p = i - u, v = s * s + l * l, m = h * h + p * p, y = Math.sqrt(v), b = Math.sqrt(d), g = a * Math.tan((Ov - Math.acos((v + d - m) / (2 * y * b))) / 2), _ = g / b, x = g / y;
      Math.abs(_ - 1) > gn && this._append`L${t + _ * c},${r + _ * f}`, this._append`A${a},${a},0,0,${+(f * h > c * p)},${this._x1 = t + x * s},${this._y1 = r + x * l}`;
    }
  }
  arc(t, r, n, i, a, o) {
    if (t = +t, r = +r, n = +n, o = !!o, n < 0) throw new Error(`negative radius: ${n}`);
    let u = n * Math.cos(i), s = n * Math.sin(i), l = t + u, c = r + s, f = 1 ^ o, d = o ? i - a : a - i;
    this._x1 === null ? this._append`M${l},${c}` : (Math.abs(this._x1 - l) > gn || Math.abs(this._y1 - c) > gn) && this._append`L${l},${c}`, n && (d < 0 && (d = d % Sv + Sv), d > DI ? this._append`A${n},${n},0,1,${f},${t - u},${r - s}A${n},${n},0,1,${f},${this._x1 = l},${this._y1 = c}` : d > gn && this._append`A${n},${n},0,${+(d >= Ov)},${f},${this._x1 = t + n * Math.cos(a)},${this._y1 = r + n * Math.sin(a)}`);
  }
  rect(t, r, n, i) {
    this._append`M${this._x0 = this._x1 = +t},${this._y0 = this._y1 = +r}h${n = +n}v${+i}h${-n}Z`;
  }
  toString() {
    return this._;
  }
}
function Ip(e) {
  let t = 3;
  return e.digits = function(r) {
    if (!arguments.length) return t;
    if (r == null)
      t = null;
    else {
      const n = Math.floor(r);
      if (!(n >= 0)) throw new RangeError(`invalid digits: ${r}`);
      t = n;
    }
    return e;
  }, () => new LI(t);
}
function kp(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function AA(e) {
  this._context = e;
}
AA.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      // falls through
      default:
        this._context.lineTo(e, t);
        break;
    }
  }
};
function Ya(e) {
  return new AA(e);
}
function OA(e) {
  return e[0];
}
function SA(e) {
  return e[1];
}
function fu(e, t) {
  var r = Se(!0), n = null, i = Ya, a = null, o = Ip(u);
  e = typeof e == "function" ? e : e === void 0 ? OA : Se(e), t = typeof t == "function" ? t : t === void 0 ? SA : Se(t);
  function u(s) {
    var l, c = (s = kp(s)).length, f, d = !1, h;
    for (n == null && (a = i(h = o())), l = 0; l <= c; ++l)
      !(l < c && r(f = s[l], l, s)) === d && ((d = !d) ? a.lineStart() : a.lineEnd()), d && a.point(+e(f, l, s), +t(f, l, s));
    if (h) return a = null, h + "" || null;
  }
  return u.x = function(s) {
    return arguments.length ? (e = typeof s == "function" ? s : Se(+s), u) : e;
  }, u.y = function(s) {
    return arguments.length ? (t = typeof s == "function" ? s : Se(+s), u) : t;
  }, u.defined = function(s) {
    return arguments.length ? (r = typeof s == "function" ? s : Se(!!s), u) : r;
  }, u.curve = function(s) {
    return arguments.length ? (i = s, n != null && (a = i(n)), u) : i;
  }, u.context = function(s) {
    return arguments.length ? (s == null ? n = a = null : a = i(n = s), u) : n;
  }, u;
}
function Po(e, t, r) {
  var n = null, i = Se(!0), a = null, o = Ya, u = null, s = Ip(l);
  e = typeof e == "function" ? e : e === void 0 ? OA : Se(+e), t = typeof t == "function" ? t : Se(t === void 0 ? 0 : +t), r = typeof r == "function" ? r : r === void 0 ? SA : Se(+r);
  function l(f) {
    var d, h, p, v = (f = kp(f)).length, m, y = !1, b, g = new Array(v), _ = new Array(v);
    for (a == null && (u = o(b = s())), d = 0; d <= v; ++d) {
      if (!(d < v && i(m = f[d], d, f)) === y)
        if (y = !y)
          h = d, u.areaStart(), u.lineStart();
        else {
          for (u.lineEnd(), u.lineStart(), p = d - 1; p >= h; --p)
            u.point(g[p], _[p]);
          u.lineEnd(), u.areaEnd();
        }
      y && (g[d] = +e(m, d, f), _[d] = +t(m, d, f), u.point(n ? +n(m, d, f) : g[d], r ? +r(m, d, f) : _[d]));
    }
    if (b) return u = null, b + "" || null;
  }
  function c() {
    return fu().defined(i).curve(o).context(a);
  }
  return l.x = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : Se(+f), n = null, l) : e;
  }, l.x0 = function(f) {
    return arguments.length ? (e = typeof f == "function" ? f : Se(+f), l) : e;
  }, l.x1 = function(f) {
    return arguments.length ? (n = f == null ? null : typeof f == "function" ? f : Se(+f), l) : n;
  }, l.y = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : Se(+f), r = null, l) : t;
  }, l.y0 = function(f) {
    return arguments.length ? (t = typeof f == "function" ? f : Se(+f), l) : t;
  }, l.y1 = function(f) {
    return arguments.length ? (r = f == null ? null : typeof f == "function" ? f : Se(+f), l) : r;
  }, l.lineX0 = l.lineY0 = function() {
    return c().x(e).y(t);
  }, l.lineY1 = function() {
    return c().x(e).y(r);
  }, l.lineX1 = function() {
    return c().x(n).y(t);
  }, l.defined = function(f) {
    return arguments.length ? (i = typeof f == "function" ? f : Se(!!f), l) : i;
  }, l.curve = function(f) {
    return arguments.length ? (o = f, a != null && (u = o(a)), l) : o;
  }, l.context = function(f) {
    return arguments.length ? (f == null ? a = u = null : u = o(a = f), l) : a;
  }, l;
}
class EA {
  constructor(t, r) {
    this._context = t, this._x = r;
  }
  areaStart() {
    this._line = 0;
  }
  areaEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  }
  point(t, r) {
    switch (t = +t, r = +r, this._point) {
      case 0: {
        this._point = 1, this._line ? this._context.lineTo(t, r) : this._context.moveTo(t, r);
        break;
      }
      case 1:
        this._point = 2;
      // falls through
      default: {
        this._x ? this._context.bezierCurveTo(this._x0 = (this._x0 + t) / 2, this._y0, this._x0, r, t, r) : this._context.bezierCurveTo(this._x0, this._y0 = (this._y0 + r) / 2, t, this._y0, t, r);
        break;
      }
    }
    this._x0 = t, this._y0 = r;
  }
}
function qI(e) {
  return new EA(e, !0);
}
function zI(e) {
  return new EA(e, !1);
}
const Mp = {
  draw(e, t) {
    const r = Ut(t / cu);
    e.moveTo(r, 0), e.arc(0, 0, r, 0, hs);
  }
}, FI = {
  draw(e, t) {
    const r = Ut(t / 5) / 2;
    e.moveTo(-3 * r, -r), e.lineTo(-r, -r), e.lineTo(-r, -3 * r), e.lineTo(r, -3 * r), e.lineTo(r, -r), e.lineTo(3 * r, -r), e.lineTo(3 * r, r), e.lineTo(r, r), e.lineTo(r, 3 * r), e.lineTo(-r, 3 * r), e.lineTo(-r, r), e.lineTo(-3 * r, r), e.closePath();
  }
}, PA = Ut(1 / 3), BI = PA * 2, WI = {
  draw(e, t) {
    const r = Ut(t / BI), n = r * PA;
    e.moveTo(0, -r), e.lineTo(n, 0), e.lineTo(0, r), e.lineTo(-n, 0), e.closePath();
  }
}, UI = {
  draw(e, t) {
    const r = Ut(t), n = -r / 2;
    e.rect(n, n, r, r);
  }
}, VI = 0.8908130915292852, TA = lu(cu / 10) / lu(7 * cu / 10), HI = lu(hs / 10) * TA, KI = -wA(hs / 10) * TA, GI = {
  draw(e, t) {
    const r = Ut(t * VI), n = HI * r, i = KI * r;
    e.moveTo(0, -r), e.lineTo(n, i);
    for (let a = 1; a < 5; ++a) {
      const o = hs * a / 5, u = wA(o), s = lu(o);
      e.lineTo(s * r, -u * r), e.lineTo(u * n - s * i, s * n + u * i);
    }
    e.closePath();
  }
}, lc = Ut(3), YI = {
  draw(e, t) {
    const r = -Ut(t / (lc * 3));
    e.moveTo(0, r * 2), e.lineTo(-lc * r, -r), e.lineTo(lc * r, -r), e.closePath();
  }
}, xt = -0.5, At = Ut(3) / 2, Ev = 1 / Ut(12), XI = (Ev / 2 + 1) * 3, ZI = {
  draw(e, t) {
    const r = Ut(t / XI), n = r / 2, i = r * Ev, a = n, o = r * Ev + r, u = -a, s = o;
    e.moveTo(n, i), e.lineTo(a, o), e.lineTo(u, s), e.lineTo(xt * n - At * i, At * n + xt * i), e.lineTo(xt * a - At * o, At * a + xt * o), e.lineTo(xt * u - At * s, At * u + xt * s), e.lineTo(xt * n + At * i, xt * i - At * n), e.lineTo(xt * a + At * o, xt * o - At * a), e.lineTo(xt * u + At * s, xt * s - At * u), e.closePath();
  }
};
function QI(e, t) {
  let r = null, n = Ip(i);
  e = typeof e == "function" ? e : Se(e || Mp), t = typeof t == "function" ? t : Se(t === void 0 ? 64 : +t);
  function i() {
    let a;
    if (r || (r = a = n()), e.apply(this, arguments).draw(r, +t.apply(this, arguments)), a) return r = null, a + "" || null;
  }
  return i.type = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : Se(a), i) : e;
  }, i.size = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : Se(+a), i) : t;
  }, i.context = function(a) {
    return arguments.length ? (r = a ?? null, i) : r;
  }, i;
}
function Qr() {
}
function du(e, t, r) {
  e._context.bezierCurveTo(
    (2 * e._x0 + e._x1) / 3,
    (2 * e._y0 + e._y1) / 3,
    (e._x0 + 2 * e._x1) / 3,
    (e._y0 + 2 * e._y1) / 3,
    (e._x0 + 4 * e._x1 + t) / 6,
    (e._y0 + 4 * e._y1 + r) / 6
  );
}
function vs(e) {
  this._context = e;
}
vs.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 3:
        du(this, this._x1, this._y1);
      // falls through
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._context.lineTo((5 * this._x0 + this._x1) / 6, (5 * this._y0 + this._y1) / 6);
      // falls through
      default:
        du(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function CA(e) {
  return new vs(e);
}
function IA(e) {
  this._context = e;
}
IA.prototype = {
  areaStart: Qr,
  areaEnd: Qr,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x2, this._y2), this._context.closePath();
        break;
      }
      case 2: {
        this._context.moveTo((this._x2 + 2 * this._x3) / 3, (this._y2 + 2 * this._y3) / 3), this._context.lineTo((this._x3 + 2 * this._x2) / 3, (this._y3 + 2 * this._y2) / 3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x2, this._y2), this.point(this._x3, this._y3), this.point(this._x4, this._y4);
        break;
      }
    }
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._x2 = e, this._y2 = t;
        break;
      case 1:
        this._point = 2, this._x3 = e, this._y3 = t;
        break;
      case 2:
        this._point = 3, this._x4 = e, this._y4 = t, this._context.moveTo((this._x0 + 4 * this._x1 + e) / 6, (this._y0 + 4 * this._y1 + t) / 6);
        break;
      default:
        du(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function kA(e) {
  return new IA(e);
}
function MA(e) {
  this._context = e;
}
MA.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = NaN, this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
        var r = (this._x0 + 4 * this._x1 + e) / 6, n = (this._y0 + 4 * this._y1 + t) / 6;
        this._line ? this._context.lineTo(r, n) : this._context.moveTo(r, n);
        break;
      case 3:
        this._point = 4;
      // falls through
      default:
        du(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t;
  }
};
function NA(e) {
  return new MA(e);
}
function RA(e, t) {
  this._basis = new vs(e), this._beta = t;
}
RA.prototype = {
  lineStart: function() {
    this._x = [], this._y = [], this._basis.lineStart();
  },
  lineEnd: function() {
    var e = this._x, t = this._y, r = e.length - 1;
    if (r > 0)
      for (var n = e[0], i = t[0], a = e[r] - n, o = t[r] - i, u = -1, s; ++u <= r; )
        s = u / r, this._basis.point(
          this._beta * e[u] + (1 - this._beta) * (n + s * a),
          this._beta * t[u] + (1 - this._beta) * (i + s * o)
        );
    this._x = this._y = null, this._basis.lineEnd();
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t);
  }
};
const JI = (function e(t) {
  function r(n) {
    return t === 1 ? new vs(n) : new RA(n, t);
  }
  return r.beta = function(n) {
    return e(+n);
  }, r;
})(0.85);
function hu(e, t, r) {
  e._context.bezierCurveTo(
    e._x1 + e._k * (e._x2 - e._x0),
    e._y1 + e._k * (e._y2 - e._y0),
    e._x2 + e._k * (e._x1 - t),
    e._y2 + e._k * (e._y1 - r),
    e._x2,
    e._y2
  );
}
function Np(e, t) {
  this._context = e, this._k = (1 - t) / 6;
}
Np.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        hu(this, this._x1, this._y1);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2, this._x1 = e, this._y1 = t;
        break;
      case 2:
        this._point = 3;
      // falls through
      default:
        hu(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
  }
};
const e3 = (function e(t) {
  function r(n) {
    return new Np(n, t);
  }
  return r.tension = function(n) {
    return e(+n);
  }, r;
})(0);
function Rp(e, t) {
  this._context = e, this._k = (1 - t) / 6;
}
Rp.prototype = {
  areaStart: Qr,
  areaEnd: Qr,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3), this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._x3 = e, this._y3 = t;
        break;
      case 1:
        this._point = 2, this._context.moveTo(this._x4 = e, this._y4 = t);
        break;
      case 2:
        this._point = 3, this._x5 = e, this._y5 = t;
        break;
      default:
        hu(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
  }
};
const t3 = (function e(t) {
  function r(n) {
    return new Rp(n, t);
  }
  return r.tension = function(n) {
    return e(+n);
  }, r;
})(0);
function $p(e, t) {
  this._context = e, this._k = (1 - t) / 6;
}
$p.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      // falls through
      default:
        hu(this, e, t);
        break;
    }
    this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
  }
};
const r3 = (function e(t) {
  function r(n) {
    return new $p(n, t);
  }
  return r.tension = function(n) {
    return e(+n);
  }, r;
})(0);
function Dp(e, t, r) {
  var n = e._x1, i = e._y1, a = e._x2, o = e._y2;
  if (e._l01_a > og) {
    var u = 2 * e._l01_2a + 3 * e._l01_a * e._l12_a + e._l12_2a, s = 3 * e._l01_a * (e._l01_a + e._l12_a);
    n = (n * u - e._x0 * e._l12_2a + e._x2 * e._l01_2a) / s, i = (i * u - e._y0 * e._l12_2a + e._y2 * e._l01_2a) / s;
  }
  if (e._l23_a > og) {
    var l = 2 * e._l23_2a + 3 * e._l23_a * e._l12_a + e._l12_2a, c = 3 * e._l23_a * (e._l23_a + e._l12_a);
    a = (a * l + e._x1 * e._l23_2a - t * e._l12_2a) / c, o = (o * l + e._y1 * e._l23_2a - r * e._l12_2a) / c;
  }
  e._context.bezierCurveTo(n, i, a, o, e._x2, e._y2);
}
function $A(e, t) {
  this._context = e, this._alpha = t;
}
$A.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x2, this._y2);
        break;
      case 3:
        this.point(this._x2, this._y2);
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    if (e = +e, t = +t, this._point) {
      var r = this._x2 - e, n = this._y2 - t;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(r * r + n * n, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3;
      // falls through
      default:
        Dp(this, e, t);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
  }
};
const n3 = (function e(t) {
  function r(n) {
    return t ? new $A(n, t) : new Np(n, 0);
  }
  return r.alpha = function(n) {
    return e(+n);
  }, r;
})(0.5);
function DA(e, t) {
  this._context = e, this._alpha = t;
}
DA.prototype = {
  areaStart: Qr,
  areaEnd: Qr,
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._x3 = this._x4 = this._x5 = this._y0 = this._y1 = this._y2 = this._y3 = this._y4 = this._y5 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 1: {
        this._context.moveTo(this._x3, this._y3), this._context.closePath();
        break;
      }
      case 2: {
        this._context.lineTo(this._x3, this._y3), this._context.closePath();
        break;
      }
      case 3: {
        this.point(this._x3, this._y3), this.point(this._x4, this._y4), this.point(this._x5, this._y5);
        break;
      }
    }
  },
  point: function(e, t) {
    if (e = +e, t = +t, this._point) {
      var r = this._x2 - e, n = this._y2 - t;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(r * r + n * n, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1, this._x3 = e, this._y3 = t;
        break;
      case 1:
        this._point = 2, this._context.moveTo(this._x4 = e, this._y4 = t);
        break;
      case 2:
        this._point = 3, this._x5 = e, this._y5 = t;
        break;
      default:
        Dp(this, e, t);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
  }
};
const i3 = (function e(t) {
  function r(n) {
    return t ? new DA(n, t) : new Rp(n, 0);
  }
  return r.alpha = function(n) {
    return e(+n);
  }, r;
})(0.5);
function jA(e, t) {
  this._context = e, this._alpha = t;
}
jA.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._x2 = this._y0 = this._y1 = this._y2 = NaN, this._l01_a = this._l12_a = this._l23_a = this._l01_2a = this._l12_2a = this._l23_2a = this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 3) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    if (e = +e, t = +t, this._point) {
      var r = this._x2 - e, n = this._y2 - t;
      this._l23_a = Math.sqrt(this._l23_2a = Math.pow(r * r + n * n, this._alpha));
    }
    switch (this._point) {
      case 0:
        this._point = 1;
        break;
      case 1:
        this._point = 2;
        break;
      case 2:
        this._point = 3, this._line ? this._context.lineTo(this._x2, this._y2) : this._context.moveTo(this._x2, this._y2);
        break;
      case 3:
        this._point = 4;
      // falls through
      default:
        Dp(this, e, t);
        break;
    }
    this._l01_a = this._l12_a, this._l12_a = this._l23_a, this._l01_2a = this._l12_2a, this._l12_2a = this._l23_2a, this._x0 = this._x1, this._x1 = this._x2, this._x2 = e, this._y0 = this._y1, this._y1 = this._y2, this._y2 = t;
  }
};
const a3 = (function e(t) {
  function r(n) {
    return t ? new jA(n, t) : new $p(n, 0);
  }
  return r.alpha = function(n) {
    return e(+n);
  }, r;
})(0.5);
function LA(e) {
  this._context = e;
}
LA.prototype = {
  areaStart: Qr,
  areaEnd: Qr,
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    this._point && this._context.closePath();
  },
  point: function(e, t) {
    e = +e, t = +t, this._point ? this._context.lineTo(e, t) : (this._point = 1, this._context.moveTo(e, t));
  }
};
function qA(e) {
  return new LA(e);
}
function ug(e) {
  return e < 0 ? -1 : 1;
}
function sg(e, t, r) {
  var n = e._x1 - e._x0, i = t - e._x1, a = (e._y1 - e._y0) / (n || i < 0 && -0), o = (r - e._y1) / (i || n < 0 && -0), u = (a * i + o * n) / (n + i);
  return (ug(a) + ug(o)) * Math.min(Math.abs(a), Math.abs(o), 0.5 * Math.abs(u)) || 0;
}
function lg(e, t) {
  var r = e._x1 - e._x0;
  return r ? (3 * (e._y1 - e._y0) / r - t) / 2 : t;
}
function cc(e, t, r) {
  var n = e._x0, i = e._y0, a = e._x1, o = e._y1, u = (a - n) / 3;
  e._context.bezierCurveTo(n + u, i + u * t, a - u, o - u * r, a, o);
}
function vu(e) {
  this._context = e;
}
vu.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x0 = this._x1 = this._y0 = this._y1 = this._t0 = NaN, this._point = 0;
  },
  lineEnd: function() {
    switch (this._point) {
      case 2:
        this._context.lineTo(this._x1, this._y1);
        break;
      case 3:
        cc(this, this._t0, lg(this, this._t0));
        break;
    }
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(e, t) {
    var r = NaN;
    if (e = +e, t = +t, !(e === this._x1 && t === this._y1)) {
      switch (this._point) {
        case 0:
          this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
          break;
        case 1:
          this._point = 2;
          break;
        case 2:
          this._point = 3, cc(this, lg(this, r = sg(this, e, t)), r);
          break;
        default:
          cc(this, this._t0, r = sg(this, e, t));
          break;
      }
      this._x0 = this._x1, this._x1 = e, this._y0 = this._y1, this._y1 = t, this._t0 = r;
    }
  }
};
function zA(e) {
  this._context = new FA(e);
}
(zA.prototype = Object.create(vu.prototype)).point = function(e, t) {
  vu.prototype.point.call(this, t, e);
};
function FA(e) {
  this._context = e;
}
FA.prototype = {
  moveTo: function(e, t) {
    this._context.moveTo(t, e);
  },
  closePath: function() {
    this._context.closePath();
  },
  lineTo: function(e, t) {
    this._context.lineTo(t, e);
  },
  bezierCurveTo: function(e, t, r, n, i, a) {
    this._context.bezierCurveTo(t, e, n, r, a, i);
  }
};
function jp(e) {
  return new vu(e);
}
function Lp(e) {
  return new zA(e);
}
function BA(e) {
  this._context = e;
}
BA.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = [], this._y = [];
  },
  lineEnd: function() {
    var e = this._x, t = this._y, r = e.length;
    if (r)
      if (this._line ? this._context.lineTo(e[0], t[0]) : this._context.moveTo(e[0], t[0]), r === 2)
        this._context.lineTo(e[1], t[1]);
      else
        for (var n = cg(e), i = cg(t), a = 0, o = 1; o < r; ++a, ++o)
          this._context.bezierCurveTo(n[0][a], i[0][a], n[1][a], i[1][a], e[o], t[o]);
    (this._line || this._line !== 0 && r === 1) && this._context.closePath(), this._line = 1 - this._line, this._x = this._y = null;
  },
  point: function(e, t) {
    this._x.push(+e), this._y.push(+t);
  }
};
function cg(e) {
  var t, r = e.length - 1, n, i = new Array(r), a = new Array(r), o = new Array(r);
  for (i[0] = 0, a[0] = 2, o[0] = e[0] + 2 * e[1], t = 1; t < r - 1; ++t) i[t] = 1, a[t] = 4, o[t] = 4 * e[t] + 2 * e[t + 1];
  for (i[r - 1] = 2, a[r - 1] = 7, o[r - 1] = 8 * e[r - 1] + e[r], t = 1; t < r; ++t) n = i[t] / a[t - 1], a[t] -= n, o[t] -= n * o[t - 1];
  for (i[r - 1] = o[r - 1] / a[r - 1], t = r - 2; t >= 0; --t) i[t] = (o[t] - i[t + 1]) / a[t];
  for (a[r - 1] = (e[r] + i[r - 1]) / 2, t = 0; t < r - 1; ++t) a[t] = 2 * e[t + 1] - i[t + 1];
  return [i, a];
}
function WA(e) {
  return new BA(e);
}
function ps(e, t) {
  this._context = e, this._t = t;
}
ps.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._x = this._y = NaN, this._point = 0;
  },
  lineEnd: function() {
    0 < this._t && this._t < 1 && this._point === 2 && this._context.lineTo(this._x, this._y), (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line >= 0 && (this._t = 1 - this._t, this._line = 1 - this._line);
  },
  point: function(e, t) {
    switch (e = +e, t = +t, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(e, t) : this._context.moveTo(e, t);
        break;
      case 1:
        this._point = 2;
      // falls through
      default: {
        if (this._t <= 0)
          this._context.lineTo(this._x, t), this._context.lineTo(e, t);
        else {
          var r = this._x * (1 - this._t) + e * this._t;
          this._context.lineTo(r, this._y), this._context.lineTo(r, t);
        }
        break;
      }
    }
    this._x = e, this._y = t;
  }
};
function UA(e) {
  return new ps(e, 0.5);
}
function VA(e) {
  return new ps(e, 0);
}
function HA(e) {
  return new ps(e, 1);
}
function Rn(e, t) {
  if ((o = e.length) > 1)
    for (var r = 1, n, i, a = e[t[0]], o, u = a.length; r < o; ++r)
      for (i = a, a = e[t[r]], n = 0; n < u; ++n)
        a[n][1] += a[n][0] = isNaN(i[n][1]) ? i[n][0] : i[n][1];
}
function Pv(e) {
  for (var t = e.length, r = new Array(t); --t >= 0; ) r[t] = t;
  return r;
}
function o3(e, t) {
  return e[t];
}
function u3(e) {
  const t = [];
  return t.key = e, t;
}
function s3() {
  var e = Se([]), t = Pv, r = Rn, n = o3;
  function i(a) {
    var o = Array.from(e.apply(this, arguments), u3), u, s = o.length, l = -1, c;
    for (const f of a)
      for (u = 0, ++l; u < s; ++u)
        (o[u][l] = [0, +n(f, o[u].key, l, a)]).data = f;
    for (u = 0, c = kp(t(o)); u < s; ++u)
      o[c[u]].index = u;
    return r(o, c), o;
  }
  return i.keys = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : Se(Array.from(a)), i) : e;
  }, i.value = function(a) {
    return arguments.length ? (n = typeof a == "function" ? a : Se(+a), i) : n;
  }, i.order = function(a) {
    return arguments.length ? (t = a == null ? Pv : typeof a == "function" ? a : Se(Array.from(a)), i) : t;
  }, i.offset = function(a) {
    return arguments.length ? (r = a ?? Rn, i) : r;
  }, i;
}
function l3(e, t) {
  if ((n = e.length) > 0) {
    for (var r, n, i = 0, a = e[0].length, o; i < a; ++i) {
      for (o = r = 0; r < n; ++r) o += e[r][i][1] || 0;
      if (o) for (r = 0; r < n; ++r) e[r][i][1] /= o;
    }
    Rn(e, t);
  }
}
function c3(e, t) {
  if ((i = e.length) > 0) {
    for (var r = 0, n = e[t[0]], i, a = n.length; r < a; ++r) {
      for (var o = 0, u = 0; o < i; ++o) u += e[o][r][1] || 0;
      n[r][1] += n[r][0] = -u / 2;
    }
    Rn(e, t);
  }
}
function f3(e, t) {
  if (!(!((o = e.length) > 0) || !((a = (i = e[t[0]]).length) > 0))) {
    for (var r = 0, n = 1, i, a, o; n < a; ++n) {
      for (var u = 0, s = 0, l = 0; u < o; ++u) {
        for (var c = e[t[u]], f = c[n][1] || 0, d = c[n - 1][1] || 0, h = (f - d) / 2, p = 0; p < u; ++p) {
          var v = e[t[p]], m = v[n][1] || 0, y = v[n - 1][1] || 0;
          h += m - y;
        }
        s += f, l += h * f;
      }
      i[n - 1][1] += i[n - 1][0] = r, s && (r -= l / s);
    }
    i[n - 1][1] += i[n - 1][0] = r, Rn(e, t);
  }
}
var d3 = ["type", "size", "sizeType"];
function Tv() {
  return Tv = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Tv.apply(null, arguments);
}
function fg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function dg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? fg(Object(r), !0).forEach(function(n) {
      h3(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : fg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function h3(e, t, r) {
  return (t = v3(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function v3(e) {
  var t = p3(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function p3(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function m3(e, t) {
  if (e == null) return {};
  var r, n, i = y3(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function y3(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var KA = {
  symbolCircle: Mp,
  symbolCross: FI,
  symbolDiamond: WI,
  symbolSquare: UI,
  symbolStar: GI,
  symbolTriangle: YI,
  symbolWye: ZI
}, g3 = Math.PI / 180, b3 = (e) => {
  var t = "symbol".concat(Ga(e));
  return KA[t] || Mp;
}, _3 = (e, t, r) => {
  if (t === "area")
    return e;
  switch (r) {
    case "cross":
      return 5 * e * e / 9;
    case "diamond":
      return 0.5 * e * e / Math.sqrt(3);
    case "square":
      return e * e;
    case "star": {
      var n = 18 * g3;
      return 1.25 * e * e * (Math.tan(n) - Math.tan(n * 2) * Math.tan(n) ** 2);
    }
    case "triangle":
      return Math.sqrt(3) * e * e / 4;
    case "wye":
      return (21 - 10 * Math.sqrt(3)) * e * e / 8;
    default:
      return Math.PI * e * e / 4;
  }
}, w3 = (e, t) => {
  KA["symbol".concat(Ga(e))] = t;
}, GA = (e) => {
  var t = e.type, r = t === void 0 ? "circle" : t, n = e.size, i = n === void 0 ? 64 : n, a = e.sizeType, o = a === void 0 ? "area" : a, u = m3(e, d3), s = dg(dg({}, u), {}, {
    type: r,
    size: i,
    sizeType: o
  }), l = "circle";
  typeof r == "string" && (l = r);
  var c = () => {
    var v = b3(l), m = QI().type(v).size(_3(i, o, l)), y = m();
    if (y !== null)
      return y;
  }, f = s.className, d = s.cx, h = s.cy, p = sr(s);
  return G(d) && G(h) && G(i) ? /* @__PURE__ */ S.createElement("path", Tv({}, p, {
    className: ze("recharts-symbols", f),
    transform: "translate(".concat(d, ", ").concat(h, ")"),
    d: c()
  })) : null;
};
GA.registerSymbol = w3;
var YA = (e) => "radius" in e && "startAngle" in e && "endAngle" in e, x3 = (e, t) => {
  if (!e || typeof e == "function" || typeof e == "boolean")
    return null;
  var r = e;
  if (/* @__PURE__ */ Kr(e) && (r = e.props), typeof r != "object" && typeof r != "function")
    return null;
  var n = {};
  return Object.keys(r).forEach((i) => {
    Op(i) && typeof r[i] == "function" && (n[i] = ((a) => r[i](r, a)));
  }), n;
}, A3 = (e, t, r) => (n) => (e(t, r, n), null), XA = (e, t, r) => {
  if (e === null || typeof e != "object" && typeof e != "function")
    return null;
  var n = null;
  return Object.keys(e).forEach((i) => {
    var a = e[i];
    Op(i) && typeof a == "function" && (n || (n = {}), n[i] = A3(a, t, r));
  }), n;
};
function hg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function O3(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? hg(Object(r), !0).forEach(function(n) {
      S3(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : hg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function S3(e, t, r) {
  return (t = E3(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function E3(e) {
  var t = P3(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function P3(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Vt(e, t) {
  var r = O3({}, e), n = t, i = Object.keys(t), a = i.reduce((o, u) => (o[u] === void 0 && n[u] !== void 0 && (o[u] = n[u]), o), r);
  return a;
}
function pu() {
  return pu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, pu.apply(null, arguments);
}
function vg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ZA(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? vg(Object(r), !0).forEach(function(n) {
      T3(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : vg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function T3(e, t, r) {
  return (t = C3(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function C3(e) {
  var t = I3(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function I3(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var St = 32, k3 = {
  align: "center",
  iconSize: 14,
  inactiveColor: "#ccc",
  layout: "horizontal",
  verticalAlign: "middle",
  labelStyle: {}
};
function M3(e) {
  if (typeof e == "object" && e !== null && "strokeDasharray" in e)
    return String(e.strokeDasharray);
}
function N3(e) {
  var t = e.data, r = e.iconType, n = e.inactiveColor, i = St / 2, a = St / 6, o = St / 3, u = t.inactive ? n : t.color, s = r ?? t.type;
  if (s === "none")
    return null;
  if (s === "plainline")
    return /* @__PURE__ */ S.createElement("line", {
      strokeWidth: 4,
      fill: "none",
      stroke: u,
      strokeDasharray: M3(t.payload),
      x1: 0,
      y1: i,
      x2: St,
      y2: i,
      className: "recharts-legend-icon"
    });
  if (s === "line")
    return /* @__PURE__ */ S.createElement("path", {
      strokeWidth: 4,
      fill: "none",
      stroke: u,
      d: "M0,".concat(i, "h").concat(o, `
            A`).concat(a, ",").concat(a, ",0,1,1,").concat(2 * o, ",").concat(i, `
            H`).concat(St, "M").concat(2 * o, ",").concat(i, `
            A`).concat(a, ",").concat(a, ",0,1,1,").concat(o, ",").concat(i),
      className: "recharts-legend-icon"
    });
  if (s === "rect")
    return /* @__PURE__ */ S.createElement("path", {
      stroke: "none",
      fill: u,
      d: "M0,".concat(St / 8, "h").concat(St, "v").concat(St * 3 / 4, "h").concat(-St, "z"),
      className: "recharts-legend-icon"
    });
  if (/* @__PURE__ */ S.isValidElement(t.legendIcon)) {
    var l = ZA({}, t);
    return delete l.legendIcon, /* @__PURE__ */ S.cloneElement(t.legendIcon, l);
  }
  return /* @__PURE__ */ S.createElement(GA, {
    fill: u,
    cx: i,
    cy: i,
    size: St,
    sizeType: "diameter",
    type: s
  });
}
function R3(e) {
  var t = e.payload, r = e.iconSize, n = e.layout, i = e.formatter, a = e.inactiveColor, o = e.iconType, u = e.labelStyle, s = {
    x: 0,
    y: 0,
    width: St,
    height: St
  }, l = {
    display: n === "horizontal" ? "inline-block" : "block",
    marginRight: 10,
    whiteSpace: "nowrap"
  }, c = {
    display: "inline-block",
    verticalAlign: "middle",
    marginRight: 4
  };
  return t.map((f, d) => {
    var h, p, v = f.formatter || i, m = ze({
      "recharts-legend-item": !0,
      ["legend-item-".concat(d)]: !0,
      inactive: f.inactive
    });
    if (f.type === "none")
      return null;
    var y = typeof u == "object" ? ZA({}, u) : {};
    y.color = f.inactive ? a : y.color || f.color, (h = y.whiteSpace) !== null && h !== void 0 || (y.whiteSpace = "normal"), (p = y.overflowWrap) !== null && p !== void 0 || (y.overflowWrap = "break-word");
    var b = v ? v(f.value, f, d) : f.value;
    return /* @__PURE__ */ S.createElement("li", pu({
      className: m,
      style: l,
      key: "legend-item-".concat(d)
    }, XA(e, f, d)), /* @__PURE__ */ S.createElement(Sp, {
      width: r,
      height: r,
      viewBox: s,
      style: c,
      "aria-label": f.value == null ? "legend icon" : "".concat(f.value, " legend icon")
    }, /* @__PURE__ */ S.createElement(N3, {
      data: f,
      iconType: o,
      inactiveColor: a
    })), /* @__PURE__ */ S.createElement("span", {
      className: "recharts-legend-item-text",
      style: y
    }, b));
  });
}
var $3 = (e) => {
  var t = Vt(e, k3), r = t.payload, n = t.layout, i = t.align;
  if (!r || !r.length)
    return null;
  var a = {
    padding: 0,
    margin: 0,
    textAlign: n === "horizontal" ? i : "left"
  };
  return /* @__PURE__ */ S.createElement("ul", {
    className: "recharts-default-legend",
    style: a
  }, /* @__PURE__ */ S.createElement(R3, pu({}, t, {
    payload: r
  })));
};
function D3(e, t) {
  const r = /* @__PURE__ */ new Map();
  for (let n = 0; n < e.length; n++) {
    const i = e[n], a = t(i, n, e);
    r.has(a) || r.set(a, i);
  }
  return Array.from(r.values());
}
function j3(e, t) {
  return function(...r) {
    return e.apply(this, r.slice(0, t));
  };
}
function QA(e) {
  return e;
}
function L3(e) {
  return Number.isSafeInteger(e) && e >= 0;
}
function qp(e) {
  return e != null && typeof e != "function" && L3(e.length);
}
function q3(e) {
  return function(t) {
    return Zr(t, e);
  };
}
function JA(e) {
  return e == null || typeof e != "object" && typeof e != "function";
}
function z3(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function F3(e) {
  return Object.getOwnPropertySymbols(e).filter((t) => Object.prototype.propertyIsEnumerable.call(e, t));
}
function ms(e) {
  return e == null ? e === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(e);
}
const B3 = "[object RegExp]", eO = "[object String]", tO = "[object Number]", rO = "[object Boolean]", nO = "[object Arguments]", W3 = "[object Symbol]", U3 = "[object Date]", V3 = "[object Map]", H3 = "[object Set]", K3 = "[object Array]", G3 = "[object ArrayBuffer]", Y3 = "[object Object]", X3 = "[object DataView]", Z3 = "[object Uint8Array]", Q3 = "[object Uint8ClampedArray]", J3 = "[object Uint16Array]", e8 = "[object Uint32Array]", t8 = "[object Int8Array]", r8 = "[object Int16Array]", n8 = "[object Int32Array]", i8 = "[object Float32Array]", a8 = "[object Float64Array]", pg = typeof globalThis == "object" && globalThis || typeof window == "object" && window || typeof self == "object" && self || typeof global == "object" && global || /* @__PURE__ */ (function() {
  return this;
})();
function o8(e) {
  return typeof pg.Buffer < "u" && pg.Buffer.isBuffer(e);
}
function u8(e, t) {
  return An(e, void 0, e, /* @__PURE__ */ new Map(), t);
}
function An(e, t, r, n = /* @__PURE__ */ new Map(), i = void 0) {
  const a = i == null ? void 0 : i(e, t, r, n);
  if (a !== void 0) return a;
  if (JA(e)) return e;
  if (n.has(e)) return n.get(e);
  if (Array.isArray(e)) {
    const o = new Array(e.length);
    n.set(e, o);
    for (let u = 0; u < e.length; u++) o[u] = An(e[u], u, r, n, i);
    return Object.hasOwn(e, "index") && (o.index = e.index), Object.hasOwn(e, "input") && (o.input = e.input), o;
  }
  if (e instanceof Date) return new Date(e.getTime());
  if (e instanceof RegExp) {
    const o = new RegExp(e.source, e.flags);
    return o.lastIndex = e.lastIndex, o;
  }
  if (e instanceof Map) {
    const o = /* @__PURE__ */ new Map();
    n.set(e, o);
    for (const [u, s] of e) o.set(u, An(s, u, r, n, i));
    return o;
  }
  if (e instanceof Set) {
    const o = /* @__PURE__ */ new Set();
    n.set(e, o);
    for (const u of e) o.add(An(u, void 0, r, n, i));
    return o;
  }
  if (o8(e)) return e.subarray();
  if (z3(e)) {
    const o = new (Object.getPrototypeOf(e)).constructor(e.length);
    n.set(e, o);
    for (let u = 0; u < e.length; u++) o[u] = An(e[u], u, r, n, i);
    return o;
  }
  if (e instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && e instanceof SharedArrayBuffer) return e.slice(0);
  if (e instanceof DataView) {
    const o = new DataView(e.buffer.slice(0), e.byteOffset, e.byteLength);
    return n.set(e, o), qt(o, e, r, n, i), o;
  }
  if (typeof File < "u" && e instanceof File) {
    const o = new File([e], e.name, { type: e.type });
    return n.set(e, o), qt(o, e, r, n, i), o;
  }
  if (typeof Blob < "u" && e instanceof Blob) {
    const o = new Blob([e], { type: e.type });
    return n.set(e, o), qt(o, e, r, n, i), o;
  }
  if (e instanceof Error) {
    const o = structuredClone(e);
    return n.set(e, o), o.message = e.message, o.name = e.name, o.stack = e.stack, o.cause = e.cause, o.constructor = e.constructor, qt(o, e, r, n, i), o;
  }
  if (e instanceof Boolean) {
    const o = new Boolean(e.valueOf());
    return n.set(e, o), qt(o, e, r, n, i), o;
  }
  if (e instanceof Number) {
    const o = new Number(e.valueOf());
    return n.set(e, o), qt(o, e, r, n, i), o;
  }
  if (e instanceof String) {
    const o = new String(e.valueOf());
    return n.set(e, o), qt(o, e, r, n, i), o;
  }
  if (typeof e == "object" && s8(e)) {
    const o = Object.create(Object.getPrototypeOf(e));
    return n.set(e, o), qt(o, e, r, n, i), o;
  }
  return e;
}
function qt(e, t, r = e, n, i) {
  const a = [...Object.keys(t), ...F3(t)];
  for (let o = 0; o < a.length; o++) {
    const u = a[o], s = Object.getOwnPropertyDescriptor(e, u);
    (s == null || s.writable) && (e[u] = An(t[u], u, r, n, i));
  }
}
function s8(e) {
  switch (ms(e)) {
    case nO:
    case K3:
    case G3:
    case X3:
    case rO:
    case U3:
    case i8:
    case a8:
    case t8:
    case r8:
    case n8:
    case V3:
    case tO:
    case Y3:
    case B3:
    case H3:
    case eO:
    case W3:
    case Z3:
    case Q3:
    case J3:
    case e8:
      return !0;
    default:
      return !1;
  }
}
function l8(e) {
  return An(e, void 0, e, /* @__PURE__ */ new Map(), void 0);
}
function eu(e, t) {
  return e === t || Number.isNaN(e) && Number.isNaN(t);
}
function iO(e) {
  return e !== null && (typeof e == "object" || typeof e == "function");
}
function aO(e, t, r) {
  return typeof r != "function" ? aO(e, t, () => {
  }) : Cv(e, t, function n(i, a, o, u, s, l) {
    const c = r(i, a, o, u, s, l);
    return c !== void 0 ? !!c : Cv(i, a, n, l, !1);
  }, /* @__PURE__ */ new Map(), !0);
}
function Cv(e, t, r, n, i = !1) {
  if (t === e) return !0;
  switch (typeof t) {
    case "object":
      return c8(e, t, r, n, i);
    case "function":
      return Object.keys(t).length > 0 ? Cv(e, { ...t }, r, n, i) : eu(e, t);
    default:
      return iO(e) && i ? typeof t == "string" ? t === "" : !0 : eu(e, t);
  }
}
function c8(e, t, r, n, i = !1) {
  if (t == null) return !0;
  if (Array.isArray(t)) return oO(e, t, r, n);
  if (t instanceof Map) return f8(e, t, r, n);
  if (t instanceof Set) return d8(e, t, r, n);
  const a = Object.keys(t);
  if (e == null) return i && a.length === 0;
  if (i)
    JA(e) && (e = Object(e));
  else {
    const o = ms(e);
    if (o !== "[object Object]" && o !== "[object Arguments]") return !1;
  }
  if (a.length === 0) return !0;
  if (n != null && n.has(t)) return n.get(t) === e;
  n == null || n.set(t, e);
  try {
    for (let o = 0; o < a.length; o++) {
      const u = a[o];
      if (!(u in e) || t[u] === void 0 && e[u] !== void 0 || t[u] === null && e[u] !== null || !r(e[u], t[u], u, e, t, n)) return !1;
    }
    return !0;
  } finally {
    n == null || n.delete(t);
  }
}
function f8(e, t, r, n) {
  if (t.size === 0) return !0;
  if (!(e instanceof Map)) return !1;
  for (const [i, a] of t.entries()) if (r(e.get(i), a, i, e, t, n) === !1) return !1;
  return !0;
}
function oO(e, t, r, n) {
  if (t.length === 0) return !0;
  if (!Array.isArray(e)) return !1;
  const i = /* @__PURE__ */ new Set();
  for (let a = 0; a < t.length; a++) {
    const o = t[a];
    let u = !1;
    for (let s = 0; s < e.length; s++) {
      if (i.has(s)) continue;
      const l = e[s];
      let c = !1;
      if (r(l, o, a, e, t, n) && (c = !0), c) {
        i.add(s), u = !0;
        break;
      }
    }
    if (!u) return !1;
  }
  return !0;
}
function d8(e, t, r, n) {
  return t.size === 0 ? !0 : e instanceof Set ? oO([...e], [...t], r, n) : !1;
}
function uO(e, t) {
  return aO(e, t, () => {
  });
}
function h8(e) {
  return e = l8(e), (t) => uO(t, e);
}
function v8(e, t) {
  return u8(e, (r, n, i, a) => {
    if (typeof e == "object") {
      if (ms(e) === "[object Object]" && typeof e.constructor != "function") {
        const o = {};
        return a.set(e, o), qt(o, e, i, a), o;
      }
      switch (Object.prototype.toString.call(e)) {
        case tO:
        case eO:
        case rO: {
          const o = new e.constructor(e == null ? void 0 : e.valueOf());
          return qt(o, e), o;
        }
        case nO: {
          const o = {};
          return qt(o, e), o.length = e.length, o[Symbol.iterator] = e[Symbol.iterator], o;
        }
        default:
          return;
      }
    }
  });
}
function p8(e) {
  return v8(e);
}
const m8 = /^(?:0|[1-9]\d*)$/;
function sO(e, t = Number.MAX_SAFE_INTEGER) {
  switch (typeof e) {
    case "number":
      return Number.isInteger(e) && e >= 0 && e < t;
    case "symbol":
      return !1;
    case "string":
      return m8.test(e);
  }
}
function y8(e) {
  return e !== null && typeof e == "object" && ms(e) === "[object Arguments]";
}
function g8(e, t) {
  let r;
  if (Array.isArray(t) ? r = t : typeof t == "string" && mA(t) && !(t in Object(e)) ? r = Pp(t) : r = [t], r.length === 0) return !1;
  let n = e;
  for (let i = 0; i < r.length; i++) {
    const a = fs(r[i]);
    if ((n == null || !Object.hasOwn(n, a)) && !((Array.isArray(n) || y8(n)) && sO(a) && Number(a) < n.length))
      return !1;
    n = n[a];
  }
  return !0;
}
function b8(e, t) {
  switch (typeof e) {
    case "object":
      Object.is(e == null ? void 0 : e.valueOf(), -0) && (e = "-0");
      break;
    case "number":
      e = fs(e);
      break;
  }
  return t = p8(t), function(r) {
    const n = Zr(r, e);
    return n === void 0 ? g8(r, e) : t === void 0 ? n === void 0 : uO(n, t);
  };
}
function _8(e) {
  if (e == null) return QA;
  switch (typeof e) {
    case "function":
      return e;
    case "object":
      return Array.isArray(e) && e.length === 2 ? b8(e[0], e[1]) : h8(e);
    default:
      return q3(e);
  }
}
function w8(e) {
  return e === 0 ? 0 : e;
}
function mg(e, t = QA) {
  return qp(e) ? D3(Array.from(e), j3(_8(t), 1)).map(w8) : [];
}
function lO(e, t, r) {
  return t === !0 ? mg(e, r) : typeof t == "function" ? mg(e, t) : e;
}
var To = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ht(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Co = { exports: {} }, fc = {}, Io = { exports: {} }, dc = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var yg;
function x8() {
  if (yg) return dc;
  yg = 1;
  var e = Ri;
  function t(f, d) {
    return f === d && (f !== 0 || 1 / f === 1 / d) || f !== f && d !== d;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useState, i = e.useEffect, a = e.useLayoutEffect, o = e.useDebugValue;
  function u(f, d) {
    var h = d(), p = n({ inst: { value: h, getSnapshot: d } }), v = p[0].inst, m = p[1];
    return a(
      function() {
        v.value = h, v.getSnapshot = d, s(v) && m({ inst: v });
      },
      [f, h, d]
    ), i(
      function() {
        return s(v) && m({ inst: v }), f(function() {
          s(v) && m({ inst: v });
        });
      },
      [f]
    ), o(h), h;
  }
  function s(f) {
    var d = f.getSnapshot;
    f = f.value;
    try {
      var h = d();
      return !r(f, h);
    } catch {
      return !0;
    }
  }
  function l(f, d) {
    return d();
  }
  var c = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? l : u;
  return dc.useSyncExternalStore = e.useSyncExternalStore !== void 0 ? e.useSyncExternalStore : c, dc;
}
var hc = {};
/**
 * @license React
 * use-sync-external-store-shim.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gg;
function A8() {
  return gg || (gg = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(h, p) {
      return h === p && (h !== 0 || 1 / h === 1 / p) || h !== h && p !== p;
    }
    function t(h, p) {
      c || i.startTransition === void 0 || (c = !0, console.error(
        "You are using an outdated, pre-release alpha of React 18 that does not support useSyncExternalStore. The use-sync-external-store shim will not work correctly. Upgrade to a newer pre-release."
      ));
      var v = p();
      if (!f) {
        var m = p();
        a(v, m) || (console.error(
          "The result of getSnapshot should be cached to avoid an infinite loop"
        ), f = !0);
      }
      m = o({
        inst: { value: v, getSnapshot: p }
      });
      var y = m[0].inst, b = m[1];
      return s(
        function() {
          y.value = v, y.getSnapshot = p, r(y) && b({ inst: y });
        },
        [h, v, p]
      ), u(
        function() {
          return r(y) && b({ inst: y }), h(function() {
            r(y) && b({ inst: y });
          });
        },
        [h]
      ), l(v), v;
    }
    function r(h) {
      var p = h.getSnapshot;
      h = h.value;
      try {
        var v = p();
        return !a(h, v);
      } catch {
        return !0;
      }
    }
    function n(h, p) {
      return p();
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var i = Ri, a = typeof Object.is == "function" ? Object.is : e, o = i.useState, u = i.useEffect, s = i.useLayoutEffect, l = i.useDebugValue, c = !1, f = !1, d = typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u" ? n : t;
    hc.useSyncExternalStore = i.useSyncExternalStore !== void 0 ? i.useSyncExternalStore : d, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), hc;
}
var bg;
function cO() {
  return bg || (bg = 1, process.env.NODE_ENV === "production" ? Io.exports = x8() : Io.exports = A8()), Io.exports;
}
/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _g;
function O8() {
  if (_g) return fc;
  _g = 1;
  var e = Ri, t = cO();
  function r(l, c) {
    return l === c && (l !== 0 || 1 / l === 1 / c) || l !== l && c !== c;
  }
  var n = typeof Object.is == "function" ? Object.is : r, i = t.useSyncExternalStore, a = e.useRef, o = e.useEffect, u = e.useMemo, s = e.useDebugValue;
  return fc.useSyncExternalStoreWithSelector = function(l, c, f, d, h) {
    var p = a(null);
    if (p.current === null) {
      var v = { hasValue: !1, value: null };
      p.current = v;
    } else v = p.current;
    p = u(
      function() {
        function y(w) {
          if (!b) {
            if (b = !0, g = w, w = d(w), h !== void 0 && v.hasValue) {
              var A = v.value;
              if (h(A, w))
                return _ = A;
            }
            return _ = w;
          }
          if (A = _, n(g, w)) return A;
          var P = d(w);
          return h !== void 0 && h(A, P) ? (g = w, A) : (g = w, _ = P);
        }
        var b = !1, g, _, x = f === void 0 ? null : f;
        return [
          function() {
            return y(c());
          },
          x === null ? void 0 : function() {
            return y(x());
          }
        ];
      },
      [c, f, d, h]
    );
    var m = i(l, p[0], p[1]);
    return o(
      function() {
        v.hasValue = !0, v.value = m;
      },
      [m]
    ), s(m), m;
  }, fc;
}
var vc = {};
/**
 * @license React
 * use-sync-external-store-shim/with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var wg;
function S8() {
  return wg || (wg = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(l, c) {
      return l === c && (l !== 0 || 1 / l === 1 / c) || l !== l && c !== c;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var t = Ri, r = cO(), n = typeof Object.is == "function" ? Object.is : e, i = r.useSyncExternalStore, a = t.useRef, o = t.useEffect, u = t.useMemo, s = t.useDebugValue;
    vc.useSyncExternalStoreWithSelector = function(l, c, f, d, h) {
      var p = a(null);
      if (p.current === null) {
        var v = { hasValue: !1, value: null };
        p.current = v;
      } else v = p.current;
      p = u(
        function() {
          function y(w) {
            if (!b) {
              if (b = !0, g = w, w = d(w), h !== void 0 && v.hasValue) {
                var A = v.value;
                if (h(A, w))
                  return _ = A;
              }
              return _ = w;
            }
            if (A = _, n(g, w))
              return A;
            var P = d(w);
            return h !== void 0 && h(A, P) ? (g = w, A) : (g = w, _ = P);
          }
          var b = !1, g, _, x = f === void 0 ? null : f;
          return [
            function() {
              return y(c());
            },
            x === null ? void 0 : function() {
              return y(x());
            }
          ];
        },
        [c, f, d, h]
      );
      var m = i(l, p[0], p[1]);
      return o(
        function() {
          v.hasValue = !0, v.value = m;
        },
        [m]
      ), s(m), m;
    }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), vc;
}
var xg;
function E8() {
  return xg || (xg = 1, process.env.NODE_ENV === "production" ? Co.exports = O8() : Co.exports = S8()), Co.exports;
}
var P8 = E8(), zp = /* @__PURE__ */ et(null), T8 = (e) => e, $e = () => {
  var e = at(zp);
  return e ? e.store.dispatch : T8;
}, tu = () => {
}, C8 = () => tu, I8 = (e, t) => e === t;
function te(e) {
  var t = at(zp), r = ue(() => t ? (n) => {
    if (n != null)
      return e(n);
  } : tu, [t, e]);
  return P8.useSyncExternalStoreWithSelector(t ? t.subscription.addNestedSub : C8, t ? t.store.getState : tu, t ? t.store.getState : tu, r, I8);
}
var k8 = (e, t, r) => {
  if (t.length === 1 && t[0] === r) {
    let n = !1;
    try {
      const i = {};
      e(i) === i && (n = !0);
    } catch {
    }
    if (n) {
      let i;
      try {
        throw new Error();
      } catch (a) {
        ({ stack: i } = a);
      }
      console.warn(
        `The result function returned its own inputs without modification. e.g
\`createSelector([state => state.todos], todos => todos)\`
This could lead to inefficient memoization and unnecessary re-renders.
Ensure transformation logic is in the result function, and extraction logic is in the input selectors.`,
        { stack: i }
      );
    }
  }
}, M8 = (e, t, r) => {
  const { memoize: n, memoizeOptions: i } = t, { inputSelectorResults: a, inputSelectorResultsCopy: o } = e, u = n(() => ({}), ...i);
  if (!(u.apply(null, a) === u.apply(null, o))) {
    let l;
    try {
      throw new Error();
    } catch (c) {
      ({ stack: l } = c);
    }
    console.warn(
      `An input selector returned a different result when passed same arguments.
This means your output selector will likely run more frequently than intended.
Avoid returning a new reference inside your input selector, e.g.
\`createSelector([state => state.todos.map(todo => todo.id)], todoIds => todoIds.length)\``,
      {
        arguments: r,
        firstInputs: a,
        secondInputs: o,
        stack: l
      }
    );
  }
}, N8 = {
  inputStabilityCheck: "once",
  identityFunctionCheck: "once"
};
function R8(e, t = `expected a function, instead received ${typeof e}`) {
  if (typeof e != "function")
    throw new TypeError(t);
}
function $8(e, t = "expected all items to be functions, instead received the following types: ") {
  if (!e.every((r) => typeof r == "function")) {
    const r = e.map(
      (n) => typeof n == "function" ? `function ${n.name || "unnamed"}()` : typeof n
    ).join(", ");
    throw new TypeError(`${t}[${r}]`);
  }
}
var Ag = (e) => Array.isArray(e) ? e : [e];
function D8(e) {
  const t = Array.isArray(e[0]) ? e[0] : e;
  return $8(
    t,
    "createSelector expects all input-selectors to be functions, but received the following types: "
  ), t;
}
function Og(e, t) {
  const r = [], { length: n } = e;
  for (let i = 0; i < n; i++)
    r.push(e[i].apply(null, t));
  return r;
}
var j8 = (e, t) => {
  const { identityFunctionCheck: r, inputStabilityCheck: n } = {
    ...N8,
    ...t
  };
  return {
    identityFunctionCheck: {
      shouldRun: r === "always" || r === "once" && e,
      run: k8
    },
    inputStabilityCheck: {
      shouldRun: n === "always" || n === "once" && e,
      run: M8
    }
  };
}, L8 = class {
  constructor(e) {
    this.value = e;
  }
  deref() {
    return this.value;
  }
}, q8 = () => typeof WeakRef > "u" ? L8 : WeakRef, fO = /* @__PURE__ */ q8(), z8 = 0, Sg = 1;
function ko() {
  return {
    s: z8,
    v: void 0,
    o: null,
    p: null
  };
}
function F8(e) {
  return e instanceof fO ? e.deref() : e;
}
function dO(e, t = {}) {
  let r = ko();
  const { resultEqualityCheck: n } = t;
  let i, a = 0;
  function o() {
    let u = r;
    const { length: s } = arguments;
    for (let f = 0, d = s; f < d; f++) {
      const h = arguments[f];
      if (typeof h == "function" || typeof h == "object" && h !== null) {
        let p = u.o;
        p === null && (u.o = p = /* @__PURE__ */ new WeakMap());
        const v = p.get(h);
        v === void 0 ? (u = ko(), p.set(h, u)) : u = v;
      } else {
        let p = u.p;
        p === null && (u.p = p = /* @__PURE__ */ new Map());
        const v = p.get(h);
        v === void 0 ? (u = ko(), p.set(h, u)) : u = v;
      }
    }
    const l = u;
    let c;
    if (u.s === Sg)
      c = u.v;
    else if (c = e.apply(null, arguments), a++, n) {
      const f = F8(i);
      f != null && n(f, c) && (c = f, a !== 0 && a--), i = typeof c == "object" && c !== null || typeof c == "function" ? /* @__PURE__ */ new fO(c) : c;
    }
    return l.s = Sg, l.v = c, c;
  }
  return o.clearCache = () => {
    r = ko(), o.resetResultsCount();
  }, o.resultsCount = () => a, o.resetResultsCount = () => {
    a = 0;
  }, o;
}
function B8(e, ...t) {
  const r = typeof e == "function" ? {
    memoize: e,
    memoizeOptions: t
  } : e, n = (...i) => {
    let a = 0, o = 0, u, s = {}, l = i.pop();
    typeof l == "object" && (s = l, l = i.pop()), R8(
      l,
      `createSelector expects an output function after the inputs, but received: [${typeof l}]`
    );
    const c = {
      ...r,
      ...s
    }, {
      memoize: f,
      memoizeOptions: d = [],
      argsMemoize: h = dO,
      argsMemoizeOptions: p = []
    } = c, v = Ag(d), m = Ag(p), y = D8(i), b = f(function() {
      return a++, l.apply(
        null,
        arguments
      );
    }, ...v);
    let g = !0;
    const _ = h(function() {
      o++;
      const w = Og(
        y,
        arguments
      );
      if (u = b.apply(null, w), process.env.NODE_ENV !== "production") {
        const { devModeChecks: A = {} } = c, { identityFunctionCheck: P, inputStabilityCheck: T } = j8(g, A);
        if (P.shouldRun && P.run(
          l,
          w,
          u
        ), T.shouldRun) {
          const C = Og(
            y,
            arguments
          );
          T.run(
            { inputSelectorResults: w, inputSelectorResultsCopy: C },
            { memoize: f, memoizeOptions: v },
            arguments
          );
        }
        g && (g = !1);
      }
      return u;
    }, ...m);
    return Object.assign(_, {
      resultFunc: l,
      memoizedResultFunc: b,
      dependencies: y,
      dependencyRecomputations: () => o,
      resetDependencyRecomputations: () => {
        o = 0;
      },
      lastResult: () => u,
      recomputations: () => a,
      resetRecomputations: () => {
        a = 0;
      },
      memoize: f,
      argsMemoize: h
    });
  };
  return Object.assign(n, {
    withTypes: () => n
  }), n;
}
var I = /* @__PURE__ */ B8(dO);
function W8(e, t = 1) {
  const r = [], n = Math.floor(t), i = (a, o) => {
    for (let u = 0; u < a.length; u++) {
      const s = a[u];
      Array.isArray(s) && o < n ? i(s, o + 1) : r.push(s);
    }
  };
  return i(e, 0), r;
}
function Iv(e, t, r) {
  return iO(r) && (typeof t == "number" && qp(r) && sO(t) && t < r.length || typeof t == "string" && t in r) ? eu(r[t], e) : !1;
}
function Eg(e) {
  return typeof e == "symbol" ? 1 : e === null ? 2 : e === void 0 ? 3 : e !== e ? 4 : 0;
}
const U8 = (e, t, r) => {
  if (e !== t) {
    const n = Eg(e), i = Eg(t);
    if (n === i && n === 0) {
      if (e < t) return r === "desc" ? 1 : -1;
      if (e > t) return r === "desc" ? -1 : 1;
    }
    return r === "desc" ? i - n : n - i;
  }
  return 0;
}, V8 = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, H8 = /^\w*$/;
function K8(e, t) {
  return Array.isArray(e) ? !1 : typeof e == "number" || typeof e == "boolean" || e == null || Ep(e) ? !0 : typeof e == "string" && (H8.test(e) || !V8.test(e)) || t != null;
}
function G8(e, t, r, n) {
  if (e == null) return [];
  r = r, Array.isArray(e) || (e = qp(e) ? Array.from(e) : Object.values(e)), Array.isArray(t) || (t = t == null ? [null] : [t]), t.length === 0 && (t = [null]), Array.isArray(r) || (r = r == null ? [] : [r]), r = r.map((u) => String(u));
  const i = (u, s) => {
    let l = u, c = 0;
    for (; c < s.length && l != null; ++c) l = l[s[c]];
    return c > 0 && c === s.length ? l : void 0;
  }, a = (u, s) => {
    if (u == null) return s;
    if (s != null)
      return typeof u == "object" && "key" in u ? Object.hasOwn(s, u.key) ? s[u.key] : i(s, u.path) : typeof u == "function" ? u(s) : Array.isArray(u) ? i(s, u) : s[u];
  }, o = t.map((u) => (Array.isArray(u) && u.length === 1 && (u = u[0]), u == null || typeof u == "function" || Array.isArray(u) || K8(u) ? u : {
    key: u,
    path: Pp(u)
  }));
  return e.map((u) => ({
    original: u,
    criteria: o.map((s) => a(s, u))
  })).slice().sort((u, s) => {
    for (let l = 0; l < o.length; l++) {
      const c = U8(u.criteria[l], s.criteria[l], r[l]);
      if (c !== 0) return c;
    }
    return 0;
  }).map((u) => u.original);
}
function ys(e, ...t) {
  const r = t.length;
  return r > 1 && Iv(e, t[0], t[1]) ? t = [] : r > 2 && Iv(t[0], t[1], t[2]) && (t = [t[0]]), G8(e, W8(t), ["asc"]);
}
var hO = (e) => e.legend.settings, Y8 = (e) => e.legend.size, X8 = (e) => e.legend.payload, Z8 = I([X8, hO], (e, t) => {
  var r = t.itemSorter, n = e.flat(1);
  return r ? ys(n, r) : n;
});
function Q8() {
  return te(Z8);
}
function J8(e, t) {
  return n5(e) || r5(e, t) || t5(e, t) || e5();
}
function e5() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function t5(e, t) {
  if (e) {
    if (typeof e == "string") return Pg(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Pg(e, t) : void 0;
  }
}
function Pg(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function r5(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], s = !0, l = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(s = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (c) {
      l = !0, i = c;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function n5(e) {
  if (Array.isArray(e)) return e;
}
var Mo = 1;
function Tg(e, t) {
  return Math.abs(e.height - t.height) > Mo || Math.abs(e.left - t.left) > Mo || Math.abs(e.top - t.top) > Mo || Math.abs(e.width - t.width) > Mo;
}
function Cg(e) {
  var t = e.getBoundingClientRect();
  return {
    height: t.height,
    left: t.left,
    top: t.top,
    width: t.width
  };
}
function vO() {
  var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [], t = be({
    height: 0,
    left: 0,
    top: 0,
    width: 0
  }), r = J8(t, 2), n = r[0], i = r[1], a = J(null), o = J(n);
  o.current = n;
  var u = re(
    (s) => {
      if (a.current != null && (a.current.disconnect(), a.current = null), s != null) {
        var l = Cg(s);
        if (Tg(l, o.current) && i(l), typeof ResizeObserver < "u") {
          var c = new ResizeObserver(() => {
            var f = Cg(s);
            Tg(f, o.current) && i(f);
          });
          c.observe(s), a.current = c;
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...e]
  );
  return pe(() => () => {
    var s;
    (s = a.current) === null || s === void 0 || s.disconnect();
  }, []), [n, u];
}
function Ze(e) {
  return `Minified Redux error #${e}; visit https://redux.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var i5 = typeof Symbol == "function" && Symbol.observable || "@@observable", Ig = i5, pc = () => Math.random().toString(36).substring(7).split("").join("."), a5 = {
  INIT: `@@redux/INIT${/* @__PURE__ */ pc()}`,
  REPLACE: `@@redux/REPLACE${/* @__PURE__ */ pc()}`,
  PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${pc()}`
}, Tn = a5;
function Xa(e) {
  if (typeof e != "object" || e === null)
    return !1;
  let t = e;
  for (; Object.getPrototypeOf(t) !== null; )
    t = Object.getPrototypeOf(t);
  return Object.getPrototypeOf(e) === t || Object.getPrototypeOf(e) === null;
}
function o5(e) {
  if (e === void 0)
    return "undefined";
  if (e === null)
    return "null";
  const t = typeof e;
  switch (t) {
    case "boolean":
    case "string":
    case "number":
    case "symbol":
    case "function":
      return t;
  }
  if (Array.isArray(e))
    return "array";
  if (l5(e))
    return "date";
  if (s5(e))
    return "error";
  const r = u5(e);
  switch (r) {
    case "Symbol":
    case "Promise":
    case "WeakMap":
    case "WeakSet":
    case "Map":
    case "Set":
      return r;
  }
  return Object.prototype.toString.call(e).slice(8, -1).toLowerCase().replace(/\s/g, "");
}
function u5(e) {
  return typeof e.constructor == "function" ? e.constructor.name : null;
}
function s5(e) {
  return e instanceof Error || typeof e.message == "string" && e.constructor && typeof e.constructor.stackTraceLimit == "number";
}
function l5(e) {
  return e instanceof Date ? !0 : typeof e.toDateString == "function" && typeof e.getDate == "function" && typeof e.setDate == "function";
}
function Fr(e) {
  let t = typeof e;
  return process.env.NODE_ENV !== "production" && (t = o5(e)), t;
}
function pO(e, t, r) {
  if (typeof e != "function")
    throw new Error(process.env.NODE_ENV === "production" ? Ze(2) : `Expected the root reducer to be a function. Instead, received: '${Fr(e)}'`);
  if (typeof t == "function" && typeof r == "function" || typeof r == "function" && typeof arguments[3] == "function")
    throw new Error(process.env.NODE_ENV === "production" ? Ze(0) : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
  if (typeof t == "function" && typeof r > "u" && (r = t, t = void 0), typeof r < "u") {
    if (typeof r != "function")
      throw new Error(process.env.NODE_ENV === "production" ? Ze(1) : `Expected the enhancer to be a function. Instead, received: '${Fr(r)}'`);
    return r(pO)(e, t);
  }
  let n = e, i = t, a = /* @__PURE__ */ new Map(), o = a, u = 0, s = !1;
  function l() {
    o === a && (o = /* @__PURE__ */ new Map(), a.forEach((m, y) => {
      o.set(y, m);
    }));
  }
  function c() {
    if (s)
      throw new Error(process.env.NODE_ENV === "production" ? Ze(3) : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
    return i;
  }
  function f(m) {
    if (typeof m != "function")
      throw new Error(process.env.NODE_ENV === "production" ? Ze(4) : `Expected the listener to be a function. Instead, received: '${Fr(m)}'`);
    if (s)
      throw new Error(process.env.NODE_ENV === "production" ? Ze(5) : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
    let y = !0;
    l();
    const b = u++;
    return o.set(b, m), function() {
      if (y) {
        if (s)
          throw new Error(process.env.NODE_ENV === "production" ? Ze(6) : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
        y = !1, l(), o.delete(b), a = null;
      }
    };
  }
  function d(m) {
    if (!Xa(m))
      throw new Error(process.env.NODE_ENV === "production" ? Ze(7) : `Actions must be plain objects. Instead, the actual type was: '${Fr(m)}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`);
    if (typeof m.type > "u")
      throw new Error(process.env.NODE_ENV === "production" ? Ze(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
    if (typeof m.type != "string")
      throw new Error(process.env.NODE_ENV === "production" ? Ze(17) : `Action "type" property must be a string. Instead, the actual type was: '${Fr(m.type)}'. Value was: '${m.type}' (stringified)`);
    if (s)
      throw new Error(process.env.NODE_ENV === "production" ? Ze(9) : "Reducers may not dispatch actions.");
    try {
      s = !0, i = n(i, m);
    } finally {
      s = !1;
    }
    return (a = o).forEach((b) => {
      b();
    }), m;
  }
  function h(m) {
    if (typeof m != "function")
      throw new Error(process.env.NODE_ENV === "production" ? Ze(10) : `Expected the nextReducer to be a function. Instead, received: '${Fr(m)}`);
    n = m, d({
      type: Tn.REPLACE
    });
  }
  function p() {
    const m = f;
    return {
      /**
       * The minimal observable subscription method.
       * @param observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(y) {
        if (typeof y != "object" || y === null)
          throw new Error(process.env.NODE_ENV === "production" ? Ze(11) : `Expected the observer to be an object. Instead, received: '${Fr(y)}'`);
        function b() {
          const _ = y;
          _.next && _.next(c());
        }
        return b(), {
          unsubscribe: m(b)
        };
      },
      [Ig]() {
        return this;
      }
    };
  }
  return d({
    type: Tn.INIT
  }), {
    dispatch: d,
    subscribe: f,
    getState: c,
    replaceReducer: h,
    [Ig]: p
  };
}
function kg(e) {
  typeof console < "u" && typeof console.error == "function" && console.error(e);
  try {
    throw new Error(e);
  } catch {
  }
}
function c5(e, t, r, n) {
  const i = Object.keys(t), a = r && r.type === Tn.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
  if (i.length === 0)
    return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
  if (!Xa(e))
    return `The ${a} has unexpected type of "${Fr(e)}". Expected argument to be an object with the following keys: "${i.join('", "')}"`;
  const o = Object.keys(e).filter((u) => !t.hasOwnProperty(u) && !n[u]);
  if (o.forEach((u) => {
    n[u] = !0;
  }), !(r && r.type === Tn.REPLACE) && o.length > 0)
    return `Unexpected ${o.length > 1 ? "keys" : "key"} "${o.join('", "')}" found in ${a}. Expected to find one of the known reducer keys instead: "${i.join('", "')}". Unexpected keys will be ignored.`;
}
function f5(e) {
  Object.keys(e).forEach((t) => {
    const r = e[t];
    if (typeof r(void 0, {
      type: Tn.INIT
    }) > "u")
      throw new Error(process.env.NODE_ENV === "production" ? Ze(12) : `The slice reducer for key "${t}" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);
    if (typeof r(void 0, {
      type: Tn.PROBE_UNKNOWN_ACTION()
    }) > "u")
      throw new Error(process.env.NODE_ENV === "production" ? Ze(13) : `The slice reducer for key "${t}" returned undefined when probed with a random type. Don't try to handle '${Tn.INIT}' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.`);
  });
}
function mO(e) {
  const t = Object.keys(e), r = {};
  for (let o = 0; o < t.length; o++) {
    const u = t[o];
    process.env.NODE_ENV !== "production" && typeof e[u] > "u" && kg(`No reducer provided for key "${u}"`), typeof e[u] == "function" && (r[u] = e[u]);
  }
  const n = Object.keys(r);
  let i;
  process.env.NODE_ENV !== "production" && (i = {});
  let a;
  try {
    f5(r);
  } catch (o) {
    a = o;
  }
  return function(u = {}, s) {
    if (a)
      throw a;
    if (process.env.NODE_ENV !== "production") {
      const f = c5(u, r, s, i);
      f && kg(f);
    }
    let l = !1;
    const c = {};
    for (let f = 0; f < n.length; f++) {
      const d = n[f], h = r[d], p = u[d], v = h(p, s);
      if (typeof v > "u") {
        const m = s && s.type;
        throw new Error(process.env.NODE_ENV === "production" ? Ze(14) : `When called with an action of type ${m ? `"${String(m)}"` : "(unknown type)"}, the slice reducer for key "${d}" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.`);
      }
      c[d] = v, l = l || v !== p;
    }
    return l = l || n.length !== Object.keys(u).length, l ? c : u;
  };
}
function mu(...e) {
  return e.length === 0 ? (t) => t : e.length === 1 ? e[0] : e.reduce((t, r) => (...n) => t(r(...n)));
}
function d5(...e) {
  return (t) => (r, n) => {
    const i = t(r, n);
    let a = () => {
      throw new Error(process.env.NODE_ENV === "production" ? Ze(15) : "Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
    };
    const o = {
      getState: i.getState,
      dispatch: (s, ...l) => a(s, ...l)
    }, u = e.map((s) => s(o));
    return a = mu(...u)(i.dispatch), {
      ...i,
      dispatch: a
    };
  };
}
function Fp(e) {
  return Xa(e) && "type" in e && typeof e.type == "string";
}
var yO = Symbol.for("immer-nothing"), Mg = Symbol.for("immer-draftable"), it = Symbol.for("immer-state"), h5 = process.env.NODE_ENV !== "production" ? [
  // All error codes, starting by 0:
  function(e) {
    return `The plugin for '${e}' has not been loaded into Immer. To enable the plugin, import and call \`enable${e}()\` when initializing your application.`;
  },
  function(e) {
    return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${e}'`;
  },
  "This object has been frozen and should not be mutated",
  function(e) {
    return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + e;
  },
  "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
  "Immer forbids circular references",
  "The first or second argument to `produce` must be a function",
  "The third argument to `produce` must be a function or undefined",
  "First argument to `createDraft` must be a plain object, an array, or an immerable object",
  "First argument to `finishDraft` must be a draft returned by `createDraft`",
  function(e) {
    return `'current' expects a draft, got: ${e}`;
  },
  "Object.defineProperty() cannot be used on an Immer draft",
  "Object.setPrototypeOf() cannot be used on an Immer draft",
  "Immer only supports deleting array indices",
  "Immer only supports setting array indices and the 'length' property",
  function(e) {
    return `'original' expects a draft, got: ${e}`;
  }
  // Note: if more errors are added, the errorOffset in Patches.ts should be increased
  // See Patches.ts for additional errors
] : [];
function ht(e, ...t) {
  if (process.env.NODE_ENV !== "production") {
    const r = h5[e], n = _n(r) ? r.apply(null, t) : r;
    throw new Error(`[Immer] ${n}`);
  }
  throw new Error(
    `[Immer] minified error nr: ${e}. Full error at: https://bit.ly/3cXEKWf`
  );
}
var pt = Object, Ai = pt.getPrototypeOf, yu = "constructor", gs = "prototype", kv = "configurable", gu = "enumerable", ru = "writable", Ma = "value", Ir = (e) => !!e && !!e[it];
function kt(e) {
  var t;
  return e ? gO(e) || _s(e) || !!e[Mg] || !!((t = e[yu]) != null && t[Mg]) || ws(e) || xs(e) : !1;
}
var v5 = pt[gs][yu].toString(), Ng = /* @__PURE__ */ new WeakMap();
function gO(e) {
  if (!e || !Bp(e))
    return !1;
  const t = Ai(e);
  if (t === null || t === pt[gs])
    return !0;
  const r = pt.hasOwnProperty.call(t, yu) && t[yu];
  if (r === Object)
    return !0;
  if (!_n(r))
    return !1;
  let n = Ng.get(r);
  return n === void 0 && (n = Function.toString.call(r), Ng.set(r, n)), n === v5;
}
function bs(e, t, r = !0) {
  Za(e) === 0 ? (r ? Reflect.ownKeys(e) : pt.keys(e)).forEach((i) => {
    t(i, e[i], e);
  }) : e.forEach((n, i) => t(i, n, e));
}
function Za(e) {
  const t = e[it];
  return t ? t.type_ : _s(e) ? 1 : ws(e) ? 2 : xs(e) ? 3 : 0;
}
var mc = (e, t, r = Za(e)) => r === 2 ? e.has(t) : pt[gs].hasOwnProperty.call(e, t), Mv = (e, t, r = Za(e)) => (
  // @ts-ignore
  r === 2 ? e.get(t) : e[t]
), bu = (e, t, r, n = Za(e)) => {
  n === 2 ? e.set(t, r) : n === 3 ? e.add(r) : e[t] = r;
};
function p5(e, t) {
  return e === t ? e !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
var _s = Array.isArray, ws = (e) => e instanceof Map, xs = (e) => e instanceof Set, Bp = (e) => typeof e == "object", _n = (e) => typeof e == "function", yc = (e) => typeof e == "boolean";
function m5(e) {
  const t = +e;
  return Number.isInteger(t) && String(t) === e;
}
var xr = (e) => e.copy_ || e.base_, Wp = (e) => e.modified_ ? e.copy_ : e.base_;
function Nv(e, t) {
  if (ws(e))
    return new Map(e);
  if (xs(e))
    return new Set(e);
  if (_s(e))
    return Array[gs].slice.call(e);
  const r = gO(e);
  if (t === !0 || t === "class_only" && !r) {
    const n = pt.getOwnPropertyDescriptors(e);
    delete n[it];
    let i = Reflect.ownKeys(n);
    for (let a = 0; a < i.length; a++) {
      const o = i[a], u = n[o];
      u[ru] === !1 && (u[ru] = !0, u[kv] = !0), (u.get || u.set) && (n[o] = {
        [kv]: !0,
        [ru]: !0,
        // could live with !!desc.set as well here...
        [gu]: u[gu],
        [Ma]: e[o]
      });
    }
    return pt.create(Ai(e), n);
  } else {
    const n = Ai(e);
    if (n !== null && r)
      return { ...e };
    const i = pt.create(n);
    return pt.assign(i, e);
  }
}
function Up(e, t = !1) {
  return As(e) || Ir(e) || !kt(e) || (Za(e) > 1 && pt.defineProperties(e, {
    set: No,
    add: No,
    clear: No,
    delete: No
  }), pt.freeze(e), t && bs(
    e,
    (r, n) => {
      Up(n, !0);
    },
    !1
  )), e;
}
function y5() {
  ht(2);
}
var No = {
  [Ma]: y5
};
function As(e) {
  return e === null || !Bp(e) ? !0 : pt.isFrozen(e);
}
var _u = "MapSet", Rv = "Patches", Rg = "ArrayMethods", bO = {};
function $n(e) {
  const t = bO[e];
  return t || ht(0, e), t;
}
var $g = (e) => !!bO[e], Na, _O = () => Na, g5 = (e, t) => ({
  drafts_: [],
  parent_: e,
  immer_: t,
  // Whenever the modified draft contains a draft from another scope, we
  // need to prevent auto-freezing so the unowned draft can be finalized.
  canAutoFreeze_: !0,
  unfinalizedDrafts_: 0,
  handledSet_: /* @__PURE__ */ new Set(),
  processedForPatches_: /* @__PURE__ */ new Set(),
  mapSetPlugin_: $g(_u) ? $n(_u) : void 0,
  arrayMethodsPlugin_: $g(Rg) ? $n(Rg) : void 0
});
function Dg(e, t) {
  t && (e.patchPlugin_ = $n(Rv), e.patches_ = [], e.inversePatches_ = [], e.patchListener_ = t);
}
function $v(e) {
  Dv(e), e.drafts_.forEach(b5), e.drafts_ = null;
}
function Dv(e) {
  e === Na && (Na = e.parent_);
}
var jg = (e) => Na = g5(Na, e);
function b5(e) {
  const t = e[it];
  t.type_ === 0 || t.type_ === 1 ? t.revoke_() : t.revoked_ = !0;
}
function Lg(e, t) {
  t.unfinalizedDrafts_ = t.drafts_.length;
  const r = t.drafts_[0];
  if (e !== void 0 && e !== r) {
    r[it].modified_ && ($v(t), ht(4)), kt(e) && (e = qg(t, e));
    const { patchPlugin_: i } = t;
    i && i.generateReplacementPatches_(
      r[it].base_,
      e,
      t
    );
  } else
    e = qg(t, r);
  return _5(t, e, !0), $v(t), t.patches_ && t.patchListener_(t.patches_, t.inversePatches_), e !== yO ? e : void 0;
}
function qg(e, t) {
  if (As(t))
    return t;
  const r = t[it];
  if (!r)
    return wu(t, e.handledSet_, e);
  if (!Os(r, e))
    return t;
  if (!r.modified_)
    return r.base_;
  if (!r.finalized_) {
    const { callbacks_: n } = r;
    if (n)
      for (; n.length > 0; )
        n.pop()(e);
    AO(r, e);
  }
  return r.copy_;
}
function _5(e, t, r = !1) {
  !e.parent_ && e.immer_.autoFreeze_ && e.canAutoFreeze_ && Up(t, r);
}
function wO(e) {
  e.finalized_ = !0, e.scope_.unfinalizedDrafts_--;
}
var Os = (e, t) => e.scope_ === t, w5 = [];
function xO(e, t, r, n) {
  const i = xr(e), a = e.type_;
  if (n !== void 0 && Mv(i, n, a) === t) {
    bu(i, n, r, a);
    return;
  }
  if (!e.draftLocations_) {
    const u = e.draftLocations_ = /* @__PURE__ */ new Map();
    bs(i, (s, l) => {
      if (Ir(l)) {
        const c = u.get(l) || [];
        c.push(s), u.set(l, c);
      }
    });
  }
  const o = e.draftLocations_.get(t) ?? w5;
  for (const u of o)
    bu(i, u, r, a);
}
function x5(e, t, r) {
  e.callbacks_.push(function(i) {
    var u;
    const a = t;
    if (!a || !Os(a, i))
      return;
    (u = i.mapSetPlugin_) == null || u.fixSetContents(a);
    const o = Wp(a);
    xO(e, a.draft_ ?? a, o, r), AO(a, i);
  });
}
function AO(e, t) {
  var n;
  if (e.modified_ && !e.finalized_ && (e.type_ === 3 || e.type_ === 1 && e.allIndicesReassigned_ || (((n = e.assigned_) == null ? void 0 : n.size) ?? 0) > 0)) {
    const { patchPlugin_: i } = t;
    if (i) {
      const a = i.getPath(e);
      a && i.generatePatches_(e, a, t);
    }
    wO(e);
  }
}
function A5(e, t, r) {
  const { scope_: n } = e;
  if (Ir(r)) {
    const i = r[it];
    Os(i, n) && i.callbacks_.push(function() {
      nu(e);
      const o = Wp(i);
      xO(e, r, o, t);
    });
  } else kt(r) && e.callbacks_.push(function() {
    const a = xr(e);
    e.type_ === 3 ? a.has(r) && wu(r, n.handledSet_, n) : Mv(a, t, e.type_) === r && n.drafts_.length > 1 && (e.assigned_.get(t) ?? !1) === !0 && e.copy_ && wu(
      Mv(e.copy_, t, e.type_),
      n.handledSet_,
      n
    );
  });
}
function wu(e, t, r) {
  return !r.immer_.autoFreeze_ && r.unfinalizedDrafts_ < 1 || Ir(e) || t.has(e) || !kt(e) || As(e) || (t.add(e), bs(e, (n, i) => {
    if (Ir(i)) {
      const a = i[it];
      if (Os(a, r)) {
        const o = Wp(a);
        bu(e, n, o, e.type_), wO(a);
      }
    } else kt(i) && wu(i, t, r);
  })), e;
}
function O5(e, t) {
  const r = _s(e), n = {
    type_: r ? 1 : 0,
    // Track which produce call this is associated with.
    scope_: t ? t.scope_ : _O(),
    // True for both shallow and deep changes.
    modified_: !1,
    // Used during finalization.
    finalized_: !1,
    // Track which properties have been assigned (true) or deleted (false).
    // actually instantiated in `prepareCopy()`
    assigned_: void 0,
    // The parent draft state.
    parent_: t,
    // The base state.
    base_: e,
    // The base proxy.
    draft_: null,
    // set below
    // The base copy with any updated values.
    copy_: null,
    // Called by the `produce` function.
    revoke_: null,
    isManual_: !1,
    // `callbacks` actually gets assigned in `createProxy`
    callbacks_: void 0
  };
  let i = n, a = xu;
  r && (i = [n], a = Ra);
  const { revoke: o, proxy: u } = Proxy.revocable(i, a);
  return n.draft_ = u, n.revoke_ = o, [u, n];
}
var xu = {
  get(e, t) {
    if (t === it)
      return e;
    let r = e.scope_.arrayMethodsPlugin_;
    const n = e.type_ === 1 && typeof t == "string";
    if (n && r != null && r.isArrayOperationMethod(t))
      return r.createMethodInterceptor(e, t);
    const i = xr(e);
    if (!mc(i, t, e.type_))
      return E5(e, i, t);
    const a = i[t];
    if (e.finalized_ || !kt(a) || n && e.operationMethod && (r != null && r.isMutatingArrayMethod(
      e.operationMethod
    )) && m5(t))
      return a;
    if (a === gc(e.base_, t) || S5(e, t, a)) {
      nu(e);
      const o = e.type_ === 1 ? +t : t, u = Lv(e.scope_, a, e, o);
      return e.copy_[o] = u;
    }
    return a;
  },
  has(e, t) {
    return t in xr(e);
  },
  ownKeys(e) {
    return Reflect.ownKeys(xr(e));
  },
  set(e, t, r) {
    const n = OO(xr(e), t);
    if (n != null && n.set)
      return n.set.call(e.draft_, r), !0;
    if (!e.modified_) {
      const i = gc(xr(e), t), a = i == null ? void 0 : i[it];
      if (a && a.base_ === r)
        return e.copy_[t] = r, e.assigned_.set(t, !1), !0;
      if (p5(r, i) && (r !== void 0 || mc(e.base_, t, e.type_)))
        return !0;
      nu(e), jv(e);
    }
    return e.copy_[t] === r && // special case: handle new props with value 'undefined'
    (r !== void 0 || mc(e.copy_, t, e.type_)) || // special case: NaN
    Number.isNaN(r) && Number.isNaN(e.copy_[t]) || (e.copy_[t] = r, e.assigned_.set(t, !0), A5(e, t, r)), !0;
  },
  deleteProperty(e, t) {
    return nu(e), gc(e.base_, t) !== void 0 || t in e.base_ ? (e.assigned_.set(t, !1), jv(e)) : e.assigned_.delete(t), e.copy_ && delete e.copy_[t], !0;
  },
  // Note: We never coerce `desc.value` into an Immer draft, because we can't make
  // the same guarantee in ES5 mode.
  getOwnPropertyDescriptor(e, t) {
    const r = xr(e), n = Reflect.getOwnPropertyDescriptor(r, t);
    return n && {
      [ru]: !0,
      [kv]: e.type_ !== 1 || t !== "length",
      [gu]: n[gu],
      [Ma]: r[t]
    };
  },
  defineProperty() {
    ht(11);
  },
  getPrototypeOf(e) {
    return Ai(e.base_);
  },
  setPrototypeOf() {
    ht(12);
  }
}, Ra = {};
for (let e in xu) {
  let t = xu[e];
  Ra[e] = function() {
    const r = arguments;
    return r[0] = r[0][0], t.apply(this, r);
  };
}
Ra.deleteProperty = function(e, t) {
  return process.env.NODE_ENV !== "production" && isNaN(parseInt(t)) && ht(13), Ra.set.call(this, e, t, void 0);
};
Ra.set = function(e, t, r) {
  return process.env.NODE_ENV !== "production" && t !== "length" && isNaN(parseInt(t)) && ht(14), xu.set.call(this, e[0], t, r, e[0]);
};
function gc(e, t) {
  const r = e[it];
  return (r ? xr(r) : e)[t];
}
function S5(e, t, r) {
  var n;
  return e.type_ !== 1 || !e.allIndicesReassigned_ || (n = e.assigned_) != null && n.get(t) || !kt(r) || r[it] ? !1 : e.baseRefs_.has(r);
}
function E5(e, t, r) {
  var i;
  const n = OO(t, r);
  return n ? Ma in n ? n[Ma] : (
    // This is a very special case, if the prop is a getter defined by the
    // prototype, we should invoke it with the draft as context!
    (i = n.get) == null ? void 0 : i.call(e.draft_)
  ) : void 0;
}
function OO(e, t) {
  if (!(t in e))
    return;
  let r = Ai(e);
  for (; r; ) {
    const n = Object.getOwnPropertyDescriptor(r, t);
    if (n)
      return n;
    r = Ai(r);
  }
}
function jv(e) {
  e.modified_ || (e.modified_ = !0, e.parent_ && jv(e.parent_));
}
function nu(e) {
  e.copy_ || (e.assigned_ = /* @__PURE__ */ new Map(), e.copy_ = Nv(
    e.base_,
    e.scope_.immer_.useStrictShallowCopy_
  ));
}
var P5 = class {
  constructor(e) {
    this.autoFreeze_ = !0, this.useStrictShallowCopy_ = !1, this.useStrictIteration_ = !1, this.produce = (t, r, n) => {
      if (_n(t) && !_n(r)) {
        const a = r;
        r = t;
        const o = this;
        return function(s = a, ...l) {
          return o.produce(s, (c) => r.call(this, c, ...l));
        };
      }
      _n(r) || ht(6), n !== void 0 && !_n(n) && ht(7);
      let i;
      if (kt(t)) {
        const a = jg(this), o = Lv(a, t, void 0);
        let u = !0;
        try {
          i = r(o), u = !1;
        } finally {
          u ? $v(a) : Dv(a);
        }
        return Dg(a, n), Lg(i, a);
      } else if (!t || !Bp(t)) {
        if (i = r(t), i === void 0 && (i = t), i === yO && (i = void 0), this.autoFreeze_ && Up(i, !0), n) {
          const a = [], o = [];
          $n(Rv).generateReplacementPatches_(t, i, {
            patches_: a,
            inversePatches_: o
          }), n(a, o);
        }
        return i;
      } else
        ht(1, t);
    }, this.produceWithPatches = (t, r) => {
      if (_n(t))
        return (o, ...u) => this.produceWithPatches(o, (s) => t(s, ...u));
      let n, i;
      return [this.produce(t, r, (o, u) => {
        n = o, i = u;
      }), n, i];
    }, yc(e == null ? void 0 : e.autoFreeze) && this.setAutoFreeze(e.autoFreeze), yc(e == null ? void 0 : e.useStrictShallowCopy) && this.setUseStrictShallowCopy(e.useStrictShallowCopy), yc(e == null ? void 0 : e.useStrictIteration) && this.setUseStrictIteration(e.useStrictIteration);
  }
  createDraft(e) {
    kt(e) || ht(8), Ir(e) && (e = Tt(e));
    const t = jg(this), r = Lv(t, e, void 0);
    return r[it].isManual_ = !0, Dv(t), r;
  }
  finishDraft(e, t) {
    const r = e && e[it];
    (!r || !r.isManual_) && ht(9);
    const { scope_: n } = r;
    return Dg(n, t), Lg(void 0, n);
  }
  /**
   * Pass true to automatically freeze all copies created by Immer.
   *
   * By default, auto-freezing is enabled.
   */
  setAutoFreeze(e) {
    this.autoFreeze_ = e;
  }
  /**
   * Pass true to enable strict shallow copy.
   *
   * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
   */
  setUseStrictShallowCopy(e) {
    this.useStrictShallowCopy_ = e;
  }
  /**
   * Pass false to use faster iteration that skips non-enumerable properties
   * but still handles symbols for compatibility.
   *
   * By default, strict iteration is enabled (includes all own properties).
   */
  setUseStrictIteration(e) {
    this.useStrictIteration_ = e;
  }
  shouldUseStrictIteration() {
    return this.useStrictIteration_;
  }
  applyPatches(e, t) {
    let r;
    for (r = t.length - 1; r >= 0; r--) {
      const i = t[r];
      if (i.path.length === 0 && i.op === "replace") {
        e = i.value;
        break;
      }
    }
    r > -1 && (t = t.slice(r + 1));
    const n = $n(Rv).applyPatches_;
    return Ir(e) ? n(e, t) : this.produce(
      e,
      (i) => n(i, t)
    );
  }
};
function Lv(e, t, r, n) {
  const [i, a] = ws(t) ? $n(_u).proxyMap_(t, r) : xs(t) ? $n(_u).proxySet_(t, r) : O5(t, r);
  return ((r == null ? void 0 : r.scope_) ?? _O()).drafts_.push(i), a.callbacks_ = (r == null ? void 0 : r.callbacks_) ?? [], a.key_ = n, r && n !== void 0 ? x5(r, a, n) : a.callbacks_.push(function(s) {
    var c;
    (c = s.mapSetPlugin_) == null || c.fixSetContents(a);
    const { patchPlugin_: l } = s;
    a.modified_ && l && l.generatePatches_(a, [], s);
  }), i;
}
function Tt(e) {
  return Ir(e) || ht(10, e), SO(e);
}
function SO(e) {
  if (!kt(e) || As(e))
    return e;
  const t = e[it];
  let r, n = !0;
  if (t) {
    if (!t.modified_)
      return t.base_;
    t.finalized_ = !0, r = Nv(e, t.scope_.immer_.useStrictShallowCopy_), n = t.scope_.immer_.shouldUseStrictIteration();
  } else
    r = Nv(e, !0);
  return bs(
    r,
    (i, a) => {
      bu(r, i, SO(a));
    },
    n
  ), t && (t.finalized_ = !1), r;
}
var bc = globalThis.Iterator;
bc == null || bc.from;
var T5 = new P5(), EO = T5.produce, se = (e) => e;
function PO(e) {
  return ({ dispatch: r, getState: n }) => (i) => (a) => typeof a == "function" ? a(r, n, e) : i(a);
}
var C5 = PO(), I5 = PO, k5 = typeof window < "u" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
  if (arguments.length !== 0)
    return typeof arguments[0] == "object" ? mu : mu.apply(null, arguments);
}, M5 = (e) => e && typeof e.match == "function";
function gt(e, t) {
  function r(...n) {
    if (t) {
      let i = t(...n);
      if (!i)
        throw new Error(process.env.NODE_ENV === "production" ? he(0) : "prepareAction did not return an object");
      return {
        type: e,
        payload: i.payload,
        ..."meta" in i && {
          meta: i.meta
        },
        ..."error" in i && {
          error: i.error
        }
      };
    }
    return {
      type: e,
      payload: n[0]
    };
  }
  return r.toString = () => `${e}`, r.type = e, r.match = (n) => Fp(n) && n.type === e, r;
}
function N5(e) {
  return typeof e == "function" && "type" in e && // hasMatchFunction only wants Matchers but I don't see the point in rewriting it
  M5(e);
}
function R5(e) {
  const t = e ? `${e}`.split("/") : [], r = t[t.length - 1] || "actionCreator";
  return `Detected an action creator with type "${e || "unknown"}" being dispatched.
Make sure you're calling the action creator before dispatching, i.e. \`dispatch(${r}())\` instead of \`dispatch(${r})\`. This is necessary even if the action has no payload.`;
}
function $5(e = {}) {
  if (process.env.NODE_ENV === "production")
    return () => (r) => (n) => r(n);
  const {
    isActionCreator: t = N5
  } = e;
  return () => (r) => (n) => (t(n) && console.warn(R5(n.type)), r(n));
}
function TO(e, t) {
  let r = 0;
  return {
    measureTime(n) {
      const i = Date.now();
      try {
        return n();
      } finally {
        const a = Date.now();
        r += a - i;
      }
    },
    warnIfExceeded() {
      r > e && console.warn(`${t} took ${r}ms, which is more than the warning threshold of ${e}ms. 
If your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.
It is disabled in production builds, so you don't need to worry about that.`);
    }
  };
}
var CO = class va extends Array {
  constructor(...t) {
    super(...t), Object.setPrototypeOf(this, va.prototype);
  }
  static get [Symbol.species]() {
    return va;
  }
  concat(...t) {
    return super.concat.apply(this, t);
  }
  prepend(...t) {
    return t.length === 1 && Array.isArray(t[0]) ? new va(...t[0].concat(this)) : new va(...t.concat(this));
  }
};
function zg(e) {
  return kt(e) ? EO(e, () => {
  }) : e;
}
function Ro(e, t, r) {
  return e.has(t) ? e.get(t) : e.set(t, r(t)).get(t);
}
function D5(e) {
  return typeof e != "object" || e == null || Object.isFrozen(e);
}
function j5(e, t, r) {
  const n = IO(e, t, r);
  return {
    detectMutations() {
      return kO(e, t, n, r);
    }
  };
}
function IO(e, t = [], r, n = "", i = /* @__PURE__ */ new Set()) {
  const a = {
    value: r
  };
  if (!e(r) && !i.has(r)) {
    i.add(r), a.children = {};
    const o = t.length > 0;
    for (const u in r) {
      const s = n ? n + "." + u : u;
      o && t.some((c) => c instanceof RegExp ? c.test(s) : s === c) || (a.children[u] = IO(e, t, r[u], s));
    }
  }
  return a;
}
function kO(e, t = [], r, n, i = !1, a = "") {
  const o = r ? r.value : void 0, u = o === n;
  if (i && !u && !Number.isNaN(n))
    return {
      wasMutated: !0,
      path: a
    };
  if (e(o) || e(n))
    return {
      wasMutated: !1
    };
  const s = {};
  for (let c in r.children)
    s[c] = !0;
  for (let c in n)
    s[c] = !0;
  const l = t.length > 0;
  for (let c in s) {
    const f = a ? a + "." + c : c;
    if (l && t.some((p) => p instanceof RegExp ? p.test(f) : f === p))
      continue;
    const d = kO(e, t, r.children[c], n[c], u, f);
    if (d.wasMutated)
      return d;
  }
  return {
    wasMutated: !1
  };
}
function L5(e = {}) {
  if (process.env.NODE_ENV === "production")
    return () => (t) => (r) => t(r);
  {
    let t = function(u, s, l, c) {
      return JSON.stringify(u, r(s, c), l);
    }, r = function(u, s) {
      let l = [], c = [];
      return s || (s = function(f, d) {
        return l[0] === d ? "[Circular ~]" : "[Circular ~." + c.slice(0, l.indexOf(d)).join(".") + "]";
      }), function(f, d) {
        if (l.length > 0) {
          var h = l.indexOf(this);
          ~h ? l.splice(h + 1) : l.push(this), ~h ? c.splice(h, 1 / 0, f) : c.push(f), ~l.indexOf(d) && (d = s.call(this, f, d));
        } else l.push(d);
        return u == null ? d : u.call(this, f, d);
      };
    }, {
      isImmutable: n = D5,
      ignoredPaths: i,
      warnAfter: a = 32
    } = e;
    const o = j5.bind(null, n, i);
    return ({
      getState: u
    }) => {
      let s = u(), l = o(s), c;
      return (f) => (d) => {
        const h = TO(a, "ImmutableStateInvariantMiddleware");
        h.measureTime(() => {
          if (s = u(), c = l.detectMutations(), l = o(s), c.wasMutated)
            throw new Error(process.env.NODE_ENV === "production" ? he(19) : `A state mutation was detected between dispatches, in the path '${c.path || ""}'.  This may cause incorrect behavior. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`);
        });
        const p = f(d);
        return h.measureTime(() => {
          if (s = u(), c = l.detectMutations(), l = o(s), c.wasMutated)
            throw new Error(process.env.NODE_ENV === "production" ? he(20) : `A state mutation was detected inside a dispatch, in the path: ${c.path || ""}. Take a look at the reducer(s) handling the action ${t(d)}. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`);
        }), h.warnIfExceeded(), p;
      };
    };
  }
}
function MO(e) {
  const t = typeof e;
  return e == null || t === "string" || t === "boolean" || t === "number" || Array.isArray(e) || Xa(e);
}
function qv(e, t = "", r = MO, n, i = [], a) {
  let o;
  if (!r(e))
    return {
      keyPath: t || "<root>",
      value: e
    };
  if (typeof e != "object" || e === null || a != null && a.has(e)) return !1;
  const u = n != null ? n(e) : Object.entries(e), s = i.length > 0;
  for (const [l, c] of u) {
    const f = t ? t + "." + l : l;
    if (!(s && i.some((h) => h instanceof RegExp ? h.test(f) : f === h))) {
      if (!r(c))
        return {
          keyPath: f,
          value: c
        };
      if (typeof c == "object" && (o = qv(c, f, r, n, i, a), o))
        return o;
    }
  }
  return a && NO(e) && a.add(e), !1;
}
function NO(e) {
  if (!Object.isFrozen(e)) return !1;
  for (const t of Object.values(e))
    if (!(typeof t != "object" || t === null) && !NO(t))
      return !1;
  return !0;
}
function q5(e = {}) {
  if (process.env.NODE_ENV === "production")
    return () => (t) => (r) => t(r);
  {
    const {
      isSerializable: t = MO,
      getEntries: r,
      ignoredActions: n = [],
      ignoredActionPaths: i = ["meta.arg", "meta.baseQueryMeta"],
      ignoredPaths: a = [],
      warnAfter: o = 32,
      ignoreState: u = !1,
      ignoreActions: s = !1,
      disableCache: l = !1
    } = e, c = !l && WeakSet ? /* @__PURE__ */ new WeakSet() : void 0;
    return (f) => (d) => (h) => {
      if (!Fp(h))
        return d(h);
      const p = d(h), v = TO(o, "SerializableStateInvariantMiddleware");
      return !s && !(n.length && n.indexOf(h.type) !== -1) && v.measureTime(() => {
        const m = qv(h, "", t, r, i, c);
        if (m) {
          const {
            keyPath: y,
            value: b
          } = m;
          console.error(`A non-serializable value was detected in an action, in the path: \`${y}\`. Value:`, b, `
Take a look at the logic that dispatched this action: `, h, `
(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)`, `
(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)`);
        }
      }), u || (v.measureTime(() => {
        const m = f.getState(), y = qv(m, "", t, r, a, c);
        if (y) {
          const {
            keyPath: b,
            value: g
          } = y;
          console.error(`A non-serializable value was detected in the state, in the path: \`${b}\`. Value:`, g, `
Take a look at the reducer(s) handling this action type: ${h.type}.
(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)`);
        }
      }), v.warnIfExceeded()), p;
    };
  }
}
function $o(e) {
  return typeof e == "boolean";
}
var z5 = () => function(t) {
  const {
    thunk: r = !0,
    immutableCheck: n = !0,
    serializableCheck: i = !0,
    actionCreatorCheck: a = !0
  } = t ?? {};
  let o = new CO();
  if (r && ($o(r) ? o.push(C5) : o.push(I5(r.extraArgument))), process.env.NODE_ENV !== "production") {
    if (n) {
      let u = {};
      $o(n) || (u = n), o.unshift(L5(u));
    }
    if (i) {
      let u = {};
      $o(i) || (u = i), o.push(q5(u));
    }
    if (a) {
      let u = {};
      $o(a) || (u = a), o.unshift($5(u));
    }
  }
  return o;
}, RO = "RTK_autoBatch", Pe = () => (e) => ({
  payload: e,
  meta: {
    [RO]: !0
  }
}), Fg = (e) => (t) => {
  setTimeout(t, e);
}, F5 = (e, t) => (r) => {
  let n = !1;
  const i = () => {
    n || (n = !0, cancelAnimationFrame(a), clearTimeout(o), r());
  }, a = e(i), o = setTimeout(i, t);
}, $O = (e = {
  type: "raf"
}) => (t) => (...r) => {
  const n = t(...r);
  let i = !0, a = !1, o = !1;
  const u = /* @__PURE__ */ new Set(), s = e.type === "tick" ? queueMicrotask : e.type === "raf" ? (
    // requestAnimationFrame won't exist in SSR environments. Fall back to a vague approximation just to keep from erroring.
    typeof window < "u" && window.requestAnimationFrame ? F5(window.requestAnimationFrame, 100) : Fg(10)
  ) : e.type === "callback" ? e.queueNotification : Fg(e.timeout), l = () => {
    o = !1, a && (a = !1, u.forEach((c) => c()));
  };
  return Object.assign({}, n, {
    // Override the base `store.subscribe` method to keep original listeners
    // from running if we're delaying notifications
    subscribe(c) {
      const f = () => i && c(), d = n.subscribe(f);
      return u.add(c), () => {
        d(), u.delete(c);
      };
    },
    // Override the base `store.dispatch` method so that we can check actions
    // for the `shouldAutoBatch` flag and determine if batching is active
    dispatch(c) {
      var f;
      try {
        return i = !((f = c == null ? void 0 : c.meta) != null && f[RO]), a = !i, a && (o || (o = !0, s(l))), n.dispatch(c);
      } finally {
        i = !0;
      }
    }
  });
}, B5 = (e) => function(r) {
  const {
    autoBatch: n = !0
  } = r ?? {};
  let i = new CO(e);
  return n && i.push($O(typeof n == "object" ? n : void 0)), i;
};
function W5(e) {
  const t = z5(), {
    reducer: r = void 0,
    middleware: n,
    devTools: i = !0,
    duplicateMiddlewareCheck: a = !0,
    preloadedState: o = void 0,
    enhancers: u = void 0
  } = e || {};
  let s;
  if (typeof r == "function")
    s = r;
  else if (Xa(r))
    s = mO(r);
  else
    throw new Error(process.env.NODE_ENV === "production" ? he(1) : "`reducer` is a required argument, and must be a function or an object of functions that can be passed to combineReducers");
  if (process.env.NODE_ENV !== "production" && n && typeof n != "function")
    throw new Error(process.env.NODE_ENV === "production" ? he(2) : "`middleware` field must be a callback");
  let l;
  if (typeof n == "function") {
    if (l = n(t), process.env.NODE_ENV !== "production" && !Array.isArray(l))
      throw new Error(process.env.NODE_ENV === "production" ? he(3) : "when using a middleware builder function, an array of middleware must be returned");
  } else
    l = t();
  if (process.env.NODE_ENV !== "production" && l.some((v) => typeof v != "function"))
    throw new Error(process.env.NODE_ENV === "production" ? he(4) : "each middleware provided to configureStore must be a function");
  if (process.env.NODE_ENV !== "production" && a) {
    let v = /* @__PURE__ */ new Set();
    l.forEach((m) => {
      if (v.has(m))
        throw new Error(process.env.NODE_ENV === "production" ? he(42) : "Duplicate middleware references found when creating the store. Ensure that each middleware is only included once.");
      v.add(m);
    });
  }
  let c = mu;
  i && (c = k5({
    // Enable capture of stack traces for dispatched Redux actions
    trace: process.env.NODE_ENV !== "production",
    ...typeof i == "object" && i
  }));
  const f = d5(...l), d = B5(f);
  if (process.env.NODE_ENV !== "production" && u && typeof u != "function")
    throw new Error(process.env.NODE_ENV === "production" ? he(5) : "`enhancers` field must be a callback");
  let h = typeof u == "function" ? u(d) : d();
  if (process.env.NODE_ENV !== "production" && !Array.isArray(h))
    throw new Error(process.env.NODE_ENV === "production" ? he(6) : "`enhancers` callback must return an array");
  if (process.env.NODE_ENV !== "production" && h.some((v) => typeof v != "function"))
    throw new Error(process.env.NODE_ENV === "production" ? he(7) : "each enhancer provided to configureStore must be a function");
  process.env.NODE_ENV !== "production" && l.length && !h.includes(f) && console.error("middlewares were provided, but middleware enhancer was not included in final enhancers - make sure to call `getDefaultEnhancers`");
  const p = c(...h);
  return pO(s, o, p);
}
function DO(e) {
  const t = {}, r = [];
  let n;
  const i = {
    addCase(a, o) {
      if (process.env.NODE_ENV !== "production") {
        if (r.length > 0)
          throw new Error(process.env.NODE_ENV === "production" ? he(26) : "`builder.addCase` should only be called before calling `builder.addMatcher`");
        if (n)
          throw new Error(process.env.NODE_ENV === "production" ? he(27) : "`builder.addCase` should only be called before calling `builder.addDefaultCase`");
      }
      const u = typeof a == "string" ? a : a.type;
      if (!u)
        throw new Error(process.env.NODE_ENV === "production" ? he(28) : "`builder.addCase` cannot be called with an empty action type");
      if (u in t)
        throw new Error(process.env.NODE_ENV === "production" ? he(29) : `\`builder.addCase\` cannot be called with two reducers for the same action type '${u}'`);
      return t[u] = o, i;
    },
    addAsyncThunk(a, o) {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error(process.env.NODE_ENV === "production" ? he(43) : "`builder.addAsyncThunk` should only be called before calling `builder.addDefaultCase`");
      return o.pending && (t[a.pending.type] = o.pending), o.rejected && (t[a.rejected.type] = o.rejected), o.fulfilled && (t[a.fulfilled.type] = o.fulfilled), o.settled && r.push({
        matcher: a.settled,
        reducer: o.settled
      }), i;
    },
    addMatcher(a, o) {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error(process.env.NODE_ENV === "production" ? he(30) : "`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");
      return r.push({
        matcher: a,
        reducer: o
      }), i;
    },
    addDefaultCase(a) {
      if (process.env.NODE_ENV !== "production" && n)
        throw new Error(process.env.NODE_ENV === "production" ? he(31) : "`builder.addDefaultCase` can only be called once");
      return n = a, i;
    }
  };
  return e(i), [t, r, n];
}
function U5(e) {
  return typeof e == "function";
}
function V5(e, t) {
  if (process.env.NODE_ENV !== "production" && typeof t == "object")
    throw new Error(process.env.NODE_ENV === "production" ? he(8) : "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer");
  let [r, n, i] = DO(t), a;
  if (U5(e))
    a = () => zg(e());
  else {
    const u = zg(e);
    a = () => u;
  }
  function o(u = a(), s) {
    let l = [r[s.type], ...n.filter(({
      matcher: c
    }) => c(s)).map(({
      reducer: c
    }) => c)];
    return l.filter((c) => !!c).length === 0 && (l = [i]), l.reduce((c, f) => {
      if (f)
        if (Ir(c)) {
          const h = f(c, s);
          return h === void 0 ? c : h;
        } else {
          if (kt(c))
            return EO(c, (d) => f(d, s));
          {
            const d = f(c, s);
            if (d === void 0) {
              if (c === null)
                return c;
              throw Error("A case reducer on a non-draftable value must not return undefined");
            }
            return d;
          }
        }
      return c;
    }, u);
  }
  return o.getInitialState = a, o;
}
var H5 = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW", K5 = (e = 21) => {
  let t = "", r = e;
  for (; r--; )
    t += H5[Math.random() * 64 | 0];
  return t;
}, G5 = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function Y5(e, t) {
  return `${e}/${t}`;
}
function X5({
  creators: e
} = {}) {
  var r;
  const t = (r = e == null ? void 0 : e.asyncThunk) == null ? void 0 : r[G5];
  return function(i) {
    const {
      name: a,
      reducerPath: o = a
    } = i;
    if (!a)
      throw new Error(process.env.NODE_ENV === "production" ? he(11) : "`name` is a required option for createSlice");
    typeof process < "u" && process.env.NODE_ENV === "development" && i.initialState === void 0 && console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");
    const u = (typeof i.reducers == "function" ? i.reducers(Q5()) : i.reducers) || {}, s = Object.keys(u), l = {
      sliceCaseReducersByName: {},
      sliceCaseReducersByType: {},
      actionCreators: {},
      sliceMatchers: []
    }, c = {
      addCase(_, x) {
        const w = typeof _ == "string" ? _ : _.type;
        if (!w)
          throw new Error(process.env.NODE_ENV === "production" ? he(12) : "`context.addCase` cannot be called with an empty action type");
        if (w in l.sliceCaseReducersByType)
          throw new Error(process.env.NODE_ENV === "production" ? he(13) : "`context.addCase` cannot be called with two reducers for the same action type: " + w);
        return l.sliceCaseReducersByType[w] = x, c;
      },
      addMatcher(_, x) {
        return l.sliceMatchers.push({
          matcher: _,
          reducer: x
        }), c;
      },
      exposeAction(_, x) {
        return l.actionCreators[_] = x, c;
      },
      exposeCaseReducer(_, x) {
        return l.sliceCaseReducersByName[_] = x, c;
      }
    };
    s.forEach((_) => {
      const x = u[_], w = {
        reducerName: _,
        type: Y5(a, _),
        createNotation: typeof i.reducers == "function"
      };
      e6(x) ? r6(w, x, c, t) : J5(w, x, c);
    });
    function f() {
      if (process.env.NODE_ENV !== "production" && typeof i.extraReducers == "object")
        throw new Error(process.env.NODE_ENV === "production" ? he(14) : "The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice");
      const [_ = {}, x = [], w = void 0] = typeof i.extraReducers == "function" ? DO(i.extraReducers) : [i.extraReducers], A = {
        ..._,
        ...l.sliceCaseReducersByType
      };
      return V5(i.initialState, (P) => {
        for (let T in A)
          P.addCase(T, A[T]);
        for (let T of l.sliceMatchers)
          P.addMatcher(T.matcher, T.reducer);
        for (let T of x)
          P.addMatcher(T.matcher, T.reducer);
        w && P.addDefaultCase(w);
      });
    }
    const d = (_) => _, h = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new WeakMap();
    let v;
    function m(_, x) {
      return v || (v = f()), v(_, x);
    }
    function y() {
      return v || (v = f()), v.getInitialState();
    }
    function b(_, x = !1) {
      function w(P) {
        let T = P[_];
        if (typeof T > "u") {
          if (x)
            T = Ro(p, w, y);
          else if (process.env.NODE_ENV !== "production")
            throw new Error(process.env.NODE_ENV === "production" ? he(15) : "selectSlice returned undefined for an uninjected slice reducer");
        }
        return T;
      }
      function A(P = d) {
        const T = Ro(h, x, () => /* @__PURE__ */ new WeakMap());
        return Ro(T, P, () => {
          const C = {};
          for (const [O, D] of Object.entries(i.selectors ?? {}))
            C[O] = Z5(D, P, () => Ro(p, P, y), x);
          return C;
        });
      }
      return {
        reducerPath: _,
        getSelectors: A,
        get selectors() {
          return A(w);
        },
        selectSlice: w
      };
    }
    const g = {
      name: a,
      reducer: m,
      actions: l.actionCreators,
      caseReducers: l.sliceCaseReducersByName,
      getInitialState: y,
      ...b(o),
      injectInto(_, {
        reducerPath: x,
        ...w
      } = {}) {
        const A = x ?? o;
        return _.inject({
          reducerPath: A,
          reducer: m
        }, w), {
          ...g,
          ...b(A, !0)
        };
      }
    };
    return g;
  };
}
function Z5(e, t, r, n) {
  function i(a, ...o) {
    let u = t(a);
    if (typeof u > "u") {
      if (n)
        u = r();
      else if (process.env.NODE_ENV !== "production")
        throw new Error(process.env.NODE_ENV === "production" ? he(16) : "selectState returned undefined for an uninjected slice reducer");
    }
    return e(u, ...o);
  }
  return i.unwrapped = e, i;
}
var ot = /* @__PURE__ */ X5();
function Q5() {
  function e(t, r) {
    return {
      _reducerDefinitionType: "asyncThunk",
      payloadCreator: t,
      ...r
    };
  }
  return e.withTypes = () => e, {
    reducer(t) {
      return Object.assign({
        // hack so the wrapping function has the same name as the original
        // we need to create a wrapper so the `reducerDefinitionType` is not assigned to the original
        [t.name](...r) {
          return t(...r);
        }
      }[t.name], {
        _reducerDefinitionType: "reducer"
        /* reducer */
      });
    },
    preparedReducer(t, r) {
      return {
        _reducerDefinitionType: "reducerWithPrepare",
        prepare: t,
        reducer: r
      };
    },
    asyncThunk: e
  };
}
function J5({
  type: e,
  reducerName: t,
  createNotation: r
}, n, i) {
  let a, o;
  if ("reducer" in n) {
    if (r && !t6(n))
      throw new Error(process.env.NODE_ENV === "production" ? he(17) : "Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.");
    a = n.reducer, o = n.prepare;
  } else
    a = n;
  i.addCase(e, a).exposeCaseReducer(t, a).exposeAction(t, o ? gt(e, o) : gt(e));
}
function e6(e) {
  return e._reducerDefinitionType === "asyncThunk";
}
function t6(e) {
  return e._reducerDefinitionType === "reducerWithPrepare";
}
function r6({
  type: e,
  reducerName: t
}, r, n, i) {
  if (!i)
    throw new Error(process.env.NODE_ENV === "production" ? he(18) : "Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.");
  const {
    payloadCreator: a,
    fulfilled: o,
    pending: u,
    rejected: s,
    settled: l,
    options: c
  } = r, f = i(e, a, c);
  n.exposeAction(t, f), o && n.addCase(f.fulfilled, o), u && n.addCase(f.pending, u), s && n.addCase(f.rejected, s), l && n.addMatcher(f.settled, l), n.exposeCaseReducer(t, {
    fulfilled: o || Do,
    pending: u || Do,
    rejected: s || Do,
    settled: l || Do
  });
}
function Do() {
}
var n6 = "task", jO = "listener", LO = "completed", Vp = "cancelled", i6 = `task-${Vp}`, a6 = `task-${LO}`, zv = `${jO}-${Vp}`, o6 = `${jO}-${LO}`, Ss = class {
  constructor(e) {
    Eo(this, "code");
    Eo(this, "name", "TaskAbortError");
    Eo(this, "message");
    this.code = e, this.message = `${n6} ${Vp} (reason: ${e})`;
  }
}, Hp = (e, t) => {
  if (typeof e != "function")
    throw new TypeError(process.env.NODE_ENV === "production" ? he(32) : `${t} is not a function`);
}, Au = () => {
}, qO = (e, t = Au) => (e.catch(t), e), zO = (e, t) => (e.addEventListener("abort", t, {
  once: !0
}), () => e.removeEventListener("abort", t)), Cn = (e) => {
  if (e.aborted)
    throw new Ss(e.reason);
};
function FO(e, t) {
  let r = Au;
  return new Promise((n, i) => {
    const a = () => i(new Ss(e.reason));
    if (e.aborted) {
      a();
      return;
    }
    r = zO(e, a), t.finally(() => r()).then(n, i);
  }).finally(() => {
    r = Au;
  });
}
var u6 = async (e, t) => {
  try {
    return await Promise.resolve(), {
      status: "ok",
      value: await e()
    };
  } catch (r) {
    return {
      status: r instanceof Ss ? "cancelled" : "rejected",
      error: r
    };
  } finally {
    t == null || t();
  }
}, Ou = (e) => (t) => qO(FO(e, t).then((r) => (Cn(e), r))), BO = (e) => {
  const t = Ou(e);
  return (r) => t(new Promise((n) => setTimeout(n, r)));
}, {
  assign: pi
} = Object, Bg = {}, Qa = "listenerMiddleware", s6 = (e, t) => {
  const r = (n) => zO(e, () => n.abort(e.reason));
  return (n, i) => {
    Hp(n, "taskExecutor");
    const a = new AbortController();
    r(a);
    const o = u6(async () => {
      Cn(e), Cn(a.signal);
      const u = await n({
        pause: Ou(a.signal),
        delay: BO(a.signal),
        signal: a.signal
      });
      return Cn(a.signal), u;
    }, () => a.abort(a6));
    return i != null && i.autoJoin && t.push(o.catch(Au)), {
      result: Ou(e)(o),
      cancel() {
        a.abort(i6);
      }
    };
  };
}, l6 = (e, t) => {
  const r = async (n, i) => {
    Cn(t);
    let a = () => {
    };
    const u = [new Promise((s, l) => {
      let c = e({
        predicate: n,
        effect: (f, d) => {
          d.unsubscribe(), s([f, d.getState(), d.getOriginalState()]);
        }
      });
      a = () => {
        c(), l();
      };
    })];
    i != null && u.push(new Promise((s) => setTimeout(s, i, null)));
    try {
      const s = await FO(t, Promise.race(u));
      return Cn(t), s;
    } finally {
      a();
    }
  };
  return ((n, i) => qO(r(n, i)));
}, WO = (e) => {
  let {
    type: t,
    actionCreator: r,
    matcher: n,
    predicate: i,
    effect: a
  } = e;
  if (t)
    i = gt(t).match;
  else if (r)
    t = r.type, i = r.match;
  else if (n)
    i = n;
  else if (!i) throw new Error(process.env.NODE_ENV === "production" ? he(21) : "Creating or removing a listener requires one of the known fields for matching an action");
  return Hp(a, "options.listener"), {
    predicate: i,
    type: t,
    effect: a
  };
}, UO = /* @__PURE__ */ pi((e) => {
  const {
    type: t,
    predicate: r,
    effect: n
  } = WO(e);
  return {
    id: K5(),
    effect: n,
    type: t,
    predicate: r,
    pending: /* @__PURE__ */ new Set(),
    unsubscribe: () => {
      throw new Error(process.env.NODE_ENV === "production" ? he(22) : "Unsubscribe not initialized");
    }
  };
}, {
  withTypes: () => UO
}), Wg = (e, t) => {
  const {
    type: r,
    effect: n,
    predicate: i
  } = WO(t);
  return Array.from(e.values()).find((a) => (typeof r == "string" ? a.type === r : a.predicate === i) && a.effect === n);
}, Fv = (e) => {
  e.pending.forEach((t) => {
    t.abort(zv);
  });
}, c6 = (e, t) => () => {
  for (const r of t.keys())
    Fv(r);
  e.clear();
}, Ug = (e, t, r) => {
  try {
    e(t, r);
  } catch (n) {
    setTimeout(() => {
      throw n;
    }, 0);
  }
}, VO = /* @__PURE__ */ pi(/* @__PURE__ */ gt(`${Qa}/add`), {
  withTypes: () => VO
}), f6 = /* @__PURE__ */ gt(`${Qa}/removeAll`), HO = /* @__PURE__ */ pi(/* @__PURE__ */ gt(`${Qa}/remove`), {
  withTypes: () => HO
}), d6 = (...e) => {
  console.error(`${Qa}/error`, ...e);
}, Ja = (e = {}) => {
  const t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map(), n = (h) => {
    const p = r.get(h) ?? 0;
    r.set(h, p + 1);
  }, i = (h) => {
    const p = r.get(h) ?? 1;
    p === 1 ? r.delete(h) : r.set(h, p - 1);
  }, {
    extra: a,
    onError: o = d6
  } = e;
  Hp(o, "onError");
  const u = (h) => (h.unsubscribe = () => t.delete(h.id), t.set(h.id, h), (p) => {
    h.unsubscribe(), p != null && p.cancelActive && Fv(h);
  }), s = ((h) => {
    const p = Wg(t, h) ?? UO(h);
    return u(p);
  });
  pi(s, {
    withTypes: () => s
  });
  const l = (h) => {
    const p = Wg(t, h);
    return p && (p.unsubscribe(), h.cancelActive && Fv(p)), !!p;
  };
  pi(l, {
    withTypes: () => l
  });
  const c = async (h, p, v, m) => {
    const y = new AbortController(), b = l6(s, y.signal), g = [];
    try {
      h.pending.add(y), n(h), await Promise.resolve(h.effect(
        p,
        // Use assign() rather than ... to avoid extra helper functions added to bundle
        pi({}, v, {
          getOriginalState: m,
          condition: (_, x) => b(_, x).then(Boolean),
          take: b,
          delay: BO(y.signal),
          pause: Ou(y.signal),
          extra: a,
          signal: y.signal,
          fork: s6(y.signal, g),
          unsubscribe: h.unsubscribe,
          subscribe: () => {
            t.set(h.id, h);
          },
          cancelActiveListeners: () => {
            h.pending.forEach((_, x, w) => {
              _ !== y && (_.abort(zv), w.delete(_));
            });
          },
          cancel: () => {
            y.abort(zv), h.pending.delete(y);
          },
          throwIfCancelled: () => {
            Cn(y.signal);
          }
        })
      ));
    } catch (_) {
      _ instanceof Ss || Ug(o, _, {
        raisedBy: "effect"
      });
    } finally {
      await Promise.all(g), y.abort(o6), i(h), h.pending.delete(y);
    }
  }, f = c6(t, r);
  return {
    middleware: (h) => (p) => (v) => {
      if (!Fp(v))
        return p(v);
      if (VO.match(v))
        return s(v.payload);
      if (f6.match(v)) {
        f();
        return;
      }
      if (HO.match(v))
        return l(v.payload);
      let m = h.getState();
      const y = () => {
        if (m === Bg)
          throw new Error(process.env.NODE_ENV === "production" ? he(23) : `${Qa}: getOriginalState can only be called synchronously`);
        return m;
      };
      let b;
      try {
        if (b = p(v), t.size > 0) {
          const g = h.getState(), _ = Array.from(t.values());
          for (const x of _) {
            let w = !1;
            try {
              w = x.predicate(v, g, m);
            } catch (A) {
              w = !1, Ug(o, A, {
                raisedBy: "predicate"
              });
            }
            w && c(x, v, h, y);
          }
        }
      } finally {
        m = Bg;
      }
      return b;
    },
    startListening: s,
    stopListening: l,
    clearListeners: f
  };
};
function he(e) {
  return `Minified Redux Toolkit error #${e}; visit https://redux-toolkit.js.org/Errors?code=${e} for the full message or use the non-minified dev environment for full errors. `;
}
var h6 = {
  layoutType: "horizontal",
  width: 0,
  height: 0,
  margin: {
    top: 5,
    right: 5,
    bottom: 5,
    left: 5
  },
  scale: 1
}, KO = ot({
  name: "chartLayout",
  initialState: h6,
  reducers: {
    setLayout(e, t) {
      e.layoutType = t.payload;
    },
    setChartSize(e, t) {
      e.width = t.payload.width, e.height = t.payload.height;
    },
    setMargin(e, t) {
      var r, n, i, a;
      e.margin.top = (r = t.payload.top) !== null && r !== void 0 ? r : 0, e.margin.right = (n = t.payload.right) !== null && n !== void 0 ? n : 0, e.margin.bottom = (i = t.payload.bottom) !== null && i !== void 0 ? i : 0, e.margin.left = (a = t.payload.left) !== null && a !== void 0 ? a : 0;
    },
    setScale(e, t) {
      e.scale = t.payload;
    }
  }
}), Es = KO.actions, v6 = Es.setMargin, p6 = Es.setLayout, m6 = Es.setChartSize, y6 = Es.setScale, g6 = KO.reducer;
function GO(e, t, r) {
  return Array.isArray(e) && e && t + r !== 0 ? e.slice(t, r + 1) : e;
}
function _e(e) {
  return Number.isFinite(e);
}
function Jr(e) {
  return typeof e == "number" && e > 0 && Number.isFinite(e);
}
function Vg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ct(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Vg(Object(r), !0).forEach(function(n) {
      b6(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Vg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function b6(e, t, r) {
  return (t = _6(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function _6(e) {
  var t = w6(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function w6(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Ie(e, t, r) {
  return dt(e) || dt(t) ? r : Cr(t) ? Zr(e, t, r) : typeof t == "function" ? t(e) : r;
}
var x6 = (e, t, r) => {
  if (t && r) {
    var n = r.width, i = r.height, a = t.align, o = t.verticalAlign, u = t.layout, s = t.position, l = t.offset, c = l === void 0 ? 0 : l;
    if (s != null) {
      if (Cp(s)) {
        if (s === "top" && G(e.top))
          return ct(ct({}, e), {}, {
            top: e.top + (i || 0) + c
          });
        if (s === "bottom" && G(e.bottom))
          return ct(ct({}, e), {}, {
            bottom: e.bottom + (i || 0) + c
          });
        if (s === "left" && G(e.left))
          return ct(ct({}, e), {}, {
            left: e.left + (n || 0) + c
          });
        if (s === "right" && G(e.right))
          return ct(ct({}, e), {}, {
            right: e.right + (n || 0) + c
          });
      }
      return e;
    }
    if ((u === "vertical" || u === "horizontal" && o === "middle") && a !== "center" && G(e[a]))
      return ct(ct({}, e), {}, {
        [a]: e[a] + (n || 0)
      });
    if ((u === "horizontal" || u === "vertical" && a === "center") && o !== "middle" && G(e[o]))
      return ct(ct({}, e), {}, {
        [o]: e[o] + (i || 0)
      });
  }
  return e;
}, rn = (e, t) => e === "horizontal" && t === "xAxis" || e === "vertical" && t === "yAxis" || e === "centric" && t === "angleAxis" || e === "radial" && t === "radiusAxis", A6 = (e) => {
  var t, r = e.length;
  if (!(r <= 0)) {
    var n = (t = e[0]) === null || t === void 0 ? void 0 : t.length;
    if (!(n == null || n <= 0))
      for (var i = 0; i < n; ++i)
        for (var a = 0, o = 0, u = 0; u < r; ++u) {
          var s = e[u], l = s == null ? void 0 : s[i];
          if (l != null) {
            var c = l[1], f = l[0], d = Tr(c) ? f : c;
            d >= 0 ? (l[0] = a, a += d, l[1] = a) : (l[0] = o, o += d, l[1] = o);
          }
        }
  }
}, O6 = (e) => {
  var t, r = e.length;
  if (!(r <= 0)) {
    var n = (t = e[0]) === null || t === void 0 ? void 0 : t.length;
    if (!(n == null || n <= 0))
      for (var i = 0; i < n; ++i)
        for (var a = 0, o = 0; o < r; ++o) {
          var u = e[o], s = u == null ? void 0 : u[i];
          if (s != null) {
            var l = Tr(s[1]) ? s[0] : s[1];
            l >= 0 ? (s[0] = a, a += l, s[1] = a) : (s[0] = 0, s[1] = 0);
          }
        }
  }
}, S6 = {
  sign: A6,
  // @ts-expect-error definitelytyped types are incorrect
  expand: l3,
  // @ts-expect-error definitelytyped types are incorrect
  none: Rn,
  // @ts-expect-error definitelytyped types are incorrect
  silhouette: c3,
  // @ts-expect-error definitelytyped types are incorrect
  wiggle: f3,
  positive: O6
}, E6 = (e, t, r) => {
  var n, i = (n = S6[r]) !== null && n !== void 0 ? n : Rn, a = s3().keys(t).value((u, s) => Number(Ie(u, s, 0))).order(Pv).offset(i), o = a(e);
  return o.forEach((u, s) => {
    u.forEach((l, c) => {
      var f = Ie(e[c], t[s], 0);
      Array.isArray(f) && f.length === 2 && G(f[0]) && G(f[1]) && (l[0] = f[0], l[1] = f[1]);
    });
  }), o;
}, P6 = (e) => {
  var t = e.flat(2).filter(G);
  return [Math.min(...t), Math.max(...t)];
}, T6 = (e) => [e[0] === 1 / 0 ? 0 : e[0], e[1] === -1 / 0 ? 0 : e[1]], C6 = (e, t, r) => {
  if (!(e == null || Object.keys(e).length === 0))
    return T6(Object.keys(e).reduce((n, i) => {
      var a = e[i];
      if (!a)
        return n;
      var o = a.stackedData, u = o.reduce((s, l) => {
        var c = GO(l, t, r), f = P6(c);
        return !_e(f[0]) || !_e(f[1]) ? s : [Math.min(s[0], f[0]), Math.max(s[1], f[1])];
      }, [1 / 0, -1 / 0]);
      return [Math.min(u[0], n[0]), Math.max(u[1], n[1])];
    }, [1 / 0, -1 / 0]));
}, Hg = /^dataMin[\s]*-[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, Kg = /^dataMax[\s]*\+[\s]*([0-9]+([.]{1}[0-9]+){0,1})$/, Gg = (e, t, r) => {
  if (e && e.scale && e.scale.bandwidth) {
    var n = e.scale.bandwidth();
    return n;
  }
  if (e && t && t.length >= 2) {
    for (var i = ys(t, (v) => v.coordinate), a = [], o = 0, u = 1, s = i.length; u < s; u++) {
      var l, c, f = (((l = i[u]) === null || l === void 0 ? void 0 : l.coordinate) || 0) - (((c = i[u - 1]) === null || c === void 0 ? void 0 : c.coordinate) || 0);
      a.push(f), o = Math.max(f, o);
    }
    var d = o * 1e-4, h = 1 / 0;
    for (var p of a)
      p > d && (h = Math.min(p, h));
    return h === 1 / 0 ? 0 : h;
  }
  return r ? void 0 : 0;
};
function Yg(e) {
  var t = e.tooltipEntrySettings, r = e.dataKey, n = e.payload, i = e.value, a = e.name;
  return ct(ct({}, t), {}, {
    dataKey: r,
    payload: n,
    value: i,
    name: a
  });
}
function YO(e, t) {
  if (e != null)
    return String(e);
  if (typeof t == "string")
    return t;
}
var I6 = (e, t) => {
  if (t === "horizontal")
    return e.relativeX;
  if (t === "vertical")
    return e.relativeY;
}, k6 = (e, t) => t === "centric" ? e.angle : e.radius, fr = (e) => e.layout.width, dr = (e) => e.layout.height, M6 = (e) => e.layout.scale, Kp = (e) => e.layout.margin, Ps = I((e) => e.cartesianAxis.xAxis, (e) => Object.values(e)), Ts = I((e) => e.cartesianAxis.yAxis, (e) => Object.values(e)), XO = "data-recharts-item-index", ZO = "data-recharts-item-id", eo = 60, Gp = 30;
function Xg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function jo(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Xg(Object(r), !0).forEach(function(n) {
      N6(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Xg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function N6(e, t, r) {
  return (t = R6(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function R6(e) {
  var t = $6(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function $6(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var D6 = (e) => e.brush.height;
function j6(e) {
  var t = Ts(e);
  return t.reduce((r, n) => {
    if (n.orientation === "left" && !n.mirror && !n.hide) {
      var i = typeof n.width == "number" ? n.width : eo;
      return r + i;
    }
    return r;
  }, 0);
}
function L6(e) {
  var t = Ts(e);
  return t.reduce((r, n) => {
    if (n.orientation === "right" && !n.mirror && !n.hide) {
      var i = typeof n.width == "number" ? n.width : eo;
      return r + i;
    }
    return r;
  }, 0);
}
function q6(e) {
  var t = Ps(e);
  return t.reduce((r, n) => {
    if (n.orientation === "top" && !n.mirror && !n.hide) {
      var i = typeof n.height == "number" ? n.height : Gp;
      return r + i;
    }
    return r;
  }, 0);
}
function z6(e) {
  var t = Ps(e);
  return t.reduce((r, n) => {
    if (n.orientation === "bottom" && !n.mirror && !n.hide) {
      var i = typeof n.height == "number" ? n.height : Gp;
      return r + i;
    }
    return r;
  }, 0);
}
var Ge = I([fr, dr, Kp, D6, j6, L6, q6, z6, hO, Y8], (e, t, r, n, i, a, o, u, s, l) => {
  var c = {
    left: (r.left || 0) + i,
    right: (r.right || 0) + a
  }, f = {
    top: (r.top || 0) + o,
    bottom: (r.bottom || 0) + u
  }, d = jo(jo({}, f), c), h = d.bottom;
  d.bottom += n, d = x6(d, s, l);
  var p = e - d.left - d.right, v = t - d.top - d.bottom;
  return jo(jo({
    brushBottom: h
  }, d), {}, {
    // never return negative values for height and width
    width: Math.max(p, 0),
    height: Math.max(v, 0)
  });
}), QO = I(Ge, (e) => ({
  x: e.left,
  y: e.top,
  width: e.width,
  height: e.height
}));
I(fr, dr, (e, t) => ({
  x: 0,
  y: 0,
  width: e,
  height: t
}));
var F6 = /* @__PURE__ */ et(null), nn = () => at(F6) != null, Cs = (e) => e.brush, Is = I([Cs, Ge, Kp], (e, t, r) => ({
  height: e.height,
  x: G(e.x) ? e.x : t.left,
  y: G(e.y) ? e.y : t.top + t.height + t.brushBottom - ((r == null ? void 0 : r.bottom) || 0),
  width: G(e.width) ? e.width : t.width
}));
function B6(e, t, { signal: r, edges: n } = {}) {
  let i, a = null;
  const o = n != null && n.includes("leading"), u = n == null || n.includes("trailing"), s = () => {
    a !== null && (e.apply(i, a), i = void 0, a = null);
  }, l = () => {
    u && s(), h();
  };
  let c = null;
  const f = () => {
    c != null && clearTimeout(c), c = setTimeout(() => {
      c = null, l();
    }, t);
  }, d = () => {
    c !== null && (clearTimeout(c), c = null);
  }, h = () => {
    d(), i = void 0, a = null;
  }, p = () => {
    s();
  }, v = function(...m) {
    if (r != null && r.aborted) return;
    i = this, a = m;
    const y = c == null;
    f(), o && y && s();
  };
  return v.schedule = f, v.cancel = h, v.flush = p, r == null || r.addEventListener("abort", h, { once: !0 }), v;
}
function W6(e, t = 0, r = {}) {
  typeof r != "object" && (r = {});
  const { leading: n = !1, trailing: i = !0, maxWait: a } = r, o = Array(2);
  n && (o[0] = "leading"), i && (o[1] = "trailing");
  let u, s = null;
  const l = B6(function(...d) {
    u = e.apply(this, d), s = null;
  }, t, { edges: o }), c = function(...d) {
    return a != null && (s === null && (s = Date.now()), Date.now() - s >= a) ? ((n || i) && (u = e.apply(this, d)), s = Date.now(), l.cancel(), l.schedule(), u) : (l.apply(this, d), u);
  }, f = () => (l.flush(), u);
  return c.cancel = l.cancel, c.flush = f, c;
}
function U6(e, t = 0, r = {}) {
  const { leading: n = !0, trailing: i = !0 } = r;
  return W6(e, t, {
    leading: n,
    maxWait: t,
    trailing: i
  });
}
var Zg = function(t, r) {
  for (var n = arguments.length, i = new Array(n > 2 ? n - 2 : 0), a = 2; a < n; a++)
    i[a - 2] = arguments[a];
  if (typeof console < "u" && console.warn && (r === void 0 && console.warn("LogUtils requires an error message argument"), !t))
    if (r === void 0)
      console.warn("Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings.");
    else {
      var o = 0;
      console.warn(r.replace(/%s/g, () => i[o++]));
    }
}, rr = {
  width: "100%",
  height: "100%",
  debounce: 0,
  minWidth: 0,
  initialDimension: {
    width: -1,
    height: -1
  }
}, JO = (e, t, r) => {
  var n = r.width, i = n === void 0 ? rr.width : n, a = r.height, o = a === void 0 ? rr.height : a, u = r.aspect, s = r.maxHeight, l = Nn(i) ? e : Number(i), c = Nn(o) ? t : Number(o);
  return u && u > 0 && (l ? c = l / u : c && (l = c * u), s && c != null && c > s && (c = s)), {
    calculatedWidth: l,
    calculatedHeight: c
  };
}, V6 = {
  width: 0,
  height: 0,
  overflow: "visible"
}, H6 = {
  width: 0,
  overflowX: "visible"
}, K6 = {
  height: 0,
  overflowY: "visible"
}, G6 = {}, Y6 = (e) => {
  var t = e.width, r = e.height, n = Nn(t), i = Nn(r);
  return n && i ? V6 : n ? H6 : i ? K6 : G6;
};
function X6(e) {
  var t = e.width, r = e.height, n = e.aspect, i = t, a = r;
  return i === void 0 && a === void 0 ? (i = rr.width, a = rr.height) : i === void 0 ? i = n && n > 0 ? void 0 : rr.width : a === void 0 && (a = n && n > 0 ? void 0 : rr.height), {
    width: i,
    height: a
  };
}
var Z6 = ["aspect", "initialDimension", "width", "height", "minWidth", "minHeight", "maxHeight", "children", "debounce", "id", "className", "onResize", "style"];
function Su() {
  return Su = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Su.apply(null, arguments);
}
function Qg(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Jg(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Qg(Object(r), !0).forEach(function(n) {
      Q6(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Qg(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Q6(e, t, r) {
  return (t = J6(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function J6(e) {
  var t = e4(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function e4(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function t4(e, t) {
  return a4(e) || i4(e, t) || n4(e, t) || r4();
}
function r4() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function n4(e, t) {
  if (e) {
    if (typeof e == "string") return e0(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? e0(e, t) : void 0;
  }
}
function e0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function i4(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], s = !0, l = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(s = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (c) {
      l = !0, i = c;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function a4(e) {
  if (Array.isArray(e)) return e;
}
function o4(e, t) {
  if (e == null) return {};
  var r, n, i = u4(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function u4(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var eS = /* @__PURE__ */ et(rr.initialDimension);
function s4(e) {
  return Jr(e.width) && Jr(e.height);
}
function tS(e) {
  var t = e.children, r = e.width, n = e.height, i = ue(() => ({
    width: r,
    height: n
  }), [r, n]);
  return s4(i) ? /* @__PURE__ */ S.createElement(eS.Provider, {
    value: i
  }, t) : null;
}
var Yp = () => at(eS), l4 = /* @__PURE__ */ Ke((e, t) => {
  var r = e.aspect, n = e.initialDimension, i = n === void 0 ? rr.initialDimension : n, a = e.width, o = e.height, u = e.minWidth, s = u === void 0 ? rr.minWidth : u, l = e.minHeight, c = e.maxHeight, f = e.children, d = e.debounce, h = d === void 0 ? rr.debounce : d, p = e.id, v = e.className, m = e.onResize, y = e.style, b = y === void 0 ? {} : y, g = o4(e, Z6), _ = J(null), x = J();
  x.current = m, hI(t, () => _.current);
  var w = be({
    containerWidth: i.width,
    containerHeight: i.height
  }), A = t4(w, 2), P = A[0], T = A[1], C = re((M, N) => {
    T((k) => {
      var R = Math.round(M), W = Math.round(N);
      return k.containerWidth === R && k.containerHeight === W ? k : {
        containerWidth: R,
        containerHeight: W
      };
    });
  }, []);
  pe(() => {
    if (_.current == null || typeof ResizeObserver > "u")
      return ds;
    var M = (Z) => {
      var ce, fe = Z[0];
      if (fe != null) {
        var de = fe.contentRect, Oe = de.width, me = de.height;
        C(Oe, me), (ce = x.current) === null || ce === void 0 || ce.call(x, Oe, me);
      }
    };
    h > 0 && (M = U6(M, h, {
      trailing: !0,
      leading: !1
    }));
    var N = new ResizeObserver(M), k = _.current.getBoundingClientRect(), R = k.width, W = k.height;
    return C(R, W), N.observe(_.current), () => {
      N.disconnect();
    };
  }, [C, h]);
  var O = P.containerWidth, D = P.containerHeight;
  Zg(!r || r > 0, "The aspect(%s) must be greater than zero.", r);
  var j = JO(O, D, {
    width: a,
    height: o,
    aspect: r,
    maxHeight: c
  }), z = j.calculatedWidth, E = j.calculatedHeight;
  return Zg(O < 0 || D < 0 || z != null && z > 0 || E != null && E > 0, `The width(%s) and height(%s) of chart should be greater than 0,
       please check the style of container, or the props width(%s) and height(%s),
       or add a minWidth(%s) or minHeight(%s) or use aspect(%s) to control the
       height and width.`, z, E, a, o, s, l, r), /* @__PURE__ */ S.createElement("div", Su({
    id: p ? "".concat(p) : void 0,
    className: ze("recharts-responsive-container", v),
    style: Jg(Jg({}, b), {}, {
      width: a,
      height: o,
      minWidth: s,
      minHeight: l,
      maxHeight: c
    }),
    ref: _
  }, g), /* @__PURE__ */ S.createElement("div", {
    style: Y6({
      width: a,
      height: o
    })
  }, /* @__PURE__ */ S.createElement(tS, {
    width: z,
    height: E
  }, f)));
}), Eu = /* @__PURE__ */ Ke((e, t) => {
  var r = Yp();
  if (Jr(r.width) && Jr(r.height))
    return e.children;
  var n = X6({
    width: e.width,
    height: e.height,
    aspect: e.aspect
  }), i = n.width, a = n.height, o = JO(void 0, void 0, {
    width: i,
    height: a,
    aspect: e.aspect,
    maxHeight: e.maxHeight
  }), u = o.calculatedWidth, s = o.calculatedHeight;
  return G(u) && G(s) ? /* @__PURE__ */ S.createElement(tS, {
    width: u,
    height: s
  }, e.children) : /* @__PURE__ */ S.createElement(l4, Su({}, e, {
    width: i,
    height: a,
    ref: t
  }));
}), ks = () => {
  var e, t = nn(), r = te(QO), n = te(Is), i = (e = te(Cs)) === null || e === void 0 ? void 0 : e.padding;
  return !t || !n || !i ? r : {
    width: n.width - i.left - i.right,
    height: n.height - i.top - i.bottom,
    x: i.left,
    y: i.top
  };
}, c4 = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  width: 0,
  height: 0,
  brushBottom: 0
}, f4 = () => {
  var e;
  return (e = te(Ge)) !== null && e !== void 0 ? e : c4;
}, rS = () => te(fr), nS = () => te(dr), d4 = () => te((e) => e.layout.margin), Me = (e) => e.layout.layoutType, Ms = () => te(Me), Xp = (e) => {
  var t = e.layout.layoutType;
  if (t === "centric" || t === "radial")
    return t;
}, h4 = () => te(Xp), v4 = () => {
  var e = Ms();
  return e !== void 0;
}, to = (e) => {
  var t = $e(), r = nn(), n = e.width, i = e.height, a = Yp(), o = n, u = i;
  return a && (o = a.width > 0 ? a.width : n, u = a.height > 0 ? a.height : i), pe(() => {
    !r && Jr(o) && Jr(u) && t(m6({
      width: o,
      height: u
    }));
  }, [t, r, o, u]), null;
}, p4 = {
  settings: {
    layout: "horizontal",
    align: "center",
    verticalAlign: "bottom",
    itemSorter: "value",
    position: void 0,
    offset: 0
  },
  size: {
    width: 0,
    height: 0
  },
  payload: []
}, iS = ot({
  name: "legend",
  initialState: p4,
  reducers: {
    setLegendSize(e, t) {
      e.size.width = t.payload.width, e.size.height = t.payload.height;
    },
    setLegendSettings(e, t) {
      e.settings.align = t.payload.align, e.settings.layout = t.payload.layout, e.settings.verticalAlign = t.payload.verticalAlign, e.settings.itemSorter = t.payload.itemSorter, e.settings.position = t.payload.position, e.settings.offset = t.payload.offset;
    },
    addLegendPayload: {
      reducer(e, t) {
        e.payload.push(se(t.payload));
      },
      prepare: Pe()
    },
    replaceLegendPayload: {
      reducer(e, t) {
        var r = t.payload, n = r.prev, i = r.next, a = Tt(e).payload.indexOf(se(n));
        a > -1 && (e.payload[a] = se(i));
      },
      prepare: Pe()
    },
    removeLegendPayload: {
      reducer(e, t) {
        var r = Tt(e).payload.indexOf(se(t.payload));
        r > -1 && e.payload.splice(r, 1);
      },
      prepare: Pe()
    }
  }
}), ro = iS.actions, t0 = ro.setLegendSize, m4 = ro.setLegendSettings, y4 = ro.addLegendPayload, g4 = ro.replaceLegendPayload, b4 = ro.removeLegendPayload, _4 = iS.reducer, Lo = { exports: {} }, _c = {};
/**
 * @license React
 * use-sync-external-store-with-selector.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var r0;
function w4() {
  if (r0) return _c;
  r0 = 1;
  var e = Ri;
  function t(s, l) {
    return s === l && (s !== 0 || 1 / s === 1 / l) || s !== s && l !== l;
  }
  var r = typeof Object.is == "function" ? Object.is : t, n = e.useSyncExternalStore, i = e.useRef, a = e.useEffect, o = e.useMemo, u = e.useDebugValue;
  return _c.useSyncExternalStoreWithSelector = function(s, l, c, f, d) {
    var h = i(null);
    if (h.current === null) {
      var p = { hasValue: !1, value: null };
      h.current = p;
    } else p = h.current;
    h = o(
      function() {
        function m(x) {
          if (!y) {
            if (y = !0, b = x, x = f(x), d !== void 0 && p.hasValue) {
              var w = p.value;
              if (d(w, x))
                return g = w;
            }
            return g = x;
          }
          if (w = g, r(b, x)) return w;
          var A = f(x);
          return d !== void 0 && d(w, A) ? (b = x, w) : (b = x, g = A);
        }
        var y = !1, b, g, _ = c === void 0 ? null : c;
        return [
          function() {
            return m(l());
          },
          _ === null ? void 0 : function() {
            return m(_());
          }
        ];
      },
      [l, c, f, d]
    );
    var v = n(s, h[0], h[1]);
    return a(
      function() {
        p.hasValue = !0, p.value = v;
      },
      [v]
    ), u(v), v;
  }, _c;
}
var wc = {};
/**
 * @license React
 * use-sync-external-store-with-selector.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var n0;
function x4() {
  return n0 || (n0 = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(s, l) {
      return s === l && (s !== 0 || 1 / s === 1 / l) || s !== s && l !== l;
    }
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
    var t = Ri, r = typeof Object.is == "function" ? Object.is : e, n = t.useSyncExternalStore, i = t.useRef, a = t.useEffect, o = t.useMemo, u = t.useDebugValue;
    wc.useSyncExternalStoreWithSelector = function(s, l, c, f, d) {
      var h = i(null);
      if (h.current === null) {
        var p = { hasValue: !1, value: null };
        h.current = p;
      } else p = h.current;
      h = o(
        function() {
          function m(x) {
            if (!y) {
              if (y = !0, b = x, x = f(x), d !== void 0 && p.hasValue) {
                var w = p.value;
                if (d(w, x))
                  return g = w;
              }
              return g = x;
            }
            if (w = g, r(b, x))
              return w;
            var A = f(x);
            return d !== void 0 && d(w, A) ? (b = x, w) : (b = x, g = A);
          }
          var y = !1, b, g, _ = c === void 0 ? null : c;
          return [
            function() {
              return m(l());
            },
            _ === null ? void 0 : function() {
              return m(_());
            }
          ];
        },
        [l, c, f, d]
      );
      var v = n(s, h[0], h[1]);
      return a(
        function() {
          p.hasValue = !0, p.value = v;
        },
        [v]
      ), u(v), v;
    }, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
  })()), wc;
}
var i0;
function A4() {
  return i0 || (i0 = 1, process.env.NODE_ENV === "production" ? Lo.exports = w4() : Lo.exports = x4()), Lo.exports;
}
A4();
function O4(e) {
  e();
}
function S4() {
  let e = null, t = null;
  return {
    clear() {
      e = null, t = null;
    },
    notify() {
      O4(() => {
        let r = e;
        for (; r; )
          r.callback(), r = r.next;
      });
    },
    get() {
      const r = [];
      let n = e;
      for (; n; )
        r.push(n), n = n.next;
      return r;
    },
    subscribe(r) {
      let n = !0;
      const i = t = {
        callback: r,
        next: null,
        prev: t
      };
      return i.prev ? i.prev.next = i : e = i, function() {
        !n || e === null || (n = !1, i.next ? i.next.prev = i.prev : t = i.prev, i.prev ? i.prev.next = i.next : e = i.next);
      };
    }
  };
}
var a0 = {
  notify() {
  },
  get: () => []
};
function E4(e, t) {
  let r, n = a0, i = 0, a = !1;
  function o(v) {
    c();
    const m = n.subscribe(v);
    let y = !1;
    return () => {
      y || (y = !0, m(), f());
    };
  }
  function u() {
    n.notify();
  }
  function s() {
    p.onStateChange && p.onStateChange();
  }
  function l() {
    return a;
  }
  function c() {
    i++, r || (r = e.subscribe(s), n = S4());
  }
  function f() {
    i--, r && i === 0 && (r(), r = void 0, n.clear(), n = a0);
  }
  function d() {
    a || (a = !0, c());
  }
  function h() {
    a && (a = !1, f());
  }
  const p = {
    addNestedSub: o,
    notifyNestedSubs: u,
    handleChangeWrapper: s,
    isSubscribed: l,
    trySubscribe: d,
    tryUnsubscribe: h,
    getListeners: () => n
  };
  return p;
}
var P4 = () => typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", T4 = /* @__PURE__ */ P4(), C4 = () => typeof navigator < "u" && navigator.product === "ReactNative", I4 = /* @__PURE__ */ C4(), k4 = () => T4 || I4 ? S.useLayoutEffect : S.useEffect, M4 = /* @__PURE__ */ k4();
function o0(e, t) {
  return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function N4(e, t) {
  if (o0(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  const r = Object.keys(e), n = Object.keys(t);
  if (r.length !== n.length) return !1;
  for (let i = 0; i < r.length; i++)
    if (!Object.prototype.hasOwnProperty.call(t, r[i]) || !o0(e[r[i]], t[r[i]]))
      return !1;
  return !0;
}
var xc = /* @__PURE__ */ Symbol.for("react-redux-context"), Ac = typeof globalThis < "u" ? globalThis : (
  /* fall back to a per-module scope (pre-8.1 behaviour) if `globalThis` is not available */
  {}
);
function R4() {
  if (!S.createContext) return {};
  const e = Ac[xc] ?? (Ac[xc] = /* @__PURE__ */ new Map());
  let t = e.get(S.createContext);
  return t || (t = S.createContext(
    null
  ), process.env.NODE_ENV !== "production" && (t.displayName = "ReactRedux"), e.set(S.createContext, t)), t;
}
var $4 = /* @__PURE__ */ R4();
function D4(e) {
  const { children: t, context: r, serverState: n, store: i } = e, a = S.useMemo(() => {
    const s = E4(i), l = {
      store: i,
      subscription: s,
      getServerState: n ? () => n : void 0
    };
    if (process.env.NODE_ENV === "production")
      return l;
    {
      const { identityFunctionCheck: c = "once", stabilityCheck: f = "once" } = e;
      return /* @__PURE__ */ Object.assign(l, {
        stabilityCheck: f,
        identityFunctionCheck: c
      });
    }
  }, [i, n]), o = S.useMemo(() => i.getState(), [i]);
  M4(() => {
    const { subscription: s } = a;
    return s.onStateChange = s.notifyNestedSubs, s.trySubscribe(), o !== i.getState() && s.notifyNestedSubs(), () => {
      s.tryUnsubscribe(), s.onStateChange = void 0;
    };
  }, [a, o]);
  const u = r || $4;
  return /* @__PURE__ */ S.createElement(u.Provider, { value: a }, t);
}
var j4 = D4, L4 = /* @__PURE__ */ new Set([
  "axisLine",
  "tickLine",
  "activeBar",
  "activeDot",
  "activeLabel",
  "activeShape",
  "allowEscapeViewBox",
  "background",
  "cursor",
  "dot",
  "label",
  "line",
  "margin",
  "padding",
  "position",
  "shape",
  "style",
  "tick",
  "wrapperStyle",
  // radius can be an array of 4 numbers, easy to compare shallowly
  "radius",
  "throttledEvents"
]);
function q4(e, t) {
  return e == null && t == null ? !0 : typeof e == "number" && typeof t == "number" ? e === t || e !== e && t !== t : e === t;
}
function Zp(e, t) {
  var r = /* @__PURE__ */ new Set([...Object.keys(e), ...Object.keys(t)]);
  for (var n of r)
    if (L4.has(n)) {
      if (e[n] == null && t[n] == null)
        continue;
      if (!N4(e[n], t[n]))
        return !1;
    } else if (!q4(e[n], t[n]))
      return !1;
  return !0;
}
var z4 = I([fr, dr, Kp], (e, t, r) => ({
  x: r.left || 0,
  y: r.top || 0,
  width: Math.max(e - (r.left || 0) - (r.right || 0), 0),
  height: Math.max(t - (r.top || 0) - (r.bottom || 0), 0)
}));
function F4(e, t) {
  var r;
  if (e === "start" && t === "start")
    return "";
  var n = {
    start: "0",
    middle: "-50%",
    end: "-100%"
  }, i = {
    start: "0",
    middle: "-50%",
    end: "-100%"
  }, a = e === "inherit" ? "0" : n[e], o = (r = i[t]) !== null && r !== void 0 ? r : "0";
  return "translate(".concat(a, ", ").concat(o, ")");
}
var B4 = ["contextPayload"];
function Bv() {
  return Bv = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Bv.apply(null, arguments);
}
function W4(e, t) {
  return K4(e) || H4(e, t) || V4(e, t) || U4();
}
function U4() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function V4(e, t) {
  if (e) {
    if (typeof e == "string") return u0(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? u0(e, t) : void 0;
  }
}
function u0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function H4(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], s = !0, l = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(s = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (c) {
      l = !0, i = c;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function K4(e) {
  if (Array.isArray(e)) return e;
}
function s0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Oi(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? s0(Object(r), !0).forEach(function(n) {
      G4(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : s0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function G4(e, t, r) {
  return (t = Y4(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Y4(e) {
  var t = X4(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function X4(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Z4(e, t) {
  if (e == null) return {};
  var r, n, i = Q4(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function Q4(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function J4(e) {
  return e.value;
}
function e7(e) {
  var t = e.contextPayload, r = Z4(e, B4), n = lO(t, e.payloadUniqBy, J4), i = Oi(Oi({}, r), {}, {
    payload: n
  });
  return /* @__PURE__ */ S.isValidElement(e.content) ? /* @__PURE__ */ S.cloneElement(e.content, i) : typeof e.content == "function" ? /* @__PURE__ */ S.createElement(e.content, i) : /* @__PURE__ */ S.createElement($3, i);
}
function t7(e) {
  return e === "left" || e === "right" || e === "insideLeft" || e === "insideRight" ? "vertical" : "horizontal";
}
function r7(e, t) {
  return t == null ? null : Cp(t) ? z4(e) : QO(e);
}
function n7(e, t, r) {
  return e === "top" ? {
    top: r.height + t
  } : e === "bottom" ? {
    top: -r.height - t
  } : e === "left" ? {
    left: r.width + t
  } : e === "right" ? {
    left: -r.width - t
  } : {};
}
function i7(e, t, r, n, i, a) {
  var o = t.layout, u = t.align, s = t.verticalAlign, l, c;
  return (!e || (e.left === void 0 || e.left === null) && (e.right === void 0 || e.right === null)) && (u === "center" && o === "vertical" ? l = {
    left: ((n || 0) - a.width) / 2
  } : l = u === "right" ? {
    right: r && r.right || 0
  } : {
    left: r && r.left || 0
  }), (!e || (e.top === void 0 || e.top === null) && (e.bottom === void 0 || e.bottom === null)) && (s === "middle" ? c = {
    top: ((i || 0) - a.height) / 2
  } : c = s === "bottom" ? {
    bottom: r && r.bottom || 0
  } : {
    top: r && r.top || 0
  }), Oi(Oi({}, l), c);
}
function a7(e) {
  var t = e.align, r = e.layout, n = e.verticalAlign, i = e.itemSorter, a = e.position, o = e.offset, u = $e();
  return yt(() => {
    u(m4({
      align: t,
      layout: r,
      verticalAlign: n,
      itemSorter: i,
      position: a,
      offset: o
    }));
  }, [u, t, r, n, i, a, o]), null;
}
function o7(e) {
  var t = e.width, r = e.height, n = $e();
  return yt(() => {
    n(t0({
      width: t,
      height: r
    }));
  }, [n, t, r]), yt(() => () => {
    n(t0({
      width: 0,
      height: 0
    }));
  }, [n]), null;
}
function u7(e, t, r, n) {
  return e === "vertical" && t != null ? {
    height: t
  } : e === "horizontal" ? {
    width: r || n
  } : null;
}
var s7 = {
  align: "center",
  iconSize: 14,
  inactiveColor: "#ccc",
  itemSorter: "value",
  labelStyle: {},
  layout: "auto",
  verticalAlign: "bottom",
  offset: 0
};
function l7(e) {
  var t, r, n, i, a, o, u, s, l = Vt(e, s7), c = e.layout && e.layout !== "auto" ? e.layout : t7(l.position), f = Q8(), d = $I(), h = d4(), p = te((W) => r7(W, l.position)), v = l.width, m = l.height, y = l.wrapperStyle, b = l.portal, g = b == null && (l.position == null || Cp(l.position)), _ = vO([f]), x = W4(_, 2), w = x[0], A = x[1], P = rS(), T = nS();
  if (P == null || T == null || l.position != null && p == null)
    return null;
  var C = P - ((h == null ? void 0 : h.left) || 0) - ((h == null ? void 0 : h.right) || 0), O = u7(c, m, v, C), D = l.position == null ? null : bA({
    /*
     * When calculating the position we use two different view boxes.
     * Inside positions use the plot area; outside positions use the margin-inset
     * chart area, placing the Legend beyond any axes.
     */
    viewBox: p ?? {
      x: 0,
      y: 0,
      width: P,
      height: T
    },
    position: l.position,
    offset: (t = l.offset) !== null && t !== void 0 ? t : 0
  }), j = n7(l.position, (r = l.offset) !== null && r !== void 0 ? r : 0, w), z = c === "vertical" ? ((n = p == null ? void 0 : p.width) !== null && n !== void 0 ? n : 0) / 2 : (i = p == null ? void 0 : p.width) !== null && i !== void 0 ? i : 0, E = c === "horizontal" ? ((a = p == null ? void 0 : p.height) !== null && a !== void 0 ? a : 0) / 2 : (o = p == null ? void 0 : p.height) !== null && o !== void 0 ? o : 0, M = D ? {
    width: "max-content",
    height: "max-content",
    maxWidth: z,
    maxHeight: E,
    overflowY: "auto",
    top: D.y + ((u = j.top) !== null && u !== void 0 ? u : 0),
    left: D.x + ((s = j.left) !== null && s !== void 0 ? s : 0),
    transform: F4(D.horizontalAnchor, D.verticalAnchor)
  } : i7(y, l, h, P, T, w), N = b ? y : Oi(Oi({
    position: "absolute",
    width: (O == null ? void 0 : O.width) || v || "auto",
    height: (O == null ? void 0 : O.height) || m || "auto"
  }, M), y), k = b ?? d;
  if (k == null || f == null)
    return null;
  var R = /* @__PURE__ */ S.createElement("div", {
    className: "recharts-legend-wrapper",
    style: N,
    ref: A
  }, /* @__PURE__ */ S.createElement(a7, {
    layout: c,
    align: l.align,
    verticalAlign: l.verticalAlign,
    itemSorter: l.itemSorter,
    position: l.position,
    offset: l.offset
  }), g && /* @__PURE__ */ S.createElement(o7, w), /* @__PURE__ */ S.createElement(e7, Bv({}, l, {
    layout: c
  }, O, {
    margin: h,
    chartWidth: P,
    chartHeight: T,
    contextPayload: f
  })));
  return /* @__PURE__ */ Ap(R, k);
}
var Pu = /* @__PURE__ */ S.memo(l7, Zp);
Pu.displayName = "Legend";
function Wv() {
  return Wv = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Wv.apply(null, arguments);
}
function l0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Zi(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? l0(Object(r), !0).forEach(function(n) {
      c7(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : l0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function c7(e, t, r) {
  return (t = f7(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function f7(e) {
  var t = d7(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function d7(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function h7(e, t) {
  return y7(e) || m7(e, t) || p7(e, t) || v7();
}
function v7() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function p7(e, t) {
  if (e) {
    if (typeof e == "string") return c0(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? c0(e, t) : void 0;
  }
}
function c0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function m7(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], s = !0, l = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(s = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (c) {
      l = !0, i = c;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function y7(e) {
  if (Array.isArray(e)) return e;
}
function g7(e) {
  return Array.isArray(e) && Cr(e[0]) && Cr(e[1]) ? e.join(" ~ ") : e;
}
var ii = {
  separator: " : ",
  contentStyle: {
    margin: 0,
    padding: 10,
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    whiteSpace: "nowrap"
  },
  itemStyle: {
    display: "block",
    paddingTop: 4,
    paddingBottom: 4,
    color: "#000"
  },
  labelStyle: {},
  accessibilityLayer: !1
};
function b7(e, t) {
  return t == null ? e : ys(e, t);
}
var _7 = (e) => {
  var t = e.separator, r = t === void 0 ? ii.separator : t, n = e.contentStyle, i = e.itemStyle, a = e.labelStyle, o = a === void 0 ? ii.labelStyle : a, u = e.payload, s = e.formatter, l = e.itemSorter, c = e.wrapperClassName, f = e.labelClassName, d = e.label, h = e.labelFormatter, p = e.accessibilityLayer, v = p === void 0 ? ii.accessibilityLayer : p, m = () => {
    if (u && u.length) {
      var P = {
        padding: 0,
        margin: 0
      }, T = b7(u, l), C = T.map((O, D) => {
        if (!O || O.type === "none")
          return null;
        var j = O.formatter || s || g7, z = O.value, E = O.name, M = z, N = E;
        if (j) {
          var k = j(z, E, O, D, u);
          if (Array.isArray(k)) {
            var R = h7(k, 2);
            M = R[0], N = R[1];
          } else if (k != null)
            M = k;
          else
            return null;
        }
        var W = Zi(Zi({}, ii.itemStyle), {}, {
          color: O.color || ii.itemStyle.color
        }, i);
        return /* @__PURE__ */ S.createElement("li", {
          className: "recharts-tooltip-item",
          key: "tooltip-item-".concat(D),
          style: W
        }, Cr(N) ? /* @__PURE__ */ S.createElement("span", {
          className: "recharts-tooltip-item-name"
        }, N) : null, Cr(N) ? /* @__PURE__ */ S.createElement("span", {
          className: "recharts-tooltip-item-separator"
        }, r) : null, /* @__PURE__ */ S.createElement("span", {
          className: "recharts-tooltip-item-value"
        }, M), /* @__PURE__ */ S.createElement("span", {
          className: "recharts-tooltip-item-unit"
        }, O.unit || ""));
      });
      return /* @__PURE__ */ S.createElement("ul", {
        className: "recharts-tooltip-item-list",
        style: P
      }, C);
    }
    return null;
  }, y = Zi(Zi({}, ii.contentStyle), n), b = Zi({
    margin: 0
  }, o), g = !dt(d), _ = g ? d : "", x = ze("recharts-default-tooltip", c), w = ze("recharts-tooltip-label", f);
  g && h && u !== void 0 && u !== null && (_ = h(d, u));
  var A = v ? {
    role: "status",
    "aria-live": "assertive"
  } : {};
  return /* @__PURE__ */ S.createElement("div", Wv({
    className: x,
    style: y
  }, A), /* @__PURE__ */ S.createElement("p", {
    className: w,
    style: b
  }, /* @__PURE__ */ S.isValidElement(_) ? _ : "".concat(_)), m());
}, Qi = "recharts-tooltip-wrapper", w7 = {
  visibility: "hidden"
};
function x7(e) {
  var t = e.coordinate, r = e.translateX, n = e.translateY;
  return ze(Qi, {
    ["".concat(Qi, "-right")]: G(r) && t && G(t.x) && r >= t.x,
    ["".concat(Qi, "-left")]: G(r) && t && G(t.x) && r < t.x,
    ["".concat(Qi, "-bottom")]: G(n) && t && G(t.y) && n >= t.y,
    ["".concat(Qi, "-top")]: G(n) && t && G(t.y) && n < t.y
  });
}
function f0(e) {
  var t = e.allowEscapeViewBox, r = e.coordinate, n = e.key, i = e.offset, a = e.position, o = e.reverseDirection, u = e.tooltipDimension, s = e.viewBox, l = e.viewBoxDimension;
  if (a && G(a[n]))
    return a[n];
  var c = r[n] - u - (i > 0 ? i : 0), f = r[n] + i;
  if (t[n])
    return o[n] ? c : f;
  var d = s[n];
  if (d == null)
    return 0;
  if (o[n]) {
    var h = c, p = d;
    return h < p ? Math.max(f, d) : Math.max(c, d);
  }
  if (l == null)
    return 0;
  var v = f + u, m = d + l;
  return v > m ? Math.max(c, d) : Math.max(f, d);
}
function A7(e) {
  var t = e.translateX, r = e.translateY, n = e.useTranslate3d;
  return {
    transform: n ? "translate3d(".concat(t, "px, ").concat(r, "px, 0)") : "translate(".concat(t, "px, ").concat(r, "px)")
  };
}
function O7(e) {
  var t = e.allowEscapeViewBox, r = e.coordinate, n = e.offsetTop, i = e.offsetLeft, a = e.position, o = e.reverseDirection, u = e.tooltipBox, s = e.useTranslate3d, l = e.viewBox, c, f, d;
  return u && u.height > 0 && u.width > 0 && r ? (f = f0({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "x",
    offset: i,
    position: a,
    reverseDirection: o,
    tooltipDimension: u.width,
    viewBox: l,
    viewBoxDimension: l.width
  }), d = f0({
    allowEscapeViewBox: t,
    coordinate: r,
    key: "y",
    offset: n,
    position: a,
    reverseDirection: o,
    tooltipDimension: u.height,
    viewBox: l,
    viewBoxDimension: l.height
  }), c = A7({
    translateX: f,
    translateY: d,
    useTranslate3d: s
  })) : c = w7, {
    cssProperties: c,
    cssClasses: x7({
      translateX: f,
      translateY: d,
      coordinate: r
    })
  };
}
var S7 = () => !(typeof window < "u" && window.document && window.document.createElement && window.setTimeout), Ns = {
  isSsr: S7()
};
function E7(e, t) {
  return I7(e) || C7(e, t) || T7(e, t) || P7();
}
function P7() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function T7(e, t) {
  if (e) {
    if (typeof e == "string") return d0(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? d0(e, t) : void 0;
  }
}
function d0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function C7(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], s = !0, l = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(s = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (c) {
      l = !0, i = c;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function I7(e) {
  if (Array.isArray(e)) return e;
}
function aS() {
  var e = be(() => Ns.isSsr || !window.matchMedia ? !1 : window.matchMedia("(prefers-reduced-motion: reduce)").matches), t = E7(e, 2), r = t[0], n = t[1];
  return pe(() => {
    if (window.matchMedia) {
      var i = window.matchMedia("(prefers-reduced-motion: reduce)"), a = () => {
        n(i.matches);
      };
      return i.addEventListener("change", a), () => {
        i.removeEventListener("change", a);
      };
    }
  }, []), r;
}
function h0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ai(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? h0(Object(r), !0).forEach(function(n) {
      k7(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : h0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function k7(e, t, r) {
  return (t = M7(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function M7(e) {
  var t = N7(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function N7(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function R7(e, t) {
  return L7(e) || j7(e, t) || D7(e, t) || $7();
}
function $7() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function D7(e, t) {
  if (e) {
    if (typeof e == "string") return v0(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? v0(e, t) : void 0;
  }
}
function v0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function j7(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], s = !0, l = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(s = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (c) {
      l = !0, i = c;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function L7(e) {
  if (Array.isArray(e)) return e;
}
function q7(e) {
  if (!(e.prefersReducedMotion && e.isAnimationActive === "auto") && e.isAnimationActive && e.active) {
    var t = typeof e.animationEasing == "string" ? e.animationEasing : "ease";
    return "transform ".concat(e.animationDuration, "ms ").concat(t);
  }
}
function z7(e) {
  var t, r, n, i, a, o, u = aS(), s = S.useState(() => ({
    dismissed: !1,
    dismissedAtCoordinate: {
      x: 0,
      y: 0
    }
  })), l = R7(s, 2), c = l[0], f = l[1];
  S.useEffect(() => {
    var y = (b) => {
      if (b.key === "Escape") {
        var g, _, x, w;
        f({
          dismissed: !0,
          dismissedAtCoordinate: {
            x: (g = (_ = e.coordinate) === null || _ === void 0 ? void 0 : _.x) !== null && g !== void 0 ? g : 0,
            y: (x = (w = e.coordinate) === null || w === void 0 ? void 0 : w.y) !== null && x !== void 0 ? x : 0
          }
        });
      }
    };
    return document.addEventListener("keydown", y), () => {
      document.removeEventListener("keydown", y);
    };
  }, [(t = e.coordinate) === null || t === void 0 ? void 0 : t.x, (r = e.coordinate) === null || r === void 0 ? void 0 : r.y]), c.dismissed && (((n = (i = e.coordinate) === null || i === void 0 ? void 0 : i.x) !== null && n !== void 0 ? n : 0) !== c.dismissedAtCoordinate.x || ((a = (o = e.coordinate) === null || o === void 0 ? void 0 : o.y) !== null && a !== void 0 ? a : 0) !== c.dismissedAtCoordinate.y) && f(ai(ai({}, c), {}, {
    dismissed: !1
  }));
  var d = O7({
    allowEscapeViewBox: e.allowEscapeViewBox,
    coordinate: e.coordinate,
    offsetLeft: typeof e.offset == "number" ? e.offset : e.offset.x,
    offsetTop: typeof e.offset == "number" ? e.offset : e.offset.y,
    position: e.position,
    reverseDirection: e.reverseDirection,
    tooltipBox: e.lastBoundingBox,
    useTranslate3d: e.useTranslate3d,
    viewBox: e.viewBox
  }), h = d.cssClasses, p = d.cssProperties, v = e.hasPortalFromProps ? {} : ai(ai({
    transition: q7({
      prefersReducedMotion: u,
      isAnimationActive: e.isAnimationActive,
      active: e.active,
      animationDuration: e.animationDuration,
      animationEasing: e.animationEasing
    })
  }, p), {}, {
    pointerEvents: "none",
    position: "absolute",
    top: 0,
    left: 0
  }), m = ai(ai({}, v), {}, {
    visibility: !c.dismissed && e.active && e.hasPayload ? "visible" : "hidden"
  }, e.wrapperStyle);
  return /* @__PURE__ */ S.createElement("div", {
    // @ts-expect-error TypeScript library does not recognize xmlns attribute, but it's required for an HTML chunk inside SVG.
    xmlns: "http://www.w3.org/1999/xhtml",
    tabIndex: -1,
    className: h,
    style: m,
    ref: e.innerRef
  }, e.children);
}
var F7 = /* @__PURE__ */ S.memo(z7), oS = () => {
  var e;
  return (e = te((t) => t.rootProps.accessibilityLayer)) !== null && e !== void 0 ? e : !0;
};
function Uv() {
  return Uv = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Uv.apply(null, arguments);
}
function p0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function m0(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? p0(Object(r), !0).forEach(function(n) {
      B7(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : p0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function B7(e, t, r) {
  return (t = W7(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function W7(e) {
  var t = U7(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function U7(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var y0 = {
  curveBasisClosed: kA,
  curveBasisOpen: NA,
  curveBasis: CA,
  curveBumpX: qI,
  curveBumpY: zI,
  curveLinearClosed: qA,
  curveLinear: Ya,
  curveMonotoneX: jp,
  curveMonotoneY: Lp,
  curveNatural: WA,
  curveStep: UA,
  curveStepAfter: HA,
  curveStepBefore: VA
}, Tu = (e) => _e(e.x) && _e(e.y), g0 = (e) => e.base != null && Tu(e.base) && Tu(e), Ji = (e) => e.x, ea = (e) => e.y, V7 = (e, t) => {
  if (typeof e == "function")
    return e;
  var r = "curve".concat(Ga(e));
  if ((r === "curveMonotone" || r === "curveBump") && t) {
    var n = y0["".concat(r).concat(t === "vertical" ? "Y" : "X")];
    if (n)
      return n;
  }
  return y0[r] || Ya;
}, b0 = {
  connectNulls: !1,
  type: "linear"
}, H7 = (e) => {
  var t = e.type, r = t === void 0 ? b0.type : t, n = e.points, i = n === void 0 ? [] : n, a = e.baseLine, o = e.layout, u = e.connectNulls, s = u === void 0 ? b0.connectNulls : u, l = V7(r, o), c = s ? i.filter(Tu) : i;
  if (Array.isArray(a)) {
    var f, d = i.map((y, b) => m0(m0({}, y), {}, {
      base: a[b]
    }));
    o === "vertical" ? f = Po().y(ea).x1(Ji).x0((y) => y.base.x) : f = Po().x(Ji).y1(ea).y0((y) => y.base.y);
    var h = f.defined(g0).curve(l), p = s ? d.filter(g0) : d;
    return h(p);
  }
  var v;
  o === "vertical" && G(a) ? v = Po().y(ea).x1(Ji).x0(a) : G(a) ? v = Po().x(Ji).y1(ea).y0(a) : v = fu().x(Ji).y(ea);
  var m = v.defined(Tu).curve(l);
  return m(c);
}, uS = (e) => {
  var t = e.className, r = e.points, n = e.path, i = e.pathRef, a = Ms();
  if ((!r || !r.length) && !n)
    return null;
  var o = {
    type: e.type,
    points: e.points,
    baseLine: e.baseLine,
    layout: e.layout || a,
    connectNulls: e.connectNulls
  }, u = r && r.length ? H7(o) : n;
  return /* @__PURE__ */ S.createElement("path", Uv({}, xi(e), x3(e), {
    className: ze("recharts-curve", t),
    d: u === null ? void 0 : u,
    ref: i
  }));
}, K7 = ["x", "y", "top", "left", "width", "height", "className"];
function Vv() {
  return Vv = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Vv.apply(null, arguments);
}
function _0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function G7(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? _0(Object(r), !0).forEach(function(n) {
      Y7(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : _0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Y7(e, t, r) {
  return (t = X7(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function X7(e) {
  var t = Z7(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Z7(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Q7(e, t) {
  if (e == null) return {};
  var r, n, i = J7(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function J7(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var ek = (e, t, r, n, i, a) => "M".concat(e, ",").concat(i, "v").concat(n, "M").concat(a, ",").concat(t, "h").concat(r), tk = (e) => {
  var t = e.x, r = t === void 0 ? 0 : t, n = e.y, i = n === void 0 ? 0 : n, a = e.top, o = a === void 0 ? 0 : a, u = e.left, s = u === void 0 ? 0 : u, l = e.width, c = l === void 0 ? 0 : l, f = e.height, d = f === void 0 ? 0 : f, h = e.className, p = Q7(e, K7), v = G7({
    x: r,
    y: i,
    top: o,
    left: s,
    width: c,
    height: d
  }, p);
  return !G(r) || !G(i) || !G(c) || !G(d) || !G(o) || !G(s) ? null : /* @__PURE__ */ S.createElement("path", Vv({}, sr(v), {
    className: ze("recharts-cross", h),
    d: ek(r, i, c, d, o, s)
  }));
};
function rk(e, t, r, n) {
  var i = n / 2;
  return {
    stroke: "none",
    fill: "#ccc",
    x: e === "horizontal" ? t.x - i : r.left + 0.5,
    y: e === "horizontal" ? r.top + 0.5 : t.y - i,
    width: e === "horizontal" ? n : r.width - 1,
    height: e === "horizontal" ? r.height - 1 : n
  };
}
var Cu = 1e-4, sS = (e, t) => [0, 3 * e, 3 * t - 6 * e, 3 * e - 3 * t + 1], lS = (e, t) => e.map((r, n) => r * t ** n).reduce((r, n) => r + n), w0 = (e, t) => (r) => {
  var n = sS(e, t);
  return lS(n, r);
}, nk = (e, t) => (r) => {
  var n = sS(e, t), i = [...n.map((a, o) => a * o).slice(1), 0];
  return lS(i, r);
}, ik = (e) => {
  var t, r = e.split("(");
  if (r.length !== 2 || r[0] !== "cubic-bezier")
    return null;
  var n = (t = r[1]) === null || t === void 0 || (t = t.split(")")[0]) === null || t === void 0 ? void 0 : t.split(",");
  if (n == null || n.length !== 4)
    return null;
  var i = n.map((a) => parseFloat(a));
  return [i[0], i[1], i[2], i[3]];
}, ak = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  if (r.length === 1)
    switch (r[0]) {
      case "linear":
        return [0, 0, 1, 1];
      case "ease":
        return [0.25, 0.1, 0.25, 1];
      case "ease-in":
        return [0.42, 0, 1, 1];
      case "ease-out":
        return [0.42, 0, 0.58, 1];
      case "ease-in-out":
        return [0, 0, 0.58, 1];
      default: {
        var i = ik(r[0]);
        if (i)
          return i;
      }
    }
  return r.length === 4 ? r : [0, 0, 1, 1];
}, ok = (e, t, r, n) => {
  var i = w0(e, r), a = w0(t, n), o = nk(e, r), u = (l) => l > 1 ? 1 : l < 0 ? 0 : l, s = (l) => {
    for (var c = l > 1 ? 1 : l, f = c, d = 0; d < 8; ++d) {
      var h = i(f) - c, p = o(f);
      if (Math.abs(h - c) < Cu || p < Cu)
        return a(f);
      f = u(f - h / p);
    }
    return a(f);
  };
  return s.isStepper = !1, s;
}, x0 = function() {
  return ok(...ak(...arguments));
}, uk = function() {
  for (var t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, r = t.stiff, n = r === void 0 ? 100 : r, i = t.damping, a = i === void 0 ? 8 : i, o = t.dt, u = o === void 0 ? 16.67 : o, s = 1, l = [0], c = 0, f = 0, d = 1e4, h = 0; h < d; ) {
    var p = -(c - s) * n, v = f * a;
    if (f += (p - v) * u / 1e3, c += f * u / 1e3, l.push(c), Math.abs(c - s) < Cu && Math.abs(f) < Cu)
      break;
    h++;
  }
  l[l.length - 1] = s;
  var m = l.length - 1;
  return (y) => {
    var b, g, _;
    if (y <= 0) return 0;
    if (y >= 1) return s;
    var x = y * m, w = Math.floor(x), A = x - w;
    return ((b = l[w]) !== null && b !== void 0 ? b : 0) + (((g = l[w + 1]) !== null && g !== void 0 ? g : 0) - ((_ = l[w]) !== null && _ !== void 0 ? _ : 0)) * A;
  };
}, sk = (e) => {
  if (typeof e == "string")
    switch (e) {
      case "ease":
      case "ease-in-out":
      case "ease-out":
      case "ease-in":
      case "linear":
        return x0(e);
      case "spring":
        return uk();
      default:
        if (e.split("(")[0] === "cubic-bezier")
          return x0(e);
    }
  return typeof e == "function" ? e : null;
}, lk = (e, t, r) => {
  var n, i = (a) => {
    var o = t.tick(a);
    if (t.getState() === "active") {
      if (r(t.getInterpolated()), t.getProgress() === 1) {
        t.complete(), n = void 0;
        return;
      }
      n = e.setTimeout(i, o);
      return;
    }
    n = e.setTimeout(i, o);
  };
  return n = e.setTimeout(i, 0), () => {
    var a;
    return (a = n) === null || a === void 0 ? void 0 : a();
  };
}, cS = /* @__PURE__ */ et(lk);
cS.Provider;
function ck(e) {
  var t = at(cS);
  return ue(() => e ?? t, [e, t]);
}
function fk(e, t, r) {
  return (t = dk(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function dk(e) {
  var t = hk(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function hk(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var A0 = "init", O0 = "pending", S0 = "active", vk = "completed";
function Oc(e) {
  return Math.max(0, e);
}
class pk {
  /**
   * Returns the absolute time after the animationBegin delay has been completed,
   * and when the animationDuration started ticking.
   */
  getAnimationStartedTime() {
    return this.animationStartedTime;
  }
  /**
   * Returns the absolute time of when the animation began - now it will wait for {animationBegin} ms before the transition starts
   */
  getBeginStartedTime() {
    return this.beginStartedTime;
  }
  constructor(t) {
    var r;
    fk(this, "state", A0), this.animationId = t.animationId, this.onAnimationEnd = t.onAnimationEnd, this.animationDuration = Oc(t.animationDuration), this.animationBegin = Oc(t.animationBegin), this.progress = 0, this.from = t.from, this.to = t.to, this.easing = t.easing, (r = t.onAnimationStart) === null || r === void 0 || r.call(t);
  }
  /**
   * Returns the state machine current state
   * - `init`:       animation had just been created. It immediately calls `onAnimationStart`
   * - `pending`:    animation is now paused for `animationBegin` milliseconds until the transition begins
   * - `active`:     animation is transitioning items on screen
   * - `completed`:  animation has completed its transition and executed `onAnimationEnd`.
   *                 This state is final and the animation is no longer allowed to transition to other states.
   */
  getState() {
    return this.state;
  }
  /**
   * Returns the easing input or function
   */
  getEasing() {
    return this.easing;
  }
  /**
   * Returns the configuration - the duration of the transition.
   * Does not change in time, does not change when state changes, this is a static value.
   */
  getAnimationDuration() {
    return this.animationDuration;
  }
  /**
   * Sets the current time of the animation. The animation sets its internal state and progress accordingly.
   * This is current, absolute time; not additive!
   * This allows you to essentially "travel back in time" based on the value you pass in here.
   *
   * Returns the (relative) time remaining until the current activity is over.
   * Meaning: if the state is in a middle of a delay, returns the time left until the delay is finished.
   * If the state is in the middle of a transition, returns time left until that transition is complete.
   * This is useful because it's the same number you can take and put into setTimeout(fn, X)
   * as that's how much time we need to wait until the next state transition happens.
   */
  tick(t) {
    if (this.getState() === A0)
      return this.state = O0, this.beginStartedTime = t, this.animationBegin;
    if (this.getState() === O0) {
      if (this.beginStartedTime == null)
        throw new Error();
      var r = t - this.beginStartedTime;
      return r >= this.animationBegin ? (this.state = S0, this.animationStartedTime = t, this.nextAnimationUpdate(0)) : Oc(this.animationBegin - r);
    }
    if (this.getState() === S0) {
      if (this.animationStartedTime == null)
        throw new Error();
      var n = t - this.animationStartedTime;
      return this.setProgress(n / this.animationDuration), this.nextAnimationUpdate(n);
    }
    return 0;
  }
  setProgress(t) {
    this.progress = Math.min(1, Math.max(0, t));
  }
  /**
   * Returns an abstract "progress" which is number between 0 and 1 which shows the distance of transition.
   * This progress depends on the animation state:
   * - `init`: 0
   * - `pending`: 0
   * - `active`: transitioning between [0, 1] based on the time elapsed
   * - `completed`: 1
   *
   * The progress is hard-capped to be between 0 and 1 (inclusive) to avoid overshooting caused by coarse timers.
   * For this reason, the easing function must be applied _after_ this animation state,
   * so that one has a chance to construct dynamic "overshoot" animations.
   *
   * The progress is linear with time.
   * If you wish for easing, use `getInterpolated()` instead.
   */
  getProgress() {
    return this.progress;
  }
  /**
   * Completes the animation. Completed animation:
   * - cannot be manipulated anymore
   * - its progress is set to 1
   * - tick function doesn't do anything
   * - getState() always returns 'completed'
   */
  complete() {
    if (this.progress = 1, this.state === "active") {
      var t;
      (t = this.onAnimationEnd) === null || t === void 0 || t.call(this);
    }
    this.state = vk;
  }
  /**
   * Returns the starting value of the animation.
   * Does not include progress, easing, interpolation, none of that - just the static starting value
   */
  getFrom() {
    return this.from;
  }
  /**
   * Returns the end value of the animation.
   * Does not include progress, easing, interpolation, none of that - just the static end value
   */
  getTo() {
    return this.to;
  }
  /**
   * Unique identifier of an animation
   */
  getAnimationId() {
    return this.animationId;
  }
  /**
   * Returns the configuration - the duration of delay in between animation initialization, and transition.
   * Does not change in time, does not change when state changes, this is a static value.
   */
  getAnimationBegin() {
    return this.animationBegin;
  }
  /**
   * Returns value of the transition at the current time.
   * The exact details differ based on the animation type
   */
  /**
   * Returns the duration of time of when the controller should ask for the next update
   */
}
class mk extends pk {
  // eslint-disable-next-line class-methods-use-this
  nextAnimationUpdate() {
    return 0;
  }
  /**
   * Returns value of the animation after its easing function had been applied.
   * This value, unlike getProgress(), can escape the [0..1] range
   * because this is entirely within the easing function control. Spring typically does this.
   */
  getInterpolated() {
    return this.easing(xn(this.getFrom(), this.getTo(), this.getProgress()));
  }
}
class yk {
  setTimeout(t) {
    var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, n = performance.now(), i = null, a = (o) => {
      o - n >= r ? t(o) : i = requestAnimationFrame(a);
    };
    return i = requestAnimationFrame(a), () => {
      i != null && cancelAnimationFrame(i);
    };
  }
}
function gk(e, t) {
  return xk(e) || wk(e, t) || _k(e, t) || bk();
}
function bk() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function _k(e, t) {
  if (e) {
    if (typeof e == "string") return E0(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? E0(e, t) : void 0;
  }
}
function E0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function wk(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], s = !0, l = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(s = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (c) {
      l = !0, i = c;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function xk(e) {
  if (Array.isArray(e)) return e;
}
var Ak = {
  begin: 0,
  duration: 1e3,
  easing: "ease",
  isActive: !0,
  canBegin: !0,
  onAnimationEnd: () => {
  },
  onAnimationStart: () => {
  }
}, P0 = 0, Sc = 1;
function fS(e) {
  var t = Vt(e, Ak), r = t.animationId, n = t.isActive, i = t.canBegin, a = t.duration, o = t.easing, u = t.begin, s = t.onAnimationEnd, l = t.onAnimationStart, c = t.children, f = aS(), d = n === "auto" ? !Ns.isSsr && !f : n, h = ck(t.animationController), p = be(d ? P0 : Sc), v = gk(p, 2), m = v[0], y = v[1];
  return pe(() => {
    d || y(Sc);
  }, [d]), pe(() => {
    var b = sk(o);
    if (!d || !i || b == null)
      return ds;
    var g = new yk(), _ = new mk({
      animationId: r,
      easing: b,
      animationDuration: a,
      animationBegin: u,
      onAnimationStart: l,
      onAnimationEnd: s,
      from: P0,
      to: Sc
    });
    return h(g, _, y);
  }, [h, r, d, i, a, o, u, l, s]), c(Number(m));
}
function dS(e) {
  var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "animation-", r = J(ka(t)), n = J(e);
  return n.current !== e && (r.current = ka(t), n.current = e), r.current;
}
var Ok = (e) => e.replace(/([A-Z])/g, (t) => "-".concat(t.toLowerCase())), Sk = (e, t, r) => e.map((n) => "".concat(Ok(n), " ").concat(t, "ms ").concat(r)).join(","), Ek = ["radius"], Pk = ["radius"], T0, C0, I0, k0, M0, N0, R0, $0, D0, j0;
function L0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function q0(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? L0(Object(r), !0).forEach(function(n) {
      Tk(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : L0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Tk(e, t, r) {
  return (t = Ck(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Ck(e) {
  var t = Ik(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Ik(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Iu() {
  return Iu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Iu.apply(null, arguments);
}
function z0(e, t) {
  if (e == null) return {};
  var r, n, i = kk(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function kk(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Mk(e, t) {
  return Dk(e) || $k(e, t) || Rk(e, t) || Nk();
}
function Nk() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Rk(e, t) {
  if (e) {
    if (typeof e == "string") return F0(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? F0(e, t) : void 0;
  }
}
function F0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function $k(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], s = !0, l = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(s = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (c) {
      l = !0, i = c;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function Dk(e) {
  if (Array.isArray(e)) return e;
}
function Qt(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var B0 = (e, t, r, n, i) => {
  var a = Ur(r), o = Ur(n), u = Math.min(Math.abs(a) / 2, Math.abs(o) / 2), s = o >= 0 ? 1 : -1, l = a >= 0 ? 1 : -1, c = o >= 0 && a >= 0 || o < 0 && a < 0 ? 1 : 0, f;
  if (u > 0 && Array.isArray(i)) {
    for (var d = [0, 0, 0, 0], h = 0, p = 4; h < p; h++) {
      var v, m = (v = i[h]) !== null && v !== void 0 ? v : 0;
      d[h] = m > u ? u : m;
    }
    f = Qe(T0 || (T0 = Qt(["M", ",", ""])), e, t + s * d[0]), d[0] > 0 && (f += Qe(C0 || (C0 = Qt(["A ", ",", ",0,0,", ",", ",", ""])), d[0], d[0], c, e + l * d[0], t)), f += Qe(I0 || (I0 = Qt(["L ", ",", ""])), e + r - l * d[1], t), d[1] > 0 && (f += Qe(k0 || (k0 = Qt(["A ", ",", ",0,0,", `,
        `, ",", ""])), d[1], d[1], c, e + r, t + s * d[1])), f += Qe(M0 || (M0 = Qt(["L ", ",", ""])), e + r, t + n - s * d[2]), d[2] > 0 && (f += Qe(N0 || (N0 = Qt(["A ", ",", ",0,0,", `,
        `, ",", ""])), d[2], d[2], c, e + r - l * d[2], t + n)), f += Qe(R0 || (R0 = Qt(["L ", ",", ""])), e + l * d[3], t + n), d[3] > 0 && (f += Qe($0 || ($0 = Qt(["A ", ",", ",0,0,", `,
        `, ",", ""])), d[3], d[3], c, e, t + n - s * d[3])), f += "Z";
  } else if (u > 0 && i === +i && i > 0) {
    var y = Math.min(u, i);
    f = Qe(D0 || (D0 = Qt(["M ", ",", `
            A `, ",", ",0,0,", ",", ",", `
            L `, ",", `
            A `, ",", ",0,0,", ",", ",", `
            L `, ",", `
            A `, ",", ",0,0,", ",", ",", `
            L `, ",", `
            A `, ",", ",0,0,", ",", ",", " Z"])), e, t + s * y, y, y, c, e + l * y, t, e + r - l * y, t, y, y, c, e + r, t + s * y, e + r, t + n - s * y, y, y, c, e + r - l * y, t + n, e + l * y, t + n, y, y, c, e, t + n - s * y);
  } else
    f = Qe(j0 || (j0 = Qt(["M ", ",", " h ", " v ", " h ", " Z"])), e, t, r, n, -r);
  return f;
}, W0 = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  radius: 0,
  isAnimationActive: !1,
  isUpdateAnimationActive: !1,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: "ease"
}, jk = (e) => {
  var t = Vt(e, W0), r = J(null), n = be(-1), i = Mk(n, 2), a = i[0], o = i[1];
  pe(() => {
    if (r.current && r.current.getTotalLength)
      try {
        var k = r.current.getTotalLength();
        k && o(k);
      } catch {
      }
  }, []);
  var u = t.x, s = t.y, l = t.width, c = t.height, f = t.radius, d = t.className, h = t.animationEasing, p = t.animationDuration, v = t.animationBegin, m = t.isAnimationActive, y = t.isUpdateAnimationActive, b = J(l), g = J(c), _ = J(u), x = J(s), w = ue(() => ({
    x: u,
    y: s,
    width: l,
    height: c,
    radius: f
  }), [u, s, l, c, f]), A = dS(w, "rectangle-");
  if (u !== +u || s !== +s || l !== +l || c !== +c || l === 0 || c === 0)
    return null;
  var P = ze("recharts-rectangle", d);
  if (!y) {
    var T = sr(t);
    T.radius;
    var C = z0(T, Ek);
    return /* @__PURE__ */ S.createElement("path", Iu({}, C, {
      x: Ur(u),
      y: Ur(s),
      width: Ur(l),
      height: Ur(c),
      radius: typeof f == "number" ? f : void 0,
      className: P,
      d: B0(u, s, l, c, f)
    }));
  }
  var O = b.current, D = g.current, j = _.current, z = x.current, E = "0px ".concat(a === -1 ? 1 : a, "px"), M = "".concat(a, "px ").concat(a, "px"), N = Sk(["strokeDasharray"], p, typeof h == "string" ? h : W0.animationEasing);
  return /* @__PURE__ */ S.createElement(fS, {
    animationId: A,
    key: A,
    canBegin: a > 0,
    duration: p,
    easing: h,
    isActive: y,
    begin: v
  }, (k) => {
    var R = xn(O, l, k), W = xn(D, c, k), Z = xn(j, u, k), ce = xn(z, s, k);
    r.current && (b.current = R, g.current = W, _.current = Z, x.current = ce);
    var fe;
    m ? k > 0 ? fe = {
      transition: N,
      strokeDasharray: M
    } : fe = {
      strokeDasharray: E
    } : fe = {
      strokeDasharray: M
    };
    var de = sr(t);
    de.radius;
    var Oe = z0(de, Pk);
    return /* @__PURE__ */ S.createElement("path", Iu({}, Oe, {
      radius: typeof f == "number" ? f : void 0,
      className: P,
      d: B0(Z, ce, R, W, f),
      ref: r,
      style: q0(q0({}, fe), t.style)
    }));
  });
};
function U0(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function V0(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? U0(Object(r), !0).forEach(function(n) {
      Lk(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : U0(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Lk(e, t, r) {
  return (t = qk(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function qk(e) {
  var t = zk(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function zk(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ku = Math.PI / 180, Fk = (e) => e * 180 / Math.PI, Le = (e, t, r, n) => ({
  x: e + Math.cos(-ku * n) * r,
  y: t + Math.sin(-ku * n) * r
}), hS = function(t, r) {
  var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
  return Math.min(Math.abs(t - (n.left || 0) - (n.right || 0)), Math.abs(r - (n.top || 0) - (n.bottom || 0))) / 2;
}, Bk = (e, t) => {
  var r = e.x, n = e.y, i = t.x, a = t.y;
  return Math.sqrt((r - i) ** 2 + (n - a) ** 2);
}, Wk = (e, t) => {
  var r = e.x, n = e.y, i = t.cx, a = t.cy, o = Bk({
    x: r,
    y: n
  }, {
    x: i,
    y: a
  });
  if (o <= 0)
    return {
      radius: o,
      angle: 0
    };
  var u = (r - i) / o, s = Math.acos(u);
  return n > a && (s = 2 * Math.PI - s), {
    radius: o,
    angle: Fk(s),
    angleInRadian: s
  };
}, Uk = (e) => {
  var t = e.startAngle, r = e.endAngle, n = Math.floor(t / 360), i = Math.floor(r / 360), a = Math.min(n, i);
  return {
    startAngle: t - a * 360,
    endAngle: r - a * 360
  };
}, Vk = (e, t) => {
  var r = t.startAngle, n = t.endAngle, i = Math.floor(r / 360), a = Math.floor(n / 360), o = Math.min(i, a);
  return e + o * 360;
}, Hk = (e, t) => {
  var r = e.relativeX, n = e.relativeY, i = Wk({
    x: r,
    y: n
  }, t), a = i.radius, o = i.angle, u = t.innerRadius, s = t.outerRadius;
  if (a < u || a > s || a === 0)
    return null;
  var l = Uk(t), c = l.startAngle, f = l.endAngle, d = o, h;
  if (c <= f) {
    for (; d > f; )
      d -= 360;
    for (; d < c; )
      d += 360;
    h = d >= c && d <= f;
  } else {
    for (; d > c; )
      d -= 360;
    for (; d < f; )
      d += 360;
    h = d >= f && d <= c;
  }
  return h ? V0(V0({}, t), {}, {
    radius: a,
    angle: Vk(d, t)
  }) : null;
};
function vS(e) {
  var t = e.cx, r = e.cy, n = e.radius, i = e.startAngle, a = e.endAngle, o = Le(t, r, n, i), u = Le(t, r, n, a);
  return {
    points: [o, u],
    cx: t,
    cy: r,
    radius: n,
    startAngle: i,
    endAngle: a
  };
}
var H0, K0, G0, Y0, X0, Z0, Q0;
function Hv() {
  return Hv = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Hv.apply(null, arguments);
}
function On(e, t) {
  return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } }));
}
var Kk = (e, t) => {
  var r = ft(t - e), n = Math.min(Math.abs(t - e), 359.999);
  return r * n;
}, qo = (e) => {
  var t = e.cx, r = e.cy, n = e.radius, i = e.angle, a = e.sign, o = e.isExternal, u = e.cornerRadius, s = e.cornerIsExternal, l = u * (o ? 1 : -1) + n, c = Math.asin(u / l) / ku, f = s ? i : i + a * c, d = Le(t, r, l, f), h = Le(t, r, n, f), p = s ? i - a * c : i, v = Le(t, r, l * Math.cos(c * ku), p);
  return {
    center: d,
    circleTangency: h,
    lineTangency: v,
    theta: c
  };
}, pS = (e) => {
  var t = e.cx, r = e.cy, n = e.innerRadius, i = e.outerRadius, a = e.startAngle, o = e.endAngle, u = Kk(a, o), s = a + u, l = Le(t, r, i, a), c = Le(t, r, i, s), f = Qe(H0 || (H0 = On(["M ", ",", `
    A `, ",", `,0,
    `, ",", `,
    `, ",", `
  `])), l.x, l.y, i, i, +(Math.abs(u) > 180), +(a > s), c.x, c.y);
  if (n > 0) {
    var d = Le(t, r, n, a), h = Le(t, r, n, s);
    f += Qe(K0 || (K0 = On(["L ", ",", `
            A `, ",", `,0,
            `, ",", `,
            `, ",", " Z"])), h.x, h.y, n, n, +(Math.abs(u) > 180), +(a <= s), d.x, d.y);
  } else
    f += Qe(G0 || (G0 = On(["L ", ",", " Z"])), t, r);
  return f;
}, Gk = (e) => {
  var t = e.cx, r = e.cy, n = e.innerRadius, i = e.outerRadius, a = e.cornerRadius, o = e.forceCornerRadius, u = e.cornerIsExternal, s = e.startAngle, l = e.endAngle, c = ft(l - s), f = qo({
    cx: t,
    cy: r,
    radius: i,
    angle: s,
    sign: c,
    cornerRadius: a,
    cornerIsExternal: u
  }), d = f.circleTangency, h = f.lineTangency, p = f.theta, v = qo({
    cx: t,
    cy: r,
    radius: i,
    angle: l,
    sign: -c,
    cornerRadius: a,
    cornerIsExternal: u
  }), m = v.circleTangency, y = v.lineTangency, b = v.theta, g = u ? Math.abs(s - l) : Math.abs(s - l) - p - b;
  if (g < 0)
    return o ? Qe(Y0 || (Y0 = On(["M ", ",", `
        a`, ",", ",0,0,1,", `,0
        a`, ",", ",0,0,1,", `,0
      `])), h.x, h.y, a, a, a * 2, a, a, -a * 2) : pS({
      cx: t,
      cy: r,
      innerRadius: n,
      outerRadius: i,
      startAngle: s,
      endAngle: l
    });
  var _ = Qe(X0 || (X0 = On(["M ", ",", `
    A`, ",", ",0,0,", ",", ",", `
    A`, ",", ",0,", ",", ",", ",", `
    A`, ",", ",0,0,", ",", ",", `
  `])), h.x, h.y, a, a, +(c < 0), d.x, d.y, i, i, +(g > 180), +(c < 0), m.x, m.y, a, a, +(c < 0), y.x, y.y);
  if (n > 0) {
    var x = qo({
      cx: t,
      cy: r,
      radius: n,
      angle: s,
      sign: c,
      isExternal: !0,
      cornerRadius: a,
      cornerIsExternal: u
    }), w = x.circleTangency, A = x.lineTangency, P = x.theta, T = qo({
      cx: t,
      cy: r,
      radius: n,
      angle: l,
      sign: -c,
      isExternal: !0,
      cornerRadius: a,
      cornerIsExternal: u
    }), C = T.circleTangency, O = T.lineTangency, D = T.theta, j = u ? Math.abs(s - l) : Math.abs(s - l) - P - D;
    if (j < 0 && a === 0)
      return "".concat(_, "L").concat(t, ",").concat(r, "Z");
    _ += Qe(Z0 || (Z0 = On(["L", ",", `
      A`, ",", ",0,0,", ",", ",", `
      A`, ",", ",0,", ",", ",", ",", `
      A`, ",", ",0,0,", ",", ",", "Z"])), O.x, O.y, a, a, +(c < 0), C.x, C.y, n, n, +(j > 180), +(c > 0), w.x, w.y, a, a, +(c < 0), A.x, A.y);
  } else
    _ += Qe(Q0 || (Q0 = On(["L", ",", "Z"])), t, r);
  return _;
}, Yk = {
  cx: 0,
  cy: 0,
  innerRadius: 0,
  outerRadius: 0,
  startAngle: 0,
  endAngle: 0,
  cornerRadius: 0,
  forceCornerRadius: !1,
  cornerIsExternal: !1
}, mS = (e) => {
  var t = Vt(e, Yk), r = t.cx, n = t.cy, i = t.innerRadius, a = t.outerRadius, o = t.cornerRadius, u = t.forceCornerRadius, s = t.cornerIsExternal, l = t.startAngle, c = t.endAngle, f = t.className;
  if (a < i || l === c)
    return null;
  var d = ze("recharts-sector", f), h = a - i, p = mt(o, h, 0, !0), v;
  return p > 0 && Math.abs(l - c) < 360 ? v = Gk({
    cx: r,
    cy: n,
    innerRadius: i,
    outerRadius: a,
    cornerRadius: Math.min(p, h / 2),
    forceCornerRadius: u,
    cornerIsExternal: s,
    startAngle: l,
    endAngle: c
  }) : v = pS({
    cx: r,
    cy: n,
    innerRadius: i,
    outerRadius: a,
    startAngle: l,
    endAngle: c
  }), /* @__PURE__ */ S.createElement("path", Hv({}, sr(t), {
    className: d,
    d: v
  }));
};
function Xk(e, t, r) {
  if (e === "horizontal")
    return [{
      x: t.x,
      y: r.top
    }, {
      x: t.x,
      y: r.top + r.height
    }];
  if (e === "vertical")
    return [{
      x: r.left,
      y: t.y
    }, {
      x: r.left + r.width,
      y: t.y
    }];
  if (YA(t)) {
    if (e === "centric") {
      var n = t.cx, i = t.cy, a = t.innerRadius, o = t.outerRadius, u = t.angle, s = Le(n, i, a, u), l = Le(n, i, o, u);
      return [{
        x: s.x,
        y: s.y
      }, {
        x: l.x,
        y: l.y
      }];
    }
    return vS(t);
  }
}
function Zk(e) {
  return Ep(e) ? NaN : Number(e);
}
function Ec(e) {
  return e ? (e = Zk(e), e === 1 / 0 || e === -1 / 0 ? (e < 0 ? -1 : 1) * Number.MAX_VALUE : e === e ? e : 0) : e === 0 ? e : 0;
}
function yS(e, t, r) {
  r && typeof r != "number" && Iv(e, t, r) && (t = r = void 0), e = Ec(e), t === void 0 ? (t = e, e = 0) : t = Ec(t), r = r === void 0 ? e < t ? 1 : -1 : Ec(r);
  const n = Math.max(Math.ceil((t - e) / (r || 1)), 0), i = new Array(n);
  for (let a = 0; a < n; a++)
    i[a] = e, e += r;
  return i;
}
var hr = (e) => e.chartData, Rs = I([hr], (e) => {
  var t = e.chartData != null ? e.chartData.length - 1 : 0;
  return {
    chartData: e.chartData,
    computedData: e.computedData,
    dataEndIndex: t,
    dataStartIndex: 0
  };
}), $s = (e, t, r, n) => n ? Rs(e) : hr(e), Qk = I([$s], (e) => {
  var t = e.chartData, r = e.dataStartIndex, n = e.dataEndIndex;
  return t != null ? t.slice(r, n + 1) : [];
}), Jk = I([Rs], (e) => {
  var t = e.chartData, r = e.dataStartIndex, n = e.dataEndIndex;
  return t != null ? t.slice(r, n + 1) : [];
}), eM = I([hr], (e) => {
  var t = e.chartData, r = e.dataStartIndex, n = e.dataEndIndex;
  return t != null ? t.slice(r, n + 1) : [];
});
function Qp(e, t) {
  return iM(e) || nM(e, t) || rM(e, t) || tM();
}
function tM() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function rM(e, t) {
  if (e) {
    if (typeof e == "string") return J0(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? J0(e, t) : void 0;
  }
}
function J0(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function nM(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], s = !0, l = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(s = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (c) {
      l = !0, i = c;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function iM(e) {
  if (Array.isArray(e)) return e;
}
function ar(e) {
  if (Array.isArray(e) && e.length === 2) {
    var t = Qp(e, 2), r = t[0], n = t[1];
    if (_e(r) && _e(n))
      return !0;
  }
  return !1;
}
function eb(e, t, r) {
  return r ? e : [Math.min(e[0], t[0]), Math.max(e[1], t[1])];
}
function gS(e, t) {
  if (t && typeof e != "function" && Array.isArray(e) && e.length === 2) {
    var r = Qp(e, 2), n = r[0], i = r[1], a, o;
    if (_e(n))
      a = n;
    else if (typeof n == "function")
      return;
    if (_e(i))
      o = i;
    else if (typeof i == "function")
      return;
    var u = [a, o];
    if (ar(u))
      return u;
  }
}
function aM(e, t, r) {
  if (!(!r && t == null)) {
    if (typeof e == "function" && t != null)
      try {
        var n = e(t, r);
        if (ar(n))
          return eb(n, t, r);
      } catch {
      }
    if (Array.isArray(e) && e.length === 2) {
      var i = Qp(e, 2), a = i[0], o = i[1], u, s;
      if (a === "auto")
        t != null && (u = Math.min(...t));
      else if (G(a))
        u = a;
      else if (typeof a == "function")
        try {
          t != null && (u = a(t == null ? void 0 : t[0]));
        } catch {
        }
      else if (typeof a == "string" && Hg.test(a)) {
        var l = Hg.exec(a);
        if (l == null || l[1] == null || t == null)
          u = void 0;
        else {
          var c = +l[1];
          u = t[0] - c;
        }
      } else
        u = t == null ? void 0 : t[0];
      if (o === "auto")
        t != null && (s = Math.max(...t));
      else if (G(o))
        s = o;
      else if (typeof o == "function")
        try {
          t != null && (s = o(t == null ? void 0 : t[1]));
        } catch {
        }
      else if (typeof o == "string" && Kg.test(o)) {
        var f = Kg.exec(o);
        if (f == null || f[1] == null || t == null)
          s = void 0;
        else {
          var d = +f[1];
          s = t[1] + d;
        }
      } else
        s = t == null ? void 0 : t[1];
      var h = [u, s];
      if (ar(h))
        return t == null ? h : eb(h, t, r);
    }
  }
}
var $i = 1e9, oM = {
  // These values must be integers within the stated ranges (inclusive).
  // Most of these values can be changed during run-time using `Decimal.config`.
  // The maximum number of significant digits of the result of a calculation or base conversion.
  // E.g. `Decimal.config({ precision: 20 });`
  precision: 20,
  // 1 to MAX_DIGITS
  // The rounding mode used by default by `toInteger`, `toDecimalPlaces`, `toExponential`,
  // `toFixed`, `toPrecision` and `toSignificantDigits`.
  //
  // ROUND_UP         0 Away from zero.
  // ROUND_DOWN       1 Towards zero.
  // ROUND_CEIL       2 Towards +Infinity.
  // ROUND_FLOOR      3 Towards -Infinity.
  // ROUND_HALF_UP    4 Towards nearest neighbour. If equidistant, up.
  // ROUND_HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
  // ROUND_HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
  // ROUND_HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
  // ROUND_HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
  //
  // E.g.
  // `Decimal.rounding = 4;`
  // `Decimal.rounding = Decimal.ROUND_HALF_UP;`
  rounding: 4,
  // 0 to 8
  // The exponent value at and beneath which `toString` returns exponential notation.
  // JavaScript numbers: -7
  toExpNeg: -7,
  // 0 to -MAX_E
  // The exponent value at and above which `toString` returns exponential notation.
  // JavaScript numbers: 21
  toExpPos: 21,
  // 0 to MAX_E
  // The natural logarithm of 10.
  // 115 digits
  LN10: "2.302585092994045684017991454684364207601101488628772976033327900967572609677352480235997205089598298341967784042286"
}, em, ke = !0, Mt = "[DecimalError] ", In = Mt + "Invalid argument: ", Jp = Mt + "Exponent out of range: ", Di = Math.floor, bn = Math.pow, uM = /^(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i, vt, Ve = 1e7, Te = 7, bS = 9007199254740991, Mu = Di(bS / Te), V = {};
V.absoluteValue = V.abs = function() {
  var e = new this.constructor(this);
  return e.s && (e.s = 1), e;
};
V.comparedTo = V.cmp = function(e) {
  var t, r, n, i, a = this;
  if (e = new a.constructor(e), a.s !== e.s) return a.s || -e.s;
  if (a.e !== e.e) return a.e > e.e ^ a.s < 0 ? 1 : -1;
  for (n = a.d.length, i = e.d.length, t = 0, r = n < i ? n : i; t < r; ++t)
    if (a.d[t] !== e.d[t]) return a.d[t] > e.d[t] ^ a.s < 0 ? 1 : -1;
  return n === i ? 0 : n > i ^ a.s < 0 ? 1 : -1;
};
V.decimalPlaces = V.dp = function() {
  var e = this, t = e.d.length - 1, r = (t - e.e) * Te;
  if (t = e.d[t], t) for (; t % 10 == 0; t /= 10) r--;
  return r < 0 ? 0 : r;
};
V.dividedBy = V.div = function(e) {
  return Er(this, new this.constructor(e));
};
V.dividedToIntegerBy = V.idiv = function(e) {
  var t = this, r = t.constructor;
  return xe(Er(t, new r(e), 0, 1), r.precision);
};
V.equals = V.eq = function(e) {
  return !this.cmp(e);
};
V.exponent = function() {
  return qe(this);
};
V.greaterThan = V.gt = function(e) {
  return this.cmp(e) > 0;
};
V.greaterThanOrEqualTo = V.gte = function(e) {
  return this.cmp(e) >= 0;
};
V.isInteger = V.isint = function() {
  return this.e > this.d.length - 2;
};
V.isNegative = V.isneg = function() {
  return this.s < 0;
};
V.isPositive = V.ispos = function() {
  return this.s > 0;
};
V.isZero = function() {
  return this.s === 0;
};
V.lessThan = V.lt = function(e) {
  return this.cmp(e) < 0;
};
V.lessThanOrEqualTo = V.lte = function(e) {
  return this.cmp(e) < 1;
};
V.logarithm = V.log = function(e) {
  var t, r = this, n = r.constructor, i = n.precision, a = i + 5;
  if (e === void 0)
    e = new n(10);
  else if (e = new n(e), e.s < 1 || e.eq(vt)) throw Error(Mt + "NaN");
  if (r.s < 1) throw Error(Mt + (r.s ? "NaN" : "-Infinity"));
  return r.eq(vt) ? new n(0) : (ke = !1, t = Er($a(r, a), $a(e, a), a), ke = !0, xe(t, i));
};
V.minus = V.sub = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? xS(t, e) : _S(t, (e.s = -e.s, e));
};
V.modulo = V.mod = function(e) {
  var t, r = this, n = r.constructor, i = n.precision;
  if (e = new n(e), !e.s) throw Error(Mt + "NaN");
  return r.s ? (ke = !1, t = Er(r, e, 0, 1).times(e), ke = !0, r.minus(t)) : xe(new n(r), i);
};
V.naturalExponential = V.exp = function() {
  return wS(this);
};
V.naturalLogarithm = V.ln = function() {
  return $a(this);
};
V.negated = V.neg = function() {
  var e = new this.constructor(this);
  return e.s = -e.s || 0, e;
};
V.plus = V.add = function(e) {
  var t = this;
  return e = new t.constructor(e), t.s == e.s ? _S(t, e) : xS(t, (e.s = -e.s, e));
};
V.precision = V.sd = function(e) {
  var t, r, n, i = this;
  if (e !== void 0 && e !== !!e && e !== 1 && e !== 0) throw Error(In + e);
  if (t = qe(i) + 1, n = i.d.length - 1, r = n * Te + 1, n = i.d[n], n) {
    for (; n % 10 == 0; n /= 10) r--;
    for (n = i.d[0]; n >= 10; n /= 10) r++;
  }
  return e && t > r ? t : r;
};
V.squareRoot = V.sqrt = function() {
  var e, t, r, n, i, a, o, u = this, s = u.constructor;
  if (u.s < 1) {
    if (!u.s) return new s(0);
    throw Error(Mt + "NaN");
  }
  for (e = qe(u), ke = !1, i = Math.sqrt(+u), i == 0 || i == 1 / 0 ? (t = nr(u.d), (t.length + e) % 2 == 0 && (t += "0"), i = Math.sqrt(t), e = Di((e + 1) / 2) - (e < 0 || e % 2), i == 1 / 0 ? t = "5e" + e : (t = i.toExponential(), t = t.slice(0, t.indexOf("e") + 1) + e), n = new s(t)) : n = new s(i.toString()), r = s.precision, i = o = r + 3; ; )
    if (a = n, n = a.plus(Er(u, a, o + 2)).times(0.5), nr(a.d).slice(0, o) === (t = nr(n.d)).slice(0, o)) {
      if (t = t.slice(o - 3, o + 1), i == o && t == "4999") {
        if (xe(a, r + 1, 0), a.times(a).eq(u)) {
          n = a;
          break;
        }
      } else if (t != "9999")
        break;
      o += 4;
    }
  return ke = !0, xe(n, r);
};
V.times = V.mul = function(e) {
  var t, r, n, i, a, o, u, s, l, c = this, f = c.constructor, d = c.d, h = (e = new f(e)).d;
  if (!c.s || !e.s) return new f(0);
  for (e.s *= c.s, r = c.e + e.e, s = d.length, l = h.length, s < l && (a = d, d = h, h = a, o = s, s = l, l = o), a = [], o = s + l, n = o; n--; ) a.push(0);
  for (n = l; --n >= 0; ) {
    for (t = 0, i = s + n; i > n; )
      u = a[i] + h[n] * d[i - n - 1] + t, a[i--] = u % Ve | 0, t = u / Ve | 0;
    a[i] = (a[i] + t) % Ve | 0;
  }
  for (; !a[--o]; ) a.pop();
  return t ? ++r : a.shift(), e.d = a, e.e = r, ke ? xe(e, f.precision) : e;
};
V.toDecimalPlaces = V.todp = function(e, t) {
  var r = this, n = r.constructor;
  return r = new n(r), e === void 0 ? r : (lr(e, 0, $i), t === void 0 ? t = n.rounding : lr(t, 0, 8), xe(r, e + qe(r) + 1, t));
};
V.toExponential = function(e, t) {
  var r, n = this, i = n.constructor;
  return e === void 0 ? r = Dn(n, !0) : (lr(e, 0, $i), t === void 0 ? t = i.rounding : lr(t, 0, 8), n = xe(new i(n), e + 1, t), r = Dn(n, !0, e + 1)), r;
};
V.toFixed = function(e, t) {
  var r, n, i = this, a = i.constructor;
  return e === void 0 ? Dn(i) : (lr(e, 0, $i), t === void 0 ? t = a.rounding : lr(t, 0, 8), n = xe(new a(i), e + qe(i) + 1, t), r = Dn(n.abs(), !1, e + qe(n) + 1), i.isneg() && !i.isZero() ? "-" + r : r);
};
V.toInteger = V.toint = function() {
  var e = this, t = e.constructor;
  return xe(new t(e), qe(e) + 1, t.rounding);
};
V.toNumber = function() {
  return +this;
};
V.toPower = V.pow = function(e) {
  var t, r, n, i, a, o, u = this, s = u.constructor, l = 12, c = +(e = new s(e));
  if (!e.s) return new s(vt);
  if (u = new s(u), !u.s) {
    if (e.s < 1) throw Error(Mt + "Infinity");
    return u;
  }
  if (u.eq(vt)) return u;
  if (n = s.precision, e.eq(vt)) return xe(u, n);
  if (t = e.e, r = e.d.length - 1, o = t >= r, a = u.s, o) {
    if ((r = c < 0 ? -c : c) <= bS) {
      for (i = new s(vt), t = Math.ceil(n / Te + 4), ke = !1; r % 2 && (i = i.times(u), rb(i.d, t)), r = Di(r / 2), r !== 0; )
        u = u.times(u), rb(u.d, t);
      return ke = !0, e.s < 0 ? new s(vt).div(i) : xe(i, n);
    }
  } else if (a < 0) throw Error(Mt + "NaN");
  return a = a < 0 && e.d[Math.max(t, r)] & 1 ? -1 : 1, u.s = 1, ke = !1, i = e.times($a(u, n + l)), ke = !0, i = wS(i), i.s = a, i;
};
V.toPrecision = function(e, t) {
  var r, n, i = this, a = i.constructor;
  return e === void 0 ? (r = qe(i), n = Dn(i, r <= a.toExpNeg || r >= a.toExpPos)) : (lr(e, 1, $i), t === void 0 ? t = a.rounding : lr(t, 0, 8), i = xe(new a(i), e, t), r = qe(i), n = Dn(i, e <= r || r <= a.toExpNeg, e)), n;
};
V.toSignificantDigits = V.tosd = function(e, t) {
  var r = this, n = r.constructor;
  return e === void 0 ? (e = n.precision, t = n.rounding) : (lr(e, 1, $i), t === void 0 ? t = n.rounding : lr(t, 0, 8)), xe(new n(r), e, t);
};
V.toString = V.valueOf = V.val = V.toJSON = V[Symbol.for("nodejs.util.inspect.custom")] = function() {
  var e = this, t = qe(e), r = e.constructor;
  return Dn(e, t <= r.toExpNeg || t >= r.toExpPos);
};
function _S(e, t) {
  var r, n, i, a, o, u, s, l, c = e.constructor, f = c.precision;
  if (!e.s || !t.s)
    return t.s || (t = new c(e)), ke ? xe(t, f) : t;
  if (s = e.d, l = t.d, o = e.e, i = t.e, s = s.slice(), a = o - i, a) {
    for (a < 0 ? (n = s, a = -a, u = l.length) : (n = l, i = o, u = s.length), o = Math.ceil(f / Te), u = o > u ? o + 1 : u + 1, a > u && (a = u, n.length = 1), n.reverse(); a--; ) n.push(0);
    n.reverse();
  }
  for (u = s.length, a = l.length, u - a < 0 && (a = u, n = l, l = s, s = n), r = 0; a; )
    r = (s[--a] = s[a] + l[a] + r) / Ve | 0, s[a] %= Ve;
  for (r && (s.unshift(r), ++i), u = s.length; s[--u] == 0; ) s.pop();
  return t.d = s, t.e = i, ke ? xe(t, f) : t;
}
function lr(e, t, r) {
  if (e !== ~~e || e < t || e > r)
    throw Error(In + e);
}
function nr(e) {
  var t, r, n, i = e.length - 1, a = "", o = e[0];
  if (i > 0) {
    for (a += o, t = 1; t < i; t++)
      n = e[t] + "", r = Te - n.length, r && (a += Br(r)), a += n;
    o = e[t], n = o + "", r = Te - n.length, r && (a += Br(r));
  } else if (o === 0)
    return "0";
  for (; o % 10 === 0; ) o /= 10;
  return a + o;
}
var Er = /* @__PURE__ */ (function() {
  function e(n, i) {
    var a, o = 0, u = n.length;
    for (n = n.slice(); u--; )
      a = n[u] * i + o, n[u] = a % Ve | 0, o = a / Ve | 0;
    return o && n.unshift(o), n;
  }
  function t(n, i, a, o) {
    var u, s;
    if (a != o)
      s = a > o ? 1 : -1;
    else
      for (u = s = 0; u < a; u++)
        if (n[u] != i[u]) {
          s = n[u] > i[u] ? 1 : -1;
          break;
        }
    return s;
  }
  function r(n, i, a) {
    for (var o = 0; a--; )
      n[a] -= o, o = n[a] < i[a] ? 1 : 0, n[a] = o * Ve + n[a] - i[a];
    for (; !n[0] && n.length > 1; ) n.shift();
  }
  return function(n, i, a, o) {
    var u, s, l, c, f, d, h, p, v, m, y, b, g, _, x, w, A, P, T = n.constructor, C = n.s == i.s ? 1 : -1, O = n.d, D = i.d;
    if (!n.s) return new T(n);
    if (!i.s) throw Error(Mt + "Division by zero");
    for (s = n.e - i.e, A = D.length, x = O.length, h = new T(C), p = h.d = [], l = 0; D[l] == (O[l] || 0); ) ++l;
    if (D[l] > (O[l] || 0) && --s, a == null ? b = a = T.precision : o ? b = a + (qe(n) - qe(i)) + 1 : b = a, b < 0) return new T(0);
    if (b = b / Te + 2 | 0, l = 0, A == 1)
      for (c = 0, D = D[0], b++; (l < x || c) && b--; l++)
        g = c * Ve + (O[l] || 0), p[l] = g / D | 0, c = g % D | 0;
    else {
      for (c = Ve / (D[0] + 1) | 0, c > 1 && (D = e(D, c), O = e(O, c), A = D.length, x = O.length), _ = A, v = O.slice(0, A), m = v.length; m < A; ) v[m++] = 0;
      P = D.slice(), P.unshift(0), w = D[0], D[1] >= Ve / 2 && ++w;
      do
        c = 0, u = t(D, v, A, m), u < 0 ? (y = v[0], A != m && (y = y * Ve + (v[1] || 0)), c = y / w | 0, c > 1 ? (c >= Ve && (c = Ve - 1), f = e(D, c), d = f.length, m = v.length, u = t(f, v, d, m), u == 1 && (c--, r(f, A < d ? P : D, d))) : (c == 0 && (u = c = 1), f = D.slice()), d = f.length, d < m && f.unshift(0), r(v, f, m), u == -1 && (m = v.length, u = t(D, v, A, m), u < 1 && (c++, r(v, A < m ? P : D, m))), m = v.length) : u === 0 && (c++, v = [0]), p[l++] = c, u && v[0] ? v[m++] = O[_] || 0 : (v = [O[_]], m = 1);
      while ((_++ < x || v[0] !== void 0) && b--);
    }
    return p[0] || p.shift(), h.e = s, xe(h, o ? a + qe(h) + 1 : a);
  };
})();
function wS(e, t) {
  var r, n, i, a, o, u, s = 0, l = 0, c = e.constructor, f = c.precision;
  if (qe(e) > 16) throw Error(Jp + qe(e));
  if (!e.s) return new c(vt);
  for (ke = !1, u = f, o = new c(0.03125); e.abs().gte(0.1); )
    e = e.times(o), l += 5;
  for (n = Math.log(bn(2, l)) / Math.LN10 * 2 + 5 | 0, u += n, r = i = a = new c(vt), c.precision = u; ; ) {
    if (i = xe(i.times(e), u), r = r.times(++s), o = a.plus(Er(i, r, u)), nr(o.d).slice(0, u) === nr(a.d).slice(0, u)) {
      for (; l--; ) a = xe(a.times(a), u);
      return c.precision = f, t == null ? (ke = !0, xe(a, f)) : a;
    }
    a = o;
  }
}
function qe(e) {
  for (var t = e.e * Te, r = e.d[0]; r >= 10; r /= 10) t++;
  return t;
}
function Pc(e, t, r) {
  if (t > e.LN10.sd())
    throw ke = !0, r && (e.precision = r), Error(Mt + "LN10 precision limit exceeded");
  return xe(new e(e.LN10), t);
}
function Br(e) {
  for (var t = ""; e--; ) t += "0";
  return t;
}
function $a(e, t) {
  var r, n, i, a, o, u, s, l, c, f = 1, d = 10, h = e, p = h.d, v = h.constructor, m = v.precision;
  if (h.s < 1) throw Error(Mt + (h.s ? "NaN" : "-Infinity"));
  if (h.eq(vt)) return new v(0);
  if (t == null ? (ke = !1, l = m) : l = t, h.eq(10))
    return t == null && (ke = !0), Pc(v, l);
  if (l += d, v.precision = l, r = nr(p), n = r.charAt(0), a = qe(h), Math.abs(a) < 15e14) {
    for (; n < 7 && n != 1 || n == 1 && r.charAt(1) > 3; )
      h = h.times(e), r = nr(h.d), n = r.charAt(0), f++;
    a = qe(h), n > 1 ? (h = new v("0." + r), a++) : h = new v(n + "." + r.slice(1));
  } else
    return s = Pc(v, l + 2, m).times(a + ""), h = $a(new v(n + "." + r.slice(1)), l - d).plus(s), v.precision = m, t == null ? (ke = !0, xe(h, m)) : h;
  for (u = o = h = Er(h.minus(vt), h.plus(vt), l), c = xe(h.times(h), l), i = 3; ; ) {
    if (o = xe(o.times(c), l), s = u.plus(Er(o, new v(i), l)), nr(s.d).slice(0, l) === nr(u.d).slice(0, l))
      return u = u.times(2), a !== 0 && (u = u.plus(Pc(v, l + 2, m).times(a + ""))), u = Er(u, new v(f), l), v.precision = m, t == null ? (ke = !0, xe(u, m)) : u;
    u = s, i += 2;
  }
}
function tb(e, t) {
  var r, n, i;
  for ((r = t.indexOf(".")) > -1 && (t = t.replace(".", "")), (n = t.search(/e/i)) > 0 ? (r < 0 && (r = n), r += +t.slice(n + 1), t = t.substring(0, n)) : r < 0 && (r = t.length), n = 0; t.charCodeAt(n) === 48; ) ++n;
  for (i = t.length; t.charCodeAt(i - 1) === 48; ) --i;
  if (t = t.slice(n, i), t) {
    if (i -= n, r = r - n - 1, e.e = Di(r / Te), e.d = [], n = (r + 1) % Te, r < 0 && (n += Te), n < i) {
      for (n && e.d.push(+t.slice(0, n)), i -= Te; n < i; ) e.d.push(+t.slice(n, n += Te));
      t = t.slice(n), n = Te - t.length;
    } else
      n -= i;
    for (; n--; ) t += "0";
    if (e.d.push(+t), ke && (e.e > Mu || e.e < -Mu)) throw Error(Jp + r);
  } else
    e.s = 0, e.e = 0, e.d = [0];
  return e;
}
function xe(e, t, r) {
  var n, i, a, o, u, s, l, c, f = e.d;
  for (o = 1, a = f[0]; a >= 10; a /= 10) o++;
  if (n = t - o, n < 0)
    n += Te, i = t, l = f[c = 0];
  else {
    if (c = Math.ceil((n + 1) / Te), a = f.length, c >= a) return e;
    for (l = a = f[c], o = 1; a >= 10; a /= 10) o++;
    n %= Te, i = n - Te + o;
  }
  if (r !== void 0 && (a = bn(10, o - i - 1), u = l / a % 10 | 0, s = t < 0 || f[c + 1] !== void 0 || l % a, s = r < 4 ? (u || s) && (r == 0 || r == (e.s < 0 ? 3 : 2)) : u > 5 || u == 5 && (r == 4 || s || r == 6 && // Check whether the digit to the left of the rounding digit is odd.
  (n > 0 ? i > 0 ? l / bn(10, o - i) : 0 : f[c - 1]) % 10 & 1 || r == (e.s < 0 ? 8 : 7))), t < 1 || !f[0])
    return s ? (a = qe(e), f.length = 1, t = t - a - 1, f[0] = bn(10, (Te - t % Te) % Te), e.e = Di(-t / Te) || 0) : (f.length = 1, f[0] = e.e = e.s = 0), e;
  if (n == 0 ? (f.length = c, a = 1, c--) : (f.length = c + 1, a = bn(10, Te - n), f[c] = i > 0 ? (l / bn(10, o - i) % bn(10, i) | 0) * a : 0), s)
    for (; ; )
      if (c == 0) {
        (f[0] += a) == Ve && (f[0] = 1, ++e.e);
        break;
      } else {
        if (f[c] += a, f[c] != Ve) break;
        f[c--] = 0, a = 1;
      }
  for (n = f.length; f[--n] === 0; ) f.pop();
  if (ke && (e.e > Mu || e.e < -Mu))
    throw Error(Jp + qe(e));
  return e;
}
function xS(e, t) {
  var r, n, i, a, o, u, s, l, c, f, d = e.constructor, h = d.precision;
  if (!e.s || !t.s)
    return t.s ? t.s = -t.s : t = new d(e), ke ? xe(t, h) : t;
  if (s = e.d, f = t.d, n = t.e, l = e.e, s = s.slice(), o = l - n, o) {
    for (c = o < 0, c ? (r = s, o = -o, u = f.length) : (r = f, n = l, u = s.length), i = Math.max(Math.ceil(h / Te), u) + 2, o > i && (o = i, r.length = 1), r.reverse(), i = o; i--; ) r.push(0);
    r.reverse();
  } else {
    for (i = s.length, u = f.length, c = i < u, c && (u = i), i = 0; i < u; i++)
      if (s[i] != f[i]) {
        c = s[i] < f[i];
        break;
      }
    o = 0;
  }
  for (c && (r = s, s = f, f = r, t.s = -t.s), u = s.length, i = f.length - u; i > 0; --i) s[u++] = 0;
  for (i = f.length; i > o; ) {
    if (s[--i] < f[i]) {
      for (a = i; a && s[--a] === 0; ) s[a] = Ve - 1;
      --s[a], s[i] += Ve;
    }
    s[i] -= f[i];
  }
  for (; s[--u] === 0; ) s.pop();
  for (; s[0] === 0; s.shift()) --n;
  return s[0] ? (t.d = s, t.e = n, ke ? xe(t, h) : t) : new d(0);
}
function Dn(e, t, r) {
  var n, i = qe(e), a = nr(e.d), o = a.length;
  return t ? (r && (n = r - o) > 0 ? a = a.charAt(0) + "." + a.slice(1) + Br(n) : o > 1 && (a = a.charAt(0) + "." + a.slice(1)), a = a + (i < 0 ? "e" : "e+") + i) : i < 0 ? (a = "0." + Br(-i - 1) + a, r && (n = r - o) > 0 && (a += Br(n))) : i >= o ? (a += Br(i + 1 - o), r && (n = r - i - 1) > 0 && (a = a + "." + Br(n))) : ((n = i + 1) < o && (a = a.slice(0, n) + "." + a.slice(n)), r && (n = r - o) > 0 && (i + 1 === o && (a += "."), a += Br(n))), e.s < 0 ? "-" + a : a;
}
function rb(e, t) {
  if (e.length > t)
    return e.length = t, !0;
}
function AS(e) {
  var t, r, n;
  function i(a) {
    var o = this;
    if (!(o instanceof i)) return new i(a);
    if (o.constructor = i, a instanceof i) {
      o.s = a.s, o.e = a.e, o.d = (a = a.d) ? a.slice() : a;
      return;
    }
    if (typeof a == "number") {
      if (a * 0 !== 0)
        throw Error(In + a);
      if (a > 0)
        o.s = 1;
      else if (a < 0)
        a = -a, o.s = -1;
      else {
        o.s = 0, o.e = 0, o.d = [0];
        return;
      }
      if (a === ~~a && a < 1e7) {
        o.e = 0, o.d = [a];
        return;
      }
      return tb(o, a.toString());
    } else if (typeof a != "string")
      throw Error(In + a);
    if (a.charCodeAt(0) === 45 ? (a = a.slice(1), o.s = -1) : o.s = 1, uM.test(a)) tb(o, a);
    else throw Error(In + a);
  }
  if (i.prototype = V, i.ROUND_UP = 0, i.ROUND_DOWN = 1, i.ROUND_CEIL = 2, i.ROUND_FLOOR = 3, i.ROUND_HALF_UP = 4, i.ROUND_HALF_DOWN = 5, i.ROUND_HALF_EVEN = 6, i.ROUND_HALF_CEIL = 7, i.ROUND_HALF_FLOOR = 8, i.clone = AS, i.config = i.set = sM, e === void 0 && (e = {}), e)
    for (n = ["precision", "rounding", "toExpNeg", "toExpPos", "LN10"], t = 0; t < n.length; ) e.hasOwnProperty(r = n[t++]) || (e[r] = this[r]);
  return i.config(e), i;
}
function sM(e) {
  if (!e || typeof e != "object")
    throw Error(Mt + "Object expected");
  var t, r, n, i = [
    "precision",
    1,
    $i,
    "rounding",
    0,
    8,
    "toExpNeg",
    -1 / 0,
    0,
    "toExpPos",
    0,
    1 / 0
  ];
  for (t = 0; t < i.length; t += 3)
    if ((n = e[r = i[t]]) !== void 0)
      if (Di(n) === n && n >= i[t + 1] && n <= i[t + 2]) this[r] = n;
      else throw Error(In + r + ": " + n);
  if ((n = e[r = "LN10"]) !== void 0)
    if (n == Math.LN10) this[r] = new this(n);
    else throw Error(In + r + ": " + n);
  return this;
}
var em = AS(oM);
vt = new em(1);
const oe = em;
function OS(e) {
  var t;
  return e === 0 ? t = 1 : t = Math.floor(new oe(e).abs().log(10).toNumber()) + 1, t;
}
function SS(e, t, r) {
  for (var n = new oe(e), i = 0, a = []; n.lt(t) && i < 1e5; )
    a.push(n.toNumber()), n = n.add(r), i++;
  return a;
}
function Da(e, t) {
  return dM(e) || fM(e, t) || cM(e, t) || lM();
}
function lM() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function cM(e, t) {
  if (e) {
    if (typeof e == "string") return nb(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? nb(e, t) : void 0;
  }
}
function nb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function fM(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], s = !0, l = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(s = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (c) {
      l = !0, i = c;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function dM(e) {
  if (Array.isArray(e)) return e;
}
var ES = (e) => {
  var t = Da(e, 2), r = t[0], n = t[1], i = r, a = n;
  return r > n && (i = n, a = r), [i, a];
}, tm = (e, t, r) => {
  if (e.lte(0))
    return new oe(0);
  var n = OS(e.toNumber()), i = new oe(10).pow(n), a = e.div(i), o = n !== 1 ? 0.05 : 0.1, u = new oe(Math.ceil(a.div(o).toNumber())).add(r).mul(o), s = u.mul(i);
  return t ? new oe(s.toNumber()) : new oe(Math.ceil(s.toNumber()));
}, PS = (e, t, r) => {
  var n;
  if (e.lte(0))
    return new oe(0);
  var i = [1, 2, 2.5, 5], a = e.toNumber(), o = Math.floor(new oe(a).abs().log(10).toNumber()), u = new oe(10).pow(o), s = e.div(u).toNumber(), l = i.findIndex((h) => h >= s - 1e-10);
  if (l === -1 && (u = u.mul(10), l = 0), l += r, l >= i.length) {
    var c = Math.floor(l / i.length);
    l %= i.length, u = u.mul(new oe(10).pow(c));
  }
  var f = (n = i[l]) !== null && n !== void 0 ? n : 1, d = new oe(f).mul(u);
  return t ? d : new oe(Math.ceil(d.toNumber()));
}, hM = (e, t, r) => {
  var n = new oe(1), i = new oe(e);
  if (!i.isint() && r) {
    var a = Math.abs(e);
    a < 1 ? (n = new oe(10).pow(OS(e) - 1), i = new oe(Math.floor(i.div(n).toNumber())).mul(n)) : a > 1 && (i = new oe(Math.floor(e)));
  } else e === 0 ? i = new oe(Math.floor((t - 1) / 2)) : r || (i = new oe(Math.floor(e)));
  for (var o = Math.floor((t - 1) / 2), u = [], s = 0; s < t; s++)
    u.push(i.add(new oe(s - o).mul(n)).toNumber());
  return u;
}, TS = function(t, r, n, i) {
  var a = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : 0, o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : tm;
  if (!Number.isFinite((r - t) / (n - 1)))
    return {
      step: new oe(0),
      tickMin: new oe(0),
      tickMax: new oe(0)
    };
  var u = o(new oe(r).sub(t).div(n - 1), i, a), s;
  t <= 0 && r >= 0 ? s = new oe(0) : (s = new oe(t).add(r).div(2), s = s.sub(new oe(s).mod(u)));
  var l = Math.ceil(s.sub(t).div(u).toNumber()), c = Math.ceil(new oe(r).sub(s).div(u).toNumber()), f = l + c + 1;
  return f > n ? TS(t, r, n, i, a + 1, o) : (f < n && (c = r > 0 ? c + (n - f) : c, l = r > 0 ? l : l + (n - f)), {
    step: u,
    tickMin: s.sub(new oe(l).mul(u)),
    tickMax: s.add(new oe(c).mul(u))
  });
}, ib = function(t) {
  var r = Da(t, 2), n = r[0], i = r[1], a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 6, o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto", s = Math.max(a, 2), l = ES([n, i]), c = Da(l, 2), f = c[0], d = c[1];
  if (f === -1 / 0 || d === 1 / 0) {
    var h = d === 1 / 0 ? [f, ...Array(a - 1).fill(1 / 0)] : [...Array(a - 1).fill(-1 / 0), d];
    return n > i ? h.reverse() : h;
  }
  if (f === d)
    return hM(f, a, o);
  var p = u === "snap125" ? PS : tm, v = TS(f, d, s, o, 0, p), m = v.step, y = v.tickMin, b = v.tickMax, g = SS(y, b.add(new oe(0.1).mul(m)), m);
  return n > i ? g.reverse() : g;
}, ab = function(t, r) {
  var n = Da(t, 2), i = n[0], a = n[1], o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0, u = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "auto", s = ES([i, a]), l = Da(s, 2), c = l[0], f = l[1];
  if (c === -1 / 0 || f === 1 / 0)
    return [i, a];
  if (c === f)
    return [c];
  var d = u === "snap125" ? PS : tm, h = Math.max(r, 2), p = d(new oe(f).sub(c).div(h - 1), o, 0), v = [...SS(new oe(c), new oe(f), p), f];
  if (o === !1) {
    v = v.map((y) => Math.round(y));
    var m = v.length - 1;
    m > 0 && v[m] === v[m - 1] && (v = v.slice(0, m));
  }
  return i > a ? v.reverse() : v;
}, vM = (e) => e.rootProps.barCategoryGap, no = (e) => e.rootProps.stackOffset, CS = (e) => e.rootProps.reverseStackOrder, rm = (e) => e.options.chartName, nm = (e) => e.rootProps.syncId, IS = (e) => e.rootProps.syncMethod, im = (e) => e.options.eventEmitter, Bt = {
  /**
   * CartesianGrid and PolarGrid
   */
  grid: -100,
  /**
   * Background of Bar and RadialBar.
   * This is not visible by default but can be enabled by setting background={true} on Bar or RadialBar.
   */
  barBackground: -50,
  /*
   * other chart elements or custom elements without specific zIndex
   * render in here, at zIndex 0
   */
  /**
   * Area, Pie, Radar, and ReferenceArea
   */
  area: 100,
  /**
   * Cursor is embedded inside Tooltip and controlled by it.
   * The Tooltip itself has a separate portal and is not included in the zIndex system;
   * Cursor is the decoration inside the chart area. CursorRectangle is a rectangle box.
   * It renders below bar so that in a stacked bar chart the cursor rectangle does not hide the other bars.
   */
  cursorRectangle: 200,
  /**
   * Bar and RadialBar
   */
  bar: 300,
  /**
   * Line and ReferenceLine, and ErrorBor
   */
  line: 400,
  /**
   * XAxis and YAxis and PolarAngleAxis and PolarRadiusAxis ticks and lines and children
   */
  axis: 500,
  /**
   * Scatter and ReferenceDot,
   * and Dots of Line and Area and Radar if they have dot=true
   */
  scatter: 600,
  /**
   * Hovering over a Bar or RadialBar renders a highlight rectangle
   */
  activeBar: 1e3,
  /**
   * Cursor is embedded inside Tooltip and controlled by it.
   * The Tooltip itself has a separate portal and is not included in the zIndex system;
   * Cursor is the decoration inside the chart area, usually a cross or a box.
   * CursorLine is a line cursor rendered in Line, Area, Scatter, Radar charts.
   * It renders above the Line and Scatter so that it is always visible.
   * It renders below active dot so that the dot is always visible and shows the current point.
   * We're also assuming that the active dot is small enough that it does not fully cover the cursor line.
   *
   * This also applies to the radial cursor in RadialBarChart.
   */
  cursorLine: 1100,
  /**
   * Hovering over a Point in Line, Area, Scatter, Radar renders a highlight dot
   */
  activeDot: 1200,
  /**
   * LabelList and Label, including Axis labels
   */
  label: 2e3
}, vn = {
  allowDecimals: !1,
  // if I set this to false then Tooltip synchronisation stops working in Radar, wtf
  allowDataOverflow: !1,
  angleAxisId: 0,
  reversed: !1,
  scale: "auto",
  tick: !0,
  type: "auto"
}, Jt = {
  allowDataOverflow: !1,
  allowDecimals: !1,
  allowDuplicatedCategory: !0,
  includeHidden: !1,
  radiusAxisId: 0,
  reversed: !1,
  scale: "auto",
  tick: !0,
  tickCount: 5,
  type: "auto"
}, Ds = (e, t) => {
  if (!(!e || !t))
    return e != null && e.reversed ? [t[1], t[0]] : t;
};
function kS(e, t, r) {
  if (r !== "auto")
    return r;
  if (e != null)
    return rn(e, t) ? "category" : "number";
}
function ob(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Nu(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? ob(Object(r), !0).forEach(function(n) {
      pM(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ob(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function pM(e, t, r) {
  return (t = mM(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function mM(e) {
  var t = yM(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function yM(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ub = {
  allowDataOverflow: vn.allowDataOverflow,
  allowDecimals: vn.allowDecimals,
  allowDuplicatedCategory: !1,
  // defaultPolarAngleAxisProps.allowDuplicatedCategory has it set to true but the actual axis rendering ignores the prop because reasons,
  dataKey: void 0,
  domain: void 0,
  id: vn.angleAxisId,
  includeHidden: !1,
  name: void 0,
  reversed: vn.reversed,
  scale: vn.scale,
  tick: vn.tick,
  tickCount: void 0,
  ticks: void 0,
  type: vn.type,
  unit: void 0,
  niceTicks: "auto"
}, sb = {
  allowDataOverflow: Jt.allowDataOverflow,
  allowDecimals: Jt.allowDecimals,
  allowDuplicatedCategory: Jt.allowDuplicatedCategory,
  dataKey: void 0,
  domain: void 0,
  id: Jt.radiusAxisId,
  includeHidden: Jt.includeHidden,
  name: void 0,
  reversed: Jt.reversed,
  scale: Jt.scale,
  tick: Jt.tick,
  tickCount: Jt.tickCount,
  ticks: void 0,
  type: Jt.type,
  unit: void 0,
  niceTicks: "auto"
}, gM = (e, t) => {
  if (t != null)
    return e.polarAxis.angleAxis[t];
}, am = I([gM, Xp], (e, t) => {
  var r;
  if (e != null)
    return e;
  var n = (r = kS(t, "angleAxis", ub.type)) !== null && r !== void 0 ? r : "category";
  return Nu(Nu({}, ub), {}, {
    type: n
  });
}), bM = (e, t) => e.polarAxis.radiusAxis[t], om = I([bM, Xp], (e, t) => {
  var r;
  if (e != null)
    return e;
  var n = (r = kS(t, "radiusAxis", sb.type)) !== null && r !== void 0 ? r : "category";
  return Nu(Nu({}, sb), {}, {
    type: n
  });
}), js = (e) => e.polarOptions, um = I([fr, dr, Ge], hS), MS = I([js, um], (e, t) => {
  if (e != null)
    return mt(e.innerRadius, t, 0);
}), NS = I([js, um], (e, t) => {
  if (e != null)
    return mt(e.outerRadius, t, t * 0.8);
}), _M = (e) => {
  if (e == null)
    return [0, 0];
  var t = e.startAngle, r = e.endAngle;
  return [t, r];
}, RS = I([js], _M);
I([am, RS], Ds);
var $S = I([um, MS, NS], (e, t, r) => {
  if (!(e == null || t == null || r == null))
    return [t, r];
});
I([om, $S], Ds);
var DS = I([Me, js, MS, NS, fr, dr], (e, t, r, n, i, a) => {
  if (!(e !== "centric" && e !== "radial" || t == null || r == null || n == null)) {
    var o = t.cx, u = t.cy, s = t.startAngle, l = t.endAngle;
    return {
      cx: mt(o, i, i / 2),
      cy: mt(u, a, a / 2),
      innerRadius: r,
      outerRadius: n,
      startAngle: s,
      endAngle: l,
      clockWise: !1
      // this property look useful, why not use it?
    };
  }
}), Ne = (e, t) => t, io = (e, t, r) => r;
function jS(e) {
  return e == null ? void 0 : e.id;
}
function LS(e, t, r) {
  var n = t.chartData, i = n === void 0 ? [] : n, a = r.allowDuplicatedCategory, o = r.dataKey, u = /* @__PURE__ */ new Map();
  return e.forEach((s) => {
    var l, c = (l = s.data) !== null && l !== void 0 ? l : i;
    if (!(c == null || c.length === 0)) {
      var f = jS(s);
      c.forEach((d, h) => {
        var p = o == null || a ? h : String(Ie(d, o, null)), v = Ie(d, s.dataKey, 0), m;
        u.has(p) ? m = u.get(p) : m = {}, Object.assign(m, {
          [f]: v
        }), u.set(p, m);
      });
    }
  }), Array.from(u.values());
}
function sm(e) {
  return "stackId" in e && e.stackId != null && e.dataKey != null;
}
var ao = (e, t) => e === t ? !0 : e == null || t == null ? !1 : e[0] === t[0] && e[1] === t[1];
function Ls(e, t) {
  return Array.isArray(e) && Array.isArray(t) && e.length === 0 && t.length === 0 ? !0 : e === t;
}
function wM(e, t) {
  if (e.length === t.length) {
    for (var r = 0; r < e.length; r++)
      if (e[r] !== t[r])
        return !1;
    return !0;
  }
  return !1;
}
var Ye = (e) => {
  var t = Me(e);
  return t === "horizontal" ? "xAxis" : t === "vertical" ? "yAxis" : t === "centric" ? "angleAxis" : "radiusAxis";
}, ji = (e) => e.tooltip.settings.axisId;
function lm(e) {
  if (e != null) {
    var t = e.ticks, r = e.bandwidth, n = e.range(), i = [Math.min(...n), Math.max(...n)];
    return {
      domain: () => e.domain(),
      range: (function(a) {
        function o() {
          return a.apply(this, arguments);
        }
        return o.toString = function() {
          return a.toString();
        }, o;
      })(() => i),
      rangeMin: () => i[0],
      rangeMax: () => i[1],
      isInRange(a) {
        var o = i[0], u = i[1];
        return o <= u ? a >= o && a <= u : a >= u && a <= o;
      },
      bandwidth: r ? () => r.call(e) : void 0,
      ticks: t ? (a) => t.call(e, a) : void 0,
      map: (a, o) => {
        var u = e(a);
        if (u != null) {
          if (e.bandwidth && o !== null && o !== void 0 && o.position) {
            var s = e.bandwidth();
            switch (o.position) {
              case "middle":
                u += s / 2;
                break;
              case "end":
                u += s;
                break;
            }
          }
          return u;
        }
      }
    };
  }
}
var qS = (e, t) => {
  if (t != null)
    switch (e) {
      case "linear": {
        if (!ar(t)) {
          for (var r, n, i = 0; i < t.length; i++) {
            var a = t[i];
            _e(a) && ((r === void 0 || a < r) && (r = a), (n === void 0 || a > n) && (n = a));
          }
          return r !== void 0 && n !== void 0 ? [r, n] : void 0;
        }
        return t;
      }
      default:
        return t;
    }
};
function oo(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function cm(e) {
  let t = e, r = e;
  e.length === 1 && (t = (o, u) => e(o) - u, r = xM(e));
  function n(o, u, s, l) {
    for (s == null && (s = 0), l == null && (l = o.length); s < l; ) {
      const c = s + l >>> 1;
      r(o[c], u) < 0 ? s = c + 1 : l = c;
    }
    return s;
  }
  function i(o, u, s, l) {
    for (s == null && (s = 0), l == null && (l = o.length); s < l; ) {
      const c = s + l >>> 1;
      r(o[c], u) > 0 ? l = c : s = c + 1;
    }
    return s;
  }
  function a(o, u, s, l) {
    s == null && (s = 0), l == null && (l = o.length);
    const c = n(o, u, s, l - 1);
    return c > s && t(o[c - 1], u) > -t(o[c], u) ? c - 1 : c;
  }
  return { left: n, center: a, right: i };
}
function xM(e) {
  return (t, r) => oo(e(t), r);
}
function zS(e) {
  return e === null ? NaN : +e;
}
function* AM(e, t) {
  for (let r of e)
    r != null && (r = +r) >= r && (yield r);
}
const OM = cm(oo), uo = OM.right;
cm(zS).center;
class lb extends Map {
  constructor(t, r = PM) {
    if (super(), Object.defineProperties(this, { _intern: { value: /* @__PURE__ */ new Map() }, _key: { value: r } }), t != null) for (const [n, i] of t) this.set(n, i);
  }
  get(t) {
    return super.get(cb(this, t));
  }
  has(t) {
    return super.has(cb(this, t));
  }
  set(t, r) {
    return super.set(SM(this, t), r);
  }
  delete(t) {
    return super.delete(EM(this, t));
  }
}
function cb({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : r;
}
function SM({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) ? e.get(n) : (e.set(n, r), r);
}
function EM({ _intern: e, _key: t }, r) {
  const n = t(r);
  return e.has(n) && (r = e.get(r), e.delete(n)), r;
}
function PM(e) {
  return e !== null && typeof e == "object" ? e.valueOf() : e;
}
var Kv = Math.sqrt(50), Gv = Math.sqrt(10), Yv = Math.sqrt(2);
function Xv(e, t, r) {
  var n, i = -1, a, o, u;
  if (t = +t, e = +e, r = +r, e === t && r > 0) return [e];
  if ((n = t < e) && (a = e, e = t, t = a), (u = FS(e, t, r)) === 0 || !isFinite(u)) return [];
  if (u > 0) {
    let s = Math.round(e / u), l = Math.round(t / u);
    for (s * u < e && ++s, l * u > t && --l, o = new Array(a = l - s + 1); ++i < a; ) o[i] = (s + i) * u;
  } else {
    u = -u;
    let s = Math.round(e * u), l = Math.round(t * u);
    for (s / u < e && ++s, l / u > t && --l, o = new Array(a = l - s + 1); ++i < a; ) o[i] = (s + i) / u;
  }
  return n && o.reverse(), o;
}
function FS(e, t, r) {
  var n = (t - e) / Math.max(0, r), i = Math.floor(Math.log(n) / Math.LN10), a = n / Math.pow(10, i);
  return i >= 0 ? (a >= Kv ? 10 : a >= Gv ? 5 : a >= Yv ? 2 : 1) * Math.pow(10, i) : -Math.pow(10, -i) / (a >= Kv ? 10 : a >= Gv ? 5 : a >= Yv ? 2 : 1);
}
function Zv(e, t, r) {
  var n = Math.abs(t - e) / Math.max(0, r), i = Math.pow(10, Math.floor(Math.log(n) / Math.LN10)), a = n / i;
  return a >= Kv ? i *= 10 : a >= Gv ? i *= 5 : a >= Yv && (i *= 2), t < e ? -i : i;
}
function Ru(e, t) {
  let r;
  if (t === void 0)
    for (const n of e)
      n != null && (r < n || r === void 0 && n >= n) && (r = n);
  else {
    let n = -1;
    for (let i of e)
      (i = t(i, ++n, e)) != null && (r < i || r === void 0 && i >= i) && (r = i);
  }
  return r;
}
function $u(e, t) {
  let r;
  if (t === void 0)
    for (const n of e)
      n != null && (r > n || r === void 0 && n >= n) && (r = n);
  else {
    let n = -1;
    for (let i of e)
      (i = t(i, ++n, e)) != null && (r > i || r === void 0 && i >= i) && (r = i);
  }
  return r;
}
function BS(e, t, r = 0, n = e.length - 1, i = oo) {
  for (; n > r; ) {
    if (n - r > 600) {
      const s = n - r + 1, l = t - r + 1, c = Math.log(s), f = 0.5 * Math.exp(2 * c / 3), d = 0.5 * Math.sqrt(c * f * (s - f) / s) * (l - s / 2 < 0 ? -1 : 1), h = Math.max(r, Math.floor(t - l * f / s + d)), p = Math.min(n, Math.floor(t + (s - l) * f / s + d));
      BS(e, t, h, p, i);
    }
    const a = e[t];
    let o = r, u = n;
    for (ta(e, r, t), i(e[n], a) > 0 && ta(e, r, n); o < u; ) {
      for (ta(e, o, u), ++o, --u; i(e[o], a) < 0; ) ++o;
      for (; i(e[u], a) > 0; ) --u;
    }
    i(e[r], a) === 0 ? ta(e, r, u) : (++u, ta(e, u, n)), u <= t && (r = u + 1), t <= u && (n = u - 1);
  }
  return e;
}
function ta(e, t, r) {
  const n = e[t];
  e[t] = e[r], e[r] = n;
}
function TM(e, t, r) {
  if (e = Float64Array.from(AM(e)), !!(n = e.length)) {
    if ((t = +t) <= 0 || n < 2) return $u(e);
    if (t >= 1) return Ru(e);
    var n, i = (n - 1) * t, a = Math.floor(i), o = Ru(BS(e, a).subarray(0, a + 1)), u = $u(e.subarray(a + 1));
    return o + (u - o) * (i - a);
  }
}
function CM(e, t, r = zS) {
  if (n = e.length) {
    if ((t = +t) <= 0 || n < 2) return +r(e[0], 0, e);
    if (t >= 1) return +r(e[n - 1], n - 1, e);
    var n, i = (n - 1) * t, a = Math.floor(i), o = +r(e[a], a, e), u = +r(e[a + 1], a + 1, e);
    return o + (u - o) * (i - a);
  }
}
function IM(e, t, r) {
  e = +e, t = +t, r = (i = arguments.length) < 2 ? (t = e, e = 0, 1) : i < 3 ? 1 : +r;
  for (var n = -1, i = Math.max(0, Math.ceil((t - e) / r)) | 0, a = new Array(i); ++n < i; )
    a[n] = e + n * r;
  return a;
}
function Tc(e, t) {
  let r = 0;
  if (t === void 0)
    for (let n of e)
      (n = +n) && (r += n);
  else {
    let n = -1;
    for (let i of e)
      (i = +t(i, ++n, e)) && (r += i);
  }
  return r;
}
function Rt(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(e);
      break;
    default:
      this.range(t).domain(e);
      break;
  }
  return this;
}
function Mr(e, t) {
  switch (arguments.length) {
    case 0:
      break;
    case 1: {
      typeof e == "function" ? this.interpolator(e) : this.range(e);
      break;
    }
    default: {
      this.domain(e), typeof t == "function" ? this.interpolator(t) : this.range(t);
      break;
    }
  }
  return this;
}
const Qv = Symbol("implicit");
function Vr() {
  var e = new lb(), t = [], r = [], n = Qv;
  function i(a) {
    let o = e.get(a);
    if (o === void 0) {
      if (n !== Qv) return n;
      e.set(a, o = t.push(a) - 1);
    }
    return r[o % r.length];
  }
  return i.domain = function(a) {
    if (!arguments.length) return t.slice();
    t = [], e = new lb();
    for (const o of a)
      e.has(o) || e.set(o, t.push(o) - 1);
    return i;
  }, i.range = function(a) {
    return arguments.length ? (r = Array.from(a), i) : r.slice();
  }, i.unknown = function(a) {
    return arguments.length ? (n = a, i) : n;
  }, i.copy = function() {
    return Vr(t, r).unknown(n);
  }, Rt.apply(i, arguments), i;
}
function fm() {
  var e = Vr().unknown(void 0), t = e.domain, r = e.range, n = 0, i = 1, a, o, u = !1, s = 0, l = 0, c = 0.5;
  delete e.unknown;
  function f() {
    var d = t().length, h = i < n, p = h ? i : n, v = h ? n : i;
    a = (v - p) / Math.max(1, d - s + l * 2), u && (a = Math.floor(a)), p += (v - p - a * (d - s)) * c, o = a * (1 - s), u && (p = Math.round(p), o = Math.round(o));
    var m = IM(d).map(function(y) {
      return p + a * y;
    });
    return r(h ? m.reverse() : m);
  }
  return e.domain = function(d) {
    return arguments.length ? (t(d), f()) : t();
  }, e.range = function(d) {
    return arguments.length ? ([n, i] = d, n = +n, i = +i, f()) : [n, i];
  }, e.rangeRound = function(d) {
    return [n, i] = d, n = +n, i = +i, u = !0, f();
  }, e.bandwidth = function() {
    return o;
  }, e.step = function() {
    return a;
  }, e.round = function(d) {
    return arguments.length ? (u = !!d, f()) : u;
  }, e.padding = function(d) {
    return arguments.length ? (s = Math.min(1, l = +d), f()) : s;
  }, e.paddingInner = function(d) {
    return arguments.length ? (s = Math.min(1, d), f()) : s;
  }, e.paddingOuter = function(d) {
    return arguments.length ? (l = +d, f()) : l;
  }, e.align = function(d) {
    return arguments.length ? (c = Math.max(0, Math.min(1, d)), f()) : c;
  }, e.copy = function() {
    return fm(t(), [n, i]).round(u).paddingInner(s).paddingOuter(l).align(c);
  }, Rt.apply(f(), arguments);
}
function WS(e) {
  var t = e.copy;
  return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
    return WS(t());
  }, e;
}
function kM() {
  return WS(fm.apply(null, arguments).paddingInner(1));
}
function qs(e, t, r) {
  e.prototype = t.prototype = r, r.constructor = e;
}
function dm(e, t) {
  var r = Object.create(e.prototype);
  for (var n in t) r[n] = t[n];
  return r;
}
function Li() {
}
var jn = 0.7, Si = 1 / jn, mi = "\\s*([+-]?\\d+)\\s*", ja = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", or = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", MM = /^#([0-9a-f]{3,8})$/, NM = new RegExp(`^rgb\\(${mi},${mi},${mi}\\)$`), RM = new RegExp(`^rgb\\(${or},${or},${or}\\)$`), $M = new RegExp(`^rgba\\(${mi},${mi},${mi},${ja}\\)$`), DM = new RegExp(`^rgba\\(${or},${or},${or},${ja}\\)$`), jM = new RegExp(`^hsl\\(${ja},${or},${or}\\)$`), LM = new RegExp(`^hsla\\(${ja},${or},${or},${ja}\\)$`), fb = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
qs(Li, La, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: db,
  // Deprecated! Use color.formatHex.
  formatHex: db,
  formatHex8: qM,
  formatHsl: zM,
  formatRgb: hb,
  toString: hb
});
function db() {
  return this.rgb().formatHex();
}
function qM() {
  return this.rgb().formatHex8();
}
function zM() {
  return VS(this).formatHsl();
}
function hb() {
  return this.rgb().formatRgb();
}
function La(e) {
  var t, r;
  return e = (e + "").trim().toLowerCase(), (t = MM.exec(e)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? vb(t) : r === 3 ? new rt(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? zo(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? zo(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = NM.exec(e)) ? new rt(t[1], t[2], t[3], 1) : (t = RM.exec(e)) ? new rt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = $M.exec(e)) ? zo(t[1], t[2], t[3], t[4]) : (t = DM.exec(e)) ? zo(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = jM.exec(e)) ? yb(t[1], t[2] / 100, t[3] / 100, 1) : (t = LM.exec(e)) ? yb(t[1], t[2] / 100, t[3] / 100, t[4]) : fb.hasOwnProperty(e) ? vb(fb[e]) : e === "transparent" ? new rt(NaN, NaN, NaN, 0) : null;
}
function vb(e) {
  return new rt(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function zo(e, t, r, n) {
  return n <= 0 && (e = t = r = NaN), new rt(e, t, r, n);
}
function US(e) {
  return e instanceof Li || (e = La(e)), e ? (e = e.rgb(), new rt(e.r, e.g, e.b, e.opacity)) : new rt();
}
function Ei(e, t, r, n) {
  return arguments.length === 1 ? US(e) : new rt(e, t, r, n ?? 1);
}
function rt(e, t, r, n) {
  this.r = +e, this.g = +t, this.b = +r, this.opacity = +n;
}
qs(rt, Ei, dm(Li, {
  brighter(e) {
    return e = e == null ? Si : Math.pow(Si, e), new rt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? jn : Math.pow(jn, e), new rt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new rt(kn(this.r), kn(this.g), kn(this.b), Du(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: pb,
  // Deprecated! Use color.formatHex.
  formatHex: pb,
  formatHex8: FM,
  formatRgb: mb,
  toString: mb
}));
function pb() {
  return `#${Sn(this.r)}${Sn(this.g)}${Sn(this.b)}`;
}
function FM() {
  return `#${Sn(this.r)}${Sn(this.g)}${Sn(this.b)}${Sn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function mb() {
  const e = Du(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${kn(this.r)}, ${kn(this.g)}, ${kn(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Du(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function kn(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Sn(e) {
  return e = kn(e), (e < 16 ? "0" : "") + e.toString(16);
}
function yb(e, t, r, n) {
  return n <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Ft(e, t, r, n);
}
function VS(e) {
  if (e instanceof Ft) return new Ft(e.h, e.s, e.l, e.opacity);
  if (e instanceof Li || (e = La(e)), !e) return new Ft();
  if (e instanceof Ft) return e;
  e = e.rgb();
  var t = e.r / 255, r = e.g / 255, n = e.b / 255, i = Math.min(t, r, n), a = Math.max(t, r, n), o = NaN, u = a - i, s = (a + i) / 2;
  return u ? (t === a ? o = (r - n) / u + (r < n) * 6 : r === a ? o = (n - t) / u + 2 : o = (t - r) / u + 4, u /= s < 0.5 ? a + i : 2 - a - i, o *= 60) : u = s > 0 && s < 1 ? 0 : o, new Ft(o, u, s, e.opacity);
}
function BM(e, t, r, n) {
  return arguments.length === 1 ? VS(e) : new Ft(e, t, r, n ?? 1);
}
function Ft(e, t, r, n) {
  this.h = +e, this.s = +t, this.l = +r, this.opacity = +n;
}
qs(Ft, BM, dm(Li, {
  brighter(e) {
    return e = e == null ? Si : Math.pow(Si, e), new Ft(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? jn : Math.pow(jn, e), new Ft(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, n = r + (r < 0.5 ? r : 1 - r) * t, i = 2 * r - n;
    return new rt(
      Cc(e >= 240 ? e - 240 : e + 120, i, n),
      Cc(e, i, n),
      Cc(e < 120 ? e + 240 : e - 120, i, n),
      this.opacity
    );
  },
  clamp() {
    return new Ft(gb(this.h), Fo(this.s), Fo(this.l), Du(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Du(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${gb(this.h)}, ${Fo(this.s) * 100}%, ${Fo(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function gb(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Fo(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Cc(e, t, r) {
  return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255;
}
const WM = Math.PI / 180, UM = 180 / Math.PI;
var HS = -0.14861, hm = 1.78277, vm = -0.29227, zs = -0.90649, qa = 1.97294, bb = qa * zs, _b = qa * hm, wb = hm * vm - zs * HS;
function VM(e) {
  if (e instanceof Mn) return new Mn(e.h, e.s, e.l, e.opacity);
  e instanceof rt || (e = US(e));
  var t = e.r / 255, r = e.g / 255, n = e.b / 255, i = (wb * n + bb * t - _b * r) / (wb + bb - _b), a = n - i, o = (qa * (r - i) - vm * a) / zs, u = Math.sqrt(o * o + a * a) / (qa * i * (1 - i)), s = u ? Math.atan2(o, a) * UM - 120 : NaN;
  return new Mn(s < 0 ? s + 360 : s, u, i, e.opacity);
}
function cr(e, t, r, n) {
  return arguments.length === 1 ? VM(e) : new Mn(e, t, r, n ?? 1);
}
function Mn(e, t, r, n) {
  this.h = +e, this.s = +t, this.l = +r, this.opacity = +n;
}
qs(Mn, cr, dm(Li, {
  brighter(e) {
    return e = e == null ? Si : Math.pow(Si, e), new Mn(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? jn : Math.pow(jn, e), new Mn(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = isNaN(this.h) ? 0 : (this.h + 120) * WM, t = +this.l, r = isNaN(this.s) ? 0 : this.s * t * (1 - t), n = Math.cos(e), i = Math.sin(e);
    return new rt(
      255 * (t + r * (HS * n + hm * i)),
      255 * (t + r * (vm * n + zs * i)),
      255 * (t + r * (qa * n)),
      this.opacity
    );
  }
}));
function HM(e, t, r, n, i) {
  var a = e * e, o = a * e;
  return ((1 - 3 * e + 3 * a - o) * t + (4 - 6 * a + 3 * o) * r + (1 + 3 * e + 3 * a - 3 * o) * n + o * i) / 6;
}
function KM(e) {
  var t = e.length - 1;
  return function(r) {
    var n = r <= 0 ? r = 0 : r >= 1 ? (r = 1, t - 1) : Math.floor(r * t), i = e[n], a = e[n + 1], o = n > 0 ? e[n - 1] : 2 * i - a, u = n < t - 1 ? e[n + 2] : 2 * a - i;
    return HM((r - n / t) * t, o, i, a, u);
  };
}
const Fs = (e) => () => e;
function KS(e, t) {
  return function(r) {
    return e + r * t;
  };
}
function GM(e, t, r) {
  return e = Math.pow(e, r), t = Math.pow(t, r) - e, r = 1 / r, function(n) {
    return Math.pow(e + n * t, r);
  };
}
function YM(e, t) {
  var r = t - e;
  return r ? KS(e, r > 180 || r < -180 ? r - 360 * Math.round(r / 360) : r) : Fs(isNaN(e) ? t : e);
}
function XM(e) {
  return (e = +e) == 1 ? yi : function(t, r) {
    return r - t ? GM(t, r, e) : Fs(isNaN(t) ? r : t);
  };
}
function yi(e, t) {
  var r = t - e;
  return r ? KS(e, r) : Fs(isNaN(e) ? t : e);
}
const xb = (function e(t) {
  var r = XM(t);
  function n(i, a) {
    var o = r((i = Ei(i)).r, (a = Ei(a)).r), u = r(i.g, a.g), s = r(i.b, a.b), l = yi(i.opacity, a.opacity);
    return function(c) {
      return i.r = o(c), i.g = u(c), i.b = s(c), i.opacity = l(c), i + "";
    };
  }
  return n.gamma = e, n;
})(1);
function ZM(e) {
  return function(t) {
    var r = t.length, n = new Array(r), i = new Array(r), a = new Array(r), o, u;
    for (o = 0; o < r; ++o)
      u = Ei(t[o]), n[o] = u.r || 0, i[o] = u.g || 0, a[o] = u.b || 0;
    return n = e(n), i = e(i), a = e(a), u.opacity = 1, function(s) {
      return u.r = n(s), u.g = i(s), u.b = a(s), u + "";
    };
  };
}
var QM = ZM(KM);
function JM(e, t) {
  t || (t = []);
  var r = e ? Math.min(t.length, e.length) : 0, n = t.slice(), i;
  return function(a) {
    for (i = 0; i < r; ++i) n[i] = e[i] * (1 - a) + t[i] * a;
    return n;
  };
}
function e9(e) {
  return ArrayBuffer.isView(e) && !(e instanceof DataView);
}
function t9(e, t) {
  var r = t ? t.length : 0, n = e ? Math.min(r, e.length) : 0, i = new Array(n), a = new Array(r), o;
  for (o = 0; o < n; ++o) i[o] = qi(e[o], t[o]);
  for (; o < r; ++o) a[o] = t[o];
  return function(u) {
    for (o = 0; o < n; ++o) a[o] = i[o](u);
    return a;
  };
}
function r9(e, t) {
  var r = /* @__PURE__ */ new Date();
  return e = +e, t = +t, function(n) {
    return r.setTime(e * (1 - n) + t * n), r;
  };
}
function ju(e, t) {
  return e = +e, t = +t, function(r) {
    return e * (1 - r) + t * r;
  };
}
function n9(e, t) {
  var r = {}, n = {}, i;
  (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
  for (i in t)
    i in e ? r[i] = qi(e[i], t[i]) : n[i] = t[i];
  return function(a) {
    for (i in r) n[i] = r[i](a);
    return n;
  };
}
var Jv = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, Ic = new RegExp(Jv.source, "g");
function i9(e) {
  return function() {
    return e;
  };
}
function a9(e) {
  return function(t) {
    return e(t) + "";
  };
}
function GS(e, t) {
  var r = Jv.lastIndex = Ic.lastIndex = 0, n, i, a, o = -1, u = [], s = [];
  for (e = e + "", t = t + ""; (n = Jv.exec(e)) && (i = Ic.exec(t)); )
    (a = i.index) > r && (a = t.slice(r, a), u[o] ? u[o] += a : u[++o] = a), (n = n[0]) === (i = i[0]) ? u[o] ? u[o] += i : u[++o] = i : (u[++o] = null, s.push({ i: o, x: ju(n, i) })), r = Ic.lastIndex;
  return r < t.length && (a = t.slice(r), u[o] ? u[o] += a : u[++o] = a), u.length < 2 ? s[0] ? a9(s[0].x) : i9(t) : (t = s.length, function(l) {
    for (var c = 0, f; c < t; ++c) u[(f = s[c]).i] = f.x(l);
    return u.join("");
  });
}
function qi(e, t) {
  var r = typeof t, n;
  return t == null || r === "boolean" ? Fs(t) : (r === "number" ? ju : r === "string" ? (n = La(t)) ? (t = n, xb) : GS : t instanceof La ? xb : t instanceof Date ? r9 : e9(t) ? JM : Array.isArray(t) ? t9 : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? n9 : ju)(e, t);
}
function pm(e, t) {
  return e = +e, t = +t, function(r) {
    return Math.round(e * (1 - r) + t * r);
  };
}
function YS(e) {
  return (function t(r) {
    r = +r;
    function n(i, a) {
      var o = e((i = cr(i)).h, (a = cr(a)).h), u = yi(i.s, a.s), s = yi(i.l, a.l), l = yi(i.opacity, a.opacity);
      return function(c) {
        return i.h = o(c), i.s = u(c), i.l = s(Math.pow(c, r)), i.opacity = l(c), i + "";
      };
    }
    return n.gamma = t, n;
  })(1);
}
YS(YM);
var mm = YS(yi);
function o9(e, t) {
  t === void 0 && (t = e, e = qi);
  for (var r = 0, n = t.length - 1, i = t[0], a = new Array(n < 0 ? 0 : n); r < n; ) a[r] = e(i, i = t[++r]);
  return function(o) {
    var u = Math.max(0, Math.min(n - 1, Math.floor(o *= n)));
    return a[u](o - u);
  };
}
function u9(e) {
  return function() {
    return e;
  };
}
function Lu(e) {
  return +e;
}
var Ab = [0, 1];
function st(e) {
  return e;
}
function ep(e, t) {
  return (t -= e = +e) ? function(r) {
    return (r - e) / t;
  } : u9(isNaN(t) ? NaN : 0.5);
}
function s9(e, t) {
  var r;
  return e > t && (r = e, e = t, t = r), function(n) {
    return Math.max(e, Math.min(t, n));
  };
}
function l9(e, t, r) {
  var n = e[0], i = e[1], a = t[0], o = t[1];
  return i < n ? (n = ep(i, n), a = r(o, a)) : (n = ep(n, i), a = r(a, o)), function(u) {
    return a(n(u));
  };
}
function c9(e, t, r) {
  var n = Math.min(e.length, t.length) - 1, i = new Array(n), a = new Array(n), o = -1;
  for (e[n] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++o < n; )
    i[o] = ep(e[o], e[o + 1]), a[o] = r(t[o], t[o + 1]);
  return function(u) {
    var s = uo(e, u, 1, n) - 1;
    return a[s](i[s](u));
  };
}
function so(e, t) {
  return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
}
function Bs() {
  var e = Ab, t = Ab, r = qi, n, i, a, o = st, u, s, l;
  function c() {
    var d = Math.min(e.length, t.length);
    return o !== st && (o = s9(e[0], e[d - 1])), u = d > 2 ? c9 : l9, s = l = null, f;
  }
  function f(d) {
    return d == null || isNaN(d = +d) ? a : (s || (s = u(e.map(n), t, r)))(n(o(d)));
  }
  return f.invert = function(d) {
    return o(i((l || (l = u(t, e.map(n), ju)))(d)));
  }, f.domain = function(d) {
    return arguments.length ? (e = Array.from(d, Lu), c()) : e.slice();
  }, f.range = function(d) {
    return arguments.length ? (t = Array.from(d), c()) : t.slice();
  }, f.rangeRound = function(d) {
    return t = Array.from(d), r = pm, c();
  }, f.clamp = function(d) {
    return arguments.length ? (o = d ? !0 : st, c()) : o !== st;
  }, f.interpolate = function(d) {
    return arguments.length ? (r = d, c()) : r;
  }, f.unknown = function(d) {
    return arguments.length ? (a = d, f) : a;
  }, function(d, h) {
    return n = d, i = h, c();
  };
}
function ym() {
  return Bs()(st, st);
}
function f9(e) {
  return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
}
function qu(e, t) {
  if ((r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e")) < 0) return null;
  var r, n = e.slice(0, r);
  return [
    n.length > 1 ? n[0] + n.slice(2) : n,
    +e.slice(r + 1)
  ];
}
function Pi(e) {
  return e = qu(Math.abs(e)), e ? e[1] : NaN;
}
function d9(e, t) {
  return function(r, n) {
    for (var i = r.length, a = [], o = 0, u = e[0], s = 0; i > 0 && u > 0 && (s + u + 1 > n && (u = Math.max(1, n - s)), a.push(r.substring(i -= u, i + u)), !((s += u + 1) > n)); )
      u = e[o = (o + 1) % e.length];
    return a.reverse().join(t);
  };
}
function h9(e) {
  return function(t) {
    return t.replace(/[0-9]/g, function(r) {
      return e[+r];
    });
  };
}
var v9 = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function za(e) {
  if (!(t = v9.exec(e))) throw new Error("invalid format: " + e);
  var t;
  return new gm({
    fill: t[1],
    align: t[2],
    sign: t[3],
    symbol: t[4],
    zero: t[5],
    width: t[6],
    comma: t[7],
    precision: t[8] && t[8].slice(1),
    trim: t[9],
    type: t[10]
  });
}
za.prototype = gm.prototype;
function gm(e) {
  this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
}
gm.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function p9(e) {
  e: for (var t = e.length, r = 1, n = -1, i; r < t; ++r)
    switch (e[r]) {
      case ".":
        n = i = r;
        break;
      case "0":
        n === 0 && (n = r), i = r;
        break;
      default:
        if (!+e[r]) break e;
        n > 0 && (n = 0);
        break;
    }
  return n > 0 ? e.slice(0, n) + e.slice(i + 1) : e;
}
var XS;
function m9(e, t) {
  var r = qu(e, t);
  if (!r) return e + "";
  var n = r[0], i = r[1], a = i - (XS = Math.max(-8, Math.min(8, Math.floor(i / 3))) * 3) + 1, o = n.length;
  return a === o ? n : a > o ? n + new Array(a - o + 1).join("0") : a > 0 ? n.slice(0, a) + "." + n.slice(a) : "0." + new Array(1 - a).join("0") + qu(e, Math.max(0, t + a - 1))[0];
}
function Ob(e, t) {
  var r = qu(e, t);
  if (!r) return e + "";
  var n = r[0], i = r[1];
  return i < 0 ? "0." + new Array(-i).join("0") + n : n.length > i + 1 ? n.slice(0, i + 1) + "." + n.slice(i + 1) : n + new Array(i - n.length + 2).join("0");
}
const Sb = {
  "%": function(e, t) {
    return (e * 100).toFixed(t);
  },
  b: function(e) {
    return Math.round(e).toString(2);
  },
  c: function(e) {
    return e + "";
  },
  d: f9,
  e: function(e, t) {
    return e.toExponential(t);
  },
  f: function(e, t) {
    return e.toFixed(t);
  },
  g: function(e, t) {
    return e.toPrecision(t);
  },
  o: function(e) {
    return Math.round(e).toString(8);
  },
  p: function(e, t) {
    return Ob(e * 100, t);
  },
  r: Ob,
  s: m9,
  X: function(e) {
    return Math.round(e).toString(16).toUpperCase();
  },
  x: function(e) {
    return Math.round(e).toString(16);
  }
};
function Eb(e) {
  return e;
}
var Pb = Array.prototype.map, Tb = ["y", "z", "a", "f", "p", "n", "µ", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function y9(e) {
  var t = e.grouping === void 0 || e.thousands === void 0 ? Eb : d9(Pb.call(e.grouping, Number), e.thousands + ""), r = e.currency === void 0 ? "" : e.currency[0] + "", n = e.currency === void 0 ? "" : e.currency[1] + "", i = e.decimal + "", a = e.numerals === void 0 ? Eb : h9(Pb.call(e.numerals, String)), o = e.percent === void 0 ? "%" : e.percent + "", u = e.minus + "", s = e.nan === void 0 ? "NaN" : e.nan + "";
  function l(f) {
    f = za(f);
    var d = f.fill, h = f.align, p = f.sign, v = f.symbol, m = f.zero, y = f.width, b = f.comma, g = f.precision, _ = f.trim, x = f.type;
    x === "n" ? (b = !0, x = "g") : Sb[x] || (g === void 0 && (g = 12), _ = !0, x = "g"), (m || d === "0" && h === "=") && (m = !0, d = "0", h = "=");
    var w = v === "$" ? r : v === "#" && /[boxX]/.test(x) ? "0" + x.toLowerCase() : "", A = v === "$" ? n : /[%p]/.test(x) ? o : "", P = Sb[x], T = /[defgprs%]/.test(x);
    g = g === void 0 ? 6 : /[gprs]/.test(x) ? Math.max(1, Math.min(21, g)) : Math.max(0, Math.min(20, g));
    function C(O) {
      var D = w, j = A, z, E, M;
      if (x === "c")
        j = P(O) + j, O = "";
      else {
        O = +O;
        var N = O < 0 || 1 / O < 0;
        if (O = isNaN(O) ? s : P(Math.abs(O), g), _ && (O = p9(O)), N && +O == 0 && p !== "+" && (N = !1), D = (N ? p === "(" ? p : u : p === "-" || p === "(" ? "" : p) + D, j = (x === "s" ? Tb[8 + XS / 3] : "") + j + (N && p === "(" ? ")" : ""), T) {
          for (z = -1, E = O.length; ++z < E; )
            if (M = O.charCodeAt(z), 48 > M || M > 57) {
              j = (M === 46 ? i + O.slice(z + 1) : O.slice(z)) + j, O = O.slice(0, z);
              break;
            }
        }
      }
      b && !m && (O = t(O, 1 / 0));
      var k = D.length + O.length + j.length, R = k < y ? new Array(y - k + 1).join(d) : "";
      switch (b && m && (O = t(R + O, R.length ? y - j.length : 1 / 0), R = ""), h) {
        case "<":
          O = D + O + j + R;
          break;
        case "=":
          O = D + R + O + j;
          break;
        case "^":
          O = R.slice(0, k = R.length >> 1) + D + O + j + R.slice(k);
          break;
        default:
          O = R + D + O + j;
          break;
      }
      return a(O);
    }
    return C.toString = function() {
      return f + "";
    }, C;
  }
  function c(f, d) {
    var h = l((f = za(f), f.type = "f", f)), p = Math.max(-8, Math.min(8, Math.floor(Pi(d) / 3))) * 3, v = Math.pow(10, -p), m = Tb[8 + p / 3];
    return function(y) {
      return h(v * y) + m;
    };
  }
  return {
    format: l,
    formatPrefix: c
  };
}
var Bo, Ws, ZS;
g9({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""],
  minus: "-"
});
function g9(e) {
  return Bo = y9(e), Ws = Bo.format, ZS = Bo.formatPrefix, Bo;
}
function b9(e) {
  return Math.max(0, -Pi(Math.abs(e)));
}
function _9(e, t) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(Pi(t) / 3))) * 3 - Pi(Math.abs(e)));
}
function w9(e, t) {
  return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, Pi(t) - Pi(e)) + 1;
}
function QS(e, t, r, n) {
  var i = Zv(e, t, r), a;
  switch (n = za(n ?? ",f"), n.type) {
    case "s": {
      var o = Math.max(Math.abs(e), Math.abs(t));
      return n.precision == null && !isNaN(a = _9(i, o)) && (n.precision = a), ZS(n, o);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      n.precision == null && !isNaN(a = w9(i, Math.max(Math.abs(e), Math.abs(t)))) && (n.precision = a - (n.type === "e"));
      break;
    }
    case "f":
    case "%": {
      n.precision == null && !isNaN(a = b9(i)) && (n.precision = a - (n.type === "%") * 2);
      break;
    }
  }
  return Ws(n);
}
function an(e) {
  var t = e.domain;
  return e.ticks = function(r) {
    var n = t();
    return Xv(n[0], n[n.length - 1], r ?? 10);
  }, e.tickFormat = function(r, n) {
    var i = t();
    return QS(i[0], i[i.length - 1], r ?? 10, n);
  }, e.nice = function(r) {
    r == null && (r = 10);
    var n = t(), i = 0, a = n.length - 1, o = n[i], u = n[a], s, l, c = 10;
    for (u < o && (l = o, o = u, u = l, l = i, i = a, a = l); c-- > 0; ) {
      if (l = FS(o, u, r), l === s)
        return n[i] = o, n[a] = u, t(n);
      if (l > 0)
        o = Math.floor(o / l) * l, u = Math.ceil(u / l) * l;
      else if (l < 0)
        o = Math.ceil(o * l) / l, u = Math.floor(u * l) / l;
      else
        break;
      s = l;
    }
    return e;
  }, e;
}
function JS() {
  var e = ym();
  return e.copy = function() {
    return so(e, JS());
  }, Rt.apply(e, arguments), an(e);
}
function eE(e) {
  var t;
  function r(n) {
    return n == null || isNaN(n = +n) ? t : n;
  }
  return r.invert = r, r.domain = r.range = function(n) {
    return arguments.length ? (e = Array.from(n, Lu), r) : e.slice();
  }, r.unknown = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.copy = function() {
    return eE(e).unknown(t);
  }, e = arguments.length ? Array.from(e, Lu) : [0, 1], an(r);
}
function tE(e, t) {
  e = e.slice();
  var r = 0, n = e.length - 1, i = e[r], a = e[n], o;
  return a < i && (o = r, r = n, n = o, o = i, i = a, a = o), e[r] = t.floor(i), e[n] = t.ceil(a), e;
}
function Cb(e) {
  return Math.log(e);
}
function Ib(e) {
  return Math.exp(e);
}
function x9(e) {
  return -Math.log(-e);
}
function A9(e) {
  return -Math.exp(-e);
}
function O9(e) {
  return isFinite(e) ? +("1e" + e) : e < 0 ? 0 : e;
}
function S9(e) {
  return e === 10 ? O9 : e === Math.E ? Math.exp : (t) => Math.pow(e, t);
}
function E9(e) {
  return e === Math.E ? Math.log : e === 10 && Math.log10 || e === 2 && Math.log2 || (e = Math.log(e), (t) => Math.log(t) / e);
}
function kb(e) {
  return (t, r) => -e(-t, r);
}
function bm(e) {
  const t = e(Cb, Ib), r = t.domain;
  let n = 10, i, a;
  function o() {
    return i = E9(n), a = S9(n), r()[0] < 0 ? (i = kb(i), a = kb(a), e(x9, A9)) : e(Cb, Ib), t;
  }
  return t.base = function(u) {
    return arguments.length ? (n = +u, o()) : n;
  }, t.domain = function(u) {
    return arguments.length ? (r(u), o()) : r();
  }, t.ticks = (u) => {
    const s = r();
    let l = s[0], c = s[s.length - 1];
    const f = c < l;
    f && ([l, c] = [c, l]);
    let d = i(l), h = i(c), p, v;
    const m = u == null ? 10 : +u;
    let y = [];
    if (!(n % 1) && h - d < m) {
      if (d = Math.floor(d), h = Math.ceil(h), l > 0) {
        for (; d <= h; ++d)
          for (p = 1; p < n; ++p)
            if (v = d < 0 ? p / a(-d) : p * a(d), !(v < l)) {
              if (v > c) break;
              y.push(v);
            }
      } else for (; d <= h; ++d)
        for (p = n - 1; p >= 1; --p)
          if (v = d > 0 ? p / a(-d) : p * a(d), !(v < l)) {
            if (v > c) break;
            y.push(v);
          }
      y.length * 2 < m && (y = Xv(l, c, m));
    } else
      y = Xv(d, h, Math.min(h - d, m)).map(a);
    return f ? y.reverse() : y;
  }, t.tickFormat = (u, s) => {
    if (u == null && (u = 10), s == null && (s = n === 10 ? "s" : ","), typeof s != "function" && (!(n % 1) && (s = za(s)).precision == null && (s.trim = !0), s = Ws(s)), u === 1 / 0) return s;
    const l = Math.max(1, n * u / t.ticks().length);
    return (c) => {
      let f = c / a(Math.round(i(c)));
      return f * n < n - 0.5 && (f *= n), f <= l ? s(c) : "";
    };
  }, t.nice = () => r(tE(r(), {
    floor: (u) => a(Math.floor(i(u))),
    ceil: (u) => a(Math.ceil(i(u)))
  })), t;
}
function rE() {
  const e = bm(Bs()).domain([1, 10]);
  return e.copy = () => so(e, rE()).base(e.base()), Rt.apply(e, arguments), e;
}
function Mb(e) {
  return function(t) {
    return Math.sign(t) * Math.log1p(Math.abs(t / e));
  };
}
function Nb(e) {
  return function(t) {
    return Math.sign(t) * Math.expm1(Math.abs(t)) * e;
  };
}
function _m(e) {
  var t = 1, r = e(Mb(t), Nb(t));
  return r.constant = function(n) {
    return arguments.length ? e(Mb(t = +n), Nb(t)) : t;
  }, an(r);
}
function nE() {
  var e = _m(Bs());
  return e.copy = function() {
    return so(e, nE()).constant(e.constant());
  }, Rt.apply(e, arguments);
}
function Rb(e) {
  return function(t) {
    return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
  };
}
function P9(e) {
  return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
}
function T9(e) {
  return e < 0 ? -e * e : e * e;
}
function wm(e) {
  var t = e(st, st), r = 1;
  function n() {
    return r === 1 ? e(st, st) : r === 0.5 ? e(P9, T9) : e(Rb(r), Rb(1 / r));
  }
  return t.exponent = function(i) {
    return arguments.length ? (r = +i, n()) : r;
  }, an(t);
}
function xm() {
  var e = wm(Bs());
  return e.copy = function() {
    return so(e, xm()).exponent(e.exponent());
  }, Rt.apply(e, arguments), e;
}
function C9() {
  return xm.apply(null, arguments).exponent(0.5);
}
function $b(e) {
  return Math.sign(e) * e * e;
}
function I9(e) {
  return Math.sign(e) * Math.sqrt(Math.abs(e));
}
function iE() {
  var e = ym(), t = [0, 1], r = !1, n;
  function i(a) {
    var o = I9(e(a));
    return isNaN(o) ? n : r ? Math.round(o) : o;
  }
  return i.invert = function(a) {
    return e.invert($b(a));
  }, i.domain = function(a) {
    return arguments.length ? (e.domain(a), i) : e.domain();
  }, i.range = function(a) {
    return arguments.length ? (e.range((t = Array.from(a, Lu)).map($b)), i) : t.slice();
  }, i.rangeRound = function(a) {
    return i.range(a).round(!0);
  }, i.round = function(a) {
    return arguments.length ? (r = !!a, i) : r;
  }, i.clamp = function(a) {
    return arguments.length ? (e.clamp(a), i) : e.clamp();
  }, i.unknown = function(a) {
    return arguments.length ? (n = a, i) : n;
  }, i.copy = function() {
    return iE(e.domain(), t).round(r).clamp(e.clamp()).unknown(n);
  }, Rt.apply(i, arguments), an(i);
}
function aE() {
  var e = [], t = [], r = [], n;
  function i() {
    var o = 0, u = Math.max(1, t.length);
    for (r = new Array(u - 1); ++o < u; ) r[o - 1] = CM(e, o / u);
    return a;
  }
  function a(o) {
    return o == null || isNaN(o = +o) ? n : t[uo(r, o)];
  }
  return a.invertExtent = function(o) {
    var u = t.indexOf(o);
    return u < 0 ? [NaN, NaN] : [
      u > 0 ? r[u - 1] : e[0],
      u < r.length ? r[u] : e[e.length - 1]
    ];
  }, a.domain = function(o) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let u of o) u != null && !isNaN(u = +u) && e.push(u);
    return e.sort(oo), i();
  }, a.range = function(o) {
    return arguments.length ? (t = Array.from(o), i()) : t.slice();
  }, a.unknown = function(o) {
    return arguments.length ? (n = o, a) : n;
  }, a.quantiles = function() {
    return r.slice();
  }, a.copy = function() {
    return aE().domain(e).range(t).unknown(n);
  }, Rt.apply(a, arguments);
}
function oE() {
  var e = 0, t = 1, r = 1, n = [0.5], i = [0, 1], a;
  function o(s) {
    return s != null && s <= s ? i[uo(n, s, 0, r)] : a;
  }
  function u() {
    var s = -1;
    for (n = new Array(r); ++s < r; ) n[s] = ((s + 1) * t - (s - r) * e) / (r + 1);
    return o;
  }
  return o.domain = function(s) {
    return arguments.length ? ([e, t] = s, e = +e, t = +t, u()) : [e, t];
  }, o.range = function(s) {
    return arguments.length ? (r = (i = Array.from(s)).length - 1, u()) : i.slice();
  }, o.invertExtent = function(s) {
    var l = i.indexOf(s);
    return l < 0 ? [NaN, NaN] : l < 1 ? [e, n[0]] : l >= r ? [n[r - 1], t] : [n[l - 1], n[l]];
  }, o.unknown = function(s) {
    return arguments.length && (a = s), o;
  }, o.thresholds = function() {
    return n.slice();
  }, o.copy = function() {
    return oE().domain([e, t]).range(i).unknown(a);
  }, Rt.apply(an(o), arguments);
}
function uE() {
  var e = [0.5], t = [0, 1], r, n = 1;
  function i(a) {
    return a != null && a <= a ? t[uo(e, a, 0, n)] : r;
  }
  return i.domain = function(a) {
    return arguments.length ? (e = Array.from(a), n = Math.min(e.length, t.length - 1), i) : e.slice();
  }, i.range = function(a) {
    return arguments.length ? (t = Array.from(a), n = Math.min(e.length, t.length - 1), i) : t.slice();
  }, i.invertExtent = function(a) {
    var o = t.indexOf(a);
    return [e[o - 1], e[o]];
  }, i.unknown = function(a) {
    return arguments.length ? (r = a, i) : r;
  }, i.copy = function() {
    return uE().domain(e).range(t).unknown(r);
  }, Rt.apply(i, arguments);
}
const kc = /* @__PURE__ */ new Date(), Mc = /* @__PURE__ */ new Date();
function Be(e, t, r, n) {
  function i(a) {
    return e(a = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+a)), a;
  }
  return i.floor = (a) => (e(a = /* @__PURE__ */ new Date(+a)), a), i.ceil = (a) => (e(a = new Date(a - 1)), t(a, 1), e(a), a), i.round = (a) => {
    const o = i(a), u = i.ceil(a);
    return a - o < u - a ? o : u;
  }, i.offset = (a, o) => (t(a = /* @__PURE__ */ new Date(+a), o == null ? 1 : Math.floor(o)), a), i.range = (a, o, u) => {
    const s = [];
    if (a = i.ceil(a), u = u == null ? 1 : Math.floor(u), !(a < o) || !(u > 0)) return s;
    let l;
    do
      s.push(l = /* @__PURE__ */ new Date(+a)), t(a, u), e(a);
    while (l < a && a < o);
    return s;
  }, i.filter = (a) => Be((o) => {
    if (o >= o) for (; e(o), !a(o); ) o.setTime(o - 1);
  }, (o, u) => {
    if (o >= o)
      if (u < 0) for (; ++u <= 0; )
        for (; t(o, -1), !a(o); )
          ;
      else for (; --u >= 0; )
        for (; t(o, 1), !a(o); )
          ;
  }), r && (i.count = (a, o) => (kc.setTime(+a), Mc.setTime(+o), e(kc), e(Mc), Math.floor(r(kc, Mc))), i.every = (a) => (a = Math.floor(a), !isFinite(a) || !(a > 0) ? null : a > 1 ? i.filter(n ? (o) => n(o) % a === 0 : (o) => i.count(0, o) % a === 0) : i)), i;
}
const zu = Be(() => {
}, (e, t) => {
  e.setTime(+e + t);
}, (e, t) => t - e);
zu.every = (e) => (e = Math.floor(e), !isFinite(e) || !(e > 0) ? null : e > 1 ? Be((t) => {
  t.setTime(Math.floor(t / e) * e);
}, (t, r) => {
  t.setTime(+t + r * e);
}, (t, r) => (r - t) / e) : zu);
zu.range;
const Ar = 1e3, Ct = Ar * 60, Or = Ct * 60, kr = Or * 24, Am = kr * 7, Db = kr * 30, Nc = kr * 365, En = Be((e) => {
  e.setTime(e - e.getMilliseconds());
}, (e, t) => {
  e.setTime(+e + t * Ar);
}, (e, t) => (t - e) / Ar, (e) => e.getUTCSeconds());
En.range;
const Om = Be((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * Ar);
}, (e, t) => {
  e.setTime(+e + t * Ct);
}, (e, t) => (t - e) / Ct, (e) => e.getMinutes());
Om.range;
const Sm = Be((e) => {
  e.setUTCSeconds(0, 0);
}, (e, t) => {
  e.setTime(+e + t * Ct);
}, (e, t) => (t - e) / Ct, (e) => e.getUTCMinutes());
Sm.range;
const Em = Be((e) => {
  e.setTime(e - e.getMilliseconds() - e.getSeconds() * Ar - e.getMinutes() * Ct);
}, (e, t) => {
  e.setTime(+e + t * Or);
}, (e, t) => (t - e) / Or, (e) => e.getHours());
Em.range;
const Pm = Be((e) => {
  e.setUTCMinutes(0, 0, 0);
}, (e, t) => {
  e.setTime(+e + t * Or);
}, (e, t) => (t - e) / Or, (e) => e.getUTCHours());
Pm.range;
const Tm = Be(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * Ct) / kr,
  (e) => e.getDate() - 1
);
Tm.range;
const sE = Be((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / kr, (e) => e.getUTCDate() - 1);
sE.range;
const lE = Be((e) => {
  e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCDate(e.getUTCDate() + t);
}, (e, t) => (t - e) / kr, (e) => Math.floor(e / kr));
lE.range;
function Kn(e) {
  return Be((t) => {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setDate(t.getDate() + r * 7);
  }, (t, r) => (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * Ct) / Am);
}
const Cm = Kn(0), k9 = Kn(1), M9 = Kn(2), N9 = Kn(3), R9 = Kn(4), $9 = Kn(5), D9 = Kn(6);
Cm.range;
k9.range;
M9.range;
N9.range;
R9.range;
$9.range;
D9.range;
function Gn(e) {
  return Be((t) => {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
  }, (t, r) => {
    t.setUTCDate(t.getUTCDate() + r * 7);
  }, (t, r) => (r - t) / Am);
}
const Im = Gn(0), j9 = Gn(1), L9 = Gn(2), q9 = Gn(3), z9 = Gn(4), F9 = Gn(5), B9 = Gn(6);
Im.range;
j9.range;
L9.range;
q9.range;
z9.range;
F9.range;
B9.range;
const km = Be((e) => {
  e.setDate(1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setMonth(e.getMonth() + t);
}, (e, t) => t.getMonth() - e.getMonth() + (t.getFullYear() - e.getFullYear()) * 12, (e) => e.getMonth());
km.range;
const Mm = Be((e) => {
  e.setUTCDate(1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCMonth(e.getUTCMonth() + t);
}, (e, t) => t.getUTCMonth() - e.getUTCMonth() + (t.getUTCFullYear() - e.getUTCFullYear()) * 12, (e) => e.getUTCMonth());
Mm.range;
const Us = Be((e) => {
  e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, (e, t) => {
  e.setFullYear(e.getFullYear() + t);
}, (e, t) => t.getFullYear() - e.getFullYear(), (e) => e.getFullYear());
Us.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Be((t) => {
  t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
}, (t, r) => {
  t.setFullYear(t.getFullYear() + r * e);
});
Us.range;
const Vs = Be((e) => {
  e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, (e, t) => {
  e.setUTCFullYear(e.getUTCFullYear() + t);
}, (e, t) => t.getUTCFullYear() - e.getUTCFullYear(), (e) => e.getUTCFullYear());
Vs.every = (e) => !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Be((t) => {
  t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
}, (t, r) => {
  t.setUTCFullYear(t.getUTCFullYear() + r * e);
});
Vs.range;
function cE(e, t, r, n, i, a) {
  const o = [
    [En, 1, Ar],
    [En, 5, 5 * Ar],
    [En, 15, 15 * Ar],
    [En, 30, 30 * Ar],
    [a, 1, Ct],
    [a, 5, 5 * Ct],
    [a, 15, 15 * Ct],
    [a, 30, 30 * Ct],
    [i, 1, Or],
    [i, 3, 3 * Or],
    [i, 6, 6 * Or],
    [i, 12, 12 * Or],
    [n, 1, kr],
    [n, 2, 2 * kr],
    [r, 1, Am],
    [t, 1, Db],
    [t, 3, 3 * Db],
    [e, 1, Nc]
  ];
  function u(l, c, f) {
    const d = c < l;
    d && ([l, c] = [c, l]);
    const h = f && typeof f.range == "function" ? f : s(l, c, f), p = h ? h.range(l, +c + 1) : [];
    return d ? p.reverse() : p;
  }
  function s(l, c, f) {
    const d = Math.abs(c - l) / f, h = cm(([, , m]) => m).right(o, d);
    if (h === o.length) return e.every(Zv(l / Nc, c / Nc, f));
    if (h === 0) return zu.every(Math.max(Zv(l, c, f), 1));
    const [p, v] = o[d / o[h - 1][2] < o[h][2] / d ? h - 1 : h];
    return p.every(v);
  }
  return [u, s];
}
const [W9, U9] = cE(Vs, Mm, Im, lE, Pm, Sm), [V9, H9] = cE(Us, km, Cm, Tm, Em, Om);
var Rc = /* @__PURE__ */ new Date(), $c = /* @__PURE__ */ new Date();
function Nr(e, t, r, n) {
  function i(a) {
    return e(a = arguments.length === 0 ? /* @__PURE__ */ new Date() : /* @__PURE__ */ new Date(+a)), a;
  }
  return i.floor = function(a) {
    return e(a = /* @__PURE__ */ new Date(+a)), a;
  }, i.ceil = function(a) {
    return e(a = new Date(a - 1)), t(a, 1), e(a), a;
  }, i.round = function(a) {
    var o = i(a), u = i.ceil(a);
    return a - o < u - a ? o : u;
  }, i.offset = function(a, o) {
    return t(a = /* @__PURE__ */ new Date(+a), o == null ? 1 : Math.floor(o)), a;
  }, i.range = function(a, o, u) {
    var s = [], l;
    if (a = i.ceil(a), u = u == null ? 1 : Math.floor(u), !(a < o) || !(u > 0)) return s;
    do
      s.push(l = /* @__PURE__ */ new Date(+a)), t(a, u), e(a);
    while (l < a && a < o);
    return s;
  }, i.filter = function(a) {
    return Nr(function(o) {
      if (o >= o) for (; e(o), !a(o); ) o.setTime(o - 1);
    }, function(o, u) {
      if (o >= o)
        if (u < 0) for (; ++u <= 0; )
          for (; t(o, -1), !a(o); )
            ;
        else for (; --u >= 0; )
          for (; t(o, 1), !a(o); )
            ;
    });
  }, r && (i.count = function(a, o) {
    return Rc.setTime(+a), $c.setTime(+o), e(Rc), e($c), Math.floor(r(Rc, $c));
  }, i.every = function(a) {
    return a = Math.floor(a), !isFinite(a) || !(a > 0) ? null : a > 1 ? i.filter(n ? function(o) {
      return n(o) % a === 0;
    } : function(o) {
      return i.count(0, o) % a === 0;
    }) : i;
  }), i;
}
const K9 = 1e3, Nm = K9 * 60, G9 = Nm * 60, Rm = G9 * 24, fE = Rm * 7;
var $m = Nr(
  (e) => e.setHours(0, 0, 0, 0),
  (e, t) => e.setDate(e.getDate() + t),
  (e, t) => (t - e - (t.getTimezoneOffset() - e.getTimezoneOffset()) * Nm) / Rm,
  (e) => e.getDate() - 1
);
$m.range;
function Yn(e) {
  return Nr(function(t) {
    t.setDate(t.getDate() - (t.getDay() + 7 - e) % 7), t.setHours(0, 0, 0, 0);
  }, function(t, r) {
    t.setDate(t.getDate() + r * 7);
  }, function(t, r) {
    return (r - t - (r.getTimezoneOffset() - t.getTimezoneOffset()) * Nm) / fE;
  });
}
var dE = Yn(0), Fu = Yn(1), Y9 = Yn(2), X9 = Yn(3), Ti = Yn(4), Z9 = Yn(5), Q9 = Yn(6);
dE.range;
Fu.range;
Y9.range;
X9.range;
Ti.range;
Z9.range;
Q9.range;
var Ln = Nr(function(e) {
  e.setMonth(0, 1), e.setHours(0, 0, 0, 0);
}, function(e, t) {
  e.setFullYear(e.getFullYear() + t);
}, function(e, t) {
  return t.getFullYear() - e.getFullYear();
}, function(e) {
  return e.getFullYear();
});
Ln.every = function(e) {
  return !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Nr(function(t) {
    t.setFullYear(Math.floor(t.getFullYear() / e) * e), t.setMonth(0, 1), t.setHours(0, 0, 0, 0);
  }, function(t, r) {
    t.setFullYear(t.getFullYear() + r * e);
  });
};
Ln.range;
var Dm = Nr(function(e) {
  e.setUTCHours(0, 0, 0, 0);
}, function(e, t) {
  e.setUTCDate(e.getUTCDate() + t);
}, function(e, t) {
  return (t - e) / Rm;
}, function(e) {
  return e.getUTCDate() - 1;
});
Dm.range;
function Xn(e) {
  return Nr(function(t) {
    t.setUTCDate(t.getUTCDate() - (t.getUTCDay() + 7 - e) % 7), t.setUTCHours(0, 0, 0, 0);
  }, function(t, r) {
    t.setUTCDate(t.getUTCDate() + r * 7);
  }, function(t, r) {
    return (r - t) / fE;
  });
}
var hE = Xn(0), Bu = Xn(1), J9 = Xn(2), eN = Xn(3), Ci = Xn(4), tN = Xn(5), rN = Xn(6);
hE.range;
Bu.range;
J9.range;
eN.range;
Ci.range;
tN.range;
rN.range;
var qn = Nr(function(e) {
  e.setUTCMonth(0, 1), e.setUTCHours(0, 0, 0, 0);
}, function(e, t) {
  e.setUTCFullYear(e.getUTCFullYear() + t);
}, function(e, t) {
  return t.getUTCFullYear() - e.getUTCFullYear();
}, function(e) {
  return e.getUTCFullYear();
});
qn.every = function(e) {
  return !isFinite(e = Math.floor(e)) || !(e > 0) ? null : Nr(function(t) {
    t.setUTCFullYear(Math.floor(t.getUTCFullYear() / e) * e), t.setUTCMonth(0, 1), t.setUTCHours(0, 0, 0, 0);
  }, function(t, r) {
    t.setUTCFullYear(t.getUTCFullYear() + r * e);
  });
};
qn.range;
function Dc(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(-1, e.m, e.d, e.H, e.M, e.S, e.L);
    return t.setFullYear(e.y), t;
  }
  return new Date(e.y, e.m, e.d, e.H, e.M, e.S, e.L);
}
function jc(e) {
  if (0 <= e.y && e.y < 100) {
    var t = new Date(Date.UTC(-1, e.m, e.d, e.H, e.M, e.S, e.L));
    return t.setUTCFullYear(e.y), t;
  }
  return new Date(Date.UTC(e.y, e.m, e.d, e.H, e.M, e.S, e.L));
}
function ra(e, t, r) {
  return { y: e, m: t, d: r, H: 0, M: 0, S: 0, L: 0 };
}
function nN(e) {
  var t = e.dateTime, r = e.date, n = e.time, i = e.periods, a = e.days, o = e.shortDays, u = e.months, s = e.shortMonths, l = na(i), c = ia(i), f = na(a), d = ia(a), h = na(o), p = ia(o), v = na(u), m = ia(u), y = na(s), b = ia(s), g = {
    a: N,
    A: k,
    b: R,
    B: W,
    c: null,
    d: Bb,
    e: Bb,
    f: EN,
    g: DN,
    G: LN,
    H: AN,
    I: ON,
    j: SN,
    L: vE,
    m: PN,
    M: TN,
    p: Z,
    q: ce,
    Q: Vb,
    s: Hb,
    S: CN,
    u: IN,
    U: kN,
    V: MN,
    w: NN,
    W: RN,
    x: null,
    X: null,
    y: $N,
    Y: jN,
    Z: qN,
    "%": Ub
  }, _ = {
    a: fe,
    A: de,
    b: Oe,
    B: me,
    c: null,
    d: Wb,
    e: Wb,
    f: WN,
    g: JN,
    G: tR,
    H: zN,
    I: FN,
    j: BN,
    L: mE,
    m: UN,
    M: VN,
    p: ve,
    q: Ue,
    Q: Vb,
    s: Hb,
    S: HN,
    u: KN,
    U: GN,
    V: YN,
    w: XN,
    W: ZN,
    x: null,
    X: null,
    y: QN,
    Y: eR,
    Z: rR,
    "%": Ub
  }, x = {
    a: C,
    A: O,
    b: D,
    B: j,
    c: z,
    d: zb,
    e: zb,
    f: bN,
    g: qb,
    G: Lb,
    H: Fb,
    I: Fb,
    j: pN,
    L: gN,
    m: vN,
    M: mN,
    p: T,
    q: hN,
    Q: wN,
    s: xN,
    S: yN,
    u: sN,
    U: lN,
    V: cN,
    w: uN,
    W: fN,
    x: E,
    X: M,
    y: qb,
    Y: Lb,
    Z: dN,
    "%": _N
  };
  g.x = w(r, g), g.X = w(n, g), g.c = w(t, g), _.x = w(r, _), _.X = w(n, _), _.c = w(t, _);
  function w(U, Q) {
    return function(H) {
      var q = [], we = -1, F = 0, B = U.length, Ee, ne, lt;
      for (H instanceof Date || (H = /* @__PURE__ */ new Date(+H)); ++we < B; )
        U.charCodeAt(we) === 37 && (q.push(U.slice(F, we)), (ne = jb[Ee = U.charAt(++we)]) != null ? Ee = U.charAt(++we) : ne = Ee === "e" ? " " : "0", (lt = Q[Ee]) && (Ee = lt(H, ne)), q.push(Ee), F = we + 1);
      return q.push(U.slice(F, we)), q.join("");
    };
  }
  function A(U, Q) {
    return function(H) {
      var q = ra(1900, void 0, 1), we = P(q, U, H += "", 0), F, B;
      if (we != H.length) return null;
      if ("Q" in q) return new Date(q.Q);
      if ("s" in q) return new Date(q.s * 1e3 + ("L" in q ? q.L : 0));
      if (Q && !("Z" in q) && (q.Z = 0), "p" in q && (q.H = q.H % 12 + q.p * 12), q.m === void 0 && (q.m = "q" in q ? q.q : 0), "V" in q) {
        if (q.V < 1 || q.V > 53) return null;
        "w" in q || (q.w = 1), "Z" in q ? (F = jc(ra(q.y, 0, 1)), B = F.getUTCDay(), F = B > 4 || B === 0 ? Bu.ceil(F) : Bu(F), F = Dm.offset(F, (q.V - 1) * 7), q.y = F.getUTCFullYear(), q.m = F.getUTCMonth(), q.d = F.getUTCDate() + (q.w + 6) % 7) : (F = Dc(ra(q.y, 0, 1)), B = F.getDay(), F = B > 4 || B === 0 ? Fu.ceil(F) : Fu(F), F = $m.offset(F, (q.V - 1) * 7), q.y = F.getFullYear(), q.m = F.getMonth(), q.d = F.getDate() + (q.w + 6) % 7);
      } else ("W" in q || "U" in q) && ("w" in q || (q.w = "u" in q ? q.u % 7 : "W" in q ? 1 : 0), B = "Z" in q ? jc(ra(q.y, 0, 1)).getUTCDay() : Dc(ra(q.y, 0, 1)).getDay(), q.m = 0, q.d = "W" in q ? (q.w + 6) % 7 + q.W * 7 - (B + 5) % 7 : q.w + q.U * 7 - (B + 6) % 7);
      return "Z" in q ? (q.H += q.Z / 100 | 0, q.M += q.Z % 100, jc(q)) : Dc(q);
    };
  }
  function P(U, Q, H, q) {
    for (var we = 0, F = Q.length, B = H.length, Ee, ne; we < F; ) {
      if (q >= B) return -1;
      if (Ee = Q.charCodeAt(we++), Ee === 37) {
        if (Ee = Q.charAt(we++), ne = x[Ee in jb ? Q.charAt(we++) : Ee], !ne || (q = ne(U, H, q)) < 0) return -1;
      } else if (Ee != H.charCodeAt(q++))
        return -1;
    }
    return q;
  }
  function T(U, Q, H) {
    var q = l.exec(Q.slice(H));
    return q ? (U.p = c.get(q[0].toLowerCase()), H + q[0].length) : -1;
  }
  function C(U, Q, H) {
    var q = h.exec(Q.slice(H));
    return q ? (U.w = p.get(q[0].toLowerCase()), H + q[0].length) : -1;
  }
  function O(U, Q, H) {
    var q = f.exec(Q.slice(H));
    return q ? (U.w = d.get(q[0].toLowerCase()), H + q[0].length) : -1;
  }
  function D(U, Q, H) {
    var q = y.exec(Q.slice(H));
    return q ? (U.m = b.get(q[0].toLowerCase()), H + q[0].length) : -1;
  }
  function j(U, Q, H) {
    var q = v.exec(Q.slice(H));
    return q ? (U.m = m.get(q[0].toLowerCase()), H + q[0].length) : -1;
  }
  function z(U, Q, H) {
    return P(U, t, Q, H);
  }
  function E(U, Q, H) {
    return P(U, r, Q, H);
  }
  function M(U, Q, H) {
    return P(U, n, Q, H);
  }
  function N(U) {
    return o[U.getDay()];
  }
  function k(U) {
    return a[U.getDay()];
  }
  function R(U) {
    return s[U.getMonth()];
  }
  function W(U) {
    return u[U.getMonth()];
  }
  function Z(U) {
    return i[+(U.getHours() >= 12)];
  }
  function ce(U) {
    return 1 + ~~(U.getMonth() / 3);
  }
  function fe(U) {
    return o[U.getUTCDay()];
  }
  function de(U) {
    return a[U.getUTCDay()];
  }
  function Oe(U) {
    return s[U.getUTCMonth()];
  }
  function me(U) {
    return u[U.getUTCMonth()];
  }
  function ve(U) {
    return i[+(U.getUTCHours() >= 12)];
  }
  function Ue(U) {
    return 1 + ~~(U.getUTCMonth() / 3);
  }
  return {
    format: function(U) {
      var Q = w(U += "", g);
      return Q.toString = function() {
        return U;
      }, Q;
    },
    parse: function(U) {
      var Q = A(U += "", !1);
      return Q.toString = function() {
        return U;
      }, Q;
    },
    utcFormat: function(U) {
      var Q = w(U += "", _);
      return Q.toString = function() {
        return U;
      }, Q;
    },
    utcParse: function(U) {
      var Q = A(U += "", !0);
      return Q.toString = function() {
        return U;
      }, Q;
    }
  };
}
var jb = { "-": "", _: " ", 0: "0" }, Xe = /^\s*\d+/, iN = /^%/, aN = /[\\^$*+?|[\]().{}]/g;
function le(e, t, r) {
  var n = e < 0 ? "-" : "", i = (n ? -e : e) + "", a = i.length;
  return n + (a < r ? new Array(r - a + 1).join(t) + i : i);
}
function oN(e) {
  return e.replace(aN, "\\$&");
}
function na(e) {
  return new RegExp("^(?:" + e.map(oN).join("|") + ")", "i");
}
function ia(e) {
  return new Map(e.map((t, r) => [t.toLowerCase(), r]));
}
function uN(e, t, r) {
  var n = Xe.exec(t.slice(r, r + 1));
  return n ? (e.w = +n[0], r + n[0].length) : -1;
}
function sN(e, t, r) {
  var n = Xe.exec(t.slice(r, r + 1));
  return n ? (e.u = +n[0], r + n[0].length) : -1;
}
function lN(e, t, r) {
  var n = Xe.exec(t.slice(r, r + 2));
  return n ? (e.U = +n[0], r + n[0].length) : -1;
}
function cN(e, t, r) {
  var n = Xe.exec(t.slice(r, r + 2));
  return n ? (e.V = +n[0], r + n[0].length) : -1;
}
function fN(e, t, r) {
  var n = Xe.exec(t.slice(r, r + 2));
  return n ? (e.W = +n[0], r + n[0].length) : -1;
}
function Lb(e, t, r) {
  var n = Xe.exec(t.slice(r, r + 4));
  return n ? (e.y = +n[0], r + n[0].length) : -1;
}
function qb(e, t, r) {
  var n = Xe.exec(t.slice(r, r + 2));
  return n ? (e.y = +n[0] + (+n[0] > 68 ? 1900 : 2e3), r + n[0].length) : -1;
}
function dN(e, t, r) {
  var n = /^(Z)|([+-]\d\d)(?::?(\d\d))?/.exec(t.slice(r, r + 6));
  return n ? (e.Z = n[1] ? 0 : -(n[2] + (n[3] || "00")), r + n[0].length) : -1;
}
function hN(e, t, r) {
  var n = Xe.exec(t.slice(r, r + 1));
  return n ? (e.q = n[0] * 3 - 3, r + n[0].length) : -1;
}
function vN(e, t, r) {
  var n = Xe.exec(t.slice(r, r + 2));
  return n ? (e.m = n[0] - 1, r + n[0].length) : -1;
}
function zb(e, t, r) {
  var n = Xe.exec(t.slice(r, r + 2));
  return n ? (e.d = +n[0], r + n[0].length) : -1;
}
function pN(e, t, r) {
  var n = Xe.exec(t.slice(r, r + 3));
  return n ? (e.m = 0, e.d = +n[0], r + n[0].length) : -1;
}
function Fb(e, t, r) {
  var n = Xe.exec(t.slice(r, r + 2));
  return n ? (e.H = +n[0], r + n[0].length) : -1;
}
function mN(e, t, r) {
  var n = Xe.exec(t.slice(r, r + 2));
  return n ? (e.M = +n[0], r + n[0].length) : -1;
}
function yN(e, t, r) {
  var n = Xe.exec(t.slice(r, r + 2));
  return n ? (e.S = +n[0], r + n[0].length) : -1;
}
function gN(e, t, r) {
  var n = Xe.exec(t.slice(r, r + 3));
  return n ? (e.L = +n[0], r + n[0].length) : -1;
}
function bN(e, t, r) {
  var n = Xe.exec(t.slice(r, r + 6));
  return n ? (e.L = Math.floor(n[0] / 1e3), r + n[0].length) : -1;
}
function _N(e, t, r) {
  var n = iN.exec(t.slice(r, r + 1));
  return n ? r + n[0].length : -1;
}
function wN(e, t, r) {
  var n = Xe.exec(t.slice(r));
  return n ? (e.Q = +n[0], r + n[0].length) : -1;
}
function xN(e, t, r) {
  var n = Xe.exec(t.slice(r));
  return n ? (e.s = +n[0], r + n[0].length) : -1;
}
function Bb(e, t) {
  return le(e.getDate(), t, 2);
}
function AN(e, t) {
  return le(e.getHours(), t, 2);
}
function ON(e, t) {
  return le(e.getHours() % 12 || 12, t, 2);
}
function SN(e, t) {
  return le(1 + $m.count(Ln(e), e), t, 3);
}
function vE(e, t) {
  return le(e.getMilliseconds(), t, 3);
}
function EN(e, t) {
  return vE(e, t) + "000";
}
function PN(e, t) {
  return le(e.getMonth() + 1, t, 2);
}
function TN(e, t) {
  return le(e.getMinutes(), t, 2);
}
function CN(e, t) {
  return le(e.getSeconds(), t, 2);
}
function IN(e) {
  var t = e.getDay();
  return t === 0 ? 7 : t;
}
function kN(e, t) {
  return le(dE.count(Ln(e) - 1, e), t, 2);
}
function pE(e) {
  var t = e.getDay();
  return t >= 4 || t === 0 ? Ti(e) : Ti.ceil(e);
}
function MN(e, t) {
  return e = pE(e), le(Ti.count(Ln(e), e) + (Ln(e).getDay() === 4), t, 2);
}
function NN(e) {
  return e.getDay();
}
function RN(e, t) {
  return le(Fu.count(Ln(e) - 1, e), t, 2);
}
function $N(e, t) {
  return le(e.getFullYear() % 100, t, 2);
}
function DN(e, t) {
  return e = pE(e), le(e.getFullYear() % 100, t, 2);
}
function jN(e, t) {
  return le(e.getFullYear() % 1e4, t, 4);
}
function LN(e, t) {
  var r = e.getDay();
  return e = r >= 4 || r === 0 ? Ti(e) : Ti.ceil(e), le(e.getFullYear() % 1e4, t, 4);
}
function qN(e) {
  var t = e.getTimezoneOffset();
  return (t > 0 ? "-" : (t *= -1, "+")) + le(t / 60 | 0, "0", 2) + le(t % 60, "0", 2);
}
function Wb(e, t) {
  return le(e.getUTCDate(), t, 2);
}
function zN(e, t) {
  return le(e.getUTCHours(), t, 2);
}
function FN(e, t) {
  return le(e.getUTCHours() % 12 || 12, t, 2);
}
function BN(e, t) {
  return le(1 + Dm.count(qn(e), e), t, 3);
}
function mE(e, t) {
  return le(e.getUTCMilliseconds(), t, 3);
}
function WN(e, t) {
  return mE(e, t) + "000";
}
function UN(e, t) {
  return le(e.getUTCMonth() + 1, t, 2);
}
function VN(e, t) {
  return le(e.getUTCMinutes(), t, 2);
}
function HN(e, t) {
  return le(e.getUTCSeconds(), t, 2);
}
function KN(e) {
  var t = e.getUTCDay();
  return t === 0 ? 7 : t;
}
function GN(e, t) {
  return le(hE.count(qn(e) - 1, e), t, 2);
}
function yE(e) {
  var t = e.getUTCDay();
  return t >= 4 || t === 0 ? Ci(e) : Ci.ceil(e);
}
function YN(e, t) {
  return e = yE(e), le(Ci.count(qn(e), e) + (qn(e).getUTCDay() === 4), t, 2);
}
function XN(e) {
  return e.getUTCDay();
}
function ZN(e, t) {
  return le(Bu.count(qn(e) - 1, e), t, 2);
}
function QN(e, t) {
  return le(e.getUTCFullYear() % 100, t, 2);
}
function JN(e, t) {
  return e = yE(e), le(e.getUTCFullYear() % 100, t, 2);
}
function eR(e, t) {
  return le(e.getUTCFullYear() % 1e4, t, 4);
}
function tR(e, t) {
  var r = e.getUTCDay();
  return e = r >= 4 || r === 0 ? Ci(e) : Ci.ceil(e), le(e.getUTCFullYear() % 1e4, t, 4);
}
function rR() {
  return "+0000";
}
function Ub() {
  return "%";
}
function Vb(e) {
  return +e;
}
function Hb(e) {
  return Math.floor(+e / 1e3);
}
var oi, jm, gE;
nR({
  dateTime: "%x, %X",
  date: "%-m/%-d/%Y",
  time: "%-I:%M:%S %p",
  periods: ["AM", "PM"],
  days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
});
function nR(e) {
  return oi = nN(e), jm = oi.format, oi.parse, gE = oi.utcFormat, oi.utcParse, oi;
}
function iR(e) {
  return new Date(e);
}
function aR(e) {
  return e instanceof Date ? +e : +/* @__PURE__ */ new Date(+e);
}
function Lm(e, t, r, n, i, a, o, u, s, l) {
  var c = ym(), f = c.invert, d = c.domain, h = l(".%L"), p = l(":%S"), v = l("%I:%M"), m = l("%I %p"), y = l("%a %d"), b = l("%b %d"), g = l("%B"), _ = l("%Y");
  function x(w) {
    return (s(w) < w ? h : u(w) < w ? p : o(w) < w ? v : a(w) < w ? m : n(w) < w ? i(w) < w ? y : b : r(w) < w ? g : _)(w);
  }
  return c.invert = function(w) {
    return new Date(f(w));
  }, c.domain = function(w) {
    return arguments.length ? d(Array.from(w, aR)) : d().map(iR);
  }, c.ticks = function(w) {
    var A = d();
    return e(A[0], A[A.length - 1], w ?? 10);
  }, c.tickFormat = function(w, A) {
    return A == null ? x : l(A);
  }, c.nice = function(w) {
    var A = d();
    return (!w || typeof w.range != "function") && (w = t(A[0], A[A.length - 1], w ?? 10)), w ? d(tE(A, w)) : c;
  }, c.copy = function() {
    return so(c, Lm(e, t, r, n, i, a, o, u, s, l));
  }, c;
}
function oR() {
  return Rt.apply(Lm(V9, H9, Us, km, Cm, Tm, Em, Om, En, jm).domain([new Date(2e3, 0, 1), new Date(2e3, 0, 2)]), arguments);
}
function uR() {
  return Rt.apply(Lm(W9, U9, Vs, Mm, Im, sE, Pm, Sm, En, gE).domain([Date.UTC(2e3, 0, 1), Date.UTC(2e3, 0, 2)]), arguments);
}
function Hs() {
  var e = 0, t = 1, r, n, i, a, o = st, u = !1, s;
  function l(f) {
    return f == null || isNaN(f = +f) ? s : o(i === 0 ? 0.5 : (f = (a(f) - r) * i, u ? Math.max(0, Math.min(1, f)) : f));
  }
  l.domain = function(f) {
    return arguments.length ? ([e, t] = f, r = a(e = +e), n = a(t = +t), i = r === n ? 0 : 1 / (n - r), l) : [e, t];
  }, l.clamp = function(f) {
    return arguments.length ? (u = !!f, l) : u;
  }, l.interpolator = function(f) {
    return arguments.length ? (o = f, l) : o;
  };
  function c(f) {
    return function(d) {
      var h, p;
      return arguments.length ? ([h, p] = d, o = f(h, p), l) : [o(0), o(1)];
    };
  }
  return l.range = c(qi), l.rangeRound = c(pm), l.unknown = function(f) {
    return arguments.length ? (s = f, l) : s;
  }, function(f) {
    return a = f, r = f(e), n = f(t), i = r === n ? 0 : 1 / (n - r), l;
  };
}
function on(e, t) {
  return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
}
function bE() {
  var e = an(Hs()(st));
  return e.copy = function() {
    return on(e, bE());
  }, Mr.apply(e, arguments);
}
function _E() {
  var e = bm(Hs()).domain([1, 10]);
  return e.copy = function() {
    return on(e, _E()).base(e.base());
  }, Mr.apply(e, arguments);
}
function wE() {
  var e = _m(Hs());
  return e.copy = function() {
    return on(e, wE()).constant(e.constant());
  }, Mr.apply(e, arguments);
}
function qm() {
  var e = wm(Hs());
  return e.copy = function() {
    return on(e, qm()).exponent(e.exponent());
  }, Mr.apply(e, arguments);
}
function sR() {
  return qm.apply(null, arguments).exponent(0.5);
}
function xE() {
  var e = [], t = st;
  function r(n) {
    if (n != null && !isNaN(n = +n)) return t((uo(e, n, 1) - 1) / (e.length - 1));
  }
  return r.domain = function(n) {
    if (!arguments.length) return e.slice();
    e = [];
    for (let i of n) i != null && !isNaN(i = +i) && e.push(i);
    return e.sort(oo), r;
  }, r.interpolator = function(n) {
    return arguments.length ? (t = n, r) : t;
  }, r.range = function() {
    return e.map((n, i) => t(i / (e.length - 1)));
  }, r.quantiles = function(n) {
    return Array.from({ length: n + 1 }, (i, a) => TM(e, a / n));
  }, r.copy = function() {
    return xE(t).domain(e);
  }, Mr.apply(r, arguments);
}
function Ks() {
  var e = 0, t = 0.5, r = 1, n = 1, i, a, o, u, s, l = st, c, f = !1, d;
  function h(v) {
    return isNaN(v = +v) ? d : (v = 0.5 + ((v = +c(v)) - a) * (n * v < n * a ? u : s), l(f ? Math.max(0, Math.min(1, v)) : v));
  }
  h.domain = function(v) {
    return arguments.length ? ([e, t, r] = v, i = c(e = +e), a = c(t = +t), o = c(r = +r), u = i === a ? 0 : 0.5 / (a - i), s = a === o ? 0 : 0.5 / (o - a), n = a < i ? -1 : 1, h) : [e, t, r];
  }, h.clamp = function(v) {
    return arguments.length ? (f = !!v, h) : f;
  }, h.interpolator = function(v) {
    return arguments.length ? (l = v, h) : l;
  };
  function p(v) {
    return function(m) {
      var y, b, g;
      return arguments.length ? ([y, b, g] = m, l = o9(v, [y, b, g]), h) : [l(0), l(0.5), l(1)];
    };
  }
  return h.range = p(qi), h.rangeRound = p(pm), h.unknown = function(v) {
    return arguments.length ? (d = v, h) : d;
  }, function(v) {
    return c = v, i = v(e), a = v(t), o = v(r), u = i === a ? 0 : 0.5 / (a - i), s = a === o ? 0 : 0.5 / (o - a), n = a < i ? -1 : 1, h;
  };
}
function AE() {
  var e = an(Ks()(st));
  return e.copy = function() {
    return on(e, AE());
  }, Mr.apply(e, arguments);
}
function OE() {
  var e = bm(Ks()).domain([0.1, 1, 10]);
  return e.copy = function() {
    return on(e, OE()).base(e.base());
  }, Mr.apply(e, arguments);
}
function SE() {
  var e = _m(Ks());
  return e.copy = function() {
    return on(e, SE()).constant(e.constant());
  }, Mr.apply(e, arguments);
}
function zm() {
  var e = wm(Ks());
  return e.copy = function() {
    return on(e, zm()).exponent(e.exponent());
  }, Mr.apply(e, arguments);
}
function lR() {
  return zm.apply(null, arguments).exponent(0.5);
}
const EE = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  scaleBand: fm,
  scaleDiverging: AE,
  scaleDivergingLog: OE,
  scaleDivergingPow: zm,
  scaleDivergingSqrt: lR,
  scaleDivergingSymlog: SE,
  scaleIdentity: eE,
  scaleImplicit: Qv,
  scaleLinear: JS,
  scaleLog: rE,
  scaleOrdinal: Vr,
  scalePoint: kM,
  scalePow: xm,
  scaleQuantile: aE,
  scaleQuantize: oE,
  scaleRadial: iE,
  scaleSequential: bE,
  scaleSequentialLog: _E,
  scaleSequentialPow: qm,
  scaleSequentialQuantile: xE,
  scaleSequentialSqrt: sR,
  scaleSequentialSymlog: wE,
  scaleSqrt: C9,
  scaleSymlog: nE,
  scaleThreshold: uE,
  scaleTime: oR,
  scaleUtc: uR,
  tickFormat: QS
}, Symbol.toStringTag, { value: "Module" }));
function cR(e) {
  var t = EE;
  if (e in t && typeof t[e] == "function")
    return t[e]();
  var r = "scale".concat(Ga(e));
  if (r in t && typeof t[r] == "function")
    return t[r]();
}
function Kb(e, t, r) {
  if (typeof e == "function")
    return e.copy().domain(t).range(r);
  if (e != null) {
    var n = cR(e);
    if (n != null)
      return n.domain(t).range(r), n;
  }
}
function Fm(e, t, r, n) {
  if (!(r == null || n == null))
    return typeof e.scale == "function" ? Kb(e.scale, r, n) : Kb(t, r, n);
}
function fR(e) {
  return "scale".concat(Ga(e));
}
function dR(e) {
  return fR(e) in EE;
}
var PE = (e, t, r) => {
  if (e != null) {
    var n = e.scale, i = e.type;
    if (n === "auto")
      return i === "category" && r && (r.indexOf("LineChart") >= 0 || r.indexOf("AreaChart") >= 0 || r.indexOf("ComposedChart") >= 0 && !t) ? "point" : i === "category" ? "band" : "linear";
    if (typeof n == "string")
      return dR(n) ? n : "point";
  }
};
function hR(e, t) {
  for (var r = 0, n = e.length, i = e[0] < e[e.length - 1]; r < n; ) {
    var a = Math.floor((r + n) / 2);
    (i ? e[a] < t : e[a] > t) ? r = a + 1 : n = a;
  }
  return r;
}
function TE(e, t) {
  if (e) {
    var r = t ?? e.domain(), n = r.map((a) => {
      var o;
      return (o = e(a)) !== null && o !== void 0 ? o : 0;
    }), i = e.range();
    if (!(r.length === 0 || i.length < 2))
      return (a) => {
        var o, u, s = hR(n, a);
        if (s <= 0)
          return r[0];
        if (s >= r.length)
          return r[r.length - 1];
        var l = (o = n[s - 1]) !== null && o !== void 0 ? o : 0, c = (u = n[s]) !== null && u !== void 0 ? u : 0;
        return Math.abs(a - l) <= Math.abs(a - c) ? r[s - 1] : r[s];
      };
  }
}
function vR(e) {
  if (e != null)
    return "invert" in e && typeof e.invert == "function" ? e.invert.bind(e) : TE(e, void 0);
}
function Gb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Wu(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Gb(Object(r), !0).forEach(function(n) {
      pR(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Gb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function pR(e, t, r) {
  return (t = mR(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function mR(e) {
  var t = yR(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function yR(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function CE(e, t) {
  return wR(e) || _R(e, t) || bR(e, t) || gR();
}
function gR() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function bR(e, t) {
  if (e) {
    if (typeof e == "string") return Yb(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? Yb(e, t) : void 0;
  }
}
function Yb(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function _R(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], s = !0, l = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(s = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (c) {
      l = !0, i = c;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function wR(e) {
  if (Array.isArray(e)) return e;
}
var tp = [0, "auto"], xR = {
  allowDataOverflow: !1,
  allowDecimals: !0,
  allowDuplicatedCategory: !0,
  angle: 0,
  dataKey: void 0,
  domain: void 0,
  height: 30,
  hide: !0,
  id: 0,
  includeHidden: !1,
  interval: "preserveEnd",
  minTickGap: 5,
  mirror: !1,
  name: void 0,
  orientation: "bottom",
  padding: {
    left: 0,
    right: 0
  },
  reversed: !1,
  scale: "auto",
  tick: !0,
  tickCount: 5,
  tickFormatter: void 0,
  ticks: void 0,
  type: "category",
  unit: void 0,
  niceTicks: "auto"
}, AR = (e, t) => e.cartesianAxis.xAxis[t], un = (e, t) => {
  var r = AR(e, t);
  return r ?? xR;
}, OR = {
  allowDataOverflow: !1,
  allowDecimals: !0,
  allowDuplicatedCategory: !0,
  angle: 0,
  dataKey: void 0,
  domain: tp,
  hide: !0,
  id: 0,
  includeHidden: !1,
  interval: "preserveEnd",
  minTickGap: 5,
  mirror: !1,
  name: void 0,
  orientation: "left",
  padding: {
    top: 0,
    bottom: 0
  },
  reversed: !1,
  scale: "auto",
  tick: !0,
  tickCount: 5,
  tickFormatter: void 0,
  ticks: void 0,
  type: "number",
  unit: void 0,
  niceTicks: "auto",
  width: eo
}, SR = (e, t) => e.cartesianAxis.yAxis[t], sn = (e, t) => {
  var r = SR(e, t);
  return r ?? OR;
}, ER = {
  domain: [0, "auto"],
  includeHidden: !1,
  reversed: !1,
  allowDataOverflow: !1,
  allowDuplicatedCategory: !1,
  dataKey: void 0,
  id: 0,
  name: "",
  range: [64, 64],
  scale: "auto",
  type: "number",
  unit: ""
}, Bm = (e, t) => {
  var r = e.cartesianAxis.zAxis[t];
  return r ?? ER;
}, Re = (e, t, r) => {
  switch (t) {
    case "xAxis":
      return un(e, r);
    case "yAxis":
      return sn(e, r);
    case "zAxis":
      return Bm(e, r);
    case "angleAxis":
      return am(e, r);
    case "radiusAxis":
      return om(e, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, PR = (e, t, r) => {
  switch (t) {
    case "xAxis":
      return un(e, r);
    case "yAxis":
      return sn(e, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, zi = (e, t, r) => {
  switch (t) {
    case "xAxis":
      return un(e, r);
    case "yAxis":
      return sn(e, r);
    case "angleAxis":
      return am(e, r);
    case "radiusAxis":
      return om(e, r);
    default:
      throw new Error("Unexpected axis type: ".concat(t));
  }
}, IE = (e) => e.graphicalItems.cartesianItems.some((t) => t.type === "bar") || e.graphicalItems.polarItems.some((t) => t.type === "radialBar");
function Wm(e, t) {
  return (r) => {
    switch (e) {
      case "xAxis":
        return "xAxisId" in r && r.xAxisId === t;
      case "yAxis":
        return "yAxisId" in r && r.yAxisId === t;
      case "zAxis":
        return "zAxisId" in r && r.zAxisId === t;
      case "angleAxis":
        return "angleAxisId" in r && r.angleAxisId === t;
      case "radiusAxis":
        return "radiusAxisId" in r && r.radiusAxisId === t;
      default:
        return !1;
    }
  };
}
var TR = (e) => e.graphicalItems.cartesianItems, CR = I([Ne, io], Wm), Um = (e, t, r) => e.filter(r).filter((n) => (t == null ? void 0 : t.includeHidden) === !0 ? !0 : !n.hide), Fi = I([TR, Re, CR], Um, {
  memoizeOptions: {
    resultEqualityCheck: Ls
  }
}), kE = I([Fi], (e) => e.filter((t) => t.type === "area" || t.type === "bar").filter(sm)), ME = (e) => e.filter((t) => !("stackId" in t) || t.stackId === void 0), IR = I([Fi], ME), Vm = (e) => e.map((t) => t.data).filter(Boolean).flat(1), kR = I([Fi], (e) => e.some((t) => !t.data)), NE = I([Fi], Vm, {
  memoizeOptions: {
    resultEqualityCheck: Ls
  }
}), Hm = (e, t) => {
  var r = t.chartData, n = r === void 0 ? [] : r, i = t.dataStartIndex, a = t.dataEndIndex;
  return e.length > 0 ? e : n.slice(i, a + 1);
}, Km = I([NE, $s], Hm), RE = (e, t, r) => (t == null ? void 0 : t.dataKey) != null ? e.map((n) => ({
  value: Ie(n, t.dataKey)
})) : r.length > 0 ? r.map((n) => n.dataKey).flatMap((n) => e.map((i) => ({
  value: Ie(i, n)
}))) : e.map((n) => ({
  value: n
})), $E = (e, t, r, n, i, a) => {
  var o = n.chartData, u = o === void 0 ? [] : o, s = n.dataStartIndex, l = n.dataEndIndex, c = RE(e, t, r);
  if (i && (t == null ? void 0 : t.dataKey) != null && a.length > 0) {
    var f = u.slice(s, l + 1), d = f.map((h) => ({
      value: Ie(h, t.dataKey)
    })).filter((h) => h.value != null);
    return [...d, ...c];
  }
  return c;
}, lo = I([Km, Re, Fi, $s, kR, NE], $E);
function gi(e) {
  if (Cr(e) || e instanceof Date) {
    var t = Number(e);
    if (_e(t))
      return t;
  }
}
function Xb(e) {
  if (Array.isArray(e)) {
    var t = [gi(e[0]), gi(e[1])];
    return ar(t) ? t : void 0;
  }
  var r = gi(e);
  if (r != null)
    return [r, r];
}
function Wt(e) {
  return e.map(gi).filter(tr);
}
function MR(e, t) {
  var r = gi(e), n = gi(t);
  return r == null && n == null ? 0 : r == null ? -1 : n == null ? 1 : r - n;
}
var NR = I([lo], (e) => e == null ? void 0 : e.map((t) => t.value).sort(MR));
function DE(e, t) {
  switch (e) {
    case "xAxis":
      return t.direction === "x";
    case "yAxis":
      return t.direction === "y";
    default:
      return !1;
  }
}
function RR(e, t, r) {
  if (!r)
    return [];
  if (!r.length)
    return [];
  var n;
  if (typeof t == "number" && !Tr(t))
    n = t;
  else if (Array.isArray(t)) {
    var i = Wt(t);
    i.length > 0 && (n = Math.max(...i));
  }
  return n == null ? [] : Wt(r.flatMap((a) => {
    var o = Ie(e, a.dataKey), u, s;
    if (Array.isArray(o)) {
      var l = CE(o, 2);
      u = l[0], s = l[1];
    } else
      u = s = o;
    if (!(!_e(u) || !_e(s)))
      return [n - u, n + s];
  }));
}
var We = (e) => {
  var t = Ye(e), r = ji(e);
  return zi(e, t, r);
}, Ii = I([We], (e) => e == null ? void 0 : e.dataKey), $R = I([kE, $s, We], LS), jE = (e, t, r, n) => {
  var i = {}, a = t.reduce((o, u) => {
    if (u.stackId == null)
      return o;
    var s = o[u.stackId];
    return s == null && (s = []), s.push(u), o[u.stackId] = s, o;
  }, i);
  return Object.fromEntries(Object.entries(a).map((o) => {
    var u = CE(o, 2), s = u[0], l = u[1], c = n ? [...l].reverse() : l, f = c.map(jS);
    return [s, {
      // @ts-expect-error getStackedData requires that the input is array of objects, Recharts does not test for that
      stackedData: E6(e, f, r),
      graphicalItems: c
    }];
  }));
}, DR = I([$R, kE, no, CS], jE), LE = (e, t, r, n) => {
  var i = t.dataStartIndex, a = t.dataEndIndex;
  if (n == null && r !== "zAxis")
    return C6(e, i, a);
}, jR = I([Re], (e) => e.allowDataOverflow), Gm = (e) => {
  var t;
  if (e == null || !("domain" in e))
    return tp;
  if (e.domain != null)
    return e.domain;
  if ("ticks" in e && e.ticks != null) {
    if (e.type === "number") {
      var r = Wt(e.ticks);
      return [Math.min(...r), Math.max(...r)];
    }
    if (e.type === "category")
      return e.ticks.map(String);
  }
  return (t = e == null ? void 0 : e.domain) !== null && t !== void 0 ? t : tp;
}, Ym = I([Re], Gm), Xm = I([Ym, jR], gS), LR = I([DR, hr, Ne, Xm], LE, {
  memoizeOptions: {
    resultEqualityCheck: ao
  }
}), Gs = (e) => e.errorBars, qR = (e, t, r) => e.flatMap((n) => t[n.id]).filter(Boolean).filter((n) => DE(r, n)), Uu = function() {
  for (var t = arguments.length, r = new Array(t), n = 0; n < t; n++)
    r[n] = arguments[n];
  var i = r.filter(Boolean);
  if (i.length !== 0) {
    var a = i.flat(), o = Math.min(...a), u = Math.max(...a);
    return [o, u];
  }
}, Zm = function(t, r, n, i, a) {
  var o = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : [], u, s;
  if (n.length > 0 && n.forEach((l) => {
    var c, f = l.data != null ? [...l.data] : o, d = (c = i[l.id]) === null || c === void 0 ? void 0 : c.filter((h) => DE(a, h));
    f.forEach((h) => {
      var p, v = Ie(h, (p = r.dataKey) !== null && p !== void 0 ? p : l.dataKey), m = RR(h, v, d);
      if (m.length >= 2) {
        var y = Math.min(...m), b = Math.max(...m);
        (u == null || y < u) && (u = y), (s == null || b > s) && (s = b);
      }
      var g = Xb(v);
      g != null && (u = u == null ? g[0] : Math.min(u, g[0]), s = s == null ? g[1] : Math.max(s, g[1]));
    });
  }), (r == null ? void 0 : r.dataKey) != null && n.length === 0 && t.forEach((l) => {
    var c = Xb(Ie(l, r.dataKey));
    c != null && (u = u == null ? c[0] : Math.min(u, c[0]), s = s == null ? c[1] : Math.max(s, c[1]));
  }), _e(u) && _e(s))
    return [u, s];
}, zR = I([Km, Re, IR, Gs, Ne, Qk], Zm, {
  memoizeOptions: {
    resultEqualityCheck: ao
  }
});
function FR(e) {
  var t = e.value;
  if (Cr(t) || t instanceof Date)
    return t;
}
var BR = (e, t, r) => {
  var n = e.map(FR).filter((i) => i != null);
  return r && (t.dataKey == null || t.allowDuplicatedCategory && gA(n)) ? yS(0, e.length) : t.allowDuplicatedCategory ? n : Array.from(new Set(n));
}, qE = (e) => e.referenceElements.dots, Bi = (e, t, r) => e.filter((n) => n.ifOverflow === "extendDomain").filter((n) => t === "xAxis" ? n.xAxisId === r : n.yAxisId === r), WR = I([qE, Ne, io], Bi), zE = (e) => e.referenceElements.areas, UR = I([zE, Ne, io], Bi), FE = (e) => e.referenceElements.lines, VR = I([FE, Ne, io], Bi), BE = (e, t) => {
  if (e != null) {
    var r = Wt(e.map((n) => t === "xAxis" ? n.x : n.y));
    if (r.length !== 0)
      return [Math.min(...r), Math.max(...r)];
  }
}, HR = I(WR, Ne, BE), WE = (e, t) => {
  if (e != null) {
    var r = Wt(e.flatMap((n) => [t === "xAxis" ? n.x1 : n.y1, t === "xAxis" ? n.x2 : n.y2]));
    if (r.length !== 0)
      return [Math.min(...r), Math.max(...r)];
  }
}, KR = I([UR, Ne], WE);
function GR(e) {
  var t;
  if (e.x != null)
    return Wt([e.x]);
  var r = (t = e.segment) === null || t === void 0 ? void 0 : t.map((n) => n.x);
  return r == null || r.length === 0 ? [] : Wt(r);
}
function YR(e) {
  var t;
  if (e.y != null)
    return Wt([e.y]);
  var r = (t = e.segment) === null || t === void 0 ? void 0 : t.map((n) => n.y);
  return r == null || r.length === 0 ? [] : Wt(r);
}
var UE = (e, t) => {
  if (e != null) {
    var r = e.flatMap((n) => t === "xAxis" ? GR(n) : YR(n));
    if (r.length !== 0)
      return [Math.min(...r), Math.max(...r)];
  }
}, XR = I([VR, Ne], UE), ZR = I(HR, XR, KR, (e, t, r) => Uu(e, r, t)), Qm = (e, t, r, n, i, a, o, u, s) => {
  if (r != null)
    return r;
  var l = o === "vertical" && u === "xAxis" || o === "horizontal" && u === "yAxis", c = l ? Uu(n, a, i) : Uu(a, i), f = aM(t, c, e.allowDataOverflow);
  return f ?? (e.allowDataOverflow && c == null && s != null ? s : f);
}, QR = (e) => {
  if (!(e == null || e.type !== "number" || !("ticks" in e) || e.ticks == null)) {
    var t = Wt(e.ticks);
    if (t.length !== 0)
      return [Math.min(...t), Math.max(...t)];
  }
}, JR = I([Re], QR, {
  memoizeOptions: {
    resultEqualityCheck: ao
  }
}), e$ = I([Re, Ym, Xm, LR, zR, ZR, Me, Ne, JR], Qm, {
  memoizeOptions: {
    resultEqualityCheck: ao
  }
}), t$ = [0, 1], Jm = (e, t, r, n, i, a, o) => {
  if (!((e == null || r == null || r.length === 0) && o === void 0)) {
    var u = e.dataKey, s = e.type, l = rn(t, a);
    if (l && u == null) {
      var c;
      return yS(0, (c = r == null ? void 0 : r.length) !== null && c !== void 0 ? c : 0);
    }
    return s === "category" ? BR(n, e, l) : i === "expand" && !l ? t$ : o;
  }
}, ey = I([Re, Me, Km, lo, no, Ne, e$], Jm), ln = I([Re, IE, rm], PE), ty = (e, t, r) => {
  var n = t.niceTicks;
  if (n !== "none") {
    var i = Gm(t), a = Array.isArray(i) && (i[0] === "auto" || i[1] === "auto");
    if ((n === "snap125" || n === "adaptive") && t != null && t.tickCount && ar(e)) {
      if (a)
        return ib(e, t.tickCount, t.allowDecimals, n);
      if (t.type === "number")
        return ab(e, t.tickCount, t.allowDecimals, n);
    }
    if (n === "auto" && r === "linear" && t != null && t.tickCount) {
      if (a && ar(e))
        return ib(e, t.tickCount, t.allowDecimals, "adaptive");
      if (t.type === "number" && ar(e))
        return ab(e, t.tickCount, t.allowDecimals, "adaptive");
    }
  }
}, ry = I([ey, zi, ln], ty), ny = (e, t, r, n) => {
  if (
    /*
     * Angle axis for some reason uses nice ticks when rendering axis tick labels,
     * but doesn't use nice ticks for extending domain like all the other axes do.
     * Not really sure why? Is there a good reason,
     * or is it just because someone added support for nice ticks to the other axes and forgot this one?
     */
    n !== "angleAxis" && (e == null ? void 0 : e.type) === "number" && ar(t) && Array.isArray(r) && r.length > 0
  ) {
    var i, a, o = t[0], u = (i = r[0]) !== null && i !== void 0 ? i : 0, s = t[1], l = (a = r[r.length - 1]) !== null && a !== void 0 ? a : 0;
    return [Math.min(o, u), Math.max(s, l)];
  }
  return t;
}, r$ = I([Re, ey, ry, Ne], ny), n$ = I(lo, Re, (e, t) => {
  if (!(!t || t.type !== "number")) {
    var r = 1 / 0, n = Array.from(Wt(e.map((f) => f.value))).sort((f, d) => f - d), i = n[0], a = n[n.length - 1];
    if (i == null || a == null)
      return 1 / 0;
    var o = a - i;
    if (o === 0)
      return 1 / 0;
    for (var u = 0; u < n.length - 1; u++) {
      var s = n[u], l = n[u + 1];
      if (!(s == null || l == null)) {
        var c = l - s;
        r = Math.min(r, c);
      }
    }
    return r / o;
  }
}), VE = I(n$, Me, vM, Ge, (e, t, r, n, i) => i, (e, t, r, n, i) => {
  if (!_e(e))
    return 0;
  var a = t === "vertical" ? n.height : n.width;
  if (i === "gap")
    return e * a / 2;
  if (i === "no-gap") {
    var o = mt(r, e * a), u = e * a / 2;
    return u - o - (u - o) / a * o;
  }
  return 0;
}), i$ = (e, t, r) => {
  var n = un(e, t);
  return n == null || typeof n.padding != "string" ? 0 : VE(e, "xAxis", t, r, n.padding);
}, a$ = (e, t, r) => {
  var n = sn(e, t);
  return n == null || typeof n.padding != "string" ? 0 : VE(e, "yAxis", t, r, n.padding);
}, o$ = I(un, i$, (e, t) => {
  var r, n;
  if (e == null)
    return {
      left: 0,
      right: 0
    };
  var i = e.padding;
  return typeof i == "string" ? {
    left: t,
    right: t
  } : {
    left: ((r = i.left) !== null && r !== void 0 ? r : 0) + t,
    right: ((n = i.right) !== null && n !== void 0 ? n : 0) + t
  };
}), u$ = I(sn, a$, (e, t) => {
  var r, n;
  if (e == null)
    return {
      top: 0,
      bottom: 0
    };
  var i = e.padding;
  return typeof i == "string" ? {
    top: t,
    bottom: t
  } : {
    top: ((r = i.top) !== null && r !== void 0 ? r : 0) + t,
    bottom: ((n = i.bottom) !== null && n !== void 0 ? n : 0) + t
  };
}), s$ = I([Ge, o$, Is, Cs, (e, t, r) => r], (e, t, r, n, i) => {
  var a = n.padding;
  return i ? [a.left, r.width - a.right] : [e.left + t.left, e.left + e.width - t.right];
}), l$ = I([Ge, Me, u$, Is, Cs, (e, t, r) => r], (e, t, r, n, i, a) => {
  var o = i.padding;
  return a ? [n.height - o.bottom, o.top] : t === "horizontal" ? [e.top + e.height - r.bottom, e.top + r.top] : [e.top + r.top, e.top + e.height - r.bottom];
}), co = (e, t, r, n) => {
  var i;
  switch (t) {
    case "xAxis":
      return s$(e, r, n);
    case "yAxis":
      return l$(e, r, n);
    case "zAxis":
      return (i = Bm(e, r)) === null || i === void 0 ? void 0 : i.range;
    case "angleAxis":
      return RS(e);
    case "radiusAxis":
      return $S(e, r);
    default:
      return;
  }
}, HE = I([Re, co], Ds), c$ = I([ln, r$], qS), iy = I([Re, ln, c$, HE], Fm), KE = (e, t, r, n) => {
  if (!(r == null || r.dataKey == null)) {
    var i = r.type, a = r.scale, o = rn(e, n);
    if (o && (i === "number" || a !== "auto"))
      return t.map((u) => u.value);
  }
}, ay = I([Me, lo, zi, Ne], KE), Ys = I([iy], lm);
I([iy], vR);
I([iy, NR], TE);
I([Fi, Gs, Ne], qR);
function GE(e, t) {
  return e.id < t.id ? -1 : e.id > t.id ? 1 : 0;
}
var Xs = (e, t) => t, Zs = (e, t, r) => r, f$ = I(Ps, Xs, Zs, (e, t, r) => e.filter((n) => n.orientation === t).filter((n) => n.mirror === r).sort(GE)), d$ = I(Ts, Xs, Zs, (e, t, r) => e.filter((n) => n.orientation === t).filter((n) => n.mirror === r).sort(GE)), YE = (e, t) => {
  var r = typeof t.height == "number" ? t.height : Gp;
  return {
    width: e.width,
    height: r
  };
}, h$ = (e, t) => {
  var r = typeof t.width == "number" ? t.width : eo;
  return {
    width: r,
    height: e.height
  };
};
I(Ge, un, YE);
var v$ = (e, t, r) => {
  switch (t) {
    case "top":
      return e.top;
    case "bottom":
      return r - e.bottom;
    default:
      return 0;
  }
}, p$ = (e, t, r) => {
  switch (t) {
    case "left":
      return e.left;
    case "right":
      return r - e.right;
    default:
      return 0;
  }
}, m$ = I(dr, Ge, f$, Xs, Zs, (e, t, r, n, i) => {
  var a = {}, o;
  return r.forEach((u) => {
    var s = YE(t, u);
    o == null && (o = v$(t, n, e));
    var l = n === "top" && !i || n === "bottom" && i;
    a[u.id] = o - Number(l) * s.height, o += (l ? -1 : 1) * s.height;
  }), a;
}), y$ = I(fr, Ge, d$, Xs, Zs, (e, t, r, n, i) => {
  var a = {}, o;
  return r.forEach((u) => {
    var s = h$(t, u);
    o == null && (o = p$(t, n, e));
    var l = n === "left" && !i || n === "right" && i;
    a[u.id] = o - Number(l) * s.width, o += (l ? -1 : 1) * s.width;
  }), a;
}), g$ = (e, t) => {
  var r = un(e, t);
  if (r != null)
    return m$(e, r.orientation, r.mirror);
};
I([Ge, un, g$, (e, t) => t], (e, t, r, n) => {
  if (t != null) {
    var i = r == null ? void 0 : r[n];
    return i == null ? {
      x: e.left,
      y: 0
    } : {
      x: e.left,
      y: i
    };
  }
});
var b$ = (e, t) => {
  var r = sn(e, t);
  if (r != null)
    return y$(e, r.orientation, r.mirror);
};
I([Ge, sn, b$, (e, t) => t], (e, t, r, n) => {
  if (t != null) {
    var i = r == null ? void 0 : r[n];
    return i == null ? {
      x: 0,
      y: e.top
    } : {
      x: i,
      y: e.top
    };
  }
});
I(Ge, sn, (e, t) => {
  var r = typeof t.width == "number" ? t.width : eo;
  return {
    width: r,
    height: e.height
  };
});
var XE = (e, t, r, n) => {
  if (r != null) {
    var i = r.allowDuplicatedCategory, a = r.type, o = r.dataKey, u = rn(e, n), s = t.map((c) => c.value), l = s.filter((c) => c != null);
    if (o && u && a === "category" && i && gA(l))
      return s;
  }
}, oy = I([Me, lo, Re, Ne], XE);
I([Me, PR, ln, Ys, oy, ay, co, ry, Ne], (e, t, r, n, i, a, o, u, s) => {
  if (t != null) {
    var l = rn(e, s);
    return {
      angle: t.angle,
      interval: t.interval,
      minTickGap: t.minTickGap,
      orientation: t.orientation,
      tick: t.tick,
      tickCount: t.tickCount,
      tickFormatter: t.tickFormatter,
      ticks: t.ticks,
      type: t.type,
      unit: t.unit,
      axisType: s,
      categoricalDomain: a,
      duplicateDomain: i,
      isCategorical: l,
      niceTicks: u,
      range: o,
      realScaleType: r,
      scale: n
    };
  }
});
var _$ = (e, t, r, n, i, a, o, u, s) => {
  if (!(t == null || n == null)) {
    var l = rn(e, s), c = t.type, f = t.ticks, d = t.tickCount, h = (
      // @ts-expect-error This is testing for `scaleBand` but for band axis the type is reported as `band` so this looks like a dead code with a workaround elsewhere?
      r === "scaleBand" && typeof n.bandwidth == "function" ? n.bandwidth() / 2 : 2
    ), p = c === "category" && n.bandwidth ? n.bandwidth() / h : 0;
    p = s === "angleAxis" && a != null && a.length >= 2 ? ft(a[0] - a[1]) * 2 * p : p;
    var v = f || i;
    return v ? v.map((m, y) => {
      var b = o ? o.indexOf(m) : m, g = n.map(b);
      return _e(g) ? {
        index: y,
        coordinate: g + p,
        value: m,
        offset: p
      } : null;
    }).filter(tr) : l && u ? u.map((m, y) => {
      var b = n.map(m);
      return _e(b) ? {
        coordinate: b + p,
        value: m,
        index: y,
        offset: p
      } : null;
    }).filter(tr) : n.ticks ? n.ticks(d).map((m, y) => {
      var b = n.map(m);
      return _e(b) ? {
        coordinate: b + p,
        value: m,
        index: y,
        offset: p
      } : null;
    }).filter(tr) : n.domain().map((m, y) => {
      var b = n.map(m);
      return _e(b) ? {
        coordinate: b + p,
        // @ts-expect-error can't use Date as index
        value: o ? o[m] : m,
        index: y,
        offset: p
      } : null;
    }).filter(tr);
  }
};
I([Me, zi, ln, Ys, ry, co, oy, ay, Ne], _$);
var w$ = (e, t, r, n, i, a, o) => {
  if (!(t == null || r == null || n == null || n[0] === n[1])) {
    var u = rn(e, o), s = t.tickCount, l = 0;
    return l = o === "angleAxis" && (n == null ? void 0 : n.length) >= 2 ? ft(n[0] - n[1]) * 2 * l : l, u && a ? a.map((c, f) => {
      var d = r.map(c);
      return _e(d) ? {
        coordinate: d + l,
        value: c,
        index: f,
        offset: l
      } : null;
    }).filter(tr) : r.ticks ? r.ticks(s).map((c, f) => {
      var d = r.map(c);
      return _e(d) ? {
        coordinate: d + l,
        value: c,
        index: f,
        offset: l
      } : null;
    }).filter(tr) : r.domain().map((c, f) => {
      var d = r.map(c);
      return _e(d) ? {
        coordinate: d + l,
        // @ts-expect-error can't use unknown as index
        value: i ? i[c] : c,
        index: f,
        offset: l
      } : null;
    }).filter(tr);
  }
};
I([Me, zi, Ys, co, oy, ay, Ne], w$);
I(Re, Ys, (e, t) => {
  if (!(e == null || t == null))
    return Wu(Wu({}, e), {}, {
      scale: t
    });
});
var x$ = I([Re, ln, ey, HE], Fm), A$ = I([x$], lm);
I((e, t, r) => Bm(e, r), A$, (e, t) => {
  if (!(e == null || t == null))
    return Wu(Wu({}, e), {}, {
      scale: t
    });
});
var O$ = I([Me, Ps, Ts], (e, t, r) => {
  switch (e) {
    case "horizontal":
      return t.some((n) => n.reversed) ? "right-to-left" : "left-to-right";
    case "vertical":
      return r.some((n) => n.reversed) ? "bottom-to-top" : "top-to-bottom";
    // TODO: make this better. For now, right arrow triggers "forward", left arrow "back"
    // however, the tooltip moves an unintuitive direction because of how the indices are rendered
    case "centric":
    case "radial":
      return "left-to-right";
    default:
      return;
  }
}), S$ = (e, t, r) => {
  var n;
  return (n = e.renderedTicks[t]) === null || n === void 0 ? void 0 : n[r];
};
I([S$], (e) => {
  if (!(!e || e.length === 0))
    return (t) => {
      var r, n = 1 / 0, i = e[0];
      for (var a of e) {
        var o = Math.abs(a.coordinate - t);
        o < n && (n = o, i = a);
      }
      return (r = i) === null || r === void 0 ? void 0 : r.value;
    };
});
var ZE = (e) => e.options.defaultTooltipEventType, QE = (e) => e.options.validateTooltipEventTypes;
function JE(e, t, r) {
  if (e == null)
    return t;
  var n = e ? "axis" : "item";
  return r == null ? t : r.includes(n) ? n : t;
}
function fo(e, t) {
  var r = ZE(e), n = QE(e);
  return JE(t, r, n);
}
function E$(e) {
  return te((t) => fo(t, e));
}
var eP = (e, t) => {
  var r, n = Number(t);
  if (!(Tr(n) || t == null))
    return n >= 0 ? e == null || (r = e[n]) === null || r === void 0 ? void 0 : r.value : void 0;
}, P$ = (e) => e.tooltip.settings, Wr = {
  active: !1,
  index: null,
  dataKey: void 0,
  graphicalItemId: void 0,
  coordinate: void 0
}, T$ = {
  itemInteraction: {
    click: Wr,
    hover: Wr
  },
  axisInteraction: {
    click: Wr,
    hover: Wr
  },
  keyboardInteraction: Wr,
  syncInteraction: {
    active: !1,
    index: null,
    dataKey: void 0,
    label: void 0,
    coordinate: void 0,
    sourceViewBox: void 0,
    graphicalItemId: void 0
  },
  tooltipItemPayloads: [],
  settings: {
    shared: void 0,
    trigger: "hover",
    axisId: 0,
    active: !1,
    defaultIndex: void 0
  }
}, tP = ot({
  name: "tooltip",
  initialState: T$,
  reducers: {
    addTooltipEntrySettings: {
      reducer(e, t) {
        e.tooltipItemPayloads.push(se(t.payload));
      },
      prepare: Pe()
    },
    replaceTooltipEntrySettings: {
      reducer(e, t) {
        var r = t.payload, n = r.prev, i = r.next, a = Tt(e).tooltipItemPayloads.indexOf(se(n));
        a > -1 && (e.tooltipItemPayloads[a] = se(i));
      },
      prepare: Pe()
    },
    removeTooltipEntrySettings: {
      reducer(e, t) {
        var r = Tt(e).tooltipItemPayloads.indexOf(se(t.payload));
        r > -1 && e.tooltipItemPayloads.splice(r, 1);
      },
      prepare: Pe()
    },
    setTooltipSettingsState(e, t) {
      e.settings = t.payload;
    },
    setActiveMouseOverItemIndex(e, t) {
      e.syncInteraction.active = !1, e.syncInteraction.sourceViewBox = void 0, e.keyboardInteraction.active = !1, e.itemInteraction.hover.active = !0, e.itemInteraction.hover.index = t.payload.activeIndex, e.itemInteraction.hover.dataKey = t.payload.activeDataKey, e.itemInteraction.hover.graphicalItemId = t.payload.activeGraphicalItemId, e.itemInteraction.hover.coordinate = t.payload.activeCoordinate;
    },
    mouseLeaveChart(e) {
      e.itemInteraction.hover.active = !1, e.axisInteraction.hover.active = !1;
    },
    mouseLeaveItem(e) {
      e.itemInteraction.hover.active = !1;
    },
    setActiveClickItemIndex(e, t) {
      e.syncInteraction.active = !1, e.syncInteraction.sourceViewBox = void 0, e.itemInteraction.click.active = !0, e.keyboardInteraction.active = !1, e.itemInteraction.click.index = t.payload.activeIndex, e.itemInteraction.click.dataKey = t.payload.activeDataKey, e.itemInteraction.click.graphicalItemId = t.payload.activeGraphicalItemId, e.itemInteraction.click.coordinate = t.payload.activeCoordinate;
    },
    setMouseOverAxisIndex(e, t) {
      e.syncInteraction.active = !1, e.syncInteraction.sourceViewBox = void 0, e.axisInteraction.hover.active = !0, e.keyboardInteraction.active = !1, e.axisInteraction.hover.index = t.payload.activeIndex, e.axisInteraction.hover.dataKey = t.payload.activeDataKey, e.axisInteraction.hover.coordinate = t.payload.activeCoordinate;
    },
    setMouseClickAxisIndex(e, t) {
      e.syncInteraction.active = !1, e.syncInteraction.sourceViewBox = void 0, e.keyboardInteraction.active = !1, e.axisInteraction.click.active = !0, e.axisInteraction.click.index = t.payload.activeIndex, e.axisInteraction.click.dataKey = t.payload.activeDataKey, e.axisInteraction.click.coordinate = t.payload.activeCoordinate;
    },
    setSyncInteraction(e, t) {
      e.syncInteraction = t.payload;
    },
    setKeyboardInteraction(e, t) {
      e.keyboardInteraction.active = t.payload.active, e.keyboardInteraction.index = t.payload.activeIndex, e.keyboardInteraction.coordinate = t.payload.activeCoordinate;
    }
  }
}), $t = tP.actions, C$ = $t.addTooltipEntrySettings, I$ = $t.replaceTooltipEntrySettings, k$ = $t.removeTooltipEntrySettings, M$ = $t.setTooltipSettingsState, rP = $t.setActiveMouseOverItemIndex, N$ = $t.mouseLeaveItem, nP = $t.mouseLeaveChart, R$ = $t.setActiveClickItemIndex, iP = $t.setMouseOverAxisIndex, $$ = $t.setMouseClickAxisIndex, pa = $t.setSyncInteraction, Vu = $t.setKeyboardInteraction, D$ = tP.reducer;
function Zb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Wo(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Zb(Object(r), !0).forEach(function(n) {
      j$(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Zb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function j$(e, t, r) {
  return (t = L$(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function L$(e) {
  var t = q$(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function q$(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function z$(e, t, r) {
  return t === "axis" ? r === "click" ? e.axisInteraction.click : e.axisInteraction.hover : r === "click" ? e.itemInteraction.click : e.itemInteraction.hover;
}
function F$(e) {
  return e.index != null;
}
var aP = (e, t, r, n) => {
  if (t == null)
    return Wr;
  var i = z$(e, t, r);
  if (i == null)
    return Wr;
  if (i.active)
    return i;
  if (e.keyboardInteraction.active)
    return e.keyboardInteraction;
  if (e.syncInteraction.active && e.syncInteraction.index != null)
    return e.syncInteraction;
  var a = e.settings.active === !0;
  if (F$(i)) {
    if (a)
      return Wo(Wo({}, i), {}, {
        active: !0
      });
  } else if (n != null)
    return {
      active: !0,
      coordinate: void 0,
      dataKey: void 0,
      index: n,
      graphicalItemId: void 0
    };
  return Wo(Wo({}, Wr), {}, {
    coordinate: i.coordinate
  });
};
function B$(e) {
  if (typeof e == "number")
    return Number.isFinite(e) ? e : void 0;
  if (e instanceof Date) {
    var t = e.valueOf();
    return Number.isFinite(t) ? t : void 0;
  }
  var r = Number(e);
  return Number.isFinite(r) ? r : void 0;
}
function W$(e, t) {
  var r = B$(e), n = t[0], i = t[1];
  if (r === void 0)
    return !1;
  var a = Math.min(n, i), o = Math.max(n, i);
  return r >= a && r <= o;
}
function U$(e, t, r) {
  if (r == null || t == null)
    return !0;
  var n = Ie(e, t);
  return n == null || !ar(r) ? !0 : W$(n, r);
}
var wa = (e, t, r, n) => {
  var i = e == null ? void 0 : e.index;
  if (i == null)
    return null;
  var a = Number(i);
  if (!_e(a))
    return i;
  var o = 0, u = 1 / 0;
  t.length > 0 && (u = t.length - 1);
  var s = Math.max(o, Math.min(a, u)), l = t[s];
  return l == null || U$(l, r, n) ? String(s) : null;
}, oP = (e, t, r, n, i, a, o) => {
  if (a != null) {
    var u = o[0], s = u == null ? void 0 : u.getPosition(a);
    if (s != null)
      return s;
    var l = i == null ? void 0 : i[Number(a)];
    if (l)
      switch (r) {
        case "horizontal":
          return {
            x: l.coordinate,
            y: (n.top + t) / 2
          };
        default:
          return {
            x: (n.left + e) / 2,
            y: l.coordinate
          };
      }
  }
}, uP = (e, t, r, n) => {
  if (t === "axis")
    return e.tooltipItemPayloads;
  if (e.tooltipItemPayloads.length === 0)
    return [];
  var i;
  if (r === "hover" ? i = e.itemInteraction.hover.graphicalItemId : i = e.itemInteraction.click.graphicalItemId, e.syncInteraction.active && i == null)
    return e.tooltipItemPayloads;
  if (i == null && (n != null || e.keyboardInteraction.active)) {
    var a = e.tooltipItemPayloads[0];
    return a != null ? [a] : [];
  }
  return e.tooltipItemPayloads.filter((o) => {
    var u;
    return ((u = o.settings) === null || u === void 0 ? void 0 : u.graphicalItemId) === i;
  });
}, sP = (e) => e.options.tooltipPayloadSearcher, Wi = (e) => e.tooltip;
function Qb(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Jb(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? Qb(Object(r), !0).forEach(function(n) {
      V$(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Qb(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function V$(e, t, r) {
  return (t = H$(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function H$(e) {
  var t = K$(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function K$(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function G$(e) {
  if (typeof e == "string" || typeof e == "number")
    return e;
}
function Y$(e) {
  if (typeof e == "string" || typeof e == "number" || typeof e == "boolean")
    return e;
}
function X$(e) {
  if (typeof e == "string" || typeof e == "number")
    return e;
  if (typeof e == "function")
    return (t) => e(t);
}
function e1(e) {
  if (typeof e == "string")
    return e;
}
function Z$(e) {
  if (!(e == null || typeof e != "object")) {
    var t = "name" in e ? G$(e.name) : void 0, r = "unit" in e ? Y$(e.unit) : void 0, n = "dataKey" in e ? X$(e.dataKey) : void 0, i = "payload" in e ? e.payload : void 0, a = "color" in e ? e1(e.color) : void 0, o = "fill" in e ? e1(e.fill) : void 0;
    return {
      name: t,
      unit: r,
      dataKey: n,
      payload: i,
      color: a,
      fill: o
    };
  }
}
function Q$(e, t) {
  return e ?? t;
}
var lP = (e, t, r, n, i, a, o) => {
  if (!(t == null || a == null)) {
    var u = r.chartData, s = r.computedData, l = r.dataStartIndex, c = r.dataEndIndex, f = [];
    return e.reduce((d, h) => {
      var p, v = h.dataDefinedOnItem, m = h.settings, y = Q$(v, u), b = Array.isArray(y) ? GO(y, l, c) : y, g = (p = m == null ? void 0 : m.dataKey) !== null && p !== void 0 ? p : n, _ = m == null ? void 0 : m.nameKey, x;
      if (n && Array.isArray(b) && /*
       * findEntryInArray won't work for Scatter because Scatter provides an array of arrays
       * as tooltip payloads and findEntryInArray is not prepared to handle that.
       * Sad but also ScatterChart only allows 'item' tooltipEventType
       * and also this is only a problem if there are multiple Scatters and each has its own data array
       * so let's fix that some other time.
       */
      !Array.isArray(b[0]) && /*
       * If the tooltipEventType is 'axis', we should search for the dataKey in the sliced data
       * because thanks to allowDuplicatedCategory=false, the order of elements in the array
       * no longer matches the order of elements in the original data
       * and so we need to search by the active dataKey + label rather than by index.
       *
       * The same happens if multiple graphical items are present in the chart
       * and each of them has its own data array. Those arrays get concatenated
       * and again the tooltip index no longer matches the original data.
       *
       * On the other hand the tooltipEventType 'item' should always search by index
       * because we get the index from interacting over the individual elements
       * which is always accurate, irrespective of the allowDuplicatedCategory setting.
       */
      o === "axis" ? (x = II(b, n, i), x == null && (x = a(b, t, s, _))) : x = a(b, t, s, _), Array.isArray(x))
        x.forEach((A) => {
          var P, T, C = Z$(A), O = C == null ? void 0 : C.name, D = C == null ? void 0 : C.dataKey, j = C == null ? void 0 : C.payload, z = Jb(Jb({}, m), {}, {
            name: O,
            unit: C == null ? void 0 : C.unit,
            // Preserve item-level color/fill from graphical items.
            color: (P = C == null ? void 0 : C.color) !== null && P !== void 0 ? P : m == null ? void 0 : m.color,
            fill: (T = C == null ? void 0 : C.fill) !== null && T !== void 0 ? T : m == null ? void 0 : m.fill
          });
          d.push(Yg({
            tooltipEntrySettings: z,
            dataKey: D,
            payload: j,
            value: Ie(j, D),
            name: O == null ? void 0 : String(O)
          }));
        });
      else {
        var w;
        d.push(Yg({
          tooltipEntrySettings: m,
          dataKey: g,
          payload: x,
          // getValueByDataKey does not validate the output type
          value: Ie(x, g),
          // getValueByDataKey does not validate the output type
          name: (w = Ie(x, _)) !== null && w !== void 0 ? w : m == null ? void 0 : m.name
        }));
      }
      return d;
    }, f);
  }
}, uy = I([We, IE, rm], PE), J$ = I([(e) => e.graphicalItems.cartesianItems, (e) => e.graphicalItems.polarItems], (e, t) => [...e, ...t]), eD = I([Ye, ji], Wm), Zn = I([J$, We, eD], Um, {
  memoizeOptions: {
    resultEqualityCheck: Ls
  }
}), tD = I([Zn], (e) => e.filter(sm)), cP = I([Zn], Vm, {
  memoizeOptions: {
    resultEqualityCheck: Ls
  }
}), rD = I([Zn], (e) => e.some((t) => !t.data)), zn = I([cP, hr], Hm), nD = I([tD, hr, We], LS), sy = I([zn, We, Zn, hr, rD, cP], $E), fP = I([We], Gm), iD = I([We], (e) => e.allowDataOverflow), dP = I([fP, iD], gS), aD = I([Zn], (e) => e.filter(sm)), oD = I([nD, aD, no, CS], jE), uD = I([oD, hr, Ye, dP], LE), sD = I([Zn], ME), lD = I([zn, We, sD, Gs, Ye, eM], Zm, {
  memoizeOptions: {
    resultEqualityCheck: ao
  }
}), cD = I([qE, Ye, ji], Bi), fD = I([cD, Ye], BE), dD = I([zE, Ye, ji], Bi), hD = I([dD, Ye], WE), vD = I([FE, Ye, ji], Bi), pD = I([vD, Ye], UE), mD = I([fD, pD, hD], Uu), yD = I([We, fP, dP, uD, lD, mD, Me, Ye], Qm), ki = I([We, Me, zn, sy, no, Ye, yD], Jm), gD = I([ki, We, uy], ty), bD = I([We, ki, gD, Ye], ny), hP = (e) => {
  var t = Ye(e), r = ji(e), n = !1;
  return co(e, t, r, n);
}, vP = I([We, hP], Ds), _D = I([We, uy, bD, vP], Fm), pP = I([_D], lm), wD = I([Me, sy, We, Ye], XE), xD = I([Me, sy, We, Ye], KE), AD = (e, t, r, n, i, a, o, u) => {
  if (t) {
    var s = t.type, l = rn(e, u);
    if (n) {
      var c = r === "scaleBand" && n.bandwidth ? n.bandwidth() / 2 : 2, f = s === "category" && n.bandwidth ? n.bandwidth() / c : 0;
      return f = u === "angleAxis" && i != null && (i == null ? void 0 : i.length) >= 2 ? ft(i[0] - i[1]) * 2 * f : f, l && o ? o.map((d, h) => {
        var p = n.map(d);
        return _e(p) ? {
          coordinate: p + f,
          value: d,
          index: h,
          offset: f
        } : null;
      }).filter(tr) : n.domain().map((d, h) => {
        var p = n.map(d);
        return _e(p) ? {
          coordinate: p + f,
          // @ts-expect-error can't use Date as an index
          value: a ? a[d] : d,
          index: h,
          offset: f
        } : null;
      }).filter(tr);
    }
  }
}, Rr = I([Me, We, uy, pP, hP, wD, xD, Ye], AD), ly = I([ZE, QE, P$], (e, t, r) => JE(r.shared, e, t)), mP = (e) => e.tooltip.settings.trigger, cy = (e) => e.tooltip.settings.defaultIndex, ho = I([Wi, ly, mP, cy], aP), Fa = I([ho, zn, Ii, ki], wa), yP = I([Rr, Fa], eP), gP = I([ho], (e) => {
  if (e)
    return e.dataKey;
}), bP = I([ho], (e) => {
  if (e)
    return e.graphicalItemId;
}), _P = I([Wi, ly, mP, cy], uP), OD = I([fr, dr, Me, Ge, Rr, cy, _P], oP), SD = I([ho, OD], (e, t) => e != null && e.coordinate ? e.coordinate : t), ED = I([ho], (e) => {
  var t;
  return (t = e == null ? void 0 : e.active) !== null && t !== void 0 ? t : !1;
}), PD = I([_P, Fa, hr, Ii, yP, sP, ly], lP);
I([PD], (e) => {
  if (e != null) {
    var t = e.map((r) => r.payload).filter((r) => r != null);
    return Array.from(new Set(t));
  }
});
function t1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function r1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? t1(Object(r), !0).forEach(function(n) {
      TD(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : t1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function TD(e, t, r) {
  return (t = CD(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function CD(e) {
  var t = ID(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function ID(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var kD = () => te(We), MD = () => {
  var e = kD(), t = te(Rr), r = te(pP);
  return Gg(!e || !r ? void 0 : r1(r1({}, e), {}, {
    scale: r
  }), t);
};
function n1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function ui(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? n1(Object(r), !0).forEach(function(n) {
      ND(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : n1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function ND(e, t, r) {
  return (t = RD(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function RD(e) {
  var t = $D(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function $D(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var DD = (e, t, r, n) => {
  var i = t.find((a) => a && a.index === r);
  if (i) {
    if (e === "horizontal")
      return {
        x: i.coordinate,
        y: n.relativeY
      };
    if (e === "vertical")
      return {
        x: n.relativeX,
        y: i.coordinate
      };
  }
  return {
    x: 0,
    y: 0
  };
}, jD = (e, t, r, n) => {
  var i = t.find((l) => l && l.index === r);
  if (i) {
    if (e === "centric") {
      var a = i.coordinate, o = n.radius;
      return ui(ui(ui({}, n), Le(n.cx, n.cy, o, a)), {}, {
        angle: a,
        radius: o
      });
    }
    var u = i.coordinate, s = n.angle;
    return ui(ui(ui({}, n), Le(n.cx, n.cy, u, s)), {}, {
      angle: s,
      radius: u
    });
  }
  return {
    angle: 0,
    clockWise: !1,
    cx: 0,
    cy: 0,
    endAngle: 0,
    innerRadius: 0,
    outerRadius: 0,
    radius: 0,
    startAngle: 0,
    x: 0,
    y: 0
  };
};
function LD(e, t) {
  var r = e.relativeX, n = e.relativeY;
  return r >= t.left && r <= t.left + t.width && n >= t.top && n <= t.top + t.height;
}
var wP = (e, t, r, n, i) => {
  var a, o = (a = t == null ? void 0 : t.length) !== null && a !== void 0 ? a : 0;
  if (o <= 1 || e == null)
    return 0;
  if (n === "angleAxis" && i != null && Math.abs(Math.abs(i[1] - i[0]) - 360) <= 1e-6)
    for (var u = i[1] - i[0], s = (E, M, N) => [e, e + u, e - u].some((k) => (N ? k >= E : k > E) && k <= M), l = 0; l < o; l++) {
      var c, f, d, h, p, v = l > 0 ? (c = r[l - 1]) === null || c === void 0 ? void 0 : c.coordinate : (f = r[o - 1]) === null || f === void 0 ? void 0 : f.coordinate, m = (d = r[l]) === null || d === void 0 ? void 0 : d.coordinate, y = l >= o - 1 ? (h = r[0]) === null || h === void 0 ? void 0 : h.coordinate : (p = r[l + 1]) === null || p === void 0 ? void 0 : p.coordinate, b = void 0;
      if (!(v == null || m == null || y == null))
        if (ft(m - v) !== ft(y - m)) {
          var g = [];
          if (ft(y - m) === ft(i[1] - i[0])) {
            b = y;
            var _ = m + i[1] - i[0];
            g[0] = Math.min(_, (_ + v) / 2), g[1] = Math.max(_, (_ + v) / 2);
          } else {
            b = v;
            var x = y + i[1] - i[0];
            g[0] = Math.min(m, (x + m) / 2), g[1] = Math.max(m, (x + m) / 2);
          }
          var w = [Math.min(m, (b + m) / 2), Math.max(m, (b + m) / 2)];
          if (s(w[0], w[1], !1) || s(g[0], g[1], !0)) {
            var A;
            return (A = r[l]) === null || A === void 0 ? void 0 : A.index;
          }
        } else {
          var P = Math.min(v, y), T = Math.max(v, y);
          if (s((P + m) / 2, (T + m) / 2, !1)) {
            var C;
            return (C = r[l]) === null || C === void 0 ? void 0 : C.index;
          }
        }
    }
  else if (t)
    for (var O = 0; O < o; O++) {
      var D = t[O];
      if (D != null) {
        var j = t[O + 1], z = t[O - 1];
        if (O === 0 && j != null && e <= (D.coordinate + j.coordinate) / 2 || O === o - 1 && z != null && e > (D.coordinate + z.coordinate) / 2 || O > 0 && O < o - 1 && z != null && j != null && e > (D.coordinate + z.coordinate) / 2 && e <= (D.coordinate + j.coordinate) / 2)
          return D.index;
      }
    }
  return -1;
}, qD = () => te(rm), fy = (e, t) => t, xP = (e, t, r) => r, dy = (e, t, r, n) => n, zD = I(Rr, (e) => ys(e, (t) => t.coordinate)), hy = I([Wi, fy, xP, dy], aP), vy = I([hy, zn, Ii, ki], wa), FD = (e, t, r) => {
  if (t != null) {
    var n = Wi(e);
    return t === "axis" ? r === "hover" ? n.axisInteraction.hover.dataKey : n.axisInteraction.click.dataKey : r === "hover" ? n.itemInteraction.hover.dataKey : n.itemInteraction.click.dataKey;
  }
}, AP = I([Wi, fy, xP, dy], uP), Hu = I([fr, dr, Me, Ge, Rr, dy, AP], oP), BD = I([hy, Hu], (e, t) => {
  var r;
  return (r = e.coordinate) !== null && r !== void 0 ? r : t;
}), OP = I([Rr, vy], eP), WD = I([AP, vy, hr, Ii, OP, sP, fy], lP), UD = I([hy, vy], (e, t) => ({
  isActive: e.active && t != null,
  activeIndex: t
})), VD = (e, t, r, n, i, a, o) => {
  if (!(!e || !r || !n || !i) && LD(e, o)) {
    var u = I6(e, t), s = wP(u, a, i, r, n), l = DD(t, i, s, e);
    return {
      activeIndex: String(s),
      activeCoordinate: l
    };
  }
}, HD = (e, t, r, n, i, a, o) => {
  if (!(!e || !n || !i || !a || !r)) {
    var u = Hk(e, r);
    if (u) {
      var s = k6(u, t), l = wP(s, o, a, n, i), c = jD(t, a, l, u);
      return {
        activeIndex: String(l),
        activeCoordinate: c
      };
    }
  }
}, KD = (e, t, r, n, i, a, o, u) => {
  if (!(!e || !t || !n || !i || !a))
    return t === "horizontal" || t === "vertical" ? VD(e, t, n, i, a, o, u) : HD(e, t, r, n, i, a, o);
}, GD = I((e) => e.zIndex.zIndexMap, (e, t) => t, (e, t, r) => r, (e, t, r) => {
  if (t != null) {
    var n = e[t];
    if (n != null)
      return r ? n.panoramaElement : n.element;
  }
}), YD = I((e) => e.zIndex.zIndexMap, (e) => {
  var t = Object.keys(e).map((n) => parseInt(n, 10)).concat(Object.values(Bt)), r = Array.from(new Set(t));
  return r.sort((n, i) => n - i);
}, {
  memoizeOptions: {
    resultEqualityCheck: wM
  }
});
function i1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function a1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? i1(Object(r), !0).forEach(function(n) {
      XD(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : i1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function XD(e, t, r) {
  return (t = ZD(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function ZD(e) {
  var t = QD(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function QD(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var JD = {}, ej = {
  zIndexMap: Object.values(Bt).reduce((e, t) => a1(a1({}, e), {}, {
    [t]: {
      element: void 0,
      panoramaElement: void 0,
      consumers: 0
    }
  }), JD)
}, tj = new Set(Object.values(Bt));
function rj(e) {
  return tj.has(e);
}
var SP = ot({
  name: "zIndex",
  initialState: ej,
  reducers: {
    registerZIndexPortal: {
      reducer: (e, t) => {
        var r = t.payload.zIndex;
        e.zIndexMap[r] ? e.zIndexMap[r].consumers += 1 : e.zIndexMap[r] = {
          consumers: 1,
          element: void 0,
          panoramaElement: void 0
        };
      },
      prepare: Pe()
    },
    unregisterZIndexPortal: {
      reducer: (e, t) => {
        var r = t.payload.zIndex;
        e.zIndexMap[r] && (e.zIndexMap[r].consumers -= 1, e.zIndexMap[r].consumers <= 0 && !rj(r) && delete e.zIndexMap[r]);
      },
      prepare: Pe()
    },
    registerZIndexPortalElement: {
      reducer: (e, t) => {
        var r = t.payload, n = r.zIndex, i = r.element, a = r.isPanorama;
        e.zIndexMap[n] ? a ? e.zIndexMap[n].panoramaElement = se(i) : e.zIndexMap[n].element = se(i) : e.zIndexMap[n] = {
          consumers: 0,
          element: a ? void 0 : se(i),
          panoramaElement: a ? se(i) : void 0
        };
      },
      prepare: Pe()
    },
    unregisterZIndexPortalElement: {
      reducer: (e, t) => {
        var r = t.payload.zIndex;
        e.zIndexMap[r] && (t.payload.isPanorama ? e.zIndexMap[r].panoramaElement = void 0 : e.zIndexMap[r].element = void 0);
      },
      prepare: Pe()
    }
  }
}), Qs = SP.actions, nj = Qs.registerZIndexPortal, Lc = Qs.unregisterZIndexPortal, ij = Qs.registerZIndexPortalElement, aj = Qs.unregisterZIndexPortalElement, oj = SP.reducer;
function vo(e) {
  var t = e.zIndex, r = e.children, n = v4(), i = n && t !== void 0 && t !== 0, a = nn(), o = J(void 0), u = J(/* @__PURE__ */ new Set()), s = $e(), l = te((f) => GD(f, t, a));
  if (yt(() => {
    if (!i) {
      var f = u.current;
      f.forEach((h) => {
        s(Lc({
          zIndex: h
        }));
      }), f.clear(), o.current = void 0;
      return;
    }
    if (u.current.has(t) || (s(nj({
      zIndex: t
    })), u.current.add(t)), l) {
      o.current = l;
      var d = u.current;
      d.forEach((h) => {
        h !== t && (s(Lc({
          zIndex: h
        })), d.delete(h));
      });
    }
  }, [s, t, i, l]), yt(() => {
    var f = u.current;
    return () => {
      f.forEach((d) => {
        s(Lc({
          zIndex: d
        }));
      }), f.clear();
    };
  }, [s]), !i)
    return r;
  var c = l ?? o.current;
  return c ? /* @__PURE__ */ Ap(r, c) : null;
}
function rp() {
  return rp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, rp.apply(null, arguments);
}
function o1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Uo(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? o1(Object(r), !0).forEach(function(n) {
      uj(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : o1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function uj(e, t, r) {
  return (t = sj(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function sj(e) {
  var t = lj(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function lj(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function cj(e) {
  var t = e.cursor, r = e.cursorComp, n = e.cursorProps;
  return /* @__PURE__ */ Kr(t) ? /* @__PURE__ */ ls(t, n) : /* @__PURE__ */ ur(r, n);
}
function fj(e) {
  var t, r = e.coordinate, n = e.payload, i = e.index, a = e.offset, o = e.tooltipAxisBandSize, u = e.layout, s = e.cursor, l = e.tooltipEventType, c = e.chartName, f = r, d = n, h = i;
  if (!s || !f || c !== "ScatterChart" && l !== "axis")
    return null;
  var p, v, m;
  if (c === "ScatterChart")
    p = f, v = tk, m = Bt.cursorLine;
  else if (c === "BarChart")
    p = rk(u, f, a, o), v = jk, m = Bt.cursorRectangle;
  else if (u === "radial" && YA(f)) {
    var y = vS(f), b = y.cx, g = y.cy, _ = y.radius, x = y.startAngle, w = y.endAngle;
    p = {
      cx: b,
      cy: g,
      startAngle: x,
      endAngle: w,
      innerRadius: _,
      outerRadius: _
    }, v = mS, m = Bt.cursorLine;
  } else
    p = {
      points: Xk(u, f, a)
    }, v = uS, m = Bt.cursorLine;
  var A = typeof s == "object" && "className" in s ? s.className : void 0, P = Uo(Uo(Uo(Uo({
    stroke: "#ccc",
    pointerEvents: "none"
  }, a), p), _v(s)), {}, {
    payload: d,
    payloadIndex: h,
    className: ze("recharts-tooltip-cursor", A)
  });
  return /* @__PURE__ */ S.createElement(vo, {
    zIndex: (t = e.zIndex) !== null && t !== void 0 ? t : m
  }, /* @__PURE__ */ S.createElement(cj, {
    cursor: s,
    cursorComp: v,
    cursorProps: P
  }));
}
function dj(e) {
  var t = MD(), r = f4(), n = Ms(), i = qD();
  return t == null || r == null || n == null || i == null ? null : /* @__PURE__ */ S.createElement(fj, rp({}, e, {
    offset: r,
    layout: n,
    tooltipAxisBandSize: t,
    chartName: i
  }));
}
var EP = /* @__PURE__ */ et(null), hj = () => at(EP), qc = { exports: {} }, u1;
function vj() {
  return u1 || (u1 = 1, (function(e) {
    var t = Object.prototype.hasOwnProperty, r = "~";
    function n() {
    }
    Object.create && (n.prototype = /* @__PURE__ */ Object.create(null), new n().__proto__ || (r = !1));
    function i(s, l, c) {
      this.fn = s, this.context = l, this.once = c || !1;
    }
    function a(s, l, c, f, d) {
      if (typeof c != "function")
        throw new TypeError("The listener must be a function");
      var h = new i(c, f || s, d), p = r ? r + l : l;
      return s._events[p] ? s._events[p].fn ? s._events[p] = [s._events[p], h] : s._events[p].push(h) : (s._events[p] = h, s._eventsCount++), s;
    }
    function o(s, l) {
      --s._eventsCount === 0 ? s._events = new n() : delete s._events[l];
    }
    function u() {
      this._events = new n(), this._eventsCount = 0;
    }
    u.prototype.eventNames = function() {
      var l = [], c, f;
      if (this._eventsCount === 0) return l;
      for (f in c = this._events)
        t.call(c, f) && l.push(r ? f.slice(1) : f);
      return Object.getOwnPropertySymbols ? l.concat(Object.getOwnPropertySymbols(c)) : l;
    }, u.prototype.listeners = function(l) {
      var c = r ? r + l : l, f = this._events[c];
      if (!f) return [];
      if (f.fn) return [f.fn];
      for (var d = 0, h = f.length, p = new Array(h); d < h; d++)
        p[d] = f[d].fn;
      return p;
    }, u.prototype.listenerCount = function(l) {
      var c = r ? r + l : l, f = this._events[c];
      return f ? f.fn ? 1 : f.length : 0;
    }, u.prototype.emit = function(l, c, f, d, h, p) {
      var v = r ? r + l : l;
      if (!this._events[v]) return !1;
      var m = this._events[v], y = arguments.length, b, g;
      if (m.fn) {
        switch (m.once && this.removeListener(l, m.fn, void 0, !0), y) {
          case 1:
            return m.fn.call(m.context), !0;
          case 2:
            return m.fn.call(m.context, c), !0;
          case 3:
            return m.fn.call(m.context, c, f), !0;
          case 4:
            return m.fn.call(m.context, c, f, d), !0;
          case 5:
            return m.fn.call(m.context, c, f, d, h), !0;
          case 6:
            return m.fn.call(m.context, c, f, d, h, p), !0;
        }
        for (g = 1, b = new Array(y - 1); g < y; g++)
          b[g - 1] = arguments[g];
        m.fn.apply(m.context, b);
      } else {
        var _ = m.length, x;
        for (g = 0; g < _; g++)
          switch (m[g].once && this.removeListener(l, m[g].fn, void 0, !0), y) {
            case 1:
              m[g].fn.call(m[g].context);
              break;
            case 2:
              m[g].fn.call(m[g].context, c);
              break;
            case 3:
              m[g].fn.call(m[g].context, c, f);
              break;
            case 4:
              m[g].fn.call(m[g].context, c, f, d);
              break;
            default:
              if (!b) for (x = 1, b = new Array(y - 1); x < y; x++)
                b[x - 1] = arguments[x];
              m[g].fn.apply(m[g].context, b);
          }
      }
      return !0;
    }, u.prototype.on = function(l, c, f) {
      return a(this, l, c, f, !1);
    }, u.prototype.once = function(l, c, f) {
      return a(this, l, c, f, !0);
    }, u.prototype.removeListener = function(l, c, f, d) {
      var h = r ? r + l : l;
      if (!this._events[h]) return this;
      if (!c)
        return o(this, h), this;
      var p = this._events[h];
      if (p.fn)
        p.fn === c && (!d || p.once) && (!f || p.context === f) && o(this, h);
      else {
        for (var v = 0, m = [], y = p.length; v < y; v++)
          (p[v].fn !== c || d && !p[v].once || f && p[v].context !== f) && m.push(p[v]);
        m.length ? this._events[h] = m.length === 1 ? m[0] : m : o(this, h);
      }
      return this;
    }, u.prototype.removeAllListeners = function(l) {
      var c;
      return l ? (c = r ? r + l : l, this._events[c] && o(this, c)) : (this._events = new n(), this._eventsCount = 0), this;
    }, u.prototype.off = u.prototype.removeListener, u.prototype.addListener = u.prototype.on, u.prefixed = r, u.EventEmitter = u, e.exports = u;
  })(qc)), qc.exports;
}
var pj = vj();
const mj = /* @__PURE__ */ Ht(pj);
var Ba = new mj(), np = "recharts.syncEvent.tooltip", s1 = "recharts.syncEvent.brush", yj = (e, t) => {
  if (t && Array.isArray(e)) {
    var r = Number.parseInt(t, 10);
    if (!Tr(r))
      return e[r];
  }
}, gj = {
  chartName: "",
  tooltipPayloadSearcher: () => {
  },
  eventEmitter: void 0,
  defaultTooltipEventType: "axis"
}, PP = ot({
  name: "options",
  initialState: gj,
  reducers: {
    createEventEmitter: (e) => {
      e.eventEmitter == null && (e.eventEmitter = Symbol("rechartsEventEmitter"));
    }
  }
}), bj = PP.reducer, _j = PP.actions.createEventEmitter;
function wj(e) {
  return e.tooltip.syncInteraction;
}
var xj = {
  chartData: void 0,
  computedData: void 0,
  dataStartIndex: 0,
  dataEndIndex: 0
}, TP = ot({
  name: "chartData",
  initialState: xj,
  reducers: {
    setChartData(e, t) {
      if (e.chartData = se(t.payload), t.payload == null) {
        e.dataStartIndex = 0, e.dataEndIndex = 0;
        return;
      }
      t.payload.length > 0 && e.dataEndIndex !== t.payload.length - 1 && (e.dataEndIndex = t.payload.length - 1);
    },
    setComputedData(e, t) {
      e.computedData = t.payload;
    },
    setDataStartEndIndexes(e, t) {
      var r = t.payload, n = r.startIndex, i = r.endIndex;
      n != null && (e.dataStartIndex = n), i != null && (e.dataEndIndex = i);
    }
  }
}), py = TP.actions, l1 = py.setChartData, Aj = py.setDataStartEndIndexes;
py.setComputedData;
var Oj = TP.reducer, Sj = ["x", "y"];
function c1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function si(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? c1(Object(r), !0).forEach(function(n) {
      Ej(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : c1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Ej(e, t, r) {
  return (t = Pj(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Pj(e) {
  var t = Tj(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Tj(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Cj(e, t) {
  if (e == null) return {};
  var r, n, i = Ij(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function Ij(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function kj() {
  var e = te(nm), t = te(im), r = $e(), n = te(IS), i = te(Rr), a = Ms(), o = ks(), u = te((s) => s.rootProps.className);
  pe(() => {
    if (e == null)
      return ds;
    var s = (l, c, f) => {
      if (t !== f && e === l) {
        if (c.payload.active === !1) {
          r(pa({
            active: !1,
            coordinate: void 0,
            dataKey: void 0,
            index: null,
            label: void 0,
            sourceViewBox: void 0,
            graphicalItemId: void 0
          }));
          return;
        }
        if (n === "index") {
          var d;
          if (o && c !== null && c !== void 0 && (d = c.payload) !== null && d !== void 0 && d.coordinate && c.payload.sourceViewBox) {
            var h = c.payload.coordinate, p = h.x, v = h.y, m = Cj(h, Sj), y = c.payload.sourceViewBox, b = y.x, g = y.y, _ = y.width, x = y.height, w = si(si({}, m), {}, {
              x: o.x + (_ ? (p - b) / _ : 0) * o.width,
              y: o.y + (x ? (v - g) / x : 0) * o.height
            });
            r(si(si({}, c), {}, {
              payload: si(si({}, c.payload), {}, {
                coordinate: w
              })
            }));
          } else
            r(c);
          return;
        }
        if (i != null) {
          var A;
          if (typeof n == "function") {
            var P = {
              activeTooltipIndex: c.payload.index == null ? void 0 : Number(c.payload.index),
              isTooltipActive: c.payload.active,
              activeIndex: c.payload.index == null ? void 0 : Number(c.payload.index),
              activeLabel: c.payload.label,
              activeDataKey: c.payload.dataKey,
              activeCoordinate: c.payload.coordinate
            }, T = n(i, P);
            A = i[T];
          } else n === "value" && (A = i.find((N) => String(N.value) === c.payload.label));
          var C = c.payload.coordinate;
          if (C == null || o == null) {
            r(pa({
              active: !1,
              coordinate: void 0,
              dataKey: void 0,
              index: null,
              label: void 0,
              sourceViewBox: void 0,
              graphicalItemId: void 0
            }));
            return;
          }
          if (A == null) {
            r(pa({
              active: !1,
              coordinate: void 0,
              dataKey: void 0,
              index: null,
              label: void 0,
              sourceViewBox: c.payload.sourceViewBox,
              graphicalItemId: void 0
            }));
            return;
          }
          var O = C.x, D = C.y, j = Math.min(O, o.x + o.width), z = Math.min(D, o.y + o.height), E = {
            x: a === "horizontal" ? A.coordinate : j,
            y: a === "horizontal" ? z : A.coordinate
          }, M = pa({
            active: c.payload.active,
            coordinate: E,
            dataKey: c.payload.dataKey,
            index: String(A.index),
            label: c.payload.label,
            sourceViewBox: c.payload.sourceViewBox,
            graphicalItemId: c.payload.graphicalItemId
          });
          r(M);
        }
      }
    };
    return Ba.on(np, s), () => {
      Ba.off(np, s);
    };
  }, [u, r, t, e, n, i, a, o]);
}
function Mj() {
  var e = te(nm), t = te(im), r = $e();
  pe(() => {
    if (e == null)
      return ds;
    var n = (i, a, o) => {
      t !== o && e === i && r(Aj(a));
    };
    return Ba.on(s1, n), () => {
      Ba.off(s1, n);
    };
  }, [r, t, e]);
}
function Nj() {
  var e = $e();
  pe(() => {
    e(_j());
  }, [e]), kj(), Mj();
}
function Rj(e, t, r, n, i, a) {
  var o = te((p) => FD(p, e, t)), u = te(bP), s = te(im), l = te(nm), c = te(IS), f = te(wj), d = (f == null ? void 0 : f.sourceViewBox) != null, h = ks();
  pe(() => {
    if (!d && l != null && s != null) {
      var p = pa({
        active: a,
        coordinate: r,
        dataKey: o,
        index: i,
        label: typeof n == "number" ? String(n) : n,
        sourceViewBox: h,
        graphicalItemId: u
      });
      Ba.emit(np, l, p, s);
    }
  }, [d, r, o, u, i, n, s, l, c, a, h]);
}
function f1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function d1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? f1(Object(r), !0).forEach(function(n) {
      $j(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : f1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function $j(e, t, r) {
  return (t = Dj(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Dj(e) {
  var t = jj(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function jj(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Lj(e, t) {
  return Bj(e) || Fj(e, t) || zj(e, t) || qj();
}
function qj() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function zj(e, t) {
  if (e) {
    if (typeof e == "string") return h1(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? h1(e, t) : void 0;
  }
}
function h1(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Fj(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], s = !0, l = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(s = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (c) {
      l = !0, i = c;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function Bj(e) {
  if (Array.isArray(e)) return e;
}
function Wj(e) {
  return e.dataKey;
}
function Uj(e, t) {
  return /* @__PURE__ */ S.isValidElement(e) ? /* @__PURE__ */ S.cloneElement(e, t) : typeof e == "function" ? /* @__PURE__ */ S.createElement(e, t) : /* @__PURE__ */ S.createElement(_7, t);
}
var v1 = [], Vj = {
  allowEscapeViewBox: {
    x: !1,
    y: !1
  },
  animationDuration: 400,
  animationEasing: "ease",
  axisId: 0,
  contentStyle: {},
  cursor: !0,
  filterNull: !0,
  includeHidden: !1,
  isAnimationActive: "auto",
  itemSorter: "name",
  itemStyle: {},
  labelStyle: {},
  offset: 10,
  reverseDirection: {
    x: !1,
    y: !1
  },
  separator: " : ",
  trigger: "hover",
  useTranslate3d: !1,
  wrapperStyle: {}
};
function Ku(e) {
  var t, r, n = Vt(e, Vj), i = n.active, a = n.allowEscapeViewBox, o = n.animationDuration, u = n.animationEasing, s = n.content, l = n.filterNull, c = n.isAnimationActive, f = n.offset, d = n.payloadUniqBy, h = n.position, p = n.reverseDirection, v = n.useTranslate3d, m = n.wrapperStyle, y = n.cursor, b = n.shared, g = n.trigger, _ = n.defaultIndex, x = n.portal, w = n.axisId, A = $e(), P = typeof _ == "number" ? String(_) : _;
  pe(() => {
    A(M$({
      shared: b,
      trigger: g,
      axisId: w,
      active: i,
      defaultIndex: P
    }));
  }, [A, b, g, w, i, P]);
  var T = ks(), C = oS(), O = E$(b), D = (t = te((H) => UD(H, O, g, P))) !== null && t !== void 0 ? t : {}, j = D.activeIndex, z = D.isActive, E = te((H) => WD(H, O, g, P)), M = te((H) => OP(H, O, g, P)), N = te((H) => BD(H, O, g, P)), k = E, R = hj(), W = (r = i ?? z) !== null && r !== void 0 ? r : !1, Z = vO([k, W]), ce = Lj(Z, 2), fe = ce[0], de = ce[1], Oe = O === "axis" ? M : void 0;
  Rj(O, g, N, Oe, j, W);
  var me = x ?? R;
  if (me == null || T == null || O == null)
    return null;
  var ve = k ?? v1;
  W || (ve = v1), l && ve.length && (ve = lO(ve.filter((H) => H.value != null && (H.hide !== !0 || n.includeHidden)), d, Wj));
  var Ue = ve.length > 0, U = d1(d1({}, n), {}, {
    payload: ve,
    label: Oe,
    active: W,
    activeIndex: j,
    coordinate: N,
    accessibilityLayer: C
  }), Q = /* @__PURE__ */ S.createElement(F7, {
    allowEscapeViewBox: a,
    animationDuration: o,
    animationEasing: u,
    isAnimationActive: c,
    active: W,
    coordinate: N,
    hasPayload: Ue,
    offset: f,
    position: h,
    reverseDirection: p,
    useTranslate3d: v,
    viewBox: T,
    wrapperStyle: m,
    lastBoundingBox: fe,
    innerRef: de,
    hasPortalFromProps: !!x
  }, Uj(s, U));
  return /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ Ap(Q, me), W && /* @__PURE__ */ S.createElement(dj, {
    cursor: y,
    tooltipEventType: O,
    coordinate: N,
    payload: ve,
    index: j
  }));
}
var Gr = (e) => null;
Gr.displayName = "Cell";
function Hj(e, t, r) {
  return (t = Kj(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Kj(e) {
  var t = Gj(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Gj(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
class Yj {
  constructor(t) {
    Hj(this, "cache", /* @__PURE__ */ new Map()), this.maxSize = t;
  }
  get(t) {
    var r = this.cache.get(t);
    return r !== void 0 && (this.cache.delete(t), this.cache.set(t, r)), r;
  }
  set(t, r) {
    if (this.cache.has(t))
      this.cache.delete(t);
    else if (this.cache.size >= this.maxSize) {
      var n = this.cache.keys().next().value;
      n != null && this.cache.delete(n);
    }
    this.cache.set(t, r);
  }
  clear() {
    this.cache.clear();
  }
  size() {
    return this.cache.size;
  }
}
function p1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Xj(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? p1(Object(r), !0).forEach(function(n) {
      Zj(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : p1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Zj(e, t, r) {
  return (t = Qj(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Qj(e) {
  var t = Jj(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Jj(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var eL = {
  cacheSize: 2e3,
  enableCache: !0
}, CP = Xj({}, eL), m1 = new Yj(CP.cacheSize), tL = {
  position: "absolute",
  top: "-20000px",
  left: 0,
  padding: 0,
  margin: 0,
  border: "none",
  whiteSpace: "pre"
}, y1 = "recharts_measurement_span";
function rL(e, t) {
  var r = t.fontSize || "", n = t.fontFamily || "", i = t.fontWeight || "", a = t.fontStyle || "", o = t.letterSpacing || "", u = t.textTransform || "";
  return "".concat(e, "|").concat(r, "|").concat(n, "|").concat(i, "|").concat(a, "|").concat(o, "|").concat(u);
}
var g1 = (e, t) => {
  try {
    var r = document.getElementById(y1);
    r || (r = document.createElement("span"), r.setAttribute("id", y1), r.setAttribute("aria-hidden", "true"), document.body.appendChild(r)), Object.assign(r.style, tL, t), r.textContent = "".concat(e);
    var n = r.getBoundingClientRect();
    return {
      width: n.width,
      height: n.height
    };
  } catch {
    return {
      width: 0,
      height: 0
    };
  }
}, b1 = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (t == null || Ns.isSsr)
    return {
      width: 0,
      height: 0
    };
  if (!CP.enableCache)
    return g1(t, r);
  var n = rL(t, r), i = m1.get(n);
  if (i)
    return i;
  var a = g1(t, r);
  return m1.set(n, a), a;
}, IP;
function Gu(e, t) {
  return oL(e) || aL(e, t) || iL(e, t) || nL();
}
function nL() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function iL(e, t) {
  if (e) {
    if (typeof e == "string") return _1(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? _1(e, t) : void 0;
  }
}
function _1(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function aL(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], s = !0, l = !1;
    try {
      if (a = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        s = !1;
      } else for (; !(s = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (c) {
      l = !0, i = c;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function oL(e) {
  if (Array.isArray(e)) return e;
}
function uL(e, t, r) {
  return (t = sL(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function sL(e) {
  var t = lL(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function lL(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var w1 = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([*/])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, x1 = /(-?\d+(?:\.\d+)?[a-zA-Z%]*)([+-])(-?\d+(?:\.\d+)?[a-zA-Z%]*)/, cL = /^(px|cm|vh|vw|em|rem|%|mm|in|pt|pc|ex|ch|vmin|vmax|Q)$/, fL = /(-?\d+(?:\.\d+)?)([a-zA-Z%]+)?/, dL = {
  cm: 96 / 2.54,
  mm: 96 / 25.4,
  pt: 96 / 72,
  pc: 96 / 6,
  in: 96,
  Q: 96 / (2.54 * 40),
  px: 1
}, hL = ["cm", "mm", "pt", "pc", "in", "Q", "px"];
function vL(e) {
  return hL.includes(e);
}
var vi = "NaN";
function pL(e, t) {
  return e * dL[t];
}
class Je {
  static parse(t) {
    var r, n = (r = fL.exec(t)) !== null && r !== void 0 ? r : [], i = Gu(n, 3), a = i[1], o = i[2];
    return a == null ? Je.NaN : new Je(parseFloat(a), o ?? "");
  }
  constructor(t, r) {
    this.num = t, this.unit = r, this.num = t, this.unit = r, Tr(t) && (this.unit = ""), r !== "" && !cL.test(r) && (this.num = NaN, this.unit = ""), vL(r) && (this.num = pL(t, r), this.unit = "px");
  }
  add(t) {
    return this.unit !== t.unit ? new Je(NaN, "") : new Je(this.num + t.num, this.unit);
  }
  subtract(t) {
    return this.unit !== t.unit ? new Je(NaN, "") : new Je(this.num - t.num, this.unit);
  }
  multiply(t) {
    return this.unit !== "" && t.unit !== "" && this.unit !== t.unit ? new Je(NaN, "") : new Je(this.num * t.num, this.unit || t.unit);
  }
  divide(t) {
    return this.unit !== "" && t.unit !== "" && this.unit !== t.unit ? new Je(NaN, "") : new Je(this.num / t.num, this.unit || t.unit);
  }
  toString() {
    return "".concat(this.num).concat(this.unit);
  }
  isNaN() {
    return Tr(this.num);
  }
}
IP = Je;
uL(Je, "NaN", new IP(NaN, ""));
function kP(e) {
  if (e == null || e.includes(vi))
    return vi;
  for (var t = e; t.includes("*") || t.includes("/"); ) {
    var r, n = (r = w1.exec(t)) !== null && r !== void 0 ? r : [], i = Gu(n, 4), a = i[1], o = i[2], u = i[3], s = Je.parse(a ?? ""), l = Je.parse(u ?? ""), c = o === "*" ? s.multiply(l) : s.divide(l);
    if (c.isNaN())
      return vi;
    t = t.replace(w1, c.toString());
  }
  for (; t.includes("+") || /.-\d+(?:\.\d+)?/.test(t); ) {
    var f, d = (f = x1.exec(t)) !== null && f !== void 0 ? f : [], h = Gu(d, 4), p = h[1], v = h[2], m = h[3], y = Je.parse(p ?? ""), b = Je.parse(m ?? ""), g = v === "+" ? y.add(b) : y.subtract(b);
    if (g.isNaN())
      return vi;
    t = t.replace(x1, g.toString());
  }
  return t;
}
var A1 = /\(([^()]*)\)/;
function mL(e) {
  for (var t = e, r; (r = A1.exec(t)) != null; ) {
    var n = r, i = Gu(n, 2), a = i[1];
    t = t.replace(A1, kP(a));
  }
  return t;
}
function yL(e) {
  var t = e.replace(/\s+/g, "");
  return t = mL(t), t = kP(t), t;
}
function gL(e) {
  try {
    return yL(e);
  } catch {
    return vi;
  }
}
function zc(e) {
  var t = gL(e.slice(5, -1));
  return t === vi ? "" : t;
}
var bL = ["x", "y", "lineHeight", "capHeight", "fill", "scaleToFit", "textAnchor", "verticalAnchor"], _L = ["dx", "dy", "angle", "className", "breakAll"];
function ip() {
  return ip = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, ip.apply(null, arguments);
}
function O1(e, t) {
  if (e == null) return {};
  var r, n, i = wL(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function wL(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function S1(e, t) {
  return SL(e) || OL(e, t) || AL(e, t) || xL();
}
function xL() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function AL(e, t) {
  if (e) {
    if (typeof e == "string") return E1(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? E1(e, t) : void 0;
  }
}
function E1(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function OL(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], s = !0, l = !1;
    try {
      if (a = (r = r.call(e)).next, t === 0) {
        if (Object(r) !== r) return;
        s = !1;
      } else for (; !(s = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (c) {
      l = !0, i = c;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function SL(e) {
  if (Array.isArray(e)) return e;
}
var MP = /[ \f\n\r\t\v\u2028\u2029]+/, NP = (e) => {
  var t = e.children, r = e.breakAll, n = e.style;
  try {
    var i = [];
    dt(t) || (r ? i = t.toString().split("") : i = t.toString().split(MP));
    var a = i.map((u) => ({
      word: u,
      width: b1(u, n).width
    })), o = r ? 0 : b1(" ", n).width;
    return {
      wordsWithComputedWidth: a,
      spaceWidth: o
    };
  } catch {
    return null;
  }
};
function EL(e) {
  return e === "start" || e === "middle" || e === "end" || e === "inherit";
}
function PL(e) {
  return dt(e) || typeof e == "string" || typeof e == "number" || typeof e == "boolean";
}
var RP = (e, t, r, n) => e.reduce((i, a) => {
  var o = a.word, u = a.width, s = i[i.length - 1];
  if (s && u != null && (t == null || n || s.width + u + r < Number(t)))
    s.words.push(o), s.width += u + r;
  else {
    var l = {
      words: [o],
      width: u
    };
    i.push(l);
  }
  return i;
}, []), $P = (e) => e.reduce((t, r) => t.width > r.width ? t : r), TL = "…", P1 = (e, t, r, n, i, a, o, u) => {
  var s = e.slice(0, t), l = NP({
    breakAll: r,
    style: n,
    children: s + TL
  });
  if (!l)
    return [!1, []];
  var c = RP(l.wordsWithComputedWidth, a, o, u), f = c.length > i || $P(c).width > Number(a);
  return [f, c];
}, CL = (e, t, r, n, i) => {
  var a = e.maxLines, o = e.children, u = e.style, s = e.breakAll, l = G(a), c = String(o), f = RP(t, n, r, i);
  if (!l || i)
    return f;
  var d = f.length > a || $P(f).width > Number(n);
  if (!d)
    return f;
  for (var h = 0, p = c.length - 1, v = 0, m; h <= p && v <= c.length - 1; ) {
    var y = Math.floor((h + p) / 2), b = y - 1, g = P1(c, b, s, u, a, n, r, i), _ = S1(g, 2), x = _[0], w = _[1], A = P1(c, y, s, u, a, n, r, i), P = S1(A, 1), T = P[0];
    if (!x && !T && (h = y + 1), x && T && (p = y - 1), !x && T) {
      m = w;
      break;
    }
    v++;
  }
  return m || f;
}, T1 = (e) => {
  var t = dt(e) ? [] : e.toString().split(MP);
  return [{
    words: t,
    width: void 0
  }];
}, IL = (e) => {
  var t = e.width, r = e.scaleToFit, n = e.children, i = e.style, a = e.breakAll, o = e.maxLines;
  if ((t || r) && !Ns.isSsr) {
    var u, s, l = NP({
      breakAll: a,
      children: n,
      style: i
    });
    if (l) {
      var c = l.wordsWithComputedWidth, f = l.spaceWidth;
      u = c, s = f;
    } else
      return T1(n);
    return CL({
      breakAll: a,
      children: n,
      maxLines: o,
      style: i
    }, u, s, t, !!r);
  }
  return T1(n);
}, DP = "#808080", kL = {
  angle: 0,
  breakAll: !1,
  // Magic number from d3
  capHeight: "0.71em",
  fill: DP,
  lineHeight: "1em",
  scaleToFit: !1,
  textAnchor: "start",
  // Maintain compat with existing charts / default SVG behavior
  verticalAnchor: "end",
  x: 0,
  y: 0
}, my = /* @__PURE__ */ Ke((e, t) => {
  var r = Vt(e, kL), n = r.x, i = r.y, a = r.lineHeight, o = r.capHeight, u = r.fill, s = r.scaleToFit, l = r.textAnchor, c = r.verticalAnchor, f = O1(r, bL), d = ue(() => IL({
    breakAll: f.breakAll,
    children: f.children,
    maxLines: f.maxLines,
    scaleToFit: s,
    style: f.style,
    width: f.width
  }), [f.breakAll, f.children, f.maxLines, s, f.style, f.width]), h = f.dx, p = f.dy, v = f.angle, m = f.className, y = f.breakAll, b = O1(f, _L);
  if (!Cr(n) || !Cr(i) || d.length === 0)
    return null;
  var g = Number(n) + (G(h) ? h : 0), _ = Number(i) + (G(p) ? p : 0);
  if (!_e(g) || !_e(_))
    return null;
  var x;
  switch (c) {
    case "start":
      x = zc("calc(".concat(o, ")"));
      break;
    case "middle":
      x = zc("calc(".concat((d.length - 1) / 2, " * -").concat(a, " + (").concat(o, " / 2))"));
      break;
    default:
      x = zc("calc(".concat(d.length - 1, " * -").concat(a, ")"));
      break;
  }
  var w = [], A = d[0];
  if (s && A != null) {
    var P = A.width, T = f.width;
    w.push("scale(".concat(G(T) && G(P) ? T / P : 1, ")"));
  }
  return v && w.push("rotate(".concat(v, ", ").concat(g, ", ").concat(_, ")")), w.length && (b.transform = w.join(" ")), /* @__PURE__ */ S.createElement("text", ip({}, sr(b), {
    ref: t,
    x: g,
    y: _,
    className: ze("recharts-text", m),
    textAnchor: l,
    fill: u.includes("url") ? DP : u
  }), d.map((C, O) => {
    var D = C.words.join(y ? "" : " ");
    return (
      // duplicate words will cause duplicate keys which is why we add the array index here
      /* @__PURE__ */ S.createElement("tspan", {
        x: g,
        dy: O === 0 ? x : a,
        key: "".concat(D, "-").concat(O)
      }, D)
    );
  }));
});
my.displayName = "Text";
var ML = ["labelRef"], NL = ["content"];
function C1(e, t) {
  if (e == null) return {};
  var r, n, i = RL(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function RL(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function I1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function li(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? I1(Object(r), !0).forEach(function(n) {
      $L(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : I1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function $L(e, t, r) {
  return (t = DL(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function DL(e) {
  var t = jL(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function jL(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Yu() {
  return Yu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Yu.apply(null, arguments);
}
var LL = /* @__PURE__ */ et(null), qL = () => {
  var e = at(LL), t = ks();
  return e || (t ? Tp(t) : void 0);
}, jP = /* @__PURE__ */ et(null), zL = (e) => {
  var t = e.cx, r = e.cy, n = e.innerRadius, i = e.outerRadius, a = e.startAngle, o = e.endAngle, u = e.clockWise, s = e.children, l = ue(() => ({
    cx: t,
    cy: r,
    innerRadius: n,
    outerRadius: i,
    startAngle: a,
    endAngle: o,
    clockWise: u
  }), [t, r, n, i, a, o, u]);
  return /* @__PURE__ */ S.createElement(jP.Provider, {
    value: l
  }, s);
}, FL = () => {
  var e = at(jP), t = te(DS);
  return e || t;
}, BL = (e) => {
  var t = e.value, r = e.formatter, n = dt(e.children) ? t : e.children;
  return typeof r == "function" ? r(n) : n;
}, WL = (e) => e != null && typeof e == "function", UL = (e, t) => {
  var r = ft(t - e), n = Math.min(Math.abs(t - e), 360);
  return r * n;
}, VL = (e, t, r, n, i) => {
  var a = e.offset, o = e.className, u = i.cx, s = i.cy, l = i.innerRadius, c = i.outerRadius, f = i.startAngle, d = i.endAngle, h = i.clockWise, p = (l + c) / 2, v = UL(f, d), m = v >= 0 ? 1 : -1, y, b;
  switch (t) {
    case "insideStart":
      y = f + m * a, b = h;
      break;
    case "insideEnd":
      y = d - m * a, b = !h;
      break;
    case "end":
      y = d + m * a, b = h;
      break;
    default:
      throw new Error("Unsupported position ".concat(t));
  }
  b = v <= 0 ? b : !b;
  var g = Le(u, s, p, y), _ = Le(u, s, p, y + (b ? 1 : -1) * 359), x = "M".concat(g.x, ",").concat(g.y, `
    A`).concat(p, ",").concat(p, ",0,1,").concat(b ? 0 : 1, `,
    `).concat(_.x, ",").concat(_.y), w = dt(e.id) ? ka("recharts-radial-line-") : e.id;
  return /* @__PURE__ */ S.createElement("text", Yu({}, n, {
    dominantBaseline: "central",
    className: ze("recharts-radial-bar-label", o)
  }), /* @__PURE__ */ S.createElement("defs", null, /* @__PURE__ */ S.createElement("path", {
    id: w,
    d: x
  })), /* @__PURE__ */ S.createElement("textPath", {
    xlinkHref: "#".concat(w)
  }, r));
}, HL = (e, t, r) => {
  var n = e.cx, i = e.cy, a = e.innerRadius, o = e.outerRadius, u = e.startAngle, s = e.endAngle, l = (u + s) / 2;
  if (r === "outside") {
    var c = Le(n, i, o + t, l), f = c.x, d = c.y;
    return {
      x: f,
      y: d,
      textAnchor: f >= n ? "start" : "end",
      verticalAnchor: "middle"
    };
  }
  if (r === "center")
    return {
      x: n,
      y: i,
      textAnchor: "middle",
      verticalAnchor: "middle"
    };
  if (r === "centerTop")
    return {
      x: n,
      y: i,
      textAnchor: "middle",
      verticalAnchor: "start"
    };
  if (r === "centerBottom")
    return {
      x: n,
      y: i,
      textAnchor: "middle",
      verticalAnchor: "end"
    };
  var h = (a + o) / 2, p = Le(n, i, h, l), v = p.x, m = p.y;
  return {
    x: v,
    y: m,
    textAnchor: "middle",
    verticalAnchor: "middle"
  };
}, hi = (e) => e != null && "cx" in e && G(e.cx), KL = {
  angle: 0,
  offset: 5,
  zIndex: Bt.label,
  position: "middle",
  textBreakAll: !1
};
function GL(e) {
  if (!hi(e))
    return e;
  var t = e.cx, r = e.cy, n = e.outerRadius, i = n * 2;
  return {
    x: t - n,
    y: r - n,
    width: i,
    upperWidth: i,
    lowerWidth: i,
    height: i
  };
}
function LP(e) {
  var t, r, n = Vt(e, KL), i = n.viewBox, a = n.parentViewBox, o = n.position, u = n.value, s = n.children, l = n.content, c = n.className, f = c === void 0 ? "" : c, d = n.textBreakAll, h = n.labelRef, p = FL(), v = qL(), m = o === "center" ? v : p ?? v, y, b, g;
  i == null ? y = m : hi(i) ? y = i : y = Tp(i);
  var _ = GL(y);
  if (!y || dt(u) && dt(s) && !/* @__PURE__ */ Kr(l) && typeof l != "function")
    return null;
  var x = hi(y) && (o === "insideStart" || o === "insideEnd" || o === "end");
  if (hi(y))
    x || (g = HL(y, n.offset, n.position));
  else if (_) {
    var w = bA({
      viewBox: _,
      position: o,
      offset: n.offset,
      parentViewBox: hi(a) ? void 0 : a,
      clamp: !0
    });
    g = li(li({
      x: w.x,
      y: w.y,
      textAnchor: w.horizontalAnchor,
      verticalAnchor: w.verticalAnchor
    }, w.width !== void 0 ? {
      width: w.width
    } : {}), w.height !== void 0 ? {
      height: w.height
    } : {});
  }
  var A = li(li(li(li({}, ((t = g) === null || t === void 0 ? void 0 : t.x) !== void 0 ? {
    x: g.x
  } : {}), ((r = g) === null || r === void 0 ? void 0 : r.y) !== void 0 ? {
    y: g.y
  } : {}), n), {}, {
    viewBox: y
  });
  if (/* @__PURE__ */ Kr(l)) {
    A.labelRef;
    var P = C1(A, ML);
    return /* @__PURE__ */ ls(l, P);
  }
  if (typeof l == "function") {
    A.content;
    var T = C1(A, NL);
    if (b = /* @__PURE__ */ ur(l, T), /* @__PURE__ */ Kr(b))
      return b;
  } else
    b = BL(n);
  var C = sr(n);
  return x && hi(y) ? VL(n, o, b, C, y) : g == null ? null : /* @__PURE__ */ S.createElement(vo, {
    zIndex: n.zIndex
  }, /* @__PURE__ */ S.createElement(my, Yu({
    ref: h,
    className: ze("recharts-label", f)
  }, C, g, {
    /*
     * textAnchor is decided by default based on the `position`
     * but we allow overriding via props for precise control.
     */
    textAnchor: EL(C.textAnchor) ? C.textAnchor : g.textAnchor,
    breakAll: d
  }), b));
}
LP.displayName = "Label";
var YL = ["valueAccessor"], XL = ["dataKey", "clockWise", "id", "textBreakAll", "zIndex"];
function Xu() {
  return Xu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Xu.apply(null, arguments);
}
function k1(e, t) {
  if (e == null) return {};
  var r, n, i = ZL(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function ZL(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var QL = (e) => {
  var t = Array.isArray(e.value) ? e.value[e.value.length - 1] : e.value;
  if (PL(t))
    return t;
}, qP = /* @__PURE__ */ et(void 0);
qP.Provider;
var zP = /* @__PURE__ */ et(void 0), JL = zP.Provider;
function eq() {
  return at(qP);
}
function tq() {
  return at(zP);
}
function iu(e) {
  var t = e.valueAccessor, r = t === void 0 ? QL : t, n = k1(e, YL), i = n.dataKey;
  n.clockWise;
  var a = n.id, o = n.textBreakAll, u = n.zIndex, s = k1(n, XL), l = eq(), c = tq(), f = l || c;
  return !f || !f.length ? null : /* @__PURE__ */ S.createElement(vo, {
    zIndex: u ?? Bt.label
  }, /* @__PURE__ */ S.createElement(Pr, {
    className: "recharts-label-list"
  }, f.map((d, h) => {
    var p, v = dt(i) ? r(d, h) : Ie(d.payload, i), m = dt(a) ? {} : {
      id: "".concat(a, "-").concat(h)
    };
    return /* @__PURE__ */ S.createElement(LP, Xu({
      key: "label-".concat(h)
    }, sr(d), s, m, {
      /*
       * Prefer to use the explicit fill from LabelList props.
       * Only in an absence of that, fall back to the fill of the entry.
       * The entry fill can be quite difficult to see especially in Bar, Pie, RadialBar in inside positions.
       * On the other hand it's quite convenient in Scatter, Line, or when the position is outside the Bar, Pie filled shapes.
       */
      fill: (p = n.fill) !== null && p !== void 0 ? p : d.fill,
      parentViewBox: d.parentViewBox,
      value: v,
      textBreakAll: o,
      viewBox: d.viewBox,
      index: h,
      zIndex: 0
    }));
  })));
}
iu.displayName = "LabelList";
function rq(e) {
  var t = e.label;
  return t ? t === !0 ? /* @__PURE__ */ S.createElement(iu, {
    key: "labelList-implicit"
  }) : /* @__PURE__ */ S.isValidElement(t) || WL(t) ? /* @__PURE__ */ S.createElement(iu, {
    key: "labelList-implicit",
    content: t
  }) : typeof t == "object" ? /* @__PURE__ */ S.createElement(iu, Xu({
    key: "labelList-implicit"
  }, t, {
    type: String(t.type)
  })) : null : null;
}
var FP = (e) => e.graphicalItems.polarItems, nq = I([Ne, io], Wm), Js = I([FP, Re, nq], Um), iq = I([Js], Vm), el = I([iq, Rs], Hm), aq = I([el, Re, Js], RE);
I([el, Re, Js], (e, t, r) => r.length > 0 ? e.flatMap((n) => r.flatMap((i) => {
  var a, o = Ie(n, (a = t.dataKey) !== null && a !== void 0 ? a : i.dataKey);
  return {
    value: o,
    errorDomain: []
    // polar charts do not have error bars
  };
})).filter(Boolean) : (t == null ? void 0 : t.dataKey) != null ? e.map((n) => ({
  value: Ie(n, t.dataKey),
  errorDomain: []
})) : e.map((n) => ({
  value: n,
  errorDomain: []
})));
var M1 = () => {
}, oq = I([el, Re, Js, Gs, Ne, Jk], Zm), uq = I([Re, Ym, Xm, M1, oq, M1, Me, Ne], Qm), BP = I([Re, Me, el, aq, no, Ne, uq], Jm), sq = I([BP, zi, ln], ty), lq = I([Re, BP, sq, Ne], ny);
I([ln, lq], qS);
var cq = {
  radiusAxis: {},
  angleAxis: {}
}, WP = ot({
  name: "polarAxis",
  initialState: cq,
  reducers: {
    addRadiusAxis(e, t) {
      e.radiusAxis[t.payload.id] = se(t.payload);
    },
    removeRadiusAxis(e, t) {
      delete e.radiusAxis[t.payload.id];
    },
    addAngleAxis(e, t) {
      e.angleAxis[t.payload.id] = se(t.payload);
    },
    removeAngleAxis(e, t) {
      delete e.angleAxis[t.payload.id];
    }
  }
}), tl = WP.actions;
tl.addRadiusAxis;
tl.removeRadiusAxis;
tl.addAngleAxis;
tl.removeAngleAxis;
var fq = WP.reducer;
function dq(e) {
  return e && typeof e == "object" && "className" in e && typeof e.className == "string" ? e.className : "";
}
function N1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function R1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? N1(Object(r), !0).forEach(function(n) {
      hq(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : N1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function hq(e, t, r) {
  return (t = vq(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function vq(e) {
  var t = pq(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function pq(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var mq = (e, t) => t, yy = I([FP, mq], (e, t) => e.filter((r) => r.type === "pie").find((r) => r.id === t)), yq = [], gy = (e, t, r) => (r == null ? void 0 : r.length) === 0 ? yq : r, UP = I([Rs, yy, gy], (e, t, r) => {
  var n = e.chartData;
  if (t != null) {
    var i;
    if ((t == null ? void 0 : t.data) != null && t.data.length > 0 ? i = t.data : i = n, (!i || !i.length) && r != null && (i = r.map((a) => R1(R1({}, t.presentationProps), a.props))), i != null)
      return i;
  }
}), gq = I([UP, yy, gy], (e, t, r) => {
  if (!(e == null || t == null))
    return e.map((n, i) => {
      var a, o = Ie(n, t.nameKey, t.name), u;
      return r != null && (a = r[i]) !== null && a !== void 0 && (a = a.props) !== null && a !== void 0 && a.fill ? u = r[i].props.fill : typeof n == "object" && n != null && "fill" in n ? u = n.fill : u = t.fill, {
        value: YO(o, t.dataKey),
        dataKey: t.dataKey,
        color: u,
        // @ts-expect-error Legend payload.payload says it wants objects but our data can be unknown
        payload: n,
        type: t.legendType
      };
    });
}), bq = I([UP, yy, gy, Ge], (e, t, r, n) => {
  if (!(t == null || e == null))
    return Lz({
      offset: n,
      pieSettings: t,
      displayedData: e,
      cells: r
    });
}), Vo = { exports: {} }, ye = {};
/**
 * @license React
 * react-is.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var $1;
function _q() {
  if ($1) return ye;
  $1 = 1;
  var e = Symbol.for("react.transitional.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), i = Symbol.for("react.profiler"), a = Symbol.for("react.consumer"), o = Symbol.for("react.context"), u = Symbol.for("react.forward_ref"), s = Symbol.for("react.suspense"), l = Symbol.for("react.suspense_list"), c = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), d = Symbol.for("react.view_transition"), h = Symbol.for("react.client.reference");
  function p(v) {
    if (typeof v == "object" && v !== null) {
      var m = v.$$typeof;
      switch (m) {
        case e:
          switch (v = v.type, v) {
            case r:
            case i:
            case n:
            case s:
            case l:
            case d:
              return v;
            default:
              switch (v = v && v.$$typeof, v) {
                case o:
                case u:
                case f:
                case c:
                  return v;
                case a:
                  return v;
                default:
                  return m;
              }
          }
        case t:
          return m;
      }
    }
  }
  return ye.ContextConsumer = a, ye.ContextProvider = o, ye.Element = e, ye.ForwardRef = u, ye.Fragment = r, ye.Lazy = f, ye.Memo = c, ye.Portal = t, ye.Profiler = i, ye.StrictMode = n, ye.Suspense = s, ye.SuspenseList = l, ye.isContextConsumer = function(v) {
    return p(v) === a;
  }, ye.isContextProvider = function(v) {
    return p(v) === o;
  }, ye.isElement = function(v) {
    return typeof v == "object" && v !== null && v.$$typeof === e;
  }, ye.isForwardRef = function(v) {
    return p(v) === u;
  }, ye.isFragment = function(v) {
    return p(v) === r;
  }, ye.isLazy = function(v) {
    return p(v) === f;
  }, ye.isMemo = function(v) {
    return p(v) === c;
  }, ye.isPortal = function(v) {
    return p(v) === t;
  }, ye.isProfiler = function(v) {
    return p(v) === i;
  }, ye.isStrictMode = function(v) {
    return p(v) === n;
  }, ye.isSuspense = function(v) {
    return p(v) === s;
  }, ye.isSuspenseList = function(v) {
    return p(v) === l;
  }, ye.isValidElementType = function(v) {
    return typeof v == "string" || typeof v == "function" || v === r || v === i || v === n || v === s || v === l || v === d || typeof v == "object" && v !== null && (v.$$typeof === f || v.$$typeof === c || v.$$typeof === o || v.$$typeof === a || v.$$typeof === u || v.$$typeof === h || v.getModuleId !== void 0);
  }, ye.typeOf = p, ye;
}
var ge = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var D1;
function wq() {
  return D1 || (D1 = 1, process.env.NODE_ENV !== "production" && (function() {
    function e(v) {
      if (typeof v == "object" && v !== null) {
        var m = v.$$typeof;
        switch (m) {
          case t:
            switch (v = v.type, v) {
              case n:
              case a:
              case i:
              case l:
              case c:
              case h:
                return v;
              default:
                switch (v = v && v.$$typeof, v) {
                  case u:
                  case s:
                  case d:
                  case f:
                    return v;
                  case o:
                    return v;
                  default:
                    return m;
                }
            }
          case r:
            return m;
        }
      }
    }
    var t = Symbol.for("react.transitional.element"), r = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), u = Symbol.for("react.context"), s = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), h = Symbol.for("react.view_transition"), p = Symbol.for("react.client.reference");
    ge.ContextConsumer = o, ge.ContextProvider = u, ge.Element = t, ge.ForwardRef = s, ge.Fragment = n, ge.Lazy = d, ge.Memo = f, ge.Portal = r, ge.Profiler = a, ge.StrictMode = i, ge.Suspense = l, ge.SuspenseList = c, ge.isContextConsumer = function(v) {
      return e(v) === o;
    }, ge.isContextProvider = function(v) {
      return e(v) === u;
    }, ge.isElement = function(v) {
      return typeof v == "object" && v !== null && v.$$typeof === t;
    }, ge.isForwardRef = function(v) {
      return e(v) === s;
    }, ge.isFragment = function(v) {
      return e(v) === n;
    }, ge.isLazy = function(v) {
      return e(v) === d;
    }, ge.isMemo = function(v) {
      return e(v) === f;
    }, ge.isPortal = function(v) {
      return e(v) === r;
    }, ge.isProfiler = function(v) {
      return e(v) === a;
    }, ge.isStrictMode = function(v) {
      return e(v) === i;
    }, ge.isSuspense = function(v) {
      return e(v) === l;
    }, ge.isSuspenseList = function(v) {
      return e(v) === c;
    }, ge.isValidElementType = function(v) {
      return typeof v == "string" || typeof v == "function" || v === n || v === a || v === i || v === l || v === c || v === h || typeof v == "object" && v !== null && (v.$$typeof === d || v.$$typeof === f || v.$$typeof === u || v.$$typeof === o || v.$$typeof === s || v.$$typeof === p || v.getModuleId !== void 0);
    }, ge.typeOf = e;
  })()), ge;
}
var j1;
function xq() {
  return j1 || (j1 = 1, process.env.NODE_ENV === "production" ? Vo.exports = /* @__PURE__ */ _q() : Vo.exports = /* @__PURE__ */ wq()), Vo.exports;
}
var Aq = /* @__PURE__ */ xq(), L1 = (e) => typeof e == "string" ? e : e ? e.displayName || e.name || "Component" : "", q1 = null, Fc = null, VP = (e) => {
  if (e === q1 && Array.isArray(Fc))
    return Fc;
  var t = [];
  return vI.forEach(e, (r) => {
    dt(r) || (Aq.isFragment(r) ? t = t.concat(VP(r.props.children)) : t.push(r));
  }), Fc = t, q1 = e, t;
};
function HP(e, t) {
  var r = [], n = [];
  return Array.isArray(t) ? n = t.map((i) => L1(i)) : n = [L1(t)], VP(e).forEach((i) => {
    var a = Zr(i, "type.displayName") || Zr(i, "type.name");
    a && n.indexOf(a) !== -1 && r.push(i);
  }), r;
}
function z1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function F1(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? z1(Object(r), !0).forEach(function(n) {
      Oq(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : z1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Oq(e, t, r) {
  return (t = Sq(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Sq(e) {
  var t = Eq(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Eq(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function KP(e, t) {
  return F1(F1({}, t), e);
}
function Pq(e) {
  return /* @__PURE__ */ Kr(e) ? e.props : e;
}
function Tq(e, t) {
  return /* @__PURE__ */ ls(e, KP(Pq(e), t));
}
function Cq(e) {
  if ("index" in e) {
    var t = e.index;
    return typeof t == "number" || typeof t == "string" ? t : void 0;
  }
}
function Iq(e) {
  return "isActive" in e && e.isActive === !0;
}
function kq(e) {
  var t = e.option, r = e.DefaultShape, n = e.shapeProps, i = e.activeClassName, a = i === void 0 ? "recharts-active-shape" : i, o = e.inActiveClassName, u = o === void 0 ? "recharts-shape" : o, s = Cq(n), l;
  return /* @__PURE__ */ Kr(t) ? l = Tq(t, n) : t === r ? l = /* @__PURE__ */ S.createElement(r, n) : typeof t == "function" ? l = t(n, s) : typeof t == "object" ? l = /* @__PURE__ */ S.createElement(r, KP(t, n)) : l = /* @__PURE__ */ S.createElement(r, n), Iq(n) ? /* @__PURE__ */ S.createElement(Pr, {
    className: a
  }, l) : /* @__PURE__ */ S.createElement(Pr, {
    className: u
  }, l);
}
var Mq = (e, t, r) => {
  var n = $e();
  return (i, a) => (o) => {
    e == null || e(i, a, o), n(rP({
      activeIndex: String(a),
      activeDataKey: t,
      activeCoordinate: i.tooltipPosition,
      activeGraphicalItemId: r
    }));
  };
}, Nq = (e) => {
  var t = $e();
  return (r, n) => (i) => {
    e == null || e(r, n, i), t(N$());
  };
}, Rq = (e, t, r) => {
  var n = $e();
  return (i, a) => (o) => {
    e == null || e(i, a, o), n(R$({
      activeIndex: String(a),
      activeDataKey: t,
      activeCoordinate: i.tooltipPosition,
      activeGraphicalItemId: r
    }));
  };
};
function $q(e) {
  var t = e.tooltipEntrySettings, r = $e(), n = nn(), i = J(null);
  return yt(() => {
    n || (i.current === null ? r(C$(t)) : i.current !== t && r(I$({
      prev: i.current,
      next: t
    })), i.current = t);
  }, [t, r, n]), yt(() => () => {
    i.current && (r(k$(i.current)), i.current = null);
  }, [r]), null;
}
function Dq(e) {
  var t = e.legendPayload, r = $e(), n = te(Me), i = J(null);
  return yt(() => {
    n !== "centric" && n !== "radial" || (i.current === null ? r(y4(t)) : i.current !== t && r(g4({
      prev: i.current,
      next: t
    })), i.current = t);
  }, [r, n, t]), yt(() => () => {
    i.current && (r(b4(i.current)), i.current = null);
  }, [r]), null;
}
function jq(e, t) {
  return Fq(e) || zq(e, t) || qq(e, t) || Lq();
}
function Lq() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function qq(e, t) {
  if (e) {
    if (typeof e == "string") return B1(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? B1(e, t) : void 0;
  }
}
function B1(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function zq(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], s = !0, l = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(s = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (c) {
      l = !0, i = c;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function Fq(e) {
  if (Array.isArray(e)) return e;
}
var GP = "index", YP = "append";
function by(e, t) {
  var r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [], n = [];
  for (var i of r)
    n.push({
      status: "removed",
      prev: i
    });
  for (var a = 0; a < t.length; a++) {
    var o = e[a], u = t[a];
    o != null ? n.push({
      status: "matched",
      prev: o,
      next: u
    }) : n.push({
      status: "added",
      next: u
    });
  }
  return n;
}
function Bq(e, t) {
  var r = e.length / t.length, n = t.map((i, a) => e[Math.floor(a * r)]);
  return by(n, t);
}
function Wq(e, t) {
  var r = t.map((n, i) => e[i]);
  return by(r, t);
}
function Uq(e, t) {
  for (var r = /* @__PURE__ */ new Map(), n = 0; n < e.length; n++) {
    var i = e[n];
    if (i != null) {
      var a = t(i, n);
      a != null && !r.has(a) && r.set(a, i);
    }
  }
  return r;
}
function Vq(e, t, r) {
  var n = Uq(e, r), i = /* @__PURE__ */ new Set(), a = t.map((f, d) => {
    var h = r(f, d);
    if (h != null) {
      var p = n.get(h);
      if (p !== void 0)
        return i.add(h), p;
    }
  }), o = [];
  for (var u of n) {
    var s = jq(u, 2), l = s[0], c = s[1];
    i.has(l) || o.push(c);
  }
  return by(a, t, o);
}
function Hq(e, t, r) {
  return t == null ? null : e == null ? t.map((n) => ({
    status: "added",
    next: n
  })) : r === GP ? Bq(e, t) : r === YP ? Wq(e, t) : Vq(e, t, r);
}
function Kq(e, t) {
  var r = J(e), n = J(t.current), i = J(!0);
  r.current !== e && (r.current = e, n.current = t.current, i.current = !1);
  var a = re(function(o, u) {
    var s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : !0;
    if (u === 0) {
      i.current = !0;
      return;
    }
    u === 1 && (n.current = o), u > 0 && i.current && s && (t.current = o);
  }, [t]);
  return {
    startValue: n.current,
    syncStepValue: a
  };
}
function Gq(e, t) {
  return Qq(e) || Zq(e, t) || Xq(e, t) || Yq();
}
function Yq() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function Xq(e, t) {
  if (e) {
    if (typeof e == "string") return W1(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? W1(e, t) : void 0;
  }
}
function W1(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function Zq(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], s = !0, l = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(s = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (c) {
      l = !0, i = c;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function Qq(e) {
  if (Array.isArray(e)) return e;
}
function Jq(e, t) {
  var r = be(!1), n = Gq(r, 2), i = n[0], a = n[1], o = re(() => {
    typeof e == "function" && e(), a(!0);
  }, [e]), u = re(() => {
    typeof t == "function" && t(), a(!1);
  }, [t]);
  return {
    isAnimating: i,
    handleAnimationStart: o,
    handleAnimationEnd: u
  };
}
function ez(e) {
  var t, r = e.animationInput, n = e.animationIdPrefix, i = e.items, a = e.previousItemsRef, o = e.isAnimationActive, u = e.animationBegin, s = e.animationDuration, l = e.animationEasing, c = e.onAnimationStart, f = e.onAnimationEnd, d = e.animationInterpolateFn, h = e.animationMatchBy, p = e.shouldUpdatePreviousRef, v = e.children, m = e.layout, y = dS(r, n), b = Kq(y, a), g = (t = b.startValue) !== null && t !== void 0 ? t : null, _ = Hq(g, i, h ?? GP);
  return /* @__PURE__ */ S.createElement(fS, {
    animationId: y,
    begin: u,
    duration: s,
    isActive: o,
    easing: l,
    onAnimationEnd: f,
    onAnimationStart: c,
    key: y
  }, (x) => {
    var w = g == null, A = i == null ? i : d(_, x, m), P = p ? p(x) : x > 0;
    return b.syncStepValue(A, x, P), A == null ? null : v(A, x, w);
  });
}
var Bc;
function tz(e, t) {
  return az(e) || iz(e, t) || nz(e, t) || rz();
}
function rz() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function nz(e, t) {
  if (e) {
    if (typeof e == "string") return U1(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? U1(e, t) : void 0;
  }
}
function U1(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function iz(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], s = !0, l = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(s = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (c) {
      l = !0, i = c;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function az(e) {
  if (Array.isArray(e)) return e;
}
var oz = () => {
  var e = S.useState(() => ka("uid-")), t = tz(e, 1), r = t[0];
  return r;
}, uz = (Bc = S.useId) !== null && Bc !== void 0 ? Bc : oz;
function sz(e, t) {
  var r = uz();
  return t || (e ? "".concat(e, "-").concat(r) : r);
}
var lz = /* @__PURE__ */ et(void 0), cz = (e) => {
  var t = e.id, r = e.type, n = e.children, i = sz("recharts-".concat(r), t);
  return /* @__PURE__ */ S.createElement(lz.Provider, {
    value: i
  }, n(i));
}, fz = {
  cartesianItems: [],
  polarItems: []
}, XP = ot({
  name: "graphicalItems",
  initialState: fz,
  reducers: {
    addCartesianGraphicalItem: {
      reducer(e, t) {
        e.cartesianItems.push(se(t.payload));
      },
      prepare: Pe()
    },
    replaceCartesianGraphicalItem: {
      reducer(e, t) {
        var r = t.payload, n = r.prev, i = r.next, a = Tt(e).cartesianItems.indexOf(se(n));
        a > -1 && (e.cartesianItems[a] = se(i));
      },
      prepare: Pe()
    },
    removeCartesianGraphicalItem: {
      reducer(e, t) {
        var r = Tt(e).cartesianItems.indexOf(se(t.payload));
        r > -1 && e.cartesianItems.splice(r, 1);
      },
      prepare: Pe()
    },
    addPolarGraphicalItem: {
      reducer(e, t) {
        e.polarItems.push(se(t.payload));
      },
      prepare: Pe()
    },
    removePolarGraphicalItem: {
      reducer(e, t) {
        var r = Tt(e).polarItems.indexOf(se(t.payload));
        r > -1 && e.polarItems.splice(r, 1);
      },
      prepare: Pe()
    },
    replacePolarGraphicalItem: {
      reducer(e, t) {
        var r = t.payload, n = r.prev, i = r.next, a = Tt(e).polarItems.indexOf(se(n));
        a > -1 && (e.polarItems[a] = se(i));
      },
      prepare: Pe()
    }
  }
}), Ui = XP.actions;
Ui.addCartesianGraphicalItem;
Ui.replaceCartesianGraphicalItem;
Ui.removeCartesianGraphicalItem;
var dz = Ui.addPolarGraphicalItem, hz = Ui.removePolarGraphicalItem, vz = Ui.replacePolarGraphicalItem, pz = XP.reducer, mz = (e) => {
  var t = $e(), r = J(null);
  return yt(() => {
    r.current === null ? t(dz(e)) : r.current !== e && t(vz({
      prev: r.current,
      next: e
    })), r.current = e;
  }, [t, e]), yt(() => () => {
    r.current && (t(hz(r.current)), r.current = null);
  }, [t]), null;
}, yz = /* @__PURE__ */ tt(mz), gz = ["key"], bz = ["onMouseEnter", "onClick", "onMouseLeave"], _z = ["id"], wz = ["id"];
function Fn() {
  return Fn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Fn.apply(null, arguments);
}
function rl(e, t) {
  if (e == null) return {};
  var r, n, i = xz(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function xz(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function V1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ce(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? V1(Object(r), !0).forEach(function(n) {
      Az(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : V1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Az(e, t, r) {
  return (t = Oz(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Oz(e) {
  var t = Sz(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Sz(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var ZP = mS;
function Ez(e) {
  var t = ue(() => HP(e.children, Gr), [e.children]), r = te((n) => gq(n, e.id, t));
  return r == null ? null : /* @__PURE__ */ S.createElement(Dq, {
    legendPayload: r
  });
}
function Pz(e) {
  if (!(e == null || typeof e == "boolean" || typeof e == "function")) {
    if (/* @__PURE__ */ S.isValidElement(e)) {
      var t, r = (t = e.props) === null || t === void 0 ? void 0 : t.fill;
      return typeof r == "string" ? r : void 0;
    }
    var n = e.fill;
    return typeof n == "string" ? n : void 0;
  }
}
var Tz = /* @__PURE__ */ S.memo((e) => {
  var t = e.dataKey, r = e.nameKey, n = e.sectors, i = e.stroke, a = e.strokeWidth, o = e.fill, u = e.name, s = e.hide, l = e.tooltipType, c = e.formatter, f = e.id, d = e.activeShape, h = Pz(d), p = n.map((m) => {
    var y = m.tooltipPayload;
    return h == null || y == null ? y : y.map((b) => Ce(Ce({}, b), {}, {
      color: h,
      fill: h
    }));
  }), v = {
    dataDefinedOnItem: p,
    getPosition: (m) => {
      var y;
      return (y = n[Number(m)]) === null || y === void 0 ? void 0 : y.tooltipPosition;
    },
    settings: {
      stroke: i,
      strokeWidth: a,
      fill: o,
      dataKey: t,
      nameKey: r,
      name: YO(u, t),
      hide: s,
      type: l,
      color: o,
      unit: "",
      // why doesn't Pie support unit?
      formatter: c,
      graphicalItemId: f
    }
  };
  return /* @__PURE__ */ S.createElement($q, {
    tooltipEntrySettings: v
  });
}), Cz = (e, t) => e > t ? "start" : e < t ? "end" : "middle", Iz = (e, t, r) => mt(typeof t == "function" ? t(e) : t, r, r * 0.8), kz = (e, t, r) => {
  var n = t.top, i = t.left, a = t.width, o = t.height, u = hS(a, o), s = i + mt(e.cx, a, a / 2), l = n + mt(e.cy, o, o / 2), c = mt(e.innerRadius, u, 0), f = Iz(r, e.outerRadius, u), d = e.maxRadius || Math.sqrt(a * a + o * o) / 2;
  return {
    cx: s,
    cy: l,
    innerRadius: c,
    outerRadius: f,
    maxRadius: d
  };
}, Mz = (e, t) => {
  var r = ft(t - e), n = Math.min(Math.abs(t - e), 360);
  return r * n;
}, Nz = (e, t) => {
  if (/* @__PURE__ */ S.isValidElement(e))
    return /* @__PURE__ */ S.cloneElement(e, t);
  if (typeof e == "function")
    return e(t);
  var r = ze("recharts-pie-label-line", typeof e != "boolean" ? e.className : "");
  t.key;
  var n = rl(t, gz);
  return /* @__PURE__ */ S.createElement(uS, Fn({}, n, {
    type: "linear",
    className: r
  }));
}, Rz = (e, t, r) => {
  if (/* @__PURE__ */ S.isValidElement(e))
    return /* @__PURE__ */ S.cloneElement(e, t);
  var n = r;
  if (typeof e == "function" && (n = e(t), /* @__PURE__ */ S.isValidElement(n)))
    return n;
  var i = ze("recharts-pie-label-text", dq(e));
  return /* @__PURE__ */ S.createElement(my, Fn({}, t, {
    alignmentBaseline: "middle",
    className: i
  }), n);
};
function $z(e) {
  var t = e.sectors, r = e.props, n = e.showLabels, i = r.label, a = r.labelLine, o = r.dataKey;
  if (!n || !i || !t)
    return null;
  var u = xi(r), s = _v(i), l = _v(a), c = typeof i == "object" && "offsetRadius" in i && typeof i.offsetRadius == "number" && i.offsetRadius || 20, f = t.map((d, h) => {
    var p = (d.startAngle + d.endAngle) / 2, v = Le(d.cx, d.cy, d.outerRadius + c, p), m = Ce(Ce(Ce(Ce({}, u), d), {}, {
      // @ts-expect-error customLabelProps is contributing unknown props
      stroke: "none"
    }, s), {}, {
      index: h,
      textAnchor: Cz(v.x, d.cx)
    }, v), y = Ce(Ce(Ce(Ce({}, u), d), {}, {
      // @ts-expect-error customLabelLineProps is contributing unknown props
      fill: "none",
      // @ts-expect-error customLabelLineProps is contributing unknown props
      stroke: d.fill
    }, l), {}, {
      index: h,
      points: [Le(d.cx, d.cy, d.outerRadius, p), v],
      key: "line"
    });
    return /* @__PURE__ */ S.createElement(vo, {
      zIndex: Bt.label,
      key: "label-".concat(d.startAngle, "-").concat(d.endAngle, "-").concat(d.midAngle, "-").concat(h)
    }, /* @__PURE__ */ S.createElement(Pr, null, a && Nz(a, y), Rz(i, m, Ie(d, o))));
  });
  return /* @__PURE__ */ S.createElement(Pr, {
    className: "recharts-pie-labels"
  }, f);
}
function Dz(e) {
  var t = e.sectors, r = e.props, n = e.showLabels, i = r.label;
  return typeof i == "object" && i != null && "position" in i ? /* @__PURE__ */ S.createElement(rq, {
    label: i
  }) : /* @__PURE__ */ S.createElement($z, {
    sectors: t,
    props: r,
    showLabels: n
  });
}
function jz(e) {
  var t = e.sectors, r = e.activeShape, n = e.inactiveShape, i = e.allOtherPieProps, a = e.shape, o = e.id, u = e.animationElapsedTime, s = e.isAnimating, l = e.isEntrance, c = te(Fa), f = te(gP), d = te(bP), h = i.onMouseEnter, p = i.onClick, v = i.onMouseLeave, m = rl(i, bz), y = Mq(h, i.dataKey, o), b = Nq(v), g = Rq(p, i.dataKey, o);
  return t == null || t.length === 0 ? null : /* @__PURE__ */ S.createElement(S.Fragment, null, t.map((_, x) => {
    if ((_ == null ? void 0 : _.startAngle) === 0 && (_ == null ? void 0 : _.endAngle) === 0 && t.length !== 1) return null;
    var w = d == null || d === o, A = String(x) === c && (f == null || i.dataKey === f) && w, P = c ? n : null, T = r && A ? r : P, C = Ce(Ce({}, _), {}, {
      stroke: _.stroke,
      tabIndex: -1,
      index: x,
      isActive: A,
      animationElapsedTime: u,
      isAnimating: s,
      isEntrance: l,
      [XO]: x,
      [ZO]: o
    });
    return /* @__PURE__ */ S.createElement(Pr, Fn({
      key: "sector-".concat(_ == null ? void 0 : _.startAngle, "-").concat(_ == null ? void 0 : _.endAngle, "-").concat(_.midAngle, "-").concat(x),
      tabIndex: -1,
      className: "recharts-pie-sector"
    }, XA(m, _, x), {
      onMouseEnter: y(_, x),
      onMouseLeave: b(_, x),
      onClick: g(_, x)
    }), /* @__PURE__ */ S.createElement(kq, {
      option: T ?? a,
      DefaultShape: ZP,
      shapeProps: C
    }));
  }));
}
function Lz(e) {
  var t, r = e.pieSettings, n = e.displayedData, i = e.cells, a = e.offset, o = r.cornerRadius, u = r.startAngle, s = r.endAngle, l = r.dataKey, c = r.nameKey, f = r.tooltipType, d = Math.abs(r.minAngle), h = Mz(u, s), p = Math.abs(h), v = n.length <= 1 ? 0 : (t = r.paddingAngle) !== null && t !== void 0 ? t : 0, m = n.filter((P) => Ie(P, l, 0) !== 0).length, y = (p >= 360 ? m : m - 1) * v, b = n.reduce((P, T) => {
    var C = Ie(T, l, 0);
    return P + (G(C) ? C : 0);
  }, 0), g = d > 0 && b > 0 && n.some((P) => {
    var T = Ie(P, l, 0), C = (G(T) ? T : 0) / b;
    return T !== 0 && C * p < d;
  }), _ = g ? d : 0, x = p - m * _ - y, w;
  if (b > 0) {
    var A;
    w = n.map((P, T) => {
      var C = Ie(P, l, 0), O = Ie(P, c, T), D = kz(r, a, P), j = (G(C) ? C : 0) / b, z, E = Ce(Ce({}, P), i && i[T] && i[T].props), M = E != null && "fill" in E && typeof E.fill == "string" ? E.fill : r.fill;
      T ? z = A.endAngle + ft(h) * v * (C !== 0 ? 1 : 0) : z = u;
      var N = z + ft(h) * ((C !== 0 ? _ : 0) + j * x), k = (z + N) / 2, R = (D.innerRadius + D.outerRadius) / 2, W = [{
        name: O,
        value: C,
        payload: E,
        dataKey: l,
        type: f,
        color: M,
        fill: M,
        graphicalItemId: r.id
      }], Z = Le(D.cx, D.cy, R, k);
      return A = Ce(Ce(Ce(Ce({}, r.presentationProps), {}, {
        percent: j,
        cornerRadius: typeof o == "string" ? parseFloat(o) : o,
        name: O,
        tooltipPayload: W,
        midAngle: k,
        middleRadius: R,
        tooltipPosition: Z
      }, E), D), {}, {
        value: C,
        dataKey: l,
        startAngle: z,
        endAngle: N,
        payload: E,
        paddingAngle: C !== 0 ? ft(h) * v : 0
      }), A;
    });
  }
  return w;
}
function qz(e) {
  var t = e.showLabels, r = e.sectors, n = e.children, i = ue(() => !t || !r ? [] : r.map((a) => ({
    value: a.value,
    payload: a.payload,
    clockWise: !1,
    parentViewBox: void 0,
    viewBox: {
      cx: a.cx,
      cy: a.cy,
      innerRadius: a.innerRadius,
      outerRadius: a.outerRadius,
      startAngle: a.startAngle,
      endAngle: a.endAngle,
      clockWise: !1
    },
    fill: a.fill
  })), [r, t]);
  return /* @__PURE__ */ S.createElement(JL, {
    value: t ? i : void 0
  }, n);
}
var zz = (e, t) => {
  if (e == null) return [];
  var r = [], n = e.find((a) => a.status !== "removed"), i = n ? n.next.startAngle : 0;
  return e.forEach((a, o) => {
    if (a.status !== "removed") {
      var u = o > 0 ? Zr(a.next, "paddingAngle", 0) : 0;
      if (a.status === "matched") {
        var s = xn(a.prev.endAngle - a.prev.startAngle, a.next.endAngle - a.next.startAngle, t), l = Ce(Ce({}, a.next), {}, {
          startAngle: i + u,
          endAngle: i + s + u
        });
        r.push(l), i = l.endAngle;
      } else {
        var c = xn(0, a.next.endAngle - a.next.startAngle, t), f = Ce(Ce({}, a.next), {}, {
          startAngle: i + u,
          endAngle: i + c + u
        });
        r.push(f), i = f.endAngle;
      }
    }
  }), r;
};
function Fz(e) {
  var t, r, n, i, a = e.props, o = e.previousSectorsRef, u = e.id, s = a.sectors, l = a.activeShape, c = a.inactiveShape, f = a.animationInterpolateFn, d = Jq(a.onAnimationStart, a.onAnimationEnd), h = d.isAnimating, p = d.handleAnimationStart, v = d.handleAnimationEnd, m = h4();
  if (m == null) return null;
  var y = s[0];
  return /* @__PURE__ */ S.createElement(qz, {
    showLabels: !h,
    sectors: s
  }, /* @__PURE__ */ S.createElement(ez, {
    animationInput: a,
    animationIdPrefix: "recharts-pie-",
    items: s,
    previousItemsRef: o,
    isAnimationActive: a.isAnimationActive,
    animationBegin: a.animationBegin,
    animationDuration: a.animationDuration,
    animationEasing: a.animationEasing,
    onAnimationStart: p,
    onAnimationEnd: v,
    animationInterpolateFn: f,
    animationMatchBy: a.animationMatchBy,
    layout: m
  }, (b, g, _) => /* @__PURE__ */ S.createElement(Pr, null, /* @__PURE__ */ S.createElement(jz, {
    sectors: b,
    activeShape: l,
    inactiveShape: c,
    allOtherPieProps: a,
    shape: a.shape,
    id: u,
    animationElapsedTime: g,
    isAnimating: h || g < 1,
    isEntrance: _
  }))), /* @__PURE__ */ S.createElement(Dz, {
    showLabels: !h,
    sectors: s,
    props: a
  }), /* @__PURE__ */ S.createElement(zL, {
    cx: (t = y == null ? void 0 : y.cx) !== null && t !== void 0 ? t : 0,
    cy: (r = y == null ? void 0 : y.cy) !== null && r !== void 0 ? r : 0,
    innerRadius: (n = y == null ? void 0 : y.innerRadius) !== null && n !== void 0 ? n : 0,
    outerRadius: (i = y == null ? void 0 : y.outerRadius) !== null && i !== void 0 ? i : 0,
    startAngle: a.startAngle,
    endAngle: a.endAngle,
    clockWise: !1
  }, a.children));
}
var Bz = {
  animationBegin: 400,
  animationDuration: 1500,
  animationEasing: "ease",
  animationInterpolateFn: zz,
  animationMatchBy: YP,
  cx: "50%",
  cy: "50%",
  dataKey: "value",
  endAngle: 360,
  fill: "#808080",
  hide: !1,
  innerRadius: 0,
  isAnimationActive: "auto",
  label: !1,
  labelLine: !0,
  legendType: "rect",
  minAngle: 0,
  nameKey: "name",
  outerRadius: "80%",
  paddingAngle: 0,
  rootTabIndex: 0,
  shape: ZP,
  startAngle: 0,
  stroke: "#fff",
  zIndex: Bt.area
};
function Wz(e) {
  var t = e.id, r = rl(e, _z), n = e.hide, i = e.className, a = e.rootTabIndex, o = ue(() => HP(e.children, Gr), [e.children]), u = te((c) => bq(c, t, o)), s = J(null), l = ze("recharts-pie", i);
  return n || u == null ? (s.current = null, /* @__PURE__ */ S.createElement(Pr, {
    tabIndex: a,
    className: l
  })) : /* @__PURE__ */ S.createElement(vo, {
    zIndex: e.zIndex
  }, /* @__PURE__ */ S.createElement(Tz, {
    dataKey: e.dataKey,
    nameKey: e.nameKey,
    sectors: u,
    stroke: e.stroke,
    strokeWidth: e.strokeWidth,
    fill: e.fill,
    name: e.name,
    hide: e.hide,
    tooltipType: e.tooltipType,
    formatter: e.formatter,
    id: t,
    activeShape: e.activeShape
  }), /* @__PURE__ */ S.createElement(Pr, {
    tabIndex: a,
    className: l
  }, /* @__PURE__ */ S.createElement(Fz, {
    props: Ce(Ce({}, r), {}, {
      sectors: u
    }),
    previousSectorsRef: s,
    id: t
  })));
}
function Uz(e) {
  var t = Vt(e, Bz), r = t.id, n = rl(t, wz), i = xi(n);
  return /* @__PURE__ */ S.createElement(cz, {
    id: r,
    type: "pie"
  }, (a) => /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement(yz, {
    type: "pie",
    id: a,
    data: n.data,
    dataKey: n.dataKey,
    hide: n.hide,
    angleAxisId: 0,
    radiusAxisId: 0,
    name: n.name,
    nameKey: n.nameKey,
    tooltipType: n.tooltipType,
    legendType: n.legendType,
    fill: n.fill,
    cx: n.cx,
    cy: n.cy,
    startAngle: n.startAngle,
    endAngle: n.endAngle,
    paddingAngle: n.paddingAngle,
    minAngle: n.minAngle,
    innerRadius: n.innerRadius,
    outerRadius: n.outerRadius,
    cornerRadius: n.cornerRadius,
    presentationProps: i,
    maxRadius: t.maxRadius
  }), /* @__PURE__ */ S.createElement(Ez, Fn({}, n, {
    id: a
  })), /* @__PURE__ */ S.createElement(Wz, Fn({}, n, {
    id: a
  }))));
}
var bi = Uz;
bi.displayName = "Pie";
function H1(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function Ho(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? H1(Object(r), !0).forEach(function(n) {
      Vz(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : H1(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function Vz(e, t, r) {
  return (t = Hz(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function Hz(e) {
  var t = Kz(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Kz(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var Gz = {
  xAxis: {},
  yAxis: {},
  zAxis: {}
}, QP = ot({
  name: "cartesianAxis",
  initialState: Gz,
  reducers: {
    addXAxis: {
      reducer(e, t) {
        e.xAxis[t.payload.id] = se(t.payload);
      },
      prepare: Pe()
    },
    replaceXAxis: {
      reducer(e, t) {
        var r = t.payload, n = r.prev, i = r.next;
        e.xAxis[n.id] !== void 0 && (n.id !== i.id && delete e.xAxis[n.id], e.xAxis[i.id] = se(i));
      },
      prepare: Pe()
    },
    removeXAxis: {
      reducer(e, t) {
        delete e.xAxis[t.payload.id];
      },
      prepare: Pe()
    },
    addYAxis: {
      reducer(e, t) {
        e.yAxis[t.payload.id] = se(t.payload);
      },
      prepare: Pe()
    },
    replaceYAxis: {
      reducer(e, t) {
        var r = t.payload, n = r.prev, i = r.next;
        e.yAxis[n.id] !== void 0 && (n.id !== i.id && delete e.yAxis[n.id], e.yAxis[i.id] = se(i));
      },
      prepare: Pe()
    },
    removeYAxis: {
      reducer(e, t) {
        delete e.yAxis[t.payload.id];
      },
      prepare: Pe()
    },
    addZAxis: {
      reducer(e, t) {
        e.zAxis[t.payload.id] = se(t.payload);
      },
      prepare: Pe()
    },
    replaceZAxis: {
      reducer(e, t) {
        var r = t.payload, n = r.prev, i = r.next;
        e.zAxis[n.id] !== void 0 && (n.id !== i.id && delete e.zAxis[n.id], e.zAxis[i.id] = se(i));
      },
      prepare: Pe()
    },
    removeZAxis: {
      reducer(e, t) {
        delete e.zAxis[t.payload.id];
      },
      prepare: Pe()
    },
    updateYAxisWidth(e, t) {
      var r = t.payload, n = r.id, i = r.width, a = e.yAxis[n];
      if (a) {
        var o, u = a.widthHistory || [];
        if (u.length === 3 && u[0] === u[2] && i === u[1] && i !== a.width && Math.abs(i - ((o = u[0]) !== null && o !== void 0 ? o : 0)) <= 1)
          return;
        var s = [...u, i].slice(-3);
        e.yAxis[n] = Ho(Ho({}, a), {}, {
          width: i,
          widthHistory: s
        });
      }
    },
    updateXAxisHeight(e, t) {
      var r = t.payload, n = r.id, i = r.height, a = e.xAxis[n];
      if (a) {
        var o, u = a.heightHistory || [];
        if (u.length === 3 && u[0] === u[2] && i === u[1] && i !== a.height && Math.abs(i - ((o = u[0]) !== null && o !== void 0 ? o : 0)) <= 1)
          return;
        var s = [...u, i].slice(-3);
        e.xAxis[n] = Ho(Ho({}, a), {}, {
          height: i,
          heightHistory: s
        });
      }
    }
  }
}), Kt = QP.actions;
Kt.addXAxis;
Kt.replaceXAxis;
Kt.removeXAxis;
Kt.addYAxis;
Kt.replaceYAxis;
Kt.removeYAxis;
Kt.addZAxis;
Kt.replaceZAxis;
Kt.removeZAxis;
Kt.updateYAxisWidth;
Kt.updateXAxisHeight;
var Yz = QP.reducer, Xz = I([Ge], (e) => ({
  top: e.top,
  bottom: e.bottom,
  left: e.left,
  right: e.right
})), Zz = I([Xz, fr, dr], (e, t, r) => {
  if (!(!e || t == null || r == null))
    return {
      x: e.left,
      y: e.top,
      width: Math.max(0, t - e.left - e.right),
      height: Math.max(0, r - e.top - e.bottom)
    };
}), Qz = () => te(Zz), Jz = (e) => {
  var t = e.chartData, r = $e(), n = nn();
  return pe(() => n ? () => {
  } : (r(l1(t)), () => {
    r(l1(void 0));
  }), [t, r, n]), null;
}, K1 = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  padding: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  }
}, JP = ot({
  name: "brush",
  initialState: K1,
  reducers: {
    setBrushSettings(e, t) {
      return t.payload == null ? K1 : t.payload;
    }
  }
});
JP.actions.setBrushSettings;
var eF = JP.reducer, tF = {
  dots: [],
  areas: [],
  lines: []
}, eT = ot({
  name: "referenceElements",
  initialState: tF,
  reducers: {
    addDot: (e, t) => {
      e.dots.push(t.payload);
    },
    removeDot: (e, t) => {
      var r = Tt(e).dots.findIndex((n) => n === t.payload);
      r !== -1 && e.dots.splice(r, 1);
    },
    addArea: (e, t) => {
      e.areas.push(t.payload);
    },
    removeArea: (e, t) => {
      var r = Tt(e).areas.findIndex((n) => n === t.payload);
      r !== -1 && e.areas.splice(r, 1);
    },
    addLine: (e, t) => {
      e.lines.push(se(t.payload));
    },
    removeLine: (e, t) => {
      var r = Tt(e).lines.findIndex((n) => n === t.payload);
      r !== -1 && e.lines.splice(r, 1);
    }
  }
}), Vi = eT.actions;
Vi.addDot;
Vi.removeDot;
Vi.addArea;
Vi.removeArea;
Vi.addLine;
Vi.removeLine;
var rF = eT.reducer;
function nF(e, t) {
  return uF(e) || oF(e, t) || aF(e, t) || iF();
}
function iF() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function aF(e, t) {
  if (e) {
    if (typeof e == "string") return G1(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? G1(e, t) : void 0;
  }
}
function G1(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function oF(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], s = !0, l = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(s = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (c) {
      l = !0, i = c;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function uF(e) {
  if (Array.isArray(e)) return e;
}
var sF = /* @__PURE__ */ et(void 0), lF = (e) => {
  var t = e.children, r = be("".concat(ka("recharts"), "-clip")), n = nF(r, 1), i = n[0], a = Qz();
  if (a == null)
    return null;
  var o = a.x, u = a.y, s = a.width, l = a.height;
  return /* @__PURE__ */ S.createElement(sF.Provider, {
    value: i
  }, /* @__PURE__ */ S.createElement("defs", null, /* @__PURE__ */ S.createElement("clipPath", {
    id: i
  }, /* @__PURE__ */ S.createElement("rect", {
    x: o,
    y: u,
    height: l,
    width: s
  }))), t);
}, cF = {
  xAxis: {},
  yAxis: {}
}, tT = ot({
  name: "renderedTicks",
  initialState: cF,
  reducers: {
    setRenderedTicks: (e, t) => {
      var r = t.payload, n = r.axisType, i = r.axisId, a = r.ticks;
      e[n][i] = se(a);
    },
    removeRenderedTicks: (e, t) => {
      var r = t.payload, n = r.axisType, i = r.axisId;
      delete e[n][i];
    }
  }
}), rT = tT.actions;
rT.setRenderedTicks;
rT.removeRenderedTicks;
var fF = tT.reducer, dF = {}, nT = ot({
  name: "errorBars",
  initialState: dF,
  reducers: {
    addErrorBar: (e, t) => {
      var r = t.payload, n = r.itemId, i = r.errorBar;
      e[n] || (e[n] = []), e[n].push(i);
    },
    replaceErrorBar: (e, t) => {
      var r = t.payload, n = r.itemId, i = r.prev, a = r.next;
      e[n] && (e[n] = e[n].map((o) => o.dataKey === i.dataKey && o.direction === i.direction ? a : o));
    },
    removeErrorBar: (e, t) => {
      var r = t.payload, n = r.itemId, i = r.errorBar;
      e[n] && (e[n] = e[n].filter((a) => a.dataKey !== i.dataKey || a.direction !== i.direction));
    }
  }
}), _y = nT.actions;
_y.addErrorBar;
_y.replaceErrorBar;
_y.removeErrorBar;
var hF = nT.reducer, vF = (e, t) => t, wy = I([vF, Me, DS, Ye, vP, Rr, zD, Ge], KD);
function pF(e) {
  return "getBBox" in e.currentTarget && typeof e.currentTarget.getBBox == "function";
}
function xy(e) {
  var t = e.currentTarget.getBoundingClientRect(), r, n;
  if (pF(e)) {
    var i = e.currentTarget.getBBox();
    r = i.width > 0 ? t.width / i.width : 1, n = i.height > 0 ? t.height / i.height : 1;
  } else {
    var a = e.currentTarget;
    r = a.offsetWidth > 0 ? t.width / a.offsetWidth : 1, n = a.offsetHeight > 0 ? t.height / a.offsetHeight : 1;
  }
  var o = (u, s) => ({
    /*
     * Here it's important to use:
     * - event.clientX and event.clientY to get the mouse position relative to the viewport, including scroll.
     * - pageX and pageY are not used because they are relative to the whole document, and ignore scroll.
     * - rect.left and rect.top are used to get the position of the chart relative to the viewport.
     * - offsetX and offsetY are not used because they are relative to the offset parent
     *  which may or may not be the same as the clientX and clientY, depending on the position of the chart in the DOM
     *  and surrounding element styles. CSS position: relative, absolute, fixed, will change the offset parent.
     * - scaleX and scaleY are necessary for when the chart element is scaled using CSS `transform: scale(N)`.
     */
    relativeX: Math.round((u - t.left) / r),
    relativeY: Math.round((s - t.top) / n)
  });
  return "touches" in e ? Array.from(e.touches).map((u) => o(u.clientX, u.clientY)) : o(e.clientX, e.clientY);
}
var iT = gt("mouseClick"), aT = Ja();
aT.startListening({
  actionCreator: iT,
  effect: (e, t) => {
    var r = e.payload, n = wy(t.getState(), xy(r));
    (n == null ? void 0 : n.activeIndex) != null && t.dispatch($$({
      activeIndex: n.activeIndex,
      activeDataKey: void 0,
      activeCoordinate: n.activeCoordinate
    }));
  }
});
var ap = gt("mouseMove"), oT = Ja(), ci = null, pn = null, Wc = null;
oT.startListening({
  actionCreator: ap,
  effect: (e, t) => {
    var r = e.payload, n = t.getState(), i = n.eventSettings, a = i.throttleDelay, o = i.throttledEvents, u = o === "all" || (o == null ? void 0 : o.includes("mousemove"));
    ci !== null && (cancelAnimationFrame(ci), ci = null), pn !== null && (typeof a != "number" || !u) && (clearTimeout(pn), pn = null), Wc = xy(r);
    var s = () => {
      var l = t.getState(), c = fo(l, l.tooltip.settings.shared);
      if (!Wc) {
        ci = null, pn = null;
        return;
      }
      if (c === "axis") {
        var f = wy(l, Wc);
        (f == null ? void 0 : f.activeIndex) != null ? t.dispatch(iP({
          activeIndex: f.activeIndex,
          activeDataKey: void 0,
          activeCoordinate: f.activeCoordinate
        })) : t.dispatch(nP());
      }
      ci = null, pn = null;
    };
    if (!u) {
      s();
      return;
    }
    a === "raf" ? ci = requestAnimationFrame(s) : typeof a == "number" && pn === null && (pn = setTimeout(s, a));
  }
});
function mF(e, t) {
  return t instanceof HTMLElement ? "HTMLElement <".concat(t.tagName, ' class="').concat(t.className, '">') : t === window ? "global.window" : e === "children" && typeof t == "object" && t !== null ? "<<CHILDREN>>" : t;
}
var Y1 = {
  accessibilityLayer: !0,
  barCategoryGap: "10%",
  barGap: 4,
  barSize: void 0,
  className: void 0,
  maxBarSize: void 0,
  stackOffset: "none",
  syncId: void 0,
  syncMethod: "index",
  baseValue: void 0,
  reverseStackOrder: !1
}, uT = ot({
  name: "rootProps",
  initialState: Y1,
  reducers: {
    updateOptions: (e, t) => {
      var r;
      e.accessibilityLayer = t.payload.accessibilityLayer, e.barCategoryGap = t.payload.barCategoryGap, e.barGap = (r = t.payload.barGap) !== null && r !== void 0 ? r : Y1.barGap, e.barSize = t.payload.barSize, e.maxBarSize = t.payload.maxBarSize, e.stackOffset = t.payload.stackOffset, e.syncId = t.payload.syncId, e.syncMethod = t.payload.syncMethod, e.className = t.payload.className, e.baseValue = t.payload.baseValue, e.reverseStackOrder = t.payload.reverseStackOrder;
    }
  }
}), yF = uT.reducer, gF = uT.actions.updateOptions, bF = null, _F = {
  updatePolarOptions: (e, t) => e === null ? t.payload : (e.startAngle = t.payload.startAngle, e.endAngle = t.payload.endAngle, e.cx = t.payload.cx, e.cy = t.payload.cy, e.innerRadius = t.payload.innerRadius, e.outerRadius = t.payload.outerRadius, e)
}, sT = ot({
  name: "polarOptions",
  initialState: bF,
  reducers: _F
}), wF = sT.actions.updatePolarOptions, xF = sT.reducer, lT = gt("keyDown"), cT = gt("focus"), fT = gt("blur"), nl = Ja(), fi = null, mn = null, Ko = null;
nl.startListening({
  actionCreator: lT,
  effect: (e, t) => {
    Ko = e.payload, fi !== null && (cancelAnimationFrame(fi), fi = null);
    var r = t.getState(), n = r.eventSettings, i = n.throttleDelay, a = n.throttledEvents, o = a === "all" || a.includes("keydown");
    mn !== null && (typeof i != "number" || !o) && (clearTimeout(mn), mn = null);
    var u = () => {
      try {
        var s = t.getState(), l = s.rootProps.accessibilityLayer !== !1;
        if (!l)
          return;
        var c = s.tooltip.keyboardInteraction, f = Ko;
        if (f !== "ArrowRight" && f !== "ArrowLeft" && f !== "Enter")
          return;
        var d = wa(c, zn(s), Ii(s), ki(s)), h = d == null ? -1 : Number(d), p = !Number.isFinite(h) || h < 0, v = Rr(s), m = zn(s), y = fo(s, s.tooltip.settings.shared);
        if (f === "Enter") {
          if (p)
            return;
          var b = Hu(s, y, "hover", String(c.index));
          t.dispatch(Vu({
            active: !c.active,
            activeIndex: c.index,
            activeCoordinate: b
          }));
          return;
        }
        var g = O$(s), _ = g === "left-to-right" ? 1 : -1, x = f === "ArrowRight" ? 1 : -1, w;
        if (p) {
          var A = Ii(s), P = ki(s), T = x * _, C = (E) => ({
            active: !1,
            index: String(E),
            dataKey: void 0,
            graphicalItemId: void 0,
            coordinate: void 0
          });
          if (w = -1, T > 0) {
            for (var O = 0; O < m.length; O++)
              if (wa(C(O), m, A, P) != null) {
                w = O;
                break;
              }
          } else
            for (var D = m.length - 1; D >= 0; D--)
              if (wa(C(D), m, A, P) != null) {
                w = D;
                break;
              }
          if (w < 0)
            return;
        } else {
          w = h + x * _;
          var j = (v == null ? void 0 : v.length) || m.length;
          if (j === 0 || w >= j || w < 0)
            return;
        }
        var z = Hu(s, y, "hover", String(w));
        t.dispatch(Vu({
          active: !0,
          activeIndex: w.toString(),
          activeCoordinate: z
        }));
      } finally {
        fi = null, mn = null;
      }
    };
    if (!o) {
      u();
      return;
    }
    i === "raf" ? fi = requestAnimationFrame(u) : typeof i == "number" && mn === null && (u(), Ko = null, mn = setTimeout(() => {
      Ko ? u() : (mn = null, fi = null);
    }, i));
  }
});
nl.startListening({
  actionCreator: cT,
  effect: (e, t) => {
    var r = t.getState(), n = r.rootProps.accessibilityLayer !== !1;
    if (n) {
      var i = r.tooltip.keyboardInteraction;
      if (!i.active && i.index == null) {
        var a = "0", o = fo(r, r.tooltip.settings.shared), u = Hu(r, o, "hover", String(a));
        t.dispatch(Vu({
          active: !0,
          activeIndex: a,
          activeCoordinate: u
        }));
      }
    }
  }
});
nl.startListening({
  actionCreator: fT,
  effect: (e, t) => {
    var r = t.getState(), n = r.rootProps.accessibilityLayer !== !1;
    if (n) {
      var i = r.tooltip.keyboardInteraction;
      i.active && t.dispatch(Vu({
        active: !1,
        activeIndex: i.index,
        activeCoordinate: i.coordinate
      }));
    }
  }
});
function dT(e) {
  e.persist();
  var t = e.currentTarget;
  return new Proxy(e, {
    get: (r, n) => {
      if (n === "currentTarget")
        return t;
      var i = Reflect.get(r, n);
      return typeof i == "function" ? i.bind(r) : i;
    }
  });
}
var Ot = gt("externalEvent"), hT = Ja(), Go = /* @__PURE__ */ new Map(), aa = /* @__PURE__ */ new Map(), Uc = /* @__PURE__ */ new Map();
hT.startListening({
  actionCreator: Ot,
  effect: (e, t) => {
    var r = e.payload, n = r.handler, i = r.reactEvent;
    if (n != null) {
      var a = i.type, o = dT(i);
      Uc.set(a, {
        handler: n,
        reactEvent: o
      });
      var u = Go.get(a);
      u !== void 0 && (cancelAnimationFrame(u), Go.delete(a));
      var s = t.getState(), l = s.eventSettings, c = l.throttleDelay, f = l.throttledEvents, d = f, h = d === "all" || (d == null ? void 0 : d.includes(a)), p = aa.get(a);
      p !== void 0 && (typeof c != "number" || !h) && (clearTimeout(p), aa.delete(a));
      var v = () => {
        var b = Uc.get(a);
        try {
          if (!b)
            return;
          var g = b.handler, _ = b.reactEvent, x = t.getState(), w = {
            activeCoordinate: SD(x),
            activeDataKey: gP(x),
            activeIndex: Fa(x),
            activeLabel: yP(x),
            activeTooltipIndex: Fa(x),
            isTooltipActive: ED(x)
          };
          g && g(w, _);
        } finally {
          Go.delete(a), aa.delete(a), Uc.delete(a);
        }
      };
      if (!h) {
        v();
        return;
      }
      if (c === "raf") {
        var m = requestAnimationFrame(v);
        Go.set(a, m);
      } else if (typeof c == "number") {
        if (!aa.has(a)) {
          v();
          var y = setTimeout(v, c);
          aa.set(a, y);
        }
      } else
        v();
    }
  }
});
var AF = I([Wi], (e) => e.tooltipItemPayloads), OF = I([AF, (e, t) => t, (e, t, r) => r], (e, t, r) => {
  if (t != null) {
    var n = e.find((a) => a.settings.graphicalItemId === r);
    if (n != null) {
      var i = n.getPosition;
      if (i != null)
        return i(t);
    }
  }
}), vT = gt("touchMove"), pT = Ja(), yn = null, qr = null, X1 = null, oa = null;
pT.startListening({
  actionCreator: vT,
  effect: (e, t) => {
    var r = e.payload;
    if (!(r.touches == null || r.touches.length === 0)) {
      oa = dT(r);
      var n = t.getState(), i = n.eventSettings, a = i.throttleDelay, o = i.throttledEvents, u = o === "all" || o.includes("touchmove");
      yn !== null && (cancelAnimationFrame(yn), yn = null), qr !== null && (typeof a != "number" || !u) && (clearTimeout(qr), qr = null), X1 = Array.from(r.touches).map((l) => xy({
        clientX: l.clientX,
        clientY: l.clientY,
        currentTarget: r.currentTarget
      }));
      var s = () => {
        if (oa != null) {
          var l = t.getState(), c = fo(l, l.tooltip.settings.shared);
          if (c === "axis") {
            var f, d = (f = X1) === null || f === void 0 ? void 0 : f[0];
            if (d == null) {
              yn = null, qr = null;
              return;
            }
            var h = wy(l, d);
            (h == null ? void 0 : h.activeIndex) != null && t.dispatch(iP({
              activeIndex: h.activeIndex,
              activeDataKey: void 0,
              activeCoordinate: h.activeCoordinate
            }));
          } else if (c === "item") {
            var p, v = oa.touches[0];
            if (document.elementFromPoint == null || v == null)
              return;
            var m = document.elementFromPoint(v.clientX, v.clientY);
            if (!m || !m.getAttribute)
              return;
            var y = m.getAttribute(XO), b = (p = m.getAttribute(ZO)) !== null && p !== void 0 ? p : void 0, g = Zn(l).find((w) => w.id === b);
            if (y == null || g == null || b == null)
              return;
            var _ = g.dataKey, x = OF(l, y, b);
            t.dispatch(rP({
              activeDataKey: _,
              activeIndex: y,
              activeCoordinate: x,
              activeGraphicalItemId: b
            }));
          }
          yn = null, qr = null;
        }
      };
      if (!u) {
        s();
        return;
      }
      a === "raf" ? yn = requestAnimationFrame(s) : typeof a == "number" && qr === null && (s(), oa = null, qr = setTimeout(() => {
        oa ? s() : (qr = null, yn = null);
      }, a));
    }
  }
});
var mT = {
  throttleDelay: "raf",
  throttledEvents: ["mousemove", "touchmove", "pointermove", "scroll", "wheel"]
}, yT = ot({
  name: "eventSettings",
  initialState: mT,
  reducers: {
    setEventSettings: (e, t) => {
      t.payload.throttleDelay != null && (e.throttleDelay = t.payload.throttleDelay), t.payload.throttledEvents != null && (e.throttledEvents = se(t.payload.throttledEvents));
    }
  }
}), SF = yT.actions.setEventSettings, EF = yT.reducer, PF = mO({
  brush: eF,
  cartesianAxis: Yz,
  chartData: Oj,
  errorBars: hF,
  eventSettings: EF,
  graphicalItems: pz,
  layout: g6,
  legend: _4,
  options: bj,
  polarAxis: fq,
  polarOptions: xF,
  referenceElements: rF,
  renderedTicks: fF,
  rootProps: yF,
  tooltip: D$,
  zIndex: oj
}), TF = function(t) {
  var r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Chart";
  return W5({
    reducer: PF,
    // redux-toolkit v1 types are unhappy with the preloadedState type. Remove the `as any` when bumping to v2
    preloadedState: t,
    // @ts-expect-error redux-toolkit v1 types are unhappy with the middleware array. Remove this comment when bumping to v2
    middleware: (n) => {
      var i;
      return n({
        serializableCheck: !1,
        immutableCheck: !["commonjs", "es6", "production"].includes((i = "es6") !== null && i !== void 0 ? i : "")
      }).concat([aT.middleware, oT.middleware, nl.middleware, hT.middleware, pT.middleware]);
    },
    /*
     * I can't find out how to satisfy typescript here.
     * We return `EnhancerArray<[StoreEnhancer<{}, {}>, StoreEnhancer]>` from this function,
     * but the types say we should return `EnhancerArray<StoreEnhancer<{}, {}>`.
     * Looks like it's badly inferred generics, but it won't allow me to provide the correct type manually either.
     * So let's just ignore the error for now.
     */
    // @ts-expect-error mismatched generics
    enhancers: (n) => {
      var i = n;
      return typeof n == "function" && (i = n()), i.concat($O({
        type: "raf"
      }));
    },
    devTools: {
      serialize: {
        replacer: mF
      },
      name: "recharts-".concat(r)
    }
  });
};
function CF(e) {
  var t = e.preloadedState, r = e.children, n = e.reduxStoreName, i = nn(), a = J(null);
  if (i)
    return r;
  a.current == null && (a.current = TF(t, n));
  var o = zp;
  return /* @__PURE__ */ S.createElement(j4, {
    context: o,
    store: a.current
  }, r);
}
function IF(e) {
  var t = e.layout, r = e.margin, n = $e(), i = nn();
  return pe(() => {
    i || (n(p6(t)), n(v6(r)));
  }, [n, i, t, r]), null;
}
var kF = /* @__PURE__ */ tt(IF, Zp);
function MF(e) {
  var t = $e();
  return pe(() => {
    t(gF(e));
  }, [t, e]), null;
}
var NF = (e) => {
  var t = $e();
  return pe(() => {
    t(SF(e));
  }, [t, e]), null;
}, RF = /* @__PURE__ */ tt(NF, Zp);
function Z1(e) {
  var t = e.zIndex, r = e.isPanorama, n = J(null), i = $e();
  return yt(() => (n.current && i(ij({
    zIndex: t,
    element: n.current,
    isPanorama: r
  })), () => {
    i(aj({
      zIndex: t,
      isPanorama: r
    }));
  }), [i, t, r]), /* @__PURE__ */ S.createElement("g", {
    tabIndex: -1,
    ref: n,
    className: "recharts-zIndex-layer_".concat(t)
  });
}
function Q1(e) {
  var t = e.children, r = e.isPanorama, n = te(YD);
  if (!n || n.length === 0)
    return t;
  var i = n.filter((o) => o < 0), a = n.filter((o) => o > 0);
  return /* @__PURE__ */ S.createElement(S.Fragment, null, i.map((o) => /* @__PURE__ */ S.createElement(Z1, {
    key: o,
    zIndex: o,
    isPanorama: r
  })), t, a.map((o) => /* @__PURE__ */ S.createElement(Z1, {
    key: o,
    zIndex: o,
    isPanorama: r
  })));
}
var $F = ["children"];
function DF(e, t) {
  if (e == null) return {};
  var r, n, i = jF(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function jF(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function Zu() {
  return Zu = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Zu.apply(null, arguments);
}
var LF = {
  width: "100%",
  height: "100%",
  /*
   * display: block is necessary here because the default for an SVG is display: inline,
   * which in some browsers (Chrome) adds a little bit of extra space above and below the SVG
   * to make space for the descender of letters like "g" and "y". This throws off the height calculation
   * and causes the container to grow indefinitely on each render with responsive=true.
   * Display: block removes that extra space.
   *
   * Interestingly, Firefox does not have this problem, but it doesn't hurt to add the style anyway.
   */
  display: "block"
}, qF = /* @__PURE__ */ Ke((e, t) => {
  var r = rS(), n = nS(), i = oS();
  if (!Jr(r) || !Jr(n))
    return null;
  var a = e.children, o = e.otherAttributes, u = e.title, s = e.desc, l, c;
  return o != null && (typeof o.tabIndex == "number" ? l = o.tabIndex : l = i ? 0 : void 0, typeof o.role == "string" ? c = o.role : c = i ? "application" : void 0), /* @__PURE__ */ S.createElement(Sp, Zu({}, o, {
    title: u,
    desc: s,
    role: c,
    tabIndex: l,
    width: r,
    height: n,
    style: LF,
    ref: t
  }), a);
}), zF = (e) => {
  var t = e.children, r = te(Is);
  if (!r)
    return null;
  var n = r.width, i = r.height, a = r.y, o = r.x;
  return /* @__PURE__ */ S.createElement(Sp, {
    width: n,
    height: i,
    x: o,
    y: a
  }, t);
}, J1 = /* @__PURE__ */ Ke((e, t) => {
  var r = e.children, n = DF(e, $F), i = nn();
  return i ? /* @__PURE__ */ S.createElement(zF, null, /* @__PURE__ */ S.createElement(Q1, {
    isPanorama: !0
  }, r)) : /* @__PURE__ */ S.createElement(qF, Zu({
    ref: t
  }, n), /* @__PURE__ */ S.createElement(Q1, {
    isPanorama: !1
  }, r));
});
function FF(e, t) {
  return VF(e) || UF(e, t) || WF(e, t) || BF();
}
function BF() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function WF(e, t) {
  if (e) {
    if (typeof e == "string") return e_(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? e_(e, t) : void 0;
  }
}
function e_(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function UF(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], s = !0, l = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(s = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (c) {
      l = !0, i = c;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function VF(e) {
  if (Array.isArray(e)) return e;
}
function HF() {
  var e = $e(), t = be(null), r = FF(t, 2), n = r[0], i = r[1], a = te(M6);
  return pe(() => {
    if (n != null) {
      var o = n.getBoundingClientRect(), u = o.width / n.offsetWidth;
      _e(u) && u !== a && e(y6(u));
    }
  }, [n, e, a]), i;
}
function t_(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function KF(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? t_(Object(r), !0).forEach(function(n) {
      GF(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : t_(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function GF(e, t, r) {
  return (t = YF(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function YF(e) {
  var t = XF(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function XF(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function Yr() {
  return Yr = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Yr.apply(null, arguments);
}
function Qu(e, t) {
  return eB(e) || JF(e, t) || QF(e, t) || ZF();
}
function ZF() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function QF(e, t) {
  if (e) {
    if (typeof e == "string") return r_(e, t);
    var r = {}.toString.call(e).slice(8, -1);
    return r === "Object" && e.constructor && (r = e.constructor.name), r === "Map" || r === "Set" ? Array.from(e) : r === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r) ? r_(e, t) : void 0;
  }
}
function r_(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function JF(e, t) {
  var r = e == null ? null : typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r != null) {
    var n, i, a, o, u = [], s = !0, l = !1;
    try {
      if (a = (r = r.call(e)).next, t !== 0) for (; !(s = (n = a.call(r)).done) && (u.push(n.value), u.length !== t); s = !0) ;
    } catch (c) {
      l = !0, i = c;
    } finally {
      try {
        if (!s && r.return != null && (o = r.return(), Object(o) !== o)) return;
      } finally {
        if (l) throw i;
      }
    }
    return u;
  }
}
function eB(e) {
  if (Array.isArray(e)) return e;
}
var tB = () => (Nj(), null);
function Ju(e) {
  if (typeof e == "number")
    return e;
  if (typeof e == "string") {
    var t = parseFloat(e);
    if (!Number.isNaN(t))
      return t;
  }
  return 0;
}
var rB = /* @__PURE__ */ Ke((e, t) => {
  var r, n, i = J(null), a = be({
    containerWidth: Ju((r = e.style) === null || r === void 0 ? void 0 : r.width),
    containerHeight: Ju((n = e.style) === null || n === void 0 ? void 0 : n.height)
  }), o = Qu(a, 2), u = o[0], s = o[1], l = re((f, d) => {
    s((h) => {
      var p = Math.round(f), v = Math.round(d);
      return h.containerWidth === p && h.containerHeight === v ? h : {
        containerWidth: p,
        containerHeight: v
      };
    });
  }, []), c = re((f) => {
    if (typeof t == "function" && t(f), i.current != null && (i.current.disconnect(), i.current = null), f != null && typeof ResizeObserver < "u") {
      var d = f.getBoundingClientRect(), h = d.width, p = d.height;
      l(h, p);
      var v = (y) => {
        var b = y[0];
        if (b != null) {
          var g = b.contentRect, _ = g.width, x = g.height;
          l(_, x);
        }
      }, m = new ResizeObserver(v);
      m.observe(f), i.current = m;
    }
  }, [t, l]);
  return pe(() => () => {
    var f = i.current;
    f != null && f.disconnect();
  }, [l]), /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement(to, {
    width: u.containerWidth,
    height: u.containerHeight
  }), /* @__PURE__ */ S.createElement("div", Yr({
    ref: c
  }, e)));
}), nB = /* @__PURE__ */ Ke((e, t) => {
  var r = e.width, n = e.height, i = be({
    containerWidth: Ju(r),
    containerHeight: Ju(n)
  }), a = Qu(i, 2), o = a[0], u = a[1], s = re((c, f) => {
    u((d) => {
      var h = Math.round(c), p = Math.round(f);
      return d.containerWidth === h && d.containerHeight === p ? d : {
        containerWidth: h,
        containerHeight: p
      };
    });
  }, []), l = re((c) => {
    if (typeof t == "function" && t(c), c != null) {
      var f = c.getBoundingClientRect(), d = f.width, h = f.height;
      s(d, h);
    }
  }, [t, s]);
  return /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement(to, {
    width: o.containerWidth,
    height: o.containerHeight
  }), /* @__PURE__ */ S.createElement("div", Yr({
    ref: l
  }, e)));
}), iB = /* @__PURE__ */ Ke((e, t) => {
  var r = e.width, n = e.height;
  return /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement(to, {
    width: r,
    height: n
  }), /* @__PURE__ */ S.createElement("div", Yr({
    ref: t
  }, e)));
}), aB = /* @__PURE__ */ Ke((e, t) => {
  var r = e.width, n = e.height;
  return typeof r == "string" || typeof n == "string" ? /* @__PURE__ */ S.createElement(nB, Yr({}, e, {
    ref: t
  })) : typeof r == "number" && typeof n == "number" ? /* @__PURE__ */ S.createElement(iB, Yr({}, e, {
    width: r,
    height: n,
    ref: t
  })) : /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement(to, {
    width: r,
    height: n
  }), /* @__PURE__ */ S.createElement("div", Yr({
    ref: t
  }, e)));
});
function oB(e) {
  return e ? rB : aB;
}
var uB = /* @__PURE__ */ Ke((e, t) => {
  var r = e.children, n = e.className, i = e.height, a = e.onClick, o = e.onContextMenu, u = e.onDoubleClick, s = e.onMouseDown, l = e.onMouseEnter, c = e.onMouseLeave, f = e.onMouseMove, d = e.onMouseUp, h = e.onTouchEnd, p = e.onTouchMove, v = e.onTouchStart, m = e.style, y = e.width, b = e.responsive, g = e.dispatchTouchEvents, _ = g === void 0 ? !0 : g, x = J(null), w = $e(), A = be(null), P = Qu(A, 2), T = P[0], C = P[1], O = be(null), D = Qu(O, 2), j = D[0], z = D[1], E = HF(), M = Yp(), N = (M == null ? void 0 : M.width) > 0 ? M.width : y, k = (M == null ? void 0 : M.height) > 0 ? M.height : i, R = re((B) => {
    E(B), typeof t == "function" && t(B), C(B), z(B), B != null && (x.current = B);
  }, [E, t, C, z]), W = re((B) => {
    w(iT(B)), w(Ot({
      handler: a,
      reactEvent: B
    }));
  }, [w, a]), Z = re((B) => {
    w(ap(B)), w(Ot({
      handler: l,
      reactEvent: B
    }));
  }, [w, l]), ce = re((B) => {
    w(nP()), w(Ot({
      handler: c,
      reactEvent: B
    }));
  }, [w, c]), fe = re((B) => {
    w(ap(B)), w(Ot({
      handler: f,
      reactEvent: B
    }));
  }, [w, f]), de = re(() => {
    w(cT());
  }, [w]), Oe = re(() => {
    w(fT());
  }, [w]), me = re((B) => {
    w(lT(B.key));
  }, [w]), ve = re((B) => {
    w(Ot({
      handler: o,
      reactEvent: B
    }));
  }, [w, o]), Ue = re((B) => {
    w(Ot({
      handler: u,
      reactEvent: B
    }));
  }, [w, u]), U = re((B) => {
    w(Ot({
      handler: s,
      reactEvent: B
    }));
  }, [w, s]), Q = re((B) => {
    w(Ot({
      handler: d,
      reactEvent: B
    }));
  }, [w, d]), H = re((B) => {
    w(Ot({
      handler: v,
      reactEvent: B
    }));
  }, [w, v]), q = re((B) => {
    _ && w(vT(B)), w(Ot({
      handler: p,
      reactEvent: B
    }));
  }, [w, _, p]), we = re((B) => {
    w(Ot({
      handler: h,
      reactEvent: B
    }));
  }, [w, h]), F = oB(b);
  return /* @__PURE__ */ S.createElement(EP.Provider, {
    value: T
  }, /* @__PURE__ */ S.createElement(_A.Provider, {
    value: j
  }, /* @__PURE__ */ S.createElement(F, {
    width: N ?? (m == null ? void 0 : m.width),
    height: k ?? (m == null ? void 0 : m.height),
    className: ze("recharts-wrapper", n),
    style: KF({
      position: "relative",
      cursor: "default",
      width: N,
      height: k
    }, m),
    onClick: W,
    onContextMenu: ve,
    onDoubleClick: Ue,
    onFocus: de,
    onBlur: Oe,
    onKeyDown: me,
    onMouseDown: U,
    onMouseEnter: Z,
    onMouseLeave: ce,
    onMouseMove: fe,
    onMouseUp: Q,
    onTouchEnd: we,
    onTouchMove: q,
    onTouchStart: H,
    ref: R
  }, /* @__PURE__ */ S.createElement(tB, null), r)));
}), sB = ["width", "height", "responsive", "children", "className", "style", "compact", "title", "desc"];
function lB(e, t) {
  if (e == null) return {};
  var r, n, i = cB(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function cB(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var fB = /* @__PURE__ */ Ke((e, t) => {
  var r = e.width, n = e.height, i = e.responsive, a = e.children, o = e.className, u = e.style, s = e.compact, l = e.title, c = e.desc, f = lB(e, sB), d = xi(f);
  return s ? /* @__PURE__ */ S.createElement(S.Fragment, null, /* @__PURE__ */ S.createElement(to, {
    width: r,
    height: n
  }), /* @__PURE__ */ S.createElement(J1, {
    otherAttributes: d,
    title: l,
    desc: c
  }, a)) : /* @__PURE__ */ S.createElement(uB, {
    className: o,
    style: u,
    width: r,
    height: n,
    responsive: i ?? !1,
    onClick: e.onClick,
    onMouseLeave: e.onMouseLeave,
    onMouseEnter: e.onMouseEnter,
    onMouseMove: e.onMouseMove,
    onMouseDown: e.onMouseDown,
    onMouseUp: e.onMouseUp,
    onContextMenu: e.onContextMenu,
    onDoubleClick: e.onDoubleClick,
    onTouchStart: e.onTouchStart,
    onTouchMove: e.onTouchMove,
    onTouchEnd: e.onTouchEnd
  }, /* @__PURE__ */ S.createElement(J1, {
    otherAttributes: d,
    title: l,
    desc: c,
    ref: t
  }, /* @__PURE__ */ S.createElement(lF, null, a)));
});
function dB(e) {
  var t = $e();
  return pe(() => {
    t(wF(e));
  }, [t, e]), null;
}
var hB = ["layout"];
function op() {
  return op = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, op.apply(null, arguments);
}
function vB(e, t) {
  if (e == null) return {};
  var r, n, i = pB(e, t);
  if (Object.getOwnPropertySymbols) {
    var a = Object.getOwnPropertySymbols(e);
    for (n = 0; n < a.length; n++) r = a[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (i[r] = e[r]);
  }
  return i;
}
function pB(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
function n_(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function mB(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? n_(Object(r), !0).forEach(function(n) {
      yB(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : n_(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function yB(e, t, r) {
  return (t = gB(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function gB(e) {
  var t = bB(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function bB(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var _B = {
  top: 5,
  right: 5,
  bottom: 5,
  left: 5
}, gT = mB({
  accessibilityLayer: !0,
  stackOffset: "none",
  barCategoryGap: "10%",
  barGap: 4,
  margin: _B,
  reverseStackOrder: !1,
  syncMethod: "index",
  layout: "radial",
  responsive: !1,
  cx: "50%",
  cy: "50%",
  innerRadius: 0,
  outerRadius: "80%"
}, mT), wB = /* @__PURE__ */ Ke(function(t, r) {
  var n, i = Vt(t.categoricalChartProps, gT), a = i.layout, o = vB(i, hB), u = t.chartName, s = t.defaultTooltipEventType, l = t.validateTooltipEventTypes, c = t.tooltipPayloadSearcher, f = {
    chartName: u,
    defaultTooltipEventType: s,
    validateTooltipEventTypes: l,
    tooltipPayloadSearcher: c,
    eventEmitter: void 0
  };
  return /* @__PURE__ */ S.createElement(CF, {
    preloadedState: {
      options: f
    },
    reduxStoreName: (n = i.id) !== null && n !== void 0 ? n : u
  }, /* @__PURE__ */ S.createElement(Jz, {
    chartData: i.data
  }), /* @__PURE__ */ S.createElement(kF, {
    layout: a,
    margin: i.margin
  }), /* @__PURE__ */ S.createElement(RF, {
    throttleDelay: i.throttleDelay,
    throttledEvents: i.throttledEvents
  }), /* @__PURE__ */ S.createElement(MF, {
    baseValue: void 0,
    accessibilityLayer: i.accessibilityLayer,
    barCategoryGap: i.barCategoryGap,
    maxBarSize: i.maxBarSize,
    stackOffset: i.stackOffset,
    barGap: i.barGap,
    barSize: i.barSize,
    syncId: i.syncId,
    syncMethod: i.syncMethod,
    className: i.className,
    reverseStackOrder: i.reverseStackOrder
  }), /* @__PURE__ */ S.createElement(dB, {
    cx: i.cx,
    cy: i.cy,
    startAngle: i.startAngle,
    endAngle: i.endAngle,
    innerRadius: i.innerRadius,
    outerRadius: i.outerRadius
  }), /* @__PURE__ */ S.createElement(fB, op({}, o, {
    ref: r
  })));
});
function i_(e, t) {
  var r = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    t && (n = n.filter(function(i) {
      return Object.getOwnPropertyDescriptor(e, i).enumerable;
    })), r.push.apply(r, n);
  }
  return r;
}
function a_(e) {
  for (var t = 1; t < arguments.length; t++) {
    var r = arguments[t] != null ? arguments[t] : {};
    t % 2 ? i_(Object(r), !0).forEach(function(n) {
      xB(e, n, r[n]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : i_(Object(r)).forEach(function(n) {
      Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
    });
  }
  return e;
}
function xB(e, t, r) {
  return (t = AB(t)) in e ? Object.defineProperty(e, t, { value: r, enumerable: !0, configurable: !0, writable: !0 }) : e[t] = r, e;
}
function AB(e) {
  var t = OB(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function OB(e, t) {
  if (typeof e != "object" || !e) return e;
  var r = e[Symbol.toPrimitive];
  if (r !== void 0) {
    var n = r.call(e, t);
    if (typeof n != "object") return n;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
var SB = ["item"], EB = a_(a_({}, gT), {}, {
  layout: "centric",
  startAngle: 0,
  endAngle: 360
}), es = /* @__PURE__ */ Ke((e, t) => {
  var r = Vt(e, EB);
  return /* @__PURE__ */ S.createElement(wB, {
    chartName: "PieChart",
    defaultTooltipEventType: "item",
    validateTooltipEventTypes: SB,
    tooltipPayloadSearcher: yj,
    categoricalChartProps: r,
    ref: t
  });
});
const PB = {
  label: "Tol bright",
  source: 'Tol, "Colour Schemes" SRON/EPS/TN/09-002 issue 3.2, Fig. 1',
  sequence: ["#4477aa", "#ee6677", "#228833", "#ccbb44", "#66ccee", "#aa3377"],
  binary: ["#4477aa", "#ee6677"],
  // Tol reserves grey for bad or missing data, deliberately pale so it does not
  // draw attention.
  uncategorized: "#dddddd"
}, TB = {
  label: "Okabe-Ito",
  source: "Okabe & Ito, Color Universal Design (2002, rev. 2008)",
  sequence: [
    "#0072b2",
    "#d55e00",
    "#009e73",
    "#cc79a7",
    "#e69f00",
    "#56b4e9",
    "#f0e442",
    "#000000"
  ],
  binary: ["#0072b2", "#d55e00"],
  uncategorized: "#dddddd"
}, o_ = {
  tol: PB,
  okabe: TB
}, CB = "tol", xa = "#393939", IB = 0.85, kB = ["Cardiovascular", "Respiratory", "Cancer", "Neurologic"];
function MB({
  data: e,
  filters: t,
  onFilterAdd: r,
  palette: n
}) {
  const i = (u) => {
    const s = kB.indexOf(u);
    return s === -1 ? n.uncategorized : n.sequence[s];
  }, a = e.conditions.flatMap(
    (u) => u.children.map((s) => ({
      name: s.name,
      value: s.value,
      category: u.name,
      color: i(u.name)
    }))
  ), o = e.conditions.map((u) => ({
    name: u.name,
    value: u.value,
    color: i(u.name)
  }));
  return /* @__PURE__ */ Y("div", { className: "chart-grid", children: [
    /* @__PURE__ */ Y("div", { className: "chart-panel", children: [
      /* @__PURE__ */ $("h3", { children: "Conditions" }),
      /* @__PURE__ */ $(Eu, { width: "100%", height: 320, children: /* @__PURE__ */ Y(es, { children: [
        /* @__PURE__ */ $(
          bi,
          {
            data: o,
            dataKey: "value",
            nameKey: "name",
            cx: "50%",
            cy: "50%",
            outerRadius: 70,
            innerRadius: 35,
            style: { cursor: "pointer" },
            onClick: (u, s) => r("conditionCategories", o[s].name),
            children: o.map((u) => /* @__PURE__ */ $(
              Gr,
              {
                stroke: xa,
                fill: u.color,
                opacity: t.conditionCategories.length > 0 && !t.conditionCategories.includes(u.name) ? 0.25 : 1
              },
              u.name
            ))
          }
        ),
        /* @__PURE__ */ $(
          bi,
          {
            data: a,
            dataKey: "value",
            nameKey: "name",
            cx: "50%",
            cy: "50%",
            innerRadius: 80,
            outerRadius: 120,
            style: { cursor: "pointer" },
            onClick: (u, s) => r("conditions", a[s].name),
            children: a.map((u) => /* @__PURE__ */ $(
              Gr,
              {
                stroke: xa,
                fill: u.color,
                opacity: t.conditions.length > 0 && !t.conditions.includes(u.name) ? 0.15 : IB
              },
              `${u.category}-${u.name}`
            ))
          }
        ),
        /* @__PURE__ */ $(
          Ku,
          {
            formatter: (u) => typeof u == "number" ? u.toLocaleString() : u
          }
        ),
        /* @__PURE__ */ $(Pu, {})
      ] }) })
    ] }),
    /* @__PURE__ */ Y("div", { className: "chart-panel", children: [
      /* @__PURE__ */ $("h3", { children: "Procedures" }),
      /* @__PURE__ */ $(Eu, { width: "100%", height: 320, children: /* @__PURE__ */ Y(es, { children: [
        /* @__PURE__ */ $(
          bi,
          {
            data: e.procedures,
            dataKey: "value",
            nameKey: "name",
            cx: "50%",
            cy: "50%",
            innerRadius: 40,
            outerRadius: 120,
            label: ({ name: u }) => u,
            style: { cursor: "pointer" },
            onClick: (u, s) => r("procedures", e.procedures[s].name),
            children: e.procedures.map((u, s) => /* @__PURE__ */ $(
              Gr,
              {
                stroke: xa,
                fill: n.sequence[s % n.sequence.length],
                opacity: t.procedures.length > 0 && !t.procedures.includes(u.name) ? 0.25 : 1
              },
              u.name
            ))
          }
        ),
        /* @__PURE__ */ $(
          Ku,
          {
            formatter: (u) => typeof u == "number" ? u.toLocaleString() : u
          }
        )
      ] }) })
    ] })
  ] });
}
var Vc, u_;
function bT() {
  if (u_) return Vc;
  u_ = 1;
  var e = typeof To == "object" && To && To.Object === Object && To;
  return Vc = e, Vc;
}
var Hc, s_;
function vr() {
  if (s_) return Hc;
  s_ = 1;
  var e = bT(), t = typeof self == "object" && self && self.Object === Object && self, r = e || t || Function("return this")();
  return Hc = r, Hc;
}
var Kc, l_;
function Hi() {
  if (l_) return Kc;
  l_ = 1;
  var e = vr(), t = e.Symbol;
  return Kc = t, Kc;
}
var Gc, c_;
function NB() {
  if (c_) return Gc;
  c_ = 1;
  var e = Hi(), t = Object.prototype, r = t.hasOwnProperty, n = t.toString, i = e ? e.toStringTag : void 0;
  function a(o) {
    var u = r.call(o, i), s = o[i];
    try {
      o[i] = void 0;
      var l = !0;
    } catch {
    }
    var c = n.call(o);
    return l && (u ? o[i] = s : delete o[i]), c;
  }
  return Gc = a, Gc;
}
var Yc, f_;
function RB() {
  if (f_) return Yc;
  f_ = 1;
  var e = Object.prototype, t = e.toString;
  function r(n) {
    return t.call(n);
  }
  return Yc = r, Yc;
}
var Xc, d_;
function Qn() {
  if (d_) return Xc;
  d_ = 1;
  var e = Hi(), t = NB(), r = RB(), n = "[object Null]", i = "[object Undefined]", a = e ? e.toStringTag : void 0;
  function o(u) {
    return u == null ? u === void 0 ? i : n : a && a in Object(u) ? t(u) : r(u);
  }
  return Xc = o, Xc;
}
var Zc, h_;
function $r() {
  if (h_) return Zc;
  h_ = 1;
  function e(t) {
    var r = typeof t;
    return t != null && (r == "object" || r == "function");
  }
  return Zc = e, Zc;
}
var Qc, v_;
function il() {
  if (v_) return Qc;
  v_ = 1;
  var e = Qn(), t = $r(), r = "[object AsyncFunction]", n = "[object Function]", i = "[object GeneratorFunction]", a = "[object Proxy]";
  function o(u) {
    if (!t(u))
      return !1;
    var s = e(u);
    return s == n || s == i || s == r || s == a;
  }
  return Qc = o, Qc;
}
var Jc, p_;
function $B() {
  if (p_) return Jc;
  p_ = 1;
  var e = vr(), t = e["__core-js_shared__"];
  return Jc = t, Jc;
}
var ef, m_;
function DB() {
  if (m_) return ef;
  m_ = 1;
  var e = $B(), t = (function() {
    var n = /[^.]+$/.exec(e && e.keys && e.keys.IE_PROTO || "");
    return n ? "Symbol(src)_1." + n : "";
  })();
  function r(n) {
    return !!t && t in n;
  }
  return ef = r, ef;
}
var tf, y_;
function _T() {
  if (y_) return tf;
  y_ = 1;
  var e = Function.prototype, t = e.toString;
  function r(n) {
    if (n != null) {
      try {
        return t.call(n);
      } catch {
      }
      try {
        return n + "";
      } catch {
      }
    }
    return "";
  }
  return tf = r, tf;
}
var rf, g_;
function jB() {
  if (g_) return rf;
  g_ = 1;
  var e = il(), t = DB(), r = $r(), n = _T(), i = /[\\^$.*+?()[\]{}|]/g, a = /^\[object .+?Constructor\]$/, o = Function.prototype, u = Object.prototype, s = o.toString, l = u.hasOwnProperty, c = RegExp(
    "^" + s.call(l).replace(i, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function f(d) {
    if (!r(d) || t(d))
      return !1;
    var h = e(d) ? c : a;
    return h.test(n(d));
  }
  return rf = f, rf;
}
var nf, b_;
function LB() {
  if (b_) return nf;
  b_ = 1;
  function e(t, r) {
    return t == null ? void 0 : t[r];
  }
  return nf = e, nf;
}
var af, __;
function Jn() {
  if (__) return af;
  __ = 1;
  var e = jB(), t = LB();
  function r(n, i) {
    var a = t(n, i);
    return e(a) ? a : void 0;
  }
  return af = r, af;
}
var of, w_;
function al() {
  if (w_) return of;
  w_ = 1;
  var e = Jn(), t = e(Object, "create");
  return of = t, of;
}
var uf, x_;
function qB() {
  if (x_) return uf;
  x_ = 1;
  var e = al();
  function t() {
    this.__data__ = e ? e(null) : {}, this.size = 0;
  }
  return uf = t, uf;
}
var sf, A_;
function zB() {
  if (A_) return sf;
  A_ = 1;
  function e(t) {
    var r = this.has(t) && delete this.__data__[t];
    return this.size -= r ? 1 : 0, r;
  }
  return sf = e, sf;
}
var lf, O_;
function FB() {
  if (O_) return lf;
  O_ = 1;
  var e = al(), t = "__lodash_hash_undefined__", r = Object.prototype, n = r.hasOwnProperty;
  function i(a) {
    var o = this.__data__;
    if (e) {
      var u = o[a];
      return u === t ? void 0 : u;
    }
    return n.call(o, a) ? o[a] : void 0;
  }
  return lf = i, lf;
}
var cf, S_;
function BB() {
  if (S_) return cf;
  S_ = 1;
  var e = al(), t = Object.prototype, r = t.hasOwnProperty;
  function n(i) {
    var a = this.__data__;
    return e ? a[i] !== void 0 : r.call(a, i);
  }
  return cf = n, cf;
}
var ff, E_;
function WB() {
  if (E_) return ff;
  E_ = 1;
  var e = al(), t = "__lodash_hash_undefined__";
  function r(n, i) {
    var a = this.__data__;
    return this.size += this.has(n) ? 0 : 1, a[n] = e && i === void 0 ? t : i, this;
  }
  return ff = r, ff;
}
var df, P_;
function UB() {
  if (P_) return df;
  P_ = 1;
  var e = qB(), t = zB(), r = FB(), n = BB(), i = WB();
  function a(o) {
    var u = -1, s = o == null ? 0 : o.length;
    for (this.clear(); ++u < s; ) {
      var l = o[u];
      this.set(l[0], l[1]);
    }
  }
  return a.prototype.clear = e, a.prototype.delete = t, a.prototype.get = r, a.prototype.has = n, a.prototype.set = i, df = a, df;
}
var hf, T_;
function VB() {
  if (T_) return hf;
  T_ = 1;
  function e() {
    this.__data__ = [], this.size = 0;
  }
  return hf = e, hf;
}
var vf, C_;
function po() {
  if (C_) return vf;
  C_ = 1;
  function e(t, r) {
    return t === r || t !== t && r !== r;
  }
  return vf = e, vf;
}
var pf, I_;
function ol() {
  if (I_) return pf;
  I_ = 1;
  var e = po();
  function t(r, n) {
    for (var i = r.length; i--; )
      if (e(r[i][0], n))
        return i;
    return -1;
  }
  return pf = t, pf;
}
var mf, k_;
function HB() {
  if (k_) return mf;
  k_ = 1;
  var e = ol(), t = Array.prototype, r = t.splice;
  function n(i) {
    var a = this.__data__, o = e(a, i);
    if (o < 0)
      return !1;
    var u = a.length - 1;
    return o == u ? a.pop() : r.call(a, o, 1), --this.size, !0;
  }
  return mf = n, mf;
}
var yf, M_;
function KB() {
  if (M_) return yf;
  M_ = 1;
  var e = ol();
  function t(r) {
    var n = this.__data__, i = e(n, r);
    return i < 0 ? void 0 : n[i][1];
  }
  return yf = t, yf;
}
var gf, N_;
function GB() {
  if (N_) return gf;
  N_ = 1;
  var e = ol();
  function t(r) {
    return e(this.__data__, r) > -1;
  }
  return gf = t, gf;
}
var bf, R_;
function YB() {
  if (R_) return bf;
  R_ = 1;
  var e = ol();
  function t(r, n) {
    var i = this.__data__, a = e(i, r);
    return a < 0 ? (++this.size, i.push([r, n])) : i[a][1] = n, this;
  }
  return bf = t, bf;
}
var _f, $_;
function ul() {
  if ($_) return _f;
  $_ = 1;
  var e = VB(), t = HB(), r = KB(), n = GB(), i = YB();
  function a(o) {
    var u = -1, s = o == null ? 0 : o.length;
    for (this.clear(); ++u < s; ) {
      var l = o[u];
      this.set(l[0], l[1]);
    }
  }
  return a.prototype.clear = e, a.prototype.delete = t, a.prototype.get = r, a.prototype.has = n, a.prototype.set = i, _f = a, _f;
}
var wf, D_;
function Ay() {
  if (D_) return wf;
  D_ = 1;
  var e = Jn(), t = vr(), r = e(t, "Map");
  return wf = r, wf;
}
var xf, j_;
function XB() {
  if (j_) return xf;
  j_ = 1;
  var e = UB(), t = ul(), r = Ay();
  function n() {
    this.size = 0, this.__data__ = {
      hash: new e(),
      map: new (r || t)(),
      string: new e()
    };
  }
  return xf = n, xf;
}
var Af, L_;
function ZB() {
  if (L_) return Af;
  L_ = 1;
  function e(t) {
    var r = typeof t;
    return r == "string" || r == "number" || r == "symbol" || r == "boolean" ? t !== "__proto__" : t === null;
  }
  return Af = e, Af;
}
var Of, q_;
function sl() {
  if (q_) return Of;
  q_ = 1;
  var e = ZB();
  function t(r, n) {
    var i = r.__data__;
    return e(n) ? i[typeof n == "string" ? "string" : "hash"] : i.map;
  }
  return Of = t, Of;
}
var Sf, z_;
function QB() {
  if (z_) return Sf;
  z_ = 1;
  var e = sl();
  function t(r) {
    var n = e(this, r).delete(r);
    return this.size -= n ? 1 : 0, n;
  }
  return Sf = t, Sf;
}
var Ef, F_;
function JB() {
  if (F_) return Ef;
  F_ = 1;
  var e = sl();
  function t(r) {
    return e(this, r).get(r);
  }
  return Ef = t, Ef;
}
var Pf, B_;
function eW() {
  if (B_) return Pf;
  B_ = 1;
  var e = sl();
  function t(r) {
    return e(this, r).has(r);
  }
  return Pf = t, Pf;
}
var Tf, W_;
function tW() {
  if (W_) return Tf;
  W_ = 1;
  var e = sl();
  function t(r, n) {
    var i = e(this, r), a = i.size;
    return i.set(r, n), this.size += i.size == a ? 0 : 1, this;
  }
  return Tf = t, Tf;
}
var Cf, U_;
function Oy() {
  if (U_) return Cf;
  U_ = 1;
  var e = XB(), t = QB(), r = JB(), n = eW(), i = tW();
  function a(o) {
    var u = -1, s = o == null ? 0 : o.length;
    for (this.clear(); ++u < s; ) {
      var l = o[u];
      this.set(l[0], l[1]);
    }
  }
  return a.prototype.clear = e, a.prototype.delete = t, a.prototype.get = r, a.prototype.has = n, a.prototype.set = i, Cf = a, Cf;
}
var If, V_;
function rW() {
  if (V_) return If;
  V_ = 1;
  var e = "__lodash_hash_undefined__";
  function t(r) {
    return this.__data__.set(r, e), this;
  }
  return If = t, If;
}
var kf, H_;
function nW() {
  if (H_) return kf;
  H_ = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return kf = e, kf;
}
var Mf, K_;
function Sy() {
  if (K_) return Mf;
  K_ = 1;
  var e = Oy(), t = rW(), r = nW();
  function n(i) {
    var a = -1, o = i == null ? 0 : i.length;
    for (this.__data__ = new e(); ++a < o; )
      this.add(i[a]);
  }
  return n.prototype.add = n.prototype.push = t, n.prototype.has = r, Mf = n, Mf;
}
var Nf, G_;
function iW() {
  if (G_) return Nf;
  G_ = 1;
  function e(t, r, n, i) {
    for (var a = t.length, o = n + (i ? 1 : -1); i ? o-- : ++o < a; )
      if (r(t[o], o, t))
        return o;
    return -1;
  }
  return Nf = e, Nf;
}
var Rf, Y_;
function aW() {
  if (Y_) return Rf;
  Y_ = 1;
  function e(t) {
    return t !== t;
  }
  return Rf = e, Rf;
}
var $f, X_;
function oW() {
  if (X_) return $f;
  X_ = 1;
  function e(t, r, n) {
    for (var i = n - 1, a = t.length; ++i < a; )
      if (t[i] === r)
        return i;
    return -1;
  }
  return $f = e, $f;
}
var Df, Z_;
function uW() {
  if (Z_) return Df;
  Z_ = 1;
  var e = iW(), t = aW(), r = oW();
  function n(i, a, o) {
    return a === a ? r(i, a, o) : e(i, t, o);
  }
  return Df = n, Df;
}
var jf, Q_;
function wT() {
  if (Q_) return jf;
  Q_ = 1;
  var e = uW();
  function t(r, n) {
    var i = r == null ? 0 : r.length;
    return !!i && e(r, n, 0) > -1;
  }
  return jf = t, jf;
}
var Lf, J_;
function xT() {
  if (J_) return Lf;
  J_ = 1;
  function e(t, r, n) {
    for (var i = -1, a = t == null ? 0 : t.length; ++i < a; )
      if (n(r, t[i]))
        return !0;
    return !1;
  }
  return Lf = e, Lf;
}
var qf, ew;
function Ey() {
  if (ew) return qf;
  ew = 1;
  function e(t, r) {
    return t.has(r);
  }
  return qf = e, qf;
}
var zf, tw;
function AT() {
  if (tw) return zf;
  tw = 1;
  var e = Jn(), t = vr(), r = e(t, "Set");
  return zf = r, zf;
}
var Ff, rw;
function sW() {
  if (rw) return Ff;
  rw = 1;
  function e() {
  }
  return Ff = e, Ff;
}
var Bf, nw;
function Py() {
  if (nw) return Bf;
  nw = 1;
  function e(t) {
    var r = -1, n = Array(t.size);
    return t.forEach(function(i) {
      n[++r] = i;
    }), n;
  }
  return Bf = e, Bf;
}
var Wf, iw;
function lW() {
  if (iw) return Wf;
  iw = 1;
  var e = AT(), t = sW(), r = Py(), n = 1 / 0, i = e && 1 / r(new e([, -0]))[1] == n ? function(a) {
    return new e(a);
  } : t;
  return Wf = i, Wf;
}
var Uf, aw;
function cW() {
  if (aw) return Uf;
  aw = 1;
  var e = Sy(), t = wT(), r = xT(), n = Ey(), i = lW(), a = Py(), o = 200;
  function u(s, l, c) {
    var f = -1, d = t, h = s.length, p = !0, v = [], m = v;
    if (c)
      p = !1, d = r;
    else if (h >= o) {
      var y = l ? null : i(s);
      if (y)
        return a(y);
      p = !1, d = n, m = new e();
    } else
      m = l ? [] : v;
    e:
      for (; ++f < h; ) {
        var b = s[f], g = l ? l(b) : b;
        if (b = c || b !== 0 ? b : 0, p && g === g) {
          for (var _ = m.length; _--; )
            if (m[_] === g)
              continue e;
          l && m.push(g), v.push(b);
        } else d(m, g, c) || (m !== v && m.push(g), v.push(b));
      }
    return v;
  }
  return Uf = u, Uf;
}
var Vf, ow;
function fW() {
  if (ow) return Vf;
  ow = 1;
  var e = cW();
  function t(r) {
    return r && r.length ? e(r) : [];
  }
  return Vf = t, Vf;
}
var dW = fW();
const hW = /* @__PURE__ */ Ht(dW);
var uw = Object.defineProperty, vW = (e, t) => {
  let r = {};
  for (var n in e)
    uw(r, n, {
      get: e[n],
      enumerable: !0
    });
  return uw(r, Symbol.toStringTag, { value: "Module" }), r;
};
let Ty = yo();
const ee = (e) => mo(e, Ty);
let Cy = yo();
ee.write = (e) => mo(e, Cy);
let ll = yo();
ee.onStart = (e) => mo(e, ll);
let Iy = yo();
ee.onFrame = (e) => mo(e, Iy);
let ky = yo();
ee.onFinish = (e) => mo(e, ky);
let _i = [];
ee.setTimeout = (e, t) => {
  const r = ee.now() + t, n = () => {
    const a = _i.findIndex((o) => o.cancel == n);
    ~a && _i.splice(a, 1), Sr -= ~a ? 1 : 0;
  }, i = {
    time: r,
    handler: e,
    cancel: n
  };
  return _i.splice(OT(r), 0, i), Sr += 1, ST(), i;
};
const OT = (e) => ~(~_i.findIndex((t) => t.time > e) || ~_i.length);
ee.cancel = (e) => {
  ll.delete(e), Iy.delete(e), ky.delete(e), Ty.delete(e), Cy.delete(e);
};
ee.sync = (e) => {
  up = !0, ee.batchedUpdates(e), up = !1;
};
ee.throttle = (e) => {
  let t;
  function r() {
    try {
      e(...t);
    } finally {
      t = null;
    }
  }
  function n(...i) {
    t = i, ee.onStart(r);
  }
  return n.handler = e, n.cancel = () => {
    ll.delete(r), t = null;
  }, n;
};
let My = typeof window < "u" ? window.requestAnimationFrame : () => {
};
ee.use = (e) => My = e;
ee.now = typeof performance < "u" ? () => performance.now() : Date.now;
ee.batchedUpdates = (e) => e();
ee.catch = console.error;
ee.frameLoop = "always";
ee.onDemand = () => {
};
ee.advance = () => {
  ee.frameLoop !== "demand" ? console.warn("Cannot call the manual advancement of rafz whilst frameLoop is not set as demand") : PT();
};
let Hr = -1, Sr = 0, up = !1;
function mo(e, t) {
  up ? (t.delete(e), e(0)) : (t.add(e), ST(), ee.frameLoop === "demand" && ee.onDemand());
}
function ST() {
  Hr < 0 && (Hr = 0, ee.frameLoop !== "demand" && My(ET));
}
function pW() {
  Hr = -1;
}
function ET() {
  ~Hr && (My(ET), ee.batchedUpdates(PT));
}
function PT() {
  const e = Hr;
  Hr = ee.now();
  const t = OT(Hr);
  if (t && (TT(_i.splice(0, t), (r) => r.handler()), Sr -= t), !Sr) {
    pW();
    return;
  }
  ll.flush(), Ty.flush(e ? Math.min(64, Hr - e) : 16.667), Iy.flush(), Cy.flush(), ky.flush(), ee.frameLoop === "demand" && Sr > 0 && ee.onDemand();
}
function yo() {
  let e = /* @__PURE__ */ new Set(), t = e;
  return {
    add(r) {
      Sr += t == e && !e.has(r) ? 1 : 0, e.add(r);
    },
    delete(r) {
      return Sr -= t == e && e.has(r) ? 1 : 0, e.delete(r);
    },
    flush(r) {
      t.size && (e = /* @__PURE__ */ new Set(), Sr -= t.size, TT(t, (n) => n(r) && e.add(n)), Sr += e.size, t = e);
    }
  };
}
function TT(e, t) {
  e.forEach((r) => {
    try {
      t(r);
    } catch (n) {
      ee.catch(n);
    }
  });
}
function sp() {
}
const mW = (e, t, r) => Object.defineProperty(e, t, {
  value: r,
  writable: !0,
  configurable: !0
}), L = {
  arr: Array.isArray,
  obj: (e) => !!e && e.constructor.name === "Object",
  fun: ((e) => typeof e == "function"),
  str: (e) => typeof e == "string",
  num: (e) => typeof e == "number",
  und: (e) => e === void 0
};
function wr(e, t) {
  if (L.arr(e)) {
    if (!L.arr(t) || e.length !== t.length) return !1;
    for (let r = 0; r < e.length; r++) if (e[r] !== t[r]) return !1;
    return !0;
  }
  return e === t;
}
const X = (e, t) => e.forEach(t);
function bt(e, t, r) {
  if (L.arr(e)) {
    for (let n = 0; n < e.length; n++) t.call(r, e[n], `${n}`);
    return;
  }
  for (const n in e) e.hasOwnProperty(n) && t.call(r, e[n], n);
}
const nt = (e) => L.und(e) ? [] : L.arr(e) ? e : [e];
function Aa(e, t) {
  if (e.size) {
    const r = Array.from(e);
    e.clear(), X(r, t);
  }
}
const ma = (e, ...t) => Aa(e, (r) => r(...t)), Ny = () => typeof window > "u" || !window.navigator || /ServerSideRendering|^Deno\//.test(window.navigator.userAgent);
var Nt = /* @__PURE__ */ vW({
  assign: () => yW,
  colors: () => Xr,
  createStringInterpolator: () => Ry,
  skipAnimation: () => IT,
  to: () => CT,
  willAdvance: () => $y
});
let Ry, CT, Xr = null, IT = !1, $y = sp;
const yW = (e) => {
  e.to && (CT = e.to), e.now && (ee.now = e.now), e.colors !== void 0 && (Xr = e.colors), e.skipAnimation != null && (IT = e.skipAnimation), e.createStringInterpolator && (Ry = e.createStringInterpolator), e.requestAnimationFrame && ee.use(e.requestAnimationFrame), e.batchedUpdates && (ee.batchedUpdates = e.batchedUpdates), e.willAdvance && ($y = e.willAdvance), e.frameLoop && (ee.frameLoop = e.frameLoop), e.onDemand && (ee.onDemand = e.onDemand);
}, Oa = /* @__PURE__ */ new Set();
let Et = [], Hf = [], ts = 0;
const cl = {
  get idle() {
    return !Oa.size && !Et.length;
  },
  /** Advance the given animation on every frame until idle. */
  start(e) {
    ts > e.priority ? (Oa.add(e), ee.onStart(gW)) : (kT(e), ee(lp));
  },
  /** Advance all animations by the given time. */
  advance: lp,
  /** Call this when an animation's priority changes. */
  sort(e) {
    if (ts) ee.onFrame(() => cl.sort(e));
    else {
      const t = Et.indexOf(e);
      ~t && (Et.splice(t, 1), MT(e));
    }
  },
  /**
  * Clear all animations. For testing purposes.
  *
  * ☠️ Never call this from within the frameloop.
  */
  clear() {
    Et = [], Oa.clear();
  }
};
function gW() {
  Oa.forEach(kT), Oa.clear(), ee(lp);
}
function kT(e) {
  Et.includes(e) || MT(e);
}
function MT(e) {
  Et.splice(bW(Et, (t) => t.priority > e.priority), 0, e);
}
function lp(e) {
  const t = Hf;
  for (let r = 0; r < Et.length; r++) {
    const n = Et[r];
    ts = n.priority, n.idle || ($y(n), n.advance(e), n.idle || t.push(n));
  }
  return ts = 0, Hf = Et, Hf.length = 0, Et = t, Et.length > 0;
}
function bW(e, t) {
  const r = e.findIndex(t);
  return r < 0 ? e.length : r;
}
const fl = {
  transparent: 0,
  aliceblue: 4042850303,
  antiquewhite: 4209760255,
  aqua: 16777215,
  aquamarine: 2147472639,
  azure: 4043309055,
  beige: 4126530815,
  bisque: 4293182719,
  black: 255,
  blanchedalmond: 4293643775,
  blue: 65535,
  blueviolet: 2318131967,
  brown: 2771004159,
  burlywood: 3736635391,
  burntsienna: 3934150143,
  cadetblue: 1604231423,
  chartreuse: 2147418367,
  chocolate: 3530104575,
  coral: 4286533887,
  cornflowerblue: 1687547391,
  cornsilk: 4294499583,
  crimson: 3692313855,
  cyan: 16777215,
  darkblue: 35839,
  darkcyan: 9145343,
  darkgoldenrod: 3095792639,
  darkgray: 2846468607,
  darkgreen: 6553855,
  darkgrey: 2846468607,
  darkkhaki: 3182914559,
  darkmagenta: 2332068863,
  darkolivegreen: 1433087999,
  darkorange: 4287365375,
  darkorchid: 2570243327,
  darkred: 2332033279,
  darksalmon: 3918953215,
  darkseagreen: 2411499519,
  darkslateblue: 1211993087,
  darkslategray: 793726975,
  darkslategrey: 793726975,
  darkturquoise: 13554175,
  darkviolet: 2483082239,
  deeppink: 4279538687,
  deepskyblue: 12582911,
  dimgray: 1768516095,
  dimgrey: 1768516095,
  dodgerblue: 512819199,
  firebrick: 2988581631,
  floralwhite: 4294635775,
  forestgreen: 579543807,
  fuchsia: 4278255615,
  gainsboro: 3705462015,
  ghostwhite: 4177068031,
  gold: 4292280575,
  goldenrod: 3668254975,
  gray: 2155905279,
  green: 8388863,
  greenyellow: 2919182335,
  grey: 2155905279,
  honeydew: 4043305215,
  hotpink: 4285117695,
  indianred: 3445382399,
  indigo: 1258324735,
  ivory: 4294963455,
  khaki: 4041641215,
  lavender: 3873897215,
  lavenderblush: 4293981695,
  lawngreen: 2096890111,
  lemonchiffon: 4294626815,
  lightblue: 2916673279,
  lightcoral: 4034953471,
  lightcyan: 3774873599,
  lightgoldenrodyellow: 4210742015,
  lightgray: 3553874943,
  lightgreen: 2431553791,
  lightgrey: 3553874943,
  lightpink: 4290167295,
  lightsalmon: 4288707327,
  lightseagreen: 548580095,
  lightskyblue: 2278488831,
  lightslategray: 2005441023,
  lightslategrey: 2005441023,
  lightsteelblue: 2965692159,
  lightyellow: 4294959359,
  lime: 16711935,
  limegreen: 852308735,
  linen: 4210091775,
  magenta: 4278255615,
  maroon: 2147483903,
  mediumaquamarine: 1724754687,
  mediumblue: 52735,
  mediumorchid: 3126187007,
  mediumpurple: 2473647103,
  mediumseagreen: 1018393087,
  mediumslateblue: 2070474495,
  mediumspringgreen: 16423679,
  mediumturquoise: 1221709055,
  mediumvioletred: 3340076543,
  midnightblue: 421097727,
  mintcream: 4127193855,
  mistyrose: 4293190143,
  moccasin: 4293178879,
  navajowhite: 4292783615,
  navy: 33023,
  oldlace: 4260751103,
  olive: 2155872511,
  olivedrab: 1804477439,
  orange: 4289003775,
  orangered: 4282712319,
  orchid: 3664828159,
  palegoldenrod: 4008225535,
  palegreen: 2566625535,
  paleturquoise: 2951671551,
  palevioletred: 3681588223,
  papayawhip: 4293907967,
  peachpuff: 4292524543,
  peru: 3448061951,
  pink: 4290825215,
  plum: 3718307327,
  powderblue: 2967529215,
  purple: 2147516671,
  rebeccapurple: 1714657791,
  red: 4278190335,
  rosybrown: 3163525119,
  royalblue: 1097458175,
  saddlebrown: 2336560127,
  salmon: 4202722047,
  sandybrown: 4104413439,
  seagreen: 780883967,
  seashell: 4294307583,
  sienna: 2689740287,
  silver: 3233857791,
  skyblue: 2278484991,
  slateblue: 1784335871,
  slategray: 1887473919,
  slategrey: 1887473919,
  snow: 4294638335,
  springgreen: 16744447,
  steelblue: 1182971135,
  tan: 3535047935,
  teal: 8421631,
  thistle: 3636451583,
  tomato: 4284696575,
  turquoise: 1088475391,
  violet: 4001558271,
  wheat: 4125012991,
  white: 4294967295,
  whitesmoke: 4126537215,
  yellow: 4294902015,
  yellowgreen: 2597139199
}, ir = "[-+]?\\d*\\.?\\d+", rs = "[-+]?\\d*\\.?\\d+%";
function dl(...e) {
  return "\\(\\s*(" + e.join(")\\s*,\\s*(") + ")\\s*\\)";
}
const _W = new RegExp("rgb" + dl(ir, ir, ir)), wW = new RegExp("rgba" + dl(ir, ir, ir, ir)), xW = new RegExp("hsl" + dl(ir, rs, rs)), AW = new RegExp("hsla" + dl(ir, rs, rs, ir)), OW = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, SW = /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/, EW = /^#([0-9a-fA-F]{6})$/, PW = /^#([0-9a-fA-F]{8})$/;
function TW(e) {
  let t;
  return typeof e == "number" ? e >>> 0 === e && e >= 0 && e <= 4294967295 ? e : null : (t = EW.exec(e)) ? parseInt(t[1] + "ff", 16) >>> 0 : Xr && Xr[e] !== void 0 ? Xr[e] : (t = _W.exec(e)) ? (di(t[1]) << 24 | di(t[2]) << 16 | di(t[3]) << 8 | 255) >>> 0 : (t = wW.exec(e)) ? (di(t[1]) << 24 | di(t[2]) << 16 | di(t[3]) << 8 | cw(t[4])) >>> 0 : (t = OW.exec(e)) ? parseInt(t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + "ff", 16) >>> 0 : (t = PW.exec(e)) ? parseInt(t[1], 16) >>> 0 : (t = SW.exec(e)) ? parseInt(t[1] + t[1] + t[2] + t[2] + t[3] + t[3] + t[4] + t[4], 16) >>> 0 : (t = xW.exec(e)) ? (sw(lw(t[1]), Yo(t[2]), Yo(t[3])) | 255) >>> 0 : (t = AW.exec(e)) ? (sw(lw(t[1]), Yo(t[2]), Yo(t[3])) | cw(t[4])) >>> 0 : null;
}
function Kf(e, t, r) {
  return r < 0 && (r += 1), r > 1 && (r -= 1), r < 1 / 6 ? e + (t - e) * 6 * r : r < 1 / 2 ? t : r < 2 / 3 ? e + (t - e) * (2 / 3 - r) * 6 : e;
}
function sw(e, t, r) {
  const n = r < 0.5 ? r * (1 + t) : r + t - r * t, i = 2 * r - n, a = Kf(i, n, e + 1 / 3), o = Kf(i, n, e), u = Kf(i, n, e - 1 / 3);
  return Math.round(a * 255) << 24 | Math.round(o * 255) << 16 | Math.round(u * 255) << 8;
}
function di(e) {
  const t = parseInt(e, 10);
  return t < 0 ? 0 : t > 255 ? 255 : t;
}
function lw(e) {
  return (parseFloat(e) % 360 + 360) % 360 / 360;
}
function cw(e) {
  const t = parseFloat(e);
  return t < 0 ? 0 : t > 1 ? 255 : Math.round(t * 255);
}
function Yo(e) {
  const t = parseFloat(e);
  return t < 0 ? 0 : t > 100 ? 1 : t / 100;
}
function fw(e) {
  let t = TW(e);
  return t === null ? e : (t = t || 0, `rgba(${(t & 4278190080) >>> 24}, ${(t & 16711680) >>> 16}, ${(t & 65280) >>> 8}, ${(t & 255) / 255})`);
}
const Wa = (e, t, r) => {
  if (L.fun(e)) return e;
  if (L.arr(e)) return Wa({
    range: e,
    output: t,
    extrapolate: r
  });
  if (L.str(e.output[0])) return Ry(e);
  const n = e, i = n.output, a = n.range || [0, 1], o = n.extrapolateLeft || n.extrapolate || "extend", u = n.extrapolateRight || n.extrapolate || "extend", s = n.easing || ((l) => l);
  return (l) => {
    const c = IW(l, a);
    return CW(l, a[c], a[c + 1], i[c], i[c + 1], s, o, u, n.map);
  };
};
function CW(e, t, r, n, i, a, o, u, s) {
  let l = s ? s(e) : e;
  if (l < t) {
    if (o === "identity") return l;
    o === "clamp" && (l = t);
  }
  if (l > r) {
    if (u === "identity") return l;
    u === "clamp" && (l = r);
  }
  return n === i ? n : t === r ? e <= t ? n : i : (t === -1 / 0 ? l = -l : r === 1 / 0 ? l = l - t : l = (l - t) / (r - t), l = a(l), n === -1 / 0 ? l = -l : i === 1 / 0 ? l = l + n : l = l * (i - n) + n, l);
}
function IW(e, t) {
  for (var r = 1; r < t.length - 1 && !(t[r] >= e); ++r) ;
  return r - 1;
}
const kW = {
  linear: (e) => e
}, Ua = Symbol.for("FluidValue.get"), Mi = Symbol.for("FluidValue.observers"), He = (e) => !!(e && e[Ua]), je = (e) => e && e[Ua] ? e[Ua]() : e, dw = (e) => e[Mi] || null;
function MW(e, t) {
  e.eventObserved ? e.eventObserved(t) : e(t);
}
function en(e, t) {
  const r = e[Mi];
  r && r.forEach((n) => {
    MW(n, t);
  });
}
var go = class {
  constructor(e) {
    if (!e && !(e = this.get)) throw Error("Unknown getter");
    NW(this, e);
  }
};
const NW = (e, t) => NT(e, Ua, t);
function Dr(e, t) {
  if (e[Ua]) {
    let r = e[Mi];
    r || NT(e, Mi, r = /* @__PURE__ */ new Set()), r.has(t) || (r.add(t), e.observerAdded && e.observerAdded(r.size, t));
  }
  return t;
}
function tn(e, t) {
  const r = e[Mi];
  if (r && r.has(t)) {
    const n = r.size - 1;
    n ? r.delete(t) : e[Mi] = null, e.observerRemoved && e.observerRemoved(n, t);
  }
}
const NT = (e, t, r) => Object.defineProperty(e, t, {
  value: r,
  writable: !0,
  configurable: !0
}), ns = /[+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, RW = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi, hw = new RegExp(`(${ns.source})(%|[a-z]+)`, "i"), $W = /rgba\(([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+), ([0-9\.-]+)\)/gi, hl = /var\((--[a-zA-Z0-9-_]+),? ?([a-zA-Z0-9 ()%#.,-]+)?\)/, RT = (e) => {
  const [t, r] = DW(e);
  if (!t || Ny()) return e;
  const n = window.getComputedStyle(document.documentElement).getPropertyValue(t);
  if (n)
    return n.trim();
  if (r && r.startsWith("--")) {
    const i = window.getComputedStyle(document.documentElement).getPropertyValue(r);
    return i || e;
  } else {
    if (r && hl.test(r))
      return RT(r);
    if (r)
      return r;
  }
  return e;
}, DW = (e) => {
  const t = hl.exec(e);
  if (!t) return [,];
  const [, r, n] = t;
  return [r, n];
};
let Gf;
const jW = (e, t, r, n, i) => `rgba(${Math.round(t)}, ${Math.round(r)}, ${Math.round(n)}, ${i})`, vw = (e) => e.match(ns) ?? [], bo = (e) => {
  Gf || (Gf = Xr ? new RegExp(`(${Object.keys(Xr).join("|")})(?!\\w)`, "g") : /^\b$/);
  const t = e.output.map((u) => je(u).replace(hl, RT).replace(RW, fw).replace(Gf, fw)), r = t.map((u) => vw(u).map(Number)), n = r[0].map((u, s) => r.map((l) => {
    if (!(s in l)) throw Error('The arity of each "output" value must be equal');
    return l[s];
  })).map((u) => Wa({
    ...e,
    output: u
  })), i = e.range || [0, 1], a = t.map((u) => vw(u)), o = a[0].map((u, s) => {
    const l = a.map((c) => {
      const f = c[s], d = f.indexOf(".");
      return d === -1 ? 0 : f.length - d - 1;
    });
    return l.every((c) => c === l[0]) && l[0] > 0 ? l[0] : null;
  });
  return (u) => {
    var f;
    const s = i.indexOf(u);
    if (s !== -1) return t[s];
    const l = !hw.test(t[0]) && ((f = t.find((d) => hw.test(d))) == null ? void 0 : f.replace(ns, ""));
    let c = 0;
    return t[0].replace(ns, () => {
      const d = c++, h = n[d](u), p = o[d];
      return `${p != null ? h.toFixed(p) : h}${l || ""}`;
    }).replace($W, jW);
  };
}, Dy = "react-spring: ", $T = (e) => {
  const t = e;
  let r = !1;
  if (typeof t != "function") throw new TypeError(`${Dy}once requires a function parameter`);
  return (...n) => {
    r || (t(...n), r = !0);
  };
}, LW = $T(console.warn);
function qW() {
  LW(`${Dy}The "interpolate" function is deprecated in v9 (use "to" instead)`);
}
const zW = $T(console.warn);
function FW() {
  zW(`${Dy}Directly calling start instead of using the api object is deprecated in v9 (use ".start" instead), this will be removed in later 0.X.0 versions`);
}
function vl(e) {
  return L.str(e) && (e[0] == "#" || /\d/.test(e) || !Ny() && hl.test(e) || e in (Xr || {}));
}
const jy = Ny() ? pe : yt, BW = () => {
  const e = J(!1);
  return jy(() => (e.current = !0, () => {
    e.current = !1;
  }), []), e;
};
function DT() {
  const e = be()[1], t = BW();
  return () => {
    t.current && e(Math.random());
  };
}
const jT = (e) => pe(e, WW), WW = [];
function pw(e) {
  const t = J(void 0);
  return pe(() => {
    t.current = e;
  }), t.current;
}
const Va = Symbol.for("Animated:node"), UW = (e) => !!e && e[Va] === e, er = (e) => e && e[Va], Ly = (e, t) => mW(e, Va, t), pl = (e) => e && e[Va] && e[Va].getPayload();
var LT = class {
  constructor() {
    Ly(this, this);
  }
  /** Get every `AnimatedValue` used by this node. */
  getPayload() {
    return this.payload || [];
  }
}, ml = class qT extends LT {
  constructor(t) {
    super(), this._value = t, this.done = !0, this.durationProgress = 0, L.num(this._value) && (this.lastPosition = this._value);
  }
  /** @internal */
  static create(t) {
    return new qT(t);
  }
  getPayload() {
    return [this];
  }
  getValue() {
    return this._value;
  }
  setValue(t, r) {
    return L.num(t) && (this.lastPosition = t, r && (t = Math.round(t / r) * r, this.done && (this.lastPosition = t))), this._value === t ? !1 : (this._value = t, !0);
  }
  reset() {
    const { done: t } = this;
    this.done = !1, L.num(this._value) && (this.elapsedTime = 0, this.durationProgress = 0, this.lastPosition = this._value, t && (this.lastVelocity = null), this.v0 = null);
  }
}, is = class zT extends ml {
  constructor(t) {
    super(0), this._string = null, this._toString = Wa({ output: [t, t] });
  }
  /** @internal */
  static create(t) {
    return new zT(t);
  }
  getValue() {
    const t = this._string;
    return t ?? (this._string = this._toString(this._value));
  }
  setValue(t) {
    if (L.str(t)) {
      if (t == this._string) return !1;
      this._string = t, this._value = 1;
    } else if (super.setValue(t)) this._string = null;
    else return !1;
    return !0;
  }
  reset(t) {
    t && (this._toString = Wa({ output: [this.getValue(), t] })), this._value = 0, super.reset();
  }
};
const as = { dependencies: null };
var ei = class extends LT {
  constructor(e) {
    super(), this.source = e, this.setValue(e);
  }
  getValue(e) {
    const t = {};
    return bt(this.source, (r, n) => {
      UW(r) ? t[n] = r.getValue(e) : He(r) ? t[n] = je(r) : e || (t[n] = r);
    }), t;
  }
  /** Replace the raw object data */
  setValue(e) {
    this.source = e, this.payload = this._makePayload(e);
  }
  reset() {
    this.payload && X(this.payload, (e) => e.reset());
  }
  /** Create a payload set. */
  _makePayload(e) {
    if (e) {
      const t = /* @__PURE__ */ new Set();
      return bt(e, this._addToPayload, t), Array.from(t);
    }
  }
  /** Add to a payload set. */
  _addToPayload(e) {
    as.dependencies && He(e) && as.dependencies.add(e);
    const t = pl(e);
    t && X(t, (r) => this.add(r));
  }
}, VW = class FT extends ei {
  constructor(t) {
    super(t);
  }
  /** @internal */
  static create(t) {
    return new FT(t);
  }
  getValue() {
    return this.source.map((t) => t.getValue());
  }
  setValue(t) {
    const r = this.getPayload();
    return t.length == r.length ? r.map((n, i) => n.setValue(t[i])).some(Boolean) : (super.setValue(t.map(HW)), !0);
  }
};
function HW(e) {
  return (vl(e) ? is : ml).create(e);
}
function cp(e) {
  const t = er(e);
  return t ? t.constructor : L.arr(e) ? VW : vl(e) ? is : ml;
}
const mw = (e, t) => {
  const r = !L.fun(e) || e.prototype && e.prototype.isReactComponent;
  return Ke((n, i) => {
    const a = J(null), o = r && re((p) => {
      a.current = YW(i, p);
    }, [i]), [u, s] = GW(n, t), l = DT(), c = () => {
      const p = a.current;
      r && !p || (p ? t.applyAnimatedValues(p, u.getValue(!0)) : !1) === !1 && l();
    }, f = new KW(c, s), d = J(void 0);
    jy(() => (d.current = f, X(s, (p) => Dr(p, f)), () => {
      d.current && (X(d.current.deps, (p) => tn(p, d.current)), ee.cancel(d.current.update));
    })), pe(c, []), jT(() => () => {
      const p = d.current;
      X(p.deps, (v) => tn(v, p));
    });
    const h = t.getComponentProps(u.getValue());
    return /* @__PURE__ */ S.createElement(e, {
      ...h,
      ref: o
    });
  });
};
var KW = class {
  constructor(e, t) {
    this.update = e, this.deps = t;
  }
  eventObserved(e) {
    e.type == "change" && ee.write(this.update);
  }
};
function GW(e, t) {
  const r = /* @__PURE__ */ new Set();
  return as.dependencies = r, e.style && (e = {
    ...e,
    style: t.createAnimatedStyle(e.style)
  }), e = new ei(e), as.dependencies = null, [e, r];
}
function YW(e, t) {
  return e && (L.fun(e) ? e(t) : e.current = t), t;
}
const yw = Symbol.for("AnimatedComponent"), gw = /* @__PURE__ */ new WeakMap(), yl = (e, { applyAnimatedValues: t = () => !1, createAnimatedStyle: r = (i) => new ei(i), getComponentProps: n = (i) => i } = {}) => {
  const i = {
    applyAnimatedValues: t,
    createAnimatedStyle: r,
    getComponentProps: n
  }, a = (o) => {
    const u = bw(o) || "Anonymous";
    if (L.str(o)) o = a[o] || (a[o] = mw(o, i));
    else {
      let s = o[yw] ?? gw.get(o);
      if (!s) {
        s = mw(o, i);
        try {
          o[yw] = s;
        } catch {
        }
        gw.set(o, s);
      }
      o = s;
    }
    return o.displayName = `Animated(${u})`, o;
  };
  return bt(e, (o, u) => {
    L.arr(e) && (u = bw(o)), a[u] = a(o);
  }), { animated: a };
}, bw = (e) => L.str(e) ? e : e && L.str(e.displayName) ? e.displayName : L.fun(e) && e.name || null;
function wn(e, ...t) {
  return L.fun(e) ? e(...t) : e;
}
const Sa = (e, t) => e === !0 || !!(t && e && (L.fun(e) ? e(t) : nt(e).includes(t))), BT = (e, t) => L.obj(e) ? t && e[t] : e, WT = (e, t) => e.default === !0 ? e[t] : e.default ? e.default[t] : void 0, XW = (e) => e, qy = (e, t = XW) => {
  let r = ZW;
  e.default && e.default !== !0 && (e = e.default, r = Object.keys(e));
  const n = {};
  for (const i of r) {
    const a = t(e[i], i);
    L.und(a) || (n[i] = a);
  }
  return n;
}, ZW = [
  "config",
  "onProps",
  "onStart",
  "onChange",
  "onPause",
  "onResume",
  "onRest"
], QW = {
  config: 1,
  from: 1,
  to: 1,
  ref: 1,
  loop: 1,
  reset: 1,
  pause: 1,
  cancel: 1,
  reverse: 1,
  immediate: 1,
  default: 1,
  delay: 1,
  onProps: 1,
  onStart: 1,
  onChange: 1,
  onPause: 1,
  onResume: 1,
  onRest: 1,
  onResolve: 1,
  items: 1,
  trail: 1,
  sort: 1,
  expires: 1,
  initial: 1,
  enter: 1,
  update: 1,
  leave: 1,
  children: 1,
  onDestroyed: 1,
  keys: 1,
  callId: 1,
  parentId: 1
};
function JW(e) {
  const t = {};
  let r = 0;
  if (bt(e, (n, i) => {
    QW[i] || (t[i] = n, r++);
  }), r) return t;
}
function UT(e) {
  const t = JW(e);
  if (t) {
    const r = { to: t };
    return bt(e, (n, i) => i in t || (r[i] = n)), r;
  }
  return { ...e };
}
function Ha(e) {
  const t = je(e);
  return L.arr(t) ? t.map(Ha) : vl(t) ? Nt.createStringInterpolator({
    range: [0, 1],
    output: [t, t]
  })(1) : t;
}
function eU(e) {
  for (const t in e) return !0;
  return !1;
}
function fp(e) {
  return L.fun(e) || L.arr(e) && L.obj(e[0]);
}
function tU(e, t) {
  var r;
  (r = e.ref) == null || r.delete(e), t == null || t.delete(e);
}
function rU(e, t) {
  var r;
  t && e.ref !== t && ((r = e.ref) == null || r.delete(e), t.add(e), e.ref = t);
}
const VT = {
  default: {
    tension: 170,
    friction: 26
  },
  gentle: {
    tension: 120,
    friction: 14
  },
  wobbly: {
    tension: 180,
    friction: 12
  },
  stiff: {
    tension: 210,
    friction: 20
  },
  slow: {
    tension: 280,
    friction: 60
  },
  molasses: {
    tension: 280,
    friction: 120
  }
}, dp = {
  ...VT.default,
  mass: 1,
  damping: 1,
  easing: kW.linear,
  clamp: !1
};
var nU = class {
  constructor() {
    this.velocity = 0, Object.assign(this, dp);
  }
};
function iU(e, t, r) {
  r && (r = { ...r }, _w(r, t), t = {
    ...r,
    ...t
  }), _w(e, t), Object.assign(e, t);
  for (const o in dp) e[o] == null && (e[o] = dp[o]);
  let { frequency: n, damping: i } = e;
  const { mass: a } = e;
  return L.und(n) || (n < 0.01 && (n = 0.01), i < 0 && (i = 0), e.tension = Math.pow(2 * Math.PI / n, 2) * a, e.friction = 4 * Math.PI * i * a / n), e;
}
function _w(e, t) {
  if (!L.und(t.decay)) e.duration = void 0;
  else {
    const r = !L.und(t.tension) || !L.und(t.friction);
    (r || !L.und(t.frequency) || !L.und(t.damping) || !L.und(t.mass)) && (e.duration = void 0, e.decay = void 0), r && (e.frequency = void 0);
  }
}
const ww = [];
var aU = class {
  constructor() {
    this.changed = !1, this.values = ww, this.toValues = null, this.fromValues = ww, this.config = new nU(), this.immediate = !1;
  }
};
function HT(e, { key: t, props: r, defaultProps: n, state: i, actions: a }) {
  return new Promise((o, u) => {
    let s, l, c = Sa(r.cancel ?? (n == null ? void 0 : n.cancel), t);
    if (c) h();
    else {
      L.und(r.pause) || (i.paused = Sa(r.pause, t));
      let p = n == null ? void 0 : n.pause;
      p !== !0 && (p = i.paused || Sa(p, t)), s = wn(r.delay || 0, t), p ? (i.resumeQueue.add(d), a.pause()) : (a.resume(), d());
    }
    function f() {
      i.resumeQueue.add(d), i.timeouts.delete(l), l.cancel(), s = l.time - ee.now();
    }
    function d() {
      s > 0 && !Nt.skipAnimation ? (i.delayed = !0, l = ee.setTimeout(h, s), i.pauseQueue.add(f), i.timeouts.add(l)) : h();
    }
    function h() {
      i.delayed && (i.delayed = !1), i.pauseQueue.delete(f), i.timeouts.delete(l), e <= (i.cancelId || 0) && (c = !0);
      try {
        a.start({
          ...r,
          callId: e,
          cancel: c
        }, o);
      } catch (p) {
        u(p);
      }
    }
  });
}
const zy = (e, t) => t.length == 1 ? t[0] : t.some((r) => r.cancelled) ? wi(e.get()) : t.every((r) => r.noop) ? KT(e.get()) : zt(e.get(), t.every((r) => r.finished)), KT = (e) => ({
  value: e,
  noop: !0,
  finished: !0,
  cancelled: !1
}), zt = (e, t, r = !1) => ({
  value: e,
  finished: t,
  cancelled: r
}), wi = (e) => ({
  value: e,
  cancelled: !0,
  finished: !1
});
function GT(e, t, r, n) {
  const { callId: i, parentId: a, onRest: o } = t, { asyncTo: u, promise: s } = r;
  return !a && e === u && !t.reset ? s : r.promise = (async () => {
    r.asyncId = i, r.asyncTo = e;
    const l = qy(t, (b, g) => g === "onRest" ? void 0 : b);
    let c, f;
    const d = new Promise((b, g) => (c = b, f = g)), h = (b) => {
      const g = i <= (r.cancelId || 0) && wi(n) || i !== r.asyncId && zt(n, !1);
      if (g)
        throw b.result = g, f(b), b;
    };
    let p = 0;
    const v = 1024, m = (b, g) => {
      const _ = new xw(), x = new Aw();
      return (async () => {
        h(_);
        const w = L.obj(b) ? { ...b } : {
          ...g,
          to: b
        };
        if (w.parentId = i, bt(l, (P, T) => {
          L.und(w[T]) && (w[T] = P);
        }), Nt.skipAnimation) {
          if (++p > v)
            throw gl(r), x.result = zt(n, !1), f(x), x;
          return w.immediate = !0, await n.start(w);
        }
        const A = await n.start(w);
        return h(_), r.paused && await new Promise((P) => {
          r.resumeQueue.add(P);
        }), A;
      })();
    };
    let y;
    try {
      let b;
      L.arr(e) ? b = (async (g) => {
        for (const _ of g) await m(_);
      })(e) : b = Promise.resolve(e(m, n.stop.bind(n))), await Promise.all([b.then(c), d]), y = zt(n.get(), !0, !1);
    } catch (b) {
      if (b instanceof xw) y = b.result;
      else if (b instanceof Aw) y = b.result;
      else throw b;
    } finally {
      i == r.asyncId && (r.asyncId = a, r.asyncTo = a ? u : void 0, r.promise = a ? s : void 0);
    }
    return L.fun(o) && ee.batchedUpdates(() => {
      o(y, n, n.item);
    }), y;
  })();
}
function gl(e, t) {
  Aa(e.timeouts, (r) => r.cancel()), e.pauseQueue.clear(), e.resumeQueue.clear(), e.asyncId = e.asyncTo = e.promise = void 0, t && (e.cancelId = t);
}
var xw = class extends Error {
  constructor() {
    super("An async animation has been interrupted. You see this error because you forgot to use `await` or `.catch(...)` on its returned promise.");
  }
}, Aw = class extends Error {
  constructor() {
    super("SkipAnimationSignal");
  }
};
const hp = (e) => e instanceof Fy;
let oU = 1;
var Fy = class extends go {
  constructor(...e) {
    super(...e), this.id = oU++, this._priority = 0;
  }
  get priority() {
    return this._priority;
  }
  set priority(e) {
    this._priority != e && (this._priority = e, this._onPriorityChange(e));
  }
  /** Get the current value */
  get() {
    const e = er(this);
    return e && e.getValue();
  }
  /** Create a spring that maps our value to another value */
  to(...e) {
    return Nt.to(this, e);
  }
  /** @deprecated Use the `to` method instead. */
  interpolate(...e) {
    return qW(), Nt.to(this, e);
  }
  toJSON() {
    return this.get();
  }
  observerAdded(e) {
    e == 1 && this._attach();
  }
  observerRemoved(e) {
    e == 0 && this._detach();
  }
  /** Called when the first child is added. */
  _attach() {
  }
  /** Called when the last child is removed. */
  _detach() {
  }
  /** Tell our children about our new value */
  _onChange(e, t = !1) {
    en(this, {
      type: "change",
      parent: this,
      value: e,
      idle: t
    });
  }
  /** Tell our children about our new priority */
  _onPriorityChange(e) {
    this.idle || cl.sort(this), en(this, {
      type: "priority",
      parent: this,
      priority: e
    });
  }
};
const Bn = Symbol.for("SpringPhase"), uU = 1, sU = 2, YT = 4, Yf = (e) => (e[Bn] & uU) > 0, zr = (e) => (e[Bn] & sU) > 0, ua = (e) => (e[Bn] & YT) > 0, Ow = (e, t) => t ? e[Bn] |= 3 : e[Bn] &= -3, Sw = (e, t) => t ? e[Bn] |= YT : e[Bn] &= -5;
var lU = class extends Fy {
  constructor(e, t) {
    if (super(), this.animation = new aU(), this.defaultProps = {}, this._state = {
      paused: !1,
      delayed: !1,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    }, this._pendingCalls = /* @__PURE__ */ new Set(), this._lastCallId = 0, this._lastToId = 0, this._memoizedDuration = 0, !L.und(e) || !L.und(t)) {
      const r = L.obj(e) ? { ...e } : {
        ...t,
        from: e
      };
      L.und(r.default) && (r.default = !0), this.start(r);
    }
  }
  /** Equals true when not advancing on each frame. */
  get idle() {
    return !(zr(this) || this._state.asyncTo) || ua(this);
  }
  get goal() {
    return je(this.animation.to);
  }
  get velocity() {
    const e = er(this);
    return e instanceof ml ? e.lastVelocity || 0 : e.getPayload().map((t) => t.lastVelocity || 0);
  }
  /**
  * When true, this value has been animated at least once.
  */
  get hasAnimated() {
    return Yf(this);
  }
  /**
  * When true, this value has an unfinished animation,
  * which is either active or paused.
  */
  get isAnimating() {
    return zr(this);
  }
  /**
  * When true, all current and future animations are paused.
  */
  get isPaused() {
    return ua(this);
  }
  /**
  *
  *
  */
  get isDelayed() {
    return this._state.delayed;
  }
  /** Advance the current animation by a number of milliseconds */
  advance(e) {
    let t = !0, r = !1;
    const n = this.animation;
    let { toValues: i } = n;
    const { config: a } = n, o = pl(n.to);
    !o && He(n.to) && (i = nt(je(n.to))), n.values.forEach((l, c) => {
      if (l.done) return;
      const f = l.constructor == is ? 1 : o ? o[c].lastPosition : i[c];
      let d = n.immediate, h = f;
      if (!d) {
        if (h = l.lastPosition, a.tension <= 0) {
          l.done = !0;
          return;
        }
        let p = l.elapsedTime += e;
        const v = n.fromValues[c], m = l.v0 != null ? l.v0 : l.v0 = L.arr(a.velocity) ? a.velocity[c] : a.velocity;
        let y;
        const b = a.precision || (v == f ? 5e-3 : Math.max(Math.max(Math.abs(f), Math.abs(v), 1) * Number.EPSILON, Math.min(1, Math.abs(f - v) * 1e-3)));
        if (L.und(a.duration))
          if (a.decay) {
            const g = a.decay === !0 ? 0.998 : a.decay, _ = Math.exp(-(1 - g) * p);
            h = v + m / (1 - g) * (1 - _), d = Math.abs(l.lastPosition - h) <= b, y = m * _;
          } else {
            y = l.lastVelocity == null ? m : l.lastVelocity;
            const g = a.restVelocity || b / 10, _ = a.clamp ? 0 : a.bounce, x = !L.und(_), w = v == f ? l.v0 > 0 : v < f;
            let A, P = !1;
            const T = 1, C = Math.ceil(e / T);
            for (let O = 0; O < C && (A = Math.abs(y) > g, !(!A && (d = Math.abs(f - h) <= b, d))); ++O) {
              x && (P = h == f || h > f == w, P && (y = -y * _, h = f));
              const D = (-a.tension * 1e-6 * (h - f) + -a.friction * 1e-3 * y) / a.mass;
              y = y + D * T, h = h + y * T;
            }
          }
        else {
          let g = 1;
          a.duration > 0 && (this._memoizedDuration !== a.duration && (this._memoizedDuration = a.duration, l.durationProgress > 0 && (l.elapsedTime = a.duration * l.durationProgress, p = l.elapsedTime += e)), g = (a.progress || 0) + p / this._memoizedDuration, g = g > 1 ? 1 : g < 0 ? 0 : g, l.durationProgress = g), h = v + a.easing(g) * (f - v), y = (h - l.lastPosition) / e, d = g == 1;
        }
        l.lastVelocity = y, Number.isNaN(h) && (console.warn("Got NaN while animating:", this), d = !0);
      }
      o && !o[c].done && (d = !1), d ? l.done = !0 : t = !1, l.setValue(h, a.round) && (r = !0);
    });
    const u = er(this), s = u.getValue();
    if (t) {
      const l = je(n.to);
      (s !== l || r) && !a.decay ? (u.setValue(l), this._onChange(l)) : r && a.decay && this._onChange(s), this._stop();
    } else r && this._onChange(s);
  }
  /** Set the current value, while stopping the current animation */
  set(e) {
    return ee.batchedUpdates(() => {
      this._stop(), this._focus(e), this._set(e);
    }), this;
  }
  /**
  * Freeze the active animation in time, as well as any updates merged
  * before `resume` is called.
  */
  pause() {
    this._update({ pause: !0 });
  }
  /** Resume the animation if paused. */
  resume() {
    this._update({ pause: !1 });
  }
  /** Skip to the end of the current animation. */
  finish() {
    if (zr(this)) {
      const { to: e, config: t } = this.animation;
      ee.batchedUpdates(() => {
        this._onStart(), t.decay || this._set(e, !1), this._stop();
      });
    }
    return this;
  }
  /** Push props into the pending queue. */
  update(e) {
    return (this.queue || (this.queue = [])).push(e), this;
  }
  start(e, t) {
    let r;
    return L.und(e) ? (r = this.queue || [], this.queue = []) : r = [L.obj(e) ? e : {
      ...t,
      to: e
    }], Promise.all(r.map((n) => this._update(n))).then((n) => zy(this, n));
  }
  /**
  * Stop the current animation, and cancel any delayed updates.
  *
  * Pass `true` to call `onRest` with `cancelled: true`.
  */
  stop(e) {
    const { to: t } = this.animation;
    return L.und(t) || this._focus(this.get()), gl(this._state, e && this._lastCallId), ee.batchedUpdates(() => this._stop(t, e)), this;
  }
  /** Restart the animation. */
  reset() {
    this._update({ reset: !0 });
  }
  /** @internal */
  eventObserved(e) {
    e.type == "change" ? this._start() : e.type == "priority" && (this.priority = e.priority + 1);
  }
  /**
  * Parse the `to` and `from` range from the given `props` object.
  *
  * This also ensures the initial value is available to animated components
  * during the render phase.
  */
  _prepareNode(e) {
    const t = this.key || "";
    let { to: r, from: n } = e;
    r = L.obj(r) ? r[t] : r, (r == null || fp(r)) && (r = void 0), n = L.obj(n) ? n[t] : n, n == null && (n = void 0);
    const i = {
      to: r,
      from: n
    };
    return Yf(this) || (e.reverse && ([r, n] = [n, r]), n = je(n), L.und(n) ? er(this) || this._set(r) : this._set(n)), i;
  }
  /** Every update is processed by this method before merging. */
  _update({ ...e }, t) {
    const { key: r, defaultProps: n } = this;
    e.default && Object.assign(n, qy(e, (o, u) => /^on/.test(u) ? BT(o, r) : o)), Pw(this, e, "onProps"), la(this, "onProps", e, this);
    const i = this._prepareNode(e);
    if (Object.isFrozen(this)) throw Error("Cannot animate a `SpringValue` object that is frozen. Did you forget to pass your component to `animated(...)` before animating its props?");
    const a = this._state;
    return HT(++this._lastCallId, {
      key: r,
      props: e,
      defaultProps: n,
      state: a,
      actions: {
        pause: () => {
          ua(this) || (Sw(this, !0), ma(a.pauseQueue), la(this, "onPause", zt(this, sa(this, this.animation.to)), this));
        },
        resume: () => {
          ua(this) && (Sw(this, !1), zr(this) && this._resume(), ma(a.resumeQueue), la(this, "onResume", zt(this, sa(this, this.animation.to)), this));
        },
        start: this._merge.bind(this, i)
      }
    }).then((o) => {
      if (e.loop && o.finished && !(t && o.noop)) {
        const u = XT(e);
        if (u) return this._update(u, !0);
      }
      return o;
    });
  }
  /** Merge props into the current animation */
  _merge(e, t, r) {
    if (t.cancel)
      return this.stop(!0), r(wi(this));
    const n = !L.und(e.to), i = !L.und(e.from);
    if (n || i) if (t.callId > this._lastToId) this._lastToId = t.callId;
    else return r(wi(this));
    const { key: a, defaultProps: o, animation: u } = this, { to: s, from: l } = u;
    let { to: c = s, from: f = l } = e;
    i && !n && (!t.default || L.und(c)) && (c = f), t.reverse && ([c, f] = [f, c]);
    const d = !wr(f, l);
    d && (u.from = f), f = je(f);
    const h = !wr(c, s);
    h && this._focus(c);
    const p = fp(t.to), { config: v } = u, { decay: m, velocity: y } = v;
    (n || i) && !v.decay && (v.velocity = 0), t.config && !p && iU(v, wn(t.config, a), t.config !== o.config ? wn(o.config, a) : void 0);
    let b = er(this);
    if (!b || L.und(c)) return r(zt(this, !0));
    const g = L.und(t.reset) ? i && !t.default : !L.und(f) && Sa(t.reset, a), _ = g ? f : this.get(), x = Ha(c), w = L.num(x) || L.arr(x) || vl(x), A = !p && (!w || Sa(o.immediate || t.immediate, a));
    if (h) {
      const O = cp(c);
      if (O !== b.constructor) if (A) b = this._set(x);
      else throw Error(`Cannot animate between ${b.constructor.name} and ${O.name}, as the "to" prop suggests`);
    }
    const P = b.constructor;
    let T = He(c), C = !1;
    if (!T) {
      const O = g || !Yf(this) && d;
      (h || O) && (C = wr(Ha(_), x), T = !C), (!wr(u.immediate, A) && !A || !wr(v.decay, m) || !wr(v.velocity, y)) && (T = !0);
    }
    if (C && zr(this) && (u.changed && !g ? T = !0 : T || this._stop(s)), !p && ((T || He(s)) && (u.values = b.getPayload(), u.toValues = He(c) ? null : P == is ? [1] : nt(x)), u.immediate != A && (u.immediate = A, !A && !g && this._set(s)), T)) {
      const { onRest: O } = u;
      X(fU, (j) => Pw(this, t, j));
      const D = zt(this, sa(this, s));
      ma(this._pendingCalls, D), this._pendingCalls.add(r), u.changed && ee.batchedUpdates(() => {
        var j;
        u.changed = !g, O == null || O(D, this), g ? wn(o.onRest, D) : (j = u.onStart) == null || j.call(u, D, this);
      });
    }
    g && this._set(_), p ? r(GT(t.to, t, this._state, this)) : T ? this._start() : zr(this) && !h ? this._pendingCalls.add(r) : r(KT(_));
  }
  /** Update the `animation.to` value, which might be a `FluidValue` */
  _focus(e) {
    const t = this.animation;
    e !== t.to && (dw(this) && this._detach(), t.to = e, dw(this) && this._attach());
  }
  _attach() {
    let e = 0;
    const { to: t } = this.animation;
    He(t) && (Dr(t, this), hp(t) && (e = t.priority + 1)), this.priority = e;
  }
  _detach() {
    const { to: e } = this.animation;
    He(e) && tn(e, this);
  }
  /**
  * Update the current value from outside the frameloop,
  * and return the `Animated` node.
  */
  _set(e, t = !0) {
    const r = je(e);
    if (!L.und(r)) {
      const n = er(this);
      if (!n || !wr(r, n.getValue())) {
        const i = cp(r);
        !n || n.constructor != i ? Ly(this, i.create(r)) : n.setValue(r), n && ee.batchedUpdates(() => {
          this._onChange(r, t);
        });
      }
    }
    return er(this);
  }
  _onStart() {
    const e = this.animation;
    e.changed || (e.changed = !0, la(this, "onStart", zt(this, sa(this, e.to)), this));
  }
  _onChange(e, t) {
    const r = zt(e, !1);
    t || (this._onStart(), wn(this.animation.onChange, r, this)), wn(this.defaultProps.onChange, r, this), super._onChange(e, t);
  }
  _start() {
    const e = this.animation;
    er(this).reset(je(e.to)), e.immediate || (e.fromValues = e.values.map((t) => t.lastPosition)), zr(this) || (Ow(this, !0), ua(this) || this._resume());
  }
  _resume() {
    Nt.skipAnimation ? this.finish() : cl.start(this);
  }
  /**
  * Exit the frameloop and notify `onRest` listeners.
  *
  * Always wrap `_stop` calls with `batchedUpdates`.
  */
  _stop(e, t) {
    if (zr(this)) {
      Ow(this, !1);
      const r = this.animation;
      X(r.values, (i) => {
        i.done = !0;
      }), r.toValues && (r.onChange = r.onPause = r.onResume = void 0), en(this, {
        type: "idle",
        parent: this
      });
      const n = t ? wi(this.get()) : zt(this.get(), sa(this, e ?? r.to));
      ma(this._pendingCalls, n), r.changed = !1, la(this, "onRest", n, this);
    }
  }
};
function sa(e, t) {
  const r = Ha(t);
  return wr(Ha(e.get()), r);
}
function XT(e, t = e.loop, r = e.to) {
  const n = wn(t);
  if (n) {
    const i = n !== !0 && UT(n), a = (i || e).reverse, o = !i || i.reset;
    return Ka({
      ...e,
      loop: t,
      default: !1,
      pause: void 0,
      to: !a || fp(r) ? r : void 0,
      from: o ? e.from : void 0,
      reset: o,
      ...i
    });
  }
}
function Ka(e) {
  const { to: t, from: r } = e = UT(e), n = /* @__PURE__ */ new Set();
  return L.obj(t) && Ew(t, n), L.obj(r) && Ew(r, n), e.keys = n.size ? Array.from(n) : null, e;
}
function cU(e) {
  const t = Ka(e);
  return L.und(t.default) && (t.default = qy(t)), t;
}
function Ew(e, t) {
  bt(e, (r, n) => r != null && t.add(n));
}
const fU = [
  "onStart",
  "onRest",
  "onChange",
  "onPause",
  "onResume"
];
function Pw(e, t, r) {
  e.animation[r] = t[r] !== WT(t, r) ? BT(t[r], e.key) : void 0;
}
function la(e, t, ...r) {
  var n, i, a, o;
  (i = (n = e.animation)[t]) == null || i.call(n, ...r), (o = (a = e.defaultProps)[t]) == null || o.call(a, ...r);
}
const dU = [
  "onStart",
  "onChange",
  "onRest"
];
let hU = 1;
var vU = class {
  constructor(e, t) {
    this.id = hU++, this.springs = {}, this.queue = [], this._lastAsyncId = 0, this._lastLoopId = 0, this._active = /* @__PURE__ */ new Set(), this._changed = /* @__PURE__ */ new Set(), this._started = !1, this._state = {
      paused: !1,
      pauseQueue: /* @__PURE__ */ new Set(),
      resumeQueue: /* @__PURE__ */ new Set(),
      timeouts: /* @__PURE__ */ new Set()
    }, this._events = {
      onStart: /* @__PURE__ */ new Map(),
      onChange: /* @__PURE__ */ new Map(),
      onRest: /* @__PURE__ */ new Map()
    }, this._onFrame = this._onFrame.bind(this), t && (this._flush = t), e && this.start({
      default: !0,
      ...e
    });
  }
  /**
  * Equals `true` when no spring values are in the frameloop, and
  * no async animation is currently active.
  */
  get idle() {
    return !this._state.asyncTo && Object.values(this.springs).every((e) => e.idle && !e.isDelayed && !e.isPaused);
  }
  get item() {
    return this._item;
  }
  set item(e) {
    this._item = e;
  }
  /** Get the current values of our springs */
  get() {
    const e = {};
    return this.each((t, r) => e[r] = t.get()), e;
  }
  /** Set the current values without animating. */
  set(e) {
    for (const t in e) {
      const r = e[t];
      L.und(r) || this.springs[t].set(r);
    }
  }
  /** Push an update onto the queue of each value. */
  update(e) {
    return e && this.queue.push(Ka(e)), this;
  }
  /**
  * Start the queued animations for every spring, and resolve the returned
  * promise once all queued animations have finished or been cancelled.
  *
  * When you pass a queue (instead of nothing), that queue is used instead of
  * the queued animations added with the `update` method, which are left alone.
  */
  start(e) {
    let { queue: t } = this;
    return e ? t = nt(e).map(Ka) : this.queue = [], this._flush ? this._flush(this, t) : (tC(this, t), vp(this, t));
  }
  /** @internal */
  stop(e, t) {
    if (e !== !!e && (t = e), t) {
      const r = this.springs;
      X(nt(t), (n) => r[n].stop(!!e));
    } else
      gl(this._state, this._lastAsyncId), this.each((r) => r.stop(!!e));
    return this;
  }
  /** Freeze the active animation in time */
  pause(e) {
    if (L.und(e)) this.start({ pause: !0 });
    else {
      const t = this.springs;
      X(nt(e), (r) => t[r].pause());
    }
    return this;
  }
  /** Resume the animation if paused. */
  resume(e) {
    if (L.und(e)) this.start({ pause: !1 });
    else {
      const t = this.springs;
      X(nt(e), (r) => t[r].resume());
    }
    return this;
  }
  /** Call a function once per spring value */
  each(e) {
    bt(this.springs, e);
  }
  /**
  * Subscribe to loop iteration restarts on this controller. Returns an
  * unsubscribe function. Listeners fire synchronously inside `flushUpdate`
  * just before the next iteration is dispatched.
  * @internal
  */
  onLoopReset(e) {
    const t = this._onLoopReset ?? (this._onLoopReset = /* @__PURE__ */ new Set());
    return t.add(e), () => {
      t.delete(e);
    };
  }
  /** @internal Called at the end of every animation frame */
  _onFrame() {
    const { onStart: e, onChange: t, onRest: r } = this._events, n = this._active.size > 0, i = this._changed.size > 0;
    (n && !this._started || i && !this._started) && (this._started = !0, Aa(e, ([u, s]) => {
      s.value = this.get(), u(s, this, this._item);
    }));
    const a = !n && this._started, o = i || a && r.size ? this.get() : null;
    i && t.size && Aa(t, ([u, s]) => {
      s.value = o, u(s, this, this._item);
    }), a && (this._started = !1, Aa(r, ([u, s]) => {
      s.value = o, u(s, this, this._item);
    }));
  }
  /** @internal */
  eventObserved(e) {
    if (e.type == "change")
      this._changed.add(e.parent), e.idle || this._active.add(e.parent);
    else if (e.type == "idle") this._active.delete(e.parent);
    else return;
    ee.onFrame(this._onFrame);
  }
};
function vp(e, t) {
  return Promise.all(t.map((r) => ZT(e, r))).then((r) => zy(e, r));
}
async function ZT(e, t, r) {
  var y;
  const { keys: n, to: i, from: a, loop: o, onRest: u, onResolve: s } = t, l = L.obj(t.default) && t.default;
  o && (t.loop = !1);
  const c = t, f = !r && !c.parentId && "loop" in t ? ++e._lastLoopId : r ? c.loopId : e._lastLoopId;
  i === !1 && (t.to = null), a === !1 && (t.from = null);
  const d = L.arr(i) || L.fun(i) ? i : void 0;
  d ? (t.to = void 0, t.onRest = void 0, l && (l.onRest = void 0)) : X(dU, (b) => {
    const g = t[b];
    if (L.fun(g)) {
      const _ = e._events[b];
      t[b] = (({ finished: x, cancelled: w }) => {
        const A = _.get(g);
        A ? (x || (A.finished = !1), w && (A.cancelled = !0)) : _.set(g, {
          value: null,
          finished: x || !1,
          cancelled: w || !1
        });
      }), l && (l[b] = t[b]);
    }
  });
  const h = e._state;
  t.pause === !h.paused ? (h.paused = t.pause, ma(t.pause ? h.pauseQueue : h.resumeQueue)) : h.paused && (t.pause = !0);
  const p = (n || Object.keys(e.springs)).map((b) => e.springs[b].start(t)), v = t.cancel === !0 || WT(t, "cancel") === !0;
  (d || v && h.asyncId) && p.push(HT(++e._lastAsyncId, {
    props: t,
    state: h,
    actions: {
      pause: sp,
      resume: sp,
      start(b, g) {
        v ? (gl(h, e._lastAsyncId), g(wi(e))) : (b.onRest = u, g(GT(d, b, h, e)));
      }
    }
  })), h.paused && await new Promise((b) => {
    h.resumeQueue.add(b);
  });
  const m = zy(e, await Promise.all(p));
  if (o && m.finished && !(r && m.noop) && f === e._lastLoopId) {
    const b = XT(t, o, i);
    if (b)
      return b.loopId = f, (y = e._onLoopReset) == null || y.forEach((g) => g()), tC(e, [b]), ZT(e, b, !0);
  }
  return s && ee.batchedUpdates(() => s(m, e, e.item)), m;
}
function Tw(e, t) {
  const r = { ...e.springs };
  return t && X(nt(t), (n) => {
    L.und(n.keys) && (n = Ka(n)), L.obj(n.to) || (n = {
      ...n,
      to: void 0
    }), eC(r, n, (i) => JT(i));
  }), QT(e, r), r;
}
function QT(e, t) {
  bt(t, (r, n) => {
    e.springs[n] || (e.springs[n] = r, Dr(r, e));
  });
}
function JT(e, t) {
  const r = new lU();
  return r.key = e, t && Dr(r, t), r;
}
function eC(e, t, r) {
  t.keys && X(t.keys, (n) => {
    (e[n] || (e[n] = r(n)))._prepareNode(t);
  });
}
function tC(e, t) {
  X(t, (r) => {
    eC(e.springs, r, (n) => JT(n, e));
  });
}
const pU = S.createContext({
  pause: !1,
  immediate: !1
}), mU = () => {
  const e = [], t = function(n) {
    FW();
    const i = [];
    return X(e, (a, o) => {
      if (L.und(n)) i.push(a.start());
      else {
        const u = r(n, a, o);
        u && i.push(a.start(u));
      }
    }), i;
  };
  t.current = e, t.add = function(n) {
    e.includes(n) || e.push(n);
  }, t.delete = function(n) {
    const i = e.indexOf(n);
    ~i && e.splice(i, 1);
  }, t.pause = function() {
    return X(e, (n) => n.pause(...arguments)), this;
  }, t.resume = function() {
    return X(e, (n) => n.resume(...arguments)), this;
  }, t.set = function(n) {
    X(e, (i, a) => {
      const o = L.fun(n) ? n(a, i) : n;
      o && i.set(o);
    });
  }, t.start = function(n) {
    const i = [];
    return X(e, (a, o) => {
      if (L.und(n)) i.push(a.start());
      else {
        const u = this._getProps(n, a, o);
        u && i.push(a.start(u));
      }
    }), i;
  }, t.stop = function() {
    return X(e, (n) => n.stop(...arguments)), this;
  }, t.update = function(n) {
    return X(e, (i, a) => i.update(this._getProps(n, i, a))), this;
  };
  const r = function(n, i, a) {
    return L.fun(n) ? n(a, i) : n;
  };
  return t._getProps = r, t;
};
function rC(e, t, r) {
  const n = L.fun(t) && t;
  n && !r && (r = []);
  const i = ue(() => n || arguments.length == 3 ? mU() : void 0, []), a = J(0), o = DT(), u = ue(() => ({
    ctrls: [],
    queue: [],
    flush(y, b) {
      const g = Tw(y, b);
      return a.current > 0 && !u.queue.length && !Object.keys(g).some((_) => !y.springs[_]) ? vp(y, b) : new Promise((_) => {
        QT(y, g), u.queue.push(() => {
          _(vp(y, b));
        }), o();
      });
    }
  }), []), s = J([...u.ctrls]), l = J([]), c = J([]);
  c.current = [];
  const f = pw(e) || 0;
  ue(() => {
    X(s.current.slice(e, f), (y) => {
      tU(y, i), y.stop(!0);
    }), s.current.length = e, d(f, e);
  }, [e]), ue(() => {
    d(0, Math.min(f, e));
  }, r);
  function d(y, b) {
    for (let g = y; g < b; g++) {
      const _ = s.current[g] || (s.current[g] = new vU(null, u.flush)), x = n ? n(g, _) : t[g];
      x && (l.current[g] = cU(x));
    }
  }
  const h = s.current.map((y, b) => Tw(y, l.current[b])), p = at(pU), v = p !== pw(p) && eU(p);
  jy(() => {
    a.current++, u.ctrls = s.current;
    const { queue: y } = u;
    y.length && (u.queue = [], X(y, (g) => g()));
    const b = l.current.length > 0 ? l.current : c.current;
    X(s.current, (g, _) => {
      i == null || i.add(g), v && g.start({ default: p });
      const x = b[_];
      x && (rU(g, x.ref), g.ref ? g.queue.push({
        ...x,
        default: L.obj(x.default) ? { ...x.default } : x.default
      }) : g.start(x));
    }), l.current.length > 0 && (c.current = l.current), l.current = [];
  }), jT(() => () => {
    X(u.ctrls, (y) => y.stop(!0));
  });
  const m = h.map((y) => ({ ...y }));
  return i ? [m, i] : m;
}
function Ki(e, t) {
  const r = L.fun(e), [[n], i] = rC(1, r ? e : [e], r ? [] : t);
  return r || arguments.length == 2 ? [n, i] : n;
}
var nC = class extends Fy {
  constructor(e, t) {
    super(), this.source = e, this.idle = !0, this._active = /* @__PURE__ */ new Set(), this.calc = Wa(...t);
    const r = this._get(), n = cp(r);
    Ly(this, n.create(r));
  }
  advance(e) {
    const t = this._get();
    wr(t, this.get()) || (er(this).setValue(t), this._onChange(t, this.idle)), !this.idle && Cw(this._active) && Xf(this);
  }
  _get() {
    const e = L.arr(this.source) ? this.source.map(je) : nt(je(this.source));
    return this.calc(...e);
  }
  _start() {
    this.idle && !Cw(this._active) && (this.idle = !1, X(pl(this), (e) => {
      e.done = !1;
    }), Nt.skipAnimation ? (ee.batchedUpdates(() => this.advance()), Xf(this)) : cl.start(this));
  }
  _attach() {
    let e = 1;
    X(nt(this.source), (t) => {
      He(t) && Dr(t, this), hp(t) && (t.idle || this._active.add(t), e = Math.max(e, t.priority + 1));
    }), this.priority = e, this._start();
  }
  _detach() {
    X(nt(this.source), (e) => {
      He(e) && tn(e, this);
    }), this._active.clear(), Xf(this);
  }
  /** @internal */
  eventObserved(e) {
    e.type == "change" ? e.idle ? this.advance() : (this._active.add(e.parent), this._start()) : e.type == "idle" ? this._active.delete(e.parent) : e.type == "priority" && (this.priority = nt(this.source).reduce((t, r) => Math.max(t, (hp(r) ? r.priority : 0) + 1), 0));
  }
};
function yU(e) {
  return e.idle !== !1;
}
function Cw(e) {
  return !e.size || Array.from(e).every(yU);
}
function Xf(e) {
  e.idle || (e.idle = !0, X(pl(e), (t) => {
    t.done = !0;
  }), en(e, {
    type: "idle",
    parent: e
  }));
}
const gU = (e, ...t) => new nC(e, t);
Nt.assign({
  createStringInterpolator: bo,
  to: (e, t) => new nC(e, t)
});
const iC = /^--/;
function bU(e, t) {
  return t == null || typeof t == "boolean" || t === "" ? "" : typeof t == "number" && t !== 0 && !iC.test(e) && !(Ea.hasOwnProperty(e) && Ea[e]) ? t + "px" : ("" + t).trim();
}
const Iw = {};
function _U(e, t) {
  if (!e.nodeType || !e.setAttribute || !e.removeAttribute) return !1;
  const r = e.nodeName === "filter" || e.parentNode && e.parentNode.nodeName === "filter", { className: n, style: i, children: a, scrollTop: o, scrollLeft: u, viewBox: s, ...l } = t, c = Object.values(l), f = Object.keys(l).map((d) => r || e.hasAttribute(d) ? d : Iw[d] || (Iw[d] = d.replace(/([A-Z])/g, (h) => "-" + h.toLowerCase())));
  t.hasOwnProperty("children") && (e.textContent = a);
  for (const d in i) if (i.hasOwnProperty(d)) {
    const h = bU(d, i[d]);
    iC.test(d) ? e.style.setProperty(d, h) : e.style[d] = h;
  }
  f.forEach((d, h) => {
    const p = c[h];
    p !== void 0 ? e.setAttribute(d, p) : e.removeAttribute(d);
  }), t.hasOwnProperty("className") && (n !== void 0 ? e.className = n : e.removeAttribute("class")), o !== void 0 && (e.scrollTop = o), u !== void 0 && (e.scrollLeft = u), t.hasOwnProperty("viewBox") && (s !== void 0 ? e.setAttribute("viewBox", s) : e.removeAttribute("viewBox"));
}
let Ea = {
  animationIterationCount: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
};
const wU = (e, t) => e + t.charAt(0).toUpperCase() + t.substring(1), xU = [
  "Webkit",
  "Ms",
  "Moz",
  "O"
];
Ea = Object.keys(Ea).reduce((e, t) => (xU.forEach((r) => e[wU(r, t)] = e[t]), e), Ea);
const AU = /^(matrix3d|matrix|translate3d|translate[XYZ]?|scale3d|scale[XYZ]?|rotate3d|rotate[XYZ]?|skew[XY]?)$/, OU = /^(translate)/, SU = /^(rotate|skew)/, Zf = (e, t) => L.num(e) && e !== 0 ? e + t : e, au = (e, t) => L.arr(e) ? e.every((r) => au(r, t)) : L.num(e) ? e === t : parseFloat(e) === t;
var EU = class extends ei {
  constructor({ x: t, y: r, z: n, ...i }) {
    const a = [], o = [];
    (t || r || n) && (a.push([
      t || 0,
      r || 0,
      n || 0
    ]), o.push((u) => [`translate3d(${u.map((s) => Zf(s, "px")).join(",")})`, au(u, 0)])), bt(i, (u, s) => {
      if (s === "transform")
        a.push([u || ""]), o.push((l) => [l, l === ""]);
      else if (AU.test(s)) {
        if (delete i[s], L.und(u)) return;
        const l = OU.test(s) ? "px" : SU.test(s) ? "deg" : "";
        a.push(nt(u)), o.push(s === "rotate3d" ? ([c, f, d, h]) => [`rotate3d(${c},${f},${d},${Zf(h, l)})`, au(h, 0)] : (c) => [`${s}(${c.map((f) => Zf(f, l)).join(",")})`, au(c, s.startsWith("scale") ? 1 : 0)]);
      }
    }), a.length && (i.transform = new PU(a, o)), super(i);
  }
}, PU = class extends go {
  constructor(t, r) {
    super(), this.inputs = t, this.transforms = r, this._value = null;
  }
  get() {
    return this._value || (this._value = this._get());
  }
  _get() {
    let t = "", r = !0;
    return X(this.inputs, (n, i) => {
      const a = je(n[0]), [o, u] = this.transforms[i](L.arr(a) ? a : n.map(je));
      t += " " + o, r = r && u;
    }), r ? "none" : t;
  }
  observerAdded(t) {
    t == 1 && X(this.inputs, (r) => X(r, (n) => He(n) && Dr(n, this)));
  }
  observerRemoved(t) {
    t == 0 && X(this.inputs, (r) => X(r, (n) => He(n) && tn(n, this)));
  }
  eventObserved(t) {
    t.type == "change" && (this._value = null), en(this, t);
  }
};
const TU = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
Nt.assign({
  batchedUpdates: cs,
  createStringInterpolator: bo,
  colors: fl
});
const CU = yl(TU, {
  applyAnimatedValues: _U,
  createAnimatedStyle: (e) => new EU(e),
  getComponentProps: ({ scrollTop: e, scrollLeft: t, ...r }) => r
}), aC = CU.animated;
var Qf, kw;
function IU() {
  if (kw) return Qf;
  kw = 1;
  var e = ul();
  function t() {
    this.__data__ = new e(), this.size = 0;
  }
  return Qf = t, Qf;
}
var Jf, Mw;
function kU() {
  if (Mw) return Jf;
  Mw = 1;
  function e(t) {
    var r = this.__data__, n = r.delete(t);
    return this.size = r.size, n;
  }
  return Jf = e, Jf;
}
var ed, Nw;
function MU() {
  if (Nw) return ed;
  Nw = 1;
  function e(t) {
    return this.__data__.get(t);
  }
  return ed = e, ed;
}
var td, Rw;
function NU() {
  if (Rw) return td;
  Rw = 1;
  function e(t) {
    return this.__data__.has(t);
  }
  return td = e, td;
}
var rd, $w;
function RU() {
  if ($w) return rd;
  $w = 1;
  var e = ul(), t = Ay(), r = Oy(), n = 200;
  function i(a, o) {
    var u = this.__data__;
    if (u instanceof e) {
      var s = u.__data__;
      if (!t || s.length < n - 1)
        return s.push([a, o]), this.size = ++u.size, this;
      u = this.__data__ = new r(s);
    }
    return u.set(a, o), this.size = u.size, this;
  }
  return rd = i, rd;
}
var nd, Dw;
function By() {
  if (Dw) return nd;
  Dw = 1;
  var e = ul(), t = IU(), r = kU(), n = MU(), i = NU(), a = RU();
  function o(u) {
    var s = this.__data__ = new e(u);
    this.size = s.size;
  }
  return o.prototype.clear = t, o.prototype.delete = r, o.prototype.get = n, o.prototype.has = i, o.prototype.set = a, nd = o, nd;
}
var id, jw;
function oC() {
  if (jw) return id;
  jw = 1;
  var e = Jn(), t = (function() {
    try {
      var r = e(Object, "defineProperty");
      return r({}, "", {}), r;
    } catch {
    }
  })();
  return id = t, id;
}
var ad, Lw;
function Wy() {
  if (Lw) return ad;
  Lw = 1;
  var e = oC();
  function t(r, n, i) {
    n == "__proto__" && e ? e(r, n, {
      configurable: !0,
      enumerable: !0,
      value: i,
      writable: !0
    }) : r[n] = i;
  }
  return ad = t, ad;
}
var od, qw;
function uC() {
  if (qw) return od;
  qw = 1;
  var e = Wy(), t = po();
  function r(n, i, a) {
    (a !== void 0 && !t(n[i], a) || a === void 0 && !(i in n)) && e(n, i, a);
  }
  return od = r, od;
}
var ud, zw;
function $U() {
  if (zw) return ud;
  zw = 1;
  function e(t) {
    return function(r, n, i) {
      for (var a = -1, o = Object(r), u = i(r), s = u.length; s--; ) {
        var l = u[t ? s : ++a];
        if (n(o[l], l, o) === !1)
          break;
      }
      return r;
    };
  }
  return ud = e, ud;
}
var sd, Fw;
function DU() {
  if (Fw) return sd;
  Fw = 1;
  var e = $U(), t = e();
  return sd = t, sd;
}
var ya = { exports: {} };
ya.exports;
var Bw;
function sC() {
  return Bw || (Bw = 1, (function(e, t) {
    var r = vr(), n = t && !t.nodeType && t, i = n && !0 && e && !e.nodeType && e, a = i && i.exports === n, o = a ? r.Buffer : void 0, u = o ? o.allocUnsafe : void 0;
    function s(l, c) {
      if (c)
        return l.slice();
      var f = l.length, d = u ? u(f) : new l.constructor(f);
      return l.copy(d), d;
    }
    e.exports = s;
  })(ya, ya.exports)), ya.exports;
}
var ld, Ww;
function lC() {
  if (Ww) return ld;
  Ww = 1;
  var e = vr(), t = e.Uint8Array;
  return ld = t, ld;
}
var cd, Uw;
function Uy() {
  if (Uw) return cd;
  Uw = 1;
  var e = lC();
  function t(r) {
    var n = new r.constructor(r.byteLength);
    return new e(n).set(new e(r)), n;
  }
  return cd = t, cd;
}
var fd, Vw;
function cC() {
  if (Vw) return fd;
  Vw = 1;
  var e = Uy();
  function t(r, n) {
    var i = n ? e(r.buffer) : r.buffer;
    return new r.constructor(i, r.byteOffset, r.length);
  }
  return fd = t, fd;
}
var dd, Hw;
function fC() {
  if (Hw) return dd;
  Hw = 1;
  function e(t, r) {
    var n = -1, i = t.length;
    for (r || (r = Array(i)); ++n < i; )
      r[n] = t[n];
    return r;
  }
  return dd = e, dd;
}
var hd, Kw;
function jU() {
  if (Kw) return hd;
  Kw = 1;
  var e = $r(), t = Object.create, r = /* @__PURE__ */ (function() {
    function n() {
    }
    return function(i) {
      if (!e(i))
        return {};
      if (t)
        return t(i);
      n.prototype = i;
      var a = new n();
      return n.prototype = void 0, a;
    };
  })();
  return hd = r, hd;
}
var vd, Gw;
function dC() {
  if (Gw) return vd;
  Gw = 1;
  function e(t, r) {
    return function(n) {
      return t(r(n));
    };
  }
  return vd = e, vd;
}
var pd, Yw;
function Vy() {
  if (Yw) return pd;
  Yw = 1;
  var e = dC(), t = e(Object.getPrototypeOf, Object);
  return pd = t, pd;
}
var md, Xw;
function Hy() {
  if (Xw) return md;
  Xw = 1;
  var e = Object.prototype;
  function t(r) {
    var n = r && r.constructor, i = typeof n == "function" && n.prototype || e;
    return r === i;
  }
  return md = t, md;
}
var yd, Zw;
function hC() {
  if (Zw) return yd;
  Zw = 1;
  var e = jU(), t = Vy(), r = Hy();
  function n(i) {
    return typeof i.constructor == "function" && !r(i) ? e(t(i)) : {};
  }
  return yd = n, yd;
}
var gd, Qw;
function pr() {
  if (Qw) return gd;
  Qw = 1;
  function e(t) {
    return t != null && typeof t == "object";
  }
  return gd = e, gd;
}
var bd, Jw;
function LU() {
  if (Jw) return bd;
  Jw = 1;
  var e = Qn(), t = pr(), r = "[object Arguments]";
  function n(i) {
    return t(i) && e(i) == r;
  }
  return bd = n, bd;
}
var _d, ex;
function bl() {
  if (ex) return _d;
  ex = 1;
  var e = LU(), t = pr(), r = Object.prototype, n = r.hasOwnProperty, i = r.propertyIsEnumerable, a = e(/* @__PURE__ */ (function() {
    return arguments;
  })()) ? e : function(o) {
    return t(o) && n.call(o, "callee") && !i.call(o, "callee");
  };
  return _d = a, _d;
}
var wd, tx;
function Dt() {
  if (tx) return wd;
  tx = 1;
  var e = Array.isArray;
  return wd = e, wd;
}
var xd, rx;
function Ky() {
  if (rx) return xd;
  rx = 1;
  var e = 9007199254740991;
  function t(r) {
    return typeof r == "number" && r > -1 && r % 1 == 0 && r <= e;
  }
  return xd = t, xd;
}
var Ad, nx;
function _l() {
  if (nx) return Ad;
  nx = 1;
  var e = il(), t = Ky();
  function r(n) {
    return n != null && t(n.length) && !e(n);
  }
  return Ad = r, Ad;
}
var Od, ix;
function vC() {
  if (ix) return Od;
  ix = 1;
  var e = _l(), t = pr();
  function r(n) {
    return t(n) && e(n);
  }
  return Od = r, Od;
}
var ga = { exports: {} }, Sd, ax;
function qU() {
  if (ax) return Sd;
  ax = 1;
  function e() {
    return !1;
  }
  return Sd = e, Sd;
}
ga.exports;
var ox;
function wl() {
  return ox || (ox = 1, (function(e, t) {
    var r = vr(), n = qU(), i = t && !t.nodeType && t, a = i && !0 && e && !e.nodeType && e, o = a && a.exports === i, u = o ? r.Buffer : void 0, s = u ? u.isBuffer : void 0, l = s || n;
    e.exports = l;
  })(ga, ga.exports)), ga.exports;
}
var Ed, ux;
function pC() {
  if (ux) return Ed;
  ux = 1;
  var e = Qn(), t = Vy(), r = pr(), n = "[object Object]", i = Function.prototype, a = Object.prototype, o = i.toString, u = a.hasOwnProperty, s = o.call(Object);
  function l(c) {
    if (!r(c) || e(c) != n)
      return !1;
    var f = t(c);
    if (f === null)
      return !0;
    var d = u.call(f, "constructor") && f.constructor;
    return typeof d == "function" && d instanceof d && o.call(d) == s;
  }
  return Ed = l, Ed;
}
var Pd, sx;
function zU() {
  if (sx) return Pd;
  sx = 1;
  var e = Qn(), t = Ky(), r = pr(), n = "[object Arguments]", i = "[object Array]", a = "[object Boolean]", o = "[object Date]", u = "[object Error]", s = "[object Function]", l = "[object Map]", c = "[object Number]", f = "[object Object]", d = "[object RegExp]", h = "[object Set]", p = "[object String]", v = "[object WeakMap]", m = "[object ArrayBuffer]", y = "[object DataView]", b = "[object Float32Array]", g = "[object Float64Array]", _ = "[object Int8Array]", x = "[object Int16Array]", w = "[object Int32Array]", A = "[object Uint8Array]", P = "[object Uint8ClampedArray]", T = "[object Uint16Array]", C = "[object Uint32Array]", O = {};
  O[b] = O[g] = O[_] = O[x] = O[w] = O[A] = O[P] = O[T] = O[C] = !0, O[n] = O[i] = O[m] = O[a] = O[y] = O[o] = O[u] = O[s] = O[l] = O[c] = O[f] = O[d] = O[h] = O[p] = O[v] = !1;
  function D(j) {
    return r(j) && t(j.length) && !!O[e(j)];
  }
  return Pd = D, Pd;
}
var Td, lx;
function xl() {
  if (lx) return Td;
  lx = 1;
  function e(t) {
    return function(r) {
      return t(r);
    };
  }
  return Td = e, Td;
}
var ba = { exports: {} };
ba.exports;
var cx;
function Gy() {
  return cx || (cx = 1, (function(e, t) {
    var r = bT(), n = t && !t.nodeType && t, i = n && !0 && e && !e.nodeType && e, a = i && i.exports === n, o = a && r.process, u = (function() {
      try {
        var s = i && i.require && i.require("util").types;
        return s || o && o.binding && o.binding("util");
      } catch {
      }
    })();
    e.exports = u;
  })(ba, ba.exports)), ba.exports;
}
var Cd, fx;
function Yy() {
  if (fx) return Cd;
  fx = 1;
  var e = zU(), t = xl(), r = Gy(), n = r && r.isTypedArray, i = n ? t(n) : e;
  return Cd = i, Cd;
}
var Id, dx;
function mC() {
  if (dx) return Id;
  dx = 1;
  function e(t, r) {
    if (!(r === "constructor" && typeof t[r] == "function") && r != "__proto__")
      return t[r];
  }
  return Id = e, Id;
}
var kd, hx;
function Xy() {
  if (hx) return kd;
  hx = 1;
  var e = Wy(), t = po(), r = Object.prototype, n = r.hasOwnProperty;
  function i(a, o, u) {
    var s = a[o];
    (!(n.call(a, o) && t(s, u)) || u === void 0 && !(o in a)) && e(a, o, u);
  }
  return kd = i, kd;
}
var Md, vx;
function _o() {
  if (vx) return Md;
  vx = 1;
  var e = Xy(), t = Wy();
  function r(n, i, a, o) {
    var u = !a;
    a || (a = {});
    for (var s = -1, l = i.length; ++s < l; ) {
      var c = i[s], f = o ? o(a[c], n[c], c, a, n) : void 0;
      f === void 0 && (f = n[c]), u ? t(a, c, f) : e(a, c, f);
    }
    return a;
  }
  return Md = r, Md;
}
var Nd, px;
function FU() {
  if (px) return Nd;
  px = 1;
  function e(t, r) {
    for (var n = -1, i = Array(t); ++n < t; )
      i[n] = r(n);
    return i;
  }
  return Nd = e, Nd;
}
var Rd, mx;
function Al() {
  if (mx) return Rd;
  mx = 1;
  var e = 9007199254740991, t = /^(?:0|[1-9]\d*)$/;
  function r(n, i) {
    var a = typeof n;
    return i = i ?? e, !!i && (a == "number" || a != "symbol" && t.test(n)) && n > -1 && n % 1 == 0 && n < i;
  }
  return Rd = r, Rd;
}
var $d, yx;
function yC() {
  if (yx) return $d;
  yx = 1;
  var e = FU(), t = bl(), r = Dt(), n = wl(), i = Al(), a = Yy(), o = Object.prototype, u = o.hasOwnProperty;
  function s(l, c) {
    var f = r(l), d = !f && t(l), h = !f && !d && n(l), p = !f && !d && !h && a(l), v = f || d || h || p, m = v ? e(l.length, String) : [], y = m.length;
    for (var b in l)
      (c || u.call(l, b)) && !(v && // Safari 9 has enumerable `arguments.length` in strict mode.
      (b == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      h && (b == "offset" || b == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      p && (b == "buffer" || b == "byteLength" || b == "byteOffset") || // Skip index properties.
      i(b, y))) && m.push(b);
    return m;
  }
  return $d = s, $d;
}
var Dd, gx;
function BU() {
  if (gx) return Dd;
  gx = 1;
  function e(t) {
    var r = [];
    if (t != null)
      for (var n in Object(t))
        r.push(n);
    return r;
  }
  return Dd = e, Dd;
}
var jd, bx;
function WU() {
  if (bx) return jd;
  bx = 1;
  var e = $r(), t = Hy(), r = BU(), n = Object.prototype, i = n.hasOwnProperty;
  function a(o) {
    if (!e(o))
      return r(o);
    var u = t(o), s = [];
    for (var l in o)
      l == "constructor" && (u || !i.call(o, l)) || s.push(l);
    return s;
  }
  return jd = a, jd;
}
var Ld, _x;
function wo() {
  if (_x) return Ld;
  _x = 1;
  var e = yC(), t = WU(), r = _l();
  function n(i) {
    return r(i) ? e(i, !0) : t(i);
  }
  return Ld = n, Ld;
}
var qd, wx;
function UU() {
  if (wx) return qd;
  wx = 1;
  var e = _o(), t = wo();
  function r(n) {
    return e(n, t(n));
  }
  return qd = r, qd;
}
var zd, xx;
function VU() {
  if (xx) return zd;
  xx = 1;
  var e = uC(), t = sC(), r = cC(), n = fC(), i = hC(), a = bl(), o = Dt(), u = vC(), s = wl(), l = il(), c = $r(), f = pC(), d = Yy(), h = mC(), p = UU();
  function v(m, y, b, g, _, x, w) {
    var A = h(m, b), P = h(y, b), T = w.get(P);
    if (T) {
      e(m, b, T);
      return;
    }
    var C = x ? x(A, P, b + "", m, y, w) : void 0, O = C === void 0;
    if (O) {
      var D = o(P), j = !D && s(P), z = !D && !j && d(P);
      C = P, D || j || z ? o(A) ? C = A : u(A) ? C = n(A) : j ? (O = !1, C = t(P, !0)) : z ? (O = !1, C = r(P, !0)) : C = [] : f(P) || a(P) ? (C = A, a(A) ? C = p(A) : (!c(A) || l(A)) && (C = i(P))) : O = !1;
    }
    O && (w.set(P, C), _(C, P, g, x, w), w.delete(P)), e(m, b, C);
  }
  return zd = v, zd;
}
var Fd, Ax;
function HU() {
  if (Ax) return Fd;
  Ax = 1;
  var e = By(), t = uC(), r = DU(), n = VU(), i = $r(), a = wo(), o = mC();
  function u(s, l, c, f, d) {
    s !== l && r(l, function(h, p) {
      if (d || (d = new e()), i(h))
        n(s, l, p, c, u, f, d);
      else {
        var v = f ? f(o(s, p), h, p + "", s, l, d) : void 0;
        v === void 0 && (v = h), t(s, p, v);
      }
    }, a);
  }
  return Fd = u, Fd;
}
var Bd, Ox;
function gC() {
  if (Ox) return Bd;
  Ox = 1;
  function e(t) {
    return t;
  }
  return Bd = e, Bd;
}
var Wd, Sx;
function KU() {
  if (Sx) return Wd;
  Sx = 1;
  function e(t, r, n) {
    switch (n.length) {
      case 0:
        return t.call(r);
      case 1:
        return t.call(r, n[0]);
      case 2:
        return t.call(r, n[0], n[1]);
      case 3:
        return t.call(r, n[0], n[1], n[2]);
    }
    return t.apply(r, n);
  }
  return Wd = e, Wd;
}
var Ud, Ex;
function bC() {
  if (Ex) return Ud;
  Ex = 1;
  var e = KU(), t = Math.max;
  function r(n, i, a) {
    return i = t(i === void 0 ? n.length - 1 : i, 0), function() {
      for (var o = arguments, u = -1, s = t(o.length - i, 0), l = Array(s); ++u < s; )
        l[u] = o[i + u];
      u = -1;
      for (var c = Array(i + 1); ++u < i; )
        c[u] = o[u];
      return c[i] = a(l), e(n, this, c);
    };
  }
  return Ud = r, Ud;
}
var Vd, Px;
function GU() {
  if (Px) return Vd;
  Px = 1;
  function e(t) {
    return function() {
      return t;
    };
  }
  return Vd = e, Vd;
}
var Hd, Tx;
function YU() {
  if (Tx) return Hd;
  Tx = 1;
  var e = GU(), t = oC(), r = gC(), n = t ? function(i, a) {
    return t(i, "toString", {
      configurable: !0,
      enumerable: !1,
      value: e(a),
      writable: !0
    });
  } : r;
  return Hd = n, Hd;
}
var Kd, Cx;
function XU() {
  if (Cx) return Kd;
  Cx = 1;
  var e = 800, t = 16, r = Date.now;
  function n(i) {
    var a = 0, o = 0;
    return function() {
      var u = r(), s = t - (u - o);
      if (o = u, s > 0) {
        if (++a >= e)
          return arguments[0];
      } else
        a = 0;
      return i.apply(void 0, arguments);
    };
  }
  return Kd = n, Kd;
}
var Gd, Ix;
function _C() {
  if (Ix) return Gd;
  Ix = 1;
  var e = YU(), t = XU(), r = t(e);
  return Gd = r, Gd;
}
var Yd, kx;
function wC() {
  if (kx) return Yd;
  kx = 1;
  var e = gC(), t = bC(), r = _C();
  function n(i, a) {
    return r(t(i, a, e), i + "");
  }
  return Yd = n, Yd;
}
var Xd, Mx;
function ZU() {
  if (Mx) return Xd;
  Mx = 1;
  var e = po(), t = _l(), r = Al(), n = $r();
  function i(a, o, u) {
    if (!n(u))
      return !1;
    var s = typeof o;
    return (s == "number" ? t(u) && r(o, u.length) : s == "string" && o in u) ? e(u[o], a) : !1;
  }
  return Xd = i, Xd;
}
var Zd, Nx;
function QU() {
  if (Nx) return Zd;
  Nx = 1;
  var e = wC(), t = ZU();
  function r(n) {
    return e(function(i, a) {
      var o = -1, u = a.length, s = u > 1 ? a[u - 1] : void 0, l = u > 2 ? a[2] : void 0;
      for (s = n.length > 3 && typeof s == "function" ? (u--, s) : void 0, l && t(a[0], a[1], l) && (s = u < 3 ? void 0 : s, u = 1), i = Object(i); ++o < u; ) {
        var c = a[o];
        c && n(i, c, o, s);
      }
      return i;
    });
  }
  return Zd = r, Zd;
}
var Qd, Rx;
function JU() {
  if (Rx) return Qd;
  Rx = 1;
  var e = HU(), t = QU(), r = t(function(n, i, a) {
    e(n, i, a);
  });
  return Qd = r, Qd;
}
var eV = JU();
const tV = /* @__PURE__ */ Ht(eV);
var Jd, $x;
function Zy() {
  if ($x) return Jd;
  $x = 1;
  var e = Qn(), t = pr(), r = "[object Symbol]";
  function n(i) {
    return typeof i == "symbol" || t(i) && e(i) == r;
  }
  return Jd = n, Jd;
}
var eh, Dx;
function rV() {
  if (Dx) return eh;
  Dx = 1;
  var e = Dt(), t = Zy(), r = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, n = /^\w*$/;
  function i(a, o) {
    if (e(a))
      return !1;
    var u = typeof a;
    return u == "number" || u == "symbol" || u == "boolean" || a == null || t(a) ? !0 : n.test(a) || !r.test(a) || o != null && a in Object(o);
  }
  return eh = i, eh;
}
var th, jx;
function nV() {
  if (jx) return th;
  jx = 1;
  var e = Oy(), t = "Expected a function";
  function r(n, i) {
    if (typeof n != "function" || i != null && typeof i != "function")
      throw new TypeError(t);
    var a = function() {
      var o = arguments, u = i ? i.apply(this, o) : o[0], s = a.cache;
      if (s.has(u))
        return s.get(u);
      var l = n.apply(this, o);
      return a.cache = s.set(u, l) || s, l;
    };
    return a.cache = new (r.Cache || e)(), a;
  }
  return r.Cache = e, th = r, th;
}
var rh, Lx;
function iV() {
  if (Lx) return rh;
  Lx = 1;
  var e = nV(), t = 500;
  function r(n) {
    var i = e(n, function(o) {
      return a.size === t && a.clear(), o;
    }), a = i.cache;
    return i;
  }
  return rh = r, rh;
}
var nh, qx;
function aV() {
  if (qx) return nh;
  qx = 1;
  var e = iV(), t = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, r = /\\(\\)?/g, n = e(function(i) {
    var a = [];
    return i.charCodeAt(0) === 46 && a.push(""), i.replace(t, function(o, u, s, l) {
      a.push(s ? l.replace(r, "$1") : u || o);
    }), a;
  });
  return nh = n, nh;
}
var ih, zx;
function xC() {
  if (zx) return ih;
  zx = 1;
  function e(t, r) {
    for (var n = -1, i = t == null ? 0 : t.length, a = Array(i); ++n < i; )
      a[n] = r(t[n], n, t);
    return a;
  }
  return ih = e, ih;
}
var ah, Fx;
function oV() {
  if (Fx) return ah;
  Fx = 1;
  var e = Hi(), t = xC(), r = Dt(), n = Zy(), i = e ? e.prototype : void 0, a = i ? i.toString : void 0;
  function o(u) {
    if (typeof u == "string")
      return u;
    if (r(u))
      return t(u, o) + "";
    if (n(u))
      return a ? a.call(u) : "";
    var s = u + "";
    return s == "0" && 1 / u == -1 / 0 ? "-0" : s;
  }
  return ah = o, ah;
}
var oh, Bx;
function uV() {
  if (Bx) return oh;
  Bx = 1;
  var e = oV();
  function t(r) {
    return r == null ? "" : e(r);
  }
  return oh = t, oh;
}
var uh, Wx;
function Ol() {
  if (Wx) return uh;
  Wx = 1;
  var e = Dt(), t = rV(), r = aV(), n = uV();
  function i(a, o) {
    return e(a) ? a : t(a, o) ? [a] : r(n(a));
  }
  return uh = i, uh;
}
var sh, Ux;
function Qy() {
  if (Ux) return sh;
  Ux = 1;
  var e = Zy();
  function t(r) {
    if (typeof r == "string" || e(r))
      return r;
    var n = r + "";
    return n == "0" && 1 / r == -1 / 0 ? "-0" : n;
  }
  return sh = t, sh;
}
var lh, Vx;
function AC() {
  if (Vx) return lh;
  Vx = 1;
  var e = Ol(), t = Qy();
  function r(n, i) {
    i = e(i, n);
    for (var a = 0, o = i.length; n != null && a < o; )
      n = n[t(i[a++])];
    return a && a == o ? n : void 0;
  }
  return lh = r, lh;
}
var ch, Hx;
function sV() {
  if (Hx) return ch;
  Hx = 1;
  var e = AC();
  function t(r, n, i) {
    var a = r == null ? void 0 : e(r, n);
    return a === void 0 ? i : a;
  }
  return ch = t, ch;
}
var lV = sV();
const Ni = /* @__PURE__ */ Ht(lV);
var fh, Kx;
function OC() {
  if (Kx) return fh;
  Kx = 1;
  var e = Xy(), t = Ol(), r = Al(), n = $r(), i = Qy();
  function a(o, u, s, l) {
    if (!n(o))
      return o;
    u = t(u, o);
    for (var c = -1, f = u.length, d = f - 1, h = o; h != null && ++c < f; ) {
      var p = i(u[c]), v = s;
      if (p === "__proto__" || p === "constructor" || p === "prototype")
        return o;
      if (c != d) {
        var m = h[p];
        v = l ? l(m, p, h) : void 0, v === void 0 && (v = n(m) ? m : r(u[c + 1]) ? [] : {});
      }
      e(h, p, v), h = h[p];
    }
    return o;
  }
  return fh = a, fh;
}
var dh, Gx;
function cV() {
  if (Gx) return dh;
  Gx = 1;
  var e = OC();
  function t(r, n, i) {
    return r == null ? r : e(r, n, i);
  }
  return dh = t, dh;
}
var fV = cV();
const dV = /* @__PURE__ */ Ht(fV);
function pp() {
  return pp = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, pp.apply(null, arguments);
}
function hV(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var vV = ["outlineWidth", "outlineColor", "outlineOpacity"], pV = function(e) {
  return e.outlineWidth, e.outlineColor, e.outlineOpacity, hV(e, vV);
}, mV = ["axis.ticks.text", "axis.legend.text", "legends.title.text", "legends.text", "legends.ticks.text", "legends.title.text", "labels.text", "dots.text", "markers.text", "annotations.text"], yV = function(e, t) {
  return pp({}, t, e);
}, gV = function(e, t) {
  var r = tV({}, e, t);
  return mV.forEach((function(n) {
    dV(r, n, yV(Ni(r, n), r.text));
  })), r;
}, bV = { background: "transparent", text: { fontFamily: "sans-serif", fontSize: 11, fill: "#333333", outlineWidth: 0, outlineColor: "#ffffff", outlineOpacity: 1 }, axis: { domain: { line: { stroke: "transparent", strokeWidth: 1 } }, ticks: { line: { stroke: "#777777", strokeWidth: 1 }, text: {} }, legend: { text: { fontSize: 12 } } }, grid: { line: { stroke: "#dddddd", strokeWidth: 1 } }, legends: { hidden: { symbol: { fill: "#333333", opacity: 0.6 }, text: { fill: "#333333", opacity: 0.6 } }, text: {}, ticks: { line: { stroke: "#777777", strokeWidth: 1 }, text: { fontSize: 10 } }, title: { text: {} } }, labels: { text: {} }, markers: { lineColor: "#000000", lineStrokeWidth: 1, text: {} }, dots: { text: {} }, tooltip: { container: { background: "white", color: "inherit", fontSize: "inherit", borderRadius: "2px", boxShadow: "0 1px 2px rgba(0, 0, 0, 0.25)", padding: "5px 9px" }, basic: { whiteSpace: "pre", display: "flex", alignItems: "center" }, chip: { marginRight: 7 }, table: {}, tableCell: { padding: "3px 5px" }, tableCellValue: { fontWeight: "bold" } }, crosshair: { line: { stroke: "#000000", strokeWidth: 1, strokeOpacity: 0.75, strokeDasharray: "6 6" } }, annotations: { text: { fontSize: 13, outlineWidth: 2, outlineColor: "#ffffff", outlineOpacity: 1 }, link: { stroke: "#000000", strokeWidth: 1, outlineWidth: 2, outlineColor: "#ffffff", outlineOpacity: 1 }, outline: { fill: "none", stroke: "#000000", strokeWidth: 2, outlineWidth: 2, outlineColor: "#ffffff", outlineOpacity: 1 }, symbol: { fill: "#000000", outlineWidth: 2, outlineColor: "#ffffff", outlineOpacity: 1 } } }, _V = function(e) {
  return ue((function() {
    return gV(bV, e);
  }), [e]);
}, SC = et(null), wV = {}, xV = function(e) {
  var t = e.theme, r = t === void 0 ? wV : t, n = e.children, i = _V(r);
  return $(SC.Provider, { value: i, children: n });
}, mr = function() {
  var e = at(SC);
  if (e === null) throw new Error("Unable to find the theme, did you forget to wrap your component with ThemeProvider?");
  return e;
};
function Wn() {
  return Wn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Wn.apply(null, arguments);
}
var AV = ["basic", "chip", "container", "table", "tableCell", "tableCellValue"], OV = { pointerEvents: "none", position: "absolute", zIndex: 10, top: 0, left: 0 }, Yx = function(e, t) {
  return "translate(" + e + "px, " + t + "px)";
}, EC = tt((function(e) {
  var t, r = e.position, n = e.anchor, i = e.children, a = mr(), o = ti(), u = o.animate, s = o.config, l = GK(), c = l[0], f = l[1], d = J(!1), h = void 0, p = !1, v = f.width > 0 && f.height > 0, m = Math.round(r[0]), y = Math.round(r[1]);
  v && (n === "top" ? (m -= f.width / 2, y -= f.height + 14) : n === "right" ? (m += 14, y -= f.height / 2) : n === "bottom" ? (m -= f.width / 2, y += 14) : n === "left" ? (m -= f.width + 14, y -= f.height / 2) : n === "center" && (m -= f.width / 2, y -= f.height / 2), h = { transform: Yx(m, y) }, d.current || (p = !0), d.current = [m, y]);
  var b = Ki({ to: h, config: s, immediate: !u || p }), g = a.tooltip;
  g.basic, g.chip, g.container, g.table, g.tableCell, g.tableCellValue;
  var _ = (function(w, A) {
    if (w == null) return {};
    var P = {};
    for (var T in w) if ({}.hasOwnProperty.call(w, T)) {
      if (A.indexOf(T) !== -1) continue;
      P[T] = w[T];
    }
    return P;
  })(g, AV), x = Wn({}, OV, _, { transform: (t = b.transform) != null ? t : Yx(m, y), opacity: b.transform ? 1 : 0 });
  return $(aC.div, { ref: c, style: x, children: i });
}));
EC.displayName = "TooltipWrapper";
var mp = tt((function(e) {
  var t = e.size, r = t === void 0 ? 12 : t, n = e.color, i = e.style;
  return $("span", { style: Wn({ display: "block", width: r, height: r, background: n }, i === void 0 ? {} : i) });
})), Xx = tt((function(e) {
  var t, r = e.id, n = e.value, i = e.format, a = e.enableChip, o = a !== void 0 && a, u = e.color, s = e.renderContent, l = mr(), c = zC(i);
  if (typeof s == "function") t = s();
  else {
    var f = n;
    c !== void 0 && f !== void 0 && (f = c(f)), t = Y("div", { style: l.tooltip.basic, children: [o && $(mp, { color: u, style: l.tooltip.chip }), f !== void 0 ? Y("span", { children: [r, ": ", $("strong", { children: "" + f })] }) : r] });
  }
  return $("div", { style: l.tooltip.container, role: "tooltip", children: t });
})), SV = { width: "100%", borderCollapse: "collapse" }, EV = tt((function(e) {
  var t, r = e.title, n = e.rows, i = n === void 0 ? [] : n, a = e.renderContent, o = mr();
  return i.length ? (t = typeof a == "function" ? a() : Y("div", { children: [r && r, $("table", { style: Wn({}, SV, o.tooltip.table), children: $("tbody", { children: i.map((function(u, s) {
    return $("tr", { children: u.map((function(l, c) {
      return $("td", { style: o.tooltip.tableCell, children: l }, c);
    })) }, s);
  })) }) })] }), $("div", { style: o.tooltip.container, children: t })) : null;
}));
EV.displayName = "TableTooltip";
var yp = tt((function(e) {
  var t = e.x0, r = e.x1, n = e.y0, i = e.y1, a = mr(), o = ti(), u = o.animate, s = o.config, l = ue((function() {
    return Wn({}, a.crosshair.line, { pointerEvents: "none" });
  }), [a.crosshair.line]), c = Ki({ x1: t, x2: r, y1: n, y2: i, config: s, immediate: !u });
  return $(aC.line, Wn({}, c, { fill: "none", style: l }));
}));
yp.displayName = "CrosshairLine";
var PV = tt((function(e) {
  var t, r, n = e.width, i = e.height, a = e.type, o = e.x, u = e.y;
  return a === "cross" ? (t = { x0: o, x1: o, y0: 0, y1: i }, r = { x0: 0, x1: n, y0: u, y1: u }) : a === "top-left" ? (t = { x0: o, x1: o, y0: 0, y1: u }, r = { x0: 0, x1: o, y0: u, y1: u }) : a === "top" ? t = { x0: o, x1: o, y0: 0, y1: u } : a === "top-right" ? (t = { x0: o, x1: o, y0: 0, y1: u }, r = { x0: o, x1: n, y0: u, y1: u }) : a === "right" ? r = { x0: o, x1: n, y0: u, y1: u } : a === "bottom-right" ? (t = { x0: o, x1: o, y0: u, y1: i }, r = { x0: o, x1: n, y0: u, y1: u }) : a === "bottom" ? t = { x0: o, x1: o, y0: u, y1: i } : a === "bottom-left" ? (t = { x0: o, x1: o, y0: u, y1: i }, r = { x0: 0, x1: o, y0: u, y1: u }) : a === "left" ? r = { x0: 0, x1: o, y0: u, y1: u } : a === "x" ? t = { x0: o, x1: o, y0: 0, y1: i } : a === "y" && (r = { x0: 0, x1: n, y0: u, y1: u }), Y(Hn, { children: [t && $(yp, { x0: t.x0, x1: t.x1, y0: t.y0, y1: t.y1 }), r && $(yp, { x0: r.x0, x1: r.x1, y0: r.y0, y1: r.y1 })] });
}));
PV.displayName = "Crosshair";
var PC = et({ showTooltipAt: function() {
}, showTooltipFromEvent: function() {
}, hideTooltip: function() {
} }), gp = { isVisible: !1, position: [null, null], content: null, anchor: null }, TC = et(gp), TV = function(e) {
  var t = be(gp), r = t[0], n = t[1], i = re((function(u, s, l) {
    var c = s[0], f = s[1];
    l === void 0 && (l = "top"), n({ isVisible: !0, position: [c, f], anchor: l, content: u });
  }), [n]), a = re((function(u, s, l) {
    l === void 0 && (l = "top");
    var c = e.current.getBoundingClientRect(), f = e.current.offsetWidth, d = f === c.width ? 1 : f / c.width, h = "touches" in s ? s.touches[0] : s, p = h.clientX, v = h.clientY, m = (p - c.left) * d, y = (v - c.top) * d;
    l !== "left" && l !== "right" || (l = m < c.width / 2 ? "right" : "left"), n({ isVisible: !0, position: [m, y], anchor: l, content: u });
  }), [e, n]), o = re((function() {
    n(gp);
  }), [n]);
  return { actions: ue((function() {
    return { showTooltipAt: i, showTooltipFromEvent: a, hideTooltip: o };
  }), [i, a, o]), state: r };
}, CC = function() {
  var e = at(PC);
  if (e === void 0) throw new Error("useTooltip must be used within a TooltipProvider");
  return e;
}, CV = function() {
  var e = at(TC);
  if (e === void 0) throw new Error("useTooltipState must be used within a TooltipProvider");
  return e;
}, IV = function(e) {
  return e.isVisible;
}, kV = function() {
  var e = CV();
  return IV(e) ? $(EC, { position: e.position, anchor: e.anchor, children: e.content }) : null;
}, MV = function(e) {
  var t = e.container, r = e.children, n = TV(t), i = n.actions, a = n.state;
  return $(PC.Provider, { value: i, children: $(TC.Provider, { value: a, children: r }) });
}, hh, Zx;
function NV() {
  if (Zx) return hh;
  Zx = 1;
  var e = Qn(), t = Dt(), r = pr(), n = "[object String]";
  function i(a) {
    return typeof a == "string" || !t(a) && r(a) && e(a) == n;
  }
  return hh = i, hh;
}
var RV = NV();
const $V = /* @__PURE__ */ Ht(RV), IC = /^--/;
function DV(e, t) {
  return t == null || typeof t == "boolean" || t === "" ? "" : typeof t == "number" && t !== 0 && !IC.test(e) && !(Pa.hasOwnProperty(e) && Pa[e]) ? t + "px" : ("" + t).trim();
}
const Qx = {};
function jV(e, t) {
  if (!e.nodeType || !e.setAttribute || !e.removeAttribute) return !1;
  const r = e.nodeName === "filter" || e.parentNode && e.parentNode.nodeName === "filter", { className: n, style: i, children: a, scrollTop: o, scrollLeft: u, viewBox: s, ...l } = t, c = Object.values(l), f = Object.keys(l).map((d) => r || e.hasAttribute(d) ? d : Qx[d] || (Qx[d] = d.replace(/([A-Z])/g, (h) => "-" + h.toLowerCase())));
  t.hasOwnProperty("children") && (e.textContent = a);
  for (const d in i) if (i.hasOwnProperty(d)) {
    const h = DV(d, i[d]);
    IC.test(d) ? e.style.setProperty(d, h) : e.style[d] = h;
  }
  f.forEach((d, h) => {
    const p = c[h];
    p !== void 0 ? e.setAttribute(d, p) : e.removeAttribute(d);
  }), t.hasOwnProperty("className") && (n !== void 0 ? e.className = n : e.removeAttribute("class")), o !== void 0 && (e.scrollTop = o), u !== void 0 && (e.scrollLeft = u), t.hasOwnProperty("viewBox") && (s !== void 0 ? e.setAttribute("viewBox", s) : e.removeAttribute("viewBox"));
}
let Pa = {
  animationIterationCount: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
};
const LV = (e, t) => e + t.charAt(0).toUpperCase() + t.substring(1), qV = [
  "Webkit",
  "Ms",
  "Moz",
  "O"
];
Pa = Object.keys(Pa).reduce((e, t) => (qV.forEach((r) => e[LV(r, t)] = e[t]), e), Pa);
const zV = /^(matrix3d|matrix|translate3d|translate[XYZ]?|scale3d|scale[XYZ]?|rotate3d|rotate[XYZ]?|skew[XY]?)$/, FV = /^(translate)/, BV = /^(rotate|skew)/, vh = (e, t) => L.num(e) && e !== 0 ? e + t : e, ou = (e, t) => L.arr(e) ? e.every((r) => ou(r, t)) : L.num(e) ? e === t : parseFloat(e) === t;
var WV = class extends ei {
  constructor({ x: t, y: r, z: n, ...i }) {
    const a = [], o = [];
    (t || r || n) && (a.push([
      t || 0,
      r || 0,
      n || 0
    ]), o.push((u) => [`translate3d(${u.map((s) => vh(s, "px")).join(",")})`, ou(u, 0)])), bt(i, (u, s) => {
      if (s === "transform")
        a.push([u || ""]), o.push((l) => [l, l === ""]);
      else if (zV.test(s)) {
        if (delete i[s], L.und(u)) return;
        const l = FV.test(s) ? "px" : BV.test(s) ? "deg" : "";
        a.push(nt(u)), o.push(s === "rotate3d" ? ([c, f, d, h]) => [`rotate3d(${c},${f},${d},${vh(h, l)})`, ou(h, 0)] : (c) => [`${s}(${c.map((f) => vh(f, l)).join(",")})`, ou(c, s.startsWith("scale") ? 1 : 0)]);
      }
    }), a.length && (i.transform = new UV(a, o)), super(i);
  }
}, UV = class extends go {
  constructor(t, r) {
    super(), this.inputs = t, this.transforms = r, this._value = null;
  }
  get() {
    return this._value || (this._value = this._get());
  }
  _get() {
    let t = "", r = !0;
    return X(this.inputs, (n, i) => {
      const a = je(n[0]), [o, u] = this.transforms[i](L.arr(a) ? a : n.map(je));
      t += " " + o, r = r && u;
    }), r ? "none" : t;
  }
  observerAdded(t) {
    t == 1 && X(this.inputs, (r) => X(r, (n) => He(n) && Dr(n, this)));
  }
  observerRemoved(t) {
    t == 0 && X(this.inputs, (r) => X(r, (n) => He(n) && tn(n, this)));
  }
  eventObserved(t) {
    t.type == "change" && (this._value = null), en(this, t);
  }
};
const VV = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
Nt.assign({
  batchedUpdates: cs,
  createStringInterpolator: bo,
  colors: fl
});
const HV = yl(VV, {
  applyAnimatedValues: jV,
  createAnimatedStyle: (e) => new WV(e),
  getComponentProps: ({ scrollTop: e, scrollLeft: t, ...r }) => r
}), KV = HV.animated;
let It;
typeof window < "u" ? It = window : typeof self < "u" ? It = self : It = global;
let bp = null, _p = null;
const Jx = 20, ph = It.clearTimeout, e2 = It.setTimeout, mh = It.cancelAnimationFrame || It.mozCancelAnimationFrame || It.webkitCancelAnimationFrame, t2 = It.requestAnimationFrame || It.mozRequestAnimationFrame || It.webkitRequestAnimationFrame;
mh == null || t2 == null ? (bp = ph, _p = function(t) {
  return e2(t, Jx);
}) : (bp = function([t, r]) {
  mh(t), ph(r);
}, _p = function(t) {
  const r = t2(function() {
    ph(n), t();
  }), n = e2(function() {
    mh(r), t();
  }, Jx);
  return [r, n];
});
function GV(e) {
  let t, r, n, i, a, o, u;
  const s = typeof document < "u" && document.attachEvent;
  if (!s) {
    o = function(y) {
      const b = y.__resizeTriggers__, g = b.firstElementChild, _ = b.lastElementChild, x = g.firstElementChild;
      _.scrollLeft = _.scrollWidth, _.scrollTop = _.scrollHeight, x.style.width = g.offsetWidth + 1 + "px", x.style.height = g.offsetHeight + 1 + "px", g.scrollLeft = g.scrollWidth, g.scrollTop = g.scrollHeight;
    }, a = function(y) {
      return y.offsetWidth !== y.__resizeLast__.width || y.offsetHeight !== y.__resizeLast__.height;
    }, u = function(y) {
      if (y.target.className && typeof y.target.className.indexOf == "function" && y.target.className.indexOf("contract-trigger") < 0 && y.target.className.indexOf("expand-trigger") < 0)
        return;
      const b = this;
      o(this), this.__resizeRAF__ && bp(this.__resizeRAF__), this.__resizeRAF__ = _p(function() {
        a(b) && (b.__resizeLast__.width = b.offsetWidth, b.__resizeLast__.height = b.offsetHeight, b.__resizeListeners__.forEach(function(x) {
          x.call(b, y);
        }));
      });
    };
    let d = !1, h = "";
    n = "animationstart";
    const p = "Webkit Moz O ms".split(" ");
    let v = "webkitAnimationStart animationstart oAnimationStart MSAnimationStart".split(" "), m = "";
    {
      const y = document.createElement("fakeelement");
      if (y.style.animationName !== void 0 && (d = !0), d === !1) {
        for (let b = 0; b < p.length; b++)
          if (y.style[p[b] + "AnimationName"] !== void 0) {
            m = p[b], h = "-" + m.toLowerCase() + "-", n = v[b], d = !0;
            break;
          }
      }
    }
    r = "resizeanim", t = "@" + h + "keyframes " + r + " { from { opacity: 0; } to { opacity: 0; } } ", i = h + "animation: 1ms " + r + "; ";
  }
  const l = function(d) {
    if (!d.getElementById("detectElementResize")) {
      const h = (t || "") + ".resize-triggers { " + (i || "") + 'visibility: hidden; opacity: 0; } .resize-triggers, .resize-triggers > div, .contract-trigger:before { content: " "; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; z-index: -1; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }', p = d.head || d.getElementsByTagName("head")[0], v = d.createElement("style");
      v.id = "detectElementResize", v.type = "text/css", e != null && v.setAttribute("nonce", e), v.styleSheet ? v.styleSheet.cssText = h : v.appendChild(d.createTextNode(h)), p.appendChild(v);
    }
  };
  return {
    addResizeListener: function(d, h) {
      if (s)
        d.attachEvent("onresize", h);
      else {
        if (!d.__resizeTriggers__) {
          const p = d.ownerDocument, v = It.getComputedStyle(d);
          v && v.position === "static" && (d.style.position = "relative"), l(p), d.__resizeLast__ = {}, d.__resizeListeners__ = [], (d.__resizeTriggers__ = p.createElement("div")).className = "resize-triggers";
          const m = p.createElement("div");
          m.className = "expand-trigger", m.appendChild(p.createElement("div"));
          const y = p.createElement("div");
          y.className = "contract-trigger", d.__resizeTriggers__.appendChild(m), d.__resizeTriggers__.appendChild(y), d.appendChild(d.__resizeTriggers__), o(d), d.addEventListener("scroll", u, !0), n && (d.__resizeTriggers__.__animationListener__ = function(g) {
            g.animationName === r && o(d);
          }, d.__resizeTriggers__.addEventListener(n, d.__resizeTriggers__.__animationListener__));
        }
        d.__resizeListeners__.push(h);
      }
    },
    removeResizeListener: function(d, h) {
      if (s)
        d.detachEvent("onresize", h);
      else if (d.__resizeListeners__.splice(d.__resizeListeners__.indexOf(h), 1), !d.__resizeListeners__.length) {
        d.removeEventListener("scroll", u, !0), d.__resizeTriggers__.__animationListener__ && (d.__resizeTriggers__.removeEventListener(n, d.__resizeTriggers__.__animationListener__), d.__resizeTriggers__.__animationListener__ = null);
        try {
          d.__resizeTriggers__ = !d.removeChild(d.__resizeTriggers__);
        } catch {
        }
      }
    }
  };
}
class YV extends pI {
  constructor(...t) {
    super(...t), this.state = {
      height: this.props.defaultHeight || 0,
      width: this.props.defaultWidth || 0
    }, this._autoSizer = null, this._detectElementResize = null, this._didLogDeprecationWarning = !1, this._parentNode = null, this._resizeObserver = null, this._timeoutId = null, this._onResize = () => {
      this._timeoutId = null;
      const {
        disableHeight: r,
        disableWidth: n,
        onResize: i
      } = this.props;
      if (this._parentNode) {
        const a = window.getComputedStyle(this._parentNode) || {}, o = parseFloat(a.paddingLeft || "0"), u = parseFloat(a.paddingRight || "0"), s = parseFloat(a.paddingTop || "0"), l = parseFloat(a.paddingBottom || "0"), c = this._parentNode.getBoundingClientRect(), f = c.height - s - l, d = c.width - o - u;
        if (!r && this.state.height !== f || !n && this.state.width !== d) {
          this.setState({
            height: f,
            width: d
          });
          const h = () => {
            this._didLogDeprecationWarning || (this._didLogDeprecationWarning = !0, console.warn("scaledWidth and scaledHeight parameters have been deprecated; use width and height instead"));
          };
          typeof i == "function" && i({
            height: f,
            width: d,
            // TODO Remove these params in the next major release
            get scaledHeight() {
              return h(), f;
            },
            get scaledWidth() {
              return h(), d;
            }
          });
        }
      }
    }, this._setRef = (r) => {
      this._autoSizer = r;
    };
  }
  componentDidMount() {
    const {
      nonce: t
    } = this.props, r = this._autoSizer ? this._autoSizer.parentNode : null;
    if (r != null && r.ownerDocument && r.ownerDocument.defaultView && r instanceof r.ownerDocument.defaultView.HTMLElement) {
      this._parentNode = r;
      const n = r.ownerDocument.defaultView.ResizeObserver;
      n != null ? (this._resizeObserver = new n(() => {
        this._timeoutId = setTimeout(this._onResize, 0);
      }), this._resizeObserver.observe(r)) : (this._detectElementResize = GV(t), this._detectElementResize.addResizeListener(r, this._onResize)), this._onResize();
    }
  }
  componentWillUnmount() {
    this._parentNode && (this._detectElementResize && this._detectElementResize.removeResizeListener(this._parentNode, this._onResize), this._timeoutId !== null && clearTimeout(this._timeoutId), this._resizeObserver && this._resizeObserver.disconnect());
  }
  render() {
    const {
      children: t,
      defaultHeight: r,
      defaultWidth: n,
      disableHeight: i = !1,
      disableWidth: a = !1,
      doNotBailOutOnEmptyChildren: o = !1,
      nonce: u,
      onResize: s,
      style: l = {},
      tagName: c = "div",
      ...f
    } = this.props, {
      height: d,
      width: h
    } = this.state, p = {
      overflow: "visible"
    }, v = {};
    let m = !1;
    return i || (d === 0 && (m = !0), p.height = 0, v.height = d, v.scaledHeight = d), a || (h === 0 && (m = !0), p.width = 0, v.width = h, v.scaledWidth = h), o && (m = !1), ur(c, {
      ref: this._setRef,
      style: {
        ...p,
        ...l
      },
      ...f
    }, !m && t(v));
  }
}
function XV(e, t, r, n) {
  var i = this, a = J(null), o = J(0), u = J(0), s = J(null), l = J([]), c = J(), f = J(), d = J(e), h = J(!0), p = J(), v = J();
  d.current = e;
  var m = typeof window < "u", y = !t && t !== 0 && m;
  if (typeof e != "function") throw new TypeError("Expected a function");
  t = +t || 0;
  var b = !!(r = r || {}).leading, g = !("trailing" in r) || !!r.trailing, _ = !!r.flushOnExit && g, x = "maxWait" in r, w = "debounceOnServer" in r && !!r.debounceOnServer, A = x ? Math.max(+r.maxWait || 0, t) : null, P = ue(function() {
    var T = function(M) {
      var N = l.current, k = c.current;
      return l.current = c.current = null, o.current = M, u.current = u.current || M, f.current = d.current.apply(k, N);
    }, C = function(M, N) {
      y && cancelAnimationFrame(s.current), s.current = y ? requestAnimationFrame(M) : setTimeout(M, N);
    }, O = function(M) {
      if (!h.current) return !1;
      var N = M - a.current;
      return !a.current || N >= t || N < 0 || x && M - o.current >= A;
    }, D = function(M) {
      return s.current = null, g && l.current ? T(M) : (l.current = c.current = null, f.current);
    }, j = function M() {
      var N = Date.now();
      if (b && u.current === o.current && z(), O(N)) return D(N);
      if (h.current) {
        var k = t - (N - a.current), R = x ? Math.min(k, A - (N - o.current)) : k;
        C(M, R);
      }
    }, z = function() {
      n && n({});
    }, E = function() {
      if (m || w) {
        var M, N = Date.now(), k = O(N);
        if (l.current = [].slice.call(arguments), c.current = i, a.current = N, _ && !p.current && (p.current = function() {
          var R;
          ((R = globalThis.document) == null ? void 0 : R.visibilityState) === "hidden" && v.current.flush();
        }, (M = globalThis.document) == null || M.addEventListener == null || M.addEventListener("visibilitychange", p.current)), k) {
          if (!s.current && h.current) return o.current = a.current, C(j, t), b ? T(a.current) : f.current;
          if (x) return C(j, t), T(a.current);
        }
        return s.current || C(j, t), f.current;
      }
    };
    return E.cancel = function() {
      var M = s.current;
      M && (y ? cancelAnimationFrame(s.current) : clearTimeout(s.current)), o.current = 0, l.current = a.current = c.current = s.current = null, M && n && n({});
    }, E.isPending = function() {
      return !!s.current;
    }, E.flush = function() {
      return s.current ? D(Date.now()) : f.current;
    }, E;
  }, [b, x, t, A, g, _, y, m, w, n]);
  return v.current = P, pe(function() {
    return h.current = !0, function() {
      var T;
      _ && v.current.flush(), p.current && ((T = globalThis.document) == null || T.removeEventListener == null || T.removeEventListener("visibilitychange", p.current), p.current = null), h.current = !1;
    };
  }, [_]), P;
}
function ZV(e, t) {
  return e === t;
}
function QV(e, t, r) {
  var n = r && r.equalityFn || ZV, i = J(e), a = be({})[1], o = XV(re(function(s) {
    i.current = s, a({});
  }, [a]), t, r, a), u = J(e);
  return n(u.current, e) || (o(e), u.current = e), [i.current, o];
}
var yh, r2;
function JV() {
  if (r2) return yh;
  r2 = 1;
  var e = Sy(), t = wT(), r = xT(), n = xC(), i = xl(), a = Ey(), o = 200;
  function u(s, l, c, f) {
    var d = -1, h = t, p = !0, v = s.length, m = [], y = l.length;
    if (!v)
      return m;
    c && (l = n(l, i(c))), f ? (h = r, p = !1) : l.length >= o && (h = a, p = !1, l = new e(l));
    e:
      for (; ++d < v; ) {
        var b = s[d], g = c == null ? b : c(b);
        if (b = f || b !== 0 ? b : 0, p && g === g) {
          for (var _ = y; _--; )
            if (l[_] === g)
              continue e;
          m.push(b);
        } else h(l, g, f) || m.push(b);
      }
    return m;
  }
  return yh = u, yh;
}
var gh, n2;
function eH() {
  if (n2) return gh;
  n2 = 1;
  var e = JV(), t = wC(), r = vC(), n = t(function(i, a) {
    return r(i) ? e(i, a) : [];
  });
  return gh = n, gh;
}
var tH = eH();
const kC = /* @__PURE__ */ Ht(tH);
function ie(e) {
  for (var t = e.length / 6 | 0, r = new Array(t), n = 0; n < t; ) r[n] = "#" + e.slice(n * 6, ++n * 6);
  return r;
}
const rH = ie("1f77b4ff7f0e2ca02cd627289467bd8c564be377c27f7f7fbcbd2217becf"), nH = ie("7fc97fbeaed4fdc086ffff99386cb0f0027fbf5b17666666"), iH = ie("1b9e77d95f027570b3e7298a66a61ee6ab02a6761d666666"), aH = ie("a6cee31f78b4b2df8a33a02cfb9a99e31a1cfdbf6fff7f00cab2d66a3d9affff99b15928"), oH = ie("fbb4aeb3cde3ccebc5decbe4fed9a6ffffcce5d8bdfddaecf2f2f2"), uH = ie("b3e2cdfdcdaccbd5e8f4cae4e6f5c9fff2aef1e2cccccccc"), sH = ie("e41a1c377eb84daf4a984ea3ff7f00ffff33a65628f781bf999999"), lH = ie("66c2a5fc8d628da0cbe78ac3a6d854ffd92fe5c494b3b3b3"), MC = ie("8dd3c7ffffb3bebadafb807280b1d3fdb462b3de69fccde5d9d9d9bc80bdccebc5ffed6f"), cH = ie("4e79a7f28e2ce1575976b7b259a14fedc949af7aa1ff9da79c755fbab0ab"), Ae = (e) => QM(e[e.length - 1]);
var Sl = new Array(3).concat(
  "d8b365f5f5f55ab4ac",
  "a6611adfc27d80cdc1018571",
  "a6611adfc27df5f5f580cdc1018571",
  "8c510ad8b365f6e8c3c7eae55ab4ac01665e",
  "8c510ad8b365f6e8c3f5f5f5c7eae55ab4ac01665e",
  "8c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e",
  "8c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e",
  "5430058c510abf812ddfc27df6e8c3c7eae580cdc135978f01665e003c30",
  "5430058c510abf812ddfc27df6e8c3f5f5f5c7eae580cdc135978f01665e003c30"
).map(ie);
const fH = Ae(Sl);
var El = new Array(3).concat(
  "af8dc3f7f7f77fbf7b",
  "7b3294c2a5cfa6dba0008837",
  "7b3294c2a5cff7f7f7a6dba0008837",
  "762a83af8dc3e7d4e8d9f0d37fbf7b1b7837",
  "762a83af8dc3e7d4e8f7f7f7d9f0d37fbf7b1b7837",
  "762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b7837",
  "762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b7837",
  "40004b762a839970abc2a5cfe7d4e8d9f0d3a6dba05aae611b783700441b",
  "40004b762a839970abc2a5cfe7d4e8f7f7f7d9f0d3a6dba05aae611b783700441b"
).map(ie);
const dH = Ae(El);
var Pl = new Array(3).concat(
  "e9a3c9f7f7f7a1d76a",
  "d01c8bf1b6dab8e1864dac26",
  "d01c8bf1b6daf7f7f7b8e1864dac26",
  "c51b7de9a3c9fde0efe6f5d0a1d76a4d9221",
  "c51b7de9a3c9fde0eff7f7f7e6f5d0a1d76a4d9221",
  "c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221",
  "c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221",
  "8e0152c51b7dde77aef1b6dafde0efe6f5d0b8e1867fbc414d9221276419",
  "8e0152c51b7dde77aef1b6dafde0eff7f7f7e6f5d0b8e1867fbc414d9221276419"
).map(ie);
const hH = Ae(Pl);
var Tl = new Array(3).concat(
  "998ec3f7f7f7f1a340",
  "5e3c99b2abd2fdb863e66101",
  "5e3c99b2abd2f7f7f7fdb863e66101",
  "542788998ec3d8daebfee0b6f1a340b35806",
  "542788998ec3d8daebf7f7f7fee0b6f1a340b35806",
  "5427888073acb2abd2d8daebfee0b6fdb863e08214b35806",
  "5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b35806",
  "2d004b5427888073acb2abd2d8daebfee0b6fdb863e08214b358067f3b08",
  "2d004b5427888073acb2abd2d8daebf7f7f7fee0b6fdb863e08214b358067f3b08"
).map(ie);
const vH = Ae(Tl);
var Cl = new Array(3).concat(
  "ef8a62f7f7f767a9cf",
  "ca0020f4a58292c5de0571b0",
  "ca0020f4a582f7f7f792c5de0571b0",
  "b2182bef8a62fddbc7d1e5f067a9cf2166ac",
  "b2182bef8a62fddbc7f7f7f7d1e5f067a9cf2166ac",
  "b2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac",
  "b2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac",
  "67001fb2182bd6604df4a582fddbc7d1e5f092c5de4393c32166ac053061",
  "67001fb2182bd6604df4a582fddbc7f7f7f7d1e5f092c5de4393c32166ac053061"
).map(ie);
const pH = Ae(Cl);
var Il = new Array(3).concat(
  "ef8a62ffffff999999",
  "ca0020f4a582bababa404040",
  "ca0020f4a582ffffffbababa404040",
  "b2182bef8a62fddbc7e0e0e09999994d4d4d",
  "b2182bef8a62fddbc7ffffffe0e0e09999994d4d4d",
  "b2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d",
  "b2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d",
  "67001fb2182bd6604df4a582fddbc7e0e0e0bababa8787874d4d4d1a1a1a",
  "67001fb2182bd6604df4a582fddbc7ffffffe0e0e0bababa8787874d4d4d1a1a1a"
).map(ie);
const mH = Ae(Il);
var kl = new Array(3).concat(
  "fc8d59ffffbf91bfdb",
  "d7191cfdae61abd9e92c7bb6",
  "d7191cfdae61ffffbfabd9e92c7bb6",
  "d73027fc8d59fee090e0f3f891bfdb4575b4",
  "d73027fc8d59fee090ffffbfe0f3f891bfdb4575b4",
  "d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4",
  "d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4",
  "a50026d73027f46d43fdae61fee090e0f3f8abd9e974add14575b4313695",
  "a50026d73027f46d43fdae61fee090ffffbfe0f3f8abd9e974add14575b4313695"
).map(ie);
const yH = Ae(kl);
var Ml = new Array(3).concat(
  "fc8d59ffffbf91cf60",
  "d7191cfdae61a6d96a1a9641",
  "d7191cfdae61ffffbfa6d96a1a9641",
  "d73027fc8d59fee08bd9ef8b91cf601a9850",
  "d73027fc8d59fee08bffffbfd9ef8b91cf601a9850",
  "d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850",
  "d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850",
  "a50026d73027f46d43fdae61fee08bd9ef8ba6d96a66bd631a9850006837",
  "a50026d73027f46d43fdae61fee08bffffbfd9ef8ba6d96a66bd631a9850006837"
).map(ie);
const gH = Ae(Ml);
var Nl = new Array(3).concat(
  "fc8d59ffffbf99d594",
  "d7191cfdae61abdda42b83ba",
  "d7191cfdae61ffffbfabdda42b83ba",
  "d53e4ffc8d59fee08be6f59899d5943288bd",
  "d53e4ffc8d59fee08bffffbfe6f59899d5943288bd",
  "d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd",
  "d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd",
  "9e0142d53e4ff46d43fdae61fee08be6f598abdda466c2a53288bd5e4fa2",
  "9e0142d53e4ff46d43fdae61fee08bffffbfe6f598abdda466c2a53288bd5e4fa2"
).map(ie);
const bH = Ae(Nl);
var Rl = new Array(3).concat(
  "e5f5f999d8c92ca25f",
  "edf8fbb2e2e266c2a4238b45",
  "edf8fbb2e2e266c2a42ca25f006d2c",
  "edf8fbccece699d8c966c2a42ca25f006d2c",
  "edf8fbccece699d8c966c2a441ae76238b45005824",
  "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45005824",
  "f7fcfde5f5f9ccece699d8c966c2a441ae76238b45006d2c00441b"
).map(ie);
const _H = Ae(Rl);
var $l = new Array(3).concat(
  "e0ecf49ebcda8856a7",
  "edf8fbb3cde38c96c688419d",
  "edf8fbb3cde38c96c68856a7810f7c",
  "edf8fbbfd3e69ebcda8c96c68856a7810f7c",
  "edf8fbbfd3e69ebcda8c96c68c6bb188419d6e016b",
  "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d6e016b",
  "f7fcfde0ecf4bfd3e69ebcda8c96c68c6bb188419d810f7c4d004b"
).map(ie);
const wH = Ae($l);
var Dl = new Array(3).concat(
  "e0f3dba8ddb543a2ca",
  "f0f9e8bae4bc7bccc42b8cbe",
  "f0f9e8bae4bc7bccc443a2ca0868ac",
  "f0f9e8ccebc5a8ddb57bccc443a2ca0868ac",
  "f0f9e8ccebc5a8ddb57bccc44eb3d32b8cbe08589e",
  "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe08589e",
  "f7fcf0e0f3dbccebc5a8ddb57bccc44eb3d32b8cbe0868ac084081"
).map(ie);
const xH = Ae(Dl);
var jl = new Array(3).concat(
  "fee8c8fdbb84e34a33",
  "fef0d9fdcc8afc8d59d7301f",
  "fef0d9fdcc8afc8d59e34a33b30000",
  "fef0d9fdd49efdbb84fc8d59e34a33b30000",
  "fef0d9fdd49efdbb84fc8d59ef6548d7301f990000",
  "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301f990000",
  "fff7ecfee8c8fdd49efdbb84fc8d59ef6548d7301fb300007f0000"
).map(ie);
const AH = Ae(jl);
var Ll = new Array(3).concat(
  "ece2f0a6bddb1c9099",
  "f6eff7bdc9e167a9cf02818a",
  "f6eff7bdc9e167a9cf1c9099016c59",
  "f6eff7d0d1e6a6bddb67a9cf1c9099016c59",
  "f6eff7d0d1e6a6bddb67a9cf3690c002818a016450",
  "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016450",
  "fff7fbece2f0d0d1e6a6bddb67a9cf3690c002818a016c59014636"
).map(ie);
const OH = Ae(Ll);
var ql = new Array(3).concat(
  "ece7f2a6bddb2b8cbe",
  "f1eef6bdc9e174a9cf0570b0",
  "f1eef6bdc9e174a9cf2b8cbe045a8d",
  "f1eef6d0d1e6a6bddb74a9cf2b8cbe045a8d",
  "f1eef6d0d1e6a6bddb74a9cf3690c00570b0034e7b",
  "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0034e7b",
  "fff7fbece7f2d0d1e6a6bddb74a9cf3690c00570b0045a8d023858"
).map(ie);
const SH = Ae(ql);
var zl = new Array(3).concat(
  "e7e1efc994c7dd1c77",
  "f1eef6d7b5d8df65b0ce1256",
  "f1eef6d7b5d8df65b0dd1c77980043",
  "f1eef6d4b9dac994c7df65b0dd1c77980043",
  "f1eef6d4b9dac994c7df65b0e7298ace125691003f",
  "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125691003f",
  "f7f4f9e7e1efd4b9dac994c7df65b0e7298ace125698004367001f"
).map(ie);
const EH = Ae(zl);
var Fl = new Array(3).concat(
  "fde0ddfa9fb5c51b8a",
  "feebe2fbb4b9f768a1ae017e",
  "feebe2fbb4b9f768a1c51b8a7a0177",
  "feebe2fcc5c0fa9fb5f768a1c51b8a7a0177",
  "feebe2fcc5c0fa9fb5f768a1dd3497ae017e7a0177",
  "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a0177",
  "fff7f3fde0ddfcc5c0fa9fb5f768a1dd3497ae017e7a017749006a"
).map(ie);
const PH = Ae(Fl);
var Bl = new Array(3).concat(
  "edf8b17fcdbb2c7fb8",
  "ffffcca1dab441b6c4225ea8",
  "ffffcca1dab441b6c42c7fb8253494",
  "ffffccc7e9b47fcdbb41b6c42c7fb8253494",
  "ffffccc7e9b47fcdbb41b6c41d91c0225ea80c2c84",
  "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea80c2c84",
  "ffffd9edf8b1c7e9b47fcdbb41b6c41d91c0225ea8253494081d58"
).map(ie);
const TH = Ae(Bl);
var Wl = new Array(3).concat(
  "f7fcb9addd8e31a354",
  "ffffccc2e69978c679238443",
  "ffffccc2e69978c67931a354006837",
  "ffffccd9f0a3addd8e78c67931a354006837",
  "ffffccd9f0a3addd8e78c67941ab5d238443005a32",
  "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443005a32",
  "ffffe5f7fcb9d9f0a3addd8e78c67941ab5d238443006837004529"
).map(ie);
const CH = Ae(Wl);
var Ul = new Array(3).concat(
  "fff7bcfec44fd95f0e",
  "ffffd4fed98efe9929cc4c02",
  "ffffd4fed98efe9929d95f0e993404",
  "ffffd4fee391fec44ffe9929d95f0e993404",
  "ffffd4fee391fec44ffe9929ec7014cc4c028c2d04",
  "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c028c2d04",
  "ffffe5fff7bcfee391fec44ffe9929ec7014cc4c02993404662506"
).map(ie);
const IH = Ae(Ul);
var Vl = new Array(3).concat(
  "ffeda0feb24cf03b20",
  "ffffb2fecc5cfd8d3ce31a1c",
  "ffffb2fecc5cfd8d3cf03b20bd0026",
  "ffffb2fed976feb24cfd8d3cf03b20bd0026",
  "ffffb2fed976feb24cfd8d3cfc4e2ae31a1cb10026",
  "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cb10026",
  "ffffccffeda0fed976feb24cfd8d3cfc4e2ae31a1cbd0026800026"
).map(ie);
const kH = Ae(Vl);
var Hl = new Array(3).concat(
  "deebf79ecae13182bd",
  "eff3ffbdd7e76baed62171b5",
  "eff3ffbdd7e76baed63182bd08519c",
  "eff3ffc6dbef9ecae16baed63182bd08519c",
  "eff3ffc6dbef9ecae16baed64292c62171b5084594",
  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594",
  "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b"
).map(ie);
const MH = Ae(Hl);
var Kl = new Array(3).concat(
  "e5f5e0a1d99b31a354",
  "edf8e9bae4b374c476238b45",
  "edf8e9bae4b374c47631a354006d2c",
  "edf8e9c7e9c0a1d99b74c47631a354006d2c",
  "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32",
  "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32",
  "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b"
).map(ie);
const NH = Ae(Kl);
var Gl = new Array(3).concat(
  "f0f0f0bdbdbd636363",
  "f7f7f7cccccc969696525252",
  "f7f7f7cccccc969696636363252525",
  "f7f7f7d9d9d9bdbdbd969696636363252525",
  "f7f7f7d9d9d9bdbdbd969696737373525252252525",
  "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525",
  "fffffff0f0f0d9d9d9bdbdbd969696737373525252252525000000"
).map(ie);
const RH = Ae(Gl);
var Yl = new Array(3).concat(
  "efedf5bcbddc756bb1",
  "f2f0f7cbc9e29e9ac86a51a3",
  "f2f0f7cbc9e29e9ac8756bb154278f",
  "f2f0f7dadaebbcbddc9e9ac8756bb154278f",
  "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486",
  "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486",
  "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d"
).map(ie);
const $H = Ae(Yl);
var Xl = new Array(3).concat(
  "fee0d2fc9272de2d26",
  "fee5d9fcae91fb6a4acb181d",
  "fee5d9fcae91fb6a4ade2d26a50f15",
  "fee5d9fcbba1fc9272fb6a4ade2d26a50f15",
  "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d",
  "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d",
  "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d"
).map(ie);
const DH = Ae(Xl);
var Zl = new Array(3).concat(
  "fee6cefdae6be6550d",
  "feeddefdbe85fd8d3cd94701",
  "feeddefdbe85fd8d3ce6550da63603",
  "feeddefdd0a2fdae6bfd8d3ce6550da63603",
  "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04",
  "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04",
  "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704"
).map(ie);
const jH = Ae(Zl);
function LH(e) {
  return e = Math.max(0, Math.min(1, e)), "rgb(" + Math.max(0, Math.min(255, Math.round(-4.54 - e * (35.34 - e * (2381.73 - e * (6402.7 - e * (7024.72 - e * 2710.57))))))) + ", " + Math.max(0, Math.min(255, Math.round(32.49 + e * (170.73 + e * (52.82 - e * (131.46 - e * (176.58 - e * 67.37))))))) + ", " + Math.max(0, Math.min(255, Math.round(81.24 + e * (442.36 - e * (2482.43 - e * (6167.24 - e * (6614.94 - e * 2475.67))))))) + ")";
}
const qH = mm(cr(300, 0.5, 0), cr(-240, 0.5, 1));
var zH = mm(cr(-100, 0.75, 0.35), cr(80, 1.5, 0.8)), FH = mm(cr(260, 0.75, 0.35), cr(80, 1.5, 0.8)), Xo = cr();
function BH(e) {
  (e < 0 || e > 1) && (e -= Math.floor(e));
  var t = Math.abs(e - 0.5);
  return Xo.h = 360 * e - 100, Xo.s = 1.5 - 1.5 * t, Xo.l = 0.8 - 0.9 * t, Xo + "";
}
var Zo = Ei(), WH = Math.PI / 3, UH = Math.PI * 2 / 3;
function VH(e) {
  var t;
  return e = (0.5 - e) * Math.PI, Zo.r = 255 * (t = Math.sin(e)) * t, Zo.g = 255 * (t = Math.sin(e + WH)) * t, Zo.b = 255 * (t = Math.sin(e + UH)) * t, Zo + "";
}
function HH(e) {
  return e = Math.max(0, Math.min(1, e)), "rgb(" + Math.max(0, Math.min(255, Math.round(34.61 + e * (1172.33 - e * (10793.56 - e * (33300.12 - e * (38394.49 - e * 14825.05))))))) + ", " + Math.max(0, Math.min(255, Math.round(23.31 + e * (557.33 + e * (1225.33 - e * (3574.96 - e * (1073.77 + e * 707.56))))))) + ", " + Math.max(0, Math.min(255, Math.round(27.2 + e * (3211.1 - e * (15327.97 - e * (27814 - e * (22569.18 - e * 6838.66))))))) + ")";
}
function Ql(e) {
  var t = e.length;
  return function(r) {
    return e[Math.max(0, Math.min(t - 1, Math.floor(r * t)))];
  };
}
const KH = Ql(ie("44015444025645045745055946075a46085c460a5d460b5e470d60470e6147106347116447136548146748166848176948186a481a6c481b6d481c6e481d6f481f70482071482173482374482475482576482677482878482979472a7a472c7a472d7b472e7c472f7d46307e46327e46337f463480453581453781453882443983443a83443b84433d84433e85423f854240864241864142874144874045884046883f47883f48893e49893e4a893e4c8a3d4d8a3d4e8a3c4f8a3c508b3b518b3b528b3a538b3a548c39558c39568c38588c38598c375a8c375b8d365c8d365d8d355e8d355f8d34608d34618d33628d33638d32648e32658e31668e31678e31688e30698e306a8e2f6b8e2f6c8e2e6d8e2e6e8e2e6f8e2d708e2d718e2c718e2c728e2c738e2b748e2b758e2a768e2a778e2a788e29798e297a8e297b8e287c8e287d8e277e8e277f8e27808e26818e26828e26828e25838e25848e25858e24868e24878e23888e23898e238a8d228b8d228c8d228d8d218e8d218f8d21908d21918c20928c20928c20938c1f948c1f958b1f968b1f978b1f988b1f998a1f9a8a1e9b8a1e9c891e9d891f9e891f9f881fa0881fa1881fa1871fa28720a38620a48621a58521a68522a78522a88423a98324aa8325ab8225ac8226ad8127ad8128ae8029af7f2ab07f2cb17e2db27d2eb37c2fb47c31b57b32b67a34b67935b77937b87838b9773aba763bbb753dbc743fbc7340bd7242be7144bf7046c06f48c16e4ac16d4cc26c4ec36b50c46a52c56954c56856c66758c7655ac8645cc8635ec96260ca6063cb5f65cb5e67cc5c69cd5b6ccd5a6ece5870cf5773d05675d05477d1537ad1517cd2507fd34e81d34d84d44b86d54989d5488bd6468ed64590d74393d74195d84098d83e9bd93c9dd93ba0da39a2da37a5db36a8db34aadc32addc30b0dd2fb2dd2db5de2bb8de29bade28bddf26c0df25c2df23c5e021c8e020cae11fcde11dd0e11cd2e21bd5e21ad8e219dae319dde318dfe318e2e418e5e419e7e419eae51aece51befe51cf1e51df4e61ef6e620f8e621fbe723fde725"));
var GH = Ql(ie("00000401000501010601010802010902020b02020d03030f03031204041405041606051806051a07061c08071e0907200a08220b09240c09260d0a290e0b2b100b2d110c2f120d31130d34140e36150e38160f3b180f3d19103f1a10421c10441d11471e114920114b21114e22115024125325125527125829115a2a115c2c115f2d11612f116331116533106734106936106b38106c390f6e3b0f703d0f713f0f72400f74420f75440f764510774710784910784a10794c117a4e117b4f127b51127c52137c54137d56147d57157e59157e5a167e5c167f5d177f5f187f601880621980641a80651a80671b80681c816a1c816b1d816d1d816e1e81701f81721f817320817521817621817822817922827b23827c23827e24828025828125818326818426818627818827818928818b29818c29818e2a81902a81912b81932b80942c80962c80982d80992d809b2e7f9c2e7f9e2f7fa02f7fa1307ea3307ea5317ea6317da8327daa337dab337cad347cae347bb0357bb2357bb3367ab5367ab73779b83779ba3878bc3978bd3977bf3a77c03a76c23b75c43c75c53c74c73d73c83e73ca3e72cc3f71cd4071cf4070d0416fd2426fd3436ed5446dd6456cd8456cd9466bdb476adc4869de4968df4a68e04c67e24d66e34e65e44f64e55064e75263e85362e95462ea5661eb5760ec5860ed5a5fee5b5eef5d5ef05f5ef1605df2625df2645cf3655cf4675cf4695cf56b5cf66c5cf66e5cf7705cf7725cf8745cf8765cf9785df9795df97b5dfa7d5efa7f5efa815ffb835ffb8560fb8761fc8961fc8a62fc8c63fc8e64fc9065fd9266fd9467fd9668fd9869fd9a6afd9b6bfe9d6cfe9f6dfea16efea36ffea571fea772fea973feaa74feac76feae77feb078feb27afeb47bfeb67cfeb77efeb97ffebb81febd82febf84fec185fec287fec488fec68afec88cfeca8dfecc8ffecd90fecf92fed194fed395fed597fed799fed89afdda9cfddc9efddea0fde0a1fde2a3fde3a5fde5a7fde7a9fde9aafdebacfcecaefceeb0fcf0b2fcf2b4fcf4b6fcf6b8fcf7b9fcf9bbfcfbbdfcfdbf")), YH = Ql(ie("00000401000501010601010802010a02020c02020e03021004031204031405041706041907051b08051d09061f0a07220b07240c08260d08290e092b10092d110a30120a32140b34150b37160b39180c3c190c3e1b0c411c0c431e0c451f0c48210c4a230c4c240c4f260c51280b53290b552b0b572d0b592f0a5b310a5c320a5e340a5f3609613809623909633b09643d09653e0966400a67420a68440a68450a69470b6a490b6a4a0c6b4c0c6b4d0d6c4f0d6c510e6c520e6d540f6d550f6d57106e59106e5a116e5c126e5d126e5f136e61136e62146e64156e65156e67166e69166e6a176e6c186e6d186e6f196e71196e721a6e741a6e751b6e771c6d781c6d7a1d6d7c1d6d7d1e6d7f1e6c801f6c82206c84206b85216b87216b88226a8a226a8c23698d23698f24699025689225689326679526679727669827669a28659b29649d29649f2a63a02a63a22b62a32c61a52c60a62d60a82e5fa92e5eab2f5ead305dae305cb0315bb1325ab3325ab43359b63458b73557b93556ba3655bc3754bd3853bf3952c03a51c13a50c33b4fc43c4ec63d4dc73e4cc83f4bca404acb4149cc4248ce4347cf4446d04545d24644d34743d44842d54a41d74b3fd84c3ed94d3dda4e3cdb503bdd513ade5238df5337e05536e15635e25734e35933e45a31e55c30e65d2fe75e2ee8602de9612bea632aeb6429eb6628ec6726ed6925ee6a24ef6c23ef6e21f06f20f1711ff1731df2741cf3761bf37819f47918f57b17f57d15f67e14f68013f78212f78410f8850ff8870ef8890cf98b0bf98c0af98e09fa9008fa9207fa9407fb9606fb9706fb9906fb9b06fb9d07fc9f07fca108fca309fca50afca60cfca80dfcaa0ffcac11fcae12fcb014fcb216fcb418fbb61afbb81dfbba1ffbbc21fbbe23fac026fac228fac42afac62df9c72ff9c932f9cb35f8cd37f8cf3af7d13df7d340f6d543f6d746f5d949f5db4cf4dd4ff4df53f4e156f3e35af3e55df2e661f2e865f2ea69f1ec6df1ed71f1ef75f1f179f2f27df2f482f3f586f3f68af4f88ef5f992f6fa96f8fb9af9fc9dfafda1fcffa4")), XH = Ql(ie("0d088710078813078916078a19068c1b068d1d068e20068f2206902406912605912805922a05932c05942e05952f059631059733059735049837049938049a3a049a3c049b3e049c3f049c41049d43039e44039e46039f48039f4903a04b03a14c02a14e02a25002a25102a35302a35502a45601a45801a45901a55b01a55c01a65e01a66001a66100a76300a76400a76600a76700a86900a86a00a86c00a86e00a86f00a87100a87201a87401a87501a87701a87801a87a02a87b02a87d03a87e03a88004a88104a78305a78405a78606a68707a68808a68a09a58b0aa58d0ba58e0ca48f0da4910ea3920fa39410a29511a19613a19814a099159f9a169f9c179e9d189d9e199da01a9ca11b9ba21d9aa31e9aa51f99a62098a72197a82296aa2395ab2494ac2694ad2793ae2892b02991b12a90b22b8fb32c8eb42e8db52f8cb6308bb7318ab83289ba3388bb3488bc3587bd3786be3885bf3984c03a83c13b82c23c81c33d80c43e7fc5407ec6417dc7427cc8437bc9447aca457acb4679cc4778cc4977cd4a76ce4b75cf4c74d04d73d14e72d24f71d35171d45270d5536fd5546ed6556dd7566cd8576bd9586ada5a6ada5b69db5c68dc5d67dd5e66de5f65de6164df6263e06363e16462e26561e26660e3685fe4695ee56a5de56b5de66c5ce76e5be76f5ae87059e97158e97257ea7457eb7556eb7655ec7754ed7953ed7a52ee7b51ef7c51ef7e50f07f4ff0804ef1814df1834cf2844bf3854bf3874af48849f48948f58b47f58c46f68d45f68f44f79044f79143f79342f89441f89540f9973ff9983ef99a3efa9b3dfa9c3cfa9e3bfb9f3afba139fba238fca338fca537fca636fca835fca934fdab33fdac33fdae32fdaf31fdb130fdb22ffdb42ffdb52efeb72dfeb82cfeba2cfebb2bfebd2afebe2afec029fdc229fdc328fdc527fdc627fdc827fdca26fdcb26fccd25fcce25fcd025fcd225fbd324fbd524fbd724fad824fada24f9dc24f9dd25f8df25f8e125f7e225f7e425f6e626f6e826f5e926f5eb27f4ed27f3ee27f3f027f2f227f1f426f1f525f0f724f0f921")), bh, i2;
function ZH() {
  if (i2) return bh;
  i2 = 1;
  function e(t) {
    var r = t == null ? 0 : t.length;
    return r ? t[r - 1] : void 0;
  }
  return bh = e, bh;
}
var QH = ZH();
const K = /* @__PURE__ */ Ht(QH);
Dt();
var JH = il();
const eK = /* @__PURE__ */ Ht(JH);
var tK = pC();
const NC = /* @__PURE__ */ Ht(tK);
var _h, a2;
function rK() {
  if (a2) return _h;
  a2 = 1;
  var e = AC(), t = OC(), r = Ol();
  function n(i, a, o) {
    for (var u = -1, s = a.length, l = {}; ++u < s; ) {
      var c = a[u], f = e(i, c);
      o(f, c) && t(l, r(c, i), f);
    }
    return l;
  }
  return _h = n, _h;
}
var wh, o2;
function nK() {
  if (o2) return wh;
  o2 = 1;
  function e(t, r) {
    return t != null && r in Object(t);
  }
  return wh = e, wh;
}
var xh, u2;
function iK() {
  if (u2) return xh;
  u2 = 1;
  var e = Ol(), t = bl(), r = Dt(), n = Al(), i = Ky(), a = Qy();
  function o(u, s, l) {
    s = e(s, u);
    for (var c = -1, f = s.length, d = !1; ++c < f; ) {
      var h = a(s[c]);
      if (!(d = u != null && l(u, h)))
        break;
      u = u[h];
    }
    return d || ++c != f ? d : (f = u == null ? 0 : u.length, !!f && i(f) && n(h, f) && (r(u) || t(u)));
  }
  return xh = o, xh;
}
var Ah, s2;
function aK() {
  if (s2) return Ah;
  s2 = 1;
  var e = nK(), t = iK();
  function r(n, i) {
    return n != null && t(n, i, e);
  }
  return Ah = r, Ah;
}
var Oh, l2;
function oK() {
  if (l2) return Oh;
  l2 = 1;
  var e = rK(), t = aK();
  function r(n, i) {
    return e(n, i, function(a, o) {
      return t(n, o);
    });
  }
  return Oh = r, Oh;
}
var Sh, c2;
function Jy() {
  if (c2) return Sh;
  c2 = 1;
  function e(t, r) {
    for (var n = -1, i = r.length, a = t.length; ++n < i; )
      t[a + n] = r[n];
    return t;
  }
  return Sh = e, Sh;
}
var Eh, f2;
function uK() {
  if (f2) return Eh;
  f2 = 1;
  var e = Hi(), t = bl(), r = Dt(), n = e ? e.isConcatSpreadable : void 0;
  function i(a) {
    return r(a) || t(a) || !!(n && a && a[n]);
  }
  return Eh = i, Eh;
}
var Ph, d2;
function sK() {
  if (d2) return Ph;
  d2 = 1;
  var e = Jy(), t = uK();
  function r(n, i, a, o, u) {
    var s = -1, l = n.length;
    for (a || (a = t), u || (u = []); ++s < l; ) {
      var c = n[s];
      i > 0 && a(c) ? i > 1 ? r(c, i - 1, a, o, u) : e(u, c) : o || (u[u.length] = c);
    }
    return u;
  }
  return Ph = r, Ph;
}
var Th, h2;
function lK() {
  if (h2) return Th;
  h2 = 1;
  var e = sK();
  function t(r) {
    var n = r == null ? 0 : r.length;
    return n ? e(r, 1) : [];
  }
  return Th = t, Th;
}
var Ch, v2;
function cK() {
  if (v2) return Ch;
  v2 = 1;
  var e = lK(), t = bC(), r = _C();
  function n(i) {
    return r(t(i, void 0, e), i + "");
  }
  return Ch = n, Ch;
}
var Ih, p2;
function fK() {
  if (p2) return Ih;
  p2 = 1;
  var e = oK(), t = cK(), r = t(function(n, i) {
    return n == null ? {} : e(n, i);
  });
  return Ih = r, Ih;
}
fK();
var kh, m2;
function dK() {
  if (m2) return kh;
  m2 = 1;
  function e(t, r) {
    for (var n = -1, i = t == null ? 0 : t.length; ++n < i; )
      if (r(t[n], n, t))
        return !0;
    return !1;
  }
  return kh = e, kh;
}
var Mh, y2;
function RC() {
  if (y2) return Mh;
  y2 = 1;
  var e = Sy(), t = dK(), r = Ey(), n = 1, i = 2;
  function a(o, u, s, l, c, f) {
    var d = s & n, h = o.length, p = u.length;
    if (h != p && !(d && p > h))
      return !1;
    var v = f.get(o), m = f.get(u);
    if (v && m)
      return v == u && m == o;
    var y = -1, b = !0, g = s & i ? new e() : void 0;
    for (f.set(o, u), f.set(u, o); ++y < h; ) {
      var _ = o[y], x = u[y];
      if (l)
        var w = d ? l(x, _, y, u, o, f) : l(_, x, y, o, u, f);
      if (w !== void 0) {
        if (w)
          continue;
        b = !1;
        break;
      }
      if (g) {
        if (!t(u, function(A, P) {
          if (!r(g, P) && (_ === A || c(_, A, s, l, f)))
            return g.push(P);
        })) {
          b = !1;
          break;
        }
      } else if (!(_ === x || c(_, x, s, l, f))) {
        b = !1;
        break;
      }
    }
    return f.delete(o), f.delete(u), b;
  }
  return Mh = a, Mh;
}
var Nh, g2;
function hK() {
  if (g2) return Nh;
  g2 = 1;
  function e(t) {
    var r = -1, n = Array(t.size);
    return t.forEach(function(i, a) {
      n[++r] = [a, i];
    }), n;
  }
  return Nh = e, Nh;
}
var Rh, b2;
function vK() {
  if (b2) return Rh;
  b2 = 1;
  var e = Hi(), t = lC(), r = po(), n = RC(), i = hK(), a = Py(), o = 1, u = 2, s = "[object Boolean]", l = "[object Date]", c = "[object Error]", f = "[object Map]", d = "[object Number]", h = "[object RegExp]", p = "[object Set]", v = "[object String]", m = "[object Symbol]", y = "[object ArrayBuffer]", b = "[object DataView]", g = e ? e.prototype : void 0, _ = g ? g.valueOf : void 0;
  function x(w, A, P, T, C, O, D) {
    switch (P) {
      case b:
        if (w.byteLength != A.byteLength || w.byteOffset != A.byteOffset)
          return !1;
        w = w.buffer, A = A.buffer;
      case y:
        return !(w.byteLength != A.byteLength || !O(new t(w), new t(A)));
      case s:
      case l:
      case d:
        return r(+w, +A);
      case c:
        return w.name == A.name && w.message == A.message;
      case h:
      case v:
        return w == A + "";
      case f:
        var j = i;
      case p:
        var z = T & o;
        if (j || (j = a), w.size != A.size && !z)
          return !1;
        var E = D.get(w);
        if (E)
          return E == A;
        T |= u, D.set(w, A);
        var M = n(j(w), j(A), T, C, O, D);
        return D.delete(w), M;
      case m:
        if (_)
          return _.call(w) == _.call(A);
    }
    return !1;
  }
  return Rh = x, Rh;
}
var $h, _2;
function $C() {
  if (_2) return $h;
  _2 = 1;
  var e = Jy(), t = Dt();
  function r(n, i, a) {
    var o = i(n);
    return t(n) ? o : e(o, a(n));
  }
  return $h = r, $h;
}
var Dh, w2;
function pK() {
  if (w2) return Dh;
  w2 = 1;
  function e(t, r) {
    for (var n = -1, i = t == null ? 0 : t.length, a = 0, o = []; ++n < i; ) {
      var u = t[n];
      r(u, n, t) && (o[a++] = u);
    }
    return o;
  }
  return Dh = e, Dh;
}
var jh, x2;
function DC() {
  if (x2) return jh;
  x2 = 1;
  function e() {
    return [];
  }
  return jh = e, jh;
}
var Lh, A2;
function eg() {
  if (A2) return Lh;
  A2 = 1;
  var e = pK(), t = DC(), r = Object.prototype, n = r.propertyIsEnumerable, i = Object.getOwnPropertySymbols, a = i ? function(o) {
    return o == null ? [] : (o = Object(o), e(i(o), function(u) {
      return n.call(o, u);
    }));
  } : t;
  return Lh = a, Lh;
}
var qh, O2;
function mK() {
  if (O2) return qh;
  O2 = 1;
  var e = dC(), t = e(Object.keys, Object);
  return qh = t, qh;
}
var zh, S2;
function yK() {
  if (S2) return zh;
  S2 = 1;
  var e = Hy(), t = mK(), r = Object.prototype, n = r.hasOwnProperty;
  function i(a) {
    if (!e(a))
      return t(a);
    var o = [];
    for (var u in Object(a))
      n.call(a, u) && u != "constructor" && o.push(u);
    return o;
  }
  return zh = i, zh;
}
var Fh, E2;
function tg() {
  if (E2) return Fh;
  E2 = 1;
  var e = yC(), t = yK(), r = _l();
  function n(i) {
    return r(i) ? e(i) : t(i);
  }
  return Fh = n, Fh;
}
var Bh, P2;
function jC() {
  if (P2) return Bh;
  P2 = 1;
  var e = $C(), t = eg(), r = tg();
  function n(i) {
    return e(i, r, t);
  }
  return Bh = n, Bh;
}
var Wh, T2;
function gK() {
  if (T2) return Wh;
  T2 = 1;
  var e = jC(), t = 1, r = Object.prototype, n = r.hasOwnProperty;
  function i(a, o, u, s, l, c) {
    var f = u & t, d = e(a), h = d.length, p = e(o), v = p.length;
    if (h != v && !f)
      return !1;
    for (var m = h; m--; ) {
      var y = d[m];
      if (!(f ? y in o : n.call(o, y)))
        return !1;
    }
    var b = c.get(a), g = c.get(o);
    if (b && g)
      return b == o && g == a;
    var _ = !0;
    c.set(a, o), c.set(o, a);
    for (var x = f; ++m < h; ) {
      y = d[m];
      var w = a[y], A = o[y];
      if (s)
        var P = f ? s(A, w, y, o, a, c) : s(w, A, y, a, o, c);
      if (!(P === void 0 ? w === A || l(w, A, u, s, c) : P)) {
        _ = !1;
        break;
      }
      x || (x = y == "constructor");
    }
    if (_ && !x) {
      var T = a.constructor, C = o.constructor;
      T != C && "constructor" in a && "constructor" in o && !(typeof T == "function" && T instanceof T && typeof C == "function" && C instanceof C) && (_ = !1);
    }
    return c.delete(a), c.delete(o), _;
  }
  return Wh = i, Wh;
}
var Uh, C2;
function bK() {
  if (C2) return Uh;
  C2 = 1;
  var e = Jn(), t = vr(), r = e(t, "DataView");
  return Uh = r, Uh;
}
var Vh, I2;
function _K() {
  if (I2) return Vh;
  I2 = 1;
  var e = Jn(), t = vr(), r = e(t, "Promise");
  return Vh = r, Vh;
}
var Hh, k2;
function wK() {
  if (k2) return Hh;
  k2 = 1;
  var e = Jn(), t = vr(), r = e(t, "WeakMap");
  return Hh = r, Hh;
}
var Kh, M2;
function Jl() {
  if (M2) return Kh;
  M2 = 1;
  var e = bK(), t = Ay(), r = _K(), n = AT(), i = wK(), a = Qn(), o = _T(), u = "[object Map]", s = "[object Object]", l = "[object Promise]", c = "[object Set]", f = "[object WeakMap]", d = "[object DataView]", h = o(e), p = o(t), v = o(r), m = o(n), y = o(i), b = a;
  return (e && b(new e(new ArrayBuffer(1))) != d || t && b(new t()) != u || r && b(r.resolve()) != l || n && b(new n()) != c || i && b(new i()) != f) && (b = function(g) {
    var _ = a(g), x = _ == s ? g.constructor : void 0, w = x ? o(x) : "";
    if (w)
      switch (w) {
        case h:
          return d;
        case p:
          return u;
        case v:
          return l;
        case m:
          return c;
        case y:
          return f;
      }
    return _;
  }), Kh = b, Kh;
}
var Gh, N2;
function xK() {
  if (N2) return Gh;
  N2 = 1;
  var e = By(), t = RC(), r = vK(), n = gK(), i = Jl(), a = Dt(), o = wl(), u = Yy(), s = 1, l = "[object Arguments]", c = "[object Array]", f = "[object Object]", d = Object.prototype, h = d.hasOwnProperty;
  function p(v, m, y, b, g, _) {
    var x = a(v), w = a(m), A = x ? c : i(v), P = w ? c : i(m);
    A = A == l ? f : A, P = P == l ? f : P;
    var T = A == f, C = P == f, O = A == P;
    if (O && o(v)) {
      if (!o(m))
        return !1;
      x = !0, T = !1;
    }
    if (O && !T)
      return _ || (_ = new e()), x || u(v) ? t(v, m, y, b, g, _) : r(v, m, A, y, b, g, _);
    if (!(y & s)) {
      var D = T && h.call(v, "__wrapped__"), j = C && h.call(m, "__wrapped__");
      if (D || j) {
        var z = D ? v.value() : v, E = j ? m.value() : m;
        return _ || (_ = new e()), g(z, E, y, b, _);
      }
    }
    return O ? (_ || (_ = new e()), n(v, m, y, b, g, _)) : !1;
  }
  return Gh = p, Gh;
}
var Yh, R2;
function AK() {
  if (R2) return Yh;
  R2 = 1;
  var e = xK(), t = pr();
  function r(n, i, a, o, u) {
    return n === i ? !0 : n == null || i == null || !t(n) && !t(i) ? n !== n && i !== i : e(n, i, a, o, r, u);
  }
  return Yh = r, Yh;
}
var Xh, $2;
function OK() {
  if ($2) return Xh;
  $2 = 1;
  var e = AK();
  function t(r, n) {
    return e(r, n);
  }
  return Xh = t, Xh;
}
OK();
var LC = et(), SK = function(e) {
  var t = e.children, r = e.animate, n = r === void 0 || r, i = e.config, a = i === void 0 ? "default" : i, o = ue((function() {
    var u = $V(a) ? VT[a] : a;
    return { animate: n, config: u };
  }), [n, a]);
  return $(LC.Provider, { value: o, children: t });
}, ti = function() {
  return at(LC);
}, EK = function(e) {
  var t = e.children, r = e.condition, n = e.wrapper;
  return r ? ls(n, {}, t) : t;
}, PK = { position: "relative" }, TK = function(e) {
  var t = e.children, r = e.theme, n = e.renderWrapper, i = n === void 0 || n, a = e.isInteractive, o = a === void 0 || a, u = e.animate, s = e.motionConfig, l = J(null);
  return $(xV, { theme: r, children: $(SK, { animate: u, config: s, children: $(MV, { container: l, children: Y(EK, { condition: i, wrapper: $("div", { style: PK, ref: l }), children: [t, o && $(kV, {})] }) }) }) });
}, CK = function(e, t) {
  return e.width === t.width && e.height === t.height;
}, IK = function(e) {
  var t = e.children, r = e.width, n = e.height, i = e.onResize, a = e.debounceResize, o = QV({ width: r, height: n }, a, { equalityFn: CK })[0];
  return pe((function() {
    i == null || i(o);
  }), [o, i]), $(Hn, { children: t(o) });
}, kK = function(e) {
  var t = e.children, r = e.defaultWidth, n = e.defaultHeight, i = e.onResize, a = e.debounceResize, o = a === void 0 ? 0 : a;
  return $(YV, { defaultWidth: r, defaultHeight: n, children: function(u) {
    var s = u.width, l = u.height;
    return $(IK, { width: s, height: l, onResize: i, debounceResize: o, children: t });
  } });
};
function Un() {
  return Un = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Un.apply(null, arguments);
}
function qC(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var MK = ["id", "colors"], NK = function(e) {
  var t = e.id, r = e.colors, n = qC(e, MK);
  return $("linearGradient", Un({ id: t, x1: 0, x2: 0, y1: 0, y2: 1 }, n, { children: r.map((function(i) {
    var a = i.offset, o = i.color, u = i.opacity;
    return $("stop", { offset: a + "%", stopColor: o, stopOpacity: u !== void 0 ? u : 1 }, a);
  })) }));
}, RK = { linearGradient: NK }, ca = { color: "#000000", background: "#ffffff", size: 4, padding: 4, stagger: !1 }, $K = tt((function(e) {
  var t = e.id, r = e.background, n = r === void 0 ? ca.background : r, i = e.color, a = i === void 0 ? ca.color : i, o = e.size, u = o === void 0 ? ca.size : o, s = e.padding, l = s === void 0 ? ca.padding : s, c = e.stagger, f = c === void 0 ? ca.stagger : c, d = u + l, h = u / 2, p = l / 2;
  return f === !0 && (d = 2 * u + 2 * l), Y("pattern", { id: t, width: d, height: d, patternUnits: "userSpaceOnUse", children: [$("rect", { width: d, height: d, fill: n }), $("circle", { cx: p + h, cy: p + h, r: h, fill: a }), f && $("circle", { cx: 1.5 * l + u + h, cy: 1.5 * l + u + h, r: h, fill: a })] });
})), D2 = function(e) {
  return e * Math.PI / 180;
}, fa = { spacing: 5, rotation: 0, background: "#000000", color: "#ffffff", lineWidth: 2 }, DK = tt((function(e) {
  var t = e.id, r = e.spacing, n = r === void 0 ? fa.spacing : r, i = e.rotation, a = i === void 0 ? fa.rotation : i, o = e.background, u = o === void 0 ? fa.background : o, s = e.color, l = s === void 0 ? fa.color : s, c = e.lineWidth, f = c === void 0 ? fa.lineWidth : c, d = Math.round(a) % 360, h = Math.abs(n);
  d > 180 ? d -= 360 : d > 90 ? d -= 180 : d < -180 ? d += 360 : d < -90 && (d += 180);
  var p, v = h, m = h;
  return d === 0 ? p = `
                M 0 0 L ` + v + ` 0
                M 0 ` + m + " L " + v + " " + m + `
            ` : d === 90 ? p = `
                M 0 0 L 0 ` + m + `
                M ` + v + " 0 L " + v + " " + m + `
            ` : (v = Math.abs(h / Math.sin(D2(d))), m = h / Math.sin(D2(90 - d)), p = d > 0 ? `
                    M 0 ` + -m + " L " + 2 * v + " " + m + `
                    M ` + -v + " " + -m + " L " + v + " " + m + `
                    M ` + -v + " 0 L " + v + " " + 2 * m + `
                ` : `
                    M ` + -v + " " + m + " L " + v + " " + -m + `
                    M ` + -v + " " + 2 * m + " L " + 2 * v + " " + -m + `
                    M 0 ` + 2 * m + " L " + 2 * v + ` 0
                `), Y("pattern", { id: t, width: v, height: m, patternUnits: "userSpaceOnUse", children: [$("rect", { width: v, height: m, fill: u, stroke: "rgba(255, 0, 0, 0.1)", strokeWidth: 0 }), $("path", { d: p, strokeWidth: f, stroke: l, strokeLinecap: "square" })] });
})), da = { color: "#000000", background: "#ffffff", size: 4, padding: 4, stagger: !1 }, jK = tt((function(e) {
  var t = e.id, r = e.color, n = r === void 0 ? da.color : r, i = e.background, a = i === void 0 ? da.background : i, o = e.size, u = o === void 0 ? da.size : o, s = e.padding, l = s === void 0 ? da.padding : s, c = e.stagger, f = c === void 0 ? da.stagger : c, d = u + l, h = l / 2;
  return f === !0 && (d = 2 * u + 2 * l), Y("pattern", { id: t, width: d, height: d, patternUnits: "userSpaceOnUse", children: [$("rect", { width: d, height: d, fill: a }), $("rect", { x: h, y: h, width: u, height: u, fill: n }), f && $("rect", { x: 1.5 * l + u, y: 1.5 * l + u, width: u, height: u, fill: n })] });
})), LK = { patternDots: $K, patternLines: DK, patternSquares: jK }, qK = ["type"], j2 = Un({}, RK, LK), zK = tt((function(e) {
  var t = e.defs;
  return !t || t.length < 1 ? null : $("defs", { "aria-hidden": !0, children: t.map((function(r) {
    var n = r.type, i = qC(r, qK);
    return j2[n] ? ur(j2[n], Un({ key: i.id }, i)) : null;
  })) });
})), FK = Ke((function(e, t) {
  var r = e.width, n = e.height, i = e.margin, a = e.defs, o = e.children, u = e.role, s = e.ariaLabel, l = e.ariaLabelledBy, c = e.ariaDescribedBy, f = e.isFocusable, d = mr();
  return Y("svg", { xmlns: "http://www.w3.org/2000/svg", width: r, height: n, role: u, "aria-label": s, "aria-labelledby": l, "aria-describedby": c, focusable: f, tabIndex: f ? 0 : void 0, ref: t, children: [$(zK, { defs: a }), $("rect", { width: r, height: n, fill: d.background }), $("g", { transform: "translate(" + i.left + "," + i.top + ")", children: o })] });
})), BK = tt((function(e) {
  var t = e.size, r = e.color, n = e.borderWidth, i = e.borderColor;
  return $("circle", { r: t / 2, fill: r, stroke: i, strokeWidth: n, style: { pointerEvents: "none" } });
}));
tt((function(e) {
  var t = e.x, r = e.y, n = e.symbol, i = n === void 0 ? BK : n, a = e.size, o = e.datum, u = e.color, s = e.borderWidth, l = e.borderColor, c = e.label, f = e.labelTextAnchor, d = f === void 0 ? "middle" : f, h = e.labelYOffset, p = h === void 0 ? -12 : h, v = e.ariaLabel, m = e.ariaLabelledBy, y = e.ariaDescribedBy, b = e.ariaHidden, g = e.ariaDisabled, _ = e.isFocusable, x = _ !== void 0 && _, w = e.tabIndex, A = w === void 0 ? 0 : w, P = e.onFocus, T = e.onBlur, C = e.testId, O = mr(), D = ti(), j = D.animate, z = D.config, E = Ki({ transform: "translate(" + t + ", " + r + ")", config: z, immediate: !j }), M = re((function(k) {
    P == null || P(o, k);
  }), [P, o]), N = re((function(k) {
    T == null || T(o, k);
  }), [T, o]);
  return Y(KV.g, { transform: E.transform, style: { pointerEvents: "none" }, focusable: x, tabIndex: x ? A : void 0, "aria-label": v, "aria-labelledby": m, "aria-describedby": y, "aria-disabled": g, "aria-hidden": b, onFocus: x && P ? M : void 0, onBlur: x && T ? N : void 0, "data-testid": C, children: [ur(i, { size: a, color: u, datum: o, borderWidth: s, borderColor: l }), c && $("text", { textAnchor: d, y: p, style: pV(O.dots.text), children: c })] });
}));
var WK = tt((function(e) {
  var t = e.width, r = e.height, n = e.axis, i = e.scale, a = e.value, o = e.lineStyle, u = e.textStyle, s = e.legend, l = e.legendNode, c = e.legendPosition, f = c === void 0 ? "top-right" : c, d = e.legendOffsetX, h = d === void 0 ? 14 : d, p = e.legendOffsetY, v = p === void 0 ? 14 : p, m = e.legendOrientation, y = m === void 0 ? "horizontal" : m, b = mr(), g = 0, _ = 0, x = 0, w = 0;
  if (n === "y" ? (x = i(a), _ = t) : (g = i(a), w = r), s && !l) {
    var A = (function(P) {
      var T = P.axis, C = P.width, O = P.height, D = P.position, j = P.offsetX, z = P.offsetY, E = P.orientation, M = 0, N = 0, k = E === "vertical" ? -90 : 0, R = "start";
      if (T === "x") switch (D) {
        case "top-left":
          M = -j, N = z, R = "end";
          break;
        case "top":
          N = -z, R = E === "horizontal" ? "middle" : "start";
          break;
        case "top-right":
          M = j, N = z, R = E === "horizontal" ? "start" : "end";
          break;
        case "right":
          M = j, N = O / 2, R = E === "horizontal" ? "start" : "middle";
          break;
        case "bottom-right":
          M = j, N = O - z, R = "start";
          break;
        case "bottom":
          N = O + z, R = E === "horizontal" ? "middle" : "end";
          break;
        case "bottom-left":
          N = O - z, M = -j, R = E === "horizontal" ? "end" : "start";
          break;
        case "left":
          M = -j, N = O / 2, R = E === "horizontal" ? "end" : "middle";
      }
      else switch (D) {
        case "top-left":
          M = j, N = -z, R = "start";
          break;
        case "top":
          M = C / 2, N = -z, R = E === "horizontal" ? "middle" : "start";
          break;
        case "top-right":
          M = C - j, N = -z, R = E === "horizontal" ? "end" : "start";
          break;
        case "right":
          M = C + j, R = E === "horizontal" ? "start" : "middle";
          break;
        case "bottom-right":
          M = C - j, N = z, R = "end";
          break;
        case "bottom":
          M = C / 2, N = z, R = E === "horizontal" ? "middle" : "end";
          break;
        case "bottom-left":
          M = j, N = z, R = E === "horizontal" ? "start" : "end";
          break;
        case "left":
          M = -j, R = E === "horizontal" ? "end" : "middle";
      }
      return { x: M, y: N, rotation: k, textAnchor: R };
    })({ axis: n, width: t, height: r, position: f, offsetX: h, offsetY: v, orientation: y });
    l = $("text", { transform: "translate(" + A.x + ", " + A.y + ") rotate(" + A.rotation + ")", textAnchor: A.textAnchor, dominantBaseline: "central", style: u, children: s });
  }
  return Y("g", { transform: "translate(" + g + ", " + x + ")", children: [$("line", { x1: 0, x2: _, y1: 0, y2: w, stroke: b.markers.lineColor, strokeWidth: b.markers.lineStrokeWidth, style: o }), l] });
}));
tt((function(e) {
  var t = e.markers, r = e.width, n = e.height, i = e.xScale, a = e.yScale;
  return t && t.length !== 0 ? t.map((function(o, u) {
    return $(WK, Un({}, o, { width: r, height: n, scale: o.axis === "y" ? a : i }), u);
  })) : null;
}));
var UK = function(e) {
  var t = ti(), r = t.animate, n = t.config, i = (function(u) {
    var s = J();
    return pe((function() {
      s.current = u;
    }), [u]), s.current;
  })(e), a = ue((function() {
    return GS(i, e);
  }), [i, e]), o = Ki({ from: { value: 0 }, to: { value: 1 }, reset: !0, config: n, immediate: !r }).value;
  return gU(o, a);
};
et(void 0);
var VK = { basis: CA, basisClosed: kA, basisOpen: NA, bundle: JI, cardinal: e3, cardinalClosed: t3, cardinalOpen: r3, catmullRom: n3, catmullRomClosed: i3, catmullRomOpen: a3, linear: Ya, linearClosed: qA, monotoneX: jp, monotoneY: Lp, natural: WA, step: UA, stepAfter: HA, stepBefore: VA }, rg = Object.keys(VK);
rg.filter((function(e) {
  return e.endsWith("Closed");
}));
kC(rg, "bundle", "basisClosed", "basisOpen", "cardinalClosed", "cardinalOpen", "catmullRomClosed", "catmullRomOpen", "linearClosed");
kC(rg, "bundle", "basisClosed", "basisOpen", "cardinalClosed", "cardinalOpen", "catmullRomClosed", "catmullRomOpen", "linearClosed");
K(Sl), K(El), K(Pl), K(Tl), K(Cl), K(Il), K(kl), K(Ml), K(Nl), K(Hl), K(Kl), K(Gl), K(Zl), K(Yl), K(Xl), K(Rl), K($l), K(Dl), K(jl), K(Ll), K(ql), K(zl), K(Fl), K(Bl), K(Wl), K(Ul), K(Vl);
K(Sl), K(El), K(Pl), K(Tl), K(Cl), K(Il), K(kl), K(Ml), K(Nl), K(Hl), K(Kl), K(Gl), K(Zl), K(Yl), K(Xl), K(Rl), K($l), K(Dl), K(jl), K(Ll), K(ql), K(zl), K(Fl), K(Bl), K(Wl), K(Ul), K(Vl);
Vr(MC);
var HK = { top: 0, right: 0, bottom: 0, left: 0 }, KK = function(e, t, r) {
  return r === void 0 && (r = {}), ue((function() {
    var n = Un({}, HK, r);
    return { margin: n, innerWidth: e - n.left - n.right, innerHeight: t - n.top - n.bottom, outerWidth: e, outerHeight: t };
  }), [e, t, r]);
}, GK = function() {
  var e = J(null), t = be({ left: 0, top: 0, width: 0, height: 0 }), r = t[0], n = t[1], i = be((function() {
    return typeof ResizeObserver > "u" ? null : new ResizeObserver((function(a) {
      var o = a[0];
      return n(o.contentRect);
    }));
  }))[0];
  return pe((function() {
    return e.current && i !== null && i.observe(e.current), function() {
      i !== null && i.disconnect();
    };
  }), [i]), [e, r];
}, YK = function(e) {
  return typeof e == "function" ? e : typeof e == "string" ? e.indexOf("time:") === 0 ? jm(e.slice("5")) : Ws(e) : function(t) {
    return "" + t;
  };
}, zC = function(e) {
  return ue((function() {
    return YK(e);
  }), [e]);
}, XK = function(e) {
  return eK(e) ? e : function(t) {
    return Ni(t, e);
  };
}, ZK = function(e) {
  return ue((function() {
    return XK(e);
  }), [e]);
};
function L2(e, t) {
  (t == null || t > e.length) && (t = e.length);
  for (var r = 0, n = Array(t); r < t; r++) n[r] = e[r];
  return n;
}
function QK(e, t) {
  var r = typeof Symbol < "u" && e[Symbol.iterator] || e["@@iterator"];
  if (r) return (r = r.call(e)).next.bind(r);
  if (Array.isArray(e) || (r = (function(i, a) {
    if (i) {
      if (typeof i == "string") return L2(i, a);
      var o = {}.toString.call(i).slice(8, -1);
      return o === "Object" && i.constructor && (o = i.constructor.name), o === "Map" || o === "Set" ? Array.from(i) : o === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o) ? L2(i, a) : void 0;
    }
  })(e)) || t) {
    r && (e = r);
    var n = 0;
    return function() {
      return n >= e.length ? { done: !0 } : { done: !1, value: e[n++] };
    };
  }
  throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function os() {
  return os = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, os.apply(null, arguments);
}
var FC = { nivo: ["#e8c1a0", "#f47560", "#f1e15b", "#e8a838", "#61cdbb", "#97e3d5"], category10: rH, accent: nH, dark2: iH, paired: aH, pastel1: oH, pastel2: uH, set1: sH, set2: lH, set3: MC, tableau10: cH }, JK = Object.keys(FC), BC = { brown_blueGreen: Sl, purpleRed_green: El, pink_yellowGreen: Pl, purple_orange: Tl, red_blue: Cl, red_grey: Il, red_yellow_blue: kl, red_yellow_green: Ml, spectral: Nl }, eG = Object.keys(BC), tG = { brown_blueGreen: fH, purpleRed_green: dH, pink_yellowGreen: hH, purple_orange: vH, red_blue: pH, red_grey: mH, red_yellow_blue: yH, red_yellow_green: gH, spectral: bH }, WC = { blues: Hl, greens: Kl, greys: Gl, oranges: Zl, purples: Yl, reds: Xl, blue_green: Rl, blue_purple: $l, green_blue: Dl, orange_red: jl, purple_blue_green: Ll, purple_blue: ql, purple_red: zl, red_purple: Fl, yellow_green_blue: Bl, yellow_green: Wl, yellow_orange_brown: Ul, yellow_orange_red: Vl }, rG = Object.keys(WC), nG = { blues: MH, greens: NH, greys: RH, oranges: jH, purples: $H, reds: DH, turbo: HH, viridis: KH, inferno: YH, magma: GH, plasma: XH, cividis: LH, warm: zH, cool: FH, cubehelixDefault: qH, blue_green: _H, blue_purple: wH, green_blue: xH, orange_red: AH, purple_blue_green: OH, purple_blue: SH, purple_red: EH, red_purple: PH, yellow_green_blue: TH, yellow_green: CH, yellow_orange_brown: IH, yellow_orange_red: kH }, Zh = os({}, FC, BC, WC), iG = function(e) {
  return JK.includes(e);
}, aG = function(e) {
  return eG.includes(e);
}, oG = function(e) {
  return rG.includes(e);
}, uG = { rainbow: BH, sinebow: VH };
os({}, tG, nG, uG);
var sG = function(e) {
  return e.theme !== void 0;
}, lG = function(e) {
  return e.from !== void 0;
}, cG = function(e, t) {
  if (typeof e == "function") return e;
  if (NC(e)) {
    if (sG(e)) {
      if (t === void 0) throw new Error("Unable to use color from theme as no theme was provided");
      var r = Ni(t, e.theme);
      if (r === void 0) throw new Error("Color from theme is undefined at path: '" + e.theme + "'");
      return function() {
        return r;
      };
    }
    if (lG(e)) {
      var n = function(s) {
        return Ni(s, e.from);
      };
      if (Array.isArray(e.modifiers)) {
        for (var i, a = [], o = function() {
          var s = i.value, l = s[0], c = s[1];
          if (l === "brighter") a.push((function(f) {
            return f.brighter(c);
          }));
          else if (l === "darker") a.push((function(f) {
            return f.darker(c);
          }));
          else {
            if (l !== "opacity") throw new Error("Invalid color modifier: '" + l + "', must be one of: 'brighter', 'darker', 'opacity'");
            a.push((function(f) {
              return f.opacity = c, f;
            }));
          }
        }, u = QK(e.modifiers); !(i = u()).done; ) o();
        return a.length === 0 ? n : function(s) {
          return a.reduce((function(l, c) {
            return c(l);
          }), Ei(n(s))).toString();
        };
      }
      return n;
    }
    throw new Error("Invalid color spec, you should either specify 'theme' or 'from' when using a config object");
  }
  return function() {
    return e;
  };
}, q2 = function(e, t) {
  return ue((function() {
    return cG(e, t);
  }), [e, t]);
}, fG = function(e, t) {
  if (typeof e == "function") return e;
  var r = function(f) {
    return Ni(f, t);
  };
  if (Array.isArray(e)) {
    var n = Vr(e), i = function(f) {
      return n(r(f));
    };
    return i.scale = n, i;
  }
  if (NC(e)) {
    if ((function(f) {
      return f.datum !== void 0;
    })(e)) return function(f) {
      return Ni(f, e.datum);
    };
    if ((function(f) {
      return f.scheme !== void 0;
    })(e)) {
      if (iG(e.scheme)) {
        var a = Vr(Zh[e.scheme]), o = function(f) {
          return a(r(f));
        };
        return o.scale = a, o;
      }
      if (aG(e.scheme)) {
        if (e.size !== void 0 && (e.size < 3 || e.size > 11)) throw new Error("Invalid size '" + e.size + "' for diverging color scheme '" + e.scheme + "', must be between 3~11");
        var u = Vr(Zh[e.scheme][e.size || 11]), s = function(f) {
          return u(r(f));
        };
        return s.scale = u, s;
      }
      if (oG(e.scheme)) {
        if (e.size !== void 0 && (e.size < 3 || e.size > 9)) throw new Error("Invalid size '" + e.size + "' for sequential color scheme '" + e.scheme + "', must be between 3~9");
        var l = Vr(Zh[e.scheme][e.size || 9]), c = function(f) {
          return l(r(f));
        };
        return c.scale = l, c;
      }
    }
    throw new Error("Invalid colors, when using an object, you should either pass a 'datum' or a 'scheme' property");
  }
  return function() {
    return e;
  };
}, dG = function(e, t) {
  return ue((function() {
    return fG(e, t);
  }), [e, t]);
};
const UC = /^--/;
function hG(e, t) {
  return t == null || typeof t == "boolean" || t === "" ? "" : typeof t == "number" && t !== 0 && !UC.test(e) && !(Ta.hasOwnProperty(e) && Ta[e]) ? t + "px" : ("" + t).trim();
}
const z2 = {};
function vG(e, t) {
  if (!e.nodeType || !e.setAttribute || !e.removeAttribute) return !1;
  const r = e.nodeName === "filter" || e.parentNode && e.parentNode.nodeName === "filter", { className: n, style: i, children: a, scrollTop: o, scrollLeft: u, viewBox: s, ...l } = t, c = Object.values(l), f = Object.keys(l).map((d) => r || e.hasAttribute(d) ? d : z2[d] || (z2[d] = d.replace(/([A-Z])/g, (h) => "-" + h.toLowerCase())));
  t.hasOwnProperty("children") && (e.textContent = a);
  for (const d in i) if (i.hasOwnProperty(d)) {
    const h = hG(d, i[d]);
    UC.test(d) ? e.style.setProperty(d, h) : e.style[d] = h;
  }
  f.forEach((d, h) => {
    const p = c[h];
    p !== void 0 ? e.setAttribute(d, p) : e.removeAttribute(d);
  }), t.hasOwnProperty("className") && (n !== void 0 ? e.className = n : e.removeAttribute("class")), o !== void 0 && (e.scrollTop = o), u !== void 0 && (e.scrollLeft = u), t.hasOwnProperty("viewBox") && (s !== void 0 ? e.setAttribute("viewBox", s) : e.removeAttribute("viewBox"));
}
let Ta = {
  animationIterationCount: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
};
const pG = (e, t) => e + t.charAt(0).toUpperCase() + t.substring(1), mG = [
  "Webkit",
  "Ms",
  "Moz",
  "O"
];
Ta = Object.keys(Ta).reduce((e, t) => (mG.forEach((r) => e[pG(r, t)] = e[t]), e), Ta);
const yG = /^(matrix3d|matrix|translate3d|translate[XYZ]?|scale3d|scale[XYZ]?|rotate3d|rotate[XYZ]?|skew[XY]?)$/, gG = /^(translate)/, bG = /^(rotate|skew)/, Qh = (e, t) => L.num(e) && e !== 0 ? e + t : e, uu = (e, t) => L.arr(e) ? e.every((r) => uu(r, t)) : L.num(e) ? e === t : parseFloat(e) === t;
var _G = class extends ei {
  constructor({ x: t, y: r, z: n, ...i }) {
    const a = [], o = [];
    (t || r || n) && (a.push([
      t || 0,
      r || 0,
      n || 0
    ]), o.push((u) => [`translate3d(${u.map((s) => Qh(s, "px")).join(",")})`, uu(u, 0)])), bt(i, (u, s) => {
      if (s === "transform")
        a.push([u || ""]), o.push((l) => [l, l === ""]);
      else if (yG.test(s)) {
        if (delete i[s], L.und(u)) return;
        const l = gG.test(s) ? "px" : bG.test(s) ? "deg" : "";
        a.push(nt(u)), o.push(s === "rotate3d" ? ([c, f, d, h]) => [`rotate3d(${c},${f},${d},${Qh(h, l)})`, uu(h, 0)] : (c) => [`${s}(${c.map((f) => Qh(f, l)).join(",")})`, uu(c, s.startsWith("scale") ? 1 : 0)]);
      }
    }), a.length && (i.transform = new wG(a, o)), super(i);
  }
}, wG = class extends go {
  constructor(t, r) {
    super(), this.inputs = t, this.transforms = r, this._value = null;
  }
  get() {
    return this._value || (this._value = this._get());
  }
  _get() {
    let t = "", r = !0;
    return X(this.inputs, (n, i) => {
      const a = je(n[0]), [o, u] = this.transforms[i](L.arr(a) ? a : n.map(je));
      t += " " + o, r = r && u;
    }), r ? "none" : t;
  }
  observerAdded(t) {
    t == 1 && X(this.inputs, (r) => X(r, (n) => He(n) && Dr(n, this)));
  }
  observerRemoved(t) {
    t == 0 && X(this.inputs, (r) => X(r, (n) => He(n) && tn(n, this)));
  }
  eventObserved(t) {
    t.type == "change" && (this._value = null), en(this, t);
  }
};
const xG = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
Nt.assign({
  batchedUpdates: cs,
  createStringInterpolator: bo,
  colors: fl
});
const AG = yl(xG, {
  applyAnimatedValues: vG,
  createAnimatedStyle: (e) => new _G(e),
  getComponentProps: ({ scrollTop: e, scrollLeft: t, ...r }) => r
}), F2 = AG.animated;
function Ca() {
  return Ca = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Ca.apply(null, arguments);
}
function B2(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var OG = ["style", "children"], SG = ["outlineWidth", "outlineColor", "outlineOpacity"], VC = function(e) {
  var t = e.style, r = e.children, n = B2(e, OG), i = t.outlineWidth, a = t.outlineColor, o = t.outlineOpacity, u = B2(t, SG);
  return Y(Hn, { children: [i > 0 && $(F2.text, Ca({}, n, { style: Ca({}, u, { strokeWidth: 2 * i, stroke: a, strokeOpacity: o, strokeLinejoin: "round" }), children: r })), $(F2.text, Ca({}, n, { style: u, children: r }))] });
}, EG = function(e) {
  var t = e.x, r = e.y, n = e.size, i = e.fill, a = e.opacity, o = a === void 0 ? 1 : a, u = e.borderWidth, s = u === void 0 ? 0 : u, l = e.borderColor;
  return $("circle", { r: n / 2, cx: t + n / 2, cy: r + n / 2, fill: i, opacity: o, strokeWidth: s, stroke: l === void 0 ? "transparent" : l, style: { pointerEvents: "none" } });
}, PG = function(e) {
  var t = e.x, r = e.y, n = e.size, i = e.fill, a = e.opacity, o = a === void 0 ? 1 : a, u = e.borderWidth, s = u === void 0 ? 0 : u, l = e.borderColor;
  return $("g", { transform: "translate(" + t + "," + r + ")", children: $("path", { d: `
                    M` + n / 2 + ` 0
                    L` + 0.8 * n + " " + n / 2 + `
                    L` + n / 2 + " " + n + `
                    L` + 0.2 * n + " " + n / 2 + `
                    L` + n / 2 + ` 0
                `, fill: i, opacity: o, strokeWidth: s, stroke: l === void 0 ? "transparent" : l, style: { pointerEvents: "none" } }) });
}, TG = function(e) {
  var t = e.x, r = e.y, n = e.size, i = e.fill, a = e.opacity, o = a === void 0 ? 1 : a, u = e.borderWidth, s = u === void 0 ? 0 : u, l = e.borderColor;
  return $("rect", { x: t, y: r, fill: i, opacity: o, strokeWidth: s, stroke: l === void 0 ? "transparent" : l, width: n, height: n, style: { pointerEvents: "none" } });
}, CG = function(e) {
  var t = e.x, r = e.y, n = e.size, i = e.fill, a = e.opacity, o = a === void 0 ? 1 : a, u = e.borderWidth, s = u === void 0 ? 0 : u, l = e.borderColor;
  return $("g", { transform: "translate(" + t + "," + r + ")", children: $("path", { d: `
                M` + n / 2 + ` 0
                L` + n + " " + n + `
                L0 ` + n + `
                L` + n / 2 + ` 0
            `, fill: i, opacity: o, strokeWidth: s, stroke: l === void 0 ? "transparent" : l, style: { pointerEvents: "none" } }) });
};
function Pn() {
  return Pn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Pn.apply(null, arguments);
}
var Pt = { translateX: 0, translateY: 0, padding: 0, itemsSpacing: 0, itemDirection: "left-to-right", justify: !1, symbolShape: "square", symbolSize: 16, symbolSpacing: 8 }, IG = { top: 0, right: 0, bottom: 0, left: 0 }, HC = function(e) {
  var t, r = e.direction, n = e.itemsSpacing, i = e.padding, a = e.itemCount, o = e.itemWidth, u = e.itemHeight;
  if (typeof i != "number" && (typeof (t = i) != "object" || Array.isArray(t) || t === null)) throw new Error("Invalid property padding, must be one of: number, object");
  var s = typeof i == "number" ? { top: i, right: i, bottom: i, left: i } : Pn({}, IG, i), l = s.left + s.right, c = s.top + s.bottom, f = o + l, d = u + c, h = (a - 1) * n;
  return r === "row" ? f = o * a + h + l : r === "column" && (d = u * a + h + c), { width: f, height: d, padding: s };
}, kG = function(e) {
  var t = e.anchor, r = e.translateX, n = e.translateY, i = e.containerWidth, a = e.containerHeight, o = e.width, u = e.height, s = r, l = n;
  switch (t) {
    case "top":
      s += (i - o) / 2;
      break;
    case "top-right":
      s += i - o;
      break;
    case "right":
      s += i - o, l += (a - u) / 2;
      break;
    case "bottom-right":
      s += i - o, l += a - u;
      break;
    case "bottom":
      s += (i - o) / 2, l += a - u;
      break;
    case "bottom-left":
      l += a - u;
      break;
    case "left":
      l += (a - u) / 2;
      break;
    case "center":
      s += (i - o) / 2, l += (a - u) / 2;
  }
  return { x: s, y: l };
}, MG = function(e) {
  var t, r, n, i, a, o, u = e.direction, s = e.justify, l = e.symbolSize, c = e.symbolSpacing, f = e.width, d = e.height;
  switch (u) {
    case "left-to-right":
      t = 0, r = (d - l) / 2, i = d / 2, o = "central", s ? (n = f, a = "end") : (n = l + c, a = "start");
      break;
    case "right-to-left":
      t = f - l, r = (d - l) / 2, i = d / 2, o = "central", s ? (n = 0, a = "start") : (n = f - l - c, a = "end");
      break;
    case "top-to-bottom":
      t = (f - l) / 2, r = 0, n = f / 2, a = "middle", s ? (i = d, o = "alphabetic") : (i = l + c, o = "text-before-edge");
      break;
    case "bottom-to-top":
      t = (f - l) / 2, r = d - l, n = f / 2, a = "middle", s ? (i = 0, o = "text-before-edge") : (i = d - l - c, o = "alphabetic");
  }
  return { symbolX: t, symbolY: r, labelX: n, labelY: i, labelAnchor: a, labelAlignment: o };
}, NG = { circle: EG, diamond: PG, square: TG, triangle: CG }, RG = function(e) {
  var t, r, n, i, a, o, u, s, l, c, f, d = e.x, h = e.y, p = e.width, v = e.height, m = e.data, y = e.direction, b = y === void 0 ? Pt.itemDirection : y, g = e.justify, _ = g === void 0 ? Pt.justify : g, x = e.textColor, w = e.background, A = w === void 0 ? "transparent" : w, P = e.opacity, T = P === void 0 ? 1 : P, C = e.symbolShape, O = C === void 0 ? Pt.symbolShape : C, D = e.symbolSize, j = D === void 0 ? Pt.symbolSize : D, z = e.symbolSpacing, E = z === void 0 ? Pt.symbolSpacing : z, M = e.symbolBorderWidth, N = M === void 0 ? 0 : M, k = e.symbolBorderColor, R = k === void 0 ? "transparent" : k, W = e.onClick, Z = e.onMouseEnter, ce = e.onMouseLeave, fe = e.toggleSerie, de = e.effects, Oe = be({}), me = Oe[0], ve = Oe[1], Ue = mr(), U = re((function(_t) {
    if (de) {
      var Yt = de.filter((function(Fe) {
        return Fe.on === "hover";
      })).reduce((function(Fe, De) {
        return Pn({}, Fe, De.style);
      }), {});
      ve(Yt);
    }
    Z == null || Z(m, _t);
  }), [Z, m, de]), Q = re((function(_t) {
    if (de) {
      var Yt = de.filter((function(Fe) {
        return Fe.on !== "hover";
      })).reduce((function(Fe, De) {
        return Pn({}, Fe, De.style);
      }), {});
      ve(Yt);
    }
    ce == null || ce(m, _t);
  }), [ce, m, de]), H = MG({ direction: b, justify: _, symbolSize: (t = me.symbolSize) != null ? t : j, symbolSpacing: E, width: p, height: v }), q = H.symbolX, we = H.symbolY, F = H.labelX, B = H.labelY, Ee = H.labelAnchor, ne = H.labelAlignment, lt = [W, Z, ce, fe].some((function(_t) {
    return _t !== void 0;
  })), Gt = typeof O == "function" ? O : NG[O];
  return Y("g", { transform: "translate(" + d + "," + h + ")", style: { opacity: (r = me.itemOpacity) != null ? r : T }, children: [$("rect", { width: p, height: v, fill: (n = me.itemBackground) != null ? n : A, style: { cursor: lt ? "pointer" : "auto" }, onClick: function(_t) {
    W == null || W(m, _t), fe == null || fe(m.id);
  }, onMouseEnter: U, onMouseLeave: Q }), S.createElement(Gt, Pn({ id: m.id, x: q, y: we, size: (i = me.symbolSize) != null ? i : j, fill: (a = (o = m.fill) != null ? o : m.color) != null ? a : "black", borderWidth: (u = me.symbolBorderWidth) != null ? u : N, borderColor: (s = me.symbolBorderColor) != null ? s : R }, m.hidden ? Ue.legends.hidden.symbol : void 0)), $(VC, { textAnchor: Ee, style: Pn({}, Ue.legends.text, { fill: (l = (c = (f = me.itemTextColor) != null ? f : x) != null ? c : Ue.legends.text.fill) != null ? l : "black", dominantBaseline: ne, pointerEvents: "none", userSelect: "none" }, m.hidden ? Ue.legends.hidden.text : void 0), x: F, y: B, children: m.label })] });
}, $G = function(e) {
  var t = e.data, r = e.x, n = e.y, i = e.direction, a = e.padding, o = a === void 0 ? Pt.padding : a, u = e.justify, s = e.effects, l = e.itemWidth, c = e.itemHeight, f = e.itemDirection, d = f === void 0 ? Pt.itemDirection : f, h = e.itemsSpacing, p = h === void 0 ? Pt.itemsSpacing : h, v = e.itemTextColor, m = e.itemBackground, y = m === void 0 ? "transparent" : m, b = e.itemOpacity, g = b === void 0 ? 1 : b, _ = e.symbolShape, x = e.symbolSize, w = e.symbolSpacing, A = e.symbolBorderWidth, P = e.symbolBorderColor, T = e.onClick, C = e.onMouseEnter, O = e.onMouseLeave, D = e.toggleSerie, j = HC({ itemCount: t.length, itemWidth: l, itemHeight: c, itemsSpacing: p, direction: i, padding: o }).padding, z = i === "row" ? l + p : 0, E = i === "column" ? c + p : 0;
  return $("g", { transform: "translate(" + r + "," + n + ")", children: t.map((function(M, N) {
    return $(RG, { data: M, x: N * z + j.left, y: N * E + j.top, width: l, height: c, direction: d, justify: u, effects: s, textColor: v, background: y, opacity: g, symbolShape: _, symbolSize: x, symbolSpacing: w, symbolBorderWidth: A, symbolBorderColor: P, onClick: T, onMouseEnter: C, onMouseLeave: O, toggleSerie: D }, N);
  })) });
}, DG = function(e) {
  var t = e.data, r = e.containerWidth, n = e.containerHeight, i = e.translateX, a = i === void 0 ? Pt.translateX : i, o = e.translateY, u = o === void 0 ? Pt.translateY : o, s = e.anchor, l = e.direction, c = e.padding, f = c === void 0 ? Pt.padding : c, d = e.justify, h = e.itemsSpacing, p = h === void 0 ? Pt.itemsSpacing : h, v = e.itemWidth, m = e.itemHeight, y = e.itemDirection, b = e.itemTextColor, g = e.itemBackground, _ = e.itemOpacity, x = e.symbolShape, w = e.symbolSize, A = e.symbolSpacing, P = e.symbolBorderWidth, T = e.symbolBorderColor, C = e.onClick, O = e.onMouseEnter, D = e.onMouseLeave, j = e.toggleSerie, z = e.effects, E = HC({ itemCount: t.length, itemsSpacing: p, itemWidth: v, itemHeight: m, direction: l, padding: f }), M = E.width, N = E.height, k = kG({ anchor: s, translateX: a, translateY: u, containerWidth: r, containerHeight: n, width: M, height: N }), R = k.x, W = k.y;
  return $($G, { data: t, x: R, y: W, direction: l, padding: f, justify: d, effects: z, itemsSpacing: p, itemWidth: v, itemHeight: m, itemDirection: y, itemTextColor: b, itemBackground: g, itemOpacity: _, symbolShape: x, symbolSize: w, symbolSpacing: A, symbolBorderWidth: P, symbolBorderColor: T, onClick: C, onMouseEnter: O, onMouseLeave: D, toggleSerie: typeof j == "boolean" ? void 0 : j });
};
function jG(e) {
  return e.target.depth;
}
function LG(e) {
  return e.depth;
}
function qG(e, t) {
  return t - 1 - e.height;
}
function KC(e, t) {
  return e.sourceLinks.length ? e.depth : t - 1;
}
function zG(e) {
  return e.targetLinks.length ? e.depth : e.sourceLinks.length ? $u(e.sourceLinks, jG) - 1 : 0;
}
function Qo(e) {
  return function() {
    return e;
  };
}
function W2(e, t) {
  return us(e.source, t.source) || e.index - t.index;
}
function U2(e, t) {
  return us(e.target, t.target) || e.index - t.index;
}
function us(e, t) {
  return e.y0 - t.y0;
}
function Jh(e) {
  return e.value;
}
function FG(e) {
  return e.index;
}
function BG(e) {
  return e.nodes;
}
function WG(e) {
  return e.links;
}
function V2(e, t) {
  const r = e.get(t);
  if (!r) throw new Error("missing: " + t);
  return r;
}
function H2({ nodes: e }) {
  for (const t of e) {
    let r = t.y0, n = r;
    for (const i of t.sourceLinks)
      i.y0 = r + i.width / 2, r += i.width;
    for (const i of t.targetLinks)
      i.y1 = n + i.width / 2, n += i.width;
  }
}
function UG() {
  let e = 0, t = 0, r = 1, n = 1, i = 24, a = 8, o, u = FG, s = KC, l, c, f = BG, d = WG, h = 6;
  function p() {
    const E = { nodes: f.apply(null, arguments), links: d.apply(null, arguments) };
    return v(E), m(E), y(E), b(E), x(E), H2(E), E;
  }
  p.update = function(E) {
    return H2(E), E;
  }, p.nodeId = function(E) {
    return arguments.length ? (u = typeof E == "function" ? E : Qo(E), p) : u;
  }, p.nodeAlign = function(E) {
    return arguments.length ? (s = typeof E == "function" ? E : Qo(E), p) : s;
  }, p.nodeSort = function(E) {
    return arguments.length ? (l = E, p) : l;
  }, p.nodeWidth = function(E) {
    return arguments.length ? (i = +E, p) : i;
  }, p.nodePadding = function(E) {
    return arguments.length ? (a = o = +E, p) : a;
  }, p.nodes = function(E) {
    return arguments.length ? (f = typeof E == "function" ? E : Qo(E), p) : f;
  }, p.links = function(E) {
    return arguments.length ? (d = typeof E == "function" ? E : Qo(E), p) : d;
  }, p.linkSort = function(E) {
    return arguments.length ? (c = E, p) : c;
  }, p.size = function(E) {
    return arguments.length ? (e = t = 0, r = +E[0], n = +E[1], p) : [r - e, n - t];
  }, p.extent = function(E) {
    return arguments.length ? (e = +E[0][0], r = +E[1][0], t = +E[0][1], n = +E[1][1], p) : [[e, t], [r, n]];
  }, p.iterations = function(E) {
    return arguments.length ? (h = +E, p) : h;
  };
  function v({ nodes: E, links: M }) {
    for (const [k, R] of E.entries())
      R.index = k, R.sourceLinks = [], R.targetLinks = [];
    const N = new Map(E.map((k, R) => [u(k, R, E), k]));
    for (const [k, R] of M.entries()) {
      R.index = k;
      let { source: W, target: Z } = R;
      typeof W != "object" && (W = R.source = V2(N, W)), typeof Z != "object" && (Z = R.target = V2(N, Z)), W.sourceLinks.push(R), Z.targetLinks.push(R);
    }
    if (c != null)
      for (const { sourceLinks: k, targetLinks: R } of E)
        k.sort(c), R.sort(c);
  }
  function m({ nodes: E }) {
    for (const M of E)
      M.value = M.fixedValue === void 0 ? Math.max(Tc(M.sourceLinks, Jh), Tc(M.targetLinks, Jh)) : M.fixedValue;
  }
  function y({ nodes: E }) {
    const M = E.length;
    let N = new Set(E), k = /* @__PURE__ */ new Set(), R = 0;
    for (; N.size; ) {
      for (const W of N) {
        W.depth = R;
        for (const { target: Z } of W.sourceLinks)
          k.add(Z);
      }
      if (++R > M) throw new Error("circular link");
      N = k, k = /* @__PURE__ */ new Set();
    }
  }
  function b({ nodes: E }) {
    const M = E.length;
    let N = new Set(E), k = /* @__PURE__ */ new Set(), R = 0;
    for (; N.size; ) {
      for (const W of N) {
        W.height = R;
        for (const { source: Z } of W.targetLinks)
          k.add(Z);
      }
      if (++R > M) throw new Error("circular link");
      N = k, k = /* @__PURE__ */ new Set();
    }
  }
  function g({ nodes: E }) {
    const M = Ru(E, (R) => R.depth) + 1, N = (r - e - i) / (M - 1), k = new Array(M);
    for (const R of E) {
      const W = Math.max(0, Math.min(M - 1, Math.floor(s.call(null, R, M))));
      R.layer = W, R.x0 = e + W * N, R.x1 = R.x0 + i, k[W] ? k[W].push(R) : k[W] = [R];
    }
    if (l) for (const R of k)
      R.sort(l);
    return k;
  }
  function _(E) {
    const M = $u(E, (N) => (n - t - (N.length - 1) * o) / Tc(N, Jh));
    for (const N of E) {
      let k = t;
      for (const R of N) {
        R.y0 = k, R.y1 = k + R.value * M, k = R.y1 + o;
        for (const W of R.sourceLinks)
          W.width = W.value * M;
      }
      k = (n - k + o) / (N.length + 1);
      for (let R = 0; R < N.length; ++R) {
        const W = N[R];
        W.y0 += k * (R + 1), W.y1 += k * (R + 1);
      }
      D(N);
    }
  }
  function x(E) {
    const M = g(E);
    o = Math.min(a, (n - t) / (Ru(M, (N) => N.length) - 1)), _(M);
    for (let N = 0; N < h; ++N) {
      const k = Math.pow(0.99, N), R = Math.max(1 - k, (N + 1) / h);
      A(M, k, R), w(M, k, R);
    }
  }
  function w(E, M, N) {
    for (let k = 1, R = E.length; k < R; ++k) {
      const W = E[k];
      for (const Z of W) {
        let ce = 0, fe = 0;
        for (const { source: Oe, value: me } of Z.targetLinks) {
          let ve = me * (Z.layer - Oe.layer);
          ce += j(Oe, Z) * ve, fe += ve;
        }
        if (!(fe > 0)) continue;
        let de = (ce / fe - Z.y0) * M;
        Z.y0 += de, Z.y1 += de, O(Z);
      }
      l === void 0 && W.sort(us), P(W, N);
    }
  }
  function A(E, M, N) {
    for (let k = E.length, R = k - 2; R >= 0; --R) {
      const W = E[R];
      for (const Z of W) {
        let ce = 0, fe = 0;
        for (const { target: Oe, value: me } of Z.sourceLinks) {
          let ve = me * (Oe.layer - Z.layer);
          ce += z(Z, Oe) * ve, fe += ve;
        }
        if (!(fe > 0)) continue;
        let de = (ce / fe - Z.y0) * M;
        Z.y0 += de, Z.y1 += de, O(Z);
      }
      l === void 0 && W.sort(us), P(W, N);
    }
  }
  function P(E, M) {
    const N = E.length >> 1, k = E[N];
    C(E, k.y0 - o, N - 1, M), T(E, k.y1 + o, N + 1, M), C(E, n, E.length - 1, M), T(E, t, 0, M);
  }
  function T(E, M, N, k) {
    for (; N < E.length; ++N) {
      const R = E[N], W = (M - R.y0) * k;
      W > 1e-6 && (R.y0 += W, R.y1 += W), M = R.y1 + o;
    }
  }
  function C(E, M, N, k) {
    for (; N >= 0; --N) {
      const R = E[N], W = (R.y1 - M) * k;
      W > 1e-6 && (R.y0 -= W, R.y1 -= W), M = R.y0 - o;
    }
  }
  function O({ sourceLinks: E, targetLinks: M }) {
    if (c === void 0) {
      for (const { source: { sourceLinks: N } } of M)
        N.sort(U2);
      for (const { target: { targetLinks: N } } of E)
        N.sort(W2);
    }
  }
  function D(E) {
    if (c === void 0)
      for (const { sourceLinks: M, targetLinks: N } of E)
        M.sort(U2), N.sort(W2);
  }
  function j(E, M) {
    let N = E.y0 - (E.sourceLinks.length - 1) * o / 2;
    for (const { target: k, width: R } of E.sourceLinks) {
      if (k === M) break;
      N += R + o;
    }
    for (const { source: k, width: R } of M.targetLinks) {
      if (k === E) break;
      N -= R;
    }
    return N;
  }
  function z(E, M) {
    let N = M.y0 - (M.targetLinks.length - 1) * o / 2;
    for (const { source: k, width: R } of M.targetLinks) {
      if (k === E) break;
      N += R + o;
    }
    for (const { target: k, width: R } of E.sourceLinks) {
      if (k === M) break;
      N -= R;
    }
    return N;
  }
  return p;
}
var ev, K2;
function VG() {
  if (K2) return ev;
  K2 = 1;
  function e(t, r) {
    for (var n = -1, i = t == null ? 0 : t.length; ++n < i && r(t[n], n, t) !== !1; )
      ;
    return t;
  }
  return ev = e, ev;
}
var tv, G2;
function HG() {
  if (G2) return tv;
  G2 = 1;
  var e = _o(), t = tg();
  function r(n, i) {
    return n && e(i, t(i), n);
  }
  return tv = r, tv;
}
var rv, Y2;
function KG() {
  if (Y2) return rv;
  Y2 = 1;
  var e = _o(), t = wo();
  function r(n, i) {
    return n && e(i, t(i), n);
  }
  return rv = r, rv;
}
var nv, X2;
function GG() {
  if (X2) return nv;
  X2 = 1;
  var e = _o(), t = eg();
  function r(n, i) {
    return e(n, t(n), i);
  }
  return nv = r, nv;
}
var iv, Z2;
function GC() {
  if (Z2) return iv;
  Z2 = 1;
  var e = Jy(), t = Vy(), r = eg(), n = DC(), i = Object.getOwnPropertySymbols, a = i ? function(o) {
    for (var u = []; o; )
      e(u, r(o)), o = t(o);
    return u;
  } : n;
  return iv = a, iv;
}
var av, Q2;
function YG() {
  if (Q2) return av;
  Q2 = 1;
  var e = _o(), t = GC();
  function r(n, i) {
    return e(n, t(n), i);
  }
  return av = r, av;
}
var ov, J2;
function XG() {
  if (J2) return ov;
  J2 = 1;
  var e = $C(), t = GC(), r = wo();
  function n(i) {
    return e(i, r, t);
  }
  return ov = n, ov;
}
var uv, eA;
function ZG() {
  if (eA) return uv;
  eA = 1;
  var e = Object.prototype, t = e.hasOwnProperty;
  function r(n) {
    var i = n.length, a = new n.constructor(i);
    return i && typeof n[0] == "string" && t.call(n, "index") && (a.index = n.index, a.input = n.input), a;
  }
  return uv = r, uv;
}
var sv, tA;
function QG() {
  if (tA) return sv;
  tA = 1;
  var e = Uy();
  function t(r, n) {
    var i = n ? e(r.buffer) : r.buffer;
    return new r.constructor(i, r.byteOffset, r.byteLength);
  }
  return sv = t, sv;
}
var lv, rA;
function JG() {
  if (rA) return lv;
  rA = 1;
  var e = /\w*$/;
  function t(r) {
    var n = new r.constructor(r.source, e.exec(r));
    return n.lastIndex = r.lastIndex, n;
  }
  return lv = t, lv;
}
var cv, nA;
function eY() {
  if (nA) return cv;
  nA = 1;
  var e = Hi(), t = e ? e.prototype : void 0, r = t ? t.valueOf : void 0;
  function n(i) {
    return r ? Object(r.call(i)) : {};
  }
  return cv = n, cv;
}
var fv, iA;
function tY() {
  if (iA) return fv;
  iA = 1;
  var e = Uy(), t = QG(), r = JG(), n = eY(), i = cC(), a = "[object Boolean]", o = "[object Date]", u = "[object Map]", s = "[object Number]", l = "[object RegExp]", c = "[object Set]", f = "[object String]", d = "[object Symbol]", h = "[object ArrayBuffer]", p = "[object DataView]", v = "[object Float32Array]", m = "[object Float64Array]", y = "[object Int8Array]", b = "[object Int16Array]", g = "[object Int32Array]", _ = "[object Uint8Array]", x = "[object Uint8ClampedArray]", w = "[object Uint16Array]", A = "[object Uint32Array]";
  function P(T, C, O) {
    var D = T.constructor;
    switch (C) {
      case h:
        return e(T);
      case a:
      case o:
        return new D(+T);
      case p:
        return t(T, O);
      case v:
      case m:
      case y:
      case b:
      case g:
      case _:
      case x:
      case w:
      case A:
        return i(T, O);
      case u:
        return new D();
      case s:
      case f:
        return new D(T);
      case l:
        return r(T);
      case c:
        return new D();
      case d:
        return n(T);
    }
  }
  return fv = P, fv;
}
var dv, aA;
function rY() {
  if (aA) return dv;
  aA = 1;
  var e = Jl(), t = pr(), r = "[object Map]";
  function n(i) {
    return t(i) && e(i) == r;
  }
  return dv = n, dv;
}
var hv, oA;
function nY() {
  if (oA) return hv;
  oA = 1;
  var e = rY(), t = xl(), r = Gy(), n = r && r.isMap, i = n ? t(n) : e;
  return hv = i, hv;
}
var vv, uA;
function iY() {
  if (uA) return vv;
  uA = 1;
  var e = Jl(), t = pr(), r = "[object Set]";
  function n(i) {
    return t(i) && e(i) == r;
  }
  return vv = n, vv;
}
var pv, sA;
function aY() {
  if (sA) return pv;
  sA = 1;
  var e = iY(), t = xl(), r = Gy(), n = r && r.isSet, i = n ? t(n) : e;
  return pv = i, pv;
}
var mv, lA;
function oY() {
  if (lA) return mv;
  lA = 1;
  var e = By(), t = VG(), r = Xy(), n = HG(), i = KG(), a = sC(), o = fC(), u = GG(), s = YG(), l = jC(), c = XG(), f = Jl(), d = ZG(), h = tY(), p = hC(), v = Dt(), m = wl(), y = nY(), b = $r(), g = aY(), _ = tg(), x = wo(), w = 1, A = 2, P = 4, T = "[object Arguments]", C = "[object Array]", O = "[object Boolean]", D = "[object Date]", j = "[object Error]", z = "[object Function]", E = "[object GeneratorFunction]", M = "[object Map]", N = "[object Number]", k = "[object Object]", R = "[object RegExp]", W = "[object Set]", Z = "[object String]", ce = "[object Symbol]", fe = "[object WeakMap]", de = "[object ArrayBuffer]", Oe = "[object DataView]", me = "[object Float32Array]", ve = "[object Float64Array]", Ue = "[object Int8Array]", U = "[object Int16Array]", Q = "[object Int32Array]", H = "[object Uint8Array]", q = "[object Uint8ClampedArray]", we = "[object Uint16Array]", F = "[object Uint32Array]", B = {};
  B[T] = B[C] = B[de] = B[Oe] = B[O] = B[D] = B[me] = B[ve] = B[Ue] = B[U] = B[Q] = B[M] = B[N] = B[k] = B[R] = B[W] = B[Z] = B[ce] = B[H] = B[q] = B[we] = B[F] = !0, B[j] = B[z] = B[fe] = !1;
  function Ee(ne, lt, Gt, _t, Yt, Fe) {
    var De, cn = lt & w, ri = lt & A, xo = lt & P;
    if (Gt && (De = Yt ? Gt(ne, _t, Yt, Fe) : Gt(ne)), De !== void 0)
      return De;
    if (!b(ne))
      return ne;
    var fn = v(ne);
    if (fn) {
      if (De = d(ne), !cn)
        return o(ne, De);
    } else {
      var yr = f(ne), Gi = yr == z || yr == E;
      if (m(ne))
        return a(ne, cn);
      if (yr == k || yr == T || Gi && !Yt) {
        if (De = ri || Gi ? {} : p(ne), !cn)
          return ri ? s(ne, i(De, ne)) : u(ne, n(De, ne));
      } else {
        if (!B[yr])
          return Yt ? ne : {};
        De = h(ne, yr, cn);
      }
    }
    Fe || (Fe = new e());
    var Ao = Fe.get(ne);
    if (Ao)
      return Ao;
    Fe.set(ne, De), g(ne) ? ne.forEach(function(jt) {
      De.add(Ee(jt, lt, Gt, jt, ne, Fe));
    }) : y(ne) && ne.forEach(function(jt, gr) {
      De.set(gr, Ee(jt, lt, Gt, gr, ne, Fe));
    });
    var Oo = xo ? ri ? c : l : ri ? x : _, jr = fn ? void 0 : Oo(ne);
    return t(jr || ne, function(jt, gr) {
      jr && (gr = jt, jt = ne[gr]), r(De, gr, Ee(jt, lt, Gt, gr, ne, Fe));
    }), De;
  }
  return mv = Ee, mv;
}
var yv, cA;
function uY() {
  if (cA) return yv;
  cA = 1;
  var e = oY(), t = 1, r = 4;
  function n(i) {
    return e(i, t | r);
  }
  return yv = n, yv;
}
var sY = uY();
const lY = /* @__PURE__ */ Ht(sY), YC = /^--/;
function cY(e, t) {
  return t == null || typeof t == "boolean" || t === "" ? "" : typeof t == "number" && t !== 0 && !YC.test(e) && !(Ia.hasOwnProperty(e) && Ia[e]) ? t + "px" : ("" + t).trim();
}
const fA = {};
function fY(e, t) {
  if (!e.nodeType || !e.setAttribute || !e.removeAttribute) return !1;
  const r = e.nodeName === "filter" || e.parentNode && e.parentNode.nodeName === "filter", { className: n, style: i, children: a, scrollTop: o, scrollLeft: u, viewBox: s, ...l } = t, c = Object.values(l), f = Object.keys(l).map((d) => r || e.hasAttribute(d) ? d : fA[d] || (fA[d] = d.replace(/([A-Z])/g, (h) => "-" + h.toLowerCase())));
  t.hasOwnProperty("children") && (e.textContent = a);
  for (const d in i) if (i.hasOwnProperty(d)) {
    const h = cY(d, i[d]);
    YC.test(d) ? e.style.setProperty(d, h) : e.style[d] = h;
  }
  f.forEach((d, h) => {
    const p = c[h];
    p !== void 0 ? e.setAttribute(d, p) : e.removeAttribute(d);
  }), t.hasOwnProperty("className") && (n !== void 0 ? e.className = n : e.removeAttribute("class")), o !== void 0 && (e.scrollTop = o), u !== void 0 && (e.scrollLeft = u), t.hasOwnProperty("viewBox") && (s !== void 0 ? e.setAttribute("viewBox", s) : e.removeAttribute("viewBox"));
}
let Ia = {
  animationIterationCount: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
};
const dY = (e, t) => e + t.charAt(0).toUpperCase() + t.substring(1), hY = [
  "Webkit",
  "Ms",
  "Moz",
  "O"
];
Ia = Object.keys(Ia).reduce((e, t) => (hY.forEach((r) => e[dY(r, t)] = e[t]), e), Ia);
const vY = /^(matrix3d|matrix|translate3d|translate[XYZ]?|scale3d|scale[XYZ]?|rotate3d|rotate[XYZ]?|skew[XY]?)$/, pY = /^(translate)/, mY = /^(rotate|skew)/, gv = (e, t) => L.num(e) && e !== 0 ? e + t : e, su = (e, t) => L.arr(e) ? e.every((r) => su(r, t)) : L.num(e) ? e === t : parseFloat(e) === t;
var yY = class extends ei {
  constructor({ x: e, y: t, z: r, ...n }) {
    const i = [], a = [];
    (e || t || r) && (i.push([
      e || 0,
      t || 0,
      r || 0
    ]), a.push((o) => [`translate3d(${o.map((u) => gv(u, "px")).join(",")})`, su(o, 0)])), bt(n, (o, u) => {
      if (u === "transform")
        i.push([o || ""]), a.push((s) => [s, s === ""]);
      else if (vY.test(u)) {
        if (delete n[u], L.und(o)) return;
        const s = pY.test(u) ? "px" : mY.test(u) ? "deg" : "";
        i.push(nt(o)), a.push(u === "rotate3d" ? ([l, c, f, d]) => [`rotate3d(${l},${c},${f},${gv(d, s)})`, su(d, 0)] : (l) => [`${u}(${l.map((c) => gv(c, s)).join(",")})`, su(l, u.startsWith("scale") ? 1 : 0)]);
      }
    }), i.length && (n.transform = new gY(i, a)), super(n);
  }
}, gY = class extends go {
  constructor(e, t) {
    super(), this.inputs = e, this.transforms = t, this._value = null;
  }
  get() {
    return this._value || (this._value = this._get());
  }
  _get() {
    let e = "", t = !0;
    return X(this.inputs, (r, n) => {
      const i = je(r[0]), [a, o] = this.transforms[n](L.arr(i) ? i : r.map(je));
      e += " " + a, t = t && o;
    }), t ? "none" : e;
  }
  observerAdded(e) {
    e == 1 && X(this.inputs, (t) => X(t, (r) => He(r) && Dr(r, this)));
  }
  observerRemoved(e) {
    e == 0 && X(this.inputs, (t) => X(t, (r) => He(r) && tn(r, this)));
  }
  eventObserved(e) {
    e.type == "change" && (this._value = null), en(this, e);
  }
};
const bY = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "big",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "keygen",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rp",
  "rt",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr",
  "circle",
  "clipPath",
  "defs",
  "ellipse",
  "foreignObject",
  "g",
  "image",
  "line",
  "linearGradient",
  "mask",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "radialGradient",
  "rect",
  "stop",
  "svg",
  "text",
  "tspan"
];
Nt.assign({
  batchedUpdates: cs,
  createStringInterpolator: bo,
  colors: fl
});
const _Y = yl(bY, {
  applyAnimatedValues: fY,
  createAnimatedStyle: (e) => new yY(e),
  getComponentProps: ({ scrollTop: e, scrollLeft: t, ...r }) => r
}), XC = _Y.animated;
function Vn() {
  return Vn = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Vn.apply(null, arguments);
}
function ZC(e, t) {
  if (e == null) return {};
  var r = {};
  for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
    if (t.indexOf(n) !== -1) continue;
    r[n] = e[n];
  }
  return r;
}
var bv = { container: { display: "flex", alignItems: "center" }, sourceChip: { marginRight: 7 }, targetChip: { marginLeft: 7, marginRight: 7 } }, wY = { center: zG, justify: KC, start: LG, end: qG }, xY = function(e) {
  return wY[e];
}, ae = { layout: "horizontal", align: "center", sort: "auto", colors: { scheme: "nivo" }, nodeOpacity: 0.75, nodeHoverOpacity: 1, nodeHoverOthersOpacity: 0.15, nodeThickness: 12, nodeInnerPadding: 0, nodeBorderWidth: 1, nodeBorderColor: { from: "color", modifiers: [["darker", 0.5]] }, nodeBorderRadius: 0, linkOpacity: 0.25, linkHoverOpacity: 0.6, linkHoverOthersOpacity: 0.15, linkContract: 0, linkBlendMode: "multiply", enableLinkGradient: !1, enableLabels: !0, label: "id", labelPosition: "inside", labelPadding: 9, labelOrientation: "horizontal", labelTextColor: { from: "color", modifiers: [["darker", 0.8]] }, labelComponent: VC, isInteractive: !0, nodeTooltip: function(e) {
  var t = e.node;
  return $(Xx, { id: t.label, enableChip: !0, color: t.color });
}, linkTooltip: function(e) {
  var t = e.link;
  return $(Xx, { id: Y("span", { style: bv.container, children: [$(mp, { color: t.source.color, style: bv.sourceChip }), $("strong", { children: t.source.label }), " > ", $("strong", { children: t.target.label }), $(mp, { color: t.target.color, style: bv.targetChip }), $("strong", { children: t.formattedValue })] }) });
}, legends: [], layers: ["links", "nodes", "labels", "legends"], role: "img", animate: !0, motionConfig: "gentle" }, AY = function(e) {
  return e.id;
}, OY = function(e) {
  var t = e.data, r = e.valueFormat, n = e.layout, i = e.width, a = e.height, o = e.sort, u = e.align, s = e.colors, l = e.nodeThickness, c = e.nodeSpacing, f = e.nodeInnerPadding, d = e.nodeBorderColor, h = e.label, p = e.labelTextColor, v = be(null), m = v[0], y = v[1], b = be(null), g = b[0], _ = b[1], x = ue((function() {
    if (o !== "auto") return o === "input" ? null : o === "ascending" ? function(k, R) {
      return k.value - R.value;
    } : o === "descending" ? function(k, R) {
      return R.value - k.value;
    } : o;
  }), [o]), w = o === "input" ? null : void 0, A = ue((function() {
    return typeof u == "function" ? u : xY(u);
  }), [u]), P = mr(), T = dG(s, "id"), C = q2(d, P), O = ZK(h), D = q2(p, P), j = zC(r), z = ue((function() {
    return (function(k) {
      var R = k.data, W = k.formatValue, Z = k.layout, ce = k.alignFunction, fe = k.sortFunction, de = k.linkSortMode, Oe = k.nodeThickness, me = k.nodeSpacing, ve = k.nodeInnerPadding, Ue = k.width, U = k.height, Q = k.getColor, H = k.getLabel, q = UG().nodeAlign(ce).nodeSort(fe).linkSort(de).nodeWidth(Oe).nodePadding(me).size(Z === "horizontal" ? [Ue, U] : [U, Ue]).nodeId(AY), we = lY(R);
      return q(we), we.nodes.forEach((function(F) {
        if (F.color = Q(F), F.label = H(F), F.formattedValue = W(F.value), Z === "horizontal") F.x = F.x0 + ve, F.y = F.y0, F.width = Math.max(F.x1 - F.x0 - 2 * ve, 0), F.height = Math.max(F.y1 - F.y0, 0);
        else {
          F.x = F.y0, F.y = F.x0 + ve, F.width = Math.max(F.y1 - F.y0, 0), F.height = Math.max(F.x1 - F.x0 - 2 * ve, 0);
          var B = F.x0, Ee = F.x1;
          F.x0 = F.y0, F.x1 = F.y1, F.y0 = B, F.y1 = Ee;
        }
      })), we.links.forEach((function(F) {
        F.formattedValue = W(F.value), F.color = F.source.color, F.pos0 = F.y0, F.pos1 = F.y1, F.thickness = F.width, delete F.y0, delete F.y1, delete F.width;
      })), we;
    })({ data: t, formatValue: j, layout: n, alignFunction: A, sortFunction: x, linkSortMode: w, nodeThickness: l, nodeSpacing: c, nodeInnerPadding: f, width: i, height: a, getColor: T, getLabel: O });
  }), [t, j, n, A, x, w, l, c, f, i, a, T, O]), E = z.nodes, M = z.links, N = ue((function() {
    return E.map((function(k) {
      return { id: k.id, label: k.label, color: k.color };
    }));
  }), [E]);
  return { nodes: E, links: M, legendData: N, getNodeBorderColor: C, currentNode: m, setCurrentNode: y, currentLink: g, setCurrentLink: _, getLabelTextColor: D };
}, SY = function(e) {
  var t = e.node, r = e.x, n = e.y, i = e.width, a = e.height, o = e.color, u = e.opacity, s = e.borderWidth, l = e.borderColor, c = e.borderRadius, f = e.setCurrent, d = e.isInteractive, h = e.onClick, p = e.tooltip, v = ti(), m = v.animate, y = v.config, b = Ki({ x: r, y: n, width: i, height: a, opacity: u, color: o, config: y, immediate: !m }), g = CC(), _ = g.showTooltipFromEvent, x = g.hideTooltip, w = re((function(C) {
    f(t), _(ur(p, { node: t }), C, "left");
  }), [f, t, _, p]), A = re((function(C) {
    _(ur(p, { node: t }), C, "left");
  }), [_, t, p]), P = re((function() {
    f(null), x();
  }), [f, x]), T = re((function(C) {
    h == null || h(t, C);
  }), [h, t]);
  return $(XC.rect, { x: b.x, y: b.y, rx: c, ry: c, width: b.width.to((function(C) {
    return Math.max(C, 0);
  })), height: b.height.to((function(C) {
    return Math.max(C, 0);
  })), fill: b.color, fillOpacity: b.opacity, strokeWidth: s, stroke: l, strokeOpacity: u, onMouseEnter: d ? w : void 0, onMouseMove: d ? A : void 0, onMouseLeave: d ? P : void 0, onClick: d ? T : void 0 });
}, EY = function(e) {
  var t = e.nodes, r = e.nodeOpacity, n = e.nodeHoverOpacity, i = e.nodeHoverOthersOpacity, a = e.borderWidth, o = e.getBorderColor, u = e.borderRadius, s = e.setCurrentNode, l = e.currentNode, c = e.currentLink, f = e.isCurrentNode, d = e.isInteractive, h = e.onClick, p = e.tooltip, v = function(m) {
    return l || c ? f(m) ? n : i : r;
  };
  return $(Hn, { children: t.map((function(m) {
    return $(SY, { node: m, x: m.x, y: m.y, width: m.width, height: m.height, color: m.color, opacity: v(m), borderWidth: a, borderColor: o(m), borderRadius: u, setCurrent: s, isInteractive: d, onClick: h, tooltip: p }, m.id);
  })) });
}, PY = function(e) {
  var t = e.id, r = e.layout, n = e.startColor, i = e.endColor;
  return Y("linearGradient", Vn({ id: t, spreadMethod: "pad" }, r === "horizontal" ? { x1: "0%", x2: "100%", y1: "0%", y2: "0%" } : { x1: "0%", x2: "0%", y1: "0%", y2: "100%" }, { children: [$("stop", { offset: "0%", stopColor: n }), $("stop", { offset: "100%", stopColor: i })] }));
}, TY = function(e) {
  var t = e.link, r = e.layout, n = e.path, i = e.color, a = e.opacity, o = e.blendMode, u = e.enableGradient, s = e.setCurrent, l = e.tooltip, c = e.isInteractive, f = e.onClick, d = t.source.id + "." + t.target.id + "." + t.index, h = ti(), p = h.animate, v = h.config, m = UK(n), y = Ki({ color: i, opacity: a, config: v, immediate: !p }), b = CC(), g = b.showTooltipFromEvent, _ = b.hideTooltip, x = re((function(T) {
    s(t), g(ur(l, { link: t }), T, "left");
  }), [s, t, g, l]), w = re((function(T) {
    g(ur(l, { link: t }), T, "left");
  }), [g, t, l]), A = re((function() {
    s(null), _();
  }), [s, _]), P = re((function(T) {
    f == null || f(t, T);
  }), [f, t]);
  return Y(Hn, { children: [u && $(PY, { id: d, layout: r, startColor: t.startColor || t.source.color, endColor: t.endColor || t.target.color }), $(XC.path, { fill: u ? 'url("#' + encodeURI(d) + '")' : y.color, d: m, fillOpacity: y.opacity, onMouseEnter: c ? x : void 0, onMouseMove: c ? w : void 0, onMouseLeave: c ? A : void 0, onClick: c ? P : void 0, style: { mixBlendMode: o } })] });
}, CY = function(e) {
  var t = e.links, r = e.layout, n = e.linkOpacity, i = e.linkHoverOpacity, a = e.linkHoverOthersOpacity, o = e.linkContract, u = e.linkBlendMode, s = e.enableLinkGradient, l = e.setCurrentLink, c = e.currentLink, f = e.currentNode, d = e.isCurrentLink, h = e.isInteractive, p = e.onClick, v = e.tooltip, m = function(b) {
    return f || c ? d(b) ? i : a : n;
  }, y = ue((function() {
    return r === "horizontal" ? (b = fu().curve(jp), function(g, _) {
      var x = Math.max(1, g.thickness - 2 * _) / 2, w = 0.12 * (g.target.x0 - g.source.x1), A = [[g.source.x1, g.pos0 - x], [g.source.x1 + w, g.pos0 - x], [g.target.x0 - w, g.pos1 - x], [g.target.x0, g.pos1 - x], [g.target.x0, g.pos1 + x], [g.target.x0 - w, g.pos1 + x], [g.source.x1 + w, g.pos0 + x], [g.source.x1, g.pos0 + x], [g.source.x1, g.pos0 - x]];
      return b(A) + "Z";
    }) : (function() {
      var g = fu().curve(Lp);
      return function(_, x) {
        var w = Math.max(1, _.thickness - 2 * x) / 2, A = 0.12 * (_.target.y0 - _.source.y1), P = [[_.pos0 + w, _.source.y1], [_.pos0 + w, _.source.y1 + A], [_.pos1 + w, _.target.y0 - A], [_.pos1 + w, _.target.y0], [_.pos1 - w, _.target.y0], [_.pos1 - w, _.target.y0 - A], [_.pos0 - w, _.source.y1 + A], [_.pos0 - w, _.source.y1], [_.pos0 + w, _.source.y1]];
        return g(P) + "Z";
      };
    })();
    var b;
  }), [r]);
  return $(Hn, { children: t.map((function(b) {
    return $(TY, { link: b, layout: r, path: y(b, o), color: b.color, opacity: m(b), blendMode: u, enableGradient: s, setCurrent: l, isInteractive: h, onClick: p, tooltip: v }, b.source.id + "." + b.target.id + "." + b.index);
  })) });
}, IY = function(e) {
  var t = e.nodes, r = e.layout, n = e.width, i = e.height, a = e.labelPosition, o = e.labelPadding, u = e.labelOrientation, s = e.getLabelTextColor, l = e.labelComponent, c = mr(), f = u === "vertical" ? -90 : 0, d = t.map((function(y) {
    var b, g, _;
    return r === "horizontal" ? (g = y.y + y.height / 2, y.x < n / 2 ? a === "inside" ? (b = y.x1 + o, _ = u === "vertical" ? "middle" : "start") : (b = y.x - o, _ = u === "vertical" ? "middle" : "end") : a === "inside" ? (b = y.x - o, _ = u === "vertical" ? "middle" : "end") : (b = y.x1 + o, _ = u === "vertical" ? "middle" : "start")) : r === "vertical" && (b = y.x + y.width / 2, y.y < i / 2 ? a === "inside" ? (g = y.y1 + o, _ = u === "vertical" ? "end" : "middle") : (g = y.y - o, _ = u === "vertical" ? "start" : "middle") : a === "inside" ? (g = y.y - o, _ = u === "vertical" ? "start" : "middle") : (g = y.y1 + o, _ = u === "vertical" ? "end" : "middle")), { id: y.id, label: y.label, x: b, y: g, textAnchor: _, color: s(y) };
  })), h = ti(), p = h.animate, v = h.config, m = rC(d.length, d.map((function(y) {
    return { transform: "translate(" + y.x + ", " + y.y + ") rotate(" + f + ")", color: y.color, config: v, immediate: !p };
  })));
  return $(Hn, { children: m.map((function(y, b) {
    var g = d[b];
    return $(l, { dominantBaseline: "central", textAnchor: g.textAnchor, transform: y.transform, style: Vn({}, c.labels.text, { fill: y.color, pointerEvents: "none" }), node: t[b], children: g.label }, g.id);
  })) });
}, kY = ["isInteractive", "animate", "motionConfig", "theme", "renderWrapper"], MY = function(e) {
  var t = e.data, r = e.valueFormat, n = e.layout, i = n === void 0 ? ae.layout : n, a = e.sort, o = a === void 0 ? ae.sort : a, u = e.align, s = u === void 0 ? ae.align : u, l = e.width, c = e.height, f = e.margin, d = e.colors, h = d === void 0 ? ae.colors : d, p = e.nodeThickness, v = p === void 0 ? ae.nodeThickness : p, m = e.nodeSpacing, y = m === void 0 ? ae.nodeThickness : m, b = e.nodeInnerPadding, g = b === void 0 ? ae.nodeInnerPadding : b, _ = e.nodeBorderColor, x = _ === void 0 ? ae.nodeBorderColor : _, w = e.nodeOpacity, A = w === void 0 ? ae.nodeOpacity : w, P = e.nodeHoverOpacity, T = P === void 0 ? ae.nodeHoverOpacity : P, C = e.nodeHoverOthersOpacity, O = C === void 0 ? ae.nodeHoverOthersOpacity : C, D = e.nodeBorderWidth, j = D === void 0 ? ae.nodeBorderWidth : D, z = e.nodeBorderRadius, E = z === void 0 ? ae.nodeBorderRadius : z, M = e.linkOpacity, N = M === void 0 ? ae.linkOpacity : M, k = e.linkHoverOpacity, R = k === void 0 ? ae.linkHoverOpacity : k, W = e.linkHoverOthersOpacity, Z = W === void 0 ? ae.linkHoverOthersOpacity : W, ce = e.linkContract, fe = ce === void 0 ? ae.linkContract : ce, de = e.linkBlendMode, Oe = de === void 0 ? ae.linkBlendMode : de, me = e.enableLinkGradient, ve = me === void 0 ? ae.enableLinkGradient : me, Ue = e.enableLabels, U = Ue === void 0 ? ae.enableLabels : Ue, Q = e.labelComponent, H = Q === void 0 ? ae.labelComponent : Q, q = e.labelPosition, we = q === void 0 ? ae.labelPosition : q, F = e.labelPadding, B = F === void 0 ? ae.labelPadding : F, Ee = e.labelOrientation, ne = Ee === void 0 ? ae.labelOrientation : Ee, lt = e.label, Gt = lt === void 0 ? ae.label : lt, _t = e.labelTextColor, Yt = _t === void 0 ? ae.labelTextColor : _t, Fe = e.nodeTooltip, De = Fe === void 0 ? ae.nodeTooltip : Fe, cn = e.linkTooltip, ri = cn === void 0 ? ae.linkTooltip : cn, xo = e.isInteractive, fn = xo === void 0 ? ae.isInteractive : xo, yr = e.onClick, Gi = e.legends, Ao = Gi === void 0 ? ae.legends : Gi, Oo = e.layers, jr = Oo === void 0 ? ae.layers : Oo, jt = e.role, gr = jt === void 0 ? ae.role : jt, nI = e.ariaLabel, iI = e.ariaLabelledBy, aI = e.ariaDescribedBy, oI = e.forwardedRef, Yi = KK(l, c, f), ec = Yi.margin, tc = Yi.innerWidth, rc = Yi.innerHeight, nc = Yi.outerWidth, ic = Yi.outerHeight, br = OY({ data: t, valueFormat: r, layout: i, width: tc, height: rc, sort: o, align: s, colors: h, nodeThickness: v, nodeSpacing: y, nodeInnerPadding: g, nodeBorderColor: x, label: Gt, labelTextColor: Yt }), So = br.nodes, Xi = br.links, uI = br.legendData, sI = br.getNodeBorderColor, Lt = br.currentNode, ac = br.setCurrentNode, Xt = br.currentLink, oc = br.setCurrentLink, lI = br.getLabelTextColor, ng = ue((function() {
    var _r = function() {
      return !1;
    }, dn = function() {
      return !1;
    };
    if (Xt && (_r = function(ut) {
      var wt = ut.id;
      return wt === Xt.source.id || wt === Xt.target.id;
    }, dn = function(ut) {
      var wt = ut.source, hn = ut.target;
      return wt.id === Xt.source.id && hn.id === Xt.target.id;
    }), Lt) {
      var Lr = [Lt.id];
      Xi.filter((function(ut) {
        var wt = ut.source, hn = ut.target;
        return wt.id === Lt.id || hn.id === Lt.id;
      })).forEach((function(ut) {
        var wt = ut.source, hn = ut.target;
        Lr.push(wt.id), Lr.push(hn.id);
      })), Lr = hW(Lr), _r = function(ut) {
        var wt = ut.id;
        return Lr.includes(wt);
      }, dn = function(ut) {
        var wt = ut.source, hn = ut.target;
        return wt.id === Lt.id || hn.id === Lt.id;
      };
    }
    return { isCurrentNode: _r, isCurrentLink: dn };
  }), [Xt, Lt, Xi]), uc = ng.isCurrentNode, sc = ng.isCurrentLink, cI = ue((function() {
    return { links: Xi, nodes: So, margin: ec, width: l, height: c, outerWidth: nc, outerHeight: ic, currentNode: Lt, isCurrentNode: uc, setCurrentNode: ac, currentLink: Xt, isCurrentLink: sc, setCurrentLink: oc, isInteractive: fn };
  }), [Xi, So, ec, l, c, nc, ic, Lt, uc, ac, Xt, sc, oc, fn]), ni = { links: null, nodes: null, labels: null, legends: null };
  return jr.includes("links") && (ni.links = $(CY, { links: Xi, layout: i, linkContract: fe, linkOpacity: N, linkHoverOpacity: R, linkHoverOthersOpacity: Z, linkBlendMode: Oe, enableLinkGradient: ve, setCurrentLink: oc, currentNode: Lt, currentLink: Xt, isCurrentLink: sc, isInteractive: fn, onClick: yr, tooltip: ri }, "links")), jr.includes("nodes") && (ni.nodes = $(EY, { nodes: So, nodeOpacity: A, nodeHoverOpacity: T, nodeHoverOthersOpacity: O, borderWidth: j, borderRadius: E, getBorderColor: sI, setCurrentNode: ac, currentNode: Lt, currentLink: Xt, isCurrentNode: uc, isInteractive: fn, onClick: yr, tooltip: De }, "nodes")), jr.includes("labels") && U && (ni.labels = $(IY, { nodes: So, layout: i, width: tc, height: rc, labelPosition: we, labelPadding: B, labelOrientation: ne, getLabelTextColor: lI, labelComponent: H }, "labels")), jr.includes("legends") && (ni.legends = $(ig, { children: Ao.map((function(_r, dn) {
    return $(DG, Vn({}, _r, { containerWidth: tc, containerHeight: rc, data: uI }), "legend" + dn);
  })) }, "legends")), $(FK, { width: nc, height: ic, margin: ec, role: gr, ariaLabel: nI, ariaLabelledBy: iI, ariaDescribedBy: aI, ref: oI, children: jr.map((function(_r, dn) {
    var Lr;
    return typeof _r == "function" ? $(ig, { children: ur(_r, cI) }, dn) : (Lr = ni == null ? void 0 : ni[_r]) != null ? Lr : null;
  })) });
}, NY = Ke((function(e, t) {
  var r = e.isInteractive, n = r === void 0 ? ae.isInteractive : r, i = e.animate, a = i === void 0 ? ae.animate : i, o = e.motionConfig, u = o === void 0 ? ae.motionConfig : o, s = e.theme, l = e.renderWrapper, c = ZC(e, kY);
  return $(TK, { animate: a, isInteractive: n, motionConfig: u, renderWrapper: l, theme: s, children: $(MY, Vn({ isInteractive: n }, c, { forwardedRef: t })) });
})), RY = ["defaultWidth", "defaultHeight", "onResize", "debounceResize"], $Y = Ke((function(e, t) {
  var r = e.defaultWidth, n = e.defaultHeight, i = e.onResize, a = e.debounceResize, o = ZC(e, RY);
  return $(kK, { defaultWidth: r, defaultHeight: n, onResize: i, debounceResize: a, children: function(u) {
    var s = u.width, l = u.height;
    return $(NY, Vn({ width: s, height: l }, o, { ref: t }));
  } });
}));
const ss = {
  Cardiovascular: ["Coronary artery disease", "Heart failure", "Hypertension"],
  Respiratory: ["Asthma", "COPD", "Lung fibrosis"],
  Cancer: ["Lung cancer", "Breast cancer", "Colorectal cancer"],
  Neurologic: ["Stroke", "Alzheimer's", "Parkinson's"]
}, _a = [
  "Echocardiography",
  "Spirometry",
  "CT imaging",
  "Blood panel",
  "Genetic sequencing"
], DY = {
  Cardiovascular: [0.7, 0.1, 0.2, 0.8, 0.3],
  Respiratory: [0.1, 0.8, 0.3, 0.6, 0.2],
  Cancer: [0.1, 0.1, 0.7, 0.7, 0.8],
  Neurologic: [0.15, 0.1, 0.6, 0.5, 0.2]
}, QC = ["Male", "Female"], jY = {
  Cardiovascular: [0.68, 0.32],
  Respiratory: [0.45, 0.55],
  Cancer: [0.35, 0.65],
  Neurologic: [0.55, 0.45]
}, JC = [
  "White",
  "Black/African American",
  "Asian",
  "Other/Multiple"
], LY = {
  Cardiovascular: [0.45, 0.35, 0.1, 0.1],
  Respiratory: [0.6, 0.15, 0.15, 0.1],
  Cancer: [0.55, 0.2, 0.18, 0.07],
  Neurologic: [0.7, 0.12, 0.1, 0.08]
}, eI = ["Hispanic/Latino", "Not Hispanic/Latino"], qY = {
  Cardiovascular: [0.25, 0.75],
  Respiratory: [0.3, 0.7],
  Cancer: [0.1, 0.9],
  Neurologic: [0.12, 0.88]
}, tI = ["Never", "Former", "Current"], zY = {
  Cardiovascular: [0.2, 0.4, 0.4],
  Respiratory: [0.1, 0.3, 0.6],
  Cancer: [0.15, 0.35, 0.5],
  Neurologic: [0.55, 0.3, 0.15]
};
function ha(e, t, r) {
  const n = e();
  let i = 0;
  for (let a = 0; a < r.length; a++)
    if (i += r[a], n < i) return t[a];
  return t[t.length - 1];
}
function FY(e) {
  let t = e;
  return () => (t = t * 1664525 + 1013904223 & 4294967295, (t >>> 0) / 4294967296);
}
function BY() {
  const e = FY(42), t = Object.keys(ss), r = [0.38, 0.24, 0.2, 0.18], n = [];
  for (let i = 0; i < 1e3; i++) {
    const a = ha(e, t, r), o = ss[a], u = o[Math.floor(e() * o.length)], s = [], l = DY[a];
    for (let p = 0; p < _a.length; p++)
      e() < l[p] && s.push(_a[p]);
    s.length === 0 && s.push(_a[Math.floor(e() * _a.length)]);
    const c = ha(e, QC, jY[a]), f = ha(e, JC, LY[a]), d = ha(e, eI, qY[a]), h = ha(e, tI, zY[a]);
    n.push({
      conditionCategory: a,
      condition: u,
      procedures: s,
      sex: c,
      race: f,
      ethnicity: d,
      smokingStatus: h
    });
  }
  return n;
}
const wp = BY(), dA = {
  conditionCategories: [],
  conditions: [],
  procedures: [],
  sex: [],
  race: [],
  ethnicity: [],
  smokingStatus: []
};
function WY(e, t) {
  return e.filter((r) => !(t.conditionCategories.length > 0 && !t.conditionCategories.includes(r.conditionCategory) || t.conditions.length > 0 && !t.conditions.includes(r.condition) || t.procedures.length > 0 && !t.procedures.some((n) => r.procedures.includes(n)) || t.sex.length > 0 && !t.sex.includes(r.sex) || t.race.length > 0 && !t.race.includes(r.race) || t.ethnicity.length > 0 && !t.ethnicity.includes(r.ethnicity) || t.smokingStatus.length > 0 && !t.smokingStatus.includes(r.smokingStatus)));
}
function rI(e) {
  const t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Map();
  for (const o of e) {
    const u = t.get(o.conditionCategory) ?? {
      total: 0,
      children: /* @__PURE__ */ new Map()
    };
    u.total++, u.children.set(o.condition, (u.children.get(o.condition) ?? 0) + 1), t.set(o.conditionCategory, u);
    for (const s of o.procedures)
      r.set(s, (r.get(s) ?? 0) + 1);
  }
  const i = Object.keys(ss).filter((o) => t.has(o)).map((o) => {
    const u = t.get(o);
    return {
      name: o,
      value: u.total,
      children: (ss[o] ?? []).filter((s) => u.children.has(s)).map((s) => ({ name: s, value: u.children.get(s) }))
    };
  }), a = _a.filter((o) => r.has(o)).map(
    (o) => ({
      name: o,
      value: r.get(o)
    })
  );
  return { conditions: i, procedures: a };
}
rI(wp);
const Jo = [
  { key: "sex", options: QC },
  { key: "race", options: JC },
  { key: "ethnicity", options: eI },
  { key: "smokingStatus", options: tI }
], UY = ["Sex", "Race", "Ethnicity", "Smoking"];
function VY(e) {
  if (e.length === 0)
    return { nodes: [], links: [] };
  const t = [], r = /* @__PURE__ */ new Set();
  for (const a of Jo)
    for (const o of a.options) {
      const u = `${a.key}:${o}`;
      r.add(u), t.push({ id: u });
    }
  const n = /* @__PURE__ */ new Map();
  for (const a of e)
    for (let o = 0; o < Jo.length - 1; o++) {
      const u = Jo[o], s = Jo[o + 1], l = `${u.key}:${a[u.key]}`, c = `${s.key}:${a[s.key]}`, f = `${l}|${c}`;
      n.set(f, (n.get(f) ?? 0) + 1);
    }
  const i = [];
  for (const [a, o] of n) {
    const [u, s] = a.split("|");
    i.push({ source: u, target: s, value: o });
  }
  return { nodes: t, links: i };
}
const HY = {
  sex: "sex",
  race: "race",
  ethnicity: "ethnicity",
  smokingStatus: "smokingStatus"
};
function KY(e) {
  const t = String(e.id);
  return `${t.indexOf(":") >= 0 ? t.slice(t.indexOf(":") + 1) : t} (${e.value.toLocaleString()})`;
}
function GY({
  data: e,
  onFilterAdd: t
}) {
  return e.nodes.length === 0 ? /* @__PURE__ */ Y("div", { className: "chart-panel", children: [
    /* @__PURE__ */ $("h3", { children: "Demographics" }),
    /* @__PURE__ */ $("p", { className: "filter-hint", children: "No participants match current filters" })
  ] }) : /* @__PURE__ */ Y("div", { className: "chart-panel", children: [
    /* @__PURE__ */ $("h3", { children: "Demographics" }),
    /* @__PURE__ */ $("div", { className: "sankey-labels", children: UY.map((r) => /* @__PURE__ */ $("span", { className: "sankey-column-label", children: r }, r)) }),
    /* @__PURE__ */ $("div", { style: { height: 400 }, children: /* @__PURE__ */ $(
      $Y,
      {
        data: e,
        margin: { top: 10, right: 160, bottom: 10, left: 10 },
        align: "justify",
        colors: { scheme: "category10" },
        nodeOpacity: 1,
        nodeThickness: 16,
        nodeInnerPadding: 3,
        nodeBorderWidth: 0,
        linkOpacity: 0.4,
        linkHoverOthersOpacity: 0.1,
        linkContract: 1,
        enableLinkGradient: !0,
        labelPosition: "outside",
        labelOrientation: "horizontal",
        labelPadding: 8,
        labelTextColor: { from: "color", modifiers: [["darker", 1.2]] },
        label: (r) => KY(r),
        isInteractive: !0,
        onClick: (r) => {
          if ("id" in r && typeof r.id == "string") {
            const n = r.id;
            if (!n.includes(":")) return;
            const i = n.slice(0, n.indexOf(":")), a = n.slice(n.indexOf(":") + 1), o = HY[i];
            o && t(o, a);
          }
        }
      }
    ) })
  ] });
}
function YY({
  filters: e,
  onRemove: t,
  onClear: r,
  totalCount: n,
  filteredCount: i
}) {
  return e.conditionCategories.length > 0 || e.conditions.length > 0 || e.procedures.length > 0 || e.sex.length > 0 || e.race.length > 0 || e.ethnicity.length > 0 || e.smokingStatus.length > 0 ? /* @__PURE__ */ Y("div", { className: "filter-panel", children: [
    /* @__PURE__ */ Y("div", { className: "filter-header", children: [
      /* @__PURE__ */ $("h3", { children: "Filters" }),
      /* @__PURE__ */ $("button", { type: "button", className: "filter-clear", onClick: r, children: "Clear all" })
    ] }),
    /* @__PURE__ */ Y("p", { className: "filter-count", children: [
      i.toLocaleString(),
      " of ",
      n.toLocaleString(),
      " ",
      "participants"
    ] }),
    e.conditionCategories.map((o) => /* @__PURE__ */ Y(
      "button",
      {
        type: "button",
        className: "filter-chip chip-condition",
        onClick: () => t("conditionCategories", o),
        children: [
          o,
          " ×"
        ]
      },
      `cat-${o}`
    )),
    e.conditions.map((o) => /* @__PURE__ */ Y(
      "button",
      {
        type: "button",
        className: "filter-chip chip-condition",
        onClick: () => t("conditions", o),
        children: [
          o,
          " ×"
        ]
      },
      `cond-${o}`
    )),
    e.procedures.map((o) => /* @__PURE__ */ Y(
      "button",
      {
        type: "button",
        className: "filter-chip chip-procedure",
        onClick: () => t("procedures", o),
        children: [
          o,
          " ×"
        ]
      },
      `proc-${o}`
    )),
    ["sex", "race", "ethnicity", "smokingStatus"].flatMap(
      (o) => e[o].map((u) => /* @__PURE__ */ Y(
        "button",
        {
          type: "button",
          className: "filter-chip chip-demographic",
          onClick: () => t(o, u),
          children: [
            u,
            " ×"
          ]
        },
        `${o}-${u}`
      ))
    )
  ] }) : /* @__PURE__ */ Y("div", { className: "filter-panel", children: [
    /* @__PURE__ */ $("h3", { children: "Filters" }),
    /* @__PURE__ */ $("p", { className: "filter-hint", children: "Click a chart segment to filter" })
  ] });
}
const xp = "";
function XY({
  study: e,
  palette: t
}) {
  const r = {
    PRESENT: t.binary[0],
    ABSENT: t.binary[1]
  }, n = {
    "OMOP:8507": t.binary[0],
    "OMOP:8532": t.binary[1]
  }, [i, a] = be([]), [o, u] = be([]);
  pe(() => {
    fetch(`${xp}/api/studies/${e.id}/conditions`).then((c) => c.json()).then((c) => a(c.conditions ?? [])).catch(() => {
    }), fetch(`${xp}/api/studies/${e.id}/participants`).then((c) => c.json()).then((c) => {
      const f = {};
      for (const d of c.participants) {
        const h = d.sex || "Unknown";
        f[h] = (f[h] || 0) + 1;
      }
      u(
        Object.entries(f).map(([d, h]) => ({ sex: d, count: h }))
      );
    }).catch(() => {
    });
  }, [e.id]);
  const s = i.map((c) => ({
    name: `${c.condition_concept} (${c.condition_status})`,
    value: c.count,
    color: r[c.condition_status] ?? t.uncategorized
  })), l = o.map((c) => ({
    name: c.sex === "OMOP:8507" ? "Male" : c.sex === "OMOP:8532" ? "Female" : c.sex,
    value: c.count,
    color: n[c.sex] ?? t.uncategorized
  }));
  return /* @__PURE__ */ Y("div", { className: "study-card", children: [
    /* @__PURE__ */ Y("div", { className: "study-header", children: [
      /* @__PURE__ */ $("h2", { children: e.name }),
      /* @__PURE__ */ $("code", { children: e.id }),
      /* @__PURE__ */ $("p", { children: e.description }),
      /* @__PURE__ */ Y("span", { className: "participant-count", children: [
        e.participant_count.toLocaleString(),
        " participants"
      ] })
    ] }),
    /* @__PURE__ */ Y("div", { className: "chart-grid", children: [
      s.length > 0 && /* @__PURE__ */ Y("div", { className: "chart-panel", children: [
        /* @__PURE__ */ $("h3", { children: "Conditions" }),
        /* @__PURE__ */ $(Eu, { width: "100%", height: 280, children: /* @__PURE__ */ Y(es, { children: [
          /* @__PURE__ */ $(
            bi,
            {
              data: s,
              dataKey: "value",
              nameKey: "name",
              cx: "50%",
              cy: "50%",
              innerRadius: 40,
              outerRadius: 100,
              children: s.map((c, f) => /* @__PURE__ */ $(Gr, { stroke: xa, fill: c.color }, f))
            }
          ),
          /* @__PURE__ */ $(Ku, {}),
          /* @__PURE__ */ $(Pu, {})
        ] }) })
      ] }),
      l.length > 0 && /* @__PURE__ */ Y("div", { className: "chart-panel", children: [
        /* @__PURE__ */ $("h3", { children: "Sex Distribution" }),
        /* @__PURE__ */ $(Eu, { width: "100%", height: 280, children: /* @__PURE__ */ Y(es, { children: [
          /* @__PURE__ */ $(
            bi,
            {
              data: l,
              dataKey: "value",
              nameKey: "name",
              cx: "50%",
              cy: "50%",
              innerRadius: 40,
              outerRadius: 100,
              children: l.map((c, f) => /* @__PURE__ */ $(Gr, { stroke: xa, fill: c.color }, f))
            }
          ),
          /* @__PURE__ */ $(Ku, {}),
          /* @__PURE__ */ $(Pu, {})
        ] }) })
      ] })
    ] })
  ] });
}
function uX() {
  const [e, t] = be("demo"), [r, n] = be([]), [i, a] = be(!1), [o, u] = be(null), [s, l] = be(dA), [c, f] = be(CB), d = o_[c];
  pe(() => {
    if (e === "demo") {
      n([]), a(!1), u(null);
      return;
    }
    n([]), a(!0), u(null), fetch(`${xp}/api/studies`).then((g) => {
      if (!g.ok) throw new Error(`HTTP ${g.status}`);
      return g.json();
    }).then((g) => n(g.studies)).catch((g) => u(g.message)).finally(() => a(!1));
  }, [e]);
  const h = ue(
    () => WY(wp, s),
    [s]
  ), p = ue(() => rI(h), [h]), v = ue(() => VY(h), [h]), m = re(
    (g, _) => {
      l((x) => {
        const w = x[g];
        return w.includes(_) ? { ...x, [g]: w.filter((A) => A !== _) } : { ...x, [g]: [...w, _] };
      });
    },
    []
  );
  function y(g, _) {
    l((x) => ({
      ...x,
      [g]: x[g].filter((w) => w !== _)
    }));
  }
  function b() {
    l(dA);
  }
  return /* @__PURE__ */ Y("div", { className: "app", children: [
    /* @__PURE__ */ Y("header", { children: [
      /* @__PURE__ */ $("div", { className: "brand-bar", children: /* @__PURE__ */ $("img", { className: "brand-logo", src: "/branding/bdc-logo.svg", alt: "" }) }),
      /* @__PURE__ */ Y("div", { className: "header-row", children: [
        /* @__PURE__ */ Y("div", { children: [
          /* @__PURE__ */ $("h1", { children: "Study Palette" }),
          /* @__PURE__ */ Y("p", { children: [
            "NHLBI BioData Catalyst",
            /* @__PURE__ */ $("sup", { children: "®" }),
            " (BDC) Meta-Analysis Study Builder & Query Tool"
          ] })
        ] }),
        /* @__PURE__ */ Y("div", { className: "header-controls", children: [
          /* @__PURE__ */ Y("label", { className: "palette-picker", children: [
            /* @__PURE__ */ $("span", { children: "Figure palette" }),
            /* @__PURE__ */ $(
              "select",
              {
                value: c,
                onChange: (g) => f(g.target.value),
                children: Object.entries(o_).map(([g, _]) => /* @__PURE__ */ $("option", { value: g, children: _.label }, g))
              }
            )
          ] }),
          /* @__PURE__ */ $(
            "button",
            {
              className: `mode-toggle ${e}`,
              onClick: () => t(e === "demo" ? "live" : "demo"),
              children: e === "demo" ? "Demo Data" : "Live API"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ Y("main", { children: [
      i && /* @__PURE__ */ $("p", { className: "status", children: "Loading..." }),
      o && /* @__PURE__ */ Y("p", { className: "status error", children: [
        "Error: ",
        o
      ] }),
      e === "demo" && /* @__PURE__ */ Y("div", { className: "demo-layout", children: [
        /* @__PURE__ */ $(
          YY,
          {
            filters: s,
            onRemove: y,
            onClear: b,
            totalCount: wp.length,
            filteredCount: h.length
          }
        ),
        /* @__PURE__ */ Y("div", { className: "demo-content", children: [
          /* @__PURE__ */ $(
            MB,
            {
              data: p,
              filters: s,
              onFilterAdd: m,
              palette: d
            }
          ),
          /* @__PURE__ */ $(
            GY,
            {
              data: v,
              onFilterAdd: m
            }
          )
        ] })
      ] }),
      e === "live" && r.map((g) => /* @__PURE__ */ $(XY, { study: g, palette: d }, g.id))
    ] })
  ] });
}
export {
  uX as CohortBuilder
};
//# sourceMappingURL=index.js.map
