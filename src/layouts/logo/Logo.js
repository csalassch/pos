import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
// import { ReactComponent as LogoDarkIcon } from '../../assets/images/logos/Logo-FreeBug-web-2-500px.svg';
// import { ReactComponent as LogoDarkText } from '../../assets/images/logos/dark-logo-text.svg';
import { ReactComponent as LogoDarkText } from '../../assets/images/logos/Logo-FreeBug-web-2-500px.svg';
import { ReactComponent as LogoWhiteIcon } from '../../assets/images/logos/Logo-FreeBug-sello2-_1_.svg';
// import { ReactComponent as LogoWhiteText } from '../../assets/images/logos/Logo-FreeBug-web-2-500px.svg';

const Logo = () => {
  // const isDarkMode = useSelector((state) => state.customizer.isDark);
  const toggleMiniSidebar = useSelector((state) => state.customizer.isMiniSidebar);
  // const activeTopbarBg = useSelector((state) => state.customizer.topbarBg);
  return (
    <Link to="/" className="d-flex align-items-center gap-2">
      {/* {isDarkMode || activeTopbarBg !== 'white' ? (
        <>
          <LogoDarkText />
          {toggleMiniSidebar ? '' : <LogoDarkText />}
        </>
      ) : ( */}
      <>
        {!toggleMiniSidebar ? <LogoDarkText fill='current' style={{ height: "50px", width: "auto" }} />
          : <LogoWhiteIcon fill='current' style={{ height: "auto", width: "45px" }} />}
      </>
      {/* )} */}
    </Link>
  );
};

export default Logo;
