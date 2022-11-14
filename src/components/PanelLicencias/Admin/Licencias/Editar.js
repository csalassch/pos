import React, { useState, useEffect } from 'react';
import { Input, InputGroup, InputGroupText, Button, FormGroup, Table, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import { useForm } from 'react-hook-form';
import Form from 'react-validation/build/form';

import { onValue, ref, update } from 'firebase/database';
import * as Icon from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../../FirebaseConfig/firebase';
import ComponentCard from '../../../ComponentCard';

const Editar = ({ id }) => {
    const navigate = useNavigate()
    const { handleSubmit } = useForm();
    const [lista, setLista] = useState([]);
    const [caracteristica, setCaracteristica] = useState('');
    const [idEliminar, setIdEliminar] = useState(0);
    const [muestraCaracteristicas, setMuestraCaracteristicas] = useState(0);
    const [action, setAction] = useState("");
    const [Formvalue, setFormvalue] = useState({ nombre: '', descripcion: '', producto: '', monto: '' });
    const [FormvalueRef, setFormvalueRef] = useState({ nombre: '', descripcion: '', producto: '', monto: '' });
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
    };

    const handleChange = ({ target: { name, value } }) => {
        setFormvalue({ ...Formvalue, [name]: value });
        console.log(Formvalue)
    };
    const handleChangeList = ({ target: { value } }) => {
        setCaracteristica(value)
    };
    function deleteCharacteristic() {
        const listaF = lista;
        const listaAux = []
        const listaFiltrada = listaF.filter((item) => item.id !== (idEliminar));
        for (let i = 0; i < listaFiltrada.length; i++) {
            console.log(listaFiltrada[i])
            listaAux.push({ id: (i + 1), caracteristica: listaFiltrada[i].caracteristica });
        }
        setLista(listaAux)
        console.log(lista);
    }
    function addLicense() {
        if (caracteristica !== '') {
            console.log(caracteristica)
            const listAux = lista;
            listAux.push({ caracteristica: caracteristica, id: (lista.length + 1) });
            console.log(listAux)
            setLista(listAux);
            setCaracteristica('');
        }
    }
    function getDatosLicencia() {
        onValue(ref(db, `licenses/${id}`), snapshot => {
            const licencia = {
                id: snapshot.key,
                nombre: snapshot.val().name,
                producto: snapshot.val().product,
                descripcion: snapshot.val().description,
                monto: snapshot.val().amount
            }
            setFormvalue({ nombre: licencia.nombre, descripcion: licencia.descripcion, producto: licencia.producto, monto: licencia.monto })
            setFormvalueRef({ nombre: licencia.nombre, descripcion: licencia.descripcion, producto: licencia.producto, monto: licencia.monto })
        });
    }
    function getCaracteristicasLicencia() {
        onValue(ref(db, `licenses/${id}`), snapshot => {
            const licencia = {
                id: snapshot.key,
                caracteristicas: snapshot.val().caracteristicas
            }
            setLista(licencia.caracteristicas);
        });
    }
    const onSubmit = () => {
        getCaracteristicasLicencia();
        if (Formvalue !== FormvalueRef) {
            console.log(Formvalue, " ", FormvalueRef)
            if (Formvalue.nombre !== '' && Formvalue.descripcion !== '' && Formvalue.producto !== '' && Formvalue.monto !== '' && lista.length !== 0) {
                update(ref(db, `licenses/${id}`), {
                    name: Formvalue.nombre,
                    description: Formvalue.descripcion,
                    product: Formvalue.producto,
                    amount: Formvalue.monto,
                    caracteristicas: lista
                });
                setAction("envio");
            }
            else {
                setAction("vacio");
            }
        }
        else {
            setAction("ESC")
        }
    }
    useEffect(() => {
        getDatosLicencia();
    }, [caracteristica, lista])
    return (
        <>
            <ComponentCard title="EDITE LOS DATOS LICENCIA">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row'>
                        <div className='col'>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Nombre *</InputGroupText>
                                    <Input onChange={handleChange} value={Formvalue.nombre} type="text" name="nombre" className="form-control" placeholder="Nombre" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Descripcion *</InputGroupText>
                                    <Input onChange={handleChange} value={Formvalue.descripcion} type="textarea" rows="5" name="descripcion" className="form-control" placeholder="Descripcion" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Producto *</InputGroupText>
                                    <Input onChange={handleChange} value={Formvalue.producto} type="text" name="producto" className="form-control" placeholder="Producto" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText>Monto $ *</InputGroupText>
                                    <Input onChange={handleChange} value={Formvalue.monto} step='any' type="number" name="monto" className="form-control" placeholder="Nombre" />
                                </InputGroup>
                            </FormGroup>
                        </div>
                        <div className='col'>
                            <div className='row'>
                                <div className="col mb-2">
                                    <InputGroup>
                                        <InputGroupText>Nueva Caracteristica *</InputGroupText>
                                        <Input onChange={handleChangeList} type="text" name="caracteristica" value={caracteristica} className="form-control" placeholder="Caracteristica" />
                                    </InputGroup>
                                </div>
                                <div className='col-2' type="submit" onClick={addLicense}>
                                    <Icon.PlusCircle style={{ color: "blue" }} />
                                </div>
                            </div>
                            <div className='w-full' onClick={() => {
                                getCaracteristicasLicencia();
                                if (muestraCaracteristicas === 0) { setMuestraCaracteristicas(1); }
                                else {
                                    setMuestraCaracteristicas(0);
                                }
                            }}>
                                {muestraCaracteristicas === 1 ?
                                    <div><Icon.ChevronRight /></div> :
                                    <div className='d-flex flex-row mb-4'><Icon.ChevronDown /><p>Muestra las caracteristicas</p></div>}
                            </div>
                            {muestraCaracteristicas === 1 ?
                                <div>
                                    <Table className="no-wrap mt-3 align-middle" responsive borderless>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Caracteristica</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {lista.map((tdata) => (
                                                <tr key={tdata.id} className="border-top">
                                                    <td>{tdata.id}</td>
                                                    <td>{tdata.caracteristica}</td>
                                                    <td>
                                                        <div>
                                                            <Row>
                                                                <Col md="2">
                                                                    <div style={{ color: "	#d54747", cursor: "pointer" }} onClick={() => { setAction("del"); setIdEliminar(tdata.id); setModal(true); }}><Icon.Trash2 /></div>
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </Table>
                                </div> : <div></div>
                            }
                        </div>
                        {action === "del" ?
                            <Modal isOpen={modal} toggle={toggle.bind(null)}>
                                <ModalHeader toggle={toggle.bind(null)}><Icon.AlertCircle /> Borrar Unidad</ModalHeader>
                                <ModalBody>
                                    ¿Seguro que quieres eliminar la caracteristica?
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={() => { deleteCharacteristic(); setModal(false) }}>
                                        Confirmar
                                    </Button>
                                    <Button color="secondary" onClick={toggle.bind(null)}>
                                        Cancelar
                                    </Button>
                                </ModalFooter>
                            </Modal> : <Modal></Modal>}
                        {action === "envio" ?
                            <Modal isOpen={modal} toggle={toggle.bind(null)}>
                                <ModalHeader toggle={toggle.bind(null)} ><Icon.Check /> Exito</ModalHeader>
                                <ModalBody>
                                    Modificacion Exitosa
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={() => { setModal(false); navigate("/servicios/PanelLicenciasAdmin") }}>
                                        Confirmar
                                    </Button>
                                </ModalFooter>
                            </Modal> : <Modal></Modal>}
                        {action === "ESC" ?
                            <Modal isOpen={modal} toggle={toggle.bind(null)}>
                                <ModalHeader toggle={toggle.bind(null)}><Icon.AlertCircle /> Advertencia</ModalHeader>
                                <ModalBody>
                                    Tiene que realizar cambios
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={() => { setModal(false); }}>
                                        Confirmar
                                    </Button>
                                </ModalFooter>
                            </Modal> : <Modal></Modal>}
                        {action === "vacio" ?
                            <Modal isOpen={modal} toggle={toggle.bind(null)}>
                                <ModalHeader toggle={toggle.bind(null)}><Icon.AlertCircle /> Advertencia</ModalHeader>
                                <ModalBody>
                                    Tiene que realizar cambios
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={() => { setModal(false); }}>
                                        Confirmar
                                    </Button>
                                </ModalFooter>
                            </Modal> : <Modal></Modal>}

                        <Button className="button btn-info w-full" type="submit" onClick={() => { setModal(true); handleSubmit(onSubmit); }}>Guardar cambios del registro</Button>
                    </div>
                </Form>
            </ComponentCard>
        </>
    );
};
export default Editar;