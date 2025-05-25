import React, { useEffect, useState } from 'react';
import GeneralTable from '../../../components/GeneralTable';
import ModalRoomType from './ModalRoomType';
import { roomService } from '../../../service/roomService';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { RiHeartAddFill } from "react-icons/ri";
import ModalAddExtention from './ModalAddExtention';
import { RxUpdate } from "react-icons/rx";
const RoomType = () => {
    const columns = [
        { key: "id", label: "Mã loại phòng"},
        { key: "image", label: "Hình ảnh"},
        { key: "room_type", label: "Tên loại phòng"},
        { key: "room_count", label: "Tổng số phòng" },
        { key: "adult_count", label: "Số người" },
        { key: "square_meters", label: "Diện tích" },
        { key: "price_per_night", label: "Giá phòng" },
        {
            key: "add",
            label: "Thêm tiện ích",
            render: (row) => (
                <button
                    onClick={(event) => handleAddExtentionRoom(event, row)}
                    className="z-10 text-center mx-auto p-2 hover:bg-slate-200 hover:rounded-md cursor-pointer"
                >
                    <RiHeartAddFill  className="h-6 w-6" />
                </button>
            ),
        },
        {
            key: "add",
            label: "Cập nhật tiện ích",
            render: (row) => (
                <button
                    onClick={(event) => handleUpdateExtentionRoom(event, row)}
                    className="z-10 text-center mx-auto p-2 hover:bg-slate-200 hover:rounded-md cursor-pointer"
                >
                    <RiHeartAddFill  className="h-6 w-6" />
                </button>
            ),
        },
        {
            key: "edit",
            label: "Chỉnh sửa",
            render: (row) => (
                <button
                    onClick={(event) => handleEditRoom(event, row)}
                    className="z-10 text-center mx-auto p-2 hover:bg-slate-200 hover:rounded-md cursor-pointer"
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
                    onClick={(event) => handleDeleteRoom(event, row)}
                    className="z-10 text-center mx-auto p-2 hover:bg-slate-200 hover:rounded-md cursor-pointer"
                >
                    <MdDeleteForever className="h-6 w-6" />
                </button>
            ),
        },
    ];
    const navigate = useNavigate();
    const [resetFormTrigger, setResetFormTrigger] = useState(false);
    const [resetFormTriggerExtention, setResetFormTriggerExtention] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalExtention, setModalExtention] = useState(false);
    const [data, setData] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState("");
    const [idRoomType, setIdRoomType] = useState("")
    const [selectedExtention, setSelectedExtention] = useState("");
    const fetchRooms = async () => {
        const result = await roomService.getRoomType();
        setData(result);
    };

    useEffect(() => {
        fetchRooms();
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
    const handleDeleteRoom = async (event, row) => {
        event.stopPropagation();
        try {
            const result = await roomService.deleteRoomType(row.id);
            if(result.status == true){
                toast.success(result.message);
                fetchRooms();     
            }else{
                toast.error(result.message);
            }
        } catch (error) {
            console.log(error)
        }
       
    };
    const handleEditRoom = (event, row) => {
        event.stopPropagation();
        console.log(row)
        setSelectedRoom(row)
        setModalVisible(true);
    };
    const handleAddExtentionRoom = (event, row) => {
        event.stopPropagation();
        setIdRoomType(row.id)
        setModalExtention(true)
        setSelectedExtention("")
    };
    const handleUpdateExtentionRoom = (event, row) => {
        event.stopPropagation();
        setSelectedExtention(row)
        setModalExtention(true)
    };
    const handleSubmitExtention = async (data) => {
        const payload = {
            data: data.map(id => ({
              room_id: idRoomType,
              amenitie_id: id,
            }))
          };
          try {
            const result = await roomService.addExtentionRoom(payload);
            if(result.status === true){
                toast.success(result.message);
                setModalExtention(false);
                fetchRooms();
            }else{
                toast.error(result.message);
            }
        } catch (error) {
            console.log(error)
            navigate("/error")
        }
    };
    const handleSubmit = async (formData) => {
        for (let key in formData) {
            if (formData[key] === "") {
                toast.error("Vui lòng nhập đầy đủ thông tin.");
                return;
            }
        }
        if (JSON.parse(formData.image).length < 2) {
            toast.error("Vui lòng chọn ít nhất 2 ảnh.");
            return;
          }
        const payload = {
            adult_count: formData.adultCount,
            room_type: formData.name,
            square_meters: formData.squareMeters,
            price_per_night: formData.pricePerNight,
            image: formData.image,
            description: formData.description
        }; 
        console.log("dữ liệu",payload)
        try {
            if (selectedRoom) {
                try {
                    const result = await roomService.updateRoomType(selectedRoom.id, payload);
                    if(result.status == true){
                        toast.success(result.message);
                        setResetFormTrigger(true);
                        setModalVisible(false);
                    }else{
                        toast.error(result.message);
                    }
                } catch (error) {
                    console.log("lỗi",error)
                    navigate("/error")
                }
            } else { 
                try {
                    const result = await roomService.addRoomType(payload);
                    if(result.status === true){
                        toast.success(result.message);
                        setResetFormTrigger(true);
                        setModalVisible(false);
                    }else{
                        toast.error(result.message);
                    }
                } catch (error) {
                    console.log(error)
                    navigate("/error")
                }
            }
            fetchRooms();
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
                functionButton="Thêm loại phòng"
                onDelete={handleDeleteRoom}
                onEdit={handleEditRoom}
                handleButton={()=>{setModalVisible(true), setSelectedRoom(null)}}
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
                        <ModalRoomType
                            handleClose={()=>{setModalVisible(false)}}
                            resetTrigger={resetFormTrigger} 
                            lable={selectedRoom ? "Cập nhật loại phòng" : "Thêm loại phòng"}
                            data={selectedRoom}
                            handleSubmit={handleSubmit}
                            functionButton={selectedRoom ? "Cập nhật" : "Thêm mới"}
                        ></ModalRoomType>
                    </div>
                </div>
            )}
            {modalExtention && (
                <div
                    onClick={()=>{setModalExtention(false)}}
                    className="fixed inset-0 bg-gray-800/50 flex justify-center items-center z-50"
                >
                    <div
                        className="bg-white rounded-lg w-[30%] h-[50%] relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <ModalAddExtention
                            handleClose={()=>{setModalExtention(false)}}
                            resetTrigger={resetFormTriggerExtention} 
                            lable={selectedExtention ? "Cập nhật tiện ích cho loại phòng" : "Thêm tiện ích cho loại phòng"}
                            data={selectedExtention}
                            handleSubmit={handleSubmitExtention}
                            functionButton={selectedExtention ? "Cập nhật" : "Thêm mới"}
                        ></ModalAddExtention>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomType;