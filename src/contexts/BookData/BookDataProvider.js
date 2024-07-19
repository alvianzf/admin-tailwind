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

    const value = {
        bookData,
        getBookData
    }

    return <BookingContext.Provider value={ value }>{ children }</BookingContext.Provider>
}

export { BookDataProvider }