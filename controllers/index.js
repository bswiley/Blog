const router = require('express').Router();
const apiRoutes = require('./api');
const siteRoutes = require('./siteRoutes')

router.use('/', siteRoutes);
router.use('/api', apiRoutes);

module.exports = router;
