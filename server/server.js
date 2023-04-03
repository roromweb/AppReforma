import { faker } from '@faker-js/faker';
import { hash, verify } from 'argon2';
import colors from 'colors';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import path from 'path';

import authRoutes from './app/auth/auth.routes.js';
import { errorHandler, notFound } from './app/auth/middlewares/error.middleware.js';
import { prisma } from './app/prisma.js';
import toJson from './app/utils/index.js';

dotenv.config();
const app = express();

const PORT = process.env.PORT ?? 5000;

async function main() {
  try {
    if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

    app.use(morgan('dev'));
    app.use(cors());
    app.use(express.urlencoded({ extended: true }));

    app.use(express.json());
    const __dirname = path.resolve();
    app.use('/uploads', express.static(path.join(__dirname, '/uploads/')));

    try {
      app.use('/api/v1/auth', authRoutes);
    } catch (e) {
      console.log(e.message, 'эошибка здесь');
    }

    app.use(notFound);
    app.use(errorHandler);

    app.listen(
      PORT,
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green),
    );
  } catch (e) {
    console.log(e.name, e.message);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (err) => {
    console.log(err.message);
    await prisma.$disconnect();
  });