import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Sell() {
  const [product, setProduct] = useState({ name: '', price: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product listed:", product);
    alert("Product listed successfully!");
  };

  return (
    <div className='bg-light vh-100 d-flex flex-column justify-content-center align-items-center'>
      <h1 className="text-primary mb-4">Sell Your Product</h1>

      <div className='bg-white p-4 rounded w-50 shadow'>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label>Product Name:</label>
            <input 
              type="text" 
              className='form-control' 
              placeholder='Enter product name' 
              value={product.name}
              onChange={(e) => setProduct({...product, name: e.target.value})} 
              required 
            />
          </div>
          <div className='mb-3'>
            <label>Price:</label>
            <input 
              type="number" 
              className='form-control' 
              placeholder='Enter price' 
              value={product.price}
              onChange={(e) => setProduct({...product, price: e.target.value})} 
              required 
            />
          </div>
          <button type="submit" className='btn btn-success w-100'>List Product</button>
        </form>

        <Link to="/" className="btn btn-outline-primary w-100 mt-3">Back to Home</Link>
      </div>
    </div>
  );
}

export default Sell;