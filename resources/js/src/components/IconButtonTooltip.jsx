import {Whisper, Tooltip, IconButton} from 'rsuite';
import HelpOutlineIcon from '@rsuite/icons/HelpOutline';
import { forwardRef, useRef } from 'react';

const TextTooltip = forwardRef(({text, ...rest}, ref) =>(
    <Tooltip ref={ref} {...rest}>
        {text}
    </Tooltip>
));

const IconButtonTooltip = ({
    placement = 'top',
    icon = <HelpOutlineIcon />,
    action = ()=>{},
    text = '',
    size = 'md',
    appearance = 'default',
    color = 'blue',
    circle = false
})=>{
    const tooltipRef = useRef(null);
    return(
        <Whisper
            placement={placement}
            trigger={'hover'}
            controlId='control-id-click'            
            ref={tooltipRef}
            speaker={<TextTooltip text={text} />}
        >
            <IconButton 
                size={size}
                appearance={appearance}
                color={color}
                icon={icon} 
                onClick={()=>action()}
                circle={circle}
            />
        </Whisper>
    )
}

export default IconButtonTooltip;