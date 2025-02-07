import { FormEvent, ReactNode } from "react";
import {  Stack } from "@mui/material";

import { BasicModal } from "./Modal";

interface CreateModalProps {
    open: boolean,
    close: ()=> void,
    handleSubmit?: ()=>void,
    handleClick?: (e: FormEvent)=>void,
    formElement: ReactNode,
    scroll: boolean,
    btnName:string
}

const CreateModal = ({open, close, handleSubmit, formElement, scroll,btnName,handleClick}:CreateModalProps)=>{
    return (
        <BasicModal open={open} close={close} scroll={scroll}  >
            <form onSubmit={handleSubmit}>
                <Stack spacing={1}>
                    {formElement}
                    <Stack direction ="row" gap={1}>
                        <button className="button" type="submit" onClick={handleClick}>{btnName}</button>
                        <button className="button cancel" type='button' onClick={close}>Cancel</button>
                    </Stack>
                </Stack>
            </form>
        </BasicModal>
    )
}

export default CreateModal;