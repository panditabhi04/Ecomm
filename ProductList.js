import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function ProductList() {
    const [products,setProducts]=useState([]);

    useEffect(()=>{
        getProducts();
    },[])

    const getProducts=async ()=>{
        let result=await fetch("http://localhost:5000/products",{
          headers:{
            authorization:JSON.parse(localStorage.getItem('token'))
          }
        });
         result=await result.json();
         setProducts(result)
    };
    const secrchHandler= async (e)=>{
      let key=e.target.value;
      if(key){
      let result=await fetch(`http://localhost:5000/search/${key}`)
      result=await result.json()
      if(result){
        setProducts(result);
      }
    }else{
        getProducts();
      }

    }

    const deleteProduct=async (id)=>{
      let result =await fetch(`http://localhost:5000/product/${id}`,{
        method:"delete"
      })
      result=await result.json()
      if(result)
      {
        getProducts();
      }

    }
    
  return (
    <div className='product-list'>
    <h1>Products List</h1>
    <input type="text" placeholder='Search Product' className='secrch-inputbox'
    onChange={secrchHandler}/>
    <ul>
        <li>S .No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Company</li>
        <li>Category</li>
        <li>Operation</li>
     </ul>
    {
      products.length?  products.map((item,index)=>
      <ul key={index}>
        <li>{index+1}</li>
        <li>{item.name}</li>
        <li>{item.price}</li>
        <li>{item.company}</li>
        <li>{item.category}</li>
        <li>
          <button type='button' onClick={()=>deleteProduct(item._id)}>Delete</button>
          <Link to={"/update/"+item._id}>Update</Link>
          </li>

      </ul> 
        )
        :<h1>No Products Found</h1>
    }
    </div>
  )
}
