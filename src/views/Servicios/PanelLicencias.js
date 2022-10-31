import { useState, useEffect } from 'react';
import TablePanelLicencias from '../../components/Services/TablePanelLicencias';
import BreadCrumbs from '../../layouts/breadcrumbs/BreadCrumbs';
import user1 from '../../assets/images/users/user1.jpg';

const PanelLicencias = () => {
    const [users, setUsers] = useState([]);
    const arr = [];
    const getDataLicenses = async()=> {
        for (let i = 0; i < 10; i++) {
            const obj = {
                avatar: user1,
                name: `Hanna Gover${i}`,
                email: `hgover@gmail.com${i}`,
                project: `Flexy React${i}`,
                status: `pending`,
                weeks: `35${i}`,
                budget: `95K${i}`,
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
export default PanelLicencias;