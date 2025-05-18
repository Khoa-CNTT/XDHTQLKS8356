import React, { useState } from 'react';
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom';
import { APP_ROUTER } from '../../utils/Constants';
import InforamtionRoom from './InforamtionRoom';
import { bookingService } from '../../service/bookingService';

const InformationBooking = (props) => {
   const location = useLocation();
   const searchParams = new URLSearchParams(location.search);
   const [infoCustomer, setInfoCustomer] = useState(JSON.parse(searchParams.get('info')));
   const [dataRoom, setDataRoom]= useState(JSON.parse(searchParams.get('room')))
   const payload = {
      type: "guest",
      user_info: {
      fullname: infoCustomer.fullname,
      email: infoCustomer.email,
      phone: infoCustomer.phone,
      status: "temp",
      role: "guest"
    },
    booking: {
      checkin: dataRoom.checkin,
      checkout: dataRoom.checkout,
      adult_count: dataRoom.total_guests,
      total_price: dataRoom.final_amount,
      type: "guest",
      phone: infoCustomer.phone,
      fullname: infoCustomer.fullname,
      status: "temporary"
    },
    booking_detail: dataRoom.details.map(room => ({
      RoomId: room.id,
      count: room.quantity,
      price: room.total_price
    }))
   }
   const handleInfoChange = (e) => {
      const { name, value } = e.target;
      setInfoCustomer({ ...infoCustomer, [name]: value });
   };
   const navigate = useNavigate()
   const handleSubmit = async () => {
      const order = await bookingService.creatBookingRoom(payload);
      console.log("đặt phòng", order)
      navigate(APP_ROUTER.PAYMENT, {
        state: {
          infoCustomer: infoCustomer,
          dataRoom: dataRoom,
        },
      });
    };
    
   return (
      <div>
         <div className='basis-2/3'>
            <div>
               <h2 className="text-xl font-semibold mb-4">Thông tin khách hàng</h2>
               <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                     <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Họ và tên</label>
                        <input
                           type="text"
                           name="fullname"
                           value={infoCustomer.fullname}
                           className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required
                           onChange={handleInfoChange}
                        />
                     </div>

                     <div>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Số điện thoại</label>
                        <input
                           type="tel"
                           name="phone"
                           value={infoCustomer.phone}
                           className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required
                           pattern="[0-9]{10}"
                           placeholder="123 456 7890"
                           onChange={handleInfoChange}
                        />
                     </div>

                     <div className="col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input
                           type="email"
                           name="email"
                           value={infoCustomer.email}
                           className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required
                           onChange={handleInfoChange}
                        />
                        <div className='text-xs italic text-neutral-600 mt-2'>Thông tin xác nhận sẽ được gửi về địa chỉ mail này</div>
                     </div>
                     <div className="col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Địa chỉ</label>
                        <input
                           type="tel"
                           name="address"
                           value={infoCustomer.address}
                           className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           required
                           onChange={handleInfoChange}
                        />
                     </div>
                     <div className="col-span-2">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ghi chú</label>
                        <input
                           type="text"
                           name="note"
                           value={infoCustomer.note}
                           className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                           onChange={handleInfoChange}
                        />
                     </div>
                  </div>
               </div>

            </div>
            <div>
            <h2 className="text-xl font-semibold my-4">Chi tiết phòng</h2>
            <InforamtionRoom dataRoomDetail={dataRoom}></InforamtionRoom>
            </div>
            <div className="flex justify-end mt-5">
               <button onClick={handleSubmit} className="cursor-pointer text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
                  Tiếp theo
               </button>
            </div>

         </div>
      </div>
   );
};

export default InformationBooking;