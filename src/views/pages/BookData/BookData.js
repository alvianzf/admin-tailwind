import React, { useEffect, useState, useContext, useCallback } from 'react';
import Layout from '../../components/Layout';
import BookDataTable from './BookDataTable';
import { BookingContext } from '../../../contexts/BookData/BookDataContext';
import { AuthContext } from '../../../contexts/auth/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function BookData() {
    const { bookData, getBookData } = useContext(BookingContext);
    const { isAuthenticated } = useContext(AuthContext);
    const [searchInput, setSearchInput] = useState('');
    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
        try {
            await getBookData();
        } catch (err) {
            console.error('Failed to fetch book data:', err);
        }
    }, []);

    useEffect(() => {
        document.title = "Data Booking";

        const checkAuth = () => {
            if (isAuthenticated) {
                fetchData();
            } else {
                navigate('/login');
            }
        }

        checkAuth();
    }, [isAuthenticated, fetchData, navigate]);

    return (
        <Layout>
            <ToastContainer />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Book Data</h1>
                <div className="flex items-center mb-4">
                    <input
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                        placeholder="Search"
                        className="p-2 border rounded w-1/5"
                    />
                    <i className='fa fa-search mr-2 ml-4'></i>
                </div>
                <div className="overflow-x-auto w-100">
                    {isAuthenticated ? (
                        <BookDataTable bookData={bookData} searchInput={searchInput} />
                    ) : (
                        <p>Please log in to view the book data.</p>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default BookData;
