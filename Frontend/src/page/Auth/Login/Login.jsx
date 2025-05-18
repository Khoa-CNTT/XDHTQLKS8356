import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { PiEyeSlash, PiEye } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import Cookies from "js-cookie";
import { authService } from "../../../service/authService";
import Loading from "../../../components/Loading";
function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        emailError: "",
        password: "",
        passwordError: "",
        isShowPassword: false,
        errors: "",
        isFocusedEmail: false,
        isFocusedPass: false,
        loading: false
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            emailError: "",
            passwordError: "",
            errors: "",
        });
        console.log("form",formData);
        if (validate()) {
            setFormData({...formData,loading: true});
            try {
                const login = await authService.login(formData.email, formData.password)
                console.log("login ", login)
                console.log("!",login)
                if(login?.success){
                    toast.success('Đăng nhập thành công', { duration: 2000 });
                    const role = Cookies.get('role')
                    setFormData({...formData,loading: false});
                    if(role === 'customer') {
                        navigate("/home")
                    }else {
                        navigate("/admin");
                    }
                } else {
                    toast.error(login.message);
                    setFormData({...formData,loading: false});
                }
            } catch (error) {
                setFormData({...formData,loading: false});
                navigate("/errors")
            }
        }
    };

    const validate = () => {
        let resultEmail = true;
        let resultPassword = true;
        if (!formData.email.trim()) {
            resultEmail = false;
            setFormData((prevFormData) => ({...prevFormData, emailError: "Vui lòng nhập email của bạn!"}));
        } else if (
            /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(formData.email)
        ) {
            setFormData((prevFormData) => ({...prevFormData,emailError: ""}));
            resultEmail = true;
        } else {
            resultEmail = false;
            setFormData((prevFormData) => ({...prevFormData, emailError: "Email không hợp lệ!"}));
        }
        if (!formData.password.trim()) {
            resultPassword = false;
            setFormData((prevFormData) => ({...prevFormData, passwordError: "Vui lòng nhập mật khẩu của bạn!"}));
        } else if (
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)
        ) {
            setFormData((prevFormData) => ({...prevFormData, passwordError: "",}));
            resultPassword = true;
        } else {
            resultPassword = false;
            setFormData((prevFormData) => ({...prevFormData, passwordError: "Mật khẩu tối thiểu tám ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt."}));
        }

        return resultEmail && resultPassword;
    };

    const handleFocusEmail = () => {
        setFormData({ ...formData, emailError: "" });
    };

    const handleFocusPassword = () => {
        setFormData({ ...formData, passwordError: "" });
    };

    return (
        <div className="flex w-full h-full flex-col md:flex-row">
            <div className="w-1/2 bg-blue-500 min-h-screen hidden md:flex justify-center items-center">
                <img src="https://ps.w.org/ameliabooking/assets/icon-256x256.gif?rev=2935468" alt="" className="w-2/3 h-auto rounded-2xl" />
            </div>
            <div className="w-full md:w-1/2 flex items-center justify-center p-6">
                <form onSubmit={handleSubmit} className="w-full max-w-[500px]">
                    <div className="mb-4 text-3xl font-bold">
                        Đăng nhập hoặc tạo tài khoản
                    </div>
                    <div className="mb-4 text-sm text-gray-600">
                        Bạn có thể đăng nhập tài khoản của mình để truy cập các dịch vụ của chúng tôi.
                    </div>
                    {/* <div className="mb-4 text-sm font-bold">
                        Đăng nhập hoặc đăng ký (miễn phí)
                    </div>
                    <div className="flex">
                        <a href="#!" className="mr-2 rounded border border-solid border-gray-400 p-2 hover:scale-110 transition-transform duration-200">
                            <FcGoogle className="h-8 w-8" />
                        </a>
                    </div> */}
                    {/* <div className="relative my-4 w-full flex items-center">
                        <div className="w-1/6 border-t border-gray-400"></div> 
                        <span className="mx-4 text-sm text-gray-500 whitespace-nowrap">Hoặc</span>
                        <div className="flex-1 border-t border-gray-400"></div> 
                    </div> */}
                    <div className="flex flex-col">
                        <label htmlFor="email" className={`mb-1 font-medium ${formData.isFocusedEmail ? "text-black font-bold" : "text-gray-500"} transition-colors`} >
                            Email
                        </label>
                        <input
                            id="email"
                            type="text"
                            placeholder="Email của bạn"
                            name="email"
                            className={`${!formData.emailError ? "focus:border-2 focus:border-solid focus:border-blue-500 focus:outline-none": "border-2 border-solid border-red-500 outline-none"} rounded-md border-2 border-solid border-gray-400 px-4 py-3 text-sm`}
                            value={formData.email}
                            onChange={(event) => setFormData({...formData, email: event.target.value })}
                            onFocus={() => { setFormData({...formData, isFocusedEmail: true }); handleFocusEmail(); }}
                            onBlur={() => setFormData({...formData, isFocusedEmail: false })}
                        />
                        <div className={`${formData.emailError ? "" : "invisible py-4"} ml-4 pt-1 text-xs text-rose-500 w-full break-words`}>{formData.emailError}</div>
                        <label htmlFor="password" className={`mb-1 font-medium ${formData.isFocusedPass ? "text-black font-bold" : "text-gray-500"} transition-colors`}>
                            Mật khẩu
                        </label>
                        <div className="relative">
                            <input
                                type={formData.isShowPassword ? "text" : "password"}
                                placeholder="Mật khẩu"
                                name="password"
                                id="password"
                                className={`${!formData.passwordError? "focus:border-2 focus:border-solid focus:border-blue-500 focus:outline-none" : "border-2 border-solid border-red-500 outline-none" } w-full rounded-md border-2 border-solid border-gray-400 px-4 py-3 text-sm`}
                                value={formData.password}
                                onChange={(event) => setFormData({...formData, password: event.target.value })}
                                onFocus={() => { setFormData({...formData, isFocusedPass: true }); handleFocusPassword(); }}
                                onBlur={() => setFormData({...formData, isFocusedPass: false })}
                            />
                            <div className={`${formData.passwordError ? "" : "invisible py-4"} ml-4 pt-1 text-xs text-rose-500 w-full break-words`}>
                                {formData.passwordError}
                            </div>
                            {formData.isShowPassword ? (
                                <PiEyeSlash
                                    className="absolute right-4 top-3 h-6 w-6 cursor-pointer text-gray-400"
                                    onClick={() => setFormData({...formData, isShowPassword: false})}
                                />
                            ) : (
                                <PiEye
                                    className="absolute right-4 top-3 h-6 w-6 cursor-pointer text-gray-400"
                                    onClick={() => setFormData({...formData, isShowPassword: true})}
                                />
                            )}
                        </div>
                        <button
                            type="submit"
                            className={`mt-2 rounded-md bg-black px-4 py-3 text-sm text-white hover:bg-blue-600 hover:text-white hover:transition-all ${formData.loading ? 'flex items-center justify-center cursor-not-allowed' : ''}`}
                            disabled={formData.loading}>
                            {formData.loading ? (<Loading></Loading>) : ('Đăng nhập')}
                        </button>
                        {formData.errors && ( <div className="ml-4 pt-1 text-xs text-rose-500 w-full break-words">{formData.errors}</div>)}
                    </div>
                    <div className="flex justify-between mt-3">
                        <Link to="/auth/register" className="cursor-pointer text-sm font-medium text-blue-700 hover:text-black">
                            Đăng ký tài khoản mới
                        </Link>
                        {/* <div className="cursor-pointer text-sm font-medium text-blue-700 hover:text-black">
                            Quên mật khẩu
                        </div> */}
                    </div>
                </form>
            </div>
        </div>

    );
}

export default Login;
