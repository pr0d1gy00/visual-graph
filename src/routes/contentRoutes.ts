import { Router } from "express";
import { addContent, getContent, getContents, removeContent } from "../controllers/contentController";

const router = Router();

router.get("/", getContents);
router.post("/createContent", addContent);
router.get("/getContentById/:id", getContent);
router.delete("/deleteContent/:id", removeContent);

export default router;