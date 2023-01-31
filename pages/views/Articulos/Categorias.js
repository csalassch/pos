
import CategoriesComp from "@/components/Articulos/CategoriesComp";
import BreadCrumbs from "@/layouts/breadcrumbs/BreadCrumbs";






const Categorias = () => {

    //For categorias multiselect


    

    //const [checkBoxVariante, setcheckBoxVariante] = useState(false);
    /*const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState("");
    const [colorAlert, setAlertColor] = useState("success");
    const onDismiss = () => {
        setVisible(false);
    };
    //const [imageProductOnView, setProductImageOnView] = useState('https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg');
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
    }*/

    return (
        <div>
            <BreadCrumbs />
            {/* <Row> */}
                {/* <Col md="12">
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
                </Col> */}
                {/*--------------------------------------------------------------------------------*/}
                {/* Input Groups                                                                   */}
                {/*--------------------------------------------------------------------------------*/}
                {/* <Col md="12">
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
                </Col> */}
                
            {/* </Row> */}
            {/* <ArticuloNuevoFormComp></ArticuloNuevoFormComp> */}
            <CategoriesComp></CategoriesComp>
        </div>
    );
};
export default Categorias;