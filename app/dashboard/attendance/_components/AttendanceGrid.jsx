import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import moment from 'moment';
import GlobalApi from '@/app/_services/GlobalApi';
import { useAlert } from '@/app/_context/AlertContext';
import { getUniqueRecord } from '@/app/_services/service';

function AttendanceGrid({ attendanceList, selectedMonth }) {

    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([{ field: 'name', filter: true }]);

    const pagination = true;
    const paginationPageSize = 10;
    const paginationPageSizeSelector = [25, 50, 100];
    const [searchInput, setSearchInput] = useState("");

    const daysInMonth = (year, month) => new Date(year, month, 0).getDate();
    const year = moment(selectedMonth, 'MM/YYYY').format('YYYY');
    const month = moment(selectedMonth, 'MM/YYYY').format('MM');
    const numberOfDays = daysInMonth(year, parseInt(month)); 
    const daysArray = Array.from({ length: numberOfDays }, (_, i) => i + 1);

    const { showAlert } = useAlert();

    useEffect(() => {
        if (attendanceList) {
            const userList = getUniqueRecord(attendanceList);
            setRowData(userList);

            const newColDefs = [{ field: 'name' }];
            daysArray.forEach((date) => {
                newColDefs.push({
                    field: date.toString(), width: 50, editable: true
                });

                userList.forEach(obj => {   
                    obj[date] = isPresent(obj.studentId, date);
                });
            });
            setColDefs(newColDefs);
        }

    }, [attendanceList, selectedMonth]);

    const isPresent = (studentId, day) => {
        const result = attendanceList.find(item => item.day === day && item.studentId === studentId);
        return result ? true : false;
    };

    // const getUniqueRecord = () => {
    //     const existingUser = new Set();
    //     const uniqueRecord = [];

    //     attendanceList?.forEach(record => {
    //         if (!existingUser.has(record.studentId)) {
    //             existingUser.add(record.studentId);
    //             uniqueRecord.push(record);
    //         }
    //     });

    //     return uniqueRecord;
    // };

    const onMarkAttendance = (day, studentId, presentStatus, name) => {
        console.log(selectedMonth)
        if (presentStatus) {
            const data = {
                day: day,
                studentId: studentId,
                present: true,
                date: selectedMonth
            };

            GlobalApi.MarkAttendance(data).then(resp => {
                showAlert(name + ' Attendance marked as present on ' + day + '/' + selectedMonth + '.', 'success');
            });
        } else if (!presentStatus) {
            const data = {
                day: day,
                date: selectedMonth,
                studentId: studentId
            };

            GlobalApi.MarkAbsent(data).then(resp => {
                showAlert(name + ' Attendance marked as absent on ' + day + '/' + selectedMonth + '.', 'warning');
            });
        }
    };

    return (
        <div>
            <div className="ag-theme-quartz bg-transparent" style={{ height: 370 }}>
                <AgGridReact
                    className='bg-transparent'
                    rowData={rowData}
                    columnDefs={colDefs}
                    onCellValueChanged={(e) => onMarkAttendance(e.colDef.field, e.data.studentId, e.newValue, e.data.name)}
                    onCellClicked={(e) => console.log(e)}
                    quickFilterText={searchInput}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                />
            </div>
        </div>
    );
}

export default AttendanceGrid;
