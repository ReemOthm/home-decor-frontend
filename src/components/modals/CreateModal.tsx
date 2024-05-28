import { ReactNode } from "react";
import { BasicModal } from "./Modal";
import { Stack } from "@mui/material";

interface CreateModalProps {
    openCreate: boolean,
    handleopenCreate: ()=> void,
    handleSubmit: ()=>void,
    formElement: ReactNode,
}

const CreateModal = ({openCreate, handleopenCreate, handleSubmit, formElement}:CreateModalProps)=>{
    return (
        <BasicModal open={openCreate} handleOpen={handleopenCreate}>
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