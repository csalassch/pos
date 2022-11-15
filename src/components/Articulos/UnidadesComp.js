import { useState, useEffect } from 'react';

import {
    Row, Col, FormGroup, Input, Button, InputGroup,
    InputGroupText, Table,
    Modal, ModalHeader,
    ModalBody,
    ModalFooter, FormFeedback, Alert

} from 'reactstrap';
import { push, ref, onValue, update, remove } from 'firebase/database';
import * as Icon from 'react-feather';
import { db } from '../../FirebaseConfig/firebase';
import ComponentCard from '../ComponentCard';




const UnidadesComp = () => {

    const [arr, setArr] = useState([{ id: 0, name: '', key: "",active:"" }]);
    const fetchDataUnits = () => {
        const arrAux = [];
        let i = 1;
        onValue(ref(db, "units/"), snapshot => {
            snapshot.forEach(snap => {
                
                const obj = {
                    id: i,
                    name: snap.val().name,
                    key: snap.key,
                    active:snap.val().active
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
        remove(ref(db, `units/${keyAux}`));
        setModal(false);
        fetchDataUnits();
    }


    const newUnit = () => {
        if (nameUnit) {
            if (btnMessage === "Guardar Cambios") {
                console.log("btnCllicked for update: ", keyAux);
                update(ref(db, `units/${keyAux}`), {
                    name: nameUnit
                });
                setBtnMessage("Agregar");
                setKeyAux("");
                setVisible(true);
            setAlertColor("info");
            setMessage("¡Registro actualizado con éxito!");
            } else {

                push(ref(db, 'units/'), {
                    name: nameUnit,
                    active: "true"
                });
                setVisible(true);
            setAlertColor("success");
            setMessage("¡Registrado con éxito!");

            }

            fetchDataUnits();
            setNameUnit("");
            setIsValidInput(true);
            

        } else {
            setIsValidInput(false);
            setMessageFeedback("Favor de no llenar el campo");
            setVisible(false);
        }

    }
    const editUnit = (keyDB) => {
        console.log("Key of clicked: ", keyDB);
        setKeyAux(keyDB);
        onValue(ref(db, `units/${keyDB}`), snapshot => {
            //console.log("snapshot from selected for edition:", snapshot.val().name);
            setNameUnit(snapshot.val().name);
        });
        setBtnMessage("Guardar Cambios");

    }
     function modifiedActive(dataPib) {
        update(ref(db, `units/${dataPib.key}`), {
            active: dataPib.active === "true" ? "false" : "true"
        });
        fetchDataUnits();

    }

    useEffect(() => {
        fetchDataUnits();

        console.log(arr);
    }, []);
    return (
        <>
            <Row>

                <Col md="12">
                    <ComponentCard title="Definir Unidades">

                        <FormGroup>
                            <Row>
                            <Alert color={colorAlert} isOpen={visible} toggle={onDismiss.bind(null)}>
                                        {message}
                                    </Alert>
                                <Col md="4">
                                    
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupText>Nombre</InputGroupText>
                                            <Input placeholder="Nombre" value={nameUnit} invalid={!isValidInput} onChange={(e) => { setNameUnit(e.target.value); setIsValidInput(true);setVisible(false); }} />
                                            <FormFeedback>{messageFeedback}</FormFeedback>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                    </FormGroup>
                                    <Button onClick={newUnit} type="submit" className="btn btn-success">{btnMessage}</Button>

                                </Col>
                                <Col>
                                <Table responsive style={{ overflow: 'hidden' }}>
                                        
                                        <thead className='text-center'>
                                            <tr>
                                                <th>#</th>
                                                <th>Status</th>
                                                <th>Nombre Unidad</th>
                                                <th>Opciones</th>

                                            </tr>
                                        </thead>
                                        <tbody className='text-center'>
                                            {arr.map((data) => (

                                                <tr key={data.id}>

                                                    <td>{data.id}</td>
                                                    <td><div onClick={() => { modifiedActive(data) }}>
                                                        {data.active === "true" ? <div><Icon.ToggleRight style={{ color: "#00b26f" }} /></div>
                                                            : <div><Icon.ToggleLeft /></div>}
                                                    </div></td>
                                                    <td>{data.name}</td>
                                                    <td><div><Row><Col ><div style={{ cursor: "pointer", color: "#317cc1" }} onClick={() => { editUnit(data.key) }}><Icon.Edit /></div></Col>
                                                    </Row></div></td>

                                                </tr>


                                            ))}


                                        </tbody>
                                        
                                    </Table>

                                    <Modal isOpen={modal} toggle={toggle.bind(null)}>
                                        <ModalHeader toggle={toggle.bind(null)}><Icon.AlertCircle /> Borrar Unidad</ModalHeader>
                                        <ModalBody>
                                            ¿Seguro que quieres eliminar: ?
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
                    </ComponentCard>
                </Col>
            </Row>
        </>
    );
};

export default UnidadesComp;
