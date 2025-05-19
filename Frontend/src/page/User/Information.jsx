import React, { useEffect, useState } from 'react';
import { IoCloudUpload } from "react-icons/io5";
import { PiUserFocusDuotone } from "react-icons/pi";
import { FiEye, FiEyeOff } from "react-icons/fi"; 
import { userServices } from '../../service/userServices';
import toast from 'react-hot-toast';
const Information = () => {
    const [formData, setFormData] = useState({
        email: '',
        fullname: '',
        phone: '',
        password: '',
        image: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');

    const fetchUsers = async () => {
        try {
            const result = await userServices.getUser();
            setFormData({
                email: result.email || '',
                fullname: result.fullname?.trim() || '',
                phone: result.phone || '',
                password: result.password || '',
                image: result.image || '',
            });
            setImageUrl(result.image || '');
        } catch (error) {
            console.error('Lỗi khi lấy dữ liệu người dùng:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleBeforeUpload = async (event) => {
        const file = event.target.files[0];
        const formDataUpload = new FormData();
        formDataUpload.append('images', file);
        setIsLoading(true);
        try {
            const response = await fetch('http://localhost:8080/upload', {
                method: 'POST',
                body: formDataUpload,
            });
            const data = await response.json();
            setImageUrl(data[0]);
            setFormData(prev => ({ ...prev, image: data[0] }));
        } catch (error) {
            console.error('Tải ảnh không thành công:', error);
        }
        setIsLoading(false);
    };

    const handleFieldChange = (fieldName, value) => {
        setFormData(prev => ({ ...prev, [fieldName]: value }));
    };

    const handleSubmit = async () => {
        const { fullname, phone, image } = formData;
        const payload = { fullname, phone, image };
        console.log("pay",payload)
        try {
            
            const update = await userServices.updateUser(payload);
            if(update.success === true){
                toast.success("Cập nhật thông tin người dùng thành công")
                fetchUsers()
            }
           console.log("trạng thái", update)
        } catch (error) {
            console.error('Lỗi khi cập nhật người dùng:', error);
            alert('Cập nhật thất bại!');
        }
    };

    return (
        <div className='mt-20'>
            <div className='flex justify-center gap-10'>
                <div>
                    <div className="mt-5 flex">
                        <div className="flex min-w-[150px] items-center text-md text-[#121f43]">Email</div>
                        <div className="w-full max-w-[400px]">
                            <p className="text-sm font-medium text-[#121f43] px-3 py-2 rounded-lg bg-gray-100">
                                {formData.email}
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 flex">
                        <div className="flex min-w-[150px] items-center text-md">Họ và tên</div>
                        <label className="w-full max-w-[400px]">
                            <input
                                type="text"
                                name="fullname"
                                value={formData.fullname}
                                onChange={(e) => handleFieldChange('fullname', e.target.value)}
                                placeholder="Họ và tên"
                                className="text-sm placeholder:text-sm resize-none rounded-lg border border-[#B1C9DC] px-3 py-2 w-full font-medium outline-none hover:border-[#121F43] focus:border-[#2499ef] focus:ring-1 focus:ring-[#2499ef]"
                            />
                        </label>
                    </div>

                    <div className="mt-5 flex">
                        <div className="flex min-w-[150px] items-center text-md">Số điện thoại</div>
                        <label className="w-full max-w-[400px]">
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={(e) => handleFieldChange('phone', e.target.value)}
                                placeholder="Số điện thoại"
                                className="text-sm placeholder:text-sm resize-none rounded-lg border border-[#B1C9DC] px-3 py-2 w-full font-medium outline-none hover:border-[#121F43] focus:border-[#2499ef] focus:ring-1 focus:ring-[#2499ef]"
                            />
                        </label>
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="flex min-w-[150px] items-center text-md">Nhập mật khẩu cũ</div>
                        <div className="w-full max-w-[400px] relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={(e) => handleFieldChange('password', e.target.value)}
                                placeholder="********"
                               
                                className="text-sm placeholder:text-sm resize-none rounded-lg border border-[#B1C9DC] px-3 py-2 w-full font-medium outline-none hover:border-[#121F43] focus:border-[#2499ef] focus:ring-1 focus:ring-[#2499ef]"
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
                            >
                                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </span>
                        </div>
                    </div>
                    <div className="mt-5 flex items-center">
                        <div className="flex min-w-[150px] items-center text-md">Nhập mật khẩu mới</div>
                        <div className="w-full max-w-[400px] relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={(e) => handleFieldChange('password', e.target.value)}
                                placeholder="********"
                               
                                className="text-sm placeholder:text-sm resize-none rounded-lg border border-[#B1C9DC] px-3 py-2 w-full font-medium outline-none hover:border-[#121F43] focus:border-[#2499ef] focus:ring-1 focus:ring-[#2499ef]"
                            />
                            <span
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer"
                            >
                                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </span>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="mt-4 flex justify-center">
                        {imageUrl ? (
                            <img src={imageUrl} alt="Uploaded" className="h-[150px] w-[150px] rounded-full object-cover" />
                        ) : (
                            <div className="h-[150px] w-[150px] border border-dashed rounded-full flex items-center justify-center">
                                <PiUserFocusDuotone className='w-[100px] h-[100px]' />
                            </div>
                        )}
                    </div>
                    <div className="flex items-center justify-center mt-3">
                        {isLoading ? (
                            <div role="status" className="flex items-center justify-center">
                                <svg className="h-8 w-8 animate-spin fill-blue-600 text-gray-200" viewBox="0 0 100 101">
                                    <path d="M100 50.6C100 78.2 77.6 100.6 50 100.6S0 78.2 0 50.6 22.4 0.6 50 0.6s50 22.4 50 50z" fill="currentColor" />
                                    <path d="M93.97 39.04c2.43-.64 3.9-3.13 3.04-5.49C95.29 28.82 92.87 24.37 89.82 20.35c-3.97-5.23-8.93-9.63-14.6-12.94C69.54 4.1 63.28 1.94 56.77 1.05c-5-.68-10.07-.6-15.04.23-2.47.41-3.91 2.91-3.27 5.34.63 2.45 3.11 3.89 5.59 3.52 3.8-.56 7.66-.58 11.49-.06 5.32.73 10.45 2.5 15.08 5.22 4.63 2.67 8.7 6.26 11.96 10.53 2.34 3.07 4.22 6.44 5.6 10.03.9 2.34 3.36 3.79 5.79 3.13z" fill="currentFill" />
                                </svg>
                            </div>
                        ) : (
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleBeforeUpload}
                                    style={{ position: 'absolute', left: '-9999px' }}
                                    id="image-upload"
                                />
                                <button
                                    type="button"
                                    onClick={() => document.getElementById('image-upload').click()}
                                    disabled={isLoading}
                                    className="cursor-pointer flex items-center gap-2 justify-center rounded bg-gray-300 px-3 py-2 text-sm font-bold text-gray-800 hover:bg-gray-400"
                                >
                                    <IoCloudUpload className='w-5 h-5' />
                                    <div>Chọn ảnh</div>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className='flex justify-center mt-10'>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
                >
                    Lưu
                </button>
            </div>

        </div>
    );
};

export default Information;
