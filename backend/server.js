const express = require('express');
const cors = require('cors');

// Создание сервера
const app = express();
const PORT = 5000;

// Промежуточные обработчики
app.use(cors());
app.use(express.json());

// Массив встреч
let bookings = [];

// Получение всех встреч
app.get('/bookings', (req, res) => {
  res.json(bookings); // Отправляем массив встреч
});

// Создание новой встречи с логированием ошибок
app.post('/bookings', (req, res) => {
  const { title, start, end } = req.body;

  // Проверка на обязательные поля
  if (!title || !start || !end) {
    console.error('Ошибка: Заполнены не все поля.');
    return res.status(400).json({ error: 'Все поля обязательны!' });
  }

  try {
    const newBooking = {
      id: bookings.length + 1,
      title,
      start: new Date(start).toISOString(),
      end: new Date(end).toISOString(),
    };

    bookings.push(newBooking);
    console.log('Создана новая встреча:', newBooking);
    res.status(201).json(newBooking);
  } catch (error) {
    console.error('Ошибка при создании встречи:', error);
    res.status(500).json({ error: 'Ошибка на сервере!' });
  }
});

// Обновление встречи
app.put('/bookings/:id', (req, res) => {
  const bookingId = parseInt(req.params.id);
  const index = bookings.findIndex((b) => b.id === bookingId);

  if (index !== -1) {
    bookings[index] = { ...bookings[index], ...req.body };
    res.json(bookings[index]);
  } else {
    res.status(404).json({ message: 'Встреча не найдена' });
  }
});

// Удаление встречи
app.delete('/bookings/:id', (req, res) => {
  const id = parseInt(req.params.id);
  bookings = bookings.filter((b) => b.id !== id);
  res.status(204).send();
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер работает на http://localhost:${PORT}`);
});
