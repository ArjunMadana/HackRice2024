import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import axios from 'axios';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your environment variables
});

async function fetchYouTubeLinks(query: string) {
  try {
    const baseURL = process.env.BASE_URL || 'http://localhost:3000'; // Use your deployed domain if necessary
    const res = await axios.get(`${baseURL}/api/yt`, {
      params: {
        query: query,
      },
    });

    // Check if the response is a plain string and the request was successful
    if (res.status === 200 && typeof res.data === 'string' && res.data.trim().length > 0) {
      return res.data; // Return the YouTube link as a plain string
    } else {
      return null; // Return null if no valid link was found
    }
  } catch (error) {
    console.error('Error fetching YouTube video:', error);
    return null;
  }
}

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
                "recommended_resources": ["string"] // Suggestions to seach on youtube for further information
              }
            ],
            "learning_path": ["string"], // Suggested learning order for the subtopics
            "estimated_time_to_master": "string" // Approximate time to cover the topic
          }
    
          Please ensure the response strictly follows the JSON format and provide clear, concise steps or subtopics. Do not include any additional comments. PROVIDE 8 SUBTOPICS.
          
          Now, respond according to the input provided: "${topic}"`,
        },
      ],
    });

    const structuredResponse = chatCompletion.choices[0]?.message?.content;
    //console.log(structuredResponse)

    // Validate JSON response
    try {
      if (structuredResponse === null) {
        throw new Error('The response is null');
      }
      const jsonResponse = JSON.parse(structuredResponse);
      
      for (const subtopic of jsonResponse.subtopics) {
        if (subtopic.recommended_resources && subtopic.recommended_resources.length > 0) {
          // Randomly select one of the recommended resources as the search term
          const randomResource = subtopic.recommended_resources[Math.floor(Math.random() * subtopic.recommended_resources.length)];
          
          // Fetch the YouTube link for the selected resource
          const link = await fetchYouTubeLinks(randomResource);
          //console.log("thinky" + link);

          // Add the link field to the subtopic
          subtopic.link = link ? link : null; 
        }
      }
      //console.log(jsonResponse)
      return NextResponse.json({ structuredResponse: jsonResponse });
    } catch (error) {
      return NextResponse.json(
        { error: 'The response is not a valid JSON structure', response: structuredResponse },
        { status: 422 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: 'Error generating response', msg: error }, { status: 500 });
  }
}