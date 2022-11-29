import React from 'react';
import { Button, Label, FormGroup, Container, Row, Col, Card, CardBody } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, } from 'react-router-dom';
import AuthLogo from "../../layouts/logo/AuthLogo";
import { ReactComponent as LeftBg } from '../../assets/images/bg/login-bgleft.svg';
import { ReactComponent as RightBg } from '../../assets/images/bg/login-bg-right.svg';

import { useAuth } from '../../Context/authContext';

const RegisterFormik = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const initialValues = {
    UserName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  };

  const validationSchema = Yup.object().shape({
    UserName: Yup.string().required('UserName is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
  });
  const handleSubmit = async (UserName, email, password, isCompany) => {
    try {
      console.log(UserName)
      await signup(email, password, UserName, (isCompany === true ? "company" : "client"));
      navigate('/');

    } catch (error) {
      // eslint-disable-next-line
      alert(error.code)
    }
  }
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
                <h4 className="mb-0 fw-bold">Registrar</h4>
                <small className="pb-4 d-block">
                  ¿Ya tienes cuenta? <Link className='link-info fw-normal' to="/auth/loginformik">Inicio de sesión</Link>
                </small>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(fields) => {
                    // eslint-disable-next-line no-alert
                    alert(`SUCCESS!! :-)\n\n${JSON.stringify(fields, null, 4)}`);
                    handleSubmit(fields.UserName, fields.email, fields.password, fields.isCompany);
                  }}
                  render={({ errors, touched }) => (
                    <Form>
                      <FormGroup>
                        <Label htmlFor="firstName">Nombre del usuario</Label>
                        <Field
                          name="UserName"
                          type="text"
                          className={`form-control ${errors.UserName && touched.UserName ? ' is-invalid' : ''
                            }`}
                        />
                        <ErrorMessage
                          name="UserName"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>

                      <FormGroup>
                        <Label htmlFor="email">Correo</Label>
                        <Field
                          name="email"
                          type="text"
                          className={`form-control${errors.email && touched.email ? ' is-invalid' : ''
                            }`}
                        />
                        <ErrorMessage name="email" component="div" className="invalid-feedback" />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="password">Contraseña</Label>
                        <Field
                          name="password"
                          type="password"
                          className={`form-control${errors.password && touched.password ? ' is-invalid' : ''
                            }`}
                        />
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                        <Field
                          name="confirmPassword"
                          type="password"
                          className={`form-control${errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : ''
                            }`}
                        />
                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup inline className="form-check">
                        <Field
                          type="checkbox"
                          name="acceptTerms"
                          id="acceptTerms"
                          className={`form-check-input ${errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : ''
                            }`}
                        />
                        <Label htmlFor="acceptTerms" className="form-check-label">
                          Acepto los terminos y condiciones
                        </Label>
                        <ErrorMessage
                          name="acceptTerms"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup inline className="form-check">
                        <Field
                          type="checkbox"
                          name="isCompany"
                          id="isCompany"
                          className={`form-check-input ${errors.acceptTerms && touched.acceptTerms ? ' is-invalid' : ''
                            }`}
                        />
                        <Label htmlFor="isCompany" className="form-check-label">
                          ¿Es una empresa?
                        </Label>
                        <ErrorMessage
                          name="isCompany"
                          component="div"
                          className="invalid-feedback"
                        />
                      </FormGroup>
                      <FormGroup>
                        <Button type="submit" color="info" className="me-2">
                          Registrar
                        </Button>
                        <Button type="reset" color="secondary">
                          Reiniciar
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
  );
};

export default RegisterFormik;
