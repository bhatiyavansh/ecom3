// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Signup() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const styles = {
//     container: {
//       minHeight: '100vh',
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#0f172a', // darker blue background
//       color: '#ffffff',
//       padding: '0 16px',
//     },
//     heading: {
//       fontSize: '2rem',
//       fontWeight: 600,
//       marginBottom: '2rem',
//       textAlign: 'center',
//       color: '#ffffff',
//     },
//     card: {
//       width: '100%',
//       maxWidth: '420px',
//       backgroundColor: '#1e293b', // slightly lighter blue for card
//       borderRadius: '12px',
//       boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
//       overflow: 'hidden',
//       border: '1px solid #334155', // subtle border
//     },
//     cardBody: {
//       padding: '32px',
//     },
//     cardTitle: {
//       fontSize: '1.5rem',
//       fontWeight: 600,
//       color: '#38bdf8', // bright blue for contrast
//       marginBottom: '2rem',
//     },
//     formGroup: {
//       marginBottom: '1.5rem',
//     },
//     label: {
//       display: 'block',
//       fontSize: '0.875rem',
//       fontWeight: 500,
//       marginBottom: '0.5rem',
//       color: '#e2e8f0',
//     },
//     input: {
//       width: '100%',
//       padding: '0.75rem 1rem',
//       backgroundColor: '#0f172a', // darker for input contrast
//       border: '1px solid #334155',
//       borderRadius: '8px',
//       color: 'white',
//       fontSize: '1rem',
//       outline: 'none',
//       transition: 'border-color 0.2s, box-shadow 0.2s',
//     },
//     inputFocus: {
//       borderColor: '#38bdf8',
//       boxShadow: '0 0 0 3px rgba(56, 189, 248, 0.25)',
//     },
//     button: {
//       width: '100%',
//       padding: '0.875rem 1rem',
//       backgroundColor: '#0ea5e9', // bright blue button
//       color: 'white',
//       border: 'none',
//       borderRadius: '8px',
//       fontWeight: 600,
//       fontSize: '1rem',
//       cursor: 'pointer',
//       transition: 'background-color 0.2s',
//       marginTop: '0.5rem',
//     },
//     buttonHover: {
//       backgroundColor: '#0284c7', // darker blue on hover
//     },
//     footer: {
//       padding: '24px 32px',
//       backgroundColor: '#0f172a', // darker blue footer
//       borderTop: '1px solid #334155',
//     },
//     footerText: {
//       fontSize: '0.875rem',
//       textAlign: 'center',
//       color: '#94a3b8',
//       marginBottom: '1.5rem',
//     },
//     link: {
//       display: 'block',
//       width: '100%',
//       padding: '0.75rem 1rem',
//       textAlign: 'center',
//       border: '1px solid #38bdf8',
//       color: '#38bdf8',
//       borderRadius: '8px',
//       textDecoration: 'none',
//       fontWeight: 500,
//       transition: 'background-color 0.2s, color 0.2s',
//     },
//     linkHover: {
//       backgroundColor: 'rgba(56, 189, 248, 0.1)',
//     },
//   };

//   const [inputFocus, setInputFocus] = useState({
//     email: false,
//     password: false,
//   });

//   const [buttonHover, setButtonHover] = useState(false);
//   const [linkHover, setLinkHover] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Send POST request to the backend
//     try {
//       const response = await axios.post('http://localhost:5000/api/register', {
//         email,
//         password,
//       });

//       // Handle response from backend (if signup successful)
//       if (response.status === 200) {
//         alert('Account created successfully!');
//         navigate('/'); // Redirect to login page
//       }
//     } catch (error) {
//       console.error(error);
//       // Handle error and display appropriate message
//       if (error.response) {
//         alert(`Error: ${error.response.data.message || 'Something went wrong'}`);
//       } else {
//         alert('Network error. Please try again later.');
//       }
//     }
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.heading}>Create an account</h1>

//       <div style={styles.card}>
//         <div style={styles.cardBody}>
//           <h2 style={styles.cardTitle}>Sign up</h2>

//           <form onSubmit={handleSubmit}>
//             <div style={styles.formGroup}>
//               <label htmlFor="email" style={styles.label}>Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 placeholder="your@email.com"
//                 style={{
//                   ...styles.input,
//                   ...(inputFocus.email ? styles.inputFocus : {}),
//                 }}
//                 onFocus={() => setInputFocus({ ...inputFocus, email: true })}
//                 onBlur={() => setInputFocus({ ...inputFocus, email: false })}
//                 required
//               />
//             </div>

