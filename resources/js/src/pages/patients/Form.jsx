import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { Col, Divider, Grid, Message, Row, useToaster } from "rsuite";

import Input from "../../components/Input";
import Button from "../../components/Button";
import SelectForm from "../../components/Select";

import { isValidForm, message, showCtrlError } from "../../libs/functions";
import { patientsId, patientsSave, patientsUpdate } from "../../services/patients";


const PatientsForm = ()=>{
    const navigate = useNavigate();
    const toaster = useToaster();
    const {id} = useParams();

    const [patientData, setPatientData] = useState({
        names:'',
        lastname1:'',
        lastname2:'',
        email:'',
        sex:'',
        birthdate:'',
        phone:''
    });
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPhone, setErrorPhone] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);    

    /**
     * Obtiene datos de paciente
     */
    const getData = async ()=>{
        let response = await patientsId(id);
        if(response){
            setPatientData(response);
        }
    }

    /**
     * Envia datos de paciente
     */
    const onSubmit = async()=>{        
        let errors = [];

        if(!isValidForm('div.patients-form')){
            errors.push({error:'Campos incompletos'});
        }

        if(errorEmail !== ''){
            errors.push({error:'Verifique correo electronico'});
        }   
        if(errorPhone !== ''){
            errors.push({error:'Verifique número de teléfono'});
        }     

        if(errors.length > 0){
            setErrorMessages(errors);
            return;
        }

        let response;

        if(id){
            response = await patientsUpdate(id, patientData);
        }else{
            response = await patientsSave(patientData);
        }

        if(response){
            if(response.error){
                toaster.push(message('error', response.error), {placement:'topCenter', duration:'4000'});
                
            }else{
                toaster.push(message('success', response.message), {placement:'topCenter', duration:'4000'});
                navigate('/patients/list');
            }
        }
        
    }

    /**
     * Actualiza estado de variable pacientes
     * @param {*} e 
     */
    const handleChange = (e)=>{
        let name = e.target.name;
        let value = e.target.value;

        let data = patientData;

        data = {
            ...data,
            [name]: value
        }
        
        setPatientData(data);

        if(name === 'phone'){
            if(value.length < 12 && value !== ''){
                setErrorPhone('Teléfono no valido')
            }else if(value === '' || value.length === 12){
                setErrorPhone('');
            }
        }

        if(value !== ''){
            showCtrlError(name);
        }
    }

    useEffect(()=>{
        getData();
    }, []);

    return(
        <Grid fluid className="p-4">
            <Row>
                <Col xs={24} md={20} mdOffset={2} lg={16} lgOffset={4} className="patients-form">
                    <h2>Pacientes - {id ? 'Edición' : 'Registro'}</h2>
                    
                    {errorMessages.length > 0 && (
                        <Message type="error">
                            <ul>
                                {errorMessages.map((error, index)=>
                                    <li key={index}>{error.error}</li>
                                )}
                            </ul>
                            
                        </Message>
                    )}
                    <Divider />
                    <Row>
                        <Col xs={24} md={4}>
                            <span>Nombres</span>
                            <Input 
                                id="names"
                                value={patientData.names}
                                handleChange={(e)=>handleChange(e)}
                                required
                            />
                        </Col>
                        <Col xs={24} md={4}>
                            <span>Ap. Paterno</span>
                            <Input 
                                id="lastname1"
                                value={patientData.lastname1}
                                handleChange={(e)=>handleChange(e)}
                                required
                            />
                        </Col>
                        <Col xs={24} md={4}>
                            <span>Ap. Materno</span>
                            <Input 
                                id="lastname2"
                                value={patientData.lastname2}
                                handleChange={(e)=>handleChange(e)}
                                
                            />
                        </Col>
                        <Col xs={24} md={4}>
                            <span>F. Nacimiento</span>
                            <Input 
                                id="birthdate"
                                type="date"
                                value={patientData.birthdate}
                                handleChange={(e)=>handleChange(e)}
                                required
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} md={8}>
                            <span>Correo electrónico</span> {errorEmail !== '' && (<span className="error-field">{errorEmail}</span>)}
                            <Input 
                                id="email"
                                value={patientData.email}
                                handleChange={(e)=>handleChange(e)}
                                setError={setErrorEmail}
                                required
                            />
                        </Col>
                        <Col xs={24} md={4}>
                            <span>Gènero</span>
                            <SelectForm 
                                id="sex"
                                value={patientData.sex}
                                handleChange={(e)=>handleChange(e)}
                                options={[
                                    {label:'Masculino', value:'Masculino'},
                                    {label:'Femenino', value:'Femenino'},
                                    {label:'Otro', value:'Otro'},
                                ]}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={24} md={4}>
                            <span>Teléfono</span> {errorPhone !== '' && (<span className="error-field">{errorPhone}</span>)}
                            <Input 
                                id="phone"
                                value={patientData.phone}
                                handleChange={(e)=>handleChange(e)}
                                required
                            />
                        </Col>                        
                    </Row>
                    <Row>
                        <Col xs={24} className="flex gap-2 mt-2">
                            <Button label="Cancelar" action={()=>navigate('/patients/list')} />
                            <Button 
                                appearance="primary" 
                                label={id ? "Actualizar" : "Guardar"}
                                action={()=>onSubmit()} 
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Grid>
    )
}

export default PatientsForm;