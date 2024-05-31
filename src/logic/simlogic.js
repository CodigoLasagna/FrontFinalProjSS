// simlogic.js

const captureUserData = async (email, password) => {
  const url = 'http://localhost:5068/api/PhishUser/captureUserData';
  const data = {
    email: email,
    password: password
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error('Error en la solicitud de inicio de sesión.');
    }

    const responseData = await response.json();
    return responseData; // Puedes manipular o utilizar la respuesta según sea necesario
  } catch (error) {
    console.error('Error al intentar iniciar sesión:', error.message);
    throw error;
  }
};

const downloadUserData = async () => {
  const url = 'http://localhost:5068/api/PhishUser/downloadData';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al descargar los datos de usuario.');
    }

    const responseData = await response.json();
    return responseData; // Retorna los datos de usuarios obtenidos desde la API
  } catch (error) {
    console.error('Error al intentar descargar datos de usuario:', error.message);
    throw error;
  }
};

export { captureUserData, downloadUserData };
