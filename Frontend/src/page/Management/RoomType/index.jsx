import React, { useEffect, useState } from 'react';
import GeneralTable from '../../../components/GeneralTable';
import { roomDetailService } from '../../../service/roomDetailService';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import ModalRoomType from './ModalRoomType';
import { roomService } from '../../../service/roomService';
const RoomType = () => {
    const columns = [
        { key: "room_name", label: "Tên loại phòng", isFilterable: true },
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
    
    const [modalAddType, setModalAddType] = useState(false)
    const [searchData, setSearchData] = useState('');
    const [data, setData] = useState([]);
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
                handleButton={() => {setModalAddType(true)}}
            >
            </GeneralTable>
            {modalAddType && (
                    <div
                        onClick={()=>{setModalAddType(false)}}
                        className="fixed inset-0 bg-gray-800/50 flex justify-center items-center z-50"
                    >
                        <div
                            className="bg-white rounded-lg w-[50%] h-[80%] relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ModalRoomType
                                handleClose={()=>{setModalAddType(false)}}
                                handleFetch={()=> {}}
                            ></ModalRoomType>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default RoomType;