import { n as __esmMin, r as __exportAll, s as __toESM, t as __commonJSMin } from "../_runtime.mjs";
import { isAscii } from "node:buffer";
//#region node_modules/@exodus/bytes/fallback/platform.native.js
function decodePartAddition(a, start, end, m) {
	let o = "";
	let i = start;
	for (const last3 = end - 3; i < last3; i += 4) {
		const x0 = a[i];
		const x1 = a[i + 1];
		const x2 = a[i + 2];
		const x3 = a[i + 3];
		o += m[x0];
		o += m[x1];
		o += m[x2];
		o += m[x3];
	}
	while (i < end) o += m[a[i++]];
	return o;
}
function decodePartTemplates(a, start, end, m) {
	let o = "";
	let i = start;
	for (const last15 = end - 15; i < last15; i += 16) {
		const x0 = a[i];
		const x1 = a[i + 1];
		const x2 = a[i + 2];
		const x3 = a[i + 3];
		const x4 = a[i + 4];
		const x5 = a[i + 5];
		const x6 = a[i + 6];
		const x7 = a[i + 7];
		const x8 = a[i + 8];
		const x9 = a[i + 9];
		const x10 = a[i + 10];
		const x11 = a[i + 11];
		const x12 = a[i + 12];
		const x13 = a[i + 13];
		const x14 = a[i + 14];
		const x15 = a[i + 15];
		o += `${m[x0]}${m[x1]}${m[x2]}${m[x3]}${m[x4]}${m[x5]}${m[x6]}${m[x7]}${m[x8]}${m[x9]}${m[x10]}${m[x11]}${m[x12]}${m[x13]}${m[x14]}${m[x15]}`;
	}
	while (i < end) o += m[a[i++]];
	return o;
}
function decode2string(arr, start, end, m) {
	if (end - start > 3e4) {
		const concat = [];
		for (let i = start; i < end;) {
			const step = i + 500;
			const iNext = step > end ? end : step;
			concat.push(decodePart(arr, i, iNext, m));
			i = iNext;
		}
		const res = concat.join("");
		concat.length = 0;
		return res;
	}
	return decodePart(arr, start, end, m);
}
function encodeCharcodesHermes(str, arr) {
	const length = str.length;
	if (length > 64) {
		const at = str.charCodeAt.bind(str);
		for (let i = 0; i < length; i++) arr[i] = at(i);
	} else for (let i = 0; i < length; i++) arr[i] = str.charCodeAt(i);
	return arr;
}
function encodeCharcodesPure(str, arr) {
	const length = str.length;
	for (let i = 0; i < length; i++) arr[i] = str.charCodeAt(i);
	return arr;
}
var Buffer$3, haveNativeBuffer$1, nativeBuffer, isHermes, isDeno$1, isLE, isNative, nativeEncoder, nativeDecoder, nativeDecoderLatin1, decodePart, encodeCharcodes;
var init_platform_native = __esmMin((() => {
	({Buffer: Buffer$3} = globalThis);
	haveNativeBuffer$1 = Buffer$3 && !Buffer$3.TYPED_ARRAY_SUPPORT;
	nativeBuffer = haveNativeBuffer$1 ? Buffer$3 : null;
	isHermes = !!globalThis.HermesInternal;
	isDeno$1 = !!globalThis.Deno;
	isLE = new Uint8Array(Uint16Array.of(258).buffer)[0] === 2;
	isNative = (x) => x && (haveNativeBuffer$1 || `${x}`.includes("[native code]"));
	if (!haveNativeBuffer$1 && isNative(() => {})) isNative = () => false;
	nativeEncoder = isNative(globalThis.TextEncoder) ? new TextEncoder() : null;
	nativeDecoder = isNative(globalThis.TextDecoder) ? new TextDecoder("utf-8", { ignoreBOM: true }) : null;
	nativeDecoderLatin1 = /* @__PURE__ */ (() => {
		if (nativeDecoder) try {
			return new TextDecoder("latin1", { ignoreBOM: true });
		} catch {}
		return null;
	})();
	decodePart = isHermes ? decodePartTemplates : decodePartAddition;
	encodeCharcodes = isHermes ? encodeCharcodesHermes : encodeCharcodesPure;
}));
//#endregion
//#region node_modules/@exodus/bytes/fallback/platform.js
var init_platform = __esmMin((() => {
	init_platform_native();
}));
//#endregion
//#region node_modules/@exodus/bytes/fallback/_utils.js
function assertU8(arg) {
	if (!(arg instanceof Uint8Array)) throw new TypeError("Expected an Uint8Array");
}
function fromUint8(arr, format) {
	switch (format) {
		case "uint8":
			if (arr.constructor !== Uint8Array) throw new Error("Unexpected");
			return arr;
		case "arraybuffer":
			if (arr.byteLength !== arr.buffer.byteLength) throw new Error("Unexpected");
			return arr.buffer;
		case "buffer":
			if (arr.length <= 64) return Buffer$2.from(arr);
			return Buffer$2.from(arr.buffer, arr.byteOffset, arr.byteLength);
	}
	throw new TypeError("Unexpected format");
}
function fromBuffer(arr, format) {
	switch (format) {
		case "uint8":
			if (arr.length <= 64 || arr.byteOffset !== 0 || arr.byteLength !== arr.buffer.byteLength) return new Uint8Array(arr);
			return new Uint8Array(arr.buffer, arr.byteOffset, arr.byteLength);
		case "arraybuffer": return fromBuffer(arr, "uint8").buffer;
		case "buffer":
			if (arr.constructor !== Buffer$2) throw new Error("Unexpected");
			return arr;
	}
	throw new TypeError("Unexpected format");
}
var Buffer$2, toBuf, E_STRING, E_STRICT_UNICODE;
var init__utils = __esmMin((() => {
	init_platform();
	Buffer$2 = globalThis.Buffer;
	toBuf = (x) => x.byteLength <= 64 && x.BYTES_PER_ELEMENT === 1 ? Buffer$2.from(x) : Buffer$2.from(x.buffer, x.byteOffset, x.byteLength);
	E_STRING = "Input is not a string";
	E_STRICT_UNICODE = "Input is not well-formed Unicode";
}));
//#endregion
//#region node_modules/@exodus/bytes/fallback/latin1.js
function asciiPrefix(arr) {
	let p = 0;
	const length = arr.length;
	if (length > 64) {
		const u32start = (4 - (arr.byteOffset & 3)) % 4;
		for (; p < u32start; p++) if (arr[p] >= 128) return p;
		const u32length = (arr.byteLength - u32start) / 4 | 0;
		const u32 = new Uint32Array(arr.buffer, arr.byteOffset + u32start, u32length);
		let i = 0;
		for (const last3 = u32length - 3;; p += 16, i += 4) {
			if (i >= last3) break;
			const a = u32[i];
			const b = u32[i + 1];
			const c = u32[i + 2];
			const d = u32[i + 3];
			if (a & 2155905152 || b & 2155905152 || c & 2155905152 || d & 2155905152) break;
		}
		for (; i < u32length; p += 4, i++) if (u32[i] & 2155905152) break;
	}
	for (; p < length; p++) if (arr[p] >= 128) return p;
	return length;
}
function decodeLatin1(arr, start = 0, stop = arr.length) {
	start |= 0;
	stop |= 0;
	const total = stop - start;
	if (total === 0) return "";
	if (useLatin1atob && total >= 256 && total < 1e8 && arr.toBase64 === web64$1 && arr.BYTES_PER_ELEMENT === 1) return atob$1((start === 0 && stop === arr.length ? arr : arr.subarray(start, stop)).toBase64());
	if (total > maxFunctionArgs) {
		let prefix = "";
		for (let i = start; i < stop;) {
			const i1 = Math.min(stop, i + maxFunctionArgs);
			prefix += String.fromCharCode.apply(String, arr.subarray(i, i1));
			i = i1;
		}
		return prefix;
	}
	const sliced = start === 0 && stop === arr.length ? arr : arr.subarray(start, stop);
	return String.fromCharCode.apply(String, sliced);
}
var atob$1, web64$1, maxFunctionArgs, useLatin1atob, decodeUCS2, decodeAscii, encodeLatin1, useEncodeInto, encodeAscii;
var init_latin1 = __esmMin((() => {
	init_platform();
	atob$1 = globalThis.atob;
	web64$1 = Uint8Array.prototype.toBase64;
	maxFunctionArgs = 8192;
	useLatin1atob = web64$1 && atob$1;
	decodeUCS2 = nativeBuffer && isLE && !isDeno$1 ? (u16, stop = u16.length) => {
		if (stop > 32) return nativeBuffer.from(u16.buffer, u16.byteOffset, stop * 2).ucs2Slice();
		return decodeLatin1(u16, 0, stop);
	} : (u16, stop = u16.length) => decodeLatin1(u16, 0, stop);
	decodeAscii = nativeBuffer ? (a) => a.byteLength >= 768 && !isDeno$1 ? nativeBuffer.from(a.buffer, a.byteOffset, a.byteLength).latin1Slice(0, a.byteLength) : nativeDecoder.decode(a) : nativeDecoderLatin1 ? (a) => nativeDecoderLatin1.decode(a) : (a) => decodeLatin1(a instanceof Uint8Array ? a : new Uint8Array(a.buffer, a.byteOffset, a.byteLength));
	encodeLatin1 = (str) => encodeCharcodes(str, new Uint8Array(str.length));
	useEncodeInto = isHermes && nativeEncoder?.encodeInto;
	encodeAscii = useEncodeInto ? (str, ERR) => {
		const codes = new Uint8Array(str.length + 4);
		const info = nativeEncoder.encodeInto(str, codes);
		if (info.read !== str.length || info.written !== str.length) throw new SyntaxError(ERR);
		return codes.subarray(0, str.length);
	} : nativeBuffer ? (str, ERR) => {
		const codes = nativeBuffer.from(str, "utf8");
		if (codes.length !== str.length) throw new SyntaxError(ERR);
		return new Uint8Array(codes.buffer, codes.byteOffset, codes.byteLength);
	} : (str, ERR) => {
		const codes = nativeEncoder.encode(str);
		if (codes.length !== str.length) throw new SyntaxError(ERR);
		return codes;
	};
}));
//#endregion
//#region node_modules/@exodus/bytes/fallback/utf16.js
function decodeApiDecoders(input, loose, format) {
	if (format === "uint16") {
		if (!(input instanceof Uint16Array)) throw new TypeError("Expected an Uint16Array");
	} else if (format === "uint8-le" || format === "uint8-be") {
		assertU8(input);
		if (input.byteLength % 2 !== 0) throw new TypeError("Expected even number of bytes");
	} else throw new TypeError("Unknown format");
	return (format === "uint8-le" || format === "uint16" && isLE ? loose ? looseLE : fatalLE : loose ? looseBE : fatalBE).decode(input);
}
var E_STRICT$3, fatalLE, looseLE, fatalBE, looseBE;
var init_utf16 = __esmMin((() => {
	init__utils();
	init_platform();
	E_STRICT$3 = "Input is not well-formed utf16";
	String.prototype.isWellFormed;
	String.prototype.toWellFormed;
	fatalLE = nativeDecoder ? new TextDecoder("utf-16le", {
		ignoreBOM: true,
		fatal: true
	}) : null;
	looseLE = nativeDecoder ? new TextDecoder("utf-16le", { ignoreBOM: true }) : null;
	fatalBE = nativeDecoder ? new TextDecoder("utf-16be", {
		ignoreBOM: true,
		fatal: true
	}) : null;
	looseBE = nativeDecoder ? new TextDecoder("utf-16be", { ignoreBOM: true }) : null;
}));
//#endregion
//#region node_modules/@exodus/bytes/utf16.node.js
function decodeNode(input, loose = false, format = "uint16") {
	let ble;
	if (format === "uint16") {
		if (!(input instanceof Uint16Array)) throw new TypeError("Expected an Uint16Array");
		ble = swapped(input, !isLE);
	} else if (format === "uint8-le" || format === "uint8-be") {
		assertU8(input);
		if (input.byteLength % 2 !== 0) throw new TypeError("Expected even number of bytes");
		ble = swapped(input, format === "uint8-be");
	} else throw new TypeError("Unknown format");
	const str = ble.ucs2Slice(0, ble.byteLength);
	if (loose) return toWellFormed.call(str);
	if (isWellFormed$1.call(str)) return str;
	throw new TypeError(E_STRICT$3);
}
var isWellFormed$1, toWellFormed, swapped, decode$1, utf16toString, utf16toStringLoose;
var init_utf16_node = __esmMin((() => {
	init__utils();
	init_platform();
	init_utf16();
	if (Buffer.TYPED_ARRAY_SUPPORT) throw new Error("Unexpected Buffer polyfill");
	({isWellFormed: isWellFormed$1, toWellFormed} = String.prototype);
	swapped = (x, swap) => {
		const b = Buffer.from(x.buffer, x.byteOffset, x.byteLength);
		return swap ? Buffer.from(b).swap16() : b;
	};
	decode$1 = isDeno$1 ? decodeApiDecoders : decodeNode;
	utf16toString = (arr, format = "uint16") => decode$1(arr, false, format);
	utf16toStringLoose = (arr, format = "uint16") => decode$1(arr, true, format);
}));
//#endregion
//#region node_modules/@exodus/bytes/fallback/utf8.js
var E_STRICT$2, decodeURIComponent, escape;
var init_utf8 = __esmMin((() => {
	E_STRICT$2 = "Input is not well-formed utf8";
	({decodeURIComponent, escape} = globalThis);
}));
//#endregion
//#region node_modules/@exodus/bytes/utf8.node.js
function encode$1(str, loose, format) {
	if (typeof str !== "string") throw new TypeError(E_STRING);
	const strLength = str.length;
	if (strLength === 0) return new Uint8Array();
	let res;
	if (strLength > 1024 && !isDeno) {
		const byteLength = Buffer.byteLength(str);
		res = format === "buffer" ? Buffer.allocUnsafe(byteLength) : Buffer.allocUnsafeSlow(byteLength);
		if ((byteLength === strLength ? res.latin1Write(str) : res.utf8Write(str)) !== byteLength) throw new Error("Failed to write all bytes");
	} else res = Buffer.from(str);
	if (!loose && res.length !== strLength && !isWellFormed.call(str)) throw new TypeError(E_STRICT_UNICODE);
	return fromBuffer(res, format);
}
function decode(arr, loose = false) {
	assertU8(arr);
	const byteLength = arr.byteLength;
	if (byteLength === 0) return "";
	if (byteLength > 1536 && !(isDeno && loose) && isAscii(arr)) {
		const buf = Buffer.from(arr.buffer, arr.byteOffset, arr.byteLength);
		if (isDeno) return buf.toString();
		return buf.latin1Slice(0, arr.byteLength);
	}
	if (loose) return decoderLoose.decode(arr);
	if (decoderFatal) return decoderFatal.decode(arr);
	const str = decoderLoose.decode(arr);
	if (str.includes("�") && !Buffer.from(str).equals(arr)) throw new TypeError(E_STRICT$2);
	return str;
}
var decoderFatal, decoderLoose, isWellFormed, isDeno, utf8fromStringLoose, utf8toString, utf8toStringLoose;
var init_utf8_node = __esmMin((() => {
	init__utils();
	init_utf8();
	if (Buffer.TYPED_ARRAY_SUPPORT) throw new Error("Unexpected Buffer polyfill");
	decoderLoose = new TextDecoder("utf-8", { ignoreBOM: true });
	({isWellFormed} = String.prototype);
	isDeno = !!globalThis.Deno;
	try {
		decoderFatal = new TextDecoder("utf-8", {
			ignoreBOM: true,
			fatal: true
		});
	} catch {}
	utf8fromStringLoose = (str, format = "uint8") => encode$1(str, true, format);
	utf8toString = (arr) => decode(arr, false);
	utf8toStringLoose = (arr) => decode(arr, true);
}));
//#endregion
//#region node_modules/@exodus/bytes/fallback/single-byte.encodings.js
var r$1, i2, iB, i9, w1, w2, w7, w8, k8b, k8a, maps$1;
var init_single_byte_encodings = __esmMin((() => {
	r$1 = 65533;
	i2 = [
		189,
		148,
		0,
		0,
		63,
		0,
		116,
		64,
		0,
		68,
		0,
		78,
		0,
		78,
		0,
		0,
		63,
		64,
		114,
		117,
		0,
		0,
		123,
		0,
		0,
		128,
		149,
		0,
		149,
		0,
		0,
		132,
		0,
		117,
		0,
		0,
		32,
		0,
		85,
		33,
		0,
		37,
		0,
		47,
		0,
		47,
		0,
		0,
		32,
		33,
		83,
		86,
		0,
		0,
		92,
		0,
		0,
		97,
		118,
		0,
		118,
		0,
		0,
		101,
		474
	];
	iB = [
		[58, 3424],
		[4, r$1],
		[29, 3424],
		[4, r$1]
	];
	i9 = [
		[47],
		78,
		[12],
		83,
		128,
		[17],
		47,
		[12],
		52,
		97
	];
	w1 = [
		8236,
		0,
		8088,
		0,
		8090,
		8097,
		8090,
		8090,
		0,
		8103
	];
	w2 = [
		8236,
		0,
		8088,
		271,
		8090,
		8097,
		8090,
		8090,
		574,
		8103
	];
	w7 = [
		64,
		0,
		157,
		[4],
		39,
		68,
		109,
		62,
		67,
		0,
		0,
		82,
		75,
		68,
		0,
		175,
		75,
		86,
		105,
		92,
		108,
		144,
		114,
		115,
		0,
		120,
		[3],
		154,
		104,
		128,
		143,
		0,
		158,
		159,
		0,
		37,
		78,
		31,
		36,
		0,
		0,
		51,
		44,
		37,
		0,
		144,
		44,
		55,
		74,
		61,
		77,
		113,
		83,
		84,
		0,
		89,
		[3],
		123,
		73,
		97,
		112,
		0,
		127,
		128
	];
	w8 = [
		8071,
		8071,
		8073,
		8073,
		8077,
		8061,
		8061
	];
	k8b = [
		-22,
		910,
		879,
		879,
		899,
		880,
		880,
		894,
		876,
		893,
		[8, 879],
		894,
		[4, 878],
		864,
		859,
		884,
		882,
		861,
		877,
		881,
		876,
		873,
		875,
		846,
		815,
		815,
		835,
		816,
		816,
		830,
		812,
		829,
		[8, 815],
		830,
		[4, 814],
		800,
		795,
		820,
		818,
		797,
		813,
		817,
		812,
		809,
		811
	];
	k8a = [
		9344,
		9345,
		9354,
		9357,
		9360,
		9363,
		9366,
		9373,
		9380,
		9387,
		9394,
		9461,
		9464,
		9467,
		9470,
		[4, 9473],
		8845,
		9484,
		8580,
		8580,
		8625,
		8652,
		8652,
		6,
		8838,
		20,
		21,
		25,
		88,
		[3, 9392],
		942
	];
	maps$1 = {
		ibm866: [
			[48, 912],
			[3, 9441],
			...[
				29,
				62,
				122,
				122,
				109,
				107,
				120,
				101,
				106,
				111,
				109,
				107,
				31,
				34,
				65,
				56,
				39,
				10,
				69,
				102,
				102,
				96,
				89,
				109,
				105,
				98,
				81,
				108,
				102,
				102,
				97,
				97,
				84,
				82,
				75,
				75,
				98,
				96,
				13,
				0,
				123,
				118,
				125,
				128,
				111
			].map((x) => x + 9266),
			[16, 864],
			785,
			864,
			786,
			865,
			787,
			866,
			792,
			871,
			-72,
			8480,
			-67,
			8479,
			8218,
			-89,
			9378,
			-95
		],
		"koi8-u": [
			...k8a,
			944,
			9391,
			944,
			944,
			[5, 9391],
			996,
			944,
			[4, 9391],
			846,
			848,
			9390,
			848,
			848,
			[5, 9390],
			979,
			848,
			...k8b
		],
		"koi8-r": [
			...k8a,
			[15, 9391],
			846,
			[11, 9390],
			...k8b
		],
		macintosh: [
			68,
			68,
			69,
			70,
			77,
			81,
			86,
			90,
			88,
			89,
			90,
			88,
			89,
			90,
			91,
			89,
			90,
			90,
			91,
			89,
			90,
			90,
			91,
			92,
			90,
			91,
			92,
			90,
			94,
			92,
			93,
			93,
			8064,
			15,
			0,
			0,
			3,
			8061,
			16,
			56,
			6,
			0,
			8312,
			9,
			-4,
			8627,
			24,
			41,
			8558,
			0,
			8626,
			8626,
			-15,
			0,
			8524,
			8538,
			8535,
			775,
			8561,
			-17,
			-2,
			748,
			40,
			57,
			-1,
			-32,
			-22,
			8535,
			206,
			8579,
			8512,
			-28,
			-13,
			8029,
			-42,
			-11,
			-9,
			8,
			132,
			132,
			8003,
			8003,
			8010,
			8010,
			8004,
			8004,
			33,
			9459,
			39,
			159,
			8042,
			8145,
			8029,
			8029,
			64035,
			64035,
			8001,
			-42,
			7992,
			7995,
			8012,
			-35,
			-28,
			-38,
			-29,
			-33,
			[3, -29],
			-33,
			-27,
			-27,
			63503,
			-31,
			-24,
			-24,
			-27,
			60,
			464,
			485,
			-73,
			[3, 479],
			-68,
			480,
			477,
			456
		],
		"x-mac-cyrillic": [
			[32, 912],
			8064,
			15,
			1006,
			0,
			3,
			8061,
			16,
			863,
			6,
			0,
			8312,
			855,
			934,
			8627,
			853,
			932,
			8558,
			0,
			8626,
			8626,
			930,
			0,
			987,
			849,
			844,
			923,
			845,
			924,
			845,
			924,
			844,
			923,
			920,
			836,
			-22,
			8535,
			206,
			8579,
			8512,
			-28,
			-13,
			8029,
			-42,
			832,
			911,
			831,
			910,
			902,
			8003,
			8003,
			8010,
			8010,
			8004,
			8004,
			33,
			8007,
			822,
			901,
			821,
			900,
			8250,
			804,
			883,
			880,
			[31, 848],
			8109
		],
		"windows-874": [
			8236,
			[4],
			8097,
			[11],
			...w8,
			[9],
			...iB
		]
	};
	[
		[
			...w1,
			214,
			8110,
			206,
			215,
			239,
			234,
			0,
			...w8,
			0,
			8329,
			199,
			8095,
			191,
			200,
			224,
			219,
			0,
			550,
			566,
			158,
			0,
			95,
			[4],
			180,
			[4],
			204,
			0,
			0,
			553,
			143,
			[5],
			76,
			165,
			0,
			129,
			544,
			128,
			...i2
		],
		[
			898,
			898,
			8088,
			976,
			8090,
			8097,
			8090,
			8090,
			8228,
			8103,
			895,
			8110,
			894,
			895,
			893,
			896,
			962,
			...w8,
			0,
			8329,
			959,
			8095,
			958,
			959,
			957,
			960,
			0,
			877,
			956,
			869,
			0,
			1003,
			0,
			0,
			857,
			0,
			858,
			[4],
			856,
			0,
			0,
			852,
			931,
			989,
			[3],
			921,
			8285,
			922,
			0,
			924,
			840,
			919,
			920,
			[64, 848]
		],
		[
			...w2,
			214,
			8110,
			198,
			0,
			239,
			0,
			0,
			...w8,
			580,
			8329,
			199,
			8095,
			183,
			0,
			224,
			217
		],
		[
			8236,
			0,
			8088,
			271,
			8090,
			8097,
			8090,
			8090,
			0,
			8103,
			0,
			8110,
			[5],
			...w8,
			0,
			8329,
			0,
			8095,
			[5],
			740,
			740,
			[7],
			r$1,
			[4],
			8038,
			[4],
			720,
			[3],
			[3, 720],
			0,
			720,
			0,
			[20, 720],
			r$1,
			[44, 720],
			r$1
		],
		[
			...w2,
			214,
			8110,
			198,
			[4],
			...w8,
			580,
			8329,
			199,
			8095,
			183,
			0,
			0,
			217,
			0,
			...i9
		],
		[
			...w2,
			0,
			8110,
			[5],
			...w8,
			580,
			8329,
			0,
			8095,
			[8],
			8198,
			[5],
			45,
			[15],
			61,
			[5],
			[20, 1264],
			[5, 1308],
			[7, r$1],
			[27, 1264],
			r$1,
			r$1,
			7953,
			7953,
			r$1
		],
		[
			8236,
			1533,
			8088,
			271,
			8090,
			8097,
			8090,
			8090,
			574,
			8103,
			1519,
			8110,
			198,
			1529,
			1546,
			1529,
			1567,
			...w8,
			1553,
			8329,
			1527,
			8095,
			183,
			8047,
			8047,
			1563,
			0,
			1387,
			[8],
			1556,
			[15],
			1377,
			[4],
			1376,
			1537,
			[22, 1376],
			0,
			[4, 1375],
			[4, 1380],
			0,
			1379,
			0,
			[4, 1378],
			[5],
			1373,
			1373,
			0,
			0,
			[4, 1371],
			0,
			1370,
			1370,
			0,
			1369,
			0,
			1368,
			0,
			0,
			7953,
			7953,
			1491
		],
		[
			...w1,
			0,
			8110,
			0,
			27,
			569,
			41,
			0,
			...w8,
			0,
			8329,
			0,
			8095,
			0,
			18,
			573,
			0,
			0,
			r$1,
			[3],
			r$1,
			0,
			0,
			48,
			0,
			172,
			[4],
			23,
			[8],
			...w7,
			474
		],
		[
			...w2,
			0,
			8110,
			198,
			[4],
			...w8,
			580,
			8329,
			0,
			8095,
			183,
			0,
			0,
			217,
			[35],
			63,
			[8],
			564,
			[3],
			64,
			0,
			567,
			0,
			0,
			203,
			[7],
			210,
			549,
			[4],
			32,
			[8],
			533,
			[3],
			33,
			0,
			561,
			0,
			0,
			172,
			[7],
			179,
			8109
		]
	].forEach((m, i) => {
		maps$1[`windows-${i + 1250}`] = m;
	});
	[
		[],
		[
			99,
			566,
			158,
			0,
			152,
			180,
			0,
			0,
			183,
			180,
			185,
			205,
			0,
			207,
			204,
			0,
			84,
			553,
			143,
			0,
			137,
			165,
			528,
			0,
			168,
			165,
			170,
			190,
			544,
			192,
			...i2
		],
		[
			133,
			566,
			0,
			0,
			r$1,
			126,
			0,
			0,
			135,
			180,
			115,
			136,
			0,
			r$1,
			204,
			0,
			118,
			[4],
			111,
			0,
			0,
			120,
			165,
			100,
			121,
			0,
			r$1,
			189,
			[3],
			r$1,
			0,
			69,
			66,
			[9],
			r$1,
			[4],
			75,
			0,
			0,
			68,
			[4],
			143,
			126,
			[4],
			r$1,
			0,
			38,
			35,
			[9],
			r$1,
			[4],
			44,
			0,
			0,
			37,
			[4],
			112,
			95,
			474
		],
		[
			99,
			150,
			179,
			0,
			131,
			149,
			0,
			0,
			183,
			104,
			119,
			186,
			0,
			207,
			0,
			0,
			84,
			553,
			164,
			0,
			116,
			134,
			528,
			0,
			168,
			89,
			104,
			171,
			141,
			192,
			140,
			64,
			[6],
			103,
			68,
			0,
			78,
			0,
			74,
			0,
			0,
			91,
			64,
			116,
			122,
			99,
			[5],
			153,
			[3],
			139,
			140,
			0,
			33,
			[6],
			72,
			37,
			0,
			47,
			0,
			43,
			0,
			0,
			60,
			33,
			85,
			91,
			68,
			[5],
			122,
			[3],
			108,
			109,
			474
		],
		[
			[12, 864],
			0,
			[66, 864],
			8230,
			[12, 864],
			-86,
			864,
			864
		],
		[
			[3, r$1],
			0,
			[7, r$1],
			1376,
			0,
			[13, r$1],
			1376,
			[3, r$1],
			1376,
			r$1,
			[26, 1376],
			[5, r$1],
			[19, 1376],
			[13, r$1]
		],
		[
			8055,
			8055,
			0,
			8200,
			8202,
			[4],
			720,
			[3],
			r$1,
			8038,
			[4],
			[3, 720],
			0,
			[3, 720],
			0,
			720,
			0,
			[20, 720],
			r$1,
			[44, 720],
			r$1
		],
		[
			r$1,
			[8],
			45,
			[15],
			61,
			[4],
			[32, r$1],
			7992,
			[27, 1264],
			r$1,
			r$1,
			7953,
			7953,
			r$1
		],
		i9,
		[
			99,
			112,
			127,
			134,
			131,
			144,
			0,
			147,
			103,
			182,
			187,
			209,
			0,
			188,
			155,
			0,
			84,
			97,
			112,
			119,
			116,
			129,
			0,
			132,
			88,
			167,
			172,
			194,
			8024,
			173,
			140,
			64,
			[6],
			103,
			68,
			0,
			78,
			0,
			74,
			[4],
			116,
			122,
			[4],
			145,
			0,
			153,
			[6],
			33,
			[6],
			72,
			37,
			0,
			47,
			0,
			43,
			[4],
			85,
			91,
			[4],
			114,
			0,
			122,
			[5],
			57
		],
		iB,
		null,
		[
			8060,
			[3],
			8057,
			0,
			0,
			48,
			0,
			172,
			[4],
			23,
			[4],
			8040,
			[3],
			...w7,
			7962
		],
		[
			7521,
			7521,
			0,
			102,
			102,
			7524,
			0,
			7640,
			0,
			7640,
			7520,
			7750,
			0,
			0,
			201,
			7534,
			7534,
			110,
			110,
			7564,
			7564,
			0,
			7583,
			7625,
			7582,
			7625,
			7589,
			7735,
			7623,
			7623,
			7586,
			[16],
			164,
			[6],
			7571,
			[6],
			152,
			[17],
			133,
			[6],
			7540,
			[6],
			121
		],
		[
			[3],
			8200,
			0,
			186,
			0,
			185,
			[11],
			201,
			[3],
			198,
			[3],
			150,
			150,
			186
		],
		[
			99,
			99,
			158,
			8200,
			8057,
			186,
			0,
			185,
			0,
			366,
			0,
			205,
			0,
			204,
			204,
			0,
			0,
			90,
			143,
			201,
			8040,
			0,
			0,
			198,
			84,
			351,
			0,
			150,
			150,
			186,
			189,
			[3],
			63,
			0,
			65,
			[10],
			64,
			114,
			[3],
			123,
			0,
			131,
			152,
			[4],
			59,
			316,
			[4],
			32,
			0,
			34,
			[10],
			33,
			83,
			[3],
			92,
			0,
			100,
			121,
			[4],
			28,
			285
		]
	].forEach((m, i) => {
		if (m) maps$1[`iso-8859-${i + 1}`] = [[33], ...m];
	});
}));
//#endregion
//#region node_modules/@exodus/bytes/fallback/single-byte.js
function getEncoding(encoding) {
	assertEncoding(encoding);
	if (encoding === xUserDefined) return Array.from({ length: 128 }, (_, i) => 63360 + i);
	if (encoding === iso8i) encoding = "iso-8859-8";
	return maps$1[encoding].flatMap((x) => Array.isArray(x) ? new Array(x[0]).fill(x[1] ?? 0) : x).map((x, i) => x === r ? x : x + 128 + i);
}
function encodingMapper(encoding) {
	const cached = mappers$1.get(encoding);
	if (cached) return cached;
	const codes = getEncoding(encoding);
	const incomplete = codes.includes(r);
	let map;
	const mapper = (arr, start = 0) => {
		if (!map) {
			map = new Uint16Array(256).map((_, i) => i);
			map.set(Uint16Array.from(codes), 128);
		}
		const o = Uint16Array.from(start === 0 ? arr : arr.subarray(start));
		let i = 0;
		for (const end7 = o.length - 7; i < end7; i += 8) {
			o[i] = map[o[i]];
			o[i + 1] = map[o[i + 1]];
			o[i + 2] = map[o[i + 2]];
			o[i + 3] = map[o[i + 3]];
			o[i + 4] = map[o[i + 4]];
			o[i + 5] = map[o[i + 5]];
			o[i + 6] = map[o[i + 6]];
			o[i + 7] = map[o[i + 7]];
		}
		for (const end = o.length; i < end; i++) o[i] = map[o[i]];
		return o;
	};
	mappers$1.set(encoding, {
		mapper,
		incomplete
	});
	return {
		mapper,
		incomplete
	};
}
function encodingDecoder(encoding) {
	const cached = decoders.get(encoding);
	if (cached) return cached;
	const isLatin1 = encoding === "iso-8859-1";
	if (isLatin1 && !nativeDecoder) return (arr, loose = false) => decodeLatin1(arr);
	let strings;
	const codes = getEncoding(encoding);
	const incomplete = codes.includes(r);
	const decoder = (arr, loose = false) => {
		if (!strings) {
			const allCodes = Array.from({ length: 128 }, (_, i) => i).concat(codes);
			while (allCodes.length < 256) allCodes.push(allCodes.length);
			strings = allCodes.map((c) => String.fromCharCode(c));
		}
		const prefixLen = asciiPrefix(arr);
		if (prefixLen === arr.length) return decodeAscii(arr);
		if (isLatin1) return decodeLatin1(arr);
		const prefix = decodeLatin1(arr, 0, prefixLen);
		const suffix = decode2string(arr, prefix.length, arr.length, strings);
		if (!loose && incomplete && suffix.includes("�")) throw new TypeError(E_STRICT$1);
		return prefix + suffix;
	};
	decoders.set(encoding, decoder);
	return decoder;
}
function encodeMap(encoding) {
	const cached = encmaps.get(encoding);
	if (cached) return cached;
	const codes = getEncoding(encoding);
	let max = 128;
	while (codes.length < 128) codes.push(128 + codes.length);
	for (const code of codes) if (code > max && code !== r) max = code;
	const map = new Uint8Array(max + 1);
	for (let i = 0; i < 128; i++) {
		map[i] = i;
		if (codes[i] !== r) map[codes[i]] = 128 + i;
	}
	encmaps.set(encoding, map);
	return map;
}
var E_STRICT$1, xUserDefined, iso8i, assertEncoding, r, mappers$1, decoders, encmaps;
var init_single_byte = __esmMin((() => {
	init_latin1();
	init_single_byte_encodings();
	init_platform();
	E_STRICT$1 = "Input is not well-formed for this encoding";
	xUserDefined = "x-user-defined";
	iso8i = "iso-8859-8-i";
	assertEncoding = (encoding) => {
		if (Object.hasOwn(maps$1, encoding) || encoding === xUserDefined || encoding === iso8i) return;
		throw new RangeError("Unsupported encoding");
	};
	r = 65533;
	mappers$1 = /* @__PURE__ */ new Map();
	decoders = /* @__PURE__ */ new Map();
	encmaps = /* @__PURE__ */ new Map();
}));
//#endregion
//#region node_modules/@exodus/bytes/single-byte.node.js
function latin1Prefix(arr, start) {
	let p = start | 0;
	const length = arr.length;
	for (const len3 = length - 3; p < len3; p += 4) {
		if ((arr[p] & 224) === 128) return p;
		if ((arr[p + 1] & 224) === 128) return p + 1;
		if ((arr[p + 2] & 224) === 128) return p + 2;
		if ((arr[p + 3] & 224) === 128) return p + 3;
	}
	for (; p < length; p++) if ((arr[p] & 224) === 128) return p;
	return length;
}
function createSinglebyteDecoder(encoding, loose = false) {
	if (typeof loose !== "boolean") throw new TypeError("loose option should be boolean");
	if (isDeno$1) {
		const jsDecoder = encodingDecoder(encoding);
		return (arr) => {
			assertU8(arr);
			if (arr.byteLength === 0) return "";
			if (isAscii(arr)) return toBuf(arr).toString();
			return jsDecoder(arr, loose);
		};
	}
	const isLatin1 = encoding === "iso-8859-1";
	const latin1path = encoding === "windows-1252";
	const { incomplete, mapper } = encodingMapper(encoding);
	return (arr) => {
		assertU8(arr);
		if (arr.byteLength === 0) return "";
		if (isLatin1 || isAscii(arr)) return toBuf(arr).latin1Slice(0, arr.byteLength);
		let prefixBytes = asciiPrefix(arr);
		let prefix = "";
		if (latin1path) prefixBytes = latin1Prefix(arr, prefixBytes);
		if (prefixBytes > 64 || prefixBytes === arr.length) {
			prefix = toBuf(arr).latin1Slice(0, prefixBytes);
			if (prefixBytes === arr.length) return prefix;
		}
		const b = toBuf(mapper(arr, prefix.length));
		if (!isLE) b.swap16();
		const suffix = b.ucs2Slice(0, b.byteLength);
		if (!loose && incomplete && suffix.includes("�")) throw new TypeError(E_STRICT$1);
		return prefix + suffix;
	};
}
function encode(s, m) {
	const len = s.length;
	let i = 0;
	const b = Buffer.from(s, "utf-16le");
	if (!isLE) b.swap16();
	const x = new Uint16Array(b.buffer, b.byteOffset, b.byteLength / 2);
	for (const len3 = len - 3; i < len3; i += 4) {
		const x0 = x[i], x1 = x[i + 1], x2 = x[i + 2], x3 = x[i + 3];
		const c0 = m[x0], c1 = m[x1], c2 = m[x2], c3 = m[x3];
		if (!(c0 && c1 && c2 && c3) && (!c0 && x0 || !c1 && x1 || !c2 && x2 || !c3 && x3)) return null;
		x[i] = c0;
		x[i + 1] = c1;
		x[i + 2] = c2;
		x[i + 3] = c3;
	}
	for (; i < len; i++) {
		const x0 = x[i];
		const c0 = m[x0];
		if (!c0 && x0) return null;
		x[i] = c0;
	}
	return new Uint8Array(x);
}
function latin1fromString(s) {
	if (typeof s !== "string") throw new TypeError(E_STRING);
	if (NON_LATIN$1.test(s)) throw new TypeError(E_STRICT$1);
	const ab = new ArrayBuffer(s.length);
	Buffer.from(ab).latin1Write(s);
	return new Uint8Array(ab);
}
function createSinglebyteEncoder(encoding, { mode = "fatal" } = {}) {
	if (mode !== "fatal") throw new Error("Unsupported mode");
	if (encoding === "iso-8859-1") return latin1fromString;
	const m = encodeMap(encoding);
	return (s) => {
		if (typeof s !== "string") throw new TypeError(E_STRING);
		if (!NON_LATIN$1.test(s)) {
			const byteLength = Buffer.byteLength(s);
			if (byteLength === s.length) {
				const ab = new ArrayBuffer(byteLength);
				Buffer.from(ab).latin1Write(s);
				return new Uint8Array(ab);
			}
		}
		const res = encode(s, m);
		if (!res) throw new TypeError(E_STRICT$1);
		return res;
	};
}
var NON_LATIN$1, latin1toString;
var init_single_byte_node = __esmMin((() => {
	init__utils();
	init_platform();
	init_latin1();
	init_single_byte();
	NON_LATIN$1 = /[^\x00-\xFF]/;
	latin1toString = /* @__PURE__ */ createSinglebyteDecoder("iso-8859-1");
}));
//#endregion
//#region node_modules/@exodus/bytes/fallback/encoding.labels.js
var labels;
var init_encoding_labels = __esmMin((() => {
	labels = {
		"utf-8": [
			"unicode-1-1-utf-8",
			"unicode11utf8",
			"unicode20utf8",
			"utf8",
			"x-unicode20utf8"
		],
		"utf-16be": ["unicodefffe"],
		"utf-16le": [
			"csunicode",
			"iso-10646-ucs-2",
			"ucs-2",
			"unicode",
			"unicodefeff",
			"utf-16"
		],
		"iso-8859-2": ["iso-ir-101"],
		"iso-8859-3": ["iso-ir-109"],
		"iso-8859-4": ["iso-ir-110"],
		"iso-8859-5": [
			"csisolatincyrillic",
			"cyrillic",
			"iso-ir-144"
		],
		"iso-8859-6": [
			"arabic",
			"asmo-708",
			"csiso88596e",
			"csiso88596i",
			"csisolatinarabic",
			"ecma-114",
			"iso-8859-6-e",
			"iso-8859-6-i",
			"iso-ir-127"
		],
		"iso-8859-7": [
			"csisolatingreek",
			"ecma-118",
			"elot_928",
			"greek",
			"greek8",
			"iso-ir-126",
			"sun_eu_greek"
		],
		"iso-8859-8": [
			"csiso88598e",
			"csisolatinhebrew",
			"hebrew",
			"iso-8859-8-e",
			"iso-ir-138",
			"visual"
		],
		"iso-8859-8-i": ["csiso88598i", "logical"],
		"iso-8859-16": [],
		"koi8-r": [
			"cskoi8r",
			"koi",
			"koi8",
			"koi8_r"
		],
		"koi8-u": ["koi8-ru"],
		"windows-874": [
			"dos-874",
			"iso-8859-11",
			"iso8859-11",
			"iso885911",
			"tis-620"
		],
		ibm866: [
			"866",
			"cp866",
			"csibm866"
		],
		"x-mac-cyrillic": ["x-mac-ukrainian"],
		macintosh: [
			"csmacintosh",
			"mac",
			"x-mac-roman"
		],
		gbk: [
			"chinese",
			"csgb2312",
			"csiso58gb231280",
			"gb2312",
			"gb_2312",
			"gb_2312-80",
			"iso-ir-58",
			"x-gbk"
		],
		gb18030: [],
		big5: [
			"big5-hkscs",
			"cn-big5",
			"csbig5",
			"x-x-big5"
		],
		"euc-jp": ["cseucpkdfmtjapanese", "x-euc-jp"],
		shift_jis: [
			"csshiftjis",
			"ms932",
			"ms_kanji",
			"shift-jis",
			"sjis",
			"windows-31j",
			"x-sjis"
		],
		"euc-kr": [
			"cseuckr",
			"csksc56011987",
			"iso-ir-149",
			"korean",
			"ks_c_5601-1987",
			"ks_c_5601-1989",
			"ksc5601",
			"ksc_5601",
			"windows-949"
		],
		"iso-2022-jp": ["csiso2022jp"],
		replacement: [
			"csiso2022kr",
			"hz-gb-2312",
			"iso-2022-cn",
			"iso-2022-cn-ext",
			"iso-2022-kr"
		],
		"x-user-defined": []
	};
	for (const i of [
		10,
		13,
		14,
		15
	]) labels[`iso-8859-${i}`] = [`iso8859-${i}`, `iso8859${i}`];
	for (const i of [
		2,
		6,
		7
	]) labels[`iso-8859-${i}`].push(`iso_8859-${i}:1987`);
	for (const i of [
		3,
		4,
		5,
		8
	]) labels[`iso-8859-${i}`].push(`iso_8859-${i}:1988`);
	for (let i = 2; i < 9; i++) labels[`iso-8859-${i}`].push(`iso8859-${i}`, `iso8859${i}`, `iso_8859-${i}`);
	for (let i = 2; i < 5; i++) labels[`iso-8859-${i}`].push(`csisolatin${i}`, `l${i}`, `latin${i}`);
	for (let i = 0; i < 9; i++) labels[`windows-125${i}`] = [`cp125${i}`, `x-cp125${i}`];
	labels["windows-1252"].push("ansi_x3.4-1968", "ascii", "cp819", "csisolatin1", "ibm819", "iso-8859-1", "iso-ir-100", "iso8859-1", "iso88591", "iso_8859-1", "iso_8859-1:1987", "l1", "latin1", "us-ascii");
	labels["windows-1254"].push("csisolatin5", "iso-8859-9", "iso-ir-148", "iso8859-9", "iso88599", "iso_8859-9", "iso_8859-9:1989", "l5", "latin5");
	labels["iso-8859-10"].push("csisolatin6", "iso-ir-157", "l6", "latin6");
	labels["iso-8859-15"].push("csisolatin9", "iso_8859-15", "l9");
}));
//#endregion
//#region node_modules/@exodus/bytes/fallback/encoding.api.js
function isAnyArrayBuffer(x) {
	if (x instanceof ArrayBuffer) return true;
	if (globalThis.SharedArrayBuffer && x instanceof SharedArrayBuffer) return true;
	if (!x || typeof x.byteLength !== "number") return false;
	const s = Object.prototype.toString.call(x);
	return s === "[object ArrayBuffer]" || s === "[object SharedArrayBuffer]";
}
function fromSource(x) {
	if (x instanceof Uint8Array) return x;
	if (ArrayBuffer.isView(x)) return new Uint8Array(x.buffer, x.byteOffset, x.byteLength);
	if (isAnyArrayBuffer(x)) {
		if ("detached" in x) return x.detached === true ? new Uint8Array() : new Uint8Array(x);
		try {
			return new Uint8Array(x);
		} catch {
			return new Uint8Array();
		}
	}
	throw new TypeError("Argument must be a SharedArrayBuffer, ArrayBuffer or ArrayBufferView");
}
function getBOMEncoding(input) {
	const u8 = fromSource(input);
	if (u8.length >= 3 && u8[0] === 239 && u8[1] === 187 && u8[2] === 191) return "utf-8";
	if (u8.length < 2) return null;
	if (u8[0] === 255 && u8[1] === 254) return "utf-16le";
	if (u8[0] === 254 && u8[1] === 255) return "utf-16be";
	return null;
}
var init_encoding_api = __esmMin((() => {}));
//#endregion
//#region node_modules/@exodus/bytes/fallback/encoding.util.js
function unfinishedBytes(u, len, enc) {
	switch (enc) {
		case "utf-8": {
			let p = 0;
			while (p < 2 && p < len && (u[len - p - 1] & 192) === 128) p++;
			if (p === len) return 0;
			const l = u[len - p - 1];
			if (l < 194 || l > 244) return 0;
			if (p === 0) return 1;
			if (l < 224 || l < 240 && p >= 2) return 0;
			const lower = l === 240 ? 144 : l === 224 ? 160 : 128;
			const upper = l === 244 ? 143 : l === 237 ? 159 : 191;
			const n = u[len - p];
			return n >= lower && n <= upper ? p + 1 : 0;
		}
		case "utf-16le":
		case "utf-16be": {
			const p = len % 2;
			if (len < 2) return p;
			const l = len - p - 1;
			const last = enc === "utf-16le" ? u[l] << 8 ^ u[l - 1] : u[l - 1] << 8 ^ u[l];
			return last >= 55296 && last < 56320 ? p + 2 : p;
		}
	}
	throw new Error("Unsupported encoding");
}
function mergePrefix(u, chunk, enc) {
	if (u.length === 0) return chunk;
	const cl = chunk.length;
	if (u.length < 3) {
		const a = new Uint8Array(cl + u.length);
		a.set(chunk);
		a.set(u, cl);
		return a;
	}
	const t = new Uint8Array(cl + 3);
	t.set(chunk);
	t.set(u.subarray(0, 3), cl);
	for (let i = 1; i <= 3; i++) {
		const unfinished = unfinishedBytes(t, cl + i, enc);
		if (unfinished <= i) {
			const add = i - unfinished;
			return add > 0 ? t.subarray(0, cl + add) : chunk;
		}
	}
}
var init_encoding_util = __esmMin((() => {}));
//#endregion
//#region node_modules/@exodus/bytes/fallback/encoding.js
function normalizeEncoding(label) {
	if (label === "utf-8" || label === "utf8" || label === "UTF-8" || label === "UTF8") return "utf-8";
	if (label === "windows-1252" || label === "ascii" || label === "latin1") return "windows-1252";
	if (/[^\w\t\n\f\r .:-]/i.test(label)) return null;
	const low = `${label}`.trim().toLowerCase();
	if (Object.hasOwn(labels, low)) return low;
	if (!labelsMap) {
		labelsMap = /* @__PURE__ */ new Map();
		for (const [name, aliases] of Object.entries(labels)) for (const alias of aliases) labelsMap.set(alias, name);
	}
	const mapped = labelsMap.get(low);
	if (mapped) return mapped;
	return null;
}
function labelToName(label) {
	const enc = normalizeEncoding(label);
	if (enc === "utf-8") return "UTF-8";
	if (!enc) return enc;
	if (uppercasePrefixes.has(enc.slice(0, 3))) return enc.toUpperCase();
	if (enc === "big5") return "Big5";
	if (enc === "shift_jis") return "Shift_JIS";
	return enc;
}
function setMultibyte(createDecoder, createEncoder) {
	createMultibyteDecoder$1 = createDecoder;
	multibyteEncoder$1 = createEncoder;
}
function getMultibyteEncoder() {
	if (!multibyteEncoder$1) throw new Error(E_MULTI);
	return multibyteEncoder$1;
}
function isAnyUint8Array(x) {
	if (x instanceof Uint8Array) return true;
	if (!x || !ArrayBuffer.isView(x) || x.BYTES_PER_ELEMENT !== 1) return false;
	return Object.prototype.toString.call(x) === "[object Uint8Array]";
}
function unicodeDecoder(encoding, loose) {
	if (encoding === "utf-8") return loose ? utf8toStringLoose : utf8toString;
	const form = encoding === "utf-16le" ? "uint8-le" : "uint8-be";
	return loose ? (u) => utf16toStringLoose(u, form) : (u) => utf16toString(u, form);
}
function legacyHookDecode(input, fallbackEncoding = "utf-8") {
	let u8 = fromSource(input);
	const bomEncoding = getBOMEncoding(u8);
	if (bomEncoding) u8 = u8.subarray(bomEncoding === "utf-8" ? 3 : 2);
	const enc = bomEncoding ?? normalizeEncoding(fallbackEncoding);
	if (enc === "utf-8") return utf8toStringLoose(u8);
	if (enc === "utf-16le" || enc === "utf-16be") {
		let suffix = "";
		if (u8.byteLength % 2 !== 0) {
			suffix = replacementChar;
			u8 = u8.subarray(0, -unfinishedBytes(u8, u8.byteLength, enc));
		}
		return utf16toStringLoose(u8, enc === "utf-16le" ? "uint8-le" : "uint8-be") + suffix;
	}
	if (!Object.hasOwn(labels, enc)) throw new RangeError(E_ENCODING);
	if (isMultibyte(enc)) {
		if (!createMultibyteDecoder$1) throw new Error(E_MULTI);
		return createMultibyteDecoder$1(enc, true)(u8);
	}
	if (enc === "replacement") return input.byteLength > 0 ? replacementChar : "";
	return createSinglebyteDecoder(enc, true)(u8);
}
function isomorphicDecode(input) {
	return latin1toString(fromSource(input));
}
function isomorphicEncode(str) {
	return latin1fromString(str);
}
var E_ENCODING, E_MULTI, E_OPTIONS, replacementChar, multibyteSet, createMultibyteDecoder$1, multibyteEncoder$1, labelsMap, uppercasePrefixes, isMultibyte, define, TextDecoder$1, TextEncoder$1, E_NO_STREAMS, TextDecoderStream, TextEncoderStream;
var init_encoding$1 = __esmMin((() => {
	init_utf16_node();
	init_utf8_node();
	init_single_byte_node();
	init_encoding_labels();
	init_encoding_api();
	init_encoding_util();
	E_ENCODING = "Unknown encoding";
	E_MULTI = "import '@exodus/bytes/encoding.js' for legacy multi-byte encodings support";
	E_OPTIONS = "The \"options\" argument must be of type object";
	replacementChar = "�";
	multibyteSet = new Set([
		"big5",
		"euc-kr",
		"euc-jp",
		"iso-2022-jp",
		"shift_jis",
		"gbk",
		"gb18030"
	]);
	uppercasePrefixes = new Set([
		"utf",
		"iso",
		"koi",
		"euc",
		"ibm",
		"gbk"
	]);
	isMultibyte = (enc) => multibyteSet.has(enc);
	define = (obj, key, value) => Object.defineProperty(obj, key, {
		value,
		writable: false
	});
	TextDecoder$1 = class {
		#decode;
		#unicode;
		#multibyte;
		#chunk;
		#canBOM;
		constructor(encoding = "utf-8", options = {}) {
			if (typeof options !== "object") throw new TypeError(E_OPTIONS);
			const enc = normalizeEncoding(encoding);
			if (!enc || enc === "replacement") throw new RangeError(E_ENCODING);
			define(this, "encoding", enc);
			define(this, "fatal", !!options.fatal);
			define(this, "ignoreBOM", !!options.ignoreBOM);
			this.#unicode = enc === "utf-8" || enc === "utf-16le" || enc === "utf-16be";
			this.#multibyte = !this.#unicode && isMultibyte(enc);
			this.#canBOM = this.#unicode && !this.ignoreBOM;
		}
		get [Symbol.toStringTag]() {
			return "TextDecoder";
		}
		decode(input, options = {}) {
			if (typeof options !== "object") throw new TypeError(E_OPTIONS);
			const stream = !!options.stream;
			let u = input === void 0 ? new Uint8Array() : fromSource(input);
			const empty = u.length === 0;
			if (empty && stream) return "";
			if (this.#unicode) {
				let prefix;
				if (this.#chunk) {
					const merged = mergePrefix(u, this.#chunk, this.encoding);
					if (u.length < 3) u = merged;
					else {
						prefix = merged;
						const add = prefix.length - this.#chunk.length;
						if (add > 0) u = u.subarray(add);
					}
					this.#chunk = null;
				} else if (empty) {
					this.#canBOM = !this.ignoreBOM;
					return "";
				}
				let suffix = "";
				if (stream || !this.fatal && this.encoding !== "utf-8") {
					const trail = unfinishedBytes(u, u.byteLength, this.encoding);
					if (trail > 0) {
						if (stream) this.#chunk = Uint8Array.from(u.subarray(-trail));
						else suffix = replacementChar;
						u = u.subarray(0, -trail);
					}
				}
				let seenBOM = false;
				if (this.#canBOM) {
					const bom = this.#findBom(prefix ?? u);
					if (bom) {
						seenBOM = true;
						if (prefix) prefix = prefix.subarray(bom);
						else u = u.subarray(bom);
					}
				} else if (!stream && !this.ignoreBOM) this.#canBOM = true;
				if (!this.#decode) this.#decode = unicodeDecoder(this.encoding, !this.fatal);
				try {
					const res = (prefix ? this.#decode(prefix) : "") + this.#decode(u) + suffix;
					if (stream && (seenBOM || res.length > 0)) this.#canBOM = false;
					return res;
				} catch (err) {
					this.#chunk = null;
					throw err;
				}
			} else if (this.#multibyte) {
				if (!createMultibyteDecoder$1) throw new Error(E_MULTI);
				if (!this.#decode) this.#decode = createMultibyteDecoder$1(this.encoding, !this.fatal);
				return this.#decode(u, stream);
			} else {
				if (!this.#decode) this.#decode = createSinglebyteDecoder(this.encoding, !this.fatal);
				return this.#decode(u);
			}
		}
		#findBom(u) {
			switch (this.encoding) {
				case "utf-8": return u.byteLength >= 3 && u[0] === 239 && u[1] === 187 && u[2] === 191 ? 3 : 0;
				case "utf-16le": return u.byteLength >= 2 && u[0] === 255 && u[1] === 254 ? 2 : 0;
				case "utf-16be": return u.byteLength >= 2 && u[0] === 254 && u[1] === 255 ? 2 : 0;
			}
			/* c8 ignore next */
			throw new Error("Unreachable");
		}
	};
	TextEncoder$1 = class {
		constructor() {
			define(this, "encoding", "utf-8");
		}
		get [Symbol.toStringTag]() {
			return "TextEncoder";
		}
		encode(str = "") {
			if (typeof str !== "string") str = `${str}`;
			return utf8fromStringLoose(str);
		}
		encodeInto(str, target) {
			if (typeof str !== "string") str = `${str}`;
			if (!isAnyUint8Array(target)) throw new TypeError("Target must be an Uint8Array");
			if (target.buffer.detached) return {
				read: 0,
				written: 0
			};
			const tlen = target.length;
			if (tlen < str.length) str = str.slice(0, tlen);
			let u8 = utf8fromStringLoose(str);
			let read;
			if (tlen >= u8.length) read = str.length;
			else if (u8.length === str.length) {
				if (u8.length > tlen) u8 = u8.subarray(0, tlen);
				read = u8.length;
			} else {
				u8 = u8.subarray(0, tlen);
				const unfinished = unfinishedBytes(u8, u8.length, "utf-8");
				if (unfinished > 0) u8 = u8.subarray(0, u8.length - unfinished);
				read = utf8toStringLoose(u8).length;
			}
			try {
				target.set(u8);
			} catch {
				return {
					read: 0,
					written: 0
				};
			}
			return {
				read,
				written: u8.length
			};
		}
	};
	E_NO_STREAMS = "TransformStream global not present in the environment";
	TextDecoderStream = class {
		constructor(encoding = "utf-8", options = {}) {
			if (!globalThis.TransformStream) throw new Error(E_NO_STREAMS);
			const decoder = new TextDecoder$1(encoding, options);
			const transform = new TransformStream({
				transform: (chunk, controller) => {
					const value = decoder.decode(fromSource(chunk), { stream: true });
					if (value) controller.enqueue(value);
				},
				flush: (controller) => {
					const value = decoder.decode();
					if (value) controller.enqueue(value);
				}
			});
			define(this, "encoding", decoder.encoding);
			define(this, "fatal", decoder.fatal);
			define(this, "ignoreBOM", decoder.ignoreBOM);
			define(this, "readable", transform.readable);
			define(this, "writable", transform.writable);
		}
		get [Symbol.toStringTag]() {
			return "TextDecoderStream";
		}
	};
	TextEncoderStream = class {
		constructor() {
			if (!globalThis.TransformStream) throw new Error(E_NO_STREAMS);
			let lead;
			const transform = new TransformStream({
				transform: (chunk, controller) => {
					let s = String(chunk);
					if (s.length === 0) return;
					if (lead) {
						s = lead + s;
						lead = null;
					}
					if ((s.charCodeAt(s.length - 1) & 64512) === 55296) {
						lead = s[s.length - 1];
						s = s.slice(0, -1);
					}
					if (s) controller.enqueue(utf8fromStringLoose(s));
				},
				flush: (controller) => {
					if (lead) controller.enqueue(Uint8Array.of(239, 191, 189));
				}
			});
			define(this, "encoding", "utf-8");
			define(this, "readable", transform.readable);
			define(this, "writable", transform.writable);
		}
		get [Symbol.toStringTag]() {
			return "TextEncoderStream";
		}
	};
}));
//#endregion
//#region node_modules/@exodus/bytes/encoding-lite.js
var encoding_lite_exports = /* @__PURE__ */ __exportAll({
	TextDecoder: () => TextDecoder$1,
	TextDecoderStream: () => TextDecoderStream,
	TextEncoder: () => TextEncoder$1,
	TextEncoderStream: () => TextEncoderStream,
	getBOMEncoding: () => getBOMEncoding,
	isomorphicDecode: () => isomorphicDecode,
	isomorphicEncode: () => isomorphicEncode,
	labelToName: () => labelToName,
	legacyHookDecode: () => legacyHookDecode,
	normalizeEncoding: () => normalizeEncoding
});
var init_encoding_lite = __esmMin((() => {
	init_encoding$1();
}));
//#endregion
//#region node_modules/@exodus/bytes/assert.js
function assertEmptyRest(rest) {
	if (Object.keys(rest).length > 0) throw new TypeError("Unexpected extra options");
}
var init_assert = __esmMin((() => {}));
//#endregion
//#region node_modules/@exodus/bytes/fallback/base64.js
var base64_exports$1 = /* @__PURE__ */ __exportAll({
	E_CHAR: () => E_CHAR$1,
	E_LAST: () => E_LAST$1,
	E_LENGTH: () => E_LENGTH$1,
	E_PADDING: () => E_PADDING$1,
	fromBase64: () => fromBase64$1,
	toBase64: () => toBase64$1
});
function toBase64$1(arr, isURL, padding) {
	const fullChunks = arr.length / 3 | 0;
	const fullChunksBytes = fullChunks * 3;
	let o = "";
	let i = 0;
	const alphabet = isURL ? BASE64URL : BASE64;
	const helpers = isURL ? BASE64URL_HELPERS : BASE64_HELPERS;
	if (!helpers.pairs) {
		helpers.pairs = [];
		if (nativeDecoder) {
			helpers.codepairs = new Uint16Array(4096);
			const u16 = helpers.codepairs;
			const u8 = new Uint8Array(u16.buffer, u16.byteOffset, u16.byteLength);
			for (let i = 0; i < 64; i++) {
				const ic = alphabet[i].charCodeAt(0);
				for (let j = 0; j < 64; j++) u8[i << 7 | j << 1] = u8[j << 7 | (i << 1) + 1] = ic;
			}
		} else {
			const p = helpers.pairs;
			for (let i = 0; i < 64; i++) for (let j = 0; j < 64; j++) p.push(`${alphabet[i]}${alphabet[j]}`);
		}
	}
	const { pairs, codepairs } = helpers;
	if (nativeDecoder) {
		const oa = new Uint16Array(fullChunks * 2);
		let j = 0;
		for (const last = arr.length - 11; i < last; i += 12, j += 8) {
			const x0 = arr[i];
			const x1 = arr[i + 1];
			const x2 = arr[i + 2];
			const x3 = arr[i + 3];
			const x4 = arr[i + 4];
			const x5 = arr[i + 5];
			const x6 = arr[i + 6];
			const x7 = arr[i + 7];
			const x8 = arr[i + 8];
			const x9 = arr[i + 9];
			const x10 = arr[i + 10];
			const x11 = arr[i + 11];
			oa[j] = codepairs[x0 << 4 | x1 >> 4];
			oa[j + 1] = codepairs[(x1 & 15) << 8 | x2];
			oa[j + 2] = codepairs[x3 << 4 | x4 >> 4];
			oa[j + 3] = codepairs[(x4 & 15) << 8 | x5];
			oa[j + 4] = codepairs[x6 << 4 | x7 >> 4];
			oa[j + 5] = codepairs[(x7 & 15) << 8 | x8];
			oa[j + 6] = codepairs[x9 << 4 | x10 >> 4];
			oa[j + 7] = codepairs[(x10 & 15) << 8 | x11];
		}
		for (const last = arr.length - 2; i < last; i += 3, j += 2) {
			const a = arr[i];
			const b = arr[i + 1];
			const c = arr[i + 2];
			oa[j] = codepairs[a << 4 | b >> 4];
			oa[j + 1] = codepairs[(b & 15) << 8 | c];
		}
		o = decodeAscii(oa);
	} else for (; i < fullChunksBytes; i += 3) {
		const a = arr[i];
		const b = arr[i + 1];
		const c = arr[i + 2];
		o += pairs[a << 4 | b >> 4];
		o += pairs[(b & 15) << 8 | c];
	}
	let carry = 0;
	let shift = 2;
	const length = arr.length;
	for (; i < length; i++) {
		const x = arr[i];
		o += alphabet[carry | x >> shift];
		if (shift === 6) {
			shift = 0;
			o += alphabet[x & 63];
		}
		carry = x << 6 - shift & 63;
		shift += 2;
	}
	if (shift !== 2) o += alphabet[carry];
	if (padding) o += [
		"",
		"==",
		"="
	][length - fullChunksBytes];
	return o;
}
function fromBase64$1(str, isURL) {
	let inputLength = str.length;
	while (str[inputLength - 1] === "=") inputLength--;
	const paddingLength = str.length - inputLength;
	const tailLength = inputLength % 4;
	const mainLength = inputLength - tailLength;
	if (tailLength === 1) throw new SyntaxError(E_LENGTH$1);
	if (paddingLength > 3 || paddingLength !== 0 && str.length % 4 !== 0) throw new SyntaxError(E_PADDING$1);
	const alphabet = isURL ? BASE64URL : BASE64;
	const helpers = isURL ? BASE64URL_HELPERS : BASE64_HELPERS;
	if (!helpers.fromMap) {
		helpers.fromMap = new Int8Array(mapSize).fill(-1);
		alphabet.forEach((c, i) => helpers.fromMap[c.charCodeAt(0)] = i);
	}
	const m = helpers.fromMap;
	const arr = new Uint8Array(Math.floor(inputLength * 3 / 4));
	let at = 0;
	let i = 0;
	if (nativeEncoder) {
		const codes = encodeAscii(str, E_CHAR$1);
		for (; i < mainLength; i += 4) {
			const c0 = codes[i];
			const c1 = codes[i + 1];
			const c2 = codes[i + 2];
			const c3 = codes[i + 3];
			const a = m[c0] << 18 | m[c1] << 12 | m[c2] << 6 | m[c3];
			if (a < 0) throw new SyntaxError(E_CHAR$1);
			arr[at] = a >> 16;
			arr[at + 1] = a >> 8 & 255;
			arr[at + 2] = a & 255;
			at += 3;
		}
	} else for (; i < mainLength; i += 4) {
		const c0 = str.charCodeAt(i);
		const c1 = str.charCodeAt(i + 1);
		const c2 = str.charCodeAt(i + 2);
		const c3 = str.charCodeAt(i + 3);
		const a = m[c0] << 18 | m[c1] << 12 | m[c2] << 6 | m[c3];
		if (a < 0) throw new SyntaxError(E_CHAR$1);
		arr[at] = a >> 16;
		arr[at + 1] = a >> 8 & 255;
		arr[at + 2] = a & 255;
		at += 3;
	}
	if (tailLength < 2) return arr;
	const ab = m[str.charCodeAt(i++)] << 6 | m[str.charCodeAt(i++)];
	if (ab < 0) throw new SyntaxError(E_CHAR$1);
	arr[at++] = ab >> 4;
	if (tailLength < 3) {
		if (ab & 15) throw new SyntaxError(E_LAST$1);
		return arr;
	}
	const c = m[str.charCodeAt(i++)];
	if (c < 0) throw new SyntaxError(E_CHAR$1);
	arr[at++] = ab << 4 & 255 | c >> 2;
	if (c & 3) throw new SyntaxError(E_LAST$1);
	return arr;
}
var BASE64, BASE64URL, BASE64_HELPERS, BASE64URL_HELPERS, E_CHAR$1, E_PADDING$1, E_LENGTH$1, E_LAST$1, mapSize;
var init_base64$1 = __esmMin((() => {
	init_platform();
	init_latin1();
	BASE64 = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"];
	BASE64URL = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"];
	BASE64_HELPERS = {};
	BASE64URL_HELPERS = {};
	E_CHAR$1 = "Invalid character in base64 input";
	E_PADDING$1 = "Invalid base64 padding";
	E_LENGTH$1 = "Invalid base64 length";
	E_LAST$1 = "Invalid last chunk";
	mapSize = nativeEncoder ? 128 : 65536;
}));
//#endregion
//#region node_modules/@exodus/bytes/base64.js
var base64_exports = /* @__PURE__ */ __exportAll({
	fromBase64: () => fromBase64,
	fromBase64any: () => fromBase64any,
	fromBase64url: () => fromBase64url,
	toBase64: () => toBase64,
	toBase64url: () => toBase64url
});
function maybeUnpad(res, padding) {
	if (padding) return res;
	const at = res.indexOf("=", res.length - 3);
	return at === -1 ? res : res.slice(0, at);
}
function maybePad(res, padding) {
	return padding && res.length % 4 !== 0 ? res + "=".repeat(4 - res.length % 4) : res;
}
function toBase64(x, { padding = true } = {}) {
	assertU8(x);
	if (haveWeb(x)) return padding ? x.toBase64() : x.toBase64({ omitPadding: !padding });
	if (haveNativeBuffer) return maybeUnpad(toBuffer(x).base64Slice(0, x.byteLength), padding);
	if (shouldUseBtoa) return maybeUnpad(btoa(decodeLatin1(x)), padding);
	return toBase64$1(x, false, padding);
}
function toBase64url(x, { padding = false } = {}) {
	assertU8(x);
	if (haveWeb(x)) return x.toBase64({
		alphabet: "base64url",
		omitPadding: !padding
	});
	if (haveNativeBuffer) return maybePad(toBuffer(x).base64urlSlice(0, x.byteLength), padding);
	if (shouldUseBtoa) return maybeUnpad(toUrl(btoa(decodeLatin1(x))), padding);
	return toBase64$1(x, true, padding);
}
function fromBase64(str, options) {
	if (typeof options === "string") options = { format: options };
	if (!options) return fromBase64common(str, false, "both", "uint8", null);
	const { format = "uint8", padding = "both", ...rest } = options;
	return fromBase64common(str, false, padding, format, rest);
}
function fromBase64url(str, options) {
	if (!options) return fromBase64common(str, true, false, "uint8", null);
	const { format = "uint8", padding = false, ...rest } = options;
	return fromBase64common(str, true, padding, format, rest);
}
function fromBase64any(str, { format = "uint8", padding = "both", ...rest } = {}) {
	return fromBase64common(str, !str.includes("+") && !str.includes("/"), padding, format, rest);
}
function fromBase64common(str, isBase64url, padding, format, rest) {
	if (typeof str !== "string") throw new TypeError(E_STRING);
	if (rest !== null) assertEmptyRest(rest);
	const auto = padding === "both" ? str.endsWith("=") : void 0;
	if (padding === true || auto === true) {
		if (str.length % 4 !== 0) throw new SyntaxError(E_PADDING);
		if (str[str.length - 3] === "=") throw new SyntaxError(E_PADDING);
	} else if (padding === false || auto === false) {
		if (str.length % 4 === 1) throw new SyntaxError(E_LENGTH);
		if (padding === false && str.endsWith("=")) throw new SyntaxError("Did not expect padding in base64 input");
	} else throw new TypeError("Invalid padding option");
	return fromBase64impl(str, isBase64url, padding, format);
}
function noWhitespaceSeen(str, arr) {
	const at = str.indexOf("=", str.length - 3);
	const paddingLength = at >= 0 ? str.length - at : 0;
	const chars = str.length - paddingLength;
	const e = chars % 4;
	const b = arr.length - (chars - e) / 4 * 3;
	return e === 0 && b === 0 || e === 2 && b === 1 || e === 3 && b === 2;
}
var Buffer$1, atob, btoa, haveNativeBuffer, web64, E_CHAR, E_PADDING, E_LENGTH, E_LAST, shouldUseBtoa, shouldUseAtob, isBuffer, toBuffer, toUrl, haveWeb, ASCII_WHITESPACE, fromBase64impl, init_base64 = __esmMin((() => {
	init_assert();
	init__utils();
	init_platform();
	init_latin1();
	init_base64$1();
	({Buffer: Buffer$1, atob, btoa} = globalThis);
	haveNativeBuffer = Buffer$1 && !Buffer$1.TYPED_ARRAY_SUPPORT;
	({toBase64: web64} = Uint8Array.prototype);
	({E_CHAR, E_PADDING, E_LENGTH, E_LAST} = base64_exports$1);
	shouldUseBtoa = btoa && isHermes;
	shouldUseAtob = atob && isHermes;
	isBuffer = (x) => x.constructor === Buffer$1 && Buffer$1.isBuffer(x);
	toBuffer = (x) => isBuffer(x) ? x : Buffer$1.from(x.buffer, x.byteOffset, x.byteLength);
	toUrl = (x) => x.replaceAll("+", "-").replaceAll("/", "_");
	haveWeb = (x) => web64 && x.toBase64 === web64;
	ASCII_WHITESPACE = /[\t\n\f\r ]/;
	if (Uint8Array.fromBase64) fromBase64impl = (str, isBase64url, padding, format) => {
		const alphabet = isBase64url ? "base64url" : "base64";
		let arr;
		if (padding === true) arr = Uint8Array.fromBase64(str, {
			alphabet,
			lastChunkHandling: "strict"
		});
		else try {
			const padded = str.length % 4 > 0 ? `${str}${"=".repeat(4 - str.length % 4)}` : str;
			arr = Uint8Array.fromBase64(padded, {
				alphabet,
				lastChunkHandling: "strict"
			});
		} catch (err) {
			throw ASCII_WHITESPACE.test(str) ? new SyntaxError(E_CHAR) : err;
		}
		if (!noWhitespaceSeen(str, arr)) throw new SyntaxError(E_CHAR);
		return fromUint8(arr, format);
	};
	else if (haveNativeBuffer) fromBase64impl = (str, isBase64url, padding, format) => {
		const size = Buffer$1.byteLength(str, "base64");
		const arr = Buffer$1.allocUnsafeSlow(size);
		if (arr.base64Write(str) !== size) throw new SyntaxError(E_PADDING);
		if ((isBase64url ? maybeUnpad(str, padding === false) : maybePad(str, padding !== true)) !== (isBase64url ? arr.base64urlSlice(0, arr.length) : arr.base64Slice(0, arr.length))) throw new SyntaxError(E_PADDING);
		return fromBuffer(arr, format);
	};
	else if (shouldUseAtob) fromBase64impl = (str, isBase64url, padding, format) => {
		let arr;
		if (isBase64url) {
			if (/[\t\n\f\r +/]/.test(str)) throw new SyntaxError(E_CHAR);
			str = str.replaceAll("-", "+").replaceAll("_", "/");
		}
		try {
			arr = encodeLatin1(atob(str));
		} catch {
			throw new SyntaxError(E_CHAR);
		}
		if (!isBase64url && !noWhitespaceSeen(str, arr)) throw new SyntaxError(E_CHAR);
		if (arr.length % 3 !== 0) {
			if (toBase64(arr.subarray(-(arr.length % 3))) !== (str.length % 4 === 0 ? str.slice(-4) : str.slice(-(str.length % 4)).padEnd(4, "="))) throw new SyntaxError(E_LAST);
		}
		return fromUint8(arr, format);
	};
	else fromBase64impl = (str, isBase64url, padding, format) => fromUint8(fromBase64$1(str, isBase64url), format);
}));
var init_multi_byte_encodings = __esmMin((() => {}));
//#endregion
//#region node_modules/@exodus/bytes/fallback/multi-byte.encodings.cjs
var require_multi_byte_encodings = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = () => init_multi_byte_encodings();
}));
//#endregion
//#region node_modules/@exodus/bytes/fallback/multi-byte.table.js
function loadBase64(str) {
	const x = fromBase64url(str);
	const len = x.length;
	const len2 = len >> 1;
	const y = new Uint8Array(len);
	let a = -1, b = 0;
	for (let i = 0, j = 0; i < len; i += 2, j++) {
		a = a + x[j] + 1 & 255;
		b = b + x[len2 + j] & 255;
		y[i] = a;
		y[i + 1] = b;
	}
	return y;
}
function unwrap(res, t, pos) {
	let code = 0;
	for (let i = 0; i < t.length; i++) {
		let x = t[i];
		if (typeof x === "number") if (x === 0) pos += t[++i];
		else {
			if (x < 0) {
				code -= x;
				x = 1;
			} else code += t[++i];
			for (let k = 0; k < x; k++, pos++, code++) if (code <= 65535) res[pos] = code;
			else {
				const c = String.fromCodePoint(code);
				res[pos] = c.charCodeAt(0) << 16 | c.charCodeAt(1);
			}
		}
		else if (x[0] === "$" && Object.hasOwn(indices, x)) pos = unwrap(res, indices[x], pos);
		else {
			let last;
			for (const c of utf16toString(loadBase64(x), "uint8-le")) {
				last = c;
				res[pos++] = c.length === 1 ? c.charCodeAt(0) : c.charCodeAt(0) << 16 | c.charCodeAt(1);
			}
			code = last.codePointAt(0) + 1;
		}
	}
	return pos;
}
function getTable(id) {
	const cached = tables.get(id);
	if (cached) return cached;
	if (!indices) indices = (0, import_multi_byte_encodings.default)();
	if (!Object.hasOwn(indices, id)) throw new Error("Unknown encoding");
	if (!indices[id]) throw new Error("Table already used (likely incorrect bundler dedupe)");
	let res;
	if (id.endsWith("-ranges")) {
		res = [];
		let a = 0, b = 0;
		const idx = indices[id];
		while (idx.length > 0) res.push([a += idx.shift(), b += idx.shift()]);
	} else if (id.endsWith("-katakana")) {
		let a = -1;
		res = new Uint16Array(indices[id].map((x) => a += x + 1));
	} else if (id === "big5") {
		res = new Uint32Array(sizes[id]);
		unwrap(res, indices[id], 0);
		res[1133] = 13239044;
		res[1135] = 13239052;
		res[1164] = 15336196;
		res[1166] = 15336204;
	} else {
		if (!Object.hasOwn(sizes, id)) throw new Error("Unknown encoding");
		res = new Uint16Array(sizes[id]);
		unwrap(res, indices[id], 0);
	}
	indices[id] = null;
	tables.set(id, res);
	return res;
}
var import_multi_byte_encodings, sizes, indices, tables;
var init_multi_byte_table = __esmMin((() => {
	init_base64();
	init_utf16_node();
	import_multi_byte_encodings = /* @__PURE__ */ __toESM(require_multi_byte_encodings(), 1);
	sizes = {
		jis0208: 11104,
		jis0212: 7211,
		"euc-kr": 23750,
		gb18030: 23940,
		big5: 19782
	};
	tables = /* @__PURE__ */ new Map();
}));
//#endregion
//#region node_modules/@exodus/bytes/fallback/multi-byte.js
function multibyteDecoder(enc, loose = false) {
	if (typeof loose !== "boolean") throw new TypeError("loose option should be boolean");
	if (!Object.hasOwn(mappers, enc)) throw new RangeError("Unsupported encoding");
	let mapper;
	const asciiSuperset = isAsciiSuperset(enc);
	let streaming;
	const onErr = loose ? () => 65533 : () => {
		if (!streaming) mapper = null;
		throw new TypeError(E_STRICT);
	};
	return (arr, stream = false) => {
		let res = "";
		if (asciiSuperset && (!mapper || mapper.isAscii?.())) {
			const prefixLen = asciiPrefix(arr);
			if (prefixLen === arr.length) return decodeAscii(arr);
			res = decodeLatin1(arr, 0, prefixLen);
		}
		streaming = stream;
		if (!mapper) mapper = mappers[enc](onErr);
		return res + mapper.decode(arr, res.length, arr.length, stream);
	};
}
function getMap(id, size, ascii) {
	const cached = maps.get(id);
	if (cached) return cached;
	let tname = id;
	const sjis = id === "shift_jis";
	if (id === "iso-2022-jp") tname = "jis0208";
	if (id === "gbk") tname = "gb18030";
	if (id === "euc-jp" || sjis) tname = "jis0208";
	const table = getTable(tname);
	const map = new Uint16Array(size);
	const enc = preencoders[id] || ((p) => p + 1);
	for (let i = 0; i < table.length; i++) {
		const c = table[i];
		if (!c) continue;
		if (id === "big5") {
			if (i < 5024) continue;
			if (map[c] && c !== 9552 && c !== 9566 && c !== 9569 && c !== 9578 && c !== 21313 && c !== 21317) continue;
		} else {
			if (sjis && i >= 8272 && i <= 8835) continue;
			if (map[c]) continue;
		}
		if (c > 65535) {
			const s = String.fromCharCode(c >> 16, c & 65535);
			map[s.codePointAt(0)] = enc(i);
		} else map[c] = enc(i);
	}
	if (ascii) for (let i = 0; i < 128; i++) map[i] = i;
	if (sjis || id === "euc-jp") {
		if (sjis) map[128] = 128;
		const d = sjis ? 65216 : 28864;
		for (let i = 65377; i <= 65439; i++) map[i] = i - d;
		map[8722] = map[65293];
		map[165] = 92;
		map[8254] = 126;
	} else if (tname === "gb18030") {
		if (id === "gbk") map[8364] = 128;
		for (let i = 59277; i <= 59283; i++) map[i] = i - 16564;
		for (const [a, b] of e7) map[59136 | a] = 42496 | b;
		for (const [a, b] of e8) map[59392 | a] = 65024 | b;
	}
	maps.set(id, map);
	return map;
}
function multibyteEncoder(enc, onError) {
	if (!Object.hasOwn(mappers, enc)) throw new RangeError("Unsupported encoding");
	const size = enc === "big5" ? 194727 : 65536;
	const iso2022jp = enc === "iso-2022-jp";
	const gb18030 = enc === "gb18030";
	const ascii = isAsciiSuperset(enc);
	const width = iso2022jp ? 5 : gb18030 ? 4 : 2;
	const tailsize = iso2022jp ? 3 : 0;
	const map = getMap(enc, size, ascii);
	if (gb18030 && !gb18030r) gb18030r = getTable("gb18030-ranges");
	if (iso2022jp && !katakana) katakana = getTable("iso-2022-jp-katakana");
	return (str) => {
		if (typeof str !== "string") throw new TypeError(E_STRING);
		if (ascii && nativeEncoder && !NON_LATIN.test(str)) {
			const u8 = nativeEncoder.encode(str);
			if (u8.length === str.length) return u8;
		}
		const length = str.length;
		const u8 = new Uint8Array(length * width + tailsize);
		let i = 0;
		if (ascii) while (i < length) {
			const x = str.charCodeAt(i);
			if (x >= 128) break;
			u8[i++] = x;
		}
		const err = (code) => {
			if (onError) return onError(code, u8, i);
			throw new TypeError(E_STRICT);
		};
		if (!map || map.length < size) /* c8 ignore next */ throw new Error("Unreachable");
		if (iso2022jp) {
			let state = 0;
			const restore = () => {
				state = 0;
				u8[i++] = 27;
				u8[i++] = 40;
				u8[i++] = 66;
			};
			for (let j = 0; j < length; j++) {
				let x = str.charCodeAt(j);
				if (x >= 55296 && x < 57344) {
					if (state === 2) restore();
					if (x >= 56320 || j + 1 === length) i += err(x);
					else {
						const x1 = str.charCodeAt(j + 1);
						if (x1 < 56320 || x1 >= 57344) i += err(x);
						else {
							j++;
							i += err(65536 + (x1 & 1023 | (x & 1023) << 10));
						}
					}
				} else if (x < 128) {
					if (state === 2 || state === 1 && (x === 92 || x === 126)) restore();
					if (x === 14 || x === 15 || x === 27) i += err(65533);
					else u8[i++] = x;
				} else if (x === 165 || x === 8254) {
					if (state !== 1) {
						state = 1;
						u8[i++] = 27;
						u8[i++] = 40;
						u8[i++] = 74;
					}
					u8[i++] = x === 165 ? 92 : 126;
				} else {
					if (x === 8722) x = 65293;
					if (x >= 65377 && x <= 65439) x = katakana[x - 65377];
					const e = map[x];
					if (e) {
						if (state !== 2) {
							state = 2;
							u8[i++] = 27;
							u8[i++] = 36;
							u8[i++] = 66;
						}
						u8[i++] = e >> 8;
						u8[i++] = e & 255;
					} else {
						if (state === 2) restore();
						i += err(x);
					}
				}
			}
			if (state) restore();
		} else if (gb18030) {
			const encode = (cp) => {
				let a = 0, b = 0;
				for (const [c, d] of gb18030r) {
					if (d > cp) break;
					a = c;
					b = d;
				}
				let rp = cp === 59335 ? 7457 : a + cp - b;
				u8[i++] = 129 + (rp / 12600 | 0);
				rp %= 12600;
				u8[i++] = 48 + (rp / 1260 | 0);
				rp %= 1260;
				u8[i++] = 129 + (rp / 10 | 0);
				u8[i++] = 48 + rp % 10;
			};
			for (let j = i; j < length; j++) {
				const x = str.charCodeAt(j);
				if (x >= 55296 && x < 57344) if (x >= 56320 || j + 1 === length) i += err(x);
				else {
					const x1 = str.charCodeAt(j + 1);
					if (x1 < 56320 || x1 >= 57344) i += err(x);
					else {
						j++;
						encode(65536 + (x1 & 1023 | (x & 1023) << 10));
					}
				}
				else {
					const e = map[x];
					if (e & 65280) {
						u8[i++] = e >> 8;
						u8[i++] = e & 255;
					} else if (e || x === 0) u8[i++] = e;
					else if (x === 58853) i += err(x);
					else encode(x);
				}
			}
		} else {
			const long = enc === "big5" ? (x) => {
				const e = map[x];
				if (e & 65280) {
					u8[i++] = e >> 8;
					u8[i++] = e & 255;
				} else if (e || x === 0) u8[i++] = e;
				else i += err(x);
			} : (x) => {
				i += err(x);
			};
			for (let j = i; j < length; j++) {
				const x = str.charCodeAt(j);
				if (x >= 55296 && x < 57344) if (x >= 56320 || j + 1 === length) i += err(x);
				else {
					const x1 = str.charCodeAt(j + 1);
					if (x1 < 56320 || x1 >= 57344) i += err(x);
					else {
						j++;
						long(65536 + (x1 & 1023 | (x & 1023) << 10));
					}
				}
				else {
					const e = map[x];
					if (e & 65280) {
						u8[i++] = e >> 8;
						u8[i++] = e & 255;
					} else if (e || x === 0) u8[i++] = e;
					else i += err(x);
				}
			}
		}
		return i === u8.length ? u8 : u8.slice(0, i);
	};
}
var E_STRICT, mappers, isAsciiSuperset, maps, e7, e8, preencoders, NON_LATIN, gb18030r, katakana;
var init_multi_byte = __esmMin((() => {
	init__utils();
	init_platform();
	init_latin1();
	init_multi_byte_table();
	E_STRICT = "Input is not well-formed for this encoding";
	mappers = {
		"euc-kr": (err) => {
			const euc = getTable("euc-kr");
			let lead = 0;
			let oi = 0;
			let o16;
			const decodeLead = (b) => {
				if (b < 65 || b > 254) {
					lead = 0;
					o16[oi++] = err();
					if (b < 128) o16[oi++] = b;
				} else {
					const p = euc[(lead - 129) * 190 + b - 65];
					lead = 0;
					if (p) o16[oi++] = p;
					else {
						o16[oi++] = err();
						if (b < 128) o16[oi++] = b;
					}
				}
			};
			const decode = (arr, start, end, stream) => {
				let i = start;
				o16 = new Uint16Array(end - start + (lead ? 1 : 0));
				oi = 0;
				if (!lead) for (const last1 = end - 1; i < last1;) {
					const l = arr[i];
					if (l < 128) {
						o16[oi++] = l;
						i++;
					} else {
						if (l === 128 || l === 255) break;
						const b = arr[i + 1];
						if (b < 65 || b === 255) break;
						const p = euc[(l - 129) * 190 + b - 65];
						if (!p) break;
						o16[oi++] = p;
						i += 2;
					}
				}
				if (lead && i < end) decodeLead(arr[i++]);
				while (i < end) {
					const b = arr[i++];
					if (b < 128) o16[oi++] = b;
					else if (b === 128 || b === 255) o16[oi++] = err();
					else {
						lead = b;
						if (i < end) decodeLead(arr[i++]);
					}
				}
				if (lead && !stream) {
					lead = 0;
					o16[oi++] = err();
				}
				const res = decodeUCS2(o16, oi);
				o16 = null;
				return res;
			};
			return {
				decode,
				isAscii: () => lead === 0
			};
		},
		"euc-jp": (err) => {
			const jis0208 = getTable("jis0208");
			const jis0212 = getTable("jis0212");
			let j12 = false;
			let lead = 0;
			let oi = 0;
			let o16;
			const decodeLead = (b) => {
				if (lead === 142 && b >= 161 && b <= 223) {
					lead = 0;
					o16[oi++] = 65216 + b;
				} else if (lead === 143 && b >= 161 && b <= 254) {
					j12 = true;
					lead = b;
				} else {
					let cp;
					if (lead >= 161 && lead <= 254 && b >= 161 && b <= 254) cp = (j12 ? jis0212 : jis0208)[(lead - 161) * 94 + b - 161];
					lead = 0;
					j12 = false;
					if (cp) o16[oi++] = cp;
					else {
						o16[oi++] = err();
						if (b < 128) o16[oi++] = b;
					}
				}
			};
			const decode = (arr, start, end, stream) => {
				let i = start;
				o16 = new Uint16Array(end - start + (lead ? 1 : 0));
				oi = 0;
				if (!lead) for (const last1 = end - 1; i < last1;) {
					const l = arr[i];
					if (l < 128) {
						o16[oi++] = l;
						i++;
					} else {
						const b = arr[i + 1];
						if (l === 142 && b >= 161 && b <= 223) {
							o16[oi++] = 65216 + b;
							i += 2;
						} else {
							if (l < 161 || l === 255 || b < 161 || b === 255) break;
							const cp = jis0208[(l - 161) * 94 + b - 161];
							if (!cp) break;
							o16[oi++] = cp;
							i += 2;
						}
					}
				}
				if (lead && i < end) decodeLead(arr[i++]);
				if (lead && i < end) decodeLead(arr[i++]);
				while (i < end) {
					const b = arr[i++];
					if (b < 128) o16[oi++] = b;
					else if (b < 161 && b !== 142 && b !== 143 || b === 255) o16[oi++] = err();
					else {
						lead = b;
						if (i < end) decodeLead(arr[i++]);
						if (lead && i < end) decodeLead(arr[i++]);
					}
				}
				if (lead && !stream) {
					lead = 0;
					j12 = false;
					o16[oi++] = err();
				}
				const res = decodeUCS2(o16, oi);
				o16 = null;
				return res;
			};
			return {
				decode,
				isAscii: () => lead === 0
			};
		},
		"iso-2022-jp": (err) => {
			const jis0208 = getTable("jis0208");
			let dState = 1;
			let oState = 1;
			let lead = 0;
			let out = false;
			const bytes = (pushback, b) => {
				if (dState < 5 && b === 27) {
					dState = 6;
					return;
				}
				switch (dState) {
					case 1:
					case 2:
						out = false;
						if (dState === 2) {
							if (b === 92) return 165;
							if (b === 126) return 8254;
						}
						if (b <= 127 && b !== 14 && b !== 15) return b;
						return err();
					case 3:
						out = false;
						if (b >= 33 && b <= 95) return 65344 + b;
						return err();
					case 4:
						out = false;
						if (b < 33 || b > 126) return err();
						lead = b;
						dState = 5;
						return;
					case 5:
						out = false;
						if (b === 27) {
							dState = 6;
							return err();
						}
						dState = 4;
						if (b >= 33 && b <= 126) {
							const cp = jis0208[(lead - 33) * 94 + b - 33];
							if (cp) return cp;
						}
						return err();
					case 6:
						if (b === 36 || b === 40) {
							lead = b;
							dState = 7;
							return;
						}
						out = false;
						dState = oState;
						pushback.push(b);
						return err();
					case 7: {
						const l = lead;
						lead = 0;
						let s;
						if (l === 40) {
							if (b === 66) s = 1;
							else if (b === 74) s = 2;
							else if (b === 73) s = 3;
						} else if (l === 36 && (b === 64 || b === 66)) s = 4;
						if (s) {
							dState = oState = s;
							const output = out;
							out = true;
							return output ? err() : void 0;
						}
						out = false;
						dState = oState;
						pushback.push(b, l);
						return err();
					}
				}
			};
			const eof = (pushback) => {
				if (dState < 5) return null;
				out = false;
				switch (dState) {
					case 5:
						dState = 4;
						return err();
					case 6:
						dState = oState;
						return err();
					case 7:
						dState = oState;
						pushback.push(lead);
						lead = 0;
						return err();
				}
			};
			const decode = (arr, start, end, stream) => {
				const o16 = new Uint16Array(end - start + 2);
				let oi = 0;
				let i = start;
				const pushback = [];
				while (i < end || pushback.length > 0) {
					const c = bytes(pushback, pushback.length > 0 ? pushback.pop() : arr[i++]);
					if (c !== void 0) o16[oi++] = c;
				}
				if (!stream) while (i <= end || pushback.length > 0) if (i < end || pushback.length > 0) {
					const c = bytes(pushback, pushback.length > 0 ? pushback.pop() : arr[i++]);
					if (c !== void 0) o16[oi++] = c;
				} else {
					const c = eof(pushback);
					if (c === null) break;
					o16[oi++] = c;
				}
				if (!stream) {
					dState = oState = 1;
					lead = 0;
					out = false;
				}
				return decodeUCS2(o16, oi);
			};
			return {
				decode,
				isAscii: () => false
			};
		},
		shift_jis: (err) => {
			const jis0208 = getTable("jis0208");
			let lead = 0;
			let oi = 0;
			let o16;
			const decodeLead = (b) => {
				const l = lead;
				lead = 0;
				if (b >= 64 && b <= 252 && b !== 127) {
					const p = (l - (l < 160 ? 129 : 193)) * 188 + b - (b < 127 ? 64 : 65);
					if (p >= 8836 && p <= 10715) {
						o16[oi++] = 48508 + p;
						return;
					}
					const cp = jis0208[p];
					if (cp) {
						o16[oi++] = cp;
						return;
					}
				}
				o16[oi++] = err();
				if (b < 128) o16[oi++] = b;
			};
			const decode = (arr, start, end, stream) => {
				o16 = new Uint16Array(end - start + (lead ? 1 : 0));
				oi = 0;
				let i = start;
				if (!lead) for (const last1 = end - 1; i < last1;) {
					const l = arr[i];
					if (l <= 128) {
						o16[oi++] = l;
						i++;
					} else if (l >= 161 && l <= 223) {
						o16[oi++] = 65216 + l;
						i++;
					} else {
						if (l === 160 || l > 252) break;
						const b = arr[i + 1];
						if (b < 64 || b > 252 || b === 127) break;
						const p = (l - (l < 160 ? 129 : 193)) * 188 + b - (b < 127 ? 64 : 65);
						if (p >= 8836 && p <= 10715) {
							o16[oi++] = 48508 + p;
							i += 2;
						} else {
							const cp = jis0208[p];
							if (!cp) break;
							o16[oi++] = cp;
							i += 2;
						}
					}
				}
				if (lead && i < end) decodeLead(arr[i++]);
				while (i < end) {
					const b = arr[i++];
					if (b <= 128) o16[oi++] = b;
					else if (b >= 161 && b <= 223) o16[oi++] = 65216 + b;
					else if (b === 160 || b > 252) o16[oi++] = err();
					else {
						lead = b;
						if (i < end) decodeLead(arr[i++]);
					}
				}
				if (lead && !stream) {
					lead = 0;
					o16[oi++] = err();
				}
				const res = decodeUCS2(o16, oi);
				o16 = null;
				return res;
			};
			return {
				decode,
				isAscii: () => lead === 0
			};
		},
		gbk: (err) => mappers.gb18030(err),
		gb18030: (err) => {
			const gb18030 = getTable("gb18030");
			const gb18030r = getTable("gb18030-ranges");
			let g1 = 0, g2 = 0, g3 = 0;
			const index = (p) => {
				if (p > 39419 && p < 189e3 || p > 1237575) return;
				if (p === 7457) return 59335;
				let a = 0, b = 0;
				for (const [c, d] of gb18030r) {
					if (c > p) break;
					a = c;
					b = d;
				}
				return b + p - a;
			};
			const decode = (arr, start, end, stream) => {
				const o16 = new Uint16Array(end - start + (g1 ? 3 : 0));
				let oi = 0;
				let i = start;
				const pushback = [];
				if (g1 === 0) for (const last1 = end - 1; i < last1;) {
					const b = arr[i];
					if (b < 128) {
						o16[oi++] = b;
						i++;
					} else if (b === 128) {
						o16[oi++] = 8364;
						i++;
					} else {
						if (b === 255) break;
						const n = arr[i + 1];
						let cp;
						if (n < 127) {
							if (n < 64) break;
							cp = gb18030[(b - 129) * 190 + n - 64];
						} else {
							if (n === 255 || n === 127) break;
							cp = gb18030[(b - 129) * 190 + n - 65];
						}
						if (!cp) break;
						o16[oi++] = cp;
						i += 2;
					}
				}
				while (i < end || pushback.length > 0) {
					const b = pushback.length > 0 ? pushback.pop() : arr[i++];
					if (g1) if (g2) if (g3) if (b <= 57 && b >= 48) {
						const p = index((g1 - 129) * 12600 + (g2 - 48) * 1260 + (g3 - 129) * 10 + b - 48);
						g1 = g2 = g3 = 0;
						if (p === void 0) o16[oi++] = err();
						else if (p <= 65535) o16[oi++] = p;
						else {
							const d = p - 65536;
							o16[oi++] = 55296 | d >> 10;
							o16[oi++] = 56320 | d & 1023;
						}
					} else {
						pushback.push(b, g3, g2);
						g1 = g2 = g3 = 0;
						o16[oi++] = err();
					}
					else if (b >= 129 && b <= 254) g3 = b;
					else {
						pushback.push(b, g2);
						g1 = g2 = 0;
						o16[oi++] = err();
					}
					else if (b <= 57 && b >= 48) g2 = b;
					else {
						let cp;
						if (b >= 64 && b <= 254 && b !== 127) cp = gb18030[(g1 - 129) * 190 + b - (b < 127 ? 64 : 65)];
						g1 = 0;
						if (cp) o16[oi++] = cp;
						else {
							o16[oi++] = err();
							if (b < 128) o16[oi++] = b;
						}
					}
					else if (b < 128) o16[oi++] = b;
					else if (b === 128) o16[oi++] = 8364;
					else if (b === 255) o16[oi++] = err();
					else g1 = b;
				}
				if (g1 && !stream) {
					g1 = g2 = g3 = 0;
					o16[oi++] = err();
				}
				return decodeUCS2(o16, oi);
			};
			return {
				decode,
				isAscii: () => g1 === 0
			};
		},
		big5: (err) => {
			const big5 = getTable("big5");
			let lead = 0;
			let oi = 0;
			let o16;
			const decodeLead = (b) => {
				if (b < 64 || b > 126 && b < 161 || b === 255) {
					lead = 0;
					o16[oi++] = err();
					if (b < 128) o16[oi++] = b;
				} else {
					const p = big5[(lead - 129) * 157 + b - (b < 127 ? 64 : 98)];
					lead = 0;
					if (p > 65536) {
						o16[oi++] = p >> 16;
						o16[oi++] = p & 65535;
					} else if (p) o16[oi++] = p;
					else {
						o16[oi++] = err();
						if (b < 128) o16[oi++] = b;
					}
				}
			};
			const decode = (arr, start, end, stream) => {
				let i = start;
				o16 = new Uint16Array(end - start + (lead ? 1 : 0));
				oi = 0;
				if (!lead) for (const last1 = end - 1; i < last1;) {
					const l = arr[i];
					if (l < 128) {
						o16[oi++] = l;
						i++;
					} else {
						if (l === 128 || l === 255) break;
						const b = arr[i + 1];
						if (b < 64 || b > 126 && b < 161 || b === 255) break;
						const p = big5[(l - 129) * 157 + b - (b < 127 ? 64 : 98)];
						if (p > 65536) {
							o16[oi++] = p >> 16;
							o16[oi++] = p & 65535;
						} else {
							if (!p) break;
							o16[oi++] = p;
						}
						i += 2;
					}
				}
				if (lead && i < end) decodeLead(arr[i++]);
				while (i < end) {
					const b = arr[i++];
					if (b < 128) o16[oi++] = b;
					else if (b === 128 || b === 255) o16[oi++] = err();
					else {
						lead = b;
						if (i < end) decodeLead(arr[i++]);
					}
				}
				if (lead && !stream) {
					lead = 0;
					o16[oi++] = err();
				}
				const res = decodeUCS2(o16, oi);
				o16 = null;
				return res;
			};
			return {
				decode,
				isAscii: () => lead === 0
			};
		}
	};
	isAsciiSuperset = (enc) => enc !== "iso-2022-jp";
	maps = /* @__PURE__ */ new Map();
	e7 = [
		[148, 236],
		[149, 237],
		[150, 243]
	];
	e8 = [
		[30, 89],
		[38, 97],
		[43, 102],
		[44, 103],
		[50, 109],
		[67, 126],
		[84, 144],
		[100, 160]
	];
	preencoders = {
		__proto__: null,
		big5: (p) => (p / 157 | 0) + 129 << 8 | (p % 157 < 63 ? 64 : 98) + p % 157,
		shift_jis: (p) => {
			const l = p / 188 | 0;
			const t = p % 188;
			return l + (l < 31 ? 129 : 193) << 8 | (t < 63 ? 64 : 65) + t;
		},
		"iso-2022-jp": (p) => (p / 94 | 0) + 33 << 8 | p % 94 + 33,
		"euc-jp": (p) => (p / 94 | 0) + 161 << 8 | p % 94 + 161,
		"euc-kr": (p) => (p / 190 | 0) + 129 << 8 | p % 190 + 65,
		gb18030: (p) => (p / 190 | 0) + 129 << 8 | (p % 190 < 63 ? 64 : 65) + p % 190
	};
	preencoders.gbk = preencoders.gb18030;
	NON_LATIN = /[^\x00-\xFF]/;
}));
//#endregion
//#region node_modules/@exodus/bytes/multi-byte.node.js
function createMultibyteDecoder(encoding, loose = false) {
	const jsDecoder = multibyteDecoder(encoding, loose);
	let streaming = false;
	const asciiSuperset = isAsciiSuperset(encoding);
	return (arr, stream = false) => {
		assertU8(arr);
		if (!streaming) {
			if (arr.byteLength === 0) return "";
			if (asciiSuperset && isAscii(arr)) {
				if (isDeno$1) return toBuf(arr).toString();
				return toBuf(arr).latin1Slice(0, arr.byteLength);
			}
		}
		streaming = stream;
		return jsDecoder(arr, stream);
	};
}
var init_multi_byte_node = __esmMin((() => {
	init__utils();
	init_platform();
	init_multi_byte();
}));
//#endregion
//#region node_modules/@exodus/bytes/encoding.js
var encoding_exports = /* @__PURE__ */ __exportAll({
	TextDecoder: () => TextDecoder$1,
	TextDecoderStream: () => TextDecoderStream,
	TextEncoder: () => TextEncoder$1,
	TextEncoderStream: () => TextEncoderStream,
	getBOMEncoding: () => getBOMEncoding,
	isomorphicDecode: () => isomorphicDecode,
	isomorphicEncode: () => isomorphicEncode,
	labelToName: () => labelToName,
	legacyHookDecode: () => legacyHookDecode,
	normalizeEncoding: () => normalizeEncoding
});
var init_encoding = __esmMin((() => {
	init_multi_byte_node();
	init_multi_byte();
	init_encoding$1();
	setMultibyte(createMultibyteDecoder, multibyteEncoder);
}));
//#endregion
//#region node_modules/@exodus/bytes/fallback/percent.js
function percentEncoder(set, spaceAsPlus = false) {
	if (typeof set !== "string" || /[^\x20-\x7E]/.test(set)) throw new TypeError(ERR);
	if (typeof spaceAsPlus !== "boolean") throw new TypeError("spaceAsPlus must be boolean");
	const id = set + +spaceAsPlus;
	const cached = percentMap.get(id);
	if (cached) return cached;
	const n = encodeLatin1(set).sort();
	if (decodeAscii(n) !== set || new Set(n).size !== n.length) throw new TypeError(ERR);
	if (!base) {
		hex = Array.from({ length: 256 }, (_, i) => `%${i.toString(16).padStart(2, "0").toUpperCase()}`);
		base = hex.map((h, i) => i < 32 || i > 126 ? h : String.fromCharCode(i));
	}
	const map = base.slice();
	for (const c of n) map[c] = hex[c];
	if (spaceAsPlus) map[32] = "+";
	const percentEncode = (u8, start = 0, end = u8.length) => decode2string(u8, start, end, map);
	percentMap.set(id, percentEncode);
	return percentEncode;
}
var ERR, percentMap, hex, base;
var init_percent = __esmMin((() => {
	init_latin1();
	init_platform();
	ERR = "percentEncodeSet must be a string of unique increasing codepoints in range 0x20 - 0x7e";
	percentMap = /* @__PURE__ */ new Map();
}));
//#endregion
//#region node_modules/@exodus/bytes/whatwg.js
var whatwg_exports = /* @__PURE__ */ __exportAll({ percentEncodeAfterEncoding: () => percentEncodeAfterEncoding });
function percentEncodeAfterEncoding(encoding, input, percentEncodeSet, spaceAsPlus = false) {
	const enc = normalizeEncoding(encoding);
	if (!enc || enc === "replacement" || enc === "utf-16le" || enc === "utf-16be") throw new RangeError(E_ENCODING);
	const percent = percentEncoder(percentEncodeSet, spaceAsPlus);
	if (enc === "utf-8") return percent(utf8fromStringLoose(input));
	const multi = isMultibyte(enc);
	const encoder = multi ? getMultibyteEncoder() : createSinglebyteEncoder;
	const fatal = encoder(enc);
	try {
		return percent(fatal(input));
	} catch {}
	let res = "";
	let last = 0;
	if (multi) {
		const rep = enc === "gb18030" ? percent(fatal("�")) : `%26%2365533%3B`;
		const u = encoder(enc, (cp, u, i) => {
			res += percent(u, last, i);
			res += cp >= 55296 && cp < 57344 ? rep : `%26%23${cp}%3B`;
			last = i;
			return 0;
		})(input);
		res += percent(u, last);
	} else {
		if (typeof input !== "string") throw new TypeError(E_STRING);
		const m = encodeMap(enc);
		const len = input.length;
		const u = new Uint8Array(len);
		for (let i = 0; i < len; i++) {
			const x = input.charCodeAt(i);
			const b = m[x];
			if (!b && x) {
				let cp = x;
				const i0 = i;
				if (x >= 55296 && x < 57344) {
					cp = 65533;
					if (x < 56320 && i + 1 < len) {
						const x1 = input.charCodeAt(i + 1);
						if (x1 >= 56320 && x1 < 57344) {
							cp = 65536 + (x1 & 1023 | (x & 1023) << 10);
							i++;
						}
					}
				}
				res += `${percent(u, last, i0)}%26%23${cp}%3B`;
				last = i + 1;
			} else u[i] = b;
		}
		res += percent(u, last);
	}
	return res;
}
var init_whatwg = __esmMin((() => {
	init_utf8_node();
	init_single_byte_node();
	init_encoding$1();
	init_percent();
	init_single_byte();
	init__utils();
}));
//#endregion
export { base64_exports as a, init_encoding_lite as c, init_encoding as i, whatwg_exports as n, init_base64 as o, encoding_exports as r, encoding_lite_exports as s, init_whatwg as t };
