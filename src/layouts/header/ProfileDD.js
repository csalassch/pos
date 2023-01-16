import React, { useEffect } from 'react';
// import React, { useState, useEffect } from 'react';
import { DropdownItem } from 'reactstrap';

import { User, FileText, Star, Settings, Moon } from 'react-feather';
import { CFormSwitch } from '@coreui/bootstrap-react';

import { useNavigate } from 'react-router-dom';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import { ChangeDarkMode } from '../../store/customizer/CustomizerSlice';

import user1 from '../../assets/images/users/user4.jpg';
// import { useAuth } from '../../Context/authContext';


const ProfileDD = () => {

  // const { user, dataUser } = useAuth();
  // const [userData, setUserData] = useState({ name: "" });
  const isDarkMode = useSelector((state) => state.customizer.isDark);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    // if (dataUser) {
    //   setUserData(dataUser);
    // }
  }, [])

  return (
    <div>
      <div style={{ backgroundColor: "#174a5b" }} className="d-flex gap-3 p-3 text-white rounded-top pt-2 align-items-center">
        <img src={user1} alt="user" className="mt-2 rounded-circle" width="60" />
        <span>
          <h5 className="mb-0">Example User</h5>
          {/* <h5 className="mb-0">{userData.name}</h5> */}
          <small className="fs-6 opacity-50">example@koonol.com</small>
          {/* <small className="fs-6 opacity-50">{user.email}</small> */}
        </span>
      </div>
      <DropdownItem className="px-4 py-3">
        <User size={20} />
        &nbsp; Mi perfil
      </DropdownItem>
      <DropdownItem className="px-4 py-3" onClick={() => { navigate("/soporte") }}>
        <FileText size={20} />
        &nbsp; Editar perfil
      </DropdownItem>

      {/* Dark Mode Style 2 */}


      <DropdownItem className="px-4 py-3">
        <Star size={20} />
        &nbsp; My Balance
      </DropdownItem>
      <div className='container px-4 py-3'>
        <div className='d-flex flex-row'>
          <Moon size={20} />
          &nbsp; Modo Oscuro
          &nbsp;{isDarkMode === true ? <div
            onClick={() => dispatch(ChangeDarkMode(false)) && window.location.reload(false)}

          ><CFormSwitch id="formSwitchCheckDefault" defaultChecked /></div> : <div
            onClick={() => dispatch(ChangeDarkMode(true))}

          ><CFormSwitch id="formSwitchCheckDefault" /></div>}
        </div>

      </div>
      <DropdownItem divider />
      <DropdownItem className="px-4 py-3">
        <Settings size={20} />
        &nbsp; Settings
      </DropdownItem>
      <DropdownItem divider />
    </div>
  );
};

export default ProfileDD;
