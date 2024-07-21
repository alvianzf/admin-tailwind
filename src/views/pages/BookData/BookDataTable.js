import React, { useMemo } from 'react';
import { useTable, useGlobalFilter, usePagination } from 'react-table';
import { formatDate, formatNominal } from '../../../utils/formatNumber';
// import { Tooltip } from 'react-tooltip';
import { issueTicket } from '../../../services/BookDataService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function BookDataTable({ bookData, searchInput }) {
    const navigate = useNavigate();
    const columns = useMemo(() => [
        { Header: 'Status', accessor: 'payment_status', Cell: ({ value }) => (value ? 'Issued' : 'Book') },
        {
            Header: '',
            accessor: 'actions',
            Cell: ({ row }) => (
                <div className="flex space-x-2">
                    <button
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Issue tiket"
                        onClick={() => handleIssue(row.original.bookingCode, row.original.nominal)}
                        className="text-blue-500"
                    >
                        <i className='fa fa-check'></i>
                    </button>
                    <button
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Check tiket"
                        onClick={() => handleCheck(row.original.bookingCode)}
                        className="text-green-500"
                    >
                        <i className="fa fa-plane"></i>
                    </button>
                    <button
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Hapus data"
                        onClick={() => handleDelete(row.original._id)}
                        className="text-red-500"
                    >
                        <i className='fa fa-trash'></i>
                    </button>
                    {/* <Tooltip id="my-tooltip" /> */}
                    <ToastContainer />
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
    ], []);

    const handleDelete = (id) => {
        console.log('delete', id);
        toast.success("Deleted" + id);
    };

    const handleCheck = (bookingCode) => {
        const url = `https://tiketq.com/eticket?bookingno=${bookingCode}`;
        window.open(url, '_blank');
    };
    

    const handleIssue = async (bookingCode, nominal) => {
        try {
            const response = await issueTicket({ bookingCode, nominal });
            toast.success(response.msg);
        } catch (err) {
            toast.error(err);
        }
    };

    const data = useMemo(() => {
        if (searchInput) {
            return bookData.filter(row =>
                Object.values(row).some(
                    val => String(val).toLowerCase().includes(searchInput.toLowerCase())
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
            data,
            initialState: { pageIndex: 0, pageSize: 10 },
        },
        useGlobalFilter,
        usePagination
    );

    return (
        <div className="overflow-x-auto">
            <table {...getTableProps()} className="min-w-full bg-white border">
                <thead>
                    {headerGroups.map((headerGroup, i) => (
                        <tr key={i} {...headerGroup.getHeaderGroupProps()} className="bg-gray-200 text-xs">
                            {headerGroup.headers.map(column => (
                                <th key={column.id} {...column.getHeaderProps()} className="p-2 border text-left">
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {page.reverse().map((row) => {
                        prepareRow(row);
                        return (
                            <tr key={row.original._id} {...row.getRowProps()} className="border-b text-xs">
                                {row.cells.map(cell => (
                                    <td key={cell.column.id} {...cell.getCellProps()} className="p-2 border">
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <div className="pagination flex justify-between items-center mt-4 w-full sm:w-1/2 md:w-1/4">
                <button
                    onClick={() => gotoPage(0)}
                    disabled={!canPreviousPage}
                    className="p-2 border rounded disabled:opacity-50"
                >
                    {'<<'}
                </button>
                <button
                    onClick={() => previousPage()}
                    disabled={!canPreviousPage}
                    className="p-2 border rounded disabled:opacity-50"
                >
                    {'<'}
                </button>
                <span>
                    <strong className='text-xs'>
                        {pageIndex + 1} dari {pageOptions.length}
                    </strong>{' '}
                </span>
                <button
                    onClick={() => nextPage()}
                    disabled={!canNextPage}
                    className="p-2 border rounded disabled:opacity-50"
                >
                    {'>'}
                </button>
                <button
                    onClick={() => gotoPage(pageCount - 1)}
                    disabled={!canNextPage}
                    className="p-2 border rounded disabled:opacity-50"
                >
                    {'>>'}
                </button>
                <select
                    value={pageSize}
                    onChange={e => setPageSize(Number(e.target.value))}
                    className="p-2 border rounded text-xs"
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
}

export default BookDataTable;
