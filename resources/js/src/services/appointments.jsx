import { fetchRequest } from "../libs/functions"

/**
 * Obtiene listado de citas filtrada por estatus
 * @param {*} status 
 * @returns 
 */
export const appointments = (status)=>{
    return fetchRequest({url:'appointments/status/'+status});
}

/**
 * Elimina una cita
 * @param {*} id 
 * @returns 
 */
export const appointmentsDelete = (id)=>{
    return fetchRequest({url:'appointments/delete/'+id, method:'DELETE'});
}

/**
 * Obtiene datos de una cita
 * @param {*} id 
 * @returns 
 */
export const appointmentsId = (id)=>{
    return fetchRequest({url:'appointments/edit/'+id});
}

/**
 * Guarda datos de una cita
 * @param {*} obj 
 * @returns 
 */
export const appointmentsSave = (obj)=>{
    return fetchRequest({url:'appointments', method:'POST', body:obj});
}

/**
 * Actualoza datos de una cita
 * @param {*} id 
 * @param {*} obj 
 * @returns 
 */
export const appointmentsUpdate = (id, obj)=>{
    return fetchRequest({url:'appointments/update/'+id, method:'PUT', body:obj});
}