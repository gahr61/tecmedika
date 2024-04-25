import { fetchRequest } from "../libs/functions";

/**
 * Obtiene doctores para asignar a paciente
 * @returns 
 */
export const doctorsList = ()=>{
    return fetchRequest({url:'doctors/list'});
}