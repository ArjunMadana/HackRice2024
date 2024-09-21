import { NextResponse } from "next/server";
import { connectToDatabase } from "../../../../lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse the request body
    const { topic, subtopics, learningPath, estimatedTime } = body;

    // Validation: ensure all required fields are present
    if (!topic || !subtopics || !learningPath || !estimatedTime) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Connect to the MongoDB database
    const { db } = await connectToDatabase();
    const newGoal = {
      topic,
      subtopics,
      learningPath,
      estimatedTime,
      progress: 0, // Initialize progress to 0
      createdAt: new Date(),
    };

    // Insert the new goal into the collection
    const result = await db.collection("goals").insertOne(newGoal);

    // Return the newly created goal
    return NextResponse.json(result.ops[0], { status: 201 });
  } catch (error) {
    console.error("Error inserting goal:", error);
    return NextResponse.json({ error: "Failed to add goal" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const goals = await db.collection("goals").find({}).toArray();
    return NextResponse.json(goals, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch goals:", error);
    return NextResponse.json(
      { error: "Failed to fetch goals" },
      { status: 500 }
    );
  }
}
