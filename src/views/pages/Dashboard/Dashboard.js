import React, { useContext, useEffect } from 'react'
import Layout from '../../components/Layout'
import { AuthContext } from '../../../contexts/auth/AuthContext'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated])
  return (
    <Layout>
      <div>
        <h1>Dashboard</h1>
      </div>
    </Layout>
  )
}

export default Dashboard