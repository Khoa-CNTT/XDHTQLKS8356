import React, { useEffect, useState } from 'react';
import GeneralTable from '../../../components/GeneralTable';
import toast from 'react-hot-toast';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { serviceService } from '../../../service/serviceService';
import ModalServices from './ModalServices';
import { useNavigate } from 'react-router-dom';
const Services = () => {
    const columns = [
        { key: "id", label: "Mã dịch vụ"},
        { key: "service_name", label: "Tên dịch vụ" },
        { key: "price", label: "Giá dịch vụ" },
        {
            key: "edit",
            label: "Chỉnh sửa",
            render: (row) => (
                <button
                    onClick={(event) => handleEditService(event, row)}
                    className="z-10 text-center mx-auto p-2 hover:bg-slate-200 hover:rounded-md"
                >
                    <FaEdit className="h-6 w-6" />
                </button>
            ),
        },
        {
            key: "button",
            label: "Xóa",
            render: (row) => (
                <button
                    onClick={(event) => handleDeleteService(event, row)}
                    className="z-10 text-center mx-auto p-2 hover:bg-slate-200 hover:rounded-md"
                >
                    <MdDeleteForever className="h-6 w-6" />
                </button>
            ),
        },
    ];
    const navigate = useNavigate();
    const [resetFormTrigger, setResetFormTrigger] = useState(false);
    const [modalVisible, setModalVisible] = useState(false)
    const [data, setData] = useState([]);
    const [selectedService, setSelectedService] = useState("");
    const fetchServices = async () => {
        const result = await serviceService.getServices();
        setData(result);
    };
    useEffect(() => {
        fetchServices();
    }, []);
    const handleDeleteService = async (event, row) => {
        event.stopPropagation();
        try {
            const result = await serviceService.deleteServices(row.id);
        if(result.status == true){
            toast.success(result.message);
            fetchServices()
        }else{
            toast.error(result.message);
        }
        } catch (error) {
            
        }
       
    };
    const handleEditService = (event, row) => {
        event.stopPropagation();
        setSelectedService(row)
        setModalVisible(true);
       
    };
    const handleSubmit = async (formData) => {
        for (let key in formData) {
            if (formData[key] === "") {
                toast.error("Vui lòng nhập đầy đủ thông tin.");
                return;
            }
        }
        const payload = {
            service_name: formData.serviceName,
            price: formData.price,
            HotelId: 1
        }; 
        if (selectedService) {
            try {
                const result = await serviceService.updateServices(selectedService.id, payload);
                if(result.status === true){
                    toast.success(result.message);
                    setResetFormTrigger(true);
                    setModalVisible(false);
                }else{
                    toast.error(result.message);
                }
            } catch (error) {
                console.log("lỗi 2",error)
                navigate("/error")
            }
        } else { 
            try {
                const result = await serviceService.addServices(payload);
                if(result.status === true){
                    toast.success(result.message);
                    setResetFormTrigger(true);
                    setModalVisible(false);
                }else{
                    toast.error(result.message);
                }
            } catch (error) {
                navigate("/error")
            }
        }
        fetchServices();
    };
    return (
        <div>
            <GeneralTable
                datas={data}
                columns={columns}
             
                functionButton="Thêm dịch vụ"
                onDelete={handleDeleteService}
                onEdit={handleEditService}
                handleButton={() => {setModalVisible(true)}}
            >
            </GeneralTable>
            {modalVisible && (
                    <div
                        onClick={() => {setModalVisible(false)}}
                        className="fixed inset-0 bg-gray-800/50 flex justify-center items-center z-50"
                    >
                        <div
                            className="bg-white rounded-lg w-[50%] relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ModalServices
                                handleClose={()=>{setModalVisible(false)}}
                                resetTrigger={resetFormTrigger} 
                                lable={selectedService ? "Cập nhật dịch vụ" : "Thêm dịch vụ"}
                                data={selectedService}
                                handleSubmit={handleSubmit}
                                functionButton={selectedService ? "Lưu" : "Thêm mới"}
                            ></ModalServices>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default Services;