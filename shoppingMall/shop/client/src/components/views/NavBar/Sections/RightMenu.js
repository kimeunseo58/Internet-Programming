/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Icon, Badge } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        
        <Menu.Item key="Community">
          <a href ='/Community'>Community</a>
        </Menu.Item>
        <Menu.Item key="mail">
          <a href="/login">SignIn</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">SignUp</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
        
        <Menu.Item key="Community">
          <a href ='/Community'>Community</a>
        </Menu.Item>
        <Menu.Item key="Upload">
          <a href ='/product/upload'>관리자</a>
        </Menu.Item>
        
        <Menu.Item key="cart" style={{ paddingBottom: 3 }}>
            <a href="/user/cart" className="head-example" style={{ marginRight: -22, color: '#667777' }} >
              <Icon type="shopping-cart" style={{ fontSize: 30, marginBottom: 3 }} />
            </a>
        </Menu.Item>

        <Menu.Item key="logout">
          <a onClick={logoutHandler}>Logout</a>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(RightMenu);
