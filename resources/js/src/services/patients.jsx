import { fetchRequest } from "../libs/functions"

/**
 * Obtiene listado de pacientes
 * @returns 
 */
export const patients = ()=>{
    return fetchRequest({url:'patients'});
}

/**
 * Obtiene datos de paciente especifico
 * @param {*} id 
 * @returns 
 */
export const patientsId = (id)=>{
    return fetchRequest({url:'patients/edit/'+id});
}

/**
 * Elimina un paciente
 * @param {*} id 
 * @returns 
 */
export const patientsDelete = (id)=>{
    return fetchRequest({url:'patients/'+id, method:'DELETE'});
}

/**
 * Obtiene listado de paciente para lledando de campos tipo combo
 */
export const patientsList = ()=>{
    return fetchRequest({url:'patients/list'});
}

/**
 * Obtiene listado de paciente para lledando de campos tipo combo
 */
export const patientsPrint = (id)=>{
    return fetchRequest({url:'patients/print/'+id, isFile:true});
}


/**
 * Guarda datos de paciente
 * @param {*} obj 
 * @returns 
 */
export const patientsSave = (obj)=>{
    return fetchRequest({url:'patients', method:'POST', body:obj});
}

/**
 * Actualiza datos de paciente
 * @param {*} id 
 * @param {*} obj 
 * @returns 
 */
export const patientsUpdate = (id, obj)=>{
    return fetchRequest({url:'patients/update/'+id, method:'PUT', body:obj});
}
