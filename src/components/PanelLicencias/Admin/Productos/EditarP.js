import React, { useState, useEffect } from 'react';
import { Input, InputGroup, InputGroupText, Button, FormGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { useForm } from 'react-hook-form';
import Form from 'react-validation/build/form';

import { onValue, ref, update } from 'firebase/database';
import * as Icon from 'react-feather';
import { db } from '../../../../FirebaseConfig/firebase';

const EditarP = ({ id }) => {
    const { handleSubmit } = useForm();
    const [action, setAction] = useState("");
    const [Formvalue, setFormvalue] = useState({ nombre: '', descripcion: '' });
    const [FormvalueRef, setFormvalueRef] = useState({ nombre: '', descripcion: '' });
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
    };

    const handleChange = ({ target: { name, value } }) => {
        setFormvalue({ ...Formvalue, [name]: value });
        console.log(Formvalue)
    }
    function getDatosProducto() {
        onValue(ref(db, `products/${id}`), snapshot => {
            const productos = {
                id: snapshot.key,
                nombre: snapshot.val().name,
                descripcion: snapshot.val().description
            }
            setFormvalue({ nombre: productos.nombre, descripcion: productos.descripcion })
            setFormvalueRef({ nombre: productos.nombre, descripcion: productos.descripcion })
        });
    }
    const onSubmit = () => {
        if (Formvalue !== FormvalueRef) {
            console.log(Formvalue, " ", FormvalueRef)
            if (Formvalue.nombre !== '' && Formvalue.descripcion !== '') {
                update(ref(db, `products/${id}`), {
                    name: Formvalue.nombre,
                    description: Formvalue.descripcion
                });
                setAction("envio");
            }
            else {
                setAction("vacio");
            }
        }
        else {
            setAction("ESC")
        }
    }
    useEffect(() => {
        getDatosProducto();
    }, [])
    return (
        <>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <InputGroup>
                        <InputGroupText>Nombre </InputGroupText>
                        <Input onChange={handleChange} value={Formvalue.nombre} type="text" name="nombre" className="form-control" />
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <InputGroupText>Descripcion </InputGroupText>
                        <Input onChange={handleChange} value={Formvalue.descripcion} type="textarea" row="5" name="descripcion" className="form-control" />
                    </InputGroup>
                </FormGroup>
                <div className='w-full d-flex justify-content-center'>
                    <Button className="button btn-success" type="submit" onClick={() => { setModal(true); handleSubmit(onSubmit); }}>Guardar cambios</Button>
                </div>

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
                    </Modal> : <Modal></Modal>}
                {action === "envio" ?
                    <Modal isOpen={modal} toggle={toggle.bind(null)}>
                        <ModalHeader toggle={toggle.bind(null)} ><Icon.Check /> Exito</ModalHeader>
                        <ModalBody>
                            Carga Exitosa
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => { setModal(false); }}>
                                Confirmar
                            </Button>
                        </ModalFooter>
                    </Modal> : <Modal></Modal>}
                {action === "ESC" ?
                    <Modal isOpen={modal} toggle={toggle.bind(null)}>
                        <ModalHeader toggle={toggle.bind(null)}><Icon.AlertCircle /> Advertencia</ModalHeader>
                        <ModalBody>
                            Tiene que realizar cambios
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => { setModal(false); }}>
                                Confirmar
                            </Button>
                        </ModalFooter>
                    </Modal> : <Modal></Modal>}
                {action === "vacio" ?
                    <Modal isOpen={modal} toggle={toggle.bind(null)}>
                        <ModalHeader toggle={toggle.bind(null)}><Icon.AlertCircle /> Advertencia</ModalHeader>
                        <ModalBody>
                            Tiene que realizar cambios
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={() => { setModal(false); }}>
                                Confirmar
                            </Button>
                        </ModalFooter>
                    </Modal> : <Modal></Modal>}
            </Form>
        </>
    );
};
export default EditarP;