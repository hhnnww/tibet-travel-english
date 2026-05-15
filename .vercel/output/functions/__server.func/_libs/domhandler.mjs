import { n as __esmMin, r as __exportAll } from "../_runtime.mjs";
import { n as init_dist$1, r as isTag$1, t as ElementType } from "./domelementtype.mjs";
//#region node_modules/html-react-parser/node_modules/domhandler/dist/node.js
/**
* Checks if `node` is an element node.
* @param node Node to check.
* @returns `true` if the node is an element node.
*/
function isTag(node) {
	return isTag$1(node);
}
/**
* Checks if `node` is a CDATA node.
* @param node Node to check.
* @returns `true` if the node is a CDATA node.
*/
function isCDATA(node) {
	return node.type === ElementType.CDATA;
}
/**
* Checks if `node` is a text node.
* @param node Node to check.
* @returns `true` if the node is a text node.
*/
function isText(node) {
	return node.type === ElementType.Text;
}
/**
* Checks if `node` is a comment node.
* @param node Node to check.
* @returns `true` if the node is a comment node.
*/
function isComment(node) {
	return node.type === ElementType.Comment;
}
/**
* Checks if `node` is a directive node.
* @param node Node to check.
* @returns `true` if the node is a directive node.
*/
function isDirective(node) {
	return node.type === ElementType.Directive;
}
/**
* Checks if `node` is a document node.
* @param node Node to check.
* @returns `true` if the node is a document node.
*/
function isDocument(node) {
	return node.type === ElementType.Root;
}
/**
* Checks if `node` has children.
* @param node Node to check.
* @returns `true` if the node has children.
*/
function hasChildren(node) {
	return Object.hasOwn(node, "children");
}
/**
* Clone a node, and optionally its children.
* @param node Node to clone.
* @param recursive Clone child nodes as well.
* @returns A clone of the node.
*/
function cloneNode(node, recursive = false) {
	let result;
	if (isText(node)) result = new Text(node.data);
	else if (isComment(node)) result = new Comment(node.data);
	else if (isTag(node)) {
		const children = recursive ? cloneChildren(node.children) : [];
		const clone = new Element(node.name, { ...node.attribs }, children);
		for (const child of children) child.parent = clone;
		if (node.namespace != null) clone.namespace = node.namespace;
		if (node["x-attribsNamespace"]) clone["x-attribsNamespace"] = { ...node["x-attribsNamespace"] };
		if (node["x-attribsPrefix"]) clone["x-attribsPrefix"] = { ...node["x-attribsPrefix"] };
		result = clone;
	} else if (isCDATA(node)) {
		const children = recursive ? cloneChildren(node.children) : [];
		const clone = new CDATA(children);
		for (const child of children) child.parent = clone;
		result = clone;
	} else if (isDocument(node)) {
		const children = recursive ? cloneChildren(node.children) : [];
		const clone = new Document(children);
		for (const child of children) child.parent = clone;
		if (node["x-mode"]) clone["x-mode"] = node["x-mode"];
		result = clone;
	} else if (isDirective(node)) {
		const instruction = new ProcessingInstruction(node.name, node.data);
		if (node["x-name"] != null) {
			instruction["x-name"] = node["x-name"];
			instruction["x-publicId"] = node["x-publicId"];
			instruction["x-systemId"] = node["x-systemId"];
		}
		result = instruction;
	} else throw new Error(`Not implemented yet: ${node.type}`);
	result.startIndex = node.startIndex;
	result.endIndex = node.endIndex;
	if (node.sourceCodeLocation != null) result.sourceCodeLocation = node.sourceCodeLocation;
	return result;
}
/**
* Clone a list of child nodes.
* @param childs The child nodes to clone.
* @returns A list of cloned child nodes.
*/
function cloneChildren(childs) {
	const children = childs.map((child) => cloneNode(child, true));
	for (let index = 1; index < children.length; index++) {
		children[index].prev = children[index - 1];
		children[index - 1].next = children[index];
	}
	return children;
}
var Node, DataNode, Text, Comment, ProcessingInstruction, NodeWithChildren, CDATA, Document, Element;
var init_node = __esmMin((() => {
	init_dist$1();
	Node = class {
		/** Parent of the node */
		parent = null;
		/** Previous sibling */
		prev = null;
		/** Next sibling */
		next = null;
		/** The start index of the node. Requires `withStartIndices` on the handler to be `true. */
		startIndex = null;
		/** The end index of the node. Requires `withEndIndices` on the handler to be `true. */
		endIndex = null;
		/**
		* Same as {@link parent}.
		* [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
		*/
		get parentNode() {
			return this.parent;
		}
		set parentNode(parent) {
			this.parent = parent;
		}
		/**
		* Same as {@link prev}.
		* [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
		*/
		get previousSibling() {
			return this.prev;
		}
		set previousSibling(previous) {
			this.prev = previous;
		}
		/**
		* Same as {@link next}.
		* [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
		*/
		get nextSibling() {
			return this.next;
		}
		set nextSibling(next) {
			this.next = next;
		}
		/**
		* Clone this node, and optionally its children.
		* @param recursive Clone child nodes as well.
		* @returns A clone of the node.
		*/
		cloneNode(recursive = false) {
			return cloneNode(this, recursive);
		}
	};
	DataNode = class extends Node {
		data;
		/**
		* @param data The content of the data node
		*/
		constructor(data) {
			super();
			this.data = data;
		}
		/**
		* Same as {@link data}.
		* [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
		*/
		get nodeValue() {
			return this.data;
		}
		set nodeValue(data) {
			this.data = data;
		}
	};
	Text = class extends DataNode {
		type = ElementType.Text;
		get nodeType() {
			return 3;
		}
	};
	Comment = class extends DataNode {
		type = ElementType.Comment;
		get nodeType() {
			return 8;
		}
	};
	ProcessingInstruction = class extends DataNode {
		type = ElementType.Directive;
		name;
		constructor(name, data) {
			super(data);
			this.name = name;
		}
		get nodeType() {
			return 1;
		}
		/** If this is a doctype, the document type name (parse5 only). */
		"x-name";
		/** If this is a doctype, the document type public identifier (parse5 only). */
		"x-publicId";
		/** If this is a doctype, the document type system identifier (parse5 only). */
		"x-systemId";
	};
	NodeWithChildren = class extends Node {
		children;
		/**
		* @param children Children of the node. Only certain node types can have children.
		*/
		constructor(children) {
			super();
			this.children = children;
		}
		/** First child of the node. */
		get firstChild() {
			return this.children[0] ?? null;
		}
		/** Last child of the node. */
		get lastChild() {
			return this.children.length > 0 ? this.children[this.children.length - 1] : null;
		}
		/**
		* Same as {@link children}.
		* [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
		*/
		get childNodes() {
			return this.children;
		}
		set childNodes(children) {
			this.children = children;
		}
	};
	CDATA = class extends NodeWithChildren {
		type = ElementType.CDATA;
		get nodeType() {
			return 4;
		}
	};
	Document = class extends NodeWithChildren {
		type = ElementType.Root;
		get nodeType() {
			return 9;
		}
	};
	Element = class extends NodeWithChildren {
		name;
		attribs;
		type;
		/**
		* @param name Name of the tag, eg. `div`, `span`.
		* @param attribs Object mapping attribute names to attribute values.
		* @param children Children of the node.
		* @param type Node type used for the new node instance.
		*/
		constructor(name, attribs, children = [], type = name === "script" ? ElementType.Script : name === "style" ? ElementType.Style : ElementType.Tag) {
			super(children);
			this.name = name;
			this.attribs = attribs;
			this.type = type;
		}
		get nodeType() {
			return 1;
		}
		/**
		* Same as {@link name}.
		* [DOM spec](https://dom.spec.whatwg.org)-compatible alias.
		*/
		get tagName() {
			return this.name;
		}
		set tagName(name) {
			this.name = name;
		}
		get attributes() {
			return Object.keys(this.attribs).map((name) => ({
				name,
				value: this.attribs[name],
				namespace: this["x-attribsNamespace"]?.[name],
				prefix: this["x-attribsPrefix"]?.[name]
			}));
		}
		/** Element namespace (parse5 only). */
		namespace;
		/** Element attribute namespaces (parse5 only). */
		"x-attribsNamespace";
		/** Element attribute namespace-related prefixes (parse5 only). */
		"x-attribsPrefix";
	};
}));
//#endregion
//#region node_modules/html-react-parser/node_modules/domhandler/dist/index.js
var dist_exports = /* @__PURE__ */ __exportAll({
	CDATA: () => CDATA,
	Comment: () => Comment,
	DataNode: () => DataNode,
	Document: () => Document,
	DomHandler: () => DomHandler,
	Element: () => Element,
	Node: () => Node,
	NodeWithChildren: () => NodeWithChildren,
	ProcessingInstruction: () => ProcessingInstruction,
	Text: () => Text,
	cloneNode: () => cloneNode,
	default: () => DomHandler,
	hasChildren: () => hasChildren,
	isCDATA: () => isCDATA,
	isComment: () => isComment,
	isDirective: () => isDirective,
	isDocument: () => isDocument,
	isTag: () => isTag,
	isText: () => isText
});
var defaultOptions, DomHandler;
var init_dist = __esmMin((() => {
	init_dist$1();
	init_node();
	init_node();
	defaultOptions = {
		withStartIndices: false,
		withEndIndices: false,
		xmlMode: false
	};
	DomHandler = class {
		/** The elements of the DOM */
		dom = [];
		/** The root element for the DOM */
		root = new Document(this.dom);
		/** Called once parsing has completed. */
		callback;
		/** Settings for the handler. */
		options;
		/** Callback whenever a tag is closed. */
		elementCB;
		/** Indicated whether parsing has been completed. */
		done = false;
		/** Stack of open tags. */
		tagStack = [this.root];
		/** A data node that is still being written to. */
		lastNode = null;
		/** Reference to the parser instance. Used for location information. */
		parser = null;
		/**
		* @param callback Called once parsing has completed.
		* @param options Settings for the handler.
		* @param elementCB Callback whenever a tag is closed.
		*/
		constructor(callback, options, elementCB) {
			if (typeof options === "function") {
				elementCB = options;
				options = defaultOptions;
			}
			if (typeof callback === "object") {
				options = callback;
				callback = void 0;
			}
			this.callback = callback ?? null;
			this.options = options ?? defaultOptions;
			this.elementCB = elementCB ?? null;
		}
		onparserinit(parser) {
			this.parser = parser;
		}
		onreset() {
			this.dom = [];
			this.root = new Document(this.dom);
			this.done = false;
			this.tagStack = [this.root];
			this.lastNode = null;
			this.parser = null;
		}
		onend() {
			if (this.done) return;
			this.done = true;
			this.parser = null;
			this.handleCallback(null);
		}
		onerror(error) {
			this.handleCallback(error);
		}
		onclosetag() {
			this.lastNode = null;
			const element = this.tagStack.pop();
			if (this.options.withEndIndices && this.parser) element.endIndex = this.parser.endIndex;
			if (this.elementCB) this.elementCB(element);
		}
		onopentag(name, attribs) {
			const element = new Element(name, attribs, void 0, this.options.xmlMode ? ElementType.Tag : void 0);
			this.addNode(element);
			this.tagStack.push(element);
		}
		ontext(data) {
			const { lastNode } = this;
			if (lastNode && lastNode.type === ElementType.Text) {
				lastNode.data += data;
				if (this.options.withEndIndices && this.parser) lastNode.endIndex = this.parser.endIndex;
			} else {
				const node = new Text(data);
				this.addNode(node);
				this.lastNode = node;
			}
		}
		oncomment(data) {
			if (this.lastNode && this.lastNode.type === ElementType.Comment) {
				this.lastNode.data += data;
				return;
			}
			const node = new Comment(data);
			this.addNode(node);
			this.lastNode = node;
		}
		oncommentend() {
			this.lastNode = null;
		}
		oncdatastart() {
			const text = new Text("");
			const node = new CDATA([text]);
			this.addNode(node);
			text.parent = node;
			this.lastNode = text;
		}
		oncdataend() {
			this.lastNode = null;
		}
		onprocessinginstruction(name, data) {
			const node = new ProcessingInstruction(name, data);
			this.addNode(node);
		}
		handleCallback(error) {
			if (typeof this.callback === "function") this.callback(error, this.dom);
			else if (error) throw error;
		}
		addNode(node) {
			const parent = this.tagStack[this.tagStack.length - 1];
			const previousSibling = parent.children[parent.children.length - 1];
			if (this.options.withStartIndices && this.parser) node.startIndex = this.parser.startIndex;
			if (this.options.withEndIndices && this.parser) node.endIndex = this.parser.endIndex;
			parent.children.push(node);
			if (previousSibling) {
				node.prev = previousSibling;
				previousSibling.next = node;
			}
			node.parent = parent;
			this.lastNode = null;
		}
	};
}));
//#endregion
export { init_dist as n, dist_exports as t };
