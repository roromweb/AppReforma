import { prisma } from '../prisma.js';

// @desc    Get user profile
// @route   POST /api/v1/users/profile
// @access  Private

export const getUserProfile = async (req, res) => {
  try {
    console.log(req);
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });
    res.json(user);
  } catch (e) {
    console.log(e.name, e.message);
  }
};
