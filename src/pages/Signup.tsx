import { Button} from "@mui/material";

import { RegisterFormData } from "@/data";
import Password from "@/components/ui/Password";

export const Signup = ()=>{

    // -----------------------Renders-------------------
    const RegisterFormRender = RegisterFormData.map(({type, placeholder, name,},index)=> 
        <div key={index}>
            {
                name == 'password' ? <Password />
                : 
                <input className="input" type={type} placeholder={placeholder} />
            }
        </div>
    )

    return (
        <>
            <div className="form--signup">
                <form>
                    {RegisterFormRender}
                    <Button variant="contained" fullWidth>Signup</Button>
                </form>
            </div>
        </>
    )
}