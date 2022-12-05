import React, { useEffect } from "react";
import {useNavigate, useLocation, useParams} from "react-router-dom";
import { useState } from "react";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Button } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import "./View.css";
import { getDatabase, ref, child, get,remove } from "firebase/database";
import Swal from 'sweetalert2';
import MenuIcon from '@mui/icons-material/Menu';
function View(){
    const Navigate=useNavigate()
    const location=useLocation();
    const router=useParams();
    const db = getDatabase();
    const dbRef = ref(getDatabase());
    const taskName=router.Viewid; 
    const[data,setData]=useState({});
    const Swal = require('sweetalert2')
    useEffect(()=>{
        get(child(dbRef, `adddata/${taskName}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              setData(snapshot.val());
              console.log(snapshot.val());
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
    },[])
    function Edit(obj){
        Navigate("/Edit/"+ obj.Taskname)
        console.log("heloo")
        console.log(obj.Taskname)
    }
    function Delete(){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          remove(ref(db, 'adddata/' + taskName)).then(() => {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            ).then((e)=>{
        Navigate("/Firstpage")
            })    
          })
          .catch((error) => {
           console.log(error)
          });
         
        }
      })
      
    }
    return(
      <div>
      <div className="navbar">
      <div className="menuicon"><MenuIcon></MenuIcon></div>
      <div className="heading">TO DO TASK</div>
    </div>
      <div className="viewpage">
        {
            data!=null?<div>
             <div className="heading1"><h3>More Details about Task</h3></div>
        <div className="edit"  onClick={()=>{
          Edit(data)
      }}><ModeEditIcon></ModeEditIcon></div>
      <div>
        <div className="names">Task name:</div>
        <div className="name"> {data.Taskname}</div>
        </div>
        <div className="display">
            <div className="names">< CalendarMonthIcon></CalendarMonthIcon></div>
           <div className="name">{data.Date}</div>
        </div>
        <div className="display">
            <div className="names"><AccessAlarmIcon></AccessAlarmIcon></div>
           <div className="name">{data.Time}</div>
        </div>
        <div>
            <div className="names">Description:</div>
           <div className="name">{data.Description}</div>
        </div>
        <div className="deletebutton">
        <Button style={{backgroundColor:"black",margin:"20px"}} variant="contained" onClick={()=>{
            Delete()
        }}>Delete</Button></div>
            </div>:<div>Loading....</div>
        }
        
    </div>
    </div>
    )
}
export default View;