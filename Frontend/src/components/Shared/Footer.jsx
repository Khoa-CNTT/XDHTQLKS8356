import React from 'react';
import { Link } from 'react-router-dom';
import { APP_ROUTER } from '../../utils/Constants';

const Footer = () => {
    return (
        <div>
            <div className="bg-black/95 pt-8 pb-3 ">
                <div className="text-white w-full text-base max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Thông tin</a></li>
                            <li><a href="#" className="hover:underline">Liên hệ</a></li>
                            <li><a href="#" className="hover:underline">Vị trí</a></li>
                        </ul>
                    </div>
                    <div>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Câu hỏi thường gặp</a></li>
                            <li><a href="#" className="hover:underline">Điều khoản sử dụng</a></li>
                            <li><a href="#" className="hover:underline">Chính sách riêng tư</a></li>
                        </ul>
                    </div>
                    <div>
                        <ul className="space-y-2">
                            <li><a href="#" className="hover:underline">Dịch vụ</a></li>
                            <li><a href="#" className="hover:underline">Tiện ích</a></li>
                            <li><a href="#" className="hover:underline">Hướng dẫn đặt phòng</a></li>
                        </ul>
                    </div>
                    <div className="flex justify-center items-start">
                        <Link to={APP_ROUTER.HOME} className="flex flex-col items-center">
                            <img src="https://ps.w.org/ameliabooking/assets/icon-256x256.gif?rev=2935468" alt="Logo" className="w-16 h-16 rounded-md"/>
                        </Link>
                    </div>
                </div>
                <hr className='bg-white text-white mt-4 mb-2 w-3/4 mx-auto'/>
                <div className='flex justify-center'><div className='text-white text-sm'>© Copyright Booking Hotels. All right reserved.</div></div>
            </div>
        </div>
    );
};

export default Footer;