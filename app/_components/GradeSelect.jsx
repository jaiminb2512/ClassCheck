'use client';

import React, { useEffect, useState } from 'react';
import GlobalApi from '../_services/GlobalApi';
import { useDataContext } from '../_context/DataContext';

function GradeSelect() {
  const { selectedGrade, setSelectedGrade } = useDataContext();
  const [grades, setGrades] = useState([]);

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

  return (
    <div>
      <select
        id="grade"
        className="p-2 border rounded-lg bg-transparent"
        onChange={(e) => setSelectedGrade(e.target.value)}
        value={selectedGrade || ''}
      >
        {grades.map((item) => (
          <option key={item.id} value={item.grade}>{item.grade}</option>
        ))}
      </select>
    </div>
  );
}

export default GradeSelect;
