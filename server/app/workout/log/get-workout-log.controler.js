// @desc    Get  workoutLog
// @route   GET /api/v1/workouts/log/:id
// @access  Private
import { prisma } from '../../prisma.js';
import { calculateMinute } from '../utils/calc-minute.js';

export const getWorkoutLog = async (req, res) => {
  try {
    const workoutLog = await prisma.workoutLog.findUnique({
      where: { id: +req.params.id },
      include: {
        workout: {
          include: {
            exercises: true,
          },
        },
        exerciseLogs: {
          orderBy: {
            id: 'asc',
          },
          include: { exercise: true },
        },
      },
    });

    if (!workoutLog) {
      res.status(404);
      throw new Error('Workout Log not found');
    }
    res.json({
      ...workoutLog,
      minute: calculateMinute(workoutLog.workout.exercises.length),
    });
  } catch (e) {
    res.status(404).json({ message: 'Workout Log not found' });
    console.log(e.name, e.message);
  }
};
