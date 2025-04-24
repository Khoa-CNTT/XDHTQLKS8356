import React, { useEffect, useState } from "react";
import { orderServices } from "../../../service/orderServices";
import { MdDeleteForever } from "react-icons/md";
import GeneralTable from "../../../components/GeneralTable";

const ListOrder = () => {
    const columns = [
        { key: "booking_id", label: "Mã đặt phòng" },
        { key: "booking_status", label: "Trạng thái", isFilterable: true},
        { key: "createdAt", label: "Thời gian đặt" },
        { key: "checkin", label: "Thời gian nhận phòng" },
        { key: "checkout", label: "Thời gian trả phòng" },
        { key: "fullname", label: "Khách hàng", isFilterable: true },
        { key: "total_price", label: "Tổng tiền hàng" },
        {
            key: "button",
            label: "Xóa",
            render: (row) => (
                <button
                    onClick={(event) => handleDeleteOrder(event, row)}
                    className="z-10 text-center mx-auto p-2 hover:bg-slate-200 hover:rounded-md"
                >
                    <MdDeleteForever className="h-6 w-6" />
                </button>
            ),
        },
    ];
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchData, setSearchData] = useState('');
    const [data, setData] = useState([]);
    const fetchStores = async (startDate, endDate) => {
        const result = await orderServices.getOrders(startDate, endDate);
        setData(result);
    };

    useEffect(() => {
        fetchStores(startDate, endDate);
    }, [startDate, endDate]);
    const handleDateChange = (newStartDate, newEndDate) => {
        setStartDate(newStartDate);
        setEndDate(newEndDate);
    };
    const handleSearchChange = (value) => {
        setSearchData(value)
    };
    const renderExpandedRow = (row) => {
        return (
            <div>
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
                                    <tr key={`${detail}-room`} className="bg-blue-100/70">
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
                                    <td colSpan="3" className="border border-gray-300 px-4 py-2 text-right">Tổng cộng:</td>
                                    <td className="border border-gray-300 px-4 py-2 text-right">{row.total_price.toLocaleString()} VND</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            </div>
        );
    };
    const handleDeleteOrder = (event, row) => {
        event.stopPropagation();
        console.log("Editing service for booking:", row.booking_id);
       
    };
    return (
        <>
            <GeneralTable
                datas={data}
                columns={columns}
                renderExpandedRow={renderExpandedRow}
                onDateChange={handleDateChange}
                onSearchChange={handleSearchChange}
                placeholderSearch="Nhập đơn hàng"
                functionButton="Thêm đơn hàng"
                onDelete={handleDeleteOrder}
            >
            </GeneralTable>
        </>
    );
};

export default ListOrder;
