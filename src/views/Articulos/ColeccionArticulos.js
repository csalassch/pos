import { useState, useEffect } from 'react';
import {
    Row, Col, FormGroup, Label, Form, Input, Button, Alert, InputGroup,
    InputGroupText, Collapse,
    Table

} from 'reactstrap';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

import '../tables/ReactBootstrapTable.scss';
import Select from 'react-select';
import chroma from 'chroma-js';

import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';

import { dbStorage } from '../../FirebaseConfig/firebase';
import ComponentCard from '../../components/ComponentCard';
import { colourOptions } from '../form-pickers/Data';





const ColeccionArticulos = () => {

    //For categorias multiselect
    const dot = (color = '#ccc') => ({
        alignItems: 'center',
        display: 'flex',

        ':before': {
            backgroundColor: color,
            borderRadius: 10,
            content: '""',
            display: 'block',
            marginRight: 8,
            height: 10,
            width: 10,
        },
    });
    const colourStyles = {
        control: (styles) => ({ ...styles, backgroundColor: 'white' }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: isDisabled
                    ? null
                    : isSelected
                        ? data.color
                        : isFocused
                            ? color.alpha(0.1).css()
                            : null,
                color: isDisabled
                    ? '#ccc'
                    : isSelected
                        ? chroma.contrast(color, 'white') > 2
                            ? 'white'
                            : 'black'
                        : data.color,
                cursor: isDisabled ? 'not-allowed' : 'default',
            };
        },
        multiValue: (styles, { data }) => {
            const color = chroma(data.color);
            return {
                ...styles,
                backgroundColor: color.alpha(0.1).css(),
            };
        },
        multiValueLabel: (styles, { data }) => ({
            ...styles,
            color: data.color,
        }),
        multiValueRemove: (styles, { data }) => ({
            ...styles,
            color: data.color,
            ':hover': {
                backgroundColor: data.color,
                color: 'white',
            },
        }),
        input: (styles) => ({ ...styles, ...dot() }),
        placeholder: (styles) => ({ ...styles, ...dot() }),
        singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
    };

    //const [checkBoxVariante, setcheckBoxVariante] = useState(false);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [colorAlert, setAlertColor] = useState("success");
    const onDismiss = () => {
        setVisible(false);
    };
    //const [imageProductOnView, setProductImageOnView] = useState('https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg');
    const [imageProduct, setProductImage] = useState('');
    const [file, setFile] = useState('');
    const upload = () => {
        if (file == null)
            return;
        console.log(file.name);
        const allowedExtensions = /(\.csv)$/i;
        if (!allowedExtensions.exec(file.name)) {
            setVisible(true);
            setAlertColor("danger");
            setMessage("Error! favor de seleccionar archivos .CSV");
        } else {
            const storageRef = ref(dbStorage, `/ColeccionArticulos/${file.name}`);
            uploadBytesResumable(storageRef, file);
            setAlertColor("success");
            setVisible(true);
            setMessage("Archivo subido con éxito");
        }
    }

    const addProductImage = () => {
        console.log("here");
        if (imageProduct == null || !imageProduct) {
            console.log("file is null");
            return;

        }
        console.log(imageProduct.name);
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|)$/i;
        if (!allowedExtensions.exec(imageProduct.name)) {
            console.log("here2");
            setVisible(true);
            setAlertColor("danger");
            setMessage("Error! favor de seleccionar archivos .CSV");
        } else {
            const storageRef = ref(dbStorage, `/ProductImages/${imageProduct.name}`);
            uploadBytesResumable(storageRef, imageProduct);
            setAlertColor("success");
            setVisible(true);
            setMessage("Archivo subido con éxito");
            getDownloadURL(storageRef).then((url) => {
                // `url` is the download URL for 'images/stars.jpg'



                // Or inserted into an <img> element
                const img = document.getElementById('imageProductRetrieved');
                img.setAttribute('src', url);
            })
                .catch((error) => {
                    // Handle any errors
                    console.log(error);
                });

        }
    }
    // const updateProductImage = (image2Update) => {
    //     console.log(image2Update);
    //     return image2Update;

    // }
    useEffect(() => {
        addProductImage(); // This is be executed when the state changes
    });
    const style = { width: "450px" };
    //For collapse in Variantes
    const [collapse, setCollapse] = useState(false);
    //const toggle = () => setCollapse(!collapse);
    const [isDisabled, setIsDisabled] = useState(false);
    return (
        <div>
            <BreadCrumbs />
            <Row>
                <Col md="12">
                    <ComponentCard title="Cargar Inventario">
                        <Alert color={colorAlert} isOpen={visible} toggle={onDismiss.bind(null)}>
                            {message}
                        </Alert>
                        <Form>
                            <FormGroup>
                                <Label htmlFor="exampleFile">Carga Masiva por .CSV</Label>
                                <Input type="file" placeholder='selecciona archivo' onChange={(e) => { setFile(e.target.files[0]); }} />
                            </FormGroup>
                        </Form>
                        <Button onClick={upload} type="submit" className="btn btn-success">Subir</Button>
                    </ComponentCard>
                </Col>
                {/*--------------------------------------------------------------------------------*/}
                {/* Input Groups                                                                   */}
                {/*--------------------------------------------------------------------------------*/}
                <Col md="12">
                    <ComponentCard title="Añadir Variantes Artículo">
                        <FormGroup>
                            <InputGroup>
                                <InputGroupText>SKU</InputGroupText>
                                <Input placeholder="UGG-BB-PUR-06" />
                            </InputGroup>
                        </FormGroup>
                        <FormGroup>
                            <Row>
                                <Col>
                                    <FormGroup>
                                        <Input type="select" name="SelectApply">
                                            <option>Por Artículo</option>
                                            <option>Por Paquete</option>
                                        </Input>
                                    </FormGroup>
                                </Col>
                                <Col>
                                    <InputGroup>
                                        <InputGroupText>$</InputGroupText>
                                        <Input placeholder="Precio" type="text" />
                                    </InputGroup>
                                </Col>
                            </Row>
                        </FormGroup>
                    </ComponentCard>
                </Col>
                {/* Input Form for new product */}
                <Col md="12">
                    <ComponentCard title="Nuevo Artículo">

                        <FormGroup>
                            <Row>
                                <Col md="4">
                                    <FormGroup>
                                        <Label htmlFor="exampleFile">Imagen Artículo</Label>
                                        <img id="imageProductRetrieved"
                                            alt="..."
                                            className=" img-fluid rounded shadow-lg"
                                            src="https://i0.wp.com/zaveriamexico.com/wp-content/uploads/2022/02/04-scaled.jpg?fit=2560%2C1707&ssl=1"
                                            style={style}
                                        ></img>
                                    </FormGroup>
                                    <Form>
                                        <FormGroup>
                                            <Input type="file" placeholder='selecciona archivo' onChange={(e) => { console.log("file selected: ", e.target.files[0]); setProductImage(e.target.files[0]); addProductImage(); }} />
                                        </FormGroup>
                                    </Form>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupText>Nombre Artículo</InputGroupText>
                                            <Input placeholder="Nombre" />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="exampleFile">Categorías</Label>

                                        <Select
                                            closeMenuOnSelect={false}
                                            defaultValue={[colourOptions[0], colourOptions[1]]}
                                            isMulti
                                            options={colourOptions}
                                            styles={colourStyles}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label>Descripción</Label>
                                        <Input type="textarea" rows="5" />
                                    </FormGroup>

                                    <FormGroup>
                                        <FormGroup check>
                                            <Input type="checkbox" id="checkVariantes" onChange={(e) => { setCollapse(e.target.checked); setIsDisabled(!isDisabled); }} />
                                            <Label check>Tiene Variantes</Label>
                                        </FormGroup>


                                        {/* <Button color="link" onClick={toggle.bind(null)} style={{ marginBottom: '1rem' }}>
                                            Ver Variantes
                                        </Button> */}
                                        <Collapse isOpen={collapse}>
                                            <Row>
                                                <Col>
                                                    <InputGroup>
                                                        <InputGroupText>Nombre</InputGroupText>
                                                        <Input placeholder="Nombre" />
                                                    </InputGroup>
                                                </Col>
                                                <Col>
                                                    <InputGroup>
                                                        <InputGroupText>SKU</InputGroupText>
                                                        <Input placeholder="UGG-BB-PUR-06" />
                                                    </InputGroup>
                                                </Col>
                                                <Col>
                                                    <InputGroup>
                                                        <InputGroupText>$</InputGroupText>
                                                        <Input placeholder="Precio" />
                                                    </InputGroup>
                                                </Col>
                                                <Col>
                                                    <Button onClick={upload} type="submit" className="btn btn-info">Añadir</Button>

                                                </Col>
                                            </Row>
                                            <Table responsive>
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>First Name</th>
                                                        <th>Last Name</th>
                                                        <th>Username</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <th scope="row">1</th>
                                                        <td>Mark</td>
                                                        <td>Otto</td>
                                                        <td>@mdo</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">2</th>
                                                        <td>Jacob</td>
                                                        <td>Thornton</td>
                                                        <td>@fat</td>
                                                    </tr>
                                                    <tr>
                                                        <th scope="row">3</th>
                                                        <td>Larry</td>
                                                        <td>the Bird</td>
                                                        <td>@twitter</td>
                                                    </tr>
                                                </tbody>
                                            </Table>
                                        </Collapse>                                  </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupText>$</InputGroupText>
                                            <Input placeholder="Precio" type="text" disabled={isDisabled} />
                                        </InputGroup>



                                    </FormGroup>
                                    <Button onClick={upload} type="submit" className="btn btn-success">Añadir Artículo</Button>

                                </Col>

                            </Row>
                        </FormGroup>
                    </ComponentCard>
                </Col>
            </Row>
        </div>
    );
};
export default ColeccionArticulos;