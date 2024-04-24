import { Button as Btn } from "rsuite"

const Button = ({
    appearance,
    color,
    action,
    label
})=>{
    return (
        <Btn
            appearance={appearance}
            color={color}
            onClick={()=>action()}
            size="sm"
        >
            {label}
        </Btn>
    )
}

export default Button;

Button.defaultProps = {
    appearance: 'ghost',
    color:'blue',
    action:()=>{},
    label:''
}