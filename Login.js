import React, { useEffect, useState } from 'react'
import { json } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    useEffect(()=>{
      const auth=localStorage.getItem('user')
      if(auth){
       

        navigate('/')
      }
    },[])
    const handleLogin=async ()=>{
        // console.log(email,password);
        let result=await fetch("http://localhost:5000/login",{
          method:'post',
          body:JSON.stringify({email,password}),
          headers:{
            'Content-Type':'application/json'
          }
        });
        result=await result.json()

        console.log(result)
        if(result.auth){
          localStorage.setItem("user",JSON.stringify(result.user))
          localStorage.setItem("token",JSON.stringify(result.auth))
          navigate("/")
        }else{
          alert("place enter correct ditals")
        }
    }
  return (
    <div className='login'>
        <input type="text" onChange={(e)=>setEmail(e.target.value)} value={email} className='inputbox' placeholder='Enter Email'/>
        <input type="text" onChange={(e)=>setPassword(e.target.value)} value={password} className='inputbox' placeholder='Enter Password'/>
        <button type='button'onClick={handleLogin} className='button'>Login</button>
        
    </div>
  )
}

