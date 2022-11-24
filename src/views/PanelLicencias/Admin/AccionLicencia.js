import { useEffect } from "react";
import { useParams } from "react-router-dom";
import BreadCrumbs from "../../../layouts/breadcrumbs/BreadCrumbs";
import Alta from "../../../components/PanelLicencias/Admin/Licencias/Alta";
import Editar from "../../../components/PanelLicencias/Admin/Licencias/Editar";
import AltaP from "../../../components/PanelLicencias/Admin/Productos/AltaP";
import EditarP from "../../../components/PanelLicencias/Admin/Productos/EditarP";
import AltaM from "../../../components/PanelLicencias/Admin/Modulos/AltaM";
import EditarM from "../../../components/PanelLicencias/Admin/Modulos/EditarM";


const AccionLicencia = () => {
    const { action, id } = useParams();
    useEffect(()=>{
    },[])
    return (
        <>
            <BreadCrumbs />
            {action ==="AL" ? <Alta />:<div></div>}
            {action ==="EL" ?<Editar id={id}/>:<div></div>}
            {action ==="AP" ? <AltaP />:<div></div>}
            {action ==="EP" ?<EditarP id={id}/>:<div></div>}
            {action ==="AM" ? <AltaM />:<div></div>}
            {action ==="EM" ?<EditarM id={id}/>:<div></div>}
        </>
    );
};
export default AccionLicencia;