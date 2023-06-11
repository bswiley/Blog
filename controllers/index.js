const router = require('express').Router();


const dashboardRoutes = require('./dashboard-routes.js');
const homeRoutes = require('./home-routes.js');


router.use('/dashboard', dashboardRoutes);
router.use('/home', homeRoutes);
router.use('/api', apiRoutes);

module.exports = router;
