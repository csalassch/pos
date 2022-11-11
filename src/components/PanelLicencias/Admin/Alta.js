import React, { useState, useEffect } from 'react';
import { Button, FormGroup, Label, Table } from 'reactstrap';
import { useForm } from 'react-hook-form';
import Form from 'react-validation/build/form';

import * as Icon from 'react-feather';
import ComponentCard from '../../ComponentCard';

const Alta = () => {
    const { register, handleSubmit } = useForm();
    // const [lista, setLista] = useState([]);
    const [lista, setLista] = useState([{ id: 0, caracteristica: '' }]);
    const [Formvalue, setFormvalue] = useState({nombre:'', descripcion:'', producto:'', monto:''});
    const onSubmit = () => {
        setLista([{ id: 0, caracteristica: '' }])
    };
    const handleChange = ({ target: { name, value } }) => {
        setFormvalue({...Formvalue, [name]: value});
    };
    useEffect(() => {
        console.log(register);
        console.log(Formvalue);
    }, [Formvalue])
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
                        <hr />
                    </div>
                    <div className='col'>
                        <Form>
                            <FormGroup>
                                <Label className="control-Label" htmlFor="caracteristica">Nueva caracteristica *</Label>
                                <div className='row'>
                                    <div className="col mb-2">
                                        <input type="text" name="caracteristica" className="form-control" />
                                    </div>
                                    <div className='col-2'>
                                        <Icon.PlusCircle style={{color:"blue"}} />
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
                                                <td>{tdata.nombre}</td>
                                                <td>{tdata.descripcion}</td>
                                                <td></td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </Table>
                            </FormGroup>
                        </Form>

                    </div>
                </div>
            </ComponentCard>
        </>
    );
};
export default Alta;