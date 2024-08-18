"use client";

import React, { useContext } from 'react';
import { ThemeContext } from '../_context/ThemeContext'; 

const SelectTheme = () => {
  const { theme, changeTheme } = useContext(ThemeContext);

  const handleThemeChange = (e) => {
    changeTheme(e.target.value);
  };

  const themes = [
    "light",
    "dark",
    "autumn",
    "retro",
    "nord",
    "cupcake",
    "lemonade",
    "dim"
  ]

  return (
    <div className="m-4 p-4 flex items-center w-[fit-content] bg-gray-100 rounded-lg shadow-md">
      <label className="flex-shrink-0 text-sm font-medium text-gray-700 mr-4">Select Theme:</label>
      <select
        name="theme"
        value={theme}
        onChange={handleThemeChange}
        className="block p-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
      >
        {themes.map((theme) => (
          <option key={theme} value={theme}>{theme}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectTheme;
