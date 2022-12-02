import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { useLocation, Link } from 'react-router-dom';
//import SidebarData from '../sidebars/sidebardata/SidebarData';

const BreadCrumbs = () => {
  const location = useLocation();
  let firstUrl = location.pathname.split('/')[1];
  let secondUrl = location.pathname.split('/')[2];
  console.log(firstUrl, secondUrl);
  if (firstUrl === "Articulos") {
    firstUrl = "Artículos";

  }
  if (secondUrl === "Articulos") {

    secondUrl = "Artículos"
  }
  if (firstUrl === "Categorias") {
    firstUrl = "Categorías";

  }
  if (secondUrl === "Categorias") {

    secondUrl = "Categorías"
  }
  if (firstUrl === "ColeccionArticulos") {
    firstUrl = "Colección Artículos";

  }
  if (secondUrl === "ColeccionArticulos") {

    secondUrl = "Colección Artículos"
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
      <h4 className="text-capitalize">{secondUrl ? `${secondUrl}` : `${firstUrl}`}</h4>
      <Breadcrumb>
        <BreadcrumbItem to="/" tag={Link} className="text-decoration-none fw-normal" style={{ color: "#1186a2" }}>
          Home
        </BreadcrumbItem>
        {firstUrl ? <BreadcrumbItem active>{firstUrl}</BreadcrumbItem> : ''}
        {secondUrl ? <BreadcrumbItem active>{secondUrl}</BreadcrumbItem> : ''}
      </Breadcrumb>
    </>
  );
};

export default BreadCrumbs;
