import React, { useState } from 'react';

const Personnel = () => {
  const [formData, setFormData] = useState({
    
    name: "",
    email: "",
    phone: "",
    password: "",
    role: ""
    // Bạn có thể thêm các trường khác nếu cần
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className='h-screen flex items-center w-full justify-center'>
        <form className="w-1/3 mx-auto p-4 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-300">
      {/* Họ */}
      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Họ và tên
        </label>
        <input
          type="text"
          id="name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
            dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Họ và tên"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Email
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
            dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="email@example.com"
          required
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      {/* Số điện thoại */}
      <div>
        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Số điện thoại
        </label>
        <input
          type="tel"
          id="phone"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
            dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="0123456789"
          required
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      {/* Mật khẩu có bật/tắt con mắt */}
      <div className="relative">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Mật khẩu
        </label>
        <input
          type={showPassword ? "text" : "password"}
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
            focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10
            dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
            dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="••••••••"
          required
          value={formData.password}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-0 top-7 flex items-center pr-3 text-gray-500 dark:text-gray-400"
          tabIndex={-1}
          aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
        >
          {showPassword ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {/* Eye closed icon */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.954 9.954 0 012.152-6.024M9.88 9.88a3 3 0 104.24 4.24M15 12a3 3 0 01-6 0"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3l18 18"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {/* Eye open icon */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}
        </button>
      </div>
      <div>
          <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Vai trò
          </label>
          <select
            id="role"
            className="bg-gray-50 border border-gray-300  text-sm rounded-lg
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
              dark:bg-gray-700 dark:border-gray-600 dark:text-white
              dark:focus:ring-blue-500 dark:focus:border-blue-500 text-gray-400"
            value={formData.role}
            onChange={handleChange}
            required
          >
            <option value="" disabled className='text-gray-500'>Chọn vai trò</option>
            <option value="quanly">Quản lí</option>
            <option value="nhanvien">Nhân viên</option>
          </select>
        </div>
      {/* Nút thêm nhân viên */}
      <button
        type="submit"
        className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
      >
        Thêm nhân viên
      </button>
    </form>
    </div>
  );
};

export default Personnel;
