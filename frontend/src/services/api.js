import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// Получение встреч с сервера
export const fetchBookings = async () => {
  try {
    const response = await api.get('/bookings');
    return response.data; // Возвращаем массив встреч
  } catch (error) {
    console.error('Ошибка загрузки встреч:', error);
    throw error;
  }
};

// Создание новой встречи
export const createBooking = async (data) => {
  try {
    const response = await api.post('/bookings', data);
    return response.data;
  } catch (error) {
    console.error('Ошибка при создании встречи (API):', error);
    throw error;
  }
};

// Обновление встречи (PUT)
export const updateBooking = async (id, booking) => {
  const response = await axios.put(`/bookings/${id}`, booking);
  return response.data;
};

// Удаление встречи
export const deleteBooking = async (id) => {
  await api.delete(`/bookings/${id}`);
};
