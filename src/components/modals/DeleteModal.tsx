import { Stack, Typography } from "@mui/material";

import { BasicModal } from "./Modal";

interface DeleteModalProps {
    openDelete: boolean
    handleOpenDelete: ()=>void,
    handleDelete: ()=>void,
    item: string
}

const DeleteModal = ({openDelete, handleOpenDelete, handleDelete, item}:DeleteModalProps)=>{
    return (
        <BasicModal open={openDelete} close={handleOpenDelete} >
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Delete {item}
                </Typography>
                <Typography id="modal-modal-description">
                    You are about to delete {item}. Are you sure to delete?
                </Typography>
                <Stack direction ="row" mt={2} spacing={2}>
                    <button className="button" onClick={handleDelete}>Delete</button>
                    <button className="button cancel" type='button' onClick={handleOpenDelete}>Cancel</button>
                </Stack>
        </BasicModal>
    )
}

export default DeleteModal;