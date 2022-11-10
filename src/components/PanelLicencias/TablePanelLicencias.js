
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';

const TablePanelLicencias = ({ lista }) => {
  const listItems = (datos) => datos.map((carac) =>
    <li key={carac.id}>
      {carac}
    </li>
  );
  return (
    <div>
      <Table className="no-wrap mt-3 align-middle" responsive borderless>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Monto</th>
            <th>Caracteristicas</th>
            <th>Accion</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((tdata) => (
            <tr key={tdata.id} className="border-top">
              <td>{tdata.nombre}</td>
              <td>{tdata.descripcion}</td>
              <td>{tdata.monto}</td>
              <td>
                <ul>{listItems(tdata.caracteristicas)}</ul>
              </td>
              <td>
                <div className="d-flex align-items-center p-2 ms-3 ">
                  <Link to={`/servicios/PanelLicenciasAdmin/${"E"}/${tdata.id}`} className="border border-0 bg-transparent"><Icon.Edit /></Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className='w-full d-flex justify-content-center'>
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
    </div>
  );
};

export default TablePanelLicencias;
