import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';

const XSSExample = () => {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');

  useEffect(() => {
    // Función para obtener el parámetro de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const xssParam = urlParams.get('test');

    if (xssParam) {
      // Mostrar el valor del parámetro sin intentar ejecutarlo como script
      setOutputValue(xssParam);
    }
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setOutputValue(inputValue); // Aquí establecemos el valor del input como output
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ marginTop: '90px', display: 'flex', alignItems: 'center' }}>
        <TextField
          id="xss-input"
          label="Ingresa tu script XSS"
          variant="outlined"
          value={inputValue}
          onChange={handleInputChange}
          fullWidth
          sx={{ marginRight: '10px', borderRadius: '4px', flexGrow: 1 }}
        />
        <Button type="submit" variant="contained" color="primary" sx={{ height: '100%' }}>
          Probar XSS
        </Button>
      </Box>
      <Box sx={{ marginTop: '20px' }}>
        <Typography variant="body1" gutterBottom>
          Resultado del XSS:
        </Typography>
        {/* Utilizamos dangerouslySetInnerHTML para renderizar el HTML */}
        <Typography variant="body2" component="div" dangerouslySetInnerHTML={{ __html: outputValue }} />
      </Box>
    </form>
  );
};

export default XSSExample;
