import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ListGroup, ListGroupItem, Button, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import Select from 'react-select';
import SimpleBar from 'simplebar-react';

const TwoColumnComp = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [isEditClick, setIsEditClick] = React.useState(true);
    const [isOpenMenu, setIsOpenMenu] = React.useState({ myInformation: true, myCompany: false, payments: false });
    const [editTxt, setEditTxt] = React.useState("Mi información");

    const handleSubmit = () => {
        setIsOpen(!isOpen);
    };
    const active = useSelector((state) => state.contactsReducer.currentFilter);
    const [modal, setModal] = React.useState(false);

    const toggle = () => {
        setModal(!modal);
    };
    useEffect(() => {
        if (isOpenMenu.myInformation === true) {
            var element = document.getElementById("myCompany");
            element.style.display = "none";
            var element2 = document.getElementById("myInformation");
            element2.style.display = "block";
            var element3 = document.getElementById("paymentConfiguration");
            element3.style.display = "none";
            setEditTxt("Mi información")
        }
        if (isOpenMenu.myCompany === true) {
            var element = document.getElementById("myInformation");
            element.style.display = "none";
            var element2 = document.getElementById("myCompany");
            element2.style.display = "block";
            var element3 = document.getElementById("paymentConfiguration");
            element3.style.display = "none";
            setEditTxt("Empresa");
        }
        if (isOpenMenu.payments === true) {
            var element = document.getElementById("paymentConfiguration");
            element.style.display = "block";
            var element2 = document.getElementById("myCompany");
            element2.style.display = "none";
            var element3 = document.getElementById("myInformation");
            element3.style.display = "none";
            setEditTxt("Configuración de pago");
        }
    }, [isOpenMenu])

    return (
        <div className="d-lg-flex d-md-block border position-relative leftRightBox">
            <div className={`leftPart flex-shrink-0 border-end ${isOpen ? 'showLeftPart' : ''}`}>
                <Button className="d-lg-none d-md-block openCloseBtn" color="info">
                    <i className={`bi ${isOpen ? 'bi-x' : 'bi-list'}`} onClick={handleSubmit} />
                </Button>
                <SimpleBar style={{ height: 'calc(100vh - 200px)' }}>

                    <div className="p-3 border-bottom">
                        <Button className='btn-icon-Modal' block onClick={() => setIsEditClick(false)}>
                            <i className="bi bi-pencil mx-1"></i>Editar {editTxt}
                        </Button>
                    </div>
                    <ListGroup className='pb-4' flush>
                        <h6 className="px-3 pt-3">Datos </h6>
                        <ListGroupItem

                            tag="a"
                            className={active === 'show_all' ? ' py-3 border-0' : 'py-3 border-0'}
                            // onClick={() => {
                            //     var element = document.getElementById("myCompany");
                            //     element.style.display = "none";
                            //     var element2 = document.getElementById("myInformation");
                            //     element2.style.display = "block";
                            // }}
                            onClick={() => setIsOpenMenu({ myInformation: true, myCompany: false, payments: false })}
                        >
                            <i className="bi bi-person mx-1" /> Mi información
                        </ListGroupItem>




                        <ListGroupItem

                            tag="a"
                            className=' py-3 border-0 mb-3'
                            onClick={() => setIsOpenMenu({ myInformation: false, myCompany: true, payments: false })}
                            
                        >
                            <i className="bi bi-buildings mx-1" /> Empresa
                        </ListGroupItem>
                        <ListGroupItem
                           
                            tag="a"
                            className=' border-0 mb-3'
                            onClick={() => setIsOpenMenu({ myInformation: false, myCompany: true, payments: true })}

                        >
                            <i className="bi bi-cash-coin"></i> Configuración de pago
                        </ListGroupItem>
                    </ListGroup>
                </SimpleBar>
            </div>
            <div className="rightPart">
                <div id='myInformation' className='mt-4'>
                    <div className='container-fluid'>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Nombre</Label>
                                    <Input value="Magdiel Elienai" className='inputBox' style={{ marginTop: "0px" }} disabled={isEditClick} />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Apellido</Label>
                                    <Input value="Jiménez Tabla" className='inputBox' style={{ marginTop: "0px" }} disabled={isEditClick} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Calle</Label>
                                    <Input value="Ladera del Cubilete" className='inputBox' style={{ marginTop: "0px" }} disabled={isEditClick} />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Colonia</Label>
                                    <Input value="La Ladera" className='inputBox' style={{ marginTop: "0px" }} disabled={isEditClick} />
                                </FormGroup>
                            </Col>
                            <Col md="2">
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Número Interior</Label>
                                    <Input value="" className='inputBox' style={{ marginTop: "0px" }} disabled={isEditClick} />
                                </FormGroup>
                            </Col>
                            <Col md="2">
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Número Exterior</Label>
                                    <Input value="211" className='inputBox' style={{ marginTop: "0px" }} disabled={isEditClick} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="2">
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Código postal</Label>
                                    <Input value="76148" className='inputBox' style={{ marginTop: "0px" }} disabled={isEditClick} />
                                </FormGroup>
                            </Col>

                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Ciudad</Label>
                                    <Input value="Querétaro" className='inputBox' style={{ marginTop: "0px" }} disabled={isEditClick} />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Estado</Label>
                                    <Input value="Querétaro" className='inputBox' style={{ marginTop: "0px" }} disabled={isEditClick} />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>País</Label>
                                    <Input value="México" className='inputBox' style={{ marginTop: "0px" }} disabled={isEditClick} />
                                </FormGroup>
                            </Col>

                        </Row>
                        <Row>
                            <Col md="4">
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>No. Celular</Label>
                                    <Input value="(442)-333-6440" className='inputBox' style={{ marginTop: "0px" }} disabled={isEditClick} />
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Correo electrónico</Label>
                                    <Input value="magdiel.jimenez@freebug.mx" className='inputBox' style={{ marginTop: "0px" }} disabled={isEditClick} />
                                </FormGroup>
                            </Col>
                            <div className='d-flex justify-content-end align-items-end'>
                                <Row>
                                    <Col>

                                        <Button className='btn-icon-Modal mx-2' block onClick={() => setIsEditClick(true)}>
                                            Guardar
                                        </Button>
                                    </Col>

                                </Row>
                            </div>
                        </Row>

                    </div>
                </div>
                <div id='myCompany' className='mt-4'>

                    <div className='container-fluid'>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Nombre Empresa</Label>
                                    <Input value="Zaveria México" className='inputBox' style={{ marginTop: "0px" }} disabled={isEditClick} />
                                </FormGroup>
                            </Col>

                        </Row>
                        <Row>
                            <Col md="6">
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>RFC</Label>
                                    <Input value="JITM000108R92" className='inputBox' style={{ marginTop: "0px" }} disabled={isEditClick} />
                                </FormGroup>
                            </Col>


                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label htmlFor="exampleFile">.CER</Label>
                                    <Input id='fileInput' type="file" placeholder='selecciona archivo' />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label htmlFor="exampleFile">.KEY</Label>
                                    <Input id='fileInput' type="file" placeholder='selecciona archivo' />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Calle</Label>
                                    <Input value="Ladera del Cubilete" className='inputBox' style={{ marginTop: "0px" }} disabled={isEditClick} />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Colonia</Label>
                                    <Input value="La Ladera" className='inputBox' style={{ marginTop: "0px" }} disabled={isEditClick} />
                                </FormGroup>
                            </Col>
                            <Col md="2">
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Número Interior</Label>
                                    <Input value="" className='inputBox' style={{ marginTop: "0px" }} disabled={isEditClick} />
                                </FormGroup>
                            </Col>
                            <Col md="2">
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Número Exterior</Label>
                                    <Input value="211" className='inputBox' style={{ marginTop: "0px" }} disabled={isEditClick} />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="2">
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Código postal</Label>
                                    <Input value="76148" className='inputBox' style={{ marginTop: "0px" }} disabled={isEditClick} />
                                </FormGroup>
                            </Col>

                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Ciudad</Label>
                                    <Input value="Querétaro" className='inputBox' style={{ marginTop: "0px" }} disabled={isEditClick} />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Estado</Label>
                                    <Input value="Querétaro" className='inputBox' style={{ marginTop: "0px" }} disabled={isEditClick} />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>País</Label>
                                    <Input value="México" className='inputBox' style={{ marginTop: "0px" }} disabled={isEditClick} />
                                </FormGroup>
                            </Col>

                        </Row>
                        <Row>
                            <Col md="4">
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>No. Celular</Label>
                                    <Input value="(442)-333-6440" className='inputBox' style={{ marginTop: "0px" }} disabled={isEditClick} />
                                </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Correo electrónico</Label>
                                    <Input value="magdiel.jimenez@freebug.mx" className='inputBox' style={{ marginTop: "0px" }} disabled={isEditClick} />
                                </FormGroup>
                            </Col>
                            <div className='d-flex justify-content-end align-items-end'>
                                <Row>
                                    <Col>

                                        <Button disabled={isEditClick} className='btn-icon-Modal mx-2' block onClick={() => setIsEditClick(true)}>
                                            Guardar
                                        </Button>
                                    </Col>

                                </Row>
                            </div>
                        </Row>

                    </div>
                </div>
                <div id='paymentConfiguration' className='mt-4'>
                    <div className='container-fluid'>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Forma de Pago</Label>
                                    <Select
                                        isDisabled={isEditClick}
                                        label="Single select"
                                        defaultValue={{ value: 'Nombre Item 2', label: 'Una sola exhibición' }}
                                        options={
                                            [{ value: 'Nombre Item 1', label: 'Parcialidades' },
                                            { value: 'Nombre Item 2', label: 'Una sola exhibición' }

                                            ]}

                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Método de Pago</Label>
                                    <Select
                                        label="Single select"
                                        isDisabled={isEditClick}

                                        defaultValue={{ value: 'Efectivo', label: 'Efectivo' }}
                                        options={
                                            [{ value: 'Tarjeta de crédito', label: 'Tarjeta de crédito' },
                                            { value: 'Tarjeta de débito', label: 'Tarjeta de débito' },
                                            { value: 'Efectivo', label: 'Efectivo' }
                                            ]}

                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <FormGroup>
                                    <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Note: Stripe payment form to be inserted</Label>
                                </FormGroup>
                            </Col>

                        </Row>
                        <div className='d-flex justify-content-end align-items-end'>
                            <Row>
                                <Col>

                                    <Button disabled={isEditClick} className='btn-icon-Modal mx-2' block onClick={() => setIsEditClick(true)}>
                                        Guardar
                                    </Button>
                                </Col>

                            </Row>
                        </div>


                    </div>
                </div>


            </div>
        </div>
    );
};

TwoColumnComp.propTypes = {
    leftContent: PropTypes.node,
    rightContent: PropTypes.node,
};

export default TwoColumnComp;