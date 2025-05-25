import { useEffect, useState } from "react";
import { FaRegCalendarAlt } from "react-icons/fa";
import toast from 'react-hot-toast';
import { roomService } from "../../../service/roomService";
import Button from "../../../components/Button";

const ModalPrice = ({ handleClose, lable, handleSubmit, data, resetTrigger, functionButton}) => {
    const [formData, setFormData] = useState({
        priceName: "",
        price: "",
        formattedPrice: "",
        startDate: "",
        endDate: "",
        roomType: [],
        roomID: "",
    });
    const fetchRoomType = async () => {
        const result = await roomService.getRoomType();
        setFormData(prev => ({...prev, roomType: result}));
    };
    console.log("2",data)
    useEffect(() => {
        if (data) {
            setFormData({
                priceName: data.name || "",
                price: data?.price || "",
                formattedPrice: data?.price ? new Intl.NumberFormat().format(data.price): "",
                startDate: data?.start_date || "",
                endDate: data?.end_date || "",
                roomType: data.details?.map(detail => detail.room_type) || [],
                roomID: data?.room_type_id.toString() || ""
            });
        } else {
            setFormData({
                priceName: "",
                price: "",
                formattedPrice: "",
                startDate: "",
                endDate: "",
                roomType: [],
                roomID: "",
            });
        }
    }, [data, resetTrigger]);
    useEffect(() => {
        fetchRoomType();
    }, []);
    const handlePriceChange = (e) => {
        let newValue = e.target.value;
        newValue = newValue.replace(/[^\d]/g, "");
        let formattedValue = newValue;
     
        if (newValue) {
            formattedValue = Number(newValue).toLocaleString("de-DE");
        }
        setFormData({
            ...formData,
            price: newValue,
            formattedPrice: formattedValue,
        });
    };

    const today = new Date().toISOString().split("T")[0];
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
      

    const handleStartDateChange = (e) => {
        handleChange(e);
    };

    const handleEndDateChange = (e) => {
        const { value } = e.target;
        if (new Date(value) <= new Date(formData.startDate)) {
            toast.error("Ngày kết thúc phải lớn hơn ngày bắt đầu!");
        } else {
            handleChange(e);
        }
    };
    const handleIconClick = (field) => {
        document.getElementById(field)?.showPicker?.();
    };
    const isUpdateMode = data !== null;
    return (
        <div
            className="fixed inset-0 z-40 bg-gray-800/50 flex items-center justify-center bg-opacity-50"
            onClick={handleClose}
        >
            <div
                className="relative bg-white rounded-lg shadow-lg w-1/3"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center rounded-t-lg justify-between p-5 bg-gray-200">
                    <div className="text-2xl font-bold text-center">{lable}</div>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-6 ">
                    <input
                        type="text"
                        name="priceName"
                        placeholder="Tên giá"
                        value={formData.priceName}
                        onChange={handleChange}
                        disabled={isUpdateMode}
                        className="disabled:cursor-not-allowed disabled:opacity-60 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow mb-3"
                    />
                    <div className="flex items-center">
                        <select
                            name="roomID"
                            value={formData.roomID}
                            onChange={handleChange}
                            disabled={isUpdateMode}
                            className="disabled:cursor-not-allowed disabled:opacity-60 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow mb-3"
                        >
                            <option value="" className="text-gray-400">
                                Lựa chọn loại phòng
                            </option>
                            {formData &&
                                formData.roomType.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.room_type}
                                    </option>
                                ))}
                        </select>
                    </div>
                    <input
                        type="number"
                        name="formattedPrice"
                        min={1}
                        placeholder="Giá (VNĐ)..."
                        value={formData.formattedPrice}
                        disabled={isUpdateMode}
                        onChange={handlePriceChange}
                        className="disabled:cursor-not-allowed disabled:opacity-60 mb-3 w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    />

                    <div className="relative">
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleStartDateChange}
                            className=" w-[90%] text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow appearance-none"
                            placeholder="Ngày bắt đầu"
                            id="startDate"
                            min={today}
                        />
                        <div
                            className="absolute inset-y-0 right-3 flex items-center cursor-pointer"
                            onClick={() => handleIconClick("startDate")}
                        >
                            <FaRegCalendarAlt className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                    <div className="relative mt-4">
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleEndDateChange}
                            className="w-[90%] text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow appearance-none"
                            placeholder="Ngày bắt đầu"
                            id="endDate"
                            min={today}
                        />
                        <div
                            className="absolute inset-y-1  right-3 flex items-center cursor-pointer"
                            onClick={() => handleIconClick("endDate")}
                        >
                            <FaRegCalendarAlt className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                    {isUpdateMode && <div className="text-xs text-gray-500 mt-3 italic">
                        * Lưu ý: Chỉ được cập nhật ngày bắt đầu và ngày kết thúc
                    </div>}
                    
                </div>
               
                <div className={`flex justify-end pb-6 pr-6 gap-4 ${!isUpdateMode ? 'mt-3' : ""}`}>
                    <Button
                        color="blue"
                        textColor="white"
                        children={functionButton}
                        size="lg"
                        handleClick={() => handleSubmit(formData)}
                    />
                    <Button
                        textColor="text-gray-700"
                        children="Hủy"
                        size="lg"
                        handleClick={handleClose}
                    />
                </div>
            </div>
        </div>
    );
};

export default ModalPrice;
