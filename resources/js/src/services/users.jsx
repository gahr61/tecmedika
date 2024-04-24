import { fetchRequest } from "../libs/functions"

/**
 * Listado de usuario
 */
export const users = ()=>{
    return fetchRequest({url:'users'});
}

/**
 * Datos de un usuario en especifico
 * @param {integer} id identificador de usuario
 * @returns 
 */
export const usersId = (id)=>{
    return fetchRequest({url:'users/edit/'+id});
}

/**
 * Actualizad datos de un usuario
 * @param {integer} id identificador de usuario
 * @param {object} obj datos de usuario
 * @returns 
 */
export const usersUpdate = (id, obj)=>{
    return fetchRequest({url:'users/update/'+id, method:'PUT', body:obj});
}