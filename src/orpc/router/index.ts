import {
	addAdPage,
	deleteAdPage,
	getAdPage,
	listAdPages,
	updateAdPage,
} from "./adpage.ts";
import {
	addAdReply,
	deleteAdReply,
	listAdReplys,
	updateAdReply,
} from "./adreplay.ts";
import { addAdUser, deleteAdUser, listAdUsers } from "./adusers.ts";

export default {
	addAdReply,
	updateAdReply,
	deleteAdReply,
	listAdReplys,

	listAdUsers,
	deleteAdUser,
	addAdUser,

	listAdPages,
	deleteAdPage,
	updateAdPage,
	addAdPage,
	getAdPage,
};
