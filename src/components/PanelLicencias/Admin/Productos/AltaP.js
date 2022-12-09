import React, { useState, useEffect } from 'react';
import { Input, Label, Button, FormGroup, FormFeedback } from 'reactstrap';
import { useForm } from 'react-hook-form';
import Form from 'react-validation/build/form';
import * as Icon from 'react-feather';

import { ref, push, } from 'firebase/database';
import { db } from '../../../../FirebaseConfig/firebase';

const AltaP = ({ muestra }) => {
    const { handleSubmit } = useForm();
    const [action, setAction] = useState("");
    const [Formvalue, setFormvalue] = useState({ nombre: '', descripcion: '' });

    //Para el control de alertas o mensajes de errores
    const [message, setMessage] = useState("");
    const [hiddenSuccess, sethiddenSuccess] = useState(false);
    const [isValidInput, setIsValidInput] = useState({ nombre: true, descripcion: true });
    const [messageFeedback, setMessageFeedback] = useState({ nombre: "", descripcion: "" });

    const onSubmit = () => {
        if (Formvalue.nombre !== '' && Formvalue.descripcion !== '') {
            if (muestra === "prod") {
                push(ref(db, 'products/'), {
                    name: Formvalue.nombre,
                    description: Formvalue.descripcion,
                    active: true
                });
            }
            if (muestra === "mod") {
                push(ref(db, 'modules/'), {
                    name: Formvalue.nombre,
                    description: Formvalue.descripcion,
                    active: true
                });
            }
            setFormvalue({ nombre: '', descripcion: '' })
            setMessageFeedback({ nombre: "", descripcion: "" });
            setIsValidInput({ nombre: true, descripcion: true });
            setMessage("Se ha cargado con exito");
            sethiddenSuccess(true);
            setAction("")
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
    }
    const handleChange = ({ target: { name, value } }) => {
        setMessageFeedback({ nombre: "", descripcion: "" });
        setIsValidInput({ nombre: true, descripcion: true });
        setFormvalue({ ...Formvalue, [name]: value });
    };

    useEffect(() => {
    }, [Formvalue])
    return (
        <>
            {hiddenSuccess && <div className='d-flex justify-content-start' style={{ color: "#1186a2", textShadow: "0px 5px 5px rgba(17, 134, 162, 0.3)", marginBottom: "7px" }}>
                <Icon.Check style={{ color: "#1186a2" }} /> {message}</div>}
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup>
                        <Label style={{ width: "100px" }}>Nombre </Label>
                        <Input onChange={handleChange} invalid={!isValidInput.nombre} type="text" name="nombre" className="form-control" value={action === "envio" ? "" : Formvalue.nombre} />
                        <FormFeedback>{messageFeedback.nombre}</FormFeedback>
                </FormGroup>
                <FormGroup>
                        <Label style={{ width: "100px" }}>Descripción </Label>
                        <Input onChange={handleChange} invalid={!isValidInput.descripcion} type="textarea" row="5" name="descripcion" className="form-control" value={action === "envio" ? "" : Formvalue.descripcion} />
                        <FormFeedback>{messageFeedback.descripcion}</FormFeedback>
                </FormGroup>
                <div className='w-full d-flex justify-content-center'>
                    <Button className="button btn-success" type="submit" onClick={() => { handleSubmit(onSubmit); }}>Guardar</Button>
                </div>
            </Form>
        </>
    );
};
export default AltaP;