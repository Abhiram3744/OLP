import mongoose from 'mongoose';

const subtopicSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { _id: false }
);

const topicSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    completed: { type: Boolean, default: false },
    subtopics: {
      type: [subtopicSchema],
      default: [],
    },
  },
  { _id: false }
);

const subjectSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    subject: { type: String, required: true },
    completed: { type: Boolean, default: false },
    topics: {
      type: [topicSchema],
      default: [],
    },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    // Firebase UID - connects Firebase authentication
    // with this MongoDB user document
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    // We will NOT store the Firebase password here
    password: {
      type: String,
      select: false,
    },

    // Answers from the 6 onboarding pages
    onboardingData: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },

    // AI-generated roadmap
    roadmap: {
      type: [subjectSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);