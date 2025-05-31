import Router from 'express';
import { uploadStories,getAllStories,deleteStoriesMedia } from '../controllers/storiesMediaController';
const router = Router();

router.get('/', getAllStories);
router.post('/uploadMediaStory', uploadStories);
router.delete('/deleteStory/:id', deleteStoriesMedia);

export default router;