import { ButtonGroup, Col, Divider, Grid, IconButton, Row, useToaster } from "rsuite"
import { Fragment, useEffect, useState } from "react";

import DetailIcon from '@rsuite/icons/Detail';
import EditIcon from '@rsuite/icons/Edit';
import TrashIcon from '@rsuite/icons/Trash';

import Table from "../../components/Table";
import IconButtonTooltip from "../../components/IconButtonTooltip";

import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { patients, patientsDelete } from "../../services/patients";
import Swal from "sweetalert2";
import { decript, message } from "../../libs/functions";

const PatientsList = ()=>{
    const navigate = useNavigate();
    const toaster = useToaster();
    const role = decript('role');

    const columns = [
        {label:'Nombre', selector: row => row.col1, show:true},
        {label:'Correo electrónico', selector: row => row.col2, show:true},
        {label:'Teléfono', selector: row => row.col3, show:true},  
        {label:'', selector: row => {
            return(
                <Fragment>
                    <ButtonGroup>
                        <IconButtonTooltip 
                            icon={<DetailIcon />}
                            text={'Historia clínica'}
                            action={()=>onEdit(row.id)}
                        />
                        <IconButtonTooltip 
                            icon={<EditIcon />}
                            text={'Editar'}
                            action={()=>onEdit(row.id)}
                        />
                        <IconButtonTooltip 
                            icon={<TrashIcon />}
                            text={'Eliminar'}
                            action={()=>onDelete(row.id)}
                        />
                    </ButtonGroup>
                </Fragment>
            )
        }, show:true}
    ];

    const [data, setData] = useState([]);

    /**
     * Entra a pantalla de edicion
     * @param {id} identificador de paciente
     */
    const onEdit = (id)=>{
        navigate('/patients/edit/'+id);
    }

    /**
     * Confirmacion para eliminar paciente
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
                let response = await patientsDelete(id);
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
     * Obtiene listado de pacientes
     */
    const getData = async ()=>{
        let response = await patients();
        if(response){
            let items = response.map((res)=>{
                let item = {
                    id: res.id,
                    col1: res.names+' '+res.lastname1+(res.lastname2 !== null ? ' '+res.lastname2 :''),
                    col2: res.email,
                    col3: res.phone,                    
                }

                return item;
            });

            setData(items);
        }
    }

    useEffect(()=>{
        getData();
    }, []);

    return(
        <Grid fluid className="p-4">
            <Row>
                <Col xs={24} md={20} mdOffset={2} lg={18} lgOffset={3}>
                    <h2>Patientes - Listado</h2>
                    <div className="pt-4">
                        <Button appearance={'primary'} label={'Nuevo paciente'} action={()=>navigate('/patients/new')} />
                    </div>
                    <Divider />
                    <Table 
                        columns={columns}
                        data={data}
                    />
                </Col>
            </Row>
        </Grid>
    )
}

export default PatientsList;