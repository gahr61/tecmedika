import { forwardRef, useImperativeHandle, useState } from "react";
import { Col, Grid, Message, Modal, Row, useToaster } from "rsuite";
import moment from "moment";

import Button from "../../components/Button";
import Input from "../../components/Input";
import SelectForm from "../../components/Select";

import { addErrorToSelectedField, decript, isValidForm, message, showCtrlError } from "../../libs/functions";
import { patientsList } from "../../services/patients";
import { doctorsList } from "../../services/doctors";
import { appointmentsId, appointmentsSave, appointmentsUpdate } from "../../services/appointments";

const ModalForm = forwardRef(({
    getData
}, ref)=>{
    const role = decript('role');
    const toaster = useToaster();

    const [open, setOpen] = useState(false);
    const [dataForm, setDataForm] = useState({
        date:'',
        time:'',
        patients_id:'',
        doctors_id:''
    });
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [errorMessage, setErrorsMessage] = useState([]);

    /**
     * Muestra el modal de registro de cita
     */
    const handleShow = async(id)=>{
        let canOpen = true;
        let response = await patientsList();
        if(response){
            let data = response.map((res)=>{
                let item = {
                    label: res.names+' '+res.lastname1+(res.lastname2 !== null ? ' '+res.lastname2 :''),
                    value: res.id
                }

                return item;
            });

            await setPatients(data);

            if(data.length === 0){
                canOpen = false;
                toaster.push(
                    message('warning', 'Para continuar con el registro de cita debe registrar un paciente'),
                    {placement:'topCenter', duration:6000}
                )
            }
        }

        if(role !== 'Doctor'){
            response = await doctorsList();
            if(response){
                let data = response.map((res)=>{
                    let item = {
                        label: res.names+' '+res.lastname1+(res.lastname2 !== null ? ' '+res.lastname2 :''),
                        value: res.id
                    }
    
                    return item;
                });
    
                await setDoctors(data);
            }

        }
        
        if(id){
            await getAppointment(id);
        }

        await setOpen(canOpen);
    }

    /**
     * Obtiene datos de cita
     * @param {*} id identificador de cita
     */
    const getAppointment = async (id)=>{
        let response = await appointmentsId(id);
        if(response){
            setDataForm(response);
        }
    }

    /**
     * Cierra el modal de registro de cita
     */
    const handleClose = ()=>{
        setOpen(false);
        setDataForm({
            date:'',
            time:'',
            patients_id:'',
            doctors_id:''   
        });
        setPatients([]);
        setDoctors([]);
    }

    /**
     * Actualiza datos de registro de cita
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
            addErrorToSelectedField(name, value);
        }
    }

    /**
     * Guarda los datos de la cita
     */
    const onSubmit = async()=>{
        let errors = [];
        if(!isValidForm('div.appointment-form')){
            errors.push('Campos incompletos');
        }

        addErrorToSelectedField('patients_id', dataForm.patients_id);
        addErrorToSelectedField('doctors_id', dataForm.doctors_id);

        if(errors.length > 0){
            setErrorsMessage(errors);
            return;
        }
        
        let obj = dataForm;
        obj = {
            ...obj,
            folio: moment().format('YYMMDDHHmmss')
        };

        let response;
        
        if(obj.id){
            response = await appointmentsUpdate(obj.id, obj);
        }else{
            response = await appointmentsSave(obj);
        }
        if(response){
            if(response.error){
                toaster.push(message('error', response.error), {placement:'topCenter', duration:'4000'});
                
            }else{
                toaster.push(message('success', response.message), {placement:'topCenter', duration:'4000'});
                getData();
                handleClose();
            }
        }


    }


    /**
     * Permite utilizar las funciones desde otros componentes
     */
    useImperativeHandle(ref, ()=>({
        handleShow
    }));

    return(
        <Modal size="sm" open={open} backdrop="static" onClose={handleClose}>
            <Modal.Title>Datos de cita</Modal.Title>
            <Modal.Body style={{overflow:'unset'}}>
                <Grid fluid>
                    {errorMessage.length > 0 && (
                        <Message type="error">
                            <ul>
                                {errorMessage.map((error, index)=>
                                    <li key={index}>{error}</li>
                                )}
                            </ul>
                            
                        </Message>
                    )}
                    <Col xs={24} className="appointment-form">
                        <Row>
                            <Col xs={24} md={8}>
                                <span>Fecha</span>
                                <Input 
                                    id="date"
                                    type="date"
                                    min={moment().format('YYYY-MM-DD')}
                                    value={dataForm.date}
                                    handleChange={handleChange}
                                    required
                                />
                            </Col>
                            <Col xs={24} md={8}>
                                <span>Hora</span>
                                <Input 
                                    id="time"
                                    type="time"
                                    value={dataForm.time}
                                    handleChange={handleChange}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} md={12}>
                                <span>Paciente</span>
                                <SelectForm 
                                    id="patients_id"
                                    value={dataForm.patients_id}
                                    options={patients}
                                    handleChange={handleChange}
                                    required
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} md={12}>
                                <span>Asignar a médico</span>
                                <SelectForm 
                                    id="doctors_id"
                                    value={dataForm.doctors_id}
                                    options={doctors}
                                    handleChange={handleChange}
                                    required
                                />
                            </Col>
                        </Row>
                    </Col>
                </Grid>
            </Modal.Body>
            <Modal.Footer>
                <Row>
                    <Col className="flex gap-2">
                        <Button label="Cancelar" action={()=>handleClose()} />
                        <Button appearance={'primary'} label="Guardar" action={()=>onSubmit()} />
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    )
})

export default ModalForm;