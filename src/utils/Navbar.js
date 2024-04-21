// Navbar.js
import React, { useState } from 'react';

const Navbar = ({userDetails}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-200 p-4">
      <div className="flex justify-between items-center">
      <img src="https://www.excelra.com/wp-content/uploads/2022/09/Excelra-Logo_1@3x.png" className="h-8" alt="Excelra Logo" />
        {/* <div className="text-white">Excelra</div> */}
        <div className="relative flex align-items-center">
        {userDetails.full_name} 
          <button
            className="text-black focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              {/* Add your user icon SVG here */}
              <path
                fillRule="evenodd"
                d="M9.5 2a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM17 16a1 1 0 11-2 0 5 5 0 00-10 0 1 1 0 11-2 0 7 7 0 1114 0z"
              />
            </svg>
          </button>
          
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-dark border rounded-lg shadow-lg z-10">
              {/* User details list */}
              <ul>
                <li className="px-4 py-2">{userDetails.full_name}</li>
                <li className="px-4 py-2">{userDetails.email}</li>
                <li className="px-4 py-2">{userDetails.role_name}</li>
                <li className="px-4 py-2">Logout</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
