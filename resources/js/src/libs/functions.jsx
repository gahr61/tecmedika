import cryptoJs from "crypto-js";
import { Message } from "rsuite";

const api = import.meta.env.VITE_HOST;
const manage = import.meta.env.VITE_SECRET;

/**
 * Agrega clase de rror a campos tipo combo
 * @param {*} id 
 * @param {*} value 
 */
export const addErrorToSelectedField = (id, value)=>{
	let field = document.getElementById(id);
            
	if(field !== null){
		if(value === ''){
			field.classList.add('error');
		}else{
			field.classList.remove('error');
		}
	}	
}

/**
 * Varifica que un campo sea correo electronico
 * @param {*} value 
 * @returns boolean
 */
export const isEmail = (value)=>{
    // Expresión regular para validar una dirección de correo electrónico
    var patron = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Comprobar si el correo coincide con el patrón
    return patron.test(value);
}

/**
 * valida formulario
 * @param {*} element formulario
 * @returns boolean
 */
export const isValidForm = (element)=>{
	var ctrls = [];
	const select = document.querySelector(element);

	if(select !== null){
		ctrls = select.querySelectorAll('input, select, textarea');
   	
	    let isFormValid = true;
    	 ctrls.forEach(ctrl => {
	    	if(ctrl.required){
		      	const isInputValid = showCtrlError(ctrl.id);
		      	if (!isInputValid) {
		        	isFormValid = false;
		    	}
		  	}
	    });
	   
	    return isFormValid;
	}

	return true;

};

/**
 * Desencripta una variable almacenada en sessionStorage
 * @param {string} name nombre de variable
 * @returns string
 */
export const decript = (name)=>{
    let value = '';
	let sessions = Object.keys(sessionStorage);
	if(sessions.length > 0){
		sessions.forEach((key)=>{			
			if(key === 'reset'){
				return sessionStorage.getItem(key);
			}else{
				let bytes = cryptoJs.AES.decrypt(key, manage);
			
				let decriptedName = bytes.toString(cryptoJs.enc.Utf8);

				if(decriptedName === name){
					let encriptedValue = sessionStorage.getItem(key);            
					let bytesValue = cryptoJs.AES.decrypt(encriptedValue, manage);
					value = bytesValue.toString(cryptoJs.enc.Utf8);            
				}
			}
		});
	}
    return value;
};

/**
 * Encripta una variable y la almacena en sessionStorage
 * @param {*} name nombre de la variable
 * @param {*} value valor
 */
export const encript = (name, value)=>{
    let found = findInStorage(name);

    let encriptedValue = cryptoJs.AES.encrypt(value, manage).toString();
    let encriptedName = cryptoJs.AES.encrypt(name, manage).toString();

    if(found !== ''){
        encriptedName = found;
    }

    sessionStorage.setItem(encriptedName, encriptedValue);
}

/**
 * Funcion llamadas a api
 * @param {
 *  url, method, body, requireToken
 * } 
 * @returns json
 */
export const fetchRequest = ({
    url,
    method = 'GET',
    body = null,
    requireToken = true
})=>{
    let token = decript('token');

    return fetch(api+url,{
        method:method,
        body: body !== null ? JSON.stringify(body) : null,
        headers: new Headers(
            requireToken ?
                {
                    'Authorization' : 'Bearer '+token,
                    'Content-Type'  : 'application/json',
                    'Accept'        : 'application/json'
                }
            : 
                {
                    'Content-Type'  : 'application/json',
                    'Accept'        : 'application/json'
                }
        )
    }).then(res => {
        if(res.ok){
            return res.json();
        }else{
            res.text().then(msg => console.log(msg));
        }
    }).then(response => {
        if(response){
            return response;
        }
    })
}

/**
 * Busca una variable en sessionStorage
 * @param {*} name nombre de variable
 * @returns  string
 */
export const findInStorage = (name)=>{
    let value = '';
	let sessions = Object.keys(sessionStorage);
	if(sessions.length > 0){
		sessions.forEach((key)=>{
			let bytes = cryptoJs.AES.decrypt(key, manage);
			let decriptedName = bytes.toString(cryptoJs.enc.Utf8);

			if(decriptedName === name){
				value = key;
			}        
		});
	}
    return value;
}

/**
 * Varifica si el usuario esta autenticado
 * @returns 
 */
export const isAuth = ()=>{
    let auth = false;
    Object.keys(sessionStorage).forEach((key)=>{
        let bytes = cryptoJs.AES.decrypt(key, manage);
        let decriptedName = bytes.toString(cryptoJs.enc.Utf8);

        if(decriptedName === 'token'){
            auth = true;
        }
    });
    
    return auth;
}

/**
 * verifica que el campo contenga un valor si es requerido
 * agrega clase error
 * @param {*} id identificador del campo
 * @returns boolean
 */
export const showCtrlError = (id)=>{
	var res = null;
	var control = document.getElementById(id);
	console.log(control)
	if(control !== null && control.value !== undefined){
		if (control.value.trim() === "") {
	        if(control !== null){
	            control.classList.add('error');
	        }
			res = false;
		} else{
			if(control !== null){
				if(control.required && control.className.includes('error')){
		        	control.classList.remove('error');
		    	}
	    	}
			res = true;
		}
	}

	return res;
};

/**
 * Muestra mensaje 
 * @param {*} type tipo de mensaje
 * @param {*} text texto de mensaje
 * @returns 
 */
export const message = (type, text)=>(
	<Message showIcon type={type} closable>
		<strong>{type}!</strong> {text}
	</Message>
)