import { Router } from 'express';
import User from '../models/User.js';

const router = Router();

router.post('/sync', async (req, res, next) => {
  try {
    const { firebaseUid, email } = req.body;

    if (!firebaseUid || !email) {
      return res.status(400).json({
        message: 'Firebase UID and email are required.',
      });
    }

    // Check whether this Firebase user already exists in MongoDB
    let user = await User.findOne({ firebaseUid });

    // If user already exists, return it
    if (user) {
      return res.status(200).json({
        message: 'User already exists.',
        user: {
          id: user.id,
          firebaseUid: user.firebaseUid,
          email: user.email,
        },
      });
    }

    // Create new MongoDB user
    user = await User.create({
      firebaseUid,
      email: email.trim().toLowerCase(),
    });

    return res.status(201).json({
      message: 'User created successfully.',
      user: {
        id: user.id,
        firebaseUid: user.firebaseUid,
        email: user.email,
      },
    });
  } catch (error) {
    return next(error);
  }
});

export default router;