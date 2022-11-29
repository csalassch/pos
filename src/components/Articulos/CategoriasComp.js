import { useState, useEffect } from 'react';
import {
    Row, Col, FormGroup, Input, Button, InputGroup,
    InputGroupText, Table,
    Modal, ModalHeader,
    ModalBody,
    ModalFooter, FormFeedback, Alert, Card, CardBody, CardHeader, Form
} from 'reactstrap';
import { ref as refStorage, uploadBytesResumable } from 'firebase/storage';
import Papa from "papaparse";

import { push, ref, onValue, update } from 'firebase/database';
import * as Icon from 'react-feather';
import { db, dbStorage } from '../../FirebaseConfig/firebase';
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


    const [btnMessage, setBtnMessage] = useState("");
    const [messageFeedback, setMessageFeedback] = useState("");
    const [isValidInput, setIsValidInput] = useState(true);
    const [keyAux, setKeyAux] = useState("");
    // const [nameUnitBeingDeleted, setNameUnitBeingDeleted] = useState("");
    const [nameUnit, setNameUnit] = useState("");
    const [modal, setModal] = useState(false);
    const [modalCsv, setModalCsv] = useState(false);
    const [colorAlert, setAlertColor] = useState("success");
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [hiddenSuccess, sethiddenSuccess] = useState(false);
    const onDismiss = () => {
        setVisible(false);
    };

    // const deleteToggleConfirmation = () => {
    //     console.log("Deleted selected: ", keyAux);
    //     remove(ref(db, `categories/${keyAux}`));
    //     setModal(false);
    //     fetchDataCategories();
    // }

    const newUnit = () => {
        if (nameUnit) {
            if (btnMessage === "Guardar Cambios") {
                console.log("btnCllicked for update: ", keyAux);
                update(ref(db, `categories/${keyAux}`), {
                    name: nameUnit
                });
                setBtnMessage("");
                setKeyAux("");
                setVisible(true);
                setAlertColor("info");
                setMessage("¡Registro actualizado con éxito!");
            } else {
                push(ref(db, 'categories/'), {
                    name: nameUnit,
                    active: "true"
                });
                // setVisible(true);
                // setAlertColor("success");
                // setMessage("¡Registrado con éxito!");
                sethiddenSuccess(true);
                setMessage("¡Registrado con éxito!");
                setTimeout(() => {
                    sethiddenSuccess(false);
                }, 3000);
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
    //For uploading categories csv
    const [file, setFile] = useState('');
    const [data2, setData2] = useState([]);
    // const [file, setFile] = useState("");
    async function readCsv(){
        const reader = new FileReader();
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: true,encoding: "ISO-8859-1"});
            const parsedData = csv?.data;
            console.log("dataaaa subida: ",parsedData);
            const objDataCsv=[];
            for(let i=0;i<parsedData.length;i++){

                objDataCsv.push(parsedData[i].Nombre);
            }
            // const columns = Object.keys(parsedData[0]);
            setData2(objDataCsv);
        }
        reader.readAsText(file,'ISO-8859-1');

    }
    const insertCsvCategories = () => {
        if(data2.length>0){
            console.log("aqui mero: ",data2.length)
            data2.forEach((element)=>{
                console.log("element: ",element);
                if(element!==''){
                    push(ref(db, 'categories/'), {
                            name: element,
                            active: true
                        });
    
                }
            });
            setData2([]);
        }
        
        // push(ref(db, 'categories/'), {
        //     name: nameUnit,
        //     active: "true"
        // });

    }
    const upload = () => {
        if (file == null)
            return;
        console.log(file.name);
        const allowedExtensions = /(\.csv)$/i;
        if (!allowedExtensions.exec(file.name)) {
            setVisible(true);
            setAlertColor("danger");
            setMessage("Error! favor de seleccionar archivos .CSV");
        } else {
            const storageRef = refStorage(dbStorage, `/Categorias/${file.name}`);
            uploadBytesResumable(storageRef, file);
            setAlertColor("success");
            setVisible(true);
            setMessage("Archivo subido con éxito");
            readCsv().then(()=>{

                insertCsvCategories();
            });
        }
    }
    
    useEffect(() => {
        fetchDataCategories();

        console.log(arr);
        if(data2.length>0){

            insertCsvCategories();
        }
    }, [data2]);
    return (
        <>
            <Row>
                <Col md="12">
                    <Card>
                        <CardHeader style={{ backgroundColor: "#eef0f2" }}>
                            <Row>
                                <Col>
                                    {/* <Button onClick={newUnit} type="submit" className="btn btn-success"><Icon.Plus style={{ marginRight: "0px", verticalAlign: "middle", position: "relative" }} />{btnMessage}</Button> */}
                                    <h4 style={{ color: "#1186a2" }}>Registro Categorías</h4>
                                </Col>
                                <Col>
                                    <div className='d-flex justify-content-end'>
                                        <Button className='btn btn-icon' onClick={() => { setModal(true) }} type="button" style={{ marginRight: "7px" }}><Icon.Plus style={{ marginRight: "0px", verticalAlign: "middle", position: "relative" }} />{btnMessage}</Button>
                                        <Button className='btn btn-icon' onClick={() => { setModalCsv(true) }} type="button"><Icon.FilePlus style={{ marginRight: "0px", verticalAlign: "middle", position: "relative" }} />{btnMessage}</Button>
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
                                            <thead className='text-center' style={{ color: "#1f4f67" }}>
                                                <tr>
                                                    <th>ID</th>
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
                                                            {data.active === "true" || data.active ? <div><Icon.ToggleRight style={{ color: "#fca311" }} /></div>
                                                                : <div><Icon.ToggleLeft /></div>}
                                                        </div></td>
                                                        <td>{data.name}</td>
                                                        <td>

                                                            <div className='d-flex justify-content-center'>
                                                                {/* <div style={{ cursor: "pointer", color: "#1186a2",marginRight:"7px" }} onClick={() => { editUnit(data.key) }}><Icon.Edit /></div> */}

                                                                <Button color='secondary' type="submit" style={{ fontSize: "11px", border: "none" }}><Icon.Info style={{ maxWidth: "18px" }} /></Button>
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
                                        <Modal isOpen={modal} toggle={() => setModal(false)}>
                                            <ModalHeader toggle={() => setModal(false)} style={{ color: "#1186a2" }}><Icon.PlusCircle /> Agregar Categoría</ModalHeader>
                                            <ModalBody>
                                                {hiddenSuccess && <div className='d-flex justify-content-start' style={{ color: "#1186a2", textShadow: "0px 5px 5px rgba(17, 134, 162, 0.3)", marginBottom: "7px" }}><Icon.Check style={{ color: "#1186a2" }} /> {message}</div>}

                                                <FormGroup>
                                                    <InputGroup>

                                                        <InputGroupText>Nombre</InputGroupText>
                                                        <Input placeholder="Nombre" value={nameUnit} invalid={!isValidInput} onChange={(e) => { setNameUnit(e.target.value); setIsValidInput(true); setVisible(false); sethiddenSuccess(false) }} />
                                                        <FormFeedback>{messageFeedback}</FormFeedback>

                                                    </InputGroup>
                                                </FormGroup>
                                            </ModalBody>
                                            <ModalFooter>

                                                <Button color="success" onClick={newUnit}>
                                                    Agregar
                                                </Button>
                                                <Button color="secondary" onClick={() => { setModal(false); setNameUnit("") }}>
                                                    Cancelar
                                                </Button>
                                            </ModalFooter>
                                        </Modal>
                                        <Modal isOpen={modalCsv} toggle={() => setModalCsv(false)}>
                                            <ModalHeader toggle={() => setModalCsv(false)} style={{ color: "#1186a2" }}><Icon.PlusCircle /> Cargar Categorías por .CSV</ModalHeader>
                                            <ModalBody>
                                                {hiddenSuccess && <div className='d-flex justify-content-start' style={{ color: "#1186a2", textShadow: "0px 5px 5px rgba(17, 134, 162, 0.3)", marginBottom: "7px" }}><Icon.Check style={{ color: "#1186a2" }} /> {message}</div>}

                                                <Form>
                                                    <FormGroup>
                                                        {/* <Label htmlFor="exampleFile">Carga Masiva por .CSV</Label> */}
                                                        <Input type="file" placeholder='selecciona archivo' onChange={(e) => { setFile(e.target.files[0]); }} />
                                                    </FormGroup>
                                                </Form>
                                                <div style={{ marginTop: "3rem" }}>
                                                    { data2}
                                                </div>
                                            </ModalBody>
                                            <ModalFooter>

                                                <Button color="success" onClick={upload}>
                                                    Agregar
                                                </Button>
                                                <Button color="secondary" onClick={() => { setModalCsv(false); }}>
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
