import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your environment variables
});

export async function POST(req: NextRequest) {
  try {
    const { topic } = await req.json();

    const chatCompletion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: `You will be provided with either a "goal" or a "topic".
    
          If provided with a goal, return a structured JSON response outlining a step-by-step plan to achieve that goal in the following format:
          {
            "goal": "string",
            "steps": [
              {
                "step_number": number,
                "description": "string",
                "sub_steps": [
                  {
                    "sub_step_number": number,
                    "description": "string"
                  }
                ]
              }
            ],
            "estimated_time": "string", // Overall estimated time to achieve the goal
            "resources": ["string"] // Optional resources needed
          }
    
          If provided with a topic, return a structured JSON response with subtopics to learn about that topic in the following format:
          {
            "topic": "string",
            "subtopics": [
              {
                "subtopic": "string",
                "details": "string", // Brief explanation of the subtopic
                "recommended_resources": ["string"] // Optional resources for learning more
              }
            ],
            "learning_path": ["string"], // Suggested learning order for the subtopics
            "estimated_time_to_master": "string" // Approximate time to cover the topic
          }
    
          Please ensure the response strictly follows the JSON format and provide clear, concise steps or subtopics.
          
          Now, respond according to the input provided: "${topic}"`,
        },
      ],
    });

    const structuredResponse = chatCompletion.choices[0]?.message?.content;

    // Validate JSON response
    try {
      if (structuredResponse === null) {
        throw new Error('The response is null');
      }
      const jsonResponse = JSON.parse(structuredResponse);
      return NextResponse.json({ structuredResponse: jsonResponse });
    } catch (error) {
      return NextResponse.json(
        { error: 'The response is not a valid JSON structure', response: structuredResponse },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error generating response', msg: error }, { status: 500 });
  }
}