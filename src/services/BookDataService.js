import API from './api';

export const getAll = async () => {
  try {
    const response = await API.bookData();
    return response.data;
  } catch (error) {
    console.error('Error fetching book data:', error);
    throw error;
  }
};

export const issueTicket = async (payload) => {
    try {
        const response = await API.issueTicket(payload);
        return response.data;
    } catch (err) {
        return err
    }
}
