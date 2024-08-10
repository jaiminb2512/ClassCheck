import { getDBConnection, GRADES } from "@/utils/db";
import { NextResponse } from "next/server";

const db = await getDBConnection();

export async function GET(req) {
  try {
    const result = await db.select().from(GRADES);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Database query failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
