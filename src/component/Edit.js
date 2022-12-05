import React from "react";
import { Container } from "@mui/system";
import  { useState,useEffect } from "react";
import { useNavigate,useLocation,useParams, Navigate} from "react-router-dom";
import { Button } from '@mui/material';
import { TextField, Typography } from "@mui/material";
import "./Edit.css";
import { getDatabase, ref, child, get,set } from "firebase/database";
import Swal from 'sweetalert2';
import MenuIcon from '@mui/icons-material/Menu';
function Edit(){
    const location=useLocation();
    const db = getDatabase();
    const[taskname,setTaskname]=useState("")
    const[time,setTime]=useState("")
    const[date,setDate]=useState("")
    const[description,setDescription]=useState("")
    const dbRef = ref(getDatabase());
    const router=useParams();
    const taskName=router.Viewid;
    console.log(taskName)
    const [data,setData]=useState(null)
    const Swal = require('sweetalert2')
    // const[data,setData]=useState(location.state,location.key)
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
    // console.log(data.Taskname)
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
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
    },[])
    console.log(taskName)
    function Save(){
                let x={
                    Taskname:taskname,
                    Date:date,
                    Time:time,
                    Description:description,
                }
                set(ref(db, 'adddata/' +taskName),x).then(() => {
                    Swal.fire({
                        title: 'Do you want to save the changes?',
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: 'Save',
                        denyButtonText: `Don't save`,
                      }).then((result) => {
                        if (result.isConfirmed) {
                          Swal.fire('Saved!', '', 'success')
                          
                        } else if (result.isDenied) {
                          Swal.fire('Changes are not saved', '', 'info')
                        }
                      })
                  })
                  .catch((error) => {
                    console.error(error);
                  });
}
    return(
<div>
<div className="navbar">
      <div className="menuicon"><MenuIcon></MenuIcon></div>
      <div className="heading">TO DO TASK</div>
    </div>
    <div className="addingpage">
   <Container  className="adding">
  {
    data?<div>
       <center><Typography variant="h5" className="heading1">Edit The Details Of The Task</Typography></center> <br/>
   <form>
        <TextField style={{"width":"500px","margin":"5px"}} type="text" label="Task Name" variant="outlined" defaultValue={data.Taskname} onChange={handleName}></TextField><br/>
        <TextField style={{"width":"500px","margin":"5px" }} type="date" label=" "  variant="outlined" defaultValue={data.Date} onChange={handleDate}></TextField><br/>
        <TextField style={{"width":"500px","margin":"5px" }} type="Time" label=" "  variant="outlined" defaultValue={data.Time}  onChange={handleTime}></TextField><br/>
        <TextField style={{"width":"500px","margin":"5px","cols":"40", "rows":"5"}} orientation="vertical" defaultValue={data.Description} multiline="true" type="text" variant="outlined"  onChange={handleDescription}></TextField><br/>
        <div className="buttons"><Button style={{ backgroundColor: "black",}} onClick={()=>{
            Save()
        }} variant="contained">Save</Button>
        </div>
    </form>
    </div>:<div>Loading...</div>
  }
   </Container>
   </div>
</div>
    )
}
export default Edit;