//             <div style={styles.formGroup}>
//               <label htmlFor="password" style={styles.label}>Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 placeholder="••••••••"
//                 style={{
//                   ...styles.input,
//                   ...(inputFocus.password ? styles.inputFocus : {}),
//                 }}
//                 onFocus={() => setInputFocus({ ...inputFocus, password: true })}
//                 onBlur={() => setInputFocus({ ...inputFocus, password: false })}
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               style={{
//                 ...styles.button,
//                 ...(buttonHover ? styles.buttonHover : {}),
//               }}
//               onMouseEnter={() => setButtonHover(true)}
//               onMouseLeave={() => setButtonHover(false)}
//             >
//               Create account
//             </button>
//           </form>
//         </div>

//         <div style={styles.footer}>
//           <p style={styles.footerText}>
//             Already have an account?
//           </p>

//           <Link
//             to="/"
//             style={{
//               ...styles.link,
//               ...(linkHover ? styles.linkHover : {}),
//             }}
//             onMouseEnter={() => setLinkHover(true)}
//             onMouseLeave={() => setLinkHover(false)}
//           >
//             Back to login
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Signup;

//Without AUTH

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
      marginBottom: '2rem',
      textAlign: 'center',
      color: '#ffffff'
    },
    card: {
      width: '100%',
      maxWidth: '420px',
      backgroundColor: '#1e293b', // slightly lighter blue for card
      borderRadius: '12px',
      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden',
      border: '1px solid #334155' // subtle border
    },
    cardBody: {
      padding: '32px'
    },
    cardTitle: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#38bdf8', // bright blue for contrast
      marginBottom: '2rem'
    },
    formGroup: {
      marginBottom: '1.5rem'
    },
    label: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: 500,
      marginBottom: '0.5rem',
      color: '#e2e8f0'
    },
    input: {
      width: '100%',
      padding: '0.75rem 1rem',
      backgroundColor: '#0f172a', // darker for input contrast
      border: '1px solid #334155',
      borderRadius: '8px',
      color: 'white',
      fontSize: '1rem',
      outline: 'none',
      transition: 'border-color 0.2s, box-shadow 0.2s'
    },
    inputFocus: {
      borderColor: '#38bdf8',
      boxShadow: '0 0 0 3px rgba(56, 189, 248, 0.25)'
    },
    button: {
      width: '100%',
      padding: '0.875rem 1rem',
      backgroundColor: '#0ea5e9', // bright blue button
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontWeight: 600,
      fontSize: '1rem',
      cursor: 'pointer',
      transition: 'background-color 0.2s',
      marginTop: '0.5rem'
    },
    buttonHover: {
      backgroundColor: '#0284c7' // darker blue on hover
    },
    footer: {
      padding: '24px 32px',
      backgroundColor: '#0f172a', // darker blue footer
      borderTop: '1px solid #334155'
    },
    footerText: {
      fontSize: '0.875rem',
      textAlign: 'center',
      color: '#94a3b8',
      marginBottom: '1.5rem'
    },
    link: {
      display: 'block',
      width: '100%',
      padding: '0.75rem 1rem',
      textAlign: 'center',
      border: '1px solid #38bdf8',
      color: '#38bdf8',
      borderRadius: '8px',
      textDecoration: 'none',
      fontWeight: 500,
      transition: 'background-color 0.2s, color 0.2s'
    },
    linkHover: {
      backgroundColor: 'rgba(56, 189, 248, 0.1)'
    }
  };

  const [inputFocus, setInputFocus] = useState({
    email: false,
    password: false
  });
  
  const [buttonHover, setButtonHover] = useState(false);
  const [linkHover, setLinkHover] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save user details in local storage
    localStorage.setItem("user", JSON.stringify({ email, password }));

    alert("Account created successfully!");
    navigate('/'); // Redirect to login
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Create an account</h1>
      
      <div style={styles.card}>
        <div style={styles.cardBody}>
          <h2 style={styles.cardTitle}>Sign up</h2>
          
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <input 
                type="email" 
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com" 
                style={{
                  ...styles.input,
                  ...(inputFocus.email ? styles.inputFocus : {})
                }}
                onFocus={() => setInputFocus({...inputFocus, email: true})}
                onBlur={() => setInputFocus({...inputFocus, email: false})}
                required 
              />
            </div>
            
            <div style={styles.formGroup}>
              <label htmlFor="password" style={styles.label}>Password</label>
              <input 
                type="password" 
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                style={{
                  ...styles.input,
                  ...(inputFocus.password ? styles.inputFocus : {})
                }}
                onFocus={() => setInputFocus({...inputFocus, password: true})}
                onBlur={() => setInputFocus({...inputFocus, password: false})}
                required 
              />
            </div>
            
            <button 
              type="submit" 
              style={{
                ...styles.button,
                ...(buttonHover ? styles.buttonHover : {})
              }}
              onMouseEnter={() => setButtonHover(true)}
              onMouseLeave={() => setButtonHover(false)}
            >
              Create account
            </button>
          </form>
        </div>
        
        <div style={styles.footer}>
          <p style={styles.footerText}>
            Already have an account?
          </p>
          
          <Link 
            to="/" 
            style={{
              ...styles.link,
              ...(linkHover ? styles.linkHover : {})
            }}
            onMouseEnter={() => setLinkHover(true)}
            onMouseLeave={() => setLinkHover(false)}
          >
            Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
