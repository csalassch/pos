import React, { useState, useEffect } from 'react';
import { CardSubtitle, CardTitle, CardBody, Row, Col, Table } from 'reactstrap';

import * as Icon from "react-feather";
import { onValue, ref } from 'firebase/database';
import { db } from '../../../../FirebaseConfig/firebase';

const DetallesLicencia = ({ id }) => {
    const [lista, setLista] = useState([]);
    const [Formvalue, setFormvalue] = useState({ nombre: '', descripcion: '', producto: '', monto: '' });

    function getCaracteristicasLicencia() {
        onValue(ref(db, `licenses/${id}`), snapshot => {
            const licencia = {
                id: snapshot.key,
                caracteristicas: snapshot.val().caracteristicas
            }
            console.log(licencia)
            setLista(licencia.caracteristicas);
        });
    }
    function getDatosLicencia() {
        onValue(ref(db, `licenses/${id}`), snapshot => {
            const licencia = {
                id: snapshot.key,
                nombre: snapshot.val().name,
                producto: snapshot.val().product,
                descripcion: snapshot.val().description,
                monto: snapshot.val().amount,
                active: snapshot.val().active
            }
            setFormvalue({ nombre: licencia.nombre, descripcion: licencia.descripcion, producto: licencia.producto, monto: licencia.monto, active: licencia.active })
        });
        getCaracteristicasLicencia();
    }

    useEffect(() => {
        if (lista.length === 0) {
            getDatosLicencia();
        }
    }, [Formvalue])
    return (
        <>
            <CardBody className="p-2">
                <div className="text-center mt-2 ">
                    {/* <img src={img1} className="rounded-circle" width="100" alt="" /> */}
                    <Icon.Folder style={{ scale: "2" }} className="mb-3" />
                    <CardTitle tag="h4" className="mt-2 mb-0">
                        {Formvalue.nombre}
                    </CardTitle>
                </div>
            </CardBody>
            <CardBody className="border-top pt-4">
                <CardSubtitle className="text-muted d-flex justify-content-center">{Formvalue.descripcion}</CardSubtitle>
                <Row className="text-center justify-content-md-center mt-3">
                    <Col xs="4">
                        <CardSubtitle className="text-muted fs-5 d-flex justify-content-center">Estado</CardSubtitle>
                        <CardTitle tag="h5">
                            {Formvalue.active === true ? <div>
                                <Row><Col>
                                    <Icon.ToggleRight style={{ color: "#fca311" }} />
                                </Col></Row>
                                <Row><Col>
                                    Activo
                                </Col></Row>
                            </div> : <div>
                                <Row><Col>
                                    <Icon.ToggleLeft />
                                </Col></Row>
                                <Row><Col>
                                    Inactivo
                                </Col></Row>
                            </div>}
                        </CardTitle>
                    </Col>
                    <Col xs="4">
                        <CardSubtitle className="text-muted fs-5 d-flex justify-content-center">Producto</CardSubtitle>
                        <CardTitle tag="h5">{Formvalue.producto}</CardTitle>
                    </Col>
                    <Col xs="4">
                        <CardSubtitle className="text-muted fs-5 d-flex justify-content-center">Monto</CardSubtitle>
                        <CardTitle tag="h5">${(Formvalue.monto % 1 === 0 ? `${Formvalue.monto}.00` : (Formvalue.monto).toFixed(2))}</CardTitle>
                    </Col>
                </Row>
                <div className="d-flex w-full justify-content-center" >
                    <div style={{ width: "75%" }} >
                        <Table className="no-wrap mt-3" responsive borderless>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Caracteristica</th>
                                </tr>
                            </thead>
                            <tbody>
                                {lista.map((tdata) => (
                                    <tr key={tdata.id} className="border-top">
                                        <td>{tdata.id}</td>
                                        <td>{tdata.caracteristica}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </CardBody>
        </>
    );
};
export default DetallesLicencia;