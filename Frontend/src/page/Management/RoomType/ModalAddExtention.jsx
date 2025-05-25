import React, { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import { extensionServices } from '../../../service/extensionServices';

const ModalAddExtention = ({
  handleClose,
  lable,
  handleSubmit,
  data,
  resetTrigger,
  functionButton,
}) => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [dataExtention, setDataExtention] = useState();

  // Fetch extensions
  const fetchExtensions = async () => {
    const result = await extensionServices.getExtension();
    console.log("Tiện ích:", result);
    setDataExtention(result);
  };

  // Load data and set selectedIds from room amenities
  useEffect(() => {
    fetchExtensions();

    if (data?.amenities?.length > 0) {
      // Lấy tiện ích đã có từ phòng và lưu vào selectedIds
      const existingAmenities = data.amenities.map((amenity) => amenity.id);
      setSelectedIds(existingAmenities);
    }else{
        setSelectedIds([])
    }
  }, [data, resetTrigger]);

  const handleCheckboxChange = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id) // Bỏ chọn tiện ích
        : [...prev, id] // Chọn tiện ích
    );
  };

  const roomAmenities = dataExtention?.filter((item) => item.type === 'room');

  return (
    <div className="rounded-lg h-full overflow-hidden relative">
      <div className="flex items-center justify-between p-5 bg-gray-200">
        <div className="text-2xl font-bold text-center">{lable}</div>
        <button
          onClick={handleClose}
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
      <div
        className="overflow-y-auto bg-white w-full h-[calc(100%-120px)]
                [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar]:h-2 
                [&::-webkit-scrollbar-track]:bg-gray-100
                [&::-webkit-scrollbar-thumb]:bg-gray-300
                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        <div className="space-y-2 p-6">
          <h3 className="text-xl font-semibold mb-2">Chọn tiện ích phòng:</h3>
          {roomAmenities?.map((amenity) => (
            <label key={amenity.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                value={amenity.id}
                checked={selectedIds.includes(amenity.id)}
                onChange={() => handleCheckboxChange(amenity.id)}
                className="accent-blue-600"
              />
              <span>{amenity.name}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="rounded-b-lg absolute bottom-0 left-0 w-full bg-white border-t border-gray-300 flex flex-end justify-end gap-2 px-4 py-3">
        <Button
          color="blue"
          textColor="white"
          children={functionButton}
          size="lg"
          onClick={() => handleSubmit(selectedIds)} // Gửi selectedIds lên khi submit
        />
        <Button
          textColor="text-gray-700"
          children="Hủy"
          size="lg"
          handleClick={handleClose}
        />
      </div>
    </div>
  );
};

export default ModalAddExtention;
