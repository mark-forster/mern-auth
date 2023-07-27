import React, {useState} from 'react'
import axios  from 'axios';
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';



function Login() {



    const navigate= useNavigate();


    const [data, setdata] = useState({
        email:'',
        password:'',
    })

    const loginUser= async (e)=>{
        e.preventDefault();
       const {email, password} = data;
       try{
        const {data}= await axios.post('http://localhost:3000/login',{email,password});

        if(data.error){
            toast.error(data.error);
        }
        else{
            setdata({});
            toast.success("Successfully Login welcome");
            navigate("/dashboard");
        }


       }
       catch(err){
        console.log(err);
       }
    }

  return (
    <div>
        <form onSubmit={loginUser}>
        <label>Enter Email</label>
            <input type="email" name='email' placeholder='Enter email address'  value={data.email} onChange={(e)=>{
                    setdata({...data, email: e.target.value})
                }}/> 
            <br /><br />
            <label>Password</label>
            <input type="password" name='password' placeholder='Enter password' value={data.password} onChange={(e)=>{
                    setdata({...data, password: e.target.value})
                }} /> 
            <br /><br />
            <button type='submit'>Login</button>
        </form>
    </div>
  )
}

export default Login