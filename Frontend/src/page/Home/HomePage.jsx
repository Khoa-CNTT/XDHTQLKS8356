import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { APP_ROUTER } from "../../utils/Constants";
import { FaUser } from "react-icons/fa";
import images from "../../assets/images";
import SlickImages from "../../components/SlickImages";
import SearchBar from "../../components/SearchBar";
import PageTransitionWrapper from "../../components/PageTransition";
const HomePage = () => {
  const imgs = [images.banner1, images.banner2, images.banner3, images.banner4];
  const [search, setSearch] = useState()
  return (
    <div>
      <div className='mt-10'>
          <SlickImages cssSlide={"w-full h-[600px]"}  images={imgs} isDotImage={false} />
      </div>
      <div className='w-4/5 mx-auto p-4'>
        <PageTransitionWrapper><SearchBar></SearchBar></PageTransitionWrapper>
      </div>
     <Outlet></Outlet>
    </div>
  );
};

export default HomePage;
