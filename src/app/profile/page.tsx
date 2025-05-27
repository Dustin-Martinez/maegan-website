'use client';
import { auth, db } from '@/db/firebase';
import { User, onAuthStateChanged, updateProfile, updatePassword, AuthError } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiLock, FiCheck, FiEdit3 } from 'react-icons/fi';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState<string>('');
  const [loading, setLoading] = useState(true); // New loading state
  const router = useRouter();

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
  
      // Fetch user data from Firestore
      const fetchUserName = async () => {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);
  
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData && userData.name) {
            setName(userData.name); // Set the name state with the name from Firestore
          } else {
            setName(''); // Set to empty string if no name in database
          }
        } else {
          // Document doesn't exist, maybe handle this case (e.g., create a basic document)
          console.log("No user document found in Firestore for this user.");
          setName(currentUser.displayName || ''); // Use display name from auth if no document
        }
      };
  
      // Use onAuthStateChanged to handle authentication state changes
      const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          setUser(currentUser);
          // Fetch user data from Firestore inside the listener
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            if (userData && userData.name) {
              setName(userData.name); // Set the name state with the name from Firestore
            } else {
              setName(''); // Set to empty string if no name in database
            }
          } else {
            console.log("No user document found in Firestore for this user.");
            // Optionally, create a basic user document here if it doesn't exist
            // await setDoc(userDocRef, { email: currentUser.email, name: '' });
            setName(currentUser.displayName || ''); // Fallback to auth display name
          }
          setLoading(false); // Set loading to false once user data is fetched
        } else {
          setUser(null);
          setLoading(false); // Set loading to false if no user is found
          router.push('/login'); // Redirect if no user
        }
      });

      // Clean up the listener when the component unmounts
      return () => unsubscribe();
    } else {
      // Handle the case where auth is not yet initialized or other issues
      setLoading(false);
      router.push('/login'); // Redirect if auth is not available
    }
  }, [router]);



  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen bg-[#1A1A1A] pt-4 pb-8"
    >
      {/* Full-width profile section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="w-full bg-[#26262F] p-8"
      >
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <motion.div 
            className="flex flex-col items-center mb-12"
            whileHover={{ scale: 1.01 }}
          >
            <motion.div
              className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl mb-6 shadow-lg"
              whileHover={{ rotate: 10, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiUser />
            </motion.div>
            <h2 className="text-white text-2xl font-bold">Maegan Manez</h2>
            <p className="text-gray-400">@maegamanez6</p>
          </motion.div>

          {/* Update Account Section */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-10"
          >
            <div className="flex items-center gap-3 mb-6">
              <FiEdit3 className="text-blue-500 text-xl" />
              <h3 className="text-white text-xl font-semibold">UPDATE ACCOUNT</h3>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ x: 5 }}
                className="space-y-2"
              >
                <label className="text-gray-400 text-sm">Name</label>
                <div className="flex items-center gap-3 bg-[#1D1D24] p-4 rounded-lg">
                  <FiUser className="text-gray-400" />
                  <input
                    type="text"
                    placeholder={name || 'Enter your name'}
                    value={name}
                    className="bg-transparent text-white w-full focus:outline-none"
                  />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="space-y-2"
              >
                <label className="text-gray-400 text-sm">Email address</label>
                <div className="flex items-center gap-3 bg-[#1D1D24] p-4 rounded-lg">
                  <FiMail className="text-gray-400" />
                  <input
                    type="email"
                    defaultValue={user?.email || ''}
                    disabled
                    className="bg-transparent text-white w-full focus:outline-none disabled:opacity-50 cursor-not-allowed"
                  />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="space-y-2"
              >
                <label className="text-gray-400 text-sm">New Password</label>
                <div className="flex items-center gap-3 bg-[#1D1D24] p-4 rounded-lg">
                  <FiLock className="text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="bg-transparent text-white w-full focus:outline-none"
                  />
                </div>
              </motion.div>

              <motion.div
                whileHover={{ x: 5 }}
                className="space-y-2"
              >
                <label className="text-gray-400 text-sm">Confirm Password</label>
                <div className="flex items-center gap-3 bg-[#1D1D24] p-4 rounded-lg">
                  <FiLock className="text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="bg-transparent text-white w-full focus:outline-none"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)" }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2 text-lg"
            >
              <FiCheck className="text-xl" />
              <span>UPDATE PROFILE</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function setUser(currentUser: User) {
  throw new Error('Function not implemented.');
}
function setName(name: any) {
  throw new Error('Function not implemented.');
}

