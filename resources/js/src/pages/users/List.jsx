import { ButtonGroup, Col, Divider, Grid, IconButton, Row } from "rsuite"
import { Fragment, useEffect, useState } from "react";

import EditIcon from '@rsuite/icons/Edit';
import TrashIcon from '@rsuite/icons/Trash';

import Table from "../../components/Table";
import Input from '../../components/Input';
import IconButtonTooltip from "../../components/IconButtonTooltip";

import { users } from "../../services/users";
import { useNavigate } from "react-router-dom";

const UsersList = ()=>{
    const navigate = useNavigate();

    const columns = [
        {label:'Nombre', selector: row => row.col1},
        {label:'Correo electrónico', selector: row => row.col2},
        {label:'Rol', selector: row => row.col3},
        {label:'Estatus', selector: row => row.col4},
        {label:'', selector: row => {
            return(
                <Fragment>
                    <ButtonGroup>
                        <IconButtonTooltip 
                            icon={<EditIcon />}
                            text={'Editar'}
                            action={()=>onEdit(row.id)}
                        />
                    </ButtonGroup>
                </Fragment>
            )
        }}
    ];

    const [data, setData] = useState([]);

    /**
     * Entra a pantalla de edicion
     * @param {id} identificador de usuario
     */
    const onEdit = (id)=>{
        navigate('/users/edit/'+id);
    }


    /**
     * Obtiene listado de usuarios
     */
    const getData = async ()=>{
        let response = await users();
        if(response){
            let items = response.map((res)=>{
                let item = {
                    id: res.id,
                    col1: res.names+' '+res.lastname1+(res.lastname2 !== null ? ' '+res.lastname2 :''),
                    col2: res.email,
                    col3: res.role,
                    col4: res.isActive ? 'Activo' : 'Inactivo'
                };

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
                    <h2>Usuarios - Listado</h2>
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

export default UsersList;