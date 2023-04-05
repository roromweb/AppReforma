import { prisma } from '../../prisma.js';

// @desc    Get new exerciseLog
// @route   POST /api/exercises/log/:exerciseId
// @access  Private

export const createNewExerciseLog = async (req, res) => {
  try {
    const { times } = req.body;
    const exerciseId = +req.params.id;

    const timesDefault = [];

    for (let i = 0; i < times; i++) {
      timesDefault.push({
        weight: 0,
        repeat: 0,
      });
    }

    const exerciseLog = await prisma.exerciseLog.create({
      data: {
        user: {
          connect: {
            id: req.user.id,
          },
        },
        exercise: {
          connect: {
            id: exerciseId,
          },
        },
        times: {
          createMany: {
            data: timesDefault,
          },
        },
      },
      include: {
        exercise: true,
        times: true,
      },
    });

    res.json(exerciseLog);
  } catch (e) {
    res.status(404);
    console.log(e.name, e.message);
  }
};
