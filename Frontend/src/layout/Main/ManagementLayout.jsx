import React, { useState } from "react";
import { APP_ROUTER } from "../../utils/Constants";
import Cookies from "js-cookie";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
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
    ThunderboltOutlined,
    SunOutlined,
    TeamOutlined,
    UsergroupAddOutlined
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import Logo from "../../components/Logo";
import ToggleThemeButton from "../../components/ToggleTheme";
import { authService } from "../../service/authService";
import { AnimatePresence } from "framer-motion";
import PageTransitionWrapper from "../../components/PageTransition";

const { Content, Sider } = Layout;

function getItem(label, key, icon, children) {
    return { key, icon, children, label };
}

const ManagementLayout = () => {
    const token = Cookies.get("token");
    const location = useLocation();
    const [darkTheme, setDarkTheme] = useState(false);
    const toggleTheme = () => setDarkTheme((prev) => !prev);
    const [collapsed, setCollapsed] = useState(false);
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        authService.logout();
        navigate("/home");
        window.location.reload();
    };

    const items = [
  {
    key: '2',
    icon: <FundViewOutlined />,
    label: <Link to={APP_ROUTER.HOTEL}>Thông tin khách sạn</Link>,
  },
  {
    key: '3',
    icon: <HddOutlined />,
    label: <Link to={APP_ROUTER.ROOMTYPE}>Loại phòng</Link>,
  },
  {
    key: '4',
    icon: <LayoutOutlined />,
    label: "Phòng",
    children: [
      {
        key: '41',
        icon: <ProductOutlined />,
        label: <Link to={APP_ROUTER.ROOM}>Tất cả phòng</Link>,
      },
      {
        key: '42',
        icon: <ProductOutlined />,
        label: <Link to={APP_ROUTER.ROOMDETAIL}>Trạng thái phòng</Link>,
      },
      {
        key: '43',
        icon: <DollarOutlined />,
        label: <Link to={APP_ROUTER.PRICE}>Giá phòng</Link>,
      },
    ],
  },
  {
    key: '5',
    icon: <SunOutlined />,
    label: <Link to={APP_ROUTER.EXTENTION}>Tiện ích</Link>,
  },
  {
    key: '6',
    icon: <ShoppingCartOutlined />,
    label: <Link to={APP_ROUTER.BOOKING_MANAGER}>Đơn đặt phòng</Link>,
  },
  {
    key: '7',
    icon: <ThunderboltOutlined />,
    label: <Link to={APP_ROUTER.SERVICE}>Dịch vụ</Link>,
  },
  {
    key: '8',
    icon: <UserOutlined />,
    label: "Khách hàng",
    children: [
      {
        key: '81',
        icon: <UserOutlined />,
        label: <Link to={APP_ROUTER.CUSTOMER}>Thông tin khách hàng</Link>,
      },
      {
        key: '82',
        icon: <SisternodeOutlined />,
        label: <Link to={APP_ROUTER.CLASSIFY}>Phân loại khách hàng</Link>,
      },
    ],
  },
  {
    key: '9',
    icon: <CommentOutlined />,
    label: <Link to={APP_ROUTER.HOME}>Tư vấn khách hàng</Link>,
  },
  {
    key: '12',
    icon: <TeamOutlined />,
    label: "Nhân viên",
    children: [
      {
        key: '83',
        icon: <UsergroupAddOutlined />,
        label: <Link to={APP_ROUTER.PERSONNEL}>Thêm nhân viên</Link>,
      },
    ],
  },
  {
    key: '10',
    icon: <BarChartOutlined />,
    label: "Báo cáo thống kê",
    children: [
      {
        key: '90',
        icon: <UserOutlined />,
        label: <Link to={APP_ROUTER.REPORTTOTAL}>Tổng doanh thu</Link>,
      },
      {
        key: '91',
        icon: <SisternodeOutlined />,
        label: <Link to={APP_ROUTER.REPORTROOMTYPE}>Loại phòng</Link>,
      },
      {
        key: '92',
        icon: <SisternodeOutlined />,
        label: <Link to={APP_ROUTER.REPORTSERVICE}>Dịch vụ</Link>,
      },
    ],
  },
  {
    key: '11',
    icon: <LogoutOutlined />,
    label: <div onClick={handleLogout}>Đăng xuất</div>,
  },
];

    return (
        <div className="mx-auto w-full" style={{ maxWidth: "100vw" }}>
            <Layout style={{ minHeight: "100vh", position: "relative" }} theme={darkTheme ? "dark" : "light"}>
                <Sider
                    width={250}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    theme={darkTheme ? "dark" : "light"}
                    className="shadow-md overflow-y-auto max-h-screen [&::-webkit-scrollbar]:w-2
                               [&::-webkit-scrollbar-track]:bg-gray-100
                               [&::-webkit-scrollbar-thumb]:bg-gray-300
                               dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                               dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
                >
                    <Logo />
                    <Menu
                        // defaultSelectedKeys={["1"]}
                        mode="inline"
                        items={items}
                        theme={darkTheme ? "dark" : "light"}
                        className="pt-5"
                    />
                    <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
                </Sider>

                <Layout className="overflow-y-auto max-h-screen [&::-webkit-scrollbar]:w-2
                                    [&::-webkit-scrollbar-track]:bg-gray-100
                                    [&::-webkit-scrollbar-thumb]:bg-gray-300
                                    dark:[&::-webkit-scrollbar-track]:bg-neutral-700
                                    dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                    <Content className="bg-white">
                        <AnimatePresence mode="wait">
                            <PageTransitionWrapper key={location.pathname}>
                                <Outlet />
                            </PageTransitionWrapper>
                        </AnimatePresence>
                    </Content>
                </Layout>
            </Layout>
        </div>
    );
};

export default ManagementLayout;
