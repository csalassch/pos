import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PanelLicencias = () => {
    const [rol, setRol] =useState();
    const navigate = useNavigate();
    function verificaRol(){
        setRol("Admin");
    }
    useEffect(() =>{
        verificaRol();
    },[]);
    return (
        <>
            {rol && rol === "Admin" && navigate("/servicios/PanelLicenciasAdmin/")}
            {rol && rol === "Client" && navigate("/")}
        </>
    );
};
export default PanelLicencias;