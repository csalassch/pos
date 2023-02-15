import React, { useState } from "react";
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody, Input, Form, FormFeedback } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { useRouter } from 'next/router';
import Image from "next/image";
import { useAuth } from "@/Context/AuthContext";

const RegisterCompany = () => {
    const router = useRouter();
    const { getAccessToken } = useAuth();
    const { getCurrentUser } = useAuth();

    const [fldCompany, setCfldCompany] = useState({
        companyName: ""
    });
    const [isValidField, setIsValidField] = useState({
        companyName: true,
    });
    const [isValidFieldTxt, setIsValidFieldTxt] = useState({
        txtCompanyName: "",
    });
    const handleChange = (e) => {

        setCfldCompany({
            ...fldCompany,
            [e.target.name]: e.target.value
        })

    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        const objAllInvalids = {
            companyName: true,
        }
        const objAllInvalidsTxt = {
            companyName: ""
        }
        if (fldCompany.companyName === '' || fldCompany.companyName === " " || /^[a-z0-9,-./\/' À-ÿ\u00f1\u00d1]{3,45}$/i.test(fldCompany.companyName) === false) {
            objAllInvalids.companyName = false;
            objAllInvalidsTxt.companyName = "Favor de ingresar un nombre de empresa";
            setIsValidField({ companyName: objAllInvalids.companyName });
            setIsValidFieldTxt({ txtCompanyName: objAllInvalidsTxt.companyName });
        } else {
            //Aquí va mandar info a backend del objeto credentials
            const userEmail=getCurrentUser().email;
            sendInfo(fldCompany.companyName, userEmail).then(() => {
                //Redirecciona a nota de verificacion de usuario
                // const str = stringify(credentials);
                // console.log("QS: ", str);
                router.push("/views/dashboard").then(() => {
                    window.location.reload();
                });
            });
        }


    }
    const sendInfo = async (companyName, email) => {

        var data = JSON.stringify({
            // "name": "Tonya Larkin",
            "company_name": companyName,
            // "phone": "632-795-1068",
            "email": email,
            "created_date": 234234324324,
            // "image": "http://placeimg.com/640/480"
        });
        const accessToken = getAccessToken();
        const headers = {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
        console.log("access token: ", accessToken);

        await axios.post('https://us-central1-bloona-ef12e.cloudfunctions.net/freebug_pos/starting', data, {
            headers: headers
        }).then(function (response) {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error)
            });
    }
    return (
        <div className="loginBox" >
            <div className="h-100 d-flex justify-content-center align-items-center"
            >

                <Container fluid className="h-100 m-0 loginContainer align-items-center">
                    <Row className=" h-100 d-flex justify-content-center align-items-center">
                        <Col sm="12" lg="6" md="6" className="loginContainer px-0" style={{ backgroundColor: "white !important" }}>
                            {/* <AuthLogo /> */}
                            <Card className="border-0 cardLogin" style={{ backgroundColor: "white !important" }}>
                                <h1 className='text-center mainTitle px-4 m-1' style={{ color: "#077CAB" }}><strong>Koonol</strong></h1>
                                <div className="d-flex justify-content-center">
                                        <Image
                                            className='helloImage'
                                            width={170}
                                            height={170}

                                            alt='helloKonool' src='https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2FregistraEmpresa1.png?alt=media&token=b7d7fdfb-a4ef-4f04-991b-4c66c47a63d9' />
                                    </div>
                                <CardBody className="p-4 m-1">
                                    <h4 className="mb-0 fw-bold">Registra tu empresa</h4>


                                    <Form onSubmit={handleSubmit}>
                                        <FormGroup>
                                            <Label htmlFor="email">Nombre</Label>
                                            <Input name="companyName" type="text"
                                                onChange={(e) => { handleChange(e); setIsValidField({ companyName: true }) }}
                                                className={isValidField.companyName === true ? 'form-control' : 'form-control is-invalid'}
                                            />
                                            <FormFeedback>
                                                {isValidFieldTxt.txtCompanyName}
                                            </FormFeedback>
                                        </FormGroup>

                                        <FormGroup>
                                            <Button type="submit" style={{ backgroundColor: "#077CAB", borderColor: "#077CAB" }} className="me-2">
                                                Registrar
                                            </Button>
                                        </FormGroup>
                                    </Form>


                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

        </div>
    );
};
export default RegisterCompany;
RegisterCompany.getLayout = function RegisterCompany(page) {
    return (
        <>
            {page}
        </>
    )
}