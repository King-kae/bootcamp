import { NextResponse } from "next/server";
import axios from "axios";
import clientPromise from "@/libs/mongodb";
import { ObjectId } from "mongodb";

const PAYSTACK_SECRET_KEY = process.env.TEST_PAYSTACK_SECRET_KEY as string;

export async function POST(req: Request) {
  try {
    const { userId, ref } = await req.json();

    if (!ref || !userId) {
      return NextResponse.json(
        { error: "Missing transaction reference or userId" },
        { status: 400 }
      );
    }

    // Verify with Paystack
    const verifyRes = await axios.get(
      `https://api.paystack.co/transaction/verify/${ref}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    const verification = verifyRes.data;

    if (verification.status && verification.data.status === "success") {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB);

      // update by _id
      const result = await db.collection("users").updateOne(
        { _id: new ObjectId(userId) },
        { $set: { paid: true } }
      );

      return NextResponse.json(
        {
          success: true,
          message: "Payment verified and user updated",
          data: {
            paystack: verification.data,
            dbResult: result,
          },
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Payment not successful" },
        { status: 400 }
      );
    }
  } catch (err: any) {
    console.error("❌ Error verifying payment:", err.response?.data || err.message);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}
