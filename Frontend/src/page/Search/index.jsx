import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import { RiServiceFill } from "react-icons/ri";
import { useLocation, useNavigate } from "react-router-dom";
import { roomService } from "../../service/roomService";
import { Icon } from "@iconify/react/dist/iconify.js";
import toast from "react-hot-toast";
import { APP_ROUTER } from "../../utils/Constants";
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
      image:
        "https://dyf.vn/wp-content/uploads/2021/01/tai-sao-thiet-ke-phong-ngu-khach-san-quan-trong-nhat.jpg",
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
      image:
        "https://dyf.vn/wp-content/uploads/2021/01/tai-sao-thiet-ke-phong-ngu-khach-san-quan-trong-nhat.jpg",
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
      image:
        "https://dyf.vn/wp-content/uploads/2021/01/tai-sao-thiet-ke-phong-ngu-khach-san-quan-trong-nhat.jpg",
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
      image:
        "https://dyf.vn/wp-content/uploads/2021/01/tai-sao-thiet-ke-phong-ngu-khach-san-quan-trong-nhat.jpg",
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
      image:
        "https://dyf.vn/wp-content/uploads/2021/01/tai-sao-thiet-ke-phong-ngu-khach-san-quan-trong-nhat.jpg",
    },
  ];
  const totalPrice = roomData.reduce((acc, room) => acc + room.price, 0);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const checkin = searchParams.get("checkin");
  const checkout = searchParams.get("checkout");
  const adults = searchParams.get("adults");
  const [suggestedRooms, setSuggestedRooms] = useState([]);
  const [emptyRoom, setEmptyRoom] = useState([]);
  const navigate = useNavigate();
  const [dataOrder, setDataOrder] = useState({
    booking: {
      checkin: checkin,
      checkout: checkout,
      adult_count: adults,
    },
    booking_detail: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const suggest = await roomService.getSuggestRoom(
        checkin,
        checkout,
        adults
      );
      const empty = await roomService.getEmptyRoombyUser(checkin, checkout);
      if (suggest) setSuggestedRooms(suggest);
      if (empty) setEmptyRoom(empty);
    };
    fetchData();
  }, [checkin, checkout, adults]);

  const handleOrder = (type, rooms) => {
    let booking_detail;
    if (type === "suggest") {
      booking_detail = rooms;
      //   setDataOrder((prev) => ({ ...prev, booking_detail: rooms }));
    }
    if (type === "empty") {
      booking_detail = emptyRoom.filter((room) => room.count > 0);
      if (booking_detail.length === 0) {
        toast.error("Chọn số lượng phòng > 0");
        return;
      }
      //   setDataOrder((prev) => ({ ...prev, booking_detail: filteredRooms }));
    }
    console.log(dataOrder);

    const query = new URLSearchParams({
      rooms: JSON.stringify({ ...dataOrder, booking_detail }),
    }).toString();

    navigate(`${APP_ROUTER.INFOR_BOOKING}?${query}`);
  };
  console.log("dataOrder", dataOrder);
  const parseImage = (img) => {
      try {
        const parsed = JSON.parse(img);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    };

  return (
    <div>
      <div className=' mt-10 bg-white rounded-lg'>
        <h2 className='text-2xl font-bold mb-6'>Đề xuất</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 shadow-md rounded-md mb-6'>
          {roomData.map((room, index) => (
            <div key={room.id} className='bg-white p-4 shadow-sm rounded-lg'>
              <div className='text-center'>
                <img
                  src='https://dyf.vn/wp-content/uploads/2021/01/tai-sao-thiet-ke-phong-ngu-khach-san-quan-trong-nhat.jpg'
                  alt='Room Image'
                  className='object-cover rounded-md w-full h-40'
                />
              </div>
              <div className='mt-4 text-gray-700'>
                <h4 className='text-base font-bold text-black'>{room.type}</h4>
                <p className='text-sm text-gray-900 mt-2'>{room.description}</p>
                <p className='text-sm text-gray-900 mt-2 flex items-center justify-between gap-4'>
                  <div className='text-blue-800 font-semibold'>
                    {room.price.toLocaleString()} VNĐ/đêm
                  </div>
                  <div className='font-semibold flex items-center'>
                    {room.adultsCount <= 2
                      ? Array.from({ length: room.adultsCount }).map(
                          (_, index) => (
                            <FaUser
                              key={index}
                              className='inline text-gray-700 mr-1'
                            />
                          )
                        )
                      : `${room.adultsCount} x `}
                    {room.adultsCount > 2 && (
                      <FaUser className='inline text-gray-700 ml-1' />
                    )}
                    <div className='text-black'>/ 1 phòng</div>
                  </div>
                </p>

                <div className='mt-1 flex items-center gap-1'>
                  <FaStar className='text-yellow-500 h-4 w-4' />
                  <span className='text-black font-semibold'>
                    {room.rating}
                  </span>
                  <span className='text-sm text-black font-semibold ml-2'>
                    {room.reviews} reviews
                  </span>
                  <span className='text-sm text-black font-semibold ml-2 flex items-center gap-1'>
                    <RiServiceFill className='text-green-500 h-4 w-4' />
                    {room.facilities}+ tiện ích
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div className='col-span-1 sm:col-span-2 lg:col-span-3 flex justify-end gap-8 items-center rounded-lg'>
            <div className='text-lg font-bold text-black flex gap-2'>
              <div>Tổng giá:</div>
              <span className='text-lg'>
                {totalPrice.toLocaleString()} VNĐ/đêm
              </span>
            </div>
            <div className='flex justify-center items-center gap-4'>
              <button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer'>
                Đặt phòng
              </button>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 shadow-md rounded-md'>
          {roomData2.map((room, index) => (
            <div key={room.id} className='bg-white p-4 shadow-sm rounded-lg'>
              <div className='text-center'>
                <img
                  src='https://dyf.vn/wp-content/uploads/2021/01/tai-sao-thiet-ke-phong-ngu-khach-san-quan-trong-nhat.jpg'
                  alt='Room Image'
                  className='object-cover rounded-md w-full h-40'
                />
              </div>
              <div className='mt-4 text-gray-700'>
                <h4 className='text-base font-bold text-black'>{room.type}</h4>
                <p className='text-sm text-gray-900 mt-2'>{room.description}</p>
                <p className='text-sm text-gray-900 mt-2 flex items-center justify-between gap-4'>
                  <div className='text-blue-800 font-semibold'>
                    {room.price.toLocaleString()} VNĐ/đêm
                  </div>
                  <div className='font-semibold flex items-center'>
                    {room.adultsCount <= 2
                      ? Array.from({ length: room.adultsCount }).map(
                          (_, index) => (
                            <FaUser
                              key={index}
                              className='inline text-gray-700 mr-1'
                            />
                          )
                        )
                      : `${room.adultsCount} x `}
                    {room.adultsCount > 2 && (
                      <FaUser className='inline text-gray-700 ml-1' />
                    )}
                    <div className='text-black'>/ 1 phòng</div>
                  </div>
                </p>

                <div className='mt-1 flex items-center gap-1'>
                  <FaStar className='text-yellow-500 h-4 w-4' />
                  <span className='text-black font-semibold'>
                    {room.rating}
                  </span>
                  <span className='text-sm text-black font-semibold ml-2'>
                    {room.reviews} reviews
                  </span>
                  <span className='text-sm text-black font-semibold ml-2 flex items-center gap-1'>
                    <RiServiceFill className='text-green-500 h-4 w-4' />
                    {room.facilities}+ tiện ích
                  </span>
                </div>
              </div>
            </div>
          ))}
          <div className='col-span-1 sm:col-span-2 lg:col-span-3 flex justify-end gap-8 items-center rounded-lg'>
            <div className='text-lg font-bold text-black flex gap-2'>
              <div>Tổng giá:</div>
              <span className='text-lg'>
                {totalPrice.toLocaleString()} VNĐ/đêm
              </span>
            </div>
            <div className='flex justify-center items-center gap-4'>
              <button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer'>
                Đặt phòng
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className=' mt-10 bg-white rounded-lg mb-10'>
        <h2 className='text-2xl font-bold mb-6'>Phòng còn trống</h2>
        <div className='flex flex-col'>
          <div className='-m-1.5 overflow-x-auto'>
            <div className='p-1.5 min-w-full inline-block align-middle'>
              <div className='border border-gray-200 overflow-hidden dark:border-neutral-700'>
                <table className='min-w-full divide-y divide-gray-200 dark:divide-neutral-700 text-left text-sm'>
                  <thead className='bg-gray-50 dark:bg-neutral-800 text-center'>
                    <tr>
                      <th className='px-6 py-3 text-xs font-medium text-gray-500 uppercase dark:text-neutral-500'>
                        Lựa chọn khác
                      </th>
                      <th className='px-6 py-3 text-xs font-medium text-gray-500 uppercase dark:text-neutral-500'>
                        Ảnh
                      </th>
                      <th className='px-6 py-3 text-xs font-medium text-gray-500 uppercase dark:text-neutral-500'>
                        Giá
                      </th>
                      <th className='px-6 py-3 text-xs font-medium text-gray-500 uppercase dark:text-neutral-500'>
                        Số lượng
                      </th>
                      <th className='px-6 py-3 text-xs font-medium text-gray-500 uppercase dark:text-neutral-500 text-center'></th>
                    </tr>
                  </thead>
                  {emptyRoom.length > 0 ? (
                    <tbody className='divide-y divide-gray-200 dark:divide-neutral-700'>
                      {emptyRoom.map((room, index) => (
                        <tr key={index}>
                          <td className='px-6 py-4 whitespace-normal font-semibold text-gray-800 dark:text-neutral-200'>
                            {room.room_type}
                            <div className='flex items-center text-xs font-normal text-gray-500 dark:text-neutral-400 mt-1'>
                              {room.adult_count}
                              <Icon
                                icon='tabler:user-filled'
                                width='20'
                                height='20'
                                className='ml-1'
                              />
                              <span className='ml-4'>
                                (Còn {room.available} phòng trống)
                              </span>
                            </div>
                          </td>
                          <td className='px-6 py-4 w-[300px] whitespace-nowrap text-gray-800 dark:text-neutral-200'>
                            <img src={parseImage(room.image)?.[0] } alt="" className="w-full aspect-[2/1]"/>
                          </td>
                          <td className='px-6 py-4 text-center whitespace-nowrap text-gray-800 dark:text-neutral-200'>
                            {room.total_price.toLocaleString()} VND
                          </td>
                          <td className='px-6 py-4 whitespace-nowrap text-center'>
                            <div className='flex items-center justify-center gap-2'>
                              <span
                                onClick={() => {
                                  if (room.available > 0 && room.count > 0)
                                    setEmptyRoom((prev) =>
                                      prev.map((item, i) =>
                                        i === index
                                          ? { ...item, count: item.count - 1 }
                                          : item
                                      )
                                    );
                                }}
                                className='p-2 hover:bg-gray-100 rounded-lg cursor-pointer'
                              >
                                <Icon
                                  icon='material-symbols:remove'
                                  width='20'
                                  height='20'
                                />
                              </span>
                              <span className='text-gray-800 dark:text-neutral-200'>
                                {room.count}
                              </span>
                              <span
                                onClick={() => {
                                  if (room.count < room.available)
                                    setEmptyRoom((prev) =>
                                      prev.map((item, i) =>
                                        i === index
                                          ? { ...item, count: item.count + 1 }
                                          : item
                                      )
                                    );
                                }}
                                className='p-2 hover:bg-gray-100 rounded-lg cursor-pointer'
                              >
                                <Icon
                                  icon='material-symbols:add'
                                  width='20'
                                  height='20'
                                />
                              </span>
                            </div>
                          </td>
                          {index === 0 && (
                            <td
                              className='px-6 py-4 whitespace-nowrap text-center font-semibold text-gray-800 dark:text-neutral-200'
                              rowSpan={emptyRoom.length}
                            >
                              <div>
                                {(() => {
                                  const total = emptyRoom.reduce(
                                    (sum, item) =>
                                      sum + item.total_price * item.count,
                                    0
                                  );
                                  return total > 0
                                    ? `${total.toLocaleString()} VND`
                                    : null;
                                })()}
                              </div>
                              <button
                                onClick={() => handleOrder("empty")}
                                className='mt-2 inline-flex items-center px-3 py-1.5 text-sm font-semibold text-blue-600 border border-blue-600 rounded hover:bg-blue-600 hover:text-white dark:text-blue-400 dark:hover:bg-blue-500 dark:hover:text-white'
                              >
                                Đặt Phòng
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td
                          colSpan={4}
                          className='px-6 py-4 text-center italic text-gray-600 font-semibold dark:text-neutral-400'
                        >
                          Không còn phòng trống
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchRoom;
