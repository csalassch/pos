import { useState, useEffect } from 'react';
import * as Icon from 'react-feather';
import { Table, Modal, ModalHeader, ModalBody, Button, Card, Col, Row, CardHeader } from 'reactstrap';
import { onValue, ref, update } from 'firebase/database';
import { db } from '../../FirebaseConfig/firebase';
import Alta from './Admin/Licencias/Alta';
import DetallesLicencia from './Admin/Licencias/DetallesLicencia';
import Editar from './Admin/Licencias/Editar';

const TablePanelLicencias = () => {
  const [lista, setLista] = useState([{ id: 0, nombre: '', descripcion: '', monto: 0, caracteristicas: [''] }]);
  const [modal, setModal] = useState(false);
  const [action, setAction] = useState('');
  const [uidLicencia, setUidLicencia] = useState('');
  const toggle = () => {
    setModal(!modal);
  };

  function getDatosLicencia() {
    onValue(ref(db, "licenses/"), snapshot => {
      const listaLicencias = [];
      let caract = [];
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
          caracteristicas: caract,
          active: snap.val().active
        }
        listaLicencias.push(licencia)
        caract = []
      })
      setLista(listaLicencias);
    });
  }

  function modifiedActive(data) {
    update(ref(db, `licenses/${data.id}`), {
      active: data.active === "true" ? "false" : "true"
    });
    getDatosLicencia();
  }
  useEffect(() => {
    getDatosLicencia();
  }, [uidLicencia])
  return (
    <div>
      <Card>
        <CardHeader style={{ backgroundColor: "#eef0f2" }}>
          <Row>
            <Col>
              {/* <Button onClick={newUnit} type="submit" className="btn btn-success"><Icon.Plus style={{ marginRight: "0px", verticalAlign: "middle", position: "relative" }} />{btnMessage}</Button> */}
              <h4 style={{ color: "#1186a2" }}>Registro licencia</h4>
            </Col>
            <Col>
              <div className='d-flex justify-content-end'>
                <Button title='Agregar Licencia' onClick={() => { setModal(true); setAction("Agregar") }} className="btn btn-icon" ><Icon.Plus /></Button>
                <Button title='Recargar tabla' onClick={() => { getDatosLicencia() }} className="btn btn-icon" ><Icon.RefreshCw /></Button>
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
              <th>Monto</th>
              <th>Caracteristicas</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((tdata) => (
              <tr key={tdata.id} className="border-top">
                <td><div className='d-flex justify-content-center' onClick={() => { modifiedActive(tdata) }}>
                  {tdata.active === "true" ?
                    <div><Icon.ToggleRight style={{ color: "#fca311" }} /></div>
                    : <div><Icon.ToggleLeft /></div>}
                </div></td>
                <td>{tdata.nombre}</td>
                <td>{tdata.descripcion}</td>
                <td>{tdata.monto}</td>
                <td>
                  <ul>
                    {tdata.caracteristicas.map((carac) =>
                      <li key={carac.id}>
                        {carac.caracteristica}
                      </li>
                    )}
                  </ul>
                </td>
                <td>
                  <div className='d-flex align-items-center p-2 ms-3 '>
                    <div onClick={() => { setUidLicencia(tdata.id); setAction("Detalles"); setModal(true) }} style={{ cursor: "pointer" }}>
                      <Icon.AlertCircle />
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
      <Modal className='modal-lg' isOpen={modal} toggle={toggle.bind(null)}>
        <ModalHeader toggle={toggle.bind(null)} style={{ color: "#1186a2", width: "100%" }} >
          <Row>
            <Col>
              {action === "Agregar" ? <div><Icon.PlusCircle /> Agregar licencia</div> : <div></div>}
              {action === "Detalles" ? <div><Icon.AlertCircle /> Detalles licencia</div> : <div></div>}
              {action === "Editar" ? <div><Icon.Edit /> Editar licencia</div> : <div></div>}
            </Col>
            <Col>
            <div className='d-flex justify-content-end'>

              {action === "Detalles" ? <div className='btn-icon' onClick={() => { setAction("Editar") }}><Icon.Edit /> </div> : <div></div>}
            </div>
            </Col>
          </Row>
        </ModalHeader>
        <ModalBody>
          {action === "Agregar" ? <Alta /> : ""}
          {action === "Detalles" ? <DetallesLicencia id={uidLicencia} /> : ""}
          {action === "Editar" ? <Editar id={uidLicencia} /> : ""}
        </ModalBody>
        {/* <ModalFooter>
        </ModalFooter> */}
      </Modal>

    </div>
  );
};

export default TablePanelLicencias;
