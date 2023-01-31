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
  console.log(firstUrl, secondUrl);
  if (firstUrl === "Articulos") {
    if (t('items_headings') === "Elementos") {
      firstUrl = "Artículos"
    } else {
      firstUrl = t('items_headings');
    }
  }
  if (thirdUrl === "Articulos") {

    thirdUrl = "Artículos"
  }
  if (thirdUrl === "Unidades") {

    thirdUrl = t('units_headings');
  }

  if (thirdUrl === "Categorias") {

    thirdUrl = t('categories_modal')
  }

  if (thirdUrl === "ColeccionArticulos") {

    thirdUrl = t('itemCollection_navbar');
  }
  if (firstUrl === "PanelLicenciasAdmin") {
    firstUrl = "Versiones";

  }
  if (secondUrl === "PanelLicenciasAdmin") {

    secondUrl = "Versiones"
  }
  if (firstUrl === "servicios") {
    firstUrl = "Servicios";

  }
  if (secondUrl === "servicios") {

    secondUrl = "Servicios"
  }
  if (firstUrl === "PanelProductosAdmin") {
    firstUrl = "Productos";

  }
  if (secondUrl === "PanelProductosAdmin") {

    secondUrl = "Productos"
  }
  if (firstUrl === "PanelLicencias") {
    firstUrl = "Usuarios";

  }
  if (secondUrl === "PanelLicencias") {

    secondUrl = "Usuarios"
  }
  if (firstUrl === "PanelModulosAdmin") {
    firstUrl = "Módulos";

  }
  if (secondUrl === "PanelModulosAdmin") {

    secondUrl = "Módulos"
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
              Home
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
