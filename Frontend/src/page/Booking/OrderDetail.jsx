import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { IoStar, IoStarHalf } from "react-icons/io5";
import { PiUserListDuotone } from "react-icons/pi";
import { LiaHotelSolid } from "react-icons/lia";
import { TbListDetails } from "react-icons/tb";

const OrderDetail = (props) => {
  const { info, setStep, handleOrder } = props;
  console.log("props: ", props);

  return (
    <div className=''>
      <h1 className='mx-auto font-bold text-2xl text-center pb-4 border-b'>
        THÔNG TIN ĐẶT PHÒNG
      </h1>
      <div className='border-b p-4'>
        <h2 className='flex gap-2 text-lg font-semibold mb-4'>
          <span className='text-3xl'>
            <PiUserListDuotone />
          </span>
          Khách hàng
        </h2>
        <div className='grid grid-rows-3 grid-cols-6 gap-4 my-2'>
          <div className='font-semibold'>Họ và tên </div>
          <div className='border-b pl-2'>{info.infoCustomer.fullname}</div>
          <div className='font-semibold ml-4'>Email </div>
          <div className='col-span-3 border-b pl-2'>
            {info.infoCustomer.email}
          </div>
          <div className='font-semibold'>Số điện thoại </div>
          <div className='border-b pl-2'>{info.infoCustomer.phone}</div>
          <div className='font-semibold ml-4'>Địa chỉ </div>
          <div className='col-span-3 border-b pl-2'>
            {info.infoCustomer.address}
          </div>
          {info.infoCustomer.note && (
            <>
              <div className='font-semibold'>Ghi chú </div>
              <div className='italic pl-2 col-span-5'>
                {info.infoCustomer.note}
              </div>
            </>
          )}
        </div>
      </div>

      <div className='border-b p-4'>
        <h2 className='flex gap-2 text-lg font-semibold mb-4'>
          <span className='text-3xl'>
            <LiaHotelSolid />
          </span>
          {info?.state?.name}
          <span className='text-sm'>
            {Array.from({ length: Math.floor(info?.state?.star) }, (_, i) => (
              <IoStar className='text-yellow-400 inline' key={i} />
            ))}
            {info?.state?.star % 1 !== 0 && (
              <IoStarHalf className='text-yellow-400 inline-block' />
            )}
            <sup>({info?.state?.star})</sup>
          </span>
        </h2>
        <p className='text-sm text-gray-600'>{info?.state?.address}</p>
      </div>

      <div className='border-b p-4 '>
        <h2 className='flex gap-2 text-lg font-semibold mb-4'>
          <span className='text-3xl'>
            <TbListDetails />
          </span>
          Chi tiết phòng
        </h2>
        <div className='grid grid-rows-3 grid-cols-6 gap-2 my-2'>
          <div className=''>Check-in</div>
          <div className='font-semibold col-span-2'>
            {new Date(info?.state?.checkin).toLocaleDateString("vi-VN")}
          </div>
          <div className='border-l pl-4'>Check-out </div>
          <div className='font-semibold col-span-2'>
            {new Date(info?.state?.checkout).toLocaleDateString("vi-VN")}
          </div>
          <div className=''>Số ngày ở </div>
          <div className='font-semibold col-span-5'>
            {(new Date(info?.state?.checkout) -
              new Date(info?.state?.checkin)) /
              (1000 * 60 * 60 * 24)}{" "}
            đêm
          </div>
          <div className=''>Chi tiết phòng </div>

          {/* đổi số phòng */}
          <div className='font-semibold col-span-5'>
            {info?.state?.room?.reduce(
              (total, item) => total + item.quantity,
              0
            )}{" "}
            phòng cho {info?.state?.adult} người
          </div>
          <div className='col-start-2 col-span-5 text-gray-500 italic grid grid-cols-12 gap-2'>
            {info?.state?.room?.map((r) => {
              return (
                <>
                  <div className='col-span-1'>{r.quantity}</div>
                  <div className='col-span-1'>×</div>
                  <div className='col-span-6'>{r.name}</div>
                  <div className='col-span-4 text-right'>
                    Giá mỗi đêm: {r.price.toLocaleString()} VND
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>

      <div className='text-sm mb-4'>
        {info?.state?.totalAmount && (
          <div className='grid grid-cols-6 grid-rows-3 items-center'>
            <div className='col-start-5'>Tổng tiền phòng</div>
            <div className='text-right'>
              {info?.state?.totalAmount.toLocaleString()} VND
            </div>
            <div className='col-start-5'>Giảm giá</div>
            <div className='text-right'>
              {(info?.state?.totalDiscount * info?.state?.totalAmount) / 100}{" "}
              VND
            </div>
            <div className='grid grid-cols-subgrid col-span-6 border-y py-2'>
              <div className='font-bold col-start-5'>TỔNG</div>
              <div className='font-bold text-right'>
                {(
                  (info?.state?.totalAmount *
                    (100 - info?.state?.totalDiscount)) /
                  100
                ).toLocaleString()}{" "}
                VND
              </div>
            </div>
          </div>
        )}
      </div>

      <div className='flex justify-end gap-4'>
        <button
          onClick={() => setStep((prev) => prev - 1)}
          className='text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
        >
          Quay lại
        </button>
        <button
          onClick={handleOrder}
          className='text-white bg-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'
        >
          Đặt phòng
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
