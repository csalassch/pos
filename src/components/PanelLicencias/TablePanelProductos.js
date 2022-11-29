
import { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Card, CardHeader, Row, Col } from 'reactstrap';
import { onValue, ref, update } from 'firebase/database';
import { db } from '../../FirebaseConfig/firebase';
import AltaP from './Admin/Productos/AltaP';
import DetallesProducto from './Admin/Productos/DetallesProducto';
import EditarP from './Admin/Productos/EditarP';

const TablePanelProductos = () => {
  const [action, setAction] = useState('');
  const [uidProducto, setUidProducto] = useState('');
  const [modal, setModal] = useState(false);
  const [lista, setLista] = useState([{ id: 0, nombre: '', descripcion: '' }]);
  const toggle = () => {
    setModal(!modal);
  };
  function getDatosProductos() {
    onValue(ref(db, "products/"), snapshot => {
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
      <Card>
        <CardHeader style={{ backgroundColor: "#eef0f2" }}>
          <Row>
            <Col>
              <h4 style={{ color: "#1186a2" }}>Registro producto</h4>
            </Col>
            <Col>
              <div className='d-flex justify-content-end'>
                <Button title='Agregar producto' onClick={() => { setModal(true); setAction("Agregar") }} className="btn btn-icon" ><Icon.Plus /></Button>
                <Button title='Recargar tabla' onClick={() => { getDatosProductos() }} className="btn btn-icon" ><Icon.RefreshCw /></Button>
              </div >
            </Col>
          </Row>
        </CardHeader>
        <Table className="no-wrap mt-3 align-middle" responsive borderless>
          <thead>
            <tr>
              <th className='text-center'>Activo</th>
              <th>Nombre</th>
              <th>Descripcion</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((tdata) => (
              <tr key={tdata.id} className="border-top">
                <td><div className='d-flex justify-content-center' onClick={() => { modifiedActive(tdata) }} >
                  {tdata.active === "true" ? <div><Icon.ToggleRight style={{ color: "#fca311" }} /></div>
                    : <div><Icon.ToggleLeft /></div>}
                </div></td>
                <td>{tdata.nombre}</td>
                <td>{tdata.descripcion}</td>
                <td>
                  <div className='d-flex align-items-center p-2 ms-3 '>
                    <div onClick={() => { setUidProducto(tdata.id); setAction("Detalles"); setModal(true) }} style={{ cursor: "pointer" }}>
                      <Icon.AlertCircle />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
      <Modal isOpen={modal} toggle={toggle.bind(null)}>
        <ModalHeader toggle={toggle.bind(null)} >
          {action === "Agregar" ? <div><Icon.PlusCircle /> Agregar producto</div> : <div></div>}
          {action === "Detalles" ? <div><Icon.AlertCircle /> Detalles producto</div> : <div></div>}
          {action === "Editar" ? <div><Icon.Edit /> Editar producto</div> : <div></div>}
        </ModalHeader>
        <ModalBody>
          {action === "Agregar" ? <AltaP /> : ""}
          {action === "Detalles" ? <DetallesProducto id={uidProducto} /> : ""}
          {action === "Editar" ? <EditarP id={uidProducto} /> : ""}
        </ModalBody>
        <ModalFooter>
          {action === "Detalles" ? <div className='btn-icon' onClick={() => { setAction("Editar") }}><Icon.Edit /> </div> : <div></div>}
        </ModalFooter>
      </Modal>
    </div >
  );
};

export default TablePanelProductos;
