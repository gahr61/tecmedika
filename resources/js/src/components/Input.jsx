import { Input as InputField } from "rsuite";
import { isEmail } from "../libs/functions";
const Input = ({
    type,
    id,
    value,
    handleChange,
    setError,
    required
})=>{

    /**
     * Actualiza el valor de un campo
     * @param {*} e datos de campo {name, value}
     */
    const onChange = (e)=>{
        let name = e.name;
        let value = e.value;

        if(name === 'email'){
            if(!isEmail(value) && value !== ''){ //verifica que el campo de correo electronico tenca el formato correcto
                setError('Correo electrónico no valido');
            }else{
                setError('');
            }
        }

        handleChange({
            target:{
                name: name,
                value: value
            }
        })
    }

    return(
        <InputField 
            size="sm"
            type={type}
            value={value}
            id={id}
            name={id}
            onChange={(val)=>
                onChange({
                    name: id,
                    value: val
                })
            }
            required={required}
        />
        
    )
}

export default Input;

Input.defaultProps = {
    type: 'text',
    value: '',
    handleChange: ()=>{},
    setError: ()=>{},
    required: false
}