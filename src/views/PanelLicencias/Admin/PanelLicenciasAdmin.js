import { useEffect } from 'react';
import 'react-table-v6/react-table.css';
import { Pagination, PaginationItem, PaginationLink} from 'reactstrap';
import BreadCrumbs from '../../../layouts/breadcrumbs/BreadCrumbs';

import ComponentCard from '../../../components/ComponentCard';
import TablePanelLicencias from '../../../components/PanelLicencias/TablePanelLicencias';

const PanelLicenciasAdmin = () => {

    useEffect(() => {
    }, [])
    return (
        <div>
            <BreadCrumbs />
            <ComponentCard title="Agregar Licencias">
            </ComponentCard>
            <TablePanelLicencias />
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
