import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SingUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth=localStorage.getItem('user')
        if(auth){
            navigate('/')
        }
    },[]);
    const Collectiondata = async () => {
        console.log(name, email, password)
        let result = await fetch('http://localhost:5000/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        result = await result.json()
        console.log(result)
        localStorage.setItem("user", JSON.parse(result.result));
        
        navigate('/')

    }

    return (
        <div className="Registration">
            <h1>Registration</h1>
            <input type="text" className="inputbox"
                placeholder="User Name" value={name}
                onChange={(e) => setName(e.target.value)} />

            <input type="text" className="inputbox"
                placeholder="Email Id" value={email}
                onChange={(e) => setEmail(e.target.value)} />

            <input type="password" className="inputbox"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} />

            <button type="button" className="button"
                onClick={Collectiondata}>Sing Up</button>

        </div>
    )
}
export default SingUp;