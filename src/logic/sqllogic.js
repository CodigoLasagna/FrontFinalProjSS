import { useState } from 'react';

export function useSQL() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [updatePassword, setUpdatePassword] = useState('');
  const [userId, setUserId] = useState('');
  const [userIdS, setUserIdS] = useState('');
  const [error, setError] = useState('');
  const [rsaDetails, setRsaDetails] = useState('');
  const [keyNumber, setKeyNumber] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch(`http://localhost:5068/api/User/registerWithKeyNoProct/${keyNumber}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      const text = await response.text();
      setUserId(text);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:5068/api/User/LoginNoProct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      setRsaDetails(text);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

const handleUpdate = async () => {
  try {
    const requestBody = {
      Name: updateName || undefined,
      Email: updateEmail || undefined,
      Password: updatePassword || undefined,
      Id: userId
    };

    const response = await fetch(`http://localhost:5068/api/User/UpdateNoProct`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error('Failed to update user.');
    }

    const data = await response.json();
    setError('');
  } catch (error) {
    setError(error.message);
  }
};

  const handleGenerateKeys = async () => {
    try {
      const response = await fetch('http://localhost:5068/api/RSA/GenerateKeys', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      setRsaDetails(text);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    loginEmail,
    setLoginEmail,
    loginPassword,
    setLoginPassword,
    updateName,
    setUpdateName,
    updateEmail,
    setUpdateEmail,
    updatePassword,
    setUpdatePassword,
    userId,
    setUserId,
    userIdS,
    setUserIdS,
    error,
    rsaDetails,
    keyNumber,
    setKeyNumber,
    handleRegister,
    handleLogin,
    handleUpdate,
    handleGenerateKeys,
  };
}
