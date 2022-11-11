import React, { useState, useEffect } from 'react';
import { Button, FormGroup, Label, Table, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import { useForm } from 'react-hook-form';
import Form from 'react-validation/build/form';

import { ref, push, } from 'firebase/database';
import * as Icon from 'react-feather';
import { db } from '../../../FirebaseConfig/firebase';
import ComponentCard from '../../ComponentCard';

const Alta = () => {
    const { handleSubmit } = useForm();
    const [lista, setLista] = useState([]);
    const [caracteristica, setCaracteristica] = useState('');
    const [idEliminar, setIdEliminar] = useState(0);
    const [Formvalue, setFormvalue] = useState({ nombre: '', descripcion: '', producto: '', monto: '' });
    const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
    };
    const onSubmit = () => {
        if (Formvalue.nombre !== '' && Formvalue.descripcion !== '' && Formvalue.producto !== '' && Formvalue.monto !== '' && lista.length !== 0) {
            push(ref(db, 'licenses/'), {
                name: Formvalue.nombre,
                description: Formvalue.descripcion,
                product: Formvalue.producto,
                amount: Formvalue.monto,
                caracteristicas: lista
            });
        }
    }
    const handleChange = ({ target: { name, value } }) => {
        setFormvalue({ ...Formvalue, [name]: value });
    };
    const handleChangeList = ({ target: { value } }) => {
        setCaracteristica(value)
    };
    function deleteCharacteristic() {
        const listaF = lista;
        const listafiltrada = listaF.filter((item) => item.id !== (idEliminar-1));
        setLista(listafiltrada)
        console.log(lista);
    }
    function addLicense() {
        if (caracteristica !== '') {
            const listAux = lista;
            listAux.push({ id: (lista.length + 1), caracteristica: caracteristica });
            setLista(listAux);
            setCaracteristica('');
        }
    }
    useEffect(() => {
        console.log(lista)
    }, [Formvalue, caracteristica, lista])
    return (
        <>
            <ComponentCard title="INTRODUZCA LOS DATOS LICENCIA">
                <div className='row'>
                    <div className='col'>
                        <Form onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup>
                                <Label className="control-Label" htmlFor="nombre">Nombre *</Label>
                                <div className="mb-2">
                                    <input onChange={handleChange} type="text" name="nombre" className="form-control" />
                                </div>
                                <span className="text-danger"></span>
                            </FormGroup>
                            <FormGroup>
                                <Label className="control-Label" htmlFor="descripcion">Descripcion *</Label>
                                <div className="mb-2">
                                    <textarea onChange={handleChange} type="text" name="descripcion" className="form-control" />
                                </div>
                                <span className="text-danger"></span>
                            </FormGroup>
                            <FormGroup>
                                <Label className="control-Label" htmlFor="producto">Producto *</Label>
                                <div className="mb-2">
                                    <input onChange={handleChange} type="text" name="producto" className="form-control" />
                                </div>
                                <span className="text-danger"></span>
                            </FormGroup>
                            <FormGroup>
                                <Label className="control-Label" htmlFor="monto">Monto $ *</Label>
                                <div className="mb-2">
                                    <input onChange={handleChange} type="number" name="monto" className="form-control" />
                                </div>
                                <span className="text-danger"></span>
                            </FormGroup>

                            <FormGroup>
                                <Button className="button btn-info" type="submit">
                                    Submit
                                </Button>
                            </FormGroup>
                        </Form>
                    </div>
                    <div className='col'>
                        <Label className="control-Label" htmlFor="caracteristica">Nueva caracteristica *</Label>
                        <div className='row'>
                            <div className="col mb-2">
                                <input type="text" name="caracteristica" className="form-control" value={caracteristica} onChange={handleChangeList} />
                            </div>
                            <div className='col-2' type="submit" onClick={addLicense}>
                                <Icon.PlusCircle style={{ color: "blue" }} />
                            </div>
                        </div>
                        <Table className="no-wrap mt-3 align-middle" responsive borderless>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Caracteristica</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lista.map((tdata) => (
                                    <tr key={tdata.id} className="border-top">
                                        <td>{tdata.id}</td>
                                        <td>{tdata.caracteristica}</td>
                                        <td>
                                            <div>
                                                <Row>
                                                    <Col md="2">
                                                        <div style={{ color: "	#d54747", cursor: "pointer" }} onClick={() => { setIdEliminar(tdata.id); setModal(true); }}><Icon.Trash2 /></div>
                                                    </Col>
                                                </Row>
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>
                        <Modal isOpen={modal} toggle={toggle.bind(null)}>
                            <ModalHeader toggle={toggle.bind(null)}><Icon.AlertCircle /> Borrar Unidad</ModalHeader>
                            <ModalBody>
                                ¿Seguro que quieres eliminar la caracteristica?
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={() => { deleteCharacteristic(); setModal(false) }}>
                                    Confirmar
                                </Button>
                                <Button color="secondary" onClick={toggle.bind(null)}>
                                    Cancelar
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
            </ComponentCard>
        </>
    );
};
export default Alta;