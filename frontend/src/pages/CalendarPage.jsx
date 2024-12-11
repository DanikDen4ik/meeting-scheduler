import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import NavBar from '../components/NavBar';
import { fetchBookings } from '../services/api';
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookings, setBookings] = useState([]);

  // Загрузка данных при монтировании компонента
  useEffect(() => {
    const loadBookings = async () => {
      try {
        const data = await fetchBookings();
        setBookings(data);
      } catch (error) {
        console.error('Ошибка загрузки встреч:', error);
      }
    };
    loadBookings();
  }, []);

  // Фильтрация встреч на выбранную дату
  const filteredBookings = bookings.filter(
    (booking) =>
      new Date(booking.start).toDateString() === selectedDate.toDateString()
  );

  return (
    <>
      <NavBar />
      <Container sx={{ marginTop: 8 }}>
        <Typography variant="h4" gutterBottom align="center">
          Календарь встреч
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
          />

          <Typography variant="h6" sx={{ marginTop: 4 }}>
            Встречи на {selectedDate.toLocaleDateString('ru-RU')}:
          </Typography>

          {filteredBookings.length === 0 ? (
            <Typography color="text.secondary">Нет запланированных встреч</Typography>
          ) : (
            <List>
              {filteredBookings.map((booking) => (
                <ListItem key={booking.id}>
                  <ListItemText
                    primary={booking.title}
                    secondary={`С ${new Date(
                      booking.start
                    ).toLocaleTimeString('ru-RU')} до ${new Date(
                      booking.end
                    ).toLocaleDateString('ru-RU')} ${new Date(
                      booking.end
                    ).toLocaleTimeString('ru-RU')}`}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Box>
      </Container>
    </>
  );
};

export default CalendarPage;
