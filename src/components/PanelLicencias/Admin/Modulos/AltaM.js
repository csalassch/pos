import React, { useState, useEffect } from 'react';
import { Input, InputGroup, InputGroupText, Button, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Col, Row } from 'reactstrap';
import { useForm } from 'react-hook-form';
import Form from 'react-validation/build/form';

import { ref, push, } from 'firebase/database';
import * as Icon from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../../FirebaseConfig/firebase';
import ComponentCard from '../../../ComponentCard';

const AltaM = () => {
    const navigate = useNavigate();
    const { handleSubmit } = useForm();
    const [action, setAction] = useState("");
    const [Formvalue, setFormvalue] = useState({ nombre: '', descripcion: '' });
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
    };
    const onSubmit = () => {
        if (Formvalue.nombre !== '' && Formvalue.descripcion !== '') {
            push(ref(db, 'modules/'), {
                name: Formvalue.nombre,
                description: Formvalue.descripcion,
                active: "true"
            });
            setAction("envio");
            navigate("/servicios/PanelProductosAdmin");
        }
        else {
            setAction("vacio");
        }
    }
    const handleChange = ({ target: { name, value } }) => {
        setFormvalue({ ...Formvalue, [name]: value });
    };

    useEffect(() => {
    }, [Formvalue])
    return (
        <>
            <ComponentCard title="Introduzca los datos del módulo">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <Row>
                        <Col>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText style={{ width: "100px" }}>Nombre </InputGroupText>
                                    <Input onChange={handleChange} type="text" name="nombre" className="form-control" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText style={{ width: "100px" }}>Descripcion </InputGroupText>
                                    <Input onChange={handleChange} type="textarea" row="5" name="descripcion" className="form-control" />
                                </InputGroup>
                            </FormGroup>
                            <div className='w-full d-flex justify-content-center'>
                                <Button className="button btn-success" type="submit" onClick={() => { setModal(true); handleSubmit(onSubmit); }}>Guardar registro</Button>
                            </div>
                        </Col>
                        <Col>
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
                        </Col>
                    </Row>
                </Form>
            </ComponentCard>
        </>
    );
};
export default AltaM;