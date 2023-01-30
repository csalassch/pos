import Image from "next/image";
import loaderKoonol from '../../assets/images/loader/loaderKoonol.gif';

export default function Loader(){
    return (
        <div className="container-fluid d-flex justify-content-center align-items-center loaderBg" style={{maxWidth:"100%",minHeight:"100vh",position:"fixed",right:"0px",zIndex:"5"}}>

            <Image
            src={loaderKoonol}
            alt="loader"
            width={"400px"}
            height={"180px"}
            />
        </div>
    )
}