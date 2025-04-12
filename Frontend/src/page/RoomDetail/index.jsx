import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const HotelImage = ({ src, alt, onClick }) => (
  <div className="aspect-[3/2] overflow-hidden rounded-lg cursor-pointer" onClick={onClick}>
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </div>
);

const ImageHotel = ({ images }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const imageArray = images;

  const openImages = imageArray.slice(0, 5); // Tối đa 7 ảnh hiển thị
  const extraCount = imageArray.length - 5;
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = imageArray.map((src) => ({
  src,
  width: 800,
  height: 533, // 👈 giữ tỷ lệ 3:2
  imageFit: "cover"
}));

  return (
    <div>
      <div className="grid gap-2 sm:gap-3 lg:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {openImages.map((img, i) =>
          i === 4 && extraCount > 0 ? (
            <button
              key={i}
              onClick={() => setModalOpen(true)}
              className="relative aspect-[3/2] overflow-hidden rounded-lg cursor-pointer"
            >
              <img
                src={img}
                alt="Extra Hotel"
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white font-bold text-xl">
                +{extraCount} hình
              </div>
            </button>
          ) : (
            <HotelImage
              key={i}
              src={img}
              alt={`Hotel Image ${i + 1}`}
              className="cursor-pointer"
              onClick={() => {
                setCurrentIndex(i);
                setModalOpen(true);
              }}
            />
          )
        )}
      </div>

      <Lightbox
        open={isModalOpen}
        close={() => setModalOpen(false)}
        slides={slides}
        index={currentIndex}
        on={{
          view: ({ index }) => setCurrentIndex(index),
        }}
        plugins={[Thumbnails, Zoom]}
        styles={{
          container: {
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(8px)",
          },
          thumbnail: {
            background:"rgba(255,255,255,0.7)",
          }
        }}
      />
    </div>
  );
};

const RoomDetail = () => {
  const images = [
    "https://naidecor.vn/wp-content/uploads/2023/09/landscape_photography_tips_featured_image_1024x1024.webp",
    "https://naidecor.vn/wp-content/uploads/2023/09/landscape_photography_tips_featured_image_1024x1024.webp",
    "https://naidecor.vn/wp-content/uploads/2023/09/landscape_photography_tips_featured_image_1024x1024.webp",
    "https://naidecor.vn/wp-content/uploads/2023/09/landscape_photography_tips_featured_image_1024x1024.webp",
    "https://naidecor.vn/wp-content/uploads/2023/09/landscape_photography_tips_featured_image_1024x1024.webp",
    "https://naidecor.vn/wp-content/uploads/2023/09/landscape_photography_tips_featured_image_1024x1024.webp",
    "https://naidecor.vn/wp-content/uploads/2023/09/landscape_photography_tips_featured_image_1024x1024.webp",
    "https://naidecor.vn/wp-content/uploads/2023/09/landscape_photography_tips_featured_image_1024x1024.webp",
    "https://naidecor.vn/wp-content/uploads/2023/09/landscape_photography_tips_featured_image_1024x1024.webp",
    "https://naidecor.vn/wp-content/uploads/2023/09/landscape_photography_tips_featured_image_1024x1024.webp",
  ];

  return (
    <div>
      HomePage
      <ImageHotel images={images} />
    </div>
  );
};

export default RoomDetail;
