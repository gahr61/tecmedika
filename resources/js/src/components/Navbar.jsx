import { useNavigate } from "react-router-dom";
import { Nav, Navbar as NavContainer } from "rsuite";
import { decript } from "../libs/functions";

const Navbar = ()=>{
    const navigate = useNavigate();
    const role = decript('role');

    return (
        <NavContainer appearance="subtle">
            <NavContainer.Brand onClick={()=>navigate('/')}>Tec-Medika</NavContainer.Brand>
            <Nav>
                {role !== 'Doctor' && (
                    <Nav.Item onClick={()=>navigate('/users/list')}>Usuarios</Nav.Item>
                )}                
                <Nav.Item onClick={()=>navigate('/patients/list')}>Pacientes</Nav.Item>
                <Nav.Item>Citas</Nav.Item>
            </Nav>
            <Nav pullRight>
                <Nav.Item>Salir</Nav.Item>
            </Nav>
        </NavContainer>
    )
}

export default Navbar;