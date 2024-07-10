import React, { useState } from 'react';
import Header from "./Header.js";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserRegistration() {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();

    const [message, setMessage] = useState('');

    const onSubmit = (data) => {
        console.log(data);

        axios.post("http://localhost:7000/api/adduser", data)
            .then(response => {
                setMessage(response.data);
                setTimeout(() => {
                    navigate('/StudentRecord');
                }, 2000);
            })
            .catch(error => {
                setMessage("Some Error Occurred");
                console.error("Error adding user:", error);
            });
    };

    const handleCancel = () => {
        navigate('/StudentRecord');
    };

    return (
        <React.Fragment>
            <Header title="HOME" searchBar={false} />
            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="card p-5 custom-form" style={{ backgroundColor: '#faf9f9', borderRadius: '15px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                            <div style={{ backgroundColor: '#cdb4db', borderRadius: '15px 15px 0 0', padding: '10px 0' }}>
                                <h2 className="mb-0 text-center text-white">Student Registration</h2>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Name<span className="text-danger">*</span></label>
                                        <input type="text" {...register("name", { required: true })} name="name" className="form-control" />
                                        <span className="text-danger">
                                            {errors.name?.type === "required" && "Name is Required"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Enroll No<span className="text-danger">*</span></label>
                                        <input type="text" {...register("enroll", { required: true, minLength: 6, maxLength: 6, pattern: /^[A-Z]{2}\d{4}$/i })} name="enroll" className="form-control" />
                                        <span className="text-danger">
                                            {errors.enroll?.type === "required" && "Enroll No is Required"}
                                            {errors.enroll?.type === "minLength" && "Enter at least 6 characters"}
                                            {errors.enroll?.type === "maxLength" && "Enter at most 6 characters"}
                                            {errors.enroll?.type === "pattern" && "Invalid Enrollment Number"}
                                        </span>
                                    </div>
                                </div>
                                {/* Add other form fields here */}
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Faculty No<span className="text-danger">*</span></label>
                                        <input type="text" {...register("faculty", { required: true, minLength: 8, maxLength: 10, pattern: /^\d{2}[A-Z]{3}\d{3}$/i })} name="faculty" className="form-control" />
                                        <span className="text-danger">
                                            {errors.faculty?.type === "required" && "Faculty No is Required"}
                                            {errors.faculty?.type === "minLength" && "Enter at least 8 characters"}
                                            {errors.faculty?.type === "maxLength" && "Enter at most 10 characters"}
                                            {errors.faculty?.type === "pattern" && "Invalid Faculty Number"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Email<span className="text-danger">*</span></label>
                                        <input type="text" {...register("email", { required: true, pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i })} name="email" className="form-control" />
                                        <span className="text-danger">
                                            {errors.email?.type === "required" && "Email is Required"}
                                            {errors.email?.type === "pattern" && "Invalid Email Format"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Gender<span className="text-danger">*</span></label>
                                        <select name="gender" className="form-control" {...register("gender", { required: true })}>
                                            <option value="">--Please Select--</option>
                                            <option value="Female">Female</option>
                                            <option value="Male">Male</option>
                                            <option value="Other">Other</option>
                                        </select>
                                        <span className="text-danger">
                                            {errors.gender?.type === "required" && "Gender is Required"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Address<span className="text-danger">*</span></label>
                                        <input type="text" {...register("address", { required: true })} name="address" className="form-control" />
                                        <span className="text-danger">
                                            {errors.address?.type === "required" && "Address is Required"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Hall<span className="text-danger">*</span></label>
                                        <select name="hall" className="form-control" {...register("hall", { required: true })}>
                                            <option value="">--Please Select--</option>
                                            <option value="BBF">Bibi Fatima</option>
                                            <option value="SN">Sarojini Naidu</option>
                                            <option value="NT">Nadeem Tareem</option>
                                            <option value="RM">Ross Masood</option>
                                            <option value="SM">Sulaiman</option>
                                        </select>
                                        <span className="text-danger">
                                            {errors.hall?.type === "required" && "Hall is Required"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Course<span className="text-danger">*</span></label>
                                        <select name="course" className="form-control" {...register("course", { required: true })}>
                                            <option value="">--Please Select--</option>
                                            <option value="Bachelor of Technology">Bachelor's of Technology</option>
                                            <option value="Bachelor of Engineering">Bachelor's of Engineering</option>
                                            <option value="Diploma in Engineering">Diploma in Engineering</option>
                                        </select>
                                        <span className="text-danger">
                                            {errors.course?.type === "required" && "Course is Required"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Branch<span className="text-danger">*</span></label>
                                        <select name="branch" className="form-control" {...register("branch", { required: true })}>
                                            <option value="">--Please Select--</option>
                                            <option value="CSE">Computer Engineering</option>
                                            <option value="IT">Information Technology</option>
                                            <option value="ECE">Electronics Engineering</option>
                                            <option value="EE">Electrical Engineering</option>
                                            <option value="ME">Mechanical Engineering</option>
                                            <option value="CE">Civil Engineering</option>
                                            <option value="PE">Petro Chemical Engineering</option>
                                            <option value="FT">Food Technology</option>
                                        </select>
                                        <span className="text-danger">
                                            {errors.branch?.type === "required" && "Branch is Required"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <label className="form-label">Semester<span className="text-danger">*</span></label>
                                        <input type="number" {...register("semester", { required: true })} name="semester" className="form-control" />
                                        <span className="text-danger">
                                            {errors.semester?.type === "required" && "Semester is Required"}
                                        </span>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="mb-3">
                                        <div className="form-check form-check-inline">
                                            <input type="checkbox" className="form-check-input" value="1" />
                                            <label className="form-check-label">Are you a human?<span className="text-danger">*</span></label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center" style={{ backgroundColor: '#cdb4db', borderRadius: '0 0 15px 15px', padding: '20px 0' }}>
                                    <button type="submit" className="btn btn-success me-2" style={{ backgroundColor: '#b5838d', borderColor: '#b5838d' }}>Submit</button>
                                    <button type="button" className="btn btn-secondary" onClick={handleCancel} style={{ backgroundColor: '#b5838d', borderColor: '#b5838d' }}>Cancel</button>
                             </div>
                        </form>

                            {message && <p className="text-success mt-3 text-center">{message}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default UserRegistration;



