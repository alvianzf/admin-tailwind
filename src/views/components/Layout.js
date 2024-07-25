import React, { useState } from 'react';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const { username, setIsAuthenticated } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/login');
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const isActive = (path) => location.pathname === path ? 'text-white bg-orange-500' : 'text-gray-300';

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 sticky top-0 z-50 flex items-center justify-between">
        <h1 className="text-xl flex items-center">
          Halo, <span className='text-orange-500 ml-2'>{username}</span>
        </h1>
        <button className="text-xs text-orange-400 hover:text-orange-800 ml-4" onClick={handleLogout}>Logout</button>
        <button className="text-white sm:hidden ml-4" onClick={handleSidebarToggle}>
          {isSidebarOpen ? (
            <i className="fas fa-times h-6 w-6"></i>
          ) : (
            <i className="fas fa-bars h-6 w-6"></i>
          )}
        </button>
      </header>
      <div className="flex flex-1">
        <aside className={`bg-gray-700 text-white w-64 sm:w-1/5 fixed top-0 left-0 h-full transition-transform transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} sm:relative sm:translate-x-0`}>
          <nav className="flex flex-col h-full justify-between">
            <ul className="flex flex-col justify-center flex-1">
              <li className={`mb-2 hover:bg-gray-800 flex items-center ${isActive('/')}`}>
                <a href="/" className="flex items-center px-6 py-4">
                  <i className="fas fa-tachometer-alt mr-2"></i>
                  Dashboard
                </a>
              </li>
              <li className={`mb-2 hover:bg-gray-800 flex items-center ${isActive('/book-data')}`}>
                <a href="/book-data" className="flex items-center px-6 py-4">
                  <i className="fas fa-book mr-2"></i>
                  Book Data
                </a>
              </li>
              <li className={`mb-2 hover:bg-gray-800 flex items-center ${isActive('/admin')}`}>
                <a href="/admin" className="flex items-center px-6 py-4">
                  <i className="fas fa-user-secret mr-2"></i>
                  Admin
                </a>
              </li>
              <li className={`mb-2 hover:bg-gray-800 flex items-center ${isActive('/user-list')}`}>
                <a href="/user-list" className="flex items-center px-6 py-4">
                  <i className="fas fa-user mr-2"></i>
                  User List
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-4 ml-64 sm:ml-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
