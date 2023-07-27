import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';
  


function Register() {

    const navigate= useNavigate();

    const [data, setdata] = useState({
        name:"",
        email:"",
        password:"",
    })

    const registerUser = async (e) => {
        e.preventDefault();
        const { name, email, password } = data;
        try{
            const {data}= await axios.post('http://localhost:3000/register',{name,email,password});

            if(data.error){
                toast.error(data.error);
            }
            else{
                setdata({});
                toast.success("Successfully registered welcome");
                navigate("/login");
            }


        }
        catch(err){
            console.log(err)
        }
    }


    return (
        <div>
            <form onSubmit={registerUser}>
                <label>Enter Name</label>
                <input type="text" name='name' placeholder='Enter you name' value={data.name} onChange={(e)=>{
                    setdata({...data, name: e.target.value})
                }}/>
                 <br /> <br />

                <label>Enter Email</label>
                <input type="email" name='email' placeholder='Enter email address' value={data.email} onChange={(e)=>{
                    setdata({...data, email: e.target.value})
                }} /> 
                <br /><br />

                <label>Password</label>
                <input type="password" name='password' placeholder='Enter password' value={data.password} onChange={(e)=>{
                    setdata({...data, password: e.target.value})
                }}/>
                 <br /><br />
                <button type='submit'>Register</button>
            </form>
        </div>
    )
}

export default Register