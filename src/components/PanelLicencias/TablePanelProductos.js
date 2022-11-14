
import { useEffect,  useState } from 'react';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ref, remove } from 'firebase/database';
import { db } from '../../FirebaseConfig/firebase';

const TablePanelProductos = ({ lista }) => {
  const [uidEliminar, setUidEliminar] = useState('');
  const [nombreEliminar, setNombreEliminar] = useState('');
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };
  function deleteProducto() {
    remove(ref(db, `products/${uidEliminar}`));
    setUidEliminar('');
    setNombreEliminar('');
  }
  useEffect(() => {
  }, [lista, uidEliminar, nombreEliminar])
  return (
    <div>
      <Table className="no-wrap mt-3 align-middle" responsive borderless>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((tdata) => (
            <tr key={tdata.id} className="border-top">
              <td>{tdata.nombre}</td>
              <td>{tdata.descripcion}</td>
              <td>
              <div className='d-flex align-items-center p-2 ms-3'>
                  <div>
                    <Link to={`/servicios/PanelLicenciasAdmin/${"EL"}/${tdata.id}`} className="border border-0 bg-transparent"><Icon.Edit /></Link>
                  </div>
                  <div onClick={() => {setNombreEliminar(tdata.nombre); setUidEliminar(tdata.id); setModal(true)}}>
                    <Icon.Trash2 style={{ color: "#d54747" }} />
                  </div>
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
      <Modal isOpen={modal} toggle={toggle.bind(null)}>
        <ModalHeader toggle={toggle.bind(null)}><Icon.AlertCircle /> Borrar Unidad</ModalHeader>
        <ModalBody>
          ¿Seguro que quieres eliminar el producto {nombreEliminar} ?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => { setModal(false); deleteProducto() }}>
            Confirmar
          </Button>
          <Button color="secondary" onClick={toggle.bind(null)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div >
  );
};

export default TablePanelProductos;
