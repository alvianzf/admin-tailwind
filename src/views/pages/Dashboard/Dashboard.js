import React, { useContext, useEffect } from 'react'
import Layout from '../../components/Layout'
import { AuthContext } from '../../../contexts/auth/AuthContext'
import { useNavigate } from 'react-router-dom';
import StatCard from '../../components/StatCard/StatCard';
import { BookingContext } from '../../../contexts/BookData/BookDataContext';

function Dashboard() {
  const { isAuthenticated } = useContext(AuthContext);
  const { bookData } = useContext(BookingContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, bookData])
  return (
    <Layout>
      <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <hr className='my-2' />

      <StatCard color='blue-500' text='Bookings' stat='50' />
      </div>
    </Layout>
  )
}

export default Dashboard