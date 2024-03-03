const { Router } = require('express');

const router = Router();

const authRouter = require('./api/auth');
const elementsRouter = require('./api/elements');
const pingRouter = require('./api/ping');

router.use('/auth', authRouter);
router.use('/elements', elementsRouter);
// Prevent onrender.com from sleep (with https://console.cron-job.org)
router.use('/ping', pingRouter);

module.exports = router;
