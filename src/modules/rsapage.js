import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, Tabs, Tab, Paper } from '@mui/material';
import { useRSA } from './../logic/rsalogic';
import './rsapage.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 1 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function RSAPage() {
  const [tabIndex, setTabIndex] = useState(0);
  const [keyNumber, setKeyNumber] = useState('-1'); // Estado para almacenar el número de clave

  const {
    name, setName,
    email, setEmail,
    password, setPassword,
    loginEmail, setLoginEmail,
    loginPassword, setLoginPassword,
    updateName, setUpdateName,
    updateEmail, setUpdateEmail,
    updatePassword, setUpdatePassword,
    userId, error, rsaDetails,
    handleRegister, handleLogin, handleUpdate
  } = useRSA();

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleKeyNumberChange = (event) => {
    setKeyNumber(event.target.value);
  };

  const textFieldStyle = {
    '& .MuiInputBase-root': {
      color: 'white',
    },
    '& .MuiInputLabel-root': {
      color: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#1f1f1f',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
  };

  return (
    <Container className="content">
      <Paper elevation={3} className="paper">
        <Tabs value={tabIndex} onChange={handleTabChange} aria-label="RSA Tabs" className="tabs">
          <Tab label="Iniciar sesión" className="tab" />
          <Tab label="Registro" className="tab" />
          <Tab label="Actualizar" className="tab" />
        </Tabs>

        <TabPanel value={tabIndex} index={0}>
          <Box className="login-section" sx={{ marginBottom: 4 }}>
            <Typography variant="h4" gutterBottom className="Titles">Iniciar sesión</Typography>
            <TextField fullWidth label="Correo electrónico" type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} margin="normal" sx={textFieldStyle} />
            <TextField fullWidth label="Contraseña" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} margin="normal" sx={textFieldStyle} />
            <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>Iniciar sesión</Button>
            {rsaDetails && (
              <Typography variant="body1" className="rsa-details">{rsaDetails}</Typography>
            )}
            {error && <Typography variant="body1" color="error">Error: {error}</Typography>}
          </Box>
        </TabPanel>

        <TabPanel value={tabIndex} index={1}>
          <Box className="register-section" sx={{ marginBottom: 4 }}>
            <Typography variant="h4" gutterBottom className="Titles">Registro</Typography>
            <TextField fullWidth label="Nombre" value={name} onChange={(e) => setName(e.target.value)} margin="normal" sx={textFieldStyle} />
            <TextField fullWidth label="Correo electrónico" type="email" value={email} onChange={(e) => setEmail(e.target.value)} margin="normal" sx={textFieldStyle} />
            <TextField fullWidth label="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} margin="normal" sx={textFieldStyle} />
            <TextField fullWidth label="Número de clave" type="text" value={keyNumber} onChange={handleKeyNumberChange} margin="normal" sx={textFieldStyle} />
            <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>Registrarse</Button>
            {userId && <Typography variant="body1">{userId}</Typography>}
            {error && <Typography variant="body1" color="error">Error: {error}</Typography>}
          </Box>
        </TabPanel>

        <TabPanel value={tabIndex} index={2}>
          <Box className="update-section">
            <Typography variant="h4" gutterBottom className="Titles">Actualizar información de usuario</Typography>
            <TextField fullWidth label="Nuevo nombre" value={updateName} onChange={(e) => setUpdateName(e.target.value)} margin="normal" sx={textFieldStyle} />
            <TextField fullWidth label="Nuevo correo electrónico" type="email" value={updateEmail} onChange={(e) => setUpdateEmail(e.target.value)} margin="normal" sx={textFieldStyle} />
            <TextField fullWidth label="Nueva contraseña" type="password" value={updatePassword} onChange={(e) => setUpdatePassword(e.target.value)} margin="normal" sx={textFieldStyle} />
            <Button variant="contained" color="primary" fullWidth onClick={handleUpdate}>Actualizar</Button>
            {error && <Typography variant="body1" color="error">Error: {error}</Typography>}
          </Box>
        </TabPanel>
      </Paper>
    </Container>
  );
}

export default RSAPage;
