import { n as __esmMin, r as __exportAll, s as __toESM, t as __commonJSMin } from "../../_runtime.mjs";
import { i as init_src$1, r as GenerationalCache } from "./css-color+[...].mjs";
import { createRequire } from "module";
//#region node_modules/is-potential-custom-element-name/index.js
var require_is_potential_custom_element_name = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	var regex = /^[a-z](?:[\.0-9_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*-(?:[\x2D\.0-9_a-z\xB7\xC0-\xD6\xD8-\xF6\xF8-\u037D\u037F-\u1FFF\u200C\u200D\u203F\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]|[\uD800-\uDB7F][\uDC00-\uDFFF])*$/;
	var isPotentialCustomElementName = function(string) {
		return regex.test(string);
	};
	module.exports = isPotentialCustomElementName;
}));
//#endregion
//#region node_modules/source-map-js/lib/base64.js
var require_base64 = /* @__PURE__ */ __commonJSMin(((exports) => {
	var intToCharMap = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
	/**
	* Encode an integer in the range of 0 to 63 to a single base 64 digit.
	*/
	exports.encode = function(number) {
		if (0 <= number && number < intToCharMap.length) return intToCharMap[number];
		throw new TypeError("Must be between 0 and 63: " + number);
	};
	/**
	* Decode a single base 64 character code digit to an integer. Returns -1 on
	* failure.
	*/
	exports.decode = function(charCode) {
		var bigA = 65;
		var bigZ = 90;
		var littleA = 97;
		var littleZ = 122;
		var zero = 48;
		var nine = 57;
		var plus = 43;
		var slash = 47;
		var littleOffset = 26;
		var numberOffset = 52;
		if (bigA <= charCode && charCode <= bigZ) return charCode - bigA;
		if (littleA <= charCode && charCode <= littleZ) return charCode - littleA + littleOffset;
		if (zero <= charCode && charCode <= nine) return charCode - zero + numberOffset;
		if (charCode == plus) return 62;
		if (charCode == slash) return 63;
		return -1;
	};
}));
//#endregion
//#region node_modules/source-map-js/lib/base64-vlq.js
var require_base64_vlq = /* @__PURE__ */ __commonJSMin(((exports) => {
	var base64 = require_base64();
	var VLQ_BASE_SHIFT = 5;
	var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
	var VLQ_BASE_MASK = VLQ_BASE - 1;
	var VLQ_CONTINUATION_BIT = VLQ_BASE;
	/**
	* Converts from a two-complement value to a value where the sign bit is
	* placed in the least significant bit.  For example, as decimals:
	*   1 becomes 2 (10 binary), -1 becomes 3 (11 binary)
	*   2 becomes 4 (100 binary), -2 becomes 5 (101 binary)
	*/
	function toVLQSigned(aValue) {
		return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
	}
	/**
	* Converts to a two-complement value from a value where the sign bit is
	* placed in the least significant bit.  For example, as decimals:
	*   2 (10 binary) becomes 1, 3 (11 binary) becomes -1
	*   4 (100 binary) becomes 2, 5 (101 binary) becomes -2
	*/
	function fromVLQSigned(aValue) {
		var isNegative = (aValue & 1) === 1;
		var shifted = aValue >> 1;
		return isNegative ? -shifted : shifted;
	}
	/**
	* Returns the base 64 VLQ encoded value.
	*/
	exports.encode = function base64VLQ_encode(aValue) {
		var encoded = "";
		var digit;
		var vlq = toVLQSigned(aValue);
		do {
			digit = vlq & VLQ_BASE_MASK;
			vlq >>>= VLQ_BASE_SHIFT;
			if (vlq > 0) digit |= VLQ_CONTINUATION_BIT;
			encoded += base64.encode(digit);
		} while (vlq > 0);
		return encoded;
	};
	/**
	* Decodes the next base 64 VLQ value from the given string and returns the
	* value and the rest of the string via the out parameter.
	*/
	exports.decode = function base64VLQ_decode(aStr, aIndex, aOutParam) {
		var strLen = aStr.length;
		var result = 0;
		var shift = 0;
		var continuation, digit;
		do {
			if (aIndex >= strLen) throw new Error("Expected more digits in base 64 VLQ value.");
			digit = base64.decode(aStr.charCodeAt(aIndex++));
			if (digit === -1) throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
			continuation = !!(digit & VLQ_CONTINUATION_BIT);
			digit &= VLQ_BASE_MASK;
			result = result + (digit << shift);
			shift += VLQ_BASE_SHIFT;
		} while (continuation);
		aOutParam.value = fromVLQSigned(result);
		aOutParam.rest = aIndex;
	};
}));
//#endregion
//#region node_modules/source-map-js/lib/util.js
var require_util = /* @__PURE__ */ __commonJSMin(((exports) => {
	/**
	* This is a helper function for getting values from parameter/options
	* objects.
	*
	* @param args The object we are extracting values from
	* @param name The name of the property we are getting.
	* @param defaultValue An optional value to return if the property is missing
	* from the object. If this is not specified and the property is missing, an
	* error will be thrown.
	*/
	function getArg(aArgs, aName, aDefaultValue) {
		if (aName in aArgs) return aArgs[aName];
		else if (arguments.length === 3) return aDefaultValue;
		else throw new Error("\"" + aName + "\" is a required argument.");
	}
	exports.getArg = getArg;
	var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
	var dataUrlRegexp = /^data:.+\,.+$/;
	function urlParse(aUrl) {
		var match = aUrl.match(urlRegexp);
		if (!match) return null;
		return {
			scheme: match[1],
			auth: match[2],
			host: match[3],
			port: match[4],
			path: match[5]
		};
	}
	exports.urlParse = urlParse;
	function urlGenerate(aParsedUrl) {
		var url = "";
		if (aParsedUrl.scheme) url += aParsedUrl.scheme + ":";
		url += "//";
		if (aParsedUrl.auth) url += aParsedUrl.auth + "@";
		if (aParsedUrl.host) url += aParsedUrl.host;
		if (aParsedUrl.port) url += ":" + aParsedUrl.port;
		if (aParsedUrl.path) url += aParsedUrl.path;
		return url;
	}
	exports.urlGenerate = urlGenerate;
	var MAX_CACHED_INPUTS = 32;
	/**
	* Takes some function `f(input) -> result` and returns a memoized version of
	* `f`.
	*
	* We keep at most `MAX_CACHED_INPUTS` memoized results of `f` alive. The
	* memoization is a dumb-simple, linear least-recently-used cache.
	*/
	function lruMemoize(f) {
		var cache = [];
		return function(input) {
			for (var i = 0; i < cache.length; i++) if (cache[i].input === input) {
				var temp = cache[0];
				cache[0] = cache[i];
				cache[i] = temp;
				return cache[0].result;
			}
			var result = f(input);
			cache.unshift({
				input,
				result
			});
			if (cache.length > MAX_CACHED_INPUTS) cache.pop();
			return result;
		};
	}
	/**
	* Normalizes a path, or the path portion of a URL:
	*
	* - Replaces consecutive slashes with one slash.
	* - Removes unnecessary '.' parts.
	* - Removes unnecessary '<dir>/..' parts.
	*
	* Based on code in the Node.js 'path' core module.
	*
	* @param aPath The path or url to normalize.
	*/
	var normalize = lruMemoize(function normalize(aPath) {
		var path = aPath;
		var url = urlParse(aPath);
		if (url) {
			if (!url.path) return aPath;
			path = url.path;
		}
		var isAbsolute = exports.isAbsolute(path);
		var parts = [];
		var start = 0;
		var i = 0;
		while (true) {
			start = i;
			i = path.indexOf("/", start);
			if (i === -1) {
				parts.push(path.slice(start));
				break;
			} else {
				parts.push(path.slice(start, i));
				while (i < path.length && path[i] === "/") i++;
			}
		}
		for (var part, up = 0, i = parts.length - 1; i >= 0; i--) {
			part = parts[i];
			if (part === ".") parts.splice(i, 1);
			else if (part === "..") up++;
			else if (up > 0) if (part === "") {
				parts.splice(i + 1, up);
				up = 0;
			} else {
				parts.splice(i, 2);
				up--;
			}
		}
		path = parts.join("/");
		if (path === "") path = isAbsolute ? "/" : ".";
		if (url) {
			url.path = path;
			return urlGenerate(url);
		}
		return path;
	});
	exports.normalize = normalize;
	/**
	* Joins two paths/URLs.
	*
	* @param aRoot The root path or URL.
	* @param aPath The path or URL to be joined with the root.
	*
	* - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
	*   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
	*   first.
	* - Otherwise aPath is a path. If aRoot is a URL, then its path portion
	*   is updated with the result and aRoot is returned. Otherwise the result
	*   is returned.
	*   - If aPath is absolute, the result is aPath.
	*   - Otherwise the two paths are joined with a slash.
	* - Joining for example 'http://' and 'www.example.com' is also supported.
	*/
	function join(aRoot, aPath) {
		if (aRoot === "") aRoot = ".";
		if (aPath === "") aPath = ".";
		var aPathUrl = urlParse(aPath);
		var aRootUrl = urlParse(aRoot);
		if (aRootUrl) aRoot = aRootUrl.path || "/";
		if (aPathUrl && !aPathUrl.scheme) {
			if (aRootUrl) aPathUrl.scheme = aRootUrl.scheme;
			return urlGenerate(aPathUrl);
		}
		if (aPathUrl || aPath.match(dataUrlRegexp)) return aPath;
		if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
			aRootUrl.host = aPath;
			return urlGenerate(aRootUrl);
		}
		var joined = aPath.charAt(0) === "/" ? aPath : normalize(aRoot.replace(/\/+$/, "") + "/" + aPath);
		if (aRootUrl) {
			aRootUrl.path = joined;
			return urlGenerate(aRootUrl);
		}
		return joined;
	}
	exports.join = join;
	exports.isAbsolute = function(aPath) {
		return aPath.charAt(0) === "/" || urlRegexp.test(aPath);
	};
	/**
	* Make a path relative to a URL or another path.
	*
	* @param aRoot The root path or URL.
	* @param aPath The path or URL to be made relative to aRoot.
	*/
	function relative(aRoot, aPath) {
		if (aRoot === "") aRoot = ".";
		aRoot = aRoot.replace(/\/$/, "");
		var level = 0;
		while (aPath.indexOf(aRoot + "/") !== 0) {
			var index = aRoot.lastIndexOf("/");
			if (index < 0) return aPath;
			aRoot = aRoot.slice(0, index);
			if (aRoot.match(/^([^\/]+:\/)?\/*$/)) return aPath;
			++level;
		}
		return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
	}
	exports.relative = relative;
	var supportsNullProto = function() {
		return !("__proto__" in Object.create(null));
	}();
	function identity(s) {
		return s;
	}
	/**
	* Because behavior goes wacky when you set `__proto__` on objects, we
	* have to prefix all the strings in our set with an arbitrary character.
	*
	* See https://github.com/mozilla/source-map/pull/31 and
	* https://github.com/mozilla/source-map/issues/30
	*
	* @param String aStr
	*/
	function toSetString(aStr) {
		if (isProtoString(aStr)) return "$" + aStr;
		return aStr;
	}
	exports.toSetString = supportsNullProto ? identity : toSetString;
	function fromSetString(aStr) {
		if (isProtoString(aStr)) return aStr.slice(1);
		return aStr;
	}
	exports.fromSetString = supportsNullProto ? identity : fromSetString;
	function isProtoString(s) {
		if (!s) return false;
		var length = s.length;
		if (length < 9) return false;
		if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95) return false;
		for (var i = length - 10; i >= 0; i--) if (s.charCodeAt(i) !== 36) return false;
		return true;
	}
	/**
	* Comparator between two mappings where the original positions are compared.
	*
	* Optionally pass in `true` as `onlyCompareGenerated` to consider two
	* mappings with the same original source/line/column, but different generated
	* line and column the same. Useful when searching for a mapping with a
	* stubbed out mapping.
	*/
	function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
		var cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0 || onlyCompareOriginal) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByOriginalPositions = compareByOriginalPositions;
	function compareByOriginalPositionsNoSource(mappingA, mappingB, onlyCompareOriginal) {
		var cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0 || onlyCompareOriginal) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByOriginalPositionsNoSource = compareByOriginalPositionsNoSource;
	/**
	* Comparator between two mappings with deflated source and name indices where
	* the generated positions are compared.
	*
	* Optionally pass in `true` as `onlyCompareGenerated` to consider two
	* mappings with the same generated line and column, but different
	* source/name/original line and column the same. Useful when searching for a
	* mapping with a stubbed out mapping.
	*/
	function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated) {
		var cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0 || onlyCompareGenerated) return cmp;
		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
	function compareByGeneratedPositionsDeflatedNoLine(mappingA, mappingB, onlyCompareGenerated) {
		var cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0 || onlyCompareGenerated) return cmp;
		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsDeflatedNoLine = compareByGeneratedPositionsDeflatedNoLine;
	function strcmp(aStr1, aStr2) {
		if (aStr1 === aStr2) return 0;
		if (aStr1 === null) return 1;
		if (aStr2 === null) return -1;
		if (aStr1 > aStr2) return 1;
		return -1;
	}
	/**
	* Comparator between two mappings with inflated source and name strings where
	* the generated positions are compared.
	*/
	function compareByGeneratedPositionsInflated(mappingA, mappingB) {
		var cmp = mappingA.generatedLine - mappingB.generatedLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.generatedColumn - mappingB.generatedColumn;
		if (cmp !== 0) return cmp;
		cmp = strcmp(mappingA.source, mappingB.source);
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalLine - mappingB.originalLine;
		if (cmp !== 0) return cmp;
		cmp = mappingA.originalColumn - mappingB.originalColumn;
		if (cmp !== 0) return cmp;
		return strcmp(mappingA.name, mappingB.name);
	}
	exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
	/**
	* Strip any JSON XSSI avoidance prefix from the string (as documented
	* in the source maps specification), and then parse the string as
	* JSON.
	*/
	function parseSourceMapInput(str) {
		return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ""));
	}
	exports.parseSourceMapInput = parseSourceMapInput;
	/**
	* Compute the URL of a source given the the source root, the source's
	* URL, and the source map's URL.
	*/
	function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
		sourceURL = sourceURL || "";
		if (sourceRoot) {
			if (sourceRoot[sourceRoot.length - 1] !== "/" && sourceURL[0] !== "/") sourceRoot += "/";
			sourceURL = sourceRoot + sourceURL;
		}
		if (sourceMapURL) {
			var parsed = urlParse(sourceMapURL);
			if (!parsed) throw new Error("sourceMapURL could not be parsed");
			if (parsed.path) {
				var index = parsed.path.lastIndexOf("/");
				if (index >= 0) parsed.path = parsed.path.substring(0, index + 1);
			}
			sourceURL = join(urlGenerate(parsed), sourceURL);
		}
		return normalize(sourceURL);
	}
	exports.computeSourceURL = computeSourceURL;
}));
//#endregion
//#region node_modules/source-map-js/lib/array-set.js
var require_array_set = /* @__PURE__ */ __commonJSMin(((exports) => {
	var util = require_util();
	var has = Object.prototype.hasOwnProperty;
	var hasNativeMap = typeof Map !== "undefined";
	/**
	* A data structure which is a combination of an array and a set. Adding a new
	* member is O(1), testing for membership is O(1), and finding the index of an
	* element is O(1). Removing elements from the set is not supported. Only
	* strings are supported for membership.
	*/
	function ArraySet() {
		this._array = [];
		this._set = hasNativeMap ? /* @__PURE__ */ new Map() : Object.create(null);
	}
	/**
	* Static method for creating ArraySet instances from an existing array.
	*/
	ArraySet.fromArray = function ArraySet_fromArray(aArray, aAllowDuplicates) {
		var set = new ArraySet();
		for (var i = 0, len = aArray.length; i < len; i++) set.add(aArray[i], aAllowDuplicates);
		return set;
	};
	/**
	* Return how many unique items are in this ArraySet. If duplicates have been
	* added, than those do not count towards the size.
	*
	* @returns Number
	*/
	ArraySet.prototype.size = function ArraySet_size() {
		return hasNativeMap ? this._set.size : Object.getOwnPropertyNames(this._set).length;
	};
	/**
	* Add the given string to this set.
	*
	* @param String aStr
	*/
	ArraySet.prototype.add = function ArraySet_add(aStr, aAllowDuplicates) {
		var sStr = hasNativeMap ? aStr : util.toSetString(aStr);
		var isDuplicate = hasNativeMap ? this.has(aStr) : has.call(this._set, sStr);
		var idx = this._array.length;
		if (!isDuplicate || aAllowDuplicates) this._array.push(aStr);
		if (!isDuplicate) if (hasNativeMap) this._set.set(aStr, idx);
		else this._set[sStr] = idx;
	};
	/**
	* Is the given string a member of this set?
	*
	* @param String aStr
	*/
	ArraySet.prototype.has = function ArraySet_has(aStr) {
		if (hasNativeMap) return this._set.has(aStr);
		else {
			var sStr = util.toSetString(aStr);
			return has.call(this._set, sStr);
		}
	};
	/**
	* What is the index of the given string in the array?
	*
	* @param String aStr
	*/
	ArraySet.prototype.indexOf = function ArraySet_indexOf(aStr) {
		if (hasNativeMap) {
			var idx = this._set.get(aStr);
			if (idx >= 0) return idx;
		} else {
			var sStr = util.toSetString(aStr);
			if (has.call(this._set, sStr)) return this._set[sStr];
		}
		throw new Error("\"" + aStr + "\" is not in the set.");
	};
	/**
	* What is the element at the given index?
	*
	* @param Number aIdx
	*/
	ArraySet.prototype.at = function ArraySet_at(aIdx) {
		if (aIdx >= 0 && aIdx < this._array.length) return this._array[aIdx];
		throw new Error("No element indexed by " + aIdx);
	};
	/**
	* Returns the array representation of this set (which has the proper indices
	* indicated by indexOf). Note that this is a copy of the internal array used
	* for storing the members so that no one can mess with internal state.
	*/
	ArraySet.prototype.toArray = function ArraySet_toArray() {
		return this._array.slice();
	};
	exports.ArraySet = ArraySet;
}));
//#endregion
//#region node_modules/source-map-js/lib/mapping-list.js
var require_mapping_list = /* @__PURE__ */ __commonJSMin(((exports) => {
	var util = require_util();
	/**
	* Determine whether mappingB is after mappingA with respect to generated
	* position.
	*/
	function generatedPositionAfter(mappingA, mappingB) {
		var lineA = mappingA.generatedLine;
		var lineB = mappingB.generatedLine;
		var columnA = mappingA.generatedColumn;
		var columnB = mappingB.generatedColumn;
		return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
	}
	/**
	* A data structure to provide a sorted view of accumulated mappings in a
	* performance conscious manner. It trades a neglibable overhead in general
	* case for a large speedup in case of mappings being added in order.
	*/
	function MappingList() {
		this._array = [];
		this._sorted = true;
		this._last = {
			generatedLine: -1,
			generatedColumn: 0
		};
	}
	/**
	* Iterate through internal items. This method takes the same arguments that
	* `Array.prototype.forEach` takes.
	*
	* NOTE: The order of the mappings is NOT guaranteed.
	*/
	MappingList.prototype.unsortedForEach = function MappingList_forEach(aCallback, aThisArg) {
		this._array.forEach(aCallback, aThisArg);
	};
	/**
	* Add the given source mapping.
	*
	* @param Object aMapping
	*/
	MappingList.prototype.add = function MappingList_add(aMapping) {
		if (generatedPositionAfter(this._last, aMapping)) {
			this._last = aMapping;
			this._array.push(aMapping);
		} else {
			this._sorted = false;
			this._array.push(aMapping);
		}
	};
	/**
	* Returns the flat, sorted array of mappings. The mappings are sorted by
	* generated position.
	*
	* WARNING: This method returns internal data without copying, for
	* performance. The return value must NOT be mutated, and should be treated as
	* an immutable borrow. If you want to take ownership, you must make your own
	* copy.
	*/
	MappingList.prototype.toArray = function MappingList_toArray() {
		if (!this._sorted) {
			this._array.sort(util.compareByGeneratedPositionsInflated);
			this._sorted = true;
		}
		return this._array;
	};
	exports.MappingList = MappingList;
}));
//#endregion
//#region node_modules/source-map-js/lib/source-map-generator.js
var require_source_map_generator = /* @__PURE__ */ __commonJSMin(((exports) => {
	var base64VLQ = require_base64_vlq();
	var util = require_util();
	var ArraySet = require_array_set().ArraySet;
	var MappingList = require_mapping_list().MappingList;
	/**
	* An instance of the SourceMapGenerator represents a source map which is
	* being built incrementally. You may pass an object with the following
	* properties:
	*
	*   - file: The filename of the generated source.
	*   - sourceRoot: A root for all relative URLs in this source map.
	*/
	function SourceMapGenerator(aArgs) {
		if (!aArgs) aArgs = {};
		this._file = util.getArg(aArgs, "file", null);
		this._sourceRoot = util.getArg(aArgs, "sourceRoot", null);
		this._skipValidation = util.getArg(aArgs, "skipValidation", false);
		this._ignoreInvalidMapping = util.getArg(aArgs, "ignoreInvalidMapping", false);
		this._sources = new ArraySet();
		this._names = new ArraySet();
		this._mappings = new MappingList();
		this._sourcesContents = null;
	}
	SourceMapGenerator.prototype._version = 3;
	/**
	* Creates a new SourceMapGenerator based on a SourceMapConsumer
	*
	* @param aSourceMapConsumer The SourceMap.
	*/
	SourceMapGenerator.fromSourceMap = function SourceMapGenerator_fromSourceMap(aSourceMapConsumer, generatorOps) {
		var sourceRoot = aSourceMapConsumer.sourceRoot;
		var generator = new SourceMapGenerator(Object.assign(generatorOps || {}, {
			file: aSourceMapConsumer.file,
			sourceRoot
		}));
		aSourceMapConsumer.eachMapping(function(mapping) {
			var newMapping = { generated: {
				line: mapping.generatedLine,
				column: mapping.generatedColumn
			} };
			if (mapping.source != null) {
				newMapping.source = mapping.source;
				if (sourceRoot != null) newMapping.source = util.relative(sourceRoot, newMapping.source);
				newMapping.original = {
					line: mapping.originalLine,
					column: mapping.originalColumn
				};
				if (mapping.name != null) newMapping.name = mapping.name;
			}
			generator.addMapping(newMapping);
		});
		aSourceMapConsumer.sources.forEach(function(sourceFile) {
			var sourceRelative = sourceFile;
			if (sourceRoot !== null) sourceRelative = util.relative(sourceRoot, sourceFile);
			if (!generator._sources.has(sourceRelative)) generator._sources.add(sourceRelative);
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) generator.setSourceContent(sourceFile, content);
		});
		return generator;
	};
	/**
	* Add a single mapping from original source line and column to the generated
	* source's line and column for this source map being created. The mapping
	* object should have the following properties:
	*
	*   - generated: An object with the generated line and column positions.
	*   - original: An object with the original line and column positions.
	*   - source: The original source file (relative to the sourceRoot).
	*   - name: An optional original token name for this mapping.
	*/
	SourceMapGenerator.prototype.addMapping = function SourceMapGenerator_addMapping(aArgs) {
		var generated = util.getArg(aArgs, "generated");
		var original = util.getArg(aArgs, "original", null);
		var source = util.getArg(aArgs, "source", null);
		var name = util.getArg(aArgs, "name", null);
		if (!this._skipValidation) {
			if (this._validateMapping(generated, original, source, name) === false) return;
		}
		if (source != null) {
			source = String(source);
			if (!this._sources.has(source)) this._sources.add(source);
		}
		if (name != null) {
			name = String(name);
			if (!this._names.has(name)) this._names.add(name);
		}
		this._mappings.add({
			generatedLine: generated.line,
			generatedColumn: generated.column,
			originalLine: original != null && original.line,
			originalColumn: original != null && original.column,
			source,
			name
		});
	};
	/**
	* Set the source content for a source file.
	*/
	SourceMapGenerator.prototype.setSourceContent = function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent) {
		var source = aSourceFile;
		if (this._sourceRoot != null) source = util.relative(this._sourceRoot, source);
		if (aSourceContent != null) {
			if (!this._sourcesContents) this._sourcesContents = Object.create(null);
			this._sourcesContents[util.toSetString(source)] = aSourceContent;
		} else if (this._sourcesContents) {
			delete this._sourcesContents[util.toSetString(source)];
			if (Object.keys(this._sourcesContents).length === 0) this._sourcesContents = null;
		}
	};
	/**
	* Applies the mappings of a sub-source-map for a specific source file to the
	* source map being generated. Each mapping to the supplied source file is
	* rewritten using the supplied source map. Note: The resolution for the
	* resulting mappings is the minimium of this map and the supplied map.
	*
	* @param aSourceMapConsumer The source map to be applied.
	* @param aSourceFile Optional. The filename of the source file.
	*        If omitted, SourceMapConsumer's file property will be used.
	* @param aSourceMapPath Optional. The dirname of the path to the source map
	*        to be applied. If relative, it is relative to the SourceMapConsumer.
	*        This parameter is needed when the two source maps aren't in the same
	*        directory, and the source map to be applied contains relative source
	*        paths. If so, those relative source paths need to be rewritten
	*        relative to the SourceMapGenerator.
	*/
	SourceMapGenerator.prototype.applySourceMap = function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath) {
		var sourceFile = aSourceFile;
		if (aSourceFile == null) {
			if (aSourceMapConsumer.file == null) throw new Error("SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's \"file\" property. Both were omitted.");
			sourceFile = aSourceMapConsumer.file;
		}
		var sourceRoot = this._sourceRoot;
		if (sourceRoot != null) sourceFile = util.relative(sourceRoot, sourceFile);
		var newSources = new ArraySet();
		var newNames = new ArraySet();
		this._mappings.unsortedForEach(function(mapping) {
			if (mapping.source === sourceFile && mapping.originalLine != null) {
				var original = aSourceMapConsumer.originalPositionFor({
					line: mapping.originalLine,
					column: mapping.originalColumn
				});
				if (original.source != null) {
					mapping.source = original.source;
					if (aSourceMapPath != null) mapping.source = util.join(aSourceMapPath, mapping.source);
					if (sourceRoot != null) mapping.source = util.relative(sourceRoot, mapping.source);
					mapping.originalLine = original.line;
					mapping.originalColumn = original.column;
					if (original.name != null) mapping.name = original.name;
				}
			}
			var source = mapping.source;
			if (source != null && !newSources.has(source)) newSources.add(source);
			var name = mapping.name;
			if (name != null && !newNames.has(name)) newNames.add(name);
		}, this);
		this._sources = newSources;
		this._names = newNames;
		aSourceMapConsumer.sources.forEach(function(sourceFile) {
			var content = aSourceMapConsumer.sourceContentFor(sourceFile);
			if (content != null) {
				if (aSourceMapPath != null) sourceFile = util.join(aSourceMapPath, sourceFile);
				if (sourceRoot != null) sourceFile = util.relative(sourceRoot, sourceFile);
				this.setSourceContent(sourceFile, content);
			}
		}, this);
	};
	/**
	* A mapping can have one of the three levels of data:
	*
	*   1. Just the generated position.
	*   2. The Generated position, original position, and original source.
	*   3. Generated and original position, original source, as well as a name
	*      token.
	*
	* To maintain consistency, we validate that any new mapping being added falls
	* in to one of these categories.
	*/
	SourceMapGenerator.prototype._validateMapping = function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName) {
		if (aOriginal && typeof aOriginal.line !== "number" && typeof aOriginal.column !== "number") {
			var message = "original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.";
			if (this._ignoreInvalidMapping) {
				if (typeof console !== "undefined" && console.warn) console.warn(message);
				return false;
			} else throw new Error(message);
		}
		if (aGenerated && "line" in aGenerated && "column" in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName) return;
		else if (aGenerated && "line" in aGenerated && "column" in aGenerated && aOriginal && "line" in aOriginal && "column" in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource) return;
		else {
			var message = "Invalid mapping: " + JSON.stringify({
				generated: aGenerated,
				source: aSource,
				original: aOriginal,
				name: aName
			});
			if (this._ignoreInvalidMapping) {
				if (typeof console !== "undefined" && console.warn) console.warn(message);
				return false;
			} else throw new Error(message);
		}
	};
	/**
	* Serialize the accumulated mappings in to the stream of base 64 VLQs
	* specified by the source map format.
	*/
	SourceMapGenerator.prototype._serializeMappings = function SourceMapGenerator_serializeMappings() {
		var previousGeneratedColumn = 0;
		var previousGeneratedLine = 1;
		var previousOriginalColumn = 0;
		var previousOriginalLine = 0;
		var previousName = 0;
		var previousSource = 0;
		var result = "";
		var next;
		var mapping;
		var nameIdx;
		var sourceIdx;
		var mappings = this._mappings.toArray();
		for (var i = 0, len = mappings.length; i < len; i++) {
			mapping = mappings[i];
			next = "";
			if (mapping.generatedLine !== previousGeneratedLine) {
				previousGeneratedColumn = 0;
				while (mapping.generatedLine !== previousGeneratedLine) {
					next += ";";
					previousGeneratedLine++;
				}
			} else if (i > 0) {
				if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1])) continue;
				next += ",";
			}
			next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
			previousGeneratedColumn = mapping.generatedColumn;
			if (mapping.source != null) {
				sourceIdx = this._sources.indexOf(mapping.source);
				next += base64VLQ.encode(sourceIdx - previousSource);
				previousSource = sourceIdx;
				next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
				previousOriginalLine = mapping.originalLine - 1;
				next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
				previousOriginalColumn = mapping.originalColumn;
				if (mapping.name != null) {
					nameIdx = this._names.indexOf(mapping.name);
					next += base64VLQ.encode(nameIdx - previousName);
					previousName = nameIdx;
				}
			}
			result += next;
		}
		return result;
	};
	SourceMapGenerator.prototype._generateSourcesContent = function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot) {
		return aSources.map(function(source) {
			if (!this._sourcesContents) return null;
			if (aSourceRoot != null) source = util.relative(aSourceRoot, source);
			var key = util.toSetString(source);
			return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
		}, this);
	};
	/**
	* Externalize the source map.
	*/
	SourceMapGenerator.prototype.toJSON = function SourceMapGenerator_toJSON() {
		var map = {
			version: this._version,
			sources: this._sources.toArray(),
			names: this._names.toArray(),
			mappings: this._serializeMappings()
		};
		if (this._file != null) map.file = this._file;
		if (this._sourceRoot != null) map.sourceRoot = this._sourceRoot;
		if (this._sourcesContents) map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
		return map;
	};
	/**
	* Render the source map being generated to a string.
	*/
	SourceMapGenerator.prototype.toString = function SourceMapGenerator_toString() {
		return JSON.stringify(this.toJSON());
	};
	exports.SourceMapGenerator = SourceMapGenerator;
}));
var init_types = __esmMin((() => {}));
//#endregion
//#region node_modules/css-tree/lib/tokenizer/char-code-definitions.js
function isDigit(code) {
	return code >= 48 && code <= 57;
}
function isHexDigit(code) {
	return isDigit(code) || code >= 65 && code <= 70 || code >= 97 && code <= 102;
}
function isUppercaseLetter(code) {
	return code >= 65 && code <= 90;
}
function isLowercaseLetter(code) {
	return code >= 97 && code <= 122;
}
function isLetter(code) {
	return isUppercaseLetter(code) || isLowercaseLetter(code);
}
function isNonAscii(code) {
	return code >= 128;
}
function isNameStart(code) {
	return isLetter(code) || isNonAscii(code) || code === 95;
}
function isName(code) {
	return isNameStart(code) || isDigit(code) || code === 45;
}
function isNonPrintable(code) {
	return code >= 0 && code <= 8 || code === 11 || code >= 14 && code <= 31 || code === 127;
}
function isNewline(code) {
	return code === 10 || code === 13 || code === 12;
}
function isWhiteSpace(code) {
	return isNewline(code) || code === 32 || code === 9;
}
function isValidEscape(first, second) {
	if (first !== 92) return false;
	if (isNewline(second) || second === EOF) return false;
	return true;
}
function isIdentifierStart(first, second, third) {
	if (first === 45) return isNameStart(second) || second === 45 || isValidEscape(second, third);
	if (isNameStart(first)) return true;
	if (first === 92) return isValidEscape(first, second);
	return false;
}
function isNumberStart(first, second, third) {
	if (first === 43 || first === 45) {
		if (isDigit(second)) return 2;
		return second === 46 && isDigit(third) ? 3 : 0;
	}
	if (first === 46) return isDigit(second) ? 2 : 0;
	if (isDigit(first)) return 1;
	return 0;
}
function isBOM(code) {
	if (code === 65279) return 1;
	if (code === 65534) return 1;
	return 0;
}
function charCodeCategory(code) {
	return code < 128 ? CATEGORY[code] : 132;
}
var EOF, CATEGORY;
var init_char_code_definitions = __esmMin((() => {
	EOF = 0;
	CATEGORY = new Array(128);
	for (let i = 0; i < CATEGORY.length; i++) CATEGORY[i] = isWhiteSpace(i) && 130 || isDigit(i) && 131 || isNameStart(i) && 132 || isNonPrintable(i) && 133 || i || 128;
}));
//#endregion
//#region node_modules/css-tree/lib/tokenizer/utils.js
function getCharCode(source, offset) {
	return offset < source.length ? source.charCodeAt(offset) : 0;
}
function getNewlineLength(source, offset, code) {
	if (code === 13 && getCharCode(source, offset + 1) === 10) return 2;
	return 1;
}
function cmpChar(testStr, offset, referenceCode) {
	let code = testStr.charCodeAt(offset);
	if (isUppercaseLetter(code)) code = code | 32;
	return code === referenceCode;
}
function cmpStr(testStr, start, end, referenceStr) {
	if (end - start !== referenceStr.length) return false;
	if (start < 0 || end > testStr.length) return false;
	for (let i = start; i < end; i++) {
		const referenceCode = referenceStr.charCodeAt(i - start);
		let testCode = testStr.charCodeAt(i);
		if (isUppercaseLetter(testCode)) testCode = testCode | 32;
		if (testCode !== referenceCode) return false;
	}
	return true;
}
function findWhiteSpaceStart(source, offset) {
	for (; offset >= 0; offset--) if (!isWhiteSpace(source.charCodeAt(offset))) break;
	return offset + 1;
}
function findWhiteSpaceEnd(source, offset) {
	for (; offset < source.length; offset++) if (!isWhiteSpace(source.charCodeAt(offset))) break;
	return offset;
}
function findDecimalNumberEnd(source, offset) {
	for (; offset < source.length; offset++) if (!isDigit(source.charCodeAt(offset))) break;
	return offset;
}
function consumeEscaped(source, offset) {
	offset += 2;
	if (isHexDigit(getCharCode(source, offset - 1))) {
		for (const maxOffset = Math.min(source.length, offset + 5); offset < maxOffset; offset++) if (!isHexDigit(getCharCode(source, offset))) break;
		const code = getCharCode(source, offset);
		if (isWhiteSpace(code)) offset += getNewlineLength(source, offset, code);
	}
	return offset;
}
function consumeName(source, offset) {
	for (; offset < source.length; offset++) {
		const code = source.charCodeAt(offset);
		if (isName(code)) continue;
		if (isValidEscape(code, getCharCode(source, offset + 1))) {
			offset = consumeEscaped(source, offset) - 1;
			continue;
		}
		break;
	}
	return offset;
}
function consumeNumber(source, offset) {
	let code = source.charCodeAt(offset);
	if (code === 43 || code === 45) code = source.charCodeAt(offset += 1);
	if (isDigit(code)) {
		offset = findDecimalNumberEnd(source, offset + 1);
		code = source.charCodeAt(offset);
	}
	if (code === 46 && isDigit(source.charCodeAt(offset + 1))) {
		offset += 2;
		offset = findDecimalNumberEnd(source, offset);
	}
	if (cmpChar(source, offset, 101)) {
		let sign = 0;
		code = source.charCodeAt(offset + 1);
		if (code === 45 || code === 43) {
			sign = 1;
			code = source.charCodeAt(offset + 2);
		}
		if (isDigit(code)) offset = findDecimalNumberEnd(source, offset + 1 + sign + 1);
	}
	return offset;
}
function consumeBadUrlRemnants(source, offset) {
	for (; offset < source.length; offset++) {
		const code = source.charCodeAt(offset);
		if (code === 41) {
			offset++;
			break;
		}
		if (isValidEscape(code, getCharCode(source, offset + 1))) offset = consumeEscaped(source, offset);
	}
	return offset;
}
function decodeEscaped(escaped) {
	if (escaped.length === 1 && !isHexDigit(escaped.charCodeAt(0))) return escaped[0];
	let code = parseInt(escaped, 16);
	if (code === 0 || code >= 55296 && code <= 57343 || code > 1114111) code = 65533;
	return String.fromCodePoint(code);
}
var init_utils = __esmMin((() => {
	init_char_code_definitions();
}));
//#endregion
//#region node_modules/css-tree/lib/tokenizer/names.js
var names_default;
var init_names$1 = __esmMin((() => {
	names_default = [
		"EOF-token",
		"ident-token",
		"function-token",
		"at-keyword-token",
		"hash-token",
		"string-token",
		"bad-string-token",
		"url-token",
		"bad-url-token",
		"delim-token",
		"number-token",
		"percentage-token",
		"dimension-token",
		"whitespace-token",
		"CDO-token",
		"CDC-token",
		"colon-token",
		"semicolon-token",
		"comma-token",
		"[-token",
		"]-token",
		"(-token",
		")-token",
		"{-token",
		"}-token",
		"comment-token"
	];
}));
//#endregion
//#region node_modules/css-tree/lib/tokenizer/adopt-buffer.js
function adoptBuffer(buffer = null, size) {
	if (buffer === null || buffer.length < size) return new Uint32Array(Math.max(size + 1024, MIN_SIZE));
	return buffer;
}
var MIN_SIZE;
var init_adopt_buffer = __esmMin((() => {
	MIN_SIZE = 16 * 1024;
}));
//#endregion
//#region node_modules/css-tree/lib/tokenizer/OffsetToLocation.js
function computeLinesAndColumns(host) {
	const source = host.source;
	const sourceLength = source.length;
	const startOffset = source.length > 0 ? isBOM(source.charCodeAt(0)) : 0;
	const lines = adoptBuffer(host.lines, sourceLength);
	const columns = adoptBuffer(host.columns, sourceLength);
	let line = host.startLine;
	let column = host.startColumn;
	for (let i = startOffset; i < sourceLength; i++) {
		const code = source.charCodeAt(i);
		lines[i] = line;
		columns[i] = column++;
		if (code === N$4 || code === R$2 || code === F$2) {
			if (code === R$2 && i + 1 < sourceLength && source.charCodeAt(i + 1) === N$4) {
				i++;
				lines[i] = line;
				columns[i] = column;
			}
			line++;
			column = 1;
		}
	}
	lines[sourceLength] = line;
	columns[sourceLength] = column;
	host.lines = lines;
	host.columns = columns;
	host.computed = true;
}
var N$4, F$2, R$2, OffsetToLocation;
var init_OffsetToLocation = __esmMin((() => {
	init_adopt_buffer();
	init_char_code_definitions();
	N$4 = 10;
	F$2 = 12;
	R$2 = 13;
	OffsetToLocation = class {
		constructor(source, startOffset, startLine, startColumn) {
			this.setSource(source, startOffset, startLine, startColumn);
			this.lines = null;
			this.columns = null;
		}
		setSource(source = "", startOffset = 0, startLine = 1, startColumn = 1) {
			this.source = source;
			this.startOffset = startOffset;
			this.startLine = startLine;
			this.startColumn = startColumn;
			this.computed = false;
		}
		getLocation(offset, filename) {
			if (!this.computed) computeLinesAndColumns(this);
			return {
				source: filename,
				offset: this.startOffset + offset,
				line: this.lines[offset],
				column: this.columns[offset]
			};
		}
		getLocationRange(start, end, filename) {
			if (!this.computed) computeLinesAndColumns(this);
			return {
				source: filename,
				start: {
					offset: this.startOffset + start,
					line: this.lines[start],
					column: this.columns[start]
				},
				end: {
					offset: this.startOffset + end,
					line: this.lines[end],
					column: this.columns[end]
				}
			};
		}
	};
}));
//#endregion
//#region node_modules/css-tree/lib/tokenizer/TokenStream.js
function boundIndex(index, min, max) {
	return index < min ? min : index > max ? max : index;
}
var OFFSET_MASK, TYPE_SHIFT, BLOCK_OPEN_TOKEN, BLOCK_CLOSE_TOKEN, balancePair$1, blockTokens, TokenStream;
var init_TokenStream = __esmMin((() => {
	init_adopt_buffer();
	init_utils();
	init_names$1();
	init_types();
	OFFSET_MASK = 16777215;
	TYPE_SHIFT = 24;
	BLOCK_OPEN_TOKEN = 1;
	BLOCK_CLOSE_TOKEN = 2;
	balancePair$1 = new Uint8Array(32);
	balancePair$1[2] = 22;
	balancePair$1[21] = 22;
	balancePair$1[19] = 20;
	balancePair$1[23] = 24;
	blockTokens = new Uint8Array(32);
	blockTokens[2] = BLOCK_OPEN_TOKEN;
	blockTokens[21] = BLOCK_OPEN_TOKEN;
	blockTokens[19] = BLOCK_OPEN_TOKEN;
	blockTokens[23] = BLOCK_OPEN_TOKEN;
	blockTokens[22] = BLOCK_CLOSE_TOKEN;
	blockTokens[20] = BLOCK_CLOSE_TOKEN;
	blockTokens[24] = BLOCK_CLOSE_TOKEN;
	TokenStream = class {
		constructor(source, tokenize) {
			this.setSource(source, tokenize);
		}
		reset() {
			this.eof = false;
			this.tokenIndex = -1;
			this.tokenType = 0;
			this.tokenStart = this.firstCharOffset;
			this.tokenEnd = this.firstCharOffset;
		}
		setSource(source = "", tokenize = () => {}) {
			source = String(source || "");
			const sourceLength = source.length;
			const offsetAndType = adoptBuffer(this.offsetAndType, source.length + 1);
			const balance = adoptBuffer(this.balance, source.length + 1);
			let tokenCount = 0;
			let firstCharOffset = -1;
			let balanceCloseType = 0;
			let balanceStart = source.length;
			this.offsetAndType = null;
			this.balance = null;
			balance.fill(0);
			tokenize(source, (type, start, end) => {
				const index = tokenCount++;
				offsetAndType[index] = type << TYPE_SHIFT | end;
				if (firstCharOffset === -1) firstCharOffset = start;
				balance[index] = balanceStart;
				if (type === balanceCloseType) {
					const prevBalanceStart = balance[balanceStart];
					balance[balanceStart] = index;
					balanceStart = prevBalanceStart;
					balanceCloseType = balancePair$1[offsetAndType[prevBalanceStart] >> TYPE_SHIFT];
				} else if (this.isBlockOpenerTokenType(type)) {
					balanceStart = index;
					balanceCloseType = balancePair$1[type];
				}
			});
			offsetAndType[tokenCount] = 0 << TYPE_SHIFT | sourceLength;
			balance[tokenCount] = tokenCount;
			for (let i = 0; i < tokenCount; i++) {
				const balanceStart = balance[i];
				if (balanceStart <= i) {
					const balanceEnd = balance[balanceStart];
					if (balanceEnd !== i) balance[i] = balanceEnd;
				} else if (balanceStart > tokenCount) balance[i] = tokenCount;
			}
			this.source = source;
			this.firstCharOffset = firstCharOffset === -1 ? 0 : firstCharOffset;
			this.tokenCount = tokenCount;
			this.offsetAndType = offsetAndType;
			this.balance = balance;
			this.reset();
			this.next();
		}
		lookupType(offset) {
			offset += this.tokenIndex;
			if (offset < this.tokenCount) return this.offsetAndType[offset] >> TYPE_SHIFT;
			return 0;
		}
		lookupTypeNonSC(idx) {
			for (let offset = this.tokenIndex; offset < this.tokenCount; offset++) {
				const tokenType = this.offsetAndType[offset] >> TYPE_SHIFT;
				if (tokenType !== 13 && tokenType !== 25) {
					if (idx-- === 0) return tokenType;
				}
			}
			return 0;
		}
		lookupOffset(offset) {
			offset += this.tokenIndex;
			if (offset < this.tokenCount) return this.offsetAndType[offset - 1] & OFFSET_MASK;
			return this.source.length;
		}
		lookupOffsetNonSC(idx) {
			for (let offset = this.tokenIndex; offset < this.tokenCount; offset++) {
				const tokenType = this.offsetAndType[offset] >> TYPE_SHIFT;
				if (tokenType !== 13 && tokenType !== 25) {
					if (idx-- === 0) return offset - this.tokenIndex;
				}
			}
			return 0;
		}
		lookupValue(offset, referenceStr) {
			offset += this.tokenIndex;
			if (offset < this.tokenCount) return cmpStr(this.source, this.offsetAndType[offset - 1] & OFFSET_MASK, this.offsetAndType[offset] & OFFSET_MASK, referenceStr);
			return false;
		}
		getTokenStart(tokenIndex) {
			if (tokenIndex === this.tokenIndex) return this.tokenStart;
			if (tokenIndex > 0) return tokenIndex < this.tokenCount ? this.offsetAndType[tokenIndex - 1] & OFFSET_MASK : this.offsetAndType[this.tokenCount] & OFFSET_MASK;
			return this.firstCharOffset;
		}
		getTokenEnd(tokenIndex) {
			if (tokenIndex === this.tokenIndex) return this.tokenEnd;
			return this.offsetAndType[boundIndex(tokenIndex, 0, this.tokenCount)] & OFFSET_MASK;
		}
		getTokenType(tokenIndex) {
			if (tokenIndex === this.tokenIndex) return this.tokenType;
			return this.offsetAndType[boundIndex(tokenIndex, 0, this.tokenCount)] >> TYPE_SHIFT;
		}
		substrToCursor(start) {
			return this.source.substring(start, this.tokenStart);
		}
		isBlockOpenerTokenType(tokenType) {
			return blockTokens[tokenType] === BLOCK_OPEN_TOKEN;
		}
		isBlockCloserTokenType(tokenType) {
			return blockTokens[tokenType] === BLOCK_CLOSE_TOKEN;
		}
		getBlockTokenPairIndex(tokenIndex) {
			const type = this.getTokenType(tokenIndex);
			if (blockTokens[type] === 1) {
				const pairIndex = this.balance[tokenIndex];
				const closeType = this.getTokenType(pairIndex);
				return balancePair$1[type] === closeType ? pairIndex : -1;
			} else if (blockTokens[type] === 2) {
				const pairIndex = this.balance[tokenIndex];
				return balancePair$1[this.getTokenType(pairIndex)] === type ? pairIndex : -1;
			}
			return -1;
		}
		isBalanceEdge(tokenIndex) {
			return this.balance[this.tokenIndex] < tokenIndex;
		}
		isDelim(code, offset) {
			if (offset) return this.lookupType(offset) === 9 && this.source.charCodeAt(this.lookupOffset(offset)) === code;
			return this.tokenType === 9 && this.source.charCodeAt(this.tokenStart) === code;
		}
		skip(tokenCount) {
			let next = this.tokenIndex + tokenCount;
			if (next < this.tokenCount) {
				this.tokenIndex = next;
				this.tokenStart = this.offsetAndType[next - 1] & OFFSET_MASK;
				next = this.offsetAndType[next];
				this.tokenType = next >> TYPE_SHIFT;
				this.tokenEnd = next & OFFSET_MASK;
			} else {
				this.tokenIndex = this.tokenCount;
				this.next();
			}
		}
		next() {
			let next = this.tokenIndex + 1;
			if (next < this.tokenCount) {
				this.tokenIndex = next;
				this.tokenStart = this.tokenEnd;
				next = this.offsetAndType[next];
				this.tokenType = next >> TYPE_SHIFT;
				this.tokenEnd = next & OFFSET_MASK;
			} else {
				this.eof = true;
				this.tokenIndex = this.tokenCount;
				this.tokenType = 0;
				this.tokenStart = this.tokenEnd = this.source.length;
			}
		}
		skipSC() {
			while (this.tokenType === 13 || this.tokenType === 25) this.next();
		}
		skipUntilBalanced(startToken, stopConsume) {
			let cursor = startToken;
			let balanceEnd = 0;
			let offset = 0;
			loop: for (; cursor < this.tokenCount; cursor++) {
				balanceEnd = this.balance[cursor];
				if (balanceEnd < startToken) break loop;
				offset = cursor > 0 ? this.offsetAndType[cursor - 1] & OFFSET_MASK : this.firstCharOffset;
				switch (stopConsume(this.source.charCodeAt(offset))) {
					case 1: break loop;
					case 2:
						cursor++;
						break loop;
					default: if (this.isBlockOpenerTokenType(this.offsetAndType[cursor] >> TYPE_SHIFT)) cursor = balanceEnd;
				}
			}
			this.skip(cursor - this.tokenIndex);
		}
		forEachToken(fn) {
			for (let i = 0, offset = this.firstCharOffset; i < this.tokenCount; i++) {
				const start = offset;
				const item = this.offsetAndType[i];
				const end = item & OFFSET_MASK;
				const type = item >> TYPE_SHIFT;
				offset = end;
				fn(type, start, end, i);
			}
		}
		dump() {
			const tokens = new Array(this.tokenCount);
			this.forEachToken((type, start, end, index) => {
				tokens[index] = {
					idx: index,
					type: names_default[type],
					chunk: this.source.substring(start, end),
					balance: this.balance[index]
				};
			});
			return tokens;
		}
	};
}));
//#endregion
//#region node_modules/css-tree/lib/tokenizer/index.js
function tokenize$1(source, onToken) {
	function getCharCode(offset) {
		return offset < sourceLength ? source.charCodeAt(offset) : 0;
	}
	function consumeNumericToken() {
		offset = consumeNumber(source, offset);
		if (isIdentifierStart(getCharCode(offset), getCharCode(offset + 1), getCharCode(offset + 2))) {
			type = 12;
			offset = consumeName(source, offset);
			return;
		}
		if (getCharCode(offset) === 37) {
			type = 11;
			offset++;
			return;
		}
		type = 10;
	}
	function consumeIdentLikeToken() {
		const nameStartOffset = offset;
		offset = consumeName(source, offset);
		if (cmpStr(source, nameStartOffset, offset, "url") && getCharCode(offset) === 40) {
			offset = findWhiteSpaceEnd(source, offset + 1);
			if (getCharCode(offset) === 34 || getCharCode(offset) === 39) {
				type = 2;
				offset = nameStartOffset + 4;
				return;
			}
			consumeUrlToken();
			return;
		}
		if (getCharCode(offset) === 40) {
			type = 2;
			offset++;
			return;
		}
		type = 1;
	}
	function consumeStringToken(endingCodePoint) {
		if (!endingCodePoint) endingCodePoint = getCharCode(offset++);
		type = 5;
		for (; offset < source.length; offset++) {
			const code = source.charCodeAt(offset);
			switch (charCodeCategory(code)) {
				case endingCodePoint:
					offset++;
					return;
				case 130:
					if (isNewline(code)) {
						offset += getNewlineLength(source, offset, code);
						type = 6;
						return;
					}
					break;
				case 92:
					if (offset === source.length - 1) break;
					const nextCode = getCharCode(offset + 1);
					if (isNewline(nextCode)) offset += getNewlineLength(source, offset + 1, nextCode);
					else if (isValidEscape(code, nextCode)) offset = consumeEscaped(source, offset) - 1;
					break;
			}
		}
	}
	function consumeUrlToken() {
		type = 7;
		offset = findWhiteSpaceEnd(source, offset);
		for (; offset < source.length; offset++) {
			const code = source.charCodeAt(offset);
			switch (charCodeCategory(code)) {
				case 41:
					offset++;
					return;
				case 130:
					offset = findWhiteSpaceEnd(source, offset);
					if (getCharCode(offset) === 41 || offset >= source.length) {
						if (offset < source.length) offset++;
						return;
					}
					offset = consumeBadUrlRemnants(source, offset);
					type = 8;
					return;
				case 34:
				case 39:
				case 40:
				case 133:
					offset = consumeBadUrlRemnants(source, offset);
					type = 8;
					return;
				case 92:
					if (isValidEscape(code, getCharCode(offset + 1))) {
						offset = consumeEscaped(source, offset) - 1;
						break;
					}
					offset = consumeBadUrlRemnants(source, offset);
					type = 8;
					return;
			}
		}
	}
	source = String(source || "");
	const sourceLength = source.length;
	let start = isBOM(getCharCode(0));
	let offset = start;
	let type;
	while (offset < sourceLength) {
		const code = source.charCodeAt(offset);
		switch (charCodeCategory(code)) {
			case 130:
				type = 13;
				offset = findWhiteSpaceEnd(source, offset + 1);
				break;
			case 34:
				consumeStringToken();
				break;
			case 35:
				if (isName(getCharCode(offset + 1)) || isValidEscape(getCharCode(offset + 1), getCharCode(offset + 2))) {
					type = 4;
					offset = consumeName(source, offset + 1);
				} else {
					type = 9;
					offset++;
				}
				break;
			case 39:
				consumeStringToken();
				break;
			case 40:
				type = 21;
				offset++;
				break;
			case 41:
				type = 22;
				offset++;
				break;
			case 43:
				if (isNumberStart(code, getCharCode(offset + 1), getCharCode(offset + 2))) consumeNumericToken();
				else {
					type = 9;
					offset++;
				}
				break;
			case 44:
				type = 18;
				offset++;
				break;
			case 45:
				if (isNumberStart(code, getCharCode(offset + 1), getCharCode(offset + 2))) consumeNumericToken();
				else if (getCharCode(offset + 1) === 45 && getCharCode(offset + 2) === 62) {
					type = 15;
					offset = offset + 3;
				} else if (isIdentifierStart(code, getCharCode(offset + 1), getCharCode(offset + 2))) consumeIdentLikeToken();
				else {
					type = 9;
					offset++;
				}
				break;
			case 46:
				if (isNumberStart(code, getCharCode(offset + 1), getCharCode(offset + 2))) consumeNumericToken();
				else {
					type = 9;
					offset++;
				}
				break;
			case 47:
				if (getCharCode(offset + 1) === 42) {
					type = 25;
					offset = source.indexOf("*/", offset + 2);
					offset = offset === -1 ? source.length : offset + 2;
				} else {
					type = 9;
					offset++;
				}
				break;
			case 58:
				type = 16;
				offset++;
				break;
			case 59:
				type = 17;
				offset++;
				break;
			case 60:
				if (getCharCode(offset + 1) === 33 && getCharCode(offset + 2) === 45 && getCharCode(offset + 3) === 45) {
					type = 14;
					offset = offset + 4;
				} else {
					type = 9;
					offset++;
				}
				break;
			case 64:
				if (isIdentifierStart(getCharCode(offset + 1), getCharCode(offset + 2), getCharCode(offset + 3))) {
					type = 3;
					offset = consumeName(source, offset + 1);
				} else {
					type = 9;
					offset++;
				}
				break;
			case 91:
				type = 19;
				offset++;
				break;
			case 92:
				if (isValidEscape(code, getCharCode(offset + 1))) consumeIdentLikeToken();
				else {
					type = 9;
					offset++;
				}
				break;
			case 93:
				type = 20;
				offset++;
				break;
			case 123:
				type = 23;
				offset++;
				break;
			case 125:
				type = 24;
				offset++;
				break;
			case 131:
				consumeNumericToken();
				break;
			case 132:
				consumeIdentLikeToken();
				break;
			default:
				type = 9;
				offset++;
		}
		onToken(type, start, start = offset);
	}
}
var init_tokenizer = __esmMin((() => {
	init_types();
	init_char_code_definitions();
	init_utils();
	init_types();
	init_names$1();
	init_char_code_definitions();
	init_utils();
	init_OffsetToLocation();
	init_TokenStream();
}));
//#endregion
//#region node_modules/css-tree/lib/utils/List.js
var releasedCursors, List;
var init_List = __esmMin((() => {
	releasedCursors = null;
	List = class List {
		static createItem(data) {
			return {
				prev: null,
				next: null,
				data
			};
		}
		constructor() {
			this.head = null;
			this.tail = null;
			this.cursor = null;
		}
		createItem(data) {
			return List.createItem(data);
		}
		allocateCursor(prev, next) {
			let cursor;
			if (releasedCursors !== null) {
				cursor = releasedCursors;
				releasedCursors = releasedCursors.cursor;
				cursor.prev = prev;
				cursor.next = next;
				cursor.cursor = this.cursor;
			} else cursor = {
				prev,
				next,
				cursor: this.cursor
			};
			this.cursor = cursor;
			return cursor;
		}
		releaseCursor() {
			const { cursor } = this;
			this.cursor = cursor.cursor;
			cursor.prev = null;
			cursor.next = null;
			cursor.cursor = releasedCursors;
			releasedCursors = cursor;
		}
		updateCursors(prevOld, prevNew, nextOld, nextNew) {
			let { cursor } = this;
			while (cursor !== null) {
				if (cursor.prev === prevOld) cursor.prev = prevNew;
				if (cursor.next === nextOld) cursor.next = nextNew;
				cursor = cursor.cursor;
			}
		}
		*[Symbol.iterator]() {
			for (let cursor = this.head; cursor !== null; cursor = cursor.next) yield cursor.data;
		}
		get size() {
			let size = 0;
			for (let cursor = this.head; cursor !== null; cursor = cursor.next) size++;
			return size;
		}
		get isEmpty() {
			return this.head === null;
		}
		get first() {
			return this.head && this.head.data;
		}
		get last() {
			return this.tail && this.tail.data;
		}
		fromArray(array) {
			let cursor = null;
			this.head = null;
			for (let data of array) {
				const item = List.createItem(data);
				if (cursor !== null) cursor.next = item;
				else this.head = item;
				item.prev = cursor;
				cursor = item;
			}
			this.tail = cursor;
			return this;
		}
		toArray() {
			return [...this];
		}
		toJSON() {
			return [...this];
		}
		forEach(fn, thisArg = this) {
			const cursor = this.allocateCursor(null, this.head);
			while (cursor.next !== null) {
				const item = cursor.next;
				cursor.next = item.next;
				fn.call(thisArg, item.data, item, this);
			}
			this.releaseCursor();
		}
		forEachRight(fn, thisArg = this) {
			const cursor = this.allocateCursor(this.tail, null);
			while (cursor.prev !== null) {
				const item = cursor.prev;
				cursor.prev = item.prev;
				fn.call(thisArg, item.data, item, this);
			}
			this.releaseCursor();
		}
		reduce(fn, initialValue, thisArg = this) {
			let cursor = this.allocateCursor(null, this.head);
			let acc = initialValue;
			let item;
			while (cursor.next !== null) {
				item = cursor.next;
				cursor.next = item.next;
				acc = fn.call(thisArg, acc, item.data, item, this);
			}
			this.releaseCursor();
			return acc;
		}
		reduceRight(fn, initialValue, thisArg = this) {
			let cursor = this.allocateCursor(this.tail, null);
			let acc = initialValue;
			let item;
			while (cursor.prev !== null) {
				item = cursor.prev;
				cursor.prev = item.prev;
				acc = fn.call(thisArg, acc, item.data, item, this);
			}
			this.releaseCursor();
			return acc;
		}
		some(fn, thisArg = this) {
			for (let cursor = this.head; cursor !== null; cursor = cursor.next) if (fn.call(thisArg, cursor.data, cursor, this)) return true;
			return false;
		}
		map(fn, thisArg = this) {
			const result = new List();
			for (let cursor = this.head; cursor !== null; cursor = cursor.next) result.appendData(fn.call(thisArg, cursor.data, cursor, this));
			return result;
		}
		filter(fn, thisArg = this) {
			const result = new List();
			for (let cursor = this.head; cursor !== null; cursor = cursor.next) if (fn.call(thisArg, cursor.data, cursor, this)) result.appendData(cursor.data);
			return result;
		}
		nextUntil(start, fn, thisArg = this) {
			if (start === null) return;
			const cursor = this.allocateCursor(null, start);
			while (cursor.next !== null) {
				const item = cursor.next;
				cursor.next = item.next;
				if (fn.call(thisArg, item.data, item, this)) break;
			}
			this.releaseCursor();
		}
		prevUntil(start, fn, thisArg = this) {
			if (start === null) return;
			const cursor = this.allocateCursor(start, null);
			while (cursor.prev !== null) {
				const item = cursor.prev;
				cursor.prev = item.prev;
				if (fn.call(thisArg, item.data, item, this)) break;
			}
			this.releaseCursor();
		}
		clear() {
			this.head = null;
			this.tail = null;
		}
		copy() {
			const result = new List();
			for (let data of this) result.appendData(data);
			return result;
		}
		prepend(item) {
			this.updateCursors(null, item, this.head, item);
			if (this.head !== null) {
				this.head.prev = item;
				item.next = this.head;
			} else this.tail = item;
			this.head = item;
			return this;
		}
		prependData(data) {
			return this.prepend(List.createItem(data));
		}
		append(item) {
			return this.insert(item);
		}
		appendData(data) {
			return this.insert(List.createItem(data));
		}
		insert(item, before = null) {
			if (before !== null) {
				this.updateCursors(before.prev, item, before, item);
				if (before.prev === null) {
					if (this.head !== before) throw new Error("before doesn't belong to list");
					this.head = item;
					before.prev = item;
					item.next = before;
					this.updateCursors(null, item);
				} else {
					before.prev.next = item;
					item.prev = before.prev;
					before.prev = item;
					item.next = before;
				}
			} else {
				this.updateCursors(this.tail, item, null, item);
				if (this.tail !== null) {
					this.tail.next = item;
					item.prev = this.tail;
				} else this.head = item;
				this.tail = item;
			}
			return this;
		}
		insertData(data, before) {
			return this.insert(List.createItem(data), before);
		}
		remove(item) {
			this.updateCursors(item, item.prev, item, item.next);
			if (item.prev !== null) item.prev.next = item.next;
			else {
				if (this.head !== item) throw new Error("item doesn't belong to list");
				this.head = item.next;
			}
			if (item.next !== null) item.next.prev = item.prev;
			else {
				if (this.tail !== item) throw new Error("item doesn't belong to list");
				this.tail = item.prev;
			}
			item.prev = null;
			item.next = null;
			return item;
		}
		push(data) {
			this.insert(List.createItem(data));
		}
		pop() {
			return this.tail !== null ? this.remove(this.tail) : null;
		}
		unshift(data) {
			this.prepend(List.createItem(data));
		}
		shift() {
			return this.head !== null ? this.remove(this.head) : null;
		}
		prependList(list) {
			return this.insertList(list, this.head);
		}
		appendList(list) {
			return this.insertList(list);
		}
		insertList(list, before) {
			if (list.head === null) return this;
			if (before !== void 0 && before !== null) {
				this.updateCursors(before.prev, list.tail, before, list.head);
				if (before.prev !== null) {
					before.prev.next = list.head;
					list.head.prev = before.prev;
				} else this.head = list.head;
				before.prev = list.tail;
				list.tail.next = before;
			} else {
				this.updateCursors(this.tail, list.tail, null, list.head);
				if (this.tail !== null) {
					this.tail.next = list.head;
					list.head.prev = this.tail;
				} else this.head = list.head;
				this.tail = list.tail;
			}
			list.head = null;
			list.tail = null;
			return this;
		}
		replace(oldItem, newItemOrList) {
			if ("head" in newItemOrList) this.insertList(newItemOrList, oldItem);
			else this.insert(newItemOrList, oldItem);
			this.remove(oldItem);
		}
	};
}));
//#endregion
//#region node_modules/css-tree/lib/utils/create-custom-error.js
function createCustomError(name, message) {
	const error = Object.create(SyntaxError.prototype);
	const errorStack = /* @__PURE__ */ new Error();
	return Object.assign(error, {
		name,
		message,
		get stack() {
			return (errorStack.stack || "").replace(/^(.+\n){1,3}/, `${name}: ${message}\n`);
		}
	});
}
var init_create_custom_error = __esmMin((() => {}));
//#endregion
//#region node_modules/css-tree/lib/parser/SyntaxError.js
function sourceFragment({ source, line, column, baseLine, baseColumn }, extraLines) {
	function processLines(start, end) {
		return lines.slice(start, end).map((line, idx) => String(start + idx + 1).padStart(maxNumLength) + " |" + line).join("\n");
	}
	const lines = ("\n".repeat(Math.max(baseLine - 1, 0)) + " ".repeat(Math.max(baseColumn - 1, 0)) + source).split(/\r\n?|\n|\f/);
	const startLine = Math.max(1, line - extraLines) - 1;
	const endLine = Math.min(line + extraLines, lines.length + 1);
	const maxNumLength = Math.max(4, String(endLine).length) + 1;
	let cutLeft = 0;
	column += 3 * (lines[line - 1].substr(0, column - 1).match(/\t/g) || []).length;
	if (column > MAX_LINE_LENGTH) {
		cutLeft = column - OFFSET_CORRECTION + 3;
		column = OFFSET_CORRECTION - 2;
	}
	for (let i = startLine; i <= endLine; i++) if (i >= 0 && i < lines.length) {
		lines[i] = lines[i].replace(/\t/g, TAB_REPLACEMENT);
		lines[i] = (cutLeft > 0 && lines[i].length > cutLeft ? "…" : "") + lines[i].substr(cutLeft, MAX_LINE_LENGTH - 2) + (lines[i].length > cutLeft + MAX_LINE_LENGTH - 1 ? "…" : "");
	}
	return [
		processLines(startLine, line),
		new Array(column + maxNumLength + 2).join("-") + "^",
		processLines(line, endLine)
	].filter(Boolean).join("\n").replace(/^(\s+\d+\s+\|\n)+/, "").replace(/\n(\s+\d+\s+\|)+$/, "");
}
function SyntaxError$2(message, source, offset, line, column, baseLine = 1, baseColumn = 1) {
	return Object.assign(createCustomError("SyntaxError", message), {
		source,
		offset,
		line,
		column,
		sourceFragment(extraLines) {
			return sourceFragment({
				source,
				line,
				column,
				baseLine,
				baseColumn
			}, isNaN(extraLines) ? 0 : extraLines);
		},
		get formattedMessage() {
			return `Parse error: ${message}\n` + sourceFragment({
				source,
				line,
				column,
				baseLine,
				baseColumn
			}, 2);
		}
	});
}
var MAX_LINE_LENGTH, OFFSET_CORRECTION, TAB_REPLACEMENT;
var init_SyntaxError$1 = __esmMin((() => {
	init_create_custom_error();
	MAX_LINE_LENGTH = 100;
	OFFSET_CORRECTION = 60;
	TAB_REPLACEMENT = "    ";
}));
//#endregion
//#region node_modules/css-tree/lib/parser/sequence.js
function readSequence(recognizer) {
	const children = this.createList();
	let space = false;
	const context = { recognizer };
	while (!this.eof) {
		switch (this.tokenType) {
			case 25:
				this.next();
				continue;
			case 13:
				space = true;
				this.next();
				continue;
		}
		let child = recognizer.getNode.call(this, context);
		if (child === void 0) break;
		if (space) {
			if (recognizer.onWhiteSpace) recognizer.onWhiteSpace.call(this, child, children, context);
			space = false;
		}
		children.push(child);
	}
	if (space && recognizer.onWhiteSpace) recognizer.onWhiteSpace.call(this, null, children, context);
	return children;
}
var init_sequence = __esmMin((() => {
	init_tokenizer();
}));
//#endregion
//#region node_modules/css-tree/lib/parser/create.js
function createParseContext(name) {
	return function() {
		return this[name]();
	};
}
function fetchParseValues(dict) {
	const result = Object.create(null);
	for (const name of Object.keys(dict)) {
		const item = dict[name];
		const fn = item.parse || item;
		if (fn) result[name] = fn;
	}
	return result;
}
function processConfig(config) {
	const parseConfig = {
		context: Object.create(null),
		features: Object.assign(Object.create(null), config.features),
		scope: Object.assign(Object.create(null), config.scope),
		atrule: fetchParseValues(config.atrule),
		pseudo: fetchParseValues(config.pseudo),
		node: fetchParseValues(config.node)
	};
	for (const [name, context] of Object.entries(config.parseContext)) switch (typeof context) {
		case "function":
			parseConfig.context[name] = context;
			break;
		case "string":
			parseConfig.context[name] = createParseContext(context);
			break;
	}
	return {
		config: parseConfig,
		...parseConfig,
		...parseConfig.node
	};
}
function createParser(config) {
	let source = "";
	let filename = "<unknown>";
	let needPositions = false;
	let onParseError = NOOP;
	let onParseErrorThrow = false;
	const locationMap = new OffsetToLocation();
	const parser = Object.assign(new TokenStream(), processConfig(config || {}), {
		parseAtrulePrelude: true,
		parseRulePrelude: true,
		parseValue: true,
		parseCustomProperty: false,
		readSequence,
		consumeUntilBalanceEnd: () => 0,
		consumeUntilLeftCurlyBracket(code) {
			return code === LEFTCURLYBRACKET$1 ? 1 : 0;
		},
		consumeUntilLeftCurlyBracketOrSemicolon(code) {
			return code === LEFTCURLYBRACKET$1 || code === SEMICOLON ? 1 : 0;
		},
		consumeUntilExclamationMarkOrSemicolon(code) {
			return code === EXCLAMATIONMARK$3 || code === SEMICOLON ? 1 : 0;
		},
		consumeUntilSemicolonIncluded(code) {
			return code === SEMICOLON ? 2 : 0;
		},
		createList: NOOP,
		createSingleNodeList: NOOP,
		getFirstListNode: NOOP,
		getLastListNode: NOOP,
		parseWithFallback(consumer, fallback) {
			const startIndex = this.tokenIndex;
			try {
				return consumer.call(this);
			} catch (e) {
				if (onParseErrorThrow) throw e;
				this.skip(startIndex - this.tokenIndex);
				const fallbackNode = fallback.call(this);
				onParseErrorThrow = true;
				onParseError(e, fallbackNode);
				onParseErrorThrow = false;
				return fallbackNode;
			}
		},
		lookupNonWSType(offset) {
			let type;
			do {
				type = this.lookupType(offset++);
				if (type !== 13 && type !== 25) return type;
			} while (type !== NULL);
			return NULL;
		},
		charCodeAt(offset) {
			return offset >= 0 && offset < source.length ? source.charCodeAt(offset) : 0;
		},
		substring(offsetStart, offsetEnd) {
			return source.substring(offsetStart, offsetEnd);
		},
		substrToCursor(start) {
			return this.source.substring(start, this.tokenStart);
		},
		cmpChar(offset, charCode) {
			return cmpChar(source, offset, charCode);
		},
		cmpStr(offsetStart, offsetEnd, str) {
			return cmpStr(source, offsetStart, offsetEnd, str);
		},
		consume(tokenType) {
			const start = this.tokenStart;
			this.eat(tokenType);
			return this.substrToCursor(start);
		},
		consumeFunctionName() {
			const name = source.substring(this.tokenStart, this.tokenEnd - 1);
			this.eat(2);
			return name;
		},
		consumeNumber(type) {
			const number = source.substring(this.tokenStart, consumeNumber(source, this.tokenStart));
			this.eat(type);
			return number;
		},
		eat(tokenType) {
			if (this.tokenType !== tokenType) {
				const tokenName = names_default[tokenType].slice(0, -6).replace(/-/g, " ").replace(/^./, (m) => m.toUpperCase());
				let message = `${/[[\](){}]/.test(tokenName) ? `"${tokenName}"` : tokenName} is expected`;
				let offset = this.tokenStart;
				switch (tokenType) {
					case 1:
						if (this.tokenType === 2 || this.tokenType === 7) {
							offset = this.tokenEnd - 1;
							message = "Identifier is expected but function found";
						} else message = "Identifier is expected";
						break;
					case 4:
						if (this.isDelim(NUMBERSIGN$4)) {
							this.next();
							offset++;
							message = "Name is expected";
						}
						break;
					case 11:
						if (this.tokenType === 10) {
							offset = this.tokenEnd;
							message = "Percent sign is expected";
						}
						break;
				}
				this.error(message, offset);
			}
			this.next();
		},
		eatIdent(name) {
			if (this.tokenType !== 1 || this.lookupValue(0, name) === false) this.error(`Identifier "${name}" is expected`);
			this.next();
		},
		eatDelim(code) {
			if (!this.isDelim(code)) this.error(`Delim "${String.fromCharCode(code)}" is expected`);
			this.next();
		},
		getLocation(start, end) {
			if (needPositions) return locationMap.getLocationRange(start, end, filename);
			return null;
		},
		getLocationFromList(list) {
			if (needPositions) {
				const head = this.getFirstListNode(list);
				const tail = this.getLastListNode(list);
				return locationMap.getLocationRange(head !== null ? head.loc.start.offset - locationMap.startOffset : this.tokenStart, tail !== null ? tail.loc.end.offset - locationMap.startOffset : this.tokenStart, filename);
			}
			return null;
		},
		error(message, offset) {
			const location = typeof offset !== "undefined" && offset < source.length ? locationMap.getLocation(offset) : this.eof ? locationMap.getLocation(findWhiteSpaceStart(source, source.length - 1)) : locationMap.getLocation(this.tokenStart);
			throw new SyntaxError$2(message || "Unexpected input", source, location.offset, location.line, location.column, locationMap.startLine, locationMap.startColumn);
		}
	});
	const createTokenIterateAPI = () => ({
		filename,
		source,
		tokenCount: parser.tokenCount,
		getTokenType: (index) => parser.getTokenType(index),
		getTokenTypeName: (index) => names_default[parser.getTokenType(index)],
		getTokenStart: (index) => parser.getTokenStart(index),
		getTokenEnd: (index) => parser.getTokenEnd(index),
		getTokenValue: (index) => parser.source.substring(parser.getTokenStart(index), parser.getTokenEnd(index)),
		substring: (start, end) => parser.source.substring(start, end),
		balance: parser.balance.subarray(0, parser.tokenCount + 1),
		isBlockOpenerTokenType: parser.isBlockOpenerTokenType,
		isBlockCloserTokenType: parser.isBlockCloserTokenType,
		getBlockTokenPairIndex: (index) => parser.getBlockTokenPairIndex(index),
		getLocation: (offset) => locationMap.getLocation(offset, filename),
		getRangeLocation: (start, end) => locationMap.getLocationRange(start, end, filename)
	});
	const parse = function(source_, options) {
		source = source_;
		options = options || {};
		parser.setSource(source, tokenize$1);
		locationMap.setSource(source, options.offset, options.line, options.column);
		filename = options.filename || "<unknown>";
		needPositions = Boolean(options.positions);
		onParseError = typeof options.onParseError === "function" ? options.onParseError : NOOP;
		onParseErrorThrow = false;
		parser.parseAtrulePrelude = "parseAtrulePrelude" in options ? Boolean(options.parseAtrulePrelude) : true;
		parser.parseRulePrelude = "parseRulePrelude" in options ? Boolean(options.parseRulePrelude) : true;
		parser.parseValue = "parseValue" in options ? Boolean(options.parseValue) : true;
		parser.parseCustomProperty = "parseCustomProperty" in options ? Boolean(options.parseCustomProperty) : false;
		const { context = "default", list = true, onComment, onToken } = options;
		if (context in parser.context === false) throw new Error("Unknown context `" + context + "`");
		Object.assign(parser, list ? listMethods : arrayMethods);
		if (Array.isArray(onToken)) parser.forEachToken((type, start, end) => {
			onToken.push({
				type,
				start,
				end
			});
		});
		else if (typeof onToken === "function") parser.forEachToken(onToken.bind(createTokenIterateAPI()));
		if (typeof onComment === "function") parser.forEachToken((type, start, end) => {
			if (type === 25) {
				const loc = parser.getLocation(start, end);
				onComment(cmpStr(source, end - 2, end, "*/") ? source.slice(start + 2, end - 2) : source.slice(start + 2, end), loc);
			}
		});
		const ast = parser.context[context].call(parser, options);
		if (!parser.eof) parser.error();
		return ast;
	};
	return Object.assign(parse, {
		SyntaxError: SyntaxError$2,
		config: parser.config
	});
}
var NOOP, EXCLAMATIONMARK$3, NUMBERSIGN$4, SEMICOLON, LEFTCURLYBRACKET$1, NULL, arrayMethods, listMethods;
var init_create$4 = __esmMin((() => {
	init_List();
	init_SyntaxError$1();
	init_tokenizer();
	init_sequence();
	NOOP = () => {};
	EXCLAMATIONMARK$3 = 33;
	NUMBERSIGN$4 = 35;
	SEMICOLON = 59;
	LEFTCURLYBRACKET$1 = 123;
	NULL = 0;
	arrayMethods = {
		createList() {
			return [];
		},
		createSingleNodeList(node) {
			return [node];
		},
		getFirstListNode(list) {
			return list && list[0] || null;
		},
		getLastListNode(list) {
			return list && list.length > 0 ? list[list.length - 1] : null;
		}
	};
	listMethods = {
		createList() {
			return new List();
		},
		createSingleNodeList(node) {
			return new List().appendData(node);
		},
		getFirstListNode(list) {
			return list && list.first;
		},
		getLastListNode(list) {
			return list && list.last;
		}
	};
}));
//#endregion
//#region node_modules/css-tree/lib/generator/sourceMap.js
function generateSourceMap(handlers) {
	const map = new import_source_map_generator.SourceMapGenerator();
	const generated = {
		line: 1,
		column: 0
	};
	const original = {
		line: 0,
		column: 0
	};
	const activatedGenerated = {
		line: 1,
		column: 0
	};
	const activatedMapping = { generated: activatedGenerated };
	let line = 1;
	let column = 0;
	let sourceMappingActive = false;
	const origHandlersNode = handlers.node;
	handlers.node = function(node) {
		if (node.loc && node.loc.start && trackNodes.has(node.type)) {
			const nodeLine = node.loc.start.line;
			const nodeColumn = node.loc.start.column - 1;
			if (original.line !== nodeLine || original.column !== nodeColumn) {
				original.line = nodeLine;
				original.column = nodeColumn;
				generated.line = line;
				generated.column = column;
				if (sourceMappingActive) {
					sourceMappingActive = false;
					if (generated.line !== activatedGenerated.line || generated.column !== activatedGenerated.column) map.addMapping(activatedMapping);
				}
				sourceMappingActive = true;
				map.addMapping({
					source: node.loc.source,
					original,
					generated
				});
			}
		}
		origHandlersNode.call(this, node);
		if (sourceMappingActive && trackNodes.has(node.type)) {
			activatedGenerated.line = line;
			activatedGenerated.column = column;
		}
	};
	const origHandlersEmit = handlers.emit;
	handlers.emit = function(value, type, auto) {
		for (let i = 0; i < value.length; i++) if (value.charCodeAt(i) === 10) {
			line++;
			column = 0;
		} else column++;
		origHandlersEmit(value, type, auto);
	};
	const origHandlersResult = handlers.result;
	handlers.result = function() {
		if (sourceMappingActive) map.addMapping(activatedMapping);
		return {
			css: origHandlersResult(),
			map
		};
	};
	return handlers;
}
var import_source_map_generator, trackNodes;
var init_sourceMap = __esmMin((() => {
	import_source_map_generator = require_source_map_generator();
	trackNodes = new Set([
		"Atrule",
		"Selector",
		"Declaration"
	]);
}));
//#endregion
//#region node_modules/css-tree/lib/generator/token-before.js
var token_before_exports = /* @__PURE__ */ __exportAll({
	safe: () => safe,
	spec: () => spec
});
function createMap(pairs) {
	const isWhiteSpaceRequired = new Set(pairs.map(([prev, next]) => code(prev) << 16 | code(next)));
	return function(prevCode, type, value) {
		const nextCode = code(type, value);
		const nextCharCode = value.charCodeAt(0);
		return nextCode | (nextCharCode === HYPHENMINUS$6 && type !== 1 && type !== 2 && type !== 15 || nextCharCode === PLUSSIGN$9 ? isWhiteSpaceRequired.has((prevCode & 65534) << 16 | nextCharCode << 7) : isWhiteSpaceRequired.has((prevCode & 65534) << 16 | nextCode));
	};
}
var PLUSSIGN$9, HYPHENMINUS$6, code, specPairs, safePairs, spec, safe;
var init_token_before = __esmMin((() => {
	init_tokenizer();
	PLUSSIGN$9 = 43;
	HYPHENMINUS$6 = 45;
	code = (type, value) => {
		if (type === 9) type = value;
		if (typeof type === "string") type = Math.min(type.charCodeAt(0), 128) << 6;
		return type << 1;
	};
	specPairs = [
		[1, 1],
		[1, 2],
		[1, 7],
		[1, 8],
		[1, "-"],
		[1, 10],
		[1, 11],
		[1, 12],
		[1, 15],
		[1, 21],
		[3, 1],
		[3, 2],
		[3, 7],
		[3, 8],
		[3, "-"],
		[3, 10],
		[3, 11],
		[3, 12],
		[3, 15],
		[4, 1],
		[4, 2],
		[4, 7],
		[4, 8],
		[4, "-"],
		[4, 10],
		[4, 11],
		[4, 12],
		[4, 15],
		[12, 1],
		[12, 2],
		[12, 7],
		[12, 8],
		[12, "-"],
		[12, 10],
		[12, 11],
		[12, 12],
		[12, 15],
		["#", 1],
		["#", 2],
		["#", 7],
		["#", 8],
		["#", "-"],
		["#", 10],
		["#", 11],
		["#", 12],
		["#", 15],
		["-", 1],
		["-", 2],
		["-", 7],
		["-", 8],
		["-", "-"],
		["-", 10],
		["-", 11],
		["-", 12],
		["-", 15],
		[10, 1],
		[10, 2],
		[10, 7],
		[10, 8],
		[10, 10],
		[10, 11],
		[10, 12],
		[10, "%"],
		[10, 15],
		["@", 1],
		["@", 2],
		["@", 7],
		["@", 8],
		["@", "-"],
		["@", 15],
		[".", 10],
		[".", 11],
		[".", 12],
		["+", 10],
		["+", 11],
		["+", 12],
		["/", "*"]
	];
	safePairs = specPairs.concat([
		[1, 4],
		[12, 4],
		[4, 4],
		[3, 21],
		[3, 5],
		[3, 16],
		[11, 11],
		[11, 12],
		[11, 2],
		[11, "-"],
		[22, 1],
		[22, 2],
		[22, 11],
		[22, 12],
		[22, 4],
		[22, "-"]
	]);
	spec = createMap(specPairs);
	safe = createMap(safePairs);
}));
//#endregion
//#region node_modules/css-tree/lib/generator/create.js
function processChildren(node, delimeter) {
	if (typeof delimeter === "function") {
		let prev = null;
		node.children.forEach((node) => {
			if (prev !== null) delimeter.call(this, prev);
			this.node(node);
			prev = node;
		});
		return;
	}
	node.children.forEach(this.node, this);
}
function createGenerator(config) {
	const types = /* @__PURE__ */ new Map();
	for (let [name, item] of Object.entries(config.node)) if (typeof (item.generate || item) === "function") types.set(name, item.generate || item);
	return function(node, options) {
		let buffer = "";
		let prevCode = 0;
		let handlers = {
			node(node) {
				if (types.has(node.type)) types.get(node.type).call(publicApi, node);
				else throw new Error("Unknown node type: " + node.type);
			},
			tokenBefore: safe,
			token(type, value, suppressAutoWhiteSpace) {
				prevCode = this.tokenBefore(prevCode, type, value);
				if (!suppressAutoWhiteSpace && prevCode & 1) this.emit(" ", 13, true);
				this.emit(value, type, false);
				if (type === 9 && value.charCodeAt(0) === REVERSESOLIDUS) this.emit("\n", 13, true);
			},
			emit(value) {
				buffer += value;
			},
			result() {
				return buffer;
			}
		};
		if (options) {
			if (typeof options.decorator === "function") handlers = options.decorator(handlers);
			if (options.sourceMap) handlers = generateSourceMap(handlers);
			if (options.mode in token_before_exports) handlers.tokenBefore = token_before_exports[options.mode];
		}
		const publicApi = {
			node: (node) => handlers.node(node),
			children: processChildren,
			token: (type, value) => handlers.token(type, value),
			tokenize: (raw) => tokenize$1(raw, (type, start, end) => {
				handlers.token(type, raw.slice(start, end), start !== 0);
			})
		};
		handlers.node(node);
		return handlers.result();
	};
}
var REVERSESOLIDUS;
var init_create$3 = __esmMin((() => {
	init_tokenizer();
	init_sourceMap();
	init_token_before();
	REVERSESOLIDUS = 92;
}));
//#endregion
//#region node_modules/css-tree/lib/convertor/create.js
function createConvertor(walk) {
	return {
		fromPlainObject(ast) {
			walk(ast, { enter(node) {
				if (node.children && node.children instanceof List === false) node.children = new List().fromArray(node.children);
			} });
			return ast;
		},
		toPlainObject(ast) {
			walk(ast, { leave(node) {
				if (node.children && node.children instanceof List) node.children = node.children.toArray();
			} });
			return ast;
		}
	};
}
var init_create$2 = __esmMin((() => {
	init_List();
}));
//#endregion
//#region node_modules/css-tree/lib/walker/create.js
function ensureFunction$1(value) {
	return typeof value === "function" ? value : noop$2;
}
function invokeForType(fn, type) {
	return function(node, item, list) {
		if (node.type === type) fn.call(this, node, item, list);
	};
}
function getWalkersFromStructure(name, nodeType) {
	const structure = nodeType.structure;
	const walkers = [];
	for (const key in structure) {
		if (hasOwnProperty$3.call(structure, key) === false) continue;
		let fieldTypes = structure[key];
		const walker = {
			name: key,
			type: false,
			nullable: false
		};
		if (!Array.isArray(fieldTypes)) fieldTypes = [fieldTypes];
		for (const fieldType of fieldTypes) if (fieldType === null) walker.nullable = true;
		else if (typeof fieldType === "string") walker.type = "node";
		else if (Array.isArray(fieldType)) walker.type = "list";
		if (walker.type) walkers.push(walker);
	}
	if (walkers.length) return {
		context: nodeType.walkContext,
		fields: walkers
	};
	return null;
}
function getTypesFromConfig(config) {
	const types = {};
	for (const name in config.node) if (hasOwnProperty$3.call(config.node, name)) {
		const nodeType = config.node[name];
		if (!nodeType.structure) throw new Error("Missed `structure` field in `" + name + "` node type definition");
		types[name] = getWalkersFromStructure(name, nodeType);
	}
	return types;
}
function createTypeIterator(config, reverse) {
	const fields = config.fields.slice();
	const contextName = config.context;
	const useContext = typeof contextName === "string";
	if (reverse) fields.reverse();
	return function(node, context, walk, walkReducer) {
		let prevContextValue;
		if (useContext) {
			prevContextValue = context[contextName];
			context[contextName] = node;
		}
		for (const field of fields) {
			const ref = node[field.name];
			if (!field.nullable || ref) {
				if (field.type === "list") {
					if (reverse ? ref.reduceRight(walkReducer, false) : ref.reduce(walkReducer, false)) return true;
				} else if (walk(ref)) return true;
			}
		}
		if (useContext) context[contextName] = prevContextValue;
	};
}
function createFastTraveralMap({ StyleSheet, Atrule, Rule, Block, DeclarationList }) {
	return {
		Atrule: {
			StyleSheet,
			Atrule,
			Rule,
			Block
		},
		Rule: {
			StyleSheet,
			Atrule,
			Rule,
			Block
		},
		Declaration: {
			StyleSheet,
			Atrule,
			Rule,
			Block,
			DeclarationList
		}
	};
}
function createWalker(config) {
	const types = getTypesFromConfig(config);
	const iteratorsNatural = {};
	const iteratorsReverse = {};
	const breakWalk = Symbol("break-walk");
	const skipNode = Symbol("skip-node");
	for (const name in types) if (hasOwnProperty$3.call(types, name) && types[name] !== null) {
		iteratorsNatural[name] = createTypeIterator(types[name], false);
		iteratorsReverse[name] = createTypeIterator(types[name], true);
	}
	const fastTraversalIteratorsNatural = createFastTraveralMap(iteratorsNatural);
	const fastTraversalIteratorsReverse = createFastTraveralMap(iteratorsReverse);
	const walk = function(root, options) {
		function walkNode(node, item, list) {
			const enterRet = enter.call(context, node, item, list);
			if (enterRet === breakWalk) return true;
			if (enterRet === skipNode) return false;
			if (iterators.hasOwnProperty(node.type)) {
				if (iterators[node.type](node, context, walkNode, walkReducer)) return true;
			}
			if (leave.call(context, node, item, list) === breakWalk) return true;
			return false;
		}
		let enter = noop$2;
		let leave = noop$2;
		let iterators = iteratorsNatural;
		let walkReducer = (ret, data, item, list) => ret || walkNode(data, item, list);
		const context = {
			break: breakWalk,
			skip: skipNode,
			root,
			stylesheet: null,
			atrule: null,
			atrulePrelude: null,
			rule: null,
			selector: null,
			block: null,
			declaration: null,
			function: null
		};
		if (typeof options === "function") enter = options;
		else if (options) {
			enter = ensureFunction$1(options.enter);
			leave = ensureFunction$1(options.leave);
			if (options.reverse) iterators = iteratorsReverse;
			if (options.visit) {
				if (fastTraversalIteratorsNatural.hasOwnProperty(options.visit)) iterators = options.reverse ? fastTraversalIteratorsReverse[options.visit] : fastTraversalIteratorsNatural[options.visit];
				else if (!types.hasOwnProperty(options.visit)) throw new Error("Bad value `" + options.visit + "` for `visit` option (should be: " + Object.keys(types).sort().join(", ") + ")");
				enter = invokeForType(enter, options.visit);
				leave = invokeForType(leave, options.visit);
			}
		}
		if (enter === noop$2 && leave === noop$2) throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");
		walkNode(root);
	};
	walk.break = breakWalk;
	walk.skip = skipNode;
	walk.find = function(ast, fn) {
		let found = null;
		walk(ast, function(node, item, list) {
			if (fn.call(this, node, item, list)) {
				found = node;
				return breakWalk;
			}
		});
		return found;
	};
	walk.findLast = function(ast, fn) {
		let found = null;
		walk(ast, {
			reverse: true,
			enter(node, item, list) {
				if (fn.call(this, node, item, list)) {
					found = node;
					return breakWalk;
				}
			}
		});
		return found;
	};
	walk.findAll = function(ast, fn) {
		const found = [];
		walk(ast, function(node, item, list) {
			if (fn.call(this, node, item, list)) found.push(node);
		});
		return found;
	};
	return walk;
}
var hasOwnProperty$3, noop$2;
var init_create$1 = __esmMin((() => {
	({hasOwnProperty: hasOwnProperty$3} = Object.prototype);
	noop$2 = function() {};
}));
//#endregion
//#region node_modules/css-tree/lib/definition-syntax/generate.js
function noop$1(value) {
	return value;
}
function generateMultiplier(multiplier) {
	const { min, max, comma } = multiplier;
	if (min === 0 && max === 0) return comma ? "#?" : "*";
	if (min === 0 && max === 1) return "?";
	if (min === 1 && max === 0) return comma ? "#" : "+";
	if (min === 1 && max === 1) return "";
	return (comma ? "#" : "") + (min === max ? "{" + min + "}" : "{" + min + "," + (max !== 0 ? max : "") + "}");
}
function generateTypeOpts(node) {
	switch (node.type) {
		case "Range": return " [" + (node.min === null ? "-∞" : node.min) + "," + (node.max === null ? "∞" : node.max) + "]";
		default: throw new Error("Unknown node type `" + node.type + "`");
	}
}
function generateSequence(node, decorate, forceBraces, compact) {
	const combinator = node.combinator === " " || compact ? node.combinator : " " + node.combinator + " ";
	const result = node.terms.map((term) => internalGenerate(term, decorate, forceBraces, compact)).join(combinator);
	if (node.explicit || forceBraces) return (compact || result[0] === "," ? "[" : "[ ") + result + (compact ? "]" : " ]");
	return result;
}
function internalGenerate(node, decorate, forceBraces, compact) {
	let result;
	switch (node.type) {
		case "Group":
			result = generateSequence(node, decorate, forceBraces, compact) + (node.disallowEmpty ? "!" : "");
			break;
		case "Multiplier": return internalGenerate(node.term, decorate, forceBraces, compact) + decorate(generateMultiplier(node), node);
		case "Boolean":
			result = "<boolean-expr[" + internalGenerate(node.term, decorate, forceBraces, compact) + "]>";
			break;
		case "Type":
			result = "<" + node.name + (node.opts ? decorate(generateTypeOpts(node.opts), node.opts) : "") + ">";
			break;
		case "Property":
			result = "<'" + node.name + "'>";
			break;
		case "Keyword":
			result = node.name;
			break;
		case "AtKeyword":
			result = "@" + node.name;
			break;
		case "Function":
			result = node.name + "(";
			break;
		case "String":
		case "Token":
			result = node.value;
			break;
		case "Comma":
			result = ",";
			break;
		default: throw new Error("Unknown node type `" + node.type + "`");
	}
	return decorate(result, node);
}
function generate$50(node, options) {
	let decorate = noop$1;
	let forceBraces = false;
	let compact = false;
	if (typeof options === "function") decorate = options;
	else if (options) {
		forceBraces = Boolean(options.forceBraces);
		compact = Boolean(options.compact);
		if (typeof options.decorate === "function") decorate = options.decorate;
	}
	return internalGenerate(node, decorate, forceBraces, compact);
}
var init_generate = __esmMin((() => {}));
//#endregion
//#region node_modules/css-tree/lib/lexer/error.js
function locateMismatch(matchResult, node) {
	const tokens = matchResult.tokens;
	const longestMatch = matchResult.longestMatch;
	const mismatchNode = longestMatch < tokens.length ? tokens[longestMatch].node || null : null;
	const badNode = mismatchNode !== node ? mismatchNode : null;
	let mismatchOffset = 0;
	let mismatchLength = 0;
	let entries = 0;
	let css = "";
	let start;
	let end;
	for (let i = 0; i < tokens.length; i++) {
		const token = tokens[i].value;
		if (i === longestMatch) {
			mismatchLength = token.length;
			mismatchOffset = css.length;
		}
		if (badNode !== null && tokens[i].node === badNode) if (i <= longestMatch) entries++;
		else entries = 0;
		css += token;
	}
	if (longestMatch === tokens.length || entries > 1) {
		start = fromLoc(badNode || node, "end") || buildLoc(defaultLoc, css);
		end = buildLoc(start);
	} else {
		start = fromLoc(badNode, "start") || buildLoc(fromLoc(node, "start") || defaultLoc, css.slice(0, mismatchOffset));
		end = fromLoc(badNode, "end") || buildLoc(start, css.substr(mismatchOffset, mismatchLength));
	}
	return {
		css,
		mismatchOffset,
		mismatchLength,
		start,
		end
	};
}
function fromLoc(node, point) {
	const value = node && node.loc && node.loc[point];
	if (value) return "line" in value ? buildLoc(value) : value;
	return null;
}
function buildLoc({ offset, line, column }, extra) {
	const loc = {
		offset,
		line,
		column
	};
	if (extra) {
		const lines = extra.split(/\n|\r\n?|\f/);
		loc.offset += extra.length;
		loc.line += lines.length - 1;
		loc.column = lines.length === 1 ? loc.column + extra.length : lines.pop().length + 1;
	}
	return loc;
}
var defaultLoc, SyntaxReferenceError, SyntaxMatchError;
var init_error = __esmMin((() => {
	init_create_custom_error();
	init_generate();
	defaultLoc = {
		offset: 0,
		line: 1,
		column: 1
	};
	SyntaxReferenceError = function(type, referenceName) {
		const error = createCustomError("SyntaxReferenceError", type + (referenceName ? " `" + referenceName + "`" : ""));
		error.reference = referenceName;
		return error;
	};
	SyntaxMatchError = function(message, syntax, node, matchResult) {
		const error = createCustomError("SyntaxMatchError", message);
		const { css, mismatchOffset, mismatchLength, start, end } = locateMismatch(matchResult, node);
		error.rawMessage = message;
		error.syntax = syntax ? generate$50(syntax) : "<generic>";
		error.css = css;
		error.mismatchOffset = mismatchOffset;
		error.mismatchLength = mismatchLength;
		error.message = message + "\n  syntax: " + error.syntax + "\n   value: " + (css || "<empty string>") + "\n  --------" + new Array(error.mismatchOffset + 1).join("-") + "^";
		Object.assign(error, start);
		error.loc = {
			source: node && node.loc && node.loc.source || "<unknown>",
			start,
			end
		};
		return error;
	};
}));
//#endregion
//#region node_modules/css-tree/lib/utils/names.js
function isCustomProperty(str, offset) {
	offset = offset || 0;
	return str.length - offset >= 2 && str.charCodeAt(offset) === HYPHENMINUS$5 && str.charCodeAt(offset + 1) === HYPHENMINUS$5;
}
function getVendorPrefix(str, offset) {
	offset = offset || 0;
	if (str.length - offset >= 3) {
		if (str.charCodeAt(offset) === HYPHENMINUS$5 && str.charCodeAt(offset + 1) !== HYPHENMINUS$5) {
			const secondDashIndex = str.indexOf("-", offset + 2);
			if (secondDashIndex !== -1) return str.substring(offset, secondDashIndex + 1);
		}
	}
	return "";
}
function getKeywordDescriptor(keyword) {
	if (keywords.has(keyword)) return keywords.get(keyword);
	const name = keyword.toLowerCase();
	let descriptor = keywords.get(name);
	if (descriptor === void 0) {
		const custom = isCustomProperty(name, 0);
		const vendor = !custom ? getVendorPrefix(name, 0) : "";
		descriptor = Object.freeze({
			basename: name.substr(vendor.length),
			name,
			prefix: vendor,
			vendor,
			custom
		});
	}
	keywords.set(keyword, descriptor);
	return descriptor;
}
function getPropertyDescriptor(property) {
	if (properties.has(property)) return properties.get(property);
	let name = property;
	let hack = property[0];
	if (hack === "/") hack = property[1] === "/" ? "//" : "/";
	else if (hack !== "_" && hack !== "*" && hack !== "$" && hack !== "#" && hack !== "+" && hack !== "&") hack = "";
	const custom = isCustomProperty(name, hack.length);
	if (!custom) {
		name = name.toLowerCase();
		if (properties.has(name)) {
			const descriptor = properties.get(name);
			properties.set(property, descriptor);
			return descriptor;
		}
	}
	const vendor = !custom ? getVendorPrefix(name, hack.length) : "";
	const prefix = name.substr(0, hack.length + vendor.length);
	const descriptor = Object.freeze({
		basename: name.substr(prefix.length),
		name: name.substr(hack.length),
		hack,
		vendor,
		prefix,
		custom
	});
	properties.set(property, descriptor);
	return descriptor;
}
var keywords, properties, HYPHENMINUS$5, keyword, property;
var init_names = __esmMin((() => {
	keywords = /* @__PURE__ */ new Map();
	properties = /* @__PURE__ */ new Map();
	HYPHENMINUS$5 = 45;
	keyword = getKeywordDescriptor;
	property = getPropertyDescriptor;
}));
//#endregion
//#region node_modules/css-tree/lib/lexer/generic-const.js
var cssWideKeywords;
var init_generic_const = __esmMin((() => {
	cssWideKeywords = [
		"initial",
		"inherit",
		"unset",
		"revert",
		"revert-layer"
	];
}));
//#endregion
//#region node_modules/css-tree/lib/lexer/generic-an-plus-b.js
function isDelim$1(token, code) {
	return token !== null && token.type === 9 && token.value.charCodeAt(0) === code;
}
function skipSC(token, offset, getNextToken) {
	while (token !== null && (token.type === 13 || token.type === 25)) token = getNextToken(++offset);
	return offset;
}
function checkInteger$1(token, valueOffset, disallowSign, offset) {
	if (!token) return 0;
	const code = token.value.charCodeAt(valueOffset);
	if (code === PLUSSIGN$8 || code === HYPHENMINUS$4) {
		if (disallowSign) return 0;
		valueOffset++;
	}
	for (; valueOffset < token.value.length; valueOffset++) if (!isDigit(token.value.charCodeAt(valueOffset))) return 0;
	return offset + 1;
}
function consumeB$1(token, offset_, getNextToken) {
	let sign = false;
	let offset = skipSC(token, offset_, getNextToken);
	token = getNextToken(offset);
	if (token === null) return offset_;
	if (token.type !== 10) if (isDelim$1(token, PLUSSIGN$8) || isDelim$1(token, HYPHENMINUS$4)) {
		sign = true;
		offset = skipSC(getNextToken(++offset), offset, getNextToken);
		token = getNextToken(offset);
		if (token === null || token.type !== 10) return 0;
	} else return offset_;
	if (!sign) {
		const code = token.value.charCodeAt(0);
		if (code !== PLUSSIGN$8 && code !== HYPHENMINUS$4) return 0;
	}
	return checkInteger$1(token, sign ? 0 : 1, sign, offset);
}
function anPlusB(token, getNextToken) {
	let offset = 0;
	if (!token) return 0;
	if (token.type === 10) return checkInteger$1(token, 0, ALLOW_SIGN$1, offset);
	else if (token.type === 1 && token.value.charCodeAt(0) === HYPHENMINUS$4) {
		if (!cmpChar(token.value, 1, N$3)) return 0;
		switch (token.value.length) {
			case 2: return consumeB$1(getNextToken(++offset), offset, getNextToken);
			case 3:
				if (token.value.charCodeAt(2) !== HYPHENMINUS$4) return 0;
				offset = skipSC(getNextToken(++offset), offset, getNextToken);
				token = getNextToken(offset);
				return checkInteger$1(token, 0, DISALLOW_SIGN$1, offset);
			default:
				if (token.value.charCodeAt(2) !== HYPHENMINUS$4) return 0;
				return checkInteger$1(token, 3, DISALLOW_SIGN$1, offset);
		}
	} else if (token.type === 1 || isDelim$1(token, PLUSSIGN$8) && getNextToken(offset + 1).type === 1) {
		if (token.type !== 1) token = getNextToken(++offset);
		if (token === null || !cmpChar(token.value, 0, N$3)) return 0;
		switch (token.value.length) {
			case 1: return consumeB$1(getNextToken(++offset), offset, getNextToken);
			case 2:
				if (token.value.charCodeAt(1) !== HYPHENMINUS$4) return 0;
				offset = skipSC(getNextToken(++offset), offset, getNextToken);
				token = getNextToken(offset);
				return checkInteger$1(token, 0, DISALLOW_SIGN$1, offset);
			default:
				if (token.value.charCodeAt(1) !== HYPHENMINUS$4) return 0;
				return checkInteger$1(token, 2, DISALLOW_SIGN$1, offset);
		}
	} else if (token.type === 12) {
		let code = token.value.charCodeAt(0);
		let sign = code === PLUSSIGN$8 || code === HYPHENMINUS$4 ? 1 : 0;
		let i = sign;
		for (; i < token.value.length; i++) if (!isDigit(token.value.charCodeAt(i))) break;
		if (i === sign) return 0;
		if (!cmpChar(token.value, i, N$3)) return 0;
		if (i + 1 === token.value.length) return consumeB$1(getNextToken(++offset), offset, getNextToken);
		else {
			if (token.value.charCodeAt(i + 1) !== HYPHENMINUS$4) return 0;
			if (i + 2 === token.value.length) {
				offset = skipSC(getNextToken(++offset), offset, getNextToken);
				token = getNextToken(offset);
				return checkInteger$1(token, 0, DISALLOW_SIGN$1, offset);
			} else return checkInteger$1(token, i + 2, DISALLOW_SIGN$1, offset);
		}
	}
	return 0;
}
var PLUSSIGN$8, HYPHENMINUS$4, N$3, DISALLOW_SIGN$1, ALLOW_SIGN$1;
var init_generic_an_plus_b = __esmMin((() => {
	init_tokenizer();
	PLUSSIGN$8 = 43;
	HYPHENMINUS$4 = 45;
	N$3 = 110;
	DISALLOW_SIGN$1 = true;
	ALLOW_SIGN$1 = false;
}));
//#endregion
//#region node_modules/css-tree/lib/lexer/generic-urange.js
function isDelim(token, code) {
	return token !== null && token.type === 9 && token.value.charCodeAt(0) === code;
}
function startsWith$1(token, code) {
	return token.value.charCodeAt(0) === code;
}
function hexSequence(token, offset, allowDash) {
	let hexlen = 0;
	for (let pos = offset; pos < token.value.length; pos++) {
		const code = token.value.charCodeAt(pos);
		if (code === HYPHENMINUS$3 && allowDash && hexlen !== 0) {
			hexSequence(token, offset + hexlen + 1, false);
			return 6;
		}
		if (!isHexDigit(code)) return 0;
		if (++hexlen > 6) return 0;
	}
	return hexlen;
}
function withQuestionMarkSequence(consumed, length, getNextToken) {
	if (!consumed) return 0;
	while (isDelim(getNextToken(length), QUESTIONMARK$2)) {
		if (++consumed > 6) return 0;
		length++;
	}
	return length;
}
function urange(token, getNextToken) {
	let length = 0;
	if (token === null || token.type !== 1 || !cmpChar(token.value, 0, U$1)) return 0;
	token = getNextToken(++length);
	if (token === null) return 0;
	if (isDelim(token, PLUSSIGN$7)) {
		token = getNextToken(++length);
		if (token === null) return 0;
		if (token.type === 1) return withQuestionMarkSequence(hexSequence(token, 0, true), ++length, getNextToken);
		if (isDelim(token, QUESTIONMARK$2)) return withQuestionMarkSequence(1, ++length, getNextToken);
		return 0;
	}
	if (token.type === 10) {
		const consumedHexLength = hexSequence(token, 1, true);
		if (consumedHexLength === 0) return 0;
		token = getNextToken(++length);
		if (token === null) return length;
		if (token.type === 12 || token.type === 10) {
			if (!startsWith$1(token, HYPHENMINUS$3) || !hexSequence(token, 1, false)) return 0;
			return length + 1;
		}
		return withQuestionMarkSequence(consumedHexLength, length, getNextToken);
	}
	if (token.type === 12) return withQuestionMarkSequence(hexSequence(token, 1, true), ++length, getNextToken);
	return 0;
}
var PLUSSIGN$7, HYPHENMINUS$3, QUESTIONMARK$2, U$1;
var init_generic_urange = __esmMin((() => {
	init_tokenizer();
	PLUSSIGN$7 = 43;
	HYPHENMINUS$3 = 45;
	QUESTIONMARK$2 = 63;
	U$1 = 117;
}));
//#endregion
//#region node_modules/css-tree/lib/lexer/generic.js
function charCodeAt(str, index) {
	return index < str.length ? str.charCodeAt(index) : 0;
}
function eqStr(actual, expected) {
	return cmpStr(actual, 0, actual.length, expected);
}
function eqStrAny(actual, expected) {
	for (let i = 0; i < expected.length; i++) if (eqStr(actual, expected[i])) return true;
	return false;
}
function isPostfixIeHack(str, offset) {
	if (offset !== str.length - 2) return false;
	return charCodeAt(str, offset) === 92 && isDigit(charCodeAt(str, offset + 1));
}
function outOfRange(opts, value, numEnd) {
	if (opts && opts.type === "Range") {
		const num = Number(numEnd !== void 0 && numEnd !== value.length ? value.substr(0, numEnd) : value);
		if (isNaN(num)) return true;
		if (opts.min !== null && num < opts.min && typeof opts.min !== "string") return true;
		if (opts.max !== null && num > opts.max && typeof opts.max !== "string") return true;
	}
	return false;
}
function consumeFunction(token, getNextToken) {
	let balanceCloseType = 0;
	let balanceStash = [];
	let length = 0;
	scan: do {
		switch (token.type) {
			case 24:
			case 22:
			case 20:
				if (token.type !== balanceCloseType) break scan;
				balanceCloseType = balanceStash.pop();
				if (balanceStash.length === 0) {
					length++;
					break scan;
				}
				break;
			case 2:
			case 21:
			case 19:
			case 23:
				balanceStash.push(balanceCloseType);
				balanceCloseType = balancePair.get(token.type);
				break;
		}
		length++;
	} while (token = getNextToken(length));
	return length;
}
function math(next, functionNames) {
	return function(token, getNextToken, opts) {
		if (token === null) return 0;
		if (token.type === 2 && eqStrAny(token.value, functionNames)) return consumeFunction(token, getNextToken);
		return next(token, getNextToken, opts);
	};
}
function tokenType(expectedTokenType) {
	return function(token) {
		if (token === null || token.type !== expectedTokenType) return 0;
		return 1;
	};
}
function customIdent(token) {
	if (token === null || token.type !== 1) return 0;
	const name = token.value.toLowerCase();
	if (eqStrAny(name, cssWideKeywords)) return 0;
	if (eqStr(name, "default")) return 0;
	return 1;
}
function dashedIdent(token) {
	if (token === null || token.type !== 1) return 0;
	if (charCodeAt(token.value, 0) !== 45 || charCodeAt(token.value, 1) !== 45) return 0;
	return 1;
}
function customPropertyName(token) {
	if (!dashedIdent(token)) return 0;
	if (token.value === "--") return 0;
	return 1;
}
function hexColor(token) {
	if (token === null || token.type !== 4) return 0;
	const length = token.value.length;
	if (length !== 4 && length !== 5 && length !== 7 && length !== 9) return 0;
	for (let i = 1; i < length; i++) if (!isHexDigit(charCodeAt(token.value, i))) return 0;
	return 1;
}
function idSelector(token) {
	if (token === null || token.type !== 4) return 0;
	if (!isIdentifierStart(charCodeAt(token.value, 1), charCodeAt(token.value, 2), charCodeAt(token.value, 3))) return 0;
	return 1;
}
function declarationValue(token, getNextToken) {
	if (!token) return 0;
	let balanceCloseType = 0;
	let balanceStash = [];
	let length = 0;
	scan: do {
		switch (token.type) {
			case 6:
			case 8: break scan;
			case 24:
			case 22:
			case 20:
				if (token.type !== balanceCloseType) break scan;
				balanceCloseType = balanceStash.pop();
				break;
			case 17:
				if (balanceCloseType === 0) break scan;
				break;
			case 9:
				if (balanceCloseType === 0 && token.value === "!") break scan;
				break;
			case 2:
			case 21:
			case 19:
			case 23:
				balanceStash.push(balanceCloseType);
				balanceCloseType = balancePair.get(token.type);
				break;
		}
		length++;
	} while (token = getNextToken(length));
	return length;
}
function anyValue(token, getNextToken) {
	if (!token) return 0;
	let balanceCloseType = 0;
	let balanceStash = [];
	let length = 0;
	scan: do {
		switch (token.type) {
			case 6:
			case 8: break scan;
			case 24:
			case 22:
			case 20:
				if (token.type !== balanceCloseType) break scan;
				balanceCloseType = balanceStash.pop();
				break;
			case 2:
			case 21:
			case 19:
			case 23:
				balanceStash.push(balanceCloseType);
				balanceCloseType = balancePair.get(token.type);
				break;
		}
		length++;
	} while (token = getNextToken(length));
	return length;
}
function dimension(type) {
	if (type) type = new Set(type);
	return function(token, getNextToken, opts) {
		if (token === null || token.type !== 12) return 0;
		const numberEnd = consumeNumber(token.value, 0);
		if (type !== null) {
			const reverseSolidusOffset = token.value.indexOf("\\", numberEnd);
			const unit = reverseSolidusOffset === -1 || !isPostfixIeHack(token.value, reverseSolidusOffset) ? token.value.substr(numberEnd) : token.value.substring(numberEnd, reverseSolidusOffset);
			if (type.has(unit.toLowerCase()) === false) return 0;
		}
		if (outOfRange(opts, token.value, numberEnd)) return 0;
		return 1;
	};
}
function percentage(token, getNextToken, opts) {
	if (token === null || token.type !== 11) return 0;
	if (outOfRange(opts, token.value, token.value.length - 1)) return 0;
	return 1;
}
function zero(next) {
	if (typeof next !== "function") next = function() {
		return 0;
	};
	return function(token, getNextToken, opts) {
		if (token !== null && token.type === 10) {
			if (Number(token.value) === 0) return 1;
		}
		return next(token, getNextToken, opts);
	};
}
function number(token, getNextToken, opts) {
	if (token === null) return 0;
	const numberEnd = consumeNumber(token.value, 0);
	if (!(numberEnd === token.value.length) && !isPostfixIeHack(token.value, numberEnd)) return 0;
	if (outOfRange(opts, token.value, numberEnd)) return 0;
	return 1;
}
function integer(token, getNextToken, opts) {
	if (token === null || token.type !== 10) return 0;
	let i = charCodeAt(token.value, 0) === 43 || charCodeAt(token.value, 0) === 45 ? 1 : 0;
	for (; i < token.value.length; i++) if (!isDigit(charCodeAt(token.value, i))) return 0;
	if (outOfRange(opts, token.value, i)) return 0;
	return 1;
}
function createDemensionTypes(units) {
	const { angle, decibel, frequency, flex, length, resolution, semitones, time } = units || {};
	return {
		"dimension": math(dimension(null), dimensionFunctionNames),
		"angle": math(dimension(angle), dimensionFunctionNames),
		"decibel": math(dimension(decibel), dimensionFunctionNames),
		"frequency": math(dimension(frequency), dimensionFunctionNames),
		"flex": math(dimension(flex), dimensionFunctionNames),
		"length": math(zero(dimension(length)), dimensionFunctionNames),
		"resolution": math(dimension(resolution), dimensionFunctionNames),
		"semitones": math(dimension(semitones), dimensionFunctionNames),
		"time": math(dimension(time), dimensionFunctionNames)
	};
}
function createAttrUnit(units) {
	const unitSet = /* @__PURE__ */ new Set();
	for (const group of unitGroups) if (Array.isArray(units[group])) for (const unit of units[group]) unitSet.add(unit.toLowerCase());
	return function attrUnit(token) {
		if (token === null) return 0;
		if (token.type === 9 && token.value === "%") return 1;
		if (token.type === 1 && unitSet.has(token.value.toLowerCase())) return 1;
		return 0;
	};
}
function createGenericTypes(units) {
	return {
		...tokenTypes,
		...productionTypes,
		...createDemensionTypes(units),
		"attr-unit": createAttrUnit(units)
	};
}
var calcFunctionNames, comparisonFunctionNames, steppedValueFunctionNames, trigNumberFunctionNames, trigAngleFunctionNames, otherNumberFunctionNames, expNumberDimensionPercentageFunctionNames, signFunctionNames, numberFunctionNames, percentageFunctionNames, dimensionFunctionNames, balancePair, tokenTypes, productionTypes, unitGroups;
var init_generic = __esmMin((() => {
	init_generic_const();
	init_generic_an_plus_b();
	init_generic_urange();
	init_tokenizer();
	calcFunctionNames = [
		"calc(",
		"-moz-calc(",
		"-webkit-calc("
	];
	comparisonFunctionNames = [
		"min(",
		"max(",
		"clamp("
	];
	steppedValueFunctionNames = [
		"round(",
		"mod(",
		"rem("
	];
	trigNumberFunctionNames = [
		"sin(",
		"cos(",
		"tan("
	];
	trigAngleFunctionNames = [
		"asin(",
		"acos(",
		"atan(",
		"atan2("
	];
	otherNumberFunctionNames = [
		"pow(",
		"sqrt(",
		"log(",
		"exp(",
		"sign("
	];
	expNumberDimensionPercentageFunctionNames = ["hypot("];
	signFunctionNames = ["abs("];
	numberFunctionNames = [
		...calcFunctionNames,
		...comparisonFunctionNames,
		...steppedValueFunctionNames,
		...trigNumberFunctionNames,
		...otherNumberFunctionNames,
		...expNumberDimensionPercentageFunctionNames,
		...signFunctionNames
	];
	percentageFunctionNames = [
		...calcFunctionNames,
		...comparisonFunctionNames,
		...steppedValueFunctionNames,
		...expNumberDimensionPercentageFunctionNames,
		...signFunctionNames
	];
	dimensionFunctionNames = [
		...calcFunctionNames,
		...comparisonFunctionNames,
		...steppedValueFunctionNames,
		...trigAngleFunctionNames,
		...expNumberDimensionPercentageFunctionNames,
		...signFunctionNames
	];
	balancePair = new Map([
		[2, 22],
		[21, 22],
		[19, 20],
		[23, 24]
	]);
	tokenTypes = {
		"ident-token": tokenType(1),
		"function-token": tokenType(2),
		"at-keyword-token": tokenType(3),
		"hash-token": tokenType(4),
		"string-token": tokenType(5),
		"bad-string-token": tokenType(6),
		"url-token": tokenType(7),
		"bad-url-token": tokenType(8),
		"delim-token": tokenType(9),
		"number-token": tokenType(10),
		"percentage-token": tokenType(11),
		"dimension-token": tokenType(12),
		"whitespace-token": tokenType(13),
		"CDO-token": tokenType(14),
		"CDC-token": tokenType(15),
		"colon-token": tokenType(16),
		"semicolon-token": tokenType(17),
		"comma-token": tokenType(18),
		"[-token": tokenType(19),
		"]-token": tokenType(20),
		"(-token": tokenType(21),
		")-token": tokenType(22),
		"{-token": tokenType(23),
		"}-token": tokenType(24)
	};
	productionTypes = {
		"string": tokenType(5),
		"ident": tokenType(1),
		"percentage": math(percentage, percentageFunctionNames),
		"zero": zero(),
		"number": math(number, numberFunctionNames),
		"integer": math(integer, numberFunctionNames),
		"custom-ident": customIdent,
		"dashed-ident": dashedIdent,
		"custom-property-name": customPropertyName,
		"hex-color": hexColor,
		"id-selector": idSelector,
		"an-plus-b": anPlusB,
		"urange": urange,
		"declaration-value": declarationValue,
		"any-value": anyValue
	};
	unitGroups = [
		"length",
		"angle",
		"time",
		"frequency",
		"resolution",
		"flex",
		"decibel",
		"semitones"
	];
}));
//#endregion
//#region node_modules/css-tree/lib/lexer/units.js
var units_exports = /* @__PURE__ */ __exportAll({
	angle: () => angle,
	decibel: () => decibel,
	flex: () => flex,
	frequency: () => frequency,
	length: () => length,
	resolution: () => resolution,
	semitones: () => semitones,
	time: () => time
});
var length, angle, time, frequency, resolution, flex, decibel, semitones;
var init_units = __esmMin((() => {
	length = [
		"cm",
		"mm",
		"q",
		"in",
		"pt",
		"pc",
		"px",
		"em",
		"rem",
		"ex",
		"rex",
		"cap",
		"rcap",
		"ch",
		"rch",
		"ic",
		"ric",
		"lh",
		"rlh",
		"vw",
		"svw",
		"lvw",
		"dvw",
		"vh",
		"svh",
		"lvh",
		"dvh",
		"vi",
		"svi",
		"lvi",
		"dvi",
		"vb",
		"svb",
		"lvb",
		"dvb",
		"vmin",
		"svmin",
		"lvmin",
		"dvmin",
		"vmax",
		"svmax",
		"lvmax",
		"dvmax",
		"cqw",
		"cqh",
		"cqi",
		"cqb",
		"cqmin",
		"cqmax"
	];
	angle = [
		"deg",
		"grad",
		"rad",
		"turn"
	];
	time = ["s", "ms"];
	frequency = ["hz", "khz"];
	resolution = [
		"dpi",
		"dpcm",
		"dppx",
		"x"
	];
	flex = ["fr"];
	decibel = ["db"];
	semitones = ["st"];
}));
//#endregion
//#region node_modules/css-tree/lib/definition-syntax/SyntaxError.js
function SyntaxError$1(message, input, offset) {
	return Object.assign(createCustomError("SyntaxError", message), {
		input,
		offset,
		rawMessage: message,
		message: message + "\n  " + input + "\n--" + new Array((offset || input.length) + 1).join("-") + "^"
	});
}
var init_SyntaxError = __esmMin((() => {
	init_create_custom_error();
}));
//#endregion
//#region node_modules/css-tree/lib/definition-syntax/scanner.js
var TAB$1, N$2, F$1, R$1, SPACE$3, NAME_CHAR, Scanner;
var init_scanner = __esmMin((() => {
	init_SyntaxError();
	TAB$1 = 9;
	N$2 = 10;
	F$1 = 12;
	R$1 = 13;
	SPACE$3 = 32;
	NAME_CHAR = new Uint8Array(128).map((_, idx) => /[a-zA-Z0-9\-]/.test(String.fromCharCode(idx)) ? 1 : 0);
	Scanner = class {
		constructor(str) {
			this.str = str;
			this.pos = 0;
		}
		charCodeAt(pos) {
			return pos < this.str.length ? this.str.charCodeAt(pos) : 0;
		}
		charCode() {
			return this.charCodeAt(this.pos);
		}
		isNameCharCode(code = this.charCode()) {
			return code < 128 && NAME_CHAR[code] === 1;
		}
		nextCharCode() {
			return this.charCodeAt(this.pos + 1);
		}
		nextNonWsCode(pos) {
			return this.charCodeAt(this.findWsEnd(pos));
		}
		skipWs() {
			this.pos = this.findWsEnd(this.pos);
		}
		findWsEnd(pos) {
			for (; pos < this.str.length; pos++) {
				const code = this.str.charCodeAt(pos);
				if (code !== R$1 && code !== N$2 && code !== F$1 && code !== SPACE$3 && code !== TAB$1) break;
			}
			return pos;
		}
		substringToPos(end) {
			return this.str.substring(this.pos, this.pos = end);
		}
		eat(code) {
			if (this.charCode() !== code) this.error("Expect `" + String.fromCharCode(code) + "`");
			this.pos++;
		}
		peek() {
			return this.pos < this.str.length ? this.str.charAt(this.pos++) : "";
		}
		error(message) {
			throw new SyntaxError$1(message, this.str, this.pos);
		}
		scanSpaces() {
			return this.substringToPos(this.findWsEnd(this.pos));
		}
		scanWord() {
			let end = this.pos;
			for (; end < this.str.length; end++) {
				const code = this.str.charCodeAt(end);
				if (code >= 128 || NAME_CHAR[code] === 0) break;
			}
			if (this.pos === end) this.error("Expect a keyword");
			return this.substringToPos(end);
		}
		scanNumber() {
			let end = this.pos;
			for (; end < this.str.length; end++) {
				const code = this.str.charCodeAt(end);
				if (code < 48 || code > 57) break;
			}
			if (this.pos === end) this.error("Expect a number");
			return this.substringToPos(end);
		}
		scanString() {
			const end = this.str.indexOf("'", this.pos + 1);
			if (end === -1) {
				this.pos = this.str.length;
				this.error("Expect an apostrophe");
			}
			return this.substringToPos(end + 1);
		}
	};
}));
//#endregion
//#region node_modules/css-tree/lib/definition-syntax/parse.js
function readMultiplierRange(scanner) {
	let min = null;
	let max = null;
	scanner.eat(LEFTCURLYBRACKET);
	scanner.skipWs();
	min = scanner.scanNumber(scanner);
	scanner.skipWs();
	if (scanner.charCode() === COMMA) {
		scanner.pos++;
		scanner.skipWs();
		if (scanner.charCode() !== RIGHTCURLYBRACKET) {
			max = scanner.scanNumber(scanner);
			scanner.skipWs();
		}
	} else max = min;
	scanner.eat(RIGHTCURLYBRACKET);
	return {
		min: Number(min),
		max: max ? Number(max) : 0
	};
}
function readMultiplier(scanner) {
	let range = null;
	let comma = false;
	switch (scanner.charCode()) {
		case ASTERISK$6:
			scanner.pos++;
			range = {
				min: 0,
				max: 0
			};
			break;
		case PLUSSIGN$6:
			scanner.pos++;
			range = {
				min: 1,
				max: 0
			};
			break;
		case QUESTIONMARK$1:
			scanner.pos++;
			range = {
				min: 0,
				max: 1
			};
			break;
		case NUMBERSIGN$3:
			scanner.pos++;
			comma = true;
			if (scanner.charCode() === LEFTCURLYBRACKET) range = readMultiplierRange(scanner);
			else if (scanner.charCode() === QUESTIONMARK$1) {
				scanner.pos++;
				range = {
					min: 0,
					max: 0
				};
			} else range = {
				min: 1,
				max: 0
			};
			break;
		case LEFTCURLYBRACKET:
			range = readMultiplierRange(scanner);
			break;
		default: return null;
	}
	return {
		type: "Multiplier",
		comma,
		min: range.min,
		max: range.max,
		term: null
	};
}
function maybeMultiplied(scanner, node) {
	const multiplier = readMultiplier(scanner);
	if (multiplier !== null) {
		multiplier.term = node;
		if (scanner.charCode() === NUMBERSIGN$3 && scanner.charCodeAt(scanner.pos - 1) === PLUSSIGN$6) return maybeMultiplied(scanner, multiplier);
		if (scanner.charCode() === QUESTIONMARK$1 && scanner.charCodeAt(scanner.pos - 1) === RIGHTCURLYBRACKET) return maybeMultiplied(scanner, multiplier);
		return multiplier;
	}
	return node;
}
function maybeToken(scanner) {
	const ch = scanner.peek();
	if (ch === "") return null;
	return maybeMultiplied(scanner, {
		type: "Token",
		value: ch
	});
}
function readProperty$1(scanner) {
	let name;
	scanner.eat(LESSTHANSIGN$1);
	scanner.eat(APOSTROPHE$2);
	name = scanner.scanWord();
	scanner.eat(APOSTROPHE$2);
	scanner.eat(GREATERTHANSIGN$3);
	return maybeMultiplied(scanner, {
		type: "Property",
		name
	});
}
function readTypeRange(scanner) {
	let min = null;
	let max = null;
	let sign = 1;
	scanner.eat(LEFTSQUAREBRACKET);
	if (scanner.charCode() === HYPERMINUS) {
		scanner.peek();
		sign = -1;
	}
	if (sign == -1 && scanner.charCode() === INFINITY) scanner.peek();
	else {
		min = sign * Number(scanner.scanNumber(scanner));
		if (scanner.isNameCharCode()) min += scanner.scanWord();
	}
	scanner.skipWs();
	scanner.eat(COMMA);
	scanner.skipWs();
	if (scanner.charCode() === INFINITY) scanner.peek();
	else {
		sign = 1;
		if (scanner.charCode() === HYPERMINUS) {
			scanner.peek();
			sign = -1;
		}
		max = sign * Number(scanner.scanNumber(scanner));
		if (scanner.isNameCharCode()) max += scanner.scanWord();
	}
	scanner.eat(RIGHTSQUAREBRACKET);
	return {
		type: "Range",
		min,
		max
	};
}
function readType(scanner) {
	let name;
	let opts = null;
	scanner.eat(LESSTHANSIGN$1);
	name = scanner.scanWord();
	if (name === "boolean-expr") {
		scanner.eat(LEFTSQUAREBRACKET);
		const implicitGroup = readImplicitGroup(scanner, RIGHTSQUAREBRACKET);
		scanner.eat(RIGHTSQUAREBRACKET);
		scanner.eat(GREATERTHANSIGN$3);
		return maybeMultiplied(scanner, {
			type: "Boolean",
			term: implicitGroup.terms.length === 1 ? implicitGroup.terms[0] : implicitGroup
		});
	}
	if (scanner.charCode() === LEFTPARENTHESIS$2 && scanner.nextCharCode() === RIGHTPARENTHESIS$2) {
		scanner.pos += 2;
		name += "()";
	}
	if (scanner.charCodeAt(scanner.findWsEnd(scanner.pos)) === LEFTSQUAREBRACKET) {
		scanner.skipWs();
		opts = readTypeRange(scanner);
	}
	scanner.eat(GREATERTHANSIGN$3);
	return maybeMultiplied(scanner, {
		type: "Type",
		name,
		opts
	});
}
function readKeywordOrFunction(scanner) {
	const name = scanner.scanWord();
	if (scanner.charCode() === LEFTPARENTHESIS$2) {
		scanner.pos++;
		return {
			type: "Function",
			name
		};
	}
	return maybeMultiplied(scanner, {
		type: "Keyword",
		name
	});
}
function regroupTerms(terms, combinators) {
	function createGroup(terms, combinator) {
		return {
			type: "Group",
			terms,
			combinator,
			disallowEmpty: false,
			explicit: false
		};
	}
	let combinator;
	combinators = Object.keys(combinators).sort((a, b) => COMBINATOR_PRECEDENCE[a] - COMBINATOR_PRECEDENCE[b]);
	while (combinators.length > 0) {
		combinator = combinators.shift();
		let i = 0;
		let subgroupStart = 0;
		for (; i < terms.length; i++) {
			const term = terms[i];
			if (term.type === "Combinator") if (term.value === combinator) {
				if (subgroupStart === -1) subgroupStart = i - 1;
				terms.splice(i, 1);
				i--;
			} else {
				if (subgroupStart !== -1 && i - subgroupStart > 1) {
					terms.splice(subgroupStart, i - subgroupStart, createGroup(terms.slice(subgroupStart, i), combinator));
					i = subgroupStart + 1;
				}
				subgroupStart = -1;
			}
		}
		if (subgroupStart !== -1 && combinators.length) terms.splice(subgroupStart, i - subgroupStart, createGroup(terms.slice(subgroupStart, i), combinator));
	}
	return combinator;
}
function readImplicitGroup(scanner, stopCharCode = -1) {
	const combinators = Object.create(null);
	const terms = [];
	let prevToken = null;
	let prevTokenPos = scanner.pos;
	let prevTokenIsFunction = false;
	while (scanner.charCode() !== stopCharCode) {
		let token = prevTokenIsFunction ? readImplicitGroup(scanner, RIGHTPARENTHESIS$2) : peek(scanner);
		if (!token) break;
		if (token.type === "Spaces") continue;
		if (prevTokenIsFunction) {
			if (token.terms.length === 0) {
				prevTokenIsFunction = false;
				continue;
			}
			if (token.combinator === " ") {
				while (token.terms.length > 1) {
					combinators[" "] = true;
					terms.push({
						type: "Combinator",
						value: " "
					}, token.terms.shift());
				}
				token = token.terms[0];
			}
		}
		if (token.type === "Combinator") {
			if (prevToken === null || prevToken.type === "Combinator") {
				scanner.pos = prevTokenPos;
				scanner.error("Unexpected combinator");
			}
			combinators[token.value] = true;
		} else if (prevToken !== null && prevToken.type !== "Combinator") {
			combinators[" "] = true;
			terms.push({
				type: "Combinator",
				value: " "
			});
		}
		terms.push(token);
		prevToken = token;
		prevTokenPos = scanner.pos;
		prevTokenIsFunction = token.type === "Function";
	}
	if (prevToken !== null && prevToken.type === "Combinator") {
		scanner.pos -= prevTokenPos;
		scanner.error("Unexpected combinator");
	}
	return {
		type: "Group",
		terms,
		combinator: regroupTerms(terms, combinators) || " ",
		disallowEmpty: false,
		explicit: false
	};
}
function readGroup(scanner) {
	let result;
	scanner.eat(LEFTSQUAREBRACKET);
	result = readImplicitGroup(scanner, RIGHTSQUAREBRACKET);
	scanner.eat(RIGHTSQUAREBRACKET);
	result.explicit = true;
	if (scanner.charCode() === EXCLAMATIONMARK$2) {
		scanner.pos++;
		result.disallowEmpty = true;
	}
	return result;
}
function peek(scanner) {
	let code = scanner.charCode();
	switch (code) {
		case RIGHTSQUAREBRACKET: break;
		case LEFTSQUAREBRACKET: return maybeMultiplied(scanner, readGroup(scanner));
		case LESSTHANSIGN$1: return scanner.nextCharCode() === APOSTROPHE$2 ? readProperty$1(scanner) : readType(scanner);
		case VERTICALLINE$3: return {
			type: "Combinator",
			value: scanner.substringToPos(scanner.pos + (scanner.nextCharCode() === VERTICALLINE$3 ? 2 : 1))
		};
		case AMPERSAND$5:
			scanner.pos++;
			scanner.eat(AMPERSAND$5);
			return {
				type: "Combinator",
				value: "&&"
			};
		case COMMA:
			scanner.pos++;
			return { type: "Comma" };
		case APOSTROPHE$2: return maybeMultiplied(scanner, {
			type: "String",
			value: scanner.scanString()
		});
		case SPACE$2:
		case TAB:
		case N$1:
		case R:
		case F: return {
			type: "Spaces",
			value: scanner.scanSpaces()
		};
		case COMMERCIALAT:
			code = scanner.nextCharCode();
			if (scanner.isNameCharCode(code)) {
				scanner.pos++;
				return {
					type: "AtKeyword",
					name: scanner.scanWord()
				};
			}
			return maybeToken(scanner);
		case ASTERISK$6:
		case PLUSSIGN$6:
		case QUESTIONMARK$1:
		case NUMBERSIGN$3:
		case EXCLAMATIONMARK$2: break;
		case LEFTCURLYBRACKET:
			code = scanner.nextCharCode();
			if (code < 48 || code > 57) return maybeToken(scanner);
			break;
		default:
			if (scanner.isNameCharCode(code)) return readKeywordOrFunction(scanner);
			return maybeToken(scanner);
	}
}
function parse$50(source) {
	const scanner = new Scanner(source);
	const result = readImplicitGroup(scanner);
	if (scanner.pos !== source.length) scanner.error("Unexpected input");
	if (result.terms.length === 1 && result.terms[0].type === "Group") return result.terms[0];
	return result;
}
var TAB, N$1, F, R, SPACE$2, EXCLAMATIONMARK$2, NUMBERSIGN$3, AMPERSAND$5, APOSTROPHE$2, LEFTPARENTHESIS$2, RIGHTPARENTHESIS$2, ASTERISK$6, PLUSSIGN$6, COMMA, HYPERMINUS, LESSTHANSIGN$1, GREATERTHANSIGN$3, QUESTIONMARK$1, COMMERCIALAT, LEFTSQUAREBRACKET, RIGHTSQUAREBRACKET, LEFTCURLYBRACKET, VERTICALLINE$3, RIGHTCURLYBRACKET, INFINITY, COMBINATOR_PRECEDENCE;
var init_parse = __esmMin((() => {
	init_scanner();
	TAB = 9;
	N$1 = 10;
	F = 12;
	R = 13;
	SPACE$2 = 32;
	EXCLAMATIONMARK$2 = 33;
	NUMBERSIGN$3 = 35;
	AMPERSAND$5 = 38;
	APOSTROPHE$2 = 39;
	LEFTPARENTHESIS$2 = 40;
	RIGHTPARENTHESIS$2 = 41;
	ASTERISK$6 = 42;
	PLUSSIGN$6 = 43;
	COMMA = 44;
	HYPERMINUS = 45;
	LESSTHANSIGN$1 = 60;
	GREATERTHANSIGN$3 = 62;
	QUESTIONMARK$1 = 63;
	COMMERCIALAT = 64;
	LEFTSQUAREBRACKET = 91;
	RIGHTSQUAREBRACKET = 93;
	LEFTCURLYBRACKET = 123;
	VERTICALLINE$3 = 124;
	RIGHTCURLYBRACKET = 125;
	INFINITY = 8734;
	COMBINATOR_PRECEDENCE = {
		" ": 1,
		"&&": 2,
		"||": 3,
		"|": 4
	};
}));
//#endregion
//#region node_modules/css-tree/lib/definition-syntax/walk.js
function ensureFunction(value) {
	return typeof value === "function" ? value : noop;
}
function walk$1(node, options, context) {
	function walk(node) {
		enter.call(context, node);
		switch (node.type) {
			case "Group":
				node.terms.forEach(walk);
				break;
			case "Multiplier":
			case "Boolean":
				walk(node.term);
				break;
			case "Type":
			case "Property":
			case "Keyword":
			case "AtKeyword":
			case "Function":
			case "String":
			case "Token":
			case "Comma": break;
			default: throw new Error("Unknown type: " + node.type);
		}
		leave.call(context, node);
	}
	let enter = noop;
	let leave = noop;
	if (typeof options === "function") enter = options;
	else if (options) {
		enter = ensureFunction(options.enter);
		leave = ensureFunction(options.leave);
	}
	if (enter === noop && leave === noop) throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function");
	walk(node, context);
}
var noop;
var init_walk = __esmMin((() => {
	noop = function() {};
}));
//#endregion
//#region node_modules/css-tree/lib/definition-syntax/index.js
var init_definition_syntax = __esmMin((() => {
	init_SyntaxError();
	init_generate();
	init_parse();
	init_walk();
}));
//#endregion
//#region node_modules/css-tree/lib/lexer/prepare-tokens.js
function stringToTokens(str) {
	const tokens = [];
	tokenize$1(str, (type, start, end) => tokens.push({
		type,
		value: str.slice(start, end),
		node: null
	}));
	return tokens;
}
function prepare_tokens_default(value, syntax) {
	if (typeof value === "string") return stringToTokens(value);
	return syntax.generate(value, astToTokens);
}
var astToTokens;
var init_prepare_tokens = __esmMin((() => {
	init_tokenizer();
	astToTokens = { decorator(handlers) {
		const tokens = [];
		let curNode = null;
		return {
			...handlers,
			node(node) {
				const tmp = curNode;
				curNode = node;
				handlers.node.call(this, node);
				curNode = tmp;
			},
			emit(value, type, auto) {
				tokens.push({
					type,
					value,
					node: auto ? null : curNode
				});
			},
			result() {
				return tokens;
			}
		};
	} };
}));
//#endregion
//#region node_modules/css-tree/lib/lexer/match-graph.js
function createCondition(match, thenBranch, elseBranch) {
	if (thenBranch === MATCH && elseBranch === MISMATCH) return match;
	if (match === MATCH && thenBranch === MATCH && elseBranch === MATCH) return match;
	if (match.type === "If" && match.else === MISMATCH && thenBranch === MATCH) {
		thenBranch = match.then;
		match = match.match;
	}
	return {
		type: "If",
		match,
		then: thenBranch,
		else: elseBranch
	};
}
function isFunctionType(name) {
	return name.length > 2 && name.charCodeAt(name.length - 2) === LEFTPARENTHESIS$1 && name.charCodeAt(name.length - 1) === RIGHTPARENTHESIS$1;
}
function isEnumCapatible(term) {
	return term.type === "Keyword" || term.type === "AtKeyword" || term.type === "Function" || term.type === "Type" && isFunctionType(term.name);
}
function groupNode(terms, combinator = " ", explicit = false) {
	return {
		type: "Group",
		terms,
		combinator,
		disallowEmpty: false,
		explicit
	};
}
function replaceTypeInGraph(node, replacements, visited = /* @__PURE__ */ new Set()) {
	if (!visited.has(node)) {
		visited.add(node);
		switch (node.type) {
			case "If":
				node.match = replaceTypeInGraph(node.match, replacements, visited);
				node.then = replaceTypeInGraph(node.then, replacements, visited);
				node.else = replaceTypeInGraph(node.else, replacements, visited);
				break;
			case "Type": return replacements[node.name] || node;
		}
	}
	return node;
}
function buildGroupMatchGraph(combinator, terms, atLeastOneTermMatched) {
	switch (combinator) {
		case " ": {
			let result = MATCH;
			for (let i = terms.length - 1; i >= 0; i--) {
				const term = terms[i];
				result = createCondition(term, result, MISMATCH);
			}
			return result;
		}
		case "|": {
			let result = MISMATCH;
			let map = null;
			for (let i = terms.length - 1; i >= 0; i--) {
				let term = terms[i];
				if (isEnumCapatible(term)) {
					if (map === null && i > 0 && isEnumCapatible(terms[i - 1])) {
						map = Object.create(null);
						result = createCondition({
							type: "Enum",
							map
						}, MATCH, result);
					}
					if (map !== null) {
						const key = (isFunctionType(term.name) ? term.name.slice(0, -1) : term.name).toLowerCase();
						if (key in map === false) {
							map[key] = term;
							continue;
						}
					}
				}
				map = null;
				result = createCondition(term, MATCH, result);
			}
			return result;
		}
		case "&&": {
			if (terms.length > 5) return {
				type: "MatchOnce",
				terms,
				all: true
			};
			let result = MISMATCH;
			for (let i = terms.length - 1; i >= 0; i--) {
				const term = terms[i];
				let thenClause;
				if (terms.length > 1) thenClause = buildGroupMatchGraph(combinator, terms.filter(function(newGroupTerm) {
					return newGroupTerm !== term;
				}), false);
				else thenClause = MATCH;
				result = createCondition(term, thenClause, result);
			}
			return result;
		}
		case "||": {
			if (terms.length > 5) return {
				type: "MatchOnce",
				terms,
				all: false
			};
			let result = atLeastOneTermMatched ? MATCH : MISMATCH;
			for (let i = terms.length - 1; i >= 0; i--) {
				const term = terms[i];
				let thenClause;
				if (terms.length > 1) thenClause = buildGroupMatchGraph(combinator, terms.filter(function(newGroupTerm) {
					return newGroupTerm !== term;
				}), true);
				else thenClause = MATCH;
				result = createCondition(term, thenClause, result);
			}
			return result;
		}
	}
}
function buildMultiplierMatchGraph(node) {
	let result = MATCH;
	let matchTerm = buildMatchGraphInternal(node.term);
	if (node.max === 0) {
		matchTerm = createCondition(matchTerm, DISALLOW_EMPTY, MISMATCH);
		result = createCondition(matchTerm, null, MISMATCH);
		result.then = createCondition(MATCH, MATCH, result);
		if (node.comma) result.then.else = createCondition({
			type: "Comma",
			syntax: node
		}, result, MISMATCH);
	} else for (let i = node.min || 1; i <= node.max; i++) {
		if (node.comma && result !== MATCH) result = createCondition({
			type: "Comma",
			syntax: node
		}, result, MISMATCH);
		result = createCondition(matchTerm, createCondition(MATCH, MATCH, result), MISMATCH);
	}
	if (node.min === 0) result = createCondition(MATCH, MATCH, result);
	else for (let i = 0; i < node.min - 1; i++) {
		if (node.comma && result !== MATCH) result = createCondition({
			type: "Comma",
			syntax: node
		}, result, MISMATCH);
		result = createCondition(matchTerm, result, MISMATCH);
	}
	return result;
}
function buildMatchGraphInternal(node) {
	if (typeof node === "function") return {
		type: "Generic",
		fn: node
	};
	switch (node.type) {
		case "Group": {
			let result = buildGroupMatchGraph(node.combinator, node.terms.map(buildMatchGraphInternal), false);
			if (node.disallowEmpty) result = createCondition(result, DISALLOW_EMPTY, MISMATCH);
			return result;
		}
		case "Multiplier": return buildMultiplierMatchGraph(node);
		case "Boolean": {
			const term = buildMatchGraphInternal(node.term);
			const matchNode = buildMatchGraphInternal(groupNode([groupNode([{
				type: "Keyword",
				name: "not"
			}, {
				type: "Type",
				name: "!boolean-group"
			}]), groupNode([{
				type: "Type",
				name: "!boolean-group"
			}, groupNode([{
				type: "Multiplier",
				comma: false,
				min: 0,
				max: 0,
				term: groupNode([{
					type: "Keyword",
					name: "and"
				}, {
					type: "Type",
					name: "!boolean-group"
				}])
			}, {
				type: "Multiplier",
				comma: false,
				min: 0,
				max: 0,
				term: groupNode([{
					type: "Keyword",
					name: "or"
				}, {
					type: "Type",
					name: "!boolean-group"
				}])
			}], "|")])], "|"));
			const booleanGroup = buildMatchGraphInternal(groupNode([
				{
					type: "Type",
					name: "!term"
				},
				groupNode([
					{
						type: "Token",
						value: "("
					},
					{
						type: "Type",
						name: "!self"
					},
					{
						type: "Token",
						value: ")"
					}
				]),
				{
					type: "Type",
					name: "general-enclosed"
				}
			], "|"));
			replaceTypeInGraph(booleanGroup, {
				"!term": term,
				"!self": matchNode
			});
			replaceTypeInGraph(matchNode, { "!boolean-group": booleanGroup });
			return matchNode;
		}
		case "Type":
		case "Property": return {
			type: node.type,
			name: node.name,
			syntax: node
		};
		case "Keyword": return {
			type: node.type,
			name: node.name.toLowerCase(),
			syntax: node
		};
		case "AtKeyword": return {
			type: node.type,
			name: "@" + node.name.toLowerCase(),
			syntax: node
		};
		case "Function": return {
			type: node.type,
			name: node.name.toLowerCase() + "(",
			syntax: node
		};
		case "String":
			if (node.value.length === 3) return {
				type: "Token",
				value: node.value.charAt(1),
				syntax: node
			};
			return {
				type: node.type,
				value: node.value.substr(1, node.value.length - 2).replace(/\\'/g, "'"),
				syntax: node
			};
		case "Token": return {
			type: node.type,
			value: node.value,
			syntax: node
		};
		case "Comma": return {
			type: node.type,
			syntax: node
		};
		default: throw new Error("Unknown node type:", node.type);
	}
}
function buildMatchGraph(syntaxTree, ref) {
	if (typeof syntaxTree === "string") syntaxTree = parse$50(syntaxTree);
	return {
		type: "MatchGraph",
		match: buildMatchGraphInternal(syntaxTree),
		syntax: ref || null,
		source: syntaxTree
	};
}
var MATCH, MISMATCH, DISALLOW_EMPTY, LEFTPARENTHESIS$1, RIGHTPARENTHESIS$1;
var init_match_graph = __esmMin((() => {
	init_parse();
	MATCH = { type: "Match" };
	MISMATCH = { type: "Mismatch" };
	DISALLOW_EMPTY = { type: "DisallowEmpty" };
	LEFTPARENTHESIS$1 = 40;
	RIGHTPARENTHESIS$1 = 41;
}));
//#endregion
//#region node_modules/css-tree/lib/lexer/match.js
function reverseList(list) {
	let prev = null;
	let next = null;
	let item = list;
	while (item !== null) {
		next = item.prev;
		item.prev = prev;
		prev = item;
		item = next;
	}
	return prev;
}
function areStringsEqualCaseInsensitive(testStr, referenceStr) {
	if (testStr.length !== referenceStr.length) return false;
	for (let i = 0; i < testStr.length; i++) {
		const referenceCode = referenceStr.charCodeAt(i);
		let testCode = testStr.charCodeAt(i);
		if (testCode >= 65 && testCode <= 90) testCode = testCode | 32;
		if (testCode !== referenceCode) return false;
	}
	return true;
}
function isContextEdgeDelim(token) {
	if (token.type !== 9) return false;
	return token.value !== "?";
}
function isCommaContextStart(token) {
	if (token === null) return true;
	return token.type === 18 || token.type === 2 || token.type === 21 || token.type === 19 || token.type === 23 || isContextEdgeDelim(token);
}
function isCommaContextEnd(token) {
	if (token === null) return true;
	return token.type === 22 || token.type === 20 || token.type === 24 || token.type === 9 && token.value === "/";
}
function internalMatch(tokens, state, syntaxes) {
	function moveToNextToken() {
		do {
			tokenIndex++;
			token = tokenIndex < tokens.length ? tokens[tokenIndex] : null;
		} while (token !== null && (token.type === 13 || token.type === 25));
	}
	function getNextToken(offset) {
		const nextIndex = tokenIndex + offset;
		return nextIndex < tokens.length ? tokens[nextIndex] : null;
	}
	function stateSnapshotFromSyntax(nextState, prev) {
		return {
			nextState,
			matchStack,
			syntaxStack,
			thenStack,
			tokenIndex,
			prev
		};
	}
	function pushThenStack(nextState) {
		thenStack = {
			nextState,
			matchStack,
			syntaxStack,
			prev: thenStack
		};
	}
	function pushElseStack(nextState) {
		elseStack = stateSnapshotFromSyntax(nextState, elseStack);
	}
	function addTokenToMatch() {
		matchStack = {
			type: TOKEN,
			syntax: state.syntax,
			token,
			prev: matchStack
		};
		moveToNextToken();
		syntaxStash = null;
		if (tokenIndex > longestMatch) longestMatch = tokenIndex;
	}
	function openSyntax() {
		syntaxStack = {
			syntax: state.syntax,
			opts: state.syntax.opts || syntaxStack !== null && syntaxStack.opts || null,
			prev: syntaxStack
		};
		matchStack = {
			type: OPEN_SYNTAX,
			syntax: state.syntax,
			token: matchStack.token,
			prev: matchStack
		};
	}
	function closeSyntax() {
		if (matchStack.type === OPEN_SYNTAX) matchStack = matchStack.prev;
		else matchStack = {
			type: CLOSE_SYNTAX,
			syntax: syntaxStack.syntax,
			token: matchStack.token,
			prev: matchStack
		};
		syntaxStack = syntaxStack.prev;
	}
	let syntaxStack = null;
	let thenStack = null;
	let elseStack = null;
	let syntaxStash = null;
	let iterationCount = 0;
	let exitReason = null;
	let token = null;
	let tokenIndex = -1;
	let longestMatch = 0;
	let matchStack = {
		type: STUB,
		syntax: null,
		token: null,
		prev: null
	};
	moveToNextToken();
	while (exitReason === null && ++iterationCount < ITERATION_LIMIT) switch (state.type) {
		case "Match":
			if (thenStack === null) {
				if (token !== null) {
					if (tokenIndex !== tokens.length - 1 || token.value !== "\\0" && token.value !== "\\9") {
						state = MISMATCH;
						break;
					}
				}
				exitReason = EXIT_REASON_MATCH;
				break;
			}
			state = thenStack.nextState;
			if (state === DISALLOW_EMPTY) if (thenStack.matchStack === matchStack) {
				state = MISMATCH;
				break;
			} else state = MATCH;
			while (thenStack.syntaxStack !== syntaxStack) closeSyntax();
			thenStack = thenStack.prev;
			break;
		case "Mismatch":
			if (syntaxStash !== null && syntaxStash !== false) {
				if (elseStack === null || tokenIndex > elseStack.tokenIndex) {
					elseStack = syntaxStash;
					syntaxStash = false;
				}
			} else if (elseStack === null) {
				exitReason = EXIT_REASON_MISMATCH;
				break;
			}
			state = elseStack.nextState;
			thenStack = elseStack.thenStack;
			syntaxStack = elseStack.syntaxStack;
			matchStack = elseStack.matchStack;
			tokenIndex = elseStack.tokenIndex;
			token = tokenIndex < tokens.length ? tokens[tokenIndex] : null;
			elseStack = elseStack.prev;
			break;
		case "MatchGraph":
			state = state.match;
			break;
		case "If":
			if (state.else !== MISMATCH) pushElseStack(state.else);
			if (state.then !== MATCH) pushThenStack(state.then);
			state = state.match;
			break;
		case "MatchOnce":
			state = {
				type: "MatchOnceBuffer",
				syntax: state,
				index: 0,
				mask: 0
			};
			break;
		case "MatchOnceBuffer": {
			const terms = state.syntax.terms;
			if (state.index === terms.length) {
				if (state.mask === 0 || state.syntax.all) {
					state = MISMATCH;
					break;
				}
				state = MATCH;
				break;
			}
			if (state.mask === (1 << terms.length) - 1) {
				state = MATCH;
				break;
			}
			for (; state.index < terms.length; state.index++) {
				const matchFlag = 1 << state.index;
				if ((state.mask & matchFlag) === 0) {
					pushElseStack(state);
					pushThenStack({
						type: "AddMatchOnce",
						syntax: state.syntax,
						mask: state.mask | matchFlag
					});
					state = terms[state.index++];
					break;
				}
			}
			break;
		}
		case "AddMatchOnce":
			state = {
				type: "MatchOnceBuffer",
				syntax: state.syntax,
				index: 0,
				mask: state.mask
			};
			break;
		case "Enum":
			if (token !== null) {
				let name = token.value.toLowerCase();
				if (name.indexOf("\\") !== -1) name = name.replace(/\\[09].*$/, "");
				if (hasOwnProperty$2.call(state.map, name)) {
					state = state.map[name];
					break;
				}
			}
			state = MISMATCH;
			break;
		case "Generic": {
			const opts = syntaxStack !== null ? syntaxStack.opts : null;
			const lastTokenIndex = tokenIndex + Math.floor(state.fn(token, getNextToken, opts));
			if (!isNaN(lastTokenIndex) && lastTokenIndex > tokenIndex) {
				while (tokenIndex < lastTokenIndex) addTokenToMatch();
				state = MATCH;
			} else state = MISMATCH;
			break;
		}
		case "Type":
		case "Property": {
			const syntaxDict = state.type === "Type" ? "types" : "properties";
			const dictSyntax = hasOwnProperty$2.call(syntaxes, syntaxDict) ? syntaxes[syntaxDict][state.name] : null;
			if (!dictSyntax || !dictSyntax.match) throw new Error("Bad syntax reference: " + (state.type === "Type" ? "<" + state.name + ">" : "<'" + state.name + "'>"));
			if (syntaxStash !== false && token !== null && state.type === "Type") {
				if (state.name === "custom-ident" && token.type === 1 || state.name === "length" && token.value === "0") {
					if (syntaxStash === null) syntaxStash = stateSnapshotFromSyntax(state, elseStack);
					state = MISMATCH;
					break;
				}
			}
			openSyntax();
			state = dictSyntax.matchRef || dictSyntax.match;
			break;
		}
		case "Keyword": {
			const name = state.name;
			if (token !== null) {
				let keywordName = token.value;
				if (keywordName.indexOf("\\") !== -1) keywordName = keywordName.replace(/\\[09].*$/, "");
				if (areStringsEqualCaseInsensitive(keywordName, name)) {
					addTokenToMatch();
					state = MATCH;
					break;
				}
			}
			state = MISMATCH;
			break;
		}
		case "AtKeyword":
		case "Function":
			if (token !== null && areStringsEqualCaseInsensitive(token.value, state.name)) {
				addTokenToMatch();
				state = MATCH;
				break;
			}
			state = MISMATCH;
			break;
		case "Token":
			if (token !== null && token.value === state.value) {
				addTokenToMatch();
				state = MATCH;
				break;
			}
			state = MISMATCH;
			break;
		case "Comma":
			if (token !== null && token.type === 18) if (isCommaContextStart(matchStack.token)) state = MISMATCH;
			else {
				addTokenToMatch();
				state = isCommaContextEnd(token) ? MISMATCH : MATCH;
			}
			else state = isCommaContextStart(matchStack.token) || isCommaContextEnd(token) ? MATCH : MISMATCH;
			break;
		case "String":
			let string = "";
			let lastTokenIndex = tokenIndex;
			for (; lastTokenIndex < tokens.length && string.length < state.value.length; lastTokenIndex++) string += tokens[lastTokenIndex].value;
			if (areStringsEqualCaseInsensitive(string, state.value)) {
				while (tokenIndex < lastTokenIndex) addTokenToMatch();
				state = MATCH;
			} else state = MISMATCH;
			break;
		default: throw new Error("Unknown node type: " + state.type);
	}
	totalIterationCount += iterationCount;
	switch (exitReason) {
		case null:
			console.warn("[csstree-match] BREAK after " + ITERATION_LIMIT + " iterations");
			exitReason = EXIT_REASON_ITERATION_LIMIT;
			matchStack = null;
			break;
		case EXIT_REASON_MATCH:
			while (syntaxStack !== null) closeSyntax();
			break;
		default: matchStack = null;
	}
	return {
		tokens,
		reason: exitReason,
		iterations: iterationCount,
		match: matchStack,
		longestMatch
	};
}
function matchAsTree(tokens, matchGraph, syntaxes) {
	const matchResult = internalMatch(tokens, matchGraph, syntaxes || {});
	if (matchResult.match === null) return matchResult;
	let item = matchResult.match;
	let host = matchResult.match = {
		syntax: matchGraph.syntax || null,
		match: []
	};
	const hostStack = [host];
	item = reverseList(item).prev;
	while (item !== null) {
		switch (item.type) {
			case OPEN_SYNTAX:
				host.match.push(host = {
					syntax: item.syntax,
					match: []
				});
				hostStack.push(host);
				break;
			case CLOSE_SYNTAX:
				hostStack.pop();
				host = hostStack[hostStack.length - 1];
				break;
			default: host.match.push({
				syntax: item.syntax || null,
				token: item.token.value,
				node: item.token.node
			});
		}
		item = item.prev;
	}
	return matchResult;
}
var hasOwnProperty$2, STUB, TOKEN, OPEN_SYNTAX, CLOSE_SYNTAX, EXIT_REASON_MATCH, EXIT_REASON_MISMATCH, EXIT_REASON_ITERATION_LIMIT, ITERATION_LIMIT, totalIterationCount;
var init_match = __esmMin((() => {
	init_match_graph();
	init_types();
	({hasOwnProperty: hasOwnProperty$2} = Object.prototype);
	STUB = 0;
	TOKEN = 1;
	OPEN_SYNTAX = 2;
	CLOSE_SYNTAX = 3;
	EXIT_REASON_MATCH = "Match";
	EXIT_REASON_MISMATCH = "Mismatch";
	EXIT_REASON_ITERATION_LIMIT = "Maximum iteration number exceeded (please fill an issue on https://github.com/csstree/csstree/issues)";
	ITERATION_LIMIT = 15e3;
	totalIterationCount = 0;
}));
//#endregion
//#region node_modules/css-tree/lib/lexer/trace.js
var trace_exports = /* @__PURE__ */ __exportAll({
	getTrace: () => getTrace,
	isKeyword: () => isKeyword,
	isProperty: () => isProperty,
	isType: () => isType
});
function getTrace(node) {
	function shouldPutToTrace(syntax) {
		if (syntax === null) return false;
		return syntax.type === "Type" || syntax.type === "Property" || syntax.type === "Keyword";
	}
	function hasMatch(matchNode) {
		if (Array.isArray(matchNode.match)) {
			for (let i = 0; i < matchNode.match.length; i++) if (hasMatch(matchNode.match[i])) {
				if (shouldPutToTrace(matchNode.syntax)) result.unshift(matchNode.syntax);
				return true;
			}
		} else if (matchNode.node === node) {
			result = shouldPutToTrace(matchNode.syntax) ? [matchNode.syntax] : [];
			return true;
		}
		return false;
	}
	let result = null;
	if (this.matched !== null) hasMatch(this.matched);
	return result;
}
function isType(node, type) {
	return testNode(this, node, (match) => match.type === "Type" && match.name === type);
}
function isProperty(node, property) {
	return testNode(this, node, (match) => match.type === "Property" && match.name === property);
}
function isKeyword(node) {
	return testNode(this, node, (match) => match.type === "Keyword");
}
function testNode(match, node, fn) {
	const trace = getTrace.call(match, node);
	if (trace === null) return false;
	return trace.some(fn);
}
var init_trace = __esmMin((() => {}));
//#endregion
//#region node_modules/css-tree/lib/lexer/search.js
function getFirstMatchNode(matchNode) {
	if ("node" in matchNode) return matchNode.node;
	return getFirstMatchNode(matchNode.match[0]);
}
function getLastMatchNode(matchNode) {
	if ("node" in matchNode) return matchNode.node;
	return getLastMatchNode(matchNode.match[matchNode.match.length - 1]);
}
function matchFragments(lexer, ast, match, type, name) {
	function findFragments(matchNode) {
		if (matchNode.syntax !== null && matchNode.syntax.type === type && matchNode.syntax.name === name) {
			const start = getFirstMatchNode(matchNode);
			const end = getLastMatchNode(matchNode);
			lexer.syntax.walk(ast, function(node, item, list) {
				if (node === start) {
					const nodes = new List();
					do {
						nodes.appendData(item.data);
						if (item.data === end) break;
						item = item.next;
					} while (item !== null);
					fragments.push({
						parent: list,
						nodes
					});
				}
			});
		}
		if (Array.isArray(matchNode.match)) matchNode.match.forEach(findFragments);
	}
	const fragments = [];
	if (match.matched !== null) findFragments(match.matched);
	return fragments;
}
var init_search = __esmMin((() => {
	init_List();
}));
//#endregion
//#region node_modules/css-tree/lib/lexer/structure.js
function isValidNumber(value) {
	return typeof value === "number" && isFinite(value) && Math.floor(value) === value && value >= 0;
}
function isValidLocation(loc) {
	return Boolean(loc) && isValidNumber(loc.offset) && isValidNumber(loc.line) && isValidNumber(loc.column);
}
function createNodeStructureChecker(type, fields) {
	return function checkNode(node, warn) {
		if (!node || node.constructor !== Object) return warn(node, "Type of node should be an Object");
		for (let key in node) {
			let valid = true;
			if (hasOwnProperty$1.call(node, key) === false) continue;
			if (key === "type") {
				if (node.type !== type) warn(node, "Wrong node type `" + node.type + "`, expected `" + type + "`");
			} else if (key === "loc") {
				if (node.loc === null) continue;
				else if (node.loc && node.loc.constructor === Object) if (typeof node.loc.source !== "string") key += ".source";
				else if (!isValidLocation(node.loc.start)) key += ".start";
				else if (!isValidLocation(node.loc.end)) key += ".end";
				else continue;
				valid = false;
			} else if (fields.hasOwnProperty(key)) {
				valid = false;
				for (let i = 0; !valid && i < fields[key].length; i++) {
					const fieldType = fields[key][i];
					switch (fieldType) {
						case String:
							valid = typeof node[key] === "string";
							break;
						case Boolean:
							valid = typeof node[key] === "boolean";
							break;
						case null:
							valid = node[key] === null;
							break;
						default: if (typeof fieldType === "string") valid = node[key] && node[key].type === fieldType;
						else if (Array.isArray(fieldType)) valid = node[key] instanceof List;
					}
				}
			} else warn(node, "Unknown field `" + key + "` for " + type + " node type");
			if (!valid) warn(node, "Bad value for `" + type + "." + key + "`");
		}
		for (const key in fields) if (hasOwnProperty$1.call(fields, key) && hasOwnProperty$1.call(node, key) === false) warn(node, "Field `" + type + "." + key + "` is missed");
	};
}
function genTypesList(fieldTypes, path) {
	const docsTypes = [];
	for (let i = 0; i < fieldTypes.length; i++) {
		const fieldType = fieldTypes[i];
		if (fieldType === String || fieldType === Boolean) docsTypes.push(fieldType.name.toLowerCase());
		else if (fieldType === null) docsTypes.push("null");
		else if (typeof fieldType === "string") docsTypes.push(fieldType);
		else if (Array.isArray(fieldType)) docsTypes.push("List<" + (genTypesList(fieldType, path) || "any") + ">");
		else throw new Error("Wrong value `" + fieldType + "` in `" + path + "` structure definition");
	}
	return docsTypes.join(" | ");
}
function processStructure(name, nodeType) {
	const structure = nodeType.structure;
	const fields = {
		type: String,
		loc: true
	};
	const docs = { type: "\"" + name + "\"" };
	for (const key in structure) {
		if (hasOwnProperty$1.call(structure, key) === false) continue;
		docs[key] = genTypesList(fields[key] = Array.isArray(structure[key]) ? structure[key].slice() : [structure[key]], name + "." + key);
	}
	return {
		docs,
		check: createNodeStructureChecker(name, fields)
	};
}
function getStructureFromConfig(config) {
	const structure = {};
	if (config.node) {
		for (const name in config.node) if (hasOwnProperty$1.call(config.node, name)) {
			const nodeType = config.node[name];
			if (nodeType.structure) structure[name] = processStructure(name, nodeType);
			else throw new Error("Missed `structure` field in `" + name + "` node type definition");
		}
	}
	return structure;
}
var hasOwnProperty$1;
var init_structure = __esmMin((() => {
	init_List();
	({hasOwnProperty: hasOwnProperty$1} = Object.prototype);
}));
//#endregion
//#region node_modules/css-tree/lib/lexer/Lexer.js
function dumpMapSyntax(map, compact, syntaxAsAst) {
	const result = {};
	for (const name in map) if (map[name].syntax) result[name] = syntaxAsAst ? map[name].syntax : generate$50(map[name].syntax, { compact });
	return result;
}
function dumpAtruleMapSyntax(map, compact, syntaxAsAst) {
	const result = {};
	for (const [name, atrule] of Object.entries(map)) result[name] = {
		prelude: atrule.prelude && (syntaxAsAst ? atrule.prelude.syntax : generate$50(atrule.prelude.syntax, { compact })),
		descriptors: atrule.descriptors && dumpMapSyntax(atrule.descriptors, compact, syntaxAsAst)
	};
	return result;
}
function valueHasVar(tokens) {
	for (let i = 0; i < tokens.length; i++) if (tokens[i].value.toLowerCase() === "var(") return true;
	return false;
}
function syntaxHasTopLevelCommaMultiplier(syntax) {
	const singleTerm = syntax.terms[0];
	return syntax.explicit === false && syntax.terms.length === 1 && singleTerm.type === "Multiplier" && singleTerm.comma === true;
}
function buildMatchResult(matched, error, iterations) {
	return {
		matched,
		iterations,
		error,
		...trace_exports
	};
}
function matchSyntax(lexer, syntax, value, useCssWideKeywords) {
	const tokens = prepare_tokens_default(value, lexer.syntax);
	let result;
	if (valueHasVar(tokens)) return buildMatchResult(null, /* @__PURE__ */ new Error("Matching for a tree with var() is not supported"));
	if (useCssWideKeywords) result = matchAsTree(tokens, lexer.cssWideKeywordsSyntax, lexer);
	if (!useCssWideKeywords || !result.match) {
		result = matchAsTree(tokens, syntax.match, lexer);
		if (!result.match) return buildMatchResult(null, new SyntaxMatchError(result.reason, syntax.syntax, value, result), result.iterations);
	}
	return buildMatchResult(result.match, null, result.iterations);
}
var Lexer;
var init_Lexer = __esmMin((() => {
	init_error();
	init_names();
	init_generic_const();
	init_generic();
	init_units();
	init_definition_syntax();
	init_prepare_tokens();
	init_match_graph();
	init_match();
	init_trace();
	init_search();
	init_structure();
	Lexer = class {
		constructor(config, syntax, structure) {
			this.cssWideKeywords = cssWideKeywords;
			this.syntax = syntax;
			this.generic = false;
			this.units = { ...units_exports };
			this.atrules = Object.create(null);
			this.properties = Object.create(null);
			this.types = Object.create(null);
			this.structure = structure || getStructureFromConfig(config);
			if (config) {
				if (config.cssWideKeywords) this.cssWideKeywords = config.cssWideKeywords;
				if (config.units) {
					for (const group of Object.keys(units_exports)) if (Array.isArray(config.units[group])) this.units[group] = config.units[group];
				}
				if (config.types) for (const [name, type] of Object.entries(config.types)) this.addType_(name, type);
				if (config.generic) {
					this.generic = true;
					for (const [name, value] of Object.entries(createGenericTypes(this.units))) this.addType_(name, value);
				}
				if (config.atrules) for (const [name, atrule] of Object.entries(config.atrules)) this.addAtrule_(name, atrule);
				if (config.properties) for (const [name, property] of Object.entries(config.properties)) this.addProperty_(name, property);
			}
			this.cssWideKeywordsSyntax = buildMatchGraph(this.cssWideKeywords.join(" |  "));
		}
		checkStructure(ast) {
			function collectWarning(node, message) {
				warns.push({
					node,
					message
				});
			}
			const structure = this.structure;
			const warns = [];
			this.syntax.walk(ast, function(node) {
				if (structure.hasOwnProperty(node.type)) structure[node.type].check(node, collectWarning);
				else collectWarning(node, "Unknown node type `" + node.type + "`");
			});
			return warns.length ? warns : false;
		}
		createDescriptor(syntax, type, name, parent = null) {
			const ref = {
				type,
				name
			};
			const descriptor = {
				type,
				name,
				parent,
				serializable: typeof syntax === "string" || syntax && typeof syntax.type === "string",
				syntax: null,
				match: null,
				matchRef: null
			};
			if (typeof syntax === "function") descriptor.match = buildMatchGraph(syntax, ref);
			else {
				if (typeof syntax === "string") Object.defineProperty(descriptor, "syntax", { get() {
					Object.defineProperty(descriptor, "syntax", { value: parse$50(syntax) });
					return descriptor.syntax;
				} });
				else descriptor.syntax = syntax;
				Object.defineProperty(descriptor, "match", { get() {
					Object.defineProperty(descriptor, "match", { value: buildMatchGraph(descriptor.syntax, ref) });
					return descriptor.match;
				} });
				if (type === "Property") Object.defineProperty(descriptor, "matchRef", { get() {
					const syntax = descriptor.syntax;
					const value = syntaxHasTopLevelCommaMultiplier(syntax) ? buildMatchGraph({
						...syntax,
						terms: [syntax.terms[0].term]
					}, ref) : null;
					Object.defineProperty(descriptor, "matchRef", { value });
					return value;
				} });
			}
			return descriptor;
		}
		addAtrule_(name, syntax) {
			if (!syntax) return;
			this.atrules[name] = {
				type: "Atrule",
				name,
				prelude: syntax.prelude ? this.createDescriptor(syntax.prelude, "AtrulePrelude", name) : null,
				descriptors: syntax.descriptors ? Object.keys(syntax.descriptors).reduce((map, descName) => {
					map[descName] = this.createDescriptor(syntax.descriptors[descName], "AtruleDescriptor", descName, name);
					return map;
				}, Object.create(null)) : null
			};
		}
		addProperty_(name, syntax) {
			if (!syntax) return;
			this.properties[name] = this.createDescriptor(syntax, "Property", name);
		}
		addType_(name, syntax) {
			if (!syntax) return;
			this.types[name] = this.createDescriptor(syntax, "Type", name);
		}
		checkAtruleName(atruleName) {
			if (!this.getAtrule(atruleName)) return new SyntaxReferenceError("Unknown at-rule", "@" + atruleName);
		}
		checkAtrulePrelude(atruleName, prelude) {
			const error = this.checkAtruleName(atruleName);
			if (error) return error;
			const atrule = this.getAtrule(atruleName);
			if (!atrule.prelude && prelude) return /* @__PURE__ */ new SyntaxError("At-rule `@" + atruleName + "` should not contain a prelude");
			if (atrule.prelude && !prelude) {
				if (!matchSyntax(this, atrule.prelude, "", false).matched) return /* @__PURE__ */ new SyntaxError("At-rule `@" + atruleName + "` should contain a prelude");
			}
		}
		checkAtruleDescriptorName(atruleName, descriptorName) {
			const error = this.checkAtruleName(atruleName);
			if (error) return error;
			const atrule = this.getAtrule(atruleName);
			const descriptor = keyword(descriptorName);
			if (!atrule.descriptors) return /* @__PURE__ */ new SyntaxError("At-rule `@" + atruleName + "` has no known descriptors");
			if (!atrule.descriptors[descriptor.name] && !atrule.descriptors[descriptor.basename]) return new SyntaxReferenceError("Unknown at-rule descriptor", descriptorName);
		}
		checkPropertyName(propertyName) {
			if (!this.getProperty(propertyName)) return new SyntaxReferenceError("Unknown property", propertyName);
		}
		matchAtrulePrelude(atruleName, prelude) {
			const error = this.checkAtrulePrelude(atruleName, prelude);
			if (error) return buildMatchResult(null, error);
			const atrule = this.getAtrule(atruleName);
			if (!atrule.prelude) return buildMatchResult(null, null);
			return matchSyntax(this, atrule.prelude, prelude || "", false);
		}
		matchAtruleDescriptor(atruleName, descriptorName, value) {
			const error = this.checkAtruleDescriptorName(atruleName, descriptorName);
			if (error) return buildMatchResult(null, error);
			const atrule = this.getAtrule(atruleName);
			const descriptor = keyword(descriptorName);
			return matchSyntax(this, atrule.descriptors[descriptor.name] || atrule.descriptors[descriptor.basename], value, false);
		}
		matchDeclaration(node) {
			if (node.type !== "Declaration") return buildMatchResult(null, /* @__PURE__ */ new Error("Not a Declaration node"));
			return this.matchProperty(node.property, node.value);
		}
		matchProperty(propertyName, value) {
			if (property(propertyName).custom) return buildMatchResult(null, /* @__PURE__ */ new Error("Lexer matching doesn't applicable for custom properties"));
			const error = this.checkPropertyName(propertyName);
			if (error) return buildMatchResult(null, error);
			return matchSyntax(this, this.getProperty(propertyName), value, true);
		}
		matchType(typeName, value) {
			const typeSyntax = this.getType(typeName);
			if (!typeSyntax) return buildMatchResult(null, new SyntaxReferenceError("Unknown type", typeName));
			return matchSyntax(this, typeSyntax, value, false);
		}
		match(syntax, value) {
			if (typeof syntax !== "string" && (!syntax || !syntax.type)) return buildMatchResult(null, new SyntaxReferenceError("Bad syntax"));
			if (typeof syntax === "string" || !syntax.match) syntax = this.createDescriptor(syntax, "Type", "anonymous");
			return matchSyntax(this, syntax, value, false);
		}
		findValueFragments(propertyName, value, type, name) {
			return matchFragments(this, value, this.matchProperty(propertyName, value), type, name);
		}
		findDeclarationValueFragments(declaration, type, name) {
			return matchFragments(this, declaration.value, this.matchDeclaration(declaration), type, name);
		}
		findAllFragments(ast, type, name) {
			const result = [];
			this.syntax.walk(ast, {
				visit: "Declaration",
				enter: (declaration) => {
					result.push.apply(result, this.findDeclarationValueFragments(declaration, type, name));
				}
			});
			return result;
		}
		getAtrule(atruleName, fallbackBasename = true) {
			const atrule = keyword(atruleName);
			return (atrule.vendor && fallbackBasename ? this.atrules[atrule.name] || this.atrules[atrule.basename] : this.atrules[atrule.name]) || null;
		}
		getAtrulePrelude(atruleName, fallbackBasename = true) {
			const atrule = this.getAtrule(atruleName, fallbackBasename);
			return atrule && atrule.prelude || null;
		}
		getAtruleDescriptor(atruleName, name) {
			return this.atrules.hasOwnProperty(atruleName) && this.atrules.declarators ? this.atrules[atruleName].declarators[name] || null : null;
		}
		getProperty(propertyName, fallbackBasename = true) {
			const property$1 = property(propertyName);
			return (property$1.vendor && fallbackBasename ? this.properties[property$1.name] || this.properties[property$1.basename] : this.properties[property$1.name]) || null;
		}
		getType(name) {
			return hasOwnProperty.call(this.types, name) ? this.types[name] : null;
		}
		validate() {
			function syntaxRef(name, isType) {
				return isType ? `<${name}>` : `<'${name}'>`;
			}
			function validate(syntax, name, broken, descriptor) {
				if (broken.has(name)) return broken.get(name);
				broken.set(name, false);
				if (descriptor.syntax !== null) walk$1(descriptor.syntax, function(node) {
					if (node.type !== "Type" && node.type !== "Property") return;
					const map = node.type === "Type" ? syntax.types : syntax.properties;
					const brokenMap = node.type === "Type" ? brokenTypes : brokenProperties;
					if (!hasOwnProperty.call(map, node.name)) {
						errors.push(`${syntaxRef(name, broken === brokenTypes)} used missed syntax definition ${syntaxRef(node.name, node.type === "Type")}`);
						broken.set(name, true);
					} else if (validate(syntax, node.name, brokenMap, map[node.name])) {
						errors.push(`${syntaxRef(name, broken === brokenTypes)} used broken syntax definition ${syntaxRef(node.name, node.type === "Type")}`);
						broken.set(name, true);
					}
				}, this);
			}
			const errors = [];
			let brokenTypes = /* @__PURE__ */ new Map();
			let brokenProperties = /* @__PURE__ */ new Map();
			for (const key in this.types) validate(this, key, brokenTypes, this.types[key]);
			for (const key in this.properties) validate(this, key, brokenProperties, this.properties[key]);
			const brokenTypesArray = [...brokenTypes.keys()].filter((name) => brokenTypes.get(name));
			const brokenPropertiesArray = [...brokenProperties.keys()].filter((name) => brokenProperties.get(name));
			if (brokenTypesArray.length || brokenPropertiesArray.length) return {
				errors,
				types: brokenTypesArray,
				properties: brokenPropertiesArray
			};
			return null;
		}
		dump(syntaxAsAst, pretty) {
			return {
				generic: this.generic,
				cssWideKeywords: this.cssWideKeywords,
				units: this.units,
				types: dumpMapSyntax(this.types, !pretty, syntaxAsAst),
				properties: dumpMapSyntax(this.properties, !pretty, syntaxAsAst),
				atrules: dumpAtruleMapSyntax(this.atrules, !pretty, syntaxAsAst)
			};
		}
		toString() {
			return JSON.stringify(this.dump());
		}
	};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/config/mix.js
function appendOrSet(a, b) {
	if (typeof b === "string" && /^\s*\|/.test(b)) return typeof a === "string" ? a + b : b.replace(/^\s*\|\s*/, "");
	return b || null;
}
function extractProps(obj, props) {
	const result = Object.create(null);
	for (const prop of Object.keys(obj)) if (props.includes(prop)) result[prop] = obj[prop];
	return result;
}
function mergeDicts(base, ext, fields) {
	const result = { ...base };
	for (const [key, props] of Object.entries(ext)) result[key] = {
		...result[key],
		...fields ? extractProps(props, fields) : props
	};
	return result;
}
function mix(dest, src) {
	const result = { ...dest };
	for (const [prop, value] of Object.entries(src)) switch (prop) {
		case "generic":
			result[prop] = Boolean(value);
			break;
		case "cssWideKeywords":
			result[prop] = dest[prop] ? [...dest[prop], ...value] : value || [];
			break;
		case "units":
			result[prop] = { ...dest[prop] };
			for (const [name, patch] of Object.entries(value)) result[prop][name] = Array.isArray(patch) ? patch : [];
			break;
		case "atrules":
			result[prop] = { ...dest[prop] };
			for (const [name, atrule] of Object.entries(value)) {
				const exists = result[prop][name] || {};
				const current = result[prop][name] = {
					prelude: exists.prelude || null,
					descriptors: { ...exists.descriptors }
				};
				if (!atrule) continue;
				current.prelude = atrule.prelude ? appendOrSet(current.prelude, atrule.prelude) : current.prelude || null;
				for (const [descriptorName, descriptorValue] of Object.entries(atrule.descriptors || {})) current.descriptors[descriptorName] = descriptorValue ? appendOrSet(current.descriptors[descriptorName], descriptorValue) : null;
				if (!Object.keys(current.descriptors).length) current.descriptors = null;
			}
			break;
		case "types":
		case "properties":
			result[prop] = { ...dest[prop] };
			for (const [name, syntax] of Object.entries(value)) result[prop][name] = appendOrSet(result[prop][name], syntax);
			break;
		case "parseContext":
			result[prop] = {
				...dest[prop],
				...value
			};
			break;
		case "scope":
		case "features":
			result[prop] = mergeDicts(dest[prop], value);
			break;
		case "atrule":
		case "pseudo":
			result[prop] = mergeDicts(dest[prop], value, ["parse"]);
			break;
		case "node":
			result[prop] = mergeDicts(dest[prop], value, [
				"name",
				"structure",
				"parse",
				"generate",
				"walkContext"
			]);
			break;
	}
	return result;
}
var init_mix = __esmMin((() => {}));
//#endregion
//#region node_modules/css-tree/lib/syntax/create.js
function createSyntax(config) {
	const parse = createParser(config);
	const walk = createWalker(config);
	const generate = createGenerator(config);
	const { fromPlainObject, toPlainObject } = createConvertor(walk);
	const syntax = {
		lexer: null,
		createLexer: (config) => new Lexer(config, syntax, syntax.lexer.structure),
		tokenize: tokenize$1,
		parse,
		generate,
		walk,
		find: walk.find,
		findLast: walk.findLast,
		findAll: walk.findAll,
		fromPlainObject,
		toPlainObject,
		fork(extension) {
			const base = mix({}, config);
			return createSyntax(typeof extension === "function" ? extension(base) : mix(base, extension));
		}
	};
	syntax.lexer = new Lexer({
		generic: config.generic,
		cssWideKeywords: config.cssWideKeywords,
		units: config.units,
		types: config.types,
		atrules: config.atrules,
		properties: config.properties,
		node: config.node
	}, syntax);
	return syntax;
}
var create_default;
var init_create = __esmMin((() => {
	init_tokenizer();
	init_create$4();
	init_create$3();
	init_create$2();
	init_create$1();
	init_Lexer();
	init_mix();
	create_default = (config) => createSyntax(mix({}, config));
}));
//#endregion
//#region node_modules/css-tree/lib/data-patch.js
var patch;
var init_data_patch = __esmMin((() => {
	patch = createRequire(import.meta.url)("../data/patch.json");
}));
//#endregion
//#region node_modules/css-tree/lib/data.js
function preprocessAtrules(dict) {
	const result = Object.create(null);
	for (const [atruleName, atrule] of Object.entries(dict)) {
		let descriptors = null;
		if (atrule.descriptors) {
			descriptors = Object.create(null);
			for (const [name, descriptor] of Object.entries(atrule.descriptors)) descriptors[name] = descriptor.syntax;
		}
		result[atruleName.substr(1)] = {
			prelude: atrule.syntax.trim().replace(/\{(.|\s)+\}/, "").match(/^@\S+\s+([^;\{]*)/)[1].trim() || null,
			descriptors
		};
	}
	return result;
}
function patchDictionary(dict, patchDict) {
	const result = Object.create(null);
	for (const [key, value] of Object.entries(dict)) if (value) result[key] = value.syntax || value;
	for (const key of Object.keys(patchDict)) if (hasOwn(dict, key)) if (patchDict[key].syntax) result[key] = extendSyntax.test(patchDict[key].syntax) ? result[key] + " " + patchDict[key].syntax.trim() : patchDict[key].syntax;
	else delete result[key];
	else if (patchDict[key].syntax) result[key] = patchDict[key].syntax.replace(extendSyntax, "");
	return result;
}
function preprocessPatchAtrulesDescritors(declarations) {
	const result = {};
	for (const [key, value] of Object.entries(declarations || {})) result[key] = typeof value === "string" ? { syntax: value } : value;
	return result;
}
function patchAtrules(dict, patchDict) {
	const result = {};
	for (const key in dict) {
		if (patchDict[key] === null) continue;
		const atrulePatch = patchDict[key] || {};
		result[key] = {
			prelude: key in patchDict && "prelude" in atrulePatch ? atrulePatch.prelude : dict[key].prelude || null,
			descriptors: patchDictionary(dict[key].descriptors || {}, preprocessPatchAtrulesDescritors(atrulePatch.descriptors))
		};
	}
	for (const [key, atrulePatch] of Object.entries(patchDict)) if (atrulePatch && !hasOwn(dict, key)) result[key] = {
		prelude: atrulePatch.prelude || null,
		descriptors: atrulePatch.descriptors ? patchDictionary({}, preprocessPatchAtrulesDescritors(atrulePatch.descriptors)) : null
	};
	return result;
}
var require$2, mdnAtrules, mdnProperties, mdnSyntaxes, hasOwn, extendSyntax, data_default;
var init_data = __esmMin((() => {
	init_data_patch();
	require$2 = createRequire(import.meta.url);
	mdnAtrules = require$2("mdn-data/css/at-rules.json");
	mdnProperties = require$2("mdn-data/css/properties.json");
	mdnSyntaxes = require$2("mdn-data/css/syntaxes.json");
	hasOwn = Object.hasOwn || ((object, property) => Object.prototype.hasOwnProperty.call(object, property));
	extendSyntax = /^\s*\|\s*/;
	data_default = {
		types: patchDictionary(mdnSyntaxes, patch.types),
		atrules: patchAtrules(preprocessAtrules(mdnAtrules), patch.atrules),
		properties: patchDictionary(mdnProperties, patch.properties)
	};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/AnPlusB.js
var AnPlusB_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$49,
	name: () => name$48,
	parse: () => parse$49,
	structure: () => structure$48
});
function checkInteger(offset, disallowSign) {
	let pos = this.tokenStart + offset;
	const code = this.charCodeAt(pos);
	if (code === PLUSSIGN$5 || code === HYPHENMINUS$2) {
		if (disallowSign) this.error("Number sign is not allowed");
		pos++;
	}
	for (; pos < this.tokenEnd; pos++) if (!isDigit(this.charCodeAt(pos))) this.error("Integer is expected", pos);
}
function checkTokenIsInteger(disallowSign) {
	return checkInteger.call(this, 0, disallowSign);
}
function expectCharCode(offset, code) {
	if (!this.cmpChar(this.tokenStart + offset, code)) {
		let msg = "";
		switch (code) {
			case N:
				msg = "N is expected";
				break;
			case HYPHENMINUS$2:
				msg = "HyphenMinus is expected";
				break;
		}
		this.error(msg, this.tokenStart + offset);
	}
}
function consumeB() {
	let offset = 0;
	let sign = 0;
	let type = this.tokenType;
	while (type === 13 || type === 25) type = this.lookupType(++offset);
	if (type !== 10) if (this.isDelim(PLUSSIGN$5, offset) || this.isDelim(HYPHENMINUS$2, offset)) {
		sign = this.isDelim(PLUSSIGN$5, offset) ? PLUSSIGN$5 : HYPHENMINUS$2;
		do
			type = this.lookupType(++offset);
		while (type === 13 || type === 25);
		if (type !== 10) {
			this.skip(offset);
			checkTokenIsInteger.call(this, DISALLOW_SIGN);
		}
	} else return null;
	if (offset > 0) this.skip(offset);
	if (sign === 0) {
		type = this.charCodeAt(this.tokenStart);
		if (type !== PLUSSIGN$5 && type !== HYPHENMINUS$2) this.error("Number sign is expected");
	}
	checkTokenIsInteger.call(this, sign !== 0);
	return sign === HYPHENMINUS$2 ? "-" + this.consume(10) : this.consume(10);
}
function parse$49() {
	const start = this.tokenStart;
	let a = null;
	let b = null;
	if (this.tokenType === 10) {
		checkTokenIsInteger.call(this, ALLOW_SIGN);
		b = this.consume(10);
	} else if (this.tokenType === 1 && this.cmpChar(this.tokenStart, HYPHENMINUS$2)) {
		a = "-1";
		expectCharCode.call(this, 1, N);
		switch (this.tokenEnd - this.tokenStart) {
			case 2:
				this.next();
				b = consumeB.call(this);
				break;
			case 3:
				expectCharCode.call(this, 2, HYPHENMINUS$2);
				this.next();
				this.skipSC();
				checkTokenIsInteger.call(this, DISALLOW_SIGN);
				b = "-" + this.consume(10);
				break;
			default:
				expectCharCode.call(this, 2, HYPHENMINUS$2);
				checkInteger.call(this, 3, DISALLOW_SIGN);
				this.next();
				b = this.substrToCursor(start + 2);
		}
	} else if (this.tokenType === 1 || this.isDelim(PLUSSIGN$5) && this.lookupType(1) === 1) {
		let sign = 0;
		a = "1";
		if (this.isDelim(PLUSSIGN$5)) {
			sign = 1;
			this.next();
		}
		expectCharCode.call(this, 0, N);
		switch (this.tokenEnd - this.tokenStart) {
			case 1:
				this.next();
				b = consumeB.call(this);
				break;
			case 2:
				expectCharCode.call(this, 1, HYPHENMINUS$2);
				this.next();
				this.skipSC();
				checkTokenIsInteger.call(this, DISALLOW_SIGN);
				b = "-" + this.consume(10);
				break;
			default:
				expectCharCode.call(this, 1, HYPHENMINUS$2);
				checkInteger.call(this, 2, DISALLOW_SIGN);
				this.next();
				b = this.substrToCursor(start + sign + 1);
		}
	} else if (this.tokenType === 12) {
		const code = this.charCodeAt(this.tokenStart);
		const sign = code === PLUSSIGN$5 || code === HYPHENMINUS$2;
		let i = this.tokenStart + sign;
		for (; i < this.tokenEnd; i++) if (!isDigit(this.charCodeAt(i))) break;
		if (i === this.tokenStart + sign) this.error("Integer is expected", this.tokenStart + sign);
		expectCharCode.call(this, i - this.tokenStart, N);
		a = this.substring(start, i);
		if (i + 1 === this.tokenEnd) {
			this.next();
			b = consumeB.call(this);
		} else {
			expectCharCode.call(this, i - this.tokenStart + 1, HYPHENMINUS$2);
			if (i + 2 === this.tokenEnd) {
				this.next();
				this.skipSC();
				checkTokenIsInteger.call(this, DISALLOW_SIGN);
				b = "-" + this.consume(10);
			} else {
				checkInteger.call(this, i - this.tokenStart + 2, DISALLOW_SIGN);
				this.next();
				b = this.substrToCursor(i + 1);
			}
		}
	} else this.error();
	if (a !== null && a.charCodeAt(0) === PLUSSIGN$5) a = a.substr(1);
	if (b !== null && b.charCodeAt(0) === PLUSSIGN$5) b = b.substr(1);
	return {
		type: "AnPlusB",
		loc: this.getLocation(start, this.tokenStart),
		a,
		b
	};
}
function generate$49(node) {
	if (node.a) {
		const a = node.a === "+1" && "n" || node.a === "1" && "n" || node.a === "-1" && "-n" || node.a + "n";
		if (node.b) {
			const b = node.b[0] === "-" || node.b[0] === "+" ? node.b : "+" + node.b;
			this.tokenize(a + b);
		} else this.tokenize(a);
	} else this.tokenize(node.b);
}
var PLUSSIGN$5, HYPHENMINUS$2, N, DISALLOW_SIGN, ALLOW_SIGN, name$48, structure$48;
var init_AnPlusB = __esmMin((() => {
	init_tokenizer();
	PLUSSIGN$5 = 43;
	HYPHENMINUS$2 = 45;
	N = 110;
	DISALLOW_SIGN = true;
	ALLOW_SIGN = false;
	name$48 = "AnPlusB";
	structure$48 = {
		a: [String, null],
		b: [String, null]
	};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Atrule.js
var Atrule_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$48,
	name: () => name$47,
	parse: () => parse$48,
	structure: () => structure$47,
	walkContext: () => walkContext$9
});
function consumeRaw$4() {
	return this.Raw(this.consumeUntilLeftCurlyBracketOrSemicolon, true);
}
function isDeclarationBlockAtrule() {
	for (let offset = 1, type; type = this.lookupType(offset); offset++) {
		if (type === 24) return true;
		if (type === 23 || type === 3) return false;
	}
	return false;
}
function parse$48(isDeclaration = false) {
	const start = this.tokenStart;
	let name;
	let nameLowerCase;
	let prelude = null;
	let block = null;
	this.eat(3);
	name = this.substrToCursor(start + 1);
	nameLowerCase = name.toLowerCase();
	this.skipSC();
	if (this.eof === false && this.tokenType !== 23 && this.tokenType !== 17) {
		if (this.parseAtrulePrelude) prelude = this.parseWithFallback(this.AtrulePrelude.bind(this, name, isDeclaration), consumeRaw$4);
		else prelude = consumeRaw$4.call(this, this.tokenIndex);
		this.skipSC();
	}
	switch (this.tokenType) {
		case 17:
			this.next();
			break;
		case 23:
			if (hasOwnProperty.call(this.atrule, nameLowerCase) && typeof this.atrule[nameLowerCase].block === "function") block = this.atrule[nameLowerCase].block.call(this, isDeclaration);
			else block = this.Block(isDeclarationBlockAtrule.call(this));
			break;
	}
	return {
		type: "Atrule",
		loc: this.getLocation(start, this.tokenStart),
		name,
		prelude,
		block
	};
}
function generate$48(node) {
	this.token(3, "@" + node.name);
	if (node.prelude !== null) this.node(node.prelude);
	if (node.block) this.node(node.block);
	else this.token(17, ";");
}
var name$47, walkContext$9, structure$47;
var init_Atrule = __esmMin((() => {
	init_tokenizer();
	name$47 = "Atrule";
	walkContext$9 = "atrule";
	structure$47 = {
		name: String,
		prelude: [
			"AtrulePrelude",
			"Raw",
			null
		],
		block: ["Block", null]
	};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/AtrulePrelude.js
var AtrulePrelude_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$47,
	name: () => name$46,
	parse: () => parse$47,
	structure: () => structure$46,
	walkContext: () => walkContext$8
});
function parse$47(name) {
	let children = null;
	if (name !== null) name = name.toLowerCase();
	this.skipSC();
	if (hasOwnProperty.call(this.atrule, name) && typeof this.atrule[name].prelude === "function") children = this.atrule[name].prelude.call(this);
	else children = this.readSequence(this.scope.AtrulePrelude);
	this.skipSC();
	if (this.eof !== true && this.tokenType !== 23 && this.tokenType !== 17) this.error("Semicolon or block is expected");
	return {
		type: "AtrulePrelude",
		loc: this.getLocationFromList(children),
		children
	};
}
function generate$47(node) {
	this.children(node);
}
var name$46, walkContext$8, structure$46;
var init_AtrulePrelude = __esmMin((() => {
	init_tokenizer();
	name$46 = "AtrulePrelude";
	walkContext$8 = "atrulePrelude";
	structure$46 = { children: [[]] };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/AttributeSelector.js
var AttributeSelector_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$46,
	name: () => name$45,
	parse: () => parse$46,
	structure: () => structure$45
});
function getAttributeName() {
	if (this.eof) this.error("Unexpected end of input");
	const start = this.tokenStart;
	let expectIdent = false;
	if (this.isDelim(ASTERISK$5)) {
		expectIdent = true;
		this.next();
	} else if (!this.isDelim(VERTICALLINE$2)) this.eat(1);
	if (this.isDelim(VERTICALLINE$2)) {
		if (this.charCodeAt(this.tokenStart + 1) !== EQUALSSIGN$1) {
			this.next();
			this.eat(1);
		} else if (expectIdent) this.error("Identifier is expected", this.tokenEnd);
	} else if (expectIdent) this.error("Vertical line is expected");
	return {
		type: "Identifier",
		loc: this.getLocation(start, this.tokenStart),
		name: this.substrToCursor(start)
	};
}
function getOperator() {
	const start = this.tokenStart;
	const code = this.charCodeAt(start);
	if (code !== EQUALSSIGN$1 && code !== TILDE$2 && code !== CIRCUMFLEXACCENT && code !== DOLLARSIGN$1 && code !== ASTERISK$5 && code !== VERTICALLINE$2) this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected");
	this.next();
	if (code !== EQUALSSIGN$1) {
		if (!this.isDelim(EQUALSSIGN$1)) this.error("Equal sign is expected");
		this.next();
	}
	return this.substrToCursor(start);
}
function parse$46() {
	const start = this.tokenStart;
	let name;
	let matcher = null;
	let value = null;
	let flags = null;
	this.eat(19);
	this.skipSC();
	name = getAttributeName.call(this);
	this.skipSC();
	if (this.tokenType !== 20) {
		if (this.tokenType !== 1) {
			matcher = getOperator.call(this);
			this.skipSC();
			value = this.tokenType === 5 ? this.String() : this.Identifier();
			this.skipSC();
		}
		if (this.tokenType === 1) {
			flags = this.consume(1);
			this.skipSC();
		}
	}
	this.eat(20);
	return {
		type: "AttributeSelector",
		loc: this.getLocation(start, this.tokenStart),
		name,
		matcher,
		value,
		flags
	};
}
function generate$46(node) {
	this.token(9, "[");
	this.node(node.name);
	if (node.matcher !== null) {
		this.tokenize(node.matcher);
		this.node(node.value);
	}
	if (node.flags !== null) this.token(1, node.flags);
	this.token(9, "]");
}
var DOLLARSIGN$1, ASTERISK$5, EQUALSSIGN$1, CIRCUMFLEXACCENT, VERTICALLINE$2, TILDE$2, name$45, structure$45;
var init_AttributeSelector = __esmMin((() => {
	init_tokenizer();
	DOLLARSIGN$1 = 36;
	ASTERISK$5 = 42;
	EQUALSSIGN$1 = 61;
	CIRCUMFLEXACCENT = 94;
	VERTICALLINE$2 = 124;
	TILDE$2 = 126;
	name$45 = "AttributeSelector";
	structure$45 = {
		name: "Identifier",
		matcher: [String, null],
		value: [
			"String",
			"Identifier",
			null
		],
		flags: [String, null]
	};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Block.js
var Block_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$45,
	name: () => name$44,
	parse: () => parse$45,
	structure: () => structure$44,
	walkContext: () => walkContext$7
});
function consumeRaw$3() {
	return this.Raw(null, true);
}
function consumeRule() {
	return this.parseWithFallback(this.Rule, consumeRaw$3);
}
function consumeRawDeclaration() {
	return this.Raw(this.consumeUntilSemicolonIncluded, true);
}
function consumeDeclaration() {
	if (this.tokenType === 17) return consumeRawDeclaration.call(this, this.tokenIndex);
	const node = this.parseWithFallback(this.Declaration, consumeRawDeclaration);
	if (this.tokenType === 17) this.next();
	return node;
}
function parse$45(isStyleBlock) {
	const consumer = isStyleBlock ? consumeDeclaration : consumeRule;
	const start = this.tokenStart;
	let children = this.createList();
	this.eat(23);
	scan: while (!this.eof) switch (this.tokenType) {
		case 24: break scan;
		case 13:
		case 25:
			this.next();
			break;
		case 3:
			children.push(this.parseWithFallback(this.Atrule.bind(this, isStyleBlock), consumeRaw$3));
			break;
		default: if (isStyleBlock && this.isDelim(AMPERSAND$4)) children.push(consumeRule.call(this));
		else children.push(consumer.call(this));
	}
	if (!this.eof) this.eat(24);
	return {
		type: "Block",
		loc: this.getLocation(start, this.tokenStart),
		children
	};
}
function generate$45(node) {
	this.token(23, "{");
	this.children(node, (prev) => {
		if (prev.type === "Declaration") this.token(17, ";");
	});
	this.token(24, "}");
}
var AMPERSAND$4, name$44, walkContext$7, structure$44;
var init_Block = __esmMin((() => {
	init_tokenizer();
	AMPERSAND$4 = 38;
	name$44 = "Block";
	walkContext$7 = "block";
	structure$44 = { children: [[
		"Atrule",
		"Rule",
		"Declaration"
	]] };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Brackets.js
var Brackets_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$44,
	name: () => name$43,
	parse: () => parse$44,
	structure: () => structure$43
});
function parse$44(readSequence, recognizer) {
	const start = this.tokenStart;
	let children = null;
	this.eat(19);
	children = readSequence.call(this, recognizer);
	if (!this.eof) this.eat(20);
	return {
		type: "Brackets",
		loc: this.getLocation(start, this.tokenStart),
		children
	};
}
function generate$44(node) {
	this.token(9, "[");
	this.children(node);
	this.token(9, "]");
}
var name$43, structure$43;
var init_Brackets = __esmMin((() => {
	init_tokenizer();
	name$43 = "Brackets";
	structure$43 = { children: [[]] };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/CDC.js
var CDC_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$43,
	name: () => "CDC",
	parse: () => parse$43,
	structure: () => structure$42
});
function parse$43() {
	const start = this.tokenStart;
	this.eat(15);
	return {
		type: "CDC",
		loc: this.getLocation(start, this.tokenStart)
	};
}
function generate$43() {
	this.token(15, "-->");
}
var structure$42;
var init_CDC = __esmMin((() => {
	init_tokenizer();
	structure$42 = [];
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/CDO.js
var CDO_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$42,
	name: () => "CDO",
	parse: () => parse$42,
	structure: () => structure$41
});
function parse$42() {
	const start = this.tokenStart;
	this.eat(14);
	return {
		type: "CDO",
		loc: this.getLocation(start, this.tokenStart)
	};
}
function generate$42() {
	this.token(14, "<!--");
}
var structure$41;
var init_CDO = __esmMin((() => {
	init_tokenizer();
	structure$41 = [];
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/ClassSelector.js
var ClassSelector_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$41,
	name: () => name$40,
	parse: () => parse$41,
	structure: () => structure$40
});
function parse$41() {
	this.eatDelim(FULLSTOP$2);
	return {
		type: "ClassSelector",
		loc: this.getLocation(this.tokenStart - 1, this.tokenEnd),
		name: this.consume(1)
	};
}
function generate$41(node) {
	this.token(9, ".");
	this.token(1, node.name);
}
var FULLSTOP$2, name$40, structure$40;
var init_ClassSelector = __esmMin((() => {
	init_tokenizer();
	FULLSTOP$2 = 46;
	name$40 = "ClassSelector";
	structure$40 = { name: String };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Combinator.js
var Combinator_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$40,
	name: () => name$39,
	parse: () => parse$40,
	structure: () => structure$39
});
function parse$40() {
	const start = this.tokenStart;
	let name;
	switch (this.tokenType) {
		case 13:
			name = " ";
			break;
		case 9:
			switch (this.charCodeAt(this.tokenStart)) {
				case GREATERTHANSIGN$2:
				case PLUSSIGN$4:
				case TILDE$1:
					this.next();
					break;
				case SOLIDUS$7:
					this.next();
					this.eatIdent("deep");
					this.eatDelim(SOLIDUS$7);
					break;
				default: this.error("Combinator is expected");
			}
			name = this.substrToCursor(start);
			break;
	}
	return {
		type: "Combinator",
		loc: this.getLocation(start, this.tokenStart),
		name
	};
}
function generate$40(node) {
	this.tokenize(node.name);
}
var PLUSSIGN$4, SOLIDUS$7, GREATERTHANSIGN$2, TILDE$1, name$39, structure$39;
var init_Combinator = __esmMin((() => {
	init_tokenizer();
	PLUSSIGN$4 = 43;
	SOLIDUS$7 = 47;
	GREATERTHANSIGN$2 = 62;
	TILDE$1 = 126;
	name$39 = "Combinator";
	structure$39 = { name: String };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Comment.js
var Comment_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$39,
	name: () => name$38,
	parse: () => parse$39,
	structure: () => structure$38
});
function parse$39() {
	const start = this.tokenStart;
	let end = this.tokenEnd;
	this.eat(25);
	if (end - start + 2 >= 2 && this.charCodeAt(end - 2) === ASTERISK$4 && this.charCodeAt(end - 1) === SOLIDUS$6) end -= 2;
	return {
		type: "Comment",
		loc: this.getLocation(start, this.tokenStart),
		value: this.substring(start + 2, end)
	};
}
function generate$39(node) {
	this.token(25, "/*" + node.value + "*/");
}
var ASTERISK$4, SOLIDUS$6, name$38, structure$38;
var init_Comment = __esmMin((() => {
	init_tokenizer();
	ASTERISK$4 = 42;
	SOLIDUS$6 = 47;
	name$38 = "Comment";
	structure$38 = { value: String };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Condition.js
var Condition_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$38,
	name: () => name$37,
	parse: () => parse$38,
	structure: () => structure$37
});
function featureOrRange(kind) {
	if (this.lookupTypeNonSC(1) === 1 && likelyFeatureToken.has(this.lookupTypeNonSC(2))) return this.Feature(kind);
	return this.FeatureRange(kind);
}
function parse$38(kind = "media") {
	const children = this.createList();
	scan: while (!this.eof) switch (this.tokenType) {
		case 25:
		case 13:
			this.next();
			continue;
		case 1:
			children.push(this.Identifier());
			break;
		case 21: {
			let term = this.parseWithFallback(() => parentheses[kind].call(this, kind), () => null);
			if (!term) term = this.parseWithFallback(() => {
				this.eat(21);
				const res = this.Condition(kind);
				this.eat(22);
				return res;
			}, () => {
				return this.GeneralEnclosed(kind);
			});
			children.push(term);
			break;
		}
		case 2: {
			let term = this.parseWithFallback(() => this.FeatureFunction(kind), () => null);
			if (!term) term = this.GeneralEnclosed(kind);
			children.push(term);
			break;
		}
		default: break scan;
	}
	if (children.isEmpty) this.error("Condition is expected");
	return {
		type: "Condition",
		loc: this.getLocationFromList(children),
		kind,
		children
	};
}
function generate$38(node) {
	node.children.forEach((child) => {
		if (child.type === "Condition") {
			this.token(21, "(");
			this.node(child);
			this.token(22, ")");
		} else this.node(child);
	});
}
var likelyFeatureToken, name$37, structure$37, parentheses;
var init_Condition = __esmMin((() => {
	init_tokenizer();
	likelyFeatureToken = new Set([
		16,
		22,
		0
	]);
	name$37 = "Condition";
	structure$37 = {
		kind: String,
		children: [[
			"Identifier",
			"Feature",
			"FeatureFunction",
			"FeatureRange",
			"SupportsDeclaration"
		]]
	};
	parentheses = {
		media: featureOrRange,
		container: featureOrRange,
		supports() {
			return this.SupportsDeclaration();
		}
	};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Declaration.js
var Declaration_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$37,
	name: () => name$36,
	parse: () => parse$37,
	structure: () => structure$36,
	walkContext: () => walkContext$6
});
function consumeValueRaw() {
	return this.Raw(this.consumeUntilExclamationMarkOrSemicolon, true);
}
function consumeCustomPropertyRaw() {
	return this.Raw(this.consumeUntilExclamationMarkOrSemicolon, false);
}
function consumeValue() {
	const startValueToken = this.tokenIndex;
	const value = this.Value();
	if (value.type !== "Raw" && this.eof === false && this.tokenType !== 17 && this.isDelim(EXCLAMATIONMARK$1) === false && this.isBalanceEdge(startValueToken) === false) this.error();
	return value;
}
function parse$37() {
	const start = this.tokenStart;
	const startToken = this.tokenIndex;
	const property = readProperty.call(this);
	const customProperty = isCustomProperty(property);
	const parseValue = customProperty ? this.parseCustomProperty : this.parseValue;
	const consumeRaw = customProperty ? consumeCustomPropertyRaw : consumeValueRaw;
	let important = false;
	let value;
	this.skipSC();
	this.eat(16);
	const valueStart = this.tokenIndex;
	if (!customProperty) this.skipSC();
	if (parseValue) value = this.parseWithFallback(consumeValue, consumeRaw);
	else value = consumeRaw.call(this, this.tokenIndex);
	if (customProperty && value.type === "Value" && value.children.isEmpty) {
		for (let offset = valueStart - this.tokenIndex; offset <= 0; offset++) if (this.lookupType(offset) === 13) {
			value.children.appendData({
				type: "WhiteSpace",
				loc: null,
				value: " "
			});
			break;
		}
	}
	if (this.isDelim(EXCLAMATIONMARK$1)) {
		important = getImportant.call(this);
		this.skipSC();
	}
	if (this.eof === false && this.tokenType !== 17 && this.isBalanceEdge(startToken) === false) this.error();
	return {
		type: "Declaration",
		loc: this.getLocation(start, this.tokenStart),
		important,
		property,
		value
	};
}
function generate$37(node) {
	this.token(1, node.property);
	this.token(16, ":");
	this.node(node.value);
	if (node.important) {
		this.token(9, "!");
		this.token(1, node.important === true ? "important" : node.important);
	}
}
function readProperty() {
	const start = this.tokenStart;
	if (this.tokenType === 9) switch (this.charCodeAt(this.tokenStart)) {
		case ASTERISK$3:
		case DOLLARSIGN:
		case PLUSSIGN$3:
		case NUMBERSIGN$2:
		case AMPERSAND$3:
			this.next();
			break;
		case SOLIDUS$5:
			this.next();
			if (this.isDelim(SOLIDUS$5)) this.next();
			break;
	}
	if (this.tokenType === 4) this.eat(4);
	else this.eat(1);
	return this.substrToCursor(start);
}
function getImportant() {
	this.eat(9);
	this.skipSC();
	const important = this.consume(1);
	return important === "important" ? true : important;
}
var EXCLAMATIONMARK$1, NUMBERSIGN$2, DOLLARSIGN, AMPERSAND$3, ASTERISK$3, PLUSSIGN$3, SOLIDUS$5, name$36, walkContext$6, structure$36;
var init_Declaration = __esmMin((() => {
	init_names();
	init_tokenizer();
	EXCLAMATIONMARK$1 = 33;
	NUMBERSIGN$2 = 35;
	DOLLARSIGN = 36;
	AMPERSAND$3 = 38;
	ASTERISK$3 = 42;
	PLUSSIGN$3 = 43;
	SOLIDUS$5 = 47;
	name$36 = "Declaration";
	walkContext$6 = "declaration";
	structure$36 = {
		important: [Boolean, String],
		property: String,
		value: ["Value", "Raw"]
	};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/DeclarationList.js
var DeclarationList_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$36,
	name: () => name$35,
	parse: () => parse$36,
	structure: () => structure$35
});
function consumeRaw$2() {
	return this.Raw(this.consumeUntilSemicolonIncluded, true);
}
function parse$36() {
	const children = this.createList();
	scan: while (!this.eof) switch (this.tokenType) {
		case 13:
		case 25:
		case 17:
			this.next();
			break;
		case 3:
			children.push(this.parseWithFallback(this.Atrule.bind(this, true), consumeRaw$2));
			break;
		default: if (this.isDelim(AMPERSAND$2)) children.push(this.parseWithFallback(this.Rule, consumeRaw$2));
		else children.push(this.parseWithFallback(this.Declaration, consumeRaw$2));
	}
	return {
		type: "DeclarationList",
		loc: this.getLocationFromList(children),
		children
	};
}
function generate$36(node) {
	this.children(node, (prev) => {
		if (prev.type === "Declaration") this.token(17, ";");
	});
}
var AMPERSAND$2, name$35, structure$35;
var init_DeclarationList = __esmMin((() => {
	init_tokenizer();
	AMPERSAND$2 = 38;
	name$35 = "DeclarationList";
	structure$35 = { children: [[
		"Declaration",
		"Atrule",
		"Rule"
	]] };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Dimension.js
var Dimension_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$35,
	name: () => name$34,
	parse: () => parse$35,
	structure: () => structure$34
});
function parse$35() {
	const start = this.tokenStart;
	const value = this.consumeNumber(12);
	return {
		type: "Dimension",
		loc: this.getLocation(start, this.tokenStart),
		value,
		unit: this.substring(start + value.length, this.tokenStart)
	};
}
function generate$35(node) {
	this.token(12, node.value + node.unit);
}
var name$34, structure$34;
var init_Dimension = __esmMin((() => {
	init_tokenizer();
	name$34 = "Dimension";
	structure$34 = {
		value: String,
		unit: String
	};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Feature.js
var Feature_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$34,
	name: () => name$33,
	parse: () => parse$34,
	structure: () => structure$33
});
function parse$34(kind) {
	const start = this.tokenStart;
	let name;
	let value = null;
	this.eat(21);
	this.skipSC();
	name = this.consume(1);
	this.skipSC();
	if (this.tokenType !== 22) {
		this.eat(16);
		this.skipSC();
		switch (this.tokenType) {
			case 10:
				if (this.lookupNonWSType(1) === 9) value = this.Ratio();
				else value = this.Number();
				break;
			case 12:
				value = this.Dimension();
				break;
			case 1:
				value = this.Identifier();
				break;
			case 2:
				value = this.parseWithFallback(() => {
					const res = this.Function(this.readSequence, this.scope.Value);
					this.skipSC();
					if (this.isDelim(SOLIDUS$4)) this.error();
					return res;
				}, () => {
					return this.Ratio();
				});
				break;
			default: this.error("Number, dimension, ratio or identifier is expected");
		}
		this.skipSC();
	}
	if (!this.eof) this.eat(22);
	return {
		type: "Feature",
		loc: this.getLocation(start, this.tokenStart),
		kind,
		name,
		value
	};
}
function generate$34(node) {
	this.token(21, "(");
	this.token(1, node.name);
	if (node.value !== null) {
		this.token(16, ":");
		this.node(node.value);
	}
	this.token(22, ")");
}
var SOLIDUS$4, name$33, structure$33;
var init_Feature = __esmMin((() => {
	init_tokenizer();
	SOLIDUS$4 = 47;
	name$33 = "Feature";
	structure$33 = {
		kind: String,
		name: String,
		value: [
			"Identifier",
			"Number",
			"Dimension",
			"Ratio",
			"Function",
			null
		]
	};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/FeatureFunction.js
var FeatureFunction_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$33,
	name: () => name$32,
	parse: () => parse$33,
	structure: () => structure$32
});
function getFeatureParser(kind, name) {
	const parser = (this.features[kind] || {})[name];
	if (typeof parser !== "function") this.error(`Unknown feature ${name}()`);
	return parser;
}
function parse$33(kind = "unknown") {
	const start = this.tokenStart;
	const functionName = this.consumeFunctionName();
	const valueParser = getFeatureParser.call(this, kind, functionName.toLowerCase());
	this.skipSC();
	const value = this.parseWithFallback(() => {
		const startValueToken = this.tokenIndex;
		const value = valueParser.call(this);
		if (this.eof === false && this.isBalanceEdge(startValueToken) === false) this.error();
		return value;
	}, () => this.Raw(null, false));
	if (!this.eof) this.eat(22);
	return {
		type: "FeatureFunction",
		loc: this.getLocation(start, this.tokenStart),
		kind,
		feature: functionName,
		value
	};
}
function generate$33(node) {
	this.token(2, node.feature + "(");
	this.node(node.value);
	this.token(22, ")");
}
var name$32, structure$32;
var init_FeatureFunction = __esmMin((() => {
	init_tokenizer();
	name$32 = "FeatureFunction";
	structure$32 = {
		kind: String,
		feature: String,
		value: ["Declaration", "Selector"]
	};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/FeatureRange.js
var FeatureRange_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$32,
	name: () => name$31,
	parse: () => parse$32,
	structure: () => structure$31
});
function readTerm() {
	this.skipSC();
	switch (this.tokenType) {
		case 10: if (this.isDelim(SOLIDUS$3, this.lookupOffsetNonSC(1))) return this.Ratio();
		else return this.Number();
		case 12: return this.Dimension();
		case 1: return this.Identifier();
		case 2: return this.parseWithFallback(() => {
			const res = this.Function(this.readSequence, this.scope.Value);
			this.skipSC();
			if (this.isDelim(SOLIDUS$3)) this.error();
			return res;
		}, () => {
			return this.Ratio();
		});
		default: this.error("Number, dimension, ratio or identifier is expected");
	}
}
function readComparison(expectColon) {
	this.skipSC();
	if (this.isDelim(LESSTHANSIGN) || this.isDelim(GREATERTHANSIGN$1)) {
		const value = this.source[this.tokenStart];
		this.next();
		if (this.isDelim(EQUALSSIGN)) {
			this.next();
			return value + "=";
		}
		return value;
	}
	if (this.isDelim(EQUALSSIGN)) return "=";
	this.error(`Expected ${expectColon ? "\":\", " : ""}"<", ">", "=" or ")"`);
}
function parse$32(kind = "unknown") {
	const start = this.tokenStart;
	this.skipSC();
	this.eat(21);
	const left = readTerm.call(this);
	const leftComparison = readComparison.call(this, left.type === "Identifier");
	const middle = readTerm.call(this);
	let rightComparison = null;
	let right = null;
	if (this.lookupNonWSType(0) !== 22) {
		rightComparison = readComparison.call(this);
		right = readTerm.call(this);
	}
	this.skipSC();
	this.eat(22);
	return {
		type: "FeatureRange",
		loc: this.getLocation(start, this.tokenStart),
		kind,
		left,
		leftComparison,
		middle,
		rightComparison,
		right
	};
}
function generate$32(node) {
	this.token(21, "(");
	this.node(node.left);
	this.tokenize(node.leftComparison);
	this.node(node.middle);
	if (node.right) {
		this.tokenize(node.rightComparison);
		this.node(node.right);
	}
	this.token(22, ")");
}
var SOLIDUS$3, LESSTHANSIGN, EQUALSSIGN, GREATERTHANSIGN$1, name$31, structure$31;
var init_FeatureRange = __esmMin((() => {
	init_tokenizer();
	SOLIDUS$3 = 47;
	LESSTHANSIGN = 60;
	EQUALSSIGN = 61;
	GREATERTHANSIGN$1 = 62;
	name$31 = "FeatureRange";
	structure$31 = {
		kind: String,
		left: [
			"Identifier",
			"Number",
			"Dimension",
			"Ratio",
			"Function"
		],
		leftComparison: String,
		middle: [
			"Identifier",
			"Number",
			"Dimension",
			"Ratio",
			"Function"
		],
		rightComparison: [String, null],
		right: [
			"Identifier",
			"Number",
			"Dimension",
			"Ratio",
			"Function",
			null
		]
	};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Function.js
var Function_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$31,
	name: () => name$30,
	parse: () => parse$31,
	structure: () => structure$30,
	walkContext: () => walkContext$5
});
function parse$31(readSequence, recognizer) {
	const start = this.tokenStart;
	const name = this.consumeFunctionName();
	const nameLowerCase = name.toLowerCase();
	let children;
	children = recognizer.hasOwnProperty(nameLowerCase) ? recognizer[nameLowerCase].call(this, recognizer) : readSequence.call(this, recognizer);
	if (!this.eof) this.eat(22);
	return {
		type: "Function",
		loc: this.getLocation(start, this.tokenStart),
		name,
		children
	};
}
function generate$31(node) {
	this.token(2, node.name + "(");
	this.children(node);
	this.token(22, ")");
}
var name$30, walkContext$5, structure$30;
var init_Function = __esmMin((() => {
	init_tokenizer();
	name$30 = "Function";
	walkContext$5 = "function";
	structure$30 = {
		name: String,
		children: [[]]
	};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/GeneralEnclosed.js
var GeneralEnclosed_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$30,
	name: () => name$29,
	parse: () => parse$30,
	structure: () => structure$29
});
function parse$30(kind) {
	const start = this.tokenStart;
	let functionName = null;
	if (this.tokenType === 2) functionName = this.consumeFunctionName();
	else this.eat(21);
	const children = this.parseWithFallback(() => {
		const startValueToken = this.tokenIndex;
		const children = this.readSequence(this.scope.Value);
		if (this.eof === false && this.isBalanceEdge(startValueToken) === false) this.error();
		return children;
	}, () => this.createSingleNodeList(this.Raw(null, false)));
	if (!this.eof) this.eat(22);
	return {
		type: "GeneralEnclosed",
		loc: this.getLocation(start, this.tokenStart),
		kind,
		function: functionName,
		children
	};
}
function generate$30(node) {
	if (node.function) this.token(2, node.function + "(");
	else this.token(21, "(");
	this.children(node);
	this.token(22, ")");
}
var name$29, structure$29;
var init_GeneralEnclosed = __esmMin((() => {
	init_tokenizer();
	name$29 = "GeneralEnclosed";
	structure$29 = {
		kind: String,
		function: [String, null],
		children: [[]]
	};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Hash.js
var Hash_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$29,
	name: () => name$28,
	parse: () => parse$29,
	structure: () => structure$28,
	xxx: () => "XXX"
});
function parse$29() {
	const start = this.tokenStart;
	this.eat(4);
	return {
		type: "Hash",
		loc: this.getLocation(start, this.tokenStart),
		value: this.substrToCursor(start + 1)
	};
}
function generate$29(node) {
	this.token(4, "#" + node.value);
}
var name$28, structure$28;
var init_Hash = __esmMin((() => {
	init_tokenizer();
	name$28 = "Hash";
	structure$28 = { value: String };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Identifier.js
var Identifier_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$28,
	name: () => name$27,
	parse: () => parse$28,
	structure: () => structure$27
});
function parse$28() {
	return {
		type: "Identifier",
		loc: this.getLocation(this.tokenStart, this.tokenEnd),
		name: this.consume(1)
	};
}
function generate$28(node) {
	this.token(1, node.name);
}
var name$27, structure$27;
var init_Identifier = __esmMin((() => {
	init_tokenizer();
	name$27 = "Identifier";
	structure$27 = { name: String };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/IdSelector.js
var IdSelector_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$27,
	name: () => name$26,
	parse: () => parse$27,
	structure: () => structure$26
});
function parse$27() {
	const start = this.tokenStart;
	this.eat(4);
	return {
		type: "IdSelector",
		loc: this.getLocation(start, this.tokenStart),
		name: this.substrToCursor(start + 1)
	};
}
function generate$27(node) {
	this.token(9, "#" + node.name);
}
var name$26, structure$26;
var init_IdSelector = __esmMin((() => {
	init_tokenizer();
	name$26 = "IdSelector";
	structure$26 = { name: String };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Layer.js
var Layer_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$26,
	name: () => name$25,
	parse: () => parse$26,
	structure: () => structure$25
});
function parse$26() {
	let tokenStart = this.tokenStart;
	let name = this.consume(1);
	while (this.isDelim(FULLSTOP$1)) {
		this.eat(9);
		name += "." + this.consume(1);
	}
	return {
		type: "Layer",
		loc: this.getLocation(tokenStart, this.tokenStart),
		name
	};
}
function generate$26(node) {
	this.tokenize(node.name);
}
var FULLSTOP$1, name$25, structure$25;
var init_Layer = __esmMin((() => {
	init_tokenizer();
	FULLSTOP$1 = 46;
	name$25 = "Layer";
	structure$25 = { name: String };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/LayerList.js
var LayerList_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$25,
	name: () => name$24,
	parse: () => parse$25,
	structure: () => structure$24
});
function parse$25() {
	const children = this.createList();
	this.skipSC();
	while (!this.eof) {
		children.push(this.Layer());
		if (this.lookupTypeNonSC(0) !== 18) break;
		this.skipSC();
		this.next();
		this.skipSC();
	}
	return {
		type: "LayerList",
		loc: this.getLocationFromList(children),
		children
	};
}
function generate$25(node) {
	this.children(node, () => this.token(18, ","));
}
var name$24, structure$24;
var init_LayerList = __esmMin((() => {
	init_tokenizer();
	name$24 = "LayerList";
	structure$24 = { children: [["Layer"]] };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/MediaQuery.js
var MediaQuery_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$24,
	name: () => name$23,
	parse: () => parse$24,
	structure: () => structure$23
});
function parse$24() {
	const start = this.tokenStart;
	let modifier = null;
	let mediaType = null;
	let condition = null;
	this.skipSC();
	if (this.tokenType === 1 && this.lookupTypeNonSC(1) !== 21) {
		const ident = this.consume(1);
		const identLowerCase = ident.toLowerCase();
		if (identLowerCase === "not" || identLowerCase === "only") {
			this.skipSC();
			modifier = identLowerCase;
			mediaType = this.consume(1);
		} else mediaType = ident;
		switch (this.lookupTypeNonSC(0)) {
			case 1:
				this.skipSC();
				this.eatIdent("and");
				condition = this.Condition("media");
				break;
			case 23:
			case 17:
			case 18:
			case 0: break;
			default: this.error("Identifier or parenthesis is expected");
		}
	} else switch (this.tokenType) {
		case 1:
		case 21:
		case 2:
			condition = this.Condition("media");
			break;
		case 23:
		case 17:
		case 0: break;
		default: this.error("Identifier or parenthesis is expected");
	}
	return {
		type: "MediaQuery",
		loc: this.getLocation(start, this.tokenStart),
		modifier,
		mediaType,
		condition
	};
}
function generate$24(node) {
	if (node.mediaType) {
		if (node.modifier) this.token(1, node.modifier);
		this.token(1, node.mediaType);
		if (node.condition) {
			this.token(1, "and");
			this.node(node.condition);
		}
	} else if (node.condition) this.node(node.condition);
}
var name$23, structure$23;
var init_MediaQuery = __esmMin((() => {
	init_tokenizer();
	name$23 = "MediaQuery";
	structure$23 = {
		modifier: [String, null],
		mediaType: [String, null],
		condition: ["Condition", null]
	};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/MediaQueryList.js
var MediaQueryList_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$23,
	name: () => name$22,
	parse: () => parse$23,
	structure: () => structure$22
});
function parse$23() {
	const children = this.createList();
	this.skipSC();
	while (!this.eof) {
		children.push(this.MediaQuery());
		if (this.tokenType !== 18) break;
		this.next();
	}
	return {
		type: "MediaQueryList",
		loc: this.getLocationFromList(children),
		children
	};
}
function generate$23(node) {
	this.children(node, () => this.token(18, ","));
}
var name$22, structure$22;
var init_MediaQueryList = __esmMin((() => {
	init_tokenizer();
	name$22 = "MediaQueryList";
	structure$22 = { children: [["MediaQuery"]] };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/NestingSelector.js
var NestingSelector_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$22,
	name: () => name$21,
	parse: () => parse$22,
	structure: () => structure$21
});
function parse$22() {
	const start = this.tokenStart;
	this.eatDelim(AMPERSAND$1);
	return {
		type: "NestingSelector",
		loc: this.getLocation(start, this.tokenStart)
	};
}
function generate$22() {
	this.token(9, "&");
}
var AMPERSAND$1, name$21, structure$21;
var init_NestingSelector = __esmMin((() => {
	init_tokenizer();
	AMPERSAND$1 = 38;
	name$21 = "NestingSelector";
	structure$21 = {};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Nth.js
var Nth_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$21,
	name: () => "Nth",
	parse: () => parse$21,
	structure: () => structure$20
});
function parse$21() {
	this.skipSC();
	const start = this.tokenStart;
	let end = start;
	let selector = null;
	let nth;
	if (this.lookupValue(0, "odd") || this.lookupValue(0, "even")) nth = this.Identifier();
	else nth = this.AnPlusB();
	end = this.tokenStart;
	this.skipSC();
	if (this.lookupValue(0, "of")) {
		this.next();
		selector = this.SelectorList();
		end = this.tokenStart;
	}
	return {
		type: "Nth",
		loc: this.getLocation(start, end),
		nth,
		selector
	};
}
function generate$21(node) {
	this.node(node.nth);
	if (node.selector !== null) {
		this.token(1, "of");
		this.node(node.selector);
	}
}
var structure$20;
var init_Nth = __esmMin((() => {
	init_tokenizer();
	structure$20 = {
		nth: ["AnPlusB", "Identifier"],
		selector: ["SelectorList", null]
	};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Number.js
var Number_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$20,
	name: () => name$19,
	parse: () => parse$20,
	structure: () => structure$19
});
function parse$20() {
	return {
		type: "Number",
		loc: this.getLocation(this.tokenStart, this.tokenEnd),
		value: this.consume(10)
	};
}
function generate$20(node) {
	this.token(10, node.value);
}
var name$19, structure$19;
var init_Number = __esmMin((() => {
	init_tokenizer();
	name$19 = "Number";
	structure$19 = { value: String };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Operator.js
var Operator_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$19,
	name: () => name$18,
	parse: () => parse$19,
	structure: () => structure$18
});
function parse$19() {
	const start = this.tokenStart;
	this.next();
	return {
		type: "Operator",
		loc: this.getLocation(start, this.tokenStart),
		value: this.substrToCursor(start)
	};
}
function generate$19(node) {
	this.tokenize(node.value);
}
var name$18, structure$18;
var init_Operator = __esmMin((() => {
	name$18 = "Operator";
	structure$18 = { value: String };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Parentheses.js
var Parentheses_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$18,
	name: () => name$17,
	parse: () => parse$18,
	structure: () => structure$17
});
function parse$18(readSequence, recognizer) {
	const start = this.tokenStart;
	let children = null;
	this.eat(21);
	children = readSequence.call(this, recognizer);
	if (!this.eof) this.eat(22);
	return {
		type: "Parentheses",
		loc: this.getLocation(start, this.tokenStart),
		children
	};
}
function generate$18(node) {
	this.token(21, "(");
	this.children(node);
	this.token(22, ")");
}
var name$17, structure$17;
var init_Parentheses = __esmMin((() => {
	init_tokenizer();
	name$17 = "Parentheses";
	structure$17 = { children: [[]] };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Percentage.js
var Percentage_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$17,
	name: () => name$16,
	parse: () => parse$17,
	structure: () => structure$16
});
function parse$17() {
	return {
		type: "Percentage",
		loc: this.getLocation(this.tokenStart, this.tokenEnd),
		value: this.consumeNumber(11)
	};
}
function generate$17(node) {
	this.token(11, node.value + "%");
}
var name$16, structure$16;
var init_Percentage = __esmMin((() => {
	init_tokenizer();
	name$16 = "Percentage";
	structure$16 = { value: String };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/PseudoClassSelector.js
var PseudoClassSelector_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$16,
	name: () => name$15,
	parse: () => parse$16,
	structure: () => structure$15,
	walkContext: () => walkContext$4
});
function parse$16() {
	const start = this.tokenStart;
	let children = null;
	let name;
	let nameLowerCase;
	this.eat(16);
	if (this.tokenType === 2) {
		name = this.consumeFunctionName();
		nameLowerCase = name.toLowerCase();
		if (this.lookupNonWSType(0) == 22) children = this.createList();
		else if (hasOwnProperty.call(this.pseudo, nameLowerCase)) {
			this.skipSC();
			children = this.pseudo[nameLowerCase].call(this);
			this.skipSC();
		} else {
			children = this.createList();
			children.push(this.Raw(null, false));
		}
		this.eat(22);
	} else name = this.consume(1);
	return {
		type: "PseudoClassSelector",
		loc: this.getLocation(start, this.tokenStart),
		name,
		children
	};
}
function generate$16(node) {
	this.token(16, ":");
	if (node.children === null) this.token(1, node.name);
	else {
		this.token(2, node.name + "(");
		this.children(node);
		this.token(22, ")");
	}
}
var name$15, walkContext$4, structure$15;
var init_PseudoClassSelector = __esmMin((() => {
	init_tokenizer();
	name$15 = "PseudoClassSelector";
	walkContext$4 = "function";
	structure$15 = {
		name: String,
		children: [["Raw"], null]
	};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/PseudoElementSelector.js
var PseudoElementSelector_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$15,
	name: () => name$14,
	parse: () => parse$15,
	structure: () => structure$14,
	walkContext: () => walkContext$3
});
function parse$15() {
	const start = this.tokenStart;
	let children = null;
	let name;
	let nameLowerCase;
	this.eat(16);
	this.eat(16);
	if (this.tokenType === 2) {
		name = this.consumeFunctionName();
		nameLowerCase = name.toLowerCase();
		if (this.lookupNonWSType(0) == 22) children = this.createList();
		else if (hasOwnProperty.call(this.pseudo, nameLowerCase)) {
			this.skipSC();
			children = this.pseudo[nameLowerCase].call(this);
			this.skipSC();
		} else {
			children = this.createList();
			children.push(this.Raw(null, false));
		}
		this.eat(22);
	} else name = this.consume(1);
	return {
		type: "PseudoElementSelector",
		loc: this.getLocation(start, this.tokenStart),
		name,
		children
	};
}
function generate$15(node) {
	this.token(16, ":");
	this.token(16, ":");
	if (node.children === null) this.token(1, node.name);
	else {
		this.token(2, node.name + "(");
		this.children(node);
		this.token(22, ")");
	}
}
var name$14, walkContext$3, structure$14;
var init_PseudoElementSelector = __esmMin((() => {
	init_tokenizer();
	name$14 = "PseudoElementSelector";
	walkContext$3 = "function";
	structure$14 = {
		name: String,
		children: [["Raw"], null]
	};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Ratio.js
var Ratio_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$14,
	name: () => name$13,
	parse: () => parse$14,
	structure: () => structure$13
});
function consumeTerm() {
	this.skipSC();
	switch (this.tokenType) {
		case 10: return this.Number();
		case 2: return this.Function(this.readSequence, this.scope.Value);
		default: this.error("Number of function is expected");
	}
}
function parse$14() {
	const start = this.tokenStart;
	const left = consumeTerm.call(this);
	let right = null;
	this.skipSC();
	if (this.isDelim(SOLIDUS$2)) {
		this.eatDelim(SOLIDUS$2);
		right = consumeTerm.call(this);
	}
	return {
		type: "Ratio",
		loc: this.getLocation(start, this.tokenStart),
		left,
		right
	};
}
function generate$14(node) {
	this.node(node.left);
	this.token(9, "/");
	if (node.right) this.node(node.right);
	else this.node(10, 1);
}
var SOLIDUS$2, name$13, structure$13;
var init_Ratio = __esmMin((() => {
	init_tokenizer();
	SOLIDUS$2 = 47;
	name$13 = "Ratio";
	structure$13 = {
		left: ["Number", "Function"],
		right: [
			"Number",
			"Function",
			null
		]
	};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Raw.js
var Raw_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$13,
	name: () => "Raw",
	parse: () => parse$13,
	structure: () => structure$12
});
function getOffsetExcludeWS() {
	if (this.tokenIndex > 0) {
		if (this.lookupType(-1) === 13) return this.tokenIndex > 1 ? this.getTokenStart(this.tokenIndex - 1) : this.firstCharOffset;
	}
	return this.tokenStart;
}
function parse$13(consumeUntil, excludeWhiteSpace) {
	const startOffset = this.getTokenStart(this.tokenIndex);
	let endOffset;
	this.skipUntilBalanced(this.tokenIndex, consumeUntil || this.consumeUntilBalanceEnd);
	if (excludeWhiteSpace && this.tokenStart > startOffset) endOffset = getOffsetExcludeWS.call(this);
	else endOffset = this.tokenStart;
	return {
		type: "Raw",
		loc: this.getLocation(startOffset, endOffset),
		value: this.substring(startOffset, endOffset)
	};
}
function generate$13(node) {
	this.tokenize(node.value);
}
var structure$12;
var init_Raw = __esmMin((() => {
	init_tokenizer();
	structure$12 = { value: String };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Rule.js
var Rule_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$12,
	name: () => name$11,
	parse: () => parse$12,
	structure: () => structure$11,
	walkContext: () => walkContext$2
});
function consumeRaw$1() {
	return this.Raw(this.consumeUntilLeftCurlyBracket, true);
}
function consumePrelude() {
	const prelude = this.SelectorList();
	if (prelude.type !== "Raw" && this.eof === false && this.tokenType !== 23) this.error();
	return prelude;
}
function parse$12() {
	const startToken = this.tokenIndex;
	const startOffset = this.tokenStart;
	let prelude;
	let block;
	if (this.parseRulePrelude) prelude = this.parseWithFallback(consumePrelude, consumeRaw$1);
	else prelude = consumeRaw$1.call(this, startToken);
	block = this.Block(true);
	return {
		type: "Rule",
		loc: this.getLocation(startOffset, this.tokenStart),
		prelude,
		block
	};
}
function generate$12(node) {
	this.node(node.prelude);
	this.node(node.block);
}
var name$11, walkContext$2, structure$11;
var init_Rule = __esmMin((() => {
	init_tokenizer();
	name$11 = "Rule";
	walkContext$2 = "rule";
	structure$11 = {
		prelude: ["SelectorList", "Raw"],
		block: ["Block"]
	};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Scope.js
var Scope_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$11,
	name: () => name$10,
	parse: () => parse$11,
	structure: () => structure$10
});
function parse$11() {
	let root = null;
	let limit = null;
	this.skipSC();
	const startOffset = this.tokenStart;
	if (this.tokenType === 21) {
		this.next();
		this.skipSC();
		root = this.parseWithFallback(this.SelectorList, () => this.Raw(false, true));
		this.skipSC();
		this.eat(22);
	}
	if (this.lookupNonWSType(0) === 1) {
		this.skipSC();
		this.eatIdent("to");
		this.skipSC();
		this.eat(21);
		this.skipSC();
		limit = this.parseWithFallback(this.SelectorList, () => this.Raw(false, true));
		this.skipSC();
		this.eat(22);
	}
	return {
		type: "Scope",
		loc: this.getLocation(startOffset, this.tokenStart),
		root,
		limit
	};
}
function generate$11(node) {
	if (node.root) {
		this.token(21, "(");
		this.node(node.root);
		this.token(22, ")");
	}
	if (node.limit) {
		this.token(1, "to");
		this.token(21, "(");
		this.node(node.limit);
		this.token(22, ")");
	}
}
var name$10, structure$10;
var init_Scope = __esmMin((() => {
	init_tokenizer();
	name$10 = "Scope";
	structure$10 = {
		root: [
			"SelectorList",
			"Raw",
			null
		],
		limit: [
			"SelectorList",
			"Raw",
			null
		]
	};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Selector.js
var Selector_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$10,
	name: () => name$9,
	parse: () => parse$10,
	structure: () => structure$9
});
function parse$10() {
	const children = this.readSequence(this.scope.Selector);
	if (this.getFirstListNode(children) === null) this.error("Selector is expected");
	return {
		type: "Selector",
		loc: this.getLocationFromList(children),
		children
	};
}
function generate$10(node) {
	this.children(node);
}
var name$9, structure$9;
var init_Selector = __esmMin((() => {
	name$9 = "Selector";
	structure$9 = { children: [[
		"TypeSelector",
		"IdSelector",
		"ClassSelector",
		"AttributeSelector",
		"PseudoClassSelector",
		"PseudoElementSelector",
		"Combinator"
	]] };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/SelectorList.js
var SelectorList_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$9,
	name: () => name$8,
	parse: () => parse$9,
	structure: () => structure$8,
	walkContext: () => walkContext$1
});
function parse$9() {
	const children = this.createList();
	while (!this.eof) {
		children.push(this.Selector());
		if (this.tokenType === 18) {
			this.next();
			continue;
		}
		break;
	}
	return {
		type: "SelectorList",
		loc: this.getLocationFromList(children),
		children
	};
}
function generate$9(node) {
	this.children(node, () => this.token(18, ","));
}
var name$8, walkContext$1, structure$8;
var init_SelectorList = __esmMin((() => {
	init_tokenizer();
	name$8 = "SelectorList";
	walkContext$1 = "selector";
	structure$8 = { children: [["Selector", "Raw"]] };
}));
//#endregion
//#region node_modules/css-tree/lib/utils/string.js
function decode$1(str) {
	const len = str.length;
	const firstChar = str.charCodeAt(0);
	const start = firstChar === QUOTATION_MARK$1 || firstChar === APOSTROPHE$1 ? 1 : 0;
	const end = start === 1 && len > 1 && str.charCodeAt(len - 1) === firstChar ? len - 2 : len - 1;
	let decoded = "";
	for (let i = start; i <= end; i++) {
		let code = str.charCodeAt(i);
		if (code === REVERSE_SOLIDUS$1) {
			if (i === end) {
				if (i !== len - 1) decoded = str.substr(i + 1);
				break;
			}
			code = str.charCodeAt(++i);
			if (isValidEscape(REVERSE_SOLIDUS$1, code)) {
				const escapeStart = i - 1;
				const escapeEnd = consumeEscaped(str, escapeStart);
				i = escapeEnd - 1;
				decoded += decodeEscaped(str.substring(escapeStart + 1, escapeEnd));
			} else if (code === 13 && str.charCodeAt(i + 1) === 10) i++;
		} else decoded += str[i];
	}
	return decoded;
}
function encode$1(str, apostrophe) {
	const quote = apostrophe ? "'" : "\"";
	const quoteCode = apostrophe ? APOSTROPHE$1 : QUOTATION_MARK$1;
	let encoded = "";
	let wsBeforeHexIsNeeded = false;
	for (let i = 0; i < str.length; i++) {
		const code = str.charCodeAt(i);
		if (code === 0) {
			encoded += "�";
			continue;
		}
		if (code <= 31 || code === 127) {
			encoded += "\\" + code.toString(16);
			wsBeforeHexIsNeeded = true;
			continue;
		}
		if (code === quoteCode || code === REVERSE_SOLIDUS$1) {
			encoded += "\\" + str.charAt(i);
			wsBeforeHexIsNeeded = false;
		} else {
			if (wsBeforeHexIsNeeded && (isHexDigit(code) || isWhiteSpace(code))) encoded += " ";
			encoded += str.charAt(i);
			wsBeforeHexIsNeeded = false;
		}
	}
	return quote + encoded + quote;
}
var REVERSE_SOLIDUS$1, QUOTATION_MARK$1, APOSTROPHE$1;
var init_string = __esmMin((() => {
	init_tokenizer();
	REVERSE_SOLIDUS$1 = 92;
	QUOTATION_MARK$1 = 34;
	APOSTROPHE$1 = 39;
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/String.js
var String_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$8,
	name: () => name$7,
	parse: () => parse$8,
	structure: () => structure$7
});
function parse$8() {
	return {
		type: "String",
		loc: this.getLocation(this.tokenStart, this.tokenEnd),
		value: decode$1(this.consume(5))
	};
}
function generate$8(node) {
	this.token(5, encode$1(node.value));
}
var name$7, structure$7;
var init_String = __esmMin((() => {
	init_tokenizer();
	init_string();
	name$7 = "String";
	structure$7 = { value: String };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/StyleSheet.js
var StyleSheet_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$7,
	name: () => name$6,
	parse: () => parse$7,
	structure: () => structure$6,
	walkContext: () => walkContext
});
function consumeRaw() {
	return this.Raw(null, false);
}
function parse$7() {
	const start = this.tokenStart;
	const children = this.createList();
	let child;
	scan: while (!this.eof) {
		switch (this.tokenType) {
			case 13:
				this.next();
				continue;
			case 25:
				if (this.charCodeAt(this.tokenStart + 2) !== EXCLAMATIONMARK) {
					this.next();
					continue;
				}
				child = this.Comment();
				break;
			case 14:
				child = this.CDO();
				break;
			case 15:
				child = this.CDC();
				break;
			case 3:
				child = this.parseWithFallback(this.Atrule, consumeRaw);
				break;
			default: child = this.parseWithFallback(this.Rule, consumeRaw);
		}
		children.push(child);
	}
	return {
		type: "StyleSheet",
		loc: this.getLocation(start, this.tokenStart),
		children
	};
}
function generate$7(node) {
	this.children(node);
}
var EXCLAMATIONMARK, name$6, walkContext, structure$6;
var init_StyleSheet = __esmMin((() => {
	init_tokenizer();
	EXCLAMATIONMARK = 33;
	name$6 = "StyleSheet";
	walkContext = "stylesheet";
	structure$6 = { children: [[
		"Comment",
		"CDO",
		"CDC",
		"Atrule",
		"Rule",
		"Raw"
	]] };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/SupportsDeclaration.js
var SupportsDeclaration_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$6,
	name: () => name$5,
	parse: () => parse$6,
	structure: () => structure$5
});
function parse$6() {
	const start = this.tokenStart;
	this.eat(21);
	this.skipSC();
	const declaration = this.Declaration();
	if (!this.eof) this.eat(22);
	return {
		type: "SupportsDeclaration",
		loc: this.getLocation(start, this.tokenStart),
		declaration
	};
}
function generate$6(node) {
	this.token(21, "(");
	this.node(node.declaration);
	this.token(22, ")");
}
var name$5, structure$5;
var init_SupportsDeclaration = __esmMin((() => {
	init_tokenizer();
	name$5 = "SupportsDeclaration";
	structure$5 = { declaration: "Declaration" };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/TypeSelector.js
var TypeSelector_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$5,
	name: () => name$4,
	parse: () => parse$5,
	structure: () => structure$4
});
function eatIdentifierOrAsterisk() {
	if (this.tokenType !== 1 && this.isDelim(ASTERISK$2) === false) this.error("Identifier or asterisk is expected");
	this.next();
}
function parse$5() {
	const start = this.tokenStart;
	if (this.isDelim(VERTICALLINE$1)) {
		this.next();
		eatIdentifierOrAsterisk.call(this);
	} else {
		eatIdentifierOrAsterisk.call(this);
		if (this.isDelim(VERTICALLINE$1)) {
			this.next();
			eatIdentifierOrAsterisk.call(this);
		}
	}
	return {
		type: "TypeSelector",
		loc: this.getLocation(start, this.tokenStart),
		name: this.substrToCursor(start)
	};
}
function generate$5(node) {
	this.tokenize(node.name);
}
var ASTERISK$2, VERTICALLINE$1, name$4, structure$4;
var init_TypeSelector = __esmMin((() => {
	init_tokenizer();
	ASTERISK$2 = 42;
	VERTICALLINE$1 = 124;
	name$4 = "TypeSelector";
	structure$4 = { name: String };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/UnicodeRange.js
var UnicodeRange_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$4,
	name: () => name$3,
	parse: () => parse$4,
	structure: () => structure$3
});
function eatHexSequence(offset, allowDash) {
	let len = 0;
	for (let pos = this.tokenStart + offset; pos < this.tokenEnd; pos++) {
		const code = this.charCodeAt(pos);
		if (code === HYPHENMINUS$1 && allowDash && len !== 0) {
			eatHexSequence.call(this, offset + len + 1, false);
			return -1;
		}
		if (!isHexDigit(code)) this.error(allowDash && len !== 0 ? "Hyphen minus" + (len < 6 ? " or hex digit" : "") + " is expected" : len < 6 ? "Hex digit is expected" : "Unexpected input", pos);
		if (++len > 6) this.error("Too many hex digits", pos);
	}
	this.next();
	return len;
}
function eatQuestionMarkSequence(max) {
	let count = 0;
	while (this.isDelim(QUESTIONMARK)) {
		if (++count > max) this.error("Too many question marks");
		this.next();
	}
}
function startsWith(code) {
	if (this.charCodeAt(this.tokenStart) !== code) this.error((code === PLUSSIGN$2 ? "Plus sign" : "Hyphen minus") + " is expected");
}
function scanUnicodeRange() {
	let hexLength = 0;
	switch (this.tokenType) {
		case 10:
			hexLength = eatHexSequence.call(this, 1, true);
			if (this.isDelim(QUESTIONMARK)) {
				eatQuestionMarkSequence.call(this, 6 - hexLength);
				break;
			}
			if (this.tokenType === 12 || this.tokenType === 10) {
				startsWith.call(this, HYPHENMINUS$1);
				eatHexSequence.call(this, 1, false);
				break;
			}
			break;
		case 12:
			hexLength = eatHexSequence.call(this, 1, true);
			if (hexLength > 0) eatQuestionMarkSequence.call(this, 6 - hexLength);
			break;
		default:
			this.eatDelim(PLUSSIGN$2);
			if (this.tokenType === 1) {
				hexLength = eatHexSequence.call(this, 0, true);
				if (hexLength > 0) eatQuestionMarkSequence.call(this, 6 - hexLength);
				break;
			}
			if (this.isDelim(QUESTIONMARK)) {
				this.next();
				eatQuestionMarkSequence.call(this, 5);
				break;
			}
			this.error("Hex digit or question mark is expected");
	}
}
function parse$4() {
	const start = this.tokenStart;
	this.eatIdent("u");
	scanUnicodeRange.call(this);
	return {
		type: "UnicodeRange",
		loc: this.getLocation(start, this.tokenStart),
		value: this.substrToCursor(start)
	};
}
function generate$4(node) {
	this.tokenize(node.value);
}
var PLUSSIGN$2, HYPHENMINUS$1, QUESTIONMARK, name$3, structure$3;
var init_UnicodeRange = __esmMin((() => {
	init_tokenizer();
	PLUSSIGN$2 = 43;
	HYPHENMINUS$1 = 45;
	QUESTIONMARK = 63;
	name$3 = "UnicodeRange";
	structure$3 = { value: String };
}));
//#endregion
//#region node_modules/css-tree/lib/utils/url.js
function decode(str) {
	const len = str.length;
	let start = 4;
	let end = str.charCodeAt(len - 1) === RIGHTPARENTHESIS ? len - 2 : len - 1;
	let decoded = "";
	while (start < end && isWhiteSpace(str.charCodeAt(start))) start++;
	while (start < end && isWhiteSpace(str.charCodeAt(end))) end--;
	for (let i = start; i <= end; i++) {
		let code = str.charCodeAt(i);
		if (code === REVERSE_SOLIDUS) {
			if (i === end) {
				if (i !== len - 1) decoded = str.substr(i + 1);
				break;
			}
			code = str.charCodeAt(++i);
			if (isValidEscape(REVERSE_SOLIDUS, code)) {
				const escapeStart = i - 1;
				const escapeEnd = consumeEscaped(str, escapeStart);
				i = escapeEnd - 1;
				decoded += decodeEscaped(str.substring(escapeStart + 1, escapeEnd));
			} else if (code === 13 && str.charCodeAt(i + 1) === 10) i++;
		} else decoded += str[i];
	}
	return decoded;
}
function encode(str) {
	let encoded = "";
	let wsBeforeHexIsNeeded = false;
	for (let i = 0; i < str.length; i++) {
		const code = str.charCodeAt(i);
		if (code === 0) {
			encoded += "�";
			continue;
		}
		if (code <= 31 || code === 127) {
			encoded += "\\" + code.toString(16);
			wsBeforeHexIsNeeded = true;
			continue;
		}
		if (code === SPACE$1 || code === REVERSE_SOLIDUS || code === QUOTATION_MARK || code === APOSTROPHE || code === LEFTPARENTHESIS || code === RIGHTPARENTHESIS) {
			encoded += "\\" + str.charAt(i);
			wsBeforeHexIsNeeded = false;
		} else {
			if (wsBeforeHexIsNeeded && isHexDigit(code)) encoded += " ";
			encoded += str.charAt(i);
			wsBeforeHexIsNeeded = false;
		}
	}
	return "url(" + encoded + ")";
}
var SPACE$1, REVERSE_SOLIDUS, QUOTATION_MARK, APOSTROPHE, LEFTPARENTHESIS, RIGHTPARENTHESIS;
var init_url = __esmMin((() => {
	init_tokenizer();
	SPACE$1 = 32;
	REVERSE_SOLIDUS = 92;
	QUOTATION_MARK = 34;
	APOSTROPHE = 39;
	LEFTPARENTHESIS = 40;
	RIGHTPARENTHESIS = 41;
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Url.js
var Url_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$3,
	name: () => "Url",
	parse: () => parse$3,
	structure: () => structure$2
});
function parse$3() {
	const start = this.tokenStart;
	let value;
	switch (this.tokenType) {
		case 7:
			value = decode(this.consume(7));
			break;
		case 2:
			if (!this.cmpStr(this.tokenStart, this.tokenEnd, "url(")) this.error("Function name must be `url`");
			this.eat(2);
			this.skipSC();
			value = decode$1(this.consume(5));
			this.skipSC();
			if (!this.eof) this.eat(22);
			break;
		default: this.error("Url or Function is expected");
	}
	return {
		type: "Url",
		loc: this.getLocation(start, this.tokenStart),
		value
	};
}
function generate$3(node) {
	this.token(7, encode(node.value));
}
var structure$2;
var init_Url = __esmMin((() => {
	init_url();
	init_string();
	init_tokenizer();
	structure$2 = { value: String };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/Value.js
var Value_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$2,
	name: () => name$1,
	parse: () => parse$2,
	structure: () => structure$1
});
function parse$2() {
	const start = this.tokenStart;
	const children = this.readSequence(this.scope.Value);
	return {
		type: "Value",
		loc: this.getLocation(start, this.tokenStart),
		children
	};
}
function generate$2(node) {
	this.children(node);
}
var name$1, structure$1;
var init_Value = __esmMin((() => {
	name$1 = "Value";
	structure$1 = { children: [[]] };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/WhiteSpace.js
var WhiteSpace_exports = /* @__PURE__ */ __exportAll({
	generate: () => generate$1,
	name: () => name,
	parse: () => parse$1,
	structure: () => structure
});
function parse$1() {
	this.eat(13);
	return SPACE;
}
function generate$1(node) {
	this.token(13, node.value);
}
var SPACE, name, structure;
var init_WhiteSpace = __esmMin((() => {
	init_tokenizer();
	SPACE = Object.freeze({
		type: "WhiteSpace",
		loc: null,
		value: " "
	});
	name = "WhiteSpace";
	structure = { value: String };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/index.js
var node_exports = /* @__PURE__ */ __exportAll({
	AnPlusB: () => AnPlusB_exports,
	Atrule: () => Atrule_exports,
	AtrulePrelude: () => AtrulePrelude_exports,
	AttributeSelector: () => AttributeSelector_exports,
	Block: () => Block_exports,
	Brackets: () => Brackets_exports,
	CDC: () => CDC_exports,
	CDO: () => CDO_exports,
	ClassSelector: () => ClassSelector_exports,
	Combinator: () => Combinator_exports,
	Comment: () => Comment_exports,
	Condition: () => Condition_exports,
	Declaration: () => Declaration_exports,
	DeclarationList: () => DeclarationList_exports,
	Dimension: () => Dimension_exports,
	Feature: () => Feature_exports,
	FeatureFunction: () => FeatureFunction_exports,
	FeatureRange: () => FeatureRange_exports,
	Function: () => Function_exports,
	GeneralEnclosed: () => GeneralEnclosed_exports,
	Hash: () => Hash_exports,
	IdSelector: () => IdSelector_exports,
	Identifier: () => Identifier_exports,
	Layer: () => Layer_exports,
	LayerList: () => LayerList_exports,
	MediaQuery: () => MediaQuery_exports,
	MediaQueryList: () => MediaQueryList_exports,
	NestingSelector: () => NestingSelector_exports,
	Nth: () => Nth_exports,
	Number: () => Number_exports,
	Operator: () => Operator_exports,
	Parentheses: () => Parentheses_exports,
	Percentage: () => Percentage_exports,
	PseudoClassSelector: () => PseudoClassSelector_exports,
	PseudoElementSelector: () => PseudoElementSelector_exports,
	Ratio: () => Ratio_exports,
	Raw: () => Raw_exports,
	Rule: () => Rule_exports,
	Scope: () => Scope_exports,
	Selector: () => Selector_exports,
	SelectorList: () => SelectorList_exports,
	String: () => String_exports,
	StyleSheet: () => StyleSheet_exports,
	SupportsDeclaration: () => SupportsDeclaration_exports,
	TypeSelector: () => TypeSelector_exports,
	UnicodeRange: () => UnicodeRange_exports,
	Url: () => Url_exports,
	Value: () => Value_exports,
	WhiteSpace: () => WhiteSpace_exports
});
var init_node = __esmMin((() => {
	init_AnPlusB();
	init_Atrule();
	init_AtrulePrelude();
	init_AttributeSelector();
	init_Block();
	init_Brackets();
	init_CDC();
	init_CDO();
	init_ClassSelector();
	init_Combinator();
	init_Comment();
	init_Condition();
	init_Declaration();
	init_DeclarationList();
	init_Dimension();
	init_Feature();
	init_FeatureFunction();
	init_FeatureRange();
	init_Function();
	init_GeneralEnclosed();
	init_Hash();
	init_Identifier();
	init_IdSelector();
	init_Layer();
	init_LayerList();
	init_MediaQuery();
	init_MediaQueryList();
	init_NestingSelector();
	init_Nth();
	init_Number();
	init_Operator();
	init_Parentheses();
	init_Percentage();
	init_PseudoClassSelector();
	init_PseudoElementSelector();
	init_Ratio();
	init_Raw();
	init_Rule();
	init_Scope();
	init_Selector();
	init_SelectorList();
	init_String();
	init_StyleSheet();
	init_SupportsDeclaration();
	init_TypeSelector();
	init_UnicodeRange();
	init_Url();
	init_Value();
	init_WhiteSpace();
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/config/lexer.js
var lexer_default;
var init_lexer = __esmMin((() => {
	init_generic_const();
	init_data();
	init_node();
	lexer_default = {
		generic: true,
		cssWideKeywords,
		...data_default,
		node: node_exports
	};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/scope/default.js
function defaultRecognizer(context) {
	switch (this.tokenType) {
		case 4: return this.Hash();
		case 18: return this.Operator();
		case 21: return this.Parentheses(this.readSequence, context.recognizer);
		case 19: return this.Brackets(this.readSequence, context.recognizer);
		case 5: return this.String();
		case 12: return this.Dimension();
		case 11: return this.Percentage();
		case 10: return this.Number();
		case 2: return this.cmpStr(this.tokenStart, this.tokenEnd, "url(") ? this.Url() : this.Function(this.readSequence, context.recognizer);
		case 7: return this.Url();
		case 1: if (this.cmpChar(this.tokenStart, U) && this.cmpChar(this.tokenStart + 1, PLUSSIGN$1)) return this.UnicodeRange();
		else return this.Identifier();
		case 9: {
			const code = this.charCodeAt(this.tokenStart);
			if (code === SOLIDUS$1 || code === ASTERISK$1 || code === PLUSSIGN$1 || code === HYPHENMINUS) return this.Operator();
			if (code === NUMBERSIGN$1) this.error("Hex or identifier is expected", this.tokenStart + 1);
			break;
		}
	}
}
var NUMBERSIGN$1, ASTERISK$1, PLUSSIGN$1, HYPHENMINUS, SOLIDUS$1, U;
var init_default = __esmMin((() => {
	init_tokenizer();
	NUMBERSIGN$1 = 35;
	ASTERISK$1 = 42;
	PLUSSIGN$1 = 43;
	HYPHENMINUS = 45;
	SOLIDUS$1 = 47;
	U = 117;
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/scope/atrulePrelude.js
var atrulePrelude_default;
var init_atrulePrelude = __esmMin((() => {
	init_default();
	atrulePrelude_default = { getNode: defaultRecognizer };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/scope/selector.js
function onWhiteSpace(next, children) {
	if (children.last !== null && children.last.type !== "Combinator" && next !== null && next.type !== "Combinator") children.push({
		type: "Combinator",
		loc: null,
		name: " "
	});
}
function getNode() {
	switch (this.tokenType) {
		case 19: return this.AttributeSelector();
		case 4: return this.IdSelector();
		case 16: if (this.lookupType(1) === 16) return this.PseudoElementSelector();
		else return this.PseudoClassSelector();
		case 1: return this.TypeSelector();
		case 10:
		case 11: return this.Percentage();
		case 12:
			if (this.charCodeAt(this.tokenStart) === FULLSTOP) this.error("Identifier is expected", this.tokenStart + 1);
			break;
		case 9:
			switch (this.charCodeAt(this.tokenStart)) {
				case PLUSSIGN:
				case GREATERTHANSIGN:
				case TILDE:
				case SOLIDUS: return this.Combinator();
				case FULLSTOP: return this.ClassSelector();
				case ASTERISK:
				case VERTICALLINE: return this.TypeSelector();
				case NUMBERSIGN: return this.IdSelector();
				case AMPERSAND: return this.NestingSelector();
			}
			break;
	}
}
var NUMBERSIGN, AMPERSAND, ASTERISK, PLUSSIGN, SOLIDUS, FULLSTOP, GREATERTHANSIGN, VERTICALLINE, TILDE, selector_default;
var init_selector = __esmMin((() => {
	init_tokenizer();
	NUMBERSIGN = 35;
	AMPERSAND = 38;
	ASTERISK = 42;
	PLUSSIGN = 43;
	SOLIDUS = 47;
	FULLSTOP = 46;
	GREATERTHANSIGN = 62;
	VERTICALLINE = 124;
	TILDE = 126;
	selector_default = {
		onWhiteSpace,
		getNode
	};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/function/expression.js
function expression_default() {
	return this.createSingleNodeList(this.Raw(null, false));
}
var init_expression = __esmMin((() => {}));
//#endregion
//#region node_modules/css-tree/lib/syntax/function/var.js
function var_default() {
	const children = this.createList();
	this.skipSC();
	children.push(this.Identifier());
	this.skipSC();
	if (this.tokenType === 18) {
		children.push(this.Operator());
		const startIndex = this.tokenIndex;
		const value = this.parseCustomProperty ? this.Value(null) : this.Raw(this.consumeUntilExclamationMarkOrSemicolon, false);
		if (value.type === "Value" && value.children.isEmpty) {
			for (let offset = startIndex - this.tokenIndex; offset <= 0; offset++) if (this.lookupType(offset) === 13) {
				value.children.appendData({
					type: "WhiteSpace",
					loc: null,
					value: " "
				});
				break;
			}
		}
		children.push(value);
	}
	return children;
}
var init_var = __esmMin((() => {
	init_tokenizer();
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/scope/value.js
function isPlusMinusOperator(node) {
	return node !== null && node.type === "Operator" && (node.value[node.value.length - 1] === "-" || node.value[node.value.length - 1] === "+");
}
var value_default;
var init_value = __esmMin((() => {
	init_default();
	init_expression();
	init_var();
	value_default = {
		getNode: defaultRecognizer,
		onWhiteSpace(next, children) {
			if (isPlusMinusOperator(next)) next.value = " " + next.value;
			if (isPlusMinusOperator(children.last)) children.last.value += " ";
		},
		"expression": expression_default,
		"var": var_default
	};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/scope/index.js
var scope_exports = /* @__PURE__ */ __exportAll({
	AtrulePrelude: () => atrulePrelude_default,
	Selector: () => selector_default,
	Value: () => value_default
});
var init_scope$1 = __esmMin((() => {
	init_atrulePrelude();
	init_selector();
	init_value();
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/atrule/container.js
var nonContainerNameKeywords, container_default;
var init_container = __esmMin((() => {
	init_tokenizer();
	nonContainerNameKeywords = new Set([
		"none",
		"and",
		"not",
		"or"
	]);
	container_default = { parse: {
		prelude() {
			const children = this.createList();
			if (this.tokenType === 1) {
				const name = this.substring(this.tokenStart, this.tokenEnd);
				if (!nonContainerNameKeywords.has(name.toLowerCase())) children.push(this.Identifier());
			}
			children.push(this.Condition("container"));
			return children;
		},
		block(nested = false) {
			return this.Block(nested);
		}
	} };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/atrule/font-face.js
var font_face_default;
var init_font_face = __esmMin((() => {
	font_face_default = { parse: {
		prelude: null,
		block() {
			return this.Block(true);
		}
	} };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/atrule/import.js
function parseWithFallback(parse, fallback) {
	return this.parseWithFallback(() => {
		try {
			return parse.call(this);
		} finally {
			this.skipSC();
			if (this.lookupNonWSType(0) !== 22) this.error();
		}
	}, fallback || (() => this.Raw(null, true)));
}
var parseFunctions, import_default;
var init_import = __esmMin((() => {
	init_tokenizer();
	parseFunctions = {
		layer() {
			this.skipSC();
			const children = this.createList();
			const node = parseWithFallback.call(this, this.Layer);
			if (node.type !== "Raw" || node.value !== "") children.push(node);
			return children;
		},
		supports() {
			this.skipSC();
			const children = this.createList();
			const node = parseWithFallback.call(this, this.Declaration, () => parseWithFallback.call(this, () => this.Condition("supports")));
			if (node.type !== "Raw" || node.value !== "") children.push(node);
			return children;
		}
	};
	import_default = { parse: {
		prelude() {
			const children = this.createList();
			switch (this.tokenType) {
				case 5:
					children.push(this.String());
					break;
				case 7:
				case 2:
					children.push(this.Url());
					break;
				default: this.error("String or url() is expected");
			}
			this.skipSC();
			if (this.tokenType === 1 && this.cmpStr(this.tokenStart, this.tokenEnd, "layer")) children.push(this.Identifier());
			else if (this.tokenType === 2 && this.cmpStr(this.tokenStart, this.tokenEnd, "layer(")) children.push(this.Function(null, parseFunctions));
			this.skipSC();
			if (this.tokenType === 2 && this.cmpStr(this.tokenStart, this.tokenEnd, "supports(")) children.push(this.Function(null, parseFunctions));
			if (this.lookupNonWSType(0) === 1 || this.lookupNonWSType(0) === 21) children.push(this.MediaQueryList());
			return children;
		},
		block: null
	} };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/atrule/layer.js
var layer_default;
var init_layer = __esmMin((() => {
	layer_default = { parse: {
		prelude() {
			return this.createSingleNodeList(this.LayerList());
		},
		block() {
			return this.Block(false);
		}
	} };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/atrule/media.js
var media_default;
var init_media = __esmMin((() => {
	media_default = { parse: {
		prelude() {
			return this.createSingleNodeList(this.MediaQueryList());
		},
		block(nested = false) {
			return this.Block(nested);
		}
	} };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/atrule/nest.js
var nest_default;
var init_nest = __esmMin((() => {
	nest_default = { parse: {
		prelude() {
			return this.createSingleNodeList(this.SelectorList());
		},
		block() {
			return this.Block(true);
		}
	} };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/atrule/page.js
var page_default;
var init_page = __esmMin((() => {
	page_default = { parse: {
		prelude() {
			return this.createSingleNodeList(this.SelectorList());
		},
		block() {
			return this.Block(true);
		}
	} };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/atrule/scope.js
var scope_default;
var init_scope = __esmMin((() => {
	scope_default = { parse: {
		prelude() {
			return this.createSingleNodeList(this.Scope());
		},
		block(nested = false) {
			return this.Block(nested);
		}
	} };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/atrule/starting-style.js
var starting_style_default;
var init_starting_style = __esmMin((() => {
	starting_style_default = { parse: {
		prelude: null,
		block(nested = false) {
			return this.Block(nested);
		}
	} };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/atrule/supports.js
var supports_default;
var init_supports = __esmMin((() => {
	supports_default = { parse: {
		prelude() {
			return this.createSingleNodeList(this.Condition("supports"));
		},
		block(nested = false) {
			return this.Block(nested);
		}
	} };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/atrule/index.js
var atrule_default;
var init_atrule = __esmMin((() => {
	init_container();
	init_font_face();
	init_import();
	init_layer();
	init_media();
	init_nest();
	init_page();
	init_scope();
	init_starting_style();
	init_supports();
	atrule_default = {
		container: container_default,
		"font-face": font_face_default,
		import: import_default,
		layer: layer_default,
		media: media_default,
		nest: nest_default,
		page: page_default,
		scope: scope_default,
		"starting-style": starting_style_default,
		supports: supports_default
	};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/pseudo/lang.js
function parseLanguageRangeList() {
	const children = this.createList();
	this.skipSC();
	loop: while (!this.eof) {
		switch (this.tokenType) {
			case 1:
				children.push(this.Identifier());
				break;
			case 5:
				children.push(this.String());
				break;
			case 18:
				children.push(this.Operator());
				break;
			case 22: break loop;
			default: this.error("Identifier, string or comma is expected");
		}
		this.skipSC();
	}
	return children;
}
var init_lang = __esmMin((() => {
	init_tokenizer();
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/pseudo/index.js
var selectorList, selector, identList, langList, nth, pseudo_default;
var init_pseudo = __esmMin((() => {
	init_lang();
	selectorList = { parse() {
		return this.createSingleNodeList(this.SelectorList());
	} };
	selector = { parse() {
		return this.createSingleNodeList(this.Selector());
	} };
	identList = { parse() {
		return this.createSingleNodeList(this.Identifier());
	} };
	langList = { parse: parseLanguageRangeList };
	nth = { parse() {
		return this.createSingleNodeList(this.Nth());
	} };
	pseudo_default = {
		"dir": identList,
		"has": selectorList,
		"lang": langList,
		"matches": selectorList,
		"is": selectorList,
		"-moz-any": selectorList,
		"-webkit-any": selectorList,
		"where": selectorList,
		"not": selectorList,
		"nth-child": nth,
		"nth-last-child": nth,
		"nth-last-of-type": nth,
		"nth-of-type": nth,
		"slotted": selector,
		"host": selector,
		"host-context": selector
	};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/node/index-parse.js
var index_parse_exports = /* @__PURE__ */ __exportAll({
	AnPlusB: () => parse$49,
	Atrule: () => parse$48,
	AtrulePrelude: () => parse$47,
	AttributeSelector: () => parse$46,
	Block: () => parse$45,
	Brackets: () => parse$44,
	CDC: () => parse$43,
	CDO: () => parse$42,
	ClassSelector: () => parse$41,
	Combinator: () => parse$40,
	Comment: () => parse$39,
	Condition: () => parse$38,
	Declaration: () => parse$37,
	DeclarationList: () => parse$36,
	Dimension: () => parse$35,
	Feature: () => parse$34,
	FeatureFunction: () => parse$33,
	FeatureRange: () => parse$32,
	Function: () => parse$31,
	GeneralEnclosed: () => parse$30,
	Hash: () => parse$29,
	IdSelector: () => parse$27,
	Identifier: () => parse$28,
	Layer: () => parse$26,
	LayerList: () => parse$25,
	MediaQuery: () => parse$24,
	MediaQueryList: () => parse$23,
	NestingSelector: () => parse$22,
	Nth: () => parse$21,
	Number: () => parse$20,
	Operator: () => parse$19,
	Parentheses: () => parse$18,
	Percentage: () => parse$17,
	PseudoClassSelector: () => parse$16,
	PseudoElementSelector: () => parse$15,
	Ratio: () => parse$14,
	Raw: () => parse$13,
	Rule: () => parse$12,
	Scope: () => parse$11,
	Selector: () => parse$10,
	SelectorList: () => parse$9,
	String: () => parse$8,
	StyleSheet: () => parse$7,
	SupportsDeclaration: () => parse$6,
	TypeSelector: () => parse$5,
	UnicodeRange: () => parse$4,
	Url: () => parse$3,
	Value: () => parse$2,
	WhiteSpace: () => parse$1
});
var init_index_parse = __esmMin((() => {
	init_AnPlusB();
	init_Atrule();
	init_AtrulePrelude();
	init_AttributeSelector();
	init_Block();
	init_Brackets();
	init_CDC();
	init_CDO();
	init_ClassSelector();
	init_Combinator();
	init_Comment();
	init_Condition();
	init_Declaration();
	init_DeclarationList();
	init_Dimension();
	init_Feature();
	init_FeatureFunction();
	init_FeatureRange();
	init_Function();
	init_GeneralEnclosed();
	init_Hash();
	init_Identifier();
	init_IdSelector();
	init_Layer();
	init_LayerList();
	init_MediaQuery();
	init_MediaQueryList();
	init_NestingSelector();
	init_Nth();
	init_Number();
	init_Operator();
	init_Parentheses();
	init_Percentage();
	init_PseudoClassSelector();
	init_PseudoElementSelector();
	init_Ratio();
	init_Raw();
	init_Rule();
	init_Scope();
	init_Selector();
	init_SelectorList();
	init_String();
	init_StyleSheet();
	init_SupportsDeclaration();
	init_TypeSelector();
	init_UnicodeRange();
	init_Url();
	init_Value();
	init_WhiteSpace();
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/config/parser.js
var parser_default;
var init_parser$1 = __esmMin((() => {
	init_scope$1();
	init_atrule();
	init_pseudo();
	init_index_parse();
	parser_default = {
		parseContext: {
			default: "StyleSheet",
			stylesheet: "StyleSheet",
			atrule: "Atrule",
			atrulePrelude(options) {
				return this.AtrulePrelude(options.atrule ? String(options.atrule) : null);
			},
			mediaQueryList: "MediaQueryList",
			mediaQuery: "MediaQuery",
			condition(options) {
				return this.Condition(options.kind);
			},
			rule: "Rule",
			selectorList: "SelectorList",
			selector: "Selector",
			block() {
				return this.Block(true);
			},
			declarationList: "DeclarationList",
			declaration: "Declaration",
			value: "Value"
		},
		features: {
			supports: { selector() {
				return this.Selector();
			} },
			container: { style() {
				return this.Declaration();
			} }
		},
		scope: scope_exports,
		atrule: atrule_default,
		pseudo: pseudo_default,
		node: index_parse_exports
	};
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/config/walker.js
var walker_default;
var init_walker = __esmMin((() => {
	init_node();
	walker_default = { node: node_exports };
}));
//#endregion
//#region node_modules/css-tree/lib/syntax/index.js
var syntax_default;
var init_syntax = __esmMin((() => {
	init_create();
	init_lexer();
	init_parser$1();
	init_walker();
	syntax_default = create_default({
		...lexer_default,
		...parser_default,
		...walker_default
	});
}));
//#endregion
//#region node_modules/css-tree/lib/version.js
var require$1, version;
var init_version = __esmMin((() => {
	require$1 = createRequire(import.meta.url);
	({version} = require$1("../package.json"));
}));
//#endregion
//#region node_modules/css-tree/lib/utils/clone.js
function clone(node) {
	const result = {};
	for (const key of Object.keys(node)) {
		let value = node[key];
		if (value) {
			if (Array.isArray(value) || value instanceof List) value = value.map(clone);
			else if (value.constructor === Object) value = clone(value);
		}
		result[key] = value;
	}
	return result;
}
var init_clone = __esmMin((() => {
	init_List();
}));
//#endregion
//#region node_modules/css-tree/lib/index.js
var tokenize, parse, generate, lexer, createLexer, walk, find, findLast, findAll, toPlainObject, fromPlainObject, fork;
var init_lib = __esmMin((() => {
	init_syntax();
	init_version();
	init_create();
	init_List();
	init_Lexer();
	init_tokenizer();
	init_definition_syntax();
	init_clone();
	init_names();
	init_string();
	init_url();
	({tokenize, parse, generate, lexer, createLexer, walk, find, findLast, findAll, toPlainObject, fromPlainObject, fork} = syntax_default);
}));
//#endregion
//#region node_modules/@asamuzakjp/nwsapi/src/nwsapi.js
var require_nwsapi = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* Forked and modified from nwsapi@2.2.2
	* - Export to cjs only
	* - Remove ./modules directory
	* - Remove unused exported properties
	* - Remove unused pseudo-classes
	* - Remove Snapshot.root and resolve document.documentElement on runtime
	* - Use `let` and `const` as much as possible
	* - Use `===` and `!==`
	* - Fix `:nth-of-type()`
	* - Fix function source for :root, :target and :indeterminate pseudo-classes
	* - Fix <ident-token>
	* - Support complex selectors within `:is()` and `:not()`
	* - Add ::slotted() and ::part() to pseudo-elements list
	* - Add isContentEditable() function
	* - Add createMatchingParensRegex() function from upstream
	* - Invalidate cache for :has() pseudo class
	* - Optimize some regular expressions
	*/
	(function Export(global, factory) {
		"use strict";
		module.exports = factory;
	})(exports, function Factory(global, Export) {
		const version = "nwsapi-2.2.2";
		let doc = global.document;
		/**
		* Generate a regex that matches a balanced set of parentheses.
		* Outermost parentheses are excluded so any amount of children can be handled.
		* See https://stackoverflow.com/a/35271017 for reference
		*
		* @param {number} depth
		* @return {string}
		*/
		function createMatchingParensRegex(depth = 1) {
			const out = "\\([^)(]*?(?:".repeat(depth) + "\\([^)(]*?\\)" + "[^)(]*?)*?\\)".repeat(depth);
			return out.slice(2, out.length - 2);
		}
		const CFG = {
			operators: "[~*^$|]=|=",
			combinators: "[\\s>+~](?=[^>+~])"
		};
		const NOT = {
			doubleEnc: "(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)",
			singleEnc: "(?=(?:[^']*'[^']*')*[^']*$)",
			parensEnc: "(?![^\\x28]*\\x29)",
			squareEnc: "(?![^\\x5b]*\\x5d)"
		};
		const REX = {
			hasEscapes: /\\/,
			hexNumbers: /^[0-9a-f]/i,
			escOrQuote: /^\\|[\x22\x27]/,
			regExpChar: /(?:(?!\\)[\\^$.*+?()[\]{}|/])/g,
			trimSpaces: /[\r\n\f]|^\s+|\s+$/g,
			commaGroup: RegExp("(\\s{0,255},\\s{0,255})" + NOT.squareEnc + NOT.parensEnc, "g"),
			splitGroup: /((?:\x28[^\x29]{0,255}\x29|\[[^\]]{0,255}\]|\\.|[^,])+)/g,
			fixEscapes: /\\([0-9a-f]{1,6}\s?|.)|([\x22\x27])/gi,
			combineWSP: RegExp("\\s{1,255}" + NOT.singleEnc + NOT.doubleEnc, "g"),
			tabCharWSP: RegExp("(\\s?\\t{1,255}\\s?)" + NOT.singleEnc + NOT.doubleEnc, "g"),
			pseudosWSP: RegExp("\\s{1,255}([-+])\\s{1,255}" + NOT.squareEnc, "g")
		};
		const STD = {
			combinator: /\s?([>+~])\s?/g,
			apimethods: /^(?:[a-z]+|\*)\|/i,
			namespaces: /(\*|[a-z]+)\|[-a-z]+/i
		};
		const GROUPS = {
			logicalsel: "(is|where|matches|not|has)(?:\\x28\\s?(" + createMatchingParensRegex(3) + ")\\s?\\x29)",
			treestruct: "(nth(?:-last)?(?:-child|-of-type))(?:\\x28\\s?(even|odd|(?:[-+]?\\d*)(?:n\\s?[-+]?\\s?\\d*)?)\\s?(?:\\x29|$))",
			locationpc: "(any-link|link|visited|target)\\b",
			structural: "(root|empty|(?:(?:first|last|only)(?:-child|-of-type)))\\b",
			inputstate: "(enabled|disabled|read-(?:only|write)|placeholder-shown|default)\\b",
			inputvalue: "(checked|indeterminate)\\b",
			pseudoNop: "(autofill|-webkit-autofill)\\b",
			pseudoSng: "(after|before|first-letter|first-line)\\b",
			pseudoDbl: ":(after|before|first-letter|first-line|selection|part|placeholder|slotted|-webkit-[-a-z0-9]{2,})\\b"
		};
		const Patterns = {
			treestruct: RegExp("^:(?:" + GROUPS.treestruct + ")(.*)", "i"),
			structural: RegExp("^:(?:" + GROUPS.structural + ")(.*)", "i"),
			inputstate: RegExp("^:(?:" + GROUPS.inputstate + ")(.*)", "i"),
			inputvalue: RegExp("^:(?:" + GROUPS.inputvalue + ")(.*)", "i"),
			locationpc: RegExp("^:(?:" + GROUPS.locationpc + ")(.*)", "i"),
			logicalsel: RegExp("^:(?:" + GROUPS.logicalsel + ")(.*)", "i"),
			pseudoNop: RegExp("^:(?:" + GROUPS.pseudoNop + ")(.*)", "i"),
			pseudoSng: RegExp("^:(?:" + GROUPS.pseudoSng + ")(.*)", "i"),
			pseudoDbl: RegExp("^:(?:" + GROUPS.pseudoDbl + ")(.*)", "i"),
			children: /^\s?>\s?(.*)/,
			adjacent: /^\s?\+\s?(.*)/,
			relative: /^\s?~\s?(.*)/,
			ancestor: /^\s+(.*)/,
			universal: /^\*(.*)/,
			namespace: /^(\w+|\*)?\|(.*)/
		};
		const qsNotArgs = "Not enough arguments";
		const qsInvalid = " is not a valid selector";
		const reNthElem = /(:nth(?:-last)?-child)/i;
		const reNthType = /(:nth(?:-last)?-of-type)/i;
		let reOptimizer;
		let reValidator;
		const Config = {
			IDS_DUPES: true,
			MIXEDCASE: true,
			LOGERRORS: true,
			VERBOSITY: true
		};
		let NAMESPACE;
		let QUIRKS_MODE;
		let HTML_DOCUMENT;
		const ATTR_STD_OPS = {
			"=": 1,
			"^=": 1,
			"$=": 1,
			"|=": 1,
			"*=": 1,
			"~=": 1
		};
		const HTML_TABLE = {
			accept: 1,
			"accept-charset": 1,
			align: 1,
			alink: 1,
			axis: 1,
			bgcolor: 1,
			charset: 1,
			checked: 1,
			clear: 1,
			codetype: 1,
			color: 1,
			compact: 1,
			declare: 1,
			defer: 1,
			dir: 1,
			direction: 1,
			disabled: 1,
			enctype: 1,
			face: 1,
			frame: 1,
			hreflang: 1,
			"http-equiv": 1,
			lang: 1,
			language: 1,
			link: 1,
			media: 1,
			method: 1,
			multiple: 1,
			nohref: 1,
			noresize: 1,
			noshade: 1,
			nowrap: 1,
			readonly: 1,
			rel: 1,
			rev: 1,
			rules: 1,
			scope: 1,
			scrolling: 1,
			selected: 1,
			shape: 1,
			target: 1,
			text: 1,
			type: 1,
			valign: 1,
			valuetype: 1,
			vlink: 1
		};
		const Combinators = {};
		const Selectors = {};
		const Operators = {
			"=": {
				p1: "^",
				p2: "$",
				p3: "true"
			},
			"^=": {
				p1: "^",
				p2: "",
				p3: "true"
			},
			"$=": {
				p1: "",
				p2: "$",
				p3: "true"
			},
			"*=": {
				p1: "",
				p2: "",
				p3: "true"
			},
			"|=": {
				p1: "^",
				p2: "(-|$)",
				p3: "true"
			},
			"~=": {
				p1: "(^|\\s)",
				p2: "(\\s|$)",
				p3: "true"
			}
		};
		const concatCall = function(nodes, callback) {
			let i = 0;
			const l = nodes.length;
			const list = Array(l);
			while (l > i) {
				if (callback(list[i] = nodes[i]) === false) break;
				++i;
			}
			return list;
		};
		const concatList = function(list, nodes) {
			let i = -1;
			let l = nodes.length;
			while (l--) list[list.length] = nodes[++i];
			return list;
		};
		let hasDupes = false;
		const documentOrder = function(a, b) {
			if (!hasDupes && a === b) {
				hasDupes = true;
				return 0;
			}
			return a.compareDocumentPosition(b) & 4 ? -1 : 1;
		};
		const unique = function(nodes) {
			let i = 0;
			let j = -1;
			let l = nodes.length + 1;
			const list = [];
			while (--l) {
				if (nodes[i++] === nodes[i]) continue;
				list[++j] = nodes[i - 1];
			}
			hasDupes = false;
			return list;
		};
		const hasMixedCaseTagNames = function(context) {
			const api = "getElementsByTagNameNS";
			context = context.ownerDocument || context;
			const ns = context.documentElement && context.documentElement.namespaceURI ? context.documentElement.namespaceURI : "http://www.w3.org/1999/xhtml";
			return context[api]("*", "*").length - context[api](ns, "*").length > 0;
		};
		const isHTML = function(node) {
			const doc = node.ownerDocument || node;
			return doc.nodeType === 9 && doc.contentType === "text/html";
		};
		const codePointToUTF16 = function(codePoint) {
			if (codePoint < 1 || codePoint > 1114111 || codePoint > 55295 && codePoint < 57344) return "\\ufffd";
			if (codePoint < 65536) {
				const lowHex = "000" + codePoint.toString(16);
				return "\\u" + lowHex.substr(lowHex.length - 4);
			}
			return "\\u" + ((codePoint - 65536 >> 10) + 55296).toString(16) + "\\u" + ((codePoint - 65536) % 1024 + 56320).toString(16);
		};
		const stringFromCodePoint = function(codePoint) {
			if (codePoint < 1 || codePoint > 1114111 || codePoint > 55295 && codePoint < 57344) return "�";
			if (codePoint < 65536) return String.fromCharCode(codePoint);
			return String.fromCodePoint(codePoint);
		};
		const convertEscapes = function(str) {
			return REX.hasEscapes.test(str) ? str.replace(REX.fixEscapes, function(substring, p1, p2) {
				return p2 ? "\\" + p2 : REX.hexNumbers.test(p1) ? codePointToUTF16(parseInt(p1, 16)) : REX.escOrQuote.test(p1) ? substring : p1;
			}) : str;
		};
		const unescapeIdentifier = function(str) {
			return REX.hasEscapes.test(str) ? str.replace(REX.fixEscapes, function(substring, p1, p2) {
				return p2 || (REX.hexNumbers.test(p1) ? stringFromCodePoint(parseInt(p1, 16)) : REX.escOrQuote.test(p1) ? substring : p1);
			}) : str;
		};
		const none = [];
		const matchLambdas = {};
		const selectLambdas = {};
		let matchResolvers = {};
		let selectResolvers = {};
		const method = {
			"#": "getElementById",
			"*": "getElementsByTagName",
			"|": "getElementsByTagNameNS",
			".": "getElementsByClassName"
		};
		const byIdRaw = function(id, context) {
			let node = context;
			const nodes = [];
			let next = node.firstElementChild;
			while (node = next) {
				node.id === id && nodes.push(node);
				if (next = node.firstElementChild || node.nextElementSibling) continue;
				while (!next && (node = node.parentElement) && node !== context) next = node.nextElementSibling;
			}
			return nodes;
		};
		const byId = function(id, context) {
			let e;
			const api = method["#"];
			if (Config.IDS_DUPES === false) {
				if (api in context) {
					e = context[api](id);
					return e ? [e] : none;
				}
			} else if ("all" in context) if (e = context.all[id]) {
				if (e.nodeType === 1) return e.getAttribute("id") !== id ? [] : [e];
				else if (id === "length") {
					e = context[api](id);
					return e ? [e] : none;
				}
				const nodes = [];
				for (let i = 0, l = e.length; l > i; ++i) if (e[i].id === id) nodes.push(e[i]);
				return nodes.length ? nodes : none;
			} else return none;
			return byIdRaw(id, context);
		};
		const byTag = function(tag, context) {
			let e;
			let nodes;
			const api = method["*"];
			if (api in context) return Array.prototype.slice.call(context[api](tag));
			else {
				tag = tag.toLowerCase();
				if (e = context.firstElementChild) if (!(e.nextElementSibling || tag === "*" || e.localName === tag)) return Array.prototype.slice.call(e[api](tag));
				else {
					nodes = [];
					do {
						if (tag === "*" || e.localName === tag) nodes.push(e);
						concatList(nodes, e[api](tag));
					} while (e = e.nextElementSibling);
				}
				else nodes = none;
			}
			return nodes;
		};
		const byClass = function(cls, context) {
			let e;
			let nodes;
			const api = method["."];
			let reCls;
			if (api in context) return Array.prototype.slice.call(context[api](cls));
			else if (e = context.firstElementChild) {
				reCls = RegExp("(^|\\s)" + cls + "(\\s|$)", QUIRKS_MODE ? "i" : "");
				if (!(e.nextElementSibling || reCls.test(e.className))) return Array.prototype.slice.call(e[api](cls));
				else {
					nodes = [];
					do {
						if (reCls.test(e.className)) nodes.push(e);
						concatList(nodes, e[api](cls));
					} while (e = e.nextElementSibling);
				}
			} else nodes = none;
			return nodes;
		};
		const compat = {
			"#": function(c, n) {
				REX.hasEscapes.test(n) && (n = unescapeIdentifier(n));
				return function(e, f) {
					return byId(n, c);
				};
			},
			"*": function(c, n) {
				REX.hasEscapes.test(n) && (n = unescapeIdentifier(n));
				return function(e, f) {
					return byTag(n, c);
				};
			},
			"|": function(c, n) {
				REX.hasEscapes.test(n) && (n = unescapeIdentifier(n));
				return function(e, f) {
					return byTag(n, c);
				};
			},
			".": function(c, n) {
				REX.hasEscapes.test(n) && (n = unescapeIdentifier(n));
				return function(e, f) {
					return byClass(n, c);
				};
			}
		};
		const hasAttributeNS = function(e, name) {
			let i;
			let l;
			const attr = e.getAttributeNames();
			name = RegExp(":?" + name + "$", HTML_DOCUMENT ? "i" : "");
			for (i = 0, l = attr.length; l > i; ++i) if (name.test(attr[i])) return true;
			return false;
		};
		const nthElement = (function() {
			let idx = 0;
			let len = 0;
			let set = 0;
			let parent;
			let parents = [];
			let nodes = [];
			return function(element, dir) {
				if (dir === 2) {
					idx = 0;
					len = 0;
					set = 0;
					nodes = [];
					parents = [];
					parent = void 0;
					return -1;
				}
				let e, i, j, k, l;
				if (parent === element.parentElement) {
					i = set;
					j = idx;
					l = len;
				} else {
					l = parents.length;
					parent = element.parentElement;
					for (i = -1, j = 0, k = l - 1; l > j; ++j, --k) {
						if (parents[j] === parent) {
							i = j;
							break;
						}
						if (parents[k] === parent) {
							i = k;
							break;
						}
					}
					if (i < 0) {
						parents[i = l] = parent;
						l = 0;
						nodes[i] = [];
						e = parent && parent.firstElementChild || element;
						while (e) {
							nodes[i][l] = e;
							if (e === element) j = l;
							e = e.nextElementSibling;
							++l;
						}
						set = i;
						idx = 0;
						len = l;
						if (l < 2) return l;
					} else {
						l = nodes[i].length;
						set = i;
					}
				}
				if (element !== nodes[i][j] && element !== nodes[i][j = 0]) for (j = 0, e = nodes[i], k = l - 1; l > j; ++j, --k) {
					if (e[j] === element) break;
					if (e[k] === element) {
						j = k;
						break;
					}
				}
				idx = j + 1;
				len = l;
				return dir ? l - j : idx;
			};
		})();
		const nthOfType = (function() {
			let idx = 0;
			let len = 0;
			let set = 0;
			let parent;
			let parents = [];
			let nodes = [];
			return function(element, dir) {
				if (dir === 2) {
					idx = 0;
					len = 0;
					set = 0;
					nodes = [];
					parents = [];
					parent = void 0;
					return -1;
				}
				const name = element.localName;
				const nsURI = element.namespaceURI;
				if (nsURI !== "http://www.w3.org/1999/xhtml") {
					idx = 0;
					len = 0;
					set = 0;
					nodes = [];
					parents = [];
					parent = void 0;
				}
				let e;
				let i;
				let j;
				let k;
				let l;
				if (nodes[set] && nodes[set][name] && parent === element.parentElement) {
					i = set;
					j = idx;
					l = len;
				} else {
					l = parents.length;
					parent = element.parentElement;
					for (i = -1, j = 0, k = l - 1; l > j; ++j, --k) {
						if (parents[j] === parent) {
							i = j;
							break;
						}
						if (parents[k] === parent) {
							i = k;
							break;
						}
					}
					if (i < 0 || !nodes[i][name]) {
						parents[i = l] = parent;
						nodes[i] || (nodes[i] = Object());
						l = 0;
						nodes[i][name] = [];
						e = parent && parent.firstElementChild || element;
						while (e) {
							if (e === element) j = l;
							if (e.localName === name && e.namespaceURI === nsURI) {
								nodes[i][name][l] = e;
								++l;
							}
							e = e.nextElementSibling;
						}
						set = i;
						idx = j;
						len = l;
						if (l < 2) return l;
					} else {
						l = nodes[i][name].length;
						set = i;
					}
				}
				if (element !== nodes[i][name][j] && element !== nodes[i][name][j = 0]) for (j = 0, e = nodes[i][name], k = l - 1; l > j; ++j, --k) {
					if (e[j] === element) break;
					if (e[k] === element) {
						j = k;
						break;
					}
				}
				idx = j + 1;
				len = l;
				return dir ? l - j : idx;
			};
		})();
		const isTarget = function(node) {
			const doc = node.ownerDocument || node;
			const { hash } = new URL(doc.URL);
			if (node.id && hash === `#${node.id}` && doc.contains(node)) return true;
			return false;
		};
		const isIndeterminate = function(node) {
			if (node.indeterminate && node.localName === "input" && node.type === "checkbox" || node.localName === "progress" && !node.hasAttribute("value")) return true;
			if (node.localName === "input" && node.type === "radio" && !node.hasAttribute("checked")) {
				const nodeName = node.name;
				let parent = node.parentNode;
				while (parent) {
					if (parent.localName === "form") break;
					parent = parent.parentNode;
				}
				if (!parent) parent = node.ownerDocument.documentElement;
				const items = parent.getElementsByTagName("input");
				const l = items.length;
				let checked;
				for (let i = 0; i < l; i++) {
					const item = items[i];
					if (item.getAttribute("type") === "radio") {
						if (nodeName) {
							if (item.getAttribute("name") === nodeName) checked = !!item.checked;
						} else if (!item.hasAttribute("name")) checked = !!item.checked;
						if (checked) break;
					}
				}
				if (!checked) return true;
			}
			return false;
		};
		const isContentEditable = function(node) {
			let attrValue = "inherit";
			if (node.hasAttribute("contenteditable")) attrValue = node.getAttribute("contenteditable");
			switch (attrValue) {
				case "":
				case "plaintext-only":
				case "true": return true;
				case "false": return false;
				default:
					if (node.parentNode && node.parentNode.nodeType === 1) return isContentEditable(node.parentNode);
					return false;
			}
		};
		const setIdentifierSyntax = function() {
			const identifier = "(?:--|-?(?:[a-z_]|[^\\x00-\\x9f]|\\\\(?:[^\\r\\n\\f\\da-f]|[\\da-f]{1,6}\\s{0,255})))(?:[\\w-]|[^\\x00-\\x9f]|\\\\(?:[^\\r\\n\\f\\da-f]|[\\da-f]{1,6}\\s{0,255}))*";
			const pseudoparms = "(?:[-+]?\\d*)(?:n\\s?[-+]?\\s?\\d*)";
			const attrparser = identifier + "|\"[^\"\\\\]*(?:\\\\.[^\"\\\\]*)*(?:\"|$)|'[^'\\\\]*(?:\\\\.[^'\\\\]*)*(?:'|$)";
			const attrvalues = "([\\x22\\x27]?)((?!\\3)*|(?:\\\\?.)*?)(?:\\3|$)";
			const attributes = "\\[(?:\\*\\|)?\\s?(" + identifier + "(?::(?:--|-?(?:[a-z_]|[^\\x00-\\x9f]|\\\\(?:[^\\r\\n\\f\\da-f]|[\\da-f]{1,6}\\s{0,255})))(?:[\\w-]|[^\\x00-\\x9f]|\\\\(?:[^\\r\\n\\f\\da-f]|[\\da-f]{1,6}\\s{0,255}))*)?)\\s?(?:(" + CFG.operators + ")\\s?(?:(?:--|-?(?:[a-z_]|[^\\x00-\\x9f]|\\\\(?:[^\\r\\n\\f\\da-f]|[\\da-f]{1,6}\\s{0,255})))(?:[\\w-]|[^\\x00-\\x9f]|\\\\(?:[^\\r\\n\\f\\da-f]|[\\da-f]{1,6}\\s{0,255}))*|\"[^\"\\\\]*(?:\\\\.[^\"\\\\]*)*(?:\"|$)|'[^'\\\\]*(?:\\\\.[^'\\\\]*)*(?:'|$)))?(?:\\s?\\b(i))?\\s?(?:\\]|$)";
			const attrmatcher = attributes.replace(attrparser, attrvalues);
			const pseudoclass = "(?:\\x28\\s*(?:" + pseudoparms + "?)?|[*|]|(?:(?::[-\\w]+(?:\\x28(?:[-+]?\\d*)(?:n\\s?[-+]?\\s?\\d*)?(?:\\x29|$))?)|(?:[.#]?(?:--|-?(?:[a-z_]|[^\\x00-\\x9f]|\\\\(?:[^\\r\\n\\f\\da-f]|[\\da-f]{1,6}\\s{0,255})))(?:[\\w-]|[^\\x00-\\x9f]|\\\\(?:[^\\r\\n\\f\\da-f]|[\\da-f]{1,6}\\s{0,255}))*)|(?:" + attributes + "))+|\\s?[>+~]\\s?|\\s?,\\s?|\\s|\\x29|$)*";
			const standardValidator = "(?=\\s?[^>+~(){}<])(?:\\*|\\||(?:[.#]?" + identifier + ")+|(?:" + attributes + ")+|(?:::?[-\\w]+" + pseudoclass + ")|(?:\\s?" + CFG.combinators + "\\s?)|\\s?,\\s?|\\s?)+";
			reOptimizer = RegExp("(?:([.:#*]?)(" + identifier + ")(?::[-\\w]+|\\[[^\\]]+(?:\\]|$)|\\x28[^\\x29]+(?:\\x29|$))*)$", "i");
			reValidator = RegExp(standardValidator, "gi");
			Patterns.id = RegExp("^#(" + identifier + ")(.*)", "i");
			Patterns.tagName = RegExp("^(" + identifier + ")(.*)", "i");
			Patterns.className = RegExp("^\\.(" + identifier + ")(.*)", "i");
			Patterns.attribute = RegExp("^(?:" + attrmatcher + ")(.*)");
		};
		const configure = function(option, clear) {
			if (typeof option === "string") return !!Config[option];
			if (typeof option !== "object") return Config;
			for (const i in option) Config[i] = !!option[i];
			if (clear) {
				matchResolvers = {};
				selectResolvers = {};
			}
			setIdentifierSyntax();
			return true;
		};
		const emit = function(message, proto) {
			let err;
			if (Config.VERBOSITY) {
				if (global[proto]) err = new global[proto](message);
				else err = new global.DOMException(message, "SyntaxError");
				throw err;
			}
			if (Config.LOGERRORS && console && console.log) console.log(message);
		};
		const Snapshot = {
			doc: null,
			from: null,
			byTag: null,
			first: null,
			match: null,
			ancestor: null,
			nthOfType: null,
			nthElement: null,
			hasAttributeNS: null,
			isTarget: null,
			isIndeterminate: null,
			isContentEditable: null
		};
		let lastContext;
		const switchContext = function(context, force) {
			const oldDoc = doc;
			doc = context.ownerDocument || context;
			if (force || oldDoc !== doc) {
				HTML_DOCUMENT = isHTML(doc);
				QUIRKS_MODE = HTML_DOCUMENT && doc.compatMode.indexOf("CSS") < 0;
				NAMESPACE = doc.documentElement && doc.documentElement.namespaceURI;
				Snapshot.doc = doc;
			}
			Snapshot.from = context;
			return context;
		};
		let lastMatched;
		let lastSelected;
		const F_INIT = "\"use strict\";return function Resolver(c,f,x,r)";
		const S_HEAD = "var e,n,o,j=r.length-1,k=-1";
		const M_HEAD = "var e,n,o";
		const S_LOOP = "main:while((e=c[++k]))";
		const N_LOOP = "main:while((e=c.item(++k)))";
		const M_LOOP = "e=c;";
		const S_BODY = "r[++j]=c[k];";
		const N_BODY = "r[++j]=c.item(k);";
		const M_BODY = "";
		const S_TAIL = "continue main;";
		const M_TAIL = "r=true;";
		const S_TEST = "if(f(c[k])){break main;}";
		const N_TEST = "if(f(c.item(k))){break main;}";
		const M_TEST = "f(c);";
		let S_VARS = [];
		let M_VARS = [];
		const compileSelector = function(expression, source, mode, callback) {
			let a;
			let b;
			let n;
			let f;
			let name;
			let NS;
			const N = "";
			const D = "!";
			let compat;
			let expr;
			let match;
			let result;
			let status;
			let symbol;
			let test;
			let type;
			let selector = expression;
			let vars;
			const selectorString = mode ? lastSelected : lastMatched;
			selector = selector.replace(STD.combinator, "$1");
			let selectorRecursion = true;
			while (selector) {
				symbol = STD.apimethods.test(selector) ? "|" : selector[0];
				switch (symbol) {
					case "*":
						match = selector.match(Patterns.universal);
						if (N === "!") source = "if(" + N + "true){" + source + "}";
						break;
					case "#":
						match = selector.match(Patterns.id);
						source = "if(" + N + "(/^" + match[1] + "$/.test(e.getAttribute(\"id\")))){" + source + "}";
						break;
					case ".":
						match = selector.match(Patterns.className);
						compat = (QUIRKS_MODE ? "i" : "") + ".test(e.getAttribute(\"class\"))";
						source = "if(" + N + "(/(^|\\s)" + match[1] + "(\\s|$)/" + compat + ")){" + source + "}";
						break;
					case /[_a-z]/i.test(symbol) ? symbol : void 0:
						match = selector.match(Patterns.tagName);
						source = "if(" + N + "(e.localName" + (Config.MIXEDCASE || hasMixedCaseTagNames(doc) ? "==\"" + match[1].toLowerCase() + "\"" : "==\"" + match[1].toUpperCase() + "\"") + ")){" + source + "}";
						break;
					case "|":
						match = selector.match(Patterns.namespace);
						if (match[1] === "*") source = "if(" + N + "true){" + source + "}";
						else if (!match[1]) source = "if(" + N + "(!e.namespaceURI)){" + source + "}";
						else if (typeof match[1] === "string" && doc.documentElement && doc.documentElement.prefix === match[1]) source = "if(" + N + "(e.namespaceURI==\"" + NAMESPACE + "\")){" + source + "}";
						else emit("'" + selectorString + "' is not a valid selector");
						break;
					case "[":
						match = selector.match(Patterns.attribute);
						NS = match[0].match(STD.namespaces);
						name = match[1];
						expr = name.split(":");
						expr = expr.length === 2 ? expr[1] : expr[0];
						if (match[2] && !(test = Operators[match[2]])) {
							emit("'" + selectorString + "' is not a valid selector");
							return "";
						}
						if (match[4] === "") test = match[2] === "~=" ? {
							p1: "^\\s",
							p2: "+$",
							p3: "true"
						} : match[2] in ATTR_STD_OPS && match[2] !== "~=" ? {
							p1: "^",
							p2: "$",
							p3: "true"
						} : test;
						else if (match[2] === "~=" && match[4].includes(" ")) {
							source = "if(" + N + "false){" + source + "}";
							break;
						} else if (match[4]) match[4] = convertEscapes(match[4]).replace(REX.regExpChar, "\\$&");
						type = match[5] === "i" || HTML_DOCUMENT && HTML_TABLE[expr.toLowerCase()] ? "i" : "";
						source = "if(" + N + "(" + (!match[2] ? NS ? "s.hasAttributeNS(e,\"" + name + "\")" : "e.hasAttribute&&e.hasAttribute(\"" + name + "\")" : !match[4] && ATTR_STD_OPS[match[2]] && match[2] !== "~=" ? "e.getAttribute&&e.getAttribute(\"" + name + "\")==\"\"" : "(/" + test.p1 + match[4] + test.p2 + "/" + type + ").test(e.getAttribute&&e.getAttribute(\"" + name + "\"))==" + test.p3) + ")){" + source + "}";
						break;
					case "~":
						match = selector.match(Patterns.relative);
						source = "n=e;while((e=e.previousElementSibling)){" + source + "}e=n;";
						break;
					case "+":
						match = selector.match(Patterns.adjacent);
						source = "n=e;if((e=e.previousElementSibling)){" + source + "}e=n;";
						break;
					case "	":
					case " ":
						match = selector.match(Patterns.ancestor);
						source = "n=e;while((e=e.parentElement)){" + source + "}e=n;";
						break;
					case ">":
						match = selector.match(Patterns.children);
						source = "n=e;if((e=e.parentElement)){" + source + "}e=n;";
						break;
					case symbol in Combinators ? symbol : void 0:
						match[match.length - 1] = "*";
						source = Combinators[symbol](match) + source;
						break;
					case ":":
						if (match = selector.match(Patterns.structural)) {
							match[1] = match[1].toLowerCase();
							switch (match[1]) {
								case "root":
									source = "if(" + N + "(e===s.doc.documentElement)){" + source + (mode ? "break main;" : "") + "}";
									break;
								case "empty":
									source = "n=e.firstChild;while(n&&!(/1|3/).test(n.nodeType)){n=n.nextSibling}if(" + D + "n){" + source + "}";
									break;
								case "only-child":
									source = "if(" + N + "(!e.nextElementSibling&&!e.previousElementSibling)){" + source + "}";
									break;
								case "last-child":
									source = "if(" + N + "(!e.nextElementSibling)){" + source + "}";
									break;
								case "first-child":
									source = "if(" + N + "(!e.previousElementSibling)){" + source + "}";
									break;
								case "only-of-type":
									source = "o=e.localName;n=e;while((n=n.nextElementSibling)&&n.localName!=o);if(!n){n=e;while((n=n.previousElementSibling)&&n.localName!=o);}if(" + D + "n){" + source + "}";
									break;
								case "last-of-type":
									source = "n=e;o=e.localName;while((n=n.nextElementSibling)&&n.localName!=o);if(" + D + "n){" + source + "}";
									break;
								case "first-of-type":
									source = "n=e;o=e.localName;while((n=n.previousElementSibling)&&n.localName!=o);if(" + D + "n){" + source + "}";
									break;
								default: emit("'" + selectorString + "' is not a valid selector");
							}
						} else if (match = selector.match(Patterns.treestruct)) {
							match[1] = match[1].toLowerCase();
							switch (match[1]) {
								case "nth-child":
								case "nth-of-type":
								case "nth-last-child":
								case "nth-last-of-type":
									expr = /-of-type/i.test(match[1]);
									if (match[1] && match[2]) {
										type = /last/i.test(match[1]);
										if (match[2] === "n") {
											source = "if(" + N + "true){" + source + "}";
											break;
										} else if (match[2] === "1") {
											test = type ? "next" : "previous";
											source = expr ? "n=e;o=e.localName;while((n=n." + test + "ElementSibling)&&n.localName!=o);if(!n){" + source + "}" : "if(" + N + "!e." + test + "ElementSibling){" + source + "}";
											break;
										} else if (match[2] === "even" || match[2] === "2n0" || match[2] === "2n+0" || match[2] === "2n") test = "n%2==0";
										else if (match[2] === "odd" || match[2] === "2n1" || match[2] === "2n+1") test = "n%2==1";
										else {
											f = /n/i.test(match[2]);
											n = match[2].split("n");
											a = parseInt(n[0], 10) || 0;
											b = parseInt(n[1], 10) || 0;
											if (n[0] === "-") a = -1;
											if (n[0] === "+") a = 1;
											test = (b ? "(n" + (b > 0 ? "-" : "+") + Math.abs(b) + ")" : "n") + "%" + a + "==0";
											test = a >= 1 ? f ? "n>" + (b - 1) + (Math.abs(a) !== 1 ? "&&" + test : "") : "n==" + a : a <= -1 ? f ? "n<" + (b + 1) + (Math.abs(a) !== 1 ? "&&" + test : "") : "n==" + a : a === 0 ? n[0] ? "n==" + b : "n>" + (b - 1) : "false";
										}
										expr = expr ? "OfType" : "Element";
										type = type ? "true" : "false";
										source = "n=s.nth" + expr + "(e," + type + ");if((" + test + ")){" + source + "}";
									} else emit("'" + selectorString + "' is not a valid selector");
									break;
								default: emit("'" + selectorString + "' is not a valid selector");
							}
						} else if (match = selector.match(Patterns.logicalsel)) {
							match[1] = match[1].toLowerCase();
							expr = match[2].replace(REX.CommaGroup, ",").replace(REX.TrimSpaces, "");
							switch (match[1]) {
								case "is":
								case "where":
								case "matches":
									source = "if(s.match(\"" + expr.replace(/\x22/g, "\\\"") + "\",e)){" + source + "}";
									break;
								case "not":
									source = "if(!s.match(\"" + expr.replace(/\x22/g, "\\\"") + "\",e)){" + source + "}";
									break;
								case "has":
									matchResolvers = {};
									source = "if(e.querySelector(\":scope " + expr.replace(/\x22/g, "\\\"") + "\")){" + source + "}";
									break;
								default: emit("'" + selectorString + "' is not a valid selector");
							}
						} else if (match = selector.match(Patterns.locationpc)) {
							match[1] = match[1].toLowerCase();
							switch (match[1]) {
								case "any-link":
									source = "if(" + N + "(/^a|area$/i.test(e.localName)&&e.hasAttribute(\"href\")||e.visited)){" + source + "}";
									break;
								case "link":
									source = "if(" + N + "(/^a|area$/i.test(e.localName)&&e.hasAttribute(\"href\"))){" + source + "}";
									break;
								case "visited":
									source = "if(" + N + "(/^a|area$/i.test(e.localName)&&e.hasAttribute(\"href\")&&e.visited)){" + source + "}";
									break;
								case "target":
									source = "if(s.isTarget(e)){" + source + "}";
									break;
								default: emit("'" + selectorString + "' is not a valid selector");
							}
						} else if (match = selector.match(Patterns.inputstate)) {
							match[1] = match[1].toLowerCase();
							switch (match[1]) {
								case "enabled":
									source = "if(((\"form\" in e||/^optgroup$/i.test(e.localName))&&\"disabled\" in e &&e.disabled===false)){" + source + "}";
									break;
								case "disabled":
									source = "if(((\"form\" in e||/^optgroup$/i.test(e.localName))&&\"disabled\" in e)){var x=0,N=[],F=false,L=false;if(!(/^(optgroup|option)$/i.test(e.localName))){n=e.parentElement;while(n){if(n.localName===\"fieldset\"){N[x++]=n;if(n.disabled===true){F=true;break;}}n=n.parentElement;}for(var x=0;x<N.length;x++){if((n=s.first(\"legend\",N[x]))&&n.contains(e)){L=true;break;}}}if(e.disabled===true||(F&&!L)){" + source + "}}";
									break;
								case "read-only":
									source = "if((/^textarea$/i.test(e.localName)&&(e.readOnly||e.disabled))||(/^input$/i.test(e.localName)&&(\"|date|datetime-local|email|month|number|password|search|tel|text|time|url|week|\".includes(\"|\"+e.type+\"|\")?(e.readOnly||e.disabled):true))||(!/^(?:input|textarea)$/i.test(e.localName) && !s.isContentEditable(e))){" + source + "}";
									break;
								case "read-write":
									source = "if((/^textarea$/i.test(e.localName)&&!e.readOnly&&!e.disabled)||(/^input$/i.test(e.localName)&&\"|date|datetime-local|email|month|number|password|search|tel|text|time|url|week|\".includes(\"|\"+e.type+\"|\")&&!e.readOnly&&!e.disabled)||(!/^(?:input|textarea)$/i.test(e.localName) && s.isContentEditable(e))){" + source + "}";
									break;
								case "placeholder-shown":
									source = "if(((/^input|textarea$/i.test(e.localName))&&e.hasAttribute(\"placeholder\")&&(\"|textarea|password|number|search|email|text|tel|url|\".includes(\"|\"+e.type+\"|\"))&&(!s.match(\":focus\",e)))){" + source + "}";
									break;
								case "default":
									source = "if((\"form\" in e && e.form)){var x=0;n=[];if(e.type==\"image\")n=e.form.getElementsByTagName(\"input\");if(e.type==\"submit\")n=e.form.elements;while(n[x]&&e!==n[x]){if(n[x].type==\"image\")break;if(n[x].type==\"submit\")break;x++;}}if((e.form&&(e===n[x]&&\"|image|submit|\".includes(\"|\"+e.type+\"|\"))||((/^option$/i.test(e.localName))&&e.defaultSelected)||((\"|radio|checkbox|\".includes(\"|\"+e.type+\"|\"))&&e.defaultChecked))){" + source + "}";
									break;
								default:
									emit("'" + selector_string + "' is not a valid selector");
									break;
							}
						} else if (match = selector.match(Patterns.inputvalue)) {
							match[1] = match[1].toLowerCase();
							switch (match[1]) {
								case "checked":
									source = "if(" + N + "(/^input$/i.test(e.localName)&&(\"|radio|checkbox|\".includes(\"|\"+e.type+\"|\")&&e.checked)||(/^option$/i.test(e.localName)&&(e.selected||e.checked)))){" + source + "}";
									break;
								case "indeterminate":
									source = "if(s.isIndeterminate(e)){" + source + "}";
									break;
								case "required":
									source = "if(" + N + "(/^input|select|textarea$/i.test(e.localName)&&e.required)){" + source + "}";
									break;
								case "optional":
									source = "if(" + N + "(/^input|select|textarea$/i.test(e.localName)&&!e.required)){" + source + "}";
									break;
								case "invalid":
									source = "if(" + N + "(((/^form$/i.test(e.localName)&&!e.noValidate)||(e.willValidate&&!e.formNoValidate))&&!e.checkValidity())||(/^fieldset$/i.test(e.localName)&&s.first(\":invalid\",e))){" + source + "}";
									break;
								case "valid":
									source = "if(" + N + "(((/^form$/i.test(e.localName)&&!e.noValidate)||(e.willValidate&&!e.formNoValidate))&&e.checkValidity())||(/^fieldset$/i.test(e.localName)&&s.first(\":valid\",e))){" + source + "}";
									break;
								case "in-range":
									source = "if(" + N + "(/^input$/i.test(e.localName))&&(e.willValidate&&!e.formNoValidate)&&(!e.validity.rangeUnderflow&&!e.validity.rangeOverflow)&&(\"|date|datetime-local|month|number|range|time|week|\".includes(\"|\"+e.type+\"|\"))&&(\"range\"==e.type||e.getAttribute(\"min\")||e.getAttribute(\"max\"))){" + source + "}";
									break;
								case "out-of-range":
									source = "if(" + N + "(/^input$/i.test(e.localName))&&(e.willValidate&&!e.formNoValidate)&&(e.validity.rangeUnderflow||e.validity.rangeOverflow)&&(\"|date|datetime-local|month|number|range|time|week|\".includes(\"|\"+e.type+\"|\"))&&(\"range\"==e.type||e.getAttribute(\"min\")||e.getAttribute(\"max\"))){" + source + "}";
									break;
								default: emit("'" + selectorString + "' is not a valid selector");
							}
						} else if (match = selector.match(Patterns.pseudoSng)) source = "if(e.element&&e.type.toLowerCase()==\":" + match[0].toLowerCase() + "\"){e=e.element;" + source + "}";
						else if (match = selector.match(Patterns.pseudoDbl)) source = "if(e.element&&e.type.toLowerCase()==\"" + match[0].toLowerCase() + "\"){e=e.element;" + source + "}";
						else if (match = selector.match(Patterns.pseudoNop)) source = "if(" + N + "false){" + source + "}";
						else {
							expr = false;
							status = false;
							for (expr in Selectors) if (match = selector.match(Selectors[expr].Expression)) {
								result = Selectors[expr].Callback(match, source, mode, callback);
								if ("match" in result) match = result.match;
								vars = result.modvar;
								if (mode) vars && !S_VARS.includes(vars) && S_VARS.push(vars);
								else vars && M_VARS.includes(vars) && M_VARS.push(vars);
								source = result.source;
								status = result.status;
								if (status) break;
							}
							if (!status) {
								emit("unknown pseudo-class selector '" + selector + "'");
								return "";
							}
							if (!expr) {
								emit("unknown token in selector '" + selector + "'");
								return "";
							}
						}
						break;
					default:
						selectorRecursion = false;
						emit("'" + selectorString + "' is not a valid selector");
				}
				if (!selectorRecursion) break;
				if (!match) {
					emit("'" + selectorString + "' is not a valid selector");
					return "";
				}
				selector = match.pop();
			}
			return source;
		};
		const compile = function(selector, mode, callback) {
			let head = "";
			let loop = "";
			let macro = "";
			let source = "";
			let vars = "";
			switch (mode) {
				case true:
					if (selectLambdas[selector]) return selectLambdas[selector];
					macro = S_BODY + (callback ? S_TEST : "") + S_TAIL;
					head = S_HEAD;
					loop = S_LOOP;
					break;
				case false:
					if (matchLambdas[selector]) return matchLambdas[selector];
					macro = M_BODY + (callback ? M_TEST : "") + M_TAIL;
					head = M_HEAD;
					loop = M_LOOP;
					break;
				case null:
					if (selectLambdas[selector]) return selectLambdas[selector];
					macro = N_BODY + (callback ? N_TEST : "") + S_TAIL;
					head = S_HEAD;
					loop = N_LOOP;
					break;
				default:
			}
			source = compileSelector(selector, macro, mode, callback);
			loop += mode || mode === null ? "{" + source + "}" : source;
			if ((mode || mode === null) && selector.includes(":nth")) {
				loop += reNthElem.test(selector) ? "s.nthElement(null, 2);" : "";
				loop += reNthType.test(selector) ? "s.nthOfType(null, 2);" : "";
			}
			if (S_VARS[0] || M_VARS[0]) {
				vars = "," + (S_VARS.join(",") || M_VARS.join(","));
				S_VARS = [];
				M_VARS = [];
			}
			const factory = Function("s", F_INIT + "{" + head + vars + ";" + loop + "return r;}")(Snapshot);
			return mode || mode === null ? selectLambdas[selector] = factory : matchLambdas[selector] = factory;
		};
		const optimize = function(selector, token) {
			const index = token.index;
			const length = token[1].length + token[2].length;
			return selector.slice(0, index) + (" >+~".indexOf(selector.charAt(index - 1)) > -1 ? ":[".indexOf(selector.charAt(index + length + 1)) > -1 ? "*" : "" : "") + selector.slice(index + length - (token[1] === "*" ? 1 : 0));
		};
		const collect = function(selectors, context, callback) {
			let i;
			let l;
			const seen = {};
			let token = [
				"",
				"*",
				"*"
			];
			const optimized = selectors;
			const factory = [];
			const htmlset = [];
			const nodeset = [];
			let results = [];
			let type;
			for (i = 0, l = selectors.length; l > i; ++i) {
				if (!seen[selectors[i]] && (seen[selectors[i]] = true)) {
					type = selectors[i].match(reOptimizer);
					if (type && type[1] !== ":" && (token = type)) {
						token[1] || (token[1] = "*");
						optimized[i] = optimize(optimized[i], token);
					} else token = [
						"",
						"*",
						"*"
					];
				}
				nodeset[i] = token[1] + token[2];
				htmlset[i] = compat[token[1]](context, token[2]);
				factory[i] = compile(optimized[i], true, null);
				factory[i] ? factory[i](htmlset[i](), callback, context, results) : results.concat(htmlset[i]());
			}
			if (l > 1) {
				results.sort(documentOrder);
				hasDupes && (results = unique(results));
			}
			return {
				callback,
				context,
				factory,
				htmlset,
				nodeset,
				results
			};
		};
		const makeref = function(selectors, element) {
			if (element.nodeType === 9) element = element.documentElement;
			return selectors.replace(/:scope/gi, element.localName + (element.id ? "#" + element.id : "") + (element.className ? "." + element.classList[0] : ""));
		};
		const matchAssert = function(f, element, callback) {
			let r = false;
			for (let i = 0, l = f.length; l > i; ++i) f[i](element, callback, null, false) && (r = true);
			return r;
		};
		const matchCollect = function(selectors, callback) {
			const f = [];
			for (let i = 0, l = selectors.length; l > i; ++i) f[i] = compile(selectors[i], false, callback);
			return { factory: f };
		};
		const match = function _matches(selectors, element, callback) {
			let expressions;
			if (element && !/:has\(/.test(selectors) && matchResolvers[selectors]) return matchAssert(matchResolvers[selectors].factory, element, callback);
			lastMatched = selectors;
			if (arguments.length === 0) {
				emit(qsNotArgs, "TypeError");
				return Config.VERBOSITY ? void 0 : false;
			} else if (arguments[0] === "") {
				emit("''" + qsInvalid);
				return Config.VERBOSITY ? void 0 : false;
			}
			if (typeof selectors !== "string") selectors = "" + selectors;
			if (/:scope/i.test(selectors)) selectors = makeref(selectors, element);
			const parsed = selectors.replace(/\0|\\$/g, "�").replace(REX.combineWSP, " ").replace(REX.pseudosWSP, "$1").replace(REX.tabCharWSP, "	").replace(REX.commaGroup, ",").replace(REX.trimSpaces, "");
			if ((expressions = parsed.match(reValidator)) && expressions.join("") === parsed) {
				expressions = parsed.match(REX.splitGroup);
				if (parsed[parsed.length - 1] === ",") {
					emit(qsInvalid);
					return Config.VERBOSITY ? void 0 : false;
				}
			} else {
				emit("'" + selectors + "' is not a valid selector");
				return Config.VERBOSITY ? void 0 : false;
			}
			matchResolvers[selectors] = matchCollect(expressions, callback);
			return matchAssert(matchResolvers[selectors].factory, element, callback);
		};
		const ancestor = function _closest(selectors, element, callback) {
			if (/:scope/i.test(selectors)) selectors = makeref(selectors, element);
			while (element) {
				if (match(selectors, element, callback)) break;
				element = element.parentElement;
			}
			return element;
		};
		const select = function _querySelectorAll(selectors, context, callback) {
			let expressions;
			let nodes = [];
			let resolver;
			context || (context = doc);
			if (selectors) {
				if (resolver = selectResolvers[selectors]) {
					if (resolver.context === context && resolver.callback === callback) {
						const f = resolver.factory;
						const h = resolver.htmlset;
						const n = resolver.nodeset;
						if (n.length > 1) {
							const l = n.length;
							for (let i = 0, l = n.length, list; l > i; ++i) {
								list = compat[n[i][0]](context, n[i].slice(1))();
								if (f[i] !== null) f[i](list, callback, context, nodes);
								else nodes = nodes.concat(list);
							}
							if (l > 1 && nodes.length > 1) {
								nodes.sort(documentOrder);
								hasDupes && (nodes = unique(nodes));
							}
						} else if (f[0]) nodes = f[0](h[0](), callback, context, nodes);
						else nodes = h[0]();
						return typeof callback === "function" ? concatCall(nodes, callback) : nodes;
					}
				}
			}
			lastSelected = selectors;
			if (arguments.length === 0) {
				emit(qsNotArgs, "TypeError");
				return Config.VERBOSITY ? void 0 : none;
			} else if (arguments[0] === "") {
				emit("''" + qsInvalid);
				return Config.VERBOSITY ? void 0 : none;
			} else if (lastContext !== context) lastContext = switchContext(context);
			if (typeof selectors !== "string") selectors = "" + selectors;
			if (/:scope/i.test(selectors)) selectors = makeref(selectors, context);
			const parsed = selectors.replace(/\0|\\$/g, "�").replace(REX.combineWSP, " ").replace(REX.pseudosWSP, "$1").replace(REX.tabCharWSP, "	").replace(REX.commaGroup, ",").replace(REX.trimSpaces, "");
			if ((expressions = parsed.match(reValidator)) && expressions.join("") === parsed) {
				expressions = parsed.match(REX.splitGroup);
				if (parsed[parsed.length - 1] === ",") {
					emit(qsInvalid);
					return Config.VERBOSITY ? void 0 : false;
				}
			} else {
				emit("'" + selectors + "' is not a valid selector");
				return Config.VERBOSITY ? void 0 : false;
			}
			selectResolvers[selectors] = collect(expressions, context, callback);
			nodes = selectResolvers[selectors].results;
			return typeof callback === "function" ? concatCall(nodes, callback) : nodes;
		};
		const first = function _querySelector(selectors, context, callback) {
			if (arguments.length === 0) emit(qsNotArgs, "TypeError");
			return select(selectors, context, typeof callback === "function" ? function firstMatch(element) {
				callback(element);
				return false;
			} : function firstMatch() {
				return false;
			})[0] || null;
		};
		const initialize = function(d) {
			setIdentifierSyntax();
			lastContext = switchContext(d, true);
			Snapshot.doc = doc;
			Snapshot.from = doc;
			Snapshot.byTag = byTag;
			Snapshot.first = first;
			Snapshot.match = match;
			Snapshot.ancestor = ancestor;
			Snapshot.nthOfType = nthOfType;
			Snapshot.nthElement = nthElement;
			Snapshot.hasAttributeNS = hasAttributeNS;
			Snapshot.isTarget = isTarget;
			Snapshot.isIndeterminate = isIndeterminate;
			Snapshot.isContentEditable = isContentEditable;
		};
		initialize(doc);
		return {
			Version: version,
			configure,
			match,
			closest: ancestor,
			first,
			select
		};
	});
}));
//#endregion
//#region node_modules/bidi-js/dist/bidi.mjs
function bidiFactory() {
	return function(exports) {
		var DATA = {
			"R": "13k,1a,2,3,3,2+1j,ch+16,a+1,5+2,2+n,5,a,4,6+16,4+3,h+1b,4mo,179q,2+9,2+11,2i9+7y,2+68,4,3+4,5+13,4+3,2+4k,3+29,8+cf,1t+7z,w+17,3+3m,1t+3z,16o1+5r,8+30,8+mc,29+1r,29+4v,75+73",
			"EN": "1c+9,3d+1,6,187+9,513,4+5,7+9,sf+j,175h+9,qw+q,161f+1d,4xt+a,25i+9",
			"ES": "17,2,6dp+1,f+1,av,16vr,mx+1,4o,2",
			"ET": "z+2,3h+3,b+1,ym,3e+1,2o,p4+1,8,6u,7c,g6,1wc,1n9+4,30+1b,2n,6d,qhx+1,h0m,a+1,49+2,63+1,4+1,6bb+3,12jj",
			"AN": "16o+5,2j+9,2+1,35,ed,1ff2+9,87+u",
			"CS": "18,2+1,b,2u,12k,55v,l,17v0,2,3,53,2+1,b",
			"B": "a,3,f+2,2v,690",
			"S": "9,2,k",
			"WS": "c,k,4f4,1vk+a,u,1j,335",
			"ON": "x+1,4+4,h+5,r+5,r+3,z,5+3,2+1,2+1,5,2+2,3+4,o,w,ci+1,8+d,3+d,6+8,2+g,39+1,9,6+1,2,33,b8,3+1,3c+1,7+1,5r,b,7h+3,sa+5,2,3i+6,jg+3,ur+9,2v,ij+1,9g+9,7+a,8m,4+1,49+x,14u,2+2,c+2,e+2,e+2,e+1,i+n,e+e,2+p,u+2,e+2,36+1,2+3,2+1,b,2+2,6+5,2,2,2,h+1,5+4,6+3,3+f,16+2,5+3l,3+81,1y+p,2+40,q+a,m+13,2r+ch,2+9e,75+hf,3+v,2+2w,6e+5,f+6,75+2a,1a+p,2+2g,d+5x,r+b,6+3,4+o,g,6+1,6+2,2k+1,4,2j,5h+z,1m+1,1e+f,t+2,1f+e,d+3,4o+3,2s+1,w,535+1r,h3l+1i,93+2,2s,b+1,3l+x,2v,4g+3,21+3,kz+1,g5v+1,5a,j+9,n+v,2,3,2+8,2+1,3+2,2,3,46+1,4+4,h+5,r+5,r+a,3h+2,4+6,b+4,78,1r+24,4+c,4,1hb,ey+6,103+j,16j+c,1ux+7,5+g,fsh,jdq+1t,4,57+2e,p1,1m,1m,1m,1m,4kt+1,7j+17,5+2r,d+e,3+e,2+e,2+10,m+4,w,1n+5,1q,4z+5,4b+rb,9+c,4+c,4+37,d+2g,8+b,l+b,5+1j,9+9,7+13,9+t,3+1,27+3c,2+29,2+3q,d+d,3+4,4+2,6+6,a+o,8+6,a+2,e+6,16+42,2+1i",
			"BN": "0+8,6+d,2s+5,2+p,e,4m9,1kt+2,2b+5,5+5,17q9+v,7k,6p+8,6+1,119d+3,440+7,96s+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+1,1ekf+75,6p+2rz,1ben+1,1ekf+1,1ekf+1",
			"NSM": "lc+33,7o+6,7c+18,2,2+1,2+1,2,21+a,1d+k,h,2u+6,3+5,3+1,2+3,10,v+q,2k+a,1n+8,a,p+3,2+8,2+2,2+4,18+2,3c+e,2+v,1k,2,5+7,5,4+6,b+1,u,1n,5+3,9,l+1,r,3+1,1m,5+1,5+1,3+2,4,v+1,4,c+1,1m,5+4,2+1,5,l+1,n+5,2,1n,3,2+3,9,8+1,c+1,v,1q,d,1f,4,1m+2,6+2,2+3,8+1,c+1,u,1n,g+1,l+1,t+1,1m+1,5+3,9,l+1,u,21,8+2,2,2j,3+6,d+7,2r,3+8,c+5,23+1,s,2,2,1k+d,2+4,2+1,6+a,2+z,a,2v+3,2+5,2+1,3+1,q+1,5+2,h+3,e,3+1,7,g,jk+2,qb+2,u+2,u+1,v+1,1t+1,2+6,9,3+a,a,1a+2,3c+1,z,3b+2,5+1,a,7+2,64+1,3,1n,2+6,2,2,3+7,7+9,3,1d+g,1s+3,1d,2+4,2,6,15+8,d+1,x+3,3+1,2+2,1l,2+1,4,2+2,1n+7,3+1,49+2,2+c,2+6,5,7,4+1,5j+1l,2+4,k1+w,2db+2,3y,2p+v,ff+3,30+1,n9x+3,2+9,x+1,29+1,7l,4,5,q+1,6,48+1,r+h,e,13+7,q+a,1b+2,1d,3+3,3+1,14,1w+5,3+1,3+1,d,9,1c,1g,2+2,3+1,6+1,2,17+1,9,6n,3,5,fn5,ki+f,h+f,r2,6b,46+4,1af+2,2+1,6+3,15+2,5,4m+1,fy+3,as+1,4a+a,4x,1j+e,1l+2,1e+3,3+1,1y+2,11+4,2+7,1r,d+1,1h+8,b+3,3,2o+2,3,2+1,7,4h,4+7,m+1,1m+1,4,12+6,4+4,5g+7,3+2,2,o,2d+5,2,5+1,2+1,6n+3,7+1,2+1,s+1,2e+7,3,2+1,2z,2,3+5,2,2u+2,3+3,2+4,78+8,2+1,75+1,2,5,41+3,3+1,5,x+5,3+1,15+5,3+3,9,a+5,3+2,1b+c,2+1,bb+6,2+5,2d+l,3+6,2+1,2+1,3f+5,4,2+1,2+6,2,21+1,4,2,9o+1,f0c+4,1o+6,t5,1s+3,2a,f5l+1,43t+2,i+7,3+6,v+3,45+2,1j0+1i,5+1d,9,f,n+4,2+e,11t+6,2+g,3+6,2+1,2+4,7a+6,c6+3,15t+6,32+6,gzhy+6n",
			"AL": "16w,3,2,e+1b,z+2,2+2s,g+1,8+1,b+m,2+t,s+2i,c+e,4h+f,1d+1e,1bwe+dp,3+3z,x+c,2+1,35+3y,2rm+z,5+7,b+5,dt+l,c+u,17nl+27,1t+27,4x+6n,3+d",
			"LRO": "6ct",
			"RLO": "6cu",
			"LRE": "6cq",
			"RLE": "6cr",
			"PDF": "6cs",
			"LRI": "6ee",
			"RLI": "6ef",
			"FSI": "6eg",
			"PDI": "6eh"
		};
		var TYPES = {};
		var TYPES_TO_NAMES = {};
		TYPES.L = 1;
		TYPES_TO_NAMES[1] = "L";
		Object.keys(DATA).forEach(function(type, i) {
			TYPES[type] = 1 << i + 1;
			TYPES_TO_NAMES[TYPES[type]] = type;
		});
		Object.freeze(TYPES);
		var ISOLATE_INIT_TYPES = TYPES.LRI | TYPES.RLI | TYPES.FSI;
		var STRONG_TYPES = TYPES.L | TYPES.R | TYPES.AL;
		var NEUTRAL_ISOLATE_TYPES = TYPES.B | TYPES.S | TYPES.WS | TYPES.ON | TYPES.FSI | TYPES.LRI | TYPES.RLI | TYPES.PDI;
		var BN_LIKE_TYPES = TYPES.BN | TYPES.RLE | TYPES.LRE | TYPES.RLO | TYPES.LRO | TYPES.PDF;
		var TRAILING_TYPES = TYPES.S | TYPES.WS | TYPES.B | ISOLATE_INIT_TYPES | TYPES.PDI | BN_LIKE_TYPES;
		var map = null;
		function parseData() {
			if (!map) {
				map = /* @__PURE__ */ new Map();
				var loop = function(type) {
					if (DATA.hasOwnProperty(type)) {
						var lastCode = 0;
						DATA[type].split(",").forEach(function(range) {
							var ref = range.split("+");
							var skip = ref[0];
							var step = ref[1];
							skip = parseInt(skip, 36);
							step = step ? parseInt(step, 36) : 0;
							map.set(lastCode += skip, TYPES[type]);
							for (var i = 0; i < step; i++) map.set(++lastCode, TYPES[type]);
						});
					}
				};
				for (var type in DATA) loop(type);
			}
		}
		/**
		* @param {string} char
		* @return {number}
		*/
		function getBidiCharType(char) {
			parseData();
			return map.get(char.codePointAt(0)) || TYPES.L;
		}
		function getBidiCharTypeName(char) {
			return TYPES_TO_NAMES[getBidiCharType(char)];
		}
		var data$1 = {
			"pairs": "14>1,1e>2,u>2,2wt>1,1>1,1ge>1,1wp>1,1j>1,f>1,hm>1,1>1,u>1,u6>1,1>1,+5,28>1,w>1,1>1,+3,b8>1,1>1,+3,1>3,-1>-1,3>1,1>1,+2,1s>1,1>1,x>1,th>1,1>1,+2,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,4q>1,1e>2,u>2,2>1,+1",
			"canonical": "6f1>-6dx,6dy>-6dx,6ec>-6ed,6ee>-6ed,6ww>2jj,-2ji>2jj,14r4>-1e7l,1e7m>-1e7l,1e7m>-1e5c,1e5d>-1e5b,1e5c>-14qx,14qy>-14qx,14vn>-1ecg,1ech>-1ecg,1edu>-1ecg,1eci>-1ecg,1eda>-1ecg,1eci>-1ecg,1eci>-168q,168r>-168q,168s>-14ye,14yf>-14ye"
		};
		/**
		* Parses an string that holds encoded codepoint mappings, e.g. for bracket pairs or
		* mirroring characters, as encoded by scripts/generateBidiData.js. Returns an object
		* holding the `map`, and optionally a `reverseMap` if `includeReverse:true`.
		* @param {string} encodedString
		* @param {boolean} includeReverse - true if you want reverseMap in the output
		* @return {{map: Map<number, number>, reverseMap?: Map<number, number>}}
		*/
		function parseCharacterMap(encodedString, includeReverse) {
			var radix = 36;
			var lastCode = 0;
			var map = /* @__PURE__ */ new Map();
			var reverseMap = includeReverse && /* @__PURE__ */ new Map();
			var prevPair;
			encodedString.split(",").forEach(function visit(entry) {
				if (entry.indexOf("+") !== -1) for (var i = +entry; i--;) visit(prevPair);
				else {
					prevPair = entry;
					var ref = entry.split(">");
					var a = ref[0];
					var b = ref[1];
					a = String.fromCodePoint(lastCode += parseInt(a, radix));
					b = String.fromCodePoint(lastCode += parseInt(b, radix));
					map.set(a, b);
					includeReverse && reverseMap.set(b, a);
				}
			});
			return {
				map,
				reverseMap
			};
		}
		var openToClose, closeToOpen, canonical;
		function parse$1() {
			if (!openToClose) {
				var ref = parseCharacterMap(data$1.pairs, true);
				var map = ref.map;
				var reverseMap = ref.reverseMap;
				openToClose = map;
				closeToOpen = reverseMap;
				canonical = parseCharacterMap(data$1.canonical, false).map;
			}
		}
		function openingToClosingBracket(char) {
			parse$1();
			return openToClose.get(char) || null;
		}
		function closingToOpeningBracket(char) {
			parse$1();
			return closeToOpen.get(char) || null;
		}
		function getCanonicalBracket(char) {
			parse$1();
			return canonical.get(char) || null;
		}
		var TYPE_L = TYPES.L;
		var TYPE_R = TYPES.R;
		var TYPE_EN = TYPES.EN;
		var TYPE_ES = TYPES.ES;
		var TYPE_ET = TYPES.ET;
		var TYPE_AN = TYPES.AN;
		var TYPE_CS = TYPES.CS;
		var TYPE_B = TYPES.B;
		var TYPE_S = TYPES.S;
		var TYPE_ON = TYPES.ON;
		var TYPE_BN = TYPES.BN;
		var TYPE_NSM = TYPES.NSM;
		var TYPE_AL = TYPES.AL;
		var TYPE_LRO = TYPES.LRO;
		var TYPE_RLO = TYPES.RLO;
		var TYPE_LRE = TYPES.LRE;
		var TYPE_RLE = TYPES.RLE;
		var TYPE_PDF = TYPES.PDF;
		var TYPE_LRI = TYPES.LRI;
		var TYPE_RLI = TYPES.RLI;
		var TYPE_FSI = TYPES.FSI;
		var TYPE_PDI = TYPES.PDI;
		/**
		* @typedef {object} GetEmbeddingLevelsResult
		* @property {{start, end, level}[]} paragraphs
		* @property {Uint8Array} levels
		*/
		/**
		* This function applies the Bidirectional Algorithm to a string, returning the resolved embedding levels
		* in a single Uint8Array plus a list of objects holding each paragraph's start and end indices and resolved
		* base embedding level.
		*
		* @param {string} string - The input string
		* @param {"ltr"|"rtl"|"auto"} [baseDirection] - Use "ltr" or "rtl" to force a base paragraph direction,
		*        otherwise a direction will be chosen automatically from each paragraph's contents.
		* @return {GetEmbeddingLevelsResult}
		*/
		function getEmbeddingLevels(string, baseDirection) {
			var MAX_DEPTH = 125;
			var charTypes = new Uint32Array(string.length);
			for (var i = 0; i < string.length; i++) charTypes[i] = getBidiCharType(string[i]);
			var charTypeCounts = /* @__PURE__ */ new Map();
			function changeCharType(i, type) {
				var oldType = charTypes[i];
				charTypes[i] = type;
				charTypeCounts.set(oldType, charTypeCounts.get(oldType) - 1);
				if (oldType & NEUTRAL_ISOLATE_TYPES) charTypeCounts.set(NEUTRAL_ISOLATE_TYPES, charTypeCounts.get(NEUTRAL_ISOLATE_TYPES) - 1);
				charTypeCounts.set(type, (charTypeCounts.get(type) || 0) + 1);
				if (type & NEUTRAL_ISOLATE_TYPES) charTypeCounts.set(NEUTRAL_ISOLATE_TYPES, (charTypeCounts.get(NEUTRAL_ISOLATE_TYPES) || 0) + 1);
			}
			var embedLevels = new Uint8Array(string.length);
			var isolationPairs = /* @__PURE__ */ new Map();
			var paragraphs = [];
			var paragraph = null;
			for (var i$1 = 0; i$1 < string.length; i$1++) {
				if (!paragraph) paragraphs.push(paragraph = {
					start: i$1,
					end: string.length - 1,
					level: baseDirection === "rtl" ? 1 : baseDirection === "ltr" ? 0 : determineAutoEmbedLevel(i$1, false)
				});
				if (charTypes[i$1] & TYPE_B) {
					paragraph.end = i$1;
					paragraph = null;
				}
			}
			var FORMATTING_TYPES = TYPE_RLE | TYPE_LRE | TYPE_RLO | TYPE_LRO | ISOLATE_INIT_TYPES | TYPE_PDI | TYPE_PDF | TYPE_B;
			var nextEven = function(n) {
				return n + (n & 1 ? 1 : 2);
			};
			var nextOdd = function(n) {
				return n + (n & 1 ? 2 : 1);
			};
			for (var paraIdx = 0; paraIdx < paragraphs.length; paraIdx++) {
				paragraph = paragraphs[paraIdx];
				var statusStack = [{
					_level: paragraph.level,
					_override: 0,
					_isolate: 0
				}];
				var stackTop = void 0;
				var overflowIsolateCount = 0;
				var overflowEmbeddingCount = 0;
				var validIsolateCount = 0;
				charTypeCounts.clear();
				for (var i$2 = paragraph.start; i$2 <= paragraph.end; i$2++) {
					var charType = charTypes[i$2];
					stackTop = statusStack[statusStack.length - 1];
					charTypeCounts.set(charType, (charTypeCounts.get(charType) || 0) + 1);
					if (charType & NEUTRAL_ISOLATE_TYPES) charTypeCounts.set(NEUTRAL_ISOLATE_TYPES, (charTypeCounts.get(NEUTRAL_ISOLATE_TYPES) || 0) + 1);
					if (charType & FORMATTING_TYPES) {
						if (charType & (TYPE_RLE | TYPE_LRE)) {
							embedLevels[i$2] = stackTop._level;
							var level = (charType === TYPE_RLE ? nextOdd : nextEven)(stackTop._level);
							if (level <= MAX_DEPTH && !overflowIsolateCount && !overflowEmbeddingCount) statusStack.push({
								_level: level,
								_override: 0,
								_isolate: 0
							});
							else if (!overflowIsolateCount) overflowEmbeddingCount++;
						} else if (charType & (TYPE_RLO | TYPE_LRO)) {
							embedLevels[i$2] = stackTop._level;
							var level$1 = (charType === TYPE_RLO ? nextOdd : nextEven)(stackTop._level);
							if (level$1 <= MAX_DEPTH && !overflowIsolateCount && !overflowEmbeddingCount) statusStack.push({
								_level: level$1,
								_override: charType & TYPE_RLO ? TYPE_R : TYPE_L,
								_isolate: 0
							});
							else if (!overflowIsolateCount) overflowEmbeddingCount++;
						} else if (charType & ISOLATE_INIT_TYPES) {
							if (charType & TYPE_FSI) charType = determineAutoEmbedLevel(i$2 + 1, true) === 1 ? TYPE_RLI : TYPE_LRI;
							embedLevels[i$2] = stackTop._level;
							if (stackTop._override) changeCharType(i$2, stackTop._override);
							var level$2 = (charType === TYPE_RLI ? nextOdd : nextEven)(stackTop._level);
							if (level$2 <= MAX_DEPTH && overflowIsolateCount === 0 && overflowEmbeddingCount === 0) {
								validIsolateCount++;
								statusStack.push({
									_level: level$2,
									_override: 0,
									_isolate: 1,
									_isolInitIndex: i$2
								});
							} else overflowIsolateCount++;
						} else if (charType & TYPE_PDI) {
							if (overflowIsolateCount > 0) overflowIsolateCount--;
							else if (validIsolateCount > 0) {
								overflowEmbeddingCount = 0;
								while (!statusStack[statusStack.length - 1]._isolate) statusStack.pop();
								var isolInitIndex = statusStack[statusStack.length - 1]._isolInitIndex;
								if (isolInitIndex != null) {
									isolationPairs.set(isolInitIndex, i$2);
									isolationPairs.set(i$2, isolInitIndex);
								}
								statusStack.pop();
								validIsolateCount--;
							}
							stackTop = statusStack[statusStack.length - 1];
							embedLevels[i$2] = stackTop._level;
							if (stackTop._override) changeCharType(i$2, stackTop._override);
						} else if (charType & TYPE_PDF) {
							if (overflowIsolateCount === 0) {
								if (overflowEmbeddingCount > 0) overflowEmbeddingCount--;
								else if (!stackTop._isolate && statusStack.length > 1) {
									statusStack.pop();
									stackTop = statusStack[statusStack.length - 1];
								}
							}
							embedLevels[i$2] = stackTop._level;
						} else if (charType & TYPE_B) embedLevels[i$2] = paragraph.level;
					} else {
						embedLevels[i$2] = stackTop._level;
						if (stackTop._override && charType !== TYPE_BN) changeCharType(i$2, stackTop._override);
					}
				}
				var levelRuns = [];
				var currentRun = null;
				for (var i$3 = paragraph.start; i$3 <= paragraph.end; i$3++) {
					var charType$1 = charTypes[i$3];
					if (!(charType$1 & BN_LIKE_TYPES)) {
						var lvl = embedLevels[i$3];
						var isIsolInit = charType$1 & ISOLATE_INIT_TYPES;
						var isPDI = charType$1 === TYPE_PDI;
						if (currentRun && lvl === currentRun._level) {
							currentRun._end = i$3;
							currentRun._endsWithIsolInit = isIsolInit;
						} else levelRuns.push(currentRun = {
							_start: i$3,
							_end: i$3,
							_level: lvl,
							_startsWithPDI: isPDI,
							_endsWithIsolInit: isIsolInit
						});
					}
				}
				var isolatingRunSeqs = [];
				for (var runIdx = 0; runIdx < levelRuns.length; runIdx++) {
					var run = levelRuns[runIdx];
					if (!run._startsWithPDI || run._startsWithPDI && !isolationPairs.has(run._start)) {
						var seqRuns = [currentRun = run];
						for (var pdiIndex = void 0; currentRun && currentRun._endsWithIsolInit && (pdiIndex = isolationPairs.get(currentRun._end)) != null;) for (var i$4 = runIdx + 1; i$4 < levelRuns.length; i$4++) if (levelRuns[i$4]._start === pdiIndex) {
							seqRuns.push(currentRun = levelRuns[i$4]);
							break;
						}
						var seqIndices = [];
						for (var i$5 = 0; i$5 < seqRuns.length; i$5++) {
							var run$1 = seqRuns[i$5];
							for (var j = run$1._start; j <= run$1._end; j++) seqIndices.push(j);
						}
						var firstLevel = embedLevels[seqIndices[0]];
						var prevLevel = paragraph.level;
						for (var i$6 = seqIndices[0] - 1; i$6 >= 0; i$6--) if (!(charTypes[i$6] & BN_LIKE_TYPES)) {
							prevLevel = embedLevels[i$6];
							break;
						}
						var lastIndex = seqIndices[seqIndices.length - 1];
						var lastLevel = embedLevels[lastIndex];
						var nextLevel = paragraph.level;
						if (!(charTypes[lastIndex] & ISOLATE_INIT_TYPES)) {
							for (var i$7 = lastIndex + 1; i$7 <= paragraph.end; i$7++) if (!(charTypes[i$7] & BN_LIKE_TYPES)) {
								nextLevel = embedLevels[i$7];
								break;
							}
						}
						isolatingRunSeqs.push({
							_seqIndices: seqIndices,
							_sosType: Math.max(prevLevel, firstLevel) % 2 ? TYPE_R : TYPE_L,
							_eosType: Math.max(nextLevel, lastLevel) % 2 ? TYPE_R : TYPE_L
						});
					}
				}
				for (var seqIdx = 0; seqIdx < isolatingRunSeqs.length; seqIdx++) {
					var ref = isolatingRunSeqs[seqIdx];
					var seqIndices$1 = ref._seqIndices;
					var sosType = ref._sosType;
					var eosType = ref._eosType;
					/**
					* All the level runs in an isolating run sequence have the same embedding level.
					* 
					* DO NOT change any `embedLevels[i]` within the current scope.
					*/
					var embedDirection = embedLevels[seqIndices$1[0]] & 1 ? TYPE_R : TYPE_L;
					if (charTypeCounts.get(TYPE_NSM)) for (var si = 0; si < seqIndices$1.length; si++) {
						var i$8 = seqIndices$1[si];
						if (charTypes[i$8] & TYPE_NSM) {
							var prevType = sosType;
							for (var sj = si - 1; sj >= 0; sj--) if (!(charTypes[seqIndices$1[sj]] & BN_LIKE_TYPES)) {
								prevType = charTypes[seqIndices$1[sj]];
								break;
							}
							changeCharType(i$8, prevType & (ISOLATE_INIT_TYPES | TYPE_PDI) ? TYPE_ON : prevType);
						}
					}
					if (charTypeCounts.get(TYPE_EN)) for (var si$1 = 0; si$1 < seqIndices$1.length; si$1++) {
						var i$9 = seqIndices$1[si$1];
						if (charTypes[i$9] & TYPE_EN) for (var sj$1 = si$1 - 1; sj$1 >= -1; sj$1--) {
							var prevCharType = sj$1 === -1 ? sosType : charTypes[seqIndices$1[sj$1]];
							if (prevCharType & STRONG_TYPES) {
								if (prevCharType === TYPE_AL) changeCharType(i$9, TYPE_AN);
								break;
							}
						}
					}
					if (charTypeCounts.get(TYPE_AL)) for (var si$2 = 0; si$2 < seqIndices$1.length; si$2++) {
						var i$10 = seqIndices$1[si$2];
						if (charTypes[i$10] & TYPE_AL) changeCharType(i$10, TYPE_R);
					}
					if (charTypeCounts.get(TYPE_ES) || charTypeCounts.get(TYPE_CS)) for (var si$3 = 1; si$3 < seqIndices$1.length - 1; si$3++) {
						var i$11 = seqIndices$1[si$3];
						if (charTypes[i$11] & (TYPE_ES | TYPE_CS)) {
							var prevType$1 = 0, nextType = 0;
							for (var sj$2 = si$3 - 1; sj$2 >= 0; sj$2--) {
								prevType$1 = charTypes[seqIndices$1[sj$2]];
								if (!(prevType$1 & BN_LIKE_TYPES)) break;
							}
							for (var sj$3 = si$3 + 1; sj$3 < seqIndices$1.length; sj$3++) {
								nextType = charTypes[seqIndices$1[sj$3]];
								if (!(nextType & BN_LIKE_TYPES)) break;
							}
							if (prevType$1 === nextType && (charTypes[i$11] === TYPE_ES ? prevType$1 === TYPE_EN : prevType$1 & (TYPE_EN | TYPE_AN))) changeCharType(i$11, prevType$1);
						}
					}
					if (charTypeCounts.get(TYPE_EN)) {
						for (var si$4 = 0; si$4 < seqIndices$1.length; si$4++) if (charTypes[seqIndices$1[si$4]] & TYPE_EN) {
							for (var sj$4 = si$4 - 1; sj$4 >= 0 && charTypes[seqIndices$1[sj$4]] & (TYPE_ET | BN_LIKE_TYPES); sj$4--) changeCharType(seqIndices$1[sj$4], TYPE_EN);
							for (si$4++; si$4 < seqIndices$1.length && charTypes[seqIndices$1[si$4]] & (TYPE_ET | BN_LIKE_TYPES | TYPE_EN); si$4++) if (charTypes[seqIndices$1[si$4]] !== TYPE_EN) changeCharType(seqIndices$1[si$4], TYPE_EN);
						}
					}
					if (charTypeCounts.get(TYPE_ET) || charTypeCounts.get(TYPE_ES) || charTypeCounts.get(TYPE_CS)) for (var si$5 = 0; si$5 < seqIndices$1.length; si$5++) {
						var i$13 = seqIndices$1[si$5];
						if (charTypes[i$13] & (TYPE_ET | TYPE_ES | TYPE_CS)) {
							changeCharType(i$13, TYPE_ON);
							for (var sj$5 = si$5 - 1; sj$5 >= 0 && charTypes[seqIndices$1[sj$5]] & BN_LIKE_TYPES; sj$5--) changeCharType(seqIndices$1[sj$5], TYPE_ON);
							for (var sj$6 = si$5 + 1; sj$6 < seqIndices$1.length && charTypes[seqIndices$1[sj$6]] & BN_LIKE_TYPES; sj$6++) changeCharType(seqIndices$1[sj$6], TYPE_ON);
						}
					}
					if (charTypeCounts.get(TYPE_EN)) for (var si$6 = 0, prevStrongType = sosType; si$6 < seqIndices$1.length; si$6++) {
						var i$14 = seqIndices$1[si$6];
						var type = charTypes[i$14];
						if (type & TYPE_EN) {
							if (prevStrongType === TYPE_L) changeCharType(i$14, TYPE_L);
						} else if (type & STRONG_TYPES) prevStrongType = type;
					}
					if (charTypeCounts.get(NEUTRAL_ISOLATE_TYPES)) {
						var R_TYPES_FOR_N_STEPS = TYPE_R | TYPE_EN | TYPE_AN;
						var STRONG_TYPES_FOR_N_STEPS = R_TYPES_FOR_N_STEPS | TYPE_L;
						var bracketPairs = [];
						var openerStack = [];
						for (var si$7 = 0; si$7 < seqIndices$1.length; si$7++) if (charTypes[seqIndices$1[si$7]] & NEUTRAL_ISOLATE_TYPES) {
							var char = string[seqIndices$1[si$7]];
							var oppositeBracket = void 0;
							if (openingToClosingBracket(char) !== null) if (openerStack.length < 63) openerStack.push({
								char,
								seqIndex: si$7
							});
							else break;
							else if ((oppositeBracket = closingToOpeningBracket(char)) !== null) for (var stackIdx = openerStack.length - 1; stackIdx >= 0; stackIdx--) {
								var stackChar = openerStack[stackIdx].char;
								if (stackChar === oppositeBracket || stackChar === closingToOpeningBracket(getCanonicalBracket(char)) || openingToClosingBracket(getCanonicalBracket(stackChar)) === char) {
									bracketPairs.push([openerStack[stackIdx].seqIndex, si$7]);
									openerStack.length = stackIdx;
									break;
								}
							}
						}
						bracketPairs.sort(function(a, b) {
							return a[0] - b[0];
						});
						for (var pairIdx = 0; pairIdx < bracketPairs.length; pairIdx++) {
							var ref$1 = bracketPairs[pairIdx];
							var openSeqIdx = ref$1[0];
							var closeSeqIdx = ref$1[1];
							var foundStrongType = false;
							var useStrongType = 0;
							for (var si$8 = openSeqIdx + 1; si$8 < closeSeqIdx; si$8++) {
								var i$15 = seqIndices$1[si$8];
								if (charTypes[i$15] & STRONG_TYPES_FOR_N_STEPS) {
									foundStrongType = true;
									var lr = charTypes[i$15] & R_TYPES_FOR_N_STEPS ? TYPE_R : TYPE_L;
									if (lr === embedDirection) {
										useStrongType = lr;
										break;
									}
								}
							}
							if (foundStrongType && !useStrongType) {
								useStrongType = sosType;
								for (var si$9 = openSeqIdx - 1; si$9 >= 0; si$9--) {
									var i$16 = seqIndices$1[si$9];
									if (charTypes[i$16] & STRONG_TYPES_FOR_N_STEPS) {
										var lr$1 = charTypes[i$16] & R_TYPES_FOR_N_STEPS ? TYPE_R : TYPE_L;
										if (lr$1 !== embedDirection) useStrongType = lr$1;
										else useStrongType = embedDirection;
										break;
									}
								}
							}
							if (useStrongType) {
								charTypes[seqIndices$1[openSeqIdx]] = charTypes[seqIndices$1[closeSeqIdx]] = useStrongType;
								if (useStrongType !== embedDirection) {
									for (var si$10 = openSeqIdx + 1; si$10 < seqIndices$1.length; si$10++) if (!(charTypes[seqIndices$1[si$10]] & BN_LIKE_TYPES)) {
										if (getBidiCharType(string[seqIndices$1[si$10]]) & TYPE_NSM) charTypes[seqIndices$1[si$10]] = useStrongType;
										break;
									}
								}
								if (useStrongType !== embedDirection) {
									for (var si$11 = closeSeqIdx + 1; si$11 < seqIndices$1.length; si$11++) if (!(charTypes[seqIndices$1[si$11]] & BN_LIKE_TYPES)) {
										if (getBidiCharType(string[seqIndices$1[si$11]]) & TYPE_NSM) charTypes[seqIndices$1[si$11]] = useStrongType;
										break;
									}
								}
							}
						}
						for (var si$12 = 0; si$12 < seqIndices$1.length; si$12++) if (charTypes[seqIndices$1[si$12]] & NEUTRAL_ISOLATE_TYPES) {
							var niRunStart = si$12, niRunEnd = si$12;
							var prevType$2 = sosType;
							for (var si2 = si$12 - 1; si2 >= 0; si2--) if (charTypes[seqIndices$1[si2]] & BN_LIKE_TYPES) niRunStart = si2;
							else {
								prevType$2 = charTypes[seqIndices$1[si2]] & R_TYPES_FOR_N_STEPS ? TYPE_R : TYPE_L;
								break;
							}
							var nextType$1 = eosType;
							for (var si2$1 = si$12 + 1; si2$1 < seqIndices$1.length; si2$1++) if (charTypes[seqIndices$1[si2$1]] & (NEUTRAL_ISOLATE_TYPES | BN_LIKE_TYPES)) niRunEnd = si2$1;
							else {
								nextType$1 = charTypes[seqIndices$1[si2$1]] & R_TYPES_FOR_N_STEPS ? TYPE_R : TYPE_L;
								break;
							}
							for (var sj$7 = niRunStart; sj$7 <= niRunEnd; sj$7++) charTypes[seqIndices$1[sj$7]] = prevType$2 === nextType$1 ? prevType$2 : embedDirection;
							si$12 = niRunEnd;
						}
					}
				}
				for (var i$17 = paragraph.start; i$17 <= paragraph.end; i$17++) {
					var level$3 = embedLevels[i$17];
					var type$1 = charTypes[i$17];
					if (level$3 & 1) {
						if (type$1 & (TYPE_L | TYPE_EN | TYPE_AN)) embedLevels[i$17]++;
					} else if (type$1 & TYPE_R) embedLevels[i$17]++;
					else if (type$1 & (TYPE_AN | TYPE_EN)) embedLevels[i$17] += 2;
					if (type$1 & BN_LIKE_TYPES) embedLevels[i$17] = i$17 === 0 ? paragraph.level : embedLevels[i$17 - 1];
					if (i$17 === paragraph.end || getBidiCharType(string[i$17]) & (TYPE_S | TYPE_B)) for (var j$1 = i$17; j$1 >= 0 && getBidiCharType(string[j$1]) & TRAILING_TYPES; j$1--) embedLevels[j$1] = paragraph.level;
				}
			}
			return {
				levels: embedLevels,
				paragraphs
			};
			function determineAutoEmbedLevel(start, isFSI) {
				for (var i = start; i < string.length; i++) {
					var charType = charTypes[i];
					if (charType & (TYPE_R | TYPE_AL)) return 1;
					if (charType & (TYPE_B | TYPE_L) || isFSI && charType === TYPE_PDI) return 0;
					if (charType & ISOLATE_INIT_TYPES) {
						var pdi = indexOfMatchingPDI(i);
						i = pdi === -1 ? string.length : pdi;
					}
				}
				return 0;
			}
			function indexOfMatchingPDI(isolateStart) {
				var isolationLevel = 1;
				for (var i = isolateStart + 1; i < string.length; i++) {
					var charType = charTypes[i];
					if (charType & TYPE_B) break;
					if (charType & TYPE_PDI) {
						if (--isolationLevel === 0) return i;
					} else if (charType & ISOLATE_INIT_TYPES) isolationLevel++;
				}
				return -1;
			}
		}
		var data = "14>1,j>2,t>2,u>2,1a>g,2v3>1,1>1,1ge>1,1wd>1,b>1,1j>1,f>1,ai>3,-2>3,+1,8>1k0,-1jq>1y7,-1y6>1hf,-1he>1h6,-1h5>1ha,-1h8>1qi,-1pu>1,6>3u,-3s>7,6>1,1>1,f>1,1>1,+2,3>1,1>1,+13,4>1,1>1,6>1eo,-1ee>1,3>1mg,-1me>1mk,-1mj>1mi,-1mg>1mi,-1md>1,1>1,+2,1>10k,-103>1,1>1,4>1,5>1,1>1,+10,3>1,1>8,-7>8,+1,-6>7,+1,a>1,1>1,u>1,u6>1,1>1,+5,26>1,1>1,2>1,2>2,8>1,7>1,4>1,1>1,+5,b8>1,1>1,+3,1>3,-2>1,2>1,1>1,+2,c>1,3>1,1>1,+2,h>1,3>1,a>1,1>1,2>1,3>1,1>1,d>1,f>1,3>1,1a>1,1>1,6>1,7>1,13>1,k>1,1>1,+19,4>1,1>1,+2,2>1,1>1,+18,m>1,a>1,1>1,lk>1,1>1,4>1,2>1,f>1,3>1,1>1,+3,db>1,1>1,+3,3>1,1>1,+2,14qm>1,1>1,+1,6>1,4j>1,j>2,t>2,u>2,2>1,+1";
		var mirrorMap;
		function parse() {
			if (!mirrorMap) {
				var ref = parseCharacterMap(data, true);
				var map = ref.map;
				ref.reverseMap.forEach(function(value, key) {
					map.set(key, value);
				});
				mirrorMap = map;
			}
		}
		function getMirroredCharacter(char) {
			parse();
			return mirrorMap.get(char) || null;
		}
		/**
		* Given a string and its resolved embedding levels, build a map of indices to replacement chars
		* for any characters in right-to-left segments that have defined mirrored characters.
		* @param string
		* @param embeddingLevels
		* @param [start]
		* @param [end]
		* @return {Map<number, string>}
		*/
		function getMirroredCharactersMap(string, embeddingLevels, start, end) {
			var strLen = string.length;
			start = Math.max(0, start == null ? 0 : +start);
			end = Math.min(strLen - 1, end == null ? strLen - 1 : +end);
			var map = /* @__PURE__ */ new Map();
			for (var i = start; i <= end; i++) if (embeddingLevels[i] & 1) {
				var mirror = getMirroredCharacter(string[i]);
				if (mirror !== null) map.set(i, mirror);
			}
			return map;
		}
		/**
		* Given a start and end denoting a single line within a string, and a set of precalculated
		* bidi embedding levels, produce a list of segments whose ordering should be flipped, in sequence.
		* @param {string} string - the full input string
		* @param {GetEmbeddingLevelsResult} embeddingLevelsResult - the result object from getEmbeddingLevels
		* @param {number} [start] - first character in a subset of the full string
		* @param {number} [end] - last character in a subset of the full string
		* @return {number[][]} - the list of start/end segments that should be flipped, in order.
		*/
		function getReorderSegments(string, embeddingLevelsResult, start, end) {
			var strLen = string.length;
			start = Math.max(0, start == null ? 0 : +start);
			end = Math.min(strLen - 1, end == null ? strLen - 1 : +end);
			var segments = [];
			embeddingLevelsResult.paragraphs.forEach(function(paragraph) {
				var lineStart = Math.max(start, paragraph.start);
				var lineEnd = Math.min(end, paragraph.end);
				if (lineStart < lineEnd) {
					var lineLevels = embeddingLevelsResult.levels.slice(lineStart, lineEnd + 1);
					for (var i = lineEnd; i >= lineStart && getBidiCharType(string[i]) & TRAILING_TYPES; i--) lineLevels[i] = paragraph.level;
					var maxLevel = paragraph.level;
					var minOddLevel = Infinity;
					for (var i$1 = 0; i$1 < lineLevels.length; i$1++) {
						var level = lineLevels[i$1];
						if (level > maxLevel) maxLevel = level;
						if (level < minOddLevel) minOddLevel = level | 1;
					}
					for (var lvl = maxLevel; lvl >= minOddLevel; lvl--) for (var i$2 = 0; i$2 < lineLevels.length; i$2++) if (lineLevels[i$2] >= lvl) {
						var segStart = i$2;
						while (i$2 + 1 < lineLevels.length && lineLevels[i$2 + 1] >= lvl) i$2++;
						if (i$2 > segStart) segments.push([segStart + lineStart, i$2 + lineStart]);
					}
				}
			});
			return segments;
		}
		/**
		* @param {string} string
		* @param {GetEmbeddingLevelsResult} embedLevelsResult
		* @param {number} [start]
		* @param {number} [end]
		* @return {string} the new string with bidi segments reordered
		*/
		function getReorderedString(string, embedLevelsResult, start, end) {
			var indices = getReorderedIndices(string, embedLevelsResult, start, end);
			var chars = [].concat(string);
			indices.forEach(function(charIndex, i) {
				chars[i] = (embedLevelsResult.levels[charIndex] & 1 ? getMirroredCharacter(string[charIndex]) : null) || string[charIndex];
			});
			return chars.join("");
		}
		/**
		* @param {string} string
		* @param {GetEmbeddingLevelsResult} embedLevelsResult
		* @param {number} [start]
		* @param {number} [end]
		* @return {number[]} an array with character indices in their new bidi order
		*/
		function getReorderedIndices(string, embedLevelsResult, start, end) {
			var segments = getReorderSegments(string, embedLevelsResult, start, end);
			var indices = [];
			for (var i = 0; i < string.length; i++) indices[i] = i;
			segments.forEach(function(ref) {
				var start = ref[0];
				var end = ref[1];
				var slice = indices.slice(start, end + 1);
				for (var i = slice.length; i--;) indices[end - i] = slice[i];
			});
			return indices;
		}
		exports.closingToOpeningBracket = closingToOpeningBracket;
		exports.getBidiCharType = getBidiCharType;
		exports.getBidiCharTypeName = getBidiCharTypeName;
		exports.getCanonicalBracket = getCanonicalBracket;
		exports.getEmbeddingLevels = getEmbeddingLevels;
		exports.getMirroredCharacter = getMirroredCharacter;
		exports.getMirroredCharactersMap = getMirroredCharactersMap;
		exports.getReorderSegments = getReorderSegments;
		exports.getReorderedIndices = getReorderedIndices;
		exports.getReorderedString = getReorderedString;
		exports.openingToClosingBracket = openingToClosingBracket;
		Object.defineProperty(exports, "__esModule", { value: true });
		return exports;
	}({});
}
var init_bidi = __esmMin((() => {})), ATTR_SELECTOR, CLASS_SELECTOR, COMBINATOR, ID_SELECTOR, NOT_SUPPORTED_ERR, PS_CLASS_SELECTOR, PS_ELEMENT_SELECTOR, SELECTOR, SYNTAX_ERR, TARGET_FIRST, TARGET_LINEAL, TARGET_SELF, TYPE_SELECTOR, SHOW_ALL, SHOW_CONTAINER, ALPHA_NUM, CHILD_IDX, DIGIT, LANG_PART, PSEUDO_CLASS, ANB, COMBO, DESCEND, LOGIC_IS, N_TH, SUB_TYPE, SUB_TYPE_WO_PSEUDO, TAG_TYPE, TAG_TYPE_I, COMPOUND, COMPOUND_L, COMPOUND_I, COMPOUND_WO_PSEUDO, COMPLEX_L, HAS_COMPOUND, LOGIC_COMPOUND, LOGIC_COMPLEX, FORM_PARTS, INPUT_BUTTON, INPUT_CHECK, INPUT_DATE, INPUT_TEXT, INPUT_EDIT, INPUT_LTR, KEYS_LOGICAL;
var init_constant = __esmMin((() => {
	ATTR_SELECTOR = "AttributeSelector";
	CLASS_SELECTOR = "ClassSelector";
	COMBINATOR = "Combinator";
	ID_SELECTOR = "IdSelector";
	NOT_SUPPORTED_ERR = "NotSupportedError";
	PS_CLASS_SELECTOR = "PseudoClassSelector";
	PS_ELEMENT_SELECTOR = "PseudoElementSelector";
	SELECTOR = "Selector";
	SYNTAX_ERR = "SyntaxError";
	TARGET_FIRST = "first";
	TARGET_LINEAL = "lineal";
	TARGET_SELF = "self";
	TYPE_SELECTOR = "TypeSelector";
	SHOW_ALL = 4294967295;
	SHOW_CONTAINER = 1281;
	ALPHA_NUM = "[A-Z\\d]+";
	CHILD_IDX = "(?:first|last|only)-(?:child|of-type)";
	DIGIT = "(?:0|[1-9]\\d*)";
	LANG_PART = `(?:-${ALPHA_NUM})*`;
	PSEUDO_CLASS = `(?:any-)?link|${CHILD_IDX}|checked|empty|indeterminate|read-(?:only|write)|target`;
	ANB = `[+-]?(?:${DIGIT}n?|n)|(?:[+-]?${DIGIT})?n\\s*[+-]\\s*${DIGIT}`;
	COMBO = "\\s?[\\s>~+]\\s?";
	DESCEND = "\\s?[\\s>]\\s?";
	LOGIC_IS = `:is\\(\\s*[^)]+\\s*\\)`;
	N_TH = `nth-(?:last-)?(?:child|of-type)\\(\\s*(?:even|odd|${ANB})\\s*\\)`;
	SUB_TYPE = "\\[[^|\\]]+\\]|[#.:][\\w-]+";
	SUB_TYPE_WO_PSEUDO = "\\[[^|\\]]+\\]|[#.][\\w-]+";
	TAG_TYPE = "\\*|[A-Za-z][\\w-]*";
	TAG_TYPE_I = "\\*|[A-Z][\\w-]*";
	COMPOUND = `(?:${TAG_TYPE}|(?:${TAG_TYPE})?(?:${SUB_TYPE})+)`;
	COMPOUND_L = `(?:${TAG_TYPE}|(?:${TAG_TYPE})?(?:${SUB_TYPE}|${LOGIC_IS})+)`;
	COMPOUND_I = `(?:${TAG_TYPE_I}|(?:${TAG_TYPE_I})?(?:${SUB_TYPE})+)`;
	COMPOUND_WO_PSEUDO = `(?:${TAG_TYPE}|(?:${TAG_TYPE})?(?:${SUB_TYPE_WO_PSEUDO})+)`;
	`${COMPOUND}${COMBO}${COMPOUND}`;
	COMPLEX_L = `${COMPOUND_L}(?:${COMBO}${COMPOUND_L})*`;
	HAS_COMPOUND = `has\\([\\s>]?\\s*${COMPOUND_WO_PSEUDO}\\s*\\)`;
	LOGIC_COMPOUND = `(?:is|not)\\(\\s*${COMPOUND_L}(?:\\s*,\\s*${COMPOUND_L})*\\s*\\)`;
	LOGIC_COMPLEX = `(?:is|not)\\(\\s*${COMPLEX_L}(?:\\s*,\\s*${COMPLEX_L})*\\s*\\)`;
	FORM_PARTS = Object.freeze([
		"button",
		"input",
		"select",
		"textarea"
	]);
	INPUT_BUTTON = Object.freeze([
		"button",
		"reset",
		"submit"
	]);
	INPUT_CHECK = Object.freeze(["checkbox", "radio"]);
	INPUT_DATE = Object.freeze([
		"date",
		"datetime-local",
		"month",
		"time",
		"week"
	]);
	INPUT_TEXT = Object.freeze([
		"email",
		"password",
		"search",
		"tel",
		"text",
		"url"
	]);
	INPUT_EDIT = Object.freeze([
		...INPUT_DATE,
		...INPUT_TEXT,
		"number"
	]);
	INPUT_LTR = Object.freeze([
		...INPUT_CHECK,
		"color",
		"date",
		"image",
		"number",
		"range",
		"time"
	]);
	KEYS_LOGICAL = new Set([
		"has",
		"is",
		"not",
		"where"
	]);
}));
//#endregion
//#region node_modules/isomorphic-dompurify/node_modules/@asamuzakjp/dom-selector/src/js/utility.js
var import_nwsapi, import_is_potential_custom_element_name, KEYS_DIR_AUTO, KEYS_DIR_LTR, KEYS_INPUT_EDIT$1, KEYS_NODE_DIR_EXCLUDE, KEYS_NODE_FOCUSABLE, KEYS_NODE_FOCUSABLE_SVG, REG_ATTR_SIMPLE, REG_TAG_SIMPLE, REG_EXCLUDE_BASIC, REG_COMPLEX, REG_DESCEND, REG_LOGIC_COMPLEX, REG_LOGIC_COMPOUND, REG_LOGIC_HAS_COMPOUND, REG_END_WITH_HAS, REG_WO_LOGICAL, REG_IS_HTML, REG_IS_XML, getType, generateException, findNestedHas, findLogicalWithNestedHas, filterNodesByAnB, resolveContent, traverseNode, isCustomElement, getSlottedTextContent, getDirectionality, getLanguageAttribute, isContentEditable, isVisible, isFocusVisible, isFocusableArea, getNamespaceURI, isNamespaceDeclared, isPreceding, compareNodes, sortNodes, initNwsapi, filterSelector;
var init_utility = __esmMin((() => {
	import_nwsapi = /* @__PURE__ */ __toESM(require_nwsapi(), 1);
	init_bidi();
	init_lib();
	import_is_potential_custom_element_name = /* @__PURE__ */ __toESM(require_is_potential_custom_element_name(), 1);
	init_constant();
	KEYS_DIR_AUTO = new Set([
		...INPUT_BUTTON,
		...INPUT_TEXT,
		"hidden"
	]);
	KEYS_DIR_LTR = new Set(INPUT_LTR);
	KEYS_INPUT_EDIT$1 = new Set(INPUT_EDIT);
	KEYS_NODE_DIR_EXCLUDE = new Set([
		"bdi",
		"script",
		"style",
		"textarea"
	]);
	KEYS_NODE_FOCUSABLE = new Set([
		"button",
		"select",
		"textarea"
	]);
	KEYS_NODE_FOCUSABLE_SVG = new Set([
		"clipPath",
		"defs",
		"desc",
		"linearGradient",
		"marker",
		"mask",
		"metadata",
		"pattern",
		"radialGradient",
		"script",
		"style",
		"symbol",
		"title"
	]);
	REG_ATTR_SIMPLE = /^\[[A-Z\d-]{1,255}(?:="?[A-Z\d\s-]{1,255}"?)?\]$/i;
	REG_TAG_SIMPLE = new RegExp(`^(?:${TAG_TYPE})$`);
	REG_EXCLUDE_BASIC = /[|\\]|::|[^\u0021-\u007F\s]|\[\s*[\w$*=^|~-]+(?:(?:"[\w$*=^|~\s'-]+"|'[\w$*=^|~\s"-]+')?(?:\s+[\w$*=^|~-]+)+|"[^"\]]{1,255}|'[^'\]]{1,255})\s*\]|:(?:is|where)\(\s*\)/;
	REG_COMPLEX = new RegExp(`${COMPOUND_I}${COMBO}${COMPOUND_I}`, "i");
	REG_DESCEND = new RegExp(`${COMPOUND_I}${DESCEND}${COMPOUND_I}`, "i");
	REG_LOGIC_COMPLEX = new RegExp(`:(?!${PSEUDO_CLASS}|${N_TH}|${LOGIC_COMPLEX})`);
	REG_LOGIC_COMPOUND = new RegExp(`:(?!${PSEUDO_CLASS}|${N_TH}|${LOGIC_COMPOUND})`);
	REG_LOGIC_HAS_COMPOUND = new RegExp(`:(?!${PSEUDO_CLASS}|${N_TH}|${LOGIC_COMPOUND}|${HAS_COMPOUND})`);
	REG_END_WITH_HAS = new RegExp(`:${HAS_COMPOUND}$`);
	REG_WO_LOGICAL = new RegExp(`:(?!${PSEUDO_CLASS}|${N_TH})`);
	REG_IS_HTML = /^(?:application\/xhtml\+x|text\/ht)ml$/;
	REG_IS_XML = /^(?:application\/(?:[\w\-.]+\+)?|image\/[\w\-.]+\+|text\/)xml$/;
	getType = (o) => Object.prototype.toString.call(o).slice(8, -1);
	generateException = (msg, name, globalObject = globalThis) => {
		return new globalObject.DOMException(msg, name);
	};
	findNestedHas = (leaf) => {
		return leaf.name === "has";
	};
	findLogicalWithNestedHas = (leaf) => {
		if (KEYS_LOGICAL.has(leaf.name) && find(leaf, findNestedHas)) return leaf;
		return null;
	};
	filterNodesByAnB = (nodes, anb) => {
		const { a, b, reverse } = anb;
		const processedNodes = reverse ? [...nodes].reverse() : nodes;
		const l = nodes.length;
		const matched = [];
		if (a === 0) {
			if (b > 0 && b <= l) matched.push(processedNodes[b - 1]);
			return matched;
		}
		let startIndex = b - 1;
		if (a > 0) {
			while (startIndex < 0) startIndex += a;
			for (let i = startIndex; i < l; i += a) matched.push(processedNodes[i]);
		} else if (startIndex >= 0) {
			for (let i = startIndex; i >= 0; i += a) matched.push(processedNodes[i]);
			return matched.reverse();
		}
		return matched;
	};
	resolveContent = (node) => {
		if (!node?.nodeType) throw new TypeError(`Unexpected type ${getType(node)}`);
		let document;
		let root;
		let shadow;
		switch (node.nodeType) {
			case 9:
				document = node;
				root = node;
				break;
			case 11: {
				const { host, mode, ownerDocument } = node;
				document = ownerDocument;
				root = node;
				shadow = host && (mode === "close" || mode === "open");
				break;
			}
			case 1: {
				document = node.ownerDocument;
				let refNode = node;
				while (refNode) {
					const { host, mode, nodeType, parentNode } = refNode;
					if (nodeType === 11) {
						shadow = host && (mode === "close" || mode === "open");
						break;
					} else if (parentNode) refNode = parentNode;
					else break;
				}
				root = refNode;
				break;
			}
			default: throw new TypeError(`Unexpected node ${node.nodeName}`);
		}
		return [
			document,
			root,
			!!shadow
		];
	};
	traverseNode = (node, walker, force = false) => {
		if (!node?.nodeType) throw new TypeError(`Unexpected type ${getType(node)}`);
		if (!walker) return null;
		let refNode = walker.currentNode;
		if (refNode === node) return refNode;
		else if (force || refNode.contains(node)) {
			refNode = walker.nextNode();
			while (refNode) {
				if (refNode === node) break;
				refNode = walker.nextNode();
			}
			return refNode;
		} else {
			if (refNode !== walker.root) {
				let bool;
				while (refNode) {
					if (refNode === node) {
						bool = true;
						break;
					} else if (refNode === walker.root || refNode.contains(node)) break;
					refNode = walker.parentNode();
				}
				if (bool) return refNode;
			}
			if (node.nodeType === 1) {
				let bool;
				while (refNode) {
					if (refNode === node) {
						bool = true;
						break;
					}
					refNode = walker.nextNode();
				}
				if (bool) return refNode;
			}
		}
		return null;
	};
	isCustomElement = (node, opt = {}) => {
		if (!node?.nodeType) throw new TypeError(`Unexpected type ${getType(node)}`);
		if (node.nodeType !== 1) return false;
		const { localName, ownerDocument } = node;
		const { formAssociated } = opt;
		const window = ownerDocument.defaultView;
		let elmConstructor;
		const attr = node.getAttribute("is");
		if (attr) elmConstructor = (0, import_is_potential_custom_element_name.default)(attr) && window.customElements.get(attr);
		else elmConstructor = (0, import_is_potential_custom_element_name.default)(localName) && window.customElements.get(localName);
		if (elmConstructor) {
			if (formAssociated) return !!elmConstructor.formAssociated;
			return true;
		}
		return false;
	};
	getSlottedTextContent = (node) => {
		if (!node?.nodeType) throw new TypeError(`Unexpected type ${getType(node)}`);
		if (typeof node.assignedNodes !== "function") return null;
		const nodes = node.assignedNodes();
		if (nodes.length) {
			let text = "";
			const l = nodes.length;
			for (let i = 0; i < l; i++) {
				text = nodes[i].textContent.trim();
				if (text) break;
			}
			return text;
		}
		return node.textContent.trim();
	};
	getDirectionality = (node) => {
		if (!node?.nodeType) throw new TypeError(`Unexpected type ${getType(node)}`);
		if (node.nodeType !== 1) return null;
		const { dir: dirAttr, localName, parentNode } = node;
		const { getEmbeddingLevels } = bidiFactory();
		if (dirAttr === "ltr" || dirAttr === "rtl") return dirAttr;
		else if (dirAttr === "auto") {
			let text = "";
			switch (localName) {
				case "input":
					if (!node.type || KEYS_DIR_AUTO.has(node.type)) text = node.value;
					else if (KEYS_DIR_LTR.has(node.type)) return "ltr";
					break;
				case "slot":
					text = getSlottedTextContent(node);
					break;
				case "textarea":
					text = node.value;
					break;
				default: {
					const items = [].slice.call(node.childNodes);
					for (const item of items) {
						const { dir: itemDir, localName: itemLocalName, nodeType: itemNodeType, textContent: itemTextContent } = item;
						if (itemNodeType === 3) text = itemTextContent.trim();
						else if (itemNodeType === 1 && !KEYS_NODE_DIR_EXCLUDE.has(itemLocalName) && (!itemDir || itemDir !== "ltr" && itemDir !== "rtl")) if (itemLocalName === "slot") text = getSlottedTextContent(item);
						else text = itemTextContent.trim();
						if (text) break;
					}
				}
			}
			if (text) {
				const { paragraphs: [{ level }] } = getEmbeddingLevels(text);
				if (level % 2 === 1) return "rtl";
			} else if (parentNode) {
				const { nodeType: parentNodeType } = parentNode;
				if (parentNodeType === 1) return getDirectionality(parentNode);
			}
		} else if (localName === "input" && node.type === "tel") return "ltr";
		else if (localName === "bdi") {
			const text = node.textContent.trim();
			if (text) {
				const { paragraphs: [{ level }] } = getEmbeddingLevels(text);
				if (level % 2 === 1) return "rtl";
			}
		} else if (parentNode) {
			if (localName === "slot") {
				const text = getSlottedTextContent(node);
				if (text) {
					const { paragraphs: [{ level }] } = getEmbeddingLevels(text);
					if (level % 2 === 1) return "rtl";
					return "ltr";
				}
			}
			const { nodeType: parentNodeType } = parentNode;
			if (parentNodeType === 1) return getDirectionality(parentNode);
		}
		return "ltr";
	};
	getLanguageAttribute = (node) => {
		if (!node?.nodeType) throw new TypeError(`Unexpected type ${getType(node)}`);
		if (node.nodeType !== 1) return null;
		const { contentType } = node.ownerDocument;
		const isHtml = REG_IS_HTML.test(contentType);
		const isXml = REG_IS_XML.test(contentType);
		let isShadow = false;
		let current = node;
		while (current) {
			switch (current.nodeType) {
				case 1:
					if (isHtml && current.hasAttribute("lang")) return current.getAttribute("lang");
					else if (isXml && current.hasAttribute("xml:lang")) return current.getAttribute("xml:lang");
					break;
				case 11:
					if (current.host) isShadow = true;
					break;
				default: return null;
			}
			if (isShadow) {
				current = current.host;
				isShadow = false;
			} else if (current.parentNode) current = current.parentNode;
			else break;
		}
		return null;
	};
	isContentEditable = (node) => {
		if (!node?.nodeType) throw new TypeError(`Unexpected type ${getType(node)}`);
		if (node.nodeType !== 1) return false;
		if (typeof node.isContentEditable === "boolean") return node.isContentEditable;
		else if (node.ownerDocument.designMode === "on") return true;
		else {
			let attr;
			if (node.hasAttribute("contenteditable")) attr = node.getAttribute("contenteditable");
			else attr = "inherit";
			switch (attr) {
				case "":
				case "true": return true;
				case "plaintext-only": return true;
				case "false": return false;
				default:
					if (node?.parentNode?.nodeType === 1) return isContentEditable(node.parentNode);
					return false;
			}
		}
	};
	isVisible = (node) => {
		if (node?.nodeType !== 1) return false;
		const { display, visibility } = node.ownerDocument.defaultView.getComputedStyle(node);
		return display !== "none" && visibility === "visible";
	};
	isFocusVisible = (node) => {
		if (node?.nodeType !== 1) return false;
		const { localName, type } = node;
		switch (localName) {
			case "input":
				if (!type || KEYS_INPUT_EDIT$1.has(type)) return true;
				return false;
			case "textarea": return true;
			default: return isContentEditable(node);
		}
	};
	isFocusableArea = (node) => {
		if (node?.nodeType !== 1) return false;
		if (!node.isConnected) return false;
		const window = node.ownerDocument.defaultView;
		if (node instanceof window.HTMLElement) {
			if (Number.isInteger(parseInt(node.getAttribute("tabindex")))) return true;
			if (isContentEditable(node)) return true;
			const { localName, parentNode } = node;
			switch (localName) {
				case "a":
					if (node.href || node.hasAttribute("href")) return true;
					return false;
				case "iframe": return true;
				case "input":
					if (node.disabled || node.hasAttribute("disabled") || node.hidden || node.hasAttribute("hidden")) return false;
					return true;
				case "summary":
					if (parentNode.localName === "details") {
						let child = parentNode.firstElementChild;
						let bool = false;
						while (child) {
							if (child.localName === "summary") {
								bool = child === node;
								break;
							}
							child = child.nextElementSibling;
						}
						return bool;
					}
					return false;
				default: if (KEYS_NODE_FOCUSABLE.has(localName) && !(node.disabled || node.hasAttribute("disabled"))) return true;
			}
		} else if (node instanceof window.SVGElement) {
			if (Number.isInteger(parseInt(node.getAttributeNS(null, "tabindex")))) {
				const ns = "http://www.w3.org/2000/svg";
				let bool;
				let refNode = node;
				while (refNode.namespaceURI === ns) {
					bool = KEYS_NODE_FOCUSABLE_SVG.has(refNode.localName);
					if (bool) break;
					if (refNode?.parentNode?.namespaceURI === ns) refNode = refNode.parentNode;
					else break;
				}
				if (bool) return false;
				return true;
			}
			if (node.localName === "a" && (node.href || node.hasAttributeNS(null, "href"))) return true;
		}
		return false;
	};
	getNamespaceURI = (ns, node) => {
		if (typeof ns !== "string") throw new TypeError(`Unexpected type ${getType(ns)}`);
		else if (!node?.nodeType) throw new TypeError(`Unexpected type ${getType(node)}`);
		if (!ns || node.nodeType !== 1) return null;
		const { attributes } = node;
		let res;
		for (const attr of attributes) {
			const { name, namespaceURI, prefix, value } = attr;
			if (name === `xmlns:${ns}`) res = value;
			else if (prefix === ns) res = namespaceURI;
			if (res) break;
		}
		return res ?? null;
	};
	isNamespaceDeclared = (ns = "", node = {}) => {
		if (!ns || typeof ns !== "string" || node?.nodeType !== 1) return false;
		if (node.lookupNamespaceURI(ns)) return true;
		const root = node.ownerDocument.documentElement;
		let parent = node;
		let res;
		while (parent) {
			res = getNamespaceURI(ns, parent);
			if (res || parent === root) break;
			parent = parent.parentNode;
		}
		return !!res;
	};
	isPreceding = (nodeA, nodeB) => {
		if (!nodeA?.nodeType) throw new TypeError(`Unexpected type ${getType(nodeA)}`);
		else if (!nodeB?.nodeType) throw new TypeError(`Unexpected type ${getType(nodeB)}`);
		if (nodeA.nodeType !== 1 || nodeB.nodeType !== 1) return false;
		const posBit = nodeB.compareDocumentPosition(nodeA);
		return !!(posBit & 2 || posBit & 8);
	};
	compareNodes = (a, b) => {
		if (isPreceding(b, a)) return 1;
		return -1;
	};
	sortNodes = (nodes = []) => {
		const arr = [...nodes];
		if (arr.length > 1) arr.sort(compareNodes);
		return arr;
	};
	initNwsapi = (window, document) => {
		if (!window?.DOMException) throw new TypeError(`Unexpected global object ${getType(window)}`);
		if (document?.nodeType !== 9) document = window.document;
		const nw = (0, import_nwsapi.default)({
			document,
			DOMException: window.DOMException
		});
		nw.configure({ LOGERRORS: false });
		return nw;
	};
	filterSelector = (selector, target) => {
		const isQuerySelectorAll = target === "all";
		if (!selector || typeof selector !== "string" || /null|undefined/.test(selector)) return false;
		if (selector.includes("/") || REG_EXCLUDE_BASIC.test(selector)) return false;
		if (selector.includes("[")) {
			const index = selector.lastIndexOf("[");
			if (selector.indexOf("]", index) === -1) return false;
		}
		if (target === "first") return REG_ATTR_SIMPLE.test(selector);
		if (target === "all" && REG_TAG_SIMPLE.test(selector)) return false;
		if (selector.includes(":")) {
			if (isQuerySelectorAll && REG_DESCEND.test(selector)) return false;
			const isComplex = isQuerySelectorAll ? false : REG_COMPLEX.test(selector);
			if (selector.includes(":has(")) {
				if (isQuerySelectorAll) return false;
				if (!isComplex || REG_LOGIC_HAS_COMPOUND.test(selector)) return false;
				return REG_END_WITH_HAS.test(selector);
			}
			if (/(?:is|not)\(/.test(selector)) if (isComplex) return !REG_LOGIC_COMPLEX.test(selector);
			else return !REG_LOGIC_COMPOUND.test(selector);
			if (REG_WO_LOGICAL.test(selector)) return false;
		}
		return true;
	};
}));
//#endregion
//#region node_modules/isomorphic-dompurify/node_modules/@asamuzakjp/dom-selector/src/js/parser.js
var AST_SORT_ORDER, KEYS_PS_CLASS_STATE, KEYS_SHADOW_HOST, REG_EMPTY_PS_FUNC, REG_SHADOW_PS_ELEMENT, U_FFFD, unescapeSelector, preprocess, parseSelector, walkAST, compareASTNodes, sortAST, parseAstName;
var init_parser = __esmMin((() => {
	init_lib();
	init_utility();
	init_constant();
	AST_SORT_ORDER = new Map([
		[PS_ELEMENT_SELECTOR, 1],
		[ID_SELECTOR, 2],
		[CLASS_SELECTOR, 4],
		[TYPE_SELECTOR, 8],
		[ATTR_SELECTOR, 16],
		[PS_CLASS_SELECTOR, 32]
	]);
	KEYS_PS_CLASS_STATE = new Set([
		"checked",
		"closed",
		"disabled",
		"empty",
		"enabled",
		"in-range",
		"indeterminate",
		"invalid",
		"open",
		"out-of-range",
		"placeholder-shown",
		"read-only",
		"read-write",
		"valid"
	]);
	KEYS_SHADOW_HOST = new Set(["host", "host-context"]);
	REG_EMPTY_PS_FUNC = /(?<=:(?:dir|has|host(?:-context)?|is|lang|not|nth-(?:last-)?(?:child|of-type)|where))\(\s+\)/g;
	REG_SHADOW_PS_ELEMENT = /^part|slotted$/;
	U_FFFD = "�";
	unescapeSelector = (selector = "") => {
		if (typeof selector === "string" && selector.indexOf("\\", 0) >= 0) {
			const arr = selector.split("\\");
			const selectorItems = [arr[0]];
			const l = arr.length;
			for (let i = 1; i < l; i++) {
				const item = arr[i];
				if (item === "" && i === l - 1) selectorItems.push(U_FFFD);
				else if (item === "") {
					selectorItems.push("\\");
					i++;
					if (i < l) selectorItems.push(arr[i]);
				} else {
					const hexExists = /^([\da-f]{1,6}\s?)/i.exec(item);
					if (hexExists) {
						const [, hex] = hexExists;
						let str;
						try {
							const low = parseInt("D800", 16);
							const high = parseInt("DFFF", 16);
							const deci = parseInt(hex, 16);
							if (deci === 0 || deci >= low && deci <= high) str = U_FFFD;
							else str = String.fromCodePoint(deci);
						} catch (e) {
							str = U_FFFD;
						}
						let postStr = "";
						if (item.length > hex.length) postStr = item.substring(hex.length);
						selectorItems.push(`${str}${postStr}`);
					} else if (/^[\n\r\f]/.test(item)) selectorItems.push(`\\${item}`);
					else selectorItems.push(item);
				}
			}
			return selectorItems.join("");
		}
		return selector;
	};
	preprocess = (value) => {
		if (typeof value !== "string") if (value === void 0 || value === null) return getType(value).toLowerCase();
		else if (Array.isArray(value)) return value.join(",");
		else if (Object.hasOwn(value, "toString")) return value.toString();
		else throw new DOMException(`Invalid selector ${value}`, SYNTAX_ERR);
		let selector = value;
		let index = 0;
		while (index >= 0) {
			index = selector.indexOf("#", index);
			if (index < 0) break;
			const preHash = selector.substring(0, index + 1);
			let postHash = selector.substring(index + 1);
			const codePoint = postHash.codePointAt(0);
			if (codePoint > 65535) {
				const str = `\\${codePoint.toString(16)} `;
				if (postHash.length === 2) postHash = str;
				else postHash = `${str}${postHash.substring(2)}`;
			}
			selector = `${preHash}${postHash}`;
			index++;
		}
		selector = selector.replace(/\f|\r\n?/g, "\n").replace(/[\0\uD800-\uDFFF]|\\$/g, U_FFFD);
		if (selector === "&") return "";
		return selector.replace(/\x26/g, ":scope");
	};
	parseSelector = (sel) => {
		const selector = preprocess(sel);
		if (/^$|^\s*>|,\s*$/.test(selector)) throw new DOMException(`Invalid selector ${selector}`, SYNTAX_ERR);
		try {
			return parse(selector, { context: "selectorList" });
		} catch (e) {
			const { message } = e;
			if (/^(?:"\]"|Attribute selector [()\s,=~^$*|]+) is expected$/.test(message) && !selector.endsWith("]")) {
				const index = selector.lastIndexOf("[");
				const selPart = selector.substring(index);
				if (selPart.includes("\"")) {
					if (selPart.match(/"/g).length % 2) return parseSelector(`${selector}"]`);
					return parseSelector(`${selector}]`);
				}
				return parseSelector(`${selector}]`);
			} else if (message === "\")\" is expected") if (REG_EMPTY_PS_FUNC.test(selector)) return parseSelector(`${selector.replaceAll(REG_EMPTY_PS_FUNC, "()")}`);
			else if (!selector.endsWith(")")) return parseSelector(`${selector})`);
			else throw new DOMException(`Invalid selector ${selector}`, SYNTAX_ERR);
			else throw new DOMException(`Invalid selector ${selector}`, SYNTAX_ERR);
		}
	};
	walkAST = (ast = {}, toObject = false) => {
		const branches = /* @__PURE__ */ new Set();
		const info = {
			hasForgivenPseudoFunc: false,
			hasHasPseudoFunc: false,
			hasLogicalPseudoFunc: false,
			hasNotPseudoFunc: false,
			hasNthChildOfSelector: false,
			hasNestedSelector: false,
			hasStatePseudoClass: false
		};
		const opt = { enter(node) {
			switch (node.type) {
				case CLASS_SELECTOR:
					if (/^-?\d/.test(node.name)) throw new DOMException(`Invalid selector .${node.name}`, SYNTAX_ERR);
					break;
				case ID_SELECTOR:
					if (/^-?\d/.test(node.name)) throw new DOMException(`Invalid selector #${node.name}`, SYNTAX_ERR);
					break;
				case PS_CLASS_SELECTOR:
					if (KEYS_LOGICAL.has(node.name)) {
						info.hasNestedSelector = true;
						info.hasLogicalPseudoFunc = true;
						if (node.name === "has") info.hasHasPseudoFunc = true;
						else if (node.name === "not") info.hasNotPseudoFunc = true;
						else info.hasForgivenPseudoFunc = true;
					} else if (KEYS_PS_CLASS_STATE.has(node.name)) info.hasStatePseudoClass = true;
					else if (KEYS_SHADOW_HOST.has(node.name) && Array.isArray(node.children) && node.children.length) info.hasNestedSelector = true;
					break;
				case PS_ELEMENT_SELECTOR:
					if (REG_SHADOW_PS_ELEMENT.test(node.name)) info.hasNestedSelector = true;
					break;
				case "Nth":
					if (node.selector) {
						info.hasNestedSelector = true;
						info.hasNthChildOfSelector = true;
					}
					break;
				case SELECTOR:
					branches.add(node.children);
					break;
				default:
			}
		} };
		const clonedAst = clone(ast);
		walk(toObject ? toPlainObject(clonedAst) : clonedAst, opt);
		if (info.hasNestedSelector === true) findAll(clonedAst, (node, item, list) => {
			if (list) {
				if (node.type === "PseudoClassSelector" && KEYS_LOGICAL.has(node.name)) {
					const itemList = list.filter((i) => {
						const { name, type } = i;
						return type === "PseudoClassSelector" && KEYS_LOGICAL.has(name);
					});
					for (const { children } of itemList) for (const { children: grandChildren } of children) for (const { children: greatGrandChildren } of grandChildren) if (branches.has(greatGrandChildren)) branches.delete(greatGrandChildren);
				} else if (node.type === "PseudoClassSelector" && KEYS_SHADOW_HOST.has(node.name) && Array.isArray(node.children) && node.children.length) {
					const itemList = list.filter((i) => {
						const { children, name, type } = i;
						return type === "PseudoClassSelector" && KEYS_SHADOW_HOST.has(name) && Array.isArray(children) && children.length;
					});
					for (const { children } of itemList) for (const { children: grandChildren } of children) if (branches.has(grandChildren)) branches.delete(grandChildren);
				} else if (node.type === "PseudoElementSelector" && REG_SHADOW_PS_ELEMENT.test(node.name)) {
					const itemList = list.filter((i) => {
						const { name, type } = i;
						return type === "PseudoElementSelector" && REG_SHADOW_PS_ELEMENT.test(name);
					});
					for (const { children } of itemList) for (const { children: grandChildren } of children) if (branches.has(grandChildren)) branches.delete(grandChildren);
				} else if (node.type === "Nth" && node.selector) {
					const itemList = list.filter((i) => {
						const { selector, type } = i;
						return type === "Nth" && selector;
					});
					for (const { selector } of itemList) {
						const { children } = selector;
						for (const { children: grandChildren } of children) if (branches.has(grandChildren)) branches.delete(grandChildren);
					}
				}
			}
		});
		return {
			info,
			branches: [...branches]
		};
	};
	compareASTNodes = (a, b) => {
		const bitA = AST_SORT_ORDER.get(a.type);
		const bitB = AST_SORT_ORDER.get(b.type);
		if (bitA === bitB) return 0;
		else if (bitA > bitB) return 1;
		else return -1;
	};
	sortAST = (asts) => {
		const arr = [...asts];
		if (arr.length > 1) arr.sort(compareASTNodes);
		return arr;
	};
	parseAstName = (selector) => {
		let prefix;
		let localName;
		if (selector && typeof selector === "string") if (selector.indexOf("|") > -1) [prefix, localName] = selector.split("|");
		else {
			prefix = "*";
			localName = selector;
		}
		else throw new DOMException(`Invalid selector ${selector}`, SYNTAX_ERR);
		return {
			prefix,
			localName
		};
	};
}));
//#endregion
//#region node_modules/isomorphic-dompurify/node_modules/@asamuzakjp/dom-selector/src/js/matcher.js
var KEYS_FORM_PS_DISABLED, KEYS_INPUT_EDIT, REG_LANG_VALID, matchPseudoElementSelector, matchDirectionPseudoClass, matchLanguagePseudoClass, matchDisabledPseudoClass, matchReadOnlyPseudoClass, matchAttributeSelector, matchTypeSelector;
var init_matcher = __esmMin((() => {
	init_parser();
	init_utility();
	init_constant();
	KEYS_FORM_PS_DISABLED = new Set([
		...FORM_PARTS,
		"fieldset",
		"optgroup",
		"option"
	]);
	KEYS_INPUT_EDIT = new Set(INPUT_EDIT);
	REG_LANG_VALID = new RegExp(`^(?:\\*-)?${ALPHA_NUM}${LANG_PART}$`, "i");
	matchPseudoElementSelector = (astName, astType, opt = {}) => {
		const { forgive, globalObject, warn } = opt;
		if (astType !== "PseudoElementSelector") throw new TypeError(`Unexpected ast type ${getType(astType)}`);
		switch (astName) {
			case "after":
			case "backdrop":
			case "before":
			case "cue":
			case "cue-region":
			case "first-letter":
			case "first-line":
			case "file-selector-button":
			case "marker":
			case "placeholder":
			case "selection":
			case "target-text":
				if (warn) throw generateException(`Unsupported pseudo-element ::${astName}`, NOT_SUPPORTED_ERR, globalObject);
				break;
			case "part":
			case "slotted":
				if (warn) throw generateException(`Unsupported pseudo-element ::${astName}()`, NOT_SUPPORTED_ERR, globalObject);
				break;
			default: if (astName.startsWith("-webkit-")) {
				if (warn) throw generateException(`Unsupported pseudo-element ::${astName}`, NOT_SUPPORTED_ERR, globalObject);
			} else if (!forgive) throw generateException(`Unknown pseudo-element ::${astName}`, SYNTAX_ERR, globalObject);
		}
	};
	matchDirectionPseudoClass = (ast, node) => {
		const { name } = ast;
		if (!name) {
			const type = name === "" ? "(empty String)" : getType(name);
			throw new TypeError(`Unexpected ast type ${type}`);
		}
		return name === getDirectionality(node);
	};
	matchLanguagePseudoClass = (ast, node) => {
		const elementLang = getLanguageAttribute(node);
		if (elementLang === null) return false;
		if (ast._langRegex !== void 0) {
			if (ast._langPattern === "*") return elementLang !== "";
			if (ast._langRegex === null) return false;
			return ast._langRegex.test(elementLang);
		}
		const { name, type, value } = ast;
		let langPattern;
		if (type === "String" && value) langPattern = value;
		else if (type === "Identifier" && name) langPattern = unescapeSelector(name);
		ast._langPattern = langPattern;
		if (typeof langPattern !== "string") {
			ast._langRegex = null;
			return false;
		}
		if (langPattern === "*") {
			ast._langRegex = null;
			return elementLang !== "";
		}
		if (!REG_LANG_VALID.test(langPattern)) {
			ast._langRegex = null;
			return false;
		}
		let matcherRegex;
		if (langPattern.indexOf("-") > -1) {
			const [langMain, langSub, ...langRest] = langPattern.split("-");
			const extendedMain = langMain === "*" ? `${ALPHA_NUM}${LANG_PART}` : `${langMain}${LANG_PART}`;
			const extendedSub = `-${langSub}${LANG_PART}`;
			let extendedRest = "";
			for (let i = 0; i < langRest.length; i++) extendedRest += `-${langRest[i]}${LANG_PART}`;
			matcherRegex = new RegExp(`^${extendedMain}${extendedSub}${extendedRest}$`, "i");
		} else matcherRegex = new RegExp(`^${langPattern}${LANG_PART}$`, "i");
		ast._langRegex = matcherRegex;
		return matcherRegex.test(elementLang);
	};
	matchDisabledPseudoClass = (astName, node) => {
		const { localName, parentNode } = node;
		if (!KEYS_FORM_PS_DISABLED.has(localName) && !isCustomElement(node, { formAssociated: true })) return false;
		let isDisabled = false;
		if (node.disabled || node.hasAttribute("disabled")) isDisabled = true;
		else if (localName === "option") {
			if (parentNode && parentNode.localName === "optgroup" && (parentNode.disabled || parentNode.hasAttribute("disabled"))) isDisabled = true;
		} else if (localName !== "optgroup") {
			let current = parentNode;
			while (current) {
				if (current.localName === "fieldset" && (current.disabled || current.hasAttribute("disabled"))) {
					let legend;
					let element = current.firstElementChild;
					while (element) {
						if (element.localName === "legend") {
							legend = element;
							break;
						}
						element = element.nextElementSibling;
					}
					if (!legend || !legend.contains(node)) isDisabled = true;
					break;
				}
				current = current.parentNode;
			}
		}
		if (astName === "disabled") return isDisabled;
		return !isDisabled;
	};
	matchReadOnlyPseudoClass = (astName, node) => {
		const { localName } = node;
		let isReadOnly = false;
		switch (localName) {
			case "textarea":
			case "input": {
				const isEditableInput = !node.type || KEYS_INPUT_EDIT.has(node.type);
				if (localName === "textarea" || isEditableInput) isReadOnly = node.readOnly || node.hasAttribute("readonly") || node.disabled || node.hasAttribute("disabled");
				else isReadOnly = true;
				break;
			}
			default: isReadOnly = !isContentEditable(node);
		}
		if (astName === "read-only") return isReadOnly;
		return !isReadOnly;
	};
	matchAttributeSelector = (ast, node, opt = {}) => {
		const { flags: astFlags, matcher: astMatcher, name: astName, value: astValue } = ast;
		const { check, forgive, globalObject } = opt;
		if (typeof astFlags === "string" && !/^[is]$/i.test(astFlags) && !forgive) throw generateException(`Invalid selector ${generate(ast)}`, SYNTAX_ERR, globalObject);
		const { attributes } = node;
		if (!attributes || !attributes.length) return false;
		let caseInsensitive;
		if (node.ownerDocument.contentType === "text/html") if (typeof astFlags === "string" && /^s$/i.test(astFlags)) caseInsensitive = false;
		else caseInsensitive = true;
		else if (typeof astFlags === "string" && /^i$/i.test(astFlags)) caseInsensitive = true;
		else caseInsensitive = false;
		let astAttrName = unescapeSelector(astName.name);
		if (caseInsensitive) astAttrName = astAttrName.toLowerCase();
		const attrValues = /* @__PURE__ */ new Set();
		if (astAttrName.indexOf("|") > -1) {
			const { prefix: astPrefix, localName: astLocalName } = parseAstName(astAttrName);
			for (const item of attributes) {
				let { name: itemName, value: itemValue } = item;
				if (caseInsensitive) {
					itemName = itemName.toLowerCase();
					itemValue = itemValue.toLowerCase();
				}
				const colonIdx = itemName.indexOf(":");
				switch (astPrefix) {
					case "":
						if (astLocalName === itemName) attrValues.add(itemValue);
						break;
					case "*":
						if (colonIdx > -1) {
							if (itemName.substring(colonIdx + 1).replace(/^:/, "") === astLocalName) attrValues.add(itemValue);
						} else if (astLocalName === itemName) attrValues.add(itemValue);
						break;
					default:
						if (!check) {
							if (forgive) return false;
							throw generateException(`Invalid selector ${generate(ast)}`, SYNTAX_ERR, globalObject);
						}
						if (colonIdx > -1) {
							const itemPrefix = itemName.substring(0, colonIdx);
							const itemLocalName = itemName.substring(colonIdx + 1).replace(/^:/, "");
							if (itemPrefix === "xml" && itemLocalName === "lang") continue;
							else if (astPrefix === itemPrefix && astLocalName === itemLocalName) {
								if (isNamespaceDeclared(astPrefix, node)) attrValues.add(itemValue);
							}
						}
				}
			}
		} else for (let { name: itemName, value: itemValue } of attributes) {
			if (caseInsensitive) {
				itemName = itemName.toLowerCase();
				itemValue = itemValue.toLowerCase();
			}
			const colonIdx = itemName.indexOf(":");
			if (colonIdx > -1) {
				const itemPrefix = itemName.substring(0, colonIdx);
				const itemLocalName = itemName.substring(colonIdx + 1).replace(/^:/, "");
				if (!itemPrefix && astAttrName === `:${itemLocalName}`) attrValues.add(itemValue);
				else if (itemPrefix === "xml" && itemLocalName === "lang") continue;
				else if (astAttrName === itemLocalName) attrValues.add(itemValue);
			} else if (astAttrName === itemName) attrValues.add(itemValue);
		}
		if (!attrValues.size) return false;
		const { name: astIdentValue, value: astStringValue } = astValue ?? {};
		let attrValue;
		if (astIdentValue) if (caseInsensitive) attrValue = unescapeSelector(astIdentValue).toLowerCase();
		else attrValue = unescapeSelector(astIdentValue);
		else if (astStringValue) if (caseInsensitive) attrValue = astStringValue.toLowerCase();
		else attrValue = astStringValue;
		else if (astStringValue === "") attrValue = astStringValue;
		switch (astMatcher) {
			case "=": return typeof attrValue === "string" && attrValues.has(attrValue);
			case "~=":
				if (attrValue && typeof attrValue === "string") {
					if (/\s/.test(attrValue)) return false;
					if (ast._tildeTarget === void 0) ast._tildeTarget = ` ${attrValue} `;
					const target = ast._tildeTarget;
					for (const value of attrValues) if (` ${value.replace(/[\t\r\n\f]/g, " ")} `.includes(target)) return true;
				}
				return false;
			case "|=":
				if (attrValue && typeof attrValue === "string") {
					for (const value of attrValues) if (value === attrValue || value.startsWith(`${attrValue}-`)) return true;
				}
				return false;
			case "^=":
				if (attrValue && typeof attrValue === "string") {
					for (const value of attrValues) if (value.startsWith(`${attrValue}`)) return true;
				}
				return false;
			case "$=":
				if (attrValue && typeof attrValue === "string") {
					for (const value of attrValues) if (value.endsWith(`${attrValue}`)) return true;
				}
				return false;
			case "*=":
				if (attrValue && typeof attrValue === "string") {
					for (const value of attrValues) if (value.includes(`${attrValue}`)) return true;
				}
				return false;
			default: return true;
		}
	};
	matchTypeSelector = (ast, node, opt = {}) => {
		const astName = unescapeSelector(ast.name);
		const { localName, namespaceURI, prefix } = node;
		const { check, forgive, globalObject } = opt;
		let { prefix: astPrefix, localName: astLocalName } = parseAstName(astName, node);
		const isHTML = node.ownerDocument.contentType === "text/html" && (!namespaceURI || namespaceURI === "http://www.w3.org/1999/xhtml");
		if (isHTML && localName === astLocalName && !astName.includes("|")) return true;
		const firstChar = localName.charCodeAt(0);
		if (isHTML && (firstChar >= 65 && firstChar <= 90 || firstChar >= 97 && firstChar <= 122)) {
			astPrefix = astPrefix.toLowerCase();
			astLocalName = astLocalName.toLowerCase();
		}
		let nodePrefix;
		let nodeLocalName;
		const colonIdx = localName.indexOf(":");
		if (colonIdx > -1) {
			nodePrefix = localName.substring(0, colonIdx);
			nodeLocalName = localName.substring(colonIdx + 1);
		} else {
			nodePrefix = prefix || "";
			nodeLocalName = localName;
		}
		const isUniversal = astLocalName === "*";
		switch (astPrefix) {
			case "": return !nodePrefix && !namespaceURI && (isUniversal || astLocalName === nodeLocalName);
			case "*": return isUniversal || astLocalName === nodeLocalName;
			default: {
				if (!check) {
					if (forgive) return false;
					throw generateException(`Invalid selector ${generate(ast)}`, SYNTAX_ERR, globalObject);
				}
				const astNS = node.lookupNamespaceURI(astPrefix);
				if (astNS === node.lookupNamespaceURI(nodePrefix) && astPrefix === nodePrefix) return isUniversal || astLocalName === nodeLocalName;
				else if (!forgive && !astNS) throw generateException(`Undeclared namespace ${astPrefix}`, SYNTAX_ERR, globalObject);
				return false;
			}
		}
	};
}));
//#endregion
//#region node_modules/isomorphic-dompurify/node_modules/@asamuzakjp/dom-selector/src/js/finder.js
var DIR_NEXT, DIR_PREV, KEYS_FORM, KEYS_FORM_PS_VALID, KEYS_INPUT_CHECK, KEYS_INPUT_PLACEHOLDER, KEYS_INPUT_RANGE, KEYS_INPUT_REQUIRED, KEYS_INPUT_RESET, KEYS_INPUT_SUBMIT, KEYS_MODIFIER, KEYS_PS_UNCACHE, KEYS_PS_NTH_OF_TYPE, Finder;
var init_finder = __esmMin((() => {
	init_matcher();
	init_parser();
	init_utility();
	init_constant();
	DIR_NEXT = "next";
	DIR_PREV = "prev";
	KEYS_FORM = new Set([
		...FORM_PARTS,
		"fieldset",
		"form"
	]);
	KEYS_FORM_PS_VALID = new Set([...FORM_PARTS, "form"]);
	KEYS_INPUT_CHECK = new Set(INPUT_CHECK);
	KEYS_INPUT_PLACEHOLDER = new Set([...INPUT_TEXT, "number"]);
	KEYS_INPUT_RANGE = new Set([
		...INPUT_DATE,
		"number",
		"range"
	]);
	KEYS_INPUT_REQUIRED = new Set([
		...INPUT_CHECK,
		...INPUT_EDIT,
		"file"
	]);
	KEYS_INPUT_RESET = new Set(["button", "reset"]);
	KEYS_INPUT_SUBMIT = new Set(["image", "submit"]);
	KEYS_MODIFIER = new Set([
		"Alt",
		"AltGraph",
		"CapsLock",
		"Control",
		"Fn",
		"FnLock",
		"Hyper",
		"Meta",
		"NumLock",
		"ScrollLock",
		"Shift",
		"Super",
		"Symbol",
		"SymbolLock"
	]);
	KEYS_PS_UNCACHE = new Set([
		"any-link",
		"defined",
		"dir",
		"link",
		"scope"
	]);
	KEYS_PS_NTH_OF_TYPE = new Set([
		"first-of-type",
		"last-of-type",
		"only-of-type"
	]);
	Finder = class {
		#ast;
		#astCache;
		#check;
		#descendant;
		#document;
		#documentCache;
		#documentURL;
		#event;
		#eventHandlers;
		#filterLeavesCache;
		#focus;
		#invalidate;
		#invalidateResults;
		#lastFocusVisible;
		#node;
		#nodeWalker;
		#nodes;
		#noexcept;
		#pseudoElement;
		#results;
		#root;
		#rootWalker;
		#scoped;
		#selector;
		#selectorAST;
		#shadow;
		#verifyShadowHost;
		#walkers;
		#warn;
		#window;
		/**
		* constructor
		* @param {object} window - The window object.
		*/
		constructor(window) {
			this.#window = window;
			this.#astCache = /* @__PURE__ */ new WeakMap();
			this.#documentCache = /* @__PURE__ */ new WeakMap();
			this.#event = null;
			this.#focus = null;
			this.#lastFocusVisible = null;
			this.#eventHandlers = new Set([
				{
					keys: ["focus", "focusin"],
					handler: this._handleFocusEvent
				},
				{
					keys: ["keydown", "keyup"],
					handler: this._handleKeyboardEvent
				},
				{
					keys: [
						"mouseover",
						"mousedown",
						"mouseup",
						"click",
						"mouseout"
					],
					handler: this._handleMouseEvent
				}
			]);
			this.#filterLeavesCache = /* @__PURE__ */ new WeakMap();
			this._registerEventListeners();
			this.clearResults(true);
		}
		/**
		* Handles errors.
		* @param {Error} e - The error object.
		* @param {object} [opt] - Options.
		* @param {boolean} [opt.noexcept] - If true, exceptions are not thrown.
		* @throws {Error} Throws an error.
		* @returns {void}
		*/
		onError = (e, opt = {}) => {
			if (opt.noexcept ?? this.#noexcept) return;
			if (e instanceof DOMException || e instanceof this.#window.DOMException) {
				if (e.name === "NotSupportedError") {
					if (this.#warn) console.warn(e.message);
					return;
				}
				throw new this.#window.DOMException(e.message, e.name);
			}
			if (e.name in this.#window) throw new this.#window[e.name](e.message, { cause: e });
			throw e;
		};
		/**
		* Sets up the finder.
		* @param {string} selector - The CSS selector.
		* @param {object} node - Document, DocumentFragment, or Element.
		* @param {object} [opt] - Options.
		* @param {boolean} [opt.check] - Indicates if running in internal check().
		* @param {boolean} [opt.noexcept] - If true, exceptions are not thrown.
		* @param {boolean} [opt.warn] - If true, console warnings are enabled.
		* @returns {object} The finder instance.
		*/
		setup = (selector, node, opt = {}) => {
			const { check, noexcept, warn } = opt;
			this.#check = !!check;
			this.#noexcept = !!noexcept;
			this.#warn = !!warn;
			[this.#document, this.#root, this.#shadow] = resolveContent(node);
			this.#documentURL = null;
			this.#node = node;
			this.#scoped = this.#node !== this.#root && this.#node.nodeType === 1;
			this.#selector = selector;
			this.#pseudoElement = [];
			this.#walkers = /* @__PURE__ */ new WeakMap();
			this.#nodeWalker = null;
			this.#rootWalker = null;
			this.#verifyShadowHost = null;
			this.clearResults();
			return this;
		};
		/**
		* Clear cached results.
		* @param {boolean} all - clear all results
		* @returns {void}
		*/
		clearResults = (all = false) => {
			this.#invalidateResults = /* @__PURE__ */ new WeakMap();
			if (all) {
				this.#results = /* @__PURE__ */ new WeakMap();
				this.#filterLeavesCache = /* @__PURE__ */ new WeakMap();
			}
		};
		/**
		* Handles focus events.
		* @private
		* @param {Event} evt - The event object.
		* @returns {void}
		*/
		_handleFocusEvent = (evt) => {
			this.#focus = evt;
		};
		/**
		* Handles keyboard events.
		* @private
		* @param {Event} evt - The event object.
		* @returns {void}
		*/
		_handleKeyboardEvent = (evt) => {
			const { key } = evt;
			if (!KEYS_MODIFIER.has(key)) this.#event = evt;
		};
		/**
		* Handles mouse events.
		* @private
		* @param {Event} evt - The event object.
		* @returns {void}
		*/
		_handleMouseEvent = (evt) => {
			this.#event = evt;
		};
		/**
		* Registers event listeners.
		* @private
		* @returns {Array.<void>} An array of return values from addEventListener.
		*/
		_registerEventListeners = () => {
			const func = [];
			for (const eventHandler of this.#eventHandlers) {
				const { keys, handler } = eventHandler;
				const l = keys.length;
				for (let i = 0; i < l; i++) {
					const key = keys[i];
					func.push(this.#window.addEventListener(key, handler, {
						capture: true,
						passive: true
					}));
				}
			}
			return func;
		};
		/**
		* Processes selector branches into the internal AST structure.
		* @private
		* @param {Array.<Array.<object>>} branches - The branches from walkAST.
		* @param {string} selector - The original selector for error reporting.
		* @returns {{ast: Array, descendant: boolean}}
		* An object with the AST, descendant flag.
		*/
		_processSelectorBranches = (branches, selector) => {
			let descendant = false;
			const ast = [];
			const l = branches.length;
			for (let i = 0; i < l; i++) {
				const items = [...branches[i]];
				const branch = [];
				let item = items.shift();
				if (item && item.type !== "Combinator") {
					const leaves = /* @__PURE__ */ new Set();
					while (item) {
						if (item.type === "Combinator") {
							const [nextItem] = items;
							if (!nextItem || nextItem.type === "Combinator") {
								const msg = `Invalid selector ${selector}`;
								this.onError(generateException(msg, SYNTAX_ERR, this.#window));
								return {
									ast: [],
									descendant: false,
									invalidate: false
								};
							}
							if (item.name === " " || item.name === ">") descendant = true;
							branch.push({
								combo: item,
								leaves: sortAST(leaves)
							});
							leaves.clear();
						} else {
							if (item.name && typeof item.name === "string") {
								const unescapedName = unescapeSelector(item.name);
								if (unescapedName !== item.name) item.name = unescapedName;
								if (/[|:]/.test(unescapedName)) item.namespace = true;
							}
							leaves.add(item);
						}
						if (items.length) item = items.shift();
						else {
							branch.push({
								combo: null,
								leaves: sortAST(leaves)
							});
							leaves.clear();
							break;
						}
					}
				}
				ast.push({
					branch,
					dir: null,
					filtered: false,
					find: false
				});
			}
			return {
				ast,
				descendant
			};
		};
		/**
		* Corresponds AST and nodes.
		* @private
		* @param {string} selector - The CSS selector.
		* @returns {Array.<Array.<object>>} An array with the AST and nodes.
		*/
		_correspond = (selector) => {
			const nodes = [];
			this.#descendant = false;
			this.#invalidate = false;
			let ast;
			if (this.#documentCache.has(this.#document)) {
				const cachedItem = this.#documentCache.get(this.#document);
				if (cachedItem && cachedItem.has(`${selector}`)) {
					const item = cachedItem.get(`${selector}`);
					ast = item.ast;
					this.#descendant = item.descendant;
					this.#invalidate = item.invalidate;
					this.#selectorAST = item.selectorAST;
				}
			}
			if (ast) {
				const l = ast.length;
				for (let i = 0; i < l; i++) {
					ast[i].dir = null;
					ast[i].filtered = false;
					ast[i].find = false;
					nodes[i] = [];
				}
			} else {
				this.#selectorAST = parseSelector(selector);
				const { branches, info } = walkAST(this.#selectorAST, true);
				const { hasHasPseudoFunc, hasLogicalPseudoFunc, hasNthChildOfSelector, hasStatePseudoClass } = info;
				this.#invalidate = hasHasPseudoFunc || hasStatePseudoClass || !!(hasLogicalPseudoFunc && hasNthChildOfSelector);
				const processed = this._processSelectorBranches(branches, selector);
				ast = processed.ast;
				this.#descendant = processed.descendant;
				let cachedItem;
				if (this.#documentCache.has(this.#document)) cachedItem = this.#documentCache.get(this.#document);
				else cachedItem = /* @__PURE__ */ new Map();
				cachedItem.set(`${selector}`, {
					ast,
					descendant: this.#descendant,
					invalidate: this.#invalidate,
					selectorAST: this.#selectorAST
				});
				this.#documentCache.set(this.#document, cachedItem);
				for (let i = 0; i < ast.length; i++) nodes[i] = [];
			}
			return [ast, nodes];
		};
		/**
		* Creates a TreeWalker.
		* @private
		* @param {object} node - The Document, DocumentFragment, or Element node.
		* @param {object} [opt] - Options.
		* @param {boolean} [opt.force] - Force creation of a new TreeWalker.
		* @param {number} [opt.whatToShow] - The NodeFilter whatToShow value.
		* @returns {object} The TreeWalker object.
		*/
		_createTreeWalker = (node, opt = {}) => {
			const { force = false, whatToShow = SHOW_CONTAINER } = opt;
			if (force) return this.#document.createTreeWalker(node, whatToShow);
			else if (this.#walkers.has(node)) return this.#walkers.get(node);
			const walker = this.#document.createTreeWalker(node, whatToShow);
			this.#walkers.set(node, walker);
			return walker;
		};
		/**
		* Gets selector branches from cache or parses them.
		* @private
		* @param {object} selector - The AST.
		* @returns {Array.<Array.<object>>} The selector branches.
		*/
		_getSelectorBranches = (selector) => {
			if (this.#astCache.has(selector)) return this.#astCache.get(selector);
			const { branches } = walkAST(selector);
			this.#astCache.set(selector, branches);
			return branches;
		};
		/**
		* Gets the children of a node, optionally filtered by a selector.
		* @private
		* @param {object} parentNode - The parent element.
		* @param {Array.<Array.<object>>} selectorBranches - The selector branches.
		* @param {object} opt - Options.
		* @returns {Array.<object>} An array of child nodes.
		*/
		_getFilteredChildren = (parentNode, selectorBranches, opt) => {
			const children = [];
			let childNode = parentNode.firstElementChild;
			while (childNode) {
				if (selectorBranches) {
					let isMatch = false;
					const l = selectorBranches.length;
					for (let i = 0; i < l; i++) {
						const leaves = selectorBranches[i];
						if (this._matchLeaves(leaves, childNode, opt)) {
							isMatch = true;
							break;
						}
					}
					if (isMatch) {
						if (this.#node === childNode) children.push(childNode);
						else if (isVisible(childNode)) children.push(childNode);
					}
				} else children.push(childNode);
				childNode = childNode.nextElementSibling;
			}
			return children;
		};
		/**
		* Collects nth-child nodes.
		* @private
		* @param {object} anb - An+B options.
		* @param {number} anb.a - The 'a' value.
		* @param {number} anb.b - The 'b' value.
		* @param {boolean} [anb.reverse] - If true, reverses the order.
		* @param {object} [anb.selector] - The AST.
		* @param {object} node - The Element node.
		* @param {object} opt - Options.
		* @returns {Set.<object>} A collection of matched nodes.
		*/
		_collectNthChild = (anb, node, opt) => {
			const { a, b, selector } = anb;
			const { parentNode } = node;
			if (!parentNode) {
				const matchedNode = /* @__PURE__ */ new Set();
				if (node === this.#root && a * 1 + b * 1 === 1) if (selector) {
					const selectorBranches = this._getSelectorBranches(selector);
					const l = selectorBranches.length;
					for (let i = 0; i < l; i++) {
						const leaves = selectorBranches[i];
						if (this._matchLeaves(leaves, node, opt)) {
							matchedNode.add(node);
							break;
						}
					}
				} else matchedNode.add(node);
				return matchedNode;
			}
			const selectorBranches = selector ? this._getSelectorBranches(selector) : null;
			const matchedNodes = filterNodesByAnB(this._getFilteredChildren(parentNode, selectorBranches, opt), anb);
			return new Set(matchedNodes);
		};
		/**
		* Collects nth-of-type nodes.
		* @private
		* @param {object} anb - An+B options.
		* @param {number} anb.a - The 'a' value.
		* @param {number} anb.b - The 'b' value.
		* @param {boolean} [anb.reverse] - If true, reverses the order.
		* @param {object} node - The Element node.
		* @returns {Set.<object>} A collection of matched nodes.
		*/
		_collectNthOfType = (anb, node) => {
			const { parentNode } = node;
			if (!parentNode) {
				if (node === this.#root && anb.a * 1 + anb.b * 1 === 1) return new Set([node]);
				return /* @__PURE__ */ new Set();
			}
			const typedSiblings = [];
			let sibling = parentNode.firstElementChild;
			while (sibling) {
				if (sibling.localName === node.localName && sibling.namespaceURI === node.namespaceURI && sibling.prefix === node.prefix) typedSiblings.push(sibling);
				sibling = sibling.nextElementSibling;
			}
			const matchedNodes = filterNodesByAnB(typedSiblings, anb);
			return new Set(matchedNodes);
		};
		/**
		* Matches An+B.
		* @private
		* @param {object} ast - The AST.
		* @param {object} node - The Element node.
		* @param {string} nthName - The name of the nth pseudo-class.
		* @param {object} opt - Options.
		* @returns {Set.<object>} A collection of matched nodes.
		*/
		_matchAnPlusB = (ast, node, nthName, opt) => {
			const { nth: { a, b, name: nthIdentName }, selector } = ast;
			const anbMap = /* @__PURE__ */ new Map();
			if (nthIdentName) {
				if (nthIdentName === "even") {
					anbMap.set("a", 2);
					anbMap.set("b", 0);
				} else if (nthIdentName === "odd") {
					anbMap.set("a", 2);
					anbMap.set("b", 1);
				}
				if (nthName.indexOf("last") > -1) anbMap.set("reverse", true);
			} else {
				if (typeof a === "string" && /-?\d+/.test(a)) anbMap.set("a", a * 1);
				else anbMap.set("a", 0);
				if (typeof b === "string" && /-?\d+/.test(b)) anbMap.set("b", b * 1);
				else anbMap.set("b", 0);
				if (nthName.indexOf("last") > -1) anbMap.set("reverse", true);
			}
			if (nthName === "nth-child" || nthName === "nth-last-child") {
				if (selector) anbMap.set("selector", selector);
				const anb = Object.fromEntries(anbMap);
				return this._collectNthChild(anb, node, opt);
			} else if (nthName === "nth-of-type" || nthName === "nth-last-of-type") {
				const anb = Object.fromEntries(anbMap);
				return this._collectNthOfType(anb, node);
			}
			return /* @__PURE__ */ new Set();
		};
		/**
		* Matches the :has() pseudo-class function.
		* @private
		* @param {Array.<object>} astLeaves - The AST leaves.
		* @param {object} node - The Element node.
		* @param {object} [opt] - Options.
		* @returns {boolean} The result.
		*/
		_matchHasPseudoFunc = (astLeaves, node, opt = {}) => {
			if (Array.isArray(astLeaves) && astLeaves.length) {
				const leaves = [...astLeaves];
				const [leaf] = leaves;
				const { type: leafType } = leaf;
				let combo;
				if (leafType === "Combinator") combo = leaves.shift();
				else combo = {
					name: " ",
					type: COMBINATOR
				};
				const twigLeaves = [];
				while (leaves.length) {
					const [item] = leaves;
					const { type: itemType } = item;
					if (itemType === "Combinator") break;
					else twigLeaves.push(leaves.shift());
				}
				const twig = {
					combo,
					leaves: twigLeaves
				};
				opt.dir = DIR_NEXT;
				const nodes = this._collectCombinatorMatches(twig, node, opt, []);
				if (nodes.length) {
					if (leaves.length) {
						let bool = false;
						for (const nextNode of nodes) {
							bool = this._matchHasPseudoFunc(leaves, nextNode, opt);
							if (bool) break;
						}
						return bool;
					}
					return true;
				}
			}
			return false;
		};
		/**
		* Evaluates the :has() pseudo-class.
		* @private
		* @param {object} astData - The AST data.
		* @param {object} node - The Element node.
		* @param {object} [opt] - Options.
		* @returns {?object} The matched node.
		*/
		_evaluateHasPseudo = (astData, node, opt = {}) => {
			const { branches } = astData;
			let bool = false;
			const l = branches.length;
			for (let i = 0; i < l; i++) {
				const leaves = branches[i];
				bool = this._matchHasPseudoFunc(leaves, node, opt);
				if (bool) break;
			}
			if (!bool) return null;
			if ((opt.isShadowRoot || this.#shadow) && node.nodeType === 11) return this.#verifyShadowHost ? node : null;
			return node;
		};
		/**
		* Matches logical pseudo-class functions.
		* @private
		* @param {object} astData - The AST data.
		* @param {object} node - The Element node.
		* @param {object} [opt] - Options.
		* @returns {?object} The matched node.
		*/
		_matchLogicalPseudoFunc = (astData, node, opt = {}) => {
			const { astName, branches, twigBranches } = astData;
			if (astName === "has") return this._evaluateHasPseudo(astData, node, opt);
			if ((opt.isShadowRoot || this.#shadow) && node.nodeType === 11) {
				let invalid = false;
				for (const branch of branches) if (branch.length > 1) {
					invalid = true;
					break;
				} else if (astName === "not") {
					const [{ type: childAstType }] = branch;
					if (childAstType !== "PseudoClassSelector") {
						invalid = true;
						break;
					}
				}
				if (invalid) return null;
			}
			opt.forgive = astName === "is" || astName === "where";
			const l = twigBranches.length;
			let bool;
			for (let i = 0; i < l; i++) {
				const branch = twigBranches[i];
				const lastIndex = branch.length - 1;
				const { leaves } = branch[lastIndex];
				bool = this._matchLeaves(leaves, node, opt);
				if (bool && lastIndex > 0) {
					let nextNodes = new Set([node]);
					for (let j = lastIndex - 1; j >= 0; j--) {
						const twig = branch[j];
						const arr = [];
						opt.dir = DIR_PREV;
						for (const nextNode of nextNodes) this._collectCombinatorMatches(twig, nextNode, opt, arr);
						if (arr.length) if (j === 0) bool = true;
						else nextNodes = new Set(arr);
						else {
							bool = false;
							break;
						}
					}
				}
				if (bool) break;
			}
			if (astName === "not") {
				if (bool) return null;
				return node;
			} else if (bool) return node;
			return null;
		};
		/**
		* Matches pseudo-class selector.
		* @private
		* @see https://html.spec.whatwg.org/#pseudo-classes
		* @param {object} ast - The AST.
		* @param {object} node - The Element node.
		* @param {object} [opt] - Options.
		* @param {boolean} [opt.forgive] - Ignores unknown or invalid selectors.
		* @param {boolean} [opt.warn] - If true, console warnings are enabled.
		* @returns {Set.<object>} A collection of matched nodes.
		*/
		_matchPseudoClassSelector(ast, node, opt = {}) {
			const { children: astChildren, name: astName } = ast;
			const { localName, parentNode } = node;
			const { forgive, warn = this.#warn } = opt;
			const matched = /* @__PURE__ */ new Set();
			if (Array.isArray(astChildren) && KEYS_LOGICAL.has(astName)) {
				if (!astChildren.length && astName !== "is" && astName !== "where") {
					const msg = `Invalid selector ${generate(ast)}`;
					return this.onError(generateException(msg, SYNTAX_ERR, this.#window));
				}
				let astData;
				if (this.#astCache.has(ast)) astData = this.#astCache.get(ast);
				else {
					const { branches } = walkAST(ast);
					if (astName === "has") {
						let forgiven = false;
						const l = astChildren.length;
						for (let i = 0; i < l; i++) {
							const child = astChildren[i];
							const item = find(child, findLogicalWithNestedHas);
							if (item) {
								const itemName = item.name;
								if (itemName === "is" || itemName === "where") {
									forgiven = true;
									break;
								} else {
									const msg = `Invalid selector ${generate(ast)}`;
									return this.onError(generateException(msg, SYNTAX_ERR, this.#window));
								}
							}
						}
						if (forgiven) return matched;
						astData = {
							astName,
							branches
						};
					} else {
						const twigBranches = [];
						const l = branches.length;
						for (let i = 0; i < l; i++) {
							const [ ...leaves] = branches[i];
							const branch = [];
							const leavesSet = /* @__PURE__ */ new Set();
							let item = leaves.shift();
							while (item) {
								if (item.type === "Combinator") {
									branch.push({
										combo: item,
										leaves: [...leavesSet]
									});
									leavesSet.clear();
								} else if (item) leavesSet.add(item);
								if (leaves.length) item = leaves.shift();
								else {
									branch.push({
										combo: null,
										leaves: [...leavesSet]
									});
									leavesSet.clear();
									break;
								}
							}
							twigBranches.push(branch);
						}
						astData = {
							astName,
							branches,
							twigBranches
						};
						this.#astCache.set(ast, astData);
					}
				}
				const res = this._matchLogicalPseudoFunc(astData, node, opt);
				if (res) matched.add(res);
			} else if (Array.isArray(astChildren)) if (/^nth-(?:last-)?(?:child|of-type)$/.test(astName)) {
				if (astChildren.length !== 1) {
					const css = generate(ast);
					return this.onError(generateException(`Invalid selector ${css}`, SYNTAX_ERR, this.#window));
				}
				const [branch] = astChildren;
				return this._matchAnPlusB(branch, node, astName, opt);
			} else switch (astName) {
				case "dir": {
					if (astChildren.length !== 1) {
						const css = generate(ast);
						return this.onError(generateException(`Invalid selector ${css}`, SYNTAX_ERR, this.#window));
					}
					const [astChild] = astChildren;
					if (matchDirectionPseudoClass(astChild, node)) matched.add(node);
					break;
				}
				case "lang": {
					if (!astChildren.length) {
						const css = generate(ast);
						return this.onError(generateException(`Invalid selector ${css}`, SYNTAX_ERR, this.#window));
					}
					let bool;
					for (const astChild of astChildren) {
						bool = matchLanguagePseudoClass(astChild, node);
						if (bool) break;
					}
					if (bool) matched.add(node);
					break;
				}
				case "state":
					if (isCustomElement(node)) {
						const [{ value: stateValue }] = astChildren;
						if (stateValue) if (node[stateValue]) matched.add(node);
						else for (const i in node) {
							const prop = node[i];
							if (prop instanceof this.#window.ElementInternals) {
								if (prop?.states?.has(stateValue)) matched.add(node);
								break;
							}
						}
					}
					break;
				case "current":
				case "heading":
				case "nth-col":
				case "nth-last-col":
					if (warn) this.onError(generateException(`Unsupported pseudo-class :${astName}()`, NOT_SUPPORTED_ERR, this.#window));
					break;
				case "host":
				case "host-context": break;
				case "contains":
					if (warn) this.onError(generateException(`Unknown pseudo-class :${astName}()`, NOT_SUPPORTED_ERR, this.#window));
					break;
				default: if (!forgive) this.onError(generateException(`Unknown pseudo-class :${astName}()`, SYNTAX_ERR, this.#window));
			}
			else if (KEYS_PS_NTH_OF_TYPE.has(astName)) {
				if (node === this.#root) matched.add(node);
				else if (parentNode) switch (astName) {
					case "first-of-type": {
						const [node1] = this._collectNthOfType({
							a: 0,
							b: 1
						}, node);
						if (node1) matched.add(node1);
						break;
					}
					case "last-of-type": {
						const [node1] = this._collectNthOfType({
							a: 0,
							b: 1,
							reverse: true
						}, node);
						if (node1) matched.add(node1);
						break;
					}
					default: {
						const [node1] = this._collectNthOfType({
							a: 0,
							b: 1
						}, node);
						if (node1 === node) {
							const [node2] = this._collectNthOfType({
								a: 0,
								b: 1,
								reverse: true
							}, node);
							if (node2 === node) matched.add(node);
						}
					}
				}
			} else switch (astName) {
				case "disabled":
				case "enabled":
					if (matchDisabledPseudoClass(astName, node)) matched.add(node);
					break;
				case "read-only":
				case "read-write":
					if (matchReadOnlyPseudoClass(astName, node)) matched.add(node);
					break;
				case "any-link":
				case "link":
					if ((localName === "a" || localName === "area") && node.hasAttribute("href")) matched.add(node);
					break;
				case "local-link":
					if ((localName === "a" || localName === "area") && node.hasAttribute("href")) {
						if (!this.#documentURL) this.#documentURL = new URL(this.#document.URL);
						const { href, origin, pathname } = this.#documentURL;
						const attrURL = new URL(node.getAttribute("href"), href);
						if (attrURL.origin === origin && attrURL.pathname === pathname) matched.add(node);
					}
					break;
				case "visited": break;
				case "hover": {
					const { target, type } = this.#event ?? {};
					if (/^(?:click|mouse(?:down|over|up))$/.test(type) && target?.nodeType === 1 && node.contains(target)) matched.add(node);
					break;
				}
				case "active": {
					const { buttons, target, type } = this.#event ?? {};
					if (type === "mousedown" && buttons & 1 && target?.nodeType === 1 && node.contains(target)) matched.add(node);
					break;
				}
				case "target": {
					if (!this.#documentURL) this.#documentURL = new URL(this.#document.URL);
					const { hash } = this.#documentURL;
					if (node.id && hash === `#${node.id}` && this.#document.contains(node)) matched.add(node);
					break;
				}
				case "target-within": {
					if (!this.#documentURL) this.#documentURL = new URL(this.#document.URL);
					const { hash } = this.#documentURL;
					if (hash) {
						const id = hash.replace(/^#/, "");
						let current = this.#document.getElementById(id);
						while (current) {
							if (current === node) {
								matched.add(node);
								break;
							}
							current = current.parentNode;
						}
					}
					break;
				}
				case "scope":
					if (this.#node.nodeType === 1) {
						if (!this.#shadow && node === this.#node) matched.add(node);
					} else if (node === this.#document.documentElement) matched.add(node);
					break;
				case "focus": {
					const activeElement = this.#document.activeElement;
					if (node === activeElement && isFocusableArea(node)) matched.add(node);
					else if (activeElement.shadowRoot) {
						let current = activeElement.shadowRoot.activeElement;
						while (current) if (current.nodeType === 11) {
							const { host } = current;
							if (host === activeElement) if (isFocusableArea(node)) matched.add(node);
							else matched.add(host);
							break;
						} else current = current.parentNode;
					}
					break;
				}
				case "focus-visible":
					if (node === this.#document.activeElement && isFocusableArea(node)) {
						let bool;
						if (isFocusVisible(node)) bool = true;
						else if (this.#focus) {
							const { relatedTarget, target: focusTarget } = this.#focus;
							if (focusTarget === node) {
								if (isFocusVisible(relatedTarget)) bool = true;
								else if (this.#event) {
									const { altKey: eventAltKey, ctrlKey: eventCtrlKey, key: eventKey, metaKey: eventMetaKey, target: eventTarget, type: eventType } = this.#event;
									if (eventTarget === relatedTarget) {
										if (this.#lastFocusVisible === null) bool = true;
										else if (focusTarget === this.#lastFocusVisible) bool = true;
									} else if (eventKey === "Tab") {
										if (eventType === "keydown" && eventTarget !== node || eventType === "keyup" && eventTarget === node) if (eventTarget === focusTarget) {
											if (this.#lastFocusVisible === null) bool = true;
											else if (eventTarget === this.#lastFocusVisible && relatedTarget === null) bool = true;
										} else bool = true;
									} else if (eventKey) {
										if ((eventType === "keydown" || eventType === "keyup") && !eventAltKey && !eventCtrlKey && !eventMetaKey && eventTarget === node) bool = true;
									}
								} else if (relatedTarget === null || relatedTarget === this.#lastFocusVisible) bool = true;
							}
						}
						if (bool) {
							this.#lastFocusVisible = node;
							matched.add(node);
						} else if (this.#lastFocusVisible === node) this.#lastFocusVisible = null;
					}
					break;
				case "focus-within": {
					const activeElement = this.#document.activeElement;
					if (node.contains(activeElement) && isFocusableArea(activeElement)) matched.add(node);
					else if (activeElement.shadowRoot) {
						const activeShadowElement = activeElement.shadowRoot.activeElement;
						if (node.contains(activeShadowElement)) matched.add(node);
						else {
							let current = activeShadowElement;
							while (current) if (current.nodeType === 11) {
								const { host } = current;
								if (host === activeElement && node.contains(host)) matched.add(node);
								break;
							} else current = current.parentNode;
						}
					}
					break;
				}
				case "open":
				case "closed":
					if (localName === "details" || localName === "dialog") {
						if (node.hasAttribute("open")) {
							if (astName === "open") matched.add(node);
						} else if (astName === "closed") matched.add(node);
					}
					break;
				case "placeholder-shown": {
					let placeholder;
					if (node.placeholder) placeholder = node.placeholder;
					else if (node.hasAttribute("placeholder")) placeholder = node.getAttribute("placeholder");
					if (typeof placeholder === "string" && !/[\r\n]/.test(placeholder)) {
						let targetNode;
						if (localName === "textarea") targetNode = node;
						else if (localName === "input") if (node.hasAttribute("type")) {
							if (KEYS_INPUT_PLACEHOLDER.has(node.getAttribute("type"))) targetNode = node;
						} else targetNode = node;
						if (targetNode && node.value === "") matched.add(node);
					}
					break;
				}
				case "checked": {
					const attrType = node.getAttribute("type");
					if (node.checked && localName === "input" && (attrType === "checkbox" || attrType === "radio") || node.selected && localName === "option") matched.add(node);
					break;
				}
				case "indeterminate":
					if (node.indeterminate && localName === "input" && node.type === "checkbox" || localName === "progress" && !node.hasAttribute("value")) matched.add(node);
					else if (localName === "input" && node.type === "radio" && !node.hasAttribute("checked")) {
						const nodeName = node.name;
						let parent = node.parentNode;
						while (parent) {
							if (parent.localName === "form") break;
							parent = parent.parentNode;
						}
						if (!parent) parent = this.#document.documentElement;
						const walker = this._createTreeWalker(parent);
						let refNode = traverseNode(parent, walker);
						refNode = walker.firstChild();
						let checked;
						while (refNode) {
							if (refNode.localName === "input" && refNode.getAttribute("type") === "radio") {
								if (refNode.hasAttribute("name")) {
									if (refNode.getAttribute("name") === nodeName) checked = !!refNode.checked;
								} else checked = !!refNode.checked;
								if (checked) break;
							}
							refNode = walker.nextNode();
						}
						if (!checked) matched.add(node);
					}
					break;
				case "default": {
					const attrType = node.getAttribute("type");
					if (localName === "button" && !(node.hasAttribute("type") && KEYS_INPUT_RESET.has(attrType)) || localName === "input" && node.hasAttribute("type") && KEYS_INPUT_SUBMIT.has(attrType)) {
						let form = node.parentNode;
						while (form) {
							if (form.localName === "form") break;
							form = form.parentNode;
						}
						if (form) {
							const walker = this._createTreeWalker(form);
							let refNode = traverseNode(form, walker);
							refNode = walker.firstChild();
							while (refNode) {
								const nodeName = refNode.localName;
								const nodeAttrType = refNode.getAttribute("type");
								let m;
								if (nodeName === "button") m = !(refNode.hasAttribute("type") && KEYS_INPUT_RESET.has(nodeAttrType));
								else if (nodeName === "input") m = refNode.hasAttribute("type") && KEYS_INPUT_SUBMIT.has(nodeAttrType);
								if (m) {
									if (refNode === node) matched.add(node);
									break;
								}
								refNode = walker.nextNode();
							}
						}
					} else if (localName === "input" && node.hasAttribute("type") && node.hasAttribute("checked") && KEYS_INPUT_CHECK.has(attrType)) matched.add(node);
					else if (localName === "option" && node.hasAttribute("selected")) matched.add(node);
					break;
				}
				case "valid":
				case "invalid":
					if (KEYS_FORM_PS_VALID.has(localName)) {
						let valid;
						if (node.checkValidity()) if (node.maxLength >= 0) {
							if (node.maxLength >= node.value.length) valid = true;
						} else valid = true;
						if (valid) {
							if (astName === "valid") matched.add(node);
						} else if (astName === "invalid") matched.add(node);
					} else if (localName === "fieldset") {
						const walker = this._createTreeWalker(node);
						let refNode = traverseNode(node, walker);
						refNode = walker.firstChild();
						let valid;
						if (!refNode) valid = true;
						else while (refNode) {
							if (KEYS_FORM_PS_VALID.has(refNode.localName)) {
								if (refNode.checkValidity()) if (refNode.maxLength >= 0) valid = refNode.maxLength >= refNode.value.length;
								else valid = true;
								else valid = false;
								if (!valid) break;
							}
							refNode = walker.nextNode();
						}
						if (valid) {
							if (astName === "valid") matched.add(node);
						} else if (astName === "invalid") matched.add(node);
					}
					break;
				case "in-range":
				case "out-of-range": {
					const attrType = node.getAttribute("type");
					if (localName === "input" && !(node.readOnly || node.hasAttribute("readonly")) && !(node.disabled || node.hasAttribute("disabled")) && KEYS_INPUT_RANGE.has(attrType)) {
						const flowed = node.validity.rangeUnderflow || node.validity.rangeOverflow;
						if (astName === "out-of-range" && flowed) matched.add(node);
						else if (astName === "in-range" && !flowed && (node.hasAttribute("min") || node.hasAttribute("max") || attrType === "range")) matched.add(node);
					}
					break;
				}
				case "required":
				case "optional": {
					let required;
					let optional;
					if (localName === "select" || localName === "textarea") if (node.required || node.hasAttribute("required")) required = true;
					else optional = true;
					else if (localName === "input") if (node.hasAttribute("type")) {
						const attrType = node.getAttribute("type");
						if (KEYS_INPUT_REQUIRED.has(attrType)) if (node.required || node.hasAttribute("required")) required = true;
						else optional = true;
						else optional = true;
					} else if (node.required || node.hasAttribute("required")) required = true;
					else optional = true;
					if (astName === "required" && required) matched.add(node);
					else if (astName === "optional" && optional) matched.add(node);
					break;
				}
				case "root":
					if (node === this.#document.documentElement) matched.add(node);
					break;
				case "empty":
					if (node.hasChildNodes()) {
						const walker = this._createTreeWalker(node, {
							force: true,
							whatToShow: SHOW_ALL
						});
						let refNode = walker.firstChild();
						let bool;
						while (refNode) {
							bool = refNode.nodeType !== 1 && refNode.nodeType !== 3;
							if (!bool) break;
							refNode = walker.nextSibling();
						}
						if (bool) matched.add(node);
					} else matched.add(node);
					break;
				case "first-child":
					if (parentNode && node === parentNode.firstElementChild || node === this.#root) matched.add(node);
					break;
				case "last-child":
					if (parentNode && node === parentNode.lastElementChild || node === this.#root) matched.add(node);
					break;
				case "only-child":
					if (parentNode && node === parentNode.firstElementChild && node === parentNode.lastElementChild || node === this.#root) matched.add(node);
					break;
				case "defined":
					if (node.hasAttribute("is") || localName.includes("-")) {
						if (isCustomElement(node)) matched.add(node);
					} else if (node instanceof this.#window.HTMLElement || node instanceof this.#window.SVGElement) matched.add(node);
					break;
				case "popover-open": break;
				case "host": break;
				case "after":
				case "before":
				case "first-letter":
				case "first-line":
					if (warn) this.onError(generateException(`Unsupported pseudo-element ::${astName}`, NOT_SUPPORTED_ERR, this.#window));
					break;
				case "autofill":
				case "blank":
				case "buffering":
				case "current":
				case "fullscreen":
				case "future":
				case "has-slotted":
				case "heading":
				case "modal":
				case "muted":
				case "past":
				case "paused":
				case "picture-in-picture":
				case "playing":
				case "seeking":
				case "stalled":
				case "user-invalid":
				case "user-valid":
				case "volume-locked":
				case "-webkit-autofill":
					if (warn) this.onError(generateException(`Unsupported pseudo-class :${astName}`, NOT_SUPPORTED_ERR, this.#window));
					break;
				default: if (astName.startsWith("-webkit-")) {
					if (warn) this.onError(generateException(`Unsupported pseudo-class :${astName}`, NOT_SUPPORTED_ERR, this.#window));
				} else if (!forgive) this.onError(generateException(`Unknown pseudo-class :${astName}`, SYNTAX_ERR, this.#window));
			}
			return matched;
		}
		/**
		* Evaluates the :host() pseudo-class.
		* @private
		* @param {Array.<object>} leaves - The AST leaves.
		* @param {object} host - The host element.
		* @param {object} ast - The original AST for error reporting.
		* @returns {boolean} True if matched.
		*/
		_evaluateHostPseudo = (leaves, host, ast) => {
			const l = leaves.length;
			for (let i = 0; i < l; i++) {
				const leaf = leaves[i];
				if (leaf.type === "Combinator") {
					const msg = `Invalid selector ${generate(ast)}`;
					this.onError(generateException(msg, SYNTAX_ERR, this.#window));
					return false;
				}
				if (!this._matchSelector(leaf, host).has(host)) return false;
			}
			return true;
		};
		/**
		* Evaluates the :host-context() pseudo-class.
		* @private
		* @param {Array.<object>} leaves - The AST leaves.
		* @param {object} host - The host element.
		* @param {object} ast - The original AST for error reporting.
		* @returns {boolean} True if matched.
		*/
		_evaluateHostContextPseudo = (leaves, host, ast) => {
			let parent = host;
			while (parent) {
				let bool;
				const l = leaves.length;
				for (let i = 0; i < l; i++) {
					const leaf = leaves[i];
					if (leaf.type === "Combinator") {
						const msg = `Invalid selector ${generate(ast)}`;
						this.onError(generateException(msg, SYNTAX_ERR, this.#window));
						return false;
					}
					bool = this._matchSelector(leaf, parent).has(parent);
					if (!bool) break;
				}
				if (bool) return true;
				parent = parent.parentNode;
			}
			return false;
		};
		/**
		* Matches shadow host pseudo-classes.
		* @private
		* @param {object} ast - The AST.
		* @param {object} node - The DocumentFragment node.
		* @returns {?object} The matched node.
		*/
		_matchShadowHostPseudoClass = (ast, node) => {
			const { children: astChildren, name: astName } = ast;
			if (!Array.isArray(astChildren)) {
				if (astName === "host") return node;
				const msg = `Invalid selector :${astName}`;
				return this.onError(generateException(msg, SYNTAX_ERR, this.#window));
			}
			if (astName !== "host" && astName !== "host-context") {
				const msg = `Invalid selector :${astName}()`;
				return this.onError(generateException(msg, SYNTAX_ERR, this.#window));
			}
			if (astChildren.length !== 1) {
				const msg = `Invalid selector ${generate(ast)}`;
				return this.onError(generateException(msg, SYNTAX_ERR, this.#window));
			}
			const { host } = node;
			const { branches } = walkAST(astChildren[0]);
			const [branch] = branches;
			const [ ...leaves] = branch;
			let isMatch = false;
			if (astName === "host") isMatch = this._evaluateHostPseudo(leaves, host, ast);
			else isMatch = this._evaluateHostContextPseudo(leaves, host, ast);
			return isMatch ? node : null;
		};
		/**
		* Matches a selector for element nodes.
		* @private
		* @param {object} ast - The AST.
		* @param {object} node - The Element node.
		* @param {object} opt - Options.
		* @returns {Set.<object>} A collection of matched nodes.
		*/
		_matchSelectorForElement = (ast, node, opt) => {
			const { type: astType } = ast;
			const astName = unescapeSelector(ast.name);
			const matched = /* @__PURE__ */ new Set();
			switch (astType) {
				case ATTR_SELECTOR:
					if (matchAttributeSelector(ast, node, opt)) matched.add(node);
					break;
				case ID_SELECTOR:
					if (node.id === astName) matched.add(node);
					break;
				case CLASS_SELECTOR:
					if (node.classList.contains(astName)) matched.add(node);
					break;
				case PS_CLASS_SELECTOR: return this._matchPseudoClassSelector(ast, node, opt);
				case TYPE_SELECTOR:
					if (matchTypeSelector(ast, node, opt)) matched.add(node);
					break;
				default: try {
					if (this.#check) {
						const css = generate(ast);
						this.#pseudoElement.push(css);
						matched.add(node);
					} else matchPseudoElementSelector(astName, astType, opt);
				} catch (e) {
					this.onError(e);
				}
			}
			return matched;
		};
		/**
		* Matches a selector for a shadow root.
		* @private
		* @param {object} ast - The AST.
		* @param {object} node - The DocumentFragment node.
		* @param {object} [opt] - Options.
		* @returns {Set.<object>} A collection of matched nodes.
		*/
		_matchSelectorForShadowRoot = (ast, node, opt = {}) => {
			const { name: astName } = ast;
			if (KEYS_LOGICAL.has(astName)) {
				opt.isShadowRoot = true;
				return this._matchPseudoClassSelector(ast, node, opt);
			}
			const matched = /* @__PURE__ */ new Set();
			if (astName === "host" || astName === "host-context") {
				const res = this._matchShadowHostPseudoClass(ast, node, opt);
				if (res) {
					this.#verifyShadowHost = true;
					matched.add(res);
				}
			}
			return matched;
		};
		/**
		* Matches a selector.
		* @private
		* @param {object} ast - The AST.
		* @param {object} node - The Document, DocumentFragment, or Element node.
		* @param {object} opt - Options.
		* @returns {Set.<object>} A collection of matched nodes.
		*/
		_matchSelector = (ast, node, opt) => {
			if (node.nodeType === 1) return this._matchSelectorForElement(ast, node, opt);
			if (this.#shadow && node.nodeType === 11 && ast.type === "PseudoClassSelector") return this._matchSelectorForShadowRoot(ast, node, opt);
			return /* @__PURE__ */ new Set();
		};
		/**
		* Matches leaves.
		* @private
		* @param {Array.<object>} leaves - The AST leaves.
		* @param {object} node - The node.
		* @param {object} opt - Options.
		* @returns {boolean} The result.
		*/
		_matchLeaves = (leaves, node, opt) => {
			const results = this.#invalidate ? this.#invalidateResults : this.#results;
			let result = results.get(leaves);
			if (result && result.has(node)) {
				const { matched } = result.get(node);
				return matched;
			}
			let cacheable = true;
			if (node.nodeType === 1 && KEYS_FORM.has(node.localName)) cacheable = false;
			let bool;
			const l = leaves.length;
			for (let i = 0; i < l; i++) {
				const leaf = leaves[i];
				switch (leaf.type) {
					case ATTR_SELECTOR:
					case ID_SELECTOR:
						cacheable = false;
						break;
					case PS_CLASS_SELECTOR:
						if (KEYS_PS_UNCACHE.has(leaf.name)) cacheable = false;
						break;
					default:
				}
				bool = this._matchSelector(leaf, node, opt).has(node);
				if (!bool) break;
			}
			if (cacheable) {
				if (!result) result = /* @__PURE__ */ new WeakMap();
				result.set(node, { matched: bool });
				results.set(leaves, result);
			}
			return bool;
		};
		/**
		* Returns a cached slice of the leaves array (excluding the first item).
		* @private
		* @param {Array.<object>} leaves - The original AST leaves array.
		* @returns {Array.<object>} The filtered leaves.
		*/
		_getFilterLeaves = (leaves) => {
			if (this.#filterLeavesCache.has(leaves)) return this.#filterLeavesCache.get(leaves);
			const filterLeaves = leaves.slice(1);
			this.#filterLeavesCache.set(leaves, filterLeaves);
			return filterLeaves;
		};
		/**
		* Traverses all descendant nodes and collects matches.
		* @private
		* @param {object} baseNode - The base Element node or Element.shadowRoot.
		* @param {Array.<object>} leaves - The AST leaves.
		* @param {object} opt - Options.
		* @returns {Set.<object>} A collection of matched nodes.
		*/
		_traverseAllDescendants = (baseNode, leaves, opt) => {
			const walker = this._createTreeWalker(baseNode);
			traverseNode(baseNode, walker);
			let currentNode = walker.firstChild();
			const nodes = /* @__PURE__ */ new Set();
			while (currentNode) {
				if (this._matchLeaves(leaves, currentNode, opt)) nodes.add(currentNode);
				currentNode = walker.nextNode();
			}
			return nodes;
		};
		/**
		* Finds descendant nodes.
		* @private
		* @param {Array.<object>} leaves - The AST leaves.
		* @param {object} baseNode - The base Element node or Element.shadowRoot.
		* @param {object} opt - Options.
		* @returns {Set.<object>} A collection of matched nodes.
		*/
		_findDescendantNodes = (leaves, baseNode, opt) => {
			const [leaf] = leaves;
			const filterLeaves = this._getFilterLeaves(leaves);
			const { type: leafType } = leaf;
			switch (leafType) {
				case ID_SELECTOR:
					if (!this.#shadow && baseNode.nodeType === 1 && this.#root.nodeType !== 1) {
						const leafName = unescapeSelector(leaf.name);
						const nodes = /* @__PURE__ */ new Set();
						const foundNode = this.#root.getElementById(leafName);
						if (foundNode && foundNode !== baseNode && baseNode.contains(foundNode)) {
							if (!(filterLeaves.length > 0) || this._matchLeaves(filterLeaves, foundNode, opt)) nodes.add(foundNode);
						}
						return nodes;
					}
					return this._traverseAllDescendants(baseNode, leaves, opt);
				case PS_ELEMENT_SELECTOR:
					matchPseudoElementSelector(unescapeSelector(leaf.name), leafType, opt);
					return /* @__PURE__ */ new Set();
				default: return this._traverseAllDescendants(baseNode, leaves, opt);
			}
		};
		/**
		* Collects combinator matches into an array without creating intermediate sets.
		* @private
		* @param {object} twig - The twig object.
		* @param {object} node - The Element node.
		* @param {object} [opt] - Options.
		* @param {string} [opt.dir] - The find direction.
		* @param {Array.<object>} matched - The collector array.
		* @returns {Array.<object>} The collector array.
		*/
		_collectCombinatorMatches = (twig, node, opt = {}, matched = []) => {
			const { combo: { name: comboName }, leaves } = twig;
			const { dir } = opt;
			switch (comboName) {
				case "+": {
					const refNode = dir === DIR_NEXT ? node.nextElementSibling : node.previousElementSibling;
					if (refNode && this._matchLeaves(leaves, refNode, opt)) matched.push(refNode);
					break;
				}
				case "~": {
					let refNode = dir === DIR_NEXT ? node.nextElementSibling : node.previousElementSibling;
					while (refNode) {
						if (this._matchLeaves(leaves, refNode, opt)) matched.push(refNode);
						refNode = dir === DIR_NEXT ? refNode.nextElementSibling : refNode.previousElementSibling;
					}
					break;
				}
				case ">":
					if (dir === DIR_NEXT) {
						let refNode = node.firstElementChild;
						while (refNode) {
							if (this._matchLeaves(leaves, refNode, opt)) matched.push(refNode);
							refNode = refNode.nextElementSibling;
						}
					} else {
						const { parentNode } = node;
						if (parentNode && this._matchLeaves(leaves, parentNode, opt)) matched.push(parentNode);
					}
					break;
				default: if (dir === DIR_NEXT) for (const refNode of this._findDescendantNodes(leaves, node, opt)) matched.push(refNode);
				else {
					const ancestors = [];
					let refNode = node.parentNode;
					while (refNode) {
						if (this._matchLeaves(leaves, refNode, opt)) ancestors.push(refNode);
						refNode = refNode.parentNode;
					}
					if (ancestors.length) matched.push(...ancestors.reverse());
				}
			}
			return matched;
		};
		/**
		* Matches a combinator.
		* @private
		* @param {object} twig - The twig object.
		* @param {object} node - The Element node.
		* @param {object} opt - Options.
		* @returns {Set.<object>} A collection of matched nodes.
		*/
		_matchCombinator = (twig, node, opt) => new Set(this._collectCombinatorMatches(twig, node, opt));
		/**
		* Traverses with a TreeWalker and collects nodes matching the leaves.
		* @private
		* @param {TreeWalker} walker - The TreeWalker instance to use.
		* @param {Array} leaves - The AST leaves to match against.
		* @param {object} [opt] - Traversal options.
		* @param {Node} [opt.boundaryNode] - The node to stop traversal at.
		* @param {boolean} [opt.force] - Force traversal to the next node.
		* @param {Node} [opt.startNode] - The node to start traversal from.
		* @param {string} [opt.targetType] - The type of target ('all' or 'first').
		* @returns {Array.<Node>} An array of matched nodes.
		*/
		_traverseAndCollectNodes = (walker, leaves, opt = {}) => {
			const { boundaryNode, force, startNode, targetType } = opt;
			const collectedNodes = [];
			let currentNode = traverseNode(startNode, walker, !!force);
			if (!currentNode) return [];
			if (currentNode.nodeType !== 1) currentNode = walker.nextNode();
			else if (currentNode === startNode && currentNode !== this.#root) currentNode = walker.nextNode();
			const matchOpt = { warn: this.#warn };
			while (currentNode) {
				if (boundaryNode) {
					if (currentNode === boundaryNode) break;
					else if (targetType === "all" && !boundaryNode.contains(currentNode)) break;
				}
				if (this._matchLeaves(leaves, currentNode, matchOpt) && currentNode !== this.#node) {
					collectedNodes.push(currentNode);
					if (targetType !== "all") break;
				}
				currentNode = walker.nextNode();
			}
			return collectedNodes;
		};
		/**
		* Finds matched node(s) preceding this.#node.
		* @private
		* @param {Array.<object>} leaves - The AST leaves.
		* @param {object} node - The node to start from.
		* @param {object} [opt] - Options.
		* @param {boolean} [opt.force] - If true, traverses only to the next node.
		* @param {string} [opt.targetType] - The target type.
		* @returns {Array.<object>} A collection of matched nodes.
		*/
		_findPrecede = (leaves, node, opt = {}) => {
			const { force, targetType } = opt;
			if (!this.#rootWalker) this.#rootWalker = this._createTreeWalker(this.#root);
			return this._traverseAndCollectNodes(this.#rootWalker, leaves, {
				force,
				targetType,
				boundaryNode: this.#node,
				startNode: node
			});
		};
		/**
		* Finds matched node(s) in #nodeWalker.
		* @private
		* @param {Array.<object>} leaves - The AST leaves.
		* @param {object} node - The node to start from.
		* @param {object} [opt] - Options.
		* @param {boolean} [opt.precede] - If true, finds preceding nodes.
		* @returns {Array.<object>} A collection of matched nodes.
		*/
		_findNodeWalker = (leaves, node, opt = {}) => {
			const { precede, ...traversalOpts } = opt;
			if (precede) {
				const precedeNodes = this._findPrecede(leaves, this.#root, opt);
				if (precedeNodes.length) return precedeNodes;
			}
			if (!this.#nodeWalker) this.#nodeWalker = this._createTreeWalker(this.#node);
			return this._traverseAndCollectNodes(this.#nodeWalker, leaves, {
				startNode: node,
				...traversalOpts
			});
		};
		/**
		* Matches the node itself.
		* @private
		* @param {Array} leaves - The AST leaves.
		* @returns {Array} An array containing [nodes, filtered, pseudoElement].
		*/
		_matchSelf = (leaves) => {
			const matched = this._matchLeaves(leaves, this.#node, {
				check: this.#check,
				warn: this.#warn
			});
			return [
				matched ? [this.#node] : [],
				matched,
				this.#pseudoElement
			];
		};
		/**
		* Finds lineal nodes (self and ancestors).
		* @private
		* @param {Array} leaves - The AST leaves.
		* @param {object} [opt] - Options.
		* @param {boolean} [opt.complex] - If true, the selector is complex.
		* @returns {Array} An array containing [nodes, filtered].
		*/
		_findLineal = (leaves, opt = {}) => {
			const { complex } = opt;
			const nodes = [];
			const matchOpts = { warn: this.#warn };
			const selfMatched = this._matchLeaves(leaves, this.#node, matchOpts);
			if (selfMatched) nodes.push(this.#node);
			if (!selfMatched || complex) {
				let currentNode = this.#node.parentNode;
				while (currentNode) {
					if (this._matchLeaves(leaves, currentNode, matchOpts)) nodes.push(currentNode);
					currentNode = currentNode.parentNode;
				}
			}
			return [nodes, nodes.length > 0];
		};
		/**
		* Finds entry nodes for pseudo-element selectors.
		* @private
		* @param {object} leaf - The pseudo-element leaf from the AST.
		* @param {Array.<object>} filterLeaves - Leaves for compound selectors.
		* @param {string} targetType - The type of target to find.
		* @returns {object} The result { nodes, filtered, pending }.
		*/
		_findEntryNodesForPseudoElement = (leaf, filterLeaves, targetType) => {
			let nodes = [];
			let filtered = false;
			if (targetType === "self" && this.#check) {
				const css = generate(leaf);
				this.#pseudoElement.push(css);
				if (filterLeaves.length) [nodes, filtered] = this._matchSelf(filterLeaves);
				else {
					nodes.push(this.#node);
					filtered = true;
				}
			} else matchPseudoElementSelector(leaf.name, leaf.type, { warn: this.#warn });
			return {
				nodes,
				filtered,
				pending: false
			};
		};
		/**
		* Finds entry nodes for ID selectors.
		* @private
		* @param {object} twig - The current twig from the AST branch.
		* @param {string} targetType - The type of target to find.
		* @param {object} [opt] - Options.
		* @param {boolean} [opt.complex] - If true, the selector is complex.
		* @param {boolean} [opt.precede] - If true, finds preceding nodes.
		* @returns {object} The result { nodes, filtered, pending }.
		*/
		_findEntryNodesForId = (twig, targetType, opt = {}) => {
			const { leaves } = twig;
			const [leaf] = leaves;
			const filterLeaves = this._getFilterLeaves(leaves);
			const { complex, precede } = opt;
			let nodes = [];
			let filtered = false;
			if (targetType === "self") [nodes, filtered] = this._matchSelf(leaves);
			else if (targetType === "lineal") [nodes, filtered] = this._findLineal(leaves, { complex });
			else if (targetType === "first" && this.#root.nodeType !== 1) {
				const node = this.#root.getElementById(leaf.name);
				if (node) if (filterLeaves.length) {
					if (this._matchLeaves(filterLeaves, node, { warn: this.#warn })) {
						nodes.push(node);
						filtered = true;
					}
				} else {
					nodes.push(node);
					filtered = true;
				}
			} else {
				nodes = this._findNodeWalker(leaves, this.#node, {
					precede,
					targetType
				});
				filtered = nodes.length > 0;
			}
			return {
				nodes,
				filtered,
				pending: false
			};
		};
		/**
		* Finds entry nodes for class selectors.
		* @private
		* @param {Array.<object>} leaves - The AST leaves for the selector.
		* @param {string} targetType - The type of target to find.
		* @param {object} [opt] - Options.
		* @param {boolean} [opt.complex] - If true, the selector is complex.
		* @param {boolean} [opt.precede] - If true, finds preceding nodes.
		* @returns {object} The result { nodes, filtered, pending }.
		*/
		_findEntryNodesForClass = (leaves, targetType, opt = {}) => {
			const { complex, precede } = opt;
			let nodes = [];
			let filtered = false;
			if (targetType === "self") [nodes, filtered] = this._matchSelf(leaves);
			else if (targetType === "lineal") [nodes, filtered] = this._findLineal(leaves, { complex });
			else {
				nodes = this._findNodeWalker(leaves, this.#node, {
					precede,
					targetType
				});
				filtered = nodes.length > 0;
			}
			return {
				nodes,
				filtered,
				pending: false
			};
		};
		/**
		* Finds entry nodes for type selectors.
		* @private
		* @param {Array.<object>} leaves - The AST leaves for the selector.
		* @param {string} targetType - The type of target to find.
		* @param {object} [opt] - Options.
		* @param {boolean} [opt.complex] - If true, the selector is complex.
		* @param {boolean} [opt.precede] - If true, finds preceding nodes.
		* @returns {object} The result { nodes, filtered, pending }.
		*/
		_findEntryNodesForType = (leaves, targetType, opt = {}) => {
			const { complex, precede } = opt;
			let nodes = [];
			let filtered = false;
			if (targetType === "self") [nodes, filtered] = this._matchSelf(leaves);
			else if (targetType === "lineal") [nodes, filtered] = this._findLineal(leaves, { complex });
			else {
				nodes = this._findNodeWalker(leaves, this.#node, {
					precede,
					targetType
				});
				filtered = nodes.length > 0;
			}
			return {
				nodes,
				filtered,
				pending: false
			};
		};
		/**
		* Finds entry nodes for other selector types (default case).
		* @private
		* @param {object} twig - The current twig from the AST branch.
		* @param {string} targetType - The type of target to find.
		* @param {object} [opt] - Options.
		* @param {boolean} [opt.complex] - If true, the selector is complex.
		* @param {boolean} [opt.precede] - If true, finds preceding nodes.
		* @returns {object} The result { nodes, filtered, pending }.
		*/
		_findEntryNodesForOther = (twig, targetType, opt = {}) => {
			const { leaves } = twig;
			const [leaf] = leaves;
			const filterLeaves = this._getFilterLeaves(leaves);
			const { complex, precede } = opt;
			let nodes = [];
			let filtered = false;
			let pending = false;
			if (targetType !== "lineal" && /host(?:-context)?/.test(leaf.name)) {
				let shadowRoot = null;
				if (this.#shadow && this.#node.nodeType === 11) shadowRoot = this._matchShadowHostPseudoClass(leaf, this.#node);
				else if (filterLeaves.length && this.#node.nodeType === 1) shadowRoot = this._matchShadowHostPseudoClass(leaf, this.#node.shadowRoot);
				if (shadowRoot) {
					let bool = true;
					const l = filterLeaves.length;
					for (let i = 0; i < l; i++) {
						const filterLeaf = filterLeaves[i];
						switch (filterLeaf.name) {
							case "host":
							case "host-context":
								bool = this._matchShadowHostPseudoClass(filterLeaf, shadowRoot) === shadowRoot;
								break;
							case "has":
								bool = this._matchPseudoClassSelector(filterLeaf, shadowRoot, {}).has(shadowRoot);
								break;
							default: bool = false;
						}
						if (!bool) break;
					}
					if (bool) {
						nodes.push(shadowRoot);
						filtered = true;
					}
				}
			} else if (targetType === "self") [nodes, filtered] = this._matchSelf(leaves);
			else if (targetType === "lineal") [nodes, filtered] = this._findLineal(leaves, { complex });
			else if (targetType === "first") {
				nodes = this._findNodeWalker(leaves, this.#node, {
					precede,
					targetType
				});
				filtered = nodes.length > 0;
			} else pending = true;
			return {
				nodes,
				filtered,
				pending
			};
		};
		/**
		* Finds entry nodes.
		* @private
		* @param {object} twig - The twig object.
		* @param {string} targetType - The target type.
		* @param {object} [opt] - Options.
		* @param {boolean} [opt.complex] - If true, the selector is complex.
		* @param {string} [opt.dir] - The find direction.
		* @returns {object} An object with nodes and their state.
		*/
		_findEntryNodes = (twig, targetType, opt = {}) => {
			const { leaves } = twig;
			const [leaf] = leaves;
			const filterLeaves = this._getFilterLeaves(leaves);
			const { complex = false, dir = DIR_PREV } = opt;
			const precede = dir === DIR_NEXT && this.#node.nodeType === 1 && this.#node !== this.#root;
			let result;
			switch (leaf.type) {
				case PS_ELEMENT_SELECTOR:
					result = this._findEntryNodesForPseudoElement(leaf, filterLeaves, targetType);
					break;
				case ID_SELECTOR:
					result = this._findEntryNodesForId(twig, targetType, {
						complex,
						precede
					});
					break;
				case CLASS_SELECTOR:
					result = this._findEntryNodesForClass(leaves, targetType, {
						complex,
						precede
					});
					break;
				case TYPE_SELECTOR:
					result = this._findEntryNodesForType(leaves, targetType, {
						complex,
						precede
					});
					break;
				default: result = this._findEntryNodesForOther(twig, targetType, {
					complex,
					precede
				});
			}
			return {
				compound: filterLeaves.length > 0,
				filtered: result.filtered,
				nodes: result.nodes,
				pending: result.pending
			};
		};
		/**
		* Determines the direction and starting twig for a selector branch.
		* @private
		* @param {Array.<object>} branch - The AST branch.
		* @param {string} targetType - The type of target to find.
		* @returns {object} An object with the direction and starting twig.
		*/
		_determineTraversalStrategy = (branch, targetType) => {
			const branchLen = branch.length;
			const firstTwig = branch[0];
			const lastTwig = branch[branchLen - 1];
			if (branchLen === 1) return {
				dir: DIR_PREV,
				twig: firstTwig
			};
			const { leaves: [{ name: firstName, type: firstType }] } = firstTwig;
			const { leaves: [{ name: lastName, type: lastType }] } = lastTwig;
			const { combo: firstCombo } = firstTwig;
			if (this.#selector.includes(":scope") || lastType === "PseudoElementSelector" || lastType === "IdSelector") return {
				dir: DIR_PREV,
				twig: lastTwig
			};
			if (firstType === "IdSelector") return {
				dir: DIR_NEXT,
				twig: firstTwig
			};
			if (firstName === "*" && firstType === "TypeSelector") return {
				dir: DIR_PREV,
				twig: lastTwig
			};
			if (lastName === "*" && lastType === "TypeSelector") return {
				dir: DIR_NEXT,
				twig: firstTwig
			};
			if (branchLen === 2) {
				if (targetType === "first") return {
					dir: DIR_PREV,
					twig: lastTwig
				};
				const { name: comboName } = firstCombo;
				if (comboName === "+" || comboName === "~") return {
					dir: DIR_PREV,
					twig: lastTwig
				};
			} else if (branchLen > 2 && this.#scoped && targetType === "first") {
				if (lastType === "TypeSelector") return {
					dir: DIR_PREV,
					twig: lastTwig
				};
				let isChildOrDescendant = false;
				for (const { combo } of branch) if (combo) {
					const { name: comboName } = combo;
					isChildOrDescendant = comboName === ">" || comboName === " ";
					if (!isChildOrDescendant) break;
				}
				if (isChildOrDescendant) return {
					dir: DIR_PREV,
					twig: lastTwig
				};
			}
			return {
				dir: DIR_NEXT,
				twig: firstTwig
			};
		};
		/**
		* Processes pending items not resolved with a direct strategy.
		* @private
		* @param {Set.<Map>} pendingItems - The set of pending items.
		*/
		_processPendingItems = (pendingItems) => {
			if (!pendingItems.size) return;
			if (!this.#rootWalker) this.#rootWalker = this._createTreeWalker(this.#root);
			const walker = this.#rootWalker;
			let node = this.#root;
			if (this.#scoped) node = this.#node;
			let nextNode = traverseNode(node, walker);
			while (nextNode) {
				if (this.#node.nodeType !== 1 || nextNode === this.#node || this.#node.contains(nextNode)) for (const pendingItem of pendingItems) {
					const { leaves } = pendingItem.get("twig");
					if (this._matchLeaves(leaves, nextNode, { warn: this.#warn })) {
						const index = pendingItem.get("index");
						this.#ast[index].filtered = true;
						this.#ast[index].find = true;
						this.#nodes[index].push(nextNode);
					}
				}
				else if (this.#scoped) break;
				nextNode = walker.nextNode();
			}
		};
		/**
		* Collects nodes.
		* @private
		* @param {string} targetType - The target type.
		* @returns {Array.<Array.<object>>} An array containing the AST and nodes.
		*/
		_collectNodes = (targetType) => {
			[this.#ast, this.#nodes] = this._correspond(this.#selector);
			const ast = this.#ast.values();
			if (targetType === "all" || targetType === "first") {
				const pendingItems = /* @__PURE__ */ new Set();
				let i = 0;
				for (const { branch } of ast) {
					const complex = branch.length > 1;
					const { dir, twig } = this._determineTraversalStrategy(branch, targetType);
					const { compound, filtered, nodes, pending } = this._findEntryNodes(twig, targetType, {
						complex,
						dir
					});
					if (nodes.length) {
						this.#ast[i].find = true;
						this.#nodes[i] = nodes;
					} else if (pending) pendingItems.add(new Map([["index", i], ["twig", twig]]));
					this.#ast[i].dir = dir;
					this.#ast[i].filtered = filtered || !compound;
					i++;
				}
				this._processPendingItems(pendingItems);
			} else {
				let i = 0;
				for (const { branch } of ast) {
					const twig = branch[branch.length - 1];
					const complex = branch.length > 1;
					const dir = DIR_PREV;
					const { compound, filtered, nodes } = this._findEntryNodes(twig, targetType, {
						complex,
						dir
					});
					if (nodes.length) {
						this.#ast[i].find = true;
						this.#nodes[i] = nodes;
					}
					this.#ast[i].dir = dir;
					this.#ast[i].filtered = filtered || !compound;
					i++;
				}
			}
			return [this.#ast, this.#nodes];
		};
		/**
		* Gets combined nodes.
		* @private
		* @param {object} twig - The twig object.
		* @param {object} nodes - A collection of nodes.
		* @param {string} dir - The direction.
		* @returns {Array.<object>} A collection of matched nodes.
		*/
		_getCombinedNodes = (twig, nodes, dir) => {
			const arr = [];
			for (const node of nodes) this._collectCombinatorMatches(twig, node, {
				dir,
				warn: this.#warn
			}, arr);
			return arr;
		};
		/**
		* Matches a node in the 'next' direction.
		* @private
		* @param {Array} branch - The branch.
		* @param {Set.<object>} nodes - A collection of Element nodes.
		* @param {object} [opt] - Options.
		* @param {object} [opt.combo] - The combo object.
		* @param {number} [opt.index] - The index.
		* @returns {?object} The matched node.
		*/
		_matchNodeNext = (branch, nodes, opt = {}) => {
			const { combo, index } = opt;
			const { combo: nextCombo, leaves } = branch[index];
			const twig = {
				combo,
				leaves
			};
			const nextNodes = this._getCombinedNodes(twig, nodes, DIR_NEXT);
			if (nextNodes.length) {
				if (index === branch.length - 1) {
					if (nextNodes.length === 1) return nextNodes[0];
					const [nextNode] = sortNodes(nextNodes);
					return nextNode;
				}
				return this._matchNodeNext(branch, nextNodes, {
					combo: nextCombo,
					index: index + 1
				});
			}
			return null;
		};
		/**
		* Matches a node in the 'previous' direction.
		* @private
		* @param {Array} branch - The branch.
		* @param {object} node - The Element node.
		* @param {object} [opt] - Options.
		* @param {number} [opt.index] - The index.
		* @returns {?object} The node.
		*/
		_matchNodePrev = (branch, node, opt = {}) => {
			const { index } = opt;
			const twig = branch[index];
			const nextNodes = this._getCombinedNodes(twig, [node], DIR_PREV);
			if (nextNodes.length) {
				if (index === 0) return node;
				let matched;
				for (const nextNode of nextNodes) {
					matched = this._matchNodePrev(branch, nextNode, { index: index - 1 });
					if (matched) break;
				}
				if (matched) return node;
			}
			return null;
		};
		/**
		* Processes a complex selector branch to find all matching nodes.
		* @private
		* @param {Array} branch - The selector branch from the AST.
		* @param {Array} entryNodes - The initial set of nodes to start from.
		* @param {string} dir - The direction of traversal ('next' or 'prev').
		* @returns {Set.<object>} A set of all matched nodes.
		*/
		_processComplexBranchAll = (branch, entryNodes, dir) => {
			const matchedNodes = /* @__PURE__ */ new Set();
			const branchLen = branch.length;
			const lastIndex = branchLen - 1;
			if (dir === DIR_NEXT) {
				const { combo: firstCombo } = branch[0];
				for (const node of entryNodes) {
					let combo = firstCombo;
					let nextNodes = [node];
					for (let j = 1; j < branchLen; j++) {
						const { combo: nextCombo, leaves } = branch[j];
						const twig = {
							combo,
							leaves
						};
						const nodesArr = this._getCombinedNodes(twig, nextNodes, dir);
						if (nodesArr.length) {
							if (j === lastIndex) for (const nextNode of nodesArr) matchedNodes.add(nextNode);
							combo = nextCombo;
							nextNodes = nodesArr;
						} else break;
					}
				}
			} else for (const node of entryNodes) {
				let nextNodes = [node];
				for (let j = lastIndex - 1; j >= 0; j--) {
					const twig = branch[j];
					const nodesArr = this._getCombinedNodes(twig, nextNodes, dir);
					if (nodesArr.length) {
						if (j === 0) matchedNodes.add(node);
						nextNodes = nodesArr;
					} else break;
				}
			}
			return matchedNodes;
		};
		/**
		* Processes a complex selector branch to find the first matching node.
		* @private
		* @param {Array} branch - The selector branch from the AST.
		* @param {Array} entryNodes - The initial set of nodes to start from.
		* @param {string} dir - The direction of traversal ('next' or 'prev').
		* @param {string} targetType - The type of search (e.g., 'first').
		* @returns {?object} The first matched node, or null.
		*/
		_processComplexBranchFirst = (branch, entryNodes, dir, targetType) => {
			const lastIndex = branch.length - 1;
			if (dir === DIR_NEXT) {
				const { combo: entryCombo } = branch[0];
				for (const node of entryNodes) {
					const matchedNode = this._matchNodeNext(branch, new Set([node]), {
						combo: entryCombo,
						index: 1
					});
					if (matchedNode) if (this.#node.nodeType === 1) {
						if (matchedNode !== this.#node && this.#node.contains(matchedNode)) return matchedNode;
					} else return matchedNode;
				}
				const { leaves: entryLeaves } = branch[0];
				const [entryNode] = entryNodes;
				if (this.#node.contains(entryNode)) {
					let [refNode] = this._findNodeWalker(entryLeaves, entryNode, { targetType });
					while (refNode) {
						const matchedNode = this._matchNodeNext(branch, new Set([refNode]), {
							combo: entryCombo,
							index: 1
						});
						if (matchedNode) if (this.#node.nodeType === 1) {
							if (matchedNode !== this.#node && this.#node.contains(matchedNode)) return matchedNode;
						} else return matchedNode;
						[refNode] = this._findNodeWalker(entryLeaves, refNode, {
							targetType,
							force: true
						});
					}
				}
			} else {
				for (const node of entryNodes) {
					const matchedNode = this._matchNodePrev(branch, node, { index: lastIndex - 1 });
					if (matchedNode) return matchedNode;
				}
				if (targetType === "first") {
					const { leaves: entryLeaves } = branch[lastIndex];
					const [entryNode] = entryNodes;
					let [refNode] = this._findNodeWalker(entryLeaves, entryNode, { targetType });
					while (refNode) {
						if (this._matchNodePrev(branch, refNode, { index: lastIndex - 1 })) return refNode;
						[refNode] = this._findNodeWalker(entryLeaves, refNode, {
							targetType,
							force: true
						});
					}
				}
			}
			return null;
		};
		/**
		* Finds matched nodes.
		* @param {string} targetType - The target type.
		* @returns {Set.<object>} A collection of matched nodes.
		*/
		find = (targetType) => {
			let collection;
			try {
				collection = this._collectNodes(targetType);
			} catch (e) {
				if (this.#check) {
					let pseudoElement;
					if (this.#pseudoElement.length) pseudoElement = this.#pseudoElement.join("");
					else pseudoElement = null;
					return {
						pseudoElement,
						match: false,
						ast: this.#selectorAST ?? null
					};
				} else throw e;
			}
			const [[ ...branches], collectedNodes] = collection;
			const l = branches.length;
			let sort = l > 1 && targetType === "all" && this.#selector.includes(":scope");
			let nodes = /* @__PURE__ */ new Set();
			for (let i = 0; i < l; i++) {
				const { branch, dir, find } = branches[i];
				if (!branch.length || !find) continue;
				const entryNodes = collectedNodes[i];
				if (branch.length - 1 === 0) {
					if ((targetType === "all" || targetType === "first") && this.#node.nodeType === 1) {
						for (const node of entryNodes) if (node !== this.#node && this.#node.contains(node)) {
							nodes.add(node);
							if (targetType === "first") break;
						}
					} else if (targetType === "all") if (nodes.size) {
						for (const node of entryNodes) nodes.add(node);
						sort = true;
					} else nodes = new Set(entryNodes);
					else if (entryNodes.length) nodes.add(entryNodes[0]);
				} else if (targetType === "all") {
					const newNodes = this._processComplexBranchAll(branch, entryNodes, dir);
					if (nodes.size) {
						for (const newNode of newNodes) nodes.add(newNode);
						sort = true;
					} else nodes = newNodes;
				} else {
					const matchedNode = this._processComplexBranchFirst(branch, entryNodes, dir, targetType);
					if (matchedNode) nodes.add(matchedNode);
				}
			}
			if (this.#check) {
				const match = !!nodes.size;
				let pseudoElement;
				if (this.#pseudoElement.length) pseudoElement = this.#pseudoElement.join("");
				else pseudoElement = null;
				return {
					match,
					pseudoElement,
					ast: this.#selectorAST
				};
			}
			if (targetType === "first" || targetType === "all") nodes.delete(this.#node);
			if ((sort || targetType === "first") && nodes.size > 1) return new Set(sortNodes(nodes));
			return nodes;
		};
		/**
		* Gets AST for selector.
		* @param {string} selector - The selector text.
		* @returns {object} The AST for the selector.
		*/
		getAST = (selector) => {
			return parseSelector(selector);
		};
	};
}));
//#endregion
//#region node_modules/isomorphic-dompurify/node_modules/@asamuzakjp/dom-selector/src/index.js
var src_exports = /* @__PURE__ */ __exportAll({ DOMSelector: () => DOMSelector });
var CACHE_SIZE, DOMSelector;
var init_src = __esmMin((() => {
	init_src$1();
	init_finder();
	init_parser();
	init_utility();
	init_constant();
	CACHE_SIZE = 2048;
	DOMSelector = class {
		#window;
		#document;
		#finder;
		#idlUtils;
		#nwsapi;
		#cache;
		/**
		* Creates an instance of DOMSelector.
		* @param {Window} window - The window object.
		* @param {Document} document - The document object.
		* @param {object} [opt] - Options.
		*/
		constructor(window, document, opt = {}) {
			const { cacheSize, idlUtils } = opt;
			this.#window = window;
			this.#document = document ?? window.document;
			this.#finder = new Finder(window);
			this.#idlUtils = idlUtils;
			this.#nwsapi = initNwsapi(window, document);
			this.#cache = new GenerationalCache(cacheSize ?? CACHE_SIZE);
		}
		/**
		* Clears the internal cache of finder results.
		* @returns {void}
		*/
		clear = () => {
			this.#finder.clearResults(true);
		};
		/**
		* Parses a selector and extracts the rightmost subject keys (Id, Class, Tag).
		* @param {string} selector - The CSS selector to parse.
		* @returns {Array<{id: string|null, className: string|null, tag: string|null}>} The list of extracted keys for each selector group.
		*/
		extractSubjects = (selector) => {
			if (!selector || typeof selector !== "string") return [{
				id: null,
				className: null,
				tag: null
			}];
			const cacheKey = `extract_${selector}`;
			let subjects = this.#cache.get(cacheKey);
			if (subjects !== void 0) return subjects;
			subjects = [];
			try {
				const ast = this.#finder.getAST(selector);
				if (ast?.type === "SelectorList") for (const selectorNode of ast.children) {
					let idKey = null;
					let classKey = null;
					let tagKey = null;
					let current = selectorNode.children.tail;
					while (current) {
						const node = current.data;
						if (node.type === "Combinator") break;
						if (node.type === "IdSelector") idKey = idKey ?? unescapeSelector(node.name);
						else if (node.type === "ClassSelector") classKey = classKey ?? unescapeSelector(node.name);
						else if (node.type === "TypeSelector") {
							const { localName } = parseAstName(unescapeSelector(node.name));
							if (localName !== "*") tagKey = tagKey ?? localName.toLowerCase();
						}
						current = current.prev;
					}
					subjects.push({
						id: idKey,
						className: classKey,
						tag: tagKey
					});
				}
			} catch (e) {}
			if (!subjects.length) subjects.push({
				id: null,
				className: null,
				tag: null
			});
			this.#cache.set(cacheKey, subjects);
			return subjects;
		};
		/**
		* Checks if an element matches a CSS selector.
		* @param {string} selector - The CSS selector to check against.
		* @param {Element} node - The element node to check.
		* @param {object} [opt] - Optional parameters.
		* @returns {CheckResult} An object containing the check result.
		*/
		check = (selector, node, opt = {}) => {
			if (!node?.nodeType) {
				const e = new this.#window.TypeError(`Unexpected type ${getType(node)}`);
				return this.#finder.onError(e, opt);
			} else if (node.nodeType !== 1) {
				const e = new this.#window.TypeError(`Unexpected node ${node.nodeName}`);
				return this.#finder.onError(e, opt);
			}
			const document = node.ownerDocument;
			if (document === this.#document && document.contentType === "text/html" && document.documentElement && node.parentNode) {
				const cacheKey = `check_${selector}`;
				let filterMatches = this.#cache.get(cacheKey);
				if (filterMatches === void 0) {
					filterMatches = filterSelector(selector, TARGET_SELF);
					this.#cache.set(cacheKey, filterMatches);
				}
				if (filterMatches) try {
					const n = this.#idlUtils ? this.#idlUtils.wrapperForImpl(node) : node;
					const match = this.#nwsapi.match(selector, n);
					let ast = null;
					if (match) {
						const astCacheKey = `check_ast_${selector}`;
						ast = this.#cache.get(astCacheKey);
						if (ast === void 0) {
							ast = this.#finder.getAST(selector);
							this.#cache.set(astCacheKey, ast);
						}
					}
					return {
						match,
						ast,
						pseudoElement: null
					};
				} catch (e) {}
			}
			if (this.#idlUtils) node = this.#idlUtils.wrapperForImpl(node);
			opt.check = true;
			opt.noexcept = true;
			opt.warn = false;
			return this.#finder.setup(selector, node, opt).find(TARGET_SELF);
		};
		/**
		* Returns true if the element matches the selector.
		* @param {string} selector - The CSS selector to match against.
		* @param {Element} node - The element node to test.
		* @param {object} [opt] - Optional parameters.
		* @returns {boolean} `true` if the element matches, or `false` otherwise.
		*/
		matches = (selector, node, opt = {}) => {
			if (!node?.nodeType) {
				const e = new this.#window.TypeError(`Unexpected type ${getType(node)}`);
				return this.#finder.onError(e, opt);
			} else if (node.nodeType !== 1) {
				const e = new this.#window.TypeError(`Unexpected node ${node.nodeName}`);
				return this.#finder.onError(e, opt);
			}
			const document = node.ownerDocument;
			if (document === this.#document && document.contentType === "text/html" && document.documentElement && node.parentNode) {
				const cacheKey = `matches_${selector}`;
				let filterMatches = this.#cache.get(cacheKey);
				if (filterMatches === void 0) {
					filterMatches = filterSelector(selector, TARGET_SELF);
					this.#cache.set(cacheKey, filterMatches);
				}
				if (filterMatches) try {
					const n = this.#idlUtils ? this.#idlUtils.wrapperForImpl(node) : node;
					return this.#nwsapi.match(selector, n);
				} catch (e) {}
			}
			let res;
			try {
				if (this.#idlUtils) node = this.#idlUtils.wrapperForImpl(node);
				res = this.#finder.setup(selector, node, opt).find(TARGET_SELF).size;
			} catch (e) {
				this.#finder.onError(e, opt);
			}
			return !!res;
		};
		/**
		* Traverses up the DOM tree to find the first node that matches the selector.
		* @param {string} selector - The CSS selector to match against.
		* @param {Element} node - The element from which to start traversing.
		* @param {object} [opt] - Optional parameters.
		* @returns {?Element} The first matching ancestor element, or `null`.
		*/
		closest = (selector, node, opt = {}) => {
			if (!node?.nodeType) {
				const e = new this.#window.TypeError(`Unexpected type ${getType(node)}`);
				return this.#finder.onError(e, opt);
			} else if (node.nodeType !== 1) {
				const e = new this.#window.TypeError(`Unexpected node ${node.nodeName}`);
				return this.#finder.onError(e, opt);
			}
			const document = node.ownerDocument;
			if (document === this.#document && document.contentType === "text/html" && document.documentElement && node.parentNode) {
				const cacheKey = `closest_${selector}`;
				let filterMatches = this.#cache.get(cacheKey);
				if (filterMatches === void 0) {
					filterMatches = filterSelector(selector, TARGET_LINEAL);
					this.#cache.set(cacheKey, filterMatches);
				}
				if (filterMatches) try {
					const n = this.#idlUtils ? this.#idlUtils.wrapperForImpl(node) : node;
					return this.#nwsapi.closest(selector, n);
				} catch (e) {}
			}
			let res;
			try {
				if (this.#idlUtils) node = this.#idlUtils.wrapperForImpl(node);
				const nodes = this.#finder.setup(selector, node, opt).find(TARGET_LINEAL);
				if (nodes.size) {
					let refNode = node;
					while (refNode) {
						if (nodes.has(refNode)) {
							res = refNode;
							break;
						}
						refNode = refNode.parentNode;
					}
				}
			} catch (e) {
				this.#finder.onError(e, opt);
			}
			return res ?? null;
		};
		/**
		* Returns the first element within the subtree that matches the selector.
		* @param {string} selector - The CSS selector to match.
		* @param {Document|DocumentFragment|Element} node - The node to find within.
		* @param {object} [opt] - Optional parameters.
		* @returns {?Element} The first matching element, or `null`.
		*/
		querySelector = (selector, node, opt = {}) => {
			if (!node?.nodeType) {
				const e = new this.#window.TypeError(`Unexpected type ${getType(node)}`);
				return this.#finder.onError(e, opt);
			}
			const document = node.nodeType === 9 ? node : node.ownerDocument;
			if (document === this.#document && document.contentType === "text/html" && document.documentElement && (node.nodeType !== 11 || !node.host)) {
				const cacheKey = `querySelector_${selector}`;
				let filterMatches = this.#cache.get(cacheKey);
				if (filterMatches === void 0) {
					filterMatches = filterSelector(selector, TARGET_FIRST);
					this.#cache.set(cacheKey, filterMatches);
				}
				if (filterMatches) try {
					const n = this.#idlUtils ? this.#idlUtils.wrapperForImpl(node) : node;
					return this.#nwsapi.first(selector, n);
				} catch (e) {}
			}
			let res;
			try {
				if (this.#idlUtils) node = this.#idlUtils.wrapperForImpl(node);
				const nodes = this.#finder.setup(selector, node, opt).find(TARGET_FIRST);
				if (nodes.size) [res] = [...nodes];
			} catch (e) {
				this.#finder.onError(e, opt);
			}
			return res ?? null;
		};
		/**
		* Returns an array of elements within the subtree that match the selector.
		* Note: This method returns an Array, not a NodeList.
		* @param {string} selector - The CSS selector to match.
		* @param {Document|DocumentFragment|Element} node - The node to find within.
		* @param {object} [opt] - Optional parameters.
		* @returns {Array<Element>} An array of elements, or an empty array.
		*/
		querySelectorAll = (selector, node, opt = {}) => {
			if (!node?.nodeType) {
				const e = new this.#window.TypeError(`Unexpected type ${getType(node)}`);
				return this.#finder.onError(e, opt);
			}
			const document = node.nodeType === 9 ? node : node.ownerDocument;
			if (document === this.#document && document.contentType === "text/html" && document.documentElement && (node.nodeType !== 11 || !node.host)) {
				const cacheKey = `querySelectorAll_${selector}`;
				let filterMatches = this.#cache.get(cacheKey);
				if (filterMatches === void 0) {
					filterMatches = filterSelector(selector, "all");
					this.#cache.set(cacheKey, filterMatches);
				}
				if (filterMatches) try {
					const n = this.#idlUtils ? this.#idlUtils.wrapperForImpl(node) : node;
					return this.#nwsapi.select(selector, n);
				} catch (e) {}
			}
			let res;
			try {
				if (this.#idlUtils) node = this.#idlUtils.wrapperForImpl(node);
				const nodes = this.#finder.setup(selector, node, opt).find("all");
				if (nodes.size) res = [...nodes];
			} catch (e) {
				this.#finder.onError(e, opt);
			}
			return res ?? [];
		};
	};
}));
//#endregion
export { require_is_potential_custom_element_name as i, src_exports as n, require_source_map_generator as r, init_src as t };
