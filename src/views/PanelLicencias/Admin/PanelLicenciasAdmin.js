import 'react-table-v6/react-table.css';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import BreadCrumbs from '../../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../../components/ComponentCard';
import TablePanelLicencias from '../../../components/PanelLicencias/TablePanelLicencias';

const PanelLicenciasAdmin = () => {
    return (
        <div>
            <BreadCrumbs />
            <ComponentCard title="Agregar Licencias">
                <Link to={`/servicios/PanelLicenciasAdmin/${"AL"}`}>
                    <Button className="btn" color="primary" size="lg" block><Icon.Plus /></Button>
                </Link>
            </ComponentCard>

            <Card>
                <CardBody>
                    <CardTitle tag="h5">Lista de licencias </CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Aqui se visualizaran todas las licencias
                    </CardSubtitle>
                    <TablePanelLicencias />
                </CardBody>
            </Card>
        </div>
    );
};

export default PanelLicenciasAdmin;
