import { useState, useEffect } from 'react';

import {
    Row, Col, FormGroup, Input, Button, InputGroup,
    InputGroupText, Table, Collapse, Label, Alert, Form, Spinner



} from 'reactstrap';
import Select from 'react-select';

import { push,onValue, ref as refDB } from 'firebase/database';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { dbStorage, db } from '../../FirebaseConfig/firebase';
import { useAuth } from '../../Context/authContext';
import ComponentCard from '../ComponentCard';




const ArticuloNuevoFormComp = () => {
    const colourStyles={option: (provided) => ({
        ...provided,
        // borderBottom: '0.7px dotted gray',
        color:"black",
        padding: 20,
      }),multiValue: (styles) => {
        
        return {
          ...styles,
          backgroundColor: "#d2cef9",
        };
      },
      multiValueLabel: (styles) => ({
        ...styles,
        color: "#212121",
        
      }),};
    const { user } = useAuth();
    const [arrayUnits, setArrayUnits] = useState([{ value: '', label: '' }]);
    const [arrayCategories, setArrayCategories] = useState([{ value: '', label: '' }]);
    const optionsUnits = () => {
        const arrUnit = [];
        onValue(refDB(db, "units/"), snapshot => {
            snapshot.forEach(snap => {
                const obj = {

                    value: snap.val().name,
                    label: snap.val().name,
                    color: '#00B8D9',
                    key: snap.key
                }

                arrUnit.push(obj);


            })

            setArrayUnits(arrUnit);

        });
        console.log("arrUnit:", arrayUnits);
    }
    const optionsCategories = () => {
        const arrCat = [];
        onValue(refDB(db, "categories/"), snapshot => {
            snapshot.forEach(snap => {
                const obj = {

                    value: snap.val().name,
                    label: snap.val().name,
                    color: '#00B8D9',
                    key: snap.key
                }

                arrCat.push(obj);


            })

            setArrayCategories(arrCat);

        });
        console.log("arrCat:", arrayCategories);
    }
    const [processing, setProcessing] = useState(false);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const onDismiss = () => {
        setVisible(false);
    };
    const [colorAlert, setAlertColor] = useState("success");
    const [idImage, setIdImage] = useState({name:"",url:"",extension:""});
    const style = { width: "450px" };
    //const [imageProduct, setProductImage] = useState('');
    const addProductImage = (imageTemp) => {
        console.log("here");
        setProcessing(true);
        if (imageTemp == null || !imageTemp) {
            console.log("file is null");
            return;

        }
        console.log(imageTemp.name);
        const allowedExtensions = /(\.jpg|\.jpeg|\.png|)$/i;
        if (!allowedExtensions.exec(imageTemp.name)) {
            console.log("here2");
            setVisible(true);
            setAlertColor("danger");
            setMessage("Error! favor de seleccionar archivos .CSV");
            return;
        }

        const storageRef = ref(dbStorage, `/ProductImages/${user.uid}/${imageTemp.name}`);
        
        uploadBytes(storageRef, imageTemp).then(() => {
            setProcessing(false);
            getDownloadURL(storageRef).then((url) => {

                const img = document.getElementById('imageProductRetrieved');
                
                img.setAttribute('src', url);
                setIdImage({name:imageTemp.name,url:url,extension:"jpg"});

            })
                .catch((error) => {
                    // Handle any errors
                    console.log(error);
                });
                    
        });

        setAlertColor("success");
        setVisible(true);
        setMessage("Archivo subido con éxito");
        console.log("file uploaded:", imageTemp);
    }
    useEffect(() => {
        optionsCategories();
        optionsUnits();
    }, [processing]);
    //For collapse in Variantes
    const [collapse, setCollapse] = useState(false);
    //const toggle = () => setCollapse(!collapse);
    const [isDisabled, setIsDisabled] = useState(false);
    const [nameItem, setNameItem] = useState("");
    const [sku, setSku] = useState("");
    const [description, setDescription] = useState("");
    // const [idUnit, setIdUnit] = useState("");
    

    const newArticuloBtn=()=>{
        push(refDB(db, 'files/'), {
            name: idImage.name,
            url:idImage.url,
            extension:idImage.extension,
            
        }).then(()=>{
            push(refDB(db, 'items/'), {
                name: nameItem,
                sku:sku,
                description:description,
                idUnit:"a",
                idImage:idImage.name
            });
        });
       
    }
    return (
        <>
            <Row>

                <Col md="12">
                    <ComponentCard title="Nuevo Artículo">

                        <FormGroup>
                            <Row>
                                <Alert color={colorAlert} isOpen={visible} toggle={onDismiss.bind(null)}>
                                    {message}
                                </Alert>
                                <Col md="4">
                                    <FormGroup>
                                        <Label htmlFor="exampleFile">Imagen Artículo</Label>

                                        {processing ? (
                                            <Spinner

                                                type="grow"
                                                color="Info"
                                            />
                                        ) : <img id="imageProductRetrieved"
                                            alt="..."
                                            className=" img-fluid rounded shadow-lg"
                                            src="https://i0.wp.com/zaveriamexico.com/wp-content/uploads/2022/02/04-scaled.jpg?fit=2560%2C1707&ssl=1"
                                            style={style}
                                        ></img>}


                                    </FormGroup>
                                    <Form>
                                        <FormGroup>
                                            <Input type="file" placeholder='selecciona archivo' onChange={(e) => { console.log("file selected: ", e.target.files[0]); addProductImage(e.target.files[0]); setProcessing(true) }} />
                                        </FormGroup>
                                    </Form>
                                </Col>
                                <Col>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupText style={{ width: "135px" }}>Nombre Artículo</InputGroupText>
                                            <Input placeholder="Nombre" value={nameItem} onChange={(e) => { setNameItem(e.target.value); }}/>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupText style={{ width: "135px" }}>SKU</InputGroupText>
                                            <Input placeholder="UGG-BB-PUR-06" value={sku} onChange={(e) => { setSku(e.target.value); }}/>
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="exampleFile">Categorías</Label>

                                        <Select
                                            closeMenuOnSelect={false}
                                            defaultValue={[arrayCategories[1]]}
                                            isMulti
                                            options={arrayCategories}
                                            styles={colourStyles}

                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupText style={{ width: "135px" }} className="text-center">Descripción</InputGroupText>
                                            <Input type="textarea" rows="5" value={description} onChange={(e) => { setDescription(e.target.value); }}/>
                                        </InputGroup>

                                    </FormGroup>

                                    <FormGroup>
                                        <FormGroup check>
                                            <Input type="checkbox" id="checkVariantes" onChange={(e) => { setCollapse(e.target.checked); setIsDisabled(!isDisabled); }} />
                                            <Label check>Tiene Variantes</Label>
                                        </FormGroup>

                                        <Collapse isOpen={collapse}>
                                            <Row>
                                                <Col md="3">
                                                    <InputGroup>
                                                        <InputGroupText>Nombre</InputGroupText>
                                                        <Input placeholder="Nombre" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="4">
                                                    <InputGroup>
                                                        <InputGroupText>SKU</InputGroupText>
                                                        <Input placeholder="UGG-BB-PUR-06" />
                                                    </InputGroup>
                                                </Col>
                                                <Col md="3">
                                                    <InputGroup>
                                                        <InputGroupText>$</InputGroupText>
                                                        <Input placeholder="Precio" />
                                                    </InputGroup>
                                                </Col>
                                                <Col>
                                                    <Button type="submit" className="btn btn-info">Añadir</Button>

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
                                        </Collapse>
                                    </FormGroup>
                                    <Row>
                                        <Col md="6">
                                            <FormGroup>
                                                <InputGroup>
                                                    <InputGroupText>$</InputGroupText>
                                                    <Input placeholder="Precio" type="text" disabled={isDisabled} />
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                        <Col md="6">
                                            <FormGroup>
                                                <InputGroup >
                                                    <InputGroupText>Aplicar por</InputGroupText>
                                                    <div style={{width:"230px"}}>
                                                    <Select
                                                        
                                                        defaultValue={[arrayUnits[1]]}
                                                        options={arrayUnits}
                                                        style={{width:100}}
                                                    />
                                                    </div>
                                                   
                                                   
                                                    
                                                </InputGroup>
                                            </FormGroup>
                                        </Col>
                                    </Row>

                                    <Button onClick={newArticuloBtn} type="submit" className="btn btn-success">Añadir Artículo</Button>

                                </Col>

                            </Row>
                        </FormGroup>
                    </ComponentCard>
                </Col>
            </Row>
        </>
    );
};

export default ArticuloNuevoFormComp;
