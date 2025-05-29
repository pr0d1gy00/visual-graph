import { Router } from "express";
import { getRelationsContentsController, addRelationContentController, removeRelationContentController, getRelationByIdController } from '../controllers/relationsContentsController';

const router = Router();

router.get('/', getRelationsContentsController);
router.post('/createRelationsContent', addRelationContentController);
router.delete('/deleteRelationsContent/:id', removeRelationContentController);
router.get('/:id', getRelationByIdController);

export default router;