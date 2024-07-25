import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import StatCard from '../../components/StatCard/StatCard';
import { AuthContext } from '../../../contexts/auth/AuthContext';
import { BookingContext } from '../../../contexts/BookData/BookDataContext';
import { formatNominal } from '../../../utils/formatNumber';

function Dashboard() {
  const { isAuthenticated } = useContext(AuthContext);
  const { bookData } = useContext(BookingContext);
  const navigate = useNavigate();
  const [numberOfBookings, setNumberOfBookings] = useState(0);
  const [totalNominal, setTotalNominal] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      setNumberOfBookings(bookData.length);
      calculateTotalNominal();
    }
  }, [isAuthenticated, bookData, navigate]);

  const calculateTotalNominal = () => {
    const total = bookData.reduce((sum, item) => {
      return item.payment_status ? sum + parseFloat(item.nominal) : sum;
    }, 0);

    setTotalNominal(total);
  };

  return (
    <Layout>
      <div>
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <hr className='my-2' />
        <div className='flex flex-wrap gap-4'>
          <StatCard color='blue-500' text='Bookings' stat={numberOfBookings} size="9xl" />
          <StatCard color='green-500' text='Latest Booking Code' stat={bookData.length > 0 ? bookData[0].bookingCode : 'N/A'} size="2xl" />
          <StatCard color='yellow-500' text='Total Nominal' stat={formatNominal(totalNominal)} size="2xl" />
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
