import React, { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import GeneralTable from "../../../components/GeneralTable";
import { priceServices } from "../../../service/priceServices";
import { useNavigate } from "react-router-dom";
import ModalPrice from "./ModalPrice";
import toast from 'react-hot-toast';
const Price = () => {
    const columns = [
        { key: "name", label: "Tên", isFilterable: true },
        { key: "room_type", label: "Loại phòng"},
        { key: "start_date", label: "Ngày bắt đầu" },
        { key: "end_date", label: "Ngày kết thúc" },
        { key: "price", label: "Giá (VNĐ)" },
        {
            key: "edit",
            label: "Chỉnh sửa",
            render: (row) => (
                <button
                    onClick={(event) => handleEditPrices(event, row)}
                    className="z-10 text-center mx-auto p-2 hover:bg-slate-200 hover:rounded-md cursor-pointe"
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
                    onClick={(event) => handleDeletePrices(event, row)}
                    className="z-10 text-center mx-auto p-2 hover:bg-slate-200 hover:rounded-md cursor-pointe"
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
    const [selectedPrice, setSelectedPrice] = useState("");
    const fetchPrices = async () => {
        const result = await priceServices.getPrices();
        console.log(result)
        setData(result);
    };
    useEffect(() => {
        fetchPrices();
    }, []);
    const handleEditPrices = async (event, row) => {
        event.stopPropagation();
        setSelectedPrice(row)
        setModalVisible(true);
    };
    const handleDeletePrices = async (event, row) => {
        event.stopPropagation();
        try {
            const result = await priceServices.deletePrices(row.pricing_id);
            if(result.status == true){
                toast.success(result.message);
                fetchPrices()     
            }else{
                toast.error(result.message);
            }
        } catch (error) {
            console.log(error)
        }
    };


    const renderExpandedRow = (row) => {
        return (
            <div className="transition-all duration-300">
                <h3 className="font-bold mb-2">Chi tiết dịch vụ</h3>
                <p>Email: {row.email}</p>
            </div>
        );
    };
    const handleSubmit = async (formData) => {
        console.log(formData)
        // for (let key in formData) {
        //     if (formData[key] === "") {
        //         toast.error("Vui lòng nhập đầy đủ thông tin.");
        //         return;
        //     }
        // }
        const payload = formData.selectedPrice !== "" 
                        ? {
                            start_date: formData.startDate,
                            end_date: formData.endDate,
                        }
                        : {
                            name: formData.priceName,
                            start_date: formData.startDate,
                            end_date: formData.endDate,
                            RoomId: formData.roomID,
                            price: formData.price,
                        };
        try {
            if (selectedPrice) {
                try {
                    const result = await priceServices.updatePrices(selectedPrice.pricing_id, payload);
                    if(result.status == true){
                        toast.success(result.message);
                        setResetFormTrigger(true);
                        setModalVisible(false);
                        setSelectedPrice("")
                    }else{
                        toast.error(result.message);
                    }
                } catch (error) {
                    navigate("/error")
                }
            } else { 
                try {
                    const result = await priceServices.addPrices(payload);
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
            fetchPrices()
        } catch (err) {
            navigate("/error")
        }
    };
    return (
        <>
            <GeneralTable
                datas={data}
                columns={columns}
                renderExpandedRow={renderExpandedRow}
                functionButton="Thêm giá phòng"
                onDelete={handleDeletePrices}
                onEdit={handleEditPrices}
                handleButton={()=>{setModalVisible(true), setSelectedPrice(null)}}
            >
            </GeneralTable>
            {modalVisible && (
                <ModalPrice
                    handleClose={()=>{setModalVisible(false)}}
                    resetTrigger={resetFormTrigger} 
                    lable={selectedPrice ? "Cập nhật giá phòng" : "Thêm giá phòng"}
                    data={selectedPrice}
                    handleSubmit={handleSubmit}
                    functionButton={selectedPrice ? "Cập nhật" : "Thêm mới"}
                ></ModalPrice>
            )}
        </>
    );
};

export default Price;