import { useState } from 'react';

export function useRSA() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [updateEmail, setUpdateEmail] = useState('');
  const [updatePassword, setUpdatePassword] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const [rsaDetails, setRsaDetails] = useState('');
  const [keyNumber, setKeyNumber] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch(`http://localhost:5068/api/User/registerWithKey/${keyNumber}`, {
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
      const response = await fetch(`http://localhost:5068/api/User/Login`, {
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
        name: updateName || undefined,
        email: updateEmail || undefined,
        password: updatePassword || undefined,
      };

      const response = await fetch(`http://localhost:5068/api/User/Update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'userId': userId,
        },
        body: JSON.stringify(requestBody),
      });
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
