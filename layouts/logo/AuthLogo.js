import React from 'react';
// import { useSelector } from 'react-redux';

// import { ReactComponent as LogoDarkIcon } from '../../assets/images/logos/dark-logo-icon.svg';
// import { ReactComponent as LogoDarkText } from '../../assets/images/logos/Logo-FreeBug-web-2-500px.svg';

// import { ReactComponent as LogoDarkText } from '../../assets/images/logos/dark-logo-text.svg';
// import { ReactComponent as LogoWhiteIcon } from '../../assets/images/logos/white-logo-icon.svg';
// import { ReactComponent as LogoWhiteText } from '../../assets/images/logos/white-logo-text.svg';

const AuthLogo = () => {
  // const isDarkMode = useSelector((state) => state.customizer.isDark);

  return (
    <div className="p-4 d-flex align-items-center justify-content-center gap-2">
      {/* {isDarkMode !== false ? (
        <>
          <LogoWhiteIcon />
          <LogoWhiteText />
        </>
      ) : (
        <>
          <LogoDarkIcon />
          <LogoDarkText />
        </>
      )} */}
      <img alt="freebug-logo" src='https://www.freebug.mx/Logo-FreeBug-web-2-500px.png' style={{width:"auto",height:"80px",paddingTop:"5px"}}></img>
      {/* <LogoDarkText style={{width:"auto",height:"50px"}} /> */}
    </div>
  );
};

export default AuthLogo;
