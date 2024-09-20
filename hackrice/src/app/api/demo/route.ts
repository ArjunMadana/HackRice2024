// src/app/api/demo/route.ts

import { NextResponse } from "next/server";

export async function GET() {
  const demoData = { message: "This is a demo backend response!" };
  return NextResponse.json(demoData);
}
