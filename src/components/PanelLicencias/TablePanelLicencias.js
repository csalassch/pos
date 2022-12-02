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
  const downloadTemplate = () => {
    const strEsp = "[Escribe a partir de aquí]";
    const encoded = new TextEncoder('utf-8', { NONSTANDARD_allowLegacyEncoding: true });
    const decoded = (new TextDecoder('utf-8').decode(encoded.encode(strEsp)));
    console.log(decoded);
    const CSV = [
      '"Nombre"',
      decoded
    ].join('\n');
    window.URL = window.webkitURL || window.URL;
    const contentType = 'text/csv';
    const csvFile = new Blob([CSV], { type: contentType });
    const a = document.createElement('a');
    a.download = 'Plantilla_Categorias_FreePOS.csv';
    a.href = window.URL.createObjectURL(csvFile);
    a.textContent = 'Download CSV';
    a.dataset.downloadurl = [contentType, a.download, a.href].join(':');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
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
      active: !data.active
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
                <Button title='Descargar Plantilla' className='btn btn-icon' onClick={downloadTemplate} type="button" style={{ marginLeft: "7px" }}><Icon.FileText style={{ marginRight: "0px", verticalAlign: "middle", position: "relative" }} /></Button>
              </div >
            </Col>
          </Row>
        </CardHeader>
        <Table className="no-wrap mt-3 align-middle" responsive borderless>
          <thead>
            <tr>
              <th className='text-center'>Activo</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Monto</th>
              <th>Características</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {lista.map((tdata) => (
              <tr key={tdata.id} className="border-top">
                <td><div className='d-flex justify-content-center' onClick={() => { modifiedActive(tdata) }}>
                  {tdata.active === true ?
                    <div><Icon.ToggleRight style={{ color: "#fca311" }} /></div>
                    : <div><Icon.ToggleLeft /></div>}
                </div></td>
                <td>{tdata.nombre}</td>
                <td>{tdata.descripcion}</td>
                <td>${(tdata.monto % 1 === 0 ? `${tdata.monto}.00` : (tdata.monto).toFixed(2))} MXN</td>
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
                  <div className='d-flex justify-content-center'>
                    <Button onClick={() => { setUidLicencia(tdata.id); setAction("Detalles"); setModal(true) }} color='secondary' type="submit" style={{ fontSize: "11px", border: "none" }}><Icon.Info style={{ maxWidth: "18px" }} /></Button>
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
      </Modal>

    </div>
  );
};

export default TablePanelLicencias;
