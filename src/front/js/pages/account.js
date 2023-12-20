import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const Account = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			<h1>Your Account</h1>
			<p>Welcome to your account</p>
		</div>
	);
};