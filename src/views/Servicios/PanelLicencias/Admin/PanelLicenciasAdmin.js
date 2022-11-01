import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';
import BreadCrumbs from '../../../../layouts/breadcrumbs/BreadCrumbs';

const PanelLicenciasAdmin = () => {
    const navigate = useNavigate();
    function redireccionaMe(direccion){
        console.log("Hola")
        navigate(direccion);
    }
    return (
        <>
            <BreadCrumbs />
            <p>¿Que desea realizar?</p>
            <button type='button' className='botoncito' onClick={redireccionaMe("/servicios/PanelLicenciasAdmin/Alta")}>Alta de licencias</button>
            <Button>Alta de licencias</Button>
            <Button>Alta de licencias</Button>
            <Button>Alta de licencias</Button>
            <br />
        </>
    );
};
export default PanelLicenciasAdmin;