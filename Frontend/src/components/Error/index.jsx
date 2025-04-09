import React from 'react';
import Button from '../Button';
import { Link } from 'react-router-dom';
import { APP_ROUTER } from '../../utils/Constants';
import { IoMdReturnLeft } from "react-icons/io";
import Cookies from 'js-cookie';

const Error = () => {
    const role = Cookies.get('role');
    const redirectPath = role === 'customer' ? APP_ROUTER.HOME : role === 'admin' ? APP_ROUTER.ADMIN : APP_ROUTER.HOME;
    return (
        <div className="flex justify-center items-center min-h-screen bg-white px-4">
            <div className='flex flex-col items-center text-center'>
                <img src="https://cellphones.com.vn/sforum/wp-content/uploads/2021/09/404.2.png" alt="Lỗi" className='w-1/2 h-1/2'/>
                <div className='text-3xl font-bold mt-6'>
                    Chà, bạn truy cập vào trang 404 rồi!
                </div>
                <Button className='mt-5' scale>
                    <Link to={redirectPath} className='flex items-center gap-2'>
                        <IoMdReturnLeft className='w-5 h-5' />
                        <div>Quay lại trang chủ</div>
                    </Link>
                </Button>
            </div>
        </div>
    );
};

export default Error;
