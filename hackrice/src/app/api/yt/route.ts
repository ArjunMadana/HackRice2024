import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const YOUTUBE_API_KEY = process.env.YT_KEY; // Ensure this environment variable is set

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    // Fetch data from the YouTube Data API for the provided query
    const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        part: 'snippet',
        q: query.trim(),
        type: 'video',
        maxResults: 10, // Get the top 10 results
        key: YOUTUBE_API_KEY,
      },
    });

    // Randomly select one of the top 10 results
    if (response.status === 200 && Array.isArray(response.data.items) && response.data.items.length > 0) {
      const randomIndex = Math.floor(Math.random() * response.data.items.length);
      const videoId = response.data.items[randomIndex].id.videoId;
      const videoLink = `https://www.youtube.com/watch?v=${videoId}`;

      return new NextResponse(videoLink, { status: 200 }); // Return the video link as a plain string
    } else {
      return new NextResponse('', { status: 404 }); // Return an empty response if no results found
    }
  } catch (error) {
    console.error('Error fetching data from YouTube API:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
