import React from 'react';
import { BookDataProvider } from './BookData/BookDataProvider';
import { AuthProvider } from './auth/AuthProvider';
import { UserProvider } from './Users/UserProvider';

const AppProviders = ({ children }) => {
    return (
        <AuthProvider>
            <UserProvider>
                <BookDataProvider>{ children }</BookDataProvider>
            </UserProvider>
        </AuthProvider>
    )
}

export default AppProviders