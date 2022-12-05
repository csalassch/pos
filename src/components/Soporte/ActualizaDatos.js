import React, { useState, useEffect } from 'react';
import { Input, InputGroup, InputGroupText, Button, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Label, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import Form from 'react-validation/build/form';

import { ref, update } from 'firebase/database';
import * as Icon from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { db } from '../../FirebaseConfig/firebase';
import ComponentCard from '../ComponentCard';
import { metodoPago, formaPago, usoCFDI, optionsLada } from "./DataActualiza";

const ActualizaDatos = ({ datos }) => {
    const navigate = useNavigate();
    const { handleSubmit } = useForm();
    const [action, setAction] = useState("");
    const [stamp, setStamp] = useState(false);
    const [Formvalue, setFormvalue] = useState({ name: '', isCompany: "Fisica", companyName: '', rfc: '', mail: '', mainPhone: '', mainPhoneLada: '', paymentForm: '', paymentMethod: '', cfdiUssage: '', entityType: '' });
    const [modal, setModal] = useState(false);
    const fisicaMoral = [{ id: "Fisica", value: "Fisica", label: "Fisica" }, { id: "Moral", value: "Moral", label: "Moral" }]

    const toggle = () => {
        setModal(!modal);
    };
    // const [file, setFile] = useState('');
    // const [visible, setVisible] = useState(false);
    const onSubmit = () => {
        if (false) {
            update(ref(db, 'usuarios/'), {
                name: Formvalue.nombre,
                description: Formvalue.descripcion
            });
            setAction("envio")
            navigate("/")
        }
        else {
            setAction("vacio");
        }
    }
    const handleChange = ({ target: { name, value } }) => {
        setFormvalue({ ...Formvalue, [name]: value });
    };
    function getDataUser() {
        if (Formvalue.name === '' && datos) {
            setFormvalue({
                name: datos.name,
                password: datos.password,
                isCompany: datos.isCompany || "Fisica",
                companyName: datos.companyName,
                rfc: datos.rfc || "XAXX010101000",
                mail: datos.mail,
                mainPhone: datos.mainPhone || "0123456789",
                mainPhoneLada: datos.mainPhoneLada || "00",
                paymentForm: datos.paymentForm,
                paymentMethod: datos.paymentMethod,
                cfdiUssage: datos.cfdiUssage,
                entityType: datos.entityType,
                lada: datos.lada || { id: optionsLada[0].value, label: optionsLada[0].label}
            });
        }
    }
    useEffect(() => {
        getDataUser();
    }, [Formvalue, stamp])
    return (
        <>
            <ComponentCard title="Edite los datos del usuario">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText style={{ width: "100px" }}>Nombre</InputGroupText>
                                    <Input onChange={handleChange} type="text" name="name" className="form-control" value={Formvalue.name} />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup >
                                    <Row style={{ width: "100%", marginRight: 0, marginLeft: 0 }}>
                                        <Col md="2" className='p-0'>
                                            <InputGroupText style={{ width: "100%", height: "100%" }}>Tipo</InputGroupText>
                                        </Col>
                                        <Col className='p-0'>
                                            <div style={{ width: "100%" }}>
                                                <Select
                                                    options={fisicaMoral}
                                                    style={{ width: 100 }}
                                                    name="tipo"
                                                    value={{ value: Formvalue.isCompany, label: Formvalue.isCompany }}
                                                    onChange={(e) => { setFormvalue({ ...Formvalue, isCompany: e.value }); }}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </InputGroup>
                            </FormGroup>
                            {Formvalue.isCompany === "Moral" ?
                                <div>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupText style={{ width: "100px" }}>Compañia </InputGroupText>
                                            <Input onChange={handleChange} type="text" name="companyName" className="form-control" value={Formvalue.companyName} />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupText style={{ width: "100px" }}>Sitio web </InputGroupText>
                                            <Input type="text" name="webSite" className="form-control" value={Formvalue.webSite} />
                                        </InputGroup>
                                    </FormGroup>
                                </div>
                                : <div></div>
                            }
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText style={{ width: "100px" }}>RFC </InputGroupText>
                                    <Input onChange={handleChange} type="text" name="rfc" className="form-control" value={Formvalue.rfc} />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText style={{ width: "100px" }}>Correo </InputGroupText>
                                    <Input onChange={handleChange} type="text" name="email" className="form-control" value={Formvalue.mail} />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText style={{ width: "100px" }}>Contraseña </InputGroupText>
                                    <Input onChange={handleChange} type="text" name="password" className="form-control" value={Formvalue.password} />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText style={{ width: "120px" }}>No. Telefonico </InputGroupText>
                                    <div style={{ width: "20%" }}>
                                        <Select id="languageSelected" label="Selecciona lada" options={optionsLada}
                                            onChange={(e) => { setFormvalue({ ...Formvalue, lada: { id:e.value, label: e.label} }); }}
                                            value={Formvalue.lada ?{value: Formvalue.lada.id, label: Formvalue.lada.label } :  { id: optionsLada[0].value, label: optionsLada[0].label}}
                                        />
                                    </div>
                                    <div className='d-flex align-items-center w-full'>
                                        <Input style={{ width: "50%", height: "100%" }} maxLength={10} onChange={handleChange} type="text" name="mainPhone" className="form-control" value={Formvalue.mainPhone} />
                                    </div>
                                </InputGroup>
                            </FormGroup>
                            <div className='d-flex align-items-center p-2'>
                                <Label check>¿Requiere factura?</Label>
                                <FormGroup check>
                                    <Input onClick={(e) => { setStamp(e.target.checked) }} defaultValue="" type="checkbox" name="requiredStamp" />
                                </FormGroup>
                            </div>
                            <FormGroup>
                                <InputGroup >
                                    <Row style={{ width: "100%", marginRight: 0, marginLeft: 0 }}>
                                        <Col md="3" className='p-0'>
                                            <InputGroupText style={{ height: "100%" }}>CFDI</InputGroupText>
                                        </Col>
                                        <Col className='p-0'>
                                            <div style={{ width: "100%" }}>
                                                <Select
                                                    options={usoCFDI}
                                                    style={{ width: "100px" }}
                                                    name="tipo"
                                                    onChange={(e) => { setFormvalue({ ...Formvalue, cfdiUssage: e.value }); }}
                                                    value={{ label: Formvalue.cfdiUssage, value: Formvalue.cfdiUssage }}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup >
                                    <Row style={{ width: "100%", marginRight: 0, marginLeft: 0 }}>
                                        <Col md="3" className='p-0'>
                                            <InputGroupText style={{ height: "100%" }}>Forma de pago</InputGroupText>
                                        </Col>
                                        <Col className='p-0'>
                                            <div style={{ width: "100%" }}>
                                                <Select
                                                    options={formaPago}
                                                    style={{ width: "100px" }}
                                                    name="tipo"
                                                    onChange={(e) => { setFormvalue({ ...Formvalue, paymentForm: e.value }); }}
                                                    value={{ label: Formvalue.paymentForm, value: Formvalue.paymentForm }}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup >
                                    <Row style={{ width: "100%", marginRight: 0, marginLeft: 0 }}>
                                        <Col md="3" className='p-0'>
                                            <InputGroupText style={{ height: "100%" }}>Método de pago</InputGroupText>
                                        </Col>
                                        <Col className='p-0'>
                                            <div style={{ width: "100%" }}>
                                                <Select
                                                    options={metodoPago}
                                                    style={{ width: "100px" }}
                                                    name="tipo"
                                                    onChange={(e) => { setFormvalue({ ...Formvalue, paymentMethod: e.value }); }}
                                                    value={{ label: Formvalue.paymentMethod, value: Formvalue.paymentMethod }}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </InputGroup>
                            </FormGroup>
                        </Col>
                        <Col>
                        </Col>
                        {action === "del" ?
                            <Modal isOpen={modal} toggle={toggle.bind(null)}>
                                <ModalHeader toggle={toggle.bind(null)}><Icon.AlertCircle /> Borrar Unidad</ModalHeader>
                                <ModalBody>
                                    ¿Seguro que quieres eliminar la caracteristica?
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={() => { setModal(false) }}>
                                        Confirmar
                                    </Button>
                                    <Button color="secondary" onClick={toggle.bind(null)}>
                                        Cancelar
                                    </Button>
                                </ModalFooter>
                            </Modal> :
                            <Modal isOpen={modal} toggle={toggle.bind(null)}>
                                {action === "vacio" ?
                                    <ModalHeader toggle={toggle.bind(null)}><Icon.AlertCircle /> Accion necesaria</ModalHeader> :
                                    <ModalHeader toggle={toggle.bind(null)}><Icon.Check /> Exito</ModalHeader>}
                                {action === "vacio" ?
                                    <ModalBody>
                                        Debe llenar todos los campos
                                    </ModalBody> :
                                    <ModalBody>
                                        Se ha realizado correctamente el registro
                                    </ModalBody>
                                }
                                <ModalFooter>
                                    <Button color="primary" onClick={() => { setModal(false); setFormvalue({}); }}>
                                        Confirmar
                                    </Button>
                                </ModalFooter>
                            </Modal>
                        }
                        <Button className="button btn-info w-full" type="submit" onClick={() => { setModal(true); handleSubmit(onSubmit); }}>Realizar registro</Button>
                    </Row>
                </Form>
            </ComponentCard>
        </>
    );
};
export default ActualizaDatos;