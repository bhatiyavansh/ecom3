import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SelectionPage = () => {
    const navigate = useNavigate();
    const [hoveredButton, setHoveredButton] = useState(null);

    const styles = {
        container: {
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0f172a', // darker blue background
            color: '#ffffff',
            padding: '0 16px'
        },
        heading: {
            fontSize: '2rem',
            fontWeight: 600,
            marginBottom: '3rem',
            textAlign: 'center',
            color: '#ffffff'
        },
        cardContainer: {
            width: '100%',
            maxWidth: '650px',
            backgroundColor: '#1e293b', // slightly lighter blue for card
            borderRadius: '12px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
            overflow: 'hidden',
            border: '1px solid #334155', // subtle border
            padding: '40px 32px'
        },
        subtitle: {
            fontSize: '1.25rem',
            fontWeight: 500,
            color: '#38bdf8', // bright blue for contrast
            marginBottom: '2.5rem',
            textAlign: 'center'
        },
        buttonContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            width: '100%',
            maxWidth: '400px',
            margin: '0 auto'
        },
        button: {
            padding: '1.25rem',
            backgroundColor: '#0f172a',
            border: '2px solid #334155',
            borderRadius: '10px',
            color: 'white',
            fontSize: '1.125rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        buttonHover: {
            backgroundColor: '#0ea5e9',
            borderColor: '#0ea5e9',
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 15px -3px rgba(14, 165, 233, 0.2)'
        },
        icon: {
            marginRight: '12px',
            fontSize: '1.25rem'
        }
    };

    const handleBuyerSelection = () => {
        // Navigate directly to the buyer dashboard route
        navigate('/buyerdashboard');
    };

    const handleSellerSelection = () => {
        // Navigate directly to the seller dashboard route
        navigate('/sellerdashboard');
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Welcome to Our Platform</h1>
            
            <div style={styles.cardContainer}>
                <h2 style={styles.subtitle}>Select your role to continue</h2>
                
                <div style={styles.buttonContainer}>
                    <button
                        onClick={handleBuyerSelection}
                        style={{
                            ...styles.button,
                            ...(hoveredButton === 'buyer' ? styles.buttonHover : {})
                        }}
                        onMouseEnter={() => setHoveredButton('buyer')}
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        <span style={styles.icon}>🛒</span> I am a Buyer
                    </button>
                    
                    <button
                        onClick={handleSellerSelection}
                        style={{
                            ...styles.button,
                            ...(hoveredButton === 'seller' ? styles.buttonHover : {})
                        }}
                        onMouseEnter={() => setHoveredButton('seller')}
                        onMouseLeave={() => setHoveredButton(null)}
                    >
                        <span style={styles.icon}>🏪</span> I am a Seller
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SelectionPage;