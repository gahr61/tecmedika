import { forwardRef, useImperativeHandle, useState } from "react";
import moment from "moment";
import { Col, Grid, Message, Modal, Row, useToaster } from "rsuite";
import Button from "../../components/Button";
import { clinicHistoryAppointment, clinicHistoryPrint, clinicHistorySave } from "../../services/clinicHistory,";
import Input from "../../components/Input";
import { isValidForm, message, openFileNewWindow, showCtrlError } from "../../libs/functions";

const ModalClinicHistory = forwardRef(({
    getData
}, ref)=>{
    const toaster = useToaster();
    const [open, setOpen] = useState(false);
    const [appointment, setAppointment] = useState({
        id:'',
        folio:'',
        patient:{
            id:'',
            full_name:'',
            age:''
        },
        doctor:{
            id:'',
            full_name:'',
        }
    })
    const [clinicHistory, setClinicHistory] = useState({
        patients_id:'',
        doctors_id:'',
        appointment_id:'',
        date:moment().format('YYYY-MM-DD'),
        weight:'',
        height:'',
        visit_reason:'',
        diagnosis:'',
        treatment:'',
        notes:''
    });
    const [saved, setSaved] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [clinicHistoryId, setClinicHistoryId] = useState('');

    /**
     * abre el modal de historia clinica
     * @param {*} id 
     */
    const handleShow = async (id)=>{        
        let response = await clinicHistoryAppointment(id);
        if(response){
            setAppointment({
                id: response.appointment.id,
                folio: response.appointment.folio,
                patient:{
                    id: response.appointment.patients_id, 
                    full_name: response.appointment.patient_names+' '+response.appointment.patient_lastname1+(response.appointment.patient_lastname2 !== null ? ' '+response.appointment.patient_lastname2 :''),
                    age:''
                },
                doctor:{
                    id: response.appointment.doctors_id, 
                    full_name: response.appointment.doctor_names+' '+response.appointment.doctor_lastname1+(response.appointment.doctor_lastname2 !== null ? ' '+response.appointment.doctor_lastname2 :''),
                }
            });

            if(response.clinic_history !== null){
                setClinicHistory(response.clinicHistory);
            }
        }
        await setOpen(true);
    }

    /**
     * Cerrar modal de historia clinica
     */
    const handleClose = ()=>{
        setOpen(false);
        setAppointment({
            id:'',
            folio:'',
            patient:{
                id:'',
                full_name:'',
                age:''
            },
            doctor:{
                id:'',
                full_name:'',
            }
        })
        setClinicHistory({
            patients_id:'',
            doctors_id:'',
            appointment_id:'',
            date:moment().format('YYYY-MM-DD'),
            weight:'',
            height:'',
            visit_reason:'',
            diagnosis:'',
            treatment:'',
            notes:''
        });
        setSaved(false);
        setErrorMessage('')
    }

    /**
     * actualiza estado de variable de historia clinica
     * @param {*} e 
     */
    const handleChange = (e)=>{
        let name = e.target.name;
        let value = e.target.value;

        let data = clinicHistory;
        data = {
            ...data,
            [name]: value
        }

        setClinicHistory(data);

        if(value !== ''){
            showCtrlError(name);
        }
    }

    /**
     * Guarda datos de historia clinica
     * @returns 
     */
    const onSubmit = async ()=>{
        let error = '';

        if(!isValidForm('div.clinic-form')){
            error = 'Campos incompletos';
            setErrorMessage(error);
            return;
        }

        let obj = {
            ...clinicHistory,
            appointment_id: appointment.id,
            patients_id: appointment.patient.id,
            doctors_id: appointment.doctor.id,            
        }
        let response = await clinicHistorySave(obj);
        if(response){
            if(response.error){
                toaster.push(message('error', response.error), {placement:'topCenter', duration:'4000'});
                
            }else{
                toaster.push(message('success', response.message), {placement:'topCenter', duration:'4000'});
                getData();
                setClinicHistoryId(response.clinic_history);
                setSaved(true);
            }
        }
    }

    /**
     * Muestra el documento de historia clinica
     * @param {*} id 
     */
    const downloadDocument = async ()=>{
        let response = await clinicHistoryPrint(clinicHistoryId);
        if(response){
             openFileNewWindow(response);
        }
    }

    useImperativeHandle(ref, ()=>({
        handleShow
    }));

    return(
        <Modal open={open} size='sm' backdrop="static" onClose={handleClose}>
            <Modal.Title>Historia clínica</Modal.Title>
            <Modal.Body>
                <Grid fluid>
                    {errorMessage !== '' && (
                        <Message type="error">{errorMessage}</Message>
                    )}
                    <Col xs={24} className="clinic-form">
                        <Row>
                            <Col xs={24} md={8}>
                                <strong className="block">Folio cita:</strong>
                                <span className="block">{appointment.folio}</span>                            
                            </Col>

                            <Col xs={24} md={12}>
                                <strong className="block">Médico:</strong>
                                <span className="block">{appointment.doctor.full_name}</span>                            
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={24} md={8}>
                                <strong className="block">Paciente:</strong>
                                <span className="block">{appointment.patient.full_name}</span>                            
                            </Col>
                        </Row>
                        <hr />
                        <Row>
                            <Col xs={24} md={4}>
                                <span>Peso</span>
                                <Input 
                                    id="weight"
                                    type="number"
                                    value={clinicHistory.weight}
                                    handleChange={handleChange}
                                />
                            </Col>
                            <Col xs={24} md={4}>
                                <span>Altura</span>
                                <Input 
                                    id="height"
                                    type="number"
                                    value={clinicHistory.height}
                                    handleChange={handleChange}
                                />
                            </Col>
                            <Col xs={24} md={16}>
                                <span>Razón de visita</span>
                                <Input 
                                    id="visit_reason"
                                    value={clinicHistory.visit_reason}
                                    handleChange={handleChange}
                                    required
                                />
                            </Col>
                            <Col xs={24}>
                                <span>Diagnostico</span>
                                <Input 
                                    id="diagnosis"
                                    value={clinicHistory.diagnosis}
                                    handleChange={handleChange}
                                    required
                                />
                            </Col>
                            <Col xs={24}>
                                <span>Tratamiento</span>
                                <Input 
                                    id="treatment"
                                    value={clinicHistory.treatment}
                                    handleChange={handleChange}
                                    required
                                />
                            </Col>
                            
                            <Col xs={24}>
                                <span>Notas</span>
                                <Input 
                                    id="notes"
                                    value={clinicHistory.notes}
                                    handleChange={handleChange}
                                    
                                />
                            </Col>
                        </Row>
                    </Col>
                </Grid>
            </Modal.Body>
            <Modal.Footer>
                <Row>
                    <Col className="flex gap-2">
                        
                        {saved ? 
                            <>
                                <Button label="Cerrar" action={()=>handleClose()} />
                                <Button appearance={'primary'} label="Imprimir" action={()=>downloadDocument()} />
                            </>                            
                        : 
                            <>
                                <Button label="Cancelar" action={()=>handleClose()} />
                                <Button appearance={'primary'} label="Guardar" action={()=>onSubmit()} />
                            </>                            
                        }
                        
                    </Col>
                </Row>
            </Modal.Footer>
        </Modal>
    )
})

export default ModalClinicHistory;