import { useState, useEffect } from 'react';
import * as Icon from 'react-feather';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, CardSubtitle, CardTitle } from 'reactstrap';
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
      <br />
      <div className='w-full d-flex justify-content-between '>
        <div className=''>
          <CardTitle tag="h5">Lista de licencias </CardTitle>
          <CardSubtitle className="mb-2 text-muted" tag="h6">
            Aqui se visualizaran todas las licencias
          </CardSubtitle>
        </div>
        <div className=''>
            <Button onClick={() => { setModal(true); setAction("Agregar") }} className="btn btn-success" size="lg" block><Icon.Plus /></Button>
          <div className="d-flex justify-content-center mt-2" onClick={getDatosLicencia} style={{ cursor: "pointer" }}>
            <Icon.RefreshCw />
            <p>Recargar</p>
          </div>
        </div>
      </div>
      <Table className="no-wrap mt-3 align-middle" responsive borderless>
        <thead>
          <tr>
            <th className='text-center'>Activo</th>
            <th>Nombre</th>
            <th>Descripcion</th>
            <th>Monto</th>
            <th>Caracteristicas</th>
            <th>Opciones</th>
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
                <div className='d-flex align-items-center p-2 ms-3'>
                  <div onClick={() => { setUidLicencia(tdata.id); setAction("Detalles"); setModal(true) }} style={{ cursor: "pointer" }}>
                    <Icon.Edit style={{ color: "#1186A2" }} />
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal className='modal-lg' isOpen={modal} toggle={toggle.bind(null)}>
        <ModalHeader toggle={toggle.bind(null)}>
        {action === "Agregar" ? <div><Icon.PlusCircle /> Agregar licencia</div>:<div></div>}
        {action === "Detalles" ? <div><Icon.PlusCircle /> Detalles licencia</div>:<div></div>}
        {action === "Editar" ? <div><Icon.Edit /> Editar licencia</div>:<div></div>}
        </ModalHeader>
        <ModalBody>
          {action === "Agregar" ? <Alta /> : ""}
          {action === "Detalles" ? <DetallesLicencia id={uidLicencia} /> : ""}
          {action === "Editar" ? <Editar id={uidLicencia} /> : ""}
        </ModalBody>
        <ModalFooter>
        {action === "Detalles" ? <div className='btn-icon' onClick={()=>{ setAction("Editar")}}><Icon.Edit/> </div>:<div></div>}
        </ModalFooter>
      </Modal>

    </div>
  );
};

export default TablePanelLicencias;
