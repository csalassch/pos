import { useState, useEffect } from 'react';
import 'react-table-v6/react-table.css';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../FirebaseConfig/firebase';
import BreadCrumbs from '../../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../../components/ComponentCard';
// import TablePanelProductos from '../../../components/PanelLicencias/TablePanelProductos';
import TablePanelProductos from '../../../components/PanelLicencias/TablePanelProductos';

const PanelProductosAdmin = () => {
    const [lista, setLista] = useState([{ id: 0, nombre: '', descripcion: ''}]);

    function getDatosProducto() {
        const listaProductos = [];
        onValue(ref(db, "products/"), snapshot => {
            snapshot.forEach(snap => {
                const Producto = {
                    id: snap.key,
                    nombre: snap.val().name,
                    descripcion: snap.val().description
                }
                listaProductos.push(Producto)
            })
        });
        setLista(listaProductos);
    }

    useEffect(() => {
        getDatosProducto();
    }, [])
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
                    <br />
                    <div className='w-full d-flex justify-content-start m-6'>
                        <div className="d-flex justify-content-center" onClick={getDatosProducto}>
                            <Icon.RefreshCw />
                            <p>Recargar</p>
                        </div>
                    </div>
                    <TablePanelProductos lista={lista} />
                </CardBody>
            </Card>
        </div>
    );
};

export default PanelProductosAdmin;
