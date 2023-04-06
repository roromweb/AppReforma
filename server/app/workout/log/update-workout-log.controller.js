// @desc   Update workout log completed
// @route   Patch /api/v1/workouts/log/completed/:id
// @access  Private
import { prisma } from '../../prisma.js';

export const updateCompletedWorkoutLog = async (req, res) => {
  try {
    const { weight, repeat, isCompleted } = req.body;

    const workoutLogTime = await prisma.workoutLog.update({
      where: {
        id: +req.params.id,
      },
      data: {
        isCompleted: true,
      },
    });
    res.json(workoutLogTime);
  } catch (e) {
    res.status(404).json({ message: 'Workout log time not found' });
    console.log(e.name, e.message);
  }
};
