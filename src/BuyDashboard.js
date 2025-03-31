// import React, { useState, useEffect } from 'react';

// const BuyerDashboard = () => {
//     const [products, setProducts] = useState([]);
//     const [bidAmounts, setBidAmounts] = useState({});
//     const [myBids, setMyBids] = useState([]);

//     useEffect(() => {
//         const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
//         setProducts(storedProducts);

//         const storedBids = JSON.parse(localStorage.getItem("myBids")) || [];
//         setMyBids(storedBids);
//     }, []);

//     const handleBidChange = (e, productId) => {
//         setBidAmounts({ ...bidAmounts, [productId]: e.target.value });
//     };

//     const placeBid = (productId, currentPrice) => {
//         const bidAmount = parseFloat(bidAmounts[productId]);
//         if (!bidAmount || bidAmount <= currentPrice) {
//             alert("Bid must be higher than the current price!");
//             return;
//         }
        
//         const updatedProducts = products.map(product => {
//             if (product.id === productId) {
//                 return { 
//                     ...product, 
//                     bids: [...(product.bids || []), { amount: bidAmount, bidder: "You" }] 
//                 };
//             }
//             return product;
//         });
        
//         setProducts(updatedProducts);
//         localStorage.setItem("products", JSON.stringify(updatedProducts));
//         setBidAmounts({ ...bidAmounts, [productId]: '' });
        
//         const newBid = { productId, amount: bidAmount };
//         const updatedBids = [...myBids, newBid];
//         setMyBids(updatedBids);
//         localStorage.setItem("myBids", JSON.stringify(updatedBids));
//     };

//     const styles = {
//         container: {
//             minHeight: '100vh',
//             backgroundColor: '#0f172a',
//             color: '#ffffff',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             padding: '20px'
//         },
//         card: {
//             backgroundColor: '#1e293b',
//             borderRadius: '12px',
//             padding: '20px',
//             marginBottom: '20px',
//             width: '80%',
//             maxWidth: '600px',
//             border: '1px solid #334155'
//         },
//         input: {
//             width: '100%',
//             padding: '10px',
//             borderRadius: '6px',
//             border: '1px solid #334155',
//             marginBottom: '10px',
//             backgroundColor: '#0f172a',
//             color: '#ffffff'
//         },
//         button: {
//             width: '100%',
//             padding: '12px',
//             borderRadius: '6px',
//             border: 'none',
//             backgroundColor: '#0ea5e9',
//             color: 'white',
//             fontWeight: 'bold',
//             cursor: 'pointer',
//             transition: 'all 0.2s ease'
//         },
//         buttonHover: {
//             backgroundColor: '#0284c7'
//         },
//         myBidsContainer: {
//             marginTop: '30px',
//             width: '80%',
//             maxWidth: '600px'
//         }
//     };

//     return (
//         <div style={styles.container}>
//             <h1>Buyer Dashboard</h1>
//             {products.length === 0 ? <p>No products available.</p> : products.map((product) => (
//                 <div key={product.id} style={styles.card}>
//                     <h3>{product.name}</h3>
//                     <p><strong>Quantity:</strong> {product.quantity}</p>
//                     <p><strong>Current Price:</strong> ${product.price}</p>
//                     <p><strong>Address:</strong> {product.address}</p>
//                     <p><strong>Phone:</strong> {product.phone}</p>
//                     <p><strong>Bidding Ends In:</strong> {product.duration} hours</p>
//                     <input 
//                         type="number" 
//                         placeholder="Enter your bid" 
//                         value={bidAmounts[product.id] || ''} 
//                         onChange={(e) => handleBidChange(e, product.id)} 
//                         style={styles.input}
//                     />
//                     <button 
//                         style={styles.button} 
//                         onMouseEnter={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor} 
//                         onMouseLeave={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
//                         onClick={() => placeBid(product.id, product.price)}
//                     >
//                         Place Bid
//                     </button>
//                 </div>
//             ))}

//             {/* My Bids Section */}
//             <div style={styles.myBidsContainer}>
//                 <h2>My Bids</h2>
//                 {myBids.length === 0 ? (
//                     <p>No bids placed yet.</p>
//                 ) : (
//                     myBids.map((bid, index) => (
//                         <div key={index} style={styles.card}>
//                             <p><strong>Product ID:</strong> {bid.productId}</p>
//                             <p><strong>Bid Amount:</strong> ${bid.amount}</p>
//                         </div>
//                     ))
//                 )}
//             </div>
//         </div>
//     );
// };

