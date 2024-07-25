import { UserContext } from "./UserContext";
import * as UserServices from '../../services/userService';
import { useEffect, useState } from "react";

const UserProvider = ({ children }) => {
    const [users, setUsers] = useState(null)

    useEffect(() => {
        getAllUsers();
    }, [])

    const getAllUsers = async () => {
        const allUsers = await UserServices.allUsers();
        setUsers(allUsers);

        return allUsers.data;
    }

    const registerUser = async(username, password) => {
        try {
            await UserServices.registerUser(username, password)
            const updated = await getAllUsers();
            setUsers(updated.data)
            return true;
        } catch(err) {
            return err.data
        }
    }

    const deleteUser = async (id) => {
        try {
            await UserServices.deleteUser(id)
            const updated = await getAllUsers();
            setUsers(updated.data)
            return true
        } catch (err) {
            return false
        }
    }

    const updateUser = async (id, payload) => {
        try {
            await UserServices.updateUser(id, payload);
            const updated = await getAllUsers();
            setUsers(updated.data)
        } catch (error) {
            return error
        }
    }

    const value = {
        deleteUser,
        registerUser,
        updateUser,
        getAllUsers,
        users
    }

    return <UserContext.Provider value={value} >{ children }</UserContext.Provider>
}

export { UserProvider }
