import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody, Input,Form } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import * as Yup from 'yup';
import * as Icon from 'react-feather';


function LoginPage() {
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(credentials);
        const response = await axios.post('/api/auth/login', credentials);
        console.log("Submit: ", response.status);
        if (response.status === 200) {
            // router.push("/views/dashboard");
            router.push("/views/dashboard").then(()=>{
                window.location.reload();
            });

        }
    }
    const signUpLink=()=>{
        router.push("/views/register");
    }
    const initialValues = {
        email: '',
        password: '',
    };
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Email is invalid').required('Email is required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    return (
        <div className="loginBox" >
            {/* <LeftBg className="position-absolute left bottom-0" />
        <RightBg className="position-absolute end-0 top" /> */}
            <div className="d-flex justify-content-start "
                // C:\Users\Nuevo Ingreso\Documents\Mongo FreePOS\pos\src\assets\images\bg\bgLogin.png
                style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2FFondoFreePOS%20(1).png?alt=media&token=dc0c6402-953a-44a9-a57a-965761d304b8')", backgroundSize: "cover", height: "100vh" }}>

                <Container fluid className="h-100 m-0 justify-content-center align-items-center loginContainer">
                    <Row className="justify-content-center align-items-center h-100">
                        <Col sm="12" lg="6" md="6" className="loginContainer px-0" style={{backgroundColor:"white !important"}}>
                            {/* <AuthLogo /> */}
                            <Card className="border-0 cardLogin" style={{backgroundColor:"white !important"}}>
                                <h1 className='text-center mainTitle px-4 m-1' style={{ color: "#077CAB" }}><strong>Koonol</strong></h1>
                                <CardBody className="p-4 m-1">
                                    <h4 className="mb-0 fw-bold">Inicio de sesión</h4>
                                    <small className="pb-4 d-block">
                                        ¿No tienes cuenta aún? <a style={{cursor:"pointer"}} className="text-decoration-none link-info m-0 p-0" onClick={signUpLink}>Registrarme</a>
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
                                                        style={{cursor:"pointer"}}
                                                    >
                                                        <small>¿Olvidaste tu contraseña?</small>
                                                    </a>
                                                </FormGroup>
                                                <FormGroup>
                                                    <Button type="submit" style={{ backgroundColor: "#077CAB", borderColor: "#077CAB" }} className="me-2">
                                                        Iniciar Sesión
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

LoginPage.getLayout = function LoginPage(page){
    return(
        <>
        {page}
        </>
    )
}