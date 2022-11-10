import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../../../layouts/breadcrumbs/BreadCrumbs";
import Alta from "../../../components/PanelLicencias/Admin/Alta";
import Editar from "../../../components/PanelLicencias/Admin/Editar";

const AccionLicencia = () => {
    const { action, id } = useParams();
    useEffect(()=>{
        console.log(id)
    },[])
    return (
        <>
            <BreadCrumbs />
            {action ==="A" ? <Alta />:<div></div>}
            {action ==="E" ?<Editar />:<div></div>}
        </>
    );
};
export default AccionLicencia;