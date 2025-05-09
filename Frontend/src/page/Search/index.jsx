import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { RiServiceFill } from "react-icons/ri";
const SearchRoom = () => {
    //  đề xuất
    const roomData = [
        {
            id: 3,
            type: "3 X Phòng đôi",
            description: "Có 2 giường đôi, bàn làm việc, điều hòa",
            price: 3500000,
            area: 45,
            adultsCount: 6,
            reviews: 450,
            rating: 4.5,
            facilities: 5,
            image: "https://dyf.vn/wp-content/uploads/2021/01/tai-sao-thiet-ke-phong-ngu-khach-san-quan-trong-nhat.jpg"
          },
      ];
      const roomData2 = [
        {
          id: 1,
          type: "2 X Phòng đôi",
          description: "Có 1 giường đôi, bàn làm việc, điều hòa",
          price: 3000000,
          area: 40,
          adultsCount: 1,
          reviews: 371,
          rating: 4.2,
          facilities: 10,
          image: "https://dyf.vn/wp-content/uploads/2021/01/tai-sao-thiet-ke-phong-ngu-khach-san-quan-trong-nhat.jpg"
        },
        {
          id: 2,
          type: "1 X Phòng đơn",
          description: "Có 1 giường đôi, bàn làm việc, điều hòa",
          price: 1000000,
          area: 40,
          adultsCount: 4,
          reviews: 200,
          rating: 4.0,
          facilities: 3,
          image: "https://dyf.vn/wp-content/uploads/2021/01/tai-sao-thiet-ke-phong-ngu-khach-san-quan-trong-nhat.jpg"
        },
        {
          id: 3,
          type: "3 X Phòng đôi",
          description: "Có 2 giường đôi, bàn làm việc, điều hòa",
          price: 3500000,
          area: 45,
          adultsCount: 6,
          reviews: 450,
          rating: 4.5,
          facilities: 5,
          image: "https://dyf.vn/wp-content/uploads/2021/01/tai-sao-thiet-ke-phong-ngu-khach-san-quan-trong-nhat.jpg"
        },
        {
            id: 3,
            type: "3 X Phòng đôi",
            description: "Có 2 giường đôi, bàn làm việc, điều hòa",
            price: 3500000,
            area: 45,
            adultsCount: 6,
            reviews: 450,
            rating: 4.5,
            facilities: 5,
            image: "https://dyf.vn/wp-content/uploads/2021/01/tai-sao-thiet-ke-phong-ngu-khach-san-quan-trong-nhat.jpg"
          },
      ];
    const totalPrice = roomData.reduce((acc, room) => acc + room.price, 0);
    // phòng trống
    const roomData1 = [
        {
            id: 1,
            type: "Phòng đôi cao cấp",
            description: "Có 1 giường đôi, bàn làm việc, điều hòa",
            price: 8000000,
            area: 40,
            rooms: 5, 
            adultsCount: 3, 
            reviews: 371,
            rating: 4.2,
            facilities: 2
          },
          {
            id: 2,
            type: "Phòng gia đình",
            description: "Có 2 giường đôi, 1 giường đơn, bàn làm việc, điều hòa",
            price: 10000000,
            area: 55,
            rooms: 3, 
            adultsCount: 6, 
            reviews: 200,
            rating: 4.0,
            facilities: 5
          },
        
      ];
    
    
      const [selectedRooms, setSelectedRooms] = useState(roomData1.map(() => 0));
    
      const handleRoomChange = (index, value) => {
        const newSelectedRooms = [...selectedRooms];
        newSelectedRooms[index] = value;
        setSelectedRooms(newSelectedRooms);
      };
      const totalPrice1 = roomData1.reduce(
        (acc, room, index) => acc + room.price * selectedRooms[index],
        0
      );
    return (
        <div>
            <div className="mx-32 mt-10 bg-white rounded-lg">
                <h2 className="text-2xl font-bold mb-6">Đề xuất</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 shadow-md rounded-md mb-6">
                    {roomData.map((room, index) => (
                        <div key={room.id} className="bg-white p-4 shadow-sm rounded-lg">
                            <div className="text-center">
                                <img 
                                    src="https://dyf.vn/wp-content/uploads/2021/01/tai-sao-thiet-ke-phong-ngu-khach-san-quan-trong-nhat.jpg" 
                                    alt="Room Image" 
                                    className="object-cover rounded-md w-full h-40"
                                />
                            </div>
                            <div className="mt-4 text-gray-700">
                                <h4 className="text-base font-bold text-black">{room.type}</h4>
                                <p className="text-sm text-gray-900 mt-2">{room.description}</p>
                                <p className="text-sm text-gray-900 mt-2 flex items-center justify-between gap-4">
                                    <div className="text-blue-800 font-semibold">{room.price.toLocaleString()} VNĐ/đêm</div>
                                    <div className="font-semibold flex items-center">
                                        {room.adultsCount <= 2 ? 
                                            Array.from({ length: room.adultsCount }).map((_, index) => (<FaUser key={index} className="inline text-gray-700 mr-1" />)) : `${room.adultsCount} x `
                                        }
                                        {room.adultsCount > 2 && <FaUser className="inline text-gray-700 ml-1" />}
                                        <div className="text-black">/ 1 phòng</div>
                                    </div>
                                </p>

                                <div className="mt-1 flex items-center gap-1">
                                    <FaStar className="text-yellow-500 h-4 w-4"/>
                                    <span className="text-black font-semibold">{room.rating}</span>
                                    <span className="text-sm text-black font-semibold ml-2">{room.reviews} reviews</span>
                                    <span className="text-sm text-black font-semibold ml-2 flex items-center gap-1">
                                        <RiServiceFill className="text-green-500 h-4 w-4"/>
                                        {room.facilities}+ tiện ích
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-end gap-8 items-center rounded-lg">
                        <div className="text-lg font-bold text-black flex gap-2">
                            <div>Tổng giá:</div>
                            <span className="text-lg">{totalPrice.toLocaleString()} VNĐ/đêm</span>
                        </div>
                        <div className="flex justify-center items-center gap-4">
                            <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer">
                                Đặt phòng
                            </button>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 shadow-md rounded-md">
                    {roomData2.map((room, index) => (
                        <div key={room.id} className="bg-white p-4 shadow-sm rounded-lg">
                            <div className="text-center">
                                <img 
                                    src="https://dyf.vn/wp-content/uploads/2021/01/tai-sao-thiet-ke-phong-ngu-khach-san-quan-trong-nhat.jpg" 
                                    alt="Room Image" 
                                    className="object-cover rounded-md w-full h-40"
                                />
                            </div>
                            <div className="mt-4 text-gray-700">
                                <h4 className="text-base font-bold text-black">{room.type}</h4>
                                <p className="text-sm text-gray-900 mt-2">{room.description}</p>
                                <p className="text-sm text-gray-900 mt-2 flex items-center justify-between gap-4">
                                    <div className="text-blue-800 font-semibold">{room.price.toLocaleString()} VNĐ/đêm</div>
                                    <div className="font-semibold flex items-center">
                                        {room.adultsCount <= 2 ? 
                                            Array.from({ length: room.adultsCount }).map((_, index) => (<FaUser key={index} className="inline text-gray-700 mr-1" />)) : `${room.adultsCount} x `
                                        }
                                        {room.adultsCount > 2 && <FaUser className="inline text-gray-700 ml-1" />}
                                        <div className="text-black">/ 1 phòng</div>
                                    </div>
                                </p>

                                <div className="mt-1 flex items-center gap-1">
                                    <FaStar className="text-yellow-500 h-4 w-4"/>
                                    <span className="text-black font-semibold">{room.rating}</span>
                                    <span className="text-sm text-black font-semibold ml-2">{room.reviews} reviews</span>
                                    <span className="text-sm text-black font-semibold ml-2 flex items-center gap-1">
                                        <RiServiceFill className="text-green-500 h-4 w-4"/>
                                        {room.facilities}+ tiện ích
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex justify-end gap-8 items-center rounded-lg">
                        <div className="text-lg font-bold text-black flex gap-2">
                            <div>Tổng giá:</div>
                            <span className="text-lg">{totalPrice.toLocaleString()} VNĐ/đêm</span>
                        </div>
                        <div className="flex justify-center items-center gap-4">
                            <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer">
                                Đặt phòng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mx-32 mt-10 bg-white rounded-lg mb-10">
                <h2 className="text-2xl font-bold mb-6">Phòng còn trống</h2>
                <table className="min-w-full table-auto border-collapse mb-6">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="p-4 text-center font-semibold">Loại phòng</th>
                        <th className="p-4 text-center font-semibold">Số lượng khách</th>
                        <th className="p-4 text-center font-semibold">Giá mỗi đêm</th>
                        <th className="p-4 text-center font-semibold">Chọn phòng</th>
                        <th className="p-4 text-center font-semibold">Thao tác đặt phòng</th>
                    </tr>
                    </thead>
                    <tbody>
                    {roomData1.map((room, index) => (
                        <tr key={room.id} className="border-b">
                        <td className="w-4/12 p-4 border-r border-b text-gray-400">
                            <h4 className="text-xl font-semibold text-black mb-1">{room.type}</h4>
                            <p className="text-sm text-gray-900">{room.description}</p>
                            
                            <p className="text-sm text-gray-900 mt-2">Diện tích: <span className="font-semibold">{room.area}m²</span></p>
                            <div className="mt-4 flex items-center gap-1">
                            <FaStar className="text-yellow-500 h-4 w-4"/>
                            <span className="text-black font-semibold">{room.rating}</span>
                            <span className="text-sm text-black font-semibold ml-2">{room.reviews} reviews</span>
                            <span className="text-sm text-black font-semibold ml-2 flex items-center gap-1"><RiServiceFill className="text-green-500 h-4 w-4"/>{room.facilities}+ tiện ích</span>
                            </div>
                        </td>
                        <td className="w-1/12 p-4 border-b border-r text-gray-400">
                            <div className="flex items-center justify-center">
                                {room.adultsCount <= 4 ? Array.from({ length: room.adultsCount }).map((_, index) => (
                                        <FaUser key={index} className="inline text-gray-700" />
                                )) : `${room.adultsCount} x `}{room.adultsCount > 4 && <FaUser className="inline text-gray-700 ml-1" />}
                            </div>
                        </td>
                        <td className="p-4 text-center border-b border-r text-gray-400">
                            <div className="text-2xl font-semibold text-black flex justify-center items-end">
                                <div>{room.price.toLocaleString()} VNĐ/</div>
                                <div className="text-lg">đêm</div>
                            </div>
                        </td>
                        <td className="p-4 border-b border-r text-gray-400 text-center">
                            <select
                            value={selectedRooms[index]}
                            onChange={(e) => handleRoomChange(index, parseInt(e.target.value))}
                            className="px-4 py-2 border text-black border-gray-300 rounded-md"
                            >
                            {Array.from({ length: room.rooms + 1 }).map((_, i) => (
                                <option key={i} value={i}>
                                {i}
                                </option>
                            ))}
                            </select>
                        </td>
                        {index === 0 && (
                            <td className="p-4 border-l border-b text-gray-400 text-center" rowSpan={roomData1.length} >
                                <div className="text-lg font-bold text-black mb-4 flex items-center justify-center gap-1 flex-nowrap text-nowrap">
                                    <div>Tổng giá:</div>
                                    <span className="text-2xl">{totalPrice1.toLocaleString()} VNĐ/</span>
                                    <div className="text-lg">đêm</div>
                                </div>
                                <button className="bg-blue-500 text-white text-lg px-8 py-3 rounded-lg hover:bg-blue-600">Đặt phòng</button>
                            </td>
                        )}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SearchRoom;