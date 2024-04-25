import { fetchRequest } from "../libs/functions"

export const clinicHistoryAppointment = (id)=>{
    return fetchRequest({url:'clinic_history/appointment/'+id});
}

export const clinicHistoryPrint = (id)=>{
    return fetchRequest({url:'clinic_history/document/'+id, isFile:true});
}

export const clinicHistorySave = (obj)=>{
    return fetchRequest({url:'clinic_history', method:'POST', body:obj});
}