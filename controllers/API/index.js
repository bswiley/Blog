const router = require('express').Router();

const commentRoutes = require('./comment-routes.js');
const postRoutes = require('./post-routes.js');
const userRoutes = require('./user-routes.js');

router.use('/comment', commentRoutes);
router.use('/post', postRoutes);
router.use('/user', userRoutes);

module.exports = router;