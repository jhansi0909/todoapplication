import React from "react";
import {useNavigate, useLocation} from "react-router-dom";
import { useState } from "react";
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Button } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import "./View.css";
function View(){
    const Navigate=useNavigate()
    const location=useLocation();
    const[data,setData]=useState(location.state)
    console.log(location)
    function Edit(obj){
        Navigate("/Edit",{state:obj})
        console.log("heloo")
        console.log(location.state)
    }
    function Delete(obj){
      console.log("helooo")
      Navigate("/Firstpage")
    }
    return(
      <div className="viewpage">
        <div className="heading1"><h3>More Details about Task</h3></div>
        <div className="edit"  onClick={()=>{
          Edit(data)
      }}><ModeEditIcon></ModeEditIcon></div>
      <div>
        <div className="names">Task name:</div>
        <div className="name"> {location.state.Taskname}</div>
        </div>
        <div className="display">
            <div className="names">< CalendarMonthIcon></CalendarMonthIcon></div>
           <div className="name">{location.state.Date}</div>
        </div>
        <div className="display">
            <div className="names"><AccessAlarmIcon></AccessAlarmIcon></div>
           <div className="name">{location.state.Time}</div>
        </div>
        <div>
            <div className="names">Description:</div>
           <div className="name">{location.state.Description}</div>
        </div>
        <div className="deletebutton">
        <Button style={{backgroundColor:"black",margin:"20px"}} variant="contained" onClick={()=>{
            Delete(data)
        }}>Delete</Button></div>
    </div>
    )
}
export default View;