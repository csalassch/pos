import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import BreadCrumbs from '../../../../layouts/breadcrumbs/BreadCrumbs';

const PanelLicenciasAdmin = () => {
    const navigate = useNavigate();
    //Funcion para redireccionar a las diferentes opciones que proporciona un administrador
    function redireccionaMe(ruta){
        if(ruta === 1){
            navigate("/servicios/PanelLicenciasAdmin/Alta");
        }
    }
    return (
        <>
            <BreadCrumbs />
            <p>¿Que desea realizar?</p>
            <Button type='button' className='botoncito' onClick={()=>{ redireccionaMe(1)}}>Alta de licencias</Button>
            <Button>Alta de licencias</Button>
            <Button>Alta de licencias</Button>
            <Button>Alta de licencias</Button>
            <br />
        </>
    );
};
export default PanelLicenciasAdmin;