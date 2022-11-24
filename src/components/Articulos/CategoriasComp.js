import { useState, useEffect } from 'react';
import {
    Row, Col, FormGroup, Input, Button, InputGroup,
    InputGroupText, Table,
    Modal, ModalHeader,
    ModalBody,
    ModalFooter, FormFeedback, Alert, Card, CardBody, CardHeader
} from 'reactstrap';
import { push, ref, onValue, update, remove } from 'firebase/database';
import * as Icon from 'react-feather';
import { db } from '../../FirebaseConfig/firebase';
// import ComponentCard from '../ComponentCard';


const CategoriasComp = () => {
    const [arr, setArr] = useState([{ id: 0, name: '', key: "", active: "" }]);
    const fetchDataCategories = () => {
        const arrAux = [];
        let i = 1;
        onValue(ref(db, "categories/"), snapshot => {
            snapshot.forEach(snap => {
                const obj = {
                    id: i,
                    name: snap.val().name,
                    key: snap.key,
                    active: snap.val().active
                }
                arrAux.push(obj);
                i++;
            })
            console.log("arrAux:", arrAux);
            setArr(arrAux);
        });
    }


    const [btnMessage, setBtnMessage] = useState("Agregar");
    const [messageFeedback, setMessageFeedback] = useState("");
    const [isValidInput, setIsValidInput] = useState(true);
    const [keyAux, setKeyAux] = useState("");
    // const [nameUnitBeingDeleted, setNameUnitBeingDeleted] = useState("");
    const [nameUnit, setNameUnit] = useState("");
    const [modal, setModal] = useState(false);
    const [colorAlert, setAlertColor] = useState("success");
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const onDismiss = () => {
        setVisible(false);
    };
    const toggle = () => {
        setModal(!modal);
    };
    const deleteToggleConfirmation = () => {
        console.log("Deleted selected: ", keyAux);
        remove(ref(db, `categories/${keyAux}`));
        setModal(false);
        fetchDataCategories();
    }

    const newUnit = () => {
        if (nameUnit) {
            if (btnMessage === "Guardar Cambios") {
                console.log("btnCllicked for update: ", keyAux);
                update(ref(db, `categories/${keyAux}`), {
                    name: nameUnit
                });
                setBtnMessage("Agregar");
                setKeyAux("");
                setVisible(true);
                setAlertColor("info");
                setMessage("¡Registro actualizado con éxito!");
            } else {
                push(ref(db, 'categories/'), {
                    name: nameUnit,
                    active: "true"
                });
                setVisible(true);
                setAlertColor("success");
                setMessage("¡Registrado con éxito!");
            }
            fetchDataCategories();
            setNameUnit("");
            setIsValidInput(true);

        } else {
            setIsValidInput(false);
            setMessageFeedback("Favor de llenar el campo");
            setVisible(false);
        }
    }
    // const editUnit = (keyDB) => {
    //     console.log("Key of clicked: ", keyDB);
    //     setKeyAux(keyDB);
    //     onValue(ref(db, `categories/${keyDB}`), snapshot => {
    //         //console.log("snapshot from selected for edition:", snapshot.val().name);
    //         setNameUnit(snapshot.val().name);
    //     });
    //     setBtnMessage("Guardar Cambios");
    // }
    // const [checkIcono, setCheckIcono] = useState(0);
    function modifiedActive(dataPib) {
        update(ref(db, `categories/${dataPib.key}`), {
            active: dataPib.active === "true" ? "false" : "true"
        });
        fetchDataCategories();
    }
    useEffect(() => {
        fetchDataCategories();

        console.log(arr);
    }, []);
    return (
        <>
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader>
                            <Row>
                                <Col>
                                    <Button onClick={newUnit} type="submit" className="btn btn-success"><Icon.Plus style={{ marginRight: "0px", verticalAlign: "middle", position: "relative", paddingBottom: "5px" }} />{btnMessage}</Button>
                                </Col>
                                <Col>
                                    <div className='d-flex justify-content-end'>
                                        <h4>Registro Categorías</h4>
                                    </div >
                                </Col>
                            </Row>
                        </CardHeader>
                        {/* <ComponentCard title={<h3>Definir Categorías</h3>}> */}
                        <CardBody>
                            <FormGroup>
                                <Row>
                                    <Alert color={colorAlert} isOpen={visible} toggle={onDismiss.bind(null)}>
                                        {message}
                                    </Alert>
                                    <Col>
                                        <Table responsive style={{ overflow: 'hidden' }}>
                                            <thead className='text-center'>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Activo</th>
                                                    <th>Nombre Categoría</th>
                                                    <th>Detalles</th>
                                                    

                                                </tr>
                                            </thead>
                                            <tbody className='text-center'>
                                                {arr.map((data) => (
                                                    <tr key={data.id}>
                                                        <td>{data.id}</td>
                                                        <td><div onClick={() => { modifiedActive(data) }}>
                                                            {data.active === "true" ? <div><Icon.ToggleRight style={{ color: "#fca311" }} /></div>
                                                                : <div><Icon.ToggleLeft /></div>}
                                                        </div></td>
                                                        <td>{data.name}</td>
                                                        <td>
                                                            
                                                                <div className='d-flex justify-content-center'>
                                                                    {/* <div style={{ cursor: "pointer", color: "#1186a2",marginRight:"7px" }} onClick={() => { editUnit(data.key) }}><Icon.Edit /></div> */}

                                                                    <Button type="submit" style={{ cursor: "pointer", color: "#fc7174", borderColor: "#fc7174", backgroundColor: "transparent", padding: "1.5px", fontSize: "11px", borderWidth: "1.5px" }}>Ver Detalle</Button>
                                                                </div>
                                                            
                                                        </td>
                                                        {/* <td>
                                                            <div>
                                                                <Row>
                                                                </Row>
                                                            </div>
                                                        </td> */}
                                                    </tr>

                                                ))}

                                            </tbody>
                                        </Table>
                                        <Modal isOpen={modal} toggle={toggle.bind(null)}>
                                            <ModalHeader toggle={toggle.bind(null)}><Icon.AlertCircle /> Borrar Categoría</ModalHeader>
                                            <ModalBody>
                                                <FormGroup>
                                                    <InputGroup>
                                                        <InputGroupText>Nombre</InputGroupText>
                                                        <Input placeholder="Nombre" value={nameUnit} invalid={!isValidInput} onChange={(e) => { setNameUnit(e.target.value); setIsValidInput(true); setVisible(false); }} />
                                                        <FormFeedback>{messageFeedback}</FormFeedback>
                                                    </InputGroup>
                                                </FormGroup>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="primary" onClick={() => { deleteToggleConfirmation() }}>
                                                    Confirmar
                                                </Button>
                                                <Button color="secondary" onClick={toggle.bind(null)}>
                                                    Cancelar
                                                </Button>
                                            </ModalFooter>
                                        </Modal>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </CardBody>
                    </Card>
                    {/* </ComponentCard> */}
                </Col>
            </Row>
        </>
    );
};
export default CategoriasComp;
