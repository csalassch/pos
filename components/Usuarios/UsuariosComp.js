
import { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import Select from 'react-select';
import { Table, Modal, ModalHeader, Alert, ModalBody, CardBody, ModalFooter, Button, Label, Row, Col, Card, Form, Input, FormGroup, Collapse, CardHeader } from 'reactstrap';
import Papa from "papaparse";
import useTranslation from '@/hooks/useTranslation';
import DataTable from 'react-data-table-component';
import Transactions from '../Transactions/transactions';
import TotalRegistries from '../TotalRegistries/totalRegistries';
import Badge from 'react-bootstrap/Badge';
import ExpandedComponentUsuarios from './ExpandedComponentUsuarios';

const UsuariosComp = () => {
    const { t } = useTranslation();
    // const { user } = useAuth();
    const user = { uid: "example" };


    const [modal, setModal] = useState(false);
    const [addFields, setAddFields] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    // const [lista, setLista] = useState([{}]);
    const [lista, setLista] = useState([{ id: '', nombre: '', urlImage: '', sku: '', precio: 0, active: false }]);
    const [modalCsv, setModalCsv] = useState(false);
    const [hiddenSuccessUpload, sethiddenSuccessUpload] = useState(false);
    const [colorAlert, setAlertColor] = useState("success");
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [isEdited, setisEdited] = useState(false);

    const onDismiss = () => {
        setVisible(false);
    };
    //For uploading categories csv
    const [file, setFile] = useState('');
    const [data2, setData2] = useState([]);
    const colourStyles = {
        option: (provided) => ({
            ...provided,
            color: "black",
            padding: 20,
        }), multiValue: (styles) => {

            return {
                ...styles,
                backgroundColor: "#d2cef9",
            };
        },
        multiValueLabel: (styles) => ({
            ...styles,
            color: "#212121",

        }),
    };
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
                    // push(ref(db, 'items/'), {
                    //     name: element,
                    //     active: true
                    // });
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
            // const storageRef = refStorage(dbStorage, `/Categorias/${file.name}`);
            // uploadBytesResumable(storageRef, file);
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

    const listaProductos = [];
    async function getDatosProductos() {
        // onValue(ref(db, "items/"), snapshot => {
        //     snapshot.forEach(snap => {
        //         let urlImage = "";
        //         onValue(ref(db, `files/${snap.val().idImage}`), snapshotFiles => {
        //             urlImage = snapshotFiles.val().url;
        //             const producto = {
        //                 id: snap.key,
        //                 nombre: snap.val().name,
        //                 urlImage: urlImage,
        //                 sku: snap.val().sku,
        //                 precio: snap.val().price,
        //                 active: snap.val().active
        //             }
        //             listaProductos.push(producto);
        //             // setLista(producto);

        //         });
        //     })
        // });
    }
    function modifiedActive(data) {
        // update(ref(db, `items/${data.id}`), {
        //     active: data.active === "true" ? "false" : "true"
        // });
        getDatosProductos();
    }

    // const [data, setData] = useState([]);
    // const [columns, setColumns] = useState([]);
    let columnsTable = [];
    const dataTable = [];
    const columns = [

        {
            name: "Estado",
            selector: row => row.active,
            minWidth: "8rem",
            maxWidth: "8em"
        },
        {
            name: "Id",
            selector: row => row.idInterno,
            minWidth: "4rem",
            maxWidth: "4em"
        }
        ,
        {
            name: t('txt_008'),
            selector: row => row.name,
        }
        ,
        {
            name: "Correo",
            selector: row => row.email,

        },
        {
            name: "Fecha de registro",
            selector: row => row.creationDate,

        },
        {
            name: "Roles",
            selector: row => row.roles,
            minWidth: "8rem",
            maxWidth: "8em"
        }
    ];

    const dataSubs = [
        {
            id: 1,
            active: "VRT Calle 11"
        },
        {
            id: 2,
            active: "VRT Calle 22"
        }

    ];



    async function columnsAndData(listaFilled) {
        columnsTable = [
            {
                name: t('FreePOS:active_headings'),
                selector: row => row.active,
            },

            {
                name: t('name_headings'),
                selector: row => row.name,
            },
            {
                name: 'SKU',
                selector: row => row.subsidiary,
            },
            {
                name: t('salePrice_headings'),
                selector: row => row.location,
            },
            {
                name: t('purchasePrice_headings'),
                selector: row => row.puesto,
            }
        ];
        console.log("lista posicion", listaFilled);
        for (let i = 0; i < listaFilled.length; i++) {

            dataTable.push(
                {
                    id: i,
                    active: listaFilled[i].active === true ?
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round" ></span>
                        </label>
                        // <div className='container-fluid'><div className='d-flex justify-content-center' onClick={() => { modifiedActive(listaFilled[i]) }}>
                        //     <CFormSwitch id="formSwitchCheckChecked" defaultChecked />
                        // </div></div>
                        :
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round" ></span>
                        </label>
                    // <div className='container-fluid'><div className='d-flex justify-content-center'>
                    //     <CFormSwitch id="formSwitchCheckDefault" />
                    // </div></div>
                    ,
                    image: <img id="imageProductRetrieved2"
                        alt="..."
                        className=" img-fluid rounded shadow-lg"
                        src={listaFilled[i].urlImage}
                        style={{ width: "40px" }}
                    ></img>,
                    name: listaFilled[i].nombre,
                    sku: listaFilled[i].sku,
                    priceSale: listaFilled[i].precio,
                    purchasePrice: listaFilled[i].precio,
                    details: <div className='d-flex justify-content-center'>
                        <Button color='secondary' type="submit" style={{ fontSize: "11px", border: "none" }}><Icon.Info style={{ maxWidth: "18px" }} /></Button>
                    </div>
                }
            );
        }
    }

    let searchPlacehorlder = t('txt_078');
    const [isSSR, setIsSSR] = useState(true);
    const [fieldList, setFieldList] = useState([{idInterno:0}]);
    const [counter, setCounter] = useState(1);

    const addPersonField = () => {
        setCounter(count => count + 1);
        console.log("contador:", counter);
        let fieldListAux = fieldList;
        fieldListAux.push({ idInterno: counter });
        setFieldList(fieldListAux);
        console.log("fieldList:", fieldList);
    }

    useEffect(() => {
        setIsSSR(false);
    }, [fieldList, counter]);
    return (
        <Row>
            <Col>
                <div className="d-flex align-items-stretch">
                    <div className="p-1 align-self-stretch">
                        <Button title={t('txt_073')} className='btn btn-icon-N' onClick={() => { setModal(true) }} type="button"><Icon.Plus style={{ verticalAlign: "middle", position: "relative", width: "17px" }} />Invitar usuario</Button>
                    </div>



                    <div className="p-1 align-self-stretch" style={{ marginLeft: "auto" }}>
                        <Button title={t('txt_024')} onClick={() => { setShowFilters(!showFilters) }} className='btn btn-icon-N mb-3' type="button"><Icon.Filter style={{ marginRight: "5px", verticalAlign: "middle", position: "relative", width: "17px" }} />{t('txt_024')}</Button>
                    </div>
                    <div className="p-1 align-self-stretch">
                        <Input className='searchBar' type="text" placeholder={searchPlacehorlder} style={{ border: "none" }} />
                    </div>
                </div>

                <Collapse isOpen={showFilters} style={{ marginTop: "10px" }}>
                    <Row style={{ marginBottom: "10px" }}>

                        <Col >
                            <FormGroup id='name'>

                                <Label className='headingCard' htmlFor="exampleFile">{t('txt_008')}</Label>
                                <Select
                                    label="Single select"
                                    options={[{ value: 'Nombre Item 1', label: 'Nombre Item 1' }, { value: 'Nombre Item 2', label: 'Nombre Item 2' }, { value: 'Nombre Item 3', label: 'Nombre Item 3' }, { value: 'Nombre Item 4', label: 'Nombre Item 4' }]}
                                    styles={colourStyles}
                                />
                            </FormGroup>
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <div className='d-flex justify-content-end mb-2'>

                                <Button type="submit" className="btn btn-success" style={{ backgroundColor: "#077CAB", borderColor: "#077CAB" }}>{t('txt_068')}</Button>
                            </div>
                            {/* <Icon.Plus className='btn btn-icon' style={{ marginRight: "0px", verticalAlign: "middle", position: "relative" }} /> */}

                        </Col>
                    </Row>

                </Collapse>
                <Card className='border-0'>

                    <CardBody>
                        <div>

                            <Row className='d-flex justify-content-center'>
                                <Col>

                                    <div className='container-fluid'>
                                        {/* <ReactDataTablePagination arrayOfObjects={arrayOfObjects} dataInOnePage={5} /> */}

                                        {/* {typeof window !=='undefined' ?'trueee':'false mate'} */}
                                        {!isSSR && <DataTable columns={columns} data={dataSubs} pagination expandableRows expandableRowsComponent={ExpandedComponentUsuarios} />}
                                    </div>


                                </Col>

                            </Row>
                            <Modal size='lg' isOpen={modal} toggle={() => { setModal(false); setisEdited(false); }}>
                                <ModalHeader toggle={() => { setModal(false); }} style={{ color: "#1f4f67" }}>
                                    Invitar usuarios

                                </ModalHeader>
                                <ModalBody className='pb-0'>
                                    <Row>
                                        <Col md="3">
                                            <FormGroup>
                                                <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Ubicación</Label>
                                                <Select
                                                    id="selectInputs2"
                                                    label="Single select"
                                                    options={
                                                        [{ value: 'Nombre Item 1', label: 'Ubicación 1' },
                                                        { value: 'Nombre Item 2', label: 'Ubicación 2' }
                                                        ]}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    
                                    <div id='appendedFields'>
                                        {fieldList.map((msg) => (
                                            <Row key={msg.idInterno}>
                                                <Col>
                                                    <FormGroup>
                                                        <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Nombre</Label>
                                                        <Input className='inputBox' style={{ marginTop: "0px" }} />
                                                    </FormGroup>
                                                </Col>
                                                <Col>
                                                    <FormGroup>
                                                        <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Apellidos</Label>
                                                        <Input className='inputBox' style={{ marginTop: "0px" }} />
                                                    </FormGroup>
                                                </Col>
                                                <Col>
                                                    <FormGroup>
                                                        <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Correo electrónico</Label>
                                                        <Input className='inputBox' style={{ marginTop: "0px" }} />
                                                    </FormGroup>
                                                </Col>
                                                <Col>
                                                    <FormGroup>
                                                        <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Roles</Label>
                                                        <Select
                                                            id="selectInputs2"
                                                            label="Single select"
                                                            options={
                                                                [{ value: 'Nombre Item 1', label: 'rol 1' },
                                                                { value: 'Nombre Item 2', label: 'rol 2' }
                                                                ]}
                                                        />
                                                    </FormGroup>
                                                </Col>
                                                <Col md="1" className='d-flex justify-content-center align-items-center'>
                                                    <div onClick={() => {
                                                        const newList = fieldList.filter((item) => item.idInterno !== msg.idInterno);
                                                        console.log("NewList: ", newList);
                                                        setFieldList(newList);
                                                    }}
                                                        className='d-flex justify-content-center align-items-center'
                                                        style={{cursor:"pointer"}}
                                                        >
                                                        <div>
                                                            <Icon.X size={17} />
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                        ))}
                                    </div>
                                    <small style={{ cursor: "pointer" }} onClick={() => { addPersonField() }} className='link-info'>+ Agregar personas a invitar</small>

                                    <div className='d-flex justify-content-end'>
                                        <Button className='btn-icon-Modal px-2' onClick={() => { checkRepeatedValues(nameUnit).then((e) => { console.log("Returned Val: ", e); newUnit(e) }); }}>
                                            {t('txt_014')}
                                        </Button>
                                    </div>
                                </ModalBody>
                                <ModalFooter style={{ borderTop: "none" }}>

                                </ModalFooter>
                            </Modal>

                        </div >
                    </CardBody>
                </Card>
            </Col>
            {/* <Col>
                <TotalRegistries txt={t('txt_039')} />
                <Transactions />

            </Col> */}
        </Row >
    );
};

export default UsuariosComp;
