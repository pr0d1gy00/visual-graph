import { Router } from "express";
import multer from "multer";
import { getAllMedia, getMediaByContent, uploadMedia } from "../controllers/mediaController";
import { randomUUID } from "crypto";

const router = Router();

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "uploads/");
	},
	filename: (req, file, cb) => {
		const ext = file.originalname.split('.').pop() || "bin";
        const randomName = `${Date.now()}-${randomUUID()}.${ext}`;
        cb(null, randomName);
	}
});

const upload = multer({ storage });
const asyncHandler = (fn: any) => (req: any, res: any, next: any) =>
	Promise.resolve(fn(req, res, next)).catch(next);

router.post("/upload", upload.single("file"), asyncHandler(uploadMedia));
router.get("/", asyncHandler(getAllMedia));
export default router;