import { Link, NavLink } from "react-router-dom"

import { logOut } from "@/lib/utils";
import { useEffect, useState } from "react";

const Navbar = ()=>{

    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAdmin, setIsAdmin] = useState(localStorage.getItem('isAdmin'));
    const [allowedToken, setAlowedToken] = useState(token);

    useEffect(()=>{
        setAlowedToken(token)
    },[token, isAdmin])

    return (
        <>
            <header>
                <nav>
                    <ul>
                        <Link to="/" className="logo">Home Decore</Link>

                        <div className="menu">
                            <NavLink to="/">Home</NavLink>
                            <NavLink to="/products">Products</NavLink>
                            { allowedToken != null && isAdmin == "false" &&
                                <NavLink to="/user/profile">Profile</NavLink>
                            }
                            { allowedToken != null && isAdmin == "true" &&
                                <NavLink to="/admin/dashboard">Dashboard</NavLink>
                            }
                        </div>
                        <div>
                            {
                                allowedToken == null && <Link className="signup" to="/signup">Signup</Link>
                            }
                            { allowedToken == null &&
                                <Link className="login" to="/login">Login</Link>
                            }
                            {
                                allowedToken != null &&
                                <Link to="/" >
                                    <button className="button" onClick={()=>{
                                        logOut() 
                                        setToken(null)
                                        setIsAdmin(null)
                                    }}>Logout</button>
                                </Link>
                            }
                        </div>

                    </ul>
                </nav>
            </header>

        </>
    )
}

export default Navbar;
