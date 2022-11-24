
import { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
// import { Link } from 'react-router-dom';
import { Table, Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col } from 'reactstrap';
import { onValue, ref, update } from 'firebase/database';
import { db } from '../../FirebaseConfig/firebase';
import ComponentCard from '../ComponentCard';


const TableItemsComp = () => {
    const [modal, setModal] = useState(false);
    const [lista, setLista] = useState([]);
    const toggle = () => {
        setModal(!modal);
    };
    function getDatosProductos() {
        onValue(ref(db, "items/"), snapshot => {
            const listaProductos = [];
            snapshot.forEach(snap => {
                console.log(snap.val().idImage);
                let urlImage = "";
                onValue(ref(db, `files/${snap.val().idImage}`), snapshotFiles => {
                    urlImage = snapshotFiles.val().url;
                    const Producto = {
                        id: snap.key,
                        nombre: snap.val().name,
                        urlImage: urlImage,
                        sku: snap.val().sku,
                        precio: snap.val().price,
                        active: snap.val().active
                    }
                    listaProductos.push(Producto)
                });
                
            })
            setLista(listaProductos);
        });
    }
    function modifiedActive(data) {
        update(ref(db, `items/${data.id}`), {
            active: data.active === "true" ? "false" : "true"
        });
        getDatosProductos();
    }
    useEffect(() => {

        if(lista.length===0){
            getDatosProductos();
        }
        
        console.log(lista);
    }, [lista])
    return (
        <Row>
            <Col>
                <ComponentCard title="Artículos">
                    <div>

                        <br />
                        <div className='w-full d-flex justify-content-start m-6'>
                            <div style={{ cursor: "pointer" }} className="d-flex justify-content-center" onClick={getDatosProductos}>
                                <Icon.RefreshCw style={{ marginRight: "5px" }} />
                                <p> Recargar</p>
                            </div>
                        </div>
                        <Table className="no-wrap mt-3 align-middle" responsive borderless >
                            <thead>
                                <tr>
                                    <th className='text-center'>Activo</th>
                                    <th className='text-center'>Imagen</th>
                                    <th>Nombre</th>
                                    <th>SKU</th>
                                    <th>Precio</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lista.map((tdata) => (
                                    <tr key={tdata.id} className="border-top">
                                        <td><div className='d-flex justify-content-center' onClick={() => { modifiedActive(tdata) }}>
                                            {tdata.active ? <div><Icon.ToggleRight style={{ color: "#fca311" }} /></div>
                                                : <div><Icon.ToggleLeft style={{ color: "#67757C" }}/></div>}
                                        </div></td>
                                        <td className='d-flex justify-content-center'><img id="imageProductRetrieved"
                                            alt="..."
                                            className=" img-fluid rounded shadow-lg"
                                            src={tdata.urlImage}
                                            style={{ width: "40px" }}
                                        ></img></td>
                                        <td>{tdata.nombre}</td>
                                        <td>{tdata.sku}</td>
                                        <td>$ {tdata.precio}</td>
                                        <td>
                                            <div className='d-flex align-items-center p-2 ms-3'>
                                                <div>
                                                    <Icon.Edit style={{color: "#1186a2",cursor:"pointer"}} />
                                                    {/* <Link to={`/servicios/PanelLicenciasAdmin/${"EP"}/${tdata.id}`} className="border border-0 bg-transparent"><Icon.Edit /></Link> */}
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
                </ComponentCard>
            </Col>
        </Row>
    );
};

export default TableItemsComp;
