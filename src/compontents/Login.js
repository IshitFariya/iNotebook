import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';
const Login = (props) => {
    
    const [credentials,setCredentials]=useState({email:"",password:""}); 
    const {showAlert}=props;
    let navigate = useNavigate();
    const onChange=(e)=>{
      setCredentials({...credentials,[e.target.name]:e.target.value})
    }
    const handleSubmit= async(e)=>{
        // console.log('form is submitind');
        const host = "http://localhost:5000";
        e.preventDefault();
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email , password:credentials.password }),
          });

        const json= await response.json();
        console.log(json);

        if(json.message==='Success'){
            localStorage.setItem('token',json.authToken)
            navigate('/');
            showAlert('Successfully Login','success')
        }
        else{
            showAlert('Invalid credentials','danger')
        }
    }
    return (
        <div>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" aria-describedby="emailHelp" value={credentials.email} onChange={onChange} required/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} required/>
                    </div>
                    <button type="submit" className="btn btn-primary" >Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login
