import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useOutletContext } from "react-router-dom";
import { APP_ROUTER } from "../../utils/Constants";
import InforamtionRoom from "./InforamtionRoom";
import { bookingService } from "../../service/bookingService";
import toast from "react-hot-toast";
import { isAuthenticated } from "../../utils/AuthCheck";
import { authService } from "../../service/authService";

const InformationBooking = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const dataRoom = JSON.parse(searchParams.get("rooms"));
  const [infoCustomer, setInfoCustomer] = useState({
    fullname: null,
    email: null,
    phone: null,
  });

  useEffect(() => {
    const checkAuth = isAuthenticated();
    const fetchUser = async () => {
      const data = await authService.getInfoUser();
      if (data?.user) {
        setInfoCustomer({
          fullname: data.user.fullname,
          email: data.user.email,
          phone: data.user.phone
        });
      }
    };
    if(checkAuth) fetchUser()
  },[]);

  const handleInfoChange = (e) => {
    const { name, value } = e.target;
    setInfoCustomer({ ...infoCustomer, [name]: value });
  };

  const handleSubmit = async () => {
    const type = isAuthenticated() ? "customer" : "guest";
    const hasInvalidField = Object.values(infoCustomer).some((value) => {
      return !value || !value.trim();
    });

    if (hasInvalidField) {
      toast.error("Điền đầy đủ thông tin");
      return;
    }
    try {
      const data = {
        type: type,
       ...(type !== "customer" && {
          user_info: {
            fullname: infoCustomer.fullname,
            email: infoCustomer.email,
            phone: infoCustomer.phone,
            status: "temp",
            role: type,
          },
        }),
        booking: {
          checkin: dataRoom.booking.checkin,
          checkout: dataRoom.booking.checkout,
          adult_count: dataRoom.booking.adult_count,
          total_price: dataRoom.booking_detail.reduce(
            (sum, room) => sum + room.count * room.total_price,
            0
          ),
          type: type,
          phone: infoCustomer.phone,
          fullname: infoCustomer.fullname,
          status: "temporary",
        },
        booking_detail: dataRoom.booking_detail.map((room) => ({
          RoomId: room.room_id,
          count: room.count,
          price: room.total_price,
        })),
      };
      const order = await bookingService.creatBookingRoom(data);
      console.log("đặt phòng", data);
      if(order.status)
      navigate(APP_ROUTER.PAYMENT, {
        state: {
          order: order.booking,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log("dataRoom", dataRoom);
  return (
    <div>
      <div className='basis-2/3'>
        <div>
          <h2 className='text-xl font-semibold mb-4'>Thông tin khách hàng</h2>
          <div className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-sm'>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Họ và tên
                </label>
                <input
                  type='text'
                  name='fullname'
                  value={infoCustomer?.fullname}
                  className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required
                  onChange={handleInfoChange}
                />
              </div>

              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Số điện thoại
                </label>
                <input
                  type='tel'
                  name='phone'
                  value={infoCustomer?.phone}
                  className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required
                  pattern='[0-9]{10}'
                  placeholder='123 456 7890'
                  onChange={handleInfoChange}
                />
              </div>

              <div className='col-span-2'>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Email
                </label>
                <input
                  type='email'
                  name='email'
                  value={infoCustomer?.email}
                  className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  required
                  onChange={handleInfoChange}
                />
                <div className='text-xs italic text-neutral-600 mt-2'>
                  Thông tin xác nhận sẽ được gửi về địa chỉ mail này
                </div>
              </div>
              <div className='col-span-2'>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Ghi chú
                </label>
                <input
                  type='text'
                  name='note'
                  // value={infoCustomer.note}
                  className='block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  // onChange={handleInfoChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <h2 className='text-xl font-semibold my-4'>Chi tiết phòng</h2>
          <InforamtionRoom {...dataRoom}></InforamtionRoom>
        </div>
        <div className='flex justify-end mt-5'>
          <button
            onClick={handleSubmit}
            className='cursor-pointer text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
          >
            Tiếp theo
          </button>
        </div>
      </div>
    </div>
  );
};

export default InformationBooking;
