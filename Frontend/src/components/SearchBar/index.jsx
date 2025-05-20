import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import { DatePicker } from "antd";
import { IoIosArrowDown } from "react-icons/io";
import { CiCalendar } from "react-icons/ci";
import { FaUserTie } from "react-icons/fa6";
import { MdChildCare } from "react-icons/md";
import { GrAdd, GrSubtract } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { APP_ROUTER } from "../../utils/Constants";
import { formatDate } from "../../utils/FormatDate";
const { RangePicker } = DatePicker;
const SearchBar = () => {
  const [isOpenAdults, setIsOpenAdults] = useState(false);
  const [date, setDate] = useState({
    startDate: dayjs(),
    endDate: dayjs().add(1, "day"),
  });
  const peopleRef = useRef(null);
  const [adults, setAdults] = useState(2);
  const [searchButtonHeight, setSearchButtonHeight] = useState(0);
  const adultRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAdultsClickOutside = (event) => {
      if (adultRef.current && !adultRef.current.contains(event.target)) {
        setIsOpenAdults(false);
      }
    };
    document.addEventListener("mousedown", handleAdultsClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleAdultsClickOutside);
    };
  }, []);
  useEffect(() => {
    if (peopleRef.current) {
      setSearchButtonHeight(peopleRef.current.offsetHeight);
    }
  }, []);

  const handleSearch = () =>{
      const query = new URLSearchParams({
    checkin: formatDate(date.startDate,'YYYY-MM-DD'), 
    checkout: formatDate(date.endDate,'YYYY-MM-DD'), 
    adults: adults.toString(),          
  }).toString();

  navigate(`${APP_ROUTER.SEARCH}?${query}`);
    console.log(date, adults)
  }
  return (
    <div className='mx-auto py-10 mt-20 bg-blue-100/50 rounded-2xl flex flex-col gap-8 '>
      <div className='flex flex-col items-center'>
        <div className='text-3xl font-medium mb-2'>Đặt phòng</div>
        <div className='text-gray-500'>
          Để khám phá không gian hoàn hảo dành cho bạn
        </div>
      </div>
      <div className='flex gap-6 items-end justify-evenly'>
        <div className='flex flex-col w-5/15'>
          <div className='mb-2 font-bold text-gray-700'>Ngày</div>
          <div className='flex gap-2 bg-white p-2 rounded-lg'>
            <span className='text-3xl flex justify-center items-center'>
              <CiCalendar />
            </span>
            {/* <Datepicker
              value={date}
              separator='—'
              minDate={new Date()}
              primaryColor={"blue"}
              displayFormat='DD/MM/YYYY'
              placeholder='Check-in date — Check-out date'
              toggleClassName='hidden'
              inputClassName='focus-visible:outline-none w-full h-full font-semibold'
              onChange={(newValue) =>
                setDate({
                  startDate: new Date(newValue.startDate.setHours(0, 0, 0, 0)),
                  endDate: new Date(newValue.endDate.setHours(0, 0, 0, 0)),
                })
              }
            /> */}
            <RangePicker
              value={[date.startDate, date.endDate]}
              onChange={(dates, dateStrings) => {
                if (dates)
                  setDate(() => ({
                    startDate: dates[0],
                    endDate: dates[1],
                  }));
              }}
              disabledDate={(current) =>
                current && current < dayjs().endOf("day")
              }
            />
          </div>
        </div>
        <div className='flex flex-col w-5/15'>
          <div className='mb-2 font-bold text-gray-700'>Khách</div>
          <div
            className='relative bg-white rounded-lg p-2 h-full'
            ref={peopleRef}
          >
            <div className='h-full flex justify-between items-center gap-6'>
              <div className='flex items-center justify-between gap-3 relative w-full' >
                <div className='flex gap-3 items-center'>
                  <span className='text-xl'>
                    <FaUserTie />
                  </span>
                  <span className='text-base'>Người lớn</span>
                </div>
                <div
                  className='flex gap-2 items-center cursor-pointer'
                  onClick={() => {
                    setIsOpenAdults((prev) => !prev);
                  }}
              
                >
                  <span className=''>{adults}</span>
                  <button className='text-xl focus:outline-none cursor-pointer'>
                    <IoIosArrowDown />
                  </button>
                  
                </div>
                {isOpenAdults && (
                    <div
                      className='z-10 w-full absolute left-[-8px] top-[100%] mt-2 p-2 bg-white border border-gray-300 rounded-lg shadow-lg cursor-default'
                        ref={adultRef}
                    >
                      <div className='flex justify-between items-center gap-2 w-full'>
                        <span className='text-nowrap'>Người lớn</span>
                        <div className='flex items-center rounded-lg bg-blue-50 w-1/3'>
                          <GrSubtract
                            className='w-full h-full p-2 cursor-pointer text-black'
                            onClick={(e) => {
                              e.stopPropagation();
                              setAdults((prev) => (prev >= 0 ? prev - 1 : 0));
                            }}
                          />
                          <span>{adults}</span>
                          <GrAdd
                            className='w-full h-full p-2 cursor-pointer'
                            onClick={(e) => {
                              e.stopPropagation();
                              setAdults((prev) => prev + 1);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => handleSearch()}
          style={{ height: `${searchButtonHeight}px` }}
          className='w-2/15 text-nowrap bg-blue-400 text-white rounded-lg hover:bg-blue-500 px-6 cursor-pointer'
        >
          Tìm kiếm
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
