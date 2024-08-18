import { getUniqueRecord } from '@/app/_services/service';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Card from '../_components/Card';
import { PiStudentFill } from 'react-icons/pi';
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import GlobalApi from '../../_services/GlobalApi';

const StatusList = ({ attendanceList }) => {
  const [totalStudent, setTotalStudent] = useState(0);
  const [presentPerc, setPresentPerc] = useState(0);

  useEffect(() => {
    if (attendanceList) {
      const total = getUniqueRecord(attendanceList);
      setTotalStudent(total.length);

      const today = moment().format('D');
      const presentPerc = (attendanceList.length / (total.length * Number(today))) * 100;
      setPresentPerc(presentPerc);
    }
  }, [attendanceList]);



  return (
    <div className='flex gap-5 w-full'>
    <Card className='flex-1 min-w-0' icon={<PiStudentFill />} title='Total Student' value={totalStudent} />
    <Card className='flex-1 min-w-0' icon={<FaArrowTrendUp />} title='Total Present' value={presentPerc.toFixed(1) + '%'} />
    <Card className='flex-1 min-w-0' icon={<FaArrowTrendDown />} title='Total Absent' value={(100 - presentPerc).toFixed(1) + '%'} />
  </div>
  );
};

export default StatusList;
