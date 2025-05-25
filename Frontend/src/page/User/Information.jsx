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
        if (!fullname.trim()) {
          toast.error("Vui lòng nhập dầy đủ họ và tên.");
          return;
        }
        if (!phone.trim()) {
          toast.error("Vui lòng nhập số điện thoại.");
          return;
        }
        const phoneRegex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
        if (!phoneRegex.test(phone)) {
          toast.error("Số điện thoại không hợp lệ! Vui lòng nhập đúng định dạng.");
          return;
        }
      
        const payload = { fullname, phone, image };
        try {
          const update = await userServices.updateUser(payload);
          if(update.success === true){
            toast.success("Cập nhật thông tin người dùng thành công");
            fetchUsers();
          }
        } catch (error) {
          console.error('Lỗi khi cập nhật người dùng:', error);
          alert('Cập nhật thất bại!');
        }
      };
      

    return (
        <div className='mt-20'>
            <div className='flex justify-center gap-10'>
                <div>
                    <div className="mt-10 flex">
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
                    {/* <div className="mt-5 flex items-center">
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
                    </div> */}
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
