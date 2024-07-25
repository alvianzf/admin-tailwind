import React, { useContext, useMemo, useState, useCallback } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import { formatDate, formatNominal } from '../../../utils/formatNumber';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SweetAlert2 from 'react-sweetalert2';
import { BookingContext } from '../../../contexts/BookData/BookDataContext';

const BookDataTable = ({ bookData, searchInput }) => {
    const [swalProps, setSwalProps] = useState({});
    const { issueTicket, deleteBooking } = useContext(BookingContext);

    const handleCheck = useCallback((bookingCode) => {
        window.open(`https://tiketq.com/eticket?bookingno=${bookingCode}`, '_blank');
    }, []);

    const handleDelete = useCallback((id, bookingCode) => {
        setSwalProps({
            show: true,
            title: 'Hapus booking ini?',
            text: `Booking code: ${bookingCode}`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Hapus',
            preConfirm: async () => {
                try {
                    await deleteBooking(id);
                    toast.success(`Berhasil menghapus ${bookingCode}`);
                } catch (error) {
                    toast.error("Gagal menghapus data");
                }
            },
            willClose: () => setSwalProps({})
        });
    }, [deleteBooking]);

    const handleIssue = useCallback(async (bookingCode, nominal) => {
        try {
            const response = await issueTicket({ bookingCode, nominal });
            toast.success(response.msg);
        } catch (err) {
            toast.error(err.message);
        }
    }, [issueTicket]);

    const columns = useMemo(() => [
        {
            Header: 'Status',
            accessor: 'payment_status',
            Cell: ({ value }) => (value ? 'Issued' : 'Book')
        },
        {
            Header: '',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div className="flex space-x-2">
                    <button
                        onClick={() => handleIssue(row.original.bookingCode, row.original.nominal)}
                        className="text-blue-500 hover:text-blue-700"
                        aria-label="Issue Ticket"
                    >
                        <i className='fa fa-check'></i>
                    </button>
                    <button
                        onClick={() => handleCheck(row.original.bookingCode)}
                        className="text-green-500 hover:text-green-700"
                        aria-label="Check Ticket"
                    >
                        <i className="fa fa-plane"></i>
                    </button>
                    <button
                        onClick={() => handleDelete(row.original._id, row.original.bookingCode)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="Delete Booking"
                    >
                        <i className='fa fa-trash'></i>
                    </button>
                </div>
            )
        },
        { Header: 'Booking No', accessor: 'bookingCode' },
        { Header: 'Nominal', accessor: 'nominal', Cell: ({ value }) => formatNominal(value) },
        { Header: 'Berangkat', accessor: 'departureDate', Cell: ({ value }) => formatDate(value) },
        { Header: 'Asal', accessor: 'origin' },
        { Header: 'Tujuan', accessor: 'destination' },
        { Header: 'No. HP', accessor: 'mobile_number' },
        { Header: 'Nama', accessor: 'name' },
        { Header: 'Tgl Booking', accessor: 'book_date', Cell: ({ value }) => formatDate(value) },
    ], [handleCheck, handleDelete, handleIssue]);

    const filteredData = useMemo(() => {
        if (searchInput) {
            return bookData.filter(row =>
                Object.values(row).some(val =>
                    String(val).toLowerCase().includes(searchInput.toLowerCase())
                )
            );
        }
        return bookData;
    }, [bookData, searchInput]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable(
        {
            columns,
            data: filteredData,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        useGlobalFilter,
        usePagination
    );

    return (
        <div className="w-full overflow-x-auto">
            <SweetAlert2 {...swalProps} onConfirm={() => setSwalProps({})} onCancel={() => setSwalProps({})} />
            <table {...getTableProps()} className="min-w-full bg-white border border-gray-200">
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()} className="bg-teal-100 border-b border-gray-300 text-xs">
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} className="px-4 py-2 text-left">
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
                            <tr {...row.getRowProps()} className="border-b text-xs">
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()} className="px-4 py-2">
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    }) : (
                        <tr>
                            <td colSpan={columns.length} className="px-4 py-2 text-center">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="pagination flex justify-between items-center mt-4 w-full sm:w-1/2 md:w-1/4">
                <button
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                    className="bg-teal-500 text-white px-2 py-1 rounded-md hover:bg-teal-600 disabled:opacity-50 text-xs"
                >
                    {'<<'}
                </button>
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    className="bg-teal-500 text-white px-2 py-1 rounded-md hover:bg-teal-600 disabled:opacity-50 text-xs"
                >
                    {'<'}
                </button>
                <span className="text-xs">
                    <strong>
                        {pageIndex + 1} dari {pageOptions.length}
                    </strong>
                </span>
                <button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    className="bg-teal-500 text-white px-2 py-1 rounded-md hover:bg-teal-600 disabled:opacity-50 text-xs"
                >
                    {'>'}
                </button>
                <button
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                    className="bg-teal-500 text-white px-2 py-1 rounded-md hover:bg-teal-600 disabled:opacity-50 text-xs"
                >
                    {'>>'}
                </button>
                <select
                    value={pageSize}
                    onChange={e => setPageSize(Number(e.target.value))}
                    className="p-1 border rounded text-xs"
                >
                    {[10, 20, 30, 40, 50].map(size => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div>

        </div>
    );
};

export default BookDataTable;
