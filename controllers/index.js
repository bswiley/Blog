const router = require('express').Router();


const apiRoutes = require('./userRoutes.js');
const siteRoutes = require('./siteRoutes.js');


router.use('/', siteRoutes);
router.use('/api', apiRoutes);

module.exports = router;
