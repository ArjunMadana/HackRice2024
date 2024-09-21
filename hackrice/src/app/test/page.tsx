"use client";

import { useEffect, useState } from "react";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function TestPage() {
  const [data, setData] = useState<Post | null>(null);

  useEffect(() => {
    async function fetchData() {
      // Call your server-side API route, which fetches data from the third-party API
      const response = await fetch("/api/third-party");
      
      const result: Post = await response.json();
      setData(result);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Test Page</h1>
      {data ? (
        <div>
          <h2>{data.title}</h2>
          <p>{data.body}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
