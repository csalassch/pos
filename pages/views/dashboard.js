import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useRouter } from "next/router";
import * as Icon from 'react-feather';
import dynamic from 'next/dynamic'
import { Card, CardBody, CardTitle, CardSubtitle, Badge, Modal, ModalHeader, ModalBody, ModalFooter, Button, Row, Col } from 'reactstrap';
import DataTable from 'react-data-table-component';
import BreadCrumbs from "@/layouts/breadcrumbs/BreadCrumbs";
import LicenciaDescripcion from "@/components/HomeComponents/LicenciaDescripcion";
import useTranslation from "@/hooks/useTranslation";
import Link from "next/link";


function Dashboard() {

    const { t } = useTranslation();
    const seeInformationTxt=t('txtSeeInformation');
    const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
    const [user, setUser] = useState({
        email: "",
        username: ""
    });
    const router = useRouter();


    const getProfile = async () => {
        const response = await axios.get('/api/profile');
        setUser(response.data);
        console.log(response)
    }
    const logout = async () => {
        try {
            await axios.post('/api/auth/logout');
            router.push("/login");

        } catch (error) {
            console.log(error);
        }
    }

    //Fetched from other project of template
    const [modal, setModal] = useState(false);
    const columns = [
        {
            name: '#',
            selector: row => row.num,
        },
        {
            name: t('name_headings'),
            selector: row => row.name,
        },
        {
            name: t('txt_TotalSales'),
            selector: row => row.sales,
        },
    ];

    const data = [
        {
            id: 1,
            num: "1",
            name: 'Cuaderno Norma',
            sales: '567',
        },
        {
            id: 2,
            num: "2",
            name: 'Cuaderno Norma',
            sales: '567',
        },
        {
            id: 3,
            num: "3",
            name: 'Cuaderno Norma',
            sales: '567',
        },
        {
            id: 4,
            num: "4",
            name: 'Cuaderno Norma',
            sales: '567',
        },
        {
            id: 5,
            num: "5",
            name: 'Cuaderno Norma',
            sales: '567',
        },
        {
            id: 6,
            num: "6",
            name: 'Cuaderno Norma',
            sales: '567',
        },
        {
            id: 7,
            num: "7",
            name: 'Cuaderno Norma',
            sales: '567',
        },
        {
            id: 8,
            num: "8",
            name: 'Cuaderno Norma',
            sales: '567',
        },
        {
            id: 9,
            num: "9",
            name: 'Cuaderno Norma',
            sales: '567',
        },
        {
            id: 10,
            num: "10",
            name: 'Cuaderno Norma',
            sales: '567',
        },

    ]
    const toggle = () => {
        setModal(!modal);
    };
    const seriescolumn = [
        {
            name: 'Desktop',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        },
        {
            name: 'Mobile',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        },
        {
            name: 'Other',
            data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
        },
    ];
    const optionscolumn = {
        colors: ['#077cab', '#101820', '#ef5350'],
        chart: {
            fontFamily: "'Roboto', sans-serif",
        },
        plotOptions: {
            bar: {
                horizontal: false,
                endingShape: 'rounded',
                columnWidth: '65%',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent'],
        },
        xaxis: {
            categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
            labels: {
                style: {
                    colors: "#077cab",
                    fontSize: "13px",
                    fontWeight: "500"
                    // cssClass: 'grey--text lighten-2--text fill-color',
                },
            },
        },
        yaxis: {
            title: {
                text: '$ (thousands)',
                style: {
                    color: "#077cab",
                    fontSize: "13px",
                    fontWeight: "500"
                }
            },
            labels: {
                style: {
                    colors: "#077cab",
                    fontSize: "13px",
                    fontWeight: "500"
                    // cssClass: 'textAxis',
                    // cssClass: 'grey--text lighten-2--text fill-color',
                },
            },

        },
        fill: {
            opacity: 1,
        },
        tooltip: {
            theme: 'dark',
            y: {
                formatter(val) {
                    return `$ ${val} thousands`;
                },
            },
        },
        grid: {
            borderColor: 'rgba(0,0,0,0.1)',
        },
        legend: {
            show: true,
            position: 'bottom',
            width: '50px',
            fontFamily: "'Roboto', sans-serif",
            labels: {
                colors: '#077cab',
            },
        },
    };

    return (
        <>
            <StyledPage>
                <div className="boxContainer p-4 container-fluid">


                    <BreadCrumbs className="breadCrumbs"/>
                    <div className='row mt-3'>
                        <div className='col-md-6 col-sm-8'>

                            <Card className='homeWelcomeCard border-0'>
                                {/* <Card style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2Fhandwaving3%20(900%20%C3%97%20300%C2%A0px).png?alt=media&token=9af9ceec-ca86-40a4-ad03-d63896b096a8')", backgroundSize: "contain", margin: "0" }}> */}
                                <CardBody className='m-0 pb-0'>
                                    <Row>

                                        <Col className='col-md-8 col-sm-6'>
                                            <h1 className="display-7 txtWelcome">{t('txtHello')}<br /><strong>Magdiel Elienai Jiménez Tabla!</strong></h1>
                                            <p className='lead txtWelcome'>
                                            {t('txtWelcome')} Koonol
                                            </p>
                                        </Col>

                                        <Col className='col-md-4 col-sm-6'>
                                            <img
                                                className='helloImage'

                                                alt='helloKonool' src='https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2FHello%20(3).png?alt=media&token=0731a8b9-3896-444c-82e7-ded61de64b69' />

                                            {/* <div style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2FHello.png?alt=media&token=6ff16889-9f27-4171-be5f-0af5b4a65357')", backgroundSize: "contain", width: "200px", backgroundRepeat: "no-repeat" }}>
    
                        </div> */}
                                        </Col>

                                    </Row>
                                </CardBody>
                            </Card>
                        </div >
                        {/* <div className='col'> */}


                        {/* <Feeds /> */}
                        {/* </div > */}
                    </div>

                    <div className='row mt-3'>
                        <div className='col align-self-stretch'>
                            <Row>
                                <h3 className='outsideCardHeadings' >{t('quickLinks')}</h3>

                                <Col className='mt-5 col-md-4 col-sm'>
                                    <Card className="border-0">

                                        <CardBody>
                                            <div className="container-fluid">

                                                <div className='d-flex align-items-center justify-content-center'>

                                                    <img style={{ maxHeight: "120px", marginTop: "-4rem" }} alt='access' src='https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2FiconVentas.png?alt=media&token=f4ef9eaf-92f9-4d16-997f-1a0f97c1719f' />


                                                    <h4 className='quickLinksHeadings'>{t('txt_TotalSales')}</h4>

                                                </div>
                                            </div>




                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col className='mt-5 col-md-4 col-sm'>
                                    <Card className="border-0">

                                        <CardBody>
                                            <div className="container-fluid">

                                                <div className='d-flex align-items-center justify-content-center'>

                                                    <img style={{ maxHeight: "120px", marginTop: "-4rem" }} alt='access' src='https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2FiconCompras.png?alt=media&token=d200bd67-8852-4235-99cc-e0f6840b01bb' />

                                                    <h4 className='quickLinksHeadings'>{t('txtPurchases')}</h4>



                                                </div>
                                            </div>


                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col className='mt-5 col-md-4 col-sm'>
                                    <Card className="border-0">

                                        <CardBody>
                                            <div className="container-fluid">

                                                <div className='d-flex align-items-center justify-content-center'>
                                                    <img style={{ maxHeight: "120px", marginTop: "-4rem" }} alt='access' src='https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2FiconProveedor.png?alt=media&token=4a3bd446-5d54-46d4-8e54-9b79b152be16' />
                                                    <h4 className='quickLinksHeadings'>{t('txtSuppliers')}</h4>


                                                </div>
                                            </div>


                                        </CardBody>
                                    </Card>
                                </Col>

                            </Row>
                            <Row>
                                <Col>
                                    <h3 className='outsideCardHeadings' >{t('txt_monthlySales')}</h3>
                                    <Card className="border-0">

                                        <CardBody>

                                            <Chart options={optionscolumn} series={seriescolumn} type="bar" height={280} width={"100%"} />
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>


                        </div>
                        <div className='col-md-4 align-self-stretch'>
                            <h3 className='outsideCardHeadings' >{t('txt_TopItemsSold')}</h3>
                            <Card className="border-0">
                                <CardBody>
                                    <DataTable
                                        columns={columns}
                                        data={data}
                                    />

                                </CardBody>
                            </Card>
                        </div>

                    </div>
                    {/* Licencias  Compradas*/}
                    <div className='row mt-4'>
                        <div className='col'>
                            <h3 className='outsideCardHeadings' >{t('txtMyServices')}</h3>
                            <Card className="border-0">

                                <CardBody>
                                    <Row>
                                        <Col>
                                            <LicenciaDescripcion txtSeeInformation={ seeInformationTxt} />
                                        </Col>
                                        <Col>
                                            <LicenciaDescripcion txtSeeInformation={t('txtSeeInformation')} />
                                        </Col>
                                        <Col>
                                            <LicenciaDescripcion txtSeeInformation={ seeInformationTxt}/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <LicenciaDescripcion txtSeeInformation={ seeInformationTxt} />
                                        </Col>
                                        <Col>
                                            <LicenciaDescripcion txtSeeInformation={ seeInformationTxt} />
                                        </Col>
                                        <Col>
                                            <LicenciaDescripcion txtSeeInformation={ seeInformationTxt}/>
                                        </Col>
                                    </Row>

                                </CardBody>
                            </Card>

                        </div>

                    </div>
                    <Modal isOpen={modal} toggle={toggle.bind(null)}>
                        <ModalHeader toggle={toggle.bind(null)}><Icon.AlertCircle /> Borrar Unidad</ModalHeader>
                        <ModalBody>
                            <Card className="border-0">
                                <div className="img-fluid" />
                                <CardBody>
                                    <CardTitle className="mt-2" tag="h3">
                                        Business development of rules 2022
                                    </CardTitle>
                                    <Badge color='info' className='rounded-pill text-dark-white mt-3'>Technology</Badge>
                                    <CardSubtitle className="text-muted mt-4 fs-5">Titudin venenatis ipsum aciat. Vestibu ullamer quam. nenatis ipsum ac feugiat. Ibulum ullamcorper venenatis ipsum aciat ipsum aciat. Titudin venenatis ipsum aciat</CardSubtitle>
                                    <div className='d-flex align-items-center mt-4 pt-1'>
                                        <Link href='/' className='text-decoration-none link-info fw-normal'>Read more</Link>
                                        <div className='ms-auto'>
                                            <Link href='/' className='text-decoration-none link-dark'><i className='bi bi-heart-fill fs-5'></i></Link>
                                            <Link href='/' className='text-decoration-none link-dark ms-2'><i className='bi bi-share-fill fs-5'></i></Link>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => { setModal(false); }}>
                                Confirmar
                            </Button>
                            <Button color="secondary" onClick={toggle.bind(null)}>
                                Cancelar
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
            </StyledPage>
        </>
    );

}

export default Dashboard;
const StyledPage=styled.div`
background-color: {({ theme }) => theme.backgroundColor };
color: {({ theme }) => theme.fontColor };
`;