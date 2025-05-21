import React, { useEffect, useState } from "react";
import { roomService } from "../../service/roomService";
import { Icon } from "@iconify/react/dist/iconify.js";
import { APP_ROUTER } from "../../utils/Constants";
import { Link } from "react-router-dom";

const RoomPage = () => {
  const [rooms, setRooms] = useState();

  useEffect(() => {
    const fetchRoom = async () => {
      const dataRooms = await roomService.getRoomType();
      console.log(dataRooms);
      if (dataRooms) setRooms(dataRooms);
    };
    fetchRoom();
  }, []);
  return (
    <div>
      <div className='text-center p-10  shadow '>
        <h2 className='text-3xl font-semibold text-[#0c2340]'>Loại phòng</h2>
        <p className='mt-4 font-semibold text-black text-lg'>
          Tiện ích khách sạn bao gồm
        </p>
        <div className='mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-black font-medium'>
          <div className='flex items-center gap-1'>
            <Icon icon='mdi:check-bold' className='text-green-600' />
            Free parking
          </div>
          <div className='flex items-center gap-1'>
            <Icon icon='mdi:check-bold' className='text-green-600' />
            Free WiFi
          </div>
          <div className='flex items-center gap-1'>
            <Icon icon='mdi:check-bold' className='text-green-600' />
            Non-smoking rooms
          </div>
          <div className='flex items-center gap-1'>
            <Icon icon='mdi:check-bold' className='text-green-600' />
            On-site restaurant
          </div>
          <div className='flex items-center gap-1'>
            <Icon icon='mdi:check-bold' className='text-green-600' />
            Outdoor pool
          </div>
          <div className='flex items-center gap-1'>
            <Icon icon='mdi:check-bold' className='text-green-600' />
            Fitness center
          </div>
        </div>
      </div>
      {(rooms && rooms.length) > 0 ? (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10 mb-6 p-10'>
          {rooms.map((room) => (
            <Link key={room.id} to={APP_ROUTER.ROOM_DETAIL.replace(":id", room.id)} className='bg-white p-4 shadow-sm rounded-lg hover:shadow-xl'>
              <div className='text-center'>
                <img
                  src={(() => {
                    try {
                      return JSON.parse(room.image)?.[0];
                    } catch {
                      return "/vite.svg";
                    }
                  })()}
                  alt='Room Image'
                  className='object-cover rounded-md w-full aspect-[2/1]'
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/vite.svg";
                  }}
                />
              </div>
              <div className='mt-4 text-gray-700'>
                <h4 className='text-base font-bold text-black'>
                  {room.room_type}
                </h4>
                <p className='text-sm text-gray-500 mt-2 line-clamp-2'>
                      {room.description||"Phòng nghỉ đơn giản, đầy đủ tiện nghi với giường đôi hoặc 2 giường đơn, phù hợp cho chuyến đi tiết kiệm nhưng vẫn thoải mái.Phòng nghỉ đơn giản, đầy đủ tiện nghi với giường đôi hoặc 2 giường đơn, phù hợp cho chuyến đi tiết kiệm nhưng vẫn thoải mái."}
                    </p>
                <div className='text-sm text-gray-900 mt-2 flex items-center justify-between gap-4'>
                  <div className='text-blue-800 font-semibold'>
                    {room.price_per_night.toLocaleString()} VNĐ/đêm
                  </div>
                  <div className='font-semibold flex items-center'>
                    {room.adult_count <= 2
                      ? Array.from({ length: room.adult_count }).map(
                          (_, index) => (
                            <Icon
                              icon='tabler:user-filled'
                              width='24'
                              height='24'
                              key={index}
                              className='inline text-gray-700 mr-1'
                            />
                          )
                        )
                      : `${room.adult_count} x `}
                    {room.adult_count > 2 && (
                      <Icon
                        icon='tabler:user-filled'
                        width='24'
                        height='24'
                        className='inline text-gray-700 mr-1'
                      />
                    )}
                    <div className='text-black'>/ 1 phòng</div>
                  </div>
                </div>

                <div className='mt-1 flex items-center gap-1'>
                  <Icon icon="material-symbols:star-rounded" width="24" height="24"  sclassName='text-yellow-500' />
                  <span className='text-black font-semibold'>
                        {room.rating||"4.5"}
                      </span>
                  <span className='text-sm text-black font-semibold ml-2'>
                        {room.reviews||"56"} reviews
                      </span>
                  <span className='text-sm text-black font-semibold ml-2 flex items-center gap-1'>
                        <Icon icon="hugeicons:service" width="24" height="24" lassName='text-green-500' />
                        {room.facilities||50}+ tiện ích
                      </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div>Loại phòng trống</div>
      )}
    </div>
  );
};

export default RoomPage;
