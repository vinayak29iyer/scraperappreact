import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import { apiEndpoints } from '../../api/endpoints'
import './RegistrationForm.scss';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import LaddaButton, {EXPAND_LEFT} from 'react-ladda-button'
import 'react-ladda-button/dist/ladda-themeless.min.css'

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [btnLoading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      await axiosInstance.post(apiEndpoints.saveRegUsersApi, formData)
      Swal.fire({
        title: 'Saved!',
        text: 'User registered successfully!',
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then(()=>{
        setFormData({
          name: '',
          email: '',
          password: '',
        })
        navigate('/userlist')
      })
      // onUserRegistered(); // Refresh user list
    } catch (error) {
      console.log('AXIOS GET ERR>> ',error)
        const { status: errStatusCode, data: { errors: valErrArr = [], emailDuplicateFound = false, message: errorMsg = '' } = {}, } = error.response || {}
        // console.log('ERR DATA>> ',error.response.data)
        if(errStatusCode === 422){
          Swal.fire({
            title: 'Error!',
            text: `${valErrArr.length >=1 ? valErrArr[0]?.message: 'Oops something went wrong, please try again later!' }`,
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }
        if(emailDuplicateFound){
          Swal.fire({
            title: 'Error!',
            text: errorMsg || 'Oops something went wrong, please try again later!',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }

    }
    setLoading(false)
  };

  return (
    <div className="registration-form">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} minLength={5} required/>
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} minLength={5} required />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} minLength={5} required />
        </div>
        <div className="form-group">
          <LaddaButton type="submit" data-style={EXPAND_LEFT} loading={btnLoading}
          >Register
          </LaddaButton>
        </div>
        <div className="form-group">
        <button type="button" onClick={()=> navigate('/userlist')}>Go To List Of Users</button>
        </div>
       
      </form>
    </div>
  );
};

export default RegistrationForm;
