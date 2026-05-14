import { create } from "zustand";

type OpenStore = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

export const useOpenStore = create<OpenStore>((set) => ({
	open: false,
	setOpen: (open) =>
		set({
			open,
		}),
}));
