import React, { Fragment, useEffect, useState } from 'react';
import { FaCalendarDays } from "react-icons/fa6";
import { format } from "date-fns";
import "./customStyles.css"
const GeneralTable = ({ datas, columns, renderExpandedRow, onDateChange, onSearchChange, placeholderSearch, functionButton, onEdit, onDelete}) => {
    const today = new Date().toISOString().split("T")[0];
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const defaultStartDate = sevenDaysAgo.toISOString().split("T")[0];
    const [value, setValue] = useState({
        expandedRow: [],
        filters: {},
        currentPage: 1,
        pageSize: 5,
        startDate: defaultStartDate,
        endDate: today,
        search: '',
        data: [] 
    });
    useEffect(() => {
        if (datas && Array.isArray(datas)) {
            setValue(prevValue => ({...prevValue, data: datas }));
        }
    }, [datas]); 
    const handleStartDateChange = (event) => {
        const newStartDate = event.target.value;
        setValue(prevValue => ({...prevValue, startDate: newStartDate, endDate: newStartDate > prevValue.endDate ? newStartDate : prevValue.endDate}));
        onDateChange(newStartDate, value.endDate);
    };

    const handleEndDateChange = (event) => {
        const newEndDate = event.target.value;
        setValue(prevValue => ({...prevValue, endDate: newEndDate < prevValue.startDate ? prevValue.startDate : newEndDate}));
        onDateChange(value.startDate, newEndDate);
    };

    const handleFilterChange = (key, value) => {
        setValue(prevValue => ({...prevValue, filters: { ...prevValue.filters, [key]: value }}));
    };

    const filteredData = Array.isArray(value?.data) && value.data?.length > 0 ? value?.data.filter((row) => Object.keys(value.filters).every((key) => !value.filters[key] || row[key].toString().includes(value.filters[key]))) : [];
    const getValueFilter = (key) => { return [...new Set(value?.data.map((item) => item[key]))] };
    
    const startIndex = (value.currentPage - 1) * value.pageSize;
    const resultData = filteredData.slice(startIndex, startIndex + value.pageSize);
    const totalPages = Math.ceil(filteredData.length / value.pageSize);

    const handlePageChange = (page) => {
        setValue(prevValue => ({ ...prevValue, currentPage: page }));
        setValue(prevValue => ({ ...prevValue, expandedRow: [] })); 
    };

    const handlePageSizeChange = (e) => {
        setValue(prevValue => ({...prevValue, pageSize: parseInt(e.target.value, 10), currentPage: 1}));
        setValue(prevValue => ({ ...prevValue, expandedRow: [] }));
    };

    const getPaginationRange = () => {
        const range = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) { range.push(i); }
        } else {
            if (value.currentPage <= 4) {
                range.push(1, 2, 3, 4, 5, '...', totalPages);
            } else if (value.currentPage > totalPages - 4) {
                range.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            } else {
                range.push(1, '...', value.currentPage - 1, value.currentPage, value.currentPage + 1, '...', totalPages);
            }
        }
        return range;
    };
    const handleIconClick = (id) => { document.getElementById(id).showPicker()};
    const handleRowClick = (index) => {
        if (value.expandedRow.includes(index)) {
            setValue(prevValue => ({...prevValue, expandedRow: prevValue.expandedRow.filter((rowIndex) => rowIndex !== index)}));
        } else {
            setValue(prevValue => ({...prevValue, expandedRow: [...prevValue.expandedRow, index]}));
        }
    };
    const handleIsFilters = () => {
        setValue(prevValue => ({...prevValue, expandedRow: []}));
    };
    const handleSearchChange = (event) => {
        setValue(prevValue => ({...prevValue, search: event.target.value}));
        onSearchChange(value.search)
    };
    return (
        <div className='py-10 my-auto px-5 flex flex-col max-h-screen'>
            <div className='flex justify-between mb-3'>
                <div className='max-w-md'>
                    {placeholderSearch && <div className="relative flex items-center w-full border border-gray-300 h-12 rounded-lg focus-within:shadow-lg transition-all duration-300 bg-white overflow-hidden ">
                        <div className="grid place-items-center h-full w-12 text-gray-300">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            value={value.search}
                            className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                            type="text"
                            id="search"
                            placeholder={placeholderSearch}
                            onChange={handleSearchChange}
                        />
                    </div>}
                </div>
                <div className='flex gap-2'>
                    {onDateChange && <div className="flex gap-4 mr-5">
                        <div className="relative">
                            <input
                                value={value.startDate}
                                onChange={handleStartDateChange}
                                type="date"
                                className="border outline-none border-gray-300 rounded-lg px-4 h-12 w-48 focus-within:shadow-lg transition-all duration-300 appearance-none"
                                placeholder="Ngày bắt đầu"
                                id="startDate"
                                max={today}
                            />
                            <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer" onClick={() => handleIconClick("startDate")}>
                                <FaCalendarDays className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                        <div className="relative">
                            <input
                                min={value.startDate}
                                max={today}
                                value={value.endDate}
                                onChange={handleEndDateChange}
                                type="date"
                                className="border outline-none border-gray-300 rounded-lg px-4 h-12 w-48 focus-within:shadow-lg transition-all duration-300 appearance-none"
                                placeholder="Ngày kết thúc"
                                id="endDate"
                            />
                            <div className="absolute inset-y-0 right-3 flex items-center cursor-pointer" onClick={() => handleIconClick("endDate")}>
                                <FaCalendarDays className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>}
                    {functionButton && <button className='cursor-pointer bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white h-12 px-4 border border-blue-500 hover:border-transparent rounded'>
                        {functionButton}
                    </button>}
                </div>
            </div>
            <div className="flex-grow overflow-auto min-h-[650px]">
                <table className='w-full table-auto'>
                    <thead className='sticky top-0 bg-gray-100 z-10'>
                        <tr>
                            {columns.map((column) => (
                                <th key={column.key} className='bg-gray-100/80 py-2.5 border-t border-b border-gray-200'>
                                    <div className={`${column.isFilterable ? "flex items-center justify-center" : ""}`}>
                                        <div className={`${column.isFilterable ? "flex flex-col items-start max-w-fit" : ""}`}>
                                            <div className='text-gray-500 font-semibold'>{column.label}</div>
                                            {column.isFilterable && (
                                                <select
                                                    className="outline-none w-auto"
                                                    value={value.filters[column.key] || ""}
                                                    onChange={(e) => {
                                                        handleFilterChange(column.key, e.target.value);
                                                        handleIsFilters();
                                                    }}
                                                >
                                                    <option value="">Tất cả</option>
                                                    {getValueFilter(column.key).map((value) => (
                                                        <option key={value} value={value}>{value}</option>
                                                    ))}
                                                </select>
                                            )}
                                        </div>
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='max-h-full'>
                        {resultData.map((row, index) => (
                            <Fragment key={index}>
                                <tr onClick={() => handleRowClick(index)}>
                                    {columns.map((column) => (
                                        <td key={column.key} className='py-2.5 border-b border-gray-200 text-center'>
                                            {column.render ? ( column.render(row)) 
                                            : column.key === "checkin" || column.key === "checkout" || column.key === "createdAt" ? (
                                                (() => {
                                                    const date = new Date(row[column.key]);
                                                    return format(date, "HH:mm, dd/MM/yyyy");
                                                })()
                                            ) : (
                                                row[column.key]
                                            )}
                                        </td>
                                    ))}
                                </tr>
                                {value.expandedRow && value.expandedRow.includes(index) && (
                                    <tr>
                                        <td colSpan={columns.length + 1} className="px-4 py-2 shadow-inner">
                                            <div>{renderExpandedRow(row)}</div>
                                        </td>
                                    </tr>
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between items-center bg-gray-100/80 rounded-b-xl p-3 mt-3">
                <div className="flex gap-2 items-center">
                    <label className="text-nowrap">Số dòng:</label>
                    <select
                        value={value.pageSize}
                        onChange={handlePageSizeChange}
                        className="h-auto border border-gray-300 text-gray-600 text-sm rounded-lg block w-full py-1 px-3 focus:outline-none"
                    >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={15}>15</option>
                    </select>
                </div>
                <div className="">
                    <button
                        className="disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 mr-2 px-2 py-1 rounded cursor-pointer font-semibold border border-gray-400 text-gray-500 transition-all"
                        disabled={value.currentPage === 1}
                        onClick={() => handlePageChange(value.currentPage - 1)}
                    >
                        {"< "} Trước
                    </button>
                    {getPaginationRange().map((page, index) => (
                        <button
                            key={index}
                            className={`mr-3 px-3 py-1 font-semibold rounded cursor-pointer ${value.currentPage === page ? "bg-blue-100 text-blue-500" : "text-gray-600 "}`}
                            disabled={page === '...'}
                            onClick={() => page !== '...' && handlePageChange(page)}
                        >
                            {page}
                        </button>
                    ))}
                    <button
                        className="disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-300 px-2 py-1 rounded cursor-pointer font-semibold border border-gray-400 text-gray-500 transition-all"
                        disabled={value.currentPage === totalPages}
                        onClick={() => handlePageChange(value.currentPage + 1)}
                    >
                        Sau {" >"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GeneralTable;
