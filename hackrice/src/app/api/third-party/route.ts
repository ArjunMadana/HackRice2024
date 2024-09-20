// src/app/api/third-party/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  // Replace with your third-party API URL
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  const data = await response.json();

  return NextResponse.json(data);
}
