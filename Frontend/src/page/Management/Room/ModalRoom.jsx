import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { BsImageFill } from "react-icons/bs";
import axios from "axios";
import toast from 'react-hot-toast';
import { roomService } from "../../../service/roomService";
const ModalRoom = ({ handleClose, lable, handleSubmit, data, resetTrigger, functionButton}) => {
    console.log("dữ liệu:", data)
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState([]);
    const [formData, setFormData] = useState({
        roomNumber: "",
        description: "",
        roomID: "",
        roomType: [],

    });
    const fetchRoomType = async () => {
        const result = await roomService.getRoomType();
        console.log("ok",result)
        setFormData(prev => ({...prev, roomType: result}));
    };

    useEffect(() => {
        fetchRoomType();
    }, []);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    useEffect(() => {
        if (data) {
            setFormData({
                roomNumber: data.room_number || "",
                description: data.description || "",
                roomID: data.room_id || "",
                roomType: data.room_type || [], 
            });
        } else {
            setFormData({
                roomNumber: "",
                description: "",
                roomID: "",
                roomType: [],
            });
        }
    }, [data, resetTrigger]);
    return (
        <div className="relative h-full">
            <div
                className=" rounded-lg h-[90%] overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
            >
                <div className="flex items-center justify-between p-5 bg-gray-200">
                    <div className="text-2xl font-bold text-center">
                        {lable}
                    </div>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="px-10 py-5 bg-white w-full">
                    <div className="flex gap-8 w-full">
                        <div className="w-full flex flex-col justify-between">
                            <div className="mb-4 flex items-center">
                                <label className="text-sm font-medium text-gray-700 text-nowrap w-44">
                                    Số phòng
                                </label>
                                <input
                                    type="text"
                                    name="roomNumber"
                                    placeholder="Nhập số phòng"
                                    className="rounded-t-lg p-2 w-full text-sm text-gray-900 dark:bg-gray-700 border-0 border-b-[2px] border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-b-2 peer"
                                    value={formData.roomNumber}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-4 flex items-center">
                                <label className="text-sm font-medium text-gray-700 text-nowrap w-44">
                                    Loại phòng
                                </label>
                                <select
                                    name="roomID"
                                    value={formData.roomID}
                                    onChange={handleChange}
                                    className="focus:outline-none px-1 py-3 block w-full text-sm text-gray-900 dark:bg-gray-700 border-0 border-b-[2px] border-gray-400 dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:ring-0 focus:border-blue-600 focus:border-b-2 peer"
                                >
                                    <option value="" className="text-gray-400">
                                        Lựa chọn
                                    </option>
                                    {formData &&
                                        formData.roomType.map((value) => (
                                            <option
                                                key={value.id}
                                                value={value.id}
                                            >
                                                {value.room_type}
                                            </option>
                                        ))}
                                </select>
                            </div>
                            {/* <div className="mb-4 flex items-start">
                                <label className="text-sm font-medium text-gray-700 text-nowrap w-44">
                                    Mô tả
                                </label>

                                <textarea
                                    name="description"
                                    id="description"
                                    placeholder="Mô tả..."
                                    cols="30"
                                    rows="5"
                                    value={formData.description}
                                    className="resize-none rounded-t-lg p-2 text-sm text-gray-900 w-full dark:bg-gray-700 border-0 border-b-[2px] border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-b-2 peer overflow-hidden"
                                    onChange={(e) => {
                                        handleChange(e);
                                        e.target.style.height = "auto";
                                        e.target.style.height = `${e.target.scrollHeight}px`;
                                    }}
                                ></textarea>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="rounded-b-lg absolute bottom-0 left-0 w-full bg-white border-t border-gray-300 flex flex-end justify-end gap-2 px-10 py-3">
                <Button
                    color="blue"
                    textColor="white"
                    children={functionButton}
                    size="lg"
                    handleClick={() => handleSubmit(formData)}
                />
                <Button
                   
                    textColor="gray-700"
                    children="Hủy"
                    size="lg"
                    handleClick={handleClose}
                />
            </div>
        </div>
    );
};

export default ModalRoom;
