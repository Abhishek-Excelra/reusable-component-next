// Navbar.js
import React, { useState, useRef, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Navbar = ({userDetails}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-200 p-4">
      <div className="flex justify-between items-center">
      <img src="https://www.excelra.com/wp-content/uploads/2022/09/Excelra-Logo_1@3x.png" className="h-8 ml-4" alt="Excelra Logo" />
        <div className="relative flex align-items-center">
          <div className="mr-4">{userDetails.full_name}</div>
          <button
            className="text-black focus:outline-none mr-2"
            onClick={toggleMenu}
          >
           <AccountCircleIcon />
          </button>
          
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-dark border rounded-lg shadow-lg z-10" ref={menuRef}>
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
