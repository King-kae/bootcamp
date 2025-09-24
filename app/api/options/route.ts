import { NextResponse } from "next/server";
import clientPromise from "@/libs/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    const options = await db.collection("Options").find({}).toArray();

    return NextResponse.json({ success: true, options });
  } catch (error) {
    console.error("❌ Error fetching options:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch options" }, { status: 500 });
  }
}