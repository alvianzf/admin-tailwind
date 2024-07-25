import React, { useState, useMemo } from 'react';
import { useTable, useSortBy, usePagination } from 'react-table';

function List({ users = [], handleDelete, handleClickUpdate }) {
    const [search, setSearch] = useState('');

    // Filter the data based on the search input
    const filteredUsers = useMemo(() => {
        if (!users) return []; // Return an empty array if users is null or undefined
        return users.filter(user =>
            user.username.toLowerCase().includes(search.toLowerCase())
        );
    }, [users, search]);

    // Define columns for the table
    const columns = useMemo(() => [
        {
            Header: 'Username',
            accessor: 'username'
        },
        {
            Header: 'Admin',
            accessor: 'isAdmin',
            Cell: ({ value }) => (value ? 'Yes' : 'No')
        },
        {
            Header: 'Actions',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div className="flex justify-around space-x-2">
                    <button
                        className="text-teal-500 font-bold py-1 hover:text-teal-700"
                        onClick={() => handleClickUpdate(row.original._id, row.original.username)}
                    >
                        <i className="fas fa-pen text-xs"></i>
                    </button>
                    <button
                        className="text-red-500 font-bold py-1 hover:text-red-700"
                        onClick={() => handleDelete(row.original._id, row.original.username)}
                    >
                        <i className="fas fa-trash text-xs"></i>
                    </button>
                </div>
            )
        }
    ], [handleDelete, handleClickUpdate]);

    // Initialize table hooks
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable(
        {
            columns,
            data: filteredUsers, // Use filteredUsers here
            initialState: { pageIndex: 0, pageSize: 5 },
        },
        useSortBy,
        usePagination
    );

    return (
        <div className="w-full">
            <div className="mb-4 flex items-center">
                <input
                    type="text"
                    placeholder="Search by username..."
                    className="border border-teal-300 rounded-md px-4 py-2"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <table className="w-full border-collapse border border-gray-200" {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} className="bg-teal-100 border-b border-gray-300">
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} className="px-4 py-2 text-left cursor-pointer">
                                    {column.render('Header')}
                                    <span>
                                        {column.isSorted
                                            ? column.isSortedDesc
                                                ? ' 🔽'
                                                : ' 🔼'
                                            : ''}
                                    </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.length ? page.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className="border-b border-gray-200">
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()} className="px-4 py-2">
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    }) : (
                        <tr>
                            <td colSpan={columns.length} className="px-4 py-2 text-center">No users available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="flex justify-between items-center mt-4">
                <div className="text-sm">
                    Page {pageIndex + 1} of {pageOptions.length}
                </div>
                <div className="flex space-x-2">
                    <button
                        onClick={() => gotoPage(0)}
                        disabled={!canPreviousPage}
                        className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
                    >
                        {'<<'}
                    </button>
                    <button
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                        className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
                    >
                        {'<'}
                    </button>
                    <button
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                        className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
                    >
                        {'>'}
                    </button>
                    <button
                        onClick={() => gotoPage(pageOptions.length - 1)}
                        disabled={!canNextPage}
                        className="bg-teal-500 text-white px-4 py-2 rounded-md hover:bg-teal-600"
                    >
                        {'>>'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default List;
