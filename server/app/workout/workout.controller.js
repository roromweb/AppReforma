import { prisma } from '../prisma.js';

import { calculateMinute } from './utils/calc-minute.js';

// @desc    Get new Workout
// @route   POST /api/v1/workouts
// @access  Private

export const createNewWorkout = async (req, res) => {
  try {
    const { name, exercisesIds } = req.body;

    const workout = await prisma.workout.create({
      data: {
        name,
        exercises: {
          connect: exercisesIds.map((id) => ({ id: +id })),
        },
      },
    });

    res.json(workout);
  } catch (e) {
    res.status(404).json({ message: 'Workout not found' });

    console.log(e.name, e.message);
  }
};

// @desc    Get workout
// @route   Get /api/v1/workouts/:id
// @access  Private
export const getWorkout = async (req, res) => {
  try {
    const workout = await prisma.workout.findUnique({
      where: { id: +req.params.id },
      include: { exercises: true },
    });

    const minutes = Math.ceil(workout.exercises * 3.7);

    res.json({ ...workout, minutes });
  } catch (e) {
    res.status(404).json({ message: 'Workout not found!' });
    console.log(e.name, e.message);
  }
};

// @desc    Get workout
// @route   Get /api/v1/workouts
// @access  Private
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await prisma.workout.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: { exercises: true },
    });
    res.json(workouts);
  } catch (e) {
    res.status(404);
    console.log(e.name, e.message);
  }
};

// @desc    Update workout
// @route   PUT /api/v1/workouts/:id
// @access  Private

export const updateWorkout = async (req, res) => {
  try {
    const { name, exercisesIds } = req.body;
    const workoutFind = await prisma.workout.findUnique({
      where: {
        id: +req.params.id,
      },
      data: {
        name,
        exercises: {
          set: exercisesIds.map((id) => ({ id: +id })),
        },
      },
    });
    const minutes = calculateMinute(workout.exercises.length);
    res.json({ ...workout, minutes });
  } catch (e) {
    res.status(404).json({ message: 'Workout not found' });
    console.log(e.name, e.message);
  }
};

// @desc    Delete workout
// @route   DEL /api/v1/workouts/:id
// @access  Private

export const deleteWorkout = async (req, res) => {
  try {
    const workoutFind = await prisma.workout.findUnique({
      where: {
        id: +req.params.id,
      },
    });
    if (!workoutFind) {
      res.json({
        message: ` Workout with id ${req.params.id} was already deleted or was not found`,
      });
    }

    await prisma.workout.delete({
      where: {
        id: +req.params.id,
      },
    });
    res.json({ message: `Workout with id ${req.params.id} deleted` });
  } catch (e) {
    console.log(e.name, e.message);
  }
};
// @desc    Delete workouts
// @route   DEL /api/v1/workouts/:id
// @access  Private

export const deleteWorkouts = async (req, res) => {
  try {
    const workoutsFind = await prisma.workout.findMany();
    if (!workoutsFind) {
      res.json({
        message: `No one Workouts, there is already empty`,
      });
    }

    await prisma.workout.deleteMany();
    res.json({ message: `All workouts deleted` });
  } catch (e) {
    console.log(e.name, e.message);
  }
};
