import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useStores from '../hooks/useStores';

const NavBar = () => {
  const navigate = useNavigate();
  const { userStore } = useStores();

  // Обработка выхода
  const handleLogout = () => {
    userStore.logout(); // Очистка состояния пользователя
    navigate('/'); // Перенаправление на страницу входа
  };

  return (
    <AppBar position="static" sx={{ marginBottom: 4, background: '#00796b' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 'bold' }}
        >
          Панель управления
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/dashboard">
            Главная
          </Button>
          <Button color="inherit" component={Link} to="/schedule">
            Расписание
          </Button>
          <Button color="inherit" component={Link} to="/bookings/new">
            Создать встречу
          </Button>
          <Button color="inherit" component={Link} to="/calendar">
            Календарь
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Выйти
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
