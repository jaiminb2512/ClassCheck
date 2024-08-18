import { getDBConnection, GRADES, STUDENT } from "@/utils/db";
import { ATTENDANCE } from "@/utils/schema";
import { and, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { db } from "@/utils/db"; // Ensure you import or initialize the db object correctly

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const date = searchParams.get('date'); // Expected format: mm/yyyy
  const grade = searchParams.get('grade');

  if (!date || !grade) {
    return NextResponse.json({ error: 'Missing date or grade parameter' }, { status: 400 });
  }

  // Convert the date format to 'MM/YYYY%' for the SQL query
  const formattedDate = `${date}%`;

  const db = await getDBConnection();

  try {
    const result = await db
      .select({
        day: ATTENDANCE.day,
        PresentCount: sql`COUNT(${ATTENDANCE.studentId})`
      })
      .from(ATTENDANCE)
      .innerJoin(STUDENT, eq(ATTENDANCE.studentId, STUDENT.id))
      .where(and(
        eq(STUDENT.grade, grade),
        sql`${ATTENDANCE.date} LIKE ${formattedDate}`,
        eq(ATTENDANCE.present, true)
      ))
      .groupBy(ATTENDANCE.day)
      .orderBy(ATTENDANCE.day)
      .execute(); // Use .execute() instead of .limit(7) for counting rows by day

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    return NextResponse.json({ "error": error.message }, { status: 500 });
  }
}
