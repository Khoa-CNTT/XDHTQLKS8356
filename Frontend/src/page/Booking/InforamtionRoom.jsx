import React from 'react';
import { getPreciseDuration } from '../../utils/FormatDate';
const formatCurrency = (number) => {
  if (typeof number !== "number") return "0₫"; // hoặc return ""; tùy ý
  return number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
};
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('vi-VN');
  };  
const InforamtionRoom = (props) => {
  console.log("props", props)
  const dataRoomDetail = {
    checkin: props.booking.checkin,
    checkout: props.booking.checkout,
    total_nights: getPreciseDuration(props.booking.checkin, props.booking.checkout),
    total_guests: props.booking.adult_count,
    total_room: props.booking_detail.reduce((sum, room) => sum + room.count, 0),
    details: props.booking_detail,
    total_amount: props.booking_detail.reduce((sum, room) => sum + room.count*room.total_price, 0)
  }
    return (
        <div className="space-y-4 text-sm text-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className='flex gap-2'>
                    <div className='block text-sm font-medium text-gray-900 dark:text-white'>Ngày nhận phòng:</div> 
                    <div>{formatDate(dataRoomDetail.checkin)}</div>
                </div>
                <div className='flex gap-2'>
                    <div className='block text-sm font-medium text-gray-900 dark:text-white'>Ngày trả phòng:</div>
                    <div> {formatDate(dataRoomDetail.checkout)}</div>
                </div>
                <div className='flex gap-2'>
                    <div className='block text-sm font-medium text-gray-900 dark:text-white'>Thời gian ở:</div> 
                    <div>{dataRoomDetail.total_nights} ngày</div>
                </div>
                <div className='flex gap-2'>
                    <div className='block text-sm font-medium text-gray-900 dark:text-white'>Số lượng người:</div>
                    <div>{dataRoomDetail.total_guests} người</div>
                </div>
                <div className='flex gap-2'>
                    <div className='block text-sm font-medium text-gray-900 dark:text-white'>Tổng số phòng:</div> 
                    <div>3</div>
                </div>
            </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-gray-300 rounded-lg bg-gray-100/50">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">Loại phòng</th>
              <th className="px-4 py-2">Giá mỗi phòng</th>
              <th className="px-4 py-2 text-center">Số lượng</th>
              {/* <th className="px-4 py-2 text-center">Số ngày</th> */}
              <th className="px-4 py-2">Thành tiền (VND)</th>
            </tr>
          </thead>
          <tbody>
            {dataRoomDetail.details.map((room, idx) => (
              <tr key={idx} className="">
                <td className="px-4 py-2">{room.room_type}</td>
                <td className="px-4 py-2 text-center">{formatCurrency(room.total_price)}</td>
                <td className="px-4 py-2 text-center">{room.count}</td>
                {/* <td className="px-4 py-2 text-center">{dataRoomDetail.rooms?.[0]?.nights || dataRoomDetail.total_nights}</td> */}
                <td className="px-4 py-2 text-center">{formatCurrency(room.total_price*room.count)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="max-w-sm ms-auto border border-gray-300 p-4 rounded-lg">
        <div className="flex justify-between font-semibold text-lg text-black">
          <span>Tổng cộng (VND)</span>
          <span>{formatCurrency(dataRoomDetail.total_amount)}</span>
        </div>
      </div>
    </div>
    );
};

export default InforamtionRoom;