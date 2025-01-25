import { ReactNode } from "react";
import { Stack } from "@mui/material";

import { BasicModal } from "./Modal";

interface UpdateModalProps {
    openUpdate: boolean,
    handleOpenUpdate: ()=> void,
    handleSubmit: ()=>void,
    formElement: ReactNode,
    scroll: boolean
}

const UpdateModal = ({openUpdate, handleOpenUpdate, handleSubmit, formElement, scroll}:UpdateModalProps)=>{
    return (
        <BasicModal open={openUpdate} handleOpen={handleOpenUpdate} scroll={scroll}>
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