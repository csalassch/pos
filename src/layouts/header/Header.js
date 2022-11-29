import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import SimpleBar from 'simplebar-react';
import {
  Navbar,
  Nav,
  NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from 'reactstrap';
import * as Icon from 'react-feather';
import { ReactComponent as LogoWhite } from '../../assets/images/logos/white-logo-icon.svg';
import MessageDD from './MessageDD';
import NotificationDD from './NotificationDD';
import MegaDD from './MegaDD';
import user1 from '../../assets/images/users/user4.jpg';
import Logo from '../logo/Logo';
import { ToggleMiniSidebar, ToggleMobileSidebar } from '../../store/customizer/CustomizerSlice';
import ProfileDD from './ProfileDD';
import { useAuth } from '../../Context/authContext';


const Header = () => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const topbarColor = useSelector((state) => state.customizer.topbarBg);
  const dispatch = useDispatch();

  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  }
  return (
    <>
      <Navbar
        color={topbarColor}
        dark={!isDarkMode}
        light={isDarkMode}
        expand="lg"
        className="topbar"
      >
        {/********Logo*******/}
        <div className="d-none d-lg-flex align-items-center logo-space">
          <Logo />
          <Button
            close
            size="sm"
            className="ms-auto d-sm-block d-lg-none"
            onClick={() => dispatch(ToggleMobileSidebar())}
          />
        </div>
        {/******************************/}
        {/**********Toggle Buttons**********/}
        {/******************************/}
        <div className="d-flex align-items-center">
          <Button
            color={topbarColor}
            className="d-none d-lg-block mx-1 border-0 hov-dd"
            onClick={() => dispatch(ToggleMiniSidebar())}
          >
            <Icon.Menu size={18} />
          </Button>
          <NavbarBrand href="/" className="d-sm-block d-lg-none">
            <LogoWhite />
          </NavbarBrand>
          <Button
            color={topbarColor}
            className="d-sm-block d-lg-none border-0 mx-1 hov-dd"
            onClick={() => dispatch(ToggleMobileSidebar())}
          >
            <i className="bi bi-list" />
          </Button>
        </div>

        {/******************************/}
        {/**********Left Nav Bar**********/}
        {/******************************/}

        <Nav className="me-auto d-flex flex-row align-items-center" navbar>
          <NavItem className="d-md-block d-none">
            <Link
              to="/about"
              className={`nav-link hov-dd ${topbarColor === 'white' ? 'text-dark' : ''}`}
            >
              About
            </Link>
          </NavItem>
        </Nav>

        <div className="d-flex align-items-center">
          {/******************************/}
          {/**********Mega DD**********/}
          {/******************************/}
          <UncontrolledDropdown className="mega-dropdown mx-1 hov-dd">
            <DropdownToggle className="bg-transparent border-0" color={topbarColor}>
              <Icon.Grid size={18} />
            </DropdownToggle>
            <DropdownMenu>
              <MegaDD />
            </DropdownMenu>
          </UncontrolledDropdown>
          {/******************************/}
          {/**********Notification DD**********/}
          {/******************************/}
          <UncontrolledDropdown className="mx-1 hov-dd">
            <DropdownToggle className="bg-transparent border-0" color={topbarColor}>
              <Icon.MessageSquare size={18} />
            </DropdownToggle>
            <DropdownMenu className="ddWidth">
              <div className="bg-info p-3 text-white rounded-top">Notification</div>
              <SimpleBar style={{ maxHeight: '350px' }}>
                <NotificationDD />
              </SimpleBar>
              <DropdownItem divider />
              <div className="p-2 px-3">
                <Button color="info" size="sm" block>
                  Check All
                </Button>
              </div>
            </DropdownMenu>
          </UncontrolledDropdown>
          {/******************************/}
          {/**********Message DD**********/}
          {/******************************/}
          <UncontrolledDropdown className="mx-1 hov-dd">
            <DropdownToggle className="bg-transparent border-0" color={topbarColor}>
              <Icon.Mail size={18} />
            </DropdownToggle>
            <DropdownMenu className="ddWidth">
              <div className="bg-danger p-3 text-white rounded-top">Messages</div>
              <SimpleBar style={{ maxHeight: '350px' }}>
                <MessageDD />
              </SimpleBar>
              <DropdownItem divider />
              <div className="p-2 px-3">
                <Button color="danger" size="sm" block>
                  Check All
                </Button>
              </div>
            </DropdownMenu>
          </UncontrolledDropdown>
          {/******************************/}
          {/**********Profile DD**********/}
          {/******************************/}
          <UncontrolledDropdown>
            <DropdownToggle color="transparent" className=" hov-dd">
              <img src={user1} alt="profile" className="rounded-circle" width="30" />
            </DropdownToggle>
            <DropdownMenu className="ddWidth profile-dd">
              <ProfileDD />
              <div className="p-2 px-3">
                <Button color="danger" size="sm" onClick={handleLogout}>
                  Cerrar sesión
                </Button>
              </div>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </Navbar>
    </>
  );
};

export default Header;
