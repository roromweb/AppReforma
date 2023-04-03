import express from 'express';

import { protect } from '../auth/middlewares/auth.middleware.js';

import {
  createNewWorkout,
  deleteWorkout,
  deleteWorkouts,
  getWorkout,
  getWorkouts,
  updateWorkout,
} from './workout.controller.js';

const router = express.Router();

router
  .route('/')
  .post(protect, createNewWorkout)
  .get(protect, getWorkouts)
  .delete(protect, deleteWorkouts);
router
  .route('/:id')
  .get(protect, getWorkout)
  .put(protect, updateWorkout)
  .delete(protect, deleteWorkout);

export default router;
