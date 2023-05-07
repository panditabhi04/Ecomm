const express=require("express");
const cors=require("cors");
require("./Db/Config")
const User=require("./Db/User")
const Product=require("./Db/Product")
const app=express();
const jwt=require("jsonwebtoken");
const jwtkey='e-comm';
app.use(express.json());
app.use(cors());

app.post("/register",async (req,resp)=>{
    let user=new User(req.body);
    let result=await user.save()
    result=result.toObject();
    delete result.password; 
    jwt.sign({result},jwtkey,{expiresIn:"2h"},(err,token)=>{
    if(err){
        resp.send({result:"somithing is wrong,plce enter"})
    }
    resp.send({user,auth:token})
    // resp.send(result)
  })
// resp.send(result)
});

app.post("/login",async (req,resp)=>
{
     console.log(req.body)
 if(req.body.password && req.body.email)
 {
  let user=await User.findOne(req.body).select("-password");
  jwt.sign({user},jwtkey,{expiresIn:"2h"},(err,token)=>{
    if(err){
        resp.send({result:"somithing is wrong,plce enter"})
    }
    resp.send({user,auth:token})
  })
    }
    else
    {
        resp.send({result:'No User found'})
    }
})


 app.post("/add-product",async (req,resp)=>{
    let product=new Product(req.body);
    let result=await product.save();
    resp.send(result)
 });

 app.get("/products",async (req,resp)=>{
    let product=await Product.find();
    if(product.length>0){
        resp.send(product);
    }else{
        resp.send({result:"No Products Found"})
    }
 });

 app.delete("/product/:id",async (req,resp)=>{
    const result=await Product.deleteOne({_id:req.params.id});
    resp.send(result);

 });

 app.get("/product/:id",async (req,resp)=>{
    let result=await Product.findOne({_id:req.params.id});
    if(result){
        resp.send(result);
    }else{
        resp.send({result:"no data found"})
    }
   
 });

 app.put("/product/:id",async (req,resp)=>{
    let result=await Product.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
    )
    resp.send(result);
 });

 app.get("/search/:key" ,async (req,resp)=>{
    let result=await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {company:{$regex:req.params.key}},
            {category:{$regex:req.params.key}},
            {name:{$regex:req.params.key}},
            {price:{$regex:req.params.key}},
        ]
    });
    resp.send(result);      
 })
app.listen(5000)
