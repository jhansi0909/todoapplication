import React, { useEffect } from "react";
import {useNavigate, useLocation, useParams} from "react-router-dom";
import { useState } from "react";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Button } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import "./View.css";
import { getDatabase, ref, child, get,remove,set } from "firebase/database";
import Swal from 'sweetalert2';
import MenuIcon from '@mui/icons-material/Menu';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
function View(){
    const Navigate=useNavigate()
    const location=useLocation();
    const router=useParams();
    const db = getDatabase();
    const dbRef = ref(getDatabase());
    const taskName=router.Viewid; 
    const[taskname,setTaskname]=useState("")
    const[time,setTime]=useState("")
    const[date,setDate]=useState("")
    const[description,setDescription]=useState("")
    const[data,setData]=useState(null);
    const [cart,setCart]=useState()
    const Swal = require('sweetalert2');
    const [complete,setComplete]=useState()
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
    useEffect(()=>{
      get(child(dbRef, `adddata/${taskName}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setData(snapshot.val());
            setTaskname(snapshot.val().Taskname);
            setDate(snapshot.val().Date);
            setTime(snapshot.val().Time);
            setDescription(snapshot.val().Description);
            console.log(snapshot.val());
            setCart(data)
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => {
          console.error(error);
        });
  },[])
  function Back(){
    Navigate("/Firstpage")
  }
    function Complete(){
      // setComplete(true)
      console.log("heloo")
      // console.log(complete)
      let x={
        Taskname:taskname,
        Date:date,
        Time:time,
        Description:description,
        Status:true
    }
    set(ref(db, 'adddata/' +taskName),x)
    Swal.fire({
      // position: 'top-end',
      icon: 'success',
      title: 'Your work has been completed successfully',
      showConfirmButton: false,
      timer: 1500
    }).then((e)=>{
      Navigate("/Firstpage")
    })
    }
    // console.log(data.Status)
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
      data != null?<div>
           <div className="viewheading"><h2>More Details About Task</h2></div>
           <div className="edit">
            {
              data.Status==false?<Button style={{backgroundColor:"black",height:"30px"}} startIcon={<CheckIcon></CheckIcon>} onClick={()=>{
                Complete(data)
               }} variant="contained">complete</Button>:<div></div>
            }
<Button 
     onClick={()=>{
      Edit(data)
  }}
    style={{backgroundColor:"black",height:"30px"}}
     startIcon={ <ModeEditIcon></ModeEditIcon>}
      variant="contained"
      >Edit</Button>
     <Button style={{backgroundColor:"black",height:"30px"}} variant="contained" startIcon={< DeleteIcon></DeleteIcon>} onClick={()=>{
     Delete()
      }}>Delete</Button>
   </div>
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
      <div>
          <div className="names">Status:</div>
        {
          data.Status==false?<div className="name">Not completed</div>:<div className="name">Completed</div>
        }
      </div>

      <div className="backbutton">
      <Button style={{backgroundColor:"black",margin:"20px"}} variant="contained" onClick={()=>{
          Back()
      }}>Back</Button></div>
</div>:<div>Loading...</div>
    }
    </div>
</div>
    )
}
export default View;