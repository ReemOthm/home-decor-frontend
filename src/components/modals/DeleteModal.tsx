import { Stack, Typography } from "@mui/material";
import { BasicModal } from "./Modal";

interface DeleteModalProps {
    openDelete: boolean
    handleOpenDelete: ()=>void,
    handleDelete: ()=>void,
}

const DeleteModal = ({openDelete, handleOpenDelete, handleDelete}:DeleteModalProps)=>{
    return (
        <BasicModal open={openDelete} handleOpen={handleOpenDelete}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                Delete Category
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    You are about to delete category. Are you sure to delete?
                </Typography>
                <Stack direction ="row">
                    <button className="button" onClick={handleDelete}>Delete</button>
                    <button className="button cancel" type='button' onClick={handleOpenDelete}>Cancel</button>
                </Stack>
        </BasicModal>
    )
}

export default DeleteModal;