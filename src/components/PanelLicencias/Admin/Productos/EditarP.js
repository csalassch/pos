import React, { useState, useEffect } from 'react';
import { Input, InputGroup, InputGroupText, Button, FormGroup, FormFeedback, Alert } from 'reactstrap';
import { useForm } from 'react-hook-form';
import Form from 'react-validation/build/form';
import * as Icon from 'react-feather';

import { onValue, ref, update } from 'firebase/database';
import { db } from '../../../../FirebaseConfig/firebase';

const EditarP = ({ id , muestra}) => {
    const { handleSubmit } = useForm();
    const [Formvalue, setFormvalue] = useState({ nombre: '', descripcion: '' });
    const [FormvalueRef, setFormvalueRef] = useState({ nombre: '', descripcion: '' });

    //Para el control de alertas o mensajes de errores
    const [message, setMessage] = useState("");
    const [visible, setVisible] = useState(false);
    const onDismiss = () => {
        setVisible(false);
    };
    const [colorAlert, setAlertColor] = useState("success");
    const [hiddenSuccess, sethiddenSuccess] = useState(false);
    const [isValidInput, setIsValidInput] = useState({ nombre: true, descripcion: true });
    const [messageFeedback, setMessageFeedback] = useState({ nombre: "", descripcion: "" });

    const handleChange = ({ target: { name, value } }) => {
        setMessageFeedback({ nombre: "", descripcion: "" });
        setIsValidInput({ nombre: true, descripcion: true });
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
        if (Formvalue.nombre !== FormvalueRef.nombre || Formvalue.descripcion !== FormvalueRef.descripcion) {
            if (Formvalue.nombre !== '' && Formvalue.descripcion !== '') {
                if (muestra === "prod") {
                    update(ref(db, `products/${id}`), {
                        name: Formvalue.nombre,
                        description: Formvalue.descripcion
                    });
                }
                if (muestra === "mod") {
                    update(ref(db, `modules/${id}`), {
                        name: Formvalue.nombre,
                        description: Formvalue.descripcion
                    });
                }

                setMessageFeedback({ nombre: "", descripcion: "" });
                setIsValidInput({ nombre: true, descripcion: true });
                setMessage("Se ha cargado con exito");
                sethiddenSuccess(true);
                setVisible(false);
                setTimeout(() => {
                    sethiddenSuccess(false);
                }, 3000);
            }
            else {
                const objMessages = { nombre: "", descripcion: "" };
                const objValidInput = { nombre: true, descripcion: true };
                if (Formvalue.nombre === "") {
                    objMessages.nombre = "Favor de llenar el campo";
                    objValidInput.nombre = false;
                }
                if (Formvalue.descripcion === "") {
                    objMessages.descripcion = "Favor de llenar el campo";
                    objValidInput.descripcion = false;
                }
                setIsValidInput(objValidInput);
                setMessageFeedback(objMessages);
            }
        } else {
            setVisible(true);
            setAlertColor("danger");
            setMessage("No se han realizado cambios");
        }
    }
    useEffect(() => {
        getDatosProducto();
    }, [])
    return (
        <>
            {hiddenSuccess && <div className='d-flex justify-content-start' style={{ color: "#1186a2", textShadow: "0px 5px 5px rgba(17, 134, 162, 0.3)", marginBottom: "7px" }}>
                <Icon.Check style={{ color: "#1186a2" }} /> {message}</div>}
            <Alert color={colorAlert} isOpen={visible} toggle={onDismiss.bind(null)}>
                {message !== "" ? message : ""}
            </Alert>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                    <InputGroup>
                        <InputGroupText style={{ width: "100px" }}>Nombre </InputGroupText>
                        <Input onChange={handleChange} invalid={!isValidInput.nombre} value={Formvalue.nombre} type="text" name="nombre" className="form-control" />
                        <FormFeedback>{messageFeedback.nombre}</FormFeedback>
                    </InputGroup>
                </FormGroup>
                <FormGroup>
                    <InputGroup>
                        <InputGroupText style={{ width: "100px" }}>Descripción </InputGroupText>
                        <Input onChange={handleChange} invalid={!isValidInput.descripcion} value={Formvalue.descripcion} type="textarea" row="10" name="descripcion" className="form-control" />
                        <FormFeedback>{messageFeedback.descripcion}</FormFeedback>
                    </InputGroup>
                </FormGroup>
                <div className='w-full d-flex justify-content-center'>
                    <Button className="button btn-success w-full" type="submit" onClick={() => { handleSubmit(onSubmit); }}>Guardar cambios</Button>
                </div>
            </Form>
        </>
    );
};
export default EditarP;