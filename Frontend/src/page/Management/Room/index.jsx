import React, { useEffect, useState } from 'react';
import GeneralTable from '../../../components/GeneralTable';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { roomDetailService } from '../../../service/roomDetailService';
import ModalRoom from './ModalRoom';
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
    const [modalAdd, setModalAdd] = useState(false)
    const [searchData, setSearchData] = useState('');
    const [data, setData] = useState([]);
    const fetchRooms = async () => {
        const result = await roomDetailService.getRoom();
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
                placeholderSearch="Nhập mã phòng"
                functionButton="Thêm phòng"
                onDelete={handleDeleteRoom}
                onEdit={handleEditRoom}
                handleButton={() => {setModalAdd(true)}}
            >
            </GeneralTable>
            {modalAdd && (
                    <div
                        onClick={() => setModalAdd(false)}
                        className="fixed inset-0 bg-gray-800/50 flex justify-center items-center z-50"
                    >
                        <div
                            className="bg-white rounded-lg w-[50%] h-[78%] relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <ModalRoom
                                handleClose={()=>{setModalAdd(false)}}
                                handleFetch={()=> {}}
                            ></ModalRoom>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default Room;