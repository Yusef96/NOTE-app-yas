import React, { useState } from 'react'
import styles from "./Register.module.css"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import notesImg from "../../images/notes1.png"

export default function Register() {
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()
  const [errorReg, setErrorReg] = useState(null)

  function goToLogin(){
    navigate("/login")
    // console.log("gello from register");
  }



  async function registerForm(values) {
    setErrorReg(null)
    console.log("hello", values);
    setIsLoading(true)
    let { data } = await axios.post(`https://movies-api.routemisr.com/signup`, values)
    if (data.message == "success") {
      navigate("/login")
    } else {
      setIsLoading(false)
      setErrorReg(data.message)
    }

  }
  //       password:Yup.string().matches(/^[A-Za-z0-9]{6,20}$/,"invalid password ( password must be at least 6 characters long )").required("password is required"),
  let validationYup = Yup.object({
    first_name: Yup.string().required("first name is requied").min(5, "min chars is 5").max(10, "max char is 10"),
    last_name: Yup.string().required("last name is requied").min(5, "min chars is 5").max(10, "max char is 10"),
    email: Yup.string().required("email is requied").email(),
    password: Yup.string().required("password is required").matches(/^[A-Za-z0-9]{6,20}$/, "invalid password ( password must be at least 6 characters long )"),
    age: Yup.number().required("age is required").positive().integer()
  })
  let formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      age: ""
    },
    validationSchema: validationYup,
    onSubmit: (values) => registerForm(values),
  });


  return (
    <>
      <div className="container py-5  mt-4 register-bg">
      <li className="fixed-top p-3 pe-lg-5 d-lg-flex d-none  ">
        <i className="fa-regular fa-note-sticky text-info fs-2"></i>                           
        <p className='ps-2 fs-4 fw-bold'>Notes</p>
    </li>
        <div className="row">
        
        <div className="col-lg-5 d-none d-lg-flex justify-content-center align-items-center">
          <img className='w-100 p-5' src={notesImg}  alt="" />
        </div>
         

        <div className="col-lg-7 ghgh pt-4 shadow-lg">
        <h2 className=" text-center">Sign Up Now</h2>
          {errorReg ? <div className='alert alert-danger'>{errorReg}</div> : ""}
          <form onSubmit={formik.handleSubmit}>
           
            <input
              type="text"
              id="firstName"
              placeholder="Enter your First Name"
              className="form-control mb-3 mt-4"
              name="first_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}/>

            {formik.errors.first_name && formik.touched.first_name ? <div className='alert alert-danger'>{formik.errors.first_name}</div> : ""}
         
            <input
              type="text"
              id="lastName"
              placeholder="Enter your Last Name "
              className="form-control my-3"
              name="last_name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.last_name && formik.touched.last_name ? <div className='alert alert-danger'>{formik.errors.last_name}</div> : ""}

      
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              className="form-control mb-2 my-3"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}

            />
            {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : ""}


        
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              className="form-control mb-2 my-3"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : ""}


       
            <input
              type="number"
              id="age"
              placeholder="Enter your Age"
              className="form-control mb-2 my-3"
              name="age"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.age && formik.touched.age ? <div className='alert alert-danger'>{formik.errors.age}</div> : ""}


            {/* <button type="submit" className="btn bg-info text-white w-100 mt-2">
              Sign Up
            </button> */}
                        {isLoading ?<button className='btn bg-success text-white'><i className='fa fa-spin fa-spinner'></i></button> :  <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-success text-white'>Register</button>}
            <button onClick={goToLogin}  className='btn bg-danger text-white mx-2'>Already have an account</button>

          </form>

        </div>
        </div>
      </div>
    </>
    // <>
    // <li className="fixed-top p-3 pe-lg-5 d-lg-flex d-none  ">
    //     <i className="fa-regular fa-note-sticky text-info fs-2"></i>                           
    //     <p className='ps-2 fs-4 fw-bold'>Notes</p>
    // </li>
    // <div className="container">
    //   <div className="row">
    //     <div className="col-lg-5 d-none d-lg-flex justify-content-center align-items-center">
    //       <img className='w-100 p-5' src={notesImg}  alt="" />
    //     </div>
       
       
    //     <div className="col-lg-7">
    //     <div className='min-vh-100 d-flex justify-content-center align-items-center text-center signup-container'>
    //     <div className='bg-light bg-opacity-25 shadow w-100 mx-auto  p-5 rounded-2'>
    //         <h1 className='fw-bold'>Sign Up Now</h1>
    //         <div className='pt-3'>
    //         <form onSubmit={formik.handleSubmit}>
    //           {errorReg && <p className='alert alert-danger'>{errorReg}</p>}
    //           <input value={formik.values.first_name}  onChange={formik.handleChange} onBlur={formik.handleBlur}  className='form-control my-2' type="text" name='first_name' id='first_name' placeholder='First Name' />
    //           {formik.errors.first_name && formik.touched.first_name? <p className='text-danger text-start'>{formik.errors.first_name}</p>:null}
    //           <input value={formik.values.last_name} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' type="text" name='last_name' id='last_name' placeholder='Last Name' />
    //           {formik.errors.last_name && formik.touched.last_name? <p className='text-danger text-start'>{formik.errors.last_name}</p>:null}
    //           <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' type="email" name='email' id='email' placeholder='Email' />
    //           {formik.errors.email && formik.touched.email? <p className='text-danger text-start'>{formik.errors.email}</p>:null}
    //           <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' type="password" name='password' id='password' placeholder='Password' />
    //           {formik.errors.password && formik.touched.password? <p className='text-danger text-start'>{formik.errors.password}</p>:null}
    //           <input value={formik.values.age} onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' type="number" name='age' id='age' placeholder='Age' />
    //           {formik.errors.age && formik.touched.age? <p className='text-danger text-start'>{formik.errors.age}</p>:null}
    //                             {isLoading ?<button className='btn bg-success text-white'><i className='fa fa-spin fa-spinner'></i></button> :  <button disabled={!(formik.isValid && formik.dirty)} className='btn bg-success text-white'>Register</button>}
    // <button onClick={goToLogin}  className='btn bg-danger text-white mx-2'>Already have an account</button>

    //           {/* {isLoading ? <button type='submit' className='btn btn-info text-light w-100 rounded-2 mt-2'><i className='fa-solid fa-spinner fa-spin'></i></button>:<button type='submit' className='btn btn-info text-light w-100 rounded-2 mt-2'> Sign Up</button>}
    //           <p className='pt-2'>Already have account <Link className='text-decoration-none' to='/login'>Login Now</Link></p> */}
    //         </form>
    //         </div>
    //     </div>
    // </div>
    //     </div>
    //   </div>
    // </div>

    // </>


  )
}
