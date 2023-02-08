
import { useEffect, useState } from 'react';
import * as Icon from 'react-feather';
import Select from 'react-select';
import { Table, Modal, ModalHeader, Alert, ModalBody, CardBody, ModalFooter, Label, Row, Col, Card, Form, Input, FormGroup, Collapse, CardHeader } from 'reactstrap';
import Papa from "papaparse";
import useTranslation from '@/hooks/useTranslation';
import DataTable from 'react-data-table-component';
import { useRouter } from 'next/router';
import Transactions from '../Transactions/transactions';
import TotalRegistries from '../TotalRegistries/totalRegistries';
import Badge from 'react-bootstrap/Badge';
import CatalogoPermisos from './catalogoPermisos';
import ExpandedRolesComponent from './ExpandedRolesComponent';

const PermisosComp = () => {
    const router = useRouter();
    const { t } = useTranslation();
    const [showPermits, setShowPermits] = useState({ items: false, sales: false, purchases: false, suppliers: false, admin: false });
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
            name: t('txt_017'),
            selector: row => row.active,
            minWidth: "5rem",
            maxWidth: "5em"
        }
        ,

        {
            name: t('txt_008'),
            selector: row => row.name,
            maxWidth: "50em"
        }
    ];

    const dataSubs = [
        {
            id: 1,
            active:
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round" ></span>
                </label>
            ,
            name: "Administrador"
        }
    ];


    let searchPlacehorlder = t('txt_078');

    const [isSSR, setIsSSR] = useState(true);
    const [dataItems2, setDataItems2] = useState([]);
    const [dataSales, setDataSales] = useState([]);
    const [dataPurchases, setDataPurchases] = useState([]);
    const [dataSuppliers, setDataSuppliers] = useState([]);
    const [dataAdmin, setDataAdmin] = useState([]);
    const dataItems = [];
    async function classifyPermits(classification) {
        const bunch = [];
        CatalogoPermisos(router).forEach((permit) => {
            if (permit.tipo === classification) {
                bunch.push({
                    id: permit.id,
                    active: <label className="switch">
                        <input type="checkbox" />
                        <span className="slider round" ></span>
                    </label>,
                    name: permit.permiso
                });
            }
        });
        return bunch;
    }

    useEffect(() => {
        setIsSSR(false);
        if (dataItems.length === 0) {
            classifyPermits("Artículos").then((list) => {
                dataItems = list;
                setDataItems2(list);
            });
            classifyPermits("Ventas").then((list) => {
                setDataSales(list);
            });
            classifyPermits("Compras").then((list) => {
                setDataPurchases(list);
            });
            classifyPermits("Proveedores").then((list) => {
                setDataSuppliers(list);
            });
            classifyPermits("Administrativo").then((list) => {
                setDataAdmin(list);
            });
        }
        

    },[router]);
    return (
        <Row>
            <Col >
                <div className="d-flex align-items-stretch">
                    <div className="p-1 align-self-stretch" style={{ marginLeft: "auto" }}>
                        <Input className='searchBar' type="text" placeholder={searchPlacehorlder} style={{ border: "none" }} />
                    </div>
                </div>
                <Row>
                    <Col md="4" className='mt-3 py-3'>
                        <Card style={{ cursor: "pointer" }} className='border-0' onClick={() => { setShowPermits({ items: !showPermits.items, sales: showPermits.sales, purchases: showPermits.purchases, suppliers: showPermits.suppliers, admin: showPermits.admin }) }}>
                            <CardBody>
                                <div>
                                    <Row className='d-flex justify-content-center'>
                                        <Col>
                                            <div className="container-fluid">

                                                <div className='d-flex align-items-center justify-content-center'>

                                                    <img style={{ maxHeight: "120px", marginTop: "-4rem" }} alt='access' src='https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2FiconItem2.png?alt=media&token=659a426e-7e8e-4fc4-8f66-77b6a772c292' />


                                                    <h3 style={{ marginLeft: "5px" }} className='quickLinksHeadings'>{t('txt_076')}</h3>

                                                </div>
                                            </div>
                                        </Col>
                                    </Row>

                                </div >
                                <Collapse isOpen={showPermits.items} style={{ marginTop: "10px" }}>
                                    <Row style={{ marginBottom: "10px" }}>
                                        <Col >
                                            {!isSSR && <DataTable columns={columns} data={dataItems2} pagination responsive />}
                                        </Col>
                                    </Row>

                                </Collapse>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="4" className='py-3 mt-3'>
                        <Card style={{ cursor: "pointer" }} className='border-0' onClick={() => { setShowPermits({ items: showPermits.items, sales: !showPermits.sales, purchases: showPermits.purchases, suppliers: showPermits.suppliers, admin: showPermits.admin }) }}>
                            <CardBody>
                                <div>
                                    <Row className='d-flex justify-content-center'>
                                        <Col>
                                            <div className="container-fluid">

                                                <div className='d-flex align-items-center justify-content-center'>

                                                    <img style={{ maxHeight: "120px", marginTop: "-4rem" }} alt='access' src='https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2FiconVentas.png?alt=media&token=f4ef9eaf-92f9-4d16-997f-1a0f97c1719f' />


                                                    <h3 className='quickLinksHeadings'>{t('txt_004')}</h3>

                                                </div>
                                            </div>
                                        </Col>
                                    </Row>

                                </div >
                                <Collapse isOpen={showPermits.sales} style={{ marginTop: "10px" }}>
                                    <Row style={{ marginBottom: "10px" }}>

                                        <Col >
                                            {!isSSR && <DataTable columns={columns} data={dataSales} pagination responsive />}
                                        </Col>

                                    </Row>

                                </Collapse>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="4" className='py-3 mt-3'>
                        <Card style={{ cursor: "pointer" }} className='border-0' onClick={() => { setShowPermits({ items: showPermits.items, sales: showPermits.sales, purchases: !showPermits.purchases, suppliers: showPermits.suppliers, admin: showPermits.admin }) }}>
                            <CardBody>
                                <div>
                                    <Row className='d-flex justify-content-center'>
                                        <Col>
                                            <div className="container-fluid">

                                                <div className='d-flex align-items-center justify-content-center'>

                                                    <img style={{ maxHeight: "120px", marginTop: "-4rem" }} alt='access'
                                                        src='https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2FiconCompras.png?alt=media&token=d200bd67-8852-4235-99cc-e0f6840b01bb' />


                                                    <h3 className='quickLinksHeadings'>{t('txt_005')}</h3>

                                                </div>
                                            </div>
                                        </Col>
                                    </Row>

                                </div >
                                <Collapse isOpen={showPermits.purchases} style={{ marginTop: "10px" }}>
                                    <Row style={{ marginBottom: "10px" }}>

                                        <Col >
                                            {!isSSR && <DataTable columns={columns} data={dataPurchases} pagination responsive />}
                                        </Col>

                                    </Row>

                                </Collapse>
                            </CardBody>
                        </Card>
                    </Col>

                </Row>
                <Row >
                    <Col md="4" className='py-3 mt-3'>
                        <Card style={{ cursor: "pointer" }} className='border-0' onClick={() => { setShowPermits({ items: showPermits.items, sales: showPermits.sales, purchases: showPermits.purchases, suppliers: !showPermits.suppliers, admin: showPermits.admin }) }}>
                            <CardBody>
                                <div>
                                    <Row className='d-flex justify-content-center'>
                                        <Col>
                                            <div className="container-fluid">

                                                <div className='d-flex align-items-center justify-content-center'>

                                                    <img style={{ maxHeight: "120px", marginTop: "-4rem" }} alt='access'
                                                        src='https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2FiconProveedor.png?alt=media&token=4a3bd446-5d54-46d4-8e54-9b79b152be16' />


                                                    <h3 className='quickLinksHeadings'>{t('txt_006')}</h3>

                                                </div>
                                            </div>
                                        </Col>
                                    </Row>

                                </div >
                                <Collapse isOpen={showPermits.suppliers} style={{ marginTop: "10px" }}>
                                    <Row style={{ marginBottom: "10px" }}>
                                        <Col >
                                            {!isSSR && <DataTable columns={columns} data={dataSuppliers} pagination responsive />}
                                        </Col>
                                    </Row>

                                </Collapse>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="4" className='py-3 mt-3'>
                        <Card style={{ cursor: "pointer" }} className='border-0' onClick={() => { setShowPermits({ items: showPermits.items, sales: showPermits.sales, purchases: showPermits.purchases, suppliers: showPermits.suppliers, admin: !showPermits.admin }) }}>
                            <CardBody>
                                <div>
                                    <Row className='d-flex justify-content-center'>
                                        <Col>
                                            <div className="container-fluid">

                                                <div className='d-flex align-items-center justify-content-center'>

                                                    <img style={{ maxHeight: "120px", marginTop: "-4rem" }} alt='access' src='https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2FiconAdmin.png?alt=media&token=1e5de749-205c-4797-8fd0-f72a4e2b918f' />


                                                    <h3 className='quickLinksHeadings'>{t('txt_075')}</h3>

                                                </div>
                                            </div>
                                        </Col>
                                    </Row>

                                </div >
                                <Collapse isOpen={showPermits.admin} style={{ marginTop: "10px" }}>

                                    <Row style={{ marginBottom: "10px" }}>

                                        <Col >
                                            {!isSSR && <DataTable columns={columns} data={dataAdmin} pagination responsive />}
                                        </Col>

                                    </Row>

                                </Collapse>
                            </CardBody>
                        </Card>
                    </Col>


                </Row>

            </Col>

        </Row >
    );
};

export default PermisosComp;
