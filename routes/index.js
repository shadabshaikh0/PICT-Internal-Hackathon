const express = require("express");

const rootRoutes = require('./root');
const accountRoutes = require('./account.js');
const fetchRoutes = require('./fetch.js');
const teamRoutes = require('./team.js');


const validate_auth = require('../middleware/validate_auth.js')

const router = express.Router();

// Middleware function
router.use('/account', validate_auth);
router.use('/fetch', validate_auth);
router.use('/team', validate_auth);

router.use("/", rootRoutes)
router.use("/account", accountRoutes);
router.use("/fetch", fetchRoutes);
router.use("/team", teamRoutes);


module.exports = router;