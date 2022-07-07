import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name:'', email: "", password: "" ,cpassword:''});
  const {showAlert}=props
  let navigate = useNavigate();
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    // console.log('form is submitind');
    const host = "http://localhost:5000";
    e.preventDefault();
    const {name,email,password}=credentials;
    const response = await fetch(`${host}/api/auth/createUser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name:name, email:email, password:password }),
    });

    const json = await response.json();
    // console.log(json);

    if (json.message === 'Success') {
      localStorage.setItem('token', json.authToken)
      navigate('/');
      setCredentials({name:'', email: "", password: "" ,cpassword:''});
      showAlert('Successfully created the account','success')
    }
    else {
      setCredentials({name:'', email: "", password: "" ,cpassword:''});
      showAlert('Invalid credentials','danger')
    }
  }

  return (
    <div>
      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name='name' value={credentials.name} onChange={onChange} required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credentials.email} onChange={onChange} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' id="password"  value={credentials.password} onChange={onChange} required/>
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Password</label>
            <input type="password" className="form-control" name='cpassword' id="cpassword" value={credentials.cpassword} onChange={onChange} required/>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Signup
