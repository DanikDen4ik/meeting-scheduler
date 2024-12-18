import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import useStores from '../hooks/useStores';
import NavBar from '../components/NavBar';
import { createBooking } from '../services/api';
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
} from '@mui/material';

// Форматирование даты
const formatDateTimeLocal = (date) => {
  return new Date(date).toISOString().slice(0, 16);
};

const BookingPage = observer(() => {
  const [title, setTitle] = useState('');
  const [startDateTime, setStartDateTime] = useState('');
  const [endDateTime, setEndDateTime] = useState('');
  const { scheduleStore, userStore } = useStores(); // Подключаем userStore

  const handleCreate = async () => {
    if (!title || !startDateTime || !endDateTime) {
      alert('Заполните все поля!');
      return;
    }

    const start = formatDateTimeLocal(startDateTime);
    const end = formatDateTimeLocal(endDateTime);

    if (new Date(start) >= new Date(end)) {
      alert('Дата и время начала должны быть раньше даты и времени окончания!');
      return;
    }

    try {
      const newBooking = await createBooking({
        title,
        start,
        end,
        createdBy: userStore.user?.username || 'Неизвестно', // Привязка к пользователю
      });

      scheduleStore.addBooking(newBooking);

      alert(`Встреча успешно создана!`);

      // Очистка полей
      setTitle('');
      setStartDateTime('');
      setEndDateTime('');
    } catch (error) {
      console.error('Ошибка при создании встречи:', error);
      alert('Ошибка при создании встречи!');
    }
  };

  return (
    <>
      <NavBar />
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // minHeight: 'calc(100vh - 64px)', // Учитываем высоту меню
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            width: '100%',
            maxWidth: 600,
            boxSizing: 'border-box',
          }}
        >
          <Typography variant="h4" gutterBottom align="center">
            Создание встречи
          </Typography>

          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <Typography variant="h6">Название встречи</Typography>
            <TextField
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <Typography variant="h6">Дата и время начала встречи</Typography>
            <TextField
              type="datetime-local"
              variant="outlined"
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
              required
            />

            <Typography variant="h6">Дата и время окончания встречи</Typography>
            <TextField
              type="datetime-local"
              variant="outlined"
              value={endDateTime}
              onChange={(e) => setEndDateTime(e.target.value)}
              required
            />

            <Button
              variant="contained"
              color="primary"
              onClick={handleCreate}
              size="large"
            >
              Создать встречу
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
});

export default BookingPage;
