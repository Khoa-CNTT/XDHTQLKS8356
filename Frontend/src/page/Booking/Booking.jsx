import { useLocation, useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
import { IoCheckmark, IoStar, IoStarHalf } from 'react-icons/io5';
import { FaCheckCircle } from "react-icons/fa";
import { PiCardholderFill } from "react-icons/pi";
import Payment from './Payment';
import Information from './Information';
import OrderDetail from './OrderDetail';
import toast from 'react-hot-toast';
import { MdChecklist, MdPayment } from 'react-icons/md';
import { BiSolidUserDetail } from "react-icons/bi";
import { bookingService } from '../../service/bookingService';
import { APP_ROUTER } from '../../utils/Constants';
const Booking = () => {
  const navigate = useNavigate()
  const [infoCustomer, setInfoCustomer] = useState({
    fullname: 'Mỹ Lệ',
    email: 'myle@gmail.com',
    phone: '0794636494',
    address: 'Huế',
    note: 'Ok',
    status : "guest",
    role : "guest"
  });
  const location = useLocation();
  const state = location.state;
  const [step, setStep] = useState(1)

  const dataRoom = {
    "booking_id": 123,
    "checkin": "2025-01-01",
    "checkout": "2025-01-03",
    "total_nights": 2,
    "total_guests": 7,
    "note": "Yêu cầu phòng yên tĩnh.",
    "rooms": [
      {
        "room_type": "Phòng cao cấp",
        "room_number": "P705",
        "price_per_night": 3000000,
        "quantity": 1,
        "nights": 3,
        "total_price": 9000000
      },
      {
        "room_type": "Phòng luxury",
        "room_number": "P7056",
        "price_per_night": 4000000,
        "quantity": 1,
        "nights": 3,
        "total_price": 12000000
      }
    ],
    "total_amount": 21000000,
    "total_discount": 0,
    "final_amount": 21000000
  }
  
  const handleOrder = async() => {
    const data = {
      type: "customer",
      // user_info: infoCustomer,
      booking: {
        // checkin: state.checkin,
        // checkout: state.checkout,
        // adult_count: state.adult,
        // total_price: state.totalAmount,
        // note: infoCustomer.note,
        // fullname: infoCustomer.fullname,
        // email: infoCustomer.email,
        // numberphone: infoCustomer.phone
        checkin: "2024-12-25",               // Ngày check-in
        checkout: "2024-12-27",              // Ngày check-out
        adult_count: 2,                      // Số lượng người lớn
        total_price: 200,  
        type : "customer",
        status : "temporary"                  // Tổng giá tiền (ví dụ: USD)
        // note: "Yêu cầu giường đôi và phòng yên tĩnh.", // Ghi chú
        // fullname: "Nguyễn Văn A",           // Họ tên khách hàng
        // email: "nguyenvana@example.com",    // Email khách hàng
        // numberphone: "0912345678"            // Số điện thoại khách hàng
      },
      // booking_detail: state.room.map(room => ({
      //   RoomId: room.id,
      //   count: room.quantity,
      //   price: room.price
      // }))
      booking_detail : [
        {
          RoomId: 5,
          count: 1,
          price: 200
        },
      ]
    }
    const order = await bookingService.creatBooking(data)
    console.log("order", order)
    if (order?.booking) {
      toast.success("Đặt phòng thành công")
      // navigate(APP_ROUTER.HOME)
    } else {
      toast.error("Đặt phòng thất bại")
      navigate(-1)
    }
  }

  console.log("state", state);

  return (
    <div className='w-9/12 mb-10 mt-4 mx-auto'>
      <ol className="flex justify-between items-start w-full relative">
        <li className="flex flex-col items-center w-1/3 relative z-10">
          <div className={`flex items-center justify-center w-12 h-12 rounded-full text-2xl
              ${step >= 1 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
            {step > 1 ? <FaCheckCircle /> : <BiSolidUserDetail />}
          </div>
          <p className={`${step>=1 ? 'text-blue-600' : 'text-gray'} font-semibold mt-2 text-center text-sm`}>Thông tin khách hàng</p>
        </li>
        <div className={`${step > 1 ? 'bg-blue-100' : 'bg-gray-200/80'} absolute top-6 left-[16.5%] w-[33%] h-1 z-0 `}></div>
        <li className="flex flex-col items-center w-1/3 relative z-10">
          <div className={`flex items-center justify-center w-12 h-12 rounded-full text-2xl
              ${step >= 2 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
            {step > 2 ? <FaCheckCircle /> : <PiCardholderFill />}
          </div>
          <p className={`${step>=2 ? 'text-blue-600' : 'text-gray'} font-semibold mt-2 text-center text-sm`}>Chi tiết thanh toán</p>
        </li>
        <div className={`${step > 2 ? 'bg-blue-100' : 'bg-gray-200/80'} absolute top-6 left-[49.5%] w-[33%] h-1 z-0 `}></div>
        <li className="flex flex-col items-center w-1/3 relative z-10">
          <div className={`flex items-center justify-center w-12 h-12 rounded-full text-2xl
              ${step >= 3 ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
            <FaCheckCircle />
          </div>
          <p className={`${step>=3 ? 'text-blue-600' : 'text-gray'} font-semibold mt-2 text-center text-sm`}>Đã xác nhận đặt phòng</p>
        </li>
      </ol>

      <div className='mt-5 p-5 border border-gray-300 rounded-xl'>
        {step === 1 ? (
          <Information setStep={setStep} infoCustomer={infoCustomer} setInfoCustomer={setInfoCustomer} handleOrder={handleOrder} dataRoom={dataRoom}/>
        )
          :
          step === 2
          ?
          (
            <Payment setStep={setStep} info={{ infoCustomer, state, dataRoom }} />
            )
            :
            (
            {/* <Payment setStep={setStep} info={{ infoCustomer, state }} /> */}
          )}
      </div>

    </div>
  )
}

export default Booking;