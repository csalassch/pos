
import { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import Select from 'react-select';
import { Table, Modal, ModalHeader, Alert, ModalBody, CardBody, ModalFooter, Button, Label, Row, Col, Card, Form, Input, FormGroup, Collapse, CardHeader } from 'reactstrap';
import Papa from "papaparse";
import useTranslation from '@/hooks/useTranslation';
import DataTable from 'react-data-table-component';
import Transactions from '../Transactions/transactions';
import TotalRegistries from '../TotalRegistries/totalRegistries';
import CatalogoPermisos from './catalogoPermisos';
import ExpandedRolesComponent from './ExpandedRolesComponent';
import Image from 'next/image';
import { useRouter } from 'next/router';
import ThreeColumnRoles from '../threeColumn/threeColumnRoles';

const RolesComp = () => {
    const router=useRouter();
    const { t } = useTranslation();
    const [modal, setModal] = useState(false);
    const [modalDetails, setModalDetails] = useState(false);
    const [isEditBtn, setIsEditBtn] = useState(false);
    
    const [showFilters, setShowFilters] = useState(false);
    const [dataItems2, setDataItems2] = useState([]);
    const [isSSR, setIsSSR] = useState(true);
    const dataItems = [];
    const [showPermits, setShowPermits] = useState({ items: false, sales: false, purchases: false, suppliers: false, admin: false });

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
    const columns = [
        {
            name: <div className="form-check d-flex flex-row">
                <input style={{ marginRight: "5px" }} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            </div>,
            selector: row => row.roleselect,
            minWidth: "5rem",
            maxWidth: "5em"
        }
        ,
        {
            name: t('txt_017'),
            selector: row => row.active,
            minWidth: "5rem",
            maxWidth: "5em"
        }
        ,

        {
            name: t('txt_008'),
            selector: row => row.name,
            maxWidth: "30em"
        }

        ,
        {
            name: t('txt_029'),
            selector: row => row.subsidiary,
            maxWidth: "30em"
        }
        ,
        {
            name: t('txt_036'),
            selector: row => row.users,
            minWidth: "5rem",
            maxWidth: "5em"
        },
        {
            name: t('txt_021'),
            selector: row => row.details,
            minWidth: "5rem",
            maxWidth: "5em"
        }
    ];

    const dataSubs = [
        {
            id: 1,
            roleselect: <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
            </div>,
            active:
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round" ></span>
                </label>
            ,
            subsidiary: "Freebug",
            name: "Administrador",
            users: "14",
            details: 
            <div className='d-flex justify-content-center'>
                <Button onClick={() => { setModalDetails(true) }} className='btn-icon-N' type="submit" style={{ fontSize: "11px", border: "none" }}><Icon.Info style={{ maxWidth: "18px" }} /></Button>
            </div>
        }
    ];


    let searchPlacehorlder = t('txt_078');
    if (searchPlacehorlder === "Seek") {
        searchPlacehorlder = "Search";
    }

    async function classifyPermits(classification) {
        const bunch = [];
        CatalogoPermisos(router).forEach((permit) => {
            if (permit.tipo === classification) {

                bunch.push({
                    id: permit.id,
                    permitSelect: <div className="form-check d-flex flex-row">
                        <input style={{ marginRight: "5px" }} className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    </div>,
                    name: permit.permiso
                });
            }
        });
        console.log("Bunch: ", bunch);
        return bunch;
    }
    useEffect(() => {
        setIsSSR(false);
        if (dataItems.length === 0) {
            classifyPermits("Artículos").then((list) => {
                dataItems = list;
                setDataItems2(list);
            });
            // classifyPermits("Ventas").then((list) => {
            //     setDataSales(list);
            // });
            // classifyPermits("Compras").then((list) => {
            //     setDataPurchases(list);
            // });
            // classifyPermits("Proveedores").then((list) => {
            //     setDataSuppliers(list);
            // });
            // classifyPermits("Administrativo").then((list) => {
            //     setDataAdmin(list);
            // });
        }
    }, []);
    return (
        <Row>
            <Col md="8">
                <div className="d-flex align-items-stretch">
                    <div className="p-1 align-self-stretch">
                        <Button title={t('txt_074')} className='btn btn-icon-N' onClick={() => { setModal(true) }} type="button"><Icon.Plus style={{ verticalAlign: "middle", position: "relative", width: "17px" }} />{t('txt_014')}</Button>
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
                    <CardBody>
                        <div>
                            <Row className='d-flex justify-content-center'>
                                <Col>
                                    {/* DataTable component */}
                                    <div className='container-fluid'>
                                        {!isSSR && <DataTable columns={columns} data={dataSubs} pagination expandableRows expandableRowsComponent={ExpandedRolesComponent} />}
                                    </div>
                                </Col>
                            </Row>
                            <Modal className='modal-lg' isOpen={modal} toggle={() => { setModal(false); setisEdited(false); }}>
                                <ModalHeader toggle={() => { setModal(false); }} style={{ color: "#1f4f67" }}>
                                    {isEdited === false ? <Icon.PlusCircle style={{ marginRight: "5px" }} /> : (<Icon.Edit2 style={{ marginRight: "5px" }} />)}
                                    {isEdited === false ? t('txt_074') : t('txt_083')}

                                </ModalHeader>
                                <ModalBody className='pb-0'>
                                    <FormGroup>
                                        {/* <InputGroup> */}
                                        <Row className='mb-3'>
                                            <Col md="6">
                                                <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>{t('txt_008')}</Label>
                                                <Input className='inputBox' style={{ marginTop: "0px" }} />
                                            </Col>
                                        </Row>
                                        <ThreeColumnRoles ids={[]}/>

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
                            <Modal className='modal-lg' isOpen={modalDetails} toggle={() => { setModalDetails(false); }}>
                                <ModalHeader toggle={() => { setModal(false); }} style={{ color: "#1f4f67" }}>
                                    <Icon.Info style={{ marginRight: "5px" }} />Detalles

                                </ModalHeader>
                                <ModalBody className='pb-0'>
                                    <FormGroup>
                                        <Row className='mb-3'>
                                            <Col md="6">
                                                <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>{t('txt_008')}</Label>
                                                <Input className='inputBox' style={{ marginTop: "0px" }} disabled={isEditBtn}/>
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <ThreeColumnRoles ids={CatalogoPermisos(router)} />

                                    <div className='d-flex justify-content-end'>
                                        <Button className='btn-icon-Modal px-2'>
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
            <Col>
                <TotalRegistries txt={"Roles"} />
                <Transactions />

            </Col>
        </Row >
    );
};

export default RolesComp;
