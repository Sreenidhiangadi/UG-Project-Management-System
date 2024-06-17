import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './SignUp.css';
import axios from 'axios';

 function SignUp() {
  let { register, handleSubmit, watch } = useForm();
  let [err,setErr]=useState('')
  const userType = watch('userType', '');
  let navigate=useNavigate()
  async function onSignUpFormSubmit(userobj) {
    let res;
    console.log(userobj)
    if(userType==='student'){
      let newobj={...userobj,permission:false}
      console.log(newobj)
      res=await axios.post('http://localhost:4000/student-api/signup',newobj)
    }else{
      res=await axios.post('http://localhost:4000/teacher-api/signup',userobj)
    }
    if(res.data.message==='User created'){
      navigate('/signin')
    }else{
      setErr(res.data.message)
    }
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-6'>
          <img
            src='https://static.vecteezy.com/system/resources/previews/003/689/228/non_2x/online-registration-or-sign-up-login-for-account-on-smartphone-app-user-interface-with-secure-password-mobile-application-for-ui-web-banner-access-cartoon-people-illustration-vector.jpg'
            className='responsive-img'
            alt='SignUp Illustration'
          />
        </div>
        <div className='col-md-6'>
        {err && err.length !== 0 && <p className="text-danger">Error in Register: {err}</p>}
          <div className='row justify-content-center mt-5'>
            <div className='col-lg-7 col-md-6 col-sm-6'>
              {/* <div className='card'> */}
                <div className='card-title text-center'>
                  <h2 className='p-3'>SignUp</h2>
                </div>
                <div className='card-body'>
                  <form onSubmit={handleSubmit(onSignUpFormSubmit)}>
                    <div className='mb-4'>
                      <label
                        htmlFor='user'
                        className='form-check-label me-3'
                        style={{ fontSize: '1.2rem', color: 'var(--light-dark-grey)' }}
                      >
                        Login as
                      </label>
                      <div className='form-check form-check-inline'>
                        <input
                          type='radio'
                          className='form-check-input'
                          id='student'
                          value='student'
                          {...register('userType')}
                        />
                        <label htmlFor='student' className='form-check-label'>
                          Student
                        </label>
                      </div>
                      <div className='form-check form-check-inline'>
                        <input
                          type='radio'
                          className='form-check-input'
                          id='teacher'
                          value='teacher'
                          {...register('userType')}
                        />
                        <label htmlFor='teacher' className='form-check-label'>
                          Teacher
                        </label>
                      </div>
                    </div>
                    <div className='mb-4'>
                      <input
                        type='text'
                        className='form-control'
                        id='userid'
                        placeholder='User Id'
                        {...register('userId')}
                      />
                    </div>
                    <div className='mb-4'>
                      <input
                        type='text'
                        className='form-control'
                        id='username'
                        placeholder='User Name'
                        {...register('userName')}
                      />
                    </div>
                    {userType === 'teacher' && (
                      <div className='mb-4'>
                        <input
                          type='text'
                          className='form-control'
                          id='designation'
                          placeholder='Designation'
                          {...register('designation')}
                        />
                      </div>
                    )}
                    <div className='mb-4'>
                      <input
                        type='password'
                        className='form-control'
                        id='password'
                        placeholder='Password'
                        {...register('password')}
                      />
                    </div>
                    <div className='mb-4'>
                      <input
                        type='email'
                        className='form-control'
                        id='email'
                        placeholder='Email'
                        {...register('Email')}
                      />
                    </div>
                    <div className='d-flex justify-content-center'>
                      <p>
                        Already have an account?<NavLink to='/signin'> SignIn</NavLink>
                      </p>
                    </div>
                    <div className='text-end'>
                      <button type='submit' className='btn btn-success'>
                        SignUp
                      </button>
                    </div>
                  </form>
                </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
