import { useOutletContext } from "react-router-dom";
import { Typography, Stack } from "@mui/material";

import { User } from "@/types";


export const AdminInformation = ()=>{

    const userData:User = useOutletContext();

    return (
        <>
            { userData &&
                <Stack gap={2}>
                    <div className="flex-between">
                        <Typography>Username:</Typography>
                        <Stack>
                            <input disabled value={userData.username} className="input__info"/>
                        </Stack>
                    </div>
                    <div className="flex-between">
                        <Typography>Email:</Typography>
                        <Stack>
                            <input disabled value={userData.email} className="input__info"/>
                        </Stack>
                    </div>
                    <div className="flex-between">
                        <Typography>First Name:</Typography>
                        <Stack direction="row" >
                            <input type="text" disabled value={userData.firstName} className="input__info"/>
                        </Stack>
                    </div>
                    <div className="flex-between">
                        <Typography>Last Name:</Typography>
                        <Stack direction="row" >
                            <input type="text" disabled value={userData.lastName} className="input__info"/>
                        </Stack>
                    </div>
                    <div className="flex-between">
                        <Typography>Created At:</Typography>
                        <Stack>
                            <input disabled value={userData.createdAt} className="input__info"/>
                        </Stack>
                    </div>
                </Stack>
            }
        </>
    )
}

