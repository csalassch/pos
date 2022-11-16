import React, { useState, useEffect } from 'react';
import { Input, InputGroup, InputGroupText, Button, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useForm } from 'react-hook-form';
import Form from 'react-validation/build/form';

import { ref, push, } from 'firebase/database';
import * as Icon from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../../FirebaseConfig/firebase';
import ComponentCard from '../../../ComponentCard';

const AltaP = () => {
    const navigate = useNavigate();
    const { handleSubmit } = useForm();
    const [action, setAction] = useState("");
    const [Formvalue, setFormvalue] = useState({ nombre: '', descripcion: '' });
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
    };
    const onSubmit = () => {
        if (Formvalue.nombre !== '' && Formvalue.descripcion !== '' ) {
            push(ref(db, 'products/'), {
                name: Formvalue.nombre,
                description: Formvalue.descripcion
            });
            setAction("envio")
            navigate("/servicios/PanelProductosAdmin")
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
            <ComponentCard title="INTRODUZCA LOS DATOS DEL PRODUCTO">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row'>
                        <div className='col'>
                            <FormGroup>
                                <InputGroup>
                                    <InputGroupText style={{width:"100px"}}>Nombre </InputGroupText>
                                    <Input onChange={handleChange} type="text" name="nombre" className="form-control" />
                                </InputGroup>
                            </FormGroup>
                            <FormGroup>
                            <InputGroup>
                                    <InputGroupText style={{width:"100px"}}>Descripcion </InputGroupText>
                                    <Input onChange={handleChange} type="textarea" row="5" name="descripcion" className="form-control" />
                                </InputGroup>
                                </FormGroup>
                        </div>
                        <div className='col'>
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
export default AltaP;