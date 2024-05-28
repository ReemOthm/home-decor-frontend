import { ReactNode } from "react";
import { BasicModal } from "./Modal";
import { Stack } from "@mui/material";

interface UpdateModalProps {
    openUpdate: boolean,
    handleOpenUpdate: ()=> void,
    handleSubmit: ()=>void,
    formElement: ReactNode
}

const UpdateModal = ({openUpdate, handleOpenUpdate, handleSubmit, formElement}:UpdateModalProps)=>{
    return (
        <BasicModal open={openUpdate} handleOpen={handleOpenUpdate}>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    {formElement}
                    <Stack direction ="row" gap={1}>
                        <button className="button">Update</button>
                        <button className="button cancel" type='button' onClick={handleOpenUpdate}>Cancel</button>
                    </Stack>
                </Stack>
            </form>
    </BasicModal>
    )
}

export default UpdateModal;