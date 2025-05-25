import { useState, useEffect } from "react";
import Button from "../../../components/Button";

const ModalServices = ({ handleClose, lable, handleSubmit, data, resetTrigger, functionButton }) => {
    const [formData, setFormData] = useState({
        serviceName: "",
        price: "",
        formattedPrice: "",
    });

    useEffect(() => {
        if (data) {
            setFormData({
                serviceName: data.service_name || "",
                price: data.price || "",
                formattedPrice: data.price ? Number(data.price).toLocaleString("de-DE") : "",
            });
        } else {
            setFormData({
                serviceName: "",
                price: "",
                formattedPrice: "",
            });
        }
    }, [data, resetTrigger]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "formattedPrice") {
            const rawValue = value.replace(/[^\d]/g, "");
            const formattedValue = rawValue ? Number(rawValue).toLocaleString("de-DE") : "";
            setFormData({
                ...formData,
                price: rawValue,
                formattedPrice: formattedValue,
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-opacity-40 z-40"
            onClick={handleClose}
        >
            <div
                className="relative bg-white rounded-lg shadow-lg w-1/3"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between p-5 bg-gray-200 rounded-t-lg">
                    <div className="text-2xl font-bold text-center">{lable || "Thêm dịch vụ"}</div>
                    <button
                        onClick={handleClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-6">
                    <input
                        type="text"
                        name="serviceName"
                        placeholder="Tên dịch vụ"
                        value={formData.serviceName}
                        onChange={handleChange}
                        className="w-full mb-3 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    />
                    <input
                        type="text"
                        name="formattedPrice"
                        placeholder="Giá (VNĐ)..."
                        min={0}
                        value={formData.formattedPrice}
                        onChange={handleChange}
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    />
                </div>
                <div className="flex justify-end gap-4 p-6 pt-0">
                    <Button
                        color="blue"
                        textColor="white"
                        size="lg"
                        children={functionButton || "Lưu"}
                        handleClick={() => handleSubmit(formData)}
                    />
                    <Button
                        textColor="gray-700"
                        size="lg"
                        children="Hủy"
                        handleClick={handleClose}
                    />
                </div>
            </div>
        </div>
    );
};

export default ModalServices;
