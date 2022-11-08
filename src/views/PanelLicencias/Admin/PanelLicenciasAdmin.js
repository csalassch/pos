import { useState, useEffect } from 'react';
import 'react-table-v6/react-table.css';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import BreadCrumbs from '../../../layouts/breadcrumbs/BreadCrumbs';

import ComponentCard from '../../../components/ComponentCard';
//import TablePanelLicencias from '../../../components/PanelLicencias/TablePanelLicencias';

const PanelLicenciasAdmin = () => {
    const [lista, setLista] = useState([]);

    function getDatosLicencia() {
        const longitud= 41;
        const paginas = [];
        let pagina = [];
        let cont =0;
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
            //Hacemos la paginacion de 10 elementos
            pagina.push(licencia)
            if (cont === 9) {
                paginas.push(pagina)
                pagina = [];
                cont = -1;
            }
            if(i === (longitud-1)){
                paginas.push(pagina)
                pagina = [];
            }
            cont++;
        }
        console.log(paginas)
        setLista(paginas);
    }

    useEffect(() => {
        getDatosLicencia();
        console.log(lista)
    }, [])
    return (
        <div>
            <BreadCrumbs />
            <ComponentCard title="Agregar Licencias">
            </ComponentCard>
            {/* <TablePanelLicencias lista={lista[1]} /> */}
            <Pagination aria-label="Page navigation example">
                <PaginationItem disabled>
                    <PaginationLink previous href="#" />
                </PaginationItem>
                <PaginationItem active>
                    <PaginationLink href="#">1</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">4</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">5</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink next href="#" />
                </PaginationItem>
            </Pagination>
        </div>
    );
};

export default PanelLicenciasAdmin;
