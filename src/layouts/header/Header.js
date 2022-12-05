import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Select from 'react-select';

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
import { update, ref, onValue } from 'firebase/database';
import { ReactComponent as LogoWhite } from '../../assets/images/logos/white-logo-icon.svg';
import MessageDD from './MessageDD';
import NotificationDD from './NotificationDD';
import MegaDD from './MegaDD';
import user1 from '../../assets/images/users/user4.jpg';
import Logo from '../logo/Logo';
import { ToggleMiniSidebar, ToggleMobileSidebar } from '../../store/customizer/CustomizerSlice';
import ProfileDD from './ProfileDD';
import { db } from '../../FirebaseConfig/firebase';

import { useAuth } from '../../Context/authContext';



const Header = () => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const topbarColor = useSelector((state) => state.customizer.topbarBg);
  const dispatch = useDispatch();

  const { logout } = useAuth();
  const handleLogout = async () => {
    await logout();
  }
  const mexico = <div><img alt='Mexico Flag' src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Flag_of_Mexico.png/1200px-Flag_of_Mexico.png" height="20px" width="30px" style={{ marginRight: "7px" }} />Español</div>;
  const usa = <div><img alt='USA Flag' src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png" height="20px" width="30px" style={{ marginRight: "7px" }} />English</div>;
  const france = <div><img alt='France Flag' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg/800px-Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg.png" height="20px" width="30px" style={{ marginRight: "7px" }} />Français</div>;
  const brazil = <div><img alt='France Flag' src="https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/1200px-Flag_of_Brazil.svg.png" height="20px" width="30px" style={{ marginRight: "7px" }} />Português</div>;
  const israel = <div><img alt='Israel Flag' src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Israel.svg/640px-Flag_of_Israel.svg.png" height="20px" width="30px" style={{ marginRight: "7px" }} />עִברִית</div>;
  const options = [
    { value: 'es-MX', label: mexico },
    { value: 'en', label: usa },
    { value: 'fr', label: france },
    { value: 'pt', label: brazil },
    { value: 'he', label: israel },

  ];
  const { url } = useParams();
  const [query, setQuery] = useState("");
  const [savedLangLabel, setSavedLangLabel] = useState("");
  const [savedLangVal, setSavedLangVal] = useState("");
  const { user } = useAuth();
  const history = useNavigate();
  async function languageChange(e) {
    update(ref(db, `usuarios/${user.uid}`), {
      language: e.value
    });

    setQuery(e.value);
  }
  async function loadSavedLanguage() {
    onValue(ref(db, `usuarios/${user.uid}`), snapshot => {

      setSavedLangVal(snapshot.val().language);
      if(snapshot.val().language==="es-MX"){
        setSavedLangLabel(mexico);
      }else if(snapshot.val().language==="en"){
        setSavedLangLabel(usa);
      
      }else if(snapshot.val().language==="fr"){
        setSavedLangLabel(france);
      
      }else if(snapshot.val().language==="pt"){
        setSavedLangLabel(brazil);
      
      }else if(snapshot.val().language==="he"){
        setSavedLangLabel(israel);
      }
      // setSavedLangVal(snapshot.val().language);
    });
  }
  useEffect(() => {
    console.log("loaded flag: ", savedLangLabel);
    if (savedLangLabel === "" || savedLangVal==="") {
      loadSavedLanguage().then(() => {
        const params = new URLSearchParams();
        if (query) {
          params.append("lng", query)
        } else {
          params.delete("lng")
        }
        console.log(url);
        history({ search: `?${params.toString()}` });
        console.log(window.location.href);
      });
    }else{
      const params = new URLSearchParams()
        if (query) {
          params.append("lng", query)
        } else {
          params.delete("lng")
        }
        console.log(url);
        history({ search: `?${params.toString()}` });
        console.log(window.location.href);
    }


  }, [query, history, savedLangLabel, savedLangVal])


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
          <div style={{ minWidth: "165px" }}>

            <Select
              id="languageSelected"
              value={[{ value: savedLangVal, label: savedLangLabel }]}
              label="Selecciona Idioma"
              options={options}
              onChange={(e) => {
                languageChange(e).then(() => {
                  console.log(e); const a = document.createElement('a');
                  a.href = window.location.href;
                  document.body.appendChild(a);
                  a.click();
                  console.log(a.href)
                });
              }}
            />
          </div>
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
