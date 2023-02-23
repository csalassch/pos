import { useEffect } from 'react';
import * as Icon from 'react-feather';

function UsersData() {
    // Datos para usuarios
    // Nombre, apellido,rol o roles, teléfono,matriz,sucursal,correo electrónico, foto de perfil


    const userData = [
        {
            id:"ubi1",
            open:true,
            ubicacion: "Ubicación 1",
            users: [
                {
                    active: true,
                    id: "AGCFRBG",
                    name: "Adrián Aguilar Cruz",
                    email: "adrian.aguilar@freebug.mx",
                    dateCreated: "20/12/2022",
                    roles: "Chinculin, Desarrollador Jr.",
                    image:"https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2Fuser4.jpg?alt=media&token=079dff45-3f00-4364-b458-c7fac1443213"


                },
                {
                    active: false,
                    id: "RLOFRBG",
                    name: "Ricardo López Ortiz",
                    email: "ricardo.lopez@freebug.mx",
                    dateCreated: "20/12/2022",
                    roles: "Desarrollador Jr.",
                    image:"https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2Fuser5.jpg?alt=media&token=912b30fb-6ab3-4e88-9484-5f9388642e34"

                }
            ]

        },
        {
            id:"ubi2",
            open:true,
            ubicacion: "Ubicación 2",
            users: [
                {
                    active: false,
                    id: "DBJFRBG",
                    name: "Diego Bernardo Jiménez Tabla",
                    email: "diego.jimenez@freebug.mx",
                    dateCreated: "20/12/2022",
                    roles: "Project Manager",
                    image:"https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2Fuser4.jpg?alt=media&token=079dff45-3f00-4364-b458-c7fac1443213"

                }
            ]

        },
        {
            id:"ubi3",
            open:true,
            ubicacion: "Ubicación 3",
            users: [
                {
                    active: false,
                    id: "MJTFRBG",
                    name: "Magdiel Jiménez Tabla",
                    email: "elimjt777@gmail.com",
                    dateCreated: "20/12/2022",
                    roles: "Chinchulina",
                    image:"https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2FprofileMag1.jpg?alt=media&token=90a38036-93d0-4600-a393-b9cebdcda220"

                }
            ]

        }
        ,
        {
            id:"ubi4",
            open:true,
            ubicacion: "Ubicación 4",
            users: [
                {
                    active: false,
                    id: "JTFRBG",
                    name: "Jorge Tenorio",
                    email: "jorge.tenorio@freebug.mx",
                    dateCreated: "20/12/2022",
                    roles: "Desarrollador Backend",
                    image:"https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2Fuser5.jpg?alt=media&token=912b30fb-6ab3-4e88-9484-5f9388642e34"

                }
            ]

        }
        ,
        {
            id:"ubi5",
            open:true,
            ubicacion: "Ubicación 5",
            users: [
                {
                    active: false,
                    id: "DMFRBG",
                    name: "Dylan Mendoza",
                    email: "dylan.mendoza@freebug.mx",
                    dateCreated: "20/12/2022",
                    roles: "desarrollador Netsuite",
                    image:"https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2Fuser5.jpg?alt=media&token=912b30fb-6ab3-4e88-9484-5f9388642e34"

                }
            ]

        },
        {
            id:"ubi6",
            open:true,
            ubicacion: "Ubicación 6",
            users: [
                {
                    active: true,
                    id: "MVRFRBG",
                    name: "Markito Vega Ramírez",
                    email: "marco.vega@freebug.mx",
                    dateCreated: "20/12/2022",
                    roles: "desarrolador Netsuite",
                    image:"https://firebasestorage.googleapis.com/v0/b/panellicencia.appspot.com/o/images%2Fuser4.jpg?alt=media&token=079dff45-3f00-4364-b458-c7fac1443213"

                }
            ]

        }
    ];
    useEffect(()=>{

    },[userData]);
    return userData;
};

export default UsersData;
