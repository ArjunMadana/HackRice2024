"use client";

import { useEffect, useState } from "react";

// Define the type of the data expected from the API
interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function TestPage() {
  const [data, setData] = useState<Post | null>(null); // Use the Post type

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1"
      );
      const result: Post = await response.json(); // Explicitly type the result as Post
      setData(result);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Test Page</h1>
      {data ? (
        <div>
          <h2>{data.title}</h2> {/* No more TypeScript error */}
          <p>{data.body}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
