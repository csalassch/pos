import React, { useState, useEffect } from 'react';
import { Input, InputGroup, InputGroupText, Button, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter, Label } from 'reactstrap';
import { useForm } from 'react-hook-form';
import Form from 'react-validation/build/form';

import { ref, push, } from 'firebase/database';
import * as Icon from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { db } from '../../FirebaseConfig/firebase';
import ComponentCard from '../ComponentCard';

const Alta = () => {
    const navigate = useNavigate();
    const { handleSubmit } = useForm();
    const [action, setAction] = useState("");
    const [Formvalue, setFormvalue] = useState({ nombre: '' });
    const [modal, setModal] = useState(false);
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
    }, [Formvalue])
    return (
        <>
            <ComponentCard title="INTRODUZCA LOS DATOS DEL REGISTRO">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row'>
                        <div className='col'>
                            <FormGroup>

                                <InputGroup>
                                    <InputGroupText style={{ width: "100px" }}>Nombre </InputGroupText>
                                    <Input onChange={handleChange} type="text" name="nombre" className="form-control" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText style={{ width: "100px" }}>Apellido </InputGroupText>
                                    <Input onChange={handleChange} type="text" name="apellido" className="form-control" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText style={{ width: "100px" }}>Compañia </InputGroupText>
                                    <Input onChange={handleChange} type="text" name="compania" className="form-control" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText style={{ width: "100px" }}>RFC </InputGroupText>
                                    <Input onChange={handleChange} type="text" name="rfc" className="form-control" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText style={{ width: "100px" }}>Correo </InputGroupText>
                                    <Input onChange={handleChange} type="text" name="correo" className="form-control" />
                                </InputGroup>
                            </FormGroup>
                            <div className='d-flex align-items-center p-2'>
                                <Label check>¿Es compañia?</Label>
                                <FormGroup check>
                                    <Input type="checkbox" name="esCompania" />
                                </FormGroup>
                            </div>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText style={{ width: "100px" }}>Web Site </InputGroupText>
                                    <Input onChange={handleChange} type="text" name="webSite" className="form-control" />
                                </InputGroup>
                            </FormGroup>
                            <div className='d-flex align-items-center p-2'>
                                <Label check>¿Requiere factura?</Label>
                                <FormGroup check>
                                    <Input type="checkbox" name="factura" />
                                </FormGroup>
                            </div>
                            
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText style={{ width: "150px" }}>Forma de pago </InputGroupText>
                                    <Input onChange={handleChange} type="text" name="paymentForm" className="form-control" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText style={{ width: "150px" }}>Metodo de pago </InputGroupText>
                                    <Input onChange={handleChange} type="text" name="paymentMethod" className="form-control" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText style={{ width: "100px" }}>CFDI </InputGroupText>
                                    <Input onChange={handleChange} type="text" name="cfdiUssage" className="form-control" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText style={{ width: "100px" }}>Tipo de entidad </InputGroupText>
                                    <Input onChange={handleChange} type="text" name="entityType" className="form-control" />
                                </InputGroup>
                            </FormGroup>
                        </div>
                        <div className='col-3'>
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
                        </div>
                        <Button className="button btn-info w-full" type="submit" onClick={() => { setModal(true); handleSubmit(onSubmit); }}>Realizar registro</Button>
                    </div>
                </Form>
            </ComponentCard>
        </>
    );
};
export default Alta;