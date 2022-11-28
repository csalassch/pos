import 'react-table-v6/react-table.css';
import { Card, CardBody} from 'reactstrap';
import BreadCrumbs from '../../../layouts/breadcrumbs/BreadCrumbs';
import TablePanelProductos from '../../../components/PanelLicencias/TablePanelProductos';
import TablePanelModulos from '../../../components/PanelLicencias/TablePanelModulos';

const PanelProductosAdmin = () => {
    return (
        <div>
            <BreadCrumbs />
            <Card>
                <CardBody>
                    <TablePanelProductos />
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <TablePanelModulos />
                </CardBody>
            </Card>
        </div>
    );
};

export default PanelProductosAdmin;
