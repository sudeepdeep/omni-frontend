import React, { useState } from "react";

interface Option {
  value: string | number;
  name: string;
}

interface SelectProps {
  onChange?: any;
  title?: string;
  options?: Option[];
  value?: any;
  sx: any;
  id: any;
  selectedDropdownId: any;
  setSelectedDropdownId: any;
}

const MultiSelect: React.FC<SelectProps> = ({
  id,
  onChange = () => {},
  title = "",
  options = [],
  value = [],
  sx = "",
  selectedDropdownId,
  setSelectedDropdownId,
}) => {
  const isOpen = selectedDropdownId === id;

  const handleToggle = () => {
    setSelectedDropdownId(isOpen ? null : id);
  };

  const handleCheckboxChange = (selectedValue: string | number) => {
    let updatedValues;
    if (value.includes(selectedValue)) {
      updatedValues = value.filter((v: any) => v !== selectedValue);
    } else {
      updatedValues = [...value, selectedValue];
    }
    onChange(updatedValues);
  };

  return (
    <div className="relative w-full">
      <label className="block text-sm font-medium leading-6 text-white">
        {title}
      </label>
      <div
        className="w-full border border-gray-300 p-2 rounded-md text-black cursor-pointer"
        onClick={handleToggle}
      >
        {value.length > 0
          ? options
              .filter((option) => value.includes(option.value))
              .map((option) => option.name)
              .join(", ")
          : "Select options"}
      </div>

      {isOpen && (
        <div className="absolute mt-1 w-full bg-[#b8b8b9] border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto z-10">
          {options.map((option, index) => (
            <label
              key={index}
              className="flex items-center space-x-2 p-2 hover:bg-gray-700 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={value.includes(option.value)}
                onChange={() => handleCheckboxChange(option.value)}
                className="form-checkbox h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <span className="text-white">{option.name}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
