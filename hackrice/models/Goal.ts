import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema(
  {
    topic: {
      type: String,
      required: true,
    },
    subtopics: {
      type: [String], // Array of strings for simplicity
      required: true,
    },
    learningPath: {
      type: [String], // Array of learning steps or milestones
      required: true,
    },
    estimatedTime: {
      type: String,
      required: true,
    },
    progress: {
      type: Number, // Track progress as a percentage
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Goal || mongoose.model("Goal", GoalSchema);
