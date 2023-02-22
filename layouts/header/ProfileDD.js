import React, { useEffect, useState } from 'react';
import { DropdownItem, Modal, ModalBody, ModalHeader } from 'reactstrap';
import { User, FileText, Star, Settings, Moon } from 'react-feather';
import { useAuth } from "@/Context/AuthContext";
import useTranslation from '@/hooks/useTranslation';
import { useRouter } from 'next/router';
import {
  useSelector,
  useDispatch
} from 'react-redux';

import { useCookies } from "react-cookie"
import Link from 'next/link';


// import { useAuth } from '../../Context/authContext';


const ProfileDD = ({ openProfile, setOpenProfile }) => {
  const [darkTheme, setDarkTheme] = useState(undefined);
  const { t } = useTranslation();
  const [isDarkMode, setIsDarkMode] = useState(false);
  // let isDarkMode = useSelector((state) => state.customizer.isDark);
  const dispatch = useDispatch();
  const { user, dataUser } = useAuth();
  // Informacion del usuario
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    photoUrl: "https://firebasestorage.googleapis.com/v0/b/bloona-ef12e.appspot.com/o/user2.jpg?alt=media&token=672adbda-27af-4352-ba0a-57773c2b95e5"
  });
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

  const fillUserData = async () => {
    const objUser = {
        name: "",
        email: "",
        photoUrl: "https://firebasestorage.googleapis.com/v0/b/bloona-ef12e.appspot.com/o/user2.jpg?alt=media&token=672adbda-27af-4352-ba0a-57773c2b95e5"
    }
    // Si existe un displayName que no sea nulo, poner el nombre de la persona
    if (dataUser.displayName != null) {
        objUser.name = dataUser.displayName

    }
    // De lo contrario poner el nombre o texto que este antes del @ de su correo
    else {
        let strEmail = dataUser.email;
        strEmail = strEmail.split("@");
        objUser.name = strEmail[0];
        console.log("UserName w no displayName:", strEmail[0]);
    }
    // Evalua si hay foto existente en datos de Google
    if (dataUser.photoURL != null) {
        objUser.photoUrl = dataUser.photoURL;
    }
    // Pendiente: hacer un caso de que sea logeado con número telefónico
    // Pendiente: consultar datos faltantes en caso de no existir esa información

    if (dataUser.email) {
        objUser.email = dataUser.email;
    }
    console.log("objUser: ", objUser);
    return objUser;
}
  useEffect(() => {
    if (dataUser) {
      fillUserData().then((res) => {
          setUserData(res);
          console.log("dataUser loaded after: ", res);

      });
  }
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
        <img src={userData.photoUrl} alt="user" className="mt-2 rounded-circle" width="60" />
        <span>
          <h5 className="mb-0">{userData.name}</h5>
          {/* <h5 className="mb-0">{userData.name}</h5> */}
          <small className="fs-7 opacity-50">{userData.email}</small>
          {/* <small className="fs-6 opacity-50">{user.email}</small> */}
        </span>
      </div>
      {/* Profile button */}
      <DropdownItem className="px-4 py-3 txtProfile">

        <div onClick={() => { setOpenProfile(!openProfile) }}>

          <User size={20} />
          &nbsp; {t('txt_079')}
        </div>

      </DropdownItem>

      {/* Dark Mode Style 2 */}


      {/* <DropdownItem className="px-4 py-3 txtProfile">
        <Star size={20} />
        &nbsp; My Balance
      </DropdownItem> */}
      <div className='container px-4 py-3 txtProfile'>
        <div className='d-flex flex-row'>
          <Moon size={20} />
          &nbsp; {t('txt_080')}
          &nbsp;
          <div>
            {darkTheme !== undefined && (

              <label className="switch">
                <input type="checkbox" checked={darkTheme} onChange={(e) => {
                  handleToggle(e);
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
        &nbsp; {t('txt_081')}
      </DropdownItem>
      <DropdownItem divider />

    </div>

  );
};

export default ProfileDD;
