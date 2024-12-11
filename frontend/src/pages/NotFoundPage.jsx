import React from 'react';
import { Typography, Button, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <Typography variant="h3" gutterBottom>
        404 - Страница не найдена
      </Typography>
      <Typography variant="h6" color="text.secondary" gutterBottom>
        К сожалению, страница, которую вы ищете, не существует.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/dashboard"
        sx={{ marginTop: 3 }}
      >
        На главную
      </Button>
    </Container>
  );
};

export default NotFoundPage;
