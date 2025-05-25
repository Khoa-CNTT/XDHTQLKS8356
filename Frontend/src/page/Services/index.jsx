import React, { useEffect, useRef, useState } from 'react';
import { extensionServices } from '../../service/extensionServices';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import "./index.css";
const ServicesPage = () => {
  const [data, setData] = useState([]);
  const [hoverIndex, setHoverIndex] = useState(null);
  const scrollRef = useRef(null);

  const fetchExtensions = async () => {
    const result = await extensionServices.getExtension();
    setData(result);
  };

  useEffect(() => {
    fetchExtensions();
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 300; // px
    if (container) {
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="text-gray-700 mt-20 mb-60 relative">
      <h2 className="text-center text-3xl font-semibold mb-8">Tiện ích khách sạn</h2>

      {/* Scroll buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
      >
        <FaChevronLeft />
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg z-10"
      >
        <FaChevronRight />
      </button>

      {/* Scrollable container */}
      <div
  ref={scrollRef}
  className="flex flex-nowrap overflow-x-auto scroll-smooth px-12 no-scrollbar space-x-6"
>

        {data?.map((item, index) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            className={`transition-opacity duration-300 cursor-pointer w-60 flex-shrink-0 text-center  border border-gray-200 p-6
              ${hoverIndex !== null && hoverIndex !== index ? "opacity-30" : "opacity-100"}
            `}
          >
            <img
              src={JSON.parse(item.image)[0]}
              alt={item.name}
              className="rounded-xl w-full h-60 object-cover mb-2"
            />
            <p className="text-lg font-medium">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;
