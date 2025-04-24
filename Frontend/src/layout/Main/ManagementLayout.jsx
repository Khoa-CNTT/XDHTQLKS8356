import React, { useState } from "react";
import { APP_ROUTER } from "../../utils/Constants";
import Cookies from "js-cookie";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
    FundViewOutlined,
    UserOutlined,
    ShoppingCartOutlined,
    LogoutOutlined,
    HomeOutlined,
    ProductOutlined,
    SisternodeOutlined,
    DollarOutlined,
    BarChartOutlined,
    CommentOutlined,
    HddOutlined,
    LayoutOutlined,
    ThunderboltOutlined
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Logo from "../../components/Logo";
import ToggleThemeButton from "../../components/ToggleTheme";
import { authService } from "../../service/authService";

const { Content, Sider } = Layout;
function getItem(label, key, icon, children) {
    return {key, icon, children, label};
}
const ManagementLayout = () => {
    const token = Cookies.get("token");
    const [darkTheme, setDarkTheme] = useState(false);
    const toggleTheme = () => {
        setDarkTheme((darkTheme) => !darkTheme);
    };
    const [collapsed, setCollapsed] = useState(false);
    const {token: { colorBgContainer, borderRadiusLG }} = theme.useToken();
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        authService.logout()
        navigate("/home");
        window.location.reload();
    };
    const items = [
        getItem(<Link to={APP_ROUTER.HOME}>Trang chủ</Link>, "1", <HomeOutlined />),
        getItem(<Link to={APP_ROUTER.INFORHOTEL}>Thông tin khách sạn</Link>, "2", <FundViewOutlined />),
        getItem(<Link to={APP_ROUTER.INFORHOTEL}>Loại phòng</Link>, "3", <HddOutlined />),
        getItem(<Link to={APP_ROUTER.INFORHOTEL}>Phòng</Link>, "sub1", <LayoutOutlined />, 
            [
                getItem(<Link to={APP_ROUTER.ROOM}>Tất cả phòng</Link>, "12", <ProductOutlined />),
                getItem(<Link to={APP_ROUTER.TIMELINE}>Trạng thái phòng</Link>, "4", <ProductOutlined />),
                getItem(<Link to={APP_ROUTER.TIMELINE}>Giá phòng</Link>, "5", <DollarOutlined />),
            ]  
        ),
        getItem(<Link to={APP_ROUTER.ORDER}>Đơn đặt phòng</Link>, "6", <ShoppingCartOutlined />),
        getItem(<Link to={APP_ROUTER.SERVICE}>Dịch vụ</Link>, "7", <ThunderboltOutlined />),
        getItem(<Link to={APP_ROUTER.USER}>Khách hàng</Link>, "sub2", <UserOutlined />,
            [
                getItem(<Link to={APP_ROUTER.CLASSIFICATION}>Phân loại khách hàng</Link>, "8", <SisternodeOutlined />), 
            ], 
        ),
        getItem(<Link to={APP_ROUTER.HOME}>Tư vấn khách hàng</Link>, "9", <CommentOutlined />),
        getItem(<Link to={APP_ROUTER.HOME}>Báo cáo thống kê</Link>, "10", <BarChartOutlined />),
        getItem(<div onClick={handleLogout}>Đăng xuất</div>, "11", <LogoutOutlined />),
    ];
    return (
        <>
            <div className="mx-auto w-full" style={{ maxWidth: "100vw" }}>
                <Layout style={{minHeight: "100vh", position: "relative"}} theme={darkTheme ? "dark" : "light"}>
                    <Sider
                        width={250}
                        collapsible
                        collapsed={collapsed}
                        className="shadow-md overflow-y-auto max-h-screen [&::-webkit-scrollbar]:w-2
                                [&::-webkit-scrollbar-track]:bg-gray-100
                                [&::-webkit-scrollbar-thumb]:bg-gray-300
                                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                        onCollapse={(value) => setCollapsed(value)}
                        theme={darkTheme ? "dark" : "light"}
                    >
                        <Logo></Logo>
                        <Menu defaultSelectedKeys={["1"]} mode="inline" items={items} theme={darkTheme ? "dark" : "light"} className="pt-5"/>
                        <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme}></ToggleThemeButton>
                    </Sider>
                    <Layout className="overflow-y-auto max-h-screen [&::-webkit-scrollbar]:w-2
                                [&::-webkit-scrollbar-track]:bg-gray-100
                                [&::-webkit-scrollbar-thumb]:bg-gray-300
                                dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                                dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">           
                        <Content className="bg-white">
                            <Outlet />
                        </Content>
                    </Layout>
                </Layout>
            </div>
        </>
    );
};

export default ManagementLayout;