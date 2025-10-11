import { NextResponse } from "next/server";
import clientPromise from "@/libs/mongodb";

export async function GET() {
  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    // Fetch the latest or single offer settings document
    const option = await db.collection("offer-settings").findOne({});
    return NextResponse.json(option);
  } catch (error) {
    console.error("❌ Error fetching offer settings:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch offer settings" },
      { status: 500 }
    );
  }
}
