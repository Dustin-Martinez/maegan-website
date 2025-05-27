'use client';
import { auth, db } from '@/db/firebase';
import { User, onAuthStateChanged, updateProfile, updatePassword } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiUser, FiMail, FiLock, FiCheck, FiEdit3, FiArrowLeft } from 'react-icons/fi'; 

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState<string>('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleGoBack = () => {
    router.push('/'); // Navigates to the home page (e.g., your main landing page)
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setName(userData?.name || '');
        } else {
          setName(currentUser.displayName || '');
        }

        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleUpdateProfile = async () => {
    if (!user) return;

    if (newPassword && newPassword !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    setSaving(true);
    try {
      // Update display name in Firebase Auth
      if (name !== user.displayName) {
        await updateProfile(user, { displayName: name });
      }

      // Update name in Firestore
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, { name });

      // Update password if provided
      if (newPassword) {
        await updatePassword(user, newPassword);
      }

      alert('Profile updated successfully!');
    } catch (error: any) {
      alert(`Error updating profile: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-white p-8">Loading...</div>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen bg-[#1A1A1A] pt-4 pb-8"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="w-full bg-[#26262F] p-8"
      >
        <div className="max-w-4xl mx-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleGoBack}
            className="flex items-center text-blue-500 hover:text-blue-400 mb-8 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <FiArrowLeft className="text-2xl mr-2" />
            <span className="text-lg">Back to Home</span>
          </motion.button>
          {/* Profile Header */}
          <motion.div className="flex flex-col items-center mb-12">
            <motion.div
              className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-4xl mb-6 shadow-lg"
              whileHover={{ rotate: 10, scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiUser />
            </motion.div>
            <h2 className="text-white text-2xl font-bold">{name || user?.displayName}</h2>
            <p className="text-gray-400">@{user?.email?.split('@')[0]}</p>
          </motion.div>

          {/* Update Section */}
          <motion.div className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <FiEdit3 className="text-blue-500 text-xl" />
              <h3 className="text-white text-xl font-semibold">UPDATE ACCOUNT</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-gray-400 text-sm">Name</label>
                <div className="flex items-center gap-3 bg-[#1D1D24] p-4 rounded-lg">
                  <FiUser className="text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-transparent text-white w-full focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 text-sm">Email address</label>
                <div className="flex items-center gap-3 bg-[#1D1D24] p-4 rounded-lg">
                  <FiMail className="text-gray-400" />
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-transparent text-white w-full focus:outline-none disabled:opacity-50 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 text-sm">New Password</label>
                <div className="flex items-center gap-3 bg-[#1D1D24] p-4 rounded-lg">
                  <FiLock className="text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="bg-transparent text-white w-full focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-400 text-sm">Confirm Password</label>
                <div className="flex items-center gap-3 bg-[#1D1D24] p-4 rounded-lg">
                  <FiLock className="text-gray-400" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="bg-transparent text-white w-full focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="flex justify-center mt-8">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleUpdateProfile}
              disabled={saving}
              className="px-8 py-3 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-2 text-lg disabled:opacity-50"
            >
              <FiCheck className="text-xl" />
              <span>{saving ? 'Updating...' : 'UPDATE PROFILE'}</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
