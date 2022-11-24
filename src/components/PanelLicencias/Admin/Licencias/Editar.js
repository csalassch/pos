import React, { useState, useEffect } from 'react';
import { Input, InputGroup, InputGroupText, Button, FormGroup, Table, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import Select from 'react-select';
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
    const [listaAuxComp, setListaAuxComp] = useState([]);
    const [idEliminar, setIdEliminar] = useState(0);
    const [action, setAction] = useState("");
    const [arrayCharacteristics, setArrayCharacteristics] = useState([]);
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
    function existCharacteristic(parametro){
        for (let i = 0; i < lista.length; i++) {
            if(lista[i].caracteristica === parametro){
                return false;
            }            
        }
        return true;
    }
    function addLicense(caract) {
        if(existCharacteristic(caract)){
            if (caract !== '') {
                const listAux = lista;
                listAux.push({ id: (lista.length + 1), caracteristica: caract });
                setLista(listAux);
            }
        }
    }
    function getCaracteristicasLicencia() {
        onValue(ref(db, `licenses/${id}`), snapshot => {
            const licencia = {
                id: snapshot.key,
                caracteristicas: snapshot.val().caracteristicas
            }
            setLista(licencia.caracteristicas);
            setListaAuxComp(licencia.caracteristicas);
        });
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
        getCaracteristicasLicencia();
    }
    const getCharacteristics = () => {
        const arr = [];
        onValue(ref(db, "modules/"), snapshot => {
            snapshot.forEach(snap => {
                if (snap.val().active === "true") {
                    const obj = {
                        id: snap.key,
                        value: snap.val().name,
                        label: snap.val().name,
                        module: snap.val().name
                    }
                    arr.push(obj);
                }
            })
            setArrayCharacteristics(arr);
        });
    }
    function isEquals(a, b) {
        console.log(a.join() === b.join())
        return a.join() === b.join();
    }
    const onSubmit = () => {
        const A = listaAuxComp;
        const B = lista;
        if (lista.length !== 0) {
            if (Formvalue !== FormvalueRef) {
                if (!isEquals(A, B)) {
                    console.log(Formvalue, " ", FormvalueRef)
                    if (Formvalue.nombre !== '' && Formvalue.descripcion !== '' && Formvalue.producto !== '' && Formvalue.monto !== '') {
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
            } else {
                setAction("SC")
            }
        } else {
            setAction("SC")
        }
    }
    useEffect(() => {
        if (lista.length === 0) {
            getDatosLicencia()
            getCharacteristics()
        }
    }, [])
    return (
        <>
            <ComponentCard title="Edite los datos de la licencia">
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
                                    {/* <InputGroup>
                                        <InputGroupText>Nueva Caracteristica *</InputGroupText>
                                        <Input onChange={handleChangeList} type="text" name="caracteristica" value={caracteristica} className="form-control" placeholder="Caracteristica" />
                                    </InputGroup> */}
                                    <InputGroup >
                                            <InputGroupText style={{ width: "102px" }}>Caraterística</InputGroupText>
                                            <div style={{ width: "230px" }}>
                                                <Select
                                                    options={arrayCharacteristics}
                                                    style={{ width: 100 }}
                                                    name="caracteristica"
                                                    onChange={(e) => { setFormvalue({ ...Formvalue, caracteristica: e.id });addLicense(e.value);setFormvalue({ ...Formvalue, caracteristica: '' });}}
                                                />
                                            </div>
                                        </InputGroup>
                                </div>
                            </div>

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
                            </div>
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
                        {action === "SC" ?
                            <Modal isOpen={modal} toggle={toggle.bind(null)}>
                                <ModalHeader toggle={toggle.bind(null)}><Icon.AlertCircle /> Advertencia</ModalHeader>
                                <ModalBody>
                                    Tiene que tener al menos una caracteristica
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