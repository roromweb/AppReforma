import { faker } from '@faker-js/faker';
import { hash, verify } from 'argon2';

import { prisma } from '../prisma.js';
import { toJson } from '../utils';
import { generateToken } from '../utils/generate-token.js';
import { userFields } from '../utils/user.utils.js';

// @desc    Auth user
// @route   POST /api/v1/auth/login
// @access  Public

export const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (email === '' && password === '') {
      return res.status(200).json({ message: 'Type your email and password!' });
    }
    if (password === '') {
      return res.status(200).json({ message: "You don't type a password! " });
    }

    const isValidPassword = await verify(user.password, password);
    if (user && isValidPassword) {
      const token = generateToken(user.id);
      res.json({ user, token });
    } else {
      res.status(401).json({ mesage: 'Email and password are not correct' });
      throw new Error('Email and password are not correct');
    }
  } catch (e) {
    console.log(e.name, e.mesage);
  }
};

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const isHaveUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isHaveUser) {
      res.status(400).json({ message: 'User already exists' });
      throw new Error('User already exists');
    }

    const user = await prisma.user.create({
      data: {
        name: faker.name.fullName(),
        email,
        password: await hash(password),
      },
    });

    const token = generateToken(user.id);

    res.json({ user, token });
  } catch (e) {
    console.log(e.mesage);
  }
};
