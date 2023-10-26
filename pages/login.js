//Imported required libraries and Firebase Config

import React, { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../firebaseConfig';

//Login Function

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(null);


  const handleLoginOrSignup = async () => {
    try {
      // First, try to log in the user
      await signInWithEmailAndPassword(auth, email, password);
      // Login successful
      console.log('Logged in successfully');

      setLoginError(null); 

    } catch (loginError) {
      console.error('Login error:', loginError.code, loginError.message);
      setLoginError('Login failed. Trying to sign up...');
      // If login fails, try to sign up the user
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        // Signup successful
        console.log('Signed up successfully');
        setLoginError(null); 

      } catch (signupError) {
        console.error('Signup error:', signupError.code, signupError.message);
        setLoginError('Login and signup failed. Please check your information and try again.');
      }
    }
  };

  // Styles for centering and background color
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundImage: 'url("https://img.freepik.com/free-photo/vivid-blurred-colorful-wallpaper-background_58702-2460.jpg")', // Specify the URL of your image
    backgroundSize: 'cover', // Adjust the size to cover the container
    backgroundPosition: 'center', // Center the image
  };  

  const headerStyle = {
    fontFamily: 'Findel', 
    fontWeight: 'bold', 
    fontSize: '36px', 
    color: 'white'
  };

  const boxStyle = {
    padding: '20px', // Adjusted the padding as needed
    backgroundColor: 'white', // Background color of the box
    border: '1px solid #ccc', 
    borderRadius: '8px', 
    display: 'flex',
    flexDirection: 'column', 
    alignItems: 'center',
  };

  const inputStyle = {
    margin: '8px',
    padding: '8px',
    width: '200px',
  };

//Button theme
  
  const buttonStyle = {
    margin: '8px',
    padding: '12px 24px', // Increased padding for a larger button
    width: '200px',
    backgroundColor: '#5103D0',
    color: 'white',
    border: 'none',
    borderRadius: '4px', 
    cursor: 'pointer',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)', 
    transition: 'background-color 0.3s',
  
    // Hover state
    ':hover': {
      backgroundColor: '#5B17D9', 
    },
  };  

  return (
    <div style={containerStyle}>
      <h1 style={headerStyle}>GifAPP</h1>
      <div style={boxStyle}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button onClick={handleLoginOrSignup} style={buttonStyle}>
          Login or Sign Up
        </button>
      </div>
      {loginError && <p>{loginError}</p>}
    </div>
  );
};

export default Login;
