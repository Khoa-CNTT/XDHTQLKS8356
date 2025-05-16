import React, { useEffect, useState } from 'react';
import GeneralTable from '../../../components/GeneralTable';
import { roomService } from '../../../service/roomService';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ModalExtension from './ModalExtension';
import { extensionServices } from '../../../service/extensionServices';
const Extension = () => {
    const columns = [
        { key: "id", label: "Mã tiện ích"},
        { key: "name", label: "Tên tiện ích", isFilterable: true },
        { key: "price", label: "Giá" },
        { key: "icon", label: "Icon" },
        // { key: "image", label: "Hình ảnh" },
        {
            key: "edit",
            label: "Chỉnh sửa",
            render: (row) => (
                <button
                    onClick={(event) => handleEditExtension(event, row)}
                    className="z-10 text-center mx-auto p-2 hover:bg-slate-200 hover:rounded-md cursor-pointer"
                >
                    <FaEdit className="h-6 w-6" />
                </button>
            ),
        },
        {
            key: "delete",
            label: "Xóa",
            render: (row) => (
                <button
                    onClick={(event) => handleDeleteExtension(event, row)}
                    className="z-10 text-center mx-auto p-2 hover:bg-slate-200 hover:rounded-md cursor-pointer"
                >
                    <MdDeleteForever className="h-6 w-6" />
                </button>
            ),
        },
    ];
    const navigate = useNavigate();
    const [resetFormTrigger, setResetFormTrigger] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [selectedExtension, setSelectedExtension] = useState("");
    const fetchExtensions = async () => {
        const result = await extensionServices.getExtension();
        setData(result);
    };

    useEffect(() => {
        fetchExtensions();
    }, []);
    const renderExpandedRow = (row) => {
        return (
            <div>
                 <div className="">
                    <h3 className="font-bold text-lg mb-2">Chi tiếtphòng:</h3>
                    <div className="overflow-x-auto">
            
                    </div>
                </div>
            </div>
        );
    };
    const handleDeleteExtension = async (event, row) => {
        event.stopPropagation();
        try {
            const result = await extensionServices.deleteExtension(row.id);
        if(result.status == true){
            toast.success(result.message);
            fetchExtensions();     
        }else{
            toast.error(result.message);
        }
        } catch (error) {
            
        }
       
    };
    const handleEditExtension = (event, row) => {
        event.stopPropagation();
        setSelectedExtension(row)
        console.log("hàng", row)
        setModalVisible(true);
    };
    const handleSubmit = async (formData) => {
        console.log(formData)
        // for (let key in formData) {
        //     if (formData[key] === "") {
        //         toast.error("Vui lòng nhập đầy đủ thông tin.");
        //         return;
        //     }
        // }
        const payload = {
            name: formData.name,
            icon: formData.icon,
            price: formData.price,
            image: formData.image,
        }; 
        try {
            if (selectedExtension) {
                try {
                    const result = await extensionServices.updateExtension(selectedExtension.id, payload);
                    if(result.status == true){
                        toast.success(result.message);
                        setResetFormTrigger(true);
                        setModalVisible(false);
                    }else{
                        toast.error(result.message);
                    }
                } catch (error) {
                    navigate("/error")
                }
            } else { 
                try {
                    const result = await extensionServices.addExtension(payload);
                    if(result.status == true){
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
            fetchExtensions();
        } catch (err) {
            navigate("/error")
        }
    };
    return (
        <div>
            <GeneralTable
                datas={data}
                columns={columns}
                renderExpandedRow={renderExpandedRow}
                functionButton="Thêm tiện ích"
                onDelete={handleDeleteExtension}
                onEdit={handleEditExtension}
                handleButton={()=>{setModalVisible(true), setSelectedExtension(null)}}
            >
            </GeneralTable>
            {modalVisible && (
                <div
                    onClick={()=>{setModalVisible(false)}}
                    className="fixed inset-0 bg-gray-800/50 flex justify-center items-center z-50"
                >
                    <div
                        className="bg-white rounded-lg w-[50%] h-[80%] relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ModalExtension
                            handleClose={()=>{setModalVisible(false)}}
                            resetTrigger={resetFormTrigger} 
                            lable={selectedExtension ? "Cập nhật tiện ích" : "Thêm tiện ích"}
                            data={selectedExtension}
                            handleSubmit={handleSubmit}
                            functionButton={selectedExtension ? "Cập nhật" : "Thêm mới"}
                        ></ModalExtension>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Extension;