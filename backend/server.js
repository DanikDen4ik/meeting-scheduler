const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

let bookings = [];

app.use(cors());
app.use(express.json());

// Получение всех встреч
app.get('/bookings', (req, res) => {
  res.json(bookings);
});

// Создание встречи
app.post('/bookings', (req, res) => {
  const { title, start, end, createdBy } = req.body;
  const newBooking = {
    id: bookings.length + 1,
    title,
    start,
    end,
    createdBy: createdBy || 'Неизвестно',
  };
  bookings.push(newBooking);
  res.json(newBooking);
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
  const bookingId = parseInt(req.params.id);
  bookings = bookings.filter((b) => b.id !== bookingId);
  res.json({ message: 'Встреча удалена' });
});

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));
