// app/api/yt/route.ts
import { NextRequest, NextResponse } from 'next/server';
import youtubesearchapi from 'youtube-search-api';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  try {
    // Use the youtube-search-api package to search for videos
    const response = await youtubesearchapi.GetListByKeyword(query, false, 10, [{ type: 'video' }]);

    // Check if items were returned
    if (response.items && response.items.length > 0) {
      // Randomly select one of the top 10 results
      const randomIndex = Math.floor(Math.random() * response.items.length);
      const video = response.items[randomIndex];
      const videoLink = `https://www.youtube.com/watch?v=${video.id}`;

      return new NextResponse(videoLink, { status: 200 }); // Return the video link as a plain string
    } else {
      return new NextResponse('', { status: 404 }); // Return an empty response if no results found
    }
  } catch (error) {
    console.error('Error fetching data from youtube-search-api:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
