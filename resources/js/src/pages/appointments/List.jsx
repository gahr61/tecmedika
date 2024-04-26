import { ButtonGroup, Col, Divider, Grid, Row, useToaster } from "rsuite"
import { Fragment, useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import moment from "moment";

import DetailIcon from '@rsuite/icons/Detail';
import EditIcon from '@rsuite/icons/Edit';
import AdminIcon from '@rsuite/icons/Admin';
import TrashIcon from '@rsuite/icons/Trash';

import Table from "../../components/Table";
import IconButtonTooltip from "../../components/IconButtonTooltip";
import SelectForm from "../../components/Select";
import ModalForm from "./ModalForm";
import Button from "../../components/Button";

import { decript, message, openFileNewWindow } from "../../libs/functions";
import { appointments, appointmentsDelete } from "../../services/appointments";
import ModalClinicHistory from "./ModalClinicHistory";
import { clinicHistoryPrint } from "../../services/clinicHistory,";


const AppointmentsList = ()=>{
    const toaster = useToaster();
    const modal = useRef();
    const clinicRef = useRef();
    const role = decript('role');

    const columns = [
        {label:'Folio', selector: row => row.col1, show:true},
        {label:'Fecha/Hora', selector: row => row.col2, show:true},
        {label:'Paciente', selector: row => row.col3, show:true},         
        {label:'Asignado a', selector: row => row.col4, show: role === 'Doctor' ? false : true},
        {label:'Estatus', selector: row => row.col5, show:true}, 
        {label:'', selector: row => {
            return(
                <Fragment>
                    <ButtonGroup>
                        <IconButtonTooltip 
                            icon={<DetailIcon />}
                            text={'Historia clínica'}
                            action={()=>downloadDocument(row.clinic_history_id)}
                            disabled={row.col5 !== 'Terminada' }
                        />
                        <IconButtonTooltip 
                            icon={<AdminIcon />}
                            text={'Iniciar cita'}
                            action={()=>openClinicHistory(row.id)}
                            disabled={row.col5 !== 'Activa'}
                        />
                        <IconButtonTooltip 
                            icon={<EditIcon />}
                            text={'Editar'}
                            action={()=>onEdit(row.id)}
                            disabled={row.col5 !== 'Activa' && row.col5 !== 'Vencida'}
                        />
                        <IconButtonTooltip 
                            icon={<TrashIcon />}
                            text={'Cancelar'}
                            action={()=>onDelete(row.id)}
                            disabled={row.col5 !== 'Activa' && row.col5 !== 'Vencida'}
                        />
                    </ButtonGroup>
                </Fragment>
            )
        }, show:true}
    ];

    const [data, setData] = useState([]);
    const [status, setStatus] = useState('all');

    /**
     * Entra a edicion de cita
     * @param {id} identificador de paciente
     */
    const onEdit = (id)=>{
        modal.current.handleShow(id);
    }

    /**
     * Confirmacion para cancelar cita
     */
    const onDelete = (id)=>{
        Swal.fire({
            title:'Alerta',
            text:'Desea eliminar el registro?',
            icon:'info',
            confirmButtonText:'Si, eliminar',
            confirmButtonColor:'#2196f3',
            cancelButtonText:'No, cancelar',
            showCancelButton:true
        }).then(async (result)=>{
            if(result.isConfirmed){
                let response = await appointmentsDelete(id);
                console.log(response)
                if(response){
                    if(response.error){
                        toaster.push(message('error', response.error), {placement:'topCenter', duration:'4000'});                        
                    }else{
                        toaster.push(message('success', response.message), {placement:'topCenter', duration:'4000'});
                        getData();
                    }
                }
            }
        });
    }

    /**
     * Filtra los resultados por estatus
     */
    const onSearch = (e)=>{
        let value = e.target.value;

        setStatus(value);
        if(value !== ''){
            getData(value);
        }
        
    }

    /**
     * Muestra el documento de historia clinica
     * @param {*} id 
     */
    const downloadDocument = async (id)=>{
        let response = await clinicHistoryPrint(id);
        if(response){
             openFileNewWindow(response);
        }
    }

    /**
     * Obtiene listado de citas
     */
    const getData = async (value = status)=>{
        let response = await appointments(value);
        if(response){
            let items = response.map((res)=>{
                let item = {
                    id: res.id,
                    clinic_history_id: res.clinic_history_id,
                    col1: res.folio,
                    col2: moment(res.date).format('DD/MM/YYYY')+' '+moment(res.time, 'HH:mm:ss').format('HH:mm'),
                    col3: res.patient_names+' '+res.patient_lastname1+(res.patient_lastname2 !== null ? ' '+res.patient_lastname2 :''),
                    col4: res.doctor_names+' '+res.doctor_lastname1+(res.doctor_lastname2 !== null ? ' '+res.doctor_lastname2 :''),
                    col5: res.status,
                }

                return item;
            });

            setData(items);
        }
    }


    const openClinicHistory = (id)=>{
        clinicRef.current.handleShow(id);
    }

    useEffect(()=>{
        getData();
    }, []);

    return(
        <Grid fluid className="p-4">
            <Row>
                <Col xs={24} md={20} mdOffset={2} lg={18} lgOffset={3}>
                    <h2>Citas - Listado</h2>
                    <Col xs={24} className="pt-4 flex align-items-end">
                        <Col xs={24} md={4}>
                            <span>Estatus</span>
                            <SelectForm 
                                id="status"
                                value={status}
                                options={[
                                    {label:'Todos', value:'all'},
                                    {label:'Activa', value:'Activa'},
                                    {label:'Vencida', value:'Vencida'},
                                    {label:'Terminada', value:'Terminada'},
                                ]}
                                handleChange={(e)=>onSearch(e)}
                            />
                        </Col>
                        <Col xs={24} md={8}>
                            <Button appearance={'primary'} label={'Nueva cita'} action={()=>modal.current.handleShow()} />
                        </Col>                           
                    </Col>
                    <Col>
                        <Divider />
                    </Col>
                    <Table 
                        columns={columns}
                        data={data}
                    />
                </Col>
            </Row>

            <ModalForm 
                getData={getData}
                ref={modal}
            />
            <ModalClinicHistory
                getData={getData} 
                ref={clinicRef}
            />
        </Grid>
    )
}

export default AppointmentsList;