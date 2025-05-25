import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import { BsImageFill } from "react-icons/bs";
import { IoIosRemoveCircle } from "react-icons/io";
import { toast } from "react-hot-toast";
const ModalRoomType = ({
    handleClose,
    lable,
    handleSubmit,
    data,
    resetTrigger,
    functionButton,
}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        squareMeters: "",
        pricePerNight: "",
        adultCount: "",
        image: [],
        description: "",
    });
    useEffect(() => {
        if (data) {
            setFormData({
                name: data.room_type || "",
                squareMeters: data.square_meters || "",
                pricePerNight: data.price_per_night || "",
                adultCount: data.adult_count || "",
                description: data.description || "",
                image: data.image ? JSON.parse(data.image) : [],
            });
        } else {
            setFormData({
                name: "",
                squareMeters: "",
                pricePerNight: "",
                adultCount: "",
                description: "",
                image: [],
            });
        }
    }, [data, resetTrigger]);

    const handleChange = (e) => {
        const { name, value, type } = e.target;
        if (type === "number") {
          if (value === "") {
            setFormData(prev => ({
              ...prev,
              [name]: "",
            }));
            return;
          }
          const numberValue = Number(value);
          if (numberValue < 0) {
            toast.error("Giá trị nhỏ nhất là 1.")
            return; 
          }
          setFormData(prev => ({
            ...prev,
            [name]: numberValue,
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            [name]: value,
          }));
        }
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
            if (data)
                setFormData((prev) => ({
                    ...prev,
                    image: [...prev.image, data[0]],
                }));
        } catch (error) {
            console.error("Tải ảnh không thành công", error);
        }
        setIsLoading(false);
    };

    const handleRemoveImage = (indexToRemove) => {
        setFormData((prev) => ({
            ...prev,
            image: prev.image.filter((_, index) => index !== indexToRemove),
        }));
    };
    return (
        <div className="rounded-lg h-full overflow-hidden relative">
            <div className="flex items-center justify-between p-5 bg-gray-200">
                <div className="text-2xl font-bold text-center">{lable}</div>
                <button
                    onClick={handleClose}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
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
                            className="rounded-t-lg p-2 w-full text-sm text-gray-900 dark:bg-gray-700 border-0 border-b-[2px] border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-b-2 peer"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3 flex items-center">
                        <label className="text-sm font-medium text-gray-700 text-nowrap w-56">
                            Giá ngày đêm
                        </label>
                        <input
                            type="number"
                            name="pricePerNight"
                            placeholder="0"
                            min={1}
                            className="text-left w-full rounded-t-lg p-2 text-sm text-gray-900 dark:bg-gray-700 border-0 border-b-[2px] border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-b-2 peer"
                            value={formData.pricePerNight}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-4 flex items-start">
                        <label className="text-sm font-medium text-gray-700 text-nowrap w-56">
                            Mô tả
                        </label>
                        <textarea
                        type="text"
                        name="description"
                        id="description"
                        placeholder="Mô tả..."
                        cols="30"
                        rows="5"
                        value={formData.description}
                        onChange={handleChange}
                        className="resize-y rounded-t-lg p-2 text-sm text-gray-900 w-full dark:bg-gray-700 border-0 border-b-[2px] border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-b-2 peer overflow-y-auto h-32"
                        />
                    </div>
                    <div className="mt-5 mb-3 pb-2 shadow-md rounded-md">
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
                                        className="w-12 p-1 border border-gray-300 rounded focus:ring-1 focus:border-blue-500 focus:ring-blue-500 focus:outline-none text-center"
                                        value={formData.adultCount}
                                        onChange={handleChange}
                                    />
                                    <span className="text-sm text-gray-700">
                                        người lớn
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
                                    min={1}
                                    className=" text-center rounded-t-lg p-1 w-20 text-sm text-gray-900 dark:bg-gray-700 border-0 border-b-[2px] border-gray-400 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 focus:border-b-2 peer"
                                    value={formData.squareMeters}
                                    onChange={handleChange}
                                />
                                <div className="text-sm  text-gray-700 text-nowrap">
                                    m²
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-5 shadow-md mb-8 pb-4">
                        <div className="rounded-md w-full">
                            <h3 className="font-medium text-gray-700 mb-4 bg-gray-100 p-3">
                                Hình ảnh
                            </h3>
                            <div className="mt-6 mb-4">
                                <div className="flex items-center justify-center">
                                    {isLoading ? (
                                        <div
                                            role="status"
                                            className="flex items-center justify-center"
                                        >
                                            <svg
                                                aria-hidden="true"
                                                className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                                                viewBox="0 0 100 101"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                    fill="currentColor"
                                                />
                                                <path
                                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                    fill="currentFill"
                                                />
                                            </svg>
                                        </div>
                                    ) : (
                                        <div>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleBeforeUpload}
                                                style={{
                                                    position: "absolute",
                                                    left: "-9999px",
                                                }}
                                                id="image-upload"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    document
                                                        .getElementById(
                                                            "image-upload"
                                                        )
                                                        .click()
                                                }
                                                disabled={isLoading}
                                                className="cursor-pointer flex items-center justify-center rounded bg-gray-300 px-3 py-2 text-sm font-bold text-gray-800 hover:bg-gray-400"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="mr-2 inline w-6 fill-black"
                                                    viewBox="0 0 32 32"
                                                >
                                                    <path
                                                        d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                                        data-original="#000000"
                                                    />
                                                    <path
                                                        d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                                        data-original="#000000"
                                                    />
                                                </svg>
                                                Chọn ảnh
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {formData.image.length > 0 ? (
                                    <div className="mt-4 grid grid-cols-2 gap-2 w-full p-2">
                                        {formData.image.map((url, index) => (
                                            <div
                                                key={index}
                                                className="relative group flex mx-auto p-2 border border-gray-200 rounded-md"
                                            >
                                                <img
                                                    src={url}
                                                    alt={`Uploaded ${index}`}
                                                    className="h-[160px] w-[240px] object-cover rounded-md"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleRemoveImage(index)
                                                    }
                                                    className="cursor-pointer absolute top-1 right-1 bg-red-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                                    title="Xóa ảnh"
                                                >
                                                    <IoIosRemoveCircle className="w-6 h-6" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="mt-4 flex justify-center">
                                        <div className="h-[150px] w-[150px] border-2 border-gray-300 border-dashed flex items-center justify-center">
                                            <BsImageFill className="h-[100px] w-[100px] text-gray-300 " />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rounded-b-lg absolute bottom-0 left-0 w-full bg-white border-t border-gray-300 flex flex-end justify-end gap-2 px-4 py-3">
                <Button
                    color="blue"
                    textColor="white"
                    children={functionButton}
                    size="lg"
                    onClick={() =>
                        handleSubmit({
                            ...formData,
                            image: JSON.stringify(formData.image),
                        })
                    }
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
