import React from "react";
import { Container } from "@mui/system";
import  { useState } from "react";
import { useNavigate,useLocation} from "react-router-dom";
import { Button } from '@mui/material';
import { TextField, Typography } from "@mui/material";
import "./Edit.css";
import axios from "axios";
function Edit(){
    const location=useLocation();
    const[taskname,setTaskname]=useState("")
    const[time,setTime]=useState("")
    const[date,setDate]=useState("")
    const[description,setDescription]=useState("")
    const[data,setData]=useState(location.state,location.key)
    function handleName(a){
        setTaskname(a.target.value)
        console.log(taskname)
    }
    function handleTime(b){
        setTime(b.target.value)
        console.log(time)
    }
    function handleDate(c){
        setDate(c.target.value)
        console.log(date)
    }
    function handleDescription(d){
        setDescription(d.target.value)
        console.log(description)
    }
    function Save(update){
        // for(var i=0;i<n;i++){
        //     if(i==update[]){
        //         let x={
        //             Taskname:taskname,
        //             Date:date,
        //             Time:time,
        //             Description:description,
        //         }
        //         console.log(update[i])
        //       axios.post('https://todoapplication-c90f0-default-rtdb.firebaseio.com//adddata.json',x).then(()=>{
        //         alert("edit successfully")
        //       })
        //     }
        //     else{
        //         return "helooo";
        //     }
        // }
    }
    return(
<div>
    <div className="addingpage">
   <Container  className="adding">
   <center><Typography variant="h5" className="heading1">Edit The Details Of The Task</Typography></center> <br/>
   <form>
        <TextField style={{"width":"500px","margin":"5px"}} type="text" label="Task Name" defaultValue={location.state.Taskname} onChange={handleName}></TextField><br/>
        <TextField style={{"width":"500px","margin":"5px" }} type="date" label="date "  variant="outlined" defaultValue={location.state.Date} onChange={handleDate}></TextField><br/>
        <TextField style={{"width":"500px","margin":"5px" }} type="Time" label=" "  variant="outlined" defaultValue={location.state.Time}  onChange={handleTime}></TextField><br/>
        <TextField style={{"width":"500px","margin":"5px","cols":"40", "rows":"5"}} orientation="vertical" defaultValue={location.state.Description} multiline="true" type="text" label="Description"  variant="outlined"  onChange={handleDescription}></TextField><br/>
        <div className="buttons">  <Button style={{ backgroundColor: "black",}} onClick={()=>{
            Save(data)
        }} variant="contained">Save</Button>
        </div>
    </form>
   </Container>
   </div>
</div>
    )
}
export default Edit;