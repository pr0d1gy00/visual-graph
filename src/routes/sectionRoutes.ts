import Router from 'express';
import { addSection, getSection, getSections, removeSection } from '../controllers/sectionController';

const router = Router();

router.get('/',getSections);
router.post('/createSection',addSection);
router.get('/getSectionById/:id',getSection);
router.delete('/deleteSection/:id',removeSection)

export default router;