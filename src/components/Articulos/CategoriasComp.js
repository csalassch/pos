import { useState, useEffect } from 'react';
import {
    Row, Col, FormGroup, Input, Button, InputGroup,
    InputGroupText, Table,
    Modal, ModalHeader,
    ModalBody,
    ModalFooter, FormFeedback, Alert, Card, CardBody, CardHeader, Form, CardTitle, CardSubtitle
} from 'reactstrap';
import { useTranslation } from 'react-i18next';
import { ref as refStorage, uploadBytesResumable } from 'firebase/storage';
import Papa from "papaparse";
// import { usePapaParse } from 'react-papaparse';
import { push, ref, onValue, update } from 'firebase/database';
import * as Icon from 'react-feather';
import { db, dbStorage} from '../../FirebaseConfig/firebase';
// import {useAuth} from '../../Context/authContext';

const CategoriasComp = () => {
    // const {user}=useAuth();
    const { t } = useTranslation();
    const [arr, setArr] = useState([{ id: 0, name: '', key: "", active: "" }]);
    const fetchDataCategories = () => {
        const arrAux = [];
        let i = 1;
        //You left here fix it
        onValue(ref(db, `categories/`), snapshot => {
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
    const [btnMessage, setBtnMessage] = useState(t('add_btn'));
    const [isEdited, setisEdited] = useState(false);
    const [messageFeedback, setMessageFeedback] = useState("");
    const [isValidInput, setIsValidInput] = useState(true);
    const [keyAux, setKeyAux] = useState("");
    const [nameUnit, setNameUnit] = useState("");
    const [modal, setModal] = useState(false);
    const [modalCsv, setModalCsv] = useState(false);
    const [modalDetail, setModalDetail] = useState(false);
    const [colorAlert, setAlertColor] = useState("success");
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [txtDetail, setTxtDetail] = useState("");
    const [statusDetail, setStatusDeatil] = useState(false);
    const [hiddenSuccess, sethiddenSuccess] = useState(false);
    const [colorMsg, setColorMsg] = useState({color:"#1186a2",textShadow:"0px 5px 5px rgba(17, 134, 162, 0.3)"});
    const [hiddenSuccessUpload, sethiddenSuccessUpload] = useState(false);
    const onDismiss = () => {
        setVisible(false);
    };
    async function checkRepeatedValues(nameValue) {
        let resRepeated=false;
        if (nameValue !== "") {
            console.log("NameValue Check", nameValue);
            onValue(ref(db, `categories/`), snapshot => {
                snapshot.forEach(snap => {
                    console.log("ForEach check", snap.val().name === nameValue, " - ", snap.val().name, " -- ", nameValue);
                    if (snap.val().name === nameValue) {
                        resRepeated=true;                        
                    }
                });
            });
        }
        return resRepeated;
    }
    const newUnit = (isValid) => {
        if (nameUnit) {
            if (isEdited && isValid===false) {
                console.log("btnCllicked for update: ", keyAux);
                update(ref(db, `categories/${keyAux}`), {
                    name: nameUnit
                });
                setBtnMessage(t('add_btn'));
                setisEdited(false);
                setKeyAux("");
                sethiddenSuccess(true);
                setColorMsg({color:"#1186a2",textShadow: "0px 5px 5px rgba(17, 134, 162, 0.3)"});
                setMessage(t('updatedSuccessfully'));
                setTimeout(() => {
                    sethiddenSuccess(false);
                }, 3000);
            } else if(isValid===false && isEdited===false) {
                    push(ref(db, 'categories/'), {
                        name: nameUnit,
                        active: true
                    });
                    sethiddenSuccess(true);
                    setColorMsg({color:"#1186a2",textShadow: "0px 5px 5px rgba(17, 134, 162, 0.3)"});
                    setMessage(t('registeredSuccessfully'));
                    setTimeout(() => {
                        sethiddenSuccess(false);
                    }, 3000);
            }else {
                sethiddenSuccess(true);
                setColorMsg({color:"#fc7174",textShadow: "0px 5px 5px rgba(252,113,116, 0.3)"});
                setMessage(t('nameTaken_error'));
                setTimeout(() => {
                    sethiddenSuccess(false);
                }, 3000);
            }
            fetchDataCategories();
            setNameUnit("");
            setIsValidInput(true);
        } else {
            setIsValidInput(false);
            setMessageFeedback(t('fillField_Validation'));
            setVisible(false);
        }
    }
    const editUnit = (keyDB) => {
        console.log("Key of clicked: ", keyDB);
        setKeyAux(keyDB);
        onValue(ref(db, `categories/${keyDB}`), snapshot => {
            setNameUnit(snapshot.val().name);
        });
        setBtnMessage(t('saveChanges_btn'));
        setisEdited(true);
    }
    function modifiedActive(dataPib) {
        update(ref(db, `categories/${dataPib.key}`), {
            active: !dataPib.active
        });
        fetchDataCategories();
    }
    function viewDetails(dataPib) {
        setModalDetail(true);
        onValue(ref(db, `categories/${dataPib.key}`), snapshot => {
            setTxtDetail(snapshot.val().name);
            setStatusDeatil(snapshot.val().active);
        });
    }
    //For uploading categories csv
    const [file, setFile] = useState('');
    const [data2, setData2] = useState([]);
    async function readCsv() {
        const reader = new FileReader();
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: true, encoding: "ISO-8859-1" });
            const parsedData = csv?.data;
            const objDataCsv = [];
            for (let i = 0; i < parsedData.length-1; i++) {
                console.log("PARSED DATA: ",parsedData[i]);
                if (parsedData[i].Name) {
                    checkRepeatedValues(parsedData[i].Name).then((e)=>{
                        console.log("CHECK TO OBJ: ",e);
                        if(e===false){
                            objDataCsv.push(parsedData[i].Name);
                        }
                    });
                } else {
                    setVisible(true);
                    setAlertColor("danger");
                    setMessage(t('fileFormatCSV_error'));
                    return;
                }
            }
            setData2(objDataCsv);
        }
        reader.readAsText(file, 'ISO-8859-1');
    }
    const insertCsvCategories = () => {
        if (data2.length > 0) {
            data2.forEach((element) => {
                console.log("element: ", element);
                if (element !== '') {
                    push(ref(db, 'categories/'), {
                        name: element,
                        active: true
                    });
                }
            });
            sethiddenSuccessUpload(true);
            setMessage(t('registeredSuccessfully'));
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
            setMessage(t('selectCSVFiles_error'));
            return;
        }
        console.log(file.name);
        const allowedExtensions = /(\.csv)$/i;
        if (!allowedExtensions.exec(file.name)) {
            setVisible(true);
            setAlertColor("danger");
            setMessage(t('selectCSVFiles_error'));
        } else {
            const storageRef = refStorage(dbStorage, `/Categorias/${file.name}`);
            uploadBytesResumable(storageRef, file);
            readCsv().then(() => {
                insertCsvCategories();
            });
        }
    }
    const downloadTemplate = () => {
        const strEsp = "[text]";
        const encoded = new TextEncoder('utf-8', { NONSTANDARD_allowLegacyEncoding: true });
        const decoded = (new TextDecoder('utf-8').decode(encoded.encode(strEsp)));
        console.log(decoded);
        const CSV = [
            '"Name"',
            decoded
        ].join('\n');
        window.URL = window.webkitURL || window.URL;
        const contentType = 'text/csv';
        const csvFile = new Blob([CSV], { type: contentType });
        const a = document.createElement('a');
        a.download = t('templateDownloadFileName');
        a.href = window.URL.createObjectURL(csvFile);
        a.textContent = 'Download CSV';
        a.dataset.downloadurl = [contentType, a.download, a.href].join(':');
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    useEffect(() => {
        fetchDataCategories();
        console.log(arr);
        if (data2.length > 0) {
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
                                    <h4 style={{ color: "#1186a2" }}>{t('registerCategories_headings')}</h4>
                                </Col>
                                <Col>
                                    <div className='d-flex justify-content-end'>
                                        <Button title={t('addCategory_hover')} className='btn btn-icon' onClick={() => { setModal(true) }} type="button" style={{ marginRight: "7px" }}><Icon.Plus style={{ marginRight: "0px", verticalAlign: "middle", position: "relative" }} /></Button>
                                        <Button title={t('upload_hover')} className='btn btn-icon' onClick={() => { setModalCsv(true) }} type="button"><Icon.Upload style={{ marginRight: "0px", verticalAlign: "middle", position: "relative" }} /></Button>
                                        <Button title={t('downloadTemplate_hover')} className='btn btn-icon' onClick={downloadTemplate} type="button" style={{ marginLeft: "7px" }}><Icon.FileText style={{ marginRight: "0px", verticalAlign: "middle", position: "relative" }} /></Button>
                                    </div >
                                </Col>
                            </Row>
                        </CardHeader>
                        <CardBody>
                            <FormGroup>
                                <Row>
                                    <Col>
                                        <Table responsive style={{ overflow: 'hidden' }}>
                                            <thead className='text-center' style={{ color: "#1f4f67" }}>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>{t('active_headings')}</th>
                                                    <th>{t('name_headings')}</th>
                                                    <th>{t('details_headings')}</th>
                                                </tr>
                                            </thead>
                                            <tbody className='text-center'>
                                                {arr.map((data) => (
                                                    <tr key={data.id}>
                                                        <td>{data.id}</td>
                                                        <td><div onClick={() => { modifiedActive(data) }}>
                                                            {data.active === "true" || data.active === true ? <div><Icon.ToggleRight style={{ color: "#fca311" }} /></div>
                                                                : <div><Icon.ToggleLeft /></div>}
                                                        </div></td>
                                                        <td>{data.name}</td>
                                                        <td>
                                                            <div className='d-flex justify-content-center'>
                                                                {/* <div style={{ cursor: "pointer", color: "#1186a2",marginRight:"7px" }} onClick={() => { editUnit(data.key) }}><Icon.Edit /></div> */}
                                                                <Button onClick={() => { viewDetails(data); setKeyAux(data.key) }} color='secondary' type="submit" style={{ fontSize: "11px", border: "none" }}><Icon.Info style={{ maxWidth: "18px" }} /></Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </Table>
                                        <Modal isOpen={modal} toggle={() => { setModal(false); setBtnMessage(t('add_btn')); setisEdited(false); }}>
                                            <ModalHeader toggle={() => { setModal(false); setBtnMessage(t('add_btn')); setisEdited(false) }} style={{ color: "#1186a2" }}>{isEdited === false ? <Icon.PlusCircle style={{ marginRight: "7px" }} /> : (<Icon.Edit2 style={{ marginRight: "7px" }} />)}{isEdited === false ? t('addCategory_hover') : t('editCategories_headings')}</ModalHeader>
                                            <ModalBody>
                                                {hiddenSuccess && <div className='d-flex justify-content-start' style={{ color: colorMsg.color,textShadow:colorMsg.textShadow, marginBottom: "7px" }}> {colorMsg.color==="#1186a2"?<Icon.Check style={{ color: colorMsg.color,marginRight:"7px" }} />:<Icon.AlertTriangle style={{ color: colorMsg.color,marginRight:"7px" }} />} {message}</div>}
                                                <FormGroup>
                                                    <InputGroup>
                                                        <InputGroupText>{t('name_headings')}</InputGroupText>
                                                        <Input placeholder={t('name_headings')} value={nameUnit} invalid={!isValidInput} onChange={(e) => { setNameUnit(e.target.value); setIsValidInput(true); setVisible(false); sethiddenSuccess(false); }} />
                                                        <FormFeedback>{messageFeedback}</FormFeedback>
                                                    </InputGroup>
                                                </FormGroup>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button color="success" onClick={()=>{checkRepeatedValues(nameUnit).then((e)=>{console.log("Returned Val: ",e);newUnit(e)});}}>
                                                    {btnMessage}
                                                </Button>
                                                <Button color="secondary" onClick={() => { setModal(false); setNameUnit(""); setBtnMessage(t('add_btn')); setisEdited(false); }}>
                                                    {t('cancel_btn')}
                                                </Button>
                                            </ModalFooter>
                                        </Modal>
                                        <Modal isOpen={modalCsv} toggle={() => setModalCsv(false)}>
                                            <ModalHeader toggle={() => setModalCsv(false)} style={{ color: "#1186a2" }}><Icon.PlusCircle /> {t('loadCategories_heading')}</ModalHeader>
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
                                        <Modal isOpen={modalDetail} toggle={() => setModalDetail(false)}>
                                            <ModalHeader toggle={() => setModalDetail(false)} style={{ color: "#1186a2", width: "100%" }}>
                                                <Row>
                                                    <Col>
                                                        <Icon.Info /> {t('details_headings')}
                                                    </Col>
                                                    <Col>
                                                        <div className='d-flex justify-content-end'>
                                                            <Button onClick={() => { setModalDetail(false); setModal(true); setBtnMessage(t('saveChanges_btn')); editUnit(keyAux); setisEdited(true); }} title='Editar Categoría' className='btn btn-icon' type="button" style={{ marginRight: "7px" }}><Icon.Edit3 style={{ marginRight: "0px", verticalAlign: "middle", position: "relative" }} /></Button>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </ModalHeader>
                                            <ModalBody>
                                                <CardBody className="p-2">
                                                    <div className="text-center mt-2 ">
                                                        {/* <img src={img1} className="rounded-circle" width="100" alt="" /> */}
                                                        <Icon.Award style={{ scale: "2" }} className="mb-3" />
                                                        <CardTitle tag="h4" className="mt-2 mb-0">
                                                            {txtDetail}
                                                        </CardTitle>
                                                    </div>
                                                </CardBody>
                                                <Row>
                                                    <Col>
                                                        <CardBody className="border-top pt-4">
                                                            <CardSubtitle className="text-muted d-flex justify-content-center">{t('informationTextCategory')}</CardSubtitle>
                                                            <Row className="text-center justify-content-md-center mt-3">
                                                                <Col xs="4">
                                                                    <CardSubtitle className="text-muted fs-5 d-flex justify-content-center">{t('status_txt')}</CardSubtitle>
                                                                    <CardTitle tag="h5">
                                                                        {statusDetail ? <div>
                                                                            <Row><Col>
                                                                                <Icon.ToggleRight style={{ color: "#fca311" }} />
                                                                            </Col></Row>
                                                                            <Row><Col>
                                                                                {t('activated_txt')}
                                                                            </Col></Row>
                                                                        </div> : <div>
                                                                            <Row><Col>
                                                                                <Icon.ToggleLeft />
                                                                            </Col></Row>
                                                                            <Row><Col>
                                                                                {t('deactivated_txt')}
                                                                            </Col></Row>
                                                                        </div>}
                                                                        {/* <div>
                                                                            <Row><Col>
                                                                                <Icon.ToggleRight style={{ color: "#fca311" }} />
                                                                            </Col></Row>
                                                                            <Row><Col>
                                                                                Activo
                                                                            </Col></Row>
                                                                        </div> */}
                                                                    </CardTitle>
                                                                </Col>
                                                            </Row>
                                                        </CardBody>
                                                    </Col>
                                                    {/* <Col><h5>{txtDetail}</h5></Col> */}
                                                </Row>
                                            </ModalBody>
                                        </Modal>
                                    </Col>
                                </Row>
                            </FormGroup>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </>
    );
};
export default CategoriasComp;
