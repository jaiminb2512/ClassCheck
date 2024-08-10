  import { getDBConnection, STUDENT } from "@/utils/db";
  import { eq } from "drizzle-orm";
  import { NextResponse } from "next/server";

  const db = await getDBConnection();

  export async function POST(req) {
    try {
      const data = await req.json();
      console.log("Received data:", data);

      if (!data.name || !data.grade || !data.address || !data.contact) {
        return NextResponse.json(
          { error: "Missing required fields" },
          { status: 400 }
        );
      }

      const result = await db.insert(STUDENT).values({
        name: data.name,
        grade: data.grade,
        address: data.address,
        number: data.contact,
      });

      console.log("Insert result:", result);

      return NextResponse.json(result);
    } catch (error) {
      console.error("Error inserting student:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  export async function GET(req) {
    try {

      const result = await db.select().from(STUDENT);
      return NextResponse.json(result);

    } catch (error) {
      console.error("Error fetching students:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  export async function DELETE(req) {
    try {
      const searchParams = new URL(req.url).searchParams;
      const id = searchParams.get('id');

      const result = await db.delete(STUDENT).where(eq(STUDENT.id, id));

      return NextResponse.json({ success: true, result });
    } catch (error) {
      console.error("Error to delete student:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }