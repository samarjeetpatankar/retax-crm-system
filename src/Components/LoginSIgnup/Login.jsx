// import '.../Login.css'
import {Link} from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';




let logData = JSON.parse(localStorage.getItem("dataInfo")) || [];
console.log(logData);
let WrongTxt ="";
const Login=()=>{
    let navigate=useNavigate();
    const [email,setemail]=useState('');
    const [password,setpass]=useState('');
    let flag=false;


    console.log(email);
    console.log(password);
    // console.log(state);
    const handlesubmit=async(e)=>{
        e.preventDefault();
        console.log("pressed");
    
    logData.map((ele)=>{
        console.log(ele.Username);
    console.log(ele.Pass);
        if (ele.Username == email && ele.Pass == password) {
            flag=true;
        }
    })
    if (flag == 1) {
        alert("Sign in Successful");
        navigate("/");
        
    } else {
        alert("Wrong input");
         }

}
     


// console.log(data);
    return (
        <div className="text-center m-5-auto" style={{textAlign:'center',width:`auto`}}>
            <br/><br/><br/><br/>
                    <h2>Sign in to us</h2>
            <form  onSubmit={(e)=>handlesubmit(e)} style={{borderRadius: `10px`}}>
                <p>
                    <p>Username or email address</p><br/>
                    <input type="text" name="first_name" onChange={(e)=>setemail(e.target.value)} />
                </p>
                <br/>
                <p>
                   <p>Password</p>                
                    <input type="password" name="password"
                    onChange={(e)=>setpass(e.target.value)}  />
                    <br/>
                </p>
              
                <br/>
                <label className="right-label">Forget password</label>
                <br/>
                <p>                                    <button id="sub_btn" type="submit" style={{borderRadius: `8px`}}>Login</button>
                </p>
            </form>
            <Link to={'./SingUp'}>
              <p>First time ?<label style={{color:'blue'}}> Create an account</label>
              </p>
              </Link>

             <Link to={'./SingUp'}>
             <p style={{color:'blue'}}>Back to Homepage</p>
             </Link>
           
        </div>
    )
}
export default Login;