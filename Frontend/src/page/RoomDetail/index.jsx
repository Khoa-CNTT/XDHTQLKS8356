import React, { useEffect, useState } from "react";
import { LuBedDouble } from "react-icons/lu";
import { Icon } from "@iconify/react";
import SlickImages from "../../components/SlickImages";
import { roomService } from "../../service/roomService";
import { useParams } from "react-router-dom";
import { ratingService } from "../../service/ratingServices";
import dayjs from "dayjs";
import { formatDate } from "../../utils/FormatDate";
import { Pagination } from "antd";
import { extensionServices } from "../../service/extensionServices";

const RoomDetail = () => {
  const [room, setRoom] = useState();
  const [rating, setRating] = useState();
  const { id } = useParams();
  const [pageRating, setPageRating] = useState(1);
  const [amenitieRoom, setAmenitieRoom] = useState();
  const [amenitieHotel, setAmenitieHotel] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const dataRoom = await roomService.getRoomTypeById(id);
      const dataRating = await ratingService.getRating(id);
      const dataAmenitieRoom = await extensionServices.getExtension("room", id);
      const dataAmenitieHotel = await extensionServices.getExtension("hotel");
      // console.log(dataRating)
      if (dataRoom.status)
        setRoom({ ...dataRoom.room, image: parseImage(dataRoom.room.image) });
      if (dataRating.status) {
        const totalStars = dataRating.ratting.reduce(
          (sum, item) => sum + item.rate,
          0
        );
        setRating({ rating: dataRating.ratting, totalStars });
      }
      if (dataAmenitieHotel) setAmenitieHotel(dataAmenitieHotel);
      if (dataAmenitieRoom) setAmenitieRoom(dataAmenitieRoom);
    };
    fetchData();
  }, [id]);
  const parseImage = (img) => {
    try {
      const parsed = JSON.parse(img);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };
  console.log(rating);
  return (
    <div>
      {room && (
        <>
          <div className='my-10'>
            <SlickImages
              images={room.image}
              isDotImage={true}
              cssSlide={"w-full mx-auto lg:h-[500px] md:h-[450px] sm:h-[350px]"}
              cssButtonL={"left-10 top-[40%] text-gray-700"}
              cssButtonR={"right-10 top-[40%] text-gray-700"}
            />
          </div>

          <div>
            <div className='flex gap-20'>
              <div className='basis-2/3'>
                <div className='font-semibold text-4xl mb-10'>
                  {room.room_type || ""}
                </div>
                {amenitieRoom && amenitieRoom.length > 0 && (
                  <div className='flex gap-4 flex-wrap'>
                    {amenitieRoom.map((amenitie) => (
                      <div className='w-40 aspect-[1/1] bg-neutral-100 text-neutral-500 rounded-lg flex gap-1 flex-col justify-center items-center'>
                        <Icon icon={amenitie.icon} width={50} height={50} />
                        <div className='text-sm font-semibold tracking-widest'>
                          {amenitie.name}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className='mt-10 mb-5 font-semibold text-2xl'>
                  Mô tả chi tiết phòng
                </div>
                <p className='text-neutral-400'>
                  {room.description ||
                    `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
            elusion tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
              ex ea commodo consequat.`}
                </p>
                <div className='italic text-neutral-600 mt-2'>
                  Diện tích: {room.square_meters} m²
                </div>
                <div className='mt-10 mb-5 font-semibold text-2xl'>
                  Tiện ích khách sạn
                </div>
                {amenitieHotel&&amenitieHotel?.length&&
                <div className='grid grid-cols-2 gap-4 mb-10'>
                {amenitieHotel.map(amenitie=>
                  <div className='flex items-center gap-5 bg-white text-neutral-600 text-base font-medium'>
                    <Icon icon={amenitie.icon} width={24} height={24} />
                    <p>{amenitie.name}</p>
                  </div>
                  )}
                </div>
}
              </div>
              <div className='basis-1/3 sticky top-24 shadow rounded-2xl border border-neutral-100 p-5 text-neutral-500 h-fit'>

                <div className='w-full pb-5 border-b border-b-neutral-300 text-neutral-600 font-bold text-2xl'>
                  {room.price_per_night?.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                  /phòng
                </div>
                <div className='flex flex-col gap-4 my-6'>
                  <p>
                    Thời gian ở: {dayjs().format("DD/MM/YYYY")} -{" "}
                    {dayjs().add(1, "day").format("DD/MM/YYYY")}
                  </p>
                  <p>Số đêm: 1 đêm</p>
                  <p>Khách: {room.adult_count} người lớn </p>
                </div>
              </div>
            </div>
            <div className='mt-10'>
              <div className='flex items-center gap-10 font-semibold text-2xl'>
                <div>Đánh giá</div>
                <div className='flex items-end justify-center gap-1 '>
                  {rating && rating.rating.length > 0 ? (
                    <span>
                      {(rating.totalStars / rating.rating.length).toFixed(1)}
                    </span>
                  ) : (
                    <div className='text-neutral-500 text-center italic col-span-2 text-base'>
                      Chưa có đánh giá
                    </div>
                  )}
                  <Icon
                    icon='material-symbols:star-rounded'
                    width={30}
                    height={30}
                    className='text-yellow-300'
                  />
                </div>
              </div>
              {rating && (
                <>
                  <div className='grid grid-cols-2 gap-x-40 gap-y-8 my-10'>
                    {rating.rating?.length > 0 ? (
                      rating.rating
                        .slice((pageRating - 1) * 10, pageRating * 10 - 1)
                        .map((r, i) => (
                          <div k={i}>
                            <div className='flex items-start justify-between'>
                              <div className='flex items-center gap-5'>
                                <img
                                  src={r.image || ""}
                                  alt='Extra Hotel'
                                  className='w-16 h-16 object-cover rounded-full'
                                />
                                <div>
                                  <div className='mb-1 font-bold'>
                                    {r.fullname || ""}
                                  </div>
                                  <span className='flex text-neutral-600'>
                                    {[...Array(r.rate)].map((_, index) => (
                                      <Icon
                                        icon='material-symbols:star'
                                        width={18}
                                        height={18}
                                      />
                                    ))}
                                  </span>
                                </div>
                              </div>
                              <div className='text-sm text-neutral-400 font-semibold'>
                                {formatDate(
                                  r.formatDate || dayjs(),
                                  "dd/MM/YYYY"
                                )}
                              </div>
                            </div>
                            <div className='text-neutral-500 mt-6'>
                              {r.description || ""}
                            </div>
                            <div className='grid grid-cols-3 my-3'>
                              {parseImage(r.rating_image).map((i) => {
                                console.log("parseImage", i);
                                return (
                                  <img
                                    src={i}
                                    alt=''
                                    className='w-full aspect-1/1'
                                  />
                                );
                              })}
                            </div>
                          </div>
                        ))
                    ) : (
                      <></>
                    )}
                  </div>
                  <Pagination
                    align='center'
                    current={pageRating}
                    onChange={(page) => setPageRating(page)}
                    total={rating.rating?.length || 0}
                  />
                  ;
                </>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RoomDetail;
