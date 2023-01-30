
import { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import Select from 'react-select';
import { Table, Modal, ModalHeader, Alert, ModalBody, CardBody, ModalFooter, Button, Label, Row, Col, Card, Form, Input, FormGroup, Collapse, CardHeader } from 'reactstrap';
import Papa from "papaparse";
import useTranslation from '../../hooks/useTranslation';
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
            name: <div className="form-check d-flex flex-row">
                <input style={{ marginRight: "5px" }} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            </div>,
            selector: row => row.subsidiarySelect,
            width: "3rem"
        }
        ,
        {
            name: t('active_headings'),
            selector: row => row.active,
            width: "3.5rem"
        }
        
        ,

        {
            name: t('name_headings'),
            selector: row => row.name,
            width: "8rem"
        }
        ,
        {
            name: "Subsidiaria",
            selector: row => row.subsidiary,
            width: "8rem"
        },
        {
            name: "Locación",
            selector: row => row.location,
            width:"8rem"
        },
        {
            name: "Puesto",
            selector: row => row.puesto,
            width: "8rem"
        },
        {
            name: "Perfil",
            selector: row => row.profile,
            width: "5rem"
        },
    ];

    const dataSubs = [
        {
            id: 1,
            subsidiarySelect: <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            </div>,
            active:
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round" ></span>
                </label>
            ,
            
            subsidiary:"Sucursal Centro Sur Querétaro",
            profile:<a href='https://www.freebug.mx/'><Icon.User /></a>,

            name: "Jorge Tenorio",
            location: "Tienda Galindas",
            puesto: <h6><Badge className='badgeCurrency'>
                Administrador
            </Badge></h6>

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

    let searchPlacehorlder = t('placeholderSearch');
    // let searchPlacehorlder = t('placeholderSearch');
    if (searchPlacehorlder === "Seek") {
        searchPlacehorlder = "Search";
    }
    const [isSSR, setIsSSR] = useState(true);

    useEffect(() => {
        setIsSSR(false);
    }, []);
    return (
        <Row>
            <Col md="8">
                <div className="d-flex align-items-stretch">
                    <div className="p-1 align-self-stretch">
                        <Button title={t('addItem_modal')} className='btn btn-icon-N' onClick={() => { setModal(true) }} type="button"><Icon.Plus style={{ verticalAlign: "middle", position: "relative", width: "17px" }} /> Usuario</Button>
                    </div>
                    
                    
                    
                    <div className="p-1 align-self-stretch" style={{ marginLeft: "auto" }}>
                        <Button title={t('filters_btn')} onClick={() => { setShowFilters(!showFilters) }} className='btn btn-icon-N mb-3' type="button"><Icon.Filter style={{ marginRight: "5px", verticalAlign: "middle", position: "relative", width: "17px" }} />{t('filters_btn')}</Button>
                    </div>
                    <div className="p-1 align-self-stretch">
                        <Input className='searchBar' type="text" placeholder={searchPlacehorlder} style={{ border: "none" }} />
                    </div>
                </div>

                <Collapse isOpen={showFilters} style={{ marginTop: "10px" }}>
                    <Row style={{ marginBottom: "10px" }}>

                        <Col >
                            <FormGroup id='name'>

                                <Label className='headingCard' htmlFor="exampleFile">{t('name_headings')}</Label>
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

                                <Button type="submit" className="btn btn-success" style={{ backgroundColor: "#077CAB", borderColor: "#077CAB" }}>{t('add_btn')}</Button>
                            </div>
                            {/* <Icon.Plus className='btn btn-icon' style={{ marginRight: "0px", verticalAlign: "middle", position: "relative" }} /> */}

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
                            <Row>

                                {/* <Collapse isOpen={showFilters} style={{ marginTop: "10px" }}>
                                <Row style={{ marginBottom: "10px" }}>
                                    <Col>
                                        <FormGroup>
                                            <Label htmlFor="exampleFile">Categorías</Label>

                                            <Select
                                                closeMenuOnSelect={false}
                                                // defaultValue={[arrayCategories[1]]}
                                                isMulti
                                                options={[{ value: 'Categoría 1', label: 'Categoría 1' }, { value: 'Categoría 2', label: 'Categoría 2' }, { value: 'Categoría 3', label: 'Categoría 3' }, { value: 'Categoría 4', label: 'Categoría 4' }]}
                                                styles={colourStyles}
                                            // value={[{ value: idCategoriesArr.txt, label: idCategoriesArr.txt }]}

                                            // onChange={(e) => { const arrCatAux = []; for (let i = 0; i < e.length; i++) { if (!arrCatAux.includes(e[i].key)) { arrCatAux.push(e[i].key); } } console.log(arrCatAux); setIdCategoriesArr(arrCatAux); }}

                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col >
                                        <Label htmlFor="exampleFile">Nombre</Label>
                                        <Select
                                            label="Single select"
                                            options={[{ value: 'Nombre Item 1', label: 'Nombre Item 1' }, { value: 'Nombre Item 2', label: 'Nombre Item 2' }, { value: 'Nombre Item 3', label: 'Nombre Item 3' }, { value: 'Nombre Item 4', label: 'Nombre Item 4' }]}
                                            styles={colourStyles}
                                        />
                                    </Col>
                                    <Col >
                                        <Label htmlFor="exampleFile">SKU</Label>
                                        <Select
                                            label="Single select"
                                            options={[{ value: 'Nombre Item 1', label: 'Nombre Item 1' }, { value: 'Nombre Item 2', label: 'Nombre Item 2' }, { value: 'Nombre Item 3', label: 'Nombre Item 3' }, { value: 'Nombre Item 4', label: 'Nombre Item 4' }]}
                                            styles={colourStyles}
                                        />
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <div className='d-flex justify-content-end'>

                                            <Button type="submit" className="btn btn-success">Aplicar</Button>
                                        </div>
                                        {/* <Icon.Plus className='btn btn-icon' style={{ marginRight: "0px", verticalAlign: "middle", position: "relative" }} /> */}

                                {/* </Col>
                                </Row> 

                            </Collapse> */}
                            </Row>

                            {/* <br /> */}
                            {/* <div className='w-full d-flex justify-content-start m-6'>
                                <div style={{ cursor: "pointer" }} className="d-flex justify-content-center" onClick={getDatosProductos}>
                                    <Icon.RefreshCw style={{ marginRight: "5px" }} />
                                    <p> Recargar</p>
                                </div>
                            </div> */}
                            <Row className='d-flex justify-content-center'>
                                <Col>
                                    {/* <Table className="no-wrap mt-0 align-middle" responsive borderless >
                                        <thead >
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
                                        <tbody style={{ fontSize: "13px" }}>
                                            {lista.map((tdata) => (
                                                <tr key={tdata.id} className="border-top">
                                                    <td><div className='d-flex justify-content-center' onClick={() => { modifiedActive(tdata) }}>
                                                        
                                                        {tdata.active === "true" || tdata.active === true ? <div className='d-flex justify-content-center'><CFormSwitch id="formSwitchCheckChecked" defaultChecked /></div>
                                                            : <div className='d-flex justify-content-center'><CFormSwitch id="formSwitchCheckDefault" />
                                                            </div>}
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
                                    </Table> */}
                                    {/* DataTable component */}
                                    <div className='container-fluid'>
                                        {/* <ReactDataTablePagination arrayOfObjects={arrayOfObjects} dataInOnePage={5} /> */}

                                        {/* {typeof window !=='undefined' ?'trueee':'false mate'} */}
                                        {!isSSR && <DataTable columns={columns} data={dataSubs} pagination expandableRows expandableRowsComponent={Expa} />}
                                    </div>


                                </Col>

                            </Row>
                            <Modal isOpen={modal} toggle={() => { setModal(false); setisEdited(false); }}>
                                <ModalHeader toggle={() => { setModal(false); }} style={{ color: "#1f4f67" }}>
                                    {isEdited === false ? <Icon.PlusCircle style={{ marginRight: "5px" }} /> : (<Icon.Edit2 style={{ marginRight: "5px" }} />)}
                                    {isEdited === false ? t('addCategory_hover') : t('editCategories_headings')}

                                </ModalHeader>
                                <ModalBody className='pb-0'>
                                    <FormGroup>
                                        {/* <InputGroup> */}
                                        <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>{t('name_headings')}</Label>
                                        <Input className='inputBox' style={{ marginTop: "0px" }} onChange={(e) => { setNameUnit(e.target.value); setIsValidInput(true); setVisible(false); sethiddenSuccess(false); }} />
                                        {/* </InputGroup> */}
                                    </FormGroup>
                                    <div className='d-flex justify-content-end'>
                                        <Button className='btn-icon-Modal px-2' onClick={() => { checkRepeatedValues(nameUnit).then((e) => { console.log("Returned Val: ", e); newUnit(e) }); }}>
                                            {t('add_btn')}
                                        </Button>
                                    </div>
                                </ModalBody>
                                <ModalFooter style={{ borderTop: "none" }}>

                                </ModalFooter>
                            </Modal>
                            <Modal isOpen={modalCsv} toggle={() => setModalCsv(false)}>
                                <ModalHeader toggle={() => setModalCsv(false)} style={{ color: "#1186a2" }}><Icon.PlusCircle style={{ marginRight: "5px" }} />{t('loadCategories_heading')}</ModalHeader>
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
                                            {t('add_btn')}
                                        </Button>

                                    </div>
                                </ModalBody>
                                <ModalFooter>

                                    {/* <Button color="secondary" onClick={() => { setModalCsv(false); }}>
                                        {t('cancel_btn')}
                                    </Button> */}
                                </ModalFooter>
                            </Modal>
                        </div >
                    </CardBody>
                </Card>
            </Col>
            <Col>
                <TotalRegistries txt={"Usuarios"} />
                <Transactions />

            </Col>
        </Row >
    );
};

export default UsuariosComp;
