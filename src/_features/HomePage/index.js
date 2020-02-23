import React, { useState } from "react";
import { Layout, Menu, Icon, Row, Col, Card } from "antd";
import { Switch, Redirect } from "react-router-dom";
import {
  USERS,
  MY_PROFILE,
  LOGOUT,
  HOMEPAGE,
  PAGE_NOT_FOUND
} from "../../_components/config/urlMappings";
import { PrivateRoute } from "../../_components";
import Users from "../Users";
import MyProfile from "../MyProfile";
import { Logout } from "../LogoutPage";

const { Content, Footer, Sider } = Layout;
// const { SubMenu } = Menu;

export const HomePage = props => {
  const { history, location } = props;
  const [isCollapsed, setisCollapsed] = useState(false);
  const { pathname } = location;
  const section = pathname.split("/").pop();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={isCollapsed}
        onCollapse={() => setisCollapsed(!isCollapsed)}
      >
        <Menu theme="dark" defaultSelectedKeys={section} mode="inline">
          <Menu.Item key="home" onClick={() => history.push(HOMEPAGE)}>
            <Icon type="sketch" />
            <span>Home</span>
          </Menu.Item>
          <Menu.Item key="users" onClick={() => history.push(USERS)}>
            <Icon type="pie-chart" />
            <span>Users</span>
          </Menu.Item>
          <Menu.Item key="my-profile" onClick={() => history.push(MY_PROFILE)}>
            <Icon type="desktop" />
            <span>My Profile</span>
          </Menu.Item>
          <Menu.Item key="logout" onClick={() => history.push(LOGOUT)}>
            <Icon type="file" />
            <span>Logout</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content>
          <Row
            type="flex"
            align="middle"
            justify="center"
            style={{ height: "100%", width: "100%" }}
          >
            <Col>
              <Switch>
                {/* <PrivateRoute exact path={HOMEPAGE} component={HomePage} /> */}
                <PrivateRoute exact path={USERS} component={Users} />
                <PrivateRoute exact path={MY_PROFILE} component={MyProfile} />
                <PrivateRoute exact path={LOGOUT} component={Logout} />
              </Switch>

              {section === "home" && (
                <Card
                  title="Note:"
                  hoverable
                  style={{ width: "30rem", minHeight: "80vh" }}
                >
                  <p>
                    You're time is limited don't waste it living someone
                    else's life.
                  </p>
                </Card>
              )}
            </Col>
          </Row>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Thanks for visiting the application !!!
        </Footer>
      </Layout>
    </Layout>
  );
};
