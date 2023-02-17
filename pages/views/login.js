import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody, Input, Form } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import * as Yup from 'yup';
import { useAuth } from "@/Context/AuthContext";
import Spinner from 'react-bootstrap/Spinner';
import { useEffect } from "react";



function LoginPage() {
    const { login, resetPassword } = useAuth();
    const { provider } = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingLogin, setIsLoadingLogin] = useState(true);
    const [isDisabled, setIsDisabled] = useState(false);

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });
    const router = useRouter();

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })

    }
    const handleReset = async () => {
        await resetPassword(credentials.email);
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoadingLogin(false);
        console.log(credentials);
        const response = await login(credentials.email, credentials.password);
        console.log("Submit login: ", response.uid);
        setIsLoadingLogin(false);
        router.push("/views/dashboard").then(() => {
            window.location.reload();
        });
        // const response = await axios.post('/api/auth/login', credentials);
        // console.log("Submit: ", response.status);
        // if (response.status === 200) {
        //     // router.push("/views/dashboard");
        //     router.push("/views/dashboard").then(()=>{
        //         window.location.reload();
        //     });

        // }
    }
    const signUpLink = () => {
        router.push("/views/register");
    }
    const handleSubmitGoogle = async () => {
        setIsLoading(false);
        provider().then((response) => {
            //send user info to backend
            console.log("Token de Google user: ", response);
            if (response === "auth/popup-closed-by-user") {
                setIsLoading(true);
                setIsDisabled(false);
            } else {
                //redirect to dashboard
                router.push("/views/dashboard").then(() => {
                    window.location.reload();
                });
            }

        }).catch((e) => {
            console.log(e);
        });
    }

    useEffect(() => {
        if (isLoading === false || isLoadingLogin===false) {
            setIsDisabled(true);
        }
    }, [isDisabled, isLoading,isLoadingLogin]);

    return (
        <div className="loginBox" >
            {/* <LeftBg className="position-absolute left bottom-0" />
        <RightBg className="position-absolute end-0 top" /> */}
            <div className="d-flex justify-content-start "
                // C:\Users\Nuevo Ingreso\Documents\Mongo FreePOS\pos\src\assets\images\bg\bgLogin.png
                style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2FFondoFreePOS%20(1).png?alt=media&token=dc0c6402-953a-44a9-a57a-965761d304b8')", backgroundSize: "cover", height: "100vh" }}>

                <Container fluid className="h-100 m-0 justify-content-center align-items-center loginContainer">
                    <Row className="justify-content-center align-items-center h-100">
                        <Col sm="12" lg="6" md="6" className="loginContainer px-0" style={{ backgroundColor: "white !important" }}>
                            {/* <AuthLogo /> */}
                            <Card className="border-0 cardLogin" style={{ backgroundColor: "white !important" }}>
                                <h1 className='text-center mainTitle px-4 m-1' style={{ color: "#077CAB" }}><strong>Koonol</strong></h1>
                                <CardBody className="p-4 m-1">
                                    <h4 className="mb-0 fw-bold">Inicio de sesión</h4>
                                    <small className="pb-4 d-block">
                                        ¿No tienes cuenta aún? <a style={{ cursor: "pointer" }} className="text-decoration-none link-info m-0 p-0" onClick={signUpLink}>Registrarme</a>
                                    </small>

                                    <Form onSubmit={handleSubmit}>
                                        <FormGroup>
                                            <Label htmlFor="email">Correo electrónico</Label>
                                            <Input onChange={handleChange} name="email" type="text" className="form-control" />

                                        </FormGroup>
                                        <FormGroup>
                                            <Label htmlFor="password">Contraseña</Label>
                                            <Input onChange={handleChange} name="password" type="password" className="form-control" />
                                        </FormGroup>
                                        <FormGroup className="form-check d-flex justify-content-between p-0">
                                            <Label check>
                                                <Input type="checkbox" style={{ marginRight: "3px" }} />
                                                Recuérdame
                                            </Label>
                                            <a
                                                className="ms-auto text-decoration-none link-info fw-normal"
                                                onClick={signUpLink}
                                                style={{ cursor: "pointer" }}
                                            >
                                                <small onClick={handleReset}>¿Olvidaste tu contraseña?</small>
                                            </a>
                                        </FormGroup>
                                        <FormGroup>
                                            <Button disabled={isDisabled} type="submit" style={{ backgroundColor: "#077CAB", borderColor: "#077CAB" }} className="me-2">
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    style={{ marginRight: "5px" }}
                                                    hidden={isLoadingLogin}
                                                />
                                                Iniciar Sesión
                                            </Button>
                                            <Button disabled={isDisabled} style={{ backgroundColor: "#ea4335", borderColor: "#ea4335" }} onClick={handleSubmitGoogle}>
                                                <Spinner
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                    style={{ marginRight: "5px" }}
                                                    hidden={isLoading}
                                                />
                                                <i className="bi bi-google"></i> Google
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
    )
}

export default LoginPage

LoginPage.getLayout = function LoginPage(page) {
    return (
        <>
            {page}
        </>
    )
}