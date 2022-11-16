import 'react-table-v6/react-table.css';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import BreadCrumbs from '../../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../../components/ComponentCard';
import TablePanelProductos from '../../../components/PanelLicencias/TablePanelProductos';

const PanelProductosAdmin = () => {
    return (
        <div>
            <BreadCrumbs />
            <ComponentCard title="Agregar Productos">
                <Link to={`/servicios/PanelProductosAdmin/${"AP"}`}>
                    <Button className="btn" color="primary" size="lg" block><Icon.Plus /></Button>
                </Link>
            </ComponentCard>

            <Card>
                <CardBody>
                    <CardTitle tag="h5">Lista de Productos </CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Aqui se visualizaran todas las Productos adquiridas
                    </CardSubtitle>
                    <TablePanelProductos />
                </CardBody>
            </Card>
        </div>
    );
};

export default PanelProductosAdmin;
