import React from 'react';
import { Breadcrumb } from 'antd';
// import { useTranslation } from 'react-i18next';
import useTranslation from '../../hooks/useTranslation';

import { useRouter } from 'next/router';


const BreadCrumbs = () => {
  const { t } = useTranslation();

  // const router = useRouter();
  const location = useRouter();
  // const location = useLocation();
  let firstUrl = location.pathname.split('/')[1];
  let secondUrl = location.pathname.split('/')[2];
  let thirdUrl = location.pathname.split('/')[3];
  console.log(firstUrl, secondUrl, thirdUrl);
  if (firstUrl === "Articulos") {

    firstUrl = t('txt_076');

  }
  if (thirdUrl === "subsidiarias") {

    thirdUrl = t('txt_028');

  }
  if (thirdUrl === "usuarios") {

    thirdUrl = t('txt_036');

  }
  if (secondUrl === "Usuarios") {

    secondUrl = t('txt_036');

  }
  if (secondUrl === "dashboard") {

    secondUrl = t('txt_109');

  }
  if (secondUrl === "Ubicaciones") {

    secondUrl = t('txt_112');

  }
  if (secondUrl === "Articulos") {
    secondUrl = t('txt_076');
  }
  if (thirdUrl === "roles") {
    thirdUrl = t('txt_040');
  }
  if (thirdUrl === "permisos") {
    thirdUrl = t('txt_042');
  }
  if (thirdUrl === "Articulos") {

    thirdUrl = "Artículos"
  }
  if (thirdUrl === "Unidades") {

    thirdUrl = t('txt_104');
  }

  if (thirdUrl === "Categorias") {

    thirdUrl = t('txt_025')
  }

  if (thirdUrl === "ColeccionArticulos") {

    thirdUrl = t('txt_013');
  }
 

  return (
    <>
      <div className='d-flex'>

        <div className='me-auto p-2 bd-highlight'>
          <h4 className="text-capitalize breadCrumbTitle">{thirdUrl}</h4>
          {/* <h4 className="text-capitalize breadCrumbTitle">{secondUrl ? `${secondUrl}` : `${firstUrl}`}</h4> */}

        </div>
        <div >
          <Breadcrumb>
            <Breadcrumb.Item to="/" tag={location.pathname} className="text-decoration-none fw-normal" style={{ color: "#1186a2" }}>
              {t('txt_108')}
            </Breadcrumb.Item>
            {secondUrl ? <Breadcrumb.Item >{secondUrl}</Breadcrumb.Item> : ''}
            {thirdUrl ? <Breadcrumb.Item >{thirdUrl}</Breadcrumb.Item> : ''}
          </Breadcrumb>
        </div>





      </div>

    </>
  );
};

export default BreadCrumbs;
