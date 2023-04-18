/* eslint-disable indent */
import { useEffect, useState } from "react";
import { Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";

import "./PrivateLayout.css";
import LayoutSider from "../LayoutSider";
import LayoutTopbar from "../LayoutTopbar";
import AppBreadcrumb from "../AppBreadcrumb";
import { getStorageData, removeStorageData } from "../../helpers/storage";
import { ACCESS_TOKEN, PROFILE } from "../../constants/auth";
import { navigations } from "../../../navigations";
import axios from "axios";

const { Content } = Layout;

const PrivateLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const isAuth = getStorageData(ACCESS_TOKEN);
  const authUser = getStorageData(PROFILE);

  useEffect(() => {
    if (!isAuth || !authUser) {
      delete axios.defaults.headers.common["Authorization"];
      removeStorageData(ACCESS_TOKEN);
      removeStorageData(PROFILE);
      navigate("/signin");
    } else if (!axios.defaults.headers.common["Authorization"]) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + isAuth;
    }
  }, [isAuth, authUser, navigate]);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        switch (error?.response?.status) {
          case 403:
            navigate("/403");
            break;
          default:
        }
        return Promise.reject(error);
      }
    );

    return () => axios.interceptors.response.eject(interceptor);
  }, [navigate]);

  const acceptedRoute = navigations.reduce((result, current) => {
    if (current.children) {
      const children = current.children.filter(
        (item) => item.authorize?.includes(authUser?.role.name) ?? true
      );
      current = { ...current, children };
    }

    if (current.authorize) {
      if (current.authorize.some((role) => role === authUser?.role.name)) {
        result.push(current);
      }
    } else {
      result.push(current);
    }

    return result;
  }, []);

  return (
    <Layout hasSider>
      <LayoutSider
        className="layout-backgroud"
        collapsed={collapsed}
        navigation={acceptedRoute}
      />
      <Layout className="site-layout" style={{ width: "calc(100vw - 200px)" }}>
        <LayoutTopbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout className="site-layout-content">
          <AppBreadcrumb />
          <Content className="site-layout-background">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
