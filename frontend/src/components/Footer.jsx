import React from 'react';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#00796b',
        color: 'white',
        padding: 2,
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        textAlign: 'center',
        boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} Система управления расписанием и бронированием встреч
      </Typography>
    </Box>
  );
};

export default Footer;
