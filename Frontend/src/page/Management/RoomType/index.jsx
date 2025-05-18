import React, { useEffect, useState } from 'react';
import GeneralTable from '../../../components/GeneralTable';
import ModalRoomType from './ModalRoomType';
import { roomService } from '../../../service/roomService';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
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
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState("");
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
    const handleSubmit = async (formData) => {
        for (let key in formData) {
            if (formData[key] === "") {
                toast.error("Vui lòng nhập đầy đủ thông tin.");
                return;
            }
        }
     
        const isEdit = !!selectedRoom?.id;
        const payload = {
            adult_count: formData.adultCount,
            room_type: formData.name,
            square_meters: formData.squareMeters,
            price_per_night: formData.pricePerNight,
            image: formData.image,
            ...(isEdit ? {} : { HotelId: 1 }) 
        }; 
        console.log("dữ liệu",payload)
        try {
            if (selectedRoom && isEdit) {
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
            <GeneralTable//localhost:5173/booking/information?info=%7B%22fullname%22%3A%22M%E1%BB%B9%20L%E1%BB%87%22%2C%22email%22%3A%22myle%40gmail.com%22%2C%22phone%22%3A%220794636494%22%2C%22address%22%3A%22Hu%E1%BA%BF%22%2C%22note%22%3A%22Ok%22%2C%22status%22%3A%22guest%22%2C%22role%22%3A%22guest%22%7D&room=%7B%22checkin%22%3A%222025-01-01%22%2C%22checkout%22%3A%222025-01-03%22%2C%22total_nights%22%3A2%2C%22total_guests%22%3A7%2C%22note%22%3A%22Y%C3%AAu%20c%E1%BA%A7u%20ph%C3%B2ng%20y%C3%AAn%20t%C4%A9nh.%22%2C%22details%22%3A%5B%7B%22id%22%3A22%2C%22room_type%22%3A%22Ph%C3%B2ng%20%C4%91%C3%B4i%2023%22%2C%22adult_count%22%3A1%2C%22square_meters%22%3A25%2C%22price_per_night%22%3A100%2C%22image%22%3A%22aaaaaaaaa%22%2C%22room_count%22%3A%222%22%2C%22quantity%22%3A2%2C%22total_price%22%3A600%7D%2C%7B%22id%22%3A20%2C%22room_type%22%3A%22Ph%C3%B2ng%20%C4%91%C3%B4i%22%2C%22adult_count%22%3A1%2C%22square_meters%22%3A25%2C%22price_per_night%22%3A100%2C%22image%22%3A%22%5B%5D%22%2C%22room_count%22%3A%220%22%2C%22quantity%22%3A1%2C%22total_price%22%3A300%7D%5D%2C%22total_amount%22%3A900%2C%22total_discount%22%3A0%2C%22final_amount%22%3A900%7D
Table
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
        </div>
    );
};

export default RoomType;