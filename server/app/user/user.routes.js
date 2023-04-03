import express from 'express';

import { protect } from '../auth/middlewares/auth.middleware.js';

import { getUserProfile } from './user.controller.js';

const router = express.Router();

router.route('/profile').get(protect, getUserProfile);

export default router;
