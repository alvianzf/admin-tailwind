import React from 'react';

function List({ users, handleDelete }) {
    return (
        <div className='w-full'>
            <table className='w-full border-collapse border border-gray-200'>
                <thead>
                    <tr className='bg-gray-100 border-b border-gray-300'>
                        <th className='px-4 py-2 text-left'>Username</th>
                        <th className='px-4 py-2 text-left'>Admin</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.length > 0 ? (
                        users.map(user => (
                            <tr key={user._id}>
                                <td className='px-4 py-2 border-b border-gray-200'>{user.username}</td>
                                <td className='px-4 py-2 border-b border-gray-200'>{user.isAdmin ? 'Yes' : 'No'}</td>
                                <td className='flex justify-around px-4 py-2 border-b border-gray-200'>
                                    <button className='text-green-500 font-bold py-1 hover:text-green-900'>
                                        <i className='fas fa-pen text-xs '></i>
                                    </button>
                                    <button className='text-red-500 font-bold py-1 hover:text-red-900' onClick={() => handleDelete(user._id)}>
                                        <i className='fas fa-trash text-xs '></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" className='px-4 py-2 text-center'>No users available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default List;
