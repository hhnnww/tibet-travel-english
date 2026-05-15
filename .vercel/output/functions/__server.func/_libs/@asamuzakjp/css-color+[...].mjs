import { n as __esmMin, r as __exportAll } from "../../_runtime.mjs";
//#region node_modules/@asamuzakjp/generational-cache/src/index.js
var GenerationalCache;
var init_src = __esmMin((() => {
	GenerationalCache = class {
		#max;
		#boundary;
		#current = /* @__PURE__ */ new Map();
		#old = /* @__PURE__ */ new Map();
		/**
		* Initializes a new instance of the GenerationalCache class.
		* @param {number} max - The maximum number of items the cache can hold.
		*/
		constructor(max) {
			this.max = max;
		}
		/**
		* Returns the total number of `entries` currently in the cache.
		* @note To optimize for write speed, this library allows temporary key
		* duplication between generations. Therefore, this value may not always
		* reflect the exact count of unique `keys`.
		* @returns {number} The total entry count.
		*/
		get size() {
			return this.#current.size + this.#old.size;
		}
		/**
		* Returns the maximum capacity of the cache.
		* @returns {number} The maximum size limit.
		*/
		get max() {
			return this.#max;
		}
		/**
		* Sets the maximum capacity of the cache and recalculates the boundary.
		* Clears the cache when updated.
		* @param {number} value - The new maximum capacity to set.
		*/
		set max(value) {
			if (Number.isFinite(value) && value > 4) {
				this.#max = value;
				this.#boundary = Math.ceil(value / 2);
			} else {
				this.#max = 4;
				this.#boundary = 2;
			}
			this.clear();
		}
		/**
		* Retrieves an item from the cache.
		* If the item is in the older generation, it gets promoted to the current
		* generation.
		* @param {K} key - The key of the element to return.
		* @returns {V | undefined} The element associated with the specified key, or
		* undefined if the key cannot be found.
		*/
		get(key) {
			let value = this.#current.get(key);
			if (value !== void 0) return value;
			value = this.#old.get(key);
			if (value !== void 0) {
				this.set(key, value);
				return value;
			}
		}
		/**
		* Adds or updates an element with a specified key and a value to the cache.
		* @param {K} key - The key of the element to add.
		* @param {V} value - The value of the element to add.
		* @returns {GenerationalCache} The cache object itself.
		*/
		set(key, value) {
			this.#current.set(key, value);
			if (this.#current.size >= this.#boundary) {
				this.#old = this.#current;
				this.#current = /* @__PURE__ */ new Map();
			}
			return this;
		}
		/**
		* Returns a boolean indicating whether an element with the specified key
		* exists or not.
		* @param {K} key - The key of the element to test for presence.
		* @returns {boolean} true if an element with the specified key exists in the
		* cache; otherwise false.
		*/
		has(key) {
			return this.#current.has(key) || this.#old.has(key);
		}
		/**
		* Removes the specified element from the cache.
		* @param {K} key - The key of the element to remove.
		* @returns {boolean} true if an element in the cache existed and has been
		* removed, or false if the element does not exist.
		*/
		delete(key) {
			const deletedFromCurrent = this.#current.delete(key);
			const deletedFromOld = this.#old.delete(key);
			return deletedFromCurrent || deletedFromOld;
		}
		/**
		* Removes all elements from the cache.
		*/
		clear() {
			this.#current.clear();
			this.#old.clear();
		}
	};
}));
//#endregion
//#region node_modules/@asamuzakjp/css-color/dist/esm/js/cache.js
var CACHE_SIZE, CacheItem, NullObject, genCache, sharedNullObject, setCache, getCache, stringifySorted, createCacheKey;
var init_cache = __esmMin((() => {
	init_src();
	CACHE_SIZE = 2048;
	CacheItem = class {
		#isNull;
		#item;
		constructor(item, isNull = false) {
			this.#item = item;
			this.#isNull = !!isNull;
		}
		get item() {
			return this.#item;
		}
		get isNull() {
			return this.#isNull;
		}
	};
	NullObject = class extends CacheItem {
		constructor() {
			super(Symbol("null"), true);
		}
	};
	genCache = new GenerationalCache(CACHE_SIZE);
	sharedNullObject = new NullObject();
	setCache = (key, value) => {
		if (!key) return;
		if (value === null) genCache.set(key, sharedNullObject);
		else if (value instanceof CacheItem) genCache.set(key, value);
		else genCache.set(key, new CacheItem(value));
	};
	getCache = (key) => {
		if (!key) return false;
		const item = genCache.get(key);
		if (item !== void 0) return item;
		return false;
	};
	stringifySorted = (obj) => {
		const keys = Object.keys(obj);
		if (keys.length === 0) return "";
		keys.sort();
		let result = "";
		for (const key of keys) result += `${key}:${JSON.stringify(obj[key])};`;
		return result;
	};
	createCacheKey = (keyData, opt = {}) => {
		if (!keyData || opt.customProperty && typeof opt.customProperty.callback === "function" || opt.dimension && typeof opt.dimension.callback === "function") return "";
		const namespace = keyData.namespace || "";
		const name = keyData.name || "";
		const value = keyData.value || "";
		if (!namespace && !name && !value) return "";
		return `${`${namespace}:${name}:${value}`}::${`${opt.format || ""}|${opt.colorSpace || ""}|${opt.colorScheme || ""}|${opt.currentColor || ""}|${opt.d50 ? "1" : "0"}|${opt.nullable ? "1" : "0"}|${opt.preserveComment ? "1" : "0"}|${opt.delimiter || ""}`}::${opt.customProperty ? stringifySorted(opt.customProperty) : ""}::${opt.dimension ? stringifySorted(opt.dimension) : ""}`;
	};
}));
//#endregion
//#region node_modules/@asamuzakjp/css-color/dist/esm/js/common.js
var isString, isStringOrNumber;
var init_common = __esmMin((() => {
	isString = (o) => typeof o === "string" || o instanceof String;
	isStringOrNumber = (o) => isString(o) || typeof o === "number";
}));
//#endregion
//#region node_modules/@asamuzakjp/css-color/dist/esm/js/constant.js
var _DIGIT, _MATH, _CALC, _VAR, ANGLE, LENGTH, NUM$1, NUM_POSITIVE, NONE, PCT$1, SYN_FN_CALC, SYN_FN_MATH_START, SYN_FN_VAR, SYN_FN_VAR_START, _ALPHA, _ALPHA_LV3, _COLOR_FUNC, _COLOR_KEY, _CS_HUE, _CS_HUE_ARC, _NUM_ANGLE, _NUM_ANGLE_NONE, _NUM_PCT_NONE, CS_HUE, CS_HUE_CAPT, CS_LAB, CS_LCH, CS_RGB, CS_XYZ, CS_RECT, CS_MIX, FN_MIX, FN_REL, FN_REL_CAPT, FN_VAR, SYN_FN_COLOR, SYN_FN_LIGHT_DARK, SYN_FN_REL, SYN_HSL, SYN_HSL_LV3, SYN_LCH, SYN_MOD, SYN_RGB_LV3, SYN_COLOR_TYPE, SYN_MIX_PART, SYN_MIX, SYN_MIX_CAPT, VAL_COMP, VAL_MIX, VAL_SPEC;
var init_constant = __esmMin((() => {
	_DIGIT = "(?:0|[1-9]\\d*)";
	_MATH = `clamp|max|min|exp|hypot|log|pow|sqrt|abs|sign|mod|rem|round|a?(?:cos|sin|tan)|atan2`;
	_CALC = `calc|${_MATH}`;
	_VAR = `var|${_CALC}`;
	ANGLE = "deg|g?rad|turn";
	LENGTH = "[cm]m|[dls]?v(?:[bhiw]|max|min)|in|p[ctx]|q|r?(?:[cl]h|cap|e[mx]|ic)";
	NUM$1 = `[+-]?(?:${_DIGIT}(?:\\.\\d*)?|\\.\\d+)(?:e-?${_DIGIT})?`;
	NUM_POSITIVE = `\\+?(?:${_DIGIT}(?:\\.\\d*)?|\\.\\d+)(?:e-?${_DIGIT})?`;
	NONE = "none";
	PCT$1 = `${NUM$1}%`;
	SYN_FN_CALC = `^(?:${_CALC})\\(|(?<=[*\\/\\s\\(])(?:${_CALC})\\(`;
	SYN_FN_MATH_START = `^(?:${_MATH})\\($`;
	SYN_FN_VAR = "^var\\(|(?<=[*\\/\\s\\(])var\\(";
	SYN_FN_VAR_START = `^(?:${_VAR})\\(`;
	_ALPHA = `(?:\\s*\\/\\s*(?:${NUM$1}|${PCT$1}|${NONE}))?`;
	_ALPHA_LV3 = `(?:\\s*,\\s*(?:${NUM$1}|${PCT$1}))?`;
	_COLOR_FUNC = "(?:ok)?l(?:ab|ch)|color|hsla?|hwb|rgba?";
	_COLOR_KEY = "[a-z]+|#[\\da-f]{3}|#[\\da-f]{4}|#[\\da-f]{6}|#[\\da-f]{8}";
	_CS_HUE = "(?:ok)?lch|hsl|hwb";
	_CS_HUE_ARC = "(?:de|in)creasing|longer|shorter";
	_NUM_ANGLE = `${NUM$1}(?:${ANGLE})?`;
	_NUM_ANGLE_NONE = `(?:${NUM$1}(?:${ANGLE})?|${NONE})`;
	_NUM_PCT_NONE = `(?:${NUM$1}|${PCT$1}|${NONE})`;
	CS_HUE = `(?:${_CS_HUE})(?:\\s(?:${_CS_HUE_ARC})\\shue)?`;
	CS_HUE_CAPT = `(${_CS_HUE})(?:\\s(${_CS_HUE_ARC})\\shue)?`;
	CS_LAB = "(?:ok)?lab";
	CS_LCH = "(?:ok)?lch";
	CS_RGB = `(?:a98|prophoto)-rgb|display-p3|rec2020|srgb(?:-linear)?`;
	CS_XYZ = "xyz(?:-d(?:50|65))?";
	CS_RECT = `${CS_LAB}|${CS_RGB}|${CS_XYZ}`;
	CS_MIX = `${CS_HUE}|${CS_RECT}`;
	FN_MIX = "color-mix(";
	FN_REL = `(?:${_COLOR_FUNC})\\(\\s*from\\s+`;
	FN_REL_CAPT = `(${_COLOR_FUNC})\\(\\s*from\\s+`;
	FN_VAR = "var(";
	SYN_FN_COLOR = `(?:${CS_RGB}|${CS_XYZ})(?:\\s+${_NUM_PCT_NONE}){3}${_ALPHA}`;
	SYN_FN_LIGHT_DARK = "^light-dark\\(";
	SYN_FN_REL = `^${FN_REL}|(?<=[\\s])${FN_REL}`;
	SYN_HSL = `${_NUM_ANGLE_NONE}(?:\\s+${_NUM_PCT_NONE}){2}${_ALPHA}`;
	SYN_HSL_LV3 = `${_NUM_ANGLE}(?:\\s*,\\s*${PCT$1}){2}${_ALPHA_LV3}`;
	SYN_LCH = `(?:${_NUM_PCT_NONE}\\s+){2}${_NUM_ANGLE_NONE}${_ALPHA}`;
	SYN_MOD = `${_NUM_PCT_NONE}(?:\\s+${_NUM_PCT_NONE}){2}${_ALPHA}`;
	SYN_RGB_LV3 = `(?:${NUM$1}(?:\\s*,\\s*${NUM$1}){2}|${PCT$1}(?:\\s*,\\s*${PCT$1}){2})${_ALPHA_LV3}`;
	SYN_COLOR_TYPE = `${_COLOR_KEY}|hsla?\\(\\s*${SYN_HSL_LV3}\\s*\\)|rgba?\\(\\s*${SYN_RGB_LV3}\\s*\\)|(?:hsla?|hwb)\\(\\s*${SYN_HSL}\\s*\\)|(?:(?:ok)?lab|rgba?)\\(\\s*${SYN_MOD}\\s*\\)|(?:ok)?lch\\(\\s*${SYN_LCH}\\s*\\)|color\\(\\s*${SYN_FN_COLOR}\\s*\\)`;
	SYN_MIX_PART = `(?:${SYN_COLOR_TYPE})(?:\\s+${PCT$1})?`;
	SYN_MIX = `color-mix\\(\\s*in\\s+(?:${CS_MIX})\\s*,\\s*${SYN_MIX_PART}\\s*,\\s*${SYN_MIX_PART}\\s*\\)`;
	SYN_MIX_CAPT = `color-mix\\(\\s*in\\s+(${CS_MIX})\\s*,\\s*(${SYN_MIX_PART})\\s*,\\s*(${SYN_MIX_PART})\\s*\\)`;
	VAL_COMP = "computedValue";
	VAL_MIX = "mixValue";
	VAL_SPEC = "specifiedValue";
}));
//#endregion
//#region node_modules/@csstools/css-tokenizer/dist/index.mjs
function stringify(...e) {
	let n = "";
	for (let t = 0; t < e.length; t++) n += e[t][1];
	return n;
}
function checkIfFourCodePointsWouldStartCDO(e) {
	return 60 === e.source.codePointAt(e.cursor) && 33 === e.source.codePointAt(e.cursor + 1) && e.source.codePointAt(e.cursor + 2) === o$1 && e.source.codePointAt(e.cursor + 3) === o$1;
}
function isDigitCodePoint(e) {
	return e >= 48 && e <= 57;
}
function isUppercaseLetterCodePoint(e) {
	return e >= 65 && e <= 90;
}
function isLowercaseLetterCodePoint(e) {
	return e >= 97 && e <= 122;
}
function isHexDigitCodePoint(e) {
	return e >= 48 && e <= 57 || e >= 97 && e <= 102 || e >= 65 && e <= 70;
}
function isLetterCodePoint(e) {
	return isLowercaseLetterCodePoint(e) || isUppercaseLetterCodePoint(e);
}
function isIdentStartCodePoint(e) {
	return isLetterCodePoint(e) || isNonASCII_IdentCodePoint(e) || 95 === e;
}
function isIdentCodePoint(e) {
	return isIdentStartCodePoint(e) || isDigitCodePoint(e) || e === o$1;
}
function isNonASCII_IdentCodePoint(e) {
	return 183 === e || 8204 === e || 8205 === e || 8255 === e || 8256 === e || 8204 === e || 192 <= e && e <= 214 || 216 <= e && e <= 246 || 248 <= e && e <= 893 || 895 <= e && e <= 8191 || 8304 <= e && e <= 8591 || 11264 <= e && e <= 12271 || 12289 <= e && e <= 55295 || 63744 <= e && e <= 64975 || 65008 <= e && e <= 65533 || 0 === e || !!isSurrogate(e) || e >= 65536;
}
function isNonPrintableCodePoint(e) {
	return 11 === e || 127 === e || 0 <= e && e <= 8 || 14 <= e && e <= 31;
}
function isNewLine(e) {
	return e === r$1 || e === t$1 || 12 === e;
}
function isWhitespace(e) {
	return 32 === e || e === r$1 || 9 === e || e === t$1 || 12 === e;
}
function isSurrogate(e) {
	return e >= 55296 && e <= 57343;
}
function checkIfTwoCodePointsAreAValidEscape(e) {
	return 92 === e.source.codePointAt(e.cursor) && !isNewLine(e.source.codePointAt(e.cursor + 1) ?? -1);
}
function checkIfThreeCodePointsWouldStartAnIdentSequence(e, n) {
	return n.source.codePointAt(n.cursor) === o$1 ? n.source.codePointAt(n.cursor + 1) === o$1 || !!isIdentStartCodePoint(n.source.codePointAt(n.cursor + 1) ?? -1) || 92 === n.source.codePointAt(n.cursor + 1) && !isNewLine(n.source.codePointAt(n.cursor + 2) ?? -1) : !!isIdentStartCodePoint(n.source.codePointAt(n.cursor) ?? -1) || checkIfTwoCodePointsAreAValidEscape(n);
}
function checkIfThreeCodePointsWouldStartANumber(e) {
	return e.source.codePointAt(e.cursor) === i$1 || e.source.codePointAt(e.cursor) === o$1 ? !!isDigitCodePoint(e.source.codePointAt(e.cursor + 1) ?? -1) || 46 === e.source.codePointAt(e.cursor + 1) && isDigitCodePoint(e.source.codePointAt(e.cursor + 2) ?? -1) : 46 === e.source.codePointAt(e.cursor) ? isDigitCodePoint(e.source.codePointAt(e.cursor + 1) ?? -1) : isDigitCodePoint(e.source.codePointAt(e.cursor) ?? -1);
}
function checkIfTwoCodePointsStartAComment(e) {
	return 47 === e.source.codePointAt(e.cursor) && 42 === e.source.codePointAt(e.cursor + 1);
}
function checkIfThreeCodePointsWouldStartCDC(e) {
	return e.source.codePointAt(e.cursor) === o$1 && e.source.codePointAt(e.cursor + 1) === o$1 && 62 === e.source.codePointAt(e.cursor + 2);
}
function mirrorVariantType(e) {
	switch (e) {
		case c$1.OpenParen: return c$1.CloseParen;
		case c$1.CloseParen: return c$1.OpenParen;
		case c$1.OpenCurly: return c$1.CloseCurly;
		case c$1.CloseCurly: return c$1.OpenCurly;
		case c$1.OpenSquare: return c$1.CloseSquare;
		case c$1.CloseSquare: return c$1.OpenSquare;
		default: return null;
	}
}
function mirrorVariant(e) {
	switch (e[0]) {
		case c$1.OpenParen: return [
			c$1.CloseParen,
			")",
			-1,
			-1,
			void 0
		];
		case c$1.CloseParen: return [
			c$1.OpenParen,
			"(",
			-1,
			-1,
			void 0
		];
		case c$1.OpenCurly: return [
			c$1.CloseCurly,
			"}",
			-1,
			-1,
			void 0
		];
		case c$1.CloseCurly: return [
			c$1.OpenCurly,
			"{",
			-1,
			-1,
			void 0
		];
		case c$1.OpenSquare: return [
			c$1.CloseSquare,
			"]",
			-1,
			-1,
			void 0
		];
		case c$1.CloseSquare: return [
			c$1.OpenSquare,
			"[",
			-1,
			-1,
			void 0
		];
		default: return null;
	}
}
function consumeComment$1(n, t) {
	for (t.advanceCodePoint(2);;) {
		const o = t.readCodePoint();
		if (void 0 === o) {
			const o = [
				c$1.Comment,
				t.source.slice(t.representationStart, t.representationEnd + 1),
				t.representationStart,
				t.representationEnd,
				void 0
			];
			return n.onParseError(new ParseErrorWithToken(e$1.UnexpectedEOFInComment, t.representationStart, t.representationEnd, ["4.3.2. Consume comments", "Unexpected EOF"], o)), o;
		}
		if (42 === o && void 0 !== t.source.codePointAt(t.cursor) && 47 === t.source.codePointAt(t.cursor)) {
			t.advanceCodePoint();
			break;
		}
	}
	return [
		c$1.Comment,
		t.source.slice(t.representationStart, t.representationEnd + 1),
		t.representationStart,
		t.representationEnd,
		void 0
	];
}
function consumeEscapedCodePoint(n, o) {
	const i = o.readCodePoint();
	if (void 0 === i) return n.onParseError(new ParseError$1(e$1.UnexpectedEOFInEscapedCodePoint, o.representationStart, o.representationEnd, ["4.3.7. Consume an escaped code point", "Unexpected EOF"])), s$1;
	if (isHexDigitCodePoint(i)) {
		const e = [i];
		let n;
		for (; void 0 !== (n = o.source.codePointAt(o.cursor)) && isHexDigitCodePoint(n) && e.length < 6;) e.push(n), o.advanceCodePoint();
		isWhitespace(o.source.codePointAt(o.cursor) ?? -1) && (o.source.codePointAt(o.cursor) === t$1 && o.source.codePointAt(o.cursor + 1) === r$1 && o.advanceCodePoint(), o.advanceCodePoint());
		const c = parseInt(String.fromCodePoint(...e), 16);
		return 0 === c || isSurrogate(c) || c > 1114111 ? s$1 : c;
	}
	return 0 === i || isSurrogate(i) ? s$1 : i;
}
function consumeIdentSequence(e, n) {
	const t = [];
	for (;;) {
		const o = n.source.codePointAt(n.cursor) ?? -1;
		if (0 === o || isSurrogate(o)) t.push(s$1), n.advanceCodePoint(+(o > 65535) + 1);
		else if (isIdentCodePoint(o)) t.push(o), n.advanceCodePoint(+(o > 65535) + 1);
		else {
			if (!checkIfTwoCodePointsAreAValidEscape(n)) return t;
			n.advanceCodePoint(), t.push(consumeEscapedCodePoint(e, n));
		}
	}
}
function consumeHashToken(e, n) {
	n.advanceCodePoint();
	const t = n.source.codePointAt(n.cursor);
	if (void 0 !== t && (isIdentCodePoint(t) || checkIfTwoCodePointsAreAValidEscape(n))) {
		let t = u$1.Unrestricted;
		checkIfThreeCodePointsWouldStartAnIdentSequence(0, n) && (t = u$1.ID);
		const o = consumeIdentSequence(e, n);
		return [
			c$1.Hash,
			n.source.slice(n.representationStart, n.representationEnd + 1),
			n.representationStart,
			n.representationEnd,
			{
				value: String.fromCodePoint(...o),
				type: t
			}
		];
	}
	return [
		c$1.Delim,
		"#",
		n.representationStart,
		n.representationEnd,
		{ value: "#" }
	];
}
function consumeNumber(e, n) {
	let t = a$1.Integer;
	for (n.source.codePointAt(n.cursor) !== i$1 && n.source.codePointAt(n.cursor) !== o$1 || n.advanceCodePoint(); isDigitCodePoint(n.source.codePointAt(n.cursor) ?? -1);) n.advanceCodePoint();
	if (46 === n.source.codePointAt(n.cursor) && isDigitCodePoint(n.source.codePointAt(n.cursor + 1) ?? -1)) for (n.advanceCodePoint(2), t = a$1.Number; isDigitCodePoint(n.source.codePointAt(n.cursor) ?? -1);) n.advanceCodePoint();
	if (101 === n.source.codePointAt(n.cursor) || 69 === n.source.codePointAt(n.cursor)) {
		if (isDigitCodePoint(n.source.codePointAt(n.cursor + 1) ?? -1)) n.advanceCodePoint(2);
		else {
			if (n.source.codePointAt(n.cursor + 1) !== o$1 && n.source.codePointAt(n.cursor + 1) !== i$1 || !isDigitCodePoint(n.source.codePointAt(n.cursor + 2) ?? -1)) return t;
			n.advanceCodePoint(3);
		}
		for (t = a$1.Number; isDigitCodePoint(n.source.codePointAt(n.cursor) ?? -1);) n.advanceCodePoint();
	}
	return t;
}
function consumeNumericToken(e, n) {
	let t;
	{
		const e = n.source.codePointAt(n.cursor);
		e === o$1 ? t = "-" : e === i$1 && (t = "+");
	}
	const r = consumeNumber(0, n), s = parseFloat(n.source.slice(n.representationStart, n.representationEnd + 1));
	if (checkIfThreeCodePointsWouldStartAnIdentSequence(0, n)) {
		const o = consumeIdentSequence(e, n);
		return [
			c$1.Dimension,
			n.source.slice(n.representationStart, n.representationEnd + 1),
			n.representationStart,
			n.representationEnd,
			{
				value: s,
				signCharacter: t,
				type: r,
				unit: String.fromCodePoint(...o)
			}
		];
	}
	return 37 === n.source.codePointAt(n.cursor) ? (n.advanceCodePoint(), [
		c$1.Percentage,
		n.source.slice(n.representationStart, n.representationEnd + 1),
		n.representationStart,
		n.representationEnd,
		{
			value: s,
			signCharacter: t
		}
	]) : [
		c$1.Number,
		n.source.slice(n.representationStart, n.representationEnd + 1),
		n.representationStart,
		n.representationEnd,
		{
			value: s,
			signCharacter: t,
			type: r
		}
	];
}
function consumeWhiteSpace(e) {
	for (; isWhitespace(e.source.codePointAt(e.cursor) ?? -1);) e.advanceCodePoint();
	return [
		c$1.Whitespace,
		e.source.slice(e.representationStart, e.representationEnd + 1),
		e.representationStart,
		e.representationEnd,
		void 0
	];
}
function consumeStringToken(n, o) {
	let i = "";
	const a = o.readCodePoint();
	for (;;) {
		const u = o.readCodePoint();
		if (void 0 === u) {
			const t = [
				c$1.String,
				o.source.slice(o.representationStart, o.representationEnd + 1),
				o.representationStart,
				o.representationEnd,
				{ value: i }
			];
			return n.onParseError(new ParseErrorWithToken(e$1.UnexpectedEOFInString, o.representationStart, o.representationEnd, ["4.3.5. Consume a string token", "Unexpected EOF"], t)), t;
		}
		if (isNewLine(u)) {
			o.unreadCodePoint();
			const i = [
				c$1.BadString,
				o.source.slice(o.representationStart, o.representationEnd + 1),
				o.representationStart,
				o.representationEnd,
				void 0
			];
			return n.onParseError(new ParseErrorWithToken(e$1.UnexpectedNewLineInString, o.representationStart, o.source.codePointAt(o.cursor) === t$1 && o.source.codePointAt(o.cursor + 1) === r$1 ? o.representationEnd + 2 : o.representationEnd + 1, ["4.3.5. Consume a string token", "Unexpected newline"], i)), i;
		}
		if (u === a) return [
			c$1.String,
			o.source.slice(o.representationStart, o.representationEnd + 1),
			o.representationStart,
			o.representationEnd,
			{ value: i }
		];
		if (92 !== u) 0 === u || isSurrogate(u) ? i += String.fromCodePoint(s$1) : i += String.fromCodePoint(u);
		else {
			if (void 0 === o.source.codePointAt(o.cursor)) continue;
			if (isNewLine(o.source.codePointAt(o.cursor) ?? -1)) {
				o.source.codePointAt(o.cursor) === t$1 && o.source.codePointAt(o.cursor + 1) === r$1 && o.advanceCodePoint(), o.advanceCodePoint();
				continue;
			}
			i += String.fromCodePoint(consumeEscapedCodePoint(n, o));
		}
	}
}
function checkIfCodePointsMatchURLIdent(e) {
	return !(3 !== e.length || 117 !== e[0] && 85 !== e[0] || 114 !== e[1] && 82 !== e[1] || 108 !== e[2] && 76 !== e[2]);
}
function consumeBadURL(e, n) {
	for (;;) {
		const t = n.source.codePointAt(n.cursor);
		if (void 0 === t) return;
		if (41 === t) return void n.advanceCodePoint();
		checkIfTwoCodePointsAreAValidEscape(n) ? (n.advanceCodePoint(), consumeEscapedCodePoint(e, n)) : n.advanceCodePoint();
	}
}
function consumeUrlToken(n, t) {
	for (; isWhitespace(t.source.codePointAt(t.cursor) ?? -1);) t.advanceCodePoint();
	let o = "";
	for (;;) {
		if (void 0 === t.source.codePointAt(t.cursor)) {
			const r = [
				c$1.URL,
				t.source.slice(t.representationStart, t.representationEnd + 1),
				t.representationStart,
				t.representationEnd,
				{ value: o }
			];
			return n.onParseError(new ParseErrorWithToken(e$1.UnexpectedEOFInURL, t.representationStart, t.representationEnd, ["4.3.6. Consume a url token", "Unexpected EOF"], r)), r;
		}
		if (41 === t.source.codePointAt(t.cursor)) return t.advanceCodePoint(), [
			c$1.URL,
			t.source.slice(t.representationStart, t.representationEnd + 1),
			t.representationStart,
			t.representationEnd,
			{ value: o }
		];
		if (isWhitespace(t.source.codePointAt(t.cursor) ?? -1)) {
			for (t.advanceCodePoint(); isWhitespace(t.source.codePointAt(t.cursor) ?? -1);) t.advanceCodePoint();
			if (void 0 === t.source.codePointAt(t.cursor)) {
				const r = [
					c$1.URL,
					t.source.slice(t.representationStart, t.representationEnd + 1),
					t.representationStart,
					t.representationEnd,
					{ value: o }
				];
				return n.onParseError(new ParseErrorWithToken(e$1.UnexpectedEOFInURL, t.representationStart, t.representationEnd, [
					"4.3.6. Consume a url token",
					"Consume as much whitespace as possible",
					"Unexpected EOF"
				], r)), r;
			}
			return 41 === t.source.codePointAt(t.cursor) ? (t.advanceCodePoint(), [
				c$1.URL,
				t.source.slice(t.representationStart, t.representationEnd + 1),
				t.representationStart,
				t.representationEnd,
				{ value: o }
			]) : (consumeBadURL(n, t), [
				c$1.BadURL,
				t.source.slice(t.representationStart, t.representationEnd + 1),
				t.representationStart,
				t.representationEnd,
				void 0
			]);
		}
		const r = t.source.codePointAt(t.cursor);
		if (34 === r || 39 === r || 40 === r || isNonPrintableCodePoint(r ?? -1)) {
			consumeBadURL(n, t);
			const o = [
				c$1.BadURL,
				t.source.slice(t.representationStart, t.representationEnd + 1),
				t.representationStart,
				t.representationEnd,
				void 0
			];
			return n.onParseError(new ParseErrorWithToken(e$1.UnexpectedCharacterInURL, t.representationStart, t.representationEnd, ["4.3.6. Consume a url token", "Unexpected U+0022 QUOTATION MARK (\"), U+0027 APOSTROPHE ('), U+0028 LEFT PARENTHESIS (() or non-printable code point"], o)), o;
		}
		if (92 === r) {
			if (checkIfTwoCodePointsAreAValidEscape(t)) {
				t.advanceCodePoint(), o += String.fromCodePoint(consumeEscapedCodePoint(n, t));
				continue;
			}
			consumeBadURL(n, t);
			const r = [
				c$1.BadURL,
				t.source.slice(t.representationStart, t.representationEnd + 1),
				t.representationStart,
				t.representationEnd,
				void 0
			];
			return n.onParseError(new ParseErrorWithToken(e$1.InvalidEscapeSequenceInURL, t.representationStart, t.representationEnd, [
				"4.3.6. Consume a url token",
				"U+005C REVERSE SOLIDUS (\\)",
				"The input stream does not start with a valid escape sequence"
			], r)), r;
		}
		0 === t.source.codePointAt(t.cursor) || isSurrogate(t.source.codePointAt(t.cursor) ?? -1) ? (o += String.fromCodePoint(s$1), t.advanceCodePoint()) : (o += t.source[t.cursor], t.advanceCodePoint());
	}
}
function consumeIdentLikeToken(e, n) {
	const t = consumeIdentSequence(e, n);
	if (40 !== n.source.codePointAt(n.cursor)) return [
		c$1.Ident,
		n.source.slice(n.representationStart, n.representationEnd + 1),
		n.representationStart,
		n.representationEnd,
		{ value: String.fromCodePoint(...t) }
	];
	if (checkIfCodePointsMatchURLIdent(t)) {
		n.advanceCodePoint();
		let o = 0;
		for (;;) {
			const e = isWhitespace(n.source.codePointAt(n.cursor) ?? -1), r = isWhitespace(n.source.codePointAt(n.cursor + 1) ?? -1);
			if (e && r) {
				o += 1, n.advanceCodePoint(1);
				continue;
			}
			const i = e ? n.source.codePointAt(n.cursor + 1) : n.source.codePointAt(n.cursor);
			if (34 === i || 39 === i) return o > 0 && n.unreadCodePoint(o), [
				c$1.Function,
				n.source.slice(n.representationStart, n.representationEnd + 1),
				n.representationStart,
				n.representationEnd,
				{ value: String.fromCodePoint(...t) }
			];
			break;
		}
		return consumeUrlToken(e, n);
	}
	return n.advanceCodePoint(), [
		c$1.Function,
		n.source.slice(n.representationStart, n.representationEnd + 1),
		n.representationStart,
		n.representationEnd,
		{ value: String.fromCodePoint(...t) }
	];
}
function checkIfThreeCodePointsWouldStartAUnicodeRange(e) {
	return !(117 !== e.source.codePointAt(e.cursor) && 85 !== e.source.codePointAt(e.cursor) || e.source.codePointAt(e.cursor + 1) !== i$1 || 63 !== e.source.codePointAt(e.cursor + 2) && !isHexDigitCodePoint(e.source.codePointAt(e.cursor + 2) ?? -1));
}
function consumeUnicodeRangeToken(e, n) {
	n.advanceCodePoint(2);
	const t = [], r = [];
	let i;
	for (; void 0 !== (i = n.source.codePointAt(n.cursor)) && t.length < 6 && isHexDigitCodePoint(i);) t.push(i), n.advanceCodePoint();
	for (; void 0 !== (i = n.source.codePointAt(n.cursor)) && t.length < 6 && 63 === i;) 0 === r.length && r.push(...t), t.push(48), r.push(70), n.advanceCodePoint();
	if (!r.length && n.source.codePointAt(n.cursor) === o$1 && isHexDigitCodePoint(n.source.codePointAt(n.cursor + 1) ?? -1)) for (n.advanceCodePoint(); void 0 !== (i = n.source.codePointAt(n.cursor)) && r.length < 6 && isHexDigitCodePoint(i);) r.push(i), n.advanceCodePoint();
	if (!r.length) {
		const e = parseInt(String.fromCodePoint(...t), 16);
		return [
			c$1.UnicodeRange,
			n.source.slice(n.representationStart, n.representationEnd + 1),
			n.representationStart,
			n.representationEnd,
			{
				startOfRange: e,
				endOfRange: e
			}
		];
	}
	const s = parseInt(String.fromCodePoint(...t), 16), a = parseInt(String.fromCodePoint(...r), 16);
	return [
		c$1.UnicodeRange,
		n.source.slice(n.representationStart, n.representationEnd + 1),
		n.representationStart,
		n.representationEnd,
		{
			startOfRange: s,
			endOfRange: a
		}
	];
}
function tokenize(e, n) {
	const t = tokenizer(e, n), o = [];
	for (; !t.endOfFile();) o.push(t.nextToken());
	return o.push(t.nextToken()), o;
}
function tokenizer(n, s) {
	const a = n.css.valueOf(), u = n.unicodeRangesAllowed ?? !1, d = new Reader(a), p = { onParseError: s?.onParseError ?? noop };
	return {
		nextToken: function nextToken() {
			d.resetRepresentation();
			const n = d.source.codePointAt(d.cursor);
			if (void 0 === n) return [
				c$1.EOF,
				"",
				-1,
				-1,
				void 0
			];
			if (47 === n && checkIfTwoCodePointsStartAComment(d)) return consumeComment$1(p, d);
			if (u && (117 === n || 85 === n) && checkIfThreeCodePointsWouldStartAUnicodeRange(d)) return consumeUnicodeRangeToken(0, d);
			if (isIdentStartCodePoint(n)) return consumeIdentLikeToken(p, d);
			if (isDigitCodePoint(n)) return consumeNumericToken(p, d);
			switch (n) {
				case 44: return d.advanceCodePoint(), [
					c$1.Comma,
					",",
					d.representationStart,
					d.representationEnd,
					void 0
				];
				case 58: return d.advanceCodePoint(), [
					c$1.Colon,
					":",
					d.representationStart,
					d.representationEnd,
					void 0
				];
				case 59: return d.advanceCodePoint(), [
					c$1.Semicolon,
					";",
					d.representationStart,
					d.representationEnd,
					void 0
				];
				case 40: return d.advanceCodePoint(), [
					c$1.OpenParen,
					"(",
					d.representationStart,
					d.representationEnd,
					void 0
				];
				case 41: return d.advanceCodePoint(), [
					c$1.CloseParen,
					")",
					d.representationStart,
					d.representationEnd,
					void 0
				];
				case 91: return d.advanceCodePoint(), [
					c$1.OpenSquare,
					"[",
					d.representationStart,
					d.representationEnd,
					void 0
				];
				case 93: return d.advanceCodePoint(), [
					c$1.CloseSquare,
					"]",
					d.representationStart,
					d.representationEnd,
					void 0
				];
				case 123: return d.advanceCodePoint(), [
					c$1.OpenCurly,
					"{",
					d.representationStart,
					d.representationEnd,
					void 0
				];
				case 125: return d.advanceCodePoint(), [
					c$1.CloseCurly,
					"}",
					d.representationStart,
					d.representationEnd,
					void 0
				];
				case 39:
				case 34: return consumeStringToken(p, d);
				case 35: return consumeHashToken(p, d);
				case i$1:
				case 46: return checkIfThreeCodePointsWouldStartANumber(d) ? consumeNumericToken(p, d) : (d.advanceCodePoint(), [
					c$1.Delim,
					d.source[d.representationStart],
					d.representationStart,
					d.representationEnd,
					{ value: d.source[d.representationStart] }
				]);
				case r$1:
				case t$1:
				case 12:
				case 9:
				case 32: return consumeWhiteSpace(d);
				case o$1: return checkIfThreeCodePointsWouldStartANumber(d) ? consumeNumericToken(p, d) : checkIfThreeCodePointsWouldStartCDC(d) ? (d.advanceCodePoint(3), [
					c$1.CDC,
					"-->",
					d.representationStart,
					d.representationEnd,
					void 0
				]) : checkIfThreeCodePointsWouldStartAnIdentSequence(0, d) ? consumeIdentLikeToken(p, d) : (d.advanceCodePoint(), [
					c$1.Delim,
					"-",
					d.representationStart,
					d.representationEnd,
					{ value: "-" }
				]);
				case 60: return checkIfFourCodePointsWouldStartCDO(d) ? (d.advanceCodePoint(4), [
					c$1.CDO,
					"<!--",
					d.representationStart,
					d.representationEnd,
					void 0
				]) : (d.advanceCodePoint(), [
					c$1.Delim,
					"<",
					d.representationStart,
					d.representationEnd,
					{ value: "<" }
				]);
				case 64:
					if (d.advanceCodePoint(), checkIfThreeCodePointsWouldStartAnIdentSequence(0, d)) {
						const e = consumeIdentSequence(p, d);
						return [
							c$1.AtKeyword,
							d.source.slice(d.representationStart, d.representationEnd + 1),
							d.representationStart,
							d.representationEnd,
							{ value: String.fromCodePoint(...e) }
						];
					}
					return [
						c$1.Delim,
						"@",
						d.representationStart,
						d.representationEnd,
						{ value: "@" }
					];
				case 92: {
					if (checkIfTwoCodePointsAreAValidEscape(d)) return consumeIdentLikeToken(p, d);
					d.advanceCodePoint();
					const n = [
						c$1.Delim,
						"\\",
						d.representationStart,
						d.representationEnd,
						{ value: "\\" }
					];
					return p.onParseError(new ParseErrorWithToken(e$1.InvalidEscapeSequenceAfterBackslash, d.representationStart, d.representationEnd, [
						"4.3.1. Consume a token",
						"U+005C REVERSE SOLIDUS (\\)",
						"The input stream does not start with a valid escape sequence"
					], n)), n;
				}
			}
			return d.advanceCodePoint(), [
				c$1.Delim,
				d.source[d.representationStart],
				d.representationStart,
				d.representationEnd,
				{ value: d.source[d.representationStart] }
			];
		},
		endOfFile: function endOfFile() {
			return void 0 === d.source.codePointAt(d.cursor);
		}
	};
}
function noop() {}
function mutateUnit(e, n) {
	const t = [];
	for (const e of n) t.push(e.codePointAt(0));
	const o = serializeIdent(t);
	101 === o[0] && insertEscapedCodePoint(o, 0, o[0]);
	const r = String.fromCodePoint(...o);
	e[1] = `${"+" === e[4].signCharacter ? e[4].signCharacter : ""}${e[4].value.toString()}${r}`, e[4].unit = n;
}
function serializeIdent(e) {
	let n = 0;
	if (0 === e[0]) e.splice(0, 1, s$1), n = 1;
	else if (e[0] === o$1 && e[1] === o$1) n = 2;
	else if (e[0] === o$1 && e[1]) n = 2, isIdentStartCodePoint(e[1]) || (n += insertEscapedCodePoint(e, 1, e[1]));
	else {
		if (e[0] === o$1 && !e[1]) return [92, e[0]];
		isIdentStartCodePoint(e[0]) ? n = 1 : (n = 1, n += insertEscapedCodePoint(e, 0, e[0]));
	}
	for (let t = n; t < e.length; t++) 0 !== e[t] ? isIdentCodePoint(e[t]) || (t += insertEscapedCharacter(e, t, e[t])) : (e.splice(t, 1, s$1), t++);
	return e;
}
function insertEscapedCharacter(e, n, t) {
	return e.splice(n, 1, 92, t), 1;
}
function insertEscapedCodePoint(e, n, t) {
	const o = t.toString(16), r = [];
	for (const e of o) r.push(e.codePointAt(0));
	return e.splice(n, 1, 92, ...r, 32), 1 + r.length;
}
function isToken(e) {
	return !!Array.isArray(e) && !(e.length < 4) && !!d$1.includes(e[0]) && "string" == typeof e[1] && "number" == typeof e[2] && "number" == typeof e[3];
}
function isTokenNumeric(e) {
	if (!e) return !1;
	switch (e[0]) {
		case c$1.Dimension:
		case c$1.Number:
		case c$1.Percentage: return !0;
		default: return !1;
	}
}
function isTokenWhiteSpaceOrComment(e) {
	if (!e) return !1;
	switch (e[0]) {
		case c$1.Whitespace:
		case c$1.Comment: return !0;
		default: return !1;
	}
}
function isTokenColon(e) {
	return !!e && e[0] === c$1.Colon;
}
function isTokenComma(e) {
	return !!e && e[0] === c$1.Comma;
}
function isTokenComment(e) {
	return !!e && e[0] === c$1.Comment;
}
function isTokenDelim(e) {
	return !!e && e[0] === c$1.Delim;
}
function isTokenDimension(e) {
	return !!e && e[0] === c$1.Dimension;
}
function isTokenEOF(e) {
	return !!e && e[0] === c$1.EOF;
}
function isTokenFunction(e) {
	return !!e && e[0] === c$1.Function;
}
function isTokenHash(e) {
	return !!e && e[0] === c$1.Hash;
}
function isTokenIdent(e) {
	return !!e && e[0] === c$1.Ident;
}
function isTokenNumber(e) {
	return !!e && e[0] === c$1.Number;
}
function isTokenPercentage(e) {
	return !!e && e[0] === c$1.Percentage;
}
function isTokenSemicolon(e) {
	return !!e && e[0] === c$1.Semicolon;
}
function isTokenWhitespace(e) {
	return !!e && e[0] === c$1.Whitespace;
}
function isTokenOpenParen(e) {
	return !!e && e[0] === c$1.OpenParen;
}
function isTokenCloseParen(e) {
	return !!e && e[0] === c$1.CloseParen;
}
function isTokenOpenSquare(e) {
	return !!e && e[0] === c$1.OpenSquare;
}
function isTokenOpenCurly(e) {
	return !!e && e[0] === c$1.OpenCurly;
}
var ParseError$1, ParseErrorWithToken, e$1, t$1, o$1, r$1, i$1, s$1, c$1, a$1, u$1, Reader, d$1;
var init_dist$4 = __esmMin((() => {
	ParseError$1 = class extends Error {
		sourceStart;
		sourceEnd;
		parserState;
		constructor(e, n, t, o) {
			super(e), this.name = "ParseError", this.sourceStart = n, this.sourceEnd = t, this.parserState = o;
		}
	};
	ParseErrorWithToken = class extends ParseError$1 {
		token;
		constructor(e, n, t, o, r) {
			super(e, n, t, o), this.token = r;
		}
	};
	e$1 = {
		UnexpectedNewLineInString: "Unexpected newline while consuming a string token.",
		UnexpectedEOFInString: "Unexpected EOF while consuming a string token.",
		UnexpectedEOFInComment: "Unexpected EOF while consuming a comment.",
		UnexpectedEOFInURL: "Unexpected EOF while consuming a url token.",
		UnexpectedEOFInEscapedCodePoint: "Unexpected EOF while consuming an escaped code point.",
		UnexpectedCharacterInURL: "Unexpected character while consuming a url token.",
		InvalidEscapeSequenceInURL: "Invalid escape sequence while consuming a url token.",
		InvalidEscapeSequenceAfterBackslash: "Invalid escape sequence after \"\\\""
	}, "undefined" != typeof globalThis && "structuredClone" in globalThis;
	t$1 = 13, o$1 = 45, r$1 = 10, i$1 = 43, s$1 = 65533;
	(function(e) {
		e.Comment = "comment", e.AtKeyword = "at-keyword-token", e.BadString = "bad-string-token", e.BadURL = "bad-url-token", e.CDC = "CDC-token", e.CDO = "CDO-token", e.Colon = "colon-token", e.Comma = "comma-token", e.Delim = "delim-token", e.Dimension = "dimension-token", e.EOF = "EOF-token", e.Function = "function-token", e.Hash = "hash-token", e.Ident = "ident-token", e.Number = "number-token", e.Percentage = "percentage-token", e.Semicolon = "semicolon-token", e.String = "string-token", e.URL = "url-token", e.Whitespace = "whitespace-token", e.OpenParen = "(-token", e.CloseParen = ")-token", e.OpenSquare = "[-token", e.CloseSquare = "]-token", e.OpenCurly = "{-token", e.CloseCurly = "}-token", e.UnicodeRange = "unicode-range-token";
	})(c$1 || (c$1 = {})), function(e) {
		e.Integer = "integer", e.Number = "number";
	}(a$1 || (a$1 = {})), function(e) {
		e.Unrestricted = "unrestricted", e.ID = "id";
	}(u$1 || (u$1 = {}));
	Reader = class {
		cursor = 0;
		source = "";
		representationStart = 0;
		representationEnd = -1;
		constructor(e) {
			this.source = e;
		}
		advanceCodePoint(e = 1) {
			this.cursor = this.cursor + e, this.representationEnd = this.cursor - 1;
		}
		readCodePoint() {
			const e = this.source.codePointAt(this.cursor);
			if (void 0 !== e) return this.cursor = this.cursor + 1, this.representationEnd = this.cursor - 1, e;
		}
		unreadCodePoint(e = 1) {
			this.cursor = this.cursor - e, this.representationEnd = this.cursor - 1;
		}
		resetRepresentation() {
			this.representationStart = this.cursor, this.representationEnd = -1;
		}
	};
	d$1 = Object.values(c$1);
}));
//#endregion
//#region node_modules/@asamuzakjp/css-color/dist/esm/js/util.js
var PAREN_CLOSE$3, COMMA, COMMENT$3, DELIM$1, EOF$3, FUNC$2, PAREN_OPEN$2, W_SPACE$3, NAMESPACE$7, DEC$2, HEX$3, DEG$1, DEG_HALF$1, REG_COLOR$1, REG_DIMENSION, REG_FN_COLOR$1, REG_MIX$1, REG_DASHED_IDENT, REG_COMMA, REG_SLASH, REG_WHITESPACE, splitValue, extractDashedIdent, isColor, roundToPrecision, interpolateHue, absoluteFontSize, relativeFontSize, absoluteLength, relativeLength, resolveLengthInPixels, isAbsoluteSizeOrLength, isAbsoluteFontSize;
var init_util = __esmMin((() => {
	init_cache();
	init_common();
	init_constant();
	init_color();
	init_resolve();
	init_dist$4();
	({CloseParen: PAREN_CLOSE$3, Comma: COMMA, Comment: COMMENT$3, Delim: DELIM$1, EOF: EOF$3, Function: FUNC$2, OpenParen: PAREN_OPEN$2, Whitespace: W_SPACE$3} = c$1);
	NAMESPACE$7 = "util";
	DEC$2 = 10;
	HEX$3 = 16;
	DEG$1 = 360;
	DEG_HALF$1 = 180;
	REG_COLOR$1 = new RegExp(`^(?:${SYN_COLOR_TYPE})$`);
	REG_DIMENSION = /^([+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:e[+-]?\d+)?)([a-z]*)$/i;
	REG_FN_COLOR$1 = /^(?:(?:ok)?l(?:ab|ch)|color(?:-mix)?|hsla?|hwb|rgba?|var)\(/;
	REG_MIX$1 = new RegExp(SYN_MIX);
	REG_DASHED_IDENT = /--[\w-]+/g;
	REG_COMMA = /^,$/;
	REG_SLASH = /^\/$/;
	REG_WHITESPACE = /^\s+$/;
	splitValue = (value, opt = {}) => {
		if (!isString(value)) throw new TypeError(`${value} is not a string.`);
		const strValue = value.trim();
		const { delimiter = " ", preserveComment = false } = opt;
		const cacheKey = createCacheKey({
			namespace: NAMESPACE$7,
			name: "splitValue",
			value: strValue
		}, {
			delimiter,
			preserveComment
		});
		const cachedResult = getCache(cacheKey);
		if (cachedResult instanceof CacheItem) return cachedResult.item;
		let regDelimiter;
		switch (delimiter) {
			case ",":
				regDelimiter = REG_COMMA;
				break;
			case "/":
				regDelimiter = REG_SLASH;
				break;
			default: regDelimiter = REG_WHITESPACE;
		}
		const tokens = tokenize({ css: strValue });
		let nest = 0;
		let currentStr = "";
		const res = [];
		for (const [type, val] of tokens) switch (type) {
			case COMMA:
			case DELIM$1:
				if (nest === 0 && regDelimiter.test(val)) {
					res.push(currentStr.trim());
					currentStr = "";
				} else currentStr += val;
				break;
			case COMMENT$3:
				if (preserveComment && (delimiter === "," || delimiter === "/")) currentStr += val;
				break;
			case FUNC$2:
			case PAREN_OPEN$2:
				currentStr += val;
				nest++;
				break;
			case PAREN_CLOSE$3:
				currentStr += val;
				nest--;
				break;
			case W_SPACE$3:
				if (regDelimiter.test(val)) if (nest === 0) {
					if (currentStr) {
						res.push(currentStr.trim());
						currentStr = "";
					}
				} else currentStr += " ";
				else if (!currentStr.endsWith(" ")) currentStr += " ";
				break;
			default: if (type === EOF$3) {
				res.push(currentStr.trim());
				currentStr = "";
			} else currentStr += val;
		}
		setCache(cacheKey, res);
		return res;
	};
	extractDashedIdent = (value) => {
		if (!isString(value)) throw new TypeError(`${value} is not a string.`);
		const strValue = value.trim();
		const cacheKey = createCacheKey({
			namespace: NAMESPACE$7,
			name: "extractDashedIdent",
			value: strValue
		});
		const cachedResult = getCache(cacheKey);
		if (cachedResult instanceof CacheItem) return cachedResult.item;
		const matches = strValue.match(REG_DASHED_IDENT);
		const res = matches ? [...new Set(matches)] : [];
		setCache(cacheKey, res);
		return res;
	};
	isColor = (value, opt = {}) => {
		if (!isString(value)) return false;
		const str = value.toLowerCase().trim();
		if (!str) return false;
		if (/^[a-z]+$/.test(str)) return str === "currentcolor" || str === "transparent" || Object.hasOwn(NAMED_COLORS, str);
		if (REG_COLOR$1.test(str) || REG_MIX$1.test(str)) return true;
		if (REG_FN_COLOR$1.test(str)) {
			const colorOpt = {
				...opt,
				nullable: true
			};
			if (!colorOpt.format) colorOpt.format = VAL_SPEC;
			return !!resolveColor(str, colorOpt);
		}
		return false;
	};
	roundToPrecision = (value, bit = 0) => {
		if (!Number.isFinite(value)) throw new TypeError(`${value} is not a finite number.`);
		if (!Number.isFinite(bit)) throw new TypeError(`${bit} is not a finite number.`);
		if (bit < 0 || bit > HEX$3) throw new RangeError(`${bit} is not between 0 and ${HEX$3}.`);
		if (bit === 0) return Math.round(value);
		const precision = bit === HEX$3 ? 6 : bit < DEC$2 ? 4 : 5;
		return parseFloat(value.toPrecision(precision));
	};
	interpolateHue = (hueA, hueB, arc = "shorter") => {
		if (!Number.isFinite(hueA)) throw new TypeError(`${hueA} is not a finite number.`);
		if (!Number.isFinite(hueB)) throw new TypeError(`${hueB} is not a finite number.`);
		let a = hueA;
		let b = hueB;
		switch (arc) {
			case "decreasing":
				if (b > a) a += DEG$1;
				break;
			case "increasing":
				if (b < a) b += DEG$1;
				break;
			case "longer":
				if (b > a && b < a + DEG_HALF$1) a += DEG$1;
				else if (b > a - DEG_HALF$1 && b <= a) b += DEG$1;
				break;
			default: if (b > a + DEG_HALF$1) a += DEG$1;
			else if (b < a - DEG_HALF$1) b += DEG$1;
		}
		return [a, b];
	};
	absoluteFontSize = new Map([
		["xx-small", 9 / 16],
		["x-small", 5 / 8],
		["small", 13 / 16],
		["medium", 1],
		["large", 9 / 8],
		["x-large", 3 / 2],
		["xx-large", 2],
		["xxx-large", 3]
	]);
	relativeFontSize = new Map([["smaller", 1 / 1.2], ["larger", 1.2]]);
	absoluteLength = new Map([
		["cm", 96 / 2.54],
		["mm", 96 / 25.4],
		["q", 96 / 101.6],
		["in", 96],
		["pc", 16],
		["pt", 96 / 72],
		["px", 1]
	]);
	relativeLength = new Map([
		["rcap", 1],
		["rch", .5],
		["rem", 1],
		["rex", .5],
		["ric", 1],
		["rlh", 1.2]
	]);
	resolveLengthInPixels = (value, unit, opt = {}) => {
		const { dimension = {} } = opt;
		const { callback, em, rem, vh, vw } = dimension;
		if (isString(value)) {
			const str = value.toLowerCase().trim();
			const ratio = absoluteFontSize.get(str);
			if (ratio !== void 0) return ratio * rem;
			const relRatio = relativeFontSize.get(str);
			if (relRatio !== void 0) return relRatio * em;
			return NaN;
		}
		if (Number.isFinite(value) && unit) {
			const u = unit.toLowerCase();
			if (Object.hasOwn(dimension, u)) return value * Number(dimension[u]);
			if (typeof callback === "function") return value * (callback(u) ?? NaN);
			const absRatio = absoluteLength.get(u);
			if (absRatio !== void 0) return value * absRatio;
			const relRatio = relativeLength.get(u);
			if (relRatio !== void 0) return value * relRatio * rem;
			const rUnitRatio = relativeLength.get(`r${u}`);
			if (rUnitRatio !== void 0) return value * rUnitRatio * em;
			switch (u) {
				case "vb":
				case "vi": return value * vw;
				case "vmax": return value * Math.max(vh, vw);
				case "vmin": return value * Math.min(vh, vw);
				default:
			}
		}
		return NaN;
	};
	isAbsoluteSizeOrLength = (value, unit) => {
		if (isString(value)) return absoluteFontSize.has(value.toLowerCase().trim());
		if (isString(unit)) return absoluteLength.has(unit.toLowerCase().trim());
		return value === 0;
	};
	isAbsoluteFontSize = (css) => {
		if (!isString(css)) return false;
		const str = css.trim();
		if (isAbsoluteSizeOrLength(str, void 0)) return true;
		const match = str.match(REG_DIMENSION);
		return match ? isAbsoluteSizeOrLength(Number(match[1]), match[2] || void 0) : false;
	};
}));
//#endregion
//#region node_modules/@asamuzakjp/css-color/dist/esm/js/color.js
var NAMESPACE$6, PPTH, HALF, DUO, TRIA$1, QUAD, OCT$1, DEC$1, DOZ, HEX$2, SEXA, DEG_HALF, DEG, MAX_PCT$2, MAX_RGB$1, POW_SQR, POW_CUBE, POW_LINEAR, LINEAR_COEF, LINEAR_OFFSET, LAB_L, LAB_A, LAB_B, LAB_EPSILON, LAB_KAPPA, D50, MATRIX_D50_TO_D65, MATRIX_D65_TO_D50, MATRIX_L_RGB_TO_XYZ, MATRIX_XYZ_TO_L_RGB, MATRIX_XYZ_TO_LMS, MATRIX_LMS_TO_XYZ, MATRIX_OKLAB_TO_LMS, MATRIX_LMS_TO_OKLAB, MATRIX_P3_TO_XYZ, MATRIX_REC2020_TO_XYZ, MATRIX_A98_TO_XYZ, MATRIX_PROPHOTO_TO_XYZ_D50, REG_COLOR, REG_CS_HUE, REG_CS_XYZ, REG_CURRENT, REG_FN_COLOR, REG_HSL, REG_HWB, REG_LAB, REG_LCH, REG_MIX, REG_MIX_CAPT, REG_MIX_NEST, REG_OKLAB, REG_OKLCH, REG_SPEC, REG_ANGLE_TO_DEG, REG_PARSE_RGB, REG_MIX_CS_RGB_XYZ, REG_MIX_IN_CS, REG_MIX_START, REG_MIX_COLOR_PART, NAMED_COLORS, cacheInvalidColorValue, resolveInvalidColorValue, validateColorComponents, transformMatrix, normalizeColorComponents, numberToHexString, angleToDeg, parseAlpha, parseHexAlpha, transformRgbToLinearRgb, transformRgbToXyz, transformLinearRgbToRgb, transformXyzToRgb, transformXyzToHsl, transformXyzToHwb, transformXyzToOklab, transformXyzToOklch, transformXyzD50ToRgb, transformXyzD50ToLab, transformXyzD50ToLch, convertRgbToHex, convertHexToRgb, convertHexToLinearRgb, convertHexToXyz, parseRgb, parseHsl, parseHwb, parseLab, parseLch, parseOklab, parseOklch, parseColorFunc, parseColorValue, resolveColorValue, resolveColorFunc, convertColorToLinearRgb, convertColorToRgb, convertColorToXyz, convertColorToHsl, convertColorToHwb, convertColorToLab, convertColorToLch, convertColorToOklab, convertColorToOklch, resolveColorMix;
var init_color = __esmMin((() => {
	init_cache();
	init_common();
	init_constant();
	init_resolve();
	init_util();
	NAMESPACE$6 = "color";
	PPTH = .001;
	HALF = .5;
	DUO = 2;
	TRIA$1 = 3;
	QUAD = 4;
	OCT$1 = 8;
	DEC$1 = 10;
	DOZ = 12;
	HEX$2 = 16;
	SEXA = 60;
	DEG_HALF = 180;
	DEG = 360;
	MAX_PCT$2 = 100;
	MAX_RGB$1 = 255;
	POW_SQR = 2;
	POW_CUBE = 3;
	POW_LINEAR = 2.4;
	LINEAR_COEF = 12.92;
	LINEAR_OFFSET = .055;
	LAB_L = 116;
	LAB_A = 500;
	LAB_B = 200;
	LAB_EPSILON = 216 / 24389;
	LAB_KAPPA = 24389 / 27;
	D50 = [
		.3457 / .3585,
		1,
		.2958 / .3585
	];
	MATRIX_D50_TO_D65 = [
		[
			.955473421488075,
			-.02309845494876471,
			.06325924320057072
		],
		[
			-.0283697093338637,
			1.0099953980813041,
			.021041441191917323
		],
		[
			.012314014864481998,
			-.020507649298898964,
			1.330365926242124
		]
	];
	MATRIX_D65_TO_D50 = [
		[
			1.0479297925449969,
			.022946870601609652,
			-.05019226628920524
		],
		[
			.02962780877005599,
			.9904344267538799,
			-.017073799063418826
		],
		[
			-.009243040646204504,
			.015055191490298152,
			.7518742814281371
		]
	];
	MATRIX_L_RGB_TO_XYZ = [
		[
			506752 / 1228815,
			87881 / 245763,
			12673 / 70218
		],
		[
			87098 / 409605,
			175762 / 245763,
			12673 / 175545
		],
		[
			7918 / 409605,
			87881 / 737289,
			1001167 / 1053270
		]
	];
	MATRIX_XYZ_TO_L_RGB = [
		[
			12831 / 3959,
			-329 / 214,
			-1974 / 3959
		],
		[
			-851781 / 878810,
			1648619 / 878810,
			36519 / 878810
		],
		[
			705 / 12673,
			-2585 / 12673,
			705 / 667
		]
	];
	MATRIX_XYZ_TO_LMS = [
		[
			.819022437996703,
			.3619062600528904,
			-.1288737815209879
		],
		[
			.0329836539323885,
			.9292868615863434,
			.0361446663506424
		],
		[
			.0481771893596242,
			.2642395317527308,
			.6335478284694309
		]
	];
	MATRIX_LMS_TO_XYZ = [
		[
			1.2268798758459243,
			-.5578149944602171,
			.2813910456659647
		],
		[
			-.0405757452148008,
			1.112286803280317,
			-.0717110580655164
		],
		[
			-.0763729366746601,
			-.4214933324022432,
			1.5869240198367816
		]
	];
	MATRIX_OKLAB_TO_LMS = [
		[
			1,
			.3963377773761749,
			.2158037573099136
		],
		[
			1,
			-.1055613458156586,
			-.0638541728258133
		],
		[
			1,
			-.0894841775298119,
			-1.2914855480194092
		]
	];
	MATRIX_LMS_TO_OKLAB = [
		[
			.210454268309314,
			.7936177747023054,
			-.0040720430116193
		],
		[
			1.9779985324311684,
			-2.42859224204858,
			.450593709617411
		],
		[
			.0259040424655478,
			.7827717124575296,
			-.8086757549230774
		]
	];
	MATRIX_P3_TO_XYZ = [
		[
			608311 / 1250200,
			189793 / 714400,
			198249 / 1000160
		],
		[
			35783 / 156275,
			247089 / 357200,
			198249 / 2500400
		],
		[
			0 / 1,
			32229 / 714400,
			5220557 / 5000800
		]
	];
	MATRIX_REC2020_TO_XYZ = [
		[
			63426534 / 99577255,
			20160776 / 139408157,
			47086771 / 278816314
		],
		[
			26158966 / 99577255,
			472592308 / 697040785,
			8267143 / 139408157
		],
		[
			0 / 1,
			19567812 / 697040785,
			295819943 / 278816314
		]
	];
	MATRIX_A98_TO_XYZ = [
		[
			573536 / 994567,
			263643 / 1420810,
			187206 / 994567
		],
		[
			591459 / 1989134,
			6239551 / 9945670,
			374412 / 4972835
		],
		[
			53769 / 1989134,
			351524 / 4972835,
			4929758 / 4972835
		]
	];
	MATRIX_PROPHOTO_TO_XYZ_D50 = [
		[
			.7977666449006423,
			.13518129740053308,
			.0313477341283922
		],
		[
			.2880748288194013,
			.711835234241873,
			8993693872564e-17
		],
		[
			0,
			0,
			.8251046025104602
		]
	];
	REG_COLOR = new RegExp(`^(?:${SYN_COLOR_TYPE})$`);
	REG_CS_HUE = new RegExp(`^${CS_HUE_CAPT}$`);
	REG_CS_XYZ = /^xyz(?:-d(?:50|65))?$/;
	REG_CURRENT = /^currentColor$/i;
	REG_FN_COLOR = new RegExp(`^color\\(\\s*(${SYN_FN_COLOR})\\s*\\)$`);
	REG_HSL = new RegExp(`^hsla?\\(\\s*(${SYN_HSL}|${SYN_HSL_LV3})\\s*\\)$`);
	REG_HWB = new RegExp(`^hwb\\(\\s*(${SYN_HSL})\\s*\\)$`);
	REG_LAB = new RegExp(`^lab\\(\\s*(${SYN_MOD})\\s*\\)$`);
	REG_LCH = new RegExp(`^lch\\(\\s*(${SYN_LCH})\\s*\\)$`);
	REG_MIX = new RegExp(`^${SYN_MIX}$`);
	REG_MIX_CAPT = new RegExp(`^${SYN_MIX_CAPT}$`);
	REG_MIX_NEST = new RegExp(`${SYN_MIX}`, "g");
	REG_OKLAB = new RegExp(`^oklab\\(\\s*(${SYN_MOD})\\s*\\)$`);
	REG_OKLCH = new RegExp(`^oklch\\(\\s*(${SYN_LCH})\\s*\\)$`);
	REG_SPEC = /^(?:specifi|comput)edValue$/;
	REG_ANGLE_TO_DEG = new RegExp(`^(${NUM$1})(${ANGLE})?$`);
	REG_PARSE_RGB = new RegExp(`^rgba?\\(\\s*(${SYN_MOD}|${SYN_RGB_LV3})\\s*\\)$`);
	REG_MIX_CS_RGB_XYZ = new RegExp(`^(?:${CS_RGB}|${CS_XYZ})$`);
	REG_MIX_IN_CS = new RegExp(`in\\s+(${CS_MIX})`);
	REG_MIX_START = new RegExp(`^color-mix\\(\\s*in\\s+(${CS_MIX})\\s*,`);
	REG_MIX_COLOR_PART = new RegExp(`^(${SYN_COLOR_TYPE})(?:\\s+(${PCT$1}))?$`);
	NAMED_COLORS = {
		aliceblue: [
			240,
			248,
			255
		],
		antiquewhite: [
			250,
			235,
			215
		],
		aqua: [
			0,
			255,
			255
		],
		aquamarine: [
			127,
			255,
			212
		],
		azure: [
			240,
			255,
			255
		],
		beige: [
			245,
			245,
			220
		],
		bisque: [
			255,
			228,
			196
		],
		black: [
			0,
			0,
			0
		],
		blanchedalmond: [
			255,
			235,
			205
		],
		blue: [
			0,
			0,
			255
		],
		blueviolet: [
			138,
			43,
			226
		],
		brown: [
			165,
			42,
			42
		],
		burlywood: [
			222,
			184,
			135
		],
		cadetblue: [
			95,
			158,
			160
		],
		chartreuse: [
			127,
			255,
			0
		],
		chocolate: [
			210,
			105,
			30
		],
		coral: [
			255,
			127,
			80
		],
		cornflowerblue: [
			100,
			149,
			237
		],
		cornsilk: [
			255,
			248,
			220
		],
		crimson: [
			220,
			20,
			60
		],
		cyan: [
			0,
			255,
			255
		],
		darkblue: [
			0,
			0,
			139
		],
		darkcyan: [
			0,
			139,
			139
		],
		darkgoldenrod: [
			184,
			134,
			11
		],
		darkgray: [
			169,
			169,
			169
		],
		darkgreen: [
			0,
			100,
			0
		],
		darkgrey: [
			169,
			169,
			169
		],
		darkkhaki: [
			189,
			183,
			107
		],
		darkmagenta: [
			139,
			0,
			139
		],
		darkolivegreen: [
			85,
			107,
			47
		],
		darkorange: [
			255,
			140,
			0
		],
		darkorchid: [
			153,
			50,
			204
		],
		darkred: [
			139,
			0,
			0
		],
		darksalmon: [
			233,
			150,
			122
		],
		darkseagreen: [
			143,
			188,
			143
		],
		darkslateblue: [
			72,
			61,
			139
		],
		darkslategray: [
			47,
			79,
			79
		],
		darkslategrey: [
			47,
			79,
			79
		],
		darkturquoise: [
			0,
			206,
			209
		],
		darkviolet: [
			148,
			0,
			211
		],
		deeppink: [
			255,
			20,
			147
		],
		deepskyblue: [
			0,
			191,
			255
		],
		dimgray: [
			105,
			105,
			105
		],
		dimgrey: [
			105,
			105,
			105
		],
		dodgerblue: [
			30,
			144,
			255
		],
		firebrick: [
			178,
			34,
			34
		],
		floralwhite: [
			255,
			250,
			240
		],
		forestgreen: [
			34,
			139,
			34
		],
		fuchsia: [
			255,
			0,
			255
		],
		gainsboro: [
			220,
			220,
			220
		],
		ghostwhite: [
			248,
			248,
			255
		],
		gold: [
			255,
			215,
			0
		],
		goldenrod: [
			218,
			165,
			32
		],
		gray: [
			128,
			128,
			128
		],
		green: [
			0,
			128,
			0
		],
		greenyellow: [
			173,
			255,
			47
		],
		grey: [
			128,
			128,
			128
		],
		honeydew: [
			240,
			255,
			240
		],
		hotpink: [
			255,
			105,
			180
		],
		indianred: [
			205,
			92,
			92
		],
		indigo: [
			75,
			0,
			130
		],
		ivory: [
			255,
			255,
			240
		],
		khaki: [
			240,
			230,
			140
		],
		lavender: [
			230,
			230,
			250
		],
		lavenderblush: [
			255,
			240,
			245
		],
		lawngreen: [
			124,
			252,
			0
		],
		lemonchiffon: [
			255,
			250,
			205
		],
		lightblue: [
			173,
			216,
			230
		],
		lightcoral: [
			240,
			128,
			128
		],
		lightcyan: [
			224,
			255,
			255
		],
		lightgoldenrodyellow: [
			250,
			250,
			210
		],
		lightgray: [
			211,
			211,
			211
		],
		lightgreen: [
			144,
			238,
			144
		],
		lightgrey: [
			211,
			211,
			211
		],
		lightpink: [
			255,
			182,
			193
		],
		lightsalmon: [
			255,
			160,
			122
		],
		lightseagreen: [
			32,
			178,
			170
		],
		lightskyblue: [
			135,
			206,
			250
		],
		lightslategray: [
			119,
			136,
			153
		],
		lightslategrey: [
			119,
			136,
			153
		],
		lightsteelblue: [
			176,
			196,
			222
		],
		lightyellow: [
			255,
			255,
			224
		],
		lime: [
			0,
			255,
			0
		],
		limegreen: [
			50,
			205,
			50
		],
		linen: [
			250,
			240,
			230
		],
		magenta: [
			255,
			0,
			255
		],
		maroon: [
			128,
			0,
			0
		],
		mediumaquamarine: [
			102,
			205,
			170
		],
		mediumblue: [
			0,
			0,
			205
		],
		mediumorchid: [
			186,
			85,
			211
		],
		mediumpurple: [
			147,
			112,
			219
		],
		mediumseagreen: [
			60,
			179,
			113
		],
		mediumslateblue: [
			123,
			104,
			238
		],
		mediumspringgreen: [
			0,
			250,
			154
		],
		mediumturquoise: [
			72,
			209,
			204
		],
		mediumvioletred: [
			199,
			21,
			133
		],
		midnightblue: [
			25,
			25,
			112
		],
		mintcream: [
			245,
			255,
			250
		],
		mistyrose: [
			255,
			228,
			225
		],
		moccasin: [
			255,
			228,
			181
		],
		navajowhite: [
			255,
			222,
			173
		],
		navy: [
			0,
			0,
			128
		],
		oldlace: [
			253,
			245,
			230
		],
		olive: [
			128,
			128,
			0
		],
		olivedrab: [
			107,
			142,
			35
		],
		orange: [
			255,
			165,
			0
		],
		orangered: [
			255,
			69,
			0
		],
		orchid: [
			218,
			112,
			214
		],
		palegoldenrod: [
			238,
			232,
			170
		],
		palegreen: [
			152,
			251,
			152
		],
		paleturquoise: [
			175,
			238,
			238
		],
		palevioletred: [
			219,
			112,
			147
		],
		papayawhip: [
			255,
			239,
			213
		],
		peachpuff: [
			255,
			218,
			185
		],
		peru: [
			205,
			133,
			63
		],
		pink: [
			255,
			192,
			203
		],
		plum: [
			221,
			160,
			221
		],
		powderblue: [
			176,
			224,
			230
		],
		purple: [
			128,
			0,
			128
		],
		rebeccapurple: [
			102,
			51,
			153
		],
		red: [
			255,
			0,
			0
		],
		rosybrown: [
			188,
			143,
			143
		],
		royalblue: [
			65,
			105,
			225
		],
		saddlebrown: [
			139,
			69,
			19
		],
		salmon: [
			250,
			128,
			114
		],
		sandybrown: [
			244,
			164,
			96
		],
		seagreen: [
			46,
			139,
			87
		],
		seashell: [
			255,
			245,
			238
		],
		sienna: [
			160,
			82,
			45
		],
		silver: [
			192,
			192,
			192
		],
		skyblue: [
			135,
			206,
			235
		],
		slateblue: [
			106,
			90,
			205
		],
		slategray: [
			112,
			128,
			144
		],
		slategrey: [
			112,
			128,
			144
		],
		snow: [
			255,
			250,
			250
		],
		springgreen: [
			0,
			255,
			127
		],
		steelblue: [
			70,
			130,
			180
		],
		tan: [
			210,
			180,
			140
		],
		teal: [
			0,
			128,
			128
		],
		thistle: [
			216,
			191,
			216
		],
		tomato: [
			255,
			99,
			71
		],
		turquoise: [
			64,
			224,
			208
		],
		violet: [
			238,
			130,
			238
		],
		wheat: [
			245,
			222,
			179
		],
		white: [
			255,
			255,
			255
		],
		whitesmoke: [
			245,
			245,
			245
		],
		yellow: [
			255,
			255,
			0
		],
		yellowgreen: [
			154,
			205,
			50
		]
	};
	cacheInvalidColorValue = (cacheKey, format, nullable = false) => {
		if (format === "specifiedValue") {
			const res = "";
			setCache(cacheKey, res);
			return res;
		}
		if (nullable) {
			setCache(cacheKey, null);
			return new NullObject();
		}
		const res = [
			"rgb",
			0,
			0,
			0,
			0
		];
		setCache(cacheKey, res);
		return res;
	};
	resolveInvalidColorValue = (format, nullable = false) => {
		switch (format) {
			case "hsl":
			case "hwb":
			case VAL_MIX: return new NullObject();
			case VAL_SPEC: return "";
			default:
				if (nullable) return new NullObject();
				return [
					"rgb",
					0,
					0,
					0,
					0
				];
		}
	};
	validateColorComponents = (arr, opt = {}) => {
		if (!Array.isArray(arr)) throw new TypeError(`${arr} is not an array.`);
		const { alpha = false, minLength = TRIA$1, maxLength = QUAD, minRange = 0, maxRange = 1, validateRange = true } = opt;
		if (!Number.isFinite(minLength)) throw new TypeError(`${minLength} is not a number.`);
		if (!Number.isFinite(maxLength)) throw new TypeError(`${maxLength} is not a number.`);
		if (!Number.isFinite(minRange)) throw new TypeError(`${minRange} is not a number.`);
		if (!Number.isFinite(maxRange)) throw new TypeError(`${maxRange} is not a number.`);
		const l = arr.length;
		if (l < minLength || l > maxLength) throw new Error(`Unexpected array length ${l}.`);
		let i = 0;
		while (i < l) {
			const v = arr[i];
			if (!Number.isFinite(v)) throw new TypeError(`${v} is not a number.`);
			else if (i < TRIA$1 && validateRange && (v < minRange || v > maxRange)) throw new RangeError(`${v} is not between ${minRange} and ${maxRange}.`);
			else if (i === TRIA$1 && (v < 0 || v > 1)) throw new RangeError(`${v} is not between 0 and 1.`);
			i++;
		}
		if (alpha && l === TRIA$1) arr.push(1);
		return arr;
	};
	transformMatrix = (mtx, vct, skip = false) => {
		if (!Array.isArray(mtx)) throw new TypeError(`${mtx} is not an array.`);
		else if (mtx.length !== TRIA$1) throw new Error(`Unexpected array length ${mtx.length}.`);
		else if (!skip) for (let i of mtx) i = validateColorComponents(i, {
			maxLength: TRIA$1,
			validateRange: false
		});
		const [[r1c1, r1c2, r1c3], [r2c1, r2c2, r2c3], [r3c1, r3c2, r3c3]] = mtx;
		let v1, v2, v3;
		if (skip) [v1, v2, v3] = vct;
		else [v1, v2, v3] = validateColorComponents(vct, {
			maxLength: TRIA$1,
			validateRange: false
		});
		return [
			r1c1 * v1 + r1c2 * v2 + r1c3 * v3,
			r2c1 * v1 + r2c2 * v2 + r2c3 * v3,
			r3c1 * v1 + r3c2 * v2 + r3c3 * v3
		];
	};
	normalizeColorComponents = (colorA, colorB, skip = false) => {
		if (!Array.isArray(colorA)) throw new TypeError(`${colorA} is not an array.`);
		else if (colorA.length !== QUAD) throw new Error(`Unexpected array length ${colorA.length}.`);
		if (!Array.isArray(colorB)) throw new TypeError(`${colorB} is not an array.`);
		else if (colorB.length !== QUAD) throw new Error(`Unexpected array length ${colorB.length}.`);
		let i = 0;
		while (i < QUAD) {
			if (colorA[i] === "none" && colorB[i] === "none") {
				colorA[i] = 0;
				colorB[i] = 0;
			} else if (colorA[i] === "none") colorA[i] = colorB[i];
			else if (colorB[i] === "none") colorB[i] = colorA[i];
			i++;
		}
		if (skip) return [colorA, colorB];
		return [validateColorComponents(colorA, {
			minLength: QUAD,
			validateRange: false
		}), validateColorComponents(colorB, {
			minLength: QUAD,
			validateRange: false
		})];
	};
	numberToHexString = (value) => {
		if (!Number.isFinite(value)) throw new TypeError(`${value} is not a number.`);
		else {
			value = Math.round(value);
			if (value < 0 || value > MAX_RGB$1) throw new RangeError(`${value} is not between 0 and ${MAX_RGB$1}.`);
		}
		let hex = value.toString(HEX$2);
		if (hex.length === 1) hex = `0${hex}`;
		return hex;
	};
	angleToDeg = (angle) => {
		if (isString(angle)) angle = angle.trim();
		else throw new TypeError(`${angle} is not a string.`);
		const GRAD = DEG / 400;
		const RAD = DEG / (Math.PI * DUO);
		if (!REG_ANGLE_TO_DEG.test(angle)) throw new SyntaxError(`Invalid property value: ${angle}`);
		const [, value, unit] = angle.match(REG_ANGLE_TO_DEG);
		let deg;
		switch (unit) {
			case "grad":
				deg = parseFloat(value) * GRAD;
				break;
			case "rad":
				deg = parseFloat(value) * RAD;
				break;
			case "turn":
				deg = parseFloat(value) * DEG;
				break;
			default: deg = parseFloat(value);
		}
		deg %= DEG;
		if (deg < 0) deg += DEG;
		else if (Object.is(deg, -0)) deg = 0;
		return deg;
	};
	parseAlpha = (alpha = "") => {
		if (isString(alpha)) {
			alpha = alpha.trim();
			if (!alpha) alpha = "1";
			else if (alpha === "none") alpha = "0";
			else {
				let a;
				if (alpha.endsWith("%")) a = parseFloat(alpha) / MAX_PCT$2;
				else a = parseFloat(alpha);
				if (!Number.isFinite(a)) throw new TypeError(`${a} is not a finite number.`);
				if (a < PPTH) alpha = "0";
				else if (a > 1) alpha = "1";
				else alpha = a.toFixed(TRIA$1);
			}
		} else alpha = "1";
		return parseFloat(alpha);
	};
	parseHexAlpha = (value) => {
		if (isString(value)) {
			if (value === "") throw new SyntaxError("Invalid property value: (empty string)");
			value = value.trim();
		} else throw new TypeError(`${value} is not a string.`);
		let alpha = parseInt(value, HEX$2);
		if (alpha <= 0) return 0;
		if (alpha >= MAX_RGB$1) return 1;
		const alphaMap = /* @__PURE__ */ new Map();
		for (let i = 1; i < MAX_PCT$2; i++) alphaMap.set(Math.round(i * MAX_RGB$1 / MAX_PCT$2), i);
		if (alphaMap.has(alpha)) alpha = alphaMap.get(alpha) / MAX_PCT$2;
		else alpha = Math.round(alpha / MAX_RGB$1 / PPTH) * PPTH;
		return parseFloat(alpha.toFixed(TRIA$1));
	};
	transformRgbToLinearRgb = (rgb, skip = false) => {
		let rr, gg, bb;
		if (skip) [rr, gg, bb] = rgb;
		else [rr, gg, bb] = validateColorComponents(rgb, {
			maxLength: TRIA$1,
			maxRange: MAX_RGB$1
		});
		let r = rr / MAX_RGB$1;
		let g = gg / MAX_RGB$1;
		let b = bb / MAX_RGB$1;
		const COND_POW = .04045;
		if (r > COND_POW) r = Math.pow((r + LINEAR_OFFSET) / (1 + LINEAR_OFFSET), POW_LINEAR);
		else r /= LINEAR_COEF;
		if (g > COND_POW) g = Math.pow((g + LINEAR_OFFSET) / (1 + LINEAR_OFFSET), POW_LINEAR);
		else g /= LINEAR_COEF;
		if (b > COND_POW) b = Math.pow((b + LINEAR_OFFSET) / (1 + LINEAR_OFFSET), POW_LINEAR);
		else b /= LINEAR_COEF;
		return [
			r,
			g,
			b
		];
	};
	transformRgbToXyz = (rgb, skip = false) => {
		if (!skip) rgb = validateColorComponents(rgb, {
			maxLength: TRIA$1,
			maxRange: MAX_RGB$1
		});
		rgb = transformRgbToLinearRgb(rgb, true);
		return transformMatrix(MATRIX_L_RGB_TO_XYZ, rgb, true);
	};
	transformLinearRgbToRgb = (rgb, round = false) => {
		let [r, g, b] = validateColorComponents(rgb, { maxLength: TRIA$1 });
		const COND_POW = 809 / 258400;
		if (r > COND_POW) r = Math.pow(r, 1 / POW_LINEAR) * (1 + LINEAR_OFFSET) - LINEAR_OFFSET;
		else r *= LINEAR_COEF;
		r *= MAX_RGB$1;
		if (g > COND_POW) g = Math.pow(g, 1 / POW_LINEAR) * (1 + LINEAR_OFFSET) - LINEAR_OFFSET;
		else g *= LINEAR_COEF;
		g *= MAX_RGB$1;
		if (b > COND_POW) b = Math.pow(b, 1 / POW_LINEAR) * (1 + LINEAR_OFFSET) - LINEAR_OFFSET;
		else b *= LINEAR_COEF;
		b *= MAX_RGB$1;
		return [
			round ? Math.round(r) : r,
			round ? Math.round(g) : g,
			round ? Math.round(b) : b
		];
	};
	transformXyzToRgb = (xyz, skip = false) => {
		if (!skip) xyz = validateColorComponents(xyz, {
			maxLength: TRIA$1,
			validateRange: false
		});
		let [r, g, b] = transformMatrix(MATRIX_XYZ_TO_L_RGB, xyz, true);
		[r, g, b] = transformLinearRgbToRgb([
			Math.min(Math.max(r, 0), 1),
			Math.min(Math.max(g, 0), 1),
			Math.min(Math.max(b, 0), 1)
		], true);
		return [
			r,
			g,
			b
		];
	};
	transformXyzToHsl = (xyz, skip = false) => {
		const [rr, gg, bb] = transformXyzToRgb(xyz, skip);
		const r = rr / MAX_RGB$1;
		const g = gg / MAX_RGB$1;
		const b = bb / MAX_RGB$1;
		const max = Math.max(r, g, b);
		const min = Math.min(r, g, b);
		const d = max - min;
		const l = (max + min) * HALF * MAX_PCT$2;
		let h, s;
		if (Math.round(l) === 0 || Math.round(l) === MAX_PCT$2) {
			h = 0;
			s = 0;
		} else {
			s = d / (1 - Math.abs(max + min - 1)) * MAX_PCT$2;
			if (s === 0) h = 0;
			else {
				switch (max) {
					case r:
						h = (g - b) / d;
						break;
					case g:
						h = (b - r) / d + DUO;
						break;
					case b:
					default:
						h = (r - g) / d + QUAD;
						break;
				}
				h = h * SEXA % DEG;
				if (h < 0) h += DEG;
			}
		}
		return [
			h,
			s,
			l
		];
	};
	transformXyzToHwb = (xyz, skip = false) => {
		const [r, g, b] = transformXyzToRgb(xyz, skip);
		const wh = Math.min(r, g, b) / MAX_RGB$1;
		const bk = 1 - Math.max(r, g, b) / MAX_RGB$1;
		let h;
		if (wh + bk === 1) h = 0;
		else [h] = transformXyzToHsl(xyz);
		return [
			h,
			wh * MAX_PCT$2,
			bk * MAX_PCT$2
		];
	};
	transformXyzToOklab = (xyz, skip = false) => {
		if (!skip) xyz = validateColorComponents(xyz, {
			maxLength: TRIA$1,
			validateRange: false
		});
		let [l, a, b] = transformMatrix(MATRIX_LMS_TO_OKLAB, transformMatrix(MATRIX_XYZ_TO_LMS, xyz, true).map((c) => Math.cbrt(c)), true);
		l = Math.min(Math.max(l, 0), 1);
		const lPct = Math.round(parseFloat(l.toFixed(QUAD)) * MAX_PCT$2);
		if (lPct === 0 || lPct === MAX_PCT$2) {
			a = 0;
			b = 0;
		}
		return [
			l,
			a,
			b
		];
	};
	transformXyzToOklch = (xyz, skip = false) => {
		const [l, a, b] = transformXyzToOklab(xyz, skip);
		let c, h;
		const lPct = Math.round(parseFloat(l.toFixed(QUAD)) * MAX_PCT$2);
		if (lPct === 0 || lPct === MAX_PCT$2) {
			c = 0;
			h = 0;
		} else {
			c = Math.max(Math.sqrt(Math.pow(a, POW_SQR) + Math.pow(b, POW_SQR)), 0);
			if (parseFloat(c.toFixed(QUAD)) === 0) h = 0;
			else {
				h = Math.atan2(b, a) * DEG_HALF / Math.PI;
				if (h < 0) h += DEG;
			}
		}
		return [
			l,
			c,
			h
		];
	};
	transformXyzD50ToRgb = (xyz, skip = false) => {
		if (!skip) xyz = validateColorComponents(xyz, {
			maxLength: TRIA$1,
			validateRange: false
		});
		return transformXyzToRgb(transformMatrix(MATRIX_D50_TO_D65, xyz, true), true);
	};
	transformXyzD50ToLab = (xyz, skip = false) => {
		if (!skip) xyz = validateColorComponents(xyz, {
			maxLength: TRIA$1,
			validateRange: false
		});
		const [f0, f1, f2] = xyz.map((val, i) => val / D50[i]).map((val) => val > LAB_EPSILON ? Math.cbrt(val) : (val * LAB_KAPPA + HEX$2) / LAB_L);
		const l = Math.min(Math.max(LAB_L * f1 - HEX$2, 0), MAX_PCT$2);
		let a, b;
		if (l === 0 || l === MAX_PCT$2) {
			a = 0;
			b = 0;
		} else {
			a = (f0 - f1) * LAB_A;
			b = (f1 - f2) * LAB_B;
		}
		return [
			l,
			a,
			b
		];
	};
	transformXyzD50ToLch = (xyz, skip = false) => {
		const [l, a, b] = transformXyzD50ToLab(xyz, skip);
		let c, h;
		if (l === 0 || l === MAX_PCT$2) {
			c = 0;
			h = 0;
		} else {
			c = Math.max(Math.sqrt(Math.pow(a, POW_SQR) + Math.pow(b, POW_SQR)), 0);
			h = Math.atan2(b, a) * DEG_HALF / Math.PI;
			if (h < 0) h += DEG;
		}
		return [
			l,
			c,
			h
		];
	};
	convertRgbToHex = (rgb) => {
		const [r, g, b, alpha] = validateColorComponents(rgb, {
			alpha: true,
			maxRange: MAX_RGB$1
		});
		const rr = numberToHexString(r);
		const gg = numberToHexString(g);
		const bb = numberToHexString(b);
		const aa = numberToHexString(alpha * MAX_RGB$1);
		let hex;
		if (aa === "ff") hex = `#${rr}${gg}${bb}`;
		else hex = `#${rr}${gg}${bb}${aa}`;
		return hex;
	};
	convertHexToRgb = (value) => {
		if (isString(value)) value = value.toLowerCase().trim();
		else throw new TypeError(`${value} is not a string.`);
		if (!(/^#[\da-f]{6}$/.test(value) || /^#[\da-f]{3}$/.test(value) || /^#[\da-f]{8}$/.test(value) || /^#[\da-f]{4}$/.test(value))) throw new SyntaxError(`Invalid property value: ${value}`);
		const arr = [];
		if (/^#[\da-f]{3}$/.test(value)) {
			const [, r, g, b] = value.match(/^#([\da-f])([\da-f])([\da-f])$/);
			arr.push(parseInt(`${r}${r}`, HEX$2), parseInt(`${g}${g}`, HEX$2), parseInt(`${b}${b}`, HEX$2), 1);
		} else if (/^#[\da-f]{4}$/.test(value)) {
			const [, r, g, b, alpha] = value.match(/^#([\da-f])([\da-f])([\da-f])([\da-f])$/);
			arr.push(parseInt(`${r}${r}`, HEX$2), parseInt(`${g}${g}`, HEX$2), parseInt(`${b}${b}`, HEX$2), parseHexAlpha(`${alpha}${alpha}`));
		} else if (/^#[\da-f]{8}$/.test(value)) {
			const [, r, g, b, alpha] = value.match(/^#([\da-f]{2})([\da-f]{2})([\da-f]{2})([\da-f]{2})$/);
			arr.push(parseInt(r, HEX$2), parseInt(g, HEX$2), parseInt(b, HEX$2), parseHexAlpha(alpha));
		} else {
			const [, r, g, b] = value.match(/^#([\da-f]{2})([\da-f]{2})([\da-f]{2})$/);
			arr.push(parseInt(r, HEX$2), parseInt(g, HEX$2), parseInt(b, HEX$2), 1);
		}
		return arr;
	};
	convertHexToLinearRgb = (value) => {
		const [rr, gg, bb, alpha] = convertHexToRgb(value);
		const [r, g, b] = transformRgbToLinearRgb([
			rr,
			gg,
			bb
		], true);
		return [
			r,
			g,
			b,
			alpha
		];
	};
	convertHexToXyz = (value) => {
		const [r, g, b, alpha] = convertHexToLinearRgb(value);
		const [x, y, z] = transformMatrix(MATRIX_L_RGB_TO_XYZ, [
			r,
			g,
			b
		], true);
		return [
			x,
			y,
			z,
			alpha
		];
	};
	parseRgb = (value, opt = {}) => {
		if (isString(value)) value = value.toLowerCase().trim();
		else throw new TypeError(`${value} is not a string.`);
		const { format = "", nullable = false } = opt;
		if (!REG_PARSE_RGB.test(value)) {
			const res = resolveInvalidColorValue(format, nullable);
			if (res instanceof NullObject) return res;
			if (isString(res)) return res;
			return res;
		}
		const [, val] = value.match(REG_PARSE_RGB);
		const [v1, v2, v3, v4 = ""] = val.match(/[^\s,/]+/g);
		let r, g, b;
		if (v1 === "none") r = 0;
		else {
			if (v1.endsWith("%")) r = parseFloat(v1) * MAX_RGB$1 / MAX_PCT$2;
			else r = parseFloat(v1);
			r = Math.min(Math.max(roundToPrecision(r, OCT$1), 0), MAX_RGB$1);
		}
		if (v2 === "none") g = 0;
		else {
			if (v2.endsWith("%")) g = parseFloat(v2) * MAX_RGB$1 / MAX_PCT$2;
			else g = parseFloat(v2);
			g = Math.min(Math.max(roundToPrecision(g, OCT$1), 0), MAX_RGB$1);
		}
		if (v3 === "none") b = 0;
		else {
			if (v3.endsWith("%")) b = parseFloat(v3) * MAX_RGB$1 / MAX_PCT$2;
			else b = parseFloat(v3);
			b = Math.min(Math.max(roundToPrecision(b, OCT$1), 0), MAX_RGB$1);
		}
		const alpha = parseAlpha(v4);
		return [
			"rgb",
			r,
			g,
			b,
			format === "mixValue" && v4 === "none" ? NONE : alpha
		];
	};
	parseHsl = (value, opt = {}) => {
		if (isString(value)) value = value.trim();
		else throw new TypeError(`${value} is not a string.`);
		const { format = "", nullable = false } = opt;
		if (!REG_HSL.test(value)) {
			const res = resolveInvalidColorValue(format, nullable);
			if (res instanceof NullObject) return res;
			if (isString(res)) return res;
			return res;
		}
		const [, val] = value.match(REG_HSL);
		const [v1, v2, v3, v4 = ""] = val.match(/[^\s,/]+/g);
		let h, s, l;
		if (v1 === "none") h = 0;
		else h = angleToDeg(v1);
		if (v2 === "none") s = 0;
		else s = Math.min(Math.max(parseFloat(v2), 0), MAX_PCT$2);
		if (v3 === "none") l = 0;
		else l = Math.min(Math.max(parseFloat(v3), 0), MAX_PCT$2);
		const alpha = parseAlpha(v4);
		if (format === "hsl") return [
			format,
			v1 === "none" ? v1 : h,
			v2 === "none" ? v2 : s,
			v3 === "none" ? v3 : l,
			v4 === "none" ? v4 : alpha
		];
		h = h / DEG * DOZ;
		l /= MAX_PCT$2;
		const sa = s / MAX_PCT$2 * Math.min(l, 1 - l);
		const rk = h % DOZ;
		const gk = (8 + h) % DOZ;
		const bk = (4 + h) % DOZ;
		const r = l - sa * Math.max(-1, Math.min(rk - TRIA$1, TRIA$1 ** POW_SQR - rk, 1));
		const g = l - sa * Math.max(-1, Math.min(gk - TRIA$1, TRIA$1 ** POW_SQR - gk, 1));
		const b = l - sa * Math.max(-1, Math.min(bk - TRIA$1, TRIA$1 ** POW_SQR - bk, 1));
		return [
			"rgb",
			Math.min(Math.max(roundToPrecision(r * MAX_RGB$1, OCT$1), 0), MAX_RGB$1),
			Math.min(Math.max(roundToPrecision(g * MAX_RGB$1, OCT$1), 0), MAX_RGB$1),
			Math.min(Math.max(roundToPrecision(b * MAX_RGB$1, OCT$1), 0), MAX_RGB$1),
			alpha
		];
	};
	parseHwb = (value, opt = {}) => {
		if (isString(value)) value = value.trim();
		else throw new TypeError(`${value} is not a string.`);
		const { format = "", nullable = false } = opt;
		if (!REG_HWB.test(value)) {
			const res = resolveInvalidColorValue(format, nullable);
			if (res instanceof NullObject) return res;
			if (isString(res)) return res;
			return res;
		}
		const [, val] = value.match(REG_HWB);
		const [v1, v2, v3, v4 = ""] = val.match(/[^\s,/]+/g);
		let h, wh, bk;
		if (v1 === "none") h = 0;
		else h = angleToDeg(v1);
		if (v2 === "none") wh = 0;
		else wh = Math.min(Math.max(parseFloat(v2), 0), MAX_PCT$2) / MAX_PCT$2;
		if (v3 === "none") bk = 0;
		else bk = Math.min(Math.max(parseFloat(v3), 0), MAX_PCT$2) / MAX_PCT$2;
		const alpha = parseAlpha(v4);
		if (format === "hwb") return [
			format,
			v1 === "none" ? v1 : h,
			v2 === "none" ? v2 : wh * MAX_PCT$2,
			v3 === "none" ? v3 : bk * MAX_PCT$2,
			v4 === "none" ? v4 : alpha
		];
		if (wh + bk >= 1) {
			const v = roundToPrecision(wh / (wh + bk) * MAX_RGB$1, OCT$1);
			return [
				"rgb",
				v,
				v,
				v,
				alpha
			];
		}
		const factor = (1 - wh - bk) / MAX_RGB$1;
		let [, r, g, b] = parseHsl(`hsl(${h} 100 50)`);
		r = roundToPrecision((r * factor + wh) * MAX_RGB$1, OCT$1);
		g = roundToPrecision((g * factor + wh) * MAX_RGB$1, OCT$1);
		b = roundToPrecision((b * factor + wh) * MAX_RGB$1, OCT$1);
		return [
			"rgb",
			Math.min(Math.max(r, 0), MAX_RGB$1),
			Math.min(Math.max(g, 0), MAX_RGB$1),
			Math.min(Math.max(b, 0), MAX_RGB$1),
			alpha
		];
	};
	parseLab = (value, opt = {}) => {
		if (isString(value)) value = value.trim();
		else throw new TypeError(`${value} is not a string.`);
		const { format = "", nullable = false } = opt;
		if (!REG_LAB.test(value)) {
			const res = resolveInvalidColorValue(format, nullable);
			if (res instanceof NullObject) return res;
			if (isString(res)) return res;
			return res;
		}
		const COEF_PCT = 1.25;
		const COND_POW = 8;
		const [, val] = value.match(REG_LAB);
		const [v1, v2, v3, v4 = ""] = val.match(/[^\s,/]+/g);
		let l, a, b;
		if (v1 === "none") l = 0;
		else {
			if (v1.endsWith("%")) {
				l = parseFloat(v1);
				if (l > MAX_PCT$2) l = MAX_PCT$2;
			} else l = parseFloat(v1);
			if (l < 0) l = 0;
		}
		if (v2 === "none") a = 0;
		else a = v2.endsWith("%") ? parseFloat(v2) * COEF_PCT : parseFloat(v2);
		if (v3 === "none") b = 0;
		else b = v3.endsWith("%") ? parseFloat(v3) * COEF_PCT : parseFloat(v3);
		const alpha = parseAlpha(v4);
		if (REG_SPEC.test(format)) return [
			"lab",
			v1 === "none" ? v1 : roundToPrecision(l, HEX$2),
			v2 === "none" ? v2 : roundToPrecision(a, HEX$2),
			v3 === "none" ? v3 : roundToPrecision(b, HEX$2),
			v4 === "none" ? v4 : alpha
		];
		const fl = (l + HEX$2) / LAB_L;
		const fa = a / LAB_A + fl;
		const fb = fl - b / LAB_B;
		const powFl = Math.pow(fl, POW_CUBE);
		const powFa = Math.pow(fa, POW_CUBE);
		const powFb = Math.pow(fb, POW_CUBE);
		const [x, y, z] = [
			powFa > LAB_EPSILON ? powFa : (fa * LAB_L - HEX$2) / LAB_KAPPA,
			l > COND_POW ? powFl : l / LAB_KAPPA,
			powFb > LAB_EPSILON ? powFb : (fb * LAB_L - HEX$2) / LAB_KAPPA
		].map((val, i) => val * D50[i]);
		return [
			"xyz-d50",
			roundToPrecision(x, HEX$2),
			roundToPrecision(y, HEX$2),
			roundToPrecision(z, HEX$2),
			alpha
		];
	};
	parseLch = (value, opt = {}) => {
		if (isString(value)) value = value.trim();
		else throw new TypeError(`${value} is not a string.`);
		const { format = "", nullable = false } = opt;
		if (!REG_LCH.test(value)) {
			const res = resolveInvalidColorValue(format, nullable);
			if (res instanceof NullObject) return res;
			if (isString(res)) return res;
			return res;
		}
		const COEF_PCT = 1.5;
		const [, val] = value.match(REG_LCH);
		const [v1, v2, v3, v4 = ""] = val.match(/[^\s,/]+/g);
		let l, c, h;
		if (v1 === "none") l = 0;
		else {
			l = parseFloat(v1);
			if (l < 0) l = 0;
		}
		if (v2 === "none") c = 0;
		else c = v2.endsWith("%") ? parseFloat(v2) * COEF_PCT : parseFloat(v2);
		if (v3 === "none") h = 0;
		else h = angleToDeg(v3);
		const alpha = parseAlpha(v4);
		if (REG_SPEC.test(format)) return [
			"lch",
			v1 === "none" ? v1 : roundToPrecision(l, HEX$2),
			v2 === "none" ? v2 : roundToPrecision(c, HEX$2),
			v3 === "none" ? v3 : roundToPrecision(h, HEX$2),
			v4 === "none" ? v4 : alpha
		];
		const a = c * Math.cos(h * Math.PI / DEG_HALF);
		const b = c * Math.sin(h * Math.PI / DEG_HALF);
		const [, x, y, z] = parseLab(`lab(${l} ${a} ${b})`);
		return [
			"xyz-d50",
			roundToPrecision(x, HEX$2),
			roundToPrecision(y, HEX$2),
			roundToPrecision(z, HEX$2),
			alpha
		];
	};
	parseOklab = (value, opt = {}) => {
		if (isString(value)) value = value.trim();
		else throw new TypeError(`${value} is not a string.`);
		const { format = "", nullable = false } = opt;
		if (!REG_OKLAB.test(value)) {
			const res = resolveInvalidColorValue(format, nullable);
			if (res instanceof NullObject) return res;
			if (isString(res)) return res;
			return res;
		}
		const COEF_PCT = .4;
		const [, val] = value.match(REG_OKLAB);
		const [v1, v2, v3, v4 = ""] = val.match(/[^\s,/]+/g);
		let l, a, b;
		if (v1 === "none") l = 0;
		else {
			l = v1.endsWith("%") ? parseFloat(v1) / MAX_PCT$2 : parseFloat(v1);
			if (l < 0) l = 0;
		}
		if (v2 === "none") a = 0;
		else if (v2.endsWith("%")) a = parseFloat(v2) * COEF_PCT / MAX_PCT$2;
		else a = parseFloat(v2);
		if (v3 === "none") b = 0;
		else if (v3.endsWith("%")) b = parseFloat(v3) * COEF_PCT / MAX_PCT$2;
		else b = parseFloat(v3);
		const alpha = parseAlpha(v4);
		if (REG_SPEC.test(format)) return [
			"oklab",
			v1 === "none" ? v1 : roundToPrecision(l, HEX$2),
			v2 === "none" ? v2 : roundToPrecision(a, HEX$2),
			v3 === "none" ? v3 : roundToPrecision(b, HEX$2),
			v4 === "none" ? v4 : alpha
		];
		const [x, y, z] = transformMatrix(MATRIX_LMS_TO_XYZ, transformMatrix(MATRIX_OKLAB_TO_LMS, [
			l,
			a,
			b
		]).map((c) => Math.pow(c, POW_CUBE)), true);
		return [
			"xyz-d65",
			roundToPrecision(x, HEX$2),
			roundToPrecision(y, HEX$2),
			roundToPrecision(z, HEX$2),
			alpha
		];
	};
	parseOklch = (value, opt = {}) => {
		if (isString(value)) value = value.trim();
		else throw new TypeError(`${value} is not a string.`);
		const { format = "", nullable = false } = opt;
		if (!REG_OKLCH.test(value)) {
			const res = resolveInvalidColorValue(format, nullable);
			if (res instanceof NullObject) return res;
			if (isString(res)) return res;
			return res;
		}
		const COEF_PCT = .4;
		const [, val] = value.match(REG_OKLCH);
		const [v1, v2, v3, v4 = ""] = val.match(/[^\s,/]+/g);
		let l, c, h;
		if (v1 === "none") l = 0;
		else {
			l = v1.endsWith("%") ? parseFloat(v1) / MAX_PCT$2 : parseFloat(v1);
			if (l < 0) l = 0;
		}
		if (v2 === "none") c = 0;
		else {
			if (v2.endsWith("%")) c = parseFloat(v2) * COEF_PCT / MAX_PCT$2;
			else c = parseFloat(v2);
			if (c < 0) c = 0;
		}
		if (v3 === "none") h = 0;
		else h = angleToDeg(v3);
		const alpha = parseAlpha(v4);
		if (REG_SPEC.test(format)) return [
			"oklch",
			v1 === "none" ? v1 : roundToPrecision(l, HEX$2),
			v2 === "none" ? v2 : roundToPrecision(c, HEX$2),
			v3 === "none" ? v3 : roundToPrecision(h, HEX$2),
			v4 === "none" ? v4 : alpha
		];
		const a = c * Math.cos(h * Math.PI / DEG_HALF);
		const b = c * Math.sin(h * Math.PI / DEG_HALF);
		const [x, y, z] = transformMatrix(MATRIX_LMS_TO_XYZ, transformMatrix(MATRIX_OKLAB_TO_LMS, [
			l,
			a,
			b
		]).map((cc) => Math.pow(cc, POW_CUBE)), true);
		return [
			"xyz-d65",
			roundToPrecision(x, HEX$2),
			roundToPrecision(y, HEX$2),
			roundToPrecision(z, HEX$2),
			alpha
		];
	};
	parseColorFunc = (value, opt = {}) => {
		if (isString(value)) value = value.trim();
		else throw new TypeError(`${value} is not a string.`);
		const { colorSpace = "", d50 = false, format = "", nullable = false } = opt;
		if (!REG_FN_COLOR.test(value)) {
			const res = resolveInvalidColorValue(format, nullable);
			if (res instanceof NullObject) return res;
			if (isString(res)) return res;
			return res;
		}
		const [, val] = value.match(REG_FN_COLOR);
		let [cs, v1, v2, v3, v4 = ""] = val.match(/[^\s,/]+/g);
		let r, g, b;
		if (cs === "xyz") cs = "xyz-d65";
		if (v1 === "none") r = 0;
		else r = v1.endsWith("%") ? parseFloat(v1) / MAX_PCT$2 : parseFloat(v1);
		if (v2 === "none") g = 0;
		else g = v2.endsWith("%") ? parseFloat(v2) / MAX_PCT$2 : parseFloat(v2);
		if (v3 === "none") b = 0;
		else b = v3.endsWith("%") ? parseFloat(v3) / MAX_PCT$2 : parseFloat(v3);
		const alpha = parseAlpha(v4);
		if (REG_SPEC.test(format) || format === "mixValue" && cs === colorSpace) return [
			cs,
			v1 === "none" ? v1 : roundToPrecision(r, DEC$1),
			v2 === "none" ? v2 : roundToPrecision(g, DEC$1),
			v3 === "none" ? v3 : roundToPrecision(b, DEC$1),
			v4 === "none" ? v4 : alpha
		];
		let x = 0;
		let y = 0;
		let z = 0;
		if (cs === "srgb-linear") {
			[x, y, z] = transformMatrix(MATRIX_L_RGB_TO_XYZ, [
				r,
				g,
				b
			]);
			if (d50) [x, y, z] = transformMatrix(MATRIX_D65_TO_D50, [
				x,
				y,
				z
			], true);
		} else if (cs === "display-p3") {
			const linearRgb = transformRgbToLinearRgb([
				r * MAX_RGB$1,
				g * MAX_RGB$1,
				b * MAX_RGB$1
			]);
			[x, y, z] = transformMatrix(MATRIX_P3_TO_XYZ, linearRgb);
			if (d50) [x, y, z] = transformMatrix(MATRIX_D65_TO_D50, [
				x,
				y,
				z
			], true);
		} else if (cs === "rec2020") {
			const ALPHA = 1.09929682680944;
			const BETA = .018053968510807;
			const REC_COEF = .45;
			const rgb = [
				r,
				g,
				b
			].map((c) => {
				let cl;
				if (c < BETA * REC_COEF * DEC$1) cl = c / (REC_COEF * DEC$1);
				else cl = Math.pow((c + ALPHA - 1) / ALPHA, 1 / REC_COEF);
				return cl;
			});
			[x, y, z] = transformMatrix(MATRIX_REC2020_TO_XYZ, rgb);
			if (d50) [x, y, z] = transformMatrix(MATRIX_D65_TO_D50, [
				x,
				y,
				z
			], true);
		} else if (cs === "a98-rgb") {
			const POW_A98 = 563 / 256;
			const rgb = [
				r,
				g,
				b
			].map((c) => {
				return Math.pow(c, POW_A98);
			});
			[x, y, z] = transformMatrix(MATRIX_A98_TO_XYZ, rgb);
			if (d50) [x, y, z] = transformMatrix(MATRIX_D65_TO_D50, [
				x,
				y,
				z
			], true);
		} else if (cs === "prophoto-rgb") {
			const POW_PROPHOTO = 1.8;
			const rgb = [
				r,
				g,
				b
			].map((c) => {
				let cl;
				if (c > 1 / (HEX$2 * DUO)) cl = Math.pow(c, POW_PROPHOTO);
				else cl = c / HEX$2;
				return cl;
			});
			[x, y, z] = transformMatrix(MATRIX_PROPHOTO_TO_XYZ_D50, rgb);
			if (!d50) [x, y, z] = transformMatrix(MATRIX_D50_TO_D65, [
				x,
				y,
				z
			], true);
		} else if (/^xyz(?:-d(?:50|65))?$/.test(cs)) {
			[x, y, z] = [
				r,
				g,
				b
			];
			if (cs === "xyz-d50") {
				if (!d50) [x, y, z] = transformMatrix(MATRIX_D50_TO_D65, [
					x,
					y,
					z
				]);
			} else if (d50) [x, y, z] = transformMatrix(MATRIX_D65_TO_D50, [
				x,
				y,
				z
			], true);
		} else {
			[x, y, z] = transformRgbToXyz([
				r * MAX_RGB$1,
				g * MAX_RGB$1,
				b * MAX_RGB$1
			]);
			if (d50) [x, y, z] = transformMatrix(MATRIX_D65_TO_D50, [
				x,
				y,
				z
			], true);
		}
		return [
			d50 ? "xyz-d50" : "xyz-d65",
			roundToPrecision(x, HEX$2),
			roundToPrecision(y, HEX$2),
			roundToPrecision(z, HEX$2),
			format === "mixValue" && v4 === "none" ? v4 : alpha
		];
	};
	parseColorValue = (value, opt = {}) => {
		if (isString(value)) value = value.toLowerCase().trim();
		else throw new TypeError(`${value} is not a string.`);
		const { d50 = false, format = "", nullable = false } = opt;
		if (!REG_COLOR.test(value)) {
			const res = resolveInvalidColorValue(format, nullable);
			if (res instanceof NullObject) return res;
			if (isString(res)) return res;
			return res;
		}
		let x = 0;
		let y = 0;
		let z = 0;
		let alpha = 0;
		if (REG_CURRENT.test(value)) {
			if (format === "computedValue") return [
				"rgb",
				0,
				0,
				0,
				0
			];
			if (format === "specifiedValue") return value;
		} else if (/^[a-z]+$/.test(value)) if (Object.hasOwn(NAMED_COLORS, value)) {
			if (format === "specifiedValue") return value;
			const [r, g, b] = NAMED_COLORS[value];
			alpha = 1;
			if (format === "computedValue") return [
				"rgb",
				r,
				g,
				b,
				alpha
			];
			[x, y, z] = transformRgbToXyz([
				r,
				g,
				b
			], true);
			if (d50) [x, y, z] = transformMatrix(MATRIX_D65_TO_D50, [
				x,
				y,
				z
			], true);
		} else switch (format) {
			case VAL_COMP:
				if (nullable && value !== "transparent") return new NullObject();
				return [
					"rgb",
					0,
					0,
					0,
					0
				];
			case VAL_SPEC:
				if (value === "transparent") return value;
				return "";
			case VAL_MIX:
				if (value === "transparent") return [
					"rgb",
					0,
					0,
					0,
					0
				];
				return new NullObject();
			default:
		}
		else if (value[0] === "#") {
			if (REG_SPEC.test(format)) return ["rgb", ...convertHexToRgb(value)];
			[x, y, z, alpha] = convertHexToXyz(value);
			if (d50) [x, y, z] = transformMatrix(MATRIX_D65_TO_D50, [
				x,
				y,
				z
			], true);
		} else if (value.startsWith("lab")) {
			if (REG_SPEC.test(format)) return parseLab(value, opt);
			[, x, y, z, alpha] = parseLab(value);
			if (!d50) [x, y, z] = transformMatrix(MATRIX_D50_TO_D65, [
				x,
				y,
				z
			], true);
		} else if (value.startsWith("lch")) {
			if (REG_SPEC.test(format)) return parseLch(value, opt);
			[, x, y, z, alpha] = parseLch(value);
			if (!d50) [x, y, z] = transformMatrix(MATRIX_D50_TO_D65, [
				x,
				y,
				z
			], true);
		} else if (value.startsWith("oklab")) {
			if (REG_SPEC.test(format)) return parseOklab(value, opt);
			[, x, y, z, alpha] = parseOklab(value);
			if (d50) [x, y, z] = transformMatrix(MATRIX_D65_TO_D50, [
				x,
				y,
				z
			], true);
		} else if (value.startsWith("oklch")) {
			if (REG_SPEC.test(format)) return parseOklch(value, opt);
			[, x, y, z, alpha] = parseOklch(value);
			if (d50) [x, y, z] = transformMatrix(MATRIX_D65_TO_D50, [
				x,
				y,
				z
			], true);
		} else {
			let r, g, b;
			if (value.startsWith("hsl")) [, r, g, b, alpha] = parseHsl(value);
			else if (value.startsWith("hwb")) [, r, g, b, alpha] = parseHwb(value);
			else [, r, g, b, alpha] = parseRgb(value, opt);
			if (REG_SPEC.test(format)) return [
				"rgb",
				Math.round(r),
				Math.round(g),
				Math.round(b),
				alpha
			];
			[x, y, z] = transformRgbToXyz([
				r,
				g,
				b
			]);
			if (d50) [x, y, z] = transformMatrix(MATRIX_D65_TO_D50, [
				x,
				y,
				z
			], true);
		}
		return [
			d50 ? "xyz-d50" : "xyz-d65",
			roundToPrecision(x, HEX$2),
			roundToPrecision(y, HEX$2),
			roundToPrecision(z, HEX$2),
			alpha
		];
	};
	resolveColorValue = (value, opt = {}) => {
		if (isString(value)) value = value.toLowerCase().trim();
		else throw new TypeError(`${value} is not a string.`);
		const { colorSpace = "", format = "", nullable = false } = opt;
		const cacheKey = createCacheKey({
			namespace: NAMESPACE$6,
			name: "resolveColorValue",
			value
		}, opt);
		const cachedResult = getCache(cacheKey);
		if (cachedResult instanceof CacheItem) {
			if (cachedResult.isNull) return cachedResult;
			const cachedItem = cachedResult.item;
			if (isString(cachedItem)) return cachedItem;
			return cachedItem;
		}
		if (!REG_COLOR.test(value)) {
			const res = resolveInvalidColorValue(format, nullable);
			if (res instanceof NullObject) {
				setCache(cacheKey, null);
				return res;
			}
			setCache(cacheKey, res);
			if (isString(res)) return res;
			return res;
		}
		let cs = "";
		let r = 0;
		let g = 0;
		let b = 0;
		let alpha = 0;
		if (REG_CURRENT.test(value)) {
			if (format === "specifiedValue") {
				setCache(cacheKey, value);
				return value;
			}
		} else if (/^[a-z]+$/.test(value)) if (Object.hasOwn(NAMED_COLORS, value)) {
			if (format === "specifiedValue") {
				setCache(cacheKey, value);
				return value;
			}
			[r, g, b] = NAMED_COLORS[value];
			alpha = 1;
		} else switch (format) {
			case VAL_SPEC: {
				if (value === "transparent") {
					setCache(cacheKey, value);
					return value;
				}
				const res = "";
				setCache(cacheKey, res);
				return res;
			}
			case VAL_MIX:
				if (value === "transparent") {
					const res = [
						"rgb",
						0,
						0,
						0,
						0
					];
					setCache(cacheKey, res);
					return res;
				}
				setCache(cacheKey, null);
				return new NullObject();
			case VAL_COMP:
			default: {
				if (nullable && value !== "transparent") {
					setCache(cacheKey, null);
					return new NullObject();
				}
				const res = [
					"rgb",
					0,
					0,
					0,
					0
				];
				setCache(cacheKey, res);
				return res;
			}
		}
		else if (value[0] === "#") [r, g, b, alpha] = convertHexToRgb(value);
		else if (value.startsWith("hsl")) [, r, g, b, alpha] = parseHsl(value, opt);
		else if (value.startsWith("hwb")) [, r, g, b, alpha] = parseHwb(value, opt);
		else if (/^l(?:ab|ch)/.test(value)) {
			let x, y, z;
			if (value.startsWith("lab")) [cs, x, y, z, alpha] = parseLab(value, opt);
			else [cs, x, y, z, alpha] = parseLch(value, opt);
			if (REG_SPEC.test(format)) {
				const res = [
					cs,
					x,
					y,
					z,
					alpha
				];
				setCache(cacheKey, res);
				return res;
			}
			[r, g, b] = transformXyzD50ToRgb([
				x,
				y,
				z
			]);
		} else if (/^okl(?:ab|ch)/.test(value)) {
			let x, y, z;
			if (value.startsWith("oklab")) [cs, x, y, z, alpha] = parseOklab(value, opt);
			else [cs, x, y, z, alpha] = parseOklch(value, opt);
			if (REG_SPEC.test(format)) {
				const res = [
					cs,
					x,
					y,
					z,
					alpha
				];
				setCache(cacheKey, res);
				return res;
			}
			[r, g, b] = transformXyzToRgb([
				x,
				y,
				z
			]);
		} else [, r, g, b, alpha] = parseRgb(value, opt);
		if (format === "mixValue" && colorSpace === "srgb") {
			const res = [
				"srgb",
				r / MAX_RGB$1,
				g / MAX_RGB$1,
				b / MAX_RGB$1,
				alpha
			];
			setCache(cacheKey, res);
			return res;
		}
		const res = [
			"rgb",
			Math.round(r),
			Math.round(g),
			Math.round(b),
			alpha
		];
		setCache(cacheKey, res);
		return res;
	};
	resolveColorFunc = (value, opt = {}) => {
		if (isString(value)) value = value.toLowerCase().trim();
		else throw new TypeError(`${value} is not a string.`);
		const { colorSpace = "", format = "", nullable = false } = opt;
		const cacheKey = createCacheKey({
			namespace: NAMESPACE$6,
			name: "resolveColorFunc",
			value
		}, opt);
		const cachedResult = getCache(cacheKey);
		if (cachedResult instanceof CacheItem) {
			if (cachedResult.isNull) return cachedResult;
			const cachedItem = cachedResult.item;
			if (isString(cachedItem)) return cachedItem;
			return cachedItem;
		}
		if (!REG_FN_COLOR.test(value)) {
			const res = resolveInvalidColorValue(format, nullable);
			if (res instanceof NullObject) {
				setCache(cacheKey, null);
				return res;
			}
			setCache(cacheKey, res);
			if (isString(res)) return res;
			return res;
		}
		const [cs, v1, v2, v3, v4] = parseColorFunc(value, opt);
		if (REG_SPEC.test(format) || format === "mixValue" && cs === colorSpace) {
			const res = [
				cs,
				v1,
				v2,
				v3,
				v4
			];
			setCache(cacheKey, res);
			return res;
		}
		const x = parseFloat(`${v1}`);
		const y = parseFloat(`${v2}`);
		const z = parseFloat(`${v3}`);
		const alpha = parseAlpha(`${v4}`);
		const [r, g, b] = transformXyzToRgb([
			x,
			y,
			z
		], true);
		const res = [
			"rgb",
			r,
			g,
			b,
			alpha
		];
		setCache(cacheKey, res);
		return res;
	};
	convertColorToLinearRgb = (value, opt = {}) => {
		if (isString(value)) value = value.trim();
		else throw new TypeError(`${value} is not a string.`);
		const { colorSpace = "", format = "" } = opt;
		let cs = "";
		let r, g, b, alpha, x, y, z;
		if (format === "mixValue") {
			let xyz;
			if (value.startsWith("color(")) xyz = parseColorFunc(value, opt);
			else xyz = parseColorValue(value, opt);
			if (xyz instanceof NullObject) return xyz;
			[cs, x, y, z, alpha] = xyz;
			if (cs === colorSpace) return [
				x,
				y,
				z,
				alpha
			];
			[r, g, b] = transformMatrix(MATRIX_XYZ_TO_L_RGB, [
				x,
				y,
				z
			], true);
		} else if (value.startsWith("color(")) {
			const [, val] = value.match(REG_FN_COLOR);
			const [cs] = val.match(/[^\s,/]+/g);
			if (cs === "srgb-linear") [, r, g, b, alpha] = resolveColorFunc(value, { format: VAL_COMP });
			else {
				[, x, y, z, alpha] = parseColorFunc(value);
				[r, g, b] = transformMatrix(MATRIX_XYZ_TO_L_RGB, [
					x,
					y,
					z
				], true);
			}
		} else {
			[, x, y, z, alpha] = parseColorValue(value);
			[r, g, b] = transformMatrix(MATRIX_XYZ_TO_L_RGB, [
				x,
				y,
				z
			], true);
		}
		return [
			Math.min(Math.max(r, 0), 1),
			Math.min(Math.max(g, 0), 1),
			Math.min(Math.max(b, 0), 1),
			alpha
		];
	};
	convertColorToRgb = (value, opt = {}) => {
		if (isString(value)) value = value.trim();
		else throw new TypeError(`${value} is not a string.`);
		const { format = "" } = opt;
		let r, g, b, alpha;
		if (format === "mixValue") {
			let rgb;
			if (value.startsWith("color(")) rgb = resolveColorFunc(value, opt);
			else rgb = resolveColorValue(value, opt);
			if (rgb instanceof NullObject) return rgb;
			[, r, g, b, alpha] = rgb;
		} else if (value.startsWith("color(")) {
			const [, val] = value.match(REG_FN_COLOR);
			const [cs] = val.match(/[^\s,/]+/g);
			if (cs === "srgb") {
				[, r, g, b, alpha] = resolveColorFunc(value, { format: VAL_COMP });
				r *= MAX_RGB$1;
				g *= MAX_RGB$1;
				b *= MAX_RGB$1;
			} else [, r, g, b, alpha] = resolveColorFunc(value);
		} else if (/^(?:ok)?l(?:ab|ch)/.test(value)) {
			[r, g, b, alpha] = convertColorToLinearRgb(value);
			[r, g, b] = transformLinearRgbToRgb([
				r,
				g,
				b
			]);
		} else [, r, g, b, alpha] = resolveColorValue(value, { format: VAL_COMP });
		return [
			r,
			g,
			b,
			alpha
		];
	};
	convertColorToXyz = (value, opt = {}) => {
		if (isString(value)) value = value.trim();
		else throw new TypeError(`${value} is not a string.`);
		const { d50 = false, format = "" } = opt;
		let x, y, z, alpha;
		if (format === "mixValue") {
			let xyz;
			if (value.startsWith("color(")) xyz = parseColorFunc(value, opt);
			else xyz = parseColorValue(value, opt);
			if (xyz instanceof NullObject) return xyz;
			[, x, y, z, alpha] = xyz;
		} else if (value.startsWith("color(")) {
			const [, val] = value.match(REG_FN_COLOR);
			const [cs] = val.match(/[^\s,/]+/g);
			if (d50) if (cs === "xyz-d50") [, x, y, z, alpha] = resolveColorFunc(value, { format: VAL_COMP });
			else [, x, y, z, alpha] = parseColorFunc(value, opt);
			else if (/^xyz(?:-d65)?$/.test(cs)) [, x, y, z, alpha] = resolveColorFunc(value, { format: VAL_COMP });
			else [, x, y, z, alpha] = parseColorFunc(value);
		} else [, x, y, z, alpha] = parseColorValue(value, opt);
		return [
			x,
			y,
			z,
			alpha
		];
	};
	convertColorToHsl = (value, opt = {}) => {
		if (isString(value)) value = value.trim();
		else throw new TypeError(`${value} is not a string.`);
		const { format = "" } = opt;
		let h, s, l, alpha;
		if (REG_HSL.test(value)) {
			[, h, s, l, alpha] = parseHsl(value, { format: "hsl" });
			if (format === "hsl") return [
				Math.round(h),
				Math.round(s),
				Math.round(l),
				alpha
			];
			return [
				h,
				s,
				l,
				alpha
			];
		}
		let x, y, z;
		if (format === "mixValue") {
			let xyz;
			if (value.startsWith("color(")) xyz = parseColorFunc(value, opt);
			else xyz = parseColorValue(value, opt);
			if (xyz instanceof NullObject) return xyz;
			[, x, y, z, alpha] = xyz;
		} else if (value.startsWith("color(")) [, x, y, z, alpha] = parseColorFunc(value);
		else [, x, y, z, alpha] = parseColorValue(value);
		[h, s, l] = transformXyzToHsl([
			x,
			y,
			z
		], true);
		if (format === "hsl") return [
			Math.round(h),
			Math.round(s),
			Math.round(l),
			alpha
		];
		return [
			format === "mixValue" && s === 0 ? NONE : h,
			s,
			l,
			alpha
		];
	};
	convertColorToHwb = (value, opt = {}) => {
		if (isString(value)) value = value.trim();
		else throw new TypeError(`${value} is not a string.`);
		const { format = "" } = opt;
		let h, w, b, alpha;
		if (REG_HWB.test(value)) {
			[, h, w, b, alpha] = parseHwb(value, { format: "hwb" });
			if (format === "hwb") return [
				Math.round(h),
				Math.round(w),
				Math.round(b),
				alpha
			];
			return [
				h,
				w,
				b,
				alpha
			];
		}
		let x, y, z;
		if (format === "mixValue") {
			let xyz;
			if (value.startsWith("color(")) xyz = parseColorFunc(value, opt);
			else xyz = parseColorValue(value, opt);
			if (xyz instanceof NullObject) return xyz;
			[, x, y, z, alpha] = xyz;
		} else if (value.startsWith("color(")) [, x, y, z, alpha] = parseColorFunc(value);
		else [, x, y, z, alpha] = parseColorValue(value);
		[h, w, b] = transformXyzToHwb([
			x,
			y,
			z
		], true);
		if (format === "hwb") return [
			Math.round(h),
			Math.round(w),
			Math.round(b),
			alpha
		];
		return [
			format === "mixValue" && w + b >= 100 ? NONE : h,
			w,
			b,
			alpha
		];
	};
	convertColorToLab = (value, opt = {}) => {
		if (isString(value)) value = value.trim();
		else throw new TypeError(`${value} is not a string.`);
		const { format = "" } = opt;
		let l, a, b, alpha;
		if (REG_LAB.test(value)) {
			[, l, a, b, alpha] = parseLab(value, { format: VAL_COMP });
			return [
				l,
				a,
				b,
				alpha
			];
		}
		let x, y, z;
		if (format === "mixValue") {
			let xyz;
			opt.d50 = true;
			if (value.startsWith("color(")) xyz = parseColorFunc(value, opt);
			else xyz = parseColorValue(value, opt);
			if (xyz instanceof NullObject) return xyz;
			[, x, y, z, alpha] = xyz;
		} else if (value.startsWith("color(")) [, x, y, z, alpha] = parseColorFunc(value, { d50: true });
		else [, x, y, z, alpha] = parseColorValue(value, { d50: true });
		[l, a, b] = transformXyzD50ToLab([
			x,
			y,
			z
		], true);
		return [
			l,
			a,
			b,
			alpha
		];
	};
	convertColorToLch = (value, opt = {}) => {
		if (isString(value)) value = value.trim();
		else throw new TypeError(`${value} is not a string.`);
		const { format = "" } = opt;
		let l, c, h, alpha;
		if (REG_LCH.test(value)) {
			[, l, c, h, alpha] = parseLch(value, { format: VAL_COMP });
			return [
				l,
				c,
				h,
				alpha
			];
		}
		let x, y, z;
		if (format === "mixValue") {
			let xyz;
			opt.d50 = true;
			if (value.startsWith("color(")) xyz = parseColorFunc(value, opt);
			else xyz = parseColorValue(value, opt);
			if (xyz instanceof NullObject) return xyz;
			[, x, y, z, alpha] = xyz;
		} else if (value.startsWith("color(")) [, x, y, z, alpha] = parseColorFunc(value, { d50: true });
		else [, x, y, z, alpha] = parseColorValue(value, { d50: true });
		[l, c, h] = transformXyzD50ToLch([
			x,
			y,
			z
		], true);
		return [
			l,
			c,
			format === "mixValue" && c === 0 ? NONE : h,
			alpha
		];
	};
	convertColorToOklab = (value, opt = {}) => {
		if (isString(value)) value = value.trim();
		else throw new TypeError(`${value} is not a string.`);
		const { format = "" } = opt;
		let l, a, b, alpha;
		if (REG_OKLAB.test(value)) {
			[, l, a, b, alpha] = parseOklab(value, { format: VAL_COMP });
			return [
				l,
				a,
				b,
				alpha
			];
		}
		let x, y, z;
		if (format === "mixValue") {
			let xyz;
			if (value.startsWith("color(")) xyz = parseColorFunc(value, opt);
			else xyz = parseColorValue(value, opt);
			if (xyz instanceof NullObject) return xyz;
			[, x, y, z, alpha] = xyz;
		} else if (value.startsWith("color(")) [, x, y, z, alpha] = parseColorFunc(value);
		else [, x, y, z, alpha] = parseColorValue(value);
		[l, a, b] = transformXyzToOklab([
			x,
			y,
			z
		], true);
		return [
			l,
			a,
			b,
			alpha
		];
	};
	convertColorToOklch = (value, opt = {}) => {
		if (isString(value)) value = value.trim();
		else throw new TypeError(`${value} is not a string.`);
		const { format = "" } = opt;
		let l, c, h, alpha;
		if (REG_OKLCH.test(value)) {
			[, l, c, h, alpha] = parseOklch(value, { format: VAL_COMP });
			return [
				l,
				c,
				h,
				alpha
			];
		}
		let x, y, z;
		if (format === "mixValue") {
			let xyz;
			if (value.startsWith("color(")) xyz = parseColorFunc(value, opt);
			else xyz = parseColorValue(value, opt);
			if (xyz instanceof NullObject) return xyz;
			[, x, y, z, alpha] = xyz;
		} else if (value.startsWith("color(")) [, x, y, z, alpha] = parseColorFunc(value);
		else [, x, y, z, alpha] = parseColorValue(value);
		[l, c, h] = transformXyzToOklch([
			x,
			y,
			z
		], true);
		return [
			l,
			c,
			format === "mixValue" && c === 0 ? NONE : h,
			alpha
		];
	};
	resolveColorMix = (value, opt = {}) => {
		if (isString(value)) value = value.toLowerCase().trim();
		else throw new TypeError(`${value} is not a string.`);
		const { format = "", nullable = false } = opt;
		const cacheKey = createCacheKey({
			namespace: NAMESPACE$6,
			name: "resolveColorMix",
			value
		}, opt);
		const cachedResult = getCache(cacheKey);
		if (cachedResult instanceof CacheItem) {
			if (cachedResult.isNull) return cachedResult;
			const cachedItem = cachedResult.item;
			if (isString(cachedItem)) return cachedItem;
			return cachedItem;
		}
		const nestedItems = [];
		let colorSpace = "";
		let hueArc = "";
		let colorA = "";
		let pctA = "";
		let colorB = "";
		let pctB = "";
		let parsed = false;
		if (!REG_MIX.test(value)) if (value.startsWith("color-mix(") && REG_MIX_NEST.test(value)) {
			const items = value.match(REG_MIX_NEST);
			for (const item of items) if (item) {
				let val = resolveColorMix(item, { format: format === "specifiedValue" ? format : VAL_COMP });
				if (Array.isArray(val)) {
					const [cs, v1, v2, v3, v4] = val;
					if (v1 === 0 && v2 === 0 && v3 === 0 && v4 === 0) {
						value = "";
						break;
					}
					if (REG_MIX_CS_RGB_XYZ.test(cs)) if (v4 === 1) val = `color(${cs} ${v1} ${v2} ${v3})`;
					else val = `color(${cs} ${v1} ${v2} ${v3} / ${v4})`;
					else if (v4 === 1) val = `${cs}(${v1} ${v2} ${v3})`;
					else val = `${cs}(${v1} ${v2} ${v3} / ${v4})`;
				} else if (!REG_MIX.test(val)) {
					value = "";
					break;
				}
				nestedItems.push(val);
				value = value.replace(item, val);
			}
			if (!value) return cacheInvalidColorValue(cacheKey, format, nullable);
		} else if (value.startsWith("color-mix(") && value.endsWith(")") && value.includes("light-dark(")) {
			const [csPart = "", partA = "", partB = ""] = splitValue(value.replace(FN_MIX, "").replace(/\)$/, ""), { delimiter: "," });
			const [colorPartA = "", pctPartA = ""] = splitValue(partA);
			const [colorPartB = "", pctPartB = ""] = splitValue(partB);
			const specifiedColorA = resolveColor(colorPartA, { format: VAL_SPEC });
			const specifiedColorB = resolveColor(colorPartB, { format: VAL_SPEC });
			if (REG_MIX_IN_CS.test(csPart) && specifiedColorA && specifiedColorB) if (format === "specifiedValue") {
				const [, cs] = csPart.match(REG_MIX_IN_CS);
				if (REG_CS_HUE.test(cs)) [, colorSpace, hueArc] = cs.match(REG_CS_HUE);
				else colorSpace = cs;
				colorA = specifiedColorA;
				if (pctPartA) pctA = pctPartA;
				colorB = specifiedColorB;
				if (pctPartB) pctB = pctPartB;
				value = value.replace(colorPartA, specifiedColorA).replace(colorPartB, specifiedColorB);
				parsed = true;
			} else {
				const resolvedColorA = resolveColor(colorPartA, opt);
				const resolvedColorB = resolveColor(colorPartB, opt);
				if (isString(resolvedColorA) && isString(resolvedColorB)) value = value.replace(colorPartA, resolvedColorA).replace(colorPartB, resolvedColorB);
			}
			else return cacheInvalidColorValue(cacheKey, format, nullable);
		} else return cacheInvalidColorValue(cacheKey, format, nullable);
		if (nestedItems.length && format === "specifiedValue") {
			const [, cs] = value.match(REG_MIX_START);
			if (REG_CS_HUE.test(cs)) [, colorSpace, hueArc] = cs.match(REG_CS_HUE);
			else colorSpace = cs;
			if (nestedItems.length === 2) {
				let [itemA, itemB] = nestedItems;
				itemA = itemA.replace(/(?=[()])/g, "\\");
				itemB = itemB.replace(/(?=[()])/g, "\\");
				const regA = new RegExp(`(${itemA})(?:\\s+(${PCT$1}))?`);
				const regB = new RegExp(`(${itemB})(?:\\s+(${PCT$1}))?`);
				[, colorA, pctA] = value.match(regA);
				[, colorB, pctB] = value.match(regB);
			} else {
				let [item] = nestedItems;
				item = item.replace(/(?=[()])/g, "\\");
				const itemPart = `${item}(?:\\s+${PCT$1})?`;
				const itemPartCapt = `(${item})(?:\\s+(${PCT$1}))?`;
				const regItemPart = new RegExp(`^${itemPartCapt}$`);
				if (new RegExp(`${itemPartCapt}\\s*\\)$`).test(value)) {
					const reg = new RegExp(`(${SYN_MIX_PART})\\s*,\\s*(${itemPart})\\s*\\)$`);
					const [, colorPartA, colorPartB] = value.match(reg);
					[, colorA, pctA] = colorPartA.match(REG_MIX_COLOR_PART);
					[, colorB, pctB] = colorPartB.match(regItemPart);
				} else {
					const reg = new RegExp(`(${itemPart})\\s*,\\s*(${SYN_MIX_PART})\\s*\\)$`);
					const [, colorPartA, colorPartB] = value.match(reg);
					[, colorA, pctA] = colorPartA.match(regItemPart);
					[, colorB, pctB] = colorPartB.match(REG_MIX_COLOR_PART);
				}
			}
		} else if (!parsed) {
			const [, cs, colorPartA, colorPartB] = value.match(REG_MIX_CAPT);
			[, colorA, pctA] = colorPartA.match(REG_MIX_COLOR_PART);
			[, colorB, pctB] = colorPartB.match(REG_MIX_COLOR_PART);
			if (REG_CS_HUE.test(cs)) [, colorSpace, hueArc] = cs.match(REG_CS_HUE);
			else colorSpace = cs;
		}
		let pA, pB, m;
		if (pctA && pctB) {
			const p1 = parseFloat(pctA) / MAX_PCT$2;
			const p2 = parseFloat(pctB) / MAX_PCT$2;
			if (p1 < 0 || p1 > 1 || p2 < 0 || p2 > 1 || p1 === 0 && p2 === 0) return cacheInvalidColorValue(cacheKey, format, nullable);
			const factor = p1 + p2;
			pA = p1 / factor;
			pB = p2 / factor;
			m = factor < 1 ? factor : 1;
		} else {
			if (pctA) {
				pA = parseFloat(pctA) / MAX_PCT$2;
				if (pA < 0 || pA > 1) return cacheInvalidColorValue(cacheKey, format, nullable);
				pB = 1 - pA;
			} else if (pctB) {
				pB = parseFloat(pctB) / MAX_PCT$2;
				if (pB < 0 || pB > 1) return cacheInvalidColorValue(cacheKey, format, nullable);
				pA = 1 - pB;
			} else {
				pA = HALF;
				pB = HALF;
			}
			m = 1;
		}
		if (colorSpace === "xyz") colorSpace = "xyz-d65";
		if (format === "specifiedValue") {
			let valueA = "";
			let valueB = "";
			if (colorA.startsWith("color-mix(") || colorA.startsWith("light-dark(")) valueA = colorA;
			else if (colorA.startsWith("color(")) {
				const [cs, v1, v2, v3, v4] = parseColorFunc(colorA, opt);
				if (v4 === 1) valueA = `color(${cs} ${v1} ${v2} ${v3})`;
				else valueA = `color(${cs} ${v1} ${v2} ${v3} / ${v4})`;
			} else {
				const val = parseColorValue(colorA, opt);
				if (Array.isArray(val)) {
					const [cs, v1, v2, v3, v4] = val;
					if (v4 === 1) if (cs === "rgb") valueA = `${cs}(${v1}, ${v2}, ${v3})`;
					else valueA = `${cs}(${v1} ${v2} ${v3})`;
					else if (cs === "rgb") valueA = `${cs}a(${v1}, ${v2}, ${v3}, ${v4})`;
					else valueA = `${cs}(${v1} ${v2} ${v3} / ${v4})`;
				} else {
					if (!isString(val) || !val) {
						setCache(cacheKey, "");
						return "";
					}
					valueA = val;
				}
			}
			if (colorB.startsWith("color-mix(") || colorB.startsWith("light-dark(")) valueB = colorB;
			else if (colorB.startsWith("color(")) {
				const [cs, v1, v2, v3, v4] = parseColorFunc(colorB, opt);
				if (v4 === 1) valueB = `color(${cs} ${v1} ${v2} ${v3})`;
				else valueB = `color(${cs} ${v1} ${v2} ${v3} / ${v4})`;
			} else {
				const val = parseColorValue(colorB, opt);
				if (Array.isArray(val)) {
					const [cs, v1, v2, v3, v4] = val;
					if (v4 === 1) if (cs === "rgb") valueB = `${cs}(${v1}, ${v2}, ${v3})`;
					else valueB = `${cs}(${v1} ${v2} ${v3})`;
					else if (cs === "rgb") valueB = `${cs}a(${v1}, ${v2}, ${v3}, ${v4})`;
					else valueB = `${cs}(${v1} ${v2} ${v3} / ${v4})`;
				} else {
					if (!isString(val) || !val) {
						setCache(cacheKey, "");
						return "";
					}
					valueB = val;
				}
			}
			if (pctA && pctB) {
				valueA += ` ${parseFloat(pctA)}%`;
				valueB += ` ${parseFloat(pctB)}%`;
			} else if (pctA) {
				const pA = parseFloat(pctA);
				if (pA !== MAX_PCT$2 * HALF) valueA += ` ${pA}%`;
			} else if (pctB) {
				const pA = MAX_PCT$2 - parseFloat(pctB);
				if (pA !== MAX_PCT$2 * HALF) valueA += ` ${pA}%`;
			}
			if (hueArc) {
				const res = `color-mix(in ${colorSpace} ${hueArc} hue, ${valueA}, ${valueB})`;
				setCache(cacheKey, res);
				return res;
			} else {
				const res = `color-mix(in ${colorSpace}, ${valueA}, ${valueB})`;
				setCache(cacheKey, res);
				return res;
			}
		}
		let r = 0;
		let g = 0;
		let b = 0;
		let alpha = 0;
		if (/^srgb(?:-linear)?$/.test(colorSpace)) {
			let rgbA, rgbB;
			if (colorSpace === "srgb") {
				if (REG_CURRENT.test(colorA)) rgbA = [
					NONE,
					NONE,
					NONE,
					NONE
				];
				else rgbA = convertColorToRgb(colorA, {
					colorSpace,
					format: VAL_MIX
				});
				if (REG_CURRENT.test(colorB)) rgbB = [
					NONE,
					NONE,
					NONE,
					NONE
				];
				else rgbB = convertColorToRgb(colorB, {
					colorSpace,
					format: VAL_MIX
				});
			} else {
				if (REG_CURRENT.test(colorA)) rgbA = [
					NONE,
					NONE,
					NONE,
					NONE
				];
				else rgbA = convertColorToLinearRgb(colorA, {
					colorSpace,
					format: VAL_MIX
				});
				if (REG_CURRENT.test(colorB)) rgbB = [
					NONE,
					NONE,
					NONE,
					NONE
				];
				else rgbB = convertColorToLinearRgb(colorB, {
					colorSpace,
					format: VAL_MIX
				});
			}
			if (rgbA instanceof NullObject || rgbB instanceof NullObject) return cacheInvalidColorValue(cacheKey, format, nullable);
			const [rrA, ggA, bbA, aaA] = rgbA;
			const [rrB, ggB, bbB, aaB] = rgbB;
			const rNone = rrA === "none" && rrB === "none";
			const gNone = ggA === "none" && ggB === "none";
			const bNone = bbA === "none" && bbB === "none";
			const alphaNone = aaA === "none" && aaB === "none";
			const [[rA, gA, bA, alphaA], [rB, gB, bB, alphaB]] = normalizeColorComponents([
				rrA,
				ggA,
				bbA,
				aaA
			], [
				rrB,
				ggB,
				bbB,
				aaB
			], true);
			const factorA = alphaA * pA;
			const factorB = alphaB * pB;
			alpha = factorA + factorB;
			if (alpha === 0) {
				r = rA * pA + rB * pB;
				g = gA * pA + gB * pB;
				b = bA * pA + bB * pB;
			} else {
				r = (rA * factorA + rB * factorB) / alpha;
				g = (gA * factorA + gB * factorB) / alpha;
				b = (bA * factorA + bB * factorB) / alpha;
				alpha = parseFloat(alpha.toFixed(3));
			}
			if (format === "computedValue") {
				const res = [
					colorSpace,
					rNone ? NONE : roundToPrecision(r, HEX$2),
					gNone ? NONE : roundToPrecision(g, HEX$2),
					bNone ? NONE : roundToPrecision(b, HEX$2),
					alphaNone ? NONE : alpha * m
				];
				setCache(cacheKey, res);
				return res;
			}
			r *= MAX_RGB$1;
			g *= MAX_RGB$1;
			b *= MAX_RGB$1;
		} else if (REG_CS_XYZ.test(colorSpace)) {
			let xyzA, xyzB;
			if (REG_CURRENT.test(colorA)) xyzA = [
				NONE,
				NONE,
				NONE,
				NONE
			];
			else xyzA = convertColorToXyz(colorA, {
				colorSpace,
				d50: colorSpace === "xyz-d50",
				format: VAL_MIX
			});
			if (REG_CURRENT.test(colorB)) xyzB = [
				NONE,
				NONE,
				NONE,
				NONE
			];
			else xyzB = convertColorToXyz(colorB, {
				colorSpace,
				d50: colorSpace === "xyz-d50",
				format: VAL_MIX
			});
			if (xyzA instanceof NullObject || xyzB instanceof NullObject) return cacheInvalidColorValue(cacheKey, format, nullable);
			const [xxA, yyA, zzA, aaA] = xyzA;
			const [xxB, yyB, zzB, aaB] = xyzB;
			const xNone = xxA === "none" && xxB === "none";
			const yNone = yyA === "none" && yyB === "none";
			const zNone = zzA === "none" && zzB === "none";
			const alphaNone = aaA === "none" && aaB === "none";
			const [[xA, yA, zA, alphaA], [xB, yB, zB, alphaB]] = normalizeColorComponents([
				xxA,
				yyA,
				zzA,
				aaA
			], [
				xxB,
				yyB,
				zzB,
				aaB
			], true);
			const factorA = alphaA * pA;
			const factorB = alphaB * pB;
			alpha = factorA + factorB;
			let x, y, z;
			if (alpha === 0) {
				x = xA * pA + xB * pB;
				y = yA * pA + yB * pB;
				z = zA * pA + zB * pB;
			} else {
				x = (xA * factorA + xB * factorB) / alpha;
				y = (yA * factorA + yB * factorB) / alpha;
				z = (zA * factorA + zB * factorB) / alpha;
				alpha = parseFloat(alpha.toFixed(3));
			}
			if (format === "computedValue") {
				const res = [
					colorSpace,
					xNone ? NONE : roundToPrecision(x, HEX$2),
					yNone ? NONE : roundToPrecision(y, HEX$2),
					zNone ? NONE : roundToPrecision(z, HEX$2),
					alphaNone ? NONE : alpha * m
				];
				setCache(cacheKey, res);
				return res;
			}
			if (colorSpace === "xyz-d50") [r, g, b] = transformXyzD50ToRgb([
				x,
				y,
				z
			], true);
			else [r, g, b] = transformXyzToRgb([
				x,
				y,
				z
			], true);
		} else if (/^h(?:sl|wb)$/.test(colorSpace)) {
			let hslA, hslB;
			if (colorSpace === "hsl") {
				if (REG_CURRENT.test(colorA)) hslA = [
					NONE,
					NONE,
					NONE,
					NONE
				];
				else hslA = convertColorToHsl(colorA, {
					colorSpace,
					format: VAL_MIX
				});
				if (REG_CURRENT.test(colorB)) hslB = [
					NONE,
					NONE,
					NONE,
					NONE
				];
				else hslB = convertColorToHsl(colorB, {
					colorSpace,
					format: VAL_MIX
				});
			} else {
				if (REG_CURRENT.test(colorA)) hslA = [
					NONE,
					NONE,
					NONE,
					NONE
				];
				else hslA = convertColorToHwb(colorA, {
					colorSpace,
					format: VAL_MIX
				});
				if (REG_CURRENT.test(colorB)) hslB = [
					NONE,
					NONE,
					NONE,
					NONE
				];
				else hslB = convertColorToHwb(colorB, {
					colorSpace,
					format: VAL_MIX
				});
			}
			if (hslA instanceof NullObject || hslB instanceof NullObject) return cacheInvalidColorValue(cacheKey, format, nullable);
			const [hhA, ssA, llA, aaA] = hslA;
			const [hhB, ssB, llB, aaB] = hslB;
			const alphaNone = aaA === "none" && aaB === "none";
			let [[hA, sA, lA, alphaA], [hB, sB, lB, alphaB]] = normalizeColorComponents([
				hhA,
				ssA,
				llA,
				aaA
			], [
				hhB,
				ssB,
				llB,
				aaB
			], true);
			if (hueArc) [hA, hB] = interpolateHue(hA, hB, hueArc);
			const factorA = alphaA * pA;
			const factorB = alphaB * pB;
			alpha = factorA + factorB;
			const h = (hA * pA + hB * pB) % DEG;
			let s, l;
			if (alpha === 0) {
				s = sA * pA + sB * pB;
				l = lA * pA + lB * pB;
			} else {
				s = (sA * factorA + sB * factorB) / alpha;
				l = (lA * factorA + lB * factorB) / alpha;
				alpha = parseFloat(alpha.toFixed(3));
			}
			[r, g, b] = convertColorToRgb(`${colorSpace}(${h} ${s} ${l})`);
			if (format === "computedValue") {
				const res = [
					"srgb",
					roundToPrecision(r / MAX_RGB$1, HEX$2),
					roundToPrecision(g / MAX_RGB$1, HEX$2),
					roundToPrecision(b / MAX_RGB$1, HEX$2),
					alphaNone ? NONE : alpha * m
				];
				setCache(cacheKey, res);
				return res;
			}
		} else if (/^(?:ok)?lch$/.test(colorSpace)) {
			let lchA, lchB;
			if (colorSpace === "lch") {
				if (REG_CURRENT.test(colorA)) lchA = [
					NONE,
					NONE,
					NONE,
					NONE
				];
				else lchA = convertColorToLch(colorA, {
					colorSpace,
					format: VAL_MIX
				});
				if (REG_CURRENT.test(colorB)) lchB = [
					NONE,
					NONE,
					NONE,
					NONE
				];
				else lchB = convertColorToLch(colorB, {
					colorSpace,
					format: VAL_MIX
				});
			} else {
				if (REG_CURRENT.test(colorA)) lchA = [
					NONE,
					NONE,
					NONE,
					NONE
				];
				else lchA = convertColorToOklch(colorA, {
					colorSpace,
					format: VAL_MIX
				});
				if (REG_CURRENT.test(colorB)) lchB = [
					NONE,
					NONE,
					NONE,
					NONE
				];
				else lchB = convertColorToOklch(colorB, {
					colorSpace,
					format: VAL_MIX
				});
			}
			if (lchA instanceof NullObject || lchB instanceof NullObject) return cacheInvalidColorValue(cacheKey, format, nullable);
			const [llA, ccA, hhA, aaA] = lchA;
			const [llB, ccB, hhB, aaB] = lchB;
			const lNone = llA === "none" && llB === "none";
			const cNone = ccA === "none" && ccB === "none";
			const hNone = hhA === "none" && hhB === "none";
			const alphaNone = aaA === "none" && aaB === "none";
			let [[lA, cA, hA, alphaA], [lB, cB, hB, alphaB]] = normalizeColorComponents([
				llA,
				ccA,
				hhA,
				aaA
			], [
				llB,
				ccB,
				hhB,
				aaB
			], true);
			if (hueArc) [hA, hB] = interpolateHue(hA, hB, hueArc);
			const factorA = alphaA * pA;
			const factorB = alphaB * pB;
			alpha = factorA + factorB;
			const h = (hA * pA + hB * pB) % DEG;
			let l, c;
			if (alpha === 0) {
				l = lA * pA + lB * pB;
				c = cA * pA + cB * pB;
			} else {
				l = (lA * factorA + lB * factorB) / alpha;
				c = (cA * factorA + cB * factorB) / alpha;
				alpha = parseFloat(alpha.toFixed(3));
			}
			if (format === "computedValue") {
				const res = [
					colorSpace,
					lNone ? NONE : roundToPrecision(l, HEX$2),
					cNone ? NONE : roundToPrecision(c, HEX$2),
					hNone ? NONE : roundToPrecision(h, HEX$2),
					alphaNone ? NONE : alpha * m
				];
				setCache(cacheKey, res);
				return res;
			}
			[, r, g, b] = resolveColorValue(`${colorSpace}(${l} ${c} ${h})`);
		} else {
			let labA, labB;
			if (colorSpace === "lab") {
				if (REG_CURRENT.test(colorA)) labA = [
					NONE,
					NONE,
					NONE,
					NONE
				];
				else labA = convertColorToLab(colorA, {
					colorSpace,
					format: VAL_MIX
				});
				if (REG_CURRENT.test(colorB)) labB = [
					NONE,
					NONE,
					NONE,
					NONE
				];
				else labB = convertColorToLab(colorB, {
					colorSpace,
					format: VAL_MIX
				});
			} else {
				if (REG_CURRENT.test(colorA)) labA = [
					NONE,
					NONE,
					NONE,
					NONE
				];
				else labA = convertColorToOklab(colorA, {
					colorSpace,
					format: VAL_MIX
				});
				if (REG_CURRENT.test(colorB)) labB = [
					NONE,
					NONE,
					NONE,
					NONE
				];
				else labB = convertColorToOklab(colorB, {
					colorSpace,
					format: VAL_MIX
				});
			}
			if (labA instanceof NullObject || labB instanceof NullObject) return cacheInvalidColorValue(cacheKey, format, nullable);
			const [llA, aaA, bbA, alA] = labA;
			const [llB, aaB, bbB, alB] = labB;
			const lNone = llA === "none" && llB === "none";
			const aNone = aaA === "none" && aaB === "none";
			const bNone = bbA === "none" && bbB === "none";
			const alphaNone = alA === "none" && alB === "none";
			const [[lA, aA, bA, alphaA], [lB, aB, bB, alphaB]] = normalizeColorComponents([
				llA,
				aaA,
				bbA,
				alA
			], [
				llB,
				aaB,
				bbB,
				alB
			], true);
			const factorA = alphaA * pA;
			const factorB = alphaB * pB;
			alpha = factorA + factorB;
			let l, aO, bO;
			if (alpha === 0) {
				l = lA * pA + lB * pB;
				aO = aA * pA + aB * pB;
				bO = bA * pA + bB * pB;
			} else {
				l = (lA * factorA + lB * factorB) / alpha;
				aO = (aA * factorA + aB * factorB) / alpha;
				bO = (bA * factorA + bB * factorB) / alpha;
				alpha = parseFloat(alpha.toFixed(3));
			}
			if (format === "computedValue") {
				const res = [
					colorSpace,
					lNone ? NONE : roundToPrecision(l, HEX$2),
					aNone ? NONE : roundToPrecision(aO, HEX$2),
					bNone ? NONE : roundToPrecision(bO, HEX$2),
					alphaNone ? NONE : alpha * m
				];
				setCache(cacheKey, res);
				return res;
			}
			[, r, g, b] = resolveColorValue(`${colorSpace}(${l} ${aO} ${bO})`);
		}
		const res = [
			"rgb",
			Math.round(r),
			Math.round(g),
			Math.round(b),
			parseFloat((alpha * m).toFixed(3))
		];
		setCache(cacheKey, res);
		return res;
	};
}));
//#endregion
//#region node_modules/@asamuzakjp/css-color/dist/esm/js/css-var.js
/**
* resolve custom property
* @param tokens - CSS tokens
* @param [opt] - options
* @returns result - [tokens, resolvedValue]
*/
function resolveCustomProperty(tokens, opt = {}) {
	if (!Array.isArray(tokens)) throw new TypeError(`${tokens} is not an array.`);
	const { customProperty = {} } = opt;
	const items = [];
	while (tokens.length) {
		const token = tokens.shift();
		if (!token) break;
		if (!Array.isArray(token)) throw new TypeError(`${token} is not an array.`);
		const [type, value] = token;
		if (type === PAREN_CLOSE$2) break;
		if (value === "var(") {
			const [, item] = resolveCustomProperty(tokens, opt);
			if (item) items.push(item);
		} else if (type === IDENT$1) {
			if (value.startsWith("--")) {
				let item;
				if (Object.hasOwn(customProperty, value)) item = customProperty[value];
				else if (typeof customProperty.callback === "function") item = customProperty.callback(value);
				if (item) items.push(item);
			} else if (value) items.push(value);
		}
	}
	let resolveAsColor = false;
	if (items.length > 1) resolveAsColor = isColor(items[items.length - 1]);
	let resolvedValue = "";
	for (let item of items) {
		item = item.trim();
		if (REG_FN_VAR$4.test(item)) {
			const resolvedItem = resolveVar(item, opt);
			if (isString(resolvedItem)) {
				if (!resolveAsColor || isColor(resolvedItem)) resolvedValue = resolvedItem;
			}
		} else if (REG_FN_CALC$3.test(item)) {
			item = cssCalc(item, opt);
			if (!resolveAsColor || isColor(item)) resolvedValue = item;
		} else if (item && !REG_CSS_WIDE_KEYWORD.test(item)) {
			if (!resolveAsColor || isColor(item)) resolvedValue = item;
		}
		if (resolvedValue) break;
	}
	return [tokens, resolvedValue];
}
/**
* parse tokens
* @param tokens - CSS tokens
* @param [opt] - options
* @returns parsed tokens
*/
function parseTokens$1(tokens, opt = {}) {
	const res = [];
	while (tokens.length) {
		const token = tokens.shift();
		if (!token) break;
		const [type = "", value = ""] = token;
		if (value === "var(") {
			const [, resolvedValue] = resolveCustomProperty(tokens, opt);
			if (!resolvedValue) return new NullObject();
			res.push(resolvedValue);
		} else switch (type) {
			case PAREN_CLOSE$2:
				if (res.length) if (res[res.length - 1] === " ") res[res.length - 1] = value;
				else res.push(value);
				else res.push(value);
				break;
			case W_SPACE$2:
				if (res.length) {
					const lastValue = res[res.length - 1];
					if (isString(lastValue) && !lastValue.endsWith("(") && lastValue !== " ") res.push(value);
				}
				break;
			default: if (type !== COMMENT$2 && type !== EOF$2) res.push(value);
		}
	}
	return res;
}
/**
* resolve CSS var()
* @param value - CSS value including var()
* @param [opt] - options
* @returns resolved value
*/
function resolveVar(value, opt = {}) {
	const { format = "" } = opt;
	if (isString(value)) {
		if (!REG_FN_VAR$4.test(value) || format === "specifiedValue") return value;
		value = value.trim();
	} else throw new TypeError(`${value} is not a string.`);
	const cacheKey = createCacheKey({
		namespace: NAMESPACE$5,
		name: "resolveVar",
		value
	}, opt);
	const cachedResult = getCache(cacheKey);
	if (cachedResult instanceof CacheItem) {
		if (cachedResult.isNull) return cachedResult;
		return cachedResult.item;
	}
	const values = parseTokens$1(tokenize({ css: value }), opt);
	if (Array.isArray(values)) {
		let color = values.join("");
		if (REG_FN_CALC$3.test(color)) color = cssCalc(color, opt);
		setCache(cacheKey, color);
		return color;
	} else {
		setCache(cacheKey, null);
		return new NullObject();
	}
}
var PAREN_CLOSE$2, COMMENT$2, EOF$2, IDENT$1, W_SPACE$2, NAMESPACE$5, REG_FN_CALC$3, REG_FN_VAR$4, REG_CSS_WIDE_KEYWORD, cssVar;
var init_css_var = __esmMin((() => {
	init_cache();
	init_common();
	init_constant();
	init_util();
	init_css_calc();
	init_dist$4();
	({CloseParen: PAREN_CLOSE$2, Comment: COMMENT$2, EOF: EOF$2, Ident: IDENT$1, Whitespace: W_SPACE$2} = c$1);
	NAMESPACE$5 = "css-var";
	REG_FN_CALC$3 = new RegExp(SYN_FN_CALC);
	REG_FN_VAR$4 = new RegExp(SYN_FN_VAR);
	REG_CSS_WIDE_KEYWORD = /^(?:inherit|initial|revert(?:-layer)?|unset)$/;
	cssVar = (value, opt = {}) => {
		const resolvedValue = resolveVar(value, opt);
		if (isString(resolvedValue)) return resolvedValue;
		return "";
	};
}));
//#endregion
//#region node_modules/@csstools/css-parser-algorithms/dist/index.mjs
function walkerIndexGenerator(e) {
	let n = e.slice();
	return (e, t, o) => {
		let s = -1;
		for (let i = n.indexOf(t); i < n.length && (s = e.indexOf(n[i]), -1 === s || s < o); i++);
		return -1 === s || s === o && t === e[o] && (s++, s >= e.length) ? -1 : (n = e.slice(), s);
	};
}
function consumeComponentValue(e, n) {
	const t = n[0];
	if (isTokenOpenParen(t) || isTokenOpenCurly(t) || isTokenOpenSquare(t)) {
		const t = consumeSimpleBlock(e, n);
		return {
			advance: t.advance,
			node: t.node
		};
	}
	if (isTokenFunction(t)) {
		const t = consumeFunction(e, n);
		return {
			advance: t.advance,
			node: t.node
		};
	}
	if (isTokenWhitespace(t)) {
		const t = consumeWhitespace(e, n);
		return {
			advance: t.advance,
			node: t.node
		};
	}
	if (isTokenComment(t)) {
		const t = consumeComment(e, n);
		return {
			advance: t.advance,
			node: t.node
		};
	}
	return {
		advance: 1,
		node: new TokenNode(t)
	};
}
function consumeFunction(n, t) {
	const o = [];
	let s = 1;
	for (;;) {
		const i = t[s];
		if (!i || isTokenEOF(i)) return n.onParseError(new ParseError$1("Unexpected EOF while consuming a function.", t[0][2], t[t.length - 1][3], ["5.4.9. Consume a function", "Unexpected EOF"])), {
			advance: t.length,
			node: new FunctionNode(t[0], i, o)
		};
		if (isTokenCloseParen(i)) return {
			advance: s + 1,
			node: new FunctionNode(t[0], i, o)
		};
		if (isTokenWhiteSpaceOrComment(i)) {
			const e = consumeAllCommentsAndWhitespace(n, t.slice(s));
			s += e.advance, o.push(...e.nodes);
			continue;
		}
		const r = consumeComponentValue(n, t.slice(s));
		s += r.advance, o.push(r.node);
	}
}
function consumeSimpleBlock(n, t) {
	const o = mirrorVariantType(t[0][0]);
	if (!o) throw new Error("Failed to parse, a mirror variant must exist for all block open tokens.");
	const s = [];
	let i = 1;
	for (;;) {
		const r = t[i];
		if (!r || isTokenEOF(r)) return n.onParseError(new ParseError$1("Unexpected EOF while consuming a simple block.", t[0][2], t[t.length - 1][3], ["5.4.8. Consume a simple block", "Unexpected EOF"])), {
			advance: t.length,
			node: new SimpleBlockNode(t[0], r, s)
		};
		if (r[0] === o) return {
			advance: i + 1,
			node: new SimpleBlockNode(t[0], r, s)
		};
		if (isTokenWhiteSpaceOrComment(r)) {
			const e = consumeAllCommentsAndWhitespace(n, t.slice(i));
			i += e.advance, s.push(...e.nodes);
			continue;
		}
		const a = consumeComponentValue(n, t.slice(i));
		i += a.advance, s.push(a.node);
	}
}
function consumeWhitespace(e, n) {
	let t = 0;
	for (;;) {
		const e = n[t];
		if (!isTokenWhitespace(e)) return {
			advance: t,
			node: new WhitespaceNode(n.slice(0, t))
		};
		t++;
	}
}
function consumeComment(e, n) {
	return {
		advance: 1,
		node: new CommentNode(n[0])
	};
}
function consumeAllCommentsAndWhitespace(e, n) {
	const t = [];
	let o = 0;
	for (;;) {
		if (isTokenWhitespace(n[o])) {
			const e = consumeWhitespace(0, n.slice(o));
			o += e.advance, t.push(e.node);
			continue;
		}
		if (!isTokenComment(n[o])) return {
			advance: o,
			nodes: t
		};
		t.push(new CommentNode(n[o])), o++;
	}
}
function parseComponentValue(t, o) {
	const s = { onParseError: o?.onParseError ?? (() => {}) }, i = [...t];
	isTokenEOF(i[i.length - 1]) || i.push([
		c$1.EOF,
		"",
		i[i.length - 1][2],
		i[i.length - 1][3],
		void 0
	]);
	const r = consumeComponentValue(s, i);
	if (isTokenEOF(i[Math.min(r.advance, i.length - 1)])) return r.node;
	s.onParseError(new ParseError$1("Expected EOF after parsing a component value.", t[0][2], t[t.length - 1][3], ["5.3.9. Parse a component value", "Expected EOF"]));
}
function parseCommaSeparatedListOfComponentValues(t, o) {
	const s = { onParseError: o?.onParseError ?? (() => {}) }, i = [...t];
	if (0 === t.length) return [];
	isTokenEOF(i[i.length - 1]) && i.push([
		c$1.EOF,
		"",
		i[i.length - 1][2],
		i[i.length - 1][3],
		void 0
	]);
	const r = [];
	let a = [], c = 0;
	for (;;) {
		if (!i[c] || isTokenEOF(i[c])) return a.length && r.push(a), r;
		if (isTokenComma(i[c])) {
			r.push(a), a = [], c++;
			continue;
		}
		const n = consumeComponentValue(s, t.slice(c));
		a.push(n.node), c += n.advance;
	}
}
function forEach(e, n, t) {
	if (0 === e.length) return;
	const o = walkerIndexGenerator(e);
	let s = 0;
	for (; s < e.length;) {
		const i = e[s];
		let r;
		if (t && (r = { ...t }), !1 === n({
			node: i,
			parent: { value: e },
			state: r
		}, s)) return !1;
		if (s = o(e, i, s), -1 === s) break;
	}
}
function walk(e, n, t) {
	0 !== e.length && forEach(e, (t, o) => !1 !== n(t, o) && (!("walk" in t.node) || !e.includes(t.node) || !1 !== t.node.walk(n, t.state)) && void 0, t);
}
function replaceComponentValues$1(e, n) {
	for (let t = 0; t < e.length; t++) walk(e[t], (e, t) => {
		if ("number" != typeof t) return;
		const o = n(e.node);
		o && (Array.isArray(o) ? e.parent.value.splice(t, 1, ...o) : e.parent.value.splice(t, 1, o));
	});
	return e;
}
function isSimpleBlockNode(e) {
	return SimpleBlockNode.isSimpleBlockNode(e);
}
function isFunctionNode(e) {
	return FunctionNode.isFunctionNode(e);
}
function isWhitespaceNode(e) {
	return WhitespaceNode.isWhitespaceNode(e);
}
function isCommentNode(e) {
	return CommentNode.isCommentNode(e);
}
function isWhiteSpaceOrCommentNode(e) {
	return isWhitespaceNode(e) || isCommentNode(e);
}
function isTokenNode(e) {
	return TokenNode.isTokenNode(e);
}
function sourceIndices(e) {
	if (Array.isArray(e)) {
		const n = e[0];
		if (!n) return [0, 0];
		const t = e[e.length - 1] || n;
		return [sourceIndices(n)[0], sourceIndices(t)[1]];
	}
	const n = e.tokens(), t = n[0], o = n[n.length - 1];
	return t && o ? [t[2], o[3]] : [0, 0];
}
var f$1, ContainerNodeBaseClass, FunctionNode, SimpleBlockNode, WhitespaceNode, CommentNode, TokenNode;
var init_dist$3 = __esmMin((() => {
	init_dist$4();
	(function(e) {
		e.Function = "function", e.SimpleBlock = "simple-block", e.Whitespace = "whitespace", e.Comment = "comment", e.Token = "token";
	})(f$1 || (f$1 = {}));
	ContainerNodeBaseClass = class {
		value = [];
		indexOf(e) {
			return this.value.indexOf(e);
		}
		at(e) {
			if ("number" == typeof e) return e < 0 && (e = this.value.length + e), this.value[e];
		}
		forEach(e, n) {
			if (0 === this.value.length) return;
			const t = walkerIndexGenerator(this.value);
			let o = 0;
			for (; o < this.value.length;) {
				const s = this.value[o];
				let i;
				if (n && (i = { ...n }), !1 === e({
					node: s,
					parent: this,
					state: i
				}, o)) return !1;
				if (o = t(this.value, s, o), -1 === o) break;
			}
		}
		walk(e, n) {
			0 !== this.value.length && this.forEach((n, t) => !1 !== e(n, t) && (!("walk" in n.node) || !this.value.includes(n.node) || !1 !== n.node.walk(e, n.state)) && void 0, n);
		}
	};
	FunctionNode = class FunctionNode extends ContainerNodeBaseClass {
		type = f$1.Function;
		name;
		endToken;
		constructor(e, n, t) {
			super(), this.name = e, this.endToken = n, this.value = t;
		}
		getName() {
			return this.name[4].value;
		}
		normalize() {
			isTokenEOF(this.endToken) && (this.endToken = [
				c$1.CloseParen,
				")",
				-1,
				-1,
				void 0
			]);
		}
		tokens() {
			return isTokenEOF(this.endToken) ? [this.name, ...this.value.flatMap((e) => e.tokens())] : [
				this.name,
				...this.value.flatMap((e) => e.tokens()),
				this.endToken
			];
		}
		toString() {
			const e = this.value.map((e) => isToken(e) ? stringify(e) : e.toString()).join("");
			return stringify(this.name) + e + stringify(this.endToken);
		}
		toJSON() {
			return {
				type: this.type,
				name: this.getName(),
				tokens: this.tokens(),
				value: this.value.map((e) => e.toJSON())
			};
		}
		isFunctionNode() {
			return FunctionNode.isFunctionNode(this);
		}
		static isFunctionNode(e) {
			return !!e && e instanceof FunctionNode && e.type === f$1.Function;
		}
	};
	SimpleBlockNode = class SimpleBlockNode extends ContainerNodeBaseClass {
		type = f$1.SimpleBlock;
		startToken;
		endToken;
		constructor(e, n, t) {
			super(), this.startToken = e, this.endToken = n, this.value = t;
		}
		normalize() {
			if (isTokenEOF(this.endToken)) {
				const e = mirrorVariant(this.startToken);
				e && (this.endToken = e);
			}
		}
		tokens() {
			return isTokenEOF(this.endToken) ? [this.startToken, ...this.value.flatMap((e) => e.tokens())] : [
				this.startToken,
				...this.value.flatMap((e) => e.tokens()),
				this.endToken
			];
		}
		toString() {
			const e = this.value.map((e) => isToken(e) ? stringify(e) : e.toString()).join("");
			return stringify(this.startToken) + e + stringify(this.endToken);
		}
		toJSON() {
			return {
				type: this.type,
				startToken: this.startToken,
				tokens: this.tokens(),
				value: this.value.map((e) => e.toJSON())
			};
		}
		isSimpleBlockNode() {
			return SimpleBlockNode.isSimpleBlockNode(this);
		}
		static isSimpleBlockNode(e) {
			return !!e && e instanceof SimpleBlockNode && e.type === f$1.SimpleBlock;
		}
	};
	WhitespaceNode = class WhitespaceNode {
		type = f$1.Whitespace;
		value;
		constructor(e) {
			this.value = e;
		}
		tokens() {
			return this.value;
		}
		toString() {
			return stringify(...this.value);
		}
		toJSON() {
			return {
				type: this.type,
				tokens: this.tokens()
			};
		}
		isWhitespaceNode() {
			return WhitespaceNode.isWhitespaceNode(this);
		}
		static isWhitespaceNode(e) {
			return !!e && e instanceof WhitespaceNode && e.type === f$1.Whitespace;
		}
	};
	CommentNode = class CommentNode {
		type = f$1.Comment;
		value;
		constructor(e) {
			this.value = e;
		}
		tokens() {
			return [this.value];
		}
		toString() {
			return stringify(this.value);
		}
		toJSON() {
			return {
				type: this.type,
				tokens: this.tokens()
			};
		}
		isCommentNode() {
			return CommentNode.isCommentNode(this);
		}
		static isCommentNode(e) {
			return !!e && e instanceof CommentNode && e.type === f$1.Comment;
		}
	};
	TokenNode = class TokenNode {
		type = f$1.Token;
		value;
		constructor(e) {
			this.value = e;
		}
		tokens() {
			return [this.value];
		}
		toString() {
			return this.value[1];
		}
		toJSON() {
			return {
				type: this.type,
				tokens: this.tokens()
			};
		}
		isTokenNode() {
			return TokenNode.isTokenNode(this);
		}
		static isTokenNode(e) {
			return !!e && e instanceof TokenNode && e.type === f$1.Token;
		}
	};
}));
//#endregion
//#region node_modules/@csstools/css-calc/dist/index.mjs
function toLowerCaseAZ$1(e) {
	return e.replace(M, (e) => String.fromCharCode(e.charCodeAt(0) + 32));
}
function convertUnit(e, n) {
	if (!isTokenDimension(e)) return n;
	if (!isTokenDimension(n)) return n;
	const t = toLowerCaseAZ$1(e[4].unit), r = toLowerCaseAZ$1(n[4].unit);
	if (t === r) return n;
	const a = Y$1.get(r);
	if (!a) return n;
	const u = a.get(t);
	if (!u) return n;
	const i = u(n[4].value), o = [
		c$1.Dimension,
		"",
		n[2],
		n[3],
		{
			...n[4],
			signCharacter: i < 0 ? "-" : void 0,
			type: Number.isInteger(i) ? a$1.Integer : a$1.Number,
			value: i
		}
	];
	return mutateUnit(o, e[4].unit), o;
}
function toCanonicalUnit(e) {
	if (!isTokenDimension(e)) return e;
	const n = toLowerCaseAZ$1(e[4].unit), t = x[n];
	if (n === t) return e;
	const r = Y$1.get(n);
	if (!r) return e;
	const a = r.get(t);
	if (!a) return e;
	const u = a(e[4].value), i = [
		c$1.Dimension,
		"",
		e[2],
		e[3],
		{
			...e[4],
			signCharacter: u < 0 ? "-" : void 0,
			type: Number.isInteger(u) ? a$1.Integer : a$1.Number,
			value: u
		}
	];
	return mutateUnit(i, t), i;
}
function addition(e, t) {
	if (2 !== e.length) return -1;
	const r = e[0].value;
	let a = e[1].value;
	if (isTokenNumber(r) && isTokenNumber(a)) {
		const e = r[4].value + a[4].value;
		return new TokenNode([
			c$1.Number,
			e.toString(),
			r[2],
			a[3],
			{
				value: e,
				type: r[4].type === a$1.Integer && a[4].type === a$1.Integer ? a$1.Integer : a$1.Number
			}
		]);
	}
	if (isTokenPercentage(r) && isTokenPercentage(a)) {
		const e = r[4].value + a[4].value;
		return new TokenNode([
			c$1.Percentage,
			e.toString() + "%",
			r[2],
			a[3],
			{ value: e }
		]);
	}
	if (isTokenDimension(r) && isTokenDimension(a) && (a = convertUnit(r, a), toLowerCaseAZ$1(r[4].unit) === toLowerCaseAZ$1(a[4].unit))) {
		const e = r[4].value + a[4].value;
		return new TokenNode([
			c$1.Dimension,
			e.toString() + r[4].unit,
			r[2],
			a[3],
			{
				value: e,
				type: r[4].type === a$1.Integer && a[4].type === a$1.Integer ? a$1.Integer : a$1.Number,
				unit: r[4].unit
			}
		]);
	}
	return (isTokenNumber(r) && (isTokenDimension(a) || isTokenPercentage(a)) || isTokenNumber(a) && (isTokenDimension(r) || isTokenPercentage(r))) && t.onParseError?.(new ParseErrorWithComponentValues(y.UnexpectedAdditionOfDimensionOrPercentageWithNumber, e)), -1;
}
function division(e) {
	if (2 !== e.length) return -1;
	const t = e[0].value, r = e[1].value;
	if (isTokenNumber(t) && isTokenNumber(r)) {
		const e = t[4].value / r[4].value;
		return new TokenNode([
			c$1.Number,
			e.toString(),
			t[2],
			r[3],
			{
				value: e,
				type: Number.isInteger(e) ? a$1.Integer : a$1.Number
			}
		]);
	}
	if (isTokenPercentage(t) && isTokenNumber(r)) {
		const e = t[4].value / r[4].value;
		return new TokenNode([
			c$1.Percentage,
			e.toString() + "%",
			t[2],
			r[3],
			{ value: e }
		]);
	}
	if (isTokenDimension(t) && isTokenNumber(r)) {
		const e = t[4].value / r[4].value;
		return new TokenNode([
			c$1.Dimension,
			e.toString() + t[4].unit,
			t[2],
			r[3],
			{
				value: e,
				type: Number.isInteger(e) ? a$1.Integer : a$1.Number,
				unit: t[4].unit
			}
		]);
	}
	return -1;
}
function isCalculation(e) {
	return !!e && "object" == typeof e && "inputs" in e && Array.isArray(e.inputs) && "operation" in e;
}
function solve(e, n) {
	if (-1 === e) return -1;
	const r = [];
	for (let a = 0; a < e.inputs.length; a++) {
		const u = e.inputs[a];
		if (isTokenNode(u)) {
			r.push(u);
			continue;
		}
		const i = solve(u, n);
		if (-1 === i) return -1;
		r.push(i);
	}
	return e.operation(r, n);
}
function multiplication(e) {
	if (2 !== e.length) return -1;
	const t = e[0].value, r = e[1].value;
	if (isTokenNumber(t) && isTokenNumber(r)) {
		const e = t[4].value * r[4].value;
		return new TokenNode([
			c$1.Number,
			e.toString(),
			t[2],
			r[3],
			{
				value: e,
				type: t[4].type === a$1.Integer && r[4].type === a$1.Integer ? a$1.Integer : a$1.Number
			}
		]);
	}
	if (isTokenPercentage(t) && isTokenNumber(r)) {
		const e = t[4].value * r[4].value;
		return new TokenNode([
			c$1.Percentage,
			e.toString() + "%",
			t[2],
			r[3],
			{ value: e }
		]);
	}
	if (isTokenNumber(t) && isTokenPercentage(r)) {
		const e = t[4].value * r[4].value;
		return new TokenNode([
			c$1.Percentage,
			e.toString() + "%",
			t[2],
			r[3],
			{ value: e }
		]);
	}
	if (isTokenDimension(t) && isTokenNumber(r)) {
		const e = t[4].value * r[4].value;
		return new TokenNode([
			c$1.Dimension,
			e.toString() + t[4].unit,
			t[2],
			r[3],
			{
				value: e,
				type: t[4].type === a$1.Integer && r[4].type === a$1.Integer ? a$1.Integer : a$1.Number,
				unit: t[4].unit
			}
		]);
	}
	if (isTokenNumber(t) && isTokenDimension(r)) {
		const e = t[4].value * r[4].value;
		return new TokenNode([
			c$1.Dimension,
			e.toString() + r[4].unit,
			t[2],
			r[3],
			{
				value: e,
				type: t[4].type === a$1.Integer && r[4].type === a$1.Integer ? a$1.Integer : a$1.Number,
				unit: r[4].unit
			}
		]);
	}
	return -1;
}
function resolveGlobalsAndConstants(e, r) {
	for (let a = 0; a < e.length; a++) {
		const u = e[a];
		if (!isTokenNode(u)) continue;
		const i = u.value;
		if (!isTokenIdent(i)) continue;
		const o = toLowerCaseAZ$1(i[4].value);
		switch (o) {
			case "e":
				e.splice(a, 1, new TokenNode([
					c$1.Number,
					Math.E.toString(),
					i[2],
					i[3],
					{
						value: Math.E,
						type: a$1.Number
					}
				]));
				break;
			case "pi":
				e.splice(a, 1, new TokenNode([
					c$1.Number,
					Math.PI.toString(),
					i[2],
					i[3],
					{
						value: Math.PI,
						type: a$1.Number
					}
				]));
				break;
			case "infinity":
				e.splice(a, 1, new TokenNode([
					c$1.Number,
					"infinity",
					i[2],
					i[3],
					{
						value: Infinity,
						type: a$1.Number
					}
				]));
				break;
			case "-infinity":
				e.splice(a, 1, new TokenNode([
					c$1.Number,
					"-infinity",
					i[2],
					i[3],
					{
						value: -Infinity,
						type: a$1.Number
					}
				]));
				break;
			case "nan":
				e.splice(a, 1, new TokenNode([
					c$1.Number,
					"NaN",
					i[2],
					i[3],
					{
						value: NaN,
						type: a$1.Number
					}
				]));
				break;
			default: if (r.has(o)) {
				const t = r.get(o);
				e.splice(a, 1, new TokenNode(t));
			}
		}
	}
	return e;
}
function unary(e) {
	if (1 !== e.length) return -1;
	const n = e[0].value;
	return isTokenNumeric(n) ? e[0] : -1;
}
function resultToCalculation(e, n, t) {
	return isTokenDimension(n) ? dimensionToCalculation(e, n[4].unit, t) : isTokenPercentage(n) ? percentageToCalculation(e, t) : isTokenNumber(n) ? numberToCalculation(e, t) : -1;
}
function dimensionToCalculation(e, t, r) {
	const a = e.tokens();
	return {
		inputs: [new TokenNode([
			c$1.Dimension,
			r.toString() + t,
			a[0][2],
			a[a.length - 1][3],
			{
				value: r,
				type: Number.isInteger(r) ? a$1.Integer : a$1.Number,
				unit: t
			}
		])],
		operation: unary
	};
}
function percentageToCalculation(e, t) {
	const r = e.tokens();
	return {
		inputs: [new TokenNode([
			c$1.Percentage,
			t.toString() + "%",
			r[0][2],
			r[r.length - 1][3],
			{ value: t }
		])],
		operation: unary
	};
}
function numberToCalculation(e, t) {
	const r = e.tokens();
	return {
		inputs: [new TokenNode([
			c$1.Number,
			t.toString(),
			r[0][2],
			r[r.length - 1][3],
			{
				value: t,
				type: Number.isInteger(t) ? a$1.Integer : a$1.Number
			}
		])],
		operation: unary
	};
}
function solveACos(e, n) {
	const t = n.value;
	if (!isTokenNumber(t)) return -1;
	return dimensionToCalculation(e, "rad", Math.acos(t[4].value));
}
function solveASin(e, n) {
	const t = n.value;
	if (!isTokenNumber(t)) return -1;
	return dimensionToCalculation(e, "rad", Math.asin(t[4].value));
}
function solveATan(e, n) {
	const t = n.value;
	if (!isTokenNumber(t)) return -1;
	return dimensionToCalculation(e, "rad", Math.atan(t[4].value));
}
function isDimensionOrNumber(e) {
	return isTokenDimension(e) || isTokenNumber(e);
}
function arrayOfSameNumeric(e) {
	if (0 === e.length) return !0;
	const n = e[0];
	if (!isTokenNumeric(n)) return !1;
	if (1 === e.length) return !0;
	if (isTokenDimension(n)) {
		const t = toLowerCaseAZ$1(n[4].unit);
		for (let r = 1; r < e.length; r++) {
			const a = e[r];
			if (n[0] !== a[0]) return !1;
			if (t !== toLowerCaseAZ$1(a[4].unit)) return !1;
		}
		return !0;
	}
	for (let t = 1; t < e.length; t++) {
		const r = e[t];
		if (n[0] !== r[0]) return !1;
	}
	return !0;
}
function twoOfSameNumeric(e, n) {
	return !!isTokenNumeric(e) && (isTokenDimension(e) ? e[0] === n[0] && toLowerCaseAZ$1(e[4].unit) === toLowerCaseAZ$1(n[4].unit) : e[0] === n[0]);
}
function solveATan2(e, n, t) {
	const r = n.value;
	if (!isDimensionOrNumber(r)) return -1;
	const a = convertUnit(r, t.value);
	if (!twoOfSameNumeric(r, a)) return -1;
	return dimensionToCalculation(e, "rad", Math.atan2(r[4].value, a[4].value));
}
function solveAbs(e, n, t) {
	const r = n.value;
	if (!isTokenNumeric(r)) return -1;
	if (!t.rawPercentages && isTokenPercentage(r)) return -1;
	return resultToCalculation(e, r, Math.abs(r[4].value));
}
function solveClamp(e, n, r, a, u) {
	if (!isTokenNode(n) || !isTokenNode(r) || !isTokenNode(a)) return -1;
	const i = n.value;
	if (!isTokenNumeric(i)) return -1;
	if (!u.rawPercentages && isTokenPercentage(i)) return -1;
	const o = convertUnit(i, r.value);
	if (!twoOfSameNumeric(i, o)) return -1;
	const l = convertUnit(i, a.value);
	if (!twoOfSameNumeric(i, l)) return -1;
	return resultToCalculation(e, i, Math.max(i[4].value, Math.min(o[4].value, l[4].value)));
}
function solveCos(e, n) {
	const t = n.value;
	if (!isDimensionOrNumber(t)) return -1;
	let r = t[4].value;
	if (isTokenDimension(t)) switch (t[4].unit.toLowerCase()) {
		case "rad": break;
		case "deg":
			r = P.get("rad")(t[4].value);
			break;
		case "grad":
			r = k.get("rad")(t[4].value);
			break;
		case "turn":
			r = j.get("rad")(t[4].value);
			break;
		default: return -1;
	}
	return r = Math.cos(r), numberToCalculation(e, r);
}
function solveExp(e, n) {
	const t = n.value;
	if (!isTokenNumber(t)) return -1;
	return numberToCalculation(e, Math.exp(t[4].value));
}
function solveHypot(e, n, r) {
	if (!n.every(isTokenNode)) return -1;
	const a = n[0].value;
	if (!isTokenNumeric(a)) return -1;
	if (!r.rawPercentages && isTokenPercentage(a)) return -1;
	const u = n.map((e) => convertUnit(a, e.value));
	if (!arrayOfSameNumeric(u)) return -1;
	const i = u.map((e) => e[4].value);
	return resultToCalculation(e, a, Math.hypot(...i));
}
function solveMax(e, n, r) {
	if (!n.every(isTokenNode)) return -1;
	const a = n[0].value;
	if (!isTokenNumeric(a)) return -1;
	if (!r.rawPercentages && isTokenPercentage(a)) return -1;
	const u = n.map((e) => convertUnit(a, e.value));
	if (!arrayOfSameNumeric(u)) return -1;
	const i = u.map((e) => e[4].value);
	return resultToCalculation(e, a, Math.max(...i));
}
function solveMin(e, n, r) {
	if (!n.every(isTokenNode)) return -1;
	const a = n[0].value;
	if (!isTokenNumeric(a)) return -1;
	if (!r.rawPercentages && isTokenPercentage(a)) return -1;
	const u = n.map((e) => convertUnit(a, e.value));
	if (!arrayOfSameNumeric(u)) return -1;
	const i = u.map((e) => e[4].value);
	return resultToCalculation(e, a, Math.min(...i));
}
function solveMod(e, n, t) {
	const r = n.value;
	if (!isTokenNumeric(r)) return -1;
	const a = convertUnit(r, t.value);
	if (!twoOfSameNumeric(r, a)) return -1;
	let u;
	return u = 0 === a[4].value ? NaN : Number.isFinite(r[4].value) && (Number.isFinite(a[4].value) || (a[4].value !== Number.POSITIVE_INFINITY || r[4].value !== Number.NEGATIVE_INFINITY && !Object.is(0 * r[4].value, -0)) && (a[4].value !== Number.NEGATIVE_INFINITY || r[4].value !== Number.POSITIVE_INFINITY && !Object.is(0 * r[4].value, 0))) ? Number.isFinite(a[4].value) ? (r[4].value % a[4].value + a[4].value) % a[4].value : r[4].value : NaN, resultToCalculation(e, r, u);
}
function solvePow(e, n, t) {
	const r = n.value, a = t.value;
	if (!isTokenNumber(r)) return -1;
	if (!twoOfSameNumeric(r, a)) return -1;
	return numberToCalculation(e, Math.pow(r[4].value, a[4].value));
}
function solveRem(e, n, t) {
	const r = n.value;
	if (!isTokenNumeric(r)) return -1;
	const a = convertUnit(r, t.value);
	if (!twoOfSameNumeric(r, a)) return -1;
	let u;
	return u = 0 === a[4].value ? NaN : Number.isFinite(r[4].value) ? Number.isFinite(a[4].value) ? r[4].value % a[4].value : r[4].value : NaN, resultToCalculation(e, r, u);
}
function snapAsBorderWidth(e, n, t) {
	if (!isTokenDimension(n)) return -1;
	const r = t.devicePixelLength ?? 1, a = [
		c$1.Dimension,
		`${r}px`,
		n[2],
		n[3],
		{
			value: r,
			type: a$1.Integer,
			unit: "px"
		}
	], u = convertUnit(a, n);
	if (!twoOfSameNumeric(u, a)) return -1;
	if (u[4].value < 0) return -1;
	if (Number.isInteger(u[4].value / r)) return resultToCalculation(e, n, n[4].value);
	if (u[4].value > 0 && u[4].value < r) return resultToCalculation(e, n, convertUnit(n, a)[4].value);
	if (u[4].value > r) {
		const t = Math.floor(u[4].value / a[4].value) * a[4].value;
		return u[4].value = t, resultToCalculation(e, n, convertUnit(n, u)[4].value);
	}
	return resultToCalculation(e, n, n[4].value);
}
function solveRound(e, n, t, r, a) {
	const u = t.value;
	if (!isTokenNumeric(u)) return -1;
	if ("line-width" === n && !isTokenDimension(u)) return -1;
	if (!a.rawPercentages && isTokenPercentage(u)) return -1;
	const i = convertUnit(u, r.value);
	if (!twoOfSameNumeric(u, i)) return -1;
	let o;
	if (0 === i[4].value) o = NaN;
	else if (Number.isFinite(u[4].value) || Number.isFinite(i[4].value)) if (!Number.isFinite(u[4].value) && Number.isFinite(i[4].value)) o = u[4].value;
	else if (Number.isFinite(u[4].value) && !Number.isFinite(i[4].value)) switch (n) {
		case "down":
			o = u[4].value < 0 ? -Infinity : Object.is(-0, 0 * u[4].value) ? -0 : 0;
			break;
		case "up":
			o = u[4].value > 0 ? Infinity : Object.is(0, 0 * u[4].value) ? 0 : -0;
			break;
		default: o = Object.is(0, 0 * u[4].value) ? 0 : -0;
	}
	else switch (n) {
		case "down":
			o = Math.floor(u[4].value / i[4].value) * i[4].value;
			break;
		case "up":
			o = Math.ceil(u[4].value / i[4].value) * i[4].value;
			break;
		case "to-zero":
			o = Math.trunc(u[4].value / i[4].value) * i[4].value;
			break;
		default: {
			let t = Math.floor(u[4].value / i[4].value) * i[4].value, r = Math.ceil(u[4].value / i[4].value) * i[4].value;
			if (t > r) {
				const e = t;
				t = r, r = e;
			}
			const l = Math.abs(u[4].value - t), c = Math.abs(u[4].value - r);
			if (o = "line-width" === n && u[4].value > 0 && (0 === r || 0 === t) ? 0 !== r ? r : t : l === c ? r : l < c ? t : r, "line-width" === n) {
				const n = solve(resultToCalculation(e, u, o), a);
				return -1 === n ? -1 : snapAsBorderWidth(e, n.value, a);
			}
			break;
		}
	}
	else o = NaN;
	return resultToCalculation(e, u, o);
}
function solveSign(e, n, t) {
	const r = n.value;
	if (!isTokenNumeric(r)) return -1;
	if (!t.rawPercentages && isTokenPercentage(r)) return -1;
	return numberToCalculation(e, Math.sign(r[4].value));
}
function solveSin(e, n) {
	const t = n.value;
	if (!isDimensionOrNumber(t)) return -1;
	let r = t[4].value;
	if (isTokenDimension(t)) switch (toLowerCaseAZ$1(t[4].unit)) {
		case "rad": break;
		case "deg":
			r = P.get("rad")(t[4].value);
			break;
		case "grad":
			r = k.get("rad")(t[4].value);
			break;
		case "turn":
			r = j.get("rad")(t[4].value);
			break;
		default: return -1;
	}
	return r = Math.sin(r), numberToCalculation(e, r);
}
function solveSqrt(e, n) {
	const t = n.value;
	if (!isTokenNumber(t)) return -1;
	return numberToCalculation(e, Math.sqrt(t[4].value));
}
function solveTan(e, n) {
	const t = n.value;
	if (!isDimensionOrNumber(t)) return -1;
	const r = t[4].value;
	let a = 0, u = t[4].value;
	if (isTokenDimension(t)) switch (toLowerCaseAZ$1(t[4].unit)) {
		case "rad":
			a = G.get("deg")(r);
			break;
		case "deg":
			a = r, u = P.get("rad")(r);
			break;
		case "grad":
			a = k.get("deg")(r), u = k.get("rad")(r);
			break;
		case "turn":
			a = j.get("deg")(r), u = j.get("rad")(r);
			break;
		default: return -1;
	}
	const i = a / 90;
	return u = a % 90 == 0 && i % 2 != 0 ? i > 0 ? Infinity : -Infinity : Math.tan(u), numberToCalculation(e, u);
}
function subtraction(e, t) {
	if (2 !== e.length) return -1;
	const r = e[0].value;
	let a = e[1].value;
	if (isTokenNumber(r) && isTokenNumber(a)) {
		const e = r[4].value - a[4].value;
		return new TokenNode([
			c$1.Number,
			e.toString(),
			r[2],
			a[3],
			{
				value: e,
				type: r[4].type === a$1.Integer && a[4].type === a$1.Integer ? a$1.Integer : a$1.Number
			}
		]);
	}
	if (isTokenPercentage(r) && isTokenPercentage(a)) {
		const e = r[4].value - a[4].value;
		return new TokenNode([
			c$1.Percentage,
			e.toString() + "%",
			r[2],
			a[3],
			{ value: e }
		]);
	}
	if (isTokenDimension(r) && isTokenDimension(a) && (a = convertUnit(r, a), toLowerCaseAZ$1(r[4].unit) === toLowerCaseAZ$1(a[4].unit))) {
		const e = r[4].value - a[4].value;
		return new TokenNode([
			c$1.Dimension,
			e.toString() + r[4].unit,
			r[2],
			a[3],
			{
				value: e,
				type: r[4].type === a$1.Integer && a[4].type === a$1.Integer ? a$1.Integer : a$1.Number,
				unit: r[4].unit
			}
		]);
	}
	return (isTokenNumber(r) && (isTokenDimension(a) || isTokenPercentage(a)) || isTokenNumber(a) && (isTokenDimension(r) || isTokenPercentage(r))) && t.onParseError?.(new ParseErrorWithComponentValues(y.UnexpectedSubtractionOfDimensionOrPercentageWithNumber, e)), -1;
}
function solveLog(e, n) {
	if (1 === n.length) {
		const r = n[0];
		if (!r || !isTokenNode(r)) return -1;
		const a = r.value;
		if (!isTokenNumber(a)) return -1;
		return numberToCalculation(e, Math.log(a[4].value));
	}
	if (2 === n.length) {
		const r = n[0];
		if (!r || !isTokenNode(r)) return -1;
		const a = r.value;
		if (!isTokenNumber(a)) return -1;
		const u = n[1];
		if (!u || !isTokenNode(u)) return -1;
		const i = u.value;
		if (!isTokenNumber(i)) return -1;
		return numberToCalculation(e, Math.log(a[4].value) / Math.log(i[4].value));
	}
	return -1;
}
function isNone(e) {
	if (Array.isArray(e)) {
		const n = e.filter((e) => !(isWhitespaceNode(e) && isCommentNode(e)));
		return 1 === n.length && isNone(n[0]);
	}
	if (!isTokenNode(e)) return !1;
	const n = e.value;
	return !!isTokenIdent(n) && _$1.test(n[4].value);
}
function solveRandom(e, n, t, r, a, u) {
	if (-1 === n.fixed && !u.randomCaching) return -1;
	u.randomCaching || (u.randomCaching = {
		propertyName: "",
		propertyN: 0,
		elementID: "",
		documentID: ""
	}), u.randomCaching && !u.randomCaching.propertyN && (u.randomCaching.propertyN = 0);
	const i = t.value;
	if (!isTokenNumeric(i)) return -1;
	const o = convertUnit(i, r.value);
	if (!twoOfSameNumeric(i, o)) return -1;
	let l = null;
	if (a && (l = convertUnit(i, a.value), !twoOfSameNumeric(i, l))) return -1;
	if (!Number.isFinite(i[4].value)) return resultToCalculation(e, i, NaN);
	if (!Number.isFinite(o[4].value)) return resultToCalculation(e, i, NaN);
	if (!Number.isFinite(o[4].value - i[4].value)) return resultToCalculation(e, i, NaN);
	if (l && !Number.isFinite(l[4].value)) return resultToCalculation(e, i, i[4].value);
	const c = -1 === n.fixed ? sfc32(crc32([
		n.dashedIdent ? n.dashedIdent : `${u.randomCaching?.propertyName} ${u.randomCaching.propertyN++}`,
		n.elementShared ? "" : u.randomCaching.elementID,
		u.randomCaching.documentID
	].join(H))) : () => n.fixed;
	let s = i[4].value, v = o[4].value;
	if (s > v && ([s, v] = [v, s]), l && (l[4].value <= 0 || Math.abs(s - v) / l[4].value > 1e10) && (l = null), l) {
		const n = Math.max(l[4].value / 1e3, 1e-9), t = [s];
		let r = 0;
		for (;;) {
			r += l[4].value;
			const e = s + r;
			if (!(e + n < v)) {
				t.push(v);
				break;
			}
			if (t.push(e), e + l[4].value - n > v) break;
		}
		const a = c();
		return resultToCalculation(e, i, Number(t[Math.floor(t.length * a)].toFixed(5)));
	}
	const f = c();
	return resultToCalculation(e, i, Number((f * (v - s) + s).toFixed(5)));
}
function sfc32(e = .34944106645296036, n = .19228640875738723, t = .8784393832007205, r = .04850964319275053) {
	return () => {
		const a = ((e |= 0) + (n |= 0) | 0) + (r |= 0) | 0;
		return r = r + 1 | 0, e = n ^ n >>> 9, n = (t |= 0) + (t << 3) | 0, t = (t = t << 21 | t >>> 11) + a | 0, (a >>> 0) / 4294967296;
	};
}
function crc32(e) {
	let n, t, r = 0;
	r ^= -1;
	for (let a = 0, u = e.length; a < u; a++) t = 255 & (r ^ e.charCodeAt(a)), n = Number("0x" + "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D".substring(9 * t, 9 * t + 8)), r = r >>> 8 ^ n;
	return (-1 ^ r) >>> 0;
}
function calc$1(e, n, r) {
	const a = resolveGlobalsAndConstants([...e.value.filter((e) => !isWhiteSpaceOrCommentNode(e))], n);
	if (1 === a.length && isTokenNode(a[0])) return {
		inputs: [a[0]],
		operation: unary
	};
	let l = 0;
	for (; l < a.length;) {
		const e = a[l];
		if (isSimpleBlockNode(e) && isTokenOpenParen(e.startToken)) {
			const t = calc$1(e, n, r);
			if (-1 === t) return -1;
			a.splice(l, 1, t);
			continue;
		}
		if (isFunctionNode(e)) {
			const t = J.get(e.getName().toLowerCase());
			if (!t) return -1;
			const u = t(e, n, r);
			if (-1 === u) return -1;
			a.splice(l, 1, u);
			continue;
		}
		l++;
	}
	if (l = 0, 1 === a.length && isCalculation(a[0])) return a[0];
	for (; l < a.length;) {
		const e = a[l];
		if (!e || !isTokenNode(e) && !isCalculation(e)) {
			l++;
			continue;
		}
		const n = a[l + 1];
		if (!n || !isTokenNode(n)) {
			l++;
			continue;
		}
		const r = n.value;
		if (!isTokenDelim(r) || "*" !== r[4].value && "/" !== r[4].value) {
			l++;
			continue;
		}
		const u = a[l + 2];
		if (!u || !isTokenNode(u) && !isCalculation(u)) return -1;
		"*" !== r[4].value ? "/" !== r[4].value ? l++ : a.splice(l, 3, {
			inputs: [e, u],
			operation: division
		}) : a.splice(l, 3, {
			inputs: [e, u],
			operation: multiplication
		});
	}
	if (l = 0, 1 === a.length && isCalculation(a[0])) return a[0];
	for (; l < a.length;) {
		const e = a[l];
		if (!e || !isTokenNode(e) && !isCalculation(e)) {
			l++;
			continue;
		}
		const n = a[l + 1];
		if (!n || !isTokenNode(n)) {
			l++;
			continue;
		}
		const r = n.value;
		if (!isTokenDelim(r) || "+" !== r[4].value && "-" !== r[4].value) {
			l++;
			continue;
		}
		const u = a[l + 2];
		if (!u || !isTokenNode(u) && !isCalculation(u)) return -1;
		"+" !== r[4].value ? "-" !== r[4].value ? l++ : a.splice(l, 3, {
			inputs: [e, u],
			operation: subtraction
		}) : a.splice(l, 3, {
			inputs: [e, u],
			operation: addition
		});
	}
	return 1 === a.length && isCalculation(a[0]) ? a[0] : -1;
}
function singleNodeSolver(e, n, t, r) {
	const a = singleArgument(e, n, t);
	return -1 === a ? -1 : r(e, a, t);
}
function singleArgument(e, n, t) {
	const a = solve(calc$1(calcWrapper(e, resolveGlobalsAndConstants([...e.value.filter((e) => !isWhiteSpaceOrCommentNode(e))], n)), n, t), t);
	return -1 === a ? -1 : a;
}
function twoCommaSeparatedNodesSolver(e, n, t, r) {
	const a = twoCommaSeparatedArguments(e, n, t);
	if (-1 === a) return -1;
	const [u, i] = a;
	return r(e, u, i, t);
}
function twoCommaSeparatedArguments(e, n, r) {
	const a = resolveGlobalsAndConstants([...e.value.filter((e) => !isWhiteSpaceOrCommentNode(e))], n), i = [], o = [];
	{
		let e = i;
		for (let n = 0; n < a.length; n++) {
			const r = a[n];
			if (isTokenNode(r) && isTokenComma(r.value)) {
				if (e === o) return -1;
				if (e === i) {
					e = o;
					continue;
				}
				return -1;
			}
			e.push(r);
		}
	}
	const l = solve(calc$1(calcWrapper(e, i), n, r), r);
	if (-1 === l) return -1;
	const c = solve(calc$1(calcWrapper(e, o), n, r), r);
	return -1 === c ? -1 : [l, c];
}
function variadicNodesSolver(e, n, t, r) {
	const a = variadicArguments(e, e.value, n, t);
	return -1 === a ? -1 : r(e, a, t);
}
function variadicArguments(e, n, r, a) {
	const i = resolveGlobalsAndConstants([...n.filter((e) => !isWhiteSpaceOrCommentNode(e))], r), o = [];
	{
		const n = [];
		let u = [];
		for (let e = 0; e < i.length; e++) {
			const r = i[e];
			isTokenNode(r) && isTokenComma(r.value) ? (n.push(u), u = []) : u.push(r);
		}
		n.push(u);
		for (let t = 0; t < n.length; t++) {
			if (0 === n[t].length) return -1;
			const u = solve(calc$1(calcWrapper(e, n[t]), r, a), a);
			if (-1 === u) return -1;
			o.push(u);
		}
	}
	return o;
}
function parseRandomValueSharing(e, n, r, a) {
	const u = {
		isAuto: !1,
		dashedIdent: "",
		fixed: -1,
		elementShared: !1
	}, i = n[0];
	if (!isTokenNode(i) || !isTokenIdent(i.value)) return [u, n];
	for (let i = 0; i < n.length; i++) {
		const o = n[i];
		if (!isTokenNode(o)) return -1;
		if (isTokenComma(o.value)) return [u, n.slice(i + 1)];
		if (!isTokenIdent(o.value)) return -1;
		const l = o.value[4].value.toLowerCase();
		if ("element-shared" !== l) {
			if ("fixed" === l) {
				if (u.elementShared || u.dashedIdent || u.isAuto) return -1;
				i++;
				const t = n[i];
				if (!t) return -1;
				const o = solve(calc$1(calcWrapper(e, [t]), r, a), a);
				if (-1 === o) return -1;
				if (!isTokenNumber(o.value)) return -1;
				if (o.value[4].value < 0 || o.value[4].value > 1) return -1;
				u.fixed = Math.max(0, Math.min(o.value[4].value, .999999999));
				continue;
			}
			if ("auto" !== l) {
				if (l.startsWith("--")) {
					if (-1 !== u.fixed || u.isAuto) return -1;
					u.dashedIdent = l;
				}
			} else {
				if (-1 !== u.fixed || u.dashedIdent) return -1;
				u.isAuto = !0;
			}
		} else {
			if (-1 !== u.fixed) return -1;
			u.elementShared = !0;
		}
	}
	return -1;
}
function calcWrapper(e, n) {
	return new FunctionNode([
		c$1.Function,
		"calc(",
		e.name[2],
		e.name[3],
		{ value: "calc" }
	], [
		c$1.CloseParen,
		")",
		e.endToken[2],
		e.endToken[3],
		void 0
	], n);
}
function maxWrapper(t, r, a) {
	return new FunctionNode([
		c$1.Function,
		"max(",
		t.name[2],
		t.name[3],
		{ value: "max" }
	], [
		c$1.CloseParen,
		")",
		t.endToken[2],
		t.endToken[3],
		void 0
	], [
		r,
		new TokenNode([
			c$1.Comma,
			",",
			...sourceIndices(r),
			void 0
		]),
		a
	]);
}
function patchNaN(e) {
	if (-1 === e) return -1;
	if (isFunctionNode(e)) return e;
	const t = e.value;
	return isTokenNumeric(t) && Number.isNaN(t[4].value) ? isTokenNumber(t) ? new FunctionNode([
		c$1.Function,
		"calc(",
		t[2],
		t[3],
		{ value: "calc" }
	], [
		c$1.CloseParen,
		")",
		t[2],
		t[3],
		void 0
	], [new TokenNode([
		c$1.Ident,
		"NaN",
		t[2],
		t[3],
		{ value: "NaN" }
	])]) : isTokenDimension(t) ? new FunctionNode([
		c$1.Function,
		"calc(",
		t[2],
		t[3],
		{ value: "calc" }
	], [
		c$1.CloseParen,
		")",
		t[2],
		t[3],
		void 0
	], [
		new TokenNode([
			c$1.Ident,
			"NaN",
			t[2],
			t[3],
			{ value: "NaN" }
		]),
		new WhitespaceNode([[
			c$1.Whitespace,
			" ",
			t[2],
			t[3],
			void 0
		]]),
		new TokenNode([
			c$1.Delim,
			"*",
			t[2],
			t[3],
			{ value: "*" }
		]),
		new WhitespaceNode([[
			c$1.Whitespace,
			" ",
			t[2],
			t[3],
			void 0
		]]),
		new TokenNode([
			c$1.Dimension,
			"1" + t[4].unit,
			t[2],
			t[3],
			{
				value: 1,
				type: a$1.Integer,
				unit: t[4].unit
			}
		])
	]) : isTokenPercentage(t) ? new FunctionNode([
		c$1.Function,
		"calc(",
		t[2],
		t[3],
		{ value: "calc" }
	], [
		c$1.CloseParen,
		")",
		t[2],
		t[3],
		void 0
	], [
		new TokenNode([
			c$1.Ident,
			"NaN",
			t[2],
			t[3],
			{ value: "NaN" }
		]),
		new WhitespaceNode([[
			c$1.Whitespace,
			" ",
			t[2],
			t[3],
			void 0
		]]),
		new TokenNode([
			c$1.Delim,
			"*",
			t[2],
			t[3],
			{ value: "*" }
		]),
		new WhitespaceNode([[
			c$1.Whitespace,
			" ",
			t[2],
			t[3],
			void 0
		]]),
		new TokenNode([
			c$1.Percentage,
			"1%",
			t[2],
			t[3],
			{ value: 1 }
		])
	]) : -1 : e;
}
function patchInfinity(e) {
	if (-1 === e) return -1;
	if (isFunctionNode(e)) return e;
	const t = e.value;
	if (!isTokenNumeric(t)) return e;
	if (Number.isFinite(t[4].value) || Number.isNaN(t[4].value)) return e;
	let r = "";
	return Number.NEGATIVE_INFINITY === t[4].value && (r = "-"), isTokenNumber(t) ? new FunctionNode([
		c$1.Function,
		"calc(",
		t[2],
		t[3],
		{ value: "calc" }
	], [
		c$1.CloseParen,
		")",
		t[2],
		t[3],
		void 0
	], [new TokenNode([
		c$1.Ident,
		r + "infinity",
		t[2],
		t[3],
		{ value: r + "infinity" }
	])]) : isTokenDimension(t) ? new FunctionNode([
		c$1.Function,
		"calc(",
		t[2],
		t[3],
		{ value: "calc" }
	], [
		c$1.CloseParen,
		")",
		t[2],
		t[3],
		void 0
	], [
		new TokenNode([
			c$1.Ident,
			r + "infinity",
			t[2],
			t[3],
			{ value: r + "infinity" }
		]),
		new WhitespaceNode([[
			c$1.Whitespace,
			" ",
			t[2],
			t[3],
			void 0
		]]),
		new TokenNode([
			c$1.Delim,
			"*",
			t[2],
			t[3],
			{ value: "*" }
		]),
		new WhitespaceNode([[
			c$1.Whitespace,
			" ",
			t[2],
			t[3],
			void 0
		]]),
		new TokenNode([
			c$1.Dimension,
			"1" + t[4].unit,
			t[2],
			t[3],
			{
				value: 1,
				type: a$1.Integer,
				unit: t[4].unit
			}
		])
	]) : new FunctionNode([
		c$1.Function,
		"calc(",
		t[2],
		t[3],
		{ value: "calc" }
	], [
		c$1.CloseParen,
		")",
		t[2],
		t[3],
		void 0
	], [
		new TokenNode([
			c$1.Ident,
			r + "infinity",
			t[2],
			t[3],
			{ value: r + "infinity" }
		]),
		new WhitespaceNode([[
			c$1.Whitespace,
			" ",
			t[2],
			t[3],
			void 0
		]]),
		new TokenNode([
			c$1.Delim,
			"*",
			t[2],
			t[3],
			{ value: "*" }
		]),
		new WhitespaceNode([[
			c$1.Whitespace,
			" ",
			t[2],
			t[3],
			void 0
		]]),
		new TokenNode([
			c$1.Percentage,
			"1%",
			t[2],
			t[3],
			{ value: 1 }
		])
	]);
}
function patchMinusZero(e) {
	if (-1 === e) return -1;
	if (isFunctionNode(e)) return e;
	const n = e.value;
	return isTokenNumeric(n) && Object.is(-0, n[4].value) ? ("-0" === n[1] || (isTokenPercentage(n) ? n[1] = "-0%" : isTokenDimension(n) ? n[1] = "-0" + n[4].unit : n[1] = "-0"), e) : e;
}
function patchPrecision(e, n = 13) {
	if (-1 === e) return -1;
	if (n <= 0) return e;
	if (isFunctionNode(e)) return e;
	const t = e.value;
	if (!isTokenNumeric(t)) return e;
	if (Number.isInteger(t[4].value)) return e;
	const r = Number(t[4].value.toFixed(n)).toString();
	return isTokenNumber(t) ? t[1] = r : isTokenPercentage(t) ? t[1] = r + "%" : isTokenDimension(t) && (t[1] = r + t[4].unit), e;
}
function patchCanonicalUnit(e) {
	return -1 === e ? -1 : isFunctionNode(e) ? e : isTokenDimension(e.value) ? (e.value = toCanonicalUnit(e.value), e) : e;
}
function patchCalcResult(e, n) {
	let t = e;
	return n?.toCanonicalUnits && (t = patchCanonicalUnit(t)), t = patchPrecision(t, n?.precision), t = patchMinusZero(t), n?.censorIntoStandardRepresentableValues || (t = patchNaN(t), t = patchInfinity(t)), t;
}
function tokenizeGlobals(e) {
	const n = /* @__PURE__ */ new Map();
	if (!e) return n;
	for (const [t, r] of e) if (isToken(r)) n.set(t, r);
	else if ("string" == typeof r) {
		const e = tokenizer({ css: r }), a = e.nextToken();
		if (e.nextToken(), !e.endOfFile()) continue;
		if (!isTokenNumeric(a)) continue;
		n.set(t, a);
		continue;
	}
	return n;
}
function calc(e, n) {
	return calcFromComponentValues(parseCommaSeparatedListOfComponentValues(tokenize({ css: e }), {}), n).map((e) => e.map((e) => stringify(...e.tokens())).join("")).join(",");
}
function calcFromComponentValues(e, n) {
	const t = tokenizeGlobals(n?.globals);
	return replaceComponentValues(e, (e) => {
		if (!isFunctionNode(e)) return;
		const r = J.get(e.getName().toLowerCase());
		if (!r) return;
		const a = patchCalcResult(solve(r(e, t, n ?? {}), n ?? {}), n);
		return -1 !== a ? a : void 0;
	});
}
function replaceComponentValues(n, r) {
	for (let a = 0; a < n.length; a++) {
		const i = n[a];
		walk(i, (n, a) => {
			if ("number" != typeof a) return;
			const i = r(n.node);
			if (!i) return;
			const o = [i], l = n.parent.value[a - 1];
			isTokenNode(l) && isTokenDelim(l.value) && ("-" === l.value[4].value || "+" === l.value[4].value) && o.splice(0, 0, new WhitespaceNode([[
				c$1.Whitespace,
				" ",
				...sourceIndices(n.node),
				void 0
			]]));
			const s = n.parent.value[a + 1];
			!s || isWhiteSpaceOrCommentNode(s) || isTokenNode(s) && (isTokenComma(s.value) || isTokenColon(s.value) || isTokenSemicolon(s.value) || isTokenDelim(s.value) && "-" !== s.value[4].value && "+" !== s.value[4].value) || o.push(new WhitespaceNode([[
				c$1.Whitespace,
				" ",
				...sourceIndices(n.node),
				void 0
			]])), n.parent.value.splice(a, 1, ...o);
		});
	}
	return n;
}
var ParseError, ParseErrorWithComponentValues, y, M, x, T, P, k, W, O, U, L, $, V, Z$1, z, q, G, R, j, Y$1, _$1, H, J, K, Q;
var init_dist$2 = __esmMin((() => {
	init_dist$3();
	init_dist$4();
	ParseError = class extends Error {
		sourceStart;
		sourceEnd;
		constructor(e, n, t) {
			super(e), this.name = "ParseError", this.sourceStart = n, this.sourceEnd = t;
		}
	};
	ParseErrorWithComponentValues = class extends ParseError {
		componentValues;
		constructor(n, t) {
			super(n, ...sourceIndices(t)), this.componentValues = t;
		}
	};
	y = {
		UnexpectedAdditionOfDimensionOrPercentageWithNumber: "Unexpected addition of a dimension or percentage with a number.",
		UnexpectedSubtractionOfDimensionOrPercentageWithNumber: "Unexpected subtraction of a dimension or percentage with a number."
	}, M = /[A-Z]/g;
	x = {
		cm: "px",
		in: "px",
		mm: "px",
		pc: "px",
		pt: "px",
		px: "px",
		q: "px",
		deg: "deg",
		grad: "deg",
		rad: "deg",
		turn: "deg",
		ms: "s",
		s: "s",
		hz: "hz",
		khz: "hz"
	}, T = new Map([
		["cm", (e) => e],
		["mm", (e) => 10 * e],
		["q", (e) => 40 * e],
		["in", (e) => e / 2.54],
		["pc", (e) => e / 2.54 * 6],
		["pt", (e) => e / 2.54 * 72],
		["px", (e) => e / 2.54 * 96]
	]), P = new Map([
		["deg", (e) => e],
		["grad", (e) => e / .9],
		["rad", (e) => e / 180 * Math.PI],
		["turn", (e) => e / 360]
	]), k = new Map([
		["deg", (e) => .9 * e],
		["grad", (e) => e],
		["rad", (e) => .9 * e / 180 * Math.PI],
		["turn", (e) => .9 * e / 360]
	]), W = new Map([["hz", (e) => e], ["khz", (e) => e / 1e3]]), O = new Map([
		["cm", (e) => 2.54 * e],
		["mm", (e) => 25.4 * e],
		["q", (e) => 25.4 * e * 4],
		["in", (e) => e],
		["pc", (e) => 6 * e],
		["pt", (e) => 72 * e],
		["px", (e) => 96 * e]
	]), U = new Map([["hz", (e) => 1e3 * e], ["khz", (e) => e]]), L = new Map([
		["cm", (e) => e / 10],
		["mm", (e) => e],
		["q", (e) => 4 * e],
		["in", (e) => e / 25.4],
		["pc", (e) => e / 25.4 * 6],
		["pt", (e) => e / 25.4 * 72],
		["px", (e) => e / 25.4 * 96]
	]), $ = new Map([["ms", (e) => e], ["s", (e) => e / 1e3]]), V = new Map([
		["cm", (e) => e / 6 * 2.54],
		["mm", (e) => e / 6 * 25.4],
		["q", (e) => e / 6 * 25.4 * 4],
		["in", (e) => e / 6],
		["pc", (e) => e],
		["pt", (e) => e / 6 * 72],
		["px", (e) => e / 6 * 96]
	]), Z$1 = new Map([
		["cm", (e) => e / 72 * 2.54],
		["mm", (e) => e / 72 * 25.4],
		["q", (e) => e / 72 * 25.4 * 4],
		["in", (e) => e / 72],
		["pc", (e) => e / 72 * 6],
		["pt", (e) => e],
		["px", (e) => e / 72 * 96]
	]), z = new Map([
		["cm", (e) => e / 96 * 2.54],
		["mm", (e) => e / 96 * 25.4],
		["q", (e) => e / 96 * 25.4 * 4],
		["in", (e) => e / 96],
		["pc", (e) => e / 96 * 6],
		["pt", (e) => e / 96 * 72],
		["px", (e) => e]
	]), q = new Map([
		["cm", (e) => e / 4 / 10],
		["mm", (e) => e / 4],
		["q", (e) => e],
		["in", (e) => e / 4 / 25.4],
		["pc", (e) => e / 4 / 25.4 * 6],
		["pt", (e) => e / 4 / 25.4 * 72],
		["px", (e) => e / 4 / 25.4 * 96]
	]), G = new Map([
		["deg", (e) => 180 * e / Math.PI],
		["grad", (e) => 180 * e / Math.PI / .9],
		["rad", (e) => e],
		["turn", (e) => 180 * e / Math.PI / 360]
	]), R = new Map([["ms", (e) => 1e3 * e], ["s", (e) => e]]), j = new Map([
		["deg", (e) => 360 * e],
		["grad", (e) => 360 * e / .9],
		["rad", (e) => 360 * e / 180 * Math.PI],
		["turn", (e) => e]
	]), Y$1 = new Map([
		["cm", T],
		["mm", L],
		["q", q],
		["in", O],
		["pc", V],
		["pt", Z$1],
		["px", z],
		["ms", $],
		["s", R],
		["deg", P],
		["grad", k],
		["rad", G],
		["turn", j],
		["hz", W],
		["khz", U]
	]);
	_$1 = /^none$/i;
	H = String.fromCodePoint(0);
	J = new Map([
		["abs", function abs(e, n, t) {
			return singleNodeSolver(e, n, t, solveAbs);
		}],
		["acos", function acos(e, n, t) {
			return singleNodeSolver(e, n, t, solveACos);
		}],
		["asin", function asin(e, n, t) {
			return singleNodeSolver(e, n, t, solveASin);
		}],
		["atan", function atan(e, n, t) {
			return singleNodeSolver(e, n, t, solveATan);
		}],
		["atan2", function atan2(e, n, t) {
			return twoCommaSeparatedNodesSolver(e, n, t, solveATan2);
		}],
		["calc", calc$1],
		["clamp", function clamp(r, a, i) {
			const o = resolveGlobalsAndConstants([...r.value.filter((e) => !isWhiteSpaceOrCommentNode(e))], a), c = [], s = [], v = [];
			{
				let e = c;
				for (let n = 0; n < o.length; n++) {
					const r = o[n];
					if (isTokenNode(r) && isTokenComma(r.value)) {
						if (e === v) return -1;
						if (e === s) {
							e = v;
							continue;
						}
						if (e === c) {
							e = s;
							continue;
						}
						return -1;
					}
					e.push(r);
				}
			}
			const f = isNone(c), p = isNone(v);
			if (f && p) return calc$1(calcWrapper(r, s), a, i);
			const d = solve(calc$1(calcWrapper(r, s), a, i), i);
			if (-1 === d) return -1;
			if (f) {
				const t = solve(calc$1(calcWrapper(r, v), a, i), i);
				return -1 === t ? -1 : solveMin((C = r, g = d, D = t, new FunctionNode([
					c$1.Function,
					"min(",
					C.name[2],
					C.name[3],
					{ value: "min" }
				], [
					c$1.CloseParen,
					")",
					C.endToken[2],
					C.endToken[3],
					void 0
				], [
					g,
					new TokenNode([
						c$1.Comma,
						",",
						...sourceIndices(g),
						void 0
					]),
					D
				])), [d, t], i);
			}
			if (p) {
				const e = solve(calc$1(calcWrapper(r, c), a, i), i);
				return -1 === e ? -1 : solveMax(maxWrapper(r, e, d), [e, d], i);
			}
			var C, g, D;
			const h = solve(calc$1(calcWrapper(r, c), a, i), i);
			if (-1 === h) return -1;
			const N = solve(calc$1(calcWrapper(r, v), a, i), i);
			if (-1 === N) return -1;
			return solveClamp(r, h, d, N, i);
		}],
		["cos", function cos(e, n, t) {
			return singleNodeSolver(e, n, t, solveCos);
		}],
		["exp", function exp(e, n, t) {
			return singleNodeSolver(e, n, t, solveExp);
		}],
		["hypot", function hypot(e, n, t) {
			return variadicNodesSolver(e, n, t, solveHypot);
		}],
		["log", function log(e, n, t) {
			return variadicNodesSolver(e, n, t, solveLog);
		}],
		["max", function max(e, n, t) {
			return variadicNodesSolver(e, n, t, solveMax);
		}],
		["min", function min(e, n, t) {
			return variadicNodesSolver(e, n, t, solveMin);
		}],
		["mod", function mod(e, n, t) {
			return twoCommaSeparatedNodesSolver(e, n, t, solveMod);
		}],
		["pow", function pow(e, n, t) {
			return twoCommaSeparatedNodesSolver(e, n, t, solvePow);
		}],
		["random", function random(e, n, t) {
			const r = parseRandomValueSharing(e, e.value.filter((e) => !isWhiteSpaceOrCommentNode(e)), n, t);
			if (-1 === r) return -1;
			const [a, i] = r, o = variadicArguments(e, i, n, t);
			if (-1 === o) return -1;
			const [l, c, s] = o;
			if (!l || !c) return -1;
			return solveRandom(e, a, l, c, s, t);
		}],
		["rem", function rem(e, n, t) {
			return twoCommaSeparatedNodesSolver(e, n, t, solveRem);
		}],
		["round", function round(e, r, a) {
			const i = resolveGlobalsAndConstants([...e.value.filter((e) => !isWhiteSpaceOrCommentNode(e))], r);
			let o = "", l = !1;
			const c = [], s = [];
			{
				let e = c;
				for (let n = 0; n < i.length; n++) {
					const r = i[n];
					if (!o && 0 === c.length && 0 === s.length && isTokenNode(r) && isTokenIdent(r.value)) {
						const e = r.value[4].value.toLowerCase();
						if (K.has(e)) {
							o = e;
							continue;
						}
					}
					if (isTokenNode(r) && isTokenComma(r.value)) {
						if (e === s) return -1;
						if (e === c && o && 0 === c.length) continue;
						if (e === c) {
							l = !0, e = s;
							continue;
						}
						return -1;
					}
					e.push(r);
				}
			}
			const v = solve(calc$1(calcWrapper(e, c), r, a), a);
			if (-1 === v) return -1;
			if ("line-width" === o) {
				const e = convertUnit([
					c$1.Dimension,
					"1px",
					v.value[2],
					v.value[3],
					{
						value: 1,
						type: a$1.Integer,
						unit: "px"
					}
				], v.value);
				if (!isTokenDimension(e) || "px" !== e[4].unit) return -1;
			}
			if (!l && 0 === s.length) {
				if ("line-width" === o) return v.value[4].value <= 0 ? -1 : snapAsBorderWidth(e, v.value, a);
				s.push(new TokenNode([
					c$1.Number,
					"1",
					v.value[2],
					v.value[3],
					{
						value: 1,
						type: a$1.Integer
					}
				]));
			}
			const d = solve(calc$1(calcWrapper(e, s), r, a), a);
			if (-1 === d) return -1;
			o || (o = "nearest");
			return solveRound(e, o, v, d, a);
		}],
		["sign", function sign(e, n, t) {
			return singleNodeSolver(e, n, t, solveSign);
		}],
		["sin", function sin(e, n, t) {
			return singleNodeSolver(e, n, t, solveSin);
		}],
		["sqrt", function sqrt(e, n, t) {
			return singleNodeSolver(e, n, t, solveSqrt);
		}],
		["tan", function tan(e, n, t) {
			return singleNodeSolver(e, n, t, solveTan);
		}]
	]);
	K = new Set([
		"nearest",
		"line-width",
		"up",
		"down",
		"to-zero"
	]);
	Q = new Set(J.keys());
}));
//#endregion
//#region node_modules/@asamuzakjp/css-color/dist/esm/js/css-calc.js
var PAREN_CLOSE$1, COMMENT$1, DIM$1, EOF$1, FUNC$1, PAREN_OPEN$1, W_SPACE$1, NAMESPACE$4, TRIA, HEX$1, MAX_PCT$1, REG_FN_CALC$2, REG_FN_CALC_NUM, REG_FN_MATH_START$1, REG_FN_VAR$3, REG_FN_VAR_START, REG_OPERATOR, REG_PAREN_OPEN, REG_TYPE_DIM, REG_TYPE_DIM_PCT, REG_TYPE_PCT, Calculator, sortCalcValues, resolveNode, serializeCalc, resolveDimension, parseTokens, cssCalc;
var init_css_calc = __esmMin((() => {
	init_cache();
	init_common();
	init_constant();
	init_util();
	init_css_var();
	init_dist$2();
	init_dist$4();
	({CloseParen: PAREN_CLOSE$1, Comment: COMMENT$1, Dimension: DIM$1, EOF: EOF$1, Function: FUNC$1, OpenParen: PAREN_OPEN$1, Whitespace: W_SPACE$1} = c$1);
	NAMESPACE$4 = "css-calc";
	TRIA = 3;
	HEX$1 = 16;
	MAX_PCT$1 = 100;
	REG_FN_CALC$2 = new RegExp(SYN_FN_CALC);
	REG_FN_CALC_NUM = new RegExp(`^calc\\((${NUM$1})\\)$`);
	REG_FN_MATH_START$1 = new RegExp(SYN_FN_MATH_START);
	REG_FN_VAR$3 = new RegExp(SYN_FN_VAR);
	REG_FN_VAR_START = new RegExp(SYN_FN_VAR_START);
	REG_OPERATOR = /\s[*+/-]\s/;
	REG_PAREN_OPEN = /\($/;
	REG_TYPE_DIM = new RegExp(`^(${NUM$1})(${ANGLE}|${LENGTH})$`);
	REG_TYPE_DIM_PCT = new RegExp(`^(${NUM$1})(${ANGLE}|${LENGTH}|%)$`);
	REG_TYPE_PCT = new RegExp(`^(${NUM$1})%$`);
	Calculator = class {
		#hasNum;
		#numSum;
		#numMul;
		#hasPct;
		#pctSum;
		#pctMul;
		#hasDim;
		#dimSum;
		#dimSub;
		#dimMul;
		#dimDiv;
		#hasEtc;
		#etcSum;
		#etcSub;
		#etcMul;
		#etcDiv;
		#calcOpts;
		/**
		* constructor
		*/
		constructor() {
			this.#hasNum = false;
			this.#numSum = [];
			this.#numMul = [];
			this.#hasPct = false;
			this.#pctSum = [];
			this.#pctMul = [];
			this.#hasDim = false;
			this.#dimSum = [];
			this.#dimSub = [];
			this.#dimMul = [];
			this.#dimDiv = [];
			this.#hasEtc = false;
			this.#etcSum = [];
			this.#etcSub = [];
			this.#etcMul = [];
			this.#etcDiv = [];
			this.#calcOpts = { toCanonicalUnits: true };
		}
		get hasNum() {
			return this.#hasNum;
		}
		set hasNum(value) {
			this.#hasNum = !!value;
		}
		get numSum() {
			return this.#numSum;
		}
		get numMul() {
			return this.#numMul;
		}
		get hasPct() {
			return this.#hasPct;
		}
		set hasPct(value) {
			this.#hasPct = !!value;
		}
		get pctSum() {
			return this.#pctSum;
		}
		get pctMul() {
			return this.#pctMul;
		}
		get hasDim() {
			return this.#hasDim;
		}
		set hasDim(value) {
			this.#hasDim = !!value;
		}
		get dimSum() {
			return this.#dimSum;
		}
		get dimSub() {
			return this.#dimSub;
		}
		get dimMul() {
			return this.#dimMul;
		}
		get dimDiv() {
			return this.#dimDiv;
		}
		get hasEtc() {
			return this.#hasEtc;
		}
		set hasEtc(value) {
			this.#hasEtc = !!value;
		}
		get etcSum() {
			return this.#etcSum;
		}
		get etcSub() {
			return this.#etcSub;
		}
		get etcMul() {
			return this.#etcMul;
		}
		get etcDiv() {
			return this.#etcDiv;
		}
		/**
		* clear values
		* @returns void
		*/
		clear() {
			this.#hasNum = false;
			this.#numSum.length = 0;
			this.#numMul.length = 0;
			this.#hasPct = false;
			this.#pctSum.length = 0;
			this.#pctMul.length = 0;
			this.#hasDim = false;
			this.#dimSum.length = 0;
			this.#dimSub.length = 0;
			this.#dimMul.length = 0;
			this.#dimDiv.length = 0;
			this.#hasEtc = false;
			this.#etcSum.length = 0;
			this.#etcSub.length = 0;
			this.#etcMul.length = 0;
			this.#etcDiv.length = 0;
		}
		/**
		* sort values
		* @param values - values
		* @returns sorted values
		*/
		sort(values = []) {
			const arr = [...values];
			if (arr.length > 1) arr.sort((a, b) => {
				let res;
				if (REG_TYPE_DIM_PCT.test(a) && REG_TYPE_DIM_PCT.test(b)) {
					const [, valA, unitA] = a.match(REG_TYPE_DIM_PCT);
					const [, valB, unitB] = b.match(REG_TYPE_DIM_PCT);
					if (unitA === unitB) if (Number(valA) === Number(valB)) res = 0;
					else if (Number(valA) > Number(valB)) res = 1;
					else res = -1;
					else if (unitA > unitB) res = 1;
					else res = -1;
				} else if (a === b) res = 0;
				else if (a > b) res = 1;
				else res = -1;
				return res;
			});
			return arr;
		}
		/**
		* multiply values
		* @returns resolved value
		*/
		multiply() {
			const value = [];
			let num;
			if (this.#hasNum) {
				num = 1;
				for (const i of this.#numMul) {
					num *= i;
					if (num === 0 || !Number.isFinite(num) || Number.isNaN(num)) break;
				}
				if (!this.#hasPct && !this.#hasDim && !this.hasEtc) {
					if (Number.isFinite(num)) num = roundToPrecision(num, HEX$1);
					value.push(num);
				}
			}
			if (this.#hasPct) {
				if (typeof num !== "number") num = 1;
				for (const i of this.#pctMul) {
					num *= i;
					if (num === 0 || !Number.isFinite(num) || Number.isNaN(num)) break;
				}
				if (Number.isFinite(num)) num = `${roundToPrecision(num, HEX$1)}%`;
				if (!this.#hasDim && !this.hasEtc) value.push(num);
			}
			if (this.#hasDim) {
				let dim = "";
				let mul = "";
				let div = "";
				if (this.#dimMul.length) if (this.#dimMul.length === 1) [mul] = this.#dimMul;
				else mul = `${this.sort(this.#dimMul).join(" * ")}`;
				if (this.#dimDiv.length) if (this.#dimDiv.length === 1) [div] = this.#dimDiv;
				else div = `${this.sort(this.#dimDiv).join(" * ")}`;
				if (Number.isFinite(num)) {
					if (mul) if (div) if (div.includes("*")) dim = calc(`calc(${num} * ${mul} / (${div}))`, this.#calcOpts);
					else dim = calc(`calc(${num} * ${mul} / ${div})`, this.#calcOpts);
					else dim = calc(`calc(${num} * ${mul})`, this.#calcOpts);
					else if (div.includes("*")) dim = calc(`calc(${num} / (${div}))`, this.#calcOpts);
					else dim = calc(`calc(${num} / ${div})`, this.#calcOpts);
					value.push(dim.replace(/^calc/, ""));
				} else {
					if (!value.length && num !== void 0) value.push(num);
					if (mul) {
						if (div) if (div.includes("*")) dim = calc(`calc(${mul} / (${div}))`, this.#calcOpts);
						else dim = calc(`calc(${mul} / ${div})`, this.#calcOpts);
						else dim = calc(`calc(${mul})`, this.#calcOpts);
						if (value.length) value.push("*", dim.replace(/^calc/, ""));
						else value.push(dim.replace(/^calc/, ""));
					} else {
						dim = calc(`calc(${div})`, this.#calcOpts);
						if (value.length) value.push("/", dim.replace(/^calc/, ""));
						else value.push("1", "/", dim.replace(/^calc/, ""));
					}
				}
			}
			if (this.#hasEtc) {
				if (this.#etcMul.length) {
					if (!value.length && num !== void 0) value.push(num);
					const mul = this.sort(this.#etcMul).join(" * ");
					if (value.length) value.push(`* ${mul}`);
					else value.push(`${mul}`);
				}
				if (this.#etcDiv.length) {
					const div = this.sort(this.#etcDiv).join(" * ");
					if (div.includes("*")) if (value.length) value.push(`/ (${div})`);
					else value.push(`1 / (${div})`);
					else if (value.length) value.push(`/ ${div}`);
					else value.push(`1 / ${div}`);
				}
			}
			if (value.length) return value.join(" ");
			return "";
		}
		/**
		* sum values
		* @returns resolved value
		*/
		sum() {
			const value = [];
			if (this.#hasNum) {
				let num = 0;
				for (const i of this.#numSum) {
					num += i;
					if (!Number.isFinite(num) || Number.isNaN(num)) break;
				}
				value.push(num);
			}
			if (this.#hasPct) {
				let num = 0;
				for (const i of this.#pctSum) {
					num += i;
					if (!Number.isFinite(num)) break;
				}
				if (Number.isFinite(num)) num = `${num}%`;
				if (value.length) value.push(`+ ${num}`);
				else value.push(num);
			}
			if (this.#hasDim) {
				let dim, sum, sub;
				if (this.#dimSum.length) sum = this.sort(this.#dimSum).join(" + ");
				if (this.#dimSub.length) sub = this.sort(this.#dimSub).join(" + ");
				if (sum) if (sub) if (sub.includes("-")) dim = calc(`calc(${sum} - (${sub}))`, this.#calcOpts);
				else dim = calc(`calc(${sum} - ${sub})`, this.#calcOpts);
				else dim = calc(`calc(${sum})`, this.#calcOpts);
				else dim = calc(`calc(-1 * (${sub}))`, this.#calcOpts);
				if (value.length) value.push("+", dim.replace(/^calc/, ""));
				else value.push(dim.replace(/^calc/, ""));
			}
			if (this.#hasEtc) {
				if (this.#etcSum.length) {
					const sum = this.sort(this.#etcSum).map((item) => {
						let res;
						if (REG_OPERATOR.test(item) && !item.startsWith("(") && !item.endsWith(")")) res = `(${item})`;
						else res = item;
						return res;
					}).join(" + ");
					if (value.length) if (this.#etcSum.length > 1) value.push(`+ (${sum})`);
					else value.push(`+ ${sum}`);
					else value.push(`${sum}`);
				}
				if (this.#etcSub.length) {
					const sub = this.sort(this.#etcSub).map((item) => {
						let res;
						if (REG_OPERATOR.test(item) && !item.startsWith("(") && !item.endsWith(")")) res = `(${item})`;
						else res = item;
						return res;
					}).join(" + ");
					if (value.length) if (this.#etcSub.length > 1) value.push(`- (${sub})`);
					else value.push(`- ${sub}`);
					else if (this.#etcSub.length > 1) value.push(`-1 * (${sub})`);
					else value.push(`-1 * ${sub}`);
				}
			}
			if (value.length) return value.join(" ");
			return "";
		}
	};
	sortCalcValues = (values = [], finalize = false) => {
		if (values.length < TRIA) throw new Error(`Unexpected array length ${values.length}.`);
		const start = values.shift();
		if (!isString(start) || !start.endsWith("(")) throw new Error(`Unexpected token ${start}.`);
		const end = values.pop();
		if (end !== ")") throw new Error(`Unexpected token ${end}.`);
		if (values.length === 1) {
			const [value] = values;
			if (!isStringOrNumber(value)) throw new Error(`Unexpected token ${value}.`);
			return `${start}${value}${end}`;
		}
		const sortedValues = [];
		const cal = new Calculator();
		let operator = "";
		const l = values.length;
		let hasAddSub = false;
		for (let i = 0; i < l; i++) {
			const value = values[i];
			if (!isStringOrNumber(value)) throw new Error(`Unexpected token ${value}.`);
			if (value === "*" || value === "/") operator = value;
			else if (value === "+" || value === "-") {
				const sortedValue = cal.multiply();
				if (sortedValue) sortedValues.push(sortedValue, value);
				hasAddSub = true;
				cal.clear();
				operator = "";
			} else {
				const numValue = Number(value);
				const strValue = `${value}`;
				switch (operator) {
					case "/":
						if (Number.isFinite(numValue)) {
							cal.hasNum = true;
							cal.numMul.push(1 / numValue);
						} else if (REG_TYPE_PCT.test(strValue)) {
							const [, val] = strValue.match(REG_TYPE_PCT);
							cal.hasPct = true;
							cal.pctMul.push(MAX_PCT$1 * MAX_PCT$1 / Number(val));
						} else if (REG_TYPE_DIM.test(strValue)) {
							cal.hasDim = true;
							cal.dimDiv.push(strValue);
						} else {
							cal.hasEtc = true;
							cal.etcDiv.push(strValue);
						}
						break;
					default: if (Number.isFinite(numValue)) {
						cal.hasNum = true;
						cal.numMul.push(numValue);
					} else if (REG_TYPE_PCT.test(strValue)) {
						const [, val] = strValue.match(REG_TYPE_PCT);
						cal.hasPct = true;
						cal.pctMul.push(Number(val));
					} else if (REG_TYPE_DIM.test(strValue)) {
						cal.hasDim = true;
						cal.dimMul.push(strValue);
					} else {
						cal.hasEtc = true;
						cal.etcMul.push(strValue);
					}
				}
			}
			if (i === l - 1) {
				const sortedValue = cal.multiply();
				if (sortedValue) sortedValues.push(sortedValue);
				cal.clear();
				operator = "";
			}
		}
		let resolvedValue = "";
		if (finalize && hasAddSub) {
			const finalizedValues = [];
			cal.clear();
			operator = "";
			const l = sortedValues.length;
			for (let i = 0; i < l; i++) {
				const value = sortedValues[i];
				if (isStringOrNumber(value)) if (value === "+" || value === "-") operator = value;
				else {
					const numValue = Number(value);
					const strValue = `${value}`;
					switch (operator) {
						case "-":
							if (Number.isFinite(numValue)) {
								cal.hasNum = true;
								cal.numSum.push(-1 * numValue);
							} else if (REG_TYPE_PCT.test(strValue)) {
								const [, val] = strValue.match(REG_TYPE_PCT);
								cal.hasPct = true;
								cal.pctSum.push(-1 * Number(val));
							} else if (REG_TYPE_DIM.test(strValue)) {
								cal.hasDim = true;
								cal.dimSub.push(strValue);
							} else {
								cal.hasEtc = true;
								cal.etcSub.push(strValue);
							}
							break;
						default: if (Number.isFinite(numValue)) {
							cal.hasNum = true;
							cal.numSum.push(numValue);
						} else if (REG_TYPE_PCT.test(strValue)) {
							const [, val] = strValue.match(REG_TYPE_PCT);
							cal.hasPct = true;
							cal.pctSum.push(Number(val));
						} else if (REG_TYPE_DIM.test(strValue)) {
							cal.hasDim = true;
							cal.dimSum.push(strValue);
						} else {
							cal.hasEtc = true;
							cal.etcSum.push(strValue);
						}
					}
				}
				if (i === l - 1) {
					const sortedValue = cal.sum();
					if (sortedValue) finalizedValues.push(sortedValue);
					cal.clear();
					operator = "";
				}
			}
			resolvedValue = finalizedValues.join(" ").replace(/\+\s-/g, "- ");
		} else resolvedValue = sortedValues.join(" ").replace(/\+\s-/g, "- ");
		if (resolvedValue.startsWith("(") && resolvedValue.endsWith(")") && resolvedValue.lastIndexOf("(") === 0 && resolvedValue.indexOf(")") === resolvedValue.length - 1) resolvedValue = resolvedValue.substring(1, resolvedValue.length - 1);
		return `${start}${resolvedValue}${end}`;
	};
	resolveNode = (node, isRoot) => {
		const flatItems = [];
		for (const item of node) if (Array.isArray(item)) flatItems.push(resolveNode(item, false));
		else flatItems.push(item);
		if (isRoot) {
			if (flatItems.length >= TRIA) return sortCalcValues(flatItems, true);
			const joined = flatItems.join("");
			return joined.startsWith("calc(") ? joined : `calc(${joined})`;
		}
		if (flatItems.length >= TRIA) {
			let serialized = sortCalcValues(flatItems, false);
			if (REG_FN_VAR_START.test(serialized)) serialized = calc(serialized, { toCanonicalUnits: true });
			return serialized;
		}
		return flatItems.join("");
	};
	serializeCalc = (value, opt = {}) => {
		const { format = "" } = opt;
		if (isString(value)) {
			if (!REG_FN_VAR_START.test(value) || format !== "specifiedValue") return value;
			value = value.toLowerCase().trim();
		} else throw new TypeError(`${value} is not a string.`);
		const cacheKey = createCacheKey({
			namespace: NAMESPACE$4,
			name: "serializeCalc",
			value
		}, opt);
		const cachedResult = getCache(cacheKey);
		if (cachedResult instanceof CacheItem) return cachedResult.item;
		const items = tokenize({ css: value }).map((token) => {
			const [type, val] = token;
			let res = "";
			if (type !== W_SPACE$1 && type !== COMMENT$1) res = val;
			return res;
		}).filter((v) => v);
		const stack = [[]];
		for (const item of items) if (REG_PAREN_OPEN.test(item)) {
			const newNode = [item];
			const parent = stack[stack.length - 1];
			if (parent) parent.push(newNode);
			stack.push(newNode);
		} else if (item === ")") if (stack.length > 1) {
			const currentLevel = stack.pop();
			if (currentLevel) currentLevel.push(item);
		} else {
			const root = stack[0];
			if (root) root.push(item);
		}
		else {
			const parent = stack[stack.length - 1];
			if (parent) parent.push(item);
		}
		let serializedCalc = "";
		const rootItems = stack[0];
		if (rootItems) if (rootItems.length === 1 && Array.isArray(rootItems[0])) serializedCalc = resolveNode(rootItems[0], true);
		else {
			const flatItems = [];
			for (const item of rootItems) if (Array.isArray(item)) flatItems.push(resolveNode(item, false));
			else flatItems.push(item);
			if (flatItems.length >= TRIA) serializedCalc = sortCalcValues(flatItems, true);
			else {
				const firstItem = flatItems[0] || "";
				serializedCalc = isString(firstItem) && firstItem.startsWith("calc(") ? firstItem : `calc(${firstItem})`;
			}
		}
		setCache(cacheKey, serializedCalc);
		return serializedCalc;
	};
	resolveDimension = (token, opt = {}) => {
		if (!Array.isArray(token)) throw new TypeError(`${token} is not an array.`);
		const [, , , , detail = {}] = token;
		const { unit, value } = detail;
		if (unit === "px") return `${value}${unit}`;
		const pixelValue = resolveLengthInPixels(Number(value), unit, opt);
		if (Number.isFinite(pixelValue)) return `${roundToPrecision(pixelValue, HEX$1)}px`;
		return new NullObject();
	};
	parseTokens = (tokens, opt = {}) => {
		if (!Array.isArray(tokens)) throw new TypeError(`${tokens} is not an array.`);
		const { format = "" } = opt;
		const mathFunc = /* @__PURE__ */ new Set();
		let nest = 0;
		const res = [];
		for (const token of tokens) {
			if (!Array.isArray(token)) throw new TypeError(`${token} is not an array.`);
			const [type = "", value = ""] = token;
			switch (type) {
				case DIM$1:
					if (format === "specifiedValue" && !mathFunc.has(nest)) res.push(value);
					else {
						const resolvedValue = resolveDimension(token, opt);
						if (isString(resolvedValue)) res.push(resolvedValue);
						else res.push(value);
					}
					break;
				case FUNC$1:
				case PAREN_OPEN$1:
					res.push(value);
					nest++;
					if (REG_FN_MATH_START$1.test(value)) mathFunc.add(nest);
					break;
				case PAREN_CLOSE$1:
					if (res.length) if (res[res.length - 1] === " ") res.splice(-1, 1, value);
					else res.push(value);
					else res.push(value);
					if (mathFunc.has(nest)) mathFunc.delete(nest);
					nest--;
					break;
				case W_SPACE$1:
					if (res.length) {
						const lastValue = res[res.length - 1];
						if (isString(lastValue) && !lastValue.endsWith("(") && lastValue !== " ") res.push(value);
					}
					break;
				default: if (type !== COMMENT$1 && type !== EOF$1) res.push(value);
			}
		}
		return res;
	};
	cssCalc = (value, opt = {}) => {
		const { format = "" } = opt;
		if (isString(value)) {
			if (REG_FN_VAR$3.test(value)) if (format === "specifiedValue") return value;
			else {
				const resolvedValue = resolveVar(value, opt);
				if (isString(resolvedValue)) return resolvedValue;
				else return "";
			}
			else if (!REG_FN_CALC$2.test(value)) return value;
			value = value.toLowerCase().trim();
		} else throw new TypeError(`${value} is not a string.`);
		const cacheKey = createCacheKey({
			namespace: NAMESPACE$4,
			name: "cssCalc",
			value
		}, opt);
		const cachedResult = getCache(cacheKey);
		if (cachedResult instanceof CacheItem) return cachedResult.item;
		let resolvedValue = calc(parseTokens(tokenize({ css: value }), opt).join(""), { toCanonicalUnits: true });
		if (REG_FN_VAR_START.test(value)) {
			if (REG_TYPE_DIM_PCT.test(resolvedValue)) {
				const [, val, unit] = resolvedValue.match(REG_TYPE_DIM_PCT);
				resolvedValue = `${roundToPrecision(Number(val), HEX$1)}${unit}`;
			}
			if (resolvedValue && !REG_FN_VAR_START.test(resolvedValue) && format === "specifiedValue") resolvedValue = `calc(${resolvedValue})`;
		}
		if (format === "specifiedValue") {
			if (/\s[-+*/]\s/.test(resolvedValue) && !resolvedValue.includes("NaN")) resolvedValue = serializeCalc(resolvedValue, opt);
			else if (REG_FN_CALC_NUM.test(resolvedValue)) {
				const [, val] = resolvedValue.match(REG_FN_CALC_NUM);
				resolvedValue = `calc(${roundToPrecision(Number(val), HEX$1)})`;
			}
		}
		setCache(cacheKey, resolvedValue);
		return resolvedValue;
	};
}));
//#endregion
//#region node_modules/@csstools/color-helpers/dist/index.mjs
function multiplyMatrices(t, n) {
	return [
		t[0] * n[0] + t[1] * n[1] + t[2] * n[2],
		t[3] * n[0] + t[4] * n[1] + t[5] * n[2],
		t[6] * n[0] + t[7] * n[1] + t[8] * n[2]
	];
}
/**
* Bradford chromatic adaptation from D50 to D65
*
* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
*/ function D50_to_D65(n) {
	return multiplyMatrices(t, n);
}
/**
* Bradford chromatic adaptation from D65 to D50
* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
* @see http://www.brucelindbloom.com/index.html?Eqn_ChromAdapt.html
*/ function D65_to_D50(t) {
	return multiplyMatrices(n, t);
}
/**
* @param {number} hue - Hue as degrees 0..360
* @param {number} sat - Saturation as percentage 0..100
* @param {number} light - Lightness as percentage 0..100
* @return {number[]} Array of sRGB components; in-gamut colors in range [0..1]
*
* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/hslToRgb.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
* @see https://github.com/w3c/csswg-drafts/blob/main/css-color-4/hslToRgb.js
*/ function HSL_to_sRGB(t) {
	let n = t[0] % 360;
	const _ = t[1] / 100, o = t[2] / 100;
	return n < 0 && (n += 360), [
		HSL_to_sRGB_channel(0, n, _, o),
		HSL_to_sRGB_channel(8, n, _, o),
		HSL_to_sRGB_channel(4, n, _, o)
	];
}
function HSL_to_sRGB_channel(t, n, _, o) {
	const e = (t + n / 30) % 12;
	return o - _ * Math.min(o, 1 - o) * Math.max(-1, Math.min(e - 3, 9 - e, 1));
}
/**
* @param {number} hue -  Hue as degrees 0..360
* @param {number} white -  Whiteness as percentage 0..100
* @param {number} black -  Blackness as percentage 0..100
* @return {number[]} Array of RGB components 0..1
*
* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/hwbToRgb.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
* @see https://github.com/w3c/csswg-drafts/blob/main/css-color-4/hwbToRgb.js
*/ function HWB_to_sRGB(t) {
	const n = t[0], _ = t[1] / 100, o = t[2] / 100;
	if (_ + o >= 1) {
		const t = _ / (_ + o);
		return [
			t,
			t,
			t
		];
	}
	const e = HSL_to_sRGB([
		n,
		100,
		50
	]), a = 1 - _ - o;
	return [
		e[0] * a + _,
		e[1] * a + _,
		e[2] * a + _
	];
}
/**
* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
*/ function LCH_to_Lab(t) {
	const n = t[2] * Math.PI / 180;
	return [
		t[0],
		t[1] * Math.cos(n),
		t[1] * Math.sin(n)
	];
}
/**
* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
*/ function Lab_to_LCH(t) {
	const n = Math.sqrt(Math.pow(t[1], 2) + Math.pow(t[2], 2));
	let _ = 180 * Math.atan2(t[2], t[1]) / Math.PI;
	return _ < 0 && (_ += 360), n <= .0015 && (_ = NaN), [
		t[0],
		n,
		_
	];
}
/**
* Convert Lab to D50-adapted XYZ
* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
* @see http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
*/ function Lab_to_XYZ(t) {
	const n = 24389 / 27, o = 216 / 24389, e = (t[0] + 16) / 116, a = t[1] / 500 + e, r = e - t[2] / 200;
	return [
		(Math.pow(a, 3) > o ? Math.pow(a, 3) : (116 * a - 16) / n) * _[0],
		(t[0] > 8 ? Math.pow((t[0] + 16) / 116, 3) : t[0] / n) * _[1],
		(Math.pow(r, 3) > o ? Math.pow(r, 3) : (116 * r - 16) / n) * _[2]
	];
}
/**
* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
* @see https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js
*/ function OKLCH_to_OKLab(t) {
	const n = t[2] * Math.PI / 180;
	return [
		t[0],
		t[1] * Math.cos(n),
		t[1] * Math.sin(n)
	];
}
/**
* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
* @see https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js
*/ function OKLab_to_OKLCH(t) {
	const n = Math.sqrt(t[1] ** 2 + t[2] ** 2);
	let _ = 180 * Math.atan2(t[2], t[1]) / Math.PI;
	return _ < 0 && (_ += 360), n <= 4e-6 && (_ = NaN), [
		t[0],
		n,
		_
	];
}
/**
* Given OKLab, convert to XYZ relative to D65
*
* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
* @see https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js
*/
function OKLab_to_XYZ(t) {
	const n = multiplyMatrices(e, t);
	return multiplyMatrices(o, [
		n[0] ** 3,
		n[1] ** 3,
		n[2] ** 3
	]);
}
/**
* Assuming XYZ is relative to D50, convert to CIE Lab
* from CIE standard, which now defines these as a rational fraction
*
* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
*/ function XYZ_to_Lab(t) {
	const n = compute_f(t[0] / _[0]), o = compute_f(t[1] / _[1]);
	return [
		116 * o - 16,
		500 * (n - o),
		200 * (o - compute_f(t[2] / _[2]))
	];
}
function compute_f(t) {
	return t > a ? Math.cbrt(t) : (r * t + 16) / 116;
}
/**
* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
*
* XYZ <-> LMS matrices recalculated for consistent reference white
* @see https://github.com/w3c/csswg-drafts/issues/6642#issuecomment-943521484
*/
function XYZ_to_OKLab(t) {
	const n = multiplyMatrices(l, t);
	return multiplyMatrices(i, [
		Math.cbrt(n[0]),
		Math.cbrt(n[1]),
		Math.cbrt(n[2])
	]);
}
/**
* Convert XYZ to linear-light P3
*
* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
*/ function XYZ_to_lin_P3(t) {
	return multiplyMatrices(u, t);
}
/**
* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
*/ function XYZ_to_lin_sRGB(t) {
	return multiplyMatrices(m, t);
}
/**
* Convert an array of linear-light rec2020 RGB  in the range 0.0-1.0
* to gamma corrected form ITU-R BT.2020-2 p.4
*
* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
*/ function gam_2020_channel(t) {
	return (t < 0 ? -1 : 1) * Math.pow(Math.abs(t), 1 / 2.4);
}
/**
* Convert an array of linear-light sRGB values in the range 0.0-1.0 to gamma corrected form
* Extended transfer function:
*  For negative values, linear portion extends on reflection
*  of axis, then uses reflected pow below that
*
* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
* @see https://en.wikipedia.org/wiki/SRGB
*/ function gam_sRGB(t) {
	return [
		gam_sRGB_channel(t[0]),
		gam_sRGB_channel(t[1]),
		gam_sRGB_channel(t[2])
	];
}
function gam_sRGB_channel(t) {
	const n = t < 0 ? -1 : 1, _ = Math.abs(t);
	return _ > .0031308 ? n * (1.055 * Math.pow(_, 1 / 2.4) - .055) : 12.92 * t;
}
/**
* Convert an array of linear-light display-p3 RGB in the range 0.0-1.0
* to gamma corrected form
*
* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
*/ function gam_P3(t) {
	return gam_sRGB(t);
}
function gam_ProPhoto_channel(t) {
	const n = t < 0 ? -1 : 1, _ = Math.abs(t);
	return _ >= D ? n * Math.pow(_, 1 / 1.8) : 16 * t;
}
/**
* Convert an array of linear-light a98-rgb in the range 0.0-1.0
* to gamma corrected form. Negative values are also now accepted
*
* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
*/ function gam_a98rgb_channel(t) {
	return (t < 0 ? -1 : 1) * Math.pow(Math.abs(t), 256 / 563);
}
/**
* Convert an array of rec2020 RGB values in the range 0.0 - 1.0
* to linear light (un-companded) form.
* ITU-R BT.2020-2 p.4
*
* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
*/ function lin_2020_channel(t) {
	return (t < 0 ? -1 : 1) * Math.pow(Math.abs(t), 2.4);
}
/**
* Convert an array of linear-light rec2020 values to CIE XYZ
* using  D65 (no chromatic adaptation)
*
* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
* @see http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
*/
/**
* Convert an array of of sRGB values where in-gamut values are in the range
* [0 - 1] to linear light (un-companded) form.
* Extended transfer function:
*  For negative values, linear portion is extended on reflection of axis,
*  then reflected power function is used.
*
* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
* @see https://en.wikipedia.org/wiki/SRGB
*/
function lin_sRGB(t) {
	return [
		lin_sRGB_channel(t[0]),
		lin_sRGB_channel(t[1]),
		lin_sRGB_channel(t[2])
	];
}
function lin_sRGB_channel(t) {
	const n = t < 0 ? -1 : 1, _ = Math.abs(t);
	return _ <= .04045 ? t / 12.92 : n * Math.pow((_ + .055) / 1.055, 2.4);
}
/**
* Convert an array of display-p3 RGB values in the range 0.0 - 1.0
* to linear light (un-companded) form.
*
* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
*/ function lin_P3(t) {
	return lin_sRGB(t);
}
/**
* Convert an array of linear-light display-p3 values to CIE XYZ
* using D65 (no chromatic adaptation)
*
* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
* @see http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
*/ function lin_P3_to_XYZ(t) {
	return multiplyMatrices(g, t);
}
function lin_ProPhoto_channel(t) {
	const n = t < 0 ? -1 : 1, _ = Math.abs(t);
	return _ <= X ? t / 16 : n * Math.pow(_, 1.8);
}
/**
* Convert an array of linear-light prophoto-rgb values to CIE D50 XYZ.
* Matrix cannot be expressed in rational form, but is calculated to 64 bit accuracy.
*
* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
* @see see https://github.com/w3c/csswg-drafts/issues/7675
*/ function lin_a98rgb_channel(t) {
	return (t < 0 ? -1 : 1) * Math.pow(Math.abs(t), 563 / 256);
}
/**
* Convert an array of linear-light sRGB values to CIE XYZ
* using sRGB's own white, D65 (no chromatic adaptation)
*
* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
*/ function lin_sRGB_to_XYZ(t) {
	return multiplyMatrices(f, t);
}
/**
* Convert an array of gamma-corrected sRGB values in the 0.0 to 1.0 range to HSL.
*
* @param {Color} RGB [r, g, b]
* - Red component 0..1
* - Green component 0..1
* - Blue component 0..1
* @return {number[]} Array of HSL values: Hue as degrees 0..360, Saturation and Lightness as percentages 0..100
*
* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/utilities.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
*
* @see https://github.com/w3c/csswg-drafts/blob/main/css-color-4/better-rgbToHsl.js
*/ function sRGB_to_HSL(t) {
	const n = t[0], _ = t[1], o = t[2], e = Math.max(n, _, o), a = Math.min(n, _, o), r = (a + e) / 2, l = e - a;
	let i = NaN, c = 0;
	if (0 !== Math.round(1e5 * l)) {
		const t = Math.round(1e5 * r);
		switch (c = 0 === t || 1e5 === t ? 0 : (e - r) / Math.min(r, 1 - r), e) {
			case n:
				i = (_ - o) / l + (_ < o ? 6 : 0);
				break;
			case _:
				i = (o - n) / l + 2;
				break;
			case o: i = (n - _) / l + 4;
		}
		i *= 60;
	}
	c < 0 && (i += 180, c = Math.abs(c)), i >= 360 && (i -= 360);
	return c <= 1e-5 && (i = NaN), [
		i,
		100 * c,
		100 * r
	];
}
function sRGB_to_Hue(t) {
	const n = t[0], _ = t[1], o = t[2], e = Math.max(n, _, o), a = Math.min(n, _, o);
	let r = NaN;
	const l = e - a;
	if (0 !== l) {
		switch (e) {
			case n:
				r = (_ - o) / l + (_ < o ? 6 : 0);
				break;
			case _:
				r = (o - n) / l + 2;
				break;
			case o: r = (n - _) / l + 4;
		}
		r *= 60;
	}
	return r >= 360 && (r -= 360), r;
}
function sRGB_to_XYZ_D50(t) {
	let n = t;
	return n = lin_sRGB(n), n = lin_sRGB_to_XYZ(n), n = D65_to_D50(n), n;
}
function XYZ_D50_to_sRGB(t) {
	let n = t;
	return n = D50_to_D65(n), n = XYZ_to_lin_sRGB(n), n = gam_sRGB(n), n;
}
function HSL_to_XYZ_D50(t) {
	let n = t;
	return n = HSL_to_sRGB(n), n = lin_sRGB(n), n = lin_sRGB_to_XYZ(n), n = D65_to_D50(n), n;
}
function XYZ_D50_to_HSL(t) {
	let n = t;
	return n = D50_to_D65(n), n = XYZ_to_lin_sRGB(n), n = gam_sRGB(n), n = sRGB_to_HSL(n), n;
}
function HWB_to_XYZ_D50(t) {
	let n = t;
	return n = HWB_to_sRGB(n), n = lin_sRGB(n), n = lin_sRGB_to_XYZ(n), n = D65_to_D50(n), n;
}
function XYZ_D50_to_HWB(t) {
	let n = t;
	n = D50_to_D65(n), n = XYZ_to_lin_sRGB(n);
	const _ = gam_sRGB(n), o = Math.min(_[0], _[1], _[2]), e = 1 - Math.max(_[0], _[1], _[2]);
	let a = sRGB_to_Hue(_);
	return o + e >= .99999 && (a = NaN), [
		a,
		100 * o,
		100 * e
	];
}
function Lab_to_XYZ_D50(t) {
	let n = t;
	return n = Lab_to_XYZ(n), n;
}
function XYZ_D50_to_Lab(t) {
	let n = t;
	return n = XYZ_to_Lab(n), n;
}
function LCH_to_XYZ_D50(t) {
	let n = t;
	return n = LCH_to_Lab(n), n = Lab_to_XYZ(n), n;
}
function XYZ_D50_to_LCH(t) {
	let n = t;
	return n = XYZ_to_Lab(n), n = Lab_to_LCH(n), n;
}
function OKLab_to_XYZ_D50(t) {
	let n = t;
	return n = OKLab_to_XYZ(n), n = D65_to_D50(n), n;
}
function XYZ_D50_to_OKLab(t) {
	let n = t;
	return n = D50_to_D65(n), n = XYZ_to_OKLab(n), n;
}
function OKLCH_to_XYZ_D50(t) {
	let n = t;
	return n = OKLCH_to_OKLab(n), n = OKLab_to_XYZ(n), n = D65_to_D50(n), n;
}
function XYZ_D50_to_OKLCH(t) {
	let n = t;
	return n = D50_to_D65(n), n = XYZ_to_OKLab(n), n = OKLab_to_OKLCH(n), n;
}
function lin_sRGB_to_XYZ_D50(t) {
	let n = t;
	return n = lin_sRGB_to_XYZ(n), n = D65_to_D50(n), n;
}
function XYZ_D50_to_lin_sRGB(t) {
	let n = t;
	return n = D50_to_D65(n), n = XYZ_to_lin_sRGB(n), n;
}
function a98_RGB_to_XYZ_D50(t) {
	let n = t;
	/**
	* Convert an array of a98-rgb values in the range 0.0 - 1.0
	* to linear light (un-companded) form. Negative values are also now accepted
	*
	* @license W3C https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document
	* @copyright This software or document includes material copied from or derived from https://github.com/w3c/csswg-drafts/blob/main/css-color-4/conversions.js. Copyright © 2022 W3C® (MIT, ERCIM, Keio, Beihang).
	*/
	var _;
	return n = [
		lin_a98rgb_channel((_ = n)[0]),
		lin_a98rgb_channel(_[1]),
		lin_a98rgb_channel(_[2])
	], n = multiplyMatrices(Z, n), n = D65_to_D50(n), n;
}
function XYZ_D50_to_a98_RGB(t) {
	let n = t;
	var _;
	return n = D50_to_D65(n), n = multiplyMatrices(h, n), n = [
		gam_a98rgb_channel((_ = n)[0]),
		gam_a98rgb_channel(_[1]),
		gam_a98rgb_channel(_[2])
	], n;
}
function P3_to_XYZ_D50(t) {
	let n = t;
	return n = lin_P3(n), n = lin_P3_to_XYZ(n), n = D65_to_D50(n), n;
}
function XYZ_D50_to_P3(t) {
	let n = t;
	return n = D50_to_D65(n), n = XYZ_to_lin_P3(n), n = gam_P3(n), n;
}
function lin_P3_to_XYZ_D50(t) {
	let n = t;
	return n = lin_P3_to_XYZ(n), n = D65_to_D50(n), n;
}
function XYZ_D50_to_lin_P3(t) {
	let n = t;
	return n = D50_to_D65(n), n = XYZ_to_lin_P3(n), n;
}
function rec_2020_to_XYZ_D50(t) {
	let n = t;
	var _;
	return n = [
		lin_2020_channel((_ = n)[0]),
		lin_2020_channel(_[1]),
		lin_2020_channel(_[2])
	], n = multiplyMatrices(b, n), n = D65_to_D50(n), n;
}
function XYZ_D50_to_rec_2020(t) {
	let n = t;
	var _;
	return n = D50_to_D65(n), n = multiplyMatrices(c, n), n = [
		gam_2020_channel((_ = n)[0]),
		gam_2020_channel(_[1]),
		gam_2020_channel(_[2])
	], n;
}
function ProPhoto_RGB_to_XYZ_D50(t) {
	let n = t;
	var _;
	return n = [
		lin_ProPhoto_channel((_ = n)[0]),
		lin_ProPhoto_channel(_[1]),
		lin_ProPhoto_channel(_[2])
	], n = multiplyMatrices(Y, n), n;
}
function XYZ_D50_to_ProPhoto(t) {
	let n = t;
	var _;
	return n = multiplyMatrices(s, n), n = [
		gam_ProPhoto_channel((_ = n)[0]),
		gam_ProPhoto_channel(_[1]),
		gam_ProPhoto_channel(_[2])
	], n;
}
function XYZ_D65_to_XYZ_D50(t) {
	let n = t;
	return n = D65_to_D50(n), n;
}
function XYZ_D50_to_XYZ_D65(t) {
	let n = t;
	return n = D50_to_D65(n), n;
}
function XYZ_D50_to_XYZ_D50(t) {
	return t;
}
function inGamut(t) {
	return t[0] >= -1e-4 && t[0] <= 1.0001 && t[1] >= -1e-4 && t[1] <= 1.0001 && t[2] >= -1e-4 && t[2] <= 1.0001;
}
function clip(t) {
	return [
		t[0] < 0 ? 0 : t[0] > 1 ? 1 : t[0],
		t[1] < 0 ? 0 : t[1] > 1 ? 1 : t[1],
		t[2] < 0 ? 0 : t[2] > 1 ? 1 : t[2]
	];
}
/**
* @license MIT https://github.com/facelessuser/coloraide/blob/main/LICENSE.md
*/ function mapGamutRayTrace(t, n, _) {
	const o = t[0], e = t[2];
	let a = n(t);
	const r = n([
		o,
		0,
		e
	]);
	for (let t = 0; t < 4; t++) {
		if (t > 0) {
			const t = _(a);
			t[0] = o, t[2] = e, a = n(t);
		}
		const l = rayTraceBox(r, a);
		if (!l) break;
		a = l;
	}
	return clip(a);
}
function rayTraceBox(t, n) {
	let _ = Infinity, o = -Infinity;
	const e = [
		0,
		0,
		0
	];
	for (let a = 0; a < 3; a++) {
		const r = t[a], l = n[a] - r;
		e[a] = l;
		const i = 0, c = 1;
		if (Math.abs(l) > 1e-15) {
			const t = 1 / l, n = (i - r) * t, e = (c - r) * t;
			o = Math.max(Math.min(n, e), o), _ = Math.min(Math.max(n, e), _);
		} else if (r < i || r > c) return !1;
	}
	return !(o > _ || _ < 0) && (o < 0 && (o = _), !!isFinite(o) && [
		t[0] + e[0] * o,
		t[1] + e[1] * o,
		t[2] + e[2] * o
	]);
}
function luminance(t) {
	const [n, _, o] = t.map((t) => t <= .04045 ? t / 12.92 : Math.pow((t + .055) / 1.055, 2.4));
	return .2126 * n + .7152 * _ + .0722 * o;
}
function contrast_ratio_wcag_2_1(t, n) {
	const _ = luminance(t), o = luminance(n);
	return (Math.max(_, o) + .05) / (Math.min(_, o) + .05);
}
var t, n, _, o, e, a, r, l, i, c, u, s, h, m, D, b, g, X, Y, Z, f, d;
var init_dist$1 = __esmMin((() => {
	t = [
		.955473421488075,
		-.02309845494876471,
		.06325924320057072,
		-.0283697093338637,
		1.0099953980813041,
		.021041441191917323,
		.012314014864481998,
		-.020507649298898964,
		1.330365926242124
	];
	n = [
		1.0479297925449969,
		.022946870601609652,
		-.05019226628920524,
		.02962780877005599,
		.9904344267538799,
		-.017073799063418826,
		-.009243040646204504,
		.015055191490298152,
		.7518742814281371
	];
	_ = [
		.3457 / .3585,
		1,
		.2958 / .3585
	];
	o = [
		1.2268798758459243,
		-.5578149944602171,
		.2813910456659647,
		-.0405757452148008,
		1.112286803280317,
		-.0717110580655164,
		-.0763729366746601,
		-.4214933324022432,
		1.5869240198367816
	], e = [
		1,
		.3963377773761749,
		.2158037573099136,
		1,
		-.1055613458156586,
		-.0638541728258133,
		1,
		-.0894841775298119,
		-1.2914855480194092
	];
	a = 216 / 24389, r = 24389 / 27;
	l = [
		.819022437996703,
		.3619062600528904,
		-.1288737815209879,
		.0329836539323885,
		.9292868615863434,
		.0361446663506424,
		.0481771893596242,
		.2642395317527308,
		.6335478284694309
	], i = [
		.210454268309314,
		.7936177747023054,
		-.0040720430116193,
		1.9779985324311684,
		-2.42859224204858,
		.450593709617411,
		.0259040424655478,
		.7827717124575296,
		-.8086757549230774
	];
	c = [
		30757411 / 17917100,
		-6372589 / 17917100,
		-4539589 / 17917100,
		-.666684351832489,
		1.616481236634939,
		467509 / 29648200,
		792561 / 44930125,
		-1921689 / 44930125,
		.942103121235474
	];
	u = [
		446124 / 178915,
		-333277 / 357830,
		-72051 / 178915,
		-14852 / 17905,
		63121 / 35810,
		423 / 17905,
		11844 / 330415,
		-50337 / 660830,
		316169 / 330415
	];
	s = [
		1.3457868816471583,
		-.25557208737979464,
		-.05110186497554526,
		-.5446307051249019,
		1.5082477428451468,
		.02052744743642139,
		0,
		0,
		1.2119675456389452
	];
	h = [
		1829569 / 896150,
		-506331 / 896150,
		-308931 / 896150,
		-851781 / 878810,
		1648619 / 878810,
		36519 / 878810,
		16779 / 1248040,
		-147721 / 1248040,
		1266979 / 1248040
	];
	m = [
		12831 / 3959,
		-329 / 214,
		-1974 / 3959,
		-851781 / 878810,
		1648619 / 878810,
		36519 / 878810,
		705 / 12673,
		-2585 / 12673,
		705 / 667
	];
	D = 1 / 512;
	b = [
		63426534 / 99577255,
		20160776 / 139408157,
		47086771 / 278816314,
		26158966 / 99577255,
		.677998071518871,
		8267143 / 139408157,
		0,
		19567812 / 697040785,
		1.0609850577107909
	];
	g = [
		608311 / 1250200,
		189793 / 714400,
		198249 / 1000160,
		35783 / 156275,
		247089 / 357200,
		198249 / 2500400,
		0,
		32229 / 714400,
		5220557 / 5000800
	];
	X = 16 / 512;
	Y = [
		.7977666449006423,
		.13518129740053308,
		.0313477341283922,
		.2880748288194013,
		.711835234241873,
		8993693872564e-17,
		0,
		0,
		.8251046025104602
	];
	Z = [
		573536 / 994567,
		263643 / 1420810,
		187206 / 994567,
		591459 / 1989134,
		6239551 / 9945670,
		374412 / 4972835,
		53769 / 1989134,
		351524 / 4972835,
		4929758 / 4972835
	];
	f = [
		506752 / 1228815,
		87881 / 245763,
		12673 / 70218,
		87098 / 409605,
		175762 / 245763,
		12673 / 175545,
		7918 / 409605,
		87881 / 737289,
		1001167 / 1053270
	];
	d = {
		aliceblue: [
			240,
			248,
			255
		],
		antiquewhite: [
			250,
			235,
			215
		],
		aqua: [
			0,
			255,
			255
		],
		aquamarine: [
			127,
			255,
			212
		],
		azure: [
			240,
			255,
			255
		],
		beige: [
			245,
			245,
			220
		],
		bisque: [
			255,
			228,
			196
		],
		black: [
			0,
			0,
			0
		],
		blanchedalmond: [
			255,
			235,
			205
		],
		blue: [
			0,
			0,
			255
		],
		blueviolet: [
			138,
			43,
			226
		],
		brown: [
			165,
			42,
			42
		],
		burlywood: [
			222,
			184,
			135
		],
		cadetblue: [
			95,
			158,
			160
		],
		chartreuse: [
			127,
			255,
			0
		],
		chocolate: [
			210,
			105,
			30
		],
		coral: [
			255,
			127,
			80
		],
		cornflowerblue: [
			100,
			149,
			237
		],
		cornsilk: [
			255,
			248,
			220
		],
		crimson: [
			220,
			20,
			60
		],
		cyan: [
			0,
			255,
			255
		],
		darkblue: [
			0,
			0,
			139
		],
		darkcyan: [
			0,
			139,
			139
		],
		darkgoldenrod: [
			184,
			134,
			11
		],
		darkgray: [
			169,
			169,
			169
		],
		darkgreen: [
			0,
			100,
			0
		],
		darkgrey: [
			169,
			169,
			169
		],
		darkkhaki: [
			189,
			183,
			107
		],
		darkmagenta: [
			139,
			0,
			139
		],
		darkolivegreen: [
			85,
			107,
			47
		],
		darkorange: [
			255,
			140,
			0
		],
		darkorchid: [
			153,
			50,
			204
		],
		darkred: [
			139,
			0,
			0
		],
		darksalmon: [
			233,
			150,
			122
		],
		darkseagreen: [
			143,
			188,
			143
		],
		darkslateblue: [
			72,
			61,
			139
		],
		darkslategray: [
			47,
			79,
			79
		],
		darkslategrey: [
			47,
			79,
			79
		],
		darkturquoise: [
			0,
			206,
			209
		],
		darkviolet: [
			148,
			0,
			211
		],
		deeppink: [
			255,
			20,
			147
		],
		deepskyblue: [
			0,
			191,
			255
		],
		dimgray: [
			105,
			105,
			105
		],
		dimgrey: [
			105,
			105,
			105
		],
		dodgerblue: [
			30,
			144,
			255
		],
		firebrick: [
			178,
			34,
			34
		],
		floralwhite: [
			255,
			250,
			240
		],
		forestgreen: [
			34,
			139,
			34
		],
		fuchsia: [
			255,
			0,
			255
		],
		gainsboro: [
			220,
			220,
			220
		],
		ghostwhite: [
			248,
			248,
			255
		],
		gold: [
			255,
			215,
			0
		],
		goldenrod: [
			218,
			165,
			32
		],
		gray: [
			128,
			128,
			128
		],
		green: [
			0,
			128,
			0
		],
		greenyellow: [
			173,
			255,
			47
		],
		grey: [
			128,
			128,
			128
		],
		honeydew: [
			240,
			255,
			240
		],
		hotpink: [
			255,
			105,
			180
		],
		indianred: [
			205,
			92,
			92
		],
		indigo: [
			75,
			0,
			130
		],
		ivory: [
			255,
			255,
			240
		],
		khaki: [
			240,
			230,
			140
		],
		lavender: [
			230,
			230,
			250
		],
		lavenderblush: [
			255,
			240,
			245
		],
		lawngreen: [
			124,
			252,
			0
		],
		lemonchiffon: [
			255,
			250,
			205
		],
		lightblue: [
			173,
			216,
			230
		],
		lightcoral: [
			240,
			128,
			128
		],
		lightcyan: [
			224,
			255,
			255
		],
		lightgoldenrodyellow: [
			250,
			250,
			210
		],
		lightgray: [
			211,
			211,
			211
		],
		lightgreen: [
			144,
			238,
			144
		],
		lightgrey: [
			211,
			211,
			211
		],
		lightpink: [
			255,
			182,
			193
		],
		lightsalmon: [
			255,
			160,
			122
		],
		lightseagreen: [
			32,
			178,
			170
		],
		lightskyblue: [
			135,
			206,
			250
		],
		lightslategray: [
			119,
			136,
			153
		],
		lightslategrey: [
			119,
			136,
			153
		],
		lightsteelblue: [
			176,
			196,
			222
		],
		lightyellow: [
			255,
			255,
			224
		],
		lime: [
			0,
			255,
			0
		],
		limegreen: [
			50,
			205,
			50
		],
		linen: [
			250,
			240,
			230
		],
		magenta: [
			255,
			0,
			255
		],
		maroon: [
			128,
			0,
			0
		],
		mediumaquamarine: [
			102,
			205,
			170
		],
		mediumblue: [
			0,
			0,
			205
		],
		mediumorchid: [
			186,
			85,
			211
		],
		mediumpurple: [
			147,
			112,
			219
		],
		mediumseagreen: [
			60,
			179,
			113
		],
		mediumslateblue: [
			123,
			104,
			238
		],
		mediumspringgreen: [
			0,
			250,
			154
		],
		mediumturquoise: [
			72,
			209,
			204
		],
		mediumvioletred: [
			199,
			21,
			133
		],
		midnightblue: [
			25,
			25,
			112
		],
		mintcream: [
			245,
			255,
			250
		],
		mistyrose: [
			255,
			228,
			225
		],
		moccasin: [
			255,
			228,
			181
		],
		navajowhite: [
			255,
			222,
			173
		],
		navy: [
			0,
			0,
			128
		],
		oldlace: [
			253,
			245,
			230
		],
		olive: [
			128,
			128,
			0
		],
		olivedrab: [
			107,
			142,
			35
		],
		orange: [
			255,
			165,
			0
		],
		orangered: [
			255,
			69,
			0
		],
		orchid: [
			218,
			112,
			214
		],
		palegoldenrod: [
			238,
			232,
			170
		],
		palegreen: [
			152,
			251,
			152
		],
		paleturquoise: [
			175,
			238,
			238
		],
		palevioletred: [
			219,
			112,
			147
		],
		papayawhip: [
			255,
			239,
			213
		],
		peachpuff: [
			255,
			218,
			185
		],
		peru: [
			205,
			133,
			63
		],
		pink: [
			255,
			192,
			203
		],
		plum: [
			221,
			160,
			221
		],
		powderblue: [
			176,
			224,
			230
		],
		purple: [
			128,
			0,
			128
		],
		rebeccapurple: [
			102,
			51,
			153
		],
		red: [
			255,
			0,
			0
		],
		rosybrown: [
			188,
			143,
			143
		],
		royalblue: [
			65,
			105,
			225
		],
		saddlebrown: [
			139,
			69,
			19
		],
		salmon: [
			250,
			128,
			114
		],
		sandybrown: [
			244,
			164,
			96
		],
		seagreen: [
			46,
			139,
			87
		],
		seashell: [
			255,
			245,
			238
		],
		sienna: [
			160,
			82,
			45
		],
		silver: [
			192,
			192,
			192
		],
		skyblue: [
			135,
			206,
			235
		],
		slateblue: [
			106,
			90,
			205
		],
		slategray: [
			112,
			128,
			144
		],
		slategrey: [
			112,
			128,
			144
		],
		snow: [
			255,
			250,
			250
		],
		springgreen: [
			0,
			255,
			127
		],
		steelblue: [
			70,
			130,
			180
		],
		tan: [
			210,
			180,
			140
		],
		teal: [
			0,
			128,
			128
		],
		thistle: [
			216,
			191,
			216
		],
		tomato: [
			255,
			99,
			71
		],
		turquoise: [
			64,
			224,
			208
		],
		violet: [
			238,
			130,
			238
		],
		wheat: [
			245,
			222,
			179
		],
		white: [
			255,
			255,
			255
		],
		whitesmoke: [
			245,
			245,
			245
		],
		yellow: [
			255,
			255,
			0
		],
		yellowgreen: [
			154,
			205,
			50
		]
	};
}));
//#endregion
//#region node_modules/@csstools/css-color-parser/dist/index.mjs
function convertNaNToZero(e) {
	return [
		Number.isNaN(e[0]) ? 0 : e[0],
		Number.isNaN(e[1]) ? 0 : e[1],
		Number.isNaN(e[2]) ? 0 : e[2]
	];
}
function colorData_to_XYZ_D50(e) {
	switch (e.colorNotation) {
		case he.HEX:
		case he.RGB:
		case he.sRGB: return {
			...e,
			colorNotation: he.XYZ_D50,
			channels: sRGB_to_XYZ_D50(convertNaNToZero(e.channels))
		};
		case he.Linear_sRGB: return {
			...e,
			colorNotation: he.XYZ_D50,
			channels: lin_sRGB_to_XYZ_D50(convertNaNToZero(e.channels))
		};
		case he.Display_P3: return {
			...e,
			colorNotation: he.XYZ_D50,
			channels: P3_to_XYZ_D50(convertNaNToZero(e.channels))
		};
		case he.Linear_Display_P3: return {
			...e,
			colorNotation: he.XYZ_D50,
			channels: lin_P3_to_XYZ_D50(convertNaNToZero(e.channels))
		};
		case he.Rec2020: return {
			...e,
			colorNotation: he.XYZ_D50,
			channels: rec_2020_to_XYZ_D50(convertNaNToZero(e.channels))
		};
		case he.A98_RGB: return {
			...e,
			colorNotation: he.XYZ_D50,
			channels: a98_RGB_to_XYZ_D50(convertNaNToZero(e.channels))
		};
		case he.ProPhoto_RGB: return {
			...e,
			colorNotation: he.XYZ_D50,
			channels: ProPhoto_RGB_to_XYZ_D50(convertNaNToZero(e.channels))
		};
		case he.HSL: return {
			...e,
			colorNotation: he.XYZ_D50,
			channels: HSL_to_XYZ_D50(convertNaNToZero(e.channels))
		};
		case he.HWB: return {
			...e,
			colorNotation: he.XYZ_D50,
			channels: HWB_to_XYZ_D50(convertNaNToZero(e.channels))
		};
		case he.Lab: return {
			...e,
			colorNotation: he.XYZ_D50,
			channels: Lab_to_XYZ_D50(convertNaNToZero(e.channels))
		};
		case he.OKLab: return {
			...e,
			colorNotation: he.XYZ_D50,
			channels: OKLab_to_XYZ_D50(convertNaNToZero(e.channels))
		};
		case he.LCH: return {
			...e,
			colorNotation: he.XYZ_D50,
			channels: LCH_to_XYZ_D50(convertNaNToZero(e.channels))
		};
		case he.OKLCH: return {
			...e,
			colorNotation: he.XYZ_D50,
			channels: OKLCH_to_XYZ_D50(convertNaNToZero(e.channels))
		};
		case he.XYZ_D50: return {
			...e,
			colorNotation: he.XYZ_D50,
			channels: XYZ_D50_to_XYZ_D50(convertNaNToZero(e.channels))
		};
		case he.XYZ_D65: return {
			...e,
			colorNotation: he.XYZ_D50,
			channels: XYZ_D65_to_XYZ_D50(convertNaNToZero(e.channels))
		};
		default: throw new Error("Unsupported color notation");
	}
}
function colorDataTo(e, a) {
	const n = { ...e };
	if (e.colorNotation !== a) {
		const e = colorData_to_XYZ_D50(n);
		switch (a) {
			case he.HEX:
			case he.RGB:
				n.colorNotation = he.RGB, n.channels = XYZ_D50_to_sRGB(e.channels);
				break;
			case he.sRGB:
				n.colorNotation = he.sRGB, n.channels = XYZ_D50_to_sRGB(e.channels);
				break;
			case he.Linear_sRGB:
				n.colorNotation = he.Linear_sRGB, n.channels = XYZ_D50_to_lin_sRGB(e.channels);
				break;
			case he.Display_P3:
				n.colorNotation = he.Display_P3, n.channels = XYZ_D50_to_P3(e.channels);
				break;
			case he.Linear_Display_P3:
				n.colorNotation = he.Linear_Display_P3, n.channels = XYZ_D50_to_lin_P3(e.channels);
				break;
			case he.Rec2020:
				n.colorNotation = he.Rec2020, n.channels = XYZ_D50_to_rec_2020(e.channels);
				break;
			case he.ProPhoto_RGB:
				n.colorNotation = he.ProPhoto_RGB, n.channels = XYZ_D50_to_ProPhoto(e.channels);
				break;
			case he.A98_RGB:
				n.colorNotation = he.A98_RGB, n.channels = XYZ_D50_to_a98_RGB(e.channels);
				break;
			case he.HSL:
				n.colorNotation = he.HSL, n.channels = XYZ_D50_to_HSL(e.channels);
				break;
			case he.HWB:
				n.colorNotation = he.HWB, n.channels = XYZ_D50_to_HWB(e.channels);
				break;
			case he.Lab:
				n.colorNotation = he.Lab, n.channels = XYZ_D50_to_Lab(e.channels);
				break;
			case he.LCH:
				n.colorNotation = he.LCH, n.channels = XYZ_D50_to_LCH(e.channels);
				break;
			case he.OKLCH:
				n.colorNotation = he.OKLCH, n.channels = XYZ_D50_to_OKLCH(e.channels);
				break;
			case he.OKLab:
				n.colorNotation = he.OKLab, n.channels = XYZ_D50_to_OKLab(e.channels);
				break;
			case he.XYZ_D50:
				n.colorNotation = he.XYZ_D50, n.channels = XYZ_D50_to_XYZ_D50(e.channels);
				break;
			case he.XYZ_D65:
				n.colorNotation = he.XYZ_D65, n.channels = XYZ_D50_to_XYZ_D65(e.channels);
				break;
			default: throw new Error("Unsupported color notation");
		}
	} else n.channels = convertNaNToZero(e.channels);
	if (a === e.colorNotation) n.channels = carryForwardMissingComponents(e.channels, [
		0,
		1,
		2
	], [], n.channels, [
		0,
		1,
		2
	], []);
	else if (pe.has(a) && pe.has(e.colorNotation)) n.channels = carryForwardMissingComponents(e.channels, [
		0,
		1,
		2
	], [], n.channels, [
		0,
		1,
		2
	], []);
	else switch (a) {
		case he.HSL:
			switch (e.colorNotation) {
				case he.HWB:
					n.channels = carryForwardMissingComponents(e.channels, [0], [1, 2], n.channels, [0], [1, 2]);
					break;
				case he.Lab:
				case he.OKLab:
					n.channels = carryForwardMissingComponents(e.channels, [2], [0, 1], n.channels, [0], [1, 2]);
					break;
				case he.LCH:
				case he.OKLCH:
					n.channels = carryForwardMissingComponents(e.channels, [
						0,
						1,
						2
					], [], n.channels, [
						2,
						1,
						0
					], []);
					break;
				default: n.channels = carryForwardMissingComponents(e.channels, [], [], n.channels, [], []);
			}
			break;
		case he.HWB:
			switch (e.colorNotation) {
				case he.HSL:
					n.channels = carryForwardMissingComponents(e.channels, [0], [1, 2], n.channels, [0], [1, 2]);
					break;
				case he.LCH:
				case he.OKLCH:
					n.channels = carryForwardMissingComponents(e.channels, [0], [1, 2], n.channels, [2], [0, 1]);
					break;
				default: n.channels = carryForwardMissingComponents(e.channels, [], [], n.channels, [], []);
			}
			break;
		case he.Lab:
		case he.OKLab:
			switch (e.colorNotation) {
				case he.HSL:
					n.channels = carryForwardMissingComponents(e.channels, [0], [1, 2], n.channels, [2], [0, 1]);
					break;
				case he.Lab:
				case he.OKLab:
					n.channels = carryForwardMissingComponents(e.channels, [
						0,
						1,
						2
					], [], n.channels, [
						0,
						1,
						2
					], []);
					break;
				case he.LCH:
				case he.OKLCH:
					n.channels = carryForwardMissingComponents(e.channels, [0], [1, 2], n.channels, [0], [1, 2]);
					break;
				default: n.channels = carryForwardMissingComponents(e.channels, [], [], n.channels, [], []);
			}
			break;
		case he.LCH:
		case he.OKLCH:
			switch (e.colorNotation) {
				case he.HSL:
					n.channels = carryForwardMissingComponents(e.channels, [
						0,
						1,
						2
					], [], n.channels, [
						2,
						1,
						0
					], []);
					break;
				case he.HWB:
					n.channels = carryForwardMissingComponents(e.channels, [0], [1, 2], n.channels, [2], [0, 1]);
					break;
				case he.Lab:
				case he.OKLab:
					n.channels = carryForwardMissingComponents(e.channels, [0], [1, 2], n.channels, [0], [1, 2]);
					break;
				case he.LCH:
				case he.OKLCH:
					n.channels = carryForwardMissingComponents(e.channels, [
						0,
						1,
						2
					], [], n.channels, [
						0,
						1,
						2
					], []);
					break;
				default: n.channels = carryForwardMissingComponents(e.channels, [], [], n.channels, [], []);
			}
			break;
		default: n.channels = carryForwardMissingComponents(e.channels, [], [], n.channels, [], []);
	}
	return n.channels = convertPowerlessComponentsToMissingComponents(n.channels, a), n;
}
function convertPowerlessComponentsToMissingComponents(e, a) {
	const n = [...e];
	switch (a) {
		case he.HSL:
			!Number.isNaN(n[1]) && reducePrecision(n[1], 4) <= 0 && (n[0] = NaN);
			break;
		case he.HWB:
			Math.max(0, reducePrecision(n[1], 4)) + Math.max(0, reducePrecision(n[2], 4)) >= 100 && (n[0] = NaN);
			break;
		case he.LCH:
			!Number.isNaN(n[1]) && reducePrecision(n[1], 4) <= 0 && (n[2] = NaN);
			break;
		case he.OKLCH: !Number.isNaN(n[1]) && reducePrecision(n[1], 6) <= 0 && (n[2] = NaN);
	}
	return n;
}
function carryForwardMissingComponents(e, a, n, r, o, l) {
	if (a.length < 3 && e.every(Number.isNaN)) return [
		NaN,
		NaN,
		NaN
	];
	const t = [...r];
	for (let n = 0; n < a.length; n++) Number.isNaN(e[a[n]]) && (t[o[n]] = NaN);
	if (n.length && n.every((a) => Number.isNaN(e[a]))) for (let e = 0; e < l.length; e++) t[l[e]] = NaN;
	return t;
}
function normalizeRelativeColorDataChannels(e) {
	const a = /* @__PURE__ */ new Map();
	switch (e.colorNotation) {
		case he.RGB:
		case he.HEX:
			a.set("r", dummyNumberToken(255 * e.channels[0])), a.set("g", dummyNumberToken(255 * e.channels[1])), a.set("b", dummyNumberToken(255 * e.channels[2])), "number" == typeof e.alpha && a.set("alpha", dummyNumberToken(e.alpha));
			break;
		case he.HSL:
			a.set("h", dummyNumberToken(e.channels[0])), a.set("s", dummyNumberToken(e.channels[1])), a.set("l", dummyNumberToken(e.channels[2])), "number" == typeof e.alpha && a.set("alpha", dummyNumberToken(e.alpha));
			break;
		case he.HWB:
			a.set("h", dummyNumberToken(e.channels[0])), a.set("w", dummyNumberToken(e.channels[1])), a.set("b", dummyNumberToken(e.channels[2])), "number" == typeof e.alpha && a.set("alpha", dummyNumberToken(e.alpha));
			break;
		case he.Lab:
		case he.OKLab:
			a.set("l", dummyNumberToken(e.channels[0])), a.set("a", dummyNumberToken(e.channels[1])), a.set("b", dummyNumberToken(e.channels[2])), "number" == typeof e.alpha && a.set("alpha", dummyNumberToken(e.alpha));
			break;
		case he.LCH:
		case he.OKLCH:
			a.set("l", dummyNumberToken(e.channels[0])), a.set("c", dummyNumberToken(e.channels[1])), a.set("h", dummyNumberToken(e.channels[2])), "number" == typeof e.alpha && a.set("alpha", dummyNumberToken(e.alpha));
			break;
		case he.sRGB:
		case he.A98_RGB:
		case he.Display_P3:
		case he.Linear_Display_P3:
		case he.Rec2020:
		case he.Linear_sRGB:
		case he.ProPhoto_RGB:
			a.set("r", dummyNumberToken(e.channels[0])), a.set("g", dummyNumberToken(e.channels[1])), a.set("b", dummyNumberToken(e.channels[2])), "number" == typeof e.alpha && a.set("alpha", dummyNumberToken(e.alpha));
			break;
		case he.XYZ_D50:
		case he.XYZ_D65: a.set("x", dummyNumberToken(e.channels[0])), a.set("y", dummyNumberToken(e.channels[1])), a.set("z", dummyNumberToken(e.channels[2])), "number" == typeof e.alpha && a.set("alpha", dummyNumberToken(e.alpha));
	}
	return a;
}
function noneToZeroInRelativeColorDataChannels(e) {
	const a = new Map(e);
	for (const [n, r] of e) Number.isNaN(r[4].value) && a.set(n, dummyNumberToken(0));
	return a;
}
function dummyNumberToken(n) {
	return Number.isNaN(n) ? [
		c$1.Number,
		"none",
		-1,
		-1,
		{
			value: NaN,
			type: a$1.Number
		}
	] : [
		c$1.Number,
		n.toString(),
		-1,
		-1,
		{
			value: n,
			type: a$1.Number
		}
	];
}
function reducePrecision(e, a = 7) {
	if (Number.isNaN(e)) return 0;
	const n = Math.pow(10, a);
	return Math.round(e * n) / n;
}
function normalize(e, a, n, r) {
	return Math.min(Math.max(e / a, n), r);
}
function toLowerCaseAZ(e) {
	return e.replace(Ne, (e) => String.fromCharCode(e.charCodeAt(0) + 32));
}
function normalize_Color_ChannelValues(l, t, s) {
	if (isTokenIdent(l) && "none" === toLowerCaseAZ(l[4].value)) return s.syntaxFlags.add(me.HasNoneKeywords), [
		c$1.Number,
		"none",
		l[2],
		l[3],
		{
			value: NaN,
			type: a$1.Number
		}
	];
	if (isTokenPercentage(l)) {
		3 !== t && s.syntaxFlags.add(me.HasPercentageValues);
		let n = normalize(l[4].value, 100, -2147483647, 2147483647);
		return 3 === t && (n = normalize(l[4].value, 100, 0, 1)), [
			c$1.Number,
			n.toString(),
			l[2],
			l[3],
			{
				value: n,
				type: a$1.Number
			}
		];
	}
	if (isTokenNumber(l)) {
		3 !== t && s.syntaxFlags.add(me.HasNumberValues);
		let n = normalize(l[4].value, 1, -2147483647, 2147483647);
		return 3 === t && (n = normalize(l[4].value, 1, 0, 1)), [
			c$1.Number,
			n.toString(),
			l[2],
			l[3],
			{
				value: n,
				type: a$1.Number
			}
		];
	}
	return !1;
}
function color$1(e, a) {
	const r = [], s = [], u = [], i = [];
	let c, h, m = !1, p = !1;
	const N = {
		colorNotation: he.sRGB,
		channels: [
			0,
			0,
			0
		],
		alpha: 1,
		syntaxFlags: /* @__PURE__ */ new Set([])
	};
	let b = r;
	for (let o = 0; o < e.value.length; o++) {
		let g = e.value[o];
		if (isWhitespaceNode(g) || isCommentNode(g)) for (; isWhitespaceNode(e.value[o + 1]) || isCommentNode(e.value[o + 1]);) o++;
		else if (b === r && r.length && (b = s), b === s && s.length && (b = u), isTokenNode(g) && isTokenDelim(g.value) && "/" === g.value[4].value) {
			if (b === i) return !1;
			b = i;
		} else {
			if (isFunctionNode(g)) {
				if (b === i && "var" === toLowerCaseAZ(g.getName())) {
					N.syntaxFlags.add(me.HasVariableAlpha), b.push(g);
					continue;
				}
				if (!Q.has(toLowerCaseAZ(g.getName()))) return !1;
				const [[e]] = calcFromComponentValues([[g]], {
					censorIntoStandardRepresentableValues: !0,
					globals: h,
					precision: -1,
					toCanonicalUnits: !0,
					rawPercentages: !0
				});
				if (!e || !isTokenNode(e) || !isTokenNumeric(e.value)) return !1;
				Number.isNaN(e.value[4].value) && (e.value[4].value = 0), g = e;
			}
			if (b === r && 0 === r.length && isTokenNode(g) && isTokenIdent(g.value) && be.has(toLowerCaseAZ(g.value[4].value))) {
				if (m) return !1;
				m = toLowerCaseAZ(g.value[4].value), N.colorNotation = colorSpaceNameToColorNotation(m), p && (p.colorNotation !== N.colorNotation && (p = colorDataTo(p, N.colorNotation)), c = normalizeRelativeColorDataChannels(p), h = noneToZeroInRelativeColorDataChannels(c));
			} else if (b === r && 0 === r.length && isTokenNode(g) && isTokenIdent(g.value) && "from" === toLowerCaseAZ(g.value[4].value)) {
				if (p) return !1;
				if (m) return !1;
				for (; isWhitespaceNode(e.value[o + 1]) || isCommentNode(e.value[o + 1]);) o++;
				if (o++, g = e.value[o], p = a(g), !1 === p) return !1;
				p.syntaxFlags.has(me.Experimental) && N.syntaxFlags.add(me.Experimental), N.syntaxFlags.add(me.RelativeColorSyntax);
			} else {
				if (!isTokenNode(g)) return !1;
				if (isTokenIdent(g.value) && c && c.has(toLowerCaseAZ(g.value[4].value))) {
					b.push(new TokenNode(c.get(toLowerCaseAZ(g.value[4].value))));
					continue;
				}
				b.push(g);
			}
		}
	}
	if (!m) return !1;
	if (1 !== b.length) return !1;
	if (1 !== r.length || 1 !== s.length || 1 !== u.length) return !1;
	if (!isTokenNode(r[0]) || !isTokenNode(s[0]) || !isTokenNode(u[0])) return !1;
	if (c && !c.has("alpha")) return !1;
	const g = normalize_Color_ChannelValues(r[0].value, 0, N);
	if (!g || !isTokenNumber(g)) return !1;
	const v = normalize_Color_ChannelValues(s[0].value, 1, N);
	if (!v || !isTokenNumber(v)) return !1;
	const f = normalize_Color_ChannelValues(u[0].value, 2, N);
	if (!f || !isTokenNumber(f)) return !1;
	const d = [
		g,
		v,
		f
	];
	if (1 === i.length) if (N.syntaxFlags.add(me.HasAlpha), isTokenNode(i[0])) {
		const e = normalize_Color_ChannelValues(i[0].value, 3, N);
		if (!e || !isTokenNumber(e)) return !1;
		d.push(e);
	} else N.alpha = i[0];
	else if (c && c.has("alpha")) {
		const e = normalize_Color_ChannelValues(c.get("alpha"), 3, N);
		if (!e || !isTokenNumber(e)) return !1;
		d.push(e);
	}
	return N.channels = [
		d[0][4].value,
		d[1][4].value,
		d[2][4].value
	], 4 === d.length && (N.alpha = d[3][4].value), N;
}
function colorSpaceNameToColorNotation(e) {
	switch (e) {
		case "srgb": return he.sRGB;
		case "srgb-linear": return he.Linear_sRGB;
		case "display-p3": return he.Display_P3;
		case "display-p3-linear": return he.Linear_Display_P3;
		case "a98-rgb": return he.A98_RGB;
		case "prophoto-rgb": return he.ProPhoto_RGB;
		case "rec2020": return he.Rec2020;
		case "xyz":
		case "xyz-d65": return he.XYZ_D65;
		case "xyz-d50": return he.XYZ_D50;
		default: throw new Error("Unknown color space name: " + e);
	}
}
function colorMix(e, a) {
	let r = null, o = null, l = null, t = !1;
	for (let u = 0; u < e.value.length; u++) {
		const i = e.value[u];
		if (!isWhiteSpaceOrCommentNode(i)) {
			if (!(r || isTokenNode(i) && isTokenIdent(i.value) && "in" === toLowerCaseAZ(i.value[4].value))) return colorMixRectangular("oklab", colorMixComponents(e.value, a));
			if (isTokenNode(i) && isTokenIdent(i.value)) {
				if (!r && "in" === toLowerCaseAZ(i.value[4].value)) {
					r = i;
					continue;
				}
				if (r && !o) {
					o = toLowerCaseAZ(i.value[4].value);
					continue;
				}
				if (r && o && !l && ve.has(o)) {
					l = toLowerCaseAZ(i.value[4].value);
					continue;
				}
				if (r && o && l && !t && "hue" === toLowerCaseAZ(i.value[4].value)) {
					t = !0;
					continue;
				}
				return !1;
			}
			return !(!isTokenNode(i) || !isTokenComma(i.value)) && !!o && (l || t ? !!(l && t && ve.has(o) && fe.has(l)) && colorMixPolar(o, l, colorMixComponents(e.value.slice(u + 1), a)) : ge.has(o) ? colorMixRectangular(o, colorMixComponents(e.value.slice(u + 1), a)) : !!ve.has(o) && colorMixPolar(o, "shorter", colorMixComponents(e.value.slice(u + 1), a)));
		}
	}
	return !1;
}
function colorMixComponents(e, a) {
	const n = [];
	let o = 1, l = !1, u = !1;
	for (let o = 0; o < e.length; o++) {
		let i = e[o];
		if (!isWhiteSpaceOrCommentNode(i)) {
			if (!isTokenNode(i) || !isTokenComma(i.value)) {
				if (!l) {
					const e = a(i);
					if (e) {
						l = e;
						continue;
					}
				}
				if (!u) {
					if (isFunctionNode(i) && Q.has(toLowerCaseAZ(i.getName()))) {
						if ([[i]] = calcFromComponentValues([[i]], {
							censorIntoStandardRepresentableValues: !0,
							precision: -1,
							toCanonicalUnits: !0,
							rawPercentages: !0
						}), !i || !isTokenNode(i) || !isTokenNumeric(i.value)) return !1;
						Number.isNaN(i.value[4].value) && (i.value[4].value = 0);
					}
					if (isTokenNode(i) && isTokenPercentage(i.value) && i.value[4].value >= 0) {
						u = i.value[4].value;
						continue;
					}
				}
				return !1;
			}
			if (!l) return !1;
			n.push({
				color: l,
				percentage: u
			}), l = !1, u = !1;
		}
	}
	if (!l) return !1;
	n.push({
		color: l,
		percentage: u
	});
	let i = 0, c = 0;
	for (let e = 0; e < n.length; e++) {
		const a = n[e].percentage;
		if (!1 !== a) {
			if (a < 0 || a > 100) return !1;
			i += a;
		} else c++;
	}
	const h = Math.max(0, 100 - i);
	i = 0;
	for (let e = 0; e < n.length; e++) !1 === n[e].percentage && (n[e].percentage = h / c), i += n[e].percentage;
	if (0 === i) return {
		colors: [{
			color: {
				channels: [
					0,
					0,
					0
				],
				colorNotation: he.sRGB,
				alpha: 0,
				syntaxFlags: /* @__PURE__ */ new Set()
			},
			percentage: 0
		}],
		alphaMultiplier: 0
	};
	if (i > 100) for (let e = 0; e < n.length; e++) {
		let a = n[e].percentage;
		a = a / i * 100, n[e].percentage = a;
	}
	if (i < 100) {
		o = i / 100;
		for (let e = 0; e < n.length; e++) {
			let a = n[e].percentage;
			a = a / i * 100, n[e].percentage = a;
		}
	}
	return {
		colors: n,
		alphaMultiplier: o
	};
}
function colorMixRectangular(e, a) {
	if (!a || !a.colors.length) return !1;
	const n = a.colors.slice();
	let r;
	switch (n.reverse(), e) {
		case "srgb":
			r = he.RGB;
			break;
		case "srgb-linear":
			r = he.Linear_sRGB;
			break;
		case "display-p3":
			r = he.Display_P3;
			break;
		case "display-p3-linear":
			r = he.Linear_Display_P3;
			break;
		case "a98-rgb":
			r = he.A98_RGB;
			break;
		case "prophoto-rgb":
			r = he.ProPhoto_RGB;
			break;
		case "rec2020":
			r = he.Rec2020;
			break;
		case "lab":
			r = he.Lab;
			break;
		case "oklab":
			r = he.OKLab;
			break;
		case "xyz-d50":
			r = he.XYZ_D50;
			break;
		case "xyz":
		case "xyz-d65":
			r = he.XYZ_D65;
			break;
		default: return !1;
	}
	if (1 === n.length) {
		const e = colorDataTo(n[0].color, r);
		return e.colorNotation = r, e.syntaxFlags.add(me.ColorMixVariadic), "number" != typeof e.alpha ? !1 : (e.alpha = e.alpha * a.alphaMultiplier, e);
	}
	for (; n.length >= 2;) {
		const e = n.pop(), a = n.pop();
		if (!e || !a) return !1;
		const o = colorMixRectangularPair(r, e.color, e.percentage, a.color, a.percentage);
		if (!o) return !1;
		n.push({
			color: o,
			percentage: e.percentage + a.percentage
		});
	}
	const o = n[0]?.color;
	return !!o && (a.colors.some((e) => e.color.syntaxFlags.has(me.Experimental)) && o.syntaxFlags.add(me.Experimental), "number" == typeof o.alpha && (o.alpha = o.alpha * a.alphaMultiplier, 2 !== a.colors.length && o.syntaxFlags.add(me.ColorMixVariadic), o));
}
function colorMixRectangularPair(e, a, n, r, o) {
	const l = n / (n + o);
	let t = a.alpha;
	if ("number" != typeof t) return !1;
	let s = r.alpha;
	if ("number" != typeof s) return !1;
	t = Number.isNaN(t) ? s : t, s = Number.isNaN(s) ? t : s;
	const u = colorDataTo(a, e).channels, i = colorDataTo(r, e).channels;
	u[0] = fillInMissingComponent(u[0], i[0]), i[0] = fillInMissingComponent(i[0], u[0]), u[1] = fillInMissingComponent(u[1], i[1]), i[1] = fillInMissingComponent(i[1], u[1]), u[2] = fillInMissingComponent(u[2], i[2]), i[2] = fillInMissingComponent(i[2], u[2]), u[0] = premultiply(u[0], t), u[1] = premultiply(u[1], t), u[2] = premultiply(u[2], t), i[0] = premultiply(i[0], s), i[1] = premultiply(i[1], s), i[2] = premultiply(i[2], s);
	const c = interpolate(t, s, l);
	return {
		colorNotation: e,
		channels: [
			un_premultiply(interpolate(u[0], i[0], l), c),
			un_premultiply(interpolate(u[1], i[1], l), c),
			un_premultiply(interpolate(u[2], i[2], l), c)
		],
		alpha: c,
		syntaxFlags: new Set([me.ColorMix])
	};
}
function colorMixPolar(e, a, n) {
	if (!n || !n.colors.length) return !1;
	const r = n.colors.slice();
	let o;
	switch (r.reverse(), e) {
		case "hsl":
			o = he.HSL;
			break;
		case "hwb":
			o = he.HWB;
			break;
		case "lch":
			o = he.LCH;
			break;
		case "oklch":
			o = he.OKLCH;
			break;
		default: return !1;
	}
	if (1 === r.length) {
		const e = colorDataTo(r[0].color, o);
		return e.colorNotation = o, e.syntaxFlags.add(me.ColorMixVariadic), "number" != typeof e.alpha ? !1 : (e.alpha = e.alpha * n.alphaMultiplier, e);
	}
	for (; r.length >= 2;) {
		const e = r.pop(), n = r.pop();
		if (!e || !n) return !1;
		const l = colorMixPolarPair(o, a, e.color, e.percentage, n.color, n.percentage);
		if (!l) return !1;
		r.push({
			color: l,
			percentage: e.percentage + n.percentage
		});
	}
	const l = r[0]?.color;
	return !!l && (n.colors.some((e) => e.color.syntaxFlags.has(me.Experimental)) && l.syntaxFlags.add(me.Experimental), "number" == typeof l.alpha && (l.alpha = l.alpha * n.alphaMultiplier, 2 !== n.colors.length && l.syntaxFlags.add(me.ColorMixVariadic), l));
}
function colorMixPolarPair(e, a, n, r, o, l) {
	const t = r / (r + l);
	let s = 0, u = 0, i = 0, c = 0, h = 0, m = 0, p = n.alpha;
	if ("number" != typeof p) return !1;
	let N = o.alpha;
	if ("number" != typeof N) return !1;
	p = Number.isNaN(p) ? N : p, N = Number.isNaN(N) ? p : N;
	const b = colorDataTo(n, e).channels, g = colorDataTo(o, e).channels;
	switch (e) {
		case he.HSL:
		case he.HWB:
			s = b[0], u = g[0], i = b[1], c = g[1], h = b[2], m = g[2];
			break;
		case he.LCH:
		case he.OKLCH: i = b[0], c = g[0], h = b[1], m = g[1], s = b[2], u = g[2];
	}
	s = fillInMissingComponent(s, u), Number.isNaN(s) && (s = 0), u = fillInMissingComponent(u, s), Number.isNaN(u) && (u = 0), i = fillInMissingComponent(i, c), c = fillInMissingComponent(c, i), h = fillInMissingComponent(h, m), m = fillInMissingComponent(m, h);
	const v = u - s;
	switch (a) {
		case "shorter":
			v > 180 ? s += 360 : v < -180 && (u += 360);
			break;
		case "longer":
			-180 < v && v < 180 && (v > 0 ? s += 360 : u += 360);
			break;
		case "increasing":
			v < 0 && (u += 360);
			break;
		case "decreasing":
			v > 0 && (s += 360);
			break;
		default: throw new Error("Unknown hue interpolation method");
	}
	i = premultiply(i, p), h = premultiply(h, p), c = premultiply(c, N), m = premultiply(m, N);
	let f = [
		0,
		0,
		0
	];
	const d = interpolate(p, N, t);
	switch (e) {
		case he.HSL:
		case he.HWB:
			f = [
				interpolate(s, u, t),
				un_premultiply(interpolate(i, c, t), d),
				un_premultiply(interpolate(h, m, t), d)
			];
			break;
		case he.LCH:
		case he.OKLCH: f = [
			un_premultiply(interpolate(i, c, t), d),
			un_premultiply(interpolate(h, m, t), d),
			interpolate(s, u, t)
		];
	}
	return {
		colorNotation: e,
		channels: f,
		alpha: d,
		syntaxFlags: new Set([me.ColorMix])
	};
}
function fillInMissingComponent(e, a) {
	return Number.isNaN(e) ? a : e;
}
function interpolate(e, a, n) {
	return e * n + a * (1 - n);
}
function premultiply(e, a) {
	return Number.isNaN(a) ? e : Number.isNaN(e) ? NaN : e * a;
}
function un_premultiply(e, a) {
	return 0 === a || Number.isNaN(a) ? e : Number.isNaN(e) ? NaN : e / a;
}
function hex(e) {
	const a = toLowerCaseAZ(e[4].value);
	if (a.match(/[^a-f0-9]/)) return !1;
	const n = {
		colorNotation: he.HEX,
		channels: [
			0,
			0,
			0
		],
		alpha: 1,
		syntaxFlags: new Set([me.Hex])
	}, r = a.length;
	if (3 === r) {
		const e = a[0], r = a[1], o = a[2];
		return n.channels = [
			parseInt(e + e, 16) / 255,
			parseInt(r + r, 16) / 255,
			parseInt(o + o, 16) / 255
		], n;
	}
	if (6 === r) {
		const e = a[0] + a[1], r = a[2] + a[3], o = a[4] + a[5];
		return n.channels = [
			parseInt(e, 16) / 255,
			parseInt(r, 16) / 255,
			parseInt(o, 16) / 255
		], n;
	}
	if (4 === r) {
		const e = a[0], r = a[1], o = a[2], l = a[3];
		return n.channels = [
			parseInt(e + e, 16) / 255,
			parseInt(r + r, 16) / 255,
			parseInt(o + o, 16) / 255
		], n.alpha = parseInt(l + l, 16) / 255, n.syntaxFlags.add(me.HasAlpha), n;
	}
	if (8 === r) {
		const e = a[0] + a[1], r = a[2] + a[3], o = a[4] + a[5], l = a[6] + a[7];
		return n.channels = [
			parseInt(e, 16) / 255,
			parseInt(r, 16) / 255,
			parseInt(o, 16) / 255
		], n.alpha = parseInt(l, 16) / 255, n.syntaxFlags.add(me.HasAlpha), n;
	}
	return !1;
}
function normalizeHue(n) {
	if (isTokenNumber(n)) return n[4].value = n[4].value % 360, n[1] = n[4].value.toString(), n;
	if (isTokenDimension(n)) {
		let r = n[4].value;
		switch (toLowerCaseAZ(n[4].unit)) {
			case "deg": break;
			case "rad":
				r = 180 * n[4].value / Math.PI;
				break;
			case "grad":
				r = .9 * n[4].value;
				break;
			case "turn":
				r = 360 * n[4].value;
				break;
			default: return !1;
		}
		return r %= 360, [
			c$1.Number,
			r.toString(),
			n[2],
			n[3],
			{
				value: r,
				type: a$1.Number
			}
		];
	}
	return !1;
}
function normalize_legacy_HSL_ChannelValues(n, l, t) {
	if (0 === l) {
		const e = normalizeHue(n);
		return !1 !== e && (isTokenDimension(n) && t.syntaxFlags.add(me.HasDimensionValues), e);
	}
	if (isTokenPercentage(n)) {
		3 === l ? t.syntaxFlags.add(me.HasPercentageAlpha) : t.syntaxFlags.add(me.HasPercentageValues);
		let r = normalize(n[4].value, 1, 0, 100);
		return 3 === l && (r = normalize(n[4].value, 100, 0, 1)), [
			c$1.Number,
			r.toString(),
			n[2],
			n[3],
			{
				value: r,
				type: a$1.Number
			}
		];
	}
	if (isTokenNumber(n)) {
		if (3 !== l) return !1;
		let r = normalize(n[4].value, 1, 0, 100);
		return 3 === l && (r = normalize(n[4].value, 1, 0, 1)), [
			c$1.Number,
			r.toString(),
			n[2],
			n[3],
			{
				value: r,
				type: a$1.Number
			}
		];
	}
	return !1;
}
function normalize_modern_HSL_ChannelValues(l, t, s) {
	if (isTokenIdent(l) && "none" === toLowerCaseAZ(l[4].value)) return s.syntaxFlags.add(me.HasNoneKeywords), [
		c$1.Number,
		"none",
		l[2],
		l[3],
		{
			value: NaN,
			type: a$1.Number
		}
	];
	if (0 === t) {
		const e = normalizeHue(l);
		return !1 !== e && (isTokenDimension(l) && s.syntaxFlags.add(me.HasDimensionValues), e);
	}
	if (isTokenPercentage(l)) {
		3 === t ? s.syntaxFlags.add(me.HasPercentageAlpha) : s.syntaxFlags.add(me.HasPercentageValues);
		let n = l[4].value;
		return 3 === t ? n = normalize(l[4].value, 100, 0, 1) : 1 === t && (n = normalize(l[4].value, 1, 0, 2147483647)), [
			c$1.Number,
			n.toString(),
			l[2],
			l[3],
			{
				value: n,
				type: a$1.Number
			}
		];
	}
	if (isTokenNumber(l)) {
		3 !== t && s.syntaxFlags.add(me.HasNumberValues);
		let n = l[4].value;
		return 3 === t ? n = normalize(l[4].value, 1, 0, 1) : 1 === t && (n = normalize(l[4].value, 1, 0, 2147483647)), [
			c$1.Number,
			n.toString(),
			l[2],
			l[3],
			{
				value: n,
				type: a$1.Number
			}
		];
	}
	return !1;
}
function threeChannelLegacySyntax(e, a, n, r) {
	const l = [], u = [], i = [], c = [], h = {
		colorNotation: n,
		channels: [
			0,
			0,
			0
		],
		alpha: 1,
		syntaxFlags: new Set(r)
	};
	let m = l;
	for (let a = 0; a < e.value.length; a++) {
		let n = e.value[a];
		if (!isWhitespaceNode(n) && !isCommentNode(n)) {
			if (isTokenNode(n) && isTokenComma(n.value)) {
				if (m === l) {
					m = u;
					continue;
				}
				if (m === u) {
					m = i;
					continue;
				}
				if (m === i) {
					m = c;
					continue;
				}
				if (m === c) return !1;
			}
			if (isFunctionNode(n)) {
				if (m === c && "var" === n.getName().toLowerCase()) {
					h.syntaxFlags.add(me.HasVariableAlpha), m.push(n);
					continue;
				}
				if (!Q.has(n.getName().toLowerCase())) return !1;
				const [[e]] = calcFromComponentValues([[n]], {
					censorIntoStandardRepresentableValues: !0,
					precision: -1,
					toCanonicalUnits: !0,
					rawPercentages: !0
				});
				if (!e || !isTokenNode(e) || !isTokenNumeric(e.value)) return !1;
				Number.isNaN(e.value[4].value) && (e.value[4].value = 0), n = e;
			}
			if (!isTokenNode(n)) return !1;
			m.push(n);
		}
	}
	if (1 !== m.length) return !1;
	if (1 !== l.length || 1 !== u.length || 1 !== i.length) return !1;
	if (!isTokenNode(l[0]) || !isTokenNode(u[0]) || !isTokenNode(i[0])) return !1;
	const p = a(l[0].value, 0, h);
	if (!p || !isTokenNumber(p)) return !1;
	const N = a(u[0].value, 1, h);
	if (!N || !isTokenNumber(N)) return !1;
	const b = a(i[0].value, 2, h);
	if (!b || !isTokenNumber(b)) return !1;
	const g = [
		p,
		N,
		b
	];
	if (1 === c.length) if (h.syntaxFlags.add(me.HasAlpha), isTokenNode(c[0])) {
		const e = a(c[0].value, 3, h);
		if (!e || !isTokenNumber(e)) return !1;
		g.push(e);
	} else h.alpha = c[0];
	return h.channels = [
		g[0][4].value,
		g[1][4].value,
		g[2][4].value
	], 4 === g.length && (h.alpha = g[3][4].value), h;
}
function threeChannelSpaceSeparated(e, a, r, s, u) {
	const i = [], c = [], h = [], m = [];
	let p, N, b = !1;
	const g = {
		colorNotation: r,
		channels: [
			0,
			0,
			0
		],
		alpha: 1,
		syntaxFlags: new Set(s)
	};
	let v = i;
	for (let a = 0; a < e.value.length; a++) {
		let o = e.value[a];
		if (isWhitespaceNode(o) || isCommentNode(o)) for (; isWhitespaceNode(e.value[a + 1]) || isCommentNode(e.value[a + 1]);) a++;
		else if (v === i && i.length && (v = c), v === c && c.length && (v = h), isTokenNode(o) && isTokenDelim(o.value) && "/" === o.value[4].value) {
			if (v === m) return !1;
			v = m;
		} else {
			if (isFunctionNode(o)) {
				if (v === m && "var" === o.getName().toLowerCase()) {
					g.syntaxFlags.add(me.HasVariableAlpha), v.push(o);
					continue;
				}
				if (!Q.has(o.getName().toLowerCase())) return !1;
				const [[e]] = calcFromComponentValues([[o]], {
					censorIntoStandardRepresentableValues: !0,
					globals: N,
					precision: -1,
					toCanonicalUnits: !0,
					rawPercentages: !0
				});
				if (!e || !isTokenNode(e) || !isTokenNumeric(e.value)) return !1;
				Number.isNaN(e.value[4].value) && (e.value[4].value = 0), o = e;
			}
			if (v === i && 0 === i.length && isTokenNode(o) && isTokenIdent(o.value) && "from" === o.value[4].value.toLowerCase()) {
				if (b) return !1;
				for (; isWhitespaceNode(e.value[a + 1]) || isCommentNode(e.value[a + 1]);) a++;
				if (a++, o = e.value[a], b = u(o), !1 === b) return !1;
				b.syntaxFlags.has(me.Experimental) && g.syntaxFlags.add(me.Experimental), g.syntaxFlags.add(me.RelativeColorSyntax), b.colorNotation !== r && (b = colorDataTo(b, r)), p = normalizeRelativeColorDataChannels(b), N = noneToZeroInRelativeColorDataChannels(p);
			} else {
				if (!isTokenNode(o)) return !1;
				if (isTokenIdent(o.value) && p) {
					const e = o.value[4].value.toLowerCase();
					if (p.has(e)) {
						v.push(new TokenNode(p.get(e)));
						continue;
					}
				}
				v.push(o);
			}
		}
	}
	if (1 !== v.length) return !1;
	if (1 !== i.length || 1 !== c.length || 1 !== h.length) return !1;
	if (!isTokenNode(i[0]) || !isTokenNode(c[0]) || !isTokenNode(h[0])) return !1;
	if (p && !p.has("alpha")) return !1;
	const f = a(i[0].value, 0, g);
	if (!f || !isTokenNumber(f)) return !1;
	const d = a(c[0].value, 1, g);
	if (!d || !isTokenNumber(d)) return !1;
	const y = a(h[0].value, 2, g);
	if (!y || !isTokenNumber(y)) return !1;
	const _ = [
		f,
		d,
		y
	];
	if (1 === m.length) if (g.syntaxFlags.add(me.HasAlpha), isTokenNode(m[0])) {
		const e = a(m[0].value, 3, g);
		if (!e || !isTokenNumber(e)) return !1;
		_.push(e);
	} else g.alpha = m[0];
	else if (p && p.has("alpha")) {
		const e = a(p.get("alpha"), 3, g);
		if (!e || !isTokenNumber(e)) return !1;
		_.push(e);
	}
	return g.channels = [
		_[0][4].value,
		_[1][4].value,
		_[2][4].value
	], 4 === _.length && (g.alpha = _[3][4].value), g;
}
function hsl(e, a) {
	if (e.value.some((e) => isTokenNode(e) && isTokenComma(e.value))) {
		const a = hslCommaSeparated(e);
		if (!1 !== a) return a;
	}
	{
		const n = hslSpaceSeparated(e, a);
		if (!1 !== n) return n;
	}
	return !1;
}
function hslCommaSeparated(e) {
	return threeChannelLegacySyntax(e, normalize_legacy_HSL_ChannelValues, he.HSL, [me.LegacyHSL]);
}
function hslSpaceSeparated(e, a) {
	return threeChannelSpaceSeparated(e, normalize_modern_HSL_ChannelValues, he.HSL, [], a);
}
function normalize_HWB_ChannelValues(l, t, s) {
	if (isTokenIdent(l) && "none" === toLowerCaseAZ(l[4].value)) return s.syntaxFlags.add(me.HasNoneKeywords), [
		c$1.Number,
		"none",
		l[2],
		l[3],
		{
			value: NaN,
			type: a$1.Number
		}
	];
	if (0 === t) {
		const e = normalizeHue(l);
		return !1 !== e && (isTokenDimension(l) && s.syntaxFlags.add(me.HasDimensionValues), e);
	}
	if (isTokenPercentage(l)) {
		3 === t ? s.syntaxFlags.add(me.HasPercentageAlpha) : s.syntaxFlags.add(me.HasPercentageValues);
		let n = l[4].value;
		return 3 === t && (n = normalize(l[4].value, 100, 0, 1)), [
			c$1.Number,
			n.toString(),
			l[2],
			l[3],
			{
				value: n,
				type: a$1.Number
			}
		];
	}
	if (isTokenNumber(l)) {
		3 !== t && s.syntaxFlags.add(me.HasNumberValues);
		let n = l[4].value;
		return 3 === t && (n = normalize(l[4].value, 1, 0, 1)), [
			c$1.Number,
			n.toString(),
			l[2],
			l[3],
			{
				value: n,
				type: a$1.Number
			}
		];
	}
	return !1;
}
function normalize_Lab_ChannelValues(l, t, s) {
	if (isTokenIdent(l) && "none" === toLowerCaseAZ(l[4].value)) return s.syntaxFlags.add(me.HasNoneKeywords), [
		c$1.Number,
		"none",
		l[2],
		l[3],
		{
			value: NaN,
			type: a$1.Number
		}
	];
	if (isTokenPercentage(l)) {
		3 !== t && s.syntaxFlags.add(me.HasPercentageValues);
		let n = normalize(l[4].value, 1, 0, 100);
		return 1 === t || 2 === t ? n = normalize(l[4].value, .8, -2147483647, 2147483647) : 3 === t && (n = normalize(l[4].value, 100, 0, 1)), [
			c$1.Number,
			n.toString(),
			l[2],
			l[3],
			{
				value: n,
				type: a$1.Number
			}
		];
	}
	if (isTokenNumber(l)) {
		3 !== t && s.syntaxFlags.add(me.HasNumberValues);
		let n = normalize(l[4].value, 1, 0, 100);
		return 1 === t || 2 === t ? n = normalize(l[4].value, 1, -2147483647, 2147483647) : 3 === t && (n = normalize(l[4].value, 1, 0, 1)), [
			c$1.Number,
			n.toString(),
			l[2],
			l[3],
			{
				value: n,
				type: a$1.Number
			}
		];
	}
	return !1;
}
function lab(e, a) {
	return threeChannelSpaceSeparated(e, normalize_Lab_ChannelValues, he.Lab, [], a);
}
function normalize_LCH_ChannelValues(l, t, s) {
	if (isTokenIdent(l) && "none" === toLowerCaseAZ(l[4].value)) return s.syntaxFlags.add(me.HasNoneKeywords), [
		c$1.Number,
		"none",
		l[2],
		l[3],
		{
			value: NaN,
			type: a$1.Number
		}
	];
	if (2 === t) {
		const e = normalizeHue(l);
		return !1 !== e && (isTokenDimension(l) && s.syntaxFlags.add(me.HasDimensionValues), e);
	}
	if (isTokenPercentage(l)) {
		3 !== t && s.syntaxFlags.add(me.HasPercentageValues);
		let n = normalize(l[4].value, 1, 0, 100);
		return 1 === t ? n = normalize(l[4].value, 100 / 150, 0, 2147483647) : 3 === t && (n = normalize(l[4].value, 100, 0, 1)), [
			c$1.Number,
			n.toString(),
			l[2],
			l[3],
			{
				value: n,
				type: a$1.Number
			}
		];
	}
	if (isTokenNumber(l)) {
		3 !== t && s.syntaxFlags.add(me.HasNumberValues);
		let n = normalize(l[4].value, 1, 0, 100);
		return 1 === t ? n = normalize(l[4].value, 1, 0, 2147483647) : 3 === t && (n = normalize(l[4].value, 1, 0, 1)), [
			c$1.Number,
			n.toString(),
			l[2],
			l[3],
			{
				value: n,
				type: a$1.Number
			}
		];
	}
	return !1;
}
function lch(e, a) {
	return threeChannelSpaceSeparated(e, normalize_LCH_ChannelValues, he.LCH, [], a);
}
function namedColor(e) {
	const a = de.get(toLowerCaseAZ(e));
	return !!a && {
		colorNotation: he.RGB,
		channels: [
			a[0] / 255,
			a[1] / 255,
			a[2] / 255
		],
		alpha: 1,
		syntaxFlags: new Set([me.ColorKeyword, me.NamedColor])
	};
}
function normalize_OKLab_ChannelValues(l, t, s) {
	if (isTokenIdent(l) && "none" === toLowerCaseAZ(l[4].value)) return s.syntaxFlags.add(me.HasNoneKeywords), [
		c$1.Number,
		"none",
		l[2],
		l[3],
		{
			value: NaN,
			type: a$1.Number
		}
	];
	if (isTokenPercentage(l)) {
		3 !== t && s.syntaxFlags.add(me.HasPercentageValues);
		let n = normalize(l[4].value, 100, 0, 1);
		return 1 === t || 2 === t ? n = normalize(l[4].value, 250, -2147483647, 2147483647) : 3 === t && (n = normalize(l[4].value, 100, 0, 1)), [
			c$1.Number,
			n.toString(),
			l[2],
			l[3],
			{
				value: n,
				type: a$1.Number
			}
		];
	}
	if (isTokenNumber(l)) {
		3 !== t && s.syntaxFlags.add(me.HasNumberValues);
		let n = normalize(l[4].value, 1, 0, 1);
		return 1 === t || 2 === t ? n = normalize(l[4].value, 1, -2147483647, 2147483647) : 3 === t && (n = normalize(l[4].value, 1, 0, 1)), [
			c$1.Number,
			n.toString(),
			l[2],
			l[3],
			{
				value: n,
				type: a$1.Number
			}
		];
	}
	return !1;
}
function oklab(e, a) {
	return threeChannelSpaceSeparated(e, normalize_OKLab_ChannelValues, he.OKLab, [], a);
}
function normalize_OKLCH_ChannelValues(l, t, s) {
	if (isTokenIdent(l) && "none" === toLowerCaseAZ(l[4].value)) return s.syntaxFlags.add(me.HasNoneKeywords), [
		c$1.Number,
		"none",
		l[2],
		l[3],
		{
			value: NaN,
			type: a$1.Number
		}
	];
	if (2 === t) {
		const e = normalizeHue(l);
		return !1 !== e && (isTokenDimension(l) && s.syntaxFlags.add(me.HasDimensionValues), e);
	}
	if (isTokenPercentage(l)) {
		3 !== t && s.syntaxFlags.add(me.HasPercentageValues);
		let n = normalize(l[4].value, 100, 0, 1);
		return 1 === t ? n = normalize(l[4].value, 250, 0, 2147483647) : 3 === t && (n = normalize(l[4].value, 100, 0, 1)), [
			c$1.Number,
			n.toString(),
			l[2],
			l[3],
			{
				value: n,
				type: a$1.Number
			}
		];
	}
	if (isTokenNumber(l)) {
		3 !== t && s.syntaxFlags.add(me.HasNumberValues);
		let n = normalize(l[4].value, 1, 0, 1);
		return 1 === t ? n = normalize(l[4].value, 1, 0, 2147483647) : 3 === t && (n = normalize(l[4].value, 1, 0, 1)), [
			c$1.Number,
			n.toString(),
			l[2],
			l[3],
			{
				value: n,
				type: a$1.Number
			}
		];
	}
	return !1;
}
function oklch(e, a) {
	return threeChannelSpaceSeparated(e, normalize_OKLCH_ChannelValues, he.OKLCH, [], a);
}
function normalize_legacy_sRGB_ChannelValues(n, l, t) {
	if (isTokenPercentage(n)) {
		3 === l ? t.syntaxFlags.add(me.HasPercentageAlpha) : t.syntaxFlags.add(me.HasPercentageValues);
		const r = normalize(n[4].value, 100, 0, 1);
		return [
			c$1.Number,
			r.toString(),
			n[2],
			n[3],
			{
				value: r,
				type: a$1.Number
			}
		];
	}
	if (isTokenNumber(n)) {
		3 !== l && t.syntaxFlags.add(me.HasNumberValues);
		let r = normalize(n[4].value, 255, 0, 1);
		return 3 === l && (r = normalize(n[4].value, 1, 0, 1)), [
			c$1.Number,
			r.toString(),
			n[2],
			n[3],
			{
				value: r,
				type: a$1.Number
			}
		];
	}
	return !1;
}
function normalize_modern_sRGB_ChannelValues(l, t, s) {
	if (isTokenIdent(l) && "none" === l[4].value.toLowerCase()) return s.syntaxFlags.add(me.HasNoneKeywords), [
		c$1.Number,
		"none",
		l[2],
		l[3],
		{
			value: NaN,
			type: a$1.Number
		}
	];
	if (isTokenPercentage(l)) {
		3 !== t && s.syntaxFlags.add(me.HasPercentageValues);
		let n = normalize(l[4].value, 100, -2147483647, 2147483647);
		return 3 === t && (n = normalize(l[4].value, 100, 0, 1)), [
			c$1.Number,
			n.toString(),
			l[2],
			l[3],
			{
				value: n,
				type: a$1.Number
			}
		];
	}
	if (isTokenNumber(l)) {
		3 !== t && s.syntaxFlags.add(me.HasNumberValues);
		let n = normalize(l[4].value, 255, -2147483647, 2147483647);
		return 3 === t && (n = normalize(l[4].value, 1, 0, 1)), [
			c$1.Number,
			n.toString(),
			l[2],
			l[3],
			{
				value: n,
				type: a$1.Number
			}
		];
	}
	return !1;
}
function rgb(e, a) {
	if (e.value.some((e) => isTokenNode(e) && isTokenComma(e.value))) {
		const a = rgbCommaSeparated(e);
		if (!1 !== a) return (!a.syntaxFlags.has(me.HasNumberValues) || !a.syntaxFlags.has(me.HasPercentageValues)) && a;
	} else {
		const n = rgbSpaceSeparated(e, a);
		if (!1 !== n) return n;
	}
	return !1;
}
function rgbCommaSeparated(e) {
	return threeChannelLegacySyntax(e, normalize_legacy_sRGB_ChannelValues, he.RGB, [me.LegacyRGB]);
}
function rgbSpaceSeparated(e, a) {
	return threeChannelSpaceSeparated(e, normalize_modern_sRGB_ChannelValues, he.RGB, [], a);
}
function XYZ_D50_to_sRGB_Gamut(e) {
	const a = XYZ_D50_to_sRGB(e);
	if (inGamut(a)) return clip(a);
	let n = e;
	return n = XYZ_D50_to_OKLCH(n), n[0] < 1e-6 && (n = [
		0,
		0,
		0
	]), n[0] > .999999 && (n = [
		1,
		0,
		0
	]), gam_sRGB(mapGamutRayTrace(n, oklch_to_lin_srgb, lin_srgb_to_oklch));
}
function oklch_to_lin_srgb(e) {
	return e = OKLCH_to_OKLab(e), e = OKLab_to_XYZ(e), XYZ_to_lin_sRGB(e);
}
function lin_srgb_to_oklch(e) {
	return e = lin_sRGB_to_XYZ(e), e = XYZ_to_OKLab(e), OKLab_to_OKLCH(e);
}
function contrastColor(e, a) {
	let n = !1;
	for (let r = 0; r < e.value.length; r++) {
		const o = e.value[r];
		if (!isWhitespaceNode(o) && !isCommentNode(o) && (n || (n = a(o), !n))) return !1;
	}
	if (!n) return !1;
	n.channels = convertNaNToZero(n.channels), n.channels = XYZ_D50_to_sRGB_Gamut(colorData_to_XYZ_D50(n).channels), n.colorNotation = he.sRGB;
	const r = {
		colorNotation: he.sRGB,
		channels: [
			0,
			0,
			0
		],
		alpha: 1,
		syntaxFlags: new Set([me.ContrastColor, me.Experimental])
	};
	return r.channels = contrast_ratio_wcag_2_1(n.channels, [
		1,
		1,
		1
	]) > contrast_ratio_wcag_2_1(n.channels, [
		0,
		0,
		0
	]) ? [
		1,
		1,
		1
	] : [
		0,
		0,
		0
	], r;
}
function alpha(e, a) {
	let r, s, u = !1, i = !1, c = !1;
	const h = {
		colorNotation: he.sRGB,
		channels: [
			0,
			0,
			0
		],
		alpha: 1,
		syntaxFlags: /* @__PURE__ */ new Set([])
	};
	for (let m = 0; m < e.value.length; m++) {
		let p = e.value[m];
		if (isWhitespaceNode(p) || isCommentNode(p)) for (; isWhitespaceNode(e.value[m + 1]) || isCommentNode(e.value[m + 1]);) m++;
		else if (c && !u && !i && isTokenNode(p) && isTokenDelim(p.value) && "/" === p.value[4].value) u = !0;
		else {
			if (isFunctionNode(p) && Q.has(toLowerCaseAZ(p.getName()))) {
				const [[e]] = calcFromComponentValues([[p]], {
					censorIntoStandardRepresentableValues: !0,
					globals: s,
					precision: -1,
					toCanonicalUnits: !0,
					rawPercentages: !0
				});
				if (!e || !isTokenNode(e) || !isTokenNumeric(e.value)) return !1;
				Number.isNaN(e.value[4].value) && (e.value[4].value = 0), p = e;
			}
			if (u || i || !isTokenNode(p) || !isTokenIdent(p.value) || "from" !== toLowerCaseAZ(p.value[4].value)) {
				if (!u) return !1;
				if (i) return !1;
				if (isTokenNode(p)) {
					if (isTokenIdent(p.value) && "alpha" === toLowerCaseAZ(p.value[4].value) && r && r.has("alpha")) {
						h.alpha = r.get("alpha")[4].value, i = !0;
						continue;
					}
					const e = normalize_Color_ChannelValues(p.value, 3, h);
					if (!e || !isTokenNumber(e)) return !1;
					h.alpha = new TokenNode(e), i = !0;
					continue;
				}
				if (isFunctionNode(p)) {
					h.alpha = replaceComponentValues$1([[p]], (e) => {
						if (isTokenNode(e) && isTokenIdent(e.value) && "alpha" === toLowerCaseAZ(e.value[4].value) && r && r.has("alpha")) return new TokenNode(r.get("alpha"));
					})[0][0], i = !0;
					continue;
				}
				return !1;
			}
			if (c) return !1;
			for (; isWhitespaceNode(e.value[m + 1]) || isCommentNode(e.value[m + 1]);) m++;
			if (m++, p = e.value[m], c = a(p), !1 === c) return !1;
			r = normalizeRelativeColorDataChannels(c), s = noneToZeroInRelativeColorDataChannels(r), h.syntaxFlags = new Set(c.syntaxFlags), h.syntaxFlags.add(me.RelativeAlphaSyntax), h.channels = [...c.channels], h.colorNotation = c.colorNotation, h.alpha = c.alpha;
		}
	}
	return !!r && h;
}
function color(e) {
	if (isFunctionNode(e)) switch (toLowerCaseAZ(e.getName())) {
		case "rgb":
		case "rgba": return rgb(e, color);
		case "hsl":
		case "hsla": return hsl(e, color);
		case "hwb": return a = color, threeChannelSpaceSeparated(e, normalize_HWB_ChannelValues, he.HWB, [], a);
		case "lab": return lab(e, color);
		case "lch": return lch(e, color);
		case "oklab": return oklab(e, color);
		case "oklch": return oklch(e, color);
		case "color": return color$1(e, color);
		case "color-mix": return colorMix(e, color);
		case "contrast-color": return contrastColor(e, color);
		case "alpha": return alpha(e, color);
	}
	var a;
	if (isTokenNode(e)) {
		if (isTokenHash(e.value)) return hex(e.value);
		if (isTokenIdent(e.value)) {
			const a = namedColor(e.value[4].value);
			return !1 !== a ? a : "transparent" === toLowerCaseAZ(e.value[4].value) && {
				colorNotation: he.RGB,
				channels: [
					0,
					0,
					0
				],
				alpha: 0,
				syntaxFlags: new Set([me.ColorKeyword])
			};
		}
	}
	return !1;
}
var he, me, pe, Ne, be, ge, ve, fe, de;
var init_dist = __esmMin((() => {
	init_dist$4();
	init_dist$1();
	init_dist$3();
	init_dist$2();
	(function(e) {
		e.A98_RGB = "a98-rgb", e.Display_P3 = "display-p3", e.Linear_Display_P3 = "display-p3-linear", e.HEX = "hex", e.HSL = "hsl", e.HWB = "hwb", e.LCH = "lch", e.Lab = "lab", e.Linear_sRGB = "srgb-linear", e.OKLCH = "oklch", e.OKLab = "oklab", e.ProPhoto_RGB = "prophoto-rgb", e.RGB = "rgb", e.sRGB = "srgb", e.Rec2020 = "rec2020", e.XYZ_D50 = "xyz-d50", e.XYZ_D65 = "xyz-d65";
	})(he || (he = {})), function(e) {
		e.ColorKeyword = "color-keyword", e.HasAlpha = "has-alpha", e.HasDimensionValues = "has-dimension-values", e.HasNoneKeywords = "has-none-keywords", e.HasNumberValues = "has-number-values", e.HasPercentageAlpha = "has-percentage-alpha", e.HasPercentageValues = "has-percentage-values", e.HasVariableAlpha = "has-variable-alpha", e.Hex = "hex", e.LegacyHSL = "legacy-hsl", e.LegacyRGB = "legacy-rgb", e.NamedColor = "named-color", e.RelativeColorSyntax = "relative-color-syntax", e.ColorMix = "color-mix", e.ColorMixVariadic = "color-mix-variadic", e.ContrastColor = "contrast-color", e.RelativeAlphaSyntax = "relative-alpha-syntax", e.Experimental = "experimental";
	}(me || (me = {}));
	pe = new Set([
		he.A98_RGB,
		he.Display_P3,
		he.Linear_Display_P3,
		he.HEX,
		he.Linear_sRGB,
		he.ProPhoto_RGB,
		he.RGB,
		he.sRGB,
		he.Rec2020,
		he.XYZ_D50,
		he.XYZ_D65
	]);
	Ne = /[A-Z]/g;
	be = new Set([
		"srgb",
		"srgb-linear",
		"display-p3",
		"display-p3-linear",
		"a98-rgb",
		"prophoto-rgb",
		"rec2020",
		"xyz",
		"xyz-d50",
		"xyz-d65"
	]);
	ge = new Set([
		"srgb",
		"srgb-linear",
		"display-p3",
		"display-p3-linear",
		"a98-rgb",
		"prophoto-rgb",
		"rec2020",
		"lab",
		"oklab",
		"xyz",
		"xyz-d50",
		"xyz-d65"
	]), ve = new Set([
		"hsl",
		"hwb",
		"lch",
		"oklch"
	]), fe = new Set([
		"shorter",
		"longer",
		"increasing",
		"decreasing"
	]);
	de = /* @__PURE__ */ new Map();
	for (const [e, a] of Object.entries(d)) de.set(e, a);
}));
//#endregion
//#region node_modules/@asamuzakjp/css-color/dist/esm/js/relative-color.js
/**
* resolve relative color channels
* @param value
*   - CSS color value
*   - system colors are not supported
* @param [opt] - options
* @param [opt.currentColor]
*   - color to use for `currentcolor` keyword
*   - if omitted, it will be treated as a missing color
*     i.e. `rgb(none none none / none)`
* @param [opt.customProperty]
*   - custom properties
*   - pair of `--` prefixed property name and value,
*     e.g. `customProperty: { '--some-color': '#0000ff' }`
*   - and/or `callback` function to get the value of the custom property,
*     e.g. `customProperty: { callback: someDeclaration.getPropertyValue }`
* @param [opt.dimension]
*   - dimension, convert relative length to pixels
*   - pair of unit and it's value as a number in pixels,
*     e.g. `dimension: { em: 12, rem: 16, vw: 10.26 }`
*   - and/or `callback` function to get the value as a number in pixels,
*     e.g. `dimension: { callback: convertUnitToPixel }`
* @param [opt.format]
*   - output format, one of below
*   - `computedValue` (default), [computed value][139] of the color
*   - `specifiedValue`, [specified value][140] of the color
*   - `hex`, hex color notation, i.e. `rrggbb`
*   - `hexAlpha`, hex color notation with alpha channel, i.e. `#rrggbbaa`
* @returns
*   - one of rgba?(), #rrggbb(aa)?, color-name, '(empty-string)',
*     color(color-space r g b / alpha), color(color-space x y z / alpha),
*     lab(l a b / alpha), lch(l c h / alpha), oklab(l a b / alpha),
*     oklch(l c h / alpha), null
*   - in `computedValue`, values are numbers, however `rgb()` values are
*     integers
*   - in `specifiedValue`, returns `empty string` for unknown and/or invalid
*     color
*   - in `hex`, returns `null` for `transparent`, and also returns `null` if
*     any of `r`, `g`, `b`, `alpha` is not a number
*   - in `hexAlpha`, returns `#00000000` for `transparent`,
*     however returns `null` if any of `r`, `g`, `b`, `alpha` is not a number
*/
function resolveColorChannels(tokens, opt = {}) {
	if (!Array.isArray(tokens)) throw new TypeError(`${tokens} is not an array.`);
	const { colorSpace = "", format = "" } = opt;
	const colorChannel = COLOR_CHANNELS.get(colorSpace);
	if (!colorChannel) return new NullObject();
	const mathFunc = /* @__PURE__ */ new Set();
	const channels = [
		[],
		[],
		[],
		[]
	];
	let i = 0;
	let nest = 0;
	let func = "";
	let precededPct = false;
	for (const token of tokens) {
		if (!Array.isArray(token)) throw new TypeError(`${token} is not an array.`);
		const [type, value, , , detail] = token;
		const channel = channels[i];
		if (Array.isArray(channel)) switch (type) {
			case DELIM:
				if (func) {
					if ((value === "+" || value === "-") && precededPct && !REG_FN_CALC_SUM.test(func)) return new NullObject();
					precededPct = false;
					channel.push(value);
				}
				break;
			case DIM: {
				if (!func || !REG_FN_CALC_SUM.test(func)) return new NullObject();
				const resolvedValue = resolveDimension(token, opt);
				if (isString(resolvedValue)) channel.push(resolvedValue);
				else channel.push(value);
				break;
			}
			case FUNC:
				channel.push(value);
				func = value;
				nest++;
				if (REG_FN_MATH_START.test(value)) mathFunc.add(nest);
				break;
			case IDENT:
				if (!colorChannel.includes(value)) return new NullObject();
				channel.push(value);
				if (!func) i++;
				break;
			case NUM:
				channel.push(Number(detail?.value));
				if (!func) i++;
				break;
			case PAREN_OPEN:
				channel.push(value);
				nest++;
				break;
			case PAREN_CLOSE:
				if (func) {
					if (channel[channel.length - 1] === " ") channel[channel.length - 1] = value;
					else channel.push(value);
					if (mathFunc.has(nest)) mathFunc.delete(nest);
					nest--;
					if (nest === 0) {
						func = "";
						i++;
					}
				}
				break;
			case PCT:
				if (!func) return new NullObject();
				else if (!REG_FN_CALC_SUM.test(func)) {
					let lastValue;
					for (let j = channel.length - 1; j >= 0; j--) if (channel[j] !== " ") {
						lastValue = channel[j];
						break;
					}
					if (lastValue === "+" || lastValue === "-") return new NullObject();
					else if (lastValue === "*" || lastValue === "/") precededPct = false;
					else precededPct = true;
				}
				channel.push(Number(detail?.value) / MAX_PCT);
				break;
			case W_SPACE:
				if (channel.length && func) {
					const lastValue = channel[channel.length - 1];
					if (typeof lastValue === "number") channel.push(value);
					else if (isString(lastValue) && !lastValue.endsWith("(") && lastValue !== " ") channel.push(value);
				}
				break;
			default: if (type !== COMMENT && type !== EOF && func) channel.push(value);
		}
	}
	const channelValues = [];
	for (const channel of channels) if (channel.length === 1) {
		const [resolvedValue] = channel;
		if (isStringOrNumber(resolvedValue)) channelValues.push(resolvedValue);
	} else if (channel.length) {
		const resolvedValue = serializeCalc(channel.join(""), { format });
		channelValues.push(resolvedValue);
	}
	return channelValues;
}
/**
* extract origin color
* @param value - CSS color value
* @param [opt] - options
* @returns origin color value
*/
function extractOriginColor(value, opt = {}) {
	const { colorScheme = "normal", currentColor = "", format = "" } = opt;
	if (isString(value)) {
		value = value.toLowerCase().trim();
		if (!value) return new NullObject();
		if (!REG_FN_REL_START.test(value)) return value;
	} else return new NullObject();
	const cacheKey = createCacheKey({
		namespace: NAMESPACE$3,
		name: "extractOriginColor",
		value
	}, opt);
	const cachedResult = getCache(cacheKey);
	if (cachedResult instanceof CacheItem) {
		if (cachedResult.isNull) return cachedResult;
		return cachedResult.item;
	}
	if (/currentcolor/.test(value)) if (currentColor) value = value.replace(/currentcolor/g, currentColor);
	else {
		setCache(cacheKey, null);
		return new NullObject();
	}
	let colorSpace = "";
	if (REG_FN_REL_CAPT.test(value)) [, colorSpace] = value.match(REG_FN_REL_CAPT);
	opt.colorSpace = colorSpace;
	if (value.includes("light-dark(")) {
		const [, originColor = ""] = splitValue(value.replace(new RegExp(`^${colorSpace}\\(`), "").replace(/\)$/, ""));
		const specifiedOriginColor = resolveColor(originColor, {
			colorScheme,
			format: VAL_SPEC
		});
		if (specifiedOriginColor === "") {
			setCache(cacheKey, null);
			return new NullObject();
		}
		if (format === "specifiedValue") value = value.replace(originColor, specifiedOriginColor);
		else {
			const resolvedOriginColor = resolveColor(specifiedOriginColor, opt);
			if (isString(resolvedOriginColor)) value = value.replace(originColor, resolvedOriginColor);
		}
	}
	if (REG_COLOR_CAPT.test(value)) {
		const [, originColor] = value.match(REG_COLOR_CAPT);
		const [, restValue] = value.split(originColor);
		if (/^[a-z]+$/.test(originColor)) {
			if (!/^transparent$/.test(originColor) && !Object.hasOwn(NAMED_COLORS, originColor)) {
				setCache(cacheKey, null);
				return new NullObject();
			}
		} else if (format === "specifiedValue") {
			const resolvedOriginColor = resolveColor(originColor, opt);
			if (isString(resolvedOriginColor)) value = value.replace(originColor, resolvedOriginColor);
		}
		if (format === "specifiedValue") {
			const channelValues = resolveColorChannels(tokenize({ css: restValue }), opt);
			if (channelValues instanceof NullObject) {
				setCache(cacheKey, null);
				return channelValues;
			}
			const [v1, v2, v3, v4] = channelValues;
			let channelValue = "";
			if (isStringOrNumber(v4)) channelValue = ` ${v1} ${v2} ${v3} / ${v4})`;
			else channelValue = ` ${channelValues.join(" ")})`;
			if (restValue !== channelValue) value = value.replace(restValue, channelValue);
		}
	} else {
		const [, restValue] = value.split(REG_FN_REL_START);
		const tokens = tokenize({ css: restValue });
		const originColor = [];
		let nest = 0;
		let tokenIndex = 0;
		for (const [type, tokenValue] of tokens) {
			tokenIndex++;
			switch (type) {
				case FUNC:
				case PAREN_OPEN:
					originColor.push(tokenValue);
					nest++;
					break;
				case PAREN_CLOSE: {
					const lastValue = originColor[originColor.length - 1];
					if (lastValue === " ") originColor[originColor.length - 1] = tokenValue;
					else if (isString(lastValue)) originColor.push(tokenValue);
					nest--;
					break;
				}
				case W_SPACE: {
					const lastValue = originColor[originColor.length - 1];
					if (isString(lastValue) && !lastValue.endsWith("(") && lastValue !== " ") originColor.push(tokenValue);
					break;
				}
				default: if (type !== COMMENT && type !== EOF) originColor.push(tokenValue);
			}
			if (nest === 0) break;
		}
		const resolvedOriginColor = resolveRelativeColor(originColor.join("").trim(), opt);
		if (resolvedOriginColor instanceof NullObject) {
			setCache(cacheKey, null);
			return resolvedOriginColor;
		}
		const channelValues = resolveColorChannels(tokens.slice(tokenIndex), opt);
		if (channelValues instanceof NullObject) {
			setCache(cacheKey, null);
			return channelValues;
		}
		const [v1, v2, v3, v4] = channelValues;
		let channelValue = "";
		if (isStringOrNumber(v4)) channelValue = ` ${v1} ${v2} ${v3} / ${v4})`;
		else channelValue = ` ${channelValues.join(" ")})`;
		value = value.replace(restValue, `${resolvedOriginColor}${channelValue}`);
	}
	setCache(cacheKey, value);
	return value;
}
/**
* resolve relative color
* @param value - CSS relative color value
* @param [opt] - options
* @returns resolved value
*/
function resolveRelativeColor(value, opt = {}) {
	const { format = "" } = opt;
	if (isString(value)) {
		if (REG_FN_VAR$2.test(value)) {
			if (format !== "specifiedValue") throw new SyntaxError(`Unexpected token ${FN_VAR} found.`);
			return value;
		} else if (!REG_FN_REL$2.test(value)) return value;
		value = value.toLowerCase().trim();
	} else throw new TypeError(`${value} is not a string.`);
	const cacheKey = createCacheKey({
		namespace: NAMESPACE$3,
		name: "resolveRelativeColor",
		value
	}, opt);
	const cachedResult = getCache(cacheKey);
	if (cachedResult instanceof CacheItem) {
		if (cachedResult.isNull) return cachedResult;
		return cachedResult.item;
	}
	const originColor = extractOriginColor(value, opt);
	if (originColor instanceof NullObject) {
		setCache(cacheKey, null);
		return originColor;
	}
	value = originColor;
	if (format === "specifiedValue") {
		if (value.startsWith("rgba(")) value = value.replace("rgba(", "rgb(");
		else if (value.startsWith("hsla(")) value = value.replace("hsla(", "hsl(");
		return value;
	}
	const parsedComponents = color(parseComponentValue(tokenize({ css: value })));
	if (!parsedComponents) {
		setCache(cacheKey, null);
		return new NullObject();
	}
	const { alpha: alphaComponent, channels: channelsComponent, colorNotation, syntaxFlags } = parsedComponents;
	let alpha;
	if (Number.isNaN(Number(alphaComponent))) if (syntaxFlags instanceof Set && syntaxFlags.has(KEY_NONE)) alpha = NONE;
	else alpha = 0;
	else alpha = roundToPrecision(Number(alphaComponent), OCT);
	let v1;
	let v2;
	let v3;
	[v1, v2, v3] = channelsComponent;
	let resolvedValue;
	if (REG_CS_CIE.test(colorNotation)) {
		const hasNone = syntaxFlags instanceof Set && syntaxFlags.has(KEY_NONE);
		if (Number.isNaN(v1)) if (hasNone) v1 = NONE;
		else v1 = 0;
		else v1 = roundToPrecision(v1, HEX);
		if (Number.isNaN(v2)) if (hasNone) v2 = NONE;
		else v2 = 0;
		else v2 = roundToPrecision(v2, HEX);
		if (Number.isNaN(v3)) if (hasNone) v3 = NONE;
		else v3 = 0;
		else v3 = roundToPrecision(v3, HEX);
		if (alpha === 1) resolvedValue = `${colorNotation}(${v1} ${v2} ${v3})`;
		else resolvedValue = `${colorNotation}(${v1} ${v2} ${v3} / ${alpha})`;
	} else if (REG_CS_HSL.test(colorNotation)) {
		if (Number.isNaN(v1)) v1 = 0;
		if (Number.isNaN(v2)) v2 = 0;
		if (Number.isNaN(v3)) v3 = 0;
		let [r, g, b] = convertColorToRgb(`${colorNotation}(${v1} ${v2} ${v3} / ${alpha})`);
		r = roundToPrecision(r / MAX_RGB, DEC);
		g = roundToPrecision(g / MAX_RGB, DEC);
		b = roundToPrecision(b / MAX_RGB, DEC);
		if (alpha === 1) resolvedValue = `color(srgb ${r} ${g} ${b})`;
		else resolvedValue = `color(srgb ${r} ${g} ${b} / ${alpha})`;
	} else {
		const cs = colorNotation === "rgb" ? "srgb" : colorNotation;
		const hasNone = syntaxFlags instanceof Set && syntaxFlags.has(KEY_NONE);
		if (Number.isNaN(v1)) if (hasNone) v1 = NONE;
		else v1 = 0;
		else v1 = roundToPrecision(v1, DEC);
		if (Number.isNaN(v2)) if (hasNone) v2 = NONE;
		else v2 = 0;
		else v2 = roundToPrecision(v2, DEC);
		if (Number.isNaN(v3)) if (hasNone) v3 = NONE;
		else v3 = 0;
		else v3 = roundToPrecision(v3, DEC);
		if (alpha === 1) resolvedValue = `color(${cs} ${v1} ${v2} ${v3})`;
		else resolvedValue = `color(${cs} ${v1} ${v2} ${v3} / ${alpha})`;
	}
	setCache(cacheKey, resolvedValue);
	return resolvedValue;
}
var PAREN_CLOSE, COMMENT, DELIM, DIM, EOF, FUNC, IDENT, NUM, PAREN_OPEN, PCT, W_SPACE, KEY_NONE, NAMESPACE$3, OCT, DEC, HEX, MAX_PCT, MAX_RGB, COLOR_CHANNELS, REG_COLOR_CAPT, REG_CS_HSL, REG_CS_CIE, REG_FN_CALC_SUM, REG_FN_MATH_START, REG_FN_REL$2, REG_FN_REL_CAPT, REG_FN_REL_START, REG_FN_VAR$2;
var init_relative_color = __esmMin((() => {
	init_cache();
	init_common();
	init_constant();
	init_color();
	init_resolve();
	init_util();
	init_css_calc();
	init_dist$4();
	init_dist();
	init_dist$3();
	({CloseParen: PAREN_CLOSE, Comment: COMMENT, Delim: DELIM, Dimension: DIM, EOF, Function: FUNC, Ident: IDENT, Number: NUM, OpenParen: PAREN_OPEN, Percentage: PCT, Whitespace: W_SPACE} = c$1);
	({HasNoneKeywords: KEY_NONE} = me);
	NAMESPACE$3 = "relative-color";
	OCT = 8;
	DEC = 10;
	HEX = 16;
	MAX_PCT = 100;
	MAX_RGB = 255;
	COLOR_CHANNELS = new Map([
		["color", [
			"r",
			"g",
			"b",
			"alpha"
		]],
		["hsl", [
			"h",
			"s",
			"l",
			"alpha"
		]],
		["hsla", [
			"h",
			"s",
			"l",
			"alpha"
		]],
		["hwb", [
			"h",
			"w",
			"b",
			"alpha"
		]],
		["lab", [
			"l",
			"a",
			"b",
			"alpha"
		]],
		["lch", [
			"l",
			"c",
			"h",
			"alpha"
		]],
		["oklab", [
			"l",
			"a",
			"b",
			"alpha"
		]],
		["oklch", [
			"l",
			"c",
			"h",
			"alpha"
		]],
		["rgb", [
			"r",
			"g",
			"b",
			"alpha"
		]],
		["rgba", [
			"r",
			"g",
			"b",
			"alpha"
		]]
	]);
	REG_COLOR_CAPT = new RegExp(`^${FN_REL}(${SYN_COLOR_TYPE}|${SYN_MIX})\\s+`);
	REG_CS_HSL = /(?:hsla?|hwb)$/;
	REG_CS_CIE = new RegExp(`^(?:${CS_LAB}|${CS_LCH})$`);
	REG_FN_CALC_SUM = /^(?:abs|sig?n|cos|tan)\(/;
	REG_FN_MATH_START = new RegExp(SYN_FN_MATH_START);
	REG_FN_REL$2 = new RegExp(FN_REL);
	REG_FN_REL_CAPT = new RegExp(`^${FN_REL_CAPT}`);
	REG_FN_REL_START = new RegExp(`^${FN_REL}`);
	REG_FN_VAR$2 = new RegExp(SYN_FN_VAR);
}));
//#endregion
//#region node_modules/@asamuzakjp/css-color/dist/esm/js/resolve.js
var NAMESPACE$2, RGB_TRANSPARENT, REG_FN_CALC$1, REG_FN_LIGHT_DARK, REG_FN_REL$1, REG_FN_VAR$1, resolveColor, resolve;
var init_resolve = __esmMin((() => {
	init_cache();
	init_common();
	init_constant();
	init_color();
	init_relative_color();
	init_util();
	init_css_var();
	init_css_calc();
	NAMESPACE$2 = "resolve";
	RGB_TRANSPARENT = "rgba(0, 0, 0, 0)";
	REG_FN_CALC$1 = new RegExp(SYN_FN_CALC);
	REG_FN_LIGHT_DARK = new RegExp(SYN_FN_LIGHT_DARK);
	REG_FN_REL$1 = new RegExp(SYN_FN_REL);
	REG_FN_VAR$1 = new RegExp(SYN_FN_VAR);
	resolveColor = (value, opt = {}) => {
		if (!isString(value)) throw new TypeError(`${value} is not a string.`);
		value = value.trim();
		const { colorScheme = "normal", currentColor = "", format = VAL_COMP, nullable = false } = opt;
		const cacheKey = createCacheKey({
			namespace: NAMESPACE$2,
			name: "resolve",
			value
		}, opt);
		const cachedResult = getCache(cacheKey);
		if (cachedResult instanceof CacheItem) {
			if (cachedResult.isNull) return cachedResult;
			return cachedResult.item;
		}
		if (REG_FN_VAR$1.test(value)) {
			if (format === "specifiedValue") {
				setCache(cacheKey, value);
				return value;
			}
			const resolvedVar = resolveVar(value, opt);
			if (resolvedVar instanceof NullObject) {
				const res = format === "hex" || format === "hexAlpha" || nullable ? resolvedVar : RGB_TRANSPARENT;
				setCache(cacheKey, res);
				return res;
			}
			value = resolvedVar;
		}
		if (opt.format !== format) opt.format = format;
		value = value.toLowerCase();
		if (REG_FN_LIGHT_DARK.test(value) && value.endsWith(")")) {
			const [light = "", dark = ""] = splitValue(value.replace(REG_FN_LIGHT_DARK, "").replace(/\)$/, ""), { delimiter: "," });
			if (light && dark) {
				if (format === "specifiedValue") {
					const lightColor = resolveColor(light, opt);
					const darkColor = resolveColor(dark, opt);
					const res = lightColor && darkColor ? `light-dark(${lightColor}, ${darkColor})` : "";
					setCache(cacheKey, res);
					return res;
				}
				const resolved = resolveColor(colorScheme === "dark" ? dark : light, opt);
				const res = resolved instanceof NullObject && !nullable ? RGB_TRANSPARENT : resolved;
				setCache(cacheKey, res);
				return res;
			}
			const invalidRes = format === "specifiedValue" ? "" : format === "hex" || format === "hexAlpha" ? new NullObject() : RGB_TRANSPARENT;
			setCache(cacheKey, invalidRes);
			return invalidRes;
		}
		if (REG_FN_REL$1.test(value)) {
			const resolvedRel = resolveRelativeColor(value, opt);
			if (format === "computedValue") {
				const res = resolvedRel instanceof NullObject && !nullable ? RGB_TRANSPARENT : resolvedRel;
				setCache(cacheKey, res);
				return res;
			}
			if (format === "specifiedValue") {
				const res = resolvedRel instanceof NullObject ? "" : resolvedRel;
				setCache(cacheKey, res);
				return res;
			}
			value = resolvedRel instanceof NullObject ? "" : resolvedRel;
		}
		if (REG_FN_CALC$1.test(value)) value = cssCalc(value, opt);
		let cs = "";
		let r = NaN;
		let g = NaN;
		let b = NaN;
		let alpha = NaN;
		if (value === "transparent") {
			let res;
			switch (format) {
				case VAL_SPEC:
					res = value;
					break;
				case "hex":
					res = new NullObject();
					break;
				case "hexAlpha":
					res = "#00000000";
					break;
				default: res = RGB_TRANSPARENT;
			}
			setCache(cacheKey, res);
			return res;
		}
		if (value === "currentcolor") {
			if (format === "specifiedValue") {
				setCache(cacheKey, value);
				return value;
			}
			if (currentColor) {
				let resolvedCurrent;
				if (currentColor.startsWith("color-mix(")) resolvedCurrent = resolveColorMix(currentColor, opt);
				else if (currentColor.startsWith("color(")) resolvedCurrent = resolveColorFunc(currentColor, opt);
				else resolvedCurrent = resolveColorValue(currentColor, opt);
				if (resolvedCurrent instanceof NullObject) {
					setCache(cacheKey, resolvedCurrent);
					return resolvedCurrent;
				}
				[cs, r, g, b, alpha] = resolvedCurrent;
			} else {
				const res = format === "computedValue" ? RGB_TRANSPARENT : value;
				if (format === "computedValue") {
					setCache(cacheKey, res);
					return res;
				}
			}
		} else if (format === "specifiedValue") {
			let res = "";
			if (value.startsWith("color-mix(")) res = resolveColorMix(value, opt);
			else if (value.startsWith("color(")) {
				const [scs, rr, gg, bb, aa] = resolveColorFunc(value, opt);
				res = aa === 1 ? `color(${scs} ${rr} ${gg} ${bb})` : `color(${scs} ${rr} ${gg} ${bb} / ${aa})`;
			} else {
				const rgb = resolveColorValue(value, opt);
				if (isString(rgb)) res = rgb;
				else {
					const [scs, rr, gg, bb, aa] = rgb;
					if (scs === "rgb") res = aa === 1 ? `${scs}(${rr}, ${gg}, ${bb})` : `${scs}a(${rr}, ${gg}, ${bb}, ${aa})`;
					else res = aa === 1 ? `${scs}(${rr} ${gg} ${bb})` : `${scs}(${rr} ${gg} ${bb} / ${aa})`;
				}
			}
			setCache(cacheKey, res);
			return res;
		} else if (value.startsWith("color-mix(")) {
			if (currentColor) value = value.replace(/currentcolor/g, currentColor);
			value = value.replace(/transparent/g, RGB_TRANSPARENT);
			const resolvedMix = resolveColorMix(value, opt);
			if (resolvedMix instanceof NullObject) {
				setCache(cacheKey, resolvedMix);
				return resolvedMix;
			}
			[cs, r, g, b, alpha] = resolvedMix;
		} else if (value.startsWith("color(")) {
			const resolvedFunc = resolveColorFunc(value, opt);
			if (resolvedFunc instanceof NullObject) {
				setCache(cacheKey, resolvedFunc);
				return resolvedFunc;
			}
			[cs, r, g, b, alpha] = resolvedFunc;
		} else if (value) {
			const resolvedVal = resolveColorValue(value, opt);
			if (resolvedVal instanceof NullObject) {
				setCache(cacheKey, resolvedVal);
				return resolvedVal;
			}
			[cs, r, g, b, alpha] = resolvedVal;
		}
		let finalRes = "";
		switch (format) {
			case "hex":
			case "hexAlpha":
				if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b) || Number.isNaN(alpha) || format === "hex" && alpha === 0) finalRes = new NullObject();
				else finalRes = convertRgbToHex([
					r,
					g,
					b,
					format === "hex" ? 1 : alpha
				]);
				break;
			default: if (cs === "rgb") finalRes = alpha === 1 ? `${cs}(${r}, ${g}, ${b})` : `${cs}a(${r}, ${g}, ${b}, ${alpha})`;
			else if ([
				"lab",
				"lch",
				"oklab",
				"oklch"
			].includes(cs)) finalRes = alpha === 1 ? `${cs}(${r} ${g} ${b})` : `${cs}(${r} ${g} ${b} / ${alpha})`;
			else finalRes = alpha === 1 ? `color(${cs} ${r} ${g} ${b})` : `color(${cs} ${r} ${g} ${b} / ${alpha})`;
		}
		setCache(cacheKey, finalRes);
		return finalRes;
	};
	resolve = (value, opt = {}) => {
		opt.nullable = false;
		const resolvedValue = resolveColor(value, opt);
		return resolvedValue instanceof NullObject ? null : resolvedValue;
	};
}));
//#endregion
//#region node_modules/@asamuzakjp/css-color/dist/esm/js/css-gradient.js
var NAMESPACE$1, DIM_ANGLE, DIM_ANGLE_PCT, DIM_LEN_PCT, DIM_LEN_PCT_POSI, DIM_LEN_POSI, CTR, L_R, T_B, S_E, AXIS_X, AXIS_Y, BLOCK, INLINE, POS_1, POS_2, POS_4, RAD_EXTENT, RAD_SIZE, RAD_SHAPE, FROM_ANGLE, AT_POSITION, TO_SIDE_CORNER, IN_COLOR_SPACE, LINE_SYNTAX_LINEAR, LINE_SYNTAX_RADIAL, LINE_SYNTAX_CONIC, DEFAULT_LINEAR, DEFAULT_RADIAL, DEFAULT_CONIC, IS_CONIC, IS_LINEAR, IS_RADIAL, REG_COLOR_HINT_CONIC, REG_COLOR_HINT_NON_CONIC, REG_DIM_CONIC, REG_DIM_NON_CONIC, REG_GRAD, REG_GRAD_CAPT, REG_LINE_CONIC, REG_LINE_LINEAR, REG_LINE_RADIAL, getGradientType, validateGradientLine, validateColorStopList, parseGradient, resolveGradient, isGradient;
var init_css_gradient = __esmMin((() => {
	init_cache();
	init_common();
	init_constant();
	init_resolve();
	init_util();
	NAMESPACE$1 = "css-gradient";
	DIM_ANGLE = `${NUM$1}(?:${ANGLE})`;
	DIM_ANGLE_PCT = `${DIM_ANGLE}|${PCT$1}`;
	DIM_LEN_PCT = `${`${NUM$1}(?:${LENGTH})|0`}|${PCT$1}`;
	DIM_LEN_PCT_POSI = `${NUM_POSITIVE}(?:${LENGTH}|%)|0`;
	DIM_LEN_POSI = `${NUM_POSITIVE}(?:${LENGTH})|0`;
	CTR = "center";
	L_R = "left|right";
	T_B = "top|bottom";
	S_E = "start|end";
	AXIS_X = `${L_R}|x-(?:${S_E})`;
	AXIS_Y = `${T_B}|y-(?:${S_E})`;
	BLOCK = `block-(?:${S_E})`;
	INLINE = `inline-(?:${S_E})`;
	POS_1 = `${CTR}|${AXIS_X}|${AXIS_Y}|${BLOCK}|${INLINE}|${DIM_LEN_PCT}`;
	POS_2 = [
		`(?:${CTR}|${AXIS_X})\\s+(?:${CTR}|${AXIS_Y})`,
		`(?:${CTR}|${AXIS_Y})\\s+(?:${CTR}|${AXIS_X})`,
		`(?:${CTR}|${AXIS_X}|${DIM_LEN_PCT})\\s+(?:${CTR}|${AXIS_Y}|${DIM_LEN_PCT})`,
		`(?:${CTR}|${BLOCK})\\s+(?:${CTR}|${INLINE})`,
		`(?:${CTR}|${INLINE})\\s+(?:${CTR}|${BLOCK})`,
		`(?:${CTR}|${S_E})\\s+(?:${CTR}|${S_E})`
	].join("|");
	POS_4 = [
		`(?:${AXIS_X})\\s+(?:${DIM_LEN_PCT})\\s+(?:${AXIS_Y})\\s+(?:${DIM_LEN_PCT})`,
		`(?:${AXIS_Y})\\s+(?:${DIM_LEN_PCT})\\s+(?:${AXIS_X})\\s+(?:${DIM_LEN_PCT})`,
		`(?:${BLOCK})\\s+(?:${DIM_LEN_PCT})\\s+(?:${INLINE})\\s+(?:${DIM_LEN_PCT})`,
		`(?:${INLINE})\\s+(?:${DIM_LEN_PCT})\\s+(?:${BLOCK})\\s+(?:${DIM_LEN_PCT})`,
		`(?:${S_E})\\s+(?:${DIM_LEN_PCT})\\s+(?:${S_E})\\s+(?:${DIM_LEN_PCT})`
	].join("|");
	RAD_EXTENT = "(?:clos|farth)est-(?:corner|side)";
	RAD_SIZE = [
		`${RAD_EXTENT}(?:\\s+${RAD_EXTENT})?`,
		`${DIM_LEN_POSI}`,
		`(?:${DIM_LEN_PCT_POSI})\\s+(?:${DIM_LEN_PCT_POSI})`
	].join("|");
	RAD_SHAPE = "circle|ellipse";
	FROM_ANGLE = `from\\s+${DIM_ANGLE}`;
	AT_POSITION = `at\\s+(?:${POS_1}|${POS_2}|${POS_4})`;
	TO_SIDE_CORNER = `to\\s+(?:(?:${L_R})(?:\\s(?:${T_B}))?|(?:${T_B})(?:\\s(?:${L_R}))?)`;
	IN_COLOR_SPACE = `in\\s+(?:${CS_RECT}|${CS_HUE})`;
	LINE_SYNTAX_LINEAR = [`(?:${DIM_ANGLE}|${TO_SIDE_CORNER})(?:\\s+${IN_COLOR_SPACE})?`, `${IN_COLOR_SPACE}(?:\\s+(?:${DIM_ANGLE}|${TO_SIDE_CORNER}))?`].join("|");
	LINE_SYNTAX_RADIAL = [
		`(?:${RAD_SHAPE})(?:\\s+(?:${RAD_SIZE}))?(?:\\s+${AT_POSITION})?(?:\\s+${IN_COLOR_SPACE})?`,
		`(?:${RAD_SIZE})(?:\\s+(?:${RAD_SHAPE}))?(?:\\s+${AT_POSITION})?(?:\\s+${IN_COLOR_SPACE})?`,
		`${AT_POSITION}(?:\\s+${IN_COLOR_SPACE})?`,
		`${IN_COLOR_SPACE}(?:\\s+${RAD_SHAPE})(?:\\s+(?:${RAD_SIZE}))?(?:\\s+${AT_POSITION})?`,
		`${IN_COLOR_SPACE}(?:\\s+${RAD_SIZE})(?:\\s+(?:${RAD_SHAPE}))?(?:\\s+${AT_POSITION})?`,
		`${IN_COLOR_SPACE}(?:\\s+${AT_POSITION})?`
	].join("|");
	LINE_SYNTAX_CONIC = [
		`${FROM_ANGLE}(?:\\s+${AT_POSITION})?(?:\\s+${IN_COLOR_SPACE})?`,
		`${AT_POSITION}(?:\\s+${IN_COLOR_SPACE})?`,
		`${IN_COLOR_SPACE}(?:\\s+${FROM_ANGLE})?(?:\\s+${AT_POSITION})?`
	].join("|");
	DEFAULT_LINEAR = [/to\s+bottom/];
	DEFAULT_RADIAL = [
		/ellipse/,
		/farthest-corner/,
		/at\s+center/
	];
	DEFAULT_CONIC = [/at\s+center/];
	IS_CONIC = /^(?:repeating-)?conic-gradient$/;
	IS_LINEAR = /^(?:repeating-)?linear-gradient$/;
	IS_RADIAL = /^(?:repeating-)?radial-gradient$/;
	REG_COLOR_HINT_CONIC = new RegExp(`^(?:${DIM_ANGLE_PCT})$`);
	REG_COLOR_HINT_NON_CONIC = new RegExp(`^(?:${DIM_LEN_PCT})$`);
	REG_DIM_CONIC = new RegExp(`(?:\\s+(?:${DIM_ANGLE_PCT})){1,2}$`);
	REG_DIM_NON_CONIC = new RegExp(`(?:\\s+(?:${DIM_LEN_PCT})){1,2}$`);
	REG_GRAD = /^(?:repeating-)?(?:conic|linear|radial)-gradient\(/;
	REG_GRAD_CAPT = /^((?:repeating-)?(?:conic|linear|radial)-gradient)\(/;
	REG_LINE_CONIC = new RegExp(`^(?:${LINE_SYNTAX_CONIC})$`);
	REG_LINE_LINEAR = new RegExp(`^(?:${LINE_SYNTAX_LINEAR})$`);
	REG_LINE_RADIAL = new RegExp(`^(?:${LINE_SYNTAX_RADIAL})$`);
	getGradientType = (value) => {
		if (isString(value)) {
			value = value.trim();
			if (REG_GRAD.test(value)) {
				const [, type] = value.match(REG_GRAD_CAPT);
				return type;
			}
		}
		return "";
	};
	validateGradientLine = (value, type) => {
		if (isString(value) && isString(type)) {
			value = value.trim();
			type = type.trim();
			let reg = null;
			let defaultValues = [];
			if (IS_LINEAR.test(type)) {
				reg = REG_LINE_LINEAR;
				defaultValues = DEFAULT_LINEAR;
			} else if (IS_RADIAL.test(type)) {
				reg = REG_LINE_RADIAL;
				defaultValues = DEFAULT_RADIAL;
			} else if (IS_CONIC.test(type)) {
				reg = REG_LINE_CONIC;
				defaultValues = DEFAULT_CONIC;
			}
			if (reg) {
				const valid = reg.test(value);
				if (valid) {
					let line = value;
					for (const defaultValue of defaultValues) line = line.replace(defaultValue, "");
					line = line.replace(/\s{2,}/g, " ").trim();
					return {
						line,
						valid
					};
				}
				return {
					valid,
					line: value
				};
			}
		}
		return {
			line: value,
			valid: false
		};
	};
	validateColorStopList = (list, type, opt = {}) => {
		if (Array.isArray(list) && list.length > 1) {
			const isConic = IS_CONIC.test(type);
			const regColorHint = isConic ? REG_COLOR_HINT_CONIC : REG_COLOR_HINT_NON_CONIC;
			const regDimension = isConic ? REG_DIM_CONIC : REG_DIM_NON_CONIC;
			const valueList = [];
			let prevType = "";
			for (let i = 0; i < list.length; i++) {
				const item = list[i];
				if (isString(item)) if (regColorHint.test(item)) {
					if (i === 0 || prevType === "hint") return {
						colorStops: list,
						valid: false
					};
					prevType = "hint";
					valueList.push(item);
				} else {
					const itemColor = item.replace(regDimension, "");
					if (isColor(itemColor, { format: "specifiedValue" })) {
						const resolvedColor = resolveColor(itemColor, opt);
						prevType = "color";
						valueList.push(item.replace(itemColor, resolvedColor));
					} else return {
						colorStops: list,
						valid: false
					};
				}
				else return {
					colorStops: list,
					valid: false
				};
			}
			if (prevType !== "color") return {
				colorStops: list,
				valid: false
			};
			return {
				valid: true,
				colorStops: valueList
			};
		}
		return {
			colorStops: list,
			valid: false
		};
	};
	parseGradient = (value, opt = {}) => {
		if (isString(value)) {
			value = value.trim();
			const cacheKey = createCacheKey({
				namespace: NAMESPACE$1,
				name: "parseGradient",
				value
			}, opt);
			const cachedResult = getCache(cacheKey);
			if (cachedResult instanceof CacheItem) {
				if (cachedResult.isNull) return null;
				return cachedResult.item;
			}
			const type = getGradientType(value);
			const gradValue = value.replace(REG_GRAD, "").replace(/\)$/, "");
			if (type && gradValue) {
				const [lineOrColorStop = "", ...itemList] = splitValue(gradValue, { delimiter: "," });
				const regDimension = IS_CONIC.test(type) ? REG_DIM_CONIC : REG_DIM_NON_CONIC;
				let colorStop = "";
				if (regDimension.test(lineOrColorStop)) {
					const itemColor = lineOrColorStop.replace(regDimension, "");
					if (isColor(itemColor, { format: "specifiedValue" })) {
						const resolvedColor = resolveColor(itemColor, opt);
						colorStop = lineOrColorStop.replace(itemColor, resolvedColor);
					}
				} else if (isColor(lineOrColorStop, { format: "specifiedValue" })) colorStop = resolveColor(lineOrColorStop, opt);
				if (colorStop) {
					itemList.unshift(colorStop);
					const { colorStops, valid } = validateColorStopList(itemList, type, opt);
					if (valid) {
						const res = {
							value,
							type,
							colorStopList: colorStops
						};
						setCache(cacheKey, res);
						return res;
					}
				} else if (itemList.length > 1) {
					const { line: gradientLine, valid: validLine } = validateGradientLine(lineOrColorStop, type);
					const { colorStops, valid: validColorStops } = validateColorStopList(itemList, type, opt);
					if (validLine && validColorStops) {
						const res = {
							value,
							type,
							gradientLine,
							colorStopList: colorStops
						};
						setCache(cacheKey, res);
						return res;
					}
				}
			}
			setCache(cacheKey, null);
			return null;
		}
		return null;
	};
	resolveGradient = (value, opt = {}) => {
		const { format = VAL_COMP } = opt;
		const gradient = parseGradient(value, opt);
		if (gradient) {
			const { type = "", gradientLine = "", colorStopList = [] } = gradient;
			if (type && Array.isArray(colorStopList) && colorStopList.length > 1) {
				if (gradientLine) return `${type}(${gradientLine}, ${colorStopList.join(", ")})`;
				return `${type}(${colorStopList.join(", ")})`;
			}
		}
		if (format === "specifiedValue") return "";
		return "none";
	};
	isGradient = (value, opt = {}) => {
		return parseGradient(value, opt) !== null;
	};
}));
//#endregion
//#region node_modules/@asamuzakjp/css-color/dist/esm/js/convert.js
var NAMESPACE, REG_FN_CALC, REG_FN_REL, REG_FN_VAR, preProcess, createColorConverter, numberToHex, colorToHex, colorToHsl, colorToHwb, colorToLab, colorToLch, colorToOklab, colorToOklch, colorToRgb, colorToXyz, colorToXyzD50, convert;
var init_convert = __esmMin((() => {
	init_cache();
	init_common();
	init_constant();
	init_color();
	init_relative_color();
	init_resolve();
	init_css_var();
	init_css_calc();
	NAMESPACE = "convert";
	REG_FN_CALC = new RegExp(SYN_FN_CALC);
	REG_FN_REL = new RegExp(SYN_FN_REL);
	REG_FN_VAR = new RegExp(SYN_FN_VAR);
	preProcess = (value, opt = {}) => {
		if (!isString(value)) return new NullObject();
		value = value.trim();
		if (!value) return new NullObject();
		const cacheKey = createCacheKey({
			namespace: NAMESPACE,
			name: "preProcess",
			value
		}, opt);
		const cachedResult = getCache(cacheKey);
		if (cachedResult instanceof CacheItem) {
			if (cachedResult.isNull) return cachedResult;
			return cachedResult.item;
		}
		let res = value;
		if (REG_FN_VAR.test(value)) {
			const resolved = resolveVar(value, opt);
			if (isString(resolved)) res = resolved;
			else {
				setCache(cacheKey, null);
				return new NullObject();
			}
		}
		if (isString(res)) {
			if (REG_FN_REL.test(res)) {
				const resolved = resolveRelativeColor(res, opt);
				if (isString(resolved)) res = resolved;
				else {
					setCache(cacheKey, null);
					return new NullObject();
				}
			} else if (REG_FN_CALC.test(res)) res = cssCalc(res, opt);
		}
		if (isString(res)) {
			if (res.startsWith("color-mix")) res = resolveColor(res, {
				...opt,
				format: VAL_COMP,
				nullable: true
			});
		}
		setCache(cacheKey, res);
		return res;
	};
	createColorConverter = (name, format, convertFn) => {
		const colorConverterFn = (value, opt = {}) => {
			if (!isString(value)) throw new TypeError(`${value} is not a string.`);
			const resolved = preProcess(value, opt);
			if (resolved instanceof NullObject) return [
				0,
				0,
				0,
				0
			];
			const val = resolved.toLowerCase();
			const cacheKey = createCacheKey({
				namespace: NAMESPACE,
				name,
				value: val
			}, opt);
			const cached = getCache(cacheKey);
			if (cached instanceof CacheItem) return cached.item;
			const result = convertFn(val, {
				...opt,
				format
			});
			setCache(cacheKey, result);
			return result;
		};
		return colorConverterFn;
	};
	numberToHex = (value) => numberToHexString(value);
	colorToHex = (value, opt = {}) => {
		if (!isString(value)) throw new TypeError(`${value} is not a string.`);
		const resolved = preProcess(value, opt);
		if (resolved instanceof NullObject) return null;
		const val = resolved.toLowerCase();
		const cacheKey = createCacheKey({
			namespace: NAMESPACE,
			name: "colorToHex",
			value: val
		}, opt);
		const cached = getCache(cacheKey);
		if (cached instanceof CacheItem) {
			if (cached.isNull) return null;
			return cached.item;
		}
		const hex = resolveColor(val, {
			...opt,
			nullable: true,
			format: opt.alpha ? "hexAlpha" : "hex"
		});
		if (isString(hex)) {
			setCache(cacheKey, hex);
			return hex;
		}
		setCache(cacheKey, null);
		return null;
	};
	colorToHsl = createColorConverter("colorToHsl", "hsl", convertColorToHsl);
	colorToHwb = createColorConverter("colorToHwb", "hwb", convertColorToHwb);
	colorToLab = createColorConverter("colorToLab", "lab", convertColorToLab);
	colorToLch = createColorConverter("colorToLch", "lch", convertColorToLch);
	colorToOklab = createColorConverter("colorToOklab", "oklab", convertColorToOklab);
	colorToOklch = createColorConverter("colorToOklch", "oklch", convertColorToOklch);
	colorToRgb = createColorConverter("colorToRgb", "rgb", convertColorToRgb);
	colorToXyz = (value, opt = {}) => {
		if (!isString(value)) throw new TypeError(`${value} is not a string.`);
		const resolved = preProcess(value, opt);
		if (resolved instanceof NullObject) return [
			0,
			0,
			0,
			0
		];
		const val = resolved.toLowerCase();
		const cacheKey = createCacheKey({
			namespace: NAMESPACE,
			name: "colorToXyz",
			value: val
		}, opt);
		const cached = getCache(cacheKey);
		if (cached instanceof CacheItem) return cached.item;
		let parsed;
		if (val.startsWith("color(")) parsed = parseColorFunc(val, opt);
		else parsed = parseColorValue(val, opt);
		const [, ...xyz] = parsed;
		setCache(cacheKey, xyz);
		return xyz;
	};
	colorToXyzD50 = (value, opt = {}) => {
		opt.d50 = true;
		return colorToXyz(value, opt);
	};
	convert = {
		colorToHex,
		colorToHsl,
		colorToHwb,
		colorToLab,
		colorToLch,
		colorToOklab,
		colorToOklch,
		colorToRgb,
		colorToXyz,
		colorToXyzD50,
		numberToHex
	};
}));
//#endregion
//#region node_modules/@asamuzakjp/css-color/dist/esm/index.js
var esm_exports = /* @__PURE__ */ __exportAll({
	convert: () => convert,
	resolve: () => resolve,
	utils: () => utils
});
var utils;
var init_esm = __esmMin((() => {
	init_resolve();
	init_util();
	init_css_var();
	init_css_calc();
	init_css_gradient();
	init_convert();
	utils = {
		cssCalc,
		cssVar,
		extractDashedIdent,
		isAbsoluteFontSize,
		isAbsoluteSizeOrLength,
		isColor,
		isGradient,
		resolveGradient,
		resolveLengthInPixels,
		splitValue
	};
}));
//#endregion
export { init_src as i, init_esm as n, GenerationalCache as r, esm_exports as t };
