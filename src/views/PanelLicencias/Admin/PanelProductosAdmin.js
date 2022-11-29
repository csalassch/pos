import 'react-table-v6/react-table.css';
import BreadCrumbs from '../../../layouts/breadcrumbs/BreadCrumbs';
import TablePanelProductos from '../../../components/PanelLicencias/TablePanelProductos';
import TablePanelModulos from '../../../components/PanelLicencias/TablePanelModulos';

const PanelProductosAdmin = () => {
    return (
        <div>
            <BreadCrumbs />
            <TablePanelProductos />
            <TablePanelModulos />
        </div>
    );
};

export default PanelProductosAdmin;
