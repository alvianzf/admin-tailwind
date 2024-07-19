import API from './api'

export const login = async (payload) => {
    const response = await API.login(payload);

    return response.data;
}