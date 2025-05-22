import React, { useEffect, useState } from 'react';
import GeneralTable from '../../../components/GeneralTable';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { roomDetailService } from '../../../service/roomDetailService';
import ModalRoom from './ModalRoom';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const Room = () => {
    const columns = [
        { key: "room_number", label: "Số phòng" },
        { key: "room_name", label: "Loại phòng", isFilterable: true },
        { key: "price_per_night", label: "Giá phòng" },
        {
            key: "edit",
            label: "Chỉnh sửa",
            render: (row) => (
                <button
                    onClick={(event) => handleEditRoom(event, row)}
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
                    onClick={(event) => handleDeleteRoom(event, row)}
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
    const [selectedRoom, setSelectedRoom] = useState("");
    const [data, setData] = useState([]);
    const fetchRooms = async () => {
        const result = await roomDetailService.getRoom();
        setData(result);
    };
    useEffect(() => {
        fetchRooms();
    }, []);
    console.log(selectedRoom)
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
            const result = await roomDetailService.deleteRoom(row.room_detail_id);
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
        setSelectedRoom(row)
        setModalVisible(true);
    };
    const handleSubmit = async (formData) => {
        // for (let key in formData) {
        //     if (formData[key] === "") {
        //         toast.error("Vui lòng nhập đầy đủ thông tin.");
        //         return;
        //     }
        // }
       console.log("2",formData)
        const payload = {
            room_number: formData.roomNumber,
            description: formData.description,
            RoomId: formData.roomID,
        }; 
        try {
            if (selectedRoom) {
                try {
                    const result = await roomDetailService.updateRoom(selectedRoom.room_detail_id, payload);
                    if(result.status == true){
                        toast.success("Cập nhật phòng thành công");
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
                    const result = await roomDetailService.addRoom(payload);
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
                functionButton="Thêm phòng"
                onDelete={handleDeleteRoom}
                onEdit={handleEditRoom}
                handleButton={() => {setModalVisible(true), setSelectedRoom(null)}}
            >
            </GeneralTable>
            {modalVisible && (
                    <div
                        onClick={() => setModalVisible(false)}
                        className="fixed inset-0 bg-gray-800/50 flex justify-center items-center z-50"
                    >
                        <div
                            className="bg-white rounded-lg w-[50%] h-[50%] relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ModalRoom
                                handleClose={()=>{setModalVisible(false)}}
                                resetTrigger={resetFormTrigger} 
                                lable={selectedRoom ? "Cập nhật phòng" : "Thêm phòng"}
                                data={selectedRoom}
                                handleSubmit={handleSubmit}
                                functionButton={selectedRoom ? "Cập nhật" : "Thêm mới"}
                            ></ModalRoom>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default Room;