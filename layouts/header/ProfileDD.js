import React, { useEffect, useState } from 'react';
// import React, { useState, useEffect } from 'react';
import { DropdownItem } from 'reactstrap';

import { User, FileText, Star, Settings, Moon } from 'react-feather';
// import { CFormSwitch } from '@coreui/bootstrap-react';
// import { useNavigate } from 'react-router-dom';
import { useRouter } from 'next/router';
import {
  useSelector,
  useDispatch
} from 'react-redux';

import { useCookies } from "react-cookie"
import Link from 'next/link';


// import { useAuth } from '../../Context/authContext';


const ProfileDD = () => {
  const [darkTheme, setDarkTheme] = useState(undefined);
  // const { user, dataUser } = useAuth();
  // const [userData, setUserData] = useState({ name: "" });
  const [isDarkMode, setIsDarkMode] = useState(false);
  // let isDarkMode = useSelector((state) => state.customizer.isDark);
  const dispatch = useDispatch();

  const navigate = useRouter();
  const [cookie, setCookie] = useCookies(["theme"])

  const handleToggle = (event) => {
    console.log("clicked!: ", event.target.checked);
    setDarkTheme(event.target.checked);
  }
  async function getInitialColorValue() {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      '--initial-color-mode'

    );

    return initialColorValue;
  }


  useEffect(() => {
    if (darkTheme !== undefined && typeof window !== undefined) {
      if (darkTheme === true) {
        console.log("Im dark");
        document.documentElement.setAttribute('data-theme', 'dark');
        window.localStorage.setItem('theme', 'dark');
        setCookie("theme", 'dark', {
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        });
        const element = document.documentElement;
        element.style.setProperty('--initial-color-mode', 'dark');
      } else {
        console.log("Im light");
        document.documentElement.removeAttribute("data-theme");
        window.localStorage.setItem('theme', 'light');
        setCookie("theme", 'light', {
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        });
        const element = document.documentElement;
        element.style.setProperty('--initial-color-mode', 'light');

      }
    }
  }, [darkTheme, cookie]);

  useEffect(() => {
    if (typeof window !== undefined) {

      getInitialColorValue().then((initialColorValue) => {
        setDarkTheme(initialColorValue === 'dark');
        console.log("initial: ", initialColorValue === 'dark');

      })
    }
  }, [])

  return (
    <div className='bgProfileDD'>
      <div style={{ backgroundColor: "#174a5b" }} className="d-flex gap-3 p-3 text-white rounded-top pt-2 align-items-center">
        <img src="https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2Fuser1.jpg?alt=media&token=e0f78555-f833-441f-a070-1548ae18a478" alt="user" className="mt-2 rounded-circle" width="60" />
        <span>
          <h5 className="mb-0">Example User</h5>
          {/* <h5 className="mb-0">{userData.name}</h5> */}
          <small className="fs-6 opacity-50">example@koonol.com</small>
          {/* <small className="fs-6 opacity-50">{user.email}</small> */}
        </span>
      </div>

      <DropdownItem className="px-4 py-3 txtProfile">
        <Link href={"/views/Perfil/MiPerfil"}>
          <div>

            <User size={20} />
            &nbsp; Mi perfil
          </div>
        </Link>
      </DropdownItem>

      {/* Dark Mode Style 2 */}


      <DropdownItem className="px-4 py-3 txtProfile">
        <Star size={20} />
        &nbsp; My Balance
      </DropdownItem>
      <div className='container px-4 py-3 txtProfile'>
        <div className='d-flex flex-row'>
          <Moon size={20} />
          &nbsp; Modo Oscuro
          &nbsp;
          <div>
            {darkTheme !== undefined && (

              <label className="switch">
                <input type="checkbox" checked={darkTheme} onChange={(e) => { handleToggle(e); 
                  // window.location.reload() 
                  }} />
                <span className="slider round" ></span>
              </label>
            )}
          </div>



        </div>

      </div>
      <DropdownItem divider />
      <DropdownItem className="px-4 py-3 txtProfile">
        <Settings size={20} />
        &nbsp; Settings
      </DropdownItem>
      <DropdownItem divider />
    </div>
  );
};

export default ProfileDD;
