import React from 'react';
import { observer } from 'mobx-react-lite';
import useStores from '../hooks/useStores';
import NavBar from '../components/NavBar';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
} from '@mui/material';

const DashboardPage = observer(() => {
  const { userStore } = useStores();

  const sections = [
    {
      title: 'Расписание',
      path: '/schedule',
      description: 'Просмотр и управление встречами',
    },
    {
      title: 'Создать встречу',
      path: '/bookings/new',
      description: 'Создание новой встречи',
    },
    {
      title: 'Календарь',
      path: '/calendar',
      description: 'Просмотр встреч в календаре',
    },
  ];

  return (
    <>
      <NavBar />
      <Container
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Добро пожаловать, {userStore.user?.username || 'гость'}!
        </Typography>
        <Grid container spacing={3}>
          {sections.map((section) => (
            <Grid item xs={12} sm={6} md={4} key={section.title}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{section.title}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {section.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    component="a"
                    href={section.path}
                  >
                    Перейти
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
});

export default DashboardPage;
