import { useState, useEffect } from 'react';
import 'react-table-v6/react-table.css';
import { Card, CardBody, CardTitle, CardSubtitle, Button } from 'reactstrap';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import BreadCrumbs from '../../../layouts/breadcrumbs/BreadCrumbs';

import ComponentCard from '../../../components/ComponentCard';
import TablePanelLicencias from '../../../components/PanelLicencias/TablePanelLicencias';

const PanelLicenciasAdmin = () => {
    const [lista, setLista] = useState([{ id: 0, nombre: '', descripcion: '', monto: 0, caracteristicas: [''] }]);

    function getDatosLicencia() {
        const longitud = 41;
        const listaLicencias = [];
        for (let i = 0; i < longitud; i++) {
            //Obtiene las caracteristicas
            const caracteristicas = [];
            const numCarac = 2;
            for (let j = 0; j < numCarac; j++) {
                caracteristicas.push(`Caracteristica ${j + 1}`)
            }
            //Generamos el objeto licencia con las caracteristicas obtenidas
            const licencia = {
                id: i,
                nombre: `Licencia ${i + 1}`,
                descripcion: `Descripcion ${i + 1}`,
                monto: (i + 1) * 100,
                caracteristicas: caracteristicas
            }
            listaLicencias.push(licencia)
        }
        console.log(listaLicencias)
        setLista(listaLicencias);
    }

    useEffect(() => {
        getDatosLicencia();
        console.log(lista)
    }, [])
    return (
        <div>
            <BreadCrumbs />
            <ComponentCard title="Agregar Licencias">
                <Link to={`/servicios/PanelLicenciasAdmin/${"A"}`}>
                    <Button className="btn" color="primary" size="lg" block><Icon.Plus /></Button>
                </Link>
            </ComponentCard>

            <Card>
                <CardBody>
                    <CardTitle tag="h5">Lista de licencias </CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                        Aqui se visualizaran todas las licencias adquiridas
                    </CardSubtitle>

                    <TablePanelLicencias lista={lista} />
                </CardBody>
            </Card>
        </div>
    );
};

export default PanelLicenciasAdmin;
