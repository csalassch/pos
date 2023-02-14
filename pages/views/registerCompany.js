import React,{ useState } from "react";
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody, Input, Form, FormFeedback } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";
import { useRouter } from 'next/router';
import { useAuth } from "@/Context/AuthContext";

const RegisterCompany = () => {
    const router = useRouter();
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
        if (fldCompany.companyName === '' || fldCompany.companyName === " ") {
            objAllInvalids.companyName = false;
            objAllInvalidsTxt.companyName = "Favor de ingresar un nombre de empresa";
            setIsValidField({ companyName: objAllInvalids.companyName });
            setIsValidFieldTxt({ txtCompanyName: objAllInvalidsTxt.companyName });
        } else {
            var data = {
                company_name: fldCompany.companyName

            };
            const headers = {
                'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjVhNTA5ZjAxOWY3MGQ3NzlkODBmMTUyZDFhNWQzMzgxMWFiN2NlZjciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYmxvb25hLWVmMTJlIiwiYXVkIjoiYmxvb25hLWVmMTJlIiwiYXV0aF90aW1lIjoxNjc1OTYxNTA0LCJ1c2VyX2lkIjoiUnh3dk5oQnZ6aWFyd0tEeXdkeEQ0SE1wQ1U4MyIsInN1YiI6IlJ4d3ZOaEJ2emlhcndLRHl3ZHhENEhNcENVODMiLCJpYXQiOjE2NzU5NjE1MDQsImV4cCI6MTY3NTk2NTEwNCwiZW1haWwiOiJnaGRnZmhkNjc4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJnaGRnZmhkNjc4QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.BHpP7vmU8YIzJ-SWMgEtIeouGp8DnkcBB95sxQP0ZHkOwugvWh-K-2inFaSVhJ5TS2QGhoL1xKurbkO39MTyPrdHeJF_THDwlWPzYyMPEn-pgQQvK9me0GyA23JiM7vvBS_w1agT84sbSUm084porcMXCsTiQGpboJenA07ExBfxj10fwaLu4_OV0_UGdBTCDnpbj3UfhmdicX3zPWgO5k6n9Avy26sbA5q3mly2oj9xRbbLIFVl6ksY4fXBzO-YytDfTiCZdvynolHvUK7C53yB96Ah_8C9GORC_b5uqE79wu9olM2ZcqwD615l7_O0pLG0OMDiA_2rf9tzrp4FPA',
                'Content-Type': 'application/json'
            }

            // await axios.post(
            //     'https://us-central1-bloona-ef12e.cloudfunctions.net/freebug_pos/users',
            //     data,
            //     {
            //         headers: headers
            //     })
            //     .then(function (response) {
            //         console.log(response);
            //         navigate.push("/views/dashboard").then(() => {
            //             window.location.reload();
            //         });
            //     })
            //     .catch(function (error) {
            //         console.log(error)
            //     });
            router.push("/views/dashboard").then(() => {
                window.location.reload();
            });
        }


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