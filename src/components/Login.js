import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import {
    useNavigate
  } from "react-router-dom";


function Login(props) {

    const [credentials, setCredentials] = useState({email:"",password:""})
    let navigate=useNavigate()
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }

    

    const handleonsubmit=async(e)=>{
        e.preventDefault()
        // console.log("User logged in")
        //API CALL
        const response = await fetch(`http://localhost:5000/api/auth/loginuser`, {
            method: 'POST',
            mode: 'cors',
            headers:{
                'Content-Type':"application/json"
            },

            body: JSON.stringify({ email:credentials.email,password:credentials.password })
        });
        const json=await response.json()
        // console.log(json)

        if(json.success){
            localStorage.setItem("token",json.authtoken)
            navigate('/')
            props.showalert("Login Successful","success")
        }else{
            props.showalert("Invalid Credentials","danger")
        }

    }
  return (
    <Form onSubmit={handleonsubmit}>
      <Form.Group className="mb-3" controlId="email" >
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name='email'   onChange={onChange} value={credentials.email} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control  type="password" placeholder="Password" name='password' onChange={onChange} value={credentials.password}  />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default Login;

