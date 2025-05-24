import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast";
import { BsImageFill } from "react-icons/bs";
import { IoIosRemoveCircle } from "react-icons/io";
import { bookingService } from "../../service/bookingService";
import { updateImage } from "../../service/updateImage";
import { ratingService } from "../../service/ratingServices";
const ratingDescriptions = [
  "Tệ",
  "Không hài lòng",
  "Bình thường",
  "Hài lòng",
  "Tuyệt vời",
];

const ModalEvaluate = ({ visible, onClose, initialOrderDetailId, initialRating = null, dataOrder }) => {
    const {order, roomTypeId} = dataOrder
    console.log(order, roomTypeId)
  const [formData, setFormData] = useState({
    rating: initialRating,
    description: "", 
    image: [],
  });
  const [hover, setHover] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      setHover(null);
    }
  }, [visible, initialOrderDetailId, initialRating]);

  const handleRatingChange = (value) => {
    setFormData((prev) => ({ ...prev, rating: value }));
  };

  const handleDescriptionChange = (e) => {
    setFormData((prev) => ({ ...prev, description: e.target.value }));
  };
  const handleBeforeUpload = async (event) => {
    const image = await updateImage(event, setIsLoading);
    if (image) {
      setFormData((prev) => ({ ...prev, image: [...prev.image, image] }));
    } else toast.error("Lỗi tải ảnh");
  };

const handleRemoveImage = (indexToRemove) => {
    setFormData((prev) => ({
        ...prev,
        image: prev.image.filter((_, index) => index !== indexToRemove),
    }));
};
const createPayloadForSubmit = () => {
    const { rating, image, description } = formData;
    if (!order) return [];
    const start = order.checkin;
    const end = order.checkout;
    const bookingId = order.booking_id;
    const imageUrl = JSON.stringify(image) || []
    const payload =[{
      rate: rating,
      image: imageUrl,
      start: start,
      end: end,
      RoomId: roomTypeId,
      BookingId: bookingId,
      description: description
    }];
    return payload;
  };
  const handleSubmit = async () => {
    if (!formData.rating) {
      toast.error("Vui lòng chọn số sao đánh giá.");
      return;
    }
    if (!formData.description.trim()) {
      toast.error("Vui lòng nhập nội dung.");
      return;
    }
    const payload = createPayloadForSubmit();
    console.log("payload", payload)
    const result = await ratingService.createRating(payload);
    if(result.status) {
        toast.success("Đánh giá thành công")
        onClose();
        setFormData({
          rating: null,
          description: "",
          comment: "",
          image: [],
        });
    }else{
        toast.error("Đánh giá không thành công")
    }
   
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-30">
    
      <div className="bg-white rounded-lg w-2/5 shadow-lg relative">
        
        <div className="flex items-center justify-between p-5 bg-gray-200 rounded-t-lg">
            <div className="text-2xl font-bold text-center">Đánh giá phòng</div>
            <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 focus:outline-none cursor-pointer"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
       <div className="p-6  max-h-[60vh] overflow-y-auto">
            <div className="flex items-center mb-3">
                <div className="flex space-x-1">
                    {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                        <label
                        key={index}
                        onMouseEnter={() => setHover(starValue)}
                        onMouseLeave={() => setHover(null)}
                        onClick={() => handleRatingChange(starValue)}
                        className="cursor-pointer"
                        >
                        <FaStar
                            size={30}
                            color={
                            starValue <= (hover || formData.rating)
                                ? "#ffc107"
                                : "#e4e5e9"
                            }
                        />
                        </label>
                    );
                    })}
                </div>
                <span className="ml-4 min-w-[90px] font-medium text-gray-700">
                    {hover !== null
                    ? ratingDescriptions[hover - 1]
                    : formData.rating
                    ? ratingDescriptions[formData.rating - 1]
                    : "Chọn mức độ đánh giá"}
                </span>
            </div>
            <textarea
            rows="4"
            placeholder="Hãy chia sẻ nhận xét của bạn nhé!"
            className="w-full resize-none rounded-lg border border-gray-300 p-3 text-gray-900 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.description}
            onChange={handleDescriptionChange}
            />
            <div className="mt-5 shadow-md mb-8 pb-4">
                <div className="rounded-md w-full">
                    <h3 className="font-medium text-gray-700 mb-4 bg-gray-100 p-3">
                        Hình ảnh
                    </h3>
                    <div className="mt-6 mb-4">
                        <div className="flex items-center justify-center">
                            {isLoading ? (
                                <div
                                    role="status"
                                    className="flex items-center justify-center"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                                        viewBox="0 0 100 101"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"
                                        />
                                    </svg>
                                </div>
                            ) : (
                                <div>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleBeforeUpload}
                                        style={{
                                            position: "absolute",
                                            left: "-9999px",
                                        }}
                                        id="image-upload"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            document
                                                .getElementById(
                                                    "image-upload"
                                                )
                                                .click()
                                        }
                                        disabled={isLoading}
                                        className="cursor-pointer flex items-center justify-center rounded bg-gray-300 px-3 py-2 text-sm font-bold text-gray-800 hover:bg-gray-400"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="mr-2 inline w-6 fill-black"
                                            viewBox="0 0 32 32"
                                        >
                                            <path
                                                d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                                                data-original="#000000"
                                            />
                                            <path
                                                d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                                                data-original="#000000"
                                            />
                                        </svg>
                                        Chọn ảnh
                                    </button>
                                </div>
                            )}
                        </div>

                        {formData.image.length > 0 ? (
                            <div className="mt-4 grid grid-cols-2 gap-2 w-full p-2">
                                {formData.image.map((url, index) => (
                                    <div
                                        key={index}
                                        className="relative group flex mx-auto p-2 border border-gray-200 rounded-md"
                                    >
                                        <img
                                            src={url}
                                            alt={`Uploaded ${index}`}
                                            className="h-[160px] w-[240px] object-cover rounded-md"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleRemoveImage(index)
                                            }
                                            className="cursor-pointer absolute top-1 right-1 bg-red-400 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                                            title="Xóa ảnh"
                                        >
                                            <IoIosRemoveCircle className="w-6 h-6" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="mt-4 flex justify-center">
                                <div className="h-[150px] w-[150px] border-2 border-gray-300 border-dashed flex items-center justify-center">
                                    <BsImageFill className="h-[100px] w-[100px] text-gray-300 " />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        

            <div className="flex justify-end space-x-4 px-6 pb-6">
            <button
                type="button"
                onClick={onClose}
                className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
            >
                Hủy
            </button>
            <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
            >
                Đánh giá
            </button>
            </div>
      </div>
    </div>
  );
};

export default ModalEvaluate;
