import React, { useState } from "react";
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody, Input, Form, FormFeedback } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { useRouter } from 'next/router';
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/Context/AuthContext";

const VerificationEmail = () => {
    const router = useRouter();
    const { sendVerificationEmail } = useAuth();
    const [msgSent, setMsgSent] = useState("-");
    const [showMsg, setShowMsg] = useState(true);
    const handleSubmit = () => {
        router.push("/views/dashboard").then(() => {
            window.location.reload();
        });
    }
    const resendVerificationEmail = () => {
        try {
            sendVerificationEmail().then((e) => {
                const responseVerificationEmail = e;
                console.log(e);
                if (responseVerificationEmail === "sent") {
                    setMsgSent('Correo enviado con éxito!');
                    setShowMsg(false);
                }
                if (responseVerificationEmail === "errorRequests") {
                    setMsgSent('Favor de realizarlo más tarde');
                    setShowMsg(false);
                }
                document.getElementById("msgSent").innerHTML = msgSent;
            });

        } catch (e) {
            console.log(e);
        }
    }
    return (
        <div className="loginBox" >
            <div className="h-100 d-flex justify-content-center align-items-center"
            >

                <Container fluid className="h-100 m-0 align-items-center">
                    <Row className=" h-100 d-flex justify-content-center align-items-center">
                        <Col sm="12" lg="8" md="8" className="px-0" style={{ backgroundColor: "white !important" }}>
                            {/* <AuthLogo /> */}
                            <Card className="border-0 cardLogin" style={{ backgroundColor: "white !important" }}>
                                <h1 className='text-center mainTitle px-4 m-1' style={{ color: "#077CAB" }}><strong>Koonol</strong></h1>
                                <CardBody className="p-4 m-1">
                                    <div className="d-flex justify-content-center mb-3">
                                        <Image
                                            className='helloImage'
                                            width={170}
                                            height={170}

                                            alt='helloKonool' src='https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2FcorreoVerificacion.png?alt=media&token=202a4989-c749-4a29-87d9-5df23a390eba' />
                                    </div>
                                    <div className="d-flex justify-content-center">

                                        <h6 style={{ fontWeight: 400 }} className="mb-3 text-center">Muchas gracias por registrarte con nosotros. Hemos enviado un correo electrónico a tu cuenta para continuar con el proceso. No olvides revisar tu correo no deseado.</h6>
                                    </div>
                                    <div className="d-flex justify-content-center">

                                        <Button onClick={handleSubmit} style={{ backgroundColor: "#077CAB", borderColor: "#077CAB" }} className="me-2">
                                            Ir a Koonol
                                        </Button>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <small style={{ cursor: "pointer" }} onClick={resendVerificationEmail} className="pb-4 d-block links link-info">
                                            Volver a enviar el correo
                                        </small>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                        <small id="msgSent" className="pb-4 d-block links link-warning">
                                        </small>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

        </div>
    );
};
export default VerificationEmail;
VerificationEmail.getLayout = function VerificationEmail(page) {
    return (
        <>
            {page}
        </>
    )
}