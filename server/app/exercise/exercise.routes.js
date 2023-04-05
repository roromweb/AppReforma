import express from 'express';

import { protect } from '../auth/middlewares/auth.middleware.js';

import {
  createNewExercise,
  deleteExercise,
  deleteExercises,
  getExercises,
  updateExercise,
} from './exercise.controller.js';
import { createNewExerciseLog } from './log/exercise-log.controller.js';
import { getExerciseLog } from './log/get-exercise-log.controler.js';
import {
  completeExerciseLog,
  updateExerciseLogTime,
} from './log/update-exercise-log.controller.js';

const router = express.Router();

router
  .route('/')
  .post(protect, createNewExercise)
  .get(protect, getExercises)
  .delete(protect, deleteExercises);

router.route('/:id').put(protect, updateExercise).delete(protect, deleteExercise);

router.route('/log/:id').post(protect, createNewExerciseLog).get(protect, getExerciseLog);

router.route('/log/time/:id').put(protect, updateExerciseLogTime);
router.route('/log/complete/:id').patch(protect, completeExerciseLog);
export default router;
