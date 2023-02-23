import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import * as Icon from 'react-feather';
import { ListGroup, ListGroupItem, Button, FormGroup, Label, Input, Row, Col } from 'reactstrap';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import SimpleBar from 'simplebar-react';
import { useAuth } from "@/Context/AuthContext";
import useTranslation from '@/hooks/useTranslation';
import Image from 'next/image';

const TwoColumnEditUsers = ({ userInformation,location }) => {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = React.useState(false);
    const { user, dataUser } = useAuth();
    // Informacion del usuario
    const [userData, setUserData] = useState({
        name: "",
        rol: "",
        lastname: "",
        phoneNumber: "",
        lada: "",
        matriz: "",
        sucursal: "",
        email: "",
        photoUrl: "https://firebasestorage.googleapis.com/v0/b/bloona-ef12e.appspot.com/o/user2.jpg?alt=media&token=672adbda-27af-4352-ba0a-57773c2b95e5"
    });
    const [isEditClick, setIsEditClick] = React.useState(true);
    const [isOpenMenu, setIsOpenMenu] = React.useState({ genInformation: true, address: false, preferences: false, security: false });
    const [editTxt, setEditTxt] = React.useState(t('txt_084'));
    //Banderitas para la lada del número telefonico
    const mexico = <div><img alt='Mexico Flag' src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Flag_of_Mexico.png/1200px-Flag_of_Mexico.png" height="20px" width="30px" /></div>;
    const usa = <div><img alt='USA Flag' src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a4/Flag_of_the_United_States.svg/1200px-Flag_of_the_United_States.svg.png" height="20px" width="30px" /></div>;
    const france = <div><img alt='France Flag' src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg/800px-Flag_of_France_%281794%E2%80%931815%2C_1830%E2%80%931974%2C_2020%E2%80%93present%29.svg.png" height="20px" width="30px" style={{ marginRight: "7px" }} /></div>;
    const brazil = <div> <img alt='Brazil Flag' src="https://upload.wikimedia.org/wikipedia/en/thumb/0/05/Flag_of_Brazil.svg/1200px-Flag_of_Brazil.svg.png" height="20px" width="30px" /></div>;
    const israel = <div> <img alt='Israel Flag' src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Flag_of_Israel.svg/640px-Flag_of_Israel.svg.png" height="20px" width="30px" /></div>;
    const options = [
        { value: 'esMX', label: mexico },
        { value: 'en', label: usa },
        { value: 'fr', label: france },
        { value: 'pt', label: brazil },
        { value: 'he', label: israel },

    ];
    const handleSubmit = () => {
        setIsOpen(!isOpen);
    };
    const active = useSelector((state) => state.contactsReducer.currentFilter);
    const [modal, setModal] = React.useState(false);
    const [activeLink, setActiveLink] = React.useState({
        genInformation: true,
        security: false
    });

    const toggle = () => {
        setModal(!modal);
    };
    const fillUserData = async () => {
        const objUser = {
            name: "",
            rol: "Sin rol",
            lastname: "",
            phoneNumber: "",
            lada: "",
            matriz: "",
            sucursal: "",
            email: "",
            photoUrl: "https://firebasestorage.googleapis.com/v0/b/bloona-ef12e.appspot.com/o/user2.jpg?alt=media&token=672adbda-27af-4352-ba0a-57773c2b95e5"
        }
        // Si existe un displayName que no sea nulo, poner el nombre de la persona
        if (dataUser.displayName != null) {
            objUser.name = dataUser.displayName

        }
        // De lo contrario poner el nombre o texto que este antes del @ de su correo
        else {
            let strEmail = dataUser.email;
            strEmail = strEmail.split("@");
            objUser.name = strEmail[0];
            console.log("UserName w no displayName:", strEmail[0]);
        }
        // Evalua si hay foto existente en datos de Google
        if (dataUser.photoURL != null) {
            objUser.photoUrl = dataUser.photoURL;
        }
        if (dataUser.phoneNumber != null) {
            objUser.phoneNumber = dataUser.phoneNumber;
        }
        // Pendiente: hacer un caso de que sea logeado con número telefónico
        // Pendiente: consultar datos faltantes en caso de no existir esa información

        if (dataUser.email) {
            objUser.email = dataUser.email;
        }
        console.log("objUser: ", objUser);
        return objUser;
    }
    useEffect(() => {
        console.log("dataUser loaded: ", userData);
        if (dataUser) {
            fillUserData().then((res) => {
                setUserData(res);
                console.log("dataUser loaded after: ", res);

            });
        }
        if (isOpenMenu.genInformation === true) {
            var element2 = document.getElementById("genInformation");
            element2.style.display = "block";
            var element4 = document.getElementById("security");
            element4.style.display = "none";
            setEditTxt(t('txt_084'));
            setActiveLink({
                genInformation: true,
                security: false
            });
        }
        if (isOpenMenu.security === true) {
            var element3 = document.getElementById("genInformation");
            element3.style.display = "none";
            var element4 = document.getElementById("security");
            element4.style.display = "block";
            setEditTxt(t('txt_086'));
            setActiveLink({
                genInformation: false,
                security: true
            });
        }
    }, [isOpenMenu, dataUser])

    return (
        <div className="d-lg-flex d-md-block position-relative leftRightBox">
            <div className={`leftPartSub flex-shrink-0 border-end ${isOpen ? 'showLeftPart' : ''}`}>
                <Button className="d-lg-none d-md-block openCloseBtn" color="info">
                    <i className={`bi ${isOpen ? 'bi-x' : 'bi-list'}`} onClick={handleSubmit} />
                </Button>
                <SimpleBar style={{ height: 'calc(100vh - 200px)' }}>
                    <ListGroup className='pb-4' flush>
                        <ListGroupItem
                            tag="a"
                            className={activeLink.genInformation === true ? ' border-0 linkMatrizActive' : ' border-0 linkMatriz'}
                            onClick={() => setIsOpenMenu({ genInformation: true, security: false })}
                        >
                            {/* <i className="bi bi-person mx-1" />  */}
                            Información General
                        </ListGroupItem>
                        {/* <ListGroupItem
                            tag="a"
                            className={activeLink.address === true ? ' py-3 border-0 linkMatrizActive' : 'py-3 border-0 linkMatriz'}
                            onClick={() => setIsOpenMenu({ genInformation: false, address: true, preferences: false, security: false })}
                        >
                            Dirección
                        </ListGroupItem> */}

                        <ListGroupItem
                            tag="a"
                            className={activeLink.security === true ? ' border-0 linkMatrizActive' : ' border-0 linkMatriz'}
                            onClick={() => setIsOpenMenu({ genInformation: false, address: false, preferences: false, security: true })}
                        >
                            Seguridad
                        </ListGroupItem>
                    </ListGroup>
                </SimpleBar>
            </div>
            <div className="rightPart">
                <div id='genInformation' className='mt-4 h-100'>
                    <div className='container-fluid h-100'>
                        <Row>
                            <Col>
                                <Row className='mb-4'>
                                    <Col>
                                        <div className="d-flex">

                                            {/* Foto de perfil de usuario */}
                                            <div className='logoMatriz'>
                                                <Image className='img-fluid rounded shadow-lg' id="profileImage" alt='imageProduct' width={150} height={150} src={userInformation.image} />
                                                <div className='overlay d-flex align-items-center justify-content-center'><Icon.Plus /><br></br><span>Subir foto</span></div>
                                            </div>
                                            <div className='mx-3'>
                                                {/* Nombre de vista previa del formulario */}
                                                <h3 className='labels'>{userInformation.name}</h3>
                                                <p className='text-secondary'>{userInformation.roles}</p>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col>
                                        <FormGroup>
                                            <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>{t('txt_008')}</Label>
                                            <Input defaultValue={userInformation.name} className='inputBox' style={{ marginTop: "0px" }} />
                                        </FormGroup>
                                    </Col>
                                    <Col>
                                        <FormGroup>
                                            <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Apellido</Label>
                                            <Input defaultValue={userData.lastname} className='inputBox' style={{ marginTop: "0px" }} />
                                        </FormGroup>
                                    </Col>

                                </Row>
                                <Row>


                                    <Col md="6">
                                        <FormGroup>
                                            <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Rol</Label>
                                            <Select
                                                isDisabled={true}
                                                id="selectInputs2"
                                                className='selectInputs'
                                                label="Single select"
                                                value={{ value: userInformation.roles, label:  userInformation.roles }}
                                                options={
                                                    [{ value: 'Nombre Item 1', label: 'Rol 1' },
                                                    { value: 'Nombre Item 2', label: 'Rol 2' }
                                                    ]}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col >
                                        <FormGroup>
                                            <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Teléfono</Label>
                                            <Input defaultValue={userData.phoneNumber} className='inputBox' style={{ marginTop: "0px" }} />
                                        </FormGroup>
                                    </Col>
                                    <Col style={{ maxWidth: "110px" }}>
                                        <FormGroup>
                                            <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}></Label>

                                            <Select
                                                id="flagSelect"

                                                className='selectInputs' value={[{ value: "esMX", label: mexico }]}
                                                label="Selecciona Lada"
                                                options={options}

                                            />
                                        </FormGroup>
                                    </Col>

                                </Row>
                                <Row>

                                    <Col>
                                        <FormGroup id='name'>
                                            <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Matriz/sucursal</Label>
                                            <Select
                                                className='selectInputs'
                                                id="selectInputs4"
                                                label="Single select"
                                                value={{ value: location, label: ` / ${location} ` }}
                                                options={
                                                    [{ value: 'Nombre Item 1', label: 'VRT otay' },
                                                    { value: 'Nombre Item 2', label: 'VRT 2' }
                                                    ]}
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col >
                                        <FormGroup>
                                            <Label className='labels' style={{ paddingBottom: "0px", marginBottom: "0px", fontWeight: "400" }}>Correo electrónico</Label>
                                            <Input type='email' defaultValue={userInformation.email} className='inputBox' style={{ marginTop: "0px" }} disabled />
                                        </FormGroup>
                                    </Col>

                                </Row>

                            </Col>


                        </Row>
                        <div className='d-flex justify-content-end align-items-end'>
                            <Row>
                                <Col className='mt-auto' >

                                    <Button className='btn-icon-Modal mx-2' block onClick={() => setIsEditClick(true)}>
                                        Guardar
                                    </Button>
                                </Col>
                            </Row>
                        </div>


                    </div>
                </div>

                <div id='security' className='mt-4 h-100'>
                    <div className='container-fluid h-100'>
                        <Row>
                            <Col>
                                
                                <Row className='border-bottom pb-2 mt-1 labels'>
                                    <h6>Verificación en dos pasos</h6>
                                    <div className='d-flex align-items-center'>
                                        <div style={{ marginRight: "auto" }} className='mr-auto p-2'>
                                            Un nivel extra para aumentar la seguridad de tu cuenta. <br /> Cada vez que inicies sesión, se solicitará un código de verificación y tu contraseña
                                        </div>
                                        <div className='link-info'>
                                            Activar
                                        </div>
                                    </div>
                                </Row>
                                
                                <Row className='border-bottom pb-2 mt-4 labels'>
                                    <h6>Cerrar todas las sesiones</h6>
                                    <div className='d-flex align-items-center'>
                                        <div style={{ marginRight: "auto" }} className='mr-auto p-2'>
                                            Cierra todas las sesiones, excepto la de este navegador actual
                                        </div>
                                        <div className='link-info'>
                                            Cerrar sesiones
                                        </div>
                                    </div>
                                </Row>

                                <Row className='mt-2'>
                                    <div className='d-flex justify-content-end'>

                                        <Col md="2" >

                                            <Button className='btn-icon-Modal mx-2' block onClick={() => setIsEditClick(true)}>
                                                Guardar
                                            </Button>
                                        </Col>
                                    </div>

                                </Row>
                            </Col>

                        </Row>



                    </div>
                </div>
            </div>
        </div>
    );
};

TwoColumnEditUsers.propTypes = {
    leftContent: PropTypes.node,
    rightContent: PropTypes.node,
};

export default TwoColumnEditUsers;