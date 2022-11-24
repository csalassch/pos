
import { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { onValue, ref, update } from 'firebase/database';
import { db } from '../../FirebaseConfig/firebase';

const TablePanelModulos = () => {
  const [modal, setModal] = useState(false);
  const [lista, setLista] = useState([{ id: 0, nombre: '', descripcion: '' }]);
  const toggle = () => {
    setModal(!modal);
  };
  function getDatosProductos() {
    onValue(ref(db, "modules/"), snapshot => {
      const listaProductos = [];
      snapshot.forEach(snap => {
        const Producto = {
          id: snap.key,
          nombre: snap.val().name,
          descripcion: snap.val().description,
          active: snap.val().active
        }
        listaProductos.push(Producto)
      })
      setLista(listaProductos);
    });
  }
  function modifiedActive(data) {
    update(ref(db, `products/${data.id}`), {
      active: data.active === "true" ? "false" : "true"
    });
    getDatosProductos();
  }
  useEffect(() => {
    getDatosProductos();
  }, [])
  return (
    <div>
      <br />
      <div className='w-full d-flex justify-content-start m-6'>
        <div className="d-flex justify-content-center" onClick={getDatosProductos} style={{cursor:"pointer"}}>
          <Icon.RefreshCw />
          <p>Recargar</p>
        </div>
      </div>
      <Table className="no-wrap mt-3 align-middle" responsive borderless>
        <thead>
          <tr>
            <th className='text-center'>Activo</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((tdata) => (
            <tr key={tdata.id} className="border-top">
              <td><div className='d-flex justify-content-center' onClick={() => { modifiedActive(tdata) }} >
                {tdata.active === "true" ? <div><Icon.ToggleRight style={{ color: "#00b26f" }} /></div>
                  : <div><Icon.ToggleLeft /></div>}
              </div></td>
              <td>{tdata.nombre}</td>
              <td>{tdata.descripcion}</td>
              <td>
                <div className='d-flex align-items-center p-2 ms-3'>
                  <div>
                    <Link to={`/servicios/PanelLicenciasAdmin/${"EM"}/${tdata.id}`} className="border border-0 bg-transparent"><Icon.Edit /></Link>
                  </div>

                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal isOpen={modal} toggle={toggle.bind(null)}>
        <ModalHeader toggle={toggle.bind(null)}><Icon.AlertCircle /> Borrar Unidad</ModalHeader>
        <ModalBody>
          ¿Seguro que quieres eliminar el producto ?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => { setModal(false); }}>
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

export default TablePanelModulos;