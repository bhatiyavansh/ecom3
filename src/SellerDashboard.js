import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Make sure to install axios: npm install axios

const SellerDashboard = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '', 
        quantity: '', 
        price: '', 
        description: '',
        auctionDuration: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // API base URL - update this to match your backend
    const API_URL = 'http://localhost:5000/api';

    // Fetch seller's products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Get the auth token from localStorage
                const token = localStorage.getItem('authToken');
                
                const response = await axios.get(`${API_URL}/products/seller`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to load products. Please try again later.');
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const addProduct = async () => {
        // Form validation
        if (!newProduct.name || !newProduct.quantity || !newProduct.price || !newProduct.auctionDuration) {
            alert("Please fill in all required fields");
            return;
        }

        try {
            // Get the auth token from localStorage
            const token = localStorage.getItem('authToken');
            
            // Calculate auction end time
            const startTime = new Date();
            const endTime = new Date();
            endTime.setHours(endTime.getHours() + parseInt(newProduct.auctionDuration));
            
            // Prepare data for backend
            const productData = {
                name: newProduct.name,
                description: newProduct.description || '',
                quantity: parseInt(newProduct.quantity),
                price: parseFloat(newProduct.price),
                auction: {
                    startTime,
                    endTime,
                    status: 'ONGOING'
                }
            };
            
            // Send product data to backend
            const response = await axios.post(`${API_URL}/products`, productData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            
            // Update local state with the new product from the server
            setProducts([...products, response.data]);
            
            // Clear the form
            setNewProduct({ 
                name: '', 
                quantity: '', 
                price: '', 
                description: '',
                auctionDuration: ''
            });
        } catch (err) {
            console.error('Error adding product:', err);
            alert('Failed to add product. Please try again.');
        }
    };

    // Helper function to calculate time remaining
    const calculateTimeRemaining = (endTimeString) => {
        const endTime = new Date(endTimeString);
        const now = new Date();
        
        if (now > endTime) return "Auction ended";
        
        const diffMs = endTime - now;
        const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
        const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        
        return `${diffHrs} hrs ${diffMins} mins`;
    };

    // Function to reject a bid - moved inside component
    const rejectBid = async (productId, bidId) => {
        try {
            const token = localStorage.getItem('authToken');
            
            await axios.patch(`${API_URL}/bids/${bidId}/reject`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            // Refresh products after rejection
            const response = await axios.get(`${API_URL}/products/seller`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            setProducts(response.data);
        } catch (err) {
            console.error('Error rejecting bid:', err);
            alert('Failed to reject bid. Please try again.');
        }
    };

    // Function to handle selection of a bidder
    const acceptBid = async (productId, bidId) => {
        try {
            const token = localStorage.getItem('authToken');
            
            await axios.patch(`${API_URL}/bids/${bidId}/accept`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            // Refresh products after selection
            const response = await axios.get(`${API_URL}/products/seller`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            setProducts(response.data);
        } catch (err) {
            console.error('Error accepting bid:', err);
            alert('Failed to accept bid. Please try again.');
        }
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
        },
        statusMessage: {
            padding: '10px',
            borderRadius: '6px',
            marginBottom: '20px',
            width: '80%',
            maxWidth: '600px',
            textAlign: 'center'
        },
        error: {
            backgroundColor: '#ef4444',
            color: 'white'
        },
        loading: {
            backgroundColor: '#3b82f6',
            color: 'white'
        }
    };

    return (
        <div style={styles.container}>
            <h1>Seller Dashboard</h1>
            
            {/* Error handling */}
            {error && <div style={{...styles.statusMessage, ...styles.error}}>{error}</div>}
            {loading && <div style={{...styles.statusMessage, ...styles.loading}}>Loading products...</div>}
            
            <div style={styles.card}>
                <h2>Add New Product</h2>
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Product Name *" 
                    value={newProduct.name} 
                    onChange={handleInputChange} 
                    style={styles.input} 
                />
                <textarea 
                    name="description" 
                    placeholder="Description (optional)" 
                    value={newProduct.description} 
                    onChange={handleInputChange} 
                    style={styles.input} 
                />
                <input 
                    type="number" 
                    name="quantity" 
                    placeholder="Quantity *" 
                    value={newProduct.quantity} 
                    onChange={handleInputChange} 
                    style={styles.input} 
                />
                <input 
                    type="number" 
                    name="price" 
                    placeholder="Starting Price *" 
                    value={newProduct.price} 
                    onChange={handleInputChange} 
                    style={styles.input} 
                />
                <input 
                    type="number" 
                    name="auctionDuration" 
                    placeholder="Auction Duration (hours) *" 
                    value={newProduct.auctionDuration} 
                    onChange={handleInputChange} 
                    style={styles.input} 
                />
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
            {!loading && products.length === 0 ? (
                <p>No products added yet.</p>
            ) : (
                products.map((product) => (
                    <div key={product.id} style={styles.card}>
                        <h3>{product.name}</h3>
                        {product.description && <p>{product.description}</p>}
                        <p><strong>Quantity:</strong> {product.quantity}</p>
                        <p><strong>Starting Price:</strong> ${product.price.toFixed(2)}</p>
                        
                        {product.auction && (
                            <div>
                                <p><strong>Auction Status:</strong> {product.auction.status}</p>
                                <p><strong>Bidding Ends In:</strong> {calculateTimeRemaining(product.auction.endTime)}</p>
                            </div>
                        )}
                        
                        <h4>Bids</h4>
                        {(!product.bids || product.bids.length === 0) ? (
                            <p>No bids yet.</p>
                        ) : (
                            product.bids.map((bid) => (
                                <div key={bid.id} style={{
                                    padding: '10px',
                                    margin: '5px 0',
                                    backgroundColor: '#334155',
                                    borderRadius: '4px',
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }}>
                                    <div>
                                        <p><strong>{bid.buyer.name}:</strong> ${bid.amount.toFixed(2)}</p>
                                        <p style={{ fontSize: '0.8rem' }}>Bid time: {new Date(bid.createdAt).toLocaleString()}</p>
                                        <p>Status: <span style={{ 
                                            color: bid.status === 'ACCEPTED' ? '#10b981' : 
                                                  bid.status === 'REJECTED' ? '#ef4444' : '#f59e0b'
                                        }}>{bid.status}</span></p>
                                    </div>
                                    
                                    {product.auction.status === 'ONGOING' && bid.status === 'PENDING' && (
                                        <div>
                                            <button 
                                                onClick={() => acceptBid(product.id, bid.id)}
                                                style={{
                                                    backgroundColor: '#10b981',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    padding: '5px 10px',
                                                    marginRight: '5px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Accept
                                            </button>
                                            <button 
                                                onClick={() => rejectBid(product.id, bid.id)}
                                                style={{
                                                    backgroundColor: '#ef4444',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '4px',
                                                    padding: '5px 10px',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Reject
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))
                        )}
                        
                        {product.auction && product.auction.status === 'COMPLETED' && (
                            <div style={{ 
                                backgroundColor: '#10b981', 
                                color: 'white', 
                                padding: '10px', 
                                borderRadius: '4px',
                                marginTop: '10px'
                            }}>
                                Auction completed with winning bid
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
};

export default SellerDashboard;