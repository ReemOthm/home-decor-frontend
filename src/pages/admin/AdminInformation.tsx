import { useOutletContext } from "react-router-dom";
import { Typography, Stack } from "@mui/material";

import { User } from "@/types";


export const AdminInformation = ()=>{

    const userData:User = useOutletContext();

    return (
        <>
            { userData &&
                <Stack gap={2}>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography>Username:</Typography>
                        <Stack>
                            <input disabled value={userData.username}/>
                        </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography>Email:</Typography>
                        <Stack>
                            <input disabled value={userData.email}/>
                        </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography>First Name:</Typography>
                        <Stack direction="row" >
                            <input type="text" disabled value={userData.firstName} />
                        </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography>Last Name:</Typography>
                        <Stack direction="row" >
                            <input type="text" disabled value={userData.lastName} />
                        </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography>Created At:</Typography>
                        <Stack>
                            <input disabled value={userData.createdAt}/>
                        </Stack>
                    </Stack>
                </Stack>
            }
        </>
    )
}

