import React, { useEffect, useState } from 'react';
import PageTransitionWrapper from '../../components/PageTransition';
import { hotelService } from "../../service/hotelService";
import { FaLocationDot } from "react-icons/fa6";
import { GrStar } from "react-icons/gr";
import { MdOutlineEmail } from "react-icons/md";
import { LuPhoneCall } from "react-icons/lu";
import { SlLocationPin } from "react-icons/sl";
import { CiLogin } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
const InformationHotel = () => {
  const [data, setData] = useState()
  const fetchHotel = async () => {
    const result = await hotelService.getHotel()
    if (result)
      setData(result);
    else setData({});
  };
  useEffect(() => {
    fetchHotel();
  }, []);
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div>
      <div className="h-screen">
        <PageTransitionWrapper className="h-full">
          <div className="flex items-center h-full">
            <div className="w-1/2 p-10">
              <div className='flex items-center gap-2 text-gray-400'><FaLocationDot />DA NANG CITY, VIETNAM</div>
              <div className='flex flex-col gap-2 text-7xl mt-2 font-title'>
                <div>{data?.name}</div>
                <div>Hotel</div>
              </div>
              <div className="flex space-x-1 text-gray-400 mt-10">
                {[...Array(5)].map((_, i) => (
                  <GrStar key={i} size={24} />
                ))}
            </div>
            </div>
            <div className="w-1/2 h-full">
              <img
                src="https://dam.melia.com/melia/file/gE5z9FBxGF4weU8Y6a8Z.jpg?im=RegionOfInterestCrop=(1920,1280),regionOfInterest=(1771.5,1180.5)"
                alt=""
                className="h-full w-full object-cover opacity-70"
              />
            </div>
          </div>
        </PageTransitionWrapper>
      </div>
      <div  className="h-screen">
        <PageTransitionWrapper className="h-full flex flex-col justify-center items-center">
          <div className='text-gray-500 font-title flex flex-col items-center gap-2'>
            <div className='text-6xl tracking-widest'>{data?.name}</div>
            <div className='text-base tracking-widest'>HOTEL </div>
          </div>
          <div className='w-2/3 font-title text-center mt-5'>
            <div className='whitespace-pre-line text-gray-700 text-lg'>{data?.description}</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 py-8 w-4/5 mx-auto mt-16">
            <div className=' pl-20'>
              <h3 className="text-sm mb-4 text-gray-700">CONTACT</h3>
              <div className="flex items-center gap-2 text-gray-600">
                <MdOutlineEmail />
                <span>danang.info@melia.com</span>
              </div>
              <div className="flex items-center gap-2 mt-2 text-gray-600">
                <LuPhoneCall />
                <span>{data?.phone}</span>
              </div>
              
            </div>

            <div className='px-8 border-x'>
              <h3 className="text-sm mb-4 text-gray-700">ADDRESS</h3>
              <p className="text-gray-600">
                {data?.address}
              </p>
              <div className="flex items-center gap-2 mt-2 text-gray-600 font-medium cursor-pointer hover:text-gray-700">
                <SlLocationPin   />
                <span>See on map</span>
              </div>
              
            </div>
            <div className='pl-16'>
              <h3 className="text-sm text-gray-700 mb-4">REGULATION</h3>
              <div className='flex items-center gap-2 text-gray-600 mb-1'>
              <CiLogin />
              <div>Check-in: 12:00</div>
              </div>
              <div className='flex items-center gap-2 text-gray-600'>
              <IoIosLogOut />
              <div>Check-out: 12:00</div>
              </div>
              <div className='flex items-center gap-2 text-gray-600 mt-2'>
            
              <div>Late check out fee</div>
              </div>
            </div>
          </div>
        </PageTransitionWrapper>
      </div>
      {/* <div className="h-screen">
        <PageTransitionWrapper className="h-full">
          <div className="max-w-3xl mx-auto p-4">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Câu hỏi thường gặp về {data?.name} Hotel
            </h2>
            {faqs.map((faq, index) => (
              <div key={index} className="border-b py-4 border-gray-300">
                <div
                  className="flex justify-between items-center cursor-pointer text-gray-600"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="text-base font-medium">{`${index + 1}. ${faq.question}`}</div>
                  {openIndex === index ? (
                    <AiOutlineMinus size={20} />
                  ) : (
                    <AiOutlinePlus size={20} />
                  )}
                </div>
                <div
                  className={`transition-all duration-800 ease-in-out overflow-hidden ${
                    openIndex === index ? "max-h-96 opacity-100 " : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="text-gray-600 text-sm mt-4">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </PageTransitionWrapper>
      </div> */}
    </div>
  );
};

export default InformationHotel;