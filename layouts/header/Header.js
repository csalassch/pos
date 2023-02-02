import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useCookies } from "react-cookie"
import Select from 'react-select';

import SimpleBar from 'simplebar-react';
import {
  Navbar,
  // Nav,
  // NavItem,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  ButtonGroup
} from 'reactstrap';
import * as Icon from 'react-feather';
// import { update, ref, onValue } from 'firebase/database';
// import { ReactComponent as LogoWhite } from '../../assets/images/logos/white-logo-icon.svg';
import MessageDD from './MessageDD';

import NotificationDD from './NotificationDD';
import MegaDD from './MegaDD';
import user1 from '@/pages/assets/images/users/user4.jpg';
// import Logo from '../logo/Logo';
import { ToggleMiniSidebar, ToggleMobileSidebar, ChangeDarkMode } from '../../store/customizer/CustomizerSlice';
import ProfileDD from './ProfileDD'
import Link from 'next/link';
import axios from 'axios';
// import { db } from '../../FirebaseConfig/firebase';

// import { useAuth } from '../../Context/authContext';



const Header = ({ setModeFunc, mode }) => {
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const topbarColor = useSelector((state) => state.customizer.topbarBg);
  const dispatch = useDispatch();
  const router = useRouter();
  const [cookie, setCookie] = useCookies(["preferredLanguage"])


  // const { logout } = useAuth();
  const handleLogout = async () => {
    const response = await axios.post('/api/auth/logout');
    if (response.status === 200) {
      router.push("/views/login");
    }
    // await logout();
  }
  const mexico = <div> <Link href={router.pathname} locale="esMX"><img alt='Mexico Flag' src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Flag_of_Mexico.png/1200px-Flag_of_Mexico.png" height="20px" width="30px" /></Link></div>;
  const usa = <div><Link href={router.pathname} locale="en"><img alt='USA Flag' src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png" height="20px" width="30px" /></Link></div>;
  const france = <div><Link href={router.pathname} locale="fr"><img alt='France Flag' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg/800px-Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg.png" height="20px" width="30px" style={{ marginRight: "7px" }} /></Link></div>;
  const brazil = <div> <Link href={router.pathname} locale="pt"><img alt='Brazil Flag' src="https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/1200px-Flag_of_Brazil.svg.png" height="20px" width="30px" /></Link></div>;
  const israel = <div> <Link href={router.pathname} locale="he"><img alt='Israel Flag' src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Israel.svg/640px-Flag_of_Israel.svg.png" height="20px" width="30px" /></Link></div>;
  const options = [
    { value: 'esMX', label: mexico },
    { value: 'en', label: usa },
    { value: 'fr', label: france },
    { value: 'pt', label: brazil },
    { value: 'he', label: israel },

  ];
  const isFixed = useSelector((state) => state.customizer.isMiniSidebar);
  // const { url } = useRouter().query;
  const [query, setQuery] = useState("");
  const [savedLangLabel, setSavedLangLabel] = useState("");
  const [savedLangVal, setSavedLangVal] = useState("");
  // const { user } = useAuth();
  const history = useRouter();
  async function languageChange(e) {


    setQuery(e.value);
  }
  // async function loadSavedLanguage() {
  //   onValue(ref(db, `usuarios/${user.uid}`), snapshot => {

  //     setSavedLangVal(snapshot.val().language);
  //     if (snapshot.val().language === "es-MX") {
  //       setSavedLangLabel(mexico);
  //     } else if (snapshot.val().language === "en") {
  //       setSavedLangLabel(usa);

  //     } else if (snapshot.val().language === "fr") {
  //       setSavedLangLabel(france);

  //     } else if (snapshot.val().language === "pt") {
  //       setSavedLangLabel(brazil);

  //     } else if (snapshot.val().language === "he") {
  //       setSavedLangLabel(israel);
  //     }
  //     // setSavedLangVal(snapshot.val().language);
  //   });
  // }
  useEffect(() => {
    console.log("loaded flag: ", savedLangLabel);
    // if (savedLangLabel === "" || savedLangVal === "") {
    //   loadSavedLanguage().then(() => {
    //     const params = new URLSearchParams();
    //     if (query) {
    //       params.append("lng", query)
    //     } else {
    //       params.delete("lng")
    //     }
    //     console.log(url);
    //     history({ search: `?${params.toString()}` });
    //     console.log(window.location.href);
    //   });
    // } else {
    // const params = new URLSearchParams()
    // if (query) {
    //   params.append("lng", query)
    // } else {
    //   params.delete("lng")
    // }
    // console.log(param);
    // // history({ search: `?${params.toString()}` });
    // console.log(window.location.href);
    // }
    if (savedLangLabel === "" || savedLangVal === "") {
      if (cookie.preferredLanguage !== "") {

        setSavedLangVal(cookie.preferredLanguage);
        if (cookie.preferredLanguage === "en") {
          setSavedLangLabel(usa);
        } else if (cookie.preferredLanguage === "esMX") {
          setSavedLangLabel(mexico);
        } else if (cookie.preferredLanguage === "pt") {
          setSavedLangLabel(brazil);
        } else if (cookie.preferredLanguage === "he") {
          setSavedLangLabel(israel);
        } else if (cookie.preferredLanguage === "fr") {
          setSavedLangLabel(france);
        }
      } else {
        setCookie("preferredLanguage", "esMX", {
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        });
        setSavedLangLabel(mexico);
        setSavedLangVal("esMX");
      }
      if(!cookie.preferredLanguage || cookie.preferredLanguage==="undefined"){
        setSavedLangLabel(mexico);
        setSavedLangVal("esMX");
      }
    }

  }, [query, history, savedLangLabel, savedLangVal, cookie])


  return (
    <>
      <Navbar
        // color={topbarColor}
        // dark={!isDarkMode}
        // light={isDarkMode}
        expand="lg"
        className="topbar"
        style={{ maxHeight: "50px" }}
      >
        {/********Logo*******/}
        <div className={`sidebarBox shadow ${isFixed ? 'fixedTopbar' : ''}`}>

          <div className="d-none d-lg-flex align-items-center justify-content-center logo-space p-0">
            {/* <Logo /> */}
            <Button
              close
              size="sm"
              className="ms-auto d-sm-block d-lg-none"
              onClick={() => dispatch(ToggleMobileSidebar())}
            />
          </div>
        </div>
        {/******************************/}
        {/**********Toggle Buttons**********/}
        {/******************************/}
        <div className="me-auto d-flex align-items-center">
          <Button
            // color={topbarColor}
            className="d-none d-lg-block mx-1 border-0 hov-dd btn-header"
            onClick={() => dispatch(ToggleMiniSidebar())}
          >
            <Icon.Menu size={18} />
          </Button>
          <NavbarBrand href="/" className="d-sm-block d-lg-none">
            {/* <LogoWhite /> */}
          </NavbarBrand>
          <Button
            // color={topbarColor}
            className="d-sm-block d-lg-none border-0 mx-1 hov-dd"
            onClick={() => dispatch(ToggleMobileSidebar())}
          >
            <i className="bi bi-list" />
          </Button>
          <div style={{ width: "85px", backgroundColor: "transparent" }} className='container-fluid' onClick={() => dispatch(ToggleMobileSidebar())}>

            <Select

              id="languageSelected"
              value={[{ value: savedLangVal, label: savedLangLabel }]}
              label="Selecciona Idioma"
              options={options}
              onChange={(e) => {
                // languageChange(e).then(() => {
                console.log("Selected: ", e.value);
                setCookie("preferredLanguage", e.value, {
                  path: "/",
                  maxAge: 3600, // Expires after 1hr
                  sameSite: true,
                });
                setSavedLangVal(e.value);
                if (e.value === "en") {
                  setSavedLangLabel(usa);
                } else if (e.value === "esMX") {
                  setSavedLangLabel(mexico);
                } else if (e.value === "pt") {
                  setSavedLangLabel(brazil);
                } else if (e.value === "he") {
                  setSavedLangLabel(israel);
                } else if (e.value === "fr") {
                  setSavedLangLabel(france);
                }
                // router.query.lng = e.value;
                // router.push(router)


                // const a = document.createElement('a');
                // a.href = window.location.href;
                // document.body.appendChild(a);
                // // a.click();
                // console.log("HREF: ",a.href)
                // });
              }}
            />
          </div>
          {/******************************/}
          {/**********Mega DD**********/}
          {/******************************/}
          <UncontrolledDropdown className="mega-dropdown mx-1 hov-dd">
            <DropdownToggle className="bg-transparent border-0 btn-header">
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
            <DropdownToggle className="bg-transparent border-0 btn-header">
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
            <DropdownToggle className="bg-transparent border-0 btn-header">
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
        </div>

        {/******************************/}
        {/**********Left Nav Bar**********/}
        {/******************************/}


        {/* <Nav className="me-auto d-flex flex-row align-items-center" navbar>
          <NavItem className="d-md-block d-none">
            <Link
              to="/about"
              className={`nav-link hov-dd ${topbarColor === 'white' ? 'text-dark' : ''}`}
            >
              About
            </Link>
          </NavItem>
        </Nav> */}

        <div className="d-flex align-items-center">

          {/******************************/}
          {/**********Profile DD**********/}
          {/******************************/}

          <UncontrolledDropdown>
            <DropdownToggle className="hov-dd btn-header">
              <img src="https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2Fuser1.jpg?alt=media&token=e0f78555-f833-441f-a070-1548ae18a478" alt="profile" className="rounded-circle" width="30" />
            </DropdownToggle>
            <DropdownMenu className="ddWidth profile-dd pt-0 bgProfileDD">
              <ProfileDD setModeFunc={setModeFunc} mode={mode} />
              <div className="p-2 px-3 bgProfileDD">
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
