import React from "react"
// pages import

const Dashboard = React.lazy(() => import("../pages/Dashboard/Dashboard"))
const BookData = React.lazy(() => import("../pages/BookData/BookData"))
const Admin = React.lazy(() => import("../pages/Admin/Admin"))
const UserList = React.lazy(() => import("../pages/UserList/UserList"))
const Login = React.lazy(() => import("../pages/Login"))
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
