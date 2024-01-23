import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const Signup = () => {
	const { store, actions } = useContext(Context)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function sendData(e){
        e.preventDefault(email, password)
        actions.signup(email, password)
        
    }

	return (
		<div className="container mt-3">
            {store.auth == true ? <Navigate to="/Account" /> :
                    <form className="w-50 mx-auto" onSubmit={sendData}>
                        <div className="mb-3">
                            <h1>Create an account</h1>
                            <label htmlFor="emailInput" className="form-label">Email address</label>
                            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">Your information is save with us.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="passwordInput" className="form-label">Password</label>
                            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" className="form-control" id="passwordInput" />
                        </div>
                        <Link to="/Account">
                            <button type="submit" className="btn btn-primary">Create account</button>
                        </Link>
                    </form>
                
            }
		</div>
	);
};