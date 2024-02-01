import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const SettingsPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh', // Ajusta la altura según tus necesidades
      }}
    >
      <Typography variant="h3" fontWeight="bold" fontStyle="italic">
        Configuracion!
      </Typography>
    </Box>
  );
};

export default SettingsPage;