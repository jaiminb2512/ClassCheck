export const getUniqueRecord = (attendanceList) => {
    const existingUser = new Set();
    const uniqueRecord = [];

    attendanceList?.forEach(record => {
        if (!existingUser.has(record.studentId)) {
            existingUser.add(record.studentId);
            uniqueRecord.push(record);
        }
    });

    return uniqueRecord;
};