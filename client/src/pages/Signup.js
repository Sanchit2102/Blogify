import React,{useState} from 'react'
import {Link, useNavigate} from "react-router-dom"
import { toast } from 'react-hot-toast';


const Signup = (props) => {
  
  const [credentials, setCredentials] = useState({name:"", email:"",password:"",cpassword:""})
  //we are using instead of navigate because it deprecetaed in v6
  const navigate =useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value }); //...note is spread operator means values of note remain add extra note which we will get as input
};
const {username,email,password}= credentials;
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
  
    const response = await fetch("/api/v1/auth/register", {
     
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,email,password
      }),
    });
    const data = await response.json();
    // console.log(json);
    if(data.success){
      // save the token and redirect
      localStorage.setItem("token",data.authtoken)
      localStorage.setItem("userId",data?.user._id);
      navigate("/")
      toast.success("Succesfully created your account")
    }else{
      toast.error("Invalid Credentials")
    }
  } catch (error) {
    console.error(error);
  }
}

  return (<>
  
    <div className='my-2 box' style={{width:"400px",height:"500px"}}>
   <h2 className='text-center'>Welcome to Blogify </h2>
    <form  onSubmit={handleSubmit} style={{padding:"10px"}}>
    <div className="mb-2">
      <label htmlFor="username" className="form-label">Username</label>
      <input type="text" className="form-control" id="username" name="username" autoComplete="username" value={username} aria-describedby="usernameHelp" onChange={onChange} required/>
    </div>
    <div className="mb-2">
      <label htmlFor="email" className="form-label">Email address</label>
      <input type="email" className="form-control" id="email" name="email" autoComplete="email" value={email} aria-describedby="emailHelp" onChange={onChange} required/>
    </div>
    <div className="mb-2">
      <label htmlFor="password" className="form-label">Password</label>
      <input type="password" className="form-control" id="password" name="password" autoComplete="current-password" value={password}  onChange={onChange} required minLength={8}/>
    </div>
    <div className="mb-2">
      <label htmlFor="cpassword" className="form-label">Confirm Password</label>
      <input type="password" className="form-control" id="cpassword" name="cpassword" autoComplete="confirm-password"  onChange={onChange} required minLength={8}/>
    </div>
    <button type="submit" className="btn btn-primary">Signup</button>
    <p>Already have an account ?<Link style={{textDecoration:"none"}} to='/login'> click here</Link></p>
  </form></div>
  </>
  )
}

export default Signup;