"use client";

import { useEffect, useState } from "react";

export default function TestPage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/demo");
      const result = await response.json();
      setData(result.message);
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1>Test Page</h1>
      <p>{data ? data : "Loading..."}</p>
    </div>
  );
}
