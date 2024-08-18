import { getUniqueRecord } from '@/app/_services/service'
import React, { useEffect, useState } from 'react'
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, BarChart, ResponsiveContainer } from 'recharts'

const BarChartComponent = ({ attendanceList, totalPresentData }) => {
    const [data, setData] = useState([])

    useEffect(() => {
        formatAttendanceListCount()
    }, [attendanceList, totalPresentData])

    const formatAttendanceListCount = () => {
        const totalStudent = getUniqueRecord(attendanceList)

        const result = totalPresentData.map(item => ({
            day: item.day,
            presentCount: item.PresentCount,
            absentCount: Number(totalStudent?.length) - Number(item.PresentCount)
        }))

        setData(result)
    }

    return (
        <div className='p-5 border rounded-lg shadow-sm'>

            <h2 className="my-2 font-bold text-lg text-center">Attendacnce</h2>
            <ResponsiveContainer width={'100%'} height={250}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="presentCount" name='Total Present Student' fill="#8884d8" />
                    <Bar dataKey="absentCount" name='Total Absent Student' fill="#82ca9d" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default BarChartComponent
