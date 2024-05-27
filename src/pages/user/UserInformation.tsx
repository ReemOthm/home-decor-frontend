import { useOutletContext } from "react-router-dom";
import { Typography, Stack } from "@mui/material";
import { useState } from "react";

import { User } from "@/types";
import api from "@/api";
import { notifyError, notifySuccess } from "@/Toastify";

export const UserInformation = ()=>{

    const userData:User = useOutletContext();

    const [editFirst, setEditFirst] = useState({
        status: false,
        name: "update"
    });

    const [editLast, setEditLast] = useState({
        status: false,
        name: "update"
    });
    
    const [name, setName] = useState({
        firstName: userData.firstName,
        lastName: userData.lastName
    });

    const requst = async()=> {
        try {
            if((userData.firstName != name.firstName || userData.lastName != name.lastName ) && (editFirst.name == 'save' || editLast.name == 'save')){
                const response = await api.put("/users/profile", name);
                if(response.status == 200){
                    notifySuccess("Name updated Successfully!")
                }
            }
        } catch (error) {
            notifyError(`${error}`);
        }
    }

    const handleUpdateUserFirstName = async()=> {
        setEditFirst({
            status: !editFirst.status,
            name: editFirst.name == 'update'?  'save' : "update"
        })
        await requst()
    }

    const handleUpdateUserLastName = async()=> {
        setEditLast({
            status: !editLast.status,
            name: editLast.name == 'update'?  'save' : "update"
        })
        await requst()
    }

    const handleFirstNameChange = (e:React.ChangeEvent<HTMLInputElement>)=> setName({...name, firstName: e.target.value} )
    const handleLastNameChange = (e:React.ChangeEvent<HTMLInputElement>)=> setName({...name, lastName: e.target.value} )

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
                            <input type="text" disabled={!editFirst.status} value={name.firstName} onChange={handleFirstNameChange}/>
                            <button onClick={handleUpdateUserFirstName}>{editFirst.name}</button>
                        </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography>Last Name:</Typography>
                        <Stack direction="row" >
                            <input type="text" disabled={!editLast.status} value={name.lastName} onChange={handleLastNameChange}/>
                            <button onClick={handleUpdateUserLastName}>{editLast.name}</button>
                        </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography>Phone Number:</Typography>
                        <Stack>
                            <input disabled value={userData.phoneNumber}/>
                        </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography>Address:</Typography>
                        <Stack>
                            <input disabled value={userData.address}/>
                        </Stack>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <Typography>Birth Date:</Typography>
                        <Stack>
                            <input disabled value={userData.birthDate}/>
                        </Stack>
                    </Stack>
                </Stack>
            }
        </>
    )
}

