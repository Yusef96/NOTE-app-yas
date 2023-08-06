import React, { useEffect, useState } from 'react'
import styles from "./Home.module.css"

import jwt_decode from "jwt-decode";
import axios from 'axios';
import CardDetails from "./../CardDetails/CardDetails"
import SideBar from '../SideBar/SideBar';
import { useNavigate } from 'react-router-dom'


export default function () {


    let navigate = useNavigate()
    

    function logoutApp() {
        localStorage.removeItem("userToken")
        navigate("/")

    }


  useEffect(() => {
    getAllNotes()

  }, [])



  let userToken = localStorage.getItem("userToken");

  var decoded = jwt_decode(userToken);

  const [userData, setUserData] = useState({
    "token": userToken,
    "userID": decoded._id
  })



  const [allNotes, setAllNotes] = useState([])

  async function getAllNotes() {
    let { data } = await axios.post(`https://movies-api.routemisr.com/getUserNotes`, userData)

    if (data.message == "success") {
      setAllNotes(data.Notes)
    }

    setAllNotes(data.Notes)
  }
  // console.log(userToken);
  const [addNote, setAddNote] = useState({

    "title": "",
    "desc": "",
    "citizenID": decoded._id,
    "token": userToken
  })

  function getAddedData(e) {
    // document.getElementById("title1").value = ""
    // document.getElementById("desc1").value = "";
    setAddNote({ ...addNote, [e.target.name]: e.target.value })
    // console.log(addNote);
  }

  async function addNoteForm(e) {
    e.preventDefault();
    let { data } = await axios.post(`https://movies-api.routemisr.com/addNote`, addNote)

    // console.log(data,'from add note');
    getAllNotes()
  }

  return (
    // <>



    //     <div className="container main-bg h-100">

    //       <div className="row  ">
    //         <div className="col-2">
    //         </div>



    //         <div className="col-10 px-lg-5 px-2 py-5 ">
    //           <div className="d-flex justify-content-end py-3">
    //             <button type="button" className="btn  text-dark mb-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
    //               <i className="fa-solid fa-circle-plus"></i> Add New Note
    //             </button>
    //           </div>


    //           <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    //             <form id="edit-form" onSubmit={addNoteForm}>
    //               <div className="modal-dialog">
    //                 <div className="modal-content">
    //                   <div className="modal-header">
    //                     <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    //                   </div>
    //                   <div className="modal-body">
    //                     <input onChange={getAddedData} placeholder="Type Title" id="title1" name="title" className="form-control" type="text" />
    //                     <textarea onChange={getAddedData} className="form-control my-2" id="desc1" placeholder="Type your note" name="desc" cols="30" rows="10"></textarea>
    //                   </div>
    //                   <div className="modal-footer">
    //                     <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-dismiss="modal">Close</button>
    //                     <button data-bs-dismiss="modal" type="submit" className="btn btn-info">Add Note</button>
    //                   </div>
    //                 </div>
    //               </div>
    //             </form>
    //           </div>
    //           <div className="row">
    //             <CardDetails allNotes={allNotes} getAllNotes={getAllNotes} />
    //           </div>
    //         </div>

    //       </div>


    //     </div>




    // </>
    <>
    <div>
    <div className="container py-5">

<div className="row">

  <div className="d-flex justify-content-end py-3 main-bg">
    <button type="button" className="btn bg-white text-dark mb-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
      <i className="fa-solid fa-circle-plus"></i> Add New Note
    </button>
    <button type="button" className="btn bg-white text-dark mb-4 mx-2 " onClick={logoutApp} >
    <i class="fa-solid fa-right-from-bracket"></i> LogOut
    </button>
  </div>


  <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <form id="edit-form" onSubmit={addNoteForm}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <input onChange={getAddedData} placeholder="Type Title" id="title1" name="title" className="form-control" type="text" />
            <textarea onChange={getAddedData} className="form-control my-2" id="desc1" placeholder="Type your note" name="desc" cols="30" rows="10"></textarea>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-dismiss="modal">Close</button>
            <button data-bs-dismiss="modal" type="submit" className="btn btn-info">Add Note</button>
          </div>
        </div>
      </div>
    </form>
  </div>
  <div className="row">
    <CardDetails allNotes={allNotes} getAllNotes={getAllNotes} />
  </div>
</div>
</div>

    </div>






    </>


  )
}
