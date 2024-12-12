import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Создание встречи
export const createBooking = async (booking) => {
  const response = await axios.post(`${API_URL}/bookings`, booking);
  return response.data;
};

// Обновление встречи
export const updateBooking = async (id, booking) => {
  const response = await axios.put(`${API_URL}/bookings/${id}`, booking);
  return response.data;
};

// Удаление встречи
export const deleteBooking = async (id) => {
  const response = await axios.delete(`${API_URL}/bookings/${id}`);
  return response.data;
};

// Получение всех встреч
export const fetchBookings = async () => {
  const response = await axios.get(`${API_URL}/bookings`);
  return response.data;
};
