import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

//import SidebarData from '../sidebars/sidebardata/SidebarData';

const BreadCrumbs = () => {
  const { t } = useTranslation();
  const location = useLocation();
  let firstUrl = location.pathname.split('/')[1];
  let secondUrl = location.pathname.split('/')[2];
  console.log(firstUrl, secondUrl);
  if (firstUrl === "Articulos") {
    if (t('items_headings') === "Elementos") {
      firstUrl = "Artículos"
    } else {
      firstUrl = t('items_headings');
    }
  }
  if (secondUrl === "Articulos") {

    secondUrl = "Artículos"
  }
  if (secondUrl === "Unidades") {

    secondUrl = t('units_headings');
  }

  if (secondUrl === "Categorias") {

    secondUrl = t('categories_modal')
  }

  if (secondUrl === "ColeccionArticulos") {

    secondUrl = t('itemCollection_navbar');
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
            {/* <h4 className="text-capitalize">{secondUrl ? `${secondUrl}` : `${firstUrl}`}</h4> */}

          </div>
          <div >
          <Breadcrumb>
              <BreadcrumbItem to="/" tag={Link} className="text-decoration-none fw-normal" style={{ color: "#1186a2" }}>
                Home
              </BreadcrumbItem>
              {firstUrl ? <BreadcrumbItem active>{firstUrl}</BreadcrumbItem> : ''}
              {secondUrl ? <BreadcrumbItem active>{secondUrl}</BreadcrumbItem> : ''}
            </Breadcrumb>
          </div>
          
         
            
          
        
      </div>

    </>
  );
};

export default BreadCrumbs;
