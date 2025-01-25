import * as React from 'react';
import {Box, Modal} from '@mui/material';

interface BasicModalProps{
    open: boolean,
    handleOpen: ()=> void,
    children: React.ReactNode,
    scroll?: boolean
}

export const BasicModal = ({open, handleOpen, children, scroll}: BasicModalProps) => {

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: '10px',
        boxShadow: 24,
        p: 4,
        height: scroll ? "100vh" : "auto",
        overflowY: scroll ?  "scroll" : 'none'
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={handleOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    { children }
                </Box>
            </Modal>
        </div>
    );
}