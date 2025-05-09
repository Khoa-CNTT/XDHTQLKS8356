import React from "react";
import { Link } from "react-router-dom";
import { APP_ROUTER } from "../../utils/Constants";
import { FaUser } from "react-icons/fa";
import images from "../../assets/images";
import SlickImages from "../../components/SlickImages";
import SearchBar from "../../components/SearchBar";
const HomePage = () => {
  const imgs = [images.banner1, images.banner2, images.banner3, images.banner4];
  const rooms = [
    {
      id: 1,
      name: "Phòng đôi",
      price: 699,
      description: "Có 1 giường đôi, bàn làm việc, điều hòa",
      image:
        "https://pistachiohotel.com/UploadFile/Gallery/Rooms/Superior/Superior-Double.jpg",
      count: "3",
    },
    {
      id: 2,
      name: "Phòng đơn",
      price: 699,
      description: "Có 1 giường đôi, bàn làm việc, điều hòa",
      image:
        "https://pistachiohotel.com/UploadFile/Gallery/Rooms/Superior/Superior-Double.jpg",
      count: "3",
    },
    {
      id: 3,
      name: "Phòng vip",
      price: 699,
      description: "Có 1 giường đôi, bàn làm việc, điều hòa",
      image:
        "https://pistachiohotel.com/UploadFile/Gallery/Rooms/Superior/Superior-Double.jpg",
      count: "3",
    },
  ];
  return (
    <div>
      <div className='mt-10'>
          <SlickImages cssSlide={"w-full h-[600px]"}  images={imgs} isDotImage={false} />
      </div>
      <div className='w-4/5 mx-auto p-4'>
        <SearchBar></SearchBar>
      </div>
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
      <div className='w-4/5 mx-auto px-4 py-16'>
        <div className='flex items-center justify-between mb-6'>
          <div>
            <p className='text-blue-500 font-medium'>Đặc biệt</p>
            <h2 className='text-3xl font-bold'>Được yêu thích</h2>
            <p className='text-gray-600 mt-2 max-w-xl'>
              Trải nghiệm căn phòng đầy tiện nghi và thoải mái khi bạn đặt phòng
              trực tiếp trên trang web chính thức của chúng tôi
            </p>
          </div>
          <button className='text-blue-500 font-medium hover:underline cursor-pointer'>
            Tất cả
          </button>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          {rooms.map((room) => (
            <div
              key={room.id}
              className='bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300'
            >
              <img
                src={room.image}
                alt={room.name}
                className='w-full h-[220px] object-cover'
              />
              <div className='p-4'>
                <p className='text-sm text-gray-500'>Room</p>
                <div className='flex items-center justify-between'>
                  <h3 className='font-semibold text-lg'>{room.name}</h3>
                  <div className='flex items-center gap-1 text-sm text-gray-600'>
                    <FaUser className='w-4 h-4' />
                    <span>{room.count}</span>
                  </div>
                </div>
                <p className='text-sm text-gray-500 mt-1'>{room.description}</p>
                <div className='mt-4 text-xl font-bold flex items-baseline gap-1'>
                  {room.price}
                  <span className='text-sm font-normal text-gray-600'>
                    /Đêm
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
