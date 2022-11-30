import React, { useState,useEffect } from "react";
import "./Firstpage.css";
import { useNavigate,useLocation, Link} from "react-router-dom";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Button, TextField } from '@mui/material';
import axios from "axios";
function Firstpage(){
  const Navigate=useNavigate();
  const[data,setData]=useState([])
   function Add(){
     Navigate("/Add")
     console.log("helooo")
   }
   function Call(obj,index){
    Navigate("/View/"+index,{state:obj})
    console.log("you clicked"+ index,obj)
   }
   useEffect(() => {
    axios.get('https://todoapplication-c90f0-default-rtdb.firebaseio.com//adddata.json').then((response) =>{
      console.log(Object.values(response.data))
      let a=Object.values(response.data)
      let b=Object.keys(response.data)
      console.log(a);
      console.log(b)
      setData(a)
      console.log(data);
    })
  },[])
    return(
        <div className="main">
          <div className="heading">TO DO TASK</div>
          <div className="search">
         <TextField style={{"width":"400px"}} type="text" label="Search"></TextField><br/>
         <Button style={{ backgroundColor: "black","height":"40px",margin:"10px"}} variant="contained" onClick={Add}>Add Tasks</Button>
          </div>
  <div className="mainone">
  {
 data.map((x,index)=>{
  return(
  <div className="cards">
       <div className="taskname">
       <div className="taskname1">Taskname:</div>
       <div className="taskname2"> {x.Taskname}</div>
        </div>
      <div className="time">
      <div className="clock"><CalendarMonthIcon></CalendarMonthIcon></div>
      <div>{x.Date}</div>
      </div>
      <div className="time">
     <div className="clock"> <AccessAlarmIcon></AccessAlarmIcon></div>
      <div>{x.Time}</div>
      </div>
      <div className="description">
        <div className="description1">Description:</div>
     <div className="description2"> {x.Description}</div></div>
    <Button style={{ backgroundColor: "black"}} variant="contained" onClick={()=>{
          Call(x,index)
      }}>view</Button>
   </div>
  ) }
)
  }
</div>
</div>
 )
}
export default Firstpage;