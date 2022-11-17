import { useState, useEffect } from 'react';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import { Pagination, PaginationItem, PaginationLink, Table, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { onValue, ref, update } from 'firebase/database';
import { db } from '../../FirebaseConfig/firebase';

const TablePanelLicencias = () => {
  const [lista, setLista] = useState([{ id: 0, nombre: '', descripcion: '', monto: 0, caracteristicas: [''] }]);
  const [listaGeneral, setListaGeneral] = useState([[{ id: 0, nombre: '', descripcion: '', monto: 0, caracteristicas: [''] }]]);
  const [arrPib, setArrPib] = useState([]);
  const [modal, setModal] = useState(false);
  const [pag, setPag] = useState(0);
  const toggle = () => {
    setModal(!modal);
  };
  function createPagination() {
    setListaGeneral([]);
    let listita = [];
    let listones = [];
    let listones2 = [];
    let cont = 0;
    let pib = 0;
    for (let i = 0; i < lista.length; i++) {
      listita.push(lista[i]);
      if (cont === 9) {
        listones2.push({ id: pib });
        listones.push(listita)
        listita = []
        cont = 0;
        pib++;
      }
      if (i === (lista.length - 1)) {
        listones2.push({ id: pib });
        listones.push(listita);
        pib++;
      }
      cont++;
    }
    setArrPib(listones2);
    setListaGeneral(listones);
    console.log(listaGeneral);
    listones = [];
    listones2 = [];
    listita = [];
  }
  function getDatosLicencia() {
    const listaLicencias = [];
    let caract = [];
    onValue(ref(db, "licenses/"), snapshot => {
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
    });
    setLista(listaLicencias);
    createPagination();
  }

  function modifiedActive(data) {
    update(ref(db, `licenses/${data.id}`), {
      active: data.active === "true" ? "false" : "true"
    });
    getDatosLicencia();
  }
  useEffect(() => {
    getDatosLicencia();
  }, [pag])
  return (
    <div>
      <br />
      <div className='w-full d-flex justify-content-start m-6'>
        <div className="d-flex justify-content-center" onClick={getDatosLicencia}>
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
            <th>Monto</th>
            <th>Caracteristicas</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          {listaGeneral[pag].map((tdata) => (
            <tr key={tdata.id} className="border-top">
              <td><div className='d-flex justify-content-center' onClick={() => { modifiedActive(tdata) }}>
                {tdata.active === "true" ?
                  <div><Icon.ToggleRight style={{ color: "#00b26f" }} /></div>
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
                  <div>
                    <Link to={`/servicios/PanelLicenciasAdmin/${"EL"}/${tdata.id}`} className="border border-0 bg-transparent"><Icon.Edit /></Link>
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
          {arrPib.map((pagi) => (
            <PaginationItem key={pagi.id} >
              <PaginationLink href="#" onClick={() => { setPag(pagi.id);}}>{pagi.id + 1}</PaginationLink>
            </PaginationItem>))
          }
          <PaginationItem disabled>
            <PaginationLink next href="#" />
          </PaginationItem> 
        </Pagination>
      </div>
      <Modal isOpen={modal} toggle={toggle.bind(null)}>
        <ModalHeader toggle={toggle.bind(null)}><Icon.AlertCircle /> Borrar Unidad</ModalHeader>
        <ModalBody>
          ¿Seguro que quieres eliminar la licencia?
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
    </div>
  );
};

export default TablePanelLicencias;
