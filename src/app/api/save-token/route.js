// app/api/save-token/route.js
import db from "@/lib/db"; // your MongoDB or Firestore setup
import { NextResponse } from "next/server";

export async function POST(req) {
  const { token } = await req.json();
  if (!token) {
    return NextResponse.json({ error: "Token missing" }, { status: 400 });
  }

  await db.collection("tokens").updateOne(
    { token },
    { $set: { token, createdAt: new Date() } },
    { upsert: true }
  );

  return NextResponse.json({ success: true });
}
