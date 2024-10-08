import { getDBConnection, STUDENT } from "@/utils/db";
import { ATTENDANCE } from "@/utils/schema";
import { eq, and, like, isNull, or } from "drizzle-orm";
import { NextResponse } from "next/server";

const db = await getDBConnection();

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams;
    const grade = searchParams.get('grade');
    const month = searchParams.get('month');

    try {
        const result = await db.select({
            studentId: STUDENT.id,
            name: STUDENT.name,
            present: ATTENDANCE.present,
            day: ATTENDANCE.day,
            date: ATTENDANCE.date,
            grade: STUDENT.grade,
            attendanceId: ATTENDANCE.id
        })
            .from(STUDENT)
            .leftJoin(ATTENDANCE, eq(STUDENT.id, ATTENDANCE.studentId))
            .where(
                and(
                    eq(STUDENT.grade, grade),
                    or(
                        eq(ATTENDANCE.date, month),
                        isNull(ATTENDANCE.date)
                    )
                )
            )
            .orderBy(STUDENT.id);

        return NextResponse.json({ result });

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}


export async function POST(req) {
    const data = await req.json();

    try {
        const result = await db.insert(ATTENDANCE).values({
            studentId: data.studentId,
            day: data.day,
            date: data.date,
            present: data.present,
            grade: data.grade
        });
        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}

export async function DELETE(req) {
    try {
        const data = await req.json();

        const result = await db.delete(ATTENDANCE)
            .where(
                and(
                    eq(ATTENDANCE.studentId, data.studentId),
                    eq(ATTENDANCE.day, data.day),
                    eq(ATTENDANCE.date, data.date)
                )
            );

        return NextResponse.json({ success: true, data: result });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
    }
}
