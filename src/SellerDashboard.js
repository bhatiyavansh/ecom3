import React, { useState, useEffect } from 'react';

const SellerDashboard = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '', quantity: '', price: '', address: '', phone: '', duration: ''
    });

    useEffect(() => {
        const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
        setProducts(storedProducts);
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const addProduct = () => {
        if (!newProduct.name || !newProduct.quantity || !newProduct.price || !newProduct.address || !newProduct.phone || !newProduct.duration) {
            alert("Please fill in all fields");
            return;
        }

        const productWithId = { ...newProduct, id: Date.now(), bids: [] };
        const updatedProducts = [...products, productWithId];
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
        setNewProduct({ name: '', quantity: '', price: '', address: '', phone: '', duration: '' });
    };

    const styles = {
        container: {
            minHeight: '100vh',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px'
        },
        card: {
            backgroundColor: '#1e293b',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '20px',
            width: '80%',
            maxWidth: '600px',
            border: '1px solid #334155'
        },
        input: {
            width: '100%',
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #334155',
            marginBottom: '10px',
            backgroundColor: '#0f172a',
            color: '#ffffff'
        },
        button: {
            width: '100%',
            padding: '12px',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#0ea5e9',
            color: 'white',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
        },
        buttonHover: {
            backgroundColor: '#0284c7'
        }
    };

    return (
        <div style={styles.container}>
            <h1>Seller Dashboard</h1>
            <div style={styles.card}>
                <h2>Add New Product</h2>
                <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleInputChange} style={styles.input} />
                <input type="number" name="quantity" placeholder="Quantity" value={newProduct.quantity} onChange={handleInputChange} style={styles.input} />
                <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleInputChange} style={styles.input} />
                <input type="text" name="address" placeholder="Address" value={newProduct.address} onChange={handleInputChange} style={styles.input} />
                <input type="tel" name="phone" placeholder="Phone Number" value={newProduct.phone} onChange={handleInputChange} style={styles.input} />
                <input type="number" name="duration" placeholder="Bidding Duration (hours)" value={newProduct.duration} onChange={handleInputChange} style={styles.input} />
                <button 
                    style={styles.button} 
                    onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor} 
                    onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
                    onClick={addProduct}
                >
                    Add Product
                </button>
            </div>
            <h2>My Products</h2>
            {products.length === 0 ? <p>No products added yet.</p> : products.map((product) => (
                <div key={product.id} style={styles.card}>
                    <h3>{product.name}</h3>
                    <p><strong>Quantity:</strong> {product.quantity}</p>
                    <p><strong>Price:</strong> ${product.price}</p>
                    <p><strong>Address:</strong> {product.address}</p>
                    <p><strong>Phone:</strong> {product.phone}</p>
                    <p><strong>Bidding Ends In:</strong> {product.duration} hours</p>
                    <h4>Bids</h4>
                    {product.bids.length === 0 ? <p>No bids yet.</p> : (
                        product.bids.map((bid, index) => (
                            <p key={index}><strong>{bid.bidder}:</strong> ${bid.amount}</p>
                        ))
                    )}
                </div>
            ))}
        </div>
    );
};

export default SellerDashboard;