// export default BuyerDashboard;

//WITH BACKEND


import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient('https://llzuhujkcxracavsqojs.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxsenVodWprY3hyYWNhdnNxb2pzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM0NTU0OTQsImV4cCI6MjA1OTAzMTQ5NH0.6-ZdlTzt855fRMG6JIDg206wf_805MwtsG4D98PUmCI');

const BuyerDashboard = () => {
    const [products, setProducts] = useState([]);
    const [bidAmounts, setBidAmounts] = useState({});
    const [myBids, setMyBids] = useState([]);
    const [buttonHover, setButtonHover] = useState(false);
    const [user, setUser] = useState({ id: 'dummy-user-id' }); // Replace with actual user authentication logic

    useEffect(() => {
        fetchProducts();
        fetchBids();
    }, []);

    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from('products')
            .select('*');
        if (error) {
            console.error('Error fetching products:', error);
        } else {
            setProducts(data);
        }
    };

    const fetchBids = async () => {
        const { data, error } = await supabase
            .from('bids')
            .select('*')
            .eq('user_id', user.id); // Use actual logged-in user ID
        if (error) {
            console.error('Error fetching bids:', error);
        } else {
            setMyBids(data);
        }
    };

    const handleBidChange = (e, productId) => {
        setBidAmounts({ ...bidAmounts, [productId]: e.target.value });
    };

    const placeBid = async (productId, currentPrice) => {
        const bidAmount = parseFloat(bidAmounts[productId]);
        if (!bidAmount || bidAmount <= currentPrice) {
            alert("Bid must be higher than the current price!");
            return;
        }

        try {
            // Insert bid into the database
            const { data, error } = await supabase
                .from('bids')
                .insert([
                    {
                        product_id: productId,
                        amount: bidAmount,
                        user_id: user.id, // Replace with actual user ID
                    },
                ]);

            if (error) {
                console.error('Error placing bid:', error);
            } else {
                alert('Bid placed successfully!');
                fetchProducts();  // Refresh the products after placing a bid
                fetchBids();  // Refresh bids
            }
        } catch (error) {
            console.error('Error placing bid:', error);
        }
    };

    const calculateTimeRemaining = (endTime) => {
        const now = new Date();
        const timeLeft = new Date(endTime) - now;

        if (timeLeft <= 0) return "Auction Ended";

        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        return `${hours}h ${minutes}m ${seconds}s`;
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
        myBidsContainer: {
            marginTop: '30px',
            width: '80%',
            maxWidth: '600px'
        }
    };

    return (
        <div style={styles.container}>
            <h1>Buyer Dashboard</h1>
            {products.length === 0 ? <p>No products available.</p> : products.map((product) => (
                <div key={product.id} style={styles.card}>
                    <h3>{product.name}</h3>
                    <p><strong>Quantity:</strong> {product.quantity}</p>
                    <p><strong>Current Price:</strong> ${product.price}</p>
                    <p><strong>Address:</strong> {product.address}</p>
                    <p><strong>Phone:</strong> {product.phone}</p>
                    <p><strong>Bidding Ends In:</strong> {calculateTimeRemaining(product.end_time)}</p>
                    <input 
                        type="number" 
                        placeholder="Enter your bid" 
                        value={bidAmounts[product.id] || ''} 
                        onChange={(e) => handleBidChange(e, product.id)} 
                        style={styles.input}
                    />
                    <button 
                        style={styles.button} 
                        onMouseEnter={() => setButtonHover(true)} 
                        onMouseLeave={() => setButtonHover(false)} 
                        onClick={() => placeBid(product.id, product.price)}
                    >
                        Place Bid
                    </button>
                </div>
            ))}

            {/* My Bids Section */}
            <div style={styles.myBidsContainer}>
                <h2>My Bids</h2>
                {myBids.length === 0 ? (
                    <p>No bids placed yet.</p>
                ) : (
                    myBids.map((bid, index) => (
                        <div key={index} style={styles.card}>
                            <p><strong>Product ID:</strong> {bid.product_id}</p>
                            <p><strong>Bid Amount:</strong> ${bid.amount}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default BuyerDashboard;

