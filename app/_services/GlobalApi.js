const { default: axios } = require("axios");

const GetAllGrades = () => axios.get("/api/grade");
const CreateNewStudent = (data) => axios.post("/api/student", data);
const GetAllStudent = () => axios.get("/api/student");
const DeleteStudentRecord = (id) => axios.delete(`/api/student?id=${id}`);
const GetAttendance = (grade, month) => axios.get(`/api/attendance?grade=${grade}&month=${month}`);
const MarkAttendance = (data) => axios.post('/api/attendance', data);
const MarkAbsent = (data) => axios.delete(`/api/attendance`, { data: data });
const TotalPresentCountByDay = (date, grade) => axios.get(`/api/dashboard?date=${date}&grade=${grade}`); // Changed 'month' to 'date' for consistency

export default {
  GetAllGrades,
  CreateNewStudent,
  GetAllStudent,
  DeleteStudentRecord,
  GetAttendance,
  MarkAttendance,
  MarkAbsent,
  TotalPresentCountByDay
};
