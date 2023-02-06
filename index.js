import Sidebar from "@/layouts/breadcrumbs/sidebars/vertical/Sidebar";
import { useSelector } from 'react-redux';
import HorizontalHeader from "@/layouts/header/HorizontalHeader";
import HorizontalSidebar from "@/layouts/breadcrumbs/sidebars/horizontal/HorizontalSidebar";
import { Container } from 'reactstrap';
import Header from "@/layouts/header/Header";
import { useRouter } from 'next/router';
import Router from "next/router";
import Loader from "@/components/Loader/loader";
import { appWithTranslation } from "next-i18next";
import { useState } from "react";

function IndexPage({ Component, pageProps }) {
  const toggleMiniSidebar = useSelector((state) => state.customizer.isMiniSidebar);
  const showMobileSidebar = useSelector((state) => state.customizer.isMobileSidebar);
  const topbarFixed = useSelector((state) => state.customizer.isTopbarFixed);
  const LayoutHorizontal = useSelector((state) => state.customizer.isLayoutHorizontal);
  const isFixedSidebar = useSelector((state) => state.customizer.isSidebarFixed);
  const direction = useSelector((state) => state.customizer.isRTL);
  const isMode = useSelector((state) => state.customizer.isDark);
  const [loading, setLoading] = useState(false);
  // Router
  const router = useRouter()



  if (Component.getLayout) {
    return Component.getLayout(<Component {...pageProps} />)
  }

  Router.events.on('routeChangeStart', (url) => {
    console.log('Router s chnaging');
    setLoading(true);
  });
  Router.events.on('routeChangeComplete', (url) => {
    console.log('Router completeeeed!');
    setLoading(false);
  });

  return (
    
    <main>

      { loading && <Loader />}
      {/* <div className={`${direction ? 'rtl' : 'ltr'} ${isMode ? 'dark' : ''}`} dir={direction ? 'rtl' : 'ltr'}> */}

      <div
        className={`pageWrapper d-md-block d-lg-flex ${toggleMiniSidebar ? 'isMiniSidebar' : ''}`}
        >
        {/******** Sidebar **********/}
        {LayoutHorizontal ? (
          ''
          ) : (
            <aside className={`sidebarArea ${showMobileSidebar ? 'showSidebar' : ''}`}>
            <Sidebar />
          </aside>
        )}
        {/********Content Area**********/}
        { loading && <Loader />}

        <div className={`contentArea ${topbarFixed ? 'fixedTopbar' : ''}`}>
          {/********header**********/}
          {LayoutHorizontal ? <HorizontalHeader /> : <Header />}
          {LayoutHorizontal ? <HorizontalSidebar /> : ''}
          {/********Middle Content**********/}
          <Container fluid className="p-4 boxContainer">
            <div className={isFixedSidebar && LayoutHorizontal ? 'HsidebarFixed' : ''}>
            </div>
            <div className="contentArea">
              {loading && <Loader />}
              <Component key={router.asPath} {...pageProps} />
            </div>

          </Container>
        </div>

      </div>
      {/* </div> */}

    </main>
    
  )
}

export default appWithTranslation(IndexPage);