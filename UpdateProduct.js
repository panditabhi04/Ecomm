import React, { useEffect, useState } from 'react'
import { json,  Navigate,  useNavigate,  useParams } from 'react-router-dom';

export default function UpdateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const params = useParams();
  const nvigate=useNavigate();

  useEffect(() => {
    getProductsDetalis();
  }, []);

  const getProductsDetalis = async () => {
    console.log(params)
    let result = await fetch(`http://localhost:5000/product/${params.id}`);
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  }

  const updateProduct = async () => {
    console.log(name, price, category, company);
    let result = await fetch(`http://localhost:5000/product/${params.id}`,{
      method:'put',
      body:JSON.stringify({name, price, category, company}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    result=result.json();
    console.log(result);
    nvigate('/')
    
  }
  return (
    <div className='product'>
      <h1>Update Product</h1>
      <input type="text" className='inputbox' placeholder='Enter Product Name'
        onChange={(e) => setName(e.target.value)} value={name}
      />


      <input type="text" className='inputbox' placeholder='Enter Product price'
        onChange={(e) => setPrice(e.target.value)} value={price}
      />


      <input type="text" className='inputbox' placeholder='Enter Product category'
        onChange={(e) => setCategory(e.target.value)} value={category}
      />

      <input type="text" className='inputbox' placeholder='Enter Product company'
        onChange={(e) => setCompany(e.target.value)} value={company}
      />



      <button type='button' className='button' onClick={updateProduct} >Update Product</button>

    </div>
  )
}
