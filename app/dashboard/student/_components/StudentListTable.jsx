import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { CiSearch, CiTrash } from 'react-icons/ci';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogContentText } from '@mui/material';
import { Button } from 'react-bootstrap';
import GlobalApi from '@/app/_services/GlobalApi';
import { useAlert } from '@/app/context/AlertContext';

const StudentListTable = ({ studentList, refreshData }) => {
  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [25, 50, 100];
  const [searchInput, setSearchInput] = useState("");
  const { showAlert } = useAlert();

  const CustomeButtons = ({ data }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    const deleteStudent = async (id) => {
      try {
        const resp = await GlobalApi.DeleteStudentRecord(id);
        if (resp.status === 200) {
          showAlert('Student Record deleted successfully.', 'success');
          refreshData();
        } else {
          showAlert('Failed to delete student record.', 'error');
        }
      } catch (error) {
        console.error("Error deleting student:", error);
        showAlert('Error deleting student record.', 'error');
      }
      setOpen(false);
    };

    return (
      <>
        <Button
          className="bg-red-500 hover:bg-red-700 text-white font-bold 
          py-2 px-2 rounded border border-red-500 hover:border-red-700"
          onClick={handleClickOpen}
        >
          <CiTrash className='w-6 h-4' />
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Delete Student Record"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete the record for {data.name}?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button variant="ghost" onClick={handleClose}>Cancel</Button>
            <Button className='btn-primary text-white' onClick={() => { deleteStudent(data.id) }} autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };

  const [colDefs, setColDefs] = useState([
    { field: "id", filter: true, width: 100 },
    { field: "name", filter: true, width: 200 },
    { field: "grade", filter: true, width: 100 },
    { field: "address", filter: true, width: 200 },
    { field: "contact", filter: true, width: 200 },
    { field: "action", cellRenderer: CustomeButtons, width: 100 },
  ]);

  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    const transformedData = studentList.map(student => ({
      ...student,
      contact: student.contact || student.number
    }));
    setRowData(transformedData);
  }, [studentList]);

  return (
    <div>
      <div
        className="ag-theme-quartz"
        style={{ height: 425 }}
      >
        <div className='p-2 rounded border shadow-sm flex align-center gap-5 my-2 max-w-sm'>
          <CiSearch className='w-5 h-5' />
          <input
            type="text"
            placeholder="Search..."
            className='outline-none w-full'
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          quickFilterText={searchInput}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </div>
  );
};

export default StudentListTable;
