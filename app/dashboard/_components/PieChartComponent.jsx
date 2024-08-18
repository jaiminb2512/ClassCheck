import { getUniqueRecord } from '@/app/_services/service';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { Pie, PieChart, ResponsiveContainer } from 'recharts'

const PieChartComponent = ({attendanceList}) => {

    const [data, setData] = useState([])

    useEffect(() => {
        if (attendanceList) {
            const total = getUniqueRecord(attendanceList);

            const today = moment().format('D');
            const presentPerc = (attendanceList.length / (total.length * Number(today))) * 100;
            setData([
                { name: 'Present', value: Number( presentPerc.toFixed(3)), fill: '#4c8cf8' },
                { name: 'Absent', value: Number(100 - presentPerc.toFixed(3)),  fill: '#1fe6d1' }
            ])
        }
    }, [attendanceList]);

    return (
        <div className='p-5 border rounded-lg shadow-sm'>

            <h2 className="my-2 font-bold text-lg text-center">Monthly Attendacnce</h2>
            <ResponsiveContainer width={'100%'} height={250}>
                <PieChart >
                    <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} label />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PieChartComponent
