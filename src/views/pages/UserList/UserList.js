import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import List from './List';
import { toast } from 'react-toastify';
import { UserContext } from '../../../contexts/Users/UserContext';
import SweetAlert2 from 'react-sweetalert2';

function UserList() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [challenge, setChallenge] = useState('');
    const { registerUser, users, deleteUser } = useContext(UserContext);
    const [swalProps, setSwalProps] = useState({});

    useEffect(() => {
        document.title = "Manajemen Pengguna";
    }, [users]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password || !challenge) {
            toast.warning('Mohon isi semua form');
            return;
        }

        if (password !== challenge) {
            toast.warning("Password harus sama");
            return;
        }

        try {
            await registerUser({ username, password });
            setUsername('');
            setPassword('');
            setChallenge('');
            toast.success(`Berhasil menambahkan user baru: ${username}`);
        } catch (error) {
            toast.error("Terjadi kesalahan, mohon refresh halaman ini");
            console.error("Error registering user:", error);
        }
    };

    const handleDelete = (id, username) => {
        setSwalProps({
            show: true,
            title: 'Hapus user ini?',
            text: username,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Hapus',
            preConfirm: async () => {
                try {
                    await deleteUser(id);
                    toast.success(`User ${username} deleted successfully`);
                } catch (error) {
                    toast.error('Failed to delete user ' + username);
                    console.error("Error deleting user:", error);
                }
            }
        });
    };

    return (
        <Layout>
            <div className='container mx-auto p-4'>
                <SweetAlert2 {...swalProps} onConfirm={() => setSwalProps({})} onCancel={() => setSwalProps({})} />
                <h1 className='text-2xl font-bold mb-4'>Tambah Pengguna</h1>
                <hr className='my-4' />
                <div className='flex w-1/2 justify-between'>
                    <div className='flex w-1/4 flex-col'>
                        <label className='text-gray-600'>Username</label>
                        <label className='text-gray-600'>Password</label>
                        <label className='text-gray-600'>Ulangi Password</label>
                    </div>
                    <form className='flex w-2/4 flex-col' onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            className='border border-gray-300 rounded-md px-2 mb-2'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className='border border-gray-300 rounded-md px-2 mb-2'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Ulangi Password"
                            className='border border-gray-300 rounded-md px-2 mb-2'
                            value={challenge}
                            onChange={(e) => setChallenge(e.target.value)}
                        />
                        <button className='bg-green-500 rounded-lg px-4 py-2 text-white hover:bg-green-800'>Buat user</button>
                    </form>
                </div>
                <hr className='my-4' />
                <List users={users} handleDelete={handleDelete} />
            </div>
        </Layout>
    );
}

export default UserList;
