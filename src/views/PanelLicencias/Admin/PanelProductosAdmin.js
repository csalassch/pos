import 'react-table-v6/react-table.css';
import BreadCrumbs from '../../../layouts/breadcrumbs/BreadCrumbs';
import TablePanelProductos from '../../../components/PanelLicencias/TablePanelProductos';
import TablePanelModulos from '../../../components/PanelLicencias/TablePanelModulos';

const PanelProductosAdmin = ({ muestra }) => {
    return (
        <div>
            <BreadCrumbs />
            {muestra === "prod" ? <TablePanelProductos /> : ""}
            {muestra === "mod" ? <TablePanelModulos /> : ""}
        </div>
    );
};

export default PanelProductosAdmin;
