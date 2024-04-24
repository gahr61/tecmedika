import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";

import Input from "../../components/Input";
import { usersId, usersUpdate } from "../../services/users";
import { Col, Divider, Grid, Message, Row, Toggle, useToaster } from "rsuite";
import Button from "../../components/Button";

const UsersForm = ()=>{
    const navigate = useNavigate();
    const toaster = useToaster();
    const {id} = useParams();

    const [userData, setUserData] = useState({
        names:'',
        lastname1:'',
        lastname2:'',
        email:'',
        role:'',
        isActive:false
    });
    
    const message = (type, text)=>(
        <Message showIcon type={type} closable>
            <strong>{type}!</strong> {text}
        </Message>
    )

    /**
     * Obtiene datos de usuario
     */
    const getData = async ()=>{
        let response = await usersId(id);
        if(response){
            setUserData(response);
        }
    }

    /**
     * Actualiza datos de usuario
     */
    const onUpdate = async()=>{        
        let response = await usersUpdate(id, userData);
        if(response){
            if(response.error){
                toaster.push(message('error', response.error), {placement:'topCenter', duration:'4000'});
                
            }else{
                toaster.push(message('success', response.message), {placement:'topCenter', duration:'4000'});
                navigate('/users/list');
            }
            
        }
    }

    useEffect(()=>{
        getData();
    }, []);

    return(
        <Grid fluid className="p-4">
            <Row>
                <Col xs={24} md={20} mdOffset={2} lg={16} lgOffset={4}>
                    <h2>Usuarios - Edición</h2>
                    <Divider />
                    <Row>
                        <Col xs={24} md={4}>
                            <span>Nombres</span>
                            <Input 
                                id="names"
                                value={userData.names}
                                disabled
                            />
                        </Col>
                        <Col xs={24} md={4}>
                            <span>Ap. Paterno</span>
                            <Input 
                                id="lastname1"
                                value={userData.lastname1}
                                disabled
                            />
                        </Col>
                        <Col xs={24} md={4}>
                            <span>Ap. Materno</span>
                            <Input 
                                id="lastname2"
                                value={userData.lastname2}
                                disabled
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} md={8}>
                            <span>Correo electrónico</span>
                            <Input 
                                id="email"
                                value={userData.email}
                                disabled
                            />
                        </Col>
                        <Col xs={24} md={4}>
                            <span>Estatus</span>
                            <div>
                                <Toggle 
                                    size='md' 
                                    checked={userData.isActive}
                                    checkedChildren="Activo"
                                    unCheckedChildren="Inactivo"
                                    onChange={()=>{
                                        setUserData({
                                            ...userData,
                                            isActive: !userData.isActive
                                        });
                                    }}
                                />
                            </div>                            
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} className="flex gap-2 mt-2">
                            <Button label="Cancelar" action={()=>navigate('/users/list')} />
                            <Button appearance="primary" label="Actualizar" action={()=>onUpdate()} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Grid>
    )
}

export default UsersForm;