import { Link, NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "@/app/features/userSlice";

const Navbar = ()=>{

    const token = useSelector((state:any)=> state.userReducer.token)
    const isAdmin = useSelector((state:any)=> state.userReducer.isAdmin)
    const dispatch = useDispatch()

    return (
        <>
            <header>
                <nav>
                    <ul>
                        <Link to="/" className="logo">Home Decore</Link>

                        <div className="menu">
                            <NavLink to="/">Home</NavLink>
                            <NavLink to="/products">Products</NavLink>
                            { token != null && isAdmin == false &&
                                <NavLink to="/user/profile">Profile</NavLink>
                            }
                            { token != null && isAdmin == true &&
                                <NavLink to="/admin/dashboard">Dashboard</NavLink>
                            }
                        </div>
                        <div>
                            {
                                token == null && <Link className="signup" to="/signup">Signup</Link>
                            }
                            { token == null &&
                                <Link className="login" to="/login">Login</Link>
                            }
                            {
                                token != null &&
                                <Link to="/" >
                                    <button className="button" onClick={()=> dispatch(logoutUser())}>Logout</button>
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
