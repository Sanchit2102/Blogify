import React,{useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import { toast } from 'react-hot-toast';

const Login = () => {
    const [credentials, setCredentials] = useState({email:"",password:""})
  //we are using instead of navigate because it deprecetaed in v6
  const navigate =useNavigate();

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value }); //...note is spread operator means values of note remain add extra note which we will get as input
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await fetch("/api/v1/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
          const data = await response.json();
          
          console.log(data)
          if (data.success){
            //save the token and redirect
            localStorage.setItem("token",data?.authtoken)
            localStorage.setItem("userId",data?.user._id);
            toast.success("Succesfully Login")
            navigate("/")

          }else{
            toast.error("Please Login using valid credentials"
            )
          }
        } catch (error) {
          console.error(error);
        }
      };
      
    
  return (
   <>
    <div className="container mt-2">
    
    <div className='my-4 box ' style={{width:"400px",height:"360px"}}>
    <h2 className='text-center'>Login to Blogify</h2>
    <form  onSubmit={handleSubmit} style={{padding:"10px"}}>
  
    <div className="mb-3">
      <label htmlFor="email" className="form-label ">Email address</label>
      <input type="email" className="form-control" id="email" name="email" autoComplete="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange}/>
    </div>
    <div className="mb-3">
      <label htmlFor="password" className="form-label ">Password</label>
      <input type="password" className="form-control" id="password" name="password" autoComplete="current-password" value={credentials.password}  onChange={onChange}/>
    </div>
   
    <button type="submit" className="btn btn-primary ">Login</button>
  <p>Don't have an account ?<Link style={{textDecoration:"none"}} to='/signup'> click here</Link></p>
  </form></div></div>
   </>
  )
}

export default Login