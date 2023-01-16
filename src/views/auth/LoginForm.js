import React, { useState } from 'react';
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { Link, useNavigate } from 'react-router-dom';
import * as Icon from 'react-feather';
// import AuthLogo from '../../layouts/logo/AuthLogo';
// import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
// import { ReactComponent as Bg } from '../../assets/images/bg/bgLogin.png';
// import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';

// import { useAuth } from '../../Context/authContext'

const LoginForm = () => {
  const navigate = useNavigate();
  // const { login } = useAuth();
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
  };

  const handleSubmit = async (email, password) => {
    //const handleSubmit(email, password) {
    try {
      // const requestOptions = {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: email, password: password })
      // };
      //Mandar a Backend
      // const response = await fetch('http://192.168.1.77:5500/', requestOptions);
      // const data = await response.json();
      // console.log(data);
      console.log(email,password);
      navigate('/');
      // if (data === "success") {
      //   navigate('/');
      // }

      // await login(email, password);
    } catch (err) {
      // eslint-disable-next-line
      //alert(err.code)
    }
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
    <div className="loginBox">
      {/* <LeftBg className="position-absolute left bottom-0" />
      <RightBg className="position-absolute end-0 top" /> */}
      <div className="d-flex justify-content-start "
      // C:\Users\Nuevo Ingreso\Documents\Mongo FreePOS\pos\src\assets\images\bg\bgLogin.png
        style={{ backgroundImage: "url('https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2FFondoFreePOS%20(1).png?alt=media&token=dc0c6402-953a-44a9-a57a-965761d304b8')",backgroundSize:"cover",height:"100vh" }}>

        <Container fluid className="h-100 m-0 justify-content-center align-items-center loginContainer">
          <Row className="justify-content-center align-items-center h-100">
            <Col sm="12" lg="6" md="6" className="loginContainer px-0">
              {/* <AuthLogo /> */}
              <Card>
              <h1 className='text-center mainTitle px-4 m-1' style={{color:"#077CAB"}}><strong>Koonol</strong></h1>
                <CardBody className="p-4 m-1">
                  <h4 className="mb-0 fw-bold">Inicio de sesión</h4>
                  <small className="pb-4 d-block">
                    ¿No tienes cuenta aún? <Link to="/auth/registerform">Registrarme</Link>
                  </small>
                  <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(fields) => {
                    handleSubmit(fields.email, fields.password)
                  }}
                    render={({ errors, touched }) => (
                      <Form>
                        <FormGroup>
                          <Label htmlFor="email">Correo electrónico</Label>
                          <Field name="email" type="text" className={`form-control${errors.email && touched.email ? ' is-invalid' : ''}`} />
                          <ErrorMessage name="email" component="div" className="invalid-feedback" />
                        </FormGroup>
                        <FormGroup>
                          <Label htmlFor="password">Contraseña</Label>
                          <Field name="password" type="password" className={`form-control${errors.password && touched.password ? ' is-invalid' : ''}`} />
                          <ErrorMessage name="password" component="div" className="invalid-feedback" />
                        </FormGroup>
                        <FormGroup className="form-check d-flex justify-content-between p-0">
                          <Label check>
                            <Input type="checkbox" style={{marginRight:"3px"}}/>
                            Recuérdame
                          </Label>
                          <Link
                            className="ms-auto text-decoration-none link-info fw-normal"
                            to="/auth/forgotPwd"
                          >
                            <small>¿Olvidaste tu contraseña?</small>
                          </Link>
                        </FormGroup>
                        <FormGroup>
                          <Button type="submit" style={{backgroundColor:"#077CAB",borderColor:"#077CAB"}} className="me-2">
                            Iniciar Sesión
                          </Button>
                        </FormGroup>
                      </Form>
                    )}
                  />
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      <Modal isOpen={modal} toggle={toggle.bind(null)}>
        <ModalHeader toggle={toggle.bind(null)}><Icon.AlertCircle /> Borrar Unidad</ModalHeader>
        <ModalBody>
          ¿Seguro que quieres eliminar la caracteristica?
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => { setModal(false) }}>
            Confirmar
          </Button>
          <Button color="secondary" onClick={toggle.bind(null)}>
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default LoginForm;
