import imageCompression from "browser-image-compression";

export async function compressImage(file: File) {
	const compressedFile = await imageCompression(file, {
		maxWidthOrHeight: 1600,
		maxSizeMB: 1,
		useWebWorker: true,
		fileType: "image/webp",
		initialQuality: 0.8,
	});
	return compressedFile;
}
