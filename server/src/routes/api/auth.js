const express = require('express');

const ctrl = require('../../controllers');
const validate = require('../../validation');
const { authenticate } = require('../../middlewares');

const router = express.Router();

// Auth
router.post('/register', validate.users.registerSchema, ctrl.auth.register);
router.post('/login', validate.users.loginSchema, ctrl.auth.login);
router.post('/logout', authenticate, ctrl.auth.logout);
router.get('/refresh', authenticate, ctrl.auth.getUser);

// Refresh token
router.post('/refresh', ctrl.auth.refreshToken);

// Verify email
router.post('/verify', validate.users.verifySchema, ctrl.auth.verifyEmail);

module.exports = router;
