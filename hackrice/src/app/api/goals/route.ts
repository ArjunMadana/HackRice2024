import { NextResponse } from "next/server";
import { connectToDatabase } from "@/app/lib/mongodb";
import { Environment } from "@react-three/drei";
import { ObjectId } from "mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Parse the request body
    const { topic, subtopics, learningPath, estimatedTime, environment } = body;

    // Validation: ensure all required fields are present
    if (!topic || !subtopics || !learningPath || !estimatedTime || !environment) {
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
      environment
    };

    // Insert the new goal into the collection
    const result = await db.collection("goals").insertOne(newGoal);

    // Fetch the newly created goal using the insertedId
    const savedGoal = await db.collection("goals").findOne({ _id: result.insertedId });

    // Return the newly created goal
    return NextResponse.json(savedGoal, { status: 201 });
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

export async function PATCH(req: Request) {
  try {
    const body = await req.json(); // Parse the request body
    const { _id, index, action } = body;

    // Validate _id
    if (!_id || !ObjectId.isValid(_id)) {
      return NextResponse.json({ error: "Invalid or missing _id" }, { status: 400 });
    }

    // Connect to the MongoDB database
    const { db } = await connectToDatabase();

    // Determine the update operation based on the action
    let updateOperation;
    if (action === 'increment') {
      updateOperation = { $inc: { progress: 12.5 }, $set: { [`subtopics.${index}.completed`]: true } };
    } else if (action === 'decrement') {
      updateOperation = { $inc: { progress: -12.5 }, $set: { [`subtopics.${index}.completed`]: false } };
    } else {
      return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }

    // Update the progress of the goal with the given _id
    const result = await db.collection("goals").updateOne(
      { _id: ObjectId.createFromHexString(_id) },
      updateOperation
    );

    // Check if the goal was found and updated
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    // Fetch the updated goal
    const updatedGoal = await db.collection("goals").findOne({ _id: ObjectId.createFromHexString(_id) });

    // Return the updated goal
    return NextResponse.json(updatedGoal, { status: 200 });
  } catch (error) {
    console.error("Error updating goal:", error);
    return NextResponse.json({ error: "Failed to update goal" }, { status: 500 });
  }
}