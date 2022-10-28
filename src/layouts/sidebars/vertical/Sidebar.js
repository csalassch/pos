import React  , { useEffect, useState}from 'react';
import { Nav } from 'reactstrap';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {ref,onValue} from 'firebase/database';
import SimpleBar from 'simplebar-react';
import SidebarData from '../sidebardata/SidebarData';
import NavItemContainer from './NavItemContainer';
import NavSubMenu from './NavSubMenu';
import user1 from '../../../assets/images/users/user4.jpg';
import { db } from '../../../FirebaseConfig/firebase'; 
import { useAuth } from '../../../Context/authContext';

const Sidebar = () => {
  const location = useLocation();
  const currentURL = location.pathname.split('/').slice(0, -1).join('/');

  //const [collapsed, setCollapsed] = useState(null);
  // const toggle = (index) => {
  //   setCollapsed(collapsed === index ? null : index);
  // };

  const activeBg = useSelector((state) => state.customizer.sidebarBg);
  const isFixed = useSelector((state) => state.customizer.isSidebarFixed);
  // const dispatch = useDispatch();
  const {user } = useAuth();
  const [userData, setUserData]=useState("");
  function getDatoUnico()
    { 
        onValue(ref(db, `usuarios/${user.uid}`),(snapshot=> {
            const username=(snapshot.val() && snapshot.val().userName) || "Anonymous";
            console.log("ID USUARIO: ",username)
            setUserData(username);
            
        }))
    }
    
  useEffect(() => {
    getDatoUnico()
}, [])
  return (
    <div className={`sidebarBox shadow bg-${activeBg} ${isFixed ? 'fixedSidebar' : ''}`}>
      <SimpleBar style={{ height: '100%' }}>
        <div className="py-3 px-4 d-flex align-items-center border-bottom-sidebar">
          <img src={user1} alt="user" width="30" className="rounded-circle" />
          <div className="ms-3 opacity-75 text-truncate user-name">{userData}</div>
        </div>
        {/********Sidebar Content*******/}
        <div className="p-3">
          <Nav vertical className={activeBg === 'white' ? '' : 'lightText'}>
            {SidebarData.map((navi) => {
              if (navi.caption) {
                return (
                  <div className="navCaption text-uppercase mt-4" key={navi.caption}>
                    {navi.caption}
                  </div>
                );
              }
              if (navi.children) {
                return (
                  <NavSubMenu
                    key={navi.id}
                    icon={navi.icon}
                    title={navi.title}
                    items={navi.children}
                    suffix={navi.suffix}
                    suffixColor={navi.suffixColor}
                    // toggle={() => toggle(navi.id)}
                    // collapsed={collapsed === navi.id}
                    isUrl={currentURL === navi.href}
                  />
                );
              }
              return (
                <NavItemContainer
                  key={navi.id}
                  //toggle={() => toggle(navi.id)}
                  className={location.pathname === navi.href ? 'activeLink' : ''}
                  to={navi.href}
                  title={navi.title}
                  suffix={navi.suffix}
                  suffixColor={navi.suffixColor}
                  icon={navi.icon}
                />
              );
            })}
          </Nav>
        </div>
      </SimpleBar>
    </div>
  );
};

export default Sidebar;
