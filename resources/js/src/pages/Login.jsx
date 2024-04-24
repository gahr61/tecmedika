import { Button, Col, Grid, Message, Row } from "rsuite"

import Input from "../components/Input";
import { useEffect, useState } from "react";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";
import { encript, isAuth, isValidForm, showCtrlError } from "../libs/functions";

const Login = ()=>{
    const navigate = useNavigate();

    const [dataForm, setDataForm] = useState({
        email:'',
        password:''
    });

    const [errorEmail, setErrorEmail] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);

    /**
     * Actualiza datos de campos de formulario
     * @param {e} {name, value}
     */
    const handleChange = (e)=>{
        let name = e.target.name;
        let value = e.target.value;

        let data = dataForm;

        data = {
            ...data,
            [name]: value
        };

        setDataForm(data);

        if(value !== ''){
            showCtrlError(name);
            setErrorMessages([]);
        }
    }

    /**
     * Inicia sesion
     */
    const onSubmit = async ()=>{
        let errors = [];

        if(!isValidForm('div.login-form')){
            errors.push({error:'Campos requeridos'});
        }

        if(errorEmail !== ''){
            errors.push({error:'Verifique correo electronico'});
        }       

        if(errors.length > 0){
            setErrorMessages(errors);
            return;
        }

        let response = await login(dataForm);
        if(response){
            if(response.error){
                setErrorMessages([{error:response.error}]);
            }else{
                encript('token', response.access_token);
                encript('user', JSON.stringify(response.user));
                encript('expires_at', response.expires_at);
                encript('role', response.role);
                navigate('/');
            }            
        }
    }

    useEffect(()=>{
        if(isAuth()){
            navigate('/');
        }
    },[]);

    return(
        <Grid fluid>
            <Row className="full-height flex justify-content-center align-items-center">
                <Col xs={22} md={12} lg={8} className="border border-radius">
                    <Row className="p-4">
                        <Col xs={24} className="mt-2 mb-3">
                            <h3 className="center">Tec-Medika</h3>
                        </Col>
                        <Col xs={24} md={20} mdOffset={2} lg={18} lgOffset={3} className="login-form">
                            {errorMessages.length > 0 && (
                                <Message type="error">
                                    <ul>
                                        {errorMessages.map((error, index)=>
                                            <li key={index}>{error.error}</li>
                                        )}
                                    </ul>
                                    
                                </Message>
                            )}
                            <div className="p-2">
                                <span>Usuario</span> {errorEmail !== '' && (<span className="error-field">{errorEmail}</span>)}
                                <Input 
                                    id="email"
                                    value={dataForm.email}
                                    handleChange={(e)=>handleChange(e)}
                                    setError={setErrorEmail}
                                    required
                                />
                            </div>
                            <div className="p-2">
                                <span>Contraseña</span>
                                <Input 
                                    id="password"
                                    type="password"
                                    value={dataForm.password}
                                    handleChange={(e)=>handleChange(e)}
                                    required
                                />
                            </div>
                            <div className="p-2">
                                <Button appearance="primary" onClick={()=>onSubmit()}>Iniciar sesión</Button>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Grid>
    )
}

export default Login;