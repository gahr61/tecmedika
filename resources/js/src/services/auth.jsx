import { fetchRequest } from "../libs/functions"

/**
 * Inicia sesion
 * @param {*} obj 
 * @returns json
 */
export const login = (obj)=>{
    return fetchRequest({url:'auth/login', method:'POST', body:obj, requireToken:false});
}

/**
 * Finaliza la sesion
 * @returns 
 */
export const logout = ()=>{
    return fetchRequest({url:'auth/logout'});
}