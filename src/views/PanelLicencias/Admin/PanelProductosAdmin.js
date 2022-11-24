import 'react-table-v6/react-table.css';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import BreadCrumbs from '../../../layouts/breadcrumbs/BreadCrumbs';
import TablePanelProductos from '../../../components/PanelLicencias/TablePanelProductos';
import TablePanelModulos from '../../../components/PanelLicencias/TablePanelModulos';

const PanelProductosAdmin = () => {
    return (
        <div>
            <BreadCrumbs />
            <Card>
                <CardBody>
                    <div className='w-full d-flex justify-content-between '>
                        <div className=''>
                            <CardTitle tag="h5">Lista de productos </CardTitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6">
                                Aqui se visualizaran todos los productos disponibles
                            </CardSubtitle>
                        </div>
                        <div className=''>
                            Agregar producto
                            <Link to={`/servicios/PanelProductosAdmin/${"AP"}`}>
                                <Button className="btn btn-success" size="lg" block > <Icon.Plus /></Button>
                            </Link>
                        </div>
                    </div>
                    <TablePanelProductos />
                </CardBody>
            </Card>
            <Card>
                <CardBody>
                    <div className='w-full d-flex justify-content-between '>
                        <div className=''>
                            <CardTitle tag="h5">Lista de Módulos</CardTitle>
                            <CardSubtitle className="mb-2 text-muted" tag="h6">
                                Aqui se visualizaran todos los módulos
                            </CardSubtitle>
                        </div>
                        <div className=''>
                            Agregar módulo
                            <Link to={`/servicios/PanelProductosAdmin/${"AM"}`}>
                                <Button className="btn btn-success" size="lg" block><Icon.Plus /></Button>
                            </Link>
                        </div>
                    </div>
                    <TablePanelModulos />
                </CardBody>
            </Card>
        </div>
    );
};

export default PanelProductosAdmin;
