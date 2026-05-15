import { o as __toCommonJS, s as __toESM, t as __commonJSMin } from "../_runtime.mjs";
import { N as require_react } from "./@base-ui/react+[...].mjs";
import { t as require_lib$2 } from "./html-dom-parser.mjs";
import { n as init_dist, t as dist_exports } from "./domhandler.mjs";
//#region node_modules/react-property/lib/possibleStandardNamesOptimized.js
var require_possibleStandardNamesOptimized = /* @__PURE__ */ __commonJSMin(((exports) => {
	exports.SAME = 0;
	exports.CAMELCASE = 1;
	exports.possibleStandardNames = {
		accept: 0,
		acceptCharset: 1,
		"accept-charset": "acceptCharset",
		accessKey: 1,
		action: 0,
		allowFullScreen: 1,
		alt: 0,
		as: 0,
		async: 0,
		autoCapitalize: 1,
		autoComplete: 1,
		autoCorrect: 1,
		autoFocus: 1,
		autoPlay: 1,
		autoSave: 1,
		capture: 0,
		cellPadding: 1,
		cellSpacing: 1,
		challenge: 0,
		charSet: 1,
		checked: 0,
		children: 0,
		cite: 0,
		class: "className",
		classID: 1,
		className: 1,
		cols: 0,
		colSpan: 1,
		content: 0,
		contentEditable: 1,
		contextMenu: 1,
		controls: 0,
		controlsList: 1,
		coords: 0,
		crossOrigin: 1,
		dangerouslySetInnerHTML: 1,
		data: 0,
		dateTime: 1,
		default: 0,
		defaultChecked: 1,
		defaultValue: 1,
		defer: 0,
		dir: 0,
		disabled: 0,
		disablePictureInPicture: 1,
		disableRemotePlayback: 1,
		download: 0,
		draggable: 0,
		encType: 1,
		enterKeyHint: 1,
		for: "htmlFor",
		form: 0,
		formMethod: 1,
		formAction: 1,
		formEncType: 1,
		formNoValidate: 1,
		formTarget: 1,
		frameBorder: 1,
		headers: 0,
		height: 0,
		hidden: 0,
		high: 0,
		href: 0,
		hrefLang: 1,
		htmlFor: 1,
		httpEquiv: 1,
		"http-equiv": "httpEquiv",
		icon: 0,
		id: 0,
		innerHTML: 1,
		inputMode: 1,
		integrity: 0,
		is: 0,
		itemID: 1,
		itemProp: 1,
		itemRef: 1,
		itemScope: 1,
		itemType: 1,
		keyParams: 1,
		keyType: 1,
		kind: 0,
		label: 0,
		lang: 0,
		list: 0,
		loop: 0,
		low: 0,
		manifest: 0,
		marginWidth: 1,
		marginHeight: 1,
		max: 0,
		maxLength: 1,
		media: 0,
		mediaGroup: 1,
		method: 0,
		min: 0,
		minLength: 1,
		multiple: 0,
		muted: 0,
		name: 0,
		noModule: 1,
		nonce: 0,
		noValidate: 1,
		open: 0,
		optimum: 0,
		pattern: 0,
		placeholder: 0,
		playsInline: 1,
		poster: 0,
		preload: 0,
		profile: 0,
		radioGroup: 1,
		readOnly: 1,
		referrerPolicy: 1,
		rel: 0,
		required: 0,
		reversed: 0,
		role: 0,
		rows: 0,
		rowSpan: 1,
		sandbox: 0,
		scope: 0,
		scoped: 0,
		scrolling: 0,
		seamless: 0,
		selected: 0,
		shape: 0,
		size: 0,
		sizes: 0,
		span: 0,
		spellCheck: 1,
		src: 0,
		srcDoc: 1,
		srcLang: 1,
		srcSet: 1,
		start: 0,
		step: 0,
		style: 0,
		summary: 0,
		tabIndex: 1,
		target: 0,
		title: 0,
		type: 0,
		useMap: 1,
		value: 0,
		width: 0,
		wmode: 0,
		wrap: 0,
		about: 0,
		accentHeight: 1,
		"accent-height": "accentHeight",
		accumulate: 0,
		additive: 0,
		alignmentBaseline: 1,
		"alignment-baseline": "alignmentBaseline",
		allowReorder: 1,
		alphabetic: 0,
		amplitude: 0,
		arabicForm: 1,
		"arabic-form": "arabicForm",
		ascent: 0,
		attributeName: 1,
		attributeType: 1,
		autoReverse: 1,
		azimuth: 0,
		baseFrequency: 1,
		baselineShift: 1,
		"baseline-shift": "baselineShift",
		baseProfile: 1,
		bbox: 0,
		begin: 0,
		bias: 0,
		by: 0,
		calcMode: 1,
		capHeight: 1,
		"cap-height": "capHeight",
		clip: 0,
		clipPath: 1,
		"clip-path": "clipPath",
		clipPathUnits: 1,
		clipRule: 1,
		"clip-rule": "clipRule",
		color: 0,
		colorInterpolation: 1,
		"color-interpolation": "colorInterpolation",
		colorInterpolationFilters: 1,
		"color-interpolation-filters": "colorInterpolationFilters",
		colorProfile: 1,
		"color-profile": "colorProfile",
		colorRendering: 1,
		"color-rendering": "colorRendering",
		contentScriptType: 1,
		contentStyleType: 1,
		cursor: 0,
		cx: 0,
		cy: 0,
		d: 0,
		datatype: 0,
		decelerate: 0,
		descent: 0,
		diffuseConstant: 1,
		direction: 0,
		display: 0,
		divisor: 0,
		dominantBaseline: 1,
		"dominant-baseline": "dominantBaseline",
		dur: 0,
		dx: 0,
		dy: 0,
		edgeMode: 1,
		elevation: 0,
		enableBackground: 1,
		"enable-background": "enableBackground",
		end: 0,
		exponent: 0,
		externalResourcesRequired: 1,
		fill: 0,
		fillOpacity: 1,
		"fill-opacity": "fillOpacity",
		fillRule: 1,
		"fill-rule": "fillRule",
		filter: 0,
		filterRes: 1,
		filterUnits: 1,
		floodOpacity: 1,
		"flood-opacity": "floodOpacity",
		floodColor: 1,
		"flood-color": "floodColor",
		focusable: 0,
		fontFamily: 1,
		"font-family": "fontFamily",
		fontSize: 1,
		"font-size": "fontSize",
		fontSizeAdjust: 1,
		"font-size-adjust": "fontSizeAdjust",
		fontStretch: 1,
		"font-stretch": "fontStretch",
		fontStyle: 1,
		"font-style": "fontStyle",
		fontVariant: 1,
		"font-variant": "fontVariant",
		fontWeight: 1,
		"font-weight": "fontWeight",
		format: 0,
		from: 0,
		fx: 0,
		fy: 0,
		g1: 0,
		g2: 0,
		glyphName: 1,
		"glyph-name": "glyphName",
		glyphOrientationHorizontal: 1,
		"glyph-orientation-horizontal": "glyphOrientationHorizontal",
		glyphOrientationVertical: 1,
		"glyph-orientation-vertical": "glyphOrientationVertical",
		glyphRef: 1,
		gradientTransform: 1,
		gradientUnits: 1,
		hanging: 0,
		horizAdvX: 1,
		"horiz-adv-x": "horizAdvX",
		horizOriginX: 1,
		"horiz-origin-x": "horizOriginX",
		ideographic: 0,
		imageRendering: 1,
		"image-rendering": "imageRendering",
		in2: 0,
		in: 0,
		inlist: 0,
		intercept: 0,
		k1: 0,
		k2: 0,
		k3: 0,
		k4: 0,
		k: 0,
		kernelMatrix: 1,
		kernelUnitLength: 1,
		kerning: 0,
		keyPoints: 1,
		keySplines: 1,
		keyTimes: 1,
		lengthAdjust: 1,
		letterSpacing: 1,
		"letter-spacing": "letterSpacing",
		lightingColor: 1,
		"lighting-color": "lightingColor",
		limitingConeAngle: 1,
		local: 0,
		markerEnd: 1,
		"marker-end": "markerEnd",
		markerHeight: 1,
		markerMid: 1,
		"marker-mid": "markerMid",
		markerStart: 1,
		"marker-start": "markerStart",
		markerUnits: 1,
		markerWidth: 1,
		mask: 0,
		maskContentUnits: 1,
		maskUnits: 1,
		mathematical: 0,
		mode: 0,
		numOctaves: 1,
		offset: 0,
		opacity: 0,
		operator: 0,
		order: 0,
		orient: 0,
		orientation: 0,
		origin: 0,
		overflow: 0,
		overlinePosition: 1,
		"overline-position": "overlinePosition",
		overlineThickness: 1,
		"overline-thickness": "overlineThickness",
		paintOrder: 1,
		"paint-order": "paintOrder",
		panose1: 0,
		"panose-1": "panose1",
		pathLength: 1,
		patternContentUnits: 1,
		patternTransform: 1,
		patternUnits: 1,
		pointerEvents: 1,
		"pointer-events": "pointerEvents",
		points: 0,
		pointsAtX: 1,
		pointsAtY: 1,
		pointsAtZ: 1,
		prefix: 0,
		preserveAlpha: 1,
		preserveAspectRatio: 1,
		primitiveUnits: 1,
		property: 0,
		r: 0,
		radius: 0,
		refX: 1,
		refY: 1,
		renderingIntent: 1,
		"rendering-intent": "renderingIntent",
		repeatCount: 1,
		repeatDur: 1,
		requiredExtensions: 1,
		requiredFeatures: 1,
		resource: 0,
		restart: 0,
		result: 0,
		results: 0,
		rotate: 0,
		rx: 0,
		ry: 0,
		scale: 0,
		security: 0,
		seed: 0,
		shapeRendering: 1,
		"shape-rendering": "shapeRendering",
		slope: 0,
		spacing: 0,
		specularConstant: 1,
		specularExponent: 1,
		speed: 0,
		spreadMethod: 1,
		startOffset: 1,
		stdDeviation: 1,
		stemh: 0,
		stemv: 0,
		stitchTiles: 1,
		stopColor: 1,
		"stop-color": "stopColor",
		stopOpacity: 1,
		"stop-opacity": "stopOpacity",
		strikethroughPosition: 1,
		"strikethrough-position": "strikethroughPosition",
		strikethroughThickness: 1,
		"strikethrough-thickness": "strikethroughThickness",
		string: 0,
		stroke: 0,
		strokeDasharray: 1,
		"stroke-dasharray": "strokeDasharray",
		strokeDashoffset: 1,
		"stroke-dashoffset": "strokeDashoffset",
		strokeLinecap: 1,
		"stroke-linecap": "strokeLinecap",
		strokeLinejoin: 1,
		"stroke-linejoin": "strokeLinejoin",
		strokeMiterlimit: 1,
		"stroke-miterlimit": "strokeMiterlimit",
		strokeWidth: 1,
		"stroke-width": "strokeWidth",
		strokeOpacity: 1,
		"stroke-opacity": "strokeOpacity",
		suppressContentEditableWarning: 1,
		suppressHydrationWarning: 1,
		surfaceScale: 1,
		systemLanguage: 1,
		tableValues: 1,
		targetX: 1,
		targetY: 1,
		textAnchor: 1,
		"text-anchor": "textAnchor",
		textDecoration: 1,
		"text-decoration": "textDecoration",
		textLength: 1,
		textRendering: 1,
		"text-rendering": "textRendering",
		to: 0,
		transform: 0,
		typeof: 0,
		u1: 0,
		u2: 0,
		underlinePosition: 1,
		"underline-position": "underlinePosition",
		underlineThickness: 1,
		"underline-thickness": "underlineThickness",
		unicode: 0,
		unicodeBidi: 1,
		"unicode-bidi": "unicodeBidi",
		unicodeRange: 1,
		"unicode-range": "unicodeRange",
		unitsPerEm: 1,
		"units-per-em": "unitsPerEm",
		unselectable: 0,
		vAlphabetic: 1,
		"v-alphabetic": "vAlphabetic",
		values: 0,
		vectorEffect: 1,
		"vector-effect": "vectorEffect",
		version: 0,
		vertAdvY: 1,
		"vert-adv-y": "vertAdvY",
		vertOriginX: 1,
		"vert-origin-x": "vertOriginX",
		vertOriginY: 1,
		"vert-origin-y": "vertOriginY",
		vHanging: 1,
		"v-hanging": "vHanging",
		vIdeographic: 1,
		"v-ideographic": "vIdeographic",
		viewBox: 1,
		viewTarget: 1,
		visibility: 0,
		vMathematical: 1,
		"v-mathematical": "vMathematical",
		vocab: 0,
		widths: 0,
		wordSpacing: 1,
		"word-spacing": "wordSpacing",
		writingMode: 1,
		"writing-mode": "writingMode",
		x1: 0,
		x2: 0,
		x: 0,
		xChannelSelector: 1,
		xHeight: 1,
		"x-height": "xHeight",
		xlinkActuate: 1,
		"xlink:actuate": "xlinkActuate",
		xlinkArcrole: 1,
		"xlink:arcrole": "xlinkArcrole",
		xlinkHref: 1,
		"xlink:href": "xlinkHref",
		xlinkRole: 1,
		"xlink:role": "xlinkRole",
		xlinkShow: 1,
		"xlink:show": "xlinkShow",
		xlinkTitle: 1,
		"xlink:title": "xlinkTitle",
		xlinkType: 1,
		"xlink:type": "xlinkType",
		xmlBase: 1,
		"xml:base": "xmlBase",
		xmlLang: 1,
		"xml:lang": "xmlLang",
		xmlns: 0,
		"xml:space": "xmlSpace",
		xmlnsXlink: 1,
		"xmlns:xlink": "xmlnsXlink",
		xmlSpace: 1,
		y1: 0,
		y2: 0,
		y: 0,
		yChannelSelector: 1,
		z: 0,
		zoomAndPan: 1
	};
}));
//#endregion
//#region node_modules/react-property/lib/index.js
var require_lib$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* Copyright (c) Facebook, Inc. and its affiliates.
	*
	* This source code is licensed under the MIT license found in the
	* LICENSE file in the root directory of this source tree.
	*
	* 
	*/
	var RESERVED = 0;
	var STRING = 1;
	var BOOLEANISH_STRING = 2;
	var BOOLEAN = 3;
	var OVERLOADED_BOOLEAN = 4;
	var NUMERIC = 5;
	var POSITIVE_NUMERIC = 6;
	function getPropertyInfo(name) {
		return properties.hasOwnProperty(name) ? properties[name] : null;
	}
	function PropertyInfoRecord(name, type, mustUseProperty, attributeName, attributeNamespace, sanitizeURL, removeEmptyString) {
		this.acceptsBooleans = type === BOOLEANISH_STRING || type === BOOLEAN || type === OVERLOADED_BOOLEAN;
		this.attributeName = attributeName;
		this.attributeNamespace = attributeNamespace;
		this.mustUseProperty = mustUseProperty;
		this.propertyName = name;
		this.type = type;
		this.sanitizeURL = sanitizeURL;
		this.removeEmptyString = removeEmptyString;
	}
	var properties = {};
	[
		"children",
		"dangerouslySetInnerHTML",
		"defaultValue",
		"defaultChecked",
		"innerHTML",
		"suppressContentEditableWarning",
		"suppressHydrationWarning",
		"style"
	].forEach((name) => {
		properties[name] = new PropertyInfoRecord(name, RESERVED, false, name, null, false, false);
	});
	[
		["acceptCharset", "accept-charset"],
		["className", "class"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"]
	].forEach(([name, attributeName]) => {
		properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, null, false, false);
	});
	[
		"contentEditable",
		"draggable",
		"spellCheck",
		"value"
	].forEach((name) => {
		properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, name.toLowerCase(), null, false, false);
	});
	[
		"autoReverse",
		"externalResourcesRequired",
		"focusable",
		"preserveAlpha"
	].forEach((name) => {
		properties[name] = new PropertyInfoRecord(name, BOOLEANISH_STRING, false, name, null, false, false);
	});
	[
		"allowFullScreen",
		"async",
		"autoFocus",
		"autoPlay",
		"controls",
		"default",
		"defer",
		"disabled",
		"disablePictureInPicture",
		"disableRemotePlayback",
		"formNoValidate",
		"hidden",
		"loop",
		"noModule",
		"noValidate",
		"open",
		"playsInline",
		"readOnly",
		"required",
		"reversed",
		"scoped",
		"seamless",
		"itemScope"
	].forEach((name) => {
		properties[name] = new PropertyInfoRecord(name, BOOLEAN, false, name.toLowerCase(), null, false, false);
	});
	[
		"checked",
		"multiple",
		"muted",
		"selected"
	].forEach((name) => {
		properties[name] = new PropertyInfoRecord(name, BOOLEAN, true, name, null, false, false);
	});
	["capture", "download"].forEach((name) => {
		properties[name] = new PropertyInfoRecord(name, OVERLOADED_BOOLEAN, false, name, null, false, false);
	});
	[
		"cols",
		"rows",
		"size",
		"span"
	].forEach((name) => {
		properties[name] = new PropertyInfoRecord(name, POSITIVE_NUMERIC, false, name, null, false, false);
	});
	["rowSpan", "start"].forEach((name) => {
		properties[name] = new PropertyInfoRecord(name, NUMERIC, false, name.toLowerCase(), null, false, false);
	});
	var CAMELIZE = /[\-\:]([a-z])/g;
	var capitalize = (token) => token[1].toUpperCase();
	[
		"accent-height",
		"alignment-baseline",
		"arabic-form",
		"baseline-shift",
		"cap-height",
		"clip-path",
		"clip-rule",
		"color-interpolation",
		"color-interpolation-filters",
		"color-profile",
		"color-rendering",
		"dominant-baseline",
		"enable-background",
		"fill-opacity",
		"fill-rule",
		"flood-color",
		"flood-opacity",
		"font-family",
		"font-size",
		"font-size-adjust",
		"font-stretch",
		"font-style",
		"font-variant",
		"font-weight",
		"glyph-name",
		"glyph-orientation-horizontal",
		"glyph-orientation-vertical",
		"horiz-adv-x",
		"horiz-origin-x",
		"image-rendering",
		"letter-spacing",
		"lighting-color",
		"marker-end",
		"marker-mid",
		"marker-start",
		"overline-position",
		"overline-thickness",
		"paint-order",
		"panose-1",
		"pointer-events",
		"rendering-intent",
		"shape-rendering",
		"stop-color",
		"stop-opacity",
		"strikethrough-position",
		"strikethrough-thickness",
		"stroke-dasharray",
		"stroke-dashoffset",
		"stroke-linecap",
		"stroke-linejoin",
		"stroke-miterlimit",
		"stroke-opacity",
		"stroke-width",
		"text-anchor",
		"text-decoration",
		"text-rendering",
		"underline-position",
		"underline-thickness",
		"unicode-bidi",
		"unicode-range",
		"units-per-em",
		"v-alphabetic",
		"v-hanging",
		"v-ideographic",
		"v-mathematical",
		"vector-effect",
		"vert-adv-y",
		"vert-origin-x",
		"vert-origin-y",
		"word-spacing",
		"writing-mode",
		"xmlns:xlink",
		"x-height"
	].forEach((attributeName) => {
		const name = attributeName.replace(CAMELIZE, capitalize);
		properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, null, false, false);
	});
	[
		"xlink:actuate",
		"xlink:arcrole",
		"xlink:role",
		"xlink:show",
		"xlink:title",
		"xlink:type"
	].forEach((attributeName) => {
		const name = attributeName.replace(CAMELIZE, capitalize);
		properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, "http://www.w3.org/1999/xlink", false, false);
	});
	[
		"xml:base",
		"xml:lang",
		"xml:space"
	].forEach((attributeName) => {
		const name = attributeName.replace(CAMELIZE, capitalize);
		properties[name] = new PropertyInfoRecord(name, STRING, false, attributeName, "http://www.w3.org/XML/1998/namespace", false, false);
	});
	["tabIndex", "crossOrigin"].forEach((attributeName) => {
		properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, attributeName.toLowerCase(), null, false, false);
	});
	var xlinkHref = "xlinkHref";
	properties[xlinkHref] = new PropertyInfoRecord("xlinkHref", STRING, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
	[
		"src",
		"href",
		"action",
		"formAction"
	].forEach((attributeName) => {
		properties[attributeName] = new PropertyInfoRecord(attributeName, STRING, false, attributeName.toLowerCase(), null, true, true);
	});
	var { CAMELCASE, SAME, possibleStandardNames: possibleStandardNamesOptimized } = require_possibleStandardNamesOptimized();
	/**
	* Checks whether a property name is a custom attribute.
	*
	* @see https://github.com/facebook/react/blob/15-stable/src/renderers/dom/shared/HTMLDOMPropertyConfig.js#L23-L25
	*
	* @type {(attribute: string) => boolean}
	*/
	var isCustomAttribute = RegExp.prototype.test.bind(/* @__PURE__ */ new RegExp("^(data|aria)-[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"));
	/**
	* @type {Record<string, string>}
	*/
	var possibleStandardNames = Object.keys(possibleStandardNamesOptimized).reduce((accumulator, standardName) => {
		const propName = possibleStandardNamesOptimized[standardName];
		if (propName === SAME) accumulator[standardName] = standardName;
		else if (propName === CAMELCASE) accumulator[standardName.toLowerCase()] = standardName;
		else accumulator[standardName] = propName;
		return accumulator;
	}, {});
	exports.BOOLEAN = BOOLEAN;
	exports.BOOLEANISH_STRING = BOOLEANISH_STRING;
	exports.NUMERIC = NUMERIC;
	exports.OVERLOADED_BOOLEAN = OVERLOADED_BOOLEAN;
	exports.POSITIVE_NUMERIC = POSITIVE_NUMERIC;
	exports.RESERVED = RESERVED;
	exports.STRING = STRING;
	exports.getPropertyInfo = getPropertyInfo;
	exports.isCustomAttribute = isCustomAttribute;
	exports.possibleStandardNames = possibleStandardNames;
}));
//#endregion
//#region node_modules/inline-style-parser/cjs/index.js
var require_cjs$2 = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var COMMENT_REGEX = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;
	var NEWLINE_REGEX = /\n/g;
	var WHITESPACE_REGEX = /^\s*/;
	var PROPERTY_REGEX = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/;
	var COLON_REGEX = /^:\s*/;
	var VALUE_REGEX = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/;
	var SEMICOLON_REGEX = /^[;\s]*/;
	var TRIM_REGEX = /^\s+|\s+$/g;
	var NEWLINE = "\n";
	var FORWARD_SLASH = "/";
	var ASTERISK = "*";
	var EMPTY_STRING = "";
	var TYPE_COMMENT = "comment";
	var TYPE_DECLARATION = "declaration";
	/**
	* @param {String} style
	* @param {Object} [options]
	* @return {Object[]}
	* @throws {TypeError}
	* @throws {Error}
	*/
	function index(style, options) {
		if (typeof style !== "string") throw new TypeError("First argument must be a string");
		if (!style) return [];
		options = options || {};
		/**
		* Positional.
		*/
		var lineno = 1;
		var column = 1;
		/**
		* Update lineno and column based on `str`.
		*
		* @param {String} str
		*/
		function updatePosition(str) {
			var lines = str.match(NEWLINE_REGEX);
			if (lines) lineno += lines.length;
			var i = str.lastIndexOf(NEWLINE);
			column = ~i ? str.length - i : column + str.length;
		}
		/**
		* Mark position and patch `node.position`.
		*
		* @return {Function}
		*/
		function position() {
			var start = {
				line: lineno,
				column
			};
			return function(node) {
				node.position = new Position(start);
				whitespace();
				return node;
			};
		}
		/**
		* Store position information for a node.
		*
		* @constructor
		* @property {Object} start
		* @property {Object} end
		* @property {undefined|String} source
		*/
		function Position(start) {
			this.start = start;
			this.end = {
				line: lineno,
				column
			};
			this.source = options.source;
		}
		/**
		* Non-enumerable source string.
		*/
		Position.prototype.content = style;
		/**
		* Error `msg`.
		*
		* @param {String} msg
		* @throws {Error}
		*/
		function error(msg) {
			var err = /* @__PURE__ */ new Error(options.source + ":" + lineno + ":" + column + ": " + msg);
			err.reason = msg;
			err.filename = options.source;
			err.line = lineno;
			err.column = column;
			err.source = style;
			if (options.silent);
			else throw err;
		}
		/**
		* Match `re` and return captures.
		*
		* @param {RegExp} re
		* @return {undefined|Array}
		*/
		function match(re) {
			var m = re.exec(style);
			if (!m) return;
			var str = m[0];
			updatePosition(str);
			style = style.slice(str.length);
			return m;
		}
		/**
		* Parse whitespace.
		*/
		function whitespace() {
			match(WHITESPACE_REGEX);
		}
		/**
		* Parse comments.
		*
		* @param {Object[]} [rules]
		* @return {Object[]}
		*/
		function comments(rules) {
			var c;
			rules = rules || [];
			while (c = comment()) if (c !== false) rules.push(c);
			return rules;
		}
		/**
		* Parse comment.
		*
		* @return {Object}
		* @throws {Error}
		*/
		function comment() {
			var pos = position();
			if (FORWARD_SLASH != style.charAt(0) || ASTERISK != style.charAt(1)) return;
			var i = 2;
			while (EMPTY_STRING != style.charAt(i) && (ASTERISK != style.charAt(i) || FORWARD_SLASH != style.charAt(i + 1))) ++i;
			i += 2;
			if (EMPTY_STRING === style.charAt(i - 1)) return error("End of comment missing");
			var str = style.slice(2, i - 2);
			column += 2;
			updatePosition(str);
			style = style.slice(i);
			column += 2;
			return pos({
				type: TYPE_COMMENT,
				comment: str
			});
		}
		/**
		* Parse declaration.
		*
		* @return {Object}
		* @throws {Error}
		*/
		function declaration() {
			var pos = position();
			var prop = match(PROPERTY_REGEX);
			if (!prop) return;
			comment();
			if (!match(COLON_REGEX)) return error("property missing ':'");
			var val = match(VALUE_REGEX);
			var ret = pos({
				type: TYPE_DECLARATION,
				property: trim(prop[0].replace(COMMENT_REGEX, EMPTY_STRING)),
				value: val ? trim(val[0].replace(COMMENT_REGEX, EMPTY_STRING)) : EMPTY_STRING
			});
			match(SEMICOLON_REGEX);
			return ret;
		}
		/**
		* Parse declarations.
		*
		* @return {Object[]}
		*/
		function declarations() {
			var decls = [];
			comments(decls);
			var decl;
			while (decl = declaration()) if (decl !== false) {
				decls.push(decl);
				comments(decls);
			}
			return decls;
		}
		whitespace();
		return declarations();
	}
	/**
	* Trim `str`.
	*
	* @param {String} str
	* @return {String}
	*/
	function trim(str) {
		return str ? str.replace(TRIM_REGEX, EMPTY_STRING) : EMPTY_STRING;
	}
	module.exports = index;
}));
//#endregion
//#region node_modules/style-to-object/cjs/index.js
var require_cjs$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = StyleToObject;
	var inline_style_parser_1 = __importDefault(require_cjs$2());
	/**
	* Parses inline style to object.
	*
	* @param style - Inline style.
	* @param iterator - Iterator.
	* @returns - Style object or null.
	*
	* @example Parsing inline style to object:
	*
	* ```js
	* import parse from 'style-to-object';
	* parse('line-height: 42;'); // { 'line-height': '42' }
	* ```
	*/
	function StyleToObject(style, iterator) {
		let styleObject = null;
		if (!style || typeof style !== "string") return styleObject;
		const declarations = (0, inline_style_parser_1.default)(style);
		const hasIterator = typeof iterator === "function";
		declarations.forEach((declaration) => {
			if (declaration.type !== "declaration") return;
			const { property, value } = declaration;
			if (hasIterator) iterator(property, value, declaration);
			else if (value) {
				styleObject = styleObject || {};
				styleObject[property] = value;
			}
		});
		return styleObject;
	}
}));
//#endregion
//#region node_modules/style-to-js/cjs/utilities.js
var require_utilities$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.camelCase = void 0;
	var CUSTOM_PROPERTY_REGEX = /^--[a-zA-Z0-9_-]+$/;
	var HYPHEN_REGEX = /-([a-z])/g;
	var NO_HYPHEN_REGEX = /^[^-]+$/;
	var VENDOR_PREFIX_REGEX = /^-(webkit|moz|ms|o|khtml)-/;
	var MS_VENDOR_PREFIX_REGEX = /^-(ms)-/;
	/**
	* Checks whether to skip camelCase.
	*/
	var skipCamelCase = function(property) {
		return !property || NO_HYPHEN_REGEX.test(property) || CUSTOM_PROPERTY_REGEX.test(property);
	};
	/**
	* Replacer that capitalizes first character.
	*/
	var capitalize = function(match, character) {
		return character.toUpperCase();
	};
	/**
	* Replacer that removes beginning hyphen of vendor prefix property.
	*/
	var trimHyphen = function(match, prefix) {
		return "".concat(prefix, "-");
	};
	/**
	* CamelCases a CSS property.
	*/
	var camelCase = function(property, options) {
		if (options === void 0) options = {};
		if (skipCamelCase(property)) return property;
		property = property.toLowerCase();
		if (options.reactCompat) property = property.replace(MS_VENDOR_PREFIX_REGEX, trimHyphen);
		else property = property.replace(VENDOR_PREFIX_REGEX, trimHyphen);
		return property.replace(HYPHEN_REGEX, capitalize);
	};
	exports.camelCase = camelCase;
}));
//#endregion
//#region node_modules/style-to-js/cjs/index.js
var require_cjs = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var style_to_object_1 = (exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	})(require_cjs$1());
	var utilities_1 = require_utilities$1();
	/**
	* Parses CSS inline style to JavaScript object (camelCased).
	*/
	function StyleToJS(style, options) {
		var output = {};
		if (!style || typeof style !== "string") return output;
		(0, style_to_object_1.default)(style, function(property, value) {
			if (property && value) output[(0, utilities_1.camelCase)(property, options)] = value;
		});
		return output;
	}
	StyleToJS.default = StyleToJS;
	module.exports = StyleToJS;
}));
//#endregion
//#region node_modules/html-react-parser/lib/utilities.js
var require_utilities = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.returnFirstArg = exports.canTextBeChildOfNode = exports.ELEMENTS_WITH_NO_TEXT_CHILDREN = exports.PRESERVE_CUSTOM_ATTRIBUTES = void 0;
	exports.isCustomComponent = isCustomComponent;
	exports.setStyleProp = setStyleProp;
	var react_1 = require_react();
	var style_to_js_1 = __importDefault(require_cjs());
	var RESERVED_SVG_MATHML_ELEMENTS = new Set([
		"annotation-xml",
		"color-profile",
		"font-face",
		"font-face-src",
		"font-face-uri",
		"font-face-format",
		"font-face-name",
		"missing-glyph"
	]);
	/**
	* Check if a tag is a custom component.
	*
	* @see {@link https://github.com/facebook/react/blob/v16.6.3/packages/react-dom/src/shared/isCustomComponent.js}
	*
	* @param tagName - Tag name.
	* @param props - Props passed to the element.
	* @returns - Whether the tag is custom component.
	*/
	function isCustomComponent(tagName, props) {
		if (!tagName.includes("-")) return Boolean(props && typeof props.is === "string");
		if (RESERVED_SVG_MATHML_ELEMENTS.has(tagName)) return false;
		return true;
	}
	var styleOptions = { reactCompat: true };
	/**
	* Sets style prop.
	*
	* @param style - Inline style.
	* @param props - Props object.
	*/
	function setStyleProp(style, props) {
		if (typeof style !== "string") return;
		if (!style.trim()) {
			props.style = {};
			return;
		}
		try {
			props.style = (0, style_to_js_1.default)(style, styleOptions);
		} catch (error) {
			props.style = {};
		}
	}
	/**
	* @see https://reactjs.org/blog/2017/09/08/dom-attributes-in-react-16.html
	*/
	exports.PRESERVE_CUSTOM_ATTRIBUTES = Number(react_1.version.split(".")[0]) >= 16;
	/**
	* @see https://github.com/facebook/react/blob/cae635054e17a6f107a39d328649137b83f25972/packages/react-dom/src/client/validateDOMNesting.js#L213
	*/
	exports.ELEMENTS_WITH_NO_TEXT_CHILDREN = new Set([
		"tr",
		"tbody",
		"thead",
		"tfoot",
		"colgroup",
		"table",
		"head",
		"html",
		"frameset"
	]);
	/**
	* Checks if the given node can contain text nodes
	*
	* @param node - Element node.
	* @returns - Whether the node can contain text nodes.
	*/
	var canTextBeChildOfNode = (node) => !exports.ELEMENTS_WITH_NO_TEXT_CHILDREN.has(node.name);
	exports.canTextBeChildOfNode = canTextBeChildOfNode;
	/**
	* Returns the first argument as is.
	*
	* @param arg - The argument to be returned.
	* @returns - The input argument `arg`.
	*/
	var returnFirstArg = (arg) => arg;
	exports.returnFirstArg = returnFirstArg;
}));
//#endregion
//#region node_modules/html-react-parser/lib/attributes-to-props.js
var require_attributes_to_props = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = attributesToProps;
	var react_property_1 = require_lib$1();
	var utilities_1 = require_utilities();
	var UNCONTROLLED_COMPONENT_ATTRIBUTES = ["checked", "value"];
	var UNCONTROLLED_COMPONENT_NAMES = [
		"input",
		"select",
		"textarea"
	];
	var valueOnlyInputs = {
		reset: true,
		submit: true
	};
	/**
	* Converts HTML/SVG DOM attributes to React props.
	*
	* @param attributes - HTML/SVG DOM attributes.
	* @param nodeName - DOM node name.
	* @returns - React props.
	*/
	function attributesToProps(attributes = {}, nodeName) {
		const props = {};
		const isInputValueOnly = Boolean(attributes.type && valueOnlyInputs[attributes.type]);
		for (const attributeName in attributes) {
			const attributeValue = attributes[attributeName];
			if ((0, react_property_1.isCustomAttribute)(attributeName)) {
				props[attributeName] = attributeValue;
				continue;
			}
			const attributeNameLowerCased = attributeName.toLowerCase();
			let propName = getPropName(attributeNameLowerCased);
			if (propName) {
				const propertyInfo = (0, react_property_1.getPropertyInfo)(propName);
				if (UNCONTROLLED_COMPONENT_ATTRIBUTES.includes(propName) && UNCONTROLLED_COMPONENT_NAMES.includes(nodeName) && !isInputValueOnly) propName = getPropName("default" + attributeNameLowerCased);
				props[propName] = attributeValue;
				switch (propertyInfo === null || propertyInfo === void 0 ? void 0 : propertyInfo.type) {
					case react_property_1.BOOLEAN:
						props[propName] = true;
						break;
					case react_property_1.OVERLOADED_BOOLEAN:
						if (attributeValue === "") props[propName] = true;
						break;
				}
				continue;
			}
			if (utilities_1.PRESERVE_CUSTOM_ATTRIBUTES) props[attributeName] = attributeValue;
		}
		(0, utilities_1.setStyleProp)(attributes.style, props);
		return props;
	}
	/**
	* Gets prop name from lowercased attribute name.
	*
	* @param attributeName - Lowercased attribute name.
	* @returns - Prop name.
	*/
	function getPropName(attributeName) {
		return react_property_1.possibleStandardNames[attributeName];
	}
}));
//#endregion
//#region node_modules/html-react-parser/lib/dom-to-react.js
var require_dom_to_react = /* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = domToReact;
	var react_1 = require_react();
	var attributes_to_props_1 = __importDefault(require_attributes_to_props());
	var utilities_1 = require_utilities();
	var React = {
		cloneElement: react_1.cloneElement,
		createElement: react_1.createElement,
		isValidElement: react_1.isValidElement
	};
	/**
	* Converts DOM nodes to JSX element(s).
	*
	* @param nodes - DOM nodes.
	* @param options - Options.
	* @returns - String or JSX element(s).
	*/
	function domToReact(nodes, options = {}) {
		var _a, _b, _c, _d, _e;
		const reactElements = [];
		const hasReplace = typeof options.replace === "function";
		const transform = (_a = options.transform) !== null && _a !== void 0 ? _a : utilities_1.returnFirstArg;
		const { cloneElement, createElement, isValidElement } = (_b = options.library) !== null && _b !== void 0 ? _b : React;
		const nodesLength = nodes.length;
		for (let index = 0; index < nodesLength; index++) {
			const node = nodes[index];
			if (hasReplace) {
				let replaceElement = (_c = options.replace) === null || _c === void 0 ? void 0 : _c.call(options, node, index);
				if (isValidElement(replaceElement)) {
					if (nodesLength > 1) replaceElement = cloneElement(replaceElement, { key: (_d = replaceElement.key) !== null && _d !== void 0 ? _d : index });
					reactElements.push(transform(replaceElement, node, index));
					continue;
				}
			}
			if (node.type === "text") {
				const isWhitespace = !node.data.trim().length;
				if (isWhitespace && node.parent && !(0, utilities_1.canTextBeChildOfNode)(node.parent)) continue;
				if (options.trim && isWhitespace) continue;
				reactElements.push(transform(node.data, node, index));
				continue;
			}
			const element = node;
			let props = {};
			if (skipAttributesToProps(element)) {
				(0, utilities_1.setStyleProp)(element.attribs.style, element.attribs);
				props = element.attribs;
			} else if (element.attribs) props = (0, attributes_to_props_1.default)(element.attribs, element.name);
			let children;
			switch (node.type) {
				case "script":
				case "style":
					if (node.children[0]) props.dangerouslySetInnerHTML = { __html: node.children[0].data };
					break;
				case "tag":
					if (node.name === "textarea" && node.children[0]) props.defaultValue = node.children[0].data;
					else if ((_e = node.children) === null || _e === void 0 ? void 0 : _e.length) children = domToReact(node.children, options);
					break;
				default: continue;
			}
			if (nodesLength > 1) props.key = index;
			reactElements.push(transform(createElement(node.name, props, children), node, index));
		}
		return reactElements.length === 1 ? reactElements[0] : reactElements;
	}
	/**
	* Determines whether DOM element attributes should be transformed to props.
	* Web Components should not have their attributes transformed except for `style`.
	*
	* @param node - Element node.
	* @returns - Whether the node attributes should be converted to props.
	*/
	function skipAttributesToProps(node) {
		return utilities_1.PRESERVE_CUSTOM_ATTRIBUTES && node.type === "tag" && (0, utilities_1.isCustomComponent)(node.name, node.attribs);
	}
}));
//#endregion
//#region node_modules/html-react-parser/esm/index.mjs
var import_lib = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports) => {
	var __importDefault = exports && exports.__importDefault || function(mod) {
		return mod && mod.__esModule ? mod : { "default": mod };
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.htmlToDOM = exports.domToReact = exports.attributesToProps = exports.Text = exports.ProcessingInstruction = exports.Element = exports.Comment = void 0;
	exports.default = HTMLReactParser;
	var html_dom_parser_1 = __importDefault(require_lib$2());
	exports.htmlToDOM = html_dom_parser_1.default;
	exports.attributesToProps = __importDefault(require_attributes_to_props()).default;
	var dom_to_react_1 = __importDefault(require_dom_to_react());
	exports.domToReact = dom_to_react_1.default;
	var domhandler_1 = (init_dist(), __toCommonJS(dist_exports));
	Object.defineProperty(exports, "Comment", {
		enumerable: true,
		get: function() {
			return domhandler_1.Comment;
		}
	});
	Object.defineProperty(exports, "Element", {
		enumerable: true,
		get: function() {
			return domhandler_1.Element;
		}
	});
	Object.defineProperty(exports, "ProcessingInstruction", {
		enumerable: true,
		get: function() {
			return domhandler_1.ProcessingInstruction;
		}
	});
	Object.defineProperty(exports, "Text", {
		enumerable: true,
		get: function() {
			return domhandler_1.Text;
		}
	});
	var domParserOptions = { lowerCaseAttributeNames: false };
	/**
	* Converts HTML string to React elements.
	*
	* @param html - HTML string.
	* @param options - Parser options.
	* @returns - React element(s), empty array, or string.
	*/
	function HTMLReactParser(html, options) {
		var _a;
		if (typeof html !== "string") throw new TypeError("First argument must be a string");
		if (!html) return [];
		const htmlToDOMOptions = Object.assign(Object.assign({}, (_a = options === null || options === void 0 ? void 0 : options.htmlparser2) !== null && _a !== void 0 ? _a : domParserOptions), { trustedTypePolicy: options === null || options === void 0 ? void 0 : options.trustedTypePolicy });
		return (0, dom_to_react_1.default)((0, html_dom_parser_1.default)(html, htmlToDOMOptions), options);
	}
})))(), 1);
var esm_default = import_lib.default.default || import_lib.default;
//#endregion
export { esm_default as t };
