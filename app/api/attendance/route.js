import { getDBConnection, GRADES, STUDENT } from "@/utils/db";
import { ATTENDANCE } from "@/utils/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req) {
    const db = await getDBConnection();

    const searchParams = req.nextUrl.searchParams;

    const grade = searchParams.get('grade');
    const month = searchParams.get('month');

    const result = await db.select({
        name: STUDENT.name,
        present: ATTENDANCE.present,
        day: ATTENDANCE.day,
        date: ATTENDANCE.date,
        grade: STUDENT.grade,
        studentId: STUDENT.id,
        attendanceId: ATTENDANCE.id
    }).from(STUDENT)
    .leftJoin(ATTENDANCE, eq(STUDENT.id, ATTENDANCE.studentId))
    .where(and(
        eq(STUDENT.grade, grade),
        eq(ATTENDANCE.date, month)
    ));

    return NextResponse.json({ result });
}
