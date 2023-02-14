import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Button, Label, Form, FormGroup, Container, Row, Col, Card, CardBody, Input, FormFeedback } from 'reactstrap';
import * as Yup from 'yup';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useAuth } from '@/Context/AuthContext';
import { signInWithPopup } from 'firebase/auth';

const Register = () => {
  const navigate = useRouter();
  const { signup } = useAuth();
  const { provider } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  // Objeto para validar campos de registro
  const [registerFields, setRegisterFields] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
  });
  // Aceptar términos y condiciones
  const [acceptTerms, setAcceptTerms] = useState(false);
  // Objeto con bools de validacion y respectivos mensajes
  const [isValidField, setIsValidField] = useState({
    email: true,
    password: true,
    confirmPassword: true,
    companyName: true,
    acceptTerms: true
  });
  const [isValidFieldTxt, setIsValidFieldTxt] = useState({
    txtEmail: "",
    txtPassword: "",
    txtConfirmPassword: "",
    txtCompanyName: "",
    txtAcceptTerms: ""
  });


  const validFields = () => {
    return (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(registerFields.email))
  }
  const validPassword = () => {
    const objReturn = {
      message: "",
      check: true
    }
    if (/[A-Z]/.test(registerFields.password) === false) {
      objReturn.message = "Debe contener almenos una mayúscula";
    }
    if (/[0-9]/.test(registerFields.password) === false) {
      objReturn.message = "Debe contener al menos un número";
    }
    if (/[@#$.]/.test(registerFields.password) === false) {
      objReturn.message = "Debe contener almenos un caracter especial: @, . , $, #";
    }
    if (/^[a-z0-9@#$.]{8,}/i.test(registerFields.password) === false) {
      objReturn.message = "Debe contener mínimo 8 caracteres";
    }
    objReturn.check = /[A-Z]/.test(registerFields.password) && /[0-9]/.test(registerFields.password) && /[@#$.]/.test(registerFields.password) && /^[a-z0-9@#$.]{8,}/i.test(registerFields.password);

    return objReturn;
  }
  const handleChange = (e) => {
    setRegisterFields({
      ...registerFields,
      [e.target.name]: e.target.value
    });
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })

  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const isValidEmail = validFields();
      const isValidPassword = validPassword().check;
      const objAllInvalids = {
        email: true,
        password: true,
        confirmPassword: true,
        companyName: true,
        acceptTerms: true
      }
      const objAllInvalidsTxt = {
        email: "",
        password: "",
        confirmPassword: "",
        companyName: "",
        acceptTerms: ""
      }
      console.log("Email ingresado: ", registerFields.email)
      if (isValidEmail === false || registerFields.email === '') {
        objAllInvalids.email = false;
        objAllInvalidsTxt.email = "Correo electrónico inválido"
      }
      if (isValidPassword === false) {
        objAllInvalids.password = false;
        objAllInvalidsTxt.password = validPassword().message;
        console.log("message recevied: ", objAllInvalidsTxt.password);

      }
      if (registerFields.confirmPassword !== registerFields.password || registerFields.confirmPassword === '') {
        objAllInvalids.confirmPassword = false;
        objAllInvalidsTxt.confirmPassword = "Las contraseñas no coinciden";
      }
      if (registerFields.companyName === '' || registerFields.companyName === " ") {
        objAllInvalids.companyName = false;
        objAllInvalidsTxt.companyName = "Favor de ingresar un nombre de empresa";
      }
      if (acceptTerms === false) {
        objAllInvalids.acceptTerms = false;
        objAllInvalidsTxt.acceptTerms = "Favor de aceptar términos y condiciones"
      }
      setIsValidField({ email: objAllInvalids.email, password: objAllInvalids.password, confirmPassword: objAllInvalids.confirmPassword, companyName: objAllInvalids.companyName, acceptTerms: objAllInvalids.acceptTerms });
      setIsValidFieldTxt({ txtEmail: objAllInvalidsTxt.email, txtPassword: objAllInvalidsTxt.password, txtConfirmPassword: objAllInvalidsTxt.confirmPassword, txtCompanyName: objAllInvalidsTxt.companyName, txtAcceptTerms: objAllInvalidsTxt.acceptTerms });

      // console.log(credentials);
      // const response = await signup(credentials.email, credentials.password);;
      // console.log("Submit: ", response.uid);
      // navigate.push("/views/dashboard").then(() => {
      //   window.location.reload();
      // });
    } catch (error) {
      // eslint-disable-next-line
      // alert(error.code)
      console.log(error)
    }
  }
  const handleSubmitGoogle = async() => {
    provider().then(()=>{
      navigate.push("/views/registerCompany").then(() => {
          window.location.reload();
        });
    });
  }



  return (
    <div className="loginBox">
      {/* <LeftBg className="position-absolute left bottom-0" />
      <RightBg className="position-absolute end-0 top" /> */}
      <div className='d-flex justify-content-start'
        style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2FFondoFreePOSRegister2.png?alt=media&token=4e42cddd-a7ca-4570-8884-4b03eb8fb61c')", backgroundSize: "cover", height: "100vh" }}>


        <Container fluid className="h-100 m-0 justify-content-center align-items-center loginContainer">
          <Row className="justify-content-center align-items-center h-100">
            <Col sm="12" lg="6" md="6" className="loginContainer px-0">
              {/* <AuthLogo /> */}
              <Card className="border-0 cardRegister" style={{ backgroundColor: "white !important" }}>
                <h1 className='text-center mainTitle px-4 m-1' style={{ color: "#077CAB" }}><strong>Koonol</strong></h1>

                <CardBody className="p-4 m-1">
                  <h4 className="mb-0 fw-bold">Registrar</h4>
                  <small className="pb-4 d-block">
                    ¿Ya tienes cuenta? <Link className="text-decoration-none link-info m-0 p-0" href="/views/login">Inicio de sesión</Link>
                  </small>
                  <Form onSubmit={handleSubmit}>
                    <FormGroup>
                      <Label htmlFor="email">Correo</Label>
                      <Input
                        name="email"
                        type="email"
                        onChange={(e) => { handleChange(e); setIsValidField({ email: true, password: true, confirmPassword: true, companyName: true, acceptTerms: true }) }}
                        className={isValidField.email === true ? 'form-control' : 'form-control is-invalid'}
                      // invalid={isValidField.email}
                      />
                      <FormFeedback>
                        {isValidFieldTxt.txtEmail}
                      </FormFeedback>
                    </FormGroup>
                    {/* Campo de contraseña debe ser con 8 caracteres mínimo */}
                    <FormGroup>
                      <Label htmlFor="password">Contraseña</Label>
                      <Input
                        name="password"
                        type="text"
                        onChange={(e) => { handleChange(e); setIsValidField({ password: true, email: true, confirmPassword: true, companyName: true, acceptTerms: true }) }}
                        className={isValidField.password === true ? 'form-control' : 'form-control is-invalid'}
                      />
                      <FormFeedback>
                        {isValidFieldTxt.txtPassword}
                      </FormFeedback>
                    </FormGroup>
                    {/* Campo de confirmar contraseña */}
                    <FormGroup>
                      <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                      <Input
                        name="confirmPassword"
                        type="password"
                        onChange={(e) => { handleChange(e); setIsValidField({ password: true, email: true, confirmPassword: true, companyName: true, acceptTerms: true }) }}
                        className={isValidField.confirmPassword === true ? 'form-control' : 'form-control is-invalid'}

                      />
                      <FormFeedback>
                        {isValidFieldTxt.txtConfirmPassword}
                      </FormFeedback>
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="email">Nombre de la empresa</Label>
                      <Input
                        name="companyName"
                        type="text"
                        onChange={(e) => { handleChange(e); setIsValidField({ password: true, email: true, confirmPassword: true, companyName: true, acceptTerms: true }) }}
                        className={isValidField.companyName === true ? 'form-control' : 'form-control is-invalid'}
                      />
                      <FormFeedback>
                        {isValidFieldTxt.txtCompanyName}
                      </FormFeedback>
                    </FormGroup>
                    {/* Aceptar términos y condiciones */}
                    <FormGroup inline className="form-check d-flex justify-content-start p-0">
                      <Input
                        type="checkbox"
                        name="acceptTerms"
                        id="acceptTerms"
                        style={{ marginRight: "3px" }}
                        onChange={(e) => { setAcceptTerms(e.target.checked); setIsValidField({ password: true, email: true, confirmPassword: true, companyName: true, acceptTerms: true }) }}
                        className={isValidField.acceptTerms === true ? 'form-check-input' : 'form-check-input is-invalid'}

                      />
                      <Label htmlFor="acceptTerms" className="form-check-label">
                        Acepto los terminos y condiciones
                      </Label>
                      {/* Pendiente de preguntar si hay que desplegar un texto o solo marcarlo en rojo se entiende que hay que marcar esa casilla */}
                      {/* <FormFeedback>
                          {isValidFieldTxt.txtAcceptTerms}
                        </FormFeedback> */}

                    </FormGroup>
                    <div className='d-flex justify-content-center align-items-center'>

                      <FormGroup>
                        <Button type="submit" style={{ backgroundColor: "#077CAB", borderColor: "#077CAB" }} className="me-2">
                          Registrarme
                        </Button>
                        {/* <Button type="reset" color="secondary">
                            Reiniciar
                          </Button> */}
                      </FormGroup>
                    </div>
                    <div className='d-flex justify-content-center align-items-center'>

                      <FormGroup>

                        <Button style={{ backgroundColor: "#ea4335", borderColor: "#ea4335" }} onClick={handleSubmitGoogle}>
                          <i className="bi bi-google"></i> Google
                        </Button>
                      </FormGroup>
                    </div>
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

export default Register;

Register.getLayout = function Register(page) {
  return (
    <>
      {page}
    </>
  )
}
