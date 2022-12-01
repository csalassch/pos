import React, { useState, useEffect } from 'react';
import { CardSubtitle, CardTitle, CardBody } from 'reactstrap';

import * as Icon from "react-feather";
import { onValue, ref } from 'firebase/database';
import { db } from '../../../../FirebaseConfig/firebase';

const DetallesProducto = ({ id, muestra }) => {
    const [Formvalue, setFormvalue] = useState({ nombre: '', descripcion: '' });


    function getDatosProducto() {
        if (muestra === "prod") {
            onValue(ref(db, `products/${id}`), snapshot => {
                const productos = {
                    id: snapshot.key,
                    nombre: snapshot.val().name,
                    descripcion: snapshot.val().description
                }
                setFormvalue({ nombre: productos.nombre, descripcion: productos.descripcion })
            });
        }
        if (muestra === "mod") {
            onValue(ref(db, `modules/${id}`), snapshot => {
                const productos = {
                    id: snapshot.key,
                    nombre: snapshot.val().name,
                    descripcion: snapshot.val().description
                }
                setFormvalue({ nombre: productos.nombre, descripcion: productos.descripcion })
            });
        }
    }

    useEffect(() => {
        getDatosProducto();
    }, [Formvalue])
    return (
        <>
            <CardBody className="p-2">
                <div className="text-center mt-2 ">
                    <Icon.Folder style={{ scale: "2" }} className="mb-3" />
                    <CardTitle tag="h4" className="mt-2 mb-0">
                        {Formvalue.nombre}
                    </CardTitle>
                </div>
            </CardBody>
            <CardBody className="border-top pt-4">
                <CardSubtitle className="text-muted d-flex justify-content-center">{Formvalue.descripcion}</CardSubtitle>
            </CardBody>
        </>
    );
};
export default DetallesProducto;