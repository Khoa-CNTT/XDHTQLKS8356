import { useState } from "react";
import { FaWindowClose } from "react-icons/fa";
import Button from "../../../components/Button";
const ModalServices = ({ onClose, onAddService }) => {
    const [serviceName, setServiceName] = useState("");
    const [price, setPrice] = useState("");
    const [formattedPrice, setFormattedPrice] = useState("");
    const handlePriceChange = (e) => {
        let newValue = e.target.value;
        newValue = newValue.replace(/[^\d]/g, ""); 
        let formattedValue = newValue;
        if (newValue) {
            formattedValue = Number(newValue).toLocaleString('de-DE'); 
        }
        const rawValue = newValue;  
        setPrice(rawValue);  
        setFormattedPrice(formattedValue); 
    };
    const handleSubmit = () => {
        const newServices = { serviceName, price};
       
        onAddService(newServices);
    };
    return (
        <div
            className="fixed inset-0 flex items-center justify-center bg-opacity-50"
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-lg shadow-lg w-1/3"
                onClick={(e) => e.stopPropagation()}
            >
              
                <div className="flex items-center justify-between p-5 bg-gray-200 rounded-t-lg">
                    <div className="text-2xl font-bold text-center">Thêm dịch vụ</div>
                    <button
                        onClick={onClose}
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
                        placeholder="Tên dịch vụ"
                        value={serviceName}
                        onChange={(e) => setServiceName(e.target.value)}
                        className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow mb-3"
                    />
                    <input
                    type="text"
                    placeholder="Giá (VNĐ)..."
                    value={formattedPrice}  
                    onChange={handlePriceChange}
                    className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    />
                </div>
                
                <div className="flex justify-end gap-4 p-6 pt-0">
                <Button
                    color="blue"
                    textColor="white"
                    children="Lưu và thêm mới"
                    size="lg"
                    // handleClick={onSubmit}
                />
                <Button
                   
                    textColor="gray-700"
                    children="Hủy"
                    size="lg"
                    handleClick={onClose}
                />
                </div>
            </div>
        </div>
    );
};

export default ModalServices;
