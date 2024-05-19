import {HTMLAttributes} from 'react';

interface ColorCirclesProps extends HTMLAttributes<HTMLSpanElement>{
    color: string;
}

const ColorCircles = ({color , ...rest}:ColorCirclesProps)=>{
    return <span className='color--circle' style={{backgroundColor: color}} {...rest}/>
} 

export default ColorCircles;