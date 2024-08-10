"use client"

import React, { useEffect, useState } from 'react';
import AddNewStudent from './_components/AddNewStudent';
import GlobalApi from '@/app/_services/GlobalApi';
import StudentListTable from './_components/StudentListTable';

const Student = () => {
  const [studentList, setStudentList] = useState([]);

  const GetAllStudent = () => {
    GlobalApi.GetAllStudent().then(resp => {
      console.log("Received student data:", resp.data);
      setStudentList(resp.data);
    });
  };

  useEffect(() => {
    GetAllStudent();
  }, []);

  return (
    <div className='p-7'>
      <h2 className='font-bold text-2xl flex justify-between align-center'>
        Student
        <AddNewStudent fetchStudents={GetAllStudent} refreshData={GetAllStudent}/>
      </h2>
      <StudentListTable studentList={studentList} refreshData={GetAllStudent} />
    </div>
  );
};

export default Student;
