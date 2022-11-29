import React , {useState}from 'react';
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { Link, useNavigate } from 'react-router-dom';
import * as Icon from 'react-feather';
import AuthLogo from '../../layouts/logo/AuthLogo';
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';

import { useAuth } from '../../Context/authContext'

const LoginFormik = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [modal, setModal] = useState(false);
    const toggle = () => {
        setModal(!modal);
    };

  const handleSubmit = async (email, password) => {
    //const handleSubmit(email, password) {
    try {
      await login(email, password);
      navigate('/');
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
      <LeftBg className="position-absolute left bottom-0" />
      <RightBg className="position-absolute end-0 top" />
      <Container fluid className="h-100">
        <Row className="justify-content-center align-items-center h-100">
          <Col lg="12" className="loginContainer">
            <AuthLogo />
            <Card>
              <CardBody className="p-4 m-1">
                <h4 className="mb-0 fw-bold">Inicio de sesión</h4>
                <small className="pb-4 d-block">
                  ¿No tienes cuenta aun? <Link to="/auth/registerformik">Registrarme</Link>
                </small>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(fields) => {
                  handleSubmit(fields.email, fields.password)
                }}
                  render={({ errors, touched }) => (
                    <Form>
                      <FormGroup>
                        <Label htmlFor="email">Correo</Label>
                        <Field name="email" type="text" className={`form-control${errors.email && touched.email ? ' is-invalid' : ''}`} />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="password">Contraseña</Label>
                        <Field name="password" type="password" className={`form-control${errors.password && touched.password ? ' is-invalid' : ''}`} />
                        <ErrorMessage name="password" component="div" className="invalid-feedback" />
                      </FormGroup>
                      <FormGroup className="form-check d-flex" inline>
                        <Label check>
                          <Input type="checkbox" />
                          Recuerdame
                        </Label>
                        <Link
                          className="ms-auto text-decoration-none link-info fw-normal"
                          to="/auth/forgotPwd"
                        >
                          <small>¿Olvidaste tu contraseña?</small>
                        </Link>
                      </FormGroup>
                      <FormGroup>
                        <Button type="submit" color="info" className="me-2">
                          Login
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

export default LoginFormik;
