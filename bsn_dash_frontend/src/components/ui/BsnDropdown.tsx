// Dropdown.js

import React, { useState } from 'react';
import Error from './Error';

export type TBsnDropdownItem = { label: string, value: string | number }
type TBsnDropdownProps = {
  items: TBsnDropdownItem[],
  onClick: (item: TBsnDropdownItem) => void,
  disabled?: boolean,
  defaultValue?: string | number,
  placeholder?: string
  className?: string
  label?: string
  errorMessage?: string
  variant?: 'transparent'| "block"
}

const BsnDropdown = ({ items, onClick, disabled, defaultValue, errorMessage,placeholder='Select from below',className,label,variant }: TBsnDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TBsnDropdownItem | null>(null);

  // Initialize selected item based on defaultValue
  useState(() => {
    if (defaultValue !== undefined && defaultValue !== null) {
      const defaultItem = items.find(item => item.value === defaultValue);
      if (defaultItem) {
        setSelectedItem(defaultItem);
      }
    }
  });

  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleItemClick = (item: TBsnDropdownItem) => {
    setSelectedItem(item);
    toggleDropdown();
    if (onClick) {
      onClick(item);
    }
  };

  let defaultVariant = 'text-white bg-blue-700 hover:bg-blue-800';
  switch (variant) {
    case 'transparent':
      defaultVariant = 'text-black border'
      break;

    default:
      defaultVariant = 'text-white bg-blue-700 hover:bg-blue-800'
      break;
  }


  return (
    <div className={`relative inline-block text-left w-full ${className}`}>
      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
        {label}
      </label>
      <button onClick={toggleDropdown} disabled={disabled} className={`mt-1 w-full  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center ${defaultVariant} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {selectedItem ? selectedItem.label : placeholder}
        <svg className={`w-2.5 h-2.5 ml-auto ${isOpen ? 'rtl:rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
          <path d="M1 1l4 4 4-4"/>
        </svg>
      </button>
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2  w-full bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            {items.map((item, index) => (
              <li key={index} className={selectedItem?.value === item.value ? 'bg-sky-100' : ''}>
                <button onClick={() => handleItemClick(item)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white w-full text-left">
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Error message={errorMessage} />
    </div>
  );
};

export default BsnDropdown;
