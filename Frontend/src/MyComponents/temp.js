import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Edit() {
  const { Enrollment_No } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    axios.get(http://localhost:7000/api/fetchenroll/${Enrollment_No})
      .then(response => {
        setUserData(response.data[0]);
        console.log(userData.Enrollment_No);
        //console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, [Enrollment_No]);

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log(userData);
    e.preventDefault();
    axios.put(http://localhost:7000/api/updateuser/${Enrollment_No}, userData)
      .then(response => {
        console.log('User updated successfully:', response.data);
        // Redirect to StudentRecord component after successful update
        navigate('/Home');
      })
      .catch(error => {
        console.error('Error updating user:', error);
        // Handle error scenario
      });
  };

  return (
    <React.Fragment>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12'>
            <h5 className='mt-2'>Edit User</h5>
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6">
                  <div className='mb-3'>
                    <label className='form-label'>Enrollment_No<span className='text-danger'>*</span></label>
                    <input type="text" name='Enrollment_No' value={userData.Enrollment_No}  onChange={handleChange} className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='mb-3'>
                    <label className='form-label'>Name<span className='text-danger'>*</span></label>
                    <input type="text" name='Name' value={userData.Name} onChange={handleChange} className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='mb-3'>
                    <label className='form-label'>Faculty_No<span className='text-danger'>*</span></label>
                    <input type="text" name='Faculty_No' value={userData.Faculty_No} onChange={handleChange} className="form-control" />
                  </div>
                </div>
                {/* <div className="col-md-6">
                  <div className='mb-3'>
                    <label className='form-label'>Email<span className='text-danger'>*</span></label>
                    <input type="text" name='Email' value={userData.Email} onChange={handleChange} className="form-control" />
                  </div>
                </div> */}
                {/* <div className="col-md-6"> */}
                  {/* <div className='mb-3'>
                    <label className='form-label'>Gender<span className='text-danger'>*</span></label>
                    <select name="Gender" value={userData.Gender} className='form-control'  onChange={handleChange}>
                      <option value="">--Please Select--</option>
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div> */}
                {/* </div> */}
                <div className="col-md-6">
                  <div className='mb-3'>
                    <label className='form-label'>Address<span className='text-danger'>*</span></label>
                    <input type="text" name='Address' value={userData.Address} onChange={handleChange} className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='mb-3'>
                    <label className='form-label'>Hall<span className='text-danger'>*</span></label>
                    <select name="Hall" className='form-control' value={userData.Hall}  onChange={handleChange}>
                      <option value="">--Please Select--</option>
                      <option value="BBF">Bibi Fatima</option>
                      <option value="SN">Sarojini Naidu</option>
                      <option value="NT">Nadeem Tareem</option>
                      <option value="RM">Ros Masood</option>
                      <option value="SM">Sulaiman</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='mb-3'>
                    <label className='form-label'>Course<span className='text-danger'>*</span></label>
                    <select name="Course" className='form-control' value={userData.Course} onChange={handleChange}>
                      <option value="">--Please Select--</option>
                      <option value="Bachelor of Technology">Bachelor's of Technology</option>
                      <option value="Bachelor of Engineering">Bachelor's of Engineering</option>
                      <option value="Diploma in Engineering">Diploma in Engineering</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='mb-3'>
                    <label className='form-label'>Branch<span className='text-danger'>*</span></label>
                    <select name="Branch" className='form-control'  value={userData.Branch} onChange={handleChange}>
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
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='mb-3'>
                    <label className='form-label'>Semester<span className='text-danger'>*</span></label>
                    <input type="number" name='Semester'  onChange={handleChange} value={userData.Semester} className="form-control" />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className='mb-3'>
                    <label className='form-label'></label>
                    <button type="submit" className='btn btn-success btn-lg'>Submit</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Edit;