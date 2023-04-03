import { Exercise, ExerciseLog, ExerciseTime, User } from '../../../db/models';

// @desc    Get  exerciseLog
// @route   GET /api/exercises/log/:id
// @access  Private
import { addPrevValues } from './add-prev-values.util.js';

export const getExerciseLog = async (req, res) => {
  try {
    const exerciseLog = await Exercise.findOne({
      where: { id: +req.params.id },
    });
    if (!exerciseLog) {
      res.status(404);
      throw new Error('Exercise Log not found');
    }

    const prevExerciseLog = await ExerciseLog.findOne({
      where: {
        userId: 1,
        isCompleted: true,
      },
      order: [['createdAt', 'DESC']],
      include: [{ model: ExerciseTime }],
    });

    res.json({
      exerciseLog,
      times: addPrevValues(exerciseLog, prevExerciseLog),
    });
  } catch (e) {
    res.status(404);
    console.log(e.name, e.message);
  }
};
