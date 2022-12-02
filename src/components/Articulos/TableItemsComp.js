
import { useEffect, useState } from 'react';

import * as Icon from 'react-feather';
// import { Link } from 'react-router-dom';
import { Table, Modal, ModalHeader, Alert, ModalBody, ModalFooter, Button, Row, Col, Card, CardBody, CardHeader, Form, Input, FormGroup,Collapse,InputGroup,InputGroupText } from 'reactstrap';
import { ref as refStorage, uploadBytesResumable } from 'firebase/storage';

import { onValue, ref, update, push } from 'firebase/database';
import Papa from "papaparse";
import { useTranslation } from 'react-i18next';
import { db, dbStorage } from '../../FirebaseConfig/firebase';
import MultiSteps from './MultiSteps';




const TableItemsComp = () => {
    const { t } = useTranslation();

    const [modal, setModal] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [lista, setLista] = useState([{ id: '', nombre: '', urlImage: '', sku: '', precio: 0, active: false }]);
    const [modalCsv, setModalCsv] = useState(false);
    const [hiddenSuccessUpload, sethiddenSuccessUpload] = useState(false);
    const [colorAlert, setAlertColor] = useState("success");
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const onDismiss = () => {
        setVisible(false);
    };
    //For uploading categories csv
    const [file, setFile] = useState('');
    const [data2, setData2] = useState([]);
    async function readCsv() {
        const reader = new FileReader();
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: true, encoding: "ISO-8859-1" });
            const parsedData = csv?.data;
            const objDataCsv = [];
            for (let i = 0; i < parsedData.length; i++) {
                objDataCsv.push(parsedData[i].Nombre);
            }
            setData2(objDataCsv);
        }
        reader.readAsText(file, 'ISO-8859-1');
    }
    const insertCsvCategories = () => {
        if (data2.length > 0) {
            console.log("aqui mero: ", data2.length)
            data2.forEach((element) => {
                console.log("element: ", element);
                if (element !== '') {
                    push(ref(db, 'items/'), {
                        name: element,
                        active: true
                    });
                }
            });
            sethiddenSuccessUpload(true);
            setMessage("¡Registrado con éxito!");
            document.getElementById("fileInput").value = null;
            setTimeout(() => {
                sethiddenSuccessUpload(false);
            }, 3000);
            setData2([]);
        }
    }
    const upload = () => {
        if (file == null) {
            setVisible(true);
            setAlertColor("danger");
            setMessage("Error! favor de seleccionar archivos .CSV");
            return;
        }
        console.log(file.name);
        const allowedExtensions = /(\.csv)$/i;
        if (!allowedExtensions.exec(file.name)) {
            setVisible(true);
            setAlertColor("danger");
            setMessage("Error! favor de seleccionar archivos .CSV");
        } else {
            const storageRef = refStorage(dbStorage, `/Categorias/${file.name}`);
            uploadBytesResumable(storageRef, file);
            readCsv().then(() => {
                insertCsvCategories();
            });
        }
    }
    const downloadTemplate = () => {
        const strEsp = "[Escribe a partir de aquí]";
        const encoded = new TextEncoder('utf-8', { NONSTANDARD_allowLegacyEncoding: true });
        const decoded = (new TextDecoder('utf-8').decode(encoded.encode(strEsp)));
        console.log(decoded);
        const CSV = [
            '"Nombre"',
            decoded
        ].join('\n');
        window.URL = window.webkitURL || window.URL;
        const contentType = 'text/csv';
        const csvFile = new Blob([CSV], { type: contentType });
        const a = document.createElement('a');
        a.download = 'Plantilla_Articulos_FreePOS.csv';
        a.href = window.URL.createObjectURL(csvFile);
        a.textContent = 'Download CSV';
        a.dataset.downloadurl = [contentType, a.download, a.href].join(':');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }

    async function getDatosProductos() {
        const listaProductos = [];
        onValue(ref(db, "items/"), snapshot => {
            snapshot.forEach(snap => {
                console.log(snap.val().idImage);
                let urlImage = "";
                onValue(ref(db, `files/${snap.val().idImage}`), snapshotFiles => {
                    urlImage = snapshotFiles.val().url;
                    const producto = {
                        id: snap.key,
                        nombre: snap.val().name,
                        urlImage: urlImage,
                        sku: snap.val().sku,
                        precio: snap.val().price,
                        active: snap.val().active
                    }
                    listaProductos.push(producto);
                    setLista(listaProductos);
                    console.log("List Prod: ", lista);
                });

                // console.log("List Prod: ",listaProductos);
                // setLista(listaProductos);
            })
        });
    }
    function modifiedActive(data) {
        update(ref(db, `items/${data.id}`), {
            active: data.active === "true" ? "false" : "true"
        });
        getDatosProductos();
    }
    useEffect(() => {


        if (lista.length <= 1) {

            getDatosProductos().then(() => {

                console.log("Listaa tuned: ", lista);
            });
        }
        if (data2.length > 0) {
            insertCsvCategories();
        }




    }, [lista, data2])
    return (
        <Row>
            <Col>
                <Card>
                    <CardHeader style={{ backgroundColor: "#eef0f2" }}>
                        <Row>
                            <Col>
                                {/* <Button onClick={newUnit} type="submit" className="btn btn-success"><Icon.Plus style={{ marginRight: "0px", verticalAlign: "middle", position: "relative" }} />{btnMessage}</Button> */}
                                <h4 style={{ color: "#1186a2" }}>{t('items_headings')}</h4>
                            </Col>
                            <Col>
                                <div className='d-flex justify-content-end'>
                                    <Button title={t('addItem_modal')} className='btn btn-icon' onClick={() => { setModal(true) }} type="button" style={{ marginRight: "7px" }}><Icon.Plus style={{ marginRight: "0px", verticalAlign: "middle", position: "relative" }} /></Button>
                                    <Button title={t('upload_hover')} className='btn btn-icon' onClick={() => { setModalCsv(true) }} type="button"><Icon.Upload style={{ marginRight: "0px", verticalAlign: "middle", position: "relative" }} /></Button>
                                    <Button title={t('downloadTemplate_hover')} className='btn btn-icon' onClick={downloadTemplate} type="button" style={{ marginLeft: "7px" }}><Icon.FileText style={{ marginRight: "0px", verticalAlign: "middle", position: "relative" }} /></Button>
                                </div >
                            </Col>
                        </Row>
                    </CardHeader>
                    <CardBody>
                        <div>
                            <Row>
                                <Col>
                                    <Button title="Filtros" onClick={()=>{setShowFilters(!showFilters)}}  className='btn btn-icon' type="button" style={{ marginRight: "7px" }}><Icon.Filter style={{ marginRight: "0px", verticalAlign: "middle", position: "relative" }} /> {t('filters_btn')}</Button>

                                </Col>
                                <Collapse isOpen={showFilters} style={{marginTop:"10px"}}>
                                    <Row style={{ marginBottom: "10px" }}>
                                        <Col md="6">
                                            <InputGroup>
                                                <InputGroupText style={{ minWidth: "80px" }}>Nombre</InputGroupText>
                                                <Input placeholder="Nombre" />
                                            </InputGroup>
                                        </Col>
                                        <Col md="6">
                                            <InputGroup>
                                                <InputGroupText style={{ minWidth: "80px", display: "flex", justifyContent: "center" }}>SKU</InputGroupText>
                                                <Input placeholder="UGG-BB-PUR-06" />
                                            </InputGroup>
                                        </Col>

                                    </Row>
                                    <Row>

                                        <Col md="6">
                                            <InputGroup>

                                                <InputGroupText className='text-center' style={{ minWidth: "83px", textAlign: "center", margin: "auto", display: "flex", justifyContent: "center" }}>$</InputGroupText>
                                                <Input type='number' step='any' placeholder="Precio" />
                                            </InputGroup>
                                        </Col>
                                        <Col>
                                            <div className='d-flex justify-content-end'>

                                                <Button type="submit" className="btn btn-success">Aplicar</Button>
                                            </div>
                                            {/* <Icon.Plus className='btn btn-icon' style={{ marginRight: "0px", verticalAlign: "middle", position: "relative" }} /> */}

                                        </Col>
                                    </Row>
                                    
                                </Collapse>
                            </Row>

                            {/* <br /> */}
                            {/* <div className='w-full d-flex justify-content-start m-6'>
                                <div style={{ cursor: "pointer" }} className="d-flex justify-content-center" onClick={getDatosProductos}>
                                    <Icon.RefreshCw style={{ marginRight: "5px" }} />
                                    <p> Recargar</p>
                                </div>
                            </div> */}
                            <Table className="no-wrap mt-3 align-middle" responsive borderless >
                                <thead>
                                    <tr>
                                        <th className='text-center'>{t('active_headings')}</th>
                                        <th className='text-center'>{t('imagen_headings')}</th>
                                        <th>{t('name_headings')}</th>
                                        <th>SKU</th>
                                        <th>{t('salePrice_headings')}</th>
                                        <th>{t('purchasePrice_headings')}</th>
                                        <th className='text-center'>{t('details_headings')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lista.map((tdata) => (
                                        <tr key={tdata.id} className="border-top">
                                            <td><div className='d-flex justify-content-center' onClick={() => { modifiedActive(tdata) }}>
                                                {tdata.active ? <div><Icon.ToggleRight style={{ color: "#fca311" }} /></div>
                                                    : <div><Icon.ToggleLeft style={{ color: "#67757C" }} /></div>}
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
                                            <td>$ {tdata.precio}</td>
                                            <td>
                                                <div className='d-flex justify-content-center'>
                                                    <Button color='secondary' type="submit" style={{ fontSize: "11px", border: "none" }}><Icon.Info style={{ maxWidth: "18px" }} /></Button>


                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <Modal className='modal-lg' isOpen={modal} toggle={() => { setModal(false) }}>
                                <ModalHeader style={{ color: "#1186a2" }} toggle={() => { setModal(false) }} ><Icon.PlusCircle style={{ marginRight: "7px" }} /> {t('addItem_modal')}</ModalHeader>
                                <ModalBody>
                                    <div className="stepsWrapper">
                                        <MultiSteps />
                                    </div>
                                </ModalBody>
                                <ModalFooter>

                                    <Button color="secondary" onClick={() => { setModal(false) }}>
                                        Cancelar
                                    </Button>
                                </ModalFooter>
                            </Modal>
                            <Modal isOpen={modalCsv} toggle={() => setModalCsv(false)}>
                                <ModalHeader toggle={() => setModalCsv(false)} style={{ color: "#1186a2" }}><Icon.PlusCircle />{t('uploadItems_headings')}</ModalHeader>
                                <ModalBody>
                                    {hiddenSuccessUpload && <div className='d-flex justify-content-start' style={{ color: "#1186a2", textShadow: "0px 5px 5px rgba(17, 134, 162, 0.3)", marginBottom: "7px" }}><Icon.Check style={{ color: "#1186a2" }} /> {message}</div>}
                                    <Alert color={colorAlert} isOpen={visible} toggle={onDismiss.bind(null)}>
                                        {message}
                                    </Alert>
                                    <Form>
                                        <FormGroup>
                                            {/* <Label htmlFor="exampleFile">Carga Masiva por .CSV</Label> */}
                                            <Input id='fileInput' type="file" placeholder='selecciona archivo' onChange={(e) => { setFile(e.target.files[0]); setVisible(false); }} />
                                        </FormGroup>
                                    </Form>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="success" onClick={upload}>
                                        {t('add_btn')}
                                    </Button>
                                    <Button color="secondary" onClick={() => { setModalCsv(false); }}>
                                        {t('cancel_btn')}
                                    </Button>
                                </ModalFooter>
                            </Modal>
                        </div >
                    </CardBody>
                </Card>
            </Col>
        </Row>
    );
};

export default TableItemsComp;
