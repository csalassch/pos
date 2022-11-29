import { useEffect } from "react";
import BreadCrumbs from "../../layouts/breadcrumbs/BreadCrumbs";
import ActualizaDatos from "../../components/Soporte/ActualizaDatos";
import { useAuth } from "../../Context/authContext";

const Soporte = () => {
    const { dataUser } = useAuth();
    useEffect(() => {
    }, [ dataUser])
    return (
        <>
            <BreadCrumbs />
            <ActualizaDatos datos={dataUser}/>
        </>
    );
};

export default Soporte;
