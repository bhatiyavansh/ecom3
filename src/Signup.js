import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save user details in local storage
    localStorage.setItem("user", JSON.stringify({ email, password }));

    alert("Account created successfully!");
    navigate('/'); // Redirect to login
  };

  return (
    <div className='bg-secondary vh-100 d-flex flex-column justify-content-center align-items-center'>
      <h1 className="text-white mb-4">Create an Account</h1>

      <div className='bg-white p-4 rounded w-25 shadow'>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="email">Email:</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter Email' 
              className='form-control rounded-0' 
              required 
            />
          </div>
          <div className='mb-3'>
            <label htmlFor="password">Password:</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter Password' 
              className='form-control rounded-0' 
              required 
            />
          </div>
          <button type="submit" className='btn btn-success w-100'>Sign Up</button>
          <p className="text-center mt-2">Already have an account?</p>
          
          <Link to="/" className="btn btn-outline-light w-100">Back to Login</Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;