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
                            <input type="text" disabled={!editFirst.status} className="input__info" value={name.firstName} onChange={handleFirstNameChange}/>
                            <button onClick={handleUpdateUserFirstName}>{editFirst.name}</button>
                        </Stack>
                    </div>
                    <div className="flex-between">
                        <Typography>Last Name:</Typography>
                        <Stack direction="row" >
                            <input type="text" disabled={!editLast.status} className="input__info" value={name.lastName} onChange={handleLastNameChange}/>
                            <button onClick={handleUpdateUserLastName}>{editLast.name}</button>
                        </Stack>
                    </div>
                    <div className="flex-between">
                        <Typography>Phone Number:</Typography>
                        <Stack>
                            <input disabled value={userData.phoneNumber} className="input__info"/>
                        </Stack>
                    </div>
                    <div className="flex-between">
                        <Typography>Address:</Typography>
                        <Stack>
                            <input disabled value={userData.address} className="input__info"/>
                        </Stack>
                    </div>
                    <div className="flex-between">
                        <Typography>Birth Date:</Typography>
                        <Stack>
                            <input disabled value={userData.birthDate} className="input__info"/>
                        </Stack>
                    </div>
                </Stack>
            }
        </>
    )
}

