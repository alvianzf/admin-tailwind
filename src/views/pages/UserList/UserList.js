import React, { useContext, useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import List from './List';
import { toast } from 'react-toastify';
import { UserContext } from '../../../contexts/Users/UserContext';
import SweetAlert2 from 'react-sweetalert2';

function UserList() {
    const [id, setId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [challenge, setChallenge] = useState('');
    const { updateUser, registerUser, users, deleteUser } = useContext(UserContext);
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

        if (username.length < 8 || password.length < 8) {
            toast.error('Username dan password harus 8 karakter');
            return;
        }

        try {
            if (id) {
                await updateUser(id, { username, password });
                toast.success(`Berhasil mengubah user: ${username}`);
                clearForm();
            } else {
                await registerUser({ username, password });
                toast.success(`Berhasil menambahkan user baru: ${username}`);
                clearForm();
            }
        } catch (error) {
            toast.error("Terjadi kesalahan, mohon refresh halaman ini");
        }
    };

    const handleDelete = (id, username) => {
        setSwalProps({
            show: true,
            title: 'Hapus user ini?',
            text: username,
            icon: 'question',
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
                }
            },
            willClose: () => {
                setSwalProps({});
            }
        });
    };

    const handleClickUpdate = (_id, editUsername) => {
        setId(_id);
        setUsername(editUsername);
    };

    const clearForm = () => {
        setId('');
        setUsername('');
        setPassword('');
        setChallenge('');
    };

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <SweetAlert2 {...swalProps} />
                <h1 className="text-2xl font-bold mb-4">Tambah Pengguna</h1>
                <hr className="my-4" />
                <div className="flex flex-col md:flex-row md:justify-between">
                    <div className="md:w-1/4 flex flex-col space-y-4">
                        <label className="text-gray-600 mb-2">Username</label>
                        <label className="text-gray-600 mb-2">Password</label>
                        <label className="text-gray-600 mb-2">Ulangi Password</label>
                    </div>
                    <form className="md:w-2/4 flex flex-col space-y-4" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Username"
                            className="border border-gray-300 rounded-md px-2 py-1 mb-2"
                            value={username}
                            disabled={!!id}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="border border-gray-300 rounded-md px-2 py-1 mb-2"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Ulangi Password"
                            className="border border-gray-300 rounded-md px-2 py-1 mb-2"
                            value={challenge}
                            onChange={(e) => setChallenge(e.target.value)}
                        />
                        <div className="flex justify-start space-x-4">
                            <button
                                type="submit"
                                className={`rounded-lg px-4 py-2 text-white ${(!!id || (password !== challenge) || (!password || !challenge)) ? 'bg-gray-500' : 'bg-green-500'} hover:bg-green-800`}
                            >
                                {id ? 'Update ' : 'Buat '}user
                            </button>
                            <button
                                type="button"
                                className="bg-yellow-500 rounded-lg px-4 py-2 text-white hover:bg-yellow-800"
                                onClick={clearForm}
                            >
                                Clear
                            </button>
                        </div>
                    </form>
                </div>
                <hr className="my-4" />
                <List users={users} handleDelete={handleDelete} handleClickUpdate={handleClickUpdate} />
            </div>
        </Layout>
    );
}

export default UserList;
