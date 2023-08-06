import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export default function SideBar() {
    // function logout(){
    //     localStorage.removeItem("userToken")
    // }
    let navigate = useNavigate()
    let userToken = localStorage.getItem("userToken")

    function logoutApp() {
        localStorage.removeItem("userToken")
        navigate("/")

    }


    return (
        <>
            <div>
                <div className="p-0 min-vh-100 bg-dark">
                    <ul className="text-light list-unstyled">

                        <li className="p-3 pe-lg-2 d-lg-flex d-none  ">
                            <i className="fa-regular fa-note-sticky text-info fs-2"></i>
                            <p className='ps-3 fs-4'>Notes</p>
                        </li>

                        <li className="p-3 pe-lg-5 sidebar-element">
                            <Link to="/home" className="nav-link px-0 px-lg-2"> <i className="bi-house" /><span className="px-lg-2 ms-1 d-none d-lg-inline">Home</span> </Link>
                        </li>

                        {/* <li className="p-3 pe-lg-5 sidebar-element">
                                <Link onClick={logout} to="/login" className="nav-link px-0 px-lg-2"> <i className="bi bi-box-arrow-left"></i><span className="px-lg-2 ms-1 d-none d-lg-inline">Logout</span> </Link>
                            </li> */}
                        {userToken ? <li className="nav-item out-color">
                            <a className="nav-link log-out out-color" onClick={logoutApp}>Logout</a>
                        </li> : ""}


                    </ul>
                </div>
            </div>
        </>
    )
}
