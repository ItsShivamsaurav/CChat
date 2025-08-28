import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function CircularIndeterminate() {
  return (
       <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#1f1c2c',
        color: '#ffffff',
        textAlign: 'center',
        gap: 3,
      }}
    >
      <CircularProgress color="inherit" />
      <h2 className="text-2xl font-semibold text-white">
        🚧 Page is Under Construction
      </h2>
    </Box>
  );
}
