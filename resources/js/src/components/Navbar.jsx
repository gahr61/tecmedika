import { useNavigate } from "react-router-dom";
import { Nav, Navbar as NavContainer, useToaster } from "rsuite";
import { decript, message } from "../libs/functions";
import { logout } from "../services/auth";

const Navbar = ()=>{
    const navigate = useNavigate();
    const toaster = useToaster();
    const role = decript('role');

    const onLogout = async ()=>{
        let response = await logout();
        if(response){
            if(response.error){
                toaster.push(message('error', response.error), {placement:'topCenter', duration:4000});
            }else{
                toaster.push(message('success', response.message), {placement:'topCenter', duration:4000});
                sessionStorage.clear();
                navigate('/login');
            }
        }
    }

    return (
        <NavContainer appearance="subtle">
            <NavContainer.Brand onClick={()=>navigate('/')}>Tec-Medika</NavContainer.Brand>
            <Nav>
                {role !== 'Doctor' && (
                    <Nav.Item onClick={()=>navigate('/users/list')}>Usuarios</Nav.Item>
                )}                
                <Nav.Item onClick={()=>navigate('/patients/list')}>Pacientes</Nav.Item>
                <Nav.Item onClick={()=>navigate('/appointment/list')}>Citas</Nav.Item>
            </Nav>
            <Nav pullRight>
                <Nav.Item onClick={()=>onLogout()}>Salir</Nav.Item>
            </Nav>
        </NavContainer>
    )
}

export default Navbar;