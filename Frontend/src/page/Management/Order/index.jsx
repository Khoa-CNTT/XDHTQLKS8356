import React, { useEffect, useState } from "react";

import { AiFillPrinter } from "react-icons/ai";
import { MdAddCircleOutline } from "react-icons/md";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
// import phieuNhapData from "./data"; // Dữ liệu phiếu nhập
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from "../../../components/Table";

const ListOrder = () => {
    const [expandedRow, setExpandedRow] = useState([]);

    const columns = [
        { key: "booking_id", label: "Mã đặt phòng" },
        { key: "booking_status", label: "Trạng thái", isFilterable: true},
        { key: "createdAt", label: "Thời gian đặt" },
        { key: "checkin", label: "Thời gian nhận phòng" },
        { key: "checkout", label: "Thời gian trả phòng" },
        { key: "fullname", label: "Khách hàng", isFilterable: true },
        { key: "total_price", label: "Tổng tiền hàng" }
    ];
    const today = new Date().toISOString().split("T")[0];
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const defaultStartDate = sevenDaysAgo.toISOString().split("T")[0];
    const [startDate, setStartDate] = useState(defaultStartDate); // Ngày bắt đầu
    const [endDate, setEndDate] = useState(today);
    const [data, setData] = useState([]);
    const fetchStores = async (startDate, endDate) => {
        console.log(startDate, endDate);
        // if (startDate && endDate) {
        //     try {
        //         const response = await axios.get(
        //             `http://localhost:8080/api/receptionist/booking?start='${startDate}'&end='${endDate}'`,
        //             {
        //                 withCredentials: true,
        //             }
        //         );

        //         if (response.data.status === true) {
        //             console.log("11111")
        //             setData(response.data.room);
        //             console.log("đã set", response.data.room);
        //         }
        //     } catch (error) {
        //         console.error(error);
        //     }
        // }
    };
    useEffect(() => {
        fetchStores(startDate, endDate);
    }, [startDate, endDate]);
    const handleDateChange = (newStartDate, newEndDate) => {
        setStartDate(newStartDate);
        setEndDate(newEndDate);
    };
    const handleRowClick = (index) => {
        if (expandedRow.includes(index)) {
            setExpandedRow(
                expandedRow.filter((rowIndex) => rowIndex !== index)
            );
        } else {
            setExpandedRow([...expandedRow, index]);
        }
    };

    const handleIsFilters = () => {
        setExpandedRow([]);
    };

    const handlePrint = (row) => {
        console.log("In phiếu nhập:", row.maPhieu);
    };

    const handlePageChange = () => {
        setExpandedRow([]);
    };

    const renderExpandedRow = (row) => {
        console.log("hàng", row);
        return (
            <div
                className={`transition-all duration-300 ${
                    expandedRow === null
                        ? "animate-fade-out"
                        : "animate-fade-in-down"
                }`}
            >
                 <div className="">
                    <h3 className="font-bold text-lg mb-2">Chi tiết đặt phòng:</h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Tên Phòng/Dịch Vụ</th>
                                <th className="border border-gray-300 px-4 py-2">Số Lượng</th>
                                <th className="border border-gray-300 px-4 py-2">Giá</th>
                                <th className="border border-gray-300 px-4 py-2">Tổng Giá</th>
                                </tr>
                            </thead>
                            <tbody>
                                {row.details.map((detail, detailIndex) => (
                                <>
                                    <tr
                                    key={`${detail}-room`}
                                    className="bg-blue-100/70"
                                    >
                                    <td className="border border-gray-300 px-4 py-2">
                                        {detail.room_name} (Số phòng: {detail.room_number})
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-center">1</td>
                                    <td className="border border-gray-300 px-4 py-2 text-right">
                                        {detail.price.toLocaleString()} VND
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-right">
                                        {detail.price.toLocaleString()} VND
                                    </td>
                                    </tr>
                                    {detail.services && detail.services.map((service, serviceIndex) => (
                                        <tr
                                            key={`${detail}-room`}
                                        className="bg-white"
                                        >
                                        <td className="border border-gray-300 px-4 py-2 ">
                                            {service.service_name}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {service.quantity}
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-right">
                                            {service.price.toLocaleString()} VND
                                        </td>
                                        <td className="border border-gray-300 px-4 py-2 text-right">
                                            {service.total_price.toLocaleString()} VND
                                        </td>
                                        </tr>
                                    ))}
                                </>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="font-bold">
                                    <td colSpan="3" className="border border-gray-300 px-4 py-2 text-right">
                                    Tổng cộng:
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 text-right">
                                    {row.total_price.toLocaleString()} VND
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        );
    };
    const navigate = useNavigate();
    const handleAdd = () => {
        navigate("/store-receipt");
    };
    return (
        <>
            <Table
                title="Đơn đặt phòng"
                // contentButton="Thêm phiếu nhập"
                // handleAdd={handleAdd}
                columns={columns}
                labelFilter="Lọc"
                handleFetch={fetchStores}
                data={data}
                expandedRow={expandedRow}
                onRowClick={handleRowClick}
                onPageChange={handlePageChange}
                renderExpandedRow={renderExpandedRow}
                handleIsFilters={handleIsFilters}
                startDate={startDate}
                endDate={endDate}
                onDateChange={handleDateChange}
            />
        </>
    );
};

export default ListOrder;
