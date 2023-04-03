import express from 'express';

import { authUser, registerUser } from './auth.controller.js';
import { protect } from './middlewares/auth.middleware.js';

const router = express.Router();

router.route('/login').post(protect, authUser);
router.route('/register').post(registerUser);

export default router;
