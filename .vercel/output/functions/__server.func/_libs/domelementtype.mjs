import { n as __esmMin } from "../_runtime.mjs";
//#region node_modules/html-react-parser/node_modules/domelementtype/dist/index.js
/**
* Tests whether an element is a tag or not.
* @param element Element to test
* @param element.type Node type discriminator to check.
*/
function isTag(element) {
	return element.type === ElementType.Tag || element.type === ElementType.Script || element.type === ElementType.Style;
}
var ElementType;
var init_dist = __esmMin((() => {
	(function(ElementType) {
		/** Type for the root element of a document */
		ElementType["Root"] = "root";
		/** Type for Text */
		ElementType["Text"] = "text";
		/** Type for <? ... ?> */
		ElementType["Directive"] = "directive";
		/** Type for <!-- ... --> */
		ElementType["Comment"] = "comment";
		/** Type for <script> tags */
		ElementType["Script"] = "script";
		/** Type for <style> tags */
		ElementType["Style"] = "style";
		/** Type for Any tag */
		ElementType["Tag"] = "tag";
		/** Type for <![CDATA[ ... ]]> */
		ElementType["CDATA"] = "cdata";
		/** Type for <!doctype ...> */
		ElementType["Doctype"] = "doctype";
	})(ElementType || (ElementType = {}));
	ElementType.Root;
	ElementType.Text;
	ElementType.Directive;
	ElementType.Comment;
	ElementType.Script;
	ElementType.Style;
	ElementType.Tag;
	ElementType.CDATA;
	ElementType.Doctype;
}));
//#endregion
export { init_dist as n, isTag as r, ElementType as t };
