const router = require('express').Router();
const APIRoutes = require('./APIRoutes');
const siteRoutes = require('./siteRoutes');
const login = require ('./login');

router.use('/', siteRoutes);
router.use('/api', APIRoutes);
router.use('/login', login);



module.exports = router;
