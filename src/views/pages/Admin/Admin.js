import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../contexts/auth/AuthContext';

function Admin() {
    const { username } = useContext(AuthContext);
    const [newUsername, setNewUsername] = useState(username);
    const [newPassword, setNewPassword] = useState('');
    const [challengePassword, setChallengePassword] = useState('');
    const [isActive, setIsActive] = useState(false)
    
    useEffect(() => {

        document.title = "Administrasi Akun"
        setIsActive(false)
    }, [])

    const handleNewUsername = (value) => {
        setNewUsername(value);
    };

    const handleNewPassword = (value) => {
        setNewPassword(value);
    };

    const handleChallengePassword = (value) => {
        setChallengePassword(value);

        if(challengePassword === newPassword) {
            setIsActive(true)
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!challengePassword) {
            toast.warning("Silahkan ulangi password anda");
            return;
        }

        if (challengePassword !== newPassword) {
            toast.warning("Password harus sama");
            return;
        }

        toast.success("Berhasil ubah data");
    };

    return (
        <Layout>
            <ToastContainer />
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">
                    Halo, <span className="text-orange-500">{username}</span>
                </h1>
                <hr className="border-solid" />
                <form className="w-1/2 flex flex-col justify-left mt-5" onSubmit={handleSubmit}>
                    <p className="text-xs">Manajemen Pengguna</p>
                    <hr className="border-solid mt-2" />
                    <input
                        name="username"
                        placeholder="username"
                        className="p-2 rounded-lg border border-gray-300"
                        onChange={(e) => handleNewUsername(e.target.value)}
                        value={newUsername}
                    />
                    <hr className="border-solid" />
                    <input
                        name="password"
                        type="password"
                        placeholder="password"
                        className="p-2 rounded-lg border border-gray-300"
                        onChange={(e) => handleNewPassword(e.target.value)}
                    />
                    <hr className="border-solid" />
                    <input
                        name="challenge-password"
                        type="password"
                        placeholder="ulangi password"
                        className="p-2 rounded-lg border border-gray-300"
                        onChange={(e) => handleChallengePassword(e.target.value)}
                    />
                    <hr className="border-solid" />
                    <button
                        type="submit"
                        className={`bg-green-500 text-white py-2 px-6 rounded-lg text-s ${newPassword !== challengePassword ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isActive}
                    >
                        Ubah Data
                    </button>
                </form>
            </div>
        </Layout>
    );
}

export default Admin;
