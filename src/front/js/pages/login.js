import React, {useState} from "react";

const Login = () => {
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('')
    function sendData(e){
        e.preventDefault()
        console.log('send data')
        console.log(email,password)
    }
    return(
        <div>
            {StorageEvent.auth === true ? 'you are logged in take to account':
            <form className="w-50 mx-auto" onSubmit={sendData}>
                <div className="mb-3">
                <label htmlFor="inputEmail" className="form-label">Email address</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control"></input>
                </div>
                <div className="mb-3">
                <label htmlFor="inputPassword" className="form-label">Password</label>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control"></input>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
            }
        </div>
    )


}


