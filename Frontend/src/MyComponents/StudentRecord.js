import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../App.css"

function StudentRecord() {
  const [userData, setUserData] = useState([]);
  const [originalUserData, setOriginalUserData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/user');
        setUserData(response.data);
        setOriginalUserData(response.data); // Store original data
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (Enroll_no) => {
    navigate(`/UserEdit/${Enroll_no}`);
  };

  const handleDelete = (Enroll_no) => {
    console.log('Delete User with Enrollment number:', Enroll_no);

    axios
      .delete(`http://localhost:7000/api/deleteuser/${Enroll_no}`)
      .then((response) => {
        console.log('User deleted successfully:', response.data);

        setUserData((prevUserData) => prevUserData.filter((user) => user.Enroll_no !== Enroll_no));
        setOriginalUserData((prevUserData) => prevUserData.filter((user) => user.Enroll_no !== Enroll_no)); // Update original data
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
        // Handle error scenario
      });
  };

  const handleSearch = (query) => {
    // Implement search functionality here
    const searchString = query.toLowerCase();
    const filteredUserData = originalUserData.filter(
      (item) =>
        item.Enroll_no?.toLowerCase().includes(searchString) ||
        item.Faculty_No?.toLowerCase().includes(searchString) ||
        item.Name?.toLowerCase().includes(searchString) ||
        item.Hall?.toLowerCase().includes(searchString) ||
        item.Address?.toLowerCase().includes(searchString) ||
        item.Course?.toLowerCase().includes(searchString) ||
        item.Branch?.toLowerCase().includes(searchString) ||
        item.Semester?.toString().toLowerCase().includes(searchString)
    );

    // Update userData state with filtered results
    setUserData(filteredUserData);
  };

  const handleReload = () => {
    // Reset user data to the original list
    setUserData(originalUserData);
  };

  return (
    <React.Fragment>
      <Header title="STUDENT RECORD" searchBar={true} onSearch={handleSearch} onReload={handleReload} />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-12">
            <h5 className="mb-4">User List</h5>

            <div className="d-grid d-md-flex justify-content-md-end mb-4">
              <Link to="/UserRegistration" className="btn btn-primary" style={{ backgroundColor: '#355070', borderColor: '#355070' }}>
                Add New User
              </Link>
            </div>

            <div className="table-responsive">
              <table className="table table-striped table-bodered">
                <thead className='headStyle'>
                  <tr>
                    <th>Enroll No.</th>
                    <th>Faculty No.</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>Hall</th>
                    <th>Course</th>
                    <th>Branch</th>
                    <th>Semester</th>
                    <th>Gender</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((uData, index) => (
                    <tr key={index}>
                      <td>{uData.Enroll_no}</td>
                      <td>{uData.Faculty_no}</td>
                      <td>{uData.Name}</td>
                      <td>{uData.Address}</td>
                      <td>{uData.Hall}</td>
                      <td>{uData.Course}</td>
                      <td>{uData.Branch}</td>
                      <td>{uData.Semester}</td>
                      <td>{uData.Gender}</td>
                      <td>{uData.Email}</td>
                      <td>
                        <button onClick={() => handleEdit(uData.Enroll_no)} className="btn btn-sm btn-info me-2">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(uData.Enroll_no)} className="btn btn-sm btn-danger" style = {{backgroundColor: '#e63946'}}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default StudentRecord;
