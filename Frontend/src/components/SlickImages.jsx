import { HiOutlineChevronRight } from "react-icons/hi";
import { HiOutlineChevronLeft } from "react-icons/hi";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Icon } from "@iconify/react/dist/iconify.js";

function SlickImages({ images, isDotImage, cssSlide, cssDot, cssButtonL, cssButtonR }) {
  const ButtonNext = (props) => {
    return (
      <Icon onClick={props.onClick} icon={"line-md:arrow-right"} width={70} height={70} className={`absolute p-2 rounded-full bg-white/15 hover:cursor-pointer ${cssButtonR || "top-[55%] right-7 text-gray-800 "}  `} />
    );
  };

  const ButtonPrev = (props) => {
    return (
      <Icon onClick={props.onClick} icon={"line-md:arrow-left"} width={70} height={70} className={`absolute z-10 p-2 rounded-full bg-white/15 hover:cursor-pointer ${cssButtonL || "top-[45%] right-7 text-gray-300"}`} />
    );
  };
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,
    nextArrow: <ButtonNext />,
    prevArrow: <ButtonPrev />,
    ...(isDotImage && {
      dotsClass:
        "mt-4 !flex justify-start overflow-x-auto [&>li]:opacity-50 [&>li]:m-2 [&_.slick-active]:opacity-100 [&_.slick-active]:ring-2 [&_.slick-active]:ring-blue-500 [&_.slick-active]:rounded-md ",
      customPaging: function (i) {
        return (
          <a className='block w-[50px] md:w-[80px] lg:w-[100px] aspect-[3/2]'>
            <img
              src={images[i]}
              alt=''
              className='w-full h-full object-cover rounded-md '
            />
          </a>
        );
      },
    }),
  };

  return (
    <Slider {...settings}>
      {images.map((item, index) => (
        <div key={index} className='h-full'>
          <div className={cssSlide}>
            <img
              className='w-full h-full overflow-hidden object-cover'
              src={item}
              alt=''
            />
          </div>
        </div>
      ))}
    </Slider>
  );
}
export default SlickImages;
