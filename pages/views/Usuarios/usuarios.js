import BreadCrumbs from "@/layouts/breadcrumbs/BreadCrumbs";
import UsuariosComp from "@/components/Usuarios/UsuariosComp";
import { withPublic } from "@/hooks/route";

const Usuarios = () => {

    return (
        <div>
            <BreadCrumbs />
            <UsuariosComp/>
        </div>
    );
};
export default withPublic(Usuarios);