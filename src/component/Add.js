import { TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import { Button } from '@mui/material';
import axios from 'axios';
import "./Add.css";
function Add(){
    const[taskname,setTaskname]=useState("")
    const[time,setTime]=useState("")
    const[date,setDate]=useState("")
    const[description,setDescription]=useState("")
    const [key,setKey]=useState(" ")
    const[add,setAdd]=useState(false)
    const[data,setData]=useState([])
    console.log(key)
    const Navigate=useNavigate()
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
    function Add(){
        var x={
            Taskname:taskname,
            Date:date,
            Time:time,
            Description:description,
            Key:key,
        }
        axios.post('https://todoapplication-c90f0-default-rtdb.firebaseio.com//adddata.json',x).then(()=>{
            alert("submitted successfully");
            Navigate("/Firstpage")
        });
        setData(x)
    }
   return(
<div>
    <div className="addingpage">
   <Container  className="adding">
   <center><Typography variant="h5" className="heading1">Add The Details Of The Task</Typography></center> <br/>
   <form>
        <TextField style={{"width":"500px","margin":"5px"}} type="text" label="Task Name"  onChange={handleName} ></TextField><br/>
        <TextField style={{"width":"500px","margin":"5px" }} type="date" label=" "  variant="outlined"  onChange={handleDate}></TextField><br/>
        <TextField style={{"width":"500px","margin":"5px" }} type="Time" label=" "  variant="outlined"  onChange={handleTime}></TextField><br/>
        <TextField style={{"width":"500px","margin":"5px","cols":"40", "rows":"5"}} orientation="vertical" multiline="true" type="text" label="Description"  variant="outlined"  onChange={handleDescription}></TextField><br/>
        <div className="buttons"> 
        <Button style={{ backgroundColor: "black"}} onClick={Add} variant="contained">Add</Button>
        </div>
    </form>
   </Container>
   </div>
</div>
    )
}
export default Add;