import React, { useState } from 'react'

export default function AddProduct () {
    const [name,setName]=useState("");
    const [price,setPrice]=useState("");
    const [category,setCategory]=useState("");
    const [company,setCompany]=useState("");
    const [error,setError]=useState("");

    // const addProduct=async()=>{
    //     // console.log(name,price,category,company);
    //     const userId=JSON.parse(localStorage.getItem('user'))._id;
    //    let result=await fetch('http://localhost:5000/add-product',{
    //     method:'POST',
    //     body:JSON.stringify({name,price,category,company,userId}),
    //     headers:{
    //         "Content-Type":"appliction/json"
    //     },
    //    })
    // result=await result.json();
    // console.log(result)
    // }

    const addProduct=async ()=>{
        console.log(!name)
        if(!name || !price || !category || !company){
            setError(true)
       return false;
        }

        console.log(name,category,price,company)
        const userId=JSON.parse(localStorage.getItem('user'))._id
      let result=await fetch('http://localhost:5000/add-product',{
            method:"POST",
            body:JSON.stringify({name,category,company,price,userId}),
            headers:{
                "Content-Type":"application/json"
            },
      })

      result=await result.json()

      console.log(result)

    }




  return (
    <div className='product'>
        <h1>Add Product</h1>
        <input type="text" className='inputbox' placeholder='Enter Product Name'
        onChange={(e)=>setName(e.target.value)} value={name}
        />
        {error && !name && <span className='invalid-input'>*Enter Valid Name</span>}

        <input type="text" className='inputbox' placeholder='Enter Product price'
        onChange={(e)=>setPrice(e.target.value)} value={price}
        />
       {error && !price && <span className='invalid-input'>*Enter Valid Price</span>}

         <input type="text" className='inputbox' placeholder='Enter Product category'
          onChange={(e)=>setCategory(e.target.value)} value={category}
        />
       {error && !category && <span className='invalid-input'>*Enter Valid Category</span>}
        

         <input type="text" className='inputbox' placeholder='Enter Product company'
          onChange={(e)=>setCompany(e.target.value)} value={company}
        />
        {error && !company && <span className='invalid-input'>*Enter Valid Company</span>}


        <button type='button' className='button'onClick={addProduct} >Add Product</button>
        
    </div>
  )
}
