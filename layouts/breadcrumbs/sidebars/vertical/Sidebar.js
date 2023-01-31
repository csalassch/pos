import React, { useEffect } from 'react';
// import React, { useEffect, useState } from 'react';
import { Nav } from 'reactstrap';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
// import { ChangeSidebarColor } from '@/pages/store/customizer/CustomizerSlice';
import SimpleBar from 'simplebar-react';

// import SidebarData from '../sidebardata/SidebarData';
import SidebarDataClient from '../sidebardata/SidebarDataClient';
import NavItemContainer from './NavItemContainer';
import NavSubMenu from './NavSubMenu';
import Link from 'next/link';
// import Logo from '@/pages/layouts/logo/Logo';
// import Logo from '../logo/Logo';

// import { ToggleMiniSidebar} from '../../store/customizer/CustomizerSlice';

// import user1 from '../../../assets/images/users/user4.jpg';
// import { useAuth } from '../../../Context/authContext';
// import '../../../assets/css/styles.css';


// import '../../../pages/assets/css/styles.css';

// import '../../../assets/css/styles.css';


const Sidebar = () => {
  const location = useRouter();
  const currentURL = location.pathname.split('/').slice(0, -1).join('/');

  //const [collapsed, setCollapsed] = useState(null);
  // const toggle = (index) => {
  //   setCollapsed(collapsed === index ? null : index);
  // };
  const { activeBg } = useSelector((state) => state.customizer.sidebarBg);
  const { isFixed } = useSelector((state) => state.customizer.isSidebarFixed);
  // const topbarColor = useSelector((state) => state.customizer.topbarBg);

  // const { dataUser } = useAuth();
  // const [userData, setUserData] = useState({ name: '', role: '' });
  // function getDatoUnico() {
  //   if (dataUser) {
  //     setUserData(dataUser);
  //   }
  // }

  useEffect(() => {
    // getDatoUnico()
    // console.log(userData)
  }, [])
  // }, [dataUser, userData])
  return (
    // <div className={`sidebarBox shadow ${isFixed ? 'fixedSidebar' : ''}`}>
    <div className={`sidebarBox shadow fixedSidebar`}>

      <SimpleBar style={{ height: '100%' }}>


        {/********Sidebar Content*******/}
        <div className="p-3">
          {
            // (userData.role === 'client') ?
            // <Nav vertical className={activeBg === 'white' ? '' : 'lightText'}>
            // <Nav vertical className={activeBg === 'white' ? '' : 'white'}  style={{color:"white"}}>
            <Nav vertical className={activeBg === 'white' ? '' : 'white'} style={{ color: "white" }}>
              {SidebarDataClient.map((navi) => {
                if (navi.caption) {
                  return (
                    <div className="navCaption text-uppercase mt-4" key={navi.caption} >
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
                      style={{ color: "white" }}
                    />
                  );
                }
                return (
                  // <NavItemContainer
                  //   key={navi.id}
                  //   //toggle={() => toggle(navi.id)}
                  //   className={location.pathname === navi.href ? 'activeLink' : ''}
                  //   to={navi.href}
                  //   // title="ah"
                  //   title={navi.title}
                  //   suffix={navi.suffix}
                  //   suffixColor={navi.suffixColor}
                  //   icon={navi.icon}
                  // />
                  <li className='nav-item' key={navi.id}>

                    <div key={navi.id} className={location.pathname === navi.href ? 'nav-link active px-2 d-flex align-items-end' : 'nav-link px-2 d-flex align-items-end'}>
                      <Link className='linkSideBar gap-3 d-flex align-items-end' href={navi.href}>
                        <div className='d-flex flex-row' style={{cursor:"pointer"}}>
                        
                          <span className="sidebarIcon px-2">{navi.icon}</span>
                          <span className="hide-mini d-flex align-items-end">
                            <span className='hide-mini'>{navi.title}</span>
                          </span>
                        </div>
                      </Link>
                    </div>
                  </li>
                );
              })}
            </Nav>
          }
        </div>
      </SimpleBar>
    </div>

  );
};

export default Sidebar;
