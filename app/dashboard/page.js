"use client"

import React, { useEffect, useState } from 'react';
import MonthSelection from '../_components/MonthSelection';
import GradeSelect from '../_components/GradeSelect';
import GlobalApi from '../_services/GlobalApi';
import StatusList from './_components/StatusList';
import BarChartComponent from './_components/BarChartComponent';
import PieChartComponent from './_components/PieChartComponent';
import { useDataContext } from '../_context/DataContext';

const Dashboard = () => {
  const { selectedMonth, setSelectedMonth } = useDataContext()
  const { selectedGrade, setSelectedGrade } = useDataContext()
  const [attendanceList, setAttendanceList] = useState();
  const [totalPresentData, setTotalPresentData] = useState([])

  useEffect(() => {
    getStudentAttendance();
    TotalPresentCountByDay()
  }, [selectedMonth, selectedGrade]);

  const getStudentAttendance = () => {
    GlobalApi.GetAttendance(selectedGrade, selectedMonth).then(resp => {
      setAttendanceList(resp.data.result);
    }).catch(error => {
      console.error("Error fetching attendance data:", error);
    });
  }

  const TotalPresentCountByDay = () => {
    GlobalApi.TotalPresentCountByDay(selectedMonth, selectedGrade).then(resp => {
      setTotalPresentData(resp.data)
    })
  }

  return (
    <div className='mx-10 mt-10'>
      <div className='flex items-center justify-between'>
        <h2 className='font-bold text-2xl'>Dashboard</h2>
        <div className='flex items-center justify-between gap-4'>
          <MonthSelection selectedMonth={setSelectedMonth} />
          <GradeSelect selectedGrade={setSelectedGrade} />
        </div>
      </div>
      <StatusList attendanceList={attendanceList} />

      <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
        <div className='md:col-span-2'>
          <BarChartComponent attendanceList={attendanceList} totalPresentData={totalPresentData} />
        </div>
        <div>
          <PieChartComponent attendanceList={attendanceList}/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
