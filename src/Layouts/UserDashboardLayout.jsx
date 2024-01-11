import { useEffect, useState } from "react";
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from "@ant-design/icons";
import useCommonApiData from '@/src/Hooks/useCommonApiData';
import { Layout, Menu, Button } from "antd";
import { MdLocalOffer } from "react-icons/md";
import Link from "next/link";
import {
    FaCalendarAlt,
    FaDiceD6,
    FaPowerOff,
    FaThLarge,
} from "react-icons/fa";
import { useRouter } from "next/router";
const { Header, Sider, Content } = Layout;

const UserdashboardLayout = ({ children }) => {
    const { handleLogout } = useCommonApiData()
    const [collapsed, setCollapsed] = useState(false); // Start with the sidebar open on desktop devices
    const [sideNavVisible, setSideNavVisible] = useState(false);
    const router = useRouter();

    const handleResize = () => {
        setCollapsed(window.innerWidth < 768);
        // Hide the sidebar on mobile devices by default
        if (window.innerWidth < 768) {
            setSideNavVisible(false);
        } else {
            setSideNavVisible(true);
        }
    };

    // Add event listener for window resize
    useEffect(() => {
        window.addEventListener("resize", handleResize);
        handleResize(); // Call handleResize on component mount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const toggleSideNav = () => {
        setSideNavVisible(!sideNavVisible);
    };



    return (
        <Layout className="bg-transparent">
            <style>{`
        .ant-menu-item-selected {
          background: linear-gradient(135deg, #2b59ff 0%, #bb2bff 100%);
        }
      `}</style>

            {/* Add a condition to render Sider based on sideNavVisible */}
            {sideNavVisible && (
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    className="text-white"
                    style={{
                        position: "sticky", top: 0, height: "100vh",
                        zIndex: 999

                    }}
                >
                    <Menu
                        theme="dark"
                        mode="inline"
                        selectedKeys={[router.pathname]}
                        defaultSelectedKeys={["1"]}

                        className="text-white"
                        style={{ height: "100%", width: "100%" }}
                    >
                        <Menu.Item key="/" icon={<FaThLarge />}>
                            <Link href="/">Home</Link>
                        </Menu.Item>
                        <Menu.Item key="/userdashboard/address-book/manage-address-book" icon={<FaCalendarAlt />}>
                            <Link href="/userdashboard/address-book/manage-address-book">Address Book</Link>
                        </Menu.Item>
                        <Menu.Item key="/userdashboard/order" icon={<MdLocalOffer />}>
                            <Link href="/userdashboard/order">Order</Link>
                        </Menu.Item>
                        <Menu.Item key="8" icon={<FaPowerOff />}>
                            <button
                                onClick={() => handleLogout()}
                            >Logout</button>
                        </Menu.Item>
                    </Menu>
                </Sider>
            )}

            <Layout className="bg-transparent">
                <Header
                    style={{
                        padding: 0,
                        position: "sticky",
                        top: 0,
                        zIndex: 999
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => {
                            toggleCollapsed();
                            toggleSideNav(); // Toggle the sideNavVisible state when the button is clicked
                        }}
                        style={{
                            fontSize: "16px",
                            color: "white",
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>

                <Content
                    style={{
                        padding: 24,
                        backgroundRepeat: "no-repeat",
                        backgroundPositionX: "65rem",
                        backgroundPositionY: "bottom",
                        backgroundSize: "70% 90%",
                    }}
                    className={`${collapsed ? "" : "md:ml-10"}`}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default UserdashboardLayout;
