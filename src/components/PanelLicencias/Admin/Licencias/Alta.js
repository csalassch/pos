import React, { useState, useEffect } from 'react';
import { Button, FormGroup, Label, Table, Modal, ModalHeader, ModalBody, ModalFooter, Row, Col } from 'reactstrap';
import { useForm } from 'react-hook-form';
import Form from 'react-validation/build/form';

import { ref, push, } from 'firebase/database';
import * as Icon from 'react-feather';
import { useNavigate } from 'react-router-dom';
import { db } from '../../../../FirebaseConfig/firebase';
import ComponentCard from '../../../ComponentCard';

const Alta = () => {
    const navigate = useNavigate();
    const { handleSubmit } = useForm();
    const [lista, setLista] = useState([]);
    const [caracteristica, setCaracteristica] = useState('');
    const [idEliminar, setIdEliminar] = useState(0);
    const [action, setAction] = useState("");
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
            setFormvalue({ nombre: '', descripcion: '', producto: '', monto: '' })
            setAction("envio");
            setLista([]);
            navigate("/servicios/PanelLicenciasAdmin")
        }
        else {
            setAction("vacio");
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
        const listaAux = []
        const listaFiltrada = listaF.filter((item) => item.id !== (idEliminar));
        for (let i = 0; i < listaFiltrada.length; i++) {
            console.log(listaFiltrada[i])
            listaAux.push({ id: (i + 1), caracteristica: listaFiltrada[i].caracteristica });
        }
        setLista(listaAux)
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
    }, [Formvalue, caracteristica, lista])
    return (
        <>
            <ComponentCard title="INTRODUZCA LOS DATOS DE LICENCIA">
                <Form onSubmit={handleSubmit(onSubmit)}>
                    <div className='row'>
                        <div className='col'>
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
                                                            <div style={{ color: "	#d54747", cursor: "pointer" }} onClick={() => { setAction("del"); setIdEliminar(tdata.id); setModal(true); }}><Icon.Trash2 /></div>
                                                        </Col>
                                                    </Row>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>
                            </Table>
                            {action === "del" ?
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
                                </Modal> :
                                <Modal isOpen={modal} toggle={toggle.bind(null)}>
                                    {action === "vacio" ?
                                    <ModalHeader toggle={toggle.bind(null)}><Icon.AlertCircle /> Accion necesaria</ModalHeader>:
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
                                        <Button color="primary" onClick={() => {setModal(false); setFormvalue({}); }}>
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