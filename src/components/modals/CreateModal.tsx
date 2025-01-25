import { ReactNode } from "react";
import {  Stack } from "@mui/material";

import { BasicModal } from "./Modal";

interface CreateModalProps {
    openCreate: boolean,
    handleopenCreate: ()=> void,
    handleSubmit: ()=>void,
    formElement: ReactNode,
    scroll: boolean
}

const CreateModal = ({openCreate, handleopenCreate, handleSubmit, formElement, scroll}:CreateModalProps)=>{
    return (
        <BasicModal open={openCreate} handleOpen={handleopenCreate} scroll={scroll} >
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    {formElement}
                    <Stack direction ="row" gap={1}>
                        <button className="button">Create</button>
                        <button className="button cancel" type='button' onClick={handleopenCreate}>Cancel</button>
                    </Stack>
                </Stack>
            </form>
        </BasicModal>
    )
}

export default CreateModal;