import { Input as InputField } from "rsuite";
import { isEmail } from "../libs/functions";
const Input = ({
    type,
    id,
    value,
    handleChange,
    setError,
    required,
    disabled,
    min
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

        if(name === 'phone'){
            let x = value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);

            value = !x[2] ? x[1] : `${x[1]}-${x[2]}${x[3] ? '-' + x[3] : ''}`;
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
            min={min}
            onChange={(val)=>
                onChange({
                    name: id,
                    value: val
                })
            }
            required={required}
            disabled={disabled}
        />
        
    )
}

export default Input;

Input.defaultProps = {
    type: 'text',
    value: '',
    handleChange: ()=>{},
    setError: ()=>{},
    required: false,
    disabled: false,
    min: ''
}