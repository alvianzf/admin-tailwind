import * as bookDataService from '../../services/BookDataService';
import { useEffect, useState } from "react";
import { BookingContext } from './BookDataContext';

const BookDataProvider = ({ children }) => {
    const [bookData, setBookData] = useState([]);

    useEffect(() => {
        getBookData();
    }, [])

    const getBookData = async () => {
        try {
            const data = await bookDataService.getAll();
            setBookData(data);
        } catch(err) {
            console.log(err)
        }
    }

    const deleteBooking = async (id) => {
        try {
            await bookDataService.deleteBooking(id);
            getBookData();
        } catch {

        }
    }

    const issueTicket = async (payload) => {
        try {
            await bookDataService.issueTicket()
            getBookData();
        } catch (error) {
            return error
        }
    }

    const value = {
        issueTicket,
        bookData,
        getBookData,
        deleteBooking
    }

    return <BookingContext.Provider value={ value }>{ children }</BookingContext.Provider>
}

export { BookDataProvider }