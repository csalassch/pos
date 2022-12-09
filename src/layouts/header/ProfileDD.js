import React, { useState, useEffect } from 'react';
import { DropdownItem } from 'reactstrap';
import { User, FileText, Star, Settings, Droplet } from 'react-feather';

import { useNavigate } from 'react-router-dom';
import user1 from '../../assets/images/users/user4.jpg';
import { useAuth } from '../../Context/authContext';


const ProfileDD = () => {

  const { user, dataUser } = useAuth();
  const [userData, setUserData] = useState({ name: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (dataUser) {
      setUserData(dataUser);
    }
  }, [])

  return (
    <div>
      <div style={{backgroundColor:"#1F4F67"}} className="d-flex gap-3 p-3 text-white rounded-top pt-2 align-items-center">
        <img src={user1} alt="user" className="mt-2 rounded-circle" width="60" />
        <span>
          <h5 className="mb-0">{userData.name}</h5>
          <small className="fs-6 opacity-50">{user.email}</small>
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
      <DropdownItem className="px-4 py-3">
        <Star size={20} />
        &nbsp; My Balance
      </DropdownItem>
      <DropdownItem className="px-4 py-3">
        <Droplet size={20} />
        &nbsp; Customize
      </DropdownItem>
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
