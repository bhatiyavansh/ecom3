import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      alert("Login Successful!");
      navigate('/dashboard');  
    } else {
      alert("Invalid Email or Password!");
    }
  };

  return (
    <div className='bg-primary vh-100 d-flex flex-column justify-content-center align-items-center'>
      <h1 className="text-black mb-4">Enter details to visit our e-commerce website</h1>

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
          <button type="submit" className='btn btn-success w-100'>Log in</button>
          <p className="text-center mt-2">You agree to our terms and policies</p>

          <Link to="/signup" className="btn btn-outline-primary w-100">Create account</Link>
        </form>
      </div>
    </div>
  );
}

export default Login;