import 'react-table-v6/react-table.css';
import { Card, CardBody} from 'reactstrap';
import BreadCrumbs from '../../../layouts/breadcrumbs/BreadCrumbs';
import TablePanelLicencias from '../../../components/PanelLicencias/TablePanelLicencias';
import '../../../assets/css/styles.css';

const PanelLicenciasAdmin = () => {
    return (
        <div>
            <BreadCrumbs />
            <Card>
                <CardBody>
                    <TablePanelLicencias />
                </CardBody>
            </Card>
        </div>
    );
};

export default PanelLicenciasAdmin;
