import React, { useState, useEffect } from 'react';
import { Input, InputGroup, InputGroupText, Button, FormGroup, Table, Row, Col, FormFeedback, Alert } from 'reactstrap';
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
    const [Formvalue, setFormvalue] = useState({ nombre: '', descripcion: '', producto: '', monto: 0, caracteristica: '' });
    //Para el control de alertas o mensajes de errores
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);
    const onDismiss = () => {
        setVisible(false);
    };
    const [colorAlert, setAlertColor] = useState("success");
    const [hiddenSuccess, sethiddenSuccess] = useState(false);
    const [isValidInput, setIsValidInput] = useState({ nombre: true, descripcion: true, producto: true, monto: true, caracteristicas: true });
    const [messageFeedback, setMessageFeedback] = useState({ nombre: "", descripcion: "", producto: "", monto: "", caracteristicas: "" });

    const onSubmit = () => {
        console.log(Formvalue)
        console.log(lista)
        if (Formvalue.nombre !== '' && Formvalue.descripcion !== '' && Formvalue.producto !== '' && Formvalue.monto !== 0 && lista.length !== 0) {
            push(ref(db, 'licenses/'), {
                name: Formvalue.nombre,
                description: Formvalue.descripcion,
                product: Formvalue.producto,
                amount: Formvalue.monto,
                caracteristicas: lista,
                active: true
            });
            setAction("envio")
            setLista([])
            setFormvalue({ nombre: '', descripcion: '', producto: '', monto: 0, caracteristica: '' });
            setMessageFeedback({ nombre: "", descripcion: "", producto: "", monto: "", caracteristicas: "" });
            setIsValidInput({ nombre: true, descripcion: true, producto: true, monto: true, caracteristicas: true });
            sethiddenSuccess(true);
            setMessage("Se ha cargado con exito");
            setTimeout(() => {
                sethiddenSuccess(false);
            }, 3000);
            setAction("")
        }
        else {
            const objMessages = { nombre: "", descripcion: "", producto: "", monto: "", caracteristicas: "" };
            const objValidInput = { nombre: true, descripcion: true, producto: true, monto: true, caracteristicas: true };
            if (Formvalue.nombre === "") {
                objMessages.nombre = "Favor de llenar el campo";
                objValidInput.nombre = false;
            }
            if (Formvalue.descripcion === "") {
                objMessages.descripcion = "Favor de llenar el campo";
                objValidInput.descripcion = false;
            }
            if (Formvalue.producto === "") {
                setVisible(true);
                setAlertColor("danger");
                objMessages.producto = "Favor de seleccionar un producto";
            }
            if (Formvalue.monto === 0 || Formvalue.monto <= 0) {
                objMessages.monto = "Coloque un monto correcta";
                objValidInput.monto = false;
            }
            if (lista.length === 0) {
                setVisible(true);
                setAlertColor("danger");
                objMessages.caracteristicas = "Seleccione al menos una caracteristica";
            }
            setIsValidInput(objValidInput);
            setMessageFeedback(objMessages);
        }
    }
    const handleChange = ({ target: { name, value } }) => {
        setMessageFeedback({ nombre: "", descripcion: "", producto: "", monto: "", caracteristicas: "" });
        setIsValidInput({ nombre: true, descripcion: true, producto: true, monto: true, caracteristicas: true });
        setVisible(false);
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
        setMessageFeedback({ nombre: "", descripcion: "", producto: "", monto: "", caracteristicas: "" });
        setIsValidInput({ nombre: true, descripcion: true, producto: true, monto: true, caracteristicas: true });
        setVisible(false);
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
                if (snap.val().active === true) {
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
                if (snap.val().active === true) {
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
    }, [ lista])
    return (
        <>
            {hiddenSuccess && <div className='d-flex justify-content-start' style={{ color: "#1186a2", textShadow: "0px 5px 5px rgba(17, 134, 162, 0.3)", marginBottom: "7px" }}>
                <Icon.Check style={{ color: "#1186a2" }} /> {message}</div>}
            <Alert color={colorAlert} isOpen={visible} toggle={onDismiss.bind(null)}>
                {messageFeedback.producto && messageFeedback.caracteristicas ? <div>{messageFeedback.producto} y {messageFeedback.caracteristicas}</div> : <div></div>}
                {messageFeedback.producto && !messageFeedback.caracteristicas ? <div>{messageFeedback.producto} </div> : <div></div>}
                {!messageFeedback.producto && messageFeedback.caracteristicas ? <div>{messageFeedback.caracteristicas}</div> : <div></div>}
            </Alert>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col>
                        <FormGroup>
                            <InputGroup>
                                <InputGroupText style={{ width: "100px" }}>Nombre *</InputGroupText>
                                <Input onChange={handleChange} invalid={!isValidInput.nombre} type="text" name="nombre" className="form-control" placeholder="Nombre" value={action === "envio" ? "" : Formvalue.nombre} />
                                <FormFeedback>{messageFeedback.nombre}</FormFeedback>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup>
                                <InputGroupText style={{ width: "100px" }}>Descripción *</InputGroupText>
                                <Input onChange={handleChange} invalid={!isValidInput.descripcion} type="textarea" rows="5" name="descripcion" className="form-control" placeholder="Descripción" value={action === "envio" ? "" : Formvalue.descripcion} />
                                <FormFeedback>{messageFeedback.descripcion}</FormFeedback>
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
                                                onChange={(e) => {
                                                    setFormvalue({ ...Formvalue, producto: e.value });
                                                    setMessageFeedback({ nombre: "", descripcion: "", producto: "", monto: "", caracteristicas: "" });
                                                    setIsValidInput({ nombre: true, descripcion: true, producto: true, monto: true, caracteristicas: true });
                                                    setVisible(false);; console.log(Formvalue)
                                                }}
                                                value={action === "envio" ? "" : {label:Formvalue.producto, value:Formvalue.producto}}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup>
                                <InputGroupText style={{ width: "100px" }}>Monto $ *</InputGroupText>
                                <Input onChange={handleChange} invalid={!isValidInput.monto} step='any' type="number" name="monto" className="form-control" placeholder="Nombre" value={action === "envio" ? "" : Formvalue.monto} />
                                <FormFeedback>{messageFeedback.monto}</FormFeedback>
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
                                                            value={action === "envio" ? "" : {label:Formvalue.caracteristica, value:Formvalue.caracteristica}}
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
                                                                <div style={{ color: "	#d54747", cursor: "pointer" }} onClick={() => { setIdEliminar(tdata.id); deleteCharacteristic() }}><Icon.Trash2 /></div>
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
                    </Col>
                </Row>
                <div className='w-full d-flex justify-content-center'>
                    <Button className="button btn-success" type="submit" onClick={() => { handleSubmit(onSubmit); }}>Guardar registro</Button>
                </div>
            </Form>
        </>
    );
};
export default Alta;