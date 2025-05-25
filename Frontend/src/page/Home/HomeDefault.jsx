import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { APP_ROUTER } from "../../utils/Constants";
import { FaUser } from "react-icons/fa";
import PageTransitionWrapper from "../../components/PageTransition";
import { roomService } from "../../service/roomService";
// const MAX_DESC_LENGTH = 100;
const HomeDefault = () => {
  
    const [data, setData] = useState([]);
    const fetchRooms = async () => {
        const result = await roomService.getRoomType();
        setData(result);
    };

    useEffect(() => {
        fetchRooms();
    }, []);
    const navigate=useNavigate()
    // const renderDescription = (room) => {
    //   const desc = room.description || "";
    //   const isLong = desc.length > MAX_DESC_LENGTH;
    //   const shortDesc = isLong ? desc.slice(0, MAX_DESC_LENGTH) + "..." : desc;
  
    //   return (
    //     <p className="text-sm text-gray-500 mt-1">
    //       {shortDesc}{" "}
    //       {isLong && (
    //         <Link
    //           to={APP_ROUTER.ROOM_DETAIL.replace(":id", room.id)} // điều chỉnh URL chi tiết phòng theo route bạn có
    //           className="text-blue-600 hover:underline"
    //         >
    //           Xem chi tiết
    //         </Link>
    //       )}
    //     </p>
    //   );
    // };
    return (
        <div>
          <PageTransitionWrapper>
          <div className='w-full bg-gray-100 py-4 mt-20'>
        <div className='w-4/5 mx-auto p-4'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-4 h-1/3'>
            <Link
              to={APP_ROUTER.HOME}
              className='md:col-span-2 rounded-3xl overflow-hidden relative'
            >
              <img
                src='https://pistachiohotel.com/UploadFile/Gallery/Rooms/Deluxe/Deluxe-Twin-2.jpg'
                alt='Rooms'
                className='w-full h-full object-cover'
              />
              <div className='absolute bottom-6 left-10 text-white text-2xl font-bold'>
                Phòng
              </div>
            </Link>
            <div className='flex flex-col gap-4'>
              <Link
                to={APP_ROUTER.HOME}
                className='h-1/2 rounded-3xl overflow-hidden relative'
              >
                <img
                  src='https://pistachiohotel.com/UploadFile/Gallery/Restaurant/a7.jpg'
                  alt='Service'
                  className='w-full h-full object-cover'
                />
                <div className='absolute bottom-6 left-6 text-white text-xl font-bold'>
                  Dịch vụ
                </div>
              </Link>
              <Link
                to={APP_ROUTER.HOME}
                className='h-1/2 rounded-3xl overflow-hidden relative'
              >
                <img
                  src='https://pistachiohotel.com/UploadFile/Gallery/Gym/a4.jpg'
                  alt='Facilities'
                  className='w-full h-full object-cover'
                />
                <div className='absolute bottom-6 left-6 text-white text-xl font-bold'>
                  Tiện ích
                </div>
              </Link>
            </div>
          </div>
        </div>
          </div>
          </PageTransitionWrapper>
          {/* <PageTransitionWrapper>
          <div className='w-4/5 mx-auto px-4 py-16'>
            <div className='flex items-center justify-between mb-6'>
              <div>
                <p className='text-blue-500 font-medium'>Đặc biệt</p>
                <p className='text-gray-600 mt-2 max-w-xl'>
                  Trải nghiệm căn phòng đầy tiện nghi và thoải mái khi bạn đặt phòng
                  trực tiếp trên trang web chính thức của chúng tôi
                </p>
              </div>
              <button className='text-blue-500 font-medium hover:underline cursor-pointer' onClick={()=> navigate('/rooms')}>
                Tất cả
              </button>
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
              {data?.map((room) => (
                <Link to={APP_ROUTER.ROOM_DETAIL.replace(":id", room.id)}
                  key={room.id}
                  className='bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300'
                >
                  <img
                    src={JSON.parse(room.image)[0]}
                    alt={room.name}
                    className='w-full h-[220px] object-cover'
                  />
                  <div className='p-4'>
                    <div className='flex items-center justify-between'>
                      <h3 className='font-semibold text-lg'>{room.room_type}</h3>
                      <div className='flex items-center gap-1 text-sm text-gray-600'>
                      <span className="text-base">{room.adult_count} x </span>
                        <FaUser className='w-5 h-5' />
                        
                      </div>
                    </div>
                    {renderDescription(room)}
                    <div className='mt-4 text-xl font-bold flex items-baseline gap-1'>
                      {room.price_per_night}
                      <span className='text-sm font-normal text-gray-600'>
                        /Đêm
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          </PageTransitionWrapper> */}
        </div>
    );
};

export default HomeDefault;