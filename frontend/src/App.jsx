import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';
import SchedulePage from './pages/SchedulePage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CalendarPage from './pages/CalendarPage';
import { StoresProvider } from './context/StoresContext';
import NotFoundPage from './pages/NotFoundPage';
import ProtectedRoute from './components/ProtectedRoute';
import Footer from './components/Footer'; 

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <StoresProvider>
          <Router>
            <Routes>
              {/* Публичный маршрут */}
              <Route path="/" element={<LoginPage />} />
              {/* Защищённые маршруты */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/bookings/new" element={<BookingPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
              </Route>
              {/* Обработка неизвестных маршрутов */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </Router>
        </StoresProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
