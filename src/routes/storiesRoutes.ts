import Router from 'express';
import { getStories, addStory, removeStory } from '../controllers/storiesController';
const router = Router();

router.get('/', getStories);
router.post('/createStory', addStory);
router.delete('/deleteStory/:id', removeStory);

export default router;