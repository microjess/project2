const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require("./homeRoutes");
const landingRoute = require('./landingPageRoutes')

router.use("/", homeRoutes);
router.use('/api', apiRoutes);
router.use('/landingpage', landingRoute);

module.exports = router;