import { useState, useEffect } from 'react';

import {
    Row, Col, FormGroup, Input, Button, InputGroup,
    InputGroupText, Table

} from 'reactstrap';
import { push, ref, onValue, update } from 'firebase/database';
import * as Icon from 'react-feather';
import { db } from '../../FirebaseConfig/firebase';
import ComponentCard from '../ComponentCard';




const UnidadesComp = () => {

    const [arr, setArr] = useState([{ id: 0, name: '', key: "" }]);
    const fetchDataUnits = () => {
        const arrAux = [];
        let i = 1;
        onValue(ref(db, "units/"), snapshot => {
            snapshot.forEach(snap => {
                const obj = {
                    id: i,
                    name: snap.val().name,
                    key: snap.key
                }

                arrAux.push(obj);
                i++;

            })
            console.log("arrAux:", arrAux);
            setArr(arrAux);
        });
    }
    useEffect(() => {
        fetchDataUnits();
        console.log(arr);
    }, []);



    const [btnMessage, setBtnMessage] = useState("Agregar");
    const [keyAux, setKeyAux] = useState("");
    const [nameUnit, setNameUnit] = useState("");
    const newUnit = () => {
        if(btnMessage==="Guardar Cambios"){
            console.log("btnCllicked for update: ",keyAux);
            update(ref(db,`units/${keyAux}`),{
                name:nameUnit
            });
            setBtnMessage("Agregar");
        }else{
            push(ref(db, 'units/'), {
                name: nameUnit
            });
        }
        
        fetchDataUnits();
        setNameUnit("");
    }
    const editUnit = (keyDB) => {
        console.log("Key of clicked: ", keyDB);
        setKeyAux(keyDB);
        onValue(ref(db, `units/${keyDB}`), snapshot => {
            console.log("snapshot from selected for edition:", snapshot.val().name);
            setNameUnit(snapshot.val().name);
        });
        setBtnMessage("Guardar Cambios");

    }
    return (
        <>
            <Row>

                <Col md="12">
                    <ComponentCard title="Definir Unidades">

                        <FormGroup>
                            <Row>

                                <Col md="4">
                                    <FormGroup>
                                        <InputGroup>
                                            <InputGroupText>Nombre</InputGroupText>
                                            <Input placeholder="Nombre" value={nameUnit} onChange={(e) => { setNameUnit(e.target.value) }} />
                                        </InputGroup>
                                    </FormGroup>
                                    <FormGroup>
                                    </FormGroup>
                                    <Button onClick={newUnit} type="submit" className="btn btn-success">{btnMessage}</Button>

                                </Col>
                                <Col>
                                    <Table responsive >
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Nombre Unidad</th>
                                                <th>Opciones</th>

                                            </tr>
                                        </thead>
                                        <tbody >
                                            {arr.map((data) => (

                                                <tr key={data.id}>
                                                    <td>{data.id}</td>
                                                    <td>{data.name}</td>
                                                    <td><div><Row><Col md="2"><Button className="btn btn-success" type="submit" onClick={() => { editUnit(data.key) }}><Icon.Edit /></Button></Col></Row></div></td>

                                                </tr>


                                            ))}


                                        </tbody>
                                    </Table>
                                </Col>

                            </Row>
                        </FormGroup>
                    </ComponentCard>
                </Col>
            </Row>
        </>
    );
};

export default UnidadesComp;
