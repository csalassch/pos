
import { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Card, CardHeader, Row, Col, CardBody } from 'reactstrap';
import { onValue, ref, update } from 'firebase/database';
import { CFormSwitch } from '@coreui/bootstrap-react';
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
      active: !data.active
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
        <CardHeader>
          <Row>
            <Col>
              <h4 style={{ color: "#eef0f2" }}>Registro producto</h4>
            </Col>
            <Col>
              <div className='d-flex justify-content-end'>
                <Button title='Agregar producto' onClick={() => { setModal(true); setAction("Agregar") }} className="btn btn-icon" ><Icon.Plus /></Button>
                <Button title='Recargar tabla' onClick={() => { getDatosProductos() }} className="btn btn-icon" ><Icon.RefreshCw /></Button>
              </div >
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Row>
            <Col>
              <Table className="no-wrap mt-3 align-middle" responsive borderless>
                <thead>
                  <tr>
                    <th className='text-center'>Activo</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Detalles</th>
                  </tr>
                </thead>
                <tbody>
                  {lista.map((tdata) => (
                    <tr key={tdata.id} className="border-top">
                      <td><div className='d-flex justify-content-center' onClick={() => { modifiedActive(tdata) }} >
                        {tdata.active === true ?
                          <div className='d-flex justify-content-center'><CFormSwitch id="formSwitchCheckChecked" defaultChecked /></div>
                          // <div><Icon.ToggleRight style={{ color: "#fca311" }} /></div>
                          :
                          <div className='d-flex justify-content-center'><CFormSwitch id="formSwitchCheckChecked" /></div>
                          //  <div><Icon.ToggleLeft /></div>
                        }
                      </div></td>
                      <td>{tdata.nombre}</td>
                      <td>{tdata.descripcion}</td>
                      <td>
                        <div className='w-full d-flex justify-content-center'>
                          <Button onClick={() => { setUidProducto(tdata.id); setAction("Detalles"); setModal(true) }} color='secondary' type="submit" style={{ fontSize: "11px", border: "none" }}><Icon.Info style={{ maxWidth: "18px" }} /></Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Modal isOpen={modal} toggle={toggle.bind(null)}>
        <ModalHeader toggle={toggle.bind(null)} style={{ color: "#1186a2", width: "100%" }}>
          <Row>
            <Col>
              {action === "Agregar" ? <div><Icon.PlusCircle /> Agregar producto</div> : <div></div>}
              {action === "Detalles" ? <div><Icon.AlertCircle /> Detalles producto</div> : <div></div>}
              {action === "Editar" ? <div><Icon.Edit /> Editar producto</div> : <div></div>}
            </Col>
            <Col>
              <div className='d-flex justify-content-end'>
                {action === "Detalles" ? <div className='btn-icon-Modal' onClick={() => { setAction("Editar") }}><Icon.Edit /> </div> : <div></div>}
              </div>
            </Col>
          </Row>

        </ModalHeader>
        <ModalBody>
          {action === "Agregar" ? <AltaP muestra="prod" /> : ""}
          {action === "Detalles" ? <DetallesProducto muestra="prod" id={uidProducto} /> : ""}
          {action === "Editar" ? <EditarP muestra="prod" id={uidProducto} /> : ""}
        </ModalBody>
        <ModalFooter>

        </ModalFooter>
      </Modal>
    </div >
  );
};

export default TablePanelProductos;
