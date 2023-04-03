import jwt from 'jsonwebtoken';

import { prisma } from '../../prisma.js';

export const protect = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      const userFound = await prisma.user.findUnique({
        where: {
          id: decoded.userId,
        },
      });

      if (userFound) {
        req.user = userFound;
        next();
      } else {
        res.status(401).json({ message: 'Not authorized , token failed' });
        throw new Error('Not authorized , token failed');
      }
    }

    if (!token) {
      res.status(401).json({ message: 'Not authorized, you do not have a token' });
      throw new Error('Not authorized, you do not have a token');
    }
  } catch (e) {
    console.log(e.name, e.message);
  }
};
