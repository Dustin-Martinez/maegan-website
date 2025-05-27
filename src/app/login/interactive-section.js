// 'use client';

// import { motion, AnimatePresence } from 'framer-motion';
// import { useState } from 'react';

// //imports for database auth
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
// import { useState } from 'react';
// // Assuming you have exported auth from a firebase initialization file
// import { auth } from '@db/firebase';




// export const InteractiveSection = () => {
//   const [showAuth, setShowAuth] = useState(false);
//   const [authType, setAuthType] = useState('login');

//   const handleAuthClick = (type) => {
//     setAuthType(type);
//     setShowAuth(true);
//   };

//   const handleBackClick = () => {
//     setShowAuth(false);
//   };

//   return (
//     <div style={{
//       position: 'relative',
//       width: '100%',
//       height: '100%',
//       overflow: 'hidden'
//     }}>

//       <motion.div 
//         animate={{
//           width: showAuth ? '50%' : '100%'
//         }}
//         transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//         style={{
//           position: 'absolute',
//           top: 0,
//           left: 0,
//           height: '100%',
//           zIndex: 1
//         }}
//       >

//         <motion.h1
//           initial={false}
//           animate={{
//             top: showAuth ? '20%' : '30%',
//             fontSize: showAuth ? '3rem' : '6rem'
//           }}
//           transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//           style={{
//             position: 'absolute',
//             left: '50%',
//             transform: 'translateX(-50%)',
//             fontWeight: 'bold',
//             color: 'white',
//             textShadow: '0 2px 10px rgba(0,0,0,0.8)',
//             margin: 0,
//             width: '100%',
//             textAlign: 'center'
//           }}
//         >
//           WELCOME!!
//         </motion.h1>

//         <AnimatePresence>
//           {!showAuth && (
//             <motion.div
//               initial={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               style={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: '50%',
//                 transform: 'translate(-50%, -50%)',
//                 display: 'flex',
//                 gap: '2rem',
//                 marginTop: '6rem'
//               }}
//             >
//               <motion.button
//                 whileHover={{ 
//                   scale: 1.05, 
//                   boxShadow: '0 5px 15px rgba(0,0,0,0.3)' 
//                 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => handleAuthClick('login')}
//                 style={blackButtonStyle}
//               >
//                 Login
//               </motion.button>
              
//               <motion.button
//                 whileHover={{ 
//                   scale: 1.05, 
//                   boxShadow: '0 5px 15px rgba(255,255,255,0.3)' 
//                 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => handleAuthClick('signup')}
//                 style={whiteButtonStyle}
//               >
//                 Sign up
//               </motion.button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </motion.div>

//       <motion.div
//         style={{
//           position: 'absolute',
//           bottom: '3rem',
//           left: '3rem',
//           fontSize: '2rem',
//           fontWeight: 'bold',
//           zIndex: 3,
//           color: 'white',
//           textShadow: '0 2px 5px rgba(0,0,0,0.5)'
//         }}
//         animate={{
//           x: showAuth ? '-50%' : '0%'
//         }}
//         transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//       >
//         MOVIELIST
//       </motion.div>
      
//       <motion.div
//         initial={{ x: '100%' }}
//         animate={{
//           x: showAuth ? '0%' : '100%'
//         }}
//         transition={{ type: 'spring', stiffness: 300, damping: 30 }}
//         style={{
//           position: 'absolute',
//           top: 0,
//           right: 0,
//           width: '50%',
//           height: '100%',
//           backgroundColor: 'rgba(255, 255, 255, 0.9)',
//           padding: '3rem',
//           zIndex: 2,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center'
//         }}
//       >
//         {showAuth && (
//           <>
//             <motion.button 
//               onClick={handleBackClick}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//               style={backButtonStyle}
//             >
//               ← Back
//             </motion.button>
            
//             <h2 style={{ 
//               fontSize: "2rem", 
//               marginBottom: "2rem",
//               color: '#000'
//             }}>
//               {authType === 'login' ? 'Log in' : 'Sign up'}
//             </h2>
            
//             <AuthForm authType={authType} />
//           </>
//         )}
//       </motion.div>
//     </div>
//   );
// };

// const AuthForm = ({ authType }) => {
//   return (
//     <>
//       {authType === 'signup' && (
//         <motion.input 
//           type="text" 
//           placeholder="Name" 
//           style={inputStyle}
//           whileFocus={{ scale: 1.02 }}
//         />
//       )}
      
//       <motion.input 
//         type="email" 
//         placeholder="Email Address" 
//         style={inputStyle}
//         whileFocus={{ scale: 1.02 }}
//       />
//       <motion.input 
//         type="password" 
//         placeholder="Password" 
//         style={inputStyle}
//         whileFocus={{ scale: 1.02 }}
//       />
      
//       {authType === 'signup' && (
//         <motion.input 
//           type="password" 
//           placeholder="Repeat Password" 
//           style={inputStyle}
//           whileFocus={{ scale: 1.02 }}
//         />
//       )}
      
//       <motion.button
//         whileHover={{ scale: 1.03, boxShadow: '0 5px 15px rgba(0,0,0,0.2)' }}
//         whileTap={{ scale: 0.97 }}
//         style={submitButtonStyle}
//       >
//         {authType === 'login' ? 'Log in' : 'Sign up'}
//       </motion.button>
//     </>
//   );
// };

// const blackButtonStyle = {
//   padding: '1.2rem 2.5rem',
//   fontSize: '1.25rem',
//   backgroundColor: '#000',
//   color: '#fff',
//   border: 'none',
//   borderRadius: '12px',
//   cursor: 'pointer',
//   fontWeight: 'bold'
// };

// const whiteButtonStyle = {
//   padding: '1.2rem 2.5rem',
//   fontSize: '1.25rem',
//   backgroundColor: '#fff',
//   color: '#000',
//   border: 'none',
//   borderRadius: '12px',
//   cursor: 'pointer',
//   fontWeight: 'bold'
// };

// const backButtonStyle = {
//   background: 'none',
//   border: 'none',
//   cursor: 'pointer',
//   fontSize: '1.5rem',
//   marginBottom: '2rem',
//   width: 'fit-content',
//   color: '#000'
// };

// const inputStyle = {
//   display: 'block',
//   width: '100%',
//   padding: '1rem',
//   marginBottom: '1.5rem',
//   borderRadius: '8px',
//   border: '1px solid #ddd',
//   fontSize: '1rem',
//   backgroundColor: '#fff'
// };

// const submitButtonStyle = {
//   width: '100%',
//   padding: '1rem',
//   backgroundColor: '#000',
//   color: 'white',
//   border: 'none',
//   borderRadius: '8px',
//   fontSize: '1.1rem',
//   cursor: 'pointer',
//   fontWeight: 'bold',
//   marginTop: '1.5rem'
// };