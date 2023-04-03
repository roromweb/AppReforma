import { prisma } from '../prisma.js';

// @desc    Get new exercise
// @route   POST /api/v1/exercises
// @access  Private

export const createNewExercise = async (req, res) => {
  try {
    const { name, times, iconPath } = req.body;
    const exercise = await prisma.exercise.create({
      data: {
        name,
        times,
        iconPath,
      },
    });
    res.json(exercise);
  } catch (e) {
    res.status(404).json({ message: 'Exercise not found' });

    console.log(e.name, e.message);
  }
};

// @desc    Get exercises
// @route   Get /api/v1/exercise
// @access  Private
export const getExercises = async (req, res) => {
  try {
    const exercises = await prisma.exercise.findMany({
      include: {
        workouts: true,
      },
    });
    res.json(exercises);
  } catch (e) {
    res.status(404).json({ message: 'Exercises not found' });
    console.log(e.name, e.message);
  }
};

// @desc    Update exercise
// @route   PUT /api/v1/exercises/:id
// @access  Private

export const updateExercise = async (req, res) => {
  try {
    const { name, times, iconPath } = req.body;
    const exerciseFind = await prisma.exercise.findUnique({
      where: {
        id: +req.params.id,
      },
    });

    await prisma.exercise.update({
      where: {
        id: +req.params.id,
      },
      data: { name, times, iconPath },
    });

    res.json(exerciseFind);
  } catch (e) {
    res.status(404).json({ message: 'Exercise not found' });
    console.log(e.name, e.message);
  }
};

// @desc    Delete exercise
// @route   DEL /api/v1/exercises/:id
// @access  Private

export const deleteExercise = async (req, res) => {
  try {
    const exerciseFind = await prisma.exercise.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    if (!exerciseFind) {
      res.json({
        message: ` Exercise with id ${req.params.id} was already deleted or was not found`,
      });
    }

    await prisma.exercise.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.json({ message: `Exercise with id ${req.params.id} deleted` });
  } catch (e) {
    console.log(e.name, e.message);
  }
};

// @desc    Delete exercises
// @route   DEL /api/v1/exercises
// @access  Private

export const deleteExercises = async (req, res) => {
  try {
    const exercisesFind = await prisma.exercise.findMany();
    if (!exercisesFind) {
      res.json({
        message: `No one Exercises, there is already empty`,
      });
    }

    await prisma.exercise.deleteMany();
    res.json({ message: `All exercises deleted` });
  } catch (e) {
    console.log(e.name, e.message);
  }
};
