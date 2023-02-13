
import { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import Select from 'react-select';
import axios from "axios";

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
    const router = useRouter();
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
    async function consulta() {

        var data = {
            user_name: "Neal Sipes III",
            email: "Glenna_Prohaska@hotmail.com",
            table_prefix: "maroon.3dml",
            is_active: false,
            name: "Rocio",
            rol: "Direct Research Specialist",
            rfc: "fb85c647-9926-4648-aa99-f9aa17715dbe",
            phone: "625-667-5860",
            is_main_user: false,
            user_from_netsuite: true
        };
        // var data = JSON.stringify({
        //     "user_name": "Theodore Kshlerin"
        // });

        var config = {
            method: 'post',
            url: 'https://us-central1-bloona-ef12e.cloudfunctions.net/freebug_pos/users',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVhNTA5ZjAxOWY3MGQ3NzlkODBmMTUyZDFhNWQzMzgxMWFiN2NlZjciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYmxvb25hLWVmMTJlIiwiYXVkIjoiYmxvb25hLWVmMTJlIiwiYXV0aF90aW1lIjoxNjc1OTYxNTA0LCJ1c2VyX2lkIjoiUnh3dk5oQnZ6aWFyd0tEeXdkeEQ0SE1wQ1U4MyIsInN1YiI6IlJ4d3ZOaEJ2emlhcndLRHl3ZHhENEhNcENVODMiLCJpYXQiOjE2NzU5NjE1MDQsImV4cCI6MTY3NTk2NTEwNCwiZW1haWwiOiJnaGRnZmhkNjc4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJnaGRnZmhkNjc4QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.BHpP7vmU8YIzJ-SWMgEtIeouGp8DnkcBB95sxQP0ZHkOwugvWh-K-2inFaSVhJ5TS2QGhoL1xKurbkO39MTyPrdHeJF_THDwlWPzYyMPEn-pgQQvK9me0GyA23JiM7vvBS_w1agT84sbSUm084porcMXCsTiQGpboJenA07ExBfxj10fwaLu4_OV0_UGdBTCDnpbj3UfhmdicX3zPWgO5k6n9Avy26sbA5q3mly2oj9xRbbLIFVl6ksY4fXBzO-YytDfTiCZdvynolHvUK7C53yB96Ah_8C9GORC_b5uqE79wu9olM2ZcqwD615l7_O0pLG0OMDiA_2rf9tzrp4FPA',
                'Content-Type': 'application/json'
            },
            data: data
        };
        const headers = {
            'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVhNTA5ZjAxOWY3MGQ3NzlkODBmMTUyZDFhNWQzMzgxMWFiN2NlZjciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYmxvb25hLWVmMTJlIiwiYXVkIjoiYmxvb25hLWVmMTJlIiwiYXV0aF90aW1lIjoxNjc1OTYxNTA0LCJ1c2VyX2lkIjoiUnh3dk5oQnZ6aWFyd0tEeXdkeEQ0SE1wQ1U4MyIsInN1YiI6IlJ4d3ZOaEJ2emlhcndLRHl3ZHhENEhNcENVODMiLCJpYXQiOjE2NzU5NjE1MDQsImV4cCI6MTY3NTk2NTEwNCwiZW1haWwiOiJnaGRnZmhkNjc4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJnaGRnZmhkNjc4QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.BHpP7vmU8YIzJ-SWMgEtIeouGp8DnkcBB95sxQP0ZHkOwugvWh-K-2inFaSVhJ5TS2QGhoL1xKurbkO39MTyPrdHeJF_THDwlWPzYyMPEn-pgQQvK9me0GyA23JiM7vvBS_w1agT84sbSUm084porcMXCsTiQGpboJenA07ExBfxj10fwaLu4_OV0_UGdBTCDnpbj3UfhmdicX3zPWgO5k6n9Avy26sbA5q3mly2oj9xRbbLIFVl6ksY4fXBzO-YytDfTiCZdvynolHvUK7C53yB96Ah_8C9GORC_b5uqE79wu9olM2ZcqwD615l7_O0pLG0OMDiA_2rf9tzrp4FPA',
            'Content-Type': 'application/json'
        }

        await axios.post('https://us-central1-bloona-ef12e.cloudfunctions.net/freebug_pos/users', data, {
            headers: headers
        }).then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error)
            });
        // response.data.headers['Content-Type'];
        // console.log(response.data.headers['Content-Type']);

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
                    <div className="p-1 align-self-stretch">
                        <Button title={t('txt_074')} className='btn btn-icon-N' onClick={consulta} type="button"><Icon.Plus style={{ verticalAlign: "middle", position: "relative", width: "17px" }} />Consulta</Button>
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
                                        <ThreeColumnRoles ids={[]} />

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
                                                <Input className='inputBox' style={{ marginTop: "0px" }} disabled={isEditBtn} />
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
