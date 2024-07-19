import React, { useContext, useState } from 'react';
import Layout from '../../components/Layout';
import List from './List';
import { toast } from 'react-toastify';
import { UserContext } from '../../../contexts/Users/UserContext';

function UserList() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [challenge, setChallenge] = useState('');
    const { registerUser, users, deleteUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password || !challenge) {
            toast.warning('mohon isi semua form');
            return;
        }

        if (password !== challenge) {
            toast.warning("password harus sama");
            return;
        }

        try {
            await registerUser({username, password});
            
            setUsername('');
            setPassword('');
            setChallenge('');
            toast.success("Berhasil menambahkan user baru: " + username);
        } catch {
            toast.error("terjadi kesalahan, mohon refresh halaman ini");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteUser(id);
            toast.success('User deleted successfully');
        } catch {
            toast.error('Failed to delete user');
        }
    };

    return (
        <Layout>
            <div className='container mx-auto p-4'>
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
                            placeholder="username"
                            className='border border-gray-300 rounded-md px-2'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="password"
                            className='border border-gray-300 rounded-md px-2'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="ulangi password"
                            className='border border-gray-300 rounded-md px-2'
                            value={challenge}
                            onChange={(e) => setChallenge(e.target.value)}
                        />
                        <button className='bg-green-500 rounded-lg px-4 py-2 my-4 text-white hover:bg-green-800'>Buat user</button>
                    </form>
                </div>
                <hr className='my-4' />
                <List users={users} handleDelete={handleDelete} />
            </div>
        </Layout>
    );
}

export default UserList;