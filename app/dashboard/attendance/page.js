"use client";

import GradeSelect from '@/app/_components/GradeSelect';
import MonthSelection from '@/app/_components/MonthSelection';
import GlobalApi from '@/app/_services/GlobalApi';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FaSearch } from "react-icons/fa";
import AttendanceGrid from './_components/AttendanceGrid';
import { useDataContext } from '../../_context/DataContext';

const Attendance = () => {
  const { selectedMonth, setSelectedMonth } = useDataContext()
  const { selectedGrade, setSelectedGrade } = useDataContext()
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    if (selectedMonth && selectedGrade) {
      onSearchHandler();
    }
  }, [selectedMonth, selectedGrade]);
  
  const onSearchHandler = () => {
    GlobalApi.GetAttendance(selectedGrade, selectedMonth).then(resp => {
      setAttendanceList(resp.data.result);
      // console.log(attendanceList)
    }).catch(error => {
      console.error('Error fetching attendance data:', error);
    });
  };


  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'>Attendance</h2>
      <div className='flex gap-5 p-3 my-2 border rounded-lg shadow-sm justify-between'>
        <div className='flex gap-5'>
          <div className='flex gap-3 items-center'>
            <label>Select Month:</label>
            <MonthSelection selectedMonth={setSelectedMonth} />
          </div>
          <div className='flex gap-3 items-center'>
            <label>Select Grade:</label>
            <GradeSelect selectedGrade={setSelectedGrade} />
          </div>
        </div>

        <Button
          variant="primary"
          className='font-bold d-flex align-items-center'
          onClick={onSearchHandler}
        >
          <FaSearch className='me-2' />
          Search
        </Button>
      </div>

      <AttendanceGrid attendanceList={attendanceList} selectedMonth={selectedMonth} />
    </div>
  );
};

export default Attendance;
