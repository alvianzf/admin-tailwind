import API from './api';

export const allUsers =  async () => {
    const users = await API.getUsers();
    return users.data;
}

export const registerUser = async (payload) => {
    const register = await API.registerUser(payload)

    return register.data;
}

export const updateUser = async (id, payload) => {
    const updated = await API.updateUser(id, payload)

    return updated.data;
}

export const deleteUser = async (id) => {
    const deleted = await API.deleteUser(id)

    return deleted.data;
}