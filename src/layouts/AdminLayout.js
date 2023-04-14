import React, {useEffect, useState} from 'react';
import {Layout, Menu} from 'antd';
import {
    UnorderedListOutlined,
} from '@ant-design/icons';
import {Link, Route, Switch} from "react-router-dom";
import Pokemon from "../pages/Pokemon";

const {Header, Content, Footer, Sider} = Layout;
const {SubMenu} = Menu;

const AdminLayout = (props) => {
    const [collapsed, setCollapsed] = useState(false);

    useEffect(() => {

    }, []);

    const onCollapse = collapsed => {
        setCollapsed(collapsed);
    };

    return (
        <Layout style={{minHeight: '100vh'}}>
            <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
                <div style={{height: "100px"}}>
                </div>
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                    <>
                        <Menu.Item key="1" icon={<UnorderedListOutlined />}>
                            <Link to="/admin/pokemon" className="text-decoration-none">Pokemon</Link>
                        </Menu.Item>
                    </>
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header className="site-layout-background d-flex align-items-center">

                </Header>
                <Content style={{margin: '0 16px'}}>
                    <div className="site-layout-background" style={{padding: 24, minHeight: 360}}>
                        <Switch>
                            <Route exact path="/admin/pokemon" component={Pokemon}/>
                        </Switch>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>POKEMON App ©2023 Created by Sherlock</Footer>
            </Layout>
        </Layout>
    );
};
export default AdminLayout;