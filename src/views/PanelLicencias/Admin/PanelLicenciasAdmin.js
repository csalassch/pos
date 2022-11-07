import { useState, useEffect } from 'react';
import BreadCrumbs from '../../../layouts/breadcrumbs/BreadCrumbs';
import TablePanelLicencias from '../../../components/PanelLicencias/TablePanelLicencias';

const PanelLicenciasAdmin = () => {
    const [users, setUsers] = useState([]);
    const arr = [];
    //Obtenemos todos los datos de las licencias adquiridas
    const getDataLicenses = async()=> {
        for (let i = 0; i < 10; i++) {
            const obj = {
                ID_Licencia: i,
                Plan: `Plan ${i}`,
                Descripcion: `Descripcion ${i}`,
                Monto: `$ ${i} peso`,
                Fecha_Inicio: (new Date()).toString(),
                Fecha_Fin: (new Date()).toString(),
                status: `done`,
                recurrente: `si`
            }
            arr.push(obj);
        }
        console.log(arr)
        setUsers(arr);
    }
    useEffect(() =>{
        getDataLicenses();
        console.log("Dato users ",users)
    },[]);
    return (
        <>
            <BreadCrumbs />
            <TablePanelLicencias lista = {users}/>
        </>
    );
};
export default PanelLicenciasAdmin;