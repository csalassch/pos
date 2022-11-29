import React, { useState, useEffect } from 'react';
import { Input, InputGroup, InputGroupText, Button, FormGroup, Table, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import Form from 'react-validation/build/form';

import { ref, push, onValue } from 'firebase/database';
import * as Icon from 'react-feather';
import { db } from '../../../../FirebaseConfig/firebase';

const Alta = () => {
    const { handleSubmit } = useForm();
    const [lista, setLista] = useState([]);
    const [idEliminar, setIdEliminar] = useState(0);
    const [action, setAction] = useState("");
    const [arrayProducts, setArrayProducts] = useState([]);
    const [arrayCharacteristics, setArrayCharacteristics] = useState([]);
    const [Formvalue, setFormvalue] = useState({ nombre: '', descripcion: '', producto: '', monto: '', caracteristica: '' });
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
    };
    const onSubmit = () => {
        console.log(Formvalue)
        console.log(lista)
        if (Formvalue.nombre !== '' && Formvalue.descripcion !== '' && Formvalue.producto !== '' && Formvalue.monto !== '' && lista.length !== 0) {
            push(ref(db, 'licenses/'), {
                name: Formvalue.nombre,
                description: Formvalue.descripcion,
                product: Formvalue.producto,
                amount: Formvalue.monto,
                caracteristicas: lista,
                active: "true"
            });
            setLista([])
            setFormvalue({ nombre: '', descripcion: '', producto: '', monto: '', caracteristica: '' });
            setAction("envio");
        }
        else {
            setAction("vacio");
        }
    }
    const handleChange = ({ target: { name, value } }) => {
        setFormvalue({ ...Formvalue, [name]: value });
    };
    function deleteCharacteristic() {
        const listaF = lista;
        const listaAux = []
        const listaFiltrada = listaF.filter((item) => item.id !== (idEliminar));
        for (let i = 0; i < listaFiltrada.length; i++) {
            listaAux.push({ id: (i + 1), caracteristica: listaFiltrada[i].caracteristica });
        }
        setLista(listaAux)
    }
    function existCharacteristic(parametro) {
        for (let i = 0; i < lista.length; i++) {
            if (lista[i].caracteristica === parametro) {
                return false;
            }
        }
        return true;
    }
    function addLicense(caract) {
        if (existCharacteristic(caract)) {
            if (caract !== '') {
                const listAux = lista;
                listAux.push({ id: (lista.length + 1), caracteristica: caract });
                setLista(listAux);
            }
        }
    }
    const getProductos = () => {
        const arr = [];
        onValue(ref(db, "products/"), snapshot => {
            snapshot.forEach(snap => {
                if (snap.val().active === "true") {
                    const obj = {
                        id: snap.key,
                        value: snap.val().name,
                        label: snap.val().name,
                        product: snap.val().name
                    }
                    arr.push(obj);
                }
            })
            setArrayProducts(arr);
        });
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
    useEffect(() => {
        getProductos();
        getCharacteristics();
    }, [Formvalue, lista])
    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col>
                        <FormGroup>
                            <InputGroup>
                                <InputGroupText style={{ width: "100px" }}>Nombre *</InputGroupText>
                                <Input onChange={handleChange} type="text" name="nombre" className="form-control" placeholder="Nombre" value={action === "envio" ? "" : Formvalue.nombre} />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup>
                                <InputGroupText style={{ width: "100px" }}>Descripción *</InputGroupText>
                                <Input onChange={handleChange} type="textarea" rows="5" name="descripcion" className="form-control" placeholder="Descripción" value={action === "envio" ? "" : Formvalue.descripcion}/>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup >
                                <Row style={{ width: "100%", marginRight: 0, marginLeft: 0 }}>
                                    <Col md="3" className='p-0'>
                                        <InputGroupText style={{ width: "100px", height: "100%" }}>Producto</InputGroupText>
                                    </Col>
                                    <Col className='p-0'>
                                        <div style={{ width: "100%" }}>
                                            <Select
                                                options={arrayProducts}
                                                style={{ width: 100 }}
                                                name="producto"
                                                onChange={(e) => { setFormvalue({ ...Formvalue, producto: e.value }); console.log(Formvalue)}}
                                                // value={action === "envio" ? "" : Formvalue.descripcion}
                                            
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup>
                                <InputGroupText style={{ width: "100px" }}>Monto $ *</InputGroupText>
                                <Input onChange={handleChange} step='any' type="number" name="monto" className="form-control" placeholder="Nombre" value={action === "envio" ? "" : Formvalue.monto}/>
                            </InputGroup>
                        </FormGroup>
                    </Col>
                    <Col>
                        <div className='h-full'>
                            <div style={{ "min-height": "300px" }} >
                                <Row>
                                    <Col>
                                        <InputGroup >
                                            <Row style={{ width: "100%", marginRight: 0, marginLeft: 0 }}>
                                                <Col md="4" className='p-0'>
                                                    <InputGroupText style={{ width: "125px", height: "100%" }}>Caracteristica</InputGroupText>
                                                </Col>
                                                <Col className='p-0'>
                                                    <div style={{ width: "100%" }}>
                                                        <Select
                                                            options={arrayCharacteristics}
                                                            style={{ width: 100 }}
                                                            name="caracteristica"
                                                            onChange={(e) => { setFormvalue({ ...Formvalue, caracteristica: e.id }); addLicense(e.value); setFormvalue({ ...Formvalue, caracteristica: '' }); }}
                                                            // value={action === "envio" ? "" : Formvalue.caracteristica}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <Table className="no-wrap mt-3 align-middle" responsive borderless style={{ "max-height": "300px" }}>
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
                                    </Modal> :
                                    <Modal isOpen={modal} toggle={toggle.bind(null)}>
                                        {action === "vacio" ?
                                            <ModalHeader toggle={toggle.bind(null)}><Icon.AlertCircle /> Accion necesaria</ModalHeader> :
                                            <ModalHeader toggle={toggle.bind(null)}><Icon.Check /> Exito</ModalHeader>}
                                        {action === "vacio" ?
                                            <ModalBody>
                                                Debe llenar todos los campos
                                            </ModalBody> :
                                            <ModalBody>
                                                Se ha realizado correctamente el registro
                                            </ModalBody>
                                        }
                                        <ModalFooter>
                                            <Button color="primary" onClick={() => { setModal(false); setFormvalue({}); setAction(""); }}>
                                                Confirmar
                                            </Button>
                                        </ModalFooter>
                                    </Modal>
                                }
                            </div>
                        </div>
                    </Col>
                </Row>
                <div className='w-full d-flex justify-content-center'>
                    <Button className="button btn-success" type="submit" onClick={() => { setModal(true); handleSubmit(onSubmit); }}>Guardar registro</Button>
                </div>
            </Form>
        </>
    );
};
export default Alta;