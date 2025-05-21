import React, { useEffect, useState } from "react";
import GeneralTable from "../../../components/GeneralTable";
import { bookingService } from "../../../service/bookingService";
import BookingService from "../BookingService";
import { format } from "date-fns";
const BookingManager = () => {
    const columns = [
        { key: "booking_id", label: "Mã đặt phòng" },
        { key: "fullname", label: "Tên khách hàng" },
        { key: "booking_status", label: "Trạng thái", isFilterable: true},
        { key: "created_at", label: "Thời gian đặt" },
        { key: "booking_status", label: "Trạng thái" },
        { key: "total_price", label: "Tổng tiền" },
        {
            key: "booking_services",
            label: "Đặt dịch vụ",
            
        },
        {
            key: "update_status",
            label: "Cập nhật trạng thái",
        },
    ];
    const [open, setOpen] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [searchData, setSearchData] = useState('');
    const [data, setData] = useState([]);
    const fetchBooking = async (startDate, endDate) => {
        const result = await bookingService.getBookingAdmin(startDate, endDate)
        setData(result);
    };

    useEffect(() => {
        fetchBooking(startDate, endDate);
    }, [startDate, endDate]);
    const handleDateChange = (newStartDate, newEndDate) => {
        console.log("New dates:", newStartDate, newEndDate);
        setStartDate(newStartDate);
        setEndDate(newEndDate);
    };
    const handleSearchChange = (value) => {
        setSearchData(value)
    };
    const renderExpandedRow = (row) => {
        console.log("hàng",row)
        return (
            <div>
                 <div className="">
                    <h3 className="font-bold text-lg mb-2">Chi tiết đặt phòng:</h3>
                    <div className="flex gap-30 text-base mb-2">
                        <div>Khách hàng: {row.fullname} </div>
                        <div>Số điện thoại: {row.phone} </div>

                    </div>
                    <div className="flex gap-20 text-base mb-4">
                        <div>Ngày đến: {format(row.checkin, "dd/MM/yyyy")} </div>
                        <div>Ngày đi: {format(row.checkout, "dd/MM/yyyy")}  </div>
                        <div>Số ngày ở: {row.total_day}  </div>
                    </div>
                    <div className="overflow-x-auto">
                    <>
                        <table className="min-w-full border-collapse border border-gray-300 mb-6">
                            <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2">Tên Phòng</th>
                                <th className="border border-gray-300 px-4 py-2">Số Phòng</th>
                                <th className="border border-gray-300 px-4 py-2">Giá</th>
                            </tr>
                            </thead>
                            <tbody>
                            {row.details.map((detail, index) => (
                                <tr key={index} className="">
                                <td className="border border-gray-300 px-4 py-2">{detail.room_type}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{detail.room_number}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">
                                    {detail.price.toLocaleString()} VND
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <table className="min-w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">Tên Dịch Vụ</th>
                            <th className="border border-gray-300 px-4 py-2">Số Lượng</th>
                            <th className="border border-gray-300 px-4 py-2">Giá</th>
                            <th className="border border-gray-300 px-4 py-2">Tổng Giá</th>
                            <th className="border border-gray-300 px-4 py-2">Thời Gian</th>
                            </tr>
                        </thead>
                        <tbody>
                        {(!row.services || row.services.length === 0 || row.services.every(s => !s.service_name)) ? (
                            <tr>
                            <td colSpan="5" className="text-center text-gray-600 italic py-4">
                                Chưa đặt dịch vụ nào
                            </td>
                            </tr>
                        ) : (
                            row.services.map((service, index) => (
                            <tr key={index} className="bg-white">
                                <td className="border border-gray-300 px-4 py-2">{service.service_name ?? "—"}</td>
                                <td className="border border-gray-300 px-4 py-2 text-center">{service.quantity ?? "—"}</td>
                                <td className="border border-gray-300 px-4 py-2 text-right">
                                {typeof service.price === "number" ? service.price.toLocaleString() + " VND" : "—"}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-right">
                                {typeof service.total_price === "number" ? service.total_price.toLocaleString() + " VND" : "—"}
                                </td>
                                <td className="border border-gray-300 px-4 py-2 text-center">
                                {service.created_at ? format(service.created_at, "HH:mm, dd/MM/yyyy") : "—"}
                                </td>
                            </tr>
                            ))
                        )}
                        </tbody>

                        <tfoot>
                            <tr className="font-bold">
                            <td colSpan="3" className="border border-gray-300 px-4 py-2 text-right">
                                Tổng cộng dịch vụ:
                            </td>
                            <td className="border border-gray-300 px-4 py-2 text-right">
                                {row.services
                                .reduce((total, service) => total + (typeof service.total_price === "number" ? service.total_price : 0), 0)
                                .toLocaleString()} VND
                            </td>
                            <td className="border border-gray-300 px-4 py-2"></td>
                            </tr>
                        </tfoot>
                        </table>
                        </>

                    </div>
                </div>
            </div>
        );
    };
    const handleDeleteOrder = (event, row) => {
        event.stopPropagation();
       
    };
    const [selectedRow, setSelectedRow] = useState(null);

    const handleBookingService = (row) => {
        setSelectedRow(row);
        setOpen(true);
    };
    const handleUpdateStatus = (row) => {
      console.log("row",row)
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
                onRowClick={handleBookingService}
                onUpdateStatusClick={handleUpdateStatus}
            >
            </GeneralTable>
            {open && <BookingService
                fetchBooking={() => fetchBooking(startDate, endDate)}
                isOpen={open}
                onClose={() => setOpen(false)}
                dataRow={selectedRow}
            ></BookingService>}
        </>
    );
};

export default BookingManager;
