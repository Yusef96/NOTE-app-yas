import React, { useState } from 'react'
import styles from "./Login.module.css"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import notesImg from "../../images/notes3.png"
export default function Login() {


  let navigate = useNavigate()
  const [errorLog, setErrorLog] = useState(null)
  const [isLoading, setIsLoading] = useState(false)


  function goBack() {
    navigate("/")
    // console.log("gello from goback");
  }

  async function loginForm(values) {
    setErrorLog(null)
    setIsLoading(true)

    // console.log("hello", values);
    let { data } = await axios.post(`https://movies-api.routemisr.com/signin`, values)
    if (data.message == "success") {
      // console.log(data);
      setIsLoading(false)
      localStorage.setItem("userToken", data.token)
      navigate("/home")
    } else {
      setErrorLog(data.message)
    }

  }
  let validationYup = Yup.object({
    email: Yup.string().required("email is requied").email(),
    password: Yup.string().required("password is required").matches(/^[A-Za-z0-9]{6,20}$/, "invalid password ( password must be at least 6 characters long )"),
  })
  let formik = useFormik({
    initialValues: {

      email: "",
      password: "",

    },
    validationSchema: validationYup,
    onSubmit: (values) => loginForm(values),
  });

  return (
    //     <>
    //     <div className="container">
    //       <div className="w-50 mx-auto my-5">
    //         <h2 className="text-info">Login Form</h2>
    //         {errorLog ? <div className='alert alert-danger'>{errorLog}</div> : ""}
    //         <form onSubmit={formik.handleSubmit}>

    //           <label htmlFor="email" className="d-block">
    //             Email
    //           </label>
    //           <input
    //             type="email"
    //             id="email"
    //             placeholder="Enter your Email"
    //             className="form-control mb-2"
    //             name="email"
    //             onChange={formik.handleChange}
    //             onBlur={formik.handleBlur}

    //            />
    // {formik.errors.email && formik.touched.email ? <div className='alert alert-danger'>{formik.errors.email}</div> : "" }


    //           <label htmlFor="password" className="d-block">
    //             Password
    //           </label>
    //           <input
    //             type="password"
    //             id="password"
    //             placeholder="Enter Password"
    //             className="form-control mb-2"
    //             name="password"
    //             onChange={formik.handleChange}
    //             onBlur={formik.handleBlur}
    //           />
    //           {formik.errors.password && formik.touched.password ? <div className='alert alert-danger'>{formik.errors.password}</div> : "" }




    //           {/* <button type="submit" className="btn bg-info text-white w-100 mt-2">
    //             Sign Up
    //           </button> */}
    //                     {isLoading ?<button className='btn bg-success text-white'><i className='fa fa-spin fa-spinner'></i></button> :  <button className='btn bg-success text-white'>Login</button>}
    //           <button onClick={goBack} className='btn bg-danger text-white mx-2'>Don't have an account yet?  Sign Up</button>

    //         </form>
    //       </div>
    //     </div>
    //   </>
    <>
      <li className="fixed-top p-3 pe-lg-5 d-lg-flex d-none  ">
        <i className="fa-regular fa-note-sticky text-info fs-2"></i>
        <p className='ps-2 fs-4 fw-bold'>Notes</p>
      </li>
      <div className="container">
        <div className="row">
          <div className="col-lg-5 d-none d-lg-flex justify-content-center align-items-center">
            <img className='w-100 p-5' src={notesImg} alt="" />
          </div>


          <div className="col-lg-7 ">
            <div className='min-vh-100 d-flex justify-content-center align-items-center text-center signup-container'>
              <div className='ghgh bg-opacity-25 shadow w-100 mx-auto  p-5 rounded-2'>
                <h1 className='fw-bold text-dark mb-0'>Sign Up Now</h1>
                <div className='pt-3'>
                  <form onSubmit={formik.handleSubmit} className='mb-3'>
                    {errorLog && <p className='alert alert-danger'>{errorLog}</p>}
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' type="email" name='email' id='email' placeholder='Email' />
                    {formik.errors.email && formik.touched.email ? <p className='text-danger text-start'>{formik.errors.email}</p> : null}
                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} className='form-control my-2' type="password" name='password' id='password' placeholder='Password' />
                    {formik.errors.password && formik.touched.password ? <p className='text-danger text-start'>{formik.errors.password}</p> : null}

                    {/* {isLoading ? <button type='submit' className='btn btn-info text-light w-100 rounded-2 mt-2'><i className='fa-solid fa-spinner fa-spin'></i></button>:<button type='submit' className='btn btn-info text-light w-100 rounded-2 mt-2'>Login</button>}
          <p className='pt-2'>Don't have account <Link className='text-decoration-none' to='/'>Sign Up Now</Link></p> */}
                  {isLoading ? <button className='btn bg-success text-white'><i className='fa fa-spin fa-spinner'></i></button> : <button className='btn bg-success text-white'>Login</button>}
                    <button onClick={goBack} className='btn bg-danger text-white mx-2'>Don't have an account yet?  Sign Up</button>

                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>

  )
}
