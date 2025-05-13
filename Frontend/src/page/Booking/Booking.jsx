import { useLocation, useNavigate } from 'react-router-dom'
import React, { useState } from 'react';
import { IoCheckmark, IoStar, IoStarHalf } from 'react-icons/io5';
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
    fullname: '',
    email: '',
    phone: '',
    // address: '',
    // note: '',
    status : "guest",
    role : "guest"
  });
  const location = useLocation();
  const state = location.state;
  const [step, setStep] = useState(1)


  const handleOrder = async() => {
    const data = {
      type: "customer",
      user_info: infoCustomer,
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
      <ol className="flex items-center w-full sm:mb-5 gap-0">
        <li className={`${step >= 1 ? 'text-blue-600  after:border-blue-100 ' : ''} flex w-full items-center after:content-[''] after:w-10/12 after:h-1 after:border-b after:border-4 after:inline-block`}>
          <div className={`${step >= 1 ? ' bg-blue-100 ' : 'bg-gray-100 '} flex items-center justify-center text-2xl w-10 h-10 rounded-full lg:h-12 lg:w-12  shrink-0`}>
            {step > 1 ? (<IoCheckmark />) : (<BiSolidUserDetail />)}
          </div>
          <p className='p-2 ml-2'>Điền thông tin</p>
        </li>
        {/* <li className={`${step >= 2 ? 'text-blue-600  after:border-blue-100 ' : ''} flex w-full items-center after:content-[''] after:w-10/12 after:h-1 after:border-b after:border-4 after:inline-block`}>
          <div className={`${step >= 2 ? ' bg-blue-100 ' : 'bg-gray-100 '} flex items-center justify-center text-2xl w-10 h-10 rounded-full lg:h-12 lg:w-12  shrink-0`}>
            {step > 2 ? (<IoCheckmark />) : (<MdChecklist />)}
          </div>
          <p className='p-2 ml-2'>Kiểm tra</p>
        </li> */}
        <li className={`${step >= 3 ? 'text-blue-600 ' : ''} flex items-center w-auto`}>
          <div className={`${step >= 3 ? ' bg-blue-100 ' : 'bg-gray-100 '} flex items-center justify-center text-2xl w-10 h-10 rounded-full lg:h-12 lg:w-12 shrink-0`}>
            {/* <MdPayment /> */}
            <IoCheckmark />
          </div>
          <p className='p-2 ml-2'>Thanh toán</p>
        </li>
      </ol>
      <div className='mt-5 p-5 border rounded-xl'>
        {step === 1 ? (
          <Information setStep={setStep} infoCustomer={infoCustomer} setInfoCustomer={setInfoCustomer} />
        )
          :
          step === 2
          ?
          (
            <OrderDetail setStep={setStep} info={{ infoCustomer, state }} handleOrder={handleOrder} />
            )
            :
            (
            <Payment setStep={setStep} info={{ infoCustomer, state }} />
          )}
      </div>

    </div>
  )
}

export default Booking;