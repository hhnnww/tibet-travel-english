import { imagesRouter } from "./adimage.ts";
import {
	adpageAdd,
	adpageDelete,
	adpageGet,
	adpageList,
	adpageUpdate,
} from "./adpage.ts";
import {
	adreplyAdd,
	adreplyDelete,
	adreplyGet,
	adreplyList,
	adreplyUpdate,
} from "./adreply.ts";

export default {
	adpageAdd,
	adpageDelete,
	adpageGet,
	adpageList,
	adpageUpdate,

	adreplyAdd,
	adreplyDelete,
	adreplyGet,
	adreplyList,
	adreplyUpdate,

	imagesRouter,
};
