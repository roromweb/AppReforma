import { prisma } from '../prisma.js';

// @desc    Get user profile
// @route   POST /api/v1/users/profile
// @access  Private

export const getUserProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    const countExerciseTimesCompleted = await prisma.exerciseLog.count({
      where: {
        userId: req.user.id,
        isCompleted: true,
      },
    });

    const kgs = await prisma.exerciseTime.aggregate({
      where: {
        exerciseLog: {
          userId: req.user.id,
        },
        isCompleted: true,
      },

      _sum: {
        weight: true,
      },
    });

    const workouts = await prisma.workoutLog.count({
      where: {
        userId: user.id,
        isCompleted: true,
      },
    });

    res.json({
      ...user,
      statistics: [
        {
          label: 'Minutes',
          value: Math.ceil(countExerciseTimesCompleted * 2.3) || 0,
        },
        {
          label: 'Workouts',
          value: workouts,
        },
        {
          label: 'Kgs',
          value: kgs._sum.weight || 0,
        },
      ],
    });
  } catch (e) {
    console.log(e.name, e.message);
  }
};
