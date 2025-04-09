import React, { useRef, useState } from "react";

import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import { PiEyeSlash, PiEye } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import axios from "axios";
function Register() {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        phone: "",
        password: "",
        confirmPassword: "",
        nameError: "",
        phoneError: "",
        emailError: "",
        passwordError: "",
        confirmPasswordError: "",
        isShowPassword: false,
        isShowConfirmPassword: false,
        token: "",
        isOtpSent: false,
        otp: ["", "", "", "", "", ""],
        otpError: "",
        isFocused: false,
        isFocusedEmail: false,
        isFocusedPhone: false,
        isFocusedPass: false,
        isFocusedConfirmPass: false,
        isFocusedRole: false,
        role: "",
        roleError: "",
    });
    const navigate = useNavigate();
    const otpRefs = useRef([]);
    const handleInputChange = (index, value) => {
        const newOtp = [...formData.otp];
        newOtp[index] = value;
        setFormData((prevState) => ({...prevState,otp: newOtp,}));
        if (value) {
            if (index < otpRefs.current.length - 1) {
                otpRefs.current[index + 1].focus();
            }
        } else {
            if (index > 0) {
                otpRefs.current[index - 1].focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !formData.otp[index]) {
            if (index > 0) {
                otpRefs.current[index - 1].focus();
            }
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({...prevState,[name]: value,}));
    };
    const IsValidate = () => {
        let isproceedIdEmail = true;
        let isproceedName = true;
        let isproceedPhone = true;
        let isproceedPass = true;
        let isproceedCheckPass = true;
        let isproceedError = true;

        if (formData.email === null || formData.email === "") {
            isproceedIdEmail = false;
            setFormData((prevState) => ({
                ...prevState,
                emailError: "Vui lòng nhập email của bạn!",
            }));
        } else if (
            /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
                formData.email
            )
        ) {
            setFormData((prevState) => ({
                ...prevState,
                emailError: "",
            }));
            isproceedIdEmail = true;
        } else {
            isproceedIdEmail = false;
            setFormData((prevState) => ({
                ...prevState,
                emailError: " Email không hợp lệ!",
            }));
        }
        if (formData.name === null || formData.name === "") {
            isproceedName = false;
            setFormData((prevState) => ({
                ...prevState,
                nameError: "Vui lòng nhập tên của bạn",
            }));
        }
        if (!formData.password.trim()) {
            isproceedPass = false;
            setFormData((prevState) => ({
                ...prevState,
                passwordError: "Vui lòng nhập mật khẩu của bạn!",
            }));
        } else if (
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?/;.&])[A-Za-z\d@$!%*?/;.&]{8,}$/.test(
                formData.password
            )
        ) {
            setFormData((prevState) => ({
                ...prevState,
                passwordError: "",
            }));
            isproceedPass = true;
        } else {
            isproceedPass = false;
            setFormData((prevState) => ({
                ...prevState,
                passwordError:
                    "Mật khẩu không hợp lệ! Tối thiểu tám ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt.",
            }));
        }
        if (!formData.confirmPassword.trim()) {
            isproceedCheckPass = false;
            setFormData((prevState) => ({
                ...prevState,
                confirmPasswordError: "Vui lòng nhập lại mật khẩu",
            }));
        } else if (formData.password !== formData.confirmPassword) {
            isproceedCheckPass = false;
            setFormData((prevState) => ({
                ...prevState,
                confirmPasswordError: "Mật khẩu không khớp",
            }));
        } else {
            setFormData((prevState) => ({
                ...prevState,
                confirmPasswordError: "",
            }));
            isproceedCheckPass = true;
        }
        // if (formData.role === null || formData.role === "") {
        //     isproceedName = false;
        //     setFormData((prevState) => ({
        //         ...prevState,
        //         roleError: "Vui lòng chọn vai trò của bạn",
        //     }));
        // }
        if (!formData.phone.trim()) {
            isproceedPhone = false;
            setFormData((prevState) => ({
                ...prevState,
                phoneError: "Vui lòng nhập SĐT của bạn",
            }));
        } else if (
            /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(formData.phone)
        ) {
            isproceedPhone = true;
            setFormData((prevState) => ({
                ...prevState,
                phoneError: "",
            }));
        } else {
            isproceedPhone = false;
            setFormData((prevState) => ({
                ...prevState,
                phoneError: "SĐT không hợp lệ",
            }));
        }
        console.log("2", isproceedPhone);
        return (
            isproceedIdEmail &&
            isproceedName &&
            isproceedPhone &&
            isproceedPass &&
            isproceedCheckPass &&
            isproceedError
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setFormData((prevState) => ({
            ...prevState,
            nameError: "",
            passwordError: "",
            confirmPasswordError: "",
            emailError: "",
            phoneError: "",
            otpError: "",
        }));

        if (IsValidate()) {
            const requestBody = {
                // role: formData.role,
                fullname: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.phone,
            };
            console.log(requestBody);
            try {
                const response = await axios.post(
                    "http://localhost:8080/api/customer/signup",
                    requestBody
                );
                const data = response.data;
                console.log(data);
                if (data.status === true) {
                    toast.success(data.message);
                    setFormData((prevState) => ({
                        ...prevState,
                        token: data.token,
                        isOtpSent: true,
                    }));
                }
            } catch (error) {
                toast.error("Email đã tồn tại!");
                setFormData((prevState) => ({
                    ...prevState,
                    emailError: "Email đã tồn tại!",
                }));
            }
        }
    };

    const handleVerifyOTP = async (e) => {
        e.preventDefault();
        const codes = formData.otp.join("");
        console.log("codes",codes);
        console.log("response", formData.token);
        if (codes.length === 6) {
            try {
                const response = await axios.post(
                    "http://localhost:8080/api/customer/active",
                    {
                        token: formData.token,
                        code: codes,
                    }
                );
                const data = response.data;
                if (data.success === true) {
                    toast.success("Đăng kí thành công.");
                    setFormData((prevState) => ({
                        ...prevState,
                        isOtpSent: false,
                        name: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                    }));
                    navigate("/auth/login");
                }
            } catch (error) {
                toast.error("Mã OTP sai");
                setFormData((prevState) => ({
                    ...prevState,
                    otpError: "Mã xác thực sai. Vui lòng nhập lại mã xác thực!",
                }));
            }
        } else {
            toast.warning("Vui lòng nhập đầy đủ mã xác thực!");
            setFormData((prevState) => ({
                ...prevState,
                otpError: "Vui lòng nhập đầy đủ mã xác thực!",
            }));
        }
    };
    const handleFocusName = () => {
        setFormData((prevState) => ({
            ...prevState,
            nameError: "",
        }));
    };
    const handleFocusEmail = () => {
        setFormData((prevState) => ({
            ...prevState,
            emailError: "",
        }));
    };
    const handleFocusPhone = () => {
        setFormData((prevState) => ({
            ...prevState,
            phoneError: "",
        }));
    };
    const handleFocusPassword = () => {
        setFormData((prevState) => ({
            ...prevState,
            passwordError: "",
        }));
    };
    const handleFocusConfirmPassword = () => {
        setFormData((prevState) => ({
            ...prevState,
            confirmPasswordError: "",
        }));
    };
    const handleFocusRole = () => {
        setFormData((prevState) => ({
            ...prevState,
            roleError: "",
        }));
    };
    return (
        <div className="flex w-full h-full">
           <div className="hidden md:flex w-1/2 bg-blue-500 min-h-screen justify-center items-center">
                <img src="https://ps.w.org/ameliabooking/assets/icon-256x256.gif?rev=2935468" alt="" className="w-2/3 h-auto rounded-2xl"/>
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center px-4 py-8">
                <form className="max-w-[70%]" onSubmit={handleSubmit}>
                    <div className="mb-2 text-3xl font-bold">Đăng ký</div>
                    <div className="mb-2 text-sm text-gray-600">
                        Bạn có thể đăng nhập tài khoản của mình để truy cập các
                        dịch vụ của chúng tôi.
                    </div>
                    <div className="mb-2 text-sm font-bold">Đăng nhập hoặc đăng ký (miễn phí)</div>
                    <div className="flex flex-col w-full">
                        <div>
                            <label htmlFor="name" className={`font-medium ${ formData.isFocused ? "text-black font-bold" : "text-gray-500" } transition-colors`} >
                                Họ và tên
                            </label>
                            <input
                                type="text"
                                placeholder="Tên của bạn"
                                name="name"
                                id="name"
                                className={`${!formData.nameError ? "focus:border-2 focus:border-solid focus:border-blue-500 focus:outline-none" : "border-2 border-solid border-red-500 outline-none"} w-full mt-1 rounded-md border-2 border-solid border-gray-400 px-4 py-3 text-sm`}
                                value={formData.name}
                                onChange={(e) => handleChange(e)}
                                onFocus={() => { setFormData((prevState) => ({...prevState, isFocused: true})); handleFocusName()}}
                                onBlur={() => setFormData((prevState) => ({...prevState, isFocused: false}))}
                            />
                            <div className={`${formData.nameError ? "" : "invisible py-4"} ml-4 pt-0.5 text-xs text-rose-500`}>
                                {formData.nameError}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="email" className={`font-medium ${formData.isFocusedEmail ? "text-black font-bold" : "text-gray-500"} transition-colors`}>
                                Email
                            </label>
                            <input
                                type="text"
                                placeholder="Email của bạn"
                                id="email"
                                name="email"
                                className={`${!formData.emailError ? "focus:border-2 focus:border-solid focus:border-blue-500 focus:outline-none" : "border-2 border-solid border-red-500 outline-none"} w-full mt-1 rounded-md border-2 border-solid border-gray-400 px-4 py-3 text-sm`}
                                value={formData.email}
                                onChange={(e) => handleChange(e)}
                                onFocus={() => { setFormData((prevState) => ({...prevState, isFocusedEmail: true})); handleFocusEmail()}}
                                onBlur={() => setFormData((prevState) => ({...prevState, isFocusedEmail: false}))}
                            />
                            <div className={`${formData.emailError ? "" : "invisible py-4"} ml-4 pt-0.5 text-xs text-rose-500`}>
                                {formData.emailError}
                            </div>
                        </div>
                        <div>
                            <label htmlFor="phone" className={`font-medium ${formData.isFocusedPhone ? "text-black font-bold" : "text-gray-500"} transition-colors`}>
                                Số điện thoại
                            </label>
                            <input
                                type="text"
                                placeholder="Số điện thoại của bạn"
                                id="phone"
                                name="phone"
                                className={`${!formData.phoneError ? "focus:border-2 focus:border-solid focus:border-blue-500 focus:outline-none" : "border-2 border-solid border-red-500 outline-none"} w-full mt-1 rounded-md border-2 border-solid border-gray-400 px-4 py-3 text-sm`}
                                value={formData.phone}
                                onChange={(e) => handleChange(e)}
                                onFocus={() => { setFormData((prevState) => ({...prevState, isFocusedPhone: true})); handleFocusPhone()}}
                                onBlur={() => setFormData((prevState) => ({...prevState, isFocusedPhone: false}))}
                            />
                            <div className={`${formData.phoneError ? "" : "invisible py-4"} ml-4 pt-0.5 text-xs text-rose-500`}>
                                {formData.phoneError}
                            </div>
                        </div>
                        <label htmlFor="password" className={`mb-1 font-medium ${formData.isFocusedPass ? "text-black font-bold" : "text-gray-500"} transition-colors`}>
                            Mật khẩu
                        </label>
                        <div className="relative">
                            <input
                                type={formData.isShowPassword ? "text" : "password"}
                                placeholder="Mật khẩu"
                                name="password"
                                id="password"
                                className={`${!formData.passwordError ? "focus:border-2 focus:border-solid focus:border-blue-500 focus:outline-none": "border-2 border-solid border-red-500 outline-none"} w-full rounded-md border-2 border-solid border-gray-400 px-4 py-3 text-sm`}
                                value={formData.password}
                                onChange={(e) => handleChange(e)}
                                onFocus={() => { setFormData((prevState) => ({...prevState, isFocusedPass: true})); handleFocusPassword()}}
                                onBlur={() => setFormData((prevState) => ({...prevState, isFocusedPass: false}))}
                            />
                            <div className={`${formData.passwordError ? "" : "invisible py-4" } ml-4 pt-0.5 text-xs text-rose-500`} >
                                {formData.passwordError}
                            </div>
                            {formData.isShowPassword ? (
                                <PiEyeSlash
                                    className="absolute right-4 top-3 h-6 w-6 cursor-pointer text-gray-400"
                                    onClick={() =>setFormData((prevState) => ({...prevState,isShowPassword: false,}))}
                                />
                            ) : (
                                <PiEye
                                    className="absolute right-4 top-3 h-6 w-6 cursor-pointer text-gray-400"
                                    onClick={() =>setFormData((prevState) => ({...prevState, isShowPassword: true}))}
                                />
                            )}
                        </div>
                        <label htmlFor="confirmPassword" className={`mb-1 font-medium ${formData.isFocusedConfirmPass ? "text-black font-bold" : "text-gray-500"} transition-colors`}>
                            Xác nhận mật khẩu
                        </label>
                        <div className="relative">
                            <input
                                type={formData.isShowConfirmPassword ? "text" : "password"}
                                placeholder="Nhập lại mật khẩu"
                                name="confirmPassword"
                                id="confirmPassword"
                                className={`${!formData.confirmPasswordError ? "focus:border-2 focus:border-solid focus:border-blue-500 focus:outline-none" : "border-2 border-solid border-red-500 outline-none"} w-full rounded-md border-2 border-solid border-gray-400 px-4 py-3 text-sm`}
                                value={formData.confirmPassword}
                                onChange={(e) => handleChange(e)}
                                onFocus={() => { setFormData((prevState) => ({...prevState, isFocusedConfirmPass: true})); handleFocusConfirmPassword()}}
                                onBlur={() => setFormData((prevState) => ({...prevState, isFocusedConfirmPass: false}))}
                            />
                            <div className={`${formData.confirmPasswordError ? "" : "invisible py-4" } ml-4 pt-0.5 text-xs text-rose-500`}>
                                {formData.confirmPasswordError}
                            </div>
                            {formData.isShowConfirmPassword ? (
                                <PiEyeSlash
                                    className="absolute right-4 top-3 h-6 w-6 cursor-pointer text-gray-400"
                                    onClick={() => setFormData((prevState) => ({...prevState, isShowConfirmPassword: false }))}
                                />
                            ) : (
                                <PiEye
                                    className="absolute right-4 top-3 h-6 w-6 cursor-pointer text-gray-400"
                                    onClick={() => setFormData((prevState) => ({...prevState, isShowConfirmPassword: true}))}
                                />
                            )}
                        </div>
                        {/* <div>
                            <label htmlFor="role" className={`mb-1 font-medium ${formData.isFocusedRole ? "text-black font-bold" : "text-gray-500"} transition-colors`}>
                                Chọn vai trò
                            </label>
                            <select
                                id="role"
                                name="role"
                                className={`${!formData.roleError ? "focus:border-2 focus:border-solid focus:border-blue-500 focus:outline-none" : "border-2 border-solid border-red-500 outline-none"} w-full mt-1 rounded-md border-2 border-solid border-gray-400 px-4 py-3 text-sm`}
                                value={formData.role}
                                onChange={(e) =>setFormData({...formData,role: e.target.value})}
                                 onFocus={() => { setFormData((prevState) => ({...prevState, isFocusedRole: true})); handleFocusRole()}}
                                onBlur={() => setFormData((prevState) => ({...prevState, isFocusedRole: false}))}
                            >
                                <option value="">-- Chọn vai trò --</option>
                                <option value="customer">Khách hàng</option>
                                <option value="manager">Quản lý</option>
                            </select>
                        </div> */}
                        {/* <div className={`${formData.roleError ? "" : "invisible py-4"} ml-4 pt-0.5 text-xs text-rose-500`}>
                            {formData.roleError}
                        </div>
                        */}
                        <button className="mt-3 mb-2 rounded-md bg-black px-4 py-3 text-sm text-white hover:bg-blue-600 hover:text-white hover:transition-all" type="submit">
                            Đăng ký
                        </button>
                    </div>
                    <Link to={"/auth/login"} className="cursor-pointer text-sm font-medium text-blue-700 hover:text-black">
                        Đăng nhập
                    </Link>
                </form>
                {formData.isOtpSent && (
                    <>
                        <div className={`fixed inset-0 z-10 overflow-y-auto ${formData.isOtpSent ? "block" : "hidden"}`}>
                            <div className="flex min-h-screen items-center justify-center p-4">
                                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                </div>
                                <div className="relative rounded-xl bg-white p-8 shadow-xl">
                                    <button
                                        type="button"
                                        className="absolute right-0 top-0 flex h-8 w-8 items-center justify-center rounded-lg rounded-tr-xl bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900"
                                        onClick={() =>setFormData((prevState) => ({...prevState, isOtpSent: false}))}
                                    >
                                        <svg
                                            className="h-4 w-4"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                clipRule="evenodd"
                                                d="M10.586 10l5.707-5.707a1 1 0 10-1.414-1.414L9.172 8.586 3.465 2.879a1 1 0 00-1.414 1.414L7.758 10 2.051 15.707a1 1 0 101.414 1.414L9.172 11.414l5.707 5.707a1 1 0 001.414-1.414L10.586 10z"
                                            />
                                        </svg>
                                    </button>
                                    <h2 className="mb-4 text-center text-3xl font-semibold">
                                        Xác thực email
                                    </h2>
                                    <p className="mb-4 text-center text-gray-600">Chúng tôi đã gửi mã đến email{" "}<strong>{formData.email}</strong>.{" "}
                                        <br />
                                        Vui lòng kiểm tra email của bạn!
                                    </p>
                                    <div className="text-center">
                                        <div className="mb-4 flex justify-center space-x-4">
                                            {[0, 1, 2, 3, 4, 5].map((index) => (
                                                <input
                                                    key={index}
                                                    ref={(el) =>(otpRefs.current[index] = el)}
                                                    className="h-12 w-12 rounded-xl border border-gray-300 text-center focus:border-blue-700 focus:ring-blue-700"
                                                    type="text"
                                                    maxLength="1"
                                                    value={formData.otp[index]}
                                                    onChange={(e) =>handleInputChange(index,e.target.value)}
                                                    onKeyDown={(e) =>handleKeyDown(index, e)}
                                                />
                                            ))}
                                        </div>
                                        <div className="flex flex-col items-center justify-between gap-4">
                                            {formData.otpError && (<div className="mt-1 text-sm text-rose-500">{formData.otpError}</div>)}
                                            <button
                                                className="rounded-xl bg-blue-700 px-4 py-2 text-white hover:bg-blue-600"
                                                onClick={handleVerifyOTP}
                                                // onKeyDown={(e) => {
                                                //     if (e.key === "enter") {
                                                //         e.preventDefault();
                                                //         handleVerifyOTP();
                                                //     }
                                                // }}
                                            >
                                                Xác thực
                                            </button>

                                            <div className="text-sm">
                                                <p className="mb-1">Bạn chưa nhận được mã?</p>
                                                <button className="text-blue-700 hover:underline" onClick={handleSubmit}>
                                                    Gửi lại mã
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Register;
