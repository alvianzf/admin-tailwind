import React, { useEffect, useState } from 'react';
import Logo from '../../../assets/favicon.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../../../contexts/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login"
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      toast.error('Username tidak boleh kosong');
      return;
    }

    if (!password) {
      toast.error('Password tidak boleh kosong');
      return;
    }

    try {
      const data = await login(username, password);
      toast.success(data.error);

      console.log({ data });
      navigate('/');
    } catch (err) {
      console.log({ err });
      toast.warning("Username atau password salah");
    }
  };

  const handleUsername = (value) => {
    setUsername(value);
  };

  const handlePassword = (value) => {
    setPassword(value);
  };

  return (
    <>
      <ToastContainer />
      <div className='h-screen flex flex-col md:flex-row justify-center space-around items-center bg-gray-900'>
        <div className='bg-white flex flex-col space-around py-4 px-10 rounded-lg justify-center items-center'>
          <img src={Logo} alt='logo' className='w-1/3 -mt-12' />
          <form className='flex flex-col justify-center items-center my-5' onSubmit={handleSubmit}>
            <strong className='text-s'>Login</strong>
            <input
              type='text'
              placeholder='Username'
              className='p-2 rounded-lg text-s mt-4'
              onChange={(e) => handleUsername(e.target.value)}
              value={username}
            />
            <input
              type='password'
              placeholder='Password'
              className='p-2 rounded-lg text-s mt-1'
              onChange={(e) => handlePassword(e.target.value)}
              value={password}
            />
            <button
              className='bg-blue-500 text-white py-2 px-6 rounded-lg text-s mt-4'
              type='submit'
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
