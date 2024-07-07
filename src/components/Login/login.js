import React, { useEffect, useRef, useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import axiosInstance from '../../api/axios';
import { apiEndpoints } from '../../api/endpoints'
import './LoginPage.scss'; // Import your SCSS file
import 'react-ladda-button/dist/ladda-themeless.min.css'
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


const LoginPage = () => {
  const effectRan = useRef(false)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [usernameErrMsg, setUsernameErrMsg] = useState('')
  const [paswordErrMsg, setPasswordErrMsg] = useState('')
  /**
   * @description - strictMode makes useEffect() run twice on DEV server, so we will be using a temp workthrough so that it works only once
   */
  useEffect(()=>{
    if(!effectRan.current){
      //empty any token onload
      localStorage.clear()
    }

    return () => {
      //set true for code to run once on devServer
      effectRan.current = true
    }
  },[])

  const handleLogin = async(e) => {
      e.preventDefault();
      try {
        const {data: { data: { redirectUrl = '', tokenExpTime = '', token = '' } = {} }={}} = await axiosInstance.post(apiEndpoints.loginApi, formData)
        Swal.fire({
          title: "Login Successful!",
          icon: "success",
          showConfirmButton: false,
          showClass: {
            popup: `
              animate__animated
              animate__fadeInUp
              animate__faster
            `
          },
          hideClass: {
            popup: `
              animate__animated
              animate__fadeOutDown
              animate__faster
            `
          },
          timer: 1500
        });
        localStorage.setItem("authToken", token)
        localStorage.setItem("authTokenExp", tokenExpTime)
        navigate(redirectUrl)
      } catch(error) {
        console.log('error>>> ',error)
        const { status: errStatusCode, data: errData = '', message  } = error?.response || {}
        if(errStatusCode === 422){
          if(errData.errors && errData.errors.length >= 1){
            errData.errors.map((item)=>{
              if(item.key === 'username'){
                setUsernameErrMsg(item.message)
              }
              if(item.key === 'password'){
                setPasswordErrMsg(item.message)
              }
            })
          }
        } else if(errStatusCode === 401){
          Swal.fire({
            title: 'Error!',
            text: errData?.message || 'Invalid Credentials!',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Oops! Something went wrong with your request, please try again later!',
            icon: 'error',
            confirmButtonText: 'Ok'
          })
        }
      }
  };

  return (
      <div className="login-container">
          <div className="login-box">
              <h2>Login</h2>
              <form onSubmit={handleLogin}>
                  <input type="text" 
                  placeholder="Username"
                  value={formData.username}
                  id='username'
                  className={`${usernameErrMsg ? 'has-error' : ''}`}
                  onChange={(e) => {
                    setFormData({ ...formData, username: e.target.value })
                    //empty msg once we start typing
                    if(usernameErrMsg){ setUsernameErrMsg('') } 
                  }} 
                  required autoComplete="off"/>
                  {/* validation msg */}
                  <div className="invalid-feedback">{usernameErrMsg}</div>

                  <input type="password"
                   placeholder="Password"
                   id='password'
                   className={`${paswordErrMsg ? 'has-error' : ''}`}
                   value={formData.password}
                   onChange={(e)=>{ 
                    setFormData({ ...formData, password: e.target.value })
                    //empty msg once we start typing
                    if(paswordErrMsg){ setPasswordErrMsg('') } 
                   }}
                   required 
                   autoComplete="off"/>
                   {/* validation msg */}
                  <div className="invalid-feedback">{paswordErrMsg}</div>
                  <button type="submit">Login</button>
              </form>
          </div>
      </div>
  );
};

export default LoginPage;
