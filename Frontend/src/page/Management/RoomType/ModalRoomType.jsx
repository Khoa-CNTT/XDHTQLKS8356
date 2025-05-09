import React, { useState } from "react";
import Button from "../../../components/Button";
import { BsImageFill } from "react-icons/bs";
import axios from "axios";
import toast from 'react-hot-toast';
import Cookies from "js-cookie";
const ModalRoomType = ({ handleClose, handleFetch}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        roomType: "",
        squareMeters: "",
        pricePerNight: "",
        bedroomCount: "",
        livingRoomCount: "",
        kitchenCount: "",
        bathroomCount: "",
        adultCount: "",
        childCount: "",
        HotelId: 1,
        // description: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleIsFilters = () => {
        // setExpandedRow([]);
    };
    const handleBeforeUpload = async (event) => {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("images", file);
        setIsLoading(true);
        try {
            const response = await fetch("http://localhost:8080/upload", {
                method: "POST",
                body: formData,
            });
            const data = await response.json();
            setImageUrl((prevUrls) => [...prevUrls, data]);
        } catch (error) {
            console.error("Tải ảnh không thành công", error);
        }
        setIsLoading(false);
    };
const hotel_id = Cookies.get('hotel_id');
console.log("hotel_id=", hotel_id);
    const onSubmit = async (e) => {
        e.preventDefault();
        for (let key in formData) {
            if (formData[key] === "") {
                toast.warning("Vui lòng nhập đầy đủ thông tin.");
                return;
            }
        }
        // const finalData = {
        //     ...formData,
        //     imageUrl,
        // };
        // console.log(finalData);
        try {
            const response = await axios.post(
                "http://localhost:8080/api/receptionist/room",
                {
                    name: formData.name,
                    room_type: formData.roomType,
                    square_meters: formData.squareMeters,
                    price_per_night: formData.pricePerNight,
                    bedroom_count: formData.bedroomCount,
                    living_room_count: formData.livingRoomCount,
                    kitchen_count: formData.kitchenCount,
                    bathroom_count: formData.bathroomCount,
                    adult_count: formData.adultCount,
                    child_count: formData.childCount,
                    HotelId: hotel_id,
                    // description: formData.description,
                    images: imageUrl,
                },
                { withCredentials: true }
            );

            const data = response.data;

            if (data.status === true) {
                toast.success(data.message);
                setFormData({
                    name: "",
                    roomType: "",
                    squareMeters: "",
                    pricePerNight: "",
                    bedroomCount: "",
                    livingRoomCount: "",
                    kitchenCount: "",
                    bathroomCount: "",
                    adultCount: "",
                    childCount: "",
                    // description: "",
                  });
                handleClose();
                handleFetch()
           
            }
        } catch (error) {
            toast.error("Thêm loại phòng không thành công!");
        }
    };

    return (
        <div className="rounded-lg h-full overflow-hidden relative">
        <div className="flex items-center justify-between p-5 bg-gray-200">
            <div className="text-2xl font-bold text-center">Thêm loại phòng mới</div>
            <button
                onClick={handleClose}
                className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
            <div
               className="overflow-y-auto bg-white w-full h-[calc(100%-120px)]
                            [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 
                            [&::-webkit-scrollbar-track]:bg-gray-100
                            [&::-webkit-scrollbar-thumb]:bg-gray-300
                            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
            >
                <div className="px-24 py-5 bg-white w-full">
                    <div className="mb-3 flex items-center">
                        <label className="text-sm font-medium text-gray-700 text-nowrap w-56">
                            Tên loại phòng
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nhập tên loại phòng"
                            className="rounded-t-lg p-2 w-full text-sm text-gray-900 dark:bg-gray-700 border-0 border-b-[2px] border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 focus:border-b-2 peer"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex items-center gap-4 mb-2">
                        <label className="text-sm font-medium text-gray-700 text-nowrap w-40">
                            Loại hình
                        </label>
                        <div className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="roomType"
                                value="hotel"
                                checked={formData.roomType === "hotel"}
                                onChange={handleChange}
                            />
                            <label className="text-sm">Khách sạn</label>
                        </div>
                        <div className="flex items-center gap-1">
                            <input
                                type="radio"
                                name="roomType"
                                value="apartment"
                                checked={formData.roomType === "apartment"}
                                onChange={handleChange}
                                className="w-4 h-4 "
                            />
                            <label className="text-sm">Căn hộ</label>
                        </div>
                    </div>
                    <div className="mb-3 flex items-center">
                        <label className="text-sm font-medium text-gray-700 text-nowrap w-56">
                            Giá ngày đêm
                        </label>
                        <input
                            type="number"
                            name="pricePerNight"
                            placeholder="0"
                            min={0}
                            className="text-right w-full rounded-t-lg p-2 text-sm text-gray-900 dark:bg-gray-700 border-0 border-b-[2px] border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 focus:border-b-2 peer"
                            value={formData.pricePerNight}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3 flex items-center">
                        <label className="text-sm font-medium text-gray-700 text-nowrap w-56">
                            Số lượng phòng ngủ
                        </label>
                        <input
                            type="number"
                            name="bedroomCount"
                            placeholder="0"
                            min={0}
                            className="text-right rounded-t-lg p-2 text-sm text-gray-900 w-full dark:bg-gray-700 border-0 border-b-[2px] border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 focus:border-b-2 peer"
                            value={formData.bedroomCount}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="mb-3 flex items-center">
                        <label className="text-sm font-medium text-gray-700 text-nowrap w-56">
                            Số lượng phòng khách
                        </label>
                        <input
                            type="number"
                            name="livingRoomCount"
                            placeholder="0"
                            min={0}
                            className="text-right rounded-t-lg p-2 text-sm text-gray-900 w-full dark:bg-gray-700 border-0 border-b-[2px] border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 focus:border-b-2 peer"
                            value={formData.livingRoomCount}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3 flex items-center">
                        <label className="text-sm font-medium text-gray-700 text-nowrap w-56">
                            Số lượng phòng bếp
                        </label>
                        <input
                            type="number"
                            name="kitchenCount"
                            placeholder="0"
                            min={0}
                            className="text-right rounded-t-lg p-2 text-sm text-gray-900 w-full dark:bg-gray-700 border-0 border-b-[2px] border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 focus:border-b-2 peer"
                            value={formData.kitchenCount}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3 flex items-center">
                        <label className="text-sm font-medium text-gray-700 text-nowrap w-56">
                            Số lượng phòng tắm
                        </label>
                        <input
                            type="number"
                            name="bathroomCount"
                            placeholder="0"
                            min={0}
                            className="text-right rounded-t-lg p-2 text-sm text-gray-900 w-full dark:bg-gray-700 border-0 border-b-[2px] border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 focus:border-b-2 peer"
                            value={formData.bathroomCount}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-5 mb-3 pb-2 shadow-2xl rounded-md">
                        <div className="w-full ">
                            <h3 className="font-medium text-gray-700 mb-4 bg-gray-100 p-3 rounded-t-md">
                                Sức chứa
                            </h3>
                            <div className="flex items-center mb-4 px-3">
                                <span className="w-24 text-sm text-gray-700 font-semibold">
                                    Tiêu chuẩn
                                </span>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        name="adultCount"
                                        placeholder="0"
                                        className="w-12 p-1 border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:outline-none text-center"
                                        value={formData.adultCount}
                                        onChange={handleChange}
                                    />
                                    <span className="text-sm text-gray-700">
                                        người lớn và
                                    </span>
                                    <input
                                        type="number"
                                        name="childCount"
                                        placeholder="0"
                                        className="w-12 p-1 border border-gray-300 rounded focus:ring-1 focus:ring-green-500 focus:outline-none text-center"
                                        value={formData.childCount}
                                        onChange={handleChange}
                                    />
                                    <span className="text-sm text-gray-700">
                                        trẻ em
                                    </span>
                                </div>
                            </div>
                            <div className="mb-4 flex items-center px-3">
                                <label className="text-sm font-medium text-gray-700 text-nowrap w-24">
                                    Diện tích
                                </label>
                                <input
                                    type="number"
                                    id="squareMeters"
                                    name="squareMeters"
                                    min={0}
                                    className=" text-right rounded-t-lg p-1 w-20 text-sm text-gray-900 dark:bg-gray-700 border-0 border-b-[2px] border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 focus:border-b-2 peer"
                                    value={formData.squareMeters}
                                    onChange={handleChange}
                                />
                                <div className="text-sm  text-gray-700 text-nowrap">
                                    m²
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rounded-b-lg absolute bottom-0 left-0 w-full bg-white border-t border-gray-300 flex flex-end justify-end gap-2 px-24 py-3">
                <Button
                    color="blue"
                    textColor="white"
                    children="Lưu và thêm mới"
                    size="lg"
                    handleClick={onSubmit}
                />
                <Button
                    textColor="text-gray-700"
                    children="Hủy"
                    size="lg"
                    handleClick={handleClose}
                />
            </div>
        </div>
    );
};

export default ModalRoomType;
