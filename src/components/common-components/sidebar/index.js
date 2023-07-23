import React, { useEffect } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { menuItems } from "../../../data/sidebar-menu-items";
import Switch from "react-switch";
import $ from "jquery";

const Aside = ({
  isSmallScreen,
  collapsed,
  toggled,
  handleToggleSidebar,
  handleCollapsedChange,
}) => {
  useEffect(() => {
    var width = $(window).width();
    width < 768 && handleCollapsedChange(true);
  }, []);

  return (
    <ProSidebar
      collapsed={isSmallScreen ? true : collapsed}
      toggled={toggled}
      breakPoint="md"
      onToggle={handleToggleSidebar}
    >
      <SidebarContent>
        {!isSmallScreen ? (
          <label className="switch-container" htmlFor="small-radius-switch">
            <Switch
              checked={collapsed}
              onChange={handleCollapsedChange}
              handleDiameter={4}
              offColor="#000"
              onColor="#000"
              offHandleColor="#fff"
              onHandleColor="#fff"
              height={7}
              width={29}
              borderRadius={6}
              className="react-switch"
              id="small-radius-switch"
              uncheckedIcon={<div style={{ background: "#000" }} />}
              checkedIcon={<div style={{ background: "#000" }} />}
            />
          </label>
        ) : null}
        {menuItems.map((item, indexMenu) =>
          item.subMenuItems.length ? (
            <Menu key={indexMenu} iconShape="circle" >
              <SubMenu title={item.name} icon={item.icon} >
                {item.subMenuItems.map((subItem, indexSub) => (
                  <MenuItem key={indexSub}>
                    <Link to={item.to + subItem.to}>{subItem.name}</Link>
                  </MenuItem>
                ))}
              </SubMenu>
            </Menu>
          ) : (
            <Menu key={indexMenu} iconShape="circle">
              <MenuItem icon={item.icon}>
                <Link to={item.to}>{item.name}</Link>
              </MenuItem>
            </Menu>
          )
        )}
      </SidebarContent>
      <SidebarFooter>Made with Love ❤️ @Taupify </SidebarFooter>
    </ProSidebar>
  );
};

export default Aside;
