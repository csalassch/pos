import { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import Select from 'react-select';
import { Table, Modal, ModalHeader, Alert, ModalBody, CardBody, ModalFooter, Button, Label, Row, Col, Card, Form, Input, FormGroup, Collapse, CardHeader } from 'reactstrap';
import Papa from "papaparse";
import useTranslation from '@/hooks/useTranslation';
import DataTable from 'react-data-table-component';
import Transactions from '../Transactions/transactions';
import TotalRegistries from '../TotalRegistries/totalRegistries';




const UnidadesComp = () => {
    const { t } = useTranslation();
    const user = { uid: "example" };
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
            name: t('txt_017'),
            selector: row => row.active,
            minWidth:"5rem",
            maxWidth:"5em"
        }
        ,

        {
            name: t('txt_008'),
            selector: row => row.name,
            maxWidth:"50em"
        },
        {
            name: t('txt_021'),
            selector: row => row.details,
            minWidth:"4rem",
            maxWidth:"4em"
        }
    ];

    const data = [
        {
            id: 1,
            active:
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round" ></span>
                </label>
            ,
           
            name: "2 Cajas",
            details: <div className='d-flex justify-content-center'>
                <Button className='btn-icon-N' type="submit" style={{ fontSize: "11px", border: "none" }}><Icon.Info style={{ maxWidth: "18px" }} /></Button>
            </div>
            
        },
        {
            id: 2,
            active:
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round" ></span>
                </label>
            ,
           
            name: "Paquete de 6 pzs.",
            details: <div className='d-flex justify-content-center'>
                <Button className='btn-icon-N' type="submit" style={{ fontSize: "11px", border: "none" }}><Icon.Info style={{ maxWidth: "18px" }} /></Button>
            </div>
            
        }

    ]

    async function columnsAndData(listaFilled) {
        columnsTable = [
            {
                name: t('txt_017'),
                selector: row => row.active,
            },
            {
                name: t('txt_018'),
                selector: row => row.image,
            },
            {
                name: t('txt_008'),
                selector: row => row.name,
            },
            {
                name: 'SKU',
                selector: row => row.sku,
            },
            {
                name: t('txt_019'),
                selector: row => row.priceSale,
            },
            {
                name: t('txt_020'),
                selector: row => row.purchasePrice,
            },
            {
                name: t('txt_021'),
                selector: row => row.details,
            },
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
    // useEffect(() => {

    //     // console.log("legnth when loaded: ", lengthListaProductos);
    //     console.log("legnth when loaded: ", typeof listaProductos);
    //     console.log("legnth when loaded data: ", data);

    //     // if (listaProductos.length <= 1 && lista.length <= 1) {
    //     //     console.log("Listaa has length: ", listaProductos.length);
    //     //     getDatosProductos().then(() => {
    //     //         console.log("Lista Productos: ", listaProductos);
    //     //         console.log("Lista Productos LENGTH: ", listaProductos.length);
    //     //         setLista(listaProductos);
    //     //         console.log("List Prod: ", lista);
    //     //     });
    //     // }
    //     // if (lista.length !== 0 && lista) {
    //     //     console.log("LENGTH LISTA: ", lista.length);
    //     //     console.log("LENGTH DATAA: ", data.length);

    //     //     if (lista[0].precio !== 0 && data.length === 0) {
    //     //         if (!data.includes(lista) || lista.length !== data.length) {
    //     //             // if (lista.length !== 1 && data.length === 0) {

    //     //             columnsAndData(lista).then(() => {
    //     //                 console.log("columnsTable: ", columnsTable);

    //     //                 setColumns(columnsTable);
    //     //                 console.log("columns: ", columns);

    //     //                 console.log("dataTablee gotten: ", dataTable);
    //     //                 setData(dataTable);
    //     //                 console.log("data gotten: ", data);
    //     //             });


    //     //         }
    //     //     }




    //     // }

    //     if (data2.length > 0) {
    //         insertCsvCategories();
    //     }

    //     console.log("USER UID: ", user.uid);


    // }, [lista, data2, columns, data, user]);
    //Function for pushing items for testing
    // function pushItems(){
    //     push(ref(db, 'items/'), {
    //         name: "Clock Product for testing",
    //         active: true,
    //         description: "product for testing pagination",
    //         idImage:"-NHBI9poZQ7hGfi25s22",
    //         idUnit:"-NHBC3-kHm9L3ZHNZIRV",
    //         price: "45,680",
    //         sku:"PRD-TEST-001"

    //     });
    // }
    let searchPlacehorlder = t('txt_078');
    const [isSSR, setIsSSR] = useState(true);
    const [isEdited, setisEdited] = useState(false);


    useEffect(() => {
        setIsSSR(false);
    }, []);
    return (
        <Row>
            <Col md="8">
                <div className="d-flex align-items-stretch">
                    <div className="p-1 align-self-stretch">
                        <Button title={t('txt_061')} className='btn btn-icon-N' onClick={() => { setModal(true) }} type="button"><Icon.Plus style={{ verticalAlign: "middle", position: "relative", width: "17px" }} /> {t('txt_014')}</Button>
                    </div>
                    <div className="p-1 align-self-stretch">
                        <Button title={t('txt_070')} className='btn btn-icon-N' onClick={() => { setModalCsv(true) }} type="button"><Icon.Upload style={{ marginRight: "5px", verticalAlign: "middle", position: "relative", width: "17px" }} />{t('txt_015')}</Button>
                    </div>
                    <div className="p-1 align-self-stretch">
                        <Button title={t('txt_016')} className='btn btn-icon-N' onClick={downloadTemplate} type="button"><Icon.FileText style={{ marginRight: "5px", verticalAlign: "middle", position: "relative", width: "17px" }} />{t('txt_016')}</Button>
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

                                <Button type="submit" className="btn btn-success" style={{ backgroundColor: "#077CAB", borderColor: "#077CAB" }}>{t('txt_014')}</Button>
                            </div>
                        </Col>
                    </Row>

                </Collapse>
                <Card className='border-0'>
                    {/* <CardHeader style={{ backgroundColor: "white" }}>
                        <Row>
                            <div className='d-flex justify-content-end'>
                                <Col md="3">
                                </Col>
                            </div>
                        </Row>

                    </CardHeader> */}
                    <CardBody>
                        <div>
                            
                            <Row className='d-flex justify-content-center'>
                                <Col md="10">
                                    {/* DataTable component */}
                                    <div className='container-fluid'>
                                        {/* <ReactDataTablePagination arrayOfObjects={arrayOfObjects} dataInOnePage={5} /> */}

                                        {/* {typeof window !=='undefined' ?'trueee':'false mate'} */}
                                        {!isSSR && <DataTable columns={columns} data={data} pagination />}
                                    </div>


                                </Col>

                            </Row>
                            <Modal isOpen={modal} toggle={() => { setModal(false); setisEdited(false); }}>
                                <ModalHeader toggle={() => { setModal(false); }} style={{ color: "#1f4f67" }}>
                                    {isEdited === false ? <Icon.PlusCircle style={{ marginRight: "5px" }} /> : (<Icon.Edit2 style={{ marginRight: "5px" }} />)}
                                    {isEdited === false ? t('txt_061') : t('txt_083')}

                                </ModalHeader>
                                <ModalBody className='pb-0'>
                                    <FormGroup>
                                        {/* <InputGroup> */}
                                        <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400"}}>{t('txt_008')}</Label>
                                        <Input className='inputBox' style={{ marginTop: "0px" }} onChange={(e) => { setNameUnit(e.target.value); setIsValidInput(true); setVisible(false); sethiddenSuccess(false); }} />
                                        {/* </InputGroup> */}
                                    </FormGroup>
                                    <div className='d-flex justify-content-end'>
                                        <Button className='btn-icon-Modal px-2' onClick={() => { checkRepeatedValues(nameUnit).then((e) => { console.log("Returned Val: ", e); newUnit(e) }); }}>
                                            {t('txt_014')}
                                        </Button>
                                    </div>
                                </ModalBody>
                                <ModalFooter style={{ borderTop: "none" }}>

                                </ModalFooter>
                            </Modal>
                            <Modal isOpen={modalCsv} toggle={() => setModalCsv(false)}>
                                <ModalHeader toggle={() => setModalCsv(false)} style={{ color: "#1186a2" }}><Icon.PlusCircle style={{ marginRight: "5px" }} />{t('txt_070')}</ModalHeader>
                                <ModalBody className='pb-0'>
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
                                    <div className='d-flex justify-content-end'>
                                        <Button className='btn-icon-Modal px-2' onClick={upload}>
                                            {t('txt_014')}
                                        </Button>

                                    </div>
                                </ModalBody>
                                <ModalFooter style={{borderTop:"none"}}>
                                </ModalFooter>
                            </Modal>
                        </div >
                    </CardBody>
                </Card>
            </Col>
            <Col>
                <TotalRegistries txt={t('txt_027')}/>
                <Transactions />

            </Col>
        </Row >
    );
};

export default UnidadesComp;
