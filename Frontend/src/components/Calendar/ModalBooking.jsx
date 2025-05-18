import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { CiSearch, CiUser } from "react-icons/ci";
import { IoIosRemove, IoIosAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { roomService } from "../../service/roomService";
import { use } from "react";
import ModalRoom from "./ModalRoom";
import { bookingService } from "../../service/bookingService";
import { formatDate } from "../../utils/FormatDate";
import toast from "react-hot-toast";
const { RangePicker } = DatePicker;

const ModalBooking = (props) => {
  const { isModalOpen, setIsModalOpen } = props;
  const [openSearch, setOpenSearch] = useState(true);
  const [dataOrder, setDataOrder] = useState({
    booking: {
      checkin: dayjs(),
      checkout: dayjs().add(1, "day"),
      adult_count: 1,
    },
    booking_detail: [],
  });

  const handleOrder = async (e) => {
    e.preventDefault();
    console.log("dataOrder", dataOrder, e, e.target.elements.fullname.value);
    if (dataOrder.booking_detail.length > 0) {
      const data = {
        type: "employee",
        user_info: {
          fullname: e.target.elements.fullname.value,
          email: e.target.elements.email.value,
          phone: e.target.elements.phone.value,
          status: "employee",
          role: "guest",
        },
        booking: {
          checkin: formatDate(dataOrder.booking.checkin, "YYYY-MM-DD"),
          checkout: formatDate(dataOrder.booking.checkout, "YYYY-MM-DD"),
          adult_count: dataOrder.booking.adult_count,
          total_price: dataOrder?.booking_detail?.reduce(
            (sum, item) => sum + item.total_price * item.count,
            0
          ),
          type: "employee",
          fullname: e.target.elements.fullname.value,
          phone: e.target.elements.phone.value,
        },
        booking_detail: dataOrder?.booking_detail.map((item, i) => ({
          RoomId: item.room_id,
          count: item.count,
          price: item.total_price,
        })),
      };
      const bookingId = await bookingService.creatBooking(data);
      if (bookingId.status) {
        setDataOrder({
          booking: {
            checkin: dayjs(),
            checkout: dayjs().add(1, "day"),
            adult_count: 1,
          },
          booking_detail: [],
        });
        e.target.reset()
        setIsModalOpen(false)
        toast.success("Đặt phòng thành công")
      }
    }
  };

  return (
    <>
      <Modal
        title='Đặt/Nhận phòng nhanh'
        open={isModalOpen}
        // onOk={handleOk}
        onCancel={() => setIsModalOpen(false)}
        style={{ top: 20 }}
        width={900}
        footer={[]}
      >
        <form className='container mx-auto p-6' onSubmit={handleOrder}>
          {/* {users?.length > 0 && (
          <div className="max-h-64 overflow-y-auto border border-gray-300 rounded mb-4">
            {users.map((user) => (
              <div
                key={user}
                // onClick={() =>
                //   handleSelectUser(user)
                // }
                className="p-2 cursor-pointer hover:bg-gray-200"
              >
                <div>{user.fullName}</div>
                <small>{user.email}</small>
              </div>
            ))}
          </div>
        )} */}

          {/* Tìm kiếm khách hàng */}
          <div className='flex justify-between'>
            <div>
              <label
                for='search'
                class='mb-2 text-sm font-medium text-gray-900 sr-only'
              >
                Search
              </label>
              <div class='relative'>
                <div class='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-xl'>
                  <CiSearch />
                </div>
                <input
                  type='search'
                  id='search'
                  class='block ps-10 p-2  text-sm text-gray-900 border border-gray-300 rounded-lg  focus:ring-blue-500 focus:border-blue-500 '
                  placeholder='Tìm kiếm khách hàng'
                />
              </div>
            </div>
            <button
              onClick={() => setOpenSearch(true)}
              className='hover:bg-blue-600 ring-1 ring-blue-600 text-blue-600 hover:text-white font-medium rounded-lg px-4 py-2 '
            >
              Thêm phòng
            </button>
          </div>

          {/* Thông tin khách hàng */}
          <div className='flex gap-2 mt-4'>
            <div class='relative z-0 w-full mb-5 '>
              <label
                for='floating_last_name'
                className='block text-sm font-medium text-gray-600 mb-2'
              >
                Tên khách hàng
              </label>
              <input
                type='text'
                name='fullname'
                id='floating_last_name'
                onInvalid={(e) => {
                  if (!e.target.value.trim()) {
                    e.target.setCustomValidity("Vui lòng nhập tên khách hàng!");
                  }
                }}
                onInput={(e) => {
                  e.target.setCustomValidity("");
                }}
                className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5'
                placeholder='Nguyễn Văn A'
                required
              />
            </div>
            <div class='relative z-0 w-full mb-5 group'>
              <label
                for='floating_email'
                className='block text-sm font-medium text-gray-600 mb-2'
              >
                Email
              </label>
              <input
                type='email'
                name='email'
                id='floating_email'
                onInvalid={(e) => {
                  if (!e.target.value.trim()) {
                    e.target.setCustomValidity(
                      "Vui lòng nhập email khách hàng!"
                    );
                  }
                }}
                onInput={(e) => {
                  e.target.setCustomValidity("");
                }}
                className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5'
                placeholder='nguyena@gmail.com'
                required
              />
            </div>
            <div class='relative z-0 w-full mb-5 group'>
              <label
                for='floating_phone'
                className='block text-sm font-medium text-gray-600 mb-2'
              >
                Số điện thoại
              </label>
              <input
                type='tel'
                pattern='[0-9]{3}[0-9]{3}[0-9]{4}'
                name='phone'
                id='floating_phone'
                onInvalid={(e) => {
                  if (!e.target.value.trim()) {
                    e.target.setCustomValidity(
                      "Vui lòng nhập số điện thoại khách hàng!"
                    );
                  }
                }}
                onInput={(e) => {
                  e.target.setCustomValidity("");
                }}
                className='border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5'
                placeholder='0123456789'
                required
              />
            </div>
          </div>

          {/* Thông tin đặt phòng */}
          <div className='mb-6 flex '>
            <div className='flex items-center'>
              <div className='block text-sm font-medium text-gray-600 '>
                Ngày nhận phòng:
              </div>
              <div className='ml-4 font-semibold'>
                {dayjs(dataOrder.booking?.checkin).format("YYYY/MM/DD") || null}
              </div>
            </div>
            <div className='flex items-center ml-10'>
              <div className='block text-sm font-medium text-gray-600 '>
                Ngày trả phòng
              </div>
              <div className='ml-4 font-semibold'>
                {dayjs(dataOrder.booking?.checkout).format("YYYY/MM/DD") ||
                  null}
              </div>
            </div>
            <div className='flex items-center ml-10'>
              <div className='block text-sm font-medium text-gray-600 '>
                Số người ở
              </div>
              <div className='ml-4 font-semibold'>
                {dataOrder.booking?.adult_count || null}
              </div>
            </div>
          </div>

          {/* Danh sách phòng đặt */}
          <table className='w-full mb-6 '>
            <thead>
              <tr className='bg-blue-100 mb-2 rounded-xl text-center'>
                <th className=' p-2 text-left'>Phòng gợi ý</th>
                <th className=' p-2'>Giá tiền</th>
                <th className=' p-2'>Số lượng</th>
                <th className=' p-2'>Thành tiền</th>
              </tr>
            </thead>
            {dataOrder.booking_detail.length > 0 ? (
              <tbody>
                {dataOrder.booking_detail.map((room, index) => (
                  <tr
                    key={index}
                    className={` rounded-lg text-center border-b`}
                  >
                    <td className='p-2 text-left font-semibold flex gap-2'>
                      {room.room_name}
                      <span className='flex font-normal items-center text-xs'>
                        {room.adult_count}
                        <CiUser />
                      </span>
                    </td>
                    <td className='p-2'>
                      {room.total_price.toLocaleString()} VND
                    </td>
                    <td className='p-2'>{room.count}</td>
                    <td className='p-2 font-semibold '>
                      {(room.total_price * room.count).toLocaleString()} VND
                      <span className='py-2 text-lg float-right'>
                        <RiDeleteBin6Line />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            ) : (
              <div className='text-gray-600 font-bold italic p-2 text-center mx-auto'>
                Vui lòng chọn phòng
              </div>
            )}
          </table>
          <div className='flex items-end justify-between'>
            <div className='w-1/2'>
              <label
                for='message'
                class='block mb-2 text-sm font-semibold text-gray-900'
              >
                Ghi chú:
              </label>
              <textarea
                name='note'
                id='message'
                rows='4'
                class='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                placeholder='Nhập ghi chú ...'
              ></textarea>
            </div>
            <div className='flex justify-between items-start gap-14 text-gray-700 bg-gray-100 p-4 rounded-lg'>
              <p>Khách cần trả</p>
              <p className='text-right font-semibold'>
                {dataOrder?.booking_detail?.reduce(
                  (sum, item) => sum + item.total_price * item.count,
                  0
                )}{" "}
                VND
              </p>
            </div>
          </div>
          <div className='flex justify-end gap-4 mt-4 '>
            <button
              onClick={() => setIsModalOpen(false)}
              className='px-4 py-2 font-semibold bg-white text-blue-600 border !border-blue-600 rounded-md hover:!bg-blue-100 hover:!text-blue-600'
            >
              Đóng
            </button>
            <button
              type='submit'
              className='px-4 py-2 font-semibold bg-blue-600 text-white rounded-md hover:!bg-blue-600'
            >
              Đặt phòng
            </button>
          </div>
        </form>
        <ModalRoom
          isModalOpen={openSearch}
          setIsModalOpen={setOpenSearch}
          setDataOrder={setDataOrder}
          dataOrder={dataOrder}
        />
      </Modal>
    </>
  );
};

export default ModalBooking;
