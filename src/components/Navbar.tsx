import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, NavLink } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";

import { logoutUser } from "@/app/features/userSlice";
import { resetCart } from '@/app/features/cartSlice';

const Navbar = ()=>{
    const token = useSelector((state:any)=> state.userReducer.token)
    const isAdmin = useSelector((state:any)=> state.userReducer.isAdmin)
    const dispatch = useDispatch()
    const cartProducts = useSelector((state:any)=> state.cartReducer.cartProducts)

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
                            <NavLink to="/cart"><ShoppingCartIcon sx={{color: "rgb(172, 57, 57);"}}/><span className='items--no'>{cartProducts.length}</span></NavLink>
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
                                    <button className="button" onClick={()=>{dispatch(logoutUser()); dispatch(resetCart())}}>Logout</button>
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
