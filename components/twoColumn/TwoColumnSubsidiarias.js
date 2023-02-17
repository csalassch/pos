import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import * as Icon from 'react-feather';
import { ListGroup, ListGroupItem, Button, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import Select from 'react-select';
import SimpleBar from 'simplebar-react';
import useTranslation from '@/hooks/useTranslation';
import Image from 'next/image';

const TwoColumnSubsidiarias = () => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);
    const [isEditClick, setIsEditClick] = React.useState(true);
    const [isOpenMenu, setIsOpenMenu] = React.useState({ genInformation: true, address: false, datosFiscales: false, personalizarRecibo: false });
    const [editTxt, setEditTxt] = React.useState(t('txt_084'));
    //Banderitas para la lada del número telefonico
    const mexico = <div><img alt='Mexico Flag' src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Flag_of_Mexico.png/1200px-Flag_of_Mexico.png" height="20px" width="30px" /></div>;
    const usa = <div><img alt='USA Flag' src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png" height="20px" width="30px" /></div>;
    const france = <div><img alt='France Flag' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg/800px-Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg.png" height="20px" width="30px" style={{ marginRight: "7px" }} /></div>;
    const brazil = <div> <img alt='Brazil Flag' src="https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/1200px-Flag_of_Brazil.svg.png" height="20px" width="30px" /></div>;
    const israel = <div> <img alt='Israel Flag' src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Israel.svg/640px-Flag_of_Israel.svg.png" height="20px" width="30px" /></div>;
    const options = [
        { value: 'esMX', label: mexico },
        { value: 'en', label: usa },
        { value: 'fr', label: france },
        { value: 'pt', label: brazil },
        { value: 'he', label: israel },

    ];
    const handleSubmit = () => {
        setIsOpen(!isOpen);
    };
    const active = useSelector((state) => state.contactsReducer.currentFilter);
    const [modal, setModal] = React.useState(false);
    const [activeLink, setActiveLink] = React.useState({
        genInformation: true,
        address: false,
        datosFiscales: false,
        personalizarRecibo: false
    });

    const toggle = () => {
        setModal(!modal);
    };
    useEffect(() => {
        if (isOpenMenu.genInformation === true) {
            var element = document.getElementById("address");
            element.style.display = "none";
            var element2 = document.getElementById("genInformation");
            element2.style.display = "block";
            var element3 = document.getElementById("datosFiscales");
            element3.style.display = "none";
            var element4 = document.getElementById("personalizarRecibo");
            element4.style.display = "none";
            setEditTxt(t('txt_084'));
            setActiveLink({
                genInformation: true,
                address: false,
                datosFiscales: false,
                personalizarRecibo: false
            });
        }
        if (isOpenMenu.address === true) {
            var element = document.getElementById("genInformation");
            element.style.display = "none";
            var element2 = document.getElementById("address");
            element2.style.display = "block";
            var element3 = document.getElementById("datosFiscales");
            element3.style.display = "none";
            var element4 = document.getElementById("personalizarRecibo");
            element4.style.display = "none";
            setEditTxt(t('txt_085'));
            setActiveLink({
                genInformation: false,
                address: true,
                datosFiscales: false,
                personalizarRecibo: false
            });
        }
        if (isOpenMenu.datosFiscales === true) {
            var element = document.getElementById("datosFiscales");
            element.style.display = "block";
            var element2 = document.getElementById("address");
            element2.style.display = "none";
            var element3 = document.getElementById("genInformation");
            element3.style.display = "none";
            var element4 = document.getElementById("personalizarRecibo");
            element4.style.display = "none";
            setEditTxt(t('txt_086'));
            setActiveLink({
                genInformation: false,
                address: false,
                datosFiscales: true,
                personalizarRecibo: false
            });
        }
        if (isOpenMenu.personalizarRecibo === true) {
            var element = document.getElementById("datosFiscales");
            element.style.display = "none";
            var element2 = document.getElementById("address");
            element2.style.display = "none";
            var element3 = document.getElementById("genInformation");
            element3.style.display = "none";
            var element4 = document.getElementById("personalizarRecibo");
            element4.style.display = "block";
            setEditTxt(t('txt_086'));
            setActiveLink({
                genInformation: false,
                address: false,
                datosFiscales: false,
                personalizarRecibo: true
            });
        }
    }, [isOpenMenu])

    return (
        <div className="d-lg-flex d-md-block position-relative leftRightBox">
            <div className={`leftPartSub flex-shrink-0 border-end ${isOpen ? 'showLeftPart' : ''}`}>
                <Button className="d-lg-none d-md-block openCloseBtn" color="info">
                    <i className={`bi ${isOpen ? 'bi-x' : 'bi-list'}`} onClick={handleSubmit} />
                </Button>
                <SimpleBar style={{ height: 'calc(100vh - 200px)' }}>
                    <ListGroup className='pb-4' flush>
                        <ListGroupItem
                            tag="a"
                            className={activeLink.genInformation === true ? ' py-3 border-0 linkMatrizActive' : 'py-3 border-0 linkMatriz'}
                            onClick={() => setIsOpenMenu({ genInformation: true, address: false, datosFiscales: false, personalizarRecibo: false })}
                        >
                            {/* <i className="bi bi-person mx-1" />  */}
                            Información General
                        </ListGroupItem>
                        {/* <ListGroupItem
                            tag="a"
                            className={activeLink.address === true ? ' py-3 border-0 linkMatrizActive' : 'py-3 border-0 linkMatriz'}
                            onClick={() => setIsOpenMenu({ genInformation: false, address: true, datosFiscales: false, personalizarRecibo: false })}
                        >
                            Dirección
                        </ListGroupItem> */}
                        <ListGroupItem
                            tag="a"
                            className={activeLink.datosFiscales === true ? ' py-3 border-0 linkMatrizActive' : 'py-3 border-0 linkMatriz'}
                            onClick={() => setIsOpenMenu({ genInformation: false, address: false, datosFiscales: true, personalizarRecibo: false })}
                        >
                            {/* <i className="bi bi-cash-coin"></i>  */}
                            Datos fiscales
                        </ListGroupItem>
                        {/* <ListGroupItem
                            tag="a"
                            className={activeLink.personalizarRecibo === true ? ' py-3 border-0 linkMatrizActive' : 'py-3 border-0 linkMatriz'}
                            onClick={() => setIsOpenMenu({ genInformation: false, address: false, datosFiscales: false, personalizarRecibo: true })}
                        >
                            Personalizar recibo
                        </ListGroupItem> */}
                    </ListGroup>
                </SimpleBar>
            </div>
            <div className="rightPart">
                <div id='genInformation' className='mt-4 h-100'>
                    <div className='container-fluid h-100'>
                        <Row>
                            <Col>
                                <Row className='mb-4'>
                                    <Col>
                                        <div className="d-flex">

                                                {/* Logo de la matriz o empresa */}
                                                <div className='logoMatriz'>
                                                    <Image className='img-fluid rounded shadow-lg' id="imageProductRetrieved" alt='imageProduct' width={150} height={150} src="https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2FuploadImage.png?alt=media&token=ede51994-a2ff-4679-a19a-7f6a86407df3" />
                                                    <div className='overlay d-flex align-items-center justify-content-center'><Icon.Plus /><br></br><span>Subir logo</span></div>
                                                </div>
                                            <div className='mx-3'>
                                                {/* Nombre de vista previa del formulario */}
                                                <h3>VRT Ingeniería</h3>
                                                <p>www.vrt_ingenieria.com</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>{t('txt_008')}</Label>
                                            <Input className='inputBox' style={{ marginTop: "0px" }} />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Propietario</Label>
                                            <Select
                                                id="selectInputs2"
                                                label="Single select"
                                                options={
                                                    [{ value: 'Nombre Item 1', label: 'Prop 1' },
                                                    { value: 'Nombre Item 2', label: 'Prop 2' }
                                                    ]}
                                            />                                </FormGroup>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Sitio web comercial</Label>
                                            <Input type='text' className='inputBox' style={{ marginTop: "0px" }} />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Tipo de empresa</Label>
                                            <Select
                                                id="selectInputs4"
                                                label="Single select"
                                                options={
                                                    [{ value: 'Nombre Item 1', label: 'Física' },
                                                    { value: 'Nombre Item 2', label: 'Móvil' }
                                                    ]}
                                            />
                                        </FormGroup>
                                    </Col>

                                </Row>

                            </Col>


                        </Row>
                        <div className='d-flex justify-content-end align-items-end'>
                            <Row>
                                <Col className='mt-auto' >

                                    <Button className='btn-icon-Modal mx-2' block onClick={() => setIsEditClick(true)}>
                                        Agregar
                                    </Button>
                                </Col>
                            </Row>
                        </div>


                    </div>
                </div>
                <div id='address' className='mt-4'>

                    <div className='container-fluid'>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Calle, número y colonia</Label>
                                    <Input className='inputBox' style={{ marginTop: "0px" }} />
                                </FormGroup>
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Apartamento, local, etc.</Label>
                                    <Input className='inputBox' style={{ marginTop: "0px" }} type="text" />
                                </FormGroup>
                            </Col>


                        </Row>

                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Código Postal</Label>
                                    <Input className='inputBox' style={{ marginTop: "0px" }} />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>País</Label>
                                    <Select
                                        id="selectInputs5"
                                        label="Single select"
                                        options={
                                            [{ value: 'Nombre Item 1', label: 'Parcialidades' },
                                            { value: 'Nombre Item 2', label: 'Una sola exhibición' }
                                            ]}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Estado</Label>
                                    <Select
                                        id="selectInputs6"
                                        label="Single select"
                                        options={
                                            [{ value: 'Nombre Item 1', label: 'Parcialidades' },
                                            { value: 'Nombre Item 2', label: 'Una sola exhibición' }
                                            ]}
                                    />                                </FormGroup>
                            </Col>

                        </Row>
                        <Row>


                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>{t('txt_093')}</Label>
                                    <Input className='inputBox' style={{ marginTop: "0px" }} />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Teléfono</Label>
                                    <Input className='inputBox' style={{ marginTop: "0px" }} />
                                </FormGroup>
                            </Col>
                            <Col style={{ maxWidth: "110px" }}>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}></Label>

                                    <Select
                                        id="flagSelect"

                                        // className='languageSelected'
                                        value={[{ value: "esMX", label: mexico }]}
                                        label="Selecciona Idioma"
                                        options={options}

                                    />
                                </FormGroup>
                            </Col>

                        </Row>
                        <Row>
                            <div className='d-flex justify-content-end'>

                                <Col md="2">
                                    <Button className='btn-icon-Modal mx-2' block onClick={() => setIsEditClick(true)}>
                                        Agregar
                                    </Button>
                                </Col>
                            </div>
                        </Row>


                    </div>
                </div>
                <div id='datosFiscales' className='mt-4'>
                    <div className='container-fluid'>
                        <Row>
                            <Col md="10">
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Razón Social</Label>
                                    <Input className='inputBox' style={{ marginTop: "0px" }} type="text" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>RFC</Label>
                                    <Input className='inputBox' style={{ marginTop: "0px" }} type="text" />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup id='datosFiscalesSelect'>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Régimen Fiscal</Label>
                                    <Select
                                        id="selectInputs2"
                                        label="Single select"
                                        defaultValue={{ value: 'Nombre Item 2', label: 'reg 1' }}
                                        options={
                                            [{ value: 'Nombre Item 1', label: 'reg 2' },
                                            { value: 'Nombre Item 2', label: 'reg 3' }
                                            ]}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Calle, número y colonia</Label>
                                    <Input className='inputBox' style={{ marginTop: "0px" }} />
                                </FormGroup>
                            </Col>

                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Apartamento, local, etc.</Label>
                                    <Input className='inputBox' style={{ marginTop: "0px" }} type="text" />
                                </FormGroup>
                            </Col>


                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Código Postal</Label>
                                    <Input className='inputBox' style={{ marginTop: "0px" }} />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>País</Label>
                                    <Select
                                        id="selectInputs5"
                                        label="Single select"
                                        options={
                                            [{ value: 'Nombre Item 1', label: 'Parcialidades' },
                                            { value: 'Nombre Item 2', label: 'Una sola exhibición' }
                                            ]}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Estado</Label>
                                    <Select
                                        id="selectInputs6"
                                        label="Single select"
                                        options={
                                            [{ value: 'Nombre Item 1', label: 'Parcialidades' },
                                            { value: 'Nombre Item 2', label: 'Una sola exhibición' }
                                            ]}
                                    />                                </FormGroup>
                            </Col>

                        </Row>
                        <Row>


                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>{t('txt_093')}</Label>
                                    <Input className='inputBox' style={{ marginTop: "0px" }} />
                                </FormGroup>
                            </Col>
                            <Col md="6">
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Teléfono</Label>
                                    <Input className='inputBox' style={{ marginTop: "0px" }} />
                                </FormGroup>
                            </Col>
                            <Col style={{ maxWidth: "110px" }}>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}></Label>

                                    <Select
                                        id="flagSelect"

                                        // className='languageSelected'
                                        value={[{ value: "esMX", label: mexico }]}
                                        label="Selecciona Idioma"
                                        options={options}

                                    />
                                </FormGroup>
                            </Col>

                        </Row>

                        <div className='d-flex justify-content-end align-items-end'>
                            <Row>
                                <Col>
                                    <Button className='btn-icon-Modal mx-2' block onClick={() => setIsEditClick(true)}>
                                        Agregar
                                    </Button>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
                <div id='personalizarRecibo' className='mt-4'>
                    <div className='container-fluid h-100'>
                        <Row>
                            <Col>
                                <Row>
                                    {/* Logo del recibo personalizado */}
                                    <div className='d-flex justify-content-start'>
                                        <div className='logoMatriz'>
                                            <Image className='img-fluid rounded shadow-lg' id="imageProductRetrieved" alt='imageProduct' width={150} height={150} src="https://picsum.photos/seed/picsum/450/450" />
                                            <div className='overlay d-flex align-items-center justify-content-center'><Icon.Plus /><br></br><span>Subir logo</span></div>
                                        </div>
                                    </div>
                                    <Col>
                                        <FormGroup>
                                            <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Cantidad de recibos</Label>
                                            <Input type="number" className='inputBox' style={{ marginTop: "0px" }} />
                                        </FormGroup>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Texto encabezado</Label>
                                            <Input type="textarea" className='inputBox' style={{ marginTop: "0px" }} />

                                        </FormGroup>
                                    </Col>

                                </Row>
                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Texto pie de página</Label>
                                            <Input type="textarea" className='inputBox' style={{ marginTop: "0px" }} />

                                        </FormGroup>
                                    </Col>

                                </Row>
                                <Row>
                                    <Label check>
                                        <Input type="checkbox" style={{ marginRight: "3px" }} />
                                        Mostrar la dirección de la sucursal
                                    </Label>
                                    <Label check>
                                        <Input type="checkbox" style={{ marginRight: "3px" }} />
                                        Mostrar el teléfono de la sucursal
                                    </Label>
                                    <Label check>
                                        <Input type="checkbox" style={{ marginRight: "3px" }} />
                                        Mostrar código del artículo
                                    </Label>
                                    <Label check>
                                        <Input type="checkbox" style={{ marginRight: "3px" }} />
                                        Mostrar datos del cajero
                                    </Label>
                                    <Label check>
                                        <Input type="checkbox" style={{ marginRight: "3px" }} />
                                        Mostrar información del cliente
                                    </Label>
                                </Row>
                                <Row className='mt-3'>
                                    <div className='d-flex justify-content-end'>

                                        <Col md="2" >

                                            <Button className='btn-icon-Modal mx-2' block onClick={() => setIsEditClick(true)}>
                                                Agregar
                                            </Button>
                                        </Col>
                                    </div>

                                </Row>
                            </Col>
                            <Col md="5">
                                Vista previa
                            </Col>
                        </Row>



                    </div>
                </div>
            </div>
        </div>
    );
};

TwoColumnSubsidiarias.propTypes = {
    leftContent: PropTypes.node,
    rightContent: PropTypes.node,
};

export default TwoColumnSubsidiarias;