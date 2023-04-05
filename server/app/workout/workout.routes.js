import express from 'express';

import { protect } from '../auth/middlewares/auth.middleware.js';

import { getWorkoutLog } from './log/get-workout-log.controler.js';
import { updateCompletedWorkoutLog } from './log/update-workout-log.controller.js';
import { createNewWorkoutLog } from './log/workout-log.controller.js';
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

router.route('/log/:id').get(protect, getWorkoutLog).post(protect, createNewWorkoutLog);

router.route('/log/complete/:id').patch(protect, updateCompletedWorkoutLog);

export default router;
