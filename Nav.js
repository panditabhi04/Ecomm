    import React, { useEffect } from 'react'
    import { Link,useNavigate } from 'react-router-dom'



    export default function Nav() {
        const navigate=useNavigate();
    const auth=localStorage.getItem('user');

    const Logout=()=>{
        localStorage.clear();
        navigate('/singup')
    }
        return (
            <div>

                <img alt='logo' className='logo' src='https://logos-world.net/wp-content/uploads/2020/04/Amazon-Emblem.jpg'/>
            {auth ?   <ul className='nav-ul'>
                
                    <li><Link to="/">Product</Link></li>
                    <li><Link to="/add">Add Product</Link></li>
                    <li><Link to="/update">Update Product</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link onClick={Logout}  to="/singup">Logout({JSON.parse(auth).name})</Link></li>
                </ul>
                :
                    <ul className='nav-ul nav-right' >
                        
                        <li> <Link to="/singup">SingUp</Link></li>
                        <li><Link to="/login">Login</Link></li>
                        </ul>
                }
            </div>
        )
    }
