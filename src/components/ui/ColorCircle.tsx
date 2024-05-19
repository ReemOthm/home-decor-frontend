import {HTMLAttributes} from 'react';

interface ColorCircles extends HTMLAttributes<HTMLSpanElement>{
    color: string;
}

const ColorCircles = ({color , ...rest}:ColorCircles)=>{
    return <span className='color--circle' style={{backgroundColor: color}} {...rest}/>
} 

export default ColorCircles;