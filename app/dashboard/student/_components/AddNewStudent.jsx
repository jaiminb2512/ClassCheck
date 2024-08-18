'use client';

import React, { useEffect, useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import GlobalApi from '@/app/_services/GlobalApi';
import CircularProgress from '@mui/material/CircularProgress';
import { useAlert } from '@/app/_context/AlertContext';

function AddNewStudent({ refreshData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [loader, setLoader] = useState(false);
    const [grades, setGrades] = useState([]);
    const { showAlert } = useAlert();

    const toggleModal = () => {
        setIsOpen(prev => !prev);
        reset();
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const GetAllGradeList = async () => {
        try {
            const resp = await GlobalApi.GetAllGrades();
            setGrades(resp.data);
        } catch (error) {
            console.error("Error fetching grades:", error);
        }
    };

    useEffect(() => {
        GetAllGradeList();
    }, []);

    const onSubmit = async (data) => {
        setLoader(true);
        if (!data.name || !data.grade || !data.contact || !data.address) {
            showAlert('Insufficient data. Please fill all fields.', 'warning');
            setLoader(false);
            return;
        }

        try {
            await GlobalApi.CreatNewStudent(data);
            toggleModal();
            reset();
            showAlert('New Student Added.', 'success');
            refreshData();
        } catch (error) {
            console.error("Error creating student:", error);
            showAlert('Failed to add student. Please try again.', 'error');
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="relative">
            <button onClick={toggleModal} className="btn btn-primary">+ Add new Student</button>

            {isOpen && (
                <div className="modal modal-open">
                    <div className="modal-box bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto relative min-h-[83%]">
                        <div className="flex justify-between items-center mb-4">
                            <div className='text-lg font-bold'>Add Student</div>
                            <button onClick={toggleModal} className='btn btn-ghost text-gray-500'>
                                <IoMdClose size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="w-full text-sm mt-1 p-2 border rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter name"
                                    {...register("name", { required: true })}
                                />
                                {errors.name && <span className="text-red-600 text-sm">This field is required</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="grade" className="block text-sm font-medium text-gray-700">Grade</label>
                                <select
                                    id="grade"
                                    className="block w-full mt-1 text-sm text-gray-700 p-2 border rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    {...register("grade", { required: true })}
                                >
                                    {grades.map((item) => (
                                        <option key={item.id} value={item.grade}>{item.grade}</option>
                                    ))}
                                </select>
                                {errors.grade && <span className="text-red-600 text-sm">This field is required</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="contact" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                <input
                                    type="tel"
                                    id="contact"
                                    className="w-full mt-1 p-2 text-sm border rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Phone no"
                                    {...register("contact", {
                                        required: true,
                                        pattern: {
                                            value: /^[0-9]{9,15}$/, 
                                            message: "Invalid phone number"
                                        }
                                    })}
                                />
                                {errors.contact && <span className="text-red-600 text-sm">{errors.contact.message}</span>}
                            </div>
                            <div className="mb-4">
                                <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                                <input
                                    type="text"
                                    id="address"
                                    className="w-full mt-1 p-2 text-sm border rounded-md border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter Address"
                                    {...register("address", { required: true })}
                                />
                                {errors.address && <span className="text-red-600 text-sm">This field is required</span>}
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button type="button" onClick={toggleModal} className='btn' variant="ghost">
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loader}
                                    className='btn btn-primary text-white'>
                                    {loader ? <CircularProgress size={24} /> : 'Save'}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="modal-backdrop bg-black bg-opacity-50" onClick={toggleModal}></div>
                </div>
            )}
        </div>
    );
}

export default AddNewStudent;
