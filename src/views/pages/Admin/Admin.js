import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../contexts/auth/AuthContext';

function Admin() {
    const { username, setUsername } = useContext(AuthContext);
    const [newUsername, setNewUsername] = useState(username || '');
    const [newPassword, setNewPassword] = useState('');
    const [challengePassword, setChallengePassword] = useState('');
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        document.title = "Administrasi Akun";
    }, []);

    const handleNewUsername = (value) => {
        setNewUsername(value);
    };

    const handleNewPassword = (value) => {
        setNewPassword(value);
    };

    const handleChallengePassword = (value) => {
        setChallengePassword(value);
        if (value === newPassword) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!challengePassword) {
            toast.warning("Silakan ulangi password Anda");
            return;
        }

        if (newPassword.length < 8 || challengePassword.length < 8) {
            toast.warning("Username dan password harus minimal 8 karakter");
            return;
        }

        if (challengePassword !== newPassword) {
            toast.warning("Password harus sama");
            return;
        }

        toast.success("Data berhasil diperbarui");
        setUsername(newUsername)
        clearForm();
    };

    const clearForm = () => {
        setNewUsername('');
        setNewPassword('');
        setChallengePassword('');
    };

    return (
        <Layout>
            <ToastContainer />
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                    <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
                        Halo, <span className="text-orange-500">{username}</span>
                    </h1>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <p className="text-sm font-semibold text-gray-600 text-center">Manajemen Pengguna</p>
                        <div className="space-y-4">
                            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                                <label className="block text-gray-700 mb-1" htmlFor="username">Username</label>
                                <input
                                    id="username"
                                    name="username"
                                    placeholder="Masukkan username"
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    onChange={(e) => handleNewUsername(e.target.value)}
                                    value={newUsername}
                                />
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                                <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Masukkan password"
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    onChange={(e) => handleNewPassword(e.target.value)}
                                    value={newPassword}
                                />
                            </div>
                            <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                                <label className="block text-gray-700 mb-1" htmlFor="challenge-password">Ulangi Password</label>
                                <input
                                    id="challenge-password"
                                    name="challenge-password"
                                    type="password"
                                    placeholder="Ulangi password"
                                    className="w-full p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                    onChange={(e) => handleChallengePassword(e.target.value)}
                                    value={challengePassword}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={`w-full py-3 rounded-lg text-white font-semibold ${isActive ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 cursor-not-allowed'}`}
                            disabled={!isActive}
                        >
                            Ubah Data
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default Admin;
