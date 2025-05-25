import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import successImage from '../../assets/images/success.png';
import { IoArrowForwardOutline } from "react-icons/io5";
const BookingSuccess = () => {
  const navigate = useNavigate();
  const userRole = Cookies.get("role");

  const handleButtonClick = () => {
    if (!userRole) {
      navigate('/home'); 
    } else {
      navigate('/user/all_booking'); 
    }
  };

  return (
    <div className="px-6 text-center py-20">
      <img src={successImage} alt="Success" className="mx-auto mb-8" />
      <div className="mb-3 text-2xl font-semibold">Chúc mừng bạn đã đặt phòng thành công!</div>
      {!userRole ? (
        <div className="mb-8 italic  text-base">
          Thông tin đơn đặt phòng đã được gửi về email của bạn. Bạn vui lòng truy cập mail để biết thêm thông tin chi tiết.
        </div>
      ) : (
        <div className="mb-8 italic text-base">
          Nếu có bất kì vấn đề nào, bạn vui lòng liên hệ với bộ phận chăm sóc khách hàng của chúng tôi.
        </div>
      )}

      <button
        type="button"
        className="cursor-pointer text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        onClick={handleButtonClick}
      >
        <div className='flex gap-3 items-center'>
        <IoArrowForwardOutline className='w-5 h-5'/> <div className='text-base'>{!userRole ? "Quay về trang chủ" : "Đơn đặt phòng"}</div>
        </div>
      </button>
    </div>
  );
};

export default BookingSuccess;
