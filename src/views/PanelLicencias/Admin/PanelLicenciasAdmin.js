import 'react-table-v6/react-table.css';
import BreadCrumbs from '../../../layouts/breadcrumbs/BreadCrumbs';
import TablePanelLicencias from '../../../components/PanelLicencias/TablePanelLicencias';
import '../../../assets/css/styles.css';

const PanelLicenciasAdmin = () => {
    return (
        <div>
            <BreadCrumbs />
            <TablePanelLicencias />
        </div>
    );
};

export default PanelLicenciasAdmin;
