// import {Link} from 'react-router-dom';
import { useState } from 'react';
// import './Style/Login.css'


import { useNavigate } from 'react-router-dom';

 const  SignUp=()=>{
    const [Username,setuser]=useState('');
    const [Pass,setpass]=useState('');
    const [check,setCheck]=useState(false);
    let navigate=useNavigate();


    let signData = JSON.parse(localStorage.getItem("dataInfo")) || [];
    const handlesubmit=(e)=>{
        

    e.preventDefault();
     
   

    if (Username ==="" || Pass ==="" ||!check) {
        alert("Invalid Input");
    }
    else {
        let data = {
           Username,Pass
        }
        signData.push(data);
        localStorage.setItem("dataInfo", JSON.stringify(signData));
        alert("account created");
        navigate("/Login");
        // console.log(signData);
    }
}
        return( 
            <div className="text-center m-5-auto" style={{textAlign:'center'}}>
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form  onSubmit={(e)=>handlesubmit(e)} style={{borderRadius: `10px`}}>
                <p>
                    <label>Username</label><br/>
                    <input type="text" name="first_name" onChange={(e)=>setuser(e.target.value)}  />
                </p>
                <p>
                    <label>Email address</label><br/>
                    <input type="email" name="email" />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input type="password" name="password" onChange={(e)=>setpass(e.target.value)}  />
                </p>
                <p>
                    <input type="checkbox" name="checkbox" id="checkbox" onChange={(e)=>setCheck(!check)}  /> <span>I agree all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a></span>.
                </p>
                <p>
                    <button id="sub_btn" type="submit" style={{borderRadius: `8px`}} >Register</button>
                </p>
            </form>
            <footer>
                <p style={{color:'blue'}}>Back to Homepage</p>
            </footer>
        </div>
    )

}



export default SignUp;