"use client"

import GradeSelect from '@/app/_components/GradeSelect'
import MonthSelection from '@/app/_components/MonthSelection'
import GlobalApi from '@/app/_services/GlobalApi'
import moment from 'moment'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { FaSearch } from "react-icons/fa";

const Attendance = () => {
  
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();

  const onSearchHandler = () => {
    console.log(selectedGrade)
    const month = moment(selectedMonth).format('MM/YYYY')
    console.log(month)
    GlobalApi.GetAttendance(selectedGrade,month).then(resp => {
      console.log("Received attendance data:", resp.data);
    })
  }

  return (
    <div className='p-10'>
      <h2 className='text-2xl font-bold'> Attendance </h2>
      <div className='flex gap-5 p-3 border rounded-lg shadow-sm justify-between'>
        <div className='flex gap-5'>
          <div className='flex gap-3 items-center'>
            <label>Select Month:</label>
            <MonthSelection selectedMonth={setSelectedMonth}/>
          </div>
          <div className='flex gap-3 items-center'>
            <label>Select Grade:</label>
            <GradeSelect selectedGrade={setSelectedGrade}/>
          </div>
        </div>

        <Button 
          variant="ghost" 
          className='btn-primary font-bold'
          onClick={onSearchHandler}
        >
          <FaSearch className='size-5' />
          Search
        </Button>
      </div>
    </div>
  )
}

export default Attendance
