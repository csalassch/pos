import React, { useState, useEffect } from 'react';
import { Input, InputGroup, InputGroupText, Button, FormGroup, Table, Row, Col, FormFeedback, Alert } from 'reactstrap';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import Form from 'react-validation/build/form';

import { onValue, ref, update } from 'firebase/database';
import * as Icon from 'react-feather';
import { db } from '../../../../FirebaseConfig/firebase';

const Editar = ({ id }) => {
    const { handleSubmit } = useForm();
    const [lista, setLista] = useState([]);
    const [listaAuxComp, setListaAuxComp] = useState([]);
    const [idEliminar, setIdEliminar] = useState(0);
    const [action, setAction] = useState("");
    const [arrayCharacteristics, setArrayCharacteristics] = useState([]);
    const [arrayProducts, setArrayProducts] = useState([]);
    const [Formvalue, setFormvalue] = useState({ nombre: '', descripcion: '', producto: '', monto: 0 });
    const [FormvalueRef, setFormvalueRef] = useState({ nombre: '', descripcion: '', producto: '', monto: 0 });

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

    const handleChange = ({ target: { name, value } }) => {
        setMessageFeedback({ nombre: "", descripcion: "", producto: "", monto: "", caracteristicas: "" });
        setIsValidInput({ nombre: true, descripcion: true, producto: true, monto: true, caracteristicas: true });
        setVisible(false);
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
    const onSubmit = () => {
        let cont = 0;
        if (lista.length === listaAuxComp.length) {
            for (let i = 0; i < lista.length; i++) {
                if (lista[i].caracteristica === listaAuxComp[i].caracteristica) {
                    cont++;
                }
            }
        }
        if (Formvalue.nombre !== FormvalueRef.nombre || Formvalue.descripcion !== FormvalueRef.descripcion || Formvalue.producto !== FormvalueRef.producto || Formvalue.monto !== FormvalueRef.monto || cont !== lista.length) {
            if (Formvalue.nombre !== '' && Formvalue.descripcion !== '' && Formvalue.producto !== '' && Formvalue.monto !== 0) {
                update(ref(db, `licenses/${id}`), {
                    name: Formvalue.nombre,
                    description: Formvalue.descripcion,
                    product: Formvalue.producto,
                    amount: parseFloat(Formvalue.monto),
                    caracteristicas: lista
                });
                setMessageFeedback({ nombre: "", descripcion: "", producto: "", monto: "", caracteristicas: "" });
                setIsValidInput({ nombre: true, descripcion: true, producto: true, monto: true, caracteristicas: true });
                sethiddenSuccess(true);
                setMessage("Se ha modificado con exito");
                setTimeout(() => {
                    sethiddenSuccess(false);
                }, 3000);
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
        else {
            setVisible(true);
            setAlertColor("danger");
            setMessage("No se han realizado cambios");
        }
    }
    useEffect(() => {
        if (lista.length === 0) {
            getDatosLicencia();
            getProductos();
            getCharacteristics();
        }
    }, [])
    return (
        <>
            {hiddenSuccess && <div className='d-flex justify-content-start' style={{ color: "#1186a2", textShadow: "0px 5px 5px rgba(17, 134, 162, 0.3)", marginBottom: "7px" }}>
                <Icon.Check style={{ color: "#1186a2" }} /> {message}</div>}
            <Alert color={colorAlert} isOpen={visible} toggle={onDismiss.bind(null)}>
                {messageFeedback.producto && messageFeedback.caracteristicas ? <div>{messageFeedback.producto} y {messageFeedback.caracteristicas}</div> : <div></div>}
                {messageFeedback.producto && !messageFeedback.caracteristicas ? <div>{messageFeedback.producto} </div> : <div></div>}
                {!messageFeedback.producto && messageFeedback.caracteristicas ? <div>{messageFeedback.caracteristicas}</div> : <div></div>}
                {message !== "" ? message : ""}
            </Alert>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                    <Col>
                        <FormGroup>
                            <InputGroup>
                                <InputGroupText style={{ width: "100px" }}>Nombre *</InputGroupText>
                                <Input onChange={handleChange} invalid={!isValidInput.nombre} value={Formvalue.nombre} type="text" name="nombre" className="form-control" placeholder="Nombre" />
                                <FormFeedback>{messageFeedback.nombre}</FormFeedback>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup>
                                <InputGroupText style={{ width: "100px" }}>Descripción *</InputGroupText>
                                <Input onChange={handleChange} invalid={!isValidInput.descripcion} value={Formvalue.descripcion} type="textarea" rows="5" name="descripcion" className="form-control" placeholder="Descripcion" />
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
                                                value={{ value: Formvalue.producto, label: Formvalue.producto }}
                                                onChange={(e) => {
                                                    setFormvalue({ ...Formvalue, producto: e.value });
                                                    setMessageFeedback({ nombre: "", descripcion: "", producto: "", monto: "", caracteristicas: "" });
                                                    setIsValidInput({ nombre: true, descripcion: true, producto: true, monto: true, caracteristicas: true });
                                                    setVisible(false);
                                                }}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <InputGroup>
                                <InputGroupText style={{ width: "100px" }}>Monto $ *</InputGroupText>
                                <Input onChange={handleChange} invalid={!isValidInput.monto} value={Formvalue.monto} step='any' type="number" name="monto" className="form-control" placeholder="Nombre" />
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
                                                    <InputGroupText style={{ width: "125px", height: "100%" }}>Característica</InputGroupText>
                                                </Col>
                                                <Col className='p-0'>
                                                    <div style={{ width: "100%" }}>
                                                        <Select
                                                            options={arrayCharacteristics}
                                                            style={{ width: 100 }}
                                                            name="caracteristica"
                                                            onChange={(e) => { setFormvalue({ ...Formvalue, caracteristica: e.id }); addLicense(e.value); setFormvalue({ ...Formvalue, caracteristica: '' }); }}
                                                        />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </InputGroup>
                                    </Col>
                                </Row>
                                <div>
                                    <Table className="no-wrap mt-3 align-middle" responsive borderless>
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Característica</th>
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
                                                                    <div style={{ color: "	#d54747", cursor: "pointer" }} onClick={() => { setAction("del"); setIdEliminar(tdata.id); deleteCharacteristic(); console.log(action) }}><Icon.Trash2 /></div>
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
                        </div>
                    </Col>
                </Row>
                <div className='w-full d-flex justify-content-center'>
                    <Button className="button btn-success w-full" type="submit" onClick={() => { handleSubmit(onSubmit); }}>Guardar cambios</Button>
                </div>
            </Form>
        </>
    );
};
export default Editar;