import dbConnect from "../../../../../lib/mongodb";
import Goal from "../../../../../models/Goal";

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;

  if (req.method === "PATCH") {
    // Update progress or other fields of a goal
    const { progress } = req.body;

    try {
      const updatedGoal = await Goal.findByIdAndUpdate(
        id,
        { progress },
        { new: true } // Return the updated document
      );
      res.status(200).json(updatedGoal);
    } catch (error) {
      res.status(400).json({ success: false, error });
    }
  } else if (req.method === "GET") {
    // Fetch a specific goal by ID
    const goal = await Goal.findById(id);
    res.status(200).json(goal);
  }
}
