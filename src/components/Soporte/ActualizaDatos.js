import React, { useState, useEffect } from 'react';
import { Input, InputGroup, InputGroupText, Button, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Label, Row, Col } from 'reactstrap';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import Form from 'react-validation/build/form';

import { ref, push, } from 'firebase/database';
import * as Icon from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { db } from '../../FirebaseConfig/firebase';
import ComponentCard from '../ComponentCard';

const ActualizaDatos = ({ datos }) => {
    const navigate = useNavigate();
    const { handleSubmit } = useForm();
    const [action, setAction] = useState("");
    const [stamp, setStamp] = useState(false);
    const [Formvalue, setFormvalue] = useState({ name: '',tipo: "Fisica", companyName: '', rfc: '', mail: '', mainPhone: '', paymentForm: '', paymentMethod: '', cfdiUssage: '', entityType: '' });
    const [modal, setModal] = useState(false);
    const fisicaMoral = [{ id: "Fisica", value: "Fisica", label: "Fisica" }, { id: "Moral", value: "Moral", label: "Moral" }]
    const toggle = () => {
        setModal(!modal);
    };
    const onSubmit = () => {
        if (Formvalue.nombre !== '') {
            push(ref(db, 'entity/'), {
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

    useEffect(() => {
        if(Formvalue.name === '' && datos){
            setFormvalue({ 
                name: datos.name,
                tipo: "Fisica", 
                companyName: datos.companyName, 
                rfc: datos.rfc, 
                mail: datos.mail, 
                mainPhone: datos.mainPhone, 
                paymentForm: datos.paymentForm, 
                paymentMethod: datos.paymentMethod, 
                cfdiUssage: datos.cfdiUssage, 
                entityType: datos.entityType });
        }
        console.log(Formvalue)
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
                                    <Input onChange={handleChange} type="text" name="name" className="form-control" value={Formvalue.name}/>
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
                                                    onChange={(e) => { setFormvalue({ ...Formvalue, tipo: e.value }); }}
                                                    value={{label:Formvalue.tipo, value:Formvalue.tipo}}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </InputGroup>
                            </FormGroup>
                            {Formvalue.tipo === "Moral" ?
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
                                    <Input onChange={handleChange} type="text" name="email" className="form-control" value={Formvalue.mail}/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText style={{ width: "100px" }}>Contraseña </InputGroupText>
                                    <Input onChange={handleChange} type="text" name="password" className="form-control" value={Formvalue.password}/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText style={{ width: "120px" }}>No. Telefonico </InputGroupText>
                                    <Input onChange={handleChange} type="text" name="mainPhone" className="form-control" value={Formvalue.mainPhone} />
                                </InputGroup>
                            </FormGroup>
                            <div className='d-flex align-items-center p-2'>
                                <Label check>¿Requiere factura?</Label>
                                <FormGroup check>
                                    <Input onClick={(e) => { setStamp(e.target.checked) }} defaultValue="" type="checkbox" name="requiredStamp" />
                                </FormGroup>
                            </div>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText style={{ width: "100px" }}>CFDI </InputGroupText>
                                    <Input onChange={handleChange} type="text" name="cfdiUssage" className="form-control" value={Formvalue.cfdiUssage}/>
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText style={{ width: "150px" }}>Forma de pago </InputGroupText>
                                    <Input onChange={handleChange} type="text" name="paymentForm" className="form-control" value={Formvalue.paymentForm} />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText style={{ width: "150px" }}>Metodo de pago </InputGroupText>
                                    <Input onChange={handleChange} type="text" name="paymentMethod" className="form-control" value={Formvalue.paymentMethod}/>
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