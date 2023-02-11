import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import {
    useNavigate
  } from "react-router-dom";


function Signup(props) {

    const [credentials, setCredentials] = useState({Name:"",email:"",password:"",cpassword:""})
    let navigate=useNavigate()
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    

    const handleonsubmit=async(e)=>{
        e.preventDefault()
        // console.log("User signed in")
        if(credentials.password===credentials.cpassword){
        const {Name,email,password}=credentials
        //API CALL
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: 'POST',
            mode: 'cors',
            headers:{
                'Content-Type':"application/json"
            },

            body: JSON.stringify({ Name,email,password })
        });
        const json=await response.json()
        // console.log(json)

        if(json.success){
            localStorage.setItem("token",json.authtoken)
            navigate('/')
            props.showalert("Login Successful","success")

        }else{
            props.showalert("User with this email address Already Exists.....","danger")
        }
    }else{
        props.showalert("Password Do not match","danger")
    }

    }
  return (
    <Form onSubmit={handleonsubmit}>
      <Form.Group className="mb-3" controlId="Name">
        <Form.Label>Name</Form.Label>
        <Form.Control  type="text" placeholder="Name" name='Name' onChange={onChange} value={credentials.Name}  />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email'   onChange={onChange} value={credentials.email} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control  type="password" placeholder="Password" name='password' onChange={onChange} value={credentials.password} minLength={8} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="cpassword">
        <Form.Label>Password</Form.Label>
        <Form.Control  type="password" placeholder="Confirm Password" name='cpassword' onChange={onChange} value={credentials.cpassword} minLength={8} required />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Signup;

