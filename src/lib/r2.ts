import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createServerFn } from "@tanstack/react-start";
import { nanoid } from "nanoid";

export const r2 = new S3Client({
	region: "auto",
	endpoint: "https://6631e42f289efcec90f7973c87737e46.r2.cloudflarestorage.com",
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID as string,
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY as string,
	},
});

export const getUploadUrl = createServerFn({
	method: "POST",
})
	.inputValidator((data: { filename: string; contentType: string }) => data)
	.handler(async ({ data }) => {
		const allowedTypes = ["image/png", "image/jpeg", "image/webp", "image/gif"];
		if (!allowedTypes.includes(data.contentType)) {
			throw new Error("Invalid file type");
		}
		const key = `uploads/${Date.now()}-${nanoid()}.webp`;
		const command = new PutObjectCommand({
			Bucket: process.env.R2_BUCKET as string,
			Key: key,
			ContentType: data.contentType,
			CacheControl: "public, max-age=31536000",
		});

		const uploadUrl = await getSignedUrl(r2, command, {
			expiresIn: 60 * 5,
		});
		const fileUrl = `${process.env.R2_PUBLIC_URL}/${key}`;
		return {
			uploadUrl,
			fileUrl,
		};
	});
