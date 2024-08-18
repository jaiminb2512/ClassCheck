"use client"

import React, { useEffect, useState } from 'react';
import MonthSelection from '../_components/MonthSelection';
import GradeSelect from '../_components/GradeSelect';
import { useTheme } from '@emotion/react';
import moment from 'moment';
import GlobalApi from '../_services/GlobalApi';
import StatusList from './_components/StatusList';
import BarChartComponent from './_components/BarChartComponent';
import PieChartComponent from './_components/PieChartComponent';

const Dashboard = () => {
  const { setTheme } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState();
  const [selectedGrade, setSelectedGrade] = useState();
  const [attendanceList, setAttendanceList] = useState();
  const [totalPresentData, setTotalPresentData] = useState([])

  useEffect(() => {
    getStudentAttendance();
    TotalPresentCountByDay()
  }, [selectedMonth, selectedGrade]);

  const month = moment(selectedMonth).format('MM/YYYY');
  const getStudentAttendance = () => {
    GlobalApi.GetAttendance(selectedGrade, month).then(resp => {
      setAttendanceList(resp.data.result);
      console.log(attendanceList);
    }).catch(error => {
      console.error("Error fetching attendance data:", error);
    });
  }

  const TotalPresentCountByDay = () => {
    GlobalApi.TotalPresentCountByDay(month, selectedGrade).then(resp => {
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
