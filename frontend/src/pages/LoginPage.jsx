import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import useStores from '../hooks/useStores';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Alert,
} from '@mui/material';

const LoginPage = observer(() => {
  const { userStore } = useStores();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    userStore.login(username, password);

    if (userStore.user) {
      navigate('/dashboard'); // Перенаправление на панель управления
    }
  };

  return (
    <Container
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          width: '100%',
          maxWidth: 400,
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Авторизация
        </Typography>

        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
          onSubmit={(e) => e.preventDefault()}
        >
          <TextField
            label="Имя пользователя"
            variant="outlined"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Пароль"
            type="password"
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {userStore.error && <Alert severity="error">{userStore.error}</Alert>}

          <Button
            variant="contained"
            color="primary"
            onClick={handleLogin}
            size="large"
          >
            Войти
          </Button>
        </Box>
      </Paper>
    </Container>
  );
});

export default LoginPage;
