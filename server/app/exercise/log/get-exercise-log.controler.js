// @desc    Get  exerciseLog
// @route   GET /api/v1/exercises/log/:id
// @access  Private
import { prisma } from '../../prisma.js';

import { addPrevValues } from './add-prev-values.util.js';

export const getExerciseLog = async (req, res) => {
  try {
    const exerciseLog = await prisma.exerciseLog.findUnique({
      where: { id: +req.params.id },
      include: {
        exercise: true,
        times: {
          orderBy: {
            id: 'asc',
          },
        },
      },
    });

    if (!exerciseLog) {
      res.status(404);
      throw new Error('Exercise Log not found');
    }

    const prevExerciseLog = await prisma.exerciseLog.findFirst({
      where: {
        exerciseId: exerciseLog.exerciseId,
        userId: req.user.id,
        isCompleted: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        times: true,
      },
    });
    console.log(prevExerciseLog);
    res.json({
      ...exerciseLog,
      times: addPrevValues(exerciseLog, prevExerciseLog),
    });
  } catch (e) {
    res.status(404).json({ message: 'ExerciseLog not found' });
    console.log(e.name, e.message);
  }
};
