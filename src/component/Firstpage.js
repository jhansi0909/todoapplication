import React, { useState,useEffect } from "react";
import "./Firstpage.css";
import { useNavigate,useLocation, Link,useParams} from "react-router-dom";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Button, TextField } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Switch from '@mui/material/Switch';
import axios from "axios";
import { getDatabase, ref, child, get } from "firebase/database";
function Firstpage(){
  const Navigate=useNavigate();
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const[data,setData]=useState([]);
  const [filterdata,setFilterdata]=useState([]);
  const [switchdata,setSwitch]=useState(false)
  const [search,setSearch]=useState("")
   function Add(){
     Navigate("/Add")
     console.log("helooo")
   }
   function Call(obj){
    Navigate("/View/"+obj.Taskname)
    // console.log("you clicked"+ index,obj)
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
      const c=a.filter((d)=>d.Status==false);
    console.log(c);
    setFilterdata(c);
    console.log(filterdata);
    })
  },[])
  function handleSearch(a){
    setSearch(a.target.value)
    //  const str=setSearch
    console.log(search)
    // console.log(str)
   }
   function Search(obj){
  const searching=filterdata.filter((obj)=>  obj.Taskname.includes(search))
 setFilterdata(searching)
 setSearch(" ")
 console.log(obj.Taskname.includes)
}
  function handleSwitch(e){
    console.log(e.target.checked)
    const x=data.filter((d)=>d.Status == e.target.checked);
    console.log(x)
    setFilterdata(x)
    setSwitch(e.target.checked)
  }
  
    return(
        <div className="main">
          <div className="navbar">
         <div className="menuicon"><MenuIcon></MenuIcon></div>
          <div className="heading"><h3>TO DO TASK</h3></div>
          </div>
          <div className="switch"><Switch {...label} 
          onChange={handleSwitch}/>
          <div>{switchdata==false?<div><h3>Not completed Tasks</h3></div>:<div><h3>Completed Tasks</h3></div>}  </div>
          </div>
        <div className="searching">
          <div className="search">
         <TextField value={search} onChange={handleSearch} InputProps={{
    endAdornment: (
       <Button style={{backgroundColor:"black"}} variant="contained"  onClick={()=>{
        Search(data)
       }}>search</Button>),
  }} style={{"width":"90%","margin":"5px" }} type="text" label="Search"></TextField><br/>
         <Button style={{ backgroundColor: "black","height":"40px","width":"10%",margin:"10px"}} variant="contained" onClick={Add}>Add Tasks</Button>
          </div>
          </div> 
  <div className="mainone">
  {
 filterdata.map((x,index)=>{
  return(
   <div>
  <div><div className="cards">
   <div className="taskname">
   <div className="taskname1">Taskname:</div>
   <div className="taskname2"> {x.Taskname}</div>
    </div>
  <div className="time">
  {console.log(x.Status)}
  <div className="clock"><CalendarMonthIcon></CalendarMonthIcon></div>
  <div>{x.Date}</div>
  </div>
  <div className="time">
 <div className="clock"> <AccessAlarmIcon></AccessAlarmIcon></div>
  <div>{x.Time}</div>
  </div>
  <div className="description">
    <div className="description1">Description:</div>
 <div className="description2"> {x.Description}</div>
 </div>
 <div className="buttons">
<Button style={{ backgroundColor: "black"}} variant="contained" onClick={()=>{
      Call(x,index)
  }}>view</Button>
  </div>
</div></div></div>
  
  ) }
)
  }
</div>
</div>
 )
}
export default Firstpage;