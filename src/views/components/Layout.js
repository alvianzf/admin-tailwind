import React from 'react';
import { AuthContext } from '../../contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const { username, setIsAuthenticated } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false)
    navigate('/login')
  }


  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-800 text-white p-4 sticky top-0 z-50">
        <h1 className="text-xl">Halo,{" "}<span className='text-orange-500'>{ username }</span> <button className='text-xs ml-10 text-orange-400 hover:text-orange-800' onClick={() => handleLogout()}>Logout</button></h1>
      </header>
      <div className="flex flex-1">
        <aside className="bg-gray-700 text-white w-16 sm:w-1/5">
          <nav>
            <ul className="hidden sm:block">
              <li className="mb-2 hover:bg-gray-800 hover:cursor-pointer flex items-center">
                <a href="/" className="flex items-center hover:text-blue-500 px-6 pt-6">
                  Dashboard
                  <i className="fas fa-tachometer-alt ml-2"></i>
                </a>
              </li>
              <li className="mb-2 hover:bg-gray-800 hover:cursor-pointer flex items-center">
                <a href="/book-data" className="flex items-center hover:text-blue-500 px-6 pt-4">
                  Book Data
                  <i className="fas fa-book ml-2"></i>
                </a>
              </li>
              <li className="mb-2 hover:bg-gray-800 hover:cursor-pointer flex items-center">
                <a href="/admin" className="flex items-center hover:text-blue-500 px-6 pt-4">
                  Admin
                  <i className="fas fa-user-secret ml-2"></i>
                </a>
              </li>
              <li className="mb-2 hover:bg-gray-800 hover:cursor-pointer flex items-center">
                <a href="/user-list" className="flex items-center hover:text-blue-500 px-6 pt-4">
                  User List
                  <i className="fas fa-user ml-2"></i>
                </a>
              </li>
            </ul>
            <ul className="sm:hidden">
              <li className="mb-2 hover:bg-gray-800 hover:cursor-pointer flex items-center px-6 pt-6">
                <a href="/" className="flex items-center hover:text-blue-500">
                  <i className="fas fa-tachometer-alt ml-2"></i>
                </a>
              </li>
              <li className="mb-2 hover:bg-gray-800 hover:cursor-pointer flex items-center px-6 pt-4">
                <a href="/book-data" className="flex items-center hover:text-blue-500">
                  <i className="fas fa-book ml-2"></i>
                </a>
              </li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
