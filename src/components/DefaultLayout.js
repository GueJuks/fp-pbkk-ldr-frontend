import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Layout, Menu } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
    CopyOutlined,
    UnorderedListOutlined,
    LogoutOutlined,
    HomeOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import "../styles/DefaultLayout.css";
import { Link, useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
// import { rootReducer } from './../redux/rootReducer';

const { Header, Sider, Content } = Layout;

const DefaultLayout = ({ children }) => {
    const navigate = useNavigate();
    const { cartItems, loading } = useSelector((state) => state.rootReducer);
    const [collapsed, setCollapsed] = useState(false);

    // mengambil localstorage data
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems])
    return (
        <Layout>
            {loading && <Spinner />}
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <h1 className='text-center text-light font-weight-bold mt-2'>LDR</h1>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={window.Location.pathname}
                // items={[
                //     {
                //         key: '1',
                //         icon: <UserOutlined />,
                //         label: 'nav 1',
                //     },
                //     {
                //         key: '2',
                //         icon: <VideoCameraOutlined />,
                //         label: 'nav 2',
                //     },
                //     {
                //         key: '3',
                //         icon: <UploadOutlined />,
                //         label: 'nav 3',
                //     },
                // ]}
                >
                    <Menu.Item key="/" icon={<HomeOutlined />}>
                        <Link to="/">Home</Link>
                    </Menu.Item>
                    <Menu.Item key="/bills" icon={<CopyOutlined />}>
                        <Link to="/bills">Bills</Link>
                    </Menu.Item>
                    <Menu.Item key="/items" icon={<UnorderedListOutlined />}>
                        <Link to="/items">Items</Link>
                    </Menu.Item>
                    <Menu.Item key="/customers" icon={<UserOutlined />}>
                        <Link to="/customers">Customers</Link>
                    </Menu.Item>
                    <Menu.Item key="/logout" 
                    icon={<LogoutOutlined />}
                    onClick={() => {
                        localStorage.removeItem('auth')
                        navigate('/login')
                    }}
                    >
                        Logout
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    className="site-layout-background"
                    style={{
                        padding: 0,
                    }}
                >
                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                        {
                            className: 'trigger',
                            onClick: () => setCollapsed(!collapsed),
                        }
                    )}
                    <div className='cart-item d-flex justify-content-space-between flex-row' onClick={() => navigate('/cart')}>
                        <p>{cartItems.length}</p>
                        <ShoppingCartOutlined />
                    </div>
                </Header>
                <Content
                    className="site-layout-background"
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};

export default DefaultLayout;