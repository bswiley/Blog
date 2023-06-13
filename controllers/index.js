const router = require('express').Router();
const userRoutes = require('./userRoutes');
const siteRoutes = require('./siteRoutes');
const login = require ('./login');

router.use('/', siteRoutes);
router.use('/user', userRoutes);

module.exports = router;
