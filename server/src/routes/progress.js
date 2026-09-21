import express from 'express';
import User from '../models/User.js';

const router = express.Router();

router.patch('/topic', async (req, res) => {
  try {
    const { firebaseUid, subjectId, topicId, completed } = req.body;

    if (!firebaseUid || !subjectId || !topicId) {
      return res.status(400).json({
        success: false,
        message: 'firebaseUid, subjectId and topicId are required',
      });
    }

    const user = await User.findOne({ firebaseUid });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    const subject = user.roadmap.find(
      (subject) => subject.id === subjectId
    );

    if (!subject) {
      return res.status(404).json({
        success: false,
        message: 'Subject not found',
      });
    }

    const topic = subject.topics.find(
      (topic) => topic.id === topicId
    );

    if (!topic) {
      return res.status(404).json({
        success: false,
        message: 'Topic not found',
      });
    }

    topic.completed = completed;

    await user.save();

    res.json({
      success: true,
      message: 'Topic progress updated',
      topic: {
        id: topic.id,
        name: topic.name,
        completed: topic.completed,
      },
    });

  } catch (error) {
    console.error('Topic completion error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to update topic progress',
    });
  }
});

export default router;