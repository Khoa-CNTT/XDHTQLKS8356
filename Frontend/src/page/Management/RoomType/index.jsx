import React, { useEffect, useState } from 'react';
import GeneralTable from '../../../components/GeneralTable';
import { roomDetailService } from '../../../service/roomDetailService';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import ModalRoomType from './ModalRoomType';
import { roomService } from '../../../service/roomService';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
const RoomType = () => {
    const columns = [
        { key: "id", label: "Mã loại phòng"},
        { key: "room_type", label: "Tên loại phòng", isFilterable: true },
        { key: "room_count", label: "Tổng số phòng" },
        { key: "adult_count", label: "Số người" },
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
    const [modalVisible, setModalVisible] = useState(false);
    const [searchData, setSearchData] = useState('');
    const [data, setData] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState("");
    const fetchRooms = async () => {
        const result = await roomService.getRoomType();
        setData(result);
    };

    useEffect(() => {
        fetchRooms();
    }, []);
    const handleSearchChange = (value) => {
        setSearchData(value)
    };
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
    const handleDeleteRoom = (event, row) => {
        event.stopPropagation();
        console.log("Delete room for booking:", row.booking_id);
       
    };
    const handleEditRoom = (event, row) => {
        event.stopPropagation();
        console.log("Editing room for booking:", row.booking_id);
       
    };
    const handleAddRoom = () => {
        setSelectedRoom(null); 
        setModalVisible(true);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        for (let key in formData) {
            if (formData[key] === "") {
                toast.warning("Vui lòng nhập đầy đủ thông tin.");
                return;
            }
        }
        // const finalData = {
        //     ...formData,
        //     imageUrl,
        // };
        // console.log(finalData);
        try {
            const response = await axios.post(
                "http://localhost:8080/api/receptionist/room",
                {
                    name: formData.name,             
                    square_meters: formData.squareMeters,
                    price_per_night: formData.pricePerNight, 
                    adult_count: formData.adultCount,
                    HotelId: 1,
                    // description: formData.description,
                    images: imageUrl,
                },
                { withCredentials: true }
            );
            const data = response.data;
            if (data.status === true) {
                toast.success(data.message);
                setFormData({
                    name: "",           
                    squareMeters: "",
                    pricePerNight: "",  
                    adultCount: "",
                    // description: "",
                  });
                handleClose();
                handleFetch()
            }
        } catch (error) {
            toast.error("Thêm loại phòng không thành công!");
        }
    };
    const handleSubmit = async (formData) => {
        console.log("dữ liệu",formData)
        for (let key in formData) {
            if (formData[key] === "") {
                toast.error("Vui lòng nhập đầy đủ thông tin.");
                return;
            }
        }
        const payload = {
            adult_count: parseInt(formData.adultCount),
            room_type: formData.name,
            square_meters: parseInt(formData.squareMeters),
            price_per_night: parseFloat(formData.pricePerNight),
            image: formData.image,
            HotelId: 1
         };
         
        try {
            if (selectedRoom) {
                // await roomService.updateRoomType(selectedRoom.id, formData);
                toast.success("Cập nhật thành công");
            } else {
                
                try {
                    const result = await roomService.addRoomType(payload);
                    console.log(result.status)
                    if(result.status == true){
                        toast.success(result.message);
                        setResetFormTrigger(false);
                    }else{
                        toast.error(result.message);
                    }
                } catch (error) {
                    // navigate("/errors")
                }
            }
            // setModalVisible(false);
            fetchRooms();
        } catch (err) {
            toast.error("Lưu thất bại");
        }
    };
    return (
        <div>
            <GeneralTable
                datas={data}
                columns={columns}
                renderExpandedRow={renderExpandedRow}
                onSearchChange={handleSearchChange}
                placeholderSearch="Nhập mã loại phòng"
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
                            ></ModalRoomType>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default RoomType;