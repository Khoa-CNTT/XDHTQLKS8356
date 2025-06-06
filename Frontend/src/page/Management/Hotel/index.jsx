import React, { useEffect, useState } from "react";
import { hotelService } from "../../../service/hotelService";
import { FaLocationDot, FaPhoneFlip, FaHotel } from "react-icons/fa6";
import Button from "../../../components/Button";
import ModalHotel from "./ModalHotel";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SlickImages from "../../../components/SlickImages";
const Hotel = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const [resetFormTrigger, setResetFormTrigger] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const fetchHotel = async () => {
    const result = await hotelService.getHotel();
    if (result)
      setData({
        name: result.name || "",
        description: result.description || "",
        address: result.address || "",
        phone: result.phone,
        image: parseImage(result.image),
      });
    else setData({});
  };
  useEffect(() => {
    fetchHotel();
  }, []);
  const handleSubmit = async (formData) => {
    if (formData.image.length < 2) {
      toast.error("Vui lòng chọn ít nhất 2 ảnh.");
      return;
    }
    for (let key in formData) {
      if (formData[key] === "") {
        toast.error("Vui lòng nhập đầy đủ thông tin.");
        return;
      }
    }
    const phoneRegex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Số điện thoại không hợp lệ! Vui lòng nhập đúng định dạng.");
      return;
    }
    const data = {
      ...formData,
      image: JSON.stringify(formData.image)
    }
    try {
      const result = await hotelService.updateHotel(data);
      if (result.status == true) {
        toast.success(result.message);
        setResetFormTrigger(true);
        setModalVisible(false);
        fetchHotel();
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      navigate("/error");
    }
  };
  const parseImage = (img) => {
    try {
      const parsed = JSON.parse(img);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  return (
    <div className='h-screen'>
      <div className='mr-6 mt-6 flex justify-end'>
        <Button
          color='blue'
          textColor='white'
          children='Cập nhật'
          size='sm'
          onClick={() => setModalVisible(true)}
        />
      </div>
      {data && (
        <div className='flex flex-row h-full justify-center items-center gap-2'>
          <div className='w-1/2'>
            <SlickImages
              images={data.image}
              isDotImage={true}
              cssSlide={
                "w-[70%] mx-auto lg:h-[300px] md:h-[250px] sm:h-[150px]"
              }
              cssButtonL={"left-8 w-12 p-1 top-[28%] text-gray-700"}
              cssButtonR={"right-8 w-12 p-1 top-[28%] text-gray-700"}
            />
          </div>
          <div className='w-1/2 border-gray-300 rounded-xl p-5'>
            {data && (
              <>
                <div className='text-3xl font-bold text-blue-500 text-center'>
                  {data.name}
                </div>
                <div className='flex gap-4 mt-5 text-lg items-center'>
                  <FaPhoneFlip className='text-black' />
                  <div>{data.phone}</div>
                </div>
                <div className='flex gap-4 mt-2 text-lg items-center'>
                  <FaLocationDot className='text-black text-2xl' />
                  <div>{data.address}</div>
                </div>
                <div className='flex gap-4 mt-4 text-black'>
                  <div className='text-xl'>
                    <FaHotel className='text-black' />
                  </div>
                  <div
                    className='text-justify max-h-[250px] overflow-y-auto text-base whitespace-pre-line pr-3 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-2 
                                            [&::-webkit-scrollbar-track]:bg-gray-100
                                            [&::-webkit-scrollbar-thumb]:bg-gray-300
                                            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                                            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
                                            dark:[&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:rounded-full'
                  >
                    {data.description}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
      {modalVisible && (
        <div
          onClick={() => {
            setModalVisible(false);
          }}
          className='fixed inset-0 bg-gray-800/50 flex justify-center items-center z-50'
        >
          <div
            className='bg-white rounded-lg w-[80%] h-[90%] relative'
            onClick={(e) => e.stopPropagation()}
          >
            <ModalHotel
              data={data}
              handleClose={() => {
                setModalVisible(false);
              }}
              resetTrigger={resetFormTrigger}
              handleSubmit={handleSubmit}
            ></ModalHotel>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hotel;
