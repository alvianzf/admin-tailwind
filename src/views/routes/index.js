import React from "react"
import Login from "../pages/Login"
import Admin from "../pages/Admin/Admin"
import UserList from "../pages/UserList/UserList"

// pages import

const Dashboard = React.lazy(() => import("../pages/Dashboard/Dashboard"))
const BookData = React.lazy(() => import("../pages/BookData/BookData"))
// routes

const routes = [
    {
        path: "/",
        element: <Dashboard/>
    },
    {
        path: "book-data",
        element: <BookData />
    },
    {
        path: "login",
        element: <Login />
    },
    {
        path: '/admin',
        element: <Admin />
    },
    {
        path: '/user-list',
        element: <UserList />
    }
]

export default routes
