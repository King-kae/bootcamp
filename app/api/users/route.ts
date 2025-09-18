import { NextResponse } from "next/server";
import clientPromise from "@/libs/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // get user data from request body
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);

    const result = await db.collection("users").insertOne(body);

    return NextResponse.json({ success: true, id: result.insertedId });
  } catch (error) {
    console.error("❌ Error saving user:", error);
    return NextResponse.json({ success: false, error: "Failed to save user" }, { status: 500 });
  }
}
