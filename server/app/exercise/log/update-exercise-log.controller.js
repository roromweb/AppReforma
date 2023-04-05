// @desc    Get  exercise log time
// @route   update /api/v1/exercises/log/time/:id
// @access  Private
import { prisma } from '../../prisma.js';

export const updateExerciseLogTime = async (req, res) => {
  try {
    const { weight, repeat, isCompleted } = req.body;

    const exerciseLogTime = await prisma.exerciseTime.update({
      where: {
        id: +req.params.id,
      },
      data: {
        weight,
        repeat,
        isCompleted,
      },
    });
    res.json(exerciseLogTime);
  } catch (e) {
    res.status(404);
    throw new Error('Exercise log time not found');
    console.log(e.name, e.message);
  }
};

// @desc   Update status of complete exercise log
// @route   patch /api/v1/exercises/log/complete/:id
// @access  Private

export const completeExerciseLog = async (req, res) => {
  const { isCompleted } = req.body;
  try {
    const exerciseLogTime = await prisma.exerciseLog.update({
      where: {
        id: +req.params.id,
      },
      data: {
        isCompleted,
      },
      include: { exercise: true, workoutLog: true },
    });
    res.json(exerciseLogTime);
  } catch (e) {
    res.status(404).json({ message: 'Exercise log time not found' });
    console.log(e.name, e.message);
  }
};
