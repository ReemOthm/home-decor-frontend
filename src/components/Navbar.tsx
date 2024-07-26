import { Link, NavLink } from "react-router-dom"

import { logOut } from "@/lib/utils";

const Navbar = ()=>{
    const token = localStorage.getItem('token');
    const isAdmin = localStorage.getItem('isAdmin');

    return (
        <>
            <header>
                <nav>
                    <ul>
                        <Link to="/" className="logo">Home Decore</Link>

                        <div>
                            <NavLink to="/">Home</NavLink>
                            <NavLink to="/products">Products</NavLink>
                            { token != null && isAdmin == "false" &&
                                <NavLink to="/user/profile">Profile</NavLink>
                            }
                            { token != null && isAdmin == "true" &&
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
                                    <button className="button" onClick={()=>logOut()}>Logout</button>
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
