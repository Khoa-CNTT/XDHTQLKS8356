import React, { useEffect, useRef, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { LuPencilLine } from "react-icons/lu";
import axios from "axios";
import toast from 'react-hot-toast';
import Button from "../../../components/Button";
const Content = ({ bookingDetail, data, selectedService, changeQuantityService, deleteServices, handleFetch, total }) => {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);
    const [showNote, setShowNote] = useState(false);
    const [note, setNote] = useState("");

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenu(false);
        }
    };
    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);


    const toggleModal = () => {
        setShowNote((prev) => !prev);
    };
    const saveNote = () => {
        setShowNote(false);
    };
    const handleClick = () => { };


    const handleQuantityChange = (e, service) => {
        let quantity = Number(e.target.value)
        if (quantity < 1) {
            e.target.value = 1
            quantity = 1
        }
        changeQuantityService({ id: service.ServiceId }, quantity)
    };

    const handleBookingServices = async () => {
        // const services = selectedService.map(({ service_name, ...rest }) => rest);
        // const orderService = await serviceService.putServices(services);
        // if (orderService.status) {
        //     toast.success(orderService.message);
        //     await handleFetch();
        //     deleteServices()
        // } else
        //     toast.error("Đặt dịch vụ không thành công!");
    };
console.log(bookingDetail)
    return (
        <div className="w-[70%] h-full flex flex-col justify-between ">
            {bookingDetail && data && (
                <>
                    <div className=" bg-gray-100/40 h-[98%] border border-1 border-gray-300 rounded-xl ">
                        <div className="p-4 min-h-[550px] border-b">
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex flex-col">
                                    <h2 className="text-xl font-semibold flex items-center gap-1">
                                        <div>{bookingDetail?.room_number}</div>
                                        <div>-</div>
                                        <div>{bookingDetail?.room_name}</div>
                                    </h2>
                                    <div
                                        className="flex gap-1 items-center text-gray-600 "
                                        onClick={toggleModal}
                                    >
                                        <LuPencilLine className="w-3 h-3" />
                                        <span className="text-xs break-words">
                                            Nhập ghi chú ...
                                        </span>
                                    </div>
                                    {showNote && (
                                        <div
                                            onClick={toggleModal}
                                            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50"
                                        >
                                            <div
                                                onClick={(e) => e.stopPropagation()}
                                                className="relative bg-white rounded-lg p-4 w-[400px] shadow-md"
                                            >
                                                <div
                                                    className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-all duration-300 cursor-pointer"
                                                    onClick={toggleModal}
                                                >
                                                    <button className="text-gray-400 hover:text-gray-600 focus:outline-none">
                                                        ✖
                                                    </button>
                                                </div>
                                                <h3 className="text-lg font-semibold mb-4">
                                                    Ghi chú
                                                </h3>
                                                <div className="relative w-full mb-3">
                                                    <textarea
                                                        className="transition-all duration-300 w-full outline-none border text-sm border-gray-200 bg-gray-100 focus-within:bg-white rounded-lg p-4 pl-10 resize-none focus:border-green-600 focus:ring-green-600 disabled:opacity-50 disabled:pointer-events-none focus:shadow-md dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                                        rows="8"
                                                        placeholder={
                                                            note === ""
                                                                ? "Nhập ghi chú..."
                                                                : ""
                                                        }
                                                        value={note}
                                                        onChange={(e) =>
                                                            setNote(e.target.value)
                                                        }
                                                    />
                                                    <LuPencilLine
                                                        className="absolute left-4 top-4 text-gray-400"
                                                        size={20}
                                                    />
                                                </div>
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                        onClick={toggleModal}
                                                    >
                                                        Bỏ qua
                                                    </button>
                                                    <button
                                                        className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                                        onClick={saveNote}
                                                    >
                                                        Lưu
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <div className="relative flex gap-2 items-center">
                                    <Button size="xs" color="blue">
                                        Trả phòng
                                    </Button>
                                    <div
                                        onClick={() => setShowMenu((prev) => !prev)}
                                        className="cursor-pointer hover:bg-gray-200 hover:rounded-full focus-within:bg-gray-600 w-8 h-8 flex items-center justify-center"
                                    >
                                        <BsThreeDots className="w-5 h-5 " />
                                    </div>
                                    {showMenu && (
                                        <div
                                            className="absolute top-full right-0 mt-2 bg-white border rounded-md shadow-lg z-50 w-40"
                                            onBlur={handleClickOutside}
                                            ref={menuRef}
                                        >
                                            <ul className="text-sm">
                                                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                                                    Đổi phòng
                                                </li>
                                                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                                                    Ghép đoàn
                                                </li>
                                                <li className="p-2 hover:bg-gray-100 cursor-pointer">
                                                    Trở về trạng thái trước
                                                </li>
                                                <li className="p-2 hover:bg-gray-100 cursor-pointer text-red-500">
                                                    Xóa phòng
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="border rounded-md p-4 bg-gray-50 flex shadow-md items-end gap-2">
                                    <div className="">
                                        <p className="text-xs text-gray-600 mb-1">
                                            Họ và tên
                                        </p>
                                        <div className="border rounded-md px-5 py-2 outline-none text-xs bg-gray-100 min-w-32">
                                            {data.fullname || ""}
                                        </div>
                                    </div>
                                    <div className="">
                                        <p className="text-xs text-gray-600 mb-1">
                                            Số điện thoại
                                        </p>
                                        <div className="border rounded-md px-5 py-2 outline-none text-xs bg-gray-100 min-w-32">
                                            {data.phone || ""}
                                        </div>
                                    </div>
                                    <div className="mt-2 flex flex-col gap-4">
                                        <div className="flex justify-between items-center gap-2">
                                            <div>
                                                <p className="text-xs text-gray-600 mb-1">
                                                    Nhận phòng
                                                </p>
                                                <input
                                                    type="date"
                                                    value={data.checkin || ""}

                                                    className={`border rounded-md px-4 py-2 text-xs outline-none bg-white`}
                                                />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-600 mb-1">
                                                    Trả phòng
                                                </p>
                                                <input
                                                    type="date"
                                                    value={data.checkout || ""}
                                                    className={`border rounded-md px-4 py-2 text-xs outline-none bg-white`}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <p className="text-xs text-gray-600 mb-1">
                                            Lưu trú
                                        </p>
                                        <div className="border rounded-md px-5 py-2 outline-none text-xs bg-gray-100 min-w-32">
                                            {(data.total_day || "") + ' ngày'}
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="max-h-80 overflow-y-auto rounded-md relative [&::-webkit-scrollbar]:w-2
                                [&::-webkit-scrollbar-track]:bg-gray-100
                                [&::-webkit-scrollbar-thumb]:bg-gray-300
                                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                                >
                                    <table className="table-auto w-full">
                                        <thead>
                                            <tr className="">
                                                <th className="text-left p-2 font-semibold">
                                                    STT
                                                </th>
                                                <th className="text-left py-4 font-semibold">
                                                    Hạng mục
                                                </th>
                                                <th className="text-center py-4 font-semibold">
                                                    Số lượng
                                                </th>
                                                <th className="text-right py-4 font-semibold">
                                                    Đơn giá
                                                </th>
                                                <th className="text-right p-4 pr-2 font-semibold">
                                                    Thành tiền
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="text-sm">
                                            {bookingDetail ? (
                                                <React.Fragment>
                                                    <tr className="bg-blue-100/60">
                                                        <td className="p-2 ">1</td>
                                                        <td className="py-4">{bookingDetail.room_name}</td>
                                                        <td className="text-center py-4">1</td>
                                                        <td className="text-right py-4">{bookingDetail.price.toLocaleString()}</td>
                                                        <td className="text-right py-4 pr-2">{bookingDetail.price.toLocaleString()}</td>
                                                    </tr>
                                                    {Array.isArray(bookingDetail.services) && bookingDetail.services.length > 0 && (
                                                        bookingDetail.services.map((service, serviceIndex) => (
                                                            <tr key={serviceIndex} className="bg-blue-100/35">
                                                                <td className="p-2">{`${serviceIndex + 2}`}</td>
                                                                <td className="py-4">{service.service_name}</td>
                                                                <td className="text-center py-4">{service.quantity}</td>
                                                                <td className="text-right py-4">{service.price.toLocaleString()}</td>
                                                                <td className="text-right py-4 pr-2">{service.total_price.toLocaleString()}</td>
                                                            </tr>
                                                        ))
                                                    )}
                                                    {selectedService.length > 0 && (
                                                        selectedService.filter((service) => service.BookingDetailId === bookingDetail.booking_detail_id)
                                                            .map((service, serviceIndex) => (
                                                                <tr key={serviceIndex} className="">
                                                                    <td className="p-2">{`${(bookingDetail?.services?.length ?? 0) + serviceIndex + 2}`}</td>
                                                                    <td className="py-4">{service.service_name}</td>
                                                                    <td className="text-center py-4">
                                                                        <input
                                                                            type="number"
                                                                            required
                                                                            defaultValue={service.quantity}
                                                                            onBlur={(e) => handleQuantityChange(e, service)}
                                                                            className="text-center rounded-t-lg p-1 w-12 text-sm text-gray-900 dark:bg-gray-700 border-0 border-b-[2px] border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 focus:border-b-2 peer"
                                                                        />
                                                                    </td>
                                                                    <td className="text-right py-4">{service.price?.toLocaleString() || "0"}</td>
                                                                    <td className="text-right py-4 pr-2">
                                                                        {((Number(service.quantity) || 1) * Number(service.price || 0)).toLocaleString()}
                                                                    </td>
                                                                </tr>
                                                            ))
                                                    )}
                                                </React.Fragment>
                                            ) : (
                                                ""
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end w-full">
                            <div className="w-1/3 rounded-b-xl bg-white shadow-current text-sm text-green-700 font-semibold">
                                <table className="table-auto w-full border-collapse">
                                    <tbody>
                                        <tr className="">
                                            <td className="p-2 text-left">Tổng tiền</td>
                                            <td className="p-2 text-right">
                                                {(
                                                    (total.service[bookingDetail.booking_detail_id] || 0) + (total.paid[bookingDetail.booking_detail_id] || 0)
                                                ).toLocaleString()}
                                            </td>
                                        </tr>
                                        <tr className="">
                                            <td className="px-2 text-left">Đã thanh toán</td>
                                            <td className="px-2 text-right">
                                                {(
                                                    total.paid[bookingDetail.booking_detail_id] || 0
                                                ).toLocaleString()}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-2 text-left">Còn lại</td>
                                            <td className="p-2 text-right">
                                                {(
                                                    total.service[bookingDetail.booking_detail_id] || 0
                                                ).toLocaleString()}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="gap-2 mt-4 w-full p-4 h-[2%] border border-1 border-gray-300 rounded-xl flex justify-end items-center">
                        <Button
                            color="green"
                            children="Lưu"
                            size="sm"
                            border={false}
                            id="info-price"
                            handleClick={handleBookingServices}
                        ></Button>
                        <Button
                            color="green"
                            children="Thanh toán"
                            size="sm"
                            border={false}
                            id="info-price"
                            handleClick={handleClick}
                        ></Button>
                    </div>

                </>
            )}
        </div>
    );
};

export default Content;
