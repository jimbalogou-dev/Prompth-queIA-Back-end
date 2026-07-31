const express = require('express');
const { getStats, getTopContributors, postDiscussion, getDiscussions } = require('../Controllers/CommunityController.js');

const router = express.Router();

router.get('/stats', getStats);
router.get('/top-contributors', getTopContributors);
router.get('/discussions', getDiscussions);
router.post('/discussions', postDiscussion);

module.exports = router;