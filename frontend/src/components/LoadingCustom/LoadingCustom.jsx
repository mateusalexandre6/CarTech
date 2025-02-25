import { Box, Typography } from '@mui/material';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [dots, setDots] = useState('');
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length === 3 ? '' : prev + '.'));
    }, 500);

    return () => clearInterval(interval); 
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
     
      <CarRepairIcon color='primary'  sx={{ fontSize: 150 }} />
      
      <Typography color='primary' variant="h1" sx={{ marginTop: 2 }}>
        {dots}
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
