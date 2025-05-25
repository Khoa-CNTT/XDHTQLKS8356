import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { CiUser } from "react-icons/ci";
import { IoIosRemove, IoIosAdd } from "react-icons/io";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import { roomService } from "../../service/roomService";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { formatDate } from "../../utils/FormatDate";
const { RangePicker } = DatePicker;

const ModalRoom = (props) => {
  const { isModalOpen, setIsModalOpen, setDataOrder, dataOrder } = props;
  const [suggestedRooms, setSuggestedRooms] = useState([]);
  const [emptyRoom, setEmptyRoom] = useState([]);

  const fetchData = async () => {
    const checkin = formatDate(dataOrder.booking.checkin, "YYYY-MM-DD");
    const checkout = formatDate(dataOrder.booking.checkout, "YYYY-MM-DD");
    const room = await roomService.getEmptyRoombyUser(checkin, checkout, dataOrder.booking.adult_count);

    if (room) setSuggestedRooms(room.room_suggest);
    if (room) setEmptyRoom(room.room_empty);
  };

  useEffect(() => {
    fetchData();
  }, [
    dataOrder.booking.checkin,
    dataOrder.booking.checkout,
    dataOrder.booking.adult_count,
  ]);
  const handleOrder = (type, rooms) => {
    if (type === "suggest") {
      setDataOrder((prev) => ({
        ...prev,
        booking_detail: [...prev.booking_detail, ...rooms],
      }));
    }
    if (type === "empty") {
      const filteredRooms = emptyRoom.filter((room) => room.count > 0);
      if (filteredRooms.length === 0) {
        toast.error("Chọn số lượng phòng > 0");
        return;
      }
      setDataOrder((prev) => ({
        ...prev,
        booking_detail: filteredRooms.map(
          (room) => {
            const existing = dataOrder.booking_detail.find((r) => r.room_id === room.room_id);
            let count
            if (existing) {
              count = existing.count + room.count;
            } else {
              return room
            }
            return {...room, count: count<room.available?count:room.available};
          },
          [...prev.booking_detail]
        ),
      }));
    }
    setIsModalOpen(false);
  };

  console.log(dataOrder.booking.checkin, dataOrder.booking.checkout);
  return (
    <Modal
      title='Tìm kiếm phòng'
      open={isModalOpen}
      // onOk={handleOk}
      onCancel={() => setIsModalOpen(false)}
      style={{ top: 20 }}
      width={900}
      footer={[]}
    >
      <div className='container mx-auto p-6'>
        {/* Form chọn thời gian và số lượng người */}
        <div className='mb-6 flex gap-4 '>
          <div>
            <p className='block mb-2 text-sm font-medium text-gray-600 '>
              Ngày nhận phòng - Ngày trả phòng
            </p>
            <RangePicker
              value={[dataOrder.booking.checkin, dataOrder.booking.checkout]}
              onChange={(dates, dateStrings) => {
                if (dates)
                  setDataOrder((prev) => ({
                    ...prev,
                    booking: {
                      ...prev.booking,
                      checkin: dates[0],
                      checkout: dates[1],
                    },
                  }));
              }}
              disabledDate={(current) =>
                current && current < dayjs().endOf("day")
              }
            />
          </div>
          <div>
            <label
              for='quantity-input'
              class='block mb-2 text-sm font-medium text-gray-600 '
            >
              Số người
            </label>
            <div class='relative flex items-center max-w-[8rem] border rounded-md overflow-hidden'>
              <span
                onClick={() => {
                  if (dataOrder.booking.adult_count === 1) return;
                  else
                    setDataOrder((prev) => ({
                      ...prev,
                      booking: {
                        ...prev.booking,
                        adult_count: prev.booking.adult_count - 1,
                      },
                    }));
                }}
                className='p-1.5 text-lg hover:bg-gray-100 hover:cursor-pointer'
              >
                <IoIosRemove />
              </span>
              <span className='px-4'>{dataOrder.booking.adult_count}</span>
              <span
                onClick={() =>
                  setDataOrder((prev) => ({
                    ...prev,
                    booking: {
                      ...prev.booking,
                      adult_count: prev.booking.adult_count + 1,
                    },
                  }))
                }
                className='p-1.5 text-lg hover:bg-gray-100 hover:cursor-pointer'
              >
                <IoIosAdd />
              </span>
            </div>
          </div>
          {/* <button className="bg-blue-500 text-white px-4 py-1 rounded h-fit self-end">
            Tìm Kiếm
          </button> */}
        </div>

        {/* Bảng hiển thị danh sách gợi ý phòng */}
        <table className='w-full mb-6 '>
          <thead>
            <tr className='bg-blue-100 mb-2 rounded-xl text-center'>
              <th className=' p-2 text-left'>Phòng gợi ý</th>
              <th className=' p-2'>Giá tiền</th>
              <th className=' p-2'>Số lượng</th>
              <th className=' p-2'>Tổng cộng</th>
            </tr>
          </thead>
          {suggestedRooms.length > 0 ? (
            <tbody>
              {suggestedRooms.map((rooms, i) => {
                const totalAmount = rooms.reduce((sum, room) => {
                  return sum + room.total_price * room.count;
                }, 0);

                return rooms.map((room, index) => {
                  return (
                    <tr
                      key={index}
                      className={`hover:bg-gray-100 rounded-lg text-center ${
                        index === rooms.length - 1 ? "border-b" : ""
                      }`}
                    >
                      <td className='p-2 text-left font-semibold flex gap-2'>
                        {room.room_type}
                        <span className='flex font-normal items-center text-xs'>
                          {room.adult_count}
                          <CiUser />
                        </span>
                      </td>
                      <td className='p-2'>
                        {room.total_price.toLocaleString()} VND
                      </td>
                      <td className='p-2'>{room.count}</td>
                      {index === 0 && (
                        <td
                          className='p-2 font-semibold'
                          rowSpan={rooms.length}
                        >
                          <p>{totalAmount.toLocaleString()} VND</p>
                          <button
                            onClick={() => handleOrder("suggest", rooms)}
                            className='hover:text-white hover:bg-blue-800/70 px-2 py-1 mt-2 rounded text-blue-600 border border-blue-600'
                          >
                            Đặt Phòng
                          </button>
                        </td>
                      )}
                    </tr>
                  );
                });
              })}
            </tbody>
          ) : (
            <div className='text-gray-600 font-bold italic p-2 text-center mx-auto'>
              Không còn phòng trống phù hợp
            </div>
          )}
        </table>

        {/* Bảng hiển thị danh sách phòng trống */}
        <table className='w-full text-center'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='text-left p-2'>Lựa chọn khác</th>
              <th className=' p-2'>Giá</th>
              <th className=' p-2'>Số lượng</th>
              <th className=' p-2'></th>
            </tr>
          </thead>
          {emptyRoom.length > 0 ? (
            <tbody>
              {emptyRoom.map((room, index) => (
                <tr key={index} className=''>
                  <td className='p-2 text-left font-semibold '>
                    {room.room_type}
                    <span className='flex font-normal items-center text-xs'>
                      {room.adult_count}
                      <CiUser />
                      <span className='text-gray-500 ml-5'>
                        (Còn {room.available} phòng trống)
                      </span>
                    </span>
                  </td>
                  <td className=' p-2'>
                    {room.total_price.toLocaleString()} VND
                  </td>
                  <td className=' p-2 flex items-center justify-center gap-2'>
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
                      className='p-2 text-lg hover:bg-gray-100 hover:cursor-pointer'
                    >
                      <IoIosRemove />
                    </span>
                    <span>{room.count}</span>
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
                      className='p-2 text-lg hover:bg-gray-100 hover:cursor-pointer'
                    >
                      <IoIosAdd />
                    </span>
                  </td>
                  {index === 0 && (
                    <td
                      className=' p-2 font-semibold'
                      rowSpan={emptyRoom.length}
                    >
                      <div>
                        {(() => {
                          const total = emptyRoom?.reduce(
                            (sum, item) => sum + item.total_price * item.count,
                            0
                          );
                          return total > 0
                            ? `${total.toLocaleString()} VND`
                            : null;
                        })()}
                      </div>
                      <button
                        onClick={() => handleOrder("empty")}
                        className=' hover:text-white hover:bg-blue-600 px-2 py-1 mt-2 rounded text-blue-600 border border-blue-600'
                      >
                        Đặt Phòng
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          ) : (
            <div className='text-gray-600 font-bold italic p-2 text-center mx-auto'>
              Không còn phòng trống
            </div>
          )}
        </table>
      </div>
    </Modal>
  );
};

export default ModalRoom;
