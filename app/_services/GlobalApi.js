const { default: axios } = require("axios");

const GetAllGrades = () => axios.get("/api/grade");
const CreatNewStudent = (data) => axios.post("/api/student", data)
const GetAllStudent = () => axios.get("/api/student");
const DeleteStudentRecord = (id) => axios.delete("/api/student?id="+ id);
const GetAttendance = (grade, month) => axios.get(`/api/attendance?grade=${grade}&month=${month}`)

export default {
    GetAllGrades,   
    CreatNewStudent,
    GetAllStudent,
    DeleteStudentRecord,
    GetAttendance
};
