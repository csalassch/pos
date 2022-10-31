import React, { useState, useEffect } from 'react';
import { DropdownItem } from 'reactstrap';
import { User, FileText, Star, Settings, Droplet } from 'react-feather';
import { ref, onValue } from 'firebase/database';

import user1 from '../../assets/images/users/user4.jpg';
import { useAuth } from '../../Context/authContext';

import { db } from '../../FirebaseConfig/firebase';

const ProfileDD = () => {

  const { user } = useAuth();
  const [userData, setUserData] = useState("");
  function getDatoUnico() {
    onValue(ref(db, `usuarios/${user.uid}`), (snapshot => {
      const username = (snapshot.val() && snapshot.val().userName) || "Anonymous";
      console.log("ID USUARIO: ", username)
      setUserData(username);

    }))
  }

  useEffect(() => {
    getDatoUnico()
  }, [])

  return (
    <div>
      <div className="d-flex gap-3 p-3 text-white rounded-top bg-info pt-2 align-items-center">
        <img src={user1} alt="user" className="mt-2 rounded-circle" width="60" />
        <span>
          <h5 className="mb-0">{userData}</h5>
          <small className="fs-6 opacity-50">{user.email}</small>
        </span>
      </div>
      <DropdownItem className="px-4 py-3">
        <User size={20} />
        &nbsp; My Profile
      </DropdownItem>
      <DropdownItem className="px-4 py-3">
        <FileText size={20} />
        &nbsp; Edit Profile
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
