
import { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Card, CardHeader, Row, Col } from 'reactstrap';
import { onValue, ref, update } from 'firebase/database';
import { db } from '../../FirebaseConfig/firebase';
import AltaM from './Admin/Modulos/AltaM';
import DetallesModulo from './Admin/Modulos/DetallesModulo';
import EditarM from './Admin/Modulos/EditarM';

const TablePanelModulos = () => {
  const [modal, setModal] = useState(false);
  const [action, setAction] = useState('');
  const [uidModulo, setUidModulo] = useState('');
  const [lista, setLista] = useState([{ id: 0, nombre: '', descripcion: '' }]);
  const toggle = () => {
    setModal(!modal);
  };
  function getDatosModulos() {
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
    getDatosModulos();
  }
  useEffect(() => {
    getDatosModulos();
  }, [])
  return (
    <div>
      <Card>
        <CardHeader style={{ backgroundColor: "#eef0f2" }}>
          <Row>
            <Col>
              {/* <Button onClick={newUnit} type="submit" className="btn btn-success"><Icon.Plus style={{ marginRight: "0px", verticalAlign: "middle", position: "relative" }} />{btnMessage}</Button> */}
              <h4 style={{ color: "#1186a2" }}>Registro Módulo</h4>
            </Col>
            <Col>
              <div className='d-flex justify-content-end'>
                <Button title='Agregar Módulo'onClick={() => { setModal(true); setAction("Agregar") }} className="btn btn-icon" ><Icon.Plus /></Button>
                <Button title='Recargar tabla' onClick={() => { getDatosModulos() }} className="btn btn-icon" ><Icon.RefreshCw /></Button>
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
                  <div onClick={() => { setUidModulo(tdata.id); setAction("Detalles"); setModal(true) }} style={{ cursor: "pointer" }}>
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
          {action === "Agregar" ? <div><Icon.PlusCircle /> Agregar módulo</div> : <div></div>}
          {action === "Detalles" ? <div><Icon.AlertCircle /> Detalles módulo</div> : <div></div>}
          {action === "Editar" ? <div><Icon.Edit /> Editar módulo</div> : <div></div>}
        </ModalHeader>
        <ModalBody>
          {action === "Agregar" ? <AltaM /> : ""}
          {action === "Detalles" ? <DetallesModulo id={uidModulo} /> : ""}
          {action === "Editar" ? <EditarM id={uidModulo} /> : ""}
        </ModalBody>
        <ModalFooter>
          {action === "Detalles" ? <div className='btn-icon' onClick={() => { setAction("Editar") }}><Icon.Edit /> </div> : <div></div>}
        </ModalFooter>
      </Modal>
    </div >
  );
};

export default TablePanelModulos;
