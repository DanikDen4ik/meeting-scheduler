import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import useStores from '../hooks/useStores';
import { fetchBookings, updateBooking, deleteBooking } from '../services/api';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Modal,
  Box,
  TextField,
} from '@mui/material';
import NavBar from '../components/NavBar';

const formatDateTimeLocal = (date) => {
  const localDate = new Date(date);
  const offset = localDate.getTimezoneOffset() * 60000; // Смещение часового пояса
  return new Date(localDate.getTime() - offset).toISOString().slice(0, 16);
};

const SchedulePage = observer(() => {
  const { scheduleStore } = useStores();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editedBooking, setEditedBooking] = useState(null);

  // Загрузка встреч при монтировании компонента
  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchBookings();
        scheduleStore.setBookings(data);
      } catch (error) {
        console.error('Ошибка загрузки встреч:', error);
      }
    };
    loadBookings();
  }, [scheduleStore]);

  // Открытие модального окна
  const handleEdit = (booking) => {
    setEditedBooking({
      ...booking,
      start: formatDateTimeLocal(booking.start),
      end: formatDateTimeLocal(booking.end),
    });
    setEditModalOpen(true);
  };

  // Закрытие модального окна
  const handleClose = () => {
    setEditModalOpen(false);
    setEditedBooking(null);
  };

  // Обновление данных встречи
  const handleUpdate = async () => {
    try {
      const updatedBooking = await updateBooking(
        editedBooking.id,
        editedBooking
      );
      scheduleStore.updateBooking(updatedBooking);
      handleClose(); // Закрываем модальное окно
    } catch (error) {
      console.error('Ошибка при обновлении встречи:', error);
    }
  };

  // Удаление встречи
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Вы уверены, что хотите удалить встречу?');
    if (!confirmed) return;

    try {
      await deleteBooking(id);
      scheduleStore.removeBooking(id); // Обновляем состояние после удаления
          } catch (error) {
      console.error('Ошибка при удалении встречи:', error);
      alert('Ошибка при удалении встречи');
    }
  };

  return (
    <>
      <NavBar />
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Список встреч
        </Typography>

        {scheduleStore.bookings.length === 0 ? (
          <Typography align="center" color="text.secondary">
            Встречи отсутствуют
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {scheduleStore.bookings.map((booking) => (
              <Grid item xs={12} sm={6} md={4} key={booking.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{booking.title}</Typography>
                    <Typography>
                      <strong>Начало:</strong>{' '}
                      {new Date(booking.start).toLocaleString('ru-RU')}
                    </Typography>
                    <Typography>
                      <strong>Окончание:</strong>{' '}
                      {new Date(booking.end).toLocaleString('ru-RU')}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleEdit(booking)}
                    >
                      Редактировать
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(booking.id)}
                    >
                      Удалить
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        {/* Модальное окно редактирования */}
        <Modal open={editModalOpen} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Редактирование встречи
            </Typography>
            <TextField
              label="Название встречи"
              fullWidth
              margin="normal"
              value={editedBooking?.title || ''}
              onChange={(e) =>
                setEditedBooking({
                  ...editedBooking,
                  title: e.target.value,
                })
              }
            />
            <TextField
              label="Дата начала"
              type="datetime-local"
              fullWidth
              margin="normal"
              value={editedBooking?.start || ''}
              onChange={(e) =>
                setEditedBooking({
                  ...editedBooking,
                  start: e.target.value,
                })
              }
            />
            <TextField
              label="Дата окончания"
              type="datetime-local"
              fullWidth
              margin="normal"
              value={editedBooking?.end || ''}
              onChange={(e) =>
                setEditedBooking({
                  ...editedBooking,
                  end: e.target.value,
                })
              }
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button variant="outlined" onClick={handleClose}>
                Отмена
              </Button>
              <Button variant="contained" onClick={handleUpdate}>
                Сохранить
              </Button>
            </Box>
          </Box>
        </Modal>
      </Container>
    </>
  );
});

export default SchedulePage;
