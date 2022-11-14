import { useState, useEffect } from 'react';
import 'react-table-v6/react-table.css';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import { onValue, ref } from 'firebase/database';
import { db } from '../../../FirebaseConfig/firebase';
import BreadCrumbs from '../../../layouts/breadcrumbs/BreadCrumbs';
import ComponentCard from '../../../components/ComponentCard';
import TableProductosLicencias from '../../../components/PanelLicencias/TablePanelProductos';

const PanelProductosAdmin = () => {
    const [lista, setLista] = useState([{ id: 0, nombre: '', descripcion: '', monto: 0, caracteristicas: [''] }]);

    function getDatosLicencia() {
        const listaLicencias = [];
        let caract = [];
        onValue(ref(db, "licenses/"), snapshot => {
            snapshot.forEach(snap => {
                for (let i = 0; i < snap.val().caracteristicas.length; i++) {
                    const obj = {
                        id: `${snap.key}+${snap.val().caracteristicas[i].id}`,
                        caracteristica: snap.val().caracteristicas[i].caracteristica
                    }
                    caract.push(obj);
                }
                const licencia = {
                    id: snap.key,
                    nombre: snap.val().name,
                    descripcion: snap.val().description,
                    monto: snap.val().amount,
                    caracteristicas: caract
                }
                listaLicencias.push(licencia)
                caract = []
            })
        });
        setLista(listaLicencias);
    }

    useEffect(() => {
        getDatosLicencia();
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
                        Aqui se visualizaran todas las licencias adquiridas
                    </CardSubtitle>
                    <br />
                    <div className='w-full d-flex justify-content-start m-6'>
                        <div className="d-flex justify-content-center" onClick={getDatosLicencia}>
                            <Icon.RefreshCw />
                            <p>Recargar</p>
                        </div>
                    </div>
                    <TableProductosLicencias lista={lista} />
                </CardBody>
            </Card>
        </div>
    );
};

export default PanelProductosAdmin;
