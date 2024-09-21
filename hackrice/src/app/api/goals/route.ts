import dbConnect from "../../../../lib/mongodb";
import Goal from "../../../../models/Goal";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    try {
      const { topic, subtopics, learningPath, estimatedTime } = req.body;
      const newGoal = new Goal({
        topic,
        subtopics,
        learningPath,
        estimatedTime,
        progress: 0, // Initialize progress at 0
      });
      await newGoal.save();
      res.status(201).json(newGoal); // Return the saved goal
    } catch (error) {
      res.status(500).json({ error: "Failed to save the goal" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
