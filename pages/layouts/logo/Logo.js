import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import React from 'react';
// import { ReactComponent as LogoDarkIcon } from '../../assets/images/logos/Logo-FreeBug-web-2-500px.svg';
// import { ReactComponent as LogoDarkText } from '../../assets/images/logos/Logo-FreeBug-web-2-500px.svg';
import { ReactComponent as LogoDarkText } from '../../assets/images/logos/Logo-FreeBug-web-2-500px.svg';
// import { ReactComponent as LogoWhiteIcon } from '../../assets/images/logos/Logo-FreeBug-sello2-_1_.svg';
// import { ReactComponent as LogoWhiteText } from '../../assets/images/logos/Logo-FreeBug-web-2-500px.svg';

const Logo = () => {
  // const isDarkMode = useSelector((state) => state.customizer.isDark);
  const {toggleMiniSidebar} = useSelector((state) => state.customizer.isMiniSidebar);
  // const activeTopbarBg = useSelector((state) => state.customizer.topbarBg);
  return (
    <a href='/' className="d-flex align-items-center gap-2">
      {/* {isDarkMode || activeTopbarBg !== 'white' ? (
        <>
          <LogoDarkText />
          {toggleMiniSidebar ? '' : <LogoDarkText />}
        </>
      ) : ( */}
      <>
        {/* {!toggleMiniSidebar ? <img alt="freebug-logo" src='https://www.freebug.mx/Logo-FreeBug-web-2-500px.png' style={{width:"auto",height:"50px"}}></img> */}
      {!toggleMiniSidebar ? <LogoDarkText style={{width:"auto",height:"50px"}} />
          : <img className='imgAdjust' alt="freebug-logo" src='https://www.freebug.mx/Logo-FreeBug-sello2.png' style={{width:"auto",height:"50px",paddingTop:"5px"}}></img>        }
      </>
      {/* )} */}
    </a>
  );
};

export default Logo;
