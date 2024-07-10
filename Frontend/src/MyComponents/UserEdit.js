import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import axios from 'axios';
import Header from "./Header.js";

function EditUser() {
  const { Enroll_no } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  const { register, formState: { errors }} = useForm();

  useEffect(() => {
    axios.get(`http://localhost:7000/api/fetchenroll/${Enroll_no}`)
      .then(response => {
        setUserData(response.data[0]);
        console.log(userData.Enroll_no);
        //console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [Enroll_no]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log(userData);
    e.preventDefault();
    axios.put(`http://localhost:7000/api/updateuser/${Enroll_no}`, userData)
      .then(response => {
        console.log('User updated successfully:', response.data);
        // Redirect to StudentRecord component after successful update
        navigate('/StudentRecord');
      })
      .catch(error => {
        console.error('Error updating user:', error);
        // Handle error scenario
      });
  };

  const handleCancel = () => {
    navigate('/StudentRecord');
  };


  return (
    <React.Fragment>
    <Header title="HOME" searchBar={false} />
    <div className='container mt-5'>
        <div className='row justify-content-center'>
            <div className='col-lg-8'>
                <div className="card p-5 custom-form" style={{ backgroundColor: '#faf9f9', borderRadius: '15px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}>
                    <div style={{ backgroundColor: '#cdb4db', borderRadius: '15px 15px 0 0', padding: '10px 0' }}>
                        <h2 className="mb-0 text-center text-white">Edit User</h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className='mb-3'>
                                    <label className='form-label'>Enroll No</label>
                                    <input type="text" {...register("Enroll_no", { required: true, minLength: 6, maxLength: 6, pattern: /^[A-Z]{2}\d{4}$/i })}name='Enroll_no' value={userData.Enroll_no}  onChange={handleChange} className="form-control" />
                                    <span className='text-danger'>
                                        {errors.Enroll_no?.type === "required" && "Enroll No is Required"}
                                        {errors.Enroll_no?.type === "minLength" && "Enter atleast 8 digits"}
                                        {errors.Enroll_no?.type === "maxLength" && "Enter atmost 8 digits"}
                                        {errors.Enroll_no?.type === "pattern" && "Invalid Enrollment Number"}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className='mb-3'>
                                    <label className='form-label'>Name</label>
                                        <input type="text" {...register("Name", { required: true })} name='Name' value={userData.Name} onChange={handleChange} className="form-control" />
                                            <span className="text-danger">
                                                {errors.Name?.type === "required" && "Name is Required"}
                                            </span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className='mb-3'>
                                    <label className='form-label'>Faculty No</label>
                                    <input type="text"  {...register("Faculty_no", { required: true, minLength: 8, maxLength: 10, pattern: /^\d{2}[A-Z]{3}\d{3}$/i })} name='Faculty_no' value={userData.Faculty_no} onChange={handleChange} className="form-control" />
                                    <span className='text-danger'>
                                        {errors.Faculty_no?.type === "required" && "Faculty number is Required"}
                                        {errors.Faculty_no?.type === "minLength" && "Enter atleast 8 digits"}
                                        {errors.Faculty_no?.type === "maxLength" && "Enter atmost 8 digits"}
                                        {errors.Faculty_no?.type === "pattern" && "Invalid Faculty Number"}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className='mb-3'>
                                    <label className='form-label'>Email</label>
                                    <input type="text" {...register("Email", { required: true, pattern: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/i })} name='Email' value={userData.Email} onChange={handleChange} className="form-control" />
                                    <span className='text-danger'>
                                        {errors.Email?.type === "required" && "Email is Required"}
                                        {errors.Email?.type ==="pattern" && "Invalid Format"}
                                    </span>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className='mb-3'>
                                    <label className='form-label'>Gender</label>
                                    <select name="Gender" {...register("Gender", { required: true })} value={userData.Gender} className='form-control'  onChange={handleChange}>
                                        <option value="">--Please Select--</option>
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                        <option value="Other">Other</option>
                                    </select>
                                    <span className='text-danger'>
                                        {errors.Gender?.type === "required" && "Gender is Required"}
                                    </span>
                                </div>
                            </div>
                        <div className="col-md-6">
                            <div className='mb-3'>
                                <label className='form-label'>Address</label>
                                <input type="text" {...register("Address", { required: true })} name='Address' value={userData.Address} onChange={handleChange} className="form-control" />
                                <span className='text-danger'>
                                    {errors.Address?.type === "required" && "Address is Required"}
                                </span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className='mb-3'>
                                <label className='form-label'>Hall</label>
                                <select name="Hall" {...register("Hall", { required: true })} className='form-control' value={userData.Hall}  onChange={handleChange}>
                                    <option value="">--Please Select--</option>
                                    <option value="BBF">Bibi Fatima</option>
                                    <option value="SN">Sarojini Naidu</option>
                                    <option value="NT">Nadeem Tareem</option>
                                    <option value="RM">Ros Masood</option>
                                    <option value="SM">Sulaiman</option>
                                </select>
                                <span className='text-danger'>
                                    {errors.Hall?.type === "required" && "Course is Required"}
                                </span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className='mb-3'>
                                <label className='form-label'>Course</label>
                                <select name="Course" {...register("Course", { required: true })} className='form-control' value={userData.Course} onChange={handleChange}>
                                    <option value="">--Please Select--</option>
                                    <option value="Bachelor of Technology">Bachelor's of Technology</option>
                                    <option value="Bachelor of Engineering">Bachelor's of Engineering</option>
                                    <option value="Diploma in Engineering">Diploma in Engineering</option>
                                </select>
                                <span className='text-danger'>
                                    {errors.Course?.type === "required" && "Course is Required"}
                                </span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className='mb-3'>
                                <label className='form-label'>Branch</label>
                                <select name="Branch" {...register("Branch", { required: true })} className='form-control'  value={userData.Branch} onChange={handleChange}>
                                    <option value="">--Please Select--</option>
                                    <option value="CSE">Computer Engineering</option>
                                    <option value="IT">Information Technology</option>
                                    <option value="ECE">Electronics Enginnering</option>
                                    <option value="EE">Electrical Enginnering</option>
                                    <option value="ME">Mechnacial Engineering</option>
                                    <option value="CE">Civil Engineering</option>
                                    <option value="PE">Petro Chemical Engineering</option>
                                    <option value="FT">Food Technology</option>
                                </select>
                                <span className='text-danger'>
                                    {errors.Branch?.type === "required" && "Branch is Required"}
                                </span>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className='mb-3'>
                                <label className='form-label'>Semester</label>
                                <input type="number" {...register("semester", { required: true })} name='Semester'  onChange={handleChange} value={userData.Semester} className="form-control" />
                                <span className='text-danger'>
                                    {errors.Semester?.type === "required" && "Semester is Required"}
                                </span>
                            </div>
                        </div>
                        <div className="text-center" style={{ backgroundColor: '#cdb4db', borderRadius: '0 0 15px 15px', padding: '20px 0' }}>
                            <button type="submit" className="btn btn-success me-2" style={{ backgroundColor: '#b5838d', borderColor: '#b5838d' }}>Submit</button>
                            <button type="button" className="btn btn-secondary" onClick={handleCancel} style={{ backgroundColor: '#b5838d', borderColor: '#b5838d' }}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
          </div>
        </div>
        </div>
    </React.Fragment>
  );
}

export default EditUser;