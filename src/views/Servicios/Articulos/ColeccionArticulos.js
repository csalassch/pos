import { useState } from 'react';
import { Row, Col, FormGroup, Label, Form, Input, Button, Alert } from 'reactstrap';
import { ref, uploadBytesResumable } from 'firebase/storage';

import '../../tables/ReactBootstrapTable.scss';
import BreadCrumbs from '../../../layouts/breadcrumbs/BreadCrumbs';
import { dbStorage } from '../../../FirebaseConfig/firebase';
import ComponentCard from '../../../components/ComponentCard';


const ColeccionArticulos = () => {
    
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [colorAlert, setAlertColor] = useState("success");
    const onDismiss = () => {
        setVisible(false);
    };
    const [file, setImage] = useState('');
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
                                <Input type="file" placeholder='selecciona archivo' onChange={(e) => { setImage(e.target.files[0]); }} />

                            </FormGroup>
                        </Form>
                        <Button onClick={upload} type="submit" className="btn btn-success">Subir</Button>
                    </ComponentCard>
                </Col>
            </Row>
        </div>
    );
};
export default ColeccionArticulos;