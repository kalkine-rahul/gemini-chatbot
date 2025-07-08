import { NextResponse } from "next/server";
import { messaging } from "@/lib/firebase-admin"; // Make sure this path matches your project structure

export async function POST(req) {
  try {
    const { token, title, body } = await req.json();

    if (!token || !title || !body) {
      return NextResponse.json(
        { success: false, error: "Missing token, title, or body." },
        { status: 400 }
      );
    }

    const message = {
      notification: {
        title,
        body,
      },
      token,
    };

    const response = await messaging.send(message);
    console.log("✅ Notification sent:", response);

    return NextResponse.json({ success: true, response });
  } catch (error) {
    console.error("❌ Error sending notification:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Unknown error" },
      { status: 500 }
    );
  }
}
