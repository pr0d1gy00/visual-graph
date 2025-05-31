import multer, { StorageEngine } from "multer";
import { Request } from "express";

export const uploadFile = async (file: Express.Multer.File) => {
	try {
		const storageFile: StorageEngine = multer.diskStorage({
			destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
				cb(null, "public/");
			},
			filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
				cb(null, `${Date.now()}-${file.originalname}`);
			}
		});
		const upload = multer({ storage: storageFile }).single("file");
	} catch (error: any) {
		console.error("Error al subir el archivo:", error.message);
		throw error;
	}
}