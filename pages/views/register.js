import React,{useState} from 'react';
import axios from "axios";
import { Button, Label, Form, FormGroup, Container, Row, Col, Card, CardBody, Input } from 'reactstrap';
import * as Yup from 'yup';
import Link from "next/link";
import { useRouter } from 'next/router';
import { useAuth } from '@/Context/AuthContext';

const Register = () => {
  const navigate = useRouter();
  const { signup,resetPassword } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });
  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })

  }

  const validationSchema = Yup.object().shape({
    UserName: Yup.string().required('UserName is required'),
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    acceptTerms: Yup.bool().oneOf([true], 'Accept Terms & Conditions is required'),
  });
  
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(credentials);
      
      const response = await signup(credentials.email,credentials.password);;
      // const response = await axios.post('/api/auth/signUp', credentials);
      console.log("Submit: ", response.uid);
      // console.log("Submit: ", response.status);
      // console.log("UID: ", response.data);
      // if (response.status === 200) {
        navigate.push("/views/dashboard").then(() => {
          window.location.reload();
        });

      // }

    } catch (error) {
      // eslint-disable-next-line
      // alert(error.code)
      console.log(error)
    }
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
                    ¿Ya tienes cuenta? <Link className="text-decoration-none link-info m-0 p-0" href="/login">Inicio de sesión</Link>
                  </small>

                  <Form onSubmit={handleSubmit}>
                    

                    <FormGroup>
                      <Label htmlFor="email">Correo</Label>
                      <Input
                        name="email"
                        type="text"
                        onChange={handleChange}
                        className={`form-control`}
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label htmlFor="password">Contraseña</Label>
                      <Input
                        name="password"
                        type="password"
                        onChange={handleChange}
                        className={`form-control`}
                      />

                    </FormGroup>
                    {/* <FormGroup>
                      <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                      <Input
                        name="confirmPassword"
                        type="password"
                        className={`form-control`}
                      />

                    </FormGroup> */}
                    <FormGroup inline className="form-check d-flex justify-content-start p-0">
                      <Input
                        type="checkbox"
                        name="acceptTerms"
                        id="acceptTerms"
                        style={{ marginRight: "3px" }}
                        className={`form-check-input`}
                      />
                      <Label htmlFor="acceptTerms" className="form-check-label">
                        Acepto los terminos y condiciones
                      </Label>

                    </FormGroup>

                    <FormGroup>
                      <Button type="submit" style={{ backgroundColor: "#077CAB", borderColor: "#077CAB" }} className="me-2">
                        Registrar
                      </Button>
                      {/* <Button type="reset" color="secondary">
                            Reiniciar
                          </Button> */}
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

export default Register;

Register.getLayout = function Register(page) {
  return (
    <>
      {page}
    </>
  )
}
