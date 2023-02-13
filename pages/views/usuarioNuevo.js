
import NewUsersForm from "@/components/NewUsers/NewUsersForm";

const usuarioNuevo = () => {

    return (
        <div>
            <NewUsersForm/>
        </div>
    );
};
export default usuarioNuevo;
usuarioNuevo.getLayout = function usuarioNuevo(page){
    return(
        <>
        {page}
        </>
    )
}