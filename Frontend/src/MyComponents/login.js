import React, { useState } from 'react';
import Header from "./Header.js";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [message, setMessage] = useState("");

    const onSubmit = async (data) => {
        try {
            console.log("Submitting form with data:", data);
            const response = axios.post("http://localhost:7000/api/login/${data.username}/${data.password}", data)
            console.log("API Response:", response);
            if (response.data.length > 0) {
                console.log("User authenticated successfully. Navigating to StudentRecord.");
                navigate("/StudentRecord");
            } else {
                setMessage("Invalid credentials. Please try again.");
            }
        } catch (error) {
            console.error("Error occurred:", error);
            setMessage("An error occurred. Please try again later.");
        }
    };
    

    const handleCancel = () => {
        // Handle cancel action if needed
    };

    return (
        <React.Fragment>
            <Header title="HOME" searchBar={false} />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card p-5 custom-form" style={{ backgroundColor: '#faf9f9', borderRadius: '15px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                            <div style={{ backgroundColor: '#cdb4db', borderRadius: '15px 15px 0 0', padding: '10px 0' }}>
                                <h2 className="mb-0 text-center text-white">Login</h2>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Username<span className="text-danger">*</span></label>
                                            <input type="text" {...register("username", { required: true })} name="username" className="form-control" />
                                            <span className="text-danger">
                                                {errors.username?.type === "required" && "Name is Required"}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-3">
                                            <label className="form-label">Password<span className="text-danger">*</span></label>
                                            <input type="password" {...register("password", { required: true, minLength: 6, maxLength: 6})} name="password" className="form-control" />
                                            <span className="text-danger">
                                                {errors.password?.type === "required" && "Password is Required"}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center" style={{ backgroundColor: '#cdb4db', borderRadius: '0 0 15px 15px', padding: '20px 0' }}>
                                    <button type="submit" className="btn btn-success me-2" style={{ backgroundColor: '#b5838d', borderColor: '#b5838d' }}>Login</button>
                                    <button type="button" className="btn btn-secondary" onClick={handleCancel} style={{ backgroundColor: '#b5838d', borderColor: '#b5838d' }}>Cancel</button>
                                </div>
                            </form>
                            {message && <p className="text-danger mt-3 text-center">{message}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Login;
