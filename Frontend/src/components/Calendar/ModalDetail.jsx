import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { bookingService } from "../../service/bookingService";
import { useNavigate } from "react-router";
import { formatRelativeTime, getPreciseDuration, getUsedDuration } from "../../utils/FormatDate";

const ModalDetail = (props) => {
  const { isModalOpen, setIsModalOpen, bookingId, bookingDetailId } = props;
  const [booking, setBooking] = useState(bookingId);
  const [roomDetail, setRoomDetail] = useState(bookingDetailId);
  const navigate = useNavigate();
  const status = {
    booked: {
      title: "Đã đặt trước",
      color: "#f5942766",
    },
    temporary: {
      title: "Đã đặt tạm",
      color: "#1a99ee66",
    },
    completed: {
      title: "Đã trả",
      color: "#8c867f66",
    },
    pending: {
      title: "Đang sử dụng",
      color: "#43ff6466",
    },
  };

  useEffect(() => {
    const fetchBooking = async () => {
      const data = await bookingService.getBookingDetail(bookingId);
      if (data) setBooking(data);
      setRoomDetail(
        data?.details?.find(
          (item) => item.booking_detail_id === bookingDetailId
        )
      );
    };
    if (bookingId && bookingDetailId) fetchBooking();
  }, [bookingId, bookingDetailId]);

  
  const handleOk = () => {
    setIsModalOpen(false);
    navigate(`/admin/booking-details/${bookingId}`);
  };

  return (
    <Modal
      title={roomDetail?.room_number}
      open={isModalOpen}
      // onOk={handleOk}
      onCancel={() => setIsModalOpen(false)}
      style={{
        top: 20,
      }}
      width={700}
      footer={[
        // <Button
        //   key='back'
        //   onClick={handleOk}
        //   className='px-4 py-2 bg-white text-green-700 !border-green-600 rounded-md hover:!bg-green-100 hover:!text-green-700'
        // >
        //   Sửa đặt phòng
        // </Button>,
        <Button
          key='submit'
          type='primary'
          onClick={() => setIsModalOpen(false)}
          className='px-4 py-2 bg-green-600 text-white rounded-md hover:!bg-green-700'
        >
          Đóng
        </Button>,
      ]}
    >
      {booking && roomDetail && (
        <>
          <div className='rounded-lg border p-4'>
            <div className='mb-4 border-b'>
              <h5 className='text-base font-semibold pb-2'>
                {roomDetail.room_number}
                <span className='text-sm text-green-600 ml-2'>
                  {status[booking.booking_status]?.title}
                </span>
              </h5>
            </div>

            <div className='grid grid-cols-4 gap-4 text-sm mb-4'>
              <div className='col-span-2 border-r'>
                <p className='text-gray-500'>Khách hàng</p>
                <p>{booking.fullname}</p>
              </div>
              <div>
                <p className='text-gray-500'>Mã đặt phòng</p>
                <p>{booking.booking_id}</p>
              </div>
              <div className='col-span-2 border-r'>
                <p className='text-gray-500'>Thời gian lưu trú</p>
                <p className="flex gap-4 items-end">
                  <span>{getPreciseDuration(booking.checkin, booking.checkout)}</span>
                  <span className='text-gray-400 text-xs'>(Đã sử dụng: {getUsedDuration(booking.checkin, booking.checkout)})</span>
                </p>
              </div>
              <div className='border-r'>
                <p className='text-gray-500'>Nhận phòng</p>
                <p>{booking.checkin}</p>
              </div>
              <div>
                <p className='text-gray-500'>Trả phòng</p>
                <p>{booking.checkout}</p>
              </div>
            </div>
          </div>
          <div className='flex justify-between items-start gap-20 mt-5'>
            <div>
              {booking.details.length > 1 && (
                <>
                  <p className='font-semibold mb-2'>Các phòng cùng đơn</p>
                  {booking.details.map((i) => (
                    <span
                      key={i.booking_detail_id}
                      className={`py-1 px-2 mr-2 rounded-md text-xs font-semibold ${
                        i === roomDetail
                          ? "bg-orange-100 text-orange-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {i.room_number}
                    </span>
                  ))}
                </>
              )}
            </div>
            <div className='flex justify-between items-start gap-14 text-gray-700 bg-gray-100 p-4 rounded-lg'>
              <div>
                <p>P403</p>
                <p>Khách đã trả</p>
              </div>
              <div className='text-right font-semibold'>
                <p>{booking.total_price}</p>
                <p>{booking.total_price}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </Modal>
  );
};

export default ModalDetail;
